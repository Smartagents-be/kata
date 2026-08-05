import { Fragment, useState, type FormEvent } from 'react'
import { useTranslation } from 'react-i18next'
import { Button } from '@/shared/components/ui/button'
import { Separator } from '@/shared/components/ui/separator'
import { useStepText } from '@/shared/i18n/useStepText'
import { cn } from '@/shared/lib/utils'
import type { QuizChoice, QuizQuestion } from '@/shared/step'

/** Fisher-Yates on a copy: the registry array is module state and must not be reordered in place. */
function shuffled<T>(items: readonly T[]): T[] {
  const copy = [...items]
  for (let i = copy.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1))
    ;[copy[i], copy[j]] = [copy[j], copy[i]]
  }
  return copy
}

/**
 * Multiple-choice questions graded here in the browser, not by the Java service. The answer is one
 * of the options on screen, so there is nothing a server could add.
 *
 * Plain text on the page, ruled off by separators. The exercise below it is a card because it talks
 * to the service and can fail; a quiz has nothing to announce, so it stays part of the reading.
 *
 * The "Test yourself" heading is the same `ui` key a unit writes above its own tasks, and a unit
 * that already wrote it hands `heading={false}` so the two sit under one. The separator stays either
 * way: inside a shared section it is what divides the task from the questions.
 *
 * The whole quiz is answered first and checked once, from the button at the bottom. A right answer
 * says nothing beyond marking itself right; only a wrong one is worth a sentence of explanation.
 * Everything locks after that, because the explanations give the remaining answers away.
 *
 * Questions and choices are both shuffled on every load, so nobody learns "the answer is the first
 * one" and two students side by side do not see the same paper. The order is drawn once per mount,
 * in a `useState` initialiser rather than during render, so picking an option or switching language
 * does not reshuffle the page under the student.
 */
export function QuizPanel({
  questions,
  namespace,
  onPass,
  heading = true,
}: {
  questions: QuizQuestion[]
  /** The step the questions belong to; their text is read from that step's namespace. */
  namespace: string
  /** Fired once, on check, when every question was answered correctly. Marks the unit done. */
  onPass?: () => void
  /**
   * False when the unit's own prose already put "Test yourself" on the page, above a task the quiz
   * arrives after. The two then share one heading instead of printing it twice; the rule is
   * upstream, in `showsExerciseHeading`.
   */
  heading?: boolean
}) {
  const { t } = useTranslation()
  const [order] = useState(() => shuffled(questions))
  const [picked, setPicked] = useState<Record<string, string>>({})
  const [checked, setChecked] = useState(false)

  const complete = order.every((question) => picked[question.id] !== undefined)

  function onSubmit(event: FormEvent) {
    event.preventDefault()
    setChecked(true)
    const allCorrect = order.every(
      (question) => question.choices.find((choice) => choice.id === picked[question.id])?.correct,
    )
    if (allCorrect) {
      onPass?.()
    }
  }

  return (
    <section
      id="quiz"
      data-component="QuizPanel"
      // Labelled by the heading it prints, or by the one the prose above it printed instead.
      aria-label={heading ? undefined : t('quiz.title')}
      className="flex flex-col gap-6"
    >
      <Separator id="quiz-separator" data-component="QuizPanel" />

      {heading && (
        <h2
          id="quiz-title"
          data-component="QuizPanel"
          className="font-heading text-lg font-semibold"
        >
          {t('quiz.title')}
        </h2>
      )}

      {/* mt-2 on top of the section gap: the header needs to sit clear of the first counter. */}
      <form
        id="quiz-form"
        data-component="QuizPanel"
        onSubmit={onSubmit}
        className="mt-2 flex flex-col gap-6"
      >
        {order.map((question, index) => (
          <Fragment key={question.id}>
            {index > 0 && (
              <Separator
                id={`quiz-question-${index}-separator`}
                data-component="QuizPanel"
                className="bg-border/60"
              />
            )}
            <Question
              question={question}
              namespace={namespace}
              index={index}
              number={index + 1}
              total={order.length}
              picked={picked[question.id]}
              onPick={(choiceId) => setPicked((all) => ({ ...all, [question.id]: choiceId }))}
              checked={checked}
            />
          </Fragment>
        ))}

        {!checked && (
          <div id="quiz-actions" data-component="QuizPanel" className="flex justify-end">
            <Button id="quiz-submit" data-component="QuizPanel" type="submit" disabled={!complete}>
              {t('quiz.submit')}
            </Button>
          </div>
        )}
      </form>
    </section>
  )
}

function Question({
  question,
  namespace,
  index,
  number,
  total,
  picked,
  onPick,
  checked,
}: {
  question: QuizQuestion
  namespace: string
  /** Zero-based position on screen, used to build the ids. `number` is what the student reads. */
  index: number
  number: number
  total: number
  picked?: string
  onPick: (choiceId: string) => void
  checked: boolean
}) {
  const { t } = useTranslation()
  const { text } = useStepText(namespace)
  const [choices] = useState<QuizChoice[]>(() => shuffled(question.choices))

  const wrong = checked && choices.find((choice) => choice.id === picked)?.correct !== true

  return (
    <fieldset
      id={`quiz-question-${index}`}
      data-component="Question"
      disabled={checked}
      className="flex flex-col gap-3"
    >
      {/* A legend has to be a direct child of its fieldset, so it carries the counter itself. */}
      <legend
        id={`quiz-question-${index}-legend`}
        data-component="Question"
        className="eyebrow text-muted-foreground"
      >
        {t('quiz.question', { number, total })}
      </legend>
      <p id={`quiz-question-${index}-text`} data-component="Question" className="font-medium">
        {text(question.question)}
      </p>

      <div
        id={`quiz-question-${index}-answers`}
        data-component="Question"
        className="flex flex-col gap-2"
      >
        {choices.map((choice, answerIndex) => (
          <label
            key={choice.id}
            id={`quiz-question-${index}-answer-${answerIndex}-label`}
            data-component="Question"
            className={cn(
              'flex cursor-pointer items-start gap-3 text-sm',
              checked && 'cursor-default',
              // The right answer and the wrong pick carry the verdict; the options nobody chose
              // stay in body colour so they still read as ordinary text.
              checked && choice.correct && 'text-success-foreground font-medium',
              checked && !choice.correct && picked === choice.id && 'text-destructive',
            )}
          >
            <input
              id={`quiz-question-${index}-answer-${answerIndex}-input`}
              data-component="Question"
              type="radio"
              name={question.id}
              value={choice.id}
              checked={picked === choice.id}
              onChange={() => onPick(choice.id)}
              className="accent-primary mt-0.5 size-3.5 shrink-0"
            />
            <span
              id={`quiz-question-${index}-answer-${answerIndex}-text`}
              data-component="Question"
            >
              {text(choice.label)}
            </span>
          </label>
        ))}
      </div>

      {/* A correct answer needs no words: the option marked green already said it. */}
      {wrong && (
        <p
          id={`quiz-question-${index}-explanation`}
          data-component="Question"
          role="status"
          className="border-destructive/40 border-l-2 pl-3 text-sm"
        >
          {text(question.explanation)}
        </p>
      )}
    </fieldset>
  )
}
