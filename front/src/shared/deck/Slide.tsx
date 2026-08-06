import type { ReactNode } from 'react'
import { SmartAgentsMark } from '@/shared/components/SmartAgentsMark'
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
  surface = 'light',
  children,
}: {
  index: number
  total: number
  label: string
  align?: 'top' | 'center' | 'golden'
  /**
   * Which ground the slide sits on. `light` is the warm off-white every content slide keeps;
   * `dark` is the app's one dark surface, the deep-teal header, which the four module title cards
   * borrow so a step boundary reads from the back of the room. This is a per-slide surface, not
   * dark mode: the deck's dark-mode wrapper was removed on purpose and stays removed.
   */
  surface?: 'light' | 'dark'
  children: ReactNode
}) {
  const dark = surface === 'dark'

  return (
    <section
      id={`deck-slide-${index}`}
      data-component="Slide"
      // The engine reads data-label for its own slide list.
      data-label={label}
      // The engine's canvas is hard white and lives in its shadow root, where document CSS cannot
      // reach it. The slide covers the canvas edge to edge, so the ground colour is painted here.
      className={cn(
        'font-sans relative overflow-hidden',
        dark ? 'bg-header text-header-foreground' : 'bg-background text-foreground',
      )}
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

      {/* The hairline is the footer's own top edge, so the 88px reserve above it stays honest:
          16px of clearance under the line, then the 26px text row, all inside the reserve. */}
      <footer
        id={`deck-slide-${index}-footer`}
        data-component="Slide"
        className={cn(
          'absolute right-[120px] bottom-[40px] left-[120px] flex items-center justify-between border-t pt-[16px]',
          dark ? 'border-header-foreground/20' : 'border-border',
        )}
      >
        <span
          id={`deck-slide-${index}-wordmark`}
          data-component="Slide"
          className="font-heading text-[22px] font-bold tracking-tight"
        >
          Agentic development
        </span>
        <span
          id={`deck-slide-${index}-watermark`}
          data-component="Slide"
          className={cn(
            'flex items-center gap-[10px] text-[20px]',
            dark ? 'text-header-foreground/70' : 'text-muted-foreground',
          )}
        >
          <SmartAgentsMark size={26} />
          <span className={cn('font-semibold', dark ? 'text-header-foreground' : 'text-foreground')}>
            SmartAgents
          </span>
          <span>© 2026</span>
          {/* A count, so it is set in the machine face like every other count in the app. */}
          <span
            id={`deck-slide-${index}-pageno`}
            data-component="Slide"
            className="ml-[14px] font-mono text-[20px] tabular-nums"
          >
            {index + 1} / {total}
          </span>
        </span>
      </footer>
    </section>
  )
}
