import { createContext } from 'react'
import type { Assistant } from './assistant'

export interface AssistantContextValue {
  assistant: Assistant
  setAssistant: (assistant: Assistant) => void
}

export const AssistantContext = createContext<AssistantContextValue | null>(null)
