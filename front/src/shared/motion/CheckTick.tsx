import { motion, useReducedMotion } from 'motion/react'
import type { Transition, Variants } from 'motion/react'
import { cn } from '@/shared/lib/utils'
import { DURATION, EASE_QUIET, GESTURE_STATES } from '@/shared/motion/motion'

/*
 * Adapted from Motion's own `react-base-checkbox` example
 * (https://motion.dev/examples/react-base-checkbox): the tick drawn as a stroked path whose
 * `pathLength` animates, and the press and hover scales riding on the control around it. The
 * example's source sits behind Motion+, so what is taken is the technique the page names rather
 * than its code, and the numbers are this app's own: the draw runs on `DURATION.state` and the
 * scales on `DURATION.tap`, because a tick appearing is a repaint and a squeeze under the finger is
 * an acknowledgement, which is exactly what those two are for.
 */

/**
 * The tick itself, drawn once in `viewBox` units so the stroke scales with the box rather than the
 * box being drawn around a fixed glyph. It travels from the short arm to the long one, which is the
 * direction a hand writes it.
 */
const TICK = 'M5 12.5 L10.5 18 L19 6.5'

/**
 * Checking and unchecking are deliberately not the same move, for the reason `SPRING_NAV` gives
 * about the sidebar: the arrival is worth saying out loud and the departure is not.
 *
 * Drawing waits out a `DURATION.tap` before it starts, so the disc has begun filling before the
 * tick appears on it and the two read as one event with an order rather than as two things firing
 * at once. Erasing has no delay and takes the shorter time: the student has already decided.
 *
 * `opacity` is a switch rather than a fade, and it exists only because a round line cap at
 * `pathLength: 0` still paints a dot. It is turned on the instant the draw starts and off only once
 * the retract has finished, so it is never the thing you see moving.
 */
const DRAW: Transition = {
  pathLength: { duration: DURATION.state, ease: EASE_QUIET, delay: DURATION.tap },
  opacity: { duration: 0, delay: DURATION.tap },
}

const ERASE: Transition = {
  pathLength: { duration: DURATION.tap, ease: EASE_QUIET },
  opacity: { duration: 0, delay: DURATION.tap },
}

/** Reduced motion gets the same two states with the time taken out, per `StepNav`'s pattern. */
const STILL: Transition = { duration: 0 }

/**
 * The press and hover scales, as variants rather than `whileTap`/`whileHover` on this element. The
 * reasoning is in `GESTURE_STATES`, whose two names these are keyed by: the gesture is recognised
 * on the control and worn here. A caller that does not spread it still gets the draw, the tick just
 * stops answering to the finger.
 *
 * Both stay inside a twentieth. This is the interface acknowledging a press rather than performing
 * one, and it is also the only scale in the app, so it has nothing to be consistent with and every
 * reason not to start.
 */
const GESTURE: Variants = {
  [GESTURE_STATES.whileHover]: { scale: 1.05 },
  [GESTURE_STATES.whileTap]: { scale: 0.92 },
}

export interface CheckTickProps {
  /** BEM id for the disc, from the caller. */
  id: string
  /** The React function rendering this, per the naming convention. */
  component: string
  /** Ticked or not. Changing it draws or erases; mounting with it already true does neither. */
  checked: boolean
  className?: string
}

/**
 * The mark on a checkbox: a disc that fills teal and a tick that draws itself onto it.
 *
 * It is the mark and not the control. Nothing in here listens for a click, carries a role or knows
 * what is being ticked, because the thing a student presses is the row around it and the state
 * belongs to whoever owns the storage. That keeps one tick for every checkbox in the app while
 * leaving each caller its own semantics.
 *
 * `initial={false}` is the load-bearing line. A `TaskCard` restored from localStorage renders
 * already done, and a board that redrew every finished tick on every page load would be
 * congratulating the student for work they did yesterday. So mount lands flat on whatever state it
 * is in and only a change after that has anything to animate, which is the same call `Reveal` makes
 * about a solved flag row.
 *
 * The disc's fill stays a CSS `transition-colors` rather than joining the animation above. Colour
 * is held in tokens and a `motion` target would have to name one in TSX, which is the one thing the
 * design system does not allow; the class list is also where every other state change in this app
 * paints itself, so this stays where a reader would look for it.
 *
 * `aria-hidden`, always: the state is on the caller's `role="checkbox"`, and a screen reader that
 * met this as well would hear the answer twice.
 */
export function CheckTick({ id, component, checked, className }: CheckTickProps) {
  const reduced = useReducedMotion()

  return (
    <motion.span
      id={id}
      data-component={component}
      data-state={checked ? 'checked' : 'unchecked'}
      aria-hidden
      variants={reduced ? undefined : GESTURE}
      transition={{ duration: DURATION.tap, ease: EASE_QUIET }}
      className={cn(
        'flex size-6 shrink-0 items-center justify-center rounded-full border transition-colors',
        checked ? 'border-primary bg-primary text-primary-foreground' : 'border-border',
        className,
      )}
    >
      <svg
        id={`${id}-tick`}
        data-component={component}
        viewBox="0 0 24 24"
        fill="none"
        className="size-4"
      >
        <motion.path
          d={TICK}
          stroke="currentColor"
          strokeWidth={3}
          strokeLinecap="round"
          strokeLinejoin="round"
          initial={false}
          animate={{ pathLength: checked ? 1 : 0, opacity: checked ? 1 : 0 }}
          transition={reduced ? STILL : checked ? DRAW : ERASE}
        />
      </svg>
    </motion.span>
  )
}
