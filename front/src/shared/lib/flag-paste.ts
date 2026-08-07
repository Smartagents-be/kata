/**
 * Whether a pasted string is one whole flag. Every code in the course is printed as `{…}`, which is
 * what every answer box says in its placeholder, so a paste of exactly that shape is a student
 * handing an answer over rather than editing a field: the box grades it there and then instead of
 * making them reach for Check. Anything else pastes the ordinary way and waits.
 *
 * **It matches the whole trimmed paste and never finds a flag inside a larger one**, which is load
 * bearing rather than strictness for its own sake. `flag.trace.help` in step 1 says five leetspoken
 * lines come out of the trace, only one of them is the answer, and "your agent cannot pick; you
 * can". A check that reached into a pasted trace dump for the winning `{…}` would make that pick for
 * the student, and that pick is the best moment in the step. The `[^{}]` is what holds the line, so
 * two braces and no more: a paste carrying two flags, or a flag with anything around it, is not one.
 * The same constraint is written up beside `candidates()` in `steps/step1/FlagRow.tsx`.
 */
export function isWholeFlag(pasted: string): boolean {
  return /^\{[^{}]+\}$/.test(pasted.trim())
}
