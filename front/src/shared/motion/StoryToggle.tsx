import type { MouseEvent } from 'react'
import { PauseIcon, PlayIcon } from 'lucide-react'
import { useTranslation } from 'react-i18next'
import { cn } from '@/shared/lib/utils'
import type { StoryControl } from '@/shared/motion/useStory'

/**
 * The pause button under every animated figure (October 2026, at the owner's asking): a text button
 * in `HintDialog`'s register, set back and right-aligned under the drawing, because it is a control
 * on the figure rather than part of what the figure says. `className` lets the caller match the
 * drawing's own `max-w-*`, so the button sits under the drawing's right edge and not the column's.
 *
 * **A pointer click lets go of focus.** On a slide the deck advances on Space, and a button that
 * kept focus after a click would also toggle on that same Space and pause the figure the tutor was
 * moving past. A keyboard press (`detail` 0) keeps focus, so a keyboard user can press it again.
 */
export function StoryToggle({
  id,
  component,
  story,
  className,
}: {
  /** BEM block of the figure; the button is `${id}-toggle`. */
  id: string
  /** The React function rendering this, per the naming convention. */
  component: string
  story: StoryControl
  className?: string
}) {
  const { t } = useTranslation()
  const Icon = story.playing ? PauseIcon : PlayIcon
  const press = (event: MouseEvent<HTMLButtonElement>) => {
    story.toggle()
    if (event.detail > 0) event.currentTarget.blur()
  }

  return (
    <div id={`${id}-control`} data-component={component} className={cn('flex w-full justify-end', className)}>
      <button
        id={`${id}-toggle`}
        data-component={component}
        data-state={story.playing ? 'playing' : 'paused'}
        type="button"
        onClick={press}
        className="text-muted-foreground hover:text-primary focus-visible:ring-ring/50 inline-flex items-center gap-1.5 rounded-sm text-xs font-medium transition-colors outline-none focus-visible:ring-[3px]"
      >
        <Icon id={`${id}-toggle-icon`} data-component={component} aria-hidden className="size-3.5" />
        <span id={`${id}-toggle-label`} data-component={component}>
          {story.playing ? t('story.pause') : t('story.play')}
        </span>
      </button>
    </div>
  )
}
