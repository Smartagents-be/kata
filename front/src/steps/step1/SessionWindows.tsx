import { useId } from 'react'
import { useTranslation } from 'react-i18next'

/**
 * Where two five-hour windows land on one working day, drawn twice. The rows carry the same two
 * windows and the same day underneath them, so the only thing that changes is the hour the first
 * one opened, which is the whole argument: you cannot buy more window, you can only put it where
 * you are.
 *
 * The two guide lines are what makes it readable. Everything is measured against the break and the
 * hour you go home, so the top row's seam visibly falls in the middle of the afternoon while the
 * bottom row's lands on the break. Move the day and both rows have to move with it.
 *
 * Two things in it follow the step's diagram vocabulary. Teal is the row being taught, and the
 * dashed tail on the top row is the hour and a half of window nobody is there to spend, drawn the
 * way step 1 draws what is not there. The `hi` beside each window's first dot is what actually
 * opens one, and it is hard-coded rather than translated: it is a word the student types, like the
 * flags and the model names.
 */
const DAY_START = 8
const DAY_END = 20
const X0 = 24
const SPAN = 592

/**
 * The worked day, and it is eight hours at the desk: in at `DAY_START`, an hour out from one, home
 * at five. Both guide lines read off these, and so does every window below, so moving one of them
 * means moving both rows.
 */
const BREAK_START = 13
const BREAK_END = 14
const LEAVE = 17

/** What a session is worth, and the only number both rows have in common. */
const WINDOW = 5

const x = (hour: number) => X0 + ((hour - DAY_START) / (DAY_END - DAY_START)) * SPAN

type Row = {
  id: string
  /** Message key for the label above the row: the choice that placed the windows. */
  label: string
  /** Top edge of the bar. */
  y: number
  /** Baseline for the `hi` under each window's opening dot. */
  helloY: number
  tone: 'muted' | 'primary'
  windows: { start: number; end: number }[]
}

const BAR = 20

const ROWS: Row[] = [
  {
    id: 'drifted',
    label: 'session-windows.drifted',
    y: 96,
    helloY: 132,
    tone: 'muted',
    windows: [
      { start: 9.5, end: 9.5 + WINDOW },
      { start: 9.5 + WINDOW, end: 9.5 + 2 * WINDOW },
    ],
  },
  {
    id: 'aligned',
    // The whole trick in two numbers: the first window opens a full five hours before the break, so
    // the second one opens on the break itself.
    label: 'session-windows.aligned',
    y: 176,
    helloY: 212,
    tone: 'primary',
    windows: [
      { start: BREAK_START - WINDOW, end: BREAK_START },
      { start: BREAK_START, end: BREAK_START + WINDOW },
    ],
  },
]

const TONE = {
  muted: {
    box: 'fill-muted-foreground/10 stroke-muted-foreground/60',
    tail: 'fill-none stroke-muted-foreground/50',
    ink: 'fill-muted-foreground',
    dot: 'fill-muted-foreground/70',
  },
  primary: {
    box: 'fill-primary/10 stroke-primary',
    tail: 'fill-none stroke-primary/50',
    ink: 'fill-primary',
    dot: 'fill-primary',
  },
}

/** Every second hour, which is as many labels as the axis carries without crowding. */
const TICKS = [8, 10, 12, 14, 16, 18, 20]

export function SessionWindows() {
  const { t } = useTranslation('step1')
  const titleId = useId()

  return (
    <figure id="session-windows" data-component="SessionWindows" className="my-8 flex justify-center">
      <svg
        id="session-windows-svg"
        data-component="SessionWindows"
        viewBox="0 0 640 264"
        role="img"
        aria-labelledby={titleId}
        className="h-auto w-full max-w-2xl"
      >
        {/* useId, not a BEM id: aria-labelledby has to be unique per instance, not per component. */}
        <title id={titleId} data-component="SessionWindows">
          {t('session-windows.description')}
        </title>

        {/* the day the windows are placed on: at your desk, an hour out, at your desk again */}
        <g id="session-windows-day" data-component="SessionWindows">
          <text x={X0} y="34" fontSize="13" className="fill-muted-foreground">
            {t('session-windows.day')}
          </text>
          <text
            x={x((BREAK_START + BREAK_END) / 2)}
            y="34"
            fontSize="13"
            textAnchor="middle"
            className="fill-muted-foreground"
          >
            {t('session-windows.break')}
          </text>
          <text x={x(LEAVE)} y="34" fontSize="13" textAnchor="middle" className="fill-muted-foreground">
            {t('session-windows.leave')}
          </text>

          <rect
            x={x(DAY_START)}
            y="42"
            width={x(BREAK_START) - x(DAY_START)}
            height="14"
            rx="3"
            className="fill-muted-foreground/25"
          />
          <rect
            x={x(BREAK_END)}
            y="42"
            width={x(LEAVE) - x(BREAK_END)}
            height="14"
            rx="3"
            className="fill-muted-foreground/25"
          />
        </g>

        {ROWS.map((row) => {
          const tone = TONE[row.tone]

          return (
            <g key={row.id} id={`session-windows-${row.id}`} data-component="SessionWindows">
              <text
                id={`session-windows-${row.id}-label`}
                data-component="SessionWindows"
                x={X0}
                y={row.y - 10}
                fontSize="14"
                className="fill-foreground font-medium"
              >
                {t(row.label)}
              </text>

              {row.windows.map((window, index) => {
                // The window is five hours whatever happens; only the part of it you are there for
                // gets drawn solid, and the rest hangs past the end of the day.
                const spent = Math.min(window.end, LEAVE)

                return (
                  <g
                    key={window.start}
                    id={`session-windows-${row.id}-window-${index}`}
                    data-component="SessionWindows"
                  >
                    <rect
                      x={x(window.start)}
                      y={row.y}
                      width={x(spent) - x(window.start)}
                      height={BAR}
                      rx="4"
                      strokeWidth="2"
                      className={tone.box}
                    />

                    {window.end > LEAVE && (
                      <rect
                        id={`session-windows-${row.id}-window-${index}-spare`}
                        data-component="SessionWindows"
                        x={x(LEAVE)}
                        y={row.y}
                        width={x(window.end) - x(LEAVE)}
                        height={BAR}
                        rx="4"
                        strokeWidth="2"
                        strokeDasharray="5 5"
                        className={tone.tail}
                      />
                    )}

                    {/* The length is on the window rather than in the prose, because the two rows
                        being the same five hours is what the reader has to see for themselves. It
                        is centred on the part you are there for rather than on the whole window, or
                        the last one on each row lands on the going-home line and reads as cut. */}
                    <text
                      x={(x(window.start) + x(spent)) / 2}
                      y={row.y + 14}
                      fontSize="11"
                      textAnchor="middle"
                      className={`${tone.ink} font-mono`}
                    >
                      {t('session-windows.length')}
                    </text>

                    {/* what opens a window: one message, whatever it says */}
                    <circle cx={x(window.start)} cy={row.y + BAR / 2} r="4.5" className={tone.dot} />
                    <text
                      x={x(window.start)}
                      y={row.helloY}
                      fontSize="11"
                      textAnchor="middle"
                      className={`${tone.ink} font-mono`}
                    >
                      hi
                    </text>
                  </g>
                )
              })}

              {row.windows.some((window) => window.end > LEAVE) && (
                <text
                  id={`session-windows-${row.id}-spare-label`}
                  data-component="SessionWindows"
                  x={(x(LEAVE) + x(row.windows[row.windows.length - 1].end)) / 2}
                  y={row.helloY}
                  fontSize="11"
                  textAnchor="middle"
                  className="fill-muted-foreground"
                >
                  {t('session-windows.spare')}
                </text>
              )}
            </g>
          )
        })}

        {/* Drawn last so they sit over the bars: the alignment is the reading, and a guide hidden
            behind a window would only line up where nothing is happening. */}
        {[BREAK_START, LEAVE].map((hour) => (
          <line
            key={hour}
            x1={x(hour)}
            y1="40"
            x2={x(hour)}
            y2="228"
            strokeWidth="1"
            className="stroke-border"
          />
        ))}

        <g id="session-windows-axis" data-component="SessionWindows">
          <line
            x1={x(DAY_START)}
            y1="232"
            x2={x(DAY_END)}
            y2="232"
            strokeWidth="1"
            className="stroke-border"
          />
          {TICKS.map((hour) => (
            <g key={hour}>
              <line x1={x(hour)} y1="232" x2={x(hour)} y2="237" strokeWidth="1" className="stroke-border" />
              <text
                x={x(hour)}
                y="252"
                fontSize="11"
                textAnchor="middle"
                className="fill-muted-foreground font-mono"
              >
                {`${String(hour).padStart(2, '0')}:00`}
              </text>
            </g>
          ))}
        </g>
      </svg>
    </figure>
  )
}
