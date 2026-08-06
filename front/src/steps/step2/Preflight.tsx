import { TaskCard } from '@/shared/components/TaskCard'

/**
 * The capstone's first stage on the shared {@link TaskCard}: five moves against
 * `kata/step2/java` before a single line of the module changes.
 *
 * **It is the one stage that earns no flag, and that is why it is a card rather than a paragraph.**
 * Everything under it is graded by a build, so a student reading a page of instructions skips
 * straight to the goal and hands over a project that has never met their check. The moves run in
 * the order they pay off: see the check answer, write it down where the agent reads it, make it run
 * whether the agent remembers or not, add the rule that stops a guess, and put the house test style
 * somewhere it arrives before the first test.
 *
 * **The `red` move is the one to defend hardest.** A build that has never been run is a check
 * nobody has seen answer, and the three locked rows it prints are the whole afternoon stated by the
 * machine rather than by this page. It is also what lets the prose stop describing the gates one by
 * one, which is most of where the unit's word count went.
 *
 * **The `hook` move is `setup`'s strictest of the three, and it is the only place in the course a
 * student writes one.** `engineering.quality-gates.2` describes exactly this hook and nothing in the
 * step ever asks for it: a `CLAUDE.md` line asks, and a hook just happens. Having both on the card
 * is the pair that section argues, not a duplication.
 *
 * **The `skill` move is `setup`'s and not `patterns`'s, and the wording carries that.** It asks for
 * the convention this project *already* uses, which is writing down a decision somebody made;
 * `patterns` is explicit that you write a skill when you are tired of correcting a thing, not in
 * anticipation. The anticipating half would contradict the step. `Debrief`'s `keep` move is the
 * `patterns` half, sending the corrections that did keep coming back into this same file, so the two
 * cards run the whole loop between them.
 *
 * Ungraded, like every `TaskCard`; the tick is a bookmark and `TaskCard` says why.
 */
const MOVES = ['red', 'command', 'hook', 'gaps', 'skill'] as const

export function Preflight() {
  return (
    <TaskCard
      block="set-up-first"
      namespace="step2"
      prefix="set-up-first"
      storageKey="kata.step2.preflight"
      moves={MOVES}
      className="my-8"
    />
  )
}
