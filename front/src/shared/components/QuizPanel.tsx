import { useState, type FormEvent } from 'react'
import { useTranslation } from 'react-i18next'
import { ChoiceKey, ChoiceMark } from '@/shared/components/Panel'
import { Button } from '@/shared/components/ui/button'
import { Separator } from '@/shared/components/ui/separator'
import { useStepText } from '@/shared/i18n/useStepText'
import { choiceLabelClass, choiceRowClass } from '@/shared/lib/choice'
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
 * Plain text on the page, and the structure is carried by hairline rules, a lettered key column and
 * type hierarchy rather than by anything boxed. The exercise below it is a card because it talks to
 * the service and can fail; a quiz has nothing to announce, so it stays part of the reading. The
 * options are drawn as full-width rows because they are the one thing on the page the student
 * clicks, and a sentence-long answer beside a bare radio gave a four-option question no target to
 * aim at. They carry no border of their own: the rules between them are what separates one answer
 * from the next, and their ends line up with the rule under each question's own label, so the whole
 * block reads as one surface instead of a card holding four smaller ones.
 *
 * The letter key (A, B, C, D) is a visual adornment only. The radio itself is still there and still
 * what the row's label is bound to; it is `sr-only`, so a keyboard user tabs the group the way they
 * always did and the row carries the focus ring on their behalf.
 *
 * The "Test yourself" heading is the same `ui` key a unit writes above its own tasks, and a unit
 * that already wrote it hands `heading={false}` so the two sit under one. The separator stays either
 * way: inside a shared section it is what divides the task from the questions. Between questions
 * there is no separator, because each one opens on its own labelled rule and a second line under the
 * one above it would only draw the same seam twice.
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
        // Sized to Typography's own `h2`, because this is the same string a unit's prose writes
        // above its task and the two used to come out at 18px and 24px depending on which of them
        // printed it. One heading, one size, whoever renders it.
        <h2
          id="quiz-title"
          data-component="QuizPanel"
          className="font-heading text-2xl font-bold tracking-tight"
        >
          {t('quiz.title')}
        </h2>
      )}

      {/* mt-2 on top of the section gap: the header needs to sit clear of the first counter. */}
      <form
        id="quiz-form"
        data-component="QuizPanel"
        onSubmit={onSubmit}
        className="mt-2 flex flex-col gap-9"
      >
        {order.map((question, index) => (
          <Question
            key={question.id}
            question={question}
            namespace={namespace}
            index={index}
            number={index + 1}
            total={order.length}
            picked={picked[question.id]}
            onPick={(choiceId) => setPicked((all) => ({ ...all, [question.id]: choiceId }))}
            checked={checked}
          />
        ))}

        {!checked && (
          <div id="quiz-actions" data-component="QuizPanel" className="flex justify-end">
            <Button
              id="quiz-submit"
              data-component="QuizPanel"
              type="submit"
              size="lg"
              disabled={!complete}
              className="h-9.5 px-5"
            >
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
      {/*
        A legend has to be a direct child of its fieldset, so it carries the counter itself, and the
        hairline that runs off the end of it is inside the legend for the same reason. The rule is
        what opens each question: it is the seam the separator between questions used to draw, moved
        onto the label so the counter and the line are one gesture.
      */}
      <legend
        id={`quiz-question-${index}-legend`}
        data-component="Question"
        // A legend is laid out in the fieldset's border area rather than as a flex item, so the
        // fieldset's own `gap` never reaches it: the space under the counter has to be its own
        // margin or the question text sits straight on the rule.
        className="mb-4 flex w-full items-baseline gap-3"
      >
        <span
          id={`quiz-question-${index}-counter`}
          data-component="Question"
          className="eyebrow text-primary"
        >
          {t('quiz.question', { number, total })}
        </span>
        <span
          id={`quiz-question-${index}-rule`}
          data-component="Question"
          aria-hidden
          className="bg-border/70 h-px flex-1"
        />
      </legend>
      <p
        id={`quiz-question-${index}-text`}
        data-component="Question"
        className="max-w-[54ch] text-[1.0625rem] leading-snug font-semibold tracking-[-0.012em]"
      >
        {text(question.question)}
      </p>

      {/*
        The rule above the first option closes the gap the legend's own rule opened, so the four rows
        read as one ruled block rather than as four things floating under the question.
      */}
      <div
        id={`quiz-question-${index}-answers`}
        data-component="Question"
        className="border-border/70 mt-1 border-t"
      >
        {choices.map((choice, answerIndex) => {
          const state = !checked
            ? picked === choice.id
              ? 'picked'
              : 'open'
            : choice.correct
              ? 'right'
              : picked === choice.id
                ? 'wrong'
                : 'clean'
          return (
            <label
              key={choice.id}
              id={`quiz-question-${index}-answer-${answerIndex}-label`}
              data-component="Question"
              data-state={state}
              // The row carries the focus ring, not the radio inside it: the target a keyboard user
              // is on is the whole option. `choiceRowClass` is what every pickable row in the course
              // is drawn with, so the quiz and the three graded exercises cannot drift apart.
              className={choiceRowClass(state, checked)}
            >
              <input
                id={`quiz-question-${index}-answer-${answerIndex}-input`}
                data-component="Question"
                type="radio"
                name={question.id}
                value={choice.id}
                checked={picked === choice.id}
                onChange={() => onPick(choice.id)}
                className="sr-only"
              />
              {/*
                The letter is the radio's whole visual: a filled key says picked, and after checking
                it says which one was right and which one you took. It is `aria-hidden` because the
                label's text is the answer and the letter is only how it is pointed at on screen.
              */}
              <ChoiceKey
                id={`quiz-question-${index}-answer-${answerIndex}-key`}
                state={state}
                index={answerIndex}
              />
              <span
                id={`quiz-question-${index}-answer-${answerIndex}-text`}
                data-component="Question"
                className={choiceLabelClass(state)}
              >
                {text(choice.label)}
              </span>
              <ChoiceMark
                idBase={`quiz-question-${index}-answer-${answerIndex}`}
                state={state}
              />
            </label>
          )
        })}
      </div>

      {/*
        A correct answer needs no words: the option marked green already said it. The wrong one's
        sentence rolls out from nothing instead of appearing under the options, so the eye is taken
        to it rather than having to find it. The wrapper is the grid the rollout animates, which is
        why it is here and not a class on the paragraph.
      */}
      {wrong && (
        <div
          id={`quiz-question-${index}-explanation-rollout`}
          data-component="Question"
          className="animate-rollout motion-reduce:animate-none mt-1 grid grid-rows-[1fr]"
        >
          <p
            id={`quiz-question-${index}-explanation`}
            data-component="Question"
            role="status"
            className="text-destructive max-w-[54ch] overflow-hidden text-sm leading-relaxed"
          >
            {text(question.explanation)}
          </p>
        </div>
      )}
    </fieldset>
  )
}
