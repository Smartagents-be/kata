import { useId } from 'react'
import { useTranslation } from 'react-i18next'

/**
 * Four ways of arranging agents, drawn as how much of your attention each one gets: one agent on a
 * live wire, four agents on four thin ones, four behind an orchestrator you brief instead, and one
 * live wire with three running behind it.
 *
 * It closes the `parallel` unit rather than opening it, on `WorkflowWeights`'s reasoning: the rows
 * are named, and a reader who met the drawing under the first section would be looking at three
 * shapes they had not been given yet. So the last row is the section it sits under, and the three
 * above it are what the reader has already read.
 *
 * **Teal is the agent you are actually watching**, and that is the only colour rule in here. Row one
 * has one. Row two has none, because four at once is nobody watched, and the wires are thin for the
 * same reason. Row three has the teal on the orchestrator, and its sub-agents are muted but solid,
 * because somebody is watching them even though it is not you. Row four has the teal back plus three
 * dashed wires, on the step 1 reading of a dash: what is running without anyone. The count is not the
 * argument; where the teal is, is.
 *
 * **Rows two and three run the same four agents and differ only in who holds the wires**, which is
 * the whole reason the orchestrator gets a row rather than a sentence. Its extra box sits in the gap
 * between `you` and the agent column every row shares, so the drawing says what an orchestrator is:
 * a hop inserted between you and the work. Keep the sub-agent count equal to row two's, or the
 * comparison turns into one about volume.
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
  agents: readonly { y: number; h: number; state: AgentState }[]
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
      { y: 24, h: 20, state: 'idle' },
      { y: 52, h: 20, state: 'idle' },
      { y: 80, h: 20, state: 'idle' },
      { y: 108, h: 20, state: 'idle' },
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
    key: 'mixed',
    dy: 378,
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

  return (
    <figure id="agents-at-once" data-component="AgentsAtOnce" className="my-8 flex justify-center">
      <svg
        id="agents-at-once-svg"
        data-component="AgentsAtOnce"
        viewBox="0 0 640 518"
        role="img"
        aria-labelledby={titleId}
        className="h-auto w-full max-w-2xl"
      >
        <title id={titleId} data-component="AgentsAtOnce">
          {t('agents-at-once.description')}
        </title>

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

            {row.agents.map((agent, index) => (
              <line
                key={`wire-${index}`}
                id={`agents-at-once-${row.key}-wire-${index}`}
                data-component="AgentsAtOnce"
                data-state={agent.state}
                x1={row.lead ? LEAD_X + LEAD_W + STANDOFF : YOU_W + STANDOFF}
                y1={row.lead ? row.lead.y + row.lead.h / 2 : row.youY + YOU_H / 2}
                x2={AGENT_X - STANDOFF}
                y2={agent.y + agent.h / 2}
                strokeWidth={agent.state === 'watched' ? 2.5 : 1.5}
                strokeDasharray={agent.state === 'background' ? '4 4' : undefined}
                className={WIRE[agent.state]}
              />
            ))}

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
                  {t('flow.node.agent')}
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
