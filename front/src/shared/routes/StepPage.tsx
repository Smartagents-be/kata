import { Navigate, useParams } from 'react-router-dom'
import { useLocale } from '@/shared/i18n/useLocale'
import { findStep, firstUnitPath } from '@/steps'

/**
 * A step has no page of its own: /steps/step1 opens its first unit. Only the "no such step" case
 * renders anything here.
 */
export function StepPage() {
  const { stepId } = useParams()
  const { t } = useLocale()
  const step = findStep(stepId)

  if (!step) {
    return (
      <div id="step-not-found" data-component="StepPage" className="text-muted-foreground">
        <h1
          id="step-not-found-title"
          data-component="StepPage"
          className="text-foreground mb-2 text-xl font-semibold"
        >
          {t('step.notFound.title')}
        </h1>
        <p id="step-not-found-body" data-component="StepPage" className="text-sm">
          {t('step.notFound.body', { id: stepId ?? '' })}
        </p>
      </div>
    )
  }

  return <Navigate to={firstUnitPath(step)} replace />
}
