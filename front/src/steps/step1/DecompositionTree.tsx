import { useId } from 'react'
import { useTranslation } from 'react-i18next'

/**
 * Decomposition as a tree: the task at the top, two parts under it, and two under each of those,
 * down to four pieces small enough to carry out in a single pass. Only the leaves are filled,
 * because the leaves are where the cutting stops. It sits under `agent-patterns.decomposition.2` and
 * `.3`, which say the same in words: cut until a piece is small enough, an agent can do the cutting,
 * and every level costs model calls.
 *
 * **It is Google Cloud's hierarchical task decomposition pattern** (redrawn October 2026, at the
 * owner's asking): "A top-level parent, or root, agent ... is responsible for decomposing the task
 * into several smaller, manageable sub-tasks", repeated "through multiple layers" until a worker can
 * execute a piece "directly", and "an implementation of the coordinator pattern"
 * (docs.cloud.google.com/architecture/choose-design-pattern-agentic-ai-system, last reviewed
 * 28 May 2026). Two earlier drawings were wrong and must not come back: one drew "the agent asks /
 * you decide", which is the interview pattern from `prompt`, and the next drew the plan with checks
 * and the human's edits, which was far too much on one figure.
 *
 * **It carries no context frame**, unlike the other three pattern diagrams: the tree is the task,
 * not the agents that will carry it, and who carries the leaves is the coordinator's figure in the
 * next section. **The leaves name no catalogue data** the service does not have and lean on none of
 * step 1's exercises; the example stays "Add search to the catalogue", the course's canonical
 * thin ask out of `decomposition.1`. Still, on purpose: it is a structure read at a glance, not
 * something that happens in order.
 */
const LEAVES = [
  { x: 16, key: 'logic' },
  { x: 156, key: 'endpoint' },
  { x: 316, key: 'field' },
  { x: 456, key: 'empty' },
] as const

const BRANCHES = [
  { x: 80, key: 'backend' },
  { x: 380, key: 'frontend' },
] as const

export function DecompositionTree() {
  const { t } = useTranslation('step1')
  const titleId = useId()

  return (
    <figure id="decomposition-tree" data-component="DecompositionTree" className="my-8 flex justify-center">
      <svg
        id="decomposition-tree-svg"
        data-component="DecompositionTree"
        viewBox="0 0 600 272"
        role="img"
        aria-labelledby={titleId}
        className="h-auto w-full max-w-xl"
      >
        <title id={titleId} data-component="DecompositionTree">
          {t('decomposition-tree.description')}
        </title>

        <g fill="none" strokeWidth="1.5" className="stroke-primary/40">
          <path
            id="decomposition-tree-branches"
            data-component="DecompositionTree"
            d="M 300 62 V 86 H 150 V 106 M 300 86 H 450 V 106"
          />
          <path
            id="decomposition-tree-leaves-0"
            data-component="DecompositionTree"
            d="M 150 146 V 170 H 80 V 190 M 150 170 H 220 V 190"
          />
          <path
            id="decomposition-tree-leaves-1"
            data-component="DecompositionTree"
            d="M 450 146 V 170 H 380 V 190 M 450 170 H 520 V 190"
          />
        </g>

        <rect
          id="decomposition-tree-task"
          data-component="DecompositionTree"
          x="130"
          y="18"
          width="340"
          height="44"
          rx="10"
          strokeWidth="1.5"
          className="fill-background stroke-muted-foreground/60"
        />
        <text
          id="decomposition-tree-task-label"
          data-component="DecompositionTree"
          x="300"
          y="45"
          fontSize="15"
          textAnchor="middle"
          className="fill-foreground font-semibold"
        >
          {t('decomposition-tree.task')}
        </text>

        {BRANCHES.map((branch) => (
          <g key={branch.key} id={`decomposition-tree-${branch.key}`} data-component="DecompositionTree">
            <rect
              id={`decomposition-tree-${branch.key}-box`}
              data-component="DecompositionTree"
              x={branch.x}
              y="106"
              width="140"
              height="40"
              rx="9"
              strokeWidth="1.5"
              className="fill-background stroke-muted-foreground/60"
            />
            <text
              id={`decomposition-tree-${branch.key}-label`}
              data-component="DecompositionTree"
              x={branch.x + 70}
              y="131"
              fontSize="14"
              textAnchor="middle"
              className="fill-foreground"
            >
              {t(`decomposition-tree.${branch.key}`)}
            </text>
          </g>
        ))}

        {LEAVES.map((leaf) => (
          <g key={leaf.key} id={`decomposition-tree-${leaf.key}`} data-component="DecompositionTree">
            <rect
              id={`decomposition-tree-${leaf.key}-box`}
              data-component="DecompositionTree"
              x={leaf.x}
              y="190"
              width="128"
              height="40"
              rx="9"
              strokeWidth="1.5"
              className="fill-primary/15 stroke-primary"
            />
            <text
              id={`decomposition-tree-${leaf.key}-label`}
              data-component="DecompositionTree"
              x={leaf.x + 64}
              y="215"
              fontSize="13"
              textAnchor="middle"
              className="fill-foreground"
            >
              {t(`decomposition-tree.${leaf.key}`)}
            </text>
          </g>
        ))}

        <text
          id="decomposition-tree-leaves-label"
          data-component="DecompositionTree"
          x="300"
          y="260"
          fontSize="13"
          textAnchor="middle"
          className="fill-muted-foreground"
        >
          {t('decomposition-tree.small-enough')}
        </text>
      </svg>
    </figure>
  )
}
