import type { Assistant } from '@/shared/assistant/assistant'
import { useAssistant } from '@/shared/assistant/useAssistant'
import { TaskCard } from '@/shared/components/TaskCard'

/**
 * The unit's hands-on task, on the shared {@link TaskCard}: four of its moves run against
 * `exercises/step2/java` with an agent open beside them.
 *
 * The unit ran to eleven hundred words and every move in it is physical, so it was eleven hundred
 * words a student could only agree with. The card is the same moves in the order the sections
 * argue them: stop a run, queue a sentence into one, make a run stop at a gap, and put an agent in
 * a worktree of its own.
 *
 * **The `gap` move is why the card exists.** `LateFeePolicy` computes in cents and names no
 * currency anywhere in `exercises/step2/java`, so asking for the fee in euros walks an agent straight
 * into an undecided thing. It is the only place in the course where a student watches an agent
 * decline to guess, which is what the `## Gaps` rule buys and what no amount of prose demonstrates.
 *
 * Four moves rather than five: the rewind experiment belongs to the `data-audience="self"` aside
 * further up the unit, which owns it, and a card move repeating it would say it twice to the one
 * reader who gets both.
 *
 * **The `queue` move splits by assistant**, on `CheckPermissions`'s pattern: the Copilot move names
 * the Copilot agent, because IntelliJ's Local agent cannot take a sentence mid-run, and it ends on
 * Send Immediately (rehearsed in IntelliJ, 13 October 2026).
 *
 * Ungraded, like every `TaskCard`; the tick is a bookmark and `TaskCard` says why.
 */
const MOVES: Record<Assistant, readonly string[]> = {
  claude: ['escape', 'queue.claude', 'gap', 'worktree'],
  copilot: ['escape', 'queue.copilot', 'gap', 'worktree'],
}

export function SteerARun() {
  const { assistant } = useAssistant()

  return (
    <TaskCard
      block="steer-a-run"
      namespace="step2"
      prefix="steer"
      storageKey="kata.step2.steer"
      moves={MOVES[assistant]}
      className="my-8"
    />
  )
}
