import { useTranslation } from 'react-i18next'
import type { Assistant } from '@/shared/assistant/assistant'
import { useAssistant } from '@/shared/assistant/useAssistant'
import { cn } from '@/shared/lib/utils'

/**
 * What 1 request holds, drawn the way the `/context` readout draws it: a grid of squares, filled by
 * category in the readout's own order, then the free space, then the reserved buffer. It replaced
 * `ContextDiagram`, an oval holding prompt, resources and tools: that one said several things share
 * one frame, and this one names them in the words the student reads off their own screen.
 *
 * Three decisions in here are load-bearing.
 *
 * The labels are each product's own, verbatim, because the course owner wanted the words a student
 * reads off their own screen. Claude Code's were read off its readout and Copilot CLI's off GitHub's
 * context-management page (both October 2026), with their capitalisation. That is why the categories
 * are typed `Record<Assistant, …>` the way `ReadYourWindow`'s moves are, and why they are mono and
 * have no `nl` entry: they are machine output. Only the eyebrow, the caption and the description
 * translate.
 *
 * The counts are invented and the caption says so: one square is 1,000 tokens of a 200,000-token
 * window, partway through a task. The share-by-volume figure for a real session is `SessionMakeup` in
 * `session`. The MCP row is there because the readout has one, and it is deliberately one plain
 * reading: what connecting a server adds is `ReadYourWindow`'s measurement, so nothing here may draw
 * a with-and-without comparison.
 *
 * Free space is dashed, the step's stroke for "nothing here", and the buffer is a plain grey: it is
 * space the window holds back, not content.
 */

type Category = { label: string; cells: number; fill: string }

const CATEGORIES: Record<Assistant, readonly Category[]> = {
  claude: [
    { label: 'System prompt', cells: 4, fill: 'bg-chart-5' },
    { label: 'System tools', cells: 16, fill: 'bg-chart-4' },
    { label: 'MCP server instructions', cells: 1, fill: 'bg-chart-1' },
    { label: 'Memory files', cells: 5, fill: 'bg-chart-2' },
    { label: 'Skills', cells: 4, fill: 'bg-chart-3' },
    { label: 'Messages', cells: 40, fill: 'bg-primary/25' },
  ],
  copilot: [
    { label: 'System Prompt', cells: 4, fill: 'bg-chart-5' },
    { label: 'Custom Instructions', cells: 5, fill: 'bg-chart-2' },
    { label: 'System Tools', cells: 14, fill: 'bg-chart-4' },
    { label: 'MCP Tools', cells: 6, fill: 'bg-chart-1' },
    { label: 'Messages', cells: 40, fill: 'bg-primary/25' },
  ],
}

/** The reserved tail, under each product's own name and at a plausible size for it. */
const BUFFER: Record<Assistant, { label: string; cells: number }> = {
  claude: { label: 'Autocompact buffer', cells: 33 },
  copilot: { label: 'Buffer', cells: 40 },
}

const FREE_LABEL: Record<Assistant, string> = {
  claude: 'Free space',
  copilot: 'Free Space',
}

/** 20 columns by 10 rows, the shape of Claude Code's own grid. */
const TOTAL = 200
const FREE_FILL = 'border border-dashed border-muted-foreground/40'
const BUFFER_FILL = 'bg-muted-foreground/25'

export function WindowGrid() {
  const { t } = useTranslation('step1')
  const { assistant } = useAssistant()
  const categories = CATEGORIES[assistant]
  const buffer = BUFFER[assistant]
  const used = categories.reduce((sum, c) => sum + c.cells, 0)
  const free = TOTAL - used - buffer.cells

  const legend = [
    ...categories.map((c) => ({ label: c.label, fill: c.fill, muted: false })),
    { label: FREE_LABEL[assistant], fill: FREE_FILL, muted: true },
    { label: buffer.label, fill: BUFFER_FILL, muted: true },
  ]
  const cells = [
    ...categories.flatMap((c) => Array.from({ length: c.cells }, () => c.fill)),
    ...Array.from({ length: free }, () => FREE_FILL),
    ...Array.from({ length: buffer.cells }, () => BUFFER_FILL),
  ]
  const parts = [
    ...categories.map((c) => `${c.label} ${c.cells}`),
    `${FREE_LABEL[assistant]} ${free}`,
    `${buffer.label} ${buffer.cells}`,
  ].join(', ')

  return (
    <figure id="window-grid" data-component="WindowGrid" className="my-8 flex flex-col gap-3">
      <span id="window-grid-label" data-component="WindowGrid" className="eyebrow text-primary">
        {t('window-grid.label')}
      </span>

      <div
        id="window-grid-body"
        data-component="WindowGrid"
        className="flex flex-col gap-4 sm:flex-row sm:items-start sm:gap-6"
      >
        <div
          id="window-grid-cells"
          data-component="WindowGrid"
          role="img"
          aria-label={t('window-grid.description', { total: TOTAL, parts })}
          className="grid w-full max-w-sm shrink-0 grid-cols-20 gap-[3px]"
        >
          {cells.map((fill, index) => (
            <span
              key={index}
              id={`window-grid-cell-${index}`}
              data-component="WindowGrid"
              className={cn('aspect-square rounded-[2px]', fill)}
            />
          ))}
        </div>

        <ul
          id="window-grid-legend"
          data-component="WindowGrid"
          className="flex flex-col gap-1.5 font-mono text-sm"
        >
          {legend.map((item, index) => (
            <li
              key={item.label}
              id={`window-grid-legend-${index}`}
              data-component="WindowGrid"
              className={cn('flex items-center gap-2', item.muted && 'text-muted-foreground')}
            >
              <span className={cn('size-3 shrink-0 rounded-[2px]', item.fill)} aria-hidden="true" />
              {item.label}
            </li>
          ))}
        </ul>
      </div>

      <figcaption
        id="window-grid-caption"
        data-component="WindowGrid"
        className="text-muted-foreground font-mono text-xs"
      >
        {t('window-grid.caption')}
      </figcaption>
    </figure>
  )
}
