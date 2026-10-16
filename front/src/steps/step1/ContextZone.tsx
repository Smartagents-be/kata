import { useId } from 'react'
import { useTranslation } from 'react-i18next'
import type { Assistant } from '@/shared/assistant/assistant'
import { useAssistant } from '@/shared/assistant/useAssistant'

/**
 * How much of a context a model uses well, drawn as 1 axis from empty to the window's limit with the
 * drop-off marked on it, and a meme over each side: the big brain over the stretch before the
 * drop-off, the brainlet over everything after it.
 *
 * **The memes are the owner's choice** (16 October 2026), made knowingly against the step's own rule
 * that a figure is drawn from tokens and a raster is only ever a screenshot. They are the picture and
 * nothing else: every number and label is text in the SVG, so the Dutch and the per-assistant limit
 * still work. The two PNGs in `public/` were cut from the owner's sketch, with the white keyed out.
 *
 * **The axis is to scale**, and that is the argument. On a 1M window the 100K to 150K band sits at
 * 10 to 15 percent of the line, so the big brain gets a sliver and the brainlet the rest. The
 * owner's sketch put the band near 40 percent; drawn honestly, the point is sharper.
 *
 * **The 2 memes are the same height** (150, owner's call, 16 October 2026). Sized to their stretch,
 * the big brain shrank to a thumbnail beside a wall of brainlet, and the slide read as one picture.
 * The axis carries the proportion, so the pictures do not have to: the brain spills past the band.
 *
 * **The band is a range and not a line** because the number is a practitioners' rule of thumb, not a
 * measured threshold, and `context.more-context-not.3` says so. Do not sharpen it into 1 tick.
 *
 * The limit's label is per assistant. Claude Code runs the current models on a 1M window; a Copilot
 * seat's limit differs per model in the picker, and many stop well short of 1M, so its label says
 * "up to" rather than placing every reader on the same line.
 */
const LEFT = 24
const RIGHT = 616
const AXIS_Y = 196
/** Tokens to x, on a line that ends at 1M. */
const at = (thousands: number) => LEFT + ((RIGHT - LEFT) * thousands) / 1000

const BAND_FROM = at(100)
const BAND_TO = at(150)
const BAND_MID = (BAND_FROM + BAND_TO) / 2

/** Both memes stand on the band's top edge at 1 height; widths follow each PNG's own ratio. */
const MEME_H = 150
const MEME_Y = AXIS_Y - 10 - MEME_H

/** Typed per assistant, so a third one is a compile error here rather than a wrong limit. */
const LIMIT: Record<Assistant, string> = {
  claude: 'context-zone.limit.claude',
  copilot: 'context-zone.limit.copilot',
}

export function ContextZone() {
  const { t } = useTranslation('step1')
  const { assistant } = useAssistant()
  const titleId = useId()

  return (
    <figure id="context-zone" data-component="ContextZone" className="my-8 flex justify-center">
      <svg
        id="context-zone-svg"
        data-component="ContextZone"
        viewBox="0 28 640 224"
        role="img"
        aria-labelledby={titleId}
        className="h-auto w-full max-w-xl"
      >
        <title id={titleId} data-component="ContextZone">
          {t('context-zone.description')}
        </title>

        {/* the sliver before the drop-off: starts at the axis's start and spills past the band */}
        <image
          id="context-zone-sharp"
          data-component="ContextZone"
          href="/context-zone-sharp.png"
          x={LEFT - 8}
          y={MEME_Y}
          width="153"
          height={MEME_H}
        />

        {/* everything after it */}
        <image
          id="context-zone-dull"
          data-component="ContextZone"
          href="/context-zone-dull.png"
          x="232"
          y={MEME_Y}
          width="378"
          height={MEME_H}
        />

        {/* the axis: teal while the model is sharp, muted after */}
        <line
          id="context-zone-axis-sharp"
          data-component="ContextZone"
          x1={LEFT}
          y1={AXIS_Y}
          x2={BAND_MID}
          y2={AXIS_Y}
          strokeWidth="2.5"
          className="stroke-primary"
        />
        <line
          id="context-zone-axis-dull"
          data-component="ContextZone"
          x1={BAND_MID}
          y1={AXIS_Y}
          x2={RIGHT}
          y2={AXIS_Y}
          strokeWidth="2.5"
          className="stroke-muted-foreground/50"
        />

        {/* the drop-off, as a band because nobody measured a line */}
        <rect
          id="context-zone-band"
          data-component="ContextZone"
          x={BAND_FROM}
          y={AXIS_Y - 10}
          width={BAND_TO - BAND_FROM}
          height="20"
          rx="3"
          className="fill-primary/25"
        />
        <text
          id="context-zone-band-label"
          data-component="ContextZone"
          x={BAND_MID}
          y={AXIS_Y + 30}
          fontSize="13"
          textAnchor="middle"
          className="fill-foreground font-mono"
        >
          {t('context-zone.band')}
        </text>

        {/* the two ends */}
        <line
          id="context-zone-start-tick"
          data-component="ContextZone"
          x1={LEFT}
          y1={AXIS_Y - 8}
          x2={LEFT}
          y2={AXIS_Y + 8}
          strokeWidth="2"
          className="stroke-primary"
        />
        <line
          id="context-zone-limit-tick"
          data-component="ContextZone"
          x1={RIGHT}
          y1={AXIS_Y - 8}
          x2={RIGHT}
          y2={AXIS_Y + 8}
          strokeWidth="2"
          className="stroke-muted-foreground"
        />
        <text
          id="context-zone-limit-label"
          data-component="ContextZone"
          x={RIGHT}
          y={AXIS_Y + 30}
          fontSize="13"
          textAnchor="end"
          className="fill-muted-foreground"
        >
          {t(LIMIT[assistant])}
        </text>
      </svg>
    </figure>
  )
}
