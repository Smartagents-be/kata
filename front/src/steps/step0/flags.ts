import { CODE_SALT } from './code'

/**
 * The two flags step 0's board hands out, one per run against `exercises/step0/java`. The first is the
 * intro reveal the `backend` page's block prints, and the second is the one the student has to pick
 * out of two candidates. A third row once ran a readiness check (JDK, the other steps' projects,
 * `native-image`); it went because the first run already proves the JDK and `install.txt`'s setup
 * check covers the rest. Between them they grade the loop
 * rather than any knowledge: run a command, read what the machine printed, paste it back.
 *
 * The plaintext is deliberately not here, only a salted SHA-256 of it, so the answer is not sitting
 * in the bundle for a reader to lift. A pasted flag is hashed with the same salt and compared, here
 * in the browser, which is what lets step 0 work with nothing else running.
 *
 * Each `hash` is `sha256Hex(CODE_SALT + flag)`, lowercase hex; `sha256Hex` lives in
 * `shared/lib/hash`. The salt is `code.ts`'s, shared rather than a second one of its own, because
 * the intro reveal's digest came over from `finishCode` unchanged when its box moved onto this
 * board. It only makes a digest specific to this exercise; it is not a secret.
 */
export const FLAG_SALT = CODE_SALT

export interface FlagSpec {
  /** Stable id, used to build element ids and to remember which flags are solved. */
  id: string
  /** Step 0 namespace key for the flag's name. */
  labelKey: string
  /** Step 0 namespace key for the one line saying how to reach it. */
  hintKey: string
  /** Step 0 namespace key for the longer hint shown in the dialog behind the Hint button. */
  helpKey: string
  /** `sha256Hex(FLAG_SALT + flag)`, lowercase hex. */
  hash: string
}

export const flags: FlagSpec[] = [
  {
    // `mvn verify -Pintro`. The digest is the one `backend`'s answer box used to carry.
    id: 'run',
    labelKey: 'flag.run.label',
    hintKey: 'flag.run.hint',
    helpKey: 'flag.run.help',
    hash: 'd3b3a9d22b836da4bb31a39db357802c94fd148f2ec875a9f3ac2bc00a2ff454',
  },
  {
    // `mvn verify -Ppick`. Two candidates come back and only the ticked line is this one.
    id: 'pick',
    labelKey: 'flag.pick.label',
    hintKey: 'flag.pick.hint',
    helpKey: 'flag.pick.help',
    hash: '46250179c584f988626ba660f498a90fffa5812f23ffbd55857beb1ca0b433e4',
  },
]
