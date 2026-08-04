import { CheckIcon } from 'lucide-react'
import { AnimatePresence, motion, useReducedMotion } from 'motion/react'
import type { Transition, Variants } from 'motion/react'
import { useTranslation } from 'react-i18next'
import { NavLink, useParams } from 'react-router-dom'
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from '@/shared/components/ui/tooltip'
import { useStepText } from '@/shared/i18n/useStepText'
import { useProgress } from '@/shared/progress/useProgress'
import { unitKey } from '@/shared/progress/progress'
import type { Step } from '@/shared/step'
import { cn } from '@/shared/lib/utils'
import { DURATION, EASE_QUIET, SPRING_NAV } from '@/shared/motion/motion'
import { firstUnitPath, steps, unitPath } from '@/steps'

/*
 * The accordion's behaviour is adapted from Skiper UI's `skiper103` ("Bouncy accordion",
 * https://skiper-ui.com/v1/skiper103), which is a paid component: none of its source is here, and
 * what was taken is the interaction it describes, a spring-driven expand and collapse with the rows
 * arriving in sequence rather than all at once. The glass icons and the boxed items it draws around
 * that are not: this sidebar is a list of links on a flat card, and nothing about it wants a card of
 * its own. Skiper UI, author @gurvinder-singh02, https://gxuri.me
 */

/**
 * Steps in order, each a titled group: a mono uppercase eyebrow for the step, with the active
 * step's units listed under it and the others collapsed to a count. Teal marks the group whose
 * step is open and underlines the unit being read, so one colour carries "you are here" from the
 * heading down to the row.
 *
 * Opening and closing a group is animated, and the two halves swap in opposite directions: the
 * step being left folds its units away and grows its count back, the step being entered does the
 * reverse. Both run at once, because they are one movement rather than two, and the nav's own
 * height is whatever the sum of them is at that instant. Nothing here is layout-animated: the
 * heights are real, so the steps below simply reflow as the box above them changes.
 */
export function StepNav() {
  const { stepId } = useParams()
  const { t } = useTranslation()

  return (
    <nav
      id="step-nav"
      data-component="StepNav"
      aria-label={t('nav.steps')}
      className="flex flex-col gap-6"
    >
      {steps.map((step, index) => (
        <StepEntry key={step.id} step={step} index={index} open={step.id === stepId} />
      ))}
    </nav>
  )
}

/**
 * Opening springs, closing does not, and the reasoning is in `SPRING_NAV`: a spring aimed at a
 * height of zero has nowhere to overshoot to, so its bounce comes out as a stall a few pixels above
 * the floor. The orchestration hangs off the opening transition for the same reason, since there is
 * nothing to stagger on the way out that is worth waiting for.
 */
const OPEN_TRANSITION: Transition = { ...SPRING_NAV, delayChildren: 0.05, staggerChildren: 0.035 }
const CLOSE_TRANSITION: Transition = { duration: DURATION.panel, ease: EASE_QUIET }

/**
 * `prefers-reduced-motion` gets the same states with the time taken out, rather than a second copy
 * of the markup. Every value below is a real end state, so a zero-length transition lands on exactly
 * what an un-animated sidebar would have shown, and the accordion goes back to being the hard swap
 * this was before.
 */
const INSTANT: Transition = { duration: 0 }

/**
 * The collapsing box, and the rows inside it, as two halves of one variant set.
 *
 * `FOLD` is what actually moves: height from nothing to whatever the contents need, which is the
 * measurement `motion` takes for us and the reason this cannot be done in CSS. `ROW` is each unit
 * arriving, and it is deliberately much smaller than the box it sits in: 6px and a fade, on the
 * quiet curve rather than the spring, so the springiness stays in the container and the rows only
 * follow it in. Give the rows a spring of their own and the whole thing reads as a wobble.
 *
 * The `closed` half is written out rather than left to `initial`, because it is also the `exit`
 * state, and a group being closed has to fold from wherever it currently is.
 *
 * The transitions sit *inside* the variants rather than on the elements, because the two directions
 * want different ones and a `transition` prop cannot say "this one on the way in and that one on the
 * way out". That is also why reduced motion needs a whole second set: a variant's own transition
 * beats the element's, so there is no single prop left to override.
 */
const FOLD: Variants = {
  closed: { height: 0, opacity: 0, transition: CLOSE_TRANSITION },
  open: { height: 'auto', opacity: 1, transition: OPEN_TRANSITION },
}

const FOLD_INSTANT: Variants = {
  closed: { height: 0, opacity: 0, transition: INSTANT },
  open: { height: 'auto', opacity: 1, transition: INSTANT },
}

const ROW: Variants = {
  closed: { opacity: 0, x: -6 },
  open: { opacity: 1, x: 0 },
}

/** The rows' own move, which is a repaint rather than a piece of layout. */
const ROW_TRANSITION: Transition = { duration: DURATION.state, ease: EASE_QUIET }

/**
 * One step in the list. It is a component of its own because its titles come from the step's own
 * i18next namespace, and a hook cannot be called inside the loop above.
 */
function StepEntry({
  step,
  index,
  open,
}: {
  step: Step
  index: number
  open: boolean
}) {
  const { t } = useTranslation()
  const { text } = useStepText(step.id)
  const { isComplete } = useProgress()
  const reduced = useReducedMotion()

  return (
    <div id={`step-nav-step-${index}`} data-component="StepEntry" data-state={open ? 'open' : 'closed'}>
      {/*
        The eyebrow is the whole target for a collapsed step: the heading and its unit count sit
        inside one link, so clicking either opens the step at its first unit. There is no separate
        expand affordance, so the two read and behave as one thing to click.
      */}
      <NavLink
        id={`step-nav-step-${index}-link`}
        data-component="StepEntry"
        to={firstUnitPath(step)}
        className={cn(
          'eyebrow block px-1 transition-colors',
          open ? 'text-primary' : 'text-muted-foreground hover:text-foreground',
        )}
      >
        <span id={`step-nav-step-${index}-title`} data-component="StepEntry" className="block truncate">
          {text(step.title)}
        </span>
        {/*
          `initial={false}` on both of these is what keeps a page load quiet: the step the student
          arrived on renders already open, and only a step that changes while they are looking has
          anything to travel. It is the same call `Reveal` makes about a board rebuilt from
          localStorage.
        */}
        <AnimatePresence initial={false}>
          {!open ? (
            <motion.span
              key="meta"
              id={`step-nav-step-${index}-meta`}
              data-component="StepEntry"
              variants={reduced ? FOLD_INSTANT : FOLD}
              initial="closed"
              animate="open"
              exit="closed"
              // The clip is what makes the fold possible, and it is also why the spacing above the
              // count is a margin on the inner span rather than padding out here: padding on a
              // border-box element survives a height of 0 and would leave a gap behind a closed
              // group, while a margin inside an overflow-hidden box is clipped with everything else.
              className="block overflow-hidden"
            >
              <span
                id={`step-nav-step-${index}-meta-label`}
                data-component="StepEntry"
                className="text-muted-foreground/80 mt-3 block font-mono text-[0.6875rem] tabular-nums"
              >
                {t('nav.unitCount', { count: step.units.length })}
              </span>
            </motion.span>
          ) : null}
        </AnimatePresence>
      </NavLink>

      <AnimatePresence initial={false}>
        {open ? (
          <motion.div
            key="units"
            id={`step-nav-step-${index}-units`}
            data-component="StepEntry"
            // Orchestration rides on the box's own opening transition, so the rows are staggered by
            // the thing they are inside rather than each one working out its own delay from its
            // index. `delayChildren` holds them back until the box has actually started to open,
            // which is the difference between rows sliding in and rows appearing in a shut box.
            variants={reduced ? FOLD_INSTANT : FOLD}
            initial="closed"
            animate="open"
            exit="closed"
            className="overflow-hidden"
          >
            <ul
              id={`step-nav-step-${index}-units-list`}
              data-component="StepEntry"
              className="flex flex-col gap-2.5 pt-3 pl-1"
            >
              {step.units.map((unit, unitIndex) => {
                const done = isComplete(unitKey(step.id, unit.id))
                return (
                  <motion.li
                    key={unit.id}
                    id={`step-nav-step-${index}-unit-${unitIndex}`}
                    data-component="StepEntry"
                    // No `animate` of its own: the state comes down from the box above, which is
                    // also what lets the box stagger these and reverse them on the way out.
                    variants={ROW}
                    transition={reduced ? INSTANT : ROW_TRANSITION}
                  >
                    <NavLink
                      id={`step-nav-step-${index}-unit-${unitIndex}-link`}
                      data-component="StepEntry"
                      to={unitPath(step.id, unit.id)}
                      className={({ isActive }) =>
                        cn(
                          // The teal underline sits under the row itself, so it is only as wide as
                          // the label rather than the full column.
                          'group flex w-fit items-baseline gap-3 border-b-2 pb-0.5 text-sm transition-colors',
                          isActive ? 'border-primary' : 'border-transparent',
                        )
                      }
                    >
                      {({ isActive }) => (
                        <>
                          {/*
                            The number cell doubles as a completion marker: a finished unit shows a
                            teal check in place of its count. Mono either way, because both are the
                            machine's bookkeeping rather than prose.
                          */}
                          <span
                            id={`step-nav-step-${index}-unit-${unitIndex}-number`}
                            data-component="StepEntry"
                            data-state={done ? 'done' : 'todo'}
                            className={cn(
                              'flex w-[1.125rem] shrink-0 items-center font-mono text-[0.8125rem] tabular-nums',
                              done
                                ? 'text-primary'
                                : isActive
                                  ? 'text-primary/70'
                                  : 'text-muted-foreground/60',
                            )}
                          >
                            {done ? (
                              // Only the check is the trigger, not the cell around it: an unfinished
                              // unit shows its number there and has nothing to say about being done.
                              <Tooltip>
                                <TooltipTrigger asChild>
                                  <CheckIcon
                                    id={`step-nav-step-${index}-unit-${unitIndex}-check`}
                                    data-component="StepEntry"
                                    aria-label={t('nav.unitDone')}
                                    className="size-3.5"
                                    strokeWidth={3}
                                  />
                                </TooltipTrigger>
                                <TooltipContent
                                  id={`step-nav-step-${index}-unit-${unitIndex}-check-tooltip`}
                                  data-component="StepEntry"
                                  side="right"
                                  sideOffset={6}
                                >
                                  {t('nav.unitDone')}
                                </TooltipContent>
                              </Tooltip>
                            ) : (
                              String(unitIndex + 1).padStart(2, '0')
                            )}
                          </span>
                          <span
                            id={`step-nav-step-${index}-unit-${unitIndex}-label`}
                            data-component="StepEntry"
                            className={cn(
                              isActive
                                ? 'text-primary font-semibold'
                                : done
                                  ? 'text-primary/75 group-hover:text-primary'
                                  : 'text-muted-foreground group-hover:text-foreground',
                            )}
                          >
                            {text(unit.title)}
                          </span>
                        </>
                      )}
                    </NavLink>
                  </motion.li>
                )
              })}
            </ul>
          </motion.div>
        ) : null}
      </AnimatePresence>
    </div>
  )
}
