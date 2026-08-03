# Plan 012: Move localStorage writes out of React state updaters

> **Executor instructions**: Follow this plan step by step. Run every
> verification command and confirm the expected result before moving to the
> next step. If anything in the "STOP conditions" section occurs, stop and
> report — do not improvise. When done, update the status row for this plan
> in `plans/README.md` — unless a reviewer dispatched you and told you they
> maintain the index.
>
> **Drift check (run first)**: `git diff --stat be5a6b2..HEAD -- front/src/shared/components/TaskCard.tsx front/src/steps/step1/FlagBoard.tsx front/src/steps/step2/FlagBoard.tsx front/src/shared/progress/ProgressProvider.tsx front/src/steps/step0/CodeCheck.tsx`
> On changes, compare the excerpts below against the live code; mismatch on a
> given site = skip that site and note it.

## Status

- **Priority**: P3
- **Effort**: S
- **Risk**: LOW
- **Depends on**: none (run after plan 006 if both are scheduled, so its board
  tests guard this refactor)
- **Category**: bug (latent)
- **Planned at**: commit `be5a6b2`, 2026-08-02

## Why this matters

React state updater functions must be pure; the app runs under `StrictMode`
(`front/src/main.tsx`), which double-invokes them in development. Five sites
perform storage I/O during an updater or during render. Today every one is
idempotent, so nothing visibly breaks — which is exactly how the pattern
survives until an updater stops being idempotent (a counter, an append, a
timestamp) and produces a dev-only doubled write that nobody can reproduce.
This is also a course that teaches engineering quality; its own shared
components should model the rule.

## Current state

The five sites, verified at the planned-at commit:

1. `front/src/shared/components/TaskCard.tsx:87-92`:

   ```tsx
   function toggle() {
     setDone((current) => {
       writeDone(storageKey, !current)
       return !current
     })
   }
   ```

2. `front/src/steps/step1/FlagBoard.tsx:57-63`:

   ```tsx
   function markSolved(id: string) {
     setSolved((current) => {
       const next = new Set(current).add(id)
       writeSolved(next)
       return next
     })
   }
   ```

3. `front/src/steps/step2/FlagBoard.tsx` — same shape as (2), with
   `writeSolved(storageKey, next)` (the parameterized twin; find `markSolved`).

4. `front/src/shared/progress/ProgressProvider.tsx:8-19`:

   ```tsx
   const markComplete = useCallback((key: string) => {
     setCompleted((current) => {
       if (current.has(key)) {
         return current
       }
       const next = new Set(current)
       next.add(key)
       storeProgress(next)
       return next
     })
   }, [])
   ```

5. `front/src/steps/step0/CodeCheck.tsx:58-62` — a **render-phase read** (every
   render, not once):

   ```tsx
   const storageKey = `kata.step0.${code.id}.v2`
   const stored = readSolved(storageKey)
   const [solved, setSolved] = useState(() => stored !== null)
   const [value, setValue] = useState(() => stored ?? '')
   ```

Repo conventions: comments state constraints, not narration; components keep
their `id`/`data-component` output identical (this plan changes no rendered
element).

## Commands you will need

Run from `front/`.

| Purpose | Command | Expected on success |
|---|---|---|
| Type check + build | `npm run build` | exit 0 |
| Lint | `npm run lint` | exit 0 |
| Tests (if plans 004/006 landed) | `npm test` | all pass, incl. FlagBoard persistence cases |

## Scope

**In scope** (modify only):
- `front/src/shared/components/TaskCard.tsx`
- `front/src/steps/step1/FlagBoard.tsx`
- `front/src/steps/step2/FlagBoard.tsx`
- `front/src/shared/progress/ProgressProvider.tsx`
- `front/src/steps/step0/CodeCheck.tsx`

**Out of scope** (do NOT touch):
- Storage key names, formats, or the write helpers themselves
  (`writeDone`/`writeSolved`/`storeProgress` bodies stay as they are)
- Any rendered markup, id, or `data-state` value
- Consolidating the two FlagBoards (recorded as a separate deferred item)

## Git workflow

- Branch: `advisor/012-purify-storage-writes`.
- One commit: `fix: keep storage writes out of state updaters and render`.
- Do NOT push or open a PR unless the operator instructed it.

## Steps

### Step 1: Event-scope the writes at sites 1-3

The updater becomes pure; the write happens in the event handler with the next
value computed once. Pattern (TaskCard):

```tsx
function toggle() {
  setDone((current) => !current)
  writeDone(storageKey, !done)
}
```

is **wrong** (stale `done`); instead compute next from the current state value
the handler closes over only when that is provably current, or — the shape to
use here — keep the functional update and mirror the write in an effect:

```tsx
const [done, setDone] = useState(() => readDone(storageKey))
useEffect(() => {
  writeDone(storageKey, done)
}, [storageKey, done])

function toggle() {
  setDone((current) => !current)
}
```

The mount-time effect re-persists what was just read, which is idempotent by
the storage format (a boolean / a JSON array of ids). Apply the same
effect-mirror shape to both FlagBoards (`useEffect` on `[solved]`, writing via
the existing helper). Keep one short comment on why the write lives in an
effect (StrictMode double-invokes updaters; the write is I/O).

**Verify**: `npm run build && npm run lint` → exit 0. If plan 006's tests
exist: `npm test` → the persistence round-trip cases still pass (this is the
real check: solve → storage written; remount → still solved).

### Step 2: ProgressProvider

Same effect-mirror: `useEffect(() => { storeProgress(completed) }, [completed])`,
and `markComplete`'s updater drops the `storeProgress` call (the no-op branch
returning `current` means the effect will not re-fire for already-done keys —
same write frequency as today, minus the mount write, which is idempotent).

**Verify**: `npm run build` exit 0; manually (or via tests) confirm paging past
a unit still marks it done after reload (`npm run dev`, visit a unit, page
past, reload, tick still shown).

### Step 3: CodeCheck's render-phase read

Make the read once-per-mount:

```tsx
const storageKey = `kata.step0.${code.id}.v2`
const [stored] = useState(() => readSolved(storageKey))
const [solved, setSolved] = useState(() => stored !== null)
const [value, setValue] = useState(() => stored ?? '')
```

(`stored` needs no setter; the array destructure keeps it stable.) Everything
else in the component stays as is — its solve path writes storage in an async
`verify` handler, which is already outside any updater; confirm that by
reading the rest of the file before touching it.

**Verify**: `npm run build` exit 0; `npm run dev`, open step 0's welcome
exercise: a previously-solved box still shows its code back on reload.

## Test plan

Plan 006's FlagBoard cases are the regression net for sites 2-3. Sites 1, 4, 5
are covered by the manual checks named in their steps; if plan 006 landed, add
one TaskCard case to its suite only if trivial (render, click, assert storage
key) — optional, note either way.

## Done criteria

- [ ] No `write*`/`storeProgress` call inside any `set*` updater
      (`grep -n 'storeProgress\|writeSolved\|writeDone' front/src -r` shows
      calls only in effects, helpers, and event handlers)
- [ ] `CodeCheck` reads storage once per mount, not per render
- [ ] Rendered markup unchanged (`git diff` shows no JSX attribute changes)
- [ ] `npm run build`, `npm run lint`, and (if present) `npm test` all exit 0
- [ ] Manual checks in Steps 2-3 pass
- [ ] `plans/README.md` status row updated

## STOP conditions

Stop and report back if:

- Plan 006's tests fail after a site's change — the effect-mirror altered
  observable persistence timing in a way the tests notice; report rather than
  weakening a test.
- A site's live code no longer matches its excerpt (drift check).
- You find a **sixth** site while grepping — fix it only if it matches the
  exact pattern; otherwise report it.

## Maintenance notes

- The effect-mirror pattern is now the house shape for persisted component
  state; the FlagBoard consolidation (deferred) should inherit it.
- Reviewers of future boards: the thing to reject is I/O inside a `set*`
  callback; the tests from plan 006 catch the persistence outcome, not the
  purity itself.
