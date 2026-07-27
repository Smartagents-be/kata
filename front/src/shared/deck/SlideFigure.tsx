import type { ReactNode } from 'react'

/**
 * A course figure, on a projector.
 *
 * The figures on these slides are the *same components* the units render, not redrawings of them,
 * so what a room sees on the board is what the students have on their own screens. Nothing in
 * `steps/step1/` is touched to make that work, and that is the point: two drawings of one idea
 * drift apart, and a slide deck is exactly where nobody notices that they have.
 *
 * What stands in the way is size. A page figure is built for a prose column: the SVG ones cap
 * themselves at `max-w-xl` and the DOM ones (ModelTiers, ModelPricing, SessionMakeup) are sized in
 * rem. The canvas here is a fixed 1920x1080, where rem still resolves to a browser font-size the
 * canvas knows nothing about, so a card built for a page lands about a third of the size it should
 * be next to an 84px heading.
 *
 * So the figure is magnified with a transform rather than restyled. That handles the SVG ones and
 * the rem-sized ones identically, which restyling could not, and it is the same move the engine
 * itself makes: `deck-stage` draws the whole 1920x1080 canvas and scales it as one unit, so a
 * nested scale is the idiom of this file's surroundings rather than a trick played on them. Both
 * are composited transforms over real layout, so text stays vector-crisp at any projector size.
 *
 * `scale` is per slide because the figures are not one size. `PromptInContext` is a single oval and
 * takes about 2.2; `BundleCompare` is two full sessions side by side and takes about 1.1.
 */
export function SlideFigure({
  block,
  scale = 1.6,
  width = 900,
  children,
}: {
  /** The owning slide's BEM block, so this reads `#deck-tokens-split-figure`. */
  block: string
  scale?: number
  /** The width the figure is laid out at *before* magnifying. Its natural page width. */
  width?: number
  children: ReactNode
}) {
  return (
    // The figure takes whatever the frame has left under the heading, and is centred in it. The
    // transform paints outside that box without affecting layout, so `overflow-hidden` is what
    // guarantees an over-scaled figure is clipped rather than allowed to run over the footer.
    <div
      id={`${block}-figure`}
      data-component="SlideFigure"
      className="flex flex-1 items-center justify-center overflow-hidden"
    >
      <div
        id={`${block}-figure-scale`}
        data-component="SlideFigure"
        style={{ transform: `scale(${scale})`, width: `${width}px` }}
        className={
          // Two overrides, both undoing something a figure carries only because it normally sits in
          // prose. `my-0` drops the `my-8` that spaces it from the paragraphs either side, which
          // here would just push it off centre. `max-w-none` lifts the `max-w-xl` the SVG figures
          // cap themselves at, so the drawing fills `width` before it is magnified rather than
          // being magnified with empty space either side of it.
          'origin-center shrink-0 [&_figure]:my-0 [&_svg]:max-w-none'
        }
      >
        {children}
      </div>
    </div>
  )
}
