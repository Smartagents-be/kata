import { useId } from 'react'
import { localise, type Localised } from '@/shared/i18n/locale'
import { useLocale } from '@/shared/i18n/useLocale'

/**
 * The context window, drawn as one oval. Later units of this step fill it with the layers, so the
 * geometry lives here rather than in the unit HTML: adding a layer should be a change in one file,
 * not the same ellipse copied into nine pages and two languages.
 *
 * The `viewBox` is the coordinate system every later oval will be placed in. Keep it.
 */
const DESCRIPTION: Localised<string> = {
  en: 'One oval labelled context: everything the agent knows sits inside it.',
  nl: 'Eén ovaal met het label context: alles wat de agent weet, zit erin.',
}

export function ContextDiagram() {
  const { locale } = useLocale()
  const titleId = useId()

  return (
    <figure id="context-diagram" data-component="ContextDiagram" className="flex justify-center">
      <svg
        id="context-diagram-svg"
        data-component="ContextDiagram"
        viewBox="0 0 640 320"
        role="img"
        aria-labelledby={titleId}
        className="h-auto w-full max-w-xl"
      >
        {/* useId, not a BEM id: aria-labelledby has to be unique per instance, not per component. */}
        <title id={titleId} data-component="ContextDiagram">
          {localise(DESCRIPTION, locale)}
        </title>
        <ellipse
          id="context-diagram-window"
          data-component="ContextDiagram"
          cx="320"
          cy="160"
          rx="290"
          ry="140"
          strokeWidth="2"
          className="fill-primary/5 stroke-primary/40"
        />
        <text
          id="context-diagram-label"
          data-component="ContextDiagram"
          x="320"
          y="160"
          fontSize="28"
          textAnchor="middle"
          dominantBaseline="middle"
          className="fill-foreground font-medium"
        >
          context
        </text>
      </svg>
    </figure>
  )
}
