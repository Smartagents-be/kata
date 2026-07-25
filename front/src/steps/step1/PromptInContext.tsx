import { useId } from 'react'
import { useTranslation } from 'react-i18next'

/**
 * The same context oval as the ContextDiagram, but with the prompt drawn as one small region inside
 * it. This is the point the `prompt` unit opens on: the message you type is the smallest layer, a
 * subsection of the context rather than the whole of it. The geometry (viewBox, ellipse, label) is
 * kept in step with ContextDiagram so the two read as the same window; only the inner prompt shape
 * is new.
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
        viewBox="0 0 640 320"
        role="img"
        aria-labelledby={titleId}
        className="h-auto w-full max-w-xl"
      >
        {/* useId, not a BEM id: aria-labelledby has to be unique per instance, not per component. */}
        <title id={titleId} data-component="PromptInContext">
          {t('prompt-in-context.description')}
        </title>

        {/* the context window: the same teal oval as the ContextDiagram */}
        <ellipse
          id="prompt-in-context-window"
          data-component="PromptInContext"
          cx="320"
          cy="160"
          rx="290"
          ry="140"
          strokeWidth="2"
          className="fill-primary/5 stroke-primary/40"
        />
        <text
          id="prompt-in-context-window-label"
          data-component="PromptInContext"
          x="320"
          y="70"
          fontSize="28"
          textAnchor="middle"
          dominantBaseline="middle"
          className="fill-foreground font-medium"
        >
          {t('prompt-in-context.context')}
        </text>

        {/* the prompt: one small subsection sitting inside the context, drawn as a smaller oval so
            it reads as the same shape as the window it sits in */}
        <ellipse
          id="prompt-in-context-prompt"
          data-component="PromptInContext"
          cx="320"
          cy="185"
          rx="95"
          ry="48"
          strokeWidth="2"
          className="fill-primary/15 stroke-primary/60"
        />
        <text
          id="prompt-in-context-prompt-label"
          data-component="PromptInContext"
          x="320"
          y="185"
          fontSize="22"
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
