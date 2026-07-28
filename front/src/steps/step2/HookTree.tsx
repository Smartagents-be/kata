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
const TREE: TreeNode = {
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

export function HookTree() {
  return <FileTree id="hook-tree" root={TREE} dim />
}
