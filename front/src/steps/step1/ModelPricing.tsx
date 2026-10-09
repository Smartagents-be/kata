import { useStepText } from '@/shared/i18n/useStepText'
import { PRICES, dollars } from './pricing'

/** Keyed by the row field so a heading and the column under it cannot drift apart. */
const COLUMNS = [
  { key: 'input', head: 'pricing.head.input' },
  { key: 'write5m', head: 'pricing.head.write-5m' },
  { key: 'write1h', head: 'pricing.head.write-1h' },
  { key: 'read', head: 'pricing.head.read' },
  { key: 'output', head: 'pricing.head.output' },
] as const

/**
 * The step's only price list. The rows are `pricing.ts`'s, which is also where `TokenKinds` in
 * `tokens` takes its Sonnet rates from, so the one turn priced up there cannot drift from this table.
 * That figure's dollar total is the only other number in the course with a currency in front of it.
 *
 * It sits under the paragraph that states the ratios and above the one that says the ratios outlive
 * the numbers, so it is read as evidence for a claim rather than as a reference table.
 *
 * Three things the prose already argues can be checked against it by eye: the small tier as one unit
 * with the middle at two and the top at four, output at five times input in every row, and a cache
 * read at a tenth of input or less, which is what `tokens.prompt-caching.1` says caching costs. The top two tiers
 * read their cache cheaper than a tenth, which is why that sentence says "or less".
 *
 * It scrolls in its own box rather than wrapping. Six columns of machine output do not reflow into
 * a phone, and a table that reflows stops being one.
 */
export function ModelPricing() {
  const { text } = useStepText('step1')

  return (
    <div id="model-pricing" data-component="ModelPricing" className="my-8">
      {/*
        The unit sits above the numbers rather than only under them, because a reader who scans
        straight to a figure has to know what it counts before the figure means anything. It is
        outside the scrolling box on purpose, so it stays put when the table is dragged sideways on
        a narrow screen.
      */}
      <div
        id="model-pricing-header"
        data-component="ModelPricing"
        className="mb-1 flex items-baseline gap-3"
      >
        <p id="model-pricing-unit" data-component="ModelPricing" className="eyebrow text-primary">
          {text('pricing.unit')}
        </p>
        <span
          id="model-pricing-header-rule"
          data-component="ModelPricing"
          aria-hidden
          className="bg-border/70 h-px flex-1"
        />
      </div>

      <div id="model-pricing-scroll" data-component="ModelPricing" className="overflow-x-auto">
        <table
          id="model-pricing-table"
          data-component="ModelPricing"
          className="w-full caption-bottom border-collapse text-sm"
        >
          <thead id="model-pricing-head" data-component="ModelPricing">
            <tr
              id="model-pricing-head-row"
              data-component="ModelPricing"
              className="border-border/70 border-b"
            >
              <th
                id="model-pricing-head-model"
                data-component="ModelPricing"
                scope="col"
                className="text-muted-foreground px-4 py-3 text-left font-medium whitespace-nowrap"
              >
                {text('pricing.head.model')}
              </th>
              {COLUMNS.map((column, index) => (
                <th
                  key={column.key}
                  id={`model-pricing-head-${index}`}
                  data-component="ModelPricing"
                  scope="col"
                  className="text-muted-foreground px-4 py-3 text-right font-medium whitespace-nowrap"
                >
                  {text(column.head)}
                </th>
              ))}
            </tr>
          </thead>

          <tbody id="model-pricing-body" data-component="ModelPricing">
            {PRICES.map((row, index) => (
              <tr
                key={row.id}
                id={`model-pricing-row-${index}`}
                data-component="ModelPricing"
                className="border-border/50 border-b last:border-b-0"
              >
                <th
                  id={`model-pricing-row-${index}-model`}
                  data-component="ModelPricing"
                  scope="row"
                  className="py-3 pr-4 text-left font-medium whitespace-nowrap"
                >
                  {row.name}
                </th>
                {COLUMNS.map((column, columnIndex) => (
                  <td
                    key={column.key}
                    id={`model-pricing-row-${index}-${columnIndex}`}
                    data-component="ModelPricing"
                    className="px-4 py-3 text-right font-mono whitespace-nowrap tabular-nums"
                  >
                    {dollars(row[column.key])}
                  </td>
                ))}
              </tr>
            ))}
          </tbody>

          <caption
            id="model-pricing-caption"
            data-component="ModelPricing"
            className="text-muted-foreground pt-3 text-left text-xs"
          >
            {text('pricing.caption')}
          </caption>
        </table>
      </div>
    </div>
  )
}
