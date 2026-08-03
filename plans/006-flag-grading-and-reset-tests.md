# Plan 006: Test the flag-grading path and the reset contract, without touching a flag

> **Executor instructions**: Follow this plan step by step. Run every
> verification command and confirm the expected result before moving to the
> next step. If anything in the "STOP conditions" section occurs, stop and
> report — do not improvise. When done, update the status row for this plan
> in `plans/README.md` — unless a reviewer dispatched you and told you they
> maintain the index.
>
> **SECURITY RULE FOR THIS PLAN**: this repo's exercises are guarded by
> "flags" — leetspeak strings in `{braces}` whose plaintext must never appear
> in `front/` source or in any test file. Every fixture in this plan is
> synthetic (invented strings, digests computed inside the test). If you ever
> find yourself typing a real flag value, a real salt's expected plaintext, or
> pasting a digest from a `flags.ts` file into an equality assertion against a
> plaintext, STOP.
>
> **Drift check (run first)**: `git diff --stat be5a6b2..HEAD -- front/src/shared/lib/hash.ts front/src/shared/lib/reset.ts front/src/steps/step2/FlagBoard.tsx`
> On any change, compare the "Current state" excerpts against the live code
> before proceeding; on a mismatch, STOP.

## Status

- **Priority**: P2
- **Effort**: S
- **Risk**: MED (the risk is authoring: leaking exercise material into tests)
- **Depends on**: plans/004-vitest-prepareunit-characterization.md
- **Category**: tests
- **Planned at**: commit `be5a6b2`, 2026-08-02

## Why this matters

Flag boards are the product's grading loop: a student pastes a flag, the board
hashes `salt + input` with SHA-256 and compares against a committed digest. A
wrong or stale digest is undetectable by inspection and by the type checker, and
its failure mode is a student who did the exercise correctly being told they are
wrong, in a classroom. Separately, `resetProgress()` decides what a reset
destroys versus preserves with one unguarded regex — the feature exists so "a
room of machines can be handed to the next group", and both failure directions
(a preference wrongly cleared, a previous student's flags wrongly surviving) are
silent. None of this has any automated verification.

## Current state

- `front/src/shared/lib/hash.ts` — the whole grading primitive:

  ```ts
  export async function sha256Hex(input: string): Promise<string> {
    const bytes = new TextEncoder().encode(input)
    const digest = await crypto.subtle.digest('SHA-256', bytes)
    return [...new Uint8Array(digest)].map((byte) => byte.toString(16).padStart(2, '0')).join('')
  }
  ```

- `front/src/shared/lib/reset.ts`:

  ```ts
  const STEP_FLAG_KEY = /^kata\.step\d+\./
  export function resetProgress(): void {
    // removes every localStorage key matching STEP_FLAG_KEY, plus PROGRESS_STORAGE_KEY
  }
  ```

  Preserved by contract (keys outside the prefix): `kata.mode`
  (`shared/mode/mode.ts:15`), `kata.assistant`
  (`shared/assistant/assistant.ts:24`), `kata.locale`
  (`shared/i18n/locale.ts:14`). Cleared: every `kata.step<N>.…` key plus
  `kata.completed` (`shared/progress/progress.ts:7`).
- `front/src/steps/step2/FlagBoard.tsx` — the **parameterized** board (step 1's
  is a hard-coded twin; test the parameterized one):

  ```ts
  export interface FlagBoardProps {
    block: string
    storageKey: string   // must start `kata.step2.` so a reset clears it
    salt: string
    flags: FlagSpec[]
    panel: string
  }
  ```

  It hashes pasted input as `sha256Hex(salt + input)` and persists solved ids
  as a JSON string-array under `storageKey`. `readSolved` swallows parse errors
  into an empty set. `FlagSpec` is `{ id, hash, … }` — read the interface at
  `front/src/steps/step2/flags.ts:16-27` for the exact fields before building
  fixtures.
- The board renders through i18n (`useStepText('step2')`) and shadcn `ui/`
  primitives; rendering it in jsdom therefore needs the i18n module imported
  (side-effect init) and React Testing Library.
- jsdom does **not** ship `crypto.subtle` in all versions — Node's
  `globalThis.crypto` does. Vitest on Node ≥ 20 exposes it; verify early
  (Step 1's vector test is exactly that probe).

## Commands you will need

Run from `front/`.

| Purpose | Command | Expected on success |
|---|---|---|
| Install | `npm install -D @testing-library/react @testing-library/user-event` | exit 0 |
| Tests | `npm test` | all pass |
| Build + lint | `npm run build && npm run lint` | exit 0 |

## Scope

**In scope** (create/modify only):
- `front/src/shared/lib/hash.test.ts` (create)
- `front/src/shared/lib/reset.test.ts` (create)
- `front/src/steps/step2/FlagBoard.test.tsx` (create)
- `front/package.json` + lockfile (the two testing-library devDependencies)

**Out of scope** (do NOT touch):
- `hash.ts`, `reset.ts`, either `FlagBoard.tsx`, any `flags.ts` /
  `setup-flags.ts` — behavior is pinned as-is.
- Step 1's `FlagBoard` (the consolidation is plan-README's deferred item; these
  tests are its prerequisite, not its vehicle).
- Any real flag, salt-plaintext pair, or digest-to-plaintext assertion.

## Git workflow

- Branch: `advisor/006-flag-grading-reset-tests`.
- One commit: `test: pin the flag-grading hash, the board behavior and the reset contract`.
- Do NOT push or open a PR unless the operator instructed it.

## Steps

### Step 1: Pin the hash against a published vector

`hash.test.ts`: assert `await sha256Hex('abc')` equals
`ba7816bf8f01cfea414140de5dae2223b00361a396177a9cb410ff61f20015ad` (the
FIPS 180-2 test vector — public, nothing to do with any flag). Add a
round-trip: `sha256Hex('salt' + 'value')` equals itself computed twice.

**Verify**: `npm test -- hash` → 2 passing. If `crypto.subtle` is undefined in
the test environment, STOP (report the vitest/jsdom environment combination).

### Step 2: Pin the reset contract

`reset.test.ts`: seed `localStorage` with one key per class —
`kata.step1.flags`, `kata.step2.workshop`, `kata.step0.intro.v2`,
`kata.completed`, `kata.mode`, `kata.assistant`, `kata.locale`, `unrelated.key`
— call `resetProgress()`, then assert the first four are gone and the last four
survive. Import the storage-key constants from their modules rather than
retyping where they are exported (`PROGRESS_STORAGE_KEY`, `MODE_STORAGE_KEY`,
`ASSISTANT_STORAGE_KEY`, `LOCALE_STORAGE_KEY`).

**Verify**: `npm test -- reset` → passing, both directions asserted.

### Step 3: Test the parameterized board with synthetic flags

`FlagBoard.test.tsx`. Build fixtures **inside the test**:

```ts
const SALT = 'test-salt'
const makeFlags = async () => [
  { ...minimal FlagSpec fields..., id: 'alpha', hash: await sha256Hex(SALT + '{t3st_fl4g_4lph4}') },
]
```

(`{t3st_fl4g_4lph4}` is an invented string that exists nowhere in the repo —
that is what makes it safe.) Render `<FlagBoard block="test-flags"
storageKey="kata.step2.test" salt={SALT} flags={flags} panel="workshop.panel"
/>` inside the app's i18n (import `@/shared/i18n/i18n` for its side effect).
Cases:

1. wrong paste → the row shows its wrong state and nothing is persisted
2. right paste → row solved, `localStorage['kata.step2.test']` contains `"alpha"`
3. remount with storage pre-seeded → row starts solved (persistence round-trip)
4. corrupt storage (`localStorage.setItem(key, 'not json')`) → board renders
   with zero solved instead of throwing

Locate rows via the repo's own convention — every element carries an `id` and
`data-component`; the board's rows are `#<block>-item-<n>` with
`data-state="solved" | "locked"` (see `front/CLAUDE.md`, "Naming what is on
the page"). Query by those attributes, not by text.

**Verify**: `npm test` → all suites green.

### Step 4: Full gate

```bash
npm test && npm run build && npm run lint
```

**Verify**: all exit 0.

## Test plan

Steps 1–3 are the test plan. Model structure on `content.test.ts` (plan 004).
The FlagBoard test is the repo's first component test; keep it free of
snapshots — assert `data-state` and storage contents only.

## Done criteria

- [ ] `npm test` green: hash vector, reset both-directions, four board cases
- [ ] `grep -rn "{" front/src/steps/step2/FlagBoard.test.tsx | grep -iv 't3st\|test'`
      shows no `{…}`-wrapped leetspeak other than the invented fixtures
- [ ] No real digest from any `flags.ts` appears in any test file
- [ ] `npm run build` and `npm run lint` exit 0
- [ ] Only in-scope files modified
- [ ] `plans/README.md` status row updated

## STOP conditions

Stop and report back if:

- `crypto.subtle` is unavailable under the vitest environment.
- Rendering `FlagBoard` in jsdom fails on a shadcn/radix primitive (portal or
  pointer APIs) — report which primitive; do not stub half the UI library to
  force it.
- You cannot express a case without a real flag value.

## Maintenance notes

- These tests are the safety net for the deferred FlagBoard consolidation
  (two near-identical boards, step 1 hard-coded, step 2 parameterized): run
  them before and after any such move; salts, storage keys and element ids
  must stay byte-identical through it.
- If a board ever changes its storage format from a JSON string-array, case 3
  is the test that catches the silent loss of everyone's solved flags.
