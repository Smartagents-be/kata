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
 * remaining record: if a caption ever comes back here, that is what goes in it.
 *
 * Like `TokenSplit`, it draws no context frame: `ContextDiagram` in `intro` is the first teal frame
 * a student meets, and a figure one page above it stays out of that vocabulary.
 */

/** Machine-shaped, so it stays English in every language, like `SpotInjection`'s result bodies. */
const TOKENS = ['the', 'build', 'failed', 'because', 'it', 'timed', 'out']

/**
 * `WEIGHTS[i][j]` is how hard token `i` weighs token `j`, and every row is one shorter than its
 * index because a token only looks back. Row 0 is empty on purpose: the first token has nothing
 * behind it, which is worth a student noticing.
 */
const WEIGHTS: number[][] = [
  [],
  [0.35],
  [0.1, 0.75],
  [0.1, 0.3, 0.6],
  [0.1, 0.9, 0.4, 0.25],
  [0.05, 0.5, 0.45, 0.2, 0.55],
  [0.05, 0.35, 0.3, 0.15, 0.4, 0.85],
]

const BOX_Y = 286
const BOX_HEIGHT = 30
const GAP = 8

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
          // boxes end at 316, so anything outside this band is empty and would only push the figure
          // taller.
          viewBox="0 45 640 285"
          role="group"
          aria-labelledby={titleId}
          className="h-auto w-full"
        >
          {/* useId, not a BEM id: aria-labelledby has to be unique per instance. */}
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
                strokeWidth={selected === null ? 1 + link.weight : 1 + link.weight * 3}
                strokeOpacity={
                  selected === null ? 0.06 + link.weight * 0.18 : 0.2 + link.weight * 0.7
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
                  className={cn(
                    isSelected
                      ? 'fill-primary stroke-primary'
                      : isTarget
                        ? 'fill-primary/15 stroke-primary/50'
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
              })}
      </p>
    </figure>
  )
}
