import type { SlideSpec } from '@/shared/deck/slide-spec'
import { AgentLoop } from './AgentLoop'
import { AnswerProvenance } from './AnswerProvenance'
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
import { PickTheNext } from './PickTheNext'
import { PickTheTier } from './PickTheTier'
import { PromptParts } from './PromptParts'
import { ReflectionLoop } from './ReflectionLoop'
import { SamplingKnobs } from './SamplingKnobs'
import { SequentialSteps } from './SequentialSteps'
import { SessionMakeup } from './SessionMakeup'
import { SpotInjection } from './SpotInjection'
import { TokenAttention } from './TokenAttention'
import { TokenKinds } from './TokenKinds'
import { TokenNetwork } from './TokenNetwork'
import { TokenSplit } from './TokenSplit'
import { TokenizerView } from './TokenizerView'
import { ToolsInContext } from './ToolsInContext'
import { TrainedOrGrounded } from './TrainedOrGrounded'
import { UnderSpecified } from './UnderSpecified'
import { WindowFill } from './WindowFill'

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
 * Seven are absent for one reason. `CutItUp`, `SurviveTheClear`, `ConnectOne`, `ReadYourWindow`
 * and `OneWindow` are `TaskCard`s, and `FlagBoard` and `ShutterFlag` keep a solved set, so all
 * seven write progress to localStorage: on a slide they would tick the *tutor's* machine, which is
 * the one place a stray flag or a half-done task is most confusing. Their units keep a divider and
 * a statement instead.
 *
 * Three more are absent for reasons of their own, and they are named here so the next editor can
 * tell a judgement from an oversight. `McpOvals` restates `McpParts`, and it only earns that next
 * to the paragraph explaining why it is being restated. `SessionWindows` and `usage-readout` are
 * `model`'s five-hour section, which is Claude-only, and the deck has no assistant filter: either
 * of them on the board tells a Copilot room about an arrangement it does not have. Everything else
 * a step 1 unit draws is up there. The tokens block runs in the unit's order, reading before
 * writing: the sentence and its ids lead it, then the split, the attention arcs, the loop, the
 * sampling settings and the network, stepped a layer at a time by the tutor, then the bill, and the
 * exercise closes it, worked by the room the way `NextToken` is.
 *
 * Eyebrows and divider headings reuse the unit title keys the sidebar already uses, so the name on
 * the board and the name in the nav cannot disagree and neither needs translating twice.
 *
 * The text is short on purpose. A content slide is an eyebrow and one heading, and the tutor says
 * the rest; `note` is for the handful of claims that lose their meaning without a qualifier. The
 * precedent is the opening question, whose second line was cut because a slide that scripts the
 * tutor is a slide they read from. A divider is the one exception, deck-wide and at the tutor's
 * own asking: a bare unit title gave a room nothing, so each one carries the unit's essence as
 * two or three `points`, claims rather than script, and the drawings after it are the proof.
 *
 * `scale` is a starting value per figure, worked out from its aspect ratio against the room the
 * frame leaves under a heading, then corrected by eye. There is no formula that survives the DOM
 * figures, whose height is whatever their content came to.
 */
const deck: SlideSpec[] = [
  // The module's own card, the one dark slide this step gets. No eyebrow: there is nothing above
  // a module to name.
  {
    id: 'deck-step1-title',
    kind: 'title',
    ns: 'step1',
    title: 'step.title',
  },

  // ── tokens ────────────────────────────────────────────────────────────────────────────────
  {
    id: 'deck-tokens',
    kind: 'divider',
    ns: 'step1',
    eyebrow: 'step.title',
    title: 'tokens.title',
    points: ['deck.tokens.divider.1', 'deck.tokens.divider.2', 'deck.tokens.divider.3'],
  },
  {
    id: 'deck-tokens-tokenizer',
    kind: 'figure',
    ns: 'step1',
    eyebrow: 'tokens.title',
    // The unit's lead figure leads the block too: one sentence cut into tokens and each token
    // swapped for its id, so the network further on starts from a number the room has seen made.
    title: 'deck.tokens.tokenizer.title',
    figure: <TokenizerView />,
    scale: 1.7,
  },
  {
    id: 'deck-tokens-split',
    kind: 'figure',
    ns: 'step1',
    eyebrow: 'tokens.title',
    title: 'deck.tokens.split.title',
    note: 'deck.tokens.split.note',
    figure: <TokenSplit />,
    // `TokenSplit` gained a heading row and four bar rows between the chips and the panel, which is
    // about 130 layout px on a drawing that was fitted at 395. `SlideFigure` clips rather than
    // shrinks, so 1.77 took the caption off the bottom.
    scale: 1.4,
  },
  {
    id: 'deck-tokens-language',
    kind: 'statement',
    ns: 'step1',
    eyebrow: 'tokens.title',
    // The unit's one prose argument, which the unit keeps honest: for a big language the gap is
    // small, and it widens for a language with little text online and for a codebase's own names.
    // It does not tell the room which language to ask in.
    title: 'deck.tokens.language.title',
    note: 'deck.tokens.language.note',
  },
  {
    id: 'deck-tokens-attention',
    kind: 'figure',
    ns: 'step1',
    eyebrow: 'tokens.title',
    // Reading comes before writing, the way the unit now runs: the room sees the finished sentence
    // weighed first, and `NextToken` on the next slide writes it a token at a time.
    title: 'deck.tokens.attention.title',
    note: 'deck.tokens.attention.note',
    figure: <TokenAttention />,
    scale: 1.33,
  },
  {
    id: 'deck-tokens-next',
    kind: 'figure',
    ns: 'step1',
    eyebrow: 'tokens.title',
    title: 'deck.tokens.next.title',
    figure: <NextToken />,
    // Still the height-bound figure of the step rather than a width-bound one, so it is fitted
    // against the room under the heading and comes out narrower than its neighbours. It was drawn at
    // 0.8 when the candidate list and the branch tree stacked under each other; one fan is a good
    // deal shorter than that pair was, which is where the room to grow came from.
    scale: 1.15,
    figureWidth: 1250,
  },
  {
    id: 'deck-tokens-sampling',
    kind: 'figure',
    ns: 'step1',
    eyebrow: 'tokens.title',
    // Where the unit puts it, between the loop and the network: the same four scores the network is
    // about to produce, reshaped by each setting. The note is the qualifier the room needs, that
    // none of these is a setting they can turn.
    title: 'deck.tokens.sampling.title',
    note: 'deck.tokens.sampling.note',
    figure: <SamplingKnobs />,
    scale: 1.4,
  },
  {
    id: 'deck-tokens-network',
    kind: 'figure',
    ns: 'step1',
    eyebrow: 'tokens.title',
    // Where the unit puts it, after the loop and the sampling settings: the scores the room just
    // picked from come out of this, one token in as numbers and through the network a layer per click.
    title: 'deck.tokens.network.title',
    figure: <TokenNetwork />,
    // Lowered from 1.1 when the footer became the review's 2-line simplification note: in Dutch, with
    // a node's calculation open, 1.1 pushed the eyebrow under the heading and clipped the last line.
    scale: 0.98,
  },
  {
    id: 'deck-tokens-kinds',
    kind: 'figure',
    ns: 'step1',
    eyebrow: 'tokens.title',
    // Where the unit puts it: the last thing taught, ahead of the exercise. The note is the one
    // qualifier the numbers cannot do without, since the turn is invented and the rates are not.
    title: 'deck.tokens.kinds.title',
    note: 'deck.tokens.kinds.note',
    figure: <TokenKinds />,
    scale: 1.4,
  },
  {
    id: 'deck-tokens-pick',
    kind: 'figure',
    ns: 'step1',
    eyebrow: 'tokens.title',
    // The unit's exercise, worked at the board. The title is a plain label on purpose: the answer
    // is the exercise, so a claim here would give it away.
    title: 'deck.tokens.pick.title',
    figure: <PickTheNext />,
    scale: 1,
  },

  // ── prompt ────────────────────────────────────────────────────────────────────────────────
  {
    id: 'deck-prompt',
    kind: 'divider',
    ns: 'step1',
    eyebrow: 'step.title',
    title: 'prompt.title',
    points: ['deck.prompt.divider.1', 'deck.prompt.divider.2', 'deck.prompt.divider.3'],
  },
  {
    id: 'deck-prompt-parts',
    kind: 'figure',
    ns: 'step1',
    eyebrow: 'prompt.title',
    title: 'deck.prompt.parts.title',
    figure: <PromptParts />,
    scale: 1.77,
  },
  {
    id: 'deck-prompt-reasoning',
    kind: 'statement',
    ns: 'step1',
    eyebrow: 'prompt.title',
    // `deck.prompt.divider.2` promises the reasoning level and the block never delivered it. The
    // only other reasoning slide is four units later and exists to keep the two dials apart.
    title: 'deck.prompt.reasoning.title',
    points: ['deck.prompt.reasoning.1', 'deck.prompt.reasoning.2', 'deck.prompt.reasoning.3'],
  },
  {
    id: 'deck-prompt-meta',
    kind: 'statement',
    ns: 'step1',
    eyebrow: 'prompt.title',
    title: 'deck.prompt.meta.title',
    points: ['deck.prompt.meta.1', 'deck.prompt.meta.2', 'deck.prompt.meta.3'],
  },
  // Plan mode comes before the steering moves in the unit, and `deck.prompt.divider` lists the
  // payoff in that order too, so it sits here rather than closing the block.
  {
    id: 'deck-prompt-plan',
    kind: 'statement',
    ns: 'step1',
    eyebrow: 'prompt.title',
    title: 'deck.prompt.plan.title',
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

  // ── tools ─────────────────────────────────────────────────────────────────────────────────
  {
    id: 'deck-tools',
    kind: 'divider',
    ns: 'step1',
    eyebrow: 'step.title',
    title: 'tools.title',
    points: ['deck.tools.divider.1', 'deck.tools.divider.2', 'deck.tools.divider.3'],
  },
  // The unit's lead figure, animated on the board as on the page: the ring turning is the claim.
  {
    id: 'deck-tools-loop',
    kind: 'figure',
    ns: 'step1',
    eyebrow: 'tools.title',
    title: 'deck.tools.loop.title',
    note: 'deck.tools.loop.note',
    figure: <AgentLoop />,
    scale: 1.2,
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
  // Loaded definitions can consume context even for unused tools. Tool search changes what is
  // loaded; server count is not a context budget. `harness` owns what a sub-agent costs.
  {
    id: 'deck-tools-list',
    kind: 'statement',
    ns: 'step1',
    eyebrow: 'tools.title',
    title: 'deck.tools.list.title',
    points: ['deck.tools.list.1', 'deck.tools.list.2', 'deck.tools.list.3'],
  },
  {
    id: 'deck-tools-injection',
    kind: 'statement',
    ns: 'step1',
    eyebrow: 'tools.title',
    title: 'deck.tools.injection.title',
    note: 'deck.tools.injection.note',
  },
  // Graded in the browser and writing no progress key, the same shape `deck-tools-budget` already
  // has. **The title must not name what makes the result odd**, which is the prohibition the card
  // carries: naming it turns four results into a search for one sentence.
  {
    id: 'deck-tools-spot',
    kind: 'figure',
    ns: 'step1',
    eyebrow: 'tools.title',
    title: 'deck.tools.spot.title',
    figure: <SpotInjection />,
    // The tallest DOM figure in the step, so it is laid out wide and barely magnified.
    scale: 0.95,
    figureWidth: 1450,
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
    points: ['deck.context.divider.1', 'deck.context.divider.2', 'deck.context.divider.3'],
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
  // `deck.context.divider.2` promises that wrong context is worse than missing context, and nothing
  // in the block proved it.
  {
    id: 'deck-context-stale',
    kind: 'statement',
    ns: 'step1',
    eyebrow: 'context.title',
    title: 'deck.context.stale.title',
    note: 'deck.context.stale.note',
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
  // The claim the rest of the step rests on, and it was on no slide.
  {
    id: 'deck-context-bad-code',
    kind: 'statement',
    ns: 'step1',
    eyebrow: 'context.title',
    title: 'deck.context.bad-code.title',
    note: 'deck.context.bad-code.note',
  },
  {
    id: 'deck-context-falloff',
    kind: 'figure',
    ns: 'step1',
    eyebrow: 'context.title',
    title: 'deck.context.falloff.title',
    note: 'deck.context.falloff.note',
    figure: <ContextFalloff />,
    scale: 1.12,
  },
  {
    id: 'deck-context-entropy',
    kind: 'statement',
    ns: 'step1',
    eyebrow: 'context.title',
    title: 'deck.context.entropy.title',
    points: ['deck.context.entropy.1', 'deck.context.entropy.2', 'deck.context.entropy.3'],
  },

  // ── session ───────────────────────────────────────────────────────────────────────────────
  {
    id: 'deck-session',
    kind: 'divider',
    ns: 'step1',
    eyebrow: 'step.title',
    title: 'session.title',
    points: ['deck.session.divider.1', 'deck.session.divider.2', 'deck.session.divider.3'],
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
    kind: 'figure',
    ns: 'step1',
    eyebrow: 'session.title',
    // The title is the unit's claim and the note says the difference out loud: the drawing and its
    // table carry when and what it costs, the note is the one line a tutor says over them. Five
    // figure slides in this deck carry a note.
    title: 'deck.session.clear.title',
    note: 'deck.session.clear.note',
    figure: <WindowFill />,
    // Laid out wide enough that the figure's container query puts the table beside the charts
    // rather than under them, which is the only way two charts and a table magnify at all; then
    // fitted to the room under the heading, which the height decides.
    scale: 1.15,
    figureWidth: 1400,
  },
  {
    id: 'deck-session-memory',
    kind: 'statement',
    ns: 'step1',
    eyebrow: 'session.title',
    // `window-not-memory.3` is the best line in the unit and it only lands out loud. Nothing on the
    // board carried it.
    title: 'deck.session.memory.title',
    note: 'deck.session.memory.note',
  },

  // ── harness ───────────────────────────────────────────────────────────────────────────────
  {
    id: 'deck-harness',
    kind: 'divider',
    ns: 'step1',
    eyebrow: 'step.title',
    title: 'harness.title',
    points: ['deck.harness.divider.1', 'deck.harness.divider.2', 'deck.harness.divider.3'],
  },
  // Caching comes before the patterns in the unit, and it sat between the fourth pattern figure and
  // the exercise that tests all four, so a tutor broke stride for prefix caching on the way in.
  {
    id: 'deck-harness-cache',
    kind: 'statement',
    ns: 'step1',
    eyebrow: 'harness.title',
    title: 'deck.harness.cache.title',
    note: 'deck.harness.cache.note',
  },
  {
    id: 'deck-harness-decomposition',
    kind: 'figure',
    ns: 'step1',
    eyebrow: 'harness.title',
    // The note is not the old one. That one said what the right-hand column now draws; this one is
    // the line the unit's guided aside used to carry, and it is the only place in the deck a room
    // is told to cut before anybody opens an agent.
    title: 'deck.harness.decomposition.title',
    note: 'deck.harness.decomposition.note',
    figure: <UnderSpecified />,
    scale: 1.55,
  },
  {
    id: 'deck-harness-coordinator',
    kind: 'figure',
    ns: 'step1',
    eyebrow: 'harness.title',
    title: 'deck.harness.coordinator.title',
    note: 'deck.harness.coordinator.note',
    figure: <CoordinatorFanout />,
    scale: 1.27,
  },
  {
    id: 'deck-harness-sequential',
    kind: 'figure',
    ns: 'step1',
    eyebrow: 'harness.title',
    title: 'deck.harness.sequential.title',
    note: 'deck.harness.sequential.note',
    figure: <SequentialSteps />,
    // `SequentialSteps` grew a session fill and a label under the cards, so its viewBox went from
    // 640x284 to 640x340. 1.77 painted about 846px into a frame with roughly 740 under a `top`
    // heading, and `overflow-hidden` would clip the label that is the whole point of the change.
    scale: 1.48,
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
    id: 'deck-harness-patterns',
    kind: 'figure',
    ns: 'step1',
    eyebrow: 'harness.title',
    title: 'deck.harness.patterns.title',
    figure: <PatternMatch />,
    // Both `PatternMatch` scenarios were rewritten longer, so the board is taller than 1.28 was
    // fitted for and the Check button along its bottom edge is what a clip takes first.
    scale: 1.18,
    figureWidth: 1250,
  },

  // ── model ─────────────────────────────────────────────────────────────────────────────────
  {
    id: 'deck-model',
    kind: 'divider',
    ns: 'step1',
    eyebrow: 'step.title',
    title: 'model.title',
    points: ['deck.model.divider.1', 'deck.model.divider.2', 'deck.model.divider.3'],
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
  // The one place the course multiplies, and on a board the tutor can do it with the room's own
  // number. It carries no currency of its own, the way `model.cost.4` does not: `ModelPricing` on
  // the slide before it is the only place in the course a number has one.
  {
    id: 'deck-model-money',
    kind: 'statement',
    ns: 'step1',
    eyebrow: 'model.title',
    title: 'deck.model.money.title',
    points: ['deck.model.money.1', 'deck.model.money.2', 'deck.model.money.3'],
  },
  {
    id: 'deck-model-speed',
    kind: 'statement',
    ns: 'step1',
    eyebrow: 'model.title',
    title: 'deck.model.speed.title',
    note: 'deck.model.speed.note',
  },
  // True for both assistants, unlike the five-hour window, so it needs no filter the deck does not
  // have. No prices, no plan names, no currency, for the same reason the section carries none.
  {
    id: 'deck-model-billing',
    kind: 'statement',
    ns: 'step1',
    eyebrow: 'model.title',
    title: 'deck.model.billing.title',
    note: 'deck.model.billing.note',
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

  // ── truth ─────────────────────────────────────────────────────────────────────────────────
  // The opening statement goes ahead of both figures, on the harness block's precedent. Both
  // drawings are the same claim measured, so the room needs the claim before either of them means
  // anything. The unit's third figure, `TheCutoff`, is deliberately not here: a slide of it ahead of
  // these two would spend that opening statement on the setup. `Proof` closes the block as a second
  // statement, after the drawings, because it hands straight into the workshop divider.
  {
    id: 'deck-truth',
    kind: 'divider',
    ns: 'step1',
    eyebrow: 'step.title',
    title: 'truth.title',
    points: ['deck.truth.divider.1', 'deck.truth.divider.2', 'deck.truth.divider.3'],
  },
  {
    id: 'deck-truth-sounds-same',
    kind: 'statement',
    ns: 'step1',
    eyebrow: 'truth.title',
    title: 'deck.truth.sounds-same.title',
    note: 'deck.truth.sounds-same.note',
  },
  {
    id: 'deck-truth-grounded',
    kind: 'figure',
    ns: 'step1',
    eyebrow: 'truth.title',
    title: 'deck.truth.grounded.title',
    figure: <TrainedOrGrounded />,
    // 1.85 fits the frame's width but crowds it: the panel titles run into the heading and the
    // answer chips land on the footer's 88px clearance. This is the largest that still reads as a
    // drawing under a heading rather than a drawing pushing one out of the way.
    scale: 1.7,
  },
  {
    id: 'deck-truth-provenance',
    kind: 'figure',
    ns: 'step1',
    eyebrow: 'truth.title',
    title: 'deck.truth.provenance.title',
    figure: <AnswerProvenance />,
    // Laid out wide and magnified less than the drawing above it. This one is text in two columns,
    // so `width * scale` has to stay inside the frame or `SlideFigure`'s `overflow-hidden` takes
    // the left edge off the symbols, which is where the claims are.
    scale: 1.5,
    figureWidth: 1100,
  },
  {
    id: 'deck-truth-proof',
    kind: 'statement',
    ns: 'step1',
    eyebrow: 'truth.title',
    title: 'deck.truth.proof.title',
    note: 'deck.truth.proof.note',
  },

  // ── workshop ──────────────────────────────────────────────────────────────────────────────
  {
    id: 'deck-workshop',
    kind: 'divider',
    ns: 'step1',
    eyebrow: 'step.title',
    title: 'workshop.title',
    points: ['deck.workshop.divider.1', 'deck.workshop.divider.2', 'deck.workshop.divider.3'],
  },
  {
    id: 'deck-workshop-flags',
    kind: 'statement',
    ns: 'step1',
    eyebrow: 'workshop.title',
    title: 'deck.workshop.flags.title',
    note: 'deck.workshop.flags.note',
  },
  // The card's fourth move, asked out loud. A question to the room is the purest thing a slide can
  // carry, and this one is a look-back, so the tutor puts it up after the hunt rather than before
  // it. No note: the room answers it.
  {
    id: 'deck-workshop-debrief',
    kind: 'statement',
    ns: 'step1',
    eyebrow: 'workshop.title',
    title: 'deck.workshop.debrief.title',
  },

  // ── recap ─────────────────────────────────────────────────────────────────────────────────
  // The unit is prose and nothing else, so guided mode leaves its page empty and this block is the
  // whole of the recap in a room. Three statements rather than the unit's nine bullets: the room has
  // just worked the board, and reading a list back to it is what the page is for. The middle slide
  // keeps the cost and the move on one line, the way the unit does, because splitting them into a
  // list of prices and a list of advice is the shape that unit was written out of.
  {
    id: 'deck-recap',
    kind: 'divider',
    ns: 'step1',
    eyebrow: 'step.title',
    title: 'recap.title',
    points: ['deck.recap.divider.1', 'deck.recap.divider.2', 'deck.recap.divider.3'],
  },
  {
    id: 'deck-recap-one-window',
    kind: 'statement',
    ns: 'step1',
    eyebrow: 'recap.title',
    title: 'deck.recap.one-window.title',
    note: 'deck.recap.one-window.note',
  },
  {
    id: 'deck-recap-moves',
    kind: 'statement',
    ns: 'step1',
    eyebrow: 'recap.title',
    title: 'deck.recap.moves.title',
    note: 'deck.recap.moves.note',
  },
  {
    id: 'deck-recap-next',
    kind: 'statement',
    ns: 'step1',
    eyebrow: 'recap.title',
    title: 'deck.recap.next.title',
    note: 'deck.recap.next.note',
  },
]

export default deck
