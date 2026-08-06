import { useState, type FormEvent } from 'react'
import { useTranslation } from 'react-i18next'
import { Badge } from '@/shared/components/ui/badge'
import { Button } from '@/shared/components/ui/button'
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/shared/components/ui/card'
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
import type { FlagSpec } from './flags'

/**
 * What one board needs to be itself. Step 2 has two of them, so the mechanics live here and a
 * caller is a list of flags, a salt, a storage key and the block its element ids are built from.
 * That is the same move `ConnectBoard` and `TaskCard` made when a second caller arrived: anything
 * about how a board *behaves* belongs in here, so a student who learned the interaction on one
 * board meets the same one on the other.
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
    <Card id={block} data-component="FlagBoard" data-state={solved.size === flags.length ? 'complete' : 'partial'}>
      <CardHeader id={`${block}-header`} data-component="FlagBoard">
        <CardTitle id={`${block}-title`} data-component="FlagBoard">
          {text(`${panel}.title`)}
        </CardTitle>
        <CardDescription id={`${block}-description`} data-component="FlagBoard">
          {text(`${panel}.description`)}
        </CardDescription>
      </CardHeader>
      <CardContent id={`${block}-content`} data-component="FlagBoard" className="flex flex-col gap-4">
        <p
          id={`${block}-progress`}
          data-component="FlagBoard"
          className="text-muted-foreground text-sm tabular-nums"
        >
          {t(`${panel}.progress`, { solved: solved.size, total: flags.length })}
        </p>

        <ol id={`${block}-items`} data-component="FlagBoard" className="flex flex-col gap-3">
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
        </ol>
      </CardContent>
    </Card>
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

  async function onSubmit(event: FormEvent) {
    event.preventDefault()
    setState('checking')
    const digest = await sha256Hex(salt + value.trim())
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
      <div id={`${block}-item-${index}-heading`} data-component="FlagRow" className="flex items-center justify-between gap-3">
        <span id={`${block}-item-${index}-label`} data-component="FlagRow" className="font-medium">
          {text(flag.labelKey)}
        </span>
        <div id={`${block}-item-${index}-heading-actions`} data-component="FlagRow" className="flex items-center gap-2">
          {solved && (
            <Badge
              id={`${block}-item-${index}-badge`}
              data-component="FlagRow"
              variant="success"
            >
              {text(`${panel}.solved`)}
            </Badge>
          )}
          <Dialog>
            <DialogTrigger asChild>
              <Button
                id={`${block}-item-${index}-help`}
                data-component="FlagRow"
                type="button"
                variant="ghost"
                size="sm"
                className="text-muted-foreground"
              >
                {text(`${panel}.hint`)}
              </Button>
            </DialogTrigger>
            <DialogContent
              id={`${block}-item-${index}-help-dialog`}
              data-component="FlagRow"
            >
              <DialogHeader id={`${block}-item-${index}-help-dialog-header`} data-component="FlagRow">
                <DialogTitle id={`${block}-item-${index}-help-dialog-title`} data-component="FlagRow">
                  {text(flag.labelKey)}
                </DialogTitle>
                <DialogDescription id={`${block}-item-${index}-help-dialog-body`} data-component="FlagRow">
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
            placeholder={text(`${panel}.placeholder`)}
            aria-label={text(flag.labelKey)}
            className="field h-9 w-full max-w-xs"
          />
          <Button
            id={`${block}-item-${index}-submit`}
            data-component="FlagRow"
            type="submit"
            disabled={state === 'checking' || value.trim() === ''}
          >
            {text(`${panel}.check`)}
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
          {text(`${panel}.wrong`)}
        </p>
      )}
    </li>
  )
}
