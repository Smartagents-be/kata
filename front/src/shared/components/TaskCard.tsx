import { motion } from 'motion/react'
import { useState } from 'react'
import { useTranslation } from 'react-i18next'
import { Panel, PanelChip, PanelRow } from '@/shared/components/Panel'
import { useStepText } from '@/shared/i18n/useStepText'
import { cn } from '@/shared/lib/utils'
import { CheckTick } from '@/shared/motion/CheckTick'
import { GESTURE_STATES } from '@/shared/motion/motion'

/**
 * Where the moves a student has worked are kept, hung off the card's own `storageKey` so a card
 * owns one place in storage rather than two unrelated ones. It stays under the `kata.step<N>.`
 * prefix that way, which is the only thing `shared/lib/reset.ts` matches on.
 */
const MOVES_SUFFIX = '.moves'

function readDone(storageKey: string): boolean {
  try {
    return localStorage.getItem(storageKey) === 'done'
  } catch {
    return false
  }
}

function writeDone(storageKey: string, done: boolean) {
  try {
    if (done) {
      localStorage.setItem(storageKey, 'done')
    } else {
      localStorage.removeItem(storageKey)
    }
  } catch {
    // A browser refusing storage costs the tick, not the exercise.
  }
}

/**
 * The worked moves, **keyed by slug rather than by position**. `ReadYourWindow` and
 * `SurviveTheClear` swap one slug when the assistant setting changes, so an index would carry a
 * tick from `write.claude` onto `write.copilot`: the student would come back to a move marked done
 * that they were never shown. By slug, the moves they share stay ticked and the one that changed
 * comes back open, which is the truth.
 *
 * Anything unreadable in there is treated as nothing worked. A tick is a bookmark, so the cost of
 * getting this wrong has to be a lost bookmark and never a crash on a stored value from an older
 * shape of this component.
 */
function readMoves(storageKey: string): ReadonlySet<string> {
  try {
    const stored = localStorage.getItem(storageKey + MOVES_SUFFIX)
    if (stored === null) return new Set()
    const parsed: unknown = JSON.parse(stored)
    return new Set(Array.isArray(parsed) ? parsed.filter((move) => typeof move === 'string') : [])
  } catch {
    return new Set()
  }
}

function writeMoves(storageKey: string, moves: ReadonlySet<string>) {
  try {
    if (moves.size === 0) {
      localStorage.removeItem(storageKey + MOVES_SUFFIX)
    } else {
      localStorage.setItem(storageKey + MOVES_SUFFIX, JSON.stringify([...moves]))
    }
  } catch {
    // Same as above: storage is where a bookmark is kept, not where the exercise lives.
  }
}

/**
 * A hands-on task on one card: a title, an optional line saying what the task is, the moves in the
 * order they are taken, a count of how far through them you are, and a tick for the whole thing.
 * The description is left out when the prose above the card already says where the work happens and
 * what to watch for, which is why the key is looked up rather than assumed: `ReadYourWindow` has no
 * `window.description` and no gap where one would have been. Nothing here is graded, and nothing is
 * submitted.
 * Every task in the course is this component with different data (`PlanItTwice` in step 1's
 * `prompt`, `ConnectOne` in `tools`, `ReadYourWindow` in `context`, `SurviveTheClear` in `session`,
 * `CutItUp` in `harness`, `PriceOneTurn` in `model`, `OneWindow` in `workshop`, `SetYourAssistant`
 * in step 0's `welcome`, `WhereWouldItGo` in step 2's `engineering`, `WhatYouTakeBack` in step 3),
 * so keep additions here rather than in a caller.
 *
 * **Every move is its own tick, and the card keeps one of its own underneath.** The two say
 * different things and that is why there are both: a move's tick is where you are in the sitting,
 * and the card's tick is whether the sitting is behind you. The moves are what make the first
 * useful, because a task worked over two evenings otherwise comes back with nothing on it saying
 * which half was the first one. The count on the opening rule is that state read at a glance, in
 * the same slot a flag board puts its five-of-five.
 *
 * The card's own tick is deliberately **not** derived from the moves. It stays the student's to
 * set: a run at a problem can be finished with a move skipped on purpose, and a card that ticked
 * itself would be grading the sitting, which nothing here does.
 *
 * **A one-move card gets neither the count nor a per-move tick**, and the reasoning is
 * `ShutterFlag`'s beside a five-row board: "0 of 1 done" is arithmetic nobody asked for, and a move
 * that toggles directly above a card tick that means the same thing is two controls for one fact.
 * So `SetYourAssistant` in step 0 is a title and a line, the way it always was.
 *
 * Every tick is a bookmark rather than a mark: it says what is still ahead of you when you come
 * back tomorrow, which is why both are written to localStorage. They are `role="checkbox"` buttons
 * rather than bare click handlers so a keyboard reaches them and a screen reader is told what state
 * they are in; the `Done` chip is `aria-hidden` for the same reason, since `aria-checked` has
 * already said it.
 *
 * Every move is one line and nothing else. Whatever a second line would have explained belongs in
 * the prose above the card rather than back in here.
 */
export function TaskCard({
  block,
  namespace,
  prefix,
  storageKey,
  moves,
  className,
}: {
  /**
   * The BEM block every id on this card is built from, e.g. `cut-it-up`. It is the card's own name
   * for itself rather than a React component name, so the caller can be renamed without moving the
   * ids.
   */
  block: string
  /** The step the text belongs to; every key below is read from that step's namespace. */
  namespace: string
  /**
   * The prefix the card's own keys sit under: `<prefix>.title`, `<prefix>.todo`, `<prefix>.done`,
   * and `<prefix>.<move>.label` for each move. `<prefix>.description` is optional; with no entry the
   * card is a title and its moves.
   */
  prefix: string
  /**
   * Where the ticks are kept. Use the `kata.step<N>.` prefix, so the reset in the settings panel
   * clears them with the rest of a student's progress. The card's own tick is this key and the
   * worked moves are `<storageKey>.moves`. See `shared/lib/reset.ts`.
   */
  storageKey: string
  /** The moves, in the order they are taken. Numbered on screen from one. */
  moves: readonly string[]
  className?: string
}) {
  const { text, has } = useStepText(namespace)
  const { t } = useTranslation()

  const [done, setDone] = useState(() => readDone(storageKey))
  const [worked, setWorked] = useState<ReadonlySet<string>>(() => readMoves(storageKey))

  /** See the note above on one-move cards: nothing to count, and nothing worth ticking twice. */
  const perMove = moves.length > 1

  // Counted over the moves on screen rather than over everything in storage, so an assistant switch
  // cannot leave the count reading four of three off a slug that is no longer shown.
  const workedCount = moves.filter((move) => worked.has(move)).length

  function toggle() {
    setDone((current) => {
      writeDone(storageKey, !current)
      return !current
    })
  }

  function toggleMove(move: string) {
    setWorked((current) => {
      const next = new Set(current)
      if (!next.delete(move)) {
        next.add(move)
      }
      writeMoves(storageKey, next)
      return next
    })
  }

  return (
    <Panel
      block={block}
      state={done ? 'done' : 'open'}
      eyebrow={
        perMove ? t('task.progress', { done: workedCount, total: moves.length }) : undefined
      }
      title={text(`${prefix}.title`)}
      description={has(`${prefix}.description`) ? text(`${prefix}.description`) : undefined}
      className={className}
    >
      {/*
        The moves take the numeral gutter every panel's list takes, so a task and a flag board are
        numbered the same way, but `dense`: no rail, because on a row this short there is nothing
        for it to span. The rules between them arrived with the ticks, since a column of targets has
        to say where one ends and the next begins; `PanelRow` carries the reasoning for the split.

        The column is pulled out by the padding a dense row carries, so a tinted row's fill and the
        rules run wider than the words while the numerals still start on the same edge as the title
        and the intro above them.
      */}
      <ol id={`${block}-moves`} data-component="TaskCard" className="-mx-3">
        {moves.map((move, index) => {
          const id = `${block}-move-${index}`
          const workedMove = perMove && worked.has(move)

          return (
            <PanelRow
              key={move}
              id={id}
              index={index}
              state={perMove ? (workedMove ? 'done' : 'open') : undefined}
              tinted={workedMove}
              dense
            >
              {perMove ? (
                <button
                  type="button"
                  role="checkbox"
                  aria-checked={workedMove}
                  onClick={() => toggleMove(move)}
                  id={`${id}-toggle`}
                  data-component="TaskCard"
                  data-state={workedMove ? 'done' : 'open'}
                  // The chip flows after the words rather than sitting at the right edge, and it is
                  // inline rather than a flex sibling so it follows them when a move wraps. A move
                  // row runs the whole width of the column, so a badge parked at the far end is an
                  // inch of whitespace from the sentence it is about and reads as a second column;
                  // as a flex sibling it went there anyway the moment the label filled the line.
                  className="focus-visible:ring-ring/50 block w-full rounded-md py-2 text-left outline-none focus-visible:ring-3"
                >
                  <span
                    id={`${id}-label`}
                    data-component="TaskCard"
                    className={cn(
                      'text-sm transition-colors',
                      workedMove && 'text-muted-foreground',
                    )}
                  >
                    {text(`${prefix}.${move}.label`)}
                  </span>
                  {workedMove && (
                    <span
                      id={`${id}-chip`}
                      data-component="TaskCard"
                      aria-hidden
                      className="ml-2.5 inline-flex align-middle"
                    >
                      <PanelChip id={`${id}-chip-badge`}>{t('task.moveDone')}</PanelChip>
                    </span>
                  )}
                </button>
              ) : (
                <span id={`${id}-label`} data-component="TaskCard" className="text-sm">
                  {text(`${prefix}.${move}.label`)}
                </span>
              )}
            </PanelRow>
          )
        })}
      </ol>

      {/*
        The list closes on a hairline the way the panel opened on one, so the card's own tick reads
        as being about the whole thing rather than as a sixth move. It is only drawn where there are
        move rules for it to close.
      */}
      {perMove && (
        <div
          id={`${block}-rule`}
          data-component="TaskCard"
          aria-hidden
          className="bg-border/50 -mx-3 mt-3 h-px"
        />
      )}

      {/*
        The gestures are recognised here and worn by the tick, which is why the button is a
        `motion` element with nothing of its own to animate: the target is the whole row, and a
        disc that answered to its own 24 pixels would be a second, smaller control sitting inside
        the first. `GESTURE_STATES` carries the two names both sides agree on.

        **The tick is the affordance and it carries no box.** It was a full-width bordered bar, which
        under a borderless list read as the card that had just been taken away, and then a bordered
        pill, which was the same argument at a smaller size. What says "press me" is the empty disc
        and the word beside it, the same way `HintDialog` is a lightbulb and a word: this block has
        one control of its own, and on a surface with no panel on it a border is the loudest thing on
        the page. It is flush with the numerals, so the whole block starts on one edge.
      */}
      <motion.button
        type="button"
        role="checkbox"
        aria-checked={done}
        onClick={toggle}
        {...GESTURE_STATES}
        id={`${block}-toggle`}
        data-component="TaskCard"
        data-state={done ? 'done' : 'open'}
        className="text-muted-foreground hover:text-foreground focus-visible:ring-ring/50 -mx-2 mt-4 flex w-fit items-center gap-2.5 rounded-lg px-2 py-1.5 text-left text-sm font-medium outline-none transition-colors focus-visible:ring-3"
      >
        <CheckTick id={`${block}-toggle-tick`} component="TaskCard" checked={done} />
        <span
          id={`${block}-toggle-label`}
          data-component="TaskCard"
          className={cn('transition-colors', done && 'text-muted-foreground')}
        >
          {text(done ? `${prefix}.done` : `${prefix}.todo`)}
        </span>
      </motion.button>
    </Panel>
  )
}
