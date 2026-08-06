import { useId } from 'react'
import { useTranslation } from 'react-i18next'

/**
 * What a fan-out actually pays for, drawn as the thing each agent holds. On the left, one agent that
 * read the project once and then did five pieces of work on what it already had. On the right, five
 * agents, each holding an identical copy of that same reading in front of its one piece. The work is
 * the same work in both, so what the drawing says is that the reading is bought five times.
 *
 * It sits under `ultracode.3` in `goals`, the paragraph that counts the cost, rather than under the
 * one that describes the fan-out. **What it draws is what the agents hold and never the
 * arrangement.** `AgentsAtOnce` in `parallel` owns how many agents you have running and what that
 * costs your attention, so a wire, a lead agent or a row per arrangement belongs there.
 *
 * It is stacked blocks inside a frame, which is `steering`'s vocabulary in `TwoWindows` and
 * `LoopInWindow`, and the two arguments have to stay apart: those are one window in two states and
 * this is one context copied five times. **What keeps them apart is the repetition.** The three
 * teal blocks are the same three blocks, at the same sizes and in the same order, in all six boxes,
 * and only the left one labels them, since a reader who sees the same shape twice does not need
 * telling twice. Relabel the copies, resize them, or reorder them, and the figure stops arguing
 * anything.
 *
 * `CLAUDE.md` is a literal rather than a locale key, on `WorktreeEach`'s rule: a filename is not
 * translated.
 */
const TOP = 44
const PAD = 12
const BLOCK_H = 16
const BLOCK_GAP = 5

const ONE = { x: 1, w: 180 }
const AGENT_W = 80
const AGENT_GAP = 8
const AGENTS = 5
const FLEET_X = 207

/** Three blocks of reading in every box, and only the left one says what they are. */
const READING = ['claude-md', 'files', 'working-out'] as const
const READ_H = READING.length * BLOCK_H + (READING.length - 1) * BLOCK_GAP

/** Where the reading stops and the work starts, in both kinds of box. */
const SPLIT = TOP + PAD + READ_H + 8
const WORK_TOP = SPLIT + 8

const boxHeight = (pieces: number) =>
  WORK_TOP - TOP + pieces * BLOCK_H + (pieces - 1) * BLOCK_GAP + PAD

/** One box: what a single agent is holding when it starts writing. */
function Held({
  block,
  x,
  width,
  pieces,
  labelled,
}: {
  block: string
  x: number
  width: number
  pieces: number
  labelled: boolean
}) {
  const { t } = useTranslation('step2')
  const inner = width - PAD * 2

  return (
    <g id={`read-each-time-${block}`} data-component="Held">
      <rect
        id={`read-each-time-${block}-frame`}
        data-component="Held"
        x={x}
        y={TOP}
        width={width}
        height={boxHeight(pieces)}
        rx="8"
        strokeWidth="1.5"
        className="fill-none stroke-muted-foreground/50"
      />

      {READING.map((slug, index) => {
        const y = TOP + PAD + index * (BLOCK_H + BLOCK_GAP)

        return (
          <g key={slug} id={`read-each-time-${block}-read-${index}`} data-component="Held">
            <rect
              id={`read-each-time-${block}-read-${index}-bar`}
              data-component="Held"
              x={x + PAD}
              y={y}
              width={inner}
              height={BLOCK_H}
              rx="3"
              strokeWidth="1.5"
              className="fill-primary/15 stroke-primary"
            />
            {labelled && (
              <text
                id={`read-each-time-${block}-read-${index}-label`}
                data-component="Held"
                x={x + PAD + 8}
                y={y + 12}
                fontSize="11.5"
                className={slug === 'claude-md' ? 'fill-foreground font-mono' : 'fill-foreground'}
              >
                {slug === 'claude-md' ? 'CLAUDE.md' : t(`read-each-time.${slug}`)}
              </text>
            )}
          </g>
        )
      })}

      <line
        id={`read-each-time-${block}-split`}
        data-component="Held"
        x1={x + PAD}
        y1={SPLIT}
        x2={x + width - PAD}
        y2={SPLIT}
        strokeWidth="1"
        className="stroke-border"
      />

      {Array.from({ length: pieces }, (_, index) => (
        <rect
          key={index}
          id={`read-each-time-${block}-work-${index}`}
          data-component="Held"
          x={x + PAD}
          y={WORK_TOP + index * (BLOCK_H + BLOCK_GAP)}
          width={inner}
          height={BLOCK_H}
          rx="3"
          strokeWidth="1"
          className="fill-muted-foreground/25 stroke-border"
        />
      ))}
    </g>
  )
}

export function ReadEachTime() {
  const { t } = useTranslation('step2')
  const titleId = useId()

  const fleetWidth = AGENTS * AGENT_W + (AGENTS - 1) * AGENT_GAP

  return (
    <figure id="read-each-time" data-component="ReadEachTime" className="my-8 flex justify-center">
      <svg
        id="read-each-time-svg"
        data-component="ReadEachTime"
        viewBox="0 0 640 288"
        role="img"
        aria-labelledby={titleId}
        className="h-auto w-full"
      >
        <title id={titleId} data-component="ReadEachTime">
          {t('read-each-time.description')}
        </title>

        <text
          id="read-each-time-one-label"
          data-component="ReadEachTime"
          x={ONE.x}
          y={TOP - 12}
          fontSize="14"
          className="fill-foreground font-medium"
        >
          {t('read-each-time.one')}
        </text>
        <Held block="one" x={ONE.x} width={ONE.w} pieces={AGENTS} labelled />

        <text
          id="read-each-time-fleet-label"
          data-component="ReadEachTime"
          x={FLEET_X}
          y={TOP - 12}
          fontSize="14"
          className="fill-foreground font-medium"
        >
          {t('read-each-time.fleet')}
        </text>
        {Array.from({ length: AGENTS }, (_, index) => (
          <Held
            key={index}
            block={`agent-${index}`}
            x={FLEET_X + index * (AGENT_W + AGENT_GAP)}
            width={AGENT_W}
            pieces={1}
            labelled={false}
          />
        ))}

        {/* Under the copies rather than under the whole figure: it is what the five boxes cost. */}
        <text
          id="read-each-time-extra-label"
          data-component="ReadEachTime"
          x={FLEET_X + fleetWidth / 2}
          y={boxHeight(1) + TOP + 26}
          fontSize="13"
          textAnchor="middle"
          className="fill-muted-foreground"
        >
          {t('read-each-time.extra')}
        </text>

        {/* Which fill is which, named once, since all six boxes are cut the same way. */}
        <g id="read-each-time-legend" data-component="ReadEachTime">
          {[
            { key: 'reading', x: ONE.x, reading: true },
            { key: 'work', x: ONE.x + 280, reading: false },
          ].map((entry, index) => (
            <g key={entry.key} id={`read-each-time-legend-${index}`} data-component="ReadEachTime">
              <rect
                id={`read-each-time-legend-${index}-swatch`}
                data-component="ReadEachTime"
                x={entry.x}
                y="266"
                width="14"
                height="14"
                rx="3"
                strokeWidth="1.5"
                className={
                  entry.reading
                    ? 'fill-primary/15 stroke-primary'
                    : 'fill-muted-foreground/25 stroke-border'
                }
              />
              <text
                id={`read-each-time-legend-${index}-label`}
                data-component="ReadEachTime"
                x={entry.x + 22}
                y="278"
                fontSize="13"
                className="fill-muted-foreground"
              >
                {t(`read-each-time.${entry.key}`)}
              </text>
            </g>
          ))}
        </g>
      </svg>
    </figure>
  )
}
