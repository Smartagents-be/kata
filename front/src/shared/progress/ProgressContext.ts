import { createContext } from 'react'

export interface ProgressContextValue {
  /** Every completed unit key. Exposed so consumers re-render when the set changes. */
  completed: ReadonlySet<string>
  isComplete: (key: string) => boolean
  markComplete: (key: string) => void
}

export const ProgressContext = createContext<ProgressContextValue | null>(null)
