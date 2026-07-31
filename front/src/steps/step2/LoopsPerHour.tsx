import { useId } from 'react'
import { useTranslation } from 'react-i18next'

/**
 * One hour, drawn twice, with the turns that fit in it. The slow band gets through two and starts a
 * third; the fast band gets through eleven. Each turn is cut the same way, into the change you make,
 * the waiting the loop costs you and the look you take at the result, so what separates the two
 * bands is the middle segment and nothing else.
 *
 * It closes the `run-own-machine` section of the `enablement` unit, at the
 * `data-figure="loops-per-hour"` slot, the way the `FlowDiagram`s close their sections in
 * `workflows`. It sat under `reachable-one-step` first, and moved when that section was cut: the
 * hinge paragraph of `run-own-machine` is the one that states the gap between changing something and
 * finding out, and this figure is that gap measured. **The two band labels name running it locally
 * and nothing else.** They read "Deploying to find out" against "With the shortcuts in" while the
 * figure sat under the deploy argument, and were rewritten with the move, because a band labelled
 * for prose that is no longer in the unit is the failure to watch for here.
 *
 * **This figure is on the clock, and never on step size.** `IterationPaths` in `evolution` already
 * owns few-long against many-short, measured as distance to a target. This one measures an hour and
 * counts turns. Redrawing either in the other's vocabulary collapses two arguments into one, and the
 * step then says the same thing twice in different units.
 *
 * Three things about how it is drawn are decisions rather than styling.
 *
 * **The waiting is drawn as nothing at all.** A turn is a box, the work in it is solid, and the wait
 * is the empty part of the box. So the slow band reads as two mostly empty rooms and the fast band
 * as eleven full ones, which is the argument without a single extra tone. It was drawn with a pale
 * fill on the wait first, and that spent six greys and teals on a figure that needs three.
 *
 * **Both bands take the same fills**, and that is what makes the sentence above true. The slow band
 * was grey and the fast one teal, which read as the bands being two different kinds of thing when
 * the whole claim is that they are one hour spent two ways. It also made the legend a lie for one
 * band, since the swatches can only be drawn in one palette. So `FILL` is the only palette, a part
 * is the same colour wherever it appears, and the emptiness is left to carry the difference. Give
 * either band a hue of its own and the figure starts arguing two things at once.
 *
 * **The band runs the full width of the viewBox** (`BAND_X` at 1, `BAND_W` at 638), so its edges land
 * on the prose column's edges and the svg carries no `max-w`. Inset, it read as a narrower picture
 * sitting inside the text rather than as a measure of the column it is in. Both bands are pinned to
 * `BAND_W` because the hour is the same hour, and that equality is the whole drawing.
 */
const BAND_X = 1
const BAND_W = 638
const BAND_H = 36

type Part = 'change' | 'wait' | 'look'
type Segment = { part: Part; w: number }

/** A slow turn: the waiting is almost all of it. Two of these fit, and a third is left hanging. */
const SLOW_TURN: Segment[] = [
  { part: 'change', w: 30 },
  { part: 'wait', w: 218 },
  { part: 'look', w: 32 },
]

/** A fast turn, with the same three parts and the waiting cut down to the size of the other two. */
const FAST_TURN: Segment[] = [
  { part: 'change', w: 18 },
  { part: 'wait', w: 18 },
  { part: 'look', w: 22 },
]

/** Two whole turns and the start of a third, which is what an hour buys when every loop waits. */
const SLOW: Segment[][] = [
  SLOW_TURN,
  SLOW_TURN,
  [
    { part: 'change', w: 30 },
    { part: 'wait', w: 48 },
  ],
]

/** Eleven whole turns, filling the same band exactly. */
const FAST: Segment[][] = Array.from({ length: 11 }, () => FAST_TURN)

/**
 * Two tones and an absence, and **both bands take them**. A part is the same colour wherever it
 * appears, so the drawing says one thing about the parts and one thing about the bands rather than
 * mixing the two claims into one palette. The wait carries no fill, because it is the part where
 * nothing happens.
 */
const FILL: Record<Part, string> = {
  change: 'fill-primary',
  wait: 'fill-none',
  look: 'fill-primary/50',
}

/**
 * One band, cut into turns and each turn into its three parts. A turn is closed off by a hairline of
 * its own, because the count is what the figure argues and loose fills do not read as a turn.
 */
function Band({ block, turns, y }: { block: string; turns: Segment[][]; y: number }) {
  let x = BAND_X

  return (
    <g id={`loops-per-hour-${block}-band`} data-component="Band">
      {turns.map((turn, turnIndex) => {
        const turnLeft = x
        const turnWidth = turn.reduce((total, segment) => total + segment.w, 0)
        x += turnWidth

        let inner = turnLeft

        return (
          <g key={turnIndex} id={`loops-per-hour-${block}-turn-${turnIndex}`} data-component="Band">
            {turn.map((segment, index) => {
              const left = inner
              inner += segment.w

              return (
                <rect
                  key={index}
                  id={`loops-per-hour-${block}-turn-${turnIndex}-segment-${index}`}
                  data-component="Band"
                  data-state={segment.part}
                  x={left}
                  y={y}
                  width={segment.w}
                  height={BAND_H}
                  className={FILL[segment.part]}
                />
              )
            })}
            {/* Where this turn ends and the next begins. The first needs none: the band's own
                outline is already standing there. */}
            {turnIndex > 0 && (
              <line
                id={`loops-per-hour-${block}-turn-${turnIndex}-divider`}
                data-component="Band"
                x1={turnLeft}
                y1={y}
                x2={turnLeft}
                y2={y + BAND_H}
                strokeWidth="1"
                className="stroke-border"
              />
            )}
          </g>
        )
      })}

      {/* The band's own outline, over the fills, so the hour reads as one box either way. */}
      <rect
        id={`loops-per-hour-${block}-outline`}
        data-component="Band"
        x={BAND_X}
        y={y}
        width={BAND_W}
        height={BAND_H}
        strokeWidth="1"
        className="fill-none stroke-border"
      />
    </g>
  )
}

export function LoopsPerHour() {
  const { t } = useTranslation('step2')
  const titleId = useId()

  // Laid out at measured offsets rather than on an even pitch: the longest label is the middle one
  // in both languages, and an even pitch runs it into the swatch after it in Dutch.
  const legend: { part: Part; x: number }[] = [
    { part: 'change', x: 0 },
    { part: 'wait', x: 230 },
    { part: 'look', x: 460 },
  ]

  return (
    <figure id="loops-per-hour" data-component="LoopsPerHour" className="my-8 flex justify-center">
      <svg
        id="loops-per-hour-svg"
        data-component="LoopsPerHour"
        viewBox="0 0 640 250"
        role="img"
        aria-labelledby={titleId}
        className="h-auto w-full"
      >
        <title id={titleId} data-component="LoopsPerHour">
          {t('loops-per-hour.description')}
        </title>

        {/* The hour itself, bracketed once over both bands, because it is the same hour. */}
        <text
          id="loops-per-hour-hour-label"
          data-component="LoopsPerHour"
          x="320"
          y="16"
          fontSize="13"
          textAnchor="middle"
          className="fill-muted-foreground"
        >
          {t('loops-per-hour.hour')}
        </text>
        <path
          id="loops-per-hour-hour-bracket"
          data-component="LoopsPerHour"
          d={`M${BAND_X} 26 v8 M${BAND_X} 30 H${BAND_X + BAND_W} M${BAND_X + BAND_W} 26 v8`}
          strokeWidth="1"
          className="fill-none stroke-border"
        />

        <text
          id="loops-per-hour-slow-label"
          data-component="LoopsPerHour"
          x={BAND_X}
          y="62"
          fontSize="14"
          className="fill-foreground font-medium"
        >
          {t('loops-per-hour.slow')}
        </text>
        <text
          id="loops-per-hour-slow-count"
          data-component="LoopsPerHour"
          x={BAND_X + BAND_W}
          y="62"
          fontSize="13"
          textAnchor="end"
          className="fill-muted-foreground"
        >
          {t('loops-per-hour.turns', { turns: 2 })}
        </text>
        <Band block="slow" turns={SLOW} y={72} />

        <text
          id="loops-per-hour-fast-label"
          data-component="LoopsPerHour"
          x={BAND_X}
          y="142"
          fontSize="14"
          className="fill-foreground font-medium"
        >
          {t('loops-per-hour.fast')}
        </text>
        <text
          id="loops-per-hour-fast-count"
          data-component="LoopsPerHour"
          x={BAND_X + BAND_W}
          y="142"
          fontSize="13"
          textAnchor="end"
          className="fill-muted-foreground"
        >
          {t('loops-per-hour.turns', { turns: 11 })}
        </text>
        <Band block="fast" turns={FAST} y={152} />

        {/* What the three parts of a turn are, named once, since both bands are cut the same way.
            The wait swatch is an empty box on purpose: that is exactly how it is drawn above. */}
        <g id="loops-per-hour-legend" data-component="LoopsPerHour">
          {legend.map(({ part, x }, index) => (
            <g key={part} id={`loops-per-hour-legend-${index}`} data-component="LoopsPerHour">
              <rect
                id={`loops-per-hour-legend-${index}-swatch`}
                data-component="LoopsPerHour"
                x={BAND_X + x}
                y="216"
                width="14"
                height="14"
                strokeWidth="1"
                className={`${FILL[part]} stroke-border`}
              />
              <text
                id={`loops-per-hour-legend-${index}-label`}
                data-component="LoopsPerHour"
                x={BAND_X + x + 22}
                y="228"
                fontSize="13"
                className="fill-muted-foreground"
              >
                {t(`loops-per-hour.${part}`)}
              </text>
            </g>
          ))}
        </g>
      </svg>
    </figure>
  )
}
