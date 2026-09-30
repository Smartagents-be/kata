import { useId } from 'react'
import { useTranslation } from 'react-i18next'

/**
 * One change on its way out, and the four gates it passes: in the agent's own loop, when it says it
 * is done, before the merge, and before the release. Between them sit the five places a mistake can
 * have got to by the time a gate catches it, from the file the agent just wrote to production.
 *
 * **Speed and reach are one axis, and that is the drawing.** The further right a gate sits, the
 * slower it answers and the more a miss has already touched when it does. That is the `gates` unit's
 * last two sections at once: blast radius is how far along this band a mistake gets, and a fast gate
 * is one close enough to the left that the agent runs it inside its own loop. The regions widen and
 * darken left to right for that reason, and **they may not be drawn equal**: equal regions say every
 * gate costs the same to miss, which is the opposite claim.
 *
 * **The gates are the only teal thing**, on the step's rule that teal is what the shape adds, and
 * `SdlcStages` and `SameGate` colour theirs the same way. The last one answers in "a person" rather
 * than a time, which is where this drawing meets `SdlcStages`' fourth gate, and it is the one place
 * the two figures touch.
 *
 * It closes the `fast-enough` section and nothing after it reads it back, so the note under the band
 * carries the claim. Do not add a number to any gate: the times are orders of magnitude on purpose,
 * because the student's own build is the measurement and `GateWalk` under the unit asks for it.
 */
const X0 = 16
/** Each region's width, file to production. They widen on purpose; see above. */
const WIDTHS = [72, 96, 120, 148, 176] as const
const REGIONS = ['file', 'worktree', 'branch', 'main', 'production'] as const
const GATES = ['loop', 'done', 'merge', 'release'] as const
/** Darker the further out, as a class each so the ramp is a token and not an inline colour. */
const FILLS = [
  'fill-foreground/[0.04]',
  'fill-foreground/[0.08]',
  'fill-foreground/[0.12]',
  'fill-foreground/[0.16]',
  'fill-foreground/[0.20]',
] as const

const BAND_Y = 72
const BAND_H = 44
const GATE_W = 6
const OVERHANG = 8

export function GateReach() {
  const { t } = useTranslation('step2')
  const titleId = useId()

  const starts = WIDTHS.map((_, i) => X0 + WIDTHS.slice(0, i).reduce((a, b) => a + b, 0))
  const end = starts[starts.length - 1] + WIDTHS[WIDTHS.length - 1]

  return (
    <figure id="gate-reach" data-component="GateReach" className="my-8 flex justify-center">
      <svg
        id="gate-reach-svg"
        data-component="GateReach"
        viewBox="0 0 644 200"
        role="img"
        aria-labelledby={titleId}
        className="h-auto w-full max-w-2xl"
      >
        <title id={titleId} data-component="GateReach">
          {t('gate-reach.description')}
        </title>

        {REGIONS.map((region, index) => (
          <g key={region} id={`gate-reach-region-${region}`} data-component="GateReach">
            <rect
              id={`gate-reach-region-${region}-fill`}
              data-component="GateReach"
              x={starts[index]}
              y={BAND_Y}
              width={WIDTHS[index]}
              height={BAND_H}
              className={FILLS[index]}
            />
            <text
              id={`gate-reach-region-${region}-label`}
              data-component="GateReach"
              x={starts[index] + WIDTHS[index] / 2 + (index === 0 ? 0 : GATE_W / 2)}
              y={BAND_Y + BAND_H / 2 + 4}
              fontSize="12"
              textAnchor="middle"
              className="fill-foreground"
            >
              {t(`gate-reach.region.${region}`)}
            </text>
          </g>
        ))}

        {GATES.map((gate, index) => {
          const x = starts[index + 1]
          return (
            <g key={gate} id={`gate-reach-gate-${gate}`} data-component="GateReach">
              <rect
                id={`gate-reach-gate-${gate}-bar`}
                data-component="GateReach"
                x={x - GATE_W / 2}
                y={BAND_Y - OVERHANG}
                width={GATE_W}
                height={BAND_H + OVERHANG * 2}
                rx="2"
                className="fill-primary"
              />
              <text
                id={`gate-reach-gate-${gate}-name`}
                data-component="GateReach"
                x={x}
                y={BAND_Y - OVERHANG - 10}
                fontSize="12"
                textAnchor="middle"
                className="fill-foreground"
              >
                {t(`gate-reach.gate.${gate}.name`)}
              </text>
              <text
                id={`gate-reach-gate-${gate}-time`}
                data-component="GateReach"
                x={x}
                y={BAND_Y + BAND_H + OVERHANG + 18}
                fontSize="12"
                textAnchor="middle"
                className="fill-muted-foreground"
              >
                {t(`gate-reach.gate.${gate}.time`)}
              </text>
            </g>
          )
        })}

        <text
          id="gate-reach-heading"
          data-component="GateReach"
          x={X0}
          y={24}
          fontSize="12"
          className="fill-muted-foreground"
        >
          {t('gate-reach.heading')}
        </text>

        <text
          id="gate-reach-note"
          data-component="GateReach"
          x={(X0 + end) / 2}
          y={188}
          fontSize="13"
          textAnchor="middle"
          className="fill-muted-foreground"
        >
          {t('gate-reach.note')}
        </text>
      </svg>
    </figure>
  )
}
