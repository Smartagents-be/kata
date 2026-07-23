import type en from './locales/en.json'

/**
 * Types the `ui` namespace from the English bundle, so `t('nav.step')` is a compile error and
 * `t('nav.steps')` is not.
 *
 * Step namespaces are deliberately loose. Their keys live in unit HTML (`data-i18n="setup.intro"`)
 * and in the step registries, so TypeScript has nothing to check them against, and the index
 * signature also keeps `shared` from having to name the steps that exist.
 */
declare module 'i18next' {
  interface CustomTypeOptions {
    defaultNS: 'ui'
    keySeparator: false
    resources: {
      ui: typeof en
      [step: string]: Record<string, string>
    }
  }
}
