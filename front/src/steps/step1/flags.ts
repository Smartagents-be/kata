/**
 * The three flags the workshop board hands out, one per way an agent's context is assembled from
 * the step 1 backend: read the source, trace the run, or flip the config. The plaintext flag is
 * deliberately not here, only a salted SHA-256 of it, so the answer is not sitting in the bundle for
 * a reader to lift. A pasted flag is hashed with the same salt and compared. The salt just makes the
 * digest specific to this exercise; it is not a secret.
 *
 * Each `hash` is `sha256Hex(FLAG_SALT + flag)`, and the flags are the `{leetspoken}` strings the
 * `GET /api/titles` pipeline computes but never returns. See the workshop board in step 2 for the
 * same mechanism; `sha256Hex` lives in `shared/lib/hash`.
 */
export const FLAG_SALT = 'kata-step1-context-v1'

export interface FlagSpec {
  /** Stable id, used to build element ids and to remember which flags are solved. */
  id: string
  /** Step 1 namespace key for the flag's name. */
  labelKey: string
  /** Step 1 namespace key for the one line saying how to reach it. */
  hintKey: string
  /** Step 1 namespace key for the longer hint shown in the dialog behind the Hint button. */
  helpKey: string
  /** `sha256Hex(FLAG_SALT + flag)`, lowercase hex. */
  hash: string
}

export const flags: FlagSpec[] = [
  {
    // Tools / static context: a literal in a branch that never runs. Read it, do not run it.
    id: 'decode-source',
    labelKey: 'flag.decode.label',
    hintKey: 'flag.decode.hint',
    helpKey: 'flag.decode.help',
    hash: '772acb2881a11e4bbb03556d7f84c4ae860fc96c822e3958bb2c60fae653b756',
  },
  {
    // Session / runtime context: the hidden tenth entry the running pipeline computes and drops.
    id: 'trace-runtime',
    labelKey: 'flag.trace.label',
    hintKey: 'flag.trace.hint',
    helpKey: 'flag.trace.help',
    hash: '1a52c386cebbce7ecda1ae03da0c108c62fda03a0c663c15bb3691816e3aec73',
  },
  {
    // Harness / config context: printed only when the log level is turned up.
    id: 'debug-config',
    labelKey: 'flag.debug.label',
    hintKey: 'flag.debug.hint',
    helpKey: 'flag.debug.help',
    hash: '53285327e48e2e3f5c05abd97bd6c6a50fb12da948358286b205952c7ee0590b',
  },
]
