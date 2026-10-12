import { useId } from 'react'
import { useTranslation } from 'react-i18next'
import { StoryToggle } from '@/shared/motion/StoryToggle'
import { beat, cubic, glide, useStory } from '@/shared/motion/useStory'

/**
 * Where a tool sits relative to the window. The teal frame is the context, the bars in it are what
 * the model can read, and the tool is drawn straddling the frame's right edge on purpose: the half
 * inside is the definition the model can call, the dashed half outside is your machine, which is the
 * part it never sees. Only the result crosses back in, and it crosses back in as ordinary bars
 * sitting next to the prompt.
 *
 * On the same vocabulary as CoordinatorFanout and ReflectionLoop: a teal frame is a context, a bar is
 * something in it, dashes are what is not.
 *
 * **It plays one loop of `AgentLoop` up close**, the figure straight above it, on `useStory`'s clock
 * (October 2026, at the owner's asking): a `tool_use` chip leaves the half inside the window for
 * the half outside, the tool runs there, and its result comes back along the arrow and lands as a
 * bar. Three rounds, so the three bars this figure always had arrive one at a time, which is the
 * part a still drawing could not say: the window fills with every round. Then the model asks for no
 * more tools, `end_turn`, and its answer is a bar in the window that also goes out to you. The last
 * frame is the drawing as it was plus that answer, and it is what reduced motion shows.
 * **The geometry is unchanged**, because `McpServer` below is drawn on this same frame and prompt
 * bar and says nothing without them.
 */

/** Three rounds of call, run and result, then the answer. All times in ms on the story clock. */
const ROUND = 3400
const FIRST = 300
const CALL = 700
const RUN = 1000
const BACK = 900
const ANSWER = FIRST + 3 * ROUND
const LENGTH = ANSWER + 2100

/** A point on the return arrow's curve, so a result travels the line it is drawn on. */
const onReturn = (k: number) => cubic([500, 202], [500, 226], [470, 247], [414, 247], k)
export function ToolsInContext() {
  const { t } = useTranslation('step1')
  const [ref, now, story] = useStory<SVGSVGElement>(LENGTH, 3000)
  const titleId = useId()
  const arrowId = `tools-in-context-arrow-${useId().replace(/:/g, '')}`

  /* The tool box, drawn twice: once for the half inside the frame and once for the half outside it.
     The seam is x=430, which is exactly the frame's right edge, so the two halves read as one shape
     cut by the border. The fill is a separate element from the stroke because the closing edge of
     the inside half would otherwise paint a solid line over that border. */
  const inside = 'M 430 146 H 280 a 14 14 0 0 0 -14 14 v 28 a 14 14 0 0 0 14 14 H 430'

  /* Three bars rather than one: a tool result is bulky, and that is half of what the figure says. */
  const resultBars = [352, 300, 240]

  /* Where the story is: which round, and how far through its call, run and return. */
  const round = Math.min(2, Math.max(0, Math.floor((now - FIRST) / ROUND)))
  const r0 = FIRST + round * ROUND
  const inRounds = now >= FIRST && now < ANSWER
  const call = inRounds ? glide(now, r0, CALL) : 0
  const running = inRounds && now >= r0 + CALL && now < r0 + CALL + RUN
  const back = inRounds ? beat(now, r0 + CALL + RUN, BACK) : 0
  const landed = (index: number) => (now >= FIRST + index * ROUND + CALL + RUN + BACK ? 1 : 0)
  const [rx, ry] = onReturn(back)
  const answer = beat(now, ANSWER, 400)
  const out = glide(now, ANSWER + 400, 900)
  const arrived = now >= ANSWER + 1300
  const counter =
    now >= ANSWER ? t('tools-in-context.end') : t('tools-in-context.round', { n: round + 1 })

  return (
    <figure id="tools-in-context" data-component="ToolsInContext" className="my-8 flex flex-col items-center gap-2">
      <svg
        id="tools-in-context-svg"
        data-component="ToolsInContext"
        ref={ref}
        viewBox="0 0 640 342"
        role="img"
        aria-labelledby={titleId}
        className="h-auto w-full max-w-xl"
      >
        <title id={titleId} data-component="ToolsInContext">
          {t('tools-in-context.description')}
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

        <rect
          id="tools-in-context-window"
          data-component="ToolsInContext"
          x="30"
          y="28"
          width="400"
          height="286"
          rx="16"
          strokeWidth="2"
          className="fill-primary/5 stroke-primary/40"
        />
        <text
          id="tools-in-context-window-label"
          data-component="ToolsInContext"
          x="54"
          y="58"
          fontSize="20"
          className="fill-foreground font-medium"
        >
          {t('tools-in-context.context')}
        </text>

        {/* the prompt: one short bar, the only thing here you typed */}
        <text
          id="tools-in-context-prompt-label"
          data-component="ToolsInContext"
          x="54"
          y="94"
          fontSize="13"
          className="fill-muted-foreground"
        >
          {t('tools-in-context.prompt')}
        </text>
        <rect
          id="tools-in-context-prompt"
          data-component="ToolsInContext"
          x="54"
          y="102"
          width="140"
          height="14"
          rx="7"
          className="fill-primary"
        />

        {/* the tool: half in the window, half on your machine */}
        <path
          id="tools-in-context-tool-fill"
          data-component="ToolsInContext"
          d={`${inside} Z`}
          className="fill-primary/15"
        />
        <path
          id="tools-in-context-tool"
          data-component="ToolsInContext"
          d={inside}
          fill="none"
          strokeWidth="2"
          className="stroke-primary/50"
        />
        <path
          id="tools-in-context-tool-outside"
          data-component="ToolsInContext"
          d="M 430 146 H 586 a 14 14 0 0 1 14 14 v 28 a 14 14 0 0 1 -14 14 H 430"
          fill="none"
          strokeWidth={running ? 3 : 2}
          strokeDasharray="6 6"
          className={running ? 'stroke-primary' : 'stroke-primary/40'}
        />
        <text
          id="tools-in-context-tool-label"
          data-component="ToolsInContext"
          x="292"
          y="174"
          fontSize="18"
          dominantBaseline="middle"
          className="fill-foreground font-medium"
        >
          {t('tools-in-context.tool')}
        </text>
        <text
          id="tools-in-context-outside-label"
          data-component="ToolsInContext"
          x="515"
          y="136"
          fontSize="13"
          textAnchor="middle"
          className="fill-muted-foreground"
        >
          {t('tools-in-context.outside')}
        </text>
        <text
          id="tools-in-context-commands-0"
          data-component="ToolsInContext"
          x="515"
          y="168"
          fontSize="13"
          textAnchor="middle"
          className="fill-muted-foreground font-mono"
        >
          {t('tools-in-context.commands.1')}
        </text>
        <text
          id="tools-in-context-commands-1"
          data-component="ToolsInContext"
          x="515"
          y="188"
          fontSize="13"
          textAnchor="middle"
          className="fill-muted-foreground font-mono"
        >
          {t('tools-in-context.commands.2')}
        </text>

        {/* what comes back, crossing the border on its way in */}
        <path
          id="tools-in-context-return"
          data-component="ToolsInContext"
          d="M 500 202 C 500 226 470 247 414 247"
          fill="none"
          strokeWidth="2"
          markerEnd={`url(#${arrowId})`}
          className="stroke-primary/50"
        />
        <text
          id="tools-in-context-result-label"
          data-component="ToolsInContext"
          x="54"
          y="232"
          fontSize="13"
          className="fill-muted-foreground"
        >
          {t('tools-in-context.result')}
        </text>
        <g className="fill-primary/35">
          {resultBars.map((width, index) => (
            <rect
              key={width}
              id={`tools-in-context-result-${index}`}
              data-component="ToolsInContext"
              x="54"
              y={240 + index * 18}
              width={width}
              height="14"
              rx="7"
              style={{ opacity: landed(index) }}
            />
          ))}
        </g>

        {/* the call going out, and the result coming back along the arrow */}
        <g
          id="tools-in-context-call"
          data-component="ToolsInContext"
          transform={`translate(${282 + call * 90},162)`}
          style={{ opacity: inRounds && call > 0 && !running && back === 0 ? 1 : 0 }}
        >
          <rect
            id="tools-in-context-call-chip"
            data-component="ToolsInContext"
            width="96"
            height="24"
            rx="8"
            strokeWidth="1.5"
            className="fill-background stroke-primary"
          />
          <text
            id="tools-in-context-call-label"
            data-component="ToolsInContext"
            x="48"
            y="16"
            fontSize="12"
            textAnchor="middle"
            className="fill-primary font-mono"
          >
            tool_use
          </text>
        </g>
        <circle
          id="tools-in-context-result-dot"
          data-component="ToolsInContext"
          cx={rx}
          cy={ry}
          r="7"
          className="fill-primary"
          style={{ opacity: back > 0 && back < 1 ? 1 : 0 }}
        />

        {/* the answer: a bar in the window, and the same answer going out to you */}
        <rect
          id="tools-in-context-answer"
          data-component="ToolsInContext"
          x="54"
          y="296"
          width="140"
          height="10"
          rx="5"
          className="fill-primary"
          style={{ opacity: answer }}
        />
        <text
          id="tools-in-context-answer-label"
          data-component="ToolsInContext"
          x="204"
          y="305"
          fontSize="13"
          className="fill-muted-foreground"
          style={{ opacity: answer }}
        >
          {t('tools-in-context.answer')}
        </text>
        <rect
          id="tools-in-context-you"
          data-component="ToolsInContext"
          x="470"
          y="270"
          width="130"
          height="44"
          rx="12"
          strokeWidth="2"
          className={arrived ? 'fill-primary/15 stroke-primary/60' : 'fill-background stroke-border'}
        />
        <text
          id="tools-in-context-you-label"
          data-component="ToolsInContext"
          x="535"
          y="292"
          fontSize="16"
          textAnchor="middle"
          dominantBaseline="middle"
          className="fill-foreground"
        >
          {t('tools-in-context.you')}
        </text>
        <g
          id="tools-in-context-end"
          data-component="ToolsInContext"
          transform={`translate(${200 + out * 262},280)`}
          style={{ opacity: out > 0 && !arrived ? 1 : 0 }}
        >
          <rect
            id="tools-in-context-end-chip"
            data-component="ToolsInContext"
            width="96"
            height="24"
            rx="8"
            strokeWidth="1.5"
            className="fill-background stroke-primary"
          />
          <text
            id="tools-in-context-end-label"
            data-component="ToolsInContext"
            x="48"
            y="16"
            fontSize="12"
            textAnchor="middle"
            className="fill-primary font-mono"
          >
            end_turn
          </text>
        </g>
        <text
          id="tools-in-context-counter"
          data-component="ToolsInContext"
          x="30"
          y="336"
          fontSize="13"
          className="fill-muted-foreground font-mono"
        >
          {counter}
        </text>
      </svg>
      <StoryToggle id="tools-in-context" component="ToolsInContext" story={story} className="max-w-xl" />
    </figure>
  )
}
