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
import { shuffled } from '@/shared/lib/shuffle'
import { cn } from '@/shared/lib/utils'

/**
 * One situation on the left of a {@link ConnectBoard}, and the target it wants.
 *
 * `answer` is the id of a target, or `'any'` for a row where every target is defensible. That row
 * comes back amber rather than right or wrong, because marking a judgement call either way would
 * teach that a lookup table exists.
 */
export interface ConnectItem {
  id: string
  answer: string
}

/** `right` and `wrong` are the usual pair. `note` is the row that has no wrong answer. */
type Verdict = 'right' | 'wrong' | 'note'

interface Point {
  x: number
  y: number
}

/**
 * A drag-to-connect exercise: situations down the left, choices down the right, a line drawn
 * between them, graded here in the browser. Both of step 1's boards are this component with
 * different data (`PatternMatch` in `harness`, `PickTheTier` in `model`), which is the point: a
 * student who learned the interaction once should not meet a second one that behaves differently.
 * They drifted apart when they were two copies, so keep additions here rather than in a caller.
 *
 * The answer is on screen already, so a round trip to the service would add nothing, and this keeps
 * working with the backend down, like the quizzes and the two flag boards.
 *
 * Dragging is the point of the interaction and never the only way in. A press and drag from the
 * handle draws the line; a plain click arms the situation and the next click on a target connects
 * it, which is also what Enter and Space do. A line that already exists can be re-aimed by dragging
 * its arrowhead onto another target, and letting go of it anywhere else leaves the line where it
 * was, because a slipped grab should not silently undo an answer.
 *
 * While one situation is armed or being dragged, every other line dims. Several lines converging on
 * fewer targets gets busy, and the dimming is what says which one you are holding.
 *
 * The lines are one SVG overlay measured from the DOM rather than guessed at, so translation and
 * resizing keep the arrows on their anchors. The arrowhead grips sit in a second layer above it,
 * because the SVG itself is deaf to the pointer so that every hit lands on a control.
 *
 * The situations always shuffle, once per mount, so nobody learns an answer as a position. The
 * targets shuffle only when the caller asks: an ordered scale scrambled reads as noise.
 */

/**
 * How much a transformed ancestor is magnifying the board, or 1 when nothing is.
 *
 * Every anchor is measured with `getBoundingClientRect`, which reports **post**-transform pixels,
 * and is then drawn into the overlay `<svg>`, which carries no `viewBox` and is therefore addressed
 * in the board's **pre**-transform layout pixels. On a unit page those two are the same thing and
 * the distinction never comes up. Under a `transform: scale()` they are not, and every line
 * overshoots its target by exactly the scale factor. The presentation deck magnifies these boards
 * that way, which is how this surfaced.
 *
 * `offsetWidth` is the layout width and the rect is the painted one, so their ratio is the factor,
 * whatever produced it. Dividing by it is a no-op wherever there is no transform, which is why the
 * correction belongs here rather than in the caller that happens to magnify.
 */
function scaleOf(board: HTMLElement): number {
  const painted = board.getBoundingClientRect().width
  return painted > 0 && board.offsetWidth > 0 ? painted / board.offsetWidth : 1
}

export function ConnectBoard({
  block,
  namespace,
  prefix,
  items,
  targets,
  targetKey,
  shuffleTargets = false,
  targetFont = 'sans',
  className,
}: {
  /**
   * The BEM block every id on this board is built from, e.g. `pattern-match`. It is the board's own
   * name for itself rather than a React component name, so the caller can be renamed or split
   * without moving the ids.
   */
  block: string
  /** The step the text belongs to; every key below is read from that step's namespace. */
  namespace: string
  /**
   * The prefix the board's own messages sit under, e.g. `match` or `pick`. It carries `.title`,
   * `.description`, `.progress`, `.armed`, `.check`, `.retry`, `.aria.handle`, `.aria.grip`, and
   * one `.scenario.<id>` plus one `.explanation.<id>` per item.
   */
  prefix: string
  items: readonly ConnectItem[]
  /** The choices down the right, in the order they should be drawn if they do not shuffle. */
  targets: readonly string[]
  /** Message key for a target's label, which need not live under `prefix`. */
  targetKey: (target: string) => string
  shuffleTargets?: boolean
  /** `mono` for labels the machine produced (model names), per the design system. */
  targetFont?: 'sans' | 'mono'
  className?: string
}) {
  const { text } = useStepText(namespace)
  const { t } = useTranslation(namespace)

  const [scenarios] = useState(() => shuffled(items))
  const [choices] = useState(() => (shuffleTargets ? shuffled(targets) : [...targets]))
  const [links, setLinks] = useState<Record<string, string>>({})
  const [checked, setChecked] = useState(false)
  const [armed, setArmed] = useState<string | null>(null)
  /**
   * `from` says which control is being held. It matters because the grip has to stay mounted while
   * it is dragged: it holds the pointer capture, and unmounting it would swallow the `pointerup`
   * that ends the drag, leaving the board stuck with a dashed line and no way to drop it.
   */
  const [drag, setDrag] = useState<{
    scenarioId: string
    from: 'handle' | 'grip'
    point: Point
  } | null>(null)
  const [hovered, setHovered] = useState<string | null>(null)

  const boardRef = useRef<HTMLDivElement>(null)
  const handleRefs = useRef(new Map<string, HTMLElement>())
  const targetRefs = useRef(new Map<string, HTMLElement>())
  // Set on pointerup when a drag landed on a target, so the click that follows is not read as a
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
    const k = scaleOf(board)
    const handles: Record<string, Point> = {}
    for (const [id, node] of handleRefs.current) {
      const rect = node.getBoundingClientRect()
      handles[id] = {
        x: (rect.right - origin.left) / k,
        y: (rect.top + rect.height / 2 - origin.top) / k,
      }
    }
    const targetPoints: Record<string, Point> = {}
    for (const [id, node] of targetRefs.current) {
      const rect = node.getBoundingClientRect()
      targetPoints[id] = {
        x: (rect.left - origin.left) / k,
        y: (rect.top + rect.height / 2 - origin.top) / k,
      }
    }
    setAnchors({ handles, targets: targetPoints })
  }, [])

  useLayoutEffect(measure, [measure, scenarios, choices])

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

  function connect(scenarioId: string, target: string) {
    if (checked) {
      return
    }
    setLinks((current) => ({ ...current, [scenarioId]: target }))
    setArmed(null)
  }

  function targetUnder(clientX: number, clientY: number): string | null {
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
    const board = boardRef.current
    if (!board) {
      return { x: clientX, y: clientY }
    }
    const origin = board.getBoundingClientRect()
    const k = scaleOf(board)
    return { x: (clientX - origin.left) / k, y: (clientY - origin.top) / k }
  }

  /**
   * The situation the student is holding, if any. Everything else on the board steps back while it
   * is set, and after checking nothing is held, so nothing dims over a graded board.
   */
  const focused = checked ? null : (drag?.scenarioId ?? armed)

  /** Undefined until the board is checked, so one call covers "not graded yet" as well. */
  function verdictOf(scenario: ConnectItem, target: string | undefined): Verdict | undefined {
    if (!checked || !target) {
      return undefined
    }
    if (scenario.answer === 'any') {
      return 'note'
    }
    return target === scenario.answer ? 'right' : 'wrong'
  }

  const linked = Object.keys(links).length
  const complete = linked === scenarios.length

  return (
    <Card
      id={block}
      data-component="ConnectBoard"
      data-state={checked ? 'checked' : 'open'}
      className={className}
    >
      <CardHeader id={`${block}-header`} data-component="ConnectBoard">
        <CardTitle id={`${block}-title`} data-component="ConnectBoard">
          {text(`${prefix}.title`)}
        </CardTitle>
        <CardDescription id={`${block}-description`} data-component="ConnectBoard">
          {text(`${prefix}.description`)}
        </CardDescription>
      </CardHeader>

      <CardContent
        id={`${block}-content`}
        data-component="ConnectBoard"
        className="flex flex-col gap-5"
      >
        <p
          id={`${block}-progress`}
          data-component="ConnectBoard"
          role="status"
          className="text-muted-foreground text-sm tabular-nums"
        >
          {armed && !checked
            ? text(`${prefix}.armed`)
            : t(`${prefix}.progress`, { linked, total: scenarios.length })}
        </p>

        <div
          id={`${block}-board`}
          data-component="ConnectBoard"
          ref={boardRef}
          className="relative grid grid-cols-1 gap-x-16 gap-y-3 md:grid-cols-2"
        >
          {/* The lines. Behind the cards and deaf to the pointer: every hit lands on a control. */}
          <svg
            id={`${block}-lines`}
            data-component="ConnectBoard"
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
                  ['note', 'fill-amber-500'],
                ] as const
              ).map(([state, fill]) => (
                <marker
                  key={state}
                  id={`${block}-arrowhead-${state}`}
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
              const target = links[scenario.id]
              const from = anchors.handles[scenario.id]
              const to = target ? anchors.targets[target] : undefined
              // The line being re-aimed is replaced by the dashed one below, not drawn twice.
              if (!target || !from || !to || drag?.scenarioId === scenario.id) {
                return null
              }
              const state = verdictOf(scenario, target) ?? 'open'
              const bend = Math.max(28, (to.x - from.x) / 2)
              return (
                <path
                  key={scenario.id}
                  id={`${block}-line-${index}`}
                  data-component="ConnectBoard"
                  data-state={state}
                  d={`M ${from.x} ${from.y} C ${from.x + bend} ${from.y}, ${to.x - bend} ${to.y}, ${to.x} ${to.y}`}
                  fill="none"
                  strokeWidth="2"
                  markerEnd={`url(#${block}-arrowhead-${state})`}
                  className={cn(
                    'transition-opacity',
                    state === 'open' && 'stroke-primary/60',
                    state === 'right' && 'stroke-success',
                    state === 'wrong' && 'stroke-destructive',
                    state === 'note' && 'stroke-amber-500',
                    focused && focused !== scenario.id && 'opacity-25',
                  )}
                />
              )
            })}

            {/* the line being dragged: dashed, because it is not a connection yet */}
            {drag && anchors.handles[drag.scenarioId] && (
              <path
                id={`${block}-line-dragging`}
                data-component="ConnectBoard"
                d={`M ${anchors.handles[drag.scenarioId].x} ${anchors.handles[drag.scenarioId].y} L ${drag.point.x} ${drag.point.y}`}
                fill="none"
                strokeWidth="2"
                strokeDasharray="6 5"
                markerEnd={`url(#${block}-arrowhead-open)`}
                className="stroke-primary"
              />
            )}
          </svg>

          {/* The grips on the arrowheads, in their own layer: the SVG above takes no pointer events,
              so a control that has to be grabbed cannot live inside it. `z-10` is load-bearing. A
              grip sits on the left edge of its target, and both columns are painted after this
              layer, so without it the target button covers the grip and swallows the press. */}
          <div
            id={`${block}-grips`}
            data-component="ConnectBoard"
            className="pointer-events-none absolute inset-0 z-10 hidden size-full md:block"
          >
            {scenarios.map((scenario, index) => {
              const target = links[scenario.id]
              const dragging = drag?.from === 'grip' && drag.scenarioId === scenario.id
              const to = target ? anchors.targets[target] : undefined
              // While it is held, the grip rides the cursor instead of sitting on its old anchor.
              const at = dragging ? drag.point : to
              if (checked || !at || (!target && !dragging)) {
                return null
              }
              return (
                <button
                  key={scenario.id}
                  id={`${block}-grip-${index}`}
                  data-component="ConnectBoard"
                  data-state={dragging ? 'dragging' : 'placed'}
                  type="button"
                  aria-label={text(`${prefix}.aria.grip`)}
                  style={{ left: at.x, top: at.y }}
                  onPointerDown={(event) => {
                    event.currentTarget.setPointerCapture(event.pointerId)
                    setDrag({
                      scenarioId: scenario.id,
                      from: 'grip',
                      point: toBoard(event.clientX, event.clientY),
                    })
                    setArmed(scenario.id)
                  }}
                  onPointerMove={(event) => {
                    if (drag?.scenarioId !== scenario.id) {
                      return
                    }
                    setDrag({
                      scenarioId: scenario.id,
                      from: 'grip',
                      point: toBoard(event.clientX, event.clientY),
                    })
                    setHovered(targetUnder(event.clientX, event.clientY))
                  }}
                  onPointerUp={(event) => {
                    const dropped = targetUnder(event.clientX, event.clientY)
                    setDrag(null)
                    setHovered(null)
                    // Dropped on nothing: the line goes back where it was rather than vanishing.
                    if (dropped) {
                      justConnected.current = true
                      connect(scenario.id, dropped)
                    }
                    setArmed(null)
                  }}
                  onPointerCancel={() => {
                    setDrag(null)
                    setHovered(null)
                    setArmed(null)
                  }}
                  // Keyboard reaches the same rewiring through the row's own handle, so this grip
                  // only arms the row and lets the target column take the second press.
                  onClick={() => {
                    // The click that closes a successful drag is not a second interaction.
                    if (justConnected.current) {
                      justConnected.current = false
                      return
                    }
                    setArmed(scenario.id)
                  }}
                  // Deliberately invisible: a dot drawn on the arrowhead reads as a third kind of
                  // marker on a board that already has handles and targets. This is a hit area over
                  // the point of the arrow, sized for a comfortable grab, and the cursor is the only
                  // thing that advertises it. The focus ring still draws, so a keyboard can find it.
                  className={cn(
                    'pointer-events-auto absolute size-5 -translate-x-1/2 -translate-y-1/2 touch-none rounded-full bg-transparent',
                    'cursor-grab active:cursor-grabbing',
                    'focus-visible:ring-ring focus-visible:ring-[3px] focus-visible:outline-none',
                  )}
                />
              )
            })}
          </div>

          <ol
            id={`${block}-scenarios`}
            data-component="ConnectBoard"
            className="relative flex flex-col gap-3"
          >
            {scenarios.map((scenario, index) => {
              const target = links[scenario.id]
              const verdict = verdictOf(scenario, target)
              return (
                <li
                  key={scenario.id}
                  id={`${block}-scenario-${index}`}
                  data-component="ConnectBoard"
                  data-state={verdict ?? (target ? 'linked' : 'open')}
                  className={cn(
                    'flex items-start gap-3 rounded-xl border px-4 py-3 text-sm transition-colors',
                    !checked && armed === scenario.id && 'border-primary bg-primary/5',
                    !checked && armed !== scenario.id && 'border-border',
                    verdict === 'right' && 'border-success/40 bg-success/10',
                    verdict === 'wrong' && 'border-destructive/40',
                    verdict === 'note' && 'border-amber-500/50 bg-amber-500/5',
                  )}
                >
                  <p
                    id={`${block}-scenario-${index}-text`}
                    data-component="ConnectBoard"
                    className="flex-1"
                  >
                    {text(`${prefix}.scenario.${scenario.id}`)}
                    {/* Below md there are no lines to read, so the pick is named in words. */}
                    {target && (
                      <span
                        id={`${block}-scenario-${index}-pick`}
                        data-component="ConnectBoard"
                        className={cn(
                          'text-muted-foreground mt-1 block md:hidden',
                          targetFont === 'mono' && 'font-mono text-xs',
                        )}
                      >
                        {text(targetKey(target))}
                      </span>
                    )}
                  </p>

                  <button
                    id={`${block}-scenario-${index}-handle`}
                    data-component="ConnectBoard"
                    type="button"
                    disabled={checked}
                    aria-label={text(`${prefix}.aria.handle`)}
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
                        from: 'handle',
                        point: toBoard(event.clientX, event.clientY),
                      })
                    }}
                    onPointerMove={(event) => {
                      if (!drag || drag.scenarioId !== scenario.id) {
                        return
                      }
                      setDrag({
                        scenarioId: scenario.id,
                        from: 'handle',
                        point: toBoard(event.clientX, event.clientY),
                      })
                      setHovered(targetUnder(event.clientX, event.clientY))
                    }}
                    onPointerUp={(event) => {
                      const dropped = targetUnder(event.clientX, event.clientY)
                      setDrag(null)
                      setHovered(null)
                      if (dropped) {
                        justConnected.current = true
                        connect(scenario.id, dropped)
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
                      armed === scenario.id || drag?.scenarioId === scenario.id || target
                        ? 'border-primary bg-primary/30'
                        : 'border-primary/40 bg-background',
                      verdict === 'right' && 'border-success bg-success/30',
                      verdict === 'wrong' && 'border-destructive bg-destructive/20',
                      verdict === 'note' && 'border-amber-500 bg-amber-500/30',
                    )}
                  />
                </li>
              )
            })}
          </ol>

          <ul
            id={`${block}-targets`}
            data-component="ConnectBoard"
            className="relative mt-3 flex flex-col gap-3 md:mt-0 md:justify-center"
          >
            {choices.map((target, index) => (
              <li key={target} id={`${block}-target-${index}`} data-component="ConnectBoard">
                <button
                  id={`${block}-target-${index}-button`}
                  data-component="ConnectBoard"
                  type="button"
                  disabled={checked}
                  aria-label={text(targetKey(target))}
                  ref={(node) => {
                    if (node) {
                      targetRefs.current.set(target, node)
                    } else {
                      targetRefs.current.delete(target)
                    }
                  }}
                  onClick={() => {
                    if (armed) {
                      connect(armed, target)
                    }
                  }}
                  className={cn(
                    'w-full rounded-xl border px-4 py-3 text-left transition-colors',
                    'focus-visible:ring-ring focus-visible:ring-[3px] focus-visible:outline-none',
                    targetFont === 'mono' ? 'font-mono text-sm' : 'text-sm font-medium',
                    hovered === target && 'border-primary bg-primary/10',
                    hovered !== target && 'border-border',
                    !checked && armed && 'hover:border-primary hover:bg-primary/5',
                    checked && 'cursor-default',
                  )}
                >
                  {text(targetKey(target))}
                </button>
              </li>
            ))}
          </ul>
        </div>

        {/* A right answer is already marked right, so only a wrong one is worth a sentence. The
            amber row is the exception: it prints whatever you picked, because the sentence is the
            whole result there rather than a correction. */}
        {checked && (
          <ul
            id={`${block}-explanations`}
            data-component="ConnectBoard"
            className="flex flex-col gap-2"
          >
            {scenarios.map((scenario, index) => {
              const verdict = verdictOf(scenario, links[scenario.id])
              if (verdict !== 'wrong' && verdict !== 'note') {
                return null
              }
              return (
                <li
                  key={scenario.id}
                  id={`${block}-explanation-${index}`}
                  data-component="ConnectBoard"
                  data-state={verdict}
                  className={cn(
                    'border-l-2 pl-3 text-sm',
                    verdict === 'wrong' && 'border-destructive/40',
                    verdict === 'note' && 'border-amber-500/50',
                  )}
                >
                  {text(`${prefix}.explanation.${scenario.id}`)}
                </li>
              )
            })}
          </ul>
        )}

        <div id={`${block}-actions`} data-component="ConnectBoard" className="flex justify-end">
          {checked ? (
            <Button
              id={`${block}-retry`}
              data-component="ConnectBoard"
              type="button"
              variant="outline"
              onClick={() => {
                setLinks({})
                setChecked(false)
                setArmed(null)
              }}
            >
              {text(`${prefix}.retry`)}
            </Button>
          ) : (
            <Button
              id={`${block}-check`}
              data-component="ConnectBoard"
              type="button"
              disabled={!complete}
              onClick={() => {
                setChecked(true)
                setArmed(null)
              }}
            >
              {text(`${prefix}.check`)}
            </Button>
          )}
        </div>
      </CardContent>
    </Card>
  )
}
