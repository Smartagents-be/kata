/**
 * Dollars per million tokens, as the provider lists them. Rows run cheapest first, because that is
 * the order `model`'s prose reads them in: call the small one a single unit, the middle tier is
 * roughly two of those, the top tier roughly four.
 *
 * `ModelTiers` runs the same three in the same direction, and did not until the cards were flipped
 * to match `ModelPricing`'s table. Neither figure may be reordered on its own.
 *
 * The numbers are data rather than prose, so they carry no `data-i18n` and no `nl` entry, the same
 * way `BudgetWindow`'s line counts and `SpotInjection`'s result bodies do. Model names are proper
 * nouns and stay English for the same reason.
 *
 * They live here rather than inside `ModelPricing` because `TokenKinds` in `tokens` prices its turn
 * off the Sonnet row, and a second copy of a price list is the first one to go stale.
 */
export const PRICES = [
  { id: 'haiku', name: 'Claude Haiku 4.5', input: 1, write5m: 1.25, write1h: 2, read: 0.1, output: 5 },
  { id: 'sonnet', name: 'Claude Sonnet 5.5', input: 2, write5m: 2.5, write1h: 4, read: 0.2, output: 10 },
  { id: 'opus', name: 'Claude Opus 5.5', input: 4, write5m: 5, write1h: 8, read: 0.2, output: 20 },
  { id: 'fable', name: 'Claude Fable 5.1', input: 10, write5m: 12.5, write1h: 20, read: 0.25, output: 50 },
] as const

export type PriceRow = (typeof PRICES)[number]

/** The rate columns, without the row's id and name. */
export type Rate = Exclude<keyof PriceRow, 'id' | 'name'>

/**
 * A rate the way the provider's page prints it, and the way `ModelPricing` always has: whole dollars
 * bare, anything else to the cent (`$2`, `$1.25`, `$0.10`). It is a price list rather than prose, so
 * it reads the same in both languages, decimal point included.
 */
export function dollars(amount: number): string {
  return Number.isInteger(amount) ? `$${amount}` : `$${amount.toFixed(2)}`
}
