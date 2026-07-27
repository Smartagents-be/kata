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

function readDone(storageKey: string): boolean {
  try {
    return localStorage.getItem(storageKey) === 'done'
  } catch {
    return false
  }
}

function writeDone(storageKey: string, done: boolean) {
  try {
    if (done) {
      localStorage.setItem(storageKey, 'done')
    } else {
      localStorage.removeItem(storageKey)
    }
  } catch {
    // A browser refusing storage costs the tick, not the exercise.
  }
}

/**
 * A hands-on task on one card: a title, an optional line saying what the task is, the moves in the
 * order they are taken, and one tick for the whole thing. The description is left out when the prose
 * above the card already says where the work happens and what to watch for, which is why the key is
 * looked up rather than assumed: `ReadYourWindow` has no `window.description` and no gap where one
 * would have been. Nothing here is graded, and nothing is submitted.
 * All three of step 1's tasks are this component with different data (`CutItUp` in `harness`,
 * `SurviveTheClear` in `session`, `ReadYourWindow` in `tools`), so keep additions here rather than
 * in a caller.
 *
 * **One tick for the task, never one per move.** A task is a single sitting, and a box per move
 * invites ticking them off separately, which turns a run at a problem into an errand list. The tick
 * is a bookmark rather than a mark: it says whether this is still ahead of you when you come back
 * tomorrow, which is why it is written to localStorage. It is a `role="checkbox"` button rather than
 * a bare click handler so a keyboard reaches it and a screen reader is told what state it is in.
 *
 * Every move is one line and nothing else. Whatever a second line would have explained belongs in
 * the prose above the card rather than back in here.
 */
export function TaskCard({
  block,
  namespace,
  prefix,
  storageKey,
  moves,
  className,
}: {
  /**
   * The BEM block every id on this card is built from, e.g. `cut-it-up`. It is the card's own name
   * for itself rather than a React component name, so the caller can be renamed without moving the
   * ids.
   */
  block: string
  /** The step the text belongs to; every key below is read from that step's namespace. */
  namespace: string
  /**
   * The prefix the card's own keys sit under: `<prefix>.title`, `<prefix>.todo`, `<prefix>.done`,
   * and `<prefix>.<move>.label` for each move. `<prefix>.description` is optional; with no entry the
   * card is a title and its moves.
   */
  prefix: string
  /**
   * Where the tick is kept. Use the `kata.step<N>.` prefix, so the reset in the settings panel
   * clears it with the rest of a student's progress. See `shared/lib/reset.ts`.
   */
  storageKey: string
  /** The moves, in the order they are taken. Numbered on screen from one. */
  moves: readonly string[]
  className?: string
}) {
  const { text, has } = useStepText(namespace)

  const [done, setDone] = useState(() => readDone(storageKey))

  function toggle() {
    setDone((current) => {
      writeDone(storageKey, !current)
      return !current
    })
  }

  return (
    <Card
      id={block}
      data-component="TaskCard"
      data-state={done ? 'done' : 'open'}
      className={className}
    >
      <CardHeader id={`${block}-header`} data-component="TaskCard">
        <CardTitle id={`${block}-title`} data-component="TaskCard">
          {text(`${prefix}.title`)}
        </CardTitle>
        {has(`${prefix}.description`) && (
          <CardDescription id={`${block}-description`} data-component="TaskCard">
            {text(`${prefix}.description`)}
          </CardDescription>
        )}
      </CardHeader>

      <CardContent id={`${block}-content`} data-component="TaskCard" className="flex flex-col gap-5">
        <ol id={`${block}-moves`} data-component="TaskCard" className="flex flex-col gap-3">
          {moves.map((move, index) => (
            <li
              key={move}
              id={`${block}-move-${index}`}
              data-component="TaskCard"
              className="flex items-baseline gap-3"
            >
              <span
                id={`${block}-move-${index}-number`}
                data-component="TaskCard"
                aria-hidden="true"
                className="text-primary font-mono text-sm tabular-nums"
              >
                {index + 1}
              </span>
              <span id={`${block}-move-${index}-label`} data-component="TaskCard">
                {text(`${prefix}.${move}.label`)}
              </span>
            </li>
          ))}
        </ol>

        <button
          type="button"
          role="checkbox"
          aria-checked={done}
          onClick={toggle}
          id={`${block}-toggle`}
          data-component="TaskCard"
          data-state={done ? 'done' : 'open'}
          className="flex w-full items-center gap-3 rounded-lg border p-3 text-left font-medium outline-none transition-colors hover:bg-muted/60 focus-visible:ring-3 focus-visible:ring-ring/50"
        >
          <span
            id={`${block}-toggle-tick`}
            data-component="TaskCard"
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
            id={`${block}-toggle-label`}
            data-component="TaskCard"
            className={cn('transition-colors', done && 'text-muted-foreground')}
          >
            {text(done ? `${prefix}.done` : `${prefix}.todo`)}
          </span>
        </button>
      </CardContent>
    </Card>
  )
}
