import type { Assistant } from '@/shared/assistant/assistant'
import { useAssistant } from '@/shared/assistant/useAssistant'
import { TaskCard } from '@/shared/components/TaskCard'

/**
 * Five moves, each with something to copy: plant an out-of-date rule plus `bad-context-bad.3`'s
 * rule, start the agent, give a fixed task, contradict the rule, put everything back. The stale
 * rule names a `web` package nothing in the code uses, because a rule the code does not contradict
 * is the one an agent follows; why that was measured is in step 1's CLAUDE.md. Planting and cleanup
 * split by assistant, since Claude Code reads the project's `CLAUDE.md` and Copilot CLI reads an
 * `AGENTS.md` in the current folder; typing it `Record<Assistant, …>` keeps a third assistant a
 * compile error. The card carries no description line, the key absent rather than empty.
 */
const MOVES: Record<Assistant, readonly string[]> = {
  claude: ['plant.claude', 'start.claude', 'ask', 'contradict', 'undo.claude'],
  copilot: ['plant.copilot', 'start.copilot', 'ask', 'contradict', 'undo.copilot'],
}

export function ReadYourWindow() {
  const { assistant } = useAssistant()

  return (
    <TaskCard
      block="read-your-window"
      namespace="step1"
      prefix="window"
      storageKey="kata.step1.window"
      moves={MOVES[assistant]}
      className="my-8"
    />
  )
}
