import { useTranslation } from 'react-i18next'
import { DEFAULT_LOCALE, isLocale, type Locale } from './locale'

/**
 * The active language and a way to change it, for the places that care *which* language is on
 * rather than what a string says. Anything that only needs text uses `useTranslation()` directly.
 *
 * i18next reports whatever the detector resolved, so an unknown or regional language comes back as
 * the default here rather than as itself.
 */
export function useLocale(): { locale: Locale; setLocale: (locale: Locale) => void } {
  const { i18n } = useTranslation()
  const language = i18n.resolvedLanguage ?? i18n.language

  return {
    locale: isLocale(language) ? language : DEFAULT_LOCALE,
    setLocale: (locale: Locale) => {
      void i18n.changeLanguage(locale)
    },
  }
}
