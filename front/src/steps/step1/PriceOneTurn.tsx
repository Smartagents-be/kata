import { TaskCard } from '@/shared/components/TaskCard'

/**
 * Three moves, and they are `model.cost.4` asked for instead of described. That paragraph is the one
 * place the course multiplies, and until this card arrived it was an instruction with nothing
 * collecting the result: `ReadYourWindow` in `context` makes the student run `/context` and read a
 * count, and no other page in the course ever spends that number.
 *
 * The rate comes off `ModelPricing` a screen up, so the card names no currency and no figure of its
 * own. It grades nothing and it is deliberately not a second board: the sum is the student's own
 * window, so nobody but them can check it.
 *
 * No assistant variant. `/context` is the same command in both products, which is what
 * `ReadYourWindow`'s later moves already rely on.
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
