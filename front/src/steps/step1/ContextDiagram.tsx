import { useId } from 'react'
import { useTranslation } from 'react-i18next'

/**
 * The context window with what fills it drawn inside: your prompt, the resources the agent read and
 * the tools it can call. `prompt` and `tools` run ahead of `context`, so by the time a student gets
 * here they have met the prompt as a shape and the frame as a border, and the populated oval is the
 * payoff rather than the introduction. It was drawn empty when `context` opened the step and is not
 * any more.
 *
 * The prompt region keeps `PromptInContext`'s geometry (rx/ry, fills), which is the only reason that
 * figure reads as this one's small oval seen a unit earlier rather than as a separate drawing.
 * The `viewBox` is the coordinate system every other oval in the step is placed in. Keep it.
 *
 * Three decisions in here are load-bearing.
 *
 * The regions are *not* drawn to scale, and this is not a share-of-the-window chart. That figure
 * already exists and it is `SessionMakeup` in `session`, which weighs a real session by volume.
 * What this one argues is that several separate things share one frame, and the size difference is
 * only there to keep "your message is the smallest part" from being a bare assertion in the prose.
 *
 * `resources` here is the broad word: the files, pages and output the agent read to answer you.
 * `tools` gives `resource` a narrower meaning of its own (content an MCP server hands over without
 * anything calling it), so the two are not the same term and this figure is the looser of the two.
 *
 * Only the prompt carries the heavier fill, because the one thing the student typed is the whole
 * contrast. Resources and tools share one treatment on purpose: the split that matters is yours
 * against everything else, not resources against tools.
 */

/* Named rather than indexed ids: these are three fixed regions, not a repeated row, so
   `context-diagram-tools` stays right whatever order they end up drawn in. */
const REGIONS = [
  {
    name: 'resources',
    cx: 146,
    cy: 152,
    rx: 88,
    ry: 52,
    className: 'fill-primary/10 stroke-primary/35',
  },
  {
    name: 'prompt',
    cx: 321,
    cy: 200,
    rx: 74,
    ry: 42,
    className: 'fill-primary/20 stroke-primary/70',
  },
  {
    name: 'tools',
    cx: 496,
    cy: 152,
    rx: 80,
    ry: 48,
    className: 'fill-primary/10 stroke-primary/35',
  },
]

export function ContextDiagram() {
  const { t } = useTranslation('step1')
  const titleId = useId()

  return (
    <figure id="context-diagram" data-component="ContextDiagram" className="mb-12 flex justify-center">
      <svg
        id="context-diagram-svg"
        data-component="ContextDiagram"
        viewBox="0 0 640 320"
        role="img"
        aria-labelledby={titleId}
        className="h-auto w-full max-w-xl"
      >
        <title id={titleId} data-component="ContextDiagram">
          {t('diagram.description')}
        </title>

        {/* the context window: the same teal oval as PromptInContext */}
        <ellipse
          id="context-diagram-window"
          data-component="ContextDiagram"
          cx="320"
          cy="160"
          rx="290"
          ry="140"
          strokeWidth="2"
          className="fill-primary/5 stroke-primary/40"
        />
        <text
          id="context-diagram-label"
          data-component="ContextDiagram"
          x="320"
          y="56"
          fontSize="24"
          textAnchor="middle"
          dominantBaseline="middle"
          className="fill-foreground font-medium"
        >
          {t('diagram.context')}
        </text>

        {/* what is in the window, drawn as the same shape as the window it sits in */}
        {REGIONS.map((region) => (
          <g key={region.name} id={`context-diagram-${region.name}`} data-component="ContextDiagram">
            <ellipse
              id={`context-diagram-${region.name}-area`}
              data-component="ContextDiagram"
              cx={region.cx}
              cy={region.cy}
              rx={region.rx}
              ry={region.ry}
              strokeWidth="2"
              className={region.className}
            />
            <text
              id={`context-diagram-${region.name}-label`}
              data-component="ContextDiagram"
              x={region.cx}
              y={region.cy}
              fontSize="19"
              textAnchor="middle"
              dominantBaseline="middle"
              className="fill-foreground font-medium"
            >
              {t(`diagram.${region.name}`)}
            </text>
          </g>
        ))}
      </svg>
    </figure>
  )
}
