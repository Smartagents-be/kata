import type { CSSProperties } from 'react'
import { useTranslation } from 'react-i18next'
import { cn } from '@/shared/lib/utils'

/** The drawing's own coordinate space. Everything below is placed in these units. */
const W = 700
const H = 470

/** The ring: centre and radius, shared by the SVG circle and the comet's orbit. */
const CX = 350
const CY = 215
const R = 140

/** A length in drawing units, scaled to the frame's width (the frame is the container). */
const u = (n: number) => `calc(${n} * 100cqw / ${W})`
/** A length in drawing units with a floor, so a label stays legible on a phone. */
const uMin = (n: number, px: number) => `max(${u(n)}, ${px}px)`
/** A point in drawing units as a position inside the stage. */
const at = (x: number, y: number): CSSProperties => ({
  left: `${(x / W) * 100}%`,
  top: `${(y / H) * 100}%`,
})

/** The three API names: machine words, so mono, and set back so they label rather than shout. */
const apiLabel = 'text-muted-foreground absolute font-mono whitespace-nowrap'

/**
 * The two steps that repeat. The comet starts at the top and runs clockwise, so it passes the
 * harness on the right at a quarter of the period and the model on the left at three quarters,
 * which is what the delays say: the pulse peaks a quarter of the way into its own timeline.
 */
const NODES = [
  { key: 'decide', x: 215, delay: '3.2s' },
  { key: 'run', x: 485, delay: '0s' },
] as const

/**
 * The agentic loop, as a ring: your goal comes in at the top, the model decides, the harness runs
 * the tool, the result goes back into the window, and round again until the model asks for no more
 * tools and the answer leaves at the bottom. A port of the agents slide in the ontbijtsessie deck
 * (`15-bouwsteen-agents.njk` and the `ag-*` rules in its `deck.css`), redrawn in this course's one
 * teal and on its tokens.
 *
 * Three things about it are decisions. **The ring is a path, not a frame**: nothing sits inside it
 * and it draws no window, so `ToolsInContext` below it is still the first context frame a student
 * meets, and the moving dashes are motion rather than the step's dashed outside-the-window stroke.
 * **The mono labels are the Claude API's own names** (`tool_use`, `tool_result`, `end_turn`), and
 * the caption says so, because they are the words a student meets the moment they read a transcript
 * or the API docs; each sits clear of the chevrons, the exit card and each other, and `end_turn` is
 * on the far side of the exit arrow for that reason. And **under `prefers-reduced-motion` it is fully
 * static**: the ring stops flowing, the nodes stop pulsing, and the comet goes, since a dot frozen
 * on the ring would point at a moment that is not happening.
 *
 * The HTML sits over the SVG on one coordinate space, and every length is in container units of
 * the frame around the stage, so the whole drawing scales as one the way a `viewBox` does. The
 * labels have a floor, so on a phone they come out larger than the drawing around them, and three
 * things give way below 28rem to keep them apart: the two lines under the node names go (the lead
 * paragraph above says the same two sentences), the nodes widen, and `tool_use` and `tool_result`
 * move out past the right of the ring, clear of the entry chip and the exit card they would
 * otherwise reach.
 */
export function AgentLoop() {
  const { t } = useTranslation('step1')

  return (
    <figure
      id="agent-loop"
      data-component="AgentLoop"
      className="my-8 flex flex-col items-center gap-3"
    >
      {/* The frame is the container the lengths are measured against; the stage inside it holds
          the drawing's aspect ratio, and on a phone keeps room under it for an exit card that wraps. */}
      <div
        id="agent-loop-frame"
        data-component="AgentLoop"
        className="@container w-full max-w-2xl"
      >
        <div
          id="agent-loop-stage"
          data-component="AgentLoop"
          role="img"
          aria-label={t('agent-loop.description')}
          className="relative w-full @max-md:mb-10"
          style={{ aspectRatio: `${W} / ${H}` }}
        >
          <svg
            id="agent-loop-svg"
            data-component="AgentLoop"
            viewBox={`0 0 ${W} ${H}`}
            aria-hidden
            className="absolute inset-0 size-full overflow-visible"
          >
            <circle
              id="agent-loop-track"
              data-component="AgentLoop"
              cx={CX}
              cy={CY}
              r={R}
              fill="none"
              strokeWidth="2.5"
              className="stroke-primary/20"
            />
            <circle
              id="agent-loop-flow"
              data-component="AgentLoop"
              cx={CX}
              cy={CY}
              r={R}
              fill="none"
              strokeWidth="4"
              strokeLinecap="round"
              strokeDasharray="8 44"
              className="stroke-primary animate-loop-flow motion-reduce:animate-none"
            />
            {/* clockwise: the top arc runs model to harness, the bottom arc harness to model */}
            <g
              id="agent-loop-chevron-0-at"
              data-component="AgentLoop"
              transform={`translate(${CX},${CY - R})`}
            >
              <path
                id="agent-loop-chevron-0"
                data-component="AgentLoop"
                d="M -7 -9 L 5 0 L -7 9"
                fill="none"
                strokeWidth="4"
                strokeLinecap="round"
                strokeLinejoin="round"
                className="stroke-primary"
              />
            </g>
            <g
              id="agent-loop-chevron-1-at"
              data-component="AgentLoop"
              transform={`translate(${CX},${CY + R}) rotate(180)`}
            >
              <path
                id="agent-loop-chevron-1"
                data-component="AgentLoop"
                d="M -7 -9 L 5 0 L -7 9"
                fill="none"
                strokeWidth="4"
                strokeLinecap="round"
                strokeLinejoin="round"
                className="stroke-primary"
              />
            </g>

            {/* your goal in at the top, the answer out at the bottom, both on the model's side */}
            <g
              id="agent-loop-io"
              data-component="AgentLoop"
              className="stroke-primary/50"
              fill="none"
              strokeWidth="3"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <path id="agent-loop-in" data-component="AgentLoop" d="M 215 46 L 215 140" />
              <path
                id="agent-loop-in-head"
                data-component="AgentLoop"
                d="M 207 134 L 215 145 L 223 134"
              />
              <path id="agent-loop-out" data-component="AgentLoop" d="M 215 290 L 215 386" />
              <path
                id="agent-loop-out-head"
                data-component="AgentLoop"
                d="M 207 380 L 215 391 L 223 380"
              />
            </g>
          </svg>

          <div
            id="agent-loop-entry"
            data-component="AgentLoop"
            className="bg-foreground text-card absolute -translate-1/2 rounded-full font-semibold whitespace-nowrap"
            style={{
              ...at(215, 24),
              fontSize: uMin(13.5, 10),
              padding: `${uMin(7, 4)} ${uMin(16, 10)}`,
            }}
          >
            {t('agent-loop.entry')}
          </div>

          {/* a zero-size point at the ring's centre that turns, carrying the comet out at the radius */}
          <div
            id="agent-loop-orbit"
            data-component="AgentLoop"
            aria-hidden
            className="animate-loop-orbit absolute size-0 motion-reduce:hidden"
            style={at(CX, CY)}
          >
            <div
              id="agent-loop-comet"
              data-component="AgentLoop"
              className="bg-primary absolute rounded-full shadow-[0_0_0_5px_color-mix(in_oklch,var(--primary)_20%,transparent),0_0_20px_4px_color-mix(in_oklch,var(--primary)_50%,transparent)]"
              style={{
                width: u(18),
                height: u(18),
                left: u(-9),
                top: u(-9),
                transform: `translateY(${u(-R)})`,
              }}
            />
          </div>

          {NODES.map((node, index) => (
            <div
              key={node.key}
              id={`agent-loop-node-${index}`}
              data-component="AgentLoop"
              className="animate-loop-node border-border bg-card absolute w-[34cqw] -translate-1/2 border-[1.5px] motion-reduce:animate-none @max-md:w-[37cqw]"
              style={{
                ...at(node.x, CY),
                animationDelay: node.delay,
                borderRadius: uMin(14, 8),
                padding: `${uMin(14, 6)} ${uMin(16, 7)}`,
              }}
            >
              <div
                id={`agent-loop-node-${index}-head`}
                data-component="AgentLoop"
                className="flex items-center"
                style={{ gap: uMin(10, 5) }}
              >
                <span
                  id={`agent-loop-node-${index}-num`}
                  data-component="AgentLoop"
                  className="animate-loop-num bg-muted text-muted-foreground inline-flex shrink-0 items-center justify-center rounded-full font-bold motion-reduce:animate-none"
                  style={{
                    animationDelay: node.delay,
                    width: uMin(28, 18),
                    height: uMin(28, 18),
                    fontSize: uMin(15, 10),
                  }}
                >
                  {index + 1}
                </span>
                <span
                  id={`agent-loop-node-${index}-name`}
                  data-component="AgentLoop"
                  className="text-foreground leading-tight font-bold"
                  style={{ fontSize: uMin(16, 11) }}
                >
                  {t(`agent-loop.${node.key}.name`)}
                </span>
              </div>
              <p
                id={`agent-loop-node-${index}-sub`}
                data-component="AgentLoop"
                className="text-muted-foreground leading-snug @max-md:hidden"
                style={{ fontSize: u(13), marginTop: u(6) }}
              >
                {t(`agent-loop.${node.key}.sub`)}
              </p>
            </div>
          ))}

          <span
            id="agent-loop-api-tool-use"
            data-component="AgentLoop"
            className={cn(
              apiLabel,
              'top-[12.34%] left-1/2 -translate-1/2',
              // on a phone the entry chip is wide enough to reach it, so it moves out past the arc
              '@max-md:top-[21.3%] @max-md:left-[66.6%] @max-md:translate-x-0',
            )}
            style={{ fontSize: uMin(11, 9) }}
          >
            tool_use
          </span>
          {/* below the bottom arc and well under the chevron's lower arm */}
          <span
            id="agent-loop-api-tool-result"
            data-component="AgentLoop"
            className={cn(
              apiLabel,
              'top-[81.28%] left-[52.57%] -translate-1/2',
              // and this one would reach the exit card, so it moves out the same way
              '@max-md:top-[70.2%] @max-md:left-[66.6%] @max-md:translate-x-0',
            )}
            style={{ fontSize: uMin(11, 9) }}
          >
            tool_result
          </span>
          {/* on the far side of the exit arrow, so it is clear of the card and of tool_result */}
          <span
            id="agent-loop-api-end-turn"
            data-component="AgentLoop"
            className={cn(apiLabel, '-translate-x-full -translate-y-1/2')}
            style={{ ...at(203, 345), fontSize: uMin(11, 9) }}
          >
            end_turn
          </span>

          <div
            id="agent-loop-exit"
            data-component="AgentLoop"
            className="border-primary bg-primary/10 absolute w-[28cqw] -translate-x-1/2 border-[1.5px] text-center @max-md:w-[42cqw]"
            style={{
              ...at(215, 396),
              borderRadius: uMin(12, 8),
              padding: `${uMin(8, 4)} ${uMin(12, 6)}`,
            }}
          >
            <div
              id="agent-loop-exit-tag"
              data-component="AgentLoop"
              className="text-primary font-bold tracking-wide uppercase"
              style={{ fontSize: uMin(11, 8.5) }}
            >
              {t('agent-loop.exit.tag')}
            </div>
            <div
              id="agent-loop-exit-text"
              data-component="AgentLoop"
              className="text-foreground font-bold"
              style={{ fontSize: uMin(14, 10.5), marginTop: u(3) }}
            >
              {t('agent-loop.exit.text')}
            </div>
          </div>
        </div>
      </div>

      <figcaption
        id="agent-loop-caption"
        data-component="AgentLoop"
        className="text-muted-foreground text-center text-xs"
      >
        {t('agent-loop.caption')}
      </figcaption>
    </figure>
  )
}
