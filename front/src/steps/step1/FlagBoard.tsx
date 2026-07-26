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
import { FLAG_SALT, flags, type FlagSpec } from './flags'

const STORAGE_KEY = 'kata.step1.flags'

/** Which flags this browser has already solved. Kept so a page reload does not lose the collection. */
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
 * The workshop's flag board. Each row is one way the step 1 backend hides a value from the
 * response: read the source, trace the run, or turn the log level up. Paste the flag you found and
 * the row checks it here in the browser, against a salted hash, so this half works with the backend
 * down. Nothing here talks to the service: the discovery already happened against the running
 * pipeline, and this only confirms you read what it was hiding.
 */
export function FlagBoard() {
  const { text } = useStepText('step1')
  const { t } = useTranslation('step1')
  const [solved, setSolved] = useState<Set<string>>(readSolved)

  function markSolved(id: string) {
    setSolved((current) => {
      const next = new Set(current).add(id)
      writeSolved(next)
      return next
    })
  }

  return (
    <Card id="flags" data-component="FlagBoard" data-state={solved.size === flags.length ? 'complete' : 'partial'}>
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
      id={`flags-item-${index}`}
      data-component="FlagRow"
      data-state={solved ? 'solved' : 'locked'}
      className={cn(
        'rounded-xl border px-4 py-3',
        solved ? 'border-success/30 bg-success/10' : 'border-border',
      )}
    >
      <div id={`flags-item-${index}-heading`} data-component="FlagRow" className="flex items-center justify-between gap-3">
        <span id={`flags-item-${index}-label`} data-component="FlagRow" className="font-medium">
          {text(flag.labelKey)}
        </span>
        <div id={`flags-item-${index}-heading-actions`} data-component="FlagRow" className="flex items-center gap-2">
          {solved && (
            <Badge
              id={`flags-item-${index}-badge`}
              data-component="FlagRow"
              variant="success"
            >
              {text('flags.panel.solved')}
            </Badge>
          )}
          <Dialog>
            <DialogTrigger asChild>
              <Button
                id={`flags-item-${index}-help`}
                data-component="FlagRow"
                type="button"
                variant="ghost"
                size="sm"
                className="text-muted-foreground"
              >
                {text('flags.panel.hint')}
              </Button>
            </DialogTrigger>
            <DialogContent
              id={`flags-item-${index}-help-dialog`}
              data-component="FlagRow"
            >
              <DialogHeader id={`flags-item-${index}-help-dialog-header`} data-component="FlagRow">
                <DialogTitle id={`flags-item-${index}-help-dialog-title`} data-component="FlagRow">
                  {text(flag.labelKey)}
                </DialogTitle>
                <DialogDescription id={`flags-item-${index}-help-dialog-body`} data-component="FlagRow">
                  {text(flag.helpKey)}
                </DialogDescription>
              </DialogHeader>
            </DialogContent>
          </Dialog>
        </div>
      </div>

      <p
        id={`flags-item-${index}-hint`}
        data-component="FlagRow"
        className="text-muted-foreground mt-1 text-sm"
      >
        {text(flag.hintKey)}
      </p>

      {!solved && (
        <form
          id={`flags-item-${index}-form`}
          data-component="FlagRow"
          onSubmit={onSubmit}
          className="mt-3 flex items-center gap-2"
        >
          <input
            id={`flags-item-${index}-input`}
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
            id={`flags-item-${index}-submit`}
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
          id={`flags-item-${index}-error`}
          data-component="FlagRow"
          role="status"
          className="text-destructive mt-2 text-sm"
        >
          {text('flags.panel.wrong')}
        </p>
      )}
    </li>
  )
}
