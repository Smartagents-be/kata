import { useId } from 'react'
import { useTranslation } from 'react-i18next'

/**
 * What turning the reasoning level up actually buys. 5 bars, 1 per level, and each one is two
 * segments: the dashed part is the thinking and the solid part is the answer. The answer segment is
 * the same width in all 5 rows, so the only thing that grows is what sits in front of it.
 *
 * That is the whole reading, and it is the misconception `promptQuiz`'s `reasoning-level` question
 * tests: you are not buying a better answer, you are buying more thinking ahead of the same one, and
 * that thinking stays in the window and on the bill afterwards. `reasoning-level.2` above asks the
 * reader to weigh two quantities and could show them neither.
 *
 * It stays inside the step's vocabulary and adds nothing to it. A bar is something you have, dashes
 * are what is not in your answer, and there is **no context frame**: the first one in the step is
 * `ToolsInContext` in `tools`, so nothing above it may spend that shape.
 *
 * The level names are Claude Code's (`/effort`, verified against
 * platform.claude.com/docs/en/build-with-claude/effort in October 2026; the figure stopped at
 * `xhigh` before that, which was wrong), which is why they are mono and untranslated, the way `ModelPricing`'s model names
 * are. The token counts are invented, and the caption says both.
 */
const ANSWER = 400

/**
 * Thinking tokens per level, roughly 1x, 2.5x, 6x, 12x and 20x the cheapest one. The top stays at
 * 4,000 on purpose: adding `max` squeezed the scale rather than stretching it, so the answer
 * segment keeps the width that makes it readable as the same thing in every row.
 */
const LEVELS = [
  { id: 'low', thinking: 200 },
  { id: 'medium', thinking: 500 },
  { id: 'high', thinking: 1200 },
  { id: 'xhigh', thinking: 2400 },
  { id: 'max', thinking: 4000 },
] as const

const WIDEST = LEVELS[LEVELS.length - 1].thinking + ANSWER

/**
 * The bars run the full width of the viewBox: `X0` leaves exactly the mono level label room on the
 * left and `SPAN` stops where the longest token count still fits on the right. Both margins are a
 * few pixels, so a longer level name or a fifth digit in a count means moving these two together.
 */
const X0 = 66
const SPAN = 480

const width = (tokens: number) => (tokens / WIDEST) * SPAN

const BAR = 24
const PITCH = 46
const TOP = 52

export function ReasoningCost() {
  const { t, i18n } = useTranslation('step1')
  const titleId = useId()
  const number = new Intl.NumberFormat(i18n.language)

  return (
    <figure
      id="reasoning-cost"
      data-component="ReasoningCost"
      className="my-8 flex flex-col items-center gap-3"
    >
      <svg
        id="reasoning-cost-svg"
        data-component="ReasoningCost"
        viewBox="0 0 640 278"
        role="img"
        aria-labelledby={titleId}
        className="h-auto w-full max-w-3xl"
      >
        <title id={titleId} data-component="ReasoningCost">
          {t('reasoning-cost.description')}
        </title>

        {/* Two fills and nothing else to tell them apart, so the legend carries the key. */}
        <g id="reasoning-cost-legend" data-component="ReasoningCost">
          <rect
            x={X0}
            y="10"
            width="18"
            height="10"
            rx="2"
            strokeWidth="1.5"
            strokeDasharray="5 5"
            className="fill-primary/10 stroke-primary/50"
          />
          <text
            id="reasoning-cost-legend-thinking"
            data-component="ReasoningCost"
            x={X0 + 26}
            y="19"
            fontSize="12"
            className="fill-muted-foreground"
          >
            {t('reasoning-cost.thinking')}
          </text>

          <rect x={X0 + 190} y="10" width="18" height="10" rx="2" className="fill-primary" />
          <text
            id="reasoning-cost-legend-answer"
            data-component="ReasoningCost"
            x={X0 + 216}
            y="19"
            fontSize="12"
            className="fill-muted-foreground"
          >
            {t('reasoning-cost.answer')}
          </text>
        </g>

        {LEVELS.map((level, row) => {
          const thinking = width(level.thinking)
          const answer = width(ANSWER)
          const y = TOP + row * PITCH

          return (
            <g key={level.id} id={`reasoning-cost-row-${row}`} data-component="ReasoningCost">
              <text
                id={`reasoning-cost-row-${row}-level`}
                data-component="ReasoningCost"
                x={X0 - 14}
                y={y + 17}
                fontSize="13"
                textAnchor="end"
                className="fill-foreground font-mono"
              >
                {level.id}
              </text>

              {/* The thinking, in front of the answer rather than after it: the answer is where the
                  turn ends, and everything the level bought is what you wait through first. */}
              <rect
                id={`reasoning-cost-row-${row}-thinking`}
                data-component="ReasoningCost"
                x={X0}
                y={y}
                width={thinking}
                height={BAR}
                rx="4"
                strokeWidth="1.5"
                strokeDasharray="5 5"
                className="fill-primary/10 stroke-primary/50"
              />

              {/* Identical in every row. Moving this is the figure making the opposite claim. */}
              <rect
                id={`reasoning-cost-row-${row}-answer`}
                data-component="ReasoningCost"
                x={X0 + thinking}
                y={y}
                width={answer}
                height={BAR}
                rx="4"
                className="fill-primary"
              />

              <text
                id={`reasoning-cost-row-${row}-total`}
                data-component="ReasoningCost"
                x={X0 + thinking + answer + 10}
                y={y + 17}
                fontSize="11"
                className="fill-muted-foreground font-mono"
              >
                {t('reasoning-cost.tokens', {
                  total: number.format(level.thinking + ANSWER),
                })}
              </text>
            </g>
          )
        })}
      </svg>

      <figcaption
        id="reasoning-cost-caption"
        data-component="ReasoningCost"
        className="text-muted-foreground w-full max-w-3xl text-xs"
      >
        {t('reasoning-cost.caption')}
      </figcaption>
    </figure>
  )
}
