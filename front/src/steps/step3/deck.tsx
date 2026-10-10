import type { SlideSpec } from '@/shared/deck/slide-spec'
import { PipelineShift } from './PipelineShift'
import { SdlcStages } from './SdlcStages'

/**
 * Step 3 on the board. This step is argued out loud by design: three units of conversation, two
 * drawings, nothing graded. So the deck is mostly statements, one per argument a room has to hear,
 * and the figures are `PipelineShift`, the one claim no sentence can make without the reader taking
 * it on trust, and `SdlcStages`, where a person still decides.
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
    id: 'deck-step3-change-business',
    kind: 'statement',
    ns: 'step3',
    eyebrow: 'change.title',
    title: 'deck.change.business.title',
    note: 'deck.change.business.note',
  },
  {
    id: 'deck-step3-change-decides',
    kind: 'figure',
    ns: 'step3',
    eyebrow: 'change.title',
    title: 'deck.change.decides.title',
    figure: <SdlcStages />,
    scale: 1.2,
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
  // It names no file: a SlideSpec has no assistant mechanism, so naming CLAUDE.md here would be
  // wrong for half the room with nothing filtering it.
  {
    id: 'deck-step3-change-environment',
    kind: 'statement',
    ns: 'step3',
    eyebrow: 'change.title',
    title: 'deck.change.environment.title',
    note: 'deck.change.environment.note',
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
    points: [
      'deck.expectations.missing.1',
      'deck.expectations.missing.2',
      'deck.expectations.missing.3',
    ],
  },
  // The one of the three sections the manager has to hear, and it was on no slide. It names no
  // concrete edge case and must not grow one: `change` and `impostor` each enumerate three already.
  {
    id: 'deck-step3-expectations-burden',
    kind: 'statement',
    ns: 'step3',
    eyebrow: 'expectations.title',
    title: 'deck.expectations.burden.title',
    points: [
      'deck.expectations.burden.1',
      'deck.expectations.burden.2',
      'deck.expectations.burden.3',
    ],
  },
  {
    id: 'deck-step3-expectations-estimate',
    kind: 'statement',
    ns: 'step3',
    eyebrow: 'expectations.title',
    title: 'deck.expectations.estimate.title',
    points: [
      'deck.expectations.estimate.1',
      'deck.expectations.estimate.2',
      'deck.expectations.estimate.3',
    ],
  },
  {
    id: 'deck-step3-expectations-velocity',
    kind: 'statement',
    ns: 'step3',
    eyebrow: 'expectations.title',
    title: 'deck.expectations.velocity.title',
    points: [
      'deck.expectations.velocity.1',
      'deck.expectations.velocity.2',
      'deck.expectations.velocity.3',
    ],
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
    points: [
      'deck.impostor.engineer.1',
      'deck.impostor.engineer.2',
      'deck.impostor.engineer.3',
    ],
  },
  {
    id: 'deck-step3-impostor-signal',
    kind: 'statement',
    ns: 'step3',
    eyebrow: 'impostor.title',
    title: 'deck.impostor.signal.title',
    note: 'deck.impostor.signal.note',
    points: ['deck.impostor.signal.1', 'deck.impostor.signal.2', 'deck.impostor.signal.3'],
  },
  // The last slide of step 3 and therefore of the whole deck. The deck ended on the unit's middle
  // section, a diagnostic, while `deck.impostor.divider.3` promised this claim and never delivered
  // it. No filename on it, for the same reason `take.line.label` names none.
  {
    id: 'deck-step3-impostor-written',
    kind: 'statement',
    ns: 'step3',
    eyebrow: 'impostor.title',
    title: 'deck.impostor.written.title',
    note: 'deck.impostor.written.note',
  },
]

export default deck
