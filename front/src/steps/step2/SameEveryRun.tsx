import { TaskCard } from '@/shared/components/TaskCard'

/**
 * The unit's hands-on task, on the shared {@link TaskCard}: take one thing you keep typing at an
 * agent and write it down once, as a script with a skill beside it.
 *
 * Two of the five moves are the unit's own claims made testable. `twice` runs the script twice and
 * compares the outputs, which is what `ScriptRuns` draws and what the `Scripts` section asserts in
 * words; anything that differs is interpretation still left in the script. And `find` opens a fresh
 * session and asks for the job in the student's own words, which is the only place in the course
 * where a skill's `description` is tested rather than described.
 *
 * What it deliberately does not ask for. No tests, because `workshop.flag.coverage.help` asks the
 * student to write a testing skill and spending it here gives away part of the capstone. No package
 * touched, because `kata/step2/java` is the workshop's subject and a rename breaks
 * `mvn verify -Pgraded`, the `challenge` tests and the native-image flag. The fallback job named in
 * the description is the start-and-check the root `CLAUDE.md` already gives, so a student with
 * nothing of their own to automate still has something to run.
 *
 * Ungraded, like every `TaskCard`; the tick is a bookmark and `TaskCard` says why.
 */
const MOVES = ['name', 'ask', 'twice', 'skill', 'find'] as const

export function SameEveryRun() {
  return (
    <TaskCard
      block="same-every-run"
      namespace="step2"
      prefix="script"
      storageKey="kata.step2.script"
      moves={MOVES}
      className="my-8"
    />
  )
}
