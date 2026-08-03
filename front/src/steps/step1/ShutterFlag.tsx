import { useState } from 'react'
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/shared/components/ui/card'
import { useStepText } from '@/shared/i18n/useStepText'
import { FlagRow } from './FlagRow'
import { shutterFlag } from './flags'
import { readSolved, writeSolved } from './solved'

const STORAGE_KEY = 'kata.step1.shutter'

/**
 * One graded row under the browser task, for the flag hidden in `kata/step1/front/`. It is the only
 * thing in the step that grades work done through an MCP server, which is why it sits in `tools`
 * rather than on `workshop`'s board: the board is three ways context is assembled out of the
 * backend, and this is none of them.
 *
 * **It carries no progress counter.** `FlagBoard` prints "n of three collected" because three rows
 * are a collection; one row printing "0 of 1" is arithmetic nobody asked for. That difference is the
 * whole reason this is a caller rather than `FlagBoard` with a shorter array.
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
    <Card
      id="shutter"
      data-component="ShutterFlag"
      data-state={solved ? 'solved' : 'locked'}
      className="my-8"
    >
      <CardHeader id="shutter-header" data-component="ShutterFlag">
        <CardTitle id="shutter-title" data-component="ShutterFlag">
          {text('shutter.panel.title')}
        </CardTitle>
        <CardDescription id="shutter-description" data-component="ShutterFlag">
          {text('shutter.panel.description')}
        </CardDescription>
      </CardHeader>

      <CardContent id="shutter-content" data-component="ShutterFlag">
        <ol id="shutter-items" data-component="ShutterFlag">
          <FlagRow
            block="shutter"
            flag={shutterFlag}
            index={0}
            solved={solved}
            wrongKey="shutter.panel.wrong"
            onSolved={markSolved}
          />
        </ol>
      </CardContent>
    </Card>
  )
}
