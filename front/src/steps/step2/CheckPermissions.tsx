import type { Assistant } from '@/shared/assistant/assistant'
import { useAssistant } from '@/shared/assistant/useAssistant'
import { TaskCard } from '@/shared/components/TaskCard'

/**
 * Test a permission rule in a disposable folder with dummy files.
 *
 * Every move carries a copyable command, on `SurviveTheClear`'s and step 1's `window` card's
 * pattern: the student runs it rather than writes it (owner's asking, 11 October 2026). The moves
 * that name a product's own file or flag split by assistant and carry the suffix; making the folder,
 * the task prompt and the clean-up are shared. Claude needs a sixth move, because its rules live in a
 * file it has to be given, while Copilot's go on its command line. Both sets were run on
 * 11 October 2026. Claude Code: a `Read(./blocked.txt)` deny refused Read and `cat`, while `cp` and a
 * Node read came back as needing approval, and an `allow` entry only counts once the folder is
 * trusted. Copilot CLI 1.0.95: `--deny-tool='read(blocked.txt)'` refused the view tool, `shell(touch)`
 * ran unasked, `cp` took the ask path, and `head blocked.txt` still printed the file. The `explain`
 * move is that last probe in each product, because it is where a permission stops and a sandbox
 * would have to start.
 */
const MOVES: Record<Assistant, readonly string[]> = {
  claude: ['prepare', 'restrict.claude', 'start.claude', 'test', 'explain.claude', 'clean'],
  copilot: ['prepare', 'start.copilot', 'test', 'explain.copilot', 'clean'],
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
