import { useId, useLayoutEffect, useRef, useState } from 'react'
import type { Assistant } from '@/shared/assistant/assistant'
import { useAssistant } from '@/shared/assistant/useAssistant'
import { useStepText } from '@/shared/i18n/useStepText'

/**
 * How full the window is over one session, drawn twice: once with compaction doing the emptying and
 * once with a `/clear`. The same three tasks run under both charts, so what differs is when the
 * window empties, how far, and what it took to empty it.
 *
 * It replaced `WhereTheSeamFalls`, which argued that both cuts lose roughly the same amount and kept
 * cost out on purpose. That was not true of the products: compaction is a request of its own that
 * reads the whole window and writes a summary as output, and a clear costs nothing. So this one
 * draws the price in, as the shaded strip at the drop, and the table under the charts says it in
 * words. The two drops are deliberately not the same depth either. A summary is something, so the
 * compacted window lands well above empty; a clear lands on nearly nothing, because what crosses is
 * what the student hands over and what is on disk.
 *
 * Only one string splits by assistant: when compaction starts. Claude Code compacts at the model's
 * context limit (a little before it on a native 1M window), Copilot CLI starts in the background at
 * about 80%. The curves stay one drawing for both, since a peak just under full is true of either:
 * Copilot CLI pauses at about 95% when its background run has not finished. The strings are typed
 * `Record<Assistant, …>` so a third assistant is a compile error here rather than a wrong claim.
 */

const WHEN: Record<Assistant, string> = {
  claude: 'window-fill.compaction.when.claude',
  copilot: 'window-fill.compaction.when.copilot',
}

/**
 * Two drawings of the same charts, picked by the width of the figure's own box. The labels are in
 * viewBox units and the SVG scales to its box, so the wide drawing's 12-unit labels come out at about
 * 6px in a phone's column. Under `NARROW` the viewBox is narrow too, which keeps the type near its
 * written size: each mark's label moves under the chart's title as a line of its own, a task's label
 * breaks over two lines, and the cost strip loses its two words, which the table's "what it costs"
 * row already says. The deck and the prose column on a laptop both get the wide one.
 */
const NARROW = 480

type Layout = {
  narrow: boolean
  /** The viewBox width. */
  view: number
  /** The plot area, shared by both charts so their axes line up. */
  x0: number
  width: number
  height: number
  /** From the top of a chart's block to the "full" line; the title row sits above it. */
  plotTop: number
  /** One chart's block, title to task labels, and the gap to the next one. */
  block: number
  gap: number
  /** Label sizes in viewBox units: the axis ends, the task names, the mark. */
  axis: number
  task: number
  mark: number
}

const WIDE: Layout = {
  narrow: false,
  view: 640,
  x0: 56,
  width: 560,
  height: 100,
  plotTop: 28,
  block: 156,
  gap: 24,
  axis: 12,
  task: 13,
  mark: 13,
}

const COMPACT: Layout = {
  narrow: true,
  view: 360,
  x0: 44,
  width: 308,
  height: 90,
  plotTop: 46,
  block: 178,
  gap: 20,
  axis: 13,
  task: 14,
  mark: 13,
}

/** A label split at the space nearest its middle, so a narrow chart can set it on two lines. */
function halves(label: string): [string, string] {
  const middle = label.length / 2
  let best = -1
  for (let i = 0; i < label.length; i++) {
    if (label[i] === ' ' && (best === -1 || Math.abs(i - middle) < Math.abs(best - middle))) {
      best = i
    }
  }
  return best === -1 ? [label, ''] : [label.slice(0, best), label.slice(best + 1)]
}

/**
 * Whether the figure's own box is under `NARROW`. Read off the layout box (`contentRect`) rather
 * than `getBoundingClientRect`, so the deck's magnifying transform does not count as width.
 */
function useNarrow() {
  const ref = useRef<HTMLElement>(null)
  const [narrow, setNarrow] = useState(false)

  useLayoutEffect(() => {
    const element = ref.current
    if (!element) {
      return
    }
    const measure = (width: number) => setNarrow(width > 0 && width < NARROW)
    measure(element.clientWidth)
    const observer = new ResizeObserver(([entry]) => measure(entry.contentRect.width))
    observer.observe(element)
    return () => observer.disconnect()
  }, [])

  return { ref, narrow }
}

type Point = readonly [time: number, fill: number]

type Chart = {
  id: 'compaction' | 'clear'
  /** Where the window empties, as a share of the session. */
  mark: number
  markLabel: string
  /** The session, as share of time against share of the window. */
  points: readonly Point[]
  /** Whether the drop is a request of its own, which is drawn as the shaded strip. */
  costs: boolean
}

/**
 * Compaction fires in the middle of the second task, on its own, just under full; it lands on a
 * summary rather than on empty. The clear lands on the boundary between the second and third task,
 * which is the one place in the session the student would choose, and it lands on nearly nothing.
 */
const CHARTS: readonly Chart[] = [
  {
    id: 'compaction',
    mark: 0.5,
    markLabel: 'window-fill.compaction.mark',
    points: [
      [0, 0.05],
      [0.33, 0.45],
      [0.5, 0.96],
      [0.506, 0.2],
      [0.66, 0.32],
      [1, 0.62],
    ],
    costs: true,
  },
  {
    id: 'clear',
    mark: 2 / 3,
    markLabel: 'window-fill.clear.mark',
    points: [
      [0, 0.05],
      [0.33, 0.45],
      [2 / 3, 0.8],
      [2 / 3 + 0.004, 0.04],
      [1, 0.42],
    ],
    costs: false,
  },
]

const TASKS = ['window-fill.task-0', 'window-fill.task-1', 'window-fill.task-2'] as const

type Row = {
  id: string
  label: string
  /** Either one key for both products, or one per assistant where the products differ. */
  compaction: string | Record<Assistant, string>
  clear: string
}

const ROWS: readonly Row[] = [
  { id: 'when', label: 'window-fill.when', compaction: WHEN, clear: 'window-fill.clear.when' },
  {
    id: 'stays',
    label: 'window-fill.stays',
    compaction: 'window-fill.compaction.stays',
    clear: 'window-fill.clear.stays',
  },
  {
    id: 'costs',
    label: 'window-fill.costs',
    compaction: 'window-fill.compaction.costs',
    clear: 'window-fill.clear.costs',
  },
]

export function WindowFill() {
  const { text } = useStepText('step1')
  const { assistant } = useAssistant()
  const titleId = useId()
  const { ref, narrow } = useNarrow()
  const layout = narrow ? COMPACT : WIDE
  const x = (time: number) => layout.x0 + time * layout.width

  return (
    <figure
      id="window-fill"
      data-component="WindowFill"
      data-state={narrow ? 'narrow' : 'wide'}
      ref={ref}
      className="@container my-8"
    >
      <div id="window-fill-header" data-component="WindowFill" className="mb-3 flex items-baseline gap-3">
        <p id="window-fill-eyebrow" data-component="WindowFill" className="eyebrow text-primary">
          {text('window-fill.eyebrow')}
        </p>
        <span
          id="window-fill-header-rule"
          data-component="WindowFill"
          aria-hidden
          className="bg-border/70 h-px flex-1"
        />
      </div>

      {/*
        Charts over table in a prose column, charts beside table when the figure's own box is wide.
        Only the deck gives it that much room, and there the table under the charts made the figure
        too tall to magnify. It is a container query rather than a breakpoint because the viewport
        says nothing about the column the figure sits in.
      */}
      <div
        id="window-fill-body"
        data-component="WindowFill"
        className="grid gap-6 @5xl:grid-cols-[minmax(0,1fr)_24rem] @5xl:items-center @5xl:gap-10"
      >
        <svg
          id="window-fill-svg"
          data-component="WindowFill"
          viewBox={`0 0 ${layout.view} ${2 * layout.block + layout.gap}`}
          role="img"
          aria-labelledby={titleId}
          className="h-auto w-full"
        >
          <title id={titleId} data-component="WindowFill">
            {text('window-fill.description')}
          </title>

          {CHARTS.map((chart, index) => {
            const top = index * (layout.block + layout.gap)
            const full = top + layout.plotTop
            const base = full + layout.height
            const at = chart.points.map(([time, fill]) => [x(time), base - fill * layout.height] as const)
            const line = at.map(([px, py], i) => `${i === 0 ? 'M' : 'L'} ${px} ${py}`).join(' ')
            const last = at[at.length - 1]
            const markX = x(chart.mark)

            return (
              <g key={chart.id} id={`window-fill-${chart.id}`} data-component="WindowFill">
                {/* the chart's name: a word for compaction, the command itself for a clear */}
                <text
                  id={`window-fill-${chart.id}-title`}
                  data-component="WindowFill"
                  x="0"
                  y={top + 14}
                  fontSize="15"
                  className={
                    chart.id === 'clear' ? 'fill-foreground font-mono font-medium' : 'fill-foreground font-medium'
                  }
                >
                  {chart.id === 'clear' ? '/clear' : text('window-fill.compaction')}
                </text>

                {/* full and empty, the only two levels the reading needs */}
                <line
                  id={`window-fill-${chart.id}-full`}
                  data-component="WindowFill"
                  x1={layout.x0}
                  y1={full}
                  x2={layout.x0 + layout.width}
                  y2={full}
                  strokeWidth="1"
                  strokeDasharray="3 3"
                  className="stroke-muted-foreground/60"
                />
                <text
                  id={`window-fill-${chart.id}-full-label`}
                  data-component="WindowFill"
                  x={layout.x0 - 6}
                  y={full + 4}
                  fontSize={layout.axis}
                  textAnchor="end"
                  className="fill-muted-foreground"
                >
                  {text('window-fill.full')}
                </text>
                <line
                  id={`window-fill-${chart.id}-base`}
                  data-component="WindowFill"
                  x1={layout.x0}
                  y1={base}
                  x2={layout.x0 + layout.width}
                  y2={base}
                  strokeWidth="1"
                  className="stroke-border"
                />
                <text
                  id={`window-fill-${chart.id}-empty-label`}
                  data-component="WindowFill"
                  x={layout.x0 - 6}
                  y={base + 4}
                  fontSize={layout.axis}
                  textAnchor="end"
                  className="fill-muted-foreground"
                >
                  {text('window-fill.empty')}
                </text>

                {/* the three tasks along the bottom, the same thirds in both charts */}
                {TASKS.map((task, taskIndex) => (
                  <g key={task} data-component="WindowFill">
                    <line
                      id={`window-fill-${chart.id}-task-${taskIndex}-tick`}
                      data-component="WindowFill"
                      x1={x(taskIndex / 3)}
                      y1={base}
                      x2={x(taskIndex / 3)}
                      y2={base + 6}
                      strokeWidth="1"
                      className="stroke-border"
                    />
                    <text
                      id={`window-fill-${chart.id}-task-${taskIndex}`}
                      data-component="WindowFill"
                      x={x(taskIndex / 3 + 1 / 6)}
                      y={base + 22}
                      fontSize={layout.task}
                      textAnchor="middle"
                      className="fill-muted-foreground"
                    >
                      {layout.narrow
                        ? halves(text(task)).map((line, lineIndex) => (
                            <tspan
                              key={lineIndex}
                              id={`window-fill-${chart.id}-task-${taskIndex}-line-${lineIndex}`}
                              data-component="WindowFill"
                              x={x(taskIndex / 3 + 1 / 6)}
                              y={base + 20 + lineIndex * 16}
                            >
                              {line}
                            </tspan>
                          ))
                        : text(task)}
                    </text>
                  </g>
                ))}

                {/* what compaction costs: a request of its own over the whole window, drawn at the
                    drop it pays for. A clear has none, so its chart has no strip. */}
                {chart.costs && (
                  <g data-component="WindowFill">
                    <rect
                      id={`window-fill-${chart.id}-cost`}
                      data-component="WindowFill"
                      x={markX - 2}
                      y={full}
                      width="7"
                      height={layout.height}
                      className="fill-foreground/20"
                    />
                    {!layout.narrow && (
                    <text
                      id={`window-fill-${chart.id}-cost-label`}
                      data-component="WindowFill"
                      fontSize="12"
                      className="fill-muted-foreground"
                    >
                      <tspan
                        id={`window-fill-${chart.id}-cost-reads`}
                        data-component="WindowFill"
                        x={markX + 12}
                        y={full + 20}
                      >
                        {text('window-fill.reads')}
                      </tspan>
                      <tspan
                        id={`window-fill-${chart.id}-cost-writes`}
                        data-component="WindowFill"
                        x={markX + 12}
                        y={full + 36}
                      >
                        {text('window-fill.writes')}
                      </tspan>
                    </text>
                    )}
                  </g>
                )}

                {/* the fill, as an area under a teal line */}
                <path
                  id={`window-fill-${chart.id}-area`}
                  data-component="WindowFill"
                  d={`M ${layout.x0} ${base} ${line.replace(/^M/, 'L')} L ${last[0]} ${base} Z`}
                  className="fill-primary/10"
                />
                <path
                  id={`window-fill-${chart.id}-line`}
                  data-component="WindowFill"
                  d={line}
                  fill="none"
                  strokeWidth="2"
                  strokeLinejoin="round"
                  className="stroke-primary"
                />

                {/* the moment the window empties, and who picked it: beside the mark when the chart is
                    wide, on a line of its own under the title when it is not */}
                <line
                  id={`window-fill-${chart.id}-mark`}
                  data-component="WindowFill"
                  x1={markX}
                  y1={layout.narrow ? full - 6 : top + 18}
                  x2={markX}
                  y2={base}
                  strokeWidth="1.25"
                  className="stroke-foreground"
                />
                <text
                  id={`window-fill-${chart.id}-mark-label`}
                  data-component="WindowFill"
                  x={layout.narrow ? 0 : markX + 6}
                  y={layout.narrow ? top + 33 : top + 14}
                  fontSize={layout.mark}
                  className="fill-foreground font-medium"
                >
                  {text(chart.markLabel)}
                </text>
              </g>
            )
          })}
        </svg>

        {/*
          The same comparison in words. Three columns in a prose column; under `@md` each row stacks into
          its heading and the two answers side by side, each answer carrying its column's name, since a
          column header a screen away is no header at all.
        */}
        <table
          id="window-fill-table"
          data-component="WindowFill"
          className="w-full border-collapse text-sm @5xl:text-lg"
        >
          <thead id="window-fill-table-head" data-component="WindowFill" className="hidden @md:table-header-group">
            <tr id="window-fill-table-head-row" data-component="WindowFill" className="border-border/70 border-b">
              <td id="window-fill-table-head-blank" data-component="WindowFill" />
              <th
                id="window-fill-table-head-compaction"
                data-component="WindowFill"
                scope="col"
                className="text-muted-foreground py-2 pr-4 text-left font-medium"
              >
                {text('window-fill.compaction')}
              </th>
              <th
                id="window-fill-table-head-clear"
                data-component="WindowFill"
                scope="col"
                className="text-muted-foreground py-2 text-left font-mono font-medium"
              >
                /clear
              </th>
            </tr>
          </thead>
          <tbody id="window-fill-table-body" data-component="WindowFill">
            {ROWS.map((row) => (
              <tr
                key={row.id}
                id={`window-fill-table-${row.id}`}
                data-component="WindowFill"
                className="border-border/50 grid grid-cols-2 gap-x-4 border-b py-2 last:border-b-0 @md:table-row @md:py-0"
              >
                <th
                  id={`window-fill-table-${row.id}-label`}
                  data-component="WindowFill"
                  scope="row"
                  className="text-muted-foreground col-span-2 pb-1 text-left font-medium @md:w-28 @md:py-2 @md:pr-4 @md:align-top"
                >
                  {text(row.label)}
                </th>
                <td
                  id={`window-fill-table-${row.id}-compaction`}
                  data-component="WindowFill"
                  className="@md:py-2 @md:pr-4 @md:align-top"
                >
                  <span
                    id={`window-fill-table-${row.id}-compaction-head`}
                    data-component="WindowFill"
                    className="text-muted-foreground block text-xs @md:hidden"
                  >
                    {text('window-fill.compaction')}
                  </span>
                  {text(typeof row.compaction === 'string' ? row.compaction : row.compaction[assistant])}
                </td>
                <td
                  id={`window-fill-table-${row.id}-clear`}
                  data-component="WindowFill"
                  className="@md:py-2 @md:align-top"
                >
                  <span
                    id={`window-fill-table-${row.id}-clear-head`}
                    data-component="WindowFill"
                    className="text-muted-foreground block font-mono text-xs @md:hidden"
                  >
                    /clear
                  </span>
                  {text(row.clear)}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </figure>
  )
}
