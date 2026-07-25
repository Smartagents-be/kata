import { useState } from 'react'
import { useTranslation } from 'react-i18next'
import { Button } from '@/shared/components/ui/button'
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/shared/components/ui/card'
import { useStepText } from '@/shared/i18n/useStepText'
import { shuffled } from '@/shared/lib/shuffle'
import { cn } from '@/shared/lib/utils'

interface Call {
  id: string
  /** What this call appends to the window. Data, not prose, so it is not translated. */
  lines: number
  /** Whether the task needs it. The two that are needed are the whole answer. */
  needed: boolean
}

/** Six ways to spend the window on one small change. Message keys are built from the id. */
const CALLS: readonly Call[] = [
  { id: 'grep', lines: 3, needed: true },
  { id: 'controller', lines: 34, needed: true },
  { id: 'services', lines: 2140, needed: false },
  { id: 'reference', lines: 1380, needed: false },
  { id: 'tree', lines: 260, needed: false },
  { id: 'listing', lines: 190, needed: false },
]

const IDEAL = CALLS.filter((call) => call.needed).reduce((sum, call) => sum + call.lines, 0)

/**
 * The unit's closing exercise: one small change, six calls that could serve it, and a running count
 * of what each one costs. Picking the two that answer the task is the whole of it, and the count is
 * what makes the point the prose no longer makes in words. Every wrong option would work. They are
 * wrong because of what they leave behind.
 *
 * Graded on the exact set rather than on the total, so filling the window with the reference page
 * and then adding the two right calls is not a pass. Shuffled once per mount, and the counts are in
 * mono because they came off a machine.
 */
export function BudgetWindow() {
  const { text } = useStepText('step1')
  const { t } = useTranslation('step1')

  const [calls] = useState(() => shuffled(CALLS))
  const [picked, setPicked] = useState<readonly string[]>([])
  const [checked, setChecked] = useState(false)

  const total = calls
    .filter((call) => picked.includes(call.id))
    .reduce((sum, call) => sum + call.lines, 0)
  const right = calls.every((call) => picked.includes(call.id) === call.needed)
  const missteps = calls.filter((call) => picked.includes(call.id) !== call.needed)

  function toggle(id: string) {
    setPicked((current) =>
      current.includes(id) ? current.filter((other) => other !== id) : [...current, id],
    )
  }

  return (
    <Card
      id="budget-window"
      data-component="BudgetWindow"
      data-state={checked ? 'checked' : 'open'}
      className="my-8"
    >
      <CardHeader id="budget-window-header" data-component="BudgetWindow">
        <CardTitle id="budget-window-title" data-component="BudgetWindow">
          {text('budget.title')}
        </CardTitle>
        <CardDescription id="budget-window-description" data-component="BudgetWindow">
          {text('budget.description')}
        </CardDescription>
      </CardHeader>

      <CardContent
        id="budget-window-content"
        data-component="BudgetWindow"
        className="flex flex-col gap-5"
      >
        <p
          id="budget-window-task"
          data-component="BudgetWindow"
          className="border-primary bg-primary/5 rounded-r-xl border-l-[3px] px-4 py-3 text-sm"
        >
          {text('budget.task')}
        </p>

        <ul id="budget-window-calls" data-component="BudgetWindow" className="flex flex-col gap-3">
          {calls.map((call, index) => {
            const isPicked = picked.includes(call.id)
            const state = !checked
              ? isPicked
                ? 'picked'
                : 'open'
              : isPicked === call.needed
                ? isPicked
                  ? 'right'
                  : 'clean'
                : isPicked
                  ? 'wrong'
                  : 'missed'
            return (
              <li key={call.id} id={`budget-window-call-${index}`} data-component="BudgetWindow">
                <button
                  id={`budget-window-call-${index}-pick`}
                  data-component="BudgetWindow"
                  data-state={state}
                  type="button"
                  disabled={checked}
                  aria-pressed={isPicked}
                  onClick={() => toggle(call.id)}
                  className={cn(
                    'flex w-full items-baseline gap-4 rounded-xl border px-4 py-3 text-left transition-colors',
                    'focus-visible:ring-ring focus-visible:ring-[3px] focus-visible:outline-none',
                    state === 'open' && 'border-border hover:border-primary hover:bg-primary/5',
                    state === 'picked' && 'border-primary bg-primary/5',
                    state === 'clean' && 'border-border opacity-60',
                    state === 'right' && 'border-success/50 bg-success/10',
                    state === 'wrong' && 'border-destructive/50',
                    state === 'missed' && 'border-primary bg-primary/5',
                  )}
                >
                  <span
                    id={`budget-window-call-${index}-label`}
                    data-component="BudgetWindow"
                    className="flex-1 font-mono text-sm"
                  >
                    {text(`budget.call.${call.id}`)}
                  </span>
                  <span
                    id={`budget-window-call-${index}-lines`}
                    data-component="BudgetWindow"
                    className="text-muted-foreground font-mono text-xs tabular-nums"
                  >
                    {t('budget.lines', { lines: call.lines })}
                  </span>
                </button>
              </li>
            )
          })}
        </ul>

        <p
          id="budget-window-running"
          data-component="BudgetWindow"
          role="status"
          className="text-muted-foreground text-sm tabular-nums"
        >
          {t('budget.running', { lines: total })}
        </p>

        {checked && (
          <div
            id="budget-window-verdict"
            data-component="BudgetWindow"
            data-state={right ? 'right' : 'wrong'}
            role="status"
            className={cn(
              'rounded-xl border px-4 py-3 text-sm',
              right ? 'border-success/40 bg-success/10 text-success-foreground' : 'border-border',
            )}
          >
            <p id="budget-window-verdict-line" data-component="BudgetWindow">
              {t(right ? 'budget.right' : 'budget.wrong', { picked: total, ideal: IDEAL })}
            </p>
            {/* One line per call that went the wrong way, whether it was taken or left. */}
            <ul
              id="budget-window-explanations"
              data-component="BudgetWindow"
              className="mt-2 flex flex-col gap-2"
            >
              {missteps.map((call, index) => (
                <li
                  key={call.id}
                  id={`budget-window-explanation-${index}`}
                  data-component="BudgetWindow"
                  className="text-muted-foreground"
                >
                  {text(`budget.explanation.${call.id}`)}
                </li>
              ))}
            </ul>
          </div>
        )}

        <div id="budget-window-actions" data-component="BudgetWindow" className="flex justify-end">
          {checked ? (
            <Button
              id="budget-window-retry"
              data-component="BudgetWindow"
              type="button"
              variant="outline"
              onClick={() => {
                setPicked([])
                setChecked(false)
              }}
            >
              {text('budget.retry')}
            </Button>
          ) : (
            <Button
              id="budget-window-check"
              data-component="BudgetWindow"
              type="button"
              disabled={picked.length === 0}
              onClick={() => setChecked(true)}
            >
              {text('budget.check')}
            </Button>
          )}
        </div>
      </CardContent>
    </Card>
  )
}
