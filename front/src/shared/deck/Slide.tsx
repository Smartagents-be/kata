import type { ReactNode } from 'react'
import { cn } from '@/shared/lib/utils'

/**
 * One slide, and the layout contract every slide in the deck keeps.
 *
 * The canvas is a fixed 1920x1080 that the engine scales as a single unit, so there is nothing
 * responsive to do here and nothing is measured in rem: an 84px heading is 84px. Sizes follow the
 * scale the tutor's other decks use, so a slide written here and a slide written there are the same
 * size.
 *
 * The frame reserves 88px at the foot for the footer, and the footer is the only thing allowed to
 * sit in it. Do not shrink that padding and do not position slide content against the bottom edge,
 * or a long slide runs over the page number.
 *
 * `align` picks between the three shapes. A content slide is `top`: the eyebrow and heading stay
 * pinned so they do not move as you page through a run of them. A divider is `center`, because
 * there is no title to hold still. A slide that is one statement is `golden`, which sits it high:
 * dead centre reads as a placeholder, and a title above the middle reads as placed.
 *
 * `golden` puts **the title** on the golden division, not the block around it. The line is 1080 /
 * phi^3, so 255px, and the h1's own top edge is what lands on it: the 180px here is that 255 less
 * the eyebrow above it, which is a 35px mono line plus its 40px gap. So the number assumes the
 * shape these slides have, an eyebrow and then the title. A `golden` slide with no eyebrow puts its
 * heading at 180px instead, which is high but not wrong; give it the 75px back if that reads badly.
 * It replaces the frame's top padding rather than adding to it.
 */
export function Slide({
  index,
  total,
  label,
  align = 'top',
  children,
}: {
  index: number
  total: number
  label: string
  align?: 'top' | 'center' | 'golden'
  children: ReactNode
}) {
  return (
    <section
      id={`deck-slide-${index}`}
      data-component="Slide"
      // The engine reads data-label for its own slide list.
      data-label={label}
      // The engine's canvas is hard white and lives in its shadow root, where document CSS cannot
      // reach it. The slide covers the canvas edge to edge, so the ground colour is painted here.
      className="bg-background text-foreground font-sans relative overflow-hidden"
    >
      <div
        id={`deck-slide-${index}-frame`}
        data-component="Slide"
        className={cn(
          'absolute inset-0 flex flex-col px-[120px] pt-[100px] pb-[88px]',
          align === 'center' && 'justify-center',
          align === 'golden' && 'pt-[180px]',
        )}
      >
        {children}
      </div>

      <footer
        id={`deck-slide-${index}-footer`}
        data-component="Slide"
        className="absolute right-[120px] bottom-[40px] left-[120px] flex items-baseline justify-between"
      >
        <span
          id={`deck-slide-${index}-wordmark`}
          data-component="Slide"
          className="font-heading text-[22px] font-bold tracking-tight"
        >
          Agentic development
        </span>
        {/* A count, so it is set in the machine face like every other count in the app. */}
        <span
          id={`deck-slide-${index}-pageno`}
          data-component="Slide"
          className="text-muted-foreground font-mono text-[20px] tabular-nums"
        >
          {index + 1} / {total}
        </span>
      </footer>
    </section>
  )
}
