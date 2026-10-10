import type { Assistant } from '@/shared/assistant/assistant'
import { useAssistant } from '@/shared/assistant/useAssistant'
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
 * `front/` and `exercises/step2/java/` carry one child each and nothing else, for the same reason. They
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
 * holds the author's skills, so the files are made up on `SkillTree`'s precedent and the drawing and
 * the paragraph name the same ones. It is one path node rather than `.claude/` opened up, because
 * opening that folder is what the trim above took out. **The rules sit in `frontend/` and `backend/`
 * subfolders** at the owner's asking (October 2026), so the marker is on the rules folder and not on
 * a file, and each subfolder's note says it is order only: both products read the folder
 * recursively and the folder name scopes nothing. Each file's `paths` line is drawn because without
 * it the file reads as one more CLAUDE.md under another name, which is exactly what it is not, and
 * both patterns cut across folders (`**` in front) so neither is a nested file in disguise. Do not
 * add anything else from `exercises/step2/java` to make the example real; the reason is in this step's
 * CLAUDE.md, beside `setup`'s board.
 */
const CLAUDE_TREE: TreeNode = {
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
      name: 'exercises/step2/java',
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
      marker: 4,
      children: [
        {
          name: 'frontend',
          directory: true,
          note: 'tree.rules-subfolder.note',
          children: [
            {
              name: 'components.md',
              note: 'tree.rule.note',
              detail: 'paths: ["**/components/**/*.tsx"]',
              highlight: true,
            },
          ],
        },
        {
          name: 'backend',
          directory: true,
          note: 'tree.rules-subfolder.note',
          children: [
            {
              name: 'api-design.md',
              note: 'tree.rule.note',
              detail: 'paths: ["**/*Controller.java"]',
              highlight: true,
            },
          ],
        },
      ],
    },
  ],
}

/**
 * The same four entries under Copilot's names (October 2026, when `setup` stopped being Claude Code
 * only): `AGENTS.md` where the three briefings were, and `.github/instructions/` with an `applyTo`
 * line where the rules were, in the same 2 subfolders. The numbers stay on the same rows, because `claude-md.1` and `.3` point
 * at them in both variants. Unlike the Claude tree, these files are not this repository's: it carries
 * no `AGENTS.md`. The nested note says IntelliJ reads them only with the setting ticked, which is what
 * `claude-md.1.copilot` says in words.
 */
const COPILOT_TREE: TreeNode = {
  name: '.',
  directory: true,
  note: 'tree.root.note',
  children: [
    { name: 'AGENTS.md', note: 'tree.claude-md.note', highlight: true, marker: 1 },
    {
      name: 'front',
      directory: true,
      note: 'tree.subfolder.note',
      children: [
        { name: 'AGENTS.md', note: 'tree.nested-agents-md.note', highlight: true, marker: 2 },
      ],
    },
    {
      name: 'exercises/step2/java',
      directory: true,
      note: 'tree.module.note',
      children: [
        { name: 'AGENTS.md', note: 'tree.module-claude-md.note', highlight: true, marker: 3 },
      ],
    },
    {
      name: '.github/instructions',
      directory: true,
      note: 'tree.rules.note',
      marker: 4,
      children: [
        {
          name: 'frontend',
          directory: true,
          note: 'tree.rules-subfolder.note',
          children: [
            {
              name: 'components.instructions.md',
              note: 'tree.rule.note',
              detail: 'applyTo: "**/components/**/*.tsx"',
              highlight: true,
            },
          ],
        },
        {
          name: 'backend',
          directory: true,
          note: 'tree.rules-subfolder.note',
          children: [
            {
              name: 'api-design.instructions.md',
              note: 'tree.rule.note',
              detail: 'applyTo: "**/*Controller.java"',
              highlight: true,
            },
          ],
        },
      ],
    },
  ],
}

const TREES: Record<Assistant, TreeNode> = { claude: CLAUDE_TREE, copilot: COPILOT_TREE }

export function ProjectTree() {
  const { assistant } = useAssistant()
  return <FileTree id="project-tree" root={TREES[assistant]} dim />
}
