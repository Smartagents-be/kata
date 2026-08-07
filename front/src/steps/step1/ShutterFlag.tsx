import { useState } from 'react'
import { Board } from '@/shared/components/Panel'
import { useStepText } from '@/shared/i18n/useStepText'
import { FlagRow } from './FlagRow'
import { shutterFlag } from './flags'
import { readSolved, writeSolved } from './solved'

const STORAGE_KEY = 'kata.step1.shutter'

/**
 * One graded row under the browser task, for the flag hidden in `kata/step1/front/`. It is the only
 * thing in the step that grades work done through an MCP server, which is why it sits in `tools`
 * rather than on `workshop`'s board: the board is five places an answer about the backend can come
 * from, and this is none of them.
 *
 * **It carries no progress counter.** `FlagBoard` prints "n of five collected" because five rows are
 * a collection; one row printing "0 of 1" is arithmetic nobody asked for. That difference is the
 * whole reason this is a caller rather than `FlagBoard` with a shorter array, and it is why it hands
 * `Board` no eyebrow. The opening hairline stays either way, because that rule is what marks the
 * seam between reading and working on every panel in the course; it simply runs the full width with
 * nothing sitting on it.
 *
 * The row is graded the same way everything else here is, a salted SHA-256 in the browser, so it
 * works with the service down. Nothing about the screenshot is checked: the PNG in the student's own
 * project is the proof that they drove the browser, and the flag is the proof they looked at it.
 */
export function ShutterFlag() {
  const { text } = useStepText('step1')
  const [solved, setSolved] = useState(() => readSolved(STORAGE_KEY).has(shutterFlag.id))

  function markSolved() {
    writeSolved(STORAGE_KEY, new Set([shutterFlag.id]))
    setSolved(true)
  }

  return (
    <Board
      block="shutter"
      state={solved ? 'solved' : 'locked'}
      title={text('shutter.panel.title')}
      description={text('shutter.panel.description')}
    >
      <FlagRow block="shutter" flag={shutterFlag} index={0} solved={solved} onSolved={markSolved} />
    </Board>
  )
}
