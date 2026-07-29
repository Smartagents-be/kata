import { ChevronRight, ChevronUp } from 'lucide-react'
import { useTranslation } from 'react-i18next'

/**
 * One project's actual path through the four workflows, left to right. It is the evidence for the
 * sentence above it, that none of them is a camp you join: the same repository starts naive, moves
 * up as the code earns it, and ends back at a workflow it already used.
 *
 * Three things in the sequence are the point rather than decoration. The audit is a reflection on
 * **your own** spec work rather than on the agent's answer. The plan at the end exists because of
 * what the audit turned up. And the return path under the last three stages closes the loop back
 * into the specs, because a living document that is not written back to stops being true, which is
 * the one way spec-driven work fails quietly. All three are carried in the figure's own labels,
 * which is where a drawing's explanations belong; no prose walks the row.
 *
 * The last stage is `Plan/naive` rather than a fifth new name, and that is the sequence's point:
 * you drop back to a workflow you already used, and which one depends on the row. A one-line header
 * fix does not earn a plan. Nothing marks it as a return, because the repeated names say it.
 *
 * DOM rather than SVG, on `ModelTiers`'s precedent in step 1: this is a row of labelled cards, so
 * the notes wrap by themselves in both languages and the row becomes a column on a narrow screen
 * without anything being redrawn. A sequence read top to bottom is still a sequence, and the return
 * path is a grid row under the stages it spans rather than an arc that would have to be redrawn
 * for each layout.
 */
const STAGES = ['naive', 'plan-first', 'specs', 'audit', 'plan-fixes'] as const

export function WorkflowTimeline() {
  const { t } = useTranslation('step2')

  return (
    <figure
      id="workflow-timeline"
      data-component="WorkflowTimeline"
      className="not-prose my-8 grid gap-2 sm:grid-cols-5"
    >
      {STAGES.map((stage, index) => (
        <div
          key={stage}
          id={`workflow-timeline-stage-${index}`}
          data-component="WorkflowTimeline"
          className="flex items-start gap-2"
        >
          {index > 0 && (
            <ChevronRight
              id={`workflow-timeline-arrow-${index}`}
              data-component="WorkflowTimeline"
              aria-hidden="true"
              // Stacked, the row runs downwards, so the arrow has to turn with it.
              className="text-muted-foreground/60 mt-3 size-4 shrink-0 rotate-90 sm:mt-3 sm:rotate-0"
            />
          )}

          <div
            id={`workflow-timeline-stage-${index}-body`}
            data-component="WorkflowTimeline"
            className="flex-1"
          >
            <div
              id={`workflow-timeline-stage-${index}-name`}
              data-component="WorkflowTimeline"
              className="border-primary/40 bg-primary/5 text-foreground rounded-lg border px-3 py-2 text-sm font-medium"
            >
              {t(`workflow-timeline.${stage}.name`)}
            </div>
            <p
              id={`workflow-timeline-stage-${index}-note`}
              data-component="WorkflowTimeline"
              className="text-muted-foreground mt-2 px-1 text-xs"
            >
              {t(`workflow-timeline.${stage}.note`)}
            </p>
          </div>
        </div>
      ))}

      {/* The way back, drawn as a bracket: down out of the last stage, left along the bottom, up
          into `Spec-driven`. Two right angles rather than one arrow, because a bare arrowhead sits
          in the gap between two cards and reads as pointing at whichever one is behind it.

          Three borders on one box are the whole path, which is what keeps it in step with a layout
          that reflows: no coordinates to recompute when the row becomes a column.

          The two margins put the risers on the *centres* of `Spec-driven` and the last
          `Plan-based`, rather than on their edges, and they are arithmetic rather than nudges. A
          percentage margin on a grid item resolves against its own grid area, so `100%` is this
          box's three columns plus the two `gap-2`s between them: one column is `(100% - 1rem) / 3`,
          a card is that less the `size-4` arrow and `gap-2` ahead of it, and half a card either
          side is what lands the risers in the middle. Change the parent's gap or a stage cell's
          lead-in and both numbers move. */}
      <div
        id="workflow-timeline-return"
        data-component="WorkflowTimeline"
        className="relative sm:col-span-3 sm:col-start-3 sm:ml-[calc(0.75rem+(100%-1rem)/6)] sm:mr-[calc((100%-1rem)/6-0.75rem)]"
      >
        <div
          id="workflow-timeline-return-path"
          data-component="WorkflowTimeline"
          className="border-primary/40 h-5 border-r border-b border-l border-dashed"
        />

        {/* Sits on the top end of the left riser, so the path terminates in it. */}
        <ChevronUp
          id="workflow-timeline-return-arrow"
          data-component="WorkflowTimeline"
          aria-hidden="true"
          className="text-primary absolute top-0 left-0 size-4 -translate-x-1/2 -translate-y-1/2"
        />

        <p
          id="workflow-timeline-return-label"
          data-component="WorkflowTimeline"
          className="text-primary mt-1.5 text-center text-xs"
        >
          {t('workflow-timeline.return')}
        </p>
      </div>
    </figure>
  )
}
