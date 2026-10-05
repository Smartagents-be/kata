import type { Locale } from '@/shared/i18n/locale'

/** One token: its text and its number in `o200k_base`'s vocabulary. */
export type Token = { text: string; id: number }

export type ExampleSentence = {
  /** The split, in order, concatenating back to the sentence. */
  tokens: readonly Token[]
  /** Index into `tokens` of the one `TokenNetwork` feeds through, and `TokenizerView` underlines. */
  networkToken: number
  /**
   * The four words `TokenNetwork` chooses between, without their leading space. The first is the
   * token that really follows `networkToken` in the sentence, and it has to stay first: the
   * network's invented weights make the first output the winner.
   */
  outputs: readonly [string, string, string, string]
}

/**
 * The sentence the `tokens` unit opens on, one per language, as `o200k_base` cuts it, and the one
 * sentence shared by its tokenizer and network figures. `TokenizerView` draws the active language's split with its ids,
 * `TokenSplit` makes it its text row, and `TokenNetwork` and `SamplingKnobs` take one token out of
 * it, with the tokens in front of it as their context. A reader only ever sees their own language's
 * sentence, never the two side by side. A locale without its own entry falls back to English.
 * Attention uses a separate localised bank example, and `NextToken` uses
 * `the build failed because it timed out`.
 *
 * **Both columns are real output, not estimates.** They were produced with tiktoken's `o200k_base`
 * encoding, and the texts concatenate back to the sentence. Change one word of either sentence and
 * its split and ids have to be regenerated with tiktoken: an id is the one number in this unit a
 * student can check, so a hand-edited one is a wrong fact rather than a simplification. The network's
 * token, its context and the first of its outputs are lifted from the split as well, so a new
 * sentence means checking `networkToken` and `outputs` too.
 *
 * `TokenSplit` reads its rates off this split too (English 11 tokens over 49 characters, 22 per 100;
 * Dutch 14 over 54, 26 per 100), so a new sentence moves its rate strip and has to be checked against
 * `tokens.not-words.2`, which says text and code cost about the same and ids nearly 3 times as much.
 * It also has to keep a word that breaks mid-word (`sw|ears`, `zwe|ert`), which that figure relies on.
 *
 * Plain data in its own module rather than an export from a figure, so the figure files stay
 * component-only and Fast Refresh keeps working on them.
 */
export const EXAMPLE_SENTENCES: { en: ExampleSentence } & Partial<Record<Locale, ExampleSentence>> = {
  // The agent swears the tests passed on its machine.
  en: {
    tokens: [
      { text: 'The', id: 976 },
      { text: ' agent', id: 11793 },
      { text: ' sw', id: 2766 },
      { text: 'ears', id: 36108 },
      { text: ' the', id: 290 },
      { text: ' tests', id: 10742 },
      { text: ' passed', id: 10292 },
      { text: ' on', id: 402 },
      { text: ' its', id: 1617 },
      { text: ' machine', id: 7342 },
      { text: '.', id: 13 },
    ],
    networkToken: 3,
    outputs: ['the', 'that', 'it', 'by'],
  },
  // De agent zweert dat de tests op zijn machine slaagden.
  nl: {
    tokens: [
      { text: 'De', id: 1923 },
      { text: ' agent', id: 11793 },
      { text: ' zwe', id: 24262 },
      { text: 'ert', id: 805 },
      { text: ' dat', id: 1814 },
      { text: ' de', id: 334 },
      { text: ' tests', id: 10742 },
      { text: ' op', id: 991 },
      { text: ' zijn', id: 3210 },
      { text: ' machine', id: 7342 },
      { text: ' sla', id: 31342 },
      { text: 'ag', id: 348 },
      { text: 'den', id: 1660 },
      { text: '.', id: 13 },
    ],
    networkToken: 3,
    outputs: ['dat', 'de', 'het', 'op'],
  },
}

/** The active locale's sentence, or English when that locale has none of its own. */
export function exampleSentence(locale: Locale): ExampleSentence {
  return EXAMPLE_SENTENCES[locale] ?? EXAMPLE_SENTENCES.en
}
