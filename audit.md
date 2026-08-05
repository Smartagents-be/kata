# Course audit, fresh pass

**Measured:** 5 August 2026, against `4256169` ("chore(step2): the workflows quiz, the Table 1c
rewrite, and the native flag help fix"), which is the whole working tree apart from this file. Every
number here was taken off the files rather than carried forward.

Six commits stand between this pass and the last one, and two units carry everything this document
counts. **Step 3's `change` was rewritten and drawn**, 445 words to 735 and the step's first figure
with it, so a word count rising there is a different unit rather than more of the old one: what it
argued before is gone as surely as what it argues now is new. And step 1's `tools` took a fourth
block under one of its sections, 44 words, which makes the heaviest unit in the course heavier. The
rest of the range is chrome and one figure rebuilt in place, `NextToken`. One thing about the anchor
bears on the rest: the commit it names carried a whole tree of work that the previous pass had
already measured uncommitted, and closed a row of its own on the way past, so most of that commit is
already recorded above rather than new here.

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
one, because its newest section is Claude-only whole; `tools` splits 972 against 1,023 and `recap` 357
against 326. Step 3's two units split as well and are the harmless kind: both halves of each pair are
the same length, so 735 and 430 here are **670 and 379 to either reader**, which is what they were
before the pairs existed.

---

## 1. Completeness

### Table 1a. Step 0, "Start here" (2 units, 715 words)

| Where | Topic | Status | Effort | Remarks and proposed fix |
|---|---|:--:|:--:|---|
| `start here/how this kata works` | What a workshop is | ⚠ | ●○○ | **1.** `welcome.how-workshops-work.1` opens "Most steps close on a workshop." **One of the four does.** Step 0 has no board, step 3 has no board, and step 1's board is now the ninth of ten units with `recap` behind it, so only step 2 closes on one. The sentence is there to say what a workshop *is*, and the counting clause is doing no work. Fix: cut it and open on the definition, in both languages. |
| | One flag one session, against the capstone's one window | ⚠ | ●○○ | **2.** `welcome.house-rules.3` is **"One flag, one session"**, "start each one on a fresh session". Three paragraphs after `workshop.lead.2` sends the student to those rules, `workshop.one-window.1` tells them **"Work all three from a single session. Nothing here needs a clear between the flags"**. The card is right for the capstone, since watching one window fill is the whole point of it, so the rule is the half to move. Nothing on either page reconciles them, in either language. Fix: a clause on rule 3 admitting the exception a step may ask for, which is cheaper than qualifying it on the card. |
| `start here/the backend` | | ● | | |

### Table 1b. Step 1, "Context, model, mechanisms" (10 units, 7,760 words)

| Where | Topic | Status | Effort | Remarks and proposed fix |
|---|---|:--:|:--:|---|
| `context, model, mechanisms/tokens` | | ● | | |
| `context, model, mechanisms/your prompt` | | ● | | |
| `context, model, mechanisms/tools` | | ● | | |
| `context, model, mechanisms/context` | | ● | | |
| `context, model, mechanisms/the session` | | ● | | |
| `context, model, mechanisms/the harness` | | ● | | |
| `context, model, mechanisms/the model` | The five-hour session limit, and where to open it | ● | | **3.** `usage-readout`, `SessionWindows`: **Claude-only whole**, four paragraphs and both figures, with no Copilot sibling anywhere in it and the absence documented as deliberate. It is **no longer the only one-sided block in the course**: `recap.what-costs-do.9` is a second, on the same reasoning, 31 words against this section's 250. Carry both into the next change rather than fixing them. This one is what makes `model` split 968 words for a Claude Code reader against 770 for a Copilot one, by far the widest gap in the course, where every other block that differs is a filename or a command. |
| `context, model, mechanisms/truth` | | ● | | |
| `context, model, mechanisms/workshop` | | ● | | |
| `context, model, mechanisms/recap` | | ● | | |
| `start here/how this kata works`, `context, model, mechanisms` | Which product's files and commands | ● | | **4.** Numbers only, and re-measured: **28** elements in step 1 carry `data-assistant`, up three on the pass that recorded 25, `workshop`'s two launcher `<pre>`s and `recap`'s last bullet. **Eight of the 28 are one-sided** rather than a paired filename or command: the seven-element section in `model` and the one bullet in `recap`. Step 0 carries none: `welcome` explains the setting and varies nothing. |

### Table 1c. Step 2, "Agentic engineering" (10 units, 7,274 words)

| Where | Topic | Status | Effort | Remarks and proposed fix |
|---|---|:--:|:--:|---|
| `agentic engineering/project evolution` | | ● | | |
| `agentic engineering/project setup` | | ● | | |
| `agentic engineering/engineering` | Quality gates behind a hook | ● | | **5.** Two paragraphs, linking back to `setup`, and **it is now the owner rather than the light half of a pair**: the unit that carried the argument was cut and this is what the course has left on the subject. `quality-gates.1` now closes on the proxy trap as well, so the metrics half of that argument is on the page four units before the capstone grades it. |
| `agentic engineering/steering` | | ● | | |
| `agentic engineering/solving repeating patterns` | | ● | | |
| `agentic engineering/workflows` | Workflows | ● | | **6.** Written and now drawn: naive, plan-based, spec-driven, audit-driven, cheapest to most deliberate, closing on the four not being exclusive. Points at `step1/prompt` for plan mode and `step1/harness` for reflection rather than re-teaching either. **Seven inline figures**, four of them one `FlowDiagram` set where teal marks what that workflow adds, plus `AuditExample`, `WorkflowWeights` and `WorkflowTimeline`. Only `tools` carries more. Nothing here is graded, and it now carries **the step's only quiz**: three situations rather than definitions, one per workflow that has something to get wrong, with spec-driven deliberately unasked because it is the baseline the other three are measured against. |
| `agentic engineering/enablement` | Running the whole stack on your own machine | ● | | **7.** Names no project, no command and no example case on purpose, so the section is an aim rather than a setup a student follows. The only place the kata's own two-terminal run appears is step 0's `backend`, which is far enough away that the two do not collide. |
| `agentic engineering/parallel workflows` | The orchestrator | ● | | **8.** `parallel.orchestrator`: one paragraph, pointing back at `step1/harness`'s coordinator for the mechanism rather than re-deriving it. `agents-at-once.orchestrated.note` ("four runs, one thing to read") is the only place its payoff is stated, so it is a figure label carrying an argument. |
| `agentic engineering/goal-oriented` | | ● | | |
| `agentic engineering/workshop` | | ● | | |
| `kata/step2/java/.../domain/CLAUDE.md` | | ● | | |
| `kata/step2/java/.../Step2Application.java` | | ● | | |
| `front/src/steps/step2/FileTree.tsx`, `front/src/steps/step2/index.tsx` | | ● | | |
| `front/src/steps/step2/CLAUDE.md` | | ● | | |
| — | Boundaries cut token cost | ○ | ●○○ | **9.** The architecture argument is on the page and the money argument is not. This is the only place the course connected layout to the bill and it is now absent. Fix: one sentence beside the `tokens` link. |
| | The new-step file list | ○ | | **10.** Went with `quality`, and it was an example rather than an argument, so little is lost: the scaffolding-skill idea it illustrated survives in `patterns.scripts.1`. Recorded so nobody looks for it. |
| | Over-commenting and under-logging | ○ | ●○○ | **11.** Went with `quality` and has **no second home anywhere in the course**: neither term appears in another unit, in either language. It was two sentences and it is hygiene an agent gets wrong by default. Fix: put it back beside `setup`'s `CLAUDE.md` section, which is where the file those rules belong in is argued. |
| | Everyday git hygiene | ○ | ●●● | **12.** Worktrees taught twice; branch per task, small commits, never letting an agent commit blind, taught nowhere. |
| | Task sizing, and which folder you open the agent in | ○ | ●●● | **13.** Went with the deleted `scoping` unit and has not landed anywhere. |
| | Quizzes | ◐ | ●●○ | **14.** Step 2 now has a `quiz.ts`, with one quiz in it: three questions under `workflows`, which was the cheapest place left for them. **One in ten units.** `steering` and `patterns` are the two the cadence summary still names. `parallel` is a third and a new one: its `CLAUDE.md` entry used to rest its own absence on `workflows` deciding that the choice is the lesson, and `workflows` has since reversed exactly that half, so what is recorded there now is an open row rather than a reason. Step 3 has none either, but that step's whole absence of student work is one row in Table 1d rather than this one. |

### Table 1d. Step 3, "Soft skills" (3 units, 1,542 words)

| Where | Topic | Status | Effort | Remarks and proposed fix |
|---|---|:--:|:--:|---|
| `soft skills/change management` | Where the bottleneck moved, and onto whom | ● | | **15.** Rewritten, and the answer changed with it: `change.you-test-engineer` puts the cost on **the student** rather than on somebody else, and `business-moves-closer` and `process-was-bottleneck` stand three more people beside them, whoever wrote the requirement, whoever approves the release, and the manager who worked out a multiple that did not arrive. `PipelineShift` is the measurement under that third one, the verifying three parallel lanes need against the verifying they get. What it answers with is still `engineering`'s gates, linked rather than re-derived. |
| | The environment, not the project | ● ⟳ | | **16.** `change.environment-beats-project.1`: `setup` owns it and this re-states it in a paragraph, but it adds something that unit does not have: count the times this week you told an agent something you had told it before. Fix: leave it. |
| | How the change gets started | ○ | ●●○ | **17.** The rewrite dropped `change.start-work-hurts`, and **nothing anywhere else in the course carries what was in it**: pick the job nobody wants, wide and mechanical and measurable, skip the demo where an agent writes a small feature from nothing, and go looking for the colleague who watched it work on code they own. No unit in any step now argues how this way of working is introduced to a team, which is the question the module's own title asks. The nearest thing left is `patterns` saying a convention belongs in the repository rather than in a head, which is about the artefact rather than about the adoption. Fix: a section back into `change`, on the half its lead used to open with. |
| `soft skills/expectation management` | | ● | | |
| `soft skills/impostor syndrome` | | ● | | |
| — | IP, data governance, what may leave the building | ○ | ●●● | **18.** **Re-filed from Table 1c in the previous pass**, since `change` is the home it names. For professionals in company training this is the question asked before lesson one, and by someone other than the student. `context, model, mechanisms/the model`'s billing close and `agentic engineering/project setup`'s personal-file warning sit next to the hole without filling it. The rewrite did not change this either way: `change` now argues what the job turns into and who else has to move with it, over five sections, and not one of them asks what may leave the building. |
| | Anything the student does | ○ | ●●○ | **19.** **The step has a drawing now and still nothing the student does**, across three units and 1,542 words: `PipelineShift` in `change`, and no quiz and no exercise anywhere. Documented as deliberate, on the grounds that every unit here is a conversation rather than a command. That reasoning holds for an exercise and not for a quiz: guided mode is the default, these are the units most likely to be read in a room, and "what do you promise when you show a skeleton" is exactly a show-of-hands question. The figure changes what a tutor has in front of them, since `change` is now the one unit here that renders something in guided mode, and it changes nothing about what a student is asked. Fix: one three-question quiz, on `expectations`, which is the unit with the most checkable claims in it. |
| | An ending for the course | ○ | ●○○ | **20.** `impostor` closes on its own last section. The kata now runs four steps and 25 units and stops without saying so. Step 1 has since grown the thing this row asks for, a closing unit that names what comes next, so there is a shape to copy. Fix: two sentences at the end of `impostor`; the row that used to ask this of step 2's `workshop` moved here with the step. |

### Table 1e. Across the course

Three gaps no single step owns. They sat in Table 1c while step 2 was the last step in the course
and step 2 was therefore the last place a fix could land. That stopped being true when step 3
arrived, and each of these now spans at least two modules, so a fix has to be placed rather than
appended.

| Where | Topic | Status | Effort | Remarks and proposed fix |
|---|---|:--:|:--:|---|
| — | Reviewing a diff you did not write | ◐ | ●●○ | **21.** `agentic engineering/goal-oriented`, `agentic engineering/steering`, `agentic engineering/enablement` and `agentic engineering/parallel workflows` all name the student's reading as the bottleneck of the whole workflow, and none of the four teaches it. `enablement.where-day-goes.1` states it hardest ("most of them go on driving the system end to end and reading whether it did what you wanted", "it is most of your week"), and `parallel.many-agents-once.3` adds the half nobody else says, that the tenth diff of the afternoon gets a worse read than the first. **Four units in step 2, and `soft skills/expectation management` makes it five.** What changed is that a sixth unit now answers them: `change.you-test-engineer` says reading every line stops scaling in the second hour and tells the student what to do instead, write down the cases the agent would not think of before the implementation exists, with `PipelineShift` drawing the gap underneath. **One move and one measurement, against five units of warning**, and the module that could teach this is now the module that has started to. What is still missing is the reading itself: nothing anywhere says how to read a diff you did not write, only what to put around it. Fix: a second section in `change`, or `expectations` taking the half about reading under time. |
| | When *not* to use an agent, and what agents are bad at | ○ | ●●● | **22.** Every unit in every module assumes the agent is the right tool. **Documented as deliberately absent** rather than overlooked: the notes rule it out of `steering`'s new section by name, on the grounds that half-telling it there is worse than leaving it out. That makes it a decision to revisit rather than a gap to plug, and the decision still has nowhere to land. `soft skills` is the module it could land in without half-telling it, since that module argues about the work rather than inside it. |
| every module except `agentic engineering` | The same habits on a second assistant | ◐ ⚠ | ●●● | **23.** **Step 2 is still the only module with no `data-assistant` anywhere in it**, across ten units and 7,274 words, and it is the module the swap fails hardest in: `SetupFlags` sends every reader into a `.claude` skill and two `CLAUDE.md` files, and the exercise works on both products while showing Claude Code's layout. The page still **does not say so**: `welcome` tells every reader the course "will modify the content of this course to include the relevant commands so you can easily follow along", a promise step 2 does not keep, so this is a claim the course falsifies as well as work outstanding. Step 1 moved in both directions in the range before this one: `workshop`'s launcher is now a proper pair, which is new parity, and `recap` closes on a **Claude-only bullet with no Copilot sibling**, which is a second one-sided block beside `model`'s window section (Table 1b). So the two readers still do not see the same step 1, and one of the two reasons is newer than the last pass. |

---

## 2. Cadence and sequence, per unit

**Cadence** judges length and interaction density against the unit before it. **Sequence** judges
whether the unit opens from what its predecessor left and hands off to its successor. A row with
both marks ● has an empty remarks cell.

| # | Unit | Words | Fig | Interactive | Follows from | Cad | Seq | Eff | Remarks and proposed fix |
|--:|---|--:|--:|---|---|:--:|:--:|:--:|---|
| 1 | step0 / `welcome` | 540 | 3 | 2 code boxes + 1q quiz | — | ● | ◐ | ●○○ | **24.** **It no longer closes on a figure**: `How workshops work` and five house rules arrived from step 1's `workshop` and doubled the unit, 265 words to 540. What the fix asked for is still missing, though: the last of those rules points two units ahead at step 1 and **nothing on the page points at `backend`**, which is the next thing the student clicks. Fix unchanged: one closing sentence. |
| 2 | step0 / `backend` | 175 | 1 | 1 code box | `welcome` | ◐ | ● | ●●○ | **25.** Still the thinnest unit in the course, and one code box is all there is to do. |
| 3 | step1 / `tokens` | 728 | 5 | 3 interactive figures + PickTheNext | `backend` | ● | ● | | |
| 4 | step1 / `prompt` | 624 | 3 | quiz (3q) | `tokens` | ● | ◐ | ●○○ | **26.** Opens with no reference to `tokens` and **ends on a bare figure with no closing sentence**. Fix: a closing line into `tools`. |
| 5 | step1 / `tools` | 1184 | 9 | 5 components | `prompt` | ◐ | ● | ●●● | **27.** Still the heaviest unit in the course and heavier again: **1,184 words and nine figures**, with **five things to do** stacked under one rule (two task cards, a one-row flag board and the two graded exercises) against four prose sections above it. The 44 words it gained are a fourth block under `the list is itself window`, the only place in the step that puts a number on how many tools one context holds well and the only place it escalates past turning tools off. It goes to both readers, so nobody's page got shorter. Fix unchanged and now easier to argue for: split the MCP half from the tool-loop half. They are two ideas sharing a page, and the closing section under the rule is five exercises deep, more than any other unit in the course carries in total. |
| 6 | step1 / `context` | 1082 | 3 | quiz (3q) | `tools` | ● | ● | | **28.** `DEFAULT_MODE` is `guided`, and every prose block plus two of three figures sits inside `data-audience="self"`, so a default-mode student gets one diagram and a three-question quiz. **Accepted as-is**: in class this unit is walked through at the board, which is the reason `front/CLAUDE.md` and the step's own notes record for the whole-unit wrapper. No fix; the Table 1b row that flagged the same absence is closed with this one. |
| 7 | step1 / `session` | 821 | 2 | SurviveTheClear | `context` | ● | ◐ | ●○○ | **29.** Opens on a **sentence fragment with no subject** ("Everything earlier in this conversation."), which is good voice but no bridge. No pointer to `harness`. |
| 8 | step1 / `harness` | 976 | 5 | CutItUp + PatternMatch | `session` | ● | ◐ | ●○○ | **30.** Opens cold, closes with no pointer to `model` even though `model` points back here. |
| 9 | step1 / `model` | 1129 | 5 | PickTheTier | `harness` | ● | ● | ●●● | **31.** Grew by a section of four paragraphs and two figures under one heading, which is longer than the course usually runs and is documented as deliberate. What that leaves is the one unit in the course that reads as **two different lengths**: 968 words and five figures for a Claude Code reader, 770 and three for a Copilot one (Table 1b). Neither reader is told the other's version exists. |
| 10 | step1 / `truth` | 657 | 2 | none | `model` | ◐ | ◐ | ●●○ | **32.** **No longer the only unit in step 1 with nothing the student does**, `recap` having arrived behind it, but its own half of that is unchanged: no quiz, no exercise, and both figures static. Against it, the two drawings take genuinely different cuts of one argument and the prose reads each of them, which is the shape the step's best units have. Sequence half closed: it **now ends on a line into `workshop`** ("The workshop is that question three times over"), and `model` still closes on its task card without pointing here, so it still opens cold on its own claim. Fix: a three-question quiz. The material sorts into questions more cleanly than anything else in the step, since trained-against-grounded-against-proved is already three answers. |
| 11 | step1 / `workshop` | 202 | 2 | OneWindow + FlagBoard (3 flags) | `truth` | ● | ● | | **33.** **Rewritten to the leanest page in the step**, 1,047 words to 202: the per-flag walkthroughs went onto the board's own hint keys, the five house rules to step 0's `welcome`, and the close to `recap`. Both rows this cell used to carry are gone with it. It now uses the step's exercise shape, an `<hr>` and the shared `ui:quiz.title`, and `OneWindow` above the board is what makes it a step 1 capstone rather than a flag hunt, since the flags on their own ask nothing about the window. Sequence is marked at both ends, `truth` handing in and `recap` looking back. Fix: none here; the card it gained contradicts a house rule, which is Table 1a. |
| 12 | step1 / `recap` | 357 | 0 | none | `workshop` | ◐ | ● | | **34.** New, and **the best-sequenced unit in the course**: it opens by looking back over the whole step and closes on the only sentence in the kata that says a step has ended and names the next one. Cadence is what it costs: 357 words, no figure, nothing to do, and **nothing at all on the page in guided mode** (Table 1b). Against that it is one list of eight lines, each a cost and the move that answers it, and it re-argues nothing, which is what keeps a recap from being a second course. |
| 13 | step2 / `evolution` | 831 | 3 | ungraded exercise | step1 `recap` | ● | ● | | |
| 14 | step2 / `setup` | 753 | 3 | SetupFlags (3 flags) | `evolution` | ● | ◐ | ●○○ | **35.** **It no longer closes with a forward pointer.** `setup.hooks.3` ended on "the unit on repeating patterns comes back to when that is worth doing" and the clause was cut, correctly, because `patterns` stopped mentioning hooks. What it leaves is the last prose sentence in the unit ending on hooks alone, and the `setup` → `patterns` seam unmarked from both sides. Fix: one clause, on whatever `patterns` argues now. |
| 15 | step2 / `engineering` | 555 | 1+card | WhereWouldItGo | `setup` | ● | ◐ | ●○○ | **36.** The bare `<h2>Test yourself</h2>` over the card is now **deliberate and documented**: the comment in the HTML says the card's own description carries the setting, which is the same shape step 1's four task units use (rule, rule line, figure, nothing in between). So what is left is one thing, not two: it opens cold and closes on the card with no line into `steering`. Fix: one closing sentence. |
| 16 | step2 / `steering` | 1098 | 0 | none | `engineering` | ⚠ | ◐ | ●●○ | **37.** **Two sections added, 301 words, and it is now the second longest unit in the course**, behind `tools` and ahead of the capstone. It is also still undrawn and still has nothing to do, which makes it 1,098 words of unbroken prose landing on a 506-word predecessor. The new material is good and correctly placed (`Mid-flight` sorts the moves by where the agent is when you catch it; `When it is going nowhere` is `Interrupt, or go back` answered), so the cost is length rather than content. Fix unchanged and now urgent: **this is the best figure candidate left in the kata**, since interrupt-versus-rewind is two windows side by side and the step's neighbours on both sides carry drawings. Sequence: it opens on its first `<h2>` with no lead, which is documented and deliberate, and it gained one link, to `step1/session`. |
| 17 | step2 / `patterns` | 423 | 1 | none | `steering` | ◐ | ◐ | ●●○ | **38.** **Drawn for the first time** and second thinnest in the step. Eight paragraphs became six across two headings (`Skill iteration`, `Scripts`), two `<pre>` blocks arrived that are one skill twice differing by exactly one rule, and `ScriptRuns` closes the unit. Still **nothing to do**, and its predecessor's growth leaves it at under two fifths of the unit before it. Both seams are bare: it opens cold, `setup`'s pointer into it was cut with the hooks clause, and it names no other unit at all. Fix: a three-question quiz, and one clause naming `setup` where the skill it iterates was first written. |
| 18 | step2 / `workflows` | 949 | 7 | AuditExample + quiz (3q) | `patterns` | ● | ◐ | ●○○ | **39.** **The wall is now broken here, properly.** Seven figures, the densest unit in step 2 and second in the course to `tools`: four `FlowDiagram`s that close a section each, `AuditExample` (the switch turns the rendered table into the markdown behind it, the only interactive element in the step outside the two boards), `WorkflowWeights` and `WorkflowTimeline` closing. Longest of the six prose units, `enablement` included. **The step's first quiz landed here**, three situations rather than definitions, so the unit now asks the student something instead of only showing them things, and the step's `CLAUDE.md` records the reversal it took to get there. What is left is sequence: it opens on a lead, but `patterns` names no unit at all and this one closes on `WorkflowTimeline` with no line into `enablement`, so both seams are bare. Fix: one closing clause into `enablement`, placed before the figure so the drawing still closes the unit. |
| 19 | step2 / `enablement` | 367 | 2 | none | `workflows` | ◐ | ◐ | ●○○ | **40.** **The thinnest unit in the course outside step 0**, and it lands straight after the densest one: 949 words and seven figures, then 367 and two. Three sections of one or two paragraphs, drawn but with nothing to do. The drop is partly by design (no lead, every section opening cold on its own claim, both documented), and two figures keep it from reading as a return to the wall, so this is a spike in the other direction rather than a defect. Sequence is the real cost: it opens cold and closes on prose with no line into `goals`, which leaves `workflows` → `enablement` → `goals` three units of unmarked seams. Against that, it ties `workflows` for the **most cross-linked unit in the course**, pointing at `step1/tools`, `engineering` and `steering` from inside its own paragraphs. Fix: one closing sentence into `goals`. |
| 20 | step2 / `parallel` | 518 | 1 | none | `enablement` | ● | ◐ | | **41.** New, in the slot the cut `quality` unit left and not a rewrite of it. Four sections running most control to least and then landing in the middle, one drawing closing the unit, nothing to do. Cadence is fine: 518 words and a figure after 367 and two is a rise rather than a spike. Sequence: it opens on its first `<h2>` with no lead, which is documented, and `enablement` still does not hand into it. Against that it carries **four links to three other units**, more than any unit in step 2, and one of them is to `goals` in its last paragraph, so the seam into the capstone's run-up is at least threaded. Fix: nothing here; the closing sentence belongs to `enablement`. |
| 21 | step2 / `goals` | 683 | 0 | none | `parallel` | ⚠ | ● | | **42.** **Sequence is closed at both ends now**: `workshop`'s lead names this unit rather than counting back past it, and `goals.own-worktree.2` closes by naming `workshop` and handing the goal over to the build. What is left is cadence, and it is the same half the cadence summary carries: one of the step's **two figureless, taskless units**, and the one that carries the rule the entire capstone is built on. |
| 22 | step2 / `workshop` | 1097 | 0 | Workshop (5 flags) | `goals` | ● | ◐ | ●○○ | **43.** Third longest unit in the course now, behind `tools` and `steering`. The cadence complaint stays **spent**, and by more than it was: the run-up is 1,834 drawn words across `workflows`, `enablement` and `parallel`, then 683 flat ones in `goals`. It is 2 to 4 hours of real work and the strongest thing in the kata. The close is where it costs: a one-sentence self-only aside, no wrap-up of the step, and now **a whole step after it that it does not mention**. Fix: one closing sentence into `change`. Step 1's `recap` is what this looks like done. |
| 23 | step3 / `change` | 735 | 1 | none | step2 `workshop` | ● | ◐ | ●○○ | **44.** **Rewritten and drawn**, 445 words to 735 and three sections to five, with `PipelineShift` under the third of them. The cadence complaint is spent with it: the drop off `workshop` was the largest in the course at 699 words, 1,090 with a five-flag board into 391 with nothing at all, and it is now 1,090 into 670 with a figure (735 is the file, both halves of its assistant pair counted). It also carries **five links out, more than any unit in the course**, all of them into step 2, which ties it hard to what the student just did. Sequence is untouched and is all that is left: `workshop` does not hand into it and it opens cold. |
| 24 | step3 / `expectations` | 377 | 0 | none | `change` | ● | ◐ | ●○○ | **45.** Matches its predecessor almost exactly in length and shape. **Four links to four different units**, which ties `parallel` for the most in the course, and every one of them is load-bearing rather than decorative: it is the unit that reads back what steps 1 and 2 already argued. Opens cold, closes cold. |
| 25 | step3 / `impostor` | 430 | 0 | none | `expectations` | ● | ◐ | ●○○ | **46.** Closes the course. One link. Its last paragraph is the right note to end on, and it ends the unit rather than the kata (Table 1d). |

### Cadence, in summary

- **The quizzes were all inside the first six of twenty-five units, and one has now landed at unit
  18**: step0 `welcome`, step1 `prompt`, step1 `context`, and step2 `workflows`. Between unit 6 and
  unit 18 the course still never *asks* the student anything, and after unit 18 it never asks again.
  It hands them boards and cards instead, at units 5, 7, 8, 9, 11, 13, 14, 15 and 22, and after
  unit 22 it hands them nothing at all. A board is a task, not a question, and in a guided room a tutor
  cannot get a show of hands from one. **One of the four steps still has no `quiz.ts`**, and it is
  the one that closes the course. Fix: three questions each on `steering` and `patterns` in step 2
  and on `expectations` in step 3, browser-graded, on machinery that already exists.
- **The wall is at the end of the course and step 1 grew one page of its own.** Inside step 2 it is
  still gone: `parallel` arrived drawn in the slot `quality` left, so **no two undrawn units are
  adjacent** and what is unillustrated is `steering` and `goals` standing alone, 1,781 words with
  nothing to do in either. `steering` is the one worth drawing first and it got 301 words longer
  while nobody drew it. Step 3 is still where the wall closes the course, and it is one unit shorter
  than it was: `change` was rewritten and drawn, so what ends the kata is **`expectations` and
  `impostor`, two consecutive units, 807 words, no figure, no quiz and no exercise between them**.
  The step as a whole still asks the student for nothing across its 1,542 words; what it gained is
  the one thing in it a room can look at. Step 1's `recap` is undrawn and taskless too, but it stands
  between a board and a step boundary rather than beside another blank page. Counted across
  everything, **ten of twenty-five units carry nothing the student does** (`truth`, `recap`,
  `steering`, `patterns`, `enablement`, `parallel`, `goals`, and all three of step 3), against
  fifteen that do, and a drawing is not something the student does.
- **Interaction density is inverted against difficulty, and step 1 pulled further ahead.** It
  carries **twelve interactive components**, three interactive figures and two quizzes across 7,760
  words, and this range added none of them: `NextToken` was rebuilt in place instead, from a figure
  that took the top-scored token on the reader's behalf into one where every candidate is a control.
  Step 2 carries two graded boards, two ungraded tasks, one interactive figure and one quiz across
  7,274 words, and it is the harder step. Step 3 carries one static drawing across 1,542.
- **The exercise heading is one key, and step 1 is fully inside it.** Ten units now carry
  `<h2 data-i18n="ui:quiz.title">Test yourself</h2>`, the shared `ui` key, `tokens` and step 1's
  `workshop` having joined in the range before this one, so the wording over a task and over a quiz
  cannot drift.
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
- **Linking is the cheap way out of it, and it is spreading.** Step 3's `change` now carries **five
  links to five step 2 units**, one per section and no unit twice, which is more than any other unit
  in the course, with `parallel` and `expectations` behind it on four each. Step 1's `recap` is a
  list of nine bullets carrying eight of them, more than any unit before it, none of them costing a
  transition sentence. The habit is no longer step 2's alone: step 3's three units carry **ten**
  links between them, and **step 1 has stopped being at zero**, `truth` linking to
  `tools` twice, to `context` and now to `workshop`, and `workshop` back to `truth` and to step 0's
  house rules, where before the step's only `href` was `context`'s own `#entropy` anchor. Fix,
  unchanged: where a unit names another, link it.
- **Step 1's internal order is settled and load-bearing.** `prompt` defines *context* and `context`
  must not redefine it; `PromptInContext` deliberately has no frame; `ToolsInContext` is the step's
  first teal frame, which is what the "draws no context frame" notes point at; `ContextDiagram` is
  drawn populated because three figures built up to it; and `deck.tsx` is authored in unit order.
  What no longer holds it in place is `workshop`'s recital of the four layers, which went with the
  capstone rewrite, so reordering is now a registry change plus those five sites rather than six.

---

## 3. Delivery gaps

| Gap | Status | Effort | Remarks and proposed fix |
|---|:--:|:--:|---|
| The deck covers step 1 only | ◐ | ●●● | **47.** 45 slides, data-driven, drawing the step's own figure components so board and page cannot drift, and **all ten of step 1's units are on the board**, `recap` having gained a divider and three statements. Two of the step's newer drawings, `WordsIntoTokens` and `PickTheNext`, still carry no slide. Step 0 has the opening question; **steps 2 and 3 have no `deck.tsx`** across thirteen units. Step 2 is at **18 inline figures** with no slide behind any of them, and all 18 are the reusable kind, since the three that could not go on a slide (`SetupFlags`, `WhereWouldItGo`, `Workshop`, which write progress to localStorage) are boards and cards rather than drawings. Step 3 is the harder half of the problem and the other kind: it has no figures at all, so a deck for it is authoring from nothing, and it is also the step most obviously meant to be talked through in a room. One mechanical limit worth knowing before anyone starts: `model`'s two window figures are Claude-only and the deck has no assistant filter, so they are the only figures in step 1 that cannot go on a board as things stand. |
| No instructor scaffolding | ○ | ●●● | **48.** No `INSTRUCTOR.md`, no per-unit timings, no demo scripts, no checkpoints, no "if the room is stuck here, do this". Guided is the **default** mode, and it now drops every run of prose from every unit rather than only from the two with whole-unit wrappers, so a tutor is carrying more of the page than the last pass measured. |
| Dutch completeness | ● | | |
| Em-dash rule | ● | | |
| Locale file hygiene | ◐ | ●○○ | **49.** Both languages took new keys in this range and both took them cleanly: step 1's `next-token` block gained three inside itself (`candidate`, `likelihood`, `likelihood-done`) and renamed a fourth, and step 3's two files each took a whole `pipeline-shift` block, correctly separated in en and in nl. **None of step 1's three standing faults was touched**: `mcp-ovals.description` is still wedged between two `mcp-parts.*` keys (now lines 314 to 322), orphaning `mcp-parts.tool.*` below an unrelated key; two block separators are still missing (`spot` into `budget.title`, `budget` into `match.title`); and two values still use a typographic apostrophe where every other value uses a straight one (`quiz.quality-degrades.entropy`, `quiz.plan-beats-one-shot.cache`). In step 2's `nl.json` the one stray blank line inside a prose block is still there, and `enablement` still runs into its successor with no separator, which is that region's convention. Step 3's two files still **disagree with each other on their own first separator**, `en.json` putting a blank line under `step.title` and `nl.json` not. Cosmetic, but the file is the one place key order encodes structure. |
