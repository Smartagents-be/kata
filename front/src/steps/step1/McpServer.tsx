import { useId } from 'react'
import { useTranslation } from 'react-i18next'

/**
 * What connecting a server does to your window. The frame, the prompt bar and the fill-and-stroke
 * vocabulary are ToolsInContext's, so the two figures read as one picture; what this one adds is the
 * wire. A single line leaves the named box outside, crosses the frame once, and fans out into four
 * description bars sitting in the window. That is the whole argument: you connect one thing, and
 * everything it offers turns up inside your window as a description, whether you call it or not.
 *
 * The crossing is where the vocabulary does its work: the segment outside the frame is dashed and the
 * segment inside is solid, so the border still means what it means everywhere else in this step.
 *
 * It carries no caption, and it keeps ToolsInContext's viewBox height anyway. The empty band at the
 * foot is the price of the two frames rendering at exactly the same size, which is what makes them
 * read as one picture; shrinking the box to fit the drawing would scale this frame up against that
 * one.
 */
export function McpServer() {
  const { t } = useTranslation('step1')
  const titleId = useId()
  const arrowId = `mcp-server-arrow-${useId().replace(/:/g, '')}`

  /** The four description bars, top to bottom: y is the bar's top edge, and each is 20 tall. */
  const tools = [
    { y: 158, key: 'mcp-server.tool.1' },
    { y: 188, key: 'mcp-server.tool.2' },
    { y: 218, key: 'mcp-server.tool.3' },
    { y: 248, key: 'mcp-server.tool.4' },
  ]

  /* The fan, drawn as one bracket plus two straight legs. The bracket carries the outer two rows and
     the trunk between them in a single stroke, so the corners round; the middle two rows just T into
     it. Everything meets at x=340, which is where the inbound line stops. */
  const bracket = 'M 264 168 H 330 a 10 10 0 0 1 10 10 V 248 a 10 10 0 0 1 -10 10 H 264'

  return (
    <figure id="mcp-server" data-component="McpServer" className="my-8 flex justify-center">
      <svg
        id="mcp-server-svg"
        data-component="McpServer"
        viewBox="0 0 640 350"
        role="img"
        aria-labelledby={titleId}
        className="h-auto w-full max-w-xl"
      >
        {/* useId, not a BEM id: aria-labelledby has to be unique per instance, not per component. */}
        <title id={titleId} data-component="McpServer">
          {t('mcp-server.description')}
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

        {/* the context window, at the size ToolsInContext drew it */}
        <rect
          id="mcp-server-window"
          data-component="McpServer"
          x="30"
          y="28"
          width="400"
          height="286"
          rx="16"
          strokeWidth="2"
          className="fill-primary/5 stroke-primary/40"
        />
        <text
          id="mcp-server-window-label"
          data-component="McpServer"
          x="54"
          y="58"
          fontSize="20"
          className="fill-foreground font-medium"
        >
          {t('mcp-server.context')}
        </text>

        {/* the prompt, unchanged, so the two figures line up */}
        <text
          id="mcp-server-prompt-label"
          data-component="McpServer"
          x="54"
          y="94"
          fontSize="13"
          className="fill-muted-foreground"
        >
          {t('mcp-server.prompt')}
        </text>
        <rect
          id="mcp-server-prompt"
          data-component="McpServer"
          x="54"
          y="102"
          width="140"
          height="14"
          rx="7"
          className="fill-primary"
        />

        <text
          id="mcp-server-tools-label"
          data-component="McpServer"
          x="54"
          y="150"
          fontSize="13"
          className="fill-muted-foreground"
        >
          {t('mcp-server.descriptions')}
        </text>

        {/* the server: one named box, wholly outside the frame */}
        <rect
          id="mcp-server-outside"
          data-component="McpServer"
          x="470"
          y="158"
          width="134"
          height="110"
          rx="14"
          fill="none"
          strokeWidth="2"
          strokeDasharray="6 6"
          className="stroke-primary/40"
        />
        <text
          id="mcp-server-outside-label"
          data-component="McpServer"
          x="537"
          y="213"
          fontSize="17"
          textAnchor="middle"
          dominantBaseline="middle"
          className="fill-foreground font-medium"
        >
          {t('mcp-server.server')}
        </text>

        {/* the one connection: dashed while it is outside, solid once it is in the window */}
        <path
          id="mcp-server-link-outside"
          data-component="McpServer"
          d="M 470 213 H 430"
          fill="none"
          strokeWidth="2"
          strokeDasharray="6 6"
          className="stroke-primary/40"
        />
        <path
          id="mcp-server-link"
          data-component="McpServer"
          d="M 430 213 H 342"
          fill="none"
          strokeWidth="2"
          markerEnd={`url(#${arrowId})`}
          className="stroke-primary/50"
        />

        {/* and what it fans out into */}
        <path
          id="mcp-server-fan"
          data-component="McpServer"
          d={bracket}
          fill="none"
          strokeWidth="2"
          className="stroke-primary/50"
        />
        <path
          id="mcp-server-fan-inner"
          data-component="McpServer"
          d="M 264 198 H 340 M 264 228 H 340"
          fill="none"
          strokeWidth="2"
          className="stroke-primary/50"
        />

        {/* one bar per tool the server offers, sitting in the window like anything else */}
        {tools.map((tool, index) => (
          <g key={tool.key}>
            <rect
              id={`mcp-server-tool-${index}`}
              data-component="McpServer"
              x="54"
              y={tool.y}
              width="210"
              height="20"
              rx="10"
              strokeWidth="2"
              className="fill-primary/15 stroke-primary/50"
            />
            <text
              id={`mcp-server-tool-${index}-label`}
              data-component="McpServer"
              x="70"
              y={tool.y + 10}
              fontSize="13"
              dominantBaseline="middle"
              className="fill-muted-foreground font-mono"
            >
              {t(tool.key)}
            </text>
          </g>
        ))}
      </svg>
    </figure>
  )
}
