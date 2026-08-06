import { LightbulbIcon } from 'lucide-react'
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
 * the price is a file that reads like its neighbour.
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
    <Card
      id="flags"
      data-component="FlagBoard"
      data-state={solved.size === flags.length ? 'complete' : 'partial'}
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

/**
 * One graded flag: a label, the line saying which run prints it, a hint behind a dialog, and a box
 * to paste into. The Hint button is `CodeCheck`'s, outline and lightbulb and all, because that is
 * the button the student pressed two pages ago.
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
      <div
        id={`flags-item-${index}-heading`}
        data-component="FlagRow"
        className="flex items-center justify-between gap-3"
      >
        <span id={`flags-item-${index}-label`} data-component="FlagRow" className="font-medium">
          {text(flag.labelKey)}
        </span>
        <div
          id={`flags-item-${index}-heading-actions`}
          data-component="FlagRow"
          className="flex items-center gap-2"
        >
          {solved && (
            <Badge id={`flags-item-${index}-badge`} data-component="FlagRow" variant="success">
              {text('flags.panel.solved')}
            </Badge>
          )}
          <Dialog>
            <DialogTrigger asChild>
              <Button
                id={`flags-item-${index}-help`}
                data-component="FlagRow"
                type="button"
                variant="outline"
                size="sm"
                className="text-muted-foreground"
              >
                <LightbulbIcon
                  id={`flags-item-${index}-help-icon`}
                  data-component="FlagRow"
                  aria-hidden
                  className="text-yellow-500"
                />
                {text('flags.panel.hint')}
              </Button>
            </DialogTrigger>
            <DialogContent id={`flags-item-${index}-help-dialog`} data-component="FlagRow">
              <DialogHeader id={`flags-item-${index}-help-dialog-header`} data-component="FlagRow">
                <DialogTitle id={`flags-item-${index}-help-dialog-title`} data-component="FlagRow">
                  {text(flag.labelKey)}
                </DialogTitle>
                <DialogDescription
                  id={`flags-item-${index}-help-dialog-body`}
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
