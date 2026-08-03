# Course audit, fresh pass

**Measured:** 31 July 2026, against `18fc526` ("chore: fix audit") **plus the uncommitted work in the
tree**, which together are the whole tree apart from this file. Every number here was taken off the
files rather than carried forward.

Nothing has been committed since the anchor, so the whole range is uncommitted work and this pass
re-measured the tree the last one did plus what has landed in it since. Two rows closed and are
gone, both in `tools`: the stage count now reads fifty in both languages and in
`front/src/steps/CLAUDE.md`, and `spot.body.tests` names a method that exists. Neither touched a
unit's prose, so **no count below moved on this pass**; the `prompt` and `model` counts still carry
the heading and paragraph rewrites the previous pass measured, which is where they differ from the
anchor commit. `npm run build` is green.

**Legend:** ● solid · ◐ thin · ○ missing · ⟳ duplicated · ⚠ inaccurate

**Effort** is what closing the row costs, not how much it matters: `●○○` a clause or a sentence, in
one place and its locale sibling · `●●○` a paragraph, a section, a figure or a quiz, or an edit that
has to be made across several files · `●●●` new material or a decision the course has not taken: a
unit, a deck, a topic nobody has written yet. **An empty effort cell means the row asks for no
edit.** Status and effort are independent: `⚠` rows are mostly `●○○`, because a sentence that says
something untrue is a sentence to rewrite, and the expensive rows are the `○` ones.

**Table 1 reads by `Where`, and it lists only what is left to handle.** A `Where` cell is
`module/unit` and nothing else, module and unit by their rendered titles rather than their folder
ids, comma-separated when a topic spans more than one unit. Under it stand the topics that still
carry work, one row each, with the `Where` cell left blank on every row after the first because it
is the same place. A module on its own means the whole module, `—` means the topic has no home in
the course, and a cell naming a repository file is a path from the repo root.

**A `Where` with an empty topic cell was checked and has nothing outstanding**: solid, no effort, no
remark, no topic to handle. Its topics are not spelled out, because naming what a unit already does
well is what the unit itself is for. So a unit that does not appear at all under any `Where` in its
step's table has not been checked, and one that appears with an empty row has.

**The block id, locale key or figure component a row is really about is not in the `Where`
column**: it opens the remark instead, so a row says where once and points at the exact thing once.

**Every remark is numbered, in one sequence running from Table 1a to Table 3**, so an item can be
cited as it stands ("audit item 23") without quoting it. The numbers are positional and will move
when rows are added, so cite them alongside the topic rather than on their own.

**Basis of the word counts:** English prose with HTML comments stripped first, then tags, then
entities, counting whitespace-separated tokens containing a letter. The **assistant filter is not
applied**, so these are the full files rather than what one reader sees. That gap used to be small
and is no longer: `tools` now splits 998 words for a Claude Code reader against 1,049 for a Copilot
one, and `model` splits **924 against 726**, because its newest section is Claude-only whole.
Step 3's two units now split as well and are the harmless kind: both halves of each pair are the
same length, so 445 and 430 here are **391 and 379 to either reader**, which is what they were
before the pairs existed.

---

## 1. Completeness

### Table 1a. Step 0, "Start here" (2 units, 440 words)

| Where | Topic | Status | Effort | Remarks and proposed fix |
|---|---|:--:|:--:|---|
| `start here/how this kata works` | | ● | | |
| `start here/the backend` | | ● | | |

### Table 1b. Step 1, "Context, model, mechanisms" (9 units, 8,163 words)

| Where | Topic | Status | Effort | Remarks and proposed fix |
|---|---|:--:|:--:|---|
| `context, model, mechanisms/tokens` | | ● | | |
| `context, model, mechanisms/your prompt` | | ● | | |
| `context, model, mechanisms/tools` | | ● | | |
| `context, model, mechanisms/context` | | ● | | |
| `context, model, mechanisms/the session` | | ● | | |
| `context, model, mechanisms/the harness` | | ● | | |
| `context, model, mechanisms/the model` | The five-hour session limit, and where to open it | ● | | **1.** `usage-readout`, `SessionWindows`: **Claude-only whole**, four paragraphs and both figures, with no Copilot sibling anywhere in it and the absence documented as deliberate. Carry it into the next change rather than fixing it: it is the only section in the course written for one reader alone, and it makes `model` split 924 words for a Claude Code reader against 726 for a Copilot one, where every other block that differs is a filename or a command and the two totals stay within 35 words of each other. |
| `context, model, mechanisms/truth` | | ● | | |
| `context, model, mechanisms/workshop` | | ● | | |
| `start here/how this kata works`, `context, model, mechanisms` | Which product's files and commands | ● | | **2.** Numbers only, and re-measured: **25** elements in step 1 carry `data-assistant`, up two on the pass that recorded 24, since `tools.list-itself-window.2` became a pair. **Seven of the 25 are the one-sided section in `model`** rather than a paired filename or command. Step 0 carries none: `welcome` explains the setting and varies nothing. |
| — | What one run costs, in money, and how to measure it | ○ | ●●○ | **3.** **Re-filed from Table 1c in the previous pass**: every source it names is a step 1 unit. `tokens` gives the unit, `model` gives dollars per million, `harness` prices the cache, `ReadYourWindow` has the student read a real count off their own window. **No unit multiplies.** The usage readout this row asked for has arrived in `model`, and it is the wrong readout: it prints percentages of a session and a weekly allowance, not money, and it is Claude-only, so the reader on a metered key never sees it. The gap is unchanged and the cheap fix is now cheaper, since the figure is already on the page to reason from. |

### Table 1c. Step 2, "Agentic engineering" (10 units, 7,052 words)

| Where | Topic | Status | Effort | Remarks and proposed fix |
|---|---|:--:|:--:|---|
| `agentic engineering/project evolution` | Which service the skeleton exercise runs against | ◐ | ●○○ | **4.** The search-box option points at `/api/titles`, which is **step 1's** service. Since each step is its own project and only one holds `:8080`, the student has to know to run step 1's app, and the unit does not say so. Fix: one clause. |
| `agentic engineering/project evolution`, `agentic engineering/engineering` | "Vibecode" used approvingly | ⚠ | ●○○ | **5.** `iteration-paths.many`: `evolution`'s figure label sells vibecoding as the win; `engineering`'s lead two units later argues flatly against it. Documented as deliberate, but nothing on the page reconciles it for the reader. Fix: one clause in `engineering` acknowledging the earlier use, which also makes the contrast do work. |
| `agentic engineering/project setup` | `CLAUDE.md`: what belongs, what it costs | ● ⟳ | | **6.** The last outside re-derivation went with the `quality` unit, so the only telling left is `setup`'s own, twice inside one unit (the file, then the skill description), which is the right place for both. Fix: leave it, and do not let a third site open. |
| | Hooks | ◐ | ●●○ | **7.** Three short paragraphs and a JSON block. "A hook just happens" is the right sentence, but the section makes no argument about cost or failure modes, and it is the shortest in the unit. Fix: one paragraph on what happens when a hook is wrong or slow. |
| | Setting up the flag-hunt exercise | ◐ | ●○○ | **8.** The whole setup under "Test yourself" is **one sentence**. Naming the files would end the exercise, so the brevity is correct in kind, but this is by far the thinnest close in the step for a three-flag hunt. Fix: one more sentence on what a flag looks like and roughly how many places to look, without naming any. |
| `agentic engineering/engineering` | DDD and ports and adapters as a layout | ◐ | ●○○ | **9.** `DomainTree`: two paragraphs against the largest figure in the step, and no prose reads the drawing. The house rule is not to walk a figure row by row, which is right, but the balance has tipped the other way. Fix: one sentence saying what the shape buys. |
| | Quality gates behind a hook | ● | | **10.** Two paragraphs, linking back to `setup`, and **it is now the owner rather than the light half of a pair**: the unit that carried the argument was cut and this is what the course has left on the subject. Fix: none here, but see the metrics row below, which is the part of that argument this section does not pick up. |
| `agentic engineering/engineering`, `agentic engineering/goal-oriented`, `agentic engineering/workshop` | Coverage, complexity, mutation, and gaming them | ◐ | ●○○ | **11.** `engineering` names the three gates, `goals` uses two of them as worked goals, and **the proxy trap is now argued only in `workshop.honest.1`, where it is graded**. Cutting `quality` moved the one non-obvious half of this topic from four units before the capstone to inside it, so a student meets "a metric is a proxy, and an agent will satisfy the proxy" for the first time while being asked to beat one. Fix: one clause in `engineering.quality-gates.1`, since that section already lists the metrics. |
| `agentic engineering/steering`, `agentic engineering/goal-oriented` | A worktree per agent, and the reading bottleneck | ● ⟳ | ●○○ | **12.** The definition is written twice, in `steering` and in `goals`. The two *arguments* are genuinely different and both worth having; neither unit points at the other. `parallel` is the model for what the third site should look like: it names the worktree in half a sentence, links to `steering` and argues nothing. Fix: `steering` reads first, so it keeps the definition and `goals` assumes it. |
| `agentic engineering/solving repeating patterns` | | ● | | |
| `agentic engineering/workflows` | Workflows | ● | | **13.** Written and now drawn: naive, plan-based, spec-driven, audit-driven, cheapest to most deliberate, closing on the four not being exclusive. Points at `step1/prompt` for plan mode and `step1/harness` for reflection rather than re-teaching either. **Seven inline figures**, four of them one `FlowDiagram` set where teal marks what that workflow adds, plus `AuditExample`, `WorkflowWeights` and `WorkflowTimeline`. Only `tools` carries more. Nothing here is graded and there is still no quiz. |
| `agentic engineering/enablement` | Running the whole stack on your own machine | ● | | **14.** Names no project, no command and no example case on purpose, so the section is an aim rather than a setup a student follows. The only place the kata's own two-terminal run appears is step 0's `backend`, which is far enough away that the two do not collide. |
| | T-shaped: keep the depth, add the breadth | ◐ | ●○○ | **15.** One paragraph against a figure, and the section carries **no example**, the database migration, frontend state bug and build pipeline it was drafted with having gone, so `SkillShape` is the only concrete thing in it. Documented as a known trade rather than an oversight, and the same imbalance this table already flags for `DomainTree`. Fix: one concrete case, or leave it and accept that the figure is carrying the section. |
| `agentic engineering/parallel workflows` | The orchestrator | ● | | **16.** `parallel.orchestrator`: one paragraph, pointing back at `step1/harness`'s coordinator for the mechanism rather than re-deriving it. `agents-at-once.orchestrated.note` ("four runs, one thing to read") is the only place its payoff is stated, so it is a figure label carrying an argument. |
| `agentic engineering/goal-oriented`, `agentic engineering/workshop` | The workshop's dependence on `engineering` and `goals` | ◐ | ●○○ | **17.** `workshop.lead.1` (both languages) was repointed from the cut `quality` unit to `engineering`, so that end is correct and no longer counts back to anything. **The other end is still absent**: `goals` is the unit `workshop` most directly pays off and closes without naming it. Fix: have `goals` close by naming `workshop`. |
| `agentic engineering/workshop` | The native flag's help text | ⚠ | ●○○ | **18.** `workshop.flag.native.help` (both languages) tells the student to point the image at `Step2Application`, "not the pinned step 1 main". **No `<mainClass>` exists in any pom**; step 1's carries only a comment saying the pin was removed with the project split. The unit HTML was rewritten to stop claiming this; the flag help was not. Fix: cut the clause from `en.json` and `nl.json`. |
| | The coverage floor's scope | ⚠ | ●○○ | **19.** `workshop.goals.3` says the floor is on "the domain". JaCoCo measures everything under the step 2 package minus `web/**`, `config/**`, `aot/**` and `MemberStatements*`, so it also covers `port/`, `adapter/`, `application/LateFeeReport` and `Step2Application`. Only the **mutation** gate is domain-only. A student reasoning from the prose mis-scopes where to write tests. Fix: "on the module, with the web and config layers excluded". |
| `kata/step2/java/.../domain/CLAUDE.md` | What the student reads while hunting a setup flag | ⚠ | ●○○ | **20.** States "Money is `BigDecimal` and never `double`." `BigDecimal` appears **nowhere** in step 2's Java; money is `long` cents throughout (`LateFeePolicy.assess` returns `long`). One of the three files the flag hunt sends students to read closely teaches a convention the code does not follow. Fix: change the line to `long` cents. Highest-value fix in this table, because the exercise is *reading this file carefully*. |
| `kata/step2/java/.../Step2Application.java` | Where the run actually starts | ⚠ | ●○○ | **21.** The Javadoc says the Boot plugin's `mainClass` is pinned to step 1, that plain `mvn spring-boot:run` starts step 1, and that step 2 needs `-Dspring-boot.run.main-class=…`. All false since the split, and `workshop.build.1` correctly instructs the opposite. Fix: rewrite the paragraph. |
| `front/src/steps/step2/FileTree.tsx`, `front/src/steps/step2/index.tsx` | Stale docblocks | ⚠ | ●○○ | **22.** Still two, and the header defect swapped for a slot one. Fixed: the header docblock now names all seven units that carry a drawing, `parallel` included, though it still does not mention `setup`'s board or the `engineering` task card. New: **`parallel`'s slot comment says `AgentsAtOnce` "names all three arrangements, so under `One agent at a time` it would spend two of them early"**. The figure draws **four** rows and the unit runs four sections, and both the component's own docblock and the comment in `parallel.html` say four and three. The registry is the only file of the three that undercounts. And `FileTree` still says step 2 draws two trees, `ProjectTree` and `DomainTree`; there are **four** callers, `SkillTree` and `HookTree` as well. None of it is student-facing, but all of it is the kind of drift `patterns` teaches students to notice. |
| `front/src/steps/step2/CLAUDE.md` | The record of the cut `quality` unit | ⚠ | ●○○ | **23.** The record exists so nobody restores half the unit, and it is wrong about which half survived. It says **"The proxy trap is the one argument that had no second home**, and it now survives only inside `workshop.flag.honest.help`". The trap is in fact argued in prose, for every reader, in `workshop.honest.1` ("Coverage is a proxy, and an agent will satisfy a proxy"), and the argument with no second home is over-commenting and under-logging, which the same sentence lists as covered. An author trusting this puts the trap back and leaves the logging rule out, which is the wrong way round. Fix: swap the two claims. |
| — | Boundaries cut token cost | ○ | ●○○ | **24.** The architecture argument is on the page and the money argument is not. This is the only place the course connected layout to the bill and it is now absent. Fix: one sentence beside the `tokens` link. |
| | The new-step file list | ○ | | **25.** Went with `quality`, and it was an example rather than an argument, so little is lost: the scaffolding-skill idea it illustrated survives in `patterns.scripts.1`. Recorded so nobody looks for it. |
| | Over-commenting and under-logging | ○ | ●○○ | **26.** Went with `quality` and has **no second home anywhere in the course**: neither term appears in another unit, in either language. It was two sentences and it is hygiene an agent gets wrong by default. Fix: put it back beside `setup`'s `CLAUDE.md` section, which is where the file those rules belong in is argued. |
| | Everyday git hygiene | ○ | ●●● | **27.** Worktrees taught twice; branch per task, small commits, never letting an agent commit blind, taught nowhere. |
| | Task sizing, and which folder you open the agent in | ○ | ●●● | **28.** Went with the deleted `scoping` unit and has not landed anywhere. |
| | Quizzes | ○ | ●●● | **29.** Step 2 has **no `quiz.ts` at all**, now across ten units. Step 3 has none either, but that step's whole absence of student work is one row in Table 1d rather than this one. |

### Table 1d. Step 3, "Soft skills" (3 units, 1,252 words)

| Where | Topic | Status | Effort | Remarks and proposed fix |
|---|---|:--:|:--:|---|
| `soft skills/change management` | The reviewer is where the bottleneck moved | ● | | **30.** The one place the course says the cost lands on **somebody else**, and the answer it gives is the gates `engineering` already argues, linked rather than re-derived. |
| | Conventions in the repository, not in a head | ● ⟳ | | **31.** `change.conventions-live-repository.1`: `setup` owns it and this re-states it in a paragraph, but it adds something that unit does not have: read the history of those files to find out whether the team actually changed. Fix: leave it. |
| `soft skills/expectation management` | | ● | | |
| `soft skills/impostor syndrome` | | ● | | |
| — | IP, data governance, what may leave the building | ○ | ●●● | **32.** **Re-filed from Table 1c in the previous pass**, since `change` is the home it names. For professionals in company training this is the question asked before lesson one, and by someone other than the student. `context, model, mechanisms/the model`'s billing close and `agentic engineering/project setup`'s personal-file warning sit next to the hole without filling it. `change` is about what a team has to agree before any of this starts, and it argues habits and reviewers only. |
| | Anything the student does | ○ | ●●○ | **33.** **No figure, no quiz and no exercise in the whole step**, across three units and 1,252 words. Documented as deliberate, on the grounds that every unit here is a conversation rather than a command. That reasoning holds for an exercise and not for a quiz: guided mode is the default, these are the units most likely to be read in a room, and "what do you promise when you show a skeleton" is exactly a show-of-hands question. Fix: one three-question quiz, on `expectations`, which is the unit with the most checkable claims in it. |
| | An ending for the course | ○ | ●○○ | **34.** `impostor` closes on its own last section. The kata now runs four steps and 24 units and stops without saying so. Fix: two sentences at the end of `impostor`; the row that used to ask this of step 2's `workshop` moved here with the step. |

### Table 1e. Across the course

Three gaps no single step owns. They sat in Table 1c while step 2 was the last step in the course
and step 2 was therefore the last place a fix could land. That stopped being true when step 3
arrived, and each of these now spans at least two modules, so a fix has to be placed rather than
appended.

| Where | Topic | Status | Effort | Remarks and proposed fix |
|---|---|:--:|:--:|---|
| — | Reviewing a diff you did not write | ○ | ●●● | **35.** `agentic engineering/goal-oriented`, `agentic engineering/steering`, `agentic engineering/enablement` and `agentic engineering/parallel workflows` all name the student's reading as the bottleneck of the whole workflow; none teaches it. `enablement.where-day-goes.1` states it hardest ("most of them go on driving the system end to end and reading whether it did what you wanted", "it is most of your week"), and `parallel.many-agents-once.3` adds the half nobody else says, that the tenth diff of the afternoon gets a worse read than the first. **Four units in step 2, and `soft skills/expectation management` makes it five.** Every one of them is a warning about the reading; not one is instruction in it. Now the clearest case for this table: the module that names it most is not the module that could teach it. |
| | When *not* to use an agent, and what agents are bad at | ○ | ●●● | **36.** Every unit in every module assumes the agent is the right tool. **Documented as deliberately absent** rather than overlooked: the notes rule it out of `steering`'s new section by name, on the grounds that half-telling it there is worse than leaving it out. That makes it a decision to revisit rather than a gap to plug, and the decision still has nowhere to land. `soft skills` is the module it could land in without half-telling it, since that module argues about the work rather than inside it. |
| every module except `agentic engineering` | The same habits on a second assistant | ◐ ⚠ | ●●● | **37.** **Step 2 is now the only module with no `data-assistant` anywhere in it**, step 3 having gained two pairs, and it is the module the swap fails hardest in: `SetupFlags` sends every reader into a `.claude` skill and two `CLAUDE.md` files, and the exercise works on both products while showing Claude Code's layout. What got worse in the same change is that the page **stopped saying so**. `welcome` now tells every reader the course "will modify the content of this course to include the relevant commands so you can easily follow along", a promise 7,052 words of step 2 do not keep, so what was work outstanding is now also a claim the course falsifies. Step 1's own parity **improved in the same range and is still short**: `tools` gained a Copilot half for the paragraph that prices holding a tool, which is the only *paired* block in the course that varies on a **product fact** rather than on a filename or a command, and three more of its blocks now name Copilot CLI rather than Copilot. What is left there is `model`'s five-hour-window section, 250 words and two figures with no sibling, so the two readers still do not see the same unit (Table 1b). |

---

## 2. Cadence and sequence, per unit

**Cadence** judges length and interaction density against the unit before it. **Sequence** judges
whether the unit opens from what its predecessor left and hands off to its successor. A row with
both marks ● has an empty remarks cell.

| # | Unit | Words | Fig | Interactive | Follows from | Cad | Seq | Eff | Remarks and proposed fix |
|--:|---|--:|--:|---|---|:--:|:--:|:--:|---|
| 1 | step0 / `welcome` | 265 | 3 | 2 code boxes + 1q quiz | — | ● | ◐ | ●○○ | **38.** **Closes on a figure with nothing after it** and never points at `backend`. Fix: one closing sentence. |
| 2 | step0 / `backend` | 175 | 1 | 1 code box | `welcome` | ◐ | ● | ●●○ | **39.** Still the thinnest unit in the course, and one code box is all there is to do. |
| 3 | step1 / `tokens` | 669 | 3 | 3 interactive figures, no quiz | `backend` | ● | ● | | |
| 4 | step1 / `prompt` | 624 | 3 | quiz (3q) | `tokens` | ● | ◐ | ●○○ | **40.** Opens with no reference to `tokens` and **ends on a bare figure with no closing sentence**. Fix: a closing line into `tools`. |
| 5 | step1 / `tools` | 1210 | 7 | 4 components | `prompt` | ◐ | ● | ●●● | **41.** The heaviest unit in the course: 1210 words and seven figures, nearly double its predecessor, with four things to do stacked under one rule. It earns its length, but it is a spike. **The 59 words it gained on the previous pass were a Copilot half rather than new material**, so no reader's page got longer, and the split it widens is priced under Basis of the word counts rather than here. Fix: consider splitting the MCP half from the tool-loop half; they are two ideas sharing a page. |
| 6 | step1 / `context` | 1082 | 3 | quiz (3q) | `tools` | ● | ● | | **42.** `DEFAULT_MODE` is `guided`, and every prose block plus two of three figures sits inside `data-audience="self"`, so a default-mode student gets one diagram and a three-question quiz. **Accepted as-is**: in class this unit is walked through at the board, which is the reason `front/CLAUDE.md` and the step's own notes record for the whole-unit wrapper. No fix; the Table 1b row that flagged the same absence is closed with this one. |
| 7 | step1 / `session` | 821 | 2 | SurviveTheClear | `context` | ● | ◐ | ●○○ | **43.** Opens on a **sentence fragment with no subject** ("Everything earlier in this conversation."), which is good voice but no bridge. No pointer to `harness`. |
| 8 | step1 / `harness` | 976 | 4 | CutItUp + PatternMatch | `session` | ● | ◐ | ●○○ | **44.** Opens cold, closes with no pointer to `model` even though `model` points back here. |
| 9 | step1 / `model` | 1085 | 5 | PickTheTier | `harness` | ● | ● | ●●● | **45.** Grew by a section of four paragraphs and two figures under one heading, which is longer than the course usually runs and is documented as deliberate. What that leaves is the one unit in the course that reads as **two different lengths**: 924 words and five figures for a Claude Code reader, 726 and three for a Copilot one (Table 1b). Neither reader is told the other's version exists. |
| 10 | step1 / `truth` | 649 | 2 | none | `model` | ◐ | ◐ | ●●○ | **46.** New, and **the only unit in step 1 with nothing the student does**: no quiz, no exercise, and both its figures are static. Every other unit in the step carries at least one of the three. Against that, the two drawings take genuinely different cuts of one argument and the prose reads each of them, which is the shape the step's best units have. Sequence: `model` closes on its task card without pointing here, this opens cold on its own claim, and it closes on prose with no line into `workshop`. Fix: a three-question quiz. The material sorts into questions more cleanly than anything else added this year, since trained-against-grounded-against-proved is already three answers. |
| 11 | step1 / `workshop` | 1047 | 0 | FlagBoard (3 flags) | `truth` | ● | ◐ | ●○○ | **47.** The **only exercise in the step with no `<hr>` and no "Test yourself" heading** over it, and it does not close the step: no closing paragraph, no pointer into step 2. The only mention of step 2 in all of step 1 is buried inside a `PickTheTier` explanation. Fix: copy the `<hr />` and the shared `ui:quiz.title` heading the other eight units now use, and close the step. |
| 12 | step2 / `evolution` | 822 | 3 | ungraded exercise | step1 `workshop` | ● | ● | | |
| 13 | step2 / `setup` | 684 | 3 | SetupFlags (3 flags) | `evolution` | ● | ◐ | ●○○ | **48.** **It no longer closes with a forward pointer.** `setup.hooks.3` ended on "the unit on repeating patterns comes back to when that is worth doing" and the clause was cut, correctly, because `patterns` stopped mentioning hooks. What it leaves is the last prose sentence in the unit ending on hooks alone, and the `setup` → `patterns` seam unmarked from both sides. Fix: one clause, on whatever `patterns` argues now. |
| 14 | step2 / `engineering` | 474 | 1+card | WhereWouldItGo | `setup` | ● | ◐ | ●○○ | **49.** The bare `<h2>Test yourself</h2>` over the card is now **deliberate and documented**: the comment in the HTML says the card's own description carries the setting, which is the same shape step 1's four task units use (rule, rule line, figure, nothing in between). So what is left is one thing, not two: it opens cold and closes on the card with no line into `steering`. Fix: one closing sentence. |
| 15 | step2 / `steering` | 1094 | 0 | none | `engineering` | ⚠ | ◐ | ●●○ | **50.** **Two sections added, 301 words, and it is now the second longest unit in the course**, behind `tools` and ahead of the capstone. It is also still undrawn and still has nothing to do, which makes it 1,094 words of unbroken prose landing on a 474-word predecessor. The new material is good and correctly placed (`Mid-flight` sorts the moves by where the agent is when you catch it; `When it is going nowhere` is `Interrupt, or go back` answered), so the cost is length rather than content. Fix unchanged and now urgent: **this is the best figure candidate left in the kata**, since interrupt-versus-rewind is two windows side by side and the step's neighbours on both sides carry drawings. Sequence: it opens on its first `<h2>` with no lead, which is documented and deliberate, and it gained one link, to `step1/session`. |
| 16 | step2 / `patterns` | 423 | 1 | none | `steering` | ◐ | ◐ | ●●○ | **51.** **Drawn for the first time** and second thinnest in the step. Eight paragraphs became six across two headings (`Skill iteration`, `Scripts`), two `<pre>` blocks arrived that are one skill twice differing by exactly one rule, and `ScriptRuns` closes the unit. Still **nothing to do**, and its predecessor's growth leaves it at under two fifths of the unit before it. Both seams are bare: it opens cold, `setup`'s pointer into it was cut with the hooks clause, and it names no other unit at all. Fix: a three-question quiz, and one clause naming `setup` where the skill it iterates was first written. |
| 17 | step2 / `workflows` | 949 | 7 | AuditExample | `patterns` | ● | ◐ | ●●○ | **52.** **The wall is now broken here, properly.** Seven figures, the densest unit in step 2 and second in the course to `tools`: four `FlowDiagram`s that close a section each, `AuditExample` (the switch turns the rendered table into the markdown behind it, the only interactive element in the step outside the two boards), `WorkflowWeights` and `WorkflowTimeline` closing. Longest of the six prose units, `enablement` included. Still nothing the student **does**. Fix: it is the cheapest place left for a quiz, since the four workflows sort cleanly into questions. |
| 18 | step2 / `enablement` | 322 | 2 | none | `workflows` | ◐ | ◐ | ●○○ | **53.** **The thinnest unit in the course outside step 0**, and it lands straight after the densest one: 949 words and seven figures, then 322 and two. Three sections of one or two paragraphs, drawn but with nothing to do. The drop is partly by design (no lead, every section opening cold on its own claim, both documented), and two figures keep it from reading as a return to the wall, so this is a spike in the other direction rather than a defect. Sequence is the real cost: it opens cold and closes on prose with no line into `goals`, which leaves `workflows` → `enablement` → `goals` three units of unmarked seams. Against that, it ties `workflows` for the **most cross-linked unit in the course**, pointing at `step1/tools`, `engineering` and `steering` from inside its own paragraphs. Fix: one closing sentence into `goals`. |
| 19 | step2 / `parallel` | 518 | 1 | none | `enablement` | ● | ◐ | | **54.** New, in the slot the cut `quality` unit left and not a rewrite of it. Four sections running most control to least and then landing in the middle, one drawing closing the unit, nothing to do. Cadence is fine: 518 words and a figure after 322 and two is a rise rather than a spike. Sequence: it opens on its first `<h2>` with no lead, which is documented, and `enablement` still does not hand into it. Against that it carries **four links to three other units**, more than any unit in step 2, and one of them is to `goals` in its last paragraph, so the seam into the capstone's run-up is at least threaded. Fix: nothing here; the closing sentence belongs to `enablement`. |
| 20 | step2 / `goals` | 676 | 0 | none | `parallel` | ⚠ | ⚠ | ●○○ | **55.** One of the step's **two figureless, taskless units** and the one that carries the rule the entire capstone is built on. It hands off to nothing. Resolved since the last pass: `workshop`'s lead no longer counts back past it (Table 1c). Second telling of `git worktree add`, with `parallel` naming a worktree a third time without arguing it. Fix: name `workshop` in the closing line; still the cheapest sequencing fix in the step. |
| 21 | step2 / `workshop` | 1090 | 0 | Workshop (5 flags) | `goals` | ● | ◐ | ●○○ | **56.** Third longest unit in the course now, behind `tools` and `steering`. The cadence complaint stays **spent**, and by more than it was: the run-up is 1,789 drawn words across `workflows`, `enablement` and `parallel`, then 676 flat ones in `goals`. It is 2 to 4 hours of real work and the strongest thing in the kata. The close is where it costs: a one-sentence self-only aside, no wrap-up of the step, and now **a whole step after it that it does not mention**. Fix: one closing sentence into `change`. |
| 22 | step3 / `change` | 445 | 0 | none | step2 `workshop` | ◐ | ◐ | ●○○ | **57.** Opens the new step, and the drop is the largest in the course at 699 words as either reader meets it: 1,090 with a five-flag board, then 391 with nothing at all (445 is the file, both halves of its assistant pair counted). A step boundary earns a reset, so this is thin rather than wrong, and three links out of it keep it tied to what the student just did. Sequence: `workshop` does not hand into it and it opens cold. |
| 23 | step3 / `expectations` | 377 | 0 | none | `change` | ● | ◐ | ●○○ | **58.** Matches its predecessor almost exactly in length and shape. **Four links to four different units**, which ties `parallel` for the most in the course, and every one of them is load-bearing rather than decorative: it is the unit that reads back what steps 1 and 2 already argued. Opens cold, closes cold. |
| 24 | step3 / `impostor` | 430 | 0 | none | `expectations` | ● | ◐ | ●○○ | **59.** Closes the course. One link. Its last paragraph is the right note to end on, and it ends the unit rather than the kata (Table 1d). |

### Cadence, in summary

- **Every quiz is still in the first six units, and there are now twenty-four**: step0 `welcome`,
  step1 `prompt`, step1 `context`. After unit 6 the course never *asks* the student anything again.
  It hands them boards instead, at units 11, 13 and 21, and after unit 21 it hands them nothing at
  all. A board is a task, not a question, and in a guided room a tutor cannot get a show of hands
  from one. **Two of the four steps have no `quiz.ts`**, and they are the second half of the course.
  Fix: three questions each on `steering` and `patterns` in step 2 and on `expectations` in step 3,
  browser-graded, on machinery that already exists.
- **The wall moved to the end of the course.** Inside step 2 it is still gone: `parallel` arrived
  drawn in the slot `quality` left, so **no two undrawn units are adjacent** and what is
  unillustrated is `steering` and `goals` standing alone, 1,770 words with nothing to do in either.
  `steering` is the one worth drawing first and it got 301 words longer while nobody drew it. Step 3
  is the new wall and it is a worse one: **three consecutive units, 1,252 words, no figure, no quiz
  and no exercise anywhere in the step**, closing the course. Counted across everything, **ten of
  twenty-four units carry nothing the student does** (`truth`, `steering`, `patterns`, `workflows`,
  `enablement`, `parallel`, `goals`, and all three of step 3), against fourteen that do.
- **Interaction density is inverted against difficulty.** Step 1 carries eight interactive
  components, three interactive figures and two quizzes across 8,160 words. Step 2 carries two graded
  boards, two ungraded tasks, one interactive figure and no quizzes across 7,052 words, and it is the
  harder step. Step 3 carries nothing across 1,252. Every unit added since the last pass, in all
  three steps, added words and figures and nothing to do.
- **The exercise heading is now one key.** Eight units carry
  `<h2 data-i18n="ui:quiz.title">Test yourself</h2>`, the shared `ui` key, so the wording over a task
  and over a quiz can no longer drift, and step 1's four per-unit `check-yourself.heading` entries
  are gone from the locale files. Three units with something to do sit outside the family: step0
  `welcome`, whose code boxes are the demonstration of how exercises work and so belong in the prose,
  and both `workshop`s, which head their own board sections instead. Only step 1's is a defect
  (Table 2, row 11), and the fix is now one line copied.

### Sequence, in summary

- **Transitions are the course's weakest structural habit, and five units were added without
  changing that.** Of twenty-four units, four open with an explicit back-reference (`model`, both
  `workshop`s, `setup` by implication) and **two** close with a forward pointer (`backend`,
  `evolution`). Everything else opens cold and closes on a bare figure, card, board or paragraph.
  The house style is to open cold on the claim, which is right at the *paragraph* level and has been
  applied at the *unit* level, where it costs the student the thread. Three units now open on their
  first `<h2>` with no lead at all (`steering`, `enablement`, `parallel`), which is documented and
  deliberate and makes the seam before them harder to mark, not easier.
- **The two seams that matter most are still unmarked**: `engineering` → `steering` (a bare heading
  into a cold open), and `goals` → `workshop` (the unit that argues the rule, into the unit that
  grades it). `setup` → `patterns` is still the third, so the only marked seam inside step 2 remains
  `evolution` → `setup`. The step0 → step1 seam is closed and **a new step boundary is not**: step
  2's `workshop` ends on a self-only aside with a whole step behind it, so the longest unmarked
  stretch in the course now runs `workflows` → `enablement` → `parallel` → `goals` → `workshop` →
  `change` → `expectations` → `impostor`, eight units to the end.
- **Linking is the cheap way out of it, and it is spreading.** `parallel` and step 3's
  `expectations` each carry four links to other units from inside their own paragraphs, more than
  any unit before them, and none of them cost a transition sentence. The habit is no longer step
  2's alone: step 3's three units carry eight links between them, and **step 1 has stopped being at
  zero**, `truth` linking to `tools` twice and back to `context`, and `model` to `session` and to `prompt`, where before the step's
  only `href` was `context`'s own `#entropy` anchor. Fix, unchanged: where a unit names another,
  link it.
- **Step 1's internal order is settled and load-bearing.** `prompt` defines *context* and `context`
  must not redefine it; `PromptInContext` deliberately has no frame; `ToolsInContext` is the step's
  first teal frame, which is what the "draws no context frame" notes point at; `ContextDiagram` is
  drawn populated because three figures built up to it; `workshop` recites the four layers in
  registry order; and `deck.tsx` is authored in unit order. Reordering means visiting all six.

---

## 3. Delivery gaps

| Gap | Status | Effort | Remarks and proposed fix |
|---|:--:|:--:|---|
| The deck covers step 1 only | ◐ | ●●● | **60.** 41 slides, data-driven, drawing the step's own figure components so board and page cannot drift, and `truth` arrived with four of its own. Step 0 has the opening question; **steps 2 and 3 have no `deck.tsx`** across thirteen units. Step 2 is now at **18 inline figures** with no slide behind any of them, and all 18 are the reusable kind, since the three that could not go on a slide (`SetupFlags`, `WhereWouldItGo`, `Workshop`, which write progress to localStorage) are boards and cards rather than drawings. Step 3 is the harder half of the problem and the other kind: it has no figures at all, so a deck for it is authoring from nothing, and it is also the step most obviously meant to be talked through in a room. One new mechanical limit worth knowing before anyone starts: `model`'s two newest figures are Claude-only and the deck has no assistant filter, so they are the first figures in step 1 that cannot go on a board as things stand. |
| No instructor scaffolding | ○ | ●●● | **61.** No `INSTRUCTOR.md`, no per-unit timings, no demo scripts, no checkpoints, no "if the room is stuck here, do this". Guided is the **default** mode, which makes the absence louder. |
| Dutch completeness | ● | | |
| Em-dash rule | ● | | |
| Locale file hygiene | ◐ | ●○○ | **62.** Step 1's `en.json` gained five clean, correctly ordered blocks and none of its standing faults were touched: `mcp-ovals.description` is still wedged between two `mcp-parts.*` keys (lines 257 to 264), orphaning `mcp-parts.tool.*` below an unrelated key; two block separators are still missing; two values still use a typographic apostrophe where every other value uses a straight one (`quiz.quality-degrades.entropy`, `quiz.plan-beats-one-shot.cache`). In step 2's `nl.json` the one stray blank line inside a prose block is still there, now the only one in the region, and `enablement` still runs into its successor with no separator, which is that region's convention; the successor is `parallel` rather than `goals` and `parallel`'s own block follows the same convention. New and trivial: step 3's two files **disagree with each other on their own first separator**, `en.json` putting a blank line under `step.title` and `nl.json` not. Cosmetic, but the file is the one place key order encodes structure. |
