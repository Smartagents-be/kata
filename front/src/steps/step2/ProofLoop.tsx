import { ChevronRight } from 'lucide-react'
import { useTranslation } from 'react-i18next'

/**
 * The order a change is proved in, left to right: reproduce, lock, implement, prove, reason. It
 * closes `proof`, at the `data-figure="proof-loop"` slot, and nothing under it reads it back, so the
 * notes under each stage carry the order.
 *
 * **Teal is the check and nothing else.** `Lock` is where it is written and `Prove` is where it is
 * run again, so those 2 cards are the teal ones and the track under them joins exactly those 2:
 * dashed while the check is red, solid once it is green. That track is the figure's argument, 1
 * check answering twice, which is why it is 1 line and not 2 pills. The words `red` and `green` are
 * muted and teal on `GoalGate`'s precedent rather than `--destructive` and `--success`, which stay
 * reserved for an answer the student gave.
 *
 * The band under everything is the environment: it spans all 5 stages because none of them works
 * without it, and it is drawn as the ground they stand on rather than as a 6th stage.
 *
 * DOM rather than SVG, on `WorkflowTimeline`'s precedent: the notes wrap by themselves in both
 * languages and the row becomes a column on a narrow screen with the arrows turned.
 */
const STAGES = ['reproduce', 'lock', 'implement', 'prove', 'reason'] as const

/** The stages that hold the check: where it is written, and where it is run again. */
const CHECK_STAGES: ReadonlySet<string> = new Set(['lock', 'prove'])

export function ProofLoop() {
  const { t } = useTranslation('step2')

  return (
    <figure
      id="proof-loop"
      data-component="ProofLoop"
      className="not-prose my-8 grid gap-2 sm:grid-cols-5"
    >
      {STAGES.map((stage, index) => (
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

          <div id={`proof-loop-stage-${index}-body`} data-component="ProofLoop" className="flex-1">
            <div
              id={`proof-loop-stage-${index}-name`}
              data-component="ProofLoop"
              className={
                CHECK_STAGES.has(stage)
                  ? 'border-primary/40 bg-primary/5 text-foreground rounded-lg border px-3 py-2 text-sm font-medium'
                  : 'border-border text-foreground rounded-lg border px-3 py-2 text-sm font-medium'
              }
            >
              {t(`proof-loop.${stage}.name`)}
            </div>
            <p
              id={`proof-loop-stage-${index}-note`}
              data-component="ProofLoop"
              className="text-muted-foreground mt-2 px-1 text-xs"
            >
              {t(`proof-loop.${stage}.note`)}
            </p>
          </div>
        </div>
      ))}

      {/* The check, from the stage that writes it to the stage that runs it again. The left margin
          is the `size-4` arrow plus the `gap-2` ahead of the `Lock` card, so the track starts on
          that card's edge rather than under its arrow. */}
      <div
        id="proof-loop-check"
        data-component="ProofLoop"
        className="flex items-center gap-2 text-xs sm:col-span-3 sm:col-start-2 sm:ml-6"
      >
        <span
          id="proof-loop-check-red"
          data-component="ProofLoop"
          className="text-muted-foreground font-mono"
        >
          {t('proof-loop.check.red')}
        </span>
        <span
          id="proof-loop-check-before"
          data-component="ProofLoop"
          aria-hidden="true"
          className="border-primary/50 flex-1 border-t border-dashed"
        />
        <span id="proof-loop-check-label" data-component="ProofLoop" className="text-primary">
          {t('proof-loop.check.label')}
        </span>
        <span
          id="proof-loop-check-after"
          data-component="ProofLoop"
          aria-hidden="true"
          className="border-primary flex-1 border-t"
        />
        <span
          id="proof-loop-check-green"
          data-component="ProofLoop"
          className="text-primary font-mono font-medium"
        >
          {t('proof-loop.check.green')}
        </span>
      </div>

      <p
        id="proof-loop-environment"
        data-component="ProofLoop"
        className="bg-muted text-muted-foreground mt-2 rounded-lg px-3 py-2 text-center text-xs sm:col-span-5"
      >
        {t('proof-loop.environment')}
      </p>
    </figure>
  )
}
