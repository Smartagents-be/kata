import { useId } from 'react'
import { useTranslation } from 'react-i18next'

/**
 * The sequential workflow: three steps inside one session, each one validated before the next
 * starts. The band is the session, which is why it runs behind all three steps rather than around
 * each of them: one context carries the whole run. The dashed seam between the second and third
 * step is the thing the prose promises, a place to stop and pick the work up later, so the arrow
 * crossing it is interrupted by a pause rather than running straight through.
 *
 * What the band does that the paragraph cannot is measure what the run costs. The fill along the
 * bottom rises in three treads, thin under step one and close to the cards under step three, so the
 * free space above it visibly runs out and the label on the right says what that means. Without it
 * this figure transcribed its own prose: three cards, three checks and a pause.
 *
 * The middle riser sits on the seam's x, so the pause glyph hangs exactly where the fill jumps.
 * That is the second thing it teaches: stop here and the fill is what you pay to rebuild. Do not
 * colour any of it outside the primary tints the other diagrams use for content, and do not add a
 * fourth step card. The point is that there is no room for one.
 *
 * The label is a point smaller than the check labels because the only clear band it has is the
 * 32px between the cards and the top tread, and the pause box sits in the middle of it: the Dutch
 * runs a third longer than the English and reaches the glyph at 13px.
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
        viewBox="0 0 640 340"
        role="img"
        aria-labelledby={titleId}
        className="h-auto w-full max-w-xl"
      >
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
          height="284"
          rx="20"
          strokeWidth="2"
          className="fill-primary/5 stroke-primary/40"
        />
        {/* what the run has put in the window, one tread per step, inset 2 off the frame so the
            bottom corners follow its radius. The middle riser is on the seam's x. */}
        <path
          id="sequential-steps-fill"
          data-component="SequentialSteps"
          d="M 14 272 H 217 V 244 H 423 V 214 H 626 V 280 A 18 18 0 0 1 608 298 H 32 A 18 18 0 0 1 14 280 Z"
          className="fill-primary/25"
        />
        <text
          id="sequential-steps-filling"
          data-component="SequentialSteps"
          x="620"
          y="205"
          fontSize="12"
          textAnchor="end"
          className="fill-muted-foreground"
        >
          {t('sequential-steps.filling')}
        </text>
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
          y="324"
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
