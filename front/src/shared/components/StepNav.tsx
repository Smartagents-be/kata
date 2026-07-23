import { useTranslation } from 'react-i18next'
import { NavLink, useParams } from 'react-router-dom'
import { useStepText } from '@/shared/i18n/useStepText'
import type { Step } from '@/shared/step'
import { cn } from '@/shared/lib/utils'
import { firstUnitPath, steps, unitPath } from '@/steps'

/**
 * Steps in order, with the active step's units listed under it. Collapsing the other steps keeps
 * the sidebar readable once the curriculum is more than a couple of steps long.
 */
export function StepNav() {
  const { stepId } = useParams()
  const { t } = useTranslation()

  return (
    <nav
      id="step-nav"
      data-component="StepNav"
      aria-label={t('nav.steps')}
      className="flex flex-col gap-1"
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
function StepEntry({ step, index, open }: { step: Step; index: number; open: boolean }) {
  const { text } = useStepText(step.id)

  return (
    <div
      id={`step-nav-step-${index}`}
      data-component="StepEntry"
      className="flex flex-col gap-1"
    >
      <NavLink
        id={`step-nav-step-${index}-link`}
        data-component="StepEntry"
        to={firstUnitPath(step)}
        className={cn(
          'flex items-start gap-3 rounded-md px-3 py-2 text-sm transition-colors',
          open
            ? 'bg-accent text-accent-foreground font-medium'
            : 'text-muted-foreground hover:bg-accent/50 hover:text-foreground',
        )}
      >
        <span
          id={`step-nav-step-${index}-number`}
          data-component="StepEntry"
          className="text-muted-foreground/70 tabular-nums"
        >
          {String(index + 1).padStart(2, '0')}
        </span>
        <span id={`step-nav-step-${index}-title`} data-component="StepEntry">
          {text(step.title)}
        </span>
      </NavLink>

      {open && (
        <ul
          id={`step-nav-step-${index}-units`}
          data-component="StepEntry"
          className="border-border/60 ml-6 flex flex-col gap-0.5 border-l pl-2"
        >
          {step.units.map((unit, unitIndex) => (
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
                    'block rounded-md px-3 py-1.5 text-sm transition-colors',
                    isActive
                      ? 'text-foreground font-medium'
                      : 'text-muted-foreground hover:text-foreground',
                  )
                }
              >
                {text(unit.title)}
              </NavLink>
            </li>
          ))}
        </ul>
      )}
    </div>
  )
}
