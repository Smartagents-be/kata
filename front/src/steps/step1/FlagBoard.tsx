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
 * The workshop's flag board. Each row is one place an answer can come from, easiest first and
 * outside in: read what your own machine told the agent, read the running system, turn the log level
 * up, read the source, trace the run. Paste the flag you found and the row checks it here in the
 * browser, against a salted hash, so this half works with the backend down. Nothing here talks to
 * the service: the discovery already happened, and this only confirms you read what came back.
 *
 * The rows themselves are {@link FlagRow}, shared with `ShutterFlag` in `tools`. What is left here
 * is the board around them: the five-of-five counter and the line that closes the hunt once all five
 * are in, both of which a one-row board has no use for.
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

        {/*
          The capstone used to end on a bare count collected and nothing else, which is a counter
          rather than a close. This line says what the five together proved, which is the provenance
          eyebrow on every row read as one sentence: the student has just answered `truth`'s question
          by doing it five times. It is the `--success` tint a solved row already wears, on the
          flatness rule: no shadow, no panel that floats, no second voice. And it **states what was
          proved and stops**. It carries no pointer at `recap` and none at step 2: the unit's closing
          section was deliberately deleted, the step no longer ends on this page, and a forward
          pointer here puts it back.
        */}
        {solved.size === flags.length && (
          <p
            id="flags-complete"
            data-component="FlagBoard"
            role="status"
            className="border-success/30 bg-success/10 text-success-foreground rounded-xl border px-4 py-3 text-sm"
          >
            {text('flags.panel.complete')}
          </p>
        )}
      </CardContent>
    </Card>
  )
}
