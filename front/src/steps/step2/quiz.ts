import type { QuizQuestion } from '@/shared/step'

/**
 * The three questions under the `workflows` unit, and the only quiz in step 2. Each one asks the
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
