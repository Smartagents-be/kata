import { FileTree, type TreeNode } from './FileTree'

/**
 * The files an agent reads before you type anything, drawn as a tree. It sits inside the prose of
 * the `setup` unit rather than under it, which is what the `data-figure` slot in StepContent is
 * for.
 *
 * CLAUDE.md and the two skills are real. `settings.json`, `hooks/` and `references/` are what a
 * project adds when it needs them, and the unit text says so rather than letting the drawing
 * claim more than the repo has.
 */
const TREE: TreeNode = {
  name: '.',
  directory: true,
  note: 'tree.root.note',
  children: [
    {
      name: 'CLAUDE.md',
      note: 'tree.claude-md.note',
    },
    {
      name: '.claude',
      directory: true,
      note: 'tree.dot-claude.note',
      children: [
        {
          name: 'settings.json',
          note: 'tree.settings.note',
        },
        {
          name: 'hooks',
          directory: true,
          note: 'tree.hooks.note',
          children: [{ name: 'format-on-write.sh' }],
        },
        {
          name: 'skills',
          directory: true,
          note: 'tree.skills.note',
          children: [
            {
              name: 'lesson-writing',
              directory: true,
              children: [
                {
                  name: 'SKILL.md',
                  note: 'tree.skill-md.note',
                },
                {
                  name: 'references',
                  directory: true,
                  note: 'tree.references.note',
                },
              ],
            },
            {
              name: 'quiz-writing',
              directory: true,
              children: [{ name: 'SKILL.md' }],
            },
          ],
        },
      ],
    },
  ],
}

export function ProjectTree() {
  return <FileTree id="project-tree" root={TREE} />
}
