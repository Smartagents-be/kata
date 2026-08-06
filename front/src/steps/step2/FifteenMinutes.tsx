import { TaskCard } from '@/shared/components/TaskCard'

/**
 * The unit's closing exercise on the shared {@link TaskCard}: fifteen minutes on a clock, one of
 * the three skeletons the prose lists, and nothing graded.
 *
 * The exercise was prose only, and guided mode is the default: it drops every run of prose and
 * keeps the figures, so a class arrived at the bottom of this unit with three drawings and nothing
 * to do. The card is the exercise surviving that cut. A self-learner reads the paragraphs and the
 * card, and the two say the same thing at different lengths, which is why the prose above it was
 * left exactly as it was.
 *
 * **It grades nothing, and that is a condition of it existing.** The clock is the constraint and
 * the answer is the list of details the student did not reach, so a checker would be marking the
 * wrong thing. The `write` move is the one that carries the lesson: everything before it is setup.
 *
 * The `pick` move names the three options rather than repeating them, and no move touches what each
 * option's second sentence leaves out. That sentence is what makes each one a skeleton rather than
 * a small feature, so the card points back at it instead of copying it.
 */
const MOVES = ['clock', 'pick', 'shape', 'loop', 'write'] as const

export function FifteenMinutes() {
  return (
    <TaskCard
      block="fifteen-minutes"
      namespace="step2"
      prefix="fifteen"
      storageKey="kata.step2.fifteen"
      moves={MOVES}
      className="my-8"
    />
  )
}
