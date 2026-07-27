import { useState } from 'react'
import { useTranslation } from 'react-i18next'
import { Button } from '@/shared/components/ui/button'
import { cn } from '@/shared/lib/utils'

/**
 * The loop. Five tokens go in, the model scores what could come next, the top one is appended, and
 * the whole thing goes back round. Clicking through it three times is the argument: there was never
 * a plan for the sentence, only a next token, three times over.
 *
 * The sentence it writes is the sentence `TokenAttention` then takes apart, on purpose. The two are
 * a pair the way `ToolsInContext` and `McpServer` are: this one shows the sentence being written a
 * token at a time, the next one shows what each of those passes was reading. Changing the sentence
 * in one of them breaks the pair.
 *
 * The counter under the candidates is the part that carries the cost claim, and it is why the input
 * is redrawn in full on every pass rather than only the new chip: what the model reads on pass three
 * is not the token it just wrote, it is all seven again.
 *
 * **The probabilities are illustrative and the caption says so**, the same rule `TokenAttention`
 * follows for its weights. A real distribution runs over the entire vocabulary and is shaped by the
 * sampling settings on top of that. The shape is what is honest here: one clear favourite, a couple
 * of plausible runners-up, and a long tail that is not worth drawing.
 */

/** Machine-shaped, so English in every language, like `TokenAttention`'s sentence. */
const PROMPT = ['the', 'build', 'failed', 'because', 'it']

type Candidate = {
  token: string
  p: number
  /**
   * What this token would most likely have been followed by. Two each, so the branch view is a tree
   * and not a comb. Absent means the branch ends there, which only the full stop does.
   *
   * The first entry of the first candidate is the token the *next* pass actually takes, in every
   * pass. That is what lets the branch view draw one unbroken taken path, so keep them lined up if
   * you edit either list.
   */
  then?: [string, string]
}

/** One entry per pass. The first candidate is the one taken, so the list is ordered by score. */
const PASSES: Candidate[][] = [
  [
    { token: 'timed', p: 0.34, then: ['out', 'itself'] },
    { token: 'was', p: 0.22, then: ['not', 'still'] },
    { token: 'ran', p: 0.14, then: ['out', 'too'] },
    { token: 'could', p: 0.09, then: ['not', 'never'] },
    { token: 'never', p: 0.07, then: ['finished', 'started'] },
  ],
  [
    { token: 'out', p: 0.89, then: ['.', 'after'] },
    { token: 'out.', p: 0.04, then: ['The', 'It'] },
    { token: 'itself', p: 0.02, then: ['out', 'off'] },
    { token: 'again', p: 0.01, then: ['after', 'and'] },
  ],
  [
    { token: '.', p: 0.62 },
    { token: 'after', p: 0.12, then: ['30', 'two'] },
    { token: 'on', p: 0.08, then: ['the', 'a'] },
    { token: 'waiting', p: 0.06, then: ['for', 'on'] },
  ],
]

const ROW_HEIGHT = 26
const TOP_PAD = 16
/** Root, the candidates, then what each of them would have led to. */
const COLUMN_X = [60, 250, 440]
/**
 * How far short of a node a limb stops. Labels are centred on their column, so this has to clear the
 * half-width of the longest one at 13px mono (`finished`, eight characters) or the line is drawn
 * through the word and reads as a strikethrough.
 */
const NODE_GAP = 36

/**
 * One row per leaf, so a branch with two continuations takes two rows and a branch that ends takes
 * one. Everything else in the drawing hangs off these: a candidate sits at the middle of its own
 * rows, and the root sits at the middle of the lot.
 */
function layout(candidates: Candidate[]) {
  const rows: { candidate: number; child: string | null }[] = []
  candidates.forEach((candidate, index) => {
    if (!candidate.then) {
      rows.push({ candidate: index, child: null })
      return
    }
    for (const child of candidate.then) {
      rows.push({ candidate: index, child })
    }
  })

  const y = (row: number) => TOP_PAD + row * ROW_HEIGHT + ROW_HEIGHT / 2
  const centres = candidates.map((_, index) => {
    const own = rows.map((row, i) => (row.candidate === index ? i : -1)).filter((i) => i >= 0)
    return (y(own[0]) + y(own[own.length - 1])) / 2
  })

  return { rows, y, centres, height: rows.length * ROW_HEIGHT + TOP_PAD * 2 }
}

/** A flat S between two columns, so the branches read as one fan rather than a bundle of elbows. */
function limb(x1: number, y1: number, x2: number, y2: number): string {
  const mid = (x1 + x2) / 2
  return `M ${x1} ${y1} C ${mid} ${y1} ${mid} ${y2} ${x2} ${y2}`
}

export function NextToken() {
  const { t } = useTranslation('step1')
  const [taken, setTaken] = useState(0)

  const written = PASSES.slice(0, taken).map((pass) => pass[0].token)
  const sofar = [...PROMPT, ...written]
  const done = taken === PASSES.length
  const candidates = done ? [] : PASSES[taken]

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
          {sofar.map((token, index) => (
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
            >
              {token}
            </span>
          ))}
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

        {!done ? (
          <ul id="next-token-candidates" data-component="NextToken" className="flex flex-col gap-1">
            {candidates.map((candidate, index) => (
              <li
                key={candidate.token}
                id={`next-token-candidate-${index}`}
                data-component="NextToken"
                data-state={index === 0 ? 'taken' : 'passed'}
                className="grid grid-cols-[5rem_1fr_3rem] items-center gap-2"
              >
                <span
                  id={`next-token-candidate-${index}-token`}
                  data-component="NextToken"
                  className={cn(
                    'truncate text-right font-mono text-sm',
                    index === 0 ? 'text-foreground' : 'text-muted-foreground',
                  )}
                >
                  {candidate.token}
                </span>
                <span
                  id={`next-token-candidate-${index}-bar`}
                  data-component="NextToken"
                  className="flex h-2 items-center"
                >
                  <span
                    className={cn(
                      'h-full min-w-[3px] rounded-sm',
                      index === 0 ? 'bg-primary' : 'bg-primary/30',
                    )}
                    style={{ width: `${candidate.p * 100}%` }}
                  />
                </span>
                <span
                  id={`next-token-candidate-${index}-score`}
                  data-component="NextToken"
                  className="text-muted-foreground text-right font-mono text-xs tabular-nums"
                >
                  {Math.round(candidate.p * 100)}%
                </span>
              </li>
            ))}
          </ul>
        ) : null}

        {/*
          What the other four scores were worth. The taken path is drawn solid and everything else
          muted, so the shape of the argument is one road through a fan of roads that were all
          available. It reads the same at every pass, which is why the geometry is derived rather
          than placed: pass three has a branch that ends, and the rows absorb that on their own.
        */}
        {!done ? (
          <div id="next-token-tree" data-component="NextToken" className="border-border border-t pt-3">
            {(() => {
              const { rows, y, centres, height } = layout(candidates)
              const rootY = height / 2
              return (
                <svg
                  id="next-token-tree-svg"
                  data-component="NextToken"
                  viewBox={`0 0 640 ${height}`}
                  role="img"
                  aria-label={t('next-token.branches.description')}
                  className="h-auto w-full"
                >
                  <g fill="none" strokeWidth="1.5">
                    {candidates.map((candidate, index) => (
                      <path
                        key={`limb-${candidate.token}`}
                        id={`next-token-tree-limb-${index}`}
                        data-component="NextToken"
                        d={limb(COLUMN_X[0] + 22, rootY, COLUMN_X[1] - NODE_GAP, centres[index])}
                        className={index === 0 ? 'stroke-primary' : 'stroke-border'}
                      />
                    ))}
                    {rows.map((row, index) =>
                      row.child === null ? null : (
                        <path
                          key={`twig-${index}`}
                          id={`next-token-tree-twig-${index}`}
                          data-component="NextToken"
                          d={limb(
                            COLUMN_X[1] + NODE_GAP,
                            centres[row.candidate],
                            COLUMN_X[2] - NODE_GAP,
                            y(index),
                          )}
                          className={
                            row.candidate === 0 && rows[index - 1]?.candidate !== 0
                              ? 'stroke-primary'
                              : 'stroke-border'
                          }
                        />
                      ),
                    )}
                  </g>

                  <text
                    id="next-token-tree-root"
                    data-component="NextToken"
                    x={COLUMN_X[0]}
                    y={rootY}
                    fontSize="13"
                    textAnchor="middle"
                    dominantBaseline="middle"
                    className="fill-foreground font-mono"
                  >
                    {sofar[sofar.length - 1]}
                  </text>

                  {candidates.map((candidate, index) => (
                    <text
                      key={`node-${candidate.token}`}
                      id={`next-token-tree-node-${index}`}
                      data-component="NextToken"
                      data-state={index === 0 ? 'taken' : 'passed'}
                      x={COLUMN_X[1]}
                      y={centres[index]}
                      fontSize="13"
                      textAnchor="middle"
                      dominantBaseline="middle"
                      className={cn(
                        'font-mono',
                        index === 0 ? 'fill-primary font-semibold' : 'fill-muted-foreground',
                      )}
                    >
                      {candidate.token}
                    </text>
                  ))}

                  {rows.map((row, index) =>
                    row.child === null ? null : (
                      <text
                        key={`leaf-${index}`}
                        id={`next-token-tree-leaf-${index}`}
                        data-component="NextToken"
                        x={COLUMN_X[2]}
                        y={y(index)}
                        fontSize="13"
                        textAnchor="middle"
                        dominantBaseline="middle"
                        className={cn(
                          'font-mono',
                          row.candidate === 0 && rows[index - 1]?.candidate !== 0
                            ? 'fill-primary'
                            : 'fill-muted-foreground/70',
                        )}
                      >
                        {row.child}
                      </text>
                    ),
                  )}
                </svg>
              )
            })()}
          </div>
        ) : null}

        <div
          id="next-token-controls"
          data-component="NextToken"
          className="flex flex-wrap items-center gap-3"
        >
          <Button
            id="next-token-advance"
            data-component="NextToken"
            type="button"
            size="sm"
            variant={done ? 'outline' : 'default'}
            onClick={() => {
              setTaken(done ? 0 : taken + 1)
            }}
          >
            {t(done ? 'next-token.restart' : 'next-token.advance')}
          </Button>

          {/* The cost line. It counts what went in on this pass, not what came out of it. */}
          <p
            id="next-token-status"
            data-component="NextToken"
            role="status"
            className="text-muted-foreground text-xs"
          >
            {done
              ? t('next-token.done', { passes: PASSES.length })
              : t('next-token.pass', { pass: taken + 1, read: sofar.length })}
          </p>
        </div>
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
