/**
 * The motion scale, in the units `motion/react` wants.
 *
 * These are the same four numbers as the `--duration-*` properties in `index.css`, in seconds
 * rather than milliseconds, because CSS transitions and JS animations both draw from one scale and
 * a component should not have to pick which file to copy from. If a number changes it changes in
 * both places, which is the cost of the split; there is no way to read a CSS custom property from a
 * `motion` transition without measuring the DOM, and measuring for a constant is not worth it.
 *
 * The name says what kind of move it is rather than how fast it looks: `tap` acknowledges a press,
 * `state` repaints something that changed, `panel` moves a block of layout, `reveal` is the one
 * authored sequence in the app. Anything reaching for a fifth number should be asking whether it is
 * really a fifth kind of move.
 */
export const DURATION = {
  tap: 0.12,
  state: 0.2,
  panel: 0.32,
  reveal: 0.56,
} as const

/**
 * One curve, an exponential ease-out: leaves fast, settles slowly. It reads as a thing arriving
 * rather than a thing being thrown, which is the whole register this interface works in. Nothing
 * eases in *and* out, because a symmetric curve on a short move reads as lag, and only `SPRING_NAV`
 * below is allowed to overshoot. Mirrors `--ease-quiet` in `index.css`.
 */
export const EASE_QUIET = [0.16, 1, 0.3, 1] as const

/**
 * The one spring, and the one thing in the app that overshoots: a sidebar step accordion *opening*.
 *
 * It is deliberately one direction only. A spring closing onto a height of zero cannot overshoot,
 * because there is no such thing as a negative height, so the excursion that reads as a bounce on
 * the way out gets clamped at the floor instead: the box stalls a few pixels open for a fifth of a
 * second and then drops the rest, which reads as the animation snagging rather than springing. The
 * collapse takes `DURATION.panel` on `EASE_QUIET` for that reason, and the asymmetry is the point:
 * the bounce says "this opened", and nothing needs to be said about a thing getting out of the way.
 *
 * It is a spring rather than a fifth `DURATION` because the move has no honest duration. A step's
 * unit list opens from nothing to whatever height its units happen to need, and that distance is
 * different for every step, so a fixed 320ms makes the two-unit step feel slow and the six-unit
 * step feel hurried. A spring is told the stiffness rather than the time, so every step opens at
 * the same *rate* and takes as long as its own contents deserve.
 *
 * The overshoot is the point rather than a side effect of picking numbers. Everything else here is
 * the interface repainting itself, and repaint should not draw the eye; this is the one place the
 * student themselves moved the sidebar, and a list that springs past its resting height and settles
 * says "this opened" far more plainly than a list that slides quietly into place. The damping ratio
 * is about 0.69, which is roughly a 5% overshoot: enough to read as alive, not enough to bounce
 * twice. Anything softer than this and the whole rule above should be reconsidered rather than the
 * numbers nudged.
 */
export const SPRING_NAV = {
  type: 'spring',
  stiffness: 340,
  damping: 24,
  mass: 0.9,
} as const

/**
 * The two names a control and its mark agree on, so that a pointer over the row moves the thing
 * inside it.
 *
 * A checkbox is a whole row and its tick is 24 pixels in the corner of it. Recognising the gesture
 * on the tick would make it a second, smaller control sitting inside the first, and hovering a
 * control that is not the one you are aiming at is worse than no hover at all. So the row is the
 * `motion` element and spreads this onto itself, `motion` walks the label down to any child holding
 * variants under these names, and the mark wears what the row felt. It is two strings rather than
 * two literals typed at each end because a label that matches nothing fails silently: the gesture
 * is simply never worn, and there is nothing on screen or in the console to say why.
 */
export const GESTURE_STATES = { whileHover: 'hovered', whileTap: 'pressed' } as const
