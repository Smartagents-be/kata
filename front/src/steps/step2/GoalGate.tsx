import { useId } from 'react'
import { useTranslation } from 'react-i18next'
import { StoryToggle } from '@/shared/motion/StoryToggle'
import { beat, glide, useStory } from '@/shared/motion/useStory'

/**
 * The loop a goal actually runs: a pass, then the command you named, and the only way out of it is
 * that command answering yes. Red goes back in, green reports. The gate is the whole figure, which
 * is why it is the only teal box: what the section adds is that the exit is a command rather than an
 * opinion, and a goal whose check is "cleaner code" has no box to draw here at all.
 *
 * It closes `A goal and its check` in `enablement`, at the `data-figure="goal-gate"` slot, and came
 * there from the cut `goals` unit in October 2026. Nothing under it reads it back, so the two arrow
 * labels and the line inside the gate carry it.
 *
 * **The gate carries the waiting**, in its own second line rather than in a note beside the figure:
 * most of a run that takes hours is the test suite, and since `goals` went, this line is the only
 * place that claim is made. It is drawn as a property of the box and never as a band of time, since
 * `LoopsPerHour` in `enablement` owns the clock.
 *
 * `mvn verify` is a literal rather than a locale key, on `WorktreeEach`'s rule: a command is not
 * translated.
 *
 * **It plays the loop on `useStory`'s clock** (October 2026, at the owner's asking): a dot leaves the
 * agent's box, the gate runs, and the dot goes back along the red path twice before the third
 * attempt goes green and out to the report. The repetition is the argument: the agent does not stop
 * because it thinks it is done, it stops because the command says so, and a still drawing showed one
 * arrow back where a run takes many. The first box says what the agent does ("changes the code")
 * rather than "the agent's pass", which read as nothing in Dutch. Red is `--destructive` because a
 * red run is a failed check, which is what that token means; reduced motion shows the green end.
 */
const BOX_W = 170
const BOX_H = 74
const BOX_Y = 40
const GAP = 64
const X0 = 1
const GATE_X = X0 + BOX_W + GAP
const LAST_X = GATE_X + BOX_W + GAP
/** So an arrowhead reads as arriving at a box rather than touching it. */
const STANDOFF = 7
/** How far under the row the return path runs before it turns back. */
const RETURN_Y = 158

/** Three attempts, two red and one green. All times in ms on the story clock. */
const FIRST = 300
const TRY = 4200
const TO_GATE = 600
const CHECK = 1400
const VERDICT = 300
const BACK = 1500
const OUT = 600
const LENGTH = FIRST + 2 * TRY + TO_GATE + CHECK + VERDICT + OUT + 300

/** A point `k` of the way along a path of straight segments. */
function along(points: readonly (readonly [number, number])[], k: number) {
  const lengths = points.slice(1).map((p, i) => Math.hypot(p[0] - points[i][0], p[1] - points[i][1]))
  let left = k * lengths.reduce((a, b) => a + b, 0)
  for (let i = 0; i < lengths.length; i++) {
    if (left <= lengths[i] || i === lengths.length - 1) {
      const f = lengths[i] ? Math.min(1, left / lengths[i]) : 0
      const [a, b] = [points[i], points[i + 1]]
      return [a[0] + (b[0] - a[0]) * f, a[1] + (b[1] - a[1]) * f] as const
    }
    left -= lengths[i]
  }
  return points[points.length - 1]
}

export function GoalGate() {
  const { t } = useTranslation('step2')
  const titleId = useId()
  const base = useId().replace(/:/g, '')
  // Two markers rather than one, because the way out is teal and its head has to be too. A single
  // muted head on a teal line reads as the arrow stopping short of the box it points at.
  const arrowId = `goal-gate-arrow-${base}`
  const greenArrowId = `goal-gate-green-arrow-${base}`
  const midY = BOX_Y + BOX_H / 2
  const [ref, now, story] = useStory<SVGSVGElement>(LENGTH, 3000)

  /* Where the story is: which attempt, and which leg of it. */
  const attempt = Math.min(2, Math.max(0, Math.floor((now - FIRST) / TRY)))
  const a0 = FIRST + attempt * TRY
  const green = attempt === 2
  const going = glide(now, a0, TO_GATE)
  const checking = now >= a0 + TO_GATE && now < a0 + TO_GATE + CHECK
  const progress = beat(now, a0 + TO_GATE, CHECK)
  const decided = now >= a0 + TO_GATE + CHECK
  const leaving = beat(now, a0 + TO_GATE + CHECK + VERDICT, green ? OUT : BACK)
  const reported = green && leaving >= 1
  const back = [
    [GATE_X + BOX_W / 2, BOX_Y + BOX_H],
    [GATE_X + BOX_W / 2, RETURN_Y],
    [X0 + BOX_W / 2, RETURN_Y],
    [X0 + BOX_W / 2, BOX_Y + BOX_H],
  ] as const
  const [dx, dy] = !decided
    ? [X0 + BOX_W + (GATE_X - X0 - BOX_W) * going, midY]
    : green
      ? [GATE_X + BOX_W + (LAST_X - GATE_X - BOX_W) * leaving, midY]
      : along(back, leaving)
  const dotOn = now >= FIRST && !checking && !(decided && (leaving === 0 || leaving >= 1))

  return (
    <figure id="goal-gate" data-component="GoalGate" className="my-8 flex flex-col items-center gap-2">
      <svg
        id="goal-gate-svg"
        data-component="GoalGate"
        ref={ref}
        viewBox="0 0 640 214"
        role="img"
        aria-labelledby={titleId}
        className="h-auto w-full max-w-2xl"
      >
        <title id={titleId} data-component="GoalGate">
          {t('goal-gate.description')}
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
            <path d="M 0 0 L 10 5 L 0 10 z" className="fill-muted-foreground/70" />
          </marker>
          <marker
            id={greenArrowId}
            viewBox="0 0 10 10"
            refX="8"
            refY="5"
            markerWidth="6"
            markerHeight="6"
            orient="auto-start-reverse"
          >
            <path d="M 0 0 L 10 5 L 0 10 z" className="fill-primary" />
          </marker>
        </defs>

        <rect
          id="goal-gate-pass"
          data-component="GoalGate"
          x={X0}
          y={BOX_Y}
          width={BOX_W}
          height={BOX_H}
          rx="8"
          strokeWidth="1.5"
          className="fill-background stroke-muted-foreground/60"
        />
        <text
          id="goal-gate-pass-label-0"
          data-component="GoalGate"
          x={X0 + BOX_W / 2}
          y={midY - 4}
          fontSize="14"
          textAnchor="middle"
          className="fill-foreground"
        >
          {t('goal-gate.pass.1')}
        </text>
        <text
          id="goal-gate-pass-label-1"
          data-component="GoalGate"
          x={X0 + BOX_W / 2}
          y={midY + 14}
          fontSize="14"
          textAnchor="middle"
          className="fill-foreground"
        >
          {t('goal-gate.pass.2')}
        </text>

        {/* The gate. Teal, because the command is what this section adds, and two lines because the
            second one is where the four hours go. */}
        <rect
          id="goal-gate-check"
          data-component="GoalGate"
          x={GATE_X}
          y={BOX_Y}
          width={BOX_W}
          height={BOX_H}
          rx="8"
          strokeWidth={checking ? 3.5 : 2}
          className="fill-primary/10 stroke-primary"
        />
        <rect
          id="goal-gate-check-progress"
          data-component="GoalGate"
          x={GATE_X + 16}
          y={BOX_Y + BOX_H - 9}
          width={(BOX_W - 32) * progress}
          height="4"
          rx="2"
          className="fill-primary"
          style={{ opacity: checking ? 1 : 0 }}
        />
        <text
          id="goal-gate-check-verdict"
          data-component="GoalGate"
          x={GATE_X + BOX_W / 2}
          y={BOX_Y - 12}
          fontSize="13"
          fontWeight="600"
          textAnchor="middle"
          className={green ? 'fill-primary' : 'fill-destructive'}
          style={{ opacity: decided ? 1 : 0 }}
        >
          {green ? t('goal-gate.green') : t('goal-gate.red-verdict')}
        </text>
        <text
          id="goal-gate-check-command"
          data-component="GoalGate"
          x={GATE_X + BOX_W / 2}
          y={midY - 2}
          fontSize="14"
          textAnchor="middle"
          className="fill-foreground font-mono"
        >
          mvn verify
        </text>
        <text
          id="goal-gate-check-wait"
          data-component="GoalGate"
          x={GATE_X + BOX_W / 2}
          y={midY + 20}
          fontSize="12"
          textAnchor="middle"
          className="fill-muted-foreground"
        >
          {t('goal-gate.wait')}
        </text>

        <rect
          id="goal-gate-report"
          data-component="GoalGate"
          x={LAST_X}
          y={BOX_Y}
          width={BOX_W}
          height={BOX_H}
          rx="8"
          strokeWidth={reported ? 2 : 1.5}
          className={reported ? 'fill-primary/10 stroke-primary' : 'fill-background stroke-muted-foreground/60'}
        />
        <text
          id="goal-gate-report-label"
          data-component="GoalGate"
          x={LAST_X + BOX_W / 2}
          y={midY + 5}
          fontSize="14"
          textAnchor="middle"
          className="fill-foreground"
        >
          {t('goal-gate.report')}
        </text>

        <path
          id="goal-gate-into-check"
          data-component="GoalGate"
          d={`M ${X0 + BOX_W + STANDOFF} ${midY} H ${GATE_X - STANDOFF}`}
          fill="none"
          strokeWidth="1.5"
          markerEnd={`url(#${arrowId})`}
          className="stroke-muted-foreground/70"
        />

        <path
          id="goal-gate-green"
          data-component="GoalGate"
          d={`M ${GATE_X + BOX_W + STANDOFF} ${midY} H ${LAST_X - STANDOFF}`}
          fill="none"
          strokeWidth="2"
          markerEnd={`url(#${greenArrowId})`}
          className="stroke-primary"
        />
        <text
          id="goal-gate-green-label"
          data-component="GoalGate"
          x={GATE_X + BOX_W + GAP / 2}
          y={midY - 14}
          fontSize="13"
          textAnchor="middle"
          className="fill-primary"
        >
          {t('goal-gate.green')}
        </text>

        {/* Back in on whatever failed, which is where a run spends nearly all of its passes. */}
        <path
          id="goal-gate-red"
          data-component="GoalGate"
          d={`M ${GATE_X + BOX_W / 2} ${BOX_Y + BOX_H + STANDOFF} V ${RETURN_Y} H ${X0 + BOX_W / 2} V ${BOX_Y + BOX_H + STANDOFF}`}
          fill="none"
          strokeWidth="1.5"
          markerEnd={`url(#${arrowId})`}
          className="stroke-muted-foreground/70"
        />
        <text
          id="goal-gate-red-label"
          data-component="GoalGate"
          x={(GATE_X + BOX_W / 2 + X0 + BOX_W / 2) / 2}
          y={RETURN_Y + 22}
          fontSize="13"
          textAnchor="middle"
          className="fill-muted-foreground"
        >
          {t('goal-gate.red')}
        </text>

        <circle
          id="goal-gate-dot"
          data-component="GoalGate"
          cx={dx}
          cy={dy}
          r="8"
          className={decided && !green ? 'fill-destructive' : 'fill-primary'}
          style={{ opacity: dotOn ? 1 : 0 }}
        />
        <text
          id="goal-gate-attempt"
          data-component="GoalGate"
          x={X0}
          y="208"
          fontSize="13"
          className="fill-muted-foreground font-mono"
        >
          {t('goal-gate.attempt', { n: attempt + 1 })}
        </text>
      </svg>
      <StoryToggle id="goal-gate" component="GoalGate" story={story} className="max-w-2xl" />
    </figure>
  )
}
