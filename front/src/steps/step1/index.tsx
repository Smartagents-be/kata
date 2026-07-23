import type { Step } from '@/shared/step'
import { ContextDiagram } from './ContextDiagram'
import en from './locales/en.json'
import nl from './locales/nl.json'
import { introQuiz, promptQuiz } from './quiz'
import intro from './units/intro.html?raw'
import prompt from './units/prompt.html?raw'
import session from './units/session.html?raw'
import harness from './units/harness.html?raw'
import external from './units/external.html?raw'
import evaluation from './units/evaluation.html?raw'

/**
 * Step 1, one layer of context per unit. `evaluation` closes the step and is the one graded unit
 * (ContextLayersChecker).
 *
 * Every string here is a key into `locales/`, except the unit HTML, which *is* the English and
 * carries `data-i18n` keys for the rest. Answer labels stay English in every language: they are
 * what the Java checkers grade.
 */
const step1: Step = {
  id: 'step1',
  title: 'step.title',
  locales: { en, nl },
  units: [
    {
      id: 'intro',
      title: 'intro.title',
      html: intro,
      figure: <ContextDiagram />,
      quiz: introQuiz,
    },
    {
      id: 'prompt',
      title: 'prompt.title',
      html: prompt,
      quiz: promptQuiz,
    },
    {
      id: 'session',
      title: 'session.title',
      html: session,
    },
    {
      id: 'harness',
      title: 'harness.title',
      html: harness,
    },
    {
      id: 'external',
      title: 'external.title',
      html: external,
    },
    {
      id: 'evaluation',
      title: 'evaluation.title',
      html: evaluation,
      exerciseId: 'context-layers',
      exercisePlaceholder: 'evaluation.placeholder',
    },
  ],
}

export default step1
