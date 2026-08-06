import { UnitShot } from '@/shared/components/UnitShot'
import type { Step } from '@/shared/step'
import deck from './deck'
import { AgentsAtOnce } from './AgentsAtOnce'
import { AuditExample } from './AuditExample'
import { DomainTree } from './DomainTree'
import { FlowDiagram } from './FlowDiagram'
import { GoalGate } from './GoalGate'
import { HookTree } from './HookTree'
import { IterationPaths } from './IterationPaths'
import { LoopInWindow } from './LoopInWindow'
import { LoopsPerHour } from './LoopsPerHour'
import { ModelRelay } from './ModelRelay'
import { ProjectTree } from './ProjectTree'
import { ReadEachTime } from './ReadEachTime'
import { ScriptRuns } from './ScriptRuns'
import { SetupFlags } from './SetupFlags'
import { SkillShape } from './SkillShape'
import { SkillTree } from './SkillTree'
import { TwoWindows } from './TwoWindows'
import { WhereWouldItGo } from './WhereWouldItGo'
import { WindowSpend } from './WindowSpend'
import { WorkflowTimeline } from './WorkflowTimeline'
import { WorkflowWeights } from './WorkflowWeights'
import { WorktreeEach } from './WorktreeEach'
import { Workshop } from './Workshop'
import en from './locales/en.json'
import nl from './locales/nl.json'
import { spendingQuiz, workflowsQuiz } from './quiz'
import evolution from './units/evolution.html?raw'
import setup from './units/setup.html?raw'
import engineering from './units/engineering.html?raw'
import steering from './units/steering.html?raw'
import patterns from './units/patterns.html?raw'
import workflows from './units/workflows.html?raw'
import enablement from './units/enablement.html?raw'
import parallel from './units/parallel.html?raw'
import goals from './units/goals.html?raw'
import workshop from './units/workshop.html?raw'

/**
 * Step 2, agentic engineering: the habits that decide whether working with an agent beats writing
 * the code yourself, one unit each. `evolution` opens the step by putting the rest of them in
 * order: small steps, taken often, on something that already runs.
 *
 * `evolution`, `setup`, `engineering`, `steering`, `patterns`, `workflows`, `enablement`,
 * `parallel` and `goals` each carry a drawing, `engineering` closes on an ungraded task card, and `setup` and
 * the closing `workshop` unit each carry a flag board, which is why this registry is .tsx. Both
 * boards are browser-graded, so the step still talks to the service only through the `mvn verify -Pgraded` run
 * the student does outside the app.
 */
const step2: Step = {
  id: 'step2',
  title: 'step.title',
  locales: { en, nl },
  units: [
    {
      id: 'evolution',
      title: 'evolution.title',
      html: evolution,
      // Three slots inside the prose: the drawing under the lead, then this site as the skeleton
      // it started as and as it looks with the details in.
      inlineFigures: {
        'iteration-paths': <IterationPaths />,
        'walking-skeleton': (
          <UnitShot id="walking-skeleton" src="/walking-skeleton.png" namespace="step2" />
        ),
        'added-details': <UnitShot id="added-details" src="/added-details.png" namespace="step2" />,
      },
    },
    {
      id: 'setup',
      title: 'setup.title',
      html: setup,
      // One drawing per section, each at the <div data-figure="..."> its HTML leaves: the
      // CLAUDE.md files under the first heading, the skills under the second.
      inlineFigures: {
        'project-tree': <ProjectTree />,
        'skill-tree': <SkillTree />,
        'hook-tree': <HookTree />,
      },
      // And a second flag board under the prose, on the three files this unit is about. Graded in
      // the browser like the workshop's, so the unit needs no service either.
      figure: <SetupFlags />,
    },
    {
      id: 'engineering',
      title: 'engineering.title',
      html: engineering,
      // Sits inside the prose, at the <div data-figure="domain-tree"> the unit's HTML leaves.
      inlineFigures: { 'domain-tree': <DomainTree /> },
      // And the task under the prose, which sorts kata/step2/java against that same drawing. It
      // grades nothing and posts nothing; the tick is a bookmark.
      figure: <WhereWouldItGo />,
    },
    {
      id: 'steering',
      title: 'steering.title',
      html: steering,
      // Three slots inside the prose, one per section that argues something spatial. The two
      // windows share one frame geometry on purpose: the unit's vocabulary is the window, so they
      // are one window in two states. The worktree drawing sits before the cost paragraph, so the
      // two-bills argument keeps the last word in prose.
      inlineFigures: {
        'two-windows': <TwoWindows />,
        'loop-in-window': <LoopInWindow />,
        'worktree-each': <WorktreeEach />,
      },
    },
    {
      id: 'patterns',
      title: 'patterns.title',
      html: patterns,
      // One slot, under the `Scripts` section, at the <div data-figure="script-runs"> the unit
      // leaves. Nothing after it reads the drawing, so its own labels carry what it argues.
      inlineFigures: { 'script-runs': <ScriptRuns /> },
    },
    {
      id: 'workflows',
      title: 'workflows.title',
      html: workflows,
      // Seven slots inside the prose. Four of them close a section with who talks to what, and they
      // are a set: teal is what that workflow adds, so a change to one is a change to all four.
      // Then the switchable audit, and the closing pair. None of them grades anything.
      inlineFigures: {
        // The project is the same frame in all four, and what is inside it is what changes. Here it
        // holds the code and nothing else: there is no artifact, which is the section's point.
        'flow-naive': (
          <FlowDiagram
            id="flow-naive"
            nodes={['you', 'agent', { label: 'project', nodes: ['code'], links: [] }]}
            links={['one', 'one']}
          />
        ),
        'flow-plan': (
          <FlowDiagram
            id="flow-plan"
            nodes={['you', 'agent', { label: 'project', nodes: ['code'], links: [] }]}
            links={['both', 'one']}
          />
        ),
        // The spec joins the code inside the frame, which is the section's claim drawn: a spec is
        // not a document beside the work, it is a file in it.
        'flow-spec': (
          <FlowDiagram
            id="flow-spec"
            nodes={['you', 'agent', { label: 'project', nodes: ['spec', 'code'], links: ['one'] }]}
            links={['both', 'both']}
          />
        ),
        // The only one that closes, and the longest: the agent writes the audit, you read it, and
        // it goes back to the agent as work. The return path lands on `audit.md` rather than on the
        // start of the row, because what the run produces is a new version of that file, and the
        // branch under it is the reading the rest of the row is not: you take the audit in before
        // any of it becomes work. The spec inside the project is faint because an audit does not
        // need one, which is what makes this the workflow you can bolt onto anything.
        'flow-audit': (
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
        'audit-example': <AuditExample />,
        'workflow-timeline': <WorkflowTimeline />,
        'workflow-weights': <WorkflowWeights />,
      },
      // The step's only quiz, and it sits here because the unit's argument is the choice between
      // the four workflows rather than the four themselves, which is the one thing in step 2 a
      // question can ask for. It renders its own heading under the closing figure, so the HTML
      // needs no `ui:quiz.title` the way a unit with a task card does.
      quiz: workflowsQuiz,
    },
    {
      id: 'enablement',
      title: 'enablement.title',
      html: enablement,
      // Two slots inside the prose, one per section that has something to draw. The bands close
      // `run-own-machine`, whose closing sentence is the agent writing a change in seconds and your
      // check having to keep up, so they are that claim measured. The profile shapes close
      // `t-shaped`, the middle section, and `where-day-goes` runs two paragraphs after them, so
      // neither figure is read back by the prose and both have to carry their argument in their own
      // labels.
      inlineFigures: {
        'loops-per-hour': <LoopsPerHour />,
        'skill-shape': <SkillShape />,
      },
    },
    {
      id: 'parallel',
      title: 'parallel.title',
      html: parallel,
      // One slot, and it closes the unit rather than sitting under the first section: the drawing
      // names all four arrangements, so under `One agent at a time` it would spend three of them
      // early. Nothing below it reads it back, which is why its rows carry their own notes.
      inlineFigures: { 'agents-at-once': <AgentsAtOnce /> },
    },
    {
      id: 'goals',
      title: 'goals.title',
      html: goals,
      // Four slots, one per expensive move the unit surveys. `window-spend` sits under the lead
      // because the tail of a window is what two later sections lean on, and it is the only figure
      // in the step read forwards. The other three close the section that argues them, and none of
      // them is read back by prose, so each carries its argument in its own labels.
      inlineFigures: {
        'window-spend': <WindowSpend />,
        'goal-gate': <GoalGate />,
        'read-each-time': <ReadEachTime />,
        'model-relay': <ModelRelay />,
      },
      // The step's second quiz. One question per expensive move, since the unit's argument is what
      // each of them costs rather than what each of them is.
      quiz: spendingQuiz,
    },
    {
      id: 'workshop',
      title: 'workshop.title',
      html: workshop,
      // The flag board sits under the prose. It grades in the browser, so it is a figure rather
      // than an exerciseId (which would post to the service the step deliberately does not use).
      figure: <Workshop />,
    },
  ],
  // What the tutor puts on the board for this step. Authored in `deck.tsx`, beside the figures it
  // reuses and the reasons three of them stay off it.
  deck,
}

export default step2
