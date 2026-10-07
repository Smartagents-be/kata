import { TaskCard } from '@/shared/components/TaskCard'

/**
 * The `gates` unit's closing exercise on the shared {@link TaskCard}: walk the gates on your own
 * project, time them, and pick the one to bring closer to the agent.
 *
 * **It names no project and no command**, on `CountTheDay`'s precedent and for a reason of this
 * step's own: the obvious target is `exercises/step2/java`, and its gates are what `workshop`'s
 * pre-flight runs and its board grades. A card here asking a student to time `mvn verify -Pgraded`
 * would spend that stage a unit early and name the profile the capstone owns. Every move runs
 * against whatever the student is actually working on.
 *
 * The moves follow the unit's three sections: list the gates (quality), say what a miss reaches
 * (blast radius), time them (speed), and then the one that pays for the card, handing the slowest
 * one over as a goal with its edges. That last move is `fast-enough`'s code block made the student's
 * own, which is why it asks for the edges and not only the number.
 *
 * Ungraded, like every `TaskCard`; the tick is a bookmark and `TaskCard` says why.
 */
const MOVES = ['list', 'reach', 'time', 'goal'] as const

export function GateWalk() {
  return (
    <TaskCard
      block="gate-walk"
      namespace="step2"
      prefix="gate-walk"
      storageKey="kata.step2.gates"
      moves={MOVES}
      className="my-8"
    />
  )
}
