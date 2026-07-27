import { TaskCard } from '@/shared/components/TaskCard'

/**
 * Four moves, and the first and last are a pair: the same reading taken with the server connected
 * and with it gone. The count between them is the exercise, so neither move can be dropped without
 * leaving a number with nothing to compare it to.
 */
const MOVES = ['fresh', 'read', 'ask', 'remove'] as const

/**
 * The unit's second hands-on task, on the shared {@link TaskCard}: run `/context` against the
 * student's own window. `BudgetWindow` above totals six invented calls; this one totals a real
 * session, which is the only place in the course the command is used rather than described.
 *
 * It sits here rather than in `context` because the window it reads is the one `connect-one` just
 * filled, and because it puts a number on this unit's own claim that a tool costs you by existing.
 * Nothing is graded; the tick is a bookmark, and `TaskCard` says why.
 *
 * The card carries no description line. The two paragraphs above it already say where the work
 * happens and that the number is the point, so the key is absent rather than empty.
 */
export function ReadYourWindow() {
  return (
    <TaskCard
      block="read-your-window"
      namespace="step1"
      prefix="window"
      storageKey="kata.step1.window"
      moves={MOVES}
      className="my-8"
    />
  )
}
