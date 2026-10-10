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
 * `filter-test-output.sh` is the script the second `<pre>` under this drawing prints, and the first
 * one declares. Same rule as the Skills section: the tree and the example name the same thing.
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
          children: [{ name: 'filter-test-output.sh', highlight: true }],
        },
      ],
    },
  ],
}

/**
 * Copilot keeps both halves in one folder: the JSON that declares the hook and the script it names
 * both sit in `.github/hooks/`, so the folder and both files are teal and `.github/` stays muted.
 * `filter-test-output.json` is the file the Copilot `<pre>` shows, and the script is its own:
 * Copilot filters the output after the tool ran rather than rewriting the command.
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
            { name: 'filter-test-output.json', note: 'tree.hook-json.note', highlight: true },
            { name: 'filter-test-output.sh', highlight: true },
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
