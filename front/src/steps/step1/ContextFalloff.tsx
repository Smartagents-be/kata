import { useId } from 'react'
import { useTranslation } from 'react-i18next'

/**
 * The finite context window losing its oldest content. The window is a fixed frame filled with
 * turns; a new turn enters at the bottom and the oldest turns spill off the top, faded and tilted,
 * out of the frame. That is the amnesia the `amnesia-context-fatigue` section describes: nothing is
 * deleted on purpose, the window is just full and the evidence has left the room. Static on
 * purpose, like the ContextDiagram it sits above, so it reads at a glance.
 */
export function ContextFalloff() {
  const { t } = useTranslation('step1')
  const titleId = useId()

  // Top edge of each turn inside the window, oldest first. The last one is the newest turn, and it
  // is drawn solid; the rest fade back into the stack.
  const turns = [90, 126, 162, 198, 234, 270]

  return (
    <figure
      id="context-falloff"
      data-component="ContextFalloff"
      className="my-8 flex justify-center"
    >
      <svg
        id="context-falloff-svg"
        data-component="ContextFalloff"
        viewBox="0 0 520 340"
        role="img"
        aria-labelledby={titleId}
        className="h-auto w-full max-w-md"
      >
        <title id={titleId} data-component="ContextFalloff">
          {t('falloff.description')}
        </title>

        {/* the window: one fixed frame, the same teal outline as the ContextDiagram */}
        <rect
          id="context-falloff-window"
          data-component="ContextFalloff"
          x="170"
          y="78"
          width="180"
          height="234"
          rx="18"
          strokeWidth="2"
          className="fill-primary/5 stroke-primary/40"
        />

        {/* the oldest turns, spilling off the top of the frame: faded and tilted, on their way out */}
        <g className="fill-primary/20 stroke-primary/30" strokeWidth="1.5">
          <rect
            id="context-falloff-gone-0"
            data-component="ContextFalloff"
            x="182"
            y="58"
            width="156"
            height="28"
            rx="6"
            opacity="0.5"
            transform="rotate(-6 260 72)"
          />
          <rect
            id="context-falloff-gone-1"
            data-component="ContextFalloff"
            x="192"
            y="22"
            width="150"
            height="28"
            rx="6"
            opacity="0.3"
            transform="rotate(-13 260 36)"
          />
        </g>

        {/* the turns still inside, newest at the bottom drawn solid */}
        {turns.map((y, index) => {
          const newest = index === turns.length - 1
          return (
            <g key={y} data-component="ContextFalloff">
              <rect
                id={`context-falloff-turn-${index}`}
                data-component="ContextFalloff"
                x="182"
                y={y}
                width="156"
                height="28"
                rx="6"
                strokeWidth="1.5"
                className={
                  newest ? 'fill-primary stroke-primary' : 'fill-primary/20 stroke-primary/40'
                }
              />
              <rect
                x="194"
                y={y + 11}
                width="104"
                height="5"
                rx="2.5"
                className={newest ? 'fill-primary-foreground/70' : 'fill-primary/40'}
              />
            </g>
          )
        })}

        {/* connectors and labels: oldest leaving the top, newest arriving at the bottom */}
        <line x1="352" y1="52" x2="336" y2="66" strokeWidth="1.5" className="stroke-muted-foreground/50" />
        <text
          id="context-falloff-dropped-label"
          data-component="ContextFalloff"
          x="356"
          y="56"
          fontSize="14"
          className="fill-muted-foreground"
        >
          {t('falloff.dropped')}
        </text>

        <line x1="356" y1="284" x2="342" y2="284" strokeWidth="1.5" className="stroke-muted-foreground/50" />
        <text
          id="context-falloff-newest-label"
          data-component="ContextFalloff"
          x="360"
          y="288"
          fontSize="14"
          className="fill-foreground"
        >
          {t('falloff.newest')}
        </text>

        <text
          id="context-falloff-window-label"
          data-component="ContextFalloff"
          x="260"
          y="334"
          fontSize="15"
          textAnchor="middle"
          className="fill-muted-foreground font-medium"
        >
          {t('falloff.window')}
        </text>
      </svg>
    </figure>
  )
}
