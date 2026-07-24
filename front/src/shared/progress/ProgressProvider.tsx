import { useCallback, useMemo, useState, type ReactNode } from 'react'
import { ProgressContext } from './ProgressContext'
import { readStoredProgress, storeProgress } from './progress'

export function ProgressProvider({ children }: { children: ReactNode }) {
  const [completed, setCompleted] = useState<Set<string>>(readStoredProgress)

  const markComplete = useCallback((key: string) => {
    setCompleted((current) => {
      // Already done: return the same set so nothing downstream re-renders.
      if (current.has(key)) {
        return current
      }
      const next = new Set(current)
      next.add(key)
      storeProgress(next)
      return next
    })
  }, [])

  const isComplete = useCallback((key: string) => completed.has(key), [completed])

  const value = useMemo(
    () => ({ completed, isComplete, markComplete }),
    [completed, isComplete, markComplete],
  )

  return <ProgressContext value={value}>{children}</ProgressContext>
}
