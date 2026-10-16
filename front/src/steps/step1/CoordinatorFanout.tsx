import { useId } from 'react'
import { useTranslation } from 'react-i18next'
import { StoryToggle } from '@/shared/motion/StoryToggle'
import { beat, cubic, glide, useStory } from '@/shared/motion/useStory'

/**
 * A fresh-worker example. Solid bars mark the coordinator context and delegated briefs;
 * dashed space marks context still to gather, not absence of system or project instructions.
 * Forked workers can inherit history. The caption carries that qualification for guided mode.
 *
 * The vocabulary is shared with ReflectionLoop: a teal frame is a context, a bar is something in
 * it, dashes are what is not.
 *
 * **It plays the hand-off on `useStory`'s clock** (October 2026, at the owner's asking): a brief goes
 * down each arrow, each sub-agent reads into its own context, and only its answer comes back up and
 * lands as one short bar in the coordinator. Two things in it were corrected at the owner's asking
 * and are load bearing. **The sub-agents finish at different times**, because they have different
 * amounts of work, and each answer arrives as its worker finishes; that is Claude Code's default in
 * an interactive session, where sub-agents run in the background and "A background subagent's
 * results reach Claude as a completion notification in a later turn" (code.claude.com/docs/en/
 * sub-agents, read 12 October 2026). **The answers stack under each other** in the coordinator, in
 * arrival order. The last frame, which is what reduced motion shows, is three answers up top and
 * three emptied workers below.
 */

/** Each worker's share of the reading: how many results it reads, how long each takes, what it cost. */
const WORK = [
  { reads: 4, step: 520, tokens: 18 },
  { reads: 6, step: 680, tokens: 26 },
  { reads: 3, step: 360, tokens: 12 },
] as const
const DOWN = 900
const SETTLE = 500
const UP = 1100
const finish = WORK.map((w) => DOWN + w.reads * w.step + SETTLE)
/** The order the answers arrive in, which is the order the workers finish. */
const ARRIVAL = [0, 1, 2].sort((a, b) => finish[a] - finish[b])
const LENGTH = Math.max(...finish) + UP + 600

/** The three hand-off curves, top to bottom; a brief travels them down and an answer travels them up. */
const HANDOFF = [
  [[250, 160], [250, 192], [105, 190], [105, 214]],
  [[320, 160], [320, 176], [320, 198], [320, 214]],
  [[390, 160], [390, 192], [535, 190], [535, 214]],
] as const

export function CoordinatorFanout() {
  const { t } = useTranslation('step1')
  const [ref, now, story] = useStory<SVGSVGElement>(LENGTH, 3000)
  const titleId = useId()
  const arrowId = `coordinator-fanout-arrow-${useId().replace(/:/g, '')}`

  // Left, middle and right sub-agent: the x of the frame and the x its arrow lands on.
  const subAgents = [15, 230, 445]

  const down = glide(now, 0, DOWN)
  const briefed = now >= DOWN

  return (
    <figure
      id="coordinator-fanout"
      data-component="CoordinatorFanout"
      className="my-8 flex flex-col items-center gap-3"
    >
      <svg
        id="coordinator-fanout-svg"
        data-component="CoordinatorFanout"
        ref={ref}
        viewBox="0 0 640 372"
        role="img"
        aria-labelledby={titleId}
        className="h-auto w-full max-w-xl"
      >
        <title id={titleId} data-component="CoordinatorFanout">
          {t('coordinator-fanout.description')}
        </title>

        <defs>
          <marker
            id={arrowId}
            viewBox="0 0 10 10"
            refX="8"
            refY="5"
            markerWidth="6"
            markerHeight="6"
            orient="auto-start-reverse"
          >
            <path d="M 0 0 L 10 5 L 0 10 z" className="fill-primary/50" />
          </marker>
        </defs>

        {/* the coordinator: the conversation and configured model in this example */}
        <rect
          id="coordinator-fanout-coordinator"
          data-component="CoordinatorFanout"
          x="110"
          y="20"
          width="420"
          height="140"
          rx="16"
          strokeWidth="2"
          className="fill-primary/10 stroke-primary/50"
        />
        <text
          id="coordinator-fanout-coordinator-label"
          data-component="CoordinatorFanout"
          x="134"
          y="52"
          fontSize="20"
          className="fill-foreground font-medium"
        >
          {t('coordinator-fanout.coordinator')}
        </text>
        <text
          id="coordinator-fanout-coordinator-rate"
          data-component="CoordinatorFanout"
          x="506"
          y="52"
          fontSize="14"
          textAnchor="end"
          className="fill-muted-foreground font-mono"
        >
          {t('coordinator-fanout.full-rate')}
        </text>
        <g className="fill-primary/35">
          {[372, 300].map((width, index) => (
            <rect
              key={width}
              id={`coordinator-fanout-coordinator-line-${index}`}
              data-component="CoordinatorFanout"
              x="134"
              y={68 + index * 20}
              width={width}
              height="10"
              rx="5"
            />
          ))}
        </g>
        {/* the answers, under each other in the order they came back */}
        {ARRIVAL.map((worker, slot) => (
          <rect
            key={worker}
            id={`coordinator-fanout-answer-${slot}`}
            data-component="CoordinatorFanout"
            x="134"
            y={112 + slot * 14}
            width={[210, 170, 190][slot]}
            height="9"
            rx="4.5"
            className="fill-primary"
            style={{ opacity: now >= finish[worker] + UP ? 1 : 0 }}
          />
        ))}

        {/* what the coordinator hands down: one prompt per part, drawn as three arrows */}
        <g
          fill="none"
          strokeWidth="2"
          markerEnd={`url(#${arrowId})`}
          className="stroke-primary/50"
        >
          {HANDOFF.map(([a, b, c, d], index) => (
            <path
              key={index}
              id={`coordinator-fanout-handoff-${index}`}
              data-component="CoordinatorFanout"
              d={`M ${a[0]} ${a[1]} C ${b[0]} ${b[1]} ${c[0]} ${c[1]} ${d[0]} ${d[1]}`}
            />
          ))}
        </g>

        {/* Delegated briefs and task context to gather; configured instructions also apply. */}
        {subAgents.map((x, index) => {
          const work = WORK[index]
          const read = Math.min(work.reads, Math.floor(Math.max(0, now - DOWN) / work.step))
          const done = now >= finish[index]
          const up = beat(now, finish[index], UP)
          const handed = now >= finish[index] + UP
          const [a, b, c, d] = HANDOFF[index]
          const [bx, by] = cubic(a, b, c, d, down)
          const [ax, ay] = cubic(d, c, b, a, up)
          return (
            <g key={x}>
              <rect
                id={`coordinator-fanout-subagent-${index}`}
                data-component="CoordinatorFanout"
                x={x}
                y="220"
                width="180"
                height="150"
                rx="14"
                strokeWidth="2"
                className="fill-primary/5 stroke-primary/40"
              />
              <text
                id={`coordinator-fanout-subagent-${index}-label`}
                data-component="CoordinatorFanout"
                x={x + 90}
                y="250"
                fontSize="17"
                textAnchor="middle"
                className="fill-foreground font-medium"
              >
                {t('coordinator-fanout.subagent')}
              </text>
              <rect
                id={`coordinator-fanout-subagent-${index}-instruction`}
                data-component="CoordinatorFanout"
                x={x + 18}
                y="262"
                width="144"
                height="10"
                rx="5"
                className="fill-primary/50"
                style={{ opacity: briefed ? 1 : 0 }}
              />
              {/* labelled once: the other two mirror it, and three copies of the same word is noise */}
              {index === 0 && (
                <text
                  id="coordinator-fanout-subagent-0-instruction-label"
                  data-component="CoordinatorFanout"
                  x={x + 90}
                  y="288"
                  fontSize="12"
                  textAnchor="middle"
                  className="fill-muted-foreground"
                  style={{ opacity: briefed ? 1 : 0 }}
                >
                  {t('coordinator-fanout.instruction')}
                </text>
              )}
              <rect
                id={`coordinator-fanout-subagent-${index}-empty`}
                data-component="CoordinatorFanout"
                x={x + 18}
                y="298"
                width="144"
                height="52"
                rx="8"
                fill="none"
                strokeWidth="1.5"
                strokeDasharray="5 5"
                className="stroke-primary/30"
              />
              <text
                id={`coordinator-fanout-subagent-${index}-empty-label`}
                data-component="CoordinatorFanout"
                x={x + 90}
                y="324"
                fontSize="14"
                textAnchor="middle"
                dominantBaseline="middle"
                className="fill-muted-foreground"
                style={{ opacity: read === 0 && !handed ? 1 : 0 }}
              >
                {t('coordinator-fanout.empty')}
              </text>
              {/* what this worker reads, in its own context and nowhere else */}
              {Array.from({ length: work.reads }, (_, k) => (
                <rect
                  key={k}
                  id={`coordinator-fanout-subagent-${index}-read-${k}`}
                  data-component="CoordinatorFanout"
                  x={x + 26}
                  y={303 + k * 7.5}
                  width={128 - (k % 3) * 24}
                  height="4.5"
                  rx="2.25"
                  className="fill-primary/35"
                  style={{ opacity: k < read && !handed ? 1 : 0 }}
                />
              ))}
              <text
                id={`coordinator-fanout-subagent-${index}-status`}
                data-component="CoordinatorFanout"
                x={x + 90}
                y="363"
                fontSize="11"
                textAnchor="middle"
                className="fill-muted-foreground font-mono"
              >
                {handed
                  ? t('coordinator-fanout.done')
                  : done
                    ? t('coordinator-fanout.read', { n: work.tokens })
                    : ''}
              </text>
              <circle
                id={`coordinator-fanout-subagent-${index}-brief`}
                data-component="CoordinatorFanout"
                cx={bx}
                cy={by}
                r="6"
                className="fill-primary"
                style={{ opacity: down > 0 && !briefed ? 1 : 0 }}
              />
              <circle
                id={`coordinator-fanout-subagent-${index}-answer`}
                data-component="CoordinatorFanout"
                cx={ax}
                cy={ay}
                r="6"
                className="fill-primary"
                style={{ opacity: up > 0 && up < 1 ? 1 : 0 }}
              />
            </g>
          )
        })}
      </svg>
      <StoryToggle id="coordinator-fanout" component="CoordinatorFanout" story={story} className="max-w-xl" />
      <figcaption
        id="coordinator-fanout-caption"
        data-deck="hide"
        data-component="CoordinatorFanout"
        className="text-muted-foreground w-full max-w-3xl text-xs"
      >
        {t('coordinator-fanout.refetch')}
      </figcaption>
    </figure>
  )
}
