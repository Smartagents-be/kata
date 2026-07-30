import { useId } from 'react'
import { useTranslation } from 'react-i18next'

/**
 * The same request, run three times, drawn twice. The top row is the agent working the steps out
 * from prose, so the three results come out different. The bottom row is a script, so they come out
 * identical. That equality is the whole figure, and it is what the `Scripts` section of `patterns`
 * claims in words: same input, same output, no interpretation in between.
 *
 * It sits at the `data-figure="script-runs"` slot under that section, and **nothing after it reads
 * the drawing**, so its own labels carry the argument. Only the second row is named: the first is
 * what you already have, so a label over it says "prose" twice, once in the row above the paragraph
 * and once in the drawing. What each row produces is on the right of it, and that pair is the
 * figure: different every time against the same every time.
 *
 * **This figure is about variance across runs, and never about the clock or about step size.**
 * `LoopsPerHour` in `enablement` already owns how many turns fit in an hour and `IterationPaths` in
 * `evolution` owns few-long against many-short. Draw a run here as time spent and this becomes one
 * of those a second time. The three cards are the same width in both rows for exactly that reason:
 * what changes between the rows is the content, not the size.
 *
 * The teal is the step's rule, what the shape adds. A prose run is muted because it is what you
 * already have, a script run is teal because it is what the section is arguing for.
 */
const X0 = 1
const CARD_W = 200
const CARD_H = 68
const GAP = 19

/** Widest a bar can be: the card less its padding on both sides. */
const PAD = 14

/** Three runs off the same prose, each worked out again and each landing somewhere else. */
const PROSE: number[][] = [
  [34, 96, 128],
  [112, 150, 84],
  [162, 70, 134],
]

/** Three runs of one script. One set of widths, drawn three times, which is the argument. */
const SCRIPT_RUN = [140, 104, 132]
const SCRIPT: number[][] = [SCRIPT_RUN, SCRIPT_RUN, SCRIPT_RUN]

/** One run: a card with what came out of it drawn as bars. */
function Run({
  block,
  index,
  bars,
  y,
  fill,
}: {
  block: string
  index: number
  bars: number[]
  y: number
  fill: string
}) {
  const x = X0 + index * (CARD_W + GAP)

  return (
    <g id={`script-runs-${block}-run-${index}`} data-component="Run">
      <rect
        id={`script-runs-${block}-run-${index}-card`}
        data-component="Run"
        x={x}
        y={y}
        width={CARD_W}
        height={CARD_H}
        strokeWidth="1"
        className="fill-none stroke-border"
      />
      {bars.map((width, barIndex) => (
        <rect
          key={barIndex}
          id={`script-runs-${block}-run-${index}-bar-${barIndex}`}
          data-component="Run"
          x={x + PAD}
          y={y + 12 + barIndex * 18}
          width={width}
          height={10}
          className={fill}
        />
      ))}
    </g>
  )
}

export function ScriptRuns() {
  const { t } = useTranslation('step2')
  const titleId = useId()

  const rowWidth = 3 * CARD_W + 2 * GAP

  return (
    <figure id="script-runs" data-component="ScriptRuns" className="my-8 flex justify-center">
      <svg
        id="script-runs-svg"
        data-component="ScriptRuns"
        viewBox="0 0 640 220"
        role="img"
        aria-labelledby={titleId}
        className="h-auto w-full"
      >
        {/* useId, not a BEM id: aria-labelledby has to be unique per instance, not per component. */}
        <title id={titleId} data-component="ScriptRuns">
          {t('script-runs.description')}
        </title>

        <text
          id="script-runs-prose-note"
          data-component="ScriptRuns"
          x={X0 + rowWidth}
          y="20"
          fontSize="13"
          textAnchor="end"
          className="fill-muted-foreground"
        >
          {t('script-runs.prose-note')}
        </text>
        {PROSE.map((bars, index) => (
          <Run
            key={index}
            block="prose"
            index={index}
            bars={bars}
            y={30}
            fill="fill-muted-foreground/45"
          />
        ))}

        <text
          id="script-runs-script-label"
          data-component="ScriptRuns"
          x={X0}
          y="134"
          fontSize="14"
          className="fill-foreground font-medium"
        >
          {t('script-runs.script')}
        </text>
        <text
          id="script-runs-script-note"
          data-component="ScriptRuns"
          x={X0 + rowWidth}
          y="134"
          fontSize="13"
          textAnchor="end"
          className="fill-muted-foreground"
        >
          {t('script-runs.script-note')}
        </text>
        {SCRIPT.map((bars, index) => (
          <Run key={index} block="script" index={index} bars={bars} y={144} fill="fill-primary" />
        ))}
      </svg>
    </figure>
  )
}
