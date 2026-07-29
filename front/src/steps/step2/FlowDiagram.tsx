import { ArrowLeftRight, ArrowRight, ChevronDown, ChevronLeft, ChevronUp } from 'lucide-react'
import { useLayoutEffect, useRef, useState } from 'react'
import { useTranslation } from 'react-i18next'

/**
 * Who talks to what, in one row. Each of the four sections closes on one of these, and read down
 * the unit they are the argument in miniature: `naive` has no way back from anywhere, `plan-based`
 * gives you one to the agent, `spec-driven` puts a file inside the project that both of you keep,
 * and `audit-driven` closes the row into a cycle.
 *
 * **Teal is always what that section adds**, and it is the only colour rule in here: a two-way link
 * is teal, a one-way link is muted, and the return path of a loop is teal too. That is what makes
 * the four readable as a sequence rather than as four unrelated rows, so a change to one is a
 * change to all four.
 *
 * The labels are bare nouns rather than `the agent` and `the code`, which is a width decision as
 * much as a style one: `audit-driven` runs to five boxes and four arrows, and the definite articles
 * are what pushed it past the prose column and into wrapping.
 *
 * DOM rather than SVG, like `WorkflowTimeline`: the labels are words, so they size themselves in
 * both languages. The arrows are decorative, so each figure carries its own `aria-label` and the
 * direction is not lost on a reader who cannot see them.
 */
export type FlowLink = 'one' | 'both'

/**
 * A box, or a box holding a row of its own. The group is the project: the spec and the code are
 * both things in the repository, so the frame around them is what the arrows land on.
 */
export type FlowNode =
  | string
  | {
      label: string
      nodes: readonly string[]
      links: readonly FlowLink[]
      /** Inner nodes drawn as optional. `audit-driven` runs on any project, spec or no spec. */
      faint?: readonly string[]
    }

/** The arrow between two nodes. Teal when it goes both ways, because that is the thing being added. */
function Link({ id, kind }: { id: string; kind: FlowLink }) {
  if (kind === 'both') {
    return (
      <ArrowLeftRight
        id={id}
        data-component="FlowDiagram"
        data-state="both"
        aria-hidden="true"
        className="text-primary size-4 shrink-0"
      />
    )
  }

  return (
    <ArrowRight
      id={id}
      data-component="FlowDiagram"
      data-state="one"
      aria-hidden="true"
      className="text-muted-foreground/60 size-4 shrink-0"
    />
  )
}

/**
 * One labelled box. The same card `WorkflowTimeline` draws its stages with, so the unit has one
 * shape.
 *
 * `faint` is the box that does not have to be there, drawn dashed and set back on the step-1 reading
 * of a dash. It is what lets `audit-driven` show a project with a spec in it without claiming the
 * spec is a precondition: you can audit a repository that never had one.
 */
function Node({ id, node, faint = false }: { id: string; node: string; faint?: boolean }) {
  const { t } = useTranslation('step2')

  return (
    <span
      id={id}
      data-component="FlowDiagram"
      data-state={faint ? 'optional' : 'present'}
      className={
        faint
          ? 'border-border text-muted-foreground rounded-lg border border-dashed px-3 py-2 text-sm'
          : 'border-primary/40 bg-primary/5 text-foreground rounded-lg border px-3 py-2 text-sm'
      }
    >
      {t(`flow.node.${node}`)}
    </span>
  )
}

/** How far under the row a branch box hangs, in px, and a box's height until one is measured. */
const BRANCH_DEPTH = 28
const BOX_HEIGHT = 38
/** The gap an arrowhead keeps from the box it points at, so the two do not touch. */
const STANDOFF = 12

/**
 * Where the return path's two risers sit: on the centre of the box the loop points back at, and on
 * the centre of the last box in the row.
 *
 * Measured rather than written down because the boxes are words: they are a different width in
 * Dutch, and the project frame is wider than a plain box. `data-flow-box` marks the top-level boxes
 * only, so the spec and the code inside the frame are not mistaken for the ends of the row.
 *
 * The same measurement carries the path drawn under the row, so the two are one set of numbers: the
 * branch hangs on `left`, and the feed comes back down the same column the return path went up.
 */
function useLoopInset(enabled: boolean, target: number) {
  const ref = useRef<HTMLDivElement>(null)
  const [inset, setInset] = useState({
    left: 0,
    right: 0,
    drop: 0,
    rise: 0,
    width: 0,
    branch: 0,
    branchHeight: BOX_HEIGHT,
  })

  useLayoutEffect(() => {
    const root = ref.current
    if (!enabled || !root) {
      return
    }

    const measure = () => {
      const rowElement = root.querySelector('[data-flow-row]')
      const boxes = root.querySelectorAll('[data-flow-box]')
      const from = boxes[target]
      const last = boxes[boxes.length - 1]
      if (!rowElement || !from || !last) {
        return
      }
      const row = rowElement.getBoundingClientRect()
      const a = from.getBoundingClientRect()
      const b = last.getBoundingClientRect()
      const branch = root.querySelector('[data-flow-branch]')
      setInset({
        left: a.left + a.width / 2 - row.left,
        right: row.right - (b.left + b.width / 2),
        width: row.width,
        branch: branch ? branch.getBoundingClientRect().width : 0,
        branchHeight: branch ? branch.getBoundingClientRect().height : BOX_HEIGHT,
        // The row is centred on its tallest item, so a plain box neither starts where the row does
        // nor ends where it does. Both gaps are measured, or an arrowhead stops short of the box it
        // points at: `drop` for the path coming down from above, `rise` for the one coming up.
        drop: a.top - row.top,
        rise: row.bottom - a.bottom,
      })
    }

    measure()
    const observer = new ResizeObserver(measure)
    observer.observe(root)
    return () => observer.disconnect()
  }, [enabled, target])

  return { ref, inset }
}

/**
 * The half of the cycle drawn under the row: the project comes back along the bottom and up into the
 * box hanging below, and that box carries on up into the one it hangs from.
 *
 * The run comes into the box's **right-hand side**, at its own vertical middle, so the return reads
 * as arriving from where it came from rather than from underneath. Only the segment out of the top
 * carries on up into the row.
 *
 * Its coordinates run from the row's bottom edge, which is why the segment into the row is placed at
 * a negative offset: the row is as tall as the project frame, so the box this points at ends above
 * where the row does.
 */
function BranchFeed({
  id,
  label,
  inset,
}: {
  id: string
  label: string
  inset: {
    left: number
    right: number
    rise: number
    width: number
    branch: number
    branchHeight: number
  }
}) {
  const run = BRANCH_DEPTH + inset.branchHeight / 2
  const fromX = inset.width - inset.right
  const toX = inset.left + inset.branch / 2 + STANDOFF

  return (
    <div
      id={`${id}-feed`}
      data-component="FlowDiagram"
      className="relative"
      style={{ height: BRANCH_DEPTH + inset.branchHeight }}
    >
      <div
        id={`${id}-feed-riser`}
        data-component="FlowDiagram"
        style={{ left: fromX, height: run }}
        className="border-primary/40 absolute top-0 border-l border-dashed"
      />
      <div
        id={`${id}-feed-run`}
        data-component="FlowDiagram"
        style={{ left: toX, width: Math.max(fromX - toX, 0), top: run }}
        className="border-primary/40 absolute border-t border-dashed"
      />
      <ChevronLeft
        id={`${id}-feed-arrow`}
        data-component="FlowDiagram"
        aria-hidden="true"
        style={{ left: toX, top: run }}
        className="text-primary absolute size-4 -translate-x-1/2 -translate-y-1/2"
      />

      <div
        data-flow-branch=""
        data-component="FlowDiagram"
        style={{ left: inset.left, top: BRANCH_DEPTH }}
        className="absolute flex -translate-x-1/2"
      >
        <Node id={`${id}-branch-label`} node={label} />
      </div>

      {/* And on up into the box it hangs from. */}
      <div
        id={`${id}-feed-return`}
        data-component="FlowDiagram"
        style={{
          left: inset.left,
          top: STANDOFF - inset.rise,
          height: BRANCH_DEPTH + inset.rise - STANDOFF,
        }}
        className="border-primary/40 absolute border-l border-dashed"
      />
      <ChevronUp
        id={`${id}-feed-return-arrow`}
        data-component="FlowDiagram"
        aria-hidden="true"
        style={{ left: inset.left, top: STANDOFF - inset.rise }}
        className="text-primary absolute size-4 -translate-x-1/2 -translate-y-1/2"
      />
    </div>
  )
}

export function FlowDiagram({
  id,
  nodes,
  links,
  loop = false,
  loopTo = 0,
  branch,
}: {
  id: string
  nodes: readonly FlowNode[]
  links: readonly FlowLink[]
  /** Draws the return path from the last node back to `loopTo`, and labels it `<id>.loop`. */
  loop?: boolean
  /** Which node the return path comes down into. Defaults to the start of the row. */
  loopTo?: number
  /** A box hanging under `loopTo`, fed by the last node and feeding back up into it. */
  branch?: string
}) {
  const { t } = useTranslation('step2')
  const { ref, inset } = useLoopInset(loop, loopTo)

  const row = (
    <div
      id={`${id}-row`}
      data-flow-row=""
      data-component="FlowDiagram"
      className="flex flex-wrap items-center justify-center gap-2"
    >
      {nodes.map((node, index) => (
        <div
          key={index}
          id={`${id}-node-${index}`}
          data-component="FlowDiagram"
          className="flex items-center gap-2"
        >
          {index > 0 && <Link id={`${id}-link-${index - 1}`} kind={links[index - 1]} />}

          {/* The box on its own, so the loop can measure where its centre is. */}
          <div data-flow-box="" data-component="FlowDiagram" className="relative">
            {typeof node === 'string' ? (
              <Node id={`${id}-node-${index}-label`} node={node} />
            ) : (
              // The frame is neutral where the boxes are teal, so it reads as the thing they sit in
              // rather than as another one of them.
              <div
                id={`${id}-node-${index}-group`}
                data-component="FlowDiagram"
                className="border-border rounded-xl border px-3 pt-2 pb-3"
              >
                <p
                  id={`${id}-node-${index}-group-label`}
                  data-component="FlowDiagram"
                  className="eyebrow text-muted-foreground mb-2 text-center"
                >
                  {t(`flow.node.${node.label}`)}
                </p>
                <div
                  id={`${id}-node-${index}-group-row`}
                  data-component="FlowDiagram"
                  className="flex items-center gap-2"
                >
                  {node.nodes.map((inner, innerIndex) => (
                    <div
                      key={inner}
                      id={`${id}-node-${index}-inner-${innerIndex}`}
                      data-component="FlowDiagram"
                      className="flex items-center gap-2"
                    >
                      {innerIndex > 0 && (
                        <Link
                          id={`${id}-node-${index}-inner-link-${innerIndex - 1}`}
                          kind={node.links[innerIndex - 1]}
                        />
                      )}
                      <Node
                        id={`${id}-node-${index}-inner-${innerIndex}-label`}
                        node={inner}
                        faint={node.faint?.includes(inner)}
                      />
                    </div>
                  ))}
                </div>
              </div>
            )}

          </div>
        </div>
      ))}
    </div>
  )

  if (!loop) {
    return (
      <figure
        id={id}
        data-component="FlowDiagram"
        role="img"
        aria-label={t(`${id}.description`)}
        className="not-prose my-6 flex justify-center"
      >
        {row}
      </figure>
    )
  }

  return (
    <figure
      id={id}
      data-component="FlowDiagram"
      role="img"
      aria-label={t(`${id}.description`)}
      className="not-prose my-6 flex justify-center"
    >
      {/* Shrink-to-fit around the row, so the return path spans the row rather than the column. */}
      <div id={`${id}-cycle`} data-component="FlowDiagram" ref={ref}>
        <p
          id={`${id}-return-label`}
          data-component="FlowDiagram"
          className="text-primary mb-1 text-center text-xs"
        >
          {t(`${id}.loop`)}
        </p>

        {/* The return path runs over the top: up out of the last box, left, and down into the one
            it feeds. Above rather than below because a branch hangs under the row, and a path that
            had to dodge it would stop reading as a straight line back. Three borders are the whole
            of it, and the chevron caps the riser it comes down. */}
        <div
          id={`${id}-return`}
          data-component="FlowDiagram"
          className="relative mb-2"
          style={{ marginLeft: inset.left, marginRight: inset.right }}
        >
          <div
            id={`${id}-return-path`}
            data-component="FlowDiagram"
            className="border-primary/40 h-5 border-t border-r border-l border-dashed"
          />
          {/* Carries the riser down past the row's top edge, stopping a standoff short of the box
              so the arrowhead reads as arriving at it rather than sitting on it. */}
          <div
            id={`${id}-return-drop`}
            data-component="FlowDiagram"
            style={{ height: Math.max(inset.drop + 8 - STANDOFF, 0) }}
            className="border-primary/40 absolute top-full left-0 border-l border-dashed"
          />
          <ChevronDown
            id={`${id}-return-arrow`}
            data-component="FlowDiagram"
            aria-hidden="true"
            style={{ top: `calc(100% + ${Math.max(inset.drop + 8 - STANDOFF, 0)}px)` }}
            className="text-primary absolute left-0 size-4 -translate-x-1/2 -translate-y-1/2"
          />
        </div>

        {row}

        {branch !== undefined && <BranchFeed id={id} label={branch} inset={inset} />}
      </div>
    </figure>
  )
}
