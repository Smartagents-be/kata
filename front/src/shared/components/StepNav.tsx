import { CheckIcon } from 'lucide-react'
import { useTranslation } from 'react-i18next'
import { NavLink, useParams } from 'react-router-dom'
import { useStepText } from '@/shared/i18n/useStepText'
import { useProgress } from '@/shared/progress/useProgress'
import { unitKey } from '@/shared/progress/progress'
import type { Step } from '@/shared/step'
import { cn } from '@/shared/lib/utils'
import { firstUnitPath, steps, unitPath } from '@/steps'

/**
 * Steps in order, each a titled group: a mono uppercase eyebrow for the step, with the active
 * step's units listed under it and the others collapsed to a count. Teal marks the group whose
 * step is open and underlines the unit being read, so one colour carries "you are here" from the
 * heading down to the row.
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

  return (
    <div id={`step-nav-step-${index}`} data-component="StepEntry">
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
          open ? 'text-primary pb-3' : 'text-muted-foreground hover:text-foreground',
        )}
      >
        <span id={`step-nav-step-${index}-title`} data-component="StepEntry" className="block truncate">
          {text(step.title)}
        </span>
        {!open ? (
          <span
            id={`step-nav-step-${index}-meta`}
            data-component="StepEntry"
            className="text-muted-foreground/80 mt-3 block font-mono text-[0.6875rem] tabular-nums"
          >
            {t('nav.unitCount', { count: step.units.length })}
          </span>
        ) : null}
      </NavLink>

      {open ? (
        <ul
          id={`step-nav-step-${index}-units`}
          data-component="StepEntry"
          className="flex flex-col gap-2.5 pl-1"
        >
          {step.units.map((unit, unitIndex) => {
            const done = isComplete(unitKey(step.id, unit.id))
            return (
              <li
                key={unit.id}
                id={`step-nav-step-${index}-unit-${unitIndex}`}
                data-component="StepEntry"
              >
                <NavLink
                  id={`step-nav-step-${index}-unit-${unitIndex}-link`}
                  data-component="StepEntry"
                  to={unitPath(step.id, unit.id)}
                  className={({ isActive }) =>
                    cn(
                      // The teal underline sits under the row itself, so it is only as wide as the
                      // label rather than the full column.
                      'group flex w-fit items-baseline gap-3 border-b-2 pb-0.5 text-sm transition-colors',
                      isActive ? 'border-primary' : 'border-transparent',
                    )
                  }
                >
                  {({ isActive }) => (
                    <>
                      {/*
                        The number cell doubles as a completion marker: a finished unit shows a teal
                        check in place of its count. Mono either way, because both are the machine's
                        bookkeeping rather than prose.
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
                          <CheckIcon
                            id={`step-nav-step-${index}-unit-${unitIndex}-check`}
                            data-component="StepEntry"
                            aria-label={t('nav.unitDone')}
                            className="size-3.5"
                            strokeWidth={3}
                          />
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
              </li>
            )
          })}
        </ul>
      ) : null}
    </div>
  )
}
