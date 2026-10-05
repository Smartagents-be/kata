import { useEffect, useId, useRef, useState } from 'react'
import { useTranslation } from 'react-i18next'
import { Button } from '@/shared/components/ui/button'
import { useLocale } from '@/shared/i18n/useLocale'
import { cn } from '@/shared/lib/utils'
import { exampleSentence } from './example-sentence'
import { B, LAST, PARAMETERS, PERCENTS, SUMS, VALUES, W, WEIGHTED, X_IN, relu } from './network-pass'

/**
 * The sixth figure, under its own heading after `NextToken` and `SamplingKnobs`: one token through a
 * network small enough to check by hand. `tokens.lead.1` says every chunk is swapped for a number,
 * and this is what happens to those numbers next, which is where `NextToken`'s scores come from.
 *
 * **It is a deliberate simplification.** A real language model is a transformer: its layers mix
 * every token with the ones in front of it, and that is drawn by `TokenAttention` higher up the
 * unit rather than here. Real models use smoother activations than ReLU (GELU, SwiGLU), and many
 * modern ones drop the biases. The figure keeps ReLU because "below zero becomes 0" can be said in
 * one sentence, and one bias per node because the bias is the concept being taught.
 *
 * **The token comes out of `TokenizerView`'s sentence, in the reader's language.** It is `ears` with
 * `The agent sw` in front of it, or `ert` after `De agent bewe`, both read off `example-sentence.ts`,
 * and the first of the four outputs is the token that really comes next in that sentence (`up`,
 * `bij`). The context carries no ellipsis, because the sentence starts there. The weights are the same
 * in every language, so the first output is always the winner and the percentages never move; only
 * the words change. The empty state names the token and its real id (36108, 805), so the step from
 * `TokenizerView`'s id to a row of numbers is said in words before the first click.
 *
 * **The footer is a fact-checked simplification note, in 2 short lines** so it fits under the drawing
 * on the deck as well as on the page. The first says what is made up here and what is cut: the id
 * looks up a learned row of numbers, thousands long in a real model (Llama 3 8B: 4,096; GPT-3:
 * 12,288), 4 here and invented, and a real model takes every token so far, not only the last. The
 * second says what a real model is around this: GPT and Llama are decoder-only transformers, dozens
 * of layers each with attention (drawn by `TokenAttention` above) and a network like this one, and
 * it counts this network's parameters against a large model's. Claude is deliberately not named in
 * that sentence: Anthropic does not publish its architecture.
 *
 * **Every weight, bias and input number is invented, and the arithmetic is not.** The numbers and
 * the forward pass live in `network-pass.ts`, computed from `W`, `B` and `X_IN`, so a weight edited
 * later moves every sum, bar and percentage with it, and the screen can never print a total its own
 * terms do not add up to. `SamplingKnobs` reads the same four output scores from there, so the two
 * figures cannot disagree about them.
 *
 * **The stepper is the point of it.** All four layers lit at once is a picture of a network; one
 * layer per click is the signal visibly moving through it, and each click selects the first node of
 * the layer it lit, so the sum that produced it is already open underneath.
 *
 * It draws no context frame, on the same reasoning as every other figure above `tools`.
 */

/** Two decimals, a real minus sign, and a plain 0 for nothing. */
function num(value: number) {
  return Math.abs(value) < 0.005 ? '0' : value.toFixed(2).replace('-', '−')
}

/** A weight as written, one decimal, with a real minus sign. */
function weight(value: number) {
  return (value < 0 ? '−' : '') + String(Math.abs(value))
}

/** A negative term in a sum gets brackets, so `×(−0.6)` reads as one factor. */
function paren(text: string) {
  return text.startsWith('−') ? `(${text})` : text
}

// Layout, in viewBox units. The drawing is 694 wide and scales with the column. The first column
// sits far enough right that a 14-character context line ends before the vector's bracket.
const VIEW_W = 694
const VIEW_H = 262
const COLUMN_X = [196, 326, 456, 576]
const TOP = 46
const BOTTOM = 246
const MID = TOP + (BOTTOM - TOP) / 2
const ys = (n: number) => Array.from({ length: n }, (_, i) => TOP + ((BOTTOM - TOP) * (i + 0.5)) / n)
const COLUMN_Y = [ys(4), ys(5), ys(5), ys(4)]
const VECTOR_X1 = 112
const VECTOR_X2 = 162

/** What each node is lit by: the input's size, a hidden node's value, an output's probability. */
const SHOWN = [X_IN.map(Math.abs), VALUES[1], VALUES[2], PERCENTS]
const SHOWN_MAX = SHOWN.map((column) => Math.max(...column))

/** JetBrains Mono advances 0.6em per glyph, so a pill sizes to its text without measuring. */
const PILL_FONT = 10.5
const PILL_CHAR = PILL_FONT * 0.6
const PILL_PAD = 5
const PILL_H = 17
const pillWidth = (text: string) => text.length * PILL_CHAR + PILL_PAD * 2

/** A label in a rounded box sized to its text, so nothing sticks out of its frame. */
function Pill({
  id,
  x,
  y,
  text,
  dashed = false,
  bold = false,
  anchor = 'start',
}: {
  id: string
  x: number
  y: number
  text: string
  dashed?: boolean
  bold?: boolean
  anchor?: 'start' | 'middle'
}) {
  const width = pillWidth(text)
  const left = anchor === 'middle' ? x - width / 2 : x
  return (
    <g id={id} data-component="Pill" className="pointer-events-none">
      <rect
        id={`${id}-box`}
        data-component="Pill"
        x={left}
        y={y - PILL_H / 2}
        width={width}
        height={PILL_H}
        rx="4"
        strokeWidth="0.8"
        strokeDasharray={dashed ? '3 2' : undefined}
        className="fill-card stroke-foreground"
      />
      <text
        id={`${id}-text`}
        data-component="Pill"
        x={left + PILL_PAD}
        y={y}
        fontSize={PILL_FONT}
        fontWeight={bold ? 600 : 400}
        dominantBaseline="central"
        className="fill-foreground font-mono"
      >
        {text}
      </text>
    </g>
  )
}

/** The small marker in front of a calculation row, the same shape the drawing uses for it. */
function Tag({ id, kind, children }: { id: string; kind: 'weight' | 'bias' | 'rule'; children: string }) {
  return (
    <span
      id={id}
      data-component="Tag"
      className={cn(
        'mr-1.5 inline-block rounded-[3px] px-1 font-mono text-[10.5px] leading-normal font-normal',
        kind === 'weight' && 'border-foreground border',
        kind === 'bias' && 'border-foreground border border-dashed',
        kind === 'rule' && 'bg-foreground text-background',
      )}
    >
      {children}
    </span>
  )
}

type Selected = { layer: number; node: number }

export function TokenNetwork() {
  const { t } = useTranslation('step1')
  const { locale } = useLocale()
  const titleId = useId()
  const [lit, setLit] = useState(0)
  const [selected, setSelected] = useState<Selected | null>(null)
  const [focused, setFocused] = useState<Selected | null>(null)
  const nextRef = useRef<HTMLButtonElement>(null)
  const resetRef = useRef<HTMLButtonElement>(null)

  // Next disables itself on the last layer, and a disabled button drops the keyboard focus on the
  // floor. Hand it to Start over, the only thing left to press.
  useEffect(() => {
    if (lit === LAST && document.activeElement === nextRef.current) {
      resetRef.current?.focus()
    }
  }, [lit])

  const layerName = (layer: number) => t(`token-network.layer.${layer}`)

  const advance = () => {
    if (lit < LAST) {
      setLit(lit + 1)
      setSelected({ layer: lit + 1, node: 0 })
    }
  }

  const reset = () => {
    setLit(0)
    setSelected(null)
  }

  // Real tokens in the reader's language, mono like the figure above, and no locale key.
  const sentence = exampleSentence(locale)
  // No ellipsis in front: the sentence starts here.
  const context = sentence.tokens
    .slice(0, sentence.networkToken)
    .map((token) => token.text)
    .join('')
  const token = sentence.tokens[sentence.networkToken].text
  const tokenId = sentence.tokens[sentence.networkToken].id
  const outputs = sentence.outputs

  const SPLIT = '\u0001'
  const [emptyBefore, emptyAfter] = t('token-network.empty', {
    next: SPLIT,
    token,
    id: tokenId,
    inputs: X_IN.length,
  }).split(SPLIT)

  return (
    <figure id="token-network" data-component="TokenNetwork" className="my-8 flex flex-col gap-3">
      <span id="token-network-label" data-component="TokenNetwork" className="eyebrow text-primary">
        {t('token-network.label')}
      </span>

      <div
        id="token-network-panel"
        data-component="TokenNetwork"
        className="border-border bg-card flex flex-col gap-1 rounded-lg border p-3.5"
      >
        <div
          id="token-network-controls"
          data-component="TokenNetwork"
          className="flex flex-wrap items-center gap-2.5"
        >
          <Button
            ref={nextRef}
            id="token-network-next"
            data-component="TokenNetwork"
            type="button"
            size="sm"
            disabled={lit >= LAST}
            onClick={advance}
          >
            {t('token-network.next')}
          </Button>
          <Button
            ref={resetRef}
            id="token-network-reset"
            data-component="TokenNetwork"
            type="button"
            size="sm"
            variant="outline"
            disabled={lit === 0}
            onClick={reset}
          >
            {t('token-network.reset')}
          </Button>
          <span
            id="token-network-hint"
            data-component="TokenNetwork"
            className="text-muted-foreground text-xs sm:ml-auto"
          >
            {t('token-network.hint')}
          </span>
        </div>

        {/* role="group" rather than role="img": the lit nodes are real controls, and an img role
            would take them away from a screen reader. */}
        <svg
          id="token-network-svg"
          data-component="TokenNetwork"
          viewBox={`0 0 ${VIEW_W} ${VIEW_H}`}
          role="group"
          aria-labelledby={titleId}
          className="block h-auto w-full font-mono"
        >
          <title id={titleId} data-component="TokenNetwork">
            {t('token-network.description', {
              token,
              // Not `context`: i18next reserves that name for its context option.
              preceding: context,
              input: X_IN.map(num).join(', '),
              output: outputs.map((name, i) => `${name} ${PERCENTS[i]}%`).join(', '),
            })}
          </title>

          {/* Edges stay grey until the layer they feed lights up, then carry the signal: as thick
              as |weight × input|, teal when that pushes the sum up and grey when it pulls it down. */}
          <g id="token-network-edges" data-component="TokenNetwork">
            {W.map((matrix, k) =>
              matrix.map((row, j) =>
                row.map((w, i) => {
                  const id = `token-network-edge-${k}-${j}-${i}`
                  const line = {
                    x1: COLUMN_X[k],
                    y1: COLUMN_Y[k][i],
                    x2: COLUMN_X[k + 1],
                    y2: COLUMN_Y[k + 1][j],
                  }
                  if (k + 1 > lit) {
                    return (
                      <line
                        key={id}
                        id={id}
                        data-component="TokenNetwork"
                        {...line}
                        strokeWidth="0.8"
                        className="stroke-border"
                      />
                    )
                  }
                  const signal = w * VALUES[k][i]
                  const flow = Math.abs(signal)
                  return (
                    <line
                      key={id}
                      id={id}
                      data-component="TokenNetwork"
                      {...line}
                      strokeWidth={0.6 + flow * 2.2}
                      strokeOpacity={flow < 0.02 ? 0.05 : 0.12 + Math.min(flow, 1) * 0.4}
                      className={signal >= 0 ? 'stroke-primary' : 'stroke-muted-foreground'}
                    />
                  )
                }),
              ),
            )}
          </g>

          {/* The token, the context it follows, and the column of numbers it stands for. */}
          <text
            id="token-network-context"
            data-component="TokenNetwork"
            x="4"
            y={MID - 26}
            fontSize="12"
            className="fill-muted-foreground"
          >
            {context}
          </text>
          <rect
            id="token-network-token-box"
            data-component="TokenNetwork"
            x="4"
            y={MID - 12}
            width="66"
            height="24"
            rx="4"
            fillOpacity="0.1"
            strokeOpacity="0.3"
            className="fill-primary stroke-primary"
          />
          <text
            id="token-network-token"
            data-component="TokenNetwork"
            x="11"
            y={MID + 5}
            fontSize="13"
            className="fill-foreground"
          >
            {token}
          </text>
          <text
            id="token-network-arrow"
            data-component="TokenNetwork"
            x="76"
            y={MID + 5}
            fontSize="13"
            aria-hidden="true"
            className="fill-muted-foreground"
          >
            →
          </text>
          <g
            id="token-network-vector"
            data-component="TokenNetwork"
            fill="none"
            strokeWidth="2"
            strokeOpacity="0.5"
            className="stroke-primary"
          >
            <path
              id="token-network-vector-left"
              data-component="TokenNetwork"
              d={`M${VECTOR_X1 + 5} ${COLUMN_Y[0][0] - 14} H${VECTOR_X1} V${COLUMN_Y[0][3] + 14} H${VECTOR_X1 + 5}`}
            />
            <path
              id="token-network-vector-right"
              data-component="TokenNetwork"
              d={`M${VECTOR_X2 - 5} ${COLUMN_Y[0][0] - 14} H${VECTOR_X2} V${COLUMN_Y[0][3] + 14} H${VECTOR_X2 - 5}`}
            />
          </g>
          {COLUMN_Y[0].map((y, i) => (
            <g key={i} id={`token-network-number-${i}`} data-component="TokenNetwork">
              <text
                id={`token-network-number-${i}-value`}
                data-component="TokenNetwork"
                x={VECTOR_X2 - 6}
                y={y + 4}
                fontSize="11"
                textAnchor="end"
                className="fill-foreground"
              >
                {num(X_IN[i])}
              </text>
              <line
                id={`token-network-number-${i}-lead`}
                data-component="TokenNetwork"
                x1={VECTOR_X2 + 3}
                y1={y}
                x2={COLUMN_X[0] - 10}
                y2={y}
                strokeOpacity="0.4"
                className="stroke-muted-foreground"
              />
            </g>
          ))}

          {/* The selected node's incoming lines, dark, each with its weight halfway along. */}
          {selected ? (
            <g id="token-network-incoming" data-component="TokenNetwork">
              {COLUMN_Y[selected.layer - 1].map((y, i) => (
                <line
                  key={i}
                  id={`token-network-incoming-${i}`}
                  data-component="TokenNetwork"
                  x1={COLUMN_X[selected.layer - 1]}
                  y1={y}
                  x2={COLUMN_X[selected.layer]}
                  y2={COLUMN_Y[selected.layer][selected.node]}
                  strokeWidth="1.5"
                  className="stroke-foreground"
                />
              ))}
              {COLUMN_Y[selected.layer - 1].map((y, i) => (
                <Pill
                  key={i}
                  id={`token-network-weight-${i}`}
                  x={(COLUMN_X[selected.layer - 1] + COLUMN_X[selected.layer]) / 2}
                  y={(y + COLUMN_Y[selected.layer][selected.node]) / 2}
                  text={'×' + weight(W[selected.layer - 1][selected.node][i])}
                  anchor="middle"
                />
              ))}
            </g>
          ) : null}

          {COLUMN_Y.map((column, k) =>
            column.map((y, i) => {
              const on = k <= lit
              const amount = SHOWN[k][i]
              const fires = on && amount > 0.001
              const fill = fires ? 0.12 + 0.88 * Math.min(amount / SHOWN_MAX[k], 1) : undefined
              const isSelected = selected?.layer === k && selected.node === i
              const isFocused = focused?.layer === k && focused.node === i
              const clickable = k > 0 && on
              const select = () => {
                setSelected({ layer: k, node: i })
              }
              return (
                <g
                  key={`${k}-${i}`}
                  id={`token-network-node-${k}-${i}`}
                  data-component="TokenNetwork"
                  data-state={isSelected ? 'selected' : !on ? 'off' : fires ? 'firing' : 'zero'}
                  {...(clickable
                    ? {
                        role: 'button',
                        tabIndex: 0,
                        'aria-pressed': isSelected,
                        'aria-label':
                          k === LAST
                            ? t('token-network.output-node', {
                                layer: layerName(k),
                                name: outputs[i],
                                percent: PERCENTS[i],
                              })
                            : t('token-network.node', {
                                layer: layerName(k),
                                index: i + 1,
                                value: num(VALUES[k][i]),
                              }),
                        onClick: select,
                        onKeyDown: (event: React.KeyboardEvent) => {
                          if (event.key === 'Enter' || event.key === ' ') {
                            event.preventDefault()
                            select()
                          }
                        },
                        onFocus: () => {
                          setFocused({ layer: k, node: i })
                        },
                        onBlur: () => {
                          setFocused(null)
                        },
                      }
                    : {})}
                  className={cn(clickable && 'cursor-pointer outline-none')}
                >
                  <circle
                    id={`token-network-node-${k}-${i}-circle`}
                    data-component="TokenNetwork"
                    cx={COLUMN_X[k]}
                    cy={y}
                    r={k === LAST ? 10 : 9}
                    fillOpacity={fill}
                    strokeWidth={isSelected ? 2.4 : 1.5}
                    strokeDasharray={on && !fires && !isSelected && k > 0 ? '3 3' : undefined}
                    className={cn(
                      fires ? 'fill-primary' : 'fill-card',
                      isSelected
                        ? 'stroke-foreground'
                        : !on
                          ? 'stroke-border'
                          : fires
                            ? 'stroke-primary'
                            : 'stroke-muted-foreground',
                    )}
                  />
                  {/* An SVG group takes no box shadow, so the focus ring is drawn. */}
                  {isFocused ? (
                    <circle
                      id={`token-network-node-${k}-${i}-focus`}
                      data-component="TokenNetwork"
                      cx={COLUMN_X[k]}
                      cy={y}
                      r={(k === LAST ? 10 : 9) + 4}
                      fill="none"
                      strokeWidth="2.5"
                      className="stroke-ring"
                    />
                  ) : null}
                  {(k === 1 || k === 2) && on && !isSelected ? (
                    <text
                      id={`token-network-node-${k}-${i}-value`}
                      data-component="TokenNetwork"
                      x={COLUMN_X[k]}
                      y={y - 14}
                      fontSize="9"
                      textAnchor="middle"
                      fillOpacity={fires ? 0.9 : 0.6}
                      className={cn(
                        'pointer-events-none',
                        fires ? 'fill-foreground' : 'fill-muted-foreground',
                      )}
                    >
                      {num(amount)}
                    </text>
                  ) : null}
                </g>
              )
            }),
          )}

          {/* The four tokens it can choose between, and, once lit, how likely each one is. */}
          {COLUMN_Y[LAST].map((y, i) => {
            const on = lit >= LAST
            const winner = on && i === 0
            return (
              <g key={i} id={`token-network-output-${i}`} data-component="TokenNetwork">
                <text
                  id={`token-network-output-${i}-name`}
                  data-component="TokenNetwork"
                  x={COLUMN_X[LAST] + 18}
                  y={y + 4}
                  fontSize="12"
                  fontWeight={winner ? 600 : 400}
                  fillOpacity={on ? 1 : 0.5}
                  className={winner ? 'fill-foreground' : 'fill-muted-foreground'}
                >
                  {outputs[i]}
                </text>
                {on ? (
                  <text
                    id={`token-network-output-${i}-percent`}
                    data-component="TokenNetwork"
                    x={COLUMN_X[LAST] + 76}
                    y={y + 4}
                    fontSize="11"
                    className="fill-muted-foreground"
                  >
                    {PERCENTS[i]}%
                  </text>
                ) : null}
              </g>
            )
          })}

          {/* What the selected node carries: its bias and what it passes on, or for an output node
              its bias alone, above it. */}
          {selected ? (
            selected.layer < LAST ? (
              <g id="token-network-carried" data-component="TokenNetwork">
                <Pill
                  id="token-network-bias"
                  x={COLUMN_X[selected.layer] + 16}
                  y={COLUMN_Y[selected.layer][selected.node]}
                  text={`${t('token-network.bias')} ${num(B[selected.layer - 1][selected.node])}`}
                  dashed
                />
                <Pill
                  id="token-network-result"
                  x={
                    COLUMN_X[selected.layer] +
                    16 +
                    pillWidth(`${t('token-network.bias')} ${num(B[selected.layer - 1][selected.node])}`) +
                    4
                  }
                  y={COLUMN_Y[selected.layer][selected.node]}
                  text={`→ ${num(VALUES[selected.layer][selected.node])}`}
                  bold
                />
              </g>
            ) : (
              <Pill
                id="token-network-bias"
                x={COLUMN_X[selected.layer]}
                y={COLUMN_Y[selected.layer][selected.node] - 24}
                text={`${t('token-network.bias')} ${num(B[selected.layer - 1][selected.node])}`}
                dashed
                anchor="middle"
              />
            )
          ) : null}

          {[
            { x: (VECTOR_X1 + COLUMN_X[0]) / 2, layer: 0 },
            { x: COLUMN_X[1], layer: 1 },
            { x: COLUMN_X[2], layer: 2 },
            { x: COLUMN_X[3] + 40, layer: 3 },
          ].map(({ x, layer }) => (
            <text
              key={layer}
              id={`token-network-column-${layer}`}
              data-component="TokenNetwork"
              x={x}
              y="16"
              fontSize="12"
              textAnchor="middle"
              className="fill-muted-foreground font-sans"
            >
              {layerName(layer)}
            </text>
          ))}
        </svg>

        <Calculation
          selected={selected}
          outputs={outputs}
          emptyBefore={emptyBefore}
          emptyAfter={emptyAfter}
        />

        {/* 2 lines rather than 1 paragraph: what is made up here, then what a real model is around
            it. Each line is short enough to read under the drawing on a slide. */}
        <div
          id="token-network-note"
          data-component="TokenNetwork"
          className="border-border text-muted-foreground mt-2 flex flex-col gap-1 border-t pt-2 text-xs leading-relaxed"
        >
          <p id="token-network-note-1" data-component="TokenNetwork">
            <strong
              id="token-network-note-lead"
              data-component="TokenNetwork"
              className="text-foreground font-semibold"
            >
              {t('token-network.note.lead')}
            </strong>{' '}
            {t('token-network.note.1', { inputs: X_IN.length })}
          </p>
          <p id="token-network-note-2" data-component="TokenNetwork">
            {t('token-network.note.2', { parameters: PARAMETERS })}
          </p>
        </div>
      </div>
    </figure>
  )
}

/** The sum behind the selected node, in three named rows under the drawing. */
function Calculation({
  selected,
  outputs,
  emptyBefore,
  emptyAfter,
}: {
  selected: Selected | null
  outputs: readonly string[]
  emptyBefore: string
  emptyAfter: string
}) {
  const { t } = useTranslation('step1')

  const rowTitle = 'text-xs font-semibold'
  const math = 'font-mono text-[11.5px] break-words'
  const hint = 'text-muted-foreground mb-1 text-[11.5px] sm:col-start-2'

  let body: React.ReactNode
  if (!selected) {
    body = (
      <p
        id="token-network-calc-empty"
        data-component="Calculation"
        className="text-muted-foreground self-center text-xs sm:col-span-2"
      >
        {emptyBefore}
        <strong id="token-network-calc-empty-next" data-component="Calculation" className="font-semibold">
          {t('token-network.next')}
        </strong>
        {emptyAfter}
      </p>
    )
  } else {
    const { layer, node } = selected
    const input = VALUES[layer - 1]
    const weights = W[layer - 1][node]
    const bias = B[layer - 1][node]
    const sum = SUMS[layer][node]
    const weighted = WEIGHTED[layer][node]
    const terms = input.map((v, i) => `${paren(num(v))}×${paren(weight(weights[i]))}`).join(' + ')

    body = (
      <>
        <div id="token-network-calc-weight-title" data-component="Calculation" className={rowTitle}>
          <Tag id="token-network-calc-weight-tag" kind="weight">
            ×0.8
          </Tag>
          {t('token-network.calc.weight')}
        </div>
        <div id="token-network-calc-weight-math" data-component="Calculation" className={math}>
          {terms} = {num(weighted)}
        </div>
        <div id="token-network-calc-weight-hint" data-component="Calculation" className={hint}>
          {t('token-network.calc.weight.hint')}
        </div>

        <div id="token-network-calc-bias-title" data-component="Calculation" className={rowTitle}>
          <Tag id="token-network-calc-bias-tag" kind="bias">
            {t('token-network.bias')}
          </Tag>
          {t('token-network.calc.bias')}
        </div>
        <div id="token-network-calc-bias-math" data-component="Calculation" className={math}>
          {num(weighted)} + {paren(num(bias))} = {num(sum)}
        </div>
        <div id="token-network-calc-bias-hint" data-component="Calculation" className={hint}>
          {t('token-network.calc.bias.hint')}
        </div>

        {layer < LAST ? (
          <>
            <div id="token-network-calc-rule-title" data-component="Calculation" className={rowTitle}>
              <Tag id="token-network-calc-rule-tag" kind="rule">
                f
              </Tag>
              {t('token-network.calc.activation')}
            </div>
            <div id="token-network-calc-rule-math" data-component="Calculation" className={math}>
              {num(sum)} → {num(relu(sum))}
            </div>
            <div id="token-network-calc-rule-hint" data-component="Calculation" className={hint}>
              {sum <= 0
                ? t('token-network.calc.activation.below')
                : t('token-network.calc.activation.above')}{' '}
              {t('token-network.calc.activation.relu')}
            </div>
          </>
        ) : (
          <>
            <div id="token-network-calc-rule-title" data-component="Calculation" className={rowTitle}>
              <Tag id="token-network-calc-rule-tag" kind="rule">
                %
              </Tag>
              {t('token-network.calc.probabilities')}
            </div>
            <div id="token-network-calc-rule-math" data-component="Calculation" className={math}>
              {outputs.map((name, i) => `${name} ${num(VALUES[LAST][i])}`).join(' · ')}
              <br />
              {'→ '}
              {outputs.map((name, i) => `${name} ${PERCENTS[i]}%`).join(' · ')}
            </div>
            <div id="token-network-calc-rule-hint" data-component="Calculation" className={hint}>
              {t('token-network.calc.probabilities.hint')}
            </div>
          </>
        )}
      </>
    )
  }

  return (
    <div
      id="token-network-calc"
      data-component="Calculation"
      data-state={selected ? 'node' : 'empty'}
      aria-live="polite"
      className="bg-muted mt-1 grid min-h-[120px] grid-cols-1 items-baseline gap-x-3 gap-y-1 rounded-lg px-3 py-2.5 sm:grid-cols-[140px_1fr]"
    >
      {body}
    </div>
  )
}
