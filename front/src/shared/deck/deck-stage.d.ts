/**
 * Types for the vendored `deck-stage.js`, which ships no types of its own.
 *
 * Provenance: copied verbatim from smartagents-website,
 * `secured/presentations/shared/deck-stage.js`, commit dbdce4ae (2026-06-09). The copy is byte for
 * byte identical so it can be re-synced from there; nothing about it is adjusted in this repo, and
 * everything we want different is done from the outside, through attributes and document CSS.
 *
 * This file does double duty. Its presence is what lets `tsc -b` resolve the side-effect import at
 * all (the app tsconfig has no `allowJs`, and a sibling `.d.ts` is the mechanism for a plain `.js`
 * file). It also declares the custom element for JSX. Note that `tsc` stops at this file and never
 * looks at the `.js`, so deleting the script would leave the type check green and only break the
 * build.
 */

import type { DetailedHTMLProps, HTMLAttributes } from 'react'

/** The element's public API. `index` and `length` are getters, so they are read here, never passed
 *  as JSX props: React writes an unknown prop through as `element[key] = value` when the key is in
 *  the element, and assigning to a getter throws. */
export interface DeckStageElement extends HTMLElement {
  readonly index: number
  readonly length: number
  goTo(i: number): void
  next(): void
  prev(): void
  reset(): void
}

// In @types/react 19 the JSX namespace lives inside the `react` module rather than the global
// scope, so a custom element is declared by augmenting that module. `import type` above is what
// makes this file a module, which is what makes the block below an augmentation rather than a
// wholesale redeclaration of `react`.
declare module 'react' {
  namespace JSX {
    interface IntrinsicElements {
      'deck-stage': DetailedHTMLProps<HTMLAttributes<DeckStageElement>, DeckStageElement> & {
        width?: number | string
        height?: number | string
        /** Suppresses the thumbnail rail. See the note in PresentationPage. */
        'no-rail'?: boolean | ''
      }
    }
  }
}
