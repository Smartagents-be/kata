# Kata curriculum review: recent main changes and PR #1

Reviewed 2026-10-05. Main: `3c74430ee1ec95c722c59f2e5ed3fae8bf337f42`. PR: `783e2cf2a066d6d82244973d06cafff52088106c`, [PR #1](https://github.com/Smartagents-be/kata/pull/1). The PR is open and based directly on the reviewed main commit.

This is a review and topic recommendation, not an implementation plan. No curriculum source, exercise solution, flag, or grading contract was changed.

## Verdict

**The changes broadly follow the same direction and improve the kata, but neither recent main nor PR #1 is uniformly correct. Keep the direction; correct specific claims and exercises before treating this as finished teaching material.**

Recent main makes the larger pedagogical improvements: it exposes the token and agent mechanisms, supplies concrete prompt requirements and feedback, separates quality gates from architecture, and addresses several recorded diagram/exercise problems. PR #1 primarily improves Dutch readability and makes task instructions explicit. It also changes meaning in several places, sometimes weakening an exercise or strengthening an inaccurate claim.

I recommend targeted changes to PR #1 before merge. The inherited issues below deserve a separate accuracy pass; they are not all caused by your colleague. There is no reason to discard the recent work or rewrite the course from scratch.

### Review states and concurrent edits

The committed snapshots are the stable basis for findings. During the review, the working copy acquired external edits to the MCP prose, diagrams, translations, deck, recap, `copilot-specific.md`, and step 1 authoring notes. Those changes already address several MCP findings. They are **not part of either reviewed commit** and were not made by this review.

References below use repository-relative paths and lines in the specified snapshot. For main, browse `https://github.com/Smartagents-be/kata/blob/3c74430/<path>#L<line>`; for PR, use `https://github.com/Smartagents-be/kata/blob/783e2cf/<path>#L<line>`. Do not apply the PR mechanically over the concurrent MCP corrections: its wording was written against the older committed content.

## What improved, and what should stay

| Area | Improvement over the earlier version | Assessment |
|---|---|---|
| Tokens | Real tokenizer IDs; one shared example; visible attention and generation; computed toy network and sampling probabilities; input/cache/output/reasoning illustration | Substantial improvement. Keep the figures, but correct the surrounding generalizations and distinguish inference caching from request billing. |
| Prompt | Five useful instruction parts, concrete examples, six visible requirements, an executable checker, plan approval, and a reasoning setting distinct from missing information | Substantial improvement. The exercise demonstrates communicating requirements; it does not isolate the effect of plan mode or model tier. |
| Agentic loop | Explicit model decision → harness execution → tool result → next decision, including multiple tool requests and errors | Strong improvement. Keep this as the tools unit's organizing idea. It is different from the token-generation loop. |
| Context | Practical focused retrieval: relevant failure, existing implementation, locating the change, and starting directory | Useful addition. Remove claims that messages lose all provenance or that every piece of context is automatically believed. |
| Session | Context occupancy plotted over time; compaction shown as a paid request; clearing distinguished from summarizing | Clear improvement over the earlier seam figure. PR's manual compaction addition needs a command and matching explanation. |
| Harness | More concrete decomposition example and diagrams linking delegated work to context | Better examples. Fresh context, inherited context and worker model selection need qualifications. |
| Model | Current dated pricing, cache rates and explicit effort levels | Useful, and the current rates were verified. Model characteristics and speed ratios should be examples/heuristics rather than universal rankings. |
| Gates | Dedicated page for executable quality checks, review boundaries, feedback speed and constraints against weakening checks | Strong curricular improvement. Worktrees do not enforce the claimed access boundary. |
| Setup and workflows | `.claude/rules` has a place; deferred findings have a durable workflow; audit figure makes the repeat-analysis agent and human decision clearer | Directly addresses feedback. Keep these additions. |
| PR wording | Clearer onboarding, clearer stuck-agent heading, task labels with explicit actions, improved Dutch quizzes, wrapping for longer diagram captions | Mostly positive. More words do not always add precision; the findings below identify actual changes in meaning. |
| Soft skills | Process changes → defensible expectations → confidence and comprehension | Coherent ending. It should remain part of the kata. |

## Changes to request in PR #1

All findings in this table are high confidence. Effort includes coordinated English/Dutch changes: S = hours; M = roughly a day. Fix risk is low unless noted.

| Priority | Finding | Origin | Evidence in PR snapshot | Effort / risk |
|---|---|---|---|---|
| P1 | Skill hint teaches full startup loading and application on every interaction | Introduced by PR | `front/src/steps/step2/locales/en.json:25`; `nl.json:370` | S / low |
| P1 | `/context` difference is presented as actual monetary cost | Existing flawed exercise, strengthened by PR | `front/src/steps/step1/locales/en.json:341`, `:354`; `nl.json:332`, `:345` | M / low |
| P1 | Next-token question asks what to expect, but grading only accepts that all options are possible | Introduced by PR | `front/src/steps/step1/locales/en.json:53`; `nl.json:52`; unchanged `PickTheNext.tsx:101` | S / low |
| P1 | Prose still says 11 English / 14 Dutch tokens after the example becomes 13 / 17 | Introduced by PR | `front/src/steps/step1/units/tokens.html:78`; `locales/nl.json:570`; `example-sentence.ts:46`, `:66` | S / low |
| P1 | Walking-skeleton task becomes a request for visual shape only | Introduced by PR | `front/src/steps/step2/locales/en.json:111`; `nl.json:32`; `units/evolution.html:94`, `:111` | S / low |
| P2 | Manual compaction is introduced without showing how to use it; retention explanation remains misleading | New incomplete addition plus inherited claim | `front/src/steps/step1/units/session.html:65`, `:95` | S / low |
| P2 | Five-hour reset promises full capacity regardless of the weekly limit | Introduced by PR | `front/src/steps/step1/units/model.html:152` | S / low |
| P2 | Local workshop flag rule becomes a statement about every flag on the platform | Introduced by PR | `front/src/steps/step0/locales/en.json`, `flags.panel.description`; compare step 2 `locales/en.json:17` | S / low |

### 1. Restore the skill lifecycle

The rewritten hint describes an always-loaded instruction file, although its answer is a skill. This undermines the distinction the setup lesson is meant to teach. Make the hint say that metadata makes a procedure discoverable and the body loads when the skill is used for relevant work. Avoid claiming application to every interaction. [Claude's skill documentation](https://code.claude.com/docs/en/skills) explicitly distinguishes body loading from description availability.

### 2. Separate context occupancy from consumption and money

The before/after `/context` count describes window growth. It does not count every paid request between those readings. Existing content can be processed on multiple requests, output/reasoning has another rate, and cache reads/writes have different rates. Compaction can reduce occupancy while spending additional tokens.

Keep the context-growth exercise. Describe count × input rate as an illustrative uncached-input estimate if retained. For a consumption exercise, compare reported usage before/after and sum uncached input, cache creation, cache reads and output across requests. Distinguish API dollar estimates from subscription limits. [Claude Code cost tracking](https://code.claude.com/docs/en/costs) documents separate usage categories and estimated cost.

### 3. Match the sampling question to its answer

The figure gives `merged` the highest probability. A student asked what they expect it to pick can reasonably choose that option. The code marks it wrong because only `any` passes. Restore “Which of these could come next?” in both languages. This is a wording correction, not a reason to change the sampling lesson.

### 4. Update the example's dependent facts

The regenerated tokenizer IDs and splits are correct. The missed dependency is prose, which still states the old counts. Update both languages and adjacent comments, or generate the counts from the shared example data. The PR's extra idiomatic phrasing is an editorial choice; the longer sentence does not itself improve the token mechanism explanation.

### 5. Keep the skeleton functional

A walking skeleton is a minimum working end-to-end slice. The task still offers a link shortener with POST/GET behavior and asks the learner to run it. “Bare visual shape only” changes the target into a mockup, especially in guided mode where the task card is the instruction students retain. Use “minimum working version”; defer optional states, validation and polish as the exercise specifies.

### 6. Teach three session operations coherently

Distinguish automatic compaction, manual `/compact`, and `/clear`. Label the existing chart as automatic compaction versus clearing. Replace the inherited statement that only clearing lets the learner say what stays: Claude supports a compaction focus and persistent Compact Instructions. Clearing provides a deliberate fresh start; compaction preserves a summary. [Claude context management](https://code.claude.com/docs/en/how-claude-code-works#when-context-fills-up) documents preservation controls.

### 7. Qualify the subscription reset

Say the five-hour allowance resets while independent weekly and other limits still apply. “Your full capacity back” is too broad, and “you wait” also omits plans with additional paid usage. Keep this as dated Claude subscription behavior. [Claude Pro limits](https://support.claude.com/en/articles/8325606-what-is-the-pro-plan) distinguish the two allowance cycles.

### 8. Scope platform terminology

“Platform” can name the application. Use “the flags in this workshop” for the step 0 sourcing rule. Later flags have other sources; step 2 explicitly says its setup flags are read from files and not generated by a build. A global noun replacement expanded the claim's scope.

## Accuracy issues in main that PR preserves

These should not be attributed to PR #1. Some were introduced or reinforced by the recent main work; others are older teaching shortcuts.

| Priority | Finding | Provenance | Evidence in main snapshot | Effort / risk / confidence |
|---|---|---|---|---|
| P1 | Copyable skill frontmatter is invalid YAML | Recent main, `1846e30` | `front/src/steps/step2/units/setup.html:72` | S / low / high |
| P1 | Worktrees are described as preventing access to other agents' files | Older steering claim, reinforced by recent gates work | `front/src/steps/step2/units/steering.html:103`; `units/gates.html:48` | S–M / low / high |
| P1 | MCP resources/templates and context entry are misdefined | Existing, preserved by PR; concurrent edits address this | `front/src/steps/step1/units/tools.html:91`, `:104` | S / low / high |
| P1 | Copilot's deferred tool loading is omitted; server count is treated as a context limit | Existing, partly updated for Claude on recent main | `front/src/steps/step1/units/tools.html:128`, `:149`, `:167`; `units/harness.html:26` | S / low / high |
| P2 | BPE is described as taking the longest known pieces; fragmentation is equated with poor training exposure | Existing | `front/src/steps/step1/units/tokens.html:46`, `:76`; step 2 `units/engineering.html:30` | M / low / high |
| P2 | Prefix conditioning is blurred with recomputing all tokens during every decoding pass | Existing; PR makes the processing claim stronger | `front/src/steps/step1/units/tokens.html:157`; `NextToken.tsx:790`; `locales/en.json:119` | M / low / high |
| P2 | Effort is treated as a predictable quantity of hidden thinking | Existing; recent main correctly updates available levels | `front/src/steps/step1/units/prompt.html:47`; `ReasoningCost.tsx:23` | M / low / high |
| P2 | Subagents are universally blank, get only one instruction and run cheaper models | Existing | `front/src/steps/step1/units/harness.html:99`, `:108`, `:142` | S–M / low / high |
| P2 | Structured messages become an undifferentiated, always-believed block that never loses material | Existing; conflicts with newer tools explanation | `front/src/steps/step1/units/context.html:10`, `:92`, `:156`; `units/session.html:13` | M / low / high |
| P2 | Role-prompt obsolescence and action-verb behavior are presented as guarantees | Recent main, `3c74430` | `front/src/steps/step1/units/prompt.html:190`, `:170` | S / low / high |
| P2 | Two-run exercise changes requirements, planning and model simultaneously | Deliberate older demonstration; conclusion needs qualification | `front/src/steps/step1/PlanItTwice.tsx:16`; `units/prompt.html:96`; `locales/en.json`, `plan.*` | S / low / high |
| P3 | Builder/critic example uses `/loop` for condition-driven continuation | Older, `14d94b1` | `front/src/steps/step2/units/parallel.html:77` | S / low / high command semantics, medium runtime consequence |

### Invalid skill example

The unquoted description contains `built: a controller`. Parsing the exact displayed frontmatter with Ruby `YAML.safe_load` fails with “mapping values are not allowed in this context.” Use a folded scalar or quote the description. Verify the displayed example, not just a separate real skill in the repo.

### Worktrees and permissions

Separate worktrees prevent ordinary checkout/build-output interference. They do not establish filesystem or external-service access restrictions. The “at worst, a branch” outcome also depends on enforcing delivery and permission policies. Teach focus, separate checkouts, permissions/sandboxing, and protected delivery as distinct controls. [Git worktree documentation](https://git-scm.com/docs/git-worktree) explains the separate working trees and shared repository data; [Claude sandboxing](https://code.claude.com/docs/en/sandboxing) documents access enforcement.

### MCP concepts and overhead

Resources are content a host retrieves and can include; MCP prompts are reusable server templates, not just an ordinary typed message; tools supply executable capabilities. Connecting a server does not automatically put every offering into context. [MCP resources](https://modelcontextprotocol.io/specification/2025-06-18/server/resources) and [MCP prompts](https://modelcontextprotocol.io/specification/2025-06-18/server/prompts) define those retrieval operations.

Count what is loaded and what calls return. Both CLI products support deferred tool definitions under documented conditions. Calls and results also cost context; a fixed four-or-five-server ceiling is unsupported. One server can be larger than several others. [Copilot tool search](https://docs.github.com/en/copilot/concepts/agents/copilot-cli/tool-search) and [Claude MCP tool search](https://code.claude.com/docs/en/mcp#scale-with-mcp-tool-search) supply the product-specific behavior. The concurrent working corrections should be preserved and followed through into harness wording and other dependent prose.

### Tokenization, generation and caching

For this tokenizer, ranked BPE merges do not amount to greedy longest-vocabulary matching. A concrete counterexample is the lesson's own ` swears`: its split is ` sw` + `ears`, although greedy longest matching could pick ` swear` + `s`. Teach learned segmentation rules; scope the density ratios to these examples. Token fragmentation alone does not establish how often a model saw material or how well it predicts a language. The good domain-naming advice in step 2 can stand on clarity/searchability. [tiktoken's educational implementation](https://github.com/openai/tiktoken/blob/main/tiktoken/_educational.py) shows ranked adjacent merging.

The next token depends on the preceding context. Typical decoding reuses earlier key/value states; it does not recompute that entire prefix from scratch on every output token. Cross-request prompt caching and its prices are a separate topic. Label the generation counter as context available to the prediction, rather than as a billable reread. [Hugging Face's inference-cache explanation](https://huggingface.co/docs/transformers/main/en/cache_explanation) documents that reuse.

Compaction changes conversation content, but does not inherently erase a reusable unchanged tools/system prefix. In `harness.caching.2`, replace “nothing left to match” with the more precise loss of reuse for the rewritten part. Keep the cache TTL and rate examples explicitly Anthropic-specific. [Anthropic prompt caching](https://platform.claude.com/docs/en/build-with-claude/prompt-caching) describes the tools → system → messages prefix hierarchy.

### Effort, delegated agents and provenance

Effort guides thoroughness and may change thinking, tool actions and visible output. It is not a fixed hidden-token budget. Keep the equal-answer-length chart as a controlled illustrative example. [Anthropic effort](https://platform.claude.com/docs/en/build-with-claude/effort) describes broader response behavior.

A fresh subagent still has configured instructions, tools and project context. A fork can inherit the parent's conversation; the model can be inherited or configured. Fresh review can reduce anchoring without guaranteeing independence or correctness. [Claude subagents](https://code.claude.com/docs/en/sub-agents) documents these variants.

The tools unit now correctly acknowledges marked tool results. Align context/session with that: roles and provenance remain meaningful, but can be misinterpreted. History also can be pruned or summarized. Replace “average of everything it read” with learned patterns conditioned on the current input; neither probabilistic generation nor poor context implies arithmetic averaging.

### Prompt advice and the exercise's conclusion

Keep the advice to provide clear requirements and concrete checks. A role description can steer behavior; it does not replace evidence, and a claim about never improving correctness needs an identified evaluation. Likewise, an explicit read-only instruction is clearer than promising that a particular polite verb prevents edits. [Anthropic prompting guidance](https://platform.claude.com/docs/en/build-with-claude/prompt-engineering/claude-prompting-best-practices) supports scoped practical advice.

The two-run exercise is a valuable demonstration of turning an underspecified ask into communicated requirements. It cannot establish whether planning alone or model tier caused the improvement because three variables change. Keep it and frame its conclusion accurately. An optional controlled comparison can hold requirements and model constant; do not turn the existing demonstration into a sprawling benchmark.

Use a plain repeat-review/fix instruction with a limit for the builder/critic prompt. `/loop` is interval scheduling; condition-driven continuation is another workflow. [Claude scheduled tasks](https://code.claude.com/docs/en/scheduled-tasks) distinguishes them. A critic being impressed should not replace objective checks and a human review boundary.

## Topic names and teaching boundaries

The existing sequence is workable. No wholesale reordering or additional step is necessary. Each page should have one question it answers and one behavior the learner can carry into work.

The important distinctions are:

1. **Token generation** predicts successive tokens inside a model response. **The agentic loop** uses model decisions, tools and returned evidence over multiple requests.
2. **Context capacity** measures information available now. **Token consumption** measures processing across requests. **Subscription allowance** is a provider's usage policy. These are three different quantities.
3. **Instructions** communicate desired behavior. **Skills** supply relevant procedures. **Hooks/checks** execute at defined events. **Permissions/sandboxing** restrict capability. **Worktrees** separate checkouts.
4. **A model claim**, **retrieved material**, **an executed check's result**, and **human approval** supply different kinds of evidence and authority.

| Existing unit / URL | Recommended clear topic | Learner should be able to… |
|---|---|---|
| `step0/welcome` | How the kata works / Hoe de kata werkt | Select mode/assistant, understand flags and follow exercise rules. |
| `step0/backend` | Run the right project / Het juiste project starten | Locate the standalone Maven project, run a command and read its output. |
| `step0/workshop` | First evidence loop / Eerste oefening met bewijs | Direct the agent, inspect produced evidence and submit the answer. |
| `step1/tokens` | Tokens and generation / Tokens en generatie | Interpret token splits, probabilities and usage categories without confusing them with words. |
| `step1/prompt` | Communicate intent / Je opdracht helder formuleren | State outcome, evidence, constraints, examples, format and a check. |
| `step1/tools` | The agentic loop and tools / De agentic loop en tools | Explain model choice versus harness execution and select relevant tool evidence. |
| `step1/context` | Build relevant context / Relevante context samenstellen | Identify what is in the request and improve relevance, freshness and focus. |
| `step1/session` | Manage a session / Een sessie beheren | Choose continuation, automatic/manual compaction, clear, or a durable handoff. |
| `step1/harness` | Harness and orchestration / Harness en orkestratie | Explain what the application controls and choose sequential or delegated work. |
| `step1/model` | Model, effort and usage / Model, redeneerniveau en verbruik | Choose capability/effort and read billing and allowance information separately. |
| `step1/truth` | Claims, evidence and verification / Beweringen, bewijs en controle | Distinguish training-based answers, retrieved evidence and an executed check. |
| `step1/workshop` | Investigate with an agent / Onderzoeken met een agent | Apply focused retrieval, execution and human judgment to a real investigation. |
| `step1/recap` | Connect the mechanisms / De mechanismen verbinden | Explain a complete interaction across model, harness, tools and context. |
| `step2/evolution` | Small working increments / Kleine werkende stappen | Build an end-to-end skeleton and add details without dragging them forward. |
| `step2/setup` | Durable instructions and access / Blijvende instructies en toegang | Place rules/procedures correctly and distinguish focus from allowed capability. |
| `step2/engineering` | Domain language and structure / Domeintaal en structuur | Make concepts, names and boundaries legible in the repository. |
| `step2/gates` | Quality and delivery gates / Kwaliteits- en opleveringscontroles | Make checks enforceable, preserve quality thresholds and keep feedback fast. |
| `step2/steering` | Steer and recover / Bijsturen en herstellen | Interrupt, clarify, rewind/reset and expose unresolved decisions. |
| `step2/patterns` | Reuse procedures and scripts / Procedures en scripts hergebruiken | Turn recurring instructions into skills and repeatable operations into scripts. |
| `step2/workflows` | Choose a workflow / Een werkwijze kiezen | Choose direct, planned, specified, audit-driven or deferred work by task needs. |
| `step2/enablement` | Own the feedback cycle / De feedbackcyclus beheersen | Run the whole application and measure its real feedback bottleneck. |
| `step2/parallel` | Coordinate parallel work / Parallel werk coördineren | Partition by dependencies and account for coordination, context and review cost. |
| `step2/goals` | Long-running goals and cost / Langlopende doelen en kosten | Define bounded measurable outcomes and manage unattended work and consumption. |
| `step2/workshop` | Apply the engineering workflow / De werkwijze toepassen | Combine setup, gates, goals, separate builds and a process debrief. |
| `step3/change` | Team and process change / Veranderingen in team en proces | Explain how responsibilities and the delivery process change. |
| `step3/expectations` | Set defensible expectations / Realistische verwachtingen afspreken | Explain prototype limits, unspecified work and credible delivery promises. |
| `step3/impostor` | Confidence and understanding / Zelfvertrouwen en begrip | Distinguish confidence concerns from actual gaps in understanding. |

These are recommendations, not compulsory replacements for every current title. The strongest title changes are `tools`, `model` and `goals` because they make the real subject visible.

### PR headings I would revise

- **“The cost of the context window”** hides the goals skill and conflates capacity with a usage window. Prefer **“Long-running goals and cost”**.
- **“Working in parallel with agents”** is too broad for the final arrangement inside a parallel-workflows unit. Prefer **“One interactive agent, background goals”**.
- **“The final design” / “De definitieve vormgeving”** suggests a finished visual-design phase. The content includes behavior and domain changes; prefer **“Adding details” / “Details toevoegen”**.
- **“Automated quality assurance”** is valid terminology but weaker than the section's actual point. **“An executable completion check” / “Een uitvoerbare eindcontrole”** better distinguishes it from the gates page.
- The `TokenKinds` deck title should remain about **output price**, not “most compute”: its figure measures tokens and prices, not computational work.

Keep Claude/Copilot commands, configuration paths, model names and quota policies explicitly labeled and dated. They are useful examples inside the durable topics, rather than universal agent behavior.

## Recommended next pass

1. Correct the PR-specific exercise and lifecycle errors; settle the topic headings.
2. Preserve the concurrent MCP corrections and update all linked harness/recap/deck references.
3. Correct main's invalid YAML and worktree/access claims, then align the core mechanism explanations.
4. Add one practical usage-reading exercise and one small permissions exercise inside existing pages. Avoid introducing more units just to cover these gaps.
5. Check each changed page in both languages, guided/self modes and both assistant variants. Where guided mode removes prose, the surviving figure/task must still communicate the correct task.

This order avoids polishing explanations that depend on a mental model still being corrected. The course already has enough subject matter; its highest-value improvement now is consistency and factual precision.

## Verification and limits

- Both versions passed `tsc --noEmit -p tsconfig.app.json` and `tsc --noEmit -p tsconfig.node.json`, using the existing dependencies. Main's checks ran in the working copy during the concurrent edit; PR's checks used its stable temporary snapshot.
- Both passed `npm run lint`, with the same two existing Fast Refresh warnings in shared `button.tsx` and `badge.tsx`.
- All **541 main / 546 PR HTML translation references** were checked: no missing Dutch prose keys. English prose intentionally resides in HTML, so absent English prose JSON entries are not errors.
- No English/Dutch interpolation-placeholder mismatch was found in any step. Pluralized keys were accounted for rather than reported as missing base keys.
- Renamed content/quiz references were examined. Typechecking does not establish semantic equivalence, and key existence does not establish a correct translation.
- Real `o200k_base` IDs/splits were verified in both examples. The toy network's 79 parameters, computed logits/probabilities, attention link counts and sampling renormalization were checked. The illustrative cost arithmetic is correct. Current Anthropic prices were verified against [official pricing](https://platform.claude.com/docs/en/about-claude/pricing).
- The displayed skill frontmatter was parsed, reproducing its YAML error.
- A secondary existing checker fault was reproduced with synthetic catalogue data: `kata/step1/check-entry.mjs:384` probes before the transport-error handler at `:397`, so a service disconnect during setup aborts before scoring. This is a small robustness fix, not a PR regression or a core topic defect.
- Coverage includes all curriculum units across steps 0–3, relevant English/Dutch prose, PR file changes, quizzes/registries/decks, recent token/prompt/loop figures and the prompt exercise checker. History was used to distinguish recent regressions from older issues.
- Not performed: browser rendering at desktop/mobile widths, full keyboard/screen-reader interaction, live student exercise completion, every Java build/profile, dependency/security/performance audit of the whole repository, or video-project review. The PR's longer tokenizer sentence and wrapped iteration labels still need visual checking. No runtime score or visual approval is claimed.

## Considered and rejected

- Missing English prose JSON entries: intentional HTML fallback, not broken translation.
- Toy probabilities, invented token costs and omitted attention self-links: acceptable where visibly identified as examples. Their arithmetic is correct; universal conclusions from them need qualification.
- Current model names/prices being unfamiliar: verified against current primary documentation, not flagged as stale.
- Unequal MCP oval descriptions being inconsistent with committed diagrams: both reviewed snapshots have unequal shapes and matching descriptions. Equal ovals belong to the concurrent edits.
- Intentional hidden flags, obfuscated catalogue code, red graded/challenge profiles, duplicated step projects and absent root Maven aggregator: exercise design, not defects.
- The broader topic sequence: workable; wholesale reordering would create disruption without addressing the confirmed errors.
