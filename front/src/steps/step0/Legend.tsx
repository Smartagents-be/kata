import { CoinsIcon, GemIcon, PuzzleIcon } from 'lucide-react'
import { useStepText } from '@/shared/i18n/useStepText'
import { cn } from '@/shared/lib/utils'

/**
 * The icon legend on the welcome page. A couple of markers turn up in the margins as the kata goes
 * on, so this names them once and a reader knows them on sight: a gem for a hidden gem worth its own
 * detour, and a coin for a way to spend fewer tokens. Its wording comes from the step0 locale block
 * under `welcome.legend`, so it translates with the rest of the page.
 */
export function Legend() {
  const { text } = useStepText('step0')

  const items = [
    {
      id: 'gem',
      Icon: GemIcon,
      iconClass: 'text-primary',
      title: text('welcome.legend.gem.title'),
      body: text('welcome.legend.gem.body'),
    },
    {
      id: 'coin',
      Icon: CoinsIcon,
      iconClass: 'text-amber-500',
      title: text('welcome.legend.coin.title'),
      body: text('welcome.legend.coin.body'),
    },
    {
      id: 'pattern',
      Icon: PuzzleIcon,
      iconClass: 'text-violet-500',
      title: text('welcome.legend.pattern.title'),
      body: text('welcome.legend.pattern.body'),
    },
  ]

  return (
    <ul id="legend" data-component="Legend" className="my-6 flex list-none flex-col gap-3 pl-0">
      {items.map(({ id, Icon, iconClass, title, body }, index) => (
        <li
          key={id}
          id={`legend-item-${index}`}
          data-component="Legend"
          data-state={id}
          className="flex items-start gap-3"
        >
          <Icon
            id={`legend-item-${index}-icon`}
            data-component="Legend"
            aria-hidden
            className={cn('mt-0.5 size-5 shrink-0', iconClass)}
          />
          <span id={`legend-item-${index}-text`} data-component="Legend" className="text-sm">
            <span
              id={`legend-item-${index}-title`}
              data-component="Legend"
              className="font-medium"
            >
              {title}.
            </span>{' '}
            {body}
          </span>
        </li>
      ))}
    </ul>
  )
}
