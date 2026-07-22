/**
 * The two ways this kata is run.
 *
 * - `guided`   — in class, with a teacher. Exercises only; explanatory notes are withheld
 *                so the teacher can deliver them.
 * - `self`     — working alone. The same page, plus every note.
 *
 * Guided is the default: the classroom is the case where accidentally revealing notes
 * actually costs something.
 */
export type Mode = 'guided' | 'self'

export const DEFAULT_MODE: Mode = 'guided'

export const MODE_STORAGE_KEY = 'kata.mode'

export function isMode(value: unknown): value is Mode {
  return value === 'guided' || value === 'self'
}

export function readStoredMode(): Mode {
  try {
    const stored = window.localStorage.getItem(MODE_STORAGE_KEY)
    return isMode(stored) ? stored : DEFAULT_MODE
  } catch {
    // Private browsing and similar can make localStorage throw; the app still works.
    return DEFAULT_MODE
  }
}

export function storeMode(mode: Mode): void {
  try {
    window.localStorage.setItem(MODE_STORAGE_KEY, mode)
  } catch {
    // Persistence is a convenience, not a requirement.
  }
}
