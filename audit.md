# Course audit, fresh pass

**Measured:** 5 August 2026, against `79dbedf` ("chore: polishing") **plus the uncommitted work in
the tree**, which is all of what this pass records. Every number here was taken off the files rather
than carried forward.

**The anchor has not moved since the previous pass**, so this is the same working tree re-measured
with one more change in it: step 2's `goal-oriented` became `spending tokens`, 730 words, four
figures and a quiz on a unit that had none of them, which is what moves the largest numbers in Table
2. What the pass before it recorded still stands underneath, the decks that arrived for steps 0, 2
and 3, step 3's two long units growing, and `ReadYourWindow` leaving `tools` for `context`. None of
it is committed, so the counts describe a tree with no commit of its own.

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
applied**, so these are the full files rather than what one reader sees. Three units split, and only
one of them splits hard: `model` is **968 words for a Claude Code reader against 770** for a Copilot
one, because its newest section is Claude-only whole; `tools` splits 879 against 910 and `recap` 357
against 326. Step 3's two units split as well and are the harmless kind: both halves of each pair are
the same length, so 953 and 430 here are **888 and 379 to either reader**, which is what they were
before the pairs existed.

---

## 1. Completeness

### Table 1a. Step 0, "Start here" (2 units, 672 words)

| Where | Topic | Status | Effort | Remarks and proposed fix |
|---|---|:--:|:--:|---|
| `start here/how this kata works` | What a workshop is | ⚠ | ●○○ | **1.** `welcome.how-workshops-work.1` opens "Most steps close on a workshop." **One of the four does.** Step 0 has no board, step 3 has no board, and step 1's board is now the ninth of ten units with `recap` behind it, so only step 2 closes on one. The sentence is there to say what a workshop *is*, and the counting clause is doing no work. Fix: cut it and open on the definition, in both languages. |
| | One flag one session, against the capstone's one window | ⚠ | ●○○ | **2.** `welcome.house-rules.3` is **"One flag, one session"**, "start each one on a fresh session". Three paragraphs after `workshop.lead.2` sends the student to those rules, `workshop.one-window.1` tells them **"Work all three from a single session. Nothing here needs a clear between the flags"**. The card is right for the capstone, since watching one window fill is the whole point of it, so the rule is the half to move. Nothing on either page reconciles them, in either language. Fix: a clause on rule 3 admitting the exception a step may ask for, which is cheaper than qualifying it on the card. |
| `start here/the backend` | | ● | | |

### Table 1b. Step 1, "Context, model, mechanisms" (10 units, 7,683 words)

| Where | Topic | Status | Effort | Remarks and proposed fix |
|---|---|:--:|:--:|---|
| `context, model, mechanisms/tokens` | | ● | | |
| `context, model, mechanisms/your prompt` | | ● | | |
| `context, model, mechanisms/tools` | | ● | | |
| `context, model, mechanisms/context` | What the word means | ◐ | ●○○ | **3.** `context.lead.1` describes the window without naming it, and **no unit defines the term any more**. `prompt.lead.1` carried the definition and was rewritten to open on the prompt instead, correctly, because a definition of the window is the wrong thing to open a page about the prompt with. What is left is a word the course then uses as an ordinary one from `prompt.instruction.3` ("those tokens stay in the context") and `tools.list-itself-window.4` ("four or five tools is the most one context holds well") onward, in a step titled after it. **Documented as deliberate** in the step's notes, which also name this unit as the one that would own a definition. Fix: one clause in `context.lead.1`, naming the block of text it already describes. |
| `context, model, mechanisms/the session` | | ● | | |
| `context, model, mechanisms/the harness` | | ● | | |
| `context, model, mechanisms/the model` | The five-hour session limit, and where to open it | ● | | **4.** `usage-readout`, `SessionWindows`: **Claude-only whole**, four paragraphs and both figures, with no Copilot sibling anywhere in it and the absence documented as deliberate. It is **no longer the only one-sided block in the course**: `recap.what-costs-do.9` is a second, on the same reasoning, 31 words against this section's 250. Carry both into the next change rather than fixing them. This one is what makes `model` split 968 words for a Claude Code reader against 770 for a Copilot one, by far the widest gap in the course, where every other block that differs is a filename or a command. |
| `context, model, mechanisms/truth` | | ● | | |
| `context, model, mechanisms/workshop` | | ● | | |
| `context, model, mechanisms/recap` | | ● | | |
| `start here/how this kata works`, `context, model, mechanisms` | Which product's files and commands | ● | | **5.** Numbers only, and re-measured: **26** elements in step 1 carry `data-assistant`, down two on the 28 the last pass counted. The two that went are `tools.read-your-window.1.claude` and `.copilot`, and they did not go: the task they described moved to `context`, where the split lives in `ReadYourWindow`'s own `MOVES` record instead, which is the wrapper shape a figure has to use because a locale key cannot carry the attribute. **Eight of the 26 are one-sided** rather than a paired filename or command: the seven-element section in `model` and the one bullet in `recap`. Step 0 carries none: `welcome` explains the setting and varies nothing. |

### Table 1c. Step 2, "Agentic engineering" (10 units, 8,004 words)

| Where | Topic | Status | Effort | Remarks and proposed fix |
|---|---|:--:|:--:|---|
| `agentic engineering/project evolution` | | ● | | |
| `agentic engineering/project setup` | | ● | | |
| `agentic engineering/engineering` | Quality gates behind a hook | ● | | **6.** Two paragraphs, linking back to `setup`, and **it is now the owner rather than the light half of a pair**: the unit that carried the argument was cut and this is what the course has left on the subject. `quality-gates.1` now closes on the proxy trap as well, so the metrics half of that argument is on the page four units before the capstone grades it. |
| `agentic engineering/steering` | | ● | | |
| `agentic engineering/solving repeating patterns` | | ● | | |
| `agentic engineering/workflows` | Workflows | ● | | **7.** Written and now drawn: naive, plan-based, spec-driven, audit-driven, cheapest to most deliberate, closing on the four not being exclusive. Points at `step1/prompt` for plan mode and `step1/harness` for reflection rather than re-teaching either. **Seven inline figures**, four of them one `FlowDiagram` set where teal marks what that workflow adds, plus `AuditExample`, `WorkflowWeights` and `WorkflowTimeline`. Only `tools` carries more. Nothing here is graded, and it carries **the first of the step's two quizzes**: three situations rather than definitions, one per workflow that has something to get wrong, with spec-driven deliberately unasked because it is the baseline the other three are measured against. |
| `agentic engineering/enablement` | Running the whole stack on your own machine | ● | | **8.** Names no project, no command and no example case on purpose, so the section is an aim rather than a setup a student follows. The only place the kata's own two-terminal run appears is step 0's `backend`, which is far enough away that the two do not collide. |
| `agentic engineering/parallel workflows` | The orchestrator | ● | | **9.** `parallel.orchestrator`: one paragraph, pointing back at `step1/harness`'s coordinator for the mechanism rather than re-deriving it. `agents-at-once.orchestrated.note` ("four runs, one thing to read") is the only place its payoff is stated, so it is a figure label carrying an argument. |
| `agentic engineering/spending tokens` | | ● | | |
| `agentic engineering/workshop` | | ● | | |
| `kata/step2/java/.../domain/CLAUDE.md` | | ● | | |
| `kata/step2/java/.../Step2Application.java` | | ● | | |
| `front/src/steps/step2/FileTree.tsx`, `front/src/steps/step2/index.tsx` | | ● | | |
| `front/src/steps/step2/CLAUDE.md` | | ● | | |
| — | Boundaries cut token cost | ○ | ●○○ | **10.** The architecture argument is on the page and the money argument is not. This is the only place the course connected layout to the bill and it is now absent. Fix: one sentence beside the `tokens` link. |
| | The new-step file list | ○ | | **11.** Went with `quality`, and it was an example rather than an argument, so little is lost: the scaffolding-skill idea it illustrated survives in `patterns.scripts.1`. Recorded so nobody looks for it. |
| | Over-commenting and under-logging | ○ | ●○○ | **12.** Went with `quality` and has **no second home anywhere in the course**: neither term appears in another unit, in either language. It was two sentences and it is hygiene an agent gets wrong by default. Fix: put it back beside `setup`'s `CLAUDE.md` section, which is where the file those rules belong in is argued. |
| | Everyday git hygiene | ○ | ●●● | **13.** Worktrees taught twice; branch per task, small commits, never letting an agent commit blind, taught nowhere. |
| | Task sizing, and which folder you open the agent in | ○ | ●●● | **14.** Went with the deleted `scoping` unit and has not landed anywhere. |
| | Quizzes | ◐ | ●●○ | **15.** Step 2's `quiz.ts` holds two quizzes now, three questions each: `workflows` on which workflow a situation wants, and `spending tokens` on what each expensive move costs. **Two in ten units**, and they sit at units 18 and 21 of the course, so the second half of step 2 asks the student something twice and the first half not at all. `steering` and `patterns` are the two the cadence summary still names. `parallel` is a third and a new one: its `CLAUDE.md` entry used to rest its own absence on `workflows` deciding that the choice is the lesson, and `workflows` has since reversed exactly that half, so what is recorded there now is an open row rather than a reason. Step 3 has none either, but that step's whole absence of student work is one row in Table 1d rather than this one. |

### Table 1d. Step 3, "Soft skills" (3 units, 2,113 words)

| Where | Topic | Status | Effort | Remarks and proposed fix |
|---|---|:--:|:--:|---|
| `soft skills/change management` | Where the bottleneck moved, and onto whom | ● | | **16.** Rewritten, and the answer changed with it: `change.you-test-engineer` puts the cost on **the student** rather than on somebody else, and `business-moves-closer` and `process-was-bottleneck` stand three more people beside them, whoever wrote the requirement, whoever approves the release, and the manager who worked out a multiple that did not arrive. `PipelineShift` is the measurement under that third one, the verifying three parallel lanes need against the verifying they get. What it answers with is still `engineering`'s gates, linked rather than re-derived. |
| | The environment, not the project | ● ⟳ | | **17.** `change.environment-beats-project.1`: `setup` owns it and this re-states it in a paragraph, but it adds something that unit does not have: count the times this week you told an agent something you had told it before. Fix: leave it. |
| | How the change gets started | ○ | ●●○ | **18.** `change.way-working-decision` arrived in this range and **sits next to this hole without filling it**: it tells the student to question the deck, the code review and the sprint, and closes on being the one who asks being worth more than what they ship this week, which is a reason to start rather than a way to. The rest is unchanged. The rewrite before it dropped `change.start-work-hurts`, and **nothing anywhere else in the course carries what was in it**: pick the job nobody wants, wide and mechanical and measurable, skip the demo where an agent writes a small feature from nothing, and go looking for the colleague who watched it work on code they own. No unit in any step now argues how this way of working is introduced to a team, which is the question the module's own title asks. The nearest thing left is `patterns` saying a convention belongs in the repository rather than in a head, which is about the artefact rather than about the adoption. Fix: a section back into `change`, on the half its lead used to open with. |
| `soft skills/expectation management` | | ● | | |
| `soft skills/impostor syndrome` | | ● | | |
| — | IP, data governance, what may leave the building | ○ | ●●● | **19.** **Re-filed from Table 1c in the previous pass**, since `change` is the home it names. For professionals in company training this is the question asked before lesson one, and by someone other than the student. `context, model, mechanisms/the model`'s billing close and `agentic engineering/project setup`'s personal-file warning sit next to the hole without filling it. The rewrite did not change this either way, and neither did the section added after it: `change` now argues what the job turns into and who else has to move with it, over six sections, and not one of them asks what may leave the building. |
| | Anything the student does | ○ | ●●○ | **20.** **The step has a drawing and a deck now and still nothing the student does**, across three units and 2,113 words: `PipelineShift` in `change`, thirteen slides, and no quiz and no exercise anywhere. Documented as deliberate, on the grounds that every unit here is a conversation rather than a command. That reasoning holds for an exercise and not for a quiz: guided mode is the default, these are the units most likely to be read in a room, and "what do you promise when you show a skeleton" is exactly a show-of-hands question. The figure changes what a tutor has in front of them, since `change` is now the one unit here that renders something in guided mode, and it changes nothing about what a student is asked. Fix: one three-question quiz, on `expectations`, which is the unit with the most checkable claims in it. |
| | An ending for the course | ○ | ●○○ | **21.** `impostor` closes on its own last section. The kata now runs four steps and 25 units and stops without saying so. Step 1 has since grown the thing this row asks for, a closing unit that names what comes next, so there is a shape to copy. Fix: two sentences at the end of `impostor`; the row that used to ask this of step 2's `workshop` moved here with the step. |

### Table 1e. Across the course

Three gaps no single step owns. They sat in Table 1c while step 2 was the last step in the course
and step 2 was therefore the last place a fix could land. That stopped being true when step 3
arrived, and each of these now spans at least two modules, so a fix has to be placed rather than
appended.

| Where | Topic | Status | Effort | Remarks and proposed fix |
|---|---|:--:|:--:|---|
| — | Reviewing a diff you did not write | ◐ | ●●○ | **22.** `agentic engineering/spending tokens`, `agentic engineering/steering`, `agentic engineering/enablement` and `agentic engineering/parallel workflows` all name the student's reading as the bottleneck of the whole workflow, and none of the four teaches it. The first of those now names it twice, since its closing section is a paragraph on reading work you did not watch being made, and it hands that reading to the capstone rather than saying how to do it. `enablement.where-day-goes.1` states it hardest ("most of them go on driving the system end to end and reading whether it did what you wanted", "it is most of your week"), and `parallel.many-agents-once.3` adds the half nobody else says, that the tenth diff of the afternoon gets a worse read than the first. **Four units in step 2, and `soft skills/expectation management` makes it five.** What changed is that a sixth unit now answers them: `change.you-test-engineer` says reading every line stops scaling in the second hour and tells the student what to do instead, write down the cases the agent would not think of before the implementation exists, with `PipelineShift` drawing the gap underneath. **One move and one measurement, against five units of warning**, and the module that could teach this is now the module that has started to. What is still missing is the reading itself: nothing anywhere says how to read a diff you did not write, only what to put around it. `change.way-working-decision`'s middle item now puts the question in as many words ("ask what it is catching when an agent writes the diff and another agent reviews it. Not whether somebody reads, but what they are reading for"), which makes six units that name the problem and none that teaches the skill. Fix: a second section in `change`, or `expectations` taking the half about reading under time. |
| | When *not* to use an agent, and what agents are bad at | ○ | ●●● | **23.** Every unit in every module assumes the agent is the right tool. **Documented as deliberately absent** rather than overlooked: the notes rule it out of `steering`'s new section by name, on the grounds that half-telling it there is worse than leaving it out. That makes it a decision to revisit rather than a gap to plug, and the decision still has nowhere to land. `soft skills` is the module it could land in without half-telling it, since that module argues about the work rather than inside it. |
| every module except `agentic engineering` | The same habits on a second assistant | ◐ ⚠ | ●●● | **24.** **Step 2 is still the only module with no `data-assistant` anywhere in it**, across ten units and 8,004 words, and it is the module the swap fails hardest in: `SetupFlags` sends every reader into a `.claude` skill and two `CLAUDE.md` files, and the exercise works on both products while showing Claude Code's layout. This range made it worse by 730 words: `spending tokens` teaches ultracode, a design tool and a three-tier relay, and names Claude Design and three model families on the page, none of which a Copilot reader has. The page still **does not say so**: `welcome` tells every reader the course "will modify the content of this course to include the relevant commands so you can easily follow along", a promise step 2 does not keep, so this is a claim the course falsifies as well as work outstanding. Step 1 moved in both directions in the range before this one: `workshop`'s launcher is now a proper pair, which is new parity, and `recap` closes on a **Claude-only bullet with no Copilot sibling**, which is a second one-sided block beside `model`'s window section (Table 1b). So the two readers still do not see the same step 1, and one of the two reasons is newer than the last pass. |

---

## 2. Cadence and sequence, per unit

**Cadence** judges length and interaction density against the unit before it. **Sequence** judges
whether the unit opens from what its predecessor left and hands off to its successor. A row with
both marks ● has an empty remarks cell.

| # | Unit | Words | Fig | Interactive | Follows from | Cad | Seq | Eff | Remarks and proposed fix |
|--:|---|--:|--:|---|---|:--:|:--:|:--:|---|
| 1 | step0 / `welcome` | 497 | 3 | 2 code boxes + 1q quiz | — | ● | ◐ | ●○○ | **25.** **It no longer closes on a figure**: `How workshops work` and five house rules arrived from step 1's `workshop` and doubled the unit, 265 words to 497, two of those rules having since lost their second sentence to the deck's one-line version of them. What the fix asked for is still missing, though: the last of those rules points two units ahead at step 1 and **nothing on the page points at `backend`**, which is the next thing the student clicks. Fix unchanged: one closing sentence. |
| 2 | step0 / `backend` | 175 | 1 | 1 code box | `welcome` | ◐ | ● | ●●○ | **26.** Still the thinnest unit in the course, and one code box is all there is to do. |
| 3 | step1 / `tokens` | 701 | 5 | 3 interactive figures + PickTheNext | `backend` | ● | ● | | |
| 4 | step1 / `prompt` | 651 | 3 | quiz (3q) | `tokens` | ● | ◐ | ●○○ | **27.** Opens with no reference to `tokens` and **ends on a bare figure with no closing sentence**. Fix: a closing line into `tools`. |
| 5 | step1 / `tools` | 1022 | 8 | 4 components | `prompt` | ◐ | ● | ●●○ | **28.** **It stopped being the heaviest unit in the course**, and by the cheapest possible route: `ReadYourWindow` and the two paragraphs describing `/context` went to `context`, which is 162 words and one figure out of here and is what puts that unit ahead of this one. What is left is 1,022 words, eight figures and **four things to do** under one rule (one task card, a one-row flag board and the two graded exercises) against four prose sections above it. The fix stands and has lost its strongest argument: splitting the MCP half from the tool-loop half is still two ideas coming apart, but the unit is now the fourth longest rather than the first, so it is a judgement about shape rather than a page that has outgrown itself. |
| 6 | step1 / `context` | 1167 | 4 | ReadYourWindow + quiz (3q) | `tools` | ● | ● | | **29.** **The heaviest unit in the course now**, and the only one carrying a task and a registry quiz: `ReadYourWindow` arrived from `tools` with `/context` behind it, and the two share the one "Test yourself" the prose writes, on `showsExerciseHeading` in `content.ts`. `DEFAULT_MODE` is `guided` and every prose block plus two of four figures sits inside `data-audience="self"`, so a default-mode student now gets a diagram, a card and a three-question quiz where the last pass measured a diagram and a quiz. **Accepted as-is** and better than it was: in class this unit is walked through at the board, which is the reason `front/CLAUDE.md` and the step's own notes record for the whole-unit wrapper. |
| 7 | step1 / `session` | 821 | 2 | SurviveTheClear | `context` | ● | ◐ | ●○○ | **30.** Opens on a **sentence fragment with no subject** ("Everything earlier in this conversation."), which is good voice but no bridge. No pointer to `harness`. |
| 8 | step1 / `harness` | 976 | 5 | CutItUp + PatternMatch | `session` | ● | ◐ | ●○○ | **31.** Opens cold, closes with no pointer to `model` even though `model` points back here. |
| 9 | step1 / `model` | 1129 | 5 | PickTheTier | `harness` | ● | ● | ●●● | **32.** Grew by a section of four paragraphs and two figures under one heading, which is longer than the course usually runs and is documented as deliberate. What that leaves is the one unit in the course that reads as **two different lengths**: 968 words and five figures for a Claude Code reader, 770 and three for a Copilot one (Table 1b). Neither reader is told the other's version exists. |
| 10 | step1 / `truth` | 657 | 2 | none | `model` | ◐ | ◐ | ●●○ | **33.** **No longer the only unit in step 1 with nothing the student does**, `recap` having arrived behind it, but its own half of that is unchanged: no quiz, no exercise, and both figures static. Against it, the two drawings take genuinely different cuts of one argument and the prose reads each of them, which is the shape the step's best units have. Sequence half closed: it **now ends on a line into `workshop`** ("The workshop is that question three times over"), and `model` still closes on its task card without pointing here, so it still opens cold on its own claim. Fix: a three-question quiz. The material sorts into questions more cleanly than anything else in the step, since trained-against-grounded-against-proved is already three answers. |
| 11 | step1 / `workshop` | 202 | 2 | OneWindow + FlagBoard (3 flags) | `truth` | ● | ● | | **34.** **Rewritten to the leanest page in the step**, 1,047 words to 202: the per-flag walkthroughs went onto the board's own hint keys, the five house rules to step 0's `welcome`, and the close to `recap`. Both rows this cell used to carry are gone with it. It now uses the step's exercise shape, an `<hr>` and the shared `ui:quiz.title`, and `OneWindow` above the board is what makes it a step 1 capstone rather than a flag hunt, since the flags on their own ask nothing about the window. Sequence is marked at both ends, `truth` handing in and `recap` looking back. Fix: none here; the card it gained contradicts a house rule, which is Table 1a. |
| 12 | step1 / `recap` | 357 | 0 | none | `workshop` | ◐ | ● | | **35.** New, and **the best-sequenced unit in the course**: it opens by looking back over the whole step and closes on the only sentence in the kata that says a step has ended and names the next one. Cadence is what it costs: 357 words, no figure, nothing to do, and **nothing at all on the page in guided mode** (Table 1b). Against that it is one list of eight lines, each a cost and the move that answers it, and it re-argues nothing, which is what keeps a recap from being a second course. |
| 13 | step2 / `evolution` | 831 | 3 | ungraded exercise | step1 `recap` | ● | ● | | |
| 14 | step2 / `setup` | 753 | 3 | SetupFlags (3 flags) | `evolution` | ● | ◐ | ●○○ | **36.** **It no longer closes with a forward pointer.** `setup.hooks.3` ended on "the unit on repeating patterns comes back to when that is worth doing" and the clause was cut, correctly, because `patterns` stopped mentioning hooks. What it leaves is the last prose sentence in the unit ending on hooks alone, and the `setup` → `patterns` seam unmarked from both sides. Fix: one clause, on whatever `patterns` argues now. |
| 15 | step2 / `engineering` | 555 | 1+card | WhereWouldItGo | `setup` | ● | ◐ | ●○○ | **37.** The bare `<h2>Test yourself</h2>` over the card is now **deliberate and documented**: the comment in the HTML says the card's own description carries the setting, which is the same shape step 1's four task units use (rule, rule line, figure, nothing in between). So what is left is one thing, not two: it opens cold and closes on the card with no line into `steering`. Fix: one closing sentence. |
| 16 | step2 / `steering` | 1098 | 3 | none | `engineering` | ◐ | ◐ | ●●○ | **38.** **Drawn, and the fix this row carried for three passes is spent**: `TwoWindows` and `LoopInWindow` are one window in two states under the two sections that argue them, and `WorktreeEach` sits between the isolation paragraph and the cost paragraph so the two-bills argument keeps the last word. That was the best figure candidate left in the kata and it is gone. What is left is the other half, unchanged: 1,098 words, the second longest unit in the course, with **nothing the student does**. Sequence: it opens on its first `<h2>` with no lead, which is documented and deliberate. Fix: a quiz, which is the same three questions the cadence summary asks for. |
| 17 | step2 / `patterns` | 423 | 1 | none | `steering` | ◐ | ◐ | ●●○ | **39.** **Drawn for the first time** and second thinnest in the step. Eight paragraphs became six across two headings (`Skill iteration`, `Scripts`), two `<pre>` blocks arrived that are one skill twice differing by exactly one rule, and `ScriptRuns` closes the unit. Still **nothing to do**, and its predecessor's growth leaves it at under two fifths of the unit before it. Both seams are bare: it opens cold, `setup`'s pointer into it was cut with the hooks clause, and it names no other unit at all. Fix: a three-question quiz, and one clause naming `setup` where the skill it iterates was first written. |
| 18 | step2 / `workflows` | 949 | 7 | AuditExample + quiz (3q) | `patterns` | ● | ◐ | ●○○ | **40.** **The wall is now broken here, properly.** Seven figures, the densest unit in step 2 and second in the course to `tools`: four `FlowDiagram`s that close a section each, `AuditExample` (the switch turns the rendered table into the markdown behind it, the only interactive element in the step outside the two boards), `WorkflowWeights` and `WorkflowTimeline` closing. Longest of the six prose units, `enablement` included. **The step's first quiz landed here**, three situations rather than definitions, so the unit now asks the student something instead of only showing them things, and the step's `CLAUDE.md` records the reversal it took to get there. What is left is sequence: it opens on a lead, but `patterns` names no unit at all and this one closes on `WorkflowTimeline` with no line into `enablement`, so both seams are bare. Fix: one closing clause into `enablement`, placed before the figure so the drawing still closes the unit. |
| 19 | step2 / `enablement` | 367 | 2 | none | `workflows` | ◐ | ◐ | ●○○ | **41.** **The thinnest unit in the course outside step 0**, and it lands straight after the densest one: 949 words and seven figures, then 367 and two. Three sections of one or two paragraphs, drawn but with nothing to do. The drop is partly by design (no lead, every section opening cold on its own claim, both documented), and two figures keep it from reading as a return to the wall, so this is a spike in the other direction rather than a defect. Sequence is the real cost: it opens cold and closes on prose with no line into `goals`, which leaves `workflows` → `enablement` → `goals` three units of unmarked seams. Against that, it ties `workflows` for the **most cross-linked unit in the course**, pointing at `step1/tools`, `engineering` and `steering` from inside its own paragraphs. Fix: one closing sentence into `goals`. |
| 20 | step2 / `parallel` | 518 | 1 | none | `enablement` | ● | ◐ | | **42.** New, in the slot the cut `quality` unit left and not a rewrite of it. Four sections running most control to least and then landing in the middle, one drawing closing the unit, nothing to do. Cadence is fine: 518 words and a figure after 367 and two is a rise rather than a spike. Sequence: it opens on its first `<h2>` with no lead, which is documented, and `enablement` still does not hand into it. Against that it carries **four links to three other units**, more than any unit in step 2, and one of them is to `goals` in its last paragraph, so the seam into the capstone's run-up is at least threaded. Fix: nothing here; the closing sentence belongs to `enablement`. |
| 21 | step2 / `goals` | 1413 | 4 | quiz (3q) | `parallel` | ◐ | ● | ●●● | **43.** **Rewritten from `Goal-oriented` into `Spending tokens`, and the cadence complaint this row carried is spent from the wrong direction.** It was 683 flat words and is now the **longest unit in the course**, ahead of `context` at 1,167: ten headings, four figures (`WindowSpend`, `GoalGate`, `ReadEachTime`, `ModelRelay`) and the step's second quiz. The old argument is its first five sections and three new ones sit under it, ultracode, the frontier model and design tools, which is what the unit id no longer says. What that buys is real, the step's last prose unit is drawn and asks something, and what it costs is the profile: 518 words and one figure in `parallel`, then 1,413 and four here, the sharpest rise in the course. Sequence is untouched and still closed at both ends, `workshop`'s lead naming this unit and `goals.read-came-back.1` naming `workshop` back. Fix: a decision rather than an edit, since the four moves are one argument about spending and the notes record the single-unit shape as deliberate. Splitting the goal half from the other three is the only cheaper shape, and it costs the thing that holds them together. |
| 22 | step2 / `workshop` | 1097 | 0 | Workshop (5 flags) | `goals` | ● | ◐ | ●○○ | **44.** It has stopped being the heaviest page at the end of step 2: `goals` passed it in this range, 1,413 words against 1,097. The cadence complaint stays **spent**, and by more than it was: the run-up is 3,247 drawn words across `workflows`, `enablement`, `parallel` and `goals`, with nothing flat left in front of the capstone. It is 2 to 4 hours of real work and the strongest thing in the kata. The close is where it costs: a one-sentence self-only aside, no wrap-up of the step, and now **a whole step after it that it does not mention**. Fix: one closing sentence into `change`. Step 1's `recap` is what this looks like done. |
| 23 | step3 / `change` | 953 | 1 | none | step2 `workshop` | ● | ◐ | ●○○ | **45.** **A sixth section arrived**, `The way of working is a decision`, which is 218 words and the step's only list: a lead, three `<li>`s on `recap`'s claim-then-move shape, and a closer. The cadence complaint stays spent and the drop off `workshop` is now barely one (1,090 into 888, both halves of its assistant pair counted separately from the 953 in the file). It carries **six links out**, all into step 2 and no unit twice, one per section, which ties it hard to what the student just did; `expectations` has since passed it. Sequence is untouched and is all that is left: `workshop` does not hand into it and it opens cold. |
| 24 | step3 / `expectations` | 730 | 0 | none | `change` | ● | ◐ | ●○○ | **46.** **Three sections to five, 377 words to 730**, the two new ones being what management believes the tool bought them and why the work after the demo is real. Still matches its predecessor in shape and now nearly in length. **Seven links to seven different units, the most in the course**, and every one of them is load-bearing rather than decorative: it is the unit that reads back what steps 1 and 2 already argued, and its one sideways link into `change` is the only intra-step link in the kata. Opens cold, closes cold, and it is still undrawn with nothing to do, which is now 730 words of that rather than 377. |
| 25 | step3 / `impostor` | 430 | 0 | none | `expectations` | ● | ◐ | ●○○ | **47.** Closes the course. One link. Its last paragraph is the right note to end on, and it ends the unit rather than the kata (Table 1d). |

### Cadence, in summary

- **The quizzes were all inside the first six of twenty-five units, and two have now landed late**:
  step0 `welcome`, step1 `prompt`, step1 `context`, then step2 `workflows` at unit 18 and step2
  `goals` at unit 21. Between unit 6 and unit 18 the course still never *asks* the student anything,
  and after unit 21 it never asks again.
  It hands them boards and cards instead, at units 5, 6, 7, 8, 9, 11, 13, 14, 15 and 22, unit 6
  having gained `ReadYourWindow` from unit 5, and after unit 22 it hands them nothing at all. A
  board is a task, not a question, and in a guided room a tutor cannot get a show of hands from one. **One of the four steps still has no `quiz.ts`**, and it is
  the one that closes the course. Fix: three questions each on `steering` and `patterns` in step 2
  and on `expectations` in step 3, browser-graded, on machinery that already exists.
- **The wall is at the end of the course, and step 2 has stopped contributing to it.** `steering`
  was drawn in the range before this one and `goals` in this one, so **every prose unit in step 2 is
  now illustrated**, and the step's one figureless unit is the capstone, which is a five-flag board.
  Step 3 is where the wall closes the course and it got worse rather than better:
  what ends the kata is **`expectations` and `impostor`, two consecutive units, 1,160 words, no
  figure, no quiz and no exercise between them**, `expectations` having nearly doubled without
  gaining anything to look at. The step as a whole still asks the student for nothing across its
  2,113 words; what it has is one drawing and a thirteen-slide deck. Step 1's `recap` is undrawn and
  taskless too, but it stands between a board and a step boundary rather than beside another blank
  page. Counted across everything, **nine of twenty-five units carry nothing the student does**
  (`truth`, `recap`, `steering`, `patterns`, `enablement`, `parallel`, and all three of
  step 3), against sixteen that do, and a drawing is not something the student does.
- **Interaction density is inverted against difficulty, and step 1 pulled further ahead.** It
  carries **twelve interactive components**, three interactive figures and two quizzes across 7,683
  words, and this range added none: one moved a unit down, from `tools` to `context`, which is the
  first time the step's own distribution changed rather than its total. Step 2 carries two graded boards, two ungraded tasks, one interactive figure and two quizzes across
  8,004 words, and it is the harder step. Step 3 carries one static drawing across 2,113.
- **The exercise heading is one key, and step 1 is fully inside it.** Eleven units now carry
  `<h2 data-i18n="ui:quiz.title">Test yourself</h2>`, the shared `ui` key, `context` having joined
  with the task it took off `tools`, so the wording over a task and over a quiz cannot drift. It is
  also the first unit to carry the heading *and* a registry quiz, which is what
  `showsExerciseHeading` was written for: the page prints one heading and `QuizPanel` arrives under
  it rather than printing a second a few inches down.
  Two units with something to do sit outside the family: step0 `welcome`, whose code boxes are the
  demonstration of how exercises work and so belong in the prose, and step 2's `workshop`, which
  heads its own board sections. Neither is a defect now.

### Sequence, in summary

- **Transitions are still the course's weakest structural habit, and step 1 is where that stopped
  being uniformly true.** Of twenty-five units, five open with an explicit back-reference (`model`,
  both `workshop`s, `setup` by implication, and now `recap`) and **five** close with a forward
  pointer (`backend`, `evolution`, `truth`, `recap` and now `goals`). Everything else opens cold and
  closes on a bare figure, card, board or paragraph. The house style is to open cold on the claim,
  which is right at the *paragraph* level and has been applied at the *unit* level, where it costs
  the student the thread. Three units open on their first `<h2>` with no lead at all (`steering`,
  `enablement`, `parallel`), which is documented and deliberate and makes the seam before them
  harder to mark, not easier.
- **The seam that mattered most is marked and the other one is not**: `goals` → `workshop`, the unit
  that argues the rule into the unit that grades it, is now threaded from the side that leaves, while
  `engineering` → `steering` is still a bare heading into a cold open. `setup` → `patterns` is the
  third, so step 2 now has two marked seams, `evolution` → `setup` and `goals` → `workshop`. **Step 1
  has no unmarked seam at its own end**: `truth` → `workshop` →
  `recap` → step 2 is threaded the whole way, which is the first time a step boundary in this course
  is marked from the side that leaves. The step 2 → step 3 boundary is not, so what used to be an
  eight-unit run to the end is broken in the middle, leaving two stretches of four:
  `workflows` → `enablement` → `parallel` → `goals`, and `workshop` → `change` →
  `expectations` → `impostor`.
- **Linking is the cheap way out of it, and it is spreading.** Step 3's `expectations` now carries
  **seven links to seven units, the most in the course**, and `change` six, one per section and no
  unit twice, with `parallel` behind them on four. Step 1's `recap` is a
  list of nine bullets carrying eight of them, more than any unit before it, none of them costing a
  transition sentence. The habit is no longer step 2's alone: step 3's three units carry **fifteen**
  links between them, up from ten in one range, and **step 1 has stopped being at zero**, `truth` linking to
  `tools` twice, to `context` and now to `workshop`, and `workshop` back to `truth` and to step 0's
  house rules, where before the step's only `href` was `context`'s own `#entropy` anchor. Fix,
  unchanged: where a unit names another, link it.
- **Step 1's internal order is settled and load-bearing, and one of the things holding it has been
  removed.** `prompt` defined *context* and no longer does, so the constraint that `context` must
  not redefine it is gone and nothing defines it anywhere (Table 1b);
  `PromptInContext` deliberately has no frame; `ToolsInContext` is the step's
  first teal frame, which is what the "draws no context frame" notes point at; `ContextDiagram` is
  drawn populated because three figures built up to it; and `deck.tsx` is authored in unit order.
  What no longer holds it in place is `workshop`'s recital of the four layers, which went with the
  capstone rewrite, so reordering is now a registry change plus those five sites rather than six.

---

## 3. Delivery gaps

| Gap | Status | Effort | Remarks and proposed fix |
|---|:--:|:--:|---|
| Three drawings want a slide, and two more cannot have one | ◐ | ●●○ | **48.** **The coverage half of this row is closed.** All four steps have a `deck.tsx`, the deck is **109 slides** across 25 units, every unit has a divider carrying its own claims as `points`, and every module has one dark title card. What is left is the drawings with no slide, in three cases, and only one of the three is work. `AuditExample` in `workflows` and `McpOvals` in `tools` are **documented as deliberate** in the decks that leave them out, and `steering`'s `LoopInWindow` and `WorktreeEach` joined them: `TwoWindows` took the slide the previous pass asked for, and the step's deck now records a reason for leaving the other two off rather than an oversight. `goals` is the new half of this row: it gained four drawings in this range and **put one of them on the board**, so `GoalGate`, `ReadEachTime` and `ModelRelay` are three fresh figures with no slide, all of them the reusable kind. And **`SessionWindows` and `usage-readout` cannot go on a board at all**: they are `model`'s Claude-only pair and the deck has no assistant filter, so a tutor teaching Copilot would get figures that contradict the room. Fix: three slides under `deck-step2-goals`; the assistant half is a decision rather than an edit. |
| No instructor scaffolding | ○ | ●●● | **49.** No `INSTRUCTOR.md`, no per-unit timings, no demo scripts, no checkpoints, no "if the room is stuck here, do this". Guided is the **default** mode and it drops every run of prose from every unit, so a tutor is carrying the page. What changed in this range is the one half of that a deck can carry: every unit's divider now states the unit's two or three claims, at the tutor's own asking, so the board says what a page is about even where it says nothing about how long it takes or what to do when the room stalls. None of the five things this row names exists. |
| Dutch completeness | ● | | |
| Em-dash rule | ● | | |
| Locale file hygiene | ◐ | ●○○ | **50.** All eight locale files took deck keys in the range this pass covers and **all eight took them the same way**, which is the thing worth recording: each step's statement keys sit in unit order, then one `*.divider.*` block also in unit order, in `en` and in `nl` alike, so the newest and largest addition to these files is the most consistent thing in them. Step 2's two files took roughly forty keys each for `spending tokens` on top of that, figures, quiz and two slides, and every one of them landed in the shape the file already had. **None of step 1's three standing faults was touched**: `mcp-ovals.description` is still wedged between two `mcp-parts.*` keys (now lines 293 to 301 of `nl.json`), orphaning `mcp-parts.tool.*` below an unrelated key; two block separators are still missing (`spot` into `budget.title`, `budget` into `match.title`); and two values in `en.json` still use a typographic apostrophe where every other value uses a straight one (`quiz.quality-degrades.entropy`, `quiz.plan-beats-one-shot.cache`). In step 2's `nl.json` the one stray blank line inside a prose block is still there, splitting `enablement.t-shaped.1` from the heading under it, and `enablement` still runs into `parallel` with no separator. Step 3's two files still **disagree with each other on their own first separator**, `en.json` putting a blank line under `step.title` and `nl.json` not. Cosmetic, but the file is the one place key order encodes structure. |
