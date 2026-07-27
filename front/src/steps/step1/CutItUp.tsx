import { CheckIcon } from 'lucide-react'
import { useState } from 'react'
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/shared/components/ui/card'
import { useStepText } from '@/shared/i18n/useStepText'
import { cn } from '@/shared/lib/utils'

/**
 * The five moves over one problem, in the order they are taken. `compare` is the one that is not
 * work on the problem, and it is the reason the first two are separate moves rather than one.
 */
const MOVES = ['alone', 'agent', 'compare', 'plan', 'build'] as const

/**
 * Under the `kata.step1.` prefix, so the reset in the settings panel clears it with the rest of a
 * student's progress. See `shared/lib/reset.ts`.
 */
const STORAGE_KEY = 'kata.step1.cut'

function readDone(): boolean {
  try {
    return localStorage.getItem(STORAGE_KEY) === 'done'
  } catch {
    return false
  }
}

function writeDone(done: boolean) {
  try {
    if (done) {
      localStorage.setItem(STORAGE_KEY, 'done')
    } else {
      localStorage.removeItem(STORAGE_KEY)
    }
  } catch {
    // A browser refusing storage costs the tick, not the exercise.
  }
}

/**
 * The unit's hands-on task, on one card: `kata/step1/java/problem.md`, cut by hand, cut again with
 * the agent, the two cuts compared, then a plan on disk and the build.
 *
 * Six paragraphs said this once, and the compression is the point: the student reads the moves at a
 * glance and spends the time on the problem instead. Every move is one line and nothing else, so
 * whatever a second line would have explained belongs in the prose above the card rather than back
 * in here.
 *
 * One tick for the whole task, not one per move. The five are a single sitting, and five boxes
 * would invite ticking them off separately, which turns a run at a problem into an errand list.
 * Nothing is graded either, so the tick is a bookmark rather than a mark: it says whether this is
 * still ahead of you when you come back tomorrow, which is why it is written to localStorage. It is
 * a `role="checkbox"` button rather than a bare click handler so a keyboard reaches it and a screen
 * reader is told what state it is in.
 */
export function CutItUp() {
  const { text } = useStepText('step1')

  const [done, setDone] = useState(readDone)

  function toggle() {
    setDone((current) => {
      writeDone(!current)
      return !current
    })
  }

  return (
    <Card
      id="cut-it-up"
      data-component="CutItUp"
      data-state={done ? 'done' : 'open'}
      className="my-8"
    >
      <CardHeader id="cut-it-up-header" data-component="CutItUp">
        <CardTitle id="cut-it-up-title" data-component="CutItUp">
          {text('cut.title')}
        </CardTitle>
        <CardDescription id="cut-it-up-description" data-component="CutItUp">
          {text('cut.description')}
        </CardDescription>
      </CardHeader>

      <CardContent id="cut-it-up-content" data-component="CutItUp" className="flex flex-col gap-5">
        <ol id="cut-it-up-moves" data-component="CutItUp" className="flex flex-col gap-3">
          {MOVES.map((move, index) => (
            <li
              key={move}
              id={`cut-it-up-move-${index}`}
              data-component="CutItUp"
              className="flex items-baseline gap-3"
            >
              <span
                id={`cut-it-up-move-${index}-number`}
                data-component="CutItUp"
                aria-hidden="true"
                className="text-primary font-mono text-sm tabular-nums"
              >
                {index + 1}
              </span>
              <span id={`cut-it-up-move-${index}-label`} data-component="CutItUp">
                {text(`cut.${move}.label`)}
              </span>
            </li>
          ))}
        </ol>

        <button
          type="button"
          role="checkbox"
          aria-checked={done}
          onClick={toggle}
          id="cut-it-up-toggle"
          data-component="CutItUp"
          data-state={done ? 'done' : 'open'}
          className="flex w-full items-center gap-3 rounded-lg border p-3 text-left font-medium outline-none transition-colors hover:bg-muted/60 focus-visible:ring-3 focus-visible:ring-ring/50"
        >
          <span
            id="cut-it-up-toggle-tick"
            data-component="CutItUp"
            aria-hidden="true"
            className={cn(
              'flex size-6 shrink-0 items-center justify-center rounded-full border transition-colors',
              done
                ? 'border-primary bg-primary text-primary-foreground'
                : 'border-border bg-transparent text-transparent',
            )}
          >
            <CheckIcon className="size-4" strokeWidth={3} />
          </span>
          <span
            id="cut-it-up-toggle-label"
            data-component="CutItUp"
            className={cn('transition-colors', done && 'text-muted-foreground')}
          >
            {text(done ? 'cut.done' : 'cut.todo')}
          </span>
        </button>
      </CardContent>
    </Card>
  )
}
