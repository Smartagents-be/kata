import { ConnectBoard, type ConnectItem } from '@/shared/components/ConnectBoard'

/**
 * The three tiers, in the order `ModelTiers` draws them, and they do not shuffle. That is the one
 * place this board departs from `PatternMatch`, and it is deliberate: this is an ordered scale, so a
 * scrambled column would read as noise rather than as a fair board. The situations shuffle, which is
 * what keeps an answer from being learned as a position.
 *
 * Names come from `tiers.*.name`, the keys the figure above already uses, so the board and the cards
 * cannot drift apart. The order is theirs too, cheapest first, which is `ModelPricing`'s and the one
 * the ratio in `model.cost.1` reads in. The answers are keyed by tier rather than by position, so
 * reordering this column moves no answer, only the scale the student reads down.
 */
const TIERS = ['haiku', 'sonnet', 'opus'] as const

/**
 * Five situations against three tiers, so nothing falls out by elimination the way a one-to-one
 * board would give it away. `plan` is the trap: it looks big enough for the top tier until you
 * notice the plan already did the thinking.
 *
 * `redact` is the one that cannot be got wrong, and that is the point of it. Every tier will strip
 * those lines; what changes is how much gets past the strip. Marking a judgement call right or wrong
 * would teach that there is a lookup table here, so `any` brings it back amber instead, which is
 * this design system's caution colour rather than either verdict.
 */
const SCENARIOS: readonly ConnectItem[] = [
  { id: 'queues', answer: 'haiku' },
  { id: 'redact', answer: 'any' },
  { id: 'limit', answer: 'sonnet' },
  { id: 'plan', answer: 'sonnet' },
  { id: 'flaky', answer: 'opus' },
]

/**
 * The unit's closing exercise, on the shared {@link ConnectBoard}: it is the same drag-to-connect
 * board a student already met in `harness` as `PatternMatch`, so the interaction costs them nothing
 * to learn twice. Anything about how the board behaves belongs there rather than here.
 *
 * The tier names are mono because they are names the machine answers to, like every other
 * machine-shaped string in the step.
 */
export function PickTheTier() {
  return (
    <ConnectBoard
      block="pick-the-tier"
      namespace="step1"
      prefix="pick"
      items={SCENARIOS}
      targets={TIERS}
      targetKey={(tier) => `tiers.${tier}.name`}
      targetFont="mono"
      className="my-8"
    />
  )
}
