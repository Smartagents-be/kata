import { useId } from 'react'
import { useTranslation } from 'react-i18next'

/**
 * The two corrections, drawn as the window each one leaves behind. On the left the correction went
 * in as a new message, so the window holds the request, the wrong file in full, the correction
 * under it, and the turn after that, with more coming: all of it re-sent on every turn. On the
 * right the request was rewritten, so the window holds the better request and the work, and
 * nothing else.
 *
 * It sits under `Interrupt, or go back`, after the paragraph that says how to choose and above the
 * section's self aside, so the aside stays the section's exit. `LoopInWindow` in the next section
 * shares this frame geometry on purpose: the unit's vocabulary is the window, so the two figures
 * are one window in two states rather than two unrelated drawings.
 *
 * **Teal is what you typed**: the correction on the left, the rewritten request on the right. The
 * wrong file is the biggest block in its window and muted, because bulk that is merely carried is
 * exactly what the section says you are paying for.
 *
 * **The dropped turns are not drawn**, not even dashed. A dashed ghost inside the right window
 * would say the wrong turn is still in there, and outside the window there is nothing for it to
 * stand in; the emptiness is the drawing, on `LoopsPerHour`'s rule that the wait is drawn as
 * nothing, and the note under the frame carries the words. The three dots under the left stack are
 * the opposite claim, that this window only grows from here.
 */
const FRAME_W = 270
const FRAME_H = 240
const FRAME_Y = 28
const LEFT_X = 1
const RIGHT_X = 369
const PAD = 14
const BLOCK_W = FRAME_W - 2 * PAD

interface Block {
  key: string
  y: number
  h: number
  state: 'held' | 'bulk' | 'yours'
}

const FORWARD: readonly Block[] = [
  { key: 'request', y: 42, h: 30, state: 'held' },
  { key: 'wrong', y: 80, h: 72, state: 'bulk' },
  { key: 'fix', y: 160, h: 30, state: 'yours' },
  { key: 'next', y: 198, h: 30, state: 'held' },
]

const REWIND: readonly Block[] = [
  { key: 'rewritten', y: 42, h: 30, state: 'yours' },
  { key: 'work', y: 80, h: 30, state: 'held' },
]

const BOX: Record<Block['state'], string> = {
  held: 'fill-none stroke-muted-foreground/60',
  bulk: 'fill-muted-foreground/15 stroke-muted-foreground/60',
  yours: 'fill-primary/10 stroke-primary',
}

const INK: Record<Block['state'], string> = {
  held: 'fill-muted-foreground',
  bulk: 'fill-muted-foreground',
  yours: 'fill-foreground',
}

/** One window: the name above it, the frame, the turns it holds, and the note under it. */
function Window({
  block,
  x,
  blocks,
  growing,
}: {
  block: string
  x: number
  blocks: readonly Block[]
  growing?: boolean
}) {
  const { t } = useTranslation('step2')

  return (
    <g id={`two-windows-${block}`} data-component="TwoWindows">
      <text
        id={`two-windows-${block}-name`}
        data-component="TwoWindows"
        x={x}
        y="16"
        fontSize="14"
        className="fill-foreground font-medium"
      >
        {t(`two-windows.${block}.name`)}
      </text>

      <rect
        id={`two-windows-${block}-frame`}
        data-component="TwoWindows"
        x={x}
        y={FRAME_Y}
        width={FRAME_W}
        height={FRAME_H}
        rx="8"
        strokeWidth="1.5"
        className="fill-none stroke-border"
      />

      {blocks.map((turn) => (
        <g
          key={turn.key}
          id={`two-windows-${block}-${turn.key}`}
          data-component="TwoWindows"
          data-state={turn.state}
        >
          <rect
            x={x + PAD}
            y={turn.y}
            width={BLOCK_W}
            height={turn.h}
            rx="6"
            strokeWidth="1.5"
            className={BOX[turn.state]}
            data-component="TwoWindows"
          />
          <text
            x={x + FRAME_W / 2}
            y={turn.y + turn.h / 2 + 4}
            fontSize="12"
            textAnchor="middle"
            className={INK[turn.state]}
            data-component="TwoWindows"
          >
            {t(`two-windows.block.${turn.key}`)}
          </text>
        </g>
      ))}

      {/* The stack goes on from here, which is the left window's whole problem. */}
      {growing &&
        [240, 248, 256].map((dotY) => (
          <circle
            key={dotY}
            id={`two-windows-${block}-more-${dotY}`}
            data-component="TwoWindows"
            cx={x + FRAME_W / 2}
            cy={dotY}
            r="1.5"
            className="fill-muted-foreground/60"
          />
        ))}

      <text
        id={`two-windows-${block}-note`}
        data-component="TwoWindows"
        x={x + FRAME_W / 2}
        y="292"
        fontSize="13"
        textAnchor="middle"
        className="fill-muted-foreground"
      >
        {t(`two-windows.${block}.note`)}
      </text>
    </g>
  )
}

export function TwoWindows() {
  const { t } = useTranslation('step2')
  const titleId = useId()

  return (
    <figure id="two-windows" data-component="TwoWindows" className="my-8 flex justify-center">
      <svg
        id="two-windows-svg"
        data-component="TwoWindows"
        viewBox="0 0 640 306"
        role="img"
        aria-labelledby={titleId}
        className="h-auto w-full"
      >
        <title id={titleId} data-component="TwoWindows">
          {t('two-windows.description')}
        </title>

        <Window block="forward" x={LEFT_X} blocks={FORWARD} growing />
        <Window block="rewind" x={RIGHT_X} blocks={REWIND} />
      </svg>
    </figure>
  )
}
