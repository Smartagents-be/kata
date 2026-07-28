/**
 * Throwing away what a browser has recorded about a run through the kata.
 *
 * Two kinds of thing are stored, and the line between them is what this draws. **Progress** is what
 * you did: the flags you captured and the pages you finished. **Preferences** are how you read
 * them: your language, which assistant the instructions should name, and whether the notes show. A
 * reset takes the first kind only, so a room of machines can be handed to the next group without
 * anyone setting the language again.
 *
 * The flags have no single key to empty, since each step grades its own: step 0 writes a key per
 * answer box, step 1's board and step 2's workshop each write one key holding the ids they have
 * solved. `shared` may not import a step, so this matches on the shape of the key rather than
 * naming them. Everything a step persists is `kata.step<N>.…`, and nothing else in this app is.
 *
 * A step that stores something new under that prefix is opting into being cleared here. Anything
 * that must survive a reset needs a key outside it, the way `kata.mode` and `kata.assistant` do.
 */

import { PROGRESS_STORAGE_KEY } from '@/shared/progress/progress'

const STEP_FLAG_KEY = /^kata\.step\d+\./

/** Forget every flag captured in this browser and every unit marked done, in every step. */
export function resetProgress(): void {
  try {
    const stored = Object.keys(window.localStorage)
    stored
      .filter((key) => STEP_FLAG_KEY.test(key) || key === PROGRESS_STORAGE_KEY)
      .forEach((key) => {
        window.localStorage.removeItem(key)
      })
  } catch {
    // Storage blocked: nothing was persisted in the first place, so there is nothing to clear.
  }
}
