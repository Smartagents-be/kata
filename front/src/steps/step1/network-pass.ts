/**
 * `TokenNetwork`'s numbers and its forward pass, in a module of their own so `SamplingKnobs` can
 * read the very same output scores rather than a copy of them. The two figures are one example:
 * the network turns `that` (or `dat`) into four scores, and the knobs reshape those four scores
 * before one is picked. A second copy of the scores would be the first thing to drift.
 *
 * **Every weight, bias and input number is invented, and the arithmetic is not.** The pass is
 * computed from `W`, `B` and `X_IN` once at load, so a weight edited later moves every sum, bar and
 * percentage in both figures with it, and the screen can never print a total its own terms do not
 * add up to. That last part is why each layer's output is rounded to the two decimals the figure
 * prints before it is passed on: the row a student checks with a calculator has to come out
 * exactly.
 *
 * Plain data in its own module rather than an export from a figure, the same reason
 * `example-sentence.ts` is: the figure files stay component-only and Fast Refresh keeps working.
 */

/** The token's numbers. Invented, like everything a student cannot check. */
export const X_IN = [0.31, -0.08, 1.27, 0.55]

/** One matrix per layer: `W[layer][node][input]`. */
export const W = [
  [
    [0.8, -0.3, 0.5, -0.2],
    [-0.9, 0.4, -0.6, 0.1],
    [0.2, 0.7, 0.6, -0.5],
    [-0.4, -0.8, -0.3, 0.6],
    [0.5, 0.1, 0.4, 0.9],
  ],
  [
    [0.6, 0.0, 0.7, -0.5, 0.3],
    [-0.7, 0.2, -0.4, 0.6, -0.3],
    [0.4, -0.5, 0.8, 0.0, 0.6],
    [0.2, 0.9, -0.3, -0.6, -0.4],
    [-0.5, 0.3, 0.5, 0.4, 0.7],
  ],
  [
    [0.9, -0.4, 0.8, -0.2, 0.7],
    [0.3, 0.2, 0.4, 0.1, 0.2],
    [-0.2, 0.5, 0.1, 0.3, -0.1],
    [0.1, -0.3, -0.2, 0.4, 0.0],
  ],
]

/** One bias per node: `B[layer][node]`. */
export const B = [
  [0.1, -0.2, 0.0, 0.3, -0.1],
  [0.0, 0.1, -0.1, 0.2, 0.0],
  [0.1, 0.0, 0.0, -0.1],
]

/** Every weight and every bias: the number `TokenNetwork`'s footer names. */
export const PARAMETERS = W.flat(2).length + B.flat().length

/** Index of the output layer in `VALUES`, `SUMS` and `WEIGHTED`. */
export const LAST = W.length

const round2 = (value: number) => Math.round(value * 100) / 100
export const relu = (value: number) => Math.max(0, value)

/** Softmax at a temperature: the scores divided by `temperature`, then shares that add up to 1. */
export function softmax(scores: readonly number[], temperature = 1): number[] {
  const exps = scores.map((score) => Math.exp(score / temperature))
  const total = exps.reduce((a, b) => a + b, 0)
  return exps.map((e) => e / total)
}

/**
 * The forward pass. `weighted` is the sum of weight times input, `sums` adds the bias, `values` is
 * what the layer passes on: ReLU on the hidden layers, nothing on the output.
 */
function forward() {
  const values: number[][] = [X_IN]
  const weighted: number[][] = [[]]
  const sums: number[][] = [[]]
  W.forEach((matrix, layer) => {
    const input = values[layer]
    const w = matrix.map((row) => round2(row.reduce((sum, weight, i) => sum + weight * input[i], 0)))
    const z = w.map((value, node) => round2(value + B[layer][node]))
    weighted.push(w)
    sums.push(z)
    values.push(layer + 1 < LAST ? z.map(relu) : z)
  })
  const percents = softmax(values[LAST]).map((share) => Math.round(share * 100))
  return { values, weighted, sums, percents }
}

export const { values: VALUES, weighted: WEIGHTED, sums: SUMS, percents: PERCENTS } = forward()

/** The four output scores before softmax (2.54, 0.96, −0.15, −0.25), in `outputs` order. */
export const OUTPUT_SCORES: readonly number[] = VALUES[LAST]
