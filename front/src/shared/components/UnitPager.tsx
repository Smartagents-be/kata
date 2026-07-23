import { ArrowLeftIcon, ArrowRightIcon } from 'lucide-react'
import { Link } from 'react-router-dom'
import { useTranslation } from 'react-i18next'
import { Button } from '@/shared/components/ui/button'
import { useStepText } from '@/shared/i18n/useStepText'
import { neighbours, unitPath, type UnitLocation } from '@/steps'

/**
 * Forward and back at the bottom of every unit. The neighbours come from the flattened reading
 * order in src/steps/index.ts, so the last unit of a step leads straight into the first unit of
 * the next one. At either end of the curriculum the button is simply absent.
 */
export function UnitPager({ stepId, unitId }: { stepId: string; unitId: string }) {
  const { t } = useTranslation()
  const { previous, next } = neighbours(stepId, unitId)

  return (
    <nav
      id="unit-pager"
      data-component="UnitPager"
      aria-label={t('nav.units')}
      className="flex items-center justify-between gap-4 border-t pt-6"
    >
      {/* The empty span keeps "next" against the right edge on the first unit. */}
      {previous ? (
        <PagerLink location={previous} direction="previous" />
      ) : (
        <span id="unit-pager-spacer" data-component="UnitPager" />
      )}
      {next && <PagerLink location={next} direction="next" />}
    </nav>
  )
}

function PagerLink({
  location,
  direction,
}: {
  location: UnitLocation
  direction: 'previous' | 'next'
}) {
  const { t } = useTranslation()
  // The neighbour may live in another step, so its title is read from that step's namespace.
  const { text } = useStepText(location.step.id)
  const back = direction === 'previous'

  return (
    <Button asChild variant={back ? 'ghost' : 'default'} size="lg" className="h-auto max-w-[45%] py-2">
      {/* asChild: the id and data-component are merged onto the Link that replaces the button. */}
      <Link
        id={`unit-pager-${direction}`}
        data-component="PagerLink"
        to={unitPath(location.step.id, location.unit.id)}
      >
        {back && (
          <ArrowLeftIcon
            id="unit-pager-previous-icon"
            data-component="PagerLink"
            data-icon="inline-start"
          />
        )}
        <span
          id={`unit-pager-${direction}-text`}
          data-component="PagerLink"
          className={cnColumn(back)}
        >
          <span
            id={`unit-pager-${direction}-hint`}
            data-component="PagerLink"
            className="text-[0.7rem] font-normal opacity-70"
          >
            {back ? t('unit.previous') : t('unit.next')}
          </span>
          <span
            id={`unit-pager-${direction}-title`}
            data-component="PagerLink"
            className="max-w-full truncate"
          >
            {text(location.unit.title)}
          </span>
        </span>
        {!back && (
          <ArrowRightIcon
            id="unit-pager-next-icon"
            data-component="PagerLink"
            data-icon="inline-end"
          />
        )}
      </Link>
    </Button>
  )
}

function cnColumn(back: boolean): string {
  return `flex min-w-0 flex-col leading-tight ${back ? 'items-start' : 'items-end'}`
}
