import type { Assistant } from '@/shared/assistant/assistant'
import { iconSvg } from '@/shared/lib/icons'
import type { Mode } from '@/shared/mode/mode'

/** One piece of a unit: a run of prose, or the name of a figure the unit registered for that spot. */
export type Segment = { kind: 'html'; html: string } | { kind: 'figure'; name: string }

export interface PrepareOptions {
  /** Which audience is reading; see `data-audience` below. */
  mode: Mode
  /** Which assistant they are working with; see `data-assistant` below. */
  assistant: Assistant
  /** The translation for a `data-i18n` key, or `null` to keep the English that is already there. */
  translate: (key: string) => string | null
}

/**
 * Turns a unit's authored HTML into the pieces the page renders, in one pass over one parsed
 * document. Three things happen to it, in this order.
 *
 * **The audience.** Authors mark audience-specific material with `data-audience` on any element:
 *
 * ```html
 * <aside data-audience="self">Hint: check divisibility by 15 first.</aside>
 * <p data-audience="guided">Your teacher will walk through this on the board.</p>
 * ```
 *
 * An element with no `data-audience` is always shown. Non-matching elements are *removed* from the
 * document rather than hidden with CSS — during class, text that is merely hidden is still one
 * devtools panel away.
 *
 * On top of that per-element filter, **guided mode drops every run of prose**,
 * `data-audience="guided"` blocks included: in class the teacher does the telling, so the page
 * keeps only its figures, each under the section title it sat beneath, and the quiz or board a
 * unit carries lives in the registry rather than in this HTML.
 *
 * **The assistant.** The same shape again, on `data-assistant`, for the places where the
 * instruction genuinely differs between the products:
 *
 * ```html
 * <p data-assistant="claude">Put it in <code>CLAUDE.md</code>.</p>
 * <p data-assistant="copilot">Put it in <code>.github/copilot-instructions.md</code>.</p>
 * ```
 *
 * No attribute means every assistant, which is the common case: reach for it only where a student
 * on the other product would be told something untrue. It is a separate pass from the audience
 * rather than a combined one, so a paragraph carrying both attributes has to satisfy both, which is
 * exactly why **no element in this tree carries both**: it would render for one reader in four and
 * nothing would warn about the other three. Assistant variants nest inside the audience wrapper
 * instead. Both filters run before the language pass, so the dev console's missing-translation
 * warning only ever audits the page you are looking at.
 *
 * **The language.** The HTML file is the English. Every block of prose carries a `data-i18n` key,
 * and when the active language has something for that key, the element's *content* is replaced
 * with it. The element keeps its own tag and attributes, so a translated aside is still an aside
 * for the same audience. No entry means the English stays, so an untranslated paragraph degrades
 * on its own rather than taking the page with it. Keys never nest: a wrapper holding a whole
 * page's prose carries none, and the elements inside it carry one each.
 *
 * ```html
 * <p data-i18n="setup.intro">An agent starts every session knowing nothing…</p>
 * ```
 *
 * **The icons.** A prose author writes `<svg data-icon="coin"></svg>` and this pass fills it in
 * from the icon registry, so the path data lives in one place rather than pasted into every unit
 * and both languages. It runs after the language pass, so an icon dropped inside a translation is
 * expanded too.
 *
 * **The figures.** `<div data-figure="project-tree"></div>` marks a spot for a React element the
 * unit registered. The prose is cut there: one segment per run of HTML, one per figure. Only
 * top-level markers count; one nested inside an `<aside>` is left alone and renders as the empty
 * div it is, which is the symptom to look for. That is why **a marker is never wrapped in a
 * `data-assistant` div**: the figure would vanish for one assistant only, silently, and the author
 * is on the other one. Put the attribute on the marker itself if a figure ever has to differ. A run that is only whitespace is dropped rather
 * than emitted as an empty article.
 *
 * The HTML here is first-party content committed to this repo, so it is not sanitised, and neither
 * are the translations, which come from the same place. If a later step ever renders HTML from an
 * API, a user, or an LLM, sanitise it before it reaches `dangerouslySetInnerHTML`.
 */
/**
 * The shared heading a unit writes above the things it asks the student to do. It is the one place
 * unit prose reaches into the `ui` namespace, so the wording above a task and the wording above a
 * quiz cannot drift apart.
 */
export const EXERCISE_HEADING_KEY = 'ui:quiz.title'

/**
 * Whether the page this unit is about to render already carries that heading. A unit holding both a
 * task and a registry quiz writes it itself, above the task, and `QuizPanel` then has to arrive
 * *under* it rather than print a second one a few inches down. Answered by running the same pass the
 * page runs, so the guided cut is not re-implemented here: in class the prose goes and the heading
 * with it, and the quiz owns the heading again.
 */
export function showsExerciseHeading(html: string, mode: Mode, assistant: Assistant): boolean {
  return prepareUnit(html, { mode, assistant, translate: () => null }).some(
    (segment) =>
      segment.kind === 'html' && segment.html.includes(`data-i18n="${EXERCISE_HEADING_KEY}"`),
  )
}

export function prepareUnit(
  html: string,
  { mode, assistant, translate }: PrepareOptions,
): Segment[] {
  const doc = new DOMParser().parseFromString(html, 'text/html')

  // In class the teacher carries the prose out loud, so guided mode keeps only each figure and the
  // section title above it, which keeps a page of drawings organised. The title usually sits inside
  // the self-audience wrapper the next pass is about to remove, so each top-level figure marker
  // adopts the nearest heading before it in reading order *now*: moved to sit directly above the
  // marker, where the audience pass cannot take it and the language pass still finds it. A heading
  // serves at most one figure, so a section with two drawings titles the first.
  const keptHeadings = new Set<Node>()
  if (mode === 'guided') {
    let lastHeading: Element | null = null
    for (const element of doc.body.querySelectorAll('h2, h3, [data-figure]')) {
      if (!element.hasAttribute('data-figure')) {
        lastHeading = element
      } else if (element.parentElement === doc.body && lastHeading) {
        doc.body.insertBefore(lastHeading, element)
        keptHeadings.add(lastHeading)
        lastHeading = null
      }
    }
  }

  for (const element of doc.querySelectorAll('[data-audience]')) {
    if (element.getAttribute('data-audience') !== mode) {
      element.remove()
    }
  }

  // Removed rather than hidden for the same reason the audience is: a student following the wrong
  // product's instructions should not be able to find them in devtools either.
  for (const element of doc.querySelectorAll('[data-assistant]')) {
    if (element.getAttribute('data-assistant') !== assistant) {
      element.remove()
    }
  }

  for (const element of doc.querySelectorAll('[data-i18n]')) {
    // A unit written entirely for one audience wraps its prose in a single element, and the keys
    // sit on the paragraphs inside it. Replacing an ancestor as well would throw them away.
    if (element.parentElement?.closest('[data-i18n]')) {
      continue
    }
    const translated = translate(element.getAttribute('data-i18n') ?? '')
    if (translated !== null) {
      element.innerHTML = translated
    }
  }

  // Expand icon markers into their SVG. After the language pass so a marker in a translation counts;
  // parsing the markup on its own and importing it keeps the children in the SVG namespace.
  for (const element of doc.querySelectorAll('svg[data-icon]')) {
    const markup = iconSvg(element.getAttribute('data-icon') ?? '')
    if (markup === null) {
      continue
    }
    const svg = new DOMParser().parseFromString(markup, 'image/svg+xml').documentElement
    element.replaceWith(doc.importNode(svg, true))
  }

  const segments: Segment[] = []
  // Collecting into a detached element rather than concatenating outerHTML keeps comments and
  // stray text nodes exactly as the author wrote them.
  let run = doc.createElement('div')

  const flush = () => {
    if (run.innerHTML.trim()) {
      segments.push({ kind: 'html', html: run.innerHTML })
    }
    run = doc.createElement('div')
  }

  for (const node of [...doc.body.childNodes]) {
    const marker =
      node.nodeType === Node.ELEMENT_NODE ? (node as Element).getAttribute('data-figure') : null

    if (marker === null) {
      // The guided cut: everything that is not a figure or its adopted title goes, the
      // `data-audience="guided"` blocks included. A unit's quiz or board comes from the registry
      // rather than this HTML, so it is untouched.
      if (mode === 'guided' && !keptHeadings.has(node)) {
        continue
      }
      run.append(node)
      continue
    }

    flush()
    segments.push({ kind: 'figure', name: marker })
  }
  flush()

  return segments
}
