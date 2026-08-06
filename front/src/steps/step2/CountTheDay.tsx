import { TaskCard } from '@/shared/components/TaskCard'

/**
 * The unit's closing exercise on the shared {@link TaskCard}: time one loop on your own work, then
 * split a day into where its hours actually went.
 *
 * `where-day-goes` tells the student to count where the hours go and the page never asks them to
 * count anything, so the strongest instruction in the unit had nothing under it. This is that
 * instruction with a stopwatch attached.
 *
 * **It names no project and no command**, which is the one constraint the unit imposes on it:
 * `run-own-machine` was stripped of this repository's own two-terminal setup precisely so a reader
 * on their own stack does not have to translate it first, and a card naming `mvn spring-boot:run`
 * would put it straight back. Every move runs against whatever the student is actually working on.
 *
 * The `fit` move is the one that pays for the card. It sends the reader back up to `LoopsPerHour`
 * with a number of their own, which is the difference between a drawing of eleven turns in an hour
 * and a measurement of theirs.
 *
 * Ungraded, like every `TaskCard`; the tick is a bookmark and `TaskCard` says why.
 */
const MOVES = ['time', 'fit', 'tally', 'cut'] as const

export function CountTheDay() {
  return (
    <TaskCard
      block="count-the-day"
      namespace="step2"
      prefix="count"
      storageKey="kata.step2.count"
      moves={MOVES}
      className="my-8"
    />
  )
}
