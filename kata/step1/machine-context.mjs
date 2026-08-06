#!/usr/bin/env node
/**
 * Plants one line in the student's *user-level* instructions file, and takes it out again.
 *
 * This is step 1's `machine` flag, the first row of the `workshop` board. Every other flag in the
 * step comes out of a project: the catalogue's response, a log setting, a source file, a trace. This
 * one comes from the machine, from the file the assistant merges into every session in every project
 * before the student has typed anything. Nothing in the course taught that layer, and nothing could
 * teach it convincingly by describing it.
 *
 * **This runs at install time, not at workshop time**, and that is what makes the row a hunt.
 * `install.txt` at the repo root is what calls it: the student asks their own agent to execute that
 * file when they set the course up, so by the time they reach the board the line has been in every
 * session they have opened for hours and they never looked. A student who planted it themselves on
 * the workshop page already knew the answer and was only reading it back.
 *
 * **The course does not plant anything silently, and that is the constraint this file is shaped by.**
 * The same step teaches prompt injection two sections earlier, and the whole of it teaches that
 * unsourced context is the least trustworthy layer. A course that quietly wrote instructions into a
 * student's global agent config would be running the attack it warns about, on their laptop, outside
 * anything the app can undo (the reset only clears `localStorage` keys under `kata.step<N>.`). So
 * `install.txt` says plainly what this writes and where, before it names a single step, and `remove`
 * is one command that is printed every time `setup` runs.
 *
 * Transparent about what it does, opaque about what it says: the wording of the planted line is
 * nowhere in the curriculum, and the flag is not in this file as text. `CIPHER` below is the string
 * with each byte XORed against a rolling key, the same move `kata/step1/front/index.html` makes, so
 * a `grep` for `{` across the repository does not return the answer. That is obfuscation and not
 * secrecy. A student who reads this script, or reads `install.txt` closely, has spent the flag
 * knowingly, exactly like a student who reads nine `@Order` annotations instead of opening the
 * Catalogue page.
 *
 * The rules the rest of this file exists to keep, because it writes to a file outside the repository
 * that the app cannot undo:
 *
 * - **Append only, between the two sentinel lines.** Nothing outside them is ever rewritten or
 *   reformatted.
 * - **Idempotent.** A second `setup` replaces the block instead of adding another one.
 * - **`remove` leaves the rest byte-identical**, trailing newline included. `setup` appends exactly
 *   one newline before the block and one after it, so `remove` takes exactly those away again.
 * - **Back up first.** The file is copied beside itself before the first change, and the copy is
 *   only made once, so a second `setup` cannot overwrite the backup with a file that already holds
 *   the block.
 * - **Write through a temporary file and rename**, so a failure never leaves the file half written.
 * - **A missing file and a missing directory are the normal case**, not an error.
 * - Never print the flag. `setup` prints the block with it masked, the absolute path it wrote to,
 *   and the command that removes it again.
 *
 * Node rather than a shell script: `front/` already requires Node, and this runs on Windows without
 * anybody installing Git Bash.
 */

import { chmodSync, copyFileSync, existsSync, mkdirSync, readFileSync, renameSync, rmSync, statSync, writeFileSync } from 'node:fs'
import { homedir } from 'node:os'
import { dirname, join, resolve } from 'node:path'
import { fileURLToPath } from 'node:url'

/** The flag, XORed byte by byte against a rolling key and base64'd. Assembled at run time. */
const CIPHER = 'Gg1L5uGR18iWsJHAkFV/FFwNNg=='

function flag() {
  const bytes = Buffer.from(CIPHER, 'base64')
  return Buffer.from(bytes.map((byte, index) => byte ^ ((index * 13 + 97) & 255))).toString('utf8')
}

/**
 * Where each assistant reads its user-level instructions from. Both honour an environment variable
 * that moves the whole directory, which is also what makes this script safe to exercise against a
 * throwaway home in a test.
 *
 * Typed as a lookup keyed by the assistant name, so a third assistant is a missing entry here and a
 * readable error rather than a silent write to the wrong file.
 */
const TARGETS = {
  claude: {
    name: 'Claude Code',
    dir: () => process.env.CLAUDE_CONFIG_DIR || join(homedir(), '.claude'),
    file: 'CLAUDE.md',
  },
  copilot: {
    name: 'Copilot CLI',
    dir: () => process.env.COPILOT_HOME || join(homedir(), '.copilot'),
    file: 'copilot-instructions.md',
  },
}

const BEGIN = '<!-- kata-agentic-java step 1 begin: machine-level context -->'
const END = '<!-- kata-agentic-java step 1 end: machine-level context -->'

const SCRIPT = fileURLToPath(import.meta.url)

/**
 * The planted block. It carries the flag in plaintext, which is allowed because it lands outside
 * this repository, in a file the student owns.
 *
 * Its wording has one job beyond the exercise: somebody who finds these lines in six months, with no
 * course in front of them, has to be able to tell what they are, that they are inert, and how to
 * take them out. So it names itself, it says it asks the agent for nothing, and it carries the
 * removal command with the absolute path this script was run from.
 */
function block(assistant) {
  return `${BEGIN}
## Agentic Java kata, step 1

This section was written into your instructions file by a course exercise, and not by you. It asks
the agent reading it to do nothing at all.

The point it makes is that this file sits above every project you open. Whatever you are working on,
these lines are already in the window before you type anything. The flag that proves it is
${flag()}

To take it out again, run:

    node ${SCRIPT} remove ${assistant}

Or delete these lines together with the two markers around them.
${END}`
}

/** The same block with the flag masked, for the terminal. What was written is shown; what it says is not. */
function maskedBlock(assistant) {
  return block(assistant).split(flag()).join('{...}')
}

class Failure extends Error {}

function fail(message) {
  throw new Failure(message)
}

function target(assistant) {
  const entry = TARGETS[assistant]
  if (!entry) {
    fail(`Unknown assistant "${assistant}". Use one of: ${Object.keys(TARGETS).join(', ')}.`)
  }
  const dir = resolve(entry.dir())
  return { ...entry, dir, path: join(dir, entry.file) }
}

function read(path) {
  if (!existsSync(path)) {
    return null
  }
  if (!statSync(path).isFile()) {
    fail(`${path} is not a file, so this script will not touch it.`)
  }
  return readFileSync(path, 'utf8')
}

/**
 * Writes through a temporary file in the same directory and renames over the target, so an
 * interrupted run leaves the original in place rather than a half-written file. The rename is atomic
 * within one filesystem, which is why the temporary sits beside the target and not in `/tmp`.
 */
function writeAtomically(path, content) {
  mkdirSync(dirname(path), { recursive: true })
  const temporary = `${path}.kata-tmp-${process.pid}`
  try {
    writeFileSync(temporary, content, { encoding: 'utf8', mode: 0o600 })
    if (existsSync(path)) {
      // Keep whatever permissions the student's own file had.
      chmodSync(temporary, statSync(path).mode & 0o777)
    }
    renameSync(temporary, path)
  } catch (error) {
    rmSync(temporary, { force: true })
    fail(`Could not write ${path}: ${error.message}`)
  }
}

/**
 * Cuts the block out, together with exactly one newline in front of it and one behind it, which is
 * exactly what {@link plant} put there. Anything else in the file is untouched, byte for byte.
 */
function cut(content) {
  const start = content.indexOf(BEGIN)
  if (start === -1) {
    return { found: false, rest: content }
  }
  const endMarker = content.indexOf(END, start)
  if (endMarker === -1) {
    fail(
      `${BEGIN}\nis in the file with no matching end marker. Nothing was changed: repair the file by hand.`,
    )
  }
  let from = start
  let to = endMarker + END.length
  if (from > 0 && content[from - 1] === '\n') {
    from -= 1
  }
  if (content[to] === '\n') {
    to += 1
  }
  return { found: true, rest: content.slice(0, from) + content.slice(to) }
}

/** Appends the block, having first taken out any block already there, so a second run replaces it. */
function plant(content, assistant) {
  const base = content === null ? '' : cut(content).rest
  const body = block(assistant)
  return base === '' ? `${body}\n` : `${base}\n${body}\n`
}

function backupPath(path) {
  return `${path}.kata-backup`
}

function setup(assistant) {
  const { name, path } = target(assistant)
  const before = read(path)

  let backedUpTo = null
  if (before !== null && !existsSync(backupPath(path))) {
    try {
      copyFileSync(path, backupPath(path))
    } catch (error) {
      fail(`Could not back up ${path}: ${error.message}`)
    }
    backedUpTo = backupPath(path)
  }

  writeAtomically(path, plant(before, assistant))

  const removal = `node ${SCRIPT} remove ${assistant}`
  console.log(`Wrote one block into ${name}'s user-level instructions file.`)
  console.log(`  ${path}`)
  if (backedUpTo) {
    console.log(`The file as it was is beside it, at ${backedUpTo}.`)
  }
  console.log('')
  console.log('This is what went in. The flag itself is in the file rather than on this screen:')
  console.log('')
  for (const line of maskedBlock(assistant).split('\n')) {
    console.log(`  ${line}`)
  }
  console.log('')
  console.log('To put your machine back:')
  console.log('')
  console.log(`  ${removal}`)
  console.log('')
}

function remove(assistant) {
  const { name, path } = target(assistant)
  const before = read(path)
  if (before === null) {
    console.log(`Nothing to remove: ${path} does not exist.`)
    return
  }

  const { found, rest } = cut(before)
  if (!found) {
    console.log(`Nothing to remove: ${path} carries no block from this script.`)
    return
  }

  if (rest === '') {
    // The file held the block and nothing else, so this script created it. Take it with us.
    rmSync(path, { force: true })
    console.log(`Removed the block from ${name}'s instructions file, which held nothing else.`)
    console.log(`  ${path} is gone again.`)
  } else {
    writeAtomically(path, rest)
    console.log(`Removed the block from ${name}'s instructions file. The rest of it is untouched.`)
    console.log(`  ${path}`)
  }

  // The backup has done its job once the file matches it again, so it does not outlive the exercise.
  const backup = backupPath(path)
  if (existsSync(backup)) {
    if (readFileSync(backup, 'utf8') === rest) {
      rmSync(backup, { force: true })
    } else {
      console.log(`Your file changed while the block was in it, so the backup stays at ${backup}.`)
    }
  }
}

const USAGE = `Usage: node ${SCRIPT} <setup|remove> <claude|copilot>

  setup   writes one block into your user-level instructions file, between two markers
  remove  takes that block out again and leaves the rest of the file exactly as it was

Both honour CLAUDE_CONFIG_DIR and COPILOT_HOME if you have moved those directories.`

function main(argv) {
  const [command, assistant] = argv
  if (!command || !assistant) {
    fail(USAGE)
  }
  if (command === 'setup') {
    setup(assistant)
  } else if (command === 'remove') {
    remove(assistant)
  } else {
    fail(`Unknown command "${command}".\n\n${USAGE}`)
  }
}

try {
  main(process.argv.slice(2))
} catch (error) {
  console.error(error instanceof Failure ? error.message : `Unexpected failure: ${error.stack}`)
  process.exit(1)
}
