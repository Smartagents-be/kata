/**
 * The codes the intro asks for, browser-graded the same way step 2's flag board is: the plaintext
 * is not in the bundle, only a salted SHA-256 of it, so the answer is not sitting here for a reader
 * to lift. A box hashes what the student types with the same salt and compares.
 *
 * `hash` is `sha256Hex(CODE_SALT + code)`, and the salt just makes the digest specific to this
 * exercise; it is not a secret. `keyBase` names the block of step0 locale keys the box reads its
 * text from (`${keyBase}.title`, `.label`, `.hint`, and so on), so each box gets its own wording.
 */
export const CODE_SALT = 'kata-step0-intro-v1'

export interface CodeSpec {
  /** Stable id, used to build the localStorage key that remembers the box is solved. */
  id: string
  /** Prefix for this box's step0 locale keys, e.g. 'code.panel' or 'flag.panel'. */
  keyBase: string
  /** `sha256Hex(CODE_SALT + code)`, lowercase hex. */
  hash: string
}

/** The `welcome` page's box. Its code is printed in the prose, so this one is a warm-up. */
export const introCode: CodeSpec = {
  id: 'intro-code',
  keyBase: 'code.panel',
  hash: 'dc430b452b2351299cced3dc1c75d0de743b984061f3a35cbee0456ffbd5c0fa',
}

/**
 * The `welcome` page's second box. Its code is not in the prose: it is hidden behind the Hint
 * button, so clearing it means learning to press Hint. The plaintext lives in this box's `help`
 * locale text on purpose, since revealing it is the whole exercise.
 */
export const hintCode: CodeSpec = {
  id: 'hint-code',
  keyBase: 'hint.panel',
  hash: '11ee5e99f1d2a36cf43e117dc6ca39f1a717e6a6e8c40e27707ef387730ae51f',
}

/** The `backend` page's box. Its code is earned by running `mvn verify -Pintro`, not printed. */
export const finishCode: CodeSpec = {
  id: 'finish-code',
  keyBase: 'flag.panel',
  hash: 'd3b3a9d22b836da4bb31a39db357802c94fd148f2ec875a9f3ac2bc00a2ff454',
}
