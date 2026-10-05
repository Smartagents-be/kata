import { useState } from 'react'
import { useTranslation } from 'react-i18next'
import { useLocale } from '@/shared/i18n/useLocale'
import { cn } from '@/shared/lib/utils'
import { exampleSentence } from './example-sentence'

/**
 * The lead figure: one sentence the way a tokeniser hands it to the model. Two counters, the text
 * with every token on its own background, and a toggle that swaps the text for the ids. It is the
 * word, token, number step `tokens.lead.1` states, made visible before `TokenNetwork` feeds one of
 * those numbers through a network.
 *
 * **The ids are real.** They are `o200k_base`'s, produced with tiktoken and stored beside the split
 * in `example-sentence.ts`, which `TokenNetwork` reads too, so the two figures cannot disagree about
 * the token the network takes. The sentence follows the active language, one per locale, and the
 * counters are computed from it; a locale with no sentence of its own gets the English one. The
 * split itself has no locale key: a token is machine output.
 *
 * **The tints are one hue at three strengths**, the primary at 15, 28 and 40 percent (stronger in
 * dark mode), cycled so no two neighbours share one. That is what marks a boundary, and the leading space stays inside its
 * token's background rather than being drawn as a dot, the way the reference tokenizer page shows
 * it: here the point is the whole sentence at once, and `TokenSplit` below is where the space is
 * pointed at. Several hues would read better at a glance and would be the only rainbow in the
 * course, and `--success` and `--destructive` are not ours to borrow.
 *
 * No token is marked. The network figure takes `networkToken` (`ears`, `ert`), but it sits sections
 * further down now, and an underline with nothing near it to explain it read as a mistake.
 *
 * It draws no context frame, on the same reasoning as every other figure above `tools`.
 */

/** Light, then dark: on the dark box the lightest light step all but vanishes, so each is lifted. */
const TINTS = [
  'bg-primary/15 dark:bg-primary/25',
  'bg-primary/28 dark:bg-primary/40',
  'bg-primary/40 dark:bg-primary/55',
]

type View = 'text' | 'ids'
const VIEWS: View[] = ['text', 'ids']

export function TokenizerView() {
  const { t } = useTranslation('step1')
  const { locale } = useLocale()
  const [view, setView] = useState<View>('text')

  const { tokens } = exampleSentence(locale)
  const text = tokens.map((token) => token.text).join('')

  const counters = [
    { id: 'tokens', label: t('tokenizer-view.tokens'), value: tokens.length },
    { id: 'characters', label: t('tokenizer-view.characters'), value: text.length },
  ]

  return (
    <figure id="tokenizer-view" data-component="TokenizerView" className="my-8 flex flex-col gap-3">
      <span id="tokenizer-view-label" data-component="TokenizerView" className="eyebrow text-primary">
        {t('tokenizer-view.label')}
      </span>

      <div
        id="tokenizer-view-panel"
        data-component="TokenizerView"
        className="border-border bg-card flex flex-col gap-4 rounded-lg border p-4"
      >
        <dl id="tokenizer-view-counters" data-component="TokenizerView" className="flex gap-10">
          {counters.map((counter) => (
            <div
              key={counter.id}
              id={`tokenizer-view-counter-${counter.id}`}
              data-component="TokenizerView"
              className="flex flex-col"
            >
              <dt
                id={`tokenizer-view-counter-${counter.id}-label`}
                data-component="TokenizerView"
                className="text-sm font-semibold"
              >
                {counter.label}
              </dt>
              <dd
                id={`tokenizer-view-counter-${counter.id}-value`}
                data-component="TokenizerView"
                className="font-mono text-3xl leading-tight tabular-nums"
              >
                {counter.value}
              </dd>
            </div>
          ))}
        </dl>

        {/* A floor on the height, so the toggle under the box moves as little as it can between views. */}
        <div
          id="tokenizer-view-box"
          data-component="TokenizerView"
          data-state={view}
          aria-live="polite"
          className="bg-muted border-border flex min-h-20 items-start rounded-md border p-4 font-mono text-[15px] leading-relaxed"
        >
          {view === 'text' ? (
            // One flex item per token, so a narrow column wraps between tokens and never inside one.
            <p
              id="tokenizer-view-text"
              data-component="TokenizerView"
              role="img"
              aria-label={t('tokenizer-view.text.description', {
                tokens: tokens.length,
                pieces: tokens.map((token) => token.text.trim()).join(', '),
              })}
              className="flex flex-wrap gap-y-1"
            >
              {tokens.map((token, index) => (
                <span
                  key={index}
                  id={`tokenizer-view-token-${index}`}
                  data-component="TokenizerView"
                  className={cn(
                    'rounded-[3px] py-0.5 whitespace-pre',
                    TINTS[index % TINTS.length],
                  )}
                >
                  {token.text}
                </span>
              ))}
            </p>
          ) : (
            <p
              id="tokenizer-view-ids"
              data-component="TokenizerView"
              aria-label={t('tokenizer-view.ids.description', {
                tokens: tokens.length,
                ids: tokens.map((token) => token.id).join(', '),
              })}
              role="img"
              className="break-words"
            >
              {`[${tokens.map((token) => token.id).join(', ')}]`}
            </p>
          )}
        </div>

        <div
          id="tokenizer-view-toggle"
          data-component="TokenizerView"
          role="group"
          aria-label={t('tokenizer-view.view')}
          className="bg-muted border-border inline-flex gap-0.5 self-start rounded-lg border p-[3px]"
        >
          {VIEWS.map((option) => (
            <button
              key={option}
              id={`tokenizer-view-toggle-${option}`}
              data-component="TokenizerView"
              data-state={view === option ? 'selected' : 'idle'}
              type="button"
              aria-pressed={view === option}
              onClick={() => {
                setView(option)
              }}
              className={cn(
                'focus-visible:ring-ring rounded-md border px-3.5 py-1 text-sm transition-colors focus-visible:ring-[3px] focus-visible:outline-none',
                view === option
                  ? 'bg-card text-foreground border-border'
                  : 'text-muted-foreground hover:text-foreground border-transparent',
              )}
            >
              {t(`tokenizer-view.view.${option}`)}
            </button>
          ))}
        </div>

        <p id="tokenizer-view-note" data-component="TokenizerView" className="text-muted-foreground text-xs">
          {t('tokenizer-view.note')}
        </p>
      </div>
    </figure>
  )
}
