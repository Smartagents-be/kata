import { useState } from 'react'
import { useTranslation } from 'react-i18next'
import { ChoiceMark, Panel, PanelNote } from '@/shared/components/Panel'
import { Button } from '@/shared/components/ui/button'
import { useStepText } from '@/shared/i18n/useStepText'
import { shuffled } from '@/shared/lib/shuffle'
import { choiceLabelClass, choiceRowClass } from '@/shared/lib/choice'
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
  { id: 'controller', lines: 24, needed: true },
  { id: 'services', lines: 1250, needed: false },
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
    <Panel
      block="budget-window"
      state={checked ? 'checked' : 'open'}
      title={text('budget.title')}
      description={text('budget.description')}
      className="my-8"
      contentClassName="flex flex-col gap-5"
    >
      {/* The brief the six calls are weighed against, in the left-rule shape every note here takes. */}
      <p
        id="budget-window-task"
        data-component="BudgetWindow"
        className="border-primary bg-primary/5 max-w-[56ch] rounded-r-lg border-l-2 py-1.5 pr-3 pl-3.5 text-sm leading-relaxed"
      >
        {text('budget.task')}
      </p>

      <ul id="budget-window-calls" data-component="BudgetWindow" className="border-border/70 border-t">
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
                : 'answer'
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
                className={choiceRowClass(state, checked)}
              >
                <span
                  id={`budget-window-call-${index}-label`}
                  data-component="BudgetWindow"
                  className={cn(choiceLabelClass(state), 'font-mono')}
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
                <ChoiceMark idBase={`budget-window-call-${index}`} state={state} />
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
        <PanelNote id="budget-window-verdict" tone={right ? 'success' : 'destructive'}>
          <span id="budget-window-verdict-line" data-component="BudgetWindow" className="block">
            {t(right ? 'budget.right' : 'budget.wrong', { picked: total, ideal: IDEAL })}
          </span>
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
        </PanelNote>
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
    </Panel>
  )
}
