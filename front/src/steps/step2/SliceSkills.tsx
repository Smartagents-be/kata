import { useId } from 'react'
import { useTranslation } from 'react-i18next'

/**
 * The T-shaped profile as a vertical slice asks for it, in `engineering`'s `Vertical slices`
 * section at the `data-figure="slice-skills"` slot under `engineering.vertical-slices.3`.
 *
 * **The crossbar is what 1 slice touches, named.** A slice runs from the screen to production, so
 * the cells across the top are the fields a developer meets on the way: frontend, CI/CD, cloud,
 * operations, security, AI and ML. The middle cell is the specialism, and the stem under it is that
 * specialism's depth, drawn as concrete parts rather than as a bar, so a reader sees what "deep"
 * means beside what "enough to judge" means.
 *
 * **This is a second figure for the same shape, and that is the owner's choice (October 2026).**
 * `SkillShape` under `enablement`'s `t-shaped` draws the shape abstractly, for a different reason
 * (the agent implements faster, so what is asked of you moves up a level). This one names the
 * fields, for the slice's reason. Keep them apart: do not give this one an I beside it, and do not
 * give `SkillShape` labels.
 *
 * Colour follows the step's rule that teal is what the shape adds: the breadth cells are teal, the
 * specialism and its stem are muted, because the depth is what you already had.
 */

const VIEW_W = 640

const CELL_W = 84
const CELL_GAP = 6
const BREADTH = ['frontend', 'cicd', 'cloud', 'specialism', 'ops', 'security', 'ai'] as const
/** Index of the specialism in the crossbar, which is where the stem hangs. */
const STEM_INDEX = 3

const ROW_W = BREADTH.length * CELL_W + (BREADTH.length - 1) * CELL_GAP
const ROW_X = (VIEW_W - ROW_W) / 2

const BRACKET_Y = 34
const BAR_Y = 48
const BAR_H = 44

const DEPTH = ['java', 'spring', 'sql', 'api'] as const
const DEPTH_Y0 = BAR_Y + BAR_H + CELL_GAP
const DEPTH_H = 36

const cellX = (index: number) => ROW_X + index * (CELL_W + CELL_GAP)
const STEM_X = cellX(STEM_INDEX)
const STEM_BOTTOM = DEPTH_Y0 + DEPTH.length * (DEPTH_H + CELL_GAP) - CELL_GAP

export function SliceSkills() {
  const { t } = useTranslation('step2')
  const titleId = useId()

  return (
    <figure id="slice-skills" data-component="SliceSkills" className="my-8 flex justify-center">
      <svg
        id="slice-skills-svg"
        data-component="SliceSkills"
        viewBox={`0 0 ${VIEW_W} ${STEM_BOTTOM + 4}`}
        role="img"
        aria-labelledby={titleId}
        className="h-auto w-full"
      >
        <title id={titleId} data-component="SliceSkills">
          {t('slice-skills.description')}
        </title>

        <text
          id="slice-skills-breadth-label"
          data-component="SliceSkills"
          x={VIEW_W / 2}
          y="18"
          fontSize="13"
          textAnchor="middle"
          className="fill-muted-foreground"
        >
          {t('slice-skills.breadth')}
        </text>
        <path
          id="slice-skills-breadth-bracket"
          data-component="SliceSkills"
          d={`M${ROW_X} ${BRACKET_Y + 6} V${BRACKET_Y} H${ROW_X + ROW_W} V${BRACKET_Y + 6}`}
          strokeWidth="1"
          className="fill-none stroke-border"
        />

        {BREADTH.map((cell, index) => {
          const x = cellX(index)
          const deep = index === STEM_INDEX
          return (
            <g key={cell} id={`slice-skills-cell-${cell}`} data-component="SliceSkills">
              <rect
                id={`slice-skills-cell-${cell}-box`}
                data-component="SliceSkills"
                x={x}
                y={BAR_Y}
                width={CELL_W}
                height={BAR_H}
                rx="4"
                strokeWidth="1.5"
                className={
                  deep
                    ? 'fill-muted-foreground/50 stroke-muted-foreground/50'
                    : 'fill-primary/25 stroke-primary'
                }
              />
              <text
                id={`slice-skills-cell-${cell}-label`}
                data-component="SliceSkills"
                x={x + CELL_W / 2}
                y={BAR_Y + BAR_H / 2 + 4}
                fontSize="12"
                textAnchor="middle"
                className={deep ? 'fill-foreground font-medium' : 'fill-foreground'}
              >
                {t(`slice-skills.cell.${cell}`)}
              </text>
            </g>
          )
        })}

        {DEPTH.map((part, index) => {
          const y = DEPTH_Y0 + index * (DEPTH_H + CELL_GAP)
          return (
            <g key={part} id={`slice-skills-depth-${part}`} data-component="SliceSkills">
              <rect
                id={`slice-skills-depth-${part}-box`}
                data-component="SliceSkills"
                x={STEM_X}
                y={y}
                width={CELL_W}
                height={DEPTH_H}
                rx="4"
                className="fill-muted-foreground/30"
              />
              <text
                id={`slice-skills-depth-${part}-label`}
                data-component="SliceSkills"
                x={STEM_X + CELL_W / 2}
                y={y + DEPTH_H / 2 + 4}
                fontSize="11"
                textAnchor="middle"
                className="fill-foreground"
              >
                {t(`slice-skills.depth.${part}`)}
              </text>
            </g>
          )
        })}

        <path
          id="slice-skills-depth-bracket"
          data-component="SliceSkills"
          d={`M${STEM_X + CELL_W + 10} ${DEPTH_Y0} h6 V${STEM_BOTTOM} h-6`}
          strokeWidth="1"
          className="fill-none stroke-border"
        />
        <text
          id="slice-skills-depth-label"
          data-component="SliceSkills"
          x={STEM_X + CELL_W + 26}
          y={(DEPTH_Y0 + STEM_BOTTOM) / 2 + 4}
          fontSize="13"
          className="fill-muted-foreground"
        >
          {t('slice-skills.depth-label')}
        </text>
      </svg>
    </figure>
  )
}
