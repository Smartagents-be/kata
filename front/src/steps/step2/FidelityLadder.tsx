import { useId } from 'react'
import { useTranslation } from 'react-i18next'

/**
 * The 5 rungs you can answer a design question on, from talking it through to code that ships, with
 * an arrow up the side from low to high fidelity. It closes the prototype paragraph in `workflows`'s
 * spec-driven section, and its 1 message is where a prototype sits: the highest rung you still throw
 * away. That is why the dashed line runs under production-ready code and nowhere else, and why
 * prototypes are the only teal rung, on the step's rule that teal is what the shape adds.
 *
 * The rungs are the owner's own (October 2026, from a whiteboard sketch), with one swap: the sketch's
 * breadboards, Shape Up's term for screens and actions written as words, became diagrams. Nobody in
 * the room knew the term, and a backend developer already draws flowcharts, state diagrams and
 * sequence diagrams, which is also the shape `spec-driven.4`'s state machine takes before it is a
 * prototype. Do not put breadboards back.
 */
const RUNGS = ['production', 'prototype', 'wireframe', 'diagram', 'discussion'] as const

const TOP = 12
const ROW_H = 34
const ROW_GAP = 18
/** The extra room under production-ready code, which the "nothing below ships" line sits in. */
const LINE_GAP = 30
const ARROW_X = 140
const BOX_X = 165
const BOX_W = 200
const NOTE_X = BOX_X + BOX_W + 20

function rowY(index: number) {
  return TOP + index * (ROW_H + ROW_GAP) + (index > 0 ? LINE_GAP - ROW_GAP : 0)
}

const BOTTOM = rowY(RUNGS.length - 1) + ROW_H

export function FidelityLadder() {
  const { t } = useTranslation('step2')
  const titleId = useId()
  const lineY = TOP + ROW_H + LINE_GAP / 2

  return (
    <figure id="fidelity-ladder" data-component="FidelityLadder" className="my-8">
      <svg
        id="fidelity-ladder-svg"
        data-component="FidelityLadder"
        viewBox={`0 0 600 ${BOTTOM + TOP}`}
        role="img"
        aria-labelledby={titleId}
        className="h-auto w-full"
      >
        <title id={titleId} data-component="FidelityLadder">
          {t('fidelity-ladder.description')}
        </title>

        <g id="fidelity-ladder-axis" data-component="FidelityLadder">
          <line
            x1={ARROW_X}
            y1={BOTTOM}
            x2={ARROW_X}
            y2={TOP + 8}
            strokeWidth="2"
            className="stroke-muted-foreground"
          />
          <polygon
            points={`${ARROW_X - 6},${TOP + 10} ${ARROW_X},${TOP} ${ARROW_X + 6},${TOP + 10}`}
            className="fill-muted-foreground"
          />
          <text
            id="fidelity-ladder-axis-high"
            data-component="FidelityLadder"
            x={ARROW_X - 14}
            y={TOP + 14}
            fontSize="12"
            textAnchor="end"
            className="fill-muted-foreground"
          >
            {t('fidelity-ladder.high')}
          </text>
          <text
            id="fidelity-ladder-axis-low"
            data-component="FidelityLadder"
            x={ARROW_X - 14}
            y={BOTTOM}
            fontSize="12"
            textAnchor="end"
            className="fill-muted-foreground"
          >
            {t('fidelity-ladder.low')}
          </text>
        </g>

        {RUNGS.map((rung, index) => {
          const y = rowY(index)
          const block = `fidelity-ladder-rung-${index}`
          const picked = rung === 'prototype'

          return (
            <g key={rung} id={block} data-component="FidelityLadder" data-state={picked ? 'picked' : 'plain'}>
              <rect
                id={`${block}-box`}
                data-component="FidelityLadder"
                x={BOX_X}
                y={y}
                width={BOX_W}
                height={ROW_H}
                rx="6"
                strokeWidth="1.5"
                className={picked ? 'fill-primary stroke-primary' : 'fill-background stroke-border'}
              />
              <text
                id={`${block}-name`}
                data-component="FidelityLadder"
                x={BOX_X + 14}
                y={y + 22}
                fontSize="13"
                className={`font-medium ${picked ? 'fill-primary-foreground' : 'fill-foreground'}`}
              >
                {t(`fidelity-ladder.${rung}.name`)}
              </text>
              <text
                id={`${block}-note`}
                data-component="FidelityLadder"
                x={NOTE_X}
                y={y + 22}
                fontSize="12"
                className="fill-muted-foreground"
              >
                {t(`fidelity-ladder.${rung}.note`)}
              </text>
            </g>
          )
        })}

        <g id="fidelity-ladder-line" data-component="FidelityLadder">
          <line
            x1={BOX_X - 10}
            y1={lineY}
            x2={BOX_X + BOX_W + 10}
            y2={lineY}
            strokeWidth="1.5"
            strokeDasharray="5 4"
            className="stroke-foreground"
          />
          <text
            id="fidelity-ladder-line-label"
            data-component="FidelityLadder"
            x={NOTE_X}
            y={lineY + 4}
            fontSize="11"
            className="fill-foreground font-medium"
          >
            {t('fidelity-ladder.ships')}
          </text>
        </g>
      </svg>
    </figure>
  )
}
