# Plan 010: Lazy-load the `/present` route

> **Executor instructions**: Follow this plan step by step. Run every
> verification command and confirm the expected result before moving to the
> next step. If anything in the "STOP conditions" section occurs, stop and
> report — do not improvise. When done, update the status row for this plan
> in `plans/README.md` — unless a reviewer dispatched you and told you they
> maintain the index.
>
> **Drift check (run first)**: `git diff --stat be5a6b2..HEAD -- front/src/App.tsx front/src/shared/routes/PresentationPage.tsx front/src/shared/deck`
> On changes, compare the excerpts below against the live code; mismatch = STOP.

## Status

- **Priority**: P2
- **Effort**: S
- **Risk**: LOW
- **Depends on**: none
- **Category**: perf
- **Planned at**: commit `be5a6b2`, 2026-08-02

## Why this matters

`/present` is the tutor's presentation deck, reached from the cogwheel; a
student never opens it. Yet `App.tsx` imports `PresentationPage` statically, so
every visitor's entry chunk parses ~74 KB of unminified vendored deck engine
(`shared/deck/deck-stage.js`) plus the slide layer and step 1's 443-line slide
spec, to render a lesson page. The route already sits outside `AppShell`, so it
is structurally ready to split.

## Current state

- `front/src/App.tsx:1-14`:

  ```tsx
  import { PresentationPage } from '@/shared/routes/PresentationPage'
  // ...
  <Route path="present" element={<PresentationPage />} />
  ```

- `front/src/shared/routes/PresentationPage.tsx` uses a **named** export
  (`export function PresentationPage()`), and imports the engine for its side
  effect at module scope:

  ```tsx
  // Imported for its side effect: defines the <deck-stage> element before anything below renders.
  import '@/shared/deck/deck-stage.js'
  ```

  Because that side-effect import lives in the same module, lazy-loading the
  module keeps the custom-element definition ordered before first render of
  `<deck-stage>`. Nothing else imports `deck-stage.js`
  (verify: `grep -rn "deck-stage.js" front/src` → only this file and its
  `.d.ts` reference).
- Repo conventions that apply: named exports throughout (do not convert the
  page to a default export); every rendered element carries `id` +
  `data-component` (a `Suspense` with `fallback={null}` renders nothing, so no
  attributes are owed); `shared/deck/deck-stage.js` is vendored verbatim and
  must not be edited.
- There is no `React.lazy` or `Suspense` anywhere in `front/src` today — this
  introduces the pattern; keep it minimal and idiomatic.

## Commands you will need

Run from `front/`.

| Purpose | Command | Expected on success |
|---|---|---|
| Build | `npm run build` | exit 0; output lists a separate chunk for the page |
| Lint | `npm run lint` | exit 0 |
| Tests (if present) | `npm test` | all pass |

## Scope

**In scope**:
- `front/src/App.tsx` only

**Out of scope** (do NOT touch):
- `PresentationPage.tsx` (keep its named export; no default export added)
- `shared/deck/deck-stage.js` (vendored, byte-for-byte)
- Any other route; no prefetch-on-hover work (noted for later, see
  Maintenance)

## Git workflow

- Branch: `advisor/010-lazy-present-route`.
- One commit: `perf: lazy-load the presentation deck route`.
- Do NOT push or open a PR unless the operator instructed it.

## Steps

### Step 1: Split the route

In `front/src/App.tsx`, replace the static import with:

```tsx
import { lazy, Suspense } from 'react'

// The deck is the tutor's, reached from the cogwheel; a student never loads it.
// Lazy so its vendored engine stays out of the entry chunk.
const PresentationPage = lazy(() =>
  import('@/shared/routes/PresentationPage').then((m) => ({ default: m.PresentationPage })),
)
```

and wrap the route element:

```tsx
<Route
  path="present"
  element={
    <Suspense fallback={null}>
      <PresentationPage />
    </Suspense>
  }
/>
```

**Verify**: `npm run build` → exit 0, and the vite output lists a new chunk
whose name contains `PresentationPage` (record its size in your report — expect
roughly 80–120 KB raw moved out of the entry).

### Step 2: Confirm the entry shrank and the deck still works

Compare `dist/assets/index-*.js` size against a pre-change build if available
(`git stash` the change, build, note size, restore — acceptable since the
change is one file). Then `npm run dev`, open `http://localhost:5173/present`:
the deck renders, arrow keys advance, Escape leaves.

**Verify**: entry chunk smaller by roughly the new chunk's share; deck loads
with no console error about `deck-stage` being undefined as a custom element.

## Test plan

No unit test — the behavior is chunking, which the build output verifies, plus
the manual smoke in Step 2. If a browser-automation tool is available in your
environment, loading `/present` and asserting `document.querySelector('deck-stage')`
is defined is the smoke equivalent.

## Done criteria

- [ ] `App.tsx` is the only modified file
- [ ] Build emits a separate `PresentationPage` chunk; entry chunk shrank
- [ ] `/present` renders and Escape leaves (manual or automated smoke)
- [ ] `npm run build`, `npm run lint` (and `npm test` if present) exit 0
- [ ] `plans/README.md` status row updated

## STOP conditions

Stop and report back if:

- The deck renders as empty/unstyled slides after the split (would indicate
  the custom-element definition raced the first render — report; do not start
  editing `PresentationPage.tsx` or the vendored engine).
- Vite emits a warning that the lazy chunk was hoisted back into the entry
  (something else statically imports the module graph — find and report the
  importer; `shared/deck/slides.tsx` importing `@/steps` is expected and fine
  *inside* the lazy chunk).

## Maintenance notes

- A follow-up nicety (not this plan): prefetch the chunk when the settings
  popover opens, so the tutor never sees a blank frame in class.
- The deeper split — step content and locales out of the entry chunk — is a
  recorded deferred item (see `plans/README.md`); it requires first resolving
  the documented `shared` -> `@/steps` seam and is deliberately not part of
  this plan.
