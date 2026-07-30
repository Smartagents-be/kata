# Course audit, fresh pass

**Measured:** 30 July 2026, against `d41887a` ("feat: enablement"), which is the whole working tree
apart from this file. Every number here was taken off the files rather than carried forward.

`d41887a` adds a tenth unit to step 2, `enablement`, with two figures of its own (`LoopsPerHour`,
`SkillShape`) and no exercise. Step 2's counts, every row of Table 2 from unit 17 down, and both
summaries under it are therefore re-measured rather than restated. `npm run build` is green.

Two numbers moved for a reason that is not in that commit. Step 0 lost nine words because `153df17`,
the commit that carried the previous pass of this file, also shortened
`welcome.how-to-use-this-document.5`, and the pass measured that paragraph before its own edit: 498
became 489. Step 1 has not been touched since, and every number in Table 1b was re-measured to the
figure it already carried.

**Legend:** ● solid · ◐ thin · ○ missing · ⟳ duplicated · ⚠ inaccurate

**An empty remarks cell means nothing outstanding.** The row was checked and there is no work in it,
so the reasoning behind the verdict is not repeated here. Anything with text beside it is either a
defect, a decision still open, or a note that has to be carried into the next change. Read the
remarks column and skip the rest.

**Basis of the word counts:** English prose with HTML comments stripped first, then tags, then
entities, counting whitespace-separated tokens containing a letter. The **assistant filter is not
applied**, so these are the full files rather than what one reader sees. A Claude Code reader sees
roughly 90 words less in `tools` and `model` each.

---

## 1. Completeness

### Table 1a. Step 0, "Start here" (2 units, 489 words)

| Topic | Where | Status | Remarks and proposed fix |
|---|---|:--:|---|
| How the kata is read: self-paced, guided, reference | `welcome` | ● | |
| Where the cogwheel is, and to go and open it | `welcome.how-to-use-this-document.5` | ● | |
| The assistant boundary: the swap stops after step 1 | `welcome` | ● | |
| What a flag is, and that answer boxes have hints | `welcome`, `CodeCheck` | ● | |
| The backend exists and is split by step | `backend` | ● | |

### Table 1b. Step 1, "Context, model, mechanisms" (8 units, 7,212 words)

| Topic | Where | Status | Remarks and proposed fix |
|---|---|:--:|---|
| Tokenisation, the vocabulary, why ids cost more than prose | `tokens` / `TokenSplit` | ● | |
| Next-token prediction and sampling | `tokens` / `NextToken` | ● | |
| Attention: every pair, backwards only, quadratic | `tokens` / `TokenAttention` | ● | |
| The word *context*, defined | `prompt` | ● | |
| Reasoning level and thinking tokens | `prompt`, `model` | ● ⟳ | Explained in both. Documented as deliberate (the `model` section exists to keep tier and reasoning apart), but on the page the second reads as a restatement. Fix: have `model` open by naming what `prompt` already established rather than re-explaining it. |
| Meta-prompting and plan mode | `prompt` | ● | |
| Bundling work, and `/clear` | `prompt`, `session` | ● | |
| What a tool is; the tool loop | `tools` | ● | |
| MCP, and who decides each of its three parts | `tools` / `McpParts`, `McpOvals` | ● | |
| Tool descriptions cost you by existing | `tools` | ● | |
| Prompt injection | `tools` / `SpotInjection` | ● | |
| Context observability (`/context`) | `tools` / `ReadYourWindow` | ● | |
| The window's contents, and the stateless model | `context` | ◐ | Solid for self-learners, **invisible in guided mode**: every prose block sits inside `data-audience="self"`, so a guided student gets one diagram and a quiz. See Table 2. |
| Entropy | `context` (definition), `prompt.what-steer-after.2` (use) | ⚠ | The word is used for **all** audiences in `prompt` and defined only in self-only prose in `context`. A guided student meets the term twice and never gets it. Fix: one clause of definition at the point of use in `prompt`. |
| The session as the only layer with a time axis | `session` | ● | |
| How little of the session you wrote | `session.wrote-almost-none.1` / `SessionMakeup` | ⚠ | Prose says "Your sentence is twenty tokens. The answer to it is three thousand." The figure directly beneath says **14** and totals **4913**. Two different illustrations of one point, adjacent. Fix: change the prose to fourteen and five thousand, so it reads off its own figure. |
| Making an instruction survive a `/clear` | `session` / `SurviveTheClear` | ● | |
| Prompt caching, and what invalidates it | `harness` | ● ⚠ | `harness.caching.3` says an entry "goes stale after about five minutes" while `ModelPricing` one unit later carries **both** a `Cache write, 5 min` and a `Cache write, 1 hr` column. Neither mentions the other. Fix: "about five minutes by default, and you can pay for longer", which is one clause and makes the table's fourth column legible. |
| Decomposition, and cutting a real problem | `harness` / `CutItUp` | ● | |
| Coordinator / sequential / reflection | `harness` / three figures + `PatternMatch` | ● | |
| Which harness you run | `harness` | ◐ | Two paragraphs that restate the lead and then say providers differ. The billing sentence that gave the section its point moved to `model`. Fix: fold what is left into the lead, or give it the one concrete comparison it lacks. |
| Model tiers as dispositions | `model` / `ModelTiers` | ● ⚠ | `tiers.haiku.body` praises "Near-frontier intelligence" twelve lines from `model.cost.2` defining *frontier* as the row **above** the top tier. The word means two things on one page. Fix: "Close to the top tier on a task that is already well specified." |
| Price per token, input vs output vs cache | `model` / `ModelPricing` | ● | |
| Figure ordering | `ModelTiers` vs `ModelPricing` | ⚠ | The cards run most-expensive-first, the table twelve lines later runs cheapest-first. Both docblocks defend their own order; neither accounts for the other. Fix: flip `ModelTiers` to cheapest-first, since the table's order is the one the ratio argument (one, three, five) reads in. |
| Billing model: key vs subscription vs seat | `model` | ● | |
| Choosing a tier for a task | `model` / `PickTheTier` | ● | |
| Which product's files and commands | `welcome`, 16 blocks in step 1 | ● | |
| The three workshop flags | `workshop` / `FlagBoard` | ● | |
| What the flags are, exactly | `workshop.lead.2` | ⚠ | "Three of the thrown-away lines are flags." The DEBUG flag is inside `if (log.isDebugEnabled())`, so at the default level it is **never computed**, let alone thrown away. Fix: "Two of the thrown-away lines are flags, and a third never runs at all", which also foreshadows the third exercise. |
| The stage count | `budget.explanation.services` (both languages) | ⚠ | Says **fifty-one**. There are **50**: 52 `*Stage.java` files, of which **two** are interfaces (`CatalogStage` and `AuxiliaryStage`). `kata/step1/java/CLAUDE.md` already says fifty, so the repo disagrees with itself. Fix touches `en.json`, `nl.json`, the comment in `tools.html`, and `front/src/steps/CLAUDE.md`. |
| The `SpotInjection` stack trace | `spot.body.tests` | ⚠ | Names `TitleControllerTest.titlesAreServed:41`. The real method is `returnsThePublishedTitlesInOrder` and the file is 48 lines. A student who greps finds nothing. Fix: use the real method name; the `expected: 9 but was: 8` line is already consistent with the nine titles. |
| Asking the agent what it has read | `tools.connect-one.5`, `session.window-not-memory.4` | ⟳ | The same self-only exercise, two units apart, in nearly the same words. Fix: keep `session`'s, where the answer proves something about the layer being taught, and cut `tools`'. |
| "Here is the part people do not expect" | `tokens.reads-all.1`, `prompt.plan-mode.2` | ⟳ | The identical opener, verbatim, two units apart. Fix: reword one. |
| Coordinator saving, phrased twice | `harness.coordinator.1`, `model.let-it-pick.1` | ⟳ | "Top rate for deciding, a fraction of it for doing" appears near-verbatim in both. The back-pointer is deliberate; the phrasing collision is not. Fix: have `model` name the saving rather than restate it. |

### Table 1c. Step 2, "Agentic engineering" (10 units, 6,836 words)

The previous pass headed this table 6,514, which was the nine units without `enablement`. The number
above is all ten, and `enablement`'s 322 words are the smallest unit in the step by a wide margin.

| Topic | Where | Status | Remarks and proposed fix |
|---|---|:--:|---|
| Iterate small because a version costs an hour | `evolution` | ● | |
| Walking skeleton, and the one-hour rule | `evolution` / two screenshots | ● | |
| Which service the skeleton exercise runs against | `evolution` | ◐ | The search-box option points at `/api/titles`, which is **step 1's** service. Since each step is its own project and only one holds `:8080`, the student has to know to run step 1's app, and the unit does not say so. Fix: one clause. |
| `CLAUDE.md`: what belongs, what it costs | `setup` / `ProjectTree` | ● ⟳ | `setup` owns it and argues it twice inside one unit (the file, then the skill description), which is the right place for both. `patterns` and `quality` also re-argue the per-turn cost. Fix: let those two reference rather than re-derive. |
| Instruction files are scoped and they nest | `setup` | ● | |
| A personal `~/.claude/CLAUDE.md` | `setup` | ● | |
| Skills: frontmatter, load-on-match, being sparing | `setup` / `SkillTree` | ● | |
| Hooks | `setup` / `HookTree` | ◐ | Three short paragraphs and a JSON block. "A hook just happens" is the right sentence, but the section makes no argument about cost or failure modes, and it is the shortest in the unit. Fix: one paragraph on what happens when a hook is wrong or slow. |
| Reading a project nobody walked you through | `setup` / `SetupFlags` | ● | |
| Setting up that exercise | `setup` "Test yourself" | ◐ | The whole setup is **one sentence**. Naming the files would end the exercise, so the brevity is correct in kind, but this is by far the thinnest close in the step for a three-flag hunt. Fix: one more sentence on what a flag looks like and roughly how many places to look, without naming any. |
| Vibe coding vs agentic engineering | `engineering` | ● | |
| "Vibecode" used approvingly | `iteration-paths.many` vs `engineering` lead | ⚠ | `evolution`'s figure label sells vibecoding as the win; `engineering` two units later argues flatly against it. Documented as deliberate, but nothing on the page reconciles it for the reader. Fix: one clause in `engineering` acknowledging the earlier use, which also makes the contrast do work. |
| DDD and ports and adapters as a layout | `engineering` / `DomainTree` | ◐ | Two paragraphs against the largest figure in the step, and no prose reads the drawing. The house rule is not to walk a figure row by row, which is right, but the balance has tipped the other way. Fix: one sentence saying what the shape buys. |
| Domain language as compression | `engineering` | ● | |
| Why that layout helps a model specifically | `engineering`, linking `tokens` | ● | |
| Boundaries cut token cost | — | ○ | The architecture argument is on the page and the money argument is not. This is the only place the course connected layout to the bill and it is now absent. Fix: one sentence beside the `tokens` link. |
| Quality gates behind a hook | `engineering` | ● ⟳ | New material, correctly light, links back to `setup`. It also argues nearly what `quality` argues three units later. Fix: leave it; `engineering` names the gates and `quality` owns the argument, which is the right split, but do not let it grow. |
| Interrupt versus rewind | `steering` | ● | |
| A worktree per agent, and the reading bottleneck | `steering` | ● ⟳ | The definition is written twice, here and in `goals`. The two *arguments* are genuinely different and both worth having; neither unit points at the other. Fix: `steering` reads first, so it keeps the definition and `goals` assumes it. |
| Making the agent stop at a gap | `steering` | ● | |
| The third-time rule, and where knowledge lives | `patterns` | ● ⚠ | The rewrite tightened the prose and **sharpened the defect**: `scripts/new-step.sh step3` still **does not exist**, and it now has a section of its own (`A script instead`) plus a closing one (`Around the script`) built on top of it, while the lead two paragraphs above names the four skills this repo actually wrote, `adding-a-step` among them. So the unit now argues at length for a script the codebase declined to write, and says out loud that "a skill only helps the people who have Claude open" in a repo that chose the skill. Fix: either rewrite the argument to reflect that the skill won, or write the script. Still a decision rather than a correction, and now a costlier one. |
| The new-step file list | `patterns.give-home.2`, `quality.write-it-down.2` | ⟳ | Listed twice, near-identically. The rewrite shortened `patterns`' copy to "two locale files" but kept the list. `quality` at least flags it as a callback. Fix: one list, one owner. |
| The build decides, not the agent | `quality` | ● | |
| Coverage, complexity, mutation, and gaming them | `quality`, `workshop` | ● ⟳ | Stated in both, plus `engineering`. Fix: `quality` keeps the argument, `workshop` names the target and assumes it. |
| Over-commenting and under-logging | `quality` | ● | |
| Goal vs instruction; long autonomous runs | `goals` | ● | |
| The workshop's dependence on `quality` and `goals` | `goals` → `workshop`, `workshop.lead.1` (both languages) | ○ ⚠ | `goals` is the unit `workshop` most directly pays off and **neither end of that link is on the page**. Worse since `enablement` landed: `workshop.lead.1` grades "the thing the last two units argued you should always be able to name", and the last two units are now `enablement` and `goals`, of which `enablement` argues neither the bar nor the yes-or-no goal. The two that do are `quality`, three units back, and `goals`. Counting units back was fragile and an insertion has now broken it. Fix: name `quality` and `goals` in `workshop.lead.1` and in `nl.json` instead of counting, and have `goals` close by naming `workshop`. |
| The five capstone flags | `workshop` / `Workshop` | ● | |
| The native flag's help text | `workshop.flag.native.help` (both languages) | ⚠ | Tells the student to point the image at `Step2Application`, "not the pinned step 1 main". **No `<mainClass>` exists in any pom**; step 1's carries only a comment saying the pin was removed with the project split. The unit HTML was rewritten to stop claiming this; the flag help was not. Fix: cut the clause from `en.json` and `nl.json`. |
| The coverage floor's scope | `workshop.goals.3` | ⚠ | Says the floor is on "the domain". JaCoCo measures everything under the step 2 package minus `web/**`, `config/**`, `aot/**` and `MemberStatements*`, so it also covers `port/`, `adapter/`, `application/LateFeeReport` and `Step2Application`. Only the **mutation** gate is domain-only. A student reasoning from the prose mis-scopes where to write tests. Fix: "on the module, with the web and config layers excluded". |
| What the student reads while hunting a setup flag | `kata/step2/java/.../domain/CLAUDE.md` | ⚠ | States "Money is `BigDecimal` and never `double`." `BigDecimal` appears **nowhere** in step 2's Java; money is `long` cents throughout (`LateFeePolicy.assess` returns `long`). One of the three files the flag hunt sends students to read closely teaches a convention the code does not follow. Fix: change the line to `long` cents. Highest-value fix in this table, because the exercise is *reading this file carefully*. |
| Where the run actually starts | `Step2Application` Javadoc | ⚠ | Says the Boot plugin's `mainClass` is pinned to step 1, that plain `mvn spring-boot:run` starts step 1, and that step 2 needs `-Dspring-boot.run.main-class=…`. All false since the split, and `workshop.build.1` correctly instructs the opposite. Fix: rewrite the paragraph. |
| Recovering a stuck or looping agent | — | ○ | `steering` teaches correcting an agent going the *wrong* way, which is a different situation from one going nowhere, and rewinding assumes a good message to go back to. Has an obvious home in `steering`. |
| Reviewing a diff you did not write | — | ○ | `quality`, `goals`, `steering` and now `enablement` all name the student's reading as the bottleneck of the whole workflow; none teaches it. `enablement.where-day-goes.1` states it hardest ("most of them go on driving the system end to end and reading whether it did what you wanted", "it is most of your week") and its answer is to run the app locally, which shortens the loop rather than teaching the reading. The step now says four times that this is where the week goes. |
| When *not* to use an agent, and what agents are bad at | — | ○ | Every unit assumes the agent is the right tool. `steering`'s "run as many as you can actually review" is the nearest sentence and it limits *how much*, not *whether*. |
| IP, data governance, what may leave the building | — | ○ | For professionals in company training this is the question asked before lesson one, and by someone other than the student. `model`'s billing close and `setup`'s personal-file warning sit next to the hole without filling it. |
| Everyday git hygiene | — | ○ | Worktrees taught twice; branch per task, small commits, never letting an agent commit blind, taught nowhere. |
| Task sizing, and which folder you open the agent in | — | ○ | Went with the deleted `scoping` unit and has not landed anywhere. |
| What one run costs, in money, and how to measure it | — | ○ | `tokens` gives the unit, `model` gives dollars per million, `harness` prices the cache, `ReadYourWindow` has the student read a real count off their own window. **No unit multiplies.** A usage readout beside `ReadYourWindow` closes it in one move. |
| The same habits on a second assistant | steps 0 and 1 only | ◐ | `welcome` says so out loud, so this is work outstanding rather than a mismatch. `SetupFlags` sends every reader into a `.claude` skill and two `CLAUDE.md` files; the exercise works on both products but shows Claude Code's layout. |
| Workflows | `workflows` | ● | Written and now drawn: naive, plan-based, spec-driven, audit-driven, cheapest to most deliberate, closing on the four not being exclusive. Points at `step1/prompt` for plan mode and `step1/harness` for reflection rather than re-teaching either. **Seven inline figures**, four of them one `FlowDiagram` set where teal marks what that workflow adds, plus `AuditExample`, `WorkflowWeights` and `WorkflowTimeline`. Only `tools` carries more. Nothing here is graded and there is still no quiz. |
| Running the whole stack on your own machine | `enablement` / `LoopsPerHour` | ● | Names no project, no command and no example case on purpose, so the section is an aim rather than a setup a student follows. The only place the kata's own two-terminal run appears is step 0's `backend`, which is far enough away that the two do not collide. |
| Giving the agent the same setup, so it checks its own work | `enablement` | ● | |
| T-shaped: keep the depth, add the breadth | `enablement` / `SkillShape` | ◐ | One paragraph against a figure, and the section carries **no example**, the database migration, frontend state bug and build pipeline it was drafted with having gone, so `SkillShape` is the only concrete thing in it. Documented as a known trade rather than an oversight, and the same imbalance this table already flags for `DomainTree`. Fix: one concrete case, or leave it and accept that the figure is carrying the section. |
| Where the hours go once you stop typing code | `enablement` | ● | |
| Quizzes | — | ○ | Step 2 has **no `quiz.ts` at all**, now across ten units. |
| Stale docblocks | `FileTree.tsx`, `step2/index.tsx`, `SkillShape.tsx` | ⚠ | Three, and the newest is the worst. **`step2/index.tsx`'s comment over `enablement`'s two figures describes an earlier draft of the unit rather than the one beside it**: it says the bands "close the section on shortcuts", and the committed unit has no shortcuts section (`reachable-one-step` never landed, and `front/src/steps/CLAUDE.md` records the cut), and that "the two profile shapes close the unit itself", when `skill-shape` sits under `t-shaped` and `where-day-goes` runs two paragraphs after it. That same `CLAUDE.md` states it correctly ("`where-day-goes` closes the unit"), so the registry and the curriculum notes disagree about a unit added in the same commit. `SkillShape`'s own docblock repeats the confusion in one clause, "now the section has moved up under `run-own-machine`", which is the phrase that file uses for `LoopsPerHour`'s move and reads as if this figure moved too. And `FileTree` still says step 2 draws two trees, `ProjectTree` and `DomainTree`; there are **four** callers, `SkillTree` and `HookTree` as well. Resolved from the previous pass: the over-width line in `step2/index.tsx` is gone, and the header now names `workflows` and `enablement`, though it still does not mention `setup`'s board or the `engineering` task card. None of it is student-facing, but all of it is the kind of drift `patterns` teaches students to notice. |

---

## 2. Cadence and sequence, per unit

**Cadence** judges length and interaction density against the unit before it. **Sequence** judges
whether the unit opens from what its predecessor left and hands off to its successor. A row with
both marks ● has an empty remarks cell.

| # | Unit | Words | Fig | Interactive | Follows from | Cad | Seq | Remarks and proposed fix |
|--:|---|--:|--:|---|---|:--:|:--:|---|
| 1 | step0 / `welcome` | 314 | 3 | 2 code boxes + 1q quiz | — | ● | ◐ | **Closes on a figure with nothing after it** and never points at `backend`. Fix: one closing sentence. |
| 2 | step0 / `backend` | 175 | 1 | 1 code box | `welcome` | ◐ | ● | Still the thinnest unit in the course, and one code box is all there is to do. |
| 3 | step1 / `tokens` | 669 | 3 | 3 interactive figures, no quiz | `backend` | ● | ● | |
| 4 | step1 / `prompt` | 633 | 3 | quiz (3q) | `tokens` | ● | ◐ | Opens with no reference to `tokens` and **ends on a bare figure with no closing sentence**. Fix: a closing line into `tools`. |
| 5 | step1 / `tools` | 1181 | 7 | 4 components | `prompt` | ◐ | ● | The heaviest unit in the course: 1181 words and seven figures, nearly double its predecessor, with four things to do stacked under one rule. It earns its length, but it is a spike. Fix: consider splitting the MCP half from the tool-loop half; they are two ideas sharing a page. |
| 6 | step1 / `context` | 1082 | 3 | quiz (3q) | `tools` | ⚠ | ⚠ | **The worst cadence defect in the course, and it is invisible.** `DEFAULT_MODE` is `guided`, and every prose block plus two of three figures sits inside `data-audience="self"`. A default-mode student reads one diagram and a three-question quiz **testing entropy and the training average, neither of which is on their page**. `StepContent` renders nothing for filtered-empty content, so nothing signals the absence. Fix: either default to `self`, or give guided mode a short summary. Rendering a prose-less unit silently is the worst of the three options. |
| 7 | step1 / `session` | 821 | 2 | SurviveTheClear | `context` | ● | ◐ | Opens on a **sentence fragment with no subject** ("Everything earlier in this conversation."), which is good voice but no bridge. Its prose and its own figure disagree on numbers (Table 1b). No pointer to `harness`. |
| 8 | step1 / `harness` | 968 | 4 | CutItUp + PatternMatch | `session` | ● | ◐ | Opens cold, closes with no pointer to `model` even though `model` points back here. |
| 9 | step1 / `model` | 825 | 3 | PickTheTier | `harness` | ● | ● | |
| 10 | step1 / `workshop` | 1033 | 0 | FlagBoard (3 flags) | `model` | ● | ◐ | The **only exercise in the step with no `<hr>` and no "Test yourself" heading** over it, and it does not close the step: no closing paragraph, no pointer into step 2. The only mention of step 2 in all of step 1 is buried inside a `PickTheTier` explanation. Fix: copy the `<hr />` and the shared `ui:quiz.title` heading the other eight units now use, and close the step. |
| 11 | step2 / `evolution` | 788 | 3 | ungraded exercise | step1 `workshop` | ● | ● | |
| 12 | step2 / `setup` | 697 | 3 | SetupFlags (3 flags) | `evolution` | ● | ● | |
| 13 | step2 / `engineering` | 474 | 1+card | WhereWouldItGo | `setup` | ● | ◐ | The bare `<h2>Test yourself</h2>` over the card is now **deliberate and documented**: the comment in the HTML says the card's own description carries the setting, which is the same shape step 1's four task units use (rule, rule line, figure, nothing in between). So what is left is one thing, not two: it opens cold and closes on the card with no line into `steering`. Fix: one closing sentence. |
| 14 | step2 / `steering` | 793 | 0 | none | `engineering` | ⚠ | ◐ | **The wall starts here**, and it is now three units rather than four: `steering`, `patterns`, `quality`, 1,841 words with no figure and nothing to do, ending at `workflows`. Opens cold, closes cold. Fix: this is the best figure candidate left in the kata: interrupt-versus-rewind is two windows side by side, which is exactly what step 1's figure vocabulary already draws, and `workflows` has just proven the step will carry drawings. |
| 15 | step2 / `patterns` | 478 | 0 | none | `steering` | ⚠ | ◐ | Second wall unit, **rewritten by the commit and 128 words shorter**, which makes it the shortest unit in the step. Eight paragraphs became seven across three headings, and it picked up three inline icons (pattern, coin, gem), which are markers rather than figures: there is still nothing drawn and nothing to do. It silently picks up `setup`'s forward pointer, the one thread through this stretch, and still never names `setup` back. Its worked example is still fictional, and the rewrite leaned on it harder (Table 1c). Fix: a three-question quiz, and name `setup` when it collects the pointer. |
| 16 | step2 / `quality` | 570 | 0 | none | `patterns` | ⚠ | ⚠ | Third wall unit. It names the exact numbers the workshop grades, three units early, **without ever saying the student will do this in the workshop**. Fix: a quiz, plus one clause threading it to the capstone. |
| 17 | step2 / `workflows` | 949 | 7 | AuditExample | `quality` | ● | ◐ | **The wall is now broken here, properly.** Seven figures, the densest unit in step 2 and second in the course to `tools`: four `FlowDiagram`s that close a section each, `AuditExample` (the switch turns the rendered table into the markdown behind it, the only interactive element in the step outside the two boards), `WorkflowWeights` and `WorkflowTimeline` closing. Longest of the six prose units, `enablement` included. Still nothing the student **does**. Fix: it is the cheapest place left for a quiz, since the four workflows sort cleanly into questions. |
| 18 | step2 / `enablement` | 322 | 2 | none | `workflows` | ◐ | ◐ | **The thinnest unit in the course outside step 0**, and it lands straight after the densest one: 949 words and seven figures, then 322 and two. Three sections of one or two paragraphs, drawn but with nothing to do. The drop is partly by design (no lead, every section opening cold on its own claim, both documented), and two figures keep it from reading as a return to the wall, so this is a spike in the other direction rather than a defect. Sequence is the real cost: it opens cold and closes on prose with no line into `goals`, which leaves `workflows` → `enablement` → `goals` three units of unmarked seams. Against that, it ties `workflows` for the **most cross-linked unit in the course**, pointing at `step1/tools`, `engineering` and `steering` from inside its own paragraphs. Fix: one closing sentence into `goals`. |
| 19 | step2 / `goals` | 676 | 0 | none | `enablement` | ⚠ | ⚠ | **The last figureless, taskless unit in the step**, now sitting between `enablement` and the capstone rather than between `workflows` and it. Carries the rule the entire capstone is built on and hands off to nothing, and `workshop`'s own lead now miscounts back past it (Table 1c). Second telling of `git worktree add`. Fix: name `workshop` in the closing line; still the cheapest sequencing fix in the step. |
| 20 | step2 / `workshop` | 1089 | 0 | Workshop (5 flags) | `goals` | ● | ● | Longest unit in the course. The cadence complaint is **spent**: the run-up is now 1,271 drawn words across `workflows` and `enablement` and then 676 flat ones in `goals`, rather than 2,645 unbroken. It is 2 to 4 hours of real work and the strongest thing in the kata. What remains is the close: a one-sentence self-only aside, with no wrap-up of the step or the course. Fix: give the course an ending. |

### Cadence, in summary

- **Every quiz is in the first six units of twenty**: step0 `welcome`, step1 `prompt`, step1
  `context`. After unit 6 the course never *asks* the student anything again. It hands them boards
  instead, at units 10, 12 and 20. A board is a task, not a question, and in a guided room a tutor
  cannot get a show of hands from one. **Step 2 has no `quiz.ts` at all.** Fix: three questions each
  on `steering`, `patterns` and `quality`, browser-graded, on machinery that already exists.
- **The wall is broken and stays broken.** `workflows` split the old five-unit stretch with seven
  figures and `enablement` has now put two more between it and `goals`, so what is left unillustrated
  is `steering`/`patterns`/`quality` (1,841 words, no figure, nothing to do) and `goals` on its own.
  `steering` is the one worth drawing first. The *interaction* problem did not move and is now the
  larger of the two: **six of step 2's ten units carry nothing the student does** (`steering`,
  `patterns`, `quality`, `workflows`, `enablement`, `goals`), against four that do. `workflows` is
  still the cheapest place for a quiz, because its four workflows are exactly the kind of thing three
  questions can sort.
- **Interaction density is inverted against difficulty.** Step 1 carries eight interactive
  components, three interactive figures and two quizzes across 7,212 words. Step 2 carries two graded
  boards, two ungraded tasks, one interactive figure and no quizzes across 6,836 words, and it is the
  harder step. The gap widened with `enablement`, which added words and figures and nothing to do.
- **The exercise heading is now one key.** Eight units carry
  `<h2 data-i18n="ui:quiz.title">Test yourself</h2>`, the shared `ui` key, so the wording over a task
  and over a quiz can no longer drift, and step 1's four per-unit `check-yourself.heading` entries
  are gone from the locale files. Three units with something to do sit outside the family: step0
  `welcome`, whose code boxes are the demonstration of how exercises work and so belong in the prose,
  and both `workshop`s, which head their own board sections instead. Only step 1's is a defect
  (Table 2, row 10), and the fix is now one line copied.

### Sequence, in summary

- **Transitions are the course's weakest structural habit.** Of twenty units, four open with an
  explicit back-reference (`model`, both `workshop`s, `setup` by implication) and **three** close
  with a forward pointer (`backend`, `evolution`, `setup`). Everything else opens cold and closes on
  a bare figure, card or board. The house style is to open cold on the claim, which is right at the
  *paragraph* level and has been applied at the *unit* level, where it costs the student the thread.
- **The two seams that matter most are still unmarked**: `engineering` → `steering` (a bare heading
  into a cold open), and `goals` → `workshop` (the unit that argues the rule, into the unit that
  grades it). The step0 → step1 seam is closed. `enablement` lengthened the unmarked stretch to
  `workflows` → `enablement` → `goals` and, at the same time, showed the cheap way out of it: like
  `workflows`, it carries three links to other units from inside its own paragraphs, and none of them
  cost it a transition sentence. **The habit is almost entirely step 2's**: `workflows` and
  `enablement` link three units each and `engineering` two, against one in step 0's `backend` and
  **none at all in step 1**, whose eight units cross-reference each other constantly by name and whose
  only `href` is `context`'s own `#entropy` anchor. Fix: where a unit names another, link it. It is a
  smaller edit than writing seams and buys much of the same thread.
- **Step 1's internal order is settled and load-bearing.** `prompt` defines *context* and `context`
  must not redefine it; `PromptInContext` deliberately has no frame; `ToolsInContext` is the step's
  first teal frame, which is what the "draws no context frame" notes point at; `ContextDiagram` is
  drawn populated because three figures built up to it; `workshop` recites the four layers in
  registry order; and `deck.tsx` is authored in unit order. Reordering means visiting all six.

---

## 3. Delivery gaps

| Gap | Status | Remarks and proposed fix |
|---|:--:|---|
| The deck covers step 1 only | ◐ | 37 slides, data-driven, drawing the step's own figure components so board and page cannot drift. Step 0 has the opening question; **step 2 has no `deck.tsx`** for any of its ten units, and step 2 is the step whose units are hardest to run at a board. The gap grows with the step: `enablement` brings step 2 to **16 inline figures** with no slide behind any of them, and all 16 are the reusable kind, since the three that could not go on a slide (`SetupFlags`, `WhereWouldItGo`, `Workshop`, which write progress to localStorage) are boards and cards rather than drawings. The mechanism is built and proven, so this is authoring, not engineering. |
| No instructor scaffolding | ○ | No `INSTRUCTOR.md`, no per-unit timings, no demo scripts, no checkpoints, no "if the room is stuck here, do this". Guided is the **default** mode, which makes the absence louder. |
| Dutch completeness | ● | |
| Em-dash rule | ● | |
| Locale file hygiene | ◐ | Unchanged in step 1 and re-checked: `mcp-ovals.description` is still wedged between two `mcp-parts.*` keys in `en.json` (lines 256 to 264), orphaning `mcp-parts.tool.*` below an unrelated key; two block separators are still missing; two values still use a typographic apostrophe where every other value uses a straight one (`quiz.quality-degrades.entropy`, `quiz.plan-beats-one-shot.cache`). New in step 2's `nl.json`: `enablement`'s prose block runs straight on from `workflows.pick-per-task.4` and straight into `goals.lead.1` with no separator, which matches the rest of that file's prose region, but it is also the **only** block in there carrying a blank line inside itself (before `where-day-goes`). Both figure blocks are clean and the key sets match `en.json` exactly. Cosmetic, but the file is the one place key order encodes structure. |
