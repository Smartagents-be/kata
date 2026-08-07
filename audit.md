# Course audit, fresh pass

**Measured:** 7 August 2026, against `b0e0503` ("chore: update QOL") plus five uncommitted files,
which together are the whole working tree apart from this file. Every number here was taken off the
files rather than carried forward.

**The range is one commit and it closed the whole of the last pass's Table 1a.** Step 0's third unit
is registered, so this pass counts **26 units** where the last counted 25, and every number that runs
over the course moved with it. Two things about how to read that. `b0e0503` is both the commit that
carried the last pass and the commit that did the work it described, so those five rows were true
when they were measured and false by the time they landed. And the tree here includes five
uncommitted files, step 0's registry, quiz, `welcome.html` and Dutch bundle plus `QuizPanel`, so the
numbers are the working tree rather than `b0e0503` on its own.

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
applied**, so these are the full files rather than what one reader sees. Eight units split now and
only three of them split unequally: `model` is **981 words and seven figures for a Claude Code
reader against 784 and five** for a Copilot one, by far the widest gap in the course; `tools` splits
927 against 958 and `recap` 354 against 323. The other five (`context`, `session`, step 1's
`workshop`, `change`, `impostor`) pair one paragraph against one of the same length, so both readers
get the same page a few words shorter than the number in Table 2.

---

## 1. Completeness

### Table 1a. Step 0, "Start here" (3 units, 910 words)

| Where | Topic | Status | Effort | Remarks and proposed fix |
|---|---|:--:|:--:|---|
| `start here/how this kata works` | | ● | | |
| `start here/the backend` | | ● | | |
| `start here/workshop` | | ● | | |

### Table 1b. Step 1, "Context, model, mechanisms" (10 units, 7,800 words)

| Where | Topic | Status | Effort | Remarks and proposed fix |
|---|---|:--:|:--:|---|
| `context, model, mechanisms/tokens` | | ● | | |
| `context, model, mechanisms/your prompt` | | ● | | |
| `context, model, mechanisms/tools` | | ● | | |
| `context, model, mechanisms/context` | | ● | | |
| `context, model, mechanisms/the session` | | ● | | |
| `context, model, mechanisms/the harness` | | ● | | |
| `context, model, mechanisms/the model` | The five-hour session limit, and where to open it | ● | | **1.** `usage-readout`, `SessionWindows`: **Claude-only whole**, one heading, four paragraphs and both figure markers, with no Copilot sibling anywhere in it and the absence documented as deliberate. It is not the only one-sided block in the course: `recap.what-costs-do.9` is a second, on the same reasoning, 31 words against this section's 250. Carry both into the next change rather than fixing them. This one is what makes `model` split **981 words and seven figures against 784 and five**, the widest gap the assistant filter opens anywhere. |
| `context, model, mechanisms/truth` | | ● | | |
| `context, model, mechanisms/workshop` | | ● | | |
| `context, model, mechanisms/recap` | | ● | | |
| `context, model, mechanisms` | Which product's files and commands | ● | | **2.** Numbers only, re-measured, and **unmoved across a range that rewrote all ten units**: 26 elements in step 1 carry `data-assistant`, in `tools` (8), `model` (11), `context` (2), `session` (2), `workshop` (2) and `recap` (1). **Eight of the 26 are one-sided** rather than a paired filename or command: the seven-element section in `model` and the one bullet in `recap`. Step 0 carries none, and `soft skills` now carries four, two pairs on the two places it names an instructions file. Step 2 is still at zero, which is Table 1e. |

### Table 1c. Step 2, "Agentic engineering" (10 units, 7,709 words)

| Where | Topic | Status | Effort | Remarks and proposed fix |
|---|---|:--:|:--:|---|
| `agentic engineering/project evolution` | | ● | | |
| `agentic engineering/project setup` | | ● | | |
| `agentic engineering/craft` | | ● | | |
| `agentic engineering/steering` | | ● | | |
| `agentic engineering/solving repeating patterns` | | ● | | |
| `agentic engineering/workflows`, `agentic engineering/what it asks of you` | Three links still call `craft` "the engineering unit" | ⚠ | ●○○ | **3.** The unit's rendered title is **"Craft"** and its Dutch is **"Vakmanschap"**. `workflows.naive.1` and `enablement.t-shaped.1` both link to it as "the engineering unit", and `soft skills/change management`'s `change.you-test-engineer.2` is a third site. **The Dutch is already right in all three** ("de unit over vakmanschap"), so this is the English trailing a rename its own translation kept up with. Fix: three anchor texts in the HTML. |
| `agentic engineering/parallel workflows`, `agentic engineering/workshop` | Two links still call `spending tokens` the goals unit | ⚠ | ●○○ | **4.** `parallel.one-front-rest.2` closes on "the unit on goals" and `workshop.goal.1` names "the goals unit". The unit is titled **"Spending tokens"** / **"Tokens uitgeven"**, and the folder id `goals` is the only thing left saying otherwise. Both languages are stale here, the Dutch reading "de unit over doelgericht werken" and "de goals-unit". Fix: four anchor texts. |
| `agentic engineering/spending tokens` | | ● | | |
| `kata/step2/java/.../domain/CLAUDE.md` | | ● | | |
| `kata/step2/java/.../Step2Application.java` | | ● | | |
| `front/src/steps/step2/FileTree.tsx`, `front/src/steps/step2/index.tsx` | | ● | | |
| `front/src/steps/step2/CLAUDE.md` | | ● | | |
| — | Boundaries cut token cost | ○ | ●○○ | **5.** The architecture argument is on the page and the money argument is not. This is the only place the course connected layout to the bill and it is still absent, across a range that added a whole unit about what things cost. Fix: one sentence beside the `tokens` link. |
| | The new-step file list | ○ | | **6.** Went with `quality`, and it was an example rather than an argument, so little is lost: the scaffolding-skill idea it illustrated survives in `patterns.scripts.1`. Recorded so nobody looks for it. |
| | Over-commenting and under-logging | ○ | ●○○ | **7.** Went with `quality` and has **no second home anywhere in the course**: neither term appears in any unit, in either language, and a grep over all 26 files returns nothing. It was two sentences and it is hygiene an agent gets wrong by default. Fix: put it back beside `setup`'s `CLAUDE.md` section, which is where the file those rules belong in is argued. |
| | Everyday git hygiene | ○ | ●●● | **8.** Worktrees are now taught in **two sections and named in two more** (`steering.worktree-each`, `goals.own-worktree`, plus a sentence each in `parallel` and `workshop`), and branch per task, small commits, and never letting an agent commit blind are still taught nowhere. The step has got better at the expensive half of this and has not started on the cheap half. |
| | Task sizing, and which folder you open the agent in | ○ | ●●● | **9.** Went with the deleted `scoping` unit and has not landed anywhere. |

### Table 1d. Step 3, "Soft skills" (3 units, 2,184 words)

| Where | Topic | Status | Effort | Remarks and proposed fix |
|---|---|:--:|:--:|---|
| `soft skills/change management` | Where the bottleneck moved, and onto whom | ● | | **10.** Six sections, and the answer is the student: `change.you-test-engineer` puts the cost on them rather than on somebody else, and `business-moves-closer` and `process-was-bottleneck` stand three more people beside them, whoever wrote the requirement, whoever approves the release, and the manager who worked out a multiple that did not arrive. `PipelineShift` is the measurement under that third one, the verifying three parallel lanes need against the verifying they get. What it answers with is `craft`'s gates, linked rather than re-derived. |
| | The environment, not the project | ● ⟳ | | **11.** `change.environment-beats-project.1`: `setup` owns it and this re-states it in a paragraph, but it adds something that unit does not have: count the times this week you told an agent something you had told it before. It is also one of the step's two `data-assistant` pairs now, so the filename it names is right for both readers. Fix: leave it. |
| | How the change gets started | ◐ | ●●○ | **12.** `change.way-working-decision` tells the student to question the deck, the code review and the sprint, and closes on being the one who asks being worth more than what they ship this week. That is a reason to start rather than a way to. **What arrived in this range is the first move against it**, `WhatYouTakeBack`'s fifth, which its own notes describe as "the adoption half the step has no unit for": one line on a task card, ungraded, at the foot of the last page. No unit in any step argues how this way of working is introduced to a team, which is the question the module's own title asks, and the nearest thing is still `patterns` saying a convention belongs in the repository rather than in a head. Fix: a section in `change`, on the half its lead used to open with. |
| `soft skills/expectation management` | | ● | | |
| `soft skills/impostor syndrome` | | ● | | |
| — | IP, data governance, what may leave the building | ○ | ●●● | **13.** For professionals in company training this is the question asked before lesson one, and by someone other than the student. A grep for *governance*, *confidential*, *proprietary* and "leave the building" across all 26 units returns **nothing**, in either language. `change` grew a sixth section in the range before this one and `expectations` went from three sections to five, and not one of them asks what may leave the building. `context, model, mechanisms/the model`'s billing close and `agentic engineering/project setup`'s personal-file warning still sit next to the hole without filling it. |

### Table 1e. Across the course

Three gaps no single step owns. Each of them spans at least two modules, so a fix has to be placed
rather than appended.

| Where | Topic | Status | Effort | Remarks and proposed fix |
|---|---|:--:|:--:|---|
| — | Reviewing a diff you did not write | ◐ | ●●○ | **14.** Six units name the student's reading as the bottleneck of the whole workflow and none of them teaches it. `enablement.where-day-goes.1` states it hardest ("driving the system end to end and reading whether it did what you wanted", "it is most of your week"); `parallel.many-agents-once.3` adds that the tenth diff of the afternoon gets a worse read than the first; `goals.left-with.1` closes the unit on "every move in this unit hands you work you did not watch being made"; `steering` and `soft skills/expectation management` make it five; `change.way-working-decision`'s middle item makes it six, asking "not whether somebody reads, but what they are reading for". Against that, **one unit answers**: `change.you-test-engineer` says reading every line stops scaling in the second hour and tells the student to write the cases down before the implementation exists, with `PipelineShift` drawing the gap. That is one move and one measurement against six warnings, and nothing anywhere says how to read a diff you did not write. Fix: a second section in `change`, or `expectations` taking the half about reading under time. |
| | When *not* to use an agent, and what agents are bad at | ○ | ●●● | **15.** Every unit in every module assumes the agent is the right tool, and a grep for the shape of the counter-argument returns nothing. **Documented as deliberately absent** rather than overlooked: the notes rule it out of `steering` by name, on the grounds that half-telling it there is worse than leaving it out. That makes it a decision to revisit rather than a gap to plug, and the decision still has nowhere to land. `soft skills` is the module it could land in without half-telling it, since that module argues about the work rather than inside it. |
| every module except `agentic engineering` | The same habits on a second assistant | ◐ ⚠ | ●●● | **16.** **Step 2 is still the only module with no `data-assistant` anywhere in it**, across ten units and 7,709 words, and it is the module the swap fails hardest in: `SetupFlags` sends every reader into a `.claude` skill and two `CLAUDE.md` files, `spending tokens` teaches ultracode, a design tool and a three-tier relay and names Claude Design and three model families on the page, and the capstone's `RunSheet` carries every command the page issues with no variant on any of them. Step 1 is at 26 elements and step 3 at four, so the two readers see the same three modules out of four. The page still **does not say so**: `welcome.how-to-use-this-document.6` tells every reader "the pages then name the commands that apply to you, instead of the other product's", a promise step 2 does not keep, so this is a claim the course falsifies as well as work outstanding. |

---

## 2. Cadence and sequence, per unit

**Cadence** judges length and interaction density against the unit before it. **Sequence** judges
whether the unit opens from what its predecessor left and hands off to its successor. A row with
both marks ● has an empty remarks cell.

| # | Unit | Words | Fig | Interactive | Follows from | Cad | Seq | Eff | Remarks and proposed fix |
|--:|---|--:|--:|---|---|:--:|:--:|:--:|---|
| 1 | step0 / `welcome` | 564 | 4 | 2 code boxes + SetYourAssistant + quiz (2q) | — | ● | ● | | |
| 2 | step0 / `backend` | 235 | 1 | none | `welcome` | ◐ | ● | | **17.** **The one unit in the course with a figure and nothing to do**, and it is the shape the page wants: `IntroLoop` draws the loop under the `<pre>`, and the block itself is the first row of the board on the page after it, so asking for anything here would be asking twice. Cadence is the residue: 235 words behind a 564-word unit, second thinnest in the course. Both seams are marked, `house-rules.5` handing in and `code-blocks.2` handing on. |
| 3 | step0 / `workshop` | 111 | 1 | FlagBoard (3 flags) | `backend` | ● | ● | | **18.** **The thinnest unit in the course at 111 words, and the prose is not the page**: the board is, and the per-run instructions sit on its rows and behind its Hint dialogs rather than in the text, which is the same shape step 1's capstone takes at 251. Three runs against one project, and the last of them is house rule four practised: two strings come back in the flag's exact shape and only one line carries the tick. It closes the step on `tokens` by name, which puts the step 0 → step 1 seam back. |
| 4 | step1 / `tokens` | 696 | 5 | 3 interactive figures + PickTheNext | step0 `workshop` | ● | ● | | |
| 5 | step1 / `prompt` | 637 | 5 | PlanItTwice + quiz (3q) | `tokens` | ● | ◐ | ●○○ | **19.** **Drawn twice more and given something to do**: `ReasoningCost` under the reasoning section and `PlanItTwice` closing the unit under the step's `<hr>` and shared heading, where the last pass measured three figures and a quiz. What is unchanged is both seams: it opens with no reference to `tokens` and ends with no line into `tools`. Fix: a closing sentence. |
| 6 | step1 / `tools` | 1070 | 8 | 4 components | `prompt` | ◐ | ● | ●●○ | **20.** Fifth longest now rather than first, and **the busiest page in the course by a distance**: eight figures and four things to do under one rule (one task card, a one-row flag board and the two graded exercises) against four prose sections above it. The step's own notes record a fifth exercise being proposed for the who-decides sorting and rejected on exactly that count. The fix stands and is a judgement about shape rather than a page that has outgrown itself: splitting the MCP half from the tool-loop half is still two ideas coming apart. |
| 7 | step1 / `context` | 1195 | 4 | ReadYourWindow + quiz (4q) | `tools` | ● | ● | | **21.** **Second heaviest unit in the course**, and it now opens by defining the word the step is named after, which is what closes the last pass's item on it: `context.lead.1` names the block of text it describes. It carries a task and the course's only four-question quiz, sharing one "Test yourself" through `showsExerciseHeading`. Every prose block plus two of four figures sits inside `data-audience="self"`, so a guided student gets a diagram, a card and the questions. **Accepted as-is**: in class this unit is walked through at the board. |
| 8 | step1 / `session` | 787 | 3 | SurviveTheClear | `context` | ● | ◐ | ●○○ | **22.** Drawn a third time, by `WhereTheSeamFalls`, which is the one figure in the step arguing position rather than volume. Sequence is unchanged: it opens on a **sentence fragment with no subject** ("Everything earlier in this conversation."), which is good voice but no bridge, and it names `harness` mid-unit rather than at the close. |
| 9 | step1 / `harness` | 994 | 5 | CutItUp + PatternMatch | `session` | ● | ◐ | ●○○ | **23.** **The one unit in step 1 with no link out of it at all**, and both seams are bare: it opens cold and closes with no pointer to `model` even though `model` opens by pointing back across the step. |
| 10 | step1 / `model` | 1142 | 7 | PriceOneTurn + PickTheTier | `harness` | ● | ● | ●●● | **24.** Two more figures and a second exercise: `SpeedAtScale` under the speed section and `PriceOneTurn` above the board, the latter collecting a sum `model.cost.4` had been asking for in prose with nothing catching the answer. What that leaves is the one unit in the course that reads as **two different lengths**, 981 words and seven figures for a Claude Code reader against 784 and five (Table 1b). Neither reader is told the other's version exists. |
| 11 | step1 / `truth` | 674 | 2 | quiz (3q) | `model` | ● | ◐ | | **25.** **The fix this row carried is spent**: `truthQuiz` landed, three questions on where an answer came from, and it is the only thing on the page that survives guided mode, where the prose goes and two static figures would otherwise be the whole lesson. Its two drawings still take genuinely different cuts of one argument and the prose reads each of them. Sequence: it closes on a line into `workshop` and `model` still does not hand into it, so it opens cold on its own claim. |
| 12 | step1 / `workshop` | 251 | 2 | OneWindow + FlagBoard (5 flags) | `truth` | ● | ● | | **26.** **The leanest page in the step and the board behind it is the largest in the course**: five flags, one per place an answer can come from, the first of them planted at install time by the student's own agent and never mentioned on the page. The prose is the game and nothing else, the per-flag technique lives on the board's rows, and `OneWindow` above it is what makes this a step 1 capstone rather than a flag hunt. `one-window.1` names itself as the exception to step 0's third house rule and that rule now carries the hedge, so the two pages agree. |
| 13 | step1 / `recap` | 354 | 0 | none | `workshop` | ◐ | ● | | **27.** **The best-sequenced unit in the course**: it opens by looking back over the whole step and closes on one of only two sentences in the kata that say a step has ended and name the next one. Cadence is what it costs: 354 words, no figure, nothing to do, and **nothing at all on the page in guided mode**, which is documented as a supported state rather than an oversight. Against that it is one list of nine lines, each a cost and the move that answers it, and it re-argues nothing. |
| 14 | step2 / `evolution` | 824 | 3 | FifteenMinutes | step1 `recap` | ● | ◐ | ●○○ | **28.** **It carries no link at all any more, and it used to close with a forward pointer.** The unit ends on the fifteen-minute exercise's own last line ("You built something that runs without any of it"), which is the right close for the exercise and leaves the `evolution` → `setup` seam unmarked from both sides. Fix: one clause. |
| 15 | step2 / `setup` | 785 | 3 | SetupFlags (3 flags) | `evolution` | ● | ◐ | ●○○ | **29.** **The forward pointer is back, and it points two units ahead.** `setup.hooks.3` closes on "the patterns unit is where it goes", which threads `setup` → `patterns` and leaves `setup` → `craft`, the seam actually in front of it, bare from both sides. Not a defect on its own terms, since the pointer is about where a correction goes rather than about what comes next, but it is why unit 15 still opens with nothing behind it. |
| 16 | step2 / `engineering` | 594 | 1 | WhereWouldItGo | `setup` | ● | ● | | **30.** **Both seams closed in this range**, which no other unit in step 2 managed: it opens by naming what `evolution` put the student through for an hour, and `quality-gates.3` closes on "what is left is the part you cannot write down in advance, which is what steering is about". The bare `<h2>Test yourself</h2>` over the card stays deliberate and documented. The unit was retitled from "Engineering" and three links elsewhere did not follow (Table 1c). |
| 17 | step2 / `steering` | 1097 | 3 | SteerARun + quiz (3q) | `engineering` | ● | ◐ | ●○○ | **31.** **The complaint this row carried for four passes is spent**: the unit is drawn, it carries a task card and it carries a quiz, so the second longest unit in the course is no longer the one asking the student for nothing. What is left is the opening, which is its first `<h2>` with no lead, documented and deliberate, and a close on the gap section with no line into `patterns`. |
| 18 | step2 / `patterns` | 424 | 1 | SameEveryRun + quiz (3q) | `steering` | ◐ | ◐ | | **32.** **Given a card and a quiz**, so the other half of the last pass's fix is spent too. Cadence is unchanged and is the residue: 424 words after 1,097 leaves it at under two fifths of the unit before it, second thinnest in the step. Sequence: it opens cold, `setup` reaches over `craft` to point at it, and it names only `setup` on the way out. |
| 19 | step2 / `workflows` | 908 | 7 | AuditExample + quiz (3q) | `patterns` | ● | ● | | **33.** **Both seams marked and the fix closed as asked**: `pick-per-task.3` hands into `enablement` by name and does it before the closing figure, so `WorkflowTimeline` still ends the unit. Seven figures, four of them one `FlowDiagram` set where teal is what that workflow adds, plus the switchable audit, the weights and the timeline. Second densest unit in the course after `tools`. |
| 20 | step2 / `enablement` | 384 | 2 | CountTheDay | `workflows` | ◐ | ● | | **34.** **The thinnest unit in the course outside step 0**, landing straight after the densest one: 908 words and seven figures, then 384 and two. The drop is partly by design (no lead, every section opening cold, both documented) and it now closes with a card and a line into `parallel`, so the seam this row used to ask for is marked. It ties `workflows` for the most cross-linked unit in the step, at four. |
| 21 | step2 / `parallel` | 504 | 1 | quiz (3q) | `enablement` | ● | ● | ●○○ | **35.** **Given a quiz, which the step's own notes record as reversing an earlier decision.** Both seams are threaded, `enablement` handing in and `one-front-rest.2` handing on. The pointer it hands on with names the next unit by a title it no longer has (Table 1c), which is the only thing left on this row. |
| 22 | step2 / `goals` | 1466 | 4 | quiz (3q) | `parallel` | ◐ | ● | ●●● | **36.** **The longest unit in the course by 271 words**, ahead of `context`: eleven headings, four figures and a quiz, against 504 words and one figure in the unit before it. That is the sharpest rise anywhere in the kata and it is unchanged in kind from the last pass, only larger. Sequence is closed at both ends. Fix: a decision rather than an edit, since the four moves are one argument about spending and the notes record the single-unit shape as deliberate; splitting the goal half from the other three is the only cheaper shape and it costs the thing that holds them together. |
| 23 | step2 / `workshop` | 723 | 4 | Preflight + Debrief + Workshop (5 flags) | `goals` | ● | ◐ | ●○○ | **37.** **Rewritten from a wall of commands into a run sheet**, 1,097 words to 723 and from no figure to four: `RunSheet` opens it and is read forwards, two ungraded cards bracket the work, and the board takes the flags. Both of those reverse recorded decisions and the step's notes say so. **The close is fixed**: `debrief.2` ends on "What is left is not about the agent at all… Step 3 is that", so the step 2 → step 3 boundary is marked from the side that leaves. What is left is the opening, which is cold, while `spending tokens` names this unit on the way in. |
| 24 | step3 / `change` | 959 | 1 | none | step2 `workshop` | ● | ◐ | ●○○ | **38.** **One of only two units in the course with nothing the student does**, and the other is a recap. Six sections, one drawing, and **six links out, one per section and no unit twice**, which ties it hard to what the student just did. Cadence is fine: the drop off `workshop` is 723 into 959, a rise. Sequence: `workshop` hands into the step and this unit opens cold on its own claim, and it closes on `environment-beats-project` with no line into `expectations`. |
| 25 | step3 / `expectations` | 749 | 0 | quiz (3q) | `change` | ● | ◐ | ●○○ | **39.** **The step's one quiz landed here, as this row asked**, three situations rather than definitions, and it is what the unit renders in guided mode now that the prose is dropped. Five sections, **seven links to seven different units, the most in the course**, and every one of them load-bearing: this is the unit that reads back what steps 1 and 2 already argued. Still undrawn, and it opens cold and closes cold. |
| 26 | step3 / `impostor` | 476 | 0 | WhatYouTakeBack | `expectations` | ● | ● | | **40.** **It ends the course now rather than ending itself**, which is what this row asked for two passes running: `nobody-doing-long.3` names this as the last unit, quotes `context.model-stateless.1` back at the reader and lands on a repository nobody set up for them, with the course's closing exercise under it. Undrawn, and the card is what keeps the last page of the kata from rendering empty in class. |

### Cadence, in summary

- **The quiz complaint is spent, and the distribution is now the opposite of what it was.** Ten of
  twenty-six units carry a quiz, **30 questions in all**, at units 1, 5, 7, 11, 17, 18, 19, 21, 22
  and 25. **Every step has a `quiz.ts` wired into at least one unit**, which was untrue at the last
  three passes, and step 0's second question, written and translated but unexported, is this range's
  one addition. What is left is the shape of the gap rather than its size: units 12 to 16 are five
  consecutive units that ask nothing, and so are 23 and 24, which are the capstone and the unit
  after it.
- **Eighteen units hand the student something to do besides answer a question**: sixteen task
  cards, five flag boards and the graded exercises in `tokens`, `tools`, `harness` and `model`.
  **Only two units in the course carry nothing at all**, `recap` and `change management`, against
  nine at the last pass, and both of them are look-back units where that is arguably the point. A
  third, step 0's `backend`, is now the same by design rather than by accident: it draws the loop
  and hands its one code block to the board on the page after it.
- **The wall moved to the end and thinned.** Every unit in step 2 is illustrated, its capstone
  included, and the only figureless unit in steps 1 and 2 is `recap`. Step 3 is where the wall still
  closes the course:
  `expectation management` and `impostor syndrome` are **two consecutive units, 1,225 words, no
  figure between them**, and the step has one drawing across 2,184 words. What changed is that both
  of them now ask the student for something, so the wall is undrawn rather than inert.
- **Interaction density is still inverted against difficulty, and step 1 pulled further ahead
  again.** It carries **fourteen interactive components plus three interactive figures and three
  quizzes** across 7,800 words, and this range added two of them (`PlanItTwice`, `PriceOneTurn`).
  Step 2 carries two graded boards, seven ungraded cards, one interactive figure and five quizzes
  across 7,709 words, and it is the harder step. Step 3 carries one static drawing, one card and one
  quiz across 2,184.
- **The exercise heading is one key and the family has grown to fifteen units.** Every unit carrying
  a task card writes `<h2 data-i18n="ui:quiz.title">Test yourself</h2>` itself, so the wording over a
  task and over a quiz cannot drift, and `showsExerciseHeading` stops the second heading printing
  where a unit carries both. The units outside the family are the five whose only exercise is a
  registry quiz, where `QuizPanel` prints its own heading, plus step 0's `welcome` and step 2's
  `workshop`, which head their own sections, and step 0's `workshop`, where the board is the page
  and carries no heading at all. None of that is a defect.

### Sequence, in summary

- **Transitions stopped being the course's weakest habit, and this range added the front of it.** Of
  twenty-five seams between units, **eleven are now marked from the side that leaves**:
  `welcome` → `backend`, `backend` → step 0's `workshop`, that `workshop` → `tokens`,
  `truth` → step 1's `workshop`, `recap` → step 2, `craft` → `steering`,
  `workflows` → `what it asks of you`, `what it asks of you` → `parallel workflows`,
  `parallel workflows` → `spending tokens`, `spending tokens` → `workshop` and
  `workshop` → `change management`. Two runs are **consecutive**: the last five, so the course runs
  unbroken from unit 19 to unit 24 across a module boundary, and the first three, so it also runs
  unbroken from unit 1 to unit 4 across the step 0 to step 1 boundary. It opens and closes marked
  and is bare in the middle.
- **Where it is still bare is the interiors.** Step 1's is seven consecutive
  unmarked seams from `tokens` to `truth`, on the house style of opening cold on the claim, which is
  right at the *paragraph* level and has been applied at the *unit* level. Step 3's two interior
  seams are bare in both directions.
- **Five units open with an explicit back-reference**: `context`, `model`, step 1's `workshop`,
  `recap` and `craft`, the last of which is this range's. `setup` does it by implication. Three
  units open straight on their first `<h2>` with no lead at all (`steering`, `what it asks of you`,
  `parallel workflows`), which is documented and deliberate and makes the seam before them harder to
  mark, not easier.
- **Linking is still the cheap way out of it and it is still spreading.** Step 3's
  `expectation management` carries **seven links to seven units, the most in the course**, `change
  management` six, and step 2's `spending tokens` five. Step 1's `recap` is a list of nine bullets
  carrying eight links. Two units are at zero and both are notable: `harness`, which is the only unit
  in step 1 that names nothing, and `evolution`, which had a pointer and lost it. Fix, unchanged:
  where a unit names another, link it, and where a link names a unit, name it what the sidebar
  calls it (Table 1c).

---

## 3. Delivery gaps

| Gap | Status | Effort | Remarks and proposed fix |
|---|:--:|:--:|---|
| Two drawings want a slide, and two more cannot have one | ◐ | ●●○ | **41.** The deck is **137 slides** across 26 units, up from 136, with one divider per registry unit and one dark title card per module. The three fresh drawings this row named last pass all got slides (`GoalGate`, `ReadEachTime`, `ModelRelay` are `deck-step2-goals-gate`, `-fleet` and `-relay`), and so did `WorktreeEach`. **Two new ones did not**: `ReasoningCost` in `prompt` and `SpeedAtScale` in `model` are both reusable SVG drawings with no slide, and step 1's deck docblock says "everything else a step 1 unit draws is up there", so the deck claims a completeness it no longer has. Fix: two slides, and one sentence in that docblock. The rest is documented and deliberate: `McpOvals`, `AuditExample` and `LoopInWindow` are named as judgements in the decks that leave them out, `SessionWindows` and `usage-readout` **cannot go on a board at all** because they are `model`'s Claude-only pair and the deck has no assistant filter, and every `TaskCard` and board is off by the standing localStorage rule. Step 0's `IntroLoop` and `Legend` are off for reasons that file states, and this range added the step's third divider rather than a drawing. |
| No instructor scaffolding | ○ | ●●● | **42.** No `INSTRUCTOR.md`, no per-unit timings, no demo scripts, no checkpoints, no "if the room is stuck here, do this". Guided is the **default** mode and it drops every run of prose from every unit, so a tutor is carrying the page. The deck carries the one half of that it can: all 26 dividers state their unit's two or three claims. None of the five things this row names exists, and nothing in this range moved toward any of them. |
| Dutch completeness | ● | | **43.** Re-measured across all four steps: **every `data-i18n` key in every one of the 26 units resolves in `nl.json`**, and there is no untranslated prose left anywhere in the tree, which the last three passes could not say. The seventeen step 1 keys with no Dutch value are all machine-shaped strings that are documented as deliberately English: `SpotInjection`'s four result bodies and sources, `BudgetWindow`'s six commands, and the three tier names. |
| Em-dash rule | ● | | **44.** Re-measured: zero em-dashes across all 26 unit files and all eight locale files. |
| Locale file hygiene | ◐ | ●○○ | **45.** Two of the five faults this row has carried are fixed: the typographic apostrophes are gone from every `en.json`, and step 2's `nl.json` no longer splits `enablement.t-shaped.1` across a blank line. Three remain, all of them in the same shape as before. Step 1's `nl.json` still wedges `mcp-ovals.description` between `mcp-parts.resource.*` and `mcp-parts.tool.*` (line 350), orphaning the tool keys below an unrelated one, and still misses two block separators (`spot` into `budget.title`, `budget` into `match.title`). Step 2's `nl.json` still runs `enablement` into `parallel` with no separator. Step 3's two files still **disagree with each other on their own first separator**, `en.json` putting a blank line under `step.title` and `nl.json` not. Step 0's two files were the fourth and worst of them last pass and are now the cleanest in the repository: the dead `flag.panel.*` block is gone from both, the three key families its components ask for are written and separated, and the second quiz question is exported. Cosmetic, but the file is the one place key order encodes structure. |
