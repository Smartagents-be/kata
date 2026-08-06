import type { QuizQuestion } from '@/shared/step'

/**
 * The three questions under `expectations`, and the only quiz in step 3. Each one puts the student in
 * a situation rather than asking them to define a term, because what this step teaches is a call
 * somebody makes in a room: what ate the three weeks after the demo, what to say when the prototype
 * on screen is somebody else's, and what to promise when one afternoon went unusually well.
 *
 * Array order is not display order, because `QuizPanel` shuffles the questions and the choices on
 * every mount, so each question has to stand on its own rather than lean on the one above it.
 *
 * Every wrong choice is a position a reader who half-understood the unit genuinely holds: that a
 * sharper request would have caught the cases nobody knew about yet, that the caveats belong to
 * whoever built the prototype, that one fast run is a rate. Nothing here reaches the Java service,
 * and the explanations are only read by a student who got the question wrong.
 */
export const expectationsQuiz: QuizQuestion[] = [
  {
    id: 'three-weeks-after-thursday',
    question: 'quiz.three-weeks-after-thursday.question',
    choices: [
      { id: 'cases', label: 'quiz.three-weeks-after-thursday.cases', correct: true },
      { id: 'vague', label: 'quiz.three-weeks-after-thursday.vague' },
      { id: 'poor', label: 'quiz.three-weeks-after-thursday.poor' },
      { id: 'queue', label: 'quiz.three-weeks-after-thursday.queue' },
    ],
    explanation: 'quiz.three-weeks-after-thursday.explanation',
  },
  {
    id: 'their-prototype',
    question: 'quiz.their-prototype.question',
    choices: [
      { id: 'say', label: 'quiz.their-prototype.say', correct: true },
      { id: 'theirs', label: 'quiz.their-prototype.theirs' },
      { id: 'ticket', label: 'quiz.their-prototype.ticket' },
      { id: 'build', label: 'quiz.their-prototype.build' },
    ],
    explanation: 'quiz.their-prototype.explanation',
  },
  {
    id: 'one-afternoon-quarter',
    question: 'quiz.one-afternoon-quarter.question',
    choices: [
      { id: 'checkpoint', label: 'quiz.one-afternoon-quarter.checkpoint', correct: true },
      { id: 'fourtimes', label: 'quiz.one-afternoon-quarter.fourtimes' },
      { id: 'old', label: 'quiz.one-afternoon-quarter.old' },
      { id: 'average', label: 'quiz.one-afternoon-quarter.average' },
    ],
    explanation: 'quiz.one-afternoon-quarter.explanation',
  },
]
