import { TaskCard } from '@/shared/components/TaskCard'

/**
 * The unit's hands-on task, on the shared {@link TaskCard}: run one real ask twice, once straight
 * and once through plan mode, and say which of the two you would ship.
 *
 * The fourth move is what makes it an exercise rather than a demonstration. `plan-mode.2` claims a
 * cheaper model driven through a plan routinely beats a one-shot on the expensive one, and that is a
 * claim a student can only be told until they have watched it happen on their own task. Choosing is
 * the watching. It replaced an aside that said the same thing as reading, which is the move
 * `ConnectOne` made in `tools`.
 *
 * The task is worked **in the student's own project**, like `SurviveTheClear`, because the ask has
 * to be one they were actually about to type. It names no command: plan mode is reached differently
 * in each product, and a card is not where a menu belongs.
 */
const MOVES = ['take', 'straight', 'through', 'choose'] as const

export function PlanItTwice() {
  return (
    <TaskCard
      block="plan-it-twice"
      namespace="step1"
      prefix="plan"
      storageKey="kata.step1.plan"
      moves={MOVES}
      className="my-8"
    />
  )
}
