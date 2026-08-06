import { useId } from 'react'
import { useTranslation } from 'react-i18next'

/**
 * The loop a goal actually runs: a pass, then the command you named, and the only way out of it is
 * that command answering yes. Red goes back in, green reports. The gate is the whole figure, which
 * is why it is the only teal box: what the section adds is that the exit is a command rather than an
 * opinion, and a goal whose check is "cleaner code" has no box to draw here at all.
 *
 * It closes `The check is the exit` in `goals`, at the `data-figure="goal-gate"` slot. Nothing under
 * it reads it back, so the two arrow labels and the line inside the gate carry it.
 *
 * **The gate carries the waiting**, in its own second line rather than in a note beside the figure:
 * the section after it argues that most of a four-hour run is the test suite, and this is where that
 * claim is drawn. It is drawn as a property of the box and never as a band of time, since
 * `LoopsPerHour` in `enablement` owns the clock.
 *
 * `mvn verify` is a literal rather than a locale key, on `WorktreeEach`'s rule: a command is not
 * translated.
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

export function GoalGate() {
  const { t } = useTranslation('step2')
  const titleId = useId()
  const base = useId().replace(/:/g, '')
  // Two markers rather than one, because the way out is teal and its head has to be too. A single
  // muted head on a teal line reads as the arrow stopping short of the box it points at.
  const arrowId = `goal-gate-arrow-${base}`
  const greenArrowId = `goal-gate-green-arrow-${base}`
  const midY = BOX_Y + BOX_H / 2

  return (
    <figure id="goal-gate" data-component="GoalGate" className="my-8 flex justify-center">
      <svg
        id="goal-gate-svg"
        data-component="GoalGate"
        viewBox="0 0 640 204"
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
          id="goal-gate-pass-label"
          data-component="GoalGate"
          x={X0 + BOX_W / 2}
          y={midY + 5}
          fontSize="14"
          textAnchor="middle"
          className="fill-foreground"
        >
          {t('goal-gate.pass')}
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
          strokeWidth="2"
          className="fill-primary/10 stroke-primary"
        />
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
          strokeWidth="1.5"
          className="fill-background stroke-muted-foreground/60"
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
      </svg>
    </figure>
  )
}
