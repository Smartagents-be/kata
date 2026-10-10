import { useId } from 'react'
import { useTranslation } from 'react-i18next'

/**
 * Two authors, one gate. Your work and an agent's work arrive on the same line, pass the same four
 * groups of checks, and only then ship. That merge is the whole drawing, and it is what the
 * `Quality gates` section of `gates` claims in words: the gates that put a quality label on
 * software before are the ones that go around an agent's work now, unchanged.
 *
 * It sits at the `data-figure="same-gate"` slot after `gates.quality-gates.1`, and **nothing
 * after it reads the drawing**, so the two author labels and the note under the frame carry it.
 * The paragraph above earns it rather than captioning it: the prose names three checks and then
 * turns to the proxy claim, which is an argument this figure deliberately does not make. The groups
 * in the box are the ones `Deterministic checks` lists further down, so the figure previews that
 * list rather than repeating the paragraph.
 *
 * **The two arrows merge before the gate rather than each getting one.** Two gates side by side
 * would say the checks are comparable; one gate with two ways in says they are the same gate, which
 * is the sentence the section adds. It is also why neither author is a box: a border means
 * containment here (`RunSheet`'s rule), and who typed the code is not a container.
 *
 * **The gate is the only teal thing**, on the step's rule that teal is what the shape adds.
 * `GoalGate` in `goals` colours its gate the same way and that is deliberate rather than drift: a
 * gate is a gate in both units. What keeps them apart is the structure. `GoalGate` is a row with a
 * return path, and it argues that a goal's only exit is a command answering yes. This one has no
 * loop and no command in it, and argues who the gate is for.
 *
 * **It names four groups and ranks none of them.** Which metric is cheap to fake and which is not
 * is the discovery the `workshop` honest flag is built on, kept behind that board's Hint, so a teal
 * ring around one row, or coverage and mutation on two rows where one sits above the other, would
 * spend the capstone here. Coverage and mutation share a row, and the rows are equals, for exactly
 * that reason.
 */

/** Right edge of the author labels, so both end on one column whatever the language does to them. */
const LABEL_R = 128
const ARROW_X0 = 138
/** Where the two ways in become one line. */
const JUNCTION_X = 198

const GATE_X = 240
const GATE_W = 228
const GATE_Y = 26
const GATE_H = 128

const MID_Y = 90
const YOU_Y = 58
const AGENT_Y = 122

/** So an arrowhead reads as arriving at a box rather than touching it. */
const STANDOFF = 7

/**
 * The four groups of checks, top to bottom, in the order `Deterministic checks` lists them: tests,
 * the numbers about the tests, the code, and what you ship. Coverage and mutation share a row so
 * neither sits above the other.
 */
const CHECKS = ['tests', 'test-quality', 'code', 'supply'] as const
/** Row spacing inside the gate, chosen so four rows sit centred on `MID_Y`. */
const ROW = 26

export function SameGate() {
  const { t } = useTranslation('step2')
  const titleId = useId()
  const arrowId = `same-gate-arrow-${useId().replace(/:/g, '')}`

  return (
    <figure id="same-gate" data-component="SameGate" className="my-8 flex justify-center">
      <svg
        id="same-gate-svg"
        data-component="SameGate"
        viewBox="0 0 640 200"
        role="img"
        aria-labelledby={titleId}
        className="h-auto w-full max-w-2xl"
      >
        <title id={titleId} data-component="SameGate">
          {t('same-gate.description')}
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
        </defs>

        <text
          id="same-gate-you"
          data-component="SameGate"
          x={LABEL_R}
          y={YOU_Y + 5}
          fontSize="14"
          textAnchor="end"
          className="fill-foreground"
        >
          {t('same-gate.you')}
        </text>
        <text
          id="same-gate-agent"
          data-component="SameGate"
          x={LABEL_R}
          y={AGENT_Y + 5}
          fontSize="14"
          textAnchor="end"
          className="fill-foreground"
        >
          {t('same-gate.agent')}
        </text>

        {/* Two ways in, joined before the gate. Only the merged line carries an arrowhead. */}
        <path
          id="same-gate-you-line"
          data-component="SameGate"
          d={`M ${ARROW_X0} ${YOU_Y} H ${JUNCTION_X}`}
          fill="none"
          strokeWidth="1.5"
          className="stroke-muted-foreground/70"
        />
        <path
          id="same-gate-agent-line"
          data-component="SameGate"
          d={`M ${ARROW_X0} ${AGENT_Y} H ${JUNCTION_X}`}
          fill="none"
          strokeWidth="1.5"
          className="stroke-muted-foreground/70"
        />
        <path
          id="same-gate-join"
          data-component="SameGate"
          d={`M ${JUNCTION_X} ${YOU_Y} V ${AGENT_Y}`}
          fill="none"
          strokeWidth="1.5"
          className="stroke-muted-foreground/70"
        />
        <path
          id="same-gate-into"
          data-component="SameGate"
          d={`M ${JUNCTION_X} ${MID_Y} H ${GATE_X - STANDOFF}`}
          fill="none"
          strokeWidth="1.5"
          markerEnd={`url(#${arrowId})`}
          className="stroke-muted-foreground/70"
        />

        <rect
          id="same-gate-gate"
          data-component="SameGate"
          x={GATE_X}
          y={GATE_Y}
          width={GATE_W}
          height={GATE_H}
          rx="8"
          strokeWidth="2"
          className="fill-primary/10 stroke-primary"
        />
        {CHECKS.map((check, index) => (
          <text
            key={check}
            id={`same-gate-check-${index}`}
            data-component="SameGate"
            x={GATE_X + GATE_W / 2}
            y={MID_Y - (ROW * (CHECKS.length - 1)) / 2 + index * ROW + 5}
            fontSize="13"
            textAnchor="middle"
            className="fill-foreground"
          >
            {t(`same-gate.${check}`)}
          </text>
        ))}

        <path
          id="same-gate-out"
          data-component="SameGate"
          d={`M ${GATE_X + GATE_W + STANDOFF} ${MID_Y} H ${GATE_X + GATE_W + 70}`}
          fill="none"
          strokeWidth="1.5"
          markerEnd={`url(#${arrowId})`}
          className="stroke-muted-foreground/70"
        />
        <text
          id="same-gate-ship"
          data-component="SameGate"
          x={GATE_X + GATE_W + 80}
          y={MID_Y + 5}
          fontSize="14"
          className="fill-foreground"
        >
          {t('same-gate.ship')}
        </text>

        <text
          id="same-gate-note"
          data-component="SameGate"
          x={GATE_X + GATE_W / 2}
          y={GATE_Y + GATE_H + 24}
          fontSize="13"
          textAnchor="middle"
          className="fill-muted-foreground"
        >
          {t('same-gate.note')}
        </text>
      </svg>
    </figure>
  )
}
