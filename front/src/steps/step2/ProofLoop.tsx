import { ChevronRight } from 'lucide-react'
import { useTranslation } from 'react-i18next'

/**
 * The order a change is proved in, left to right: reproduce, lock, implement, prove, reason. It
 * closes the order's sections in `enablement`, at the `data-figure="proof-loop"` slot, under the
 * invoice prompt, and nothing under it reads it back.
 *
 * **It was redrawn in October 2026 at the owner's asking, who called the first version lazy and too
 * wordy.** That one carried a sentence under every stage, a red-to-green track and an environment
 * band, and said in the figure what the prose had just said. Now the question is the title, on
 * `LoopsPerHour`'s precedent, and under each stage sits 1 piece of evidence from the prompt above
 * it: the wrong total, the test failing, the test passing with the right total, what was not
 * checked. `Implement` has none on purpose: the code change is not evidence of anything.
 *
 * **Teal is the check and nothing else.** `Lock` writes it and `Prove` runs it again, so those 2
 * cards are tinted, and the 2 test results are the figure's argument: 1 check answering twice. The
 * failing one is muted and the passing one teal, on `GoalGate`'s precedent rather than
 * `--destructive` and `--success`, which stay reserved for an answer the student gave.
 *
 * DOM rather than SVG, on `WorkflowTimeline`'s precedent: the row becomes a column on a narrow
 * screen with the arrows turned.
 */
const STAGES = ['reproduce', 'lock', 'implement', 'prove', 'reason'] as const

/** The stages that hold the check: where it is written, and where it is run again. */
const CHECK_STAGES: ReadonlySet<string> = new Set(['lock', 'prove'])

/** What each stage leaves behind. `Implement` leaves nothing that proves anything. */
const EVIDENCE: Partial<Record<(typeof STAGES)[number], 'muted' | 'green'>> = {
  reproduce: 'muted',
  lock: 'muted',
  prove: 'green',
  reason: 'muted',
}

export function ProofLoop() {
  const { t } = useTranslation('step2')

  return (
    <figure id="proof-loop" data-component="ProofLoop" className="not-prose my-8">
      <p
        id="proof-loop-question"
        data-component="ProofLoop"
        className="text-foreground mb-4 text-sm font-medium"
      >
        {t('proof-loop.question')}
      </p>

      <div id="proof-loop-stages" data-component="ProofLoop" className="grid gap-2 sm:grid-cols-5">
        {STAGES.map((stage, index) => {
          const evidence = EVIDENCE[stage]
          return (
            <div
              key={stage}
              id={`proof-loop-stage-${index}`}
              data-component="ProofLoop"
              className="flex items-start gap-2"
            >
              {index > 0 && (
                <ChevronRight
                  id={`proof-loop-arrow-${index}`}
                  data-component="ProofLoop"
                  aria-hidden="true"
                  // Stacked, the row runs downwards, so the arrow has to turn with it.
                  className="text-muted-foreground/60 mt-3 size-4 shrink-0 rotate-90 sm:rotate-0"
                />
              )}

              <div
                id={`proof-loop-stage-${index}-body`}
                data-component="ProofLoop"
                className="flex-1"
              >
                <div
                  id={`proof-loop-stage-${index}-name`}
                  data-component="ProofLoop"
                  className={
                    CHECK_STAGES.has(stage)
                      ? 'border-primary/40 bg-primary/5 text-foreground rounded-lg border px-3 py-2 text-center text-sm font-medium'
                      : 'border-border text-foreground rounded-lg border px-3 py-2 text-center text-sm font-medium'
                  }
                >
                  {t(`proof-loop.${stage}.name`)}
                </div>
                {evidence && (
                  <p
                    id={`proof-loop-stage-${index}-evidence`}
                    data-component="ProofLoop"
                    className={
                      evidence === 'green'
                        ? 'text-primary mt-2 text-center font-mono text-xs font-semibold'
                        : 'text-muted-foreground mt-2 text-center font-mono text-xs'
                    }
                  >
                    {t(`proof-loop.${stage}.evidence`)}
                  </p>
                )}
              </div>
            </div>
          )
        })}
      </div>
    </figure>
  )
}
