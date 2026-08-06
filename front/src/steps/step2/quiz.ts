import type { QuizQuestion } from '@/shared/step'

/**
 * The three questions under the `workflows` unit, the first of step 2's two quizzes. Each one asks the
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
 * The three questions under `goals`, and the lighter of the step's two quizzes: the unit is a survey
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
