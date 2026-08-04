import { motion, useReducedMotion } from 'motion/react'
import type { ReactNode } from 'react'
import { cn } from '@/shared/lib/utils'
import { DURATION, EASE_QUIET } from '@/shared/motion/motion'

/*
 * Adapted from Skiper UI's `skiper66` (https://skiper-ui.com/v1/skiper66), whose clip technique and
 * its note that a `clipPath` is the tool for a clean geometric cut are what this is built on. The
 * torn-paper path and the image card it wrapped are not: this system has no decorative edges, so
 * what survives is the approach rather than the drawing.
 * Skiper UI, free tier, attribution required. Author: @gurvinder-singh02, https://gxuri.me
 */

export interface RevealProps {
  /** BEM id for the wrapper, from the caller. */
  id: string
  /** The React function rendering this, per the naming convention. */
  component: string
  /** Flip to true to play the wipe once. Mount with it already true and nothing animates. */
  play: boolean
  children: ReactNode
  className?: string
}

/**
 * A left-to-right wipe with a teal edge travelling ahead of it.
 *
 * This is the app's one authored moment, and its shape comes from what it reveals: a flag is a
 * reading the machine produced, so it resolves the way an instrument resolves rather than the way a
 * prize is presented. The `clipPath` opens with a hard edge, because a soft one reads as a fade and
 * a fade says "appearing" where this has to say "resolving". A 1px teal rule runs just ahead of the
 * cut and dims as it leaves, so the row reads as having been scanned rather than switched on.
 *
 * `play` is a level rather than an event on purpose. A board seeded from localStorage renders every
 * solved row with `play` already true at mount, and `initial={false}` then puts it straight at the
 * finished state, so a reload shows the collected flags sitting there instead of replaying the
 * board. Only a row that was locked when it mounted has anything to travel.
 *
 * Under `prefers-reduced-motion` the wipe is dropped and the content is simply there. The clip *is*
 * the content's visibility, so this cannot fall back to "animate opacity instead" the way
 * `MotionConfig` does elsewhere; it has to be skipped outright, which is why this reads the
 * preference itself rather than leaving it to the provider in `App.tsx`.
 */
export function Reveal({ id, component, play, children, className }: RevealProps) {
  const reduced = useReducedMotion()

  if (reduced) {
    return (
      <span id={id} data-component={component} className={cn('relative block', className)}>
        {children}
      </span>
    )
  }

  return (
    <span
      id={id}
      data-component={component}
      data-state={play ? 'revealed' : 'hidden'}
      className={cn('relative block overflow-hidden', className)}
    >
      <motion.span
        id={`${id}-body`}
        data-component={component}
        // `h-full` so a caller can stretch the whole thing over a box (the flag row's tint sits in
        // an `absolute inset-0` wrapper). Against an auto-height parent, which is the inline case,
        // a percentage height resolves to auto and this does nothing.
        className="block h-full"
        initial={play ? false : { clipPath: 'inset(0 100% 0 0)' }}
        animate={{ clipPath: play ? 'inset(0 0% 0 0)' : 'inset(0 100% 0 0)' }}
        transition={{ duration: DURATION.panel, ease: EASE_QUIET }}
      >
        {children}
      </motion.span>

      {/*
        The scan line, drawn as a full-width box wearing a 1px teal right border and slid across by
        its own width. That is what keeps it on the compositor: translating a 1px element by 100%
        would move it one pixel, so the travelling thing has to be as wide as the distance. It is
        `aria-hidden` and out of the flow, so the flag is readable with this element never drawn.
      */}
      <motion.span
        id={`${id}-edge`}
        data-component={component}
        aria-hidden
        className="border-primary pointer-events-none absolute inset-y-0 left-0 w-full border-r"
        initial={play ? false : { x: '-100%', opacity: 0 }}
        animate={play ? { x: '0%', opacity: [0, 1, 1, 0] } : { x: '-100%', opacity: 0 }}
        transition={{
          duration: DURATION.panel,
          ease: EASE_QUIET,
          // The line travels on the shared curve but fades on its own schedule: in over the first
          // frames, held while it crosses, gone before it reaches the far edge, so it never parks
          // as a teal rule down the right-hand side. `times` belongs to opacity alone, since `x`
          // is a two-keyframe animation and would not know what to do with four stops.
          opacity: {
            duration: DURATION.panel,
            ease: 'linear',
            times: [0, 0.12, 0.7, 1],
          },
        }}
      />
    </span>
  )
}
