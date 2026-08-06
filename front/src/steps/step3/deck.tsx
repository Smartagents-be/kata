import type { SlideSpec } from '@/shared/deck/slide-spec'
import { PipelineShift } from './PipelineShift'

/**
 * Step 3 on the board. This step is argued out loud by design: three units of conversation, one
 * drawing, nothing graded. So the deck is mostly statements, one per argument a room has to hear,
 * and `PipelineShift` is the one figure because it is the one claim no sentence can make without
 * the reader taking it on trust.
 *
 * Ids carry the step (`deck-step3-…`) because the deck at `/present` is one list across all steps
 * and step 1 owns the bare `deck-<unit>` names.
 */
const deck: SlideSpec[] = [
  // The module's own card, the one dark slide this step gets. No eyebrow: there is nothing above
  // a module to name.
  {
    id: 'deck-step3-title',
    kind: 'title',
    ns: 'step3',
    title: 'step.title',
  },

  // ── change ────────────────────────────────────────────────────────────────────────────────
  {
    id: 'deck-step3-change',
    kind: 'divider',
    ns: 'step3',
    eyebrow: 'step.title',
    title: 'change.title',
    points: ['deck.change.divider.1', 'deck.change.divider.2', 'deck.change.divider.3'],
  },
  {
    id: 'deck-step3-change-test-engineer',
    kind: 'statement',
    ns: 'step3',
    eyebrow: 'change.title',
    title: 'deck.change.test-engineer.title',
    note: 'deck.change.test-engineer.note',
  },
  {
    id: 'deck-step3-change-pipelines',
    kind: 'figure',
    ns: 'step3',
    eyebrow: 'change.title',
    title: 'deck.change.pipelines.title',
    figure: <PipelineShift />,
    scale: 1.5,
  },
  {
    id: 'deck-step3-change-rethink',
    kind: 'statement',
    ns: 'step3',
    eyebrow: 'change.title',
    title: 'deck.change.rethink.title',
    // Points rather than a note: the section under this is three independent examples, and the room
    // argues them one at a time.
    points: ['deck.change.rethink.1', 'deck.change.rethink.2', 'deck.change.rethink.3'],
  },
  {
    id: 'deck-step3-change-gates',
    kind: 'statement',
    ns: 'step3',
    eyebrow: 'change.title',
    title: 'deck.change.gates.title',
  },

  // ── expectations ──────────────────────────────────────────────────────────────────────────
  {
    id: 'deck-step3-expectations',
    kind: 'divider',
    ns: 'step3',
    eyebrow: 'step.title',
    title: 'expectations.title',
    points: [
      'deck.expectations.divider.1',
      'deck.expectations.divider.2',
      'deck.expectations.divider.3',
    ],
  },
  {
    id: 'deck-step3-expectations-floor',
    kind: 'statement',
    ns: 'step3',
    eyebrow: 'expectations.title',
    title: 'deck.expectations.floor.title',
  },
  {
    id: 'deck-step3-expectations-missing',
    kind: 'statement',
    ns: 'step3',
    eyebrow: 'expectations.title',
    title: 'deck.expectations.missing.title',
    note: 'deck.expectations.missing.note',
  },
  {
    id: 'deck-step3-expectations-velocity',
    kind: 'statement',
    ns: 'step3',
    eyebrow: 'expectations.title',
    title: 'deck.expectations.velocity.title',
    note: 'deck.expectations.velocity.note',
  },

  // ── impostor ──────────────────────────────────────────────────────────────────────────────
  {
    id: 'deck-step3-impostor',
    kind: 'divider',
    ns: 'step3',
    eyebrow: 'step.title',
    title: 'impostor.title',
    points: ['deck.impostor.divider.1', 'deck.impostor.divider.2', 'deck.impostor.divider.3'],
  },
  {
    id: 'deck-step3-impostor-engineer',
    kind: 'statement',
    ns: 'step3',
    eyebrow: 'impostor.title',
    title: 'deck.impostor.engineer.title',
    note: 'deck.impostor.engineer.note',
  },
  {
    id: 'deck-step3-impostor-signal',
    kind: 'statement',
    ns: 'step3',
    eyebrow: 'impostor.title',
    title: 'deck.impostor.signal.title',
    note: 'deck.impostor.signal.note',
  },
]

export default deck
