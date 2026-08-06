/**
 * The five flags the workshop hands out, and they come from three different places. The first three
 * are one per goal the `graded` build can answer yes or no to, printed by `mvn verify -Pgraded` as
 * each gate passes. The fourth comes from the running service once the student implements the
 * statement endpoint. The fifth comes from the startup log of a compiled native image, so nothing
 * on the JVM prints it at all.
 *
 * The plaintext flag is deliberately not here: only a salted SHA-256 of it, so the answer is not
 * sitting in the bundle for a reader to lift. A pasted flag is hashed with the same salt and
 * compared. The salt just makes the digest specific to this exercise; it is not a secret.
 *
 * Each `hash` is `sha256Hex(FLAG_SALT + flag)`.
 */
export const FLAG_SALT = 'kata-step2-loans-v1'

/**
 * Where the board keeps what this browser has solved. Exported because two components read it: the
 * board writes it, and `RunSheet` reads it to fill its pips. One constant, so the two cannot drift.
 */
export const FLAGS_STORAGE_KEY = 'kata.step2.flags'

export interface FlagSpec {
  /** Stable id, used to build element ids and to remember which flags are solved. */
  id: string
  /** Step 2 namespace key for the goal's name. */
  labelKey: string
  /** Step 2 namespace key for the one line saying what earns it. */
  hintKey: string
  /** Step 2 namespace key for the longer hint shown in the dialog behind the Hint button. */
  helpKey: string
  /** `sha256Hex(FLAG_SALT + flag)`, lowercase hex. */
  hash: string
}

export const flags: FlagSpec[] = [
  {
    id: 'coverage-floor',
    labelKey: 'workshop.flag.coverage.label',
    hintKey: 'workshop.flag.coverage.hint',
    helpKey: 'workshop.flag.coverage.help',
    hash: 'e2c656e93e656e9c6e6efff9892e84ce42ff156c812738c171b44c1f66f8e03a',
  },
  {
    id: 'complexity-ceiling',
    labelKey: 'workshop.flag.complexity.label',
    hintKey: 'workshop.flag.complexity.hint',
    helpKey: 'workshop.flag.complexity.help',
    hash: '1638708b6d9d61e32d8a3e01749e30ad8082be44f19122525a015f10a24fcaef',
  },
  {
    id: 'honest-coverage',
    labelKey: 'workshop.flag.honest.label',
    hintKey: 'workshop.flag.honest.hint',
    helpKey: 'workshop.flag.honest.help',
    hash: 'c0e4e6be75485e0c1590eb5db6553eb717f8cc2ffaefd6eae42c26aa66eae9f2',
  },
  {
    // The odd one out: this code comes from the running service, not from the graded build.
    id: 'statement-endpoint',
    labelKey: 'workshop.flag.statement.label',
    hintKey: 'workshop.flag.statement.hint',
    helpKey: 'workshop.flag.statement.help',
    hash: '38c84fc0fa1155f5fcc6fb13110954bbf917963ab76fc6c0c484a8719b06d620',
  },
  {
    // The other odd one out: no profile prints this, and no JVM does. It comes from the startup
    // log of a compiled native image, so it needs the AOT build wired and the executable run.
    id: 'native-image',
    labelKey: 'workshop.flag.native.label',
    hintKey: 'workshop.flag.native.hint',
    helpKey: 'workshop.flag.native.help',
    hash: 'f4d43ec856d64ab42b3ba931503c9f74fd00e91040fd476eea480aacf3d9e729',
  },
]
