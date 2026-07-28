import { useCallback, useMemo, useState, type ReactNode } from 'react'
import { AssistantContext } from './AssistantContext'
import { readStoredAssistant, storeAssistant, type Assistant } from './assistant'

export function AssistantProvider({ children }: { children: ReactNode }) {
  const [assistant, setAssistantState] = useState<Assistant>(readStoredAssistant)

  const setAssistant = useCallback((next: Assistant) => {
    setAssistantState(next)
    storeAssistant(next)
  }, [])

  const value = useMemo(() => ({ assistant, setAssistant }), [assistant, setAssistant])

  return <AssistantContext value={value}>{children}</AssistantContext>
}
