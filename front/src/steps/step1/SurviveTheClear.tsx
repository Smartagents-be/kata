import type { Assistant } from '@/shared/assistant/assistant'
import { useAssistant } from '@/shared/assistant/useAssistant'
import { TaskCard } from '@/shared/components/TaskCard'

/**
 * Four moves, and the third is the one that makes it an exercise rather than a note. Writing the
 * line down proves nothing; throwing the session away and asking again is what proves it carried.
 *
 * Only the second move names a file, so only the second move splits by assistant. The card's words
 * come from the step's locale bundle rather than from unit HTML, so `data-assistant` cannot reach
 * them; the wrapper picks the slugs instead, which is the step owning its own content decision.
 * Typing it `Record<Assistant, …>` is what makes a third assistant a compile error here rather than
 * a Cursor student being told to write `CLAUDE.md`.
 */
const MOVES: Record<Assistant, readonly string[]> = {
  claude: ['find', 'write.claude', 'clear', 'ask'],
  copilot: ['find', 'write.copilot', 'clear', 'ask'],
}

/**
 * The unit's hands-on task, on the shared {@link TaskCard}: put one standing instruction where the
 * assistant reads it again (`CLAUDE.md`, or `.github/copilot-instructions.md`) and then clear the
 * session to see whether it survived.
 *
 * It is the one thing in the step a student does to their own project rather than to this repo,
 * which is deliberate: the line has to be one they were tired of repeating, and only they know
 * which one that is. So the card names no example instruction. Nothing is graded here either; the
 * tick is a bookmark, and `TaskCard` says why.
 */
export function SurviveTheClear() {
  const { assistant } = useAssistant()

  return (
    <TaskCard
      block="survive-the-clear"
      namespace="step1"
      prefix="survive"
      storageKey="kata.step1.survive"
      moves={MOVES[assistant]}
      className="my-8"
    />
  )
}
