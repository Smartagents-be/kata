import { TaskCard } from '@/shared/components/TaskCard'

/**
 * Compare a vague direct ask with an implementation guided by reviewed requirements.
 * Restart the service and use a fresh session for each attempt to avoid leaking the brief.
 * Model, planning and requirements change together: the scores do not isolate causation.
 */
const MOVES = ['serve', 'ask', 'score', 'undo', 'interview', 'again'] as const

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
