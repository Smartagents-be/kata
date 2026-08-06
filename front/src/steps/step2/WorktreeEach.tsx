import { useId } from 'react'
import { useTranslation } from 'react-i18next'

/**
 * Two checkouts of one repository, each with its own agent working its own files, both standing
 * on the same history. No line runs from one folder to the other, and the note under the history
 * box reads that absence out loud; do not wire the frames together.
 *
 * It sits after `worktree-each.2`, the isolation paragraph, and **before the cost paragraph**, so
 * the two-bills argument keeps the last word in prose rather than under a drawing that does not
 * make it.
 *
 * **The folder names and branches are the ones the `<pre>` above it creates**, on `SkillTree`'s
 * rule that the tree and the pre name the same thing: change one and the other moves with it. They
 * are literals rather than locale keys for the same reason the pre has no `data-i18n`, a path is
 * not translated.
 *
 * **Teal is the frame rather than the boxes**, the one figure in the step where that is true: the
 * folder line is what this section adds. The agents stay muted because whose attention they get is
 * `AgentsAtOnce`'s argument in `parallel`, and an agent drawn teal here would say somebody is
 * watching it, which is not this section's claim. The boxes borrow `flow.node.agent` and
 * `flow.node.code` from `FlowDiagram`, so a rewording there moves this drawing too.
 */
const FRAME_W = 250
const FRAME_H = 118
const FRAME_Y = 20
const PAD = 16
/** So a connector reads as arriving at the history box rather than touching either shape. */
const STANDOFF = 6

const HISTORY = { x: 195, y: 196, w: 250, h: 34 }

const FOLDERS = [
  { key: 'statement', x: 30, folder: '../kata-statement', branch: 'feat/statement' },
  { key: 'native', x: 360, folder: '../kata-native', branch: 'feat/native' },
] as const

/** One worktree: the teal folder line, its path and branch, and the agent on its own code. */
function Worktree({
  block,
  x,
  folder,
  branch,
}: {
  block: string
  x: number
  folder: string
  branch: string
}) {
  const { t } = useTranslation('step2')
  const boxY = FRAME_Y + 62

  return (
    <g id={`worktree-each-${block}`} data-component="WorktreeEach">
      <rect
        id={`worktree-each-${block}-frame`}
        data-component="WorktreeEach"
        x={x}
        y={FRAME_Y}
        width={FRAME_W}
        height={FRAME_H}
        rx="8"
        strokeWidth="1.5"
        className="fill-primary/5 stroke-primary/50"
      />
      <text
        id={`worktree-each-${block}-folder`}
        data-component="WorktreeEach"
        x={x + PAD}
        y={FRAME_Y + 26}
        fontSize="12.5"
        className="fill-foreground font-mono"
      >
        {folder}
      </text>
      <text
        id={`worktree-each-${block}-branch`}
        data-component="WorktreeEach"
        x={x + PAD}
        y={FRAME_Y + 44}
        fontSize="11"
        className="fill-muted-foreground font-mono"
      >
        {branch}
      </text>

      <rect
        id={`worktree-each-${block}-agent`}
        data-component="WorktreeEach"
        x={x + PAD}
        y={boxY}
        width={70}
        height={30}
        rx="6"
        strokeWidth="1.5"
        className="fill-background stroke-muted-foreground/60"
      />
      <text
        data-component="WorktreeEach"
        x={x + PAD + 35}
        y={boxY + 19}
        fontSize="12"
        textAnchor="middle"
        className="fill-foreground"
      >
        {t('flow.node.agent')}
      </text>

      <line
        id={`worktree-each-${block}-wire`}
        data-component="WorktreeEach"
        x1={x + PAD + 70 + STANDOFF}
        y1={boxY + 15}
        x2={x + PAD + 70 + 44 - STANDOFF}
        y2={boxY + 15}
        strokeWidth="1.5"
        className="stroke-muted-foreground/60"
      />

      <rect
        id={`worktree-each-${block}-code`}
        data-component="WorktreeEach"
        x={x + PAD + 70 + 44}
        y={boxY}
        width={70}
        height={30}
        rx="6"
        strokeWidth="1.5"
        className="fill-background stroke-muted-foreground/60"
      />
      <text
        data-component="WorktreeEach"
        x={x + PAD + 70 + 44 + 35}
        y={boxY + 19}
        fontSize="12"
        textAnchor="middle"
        className="fill-foreground"
      >
        {t('flow.node.code')}
      </text>

      {/* Down onto the shared history, which is the half of the definition the frames cannot say. */}
      <line
        id={`worktree-each-${block}-history-wire`}
        data-component="WorktreeEach"
        x1={x + FRAME_W / 2}
        y1={FRAME_Y + FRAME_H + STANDOFF}
        x2={block === 'statement' ? HISTORY.x + 50 : HISTORY.x + HISTORY.w - 50}
        y2={HISTORY.y - STANDOFF}
        strokeWidth="1.5"
        className="stroke-muted-foreground/60"
      />
    </g>
  )
}

export function WorktreeEach() {
  const { t } = useTranslation('step2')
  const titleId = useId()

  return (
    <figure id="worktree-each" data-component="WorktreeEach" className="my-8 flex justify-center">
      <svg
        id="worktree-each-svg"
        data-component="WorktreeEach"
        viewBox="0 0 640 262"
        role="img"
        aria-labelledby={titleId}
        className="h-auto w-full max-w-2xl"
      >
        <title id={titleId} data-component="WorktreeEach">
          {t('worktree-each.description')}
        </title>

        {FOLDERS.map((folder) => (
          <Worktree
            key={folder.key}
            block={folder.key}
            x={folder.x}
            folder={folder.folder}
            branch={folder.branch}
          />
        ))}

        <rect
          id="worktree-each-history"
          data-component="WorktreeEach"
          x={HISTORY.x}
          y={HISTORY.y}
          width={HISTORY.w}
          height={HISTORY.h}
          rx="6"
          strokeWidth="1.5"
          className="fill-none stroke-muted-foreground/60"
        />
        <text
          id="worktree-each-history-label"
          data-component="WorktreeEach"
          x={HISTORY.x + HISTORY.w / 2}
          y={HISTORY.y + HISTORY.h / 2 + 4}
          fontSize="12"
          textAnchor="middle"
          className="fill-muted-foreground"
        >
          {t('worktree-each.history')}
        </text>

        <text
          id="worktree-each-note"
          data-component="WorktreeEach"
          x="320"
          y="254"
          fontSize="13"
          textAnchor="middle"
          className="fill-muted-foreground"
        >
          {t('worktree-each.note')}
        </text>
      </svg>
    </figure>
  )
}
