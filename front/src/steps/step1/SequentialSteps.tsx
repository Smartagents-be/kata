import { useId } from 'react'
import { useTranslation } from 'react-i18next'
import { StoryToggle } from '@/shared/motion/StoryToggle'
import { beat, useStory } from '@/shared/motion/useStory'

/**
 * The sequential workflow as it is run: the agent writes a plan with three tasks into `plan.md`,
 * then works through them one at a time in one session, each task ending on a test. The session's
 * context fills with every task, and after the second one it is full. A fresh session starts empty,
 * reads the plan, and does the third task. It sits under `agent-patterns.sequential.1` and `.2`.
 *
 * **It was redrawn in October 2026, at the owner's asking**, because "stop here, pick it up later"
 * and "no room for step 4" said nothing without context. What makes stopping possible is the plan
 * being a file, which neither the old drawing nor the old text said: it is plan-and-execute
 * ("devising a plan to divide the entire task into smaller subtasks, and then carrying out the
 * subtasks according to the plan", Plan-and-Solve, arXiv 2305.04091) with the plan kept as an
 * artifact, which is Claude Code's own advice: "start a fresh session to execute it ... you have a
 * written spec to reference" (code.claude.com/docs/en/best-practices). So the fresh session's first
 * bar is the plan, drawn coming from the file along the line over the top.
 *
 * On the step's vocabulary: a teal frame is a context, a bar is something in it; the solid bars are
 * the plan and each task's test. It plays on `useStory`'s clock with a pause button, and reduced
 * motion shows the last frame: all three tasks ticked, session 1 full, session 2 holding the plan
 * and the third task. `plan.md` is a file name and is not translated.
 */
const TASK_BARS = [120, 90, 136, 70]
const BAR = 260
const TASK = TASK_BARS.length * BAR + 300 + 500

const PLAN_AT = 500
const ROWS_AT = [800, 1050, 1300]
const T1 = 1800
const T2 = T1 + TASK
const FULL = T2 + TASK
const SECOND = FULL + 900
const READ = SECOND + 500
const SECOND_PLAN = READ + 500
const T3 = SECOND_PLAN + 700
const LENGTH = T3 + TASK + 400

/** The bars one session has taken in by `now`: the plan, then each of its tasks' reads and test. */
function sessionBars(now: number, planAt: number, tasks: number[]) {
  const bars: { w: number; solid: boolean }[] = []
  if (now >= planAt) bars.push({ w: 110, solid: true })
  for (const start of tasks) {
    TASK_BARS.forEach((w, k) => {
      if (now >= start + k * BAR) bars.push({ w, solid: false })
    })
    if (now >= start + TASK_BARS.length * BAR) bars.push({ w: 50, solid: true })
  }
  return bars
}

export function SequentialSteps() {
  const { t } = useTranslation('step1')
  const [ref, now, story] = useStory<SVGSVGElement>(LENGTH, 3000)
  const titleId = useId()

  const taskStarts = [T1, T2, T3]
  const ticked = (i: number) => now >= taskStarts[i] + TASK_BARS.length * BAR + 300
  const active = (i: number) => now >= taskStarts[i] && !ticked(i)
  const sessions = [
    { x: 230, label: t('sequential-steps.session', { n: 1 }), shown: 1, bars: sessionBars(now, PLAN_AT, [T1, T2]) },
    { x: 420, label: t('sequential-steps.session', { n: 2 }), shown: beat(now, SECOND, 400), bars: sessionBars(now, SECOND_PLAN, [T3]) },
  ]
  const full = beat(now, FULL, 400)
  const read = beat(now, READ, 400)

  return (
    <figure id="sequential-steps" data-component="SequentialSteps" className="my-8 flex flex-col items-center gap-2">
      <svg
        id="sequential-steps-svg"
        data-component="SequentialSteps"
        ref={ref}
        viewBox="0 0 600 252"
        role="img"
        aria-labelledby={titleId}
        className="h-auto w-full max-w-xl"
      >
        <title id={titleId} data-component="SequentialSteps">
          {t('sequential-steps.description')}
        </title>

        {/* the plan, as a file: what lets a later session carry on */}
        <rect
          id="sequential-steps-plan"
          data-component="SequentialSteps"
          x="10"
          y="34"
          width="170"
          height="150"
          rx="10"
          strokeWidth="1.5"
          className="fill-background stroke-border"
        />
        <text id="sequential-steps-plan-name" data-component="SequentialSteps" x="26" y="60" fontSize="14" className="fill-foreground font-mono font-semibold">
          plan.md
        </text>
        {ROWS_AT.map((at, i) => (
          <g key={i} id={`sequential-steps-task-${i}`} data-component="SequentialSteps" style={{ opacity: now >= at ? 1 : 0 }}>
            <rect
              id={`sequential-steps-task-${i}-row`}
              data-component="SequentialSteps"
              x="22"
              y={76 + i * 32}
              width="146"
              height="24"
              rx="5"
              strokeWidth="2"
              className={active(i) ? 'fill-none stroke-primary' : 'fill-none stroke-transparent'}
            />
            <text
              id={`sequential-steps-task-${i}-mark`}
              data-component="SequentialSteps"
              x="32"
              y={93 + i * 32}
              fontSize="14"
              className={ticked(i) ? 'fill-primary font-mono' : 'fill-muted-foreground font-mono'}
            >
              {ticked(i) ? '✓' : '☐'}
            </text>
            <text id={`sequential-steps-task-${i}-name`} data-component="SequentialSteps" x="52" y={93 + i * 32} fontSize="13" className="fill-foreground">
              {t('sequential-steps.task', { n: i + 1 })}
            </text>
          </g>
        ))}

        {sessions.map((session, s) => (
          <g key={s} id={`sequential-steps-session-${s}`} data-component="SequentialSteps" style={{ opacity: session.shown }}>
            <rect
              id={`sequential-steps-session-${s}-frame`}
              data-component="SequentialSteps"
              x={session.x}
              y="34"
              width="170"
              height="196"
              rx="12"
              strokeWidth="1.5"
              className="fill-primary/10 stroke-primary"
            />
            <text id={`sequential-steps-session-${s}-name`} data-component="SequentialSteps" x={session.x + 16} y="58" fontSize="14" className="fill-foreground font-semibold">
              {session.label}
            </text>
            {session.bars.map((bar, k) => (
              <rect
                key={k}
                id={`sequential-steps-session-${s}-bar-${k}`}
                data-component="SequentialSteps"
                x={session.x + 14}
                y={70 + k * 13}
                width={bar.w}
                height="8"
                rx="4"
                className={bar.solid ? 'fill-primary' : 'fill-primary/40'}
              />
            ))}
          </g>
        ))}

        <text
          id="sequential-steps-full"
          data-component="SequentialSteps"
          x="315"
          y="246"
          fontSize="12"
          textAnchor="middle"
          className="fill-muted-foreground"
          style={{ opacity: full }}
        >
          {t('sequential-steps.full')}
        </text>
        {/* the fresh session's first read is the plan file */}
        <path
          id="sequential-steps-read"
          data-component="SequentialSteps"
          d="M 95 34 V 18 H 505 V 30"
          fill="none"
          strokeWidth="1.5"
          strokeDasharray="5 4"
          className="stroke-primary"
          style={{ opacity: read }}
        />
        <text
          id="sequential-steps-read-label"
          data-component="SequentialSteps"
          x="300"
          y="13"
          fontSize="11"
          textAnchor="middle"
          className="fill-primary"
          style={{ opacity: read }}
        >
          {t('sequential-steps.reads-plan')}
        </text>
      </svg>
      <StoryToggle id="sequential-steps" component="SequentialSteps" story={story} className="max-w-xl" />
    </figure>
  )
}
