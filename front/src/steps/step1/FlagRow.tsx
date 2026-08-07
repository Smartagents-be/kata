import { LightbulbIcon } from 'lucide-react'
import { useState, type ClipboardEvent, type FormEvent } from 'react'
import { Badge } from '@/shared/components/ui/badge'
import { Button } from '@/shared/components/ui/button'
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/shared/components/ui/dialog'
import { useAssistant } from '@/shared/assistant/useAssistant'
import { useStepText } from '@/shared/i18n/useStepText'
import { isWholeFlag } from '@/shared/lib/flag-paste'
import { sha256Hex } from '@/shared/lib/hash'
import { cn } from '@/shared/lib/utils'
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
 * exercise: `FlagBoard` closes `workshop` with four rows, `ShutterFlag` sits under the browser task
 * in `tools` with one. Anything about how a row behaves goes here rather than in a caller, the same
 * move `TaskCard` and `ConnectBoard` made when their second caller arrived.
 *
 * The Hint button is step 0's `CodeCheck` button, outline and lightbulb and all, because a student
 * meets that one in the intro and this is the same offer made again. It is also the only affordance
 * on the row that is not the answer box, so it has to be findable without reading it: the aside that
 * used to carry the deep hints above the workshop board is gone, and the dialog is where they live.
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
    <li
      id={`${block}-item-${index}`}
      data-component="FlagRow"
      data-state={solved ? 'solved' : 'locked'}
      className={cn(
        'rounded-xl border px-4 py-3',
        solved ? 'border-success/30 bg-success/10' : 'border-border',
      )}
    >
      <div
        id={`${block}-item-${index}-heading`}
        data-component="FlagRow"
        className="flex items-center justify-between gap-3"
      >
        <div id={`${block}-item-${index}-name`} data-component="FlagRow">
          {flag.placeKey && (
            <p
              id={`${block}-item-${index}-place`}
              data-component="FlagRow"
              className="eyebrow text-muted-foreground"
            >
              {text(flag.placeKey)}
            </p>
          )}
          <span id={`${block}-item-${index}-label`} data-component="FlagRow" className="font-medium">
            {text(flag.labelKey)}
          </span>
        </div>
        <div
          id={`${block}-item-${index}-heading-actions`}
          data-component="FlagRow"
          className="flex items-center gap-2"
        >
          {solved && (
            <Badge id={`${block}-item-${index}-badge`} data-component="FlagRow" variant="success">
              {text('flags.panel.solved')}
            </Badge>
          )}
          <Dialog>
            <DialogTrigger asChild>
              <Button
                id={`${block}-item-${index}-help`}
                data-component="FlagRow"
                type="button"
                variant="outline"
                size="sm"
                className="text-muted-foreground"
              >
                <LightbulbIcon
                  id={`${block}-item-${index}-help-icon`}
                  data-component="FlagRow"
                  aria-hidden
                  className="text-yellow-500"
                />
                {text('flags.panel.hint')}
              </Button>
            </DialogTrigger>
            <DialogContent id={`${block}-item-${index}-help-dialog`} data-component="FlagRow">
              <DialogHeader
                id={`${block}-item-${index}-help-dialog-header`}
                data-component="FlagRow"
              >
                <DialogTitle
                  id={`${block}-item-${index}-help-dialog-title`}
                  data-component="FlagRow"
                >
                  {text(flag.labelKey)}
                </DialogTitle>
                <DialogDescription
                  id={`${block}-item-${index}-help-dialog-body`}
                  data-component="FlagRow"
                >
                  {text(keyFor(flag.helpKey, assistant))}
                </DialogDescription>
              </DialogHeader>
            </DialogContent>
          </Dialog>
        </div>
      </div>

      <p
        id={`${block}-item-${index}-hint`}
        data-component="FlagRow"
        className="text-muted-foreground mt-1 text-sm"
      >
        {text(flag.hintKey)}
      </p>

      {!solved && (
        <form
          id={`${block}-item-${index}-form`}
          data-component="FlagRow"
          onSubmit={onSubmit}
          className="mt-3 flex items-center gap-2"
        >
          <input
            id={`${block}-item-${index}-input`}
            data-component="FlagRow"
            value={value}
            onChange={(event) => {
              setValue(event.target.value)
              if (state === 'wrong') {
                setState('idle')
              }
            }}
            onPaste={onPaste}
            spellCheck={false}
            placeholder={text('flags.panel.placeholder')}
            aria-label={text(flag.labelKey)}
            className="field h-9 w-full max-w-xs"
          />
          <Button
            id={`${block}-item-${index}-submit`}
            data-component="FlagRow"
            type="submit"
            disabled={state === 'checking' || value.trim() === ''}
          >
            {text('flags.panel.check')}
          </Button>
        </form>
      )}

      {state === 'wrong' && (
        <p
          id={`${block}-item-${index}-error`}
          data-component="FlagRow"
          role="status"
          className="text-destructive mt-2 text-sm"
        >
          {text(flag.wrongKey ?? 'flags.panel.wrong')}
        </p>
      )}
    </li>
  )
}
