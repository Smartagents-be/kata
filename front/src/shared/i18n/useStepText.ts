import { useMemo } from 'react'
import { useTranslation } from 'react-i18next'

export interface StepText {
  /** The message for this key. Falls back to English, then to the key itself. */
  text: (key: string) => string
  /**
   * The message for this key, or `null` when the active language has nothing for it. Prose uses
   * this: no entry means the authored English in the HTML file stays where it is.
   */
  lookup: (key: string) => string | null
  /**
   * Whether this namespace carries the key at all, in the active language or in the English
   * fallback. Silent, unlike `lookup`: it answers a question about the content rather than
   * reporting a missing translation, so an optional string can be left out on purpose.
   */
  has: (key: string) => boolean
}

/**
 * Reads one step's messages. Step namespaces are addressed with keys that live in unit HTML and in
 * the step registries, so this takes plain strings where `useTranslation()` wants literals it can
 * check against a bundle.
 *
 * A key with no translation in a non-English language is a missing translation, not a design: it
 * says so in the console during development, which is what replaces the compile error the
 * hand-written message table used to give.
 */
export function useStepText(namespace: string): StepText {
  const { t, i18n } = useTranslation(namespace)

  return useMemo(
    () => ({
      // Read the value from the instance store rather than the hook's `t` whenever the key exists.
      // After an SPA navigation into a step, react-i18next can hand back a `t` that returns the key
      // until it marks that step's namespace ready for this hook, so `t(key)` would render the raw
      // key (e.g. a `context.title` heading) until a reload. The step bundles are registered
      // synchronously at module load, so the store already holds the value `exists` confirms.
      text: (key: string) =>
        i18n.exists(key, { ns: namespace }) ? i18n.t(key, { ns: namespace }) : t(key),
      lookup: (key: string) => {
        if (i18n.exists(key, { ns: namespace })) {
          // Same store read as `text`, for the same reason; StepContent additionally bakes the
          // result into dangerouslySetInnerHTML through a useMemo whose deps don't change when
          // readiness flips, so the raw key would otherwise stick until a reload.
          return i18n.t(key, { ns: namespace })
        }
        if (import.meta.env.DEV && i18n.resolvedLanguage !== 'en') {
          console.warn(`[i18n] ${namespace}:${key} has no ${i18n.resolvedLanguage} translation`)
        }
        return null
      },
      has: (key: string) => i18n.exists(key, { ns: namespace }),
    }),
    [t, i18n, namespace],
  )
}
