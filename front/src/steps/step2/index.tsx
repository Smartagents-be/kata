import type { Step } from '@/shared/step'
import deck from './deck'
import { AgentsAtOnce } from './AgentsAtOnce'
import { AuditExample } from './AuditExample'
import { CheckPermissions } from './CheckPermissions'
import { ContainerMap } from './ContainerMap'
import { Debrief } from './Debrief'
import { DomainTree } from './DomainTree'
import { FidelityLadder } from './FidelityLadder'
import { FlowDiagram } from './FlowDiagram'
import { GateReach } from './GateReach'
import { GateWalk } from './GateWalk'
import { GoalGate } from './GoalGate'
import { HexagonPorts } from './HexagonPorts'
import { HookTree } from './HookTree'
import { GapRule } from './GapRule'
import { LoopInWindow } from './LoopInWindow'
import { LoopsPerHour } from './LoopsPerHour'
import { ModelRelay } from './ModelRelay'
import { Preflight } from './Preflight'
import { ProofLoop } from './ProofLoop'
import { ProjectTree } from './ProjectTree'
import { ReadEachTime } from './ReadEachTime'
import { RunSheet } from './RunSheet'
import { SameEveryRun } from './SameEveryRun'
import { SameGate } from './SameGate'
import { SameMachinery } from './SameMachinery'
import { ScriptRuns } from './ScriptRuns'
import { SetupFlags } from './SetupFlags'
import { SteerARun } from './SteerARun'
import { SteeringMoves } from './SteeringMoves'
import { SliceSkills } from './SliceSkills'
import { SpecTree } from './SpecTree'
import { SkillTree } from './SkillTree'
import { TwoWindows } from './TwoWindows'
import { VerticalSlices } from './VerticalSlices'
import { WordsToFiles } from './WordsToFiles'
import { WindowSpend } from './WindowSpend'
import { WorkflowTimeline } from './WorkflowTimeline'
import { WorkflowWeights } from './WorkflowWeights'
import { WorktreeEach } from './WorktreeEach'
import { Workshop } from './Workshop'
import en from './locales/en.json'
import nl from './locales/nl.json'
import { parallelQuiz, patternsQuiz, spendingQuiz, steeringQuiz, workflowsQuiz } from './quiz'
import setup from './units/setup.html?raw'
import engineering from './units/engineering.html?raw'
import gates from './units/gates.html?raw'
import steering from './units/steering.html?raw'
import patterns from './units/patterns.html?raw'
import workflows from './units/workflows.html?raw'
import enablement from './units/enablement.html?raw'
import parallel from './units/parallel.html?raw'
import goals from './units/goals.html?raw'
import workshop from './units/workshop.html?raw'

/**
 * Step 2, agentic engineering: the habits that decide whether working with an agent beats writing
 * the code yourself, one unit each. `setup` opens the step, since every session starts from what the
 * repository tells the agent before your first message.
 *
 * `setup`, `engineering`, `gates`, `steering`, `patterns`, `workflows`, `enablement`, `parallel`
 * and `goals` each carry a drawing. `engineering`, `gates`, `steering`,
 * `patterns` and `enablement` close on an ungraded task card; `steering`, `patterns`, `workflows` and `goals`
 * carry a quiz; and `setup` and the closing `workshop` unit each carry a flag board, which is why
 * this registry is .tsx. Both boards are browser-graded, so the step still talks to the service
 * only through the `mvn verify -Pgraded` run the student does outside the app.
 *
 * `workshop` is the odd one: it is a run rather than a page, so it holds two ungraded cards and the
 * board as inline figures and closes on none of them.
 */
const step2: Step = {
  id: 'step2',
  title: 'step.title',
  locales: { en, nl },
  units: [
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
        'check-permissions': <CheckPermissions />,
      },
      // And a second flag board under the prose, on the three files this unit is about. Graded in
      // the browser like the workshop's, so the unit needs no service either.
      figure: <SetupFlags />,
    },
    {
      id: 'domain-language',
      title: 'engineering.title',
      html: engineering,
      // Five slots inside the prose. `words-to-files` is what a thing is called, `vertical-slices`
      // is how the work is cut (1 use case through every layer), `slice-skills` is the T-shaped
      // profile a slice asks of whoever builds it, and `domain-tree` plus
      // `hexagon-ports` are where it sits: the modules on disk with the hexagon inside each one,
      // then the hexagon as a shape. `vertical-slices` brackets the 2 modules `domain-tree` draws,
      // so the two are a pair. Its `Quality gates` section and `same-gate` moved to `gates`, next.
      inlineFigures: {
        'words-to-files': <WordsToFiles />,
        'vertical-slices': <VerticalSlices />,
        'slice-skills': <SliceSkills />,
        'hexagon-ports': <HexagonPorts />,
        'domain-tree': <DomainTree />,
      },
    },
    {
      id: 'quality-gates',
      title: 'gates.title',
      html: gates,
      // Two slots inside the prose. `same-gate` came over from `engineering`
      // with the `Quality gates` section it closes. `gate-reach` closes `short-feedback-loops` and
      // nothing reads it back, because its note is the unit's last two sections in one line: the
      // slower a gate answers, the further a miss has got.
      inlineFigures: {
        'same-gate': <SameGate />,
        'gate-reach': <GateReach />,
      },
      // The task under the prose, run against the student's own project rather than the kata,
      // because the kata's gates are what the capstone's pre-flight runs. Ungraded; the tick is a
      // bookmark.
      figure: <GateWalk />,
    },
    {
      id: 'steering',
      title: 'steering.title',
      html: steering,
      // Four slots inside the prose. The moves table opens the unit in place of the three
      // paragraphs that told it, and the gap rule's two rows sit under the rule itself. The two
      // windows share one frame geometry on purpose: the unit's vocabulary is the window, so they
      // are one window in two states. The worktree section and its drawing moved to `parallel`.
      inlineFigures: {
        'steering-moves': <SteeringMoves />,
        'two-windows': <TwoWindows />,
        'loop-in-window': <LoopInWindow />,
        'gap-rule': <GapRule />,
      },
      // Then the task under the prose, four moves against exercises/step2/java, and the quiz under
      // that. The unit writes the `ui:quiz.title` heading itself, so `showsExerciseHeading` hands
      // QuizPanel `heading={false}` and the page carries one "Test your knowledge".
      figure: <SteerARun />,
      quiz: steeringQuiz,
    },
    {
      id: 'skills',
      title: 'patterns.title',
      html: patterns,
      // One slot, under the `Scripts` section, at the <div data-figure="script-runs"> the unit
      // leaves. Nothing after it reads the drawing, so its own labels carry what it argues.
      inlineFigures: { 'script-runs': <ScriptRuns /> },
      // The card closes the unit, under the same <hr> and "Test your knowledge" heading the rest of the
      // course puts over its exercises, with the questions below it. Ungraded: the unit's two
      // claims are worth running rather than answering, so the card asks for the run and the quiz
      // asks for the choice.
      figure: <SameEveryRun />,
      quiz: patternsQuiz,
    },
    {
      id: 'workflows',
      title: 'workflows.title',
      html: workflows,
      // Ten slots inside the prose. Five of them say who talks to what, and they
      // are a set: teal is what that workflow adds, so a change to one is a change to all five.
      // Then the fidelity ladder, the spec tree, the switchable audit, and the closing pair. None of them grades
      // anything.
      inlineFigures: {
        // The project is the same frame in all five, and what is inside it is what changes. Here it
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
        // The spec and the plan join the code inside the frame, which is the section's claim drawn:
        // they are not documents beside the work, they are files in it. The plan is the one
        // `flow-plan` left in the session, kept this time.
        'flow-spec': (
          <FlowDiagram
            id="flow-spec"
            nodes={[
              'you',
              'agent',
              { label: 'project', nodes: ['spec', 'plan', 'code'], links: ['one', 'one'] },
            ]}
            links={['both', 'both']}
          />
        ),
        // Not one of the five: the rungs a design question can be answered on, under the prototype
        // paragraph inside the spec section, with prototypes the highest one you still throw away.
        'fidelity-ladder': <FidelityLadder />,
        // Not one of the five either: where spec-driven work keeps its files, under the `<h3>` after
        // `flow-spec`. 1 intent cut into specs, 1 plan each.
        'spec-tree': <SpecTree />,
        // Two sessions rather than one row. What the agent turns up mid-task drops out of the row
        // into a file, and a later session starts from that file: the repeated `findings.md` is the
        // only thing the two share, which is the section's point.
        'flow-defer': (
          <FlowDiagram
            id="flow-defer"
            nodes={['you', 'agent', { label: 'project', nodes: ['code'], links: [] }]}
            links={['both', 'one']}
            aside={{ from: 1, node: 'findings' }}
            later={{
              nodes: [
                'findings',
                'you',
                'next',
                'agent',
                { label: 'project', nodes: ['code'], links: [] },
              ],
              links: ['one', 'one', 'one', 'one'],
            }}
          />
        ),
        // The only one that closes, and the longest: the agent writes the audit, you read it, and
        // it goes back to the agent as work. The return path lands on `audit.md` rather than on the
        // start of the row, because what the run produces is a new version of that file, and an
        // agent sits on it because an agent is what runs the audit again. The branch under it is
        // the other half of closing a row: the changed project comes back to you, you check the
        // fix, and you close its row in `audit.md`. The spec inside the project is faint because an audit does not
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
            loopBy="agent"
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
      id: 'proof',
      title: 'enablement.title',
      html: enablement,
      // Three slots inside the prose. The bands close `run-own-machine`, whose closing sentence is
      // the agent writing a change in seconds and your check having to keep up, so they are that
      // claim measured. `proof-loop` closes the order (reproduce, lock, implement, prove), which
      // came over from the `proof` unit in October 2026: it names all 5 stages, so under an earlier
      // heading it would spend the later ones early. Neither is read back by the prose, so each
      // carries its argument in its own labels. `t-shaped` has no figure: `SliceSkills` in
      // `engineering` draws the T.
      inlineFigures: {
        'loops-per-hour': <LoopsPerHour />,
        'proof-loop': <ProofLoop />,
        // Under `development-container.1`: what the container holds and where the app runs.
        'container-map': <ContainerMap />,
      },
      // And the task under the prose, at the <hr> and the shared heading the unit's HTML now
      // writes. `run-own-machine.3` says to put everything in a development container, so the card
      // is the tutor's demo of the kata's own, with the agent inside it. It grades nothing and posts
      // nothing; the tick is a bookmark.
      figure: <SameMachinery />,
    },
    {
      id: 'parallel',
      title: 'parallel.title',
      html: parallel,
      // One slot, and it closes the unit rather than sitting under the first section: the drawing
      // names all four arrangements, so under `One agent at a time` it would spend three of them
      // early. Nothing below it reads it back, which is why its rows carry their own notes.
      // The worktree drawing sits in `A worktree each`, moved here from `steering` in October 2026
      // because running several agents at once is this unit's subject, not that one's.
      inlineFigures: { 'worktree-each': <WorktreeEach />, 'agents-at-once': <AgentsAtOnce /> },
      // Three questions, and they are situations rather than definitions: which arrangement a piece
      // of work wants, what four unread diffs actually cost, and what a builder and a critic looping
      // at each other are actually selling you. The unit carries no task card, so the HTML writes no
      // `ui:quiz.title` and `QuizPanel` prints its own heading under the closing figure, the way
      // `workflows` and `goals` do.
      quiz: parallelQuiz,
    },
    {
      id: 'long-runs',
      title: 'goals.title',
      html: goals,
      // Four slots, one per expensive move the unit surveys. `window-spend` sits under the lead
      // because the tail of a window is what two later sections lean on, so it is the one figure in
      // this unit read forwards. The other three close the section that argues them, and none of
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
      // Four slots and no closing `figure`, because the capstone is a run rather than a page with
      // an exercise under it. `run-sheet` opens it and is read forwards: the sections below work
      // its stages in order, with the two it draws side by side sharing one section because they
      // run at once. Then one element per stage that produces something other than a flag, and the
      // board where the flags land. Guided mode drops every run of prose, so in class the page is
      // exactly this: the map, the two cards and the board, and the map is what carries the
      // commands the prose would have.
      inlineFigures: {
        'run-sheet': <RunSheet />,
        preflight: <Preflight />,
        // Graded in the browser against a salted hash, which is why it is a figure rather than an
        // exerciseId: an exerciseId would post to the service this step deliberately does not use.
        'flag-board': <Workshop />,
        debrief: <Debrief />,
      },
    },
  ],
  // What the tutor puts on the board for this step. Authored in `deck.tsx`, beside the figures it
  // reuses and the reasons three of them stay off it.
  deck,
}

export default step2
