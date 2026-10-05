import { useTranslation } from 'react-i18next'
import { useLocale } from '@/shared/i18n/useLocale'
import { cn } from '@/shared/lib/utils'
import { exampleSentence } from './example-sentence'
import { OUTPUT_SCORES, softmax } from './network-pass'

/**
 * How widely the model picks, drawn on one choice: the four words that could follow `swears` (or
 * `zweert`), and how likely each one is under the standard setting and four others. It sits under
 * `tokens.one-at-a-time.3`, which says the scores are probabilities and the model picks one by them,
 * and it carries what that section's last paragraph no longer explains in words: temperature
 * sharpens or flattens the probabilities, top-k keeps the k best, top-p keeps the best until together
 * they reach p.
 *
 * **The scores are `TokenNetwork`'s own, read from `network-pass.ts`**, and the words and the context
 * are `example-sentence.ts`'s, so this is the same choice the network further down makes, seen from
 * the other side: the network produces four scores, and these settings reshape them before one is
 * taken. Every percentage is computed here from those scores (softmax of score over temperature), and
 * top-k and top-p renormalise what they keep, so the standard row is the network's 75 / 15 / 5 / 5 and
 * nothing on screen is typed. A word a setting removes prints as gone rather than as 0%, because 0%
 * at temperature 0.5 is a rounding and gone is a rule.
 *
 * **It shows the mechanism, not a setting the student can turn.** The Messages API rejects any
 * temperature, top_p or top_k but the default on Claude models released after Opus 4.6, and neither
 * Claude Code nor Copilot exposes them, which is what `tokens.one-at-a-time.4` says in one sentence.
 * That is why it is a still table rather than a slider: a control would suggest a knob the student
 * has, and they do not.
 *
 * The rows are one `role="img"` described in a sentence that reads every cell out, the numbers are
 * mono, and on a phone each row's label stacks above its four bars. It draws no context frame, like
 * every figure above `tools`.
 */

/** One setting: how it reshapes the standard probabilities, and what its label interpolates. */
type Knob =
  | { id: 'standard'; temperature: 1 }
  | { id: 'cold' | 'hot'; temperature: number }
  | { id: 'top-k'; k: number }
  | { id: 'top-p'; p: number }

const KNOBS: readonly Knob[] = [
  { id: 'standard', temperature: 1 },
  { id: 'cold', temperature: 0.5 },
  { id: 'hot', temperature: 2 },
  { id: 'top-k', k: 2 },
  { id: 'top-p', p: 0.9 },
]

/** Shares per output, in `outputs` order, with `null` for a word the setting removes. */
function shares(knob: Knob): (number | null)[] {
  if ('temperature' in knob) {
    return softmax(OUTPUT_SCORES, knob.temperature)
  }
  const base = softmax(OUTPUT_SCORES)
  const order = base.map((_, i) => i).sort((a, b) => base[b] - base[a])
  const kept = new Set<number>()
  if (knob.id === 'top-k') {
    order.slice(0, knob.k).forEach((i) => kept.add(i))
  } else {
    // The smallest set of best words whose probabilities together reach p.
    let total = 0
    for (const i of order) {
      if (total >= knob.p) break
      kept.add(i)
      total += base[i]
    }
  }
  const keptTotal = [...kept].reduce((sum, i) => sum + base[i], 0)
  return base.map((share, i) => (kept.has(i) ? share / keptTotal : null))
}

const ROWS = KNOBS.map((knob) => ({ knob, shares: shares(knob) }))

const percent = (share: number) => `${Math.round(share * 100)}%`

export function SamplingKnobs() {
  const { t, i18n } = useTranslation('step1')
  const { locale } = useLocale()
  const number = new Intl.NumberFormat(i18n.language)

  // Real tokens in the reader's language, the same ones `TokenNetwork` draws, and no locale key. No
  // ellipsis in front: the sentence starts here, so `… The agent swears` claimed text that is not there.
  const sentence = exampleSentence(locale)
  const context = sentence.tokens
    .slice(0, sentence.networkToken + 1)
    .map((token) => token.text)
    .join('')
  const outputs = sentence.outputs

  const name = (knob: Knob) => {
    switch (knob.id) {
      case 'standard':
        return t('sampling-knobs.name.standard')
      case 'cold':
      case 'hot':
        return t('sampling-knobs.name.temperature', { value: number.format(knob.temperature) })
      case 'top-k':
        return t('sampling-knobs.name.top-k', { value: number.format(knob.k) })
      case 'top-p':
        return t('sampling-knobs.name.top-p', { value: number.format(knob.p) })
    }
  }

  const hint = (knob: Knob) => {
    switch (knob.id) {
      case 'standard':
        return t('sampling-knobs.name.temperature', { value: number.format(knob.temperature) })
      case 'cold':
      case 'hot':
        return t(`sampling-knobs.hint.${knob.id}`)
      case 'top-k':
        return t('sampling-knobs.hint.top-k', { k: number.format(knob.k) })
      case 'top-p':
        return t('sampling-knobs.hint.top-p', { p: percent(knob.p) })
    }
  }

  const gone = t('sampling-knobs.gone')
  // `context` is an i18next option of its own, so the text in front goes in as `preceding`.
  const description = t('sampling-knobs.description', {
    preceding: context,
    rows: ROWS.map(
      ({ knob, shares }) =>
        `${name(knob)}: ${outputs
          .map((word, i) => `${word} ${shares[i] === null ? gone : percent(shares[i])}`)
          .join(', ')}`,
    ).join('; '),
  })

  return (
    <figure id="sampling-knobs" data-component="SamplingKnobs" className="my-8 flex flex-col gap-3">
      <span id="sampling-knobs-label" data-component="SamplingKnobs" className="eyebrow text-primary">
        {t('sampling-knobs.label')}
      </span>

      <div
        id="sampling-knobs-panel"
        data-component="SamplingKnobs"
        className="border-border bg-card flex flex-col gap-3 rounded-lg border p-4"
      >
        {/* The words so far, then the slot being filled, drawn as `PickTheNext`'s dashed chip so the
            open token looks the same wherever the unit leaves one open. */}
        <p
          id="sampling-knobs-context"
          data-component="SamplingKnobs"
          aria-hidden
          className="text-muted-foreground flex flex-wrap items-center gap-1.5 font-mono text-sm"
        >
          <span id="sampling-knobs-context-text" data-component="SamplingKnobs">
            {context}
          </span>
          <span
            id="sampling-knobs-context-next"
            data-component="SamplingKnobs"
            className="border-primary/40 text-primary/60 rounded border border-dashed px-1.5 py-0.5 font-mono text-sm"
          >
            ?
          </span>
        </p>

        {/* Four columns on a phone with each label on a line of its own above its bars; from `sm`
            the label takes a fifth column on the left, the way the mockup draws it. */}
        <div
          id="sampling-knobs-grid"
          data-component="SamplingKnobs"
          role="img"
          aria-label={description}
          className="grid grid-cols-4 items-center gap-x-2.5 gap-y-1.5 sm:grid-cols-[9.5rem_repeat(4,minmax(0,1fr))] sm:gap-y-2"
        >
          <span
            id="sampling-knobs-head-spacer"
            data-component="SamplingKnobs"
            className="hidden sm:block"
          />
          {outputs.map((word, i) => (
            <span
              key={i}
              id={`sampling-knobs-head-${i}`}
              data-component="SamplingKnobs"
              className="text-foreground font-mono text-xs"
            >
              {word}
            </span>
          ))}

          {ROWS.map(({ knob, shares }, index) => (
            <Row
              key={knob.id}
              index={index}
              name={name(knob)}
              hint={hint(knob)}
              shares={shares}
              gone={gone}
            />
          ))}
        </div>
      </div>
    </figure>
  )
}

/**
 * One setting: its name and what it does, then a bar and a percentage under each word. The standard
 * row is ruled off from the four below it, since it is the one the others are read against.
 */
function Row({
  index,
  name,
  hint,
  shares,
  gone,
}: {
  index: number
  name: string
  hint: string
  shares: readonly (number | null)[]
  gone: string
}) {
  return (
    <>
      {index === 1 ? (
        <span
          id="sampling-knobs-rule"
          data-component="Row"
          className="border-border col-span-full my-0.5 border-t"
        />
      ) : null}
      <span
        id={`sampling-knobs-row-${index}-label`}
        data-component="Row"
        className="col-span-4 pt-1 text-sm leading-snug sm:col-span-1 sm:pt-0"
      >
        <span id={`sampling-knobs-row-${index}-name`} data-component="Row" className="block">
          {name}
        </span>
        <span
          id={`sampling-knobs-row-${index}-hint`}
          data-component="Row"
          className="text-muted-foreground block text-xs"
        >
          {hint}
        </span>
      </span>
      {shares.map((share, i) => (
        <span
          key={i}
          id={`sampling-knobs-row-${index}-cell-${i}`}
          data-component="Row"
          data-state={share === null ? 'gone' : 'kept'}
          className="flex min-w-0 items-center gap-1.5"
        >
          <span
            id={`sampling-knobs-row-${index}-cell-${i}-bar`}
            data-component="Row"
            // The bar shares the cell with a percentage of up to four characters, so it is a share
            // of what is left beside that, with a sliver kept for a share that rounds to 0.
            style={share === null ? undefined : { width: `max(2px, calc((100% - 2.6rem) * ${share}))` }}
            className={cn('h-3 shrink-0 rounded-[3px]', share === null ? 'bg-border w-2' : 'bg-primary')}
          />
          <span
            id={`sampling-knobs-row-${index}-cell-${i}-value`}
            data-component="Row"
            className="text-muted-foreground font-mono text-[11px] whitespace-nowrap tabular-nums"
          >
            {share === null ? gone : percent(share)}
          </span>
        </span>
      ))}
    </>
  )
}
