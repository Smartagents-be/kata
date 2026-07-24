import { Fragment, useMemo, type ReactNode } from 'react'
import { useStepText } from '@/shared/i18n/useStepText'
import { prepareUnit } from '@/shared/lib/content'
import { useMode } from '@/shared/mode/useMode'

export function StepContent({
  html,
  namespace,
  inlineFigures,
}: {
  /** The unit's prose, in English; its `data-i18n` keys carry the other languages. */
  html: string
  /** The step's i18next namespace, which is where those keys are looked up. */
  namespace: string
  /**
   * Drawings that belong *inside* the prose rather than under it, keyed by the `data-figure` value
   * of the empty div the unit's HTML leaves for them.
   */
  inlineFigures?: Record<string, ReactNode>
}) {
  const { mode } = useMode()
  const { lookup } = useStepText(namespace)
  // One article per run of prose, with the figures between them. Portals into the rendered HTML
  // would keep it to a single article, but React discards them: it owns the container's children
  // only until the next commit re-applies dangerouslySetInnerHTML.
  const segments = useMemo(
    () => prepareUnit(html, { mode, translate: lookup }),
    [html, mode, lookup],
  )

  // A unit whose prose is entirely for the other audience renders nothing at all, rather than an
  // empty article that would still take a gap in the page's column.
  if (segments.length === 0) {
    return null
  }

  return (
    <div id="step-content" data-component="StepContent">
      {segments.map((segment, index) =>
        segment.kind === 'figure' ? (
          <Fragment key={`figure-${index}`}>{inlineFigures?.[segment.name]}</Fragment>
        ) : (
          <article
            key={`html-${index}`}
            id={`step-content-part-${index}`}
            data-component="StepContent"
            // prose-code:before/after strip the literal backticks Typography adds around <code>.
            // Not prose-neutral: index.css points Typography's own variables at the theme tokens,
            // so the prose picks up the same faintly teal neutrals as everything around it.
            className="prose prose-code:before:content-none prose-code:after:content-none max-w-none"
            // Safe: first-party HTML from src/steps, already filtered by prepareUnit.
            dangerouslySetInnerHTML={{ __html: segment.html }}
          />
        ),
      )}
    </div>
  )
}
