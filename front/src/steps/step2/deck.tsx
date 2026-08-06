import { UnitShot } from '@/shared/components/UnitShot'
import type { SlideSpec } from '@/shared/deck/slide-spec'
import { AgentsAtOnce } from './AgentsAtOnce'
import { DomainTree } from './DomainTree'
import { FlowDiagram } from './FlowDiagram'
import { GoalGate } from './GoalGate'
import { HookTree } from './HookTree'
import { IterationPaths } from './IterationPaths'
import { LoopsPerHour } from './LoopsPerHour'
import { ModelRelay } from './ModelRelay'
import { ProjectTree } from './ProjectTree'
import { ReadEachTime } from './ReadEachTime'
import { ScriptRuns } from './ScriptRuns'
import { SkillShape } from './SkillShape'
import { SkillTree } from './SkillTree'
import { TwoWindows } from './TwoWindows'
import { WindowSpend } from './WindowSpend'
import { WorkflowTimeline } from './WorkflowTimeline'
import { WorkflowWeights } from './WorkflowWeights'
import { WorktreeEach } from './WorktreeEach'

/**
 * Step 2 on the board, on step 1's shape: one divider per unit in registry order, that unit's own
 * figures under it, and a `statement` for the arguments that have no drawing. Ids carry the step
 * (`deck-step2-…`) because the deck at `/present` is one list across all steps and step 1 already
 * owns the bare `deck-<unit>` names; `workshop` exists in both steps, so the prefix is what keeps
 * the blocks apart.
 *
 * Kept off on purpose: `SetupFlags`, `Workshop` and `WhereWouldItGo` write progress to
 * localStorage, so on a slide they would tick the tutor's machine, and `AuditExample` only earns
 * its toggle beside the paragraph that reads it. The exercises those boards carry get a statement
 * naming what the student does, never what they find: the three setup files stay unnamed, and the
 * workshop's five flags are named by shape only.
 *
 * `LoopInWindow` is off the board for a reason of its own rather than by oversight. It argues what
 * its slide's title already says, and that slide's three points are the recovery moves, which the
 * drawing does not carry, so putting the figure there costs the moves and buys the claim twice.
 *
 * The four `FlowDiagram` instances repeat the registry's props exactly, so the board and the unit
 * page draw one set of diagrams; a change there is a change here.
 *
 * The two screenshots ride `UnitShot` at `scale` 1: they are raster, so magnifying them past
 * `figureWidth` only softens them on a projector.
 */
const deck: SlideSpec[] = [
  // The module's own card, the one dark slide this step gets. No eyebrow: there is nothing above
  // a module to name.
  {
    id: 'deck-step2-title',
    kind: 'title',
    ns: 'step2',
    title: 'step.title',
  },

  // ── evolution ─────────────────────────────────────────────────────────────────────────────
  {
    id: 'deck-step2-evolution',
    kind: 'divider',
    ns: 'step2',
    eyebrow: 'step.title',
    title: 'evolution.title',
    points: [
      'deck.evolution.divider.1',
      'deck.evolution.divider.2',
      'deck.evolution.divider.3',
      'deck.evolution.divider.4',
    ],
  },
  {
    id: 'deck-step2-evolution-paths',
    kind: 'figure',
    ns: 'step2',
    eyebrow: 'evolution.title',
    title: 'deck.evolution.paths.title',
    figure: <IterationPaths />,
    scale: 1.5,
  },
  {
    id: 'deck-step2-evolution-skeleton',
    kind: 'figure',
    ns: 'step2',
    eyebrow: 'evolution.title',
    title: 'deck.evolution.skeleton.title',
    figure: <UnitShot id="walking-skeleton" src="/walking-skeleton.png" namespace="step2" />,
    scale: 1,
    figureWidth: 1250,
  },
  {
    id: 'deck-step2-evolution-details',
    kind: 'figure',
    ns: 'step2',
    eyebrow: 'evolution.title',
    title: 'deck.evolution.details.title',
    note: 'deck.evolution.details.note',
    figure: <UnitShot id="added-details" src="/added-details.png" namespace="step2" />,
    // Narrower than its sibling: this slide carries a note, and the image's height follows its
    // width, so the wider layout ran the shot into the footer's 88px.
    scale: 1,
    figureWidth: 1050,
  },
  {
    id: 'deck-step2-evolution-fifteen',
    kind: 'statement',
    ns: 'step2',
    eyebrow: 'evolution.title',
    title: 'deck.evolution.fifteen.title',
    note: 'deck.evolution.fifteen.note',
  },

  // ── setup ─────────────────────────────────────────────────────────────────────────────────
  {
    id: 'deck-step2-setup',
    kind: 'divider',
    ns: 'step2',
    eyebrow: 'step.title',
    title: 'setup.title',
    points: ['deck.setup.divider.1', 'deck.setup.divider.2', 'deck.setup.divider.3'],
  },
  {
    id: 'deck-step2-setup-project',
    kind: 'figure',
    ns: 'step2',
    eyebrow: 'setup.title',
    title: 'deck.setup.project.title',
    figure: <ProjectTree />,
    scale: 1.5,
  },
  {
    id: 'deck-step2-setup-skills',
    kind: 'figure',
    ns: 'step2',
    eyebrow: 'setup.title',
    title: 'deck.setup.skills.title',
    note: 'deck.setup.skills.note',
    figure: <SkillTree />,
    scale: 1.5,
  },
  {
    id: 'deck-step2-setup-hooks',
    kind: 'figure',
    ns: 'step2',
    eyebrow: 'setup.title',
    title: 'deck.setup.hooks.title',
    figure: <HookTree />,
    scale: 1.5,
  },
  {
    id: 'deck-step2-setup-flags',
    kind: 'statement',
    ns: 'step2',
    eyebrow: 'setup.title',
    title: 'deck.setup.flags.title',
    note: 'deck.setup.flags.note',
  },

  // ── engineering ───────────────────────────────────────────────────────────────────────────
  {
    id: 'deck-step2-engineering',
    kind: 'divider',
    ns: 'step2',
    eyebrow: 'step.title',
    title: 'engineering.title',
    points: [
      'deck.engineering.divider.1',
      'deck.engineering.divider.2',
      'deck.engineering.divider.3',
    ],
  },
  {
    id: 'deck-step2-engineering-vibe',
    kind: 'statement',
    ns: 'step2',
    eyebrow: 'engineering.title',
    title: 'deck.engineering.vibe.title',
    note: 'deck.engineering.vibe.note',
  },
  {
    id: 'deck-step2-engineering-domain',
    kind: 'figure',
    ns: 'step2',
    eyebrow: 'engineering.title',
    title: 'deck.engineering.domain.title',
    // The tallest tree in the step: at anything past this the last rows land on the footer.
    figure: <DomainTree />,
    scale: 0.9,
  },
  {
    id: 'deck-step2-engineering-gates',
    kind: 'statement',
    ns: 'step2',
    eyebrow: 'engineering.title',
    title: 'deck.engineering.gates.title',
    note: 'deck.engineering.gates.note',
  },
  {
    id: 'deck-step2-engineering-sort',
    kind: 'statement',
    ns: 'step2',
    eyebrow: 'engineering.title',
    title: 'deck.engineering.sort.title',
    note: 'deck.engineering.sort.note',
  },

  // ── steering ──────────────────────────────────────────────────────────────────────────────
  {
    id: 'deck-step2-steering',
    kind: 'divider',
    ns: 'step2',
    eyebrow: 'step.title',
    title: 'steering.title',
    points: ['deck.steering.divider.1', 'deck.steering.divider.2', 'deck.steering.divider.3'],
  },
  // The unit opened on its second section until this landed.
  {
    id: 'deck-step2-steering-midflight',
    kind: 'statement',
    ns: 'step2',
    eyebrow: 'steering.title',
    title: 'deck.steering.midflight.title',
    points: [
      'deck.steering.midflight.1',
      'deck.steering.midflight.2',
      'deck.steering.midflight.3',
    ],
  },
  // The slide's own title is what this drawing argues, so it stopped being a statement the moment
  // the unit was drawn: the two windows are on the board and on the student's screen, one drawing.
  {
    id: 'deck-step2-steering-rewind',
    kind: 'figure',
    ns: 'step2',
    eyebrow: 'steering.title',
    title: 'deck.steering.rewind.title',
    note: 'deck.steering.rewind.note',
    figure: <TwoWindows />,
    // Lower than the room would allow: this is the one figure slide in the step carrying a note,
    // and at 1.5 the note sat on the drawing's own column labels.
    scale: 1.3,
  },
  // The one drawing in the unit the board had no slide for. TwoWindows rides 1.3 at 640x306; this
  // one is 640x262 with a note, so it takes a little more room.
  {
    id: 'deck-step2-steering-worktree',
    kind: 'figure',
    ns: 'step2',
    eyebrow: 'steering.title',
    title: 'deck.steering.worktree.title',
    note: 'deck.steering.worktree.note',
    figure: <WorktreeEach />,
    scale: 1.4,
  },
  {
    id: 'deck-step2-steering-nowhere',
    kind: 'statement',
    ns: 'step2',
    eyebrow: 'steering.title',
    title: 'deck.steering.nowhere.title',
    points: [
      'deck.steering.nowhere.1',
      'deck.steering.nowhere.2',
      'deck.steering.nowhere.3',
    ],
  },
  {
    id: 'deck-step2-steering-gaps',
    kind: 'statement',
    ns: 'step2',
    eyebrow: 'steering.title',
    title: 'deck.steering.gaps.title',
    points: ['deck.steering.gaps.1', 'deck.steering.gaps.2', 'deck.steering.gaps.3'],
  },

  // ── patterns ──────────────────────────────────────────────────────────────────────────────
  {
    id: 'deck-step2-patterns',
    kind: 'divider',
    ns: 'step2',
    eyebrow: 'step.title',
    title: 'patterns.title',
    points: ['deck.patterns.divider.1', 'deck.patterns.divider.2', 'deck.patterns.divider.3'],
  },
  // Its old title duplicated `deck.patterns.divider.1` one slide later, which left the section with
  // nothing said about it. The divider keeps the lead's claim; this slide is the second pass.
  {
    id: 'deck-step2-patterns-iteration',
    kind: 'statement',
    ns: 'step2',
    eyebrow: 'patterns.title',
    title: 'deck.patterns.iteration.title',
    note: 'deck.patterns.iteration.note',
  },
  {
    id: 'deck-step2-patterns-runs',
    kind: 'figure',
    ns: 'step2',
    eyebrow: 'patterns.title',
    title: 'deck.patterns.runs.title',
    figure: <ScriptRuns />,
    scale: 1.5,
  },

  // ── workflows ─────────────────────────────────────────────────────────────────────────────
  {
    id: 'deck-step2-workflows',
    kind: 'divider',
    ns: 'step2',
    eyebrow: 'step.title',
    title: 'workflows.title',
    points: [
      'deck.workflows.divider.1',
      'deck.workflows.divider.2',
      'deck.workflows.divider.3',
    ],
  },
  {
    id: 'deck-step2-workflows-naive',
    kind: 'figure',
    ns: 'step2',
    eyebrow: 'workflows.title',
    title: 'deck.workflows.naive.title',
    figure: (
      <FlowDiagram
        id="flow-naive"
        nodes={['you', 'agent', { label: 'project', nodes: ['code'], links: [] }]}
        links={['one', 'one']}
      />
    ),
    scale: 1.5,
  },
  {
    id: 'deck-step2-workflows-plan',
    kind: 'figure',
    ns: 'step2',
    eyebrow: 'workflows.title',
    title: 'deck.workflows.plan.title',
    figure: (
      <FlowDiagram
        id="flow-plan"
        nodes={['you', 'agent', { label: 'project', nodes: ['code'], links: [] }]}
        links={['both', 'one']}
      />
    ),
    scale: 1.5,
  },
  {
    id: 'deck-step2-workflows-spec',
    kind: 'figure',
    ns: 'step2',
    eyebrow: 'workflows.title',
    title: 'deck.workflows.spec.title',
    figure: (
      <FlowDiagram
        id="flow-spec"
        nodes={['you', 'agent', { label: 'project', nodes: ['spec', 'code'], links: ['one'] }]}
        links={['both', 'both']}
      />
    ),
    scale: 1.5,
  },
  {
    id: 'deck-step2-workflows-audit',
    kind: 'figure',
    ns: 'step2',
    eyebrow: 'workflows.title',
    title: 'deck.workflows.audit.title',
    note: 'deck.workflows.audit.note',
    figure: (
      <FlowDiagram
        id="flow-audit"
        nodes={[
          'you',
          'agent',
          'audit',
          'you',
          'agent',
          { label: 'project', nodes: ['spec', 'code'], links: ['one'], faint: ['spec'] },
        ]}
        links={['one', 'one', 'one', 'one', 'one']}
        branch="you"
        loop
        loopTo={2}
      />
    ),
    scale: 1.3,
  },
  {
    id: 'deck-step2-workflows-weights',
    kind: 'figure',
    ns: 'step2',
    eyebrow: 'workflows.title',
    title: 'deck.workflows.weights.title',
    figure: <WorkflowWeights />,
    scale: 1.5,
  },
  {
    id: 'deck-step2-workflows-timeline',
    kind: 'figure',
    ns: 'step2',
    eyebrow: 'workflows.title',
    title: 'deck.workflows.timeline.title',
    figure: <WorkflowTimeline />,
    scale: 1.3,
  },

  // ── enablement ────────────────────────────────────────────────────────────────────────────
  {
    id: 'deck-step2-enablement',
    kind: 'divider',
    ns: 'step2',
    eyebrow: 'step.title',
    title: 'enablement.title',
    points: [
      'deck.enablement.divider.1',
      'deck.enablement.divider.2',
      'deck.enablement.divider.3',
    ],
  },
  {
    id: 'deck-step2-enablement-loops',
    kind: 'figure',
    ns: 'step2',
    eyebrow: 'enablement.title',
    title: 'deck.enablement.loops.title',
    figure: <LoopsPerHour />,
    scale: 1.5,
  },
  {
    id: 'deck-step2-enablement-shape',
    kind: 'figure',
    ns: 'step2',
    eyebrow: 'enablement.title',
    title: 'deck.enablement.shape.title',
    figure: <SkillShape />,
    scale: 1.5,
  },
  {
    id: 'deck-step2-enablement-day',
    kind: 'statement',
    ns: 'step2',
    eyebrow: 'enablement.title',
    title: 'deck.enablement.day.title',
    note: 'deck.enablement.day.note',
  },

  // ── parallel ──────────────────────────────────────────────────────────────────────────────
  {
    id: 'deck-step2-parallel',
    kind: 'divider',
    ns: 'step2',
    eyebrow: 'step.title',
    title: 'parallel.title',
    // The key number and the array position deliberately differ: `.3` is the unit's answer and
    // keeps the last slot, and `.4` is the orchestrator, which the unit argues before it.
    points: [
      'deck.parallel.divider.1',
      'deck.parallel.divider.2',
      'deck.parallel.divider.4',
      'deck.parallel.divider.3',
    ],
  },
  {
    id: 'deck-step2-parallel-arrangements',
    kind: 'figure',
    ns: 'step2',
    eyebrow: 'parallel.title',
    title: 'deck.parallel.arrangements.title',
    // Four rows with their notes are nearly the whole frame on their own; this is the largest
    // scale that keeps the last row's note off the footer.
    figure: <AgentsAtOnce />,
    scale: 1.02,
  },
  {
    id: 'deck-step2-parallel-attention',
    kind: 'statement',
    ns: 'step2',
    eyebrow: 'parallel.title',
    title: 'deck.parallel.attention.title',
    note: 'deck.parallel.attention.note',
  },

  // ── goals ─────────────────────────────────────────────────────────────────────────────────
  {
    id: 'deck-step2-goals',
    kind: 'divider',
    ns: 'step2',
    eyebrow: 'step.title',
    title: 'goals.title',
    points: [
      'deck.goals.divider.1',
      'deck.goals.divider.2',
      'deck.goals.divider.3',
      'deck.goals.divider.4',
    ],
  },
  // `WindowSpend` sits under the unit's lead and is the one figure in the step read forwards, so
  // on the board it arrives before the conclusion `deck.goals.divider.3` states.
  {
    id: 'deck-step2-goals-window',
    kind: 'figure',
    ns: 'step2',
    eyebrow: 'goals.title',
    title: 'deck.goals.window.title',
    // Columns against a ceiling, so the drawing carries to the back of a room at a scale the wire
    // figures cannot take. The title deliberately says something the drawing does not: the figure's
    // own labels already carry the unspent half, so a heading repeating them buys nothing.
    figure: <WindowSpend />,
    // 1.9 clipped "one window" off the left edge: this drawing runs the full width of its viewBox,
    // so it reaches the frame sooner than a figure with margins does.
    scale: 1.7,
  },
  {
    id: 'deck-step2-goals-true',
    kind: 'statement',
    ns: 'step2',
    eyebrow: 'goals.title',
    title: 'deck.goals.true.title',
    note: 'deck.goals.true.note',
  },
  {
    id: 'deck-step2-goals-shape',
    kind: 'statement',
    ns: 'step2',
    eyebrow: 'goals.title',
    title: 'deck.goals.shape.title',
    points: ['deck.goals.shape.1', 'deck.goals.shape.2', 'deck.goals.shape.3'],
  },
  {
    id: 'deck-step2-goals-gate',
    kind: 'figure',
    ns: 'step2',
    eyebrow: 'goals.title',
    // The shortest drawing in the step at 640x204, so it takes the same magnification WindowSpend
    // (640x228) does. The title names the exit rather than the command: `deck.goals.divider.2` and
    // `deck.goals.shape.3` already say name the command, and a third telling on the slide that
    // draws it would be the drawing read out loud.
    title: 'deck.goals.gate.title',
    figure: <GoalGate />,
    scale: 1.7,
  },
  {
    id: 'deck-step2-goals-fleet',
    kind: 'figure',
    ns: 'step2',
    eyebrow: 'goals.title',
    title: 'deck.goals.fleet.title',
    note: 'deck.goals.fleet.note',
    // 640x288 with a note under it. The title was already the drawing's whole argument, so the
    // board was paraphrasing a figure the students have; carrying the figure costs no extra slide.
    figure: <ReadEachTime />,
    scale: 1.4,
  },
  {
    id: 'deck-step2-goals-relay',
    kind: 'figure',
    ns: 'step2',
    eyebrow: 'goals.title',
    // 640x246 and no note, so it rides where LoopsPerHour (640x250) does. The title names what the
    // two teal arrows are labelled with rather than what the tiers are like, which keeps it off
    // ModelTiers's ground in step 1. The `<small>` date under the figure belongs to the unit page:
    // the slide does not carry it and the tutor says it out loud.
    title: 'deck.goals.relay.title',
    figure: <ModelRelay />,
    scale: 1.5,
  },

  // ── workshop ──────────────────────────────────────────────────────────────────────────────
  {
    id: 'deck-step2-workshop',
    kind: 'divider',
    ns: 'step2',
    eyebrow: 'step.title',
    title: 'workshop.title',
    points: ['deck.workshop.divider.1', 'deck.workshop.divider.2', 'deck.workshop.divider.3'],
  },
  {
    id: 'deck-step2-workshop-flags',
    kind: 'statement',
    ns: 'step2',
    eyebrow: 'workshop.title',
    title: 'deck.workshop.flags.title',
    points: ['deck.workshop.flags.1', 'deck.workshop.flags.2', 'deck.workshop.flags.3'],
  },
  {
    id: 'deck-step2-workshop-honest',
    kind: 'statement',
    ns: 'step2',
    eyebrow: 'workshop.title',
    title: 'deck.workshop.honest.title',
    note: 'deck.workshop.honest.note',
  },
  {
    id: 'deck-step2-workshop-goal',
    kind: 'statement',
    ns: 'step2',
    eyebrow: 'workshop.title',
    title: 'deck.workshop.goal.title',
  },
]

export default deck
