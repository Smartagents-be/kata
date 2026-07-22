import { NavLink } from 'react-router-dom'
import { steps } from '@/content'
import { cn } from '@/lib/utils'

export function StepNav() {
  return (
    <nav aria-label="Steps" className="flex flex-col gap-1">
      {steps.map((step, index) => (
        <NavLink
          key={step.id}
          to={`/steps/${step.id}`}
          className={({ isActive }) =>
            cn(
              'flex items-start gap-3 rounded-md px-3 py-2 text-sm transition-colors',
              isActive
                ? 'bg-accent text-accent-foreground font-medium'
                : 'text-muted-foreground hover:bg-accent/50 hover:text-foreground',
            )
          }
        >
          <span className="text-muted-foreground/70 tabular-nums">
            {String(index + 1).padStart(2, '0')}
          </span>
          <span>{step.title}</span>
        </NavLink>
      ))}
    </nav>
  )
}
