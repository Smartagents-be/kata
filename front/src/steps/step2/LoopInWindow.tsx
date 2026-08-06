import { useId } from 'react'
import { useTranslation } from 'react-i18next'

/**
 * The run that is going nowhere, drawn as the window it happens in. The left window holds four
 * failed fixes and a fifth coming out the same shape, because on that file the failures are the
 * strongest pattern the model has to go on. The right window is the second session: one block
 * carried across, the error and the approach that failed, then a fresh attempt with room around
 * it. The section's own closing sentence is the comparison: a second attempt from a clean window
 * beats a fifth from a dirty one.
 *
 * It closes `When it is going nowhere`, and it shares `TwoWindows`'s frame geometry on purpose:
 * the unit's vocabulary is the window, so the two figures are one window in two states rather
 * than two unrelated drawings. What keeps them apart is the stack. `TwoWindows`'s left window
 * holds four different turns; this one holds five copies of the same one, and the repetition is
 * the drawing.
 *
 * **Teal is the block you chose to carry**, because choosing it is the move the section teaches.
 * The failed fixes are filled the way `TwoWindows` fills the wrong file: bulk the window holds.
 * The fifth fix is an outline and **never dashed and never teal**: dashed means gone on the
 * step 1 reading, and this one is being written, it is just the same shape again, which is what
 * its label says.
 *
 * This figure is the run going nowhere, never the run going wrong: which correction to send is
 * `TwoWindows`'s argument, and how many turns fit in an hour is `LoopsPerHour`'s. Neither
 * vocabulary belongs in here.
 */
const FRAME_W = 270
const FRAME_H = 240
const FRAME_Y = 28
const LEFT_X = 1
const RIGHT_X = 369
const PAD = 14
const BLOCK_W = FRAME_W - 2 * PAD
const BLOCK_H = 32

const FAILED = [1, 2, 3, 4]

/** One window frame with its name above and its note below; the caller fills it. */
function Frame({ block, x, children }: { block: string; x: number; children: React.ReactNode }) {
  const { t } = useTranslation('step2')

  return (
    <g id={`loop-in-window-${block}`} data-component="LoopInWindow">
      <text
        id={`loop-in-window-${block}-name`}
        data-component="LoopInWindow"
        x={x}
        y="16"
        fontSize="14"
        className="fill-foreground font-medium"
      >
        {t(`loop-in-window.${block}.name`)}
      </text>

      <rect
        id={`loop-in-window-${block}-frame`}
        data-component="LoopInWindow"
        x={x}
        y={FRAME_Y}
        width={FRAME_W}
        height={FRAME_H}
        rx="8"
        strokeWidth="1.5"
        className="fill-none stroke-border"
      />

      {children}

      <text
        id={`loop-in-window-${block}-note`}
        data-component="LoopInWindow"
        x={x + FRAME_W / 2}
        y="292"
        fontSize="13"
        textAnchor="middle"
        className="fill-muted-foreground"
      >
        {t(`loop-in-window.${block}.note`)}
      </text>
    </g>
  )
}

/** One block in a window: the box and the words in it. */
function Turn({
  id,
  x,
  y,
  state,
  label,
}: {
  id: string
  x: number
  y: number
  state: 'bulk' | 'open' | 'yours'
  label: string
}) {
  const box = {
    bulk: 'fill-muted-foreground/15 stroke-muted-foreground/60',
    open: 'fill-none stroke-muted-foreground/60',
    yours: 'fill-primary/10 stroke-primary',
  }[state]

  return (
    <g id={id} data-component="LoopInWindow" data-state={state}>
      <rect
        x={x + PAD}
        y={y}
        width={BLOCK_W}
        height={BLOCK_H}
        rx="6"
        strokeWidth="1.5"
        className={box}
        data-component="LoopInWindow"
      />
      <text
        x={x + FRAME_W / 2}
        y={y + BLOCK_H / 2 + 4}
        fontSize="12"
        textAnchor="middle"
        className={state === 'yours' ? 'fill-foreground' : 'fill-muted-foreground'}
        data-component="LoopInWindow"
      >
        {label}
      </text>
    </g>
  )
}

export function LoopInWindow() {
  const { t } = useTranslation('step2')
  const titleId = useId()

  return (
    <figure id="loop-in-window" data-component="LoopInWindow" className="my-8 flex justify-center">
      <svg
        id="loop-in-window-svg"
        data-component="LoopInWindow"
        viewBox="0 0 640 306"
        role="img"
        aria-labelledby={titleId}
        className="h-auto w-full"
      >
        <title id={titleId} data-component="LoopInWindow">
          {t('loop-in-window.description')}
        </title>

        <Frame block="dirty" x={LEFT_X}>
          {FAILED.map((n, index) => (
            <Turn
              key={n}
              id={`loop-in-window-dirty-fix-${n}`}
              x={LEFT_X}
              y={42 + index * (BLOCK_H + 8)}
              state="bulk"
              label={t('loop-in-window.attempt', { n })}
            />
          ))}
          <Turn
            id="loop-in-window-dirty-next"
            x={LEFT_X}
            y={42 + FAILED.length * (BLOCK_H + 8)}
            state="open"
            label={t('loop-in-window.next')}
          />
        </Frame>

        <Frame block="clean" x={RIGHT_X}>
          <Turn
            id="loop-in-window-clean-carried"
            x={RIGHT_X}
            y={42}
            state="yours"
            label={t('loop-in-window.carried')}
          />
          <Turn
            id="loop-in-window-clean-fresh"
            x={RIGHT_X}
            y={42 + BLOCK_H + 8}
            state="open"
            label={t('loop-in-window.fresh')}
          />
        </Frame>
      </svg>
    </figure>
  )
}
