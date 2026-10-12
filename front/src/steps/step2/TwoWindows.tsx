import { useId } from 'react'
import { useTranslation } from 'react-i18next'
import { StoryToggle } from '@/shared/motion/StoryToggle'
import { beat, glide, useStory } from '@/shared/motion/useStory'

/**
 * The two corrections, drawn as the window each one leaves behind. On the left the correction went
 * in as a new message, so the window holds the request, the wrong file in full, the correction
 * under it, and the turn after that, with more coming: all of it re-sent on every turn. On the
 * right you rewound to the request in the same session and rewrote it, so the request and the wrong
 * file it led to are dropped, and what goes on is the better request and the work.
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
 * **The dropped turns are drawn, struck through and dashed, and that reverses a recorded
 * decision** (FEEDBACK 11). They used to be left out, on the argument that a ghost inside the
 * frame says they are still in there. Read cold, the empty window said something worse: that the
 * agent never went wrong at all, and the column name read as starting a new session. So the right
 * window now shows the same wrong turn the left one keeps, dashed on the step 1 reading of a dash
 * (built, then thrown away), with its text struck and a label under it saying the rewind dropped
 * it. The note under the frame carries the rest: never re-sent. The column is named as a rewind
 * **in the same session** and names no keystroke, on the unit's rule that the binding is a
 * harness's. The three dots under the left stack are the opposite claim, that this window only
 * grows from here.
 *
 * **It plays the two moves on `useStory`'s clock** (October 2026, at the owner's asking), because the
 * difference is an action: pasting on against taking out. Both windows start the same, the request
 * and the wrong file. On the left the correction slides in under it and the next turn after that,
 * and nothing leaves. On the right a playhead runs back up to the request, the two rows take their
 * strike and their dashes, and the rewritten request takes the place below them. The last frame is
 * the drawing described above, and it is what reduced motion shows.
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
  state: 'held' | 'bulk' | 'yours' | 'dropped'
  /** How far it has come in, on the story clock. */
  shown?: number
}

/** The story's beats, in ms. */
const SPLIT = 1500
const BACK = 1000
const DROP = SPLIT + BACK
const LENGTH = 5000

const FORWARD: readonly Block[] = [
  { key: 'request', y: 42, h: 30, state: 'held' },
  { key: 'wrong', y: 80, h: 72, state: 'bulk' },
  { key: 'fix', y: 160, h: 30, state: 'yours' },
  { key: 'next', y: 198, h: 30, state: 'held' },
]

/** The wrong turn first, dropped, then what the rewind left: the same two rows as the left's tail. */
const REWIND: readonly Block[] = [
  { key: 'request', y: 42, h: 28, state: 'dropped' },
  { key: 'wrong', y: 76, h: 50, state: 'dropped' },
  { key: 'rewritten', y: 160, h: 30, state: 'yours' },
  { key: 'work', y: 198, h: 30, state: 'held' },
]

/** Where the label naming the dropped rows sits, between them and the rewritten request. */
const DROPPED_LABEL_Y = 147

const BOX: Record<Block['state'], string> = {
  held: 'fill-none stroke-muted-foreground/60',
  bulk: 'fill-muted-foreground/15 stroke-muted-foreground/60',
  yours: 'fill-primary/10 stroke-primary',
  dropped: 'fill-none stroke-muted-foreground/40',
}

const INK: Record<Block['state'], string> = {
  held: 'fill-muted-foreground',
  bulk: 'fill-muted-foreground',
  yours: 'fill-foreground',
  dropped: 'fill-muted-foreground/70 line-through',
}

/** One window: the name above it, the frame, the turns it holds, and the note under it. */
function Window({
  block,
  x,
  blocks,
  growing,
  dropped,
  droppedShown = 1,
  noteShown = 1,
  playhead,
}: {
  block: string
  x: number
  blocks: readonly Block[]
  /** How far the three dots have come in; absent on a window that does not grow. */
  growing?: number
  /** Message key for the label under the dropped rows, when the window has any. */
  dropped?: string
  droppedShown?: number
  noteShown?: number
  /** The y of the rewind's playhead while it runs back up the window. */
  playhead?: number
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
          style={{ opacity: turn.shown ?? 1 }}
        >
          <rect
            x={x + PAD}
            y={turn.y}
            width={BLOCK_W}
            height={turn.h}
            rx="6"
            strokeWidth="1.5"
            strokeDasharray={turn.state === 'dropped' ? '5 4' : undefined}
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

      {/* What the rewind threw away, named where the eye leaves the struck rows. */}
      {dropped && (
        <text
          id={`two-windows-${block}-dropped`}
          data-component="TwoWindows"
          x={x + FRAME_W / 2}
          y={DROPPED_LABEL_Y}
          fontSize="11"
          textAnchor="middle"
          className="fill-muted-foreground"
          style={{ opacity: droppedShown }}
        >
          {t(dropped)}
        </text>
      )}

      {/* The stack goes on from here, which is the left window's whole problem. */}
      {growing !== undefined &&
        [240, 248, 256].map((dotY) => (
          <circle
            key={dotY}
            id={`two-windows-${block}-more-${dotY}`}
            data-component="TwoWindows"
            cx={x + FRAME_W / 2}
            cy={dotY}
            r="1.5"
            className="fill-muted-foreground/60"
            style={{ opacity: growing }}
          />
        ))}

      {playhead !== undefined && (
        <line
          id={`two-windows-${block}-playhead`}
          data-component="TwoWindows"
          x1={x + 4}
          x2={x + FRAME_W - 4}
          y1={playhead}
          y2={playhead}
          strokeWidth="2.5"
          className="stroke-primary"
        />
      )}

      <text
        id={`two-windows-${block}-note`}
        data-component="TwoWindows"
        x={x + FRAME_W / 2}
        y="292"
        fontSize="13"
        textAnchor="middle"
        className="fill-muted-foreground"
        style={{ opacity: noteShown }}
      >
        {t(`two-windows.${block}.note`)}
      </text>
    </g>
  )
}

export function TwoWindows() {
  const { t } = useTranslation('step2')
  const [ref, now, story] = useStory<SVGSVGElement>(LENGTH, 3500)
  const titleId = useId()

  /* Left: the correction and the turn after it are pasted on, and nothing leaves. */
  const forward = FORWARD.map((turn) =>
    turn.key === 'fix'
      ? { ...turn, shown: beat(now, SPLIT, 400) }
      : turn.key === 'next'
        ? { ...turn, shown: beat(now, SPLIT + 1100, 400) }
        : turn,
  )
  /* Right: until the rewind lands, the window is the left one's first two rows; then they are struck. */
  const k = glide(now, DROP, 500)
  const rewind: Block[] = REWIND.map((turn, index) => {
    if (turn.state !== 'dropped') {
      return { ...turn, shown: beat(now, turn.key === 'rewritten' ? DROP + 800 : DROP + 1500, 400) }
    }
    const from = FORWARD[index]
    return now < DROP
      ? { ...from }
      : { ...turn, y: from.y + (turn.y - from.y) * k, h: from.h + (turn.h - from.h) * k }
  })
  const running = now >= SPLIT && now < DROP
  const playhead = running ? 240 - glide(now, SPLIT, BACK) * (240 - 40) : undefined
  const notes = beat(now, DROP + 2000, 400)

  return (
    <figure id="two-windows" data-component="TwoWindows" className="my-8 flex flex-col items-center gap-2">
      <svg
        id="two-windows-svg"
        data-component="TwoWindows"
        ref={ref}
        viewBox="0 0 640 306"
        role="img"
        aria-labelledby={titleId}
        className="h-auto w-full"
      >
        <title id={titleId} data-component="TwoWindows">
          {t('two-windows.description')}
        </title>

        <Window
          block="forward"
          x={LEFT_X}
          blocks={forward}
          growing={beat(now, SPLIT + 1800, 400)}
          noteShown={notes}
        />
        <Window
          block="rewind"
          x={RIGHT_X}
          blocks={rewind}
          dropped="two-windows.rewind.dropped"
          droppedShown={beat(now, DROP + 400, 400)}
          noteShown={notes}
          playhead={playhead}
        />
      </svg>
      <StoryToggle id="two-windows" component="TwoWindows" story={story} />
    </figure>
  )
}
