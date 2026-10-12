import { useId } from 'react'
import { useTranslation } from 'react-i18next'
import { StoryToggle } from '@/shared/motion/StoryToggle'
import { beat, useStory } from '@/shared/motion/useStory'

/**
 * How often an agent can prove in an hour that its change works, drawn twice. A try is a row of
 * boxes from "the agent changes the code" to "proof: it works", the agent's own work in teal and
 * everything in between dashed, which is the course's mark for where nothing is happening: the
 * change is on its way and nobody can see it yet. Not running it locally there are three boxes in
 * between, a push, a pipeline and a deploy to a test environment, under a bracket that says how long
 * that takes; running it locally there is one, a restart. A dot plays the hour through each row at
 * the speed of its minutes, and the count on the right is how many tries got all the way to proof.
 *
 * It closes the `run-own-machine` section of the `enablement` unit, at the
 * `data-figure="loops-per-hour"` slot, under the paragraph where the agent opens the page, sees the
 * wrong column and fixes it in the same pass: this figure is that pass, counted.
 *
 * **It was redrawn in October 2026 at the owner's asking, because the band it replaced did not
 * explain itself.** That was one hour as a band cut into turns of change, wait and look, two turns
 * against eleven, and a reader could not tell what a turn was or what the wait was for. Three things
 * from the redraw are the decisions now.
 *
 * **The question is the title and it does not change**: the owner called a caption that changed per
 * step unnecessary, so the drawing tells the story and the one line above it says what it answers.
 *
 * **The point is proof, wherever it runs.** The owner's own framing: the agent has to be able to show
 * that its result works, and a good setup is what makes that fast. So the slow row is not a row that
 * cannot check; it checks against a test environment, with more in between. The boxes name what is
 * in between (push, pipeline, deploy) rather than calling it "waiting", because "you wait for it" and
 * "you look at it" were rejected as saying nothing.
 *
 * **Little text, and real units.** The per-box minutes, a legend and a running clock label were in the
 * first redraw and came out at the owner's asking once the bracket carried the point. The minutes
 * stay in the data, so the dot keeps time, and the bracket is the one place they are printed. They are
 * illustrative and the caption-free drawing does not say so; the paragraph around it does not claim a
 * number. **It is still on the clock and never on step size**, which `IterationPaths` drew and the
 * owner removed: every row is the same hour, and what it counts is tries.
 *
 * The count is 2 against 10 with these minutes (23 and 6 per try), where the band said 2 against 11.
 * Reduced motion shows the end of the hour.
 */
type Stage = { kind: 'agent' | 'wait'; min: number; lines: string[] }

const W = 640
const BW = 92
const GAP = 16
const BOX_H = 54
const HOUR = 60
/** How long the hour takes to play, in ms. */
const PLAY = 18000
const START = 1500
const LENGTH = START + PLAY

export function LoopsPerHour() {
  const { t } = useTranslation('step2')
  const [ref, now, story] = useStory<SVGSVGElement>(LENGTH, 4000)
  const titleId = useId()
  const minute = beat(now, START, PLAY) * HOUR

  const rows: { id: string; name: string; y: number; stages: Stage[] }[] = [
    {
      id: 'slow',
      name: t('loops-per-hour.slow'),
      y: 82,
      stages: [
        { kind: 'agent', min: 2, lines: [t('loops-per-hour.change.1'), t('loops-per-hour.change.2')] },
        { kind: 'wait', min: 1, lines: [t('loops-per-hour.push')] },
        { kind: 'wait', min: 10, lines: [t('loops-per-hour.pipeline')] },
        { kind: 'wait', min: 7, lines: [t('loops-per-hour.deploy.1'), t('loops-per-hour.deploy.2')] },
        { kind: 'agent', min: 3, lines: [t('loops-per-hour.proof.1'), t('loops-per-hour.proof.2')] },
      ],
    },
    {
      id: 'fast',
      name: t('loops-per-hour.fast'),
      y: 200,
      stages: [
        { kind: 'agent', min: 2, lines: [t('loops-per-hour.change.1'), t('loops-per-hour.change.2')] },
        { kind: 'wait', min: 1, lines: [t('loops-per-hour.restart')] },
        { kind: 'agent', min: 3, lines: [t('loops-per-hour.proof.1'), t('loops-per-hour.proof.2')] },
      ],
    },
  ]

  return (
    <figure id="loops-per-hour" data-component="LoopsPerHour" className="my-8 flex flex-col items-center gap-2">
      <svg
        id="loops-per-hour-svg"
        data-component="LoopsPerHour"
        ref={ref}
        viewBox={`0 0 ${W} 290`}
        role="img"
        aria-labelledby={titleId}
        className="h-auto w-full"
      >
        <title id={titleId} data-component="LoopsPerHour">
          {t('loops-per-hour.description')}
        </title>

        <text
          id="loops-per-hour-question"
          data-component="LoopsPerHour"
          x="1"
          y="20"
          fontSize="15"
          className="fill-foreground font-medium"
        >
          {t('loops-per-hour.question')}
        </text>
        {/* the hour, filling as it plays: the same hour for both rows */}
        <rect
          id="loops-per-hour-hour"
          data-component="LoopsPerHour"
          x="1"
          y="32"
          width={W - 2}
          height="8"
          rx="4"
          strokeWidth="1"
          className="fill-muted stroke-border"
        />
        <rect
          id="loops-per-hour-hour-fill"
          data-component="LoopsPerHour"
          x="1"
          y="32"
          width={((W - 2) * minute) / HOUR}
          height="8"
          rx="4"
          className="fill-primary"
        />

        {rows.map((row) => {
          const total = row.stages.reduce((sum, s) => sum + s.min, 0)
          const tries = Math.floor(minute / total + 1e-9)
          const within = minute - tries * total
          let from = 0
          const placed = row.stages.map((stage, index) => {
            const x = 1 + index * (BW + GAP)
            const at = { ...stage, x, from, to: from + stage.min }
            from += stage.min
            return at
          })
          const current = placed.find((s) => within < s.to) ?? placed[placed.length - 1]
          const k = Math.min(1, (within - current.from) / (current.to - current.from))
          const waits = placed.filter((s) => s.kind === 'wait')
          const bx0 = waits[0].x
          const bx1 = waits[waits.length - 1].x + BW
          const between = waits.reduce((sum, s) => sum + s.min, 0)
          const block = `loops-per-hour-${row.id}`
          return (
            <g key={row.id} id={block} data-component="LoopsPerHour">
              <text
                id={`${block}-name`}
                data-component="LoopsPerHour"
                x="1"
                y={row.y - 14}
                fontSize="14"
                className="fill-foreground font-medium"
              >
                {row.name}
              </text>
              <text
                id={`${block}-count`}
                data-component="LoopsPerHour"
                x={W - 1}
                y={row.y - 14}
                fontSize="14"
                textAnchor="end"
                className="fill-foreground font-mono font-medium"
              >
                {t('loops-per-hour.proven', { n: tries })}
              </text>
              {placed.map((stage, index) => (
                <g key={index} id={`${block}-stage-${index}`} data-component="LoopsPerHour">
                  {index > 0 && (
                    <path
                      id={`${block}-stage-${index}-link`}
                      data-component="LoopsPerHour"
                      d={`M ${stage.x - GAP} ${row.y + BOX_H / 2} H ${stage.x}`}
                      strokeWidth="1.5"
                      className="stroke-primary/40"
                    />
                  )}
                  <rect
                    id={`${block}-stage-${index}-box`}
                    data-component="LoopsPerHour"
                    x={stage.x}
                    y={row.y}
                    width={BW}
                    height={BOX_H}
                    rx="8"
                    strokeWidth={stage === current ? 2.6 : 1.5}
                    strokeDasharray={stage.kind === 'wait' ? '5 4' : undefined}
                    className={
                      stage.kind === 'agent'
                        ? 'fill-primary/10 stroke-primary'
                        : 'fill-background stroke-primary/50'
                    }
                  />
                  {stage.lines.map((line, n) => (
                    <text
                      key={n}
                      id={`${block}-stage-${index}-label-${n}`}
                      data-component="LoopsPerHour"
                      x={stage.x + BW / 2}
                      y={row.y + BOX_H / 2 + 4 - (stage.lines.length - 1) * 7 + n * 14}
                      fontSize="12"
                      textAnchor="middle"
                      className={
                        index === placed.length - 1 && n === 0
                          ? 'fill-foreground font-semibold'
                          : 'fill-foreground'
                      }
                    >
                      {line}
                    </text>
                  ))}
                </g>
              ))}
              {/* everything between the change and the proof, and how long it takes */}
              <path
                id={`${block}-between`}
                data-component="LoopsPerHour"
                d={`M ${bx0} ${row.y + BOX_H + 6} V ${row.y + BOX_H + 11} H ${bx1} V ${row.y + BOX_H + 6}`}
                fill="none"
                strokeWidth="1.2"
                className="stroke-muted-foreground"
              />
              <text
                id={`${block}-between-label`}
                data-component="LoopsPerHour"
                x={(bx0 + bx1) / 2}
                y={row.y + BOX_H + 27}
                fontSize="13"
                textAnchor="middle"
                className="fill-foreground font-medium"
              >
                {t('loops-per-hour.between', { n: between })}
              </text>
              <circle
                id={`${block}-dot`}
                data-component="LoopsPerHour"
                cx={current.x + 8 + (BW - 16) * k}
                cy={row.y + BOX_H}
                r="6"
                className="fill-primary"
              />
            </g>
          )
        })}
      </svg>
      <StoryToggle id="loops-per-hour" component="LoopsPerHour" story={story} />
    </figure>
  )
}
