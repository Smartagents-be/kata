import { TaskCard } from '@/shared/components/TaskCard'

/**
 * The five moves over one problem, in the order they are taken. `compare` is the one that is not
 * work on the problem, and it is the reason the first two are separate moves rather than one.
 */
const MOVES = ['alone', 'agent', 'compare', 'plan', 'build'] as const

/**
 * The unit's hands-on task, on the shared {@link TaskCard}: `kata/step1/java/problem.md`, cut by
 * hand, cut again with the agent, the two cuts compared, then a plan on disk and the build.
 *
 * Six paragraphs said this once, and the compression is the point: the student reads the moves at a
 * glance and spends the time on the problem instead. Anything about how the card behaves, including
 * why there is one tick rather than five, belongs in `TaskCard` rather than here.
 */
export function CutItUp() {
  return (
    <TaskCard
      block="cut-it-up"
      namespace="step1"
      prefix="cut"
      storageKey="kata.step1.cut"
      moves={MOVES}
      className="my-8"
    />
  )
}
