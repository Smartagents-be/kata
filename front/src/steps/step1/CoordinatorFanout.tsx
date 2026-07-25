import { useId } from 'react'
import { useTranslation } from 'react-i18next'

/**
 * The coordinator pattern: one full context on top, three empty ones underneath. The bars inside the
 * coordinator are what it has been given (your prompt, the session, the files it read); each
 * sub-agent gets one bar, the instruction written for it, and nothing else. The dashed area is the
 * whole point of the drawing, and it is why the caption at the bottom is about re-reading files:
 * what a sub-agent is missing, it has to fetch again at its own cost.
 *
 * Static on purpose, like the other diagrams in this step. The vocabulary is shared with
 * ReflectionLoop: a teal frame is a context, a bar is something in it, dashes are what is not.
 */
export function CoordinatorFanout() {
  const { t } = useTranslation('step1')
  const titleId = useId()
  const arrowId = `coordinator-fanout-arrow-${useId().replace(/:/g, '')}`

  // Left, middle and right sub-agent: the x of the frame and the x its arrow lands on.
  const subAgents = [15, 230, 445]

  return (
    <figure
      id="coordinator-fanout"
      data-component="CoordinatorFanout"
      className="my-8 flex justify-center"
    >
      <svg
        id="coordinator-fanout-svg"
        data-component="CoordinatorFanout"
        viewBox="0 0 640 400"
        role="img"
        aria-labelledby={titleId}
        className="h-auto w-full max-w-xl"
      >
        {/* useId, not a BEM id: aria-labelledby has to be unique per instance, not per component. */}
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

        {/* the coordinator: the expensive model, and the only full context in the drawing */}
        <rect
          id="coordinator-fanout-coordinator"
          data-component="CoordinatorFanout"
          x="110"
          y="20"
          width="420"
          height="126"
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
          {[372, 300, 232].map((width, index) => (
            <rect
              key={width}
              id={`coordinator-fanout-coordinator-line-${index}`}
              data-component="CoordinatorFanout"
              x="134"
              y={72 + index * 22}
              width={width}
              height="10"
              rx="5"
            />
          ))}
        </g>

        {/* what the coordinator hands down: one prompt per part, drawn as three arrows */}
        <g
          fill="none"
          strokeWidth="2"
          markerEnd={`url(#${arrowId})`}
          className="stroke-primary/50"
        >
          <path
            id="coordinator-fanout-handoff-0"
            data-component="CoordinatorFanout"
            d="M 250 146 C 250 178 105 176 105 200"
          />
          <path
            id="coordinator-fanout-handoff-1"
            data-component="CoordinatorFanout"
            d="M 320 146 L 320 200"
          />
          <path
            id="coordinator-fanout-handoff-2"
            data-component="CoordinatorFanout"
            d="M 390 146 C 390 178 535 176 535 200"
          />
        </g>

        {/* the sub-agents: the instruction at the top, and below it the empty context it starts on */}
        {subAgents.map((x, index) => (
          <g key={x}>
            <rect
              id={`coordinator-fanout-subagent-${index}`}
              data-component="CoordinatorFanout"
              x={x}
              y="206"
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
              y="236"
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
              y="252"
              width="144"
              height="10"
              rx="5"
              className="fill-primary/50"
            />
            {/* labelled once: the other two mirror it, and three copies of the same word is noise */}
            {index === 0 && (
              <text
                id="coordinator-fanout-subagent-0-instruction-label"
                data-component="CoordinatorFanout"
                x={x + 90}
                y="278"
                fontSize="12"
                textAnchor="middle"
                className="fill-muted-foreground"
              >
                {t('coordinator-fanout.instruction')}
              </text>
            )}
            <rect
              id={`coordinator-fanout-subagent-${index}-empty`}
              data-component="CoordinatorFanout"
              x={x + 18}
              y="288"
              width="144"
              height="50"
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
              y="313"
              fontSize="14"
              textAnchor="middle"
              dominantBaseline="middle"
              className="fill-muted-foreground"
            >
              {t('coordinator-fanout.empty')}
            </text>
          </g>
        ))}

        <text
          id="coordinator-fanout-caption"
          data-component="CoordinatorFanout"
          x="320"
          y="384"
          fontSize="15"
          textAnchor="middle"
          className="fill-muted-foreground"
        >
          {t('coordinator-fanout.refetch')}
        </text>
      </svg>
    </figure>
  )
}
