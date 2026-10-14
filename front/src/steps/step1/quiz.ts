import type { QuizQuestion } from '@/shared/step'

/**
 * The 2 questions under the `context` unit, both about what is in one request: context that is
 * missing and context that is wrong. Array order is not display order, because `QuizPanel`
 * shuffles the questions and the choices on every mount, so a question has to stand on its own
 * rather than lean on the one above.
 *
 * `pasted-old-file` is `bad-context-bad.3`, the unit's least intuitive and most expensive claim, that
 * nothing in the window says stale. The other 2 questions this quiz once had, amnesia and entropy,
 * moved to `sessionQuiz` with the sections they test, and kept their ids.
 *
 * These are graded in the browser, so nothing here has a counterpart in the Java service. The
 * explanations are only read by a student who got the question wrong, which is why they are two
 * sentences rather than a lecture.
 */
export const contextQuiz: QuizQuestion[] = [
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
    id: 'pasted-old-file',
    question: 'quiz.pasted-old-file.question',
    choices: [
      {
        id: 'reads-as-true',
        label: 'quiz.pasted-old-file.reads-as-true',
        correct: true,
      },
      {
        id: 'should-have-checked',
        label: 'quiz.pasted-old-file.should-have-checked',
      },
      {
        id: 'too-old',
        label: 'quiz.pasted-old-file.too-old',
      },
      {
        id: 'window-too-small',
        label: 'quiz.pasted-old-file.window-too-small',
      },
    ],
    explanation: 'quiz.pasted-old-file.explanation',
  },
]

/**
 * The 2 questions under the `session` unit, one per section they test: entropy and amnesia. They are
 * opposite failure modes, too much left in the context against too little, and both earn a question.
 * Both came from `contextQuiz` with their ids and choice ids unchanged.
 */
export const sessionQuiz: QuizQuestion[] = [
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
]

/**
 * The three questions under the `prompt` unit, one per section that has something a reader gets
 * wrong: what plan mode actually buys you, why bundling beats a string of follow-ups, and what a
 * reasoning level does. Meta-prompting is unasked because plan mode is meta-prompting with the
 * provider's own machinery around it. Each one hands the student a result and asks what caused it,
 * because the misconception being tested is always a wrong cause (bigger model, tired model, more
 * reading).
 *
 * Graded in the browser like `contextQuiz`, so nothing here has a counterpart in the Java service,
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
        id: 'effort',
        label: 'quiz.reasoning-level.effort',
        correct: true,
      },
      {
        id: 'bigger-model',
        label: 'quiz.reasoning-level.bigger-model',
      },
      {
        id: 'think-hard',
        label: 'quiz.reasoning-level.think-hard',
      },
      {
        id: 'bigger-window',
        label: 'quiz.reasoning-level.bigger-window',
      },
    ],
    explanation: 'quiz.reasoning-level.explanation',
  },
]

/**
 * The three questions under the `truth` unit, one per thing it asks of the student: tell a cause
 * the agent found from one that filled a gap, get past the training cutoff, and know what counts as
 * proof. Rewritten 14 October 2026 at the owner's asking, with new ids, when `Hallucinations` moved
 * to the 2-causes example: the old three were stiffly worded and one asked about a misreading a
 * current model rarely makes.
 *
 * `contextQuiz`'s `invented-userservice` owns the missing-context case and is deliberately not
 * repeated here. Nothing in these three re-argues that a model is an average either; `context` owns
 * that and this unit owns the date.
 */
export const truthQuiz: QuizQuestion[] = [
  {
    id: 'two-causes',
    question: 'quiz.two-causes.question',
    choices: [
      {
        id: 'ask-the-source',
        label: 'quiz.two-causes.ask-the-source',
        correct: true,
      },
      {
        id: 'ask-if-sure',
        label: 'quiz.two-causes.ask-if-sure',
      },
      {
        id: 'most-detailed',
        label: 'quiz.two-causes.most-detailed',
      },
      {
        id: 'listed-first',
        label: 'quiz.two-causes.listed-first',
      },
    ],
    explanation: 'quiz.two-causes.explanation',
  },
  {
    id: 'option-gone-after-cutoff',
    question: 'quiz.option-gone-after-cutoff.question',
    choices: [
      {
        id: 'read-the-docs',
        label: 'quiz.option-gone-after-cutoff.read-the-docs',
        correct: true,
      },
      {
        id: 'raise-effort',
        label: 'quiz.option-gone-after-cutoff.raise-effort',
      },
      {
        id: 'say-newest',
        label: 'quiz.option-gone-after-cutoff.say-newest',
      },
      {
        id: 'ask-if-sure',
        label: 'quiz.option-gone-after-cutoff.ask-if-sure',
      },
    ],
    explanation: 'quiz.option-gone-after-cutoff.explanation',
  },
  {
    id: 'what-proves-a-fix',
    question: 'quiz.what-proves-a-fix.question',
    choices: [
      {
        id: 'red-then-green',
        label: 'quiz.what-proves-a-fix.red-then-green',
        correct: true,
      },
      {
        id: 'reread-code',
        label: 'quiz.what-proves-a-fix.reread-code',
      },
      {
        id: 'quotes-the-line',
        label: 'quiz.what-proves-a-fix.quotes-the-line',
      },
      {
        id: 'build-passes',
        label: 'quiz.what-proves-a-fix.build-passes',
      },
    ],
    explanation: 'quiz.what-proves-a-fix.explanation',
  },
]
