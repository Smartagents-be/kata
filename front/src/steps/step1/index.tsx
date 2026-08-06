import { UnitShot } from '@/shared/components/UnitShot'
import type { Step } from '@/shared/step'
import { AnswerProvenance } from './AnswerProvenance'
import { BudgetWindow } from './BudgetWindow'
import { BundleCompare } from './BundleCompare'
import { ConnectOne } from './ConnectOne'
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
import { OneWindow } from './OneWindow'
import { PatternMatch } from './PatternMatch'
import { PickTheNext } from './PickTheNext'
import { PickTheTier } from './PickTheTier'
import { PlanItTwice } from './PlanItTwice'
import { PriceOneTurn } from './PriceOneTurn'
import { PromptInContext } from './PromptInContext'
import { ReadYourWindow } from './ReadYourWindow'
import { ReasoningCost } from './ReasoningCost'
import { ReflectionLoop } from './ReflectionLoop'
import { SequentialSteps } from './SequentialSteps'
import { SessionMakeup } from './SessionMakeup'
import { SessionWindows } from './SessionWindows'
import { ShutterFlag } from './ShutterFlag'
import { SpeedAtScale } from './SpeedAtScale'
import { SpotInjection } from './SpotInjection'
import { SurviveTheClear } from './SurviveTheClear'
import { TokenAttention } from './TokenAttention'
import { TokenSplit } from './TokenSplit'
import { ToolsInContext } from './ToolsInContext'
import { TrainedOrGrounded } from './TrainedOrGrounded'
import { UnderSpecified } from './UnderSpecified'
import { WhereTheSeamFalls } from './WhereTheSeamFalls'
import { WordsIntoTokens } from './WordsIntoTokens'
import deck from './deck'
import en from './locales/en.json'
import nl from './locales/nl.json'
import { contextQuiz, promptQuiz, truthQuiz } from './quiz'
import tokens from './units/tokens.html?raw'
import prompt from './units/prompt.html?raw'
import tools from './units/tools.html?raw'
import context from './units/context.html?raw'
import session from './units/session.html?raw'
import harness from './units/harness.html?raw'
import model from './units/model.html?raw'
import truth from './units/truth.html?raw'
import workshop from './units/workshop.html?raw'
import recap from './units/recap.html?raw'

/**
 * Step 1, one layer of context per unit, plus three units that are not layers. `tokens` opens the
 * step and is the unit the window is counted in; `model` is the reader on the other end of it and
 * `truth` is where that reader's answers come from. None of the three fills the window.
 *
 * The two layers a student writes and reads for themselves come first, so `prompt` and `tools` sit
 * ahead of `context`. No unit defines the word before then: it is used as an ordinary one from
 * `prompt.lead.1` onward, and the definition sits in one clause inside `context.lead.1`, which is
 * the unit named after it and the unit that takes the window apart.
 *
 * `workshop` is the step's capstone, a flag board (like
 * step 2's workshop): five flags, one per place an answer can come from. Ask what your own machine
 * told the agent, read the whole response, turn the log level up, read the source, trace the run, in
 * that order because it runs easiest first and outside in. Only the first comes from no project at
 * all, and it was planted at install time rather than here: `install.txt` at the repo root asks the
 * student's agent to run `kata/step1/machine-context.mjs`, so by the time they reach this board the
 * line has been in every session they have opened for hours. That is `truth`'s question asked five
 * times, which is why that unit sits directly above this one. The
 * board grades in the browser against salted hashes, so it needs no backend and there is no Java
 * checker. Above it, `OneWindow` frames the hunt as one measured session, because the flags on
 * their own ask nothing about the window the step spent eight units on. The unit's prose is the
 * game and nothing else: the per-flag technique lives on the board's own rows, and the house rules
 * the hunt is played under live in step 0's `welcome`.
 *
 * `recap` closes the step behind that: one bullet per unit ahead of `workshop`, each a cost and the
 * move that answers it, plus the pointer at step 2 that used to sit under the board. It is prose and
 * nothing else, so in class the page filters down to nothing and the recap happens at the board off
 * the deck.
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
        'words-into-tokens': <WordsIntoTokens />,
        'token-split': <TokenSplit />,
        'next-token': <NextToken />,
        'token-attention': <TokenAttention />,
        'pick-the-next': <PickTheNext />,
      },
    },
    {
      id: 'prompt',
      title: 'prompt.title',
      html: prompt,
      inlineFigures: {
        'prompt-in-context': <PromptInContext />,
        'reasoning-cost': <ReasoningCost />,
        'bundle-compare': <BundleCompare />,
        'exact-ask': <ExactAsk />,
        'plan-it-twice': <PlanItTwice />,
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
        'connect-one': <ConnectOne />,
        'shutter-flag': <ShutterFlag />,
        'spot-injection': <SpotInjection />,
        'budget-window': <BudgetWindow />,
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
        // The step's only task under a unit that also carries a quiz. It reads the window this unit
        // takes apart, with the server `tools` connected still in it.
        'read-your-window': <ReadYourWindow />,
      },
      quiz: contextQuiz,
    },
    {
      id: 'session',
      title: 'session.title',
      html: session,
      inlineFigures: {
        'session-makeup': <SessionMakeup />,
        // The same afternoon cut twice. The section's argument is where the seam falls, and
        // position is the one thing the prose can only assert.
        'where-the-seam-falls': <WhereTheSeamFalls />,
        'survive-the-clear': <SurviveTheClear />,
      },
    },
    {
      id: 'harness',
      title: 'harness.title',
      html: harness,
      inlineFigures: {
        'under-specified': <UnderSpecified />,
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
        // Both slots are `data-assistant="claude"` in the HTML, so a Copilot reader never asks for
        // them. The attribute sits on the marker rather than on a wrapper, which is the one way a
        // figure may be assistant-specific.
        'usage-readout': <UnitShot id="usage-readout" src="/session-usage.png" namespace="step1" />,
        'session-windows': <SessionWindows />,
        'speed-at-scale': <SpeedAtScale />,
        // The sum `model.cost.4` describes, asked for, and it sits above the board because the
        // paragraph set it up a screen earlier.
        'price-one-turn': <PriceOneTurn />,
        'pick-the-tier': <PickTheTier />,
      },
    },
    {
      id: 'truth',
      title: 'truth.title',
      html: truth,
      inlineFigures: {
        // Two figures on one argument, and they take different cuts of it. The first is two whole
        // answers, one window apart; the second is one answer whose parts did not all come from the
        // same place. Neither may borrow the other's shape, or the unit draws its point twice.
        'trained-or-grounded': <TrainedOrGrounded />,
        'answer-provenance': <AnswerProvenance />,
      },
      // The unit writes no "Test yourself" heading of its own, so `QuizPanel` prints one, the way
      // it does under `prompt`. It is also the only thing on this page that survives guided mode,
      // where the prose goes and two figures would otherwise be the whole lesson.
      quiz: truthQuiz,
    },
    {
      id: 'workshop',
      title: 'workshop.title',
      html: workshop,
      inlineFigures: {
        // The card frames the hunt and the board grades it, so the two sit together in the HTML
        // rather than one of them arriving from the registry's trailing `figure` slot.
        'one-window': <OneWindow />,
        'flag-board': <FlagBoard />,
      },
    },
    {
      id: 'recap',
      title: 'recap.title',
      html: recap,
    },
  ],
  // What the tutor puts on the board for this step. Authored in `deck.tsx`, beside the figures it
  // reuses; nothing in it renders unit prose.
  deck,
}

export default step1
