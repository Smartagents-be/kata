import { useState, type ClipboardEvent, type FormEvent } from 'react'
import { useTranslation } from 'react-i18next'
import { Board, AnswerLine, PanelChip, PanelNote, BoardRow } from '@/shared/components/Panel'
import { useStepText } from '@/shared/i18n/useStepText'
import { isWholeFlag } from '@/shared/lib/flag-paste'
import { sha256Hex } from '@/shared/lib/hash'
import { FLAG_SALT, flags, type FlagSpec } from './flags'

const STORAGE_KEY = 'kata.step0.flags'

/** Which flags this browser has already solved, kept so a reload does not lose the collection. */
function readSolved(): Set<string> {
  try {
    const raw = localStorage.getItem(STORAGE_KEY)
    return new Set(raw ? (JSON.parse(raw) as string[]) : [])
  } catch {
    return new Set()
  }
}

function writeSolved(solved: Set<string>) {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify([...solved]))
  } catch {
    // A browser with storage blocked still grades in memory; it just forgets on reload.
  }
}

/**
 * Step 0's workshop board. Three rows, one per run against `kata/step0/java`, checked here against a
 * salted SHA-256, so the intro grades with nothing else running. Nothing on it talks to a service:
 * step 0 has none, and the work already happened in the student's terminal.
 *
 * It is step 1's board written again rather than step 1's board imported, which is the same decision
 * the root `CLAUDE.md` records for the grading code in Java: a step owns what grades it, and steps do
 * not reach into each other. So the counter, the rows and the two storage helpers are all here, and
 * the price is a file that reads like its neighbour. **What is not duplicated is the drawing**: the
 * board and its rows come from `shared/components/Panel.tsx`, so the three boards in the course
 * cannot drift apart visually while each keeps its own grading. That is the line to hold when
 * anything here grows: behaviour per step, appearance shared.
 *
 * `STORAGE_KEY` sits under the `kata.step0.` prefix `shared/lib/reset.ts` clears by key shape, so a
 * student's reset takes the collection with the rest of their progress.
 */
export function FlagBoard() {
  const { text } = useStepText('step0')
  const { t } = useTranslation('step0')
  const [solved, setSolved] = useState<Set<string>>(readSolved)

  function markSolved(id: string) {
    setSolved((current) => {
      const next = new Set(current).add(id)
      writeSolved(next)
      return next
    })
  }

  return (
    <Board
      block="flags"
      state={solved.size === flags.length ? 'complete' : 'partial'}
      eyebrow={t('flags.panel.progress', { solved: solved.size, total: flags.length })}
      title={text('flags.panel.title')}
      description={text('flags.panel.description')}
    >
      {flags.map((flag, index) => (
        <FlagRow
          key={flag.id}
          flag={flag}
          index={index}
          solved={solved.has(flag.id)}
          onSolved={() => markSolved(flag.id)}
        />
      ))}
    </Board>
  )
}

type RowState = 'idle' | 'checking' | 'wrong'

/**
 * One graded flag: a label, the line saying which run prints it, a hint behind a dialog, and a box
 * to paste into. Everything visible is `BoardRow` and `AnswerLine`; what is here is the check.
 */
function FlagRow({
  flag,
  index,
  solved,
  onSolved,
}: {
  flag: FlagSpec
  index: number
  solved: boolean
  onSolved: () => void
}) {
  const { text } = useStepText('step0')
  const [value, setValue] = useState('')
  const [state, setState] = useState<RowState>('idle')

  async function verify(raw: string) {
    setState('checking')
    const digest = await sha256Hex(FLAG_SALT + raw.trim())
    if (digest === flag.hash) {
      onSolved()
    } else {
      setState('wrong')
    }
  }

  async function onSubmit(event: FormEvent) {
    event.preventDefault()
    await verify(value)
  }

  // A flag always looks like {…}. A paste in that shape is an answer being handed over, so grade it
  // there and then rather than making the student reach for Check, which is what `CodeCheck` does
  // two pages earlier. Anything else pastes normally.
  function onPaste(event: ClipboardEvent<HTMLInputElement>) {
    const pasted = event.clipboardData.getData('text').trim()
    if (isWholeFlag(pasted)) {
      event.preventDefault()
      setValue(pasted)
      void verify(pasted)
    }
  }

  return (
    <BoardRow
      block="flags"
      index={index}
      state={solved ? 'solved' : 'locked'}
      solved={solved}
      title={text(flag.labelKey)}
      chip={
        solved ? (
          <PanelChip id={`flags-item-${index}-badge`}>{text('flags.panel.solved')}</PanelChip>
        ) : undefined
      }
      body={text(flag.hintKey)}
    >
      {!solved && (
        <AnswerLine
          idBase={`flags-item-${index}`}
          value={value}
          onValueChange={(next) => {
            setValue(next)
            if (state === 'wrong') {
              setState('idle')
            }
          }}
          onPaste={onPaste}
          onSubmit={onSubmit}
          busy={state === 'checking'}
          label={text(flag.labelKey)}
          placeholder={text('flags.panel.placeholder')}
          checkLabel={text('flags.panel.check')}
          hintLabel={text('flags.panel.hint')}
          helpTitle={text(flag.labelKey)}
          helpBody={text(flag.helpKey)}
        />
      )}

      {state === 'wrong' && (
        <PanelNote id={`flags-item-${index}-error`} tone="destructive">
          {text('flags.panel.wrong')}
        </PanelNote>
      )}
    </BoardRow>
  )
}
