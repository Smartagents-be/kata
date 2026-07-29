import { TaskCard } from '@/shared/components/TaskCard'

/**
 * The unit's hands-on task, on the shared {@link TaskCard}: sort the loans project in
 * `kata/step2/java` against the shape `DomainTree` draws further up the page.
 *
 * It works because the two genuinely disagree. The project keeps `port/` beside `domain/` rather
 * than inside it, and its `adapter/` and `web/` packages split by technology with no `incoming/`
 * and `outgoing/` above them, so the controller and the in-memory repository both land somewhere
 * else in the figure. `config/` and `aot/` land nowhere in it at all, which is the judgement the
 * fourth move is after: the figure is a shape, not a law, and framework wiring was never a domain
 * concern.
 *
 * **The card names none of that and gives no count**, on the same reasoning `problem.md` has no
 * answer key: a move reading "three of them move" turns the sort into arithmetic, and naming the
 * three does the sort. Which packages disagree is the exercise.
 *
 * Nothing is moved, and the fifth move says so twice over (plan mode, then accept nothing). That
 * is not politeness about the agent. This project is the `workshop` unit's subject, and a package
 * rename breaks `mvn verify -Pgraded`, the `challenge` tests and the native-image flag, so a
 * student who accepted the plan would arrive at the capstone with a project that no longer builds.
 * The description carries the same warning in the words the student reads first.
 *
 * Ungraded, like every `TaskCard`; the tick is a bookmark and `TaskCard` says why.
 */
const MOVES = ['list', 'guess', 'compare', 'sort', 'plan'] as const

export function WhereWouldItGo() {
  return (
    <TaskCard
      block="where-would-it-go"
      namespace="step2"
      prefix="where"
      storageKey="kata.step2.where"
      moves={MOVES}
      className="my-8"
    />
  )
}
