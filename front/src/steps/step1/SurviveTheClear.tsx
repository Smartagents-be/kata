import { TaskCard } from '@/shared/components/TaskCard'

/**
 * Four moves, and the third is the one that makes it an exercise rather than a note. Writing the
 * line down proves nothing; throwing the session away and asking again is what proves it carried.
 */
const MOVES = ['find', 'write', 'clear', 'ask'] as const

/**
 * The unit's hands-on task, on the shared {@link TaskCard}: put one standing instruction in
 * `CLAUDE.md` and then clear the session to see whether it survived.
 *
 * It is the one thing in the step a student does to their own project rather than to this repo,
 * which is deliberate: the line has to be one they were tired of repeating, and only they know
 * which one that is. So the card names no example instruction. Nothing is graded here either; the
 * tick is a bookmark, and `TaskCard` says why.
 */
export function SurviveTheClear() {
  return (
    <TaskCard
      block="survive-the-clear"
      namespace="step1"
      prefix="survive"
      storageKey="kata.step1.survive"
      moves={MOVES}
      className="my-8"
    />
  )
}
