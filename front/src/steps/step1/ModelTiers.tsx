import { PanelChip } from '@/shared/components/Panel'
import { useStepText } from '@/shared/i18n/useStepText'

/**
 * The three tiers, top to bottom, cheapest first: the student reads down from the one that is fast
 * and needs the task spelled out to the one that holds the most together.
 *
 * **The order is `ModelPricing`'s and must stay it.** That table runs cheapest first because the
 * ratio the prose states reads in that direction (call the small one a unit, the middle three, the
 * top five), and `model.speed.1` twelve lines further down reads the same way. These cards sat
 * most-expensive-first against it, so the unit sorted the same three things in two directions on one
 * page. Flipping either of the two figures now means flipping the other, and `PickTheTier`'s column
 * with them.
 *
 * Deliberately version-free. A card naming this quarter's release is wrong by the next one, and the
 * dispositions are what survive. The paragraph that used to say so out loud is gone, so the only
 * thing dating these three is the small `(July 2026)` line under the figure, which dates the cards
 * rather than the unit.
 */
const TIERS = ['haiku', 'sonnet', 'opus'] as const

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
    /*
      Three hairline-ruled rows rather than three cards. The tier name is the eyebrow riding on each
      rule, which is the same gesture a panel opens on, so the three read as one figure instead of as
      a stack of boxes. **No numeral gutter here**, unlike a task's moves or a board's rows: these
      three are a scale rather than a sequence, and numbering them would say to do the first one
      first.
    */
    <div id="model-tiers" data-component="ModelTiers" className="my-8">
      {TIERS.map((tier, index) => (
        <div
          key={tier}
          id={`model-tiers-item-${index}`}
          data-component="ModelTiers"
          className="border-border/50 border-t py-5 first:border-t-0 first:pt-0"
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
            className="text-muted-foreground mt-2 max-w-[58ch] text-sm leading-relaxed"
          >
            {text(`tiers.${tier}.body`)}
          </p>

          <ul
            id={`model-tiers-item-${index}-tags`}
            data-component="ModelTiers"
            className="mt-3 flex flex-wrap gap-2"
          >
            {TAGS.map((tag) => (
              <li key={tag}>
                <PanelChip id={`model-tiers-item-${index}-tag-${tag - 1}`} tone="muted">
                  {text(`tiers.${tier}.tag.${tag}`)}
                </PanelChip>
              </li>
            ))}
          </ul>
        </div>
      ))}
    </div>
  )
}
