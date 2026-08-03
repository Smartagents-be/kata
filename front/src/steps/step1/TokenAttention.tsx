import { useId, useState } from 'react'
import { useTranslation } from 'react-i18next'
import { cn } from '@/shared/lib/utils'

/**
 * How the model reads what you hand it. Seven tokens along the bottom, and an arc for every pair:
 * the figure opens with all twenty-one drawn at once, because that mass is the argument. Nothing in
 * here is looked up. Every token is weighed against the ones before it, so the whole thing is read
 * rather than searched.
 *
 * It argues one thing and stops, the way `ToolsInContext` does. The growth number (double the tokens
 * and the pairs more than quadruple) is prose, not a control on the figure, because a second beat
 * here would bury the first one.
 *
 * **The numbers only appear once a token is held.** The opening state is the mass of arcs and
 * nothing else, because a grid of twenty-one figures is a table rather than a picture. Holding one
 * token puts its own shares under every token behind it, so "which of these did it lean on" is read
 * off the page instead of guessed from how thick a curve looks, and the box behind the heavier
 * number is filled harder for the same reason. All three encodings are the same number: the arc,
 * the fill and the printed share never disagree.
 *
 * **A held row adds to 100, and that is the second thing this figure now teaches.** The weighing is
 * shared out rather than handed out, so a token cannot lean hard on everything behind it, and every
 * token it leans on more is another it leans on less. That is what makes the numbers worth printing
 * at all: seven arcs of varying thickness say "some more than others", and seven shares that add up
 * say what is actually going on.
 *
 * **Arcs run backwards only, and that is not a simplification.** A token in a decoder weighs itself
 * against what came before it and never against what comes after. Two things fall out of that, and
 * the unit uses both: the first token has nothing to look back at, and appending to the end of a
 * window leaves every earlier weighing untouched, which is the reason a cached prefix is still good.
 * `harness` owns caching and this figure does not re-argue it.
 *
 * **The weights are illustrative, and nothing on the page says so any more.** Real attention is spread
 * over many heads and many layers, and no single head reads as a clean "this word looks at that
 * word". The sentence was picked so the one link a student will look for is the one they expect (`it`
 * back to `build`), and what the figure is honest about is the shape rather than the numbers. It
 * carried a caption saying that and the caption was cut deliberately, so this comment is the only
 * remaining record: if a caption ever comes back here, that is what goes in it. Printing the shares
 * raises the stakes on that rather than settling it: what the rows are honest about is that they add
 * to a hundred, which every real attention row does, and not the twenty-one numbers making them up,
 * which are picked so one sentence reads the way a reader expects.
 *
 * Like `TokenSplit`, it draws no context frame: `ToolsInContext` in `tools` is the first teal frame
 * a student meets, and every figure above it stays out of that vocabulary.
 */

/** Machine-shaped, so it stays English in every language, like `SpotInjection`'s result bodies. */
const TOKENS = ['the', 'build', 'failed', 'because', 'it', 'timed', 'out']

/**
 * `WEIGHTS[i][j]` is the share of token `i`'s weighing that lands on token `j`, in whole percent,
 * and every row is one shorter than its index because a token only looks back. Row 0 is empty on
 * purpose: the first token has nothing behind it, which is worth a student noticing.
 *
 * **Every row adds to 100 and that is the shape of the real thing.** A row of attention is a softmax
 * over what came before, so a token spreads a fixed amount of weighing backwards rather than scoring
 * each earlier token on its own; there is no way for one to lean hard on everything. Whole percent
 * rather than a fraction is what keeps that checkable in the source and on the screen, so a row
 * edited to 99 or 104 is a bug rather than a rounding. What is left out of the hundred is the token
 * weighing *itself*, which a real row includes: this figure is about what a token looks back at, so
 * the share is a share of that.
 */
const WEIGHTS: number[][] = [
  [],
  [100],
  [12, 88],
  [10, 30, 60],
  [6, 55, 24, 15],
  [3, 29, 26, 11, 31],
  [2, 17, 14, 7, 19, 41],
]

const BOX_Y = 286
const BOX_HEIGHT = 30
const GAP = 8

/** Centre line of the printed weight, sitting under the boxes rather than inside them. */
const WEIGHT_Y = 328

/** Wide enough for the label at 14px mono, with the padding written into the constant. */
function widthOf(label: string): number {
  return 14 + label.length * 8.6
}

/** Left edge and centre of every box, laid out in one row and centred in the 640-wide viewBox. */
const LAYOUT = (() => {
  const widths = TOKENS.map(widthOf)
  const span = widths.reduce((sum, width) => sum + width, 0) + GAP * (TOKENS.length - 1)
  let x = (640 - span) / 2
  return widths.map((width) => {
    const box = { x, width, cx: x + width / 2 }
    x += width + GAP
    return box
  })
})()

/**
 * A quadratic bezier between two anchors, bulging upward. The control point is lifted by the span
 * rather than a constant, so a long reach draws a tall arc and a short one stays low: that is what
 * keeps twenty-one curves legible on top of each other instead of a solid teal block.
 */
function arc(from: number, to: number): string {
  const a = LAYOUT[from].cx
  const b = LAYOUT[to].cx
  const lift = Math.min(Math.abs(a - b) * 1.6, 450)
  return `M ${a} ${BOX_Y} Q ${(a + b) / 2} ${BOX_Y - lift} ${b} ${BOX_Y}`
}

export function TokenAttention() {
  const { t } = useTranslation('step1')
  const titleId = useId()
  const [selected, setSelected] = useState<number | null>(null)
  const [focused, setFocused] = useState<number | null>(null)

  /** Every pair when nothing is held, one token's own row when something is. */
  const links = TOKENS.flatMap((_, index) =>
    WEIGHTS[index].map((weight, target) => ({ index, target, weight })),
  ).filter((link) => selected === null || link.index === selected)

  const heaviest =
    selected === null || WEIGHTS[selected].length === 0
      ? null
      : WEIGHTS[selected].indexOf(Math.max(...WEIGHTS[selected]))

  /**
   * How hard a link is drawn, on 0 to 1, and it is **always measured against its own row's heaviest**
   * rather than against a hundred. Two reasons, and the second is the one that matters. A row's
   * shares get smaller as the row gets longer (the last token's largest share is 41), so drawing the
   * absolute number fades the end of the sentence out and would fade a held row out just as it
   * became the only thing on screen. And drawing the absolute number puts the two thickest arcs in
   * the figure at the very start, where a token with one thing to look at spends everything on it,
   * which reads as "the beginning matters most" and is not what this figure says. The printed share
   * carries the absolute truth; the ink says which of the ones behind it this token leans on.
   */
  const intensity = (weight: number, row: number): number =>
    weight / Math.max(...WEIGHTS[row], 1)

  return (
    <figure id="token-attention" data-component="TokenAttention" className="my-8 flex flex-col gap-3">
      <span
        id="token-attention-label"
        data-component="TokenAttention"
        className="eyebrow text-primary"
      >
        {t('token-attention.label')}
      </span>

      <div
        id="token-attention-panel"
        data-component="TokenAttention"
        className="border-border bg-card rounded-lg border p-2"
      >
        {/*
          role="group" rather than role="img": the token boxes below are real controls, and an img
          role would make the whole subtree presentational and take them away from a screen reader.
        */}
        <svg
          id="token-attention-svg"
          data-component="TokenAttention"
          // Cropped to the drawing rather than starting at 0. The tallest arc peaks at y=61 and the
          // printed weights end at 334, so anything outside this band is empty and would only push
          // the figure taller. The band is held whether or not a weight is on screen: a viewBox that
          // grew on the first click would resize the whole figure under the pointer.
          viewBox="0 45 640 292"
          role="group"
          aria-labelledby={titleId}
          className="h-auto w-full"
        >
          <title id={titleId} data-component="TokenAttention">
            {t('token-attention.description')}
          </title>

          {/*
            Held rows hide the rest rather than dimming them, which is where this parts company with
            ConnectBoard. Twenty-one arcs faded to a quarter still cross the four you are trying to
            read; five lines against nothing is the only version that answers "what does this token
            look at".
          */}
          <g id="token-attention-links" data-component="TokenAttention" fill="none">
            {links.map((link) => (
              <path
                key={`${link.index}-${link.target}`}
                id={`token-attention-link-${link.index}-${link.target}`}
                data-component="TokenAttention"
                d={arc(link.index, link.target)}
                strokeWidth={
                  selected === null
                    ? 1 + intensity(link.weight, link.index)
                    : 1 + intensity(link.weight, link.index) * 3
                }
                strokeOpacity={
                  selected === null
                    ? 0.06 + intensity(link.weight, link.index) * 0.18
                    : 0.2 + intensity(link.weight, link.index) * 0.7
                }
                strokeLinecap="round"
                className="stroke-primary"
              />
            ))}
          </g>

          {TOKENS.map((label, index) => {
            const box = LAYOUT[index]
            const isSelected = index === selected
            const isTarget = selected !== null && index < selected
            // What the held token weighs this one at, and null for every token that is not being
            // weighed right now: the selected token itself, everything after it, and the whole
            // opening state.
            const weight = isTarget && selected !== null ? WEIGHTS[selected][index] : null
            return (
              <g
                key={label + String(index)}
                id={`token-attention-token-${index}`}
                data-component="TokenAttention"
                data-state={isSelected ? 'selected' : isTarget ? 'target' : 'idle'}
                role="button"
                tabIndex={0}
                aria-pressed={isSelected}
                aria-label={t('token-attention.token', { token: label })}
                onClick={() => {
                  setSelected(isSelected ? null : index)
                }}
                onKeyDown={(event) => {
                  if (event.key === 'Enter' || event.key === ' ') {
                    event.preventDefault()
                    setSelected(isSelected ? null : index)
                  }
                }}
                onFocus={() => {
                  setFocused(index)
                }}
                onBlur={() => {
                  setFocused(null)
                }}
                className="cursor-pointer outline-none"
              >
                <rect
                  id={`token-attention-token-${index}-box`}
                  data-component="TokenAttention"
                  x={box.x}
                  y={BOX_Y}
                  width={box.width}
                  height={BOX_HEIGHT}
                  rx="8"
                  strokeWidth="2"
                  // A weighed box is tinted by its own weight rather than by a flat class, so the
                  // row reads as a ramp before a single number is read. The opacity is an attribute
                  // and the colour is still a token, which is what keeps this out of `index.css`'s
                  // way: there is no arbitrary `fill-primary/[0.37]` to generate.
                  fillOpacity={
                    weight === null || selected === null
                      ? undefined
                      : 0.06 + intensity(weight, selected) * 0.34
                  }
                  strokeOpacity={
                    weight === null || selected === null
                      ? undefined
                      : 0.25 + intensity(weight, selected) * 0.55
                  }
                  className={cn(
                    isSelected || isTarget
                      ? 'fill-primary stroke-primary'
                      : 'fill-muted stroke-border',
                  )}
                />
                {/* The focus ring is drawn rather than inherited: an SVG group takes no box shadow,
                    so a keyboard user would otherwise have nothing to follow. */}
                {focused === index ? (
                  <rect
                    id={`token-attention-token-${index}-focus`}
                    data-component="TokenAttention"
                    x={box.x - 4}
                    y={BOX_Y - 4}
                    width={box.width + 8}
                    height={BOX_HEIGHT + 8}
                    rx="11"
                    fill="none"
                    strokeWidth="3"
                    className="stroke-ring"
                  />
                ) : null}
                <text
                  id={`token-attention-token-${index}-label`}
                  data-component="TokenAttention"
                  x={box.cx}
                  y={BOX_Y + BOX_HEIGHT / 2}
                  fontSize="14"
                  textAnchor="middle"
                  dominantBaseline="middle"
                  className={cn(
                    'pointer-events-none font-mono',
                    isSelected ? 'fill-primary-foreground' : 'fill-foreground',
                  )}
                >
                  {label}
                </text>
                {/* Mono, because it is a number the machine came up with, and the heaviest one is
                    the only teal in the row: a student looking for what `it` leans on finds it
                    without comparing seven figures. */}
                {weight === null ? null : (
                  <text
                    id={`token-attention-token-${index}-weight`}
                    data-component="TokenAttention"
                    x={box.cx}
                    y={WEIGHT_Y}
                    fontSize="11"
                    textAnchor="middle"
                    dominantBaseline="middle"
                    className={cn(
                      'pointer-events-none font-mono',
                      index === heaviest ? 'fill-primary' : 'fill-muted-foreground',
                    )}
                  >
                    {weight}%
                  </text>
                )}
              </g>
            )
          })}
        </svg>
      </div>

      {/* What the drawing says, in words, for anyone who cannot read the arcs. */}
      <p
        id="token-attention-status"
        data-component="TokenAttention"
        role="status"
        className="text-muted-foreground text-xs"
      >
        {selected === null
          ? t('token-attention.all', { pairs: links.length })
          : heaviest === null
            ? t('token-attention.first', { token: TOKENS[selected] })
            : // Not `count`: i18next reserves that name for plural resolution.
              t('token-attention.held', {
                token: TOKENS[selected],
                links: WEIGHTS[selected].length,
                heaviest: TOKENS[heaviest],
                // The same string the drawing prints, so a screen reader and the page agree.
                weight: `${String(WEIGHTS[selected][heaviest])}%`,
              })}
      </p>
    </figure>
  )
}
