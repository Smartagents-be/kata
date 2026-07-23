/**
 * The languages this kata is available in. English is the source language: every UI string is
 * written in it first, every unit's HTML is written in it, and anything not yet translated falls
 * back to it.
 *
 * Resolution, persistence and fallback are i18next's job (see `i18n.ts`). What is left here is the
 * vocabulary the app uses to talk about languages, plus the storage key, which is still
 * `kata.locale` so a student's choice survives this change.
 */
export type Locale = 'en' | 'nl'

export const DEFAULT_LOCALE: Locale = 'en'

export const LOCALE_STORAGE_KEY = 'kata.locale'

/** Display names are written in the language they name, never translated. */
export const LOCALES: ReadonlyArray<{ locale: Locale; label: string }> = [
  { locale: 'en', label: 'English' },
  { locale: 'nl', label: 'Nederlands' },
]

export const SUPPORTED_LOCALES: Locale[] = LOCALES.map(({ locale }) => locale)

export function isLocale(value: unknown): value is Locale {
  return value === 'en' || value === 'nl'
}
