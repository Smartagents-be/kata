/**
 * The languages this kata is available in. English is the source language: every UI string and
 * every step is written in it first, and anything not yet translated falls back to it.
 *
 * Shaped deliberately like `shared/mode/mode.ts` — same storage-key convention, same tolerance
 * for localStorage throwing.
 */
export type Locale = 'en' | 'nl'

export const DEFAULT_LOCALE: Locale = 'en'

export const LOCALE_STORAGE_KEY = 'kata.locale'

/** Display names are written in the language they name, never translated. */
export const LOCALES: ReadonlyArray<{ locale: Locale; label: string }> = [
  { locale: 'en', label: 'English' },
  { locale: 'nl', label: 'Nederlands' },
]

export function isLocale(value: unknown): value is Locale {
  return value === 'en' || value === 'nl'
}

export function readStoredLocale(): Locale {
  try {
    const stored = window.localStorage.getItem(LOCALE_STORAGE_KEY)
    return isLocale(stored) ? stored : DEFAULT_LOCALE
  } catch {
    // Private browsing and similar can make localStorage throw; the app still works.
    return DEFAULT_LOCALE
  }
}

export function storeLocale(locale: Locale): void {
  try {
    window.localStorage.setItem(LOCALE_STORAGE_KEY, locale)
  } catch {
    // Persistence is a convenience, not a requirement.
  }
}

/**
 * A value that exists in English and, optionally, in other languages. Requiring `en` is what
 * makes {@link localise} total: there is always something to render.
 */
export type Localised<T> = { en: T } & Partial<Record<Locale, T>>

export function localise<T>(value: Localised<T>, locale: Locale): T {
  return value[locale] ?? value.en
}
