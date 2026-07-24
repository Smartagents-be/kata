import { useContext } from 'react'
import { ProgressContext } from './ProgressContext'

export function useProgress() {
  const context = useContext(ProgressContext)
  if (!context) {
    throw new Error('useProgress must be used inside a <ProgressProvider>')
  }
  return context
}
