# Plan 004: Install vitest and characterize `prepareUnit`

> **Executor instructions**: Follow this plan step by step. Run every
> verification command and confirm the expected result before moving to the
> next step. If anything in the "STOP conditions" section occurs, stop and
> report — do not improvise. When done, update the status row for this plan
> in `plans/README.md` — unless a reviewer dispatched you and told you they
> maintain the index.
>
> **Drift check (run first)**: `git diff --stat be5a6b2..HEAD -- front/src/shared/lib/content.ts front/package.json front/tsconfig.app.json`
> If `content.ts` changed, re-read it and adapt the assertions to the live
> behavior — this is a *characterization* suite: it pins what the code does,
> it does not decide what it should do.

## Status

- **Priority**: P1
- **Effort**: M
- **Risk**: LOW
- **Depends on**: none (003 wires it into CI afterwards)
- **Category**: tests
- **Planned at**: commit `be5a6b2`, 2026-08-02

## Why this matters

`front/` has ~120 TS/TSX files and zero tests — no runner is even installed.
The single highest-value target is `prepareUnit` in
`front/src/shared/lib/content.ts`: every lesson page in the product goes through
it, and its three documented failure modes are all **silent** (a figure marker
wrapped in a filtered div drops the figure with no error; an element carrying
both `data-audience` and `data-assistant` renders for one reader in four; a
missing translation degrades to English with only a console warning). Today
those invariants live as prose in `front/CLAUDE.md`; this plan converts them
into a red build.

## Current state

- `front/package.json` scripts: `dev`, `build` (`tsc -b && vite build`),
  `lint` (`oxlint`), `preview`. No `test` script; no test-related devDependency.
- `front/src/shared/lib/content.ts` exports `prepareUnit(html, {mode,
  assistant, translate}) → Segment[]` where
  `Segment = { kind: 'html'; html: string } | { kind: 'figure'; name: string }`.
  Its passes, in order (all verified against the source at the planned-at
  commit):
  1. remove every `[data-audience]` element whose value ≠ `mode` (content.ts:82-86)
  2. remove every `[data-assistant]` element whose value ≠ `assistant` (content.ts:90-94)
  3. for every `[data-i18n]` element **whose parent has no `[data-i18n]`
     ancestor** (the `parentElement?.closest` guard, content.ts:99), call
     `translate(key)`; a non-null result replaces `element.innerHTML` (content.ts:102-105)
  4. expand `svg[data-icon]` markers via the icon registry (content.ts:110-117);
     unknown icon names are left in place
  5. cut the body into segments at **top-level** `data-figure` elements
     (content.ts:131-142); nested markers are not cut and remain in the html
     segment; whitespace-only runs are dropped (content.ts:124-129)
- Types come from `@/shared/mode/mode` (`Mode` = `'guided' | 'self'`) and
  `@/shared/assistant/assistant` (`Assistant` = `'claude' | 'copilot'`) — check
  both files for the exact union members before writing the tests.
- `front/tsconfig.json` is a solution file referencing `tsconfig.app.json`
  (which has `"types": ["vite/client"]`, includes `src`) and `tsconfig.node.json`.
- Path alias `@ → ./src` in both Vite and tsconfig.

## Commands you will need

Run all from `front/`.

| Purpose | Command | Expected on success |
|---|---|---|
| Install | `npm install -D vitest jsdom` | exit 0 |
| Tests | `npm test` | all pass |
| Type check + build | `npm run build` | exit 0 |
| Lint | `npm run lint` | exit 0 |

## Scope

**In scope** (the only files you should create/modify):
- `front/package.json` (add `"test": "vitest run"` script and the devDependencies)
- `front/package-lock.json` (regenerated)
- `front/vitest.config.ts` (create)
- `front/src/shared/lib/content.test.ts` (create)
- `front/tsconfig.app.json` — only if Step 4's build fails on test files (see step)

**Out of scope** (do NOT touch):
- `front/src/shared/lib/content.ts` itself — characterization only. If a test
  reveals what looks like a bug, record it in your report; do not fix it.
- Any unit HTML, locale file, or step registry.
- ESLint/oxlint config.

## Git workflow

- Branch: `advisor/004-vitest-prepareunit`.
- One commit: `test: install vitest and characterize prepareUnit`.
- Do NOT push or open a PR unless the operator instructed it.

## Steps

### Step 1: Install and wire the runner

```bash
npm install -D vitest jsdom
```

Add to `front/package.json` scripts: `"test": "vitest run"`.

Create `front/vitest.config.ts`:

```ts
import path from 'node:path'
import { defineConfig } from 'vitest/config'

export default defineConfig({
  resolve: {
    alias: { '@': path.resolve(import.meta.dirname, './src') },
  },
  test: {
    environment: 'jsdom',
  },
})
```

**Verify**: `npm test` → "no test files found" exit path or 0 tests, exit 0
(vitest exits 1 on no tests by default — if so, proceed; Step 2 adds the file).

### Step 2: Write the characterization suite

Create `front/src/shared/lib/content.test.ts`. Import
`{ describe, it, expect }` from `vitest` (no globals). A helper builds options:

```ts
const opts = (over: Partial<PrepareOptions> = {}): PrepareOptions => ({
  mode: 'guided',
  assistant: 'claude',
  translate: () => null,
  ...over,
})
```

Cover, as separate `it` blocks (names in the repo's plain-sentence style):

1. **Audience keeps and removes**: an untagged `<p>` survives both modes; a
   `<p data-audience="self">` is present for mode `self`, absent for `guided`.
2. **Assistant keeps and removes**: same shape on `data-assistant` with
   `claude`/`copilot`.
3. **Both attributes on one element** (the documented hazard): an element with
   `data-audience="self" data-assistant="copilot"` under
   `{mode:'guided', assistant:'claude'}` is removed; under
   `{mode:'self', assistant:'copilot'}` it survives. Add a comment naming this
   the one-reader-in-four trap from `front/CLAUDE.md`.
4. **Translation replaces content**: `translate` returning a string replaces
   the element's innerHTML; returning `null` keeps the authored English.
5. **Nested keys skipped**: a wrapper `<div data-i18n="outer">` containing
   `<p data-i18n="inner">` — `translate` is called for the outer wrapper and
   the inner paragraph is left to its own lookup only if its parent chain has
   no `[data-i18n]`; assert the actual observed calls (characterize, don't
   assume: record which keys `translate` received).
6. **Figure cutting**: body of `<p>a</p><div data-figure="tree"></div><p>b</p>`
   → three segments: html containing `a`, figure named `tree`, html containing
   `b`.
7. **Nested marker not cut** (the documented silent failure): a marker inside
   `<aside>` produces **no** figure segment; the empty div stays inside the
   html segment. Assert both.
8. **Wrapped-and-filtered marker vanishes entirely**: a marker inside
   `<div data-assistant="copilot">` under assistant `claude` yields neither a
   figure segment nor the div.
9. **Whitespace-only run dropped**: leading whitespace before a marker emits
   no empty html segment.
10. **Unknown icon left alone**: `<svg data-icon="no-such-icon"></svg>`
    survives unchanged (the registry returns null).

**Verify**: `npm test` → 10+ tests, all passing.

### Step 3: Keep the type check green

```bash
npm run build
```

If `tsc -b` fails on the new test file (vitest types unresolved in
`tsconfig.app.json`'s program), add to `front/tsconfig.app.json`:
`"exclude": ["src/**/*.test.ts", "src/**/*.test.tsx"]` — and note in the commit
message that vitest type-checks its own files at run time.

**Verify**: `npm run build` exit 0 and `npm run lint` exit 0.

## Test plan

This plan *is* the test plan: `content.test.ts` with the ten cases above. There
is no existing test to model after — this file becomes the exemplar future
frontend tests follow (plain vitest, no globals, `@` alias, one behavior per
`it`).

## Done criteria

- [ ] `npm test` exits 0 with ≥ 10 passing tests in `content.test.ts`
- [ ] Cases 3, 7, and 8 (the documented silent failures) each have a dedicated test
- [ ] `npm run build` exits 0; `npm run lint` exits 0
- [ ] `content.ts` unmodified (`git diff --stat` shows only the in-scope files)
- [ ] `plans/README.md` status row updated

## STOP conditions

Stop and report back if:

- jsdom's `DOMParser` diverges from the browser in a way that changes a
  pass's behavior (e.g. the `image/svg+xml` parse in the icon pass throws) —
  report the divergence rather than restructuring `content.ts`.
- A characterization reveals behavior that contradicts `front/CLAUDE.md`'s
  description — pin the *actual* behavior in the test, and report the
  contradiction separately.
- `npm install` pulls a vitest major that needs a Vite peer this repo doesn't
  have.

## Maintenance notes

- Plan 003's CI should gain `npm test` once this lands (noted there).
- Plans 005 and 006 build on this runner; execute them after.
- Anyone changing `prepareUnit`'s pass order will break these tests — that is
  the point; the failure message should send them to `front/CLAUDE.md` first.
