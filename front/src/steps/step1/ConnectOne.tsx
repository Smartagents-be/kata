import type { Assistant } from '@/shared/assistant/assistant'
import { useAssistant } from '@/shared/assistant/useAssistant'
import { TaskCard } from '@/shared/components/TaskCard'

/**
 * Two lessons, in this order. First: the same 9 titles cost very different amounts of context
 * depending on the tool that fetched them, and the student measures that with `/context` (or the
 * credits under a turn in IntelliJ) rather than being told. Second: why you would ever pay for the
 * browser, a page whose flag only exists once it runs, which `ShutterFlag` grades under the card.
 *
 * **Each move carries what to type**, as a `<prefix>.<move>.command` shown copyable under the line,
 * so the card works in class, where the prose and its `<pre>` are cut. Only `mcp` splits by
 * assistant, because the command that adds a server is each harness's own; the wrapper picks the
 * slug, on `SurviveTheClear`'s pattern.
 *
 * **Nothing says which route is bulkier**, in the card or the prose: the measurement is the exercise.
 */
const MOVES: Record<Assistant, readonly string[]> = {
  claude: ['start', 'mcp.claude', 'curl', 'browser', 'compare', 'reveal', 'shoot'],
  copilot: ['start', 'mcp.copilot', 'curl', 'browser', 'compare', 'reveal', 'shoot'],
}

/** The unit's hands-on task, on the shared {@link TaskCard}. Nothing is graded on the card itself. */
export function ConnectOne() {
  const { assistant } = useAssistant()

  return (
    <TaskCard
      block="connect-one"
      namespace="step1"
      prefix="connect"
      storageKey="kata.step1.connect"
      moves={MOVES[assistant]}
      className="my-8"
    />
  )
}
