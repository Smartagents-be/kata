import { useTranslation } from 'react-i18next'
import { cn } from '@/shared/lib/utils'

/**
 * What a session is actually made of, weighed rather than listed. Eight blocks from half an hour of
 * ordinary work, each drawn at its size in tokens: the two the student typed are slivers, and the
 * `mvn test` output on its own outweighs everything a person contributed by two orders of magnitude.
 *
 * The argument here is the *share*, not the growth. `BundleCompare` in the `prompt` unit already
 * draws a session growing and re-sending itself, so this one deliberately says nothing about turns
 * or copies. It sits under the `wrote-almost-none` section, which is the only claim it makes.
 *
 * Static, like `ContextFalloff`: there is one number to read and clicking through it would not add
 * anything. Colour follows the step's diagram vocabulary, so teal is the student and the machine's
 * own output is the plain panel.
 */

type Origin = 'you' | 'agent' | 'tool'

type Block = {
  /** Message key in the step1 namespace. */
  key: string
  origin: Origin
  /** Its size in tokens, which is the whole point of the figure. */
  tokens: number
}

/**
 * Half an hour on the catalogue: two questions, four files read, one test run. Nothing unusual
 * happens in it, which is why the tally is worth looking at.
 */
const BLOCKS: Block[] = [
  { key: 'session-makeup.block.1', origin: 'you', tokens: 14 },
  { key: 'session-makeup.block.2', origin: 'agent', tokens: 90 },
  { key: 'session-makeup.block.3', origin: 'tool', tokens: 1240 },
  { key: 'session-makeup.block.4', origin: 'tool', tokens: 860 },
  { key: 'session-makeup.block.5', origin: 'agent', tokens: 120 },
  { key: 'session-makeup.block.6', origin: 'you', tokens: 9 },
  { key: 'session-makeup.block.7', origin: 'tool', tokens: 2400 },
  { key: 'session-makeup.block.8', origin: 'agent', tokens: 180 },
]

/** Yours teal, the agent's own words a lighter teal, everything a tool handed back a plain grey. */
const TONE: Record<Origin, string> = {
  you: 'bg-primary',
  agent: 'bg-primary/40',
  tool: 'bg-muted-foreground/40',
}

const ORIGINS: Origin[] = ['you', 'agent', 'tool']

const total = BLOCKS.reduce((sum, block) => sum + block.tokens, 0)
const typed = BLOCKS.filter((block) => block.origin === 'you').reduce(
  (sum, block) => sum + block.tokens,
  0,
)
const widest = Math.max(...BLOCKS.map((block) => block.tokens))

export function SessionMakeup() {
  const { t, i18n } = useTranslation('step1')
  const number = new Intl.NumberFormat(i18n.language)

  return (
    <figure id="session-makeup" data-component="SessionMakeup" className="my-8 flex flex-col gap-3">
      <span
        id="session-makeup-label"
        data-component="SessionMakeup"
        className="eyebrow text-primary"
      >
        {t('session-makeup.label')}
      </span>

      {/* Without this the teal is just a colour. It is the only thing saying which two bars are the
          student's, which is the whole reading of the figure. */}
      <div
        id="session-makeup-legend"
        data-component="SessionMakeup"
        className="flex flex-wrap items-center gap-x-4 gap-y-1"
      >
        {ORIGINS.map((origin) => (
          <span
            key={origin}
            id={`session-makeup-legend-${origin}`}
            data-component="SessionMakeup"
            className="text-muted-foreground flex items-center gap-1.5 font-mono text-xs"
          >
            <span className={cn('h-2 w-5 rounded-sm', TONE[origin])} aria-hidden="true" />
            {t(`session-makeup.${origin}`)}
          </span>
        ))}
      </div>

      <div
        id="session-makeup-blocks"
        data-component="SessionMakeup"
        role="img"
        aria-label={t('session-makeup.description')}
        className="border-border bg-card flex flex-col gap-3 rounded-lg border p-4"
      >
        {BLOCKS.map((block, index) => (
          <div
            key={block.key}
            id={`session-makeup-block-${index}`}
            data-component="SessionMakeup"
            data-state={block.origin}
            className="grid grid-cols-[1fr_auto] items-baseline gap-x-3 gap-y-1"
          >
            {/* The label sits above its own bar rather than beside it. A column narrow enough to
                keep eight bars in view is too narrow for these labels, and the Dutch ones run
                longer again, so a side-by-side layout wraps on some rows and not others. */}
            <span
              id={`session-makeup-block-${index}-label`}
              data-component="SessionMakeup"
              className={cn(
                'text-sm leading-snug',
                block.origin === 'you' ? 'text-foreground' : 'text-muted-foreground font-mono',
              )}
            >
              {t(block.key)}
            </span>

            <span
              id={`session-makeup-block-${index}-tokens`}
              data-component="SessionMakeup"
              className="text-muted-foreground text-right font-mono text-xs tabular-nums"
            >
              {number.format(block.tokens)}
            </span>

            {/* The bar reads against the largest block rather than the total, so the small ones are
                still a shape and not a rounding error. */}
            <span
              id={`session-makeup-block-${index}-bar`}
              data-component="SessionMakeup"
              className="col-span-2 flex h-2 items-center"
            >
              <span
                className={cn('h-full min-w-[3px] rounded-sm', TONE[block.origin])}
                style={{ width: `${(block.tokens / widest) * 100}%` }}
              />
            </span>
          </div>
        ))}
      </div>

      <figcaption
        id="session-makeup-share"
        data-component="SessionMakeup"
        className="text-muted-foreground font-mono text-xs"
      >
        {t('session-makeup.share', {
          typed: number.format(typed),
          total: number.format(total),
          percent: ((typed / total) * 100).toFixed(1),
        })}
      </figcaption>
    </figure>
  )
}
