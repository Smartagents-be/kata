import { useId } from 'react'
import { useTranslation } from 'react-i18next'
import { useAssistant } from '@/shared/assistant/useAssistant'
import { StoryToggle } from '@/shared/motion/StoryToggle'
import { beat, useStory } from '@/shared/motion/useStory'

/**
 * Decomposition as a tree, solved with sub-agents: the task at the top, two parts under it, and two
 * under each of those, down to four pieces small enough to carry out in a single pass. It sits under
 * `agent-patterns.decomposition.2` and `.3`, which say the same in words.
 *
 * **It is Google Cloud's hierarchical task decomposition pattern** (redrawn October 2026, at the
 * owner's asking): "A top-level parent, or root, agent ... is responsible for decomposing the task
 * into several smaller, manageable sub-tasks", it "delegates each sub-task to a specialized subagent
 * at a lower level", repeated "through multiple layers" until a worker can execute a piece
 * "directly", and it is "an implementation of the coordinator pattern"
 * (docs.cloud.google.com/architecture/choose-design-pattern-agentic-ai-system, last reviewed
 * 28 May 2026). Two earlier drawings were wrong and must not come back: one drew "the agent asks /
 * you decide", which is the interview pattern from `prompt`, and the next drew the plan with checks
 * and the human's edits, which was far too much on one figure.
 *
 * **It plays on `useStory`'s clock** (at the owner's asking, so it reads as sub-agents doing the work
 * the way the coordinator's do): the agent cuts the task, the parts are cut again, the leaves are
 * worked at different speeds, and each result climbs back up to whoever handed the piece out. Every
 * node is tagged with who holds it. **Who cuts the middle level differs per assistant, and the tags
 * follow it**: in Claude Code "a subagent can spawn subagents of its own, up to three layers below
 * the main conversation" (code.claude.com/docs/en/sub-agents), so the two parts are sub-agents that cut
 * further; in Copilot in the IDE subagents "cannot create other subagents" (docs.github.com, use
 * subagents), so the main agent cuts both levels, the middle boxes say "no sub-agent", and only the leaves are.
 *
 * The leaves name no catalogue data the service does not have and lean on none of step 1's
 * exercises; the example stays "Add search to the catalogue", the course's canonical thin ask out of
 * `decomposition.1`. Reduced motion shows the last frame: every piece done and checked.
 */
const LEAVES = [
  { x: 16, key: 'logic', parent: 0, work: 1300 },
  { x: 156, key: 'endpoint', parent: 0, work: 2000 },
  { x: 316, key: 'field', parent: 1, work: 1000 },
  { x: 456, key: 'empty', parent: 1, work: 1600 },
] as const

const BRANCHES = [
  { x: 80, key: 'backend' },
  { x: 380, key: 'frontend' },
] as const

const ROOT_Y = 18
const MID_Y = 110
const LEAF_Y = 202
const BOX_H = 48

/** The story's beats, in ms. */
const CUT_1 = 500
const CUT_2 = 1500
const WORK = 2500
const CLIMB = 500
const leafDone = (index: number) => WORK + LEAVES[index].work
const branchDone = (branch: number) =>
  Math.max(...LEAVES.filter((leaf) => leaf.parent === branch).map((_, k) => leafDone(branch * 2 + k))) + CLIMB
const rootDone = Math.max(branchDone(0), branchDone(1)) + CLIMB
const LENGTH = rootDone + 600

export function DecompositionTree() {
  const { t } = useTranslation('step1')
  const { assistant } = useAssistant()
  const [ref, now, story] = useStory<SVGSVGElement>(LENGTH, 3000)
  const titleId = useId()

  const midTag = assistant === 'copilot' ? t('decomposition-tree.not-subagent') : t('decomposition-tree.subagent')
  const cut1 = beat(now, CUT_1, 500)
  const cut2 = beat(now, CUT_2, 500)
  const rootChecked = now >= rootDone

  const tick = (x: number, y: number, on: boolean, id: string) => (
    <text
      id={id}
      data-component="DecompositionTree"
      x={x}
      y={y}
      fontSize="14"
      fontWeight="700"
      textAnchor="end"
      className="fill-primary"
      style={{ opacity: on ? 1 : 0 }}
    >
      ✓
    </text>
  )

  return (
    <figure
      id="decomposition-tree"
      data-component="DecompositionTree"
      className="my-8 flex flex-col items-center gap-2"
    >
      <svg
        id="decomposition-tree-svg"
        data-component="DecompositionTree"
        ref={ref}
        viewBox="0 0 600 290"
        role="img"
        aria-labelledby={titleId}
        className="h-auto w-full max-w-xl"
      >
        <title id={titleId} data-component="DecompositionTree">
          {t(assistant === 'copilot' ? 'decomposition-tree.description.copilot' : 'decomposition-tree.description.claude')}
        </title>

        <g fill="none" strokeWidth="1.5" className="stroke-primary/40">
          <path
            id="decomposition-tree-branches"
            data-component="DecompositionTree"
            d={`M 300 ${ROOT_Y + BOX_H} V 88 H 150 V ${MID_Y} M 300 88 H 450 V ${MID_Y}`}
            style={{ opacity: cut1 }}
          />
          <path
            id="decomposition-tree-leaves-0"
            data-component="DecompositionTree"
            d={`M 150 ${MID_Y + BOX_H} V 180 H 80 V ${LEAF_Y} M 150 180 H 220 V ${LEAF_Y}`}
            style={{ opacity: cut2 }}
          />
          <path
            id="decomposition-tree-leaves-1"
            data-component="DecompositionTree"
            d={`M 450 ${MID_Y + BOX_H} V 180 H 380 V ${LEAF_Y} M 450 180 H 520 V ${LEAF_Y}`}
            style={{ opacity: cut2 }}
          />
        </g>

        {/* the agent that got the task */}
        <g id="decomposition-tree-task" data-component="DecompositionTree">
          <rect
            id="decomposition-tree-task-box"
            data-component="DecompositionTree"
            x="130"
            y={ROOT_Y}
            width="340"
            height={BOX_H}
            rx="10"
            strokeWidth="1.5"
            className={rootChecked ? 'fill-primary/10 stroke-primary' : 'fill-background stroke-muted-foreground/60'}
          />
          <text
            id="decomposition-tree-task-label"
            data-component="DecompositionTree"
            x="300"
            y={ROOT_Y + 22}
            fontSize="15"
            textAnchor="middle"
            className="fill-foreground font-semibold"
          >
            {t('decomposition-tree.task')}
          </text>
          <text
            id="decomposition-tree-task-tag"
            data-component="DecompositionTree"
            x="300"
            y={ROOT_Y + 39}
            fontSize="11"
            textAnchor="middle"
            className="fill-muted-foreground font-mono"
          >
            {t('decomposition-tree.agent')}
          </text>
          {tick(460, ROOT_Y + 28, rootChecked, 'decomposition-tree-task-done')}
        </g>

        {BRANCHES.map((branch, index) => {
          const done = now >= branchDone(index)
          const climb = beat(now, branchDone(index), CLIMB)
          return (
            <g
              key={branch.key}
              id={`decomposition-tree-${branch.key}`}
              data-component="DecompositionTree"
              style={{ opacity: cut1 }}
            >
              <rect
                id={`decomposition-tree-${branch.key}-box`}
                data-component="DecompositionTree"
                x={branch.x}
                y={MID_Y}
                width="140"
                height={BOX_H}
                rx="9"
                strokeWidth="1.5"
                className={done ? 'fill-primary/10 stroke-primary' : 'fill-background stroke-muted-foreground/60'}
              />
              <text
                id={`decomposition-tree-${branch.key}-label`}
                data-component="DecompositionTree"
                x={branch.x + 70}
                y={MID_Y + 21}
                fontSize="14"
                textAnchor="middle"
                className="fill-foreground"
              >
                {t(`decomposition-tree.${branch.key}`)}
              </text>
              <text
                id={`decomposition-tree-${branch.key}-tag`}
                data-component="DecompositionTree"
                x={branch.x + 70}
                y={MID_Y + 38}
                fontSize="11"
                textAnchor="middle"
                className="fill-muted-foreground font-mono"
              >
                {midTag}
              </text>
              {tick(branch.x + 132, MID_Y + 28, done, `decomposition-tree-${branch.key}-done`)}
              {/* its result on its way up to the agent */}
              <circle
                id={`decomposition-tree-${branch.key}-result`}
                data-component="DecompositionTree"
                cx={branch.x + 70 + (300 - branch.x - 70) * climb}
                cy={MID_Y - (MID_Y - ROOT_Y - BOX_H) * climb}
                r="5"
                className="fill-primary"
                style={{ opacity: climb > 0 && climb < 1 ? 1 : 0 }}
              />
            </g>
          )
        })}

        {LEAVES.map((leaf, index) => {
          const progress = beat(now, WORK, leaf.work)
          const done = now >= leafDone(index)
          const climb = beat(now, leafDone(index), CLIMB)
          const px = BRANCHES[leaf.parent].x + 70
          return (
            <g
              key={leaf.key}
              id={`decomposition-tree-${leaf.key}`}
              data-component="DecompositionTree"
              style={{ opacity: cut2 }}
            >
              <rect
                id={`decomposition-tree-${leaf.key}-box`}
                data-component="DecompositionTree"
                x={leaf.x}
                y={LEAF_Y}
                width="128"
                height={BOX_H}
                rx="9"
                strokeWidth="1.5"
                className={done ? 'fill-primary/15 stroke-primary' : 'fill-background stroke-primary/60'}
              />
              {/* the work inside the leaf, at its own speed */}
              <rect
                id={`decomposition-tree-${leaf.key}-work`}
                data-component="DecompositionTree"
                x={leaf.x + 10}
                y={LEAF_Y + BOX_H - 7}
                width={(128 - 20) * progress}
                height="3"
                rx="1.5"
                className="fill-primary"
                style={{ opacity: progress > 0 && !done ? 1 : 0 }}
              />
              <text
                id={`decomposition-tree-${leaf.key}-label`}
                data-component="DecompositionTree"
                x={leaf.x + 64}
                y={LEAF_Y + 19}
                fontSize="13"
                textAnchor="middle"
                className="fill-foreground"
              >
                {t(`decomposition-tree.${leaf.key}`)}
              </text>
              <text
                id={`decomposition-tree-${leaf.key}-tag`}
                data-component="DecompositionTree"
                x={leaf.x + 64}
                y={LEAF_Y + 33}
                fontSize="11"
                textAnchor="middle"
                className="fill-muted-foreground font-mono"
              >
                {t('decomposition-tree.subagent')}
              </text>
              {tick(leaf.x + 121, LEAF_Y + 27, done, `decomposition-tree-${leaf.key}-done`)}
              <circle
                id={`decomposition-tree-${leaf.key}-result`}
                data-component="DecompositionTree"
                cx={leaf.x + 64 + (px - leaf.x - 64) * climb}
                cy={LEAF_Y - (LEAF_Y - MID_Y - BOX_H) * climb}
                r="5"
                className="fill-primary"
                style={{ opacity: climb > 0 && climb < 1 ? 1 : 0 }}
              />
            </g>
          )
        })}

        <text
          id="decomposition-tree-leaves-label"
          data-component="DecompositionTree"
          x="300"
          y="278"
          fontSize="13"
          textAnchor="middle"
          className="fill-muted-foreground"
          style={{ opacity: cut2 }}
        >
          {t('decomposition-tree.small-enough')}
        </text>
      </svg>
      <StoryToggle id="decomposition-tree" component="DecompositionTree" story={story} className="max-w-xl" />
    </figure>
  )
}
