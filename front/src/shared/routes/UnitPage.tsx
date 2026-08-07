import { useMemo } from 'react'
import { useTranslation } from 'react-i18next'
import { useParams } from 'react-router-dom'
import { useAssistant } from '@/shared/assistant/useAssistant'
import { ExercisePanel } from '@/shared/components/ExercisePanel'
import { QuizPanel } from '@/shared/components/QuizPanel'
import { StepContent } from '@/shared/components/StepContent'
import { UnitPager } from '@/shared/components/UnitPager'
import { useStepText } from '@/shared/i18n/useStepText'
import { showsExerciseHeading } from '@/shared/lib/content'
import { useMode } from '@/shared/mode/useMode'
import { unitKey } from '@/shared/progress/progress'
import { useProgress } from '@/shared/progress/useProgress'
import type { Step, Unit } from '@/shared/step'
import { findStep, findUnit } from '@/steps'

/**
 * One unit: its prose, its exercise, or both. The title is rendered here from the registry rather
 * than written into the HTML, so the sidebar, the pager and the page can never disagree about it.
 */
export function UnitPage() {
  const { stepId, unitId } = useParams()
  const { t } = useTranslation()
  const step = findStep(stepId)

  if (!step) {
    return (
      <div id="step-not-found" data-component="UnitPage" className="text-muted-foreground">
        <h1
          id="step-not-found-title"
          data-component="UnitPage"
          className="text-foreground mb-2 text-xl font-semibold"
        >
          {t('step.notFound.title')}
        </h1>
        <p id="step-not-found-body" data-component="UnitPage" className="text-sm">
          {t('step.notFound.body', { id: stepId ?? '' })}
        </p>
      </div>
    )
  }

  const unit = findUnit(step, unitId)
  if (!unit) {
    return (
      <div id="unit-not-found" data-component="UnitPage" className="text-muted-foreground">
        <h1
          id="unit-not-found-title"
          data-component="UnitPage"
          className="text-foreground mb-2 text-xl font-semibold"
        >
          {t('unit.notFound.title')}
        </h1>
        <p id="unit-not-found-body" data-component="UnitPage" className="text-sm">
          {t('unit.notFound.body', { id: unitId ?? '' })}
        </p>
      </div>
    )
  }

  return <UnitView step={step} unit={unit} />
}

/**
 * The unit itself. Separate from the lookup above because its text comes from the step's own
 * i18next namespace, and the namespace is only known once the step has been found.
 */
function UnitView({ step, unit }: { step: Step; unit: Unit }) {
  const { text } = useStepText(step.id)
  const { mode } = useMode()
  const { assistant } = useAssistant()
  const { markComplete } = useProgress()
  const markDone = () => markComplete(unitKey(step.id, unit.id))

  // A unit carrying both a task and a quiz writes "Test yourself" above the task itself, so the
  // quiz joins that section instead of opening a second one with the same name. It is asked of the
  // prepared page rather than of the registry, because the guided cut takes the heading with the
  // rest of the prose and the quiz owns it again in class.
  const sharedHeading = useMemo(
    () => (unit.html ? showsExerciseHeading(unit.html, mode, assistant) : false),
    [unit.html, mode, assistant],
  )

  return (
    // `[&>*]:my-0` is the one thing in here that is not obvious. A figure carries `my-8` so it is
    // spaced when it sits inside a run of prose, but the registry's trailing figure is a *direct*
    // child of this column, where the flex gap already spaces it and margins do not collapse into a
    // gap. Left alone the two stack, and a board landing after a task came out with 96px of empty
    // page between them. Only direct children are reset, so an inline figure inside `StepContent`
    // keeps the margin it needs.
    <div id="unit" data-component="UnitView" className="flex flex-col gap-8 [&>*]:my-0">
      <header id="unit-header" data-component="UnitView">
        <p
          id="unit-step-title"
          data-component="UnitView"
          className="eyebrow text-primary"
        >
          {text(step.title)}
        </p>
        <h1
          id="unit-title"
          data-component="UnitView"
          className="font-heading mt-2 text-3xl font-semibold tracking-tight"
        >
          {text(unit.title)}
        </h1>
      </header>

      {unit.html && (
        <StepContent
          html={unit.html}
          namespace={step.id}
          inlineFigures={unit.inlineFigures}
        />
      )}

      {unit.figure}

      {unit.quiz && (
        // Keyed so walking from one quiz to the next starts from unanswered questions.
        <QuizPanel
          key={`${step.id}/${unit.id}`}
          questions={unit.quiz}
          namespace={step.id}
          onPass={markDone}
          heading={!sharedHeading}
        />
      )}

      {unit.exerciseId && (
        <ExercisePanel
          // Keyed so walking from one graded unit to the next starts from an empty box.
          key={unit.exerciseId}
          exerciseId={unit.exerciseId}
          placeholder={unit.exercisePlaceholder ? text(unit.exercisePlaceholder) : undefined}
        />
      )}

      <UnitPager stepId={step.id} unitId={unit.id} />
    </div>
  )
}
