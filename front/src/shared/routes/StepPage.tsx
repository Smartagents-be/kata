import { useParams } from 'react-router-dom'
import { ExercisePanel } from '@/shared/components/ExercisePanel'
import { StepContent } from '@/shared/components/StepContent'
import { findStep } from '@/steps'

export function StepPage() {
  const { stepId } = useParams()
  const step = findStep(stepId)

  if (!step) {
    return (
      <div className="text-muted-foreground">
        <h1 className="text-foreground mb-2 text-xl font-semibold">Step not found</h1>
        <p className="text-sm">
          There is no step called <code className="font-mono">{stepId}</code>. Pick one from the
          list on the left.
        </p>
      </div>
    )
  }

  return (
    <div className="flex flex-col gap-8">
      <StepContent html={step.html} />
      {step.exerciseId && <ExercisePanel exerciseId={step.exerciseId} />}
    </div>
  )
}
