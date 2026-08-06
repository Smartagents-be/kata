import { TaskCard } from '@/shared/components/TaskCard'

/**
 * The capstone's last stage on the shared {@link TaskCard}: three moves after the flags are in, and
 * none of them earns one.
 *
 * **It exists because the board grades the code and nothing grades the run.** Five green rows say
 * the module is hardened, the endpoint answers and the image keeps its resource. They say nothing
 * about how the afternoon was spent, which is the half of step 2 a build cannot reach, so the
 * closing move of the capstone is to go and look.
 *
 * The three moves are the units with no other home in the run. `audit` is `workflows`'s
 * audit-driven pass turned on the student's own diff rather than on somebody else's repository,
 * which is the only version of it they can check, and it **ends on closing the worst row and running
 * the graded build again**, because an audit nobody works is the checkbox that unit warns about.
 * `count` is `enablement`'s instruction to count where the hours go, asked once there are real hours
 * to count, and it is answerable only because {@link Preflight}'s card description told the student
 * to note the time before they started. `keep` closes the loop that card's `skill` move opens: the
 * corrections that did come back go into the file that arrives before the next mistake, which is
 * `patterns`'s half of the skill.
 *
 * **`asked` is the planted gap's failure case, and it is the only move here that is not a habit.**
 * If a run stops to ask, the student sees the `## Gaps` rule work and needs nothing further. If it
 * quietly picks an answer instead, the board still goes green and nothing anywhere would tell them a
 * decision was made for them, so this move sends them back through the diff for it. It names no gap,
 * on the prohibition in `front/src/steps/step2/CLAUDE.md`, and it is `enablement.where-day-goes.2`'s
 * sentence with something specific to look for.
 *
 * Ungraded, like every `TaskCard`; the tick is a bookmark and `TaskCard` says why.
 */
const MOVES = ['audit', 'count', 'keep', 'asked'] as const

export function Debrief() {
  return (
    <TaskCard
      block="look-at-afternoon"
      namespace="step2"
      prefix="look-at-afternoon"
      storageKey="kata.step2.debrief"
      moves={MOVES}
      className="my-8"
    />
  )
}
