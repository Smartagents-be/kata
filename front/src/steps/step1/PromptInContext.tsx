import { useId } from 'react'
import { useTranslation } from 'react-i18next'

/**
 * The prompt on its own: one oval, the thing you type, and nothing drawn around it.
 *
 * **It used to sit inside the context frame and deliberately does not any more.** `prompt` runs
 * ahead of `context`, so a student meets this figure before they have met the window, and a frame
 * here spent that vocabulary a unit early and made `ContextDiagram` a second telling of a picture
 * they had already seen. What is left says one thing: this is a shape, and it is small. The frame
 * arrives in `ToolsInContext`, and the populated window is `ContextDiagram`'s payoff.
 *
 * The oval keeps `ContextDiagram`'s prompt geometry (rx/ry, fills) so the two read as the same
 * thing seen twice. Do not draw the other layers in here: naming them is `context`'s job.
 */
export function PromptInContext() {
  const { t } = useTranslation('step1')
  const titleId = useId()

  return (
    <figure
      id="prompt-in-context"
      data-component="PromptInContext"
      className="my-8 flex justify-center"
    >
      <svg
        id="prompt-in-context-svg"
        data-component="PromptInContext"
        viewBox="0 0 320 128"
        role="img"
        aria-labelledby={titleId}
        className="h-auto w-full max-w-xs"
      >
        <title id={titleId} data-component="PromptInContext">
          {t('prompt-in-context.description')}
        </title>

        {/* the prompt, and nothing else. Same radii and fills as the region ContextDiagram draws
            for it, so a student meets one shape twice rather than two drawings. */}
        <ellipse
          id="prompt-in-context-prompt"
          data-component="PromptInContext"
          cx="160"
          cy="64"
          rx="74"
          ry="42"
          strokeWidth="2"
          className="fill-primary/20 stroke-primary/70"
        />
        <text
          id="prompt-in-context-prompt-label"
          data-component="PromptInContext"
          x="160"
          y="64"
          fontSize="19"
          textAnchor="middle"
          dominantBaseline="middle"
          className="fill-foreground font-medium"
        >
          {t('prompt-in-context.prompt')}
        </text>
      </svg>
    </figure>
  )
}
