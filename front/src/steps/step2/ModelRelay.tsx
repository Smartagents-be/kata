import { useId } from 'react'
import { useTranslation } from 'react-i18next'

/**
 * The relay: one long research run on the frontier model, digested into a plan on the top tier, then
 * handed down to the middle tier as many short turns. The shape is the argument. One block, then a
 * smaller one, then a stack of small ones, so what narrows is the thinking and what multiplies is
 * the typing.
 *
 * It sits under `research-frontier-model` in `goals`, and **the two arrows are the figure**: they
 * are teal and they are labelled with what you do, because the handover is the only part of this
 * chain that cannot be delegated. Take the arrows out and it is three tiers in a row, which step 1
 * already drew.
 *
 * **The dispositions belong to `ModelTiers` in `step1/model` and are not repeated here.** That
 * figure says what each tier is like; this one says what you spend each on and in which order. A
 * card of traits added to a column collapses the two.
 *
 * The three names are the one dated thing in the unit, on `ModelTiers`'s precedent: the prose stays
 * version-free and says "the frontier model", "the top tier" and "the middle tier", and the small
 * line under the figure in `goals.html` says when these three were those. They are literals rather
 * than locale keys, since a model name is not translated.
 */
/**
 * The columns are narrow and the gaps are wide on purpose: the two arrow labels are the argument,
 * and at the width this was first drawn at they cleared the boxes by a pixel in English and ran
 * into them in Dutch.
 */
const COL_W = 140
const COLUMNS = [
  { key: 'research', x: 1, model: 'Fable' },
  { key: 'plan', x: 250, model: 'Opus' },
  { key: 'work', x: 499, model: 'Sonnet' },
] as const

const MID = 128
const RESEARCH_H = 120
const PLAN_H = 76
const TURN_H = 18
const TURN_GAP = 8
const TURNS = 5
/** So an arrowhead reads as arriving at a column rather than touching it. */
const STANDOFF = 7

export function ModelRelay() {
  const { t } = useTranslation('step2')
  const titleId = useId()
  const arrowId = `model-relay-arrow-${useId().replace(/:/g, '')}`

  const stackH = TURNS * TURN_H + (TURNS - 1) * TURN_GAP

  return (
    <figure id="model-relay" data-component="ModelRelay" className="my-8 flex justify-center">
      <svg
        id="model-relay-svg"
        data-component="ModelRelay"
        viewBox="0 0 640 246"
        role="img"
        aria-labelledby={titleId}
        className="h-auto w-full"
      >
        <title id={titleId} data-component="ModelRelay">
          {t('model-relay.description')}
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
            <path d="M 0 0 L 10 5 L 0 10 z" className="fill-primary" />
          </marker>
        </defs>

        {COLUMNS.map((column) => (
          <g key={column.key} id={`model-relay-${column.key}`} data-component="ModelRelay">
            <text
              id={`model-relay-${column.key}-label`}
              data-component="ModelRelay"
              x={column.x + COL_W / 2}
              y="34"
              fontSize="14"
              textAnchor="middle"
              className="fill-foreground font-medium"
            >
              {t(`model-relay.${column.key}`)}
            </text>
            <text
              id={`model-relay-${column.key}-model`}
              data-component="ModelRelay"
              x={column.x + COL_W / 2}
              y="222"
              fontSize="13"
              textAnchor="middle"
              className="fill-muted-foreground font-mono"
            >
              {column.model}
            </text>
          </g>
        ))}

        {/* One long run: the most expensive thing on the page, drawn as the largest block. */}
        <rect
          id="model-relay-research-block"
          data-component="ModelRelay"
          x={COLUMNS[0].x}
          y={MID - RESEARCH_H / 2}
          width={COL_W}
          height={RESEARCH_H}
          rx="8"
          strokeWidth="1.5"
          className="fill-muted-foreground/15 stroke-muted-foreground/60"
        />

        {/* What survived the reading, which is smaller than what came back. */}
        <rect
          id="model-relay-plan-block"
          data-component="ModelRelay"
          x={COLUMNS[1].x}
          y={MID - PLAN_H / 2}
          width={COL_W}
          height={PLAN_H}
          rx="8"
          strokeWidth="1.5"
          className="fill-muted-foreground/15 stroke-muted-foreground/60"
        />

        {/* The plan spent as turns, where the volume comes back and the price per token does not. */}
        {Array.from({ length: TURNS }, (_, index) => (
          <rect
            key={index}
            id={`model-relay-work-turn-${index}`}
            data-component="ModelRelay"
            x={COLUMNS[2].x}
            y={MID - stackH / 2 + index * (TURN_H + TURN_GAP)}
            width={COL_W}
            height={TURN_H}
            rx="4"
            strokeWidth="1.5"
            className="fill-muted-foreground/15 stroke-muted-foreground/60"
          />
        ))}

        {[
          { key: 'digest', from: COLUMNS[0], to: COLUMNS[1] },
          { key: 'hand-down', from: COLUMNS[1], to: COLUMNS[2] },
        ].map((step) => (
          <g key={step.key} id={`model-relay-${step.key}`} data-component="ModelRelay">
            <path
              id={`model-relay-${step.key}-arrow`}
              data-component="ModelRelay"
              d={`M ${step.from.x + COL_W + STANDOFF} ${MID} H ${step.to.x - STANDOFF}`}
              fill="none"
              strokeWidth="2"
              markerEnd={`url(#${arrowId})`}
              className="stroke-primary"
            />
            <text
              id={`model-relay-${step.key}-label`}
              data-component="ModelRelay"
              x={(step.from.x + COL_W + step.to.x) / 2}
              y={MID - 14}
              fontSize="12"
              textAnchor="middle"
              className="fill-primary"
            >
              {t(`model-relay.${step.key}`)}
            </text>
          </g>
        ))}
      </svg>
    </figure>
  )
}
