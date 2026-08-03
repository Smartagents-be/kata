import { LightbulbIcon } from 'lucide-react'
import { useState, type FormEvent } from 'react'
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
import { useStepText } from '@/shared/i18n/useStepText'
import { sha256Hex } from '@/shared/lib/hash'
import { cn } from '@/shared/lib/utils'
import { FLAG_SALT, type FlagSpec } from './flags'

type RowState = 'idle' | 'checking' | 'wrong'

/**
 * One graded flag: a label, the line saying how to reach it, a hint behind a dialog, and a box to
 * paste into. The check is a salted SHA-256 done here in the browser, so every board built from
 * these rows works with the backend down.
 *
 * It is its own module because step 1 grades flags in two places now, and they are not the same
 * exercise: `FlagBoard` closes `workshop` with three rows, `ShutterFlag` sits under the browser task
 * in `tools` with one. Anything about how a row behaves goes here rather than in a caller, the same
 * move `TaskCard` and `ConnectBoard` made when their second caller arrived.
 *
 * The Hint button is step 0's `CodeCheck` button, outline and lightbulb and all, because a student
 * meets that one in the intro and this is the same offer made again. It is also the only affordance
 * on the row that is not the answer box, so it has to be findable without reading it: the aside that
 * used to carry the deep hints above the workshop board is gone, and the dialog is where they live.
 *
 * `block` is the BEM block the ids are built from, so the workshop's rows stay `#flags-item-N` and
 * nothing that pointed at them moved. `wrongKey` is a prop because the message names where to go
 * back to, and a row that sends a student back to the pipeline is wrong on a board about a browser.
 */
export function FlagRow({
  block,
  flag,
  index,
  solved,
  wrongKey = 'flags.panel.wrong',
  onSolved,
}: {
  block: string
  flag: FlagSpec
  index: number
  solved: boolean
  wrongKey?: string
  onSolved: () => void
}) {
  const { text } = useStepText('step1')
  const [value, setValue] = useState('')
  const [state, setState] = useState<RowState>('idle')

  async function onSubmit(event: FormEvent) {
    event.preventDefault()
    setState('checking')
    const digest = await sha256Hex(FLAG_SALT + value.trim())
    if (digest === flag.hash) {
      onSolved()
    } else {
      setState('wrong')
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
        <span id={`${block}-item-${index}-label`} data-component="FlagRow" className="font-medium">
          {text(flag.labelKey)}
        </span>
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
                  {text(flag.helpKey)}
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
          {text(wrongKey)}
        </p>
      )}
    </li>
  )
}
