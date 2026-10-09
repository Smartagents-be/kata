import type { Assistant } from '@/shared/assistant/assistant'
import { useAssistant } from '@/shared/assistant/useAssistant'
import { TaskCard } from '@/shared/components/TaskCard'

/**
 * Two lessons, in this order. First: the same 9 titles fetched by `curl` and by a browser. The
 * student notes 2 numbers per route in a fresh session, the Messages line of `/context` (what the
 * task added, not the total, which a fresh session's ~24k of system prompt and tools drowns) and
 * the cost in `/usage` (or the credits under a turn in IntelliJ), and is not told why they differ.
 * Measured October 2026 with Claude Code, Sonnet and Playwright MCP 0.0.83: curl 2 requests, ~0.3k
 * in Messages, $0.065; `/catalog/shelf` with its bookseller's notes 16 requests, ~8.7k, $0.143.
 * Without the notes the browser added only ~5k, and Playwright MCP keeps it small anyway: after a
 * click it returns a link to a snapshot file and the agent fetches only the part it needs. Second:
 * why you would ever pay for the browser, a page whose flag only exists once it runs, which
 * `ShutterFlag` grades under the card.
 *
 * **Each move carries what to type**, as a `<prefix>.<move>.command` shown copyable under the line,
 * so the card works in class, where the prose and its `<pre>` are cut. `mcp` and `reset` split by
 * assistant, because the command that adds a server is each harness's own; the wrapper picks the
 * slug, on `SurviveTheClear`'s pattern. **`reset` re-adds the server without
 * `--allow-unrestricted-file-access`** once the flag is in: the option opens every file on disk and
 * `copilot mcp add` writes to the user-wide config. It re-adds rather than removes because
 * `ReadYourWindow` in `context` still needs the server, and removing it is that card's last move.
 *
 * **Nothing says which route is bulkier**, in the card or the prose: the measurement is the exercise.
 */
const MOVES: Record<Assistant, readonly string[]> = {
  claude: ['start', 'mcp.claude', 'curl', 'browser', 'compare', 'reveal', 'reset.claude'],
  copilot: ['start', 'mcp.copilot', 'curl', 'browser', 'compare', 'reveal', 'reset.copilot'],
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
