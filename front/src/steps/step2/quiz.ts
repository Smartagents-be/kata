import type { QuizQuestion } from '@/shared/step'

/**
 * The three questions under the `workflows` unit, the first of step 2's quizzes. Each one asks the
 * student to pick a workflow for a situation rather than to name one, because the unit's argument
 * is the choice between the four and not the four themselves: `small-change-no-spec` is naive
 * against the pull to be consistent, `plan-mode-interview` is what plan mode buys that is not a
 * better draft, and `audit-as-essay` is the format rule that makes an audit a file you can work.
 * Spec-driven has no question of its own on purpose, since it is the one the other three are
 * measured against and it turns up in all of them.
 *
 * Array order is not display order, because `QuizPanel` shuffles the questions and the choices on
 * every mount, so a question has to stand on its own rather than lean on the one above.
 *
 * These are graded in the browser, so nothing here has a counterpart in the Java service, and the
 * unit still talks to it only through the runs the student does outside the app. The explanations
 * are only read by a student who got the question wrong, which is why they are two sentences.
 */
export const workflowsQuiz: QuizQuestion[] = [
  {
    id: 'small-change-no-spec',
    question: 'quiz.small-change-no-spec.question',
    choices: [
      {
        id: 'nudge',
        label: 'quiz.small-change-no-spec.nudge',
        correct: true,
      },
      {
        id: 'consistency',
        label: 'quiz.small-change-no-spec.consistency',
      },
      {
        id: 'batch',
        label: 'quiz.small-change-no-spec.batch',
      },
      {
        id: 'audit',
        label: 'quiz.small-change-no-spec.audit',
      },
    ],
    explanation: 'quiz.small-change-no-spec.explanation',
  },
  {
    id: 'plan-mode-interview',
    question: 'quiz.plan-mode-interview.question',
    choices: [
      {
        id: 'interview',
        label: 'quiz.plan-mode-interview.interview',
        correct: true,
      },
      {
        id: 'thinking',
        label: 'quiz.plan-mode-interview.thinking',
      },
      {
        id: 'document',
        label: 'quiz.plan-mode-interview.document',
      },
      {
        id: 'review',
        label: 'quiz.plan-mode-interview.review',
      },
    ],
    explanation: 'quiz.plan-mode-interview.explanation',
  },
  {
    id: 'audit-as-essay',
    question: 'quiz.audit-as-essay.question',
    choices: [
      {
        id: 'format',
        label: 'quiz.audit-as-essay.format',
        correct: true,
      },
      {
        id: 'scope',
        label: 'quiz.audit-as-essay.scope',
      },
      {
        id: 'memory',
        label: 'quiz.audit-as-essay.memory',
      },
      {
        id: 'model',
        label: 'quiz.audit-as-essay.model',
      },
    ],
    explanation: 'quiz.audit-as-essay.explanation',
  },
]

/**
 * The three questions under `patterns`, and the step's third quiz. The unit argues two moves, so
 * each question puts the student in the situation the move answers rather than asking what a skill
 * or a script is: `third-correction` is the correction that has nowhere to live,
 * `skill-still-off` is the second pass that makes a working skill sound like you, and
 * `script-or-skill` is the repetition with an expected end result, where the script does the work
 * and the skill beside it is only what makes the agent aware of it.
 *
 * **No distractor names a hook.** The word appears nowhere in the unit, on the record in
 * `step2/CLAUDE.md`, and `setup`'s forward pointer was cut because of it; a wrong answer about
 * hooks would put the word back through the side door.
 *
 * Array order is not display order, because `QuizPanel` shuffles the questions and the choices on
 * every mount, so no question may lean on the one above it.
 */
export const patternsQuiz: QuizQuestion[] = [
  {
    id: 'third-correction',
    question: 'quiz.third-correction.question',
    choices: [
      {
        id: 'no-home',
        label: 'quiz.third-correction.no-home',
        correct: true,
      },
      {
        id: 'context-full',
        label: 'quiz.third-correction.context-full',
      },
      {
        id: 'wrong-model',
        label: 'quiz.third-correction.wrong-model',
      },
      {
        id: 'prompt-wording',
        label: 'quiz.third-correction.prompt-wording',
      },
    ],
    explanation: 'quiz.third-correction.explanation',
  },
  {
    id: 'skill-still-off',
    question: 'quiz.skill-still-off.question',
    choices: [
      {
        id: 'both-versions',
        label: 'quiz.skill-still-off.both-versions',
        correct: true,
      },
      {
        id: 'longer-prompt',
        label: 'quiz.skill-still-off.longer-prompt',
      },
      {
        id: 'stricter-description',
        label: 'quiz.skill-still-off.stricter-description',
      },
      {
        id: 'rewrite-skill',
        label: 'quiz.skill-still-off.rewrite-skill',
      },
    ],
    explanation: 'quiz.skill-still-off.explanation',
  },
  {
    id: 'script-or-skill',
    question: 'quiz.script-or-skill.question',
    choices: [
      {
        id: 'script-and-skill',
        label: 'quiz.script-or-skill.script-and-skill',
        correct: true,
      },
      {
        id: 'longer-skill',
        label: 'quiz.script-or-skill.longer-skill',
      },
      {
        id: 'claude-md',
        label: 'quiz.script-or-skill.claude-md',
      },
      {
        id: 'plan-mode',
        label: 'quiz.script-or-skill.plan-mode',
      },
    ],
    explanation: 'quiz.script-or-skill.explanation',
  },
]

/**
 * The three questions under `steering`. Each one is a situation rather than a definition, one per
 * section that has something to get wrong: a wrong turn with nothing written yet, a run that has
 * stopped making progress, and a standing rule followed to the letter and not to the point.
 *
 * `A worktree each` gets none, because its argument is a cost rather than a choice: there is no
 * wrong answer to offer about a second checkout, only a reason to make one.
 *
 * Array order is not display order, because `QuizPanel` shuffles the questions and the choices on
 * every mount, so a question has to stand on its own rather than lean on the one above.
 */
export const steeringQuiz: QuizQuestion[] = [
  {
    id: 'wrong-turn-nothing-written',
    question: 'quiz.wrong-turn-nothing-written.question',
    choices: [
      {
        id: 'rewind',
        label: 'quiz.wrong-turn-nothing-written.rewind',
        correct: true,
      },
      {
        id: 'correct-it',
        label: 'quiz.wrong-turn-nothing-written.correct-it',
      },
      {
        id: 'clear',
        label: 'quiz.wrong-turn-nothing-written.clear',
      },
      {
        id: 'queue',
        label: 'quiz.wrong-turn-nothing-written.queue',
      },
    ],
    explanation: 'quiz.wrong-turn-nothing-written.explanation',
  },
  {
    id: 'fifth-fix-same-shape',
    question: 'quiz.fifth-fix-same-shape.question',
    choices: [
      {
        id: 'clear-and-carry',
        label: 'quiz.fifth-fix-same-shape.clear-and-carry',
        correct: true,
      },
      {
        id: 'rewind',
        label: 'quiz.fifth-fix-same-shape.rewind',
      },
      {
        id: 'tell-it',
        label: 'quiz.fifth-fix-same-shape.tell-it',
      },
      {
        id: 'paste-output',
        label: 'quiz.fifth-fix-same-shape.paste-output',
      },
    ],
    explanation: 'quiz.fifth-fix-same-shape.explanation',
  },
  {
    id: 'logged-and-carried-on',
    question: 'quiz.logged-and-carried-on.question',
    choices: [
      {
        id: 'should-have-stopped',
        label: 'quiz.logged-and-carried-on.should-have-stopped',
        correct: true,
      },
      {
        id: 'nothing-wrong',
        label: 'quiz.logged-and-carried-on.nothing-wrong',
      },
      {
        id: 'wrong-place',
        label: 'quiz.logged-and-carried-on.wrong-place',
      },
      {
        id: 'too-many',
        label: 'quiz.logged-and-carried-on.too-many',
      },
    ],
    explanation: 'quiz.logged-and-carried-on.explanation',
  },
]

/**
 * The three questions under `goals`, and the lighter of the step's quizzes: the unit is a survey
 * of expensive moves, so each question takes one of them and asks what it actually costs.
 * `report-on-a-wish` is a goal with no command behind it, `fleet-bill` is the reading every agent in
 * a fan-out pays again, and `window-tail` is the timing the unit's opening figure draws.
 *
 * The frontier-model relay has no question of its own, on the same reasoning that leaves spec-driven
 * out of the `workflows` quiz: it is a habit rather than a decision with a wrong branch, and the one
 * thing a student could get wrong about it (letting the expensive tier write the code) is the cost
 * argument `fleet-bill` already asks in a sharper setting.
 *
 * Array order is not display order: `QuizPanel` shuffles both the questions and the choices on every
 * mount, so nothing here may lean on the question above it or name a position.
 */
export const spendingQuiz: QuizQuestion[] = [
  {
    id: 'report-on-a-wish',
    question: 'quiz.report-on-a-wish.question',
    choices: [
      {
        id: 'no-command',
        label: 'quiz.report-on-a-wish.no-command',
        correct: true,
      },
      {
        id: 'too-long',
        label: 'quiz.report-on-a-wish.too-long',
      },
      {
        id: 'wrong-tier',
        label: 'quiz.report-on-a-wish.wrong-tier',
      },
      {
        id: 'no-worktree',
        label: 'quiz.report-on-a-wish.no-worktree',
      },
    ],
    explanation: 'quiz.report-on-a-wish.explanation',
  },
  {
    id: 'fleet-bill',
    question: 'quiz.fleet-bill.question',
    choices: [
      {
        id: 'read-again',
        label: 'quiz.fleet-bill.read-again',
        correct: true,
      },
      {
        id: 'overwrote',
        label: 'quiz.fleet-bill.overwrote',
      },
      {
        id: 'gathered',
        label: 'quiz.fleet-bill.gathered',
      },
      {
        id: 'pricier-tier',
        label: 'quiz.fleet-bill.pricier-tier',
      },
    ],
    explanation: 'quiz.fleet-bill.explanation',
  },
  {
    id: 'window-tail',
    question: 'quiz.window-tail.question',
    choices: [
      {
        id: 'spend-it',
        label: 'quiz.window-tail.spend-it',
        correct: true,
      },
      {
        id: 'save-it',
        label: 'quiz.window-tail.save-it',
      },
      {
        id: 'stop-early',
        label: 'quiz.window-tail.stop-early',
      },
      {
        id: 'upgrade-small',
        label: 'quiz.window-tail.upgrade-small',
      },
    ],
    explanation: 'quiz.window-tail.explanation',
  },
]

/**
 * The three questions under `parallel`, the step's third quiz. The unit surveys four arrangements of
 * agents and argues that what separates them is how much of your attention each one gets, so every
 * question hands the student a situation and asks which arrangement it wants or what one of them
 * already cost: `deep-not-wide` is work that is deep rather than wide, `green-and-unread` is four
 * green builds and two diffs actually read, and `who-holds-the-wires` is what an orchestrator moves
 * and what it does not.
 *
 * `One in front, the rest behind` has no question of its own, on the same reasoning that leaves
 * spec-driven out of `workflowsQuiz`: it is the answer the other three are measured against, and it
 * turns up as a choice inside two of them.
 *
 * No distractor claims an orchestrator stops two agents writing over each other. That claim was cut
 * from the unit while still half believed, and a distractor the repository does not flatly reject is
 * one a careful student can defend.
 *
 * Array order is not display order, because `QuizPanel` shuffles the questions and the choices on
 * every mount, so a question has to stand on its own rather than lean on the one above.
 */
export const parallelQuiz: QuizQuestion[] = [
  {
    id: 'deep-not-wide',
    question: 'quiz.deep-not-wide.question',
    choices: [
      {
        id: 'one-agent',
        label: 'quiz.deep-not-wide.one-agent',
        correct: true,
      },
      {
        id: 'four-drafts',
        label: 'quiz.deep-not-wide.four-drafts',
      },
      {
        id: 'front-and-behind',
        label: 'quiz.deep-not-wide.front-and-behind',
      },
      {
        id: 'orchestrated',
        label: 'quiz.deep-not-wide.orchestrated',
      },
    ],
    explanation: 'quiz.deep-not-wide.explanation',
  },
  {
    id: 'green-and-unread',
    question: 'quiz.green-and-unread.question',
    choices: [
      {
        id: 'reading-at-the-end',
        label: 'quiz.green-and-unread.reading-at-the-end',
        correct: true,
      },
      {
        id: 'builds-are-the-check',
        label: 'quiz.green-and-unread.builds-are-the-check',
      },
      {
        id: 'window-too-small',
        label: 'quiz.green-and-unread.window-too-small',
      },
      {
        id: 'shared-branch',
        label: 'quiz.green-and-unread.shared-branch',
      },
    ],
    explanation: 'quiz.green-and-unread.explanation',
  },
  {
    id: 'who-holds-the-wires',
    question: 'quiz.who-holds-the-wires.question',
    choices: [
      {
        id: 'coordination-moves',
        label: 'quiz.who-holds-the-wires.coordination-moves',
        correct: true,
      },
      {
        id: 'inherits-context',
        label: 'quiz.who-holds-the-wires.inherits-context',
      },
      {
        id: 'answer-each',
        label: 'quiz.who-holds-the-wires.answer-each',
      },
      {
        id: 'runs-in-turn',
        label: 'quiz.who-holds-the-wires.runs-in-turn',
      },
    ],
    explanation: 'quiz.who-holds-the-wires.explanation',
  },
]
