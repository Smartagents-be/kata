import { useId } from 'react'
import { useTranslation } from 'react-i18next'

/**
 * The two profile shapes side by side, under `enablement`'s `t-shaped` section at the
 * `data-figure="skill-shape"` slot. Nothing after it reads the drawing back, so its own labels carry
 * what it argues. That held when `t-shaped` closed the unit, and it still holds now that it is the
 * middle section with `where-day-goes` and its two paragraphs beneath it.
 *
 * **The stem is the same depth in both, and that is the whole drawing.** Both stems start and end on
 * the same two lines, so the T is the I with a bar added on top rather than a shallower version of
 * it. A T drawn with a shortened stem argues "get shallower", which is not the claim the section
 * under it makes and not one anybody should take away from a course about engineering.
 *
 * The crossbar is the only teal thing here, on the step's own colour rule: teal is what the shape
 * adds. The stems are muted in both halves because the depth is what you already had.
 */
const STEM_TOP = 110
const STEM_BOTTOM = 250
const STEM_W = 40

/** Centres of the two halves, each the middle of its 320-wide column. */
const I_CENTRE = 160
const T_CENTRE = 480

/** The crossbar sits on top of the stem rather than eating into it. */
const BAR_W = 200
const BAR_H = 36

export function SkillShape() {
  const { t } = useTranslation('step2')
  const titleId = useId()

  return (
    <figure id="skill-shape" data-component="SkillShape" className="my-8 flex justify-center">
      <svg
        id="skill-shape-svg"
        data-component="SkillShape"
        viewBox="0 0 640 268"
        role="img"
        aria-labelledby={titleId}
        className="h-auto w-full"
      >
        {/* useId, not a BEM id: aria-labelledby has to be unique per instance, not per component. */}
        <title id={titleId} data-component="SkillShape">
          {t('skill-shape.description')}
        </title>

        {/* the shape one specialism buys, and nothing either side of it */}
        <g id="skill-shape-i" data-component="SkillShape">
          <text
            id="skill-shape-i-label"
            data-component="SkillShape"
            x={I_CENTRE}
            y="22"
            fontSize="14"
            textAnchor="middle"
            className="fill-foreground font-medium"
          >
            {t('skill-shape.i-label')}
          </text>
          {/* The crossbar this one does not have, dashed on the step-1 reading of a dash: what is
              drawn dashed is what is not there. It sits exactly where the T's bar sits, which is
              what makes the two halves comparable instead of one being a drawing with a hole in it. */}
          <rect
            id="skill-shape-i-missing-bar"
            data-component="SkillShape"
            x={I_CENTRE - BAR_W / 2}
            y={STEM_TOP - BAR_H}
            width={BAR_W}
            height={BAR_H}
            strokeWidth="1.5"
            strokeDasharray="5 5"
            className="fill-none stroke-muted-foreground/35"
          />
          <rect
            id="skill-shape-i-stem"
            data-component="SkillShape"
            x={I_CENTRE - STEM_W / 2}
            y={STEM_TOP}
            width={STEM_W}
            height={STEM_BOTTOM - STEM_TOP}
            className="fill-muted-foreground/50"
          />
        </g>

        <line x1="320" y1="14" x2="320" y2="262" strokeWidth="1" className="stroke-border" />

        {/* the same stem, with the crossbar the afternoon actually asks for */}
        <g id="skill-shape-t" data-component="SkillShape">
          <text
            id="skill-shape-t-label"
            data-component="SkillShape"
            x={T_CENTRE}
            y="22"
            fontSize="14"
            textAnchor="middle"
            className="fill-foreground font-medium"
          >
            {t('skill-shape.t-label')}
          </text>

          <path
            id="skill-shape-t-breadth-bracket"
            data-component="SkillShape"
            d={`M${T_CENTRE - BAR_W / 2} 56 v8 M${T_CENTRE - BAR_W / 2} 60 H${T_CENTRE + BAR_W / 2} M${T_CENTRE + BAR_W / 2} 56 v8`}
            strokeWidth="1"
            className="fill-none stroke-border"
          />
          <text
            id="skill-shape-t-breadth"
            data-component="SkillShape"
            x={T_CENTRE}
            y="46"
            fontSize="13"
            textAnchor="middle"
            className="fill-muted-foreground"
          >
            {t('skill-shape.breadth')}
          </text>

          <rect
            id="skill-shape-t-bar"
            data-component="SkillShape"
            x={T_CENTRE - BAR_W / 2}
            y={STEM_TOP - BAR_H}
            width={BAR_W}
            height={BAR_H}
            className="fill-primary"
          />
          <rect
            id="skill-shape-t-stem"
            data-component="SkillShape"
            x={T_CENTRE - STEM_W / 2}
            y={STEM_TOP}
            width={STEM_W}
            height={STEM_BOTTOM - STEM_TOP}
            className="fill-muted-foreground/50"
          />
        </g>

        {/* Both stems end on this line, which is the figure's one claim. It runs the full width of
            the viewBox so the figure's edges land on the prose column's, the way LoopsPerHour's
            band does. It carries no label: the two stems landing on it say it, and a caption under
            it said the same thing in words. */}
        <line
          id="skill-shape-depth-line"
          data-component="SkillShape"
          x1="1"
          y1={STEM_BOTTOM}
          x2="639"
          y2={STEM_BOTTOM}
          strokeWidth="1.5"
          strokeDasharray="5 5"
          className="stroke-muted-foreground/45"
        />
      </svg>
    </figure>
  )
}
