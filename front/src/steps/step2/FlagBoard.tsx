import { useState, type ClipboardEvent, type FormEvent } from 'react'
import { useTranslation } from 'react-i18next'
import { Board, AnswerLine, PanelChip, PanelNote, BoardRow } from '@/shared/components/Panel'
import { useStepText } from '@/shared/i18n/useStepText'
import { isWholeFlag } from '@/shared/lib/flag-paste'
import { sha256Hex } from '@/shared/lib/hash'
import type { FlagSpec } from './flags'

/**
 * What one board needs to be itself. Step 2 has two of them, so the mechanics live here and a
 * caller is a list of flags, a salt, a storage key and the block its element ids are built from.
 * That is the same move `ConnectBoard` and `TaskCard` made when a second caller arrived: anything
 * about how a board *behaves* belongs in here, so a student who learned the interaction on one
 * board meets the same one on the other.
 *
 * How a board *looks* is one level up again, in `shared/components/Panel.tsx`, which every step's
 * board is drawn with. The split is worth keeping: this file is step 2's grading, that one is the
 * course's vocabulary, and a change to either should not have to touch the other.
 */
export interface FlagBoardProps {
  /** BEM block for every id inside the drawing, e.g. `flags` or `setup-flags`. */
  block: string
  /** localStorage key holding the solved ids. Must start `kata.step2.` so a reset clears it. */
  storageKey: string
  /** The salt the pasted flag is hashed with. One per exercise, so a digest is not portable. */
  salt: string
  flags: FlagSpec[]
  /** Message-key prefix for the panel's own words, e.g. `workshop.panel`. */
  panel: string
}

/** Which flags this browser has already solved. Kept so a page reload does not lose the collection. */
function readSolved(storageKey: string): Set<string> {
  try {
    const raw = localStorage.getItem(storageKey)
    return new Set(raw ? (JSON.parse(raw) as string[]) : [])
  } catch {
    return new Set()
  }
}

function writeSolved(storageKey: string, solved: Set<string>) {
  try {
    localStorage.setItem(storageKey, JSON.stringify([...solved]))
  } catch {
    // A browser with storage blocked still grades in memory; it just forgets on reload.
  }
}

/**
 * Fired on `window` whenever a row goes green, carrying the storage key that changed. The board
 * still owns the progress and still writes it to localStorage; this only lets something else on the
 * same page notice. `RunSheet` is the one listener, and it re-reads the key rather than trusting the
 * event's payload, so a listener can never end up holding a different set from the board. The
 * `storage` event would not do this job: it fires in *other* tabs only.
 */
export const FLAGS_CHANGED_EVENT = 'kata:flags-changed'

/**
 * A board of flags, graded in the browser against a salted hash so it works with the backend down.
 * Nothing here talks to the service: the work already happened outside the app, and the board only
 * confirms the student read what it produced.
 */
export function FlagBoard({ block, storageKey, salt, flags, panel }: FlagBoardProps) {
  const { text } = useStepText('step2')
  const { t } = useTranslation('step2')
  const [solved, setSolved] = useState<Set<string>>(() => readSolved(storageKey))

  function markSolved(id: string) {
    setSolved((current) => {
      const next = new Set(current).add(id)
      writeSolved(storageKey, next)
      window.dispatchEvent(new CustomEvent(FLAGS_CHANGED_EVENT, { detail: storageKey }))
      return next
    })
  }

  return (
    <Board
      block={block}
      state={solved.size === flags.length ? 'complete' : 'partial'}
      eyebrow={t(`${panel}.progress`, { solved: solved.size, total: flags.length })}
      title={text(`${panel}.title`)}
      description={text(`${panel}.description`)}
    >
      {flags.map((flag, index) => (
        <FlagRow
          key={flag.id}
          block={block}
          panel={panel}
          salt={salt}
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

function FlagRow({
  block,
  panel,
  salt,
  flag,
  index,
  solved,
  onSolved,
}: {
  block: string
  panel: string
  salt: string
  flag: FlagSpec
  index: number
  solved: boolean
  onSolved: () => void
}) {
  const { text } = useStepText('step2')
  const [value, setValue] = useState('')
  const [state, setState] = useState<RowState>('idle')

  async function verify(raw: string) {
    setState('checking')
    const digest = await sha256Hex(salt + raw.trim())
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
  // there and then rather than making the student reach for Check, which is the interaction every
  // other answer box in the course has. Anything else pastes normally.
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
      block={block}
      index={index}
      state={solved ? 'solved' : 'locked'}
      solved={solved}
      title={text(flag.labelKey)}
      chip={
        solved ? (
          <PanelChip id={`${block}-item-${index}-badge`}>{text(`${panel}.solved`)}</PanelChip>
        ) : undefined
      }
      body={text(flag.hintKey)}
    >
      {!solved && (
        <AnswerLine
          idBase={`${block}-item-${index}`}
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
          placeholder={text(`${panel}.placeholder`)}
          checkLabel={text(`${panel}.check`)}
          hintLabel={text(`${panel}.hint`)}
          helpTitle={text(flag.labelKey)}
          helpBody={text(flag.helpKey)}
        />
      )}

      {state === 'wrong' && (
        <PanelNote id={`${block}-item-${index}-error`} tone="destructive">
          {text(`${panel}.wrong`)}
        </PanelNote>
      )}
    </BoardRow>
  )
}
