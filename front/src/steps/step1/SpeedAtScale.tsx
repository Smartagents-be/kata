import { useId } from 'react'
import { useTranslation } from 'react-i18next'

/**
 * Where the speed difference between two tiers stops being a few seconds. Three counts of calls on
 * one axis, the small tier against the top tier, and a guide line at the couple of minutes past
 * which nobody sits and watches. The reading is the crossing, not the ratio: on one call both bars
 * are slivers, and on a hundred the small tier is still something you wait for while the top tier
 * has become a job you leave running.
 *
 * `model.speed.1` above it makes exactly that threshold claim and can price neither side of it in a
 * sentence, which is why the drawing is here and why it stops where the paragraph stops. Cost had a
 * table and speed had nothing.
 *
 * Two things follow the step's own vocabulary. A bar is something you have, so the tiers are bars
 * and the minute you give up watching is a guide line, the way `SessionWindows` draws the hour you
 * go home. And there is **no context frame**: the first one in the step is `ToolsInContext`, and
 * nothing about a wall clock belongs inside a window.
 *
 * The seconds are hand-authored, and the caption says so the way `NextToken`'s does. What they are
 * picked to hold is the prose: the small tier is three times quicker per call here, which is inside
 * the two-to-three-times gap `speed.1` states against the middle tier and safely under it against
 * the top one. Round numbers on purpose, so nobody reads them as a measurement.
 */
const SMALL_PER_CALL = 1
const TOP_PER_CALL = 3

/** One call, a handful, and the loop `speed.1` closes on. */
const COUNTS = [1, 10, 100] as const

/** Where you stop watching and go and do something else. Two minutes, in seconds. */
const WATCHING = 120

/** The axis runs a minute past the longest bar, so the 5m run has somewhere to end. */
const AXIS = 360

const X0 = 128
const SPAN = 400

const x = (seconds: number) => X0 + (seconds / AXIS) * SPAN

const BAR = 14
const GAP = 20
const TOPS = [46, 106, 166]

const TIERS = [
  { id: 'small', perCall: SMALL_PER_CALL, fill: 'fill-primary' },
  { id: 'top', perCall: TOP_PER_CALL, fill: 'fill-muted-foreground/40' },
] as const

/** Machine-shaped, like the model names in `ModelPricing`, so it is built here and not translated. */
function clock(seconds: number): string {
  if (seconds < 60) return `${seconds}s`

  const minutes = Math.floor(seconds / 60)
  const rest = seconds % 60

  return rest === 0 ? `${minutes}m` : `${minutes}m ${rest}s`
}

export function SpeedAtScale() {
  const { t } = useTranslation('step1')
  const titleId = useId()

  return (
    <figure
      id="speed-at-scale"
      data-component="SpeedAtScale"
      className="my-8 flex flex-col items-center gap-3"
    >
      <svg
        id="speed-at-scale-svg"
        data-component="SpeedAtScale"
        viewBox="0 0 640 240"
        role="img"
        aria-labelledby={titleId}
        className="h-auto w-full max-w-2xl"
      >
        <title id={titleId} data-component="SpeedAtScale">
          {t('speed-at-scale.description')}
        </title>

        {/* Two tones and nothing else to read them by, so the legend carries the whole key. */}
        <g id="speed-at-scale-legend" data-component="SpeedAtScale">
          {TIERS.map((tier, index) => (
            <g
              key={tier.id}
              id={`speed-at-scale-legend-${tier.id}`}
              data-component="SpeedAtScale"
            >
              <rect x={index * 150} y="12" width="18" height="8" rx="2" className={tier.fill} />
              <text
                x={index * 150 + 26}
                y="20"
                fontSize="12"
                className="fill-muted-foreground"
              >
                {t(`speed-at-scale.${tier.id}`)}
              </text>
            </g>
          ))}
        </g>

        {COUNTS.map((count, row) => (
          <g key={count} id={`speed-at-scale-row-${row}`} data-component="SpeedAtScale">
            <text
              id={`speed-at-scale-row-${row}-label`}
              data-component="SpeedAtScale"
              x={X0 - 12}
              y={TOPS[row] + 22}
              fontSize="13"
              textAnchor="end"
              className="fill-foreground"
            >
              {t(`speed-at-scale.calls.${count}`)}
            </text>

            {TIERS.map((tier, index) => (
              // Floored so one call is a sliver rather than nothing. A bar you cannot see is the
              // wrong reading of "a few seconds and you will not care".
              <rect
                key={tier.id}
                id={`speed-at-scale-row-${row}-${tier.id}`}
                data-component="SpeedAtScale"
                x={X0}
                y={TOPS[row] + index * GAP}
                width={Math.max(x(tier.perCall * count) - X0, 3)}
                height={BAR}
                rx="3"
                className={tier.fill}
              />
            ))}
          </g>
        ))}

        {/* Over the bars, because which side of it a bar ends on is the whole reading and a guide
            behind a bar only lines up where nothing is happening. Under the numbers, because the
            small tier's hundred-call reading lands within a few pixels of it and a hairline through
            a figure is the one place it stops being a hairline. */}
        <line
          id="speed-at-scale-guide"
          data-component="SpeedAtScale"
          x1={x(WATCHING)}
          y1="34"
          x2={x(WATCHING)}
          y2="206"
          strokeWidth="1"
          className="stroke-border"
        />
        <text
          id="speed-at-scale-guide-label"
          data-component="SpeedAtScale"
          x={x(WATCHING)}
          y="224"
          fontSize="12"
          textAnchor="middle"
          className="fill-muted-foreground"
        >
          {t('speed-at-scale.guide')}
        </text>

        {COUNTS.map((count, row) =>
          TIERS.map((tier, index) => {
            const seconds = tier.perCall * count

            return (
              <text
                key={`${count}-${tier.id}`}
                id={`speed-at-scale-row-${row}-${tier.id}-clock`}
                data-component="SpeedAtScale"
                x={Math.max(x(seconds), X0 + 3) + 8}
                y={TOPS[row] + index * GAP + 11}
                fontSize="11"
                className="fill-muted-foreground font-mono"
              >
                {clock(seconds)}
              </text>
            )
          }),
        )}
      </svg>

      <figcaption
        id="speed-at-scale-caption"
        data-component="SpeedAtScale"
        className="text-muted-foreground w-full max-w-2xl text-xs"
      >
        {t('speed-at-scale.caption')}
      </figcaption>
    </figure>
  )
}
