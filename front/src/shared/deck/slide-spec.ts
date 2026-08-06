import type { ReactNode } from 'react'

/**
 * What a slide is, as data.
 *
 * The deck used to be literal JSX with a hand-typed `index` on every slide and a hand-maintained
 * `TOTAL` beside them. That is fine for one slide and unworkable at forty: inserting a slide meant
 * renumbering every slide after it. So a slide is now a spec in a list, `SlideTemplate` renders it,
 * and the numbering falls out of the array position.
 *
 * The kind decides three things, and the reasoning is in `SlideTemplate`. It decides how loud the
 * heading is: a `title` and a `divider` are punctuation marks and are the largest, a `statement`
 * is one claim and nothing else, and a `figure` slide sets its heading back so the drawing under it
 * is what the room looks at. It decides where the slide sits, which is a split rather than a
 * choice per kind: the text-only kinds take `golden` and land where the opening question does,
 * while a `figure` slide takes `top` and hands the 80px it saves to the drawing. And it decides
 * the ground: a `title` is a step's own card, one per module, and is the only slide on the dark
 * header surface, so the deck's rhythm is four dark cards and everything light between them. A
 * `divider` marks a unit inside a module and stays on the light ground for exactly that reason.
 */
export type SlideKind = 'title' | 'divider' | 'figure' | 'statement'

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
   * Message keys, one per line, for the rare slide that is a short list rather than one claim:
   * an exercise's moves, a recap's costs. Lean on purpose - three or four entries, each a few
   * words, or the slide becomes the tutor's script. Takes the same `<hi>`/`<mute>` markup as the
   * title. A slide carries `note` or `points`, not both.
   */
  points?: string[]
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
