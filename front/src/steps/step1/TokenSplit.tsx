import { useEffect, useState } from 'react'
import { useReducedMotion } from 'motion/react'
import { useTranslation } from 'react-i18next'
import { cn } from '@/shared/lib/utils'
import { DURATION, EASE_QUIET } from '@/shared/motion/motion'

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
 * The rate strip under the chips is the comparison the panel cannot make. The prose claims prose is
 * the cheapest thing you can hand a model and an id the dearest, and a panel showing one sample at a
 * time leaves the reader to click, remember and subtract. All four rows are always up, on one scale,
 * and only the emphasis follows the selection. It is a rate readout and **not a second sample**: a
 * Dutch row here would make the figure an argument about languages, which is the reason there is no
 * second sentence in the data.
 *
 * The panel restages when the selection changes, and the shape of that is the argument the figure
 * makes: the source line and the count arrive together, and the chips arrive one after another from
 * the left, which is the cut being made rather than a card being swapped. Hiding is instant and only
 * the arrival is drawn, so the previous sample is never seen fading out under the new one.
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
 * under it reads them in. Text is the cheapest thing you can hand a model and an id is the dearest,
 * and they sit at opposite ends so the student walks the whole range.
 *
 * **The text row has to contain a word that breaks**, and that is the reason this sentence and not a
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

/**
 * Tokens per hundred characters, worked out from the same data the chips are drawn from rather than
 * written down beside it, so the strip cannot drift away from the panel it sits above.
 */
function rateOf(entry: Sample): number {
  return Math.round((entry.pieces.length / entry.pieces.join('').length) * 100)
}

const RATES = SAMPLES.map(rateOf)
const WIDEST = Math.max(...RATES)

const EASE = `cubic-bezier(${EASE_QUIET.join(', ')})`

/**
 * Milliseconds between one chip arriving and the next. Small, because the longest sample is 22
 * tokens and a stagger tuned for a fan of five would run the identifier and the uuid past a second.
 * Left uncapped: a sample that takes longer to enumerate is one with more tokens in it, which is
 * what the figure is about.
 */
const CHIP_STEP = 12

/**
 * The transition for one part of the panel.
 *
 * A CSS transition takes its duration and delay from the style the element ends up in, so both have
 * to be written on the *shown* state to have any effect. The hidden state is therefore instant: the
 * text and the chips change in the same commit that hides them, so anything drawn on the way out
 * would be the new sample fading away before it arrived.
 */
function arrival(entering: boolean, delay: number): string {
  const duration = entering ? 0 : DURATION.state * 1000
  return `opacity ${duration}ms ${EASE} ${entering ? 0 : delay}ms, transform ${duration}ms ${EASE} ${
    entering ? 0 : delay
  }ms`
}

export function TokenSplit() {
  const { t, i18n } = useTranslation('step1')
  const [selected, setSelected] = useState(0)
  const still = useReducedMotion()
  /** True for one frame after a pick, so the incoming sample has something to travel from. */
  const [entering, setEntering] = useState(false)

  // Two frames rather than one: React commits the hidden state synchronously, and a single rAF can
  // still run before the browser has painted it, which would drop the transition entirely.
  useEffect(() => {
    if (!entering) {
      return
    }
    let inner = 0
    const outer = requestAnimationFrame(() => {
      inner = requestAnimationFrame(() => {
        setEntering(false)
      })
    })
    return () => {
      cancelAnimationFrame(outer)
      cancelAnimationFrame(inner)
    }
  }, [entering])

  const pick = (index: number) => {
    setSelected(index)
    // Under `prefers-reduced-motion` the panel simply holds the new sample, rather than playing the
    // same move at zero duration and spending two frames on nothing.
    if (!still && index !== selected) {
      setEntering(true)
    }
  }

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
              pick(index)
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

      {/* One scale, no ticks and no gridlines: the four lengths are the whole reading, and a rule
          behind them would invite the numbers to be read off it instead of off the mono column. The
          bars are aria-hidden because every row already prints its name and its number as text. */}
      <div id="token-split-rate" data-component="TokenSplit" className="flex flex-col gap-1.5">
        <div
          id="token-split-rate-head"
          data-component="TokenSplit"
          className="text-muted-foreground flex items-baseline justify-between text-xs"
        >
          <span id="token-split-rate-label" data-component="TokenSplit">
            {t('token-split.rate.label')}
          </span>
          {/* The unit of measure takes the `eyebrow` utility, which is what `ModelPricing` puts
              over its own table for the same job. */}
          <span id="token-split-rate-unit" data-component="TokenSplit" className="eyebrow">
            {t('token-split.rate.unit')}
          </span>
        </div>

        {SAMPLES.map((entry, index) => (
          <div
            key={entry.id}
            id={`token-split-rate-row-${index}`}
            data-component="TokenSplit"
            data-state={index === selected ? 'selected' : 'idle'}
            className="flex items-center gap-3"
          >
            <span
              id={`token-split-rate-name-${index}`}
              data-component="TokenSplit"
              className={cn(
                'w-28 shrink-0 text-sm',
                index === selected ? 'text-foreground' : 'text-muted-foreground',
              )}
            >
              {t(`token-split.sample.${entry.id}`)}
            </span>

            <span
              id={`token-split-rate-track-${index}`}
              data-component="TokenSplit"
              aria-hidden="true"
              className="flex-1"
            >
              <span
                id={`token-split-rate-bar-${index}`}
                data-component="TokenSplit"
                style={{ width: `${(RATES[index] / WIDEST) * 100}%` }}
                className={cn(
                  'block h-2 rounded-sm border transition-[width,background-color]',
                  index === selected
                    ? 'border-primary bg-primary'
                    : 'border-border bg-muted',
                )}
              />
            </span>

            <span
              id={`token-split-rate-value-${index}`}
              data-component="TokenSplit"
              className={cn(
                'w-8 shrink-0 text-right font-mono text-sm tabular-nums',
                index === selected ? 'text-foreground' : 'text-muted-foreground',
              )}
            >
              {RATES[index]}
            </span>
          </div>
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
          style={{ opacity: entering ? 0 : 1, transition: arrival(entering, 0) }}
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
              // A short rise rather than a slide from the left: the chips wrap, so a horizontal
              // arrival would have the second row travelling out of the first one's end.
              style={{
                opacity: entering ? 0 : 1,
                transform: entering ? 'translateY(3px)' : 'translateY(0)',
                transition: arrival(entering, index * CHIP_STEP),
              }}
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
          style={{ opacity: entering ? 0 : 1, transition: arrival(entering, 0) }}
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
