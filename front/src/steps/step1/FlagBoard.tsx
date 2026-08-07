import { useState } from 'react'
import { useTranslation } from 'react-i18next'
import { Board, PanelNote } from '@/shared/components/Panel'
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
 * The rows themselves are {@link FlagRow}, shared with `ShutterFlag` in `tools`, and the drawing
 * around them is `Board` in `shared/components/`. What is left here is the data and the two things a
 * one-row board has no use for: the five-of-five counter, which rides in the board's eyebrow, and
 * the line that closes the hunt once all five are in.
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

  const complete = solved.size === flags.length

  return (
    <Board
      block="flags"
      state={complete ? 'complete' : 'partial'}
      // The counter is the board's eyebrow rather than a line of its own under the intro: it is the
      // one thing on the page that changes as the student works, so it belongs where a section
      // label belongs, over the title and running into the rule.
      eyebrow={t('flags.panel.progress', { solved: solved.size, total: flags.length })}
      title={text('flags.panel.title')}
      description={text('flags.panel.description')}
      note={
        /*
          The capstone used to end on a bare count collected and nothing else, which is a counter
          rather than a close. This line says what the five together proved, which is the provenance
          eyebrow on every row read as one sentence: the student has just answered `truth`'s question
          by doing it five times. It is the `--success` tint a solved row already wears, drawn as the
          same left-rule note a wrong paste is drawn as, on the flatness rule: no shadow, no panel
          that floats, no second voice. And it **states what was proved and stops**. It carries no
          pointer at `recap` and none at step 2: the unit's closing section was deliberately deleted,
          the step no longer ends on this page, and a forward pointer here puts it back.
        */
        complete ? (
          <PanelNote id="flags-complete" tone="success">
            {text('flags.panel.complete')}
          </PanelNote>
        ) : undefined
      }
    >
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
    </Board>
  )
}
