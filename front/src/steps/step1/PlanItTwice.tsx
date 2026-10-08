import { TaskCard } from '@/shared/components/TaskCard'

/**
 * Steering after the code against steering before it. Both runs use the same short prompt and the
 * same rule, and run 2 runs on a cheaper model, at the course owner's asking, to cut its cost: a wish only reaches the agent as a reaction, never pasted up front. Run 1
 * corrects the built code in at most 3 rounds, run 2 corrects the plan and then the code. What
 * differs is when the context arrives and the model, so it is a comparison, not an experiment.
 * Restart the service and use a fresh agent per run.
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
