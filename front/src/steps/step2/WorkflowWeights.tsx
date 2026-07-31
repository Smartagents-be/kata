import { useId } from 'react'
import { useTranslation } from 'react-i18next'

/**
 * The four workflows side by side, each as one bar of the same length cut into three: what you
 * settle before anything runs, what the agent does, and what you read afterwards.
 *
 * The equal totals are the argument, and they are why this is a bar and not four separate drawings.
 * A more deliberate workflow does not do less work, it moves the work to the front, and the reader
 * can only see that if the four bars end in the same place. `naive` and `audit-driven` deliberately
 * come out close to each other on that axis, because they are close: what separates them is the
 * artifact, which is the second thing the figure carries.
 *
 * The proportions are hand-authored. `NextToken` in step 1 sets the precedent for that and the
 * caption admits it here the same way, because a bar chart invites being read as a measurement.
 */
const ROWS = [
  { id: 'naive', before: 20, run: 230, after: 250 },
  { id: 'plan-based', before: 125, run: 210, after: 165, tag: 'plan', at: 'before', kept: false },
  { id: 'spec-driven', before: 250, run: 172, after: 78, tag: 'spec.md', at: 'before', kept: true },
  { id: 'audit-driven', before: 53, run: 197, after: 250, tag: 'audit.md', at: 'after', kept: true },
] as const

/** Every row's three segments add up to 500, which is what the equal bar ends are made of. */
const BAR_X = 132
const ROW_H = 30
const ROW_GAP = 22
const TOP = 54
/** The foot of the last bar. The viewBox stops just under it, since nothing is drawn below. */
const BOTTOM = TOP + (ROWS.length - 1) * (ROW_H + ROW_GAP) + ROW_H

/**
 * The tag naming what a workflow leaves behind, drawn over the segment that produces it. Solid means
 * it is a file in the repository; dashed is the step's vocabulary for what is not there, and a plan
 * lives in the session and goes when the session does. `naive` has no tag, which is the row's whole
 * point and is why an absent tag has to read as deliberate rather than as a gap.
 */
function Tag({
  block,
  label,
  kept,
  x,
  y,
}: {
  block: string
  label: string
  kept: boolean
  x: number
  y: number
}) {
  const width = label.length * 7 + 16

  return (
    <g id={`${block}-tag`} data-component="WorkflowWeights" data-state={kept ? 'kept' : 'lost'}>
      <rect
        x={x - width / 2}
        y={y + 5}
        width={width}
        height={20}
        rx="5"
        strokeWidth="1.5"
        strokeDasharray={kept ? undefined : '5 4'}
        // A kept artifact is a solid pill sitting on the bar, the way a file sits in the repository.
        // The plan is drawn as an outline with nothing behind it, on the step's own reading of a
        // dash: this is the thing that is not there once the session closes.
        className={kept ? 'fill-background stroke-primary' : 'fill-none stroke-primary-foreground'}
      />
      <text
        x={x}
        y={y + 19}
        fontSize="11"
        textAnchor="middle"
        className={`font-mono ${kept ? 'fill-primary' : 'fill-primary-foreground'}`}
        data-component="WorkflowWeights"
      >
        {label}
      </text>
    </g>
  )
}

/**
 * The closing figure of the `workflows` unit, in the section that argues the four are not exclusive.
 * It sits there rather than under the lead because it compares things by name: a reader who meets it
 * before the four sections is looking at four labels they have not been given yet.
 */
export function WorkflowWeights() {
  const { t } = useTranslation('step2')
  const titleId = useId()

  return (
    <figure id="workflow-weights" data-component="WorkflowWeights" className="my-8">
      <svg
        id="workflow-weights-svg"
        data-component="WorkflowWeights"
        viewBox={`0 0 640 ${BOTTOM + 4}`}
        role="img"
        aria-labelledby={titleId}
        className="h-auto w-full"
      >
        <title id={titleId} data-component="WorkflowWeights">
          {t('workflow-weights.description')}
        </title>

        {/* The legend names the three segments once. Every bar is cut the same way, so naming them
            on the rows would be the same three words four times. */}
        <g id="workflow-weights-legend" data-component="WorkflowWeights">
          {[
            { id: 'decide', x: BAR_X, tone: 'fill-primary' },
            { id: 'run', x: BAR_X + 185, tone: 'fill-muted-foreground/20' },
            { id: 'read', x: BAR_X + 370, tone: 'fill-primary/30' },
          ].map((key) => (
            <g key={key.id} id={`workflow-weights-legend-${key.id}`} data-component="WorkflowWeights">
              <rect x={key.x} y="12" width="12" height="12" rx="2" className={key.tone} />
              <text
                x={key.x + 19}
                y="22"
                fontSize="12"
                className="fill-muted-foreground"
                data-component="WorkflowWeights"
              >
                {t(`workflow-weights.${key.id}`)}
              </text>
            </g>
          ))}
        </g>

        {ROWS.map((row, index) => {
          const y = TOP + index * (ROW_H + ROW_GAP)
          const block = `workflow-weights-row-${index}`

          return (
            <g key={row.id} id={block} data-component="WorkflowWeights">
              <text
                id={`${block}-label`}
                data-component="WorkflowWeights"
                x="0"
                y={y + 20}
                fontSize="13"
                className="fill-foreground font-medium"
              >
                {t(`workflow-weights.${row.id}`)}
              </text>

              <rect
                id={`${block}-before`}
                data-component="WorkflowWeights"
                x={BAR_X}
                y={y}
                width={row.before}
                height={ROW_H}
                className="fill-primary"
              />
              <rect
                id={`${block}-run`}
                data-component="WorkflowWeights"
                x={BAR_X + row.before}
                y={y}
                width={row.run}
                height={ROW_H}
                className="fill-muted-foreground/20"
              />
              <rect
                id={`${block}-after`}
                data-component="WorkflowWeights"
                x={BAR_X + row.before + row.run}
                y={y}
                width={row.after}
                height={ROW_H}
                className="fill-primary/30"
              />

              {'tag' in row && (
                <Tag
                  block={block}
                  label={row.tag}
                  kept={row.kept}
                  x={
                    row.at === 'before'
                      ? BAR_X + row.before / 2
                      : BAR_X + row.before + row.run + row.after / 2
                  }
                  y={y}
                />
              )}
            </g>
          )
        })}

      </svg>
    </figure>
  )
}
