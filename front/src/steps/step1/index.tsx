import type { Step } from '@/shared/step'
import { BudgetWindow } from './BudgetWindow'
import { BundleCompare } from './BundleCompare'
import { ContextDiagram } from './ContextDiagram'
import { ContextFalloff } from './ContextFalloff'
import { CoordinatorFanout } from './CoordinatorFanout'
import { ExactAsk } from './ExactAsk'
import { FlagBoard } from './FlagBoard'
import { McpServer } from './McpServer'
import { OneShotCompare } from './OneShotCompare'
import { PatternMatch } from './PatternMatch'
import { PromptInContext } from './PromptInContext'
import { ReflectionLoop } from './ReflectionLoop'
import { SequentialSteps } from './SequentialSteps'
import { SessionMakeup } from './SessionMakeup'
import { SpotInjection } from './SpotInjection'
import { ToolsInContext } from './ToolsInContext'
import en from './locales/en.json'
import nl from './locales/nl.json'
import { introQuiz, promptQuiz } from './quiz'
import intro from './units/intro.html?raw'
import prompt from './units/prompt.html?raw'
import session from './units/session.html?raw'
import tools from './units/tools.html?raw'
import harness from './units/harness.html?raw'
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
        'exact-ask': <ExactAsk />,
      },
      quiz: promptQuiz,
    },
    {
      id: 'session',
      title: 'session.title',
      html: session,
      inlineFigures: {
        'session-makeup': <SessionMakeup />,
      },
    },
    {
      id: 'tools',
      title: 'tools.title',
      html: tools,
      inlineFigures: {
        'tools-in-context': <ToolsInContext />,
        'mcp-server': <McpServer />,
        'spot-injection': <SpotInjection />,
        'budget-window': <BudgetWindow />,
      },
    },
    {
      id: 'harness',
      title: 'harness.title',
      html: harness,
      inlineFigures: {
        'coordinator-fanout': <CoordinatorFanout />,
        'sequential-steps': <SequentialSteps />,
        'reflection-loop': <ReflectionLoop />,
      },
      figure: <PatternMatch />,
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
