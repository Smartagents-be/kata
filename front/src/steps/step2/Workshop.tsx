import { FlagBoard } from './FlagBoard'
import { FLAGS_STORAGE_KEY, FLAG_SALT, flags } from './flags'

/**
 * The workshop's flag board: one row per goal the `graded` build can answer yes or no to, plus the
 * two that come from somewhere else entirely. It holds the data and the reasons for it and renders
 * no elements of its own, which is why every id in the DOM reads `flags-*` and every
 * `data-component` reads `FlagBoard`.
 */
export function Workshop() {
  return (
    <FlagBoard
      block="flags"
      storageKey={FLAGS_STORAGE_KEY}
      salt={FLAG_SALT}
      flags={flags}
      panel="workshop.panel"
    />
  )
}
