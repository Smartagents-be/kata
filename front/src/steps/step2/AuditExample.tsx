import { useState } from 'react'
import { Switch } from '@/shared/components/ui/switch'
import { useStepText } from '@/shared/i18n/useStepText'

/**
 * Four rows of a security audit, and the same four rows as the markdown the agent actually wrote.
 *
 * The subject is security rather than this course, because the unit needs the format to be legible
 * on its own: a reader who has never seen an audit can tell a missing `aud` check from a header that
 * is only half there, and cannot tell whether a curriculum unit is thin. The repository's own
 * `audit.md` is named in the prose instead, which is where the evidence belongs.
 *
 * Every status is used once. That is what pays for the four rows: the legend is taught by having a
 * solid row, a thin one, a missing one and a wrong one side by side, so the figure needs no legend
 * line of its own. The solid row deliberately carries no remark, which is the claim the paragraph
 * under the figure makes about rows you can stop carrying around.
 */
const ROWS = [
  { id: 'headers', where: 'web/SecurityConfig', status: 'thin', remark: true },
  { id: 'audience', where: 'web/JwtDecoderConfig', status: 'missing', remark: true },
  { id: 'errors', where: 'web/ErrorHandler', status: 'wrong', remark: true },
  { id: 'secret', where: 'application.yml', status: 'solid', remark: false },
] as const

/** The glyphs `audit.md` itself uses, so the example and the real file read the same way. */
const GLYPHS: Record<string, string> = {
  solid: '●',
  thin: '◐',
  missing: '○',
  wrong: '⚠',
}

/**
 * Solid is the design system's passed colour. Everything short of it is amber or red, and the two
 * reds are the same red on purpose: a check that is absent and a check that answers wrongly are the
 * same amount of work to the person reading the table.
 */
const TONES: Record<string, string> = {
  solid: 'text-success-foreground',
  thin: 'text-amber-500',
  missing: 'text-destructive',
  wrong: 'text-destructive',
}

/** Left to right, and the keys the head and the body both read so a column cannot drift. */
const COLUMNS = ['topic', 'where', 'status', 'remark'] as const

/**
 * Lays the cells out the way somebody would who was typing the table by hand: every column padded
 * to its widest cell, and the status column carrying markdown's centring colons. Built from the same
 * strings the table renders, so the switch cannot show two different audits.
 */
function toMarkdown(head: string[], body: string[][]): string {
  const widths = head.map((_, column) =>
    Math.max(head[column].length, ...body.map((row) => row[column].length)),
  )
  const line = (cells: string[]) =>
    `| ${cells.map((cell, column) => cell.padEnd(widths[column])).join(' | ')} |`
  const rule = `|${widths
    .map((width, column) =>
      column === 2 ? `:${'-'.repeat(width)}:` : `-${'-'.repeat(width)}-`,
    )
    .join('|')}|`

  return [line(head), rule, ...body.map(line)].join('\n')
}

/**
 * The `audit-driven` section's figure. It opens as the table, because that is the thing the prose
 * above it asks the agent for, and the switch in the corner shows the file underneath. That is the
 * whole argument for having a switch here: an audit looks like a report and is a markdown file in
 * your repository, so it diffs and reviews the way the code does.
 *
 * One id with the view on `data-state`, rather than two blocks, so anything pointing at the figure
 * finds it before knowing which way it is set.
 */
export function AuditExample() {
  const { text } = useStepText('step2')
  const [raw, setRaw] = useState(false)

  const head = COLUMNS.map((column) => text(`audit.head.${column}`))
  const cell = {
    topic: (row: (typeof ROWS)[number]) => text(`audit.row.${row.id}.topic`),
    where: (row: (typeof ROWS)[number]) => row.where,
    status: (row: (typeof ROWS)[number]) =>
      `${GLYPHS[row.status]} ${text(`audit.status.${row.status}`)}`,
    remark: (row: (typeof ROWS)[number]) =>
      row.remark ? text(`audit.row.${row.id}.remark`) : '',
  }

  return (
    <figure
      id="audit-example"
      data-component="AuditExample"
      data-state={raw ? 'markdown' : 'table'}
      // not-prose: Typography styles tables and <pre> its own way, and this figure is one border
      // around two renderings of the same thing rather than two elements in a column of prose.
      className="not-prose my-8 rounded-xl border"
    >
      <div
        id="audit-example-bar"
        data-component="AuditExample"
        className="flex items-center justify-between gap-4 border-b px-4 py-3"
      >
        {/* The file name, not a title. What the switch reveals is this file, so naming it here
            means the markdown view needs no heading of its own. */}
        <span id="audit-example-file" data-component="AuditExample" className="font-mono text-sm">
          audit.md
        </span>

        <div id="audit-example-toggle" data-component="AuditExample" className="flex items-center gap-2">
          <label
            id="audit-example-toggle-label"
            data-component="AuditExample"
            htmlFor="audit-example-toggle-switch"
            className="eyebrow text-muted-foreground"
          >
            Markdown
          </label>
          <Switch
            id="audit-example-toggle-switch"
            data-component="AuditExample"
            checked={raw}
            onCheckedChange={setRaw}
            aria-label={text('audit.markdown.aria')}
          />
        </div>
      </div>

      {/* The scroll is for the markdown, which is padded to align and therefore cannot wrap. The
          table is sized to fit the prose column instead: a reader should be able to take four rows
          in at a glance, and a table you have to drag sideways is the essay the prose warns about. */}
      <div id="audit-example-scroll" data-component="AuditExample" className="overflow-x-auto">
        {raw ? (
          <pre
            id="audit-example-markdown"
            data-component="AuditExample"
            className="px-4 py-3 font-mono text-xs leading-relaxed"
          >
            {toMarkdown(
              head,
              ROWS.map((row) => COLUMNS.map((column) => cell[column](row))),
            )}
          </pre>
        ) : (
          <table
            id="audit-example-table"
            data-component="AuditExample"
            className="w-full border-collapse text-sm"
          >
            <thead id="audit-example-head" data-component="AuditExample">
              <tr id="audit-example-head-row" data-component="AuditExample" className="border-b">
                {COLUMNS.map((column, index) => (
                  <th
                    key={column}
                    id={`audit-example-head-${index}`}
                    data-component="AuditExample"
                    scope="col"
                    className={`text-muted-foreground px-4 py-3 font-medium whitespace-nowrap ${
                      column === 'status' ? 'text-center' : 'text-left'
                    }`}
                  >
                    {head[index]}
                  </th>
                ))}
              </tr>
            </thead>

            <tbody id="audit-example-body" data-component="AuditExample">
              {ROWS.map((row, index) => (
                <tr
                  key={row.id}
                  id={`audit-example-row-${index}`}
                  data-component="AuditExample"
                  data-state={row.status}
                  className="border-b align-top last:border-b-0"
                >
                  <th
                    id={`audit-example-row-${index}-topic`}
                    data-component="AuditExample"
                    scope="row"
                    className="px-4 py-3 text-left font-medium"
                  >
                    {cell.topic(row)}
                  </th>
                  <td
                    id={`audit-example-row-${index}-where`}
                    data-component="AuditExample"
                    className="px-4 py-3 font-mono text-xs whitespace-nowrap"
                  >
                    {row.where}
                  </td>
                  <td
                    id={`audit-example-row-${index}-status`}
                    data-component="AuditExample"
                    className={`px-4 py-3 text-center whitespace-nowrap ${TONES[row.status]}`}
                  >
                    <span
                      id={`audit-example-row-${index}-glyph`}
                      data-component="AuditExample"
                      aria-hidden="true"
                    >
                      {GLYPHS[row.status]}
                    </span>{' '}
                    <span
                      id={`audit-example-row-${index}-word`}
                      data-component="AuditExample"
                      className="font-mono text-xs"
                    >
                      {text(`audit.status.${row.status}`)}
                    </span>
                  </td>
                  <td
                    id={`audit-example-row-${index}-remark`}
                    data-component="AuditExample"
                    className="text-muted-foreground px-4 py-3"
                  >
                    {cell.remark(row)}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>

      <figcaption
        id="audit-example-caption"
        data-component="AuditExample"
        className="text-muted-foreground border-t px-4 py-3 font-mono text-xs"
      >
        {text('audit.caption')}
      </figcaption>
    </figure>
  )
}
