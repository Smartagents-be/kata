import { useCallback, useEffect, useLayoutEffect, useRef, useState } from 'react'
import { useTranslation } from 'react-i18next'
import { Button } from '@/shared/components/ui/button'
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/shared/components/ui/card'
import { useStepText } from '@/shared/i18n/useStepText'
import { cn } from '@/shared/lib/utils'

/** The four ways of splitting the work this unit names, in the order the prose introduces them. */
const PATTERNS = ['coordinator', 'decomposition', 'sequential', 'reflection'] as const

type PatternId = (typeof PATTERNS)[number]

interface Scenario {
  id: string
  /** The pattern this situation is. Message keys are built from the id, so both stay in one place. */
  answer: PatternId
}

const SCENARIOS: readonly Scenario[] = [
  { id: 'critic', answer: 'reflection' },
  { id: 'upgrade', answer: 'sequential' },
  { id: 'delegate', answer: 'coordinator' },
]

/** Fisher-Yates on a copy: the module arrays above must not be reordered in place. */
function shuffled<T>(items: readonly T[]): T[] {
  const copy = [...items]
  for (let i = copy.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1))
    ;[copy[i], copy[j]] = [copy[j], copy[i]]
  }
  return copy
}

interface Point {
  x: number
  y: number
}

/**
 * The unit's closing exercise: three situations, four patterns, and a line to draw between them.
 * Decomposition sits on the board with no situation pointing at it, so the fourth option is not
 * free by elimination.
 *
 * Graded here in the browser, like the quizzes and the two flag boards. The answer is on screen
 * already, so a round trip to the service would add nothing, and this keeps working with the
 * backend down.
 *
 * Dragging is the point of the interaction, but it is never the only way in. A press and drag from
 * the handle draws the line; a plain click arms the situation and the next click on a pattern
 * connects it, which is also what Enter and Space do on the keyboard. The lines themselves are one
 * SVG overlay on top of the grid, measured from the DOM rather than guessed at, so translation,
 * resizing and reflowing keep the arrows on their anchors.
 *
 * Both columns shuffle once per mount, in a `useState` initialiser rather than during render, so
 * connecting one pair does not reshuffle the board and nobody learns the answer as a position.
 */
export function PatternMatch() {
  const { text } = useStepText('step1')
  const { t } = useTranslation('step1')

  const [scenarios] = useState(() => shuffled(SCENARIOS))
  const [patterns] = useState(() => shuffled(PATTERNS))
  const [links, setLinks] = useState<Record<string, PatternId>>({})
  const [checked, setChecked] = useState(false)
  const [armed, setArmed] = useState<string | null>(null)
  const [drag, setDrag] = useState<{ scenarioId: string; point: Point } | null>(null)
  const [hovered, setHovered] = useState<PatternId | null>(null)

  const boardRef = useRef<HTMLDivElement>(null)
  const handleRefs = useRef(new Map<string, HTMLElement>())
  const targetRefs = useRef(new Map<PatternId, HTMLElement>())
  // Set on pointerup when a drag landed on a pattern, so the click that follows is not read as a
  // second interaction that would immediately re-arm the row.
  const justConnected = useRef(false)

  const [anchors, setAnchors] = useState<{
    handles: Record<string, Point>
    targets: Record<string, Point>
  }>({ handles: {}, targets: {} })

  const measure = useCallback(() => {
    const board = boardRef.current
    if (!board) {
      return
    }
    const origin = board.getBoundingClientRect()
    const handles: Record<string, Point> = {}
    for (const [id, node] of handleRefs.current) {
      const rect = node.getBoundingClientRect()
      handles[id] = { x: rect.right - origin.left, y: rect.top + rect.height / 2 - origin.top }
    }
    const targets: Record<string, Point> = {}
    for (const [id, node] of targetRefs.current) {
      const rect = node.getBoundingClientRect()
      targets[id] = { x: rect.left - origin.left, y: rect.top + rect.height / 2 - origin.top }
    }
    setAnchors({ handles, targets })
  }, [])

  useLayoutEffect(measure, [measure, scenarios, patterns])

  useEffect(() => {
    const board = boardRef.current
    if (!board) {
      return
    }
    // One observer over the board and every anchor: a translated label that grows a line moves the
    // anchors below it without changing the board's own height.
    const observer = new ResizeObserver(measure)
    observer.observe(board)
    for (const node of handleRefs.current.values()) {
      observer.observe(node)
    }
    for (const node of targetRefs.current.values()) {
      observer.observe(node)
    }
    window.addEventListener('resize', measure)
    return () => {
      observer.disconnect()
      window.removeEventListener('resize', measure)
    }
  }, [measure])

  function connect(scenarioId: string, pattern: PatternId) {
    if (checked) {
      return
    }
    setLinks((current) => ({ ...current, [scenarioId]: pattern }))
    setArmed(null)
  }

  function patternUnder(clientX: number, clientY: number): PatternId | null {
    for (const [id, node] of targetRefs.current) {
      const rect = node.getBoundingClientRect()
      if (
        clientX >= rect.left &&
        clientX <= rect.right &&
        clientY >= rect.top &&
        clientY <= rect.bottom
      ) {
        return id
      }
    }
    return null
  }

  function toBoard(clientX: number, clientY: number): Point {
    const origin = boardRef.current?.getBoundingClientRect()
    return { x: clientX - (origin?.left ?? 0), y: clientY - (origin?.top ?? 0) }
  }

  const linked = Object.keys(links).length
  const complete = linked === scenarios.length

  function onCheck() {
    setChecked(true)
    setArmed(null)
  }

  function onRetry() {
    setLinks({})
    setChecked(false)
    setArmed(null)
  }

  return (
    <Card
      id="pattern-match"
      data-component="PatternMatch"
      data-state={checked ? 'checked' : 'open'}
    >
      <CardHeader id="pattern-match-header" data-component="PatternMatch">
        <CardTitle id="pattern-match-title" data-component="PatternMatch">
          {text('match.title')}
        </CardTitle>
        <CardDescription id="pattern-match-description" data-component="PatternMatch">
          {text('match.description')}
        </CardDescription>
      </CardHeader>

      <CardContent
        id="pattern-match-content"
        data-component="PatternMatch"
        className="flex flex-col gap-5"
      >
        <p
          id="pattern-match-progress"
          data-component="PatternMatch"
          role="status"
          className="text-muted-foreground text-sm tabular-nums"
        >
          {armed && !checked
            ? text('match.armed')
            : t('match.progress', { linked, total: scenarios.length })}
        </p>

        <div
          id="pattern-match-board"
          data-component="PatternMatch"
          ref={boardRef}
          className="relative grid grid-cols-1 gap-x-16 gap-y-3 md:grid-cols-2"
        >
          {/* The lines. Behind the cards and deaf to the pointer: every hit lands on a control. */}
          <svg
            id="pattern-match-lines"
            data-component="PatternMatch"
            aria-hidden="true"
            className="pointer-events-none absolute inset-0 hidden size-full md:block"
          >
            {/* One marker per verdict: a marker's fill comes from its own definition, not from the
                line that references it, so `currentColor` here would draw ink-black arrowheads. */}
            <defs>
              {(
                [
                  ['open', 'fill-primary/60'],
                  ['right', 'fill-success'],
                  ['wrong', 'fill-destructive'],
                ] as const
              ).map(([state, fill]) => (
                <marker
                  key={state}
                  id={`pattern-match-arrowhead-${state}`}
                  viewBox="0 0 10 10"
                  refX="8"
                  refY="5"
                  markerWidth="6"
                  markerHeight="6"
                  orient="auto-start-reverse"
                >
                  <path d="M 0 0 L 10 5 L 0 10 z" className={fill} />
                </marker>
              ))}
            </defs>

            {scenarios.map((scenario, index) => {
              const pattern = links[scenario.id]
              const from = anchors.handles[scenario.id]
              const to = pattern ? anchors.targets[pattern] : undefined
              if (!pattern || !from || !to) {
                return null
              }
              const right = checked ? pattern === scenario.answer : undefined
              const state = right === undefined ? 'open' : right ? 'right' : 'wrong'
              const bend = Math.max(28, (to.x - from.x) / 2)
              return (
                <path
                  key={scenario.id}
                  id={`pattern-match-line-${index}`}
                  data-component="PatternMatch"
                  data-state={state}
                  d={`M ${from.x} ${from.y} C ${from.x + bend} ${from.y}, ${to.x - bend} ${to.y}, ${to.x} ${to.y}`}
                  fill="none"
                  strokeWidth="2"
                  markerEnd={`url(#pattern-match-arrowhead-${state})`}
                  className={cn(
                    state === 'open' && 'stroke-primary/60',
                    state === 'right' && 'stroke-success',
                    state === 'wrong' && 'stroke-destructive',
                  )}
                />
              )
            })}

            {/* the line being dragged: dashed, because it is not a connection yet */}
            {drag && anchors.handles[drag.scenarioId] && (
              <path
                id="pattern-match-line-dragging"
                data-component="PatternMatch"
                d={`M ${anchors.handles[drag.scenarioId].x} ${anchors.handles[drag.scenarioId].y} L ${drag.point.x} ${drag.point.y}`}
                fill="none"
                strokeWidth="2"
                strokeDasharray="6 5"
                markerEnd="url(#pattern-match-arrowhead-open)"
                className="stroke-primary"
              />
            )}
          </svg>

          {/* the situations */}
          <ol
            id="pattern-match-scenarios"
            data-component="PatternMatch"
            className="relative flex flex-col gap-3"
          >
            {scenarios.map((scenario, index) => {
              const pattern = links[scenario.id]
              const right = checked ? pattern === scenario.answer : undefined
              return (
                <li
                  key={scenario.id}
                  id={`pattern-match-scenario-${index}`}
                  data-component="PatternMatch"
                  data-state={right === undefined ? (pattern ? 'linked' : 'open') : right ? 'right' : 'wrong'}
                  className={cn(
                    'flex items-start gap-3 rounded-xl border px-4 py-3 text-sm transition-colors',
                    !checked && armed === scenario.id && 'border-primary bg-primary/5',
                    !checked && armed !== scenario.id && 'border-border',
                    right === true && 'border-success/40 bg-success/10',
                    right === false && 'border-destructive/40',
                  )}
                >
                  <p
                    id={`pattern-match-scenario-${index}-text`}
                    data-component="PatternMatch"
                    className="flex-1"
                  >
                    {text(`match.scenario.${scenario.id}`)}
                    {/* Below md there are no lines to read, so the pick is named in words. */}
                    {pattern && (
                      <span
                        id={`pattern-match-scenario-${index}-pick`}
                        data-component="PatternMatch"
                        className="text-muted-foreground mt-1 block md:hidden"
                      >
                        {text(`match.pattern.${pattern}`)}
                      </span>
                    )}
                  </p>

                  <button
                    id={`pattern-match-scenario-${index}-handle`}
                    data-component="PatternMatch"
                    type="button"
                    disabled={checked}
                    aria-label={text('match.aria.handle')}
                    aria-pressed={armed === scenario.id}
                    ref={(node) => {
                      if (node) {
                        handleRefs.current.set(scenario.id, node)
                      } else {
                        handleRefs.current.delete(scenario.id)
                      }
                    }}
                    onPointerDown={(event) => {
                      if (checked) {
                        return
                      }
                      // Arming is the click's job, further down. Doing it here too would let the
                      // click that ends a plain press toggle it straight back off.
                      event.currentTarget.setPointerCapture(event.pointerId)
                      setDrag({
                        scenarioId: scenario.id,
                        point: toBoard(event.clientX, event.clientY),
                      })
                    }}
                    onPointerMove={(event) => {
                      if (!drag || drag.scenarioId !== scenario.id) {
                        return
                      }
                      setDrag({
                        scenarioId: scenario.id,
                        point: toBoard(event.clientX, event.clientY),
                      })
                      setHovered(patternUnder(event.clientX, event.clientY))
                    }}
                    onPointerUp={(event) => {
                      const target = patternUnder(event.clientX, event.clientY)
                      setDrag(null)
                      setHovered(null)
                      if (target) {
                        justConnected.current = true
                        connect(scenario.id, target)
                      }
                    }}
                    onPointerCancel={() => {
                      setDrag(null)
                      setHovered(null)
                    }}
                    onClick={() => {
                      // The click that closes a successful drag is not a second interaction.
                      if (justConnected.current) {
                        justConnected.current = false
                        return
                      }
                      setArmed((current) => (current === scenario.id ? null : scenario.id))
                    }}
                    className={cn(
                      'mt-0.5 size-5 shrink-0 touch-none rounded-full border-2 transition-colors',
                      'focus-visible:ring-ring focus-visible:ring-[3px] focus-visible:outline-none',
                      checked ? 'cursor-default' : 'cursor-grab active:cursor-grabbing',
                      armed === scenario.id || drag?.scenarioId === scenario.id || pattern
                        ? 'border-primary bg-primary/30'
                        : 'border-primary/40 bg-background',
                      right === true && 'border-success bg-success/30',
                      right === false && 'border-destructive bg-destructive/20',
                    )}
                  />
                </li>
              )
            })}
          </ol>

          {/* the patterns */}
          <ul
            id="pattern-match-patterns"
            data-component="PatternMatch"
            className="relative mt-3 flex flex-col gap-3 md:mt-0 md:justify-center"
          >
            {patterns.map((pattern, index) => (
              <li key={pattern} id={`pattern-match-pattern-${index}`} data-component="PatternMatch">
                <button
                  id={`pattern-match-pattern-${index}-target`}
                  data-component="PatternMatch"
                  type="button"
                  disabled={checked}
                  aria-label={text(`match.pattern.${pattern}`)}
                  ref={(node) => {
                    if (node) {
                      targetRefs.current.set(pattern, node)
                    } else {
                      targetRefs.current.delete(pattern)
                    }
                  }}
                  onClick={() => {
                    if (armed) {
                      connect(armed, pattern)
                    }
                  }}
                  className={cn(
                    'w-full rounded-xl border px-4 py-3 text-left text-sm font-medium transition-colors',
                    'focus-visible:ring-ring focus-visible:ring-[3px] focus-visible:outline-none',
                    hovered === pattern && 'border-primary bg-primary/10',
                    hovered !== pattern && 'border-border',
                    !checked && armed && 'hover:border-primary hover:bg-primary/5',
                    checked && 'cursor-default',
                  )}
                >
                  {text(`match.pattern.${pattern}`)}
                </button>
              </li>
            ))}
          </ul>
        </div>

        {/* A right answer is already marked right; only a wrong one is worth a sentence. */}
        {checked && (
          <ul
            id="pattern-match-explanations"
            data-component="PatternMatch"
            className="flex flex-col gap-2"
          >
            {scenarios.map((scenario, index) =>
              links[scenario.id] === scenario.answer ? null : (
                <li
                  key={scenario.id}
                  id={`pattern-match-explanation-${index}`}
                  data-component="PatternMatch"
                  className="border-destructive/40 border-l-2 pl-3 text-sm"
                >
                  {text(`match.explanation.${scenario.id}`)}
                </li>
              ),
            )}
          </ul>
        )}

        <div id="pattern-match-actions" data-component="PatternMatch" className="flex justify-end">
          {checked ? (
            <Button
              id="pattern-match-retry"
              data-component="PatternMatch"
              type="button"
              variant="outline"
              onClick={onRetry}
            >
              {text('match.retry')}
            </Button>
          ) : (
            <Button
              id="pattern-match-check"
              data-component="PatternMatch"
              type="button"
              disabled={!complete}
              onClick={onCheck}
            >
              {text('match.check')}
            </Button>
          )}
        </div>
      </CardContent>
    </Card>
  )
}
