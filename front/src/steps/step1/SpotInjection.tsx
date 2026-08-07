import { useState } from 'react'
import { ChoiceKey, ChoiceMark, Panel, PanelNote } from '@/shared/components/Panel'
import { Button } from '@/shared/components/ui/button'
import { useStepText } from '@/shared/i18n/useStepText'
import { choiceRowClass } from '@/shared/lib/choice'
import { shuffled } from '@/shared/lib/shuffle'

/** The four results one turn brought back. Message keys are built from the id. */
const RESULTS = ['tests', 'docs', 'ticket', 'grep'] as const

type ResultId = (typeof RESULTS)[number]

/** The one addressed to the agent. The other three are ordinary output that reads suspicious. */
const POISONED: ResultId = 'ticket'

/**
 * The unit's first exercise, and the one the amber warning above it earns: four tool results, and
 * one of them is talking to the agent rather than to you. Two of the clean three are there to be
 * mistaken for it, since a naive reader looks for the word token or for a line that gives an order,
 * and both appear in output that is doing nothing wrong.
 *
 * Graded here in the browser, like the quizzes and the flag boards: the answer is on screen already,
 * so a round trip to the service would add nothing and this keeps working with the backend down.
 *
 * Shuffled once per mount so the poisoned one is never the same card twice, and the results are set
 * in mono because every one of them is machine output. A wrong pick is marked on the pick itself,
 * and the real one is then outlined in teal rather than in red: red here would mean the result
 * failed, and what failed is the answer.
 */
export function SpotInjection() {
  const { text } = useStepText('step1')

  const [results] = useState(() => shuffled(RESULTS))
  const [picked, setPicked] = useState<ResultId | null>(null)
  const [checked, setChecked] = useState(false)

  const right = picked === POISONED

  return (
    <Panel
      block="spot-injection"
      state={checked ? 'checked' : 'open'}
      title={text('spot.title')}
      description={text('spot.description')}
      className="my-8"
      contentClassName="flex flex-col gap-5"
    >
      <ul
        id="spot-injection-results"
        data-component="SpotInjection"
        className="border-border/70 border-t"
      >
        {results.map((result, index) => {
          const isPick = picked === result
          const state = !checked
            ? isPick
              ? 'picked'
              : 'open'
            : isPick
              ? right
                ? 'right'
                : 'wrong'
              : result === POISONED
                ? 'answer'
                : 'clean'
          return (
            <li key={result} id={`spot-injection-result-${index}`} data-component="SpotInjection">
              <button
                id={`spot-injection-result-${index}-pick`}
                data-component="SpotInjection"
                data-state={state}
                type="button"
                disabled={checked}
                aria-pressed={isPick}
                onClick={() => setPicked(result)}
                className={choiceRowClass(state, checked, 'items-start')}
              >
                <ChoiceKey
                  id={`spot-injection-result-${index}-key`}
                  state={state}
                  index={index}
                />
                <span
                  id={`spot-injection-result-${index}-text`}
                  data-component="SpotInjection"
                  className="min-w-0 flex-1"
                >
                  <span
                    id={`spot-injection-result-${index}-source`}
                    data-component="SpotInjection"
                    className="text-muted-foreground block font-mono text-xs"
                  >
                    {text(`spot.source.${result}`)}
                  </span>
                  <span
                    id={`spot-injection-result-${index}-body`}
                    data-component="SpotInjection"
                    className="mt-2 block font-mono text-sm whitespace-pre-wrap"
                  >
                    {text(`spot.body.${result}`)}
                  </span>
                </span>
                <ChoiceMark idBase={`spot-injection-result-${index}`} state={state} />
              </button>
            </li>
          )
        })}
      </ul>

      {checked && (
        <PanelNote id="spot-injection-verdict" tone={right ? 'success' : 'destructive'}>
          <span id="spot-injection-verdict-line" data-component="SpotInjection" className="block">
            {text(right ? 'spot.right' : 'spot.wrong')}
          </span>
          {/* The clean three are only worth a sentence when one of them was the pick. */}
          {!right && picked && (
            <span
              id="spot-injection-verdict-pick"
              data-component="SpotInjection"
              className="text-muted-foreground mt-2 block"
            >
              {text(`spot.explanation.${picked}`)}
            </span>
          )}
        </PanelNote>
      )}

      <div
        id="spot-injection-actions"
        data-component="SpotInjection"
        className="flex justify-end"
      >
        {checked ? (
          <Button
            id="spot-injection-retry"
            data-component="SpotInjection"
            type="button"
            variant="outline"
            onClick={() => {
              setPicked(null)
              setChecked(false)
            }}
          >
            {text('spot.retry')}
          </Button>
        ) : (
          <Button
            id="spot-injection-check"
            data-component="SpotInjection"
            type="button"
            disabled={picked === null}
            onClick={() => setChecked(true)}
          >
            {text('spot.check')}
          </Button>
        )}
      </div>
    </Panel>
  )
}
