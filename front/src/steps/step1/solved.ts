/**
 * Which flags this browser has already solved, kept so a page reload does not lose the collection.
 * Both of step 1's graded boards use it against their own key: `kata.step1.flags` for `workshop`'s
 * three, `kata.step1.shutter` for the one under the browser task in `tools`. Both keys sit under the
 * `kata.step1.` prefix `shared/lib/reset.ts` clears, so a student's reset takes them with the rest of
 * their progress.
 *
 * It is its own module rather than two more exports from `FlagRow.tsx`, which keeps that file a
 * component file and keeps Fast Refresh working on it.
 */
export function readSolved(storageKey: string): Set<string> {
  try {
    const raw = localStorage.getItem(storageKey)
    return new Set(raw ? (JSON.parse(raw) as string[]) : [])
  } catch {
    return new Set()
  }
}

export function writeSolved(storageKey: string, solved: Set<string>) {
  try {
    localStorage.setItem(storageKey, JSON.stringify([...solved]))
  } catch {
    // A browser with storage blocked still grades in memory; it just forgets on reload.
  }
}
