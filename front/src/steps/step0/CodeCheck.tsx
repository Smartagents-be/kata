import { useState, type ClipboardEvent, type FormEvent } from 'react'
import { AnswerLine, Board, BoardRow, PanelChip, PanelNote } from '@/shared/components/Panel'
import { useStepText } from '@/shared/i18n/useStepText'
import { isWholeFlag } from '@/shared/lib/flag-paste'
import { sha256Hex } from '@/shared/lib/hash'
import { CODE_SALT, type CodeSpec } from './code'

/**
 * The code this browser cleared the box with, or `null` if it has not. Kept so a reload shows the
 * answer still sitting in the field. The `v2` in the key retires the old markers, which only stored
 * `'true'` and so had no answer to show back.
 */
function readSolved(key: string): string | null {
  try {
    return localStorage.getItem(key)
  } catch {
    return null
  }
}

function writeSolved(key: string, code: string) {
  try {
    localStorage.setItem(key, code)
  } catch {
    // A browser with storage blocked still grades in memory; it just forgets on reload.
  }
}

type BoxState = 'idle' | 'checking' | 'wrong'

/**
 * An answer box for one code. The same salted-hash check as the workshop's flag board, shrunk to a
 * single code, so the student meets the mechanism twice in the intro before the real steps. Nothing
 * here talks to the service: it hashes what you type and compares, so it works with the backend
 * down.
 *
 * **It is drawn as a one-row board**, `Board` and `BoardRow` from `shared/components/Panel.tsx`,
 * which are the same two components `FlagBoard` composes a page later. So a student meets the
 * drawing at the same time as the mechanism, and the intro's box and the board they hunt against
 * are one thing wearing two labels rather than two shapes to learn. The numeral it inherits says
 * nothing on a list of one, and that is the price: what it buys is that nothing about the board is
 * new when the student reaches it. It replaced a `Card`, which was the last block in the course a
 * student worked in that still had a box drawn round it; the flatness rule is in `front/CLAUDE.md`
 * and in `Panel.tsx`, and this must not go back.
 *
 * Two consequences of that move worth knowing. **The hint sits in the answer line** rather than up
 * in a header, which is where a board row keeps it, so it leaves with the field once the row is
 * captured; `hint.panel.done` still tells the student the button is there whenever a box has them
 * stuck, and it is now saying that about the boxes ahead rather than about the one it is on. And
 * the ids moved down a level with the row: this box's field is `#code-check-item-0-input`.
 *
 * The `code` prop decides which code it grades and which block of locale keys it reads its wording
 * from, so the same component serves every intro box. When more than one box sits on the same page,
 * pass a distinct `idBase` so their ids stay unique; it defaults to `code-check`.
 */
export function CodeCheck({ code, idBase = 'code-check' }: { code: CodeSpec; idBase?: string }) {
  const { text } = useStepText('step0')
  const storageKey = `kata.step0.${code.id}.v2`
  const stored = readSolved(storageKey)
  const [solved, setSolved] = useState(() => stored !== null)
  // A solved box stored the code it was cleared with, so show it back in the field.
  const [value, setValue] = useState(() => stored ?? '')
  const [state, setState] = useState<BoxState>('idle')

  function key(part: string) {
    return `${code.keyBase}.${part}`
  }

  /** The row's id base, which everything inside the board's one row hangs off. */
  const row = `${idBase}-item-0`

  async function verify(candidate: string) {
    setState('checking')
    const trimmed = candidate.trim()
    const digest = await sha256Hex(CODE_SALT + trimmed)
    if (digest === code.hash) {
      writeSolved(storageKey, trimmed)
      setValue(trimmed)
      setSolved(true)
    } else {
      setState('wrong')
    }
  }

  async function onSubmit(event: FormEvent) {
    event.preventDefault()
    await verify(value)
  }

  // A code always looks like {…}. When the student pastes something in that shape, grade it straight
  // away rather than making them reach for Check; anything else pastes normally. `isWholeFlag` is
  // the shared test, so this box and the three flag boards agree on what counts as an answer.
  function onPaste(event: ClipboardEvent<HTMLInputElement>) {
    const pasted = event.clipboardData.getData('text').trim()
    if (isWholeFlag(pasted)) {
      event.preventDefault()
      setValue(pasted)
      void verify(pasted)
    }
  }

  return (
    // No eyebrow: a counter over one row would be counting to one. The rule then runs the full
    // width, which is the same gesture with nothing on it.
    <Board
      block={idBase}
      state={solved ? 'complete' : 'partial'}
      title={text(key('title'))}
    >
      <BoardRow
        block={idBase}
        index={0}
        state={solved ? 'solved' : 'locked'}
        solved={solved}
        title={text(key('label'))}
        chip={solved ? <PanelChip id={`${row}-badge`}>{text(key('solved'))}</PanelChip> : undefined}
        body={text(key(solved ? 'done' : 'hint'))}
      >
        {solved
          ? value && (
              // A captured board row drops its field. This one keeps the answer on screen read-only
              // instead, because the intro's boxes are what a student looks back at to see what the
              // shape of an answer was, and the row is tinted the way a solved row is either way.
              <input
                id={`${row}-input`}
                data-component="CodeCheck"
                value={value}
                readOnly
                spellCheck={false}
                aria-label={text(key('label'))}
                className="field border-success/30 bg-success/8 text-success-foreground mt-3.5 h-9.5 w-full max-w-xs"
              />
            )
          : (
            <AnswerLine
              idBase={row}
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
              label={text(key('label'))}
              placeholder={text(key('placeholder'))}
              checkLabel={text(key('check'))}
              hintLabel={text(key('hint-button'))}
              helpTitle={text(key('label'))}
              helpBody={text(key('help'))}
            />
          )}

        {state === 'wrong' && (
          <PanelNote id={`${row}-error`} tone="destructive">
            {text(key('wrong'))}
          </PanelNote>
        )}
      </BoardRow>
    </Board>
  )
}
