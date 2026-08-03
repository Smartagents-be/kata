import { useId } from 'react'
import { useTranslation } from 'react-i18next'

/**
 * Decomposition: the ask on the left, drawn as one thin bar over the space it does not fill, and on
 * the right the three parts it cuts into, each with its own prompt and the question writing that
 * prompt forced into the open. The three questions are `harness.decomposition.1`'s own three, so the
 * figure and the paragraph name the same gaps; changing one means changing the other.
 *
 * It carries no context frame, unlike the other three pattern diagrams, and that is the argument.
 * Nothing has been handed to anybody yet: this is the task being cut up, not the windows it ends up
 * in. What it does share is the vocabulary, a bar is something you have and dashes are what you do
 * not, so the dashed space on the left becomes three answered bars and three open questions on the
 * right.
 */
export function UnderSpecified() {
  const { t } = useTranslation('step1')
  const titleId = useId()
  const arrowId = `under-specified-arrow-${useId().replace(/:/g, '')}`

  // The three parts: the y of the card, the width of its prompt bar. Widths differ so the column
  // reads as three prompts rather than one repeated shape.
  const parts = [
    { y: 44, width: 236 },
    { y: 112, width: 196 },
    { y: 180, width: 216 },
  ]

  return (
    <figure id="under-specified" data-component="UnderSpecified" className="my-8 flex justify-center">
      <svg
        id="under-specified-svg"
        data-component="UnderSpecified"
        viewBox="0 0 640 300"
        role="img"
        aria-labelledby={titleId}
        className="h-auto w-full max-w-xl"
      >
        <title id={titleId} data-component="UnderSpecified">
          {t('under-specified.description')}
        </title>

        <defs>
          <marker
            id={arrowId}
            viewBox="0 0 10 10"
            refX="8"
            refY="5"
            markerWidth="6"
            markerHeight="6"
            orient="auto-start-reverse"
          >
            <path d="M 0 0 L 10 5 L 0 10 z" className="fill-primary/50" />
          </marker>
        </defs>

        {/* the ask: what was actually said, and it is one bar */}
        <text
          id="under-specified-ask-label"
          data-component="UnderSpecified"
          x="12"
          y="32"
          fontSize="15"
          className="fill-muted-foreground"
        >
          {t('under-specified.ask')}
        </text>
        <text
          id="under-specified-request"
          data-component="UnderSpecified"
          x="12"
          y="62"
          fontSize="17"
          className="fill-foreground font-medium"
        >
          {t('under-specified.request')}
        </text>
        <rect
          id="under-specified-request-bar"
          data-component="UnderSpecified"
          x="12"
          y="76"
          width="170"
          height="12"
          rx="6"
          className="fill-primary/50"
        />

        {/* and the room under it that nobody filled in */}
        <rect
          id="under-specified-unsaid"
          data-component="UnderSpecified"
          x="12"
          y="104"
          width="260"
          height="130"
          rx="12"
          fill="none"
          strokeWidth="1.5"
          strokeDasharray="5 5"
          className="stroke-primary/30"
        />
        <text
          id="under-specified-unsaid-label"
          data-component="UnderSpecified"
          x="142"
          y="169"
          fontSize="14"
          textAnchor="middle"
          dominantBaseline="middle"
          className="fill-muted-foreground"
        >
          {t('under-specified.unsaid')}
        </text>

        <path
          id="under-specified-cut"
          data-component="UnderSpecified"
          d="M 282 139 L 344 139"
          fill="none"
          strokeWidth="2"
          markerEnd={`url(#${arrowId})`}
          className="stroke-primary/50"
        />
        <text
          id="under-specified-cut-label"
          data-component="UnderSpecified"
          x="313"
          y="126"
          fontSize="13"
          textAnchor="middle"
          className="fill-muted-foreground"
        >
          {t('under-specified.cut')}
        </text>

        {/* the parts: a prompt that says what the part does, and the decision it took to write it */}
        <text
          id="under-specified-parts-label"
          data-component="UnderSpecified"
          x="352"
          y="32"
          fontSize="15"
          className="fill-muted-foreground"
        >
          {t('under-specified.parts')}
        </text>
        {parts.map((part, index) => (
          <g key={part.y}>
            <rect
              id={`under-specified-part-${index}`}
              data-component="UnderSpecified"
              x="352"
              y={part.y}
              width="276"
              height="54"
              rx="12"
              strokeWidth="1.5"
              className="fill-card stroke-primary/30"
            />
            <rect
              id={`under-specified-part-${index}-prompt`}
              data-component="UnderSpecified"
              x="372"
              y={part.y + 16}
              width={part.width}
              height="10"
              rx="5"
              className="fill-primary/50"
            />
            <text
              id={`under-specified-part-${index}-question`}
              data-component="UnderSpecified"
              x="372"
              y={part.y + 44}
              fontSize="13"
              className="fill-muted-foreground"
            >
              {t(`under-specified.question-${index}`)}
            </text>
          </g>
        ))}

        <text
          id="under-specified-caption"
          data-component="UnderSpecified"
          x="320"
          y="276"
          fontSize="15"
          textAnchor="middle"
          className="fill-muted-foreground"
        >
          {t('under-specified.caption')}
        </text>
      </svg>
    </figure>
  )
}
