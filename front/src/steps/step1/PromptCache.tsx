import { useId } from 'react'
import { useTranslation } from 'react-i18next'
import { useAssistant } from '@/shared/assistant/useAssistant'

/**
 * What each turn sends to the model, and which part of it comes out of the cache. Five turns, one
 * row each: the request is drawn left to right in the order the cache matches it (tools, system,
 * the project's instruction file, then the conversation so far), and the bar on the right is what
 * that turn costs.
 *
 * It sits under `tokens.prompt-caching.2`, which states the rule ("The cache only matches from the
 * start, and each model has its own. So pick your model before you begin.") and
 * this is that rule played out. **It reverses a recorded decision** (October 2026, at the owner's
 * asking): the section was drawn nowhere because a prefix diagram "would draw 'read from the first
 * byte' and stop". A single prefix would. Five rows of it show four cases one cannot: the
 * first question writes everything, the next two read what was sent before and write only the new turn,
 * a model switch reads nothing because "Each model has its own cache", and a long pause finds it
 * expired. **The fourth row is a model switch and not a new MCP server**, on purpose: in Claude Code
 * a server that connects mid-session does not break the cache while tool search defers its tools
 * (code.claude.com/docs/en/prompt-caching, read 12 October 2026), and `prompt-caching.2` does not use
 * that example either. The pause row names no number of minutes, because how long the cache lives
 * depends on harness and account, which `prompt-caching.1` already says.
 *
 * The rates are the paragraph's: a read at 0.1 times input (the standard rate; the 5.5 tiers read
 * cheaper, which the labels' "or less" covers), a write at 1.25 times for a 5-minute
 * cache. Token counts per block are illustrative and the caption says so. The instruction file is
 * named per assistant, since the figure sits in a step written for two.
 *
 * **It is still, on purpose** (October 2026, at the owner's asking): it was animated row by row at
 * first, and the owner judged that the comparison reads better with all five rows in view at once.
 * The rows are "vraag" in Dutch rather than "beurt", which the owner found an odd word here: each
 * row is one question you send, and the conversation it carries is the earlier questions.
 */
const W = 640
const X0 = 56
/** px per 1,000 tokens */
const K = 11.2
const ROW = 50
const READ = 0.1
const WRITE = 1.25
const TURN_TOKENS = 4

const ROWS = [
  { note: 'first', turns: 1, reads: 0 },
  { note: 'second', turns: 2, reads: 4 },
  { note: 'third', turns: 3, reads: 5 },
  { note: 'model', turns: 4, reads: 0 },
  { note: 'pause', turns: 5, reads: 0 },
] as const

export function PromptCache() {
  const { t, i18n } = useTranslation('step1')
  const { assistant } = useAssistant()
  const titleId = useId()

  const prefix = [
    { name: 'tools', tokens: 8 },
    { name: 'system', tokens: 4 },
    { name: assistant === 'copilot' ? 'AGENTS.md' : 'CLAUDE.md', tokens: 5 },
  ]
  const most = (8 + 4 + 5 + 5 * TURN_TOKENS) * WRITE

  return (
    <figure id="prompt-cache" data-component="PromptCache" className="my-8 flex flex-col gap-3">
      <svg
        id="prompt-cache-svg"
        data-component="PromptCache"
        viewBox={`0 0 ${W} 302`}
        role="img"
        aria-labelledby={titleId}
        className="h-auto w-full"
      >
        <title id={titleId} data-component="PromptCache">
          {t('prompt-cache.description')}
        </title>

        <text
          id="prompt-cache-sent"
          data-component="PromptCache"
          x={X0}
          y="14"
          fontSize="11"
          className="fill-muted-foreground"
        >
          {t('prompt-cache.sent')}
        </text>
        <text
          id="prompt-cache-cost"
          data-component="PromptCache"
          x={W - 1}
          y="14"
          fontSize="11"
          textAnchor="end"
          className="fill-muted-foreground"
        >
          {t('prompt-cache.cost')}
        </text>

        {ROWS.map((row, index) => {
          const y = 26 + index * ROW
          const cells = [
            ...prefix,
            ...Array.from({ length: row.turns }, (_, n) => ({
              name: t('prompt-cache.turn', { n: n + 1 }),
              tokens: TURN_TOKENS,
            })),
          ]
          let x = X0
          let cost = 0
          const placed = cells.map((cell, n) => {
            const read = n < row.reads
            cost += cell.tokens * (read ? READ : WRITE)
            const placedCell = { ...cell, x, w: cell.tokens * K - 3, read }
            x += cell.tokens * K
            return placedCell
          })
          const block = `prompt-cache-row-${index}`
          return (
            <g key={index} id={block} data-component="PromptCache">
              <text
                id={`${block}-label`}
                data-component="PromptCache"
                x="1"
                y={y + 20}
                fontSize="12"
                className="fill-foreground font-mono"
              >
                {t('prompt-cache.turn', { n: index + 1 })}
              </text>
              {placed.map((cell, n) => (
                <g key={n} id={`${block}-cell-${n}`} data-component="PromptCache">
                  <rect
                    id={`${block}-cell-${n}-box`}
                    data-component="PromptCache"
                    x={cell.x}
                    y={y + 6}
                    width={cell.w}
                    height="20"
                    rx="4"
                    className={cell.read ? 'fill-primary' : 'fill-primary/35'}
                  />
                  <text
                    id={`${block}-cell-${n}-name`}
                    data-component="PromptCache"
                    x={cell.x + cell.w / 2}
                    y={y + 20}
                    fontSize="9.5"
                    textAnchor="middle"
                    className={
                      cell.read ? 'fill-primary-foreground font-mono' : 'fill-foreground font-mono'
                    }
                  >
                    {cell.name}
                  </text>
                </g>
              ))}
              <text
                id={`${block}-note`}
                data-component="PromptCache"
                x={X0}
                y={y + 41}
                fontSize="11"
                className="fill-muted-foreground"
              >
                {t(`prompt-cache.note.${row.note}`)}
              </text>
              <rect
                id={`${block}-cost-bar`}
                data-component="PromptCache"
                x="490"
                y={y + 8}
                width={(110 * cost) / most}
                height="16"
                rx="3"
                className="fill-primary"
              />
              <text
                id={`${block}-cost-value`}
                data-component="PromptCache"
                x={W - 1}
                y={y + 21}
                fontSize="12"
                textAnchor="end"
                className="fill-foreground font-mono"
              >
                {cost.toLocaleString(i18n.language, { minimumFractionDigits: 1, maximumFractionDigits: 1 })}
              </text>
            </g>
          )
        })}

        <rect
          id="prompt-cache-legend-read"
          data-component="PromptCache"
          x={X0}
          y="282"
          width="12"
          height="12"
          rx="2"
          className="fill-primary"
        />
        <text
          id="prompt-cache-legend-read-label"
          data-component="PromptCache"
          x={X0 + 18}
          y="292"
          fontSize="11"
          className="fill-muted-foreground"
        >
          {t('prompt-cache.read')}
        </text>
        <rect
          id="prompt-cache-legend-write"
          data-component="PromptCache"
          x={X0 + 200}
          y="282"
          width="12"
          height="12"
          rx="2"
          className="fill-primary/35"
        />
        <text
          id="prompt-cache-legend-write-label"
          data-component="PromptCache"
          x={X0 + 218}
          y="292"
          fontSize="11"
          className="fill-muted-foreground"
        >
          {t('prompt-cache.write')}
        </text>
      </svg>
      <figcaption
        id="prompt-cache-caption"
        data-deck="hide"
        data-component="PromptCache"
        className="text-muted-foreground text-xs"
      >
        {t('prompt-cache.caption')}
      </figcaption>
    </figure>
  )
}
