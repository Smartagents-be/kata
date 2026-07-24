import { ArrowLeftIcon, ArrowRightIcon } from 'lucide-react'
import { Link } from 'react-router-dom'
import { useTranslation } from 'react-i18next'
import { useStepText } from '@/shared/i18n/useStepText'
import { unitKey } from '@/shared/progress/progress'
import { useProgress } from '@/shared/progress/useProgress'
import { cn } from '@/shared/lib/utils'
import { neighbours, unitPath, type UnitLocation } from '@/steps'

/**
 * Forward and back at the bottom of every unit. The neighbours come from the flattened reading
 * order in src/steps/index.ts, so the last unit of a step leads straight into the first unit of
 * the next one. At either end of the curriculum the button is simply absent.
 *
 * Two equal cells rather than two small buttons: at the foot of a page these are the only things
 * to click, so they are sized like the decision they are. Forward is the filled teal one, because
 * carrying on reading is the primary action of every unit.
 */
export function UnitPager({ stepId, unitId }: { stepId: string; unitId: string }) {
  const { t } = useTranslation()
  const { markComplete } = useProgress()
  const { previous, next } = neighbours(stepId, unitId)

  return (
    <nav
      id="unit-pager"
      data-component="UnitPager"
      aria-label={t('nav.units')}
      className="grid grid-cols-2 gap-3 border-t pt-6"
    >
      {/* The empty span keeps "next" in the right-hand cell on the first unit. */}
      {previous ? (
        <PagerLink location={previous} direction="previous" />
      ) : (
        <span id="unit-pager-spacer" data-component="UnitPager" />
      )}
      {/* Moving on is what marks a unit done: the check appears in the sidebar as you leave. */}
      {next && (
        <PagerLink
          location={next}
          direction="next"
          onActivate={() => markComplete(unitKey(stepId, unitId))}
        />
      )}
    </nav>
  )
}

function PagerLink({
  location,
  direction,
  onActivate,
}: {
  location: UnitLocation
  direction: 'previous' | 'next'
  /** Fired as the link is followed; used to record the unit just left as complete. */
  onActivate?: () => void
}) {
  const { t } = useTranslation()
  // The neighbour may live in another step, so its title is read from that step's namespace.
  const { text } = useStepText(location.step.id)
  const back = direction === 'previous'

  return (
    <Link
      id={`unit-pager-${direction}`}
      data-component="PagerLink"
      to={unitPath(location.step.id, location.unit.id)}
      onClick={onActivate}
      className={cn(
        'focus-visible:border-ring focus-visible:ring-ring/50 flex min-w-0 items-center gap-3 rounded-xl px-4 py-3 transition-colors outline-none focus-visible:ring-3',
        back
          ? 'border-border bg-card hover:border-primary/40 hover:bg-muted border'
          : 'bg-primary text-primary-foreground justify-end border border-transparent text-right hover:bg-[color-mix(in_oklch,var(--primary),black_12%)]',
      )}
    >
      {back && (
        <ArrowLeftIcon
          id="unit-pager-previous-icon"
          data-component="PagerLink"
          aria-hidden
          className="text-muted-foreground size-4.5 shrink-0"
        />
      )}
      <span
        id={`unit-pager-${direction}-text`}
        data-component="PagerLink"
        className={cn('flex min-w-0 flex-col leading-tight', back ? 'items-start' : 'items-end')}
      >
        <span
          id={`unit-pager-${direction}-hint`}
          data-component="PagerLink"
          className={cn('eyebrow text-[0.625rem]', back ? 'text-muted-foreground' : 'opacity-75')}
        >
          {back ? t('unit.previous') : t('unit.next')}
        </span>
        <span
          id={`unit-pager-${direction}-title`}
          data-component="PagerLink"
          className="mt-1 max-w-full truncate font-medium"
        >
          {text(location.unit.title)}
        </span>
      </span>
      {!back && (
        <ArrowRightIcon
          id="unit-pager-next-icon"
          data-component="PagerLink"
          aria-hidden
          className="size-4.5 shrink-0"
        />
      )}
    </Link>
  )
}
