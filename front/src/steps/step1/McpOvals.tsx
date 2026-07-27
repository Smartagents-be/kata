import { useId } from 'react'
import { useTranslation } from 'react-i18next'

/**
 * The three things an MCP server offers, drawn a second time as the shapes the rest of this step
 * draws things in. McpParts states them as cards with a glyph and a who-decides line; this says the
 * same three are one kind of thing, and it is the bridge from that figure to `ContextDiagram`, where
 * they turn up inside the window.
 *
 * **Nothing is drawn around them, and that is the figure.** `tools` has not finished arguing that
 * they cross into a context yet, and a frame here would be the third telling of a window the student
 * meets properly in `context`. Do not add one.
 *
 * Two alignments are load-bearing and both are easy to lose.
 *
 * The columns are McpParts' own (110, 320, 530), so each oval sits directly under the card it
 * restates and the eye tracks straight down. Moving one figure's columns means moving the other's.
 *
 * The radii and fills are ContextDiagram's, per thing: the prompt is the small heavy one, the
 * resource the large faint one, the tool the middling faint one. That is what makes these the same
 * objects a student later sees inside the oval rather than a new set of shapes.
 *
 * The labels come from `mcp-parts.*.name` rather than keys of their own, on purpose. The two figures
 * name the same three things one screen apart, so a rewording has to move both or neither.
 */

/** Left to right, on McpParts' columns, so the two figures stack. */
const PARTS = [
  { id: 'prompt', cx: 110, rx: 74, ry: 42, className: 'fill-primary/20 stroke-primary/70' },
  { id: 'resource', cx: 320, rx: 88, ry: 52, className: 'fill-primary/10 stroke-primary/35' },
  { id: 'tool', cx: 530, rx: 80, ry: 48, className: 'fill-primary/10 stroke-primary/35' },
]

export function McpOvals() {
  const { t } = useTranslation('step1')
  const titleId = useId()

  return (
    <figure id="mcp-ovals" data-component="McpOvals" className="my-8 flex justify-center">
      <svg
        id="mcp-ovals-svg"
        data-component="McpOvals"
        viewBox="0 0 640 128"
        role="img"
        aria-labelledby={titleId}
        className="h-auto w-full max-w-xl"
      >
        {/* useId, not a BEM id: aria-labelledby has to be unique per instance, not per component. */}
        <title id={titleId} data-component="McpOvals">
          {t('mcp-ovals.description')}
        </title>

        {PARTS.map((part) => (
          <g key={part.id} id={`mcp-ovals-${part.id}`} data-component="McpOvals">
            <ellipse
              id={`mcp-ovals-${part.id}-area`}
              data-component="McpOvals"
              cx={part.cx}
              cy="64"
              rx={part.rx}
              ry={part.ry}
              strokeWidth="2"
              className={part.className}
            />
            <text
              id={`mcp-ovals-${part.id}-label`}
              data-component="McpOvals"
              x={part.cx}
              y="64"
              fontSize="19"
              textAnchor="middle"
              dominantBaseline="middle"
              className="fill-foreground font-medium"
            >
              {t(`mcp-parts.${part.id}.name`)}
            </text>
          </g>
        ))}
      </svg>
    </figure>
  )
}
