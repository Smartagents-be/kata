import { useId } from 'react'
import { useTranslation } from 'react-i18next'

/**
 * Five ways of arranging agents, drawn as how much of your attention each one gets: one agent on a
 * live wire, four agents on four dashed ones, four behind an orchestrator you brief instead, a pair
 * arguing with each other on a wire you let go of, and one live wire with three running behind it.
 *
 * It closes the `parallel` unit rather than opening it, on `WorkflowWeights`'s reasoning: the rows
 * are named, and a reader who met the drawing under the first section would be looking at three
 * shapes they had not been given yet. So the last row is the section it sits under, and the three
 * above it are what the reader has already read.
 *
 * **Teal is the agent you are actually watching**, and it is the only colour rule in here. The dash
 * carries the rest of the grammar, on the step 1 reading of one: solid means somebody has it, dashed
 * means nobody does. Row one is a single teal wire. Row two is four dashed ones and no teal at all,
 * because four at once is nobody watched, which is exactly what the paragraph above the figure says.
 * Row three keeps the teal on the orchestrator and leaves its sub-agents muted but solid, because
 * somebody is watching them even though it is not you. Row four is the teal back plus three dashed
 * wires. What tells rows two and four apart is that teal, and not the wires.
 *
 * **Rows two and three run the same four agents and differ only in who holds the wires**, which is
 * the whole reason the orchestrator gets a row rather than a sentence. Its extra box sits in the gap
 * between `you` and the agent column every row shares, so the drawing says what an orchestrator is:
 * a hop inserted between you and the work. Keep the sub-agent count equal to row two's, or the
 * comparison turns into one about volume.
 *
 * **Row four is the one place the grammar is split across a row**, and it has to be: the wire from
 * you is dashed because you walked away, and the wire between the two agents is solid because they
 * are holding each other. That is `feedState` on the row, and it is the only reason it exists. Both
 * boxes stay muted for the same reason the orchestrator's sub-agents do, somebody is watching and
 * it is not you. The two agents are stacked rather than set side by side so the notes stay in one
 * column; a third column of boxes pushes the longest Dutch note off the viewBox.
 *
 * The arrowheads on that link are the only ones in the figure, and they are the row's content:
 * every other wire runs one way from left to right and needs no head to say so, while this one
 * running both ways is what makes the pair a loop rather than two agents standing near each other.
 * `orient="auto-start-reverse"` is what lets one marker serve both ends.
 *
 * `you` and `agent` come from `flow.node.*`, which is `FlowDiagram`'s own vocabulary in `workflows`,
 * so the two figures name the same boxes the same way and a rewording moves both.
 *
 * SVG rather than DOM, because the wires are the content. What that costs is wrapping: an SVG `text`
 * does not, so the right-hand notes are kept short enough to clear the column in both languages.
 * `ScriptRuns` is where that placement comes from, notes on the right rather than a paragraph
 * reading each row back.
 */
const YOU_W = 52
const YOU_H = 26
const LEAD_X = 130
const LEAD_W = 64
const AGENT_X = 250
const AGENT_W = 64
/**
 * Far enough right that the longest note still clears the viewBox in Dutch, and near enough that the
 * drawing spans the prose column instead of sitting inset in it, which is `LoopsPerHour`'s rule.
 */
const NOTE_X = 380
/** So a wire reads as arriving at a box rather than touching it, the way `FlowDiagram`'s arrows do. */
const STANDOFF = 6

type AgentState = 'watched' | 'idle' | 'background'

interface Row {
  key: string
  /** Where the row sits in the viewBox. Hand-fitted so no wire crosses the row above it. */
  dy: number
  /** Top of the `you` box, placed so its centre is the mean of what it feeds. */
  youY: number
  /**
   * The orchestrator row's extra box. When it is here, `you` feeds only this and every agent wire
   * leaves it instead, which is the two-hop shape drawn rather than described.
   */
  lead?: { y: number; h: number }
  /**
   * The state of the wires leaving `you` (or the lead), when it differs from the state of the agent
   * they arrive at. Only the pair needs it: nobody is holding that wire, and the two agents on the
   * end of it are holding each other.
   */
  feedState?: AgentState
  /** Indices of two agents joined by a wire that runs both ways. */
  link?: readonly [number, number]
  agents: readonly {
    y: number
    h: number
    state: AgentState
    /** A key under `agents-at-once.<row>.`, for a box that is not just another `agent`. */
    label?: string
    /** False for an agent nothing feeds from the left, which is the critic hanging off the builder. */
    fed?: boolean
  }[]
}

const ROWS: readonly Row[] = [
  {
    key: 'one',
    dy: 0,
    youY: 24,
    agents: [{ y: 24, h: 26, state: 'watched' }],
  },
  {
    key: 'many',
    dy: 74,
    youY: 63,
    agents: [
      { y: 24, h: 20, state: 'background' },
      { y: 52, h: 20, state: 'background' },
      { y: 80, h: 20, state: 'background' },
      { y: 108, h: 20, state: 'background' },
    ],
  },
  {
    key: 'orchestrated',
    dy: 226,
    youY: 63,
    lead: { y: 63, h: 26 },
    agents: [
      { y: 24, h: 20, state: 'idle' },
      { y: 52, h: 20, state: 'idle' },
      { y: 80, h: 20, state: 'idle' },
      { y: 108, h: 20, state: 'idle' },
    ],
  },
  {
    key: 'recursive',
    dy: 378,
    youY: 24,
    feedState: 'background',
    link: [0, 1],
    agents: [
      { y: 24, h: 26, state: 'idle', label: 'build' },
      { y: 84, h: 26, state: 'idle', label: 'check', fed: false },
    ],
  },
  {
    key: 'mixed',
    dy: 510,
    youY: 68,
    agents: [
      { y: 24, h: 24, state: 'watched' },
      { y: 58, h: 20, state: 'background' },
      { y: 86, h: 20, state: 'background' },
      { y: 114, h: 20, state: 'background' },
    ],
  },
]

const WIRE: Record<AgentState, string> = {
  watched: 'stroke-primary',
  idle: 'stroke-muted-foreground/60',
  background: 'stroke-muted-foreground/45',
}

const BOX: Record<AgentState, string> = {
  watched: 'fill-primary/10 stroke-primary',
  idle: 'fill-none stroke-muted-foreground/60',
  background: 'fill-none stroke-muted-foreground/45',
}

export function AgentsAtOnce() {
  const { t } = useTranslation('step2')
  const titleId = useId()
  const markerId = `agents-at-once-head-${useId()}`

  return (
    <figure id="agents-at-once" data-component="AgentsAtOnce" className="my-8 flex justify-center">
      <svg
        id="agents-at-once-svg"
        data-component="AgentsAtOnce"
        viewBox="0 0 640 650"
        role="img"
        aria-labelledby={titleId}
        className="h-auto w-full max-w-2xl"
      >
        <title id={titleId} data-component="AgentsAtOnce">
          {t('agents-at-once.description')}
        </title>

        {/* Per instance, because the figure is on a unit page and on a slide and two defs with one
            id resolve to the first, the way `SmartAgentsMark`'s gradient does. */}
        <defs>
          <marker
            id={markerId}
            viewBox="0 0 8 8"
            refX="7"
            refY="4"
            markerWidth="6"
            markerHeight="6"
            orient="auto-start-reverse"
          >
            <path d="M0 0 L8 4 L0 8 z" className="fill-muted-foreground/60" />
          </marker>
        </defs>

        {ROWS.map((row) => (
          <g
            key={row.key}
            id={`agents-at-once-${row.key}`}
            data-component="AgentsAtOnce"
            transform={`translate(0 ${row.dy})`}
          >
            <text
              id={`agents-at-once-${row.key}-label`}
              data-component="AgentsAtOnce"
              x="0"
              y="12"
              fontSize="14"
              className="fill-foreground font-medium"
            >
              {t(`agents-at-once.${row.key}.name`)}
            </text>

            {/* The hop from you to the orchestrator, and the only wire on that row you are on. */}
            {row.lead && (
              <line
                id={`agents-at-once-${row.key}-lead-wire`}
                data-component="AgentsAtOnce"
                data-state="watched"
                x1={YOU_W + STANDOFF}
                y1={row.youY + YOU_H / 2}
                x2={LEAD_X - STANDOFF}
                y2={row.lead.y + row.lead.h / 2}
                strokeWidth="2.5"
                className={WIRE.watched}
              />
            )}

            {row.agents.map((agent, index) => {
              if (agent.fed === false) return null
              const state = row.feedState ?? agent.state
              return (
                <line
                  key={`wire-${index}`}
                  id={`agents-at-once-${row.key}-wire-${index}`}
                  data-component="AgentsAtOnce"
                  data-state={state}
                  x1={row.lead ? LEAD_X + LEAD_W + STANDOFF : YOU_W + STANDOFF}
                  y1={row.lead ? row.lead.y + row.lead.h / 2 : row.youY + YOU_H / 2}
                  x2={AGENT_X - STANDOFF}
                  y2={agent.y + agent.h / 2}
                  strokeWidth={state === 'watched' ? 2.5 : 1.5}
                  strokeDasharray={state === 'background' ? '4 4' : undefined}
                  className={WIRE[state]}
                />
              )
            })}

            {/* The pair's own wire, and the only one in the figure with a head on each end. */}
            {row.link && (
              <line
                id={`agents-at-once-${row.key}-link`}
                data-component="AgentsAtOnce"
                x1={AGENT_X + AGENT_W / 2}
                y1={row.agents[row.link[0]].y + row.agents[row.link[0]].h + STANDOFF}
                x2={AGENT_X + AGENT_W / 2}
                y2={row.agents[row.link[1]].y - STANDOFF}
                strokeWidth="1.5"
                markerStart={`url(#${markerId})`}
                markerEnd={`url(#${markerId})`}
                className={WIRE.idle}
              />
            )}

            {row.lead && (
              <g id={`agents-at-once-${row.key}-lead`} data-component="AgentsAtOnce">
                <rect
                  x={LEAD_X}
                  y={row.lead.y}
                  width={LEAD_W}
                  height={row.lead.h}
                  rx="6"
                  strokeWidth="2"
                  className={BOX.watched}
                  data-component="AgentsAtOnce"
                />
                <text
                  x={LEAD_X + LEAD_W / 2}
                  y={row.lead.y + row.lead.h / 2 + 4}
                  fontSize="12"
                  textAnchor="middle"
                  className="fill-foreground"
                  data-component="AgentsAtOnce"
                >
                  {t('flow.node.agent')}
                </text>
              </g>
            )}

            <rect
              id={`agents-at-once-${row.key}-you`}
              data-component="AgentsAtOnce"
              x="0"
              y={row.youY}
              width={YOU_W}
              height={YOU_H}
              rx="6"
              strokeWidth="1.5"
              className="fill-background stroke-muted-foreground/60"
            />
            <text
              data-component="AgentsAtOnce"
              x={YOU_W / 2}
              y={row.youY + 18}
              fontSize="12"
              textAnchor="middle"
              className="fill-foreground"
            >
              {t('flow.node.you')}
            </text>

            {row.agents.map((agent, index) => (
              <g
                key={`agent-${index}`}
                id={`agents-at-once-${row.key}-agent-${index}`}
                data-component="AgentsAtOnce"
                data-state={agent.state}
              >
                <rect
                  x={AGENT_X}
                  y={agent.y}
                  width={AGENT_W}
                  height={agent.h}
                  rx="6"
                  strokeWidth={agent.state === 'watched' ? 2 : 1.5}
                  strokeDasharray={agent.state === 'background' ? '4 4' : undefined}
                  className={BOX[agent.state]}
                  data-component="AgentsAtOnce"
                />
                <text
                  x={AGENT_X + AGENT_W / 2}
                  y={agent.y + agent.h / 2 + 4}
                  fontSize="12"
                  textAnchor="middle"
                  className={agent.state === 'watched' ? 'fill-foreground' : 'fill-muted-foreground'}
                  data-component="AgentsAtOnce"
                >
                  {agent.label ? t(`agents-at-once.${row.key}.${agent.label}`) : t('flow.node.agent')}
                </text>
              </g>
            ))}

            {/* What comes back, on the right, so no paragraph has to walk the rows. */}
            <text
              id={`agents-at-once-${row.key}-note`}
              data-component="AgentsAtOnce"
              x={NOTE_X}
              y={row.youY + 18}
              fontSize="13"
              className="fill-muted-foreground"
            >
              {t(`agents-at-once.${row.key}.note`)}
            </text>
          </g>
        ))}
      </svg>
    </figure>
  )
}
