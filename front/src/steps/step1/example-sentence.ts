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
 * `TokenSplit` reads its rates off this split too (English 10 tokens over 47 characters, 21 per 100;
 * Dutch 12 over 51, 24 per 100), so a new sentence moves its rate strip and has to be checked against
 * `tokens.not-words.2`, which says text and code cost about the same and ids nearly 3 times as much.
 * It also has to keep a word that breaks mid-word (`sw|ears`, `bewe|ert`), which that figure relies on.
 *
 * **No idiom straight after the network's token.** The sentence once read `swears up and down` and
 * `beweert bij hoog en bij laag`, which made `up` and `bij` the favourites in `TokenNetwork` and
 * `SamplingKnobs`: cut off from the rest of the idiom they read as mistakes, so the idiom went.
 *
 * **The network's token is a whole word, `that` (`dat`).** It was `ears` (`ert`), the second half
 * of the broken word, and the course owner found that a strange token to feed through a network.
 * The broken word still does its job in `TokenizerView` and `TokenSplit`.
 *
 * Plain data in its own module rather than an export from a figure, so the figure files stay
 * component-only and Fast Refresh keeps working on them.
 */
export const EXAMPLE_SENTENCES: { en: ExampleSentence } & Partial<Record<Locale, ExampleSentence>> = {
  // The agent swears that the tests passed locally.
  en: {
    tokens: [
      { text: 'The', id: 976 },
      { text: ' agent', id: 11793 },
      { text: ' sw', id: 2766 },
      { text: 'ears', id: 36108 },
      { text: ' that', id: 484 },
      { text: ' the', id: 290 },
      { text: ' tests', id: 10742 },
      { text: ' passed', id: 10292 },
      { text: ' locally', id: 33616 },
      { text: '.', id: 13 },
    ],
    networkToken: 4,
    outputs: ['the', 'it', 'all', 'he'],
  },
  // De agent beweert dat de tests lokaal zijn geslaagd.
  nl: {
    tokens: [
      { text: 'De', id: 1923 },
      { text: ' agent', id: 11793 },
      { text: ' bewe', id: 31951 },
      { text: 'ert', id: 805 },
      { text: ' dat', id: 1814 },
      { text: ' de', id: 334 },
      { text: ' tests', id: 10742 },
      { text: ' lokaal', id: 192544 },
      { text: ' zijn', id: 3210 },
      { text: ' ges', id: 5545 },
      { text: 'laagd', id: 146232 },
      { text: '.', id: 13 },
    ],
    networkToken: 4,
    outputs: ['de', 'het', 'alle', 'hij'],
  },
}

/** The active locale's sentence, or English when that locale has none of its own. */
export function exampleSentence(locale: Locale): ExampleSentence {
  return EXAMPLE_SENTENCES[locale] ?? EXAMPLE_SENTENCES.en
}
