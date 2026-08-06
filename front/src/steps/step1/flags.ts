import type { Assistant } from '@/shared/assistant/assistant'

/**
 * The five flags the workshop board hands out, one per place an answer can come from: the student's
 * own machine, the running system, a setting, the source, the run. That is `truth`'s question asked
 * five times, which is why every row wears its provenance as an eyebrow (`placeKey`) and why no
 * `flag.*.help` key may open by saying it again. Three of them were labelled with a layer once
 * (tools, session, harness) and the mapping was a pun every time: a Spring request is not the
 * student's session and Spring's log config is not the harness. Do not put the layer names back. The
 * plaintext flag is deliberately not here, only a salted SHA-256 of it, so the answer is not sitting
 * in the bundle for a reader to lift. A pasted flag is hashed with the same salt and compared. The
 * salt just makes the digest specific to this exercise; it is not a secret.
 *
 * **The array is in board order, and the board runs easiest first.** Opening a file that is already
 * on disk needs no machinery, standing the two halves up and reading the response needs none either, a setting
 * needs a flag on the launcher, the source needs a read and a scratch decode, and the run needs
 * instrumenting, rebuilding, running and then a judgement about which of the lines that come back is
 * the flag. Opening on `machine` is the point at the front, since it puts the outermost layer first
 * and everything after it comes out of the project; ending on the judgement is the point at the
 * back, since it is step 0's fourth house rule paid off. So a reorder that puts the trace anywhere
 * but last costs the board its close. The order before all this was hardest first and was a fossil
 * of the abandoned layer mapping.
 *
 * Each `hash` is `sha256Hex(FLAG_SALT + flag)`, and three of the five are the `{leetspoken}` strings
 * the `GET /api/titles` pipeline computes but never returns. See the workshop board in step 2 for the
 * same mechanism; `sha256Hex` lives in `shared/lib/hash`.
 */
export const FLAG_SALT = 'kata-step1-context-v1'

/**
 * A message key that differs by assistant, for the one row whose technique is a path and a command
 * rather than a place in this repository. It is a `Record<Assistant, …>` rather than an optional
 * second field so that adding a third assistant is a compile error naming every key that has to be
 * written, instead of silence and a Cursor student being pointed at `~/.claude/CLAUDE.md`. That is
 * the same shape `SurviveTheClear` types its moves with, and the same rule: both siblings are
 * suffixed with the assistant name, and there is no bare key meaning Claude.
 */
export type KeyByAssistant = Record<Assistant, string>

/** The key for this assistant, for the fields that may carry either one key or one per assistant. */
export function keyFor(key: string | KeyByAssistant, assistant: Assistant): string {
  return typeof key === 'string' ? key : key[assistant]
}

export interface FlagSpec {
  /** Stable id, used to build element ids and to remember which flags are solved. */
  id: string
  /** Step 1 namespace key for the flag's name. */
  labelKey: string
  /**
   * Step 1 namespace key for the eyebrow above the label, naming where this answer came from. It is
   * the board's whole thesis worn on the row, so the five read as one sort, and a `helpKey` must
   * not open by saying it a second time. Optional: `shutterFlag` is not one of the five
   * provenances, so it carries none and the row renders no eyebrow at all.
   */
  placeKey?: string
  /** Step 1 namespace key for the one line saying how to reach it. */
  hintKey: string
  /**
   * Step 1 namespace key for the longer hint shown in the dialog behind the Hint button, or one key
   * per assistant where the dialog has to name a path and a command. Only `machine` varies: every
   * other row is worked against this repository, which is the same for both readers.
   */
  helpKey: string | KeyByAssistant
  /**
   * Step 1 namespace key for the message a wrong paste gets. Optional; `FlagRow` falls back to
   * `flags.panel.wrong`. Each of the five carries its own because the generic one sends the student
   * back to the pipeline, which is true of one row out of five. A message says "not that one" and
   * points back at work already done. It never carries a hint the Hint dialog does not.
   */
  wrongKey?: string
  /** `sha256Hex(FLAG_SALT + flag)`, lowercase hex. */
  hash: string
}

export const flags: FlagSpec[] = [
  {
    // The one flag that is in no project at all. It was planted at install time, hours before the
    // student reached this board: `install.txt` at the repo root asks their agent to run
    // `kata/step1/machine-context.mjs`, which writes one line into their user-level instructions
    // file, and that file has been merged into every session in every project they have opened
    // since. That is what makes this row a hunt rather than an errand: the student is looking for
    // something that has been in front of them all along and that they never looked at, and that is
    // a question you only get to ask once. Nothing depends on the agent obeying the
    // line: it sits there in plaintext, so reading the file and asking the agent what it was told
    // both work. The two `flag.machine.help` keys carry the path, the removal command and the one
    // sentence a student who skipped `install.txt` needs, because the page carries the game while
    // the board carries every technique.
    id: 'machine',
    labelKey: 'flag.machine.label',
    placeKey: 'flag.machine.place',
    hintKey: 'flag.machine.hint',
    helpKey: { claude: 'flag.machine.help.claude', copilot: 'flag.machine.help.copilot' },
    wrongKey: 'flag.machine.wrong',
    hash: 'eaf307527277d91b4c844246489100ee77c0bbc8ac0ba3888c0fed663c1cbf0f',
  },
  {
    // Not in any one file, so no grep returns it: it is the nine published titles read together, in
    // the order the response puts them in. Collecting nine `@Order` annotations out of fifty-five
    // files is one honest route; standing both halves up and reading `/catalog` is the other, and
    // that gap is `truth`'s proof section met rather than argued.
    id: 'system',
    labelKey: 'flag.system.label',
    placeKey: 'flag.system.place',
    hintKey: 'flag.system.hint',
    helpKey: 'flag.system.help',
    wrongKey: 'flag.system.wrong',
    hash: 'ea9685c7b381dad0afd916354a6eda0079776ff99aaeba2b850faab88b844dd1',
  },
  {
    // Not hidden in the code at all: a default log level decides what reaches the screen.
    id: 'debug-config',
    labelKey: 'flag.debug.label',
    placeKey: 'flag.debug.place',
    hintKey: 'flag.debug.hint',
    helpKey: 'flag.debug.help',
    wrongKey: 'flag.debug.wrong',
    hash: '53285327e48e2e3f5c05abd97bd6c6a50fb12da948358286b205952c7ee0590b',
  },
  {
    // On disk and unreachable: running the service never surfaces it, so it has to be read.
    id: 'decode-source',
    labelKey: 'flag.decode.label',
    placeKey: 'flag.decode.place',
    hintKey: 'flag.decode.hint',
    helpKey: 'flag.decode.help',
    wrongKey: 'flag.decode.wrong',
    hash: '772acb2881a11e4bbb03556d7f84c4ae860fc96c822e3958bb2c60fae653b756',
  },
  {
    // Alive only while the pipeline runs, and several lines come back in its shape. The pick is the
    // student's, which is why this one is last.
    id: 'trace-runtime',
    labelKey: 'flag.trace.label',
    placeKey: 'flag.trace.place',
    hintKey: 'flag.trace.hint',
    helpKey: 'flag.trace.help',
    wrongKey: 'flag.trace.wrong',
    hash: '1a52c386cebbce7ecda1ae03da0c108c62fda03a0c663c15bb3691816e3aec73',
  },
]

/**
 * The step's sixth flag, and **not one of the board's five**. It is hidden in `kata/step1/front/`, a
 * standalone page with no server behind it, and the only way to it is to drive a browser: the page
 * assembles the string while it runs, so reading the file returns nothing. `ShutterFlag` grades it
 * under the browser task in `tools`, where the work happens.
 *
 * It stays out of `flags` on purpose. That array is what `workshop` closes the step with, one row
 * per place an answer can come from, and a browser page is none of those five. It shares
 * `FLAG_SALT` because the salt is not a secret; it only makes a digest specific to this step.
 *
 * It carries **no `placeKey`**, for the same reason: the eyebrow names one of the board's five
 * provenances, and this is none of them. `FlagRow` renders nothing where it is absent.
 */
export const shutterFlag: FlagSpec = {
  id: 'shutter',
  labelKey: 'shutter.flag.label',
  hintKey: 'shutter.flag.hint',
  helpKey: 'shutter.flag.help',
  wrongKey: 'shutter.panel.wrong',
  hash: '15f266cf9593babbc256601202db66bccd409de40333ddc42ab8bea92ae27249',
}
