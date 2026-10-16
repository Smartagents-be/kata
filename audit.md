# Course audit, fresh pass

**Measured:** 16 October 2026, against `718b6de` ("docs: cut step 2's long-runs unit and draw step
1's context drop-off"), which is the whole working tree apart from this file and
`.claude/skills/audit-update/measure.sh`. Every number here was taken off the files rather than
carried forward.

**This is a fresh pass rather than a moved anchor.** The last one sat 144 commits back, at
`b0e0503`, and the range touched every unit in the course: three units were cut (`harness`,
`evolution`, `goals`), two arrived (`agent-patterns`, `gates`), and unit ids stopped matching file
names. So no row was carried on trust; every one was re-checked, and seven rows of the last pass are
resolved and gone. **Table 2 names a unit by its file** (`step2 / enablement`), the word every
`CLAUDE.md` uses for it, and Table 1 by its rendered title; `front/src/steps/CLAUDE.md` maps the two.
`measure.sh` was reading the id as the file name and found nine units missing, so it now resolves
the file through the registry's `html:` import.

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
applied**, so these are the full files rather than what one reader sees. Twelve units split now, and
one of them changes the reading of the table: **`setup` is 2,200 words as a file and about 1,450 to
either reader** (1,427 for Claude Code, 1,464 for Copilot), because 28 of its blocks are pairs.
`model` is the widest gap in kind, **558 words and seven figures for a Claude Code reader against 516
and five**; `tools` splits 1,017 against 1,028 and `recap` 297 against 315. The other eight pair one
block against one of about the same length.

---

## 1. Completeness

### Table 1a. Step 0, "Start here" (3 units, 606 words)

| Where | Topic | Status | Effort | Remarks and proposed fix |
|---|---|:--:|:--:|---|
| `start here/how the kata works` | | ● | | |
| `start here/run the right project` | | ● | | |
| `start here/first evidence loop` | | ● | | |

### Table 1b. Step 1, "Context, model, mechanisms" (10 units, 7,777 words)

| Where | Topic | Status | Effort | Remarks and proposed fix |
|---|---|:--:|:--:|---|
| `context, model, mechanisms/tokens and generation` | | ● | | |
| `context, model, mechanisms/communicate intent` | | ● | | |
| `context, model, mechanisms/the agentic loop and tools` | | ● | | |
| `context, model, mechanisms/context` | | ● | | |
| `context, model, mechanisms/session` | | ● | | |
| `context, model, mechanisms/agent patterns` | | ● | | |
| `context, model, mechanisms/model, effort and usage` | The 5-hour limit, and where to open it | ● | | **1.** `usage-readout`, `SessionWindows`: **Claude-only whole**, the heading, its paragraphs and both figure markers, with no Copilot sibling and the absence documented as deliberate. **It is now the only one-sided block in the course**: `recap`'s allowance bullet, the second one last pass, became a pair (`recap.lead.10.claude` and `.copilot`). This section is what makes `model` split **558 words and seven figures against 516 and five**. Fix: leave it. |
| `context, model, mechanisms/grounding and hallucinations` | | ● | | |
| `context, model, mechanisms/investigate with an agent` | | ● | | |
| `context, model, mechanisms/what to take away` | | ● | | |
| `context, model, mechanisms` | Which product's files and commands | ● | | **2.** Numbers only, re-measured: **32 elements in step 1 carry `data-assistant`**, in `tools` (9), `model` (11), `context` (4), `session` (4), `workshop` (2) and `recap` (2), up from 26. **Seven are one-sided**, all of them `model`'s 5-hour section. Step 0 carries two (its `workshop` lead), step 2 thirty-two and step 3 four (Table 1e). |

### Table 1c. Step 2, "Agentic engineering" (9 units, 9,786 words)

| Where | Topic | Status | Effort | Remarks and proposed fix |
|---|---|:--:|:--:|---|
| `agentic engineering/setup` | | ● | | |
| `agentic engineering/domain language` | | ● | | |
| `agentic engineering/quality gates` | | ● | | |
| `agentic engineering/steering` | | ● | | |
| `agentic engineering/skills and scripts` | | ● | | |
| `agentic engineering/workflows` | | ● | | |
| `agentic engineering/prove your work` | | ● | | |
| `agentic engineering/parallel work` | | ● | | |
| `agentic engineering/workshop` | | ● | | |
| `exercises/step2/java/.../domain/CLAUDE.md` | | ● | | |
| `exercises/step2/java/.../Step2Application.java` | | ● | | |
| `front/src/steps/step2/FileTree.tsx`, `front/src/steps/step2/index.tsx` | | ● | | |
| `front/src/steps/step2/CLAUDE.md` | | ● | | |
| — | Boundaries cut token cost | ○ | ●○○ | **3.** `domain language` makes the architecture argument (domain-driven design, vertical slices, hexagonal) and **the word *token* does not appear in it once**, while step 1 spent a unit on what a context costs. A slice or a port is also the smallest thing an agent has to read to change one behaviour, and that is the one place the course could connect layout to the bill. Fix: one sentence in `engineering.vertical-slices`, linking step 1's `context`. |
| | The new-step file list | ○ | | **4.** Went with `quality`, and it was an example rather than an argument, so little is lost: the scaffolding-skill idea it illustrated survives in `patterns.scripts.1`. Recorded so nobody looks for it. |
| | Over-commenting and under-logging | ○ | ●○○ | **5.** **Still no home anywhere in the course**: neither term, nor *logging* or *comments* as advice, appears in any of the 25 units in either language, and step 2's notes record the argument as surviving nowhere. It is hygiene an agent gets wrong by default. Fix: two sentences in `setup`'s `CLAUDE.md` section, which is where the file those rules belong in is argued. |
| | Everyday git hygiene | ◐ | ●●○ | **6.** **The expensive half landed**: `parallel.worktree-each` now teaches a worktree and a branch per agent, a separate agent merging `main` in and opening a pull request, and taking the second branch only after the first is merged. What is still taught nowhere is the everyday half: **small commits, and never letting an agent commit blind**. A grep for *commit* across the 25 units returns committing a settings file or `.mcp.json` and the tests before a commit, nothing about how often or who presses it. Fix: a paragraph in `steering` or `prove your work`. |

### Table 1d. Step 3, "Soft skills" (3 units, 2,285 words)

| Where | Topic | Status | Effort | Remarks and proposed fix |
|---|---|:--:|:--:|---|
| `soft skills/team and process change` | Where the bottleneck moved, and onto whom | ● | | **7.** Seven sections, and the answer is the student: `change.you-test-engineer` puts the cost on them, and `business-moves-closer`, `person-still-decides` and `process-was-bottleneck` stand the requirement writer, the approver and the manager beside them. `PipelineShift` measures the third and `SdlcStages` draws where a person still decides. What it answers with is `quality gates`, linked rather than re-derived. |
| | The environment, not the project | ● ⟳ | | **8.** `change.environment-beats-project.1`: `setup` owns it and this re-states it in a paragraph, but it adds something that unit does not have: count the times this week you told an agent something you had told it before. It is one of the step's two `data-assistant` pairs, so the filename it names is right for both readers. Fix: leave it. |
| | How the change gets started | ◐ | ●●○ | **9.** `change.way-working-decision` tells the student to question the deck, the code review and the sprint, which is a reason to start rather than a way to. The one move against it is still `WhatYouTakeBack`'s fifth, a line on a task card at the foot of the last page. No unit argues how this way of working is introduced to a team, which is the question the unit's own title asks. Fix: a section in `change`. |
| `soft skills/set defensible expectations` | | ● | | |
| `soft skills/confidence and understanding` | | ● | | |

### Table 1e. Across the course

Two gaps no single step owns. Each of them spans at least two modules, so a fix has to be placed
rather than appended.

| Where | Topic | Status | Effort | Remarks and proposed fix |
|---|---|:--:|:--:|---|
| — | When *not* to use an agent, and what agents are bad at | ○ | ●●● | **10.** Every unit in every module assumes the agent is the right tool, and a grep for the shape of the counter-argument returns nothing. **Documented as deliberately absent** rather than overlooked: step 2's notes rule it out of `steering` by name. The nearest the course comes is `parallel.many-agents-once.4`, which says when to keep 1 agent rather than several, and that is a different question. `soft skills` is still the module it could land in without half-telling it. |
| `agentic engineering` | The same habits on a second assistant | ◐ | ●●● | **11.** **Step 2 is paired now, but only where it names a file or a key**: `setup` (28 elements), `steering`'s rewind move and `parallel`'s worktree paragraph (2 each), plus `ReadEachTime` swapping `CLAUDE.md` for `AGENTS.md` and `SameMachinery`'s `agent` move. The rest still names Claude Code's terms, or both products in one sentence: `enablement.goal-check.2` sets `/goal` beside Copilot CLI's autopilot, `RunSheet` carries every command the capstone issues with no variant, and `SetupFlags` sends every reader into a `.claude` skill on purpose. **The page no longer promises otherwise**: step 0's line telling every reader the pages name their own product's commands is gone, so this is work outstanding rather than a claim the course falsifies. The class this is taught to works in Copilot inside IntelliJ. |

---

## 2. Cadence and sequence, per unit

**Cadence** judges length and interaction density against the unit before it. **Sequence** judges
whether the unit opens from what its predecessor left and hands off to its successor. A row with
both marks ● has an empty remarks cell unless something else about it is worth a reader's time.

| # | Unit | Words | Fig | Interactive | Follows from | Cad | Seq | Eff | Remarks and proposed fix |
|--:|---|--:|--:|---|---|:--:|:--:|:--:|---|
| 1 | step0 / `welcome` | 409 | 4 | SetYourAssistant + 2 code boxes + quiz (2q) | — | ● | ● | | |
| 2 | step0 / `backend` | 159 | 1 | none | `welcome` | ◐ | ◐ | ●○○ | **12.** **A figure and nothing to do, by design**: `IntroLoop` draws the loop and the unit's one code block is the board's first row on the next page, which `backend` says in its closing line. What it lost is the seam behind it: `welcome` now ends on house rule three with nothing pointing on. Fix: a clause at the end of `welcome`. |
| 3 | step0 / `workshop` | 38 | 1 | FlagBoard (2 flags) | `backend` | ● | ● | | **13.** **The thinnest unit in the course, 38 words, 19 to either reader**: one line about reading a workshop's `README.md` and instructions file, and the board is the page. Its pointer at `tokens` was cut on purpose as the pager's job, so the step 0 → step 1 seam is bare by decision rather than by drift. |
| 4 | step1 / `tokens` | 924 | 9 | 5 interactive figures + PickTheNext | step0 `workshop` | ● | ◐ | ●○○ | **14.** **The most figures in step 1**, nine, with every run of prose self-only, so a guided student gets the drawings and the exercise. It opens cold on its claim and closes on picking your model before you begin, which points at `model` six units ahead and at nothing in `communicate intent`. Fix: a closing sentence. |
| 5 | step1 / `prompt` | 1165 | 6 | EntryBrief + PlanItTwice + quiz (3q) | `tokens` | ● | ◐ | ●○○ | **15.** **Nearly doubled since the last pass**, 637 to 1,165, with four tip sections (few-shot, output format, paste the real error, what no longer works), so ten headings, the most in step 1. Both seams are bare: it opens on its own claim and closes on the last tip. Fix: a closing sentence into `the agentic loop and tools`. |
| 6 | step1 / `tools` | 1266 | 8 | ConnectOne + ShutterFlag + SpotInjection + BudgetWindow | `prompt` | ◐ | ◐ | ●●○ | **16.** **The longest unit in step 1 and still the busiest page in the course**: eight figures and four things to do under one rule. It is also **one of two units in step 1 with no link out at all**. The fix stands: splitting the MCP half from the tool-loop half is two ideas coming apart. |
| 7 | step1 / `context` | 1021 | 4 | ReadYourWindow + quiz (2q) | `tools` | ● | ◐ | ●○○ | **17.** Every prose block sits inside `data-audience="self"`, so a guided student gets `WindowGrid`, `ContextZone`, the card and the questions. **`ContextZone` is new**: the 100K to 150K drop-off on a to-scale axis, with the owner's memes, and on the deck as `deck-context-zone`. It opens on what one request is and names nothing behind it. Fix: half a sentence back at the loop. |
| 8 | step1 / `session` | 863 | 4 | SurviveTheClear + quiz (2q) | `context` | ● | ◐ | ●○○ | **18.** It still opens on a **sentence fragment with no subject** ("Everything earlier in this conversation"), which is good voice and no bridge, and its one link points back at `context` mid-unit. It closes on watching your own session, with no line into `agent patterns`. |
| 9 | step1 / `agent-patterns` | 634 | 6 | CutItUp + PatternMatch | `session` | ● | ◐ | ●○○ | **19.** **New since the last pass**: `harness` cut down to its patterns, opening on `PatternMap` and closing on routing. **No link out at all**, the other unit in step 1 with none, and neither seam is marked. Fix: one clause at the close into `model, effort and usage`, which is where the tier choice it ends on is argued. |
| 10 | step1 / `model` | 692 | 7 | PriceOneTurn + PickTheTier | `agent-patterns` | ● | ◐ | | **20.** **Shrank from 1,142 to 692** and still reads as **two lengths**, 558 words and seven figures for a Claude Code reader against 516 and five (Table 1b). It closes on a clear brief helping any model, linking back to `communicate intent`, and hands nothing on to `grounding and hallucinations`. |
| 11 | step1 / `truth` | 661 | 3 | quiz (3q) | `model` | ● | ◐ | | **21.** Closes into the workshop by name ("The workshop asks that 5 times"), and `model` does not hand in, so it opens cold on its own claim. `TheCutoff` is its third figure and the one off the deck on purpose. |
| 12 | step1 / `workshop` | 218 | 2 | OneWindow + FlagBoard (5 flags) | `truth` | ● | ● | | |
| 13 | step1 / `recap` | 333 | 0 | none | `workshop` | ◐ | ● | | **22.** One list, a bullet per unit plus the allowance pair, **nine links to nine units, the most in the course**, and it closes on one of the kata's two sentences saying a step has ended. Cadence is what it costs: no figure, nothing to do, and nothing on the page in guided mode, which is documented as a supported state. |
| 14 | step2 / `setup` | 2200 | 4 | CheckPermissions + SetupFlags (3 flags) | step1 `recap` | ◐ | ● | | **23.** **The longest file in the course by 750 words**, and the reason is pairing: 28 `data-assistant` blocks leave about 1,450 words to either reader, level with `parallel work`. Nine headings and two things to do. `recap` hands in, and it closes on an IntelliJ checkbox with no line into `domain language`. Accepted: the length is the two products' files told side by side. |
| 15 | step2 / `engineering` | 619 | 5 | none | `setup` | ● | ◐ | ●○○ | **24.** **Five figures and nothing to do** since its card was cut, which step 2's notes record. It opens on its own claim and closes on `HexagonPorts`, after a mid-sentence link to `quality gates` that names an integration test rather than handing on. Fix: a clause. |
| 16 | step2 / `gates` | 1034 | 2 | GateWalk | `engineering` | ● | ◐ | | **25.** **New since the last pass**, the `Quality gates` section of `domain language` grown into a unit. It closes into `steering` by name ("What you cannot write down in advance is what steering is for"), and nothing hands in to it. Its lead is now a meme slide on the deck too. |
| 17 | step2 / `steering` | 656 | 4 | SteerARun + quiz (3q) | `gates` | ● | ● | ●○○ | **26.** **Shrank from 1,097 to 656.** `quality gates` hands in, and it opens straight on its first `<h2>`, documented and deliberate. It closes on the gap rule with no line into `skills and scripts`. Fix: a clause. |
| 18 | step2 / `patterns` | 441 | 1 | SameEveryRun + quiz (3q) | `steering` | ◐ | ◐ | | **27.** 441 after 656, the thinnest unit in step 2 outside the capstone. It opens cold on its claim and names only `setup` on the way out. |
| 19 | step2 / `workflows` | 1392 | 10 | AuditExample + quiz (3q) | `patterns` | ● | ◐ | | **28.** **Ten figure markers, the most in the course**, four of them one `FlowDiagram` set. It closes into `prove your work` by name ("The next unit is about…"), and nothing hands in to it. |
| 20 | step2 / `enablement` | 1266 | 4 | SameMachinery + quiz (1q) | `workflows` | ● | ● | | **29.** **Grew from 384 to 1,266**: the `proof` unit merged in, the development container arrived, and `A goal and its check` came over with `GoalGate` and the one quiz question when `goals` was cut. Nine headings and no lead, documented. `workflows` hands in and `where-day-goes.2` hands on to `parallel work`. |
| 21 | step2 / `parallel` | 1444 | 3 | quiz (3q) | `enablement` | ● | ◐ | ●○○ | **30.** **The longest page in the course to a single reader**, 1,423 and 1,428. `prove your work` hands in. **It lost its hand-off when `goals` was cut**: it now closes on `interactive-agent-background.4`, the long-run paragraph, with no line into `workshop`. Fix: a clause there, or at the head of `workshop`. |
| 22 | step2 / `workshop` | 734 | 4 | Preflight + Debrief + Workshop (5 flags) | `parallel` | ● | ◐ | | **31.** Closes into step 3 ("Step 3 is about what changes around the work"), and opens cold on the house rule, so the seam behind it is now bare from both sides (item 30). |
| 23 | step3 / `change` | 1015 | 2 | none | step2 `workshop` | ● | ● | ●○○ | **32.** **One of four units in the course with nothing the student does.** Seven sections, two drawings, and eight links to seven units, one per section. The step 2 workshop hands in. It closes on `environment-beats-project` with no line into `set defensible expectations`. |
| 24 | step3 / `expectations` | 810 | 0 | quiz (3q) | `change` | ● | ◐ | ●○○ | **33.** Still undrawn. Seven links to six units, every one of them reading back what steps 1 and 2 argued. It opens cold and closes cold. |
| 25 | step3 / `impostor` | 460 | 0 | WhatYouTakeBack | `expectations` | ● | ● | | **34.** **It ends the course rather than ending itself**: `nobody-doing-long.3` names this as the last unit and quotes step 1 back at the reader, with the closing card under it. Undrawn, and the card is what keeps the last page from rendering empty in class. |

### Cadence, in summary

- **Eleven of twenty-five units carry a quiz, 28 questions in all**, at units 1, 5, 7, 8, 11, 17,
  18, 19, 20, 21 and 24, and every step has a `quiz.ts` wired into at least one unit. The longest run
  without one is units 12 to 16, five consecutive units, the step 1 capstone across the module
  boundary into `quality gates`.
- **Eighteen units hand the student something to do besides answer a question**: task cards, five
  flag boards, the graded exercises in `tokens`, `tools`, `agent patterns` and `model`, and
  `AuditExample`. **Four units carry nothing at all**: `run the right project` by design, `what to
  take away` and `team and process change` as look-back pages, and `domain language`, the new one,
  since its card was cut.
- **Step 3 is still the wall**: `set defensible expectations` and `confidence and understanding` are
  two consecutive units, 1,270 words, with no figure between them, and both ask the student for
  something. Every other unit in the course has a drawing except `what to take away`.
- **The length moved to step 2.** It is now **9,786 words across nine units**, against step 1's 7,777
  across ten, and five of its units run past 1,000 (`setup`, `quality gates`, `workflows`, `prove your
  work`, `parallel work`). Per reader `setup` drops to about 1,450, so the heaviest single pages are
  `parallel work` and `setup`, level, then `workflows`.
- **The exercise heading is one key and the family is fourteen units.** Every unit carrying a task
  card writes `<h2 data-i18n="ui:quiz.title">` itself, and `showsExerciseHeading` stops a second one
  printing where a unit carries both, which `prove your work` now does. Outside the family are the
  four whose only exercise is a registry quiz, step 0's `welcome`, step 0's `workshop`, step 2's
  `workshop` with its own headed sections, and the four units with nothing to do. None of that is a defect.

### Sequence, in summary

- **Seven of twenty-four seams are marked from the side that leaves**, down from eleven:
  `backend` → step 0's `workshop`, `truth` → step 1's `workshop`, `recap` → step 2, `quality gates` →
  `steering`, `workflows` → `prove your work`, `prove your work` → `parallel work`, and step 2's
  `workshop` → `team and process change`. The four that went are `welcome` → `backend`, step 0's
  `workshop` → `tokens` (cut on purpose as the pager's job), and the two that ran through `goals`,
  which leaves `parallel work` → `workshop` bare. **The one run left is units 19 to 21.**
- **Step 1's interior is still bare from `tokens` to `truth`**, seven consecutive seams, on the
  house style of opening cold on the claim, applied at the unit level. Step 2 has five bare seams and
  step 3's two interior seams are bare in both directions.
- **Three units open straight on their first `<h2>` with no lead**: `steering`, `prove your work`
  and `parallel work`, which is documented and deliberate and makes the seam before each harder to
  mark. Only `what to take away` opens with an explicit back-reference.
- **Linking is still the cheap way out of it.** `what to take away` carries nine links to nine units,
  `team and process change` eight to seven, `set defensible expectations` seven to six. **Five units
  are at zero**: all three of step 0's, which is deliberate, and two in step 1, `the agentic loop and
  tools` and `agent patterns`. Fix, unchanged: where a unit names another, link it.

---

## 3. Delivery gaps

| Gap | Status | Effort | Remarks and proposed fix |
|---|:--:|:--:|---|
| Seven drawings have no slide and no reason recorded | ◐ ⚠ | ●●○ | **35.** The deck is **150 slides**: the opening question, four module cards and one divider per registry unit, 25 of them. **Step 1's deck docblock still says "everything else a step 1 unit draws is up there"**, and `ReasoningCost` and `SpeedAtScale` are still not up there. **Step 2 has five more**: `WordsToFiles`, `HexagonPorts`, `FidelityLadder`, `ContainerMap` and `SameGate` are reusable drawings with no slide, and step 2's docblock names `AuditExample` and `LoopInWindow` as judgements but none of these five. The rest is documented: `TheCutoff`, `SessionWindows` and `usage-readout` (Claude-only), every task card and board under the localStorage rule, and step 0's `IntroLoop`. Fix: a slide or a named reason for each of the seven. |
| No instructor scaffolding | ○ | ●●● | **36.** No `INSTRUCTOR.md`, no per-unit timings, no demo scripts, no checkpoints, no "if the room is stuck here, do this". Guided is the **default** mode and it drops every run of prose from every unit, so a tutor is carrying the page. The deck carries the one half of that it can: all 25 dividers state their unit's claims. None of the five things this row names exists. |
| Dutch completeness | ● | | **37.** Re-measured across all four steps: **every `data-i18n` key in every one of the 25 units resolves in `nl.json`**, 531 keys in all. The nineteen step 1 keys with no Dutch value are machine-shaped strings documented as deliberately English: `SpotInjection`'s result bodies and sources, `BudgetWindow`'s commands, `EntryBrief`'s prompt and check, and the three tier names. |
| Em-dash rule | ● | | **38.** Re-measured: zero em-dashes across all 25 unit files and all eight locale files. |
| Locale file hygiene | ◐ | ●○○ | **39.** **Four of the five faults this row carried are fixed**: `mcp-ovals.description` is gone with its figure, step 1's `nl.json` separates `spot` from `budget` and `budget` from `match`, and step 3's two files now agree on their first separator. One remains: step 2's `nl.json` still runs `enablement.where-day-goes.2` straight into `parallel.one-agent-time.heading` with no blank line. Cosmetic, but the file is the one place key order encodes structure. |
