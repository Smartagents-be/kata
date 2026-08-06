import { useId } from 'react'
import { useTranslation } from 'react-i18next'

/**
 * The finite context window making room. The window is a fixed frame filled with turns; a new turn
 * enters at the bottom, and at the top the oldest two have collapsed into one short summary bar
 * that is still inside the frame. What leaves the frame is the detail, the faded tilted bars rising
 * off that summary rather than off the window itself.
 *
 * That distinction is the figure. It drew the oldest turns spilling out of the frame once, which is
 * the branch `amnesia-context-fatigue.1` no longer claims: both harnesses this course targets
 * compact automatically, so the summary is what a student actually meets and the detail is what
 * they lose. Static on purpose, like the ContextDiagram it sits below, so it reads at a glance.
 */
export function ContextFalloff() {
  const { t } = useTranslation('step1')
  const titleId = useId()

  // Top edge of each turn still carried in full, oldest first. The last one is the newest turn, and
  // it is drawn solid; the rest fade back into the stack.
  const turns = [126, 157, 188, 219, 250, 281]

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
          y="86"
          width="180"
          height="228"
          rx="18"
          strokeWidth="2"
          className="fill-primary/5 stroke-primary/40"
        />

        {/* the detail that did not survive the summary: faded and tilted, on its way out of the
            frame, and drawn rising off the short bar below rather than off the stack of turns */}
        <g className="fill-primary/20 stroke-primary/30" strokeWidth="1.5">
          <rect
            id="context-falloff-gone-0"
            data-component="ContextFalloff"
            x="198"
            y="52"
            width="124"
            height="18"
            rx="5"
            opacity="0.5"
            transform="rotate(-6 260 61)"
          />
          <rect
            id="context-falloff-gone-1"
            data-component="ContextFalloff"
            x="208"
            y="20"
            width="110"
            height="18"
            rx="5"
            opacity="0.3"
            transform="rotate(-13 263 29)"
          />
        </g>

        {/* the oldest turns, now one short bar inside the frame */}
        <g id="context-falloff-summary-group" data-component="ContextFalloff">
          <rect
            id="context-falloff-summary"
            data-component="ContextFalloff"
            x="196"
            y="98"
            width="128"
            height="18"
            rx="5"
            strokeWidth="1.5"
            className="fill-primary/15 stroke-primary/35"
          />
          <rect
            id="context-falloff-summary-line"
            data-component="ContextFalloff"
            x="208"
            y="105"
            width="76"
            height="4"
            rx="2"
            className="fill-primary/40"
          />
        </g>

        {/* the turns still carried in full, newest at the bottom drawn solid */}
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
                height="25"
                rx="6"
                strokeWidth="1.5"
                className={
                  newest ? 'fill-primary stroke-primary' : 'fill-primary/20 stroke-primary/40'
                }
              />
              <rect
                x="194"
                y={y + 10}
                width="104"
                height="5"
                rx="2.5"
                className={newest ? 'fill-primary-foreground/70' : 'fill-primary/40'}
              />
            </g>
          )
        })}

        {/* connectors and labels: the detail leaving at the top, the summary it left behind, and the
            newest turn arriving at the bottom */}
        <line x1="352" y1="54" x2="328" y2="54" strokeWidth="1.5" className="stroke-muted-foreground/50" />
        <text
          id="context-falloff-dropped-label"
          data-component="ContextFalloff"
          x="356"
          y="58"
          fontSize="14"
          className="fill-muted-foreground"
        >
          {t('falloff.dropped')}
        </text>

        <line x1="166" y1="107" x2="192" y2="107" strokeWidth="1.5" className="stroke-muted-foreground/50" />
        <text
          id="context-falloff-summarised-label"
          data-component="ContextFalloff"
          x="160"
          y="111"
          fontSize="14"
          textAnchor="end"
          className="fill-muted-foreground"
        >
          {t('falloff.summarised')}
        </text>

        <line x1="356" y1="294" x2="342" y2="294" strokeWidth="1.5" className="stroke-muted-foreground/50" />
        <text
          id="context-falloff-newest-label"
          data-component="ContextFalloff"
          x="360"
          y="298"
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
