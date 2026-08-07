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
 * the next one. At either end of the curriculum the link is simply absent and the one that is left
 * keeps its half rather than growing into the gap, pinned to the side it leads to: forward on the
 * right, back on the left. Nothing is drawn in the empty half, because a filled cell that leads
 * nowhere reads as a rendering fault.
 *
 * The shape is one footer strip rather than two buttons, and it comes from the design system's own
 * `Step Pager` file: a hairline box on the quiet ground, back on the neutral half and forward on a
 * filled one. Forward carries `--primary` at full strength, so it is the same fill as the primary
 * button inside a unit and moves the same way on hover. It carried `--header` before, the deep teal
 * of the band across the top of every page, and that was too heavy for a footer: at the foot of a
 * white page a near-black cell reads as a hole rather than as the way on. The other change is the
 * design's own: neither half carries a "Previous"/"Next" label, because the arrow says the direction
 * and the strip has room for one line. The label is still rendered, `sr-only`, so a screen reader
 * hears which way each half goes.
 *
 * Two things follow from forward being a filled cell rather than a tinted one. There is **no divider
 * between the halves**: the edge of the filled cell is the seam, and a hairline drawn on top of it
 * only shows on the light side, which reads as a rule that gives up halfway. And its focus ring is
 * white rather than `--ring`, because the ring token is the same teal it would have to be seen
 * against; that is the one thing here still naming white directly, the ink itself now coming from
 * `--primary-foreground` like every other filled control's.
 *
 * The border and the radius belong to the halves rather than to the strip around them, and that is
 * the fill's doing too. A border on the strip runs *behind* the forward half, so the filled cell
 * came out with a pale hairline tracing three of its sides, which reads as a stroke around a block
 * rather than as one strip; and a square-cornered border on a half clipped by a rounded parent
 * frays where the arc cuts it. So the light half carries the border and rounds its own outer end,
 * the filled half carries neither, and the two butt straight against each other. That is also why
 * there is no divider element: the edge of the filled cell is the seam.
 *
 * This is the only place the pager is drawn. Its light half is also the one bordered box the
 * flatness rule in `front/CLAUDE.md` leaves standing outside a figure: it is chrome at the foot of
 * the page rather than something a student works in, and without an edge it floats on the white
 * card. Do not put this drawing anywhere but here.
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
      className="flex items-stretch"
    >
      {previous && <PagerLink location={previous} direction="previous" solo={!next} />}
      {/* Moving on is what marks a unit done: the check appears in the sidebar as you leave. */}
      {next && (
        <PagerLink
          location={next}
          direction="next"
          solo={!previous}
          onActivate={() => markComplete(unitKey(stepId, unitId))}
        />
      )}
    </nav>
  )
}

function PagerLink({
  location,
  direction,
  solo,
  onActivate,
}: {
  location: UnitLocation
  direction: 'previous' | 'next'
  /** True at either end of the curriculum, where this half stands alone and rounds both ends. */
  solo: boolean
  /** Fired as the link is followed; used to record the unit just left as complete. */
  onActivate?: () => void
}) {
  const { t } = useTranslation()
  // The neighbour may live in another step, so its title is read from that step's namespace.
  const { text } = useStepText(location.step.id)
  const back = direction === 'previous'
  const Arrow = back ? ArrowLeftIcon : ArrowRightIcon

  return (
    <Link
      id={`unit-pager-${direction}`}
      data-component="PagerLink"
      to={unitPath(location.step.id, location.unit.id)}
      onClick={onActivate}
      className={cn(
        // The ring is inset so it is drawn on the fill rather than outside it, where on the filled
        // half it would ring the card instead of the control.
        'flex min-w-0 items-center gap-2.5 px-5 py-4 text-[0.9375rem] transition-colors outline-none focus-visible:ring-3 focus-visible:ring-inset',
        // A lone half keeps its half: stretched across the whole strip it reads as a bar rather
        // than as one of two, and forward is pushed to the right so each arrow still points off
        // the edge it leads to.
        solo ? 'basis-1/2 grow-0' : 'flex-1',
        solo && !back && 'ml-auto',
        back
          ? cn(
              'border-border text-muted-foreground hover:bg-accent/50 hover:text-foreground focus-visible:ring-ring/60 bg-muted/60 border font-medium',
              // Against the filled half there is nothing to draw: its fill is the seam, and a
              // hairline left in there shows as a gap between the two.
              solo ? 'rounded-xl' : 'rounded-l-xl border-r-0',
            )
          : // The primary teal, darkened on hover the way every other filled control here moves.
            // `--header` sat here first and was too heavy for a footer: at the foot of a white page
            // a near-black cell reads as a hole rather than as the way on.
            cn(
              'bg-primary text-primary-foreground justify-end text-right font-semibold hover:bg-[color-mix(in_oklch,var(--primary),black_12%)] focus-visible:ring-white/70',
              solo ? 'rounded-xl' : 'rounded-r-xl',
            ),
      )}
    >
      {back && (
        <Arrow
          id="unit-pager-previous-icon"
          data-component="PagerLink"
          aria-hidden
          className="size-4 shrink-0"
        />
      )}
      <span id={`unit-pager-${direction}-hint`} data-component="PagerLink" className="sr-only">
        {back ? t('unit.previous') : t('unit.next')}
      </span>
      <span
        id={`unit-pager-${direction}-title`}
        data-component="PagerLink"
        className="truncate"
      >
        {text(location.unit.title)}
      </span>
      {!back && (
        <Arrow
          id="unit-pager-next-icon"
          data-component="PagerLink"
          aria-hidden
          className="size-4 shrink-0"
        />
      )}
    </Link>
  )
}
