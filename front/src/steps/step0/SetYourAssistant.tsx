import { TaskCard } from '@/shared/components/TaskCard'

/**
 * One move, and the mode switch and the deck are deliberately not in it: those are the panel's own
 * business, while the assistant is the setting the rest of the course reads.
 */
const MOVES = ['pick'] as const

/**
 * The welcome page's only task, on the shared {@link TaskCard}: open the cogwheel and set the
 * assistant to the one the student actually uses. It is the setting that decides which commands and
 * which filenames step 1 shows them, so the page asks for it rather than mentioning it.
 *
 * There is no `assistant.description` key. The paragraph above the card already says where the work
 * happens, and `TaskCard` looks that key up rather than assuming it.
 */
export function SetYourAssistant() {
  return (
    <TaskCard
      block="set-your-assistant"
      namespace="step0"
      prefix="assistant"
      storageKey="kata.step0.assistant"
      moves={MOVES}
      className="my-8"
    />
  )
}
