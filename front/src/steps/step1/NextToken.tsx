import { useEffect, useId, useRef, useState } from 'react'
import { useReducedMotion } from 'motion/react'
import { useTranslation } from 'react-i18next'
import { Button } from '@/shared/components/ui/button'
import { DURATION, EASE_QUIET } from '@/shared/motion/motion'
import { cn } from '@/shared/lib/utils'

/**
 * The loop. Five tokens go in, the model scores what could come next, one of them is appended, and
 * the whole thing goes back round. Three passes, and **the reader picks the token on every one of
 * them**, which is the argument: there was never a plan for the sentence, only a next token, three
 * times over, and each time it could have gone somewhere else.
 *
 * It took the favourite for you until it did not, and that is the decision. The unit's prose says
 * the scores are a distribution and the favourite is not a rule (`tokens.one-at-a-time.3`), and a
 * figure that only ever walked the top row was making that claim on the reader's behalf. Now the
 * claim is a thing they do: take `was` instead of `timed` and a different sentence comes out, built
 * by the same machine out of the same numbers.
 *
 * The sentence it writes **when you take the favourite three times** is the sentence
 * `TokenAttention` then takes apart, on purpose. The two are a pair the way `ToolsInContext` and
 * `McpServer` are: this one shows the sentence being written a token at a time, the next one shows
 * what each of those passes was reading. So the first child of every node is the favourite, and the
 * favourite chain is pinned to `timed` -> `out` -> `.`. Editing the head of `TREE`, or the head of
 * its first child, or the head of that one's first child, breaks the pair.
 *
 * **The fan is replaced on every pass rather than accumulated.** A tree that kept every road it had
 * ever drawn would be a picture of the reader's clicks, and the thing being drawn is one pass of the
 * model: everything it is weighing right now, out of one token. The road not taken is on screen for
 * exactly as long as it is a road, which is the honest window.
 *
 * The counter under the fan is the part that carries the cost claim, and it is why the input is
 * redrawn in full on every pass rather than only the new chip: what the model reads on pass three is
 * not the token it just wrote, it is all seven again.
 *
 * **The likelihood line is the second thing this figure now teaches.** Take the favourite at every
 * turn and the sentence you get was still only about a fifth likely, because three near-certainties
 * multiplied are not a certainty. That number is the product of the scores on screen and nothing
 * more, which the caption's admission already covers.
 *
 * **The probabilities are illustrative and the caption says so**, the same rule `TokenAttention`
 * follows for its weights. A real distribution runs over the entire vocabulary and is shaped by the
 * sampling settings on top of that. The shape is what is honest here: one clear favourite, a couple
 * of plausible runners-up, and a long tail that is not worth drawing. Nothing in a fan adds to 100
 * for that reason, which is the line between this figure and `PickTheNext` at the foot of the unit.
 *
 * The likelihood a candidate carries is drawn as ink as well as printed: each one gets a bar, as long
 * a share of the column as its score is of the strongest score in the fan. The colour stays a token
 * and only the length varies, so there is no arbitrary `fill-primary/[0.37]` for the design system to
 * have an opinion about. No candidate is marked as the winner, which is deliberate: the fan is a
 * distribution, and the favourite is simply the longest bar in it.
 */

/** Machine-shaped, so English in every language, like `TokenAttention`'s sentence. */
const PROMPT = ['the', 'build', 'failed', 'because', 'it']

/** How many tokens the reader gets to take before the sentence is called finished. */
const PASSES = 3

type Branch = {
  token: string
  p: number
  /**
   * What the model would weigh next if this token were taken. Absent only at the last pass, where
   * nothing is drawn from it anyway.
   *
   * **The first entry is the favourite**, in every list at every depth, so a reader who only ever
   * takes the top one walks `timed` -> `out` -> `.` and lands on the sentence `TokenAttention`
   * takes apart. That is the pair, and it is easy to break by reordering one list.
   */
  next?: Branch[]
}

/** Everything that could follow `the build failed because it`, three passes deep. */
const TREE: Branch[] = [
  {
    token: 'timed',
    p: 0.34,
    next: [
      {
        token: 'out',
        p: 0.89,
        next: [
          { token: '.', p: 0.62 },
          { token: 'after', p: 0.12 },
          { token: 'on', p: 0.08 },
          { token: 'waiting', p: 0.06 },
        ],
      },
      {
        token: 'itself',
        p: 0.04,
        next: [
          { token: 'out', p: 0.44 },
          { token: 'off', p: 0.13 },
          { token: 'down', p: 0.07 },
        ],
      },
      {
        token: 'again',
        p: 0.02,
        next: [
          { token: 'after', p: 0.29 },
          { token: 'and', p: 0.14 },
          { token: 'on', p: 0.08 },
        ],
      },
    ],
  },
  {
    token: 'was',
    p: 0.22,
    next: [
      {
        token: 'not',
        p: 0.31,
        next: [
          { token: 'ready', p: 0.24 },
          { token: 'cached', p: 0.15 },
          { token: 'found', p: 0.11 },
        ],
      },
      {
        token: 'still',
        p: 0.18,
        next: [
          { token: 'running', p: 0.41 },
          { token: 'building', p: 0.17 },
          { token: 'waiting', p: 0.12 },
        ],
      },
      {
        token: 'missing',
        p: 0.12,
        next: [
          { token: 'a', p: 0.35 },
          { token: 'the', p: 0.22 },
          { token: 'one', p: 0.08 },
        ],
      },
      {
        token: 'already',
        p: 0.09,
        next: [
          { token: 'running', p: 0.33 },
          { token: 'gone', p: 0.14 },
          { token: 'stale', p: 0.09 },
        ],
      },
    ],
  },
  {
    token: 'ran',
    p: 0.14,
    next: [
      {
        token: 'out',
        p: 0.57,
        next: [
          { token: 'of', p: 0.81 },
          { token: '.', p: 0.06 },
          { token: 'again', p: 0.03 },
        ],
      },
      {
        token: 'too',
        p: 0.16,
        next: [
          { token: 'long', p: 0.47 },
          { token: 'many', p: 0.19 },
          { token: 'late', p: 0.1 },
        ],
      },
      {
        token: 'into',
        p: 0.11,
        next: [
          { token: 'a', p: 0.38 },
          { token: 'the', p: 0.21 },
          { token: 'an', p: 0.12 },
        ],
      },
    ],
  },
  {
    token: 'could',
    p: 0.09,
    next: [
      {
        token: 'not',
        p: 0.72,
        next: [
          { token: 'find', p: 0.26 },
          { token: 'reach', p: 0.18 },
          { token: 'resolve', p: 0.13 },
        ],
      },
      {
        token: 'never',
        p: 0.11,
        next: [
          { token: 'finish', p: 0.31 },
          { token: 'reach', p: 0.16 },
          { token: 'resolve', p: 0.09 },
        ],
      },
      {
        token: 'only',
        p: 0.05,
        next: [
          { token: 'see', p: 0.22 },
          { token: 'reach', p: 0.14 },
          { token: 'run', p: 0.11 },
        ],
      },
    ],
  },
  {
    token: 'never',
    p: 0.07,
    next: [
      {
        token: 'finished',
        p: 0.38,
        next: [
          { token: '.', p: 0.48 },
          { token: 'the', p: 0.16 },
          { token: 'at', p: 0.07 },
        ],
      },
      {
        token: 'started',
        p: 0.21,
        next: [
          { token: '.', p: 0.44 },
          { token: 'at', p: 0.15 },
          { token: 'because', p: 0.06 },
        ],
      },
      {
        token: 'ran',
        p: 0.09,
        next: [
          { token: 'at', p: 0.52 },
          { token: '.', p: 0.13 },
          { token: 'the', p: 0.06 },
        ],
      },
    ],
  },
]

const ROW_HEIGHT = 30
const FONT = 13

/**
 * The drawing is a column of bars, and nothing in it is a line from one thing to another.
 *
 * It was a bouquet of beziers first, one curve per candidate running from the root token to its own
 * word, and then a spine with a set of parallel arms hanging off it. Both drew the same relationship
 * the same way, a rule reaching across the drawing to touch a word, and a leader line to a label is
 * exactly what a table of contents does: it says *these two belong together* and nothing else. That
 * is not worth a line here, because the row already says it by being a row. So the connectors are
 * gone and the root has moved out of their way, into its own column on the left, which is also the
 * slot a taken candidate now flies to.
 *
 * **It sits on the first candidate's line rather than above the fan**, which is what pays for the
 * connector being gone: `after it` and the favourite read as one line, and the rest of the fan is
 * indented under that first word. A root parked on a header line of its own was a second row of
 * furniture doing the job the leader lines used to do badly. That in turn is why **the fan is
 * top-aligned rather than centred**: the root has to keep one fixed y or it moves under the pointer
 * between passes, and a fan of three then leaves its slack at the foot of the drawing. The drawing
 * is still sized once to the widest fan, so nothing resizes either way.
 *
 * What the arms were carrying is carried by length instead of by weight of stroke. A bar is easier
 * to compare against the bar under it than a thick line is against a thin one, and it leaves the
 * score and the word two columns with hard left edges.
 *
 * **The word comes first and the bar last**, which is the reverse of the order the arms imposed, and
 * it is what keeps the connector gone rather than merely undrawn. A bar is the one thing on the row
 * whose right-hand end moves, so anything placed after it is a fixed column with a channel opening
 * in front of it wherever the score is small: three hundred units of white between a short bar and
 * its number is precisely the gap a leader line is invented to close. With the variable-length thing
 * on the outside every row is dense from the left edge and nothing has to be tracked across. It also
 * reads in the order the figure's own label promises: what could come next, how likely it is, and
 * then that likelihood drawn.
 */
/** The root column: the label right-aligned against the token, both on the first candidate's line. */
const HEAD_LABEL_RIGHT = 44
const HEAD_TOKEN_X = 52
/** Padding above the first row, which is also what is left under the last one. */
const TOP = 12
/** The word column, wide of the longest token the root slot can hold. */
const WORD_X = 150
/** Right edge of the score column. Right-aligned, so the ones digits line up down the fan. */
const SCORE_RIGHT = 258
/** The bar column. */
const BAR_X = 280
const BAR_MAX = 330
const BAR_HEIGHT = 12
/**
 * A row's hover and focus box, fixed rather than fitted, so the highlight does not jag row to row.
 * It spans the whole row including the bar, because the whole row is the control; backing only the
 * two text columns lit a box away from wherever the pointer actually was.
 */
const ROW_LEFT = 138
const ROW_RIGHT = 622

/**
 * The tallest fan anywhere in the tree, worked out once. The drawing is sized to it, so a pass with
 * four candidates does not resize the figure under the pointer that is about to click it.
 */
const WIDEST = (function widest(branches: Branch[]): number {
  return branches.reduce(
    (most, branch) => Math.max(most, branch.next ? widest(branch.next) : 0),
    branches.length,
  )
})(TREE)

const HEIGHT = TOP * 2 + WIDEST * ROW_HEIGHT

/** Centre of a row. Top-aligned, so row zero and the root beside it never move. */
function rowY(index: number): number {
  return TOP + index * ROW_HEIGHT + ROW_HEIGHT / 2
}

/** The root's line, which is row zero's. */
const HEAD_Y = rowY(0)

const EASE = `cubic-bezier(${EASE_QUIET.join(', ')})`

/**
 * Whole percent, with a floor. Three scores multiplied get small fast, and a road the reader just
 * walked printed as `0%` says the thing on screen never happened.
 */
function percent(p: number): string {
  const whole = Math.round(p * 100)
  return whole === 0 && p > 0 ? '<1%' : `${whole}%`
}

export function NextToken() {
  const { t } = useTranslation('step1')
  const titleId = useId()
  const still = useReducedMotion()

  /** Which candidate was taken on each pass so far, by index into that pass's fan. */
  const [path, setPath] = useState<number[]>([])
  /** The candidate on its way to the root slot, while the fan it came from clears. */
  const [leaving, setLeaving] = useState<number | null>(null)
  /** True for one frame after a commit, so the new fan has something to transition out of. */
  const [entering, setEntering] = useState(false)
  const [focused, setFocused] = useState<number | null>(null)
  const timer = useRef<number | null>(null)
  /**
   * Set when the take came from the keyboard. Committing unmounts the group that was focused, which
   * would drop focus to the body and leave a keyboard reader with nowhere in the figure to be, so
   * the next fan takes it instead.
   */
  const restore = useRef(false)

  useEffect(() => {
    return () => {
      if (timer.current !== null) {
        clearTimeout(timer.current)
      }
    }
  }, [])

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

  useEffect(() => {
    if (!restore.current) {
      return
    }
    restore.current = false
    const next =
      document.querySelector<SVGGElement>('#next-token-fan-node-0') ??
      document.querySelector<HTMLButtonElement>('#next-token-restart')
    next?.focus()
  }, [path])

  /** The branches taken so far, and the fan hanging off the last of them. */
  const taken: Branch[] = []
  let fan: Branch[] = TREE
  for (const index of path) {
    const branch = fan[index]
    taken.push(branch)
    fan = branch.next ?? []
  }

  const written = taken.map((branch) => branch.token)
  const sofar = [...PROMPT, ...written]
  const done = path.length === PASSES
  const head = sofar[sofar.length - 1]
  const strongest = Math.max(...fan.map((branch) => branch.p), 0.0001)

  /** The product of what was taken, which is what the whole sentence was worth before it existed. */
  const likelihood = taken.reduce((product, branch) => product * branch.p, 1)

  const ms = (seconds: number) => (still ? 0 : seconds * 1000)

  const commit = (index: number) => {
    setPath((walked) => [...walked, index])
    setLeaving(null)
    setEntering(true)
    setFocused(null)
  }

  const take = (index: number, byKey = false) => {
    if (done || leaving !== null) {
      return
    }
    restore.current = byKey
    // Dropped before anything moves. The ring is drawn around the row rather than around the word,
    // so a ring left on the candidate that is travelling to the root slot flies there with it.
    setFocused(null)
    if (still) {
      commit(index)
      return
    }
    setLeaving(index)
    timer.current = window.setTimeout(() => {
      timer.current = null
      commit(index)
    }, ms(DURATION.state))
  }

  const restart = () => {
    if (timer.current !== null) {
      clearTimeout(timer.current)
      timer.current = null
    }
    setPath([])
    setLeaving(null)
    setFocused(null)
    setEntering(true)
  }

  return (
    <figure id="next-token" data-component="NextToken" className="my-8 flex flex-col gap-3">
      <span id="next-token-label" data-component="NextToken" className="eyebrow text-primary">
        {t('next-token.label')}
      </span>

      <div
        id="next-token-panel"
        data-component="NextToken"
        className="border-border bg-card flex flex-col gap-4 rounded-lg border p-4"
      >
        {/* Redrawn in full every pass, never just the new chip. What goes back in is all of it. */}
        <div
          id="next-token-input"
          data-component="NextToken"
          role="img"
          aria-label={t('next-token.description', { text: sofar.join(' ') })}
          className="flex flex-wrap items-center gap-1"
        >
          {sofar.map((token, index) => {
            const fresh = index === sofar.length - 1 && index >= PROMPT.length && entering
            return (
              <span
                key={`${token}-${index}`}
                id={`next-token-input-${index}`}
                data-component="NextToken"
                data-state={index < PROMPT.length ? 'given' : 'written'}
                className={cn(
                  'rounded border px-1.5 py-0.5 font-mono text-sm',
                  index < PROMPT.length
                    ? 'border-border bg-muted text-muted-foreground'
                    : 'border-primary/40 bg-primary/15 text-foreground',
                )}
                style={{
                  opacity: fresh ? 0 : 1,
                  transform: fresh ? 'scale(0.85)' : 'scale(1)',
                  transition: `opacity ${ms(DURATION.state)}ms ${EASE}, transform ${ms(DURATION.state)}ms ${EASE}`,
                }}
              >
                {token}
              </span>
            )
          })}
          {!done ? (
            <span
              id="next-token-input-pending"
              data-component="NextToken"
              className="border-primary/40 text-primary/60 rounded border border-dashed px-1.5 py-0.5 font-mono text-sm"
            >
              ?
            </span>
          ) : null}
        </div>

        {/*
          One pass of the model: the token it is reading from, and everything it is weighing against
          it. Taking one clears the fan and grows the next, so the road not taken is on screen for
          exactly as long as it is a road.
        */}
        {!done ? (
          <div id="next-token-fan" data-component="NextToken" className="border-border border-t pt-3">
            {/*
              role="group" rather than role="img", the same call `TokenAttention` makes: the
              candidates below are real controls, and an img role would take them away from a screen
              reader along with the rest of the subtree.
            */}
            <svg
              id="next-token-fan-svg"
              data-component="NextToken"
              viewBox={`0 0 640 ${HEIGHT}`}
              role="group"
              aria-labelledby={titleId}
              className="h-auto w-full"
            >
              <title id={titleId} data-component="NextToken">
                {t('next-token.branches.description')}
              </title>

              {/*
                The token the fan hangs off, in its own column on the favourite's line rather than
                wired to the rows. It fades as a candidate flies onto the same spot, and faster than
                that candidate travels, so the two never sit on top of each other at full strength.
                On the frame after the commit it is simply the token that arrived. The label beside it
                stays put, since it names the slot rather than what is in it.
              */}
              <text
                id="next-token-fan-after"
                data-component="NextToken"
                x={HEAD_LABEL_RIGHT}
                y={HEAD_Y}
                fontSize="11"
                textAnchor="end"
                dominantBaseline="middle"
                className="fill-muted-foreground"
              >
                {t('next-token.after')}
              </text>
              <text
                id="next-token-fan-root"
                data-component="NextToken"
                x={HEAD_TOKEN_X}
                y={HEAD_Y}
                fontSize={FONT}
                textAnchor="start"
                dominantBaseline="middle"
                className="fill-foreground font-mono"
                style={{
                  opacity: leaving === null ? 1 : 0,
                  transition: `opacity ${ms(DURATION.tap)}ms ${EASE}`,
                }}
              >
                {head}
              </text>

              {fan.map((branch, index) => {
                const gone = leaving !== null && leaving !== index
                const flying = leaving === index
                const score = percent(branch.p)
                const intensity = branch.p / strongest
                return (
                  <g
                    key={`node-${branch.token}-${index}`}
                    id={`next-token-fan-node-${index}`}
                    data-component="NextToken"
                    data-state={flying ? 'taken' : index === 0 ? 'favourite' : 'idle'}
                    role="button"
                    tabIndex={0}
                    aria-label={t('next-token.candidate', { token: branch.token, score })}
                    onClick={() => {
                      take(index)
                    }}
                    onKeyDown={(event) => {
                      if (event.key === 'Enter' || event.key === ' ') {
                        event.preventDefault()
                        take(index, true)
                      }
                    }}
                    onFocus={() => {
                      setFocused(index)
                    }}
                    onBlur={() => {
                      setFocused(null)
                    }}
                    className={cn(
                      'group outline-none',
                      // Nothing in the fan is aimable while one of them is on its way out, so the
                      // hover backing cannot light up on a row that is about to be replaced.
                      leaving === null ? 'cursor-pointer' : 'pointer-events-none',
                    )}
                    style={{
                      // The taken candidate lands on the header's token slot, so the text that
                      // replaces it on the next frame is already in the right place and nothing
                      // jumps. Both are left-anchored, so this is one subtraction and no measuring.
                      transform: flying
                        ? `translate(${HEAD_TOKEN_X - WORD_X}px, ${HEAD_Y}px)`
                        : `translate(0px, ${rowY(index)}px)`,
                      opacity: entering || gone ? 0 : 1,
                      transition:
                        `transform ${ms(DURATION.state)}ms ${EASE}, ` +
                        `opacity ${ms(entering ? DURATION.panel : DURATION.state)}ms ${EASE} ${
                          entering ? index * 35 : 0
                        }ms`,
                    }}
                  >
                    <rect
                      id={`next-token-fan-node-${index}-hit`}
                      data-component="NextToken"
                      x={ROW_LEFT}
                      y={-ROW_HEIGHT / 2 + 2}
                      width={ROW_RIGHT - ROW_LEFT}
                      height={ROW_HEIGHT - 4}
                      rx="6"
                      className="fill-muted opacity-0 transition-opacity group-hover:opacity-100"
                    />
                    {/*
                      The score drawn. Length is the only thing that varies between the bars, so a
                      reader compares two of them the way they would compare two words in a list,
                      by running an eye down one edge. It grows from nothing on the way in, over a
                      panel's worth of time and staggered like the rows themselves; on the way out
                      it fades with the row rather than shrinking back, since the fan leaves as one
                      thing. Floored at two units, or the tail of a fan draws as no bar at all.
                    */}
                    <rect
                      id={`next-token-fan-node-${index}-bar`}
                      data-component="NextToken"
                      x={BAR_X}
                      y={-BAR_HEIGHT / 2}
                      height={BAR_HEIGHT}
                      rx="2"
                      className="fill-primary pointer-events-none"
                      style={{
                        width: entering ? 0 : Math.max(2, intensity * BAR_MAX),
                        opacity: flying ? 0 : 1,
                        transition:
                          `width ${ms(entering ? DURATION.panel : DURATION.state)}ms ${EASE} ${
                            entering ? index * 35 : 0
                          }ms, ` + `opacity ${ms(DURATION.tap)}ms ${EASE}`,
                      }}
                    />
                    {/* An SVG group takes no box shadow, so a keyboard user gets a drawn ring or none. */}
                    {focused === index ? (
                      <rect
                        id={`next-token-fan-node-${index}-focus`}
                        data-component="NextToken"
                        x={ROW_LEFT - 3}
                        y={-ROW_HEIGHT / 2 - 1}
                        width={ROW_RIGHT - ROW_LEFT + 6}
                        height={ROW_HEIGHT + 2}
                        rx="9"
                        fill="none"
                        strokeWidth="3"
                        className="stroke-ring"
                      />
                    ) : null}
                    {/* Word then score, which is the order they sit in and the order
                        `next-token.candidate` reads them out in, so the DOM a screen reader walks
                        is the row. */}
                    <text
                      id={`next-token-fan-node-${index}-token`}
                      data-component="NextToken"
                      x={WORD_X}
                      y={0}
                      fontSize={FONT}
                      textAnchor="start"
                      dominantBaseline="middle"
                      className="fill-foreground pointer-events-none font-mono"
                    >
                      {branch.token}
                    </text>
                    <text
                      id={`next-token-fan-node-${index}-score`}
                      data-component="NextToken"
                      x={SCORE_RIGHT}
                      y={0}
                      fontSize="11"
                      textAnchor="end"
                      dominantBaseline="middle"
                      className="fill-muted-foreground pointer-events-none font-mono"
                      style={{
                        opacity: flying ? 0 : 1,
                        transition: `opacity ${ms(DURATION.tap)}ms ${EASE}`,
                      }}
                    >
                      {score}
                    </text>
                  </g>
                )
              })}
            </svg>
          </div>
        ) : (
          /*
            What three choices were worth, multiplied out. Machine-shaped throughout, so the tokens,
            the signs and the numbers are all inline: the line is arithmetic rather than a sentence.
          */
          <div
            id="next-token-recap"
            data-component="NextToken"
            className="border-border flex flex-wrap items-center gap-x-2 gap-y-1 border-t pt-3 font-mono text-sm"
          >
            {taken.map((branch, index) => (
              <span
                key={`recap-${branch.token}-${index}`}
                id={`next-token-recap-${index}`}
                data-component="NextToken"
                className="text-muted-foreground"
              >
                {index > 0 ? <span aria-hidden="true">{'× '}</span> : null}
                <span className="text-foreground">{branch.token}</span> {percent(branch.p)}
              </span>
            ))}
            <span
              id="next-token-recap-total"
              data-component="NextToken"
              className="text-primary tabular-nums"
            >
              = {percent(likelihood)}
            </span>
          </div>
        )}

        <div
          id="next-token-controls"
          data-component="NextToken"
          className="flex flex-wrap items-center gap-3"
        >
          {/* Still here so a presenter can walk the paired sentence out in three clicks, and so a
              reader who does not want to choose is not stuck. */}
          <Button
            id="next-token-favourite"
            data-component="NextToken"
            type="button"
            size="sm"
            disabled={done}
            onClick={() => {
              take(0)
            }}
          >
            {t('next-token.favourite')}
          </Button>
          <Button
            id="next-token-restart"
            data-component="NextToken"
            type="button"
            size="sm"
            variant="outline"
            disabled={path.length === 0}
            onClick={restart}
          >
            {t('next-token.restart')}
          </Button>

          {/*
            The cost line. It counts what went in on this pass, not what came out of it, so it has
            nothing to say once there is no pass left: the recap and the likelihood line under it
            are what close the run, and a third line restating that it is over was one too many.
          */}
          <p
            id="next-token-status"
            data-component="NextToken"
            role="status"
            className="text-muted-foreground text-xs"
          >
            {done ? '' : t('next-token.pass', { pass: path.length + 1, read: sofar.length })}
          </p>
        </div>

        {/* Held at a fixed height so the panel does not jump on the first pick. */}
        <p
          id="next-token-likelihood"
          data-component="NextToken"
          className="text-muted-foreground min-h-4 text-xs"
        >
          {path.length === 0
            ? ''
            : t(done ? 'next-token.likelihood-done' : 'next-token.likelihood', {
                likelihood: percent(likelihood),
              })}
        </p>
      </div>

      <figcaption
        id="next-token-caption"
        data-component="NextToken"
        className="text-muted-foreground text-xs"
      >
        {t('next-token.caption')}
      </figcaption>
    </figure>
  )
}
