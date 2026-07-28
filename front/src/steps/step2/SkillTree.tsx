import { FileTree, type TreeNode } from './FileTree'

/**
 * Where a project's skills sit, drawn as `ProjectTree`'s twin: same component, same `dim` with a
 * subject picked out in teal, so the two sections of the `setup` unit read as one drawing seen
 * twice. There the subject was every CLAUDE.md; here it is every skill.
 *
 * **These three are invented, and that is the decision.** This repository's own four are
 * `adding-a-step`, `lesson-writing`, `quiz-writing` and `repo-setup`, and every one of them is for
 * the person writing the course rather than the person taking it. Drawing them taught a student
 * what the author's toolbox looks like. So the tree shows skills somebody doing the exercises would
 * plausibly write, and `add-endpoint` is the one the frontmatter beside it spells out, so the
 * example and the drawing are about the same thing. If a real skill is ever wanted here, it has to
 * be one a student would own, and it has to be the one quoted in the `<pre>`.
 *
 * Three of them rather than a longer list, because the section closes by telling the student to be
 * sparing, and a drawing of thirty folders would argue the opposite while the prose spoke.
 *
 * Only `add-endpoint` is opened up. The other two carry the same `SKILL.md` and would say so twice
 * more, and the unit's argument is about what is in the frontmatter rather than about how many
 * folders there are. `references/` is drawn under it because the prose names it.
 *
 * No markers here. `ProjectTree` numbers its rows because paragraphs point back into it; nothing in
 * the Skills section points at a row, so a number would be a label with no reader.
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
          name: 'skills',
          directory: true,
          note: 'tree.skills.note',
          children: [
            {
              name: 'add-endpoint',
              directory: true,
              highlight: true,
              children: [
                { name: 'SKILL.md', note: 'tree.skill-md.note' },
                { name: 'references', directory: true, note: 'tree.references.note' },
              ],
            },
            { name: 'probe-the-api', directory: true, highlight: true },
            { name: 'commit-message', directory: true, highlight: true },
          ],
        },
      ],
    },
  ],
}

export function SkillTree() {
  return <FileTree id="skill-tree" root={TREE} dim />
}
