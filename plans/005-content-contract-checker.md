# Plan 005: Add a build-time checker for the unit-HTML content contract

> **Executor instructions**: Follow this plan step by step. Run every
> verification command and confirm the expected result before moving to the
> next step. If anything in the "STOP conditions" section occurs, stop and
> report — do not improvise. When done, update the status row for this plan
> in `plans/README.md` — unless a reviewer dispatched you and told you they
> maintain the index.
>
> **Drift check (run first)**: `git diff --stat be5a6b2..HEAD -- front/src/steps front/package.json`
> New units or steps since the planned-at commit are fine (the checker globs);
> a changed content *mechanism* (`content.ts`, `front/CLAUDE.md` rules) means
> re-reading the rules below before proceeding.

## Status

- **Priority**: P1
- **Effort**: S
- **Risk**: LOW
- **Depends on**: 004 (jsdom is installed there; execute 004 first)
- **Category**: tests / dx
- **Planned at**: commit `be5a6b2`, 2026-08-02

## Why this matters

The unit HTML files and their locale JSON are the highest-churn files in the
repo (step 1's `nl.json` alone has 25 commits), and the rules that keep them
rendering correctly are enforced by nothing but reviewer memory. Two mistakes
are *silent by design of the renderer*: an element carrying both
`data-audience` and `data-assistant` renders for one reader in four, and a
`data-figure` marker that is not a direct child of `<body>` silently drops its
figure. The documented audit cost is four manual render passes (2 modes × 2
assistants) per unit, per language. A ~100-line static check makes both
mistakes a red build.

## Current state

- Unit HTML lives at `front/src/steps/step*/units/*.html` (17 files across four
  steps at the planned-at commit; step 3 has three units, step 0 has two).
  Across them: ~394 distinct `data-i18n` keys, 52 `data-figure` markers.
- The rules, from `front/CLAUDE.md` (each verified against the renderer in
  `front/src/shared/lib/content.ts`):
  1. **Never both `data-audience` and `data-assistant` on one element.**
  2. **A `data-figure` marker is always a direct child of the body** (only
     top-level markers are cut into segments; content.ts:131-142).
  3. Prose keys stay in the step's own namespace. **One deliberate exception**:
     the "Test yourself" heading carries the literal key `ui:quiz.title` (a
     cross-namespace key, documented in `front/src/steps/step1/CLAUDE.md`).
     Any *other* `data-i18n` value containing `:` is an error.
- What is **not** an error, by design — the checker must not flag these:
  - A `data-i18n` key with no Dutch entry (partial translation degrades
    per-paragraph on purpose).
  - Locale JSON keys with no literal match in the HTML — many are composed at
    runtime from prefixes (`FlagBoard`'s `panel` prop builds `${panel}.check`,
    `TaskCard` builds `${prefix}.title`, figures read keys via `useStepText`).
    Orphan detection is a **warning**, never a failure.
- `front/package.json` has no `scripts/` dir and no check script today. After
  plan 004, `jsdom` is a devDependency and can be imported from a Node script.

## Commands you will need

Run from `front/`.

| Purpose | Command | Expected on success |
|---|---|---|
| Run the checker | `npm run check:content` | exit 0, summary line |
| Checker's own tests | `npm test` | all pass |
| Build + lint | `npm run build && npm run lint` | exit 0 |

## Scope

**In scope** (create/modify only):
- `front/scripts/check-content.mjs` (create)
- `front/scripts/check-content.test.ts` (create — tests the exported check
  functions against inline fixtures)
- `front/package.json` (add `"check:content": "node scripts/check-content.mjs"`)
- `front/vitest.config.ts` — only if the `scripts/` dir needs including in the
  test glob

**Out of scope** (do NOT touch):
- Any file under `front/src/steps/` — if the checker finds a real violation in
  the current tree, that is a STOP condition (report it; fixing content is not
  this plan).
- `front/src/shared/lib/content.ts`.
- CI config (plan 003's maintenance note covers wiring this in later).

## Git workflow

- Branch: `advisor/005-content-contract-checker`.
- One commit: `chore: add a static checker for the unit-HTML content contract`.
- Do NOT push or open a PR unless the operator instructed it.

## Steps

### Step 1: Write the checker

`front/scripts/check-content.mjs`, structured as exported pure functions plus a
CLI entry so the test file can import the logic:

- `collectViolations(html, unitName)` → array of `{rule, unitName, detail}`.
  Parse with jsdom (`new JSDOM(html)`), then:
  - **rule `both-filters`**: `document.querySelectorAll('[data-audience][data-assistant]')`
    — any hit is an error.
  - **rule `nested-figure`**: for each `[data-figure]`, error if
    `element.parentElement !== document.body`.
  - **rule `foreign-namespace`**: for each `[data-i18n]`, error if the value
    contains `:` and is not exactly `ui:quiz.title`.
- `collectWarnings(stepDir)` → orphaned `nl.json` keys: keys present in the
  step's `locales/nl.json` that appear as a *literal substring* in none of the
  step's `units/*.html` or `*.tsx`/`*.ts` files. Substring match (not exact
  key match) is what absorbs the runtime-composed prefixes: `workshop.panel.check`
  is composed, but the prefix `workshop.panel` appears literally in the caller.
  Print warnings; they never affect the exit code.
- CLI entry: glob `src/steps/step*/units/*.html` (use `node:fs` `readdirSync`,
  no new dependencies), run both collectors, print a per-step summary, exit 1
  iff any violation.

**Verify**: `npm run check:content` → exit 0 on the current tree, and the
summary names all four steps and a unit count ≥ 17.

### Step 2: Test the checker against fixtures

`front/scripts/check-content.test.ts` with inline HTML fixtures, one per rule:

1. clean fixture → no violations
2. `<p data-audience="self" data-assistant="claude">` → one `both-filters`
3. `<aside><div data-figure="x"></div></aside>` → one `nested-figure`
4. `<h2 data-i18n="ui:quiz.title">` → no violation (the documented exception)
5. `<p data-i18n="ui:something.else">` → one `foreign-namespace`

**Verify**: `npm test` → previous suites plus ≥ 5 new tests, all green.

### Step 3: Wire the script

Add `"check:content": "node scripts/check-content.mjs"` to `front/package.json`
scripts.

**Verify**: `npm run check:content && npm run build && npm run lint` → all exit 0.

## Test plan

Step 2's fixture tests are the suite. Model the file layout on
`src/shared/lib/content.test.ts` from plan 004 (plain vitest imports, one rule
per `it`).

## Done criteria

- [ ] `npm run check:content` exits 0 on the current tree and prints a summary
- [ ] Each of the three rules has a fixture test proving it fires, plus the
      `ui:quiz.title` exception proving it doesn't overfire
- [ ] Orphan detection prints warnings only (force one by temporarily reading a
      fake key in the test fixture, not by editing real locales)
- [ ] `npm test`, `npm run build`, `npm run lint` all exit 0
- [ ] No file under `front/src/steps/` modified
- [ ] `plans/README.md` status row updated

## STOP conditions

Stop and report back if:

- The checker finds a violation in the **current** tree — the tree was clean
  for all three rules at the planned-at commit (re-derived by hand during the
  audit), so a hit means either new content drifted or your rule is wrong.
  Diagnose which, then report; do not edit content.
- More than ~30 orphan warnings appear — the substring heuristic is too naive
  for the real composition patterns; report the noisy prefixes instead of
  shipping a warning wall nobody will read.

## Maintenance notes

- Wire into CI after landing (plan 003's frontend job, after `npm run lint`).
- When a legitimate second cross-namespace key ever appears, the exception
  list in `check-content.mjs` is where it goes — keep it a literal list.
- The orphan warning list is the input for occasional locale housekeeping; it
  is deliberately not a gate.
