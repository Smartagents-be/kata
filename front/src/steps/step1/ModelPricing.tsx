import { useStepText } from '@/shared/i18n/useStepText'

/**
 * Dollars per million tokens, as the provider lists them. Rows run cheapest first, because that is
 * the order the prose above reads them in: call the small one a single unit, the middle tier is
 * roughly three of those, the top tier roughly five.
 *
 * `ModelTiers` twelve lines up the page runs the same three in the same direction, and did not until
 * the cards were flipped to match this table. Neither figure may be reordered on its own.
 *
 * The numbers are data rather than prose, so they carry no `data-i18n` and no `nl` entry, the same
 * way `BudgetWindow`'s line counts and `SpotInjection`'s result bodies do. Model names are proper
 * nouns and stay English for the same reason. Only the column headings and the caption translate.
 *
 * Sonnet is listed at its standing rate rather than the introductory $2 and $10 running until
 * 1 September 2026, because the ratio the prose teaches is the one it settles at.
 */
const ROWS = [
  { id: 'haiku', name: 'Claude Haiku 4.5', input: '$1', write5m: '$1.25', write1h: '$2', read: '$0.10', output: '$5' },
  { id: 'sonnet', name: 'Claude Sonnet 5', input: '$3', write5m: '$3.75', write1h: '$6', read: '$0.30', output: '$15' },
  { id: 'opus', name: 'Claude Opus 5', input: '$5', write5m: '$6.25', write1h: '$10', read: '$0.50', output: '$25' },
  { id: 'fable', name: 'Claude Fable 5', input: '$10', write5m: '$12.50', write1h: '$20', read: '$1', output: '$50' },
] as const

/** Keyed by the row field so a heading and the column under it cannot drift apart. */
const COLUMNS = [
  { key: 'input', head: 'pricing.head.input' },
  { key: 'write5m', head: 'pricing.head.write-5m' },
  { key: 'write1h', head: 'pricing.head.write-1h' },
  { key: 'read', head: 'pricing.head.read' },
  { key: 'output', head: 'pricing.head.output' },
] as const

/**
 * The step's only price list, and the one place a number in this course has a currency in front of
 * it. It sits under the paragraph that states the ratios and above the one that says the ratios
 * outlive the numbers, so it is read as evidence for a claim rather than as a reference table.
 *
 * Four things the prose already argues can be checked against it by eye: the small tier as one unit
 * with the middle at three and the top at five, output at five times input in every row, and a cache
 * read at a tenth of input, which is the figure `harness` gives for what caching saves.
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
            {ROWS.map((row, index) => (
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
                    {row[column.key]}
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
