import { FileCode, FileJson, FileText, Folder, type LucideIcon } from 'lucide-react'
import { useTranslation } from 'react-i18next'

/**
 * A folder layout drawn as a tree. Step 2 draws two of them, `ProjectTree` and `DomainTree`, so the
 * rendering lives here and each figure supplies nothing but its own data and its own block id.
 *
 * The paths are the same in every language; the notes beside them are message keys into this step's
 * namespace.
 */
export interface TreeNode {
  /** Shown as typed. Directories get a trailing slash from the renderer, not from this. */
  name: string
  directory?: boolean
  /** Message key for the few words shown next to the name, e.g. 'tree.hooks.note'. */
  note?: string
  children?: TreeNode[]
}

function iconFor(node: TreeNode): LucideIcon {
  if (node.directory) {
    return Folder
  }
  if (node.name.endsWith('.json')) {
    return FileJson
  }
  if (node.name.endsWith('.sh') || node.name.endsWith('.java')) {
    return FileCode
  }
  return FileText
}

/** `id` is the BEM block every element inside the drawing is named after, e.g. `project-tree`. */
export function FileTree({ id, root }: { id: string; root: TreeNode }) {
  return (
    <div
      id={id}
      data-component="FileTree"
      // not-prose: Typography would otherwise style these lists as bullets and indent them again.
      className="not-prose bg-muted/40 my-6 rounded-md border px-4 py-3"
    >
      <ul id={`${id}-root`} data-component="FileTree" className="flex flex-col gap-1.5">
        <TreeItem block={id} node={root} path="0" />
      </ul>
    </div>
  )
}

/** One entry and, if it has any, the list of entries under it. Recursive: the tree is arbitrary depth. */
function TreeItem({ block, node, path }: { block: string; node: TreeNode; path: string }) {
  const { t } = useTranslation('step2')
  const Icon = iconFor(node)

  return (
    <li id={`${block}-item-${path}`} data-component="TreeItem" className="flex flex-col gap-1.5">
      <div
        id={`${block}-item-${path}-row`}
        data-component="TreeItem"
        className="flex flex-wrap items-center gap-x-2 gap-y-0.5"
      >
        <Icon
          id={`${block}-item-${path}-icon`}
          data-component="TreeItem"
          aria-hidden="true"
          className={
            node.directory
              ? 'text-primary/70 size-4 shrink-0'
              : 'text-muted-foreground size-4 shrink-0'
          }
        />
        <span
          id={`${block}-item-${path}-name`}
          data-component="TreeItem"
          className="font-mono text-sm"
        >
          {node.directory && node.name !== '.' ? `${node.name}/` : node.name}
        </span>
        {node.note && (
          <span
            id={`${block}-item-${path}-note`}
            data-component="TreeItem"
            className="text-muted-foreground text-xs"
          >
            {t(node.note)}
          </span>
        )}
      </div>

      {node.children && (
        <ul
          id={`${block}-item-${path}-children`}
          data-component="TreeItem"
          className="border-border ml-2 flex flex-col gap-1.5 border-l pl-4"
        >
          {node.children.map((child, index) => (
            <TreeItem key={child.name} block={block} node={child} path={`${path}-${index}`} />
          ))}
        </ul>
      )}
    </li>
  )
}
