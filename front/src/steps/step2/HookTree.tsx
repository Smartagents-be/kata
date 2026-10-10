import type { Assistant } from '@/shared/assistant/assistant'
import { useAssistant } from '@/shared/assistant/useAssistant'
import { FileTree, type TreeNode } from './FileTree'

/**
 * Where a hook lives, drawn as the third of the `setup` unit's trees: same `FileTree`, same `dim`
 * with the subject in teal, so all three sections read as one drawing seen three times.
 *
 * A hook is two things in two files, which is the only reason this drawing exists: the declaration
 * in `settings.json` and the script it names. Both are teal, and so is the folder between them,
 * because a reader who takes away only one half has the wrong picture. `.claude/` above them stays
 * muted, the way `skills/` does in `SkillTree`.
 *
 * `format-on-write.sh` is invented, like the skills beside it, and it is the one the `<pre>` under
 * this drawing declares. Same rule as the Skills section: the tree and the example name the same
 * thing.
 *
 * No markers, for the same reason the skills tree has none: no paragraph points back at a row.
 */
const CLAUDE_TREE: TreeNode = {
  name: '.',
  directory: true,
  note: 'tree.root.note',
  children: [
    {
      name: '.claude',
      directory: true,
      note: 'tree.dot-claude.note',
      children: [
        {
          name: 'settings.json',
          note: 'tree.settings.note',
          highlight: true,
        },
        {
          name: 'hooks',
          directory: true,
          note: 'tree.hooks.note',
          highlight: true,
          children: [{ name: 'format-on-write.sh', highlight: true }],
        },
      ],
    },
  ],
}

/**
 * Copilot keeps both halves in one folder: the JSON that declares the hook and the script it names
 * both sit in `.github/hooks/`, so the folder and both files are teal and `.github/` stays muted.
 * `format.json` is the file the Copilot `<pre>` shows, and the script is the same invented one.
 */
const COPILOT_TREE: TreeNode = {
  name: '.',
  directory: true,
  note: 'tree.root.note',
  children: [
    {
      name: '.github',
      directory: true,
      note: 'tree.dot-github.note',
      children: [
        {
          name: 'hooks',
          directory: true,
          note: 'tree.github-hooks.note',
          highlight: true,
          children: [
            { name: 'format.json', note: 'tree.hook-json.note', highlight: true },
            { name: 'format-on-write.sh', highlight: true },
          ],
        },
      ],
    },
  ],
}

const TREES: Record<Assistant, TreeNode> = { claude: CLAUDE_TREE, copilot: COPILOT_TREE }

export function HookTree() {
  const { assistant } = useAssistant()
  return <FileTree id="hook-tree" root={TREES[assistant]} dim />
}
