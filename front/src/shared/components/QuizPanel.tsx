import { Fragment, useState, type FormEvent } from 'react'
import { Button } from '@/shared/components/ui/button'
import { Separator } from '@/shared/components/ui/separator'
import { localise } from '@/shared/i18n/locale'
import { useLocale } from '@/shared/i18n/useLocale'
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
 * The whole quiz is answered first and checked once, from the button at the bottom. A right answer
 * says nothing beyond marking itself right; only a wrong one is worth a sentence of explanation.
 * Everything locks after that, because the explanations give the remaining answers away.
 *
 * Questions and choices are both shuffled on every load, so nobody learns "the answer is the first
 * one" and two students side by side do not see the same paper. The order is drawn once per mount,
 * in a `useState` initialiser rather than during render, so picking an option or switching language
 * does not reshuffle the page under the student.
 */
export function QuizPanel({ questions }: { questions: QuizQuestion[] }) {
  const { t } = useLocale()
  const [order] = useState(() => shuffled(questions))
  const [picked, setPicked] = useState<Record<string, string>>({})
  const [checked, setChecked] = useState(false)

  const complete = order.every((question) => picked[question.id] !== undefined)

  function onSubmit(event: FormEvent) {
    event.preventDefault()
    setChecked(true)
  }

  return (
    <section id="quiz" data-component="QuizPanel" className="flex flex-col gap-6">
      <Separator id="quiz-separator" data-component="QuizPanel" />

      <h2
        id="quiz-title"
        data-component="QuizPanel"
        className="font-heading text-lg font-semibold"
      >
        {t('quiz.title')}
      </h2>

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
  index,
  number,
  total,
  picked,
  onPick,
  checked,
}: {
  question: QuizQuestion
  /** Zero-based position on screen, used to build the ids. `number` is what the student reads. */
  index: number
  number: number
  total: number
  picked?: string
  onPick: (choiceId: string) => void
  checked: boolean
}) {
  const { locale, t } = useLocale()
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
        className="text-muted-foreground text-xs font-medium tracking-wide uppercase"
      >
        {t('quiz.question', { number, total })}
      </legend>
      <p id={`quiz-question-${index}-text`} data-component="Question" className="font-medium">
        {localise(question.question, locale)}
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
              checked && choice.correct && 'font-medium text-emerald-700 dark:text-emerald-400',
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
              className="mt-1 shrink-0"
            />
            <span
              id={`quiz-question-${index}-answer-${answerIndex}-text`}
              data-component="Question"
            >
              {localise(choice.label, locale)}
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
          {localise(question.explanation, locale)}
        </p>
      )}
    </fieldset>
  )
}
