import type { SlideSpec } from '@/shared/deck/slide-spec'
import { BudgetWindow } from './BudgetWindow'
import { BundleCompare } from './BundleCompare'
import { ContextDiagram } from './ContextDiagram'
import { ContextFalloff } from './ContextFalloff'
import { CoordinatorFanout } from './CoordinatorFanout'
import { ExactAsk } from './ExactAsk'
import { McpParts } from './McpParts'
import { McpServer } from './McpServer'
import { ModelPricing } from './ModelPricing'
import { ModelTiers } from './ModelTiers'
import { NextToken } from './NextToken'
import { OneShotCompare } from './OneShotCompare'
import { PatternMatch } from './PatternMatch'
import { PickTheTier } from './PickTheTier'
import { PromptInContext } from './PromptInContext'
import { ReflectionLoop } from './ReflectionLoop'
import { SequentialSteps } from './SequentialSteps'
import { SessionMakeup } from './SessionMakeup'
import { TokenAttention } from './TokenAttention'
import { TokenSplit } from './TokenSplit'
import { ToolsInContext } from './ToolsInContext'

/**
 * Step 1 on the board.
 *
 * One divider per unit, in the registry's unit order, so paging the deck and reading the sidebar
 * are the same journey. Under each divider are that unit's figures, and a `statement` slide for the
 * arguments the unit makes without a drawing.
 *
 * **The figures are the unit's own components**, magnified by `SlideFigure` and otherwise untouched.
 * A student looking up from the projector at their own screen sees the same drawing, and there is
 * one drawing to maintain instead of two that drift. It also means the interactive ones stay
 * interactive: the tutor advances `NextToken` a pass at a time at the board, holds a token in
 * `TokenAttention`, and steps `BundleCompare` through its six moves in front of the room.
 *
 * Four are deliberately absent. `CutItUp`, `SurviveTheClear` and `ReadYourWindow` are `TaskCard`s
 * and `FlagBoard` keeps a solved set, so all four write progress to localStorage: on a slide they
 * would tick the *tutor's* machine, which is the one place a stray flag or a half-done task is most
 * confusing. Their units keep a divider and a statement instead. `McpOvals` is left out too, for a
 * different reason: it restates `McpParts` and only earns that next to the paragraph explaining
 * why it is being restated.
 *
 * Eyebrows and divider headings reuse the unit title keys the sidebar already uses, so the name on
 * the board and the name in the nav cannot disagree and neither needs translating twice.
 *
 * The text is short on purpose. An eyebrow and one heading is the whole slide, and the tutor says
 * the rest; `note` is for the handful of claims that lose their meaning without a qualifier. The
 * precedent is the opening question, whose second line was cut because a slide that scripts the
 * tutor is a slide they read from.
 *
 * `scale` is a starting value per figure, worked out from its aspect ratio against the room the
 * frame leaves under a heading, then corrected by eye. There is no formula that survives the DOM
 * figures, whose height is whatever their content came to.
 */
const deck: SlideSpec[] = [
  // ── tokens ────────────────────────────────────────────────────────────────────────────────
  {
    id: 'deck-tokens',
    kind: 'divider',
    ns: 'step1',
    eyebrow: 'step.title',
    title: 'tokens.title',
  },
  {
    id: 'deck-tokens-split',
    kind: 'figure',
    ns: 'step1',
    eyebrow: 'tokens.title',
    title: 'deck.tokens.split.title',
    note: 'deck.tokens.split.note',
    figure: <TokenSplit />,
    scale: 1.77,
  },
  {
    id: 'deck-tokens-next',
    kind: 'figure',
    ns: 'step1',
    eyebrow: 'tokens.title',
    title: 'deck.tokens.next.title',
    figure: <NextToken />,
    // The tallest figure in the step: the candidate list and the branch tree under it stack. It is
    // the one figure that is height-bound rather than width-bound, so it sits narrower than the
    // rest and that is correct rather than something to scale away.
    scale: 0.8,
    figureWidth: 1250,
  },
  {
    id: 'deck-tokens-attention',
    kind: 'figure',
    ns: 'step1',
    eyebrow: 'tokens.title',
    title: 'deck.tokens.attention.title',
    note: 'deck.tokens.attention.note',
    figure: <TokenAttention />,
    scale: 1.33,
  },

  // ── prompt ────────────────────────────────────────────────────────────────────────────────
  {
    id: 'deck-prompt',
    kind: 'divider',
    ns: 'step1',
    eyebrow: 'step.title',
    title: 'prompt.title',
  },
  {
    id: 'deck-prompt-in-context',
    kind: 'figure',
    ns: 'step1',
    eyebrow: 'prompt.title',
    title: 'deck.prompt.in-context.title',
    figure: <PromptInContext />,
    scale: 1.77,
  },
  {
    id: 'deck-prompt-bundle',
    kind: 'figure',
    ns: 'step1',
    eyebrow: 'prompt.title',
    title: 'deck.prompt.bundle.title',
    figure: <BundleCompare />,
    scale: 1.11,
    figureWidth: 1100,
  },
  {
    id: 'deck-prompt-exact',
    kind: 'figure',
    ns: 'step1',
    eyebrow: 'prompt.title',
    title: 'deck.prompt.exact.title',
    figure: <ExactAsk />,
    scale: 1.77,
  },
  {
    id: 'deck-prompt-plan',
    kind: 'statement',
    ns: 'step1',
    eyebrow: 'prompt.title',
    title: 'deck.prompt.plan.title',
  },

  // ── tools ─────────────────────────────────────────────────────────────────────────────────
  {
    id: 'deck-tools',
    kind: 'divider',
    ns: 'step1',
    eyebrow: 'step.title',
    title: 'tools.title',
  },
  {
    id: 'deck-tools-in-context',
    kind: 'figure',
    ns: 'step1',
    eyebrow: 'tools.title',
    title: 'deck.tools.in-context.title',
    note: 'deck.tools.in-context.note',
    figure: <ToolsInContext />,
    scale: 1.33,
  },
  {
    id: 'deck-tools-mcp',
    kind: 'figure',
    ns: 'step1',
    eyebrow: 'tools.title',
    title: 'deck.tools.mcp.title',
    figure: <McpServer />,
    scale: 1.46,
  },
  {
    id: 'deck-tools-parts',
    kind: 'figure',
    ns: 'step1',
    eyebrow: 'tools.title',
    title: 'deck.tools.parts.title',
    figure: <McpParts />,
    scale: 1.77,
  },
  {
    id: 'deck-tools-injection',
    kind: 'statement',
    ns: 'step1',
    eyebrow: 'tools.title',
    title: 'deck.tools.injection.title',
    note: 'deck.tools.injection.note',
  },
  {
    id: 'deck-tools-budget',
    kind: 'figure',
    ns: 'step1',
    eyebrow: 'tools.title',
    title: 'deck.tools.budget.title',
    figure: <BudgetWindow />,
    scale: 1.1,
    figureWidth: 1150,
  },

  // ── context ───────────────────────────────────────────────────────────────────────────────
  {
    id: 'deck-context',
    kind: 'divider',
    ns: 'step1',
    eyebrow: 'step.title',
    title: 'context.title',
  },
  {
    id: 'deck-context-diagram',
    kind: 'figure',
    ns: 'step1',
    eyebrow: 'context.title',
    title: 'deck.context.diagram.title',
    figure: <ContextDiagram />,
    scale: 1.59,
  },
  {
    id: 'deck-context-oneshot',
    kind: 'figure',
    ns: 'step1',
    eyebrow: 'context.title',
    title: 'deck.context.oneshot.title',
    figure: <OneShotCompare />,
    scale: 1.36,
    figureWidth: 1000,
  },
  {
    id: 'deck-context-falloff',
    kind: 'figure',
    ns: 'step1',
    eyebrow: 'context.title',
    title: 'deck.context.falloff.title',
    figure: <ContextFalloff />,
    scale: 1.12,
  },
  {
    id: 'deck-context-entropy',
    kind: 'statement',
    ns: 'step1',
    eyebrow: 'context.title',
    title: 'deck.context.entropy.title',
    note: 'deck.context.entropy.note',
  },

  // ── session ───────────────────────────────────────────────────────────────────────────────
  {
    id: 'deck-session',
    kind: 'divider',
    ns: 'step1',
    eyebrow: 'step.title',
    title: 'session.title',
  },
  {
    id: 'deck-session-makeup',
    kind: 'figure',
    ns: 'step1',
    eyebrow: 'session.title',
    title: 'deck.session.makeup.title',
    figure: <SessionMakeup />,
    scale: 1.59,
  },
  {
    id: 'deck-session-clear',
    kind: 'statement',
    ns: 'step1',
    eyebrow: 'session.title',
    title: 'deck.session.clear.title',
    note: 'deck.session.clear.note',
  },

  // ── harness ───────────────────────────────────────────────────────────────────────────────
  {
    id: 'deck-harness',
    kind: 'divider',
    ns: 'step1',
    eyebrow: 'step.title',
    title: 'harness.title',
  },
  {
    id: 'deck-harness-decomposition',
    kind: 'statement',
    ns: 'step1',
    eyebrow: 'harness.title',
    title: 'deck.harness.decomposition.title',
    note: 'deck.harness.decomposition.note',
  },
  {
    id: 'deck-harness-coordinator',
    kind: 'figure',
    ns: 'step1',
    eyebrow: 'harness.title',
    title: 'deck.harness.coordinator.title',
    figure: <CoordinatorFanout />,
    scale: 1.27,
  },
  {
    id: 'deck-harness-sequential',
    kind: 'figure',
    ns: 'step1',
    eyebrow: 'harness.title',
    title: 'deck.harness.sequential.title',
    figure: <SequentialSteps />,
    scale: 1.77,
  },
  {
    id: 'deck-harness-reflection',
    kind: 'figure',
    ns: 'step1',
    eyebrow: 'harness.title',
    title: 'deck.harness.reflection.title',
    note: 'deck.harness.reflection.note',
    figure: <ReflectionLoop />,
    scale: 1.55,
  },
  {
    id: 'deck-harness-cache',
    kind: 'statement',
    ns: 'step1',
    eyebrow: 'harness.title',
    title: 'deck.harness.cache.title',
    note: 'deck.harness.cache.note',
  },
  {
    id: 'deck-harness-patterns',
    kind: 'figure',
    ns: 'step1',
    eyebrow: 'harness.title',
    title: 'deck.harness.patterns.title',
    figure: <PatternMatch />,
    scale: 1.28,
    figureWidth: 1250,
  },

  // ── model ─────────────────────────────────────────────────────────────────────────────────
  {
    id: 'deck-model',
    kind: 'divider',
    ns: 'step1',
    eyebrow: 'step.title',
    title: 'model.title',
  },
  {
    id: 'deck-model-tiers',
    kind: 'figure',
    ns: 'step1',
    eyebrow: 'model.title',
    title: 'deck.model.tiers.title',
    figure: <ModelTiers />,
    scale: 1.33,
  },
  {
    id: 'deck-model-pricing',
    kind: 'figure',
    ns: 'step1',
    eyebrow: 'model.title',
    title: 'deck.model.pricing.title',
    note: 'deck.model.pricing.note',
    figure: <ModelPricing />,
    scale: 1.77,
  },
  {
    id: 'deck-model-reasoning',
    kind: 'statement',
    ns: 'step1',
    eyebrow: 'model.title',
    title: 'deck.model.reasoning.title',
    note: 'deck.model.reasoning.note',
  },
  {
    id: 'deck-model-pick',
    kind: 'figure',
    ns: 'step1',
    eyebrow: 'model.title',
    title: 'deck.model.pick.title',
    figure: <PickTheTier />,
    scale: 1.17,
    figureWidth: 1250,
  },

  // ── workshop ──────────────────────────────────────────────────────────────────────────────
  {
    id: 'deck-workshop',
    kind: 'divider',
    ns: 'step1',
    eyebrow: 'step.title',
    title: 'workshop.title',
  },
  {
    id: 'deck-workshop-flags',
    kind: 'statement',
    ns: 'step1',
    eyebrow: 'workshop.title',
    title: 'deck.workshop.flags.title',
    note: 'deck.workshop.flags.note',
  },
]

export default deck
