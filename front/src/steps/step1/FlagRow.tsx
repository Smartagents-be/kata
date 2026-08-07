import { useState, type ClipboardEvent, type FormEvent } from 'react'
import { AnswerLine, PanelChip, PanelNote, BoardRow } from '@/shared/components/Panel'
import { useAssistant } from '@/shared/assistant/useAssistant'
import { useStepText } from '@/shared/i18n/useStepText'
import { isWholeFlag } from '@/shared/lib/flag-paste'
import { sha256Hex } from '@/shared/lib/hash'
import { FLAG_SALT, keyFor, type FlagSpec } from './flags'

type RowState = 'idle' | 'checking' | 'wrong'

/**
 * The values a paste is checked against, in order, starting with the exact trimmed one. Everything
 * after that is a **typing slip and never a hint**: the value pasted inside quotes or backticks, the
 * braces left off, one sentence mark typed after it, the case it was read in. A student who found
 * the right flag and typed it without its braces did the work, and sending them back to redo it
 * teaches nothing.
 *
 * The case repair is the newest of them and it is a slip like the rest. `system` is read off nine
 * Title Case book titles, so it arrives uppercase, while every flag in the course is lowercase. It
 * composes with the brace step below it, which is the point: the value is folded first and wrapped
 * after, so a student who typed the letters with no braces at all still lands.
 *
 * **Nothing in here may pull a flag out of a larger paste, and nothing runs at all once the trimmed
 * value still holds whitespace inside it.** That is the constraint, and it is load bearing rather
 * than an oversight. `flag.trace.help` says five leetspoken lines come out of the trace and only one
 * of them is the answer, and it closes on "your agent cannot pick; you can". A board that found the
 * winning `{...}` inside a pasted trace dump would make that pick for the student, and that pick is
 * the best moment in the step. Do not add a substring match, a regex over the whole value, or a
 * split on newlines.
 */
function candidates(raw: string): string[] {
  const trimmed = raw.trim()
  if (trimmed === '' || /\s/.test(trimmed)) {
    return [trimmed]
  }

  const tried = new Set<string>([trimmed])

  // Pasted with the quotes or backticks it was wrapped in on screen.
  tried.add(trimmed.replace(/^["'`]+/, '').replace(/["'`]+$/, ''))

  // One trailing sentence mark, typed after it out of habit.
  for (const value of [...tried]) {
    tried.add(value.replace(/[.,;:!?]$/, ''))
  }

  // Typed in the case it was read in. Flags are lowercase everywhere in the course.
  for (const value of [...tried]) {
    tried.add(value.toLowerCase())
  }

  // The braces left off. Never added around a value that already carries one.
  for (const value of [...tried]) {
    if (!value.includes('{') && !value.includes('}')) {
      tried.add(`{${value}}`)
    }
  }

  return [...tried].filter((value) => value !== '')
}

/**
 * One graded flag: a label, the line saying how to reach it, a hint behind a dialog, and a box to
 * paste into. The check is a salted SHA-256 done here in the browser, so every board built from
 * these rows works with the backend down.
 *
 * It is its own module because step 1 grades flags in two places now, and they are not the same
 * exercise: `FlagBoard` closes `workshop` with five rows, `ShutterFlag` sits under the browser task
 * in `tools` with one. **What this file owns is step 1's grading and nothing else.** The drawing is
 * `BoardRow`, `AnswerLine`, `PanelChip` and `PanelNote` in `shared/components/Panel.tsx`, shared
 * with every other board in the course, so a student who learned to read one reads all of them the
 * same way. Anything about how a step 1 row *grades* goes here; anything about how a row *looks*
 * goes in `Panel.tsx`, where the other three steps get it too.
 *
 * `block` is the BEM block the ids are built from, so the workshop's rows stay `#flags-item-N` and
 * nothing that pointed at them moved.
 *
 * The row wears its flag's provenance as an eyebrow above the label, from `flag.placeKey`, because
 * that sort is the whole argument of the workshop board and it used to be readable only inside the
 * three Hint dialogs. It is optional, and a flag without one renders no eyebrow: `shutterFlag` is
 * not one of the board's five places. `flag.wrongKey` is the same shape, since "go back to the
 * pipeline" is true of one row out of six across the two boards.
 *
 * The Hint dialog is the one thing on a row that may vary by assistant, so the row reads
 * `useAssistant()` itself rather than taking a resolved key from a caller: that is the rule in
 * `front/CLAUDE.md`, and it keeps `FlagBoard` a list of specs. Only `machine` uses it, whose path
 * and command differ between the two products; `keyFor` hands back the plain key for every other
 * row.
 */
export function FlagRow({
  block,
  flag,
  index,
  solved,
  onSolved,
}: {
  block: string
  flag: FlagSpec
  index: number
  solved: boolean
  onSolved: () => void
}) {
  const { text } = useStepText('step1')
  const { assistant } = useAssistant()
  const [value, setValue] = useState('')
  const [state, setState] = useState<RowState>('idle')

  async function verify(raw: string) {
    setState('checking')
    for (const candidate of candidates(raw)) {
      if ((await sha256Hex(FLAG_SALT + candidate)) === flag.hash) {
        onSolved()
        return
      }
    }
    setState('wrong')
  }

  async function onSubmit(event: FormEvent) {
    event.preventDefault()
    await verify(value)
  }

  /**
   * A flag always looks like `{…}`. A paste of exactly that shape is an answer being handed over
   * rather than a field being edited, so the row grades it there and then instead of making the
   * student reach for Check; `CodeCheck` does the same in the intro, so the interaction is met once
   * and repeated. Anything else pastes the ordinary way.
   *
   * **It is the same constraint `candidates()` above is under**, and `isWholeFlag` is where that is
   * written up: the test is on the whole trimmed paste, so a pasted trace dump holding the winning
   * `{...}` among five is not one, and picking the winner stays the student's.
   */
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
      eyebrow={flag.placeKey ? text(flag.placeKey) : undefined}
      title={text(flag.labelKey)}
      chip={
        solved ? (
          <PanelChip id={`${block}-item-${index}-badge`}>{text('flags.panel.solved')}</PanelChip>
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
          placeholder={text('flags.panel.placeholder')}
          checkLabel={text('flags.panel.check')}
          hintLabel={text('flags.panel.hint')}
          helpTitle={text(flag.labelKey)}
          helpBody={text(keyFor(flag.helpKey, assistant))}
        />
      )}

      {state === 'wrong' && (
        <PanelNote id={`${block}-item-${index}-error`} tone="destructive">
          {text(flag.wrongKey ?? 'flags.panel.wrong')}
        </PanelNote>
      )}
    </BoardRow>
  )
}
