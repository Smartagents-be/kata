import { useId } from 'react'
import { useTranslation } from 'react-i18next'

/**
 * The same afternoon cut twice. Both rows hold one session of equal length, banded into the same
 * three tasks at the same widths and filled with the same sixteen turns, so the only thing that
 * differs on screen is where the cut falls. Compaction lands wherever the window happened to fill,
 * which here is inside the middle task; a clear lands on the boundary the student chose. Roughly
 * the same amount goes either way, and that is the point: what the seam decides is whether a task
 * survives whole.
 *
 * Three things do that arguing, and each replaced a version of this drawing that stated the claim
 * in labels and left the picture to be taken on trust:
 *
 * - **Every turn is drawn in both rows**, so there is a baseline to lose things from. A turn behind
 *   the seam is an empty outline and a turn ahead of it is filled, which makes the loss countable
 *   (nine against eleven) and makes "roughly the same amount" something a reader can check rather
 *   than something the caption asserts. Drawing only the survivors, as this once did, reads as a
 *   session that started late.
 * - **The seam through a task is torn and the seam between two is straight.** That is the whole
 *   difference between the rows in one stroke, and it is derived rather than declared: a rule that
 *   lands inside a span jags across that span's height. The rules sit between turns, never through
 *   one, or the tear reads as a damaged bar instead of a cut.
 * - **A bracket under each window spans what is gone**, and the arrow off it names what crosses in
 *   its place. That puts the carry under the region it replaces instead of inside the first task,
 *   where it used to sit and be read as part of it, and the two bracket lengths are what show the
 *   rows losing comparable amounts.
 *
 * It borrows `ContextFalloff`'s frame stroke and fill rather than inventing one, and it joins the
 * step's diagram vocabulary: a teal frame is a context, a bar is something in it, dashes are what is
 * not. The proportions and the axis are its own, which is why the drawing opens on `seam.window`: a
 * reader meets the vertical window of `ContextFalloff` one unit earlier, and nothing else here says
 * these frames run in time. The axis sits on its own line rather than beside a row label, because
 * the Dutch of both is long enough to collide.
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
  /** What the next session opens with, stacked under the bracket over what it replaces. */
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
 * Compaction's rule lands inside the middle span; the clear's lands in the gutter after it. Both sit
 * between two turns rather than across one, and the two are within a hundred pixels of each other on
 * purpose, so the rows lose comparable amounts and the position is the only argument left.
 */
const ROWS: Row[] = [
  {
    id: 'compaction',
    offset: 26,
    label: 'seam.compaction',
    rule: 345,
    ruleLabel: 'seam.filled',
    crossing: [{ key: 'seam.summary', tone: 'dashed' }],
  },
  {
    id: 'clear',
    offset: 190,
    label: 'seam.clear',
    rule: 433,
    ruleLabel: 'seam.chose',
    crossing: [
      { key: 'seam.sentence', tone: 'solid' },
      { key: 'seam.disk', tone: 'muted' },
    ],
  },
]

const TURN_WIDTH = 28
const BAR = 16
const CHIP_X = 186
const CHIP_WIDTH = 28
/** Room held for `seam.gone` before the arrow, so the chips line up in both rows and both languages. */
const ARROW_X = 162

/**
 * The seam. Straight where it falls between two tasks, jagged across the height of the one it falls
 * inside, which is the difference the whole figure is about. The jag is three wide because the gap
 * between two turns is six, and a tear that overlapped a turn would read as a damaged bar.
 */
function seamPath(x: number, top: number, bottom: number, tear: { from: number; to: number } | null) {
  if (!tear) return `M ${x} ${top} L ${x} ${bottom}`

  const parts = [`M ${x} ${top}`, `L ${x} ${tear.from}`]
  let side = 1
  for (let y = tear.from + 8; y < tear.to; y += 8) {
    parts.push(`L ${x + side * 3} ${y}`)
    side = -side
  }
  return [...parts, `L ${x} ${tear.to}`, `L ${x} ${bottom}`].join(' ')
}

/**
 * The right-hand piece of a torn task: square where the seam cut it, rounded where the task ends. It
 * is painted over the whole band rather than beside a second rect, because two rounded pieces butted
 * together leave a notch at the tear and read as two tasks instead of one broken in half.
 */
function stumpPath(x: number, y: number, right: number, height: number, radius = 8) {
  return [
    `M ${x} ${y}`,
    `H ${right - radius}`,
    `A ${radius} ${radius} 0 0 1 ${right} ${y + radius}`,
    `V ${y + height - radius}`,
    `A ${radius} ${radius} 0 0 1 ${right - radius} ${y + height}`,
    `H ${x}`,
    'Z',
  ].join(' ')
}

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
        viewBox="0 0 640 364"
        role="img"
        aria-labelledby={titleId}
        className="h-auto w-full max-w-xl"
      >
        <title id={titleId} data-component="WhereTheSeamFalls">
          {t('seam.description')}
        </title>

        {/* the axis, said once above everything: these frames are time, not the vertical window
            `ContextFalloff` drew a unit earlier */}
        <text
          id="where-the-seam-falls-window-label"
          data-component="WhereTheSeamFalls"
          x="12"
          y="12"
          fontSize="13"
          className="fill-muted-foreground"
        >
          {t('seam.window')}
        </text>

        {ROWS.map((row) => {
          const torn = SPANS.find((span) => span.x < row.rule && span.x + span.width > row.rule)

          return (
            <g key={row.id} data-component="WhereTheSeamFalls">
              <text
                id={`where-the-seam-falls-${row.id}-label`}
                data-component="WhereTheSeamFalls"
                x="12"
                y={row.offset + 14}
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
                y={row.offset + 24}
                width="616"
                height="84"
                rx="14"
                strokeWidth="2"
                className="fill-primary/5 stroke-primary/40"
              />

              {/* the three tasks, banded at the same widths in both rows and cut where the seam
                  falls, so a task the seam ran through is half faded and half not */}
              {SPANS.map((span, index) => {
                const end = span.x + span.width
                const split = Math.min(Math.max(row.rule, span.x), end)
                const state = split === end ? 'gone' : split === span.x ? 'kept' : 'torn'

                return (
                  <g key={span.key} data-component="WhereTheSeamFalls">
                    <rect
                      id={`where-the-seam-falls-${row.id}-span-${index}`}
                      data-component="WhereTheSeamFalls"
                      data-state={state}
                      x={span.x}
                      y={row.offset + 30}
                      width={span.width}
                      height="72"
                      rx="8"
                      className={state === 'kept' ? 'fill-muted-foreground/15' : 'fill-muted-foreground/5'}
                    />
                    {state === 'torn' && (
                      <path
                        id={`where-the-seam-falls-${row.id}-span-${index}-stump`}
                        data-component="WhereTheSeamFalls"
                        d={stumpPath(split, row.offset + 30, end, 72)}
                        className="fill-muted-foreground/15"
                      />
                    )}
                    <text
                      id={`where-the-seam-falls-${row.id}-span-${index}-label`}
                      data-component="WhereTheSeamFalls"
                      data-state={state}
                      x={span.x + 12}
                      y={row.offset + 50}
                      fontSize="13"
                      className={state === 'gone' ? 'fill-muted-foreground/50' : 'fill-muted-foreground'}
                    >
                      {t(span.key)}
                    </text>
                  </g>
                )
              })}

              {/* every turn in the session: filled if it is still in the window, an empty outline if
                  the seam took it, so the two rows can be counted against each other */}
              {TURNS.map((x) => {
                const kept = x > row.rule

                return (
                  <rect
                    key={x}
                    id={`where-the-seam-falls-${row.id}-turn-${x}`}
                    data-component="WhereTheSeamFalls"
                    data-state={kept ? 'kept' : 'gone'}
                    x={x}
                    y={row.offset + 68}
                    width={TURN_WIDTH}
                    height={BAR}
                    rx="5"
                    fill={kept ? undefined : 'none'}
                    strokeWidth={kept ? undefined : 1.5}
                    strokeDasharray={kept ? undefined : '3 3'}
                    className={kept ? 'fill-primary/55' : 'stroke-muted-foreground/45'}
                  />
                )
              })}

              {/* the seam itself, drawn past the frame at both ends so it reads as a mark and not a
                  bar, and torn across the task it happens to land inside */}
              <path
                id={`where-the-seam-falls-${row.id}-rule`}
                data-component="WhereTheSeamFalls"
                data-state={torn ? 'torn' : 'clean'}
                d={seamPath(
                  row.rule,
                  row.offset + 18,
                  row.offset + 114,
                  torn ? { from: row.offset + 30, to: row.offset + 102 } : null,
                )}
                fill="none"
                strokeWidth="1.5"
                className="stroke-muted-foreground/70"
              />
              <text
                id={`where-the-seam-falls-${row.id}-rule-label`}
                data-component="WhereTheSeamFalls"
                x={row.rule}
                y={row.offset + 12}
                fontSize="13"
                textAnchor="middle"
                className="fill-muted-foreground"
              >
                {t(row.ruleLabel)}
              </text>

              {/* what the seam took, bracketed under exactly the stretch of window it took */}
              <path
                id={`where-the-seam-falls-${row.id}-bracket`}
                data-component="WhereTheSeamFalls"
                d={`M 12 ${row.offset + 118} L 12 ${row.offset + 124} L ${row.rule} ${row.offset + 124} L ${row.rule} ${row.offset + 118}`}
                fill="none"
                strokeWidth="1.5"
                className="stroke-muted-foreground/40"
              />
              <text
                id={`where-the-seam-falls-${row.id}-gone-label`}
                data-component="WhereTheSeamFalls"
                x="12"
                y={row.offset + 144}
                fontSize="13"
                className="fill-muted-foreground"
              >
                {t('seam.gone')}
              </text>
              <path
                id={`where-the-seam-falls-${row.id}-arrow`}
                data-component="WhereTheSeamFalls"
                d={`M ${ARROW_X} ${row.offset + 139} L ${ARROW_X + 14} ${row.offset + 139} M ${ARROW_X + 9} ${row.offset + 135} L ${ARROW_X + 14} ${row.offset + 139} L ${ARROW_X + 9} ${row.offset + 143}`}
                fill="none"
                strokeWidth="1.5"
                className="stroke-muted-foreground/60"
              />

              {/* and what crosses in its place, at the head of the next window */}
              {row.crossing.map((item, index) => (
                <g key={item.key} data-component="WhereTheSeamFalls">
                  <rect
                    id={`where-the-seam-falls-${row.id}-carried-${index}`}
                    data-component="WhereTheSeamFalls"
                    data-state={item.tone}
                    x={CHIP_X}
                    y={row.offset + 132 + index * 20}
                    width={CHIP_WIDTH}
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
                    x={CHIP_X + CHIP_WIDTH + 10}
                    y={row.offset + 144 + index * 20}
                    fontSize="13"
                    className="fill-muted-foreground"
                  >
                    {t(item.key)}
                  </text>
                </g>
              ))}
            </g>
          )
        })}
      </svg>
    </figure>
  )
}
