import type { QuizQuestion } from '@/shared/step'

/**
 * The three questions under the `intro` unit. Each one is a symptom a student will have already
 * met at work, and each maps onto a section of `units/intro.html`: amnesia, missing context and
 * entropy. Array order is not display order, because `QuizPanel` shuffles the questions and the
 * choices on every mount, so a question has to stand on its own rather than lean on the one above.
 *
 * These are graded in the browser, so nothing here has a counterpart in the Java service. The
 * explanations are only read by a student who got the question wrong, which is why they are two
 * sentences rather than a lecture.
 */
export const introQuiz: QuizQuestion[] = [
  {
    id: 'forgets-this-morning',
    question: 'quiz.forgets-this-morning.question',
    choices: [
      {
        id: 'window',
        label: 'quiz.forgets-this-morning.window',
        correct: true,
      },
      {
        id: 'ignored',
        label: 'quiz.forgets-this-morning.ignored',
      },
      {
        id: 'lookup',
        label: 'quiz.forgets-this-morning.lookup',
      },
      {
        id: 'learning',
        label: 'quiz.forgets-this-morning.learning',
      },
    ],
    explanation: 'quiz.forgets-this-morning.explanation',
  },
  {
    id: 'invented-userservice',
    question: 'quiz.invented-userservice.question',
    choices: [
      {
        id: 'never-read',
        label: 'quiz.invented-userservice.never-read',
        correct: true,
      },
      {
        id: 'too-complex',
        label: 'quiz.invented-userservice.too-complex',
      },
      {
        id: 'cached',
        label: 'quiz.invented-userservice.cached',
      },
      {
        id: 'naming',
        label: 'quiz.invented-userservice.naming',
      },
    ],
    explanation: 'quiz.invented-userservice.explanation',
  },
  {
    id: 'quality-degrades',
    question: 'quiz.quality-degrades.question',
    choices: [
      {
        id: 'entropy',
        label: 'quiz.quality-degrades.entropy',
        correct: true,
      },
      {
        id: 'degrades',
        label: 'quiz.quality-degrades.degrades',
      },
      {
        id: 'downgrade',
        label: 'quiz.quality-degrades.downgrade',
      },
      {
        id: 'repo-grew',
        label: 'quiz.quality-degrades.repo-grew',
      },
    ],
    explanation: 'quiz.quality-degrades.explanation',
  },
]

/**
 * The three questions under the `prompt` unit, one per section of `units/prompt.html`: what plan
 * mode actually buys you, why bundling beats a string of follow-ups, and what a reasoning level
 * does. Each one hands the student a result and asks what caused it, because the misconception
 * being tested is always a wrong cause (bigger model, tired model, more reading).
 *
 * Graded in the browser like `introQuiz`, so nothing here has a counterpart in the Java service,
 * and shuffled on mount the same way, so array order is not what the student sees.
 */
export const promptQuiz: QuizQuestion[] = [
  {
    id: 'plan-beats-one-shot',
    question: 'quiz.plan-beats-one-shot.question',
    choices: [
      {
        id: 'precision',
        label: 'quiz.plan-beats-one-shot.precision',
        correct: true,
      },
      {
        id: 'throttled',
        label: 'quiz.plan-beats-one-shot.throttled',
      },
      {
        id: 'newer',
        label: 'quiz.plan-beats-one-shot.newer',
      },
      {
        id: 'cache',
        label: 'quiz.plan-beats-one-shot.cache',
      },
    ],
    explanation: 'quiz.plan-beats-one-shot.explanation',
  },
  {
    id: 'six-follow-ups',
    question: 'quiz.six-follow-ups.question',
    choices: [
      {
        id: 'compounding',
        label: 'quiz.six-follow-ups.compounding',
        correct: true,
      },
      {
        id: 'last-message',
        label: 'quiz.six-follow-ups.last-message',
      },
      {
        id: 'auto-summary',
        label: 'quiz.six-follow-ups.auto-summary',
      },
      {
        id: 'less-effort',
        label: 'quiz.six-follow-ups.less-effort',
      },
    ],
    explanation: 'quiz.six-follow-ups.explanation',
  },
  {
    id: 'reasoning-level',
    question: 'quiz.reasoning-level.question',
    choices: [
      {
        id: 'thinking-tokens',
        label: 'quiz.reasoning-level.thinking-tokens',
        correct: true,
      },
      {
        id: 'bigger-model',
        label: 'quiz.reasoning-level.bigger-model',
      },
      {
        id: 'read-more',
        label: 'quiz.reasoning-level.read-more',
      },
      {
        id: 'bigger-window',
        label: 'quiz.reasoning-level.bigger-window',
      },
    ],
    explanation: 'quiz.reasoning-level.explanation',
  },
]
