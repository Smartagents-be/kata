import type { SlideSpec } from '@/shared/deck/slide-spec'
import { AgentsAtOnce } from './AgentsAtOnce'
import { ElectedToLead } from './ElectedToLead'
import { FlowDiagram } from './FlowDiagram'
import { GapRule } from './GapRule'
import { GateReach } from './GateReach'
import { LegacyFlow } from './LegacyFlow'
import { GoalGate } from './GoalGate'
import { HookTree } from './HookTree'
import { LoopsPerHour } from './LoopsPerHour'
import { ProjectTree } from './ProjectTree'
import { ProofLoop } from './ProofLoop'
import { ReadEachTime } from './ReadEachTime'
import { ScriptRuns } from './ScriptRuns'
import { SliceSkills } from './SliceSkills'
import { SkillTree } from './SkillTree'
import { SpecTree } from './SpecTree'
import { SteeringMoves } from './SteeringMoves'
import { TwoWindows } from './TwoWindows'
import { VerticalSlices } from './VerticalSlices'
import { WorkflowTimeline } from './WorkflowTimeline'
import { WorkflowWeights } from './WorkflowWeights'
import { WorktreeEach } from './WorktreeEach'
import { quizSlide, stopSlide, taskSlide } from '@/shared/deck/exerciseSlides'

/**
 * Step 2 on the board, on step 1's shape: one divider per unit in registry order, that unit's own
 * figures under it, and a `statement` for the arguments that have no drawing. Ids carry the step
 * (`deck-step2-…`) because the deck at `/present` is one list across all steps and step 1 already
 * owns the bare `deck-<unit>` names; `workshop` exists in both steps, so the prefix is what keeps
 * the blocks apart.
 *
 * Kept off on purpose: `SetupFlags`, `Workshop`, `GateWalk`, `Preflight` and `Debrief` write
 * progress to localStorage, so on a slide they would tick the tutor's machine, and `AuditExample`
 * only earns its toggle beside the paragraph that reads it. The exercises those boards carry get a
 * statement naming what the student does, never what they find: the three setup files stay unnamed,
 * and the workshop's five flags are named by shape only. `RunSheet` is the one workshop element on
 * the board, because it stores nothing and it is the capstone's map rather than any part of it.
 *
 * `LoopInWindow` is off the board for a reason of its own rather than by oversight. It argues what
 * its slide's title already says, and that slide's three points are the recovery moves, which the
 * drawing does not carry, so putting the figure there costs the moves and buys the claim twice.
 *
 * The four `FlowDiagram` instances repeat the registry's props exactly, so the board and the unit
 * page draw one set of diagrams; a change there is a change here.

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
    scale: 1.79,
  },
  {
    id: 'deck-step2-setup-skills',
    kind: 'figure',
    ns: 'step2',
    eyebrow: 'setup.title',
    title: 'deck.setup.skills.title',
    note: 'deck.setup.skills.note',
    figure: <SkillTree />,
    scale: 1.79,
  },
  {
    id: 'deck-step2-setup-hooks',
    kind: 'figure',
    ns: 'step2',
    eyebrow: 'setup.title',
    title: 'deck.setup.hooks.title',
    figure: <HookTree />,
    scale: 1.79,
  },
  taskSlide('deck-step2-setup-task', 'step2', 'setup.title', 'access.title'),
  {
    id: 'deck-step2-setup-flags',
    kind: 'statement',
    badge: 'task',
    ns: 'step2',
    eyebrow: 'setup.title',
    title: 'deck.setup.flags.title',
    points: ['deck.setup.flags.1', 'deck.setup.flags.2'],
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
    id: 'deck-step2-engineering-slices',
    kind: 'figure',
    ns: 'step2',
    eyebrow: 'engineering.title',
    title: 'deck.engineering.slices.title',
    figure: <VerticalSlices />,
    scale: 1.6,
  },
  {
    id: 'deck-step2-engineering-skills',
    kind: 'figure',
    ns: 'step2',
    eyebrow: 'engineering.title',
    title: 'deck.engineering.skills.title',
    // The line `enablement`'s `t-shaped` closes on, at the owner's asking: the reason the breadth is
    // worth building, said where the T is drawn.
    note: 'deck.engineering.skills.note',
    figure: <SliceSkills />,
    scale: 1.7,
  },
  {
    id: 'deck-step2-engineering-domain',
    kind: 'statement',
    ns: 'step2',
    eyebrow: 'engineering.title',
    title: 'deck.engineering.domain.title',
    // A statement since October 2026 (owner's call): `DomainTree` is the tallest tree in the step
    // and only fitted at 0.84, which put its labels at 10px on the board. The slide names the shape
    // in 4 lines lifted from the tree's own notes, and the tree stays in the unit.
    points: [
      'deck.engineering.domain.1',
      'deck.engineering.domain.2',
      'deck.engineering.domain.3',
      'deck.engineering.domain.4',
    ],
  },

  // ── gates ─────────────────────────────────────────────────────────────────────────────────
  {
    id: 'deck-step2-gates',
    kind: 'divider',
    ns: 'step2',
    eyebrow: 'step.title',
    title: 'gates.title',
    points: ['deck.gates.divider.1', 'deck.gates.divider.2', 'deck.gates.divider.3'],
  },
  // `gates.lead.2` as a meme, at the owner's asking (October 2026): the agent writes faster than you
  // read, and the note is the half that makes it the point rather than an excuse. The image is only 500
  // wide, so 1.5 is as far as it magnifies before it blurs.
  {
    id: 'deck-step2-gates-read',
    kind: 'figure',
    ns: 'step2',
    eyebrow: 'gates.title',
    title: 'deck.gates.read.title',
    note: 'deck.gates.read.note',
    figure: <ElectedToLead />,
    scale: 2.15,
  },
  // Came over from `engineering` with the `Quality gates` section, and still a statement: the
  // proxy claim has no drawing, and `SameGate` deliberately ranks none of its four groups.
  {
    id: 'deck-step2-gates-proxy',
    kind: 'statement',
    ns: 'step2',
    eyebrow: 'gates.title',
    title: 'deck.gates.proxy.title',
    note: 'deck.gates.proxy.note',
  },
  // The checks a gate is made of, grouped by what they look at. The groups are equals, and coverage
  // and mutation share 1 line on purpose: the slide may not rank them (see `SameGate`).
  {
    id: 'deck-step2-gates-checks',
    kind: 'statement',
    ns: 'step2',
    eyebrow: 'gates.title',
    title: 'deck.gates.checks.title',
    points: [
      'deck.gates.checks.1',
      'deck.gates.checks.2',
      'deck.gates.checks.3',
      'deck.gates.checks.4',
    ],
  },
  {
    id: 'deck-step2-gates-old-code',
    kind: 'figure',
    ns: 'step2',
    eyebrow: 'gates.title',
    title: 'deck.gates.old-code.title',
    figure: <LegacyFlow />,
    scale: 1.64,
  },
  {
    id: 'deck-step2-gates-reach',
    kind: 'figure',
    ns: 'step2',
    eyebrow: 'gates.title',
    title: 'deck.gates.reach.title',
    figure: <GateReach />,
    scale: 1.87,
  },
  {
    id: 'deck-step2-gates-walk',
    kind: 'statement',
    badge: 'task',
    ns: 'step2',
    eyebrow: 'gates.title',
    title: 'deck.gates.walk.title',
    points: ['deck.gates.walk.1', 'deck.gates.walk.2', 'deck.gates.walk.3'],
  },

  // ── steering ──────────────────────────────────────────────────────────────────────────────
  {
    id: 'deck-step2-steering',
    kind: 'divider',
    ns: 'step2',
    eyebrow: 'step.title',
    title: 'steering.title',
    points: [
      'deck.steering.divider.1',
      'deck.steering.divider.2',
      'deck.steering.divider.3',
      'deck.steering.divider.4',
    ],
  },
  // The unit opens on this table now, so the slide is the same drawing rather than three points
  // that summarised the prose it replaced.
  {
    id: 'deck-step2-steering-midflight',
    kind: 'figure',
    ns: 'step2',
    eyebrow: 'steering.title',
    title: 'deck.steering.midflight.title',
    figure: <SteeringMoves />,
    scale: 1.63,
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
    scale: 1.25,
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
  // Its four points walked the rule as three steps, one of them logging the gap to a file; the
  // file is gone from the rule, and the drawing says the rest.
  {
    id: 'deck-step2-steering-gaps',
    kind: 'figure',
    ns: 'step2',
    eyebrow: 'steering.title',
    title: 'deck.steering.gaps.title',
    figure: <GapRule />,
    scale: 1.8,
  },
  stopSlide('deck-step2-steering-stop', 'step2', 'steering.title', [{ task: 'steer.title' }, 'quiz']),

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
    scale: 1.79,
  },
  stopSlide('deck-step2-patterns-stop', 'step2', 'patterns.title', [{ task: 'script.title' }, 'quiz']),

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
    scale: 3.43,
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
    scale: 3.43,
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
    scale: 3.43,
  },
  {
    id: 'deck-step2-workflows-where',
    kind: 'figure',
    ns: 'step2',
    eyebrow: 'workflows.title',
    title: 'deck.workflows.where.title',
    figure: <SpecTree />,
    scale: 1.79,
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
        loopBy="agent"
      />
    ),
    scale: 1.75,
  },
  {
    id: 'deck-step2-workflows-weights',
    kind: 'figure',
    ns: 'step2',
    eyebrow: 'workflows.title',
    title: 'deck.workflows.weights.title',
    figure: <WorkflowWeights />,
    scale: 1.79,
  },
  {
    id: 'deck-step2-workflows-timeline',
    kind: 'figure',
    ns: 'step2',
    eyebrow: 'workflows.title',
    title: 'deck.workflows.timeline.title',
    figure: <WorkflowTimeline />,
    scale: 1.79,
  },
  quizSlide('deck-step2-workflows-quiz', 'step2', 'workflows.title'),

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
      'deck.enablement.divider.4',
      'deck.enablement.divider.5',
    ],
  },
  {
    id: 'deck-step2-enablement-loops',
    kind: 'figure',
    ns: 'step2',
    eyebrow: 'enablement.title',
    title: 'deck.enablement.loops.title',
    figure: <LoopsPerHour />,
    scale: 1.58,
  },
  {
    id: 'deck-step2-enablement-loop',
    kind: 'figure',
    ns: 'step2',
    eyebrow: 'enablement.title',
    title: 'deck.enablement.loop.title',
    // A row of 5 cards with a track and a band under it: wide and shallow, so the frame's width
    // is what limits it rather than the footer. Came over with its sections from `proof` (October
    // 2026), so it follows the unit's order: after the clock.
    figure: <ProofLoop />,
    scale: 1.79,
  },
  // The goal slides came over from the cut `goals` unit (October 2026), with the section they
  // illustrate. Its `true` slide went: the 3 points below already say what it said.
  {
    id: 'deck-step2-enablement-goal',
    kind: 'statement',
    ns: 'step2',
    eyebrow: 'enablement.title',
    title: 'deck.enablement.goal.title',
    points: ['deck.enablement.goal.1', 'deck.enablement.goal.2', 'deck.enablement.goal.3'],
  },
  {
    id: 'deck-step2-enablement-gate',
    kind: 'figure',
    ns: 'step2',
    eyebrow: 'enablement.title',
    // 640x204, so it takes the magnification ProofLoop does. The title names the exit rather than
    // the command: the slide before it already says name the command.
    title: 'deck.enablement.gate.title',
    figure: <GoalGate />,
    scale: 1.72,
  },
  {
    // At the owner's asking (October 2026). "Dead" is the course's claim; the note is DHH's own words
    // from the Rails World 2026 keynote, which never said "dead".
    id: 'deck-step2-enablement-dead',
    kind: 'statement',
    ns: 'step2',
    eyebrow: 'enablement.title',
    title: 'deck.enablement.dead.title',
    note: 'deck.enablement.dead.note',
  },
  {
    id: 'deck-step2-enablement-day',
    kind: 'statement',
    ns: 'step2',
    eyebrow: 'enablement.title',
    title: 'deck.enablement.day.title',
    note: 'deck.enablement.day.note',
  },
  {
    id: 'deck-step2-enablement-review',
    kind: 'statement',
    ns: 'step2',
    eyebrow: 'enablement.title',
    title: 'deck.enablement.review.title',
    points: [
      'deck.enablement.review.1',
      'deck.enablement.review.2',
      'deck.enablement.review.3',
      'deck.enablement.review.4',
    ],
  },
  stopSlide('deck-step2-enablement-stop', 'step2', 'enablement.title', [{ task: 'machinery.title' }, 'quiz']),

  // ── parallel ──────────────────────────────────────────────────────────────────────────────
  {
    id: 'deck-step2-parallel',
    kind: 'divider',
    ns: 'step2',
    eyebrow: 'step.title',
    title: 'parallel.title',
    points: [
      'deck.parallel.divider.1',
      'deck.parallel.divider.2',
      'deck.parallel.divider.3',
      'deck.parallel.divider.4',
    ],
  },
  {
    id: 'deck-step2-parallel-arrangements',
    kind: 'figure',
    ns: 'step2',
    eyebrow: 'parallel.title',
    title: 'deck.parallel.arrangements.title',
    // Four rows with their notes are nearly the whole frame on their own; this is the largest
    // scale that keeps the last row's note off the footer. It was 0.78 while the drawing carried a
    // fifth row, the orchestrator, which went in October 2026.
    figure: <AgentsAtOnce />,
    scale: 1.15,
    figureWidth: 790,
  },
  {
    id: 'deck-step2-parallel-attention',
    kind: 'statement',
    ns: 'step2',
    eyebrow: 'parallel.title',
    title: 'deck.parallel.attention.title',
    points: [
      'deck.parallel.attention.1',
      'deck.parallel.attention.2',
      'deck.parallel.attention.3',
    ],
  },
  // Came over from the cut `goals` unit (October 2026) with its figure: the attention slide above is
  // the first cost of many agents, this is the second.
  {
    id: 'deck-step2-parallel-reading',
    kind: 'figure',
    ns: 'step2',
    eyebrow: 'parallel.title',
    title: 'deck.parallel.reading.title',
    note: 'deck.parallel.reading.note',
    figure: <ReadEachTime />,
    scale: 1.59,
  },

  // Moved here with its section from `steering` in October 2026.
  {
    id: 'deck-step2-parallel-worktree',
    kind: 'figure',
    ns: 'step2',
    eyebrow: 'parallel.title',
    title: 'deck.parallel.worktree.title',
    note: 'deck.parallel.worktree.note',
    figure: <WorktreeEach />,
    scale: 1.79,
  },
  quizSlide('deck-step2-parallel-quiz', 'step2', 'parallel.title'),

  // ── workshop ──────────────────────────────────────────────────────────────────────────────
  {
    id: 'deck-step2-workshop',
    kind: 'divider',
    ns: 'step2',
    eyebrow: 'step.title',
    title: 'workshop.title',
    points: ['deck.workshop.divider.1', 'deck.workshop.divider.2', 'deck.workshop.divider.3'],
  },
  // The house rule the capstone is built on, and the only slide in the step aimed at what the
  // student may not do. It goes ahead of the map, because the map is five stages of somebody else
  // typing.
  {
    id: 'deck-step2-workshop-rule',
    kind: 'statement',
    ns: 'step2',
    eyebrow: 'workshop.title',
    title: 'deck.workshop.rule.title',
    points: ['deck.workshop.rule.1', 'deck.workshop.rule.2', 'deck.workshop.rule.3'],
  },
  {
    id: 'deck-step2-workshop-sheet',
    kind: 'statement',
    ns: 'step2',
    eyebrow: 'workshop.title',
    title: 'deck.workshop.sheet.title',
    // A statement since October 2026 (owner's call): `RunSheet` is the densest drawing in the step
    // and height-bound at 1.03, which left its commands at 12px on the board. The 4 stages are the
    // sheet's own names and hand lines, and the sheet stays in the unit.
    points: [
      'deck.workshop.sheet.1',
      'deck.workshop.sheet.2',
      'deck.workshop.sheet.3',
      'deck.workshop.sheet.4',
    ],
  },
  {
    id: 'deck-step2-workshop-flags',
    kind: 'statement',
    badge: 'task',
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
    note: 'deck.workshop.goal.note',
  },
]

export default deck
