import { useId } from 'react'
import { useTranslation } from 'react-i18next'

/**
 * Reflection: the agent hands its result to a critic that starts on nothing. The two frames use the
 * same vocabulary as CoordinatorFanout, and the asymmetry is the argument. The agent is full of its
 * own session, which is exactly why it agrees with itself; the critic holds the result and a dashed
 * empty space, which is why what it hands back is worth reading.
 */
export function ReflectionLoop() {
  const { t } = useTranslation('step1')
  const titleId = useId()
  const arrowId = `reflection-loop-arrow-${useId().replace(/:/g, '')}`

  return (
    <figure id="reflection-loop" data-component="ReflectionLoop" className="my-8 flex justify-center">
      <svg
        id="reflection-loop-svg"
        data-component="ReflectionLoop"
        viewBox="0 0 640 284"
        role="img"
        aria-labelledby={titleId}
        className="h-auto w-full max-w-xl"
      >
        {/* useId, not a BEM id: aria-labelledby has to be unique per instance, not per component. */}
        <title id={titleId} data-component="ReflectionLoop">
          {t('reflection-loop.description')}
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

        {/* the agent: a session it has been arguing inside all morning */}
        <rect
          id="reflection-loop-agent"
          data-component="ReflectionLoop"
          x="16"
          y="40"
          width="250"
          height="170"
          rx="16"
          strokeWidth="2"
          className="fill-primary/10 stroke-primary/50"
        />
        <text
          id="reflection-loop-agent-label"
          data-component="ReflectionLoop"
          x="40"
          y="72"
          fontSize="19"
          className="fill-foreground font-medium"
        >
          {t('reflection-loop.agent')}
        </text>
        <g className="fill-primary/35">
          {[202, 170, 190, 150, 178].map((width, index) => (
            <rect
              key={index}
              id={`reflection-loop-agent-line-${index}`}
              data-component="ReflectionLoop"
              x="40"
              y={92 + index * 20}
              width={width}
              height="9"
              rx="4.5"
            />
          ))}
        </g>
        <text
          id="reflection-loop-agent-caption"
          data-component="ReflectionLoop"
          x="141"
          y="240"
          fontSize="14"
          textAnchor="middle"
          className="fill-muted-foreground"
        >
          {t('reflection-loop.stake')}
        </text>

        {/* the critic: the result, and then nothing */}
        <rect
          id="reflection-loop-critic"
          data-component="ReflectionLoop"
          x="374"
          y="40"
          width="250"
          height="170"
          rx="16"
          strokeWidth="2"
          className="fill-primary/5 stroke-primary/40"
        />
        <text
          id="reflection-loop-critic-label"
          data-component="ReflectionLoop"
          x="398"
          y="72"
          fontSize="19"
          className="fill-foreground font-medium"
        >
          {t('reflection-loop.critic')}
        </text>
        <rect
          id="reflection-loop-critic-result"
          data-component="ReflectionLoop"
          x="398"
          y="92"
          width="202"
          height="10"
          rx="5"
          className="fill-primary/50"
        />
        <text
          id="reflection-loop-critic-result-label"
          data-component="ReflectionLoop"
          x="398"
          y="120"
          fontSize="12"
          className="fill-muted-foreground"
        >
          {t('reflection-loop.result')}
        </text>
        <rect
          id="reflection-loop-critic-empty"
          data-component="ReflectionLoop"
          x="398"
          y="130"
          width="202"
          height="60"
          rx="8"
          fill="none"
          strokeWidth="1.5"
          strokeDasharray="5 5"
          className="stroke-primary/30"
        />
        <text
          id="reflection-loop-critic-empty-label"
          data-component="ReflectionLoop"
          x="499"
          y="160"
          fontSize="14"
          textAnchor="middle"
          dominantBaseline="middle"
          className="fill-muted-foreground"
        >
          {t('reflection-loop.empty')}
        </text>
        <text
          id="reflection-loop-critic-caption"
          data-component="ReflectionLoop"
          x="499"
          y="240"
          fontSize="14"
          textAnchor="middle"
          className="fill-muted-foreground"
        >
          {t('reflection-loop.nostake')}
        </text>

        {/* out with the result, back with the objections */}
        <path
          id="reflection-loop-handoff"
          data-component="ReflectionLoop"
          d="M 268 96 L 370 96"
          fill="none"
          strokeWidth="2"
          markerEnd={`url(#${arrowId})`}
          className="stroke-primary/50"
        />
        <text
          id="reflection-loop-handoff-label"
          data-component="ReflectionLoop"
          x="319"
          y="82"
          fontSize="13"
          textAnchor="middle"
          className="fill-muted-foreground"
        >
          {t('reflection-loop.hands-over')}
        </text>
        <path
          id="reflection-loop-verdict"
          data-component="ReflectionLoop"
          d="M 372 160 L 270 160"
          fill="none"
          strokeWidth="2"
          markerEnd={`url(#${arrowId})`}
          className="stroke-primary/50"
        />
        <text
          id="reflection-loop-verdict-label"
          data-component="ReflectionLoop"
          x="319"
          y="182"
          fontSize="13"
          textAnchor="middle"
          className="fill-muted-foreground"
        >
          {t('reflection-loop.back')}
        </text>
      </svg>
    </figure>
  )
}
