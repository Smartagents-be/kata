import { useId } from 'react'
import { useTranslation } from 'react-i18next'

/**
 * The same five-stage pipeline twice, drawn on one scale: the way it ran when a person typed the
 * code, and the way it runs when agents do. It sits inside the prose of `change`, at the
 * `data-figure="pipeline-shift"` slot in the section that argues the process was the bottleneck all
 * along.
 *
 * **One scale across both rows is the whole figure.** Both bars start at the same x and a unit of
 * time is the same number of pixels in each, so where the second row ends is a measurement rather
 * than a layout. The dashed guide at the first row's end is what makes that readable: take the
 * typing out and the calendar moves a little. Draw the rows to equal width, as `WorkflowWeights`
 * does for its own reasons, and the argument is gone.
 *
 * Four things the proportions have to keep saying, and every one of them is easy to lose while
 * nudging a number.
 *
 * `write` collapses to a sliver and `verify` becomes the widest solid block anywhere in the
 * drawing. That is the burden moving from authoring to verifying, and it is the unit's spine.
 *
 * The second row's `write` is **three lanes in the same span**, because the stage that got cheap is
 * also the stage you can run three of at once. Same elapsed time, three times the code. The lanes
 * are stacked rather than laid end to end for exactly that reason: a reader who sees three blocks in
 * a row reads three steps.
 *
 * The strip under the second row is the verifying those three lanes actually need, three times what
 * one lane needed. **It is longer than the block above it, and the divider is where the checking
 * stopped.** That gap is the figure's second argument: parallel writing multiplies what has to be
 * read, attention does not multiply with it, and the part nobody opened is the part that ships. Keep
 * the strip dashed and keep it longer than `verify`, or the drawing says the opposite.
 *
 * `wait` and `ship` **grow** from one row to the next, because the gates did not change and there is
 * more going through them. They stay slim in both rows: the queues are the point of the section, not
 * the mass of the picture.
 *
 * The process stages are dashed outlines rather than a second fill. At the alphas this palette
 * uses, a teal tint and a grey tint are hard to tell apart, and a dash already reads in this course
 * as the place where nothing is happening. That is exactly what a queue is.
 *
 * A segment names itself inside its own block unless it is too narrow to hold the word, which today
 * is only `write` on the second row. That one takes a tick and a label above the bar, and the
 * exception is the point: the stage everybody thinks of as the work no longer has room for its own
 * name. Both bottleneck marks sit above their bars so the strip has the space under the second one.
 */
const BAR_X = 118
const BAR_H = 34
/** 506px of drawing for 100 units of time, in a 640 viewBox with a left column for the row names. */
const SCALE = 5.06
const ROW_Y = [56, 140] as const
const OLD_END = BAR_X + 100 * SCALE
/** Under this a segment cannot hold its own label in either language, so the name goes above it. */
const NARROW = 52
const LANE_GAP = 3
/** The strip of verifying that the parallel lanes need, drawn under the row it belongs to. */
const STRIP_H = 9
const STRIP_GAP = 8

const STAGES = [
  { id: 'decide', kind: 'work' },
  { id: 'wait', kind: 'process' },
  { id: 'write', kind: 'work' },
  { id: 'check', kind: 'work' },
  { id: 'ship', kind: 'process' },
] as const

const ROWS = [
  {
    id: 'traditional',
    // `wait` is 11 rather than 10 for a reason that is not about time: below about 52px a block
    // cannot hold its own name in either language, and a queue whose label floats above the bar
    // reads as an exception when it is the ordinary case.
    units: [12, 11, 41, 21, 15],
    bottleneck: 'write',
    lanes: 1,
  },
  {
    id: 'agentic',
    units: [12, 14, 8, 30, 18],
    bottleneck: 'check',
    lanes: 3,
    /** Three lanes of output at what one lane cost to read: 3 x 21. */
    needed: 63,
  },
] as const

export function PipelineShift() {
  const { t } = useTranslation('step3')
  const titleId = useId()

  return (
    <figure id="pipeline-shift" data-component="PipelineShift" className="my-8">
      <svg
        id="pipeline-shift-svg"
        data-component="PipelineShift"
        viewBox="0 0 640 214"
        role="img"
        aria-labelledby={titleId}
        className="h-auto w-full"
      >
        <title id={titleId} data-component="PipelineShift">
          {t('pipeline-shift.description')}
        </title>

        {/* Two kinds of block, named once. Every stage is one or the other in both rows. */}
        <g id="pipeline-shift-legend" data-component="PipelineShift">
          <rect x={BAR_X} y="4" width="12" height="12" rx="2" className="fill-primary/25" />
          <text
            x={BAR_X + 19}
            y="14"
            fontSize="12"
            className="fill-muted-foreground"
            data-component="PipelineShift"
          >
            {t('pipeline-shift.work')}
          </text>

          <rect
            x={BAR_X + 190}
            y="4"
            width="12"
            height="12"
            rx="2"
            strokeWidth="1.5"
            strokeDasharray="3 3"
            className="fill-muted-foreground/10 stroke-muted-foreground/50"
          />
          <text
            x={BAR_X + 209}
            y="14"
            fontSize="12"
            className="fill-muted-foreground"
            data-component="PipelineShift"
          >
            {t('pipeline-shift.process')}
          </text>
        </g>

        {/* Where the old pipeline ended, carried down through both rows so the second one's short
            end is read against something rather than guessed at. */}
        <line
          id="pipeline-shift-old-end"
          data-component="PipelineShift"
          x1={OLD_END}
          y1={ROW_Y[0]}
          x2={OLD_END}
          y2={ROW_Y[1] + BAR_H}
          strokeWidth="1"
          strokeDasharray="4 4"
          className="stroke-muted-foreground/40"
        />

        {ROWS.map((row, rowIndex) => {
          const y = ROW_Y[rowIndex]
          const block = `pipeline-shift-${row.id}`
          const laneH = (BAR_H - (row.lanes - 1) * LANE_GAP) / row.lanes
          let x = BAR_X
          let checkX = BAR_X

          return (
            <g key={row.id} id={block} data-component="PipelineShift">
              <text
                id={`${block}-label`}
                data-component="PipelineShift"
                x="0"
                y={y + 21}
                fontSize="13"
                className="fill-foreground font-medium"
              >
                {t(`pipeline-shift.${row.id}`)}
              </text>

              {STAGES.map((stage, index) => {
                const width = row.units[index] * SCALE
                const left = x
                x += width
                if (stage.id === 'check') checkX = left

                const isBottleneck = stage.id === row.bottleneck
                const inside = width >= NARROW
                const parallel = stage.id === 'write' && row.lanes > 1
                const name = parallel ? 'write-many' : stage.id

                return (
                  <g
                    key={stage.id}
                    id={`${block}-${stage.id}`}
                    data-component="PipelineShift"
                    data-state={isBottleneck ? 'bottleneck' : stage.kind}
                  >
                    {/* One block, or one per lane when the stage runs several agents at once. */}
                    {Array.from({ length: parallel ? row.lanes : 1 }, (_, lane) => (
                      <rect
                        key={lane}
                        id={parallel ? `${block}-${stage.id}-lane-${lane}` : undefined}
                        x={left}
                        y={parallel ? y + lane * (laneH + LANE_GAP) : y}
                        width={width}
                        height={parallel ? laneH : BAR_H}
                        strokeWidth={stage.kind === 'process' || parallel ? 1.5 : 0}
                        strokeDasharray={stage.kind === 'process' ? '5 4' : undefined}
                        className={
                          stage.kind === 'process'
                            ? 'fill-muted-foreground/10 stroke-muted-foreground/50'
                            : isBottleneck
                              ? 'fill-primary'
                              : // A lane is a tenth of the height of an ordinary block and a
                                // twentieth of the width, so the tint alone does not hold it. The
                                // edge is what makes three of them count as three.
                                `fill-primary/25 ${parallel ? 'stroke-primary/50' : ''}`
                        }
                        data-component="PipelineShift"
                      />
                    ))}

                    {inside ? (
                      <text
                        x={left + width / 2}
                        y={y + 22}
                        fontSize="11"
                        textAnchor="middle"
                        className={isBottleneck ? 'fill-primary-foreground' : 'fill-foreground'}
                        data-component="PipelineShift"
                      >
                        {t(`pipeline-shift.${name}`)}
                      </text>
                    ) : (
                      <>
                        <line
                          x1={left + width / 2}
                          y1={y - 7}
                          x2={left + width / 2}
                          y2={y}
                          strokeWidth="1"
                          className="stroke-muted-foreground/60"
                          data-component="PipelineShift"
                        />
                        <text
                          x={left + width / 2}
                          y={y - 12}
                          fontSize="11"
                          textAnchor="middle"
                          className="fill-foreground"
                          data-component="PipelineShift"
                        >
                          {t(`pipeline-shift.${name}`)}
                        </text>
                      </>
                    )}

                    {/* Above the bar in both rows, because the second row's underside carries the
                        strip. A caret pointing down at the block it names. */}
                    {isBottleneck && (
                      <g id={`${block}-${stage.id}-mark`} data-component="PipelineShift">
                        <path
                          d={`M${left + width / 2 - 6} ${y - 8} L${left + width / 2} ${y - 1} L${left + width / 2 + 6} ${y - 8} Z`}
                          className="fill-primary"
                          data-component="PipelineShift"
                        />
                        <text
                          x={left + width / 2}
                          y={y - 13}
                          fontSize="11"
                          textAnchor="middle"
                          className="fill-primary font-medium"
                          data-component="PipelineShift"
                        >
                          {t('pipeline-shift.bottleneck')}
                        </text>
                      </g>
                    )}
                  </g>
                )
              })}

              {/* What three lanes of output actually need read, against what got read. The divider
                  is where the checking stopped, and everything right of it ships unopened. */}
              {'needed' in row && (
                <g id={`${block}-needed`} data-component="PipelineShift">
                  {/* The part of the strip that got read, filled so the rest reads as empty rather
                      than as more of the same. It is the width of the block above it by
                      construction: what you checked is what you had time to check. */}
                  <rect
                    id={`${block}-needed-done`}
                    data-component="PipelineShift"
                    x={checkX}
                    y={y + BAR_H + STRIP_GAP}
                    width={x - row.units[4] * SCALE - checkX}
                    height={STRIP_H}
                    className="fill-primary/25"
                  />
                  <rect
                    x={checkX}
                    y={y + BAR_H + STRIP_GAP}
                    width={row.needed * SCALE}
                    height={STRIP_H}
                    strokeWidth="1.5"
                    strokeDasharray="5 4"
                    className="fill-none stroke-muted-foreground/60"
                    data-component="PipelineShift"
                  />
                  <line
                    id={`${block}-needed-divider`}
                    data-component="PipelineShift"
                    x1={x - row.units[4] * SCALE}
                    y1={y + BAR_H + STRIP_GAP}
                    x2={x - row.units[4] * SCALE}
                    y2={y + BAR_H + STRIP_GAP + STRIP_H}
                    strokeWidth="2"
                    className="stroke-primary"
                  />
                  <text
                    x={x - row.units[4] * SCALE - 5}
                    y={y + BAR_H + STRIP_GAP + STRIP_H + 15}
                    fontSize="11"
                    textAnchor="end"
                    className="fill-primary"
                    data-component="PipelineShift"
                  >
                    {t('pipeline-shift.checked')}
                  </text>
                  <text
                    x={checkX + row.needed * SCALE}
                    y={y + BAR_H + STRIP_GAP + STRIP_H + 15}
                    fontSize="11"
                    textAnchor="end"
                    className="fill-muted-foreground"
                    data-component="PipelineShift"
                  >
                    {t('pipeline-shift.needed')}
                  </text>
                </g>
              )}
            </g>
          )
        })}
      </svg>

      <figcaption
        id="pipeline-shift-caption"
        data-component="PipelineShift"
        className="text-muted-foreground text-xs"
      >
        {t('pipeline-shift.caption')}
      </figcaption>
    </figure>
  )
}
