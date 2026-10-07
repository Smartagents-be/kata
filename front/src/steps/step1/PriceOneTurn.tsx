import type { Assistant } from '@/shared/assistant/assistant'
import { useAssistant } from '@/shared/assistant/useAssistant'
import { TaskCard } from '@/shared/components/TaskCard'

/**
 * Read what a task cost, separately from how full the window is afterwards.
 *
 * Claude: `/usage` before and after, then an API estimate per model and token category.
 * Copilot: the AI credits IntelliJ's chat shows under each turn, added up and converted at $0.01 a
 * credit, with `/usage` as the route for Copilot CLI. Neither assistant's moves name the other's
 * command, so the slugs split rather than the labels, on `ReadYourWindow`'s reasoning: the card's
 * words come from the locale bundle, which `data-assistant` cannot reach.
 */
const MOVES: Record<Assistant, readonly string[]> = {
  claude: ['read', 'rate', 'sum'],
  copilot: ['ask.copilot', 'count.copilot', 'convert.copilot'],
}

export function PriceOneTurn() {
  const { assistant } = useAssistant()

  return (
    <TaskCard
      block="price-one-turn"
      namespace="step1"
      prefix="price"
      storageKey="kata.step1.price"
      moves={MOVES[assistant]}
      className="my-8"
    />
  )
}
