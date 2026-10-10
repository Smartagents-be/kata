import { useId } from 'react'
import { useTranslation } from 'react-i18next'

/**
 * Three layers and three use cases cut straight through them. It sits in the `engineering` unit, at
 * the `data-figure="vertical-slices"` slot under `engineering.vertical-slices.1`.
 *
 * **The bands are the layers and the columns are the work.** Presentation, business logic and data
 * access run the full width in grey, because every application has them and drawing them is not the
 * claim. The slices are teal, on the step's rule that teal is what the shape adds: each one is 1
 * use case with its own share of every layer, and the gaps between them are drawn on purpose, so a
 * slice reads as self-contained rather than as a stripe of one wide block.
 *
 * **Two slices are done and the third is still being built**, and that is the argument. A finished
 * slice carries a check and "runs end to end", which is the feedback the section is about: it
 * arrives per use case, not after the last layer. The third is a lighter fill with no check and the
 * label "being built", rather than dashed, because a dash in this step already means a version that
 * was built and dropped (`IterationPaths`), and this one is on its way in.
 *
 * **There is no layer-by-layer panel beside it.** The paragraph above carries that contrast in one
 * sentence, and a second drawing of the wrong way would split the reader's attention over two
 * figures for a point the prose already made.
 *
 * **The brackets name the modules `DomainTree` draws** further down the page: `article-publishing`
 * holds the first 2 slices and `article-scheduling` the third. That is what makes the two figures a
 * pair, slices as the way the work is cut and modules as where it lands on disk, so a rename in one
 * is a rename in the other. Module names are literals, like every path in the course.
 */

const BAND_X = 16
const BAND_W = 608
const BAND_H = 44
const BAND_GAP = 4
const BAND_Y0 = 104
const LAYERS = ['presentation', 'logic', 'data'] as const

const SLICE_W = 120
const SLICE_XS = [176, 320, 464] as const
const SLICE_OVERHANG = 10
const SLICES = ['publish', 'rewrite', 'schedule'] as const
/** Which slices are finished. The last one is still being built. */
const DONE = [true, true, false] as const

const BANDS_BOTTOM = BAND_Y0 + LAYERS.length * BAND_H + (LAYERS.length - 1) * BAND_GAP
const SLICE_TOP = BAND_Y0 - SLICE_OVERHANG
const SLICE_BOTTOM = BANDS_BOTTOM + SLICE_OVERHANG

const BRACKET_Y = 50
const BRACKET_TICK = 8
const MODULES = [
  { name: 'article-publishing', from: 0, to: 1 },
  { name: 'article-scheduling', from: 2, to: 2 },
] as const

export function VerticalSlices() {
  const { t } = useTranslation('step2')
  const titleId = useId()

  return (
    <figure
      id="vertical-slices"
      data-component="VerticalSlices"
      className="my-8 flex justify-center"
    >
      <svg
        id="vertical-slices-svg"
        data-component="VerticalSlices"
        viewBox="0 0 640 330"
        role="img"
        aria-labelledby={titleId}
        className="h-auto w-full max-w-2xl"
      >
        <title id={titleId} data-component="VerticalSlices">
          {t('vertical-slices.description')}
        </title>

        {LAYERS.map((layer, index) => {
          const y = BAND_Y0 + index * (BAND_H + BAND_GAP)
          return (
            <g key={layer} id={`vertical-slices-layer-${layer}`} data-component="VerticalSlices">
              <rect
                id={`vertical-slices-layer-${layer}-band`}
                data-component="VerticalSlices"
                x={BAND_X}
                y={y}
                width={BAND_W}
                height={BAND_H}
                rx="4"
                className="fill-foreground/[0.08]"
              />
              <text
                id={`vertical-slices-layer-${layer}-label`}
                data-component="VerticalSlices"
                x={BAND_X + 12}
                y={y + BAND_H / 2 + 4}
                fontSize="12"
                className="fill-foreground"
              >
                {t(`vertical-slices.layer.${layer}`)}
              </text>
            </g>
          )
        })}

        {SLICES.map((slice, index) => {
          const x = SLICE_XS[index]
          const done = DONE[index]
          return (
            <g key={slice} id={`vertical-slices-slice-${slice}`} data-component="VerticalSlices">
              <text
                id={`vertical-slices-slice-${slice}-label`}
                data-component="VerticalSlices"
                x={x + SLICE_W / 2}
                y={SLICE_TOP - 10}
                fontSize="12"
                textAnchor="middle"
                className="fill-foreground"
              >
                {t(`vertical-slices.case.${slice}`)}
              </text>
              <rect
                id={`vertical-slices-slice-${slice}-column`}
                data-component="VerticalSlices"
                x={x}
                y={SLICE_TOP}
                width={SLICE_W}
                height={SLICE_BOTTOM - SLICE_TOP}
                rx="6"
                strokeWidth="1.5"
                className={
                  done ? 'fill-primary/25 stroke-primary' : 'fill-primary/[0.08] stroke-primary/40'
                }
              />
              {!done && (
                <text
                  id={`vertical-slices-slice-${slice}-building`}
                  data-component="VerticalSlices"
                  x={x + SLICE_W / 2}
                  y={SLICE_BOTTOM + 40}
                  fontSize="12"
                  textAnchor="middle"
                  className="fill-muted-foreground"
                >
                  {t('vertical-slices.building')}
                </text>
              )}
              {done && (
                <g id={`vertical-slices-slice-${slice}-done`} data-component="VerticalSlices">
                  <path
                    id={`vertical-slices-slice-${slice}-check`}
                    data-component="VerticalSlices"
                    d={`M ${x + SLICE_W / 2 - 8} ${SLICE_BOTTOM + 16} l 5 5 l 11 -11`}
                    fill="none"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    className="stroke-primary"
                  />
                  <text
                    id={`vertical-slices-slice-${slice}-done-label`}
                    data-component="VerticalSlices"
                    x={x + SLICE_W / 2}
                    y={SLICE_BOTTOM + 40}
                    fontSize="12"
                    textAnchor="middle"
                    className="fill-muted-foreground"
                  >
                    {t('vertical-slices.done')}
                  </text>
                </g>
              )}
            </g>
          )
        })}

        {MODULES.map((module) => {
          const x1 = SLICE_XS[module.from]
          const x2 = SLICE_XS[module.to] + SLICE_W
          return (
            <g
              key={module.name}
              id={`vertical-slices-module-${module.name}`}
              data-component="VerticalSlices"
            >
              <path
                id={`vertical-slices-module-${module.name}-bracket`}
                data-component="VerticalSlices"
                d={`M ${x1} ${BRACKET_Y + BRACKET_TICK} V ${BRACKET_Y} H ${x2} V ${
                  BRACKET_Y + BRACKET_TICK
                }`}
                fill="none"
                strokeWidth="1.5"
                className="stroke-muted-foreground/70"
              />
              <text
                id={`vertical-slices-module-${module.name}-label`}
                data-component="VerticalSlices"
                x={(x1 + x2) / 2}
                y={BRACKET_Y - 10}
                fontSize="12"
                textAnchor="middle"
                className="fill-muted-foreground font-mono"
              >
                {module.name}
              </text>
            </g>
          )
        })}

        <text
          id="vertical-slices-note"
          data-component="VerticalSlices"
          x={BAND_X + BAND_W / 2}
          y={320}
          fontSize="13"
          textAnchor="middle"
          className="fill-muted-foreground"
        >
          {t('vertical-slices.note')}
        </text>
      </svg>
    </figure>
  )
}
