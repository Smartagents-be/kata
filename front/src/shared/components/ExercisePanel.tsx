import { CircleCheckIcon, CircleXIcon } from 'lucide-react'
import { useTranslation } from 'react-i18next'
import { useState, type FormEvent } from 'react'
import { Button } from '@/shared/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/shared/components/ui/card'
import { checkAnswer, type CheckResult } from '@/shared/lib/api'
import { cn } from '@/shared/lib/utils'

type State =
  | { phase: 'idle' }
  | { phase: 'checking' }
  | { phase: 'checked'; result: CheckResult }
  | { phase: 'error'; message: string }

export function ExercisePanel({
  exerciseId,
  placeholder,
}: {
  exerciseId: string
  placeholder?: string
}) {
  const [answer, setAnswer] = useState('')
  const [state, setState] = useState<State>({ phase: 'idle' })
  const { t } = useTranslation()

  async function onSubmit(event: FormEvent) {
    event.preventDefault()
    setState({ phase: 'checking' })
    try {
      setState({ phase: 'checked', result: await checkAnswer(exerciseId, answer) })
    } catch {
      setState({ phase: 'error', message: t('exercise.offline') })
    }
  }

  return (
    <Card id="exercise" data-component="ExercisePanel">
      <CardHeader id="exercise-header" data-component="ExercisePanel">
        <CardTitle id="exercise-title" data-component="ExercisePanel">
          {t('exercise.title')}
        </CardTitle>
        <CardDescription id="exercise-description" data-component="ExercisePanel">
          {t('exercise.description')}
        </CardDescription>
      </CardHeader>
      <CardContent id="exercise-content" data-component="ExercisePanel">
        <form
          id="exercise-form"
          data-component="ExercisePanel"
          onSubmit={onSubmit}
          className="flex flex-col gap-3"
        >
          <textarea
            id="exercise-answer"
            data-component="ExercisePanel"
            value={answer}
            onChange={(event) => setAnswer(event.target.value)}
            rows={3}
            spellCheck={false}
            placeholder={placeholder ?? t('exercise.placeholder')}
            aria-label={t('exercise.title')}
            className="field min-h-20 w-full"
          />
          <div id="exercise-actions" data-component="ExercisePanel" className="flex items-center gap-3">
            <Button
              id="exercise-submit"
              data-component="ExercisePanel"
              type="submit"
              disabled={state.phase === 'checking' || answer.trim() === ''}
            >
              {state.phase === 'checking' ? t('exercise.submitting') : t('exercise.submit')}
            </Button>
          </div>
        </form>

        {state.phase === 'error' && (
          <p id="exercise-error" data-component="ExercisePanel" className="text-destructive mt-4 text-sm">
            {state.message}
          </p>
        )}

        {state.phase === 'checked' && (
          <div
            id="exercise-result"
            data-component="ExercisePanel"
            data-state={state.result.passed ? 'passed' : 'failed'}
            role="status"
            className={cn(
              'mt-4 rounded-xl border px-4 py-3 text-sm',
              state.result.passed
                ? 'border-success/30 bg-success/10 text-success-foreground'
                : 'border-destructive/30 bg-destructive/10 text-destructive',
            )}
          >
            <p
              id="exercise-result-message"
              data-component="ExercisePanel"
              className="flex items-center gap-2 font-medium"
            >
              {state.result.passed ? (
                <CircleCheckIcon
                  id="exercise-result-icon"
                  data-component="ExercisePanel"
                  aria-hidden
                  className="size-4 shrink-0"
                />
              ) : (
                <CircleXIcon
                  id="exercise-result-icon"
                  data-component="ExercisePanel"
                  aria-hidden
                  className="size-4 shrink-0"
                />
              )}
              {state.result.message}
            </p>
            {state.result.details.length > 0 && (
              <ul
                id="exercise-result-details"
                data-component="ExercisePanel"
                className="mt-2 list-disc space-y-1 pl-5 font-mono text-xs"
              >
                {state.result.details.map((detail, index) => (
                  <li
                    key={detail}
                    id={`exercise-result-detail-${index}`}
                    data-component="ExercisePanel"
                  >
                    {detail}
                  </li>
                ))}
              </ul>
            )}
          </div>
        )}
      </CardContent>
    </Card>
  )
}
