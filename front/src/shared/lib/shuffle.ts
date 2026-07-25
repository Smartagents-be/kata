/**
 * Fisher-Yates on a copy: the arrays the exercises shuffle are module constants read on every
 * render, so shuffling one in place would reorder the source of truth.
 *
 * Every caller shuffles once per mount, in a `useState` initialiser rather than during render. That
 * keeps display order stable while a student works, which is what makes indexing an option by
 * position honest, and it stops anyone learning an answer as a position on the board.
 */
export function shuffled<T>(items: readonly T[]): T[] {
  const copy = [...items]
  for (let i = copy.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1))
    ;[copy[i], copy[j]] = [copy[j], copy[i]]
  }
  return copy
}
