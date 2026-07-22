import type { Mode } from '@/shared/mode/mode'

/**
 * Tailors a step's HTML to the active mode.
 *
 * Authors mark audience-specific material with `data-audience` on any element:
 *
 * ```html
 * <aside data-audience="self">Hint: check divisibility by 15 first.</aside>
 * <p data-audience="guided">Your teacher will walk through this on the board.</p>
 * ```
 *
 * An element with no `data-audience` is always shown. Non-matching elements are *removed*
 * from the document rather than hidden with CSS — during class, text that is merely hidden
 * is still one devtools panel away.
 *
 * The HTML here is first-party content committed to this repo, so it is not sanitised. If a
 * later step ever renders HTML from an API, a user, or an LLM, sanitise it before it
 * reaches `dangerouslySetInnerHTML`.
 */
export function renderForMode(html: string, mode: Mode): string {
  const doc = new DOMParser().parseFromString(html, 'text/html')

  for (const element of doc.querySelectorAll('[data-audience]')) {
    if (element.getAttribute('data-audience') !== mode) {
      element.remove()
    }
  }

  return doc.body.innerHTML
}
