import type { Assistant } from '@/shared/assistant/assistant'
import { useAssistant } from '@/shared/assistant/useAssistant'
import { TaskCard } from '@/shared/components/TaskCard'

/**
 * Four moves. The first opens the project with an agent in it, because the prose that used to
 * introduce `/context` is gone and the card is now the whole instruction. It is also why `fresh` no
 * longer says "start a fresh session": an agent you have just started in a project is one, and the
 * two moves were telling the student to do the same thing twice. The second and the last
 * are a pair: the same reading taken with the server connected and with it gone. The count between
 * them is the exercise, so neither of those can be dropped without leaving a number with nothing to
 * compare it to.
 *
 * Only the first move names a command, so only the first move splits by assistant. The card's words
 * come from the step's locale bundle rather than from unit HTML, so `data-assistant` cannot reach
 * them and the wrapper picks the slugs instead. Typing it `Record<Assistant, …>` is what makes a
 * third assistant a compile error here rather than a Cursor student being told to run `claude`.
 */
const MOVES: Record<Assistant, readonly string[]> = {
  claude: ['open.claude', 'fresh', 'ask', 'remove'],
  copilot: ['open.copilot', 'fresh', 'ask', 'remove'],
}

/**
 * `context`'s one hands-on task, on the shared {@link TaskCard}: run `/context` against the
 * student's own window. `BudgetWindow` in `tools` totals six invented calls; this one totals a real
 * session, which is the only place in the course the command is used rather than described.
 *
 * It sits in the unit that takes the window apart, one page after the one that filled it: the window
 * it reads still holds the server `connect-one` connected, which is what the last move removes.
 * Nothing is graded; the tick is a bookmark, and `TaskCard` says why.
 *
 * The card carries no description line: the moves say where the work happens, and the heading above
 * them names the task, so the key is absent rather than empty.
 */
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
