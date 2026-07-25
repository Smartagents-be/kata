import { useId } from 'react'
import { useTranslation } from 'react-i18next'

/**
 * The sequential workflow: three steps inside one session, each one validated before the next
 * starts. The band is the session, which is why it runs behind all three steps rather than around
 * each of them: one context carries the whole run. The dashed seam between the second and third
 * step is the thing the prose promises, a place to stop and pick the work up later, so the arrow
 * crossing it is interrupted by a pause rather than running straight through.
 */
export function SequentialSteps() {
  const { t } = useTranslation('step1')
  const titleId = useId()
  const arrowId = `sequential-steps-arrow-${useId().replace(/:/g, '')}`

  const steps = [34, 240, 446]

  return (
    <figure
      id="sequential-steps"
      data-component="SequentialSteps"
      className="my-8 flex justify-center"
    >
      <svg
        id="sequential-steps-svg"
        data-component="SequentialSteps"
        viewBox="0 0 640 284"
        role="img"
        aria-labelledby={titleId}
        className="h-auto w-full max-w-xl"
      >
        {/* useId, not a BEM id: aria-labelledby has to be unique per instance, not per component. */}
        <title id={titleId} data-component="SequentialSteps">
          {t('sequential-steps.description')}
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

        {/* the session: one context behind the whole run */}
        <rect
          id="sequential-steps-session"
          data-component="SequentialSteps"
          x="12"
          y="16"
          width="616"
          height="214"
          rx="20"
          strokeWidth="2"
          className="fill-primary/5 stroke-primary/40"
        />
        <text
          id="sequential-steps-session-label"
          data-component="SequentialSteps"
          x="34"
          y="48"
          fontSize="15"
          className="fill-muted-foreground"
        >
          {t('sequential-steps.session')}
        </text>

        {/* the seam: a step boundary, not a wall, so the arrow crosses it and the pause hangs off
            the bottom where the caption below picks it up */}
        <line
          id="sequential-steps-seam"
          data-component="SequentialSteps"
          x1="423"
          y1="58"
          x2="423"
          y2="190"
          strokeWidth="1.5"
          strokeDasharray="4 6"
          className="stroke-primary/40"
        />
        <rect
          id="sequential-steps-pause"
          data-component="SequentialSteps"
          x="409"
          y="190"
          width="28"
          height="22"
          rx="7"
          strokeWidth="1.5"
          className="fill-card stroke-primary/40"
        />
        <g
          id="sequential-steps-pause-bars"
          data-component="SequentialSteps"
          className="fill-primary/70"
        >
          <rect x="417" y="195" width="3.5" height="12" rx="1.5" />
          <rect x="423.5" y="195" width="3.5" height="12" rx="1.5" />
        </g>

        {/* the flow: two arrows of the same length, one of them across the seam */}
        <g
          fill="none"
          strokeWidth="2"
          markerEnd={`url(#${arrowId})`}
          className="stroke-primary/50"
        >
          <path
            id="sequential-steps-flow-0"
            data-component="SequentialSteps"
            d="M 200 126 L 232 126"
          />
          <path
            id="sequential-steps-flow-1"
            data-component="SequentialSteps"
            d="M 406 126 L 438 126"
          />
        </g>

        {/* the steps themselves, each closing on a check */}
        {steps.map((x, index) => (
          <g key={x}>
            <rect
              id={`sequential-steps-step-${index}`}
              data-component="SequentialSteps"
              x={x}
              y="70"
              width="160"
              height="112"
              rx="12"
              strokeWidth="1.5"
              className="fill-card stroke-primary/30"
            />
            <text
              id={`sequential-steps-step-${index}-label`}
              data-component="SequentialSteps"
              x={x + 20}
              y="106"
              fontSize="17"
              className="fill-foreground font-medium"
            >
              {t('sequential-steps.step', { n: index + 1 })}
            </text>
            {/* the work inside the step, in the same bars the other diagrams use for content */}
            <g className="fill-primary/25">
              <rect x={x + 20} y="118" width="112" height="8" rx="4" />
              <rect x={x + 20} y="132" width="84" height="8" rx="4" />
            </g>
            <circle
              id={`sequential-steps-step-${index}-check`}
              data-component="SequentialSteps"
              cx={x + 31}
              cy="160"
              r="11"
              strokeWidth="1.5"
              className="fill-success/15 stroke-success"
            />
            <path
              id={`sequential-steps-step-${index}-check-mark`}
              data-component="SequentialSteps"
              d={`M ${x + 25} 160 l 4 4 l 8 -8`}
              fill="none"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              className="stroke-success"
            />
            <text
              id={`sequential-steps-step-${index}-check-label`}
              data-component="SequentialSteps"
              x={x + 50}
              y="165"
              fontSize="13"
              className="fill-success-foreground"
            >
              {t('sequential-steps.validated')}
            </text>
          </g>
        ))}

        <text
          id="sequential-steps-caption"
          data-component="SequentialSteps"
          x="423"
          y="258"
          fontSize="15"
          textAnchor="middle"
          className="fill-muted-foreground"
        >
          {t('sequential-steps.stop')}
        </text>
      </svg>
    </figure>
  )
}
