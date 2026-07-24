/**
 * Which units a student has finished. A unit counts as done when they advance past it or ace its
 * quiz; the sidebar then swaps its number for a check. It is a convenience, not a grade, so it
 * lives entirely in the browser and degrades to "nothing done" if storage is unavailable.
 */

export const PROGRESS_STORAGE_KEY = 'kata.completed'

/** A unit's identity in the completion set: its step and unit ids, joined the way the URL joins them. */
export function unitKey(stepId: string, unitId: string): string {
  return `${stepId}/${unitId}`
}

export function readStoredProgress(): Set<string> {
  try {
    const raw = window.localStorage.getItem(PROGRESS_STORAGE_KEY)
    if (!raw) {
      return new Set()
    }
    const parsed: unknown = JSON.parse(raw)
    return Array.isArray(parsed)
      ? new Set(parsed.filter((entry): entry is string => typeof entry === 'string'))
      : new Set()
  } catch {
    // Private browsing and malformed values both land here; the app still works without history.
    return new Set()
  }
}

export function storeProgress(completed: ReadonlySet<string>): void {
  try {
    window.localStorage.setItem(PROGRESS_STORAGE_KEY, JSON.stringify([...completed]))
  } catch {
    // Persistence is a convenience, not a requirement.
  }
}
