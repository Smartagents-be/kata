import { useStepText } from '@/shared/i18n/useStepText'

/**
 * The three tiers, top to bottom, cheapest last. Order is the argument: the student reads down from
 * the model that costs the most and holds the most together to the one that is fast and needs the
 * task spelled out.
 *
 * Deliberately version-free. A card naming this quarter's release is wrong by the next one, and the
 * dispositions are what survive: the prose beside this figure says so.
 */
const TIERS = ['opus', 'sonnet', 'haiku'] as const

const TAGS = [1, 2, 3] as const

/**
 * The `model` unit's only figure, and it argues one thing: three tiers, three dispositions, three
 * kinds of task. What they cost and how fast they answer is prose, not card furniture, because both
 * need a sentence of qualification that will not fit on a chip.
 *
 * Not an SVG. There is no geometry here, so this joins the step's diagram vocabulary by staying out
 * of it rather than by borrowing a frame that would mean nothing.
 *
 * Tier names stay English in every language, like every other machine-shaped string in this step;
 * only the disposition, the body and the tags are translated.
 */
export function ModelTiers() {
  const { text } = useStepText('step1')

  return (
    <div id="model-tiers" data-component="ModelTiers" className="my-8 flex flex-col gap-4">
      {TIERS.map((tier, index) => (
        <div
          key={tier}
          id={`model-tiers-item-${index}`}
          data-component="ModelTiers"
          className="bg-card rounded-xl border p-5"
        >
          <div
            id={`model-tiers-item-${index}-header`}
            data-component="ModelTiers"
            className="flex flex-wrap items-baseline gap-x-3 gap-y-1"
          >
            <span
              id={`model-tiers-item-${index}-name`}
              data-component="ModelTiers"
              className="eyebrow text-primary"
            >
              {text(`tiers.${tier}.name`)}
            </span>
            <span
              id={`model-tiers-item-${index}-character`}
              data-component="ModelTiers"
              className="font-medium"
            >
              {text(`tiers.${tier}.character`)}
            </span>
          </div>

          <p
            id={`model-tiers-item-${index}-body`}
            data-component="ModelTiers"
            className="text-muted-foreground mt-2 text-sm"
          >
            {text(`tiers.${tier}.body`)}
          </p>

          <ul
            id={`model-tiers-item-${index}-tags`}
            data-component="ModelTiers"
            className="mt-3 flex flex-wrap gap-2"
          >
            {TAGS.map((tag) => (
              <li
                key={tag}
                id={`model-tiers-item-${index}-tag-${tag - 1}`}
                data-component="ModelTiers"
                className="text-muted-foreground rounded-full border px-2.5 py-0.5 text-xs"
              >
                {text(`tiers.${tier}.tag.${tag}`)}
              </li>
            ))}
          </ul>
        </div>
      ))}
    </div>
  )
}
