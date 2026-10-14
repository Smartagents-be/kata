import { FileTree, type TreeNode } from './FileTree'

/**
 * Where spec-driven work keeps its files once 1 change is bigger than 1 spec: 1 folder per intent,
 * 1 folder per spec inside it, and 1 plan beside each spec. It sits under `workflows`'s "Where the
 * specs live", an `<h3>` inside the spec-driven section, and its 1 message is the cut: 1 intent
 * becomes several specs, and each spec gets exactly 1 plan.
 *
 * **3 kinds of file and no fourth**, at the owner's asking (October 2026): `intent.md`, `spec.md`
 * and `plan.md`. That is the Anthropic AI-native SDLC playbook's set (claude.com, August 2026);
 * Spec Kit's `tasks.md` stays out, as it does in `spec-driven.1`, because the plan's numbered steps
 * are the tasks. Splitting 1 intent into several specs is the owner's own, not the playbook's,
 * which pairs 1 intent with 1 spec; cutting along vertical slices is Matt Pocock's `to-tickets` and
 * this step's `engineering` unit.
 *
 * **The same tree serves both homes**: in 1 repository `specs/` is a folder beside the code, across
 * repositories it is a repository of its own, and the root's note says both rather than drawing 2
 * trees. Each spec's note names the repository it changes, which is `where-specs-live.3` drawn.
 *
 * The example is late fees on step 2's own loans domain, split into the calculation and the notice
 * so the 2 specs land in 2 services. Both service names are invented, and the caption says the tree
 * is an example. Only the 3 kinds of file are teal; the folders step back.
 */
const TREE: TreeNode = {
  name: 'specs',
  directory: true,
  note: 'spec-tree.root.note',
  children: [
    {
      name: 'late-fees',
      directory: true,
      note: 'spec-tree.intent-folder.note',
      children: [
        { name: 'intent.md', note: 'spec-tree.intent.note', highlight: true },
        {
          name: 'fee-calculation',
          directory: true,
          note: 'spec-tree.spec-folder.note',
          children: [
            { name: 'spec.md', note: 'spec-tree.spec-loans.note', highlight: true },
            { name: 'plan.md', note: 'spec-tree.plan.note', highlight: true },
          ],
        },
        {
          name: 'fee-notice',
          directory: true,
          note: 'spec-tree.spec-folder.note',
          children: [
            { name: 'spec.md', note: 'spec-tree.spec-notice.note', highlight: true },
            { name: 'plan.md', highlight: true },
          ],
        },
      ],
    },
  ],
}

export function SpecTree() {
  return <FileTree id="spec-tree" root={TREE} dim caption="spec-tree.caption" />
}
