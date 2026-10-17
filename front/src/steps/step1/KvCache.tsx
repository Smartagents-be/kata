import { useId } from 'react'
import { useTranslation } from 'react-i18next'

/**
 * What the KV cache saves inside 1 answer. 3 passes, 1 row each: the first reads the whole prompt
 * at once, every pass after it works out only the token that was just appended and takes the key
 * and value of everything before it from the cache. The 2 columns on the right count the tokens a
 * pass works out with the cache and without it, and the foot adds them up.
 *
 * It sits under `tokens.kv-cache.1` (October 2026, at the owner's asking), and its sentence is
 * `NextToken`'s favourite chain, `the build failed because it` -> `timed` -> `out` -> `.`, so the
 * room meets the same 3 passes it already stepped through. Machine-shaped, so English in every
 * language. The legend carries the memory side of the paragraph: a dark block is what sits in GPU
 * memory, at Llama 3 70B's 320 KB a token (the arithmetic is in the HTML comment above `.1`).
 *
 * The rows say "pass" (`rekenstap`), the word `expensive-part.1` uses, and not prefill and decode,
 * which no unit introduces. It is still, like `PromptCache`: the comparison is the point, so all 3
 * rows are in view at once.
 */
const W = 640
const X0 = 70
const ROW = 50
const COL_WITH = 540
const COL_WITHOUT = 630

const PROMPT = ['the', 'build', 'failed', 'because', 'it']
const WRITTEN = ['timed', 'out', '.']

const width = (token: string) => token.length * 7 + 16

export function KvCache() {
  const { t } = useTranslation('step1')
  const titleId = useId()

  const rows = WRITTEN.map((next, pass) => {
    const tokens = [...PROMPT, ...WRITTEN.slice(0, pass)]
    const fresh = pass === 0 ? tokens.length : 1
    return { tokens, fresh, next, without: tokens.length }
  })
  const totalWith = rows.reduce((sum, row) => sum + row.fresh, 0)
  const totalWithout = rows.reduce((sum, row) => sum + row.without, 0)
  const footY = 26 + rows.length * ROW

  return (
    <figure id="kv-cache" data-component="KvCache" className="my-8 flex flex-col gap-3">
      <svg
        id="kv-cache-svg"
        data-component="KvCache"
        viewBox={`0 0 ${W} ${footY + 80}`}
        role="img"
        aria-labelledby={titleId}
        className="h-auto w-full"
      >
        <title id={titleId} data-component="KvCache">
          {t('kv-cache.description')}
        </title>

        <text
          id="kv-cache-worked"
          data-component="KvCache"
          x={X0}
          y="14"
          fontSize="11"
          className="fill-muted-foreground"
        >
          {t('kv-cache.worked')}
        </text>
        <text
          id="kv-cache-with"
          data-component="KvCache"
          x={COL_WITH}
          y="14"
          fontSize="11"
          textAnchor="end"
          className="fill-muted-foreground"
        >
          {t('kv-cache.with')}
        </text>
        <text
          id="kv-cache-without"
          data-component="KvCache"
          x={COL_WITHOUT}
          y="14"
          fontSize="11"
          textAnchor="end"
          className="fill-muted-foreground"
        >
          {t('kv-cache.without')}
        </text>

        {rows.map((row, index) => {
          const y = 26 + index * ROW
          const block = `kv-cache-row-${index}`
          let x = X0
          const placed = row.tokens.map((token, n) => {
            const cached = n < row.tokens.length - row.fresh
            const cell = { token, x, w: width(token), cached }
            x += cell.w + 4
            return cell
          })
          return (
            <g key={index} id={block} data-component="KvCache">
              <text
                id={`${block}-label`}
                data-component="KvCache"
                x="1"
                y={y + 20}
                fontSize="12"
                className="fill-foreground font-mono"
              >
                {t('kv-cache.pass', { n: index + 1 })}
              </text>
              {placed.map((cell, n) => (
                <g key={n} id={`${block}-cell-${n}`} data-component="KvCache">
                  <rect
                    id={`${block}-cell-${n}-box`}
                    data-component="KvCache"
                    x={cell.x}
                    y={y + 6}
                    width={cell.w}
                    height="20"
                    rx="4"
                    className={cell.cached ? 'fill-primary' : 'fill-primary/35'}
                  />
                  <text
                    id={`${block}-cell-${n}-name`}
                    data-component="KvCache"
                    x={cell.x + cell.w / 2}
                    y={y + 20}
                    fontSize="11"
                    textAnchor="middle"
                    className={
                      cell.cached ? 'fill-primary-foreground font-mono' : 'fill-foreground font-mono'
                    }
                  >
                    {cell.token}
                  </text>
                </g>
              ))}
              <text
                id={`${block}-note`}
                data-component="KvCache"
                x={X0}
                y={y + 41}
                fontSize="11"
                className="fill-muted-foreground"
              >
                {t(index === 0 ? 'kv-cache.note.first' : 'kv-cache.note.next', {
                  token: row.tokens[row.tokens.length - 1],
                  next: row.next,
                })}
              </text>
              <text
                id={`${block}-with`}
                data-component="KvCache"
                x={COL_WITH}
                y={y + 20}
                fontSize="13"
                textAnchor="end"
                className="fill-foreground font-mono"
              >
                {row.fresh}
              </text>
              <text
                id={`${block}-without`}
                data-component="KvCache"
                x={COL_WITHOUT}
                y={y + 20}
                fontSize="13"
                textAnchor="end"
                className="fill-muted-foreground font-mono"
              >
                {row.without}
              </text>
            </g>
          )
        })}

        <line
          id="kv-cache-rule"
          data-component="KvCache"
          x1="1"
          x2={W - 1}
          y1={footY}
          y2={footY}
          className="stroke-border"
        />
        <text
          id="kv-cache-total"
          data-component="KvCache"
          x="1"
          y={footY + 20}
          fontSize="12"
          className="fill-foreground"
        >
          {t('kv-cache.total')}
        </text>
        <text
          id="kv-cache-total-with"
          data-component="KvCache"
          x={COL_WITH}
          y={footY + 20}
          fontSize="13"
          textAnchor="end"
          className="fill-foreground font-mono font-semibold"
        >
          {totalWith}
        </text>
        <text
          id="kv-cache-total-without"
          data-component="KvCache"
          x={COL_WITHOUT}
          y={footY + 20}
          fontSize="13"
          textAnchor="end"
          className="fill-muted-foreground font-mono font-semibold"
        >
          {totalWithout}
        </text>

        <rect
          id="kv-cache-legend-cached"
          data-component="KvCache"
          x="1"
          y={footY + 34}
          width="12"
          height="12"
          rx="2"
          className="fill-primary"
        />
        <text
          id="kv-cache-legend-cached-label"
          data-component="KvCache"
          x="19"
          y={footY + 44}
          fontSize="11"
          className="fill-muted-foreground"
        >
          {t('kv-cache.cached')}
        </text>
        <rect
          id="kv-cache-legend-fresh"
          data-component="KvCache"
          x="1"
          y={footY + 56}
          width="12"
          height="12"
          rx="2"
          className="fill-primary/35"
        />
        <text
          id="kv-cache-legend-fresh-label"
          data-component="KvCache"
          x="19"
          y={footY + 66}
          fontSize="11"
          className="fill-muted-foreground"
        >
          {t('kv-cache.fresh')}
        </text>
      </svg>
    </figure>
  )
}
