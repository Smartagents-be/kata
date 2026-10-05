import { useTranslation } from 'react-i18next'
import { cn } from '@/shared/lib/utils'
import { PRICES, type PriceRow, type Rate } from './pricing'

/**
 * One turn deep in a session, cut by kind of token and drawn twice: once by count and once by what
 * each kind costs. The two bars are the same four kinds in the same order, so the reading is the
 * swap in widths, a cache read that is most of the tokens and a sliver of the bill, and reasoning
 * the other way round. That is `tokens.expensive-part`'s claim, and the figure carries it so
 * the prose does not have to recite a number.
 *
 * The counts are invented and the rates are not. Every rate comes off `pricing.ts`'s Sonnet row,
 * the same row `ModelPricing` prints in `model`, and each multiplier, cost, share and total is worked
 * out from those here on every render, so editing a count or a price moves the whole figure with it.
 *
 * There is no uncached-input row on purpose. In Claude Code nearly all new input arrives as a cache
 * write, so a turn deep in a session has none worth drawing, and the four kinds here are the four
 * that turn is actually billed for. Reasoning is priced at the output rate because that is how it is
 * billed, whether or not the thinking is shown.
 */
const KINDS = [
  { id: 'read', tokens: 40_000, rate: 'read' },
  { id: 'write', tokens: 3_000, rate: 'write5m' },
  { id: 'reasoning', tokens: 3_000, rate: 'output' },
  { id: 'output', tokens: 800, rate: 'output' },
] as const satisfies readonly { id: string; tokens: number; rate: Rate }[]

/**
 * Fill and ink per kind, by position. The light theme runs pale to dark across the four; the dark
 * theme's chart tokens are not in that order, so each segment names the ink that stays readable on
 * its own fill in both. Swatches in the table take the same fills, which is what makes the table
 * the bars' legend.
 */
const SWATCHES = [
  { fill: 'bg-chart-3', ink: 'text-foreground dark:text-background' },
  { fill: 'bg-chart-2', ink: 'text-foreground dark:text-background' },
  { fill: 'bg-chart-4', ink: 'text-primary-foreground dark:text-foreground' },
  { fill: 'bg-chart-5', ink: 'text-primary-foreground' },
] as const

/** A share at or above this is wide enough to print its own percentage inside the segment. */
const LABEL_FROM = 0.07

function priceRow(id: PriceRow['id']): PriceRow {
  const row = PRICES.find((entry) => entry.id === id)
  if (!row) {
    throw new Error(`No price row for ${id}`)
  }
  return row
}

const SONNET = priceRow('sonnet')

const ROWS = KINDS.map((kind) => ({
  ...kind,
  multiplier: SONNET[kind.rate] / SONNET.input,
  cost: (kind.tokens * SONNET[kind.rate]) / 1_000_000,
}))

const TOTAL_TOKENS = ROWS.reduce((sum, row) => sum + row.tokens, 0)
const TOTAL_COST = ROWS.reduce((sum, row) => sum + row.cost, 0)

const BARS = [
  { id: 'tokens', shares: ROWS.map((row) => row.tokens / TOTAL_TOKENS) },
  { id: 'cost', shares: ROWS.map((row) => row.cost / TOTAL_COST) },
] as const

export function TokenKinds() {
  const { t, i18n } = useTranslation('step1')
  const number = new Intl.NumberFormat(i18n.language)
  const ratio = new Intl.NumberFormat(i18n.language, { maximumFractionDigits: 2 })
  const percent = new Intl.NumberFormat(i18n.language, { style: 'percent', maximumFractionDigits: 0 })
  // Four places, because the total is a sum a student can redo by hand and three would round it.
  const money = new Intl.NumberFormat(i18n.language, {
    minimumFractionDigits: 4,
    maximumFractionDigits: 4,
  })

  const totals = {
    tokens: number.format(TOTAL_TOKENS),
    cost: `$${money.format(TOTAL_COST)}`,
  }

  const tokenShares = BARS[0].shares
  const costShares = BARS[1].shares
  const description = t('token-kinds.description', {
    tokens: totals.tokens,
    cost: totals.cost,
    readTokens: percent.format(tokenShares[0]),
    readCost: percent.format(costShares[0]),
    reasoningTokens: percent.format(tokenShares[2]),
    reasoningCost: percent.format(costShares[2]),
  })

  return (
    <figure id="token-kinds" data-component="TokenKinds" className="my-8 flex flex-col gap-3">
      <span id="token-kinds-label" data-component="TokenKinds" className="eyebrow text-primary">
        {t('token-kinds.label')}
      </span>

      <div
        id="token-kinds-panel"
        data-component="TokenKinds"
        className="border-border bg-card flex flex-col gap-4 rounded-lg border p-4"
      >
        {/* The bars print shares and nothing a screen reader could follow, so the group is one image
            described in a sentence, and the table under it carries every number as text. */}
        <div
          id="token-kinds-bars"
          data-component="TokenKinds"
          role="img"
          aria-label={description}
          className="flex flex-col gap-2.5"
        >
          {BARS.map((bar, index) => (
            <Bar
              key={bar.id}
              index={index}
              name={t(`token-kinds.bar.${bar.id}`)}
              shares={bar.shares}
              total={totals[bar.id]}
              format={(share) => percent.format(share)}
            />
          ))}
        </div>

        <table
          id="token-kinds-table"
          data-component="TokenKinds"
          className="w-full border-collapse text-sm"
        >
          <thead id="token-kinds-head" data-component="TokenKinds">
            <tr
              id="token-kinds-head-row"
              data-component="TokenKinds"
              className="border-border/70 border-b"
            >
              <th
                id="token-kinds-head-kind"
                data-component="TokenKinds"
                scope="col"
                className="text-muted-foreground py-1.5 pr-3 text-left text-xs font-normal"
              >
                {t('token-kinds.head.kind')}
              </th>
              {/* The description is the column a phone loses: the kind's name and its two numbers
                  are the reading, and the sentence is the gloss on it. */}
              <th
                id="token-kinds-head-what"
                data-component="TokenKinds"
                scope="col"
                className="text-muted-foreground hidden py-1.5 pr-3 text-left text-xs font-normal sm:table-cell"
              >
                {t('token-kinds.head.what')}
              </th>
              <th
                id="token-kinds-head-tokens"
                data-component="TokenKinds"
                scope="col"
                className="text-muted-foreground py-1.5 pr-3 text-right text-xs font-normal"
              >
                {t('token-kinds.head.tokens')}
              </th>
              <th
                id="token-kinds-head-rate"
                data-component="TokenKinds"
                scope="col"
                className="text-muted-foreground py-1.5 pr-3 text-right text-xs font-normal"
              >
                {t('token-kinds.head.rate')}
              </th>
              {/* Tokens times rate, so every share on the cost bar can be redone by hand. */}
              <th
                id="token-kinds-head-cost"
                data-component="TokenKinds"
                scope="col"
                className="text-muted-foreground py-1.5 text-right text-xs font-normal"
              >
                {t('token-kinds.head.cost')}
              </th>
            </tr>
          </thead>

          <tbody id="token-kinds-body" data-component="TokenKinds">
            {ROWS.map((row, index) => (
              <tr
                key={row.id}
                id={`token-kinds-row-${index}`}
                data-component="TokenKinds"
                className="border-border/50 border-b last:border-b-0"
              >
                <th
                  id={`token-kinds-row-${index}-kind`}
                  data-component="TokenKinds"
                  scope="row"
                  className="py-2 pr-3 text-left font-normal"
                >
                  <span
                    id={`token-kinds-row-${index}-swatch`}
                    data-component="TokenKinds"
                    aria-hidden
                    className={cn(
                      'mr-2 inline-block size-2.5 rounded-[2px] align-[-1px]',
                      SWATCHES[index].fill,
                    )}
                  />
                  {t(`token-kinds.kind.${row.id}`)}
                </th>
                <td
                  id={`token-kinds-row-${index}-what`}
                  data-component="TokenKinds"
                  className="text-muted-foreground hidden py-2 pr-3 text-xs sm:table-cell"
                >
                  {t(`token-kinds.what.${row.id}`)}
                </td>
                <td
                  id={`token-kinds-row-${index}-tokens`}
                  data-component="TokenKinds"
                  className="py-2 pr-3 text-right font-mono text-xs whitespace-nowrap tabular-nums"
                >
                  {number.format(row.tokens)}
                </td>
                <td
                  id={`token-kinds-row-${index}-rate`}
                  data-component="TokenKinds"
                  className="py-2 pr-3 text-right font-mono text-xs whitespace-nowrap tabular-nums"
                >
                  {`×${ratio.format(row.multiplier)}`}
                </td>
                <td
                  id={`token-kinds-row-${index}-cost`}
                  data-component="TokenKinds"
                  className="py-2 text-right font-mono text-xs whitespace-nowrap tabular-nums"
                >
                  {`$${money.format(row.cost)}`}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <figcaption
        id="token-kinds-caption"
        data-component="TokenKinds"
        className="text-muted-foreground text-xs"
      >
        {t('token-kinds.caption', { model: SONNET.name })}
      </figcaption>
    </figure>
  )
}

/**
 * One stacked bar: its name on the left, the four kinds in table order across, its total on the
 * right. The segments are proportional to the share and nothing else, so the two bars line up on
 * the same four colours and differ only in where the seams fall.
 */
function Bar({
  index,
  name,
  shares,
  total,
  format,
}: {
  index: number
  name: string
  shares: readonly number[]
  total: string
  format: (share: number) => string
}) {
  return (
    <div
      id={`token-kinds-bar-${index}`}
      data-component="Bar"
      // On a phone the bar takes its own line under the name and the total, since a share of 14%
      // of a third of the screen is narrower than the percentage printed in it.
      className="grid grid-cols-[1fr_auto] items-center gap-x-3 gap-y-1 sm:grid-cols-[4.5rem_1fr_5rem]"
    >
      <span
        id={`token-kinds-bar-${index}-name`}
        data-component="Bar"
        className="text-muted-foreground text-sm"
      >
        {name}
      </span>

      <span
        id={`token-kinds-bar-${index}-track`}
        data-component="Bar"
        className="order-last col-span-2 flex h-7 overflow-hidden rounded-md sm:order-none sm:col-span-1"
      >
        {shares.map((share, segment) => (
          <span
            key={segment}
            id={`token-kinds-bar-${index}-segment-${segment}`}
            data-component="Bar"
            style={{ width: `${share * 100}%` }}
            className={cn(
              'flex h-full items-center justify-center overflow-hidden font-mono text-[11px] whitespace-nowrap',
              SWATCHES[segment].fill,
              SWATCHES[segment].ink,
            )}
          >
            {share >= LABEL_FROM ? format(share) : null}
          </span>
        ))}
      </span>

      <span
        id={`token-kinds-bar-${index}-total`}
        data-component="Bar"
        className="text-right font-mono text-xs whitespace-nowrap tabular-nums sm:text-sm"
      >
        {total}
      </span>
    </div>
  )
}
