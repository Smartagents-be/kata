/**
 * The inline icons that appear inside lesson prose (a coin marking a cost tip, a puzzle marking an
 * AI design pattern). Prose is authored HTML injected with `dangerouslySetInnerHTML`, so an icon
 * cannot be a React component sitting in the paragraph. Instead the author drops the short marker
 *
 * ```html
 * <svg data-icon="coin"></svg>
 * ```
 *
 * and `prepareUnit` swaps it for the full SVG built here. That keeps the path data in one place
 * rather than copied into every unit and both languages, and the marker still matches the
 * `.prose svg[data-icon='…']` rules in `index.css` that size and colour it.
 */

/** The inner markup of each prose icon: everything between the shared `<svg>` wrapper's tags. */
const ICON_PATHS: Record<string, string> = {
  gem:
    '<path d="M6 3h12l4 6-10 13L2 9Z" />' +
    '<path d="M11 3 8 9l4 13 4-13-3-6" />' +
    '<path d="M2 9h20" />',
  coin:
    '<circle cx="8" cy="8" r="6" />' +
    '<path d="M18.09 10.37A6 6 0 1 1 10.34 18" />' +
    '<path d="M7 6h1v4" />' +
    '<path d="m16.71 13.88.7.71-2.82 2.82" />',
  pattern:
    '<path d="M15.39 4.39a1 1 0 0 0 1.68-.474 2.5 2.5 0 1 1 3.014 3.015 1 1 0 0 0-.474 1.68l1.683 1.682a2.414 2.414 0 0 1 0 3.414L19.61 15.39a1 1 0 0 1-1.68-.474 2.5 2.5 0 1 0-3.014 3.015 1 1 0 0 1 .474 1.68l-1.683 1.682a2.414 2.414 0 0 1-3.414 0L8.61 19.61a1 1 0 0 0-1.68.474 2.5 2.5 0 1 1-3.014-3.015 1 1 0 0 0 .474-1.68l-1.683-1.682a2.414 2.414 0 0 1 0-3.414L4.39 8.61a1 1 0 0 1 1.68.474 2.5 2.5 0 1 0 3.014-3.015 1 1 0 0 1-.474-1.68l1.683-1.682a2.414 2.414 0 0 1 3.414 0z" />',
}

/** True when `name` is a prose icon this registry can render. */
export function isIconName(name: string): boolean {
  return name in ICON_PATHS
}

/**
 * The full inline SVG for a prose icon, or `null` when the name is unknown. The wrapper attributes
 * are the same for every icon, so they live here once; only the paths differ.
 */
export function iconSvg(name: string): string | null {
  const paths = ICON_PATHS[name]
  if (paths === undefined) {
    return null
  }
  return (
    `<svg data-icon="${name}" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" ` +
    'fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" ' +
    `stroke-linejoin="round" aria-hidden="true">${paths}</svg>`
  )
}
