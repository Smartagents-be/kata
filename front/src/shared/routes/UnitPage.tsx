import { useParams } from 'react-router-dom'
import { ExercisePanel } from '@/shared/components/ExercisePanel'
import { QuizPanel } from '@/shared/components/QuizPanel'
import { StepContent } from '@/shared/components/StepContent'
import { UnitPager } from '@/shared/components/UnitPager'
import { localise } from '@/shared/i18n/locale'
import { useLocale } from '@/shared/i18n/useLocale'
import { findStep, findUnit } from '@/steps'

/**
 * One unit: its prose, its exercise, or both. The title is rendered here from the registry rather
 * than written into the HTML, so the sidebar, the pager and the page can never disagree about it.
 */
export function UnitPage() {
  const { stepId, unitId } = useParams()
  const { locale, t } = useLocale()
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

  return (
    <div id="unit" data-component="UnitPage" className="flex flex-col gap-8">
      <header id="unit-header" data-component="UnitPage">
        <p
          id="unit-step-title"
          data-component="UnitPage"
          className="text-muted-foreground text-xs font-medium tracking-wide uppercase"
        >
          {localise(step.title, locale)}
        </p>
        <h1
          id="unit-title"
          data-component="UnitPage"
          className="font-heading mt-1 text-2xl font-semibold"
        >
          {localise(unit.title, locale)}
        </h1>
      </header>

      {unit.html && <StepContent html={localise(unit.html, locale)} />}

      {unit.figure}

      {unit.quiz && (
        // Keyed so walking from one quiz to the next starts from unanswered questions.
        <QuizPanel key={`${step.id}/${unit.id}`} questions={unit.quiz} />
      )}

      {unit.exerciseId && (
        <ExercisePanel
          // Keyed so walking from one graded unit to the next starts from an empty box.
          key={unit.exerciseId}
          exerciseId={unit.exerciseId}
          placeholder={
            unit.exercisePlaceholder ? localise(unit.exercisePlaceholder, locale) : undefined
          }
        />
      )}

      <UnitPager stepId={step.id} unitId={unit.id} />
    </div>
  )
}
