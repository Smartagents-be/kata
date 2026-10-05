import { useId } from 'react'
import { useTranslation } from 'react-i18next'

/**
 * One prompt taken apart: the oval the step draws a prompt as, and the 5 things it can carry.
 *
 * **It replaced `PromptInContext`, which drew the oval and nothing else.** That figure said "this
 * is a shape, and it is small", and the course owner read it as a figure about nothing. The oval is
 * kept, with `ContextDiagram`'s prompt geometry and fills, so the step still meets the prompt as one
 * shape before `ToolsInContext` puts a frame round it. What is new is what hangs off it.
 *
 * **The 5 parts are one ask any developer reads without knowing this repo**: a 404 for a user that
 * does not exist. It was an ask against step 1's own `TitleController` first, and the course owner
 * could not follow it: the figure sits at the top of the unit, before a student has seen that code,
 * and a limit is only clear when its reason speaks for itself. So the names are invented and
 * ordinary, and each part is about the same task: the limit names the shortcut an agent takes for a
 * 404 (throwing from the repository) and the reason it would break something else. `be-exact.2` and
 * `few-shot.1` use the same ask, so the figure and the prose are one example.
 *
 * The parts are a numbered list with the design system's `data-marker`, because the prose under the
 * figure and the sections further down point at them by name. The labels are the step's words and
 * translate; the clauses are a prompt, written as whole sentences, and translate with them.
 * The window is teal rather than muted, which is `ExactAsk`'s vocabulary: teal is the exact ask.
 */
const PARTS = ['goal', 'example', 'limit', 'format', 'done'] as const

export function PromptParts() {
  const { t } = useTranslation('step1')
  const titleId = useId()

  return (
    <figure
      id="prompt-parts"
      data-component="PromptParts"
      aria-label={t('prompt-parts.description')}
      className="my-8 grid items-center sm:grid-cols-[9rem_1.5rem_minmax(0,1fr)]"
    >
      {/* the prompt as the step draws it everywhere else, at a size that leaves the parts room */}
      <svg
        id="prompt-parts-oval"
        data-component="PromptParts"
        viewBox="0 0 153 96"
        role="img"
        aria-labelledby={titleId}
        className="mx-auto h-auto w-36"
      >
        <title id={titleId} data-component="PromptParts">
          {t('prompt-parts.prompt')}
        </title>
        <ellipse
          id="prompt-parts-oval-shape"
          data-component="PromptParts"
          cx="77"
          cy="48"
          rx="74"
          ry="42"
          strokeWidth="2"
          className="fill-primary/20 stroke-primary/70"
        />
        <text
          id="prompt-parts-oval-label"
          data-component="PromptParts"
          x="77"
          y="48"
          fontSize="19"
          textAnchor="middle"
          dominantBaseline="middle"
          className="fill-foreground font-medium"
        >
          {t('prompt-parts.prompt')}
        </text>
      </svg>

      {/* the stem tying the parts to the oval: under it when stacked, beside it from `sm` */}
      <span
        id="prompt-parts-stem"
        data-component="PromptParts"
        aria-hidden="true"
        className="bg-primary/70 mx-auto h-4 w-0.5 sm:mx-0 sm:h-0.5 sm:w-full"
      />

      <ol
        id="prompt-parts-list"
        data-component="PromptParts"
        // `list-none` can cost a list its semantics, and the numbers are what the prose points at.
        role="list"
        className="border-primary/50 bg-primary/5 flex list-none flex-col gap-3 rounded-lg border p-4"
      >
        {PARTS.map((part, index) => (
          <li
            key={part}
            id={`prompt-parts-item-${index}`}
            data-component="PromptParts"
            className="flex items-start gap-3"
          >
            <span
              id={`prompt-parts-item-${index}-marker`}
              data-component="PromptParts"
              data-marker
              aria-hidden="true"
              className="mt-[0.15em] shrink-0"
            >
              {index + 1}
            </span>
            <span
              id={`prompt-parts-item-${index}-body`}
              data-component="PromptParts"
              className="flex min-w-0 flex-col gap-0.5"
            >
              <span
                id={`prompt-parts-item-${index}-label`}
                data-component="PromptParts"
                className="eyebrow text-primary"
              >
                {t(`prompt-parts.${part}.label`)}
              </span>
              <span
                id={`prompt-parts-item-${index}-text`}
                data-component="PromptParts"
                className="text-foreground font-mono text-sm leading-relaxed"
              >
                {t(`prompt-parts.${part}.text`)}
              </span>
            </span>
          </li>
        ))}
      </ol>
    </figure>
  )
}
