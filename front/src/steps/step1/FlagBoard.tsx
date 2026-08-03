import { useState } from 'react'
import { useTranslation } from 'react-i18next'
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/shared/components/ui/card'
import { useStepText } from '@/shared/i18n/useStepText'
import { FlagRow } from './FlagRow'
import { flags } from './flags'
import { readSolved, writeSolved } from './solved'

const STORAGE_KEY = 'kata.step1.flags'

/**
 * The workshop's flag board. Each row is one way the step 1 backend hides a value from the
 * response: read the source, trace the run, or turn the log level up. Paste the flag you found and
 * the row checks it here in the browser, against a salted hash, so this half works with the backend
 * down. Nothing here talks to the service: the discovery already happened against the running
 * pipeline, and this only confirms you read what it was hiding.
 *
 * The rows themselves are {@link FlagRow}, shared with `ShutterFlag` in `tools`. What is left here
 * is the board around them: the three-of-three counter, which is the one thing a one-row board has
 * no use for.
 */
export function FlagBoard() {
  const { text } = useStepText('step1')
  const { t } = useTranslation('step1')
  const [solved, setSolved] = useState<Set<string>>(() => readSolved(STORAGE_KEY))

  function markSolved(id: string) {
    setSolved((current) => {
      const next = new Set(current).add(id)
      writeSolved(STORAGE_KEY, next)
      return next
    })
  }

  return (
    <Card
      id="flags"
      data-component="FlagBoard"
      data-state={solved.size === flags.length ? 'complete' : 'partial'}
      // The board is an inline figure now rather than the registry's trailing `figure`, so it is no
      // longer spaced by `UnitView`'s `gap-8` and carries its own margin like every other marker.
      className="my-8"
    >
      <CardHeader id="flags-header" data-component="FlagBoard">
        <CardTitle id="flags-title" data-component="FlagBoard">
          {text('flags.panel.title')}
        </CardTitle>
        <CardDescription id="flags-description" data-component="FlagBoard">
          {text('flags.panel.description')}
        </CardDescription>
      </CardHeader>
      <CardContent id="flags-content" data-component="FlagBoard" className="flex flex-col gap-4">
        <p
          id="flags-progress"
          data-component="FlagBoard"
          className="text-muted-foreground text-sm tabular-nums"
        >
          {t('flags.panel.progress', { solved: solved.size, total: flags.length })}
        </p>

        <ol id="flags-items" data-component="FlagBoard" className="flex flex-col gap-3">
          {flags.map((flag, index) => (
            <FlagRow
              key={flag.id}
              block="flags"
              flag={flag}
              index={index}
              solved={solved.has(flag.id)}
              onSolved={() => markSolved(flag.id)}
            />
          ))}
        </ol>
      </CardContent>
    </Card>
  )
}
