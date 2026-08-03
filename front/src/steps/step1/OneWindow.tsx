import { TaskCard } from '@/shared/components/TaskCard'

/**
 * Four moves, and the first and third are a pair: the same reading taken before the hunt starts and
 * again when the last flag lands. The board underneath grades the three flags; this card grades
 * nothing and is what makes the hunt a step 1 capstone rather than a puzzle, because it is the only
 * thing on the page that asks the student to look at their own window while they work.
 *
 * The fourth move is the debrief that used to sit over the board as prose. It belongs here, in the
 * student's hands, and it belongs after the work rather than before it: which flag you could hand
 * over whole is a thing you find out by handing it over.
 *
 * Nothing is graded and nothing is submitted. The tick is a bookmark, on the same reasoning
 * {@link TaskCard} gives, and it is written under the `kata.step1.` prefix so the reset in the
 * settings panel clears it with the rest.
 */
const MOVES = ['read', 'work', 'count', 'judge'] as const

export function OneWindow() {
  return (
    <TaskCard
      block="one-window"
      namespace="step1"
      prefix="hunt"
      storageKey="kata.step1.hunt"
      moves={MOVES}
      className="my-8"
    />
  )
}
