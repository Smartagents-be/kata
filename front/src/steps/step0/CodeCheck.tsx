import { LightbulbIcon } from 'lucide-react'
import { useState, type ClipboardEvent, type FormEvent } from 'react'
import { Badge } from '@/shared/components/ui/badge'
import { Button } from '@/shared/components/ui/button'
import {
  Card,
  CardContent,
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
 * An answer box for one code. The same salted-hash check as step 2's flag board, shrunk to a single
 * code, so the student meets the mechanism twice in the intro before the real steps. Nothing here
 * talks to the service: it hashes what you type and compares, so it works with the backend down.
 *
 * The `code` prop decides which code it grades and which block of locale keys it reads its wording
 * from, so the same component serves every intro box. When more than one box sits on the same page,
 * pass a distinct `idBase` so their ids and dialog stay unique; it defaults to `code-check`.
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

  /** This box's id for a part, e.g. `code-check-header`, so two boxes on a page do not collide. */
  function eid(part = '') {
    return part ? `${idBase}-${part}` : idBase
  }

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
  // away rather than making them reach for Check; anything else pastes normally.
  function onPaste(event: ClipboardEvent<HTMLInputElement>) {
    const pasted = event.clipboardData.getData('text').trim()
    if (/^\{.+\}$/.test(pasted)) {
      event.preventDefault()
      setValue(pasted)
      void verify(pasted)
    }
  }

  return (
    <Card
      id={eid()}
      data-component="CodeCheck"
      data-state={solved ? 'solved' : 'locked'}
      className="my-8"
    >
      <CardHeader id={eid('header')} data-component="CodeCheck">
        <div
          id={eid('heading')}
          data-component="CodeCheck"
          className="flex items-center justify-between gap-3"
        >
          <CardTitle id={eid('title')} data-component="CodeCheck">
            {text(key('title'))}
          </CardTitle>
          <div id={eid('actions')} data-component="CodeCheck" className="flex items-center gap-2">
            {solved && (
              <Badge
                id={eid('badge')}
                data-component="CodeCheck"
                variant="success"
              >
                {text(key('solved'))}
              </Badge>
            )}
            <Dialog>
              <DialogTrigger asChild>
                <Button
                  id={eid('help')}
                  data-component="CodeCheck"
                  type="button"
                  variant="outline"
                  size="sm"
                  className="text-muted-foreground"
                >
                  <LightbulbIcon
                    id={eid('help-icon')}
                    data-component="CodeCheck"
                    aria-hidden
                    className="text-yellow-500"
                  />
                  {text(key('hint-button'))}
                </Button>
              </DialogTrigger>
              <DialogContent id={eid('help-dialog')} data-component="CodeCheck">
                <DialogHeader id={eid('help-dialog-header')} data-component="CodeCheck">
                  <DialogTitle id={eid('help-dialog-title')} data-component="CodeCheck">
                    {text(key('label'))}
                  </DialogTitle>
                  <DialogDescription id={eid('help-dialog-body')} data-component="CodeCheck">
                    {text(key('help'))}
                  </DialogDescription>
                </DialogHeader>
              </DialogContent>
            </Dialog>
          </div>
        </div>
      </CardHeader>

      <CardContent id={eid('content')} data-component="CodeCheck" className="flex flex-col gap-3">
        <p
          id={eid('hint')}
          data-component="CodeCheck"
          className={cn(
            'text-sm',
            solved ? 'text-success-foreground' : 'text-muted-foreground',
          )}
        >
          {text(key(solved ? 'done' : 'hint'))}
        </p>

        {solved
          ? value && (
              // Once cleared, keep the answer on screen read-only rather than dropping the field, so
              // the box still shows what solved it.
              <input
                id={eid('input')}
                data-component="CodeCheck"
                value={value}
                readOnly
                spellCheck={false}
                aria-label={text(key('label'))}
                className="field h-9 w-full max-w-xs text-success-foreground"
              />
            )
          : (
            <form
              id={eid('form')}
              data-component="CodeCheck"
              onSubmit={onSubmit}
              className="flex items-center gap-2"
            >
              <input
                id={eid('input')}
                data-component="CodeCheck"
                value={value}
                onChange={(event) => {
                  setValue(event.target.value)
                  if (state === 'wrong') {
                    setState('idle')
                  }
                }}
                onPaste={onPaste}
                spellCheck={false}
                placeholder={text(key('placeholder'))}
                aria-label={text(key('label'))}
                className="field h-9 w-full max-w-xs"
              />
              <Button
                id={eid('submit')}
                data-component="CodeCheck"
                type="submit"
                disabled={state === 'checking' || value.trim() === ''}
              >
                {text(key('check'))}
              </Button>
            </form>
          )}

        {state === 'wrong' && (
          <p
            id={eid('error')}
            data-component="CodeCheck"
            role="status"
            className="text-destructive text-sm"
          >
            {text(key('wrong'))}
          </p>
        )}
      </CardContent>
    </Card>
  )
}
