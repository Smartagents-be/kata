import type { Step } from '@/shared/step'
import { BundleCompare } from './BundleCompare'
import { ContextDiagram } from './ContextDiagram'
import { ContextFalloff } from './ContextFalloff'
import { FlagBoard } from './FlagBoard'
import { OneShotCompare } from './OneShotCompare'
import { PromptInContext } from './PromptInContext'
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
 * Step 1, one layer of context per unit. `evaluation` closes the step with a flag board (like
 * step 2's workshop): three flags the `GET /api/titles` backend hides from its response, one per
 * way context is assembled - read the source, trace the run, turn the log level up. The board
 * grades in the browser against salted hashes, so it needs no backend and there is no Java checker.
 *
 * Every string here is a key into `locales/`, except the unit HTML, which *is* the English and
 * carries `data-i18n` keys for the rest. The flags themselves stay English/mono in every language.
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
      inlineFigures: {
        'context-diagram': <ContextDiagram />,
        'oneshot-compare': <OneShotCompare />,
        'context-falloff': <ContextFalloff />,
      },
      quiz: introQuiz,
    },
    {
      id: 'prompt',
      title: 'prompt.title',
      html: prompt,
      inlineFigures: {
        'prompt-in-context': <PromptInContext />,
        'bundle-compare': <BundleCompare />,
      },
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
      figure: <FlagBoard />,
    },
  ],
}

export default step1
