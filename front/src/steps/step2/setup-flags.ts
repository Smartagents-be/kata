import type { FlagSpec } from './flags'

/**
 * The three flags the `setup` unit hands out, one per place an agent picks instructions up from in
 * `kata/step2/java`: the skill under that project's own `.claude`, the project briefing, and the
 * briefing scoped to one package inside it.
 *
 * They are not printed by any build. Each one sits in the file it is about, so collecting them is
 * reading the setup of a project you have not opened yet, which is the only thing this unit can
 * ask a student to do that a quiz cannot.
 *
 * The plaintext is deliberately not here: only a salted SHA-256, so the answer is not sitting in
 * the bundle for a reader to lift. Its own salt rather than the workshop's, because a salt makes a
 * digest specific to one exercise and these two are not the same exercise.
 *
 * Each `hash` is `sha256Hex(SETUP_FLAG_SALT + flag)`.
 */
export const SETUP_FLAG_SALT = 'kata-step2-setup-v1'

export const setupFlags: FlagSpec[] = [
  {
    id: 'skill',
    labelKey: 'setup.flag.skill.label',
    hintKey: 'setup.flag.skill.hint',
    helpKey: 'setup.flag.skill.help',
    hash: '712716b8216e082f63ef5d0d8af1e59cc460e21272ccf668f5605f7276ea21fe',
  },
  {
    id: 'module',
    labelKey: 'setup.flag.module.label',
    hintKey: 'setup.flag.module.hint',
    helpKey: 'setup.flag.module.help',
    hash: '8c86aa992a6b32e343fa0d1924ffd429f1896437778dd7e0e6e605612cc0094a',
  },
  {
    id: 'package',
    labelKey: 'setup.flag.package.label',
    hintKey: 'setup.flag.package.hint',
    helpKey: 'setup.flag.package.help',
    hash: '431ffdd52447409070c699f35ec88f71647d3889d9b307e37f472485e1571bea',
  },
]
