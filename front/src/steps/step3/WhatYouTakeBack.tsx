import { TaskCard } from '@/shared/components/TaskCard'

/**
 * The course's closing exercise, on the shared {@link TaskCard}: five things to take out of step 3
 * and into the week after it.
 *
 * **Nothing here is graded and nothing is submitted**, and the description says so in the words the
 * student reads first. This step has no Java, no flag and no command a checker could run, so a board
 * here would be a board pretending. What it has instead is work that happens away from a keyboard,
 * and four of the five moves do: only the third one is typed into a repository.
 *
 * The five draw one each on what the step already argued, so the card asks for nothing new. `queue`
 * is `change.process-was-bottleneck`, the part of the wait that was never typing. `sentence` is
 * `expectations.say-what-missing`, said at the demo rather than after it. `line` is
 * `change.environment-beats-project`, one correction turned into a file. `practice` is
 * `change.way-working-decision`, a ritual held up against the constraint it was built for. `person`
 * is the adoption half the step never gets a unit for: a name and a date, or none of it leaves your
 * own head.
 *
 * `line` says "the repository's own instruction file" and **must not name a file**. A move is a
 * locale string with no assistant mechanism behind it, so a filename there is wrong for half the room
 * with nothing filtering it; step 1's `SurviveTheClear` types its moves per assistant, and that is
 * not worth building for one word.
 *
 * **It must never grow a checker, a hash, a text box or a sixth move.** The moment one of these is
 * graded, the step is lying about what it is.
 */
const MOVES = ['queue', 'sentence', 'line', 'practice', 'person'] as const

export function WhatYouTakeBack() {
  return (
    <TaskCard
      block="take-it-back"
      namespace="step3"
      prefix="take"
      storageKey="kata.step3.take"
      moves={MOVES}
      className="my-8"
    />
  )
}
