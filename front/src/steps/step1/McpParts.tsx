import { useId } from 'react'
import { useTranslation } from 'react-i18next'

/**
 * The three things an MCP server offers, drawn as three separate cards with nothing running between
 * them. The separation is the whole figure: a student who has just watched one wire cross the frame
 * in McpServer is otherwise ready to believe that a server is a bag of tools, and these three arrive
 * by different routes and on different say-so.
 *
 * Deliberately unwired. No arrows, no frame, no window: none of it has crossed into a context yet,
 * which is why the cards carry the step's dashed stroke (the shape McpServer gives the server
 * itself) rather than the solid fill a bar in the window gets.
 *
 * The glyph on each card is the step's own vocabulary, so the cards say what they are before the
 * label does: the prompt is the solid teal bar PromptInContext and ToolsInContext both draw, the
 * resource is the stack of faint bars a tool result comes back as, and the tool is the rounded
 * outline ToolsInContext straddles the frame with.
 */
export function McpParts() {
  const { t } = useTranslation('step1')
  const titleId = useId()

  /** Left to right, and the order is the argument: who decides goes you, harness, model. */
  const parts = [
    { id: 'prompt', cx: 110 },
    { id: 'resource', cx: 320 },
    { id: 'tool', cx: 530 },
  ]

  return (
    <figure id="mcp-parts" data-component="McpParts" className="my-8 flex justify-center">
      <svg
        id="mcp-parts-svg"
        data-component="McpParts"
        viewBox="0 0 640 200"
        role="img"
        aria-labelledby={titleId}
        className="h-auto w-full max-w-xl"
      >
        <title id={titleId} data-component="McpParts">
          {t('mcp-parts.description')}
        </title>

        {parts.map((part, index) => (
          <g key={part.id}>
            <rect
              id={`mcp-parts-card-${index}`}
              data-component="McpParts"
              x={part.cx - 90}
              y="40"
              width="180"
              height="140"
              rx="14"
              fill="none"
              strokeWidth="2"
              strokeDasharray="6 6"
              className="stroke-primary/40"
            />
            <text
              id={`mcp-parts-name-${index}`}
              data-component="McpParts"
              x={part.cx}
              y="124"
              fontSize="19"
              textAnchor="middle"
              className="fill-foreground font-medium"
            >
              {t(`mcp-parts.${part.id}.name`)}
            </text>
            <text
              id={`mcp-parts-who-${index}`}
              data-component="McpParts"
              x={part.cx}
              y="152"
              fontSize="13"
              textAnchor="middle"
              className="fill-muted-foreground"
            >
              {t(`mcp-parts.${part.id}.who`)}
            </text>
          </g>
        ))}

        {/* the prompt: the one bar you typed, solid teal wherever it is drawn in this step */}
        <rect
          id="mcp-parts-prompt-glyph"
          data-component="McpParts"
          x="65"
          y="69"
          width="90"
          height="14"
          rx="7"
          className="fill-primary"
        />

        {/* the resource: material somebody else collected, in the fill a tool result comes back in */}
        <g className="fill-primary/35">
          {[100, 80, 90].map((width, index) => (
            <rect
              key={width}
              id={`mcp-parts-resource-glyph-${index}`}
              data-component="McpParts"
              x={320 - width / 2}
              y={57 + index * 14}
              width={width}
              height="10"
              rx="5"
            />
          ))}
        </g>

        {/* the tool: the rounded box ToolsInContext cuts in half against the frame */}
        <rect
          id="mcp-parts-tool-glyph"
          data-component="McpParts"
          x="485"
          y="62"
          width="90"
          height="28"
          rx="14"
          strokeWidth="2"
          className="fill-primary/15 stroke-primary/50"
        />
      </svg>
    </figure>
  )
}
