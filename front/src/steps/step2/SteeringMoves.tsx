import { useId } from 'react'
import { useTranslation } from 'react-i18next'

import { useAssistant } from '@/shared/assistant/useAssistant'

/**
 * The four corrections, from light to heavy, as one table the reader picks a row from. It opens
 * `Mid-flight` and replaced the three paragraphs that told the same moves in prose (October 2026,
 * at the owner's asking: less text, more drawing, nothing said twice).
 *
 * **One message: what stays in the context.** The left column is what you see going wrong, the
 * middle what you do, and the right column is the argument: everything plus your sentence, plus
 * your correction, everything up to your request, only what you pass on. Rows 2 and 3 both say
 * "wrong direction" on purpose, because that is the reason you stop rather than type into the run:
 * the owner could not see why row 2 stopped until the problem column said so.
 *
 * **The middle column names the key or the button**, so it reads `useAssistant()` itself on the
 * `front/CLAUDE.md` rule for figures. The Copilot side is IntelliJ's default Copilot agent, rehearsed
 * by hand on 13 October 2026: a sentence typed mid-run waits in a STEERING block until the current
 * step is done, and Send Immediately sends it at once and stops that step, which is row 2's move.
 * Rewinding is editing an earlier message, and it rewinds the chat and the files.
 *
 * Muted boxes are what happens to you, teal boxes are what you do; the right column has no box
 * because it is a reading of the window, not an action.
 */
const ROWS = ['small', 'correct', 'rewind', 'restart'] as const

const WIDTH = 720
const PROBLEM_W = 220
const MOVE_X = 246
const MOVE_W = 248
const KEPT_X = 520
const ROW_Y = 64
const ROW_H = 60
const ROW_GAP = 12

export function SteeringMoves() {
  const { t } = useTranslation('step2')
  const { assistant } = useAssistant()
  const titleId = useId()
  const height = ROW_Y + ROWS.length * (ROW_H + ROW_GAP) + 4

  return (
    <figure id="steering-moves" data-component="SteeringMoves" className="my-8 flex justify-center">
      <svg
        id="steering-moves-svg"
        data-component="SteeringMoves"
        viewBox={`0 0 ${WIDTH} ${height}`}
        role="img"
        aria-labelledby={titleId}
        className="h-auto w-full"
      >
        <title id={titleId} data-component="SteeringMoves">
          {t('steering-moves.description')}
        </title>

        <text
          id="steering-moves-title"
          data-component="SteeringMoves"
          x="0"
          y="18"
          fontSize="16"
          className="fill-foreground font-semibold"
        >
          {t('steering-moves.title')}
        </text>

        {(['problem', 'move', 'kept'] as const).map((col, index) => (
          <text
            key={col}
            id={`steering-moves-col-${col}`}
            data-component="SteeringMoves"
            x={[0, MOVE_X, KEPT_X][index]}
            y="52"
            fontSize="12"
            className="fill-muted-foreground"
          >
            {t(`steering-moves.col.${col}`)}
          </text>
        ))}

        {ROWS.map((row, index) => {
          const y = ROW_Y + index * (ROW_H + ROW_GAP)

          return (
            <g key={row} id={`steering-moves-${row}`} data-component="SteeringMoves">
              <rect
                id={`steering-moves-${row}-problem`}
                data-component="SteeringMoves"
                x="0"
                y={y}
                width={PROBLEM_W}
                height={ROW_H}
                rx="6"
                strokeWidth="1.5"
                className="fill-muted-foreground/15 stroke-muted-foreground/60"
              />
              <text
                id={`steering-moves-${row}-problem-text`}
                data-component="SteeringMoves"
                x={PROBLEM_W / 2}
                textAnchor="middle"
                fontSize="13"
                className="fill-muted-foreground"
              >
                <tspan x={PROBLEM_W / 2} y={y + 26}>
                  {t(`steering-moves.${row}.problem.1`)}
                </tspan>
                <tspan x={PROBLEM_W / 2} y={y + 44}>
                  {t(`steering-moves.${row}.problem.2`)}
                </tspan>
              </text>

              <line
                id={`steering-moves-${row}-link`}
                data-component="SteeringMoves"
                x1={PROBLEM_W + 2}
                x2={MOVE_X - 4}
                y1={y + ROW_H / 2}
                y2={y + ROW_H / 2}
                strokeWidth="1.5"
                className="stroke-muted-foreground"
              />

              <rect
                id={`steering-moves-${row}-move`}
                data-component="SteeringMoves"
                x={MOVE_X}
                y={y}
                width={MOVE_W}
                height={ROW_H}
                rx="6"
                strokeWidth="1.5"
                className="fill-primary/10 stroke-primary"
              />
              <text
                id={`steering-moves-${row}-move-text`}
                data-component="SteeringMoves"
                x={MOVE_X + MOVE_W / 2}
                y={y + 26}
                textAnchor="middle"
                fontSize="13"
                className="fill-foreground"
              >
                {t(`steering-moves.${row}.move.${assistant}`)}
              </text>
              <text
                id={`steering-moves-${row}-how`}
                data-component="SteeringMoves"
                x={MOVE_X + MOVE_W / 2}
                y={y + 45}
                textAnchor="middle"
                fontSize="11.5"
                className="fill-muted-foreground"
              >
                {t(`steering-moves.${row}.how.${assistant}`)}
              </text>

              <text
                id={`steering-moves-${row}-kept`}
                data-component="SteeringMoves"
                x={KEPT_X}
                y={y + ROW_H / 2 + 5}
                fontSize="13"
                className="fill-foreground"
              >
                {t(`steering-moves.${row}.kept`)}
              </text>
            </g>
          )
        })}
      </svg>
    </figure>
  )
}
