import { useId } from 'react'
import { useTranslation } from 'react-i18next'

/**
 * Two agents on one codebase, read left to right: `~/kata` on main, `git worktree add` making two
 * separate folders beside it with an agent each, a third agent merging the branches, and `~/kata`
 * on main again with both changes in it. Redrawn in October 2026 at the owner's asking: the old
 * drawing (two frames standing on one history box) read as vague, and it never showed the part the
 * owner cares about most, that **a separate agent merges the worktrees afterwards**.
 *
 * **It says "separate folders", never "copy".** A worktree checks the files out into a new folder
 * on your disk, but the history stays shared; the prose under it says what does not come along.
 *
 * **The folder names and branches are the ones the `<pre>` above it creates**, on `SkillTree`'s
 * rule that the drawing and the pre name the same thing: change one and the other moves with it.
 * Paths, branches, `main` and the command are literals rather than locale keys, because a path is
 * not translated.
 *
 * Teal is the two worktrees and the merging agent, which are what the section adds; the start and
 * end folders are the codebase you already had, so they stay muted.
 */
const WIDTH = 760
const HEIGHT = 275

const FOLDERS = [
  { key: 'statement', y: 38, folder: '~/kata-statement', branch: 'feat/statement', agent: 1 },
  { key: 'native', y: 182, folder: '~/kata-native', branch: 'feat/native', agent: 2 },
] as const

const MUTED_BOX = 'fill-muted-foreground/10 stroke-muted-foreground/60'
const TEAL_BOX = 'fill-primary/10 stroke-primary'

/** A folder outline: a tab on the top-left edge, then the body. */
function folderPath(x: number, y: number, w: number, h: number) {
  return `M${x + 6} ${y} h44 l8 8 h${w - 64} a6 6 0 0 1 6 6 v${h - 20} a6 6 0 0 1 -6 6 h${-(w - 12)} a6 6 0 0 1 -6 -6 v${-(h - 12)} a6 6 0 0 1 6 -6 z`
}

/** The codebase on main, before and after: a muted folder with its path, branch and a caption. */
function Codebase({ block, x, caption }: { block: string; x: number; caption: string }) {
  const w = block === 'start' ? 150 : 120
  const cx = x + w / 2

  return (
    <g id={`worktree-each-${block}`} data-component="WorktreeEach">
      <path
        id={`worktree-each-${block}-folder`}
        data-component="WorktreeEach"
        d={folderPath(x, 104, w, 82)}
        strokeWidth="1.5"
        className={MUTED_BOX}
      />
      <text
        data-component="WorktreeEach"
        x={cx}
        y="140"
        fontSize="13"
        textAnchor="middle"
        className="fill-foreground font-mono"
      >
        ~/kata
      </text>
      <text
        data-component="WorktreeEach"
        x={cx}
        y="160"
        fontSize="12"
        textAnchor="middle"
        className="fill-muted-foreground font-mono"
      >
        main
      </text>
      <text
        id={`worktree-each-${block}-caption`}
        data-component="WorktreeEach"
        x={cx}
        y="206"
        fontSize="12"
        textAnchor="middle"
        className="fill-muted-foreground"
      >
        {caption}
      </text>
    </g>
  )
}

export function WorktreeEach() {
  const { t } = useTranslation('step2')
  const titleId = useId()
  const markerId = useId()

  return (
    <figure id="worktree-each" data-component="WorktreeEach" className="my-8 flex justify-center">
      <svg
        id="worktree-each-svg"
        data-component="WorktreeEach"
        viewBox={`0 0 ${WIDTH} ${HEIGHT}`}
        role="img"
        aria-labelledby={titleId}
        className="h-auto w-full"
      >
        <title id={titleId} data-component="WorktreeEach">
          {t('worktree-each.description')}
        </title>
        <defs>
          <marker
            id={markerId}
            viewBox="0 0 10 10"
            refX="9"
            refY="5"
            markerWidth="7"
            markerHeight="7"
            orient="auto-start-reverse"
          >
            <path d="M0,0 L10,5 L0,10 z" className="fill-muted-foreground" />
          </marker>
        </defs>

        <text
          id="worktree-each-title"
          data-component="WorktreeEach"
          x="0"
          y="18"
          fontSize="16"
          className="fill-foreground font-semibold"
        >
          {t('worktree-each.title')}
        </text>

        <text
          id="worktree-each-command"
          data-component="WorktreeEach"
          x="81"
          y="88"
          fontSize="11"
          textAnchor="middle"
          className="fill-muted-foreground font-mono"
        >
          git worktree add
        </text>
        <Codebase block="start" x={4} caption={t('worktree-each.start')} />

        {/* Out to the two folders, and in again to the agent that merges them. */}
        <g
          id="worktree-each-arrows"
          data-component="WorktreeEach"
          fill="none"
          strokeWidth="1.5"
          className="stroke-muted-foreground"
        >
          <path d="M160 130 C 190 130, 190 78, 222 78" markerEnd={`url(#${markerId})`} />
          <path d="M160 160 C 190 160, 190 222, 222 222" markerEnd={`url(#${markerId})`} />
          <path d="M430 80 C 462 80, 462 130, 494 130" markerEnd={`url(#${markerId})`} />
          <path d="M430 224 C 462 224, 462 160, 494 160" markerEnd={`url(#${markerId})`} />
          <path d="M608 145 h22" markerEnd={`url(#${markerId})`} />
        </g>

        {FOLDERS.map((folder) => (
          <g
            key={folder.key}
            id={`worktree-each-${folder.key}`}
            data-component="WorktreeEach"
          >
            <path
              id={`worktree-each-${folder.key}-folder`}
              data-component="WorktreeEach"
              d={folderPath(226, folder.y, 202, 82)}
              strokeWidth="1.5"
              className={TEAL_BOX}
            />
            <text
              data-component="WorktreeEach"
              x="242"
              y={folder.y + 30}
              fontSize="13"
              className="fill-foreground font-mono"
            >
              {folder.folder}
            </text>
            <text
              data-component="WorktreeEach"
              x="242"
              y={folder.y + 48}
              fontSize="12"
              className="fill-muted-foreground font-mono"
            >
              {folder.branch}
            </text>
            <rect
              id={`worktree-each-${folder.key}-agent`}
              data-component="WorktreeEach"
              x="242"
              y={folder.y + 56}
              width="82"
              height="20"
              rx="4"
              className="fill-background stroke-muted-foreground/60"
            />
            <text
              data-component="WorktreeEach"
              x="283"
              y={folder.y + 70}
              fontSize="11.5"
              textAnchor="middle"
              className="fill-muted-foreground"
            >
              {t('worktree-each.agent', { n: folder.agent })}
            </text>
          </g>
        ))}

        <text
          id="worktree-each-apart"
          data-component="WorktreeEach"
          x="330"
          y="160"
          fontSize="12"
          textAnchor="middle"
          className="fill-muted-foreground"
        >
          {t('worktree-each.apart')}
        </text>

        <g id="worktree-each-merge" data-component="WorktreeEach">
          <rect
            data-component="WorktreeEach"
            x="498"
            y="118"
            width="110"
            height="54"
            rx="6"
            strokeWidth="1.5"
            className={TEAL_BOX}
          />
          <text
            data-component="WorktreeEach"
            x="553"
            y="141"
            fontSize="13"
            textAnchor="middle"
            className="fill-foreground"
          >
            {t('worktree-each.agent', { n: 3 })}
          </text>
          <text
            data-component="WorktreeEach"
            x="553"
            y="159"
            fontSize="12"
            textAnchor="middle"
            className="fill-muted-foreground"
          >
            {t('worktree-each.merge')}
          </text>
        </g>

        <Codebase block="end" x={634} caption={t('worktree-each.end')} />
      </svg>
    </figure>
  )
}
