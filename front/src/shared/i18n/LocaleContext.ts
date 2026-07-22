import { createContext } from 'react'
import type { Locale } from './locale'
import type { MessageKey } from './messages'

export interface LocaleContextValue {
  locale: Locale
  setLocale: (locale: Locale) => void
  /** Translates a UI string; see `messages.ts`. */
  t: (key: MessageKey, params?: Record<string, string | number>) => string
}

export const LocaleContext = createContext<LocaleContextValue | null>(null)
