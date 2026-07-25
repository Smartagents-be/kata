import { useEffect, useRef, useState } from 'react'
import { useTranslation } from 'react-i18next'
import { Button } from '@/shared/components/ui/button'
import { cn } from '@/shared/lib/utils'

/**
 * Two sessions clicked through side by side, drawn as everything that went over the wire.
 *
 * Your prompt goes out on its own: at that moment it is one line, nothing more. The answer comes
 * back. Type a second prompt and it cannot go alone, because the model kept nothing: the first
 * exchange goes with it, whole, as `R1`. So the left column reads `P1`, `A1`, `P2`, then `R1 + A2`,
 * then `P3`, then `R2 + A3`, and `P1` is on screen three times by the end. The right column asked
 * all three things in one prompt, so it sends one thing and nothing is ever sent twice.
 *
 * It sits next to the bundling paragraph in the `prompt` unit, so it lives in `inlineFigures` and
 * the geometry stays here in the step rather than in the unit HTML.
 */

type Role = 'you' | 'agent' | 'think'

/** One message, named `P1`, `A1`, … so a copy of it is recognisable as the same thing. */
type Message = {
  name: string
  role: Role
  /** Message key in the step1 namespace. */
  key: string
  /** Its size, in the same unit on both sides, and the height it is drawn at. */
  weight: number
}

/**
 * What shows up in a frame: a single message, or a bundle of earlier ones going over the wire again
 * because a new prompt could not be sent without them.
 */
type Item =
  | { kind: 'message'; message: Message }
  | { kind: 'bundle'; name: string; items: Item[] }

/** One thing that appeared, and the click it appeared on. Nothing ever moves afterwards. */
type Entry = {
  id: string
  step: number
  item: Item
  /**
   * The entry this one actually travelled in front of. A copy shows up under the prompt that dragged
   * it along, because that is when you see it, but in the request it goes first. An arrow says so.
   */
  ahead?: string
}

/** One measured arrow: from the top of a late copy, up to the top of the prompt it went in front of. */
type Arrow = { id: string; from: number; to: number }

function sameArrows(a: Arrow[], b: Arrow[]) {
  return (
    a.length === b.length &&
    a.every((one, index) => {
      const other = b[index]
      return one.id === other.id && one.from === other.from && one.to === other.to
    })
  )
}

const message = (message: Message): Item => ({ kind: 'message', message })
const bundle = (name: string, items: Item[]): Item => ({ kind: 'bundle', name, items })

const P1: Message = { name: 'P1', role: 'you', key: 'bundle-compare.drip.1', weight: 44 }
const A1: Message = { name: 'A1', role: 'agent', key: 'bundle-compare.drip.2', weight: 62 }
const P2: Message = { name: 'P2', role: 'you', key: 'bundle-compare.drip.3', weight: 44 }
const A2: Message = { name: 'A2', role: 'agent', key: 'bundle-compare.drip.4', weight: 78 }
const P3: Message = { name: 'P3', role: 'you', key: 'bundle-compare.drip.5', weight: 44 }
const A3: Message = { name: 'A3', role: 'agent', key: 'bundle-compare.drip.6', weight: 86 }

/** The first exchange, which is what prompt two has to drag along. */
const R1 = bundle('R1', [message(P1), message(A1)])

/** And by prompt three it is that plus the second exchange, so the copy carries a copy. */
const R2 = bundle('R2', [R1, message(P2), message(A2)])

/**
 * Three follow-ups. The prompts arrive alone; the bundles arrive with the answer that came back for
 * them, because that is the moment you find out what the turn cost.
 */
const DRIP: Entry[] = [
  { id: 'p1', step: 1, item: message(P1) },
  { id: 'a1', step: 2, item: message(A1) },
  { id: 'p2', step: 3, item: message(P2) },
  { id: 'r1', step: 4, item: R1, ahead: 'p2' },
  { id: 'a2', step: 4, item: message(A2) },
  { id: 'p3', step: 5, item: message(P3) },
  { id: 'r2', step: 6, item: R2, ahead: 'p3' },
  { id: 'a3', step: 6, item: message(A3) },
]

const B1: Message = { name: 'P1', role: 'you', key: 'bundle-compare.bundle.1', weight: 58 }
const BT: Message = { name: 'T1', role: 'think', key: 'bundle-compare.bundle.2', weight: 50 }
const BA: Message = { name: 'A1', role: 'agent', key: 'bundle-compare.bundle.3', weight: 100 }

/** One prompt carrying all three asks, one turn answering it, and nothing sent twice. */
const BUNDLE: Entry[] = [
  { id: 'b1', step: 1, item: message(B1) },
  { id: 'bt', step: 2, item: message(BT) },
  { id: 'ba', step: 3, item: message(BA) },
]

const STEPS = 6

/** How long what just crossed the wire stays lit, in ms. */
const FLASH = 1100

/** Everything in an item, copies included, because a copy is paid for like anything else. */
function sizeOf(item: Item): number {
  return item.kind === 'message'
    ? item.message.weight
    : item.items.reduce((sum, inner) => sum + sizeOf(inner), 0)
}

function countOf(item: Item): number {
  return item.kind === 'message' ? 1 : item.items.reduce((sum, inner) => sum + countOf(inner), 0)
}

/** Everything a session ends up putting on the wire, which is what its own bar reads against. */
const totalOf = (entries: Entry[]) => entries.reduce((sum, entry) => sum + sizeOf(entry.item), 0)

/** Each block's tone: your prompts teal, the agent's work a plain panel, its thinking dashed. */
const TONE: Record<Role, string> = {
  you: 'border-primary/60 bg-primary/15',
  agent: 'border-border bg-muted/50',
  think: 'border-primary/40 border-dashed bg-primary/5',
}

export function BundleCompare() {
  const { t } = useTranslation('step1')
  const [current, setCurrent] = useState(1)

  // What appeared on this click is lit for a moment: that is what just crossed the wire.
  const [flash, setFlash] = useState(true)

  useEffect(() => {
    setFlash(true)
    const done = setTimeout(() => setFlash(false), FLASH)
    return () => clearTimeout(done)
  }, [current])

  // The right side gets one line, on the click where it does the extra thinking. The left side needs
  // none: the copies and the arrows are the whole point, and they say it themselves.
  const bundleNote = current === 2 ? t('bundle-compare.thinking') : ''

  return (
    <figure id="bundle-compare" data-component="BundleCompare" className="my-8 flex flex-col gap-4">
      <div
        id="bundle-compare-sides"
        data-component="BundleCompare"
        className="grid gap-4 sm:grid-cols-2 sm:grid-rows-[auto_1fr_auto]"
      >
        <Side
          slug="drip"
          entries={DRIP}
          current={current}
          flash={flash}
          label={t('bundle-compare.drip.label')}
          note=""
        />
        <Side
          slug="bundle"
          entries={BUNDLE}
          current={current}
          flash={flash}
          label={t('bundle-compare.bundle.label')}
          note={bundleNote}
        />
      </div>

      <div
        id="bundle-compare-controls"
        data-component="BundleCompare"
        className="flex items-center gap-3"
      >
        <Button
          id="bundle-compare-next"
          data-component="BundleCompare"
          type="button"
          size="sm"
          disabled={current >= STEPS}
          onClick={() => setCurrent((step) => Math.min(STEPS, step + 1))}
        >
          {t('bundle-compare.next')}
        </Button>
        <Button
          id="bundle-compare-back"
          data-component="BundleCompare"
          type="button"
          size="sm"
          variant="outline"
          disabled={current <= 1}
          onClick={() => setCurrent((step) => Math.max(1, step - 1))}
        >
          {t('bundle-compare.back')}
        </Button>
        <Button
          id="bundle-compare-restart"
          data-component="BundleCompare"
          type="button"
          size="sm"
          variant="ghost"
          disabled={current <= 1}
          onClick={() => setCurrent(1)}
        >
          {t('bundle-compare.restart')}
        </Button>
        <span
          id="bundle-compare-step"
          data-component="BundleCompare"
          aria-live="polite"
          className="text-muted-foreground ml-auto font-mono text-xs"
        >
          {t('bundle-compare.step', { current, total: STEPS })}
        </span>
      </div>

      <figcaption
        id="bundle-compare-hint"
        data-component="BundleCompare"
        className="text-muted-foreground font-mono text-xs"
      >
        {t('bundle-compare.hint')}
      </figcaption>
    </figure>
  )
}

type SideProps = {
  /** `drip` or `bundle`; the second half of every id in this column. */
  slug: string
  entries: Entry[]
  current: number
  /** True while what this click revealed is still lit. */
  flash: boolean
  label: string
  note: string
}

/**
 * One session: a scrolling frame holding everything on the wire so far, a bar reading how far it has
 * got through its own session (full once that session is done), and the tally, which is where the
 * two sessions compare. Both columns share their row heights through a subgrid, so the frames are
 * the same size and only one of them fills up.
 */
function Side({ slug, entries, current, flash, label, note }: SideProps) {
  const { t } = useTranslation('step1')
  const view = useRef<HTMLDivElement>(null)
  const stack = useRef<HTMLDivElement>(null)
  const rows = useRef<Record<string, HTMLDivElement | null>>({})
  const [arrows, setArrows] = useState<Arrow[]>([])

  const here = entries.filter((entry) => entry.step <= current)
  const sent = here.reduce((sum, entry) => sum + sizeOf(entry.item), 0)
  const messages = here.reduce((count, entry) => count + countOf(entry.item), 0)
  const requests = here.filter(
    (entry) => entry.item.kind === 'message' && entry.item.message.role === 'you',
  ).length

  // The newest thing is at the bottom, so follow it down. Twice: once now, once after the block has
  // finished growing into place, because the height it is scrolling to is still animating.
  useEffect(() => {
    const follow = () =>
      view.current?.scrollTo({ top: view.current.scrollHeight, behavior: 'smooth' })
    const soon = setTimeout(follow, 80)
    const after = setTimeout(follow, 620)
    return () => {
      clearTimeout(soon)
      clearTimeout(after)
    }
  }, [current])

  // Where each arrow runs, in the stack's own pixels: from the copy that showed up late, to the top
  // edge of the prompt it actually travelled in front of. Measured rather than guessed, because both
  // ends move with the text, and re-measured while the new block is still growing.
  useEffect(() => {
    const measure = () => {
      const next = entries.flatMap((entry) => {
        if (!entry.ahead || entry.step > current) {
          return []
        }
        const copy = rows.current[entry.id]
        const ahead = rows.current[entry.ahead]
        return copy && ahead ? [{ id: entry.id, from: copy.offsetTop, to: ahead.offsetTop }] : []
      })
      setArrows((shown) => (sameArrows(shown, next) ? shown : next))
    }

    measure()
    const settled = setTimeout(measure, 620)
    const observer = new ResizeObserver(measure)
    if (stack.current) {
      observer.observe(stack.current)
    }
    return () => {
      clearTimeout(settled)
      observer.disconnect()
    }
  }, [current, entries])

  return (
    // Three rows shared with the other column (label, frame, footer) through a subgrid, so the two
    // frames are the same height whatever the notes below them wrap to.
    <div
      id={`bundle-compare-${slug}`}
      data-component="Side"
      className="grid gap-2 sm:row-span-3 sm:grid-rows-subgrid"
    >
      <span
        id={`bundle-compare-${slug}-label`}
        data-component="Side"
        className="eyebrow text-primary"
      >
        {label}
      </span>

      <div
        id={`bundle-compare-${slug}-frame`}
        data-component="Side"
        ref={view}
        className="border-border bg-card h-[30rem] overflow-y-auto rounded-lg border p-3"
      >
        {/* The stack keeps a gutter on its left for the arrows, and is the box every offsetTop this
            component measures is relative to, so the arrow layer and the blocks share one origin. */}
        <div
          id={`bundle-compare-${slug}-stack`}
          data-component="Side"
          ref={stack}
          className="relative pl-8"
        >
          {arrows.length > 0 && (
            <svg
              id={`bundle-compare-${slug}-arrows`}
              data-component="Side"
              role="img"
              aria-label={t('bundle-compare.inserted')}
              className="stroke-primary fill-primary pointer-events-none absolute inset-y-0 left-0 w-8 overflow-visible"
            >
              {arrows.map((arrow) => {
                // Out of the copy, up the gutter, then back in at the gap above the prompt: the
                // arrow ends where the bundle actually sits in the request.
                const slot = arrow.to - 5
                return (
                  <g key={arrow.id} data-component="Side">
                    <path
                      d={
                        `M 26 ${arrow.from + 18} L 21 ${arrow.from + 18} ` +
                        `Q 15 ${arrow.from + 18} 15 ${arrow.from + 12} ` +
                        `L 15 ${slot + 6} Q 15 ${slot} 21 ${slot} L 23 ${slot}`
                      }
                      fill="none"
                      strokeWidth="1.5"
                      strokeLinecap="round"
                    />
                    <path d={`M 31 ${slot} l -8 -4 l 0 8 z`} stroke="none" />
                  </g>
                )
              })}
            </svg>
          )}

          {entries.map((entry, index) => {
            const shown = entry.step <= current
            const lit = flash && entry.step === current
            return (
              <div
                key={entry.id}
                id={`bundle-compare-${slug}-entry-${index}`}
                data-component="Side"
                data-state={shown ? (lit ? 'arriving' : 'shown') : 'pending'}
                aria-hidden={!shown}
                ref={(node) => {
                  rows.current[entry.id] = node
                }}
                className="grid transition-all duration-500 ease-out"
                style={{
                  gridTemplateRows: shown ? '1fr' : '0fr',
                  opacity: shown ? 1 : 0,
                  marginBottom: shown ? '0.5rem' : 0,
                }}
              >
                <div className="overflow-hidden">
                  <ItemView
                    item={entry.item}
                    lit={lit}
                    id={`bundle-compare-${slug}-entry-${index}-item`}
                  />
                </div>
              </div>
            )
          })}
        </div>
      </div>

      <div
        id={`bundle-compare-${slug}-footer`}
        data-component="Side"
        className="flex flex-col gap-2"
      >
        <div
          id={`bundle-compare-${slug}-meter`}
          data-component="Side"
          className="bg-primary/10 h-2 w-full overflow-hidden rounded-full"
          role="img"
          aria-label={t('bundle-compare.filled')}
        >
          <div
            className="bg-primary h-full rounded-full transition-all duration-500 ease-out"
            style={{ width: `${Math.min(100, (sent / totalOf(entries)) * 100)}%` }}
          />
        </div>

        <span
          id={`bundle-compare-${slug}-tally`}
          data-component="Side"
          className="text-muted-foreground font-mono text-xs"
        >
          {t('bundle-compare.tally', { requests, messages })}
        </span>

        <span
          id={`bundle-compare-${slug}-note`}
          data-component="Side"
          className="text-primary min-h-4 font-mono text-xs"
        >
          {note}
        </span>
      </div>
    </div>
  )
}

/**
 * A message, or a bundle drawn as a dashed box around the copies it carries. `R2` holds `R1` holds
 * `P1`, so the nesting is the duplication: the deeper a copy sits, the more times it has been sent.
 */
function ItemView({ item, lit, id }: { item: Item; lit: boolean; id: string }) {
  const { t } = useTranslation('step1')

  if (item.kind === 'message') {
    return (
      <div
        id={id}
        data-component="ItemView"
        className={cn(
          'flex flex-col gap-1 rounded-md border px-3 py-2 transition-all duration-300',
          TONE[item.message.role],
          lit && 'ring-primary/60 ring-2',
        )}
        style={{ minHeight: `${item.message.weight}px` }}
      >
        <span className="eyebrow text-muted-foreground flex items-baseline gap-2">
          {t(`bundle-compare.${item.message.role}`)}
          <span className="text-primary/70 normal-case">{item.message.name}</span>
        </span>
        <span
          className={cn(
            'text-sm leading-snug',
            item.message.role === 'you' ? 'text-foreground' : 'text-muted-foreground font-mono',
          )}
        >
          {t(item.message.key)}
        </span>
      </div>
    )
  }

  return (
    <div
      id={id}
      data-component="ItemView"
      data-state="copy"
      className={cn(
        'border-primary/30 flex flex-col gap-2 rounded-lg border border-dashed p-2 opacity-70 transition-all duration-300',
        lit && 'ring-primary/60 opacity-100 ring-2',
      )}
    >
      <span className="eyebrow text-muted-foreground flex flex-wrap items-baseline gap-1.5">
        <span className="text-primary/70">{item.name}</span>
        <span aria-hidden="true">·</span>
        {t('bundle-compare.again')}
        <span aria-hidden="true">·</span>
        <span className="normal-case">{item.items.map((inner) => nameOf(inner)).join(' + ')}</span>
      </span>
      {item.items.map((inner, index) => (
        <ItemView key={index} item={inner} lit={false} id={`${id}-${index}`} />
      ))}
    </div>
  )
}

function nameOf(item: Item) {
  return item.kind === 'message' ? item.message.name : item.name
}
