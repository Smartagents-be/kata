import { NavLink, useParams } from 'react-router-dom'
import { localise } from '@/shared/i18n/locale'
import { useLocale } from '@/shared/i18n/useLocale'
import { cn } from '@/shared/lib/utils'
import { firstUnitPath, steps, unitPath } from '@/steps'

/**
 * Steps in order, with the active step's units listed under it. Collapsing the other steps keeps
 * the sidebar readable once the curriculum is more than a couple of steps long.
 */
export function StepNav() {
  const { stepId } = useParams()
  const { locale, t } = useLocale()

  return (
    <nav
      id="step-nav"
      data-component="StepNav"
      aria-label={t('nav.steps')}
      className="flex flex-col gap-1"
    >
      {steps.map((step, index) => (
        <div
          key={step.id}
          id={`step-nav-step-${index}`}
          data-component="StepNav"
          className="flex flex-col gap-1"
        >
          <NavLink
            id={`step-nav-step-${index}-link`}
            data-component="StepNav"
            to={firstUnitPath(step)}
            className={cn(
              'flex items-start gap-3 rounded-md px-3 py-2 text-sm transition-colors',
              step.id === stepId
                ? 'bg-accent text-accent-foreground font-medium'
                : 'text-muted-foreground hover:bg-accent/50 hover:text-foreground',
            )}
          >
            <span
              id={`step-nav-step-${index}-number`}
              data-component="StepNav"
              className="text-muted-foreground/70 tabular-nums"
            >
              {String(index + 1).padStart(2, '0')}
            </span>
            <span id={`step-nav-step-${index}-title`} data-component="StepNav">
              {localise(step.title, locale)}
            </span>
          </NavLink>

          {step.id === stepId && (
            <ul
              id={`step-nav-step-${index}-units`}
              data-component="StepNav"
              className="border-border/60 ml-6 flex flex-col gap-0.5 border-l pl-2"
            >
              {step.units.map((unit, unitIndex) => (
                <li
                  key={unit.id}
                  id={`step-nav-step-${index}-unit-${unitIndex}`}
                  data-component="StepNav"
                >
                  <NavLink
                    id={`step-nav-step-${index}-unit-${unitIndex}-link`}
                    data-component="StepNav"
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
                    {localise(unit.title, locale)}
                  </NavLink>
                </li>
              ))}
            </ul>
          )}
        </div>
      ))}
    </nav>
  )
}
