# Completed curriculum corrections

Completed on 2026-10-05 against the [original review](2026-10-05-curriculum-pr1.md).
PR #1 and the user’s concurrent MCP corrections were combined into local `main` in checkpoint
commit `f5a83cd`. The final corrections complete all review findings, including their minor
wording, diagram, exercise, recap, quiz, deck and authoring-note dependencies.

## Findings addressed

Paths below are relative to `front/src/steps/`, unless qualified. Each student-facing change has an
English and Dutch version. Existing exercise grading, task storage identities and unit URLs stay
stable.

| Finding | Result and location |
| --- | --- |
| Skill lifecycle | The setup hint distinguishes discoverable metadata from a body loaded when used. `step2/locales/*`, `step2/units/setup.html`. |
| Context occupancy mistaken for cost | The window exercise measures occupancy. `PriceOneTurn` now compares cumulative `/usage`, totals model-specific input/cache/output categories and marks unavailable counters unknown. API estimates and subscription charges are separate. `step1/units/model.html`, locales and dependent deck/recap text. |
| Sampling question conflicts with grading | The task asks what could come next, consistent with the existing answer contract. `step1/locales/*`, authoring notes. |
| Old token counts | The shared example is described as 13 English / 17 Dutch tokens. Density claims are scoped to the displayed samples. `step1/units/tokens.html`, locales and notes. |
| Visual mockup called walking skeleton | Both lesson and task require a minimum functional end-to-end version. `step2/units/evolution.html`, locales. |
| Manual compaction incomplete | Automatic compaction, manual `/compact` with focus instructions, and `/clear` have distinct explanations. Both forms of compaction explicitly consume input and output tokens, including in guided mode’s surviving figure/table. Rebuilding after clear also costs tokens. `step1/units/session.html`, `WindowFill`, locales, recap. |
| Full capacity promised after reset | Claude’s 5-hour allowance reset is separate from weekly and other limits. Long runs depend on remaining budget and useful prepared work. `step1/units/model.html`, `step2/units/goals.html`, locales and quizzes. |
| Flag sourcing overgeneralised | The claim is scoped to the flags in the relevant workshop. `step0/locales/*`. |
| Invalid skill YAML | The copyable description uses a folded scalar, verified by parsing. `step2/units/setup.html`. |
| Worktrees mistaken for access isolation | Separate checkouts, permissions, sandboxing and delivery controls are distinct. A new disposable-file exercise tests Read permissions and a sandboxed Node filesystem call separately. `step2/units/steering.html`, `gates.html`, `setup.html`, `CheckPermissions`, locales and registry. |
| MCP resources, prompts and context misdefined | Preserved the user’s corrected retrieval/template/tool definitions and conditional context inclusion. `step1/units/tools.html`, MCP figures, locales. |
| Copilot tool search omitted; server-count limit unsupported | Preserved the user’s per-product deferred-loading explanation and replaced blanket server-count claims with measuring loaded definitions/results. Harness references agree. `step1/units/tools.html`, `harness.html`, `copilot-specific.md`. |
| BPE and fragmentation claims | Ranked segmentation replaces longest-piece matching. Fragmentation is not evidence of training frequency or language quality. Domain naming advice rests on clarity. `step1/units/tokens.html`, `step2/units/engineering.html`, locales. |
| Prefix conditioning confused with recomputation | `NextToken` counts available context, not billable rereads. Inference KV reuse and cross-request prompt caching are explained separately. `step1/units/tokens.html`, figure and locales. |
| Effort treated as fixed hidden-token budget | Effort guides thoroughness; tools and output can change. Equal answer lengths are an illustrative control in `ReasoningCost`. `step1/units/prompt.html`, figure and locales. |
| Universally blank, cheaper workers | Configured instructions/tools/project context, fresh versus forked history and inherited/configured models are explicit. Reviews still need evidence. `step1/units/harness.html`, `CoordinatorFanout`, `ReflectionLoop`, `step2/units/parallel.html`, quizzes and notes. |
| Provenance lost; history never removed; arithmetic average | Structured roles/source labels remain meaningful. Retained content can be pruned or summarised and can still mislead. Learned patterns are not arithmetic averaging. `step1/units/context.html`, `session.html`, `truth.html`, locales and notes. |
| Role and action-verb guarantees | Role prompts can steer behaviour; explicit read-only requirements and checks replace verb-based guarantees. `step1/units/prompt.html`, locales. |
| Confounded 2-run demonstration | The exercise changes requirements, planning and model together; its explanation no longer attributes the outcome to planning or tier alone. `step1/units/prompt.html`, locales and notes. |
| Condition-driven `/loop` | Builder/critic work uses bounded review/repair, at most 3 rounds, objective completion checks and human review. `step2/units/parallel.html`, locales and notes. |
| Cache-price and compaction guarantees | Anthropic-specific cache-write rates/lifetimes are scoped. Rewritten history can lose reuse while an unchanged tools/system prefix remains reusable under applicable cache conditions. `step1/units/harness.html`, locales and notes. |
| Model/speed assumptions | Model cards suggest candidates to evaluate. The latency chart uses invented example seconds, not a measured provider ratio. `step1/units/model.html`, `ModelTiers`, `SpeedAtScale`, locales and deck. |

## Other follow-through

All recommended page topics and heading changes are reflected in the bilingual navigation/content:
agentic loop versus token generation; relevant context; session management; harness/orchestration;
model, effort and usage; long-running goals and cost. Details replace final visual design, the goals
check is executable, and the parallel arrangement names an interactive agent with background goals.
Renamed heading key families and authoring notes match their content.

The entry checker now catches setup and response-body disconnects and times out requests after
5 seconds. A failed refusal probe affects its dependent wishes without aborting scoring. Startup
failure still exits 1; scoring still exits 0. Six synthetic HTTP regression tests use dummy titles.
No student implementation or protected catalogue pipeline was changed.

The default step 1 controller test now excludes the unrelated desk metering filter from its MVC
slice. This resolves the missing `Desk` bean without modifying production behaviour or exercises.

Long coordinator captions wrap in HTML. `WindowSpend` explicitly illustrates subscription allowance
rather than context capacity, with weekly limits and budget stated in its visible caption. Tool-result snippets and long budget labels wrap on mobile.
The guided/self variants retain the corrected instruction and cost explanations.

## Preservation and verification

- Compared the pre-integration backup against the completed tree. All 11 locally changed English
  locale values and 32 Dutch values match exactly. All 14 locally changed tools paragraphs,
  1 session paragraph and 2 recap paragraphs match after whitespace normalisation.
- `McpParts.tsx`, `McpOvals.tsx`, the step 1 deck registry and `copilot-specific.md` exactly match
  the user’s backed-up files. Authoring notes retain the local MCP decisions and correct unrelated
  stale claims. The safety stash remains available.
- Frontend production build and lint pass. The 2 existing Fast Refresh warnings and bundle-size
  advisory remain; they are unrelated to the reviewed curriculum defects.
- 248 browser page views pass across English/Dutch, guided/self, Claude/Copilot where supported,
  plus mobile checks of affected pages. No JavaScript/translation errors or page-width overflow.
  The permission exercise is present and compaction costs remain visible in each tested variant.
  All 146 presentation slides render in both languages (292 slide checks), with no JavaScript errors.
  Quiz and deck message references exist in both locale bundles.
- Locale validation passes: no duplicate keys or interpolation mismatches; 535 parsed HTML lesson
  references have Dutch entries. Audience/assistant attributes obey the renderer’s structural rule.
  No em/en dash punctuation in lesson HTML or locale bundles. Skill YAML parses.
- All 4 standalone default `mvn -q test` runs pass. Step 1 reports 31 tests; step 2 reports 1.
  Steps 0 and 3 have no active default tests. Intentionally red graded/challenge profiles were not run.
- `node --test kata/step1/check-entry.test.mjs`: 6 passing tests. `git diff --check` passes.

The frontend is running from the main workspace at http://localhost:5702. Student solutions were
not executed end to end. No remote push was requested or performed.
