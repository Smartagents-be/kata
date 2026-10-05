import { TaskCard } from '@/shared/components/TaskCard'

/**
 * Read /usage before and after a task, separately from /context occupancy.
 * Both CLI products expose /usage; unavailable categories remain unknown.
 * Estimates use each model and token category's rate, not window growth.
 */
const MOVES = ['read', 'rate', 'sum'] as const

export function PriceOneTurn() {
  return (
    <TaskCard
      block="price-one-turn"
      namespace="step1"
      prefix="price"
      storageKey="kata.step1.price"
      moves={MOVES}
      className="my-8"
    />
  )
}
