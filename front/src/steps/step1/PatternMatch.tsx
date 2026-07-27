import { ConnectBoard, type ConnectItem } from '@/shared/components/ConnectBoard'

/** The four ways of splitting the work this unit names, in the order the prose introduces them. */
const PATTERNS = ['coordinator', 'decomposition', 'sequential', 'reflection'] as const

/**
 * Three situations against four patterns. Decomposition sits on the board with no situation
 * pointing at it, so the fourth option is not free by elimination.
 *
 * The answer is a pattern id, and the message keys are built from the situation's id, so a
 * situation and the sentence explaining it stay in one place.
 */
const SCENARIOS: readonly ConnectItem[] = [
  { id: 'critic', answer: 'reflection' },
  { id: 'upgrade', answer: 'sequential' },
  { id: 'delegate', answer: 'coordinator' },
]

/**
 * The unit's closing exercise, on the shared {@link ConnectBoard}: drag a line from each situation
 * to the pattern it is, checked in the browser. `model`'s `PickTheTier` is the same board with
 * other data, so anything about how the board behaves belongs there rather than here.
 *
 * Both columns shuffle, unlike the tier board's: these four are a set of options rather than a
 * scale, so there is no order to keep.
 */
export function PatternMatch() {
  return (
    <ConnectBoard
      block="pattern-match"
      namespace="step1"
      prefix="match"
      items={SCENARIOS}
      targets={PATTERNS}
      targetKey={(pattern) => `match.pattern.${pattern}`}
      shuffleTargets
    />
  )
}
