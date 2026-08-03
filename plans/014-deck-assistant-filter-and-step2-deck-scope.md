# Plan 014: Add an assistant filter to the deck, and scope step 2's deck

> **Executor instructions**: Two halves. Half A is a small, real implementation
> (the filter mechanism, no new slides). Half B is a scoping report for step
> 2's deck — investigation only, no slide authoring. Follow the steps in
> order; on any STOP condition, stop and report. When done, update the status
> row for this plan in `plans/README.md` — unless a reviewer dispatched you
> and told you they maintain the index.
>
> **Drift check (run first)**: `git diff --stat be5a6b2..HEAD -- front/src/shared/deck front/src/steps/step1/deck.tsx front/src/steps/step2`
> On changes to the deck machinery, re-read `front/CLAUDE.md`'s "The
> presentation deck" section before proceeding; it is the authority on why the
> deck is shaped as it is.

## Status

- **Priority**: P3
- **Effort**: S (half A) + M (half B's investigation)
- **Risk**: MED — half A touches machinery under 41 working slides
- **Depends on**: none
- **Category**: direction / design
- **Planned at**: commit `be5a6b2`, 2026-08-02

## Why this matters

The maintainer's own audit (audit.md item 67, effort ●●●) records two facts.
The deck covers step 1 only — 41 data-driven slides — while steps 2 and 3 have
no `deck.tsx` across thirteen units, so a tutor presents most of the course off
the student page. And the deck has **no assistant filter**, so step 1's two
newest figures (Claude-only, in the `model` unit) are the first figures in the
course that cannot go on a board at all. The filter is small and mechanical;
the step 2 deck is authoring work that needs scoping before anyone commits to
it. This plan does the first and scopes the second.

## Current state

- `front/src/shared/deck/slide-spec.ts` — `SlideSpec` fields: `id`, `kind`
  (`divider | figure | statement`), `ns?`, `eyebrow?`, `title`, `note?`,
  `figure?`, `scale?`, `figureWidth?`. No audience/assistant field.
- `front/src/shared/deck/slides.tsx:40-54` — the deck is assembled at **module
  scope** and rendered by a component:

  ```tsx
  const DECK: SlideSpec[] = [...OPENING, ...steps.flatMap((step) => step.deck ?? [])]

  export function DeckSlides() {
    return (
      <>
        {DECK.map((spec, index) => (
          <SlideTemplate key={spec.id} spec={spec} index={index} total={DECK.length} />
        ))}
      </>
    )
  }
  ```

  A filter that depends on the current assistant cannot live in a module-scope
  const; the list moves inside the component (or a `useMemo`) reading
  `useAssistant()`.
- Assistant state: `front/src/shared/assistant/` — `Assistant` =
  `'claude' | 'copilot'`, a provider + `useAssistant()` hook, persisted under
  `kata.assistant`. Check how `PresentationPage` sits relative to the provider:
  the `/present` route renders **outside `AppShell`**
  (`front/src/App.tsx:14`), so verify the assistant provider wraps the router
  (look in `front/src/main.tsx`) and not just the shell — if it wraps only the
  shell, the hook will throw or default on `/present`, and that placement fact
  belongs in your report and shapes where the filter reads the value.
- Deck rules that bind any change (`front/CLAUDE.md`, "The presentation deck"):
  slides are data, not JSX; `index`/`total` fall out of array position (so a
  filtered deck renumbers automatically — that is desired); every direct child
  of `<deck-stage>` is a slide; four figures are kept off slides because they
  write localStorage on the tutor's machine (`TaskCard`s and `FlagBoard`);
  `deck-stage.js` is vendored and must not be edited.
- Semantics to implement (mirroring unit filtering): a `SlideSpec` with no
  `assistant` field shows for every assistant; `assistant: 'claude'` shows only
  when the current assistant is `claude`; same for `'copilot'`.
- Step 2 raw material for half B: 18 figure components in
  `front/src/steps/step2/` (audit item 67 calls them "all the reusable kind"
  apart from the boards/cards), 10 units, no `deck.tsx`.
- Step 1's `deck.tsx` (443 lines) is the exemplar for what a step's slide list
  looks like; `front/src/steps/step1/CLAUDE.md` documents per-figure slide
  reasoning (e.g. which block leads with a statement slide and why).

## Commands you will need

Run from `front/`.

| Purpose | Command | Expected on success |
|---|---|---|
| Type check + build | `npm run build` | exit 0 |
| Lint | `npm run lint` | exit 0 |
| Tests (if present) | `npm test` | all pass |
| Dev smoke | `npm run dev` then open `/present` | 42 sections (41 + opening) |

## Scope

**In scope**:
- `front/src/shared/deck/slide-spec.ts` (add the optional `assistant` field)
- `front/src/shared/deck/slides.tsx` (filter inside the component)
- `plans/reports/014-step2-deck-scope.md` (create; `plans/reports/` may exist
  from plan 013)

**Out of scope** (do NOT touch):
- `front/src/steps/step1/deck.tsx` — **no slide gains an `assistant` value in
  this plan.** Tagging the two Claude-only `model` figures is curriculum
  judgment; half B's report proposes it, the maintainer applies it.
- `SlideTemplate.tsx`, `SlideFigure.tsx`, `deck-stage.js`, `PresentationPage.tsx`
- Creating any `deck.tsx` for step 2 or 3; authoring any slide
- Step 2's figures themselves

## Git workflow

- Branch: `advisor/014-deck-assistant-filter`.
- Two commits: `feat(deck): filter slides by assistant` and
  `docs: scope step 2's deck`.
- Do NOT push or open a PR unless the operator instructed it.

## Steps

### Step 1 (half A): the spec field

Add to `SlideSpec`, with a doc comment in the file's own voice stating the
semantics (absent = every assistant, mirroring `data-assistant` on unit
elements):

```ts
/** Show this slide only for one assistant. Absent means every assistant,
 *  the same rule `data-assistant` follows in unit HTML. */
assistant?: Assistant
```

Import the `Assistant` type from `@/shared/assistant/assistant` (type-only
import; `shared/deck` importing a `shared/assistant` type crosses no boundary —
both are `shared`).

**Verify**: `npm run build` → exit 0.

### Step 2 (half A): filter where the deck is assembled

In `slides.tsx`, move the deck assembly inside `DeckSlides` (a `useMemo` keyed
on the assistant), filtering before mapping, so `index`/`total` renumber
automatically:

```tsx
export function DeckSlides() {
  const { assistant } = useAssistant()   // match the hook's real shape — read the module first
  const deck = useMemo(
    () => [...OPENING, ...steps.flatMap((step) => step.deck ?? [])]
      .filter((spec) => !spec.assistant || spec.assistant === assistant),
    [assistant],
  )
  return (
    <>
      {deck.map((spec, index) => (
        <SlideTemplate key={spec.id} spec={spec} index={index} total={deck.length} />
      ))}
    </>
  )
}
```

First read `front/src/shared/assistant/` for the hook's actual name and return
shape and adjust. If the provider does not wrap `/present` (see Current state),
STOP — report the provider placement rather than moving providers around.

**Verify**: `npm run build && npm run lint` → exit 0. `npm run dev`, open
`/present`: slide count and order identical to before (no slide is tagged yet,
so the filter must be a no-op — that is the safety property). Flip the
assistant in the cogwheel, revisit `/present`: still identical.

### Step 3 (half B): scope step 2's deck

Read: audit item 67's full row (audit.md, Table 3 area), `front/CLAUDE.md`'s
deck section, step 1's `deck.tsx` for the authoring shape, and step 2's
registry + figures (`front/src/steps/step2/index.tsx`, the 18 figure
components, and `front/src/steps/step2/CLAUDE.md` for what each figure is
for). Write `plans/reports/014-step2-deck-scope.md`:

1. **Figure inventory**: the 18 figures, each with: unit, what it argues (one
   line, from the step's CLAUDE.md where recorded), slide-suitable yes/no, and
   the reason for every no (the localStorage rule catches `Workshop`,
   `SetupFlags` and any `TaskCard`/board; note each explicitly).
2. **Slide-list sketch**: per unit, the divider/statement/figure sequence a
   deck would take, on step 1's precedent (which blocks lead with a statement
   and why) — a numbered list of slide specs in prose, not code.
3. **The i18n consequence**: step 2's slide text lands in the `step2`
   namespace (the rule and its reason are in `front/CLAUDE.md`), so every
   slide needs an EN and NL key pair; count them.
4. **Effort**: slides counted, keys counted, a coarse total; flag the units
   where no existing figure carries the argument (candidate statement-only
   blocks vs. figures someone must draw — drawing is out of any executor's
   scope and priced as maintainer work).
5. **Step 3's deck**: one paragraph only — it has no figures at all (audit item
   67), so its deck is invention, not assembly; recommend treating it as a
   separate decision. Do not scope it further.
6. **The two Claude-only `model` figures**: name them (identify from
   `front/src/steps/step1/CLAUDE.md`'s model section and the registry), and
   propose the `assistant: 'claude'` tagging as a one-line-each follow-up for
   the maintainer now that the mechanism exists.

**Verify**: report exists; `git status --porcelain` shows exactly the three
in-scope files (+ index row).

## Test plan

The filter's safety property is Step 2's no-op verification (untagged deck
renders identically for both assistants). If vitest is installed, add one unit
test for the filter predicate as a pure function (extract it if that keeps
`slides.tsx` clean; otherwise test via a small exported helper) — optional,
note either way.

## Done criteria

- [ ] `SlideSpec.assistant` exists, documented, optional
- [ ] Deck assembly filters inside the component; module-scope `DECK` const gone
- [ ] `/present` renders identically for both assistant settings (41+1 slides)
- [ ] No slide tagged; `step1/deck.tsx` untouched
- [ ] Report present with the six sections; no slide authored
- [ ] `npm run build`, `npm run lint` (and `npm test` if present) exit 0
- [ ] `plans/README.md` status row updated

## STOP conditions

Stop and report back if:

- The assistant provider does not wrap the `/present` route (Step 2's check) —
  the fix touches provider architecture and needs the maintainer.
- Slide count changes after the refactor with zero slides tagged — the filter
  is not the no-op it must be; do not ship it.
- Anything tempts you to edit `deck-stage.js` or `SlideTemplate` — the filter
  belongs entirely in the assembly.

## Maintenance notes

- The follow-up (maintainer or a later plan): tag the two Claude-only `model`
  figures' slides per the report, which is the moment the filter starts doing
  visible work — and the moment a Copilot tutor's deck first differs from a
  Claude one, worth a line in `front/CLAUDE.md`'s deck section then.
- Step 2 deck authoring, if green-lit, should be cut per-unit from the report's
  sketch; each unit's slides + EN/NL keys land together.
- The four figures that write localStorage stay off slides permanently; the
  report restates which ones so the next author does not rediscover it.
