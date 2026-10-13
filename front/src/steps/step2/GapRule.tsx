import { useId } from 'react'
import { useTranslation } from 'react-i18next'

/**
 * What the `## Gaps` rule changes, as two rows of three steps. Without it the agent picks a
 * currency itself, builds on it, and you find it at review; with it the agent stops, asks you, and
 * records the answer. It sits under the rule's `<pre>` in `Make it stop at the gap`.
 *
 * **There is no `gaps.md` in it, and that is the decision** (October 2026, at the owner's asking).
 * The rule used to have the agent log each gap to a file. Read cold, that file looked like the list
 * of what an app still lacks, and logging is the bookkeeping the section says is not the point. The
 * answer now goes into a test or into `CLAUDE.md`, so it is decided in the repository, which is the
 * thing the rule checks for. The currency is the example because `LateFeePolicy` names none, which
 * is what the card's `gap` move walks a student into.
 *
 * Muted is what happens without the rule, teal what the rule makes happen. One message, so no note
 * under the rows: the paragraph after the figure carries what the answer buys you later.
 */
const STEPS = [1, 2, 3] as const
const ROWS = ['without', 'with'] as const

const LABEL_W = 120
const BOX_W = 170
const BOX_GAP = 24
const BOX_H = 40

export function GapRule() {
  const { t } = useTranslation('step2')
  const titleId = useId()

  return (
    <figure id="gap-rule" data-component="GapRule" className="my-8 flex justify-center">
      <svg
        id="gap-rule-svg"
        data-component="GapRule"
        viewBox={`-1 0 ${LABEL_W + 3 * BOX_W + 2 * BOX_GAP + 2} 152`}
        role="img"
        aria-labelledby={titleId}
        className="h-auto w-full"
      >
        <title id={titleId} data-component="GapRule">
          {t('gap-rule.description')}
        </title>

        <text
          id="gap-rule-title"
          data-component="GapRule"
          x="0"
          y="18"
          fontSize="16"
          className="fill-foreground font-semibold"
        >
          {t('gap-rule.title')}
        </text>

        {ROWS.map((row, index) => {
          const y = 40 + index * 64
          const box =
            row === 'with'
              ? 'fill-primary/10 stroke-primary'
              : 'fill-muted-foreground/15 stroke-muted-foreground/60'
          const ink = row === 'with' ? 'fill-foreground' : 'fill-muted-foreground'

          return (
            <g key={row} id={`gap-rule-${row}`} data-component="GapRule" data-state={row}>
              <text
                id={`gap-rule-${row}-label`}
                data-component="GapRule"
                x="0"
                y={y + BOX_H / 2 + 5}
                fontSize="13"
                className={row === 'with' ? 'fill-foreground font-medium' : 'fill-muted-foreground'}
              >
                {t(`gap-rule.${row}`)}
              </text>

              {STEPS.map((step, stepIndex) => {
                const x = LABEL_W + stepIndex * (BOX_W + BOX_GAP)

                return (
                  <g key={step} id={`gap-rule-${row}-${step}`} data-component="GapRule">
                    {stepIndex > 0 && (
                      <line
                        x1={x - BOX_GAP + 2}
                        x2={x - 2}
                        y1={y + BOX_H / 2}
                        y2={y + BOX_H / 2}
                        strokeWidth="1.5"
                        className="stroke-muted-foreground"
                        data-component="GapRule"
                      />
                    )}
                    <rect
                      x={x}
                      y={y}
                      width={BOX_W}
                      height={BOX_H}
                      rx="6"
                      strokeWidth="1.5"
                      className={box}
                      data-component="GapRule"
                    />
                    <text
                      x={x + BOX_W / 2}
                      y={y + BOX_H / 2 + 5}
                      textAnchor="middle"
                      fontSize="13"
                      className={ink}
                      data-component="GapRule"
                    >
                      {t(`gap-rule.${row}.${step}`)}
                    </text>
                  </g>
                )
              })}
            </g>
          )
        })}
      </svg>
    </figure>
  )
}
