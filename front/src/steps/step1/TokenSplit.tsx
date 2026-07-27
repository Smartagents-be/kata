import { useState } from 'react'
import { useTranslation } from 'react-i18next'
import { cn } from '@/shared/lib/utils'

/**
 * What a tokeniser does to four strings. The student clicks between them and watches the same
 * argument land four times: a token is not a word, not a character, and not anything you can count
 * by eye.
 *
 * The splits are real. They were produced by `o200k_base`, a public BPE tokeniser, rather than
 * estimated, which is why they are stored as data here and carry no `nl` entry, the same way
 * `ModelPricing`'s numbers and `BudgetWindow`'s line counts do. Every provider ships its own
 * tokeniser and the boundaries differ in detail; what does not differ is the shape, and the shape is
 * what the caption tells the student to keep.
 *
 * Deliberately presets rather than a box to type in. A free field is only honest with a real
 * tokeniser in the bundle, and shipping a megabyte of BPE ranks to split five sentences is not a
 * trade this page should make.
 *
 * It draws no context frame. `ToolsInContext` in `tools` is the first teal frame a student meets,
 * so every figure above it stays out of that vocabulary rather than spending it early.
 * `PromptInContext` gave its frame up for the same reason, and `ModelTiers` never had one.
 */

type Sample = {
  /** Message key stem and BEM modifier. */
  id: string
  /** One entry per token, in order, concatenating back to the original string. */
  pieces: string[]
}

/**
 * Ordered by what they cost per character, most efficient first, because that is the order the prose
 * under it reads them in. Prose is the cheapest thing you can hand a model and an id is the dearest,
 * and they sit at opposite ends so the student walks the whole range.
 *
 * **The prose row has to contain a word that breaks**, and that is the reason this sentence and not a
 * tidier one: six of its seven words are one token, and `unscrambled` comes apart at `unscr` and
 * `ambled`, which is neither a syllable nor a stem. A sentence where every word survives whole shows
 * the student nothing, and one that breaks somewhere defensible shows them the wrong thing. No prose
 * points any of this out, so the figure is on its own here.
 *
 * There is deliberately no second sentence in another language. Comparing English against Dutch made
 * the figure an argument about languages, which is not what this unit is teaching.
 */
const SAMPLES: Sample[] = [
  {
    id: 'prose',
    pieces: [
      'The',
      ' catalogue',
      ' endpoint',
      ' returns',
      ' nine',
      ' unscr',
      'ambled',
      ' titles',
      '.',
    ],
  },
  {
    id: 'java',
    pieces: [
      'public',
      ' List',
      '<String',
      '>',
      ' titles',
      '()',
      ' {',
      ' return',
      ' catalog',
      '.all',
      '();',
      ' }',
    ],
  },
  {
    id: 'identifier',
    pieces: [
      'be',
      '.smart',
      'agents',
      '.k',
      'ata',
      '.java',
      '.step',
      '1',
      '.C',
      'atalog',
      'Controller',
    ],
  },
  {
    id: 'uuid',
    pieces: [
      '8',
      'a',
      '467',
      '83',
      'b',
      '-',
      '38',
      'ae',
      '-',
      '412',
      '4',
      '-',
      '935',
      '7',
      '-',
      '57',
      'c',
      '1',
      'eb',
      '4',
      'ae',
      '306',
    ],
  },
]

export function TokenSplit() {
  const { t, i18n } = useTranslation('step1')
  const [selected, setSelected] = useState(0)

  const sample = SAMPLES[selected]
  const text = sample.pieces.join('')
  const ratio = new Intl.NumberFormat(i18n.language, {
    minimumFractionDigits: 1,
    maximumFractionDigits: 1,
  }).format(text.length / sample.pieces.length)

  return (
    <figure id="token-split" data-component="TokenSplit" className="my-8 flex flex-col gap-3">
      <span id="token-split-label" data-component="TokenSplit" className="eyebrow text-primary">
        {t('token-split.label')}
      </span>

      <div
        id="token-split-samples"
        data-component="TokenSplit"
        className="flex flex-wrap gap-2"
        role="group"
        aria-label={t('token-split.pick')}
      >
        {SAMPLES.map((entry, index) => (
          <button
            key={entry.id}
            id={`token-split-sample-${index}`}
            data-component="TokenSplit"
            data-state={index === selected ? 'selected' : 'idle'}
            type="button"
            aria-pressed={index === selected}
            onClick={() => {
              setSelected(index)
            }}
            className={cn(
              'focus-visible:ring-ring rounded-full border px-3 py-1 text-sm transition-colors focus-visible:ring-[3px] focus-visible:outline-none',
              index === selected
                ? 'border-primary bg-primary text-primary-foreground'
                : 'text-muted-foreground hover:text-foreground hover:border-primary/40',
            )}
          >
            {t(`token-split.sample.${entry.id}`)}
          </button>
        ))}
      </div>

      <div
        id="token-split-panel"
        data-component="TokenSplit"
        className="border-border bg-card flex flex-col gap-4 rounded-lg border p-4"
      >
        {/* The string before it is cut up. Without it the chips are a list of fragments with
            nothing to read them against. */}
        <p
          id="token-split-source"
          data-component="TokenSplit"
          className="text-muted-foreground font-mono text-sm break-all"
        >
          {text}
        </p>

        {/* One chip per token. The alternating fill is what marks the boundaries: two chips of the
            same tint sitting side by side read as one word broken by a gap, which is exactly the
            thing this figure is trying to show is not happening. The chart ramp was the other
            option and it is not used here, because chart-5 is dark enough to need its own ink and a
            row of chips would then carry two text colours for no reason. */}
        <div
          id="token-split-chips"
          data-component="TokenSplit"
          role="img"
          // Not `count`: i18next reserves that name for plural resolution.
          aria-label={t('token-split.description', {
            tokens: sample.pieces.length,
            sample: t(`token-split.sample.${sample.id}`),
          })}
          className="flex flex-wrap gap-1"
        >
          {sample.pieces.map((piece, index) => (
            <span
              key={`${sample.id}-${index}`}
              id={`token-split-chip-${index}`}
              data-component="TokenSplit"
              className={cn(
                'border-primary/30 rounded border px-1.5 py-0.5 font-mono text-sm whitespace-pre',
                index % 2 === 0 ? 'bg-primary/10' : 'bg-primary/20',
              )}
            >
              {/* A leading space belongs to the token in front of it, and that is one of the
                  surprises here, so it is drawn rather than left invisible. */}
              {piece.startsWith(' ') ? (
                <>
                  <span className="text-primary/50" aria-hidden="true">
                    ·
                  </span>
                  {piece.slice(1)}
                </>
              ) : (
                piece
              )}
            </span>
          ))}
        </div>

        <p
          id="token-split-count"
          data-component="TokenSplit"
          className="text-muted-foreground font-mono text-xs tabular-nums"
        >
          {t('token-split.count', {
            chars: text.length,
            tokens: sample.pieces.length,
            ratio,
          })}
        </p>
      </div>

      <figcaption
        id="token-split-caption"
        data-component="TokenSplit"
        className="text-muted-foreground text-xs"
      >
        {t('token-split.caption')}
      </figcaption>
    </figure>
  )
}
