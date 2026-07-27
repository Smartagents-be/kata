import type { ReactNode } from 'react'

/**
 * What a slide is, as data.
 *
 * The deck used to be literal JSX with a hand-typed `index` on every slide and a hand-maintained
 * `TOTAL` beside them. That is fine for one slide and unworkable at forty: inserting a slide meant
 * renumbering every slide after it. So a slide is now a spec in a list, `SlideTemplate` renders it,
 * and the numbering falls out of the array position.
 *
 * The kind decides two things, and the reasoning for both is in `SlideTemplate`. It decides how loud
 * the heading is: a `divider` is a punctuation mark between units and is the largest, a `statement`
 * is one claim and nothing else, and a `figure` slide sets its heading back so the drawing under it
 * is what the room looks at. And it decides where the slide sits, which is a split rather than three
 * choices: the two text-only kinds take `golden` and land where the opening question does, while a
 * `figure` slide takes `top` and hands the 80px it saves to the drawing.
 */
export type SlideKind = 'divider' | 'figure' | 'statement'

export interface SlideSpec {
  /**
   * The BEM block for everything this slide renders, e.g. `deck-tokens-split` giving
   * `#deck-tokens-split-title`. Named rather than indexed on purpose: the frame's own ids in
   * `Slide` carry the slide number, but content that moves when a slide is inserted ahead of it
   * would change id for no reason, and an id is meant to survive that.
   */
  id: string
  kind: SlideKind
  /**
   * The i18next namespace the keys below are looked up in. Defaults to `ui`, which is where the
   * deck's own chrome and the cross-step opening slide live. A step's slides pass their own
   * namespace, so their text sits beside the rest of that step's strings.
   */
  ns?: string
  /** Message key. The small mono label above the heading. */
  eyebrow?: string
  /** Message key. The one thing the slide says. */
  title: string
  /** Message key for a single supporting line under the heading. Use it rarely; see SlideTemplate. */
  note?: string
  /**
   * The drawing, which on these slides is a course figure rendered exactly as the unit renders it.
   * `shared` never reaches into a step, so the step passes the element in, the same arrangement
   * `Unit.figure` already uses.
   */
  figure?: ReactNode
  /**
   * How much to magnify {@link figure}. See `SlideFigure`: the figures are not one size, so this is
   * per slide rather than a constant.
   */
  scale?: number
  /**
   * The width {@link figure} is laid out at before it is magnified, when its natural page width is
   * not what reads best on a slide. A figure that wraps or crowds at the default wants this raised
   * and `scale` lowered to match.
   */
  figureWidth?: number
}
