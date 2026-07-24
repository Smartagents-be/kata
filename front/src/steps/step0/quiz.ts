import type { QuizQuestion } from '@/shared/step'

/**
 * One question under the `welcome` unit, on the single thing the intro teaches: what a
 * `{}`-wrapped code in the prose is for. It is the lightest question in the kata on purpose, so a
 * student who read the page gets the green tick and sees how a quiz works before step 1 asks
 * anything real.
 *
 * Graded in the browser like every quiz here, so nothing in it has a counterpart in the Java
 * service. The explanation is only read by someone who got it wrong.
 */
export const understoodQuiz: QuizQuestion[] = [
  {
    id: 'what-the-code-is',
    question: 'quiz.what-the-code-is.question',
    choices: [
      {
        id: 'the-answer',
        label: 'quiz.what-the-code-is.the-answer',
        correct: true,
      },
      {
        id: 'run-it',
        label: 'quiz.what-the-code-is.run-it',
      },
      {
        id: 'version',
        label: 'quiz.what-the-code-is.version',
      },
      {
        id: 'placeholder',
        label: 'quiz.what-the-code-is.placeholder',
      },
    ],
    explanation: 'quiz.what-the-code-is.explanation',
  },
]
