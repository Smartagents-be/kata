import type { QuizQuestion } from '@/shared/step'

/**
 * Two questions under the `welcome` unit, one per half of what the intro teaches. The first is what
 * a `{}`-wrapped code in the prose is for, and it is the lightest question in the kata on purpose,
 * so a student who read the page gets the green tick and sees how a quiz works before step 1 asks
 * anything real. The second is house rule two, which is the one rule on that page a student can
 * break without noticing: an agent that hands back a plausible flag it never ran for is the failure
 * step 0's board is built to catch, and the `pick` row makes them live it a page later.
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
  {
    id: 'agent-says-it-found-it',
    question: 'quiz.agent-says-it-found-it.question',
    choices: [
      {
        id: 'a-guess',
        label: 'quiz.agent-says-it-found-it.a-guess',
        correct: true,
      },
      {
        id: 'it-read-the-file',
        label: 'quiz.agent-says-it-found-it.it-read-the-file',
      },
      {
        id: 'right-shape',
        label: 'quiz.agent-says-it-found-it.right-shape',
      },
      {
        id: 'only-builds',
        label: 'quiz.agent-says-it-found-it.only-builds',
      },
    ],
    explanation: 'quiz.agent-says-it-found-it.explanation',
  },
]
