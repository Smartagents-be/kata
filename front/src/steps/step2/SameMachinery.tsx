import type { Assistant } from '@/shared/assistant/assistant'
import { useAssistant } from '@/shared/assistant/useAssistant'
import { TaskCard } from '@/shared/components/TaskCard'

/**
 * The unit's closing task on the shared {@link TaskCard}: the kata opened in its dev container
 * (`.devcontainer/` at the repo root), the agent started inside it, and the same build run by both.
 *
 * `run-own-machine.3` tells the student to put the whole environment in a development container so
 * they and the agent work with the same machinery, and nothing in the repo showed one. This is that
 * sentence as a task. **Students do it themselves when they have Docker, Node and an agent
 * account, and watch the trainer do it otherwise.** No IDE is involved: every move is a
 * devcontainer CLI command, pinned and run through `npx`. The image carries Claude Code and Copilot CLI,
 * so only the `agent` move differs per assistant, on `SurviveTheClear`'s pattern: the slug swaps and
 * every other move is shared.
 *
 * It replaced `CountTheDay`, which asked the student to time their own day-to-day work: that cannot
 * be done in class, and the owner does not want students working on their own code. So this card,
 * unlike that one, names the kata and its commands on purpose. Its `run` move uses step 1's service
 * rather than step 2's, and `front/src/steps/step2/CLAUDE.md` says why.
 *
 * The card claims "the same machinery" and never isolation: the container has no firewall, and the
 * reasoning is in the same file.
 *
 * Ungraded, like every `TaskCard`; the tick is a bookmark and `TaskCard` says why.
 */
const MOVES: Record<Assistant, readonly string[]> = {
  claude: ['open', 'agent.claude', 'run', 'view', 'same', 'stop'],
  copilot: ['open', 'agent.copilot', 'run', 'view', 'same', 'stop'],
}

export function SameMachinery() {
  const { assistant } = useAssistant()

  return (
    <TaskCard
      block="same-machinery"
      namespace="step2"
      prefix="machinery"
      storageKey="kata.step2.machinery"
      moves={MOVES[assistant]}
      className="my-8"
    />
  )
}
