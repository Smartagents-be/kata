import { FileTree, type TreeNode } from './FileTree'

/**
 * Where a project's CLAUDE.md files sit, drawn as a tree. It sits inside the prose of the `setup`
 * unit's CLAUDE.md section rather than under the lead, which is what the `data-figure` slot in
 * StepContent is for.
 *
 * The three CLAUDE.md files are real. The drawing was deliberately nothing but them: `.claude/`
 * with its settings, hooks and skills was in here and came out, because the figure now serves the
 * section it sits in and a reader counting eleven entries is not reading the three that matter. The
 * skills went back when that section got a drawing of its own.
 *
 * `front/` and `kata/step2/java/` carry one child each and nothing else, for the same reason. They
 * are here to show that a CLAUDE.md nests, which is what the paragraph above them argues, so
 * drawing what is actually in those folders would bury the one thing they are drawn for. Two of
 * them rather than one, because a single nested file reads as a special case: the pair says a
 * project has as many as it has parts, and they are deliberately unalike, one a whole frontend and
 * one a single Maven module.
 *
 * The four files are `highlight`ed and the tree is `dim`, so every folder is muted ink. Teal is the design system's subject colour, and it is the only colour in here.
 *
 * **The fourth entry is the comparison, and it is invented** (FEEDBACK 10). `claude-md.3` sets
 * `.claude/rules/` against the nested files: those follow the folders, a rule with `paths` follows
 * a file pattern that cuts across them. This repository has no rules folder, and its own `.claude`
 * holds the author's skills, so the file is made up on `SkillTree`'s precedent and the drawing and
 * the paragraph name the same one. It is one path node rather than `.claude/` opened up, because
 * opening that folder is what the trim above took out. Its `paths` line is drawn because without it
 * the file reads as one more CLAUDE.md under another name, which is exactly what it is not. Do not
 * add anything else from `kata/step2/java` to make the example real; the reason is in this step's
 * CLAUDE.md, beside `setup`'s board.
 */
const TREE: TreeNode = {
  name: '.',
  directory: true,
  note: 'tree.root.note',
  children: [
    {
      name: 'CLAUDE.md',
      note: 'tree.claude-md.note',
      highlight: true,
      marker: 1,
    },
    {
      name: 'front',
      directory: true,
      note: 'tree.subfolder.note',
      children: [
        {
          name: 'CLAUDE.md',
          note: 'tree.nested-claude-md.note',
          highlight: true,
          marker: 2,
        },
      ],
    },
    {
      name: 'kata/step2/java',
      directory: true,
      note: 'tree.module.note',
      children: [
        {
          name: 'CLAUDE.md',
          note: 'tree.module-claude-md.note',
          highlight: true,
          marker: 3,
        },
      ],
    },
    {
      name: '.claude/rules',
      directory: true,
      note: 'tree.rules.note',
      children: [
        {
          name: 'api-design.md',
          note: 'tree.rule.note',
          detail: 'paths: ["**/*Controller.java"]',
          highlight: true,
          marker: 4,
        },
      ],
    },
  ],
}

export function ProjectTree() {
  return <FileTree id="project-tree" root={TREE} dim />
}
