import { useCallback, useEffect, useMemo, useState, type ReactNode } from 'react'
import { LocaleContext } from './LocaleContext'
import { readStoredLocale, storeLocale, type Locale } from './locale'
import { translate, type MessageKey } from './messages'

export function LocaleProvider({ children }: { children: ReactNode }) {
  const [locale, setLocaleState] = useState<Locale>(readStoredLocale)

  const setLocale = useCallback((next: Locale) => {
    setLocaleState(next)
    storeLocale(next)
  }, [])

  // Keeps <html lang> honest for screen readers and for the browser's own language handling,
  // including on first paint when the locale comes back from localStorage.
  useEffect(() => {
    document.documentElement.lang = locale
  }, [locale])

  const value = useMemo(
    () => ({
      locale,
      setLocale,
      t: (key: MessageKey, params?: Record<string, string | number>) =>
        translate(locale, key, params),
    }),
    [locale, setLocale],
  )

  return <LocaleContext value={value}>{children}</LocaleContext>
}
