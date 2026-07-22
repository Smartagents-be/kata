import { createContext } from 'react'
import type { Mode } from './mode'

export interface ModeContextValue {
  mode: Mode
  setMode: (mode: Mode) => void
}

export const ModeContext = createContext<ModeContextValue | null>(null)
