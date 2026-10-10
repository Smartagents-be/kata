import { ChevronUp } from 'lucide-react'
import type { CSSProperties } from 'react'
import { useTranslation } from 'react-i18next'

/**
 * The software lifecycle three times: the way it runs today, with agents bolted on, and AI-native.
 * It sits in `change`, in the section `person-still-decides`, and it is redrawn from the AI-native
 * SDLC page on smartagents.be, which builds on Anthropic's AI-native SDLC playbook. The caption names
 * that and nothing else. **Its Dutch labels are that page's own words, taken verbatim**, so a change
 * on the site is a reason to revisit them and a style pass is not. It opened step 2's `gates` until October 2026 and moved here because what it
 * argues is the organisation's lifecycle rather than a gate a student wires up; `gates.lead.2` keeps
 * the one sentence the gates need from it and links here.
 *
 * **The band narrows where the work waits, and that is the whole first argument.** Today it pinches
 * at `build`; with agents it pinches twice, at `analysis` and `review`, because what you asked for
 * and whoever reads what came back are now the slow desks. The third row does not pinch at all.
 * That is the claim the site makes and the one the unit builds on: the bottleneck does not
 * disappear, it moves, and in the end it moves to the moment someone decides.
 *
 * **Teal is a gate and nothing else is teal**, on step 2's rule that teal is what the shape adds.
 * Only the third row has gates, four of them, each on the seam between two phases where a person
 * says yes: intent after `product`, spec after `analysis`, the change after `review`, the release
 * after `test`. The list under the row names them in order. Do not add machine gates to this
 * drawing: those are step 2's `GateReach`, and this figure is about where a person still decides.
 *
 * **The return path under the third row is dashed**, on the step 1 reading of a dash, and it is the
 * only path in the drawing: production feeding the next piece of work is what makes it one run rather
 * than a line. It is three borders on one box, `WorkflowTimeline`'s trick, so it reflows with the
 * band rather than carrying coordinates.
 *
 * The band is an SVG stretched under a DOM grid rather than one SVG, on the site's own precedent:
 * the six phase names have to stay legible at phone width in both languages, and text inside a
 * stretched viewBox would stretch with it. `PipelineShift`, one section down in the same unit, is the
 * drawing this one is easiest to confuse with, and they argue different things: that one is time on
 * one scale, this one is where the work queues and where a person stands. Neither section's prose
 * mentions the other figure.
 */
const PHASES = ['product', 'analysis', 'build', 'review', 'test', 'release'] as const
type Phase = (typeof PHASES)[number]

/** How far the band pinches in at a phase, in a 100-unit-tall viewBox. Absent means not at all. */
const STAGES: readonly { key: string; waits: Partial<Record<Phase, number>>; gated: boolean }[] = [
  { key: 'today', waits: { build: 30 }, gated: false },
  { key: 'assisted', waits: { analysis: 23, review: 27 }, gated: false },
  { key: 'native', waits: {}, gated: true },
]

/** The four decisions, each on the seam after the phase it closes. */
const GATES = [
  { key: 'intent', after: 1 },
  { key: 'spec', after: 2 },
  { key: 'change', after: 4 },
  { key: 'release', after: 5 },
] as const

const COL = 100
const EDGE = 2

/**
 * The band's outline, in a `600 x 100` viewBox stretched to the row, or `100 x 600` stretched to a
 * column when `tall`. One edge runs through the centre of every phase at that phase's pinch and
 * eases between them, and the other mirrors it. Tall is the same path with its axes swapped, which
 * is what keeps the phone layout and the wide one the same drawing.
 */
function channel(waits: Partial<Record<Phase, number>>, tall = false): string {
  const at = (along: number, across: number) => (tall ? `${across} ${along}` : `${along} ${across}`)
  const ys = PHASES.map((phase) => EDGE + (waits[phase] ?? 0))
  const centre = (i: number) => i * COL + COL / 2
  const last = PHASES.length - 1
  const end = PHASES.length * COL

  const near = [`M ${at(0, ys[0])}`, `L ${at(centre(0), ys[0])}`]
  for (let i = 1; i <= last; i++) {
    const mid = i * COL
    near.push(`C ${at(mid, ys[i - 1])} ${at(mid, ys[i])} ${at(centre(i), ys[i])}`)
  }
  near.push(`L ${at(end, ys[last])}`)

  const far = [`L ${at(end, 100 - ys[last])}`, `L ${at(centre(last), 100 - ys[last])}`]
  for (let i = last; i >= 1; i--) {
    const mid = i * COL
    far.push(
      `C ${at(mid, 100 - ys[i])} ${at(mid, 100 - ys[i - 1])} ${at(centre(i - 1), 100 - ys[i - 1])}`,
    )
  }
  far.push(`L ${at(0, 100 - ys[0])} Z`)

  return [...near, ...far].join(' ')
}

export function SdlcStages() {
  const { t } = useTranslation('step3')

  return (
    <figure id="sdlc-stages" data-component="SdlcStages" className="not-prose my-8 grid gap-6">
      {STAGES.map((stage) => (
        <div
          key={stage.key}
          id={`sdlc-stages-${stage.key}`}
          data-component="SdlcStages"
          className="grid gap-2"
        >
          <p
            id={`sdlc-stages-${stage.key}-head`}
            data-component="SdlcStages"
            className="text-sm"
          >
            <span
              id={`sdlc-stages-${stage.key}-name`}
              data-component="SdlcStages"
              className="text-foreground mr-2 font-medium"
            >
              {t(`sdlc-stages.${stage.key}.name`)}
            </span>
            <span
              id={`sdlc-stages-${stage.key}-body`}
              data-component="SdlcStages"
              className="text-muted-foreground"
            >
              {t(`sdlc-stages.${stage.key}.body`)}
            </span>
          </p>

          <div
            id={`sdlc-stages-${stage.key}-band`}
            data-component="SdlcStages"
            // A column of six under `sm`, where six labels side by side collide, and a row above it.
            className="relative mx-auto h-64 w-40 sm:h-12 sm:w-full"
          >
            <svg
              id={`sdlc-stages-${stage.key}-channel-tall`}
              data-component="SdlcStages"
              viewBox={`0 0 100 ${PHASES.length * COL}`}
              preserveAspectRatio="none"
              aria-hidden="true"
              focusable="false"
              className="absolute inset-0 h-full w-full sm:hidden"
            >
              <path
                id={`sdlc-stages-${stage.key}-channel-tall-path`}
                data-component="SdlcStages"
                d={channel(stage.waits, true)}
                className="fill-muted"
              />
            </svg>
            <svg
              id={`sdlc-stages-${stage.key}-channel`}
              data-component="SdlcStages"
              viewBox={`0 0 ${PHASES.length * COL} 100`}
              preserveAspectRatio="none"
              aria-hidden="true"
              focusable="false"
              className="absolute inset-0 hidden h-full w-full sm:block"
            >
              <path
                id={`sdlc-stages-${stage.key}-channel-path`}
                data-component="SdlcStages"
                d={channel(stage.waits)}
                className="fill-muted"
              />
            </svg>

            <ol
              id={`sdlc-stages-${stage.key}-phases`}
              data-component="SdlcStages"
              className="relative grid h-full grid-rows-6 sm:grid-cols-6 sm:grid-rows-1"
            >
              {PHASES.map((phase) => {
                const waits = phase in stage.waits
                return (
                  <li
                    key={phase}
                    id={`sdlc-stages-${stage.key}-phase-${phase}`}
                    data-component="SdlcStages"
                    className={
                      waits
                        ? 'text-foreground flex items-center justify-center text-xs font-semibold'
                        : 'text-muted-foreground flex items-center justify-center text-xs'
                    }
                  >
                    {t(`sdlc-stages.phase.${phase}`)}
                    {waits && <span className="sr-only">{t('sdlc-stages.waits-here')}</span>}
                  </li>
                )
              })}
            </ol>

            {stage.gated &&
              GATES.map((gate, index) => (
                <span
                  key={gate.key}
                  id={`sdlc-stages-${stage.key}-gate-${gate.key}`}
                  data-component="SdlcStages"
                  aria-hidden="true"
                  style={{ '--at': `${(gate.after / PHASES.length) * 100}%` } as CSSProperties}
                  className="bg-primary text-primary-foreground absolute inset-x-0 top-[var(--at)] flex h-4 -translate-y-1/2 items-center justify-center text-xs font-semibold sm:inset-x-auto sm:inset-y-0 sm:top-0 sm:left-[var(--at)] sm:h-auto sm:w-4 sm:-translate-x-1/2 sm:translate-y-0"
                >
                  {index + 1}
                </span>
              ))}
          </div>

          {stage.gated && (
            <>
              <div
                id={`sdlc-stages-${stage.key}-return`}
                data-component="SdlcStages"
                className="relative mx-[calc(100%/12)]"
              >
                <div
                  id={`sdlc-stages-${stage.key}-return-path`}
                  data-component="SdlcStages"
                  className="border-muted-foreground/50 hidden h-4 border-r border-b border-l border-dashed sm:block"
                />
                <ChevronUp
                  id={`sdlc-stages-${stage.key}-return-arrow`}
                  data-component="SdlcStages"
                  aria-hidden="true"
                  className="text-muted-foreground absolute top-0 left-0 hidden size-4 -translate-x-1/2 -translate-y-1/2 sm:block"
                />
                <p
                  id={`sdlc-stages-${stage.key}-return-label`}
                  data-component="SdlcStages"
                  className="text-muted-foreground mt-1.5 text-center text-xs"
                >
                  {t('sdlc-stages.return')}
                </p>
              </div>

              <ol
                id={`sdlc-stages-${stage.key}-gates`}
                data-component="SdlcStages"
                aria-label={t('sdlc-stages.gates')}
                className="flex flex-wrap gap-x-4 gap-y-1 text-xs"
              >
                {GATES.map((gate, index) => (
                  <li
                    key={gate.key}
                    id={`sdlc-stages-${stage.key}-gates-${gate.key}`}
                    data-component="SdlcStages"
                    className="text-foreground flex items-center gap-1.5"
                  >
                    <span
                      id={`sdlc-stages-${stage.key}-gates-${gate.key}-num`}
                      data-component="SdlcStages"
                      className="bg-primary text-primary-foreground inline-flex size-4 items-center justify-center rounded-sm text-xs font-semibold"
                    >
                      {index + 1}
                    </span>
                    {t(`sdlc-stages.gate.${gate.key}`)}
                  </li>
                ))}
              </ol>
            </>
          )}
        </div>
      ))}

      <ul
        id="sdlc-stages-legend"
        data-component="SdlcStages"
        className="text-muted-foreground flex flex-wrap gap-x-6 gap-y-1 text-xs"
      >
        <li id="sdlc-stages-legend-waits" data-component="SdlcStages" className="flex items-center gap-2">
          <svg
            id="sdlc-stages-legend-waits-mark"
            data-component="SdlcStages"
            viewBox={`0 0 ${PHASES.length * COL} 100`}
            preserveAspectRatio="none"
            aria-hidden="true"
            focusable="false"
            className="h-3 w-8"
          >
            <path d={channel({ build: 30 })} className="fill-muted-foreground/40" />
          </svg>
          {t('sdlc-stages.legend.waits')}
        </li>
        <li id="sdlc-stages-legend-gate" data-component="SdlcStages" className="flex items-center gap-2">
          <span
            id="sdlc-stages-legend-gate-mark"
            data-component="SdlcStages"
            aria-hidden="true"
            className="bg-primary inline-block h-3 w-1.5"
          />
          {t('sdlc-stages.legend.gate')}
        </li>
      </ul>

      <figcaption
        id="sdlc-stages-caption"
        data-component="SdlcStages"
        className="text-muted-foreground text-xs"
      >
        {t('sdlc-stages.caption')}
      </figcaption>
    </figure>
  )
}
