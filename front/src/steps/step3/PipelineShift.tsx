import { useId } from 'react'
import { useTranslation } from 'react-i18next'
import { StoryToggle } from '@/shared/motion/StoryToggle'
import { beat, useStory } from '@/shared/motion/useStory'

/**
 * One change, from writing to production, drawn twice on one calendar: without an agent and with
 * one. It sits inside the prose of `change`, at the `data-figure="pipeline-shift"` slot in the
 * section that argues the process was the bottleneck all along, and it draws the paragraph under it:
 * "Take the typing out and the calendar barely moves. 3 days for a review, a fortnight for an
 * environment, a release window".
 *
 * **One message, and the question is the title.** It was redrawn in October 2026 at the owner's
 * asking, because the drawing it replaced did not explain itself: five abstract stages, three lanes
 * of writing and a strip of unread code under the second row made two arguments in one picture,
 * and a reader could find neither. This one makes the first: an agent writes ten times faster and
 * the change ships barely sooner, because the waits did not move. **The second argument left the
 * figure on purpose**: that parallel writing produces more code than attention can read is already
 * the prose's, in `change.you-test-engineer.1` ("Reading every line stops scaling somewhere in the
 * second hour of diff"), so it does not need a drawing as well.
 *
 * **One scale across both rows is still the whole figure**, which is why it passes the step's bar of
 * being a measurement rather than an illustration: a day is the same width in both rows, so where the
 * second row ends is read off the drawing, and the dashed guide at the first row's end is what makes
 * the gap readable. The waits are named and sized from the paragraph (review 3 days, environment 10,
 * the 2 weeks), and the release is drawn as **a wait for the release**, not as "the release window":
 * a window on a fixed date would ship both changes on the same Thursday, which is not what the
 * paragraph is about. The writing time (5 days against half a day) is the one illustrative number,
 * and the caption says so.
 *
 * It plays on `useStory`'s clock: both dots leave on day 0, the agent's is through the writing in
 * half a day and then waits in the same queue, and each row says when it reached production. Writing
 * is solid teal and the waits are dashed, the course's mark for where nothing is happening. Reduced
 * motion shows the last frame, with the line that sums it up.
 */
const W = 640
const X0 = 1
const DAYS = 23
const DAY = (W - 2) / DAYS
const H = 44
const START = 1500
const PLAY = 12000
const LENGTH = START + PLAY + 600

export function PipelineShift() {
  const { t, i18n } = useTranslation('step3')
  const [ref, now, story] = useStory<SVGSVGElement>(LENGTH, 4500)
  const titleId = useId()
  const day = beat(now, START, PLAY) * DAYS

  // The three waits are the paragraph's own; only the writing differs between the rows.
  const waits = [
    { id: 'review', days: 3 },
    { id: 'environment', days: 10 },
    { id: 'release', days: 5 },
  ]
  const rows = [
    { id: 'traditional', y: 66, write: 5 },
    { id: 'agentic', y: 158, write: 0.5 },
  ]

  return (
    <figure id="pipeline-shift" data-component="PipelineShift" className="my-8 flex flex-col gap-2">
      <svg
        id="pipeline-shift-svg"
        data-component="PipelineShift"
        ref={ref}
        viewBox={`0 0 ${W} 272`}
        role="img"
        aria-labelledby={titleId}
        className="h-auto w-full"
      >
        <title id={titleId} data-component="PipelineShift">
          {t('pipeline-shift.description')}
        </title>

        <text
          id="pipeline-shift-question"
          data-component="PipelineShift"
          x={X0}
          y="20"
          fontSize="15"
          className="fill-foreground font-medium"
        >
          {t('pipeline-shift.question')}
        </text>
        <text
          id="pipeline-shift-day"
          data-component="PipelineShift"
          x={W - 1}
          y="20"
          fontSize="12"
          textAnchor="end"
          className="fill-muted-foreground font-mono"
        >
          {t('pipeline-shift.day', { n: Math.floor(day) })}
        </text>
        <path
          id="pipeline-shift-guide"
          data-component="PipelineShift"
          d={`M ${X0 + DAYS * DAY} 66 V 210`}
          strokeWidth="1"
          strokeDasharray="3 3"
          className="stroke-muted-foreground"
          style={{ opacity: day >= DAYS ? 1 : 0 }}
        />

        {rows.map((row) => {
          const block = `pipeline-shift-${row.id}`
          const segments = [{ id: 'write', days: row.write, work: true }, ...waits.map((w) => ({ ...w, work: false }))]
          const total = segments.reduce((sum, s) => sum + s.days, 0)
          let from = 0
          return (
            <g key={row.id} id={block} data-component="PipelineShift">
              <text
                id={`${block}-label`}
                data-component="PipelineShift"
                x={X0}
                y={row.y - 10}
                fontSize="14"
                className="fill-foreground font-medium"
              >
                {t(`pipeline-shift.${row.id}`)}
              </text>
              <text
                id={`${block}-done`}
                data-component="PipelineShift"
                x={W - 16}
                y={row.y - 10}
                fontSize="14"
                textAnchor="end"
                className="fill-foreground font-mono font-medium"
              >
                {day >= total ? t('pipeline-shift.done', { n: total.toLocaleString(i18n.language) }) : ''}
              </text>
              {segments.map((segment) => {
                const x = X0 + from * DAY
                const w = segment.days * DAY
                from += segment.days
                const days =
                  segment.days === 0.5 ? t('pipeline-shift.half-day') : t('pipeline-shift.days', { n: segment.days })
                const name = t(`pipeline-shift.${segment.id}`)
                return (
                  <g key={segment.id} id={`${block}-${segment.id}`} data-component="PipelineShift">
                    <rect
                      id={`${block}-${segment.id}-block`}
                      data-component="PipelineShift"
                      x={x + 1.5}
                      y={row.y}
                      width={Math.max(4, w - 3)}
                      height={H}
                      rx="6"
                      strokeWidth="1.5"
                      strokeDasharray={segment.work ? undefined : '5 4'}
                      className={segment.work ? 'fill-primary stroke-primary' : 'fill-background stroke-primary/50'}
                    />
                    {w > 60 ? (
                      <>
                        <text
                          id={`${block}-${segment.id}-name`}
                          data-component="PipelineShift"
                          x={x + w / 2}
                          y={row.y + 19}
                          fontSize="12"
                          textAnchor="middle"
                          className={segment.work ? 'fill-primary-foreground' : 'fill-foreground'}
                        >
                          {name}
                        </text>
                        <text
                          id={`${block}-${segment.id}-days`}
                          data-component="PipelineShift"
                          x={x + w / 2}
                          y={row.y + 34}
                          fontSize="12"
                          textAnchor="middle"
                          className={
                            segment.work ? 'fill-primary-foreground font-semibold' : 'fill-foreground font-semibold'
                          }
                        >
                          {days}
                        </text>
                      </>
                    ) : (
                      /* too narrow to hold its own name, which is the point: it is the agent's writing */
                      <>
                        <path
                          id={`${block}-${segment.id}-tick`}
                          data-component="PipelineShift"
                          d={`M ${x + w / 2} ${row.y + H + 2} V ${row.y + H + 8}`}
                          strokeWidth="1.5"
                          className="stroke-primary/50"
                        />
                        <text
                          id={`${block}-${segment.id}-name`}
                          data-component="PipelineShift"
                          x={x}
                          y={row.y + H + 22}
                          fontSize="12"
                          className="fill-foreground font-semibold"
                        >
                          {`${name}: ${days}`}
                        </text>
                      </>
                    )}
                  </g>
                )
              })}
              <circle
                id={`${block}-dot`}
                data-component="PipelineShift"
                cx={X0 + Math.min(day, total) * DAY}
                cy={row.y + H}
                r="6"
                className="fill-primary"
              />
            </g>
          )
        })}

        <text
          id="pipeline-shift-takeaway"
          data-component="PipelineShift"
          x={X0}
          y="262"
          fontSize="14"
          className="fill-foreground"
          style={{ opacity: now >= START + PLAY ? 1 : 0 }}
        >
          {t('pipeline-shift.takeaway')}
        </text>
      </svg>
      <StoryToggle id="pipeline-shift" component="PipelineShift" story={story} />

      <figcaption
        id="pipeline-shift-caption"
        data-deck="hide"
        data-component="PipelineShift"
        className="text-muted-foreground text-xs"
      >
        {t('pipeline-shift.caption')}
      </figcaption>
    </figure>
  )
}
