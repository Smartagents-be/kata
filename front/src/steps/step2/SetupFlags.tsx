import { FlagBoard } from './FlagBoard'
import { SETUP_FLAG_SALT, setupFlags } from './setup-flags'

/**
 * The `setup` unit's board. Three rows, one per place an agent reads instructions from, and the
 * hints are deliberately thin: the exercise is finding out that those places exist in a project
 * nobody walked you through, so a row that names the file has already done it for the student.
 *
 * Its own storage key rather than the workshop's, so the two boards do not mark each other's rows
 * solved. Both live under `kata.step2.`, which is the prefix `shared/lib/reset.ts` clears.
 */
export function SetupFlags() {
  return (
    <FlagBoard
      block="setup-flags"
      storageKey="kata.step2.setup"
      salt={SETUP_FLAG_SALT}
      flags={setupFlags}
      panel="setup.panel"
    />
  )
}
