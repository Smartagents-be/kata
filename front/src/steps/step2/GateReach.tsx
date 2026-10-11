import { useId } from 'react'
import { useTranslation } from 'react-i18next'

/**
 * One change on its way out, and the four gates it passes: after every change, when the agent says
 * it is done, before the merge and before the release. Drawn as a ladder: 1 column per gate, a
 * chevron between each so the order reads as a sequence, and 3 rows. What runs there, how long the
 * answer takes, and where a mistake already is by the time it comes.
 *
 * **A gate is named for its moment, with the tool set back under it** (`tests`, `mvn verify`, `CI`,
 * none at the release, where a person decides). Until October 2026 the names were the tools ("agent
 * loop", "mvn verify"), and the course owner found the figure did not explain itself: nothing said
 * the columns were a sequence, "agent loop" and "mvn verify" read as the same thing because the
 * agent runs both, and "a miss is already in 1 file / your worktree" was too fine a distinction.
 * The reach row now says 1 file, your change, a pull request, main, and the arrow's label is the
 * lesson rather than the observation. A version without the checks row was rejected as too little.
 *
 * **Speed and reach are one axis, and the arrow under the ladder is that axis.** The further right a
 * gate sits, the slower it answers and the more a miss has already touched. That is the claim
 * `short-feedback-loops.1` closes on: a fast gate is one close enough to the left that the agent
 * runs it inside its own loop, and the later a gate answers, the further a mistake has got. The unit
 * had a `Blast radius` section for the second half until October 2026; it was cut, and this figure
 * is now where how far a miss gets is drawn. The cells of the last row
 * darken left to right for that reason, and **they may not be drawn equal**: equal cells say every
 * gate costs the same to miss, which is the opposite claim.
 *
 * It replaced a band of 5 widening regions with the gates on the seams between them (October 2026).
 * The course owner could not read that one: the rows were implicit, the region a gate stood next to
 * had to be inferred, and its time row mixed durations with "a person". **Every row is labelled now,
 * and each row holds 1 kind of answer.** The release answers in days and its check is a
 * person deciding, so the person sits in the checks row and the time row stays a time.
 *
 * **The gates are the only teal thing**, on the step's rule that teal is what the shape adds, and
 * `SameGate` colours its own the same way. It closes the `short-feedback-loops` section and nothing
 * after it reads it back, so the arrow's label carries the claim. Do not add a number to any gate:
 * the times are orders of magnitude on purpose, because the student's own build is the measurement
 * and `GateWalk` under the unit asks for it.
 *
 * **The checks row lists what usually runs at each gate, plus your review at the merge and a person
 * deciding at the release**: unit
 * tests, the consumer side of a contract and the architecture rules in the agent's loop;
 * integration, coverage and mutation, the static rules and the secret scan when it says it is done;
 * Sonar, the CVE scan, the provider side of the contracts and your review before the merge. A check
 * is worth more the further left it can run, which is what `deterministic-checks.2` says about
 * Sonar. Coverage and mutation share 1 entry, as they share a row in `SameGate`, so nothing here
 * ranks the two. The secret scan sits at `mvn verify` although it is a pre-commit hook, because the
 * hook runs at the same moment: when the agent says it is done.
 *
 * **On a phone it is too small to read.** The 748-wide viewBox scales to about 300px at 375px, so
 * the 11px check labels land near 4px. The columns are 142 wide because "when the agent is done"
 * otherwise runs into the chevrons beside it. That is the same trade every wide SVG in the course makes,
 * and the `<title>` carries the whole ladder in words for anyone who cannot read it; a DOM fallback
 * below `sm` is the fix if the phone becomes a target.
 */
const GATES = ['loop', 'done', 'merge', 'release'] as const
type Gate = (typeof GATES)[number]
/** The tool under each gate's name. The release has none: a person decides there. */
const TOOLS: Partial<Record<Gate, string>> = {
  loop: 'tests',
  done: 'mvn verify',
  merge: 'CI',
}
/** The checks listed under each gate, top to bottom. Keys under `gate-reach.check.*`. */
const CHECKS: Record<Gate, readonly string[]> = {
  loop: ['unit', 'consumer-pacts', 'architecture'],
  done: ['integration', 'test-quality', 'static-rules', 'secrets'],
  merge: ['sonar', 'cve', 'provider-pacts', 'review'],
  release: ['person'],
}
/** Where a mistake already is when each gate answers. Keys under `gate-reach.reach.*`. */
const REACH: Record<Gate, string> = {
  loop: 'file',
  done: 'change',
  merge: 'pull-request',
  release: 'main',
}
/** Darker the further out, as a class each so the ramp is a token and not an inline colour. */
const FILLS = [
  'fill-foreground/[0.05]',
  'fill-foreground/[0.10]',
  'fill-foreground/[0.15]',
  'fill-foreground/[0.20]',
] as const
const ROWS = ['checks', 'time', 'reach'] as const

const LABEL_X = 16
const COL_X0 = 164
const COL_W = 142
const COL_PAD = 4
const NAME_Y = 24
const TOOL_Y = 39
const BAR_Y = 47
const CHECK_Y0 = 76
const CHECK_ROW = 15
const RULES_Y = [136, 172] as const
const TIME_Y = 158
const REACH_Y = 184
const REACH_H = 30
const ARROW_Y = 240
const ROW_Y: Record<(typeof ROWS)[number], number> = {
  checks: CHECK_Y0,
  time: TIME_Y,
  reach: REACH_Y + REACH_H / 2 + 4,
}
const COLS_END = COL_X0 + GATES.length * COL_W

export function GateReach() {
  const { t } = useTranslation('step2')
  const titleId = useId()

  return (
    <figure id="gate-reach" data-component="GateReach" className="my-8 flex justify-center">
      <svg
        id="gate-reach-svg"
        data-component="GateReach"
        viewBox="0 0 748 276"
        role="img"
        aria-labelledby={titleId}
        className="h-auto w-full max-w-2xl"
      >
        <title id={titleId} data-component="GateReach">
          {t('gate-reach.description')}
        </title>

        {ROWS.map((row) => (
          <text
            key={row}
            id={`gate-reach-row-${row}`}
            data-component="GateReach"
            x={LABEL_X}
            y={ROW_Y[row]}
            fontSize="12"
            className="fill-muted-foreground"
          >
            {t(`gate-reach.row.${row}`)}
          </text>
        ))}

        {RULES_Y.map((y, index) => (
          <line
            key={y}
            id={`gate-reach-rule-${index}`}
            data-component="GateReach"
            x1={LABEL_X}
            x2={COLS_END}
            y1={y}
            y2={y}
            strokeWidth="1"
            className="stroke-foreground/10"
          />
        ))}

        {GATES.slice(1).map((gate, index) => {
          const x = COL_X0 + (index + 1) * COL_W
          return (
            <path
              key={gate}
              id={`gate-reach-step-${index}`}
              data-component="GateReach"
              d={`M ${x - 2} ${NAME_Y - 9} l 4 5 l -4 5`}
              fill="none"
              strokeWidth="1.5"
              strokeLinecap="round"
              strokeLinejoin="round"
              className="stroke-primary"
            />
          )
        })}

        {GATES.map((gate, index) => {
          const x = COL_X0 + index * COL_W
          const mid = x + COL_W / 2
          const tool = TOOLS[gate]
          return (
            <g key={gate} id={`gate-reach-gate-${gate}`} data-component="GateReach">
              <text
                id={`gate-reach-gate-${gate}-name`}
                data-component="GateReach"
                x={mid}
                y={NAME_Y}
                fontSize="12"
                textAnchor="middle"
                className="fill-foreground font-medium"
              >
                {t(`gate-reach.gate.${gate}.name`)}
              </text>
              {tool && (
                <text
                  id={`gate-reach-gate-${gate}-tool`}
                  data-component="GateReach"
                  x={mid}
                  y={TOOL_Y}
                  fontSize="10"
                  textAnchor="middle"
                  className="fill-muted-foreground font-mono"
                >
                  {tool}
                </text>
              )}
              <rect
                id={`gate-reach-gate-${gate}-bar`}
                data-component="GateReach"
                x={x + COL_PAD}
                y={BAR_Y}
                width={COL_W - COL_PAD * 2}
                height={4}
                rx="2"
                className="fill-primary"
              />
              {CHECKS[gate].map((check, row) => (
                <text
                  key={check}
                  id={`gate-reach-gate-${gate}-check-${check}`}
                  data-component="GateReach"
                  x={mid}
                  y={CHECK_Y0 + row * CHECK_ROW}
                  fontSize="11"
                  textAnchor="middle"
                  className="fill-muted-foreground"
                >
                  {t(`gate-reach.check.${check}`)}
                </text>
              ))}
              <text
                id={`gate-reach-gate-${gate}-time`}
                data-component="GateReach"
                x={mid}
                y={TIME_Y}
                fontSize="12"
                textAnchor="middle"
                className="fill-foreground"
              >
                {t(`gate-reach.gate.${gate}.time`)}
              </text>
              <rect
                id={`gate-reach-gate-${gate}-reach`}
                data-component="GateReach"
                x={x + COL_PAD}
                y={REACH_Y}
                width={COL_W - COL_PAD * 2}
                height={REACH_H}
                rx="4"
                className={FILLS[index]}
              />
              <text
                id={`gate-reach-gate-${gate}-reach-label`}
                data-component="GateReach"
                x={mid}
                y={REACH_Y + REACH_H / 2 + 4}
                fontSize="12"
                textAnchor="middle"
                className="fill-foreground"
              >
                {t(`gate-reach.reach.${REACH[gate]}`)}
              </text>
            </g>
          )
        })}

        <g id="gate-reach-axis" data-component="GateReach">
          <path
            id="gate-reach-axis-line"
            data-component="GateReach"
            d={`M ${COL_X0 + COL_PAD} ${ARROW_Y} H ${COLS_END - COL_PAD} m -8 -5 l 8 5 l -8 5`}
            fill="none"
            strokeWidth="1.5"
            strokeLinecap="round"
            strokeLinejoin="round"
            className="stroke-muted-foreground/70"
          />
          <text
            id="gate-reach-note"
            data-component="GateReach"
            x={(COL_X0 + COLS_END) / 2}
            y={ARROW_Y + 22}
            fontSize="13"
            textAnchor="middle"
            className="fill-foreground"
          >
            {t('gate-reach.note')}
          </text>
        </g>
      </svg>
    </figure>
  )
}
