import { TaskCard } from '@/shared/components/TaskCard'

/**
 * The unit's hands-on task, on the shared {@link TaskCard}: one real ask against step 1's own
 * service, typed twice, straight on the dearest model and then through plan mode on the cheapest,
 * with a check that scores what came out both times.
 *
 * **It used to be worked in the student's own project, on a task of their own choosing, and judged
 * by them.** That made `plan-mode.2` a claim a student was invited to agree with rather than one
 * they watched happen: nothing in the course held the task, two students never did the same thing,
 * and the last move asked which of the two runs they would ship, which is an opinion about work
 * nobody could see. What replaced it is `EntryBrief` above and `kata/step1/check-entry.mjs`: a
 * counter clerk's six wishes, one vague line to type, and a black-box check that prints how many of
 * the six survived the trip.
 *
 * **The two tiers are the experiment and not decoration.** `plan-mode.2` claims a cheaper model
 * driven through a plan beats a one-shot on the expensive one, so the straight run takes the dearest
 * model available and the planned run takes the cheapest. The comparison runs against the plan, which
 * is what makes a win unambiguous: the weaker model is the one carrying the brief.
 *
 * **Three of the six moves exist to keep the two runs independent**, and each of them was a way to
 * get a wrong number. The service holds a build until it is restarted, so a score taken without one
 * is a reading of the previous attempt. The undo names its commands, because an agent leaves
 * untracked files that `git restore` does not touch and the second run would start pre-armed. And the
 * second run starts a fresh agent, because the check's own output names all six wishes: an agent that
 * watched the first score go by has been handed the brief, and the second run would then measure the
 * leak rather than the plan. That last one lands four units before `session` teaches `/clear`, which
 * is why the move says it in words rather than naming the command.
 *
 * **The sixth move is still the exercise.** The score settles which run was better; naming the wish
 * you would never have thought to say out loud is what turns that into something you can use
 * tomorrow.
 *
 * The line the student types is deliberately the vague one, which is `be-exact.1`'s "fix the login"
 * shape one section up. The unit tells them not to write asks like that, and this is the once they
 * do it on purpose and measure what it costs.
 */
const MOVES = ['serve', 'ask', 'score', 'undo', 'interview', 'again'] as const

export function PlanItTwice() {
  return (
    <TaskCard
      block="plan-it-twice"
      namespace="step1"
      prefix="plan"
      storageKey="kata.step1.plan"
      moves={MOVES}
      className="my-8"
    />
  )
}
