import type { Assistant } from '@/shared/assistant/assistant'
import { useAssistant } from '@/shared/assistant/useAssistant'
import { FileTree, type TreeNode } from './FileTree'

/**
 * Where a project's skills sit, drawn as `ProjectTree`'s twin: same component, same `dim` with a
 * subject picked out in teal, so the two sections of the `setup` unit read as one drawing seen
 * twice. There the subject was every CLAUDE.md; here it is every skill.
 *
 * **These 2 are real, at the owner's asking (October 2026)**: `diagnosing-bugs` and `code-review`
 * from Matt Pocock's public collection (github.com/mattpocock/skills, MIT), which a student can
 * install themselves. That reverses the old decision to draw invented skills. What that decision
 * guarded against still holds: this repository's own four (`adding-a-step`, `lesson-writing`,
 * `quiz-writing`, `repo-setup`) are the author's toolbox and stay out of the drawing, and so does a
 * testing skill (his `tdd` included), because `workshop.flag.coverage.help` asks the student to
 * write one. `diagnosing-bugs` is the one the frontmatter beside it quotes, so the example and the
 * drawing are about the same thing.
 *
 * 2 of them rather than a longer list, because the section closes by telling the student to be
 * sparing, and a drawing of thirty folders would argue the opposite while the prose spoke.
 *
 * Only `diagnosing-bugs` is opened up. `code-review` carries the same `SKILL.md` and would say so
 * twice, and the unit's argument is about what is in the frontmatter rather than about how many
 * folders there are. `scripts/` is drawn under it because `skills.4` names it, and it is what the
 * real skill ships (`hitl-loop.template.sh`). Its `agents/` folder is left out.
 *
 * No markers here. `ProjectTree` numbers its rows because paragraphs point back into it; nothing in
 * the Skills section points at a row, so a number would be a label with no reader.
 */
/** The skills folder itself, the same in both products; only the folder above it differs. */
const SKILLS: TreeNode = {
  name: 'skills',
  directory: true,
  note: 'tree.skills.note',
  children: [
    {
      name: 'diagnosing-bugs',
      directory: true,
      highlight: true,
      children: [
        { name: 'SKILL.md', note: 'tree.skill-md.note' },
        { name: 'scripts', directory: true, note: 'tree.scripts.note' },
      ],
    },
    { name: 'code-review', directory: true, highlight: true },
  ],
}

/**
 * Copilot's copy puts the same 2 skills under `.github/`, since a `SKILL.md` has the same shape
 * in both products. `skills.1.copilot` adds that Copilot reads `.claude/skills/` too, which the
 * drawing leaves out so it keeps one subject.
 */
function tree(folder: string, note: string): TreeNode {
  return {
    name: '.',
    directory: true,
    note: 'tree.root.note',
    children: [{ name: folder, directory: true, note, children: [SKILLS] }],
  }
}

const TREES: Record<Assistant, TreeNode> = {
  claude: tree('.claude', 'tree.dot-claude.note'),
  copilot: tree('.github', 'tree.dot-github.note'),
}

export function SkillTree() {
  const { assistant } = useAssistant()
  return <FileTree id="skill-tree" root={TREES[assistant]} dim />
}
