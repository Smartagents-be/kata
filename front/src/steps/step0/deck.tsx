import type { SlideSpec } from '@/shared/deck/slide-spec'

/**
 * Step 0 on the board: the rules of the game before anything is taught.
 *
 * No figures. `Legend` only means something beside the icons it explains, and `CodeCheck` grades a
 * student's own answer, so neither belongs on a projector. What a room needs from this step is what
 * a board is and the house rules every board is played under, which is exactly the prose guided
 * mode drops from the page.
 *
 * Ids carry the step (`deck-step0-…`) because the deck at `/present` is one list across all steps
 * and step 1 already owns the bare `deck-<unit>` names. Dividers reuse the sidebar's unit-title
 * keys, like every deck here.
 *
 * The one exercise behind this step stays off the board on purpose: naming its Maven profile or
 * either printed code is naming the answer, and the unit that sets it is the only place a student
 * should meet it.
 */
const deck: SlideSpec[] = [
  // The module's own card, the one dark slide this step gets. No eyebrow: there is nothing above
  // a module to name. The card says "Introduction" rather than the sidebar's "Start here": the
  // sidebar title is an instruction to a reader choosing where to begin, and a room is not
  // choosing, so the board names the module instead. The only slide whose title is not a
  // registry key.
  {
    id: 'deck-step0-title',
    kind: 'title',
    ns: 'step0',
    title: 'deck.title',
  },

  // ── welcome ───────────────────────────────────────────────────────────────────────────────
  // A divider carries the unit's essence as points, deck-wide: a bare title on a slide gives a
  // room nothing to hold on to, and the tutor asked for the claims on the card they open with.
  {
    id: 'deck-step0-welcome',
    kind: 'divider',
    ns: 'step0',
    eyebrow: 'step.title',
    title: 'welcome.title',
    points: [
      'deck.welcome.divider.1',
      'deck.welcome.divider.2',
      'deck.welcome.divider.3',
      'deck.welcome.divider.4',
    ],
  },
  {
    id: 'deck-step0-welcome-rules',
    kind: 'statement',
    ns: 'step0',
    eyebrow: 'welcome.title',
    title: 'deck.welcome.rules.title',
    // The four house rules, one line each. The prose arguing them lives in the unit; the board
    // carries the list because in class the tutor says the arguments out loud.
    points: [
      'deck.welcome.rules.1',
      'deck.welcome.rules.2',
      'deck.welcome.rules.3',
      'deck.welcome.rules.4',
    ],
  },

  // ── backend ───────────────────────────────────────────────────────────────────────────────
  {
    id: 'deck-step0-backend',
    kind: 'divider',
    ns: 'step0',
    eyebrow: 'step.title',
    title: 'backend.title',
    points: [
      'deck.backend.divider.1',
      'deck.backend.divider.2',
      'deck.backend.divider.3',
    ],
  },
  {
    id: 'deck-step0-backend-herrings',
    kind: 'statement',
    ns: 'step0',
    eyebrow: 'backend.title',
    title: 'deck.backend.herrings.title',
  },

  // ── workshop ──────────────────────────────────────────────────────────────────────────────
  // A divider and nothing under it. The board writes to localStorage, so on a slide it would tick
  // the tutor's machine, and the three runs behind it are the thing this deck may not name. What a
  // room needs is the shape of the page, which is what the points carry.
  {
    id: 'deck-step0-workshop',
    kind: 'divider',
    ns: 'step0',
    eyebrow: 'step.title',
    title: 'workshop.title',
    points: [
      'deck.workshop.divider.1',
      'deck.workshop.divider.2',
      'deck.workshop.divider.3',
    ],
  },
]

export default deck
