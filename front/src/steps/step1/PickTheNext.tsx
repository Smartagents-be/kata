import { useState } from 'react'
import { Button } from '@/shared/components/ui/button'
import { useTranslation } from 'react-i18next'
import { ChoiceKey, ChoiceMark, Panel, PanelNote } from '@/shared/components/Panel'
import { choiceLabelClass, choiceRowClass } from '@/shared/lib/choice'
import { cn } from '@/shared/lib/utils'

/**
 * The unit's one exercise, and it asks the question `NextToken`'s fan of scores only shows: given
 * three roads out of the same prompt, which word comes next. The answer is all three, because the
 * scores are a distribution and the model draws from it, which is exactly what
 * `tokens.one-at-a-time.3` argues. A student who has read the figure as a lookup table picks a word
 * and finds out here.
 *
 * **A different sentence from `NextToken` and `TokenAttention` on purpose.** Those two are a pair on
 * `the build failed because it timed out`, and reusing it would have this exercise answered by the
 * figure above rather than by the claim.
 *
 * **The fan is drawn flat until it is checked**, every limb and every word in the same muted stroke.
 * Marking one road before the answer is in would give it away, and marking one after would say the
 * model has a right answer here. So checking lights the whole fan: that is the answer drawn.
 *
 * **The scores are shown, and they are what make the question worth asking.** A fan of three roads
 * with no weights on it can be answered by shrugging. With `merged` at 46% against `approved` at
 * 23%, picking the favourite is the reasonable thing to do and it is still not the answer, which is
 * the misreading this exercise is here to catch. They are hand-authored like `NextToken`'s, and the
 * admission is in that figure's caption two drawings up the same page rather than repeated in a
 * caption here.
 *
 * **They add to 100, unlike `NextToken`'s**, and the difference is that this one has no caption. That
 * figure shows five of a distribution whose tail is too long to draw and says so underneath; three
 * numbers on a card with nothing under it are three numbers a student will add up, and a missing
 * seventeen points reads as a mistake rather than as a tail. Closing the sum also keeps the right
 * answer exactly true: the roads on screen are all the roads, so any of the three is the whole of it.
 *
 * The scores stay muted when the fan lights up, because the answer is the three words and not the
 * numbers beside them.
 *
 * Graded in the browser like `SpotInjection` and the quizzes, so it works with the service down. A
 * wrong pick is marked on the pick itself and the answer is then outlined in teal rather than red,
 * because red would say the word failed rather than the answer.
 */

/** Machine-shaped, so English in every language, like `NextToken`'s prompt. */
const PROMPT = ['the', 'pull', 'request', 'was']

/**
 * The three roads, each with what it would have led to, so the drawing is a tree and not a comb.
 * Ordered by score, like `NextToken`'s passes, so the favourite is the one at the top.
 */
const CANDIDATES = [
  { token: 'merged', p: 0.46, then: ['into', 'and'] },
  { token: 'closed', p: 0.31, then: ['without', 'after'] },
  { token: 'approved', p: 0.23, then: ['by', 'and'] },
] as const

type Choice = (typeof CANDIDATES)[number]['token'] | 'any'

/**
 * Deliberately not shuffled, unlike `SpotInjection`. `any` is a catch-all that reads as the last
 * option in a list, and one that turned up second reads as a bug rather than as a choice.
 */
const CHOICES: Choice[] = [...CANDIDATES.map((candidate) => candidate.token), 'any']

/** `NextToken`'s geometry, so the two drawings read as the same kind of picture. */
const ROW_HEIGHT = 26
const TOP_PAD = 16
const COLUMN_X = [60, 250, 500]
/**
 * How far short of a node a limb stops, clearing the half-width of the longest label at 13px mono
 * (`approved`, eight characters) so the line is not drawn through the word as a strikethrough.
 */
const NODE_GAP = 40
/** The score sits right of its word, so the twigs start further out than `NODE_GAP` would put them. */
const SCORE_X = 292
const TWIG_START = 350
const WIDTH = 700

/** Two leaves per candidate and none of them ends, so the rows are uniform and the maths is direct. */
const ROWS = CANDIDATES.length * 2
const HEIGHT = ROWS * ROW_HEIGHT + TOP_PAD * 2
const rowY = (row: number) => TOP_PAD + row * ROW_HEIGHT + ROW_HEIGHT / 2
const candidateY = (index: number) => (rowY(index * 2) + rowY(index * 2 + 1)) / 2

/** A flat S between two columns, so the branches read as one fan rather than a bundle of elbows. */
function limb(x1: number, y1: number, x2: number, y2: number): string {
  const mid = (x1 + x2) / 2
  return `M ${x1} ${y1} C ${mid} ${y1} ${mid} ${y2} ${x2} ${y2}`
}

export function PickTheNext() {
  // `useTranslation` rather than `useStepText`, which the other cards use: two of these messages
  // interpolate, and `text()` takes a key and nothing else. The figures in this unit read the same
  // way.
  const { t } = useTranslation('step1')

  const [picked, setPicked] = useState<Choice | null>(null)
  const [checked, setChecked] = useState(false)

  const right = picked === 'any'

  return (
    <Panel
      block="pick-the-next"
      state={checked ? 'checked' : 'open'}
      title={t('pick-next.title')}
      description={t('pick-next.description')}
      className="my-8"
      contentClassName="flex flex-col gap-5"
    >
      {/* What the model has read, with the chip it is about to write left open. */}
      <div
        id="pick-the-next-prompt"
        data-component="PickTheNext"
        role="img"
        aria-label={t('pick-next.prompt', { text: PROMPT.join(' ') })}
        className="flex flex-wrap items-center gap-1"
      >
        {PROMPT.map((token, index) => (
          <span
            key={`${token}-${index}`}
            id={`pick-the-next-prompt-${index}`}
            data-component="PickTheNext"
            className="border-border bg-muted text-muted-foreground rounded border px-1.5 py-0.5 font-mono text-sm"
          >
            {token}
          </span>
        ))}
        <span
          id="pick-the-next-prompt-pending"
          data-component="PickTheNext"
          className="border-primary/40 text-primary/60 rounded border border-dashed px-1.5 py-0.5 font-mono text-sm"
        >
          ?
        </span>
      </div>

      <svg
        id="pick-the-next-tree"
        data-component="PickTheNext"
        data-state={checked ? 'answered' : 'open'}
        viewBox={`0 0 ${WIDTH} ${HEIGHT}`}
        role="img"
        aria-label={t('pick-next.tree')}
        className="h-auto w-full"
      >
        <g fill="none" strokeWidth="1.5">
          {CANDIDATES.map((candidate, index) => (
            <path
              key={`limb-${candidate.token}`}
              id={`pick-the-next-tree-limb-${index}`}
              data-component="PickTheNext"
              d={limb(COLUMN_X[0] + 22, HEIGHT / 2, COLUMN_X[1] - NODE_GAP, candidateY(index))}
              className={checked ? 'stroke-primary' : 'stroke-border'}
            />
          ))}
          {CANDIDATES.map((candidate, index) =>
            candidate.then.map((child, childIndex) => (
              <path
                key={`twig-${candidate.token}-${child}`}
                id={`pick-the-next-tree-twig-${index}-${childIndex}`}
                data-component="PickTheNext"
                d={limb(
                  TWIG_START,
                  candidateY(index),
                  COLUMN_X[2] - NODE_GAP,
                  rowY(index * 2 + childIndex),
                )}
                className="stroke-border"
              />
            )),
          )}
        </g>

        <text
          id="pick-the-next-tree-root"
          data-component="PickTheNext"
          x={COLUMN_X[0]}
          y={HEIGHT / 2}
          fontSize="13"
          textAnchor="middle"
          dominantBaseline="middle"
          className="fill-foreground font-mono"
        >
          {PROMPT[PROMPT.length - 1]}
        </text>

        {CANDIDATES.map((candidate, index) => (
          <text
            key={`node-${candidate.token}`}
            id={`pick-the-next-tree-node-${index}`}
            data-component="PickTheNext"
            x={COLUMN_X[1]}
            y={candidateY(index)}
            fontSize="13"
            textAnchor="middle"
            dominantBaseline="middle"
            className={cn('font-mono', checked ? 'fill-primary' : 'fill-muted-foreground')}
          >
            {candidate.token}
          </text>
        ))}

        {/* Muted whether or not the fan is lit: the answer is the three words, not the numbers. */}
        {CANDIDATES.map((candidate, index) => (
          <text
            key={`score-${candidate.token}`}
            id={`pick-the-next-tree-score-${index}`}
            data-component="PickTheNext"
            x={SCORE_X}
            y={candidateY(index)}
            fontSize="12"
            textAnchor="start"
            dominantBaseline="middle"
            className="fill-muted-foreground font-mono tabular-nums"
          >
            {Math.round(candidate.p * 100)}%
          </text>
        ))}

        {CANDIDATES.map((candidate, index) =>
          candidate.then.map((child, childIndex) => (
            <text
              key={`leaf-${candidate.token}-${child}`}
              id={`pick-the-next-tree-leaf-${index}-${childIndex}`}
              data-component="PickTheNext"
              x={COLUMN_X[2]}
              y={rowY(index * 2 + childIndex)}
              fontSize="13"
              textAnchor="middle"
              dominantBaseline="middle"
              className="fill-muted-foreground/70 font-mono"
            >
              {child}
            </text>
          )),
        )}
      </svg>

      <ul
        id="pick-the-next-choices"
        data-component="PickTheNext"
        className="border-border/70 border-t"
      >
        {CHOICES.map((choice, index) => {
          const isPick = picked === choice
          const state = !checked
            ? isPick
              ? 'picked'
              : 'open'
            : isPick
              ? right
                ? 'right'
                : 'wrong'
              : choice === 'any'
                ? 'answer'
                : 'clean'
          return (
            <li key={choice} id={`pick-the-next-choice-${index}`} data-component="PickTheNext">
              <button
                id={`pick-the-next-choice-${index}-pick`}
                data-component="PickTheNext"
                data-state={state}
                type="button"
                disabled={checked}
                aria-pressed={isPick}
                onClick={() => setPicked(choice)}
                // The three words are what the machine would write, so they are set in mono. The
                // catch-all is a sentence about them and stays in the reading face.
                className={choiceRowClass(state, checked)}
              >
                <ChoiceKey
                  id={`pick-the-next-choice-${index}-key`}
                  state={state}
                  index={index}
                />
                <span
                  id={`pick-the-next-choice-${index}-label`}
                  data-component="PickTheNext"
                  className={cn(choiceLabelClass(state), choice !== 'any' && 'font-mono')}
                >
                  {choice === 'any' ? t('pick-next.any') : choice}
                </span>
                <ChoiceMark idBase={`pick-the-next-choice-${index}`} state={state} />
              </button>
            </li>
          )
        })}
      </ul>

      {checked && (
        <PanelNote id="pick-the-next-verdict" tone={right ? 'success' : 'destructive'}>
          <span id="pick-the-next-verdict-line" data-component="PickTheNext" className="block">
            {t(right ? 'pick-next.right' : 'pick-next.wrong')}
          </span>
          {/* One line for all three wrong picks, since it is the same mistake either way. */}
          {!right && picked && (
            <span
              id="pick-the-next-verdict-pick"
              data-component="PickTheNext"
              className="text-muted-foreground mt-2 block"
            >
              {t('pick-next.explanation', { token: picked })}
            </span>
          )}
        </PanelNote>
      )}

      <div id="pick-the-next-actions" data-component="PickTheNext" className="flex justify-end">
        {checked ? (
          <Button
            id="pick-the-next-retry"
            data-component="PickTheNext"
            type="button"
            variant="outline"
            onClick={() => {
              setPicked(null)
              setChecked(false)
            }}
          >
            {t('pick-next.retry')}
          </Button>
        ) : (
          <Button
            id="pick-the-next-check"
            data-component="PickTheNext"
            type="button"
            disabled={picked === null}
            onClick={() => setChecked(true)}
          >
            {t('pick-next.check')}
          </Button>
        )}
      </div>
    </Panel>
  )
}
