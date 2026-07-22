import type { Locale } from './locale'

/**
 * UI strings, keyed by a dotted name. English is the source: `MessageKey` is derived from it, so
 * adding a key here and forgetting to translate it is a type error rather than a surprise in
 * class. Step *content* is translated differently — see `Localised` in `locale.ts`.
 *
 * `{name}` placeholders are filled in by `t(key, params)`.
 */
const en = {
  'nav.steps': 'Steps',
  'nav.units': 'Pages in this step',

  'unit.previous': 'Back',
  'unit.next': 'Next',

  'settings.open': 'Settings',
  'settings.title': 'Settings',
  'settings.description': 'Language, and how you are working through the kata.',
  'settings.language': 'Language',
  'settings.mode': 'Self-learning',
  'settings.mode.on': 'Notes are shown',
  'settings.mode.off': 'Exercises only',
  'settings.mode.aria': 'Toggle self-learning mode',
  'settings.close': 'Close',

  'backend.checking': 'Connecting…',
  'backend.up': 'Backend {version}',
  'backend.down': 'Backend offline',
  'backend.down.hint': 'Is the backend running? mvn spring-boot:run',

  'exercise.title': 'Your answer',
  'exercise.description': 'Graded by the Java service, not the browser.',
  'exercise.placeholder': 'Your answer…',
  'exercise.submit': 'Check answer',
  'exercise.submitting': 'Checking…',
  'exercise.offline': 'Could not reach the backend. Is it running on port 8080?',

  'quiz.title': 'Check yourself',
  'quiz.question': 'Question {number} of {total}',
  'quiz.submit': 'Check answers',

  'catalog.nav': 'Catalogue',
  'catalog.kicker': 'The service',
  'catalog.title': 'Titles from the service',
  'catalog.description': 'One call to /api/titles. Whatever comes back is listed as it arrived.',
  'catalog.fetch': 'Fetch titles',
  'catalog.fetching': 'Fetching…',
  'catalog.count': '{count} returned',
  'catalog.empty': 'The service returned nothing at all.',
  'catalog.error': 'Could not reach the backend. Is it running on port 8080?',

  'step.notFound.title': 'Step not found',
  'step.notFound.body': 'There is no step called “{id}”. Pick one from the list on the left.',
  'unit.notFound.title': 'Page not found',
  'unit.notFound.body': 'This step has no page called “{id}”. Pick one from the list on the left.',
} as const

export type MessageKey = keyof typeof en

const nl: Record<MessageKey, string> = {
  'nav.steps': 'Stappen',
  'nav.units': "Pagina's in deze stap",

  'unit.previous': 'Terug',
  'unit.next': 'Verder',

  'settings.open': 'Instellingen',
  'settings.title': 'Instellingen',
  'settings.description': 'Taal, en hoe je de kata doorloopt.',
  'settings.language': 'Taal',
  'settings.mode': 'Zelfstudie',
  'settings.mode.on': 'Notities worden getoond',
  'settings.mode.off': 'Alleen oefeningen',
  'settings.mode.aria': 'Zelfstudiemodus aan- of uitzetten',
  'settings.close': 'Sluiten',

  'backend.checking': 'Verbinden…',
  'backend.up': 'Backend {version}',
  'backend.down': 'Backend offline',
  'backend.down.hint': 'Draait de backend? mvn spring-boot:run',

  'exercise.title': 'Jouw antwoord',
  // The Java service grades in English; say so rather than let it surprise anyone mid-exercise.
  'exercise.description': 'Nagekeken door de Java-service. De feedback is in het Engels.',
  'exercise.placeholder': 'Jouw antwoord…',
  'exercise.submit': 'Antwoord nakijken',
  'exercise.submitting': 'Nakijken…',
  'exercise.offline': 'Kan de backend niet bereiken. Draait die op poort 8080?',

  'quiz.title': 'Test jezelf',
  'quiz.question': 'Vraag {number} van {total}',
  'quiz.submit': 'Antwoorden nakijken',

  'catalog.nav': 'Catalogus',
  'catalog.kicker': 'De service',
  'catalog.title': 'Titels uit de service',
  // The titles themselves come from the Java service and stay English, like the grading messages.
  'catalog.description':
    'Eén oproep naar /api/titles. Wat terugkomt staat hieronder, in dezelfde volgorde. De titels zijn Engels.',
  'catalog.fetch': 'Titels ophalen',
  'catalog.fetching': 'Ophalen…',
  'catalog.count': '{count} teruggekregen',
  'catalog.empty': 'De service gaf helemaal niets terug.',
  'catalog.error': 'Kan de backend niet bereiken. Draait die op poort 8080?',

  'step.notFound.title': 'Stap niet gevonden',
  'step.notFound.body': 'Er is geen stap “{id}”. Kies er een uit de lijst links.',
  'unit.notFound.title': 'Pagina niet gevonden',
  'unit.notFound.body': 'Deze stap heeft geen pagina “{id}”. Kies er een uit de lijst links.',
}

export const messages: Record<Locale, Record<MessageKey, string>> = { en, nl }

/** Looks up a message, falling back to English, and fills in any `{name}` placeholders. */
export function translate(
  locale: Locale,
  key: MessageKey,
  params?: Record<string, string | number>,
): string {
  const template = messages[locale][key] ?? messages.en[key]
  if (!params) {
    return template
  }
  return template.replace(/\{(\w+)\}/g, (match, name: string) =>
    name in params ? String(params[name]) : match,
  )
}
