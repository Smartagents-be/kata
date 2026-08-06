import { useId } from 'react'
import { useTranslation } from 'react-i18next'

/**
 * The same afternoon cut twice. Both rows hold one session of equal length, filled left to right
 * with turns and banded into the same three tasks at the same widths, so the only thing that differs
 * on screen is where the vertical rule falls. Compaction puts it wherever the window happened to
 * fill, which here is halfway through the middle task; a clear puts it on the boundary the student
 * chose. Roughly the same amount is lost either way, and that is the point: what the seam decides is
 * whether a task survives whole.
 *
 * It borrows `ContextFalloff`'s frame stroke and fill rather than inventing one, and it joins the
 * step's diagram vocabulary: a teal frame is a context, a bar is something in it, dashes are what is
 * not. The proportions and the axis are its own, which is why the top row carries `seam.window`: a
 * reader meets the vertical window of `ContextFalloff` one unit earlier, and nothing else on the
 * drawing says these frames run in time. What crosses the rule is drawn at the left of each frame,
 * because that is where the next session starts reading.
 *
 * Deliberately silent about cost. `harness.caching` prices a rebuilt window and `BundleCompare`
 * draws the re-send, so no coin, no price and no arrow back to the model belong in here.
 */

type Tone = 'dashed' | 'solid' | 'muted'

type Crossing = {
  /** Message key in the step1 namespace. */
  key: string
  tone: Tone
}

type Row = {
  /** Suffix for every id in the row. */
  id: string
  /** How far down the drawing this row starts. */
  offset: number
  label: string
  /** Where the seam falls, in the same x space the turns are laid out in. */
  rule: number
  ruleLabel: string
  /** What the next session opens with, stacked at the left of the frame. */
  crossing: Crossing[]
}

/** The three tasks, banded across the frame. Real work from this repository, in the order it ran. */
const SPANS = [
  { x: 20, width: 180, key: 'seam.task-0' },
  { x: 206, width: 224, key: 'seam.task-1' },
  { x: 436, width: 184, key: 'seam.task-2' },
]

/** Every turn in the session, at its x. Which of them survive is decided by the rule, per row. */
const TURNS = [26, 60, 94, 128, 162, 212, 246, 280, 314, 348, 382, 442, 476, 510, 544, 578]

/**
 * Compaction's rule lands inside the middle span; the clear's lands on the boundary after it. The
 * two are within a hundred pixels of each other on purpose, so the rows lose comparable amounts and
 * the position is the only argument left.
 */
const ROWS: Row[] = [
  {
    id: 'compaction',
    offset: 0,
    label: 'seam.compaction',
    rule: 336,
    ruleLabel: 'seam.filled',
    crossing: [{ key: 'seam.summary', tone: 'dashed' }],
  },
  {
    id: 'clear',
    offset: 176,
    label: 'seam.clear',
    rule: 433,
    ruleLabel: 'seam.chose',
    crossing: [
      { key: 'seam.sentence', tone: 'solid' },
      { key: 'seam.disk', tone: 'muted' },
    ],
  },
]

/** The two bar lines inside a frame. Turns run along the first; a second crossing item takes the second. */
const LINES = [56, 84]

const BAR = 16
const CROSSING_X = 24
const CROSSING_WIDTH = 28

export function WhereTheSeamFalls() {
  const { t } = useTranslation('step1')
  const titleId = useId()

  return (
    <figure
      id="where-the-seam-falls"
      data-component="WhereTheSeamFalls"
      className="my-8 flex justify-center"
    >
      <svg
        id="where-the-seam-falls-svg"
        data-component="WhereTheSeamFalls"
        viewBox="0 0 640 336"
        role="img"
        aria-labelledby={titleId}
        className="h-auto w-full max-w-xl"
      >
        <title id={titleId} data-component="WhereTheSeamFalls">
          {t('seam.description')}
        </title>

        {ROWS.map((row) => (
          <g key={row.id} data-component="WhereTheSeamFalls">
            <text
              id={`where-the-seam-falls-${row.id}-label`}
              data-component="WhereTheSeamFalls"
              x="12"
              y={row.offset + 22}
              fontSize="15"
              className="fill-foreground font-medium"
            >
              {t(row.label)}
            </text>

            {/* the window, on ContextFalloff's own outline */}
            <rect
              id={`where-the-seam-falls-${row.id}-frame`}
              data-component="WhereTheSeamFalls"
              x="12"
              y={row.offset + 36}
              width="616"
              height="84"
              rx="14"
              strokeWidth="2"
              className="fill-primary/5 stroke-primary/40"
            />

            {/* the three tasks, banded at the same widths in both rows */}
            {SPANS.map((span, index) => (
              <g key={span.key} data-component="WhereTheSeamFalls">
                <rect
                  id={`where-the-seam-falls-${row.id}-span-${index}`}
                  data-component="WhereTheSeamFalls"
                  x={span.x}
                  y={row.offset + 42}
                  width={span.width}
                  height="72"
                  rx="8"
                  className="fill-muted-foreground/10"
                />
                <text
                  id={`where-the-seam-falls-${row.id}-span-${index}-label`}
                  data-component="WhereTheSeamFalls"
                  x={span.x + span.width / 2}
                  y={row.offset + 140}
                  fontSize="13"
                  textAnchor="middle"
                  className="fill-muted-foreground"
                >
                  {t(span.key)}
                </text>
              </g>
            ))}

            {/* the turns that were still in front of the seam when it fell */}
            {TURNS.filter((x) => x > row.rule).map((x) => (
              <rect
                key={x}
                id={`where-the-seam-falls-${row.id}-turn-${x}`}
                data-component="WhereTheSeamFalls"
                x={x}
                y={row.offset + LINES[0]}
                width="28"
                height={BAR}
                rx="5"
                className="fill-primary/45"
              />
            ))}

            {/* and what the next session opens with instead of everything behind it */}
            {row.crossing.map((item, index) => (
              <g key={item.key} data-component="WhereTheSeamFalls">
                <rect
                  id={`where-the-seam-falls-${row.id}-carried-${index}`}
                  data-component="WhereTheSeamFalls"
                  data-state={item.tone}
                  x={CROSSING_X}
                  y={row.offset + LINES[index]}
                  width={CROSSING_WIDTH}
                  height={BAR}
                  rx="5"
                  fill={item.tone === 'dashed' ? 'none' : undefined}
                  strokeWidth={item.tone === 'dashed' ? 1.5 : undefined}
                  strokeDasharray={item.tone === 'dashed' ? '4 4' : undefined}
                  className={
                    item.tone === 'dashed'
                      ? 'stroke-primary/60'
                      : item.tone === 'solid'
                        ? 'fill-primary'
                        : 'fill-muted-foreground/40'
                  }
                />
                <text
                  id={`where-the-seam-falls-${row.id}-carried-${index}-label`}
                  data-component="WhereTheSeamFalls"
                  x={CROSSING_X + CROSSING_WIDTH + 10}
                  y={row.offset + LINES[index] + 12}
                  fontSize="13"
                  className="fill-muted-foreground"
                >
                  {t(item.key)}
                </text>
              </g>
            ))}

            {/* the seam itself, drawn past the frame at both ends so it reads as a mark and not a bar */}
            <line
              id={`where-the-seam-falls-${row.id}-rule`}
              data-component="WhereTheSeamFalls"
              x1={row.rule}
              y1={row.offset + 28}
              x2={row.rule}
              y2={row.offset + 128}
              strokeWidth="1.5"
              className="stroke-muted-foreground/70"
            />
            <text
              id={`where-the-seam-falls-${row.id}-rule-label`}
              data-component="WhereTheSeamFalls"
              x={row.rule}
              y={row.offset + 20}
              fontSize="13"
              textAnchor="middle"
              className="fill-muted-foreground"
            >
              {t(row.ruleLabel)}
            </text>
          </g>
        ))}

        {/* the axis, said once under the top row: these frames are time, not the vertical window
            `ContextFalloff` drew a unit earlier */}
        <text
          id="where-the-seam-falls-window-label"
          data-component="WhereTheSeamFalls"
          x="12"
          y="158"
          fontSize="13"
          className="fill-muted-foreground"
        >
          {t('seam.window')}
        </text>
      </svg>
    </figure>
  )
}
