import i18next from 'i18next'
import LanguageDetector from 'i18next-browser-languagedetector'
import { initReactI18next } from 'react-i18next'
import { DEFAULT_LOCALE, LOCALE_STORAGE_KEY, SUPPORTED_LOCALES, type Locale } from './locale'
import en from './locales/en.json'
import nl from './locales/nl.json'

/**
 * The one i18next instance, initialised for its side effect: `main.tsx` imports this module before
 * it renders, and every component reads from it through `useTranslation()`.
 *
 * Two kinds of message live in it, in two kinds of namespace:
 *
 * - `ui` holds the chrome, from `locales/en.json` and `locales/nl.json` beside this file.
 * - one namespace per step (`step1`, `step2`) holds that step's content, registered from
 *   `steps/index.ts`. `shared` never imports a step, so the steps push their bundles in here
 *   rather than this file pulling them.
 *
 * Grading messages from the Java service and the catalogue titles are English in every language.
 * The Dutch strings say so where a student would otherwise be surprised by it.
 */

/** Every UI string is written in English first. */
export type MessageKey = keyof typeof en

// Annotated rather than passed straight in: a UI string that is not translated is a compile error
// here, which is the guarantee the hand-rolled messages.ts used to give.
const dutch: Record<MessageKey, string> = nl

void i18next
  .use(LanguageDetector)
  .use(initReactI18next)
  .init({
    resources: {
      en: { ui: en },
      nl: { ui: dutch },
    },
    defaultNS: 'ui',
    fallbackLng: DEFAULT_LOCALE,
    supportedLngs: SUPPORTED_LOCALES,
    // Keys are dotted names, not a nested tree: 'nav.steps' is one key with a dot in it.
    keySeparator: false,
    // React escapes what it renders, so escaping here as well would show &quot; on the page.
    interpolation: { escapeValue: false },
    detection: {
      order: ['localStorage'],
      caches: ['localStorage'],
      lookupLocalStorage: LOCALE_STORAGE_KEY,
    },
  })

// Keeps <html lang> honest for screen readers and for the browser's own language handling.
const syncDocumentLanguage = (locale: string) => {
  document.documentElement.lang = locale
}
syncDocumentLanguage(i18next.language || DEFAULT_LOCALE)
i18next.on('languageChanged', syncDocumentLanguage)

/**
 * Adds one step's content bundles under its own namespace. Called by `steps/index.ts` at module
 * load, which is before anything renders.
 */
export function registerStepLocales(
  namespace: string,
  bundles: Partial<Record<Locale, Record<string, string>>>,
): void {
  for (const [locale, bundle] of Object.entries(bundles)) {
    i18next.addResourceBundle(locale, namespace, bundle, true, true)
  }
}

export default i18next
