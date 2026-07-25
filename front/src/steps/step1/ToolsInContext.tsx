import { useId } from 'react'
import { useTranslation } from 'react-i18next'

/**
 * Where a tool sits relative to the window. The teal frame is the context, the bars in it are what
 * the model can read, and the tool is drawn straddling the frame's right edge on purpose: the half
 * inside is the definition the model can call, the dashed half outside is your machine, which is the
 * part it never sees. Only the result crosses back in, and it crosses back in as ordinary bars
 * sitting next to the prompt.
 *
 * Static, like the other diagrams in this step, and on the same vocabulary as CoordinatorFanout and
 * ReflectionLoop: a teal frame is a context, a bar is something in it, dashes are what is not.
 */
export function ToolsInContext() {
  const { t } = useTranslation('step1')
  const titleId = useId()
  const arrowId = `tools-in-context-arrow-${useId().replace(/:/g, '')}`

  /* The tool box, drawn twice: once for the half inside the frame and once for the half outside it.
     The seam is x=430, which is exactly the frame's right edge, so the two halves read as one shape
     cut by the border. The fill is a separate element from the stroke because the closing edge of
     the inside half would otherwise paint a solid line over that border. */
  const inside = 'M 430 146 H 280 a 14 14 0 0 0 -14 14 v 28 a 14 14 0 0 0 14 14 H 430'

  /* Three bars rather than one: a tool result is bulky, and that is half of what the figure says. */
  const resultBars = [352, 300, 240]

  return (
    <figure id="tools-in-context" data-component="ToolsInContext" className="my-8 flex justify-center">
      <svg
        id="tools-in-context-svg"
        data-component="ToolsInContext"
        viewBox="0 0 640 350"
        role="img"
        aria-labelledby={titleId}
        className="h-auto w-full max-w-xl"
      >
        {/* useId, not a BEM id: aria-labelledby has to be unique per instance, not per component. */}
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

        {/* the context window */}
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
          strokeWidth="2"
          strokeDasharray="6 6"
          className="stroke-primary/40"
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
            />
          ))}
        </g>

        <text
          id="tools-in-context-caption"
          data-component="ToolsInContext"
          x="320"
          y="338"
          fontSize="15"
          textAnchor="middle"
          className="fill-muted-foreground"
        >
          {t('tools-in-context.caption')}
        </text>
      </svg>
    </figure>
  )
}
