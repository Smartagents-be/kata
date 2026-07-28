/**
 * The coding assistant a student is working with while they read.
 *
 * - `claude`   — Claude Code, which is what this repository is set up for and what every
 *                unwritten example assumes.
 * - `copilot`  — GitHub Copilot, for a student whose employer already put that on their machine.
 *
 * This is not a language and not an audience: it is which product the instructions on the page
 * should name, so a Copilot student reads about `.github/copilot-instructions.md` where a Claude
 * Code student reads about `CLAUDE.md`. Prose is marked for one or the other with `data-assistant`,
 * handled in `lib/content.ts` beside the audience rule it copies.
 *
 * Claude Code is the default because the kata's own repository is the worked example, and its
 * configuration is the one a student can open.
 *
 * It is deliberately a setting of its own rather than a third entry in the language list: which
 * assistant you use and which language you read in are independent, and a Dutch student on Copilot
 * should not have to give up one to get the other.
 */
export type Assistant = 'claude' | 'copilot'

export const DEFAULT_ASSISTANT: Assistant = 'claude'

export const ASSISTANT_STORAGE_KEY = 'kata.assistant'

/** Product names, so they are written the same way in every language, as the locale labels are. */
export const ASSISTANTS: ReadonlyArray<{ assistant: Assistant; label: string }> = [
  { assistant: 'claude', label: 'Claude Code' },
  { assistant: 'copilot', label: 'GitHub Copilot' },
]

export function isAssistant(value: unknown): value is Assistant {
  return value === 'claude' || value === 'copilot'
}

export function readStoredAssistant(): Assistant {
  try {
    const stored = window.localStorage.getItem(ASSISTANT_STORAGE_KEY)
    return isAssistant(stored) ? stored : DEFAULT_ASSISTANT
  } catch {
    // Private browsing and similar can make localStorage throw; the app still works.
    return DEFAULT_ASSISTANT
  }
}

export function storeAssistant(assistant: Assistant): void {
  try {
    window.localStorage.setItem(ASSISTANT_STORAGE_KEY, assistant)
  } catch {
    // Persistence is a convenience, not a requirement.
  }
}
