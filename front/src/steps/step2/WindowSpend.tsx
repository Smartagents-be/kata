import { useId } from 'react'
import { useTranslation } from 'react-i18next'

/**
 * Illustrative use of a subscription allowance period, not context occupancy or a dollar bill.
 * Heights are invented usage amounts. Prepared useful work can use remaining allowance when
 * budget and other limits permit; filling the allowance is not a goal. Keep that caption visible
 * in guided mode and in the deck. Spend is height, distinct from LoopsPerHour's time bands.
 */
const BASE = 196
const CEILING = 44
const COL_W = 45
const COL_GAP = 8
const X0 = 1

/** Ten ordinary sessions, then the two that fill what is left. Hand-authored, like `NextToken`'s. */
const ORDINARY = [34, 52, 28, 61, 44, 30, 55, 38, 47, 33]
const FILLED = 2

export function WindowSpend() {
  const { t } = useTranslation('step2')
  const titleId = useId()

  const columns = ORDINARY.length + FILLED
  const width = columns * COL_W + (columns - 1) * COL_GAP

  return (
    <figure id="window-spend" data-component="WindowSpend" className="my-8 flex flex-col items-center gap-3">
      <svg
        id="window-spend-svg"
        data-component="WindowSpend"
        viewBox="0 0 640 228"
        role="img"
        aria-labelledby={titleId}
        className="h-auto w-full"
      >
        <title id={titleId} data-component="WindowSpend">
          {t('window-spend.description')}
        </title>

        {/* What the window holds, as a line the two filled columns reach and the rest do not. */}
        <line
          id="window-spend-ceiling"
          data-component="WindowSpend"
          x1={X0}
          y1={CEILING}
          x2={X0 + width}
          y2={CEILING}
          strokeWidth="1.5"
          strokeDasharray="6 5"
          className="stroke-primary/60"
        />
        <text
          id="window-spend-ceiling-label"
          data-component="WindowSpend"
          x={X0 + width}
          y={CEILING - 10}
          fontSize="13"
          textAnchor="end"
          className="fill-muted-foreground"
        >
          {t('window-spend.ceiling')}
        </text>

        {/* The gap between the ordinary columns and the ceiling. Nothing is drawn in it, which is
            the point: it is not saved and it is not carried, so it is left as air with a name. */}
        <text
          id="window-spend-unused"
          data-component="WindowSpend"
          x={X0 + 130}
          y="104"
          fontSize="13"
          className="fill-muted-foreground"
        >
          {t('window-spend.unused')}
        </text>

        {ORDINARY.map((height, index) => (
          <rect
            key={index}
            id={`window-spend-ordinary-${index}`}
            data-component="WindowSpend"
            x={X0 + index * (COL_W + COL_GAP)}
            y={BASE - height}
            width={COL_W}
            height={height}
            className="fill-muted-foreground/30"
          />
        ))}

        {Array.from({ length: FILLED }, (_, index) => (
          <rect
            key={index}
            id={`window-spend-filled-${index}`}
            data-component="WindowSpend"
            x={X0 + (ORDINARY.length + index) * (COL_W + COL_GAP)}
            y={CEILING}
            width={COL_W}
            height={BASE - CEILING}
            className="fill-primary"
          />
        ))}

        <line
          id="window-spend-base"
          data-component="WindowSpend"
          x1={X0}
          y1={BASE}
          x2={X0 + width}
          y2={BASE}
          strokeWidth="1"
          className="stroke-border"
        />

        <text
          id="window-spend-window-label"
          data-component="WindowSpend"
          x={X0}
          y={BASE + 22}
          fontSize="13"
          className="fill-muted-foreground"
        >
          {t('window-spend.window')}
        </text>
        <text
          id="window-spend-spend-label"
          data-component="WindowSpend"
          x={X0 + width}
          y={BASE + 22}
          fontSize="13"
          textAnchor="end"
          className="fill-foreground font-medium"
        >
          {t('window-spend.spend')}
        </text>
      </svg>
      <figcaption
        id="window-spend-caption"
        data-component="WindowSpend"
        className="text-muted-foreground max-w-[62ch] text-center text-sm leading-relaxed"
      >
        {t('window-spend.caption')}
      </figcaption>
    </figure>
  )
}
