import type { Assistant } from '@/shared/assistant/assistant'
import { useAssistant } from '@/shared/assistant/useAssistant'
import { TaskCard } from '@/shared/components/TaskCard'

/**
 * Verify tool permissions and sandbox enforcement using disposable dummy files.
 *
 * All five moves name a product's own file, setting or command, so all five split by assistant, on
 * `SurviveTheClear`'s pattern in step 1, and both sets carry the suffix. The Copilot moves were run once against Copilot CLI 1.0.95
 * in October 2026: with `blocked.txt` in `sandbox.userPolicy.filesystem.deniedPaths`, both the view
 * tool and Node through the shell were refused, and `allowed.txt` came back on both routes. Copilot
 * keeps sandbox paths in the user's own settings rather than the repository, which is why its last
 * move takes them out again before the folder goes.
 */
const MOVES: Record<Assistant, readonly string[]> = {
  claude: ['prepare.claude', 'restrict.claude', 'test.claude', 'explain.claude', 'clean.claude'],
  copilot: ['prepare.copilot', 'restrict.copilot', 'test.copilot', 'explain.copilot', 'clean.copilot'],
}

export function CheckPermissions() {
  const { assistant } = useAssistant()

  return (
    <TaskCard
      block="check-permissions"
      namespace="step2"
      prefix="access"
      storageKey="kata.step2.access"
      moves={MOVES[assistant]}
      className="my-8"
    />
  )
}
