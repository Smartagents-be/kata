# Course audit — agentic-engineering kata

**Verified:** 27 July 2026, against `c414a4f` plus the uncommitted step 1 reorder in the working
tree. Every claim below was re-checked against the tree; nothing is carried forward on trust.

**This document holds open findings only.** Anything solved is deleted rather than ticked, so there
is no history here and no closure notes to read past. Finding ids (I1, M12, S5, N2) stay stable
across passes, which is why they have gaps: a gap means that item is gone, not that it moved.

**Question asked:** what is missing, what is inaccurate, what is duplicated, how does the course
sequence and pace, and what would a professional student still miss? The goals this audit measures
against are the author's own: make working professionals **comfortable with AI-driven engineering**,
**aware of costs**, and **strong enough to make the right decisions**.

### What `c414a4f` changed, in one paragraph

Step 1 grew two units and a shared-component layer. `tokens` opens the step with the unit of
measurement (three figures, no quiz), `model` closes the prose with the tiers, a real price table and
`PickTheTier`, `session` gained `SurviveTheClear`, `harness` gained its decomposition section, and
`ConnectBoard` and `TaskCard` were lifted out so the two drag boards and the two task cards share one
implementation. The working tree then reorders step 1 to `tokens → prompt → tools → intro → session →
harness → model → workshop`, moving `intro` from first to fourth. The unit HTML has been adapted to
that order; the repository's own documentation has not, which is **N7**.

---

## 1. Verdict

The course is **well written, well designed, and structurally lopsided.** The lopsidedness has
shifted rather than eased: step 1 absorbed two more units and four more interactive components while
step 2 stayed exactly where it was.

Three things hold it back, in order of impact:

1. **Cadence collapses in step 2.** Six consecutive units, ~4,250 words, zero quizzes and zero
   checks, ending in the hardest lab in the kata. Step 1 now runs 6,783 words across eight units with
   eight interactive components and two quizzes; step 2 runs 6,143 words across eight units with one
   graded board and one ungraded exercise. The scaffolding is thickest where the material is
   easiest, and `c414a4f` widened that gap by another two units.
2. **The everyday verb is half there.** `steering` covers interrupting and rewinding. What is still
   missing is recovering when the agent is stuck or looping (**M2**) and reading a diff you did not
   write (**M12**). Both are named in three units apiece and taught in none.
3. **Cost is now demonstrated per token and never per run.** This was the largest gap and it is now
   the smallest of the three. `tokens` gives the unit, `model` gives dollars per million with a
   currency in front of them, `harness` prices the cache. What no unit does is multiply: a student
   can price a token and still cannot say what an afternoon cost, and nothing shows them how to look
   (**M6**, **M8**).

Behind those, one delivery risk specific to this audience: **nothing in the course covers IP, data
governance or what may leave the building** (**M13**), and that is the question a security team asks
before anyone gets to lesson one.

---

## 2. Key strengths

| Strength | Evidence |
|---|---|
| **Exercises withhold the answer** | Every flag ships the puzzle, not the decode. `forTier` ships as a stub, the native-image hint is deliberately unwritten, `problem.md` has no answer key anywhere in the tree. Consistent across 8 flags and 4 hands-on tasks. |
| **Everything grades offline** | Salted SHA-256 in the browser for both quizzes and both flag boards. The course works with the backend down. |
| **The cost throughline now has evidence under it** | `tokens` argues why identifiers cost more than prose, `model`'s `ModelPricing` is the one place in the course a number carries a currency, and `harness`'s "roughly a tenth" for a cache read is checkable against that table's read column by eye. Argument, figure and cross-check agree. |
| **`BudgetWindow` is a genuinely smart exercise** | Grades the **exact set**, not the total, so filling the window and then adding the two right calls fails. |
| **`SpotInjection` teaches a real threat** | Four tool results, two designed to be mistaken for the poisoned one. |
| **Two drag boards, one implementation** | `PatternMatch` and `PickTheTier` are both `ConnectBoard`; `CutItUp` and `SurviveTheClear` are both `TaskCard`. Written after the two boards had already drifted, which is the right time to do it and the wrong time to skip it. |
| **`NextToken`'s branch tree holds up its own claim** | The invariant is real, not decorative: the first `then` of each pass's leading candidate is the token the next pass takes, verified across all three passes, which is what lets the taken path draw unbroken. |
| **Step 1's figure vocabulary is one system** | Teal frame = context, bar = something in it, dashes = what is not. `ToolsInContext`/`McpServer` are a pair; `TokenSplit`, `TokenAttention` and `ModelTiers` stay outside the vocabulary on purpose. |
| **The step 2 capstone is real** | Five flags of four shapes, measured by a build rather than by opinion. Still the strongest single asset in the kata. |
| **Dutch is complete** | **340/340** prose keys (21 + 185 + 134), verified rather than sampled. Two new units and a rewritten `harness` landed in one commit and the Dutch kept up with all of it. |
| **Deliberate design is documented** | `CLAUDE.md` records *why*, not *what*. Rare and valuable — see **N7** for the one place it has fallen behind. |

---

## 3. Topic assignment

**Legend:** ● solid · ◐ thin · ○ missing · ⟳ duplicated · ⚠ inaccurate

### Context and mechanics (step 1)

| Topic | Where | Status |
|---|---|:--:|
| What a token is; why prose is cheap and ids are dear | `tokens` | ● |
| Next-token prediction and sampling | `tokens`, `NextToken` | ● |
| Attention: every pair, backwards only, quadratic | `tokens`, `TokenAttention` | ● |
| Model is stateless; transcript re-sent | `intro`, `session` | ● |
| Model is statistical, not a database | `intro`, `tokens` | ● |
| Missing vs wrong context | `intro` | ● |
| Entropy in the window | `intro` | ● |
| Amnesia / compaction / context fatigue | `intro`, `session` | ● |
| The prompt as an authored layer; the word *context* defined | `prompt` | ● |
| Reasoning level and thinking tokens | `prompt`, `model` | ● |
| Meta-prompting and plan mode | `prompt` | ● |
| Bundling work; `/clear` | `prompt`, `session` | ● |
| Session as the only layer with a time axis | `session` | ● |
| Making an instruction survive a `/clear` | `session` / `SurviveTheClear` | ● |
| Prompt caching, and what invalidates it | `harness` | ● |
| What a tool is; the tool loop | `tools` | ● |
| MCP: what it is, wiring one | `tools` | ● |
| Tool descriptions cost you by existing | `tools` | ● |
| Tool results are the least trusted layer; prompt injection | `tools` | ● |
| Harness: what it is, who ships it | `harness` | ● |
| Billing model (API key vs subscription) | `model` | ● |
| Coordinator / sequential / reflection patterns | `harness` | ● |
| Decomposition, and cutting a real under-specified problem | `harness`, `CutItUp` | ● |
| Model tiers as dispositions | `model`, `ModelTiers` | ● |
| Price per token, input vs output vs cache | `model`, `ModelPricing` | ● |
| Choosing a tier for a task | `model` / `PickTheTier` | ● |
| Context observability (`/context`, inspecting the window) | `tools` / `ReadYourWindow` | ● |

### Engineering habits (step 2)

Unchanged by `c414a4f`; re-verified.

| Topic | Where | Status |
|---|---|:--:|
| Iterate small because a version costs an hour | `evolution` | ● |
| Walking skeleton; detail work comes later; the one-hour rule | `evolution` | ● |
| `CLAUDE.md`: what belongs, what it costs | `setup` | ● ⟳ |
| Skills: frontmatter, load-on-match, `references/` | `setup` | ● ⚠ |
| Hooks | `setup`, `patterns` | ◐ |
| Vibe coding vs agentic engineering | `engineering` | ● |
| Domain language as compression; DDD + ports and adapters | `engineering` | ● |
| Boundaries cut token cost | `engineering` | ● |
| Checks as part of the work | `engineering`, `quality` | ● ⟳ |
| **Task sizing** | — | ○ |
| **Which folder you open the agent in** | — | ○ |
| The `.claude` symlink trap | `engineering`, one clause | ◐ |
| Interrupt versus rewind, and what each leaves behind | `steering` | ● |
| A worktree per agent, and the reading bottleneck | `steering` | ● |
| Making the agent stop at a gap instead of guessing | `steering` | ● |
| The third-time rule; `CLAUDE.md` vs skill vs hook vs script | `patterns` | ● ⚠ |
| The build decides, not the agent | `quality` | ● |
| Coverage, complexity, mutation | `quality`, `workshop` | ● ⟳ |
| Metrics are proxies and get gamed | `quality`, `workshop` | ● ⟳ |
| Over-commenting / under-logging | `quality` | ● |
| Goal vs instruction; long autonomous runs | `goals` | ● |
| Git worktrees | `goals`, `steering`, `workshop` | ● |
| **Recovering a stuck or looping agent** | — | ○ |
| **Reviewing a diff you did not write** | — | ○ |
| **Everyday git hygiene with agents** | — | ○ |
| **Curating inputs (`@`-mentions, spec vs let-it-read)** | `CutItUp` works one real problem | ◐ |
| **Subagents / delegation as a cost lever** | `harness` and `model` name it | ◐ |
| **Permissions and settings depth** | named only | ◐ |

### Cost — the throughline

| Topic | Where | Status |
|---|---|:--:|
| Every token is re-sent every turn | `intro`, `session`, `tokens` | ● |
| Reading grows faster than the thing read | `tokens` | ● |
| Prose is cheap, identifiers and JSON are dear | `tokens` | ● |
| Output is priced above input, and why | `tokens`, `model` | ● |
| Price per million, per tier, with a currency | `model` / `ModelPricing` | ● |
| Cache read at a tenth; what invalidates a cache | `harness`, `ModelPricing` | ● |
| Model tiering as a cost lever | `model` | ● |
| `CLAUDE.md` is a bill paid per message | `setup` | ● ⟳ |
| Tool descriptions ride along every message | `tools` | ● |
| Boundaries reduce reading per turn | `engineering` | ● |
| A correction you send is re-sent forever; a rewind is not | `steering` | ● |
| Two agents are two contexts and two bills | `steering` | ● |
| Coordinator pattern as a cost saving | `harness`, `model` | ● |
| Long runs burn tokens ("four hours is not unusual") | `goals` | ◐ |
| **What one session or one run actually costs, in money** | — | ○ |
| **How to measure what a run cost** | — | ○ |

The last two rows are the whole of what is left here. Every ingredient now exists in the tree and no
unit ever multiplies them together.

### Decisions and professional judgement

| Topic | Where | Status |
|---|---|:--:|
| Naming the outcome so a build can answer it | `goals`, `quality` | ● |
| Whether the work so far is worth keeping | `steering` | ● |
| Trusting the build over the agent's word | `quality` | ● |
| Choosing what a task is worth spending on | `model` / `PickTheTier` | ● |
| **Knowing when a task is ready to hand over** | — | ○ |
| **When *not* to use an agent at all** | — | ○ |
| **What agents are reliably bad at** | — | ○ |
| **IP, data governance, what may leave the building** | — | ○ |
| **Licensing of generated code** | — | ○ |
| **Trust calibration: when to verify, when to accept** | — | ○ |
| **Team norms: review, disclosure, onboarding colleagues** | — | ○ |

---

## 4. Cadence and sequence

### Measured

Words are counted off the English HTML with tags and comments stripped. Figures count `data-figure`
slots outside comments, so `harness` reads 4 (three pattern diagrams plus the `CutItUp` card) with
`PatternMatch` arriving separately from the registry.

| Unit | Words | Figures | Interactive |
|---|--:|--:|---|
| step0 / welcome | 244 | 3 | 2 code boxes + quiz |
| step0 / backend | 104 | 1 | 1 code box |
| step1 / tokens | 663 | 3 | 3 interactive figures, no quiz, no task |
| step1 / prompt | 635 | 3 | quiz (3q) |
| step1 / tools | 1037 | 7 | 2 tasks + SpotInjection + BudgetWindow |
| step1 / intro | 1030 | 3 | quiz (3q) |
| step1 / session | 768 | 2 | SurviveTheClear |
| step1 / harness | 969 | 4 | CutItUp + PatternMatch |
| step1 / model | 643 | 3 | PickTheTier |
| step1 / workshop | 1038 | 0 | FlagBoard (3 flags) |
| step2 / evolution | 790 | 3 | ungraded exercise (15 minutes) |
| step2 / setup | 609 | 1 | **none** |
| step2 / engineering | 974 | 1 | **none** |
| step2 / steering | 808 | 0 | **none** |
| step2 / patterns | 607 | 0 | **none** |
| step2 / quality | 579 | 0 | **none** |
| step2 / goals | 681 | 0 | **none** |
| step2 / workshop | 1096 | 0 | Workshop (5 flags) |

Eighteen units. Step 1 is 6,783 words and step 2 is 6,143, so the two steps are now the same size and
nothing else about them matches. `model` was the shortest prose unit in the course and is not any
more: it took the billing section off `harness` and is now four sections, a figure pair and a board.
`step2 / quality` at 579 words inherits the title, and it has neither a figure nor a check. The step
1 rows were re-measured on 27 July 2026 and four of them had moved: `tools` grew the two MCP figures
and the `/context` task, `model` lost its tier-naming lead, `intro` lost the `/context` sentence to
`tools`, and `harness` drifted by three words. `model` and `harness` moved again the same day when
"API vs subscription" was written and placed.

### Cadence defects

**C1 — Step 2 is a 4,250-word prose wall.** `setup`, `engineering`, `steering`, `patterns`,
`quality`, `goals`: six units in a row with nothing to do. Four of them have no figure either, so
they are unbroken text. Then the student hits a five-flag capstone that is 2–4 hours of real work.
The flattest run in the course leads directly into the steepest climb.

**C2 — Every quiz is in the first six units of eighteen.** step0/`welcome`, step1/`prompt`,
step1/`intro`. After `intro` the course never asks the student a question again until a flag board,
which is twelve units. The reorder moved both step 1 quizzes but did not spread them: they are now
units 4 and 6 rather than 3 and 5.

**C3 — `tokens` opens the step with nothing to do.** Its three figures are genuinely interactive and
the unit is right to have no quiz (the figures are the doing, and that is a documented decision).
Noted here rather than as a defect to fix: it means step 1 opens with a figure-reading unit, and the
first thing a student is *asked* is now two units in. Watch it if `tokens` grows.

**C4 — Interaction density is inverted against difficulty, and the gap widened.** Step 1 now carries
eight interactive components and two quizzes; step 2 carries one graded board and one ungraded
exercise. `c414a4f` added four components and both of them landed in step 1.

### Sequence defects

**S1 — The default mode hides `intro`'s entire prose.** `DEFAULT_MODE` is `guided`
(`shared/mode/mode.ts`), and `intro`'s prose still sits inside `data-audience="self"` wrappers. A
student who never opens the cogwheel reads that unit as **one diagram and a quiz, with no prose at
all**; `StepContent` renders `null` for filtered-empty content, so nothing signals the absence.

The reorder changes the shape of this without fixing it. `intro` is no longer the first thing a
student meets, and `tokens` and `prompt` now carry the load it used to (`tokens` has no audience
attribute anywhere, deliberately, and `prompt` now defines the word *context*). So a guided student
is no longer dropped into an empty page as their first experience. What they still lose is the whole
of the stateless-model argument and the entropy section. It is no longer where `/context` lives: the
command moved to `tools`, under the task that runs it, which is outside any audience wrapper.

**S3 — The tutor has one slide.** `shared/deck/slides.tsx` sets `TOTAL = 1`, the opening question.
Guided is the default mode and there is no presenter material for the other 17 units. step0/`welcome`
says slides are coming, so the content is honest about it; the gap is real, not drift.

**S4 — No instructor scaffolding at all.** No `INSTRUCTOR.md`, no per-unit timings, no demo scripts,
no workshop checkpoints, no "if the room is stuck here, do this" ladder. For a course whose default
mode is guided, this is the biggest delivery gap after the slides.

**S5 — Step 2's order front-loads the heaviest unit.** `engineering` (974 words, DDD + ports and
adapters + a four-module Maven layout) is unit 3; `steering` (808 words, immediately actionable,
needs no architecture background) is unit 4. Recommend `evolution → setup → steering → engineering →
…`. What `steering` teaches is a day-one skill; ports and adapters is not. This does not fix **N2**,
which no ordering fixes. A judgement call, not a defect.

**S6 — Step 1's new order works, and one thing about it is load-bearing.** `tokens → prompt → tools →
intro → session → harness → model → workshop` puts the two layers a student writes and reads for
themselves first, and turns `intro` from the first sight of the window into a step back to it. The
unit HTML has been reworked to match: `prompt` now defines *context* and draws the first frame,
`intro` opens by pointing at what `prompt` and `tools` already put in that frame, and `tokens`
declares itself not-a-layer without using the word. The load-bearing part is that `ContextDiagram` is
no longer the first frame a student meets, `PromptInContext` is, and the empty oval in `intro` only
argues anything because two units have already drawn things inside it. Anything that reorders these
again has to visit that chain. The documentation has not caught up: see **N7**.

---

## 5. Inaccuracies

Ordered by severity. All verified against the tree at `c414a4f` plus the working-tree reorder.

### High

**I1 — "This kata has two skills." It has four.** Stated in `setup.lead.3` ("the `CLAUDE.md` and the
two skills today"), `setup.skills.1` ("This kata has two: `lesson-writing` … and `quiz-writing`"),
`patterns.lead.2` ("This repository has two of those already"), and drawn as two in the `ProjectTree`
figure, whose own docstring asserts "CLAUDE.md and the two skills are real". `.claude/skills/` now
contains **`adding-a-step`, `lesson-writing`, `quiz-writing`, `repo-setup`** — `c414a4f` added the
fourth. Root `CLAUDE.md` points students at two of the three the unit does not mention. Three prose
places to fix in both languages, plus the figure and its docstring.

**I2 — The `patterns` argument is stale, and its worked example does not exist.**
`patterns.three-places.4` proposes: "Ask Claude to write the script, once: `scripts/new-step.sh
step3` creates the folder, both locale files, the unit stub and the registry line." There is **no
`scripts/` directory** in this repository. The repo solved this exact problem the *other* way, with
the `adding-a-step` skill, so the unit argues for a script while the codebase demonstrates a skill,
and the student can check. The path is written in code voice and reads as real.
`quality.write-it-down.2` repeats the argument and cross-references `patterns`, so the staleness is
in two units and both languages.

This matters more than its size: `patterns` is the unit teaching students to notice when a convention
needs a home, and its own example is out of date with the repository it points at.

### Medium

**I4 — The `SessionMakeup` figure says `/api/titles` returns ten entries.** Its first block is "Why
does `/api/titles` return ten entries?" and its sixth "And where does the tenth one go?" But
`tools.connect-one.4` says "Same nine titles either way" and `workshop.lead.2` says "Nine book titles
come back." The endpoint returns **nine**; ten is the internal count before the tenth is dropped. If
this is foreshadowing the trace flag it is too subtle and lands early. Recommend "why does the
pipeline compute ten and return nine?"

**I6 — step0 `backend`'s exercise instruction does not match its exercise.** The code block above the
rule reads `cd kata/step0/java` / `mvn verify -Pintro` and the prose says plainly that running it is
what makes the flag appear. The instruction under "Test yourself" still reads "Open the project from
its directory, go to step 1, and complete the tasks it gives you", above a box whose code
(`finishCode` in `step0/code.ts`) comes from that step 0 profile. The student is pointed at step 1
for a code step 1 does not produce. Wrong in **both** languages.

### Low

**I7 — `settings.json` vs `settings.local.json`.** `setup.skills.7` and `setup.hooks.*` name
`settings.json`, and `ProjectTree` draws it; the repo has only `.claude/settings.local.json`.
`setup.lead.3` hedges ("read the drawing as the shape rather than an inventory"), so this may be
deliberate. Worth one sentence either way, since `settings.local.json` is the file a student will
find and it is gitignored for a reason worth mentioning.

**I8–I10 — `BudgetWindow`'s line counts do not match the repository.** Re-measured against
`kata/step1/java/src/main/java/…/step1/`:

| Figure says | Actual |
|---|--:|
| `TitleController.java` = 34 lines | 24 |
| every file under `services/` = 2140 lines | 1250 |
| "Fifty stage classes" | 52 |

The numbers are *data* rather than prose and the grading is on the exact set, so nothing breaks. But
the task is framed against *this* repository ("You are adding a `?limit=` parameter to `GET
/api/titles`"), and a student who checks will find them invented. The argument survives at real
values: 1250 against 24 is still overwhelming. Also, `budget.explanation.tree`'s "longer than the
controller by a factor of eight" is 7.6× on the figure's own numbers (260 against 34) and ~11×
against the real 24-line controller.

One knock-on: root `CLAUDE.md` records that the exercise's two right calls "come to 37 lines", which
is 3 + 34. Correcting the controller to 24 makes it 27, so the fix is two files.

**I12 — Three comments describe code that has changed under them.** All internal, none
student-facing, all cheap:

- `evolution.html:38` says the `walking-skeleton` slot is "Filled by the **WalkingSkeleton**
  element"; the registry binds `UnitShot`. The `added-details` comment eight lines below names
  `UnitShot` correctly, so two comments about two slots filled by one component disagree.
- `tokens.html`, above `tokens.one-at-a-time.4`: "it is what the branch button on the figure above is
  for". `NextToken` has one button and it advances or restarts; the branch tree is drawn without
  being asked for, which is a documented decision. There is no branch button.
- `TokenSplit.tsx`'s docstring says `ContextDiagram` "in `intro`" is the first teal frame a student
  meets and that this figure sits "one page above it". After the reorder it is three pages above, and
  the first frame is `PromptInContext`. The reasoning still holds; the geography does not.

**I13 — i18n key drift.** Three units number their keys with a gap, which means a paragraph was
deleted without renumbering and the key stopped being a location: `prompt.plan-mode` runs
`.1, .3, .4, .5`; `tokens.not-words` runs `.1, .3`; `harness.check-yourself` has only `.2`. Separately
the section slug `prompt.reasonable-question-not` does not match its heading ("A prompt is the basis
of the instruction"), which breaks the same rule from the other end.

**I14 — `front/README.md` is still the stock Vite template.**

### Verified correct (stated so the next pass does not re-check)

All three graded thresholds still match `FlagRevealIT` (90% coverage, complexity 10, 80% mutation).
"Forty-one stages restore a string" and "eleven of them comment out the publish" are exact, out of 52
stage classes. `claude mcp add playwright -- npx @playwright/mcp@latest` is correct. Java 25,
AssertJ, the `graded`/`challenge`/`intro` profiles, the absence of a `native` profile, the nine
titles, and the `MemberStatements.forTier` / `Step2Application` names are accurate. Every `cd
kata/stepN/java` path in a unit matches the layout.

New this pass: `NextToken`'s taken-path invariant holds across all three passes (`timed → out`,
`out → .`); `tokens.reads-all.3`'s arithmetic is right (7 tokens → 21 pairs, 14 → 91, not 42);
`TokenSplit`'s prose row does contain a word that breaks (`unscrambled` at `unscr`/`ambled`, six of
seven words whole); the three step 1 figures carry exactly the captions the design calls for
(`TokenSplit` names its tokeniser, `NextToken` admits its scores are illustrative, `TokenAttention`
has none); and Dutch is complete at 331/331 prose keys.

---

## 6. Duplication

### Genuine repetition worth pruning

| Repeated idea | Where | Note |
|---|---|---|
| **Metrics are proxies and get gamed** | `quality.metrics.2`, `workshop.honest.1`, `flag.honest.help` | Three times, near-verbatim; `quality` and `workshop` use almost the same sentence. Keep `quality`'s statement of the principle; let `workshop` name the mutation goal and assume it. |
| **Complexity ceiling of ten** | `engineering`, `goals` ×2, `quality`, `workshop`, flag hint | Six appearances. Fine to repeat as a target; the *argument* for it should be made once. |
| **The new-step file layout** | `patterns.three-places.1`, `quality.write-it-down.2` | Listed twice, near-identically, and `quality` cross-references `patterns` while restating its conclusion. One list, one owner. |
| **`CLAUDE.md` is paid per turn** | `setup.claude-md.2`, `patterns.three-places.2`, `quality.write-it-down.3` | `setup` owns it. The other two can reference rather than re-argue. |
| **Git worktrees** | `goals.own-worktree`, `steering.worktree-each`, `workshop.native.2`, `workshop.collect.2`, `flag.native.help` | The two *arguments* are correctly split (`goals`: isolation from your own day; `steering`: one per agent). The **definition** is written twice. `steering` reads first, so it should keep the definition and `goals` should assume it. See **N2**. |
| **"Ask the agent what it has read"** | `session.window-not-memory.4`, `tools.connect-one.5`, `steering.interrupt-or-go-back.5` | Three self-asides asking for the same move. `steering`'s has the best reason to exist (there, the answer proves something). `session` and `tools` are the pair to thin. |
| **"`CLAUDE.md` is read at the start of every session"** | `intro.amnesia.3`, `session.window-not-memory.1` | Near-identical sentences. |
| **"None of this is new"** | `evolution.details.1`, `engineering.structure` | The same rhetorical opener twice in one step, word for word. |

### Deliberate overlap — leave alone

`intro` and `session` overlap by design, and `CLAUDE.md` documents the reasoning; the paragraphs that
restate `intro` are `data-audience="guided"` precisely because guided students never read `intro`'s
prose. Do not put it on a pruning list.

`tokens` is the new pressure point and it holds. It touches output pricing and prompt caching and
hands both off in one sentence naming the unit that owns them (`model`, `harness`), which is the same
discipline `harness.coordinator.3` follows for decomposition. Three units now sit on this pattern
without any of them re-arguing another's material. Keep the rule if any of the three grows.

One cross-check that is now load-bearing rather than duplicated: `harness`'s "billed at roughly a
tenth" and `ModelPricing`'s cache-read column say the same thing in two places on purpose, so a
student can verify the claim. If the table's numbers are ever refreshed, that sentence has to be
refreshed with them.

---

## 7. Missing, against the three course goals

### Goal 1 — comfort with AI-driven engineering

**M2 — Recovering a stuck or looping agent.** The biggest miss. `intro` explains entropy as *why* an
agent degrades. Nothing teaches the move in the moment: when to `/clear`, when to restate, when to
abandon the session and start over from the code on disk. `session` names `/clear` as a cost lever
and now as a test of what survives it, not as a recovery tool. `steering` teaches the correction you
make when the agent is going the wrong way, which is a different situation from the one where it is
going nowhere, and its rewind move does not cover it: rewinding assumes there is a good message to go
back to. It has an obvious home (`steering`) rather than needing a unit of its own.

**M3 — What agents are reliably bad at.** The course is honest about cost and about trust in tool
results, but never draws the capability boundary: novel algorithms, cross-cutting refactors without
clear seams, performance work, anything where the feedback loop is slow or absent. `model` gets
closest, and it is about which tier rather than about whether. A student with no map of the failure
modes calibrates by getting burned.

**M4 — Trust calibration.** Related but distinct: a rule of thumb for what to verify and what to
accept. The implicit answer is "verify everything via the build", which is correct and incomplete —
`quality` itself admits "automation stops short of taste."

**M5 — The team dimension.** These are professionals in company training. Nothing covers how a team
adopts this: review norms for agent-written code, whether to disclose it in a PR, how to onboard a
colleague, what to standardise across a team versus leave to individuals.

### Goal 2 — awareness of costs

**M6 — The numbers never meet.** Narrowed hard by `c414a4f` and not closed. `tokens` gives the unit
and its ratios, `model` gives dollars per million per tier, `harness` prices a cache read. No unit
multiplies any of it. There is no worked example anywhere: no "this session was 40k tokens in and 6k
out, here is the bill", no cost for a step 1 flag hunt, no number a student could take to a manager
who asks what this costs per developer per month. Everything needed to build that example is now in
the tree, in two adjacent units, which makes the omission cheaper to fix than it has ever been and
more conspicuous.

**M8 — Measuring what a run cost.** `goals` says "a run like this burns a lot of tokens, and four
hours is not unusual." The student is never shown how to look. A number they observed themselves
would do more for cost awareness than every qualitative warning in the course combined. With
`ModelPricing` in the tree, an observed token count is now one multiplication away from an observed
bill.

**M10 — Delegation as a cost lever.** `harness` teaches the coordinator pattern and `model` adds why
the split works (the small tiers are fine-tuned on the large one's output). Neither tells a student
when to actually reach for a subagent in their own work.

### Goal 3 — strength to make the right decisions

**M11 — When *not* to use an agent.** The biggest missing decision aid. Every unit assumes the agent
is the right tool and optimises how to use it. A course that made professionals *stronger* decision
makers would name the cases where writing it yourself is faster, where the review cost exceeds the
generation saving, and where the task is too ill-defined to hand over. Nothing in the tree frames the
question, even as "not yet". `steering` comes closest from a different angle, since its worktree
section says to run only as many agents as you can actually review, which is a limit on *how much*
rather than on *whether*.

**M12 — Reviewing a diff you did not write.** `quality` says "that is still you reading the diff" and
stops. `goals` says you read a module of diff while the next one is written. `steering` puts it
sharpest and still does not teach it: "The agents got faster. Your reading did not. Run as many as you
can actually review." Three units identify the student's reading as the bottleneck in the whole
workflow and none says how to do it. Reading code for intent when you did not form the intent is a
distinct skill from reviewing a colleague's PR, and it is the primary quality gate in an agentic
workflow.

**M13 — IP, data governance and what may leave the building.** For professionals in *company*
training this is a live question and it is absent. `tools` covers prompt injection well, which is the
inbound threat; nothing covers the outbound side: which repositories may be opened with an agent,
what happens to proprietary code in a request, secrets in context, and who at their company decides.
Students will be asked this by their security team and the course gives them nothing.

**M14 — Licensing and provenance of generated code.** Not mentioned.

**M15 — Everyday git hygiene.** `steering` prints `git worktree add` twice as ordinary practice and
`goals` closes on merging back in pieces. What is missing is the plainest layer under all of it:
branch per task, small reviewable commits, and never letting an agent commit blind. Three places now
assume it without stating it.

---

## 8. What a professional would still miss

Reading the course end to end as a working Java developer, ranked by how soon each arises in real
use:

1. **"It's stuck in a loop."** (M2) — arises in week one, and it is the nearest neighbour of a
   question the course now answers well, which makes the omission more conspicuous.
2. **"How do I review 600 lines I didn't write?"** (M12) — arises immediately and permanently, and
   three units tell the student this is where their day goes.
3. **"What did that actually cost?"** (M6, M8) — arises the first time someone asks. The course can
   now price a token and still cannot answer this.
4. **"Am I allowed to point this at our codebase?"** (M13) — arises before any of the above, and is
   the one most likely to stop adoption outright.
5. **"When should I just write it myself?"** (M11) — the mark of the mature practitioner.
6. **"What is this bad at?"** (M3) — currently learned by being burned.

Item 4 is the one that will be asked by someone other than the student, which makes it
disproportionately important in a corporate setting.

---

## 9. Prioritised recommendations

### Tier 1 — fix now, cheap, high return

1. **Correct the "two skills" claim** in three prose places, both languages, plus the `ProjectTree`
   figure and its docstring. It is four now. (I1)
2. **Rewrite the `patterns` script argument** so it reflects that `adding-a-step` exists, or create
   `scripts/new-step.sh` so the claim becomes true. Leaving a fictional path in the unit that teaches
   conventions is the worst option. (I2)
3. **Cut `steering`'s claim that the previous unit introduced worktrees.** The next sentence already
   defines one from scratch, so nothing is lost. (N2)
4. **Bring the documentation back in line with the step 1 order** now that the reorder is settled:
   root `CLAUDE.md`, `TokenSplit`'s docstring, and the two stale comments beside them. (N7, I12)
5. **Correct `BudgetWindow`'s line counts** to the real values, and the "37 lines" in root
   `CLAUDE.md` with them. The argument holds at 1250 against 24. (I8–I10)
6. **Fix step0's mismatched exercise instruction**, both languages. (I6)
7. **Reword the `SessionMakeup` ten-entries line.** (I4)
8. **Renumber the three drifted key runs** and the one mismatched section slug. (I13)

### Tier 2 — the structural fixes

11. **Break up step 2's prose wall.** The cheapest effective intervention is a short quiz on
    `engineering`, `steering` and `quality` — three questions each, browser-graded, on machinery that
    already exists. That alone fixes C1 and C2. A figure for `steering` would fix the unbroken-text
    half and is the better candidate of the four: interrupt-versus-rewind is two windows side by
    side, which is exactly what step 1's figure vocabulary already draws. (C1, C2, C4)
12. **Decide what a default-mode visitor should see in `intro`.** Either default to `self`, or make
    guided mode show a short summary rather than nothing. Silently rendering a prose-less unit is the
    worst of the three options. What it costs is now the stateless-model argument and the entropy
    section rather than a command, since `/context` left for `tools`. (S1)
13. **Write `INSTRUCTOR.md`** — per-unit timings, demo scripts, workshop checkpoints, a stuck-ladder.
    Guided is the default mode and has the least support. (S4)

### Tier 3 — the content gaps, in order of value

14. **A worked cost example, wherever it fits.** Not a unit any more: `tokens` and `model` did the
    heavy lifting, so what is left is one figure or one section that multiplies a real session's
    token count by a real rate and shows the student how to see both. The nearest host is `model`,
    which already carries the rate, or `session`, which already argues about what fills the window.
    (M6, M8)
15. **`review`** — reading a diff you did not write. Three units name this as the bottleneck. (M12)
16. **Recovery, as a section inside `steering` rather than a unit.** The stuck or looping agent, and
    `git` hygiene as its safety net. Step 2 does not need a ninth unit as much as it needs the six
    wall units broken up. (M2, M15)
17. **`boundaries`** — when not to use an agent, what agents are bad at, and the IP/data-governance
    question. For corporate delivery, M13 alone may justify this unit. It also has somewhere to put
    the task-sizing material that left with `scoping` (N1). (M3, M11, M13)
18. Presenter slides for the guided track. (S3)

### Explicitly not recommended

- Do **not** deduplicate the `intro`/`session` overlap. It is a documented decision.
- Do **not** add an LLM-internals unit. `tokens` now covers exactly as much of tokenisation,
  sampling and attention as a student directing an agent can act on, and it stops there on purpose.
  Anything past that is off-target.
- Do **not** split MCP into its own unit. `tools` covers it properly.
- Do **not** turn `ModelPricing` into a reference table. It is placed between two paragraphs as
  evidence for a ratio, and the paragraph under it tells the student not to learn the numbers.

---

## 10. Open tracker

| # | Item | Note |
|---|---|---|
| 2 | `review` — reading a diff you did not write | named in three units, taught in none |
| 6 | A worked cost example | narrowed to one figure or section; the rate and the unit both exist now |
| 10 | `recovery` — the stuck/looping agent | has a home to go into (`steering`) |
| 11 | `git` — branch per task, small commits | worktrees taught in two units, the plain practice under them in none |
| 12 | Curating the agent's inputs | `CutItUp` works one real problem; `@`-mentions and spec-versus-let-it-read still missing |
| 13 | `delegation` — subagents as a cost lever | pattern taught in `harness` and `model`; the habit still missing |
| 15 | Permissions / settings depth | named only |
| 16 | Workshop scaffolding for guided rooms | — |
| 17 | `INSTRUCTOR.md` | — |

---

## 11. Standing findings

Findings that are not inaccuracies and not gaps, but decisions worth re-examining once.

**N1 — `scoping` was deleted and three topics went with it.** Task sizing, which folder you open the
agent in, and the fuller `.claude` symlink explanation are taught nowhere. Root `CLAUDE.md` records
this as deliberate, so it is not drift. It is worth re-examining because two of the three had
consequences elsewhere in this document: **M11**'s nearest sentence was `scoping`'s, and §3's
"knowing when a task is ready to hand over" went from solid to missing without anything being wrong
with it.

**N2 — `steering` claims the unit before it introduced worktrees. It did not.**
`steering.worktree-each.1` reads "the last unit already gave you the tool for it", in both languages.
`steering` is unit 4 and the unit before it is `engineering`, which never mentions a worktree; the
other worktree section is in `goals`, three units *later*. No reordering fixes this. Cut the clause:
the next sentence already defines a worktree from scratch, so nothing is lost and `goals` becomes the
one that refers back.

**N7 — the repository's documentation describes the previous step 1 order.** The working tree runs
`tokens → prompt → tools → intro → session → harness → model → workshop` and the unit HTML has been
reworked to match. Root `CLAUDE.md` still lists the order as `tokens, intro, prompt, session, tools,
harness, model, workshop`, still says that order is the registry's, and still carries two claims that
the reorder inverted: that `ContextDiagram` is the first frame a student meets (`PromptInContext` is)
and that `intro` defines the word *context* (`prompt` does). `workshop`'s recital of the four layers
is correct against the new order and was wrong against the old one, so that sentence needs no change.

This is the highest-value documentation fix in the repo right now, because `CLAUDE.md` is the file
that tells the next person what is deliberate. A stale claim there costs more than a stale comment:
it is the only place recording *why* the empty oval in `intro` argues anything, and that reasoning
now depends on a different unit than the one it names.
