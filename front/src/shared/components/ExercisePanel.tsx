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

export function ExercisePanel({ exerciseId }: { exerciseId: string }) {
  const [answer, setAnswer] = useState('')
  const [state, setState] = useState<State>({ phase: 'idle' })

  async function onSubmit(event: FormEvent) {
    event.preventDefault()
    setState({ phase: 'checking' })
    try {
      setState({ phase: 'checked', result: await checkAnswer(exerciseId, answer) })
    } catch {
      setState({
        phase: 'error',
        message: 'Could not reach the backend. Is it running on port 8080?',
      })
    }
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>Your answer</CardTitle>
        <CardDescription>Graded by the Java service, not the browser.</CardDescription>
      </CardHeader>
      <CardContent>
        <form onSubmit={onSubmit} className="flex flex-col gap-3">
          <textarea
            value={answer}
            onChange={(event) => setAnswer(event.target.value)}
            rows={3}
            spellCheck={false}
            placeholder="1, 2, Fizz, 4, …"
            aria-label="Your answer"
            className="border-input bg-background focus-visible:ring-ring/50 min-h-20 w-full rounded-md border px-3 py-2 font-mono text-sm focus-visible:ring-[3px] focus-visible:outline-none"
          />
          <div className="flex items-center gap-3">
            <Button type="submit" disabled={state.phase === 'checking' || answer.trim() === ''}>
              {state.phase === 'checking' ? 'Checking…' : 'Check answer'}
            </Button>
          </div>
        </form>

        {state.phase === 'error' && (
          <p className="text-destructive mt-4 text-sm">{state.message}</p>
        )}

        {state.phase === 'checked' && (
          <div
            role="status"
            className={cn(
              'mt-4 rounded-md border px-4 py-3 text-sm',
              state.result.passed
                ? 'border-emerald-600/30 bg-emerald-600/10'
                : 'border-destructive/30 bg-destructive/10',
            )}
          >
            <p className="font-medium">{state.result.message}</p>
            {state.result.details.length > 0 && (
              <ul className="mt-2 list-disc space-y-1 pl-5 font-mono text-xs">
                {state.result.details.map((detail) => (
                  <li key={detail}>{detail}</li>
                ))}
              </ul>
            )}
          </div>
        )}
      </CardContent>
    </Card>
  )
}
