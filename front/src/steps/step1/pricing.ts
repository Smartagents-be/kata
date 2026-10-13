/**
 * Dollars per million tokens, as the provider lists them. Rows run cheapest first, because that is
 * the order `model`'s prose reads them in: the middle tier costs roughly 20 times the small
 * one, the top tier roughly 40 times.
 *
 * Haiku 5.5 is the one row priced by prompt length: these are its rates for prompts up to 100,000
 * tokens, and above that every rate is 5 times higher (pricing page, 13 October 2026). The caption
 * under `ModelPricing` says so, and the ratios in `model.cost.1` are taken at the lower rates.
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
  { id: 'haiku', name: 'Claude Haiku 5.5', input: 0.1, write5m: 0.125, write1h: 0.2, read: 0.01, output: 0.5 },
  { id: 'sonnet', name: 'Claude Sonnet 5.5', input: 2, write5m: 2.5, write1h: 4, read: 0.1, output: 10 },
  { id: 'opus', name: 'Claude Opus 5.5', input: 4, write5m: 5, write1h: 8, read: 0.2, output: 20 },
  { id: 'fable', name: 'Claude Fable 5.1', input: 10, write5m: 12.5, write1h: 20, read: 0.25, output: 50 },
] as const

export type PriceRow = (typeof PRICES)[number]

/** The rate columns, without the row's id and name. */
export type Rate = Exclude<keyof PriceRow, 'id' | 'name'>

/**
 * A rate the way the provider's page prints it, and the way `ModelPricing` always has: whole dollars
 * bare, anything else to the cent (`$2`, `$1.25`, `$0.10`), and to a tenth of a cent where the
 * provider prints one (Haiku 5.5's `$0.125`). It is a price list rather than prose, so it reads the
 * same in both languages, decimal point included.
 */
export function dollars(amount: number): string {
  if (Number.isInteger(amount)) return `$${amount}`
  return Number.isInteger(Math.round(amount * 1e6) / 1e4) ? `$${amount.toFixed(2)}` : `$${amount.toFixed(3)}`
}
