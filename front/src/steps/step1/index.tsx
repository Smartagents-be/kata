import type { Step } from '@/shared/step'
import { BudgetWindow } from './BudgetWindow'
import { BundleCompare } from './BundleCompare'
import { ContextDiagram } from './ContextDiagram'
import { ContextFalloff } from './ContextFalloff'
import { CoordinatorFanout } from './CoordinatorFanout'
import { CutItUp } from './CutItUp'
import { ExactAsk } from './ExactAsk'
import { FlagBoard } from './FlagBoard'
import { McpOvals } from './McpOvals'
import { McpParts } from './McpParts'
import { McpServer } from './McpServer'
import { ModelPricing } from './ModelPricing'
import { ModelTiers } from './ModelTiers'
import { NextToken } from './NextToken'
import { OneShotCompare } from './OneShotCompare'
import { PatternMatch } from './PatternMatch'
import { PickTheTier } from './PickTheTier'
import { PromptInContext } from './PromptInContext'
import { ReadYourWindow } from './ReadYourWindow'
import { ReflectionLoop } from './ReflectionLoop'
import { SequentialSteps } from './SequentialSteps'
import { SessionMakeup } from './SessionMakeup'
import { SpotInjection } from './SpotInjection'
import { SurviveTheClear } from './SurviveTheClear'
import { TokenAttention } from './TokenAttention'
import { TokenSplit } from './TokenSplit'
import { ToolsInContext } from './ToolsInContext'
import deck from './deck'
import en from './locales/en.json'
import nl from './locales/nl.json'
import { contextQuiz, promptQuiz } from './quiz'
import tokens from './units/tokens.html?raw'
import prompt from './units/prompt.html?raw'
import tools from './units/tools.html?raw'
import context from './units/context.html?raw'
import session from './units/session.html?raw'
import harness from './units/harness.html?raw'
import model from './units/model.html?raw'
import workshop from './units/workshop.html?raw'

/**
 * Step 1, one layer of context per unit, plus two units that are not layers. `tokens` opens the step
 * and is the unit the window is counted in; `model` closes the prose and is the reader on the other
 * end of it. Neither fills the window, which is why `workshop` still names four layers and not six.
 *
 * The two layers a student writes and reads for themselves come first, so `prompt` and `tools` sit
 * ahead of `context`. That makes `prompt` the unit that defines the word context, and it makes
 * `context` the step back to the whole window rather than the first sight of it.
 *
 * `workshop` closes the step with a flag board (like
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
      id: 'tokens',
      title: 'tokens.title',
      html: tokens,
      inlineFigures: {
        'token-split': <TokenSplit />,
        'next-token': <NextToken />,
        'token-attention': <TokenAttention />,
      },
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
      id: 'tools',
      title: 'tools.title',
      html: tools,
      inlineFigures: {
        'tools-in-context': <ToolsInContext />,
        'mcp-server': <McpServer />,
        'mcp-parts': <McpParts />,
        'mcp-ovals': <McpOvals />,
        'spot-injection': <SpotInjection />,
        'budget-window': <BudgetWindow />,
        'read-your-window': <ReadYourWindow />,
      },
    },
    {
      id: 'context',
      title: 'context.title',
      html: context,
      inlineFigures: {
        'context-diagram': <ContextDiagram />,
        'oneshot-compare': <OneShotCompare />,
        'context-falloff': <ContextFalloff />,
      },
      quiz: contextQuiz,
    },
    {
      id: 'session',
      title: 'session.title',
      html: session,
      inlineFigures: {
        'session-makeup': <SessionMakeup />,
        'survive-the-clear': <SurviveTheClear />,
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
        'cut-it-up': <CutItUp />,
      },
      figure: <PatternMatch />,
    },
    {
      id: 'model',
      title: 'model.title',
      html: model,
      inlineFigures: {
        'model-tiers': <ModelTiers />,
        'model-pricing': <ModelPricing />,
        'pick-the-tier': <PickTheTier />,
      },
    },
    {
      id: 'workshop',
      title: 'workshop.title',
      html: workshop,
      figure: <FlagBoard />,
    },
  ],
  // What the tutor puts on the board for this step. Authored in `deck.tsx`, beside the figures it
  // reuses; nothing in it renders unit prose.
  deck,
}

export default step1
