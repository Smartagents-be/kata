# Plan 009: Give the catalogue fetch a timeout

> **Executor instructions**: Follow this plan step by step. Run every
> verification command and confirm the expected result before moving to the
> next step. If anything in the "STOP conditions" section occurs, stop and
> report — do not improvise. When done, update the status row for this plan
> in `plans/README.md` — unless a reviewer dispatched you and told you they
> maintain the index.
>
> **Drift check (run first)**: `git diff --stat be5a6b2..HEAD -- front/src/shared/lib/api.ts front/src/shared/components/CatalogPanel.tsx`
> On changes, compare the excerpts below against the live code; mismatch = STOP.

## Status

- **Priority**: P2
- **Effort**: S
- **Risk**: LOW
- **Depends on**: none (004 enables the optional test)
- **Category**: bug
- **Planned at**: commit `be5a6b2`, 2026-08-02

## Why this matters

`request()` calls `fetch` with no timeout. The dev proxy targets
`localhost:8080`; a Spring Boot app that is starting, paused on a breakpoint,
or wedged accepts the TCP connection and never answers, so the promise neither
resolves nor rejects. `CatalogPanel` then sits in `loading` with its only
button disabled, and the sole recovery is a page reload. This happens on
`/catalog`, the page whose entire job is letting students poke at a service
they are actively starting and stopping, which is exactly when half-up backends
occur.

## Current state

- `front/src/shared/lib/api.ts:22-28`:

  ```ts
  async function request<T>(path: string, init?: RequestInit): Promise<T> {
    const response = await fetch(`/api${path}`, init)
    if (!response.ok) {
      throw new ApiError(`${init?.method ?? 'GET'} ${path} failed`, response.status)
    }
    return (await response.json()) as T
  }
  ```

  Two callers: `fetchTitles()` (used by `CatalogPanel`) and `checkAnswer()`
  (deliberately unused, kept pending a decision — root `CLAUDE.md` says leave
  it alone; it inherits the timeout via `request`, which is fine, but do not
  otherwise touch it).
- `front/src/shared/components/CatalogPanel.tsx:22-29` — `onFetch` sets
  `loading`, awaits `fetchTitles()`, lands on `loaded` or (any throw) `error`.
  The catch is already a catch-all, so a timeout rejection needs no new UI
  state: the existing `catalog.error` message ("could not reach the service"
  wording lives in the locale files) is the right message for a timeout too.
- The button at `CatalogPanel.tsx:43-57` is disabled only during `loading`.
- Browser support: `AbortSignal.timeout()` and `AbortSignal.any()` are fine for
  this app's baseline (Vite 8 / React 19 era browsers).

## Commands you will need

Run from `front/`.

| Purpose | Command | Expected on success |
|---|---|---|
| Type check + build | `npm run build` | exit 0 |
| Lint | `npm run lint` | exit 0 |
| Tests (if plan 004 landed) | `npm test` | all pass |

## Scope

**In scope**:
- `front/src/shared/lib/api.ts`
- `front/src/shared/lib/api.test.ts` (create, only if vitest is installed —
  see Test plan)

**Out of scope** (do NOT touch):
- `CatalogPanel.tsx` — its catch-all already handles the new rejection; no UI
  change is wanted.
- `checkAnswer` / `ExercisePanel` beyond what they inherit through `request`.
- Locale files (the existing error message covers the timeout case).
- `vite.config.ts` proxy settings.

## Git workflow

- Branch: `advisor/009-catalog-fetch-timeout`.
- One commit: `fix: time the API fetch out so a wedged backend frees the catalog button`.
- Do NOT push or open a PR unless the operator instructed it.

## Steps

### Step 1: Add the timeout in `request`

Modify `request` so every call carries a 10-second timeout while still
honoring a caller-provided signal:

```ts
async function request<T>(path: string, init?: RequestInit): Promise<T> {
  const timeout = AbortSignal.timeout(10_000)
  const signal = init?.signal ? AbortSignal.any([init.signal, timeout]) : timeout
  const response = await fetch(`/api${path}`, { ...init, signal })
  // ... unchanged from here
```

Match the file's comment style: one comment stating the constraint (a
half-started backend accepts the connection and never answers, so an un-timed
fetch never settles), not a narration of the code.

**Verify**: `npm run build && npm run lint` → exit 0.

### Step 2: Prove the behavior (choose by environment)

If vitest is installed (plan 004 landed): write `api.test.ts` —
`vi.stubGlobal('fetch', …)` with a never-resolving promise that rejects when
its signal fires; use `vi.useFakeTimers()` plus
`await vi.advanceTimersByTimeAsync(10_000)` and assert `fetchTitles()` rejects.
Second case: a fetch resolving normally still returns the parsed JSON.

If vitest is not installed: skip the test file, and instead verify manually —
`npm run dev`, open `/catalog` with no backend on `:8080`, press fetch, confirm
the error message appears (connection refused rejects fast; that exercises the
catch path), and note in your report that the 10s path was verified by reading.

**Verify**: `npm test` green, or the manual note recorded.

## Test plan

The two vitest cases above, in `front/src/shared/lib/api.test.ts`, modeled on
`content.test.ts` (plan 004). The timeout case is the regression pin; the
happy-path case guards the `AbortSignal.any` merge.

## Done criteria

- [ ] `request` passes a signal on every fetch; caller signals still honored
- [ ] `npm run build` and `npm run lint` exit 0
- [ ] Test file present and green, or the manual verification note recorded
- [ ] `CatalogPanel.tsx` unmodified
- [ ] `plans/README.md` status row updated

## STOP conditions

Stop and report back if:

- `AbortSignal.any` is rejected by the TypeScript lib in use (`ES2023` +
  `DOM` at the planned-at commit — if the DOM lib lacks it, report rather than
  casting around it).
- You find yourself wanting to add UI state or locale strings — out of scope.

## Maintenance notes

- If a future endpoint genuinely needs longer than 10 s, pass a caller signal
  (`request` merges it) rather than raising the default.
- If `ExercisePanel` is ever revived, it inherits this timeout; its
  "could not reach the service" message already fits.
