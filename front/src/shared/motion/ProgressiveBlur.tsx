import { cn } from '@/shared/lib/utils'

/*
 * Adapted from Skiper UI's `skiper41` (https://skiper-ui.com/v1/skiper41), which is the whole of
 * this technique: a gradient, a mask and a backdrop filter stacked so the blur itself ramps instead
 * of stopping at a line. Changed here: the ground colour comes from a token rather than a literal,
 * the position classes go through `cn` so a caller can make it sticky inside a scroll container,
 * and it takes the id and `data-component` every element in this app carries.
 * Skiper UI, free tier, attribution required. Author: @gurvinder-singh02, https://gxuri.me
 */

export interface ProgressiveBlurProps {
  /** BEM id, from the caller. */
  id: string
  /** The React function rendering this, per the naming convention. */
  component: string
  /**
   * The surface this fades into, as a CSS colour. Pass a token
   * (`var(--card)`), never a literal: `index.css` is the only file in this app that holds a colour.
   */
  background: string
  /** Which edge it hangs from. */
  position?: 'top' | 'bottom'
  height?: string
  blur?: string
  className?: string
}

/**
 * A one-way ramp from a surface colour into nothing, blurring what passes under it.
 *
 * It marks a soft boundary where content runs out of room rather than out of content: the sidebar
 * caps its height and scrolls a long curriculum inside itself, and without this the last visible
 * step is cut clean across, which reads as the end of the list. A ramp reads as "there is more".
 *
 * There is no animation in here at all, and that is deliberate. The blur is a static edge treatment
 * on a scroll container; making it fade in and out with scroll position would be motion attached to
 * something that is not changing state.
 */
export function ProgressiveBlur({
  id,
  component,
  background,
  position = 'bottom',
  height = '4rem',
  blur = '3px',
  className,
}: ProgressiveBlurProps) {
  const fromTop = position === 'top'

  return (
    <div
      id={id}
      data-component={component}
      aria-hidden
      className={cn('pointer-events-none absolute left-0 w-full select-none', className)}
      style={{
        [fromTop ? 'top' : 'bottom']: 0,
        height,
        background: `linear-gradient(to ${fromTop ? 'top' : 'bottom'}, transparent, ${background})`,
        // The mask is what turns a hard-edged blur into a ramp: the filter applies at full strength
        // under the opaque half of the mask and fades out with it.
        maskImage: `linear-gradient(to ${fromTop ? 'bottom' : 'top'}, black 50%, transparent)`,
        WebkitMaskImage: `linear-gradient(to ${fromTop ? 'bottom' : 'top'}, black 50%, transparent)`,
        backdropFilter: `blur(${blur})`,
        WebkitBackdropFilter: `blur(${blur})`,
      }}
    />
  )
}
