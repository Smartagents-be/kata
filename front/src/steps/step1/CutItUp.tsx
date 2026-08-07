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
 * why a move ticks as well as the card, belongs in `TaskCard` rather than here.
 *
 * This is the card the per-move tick was designed against, and the five moves are why: cutting a
 * real under-specified file up twice and then building it is not one evening, so the ticks are what
 * let a student put it down after `compare` and pick it up at `plan`.
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
