# Course audit — agentic-engineering kata

**Verified:** 28 July 2026, against `003bf6c` with a clean working tree. Every claim below was
re-checked against the tree; nothing is carried forward on trust.

**This document holds open findings only.** Anything solved is deleted rather than ticked, so there
is no history here and no closure notes to read past. Finding ids (I1, M12, S5, N2) stay stable
across passes, which is why they have gaps: a gap means that item is gone, not that it moved.

**Question asked:** what is missing, what is inaccurate, what is duplicated, how does the course
sequence and pace, and what would a professional student still miss? The goals this audit measures
against are the author's own: make working professionals **comfortable with AI-driven engineering**,
**aware of costs**, and **strong enough to make the right decisions**.

### What has landed since the last pass, in one paragraph

Three commits, and the audit had seen none of them. `c4eb49e` turned a slide into data: `SlideSpec`,
`SlideTemplate` and `SlideFigure` replaced hand-numbered JSX, step 1 registered **37 slides** through
a new optional `Step.deck`, and the drawings on them are the step's own figure components rather than
redrawings, so board and page cannot drift. That closes the old "the tutor has one slide" finding and
leaves a narrower one (**S3**). `20847e8` did two much larger things. First, **the course became
product-neutral**: a `data-assistant` filter beside the audience one, a new setting in the cogwheel,
and eight paragraph pairs in step 1 that name Claude Code's files and commands or Copilot's.
`copilot-specific.md` at the root is the research behind it, sourced and dated. Second, **`setup` was
rebuilt**: scoping and nesting of `CLAUDE.md`, a personal `~/.claude/CLAUDE.md` section, a rewritten
skills section, a new hooks section, three `FileTree` drawings and, under a "Check yourself" heading,
a **second graded flag board** whose three plaintext flags sit in a skill, a project briefing and a
package briefing inside `kata/step2/java`. Root `CLAUDE.md` lost 456 lines to a new
`front/src/steps/CLAUDE.md` that is now the readable source for what is deliberate about each unit.
`003bf6c` added the eleven files `20847e8` had left untracked, so the two commits are one change and
a checkout of `HEAD` compiles again.

---

## 1. Verdict

The course is **well written, well designed, and less lopsided than it was.** Step 2 finally received
something: its `setup` unit is now the second-best-equipped unit in the kata, and the step's first
graded board outside the capstone sits under it. The gap has narrowed for the first time in four
passes.

Three things hold it back, in order of impact:

1. **Cadence still collapses in step 2, but less far.** Five consecutive units, ~3,650 words, zero
   quizzes and zero checks, ending in the hardest lab in the kata. `setup` broke the wall in the
   middle. Step 1 runs 6,813 words across eight units with eight interactive components and two
   quizzes; step 2 runs 6,255 across eight with two graded boards and one ungraded exercise.
2. **The everyday verb is half there.** `steering` covers interrupting and rewinding. What is still
   missing is recovering when the agent is stuck or looping (**M2**) and reading a diff you did not
   write (**M12**). Both are named in three units apiece and taught in none.
3. **Cost is demonstrated per token and never per run.** `tokens` gives the unit, `model` gives
   dollars per million with a currency in front of them, `harness` prices the cache, `ReadYourWindow`
   has the student read a real count off their own window. No unit multiplies (**M6**, **M8**). The
   Copilot research names `/usage` as the one command that would close this loop, and nothing uses it.

Behind those, two delivery risks specific to this audience. **Nothing covers IP, data governance or
what may leave the building** (**M13**), which is the question a security team asks before anyone
gets to lesson one. And the assistant switch, which is a genuine advance, currently **promises more
than step 2 delivers** (**I15**).

---

## 2. Key strengths

| Strength | Evidence |
|---|---|
| **Exercises withhold the answer** | Every flag ships the puzzle, not the decode. `forTier` ships as a stub, the native-image hint is deliberately unwritten, `problem.md` has no answer key anywhere in the tree, and the three new `setup` flags are named in no unit prose and no board hint. Consistent across 11 flags and 4 hands-on tasks. |
| **Everything grades offline** | Salted SHA-256 in the browser for both quizzes and now three flag boards. The course works with the backend down. |
| **The new `setup` board is the right exercise for its unit** | Three flags, one per place an agent picks instructions up from, sitting in the files they are about inside a project the student has never opened. Plaintext rather than veiled, because reading the file *is* the task. All three hashes were recomputed from the files on disk against `SETUP_FLAG_SALT` and all three match, so the board grades what the project actually contains. |
| **Product-neutrality is done properly** | `data-assistant` is a second filter beside the audience one, removing rather than hiding; variants nest inside audience wrappers and never share an element; each variant carries its own i18n key, so a missing Dutch translation is a visible warning rather than a silent English paragraph. Eight pairs in step 1, all of them a filename or a command, and `harness.lead.1` names both products in one sentence instead of splitting, because that sentence is a list. |
| **What is deliberately *not* split is the better half of that work** | `/clear`, `/context`, plan mode, compaction and the whole of `ReadYourWindow` carry no variant because they are the same in both products, and `front/src/steps/CLAUDE.md` says so in writing. `ModelTiers`, `ModelPricing` and `PickTheTier` stay put, with the reasoning recorded. |
| **`copilot-specific.md` is real research, not a guess** | Ten sourced links, a verification date, an explicit list of what is verified and what is not, and its own list of things the course leaves out on purpose. Rare discipline for authoring material. |
| **The deck is now data, and it draws the step's own figures** | 37 slides for step 1, index and total falling out of array position, `SlideFigure` magnifying the real components so the board cannot drift from the page. The four components that write to localStorage are deliberately kept off the slides so a tutor's machine does not tick itself. |
| **`setup`'s three trees are one drawing seen three times** | `ProjectTree`, `SkillTree` and `HookTree` are all `FileTree` with `dim` set and that section's subject in teal. Only `ProjectTree` numbers its rows, because only its section points back into them. The skills and the hook script are invented on purpose, and the rule that holds it together is that the tree and the `<pre>` beside it name the same thing. |
| **`BudgetWindow` is a genuinely smart exercise** | Grades the **exact set**, not the total, so filling the window and then adding the two right calls fails. |
| **`SpotInjection` teaches a real threat** | Four tool results, two designed to be mistaken for the poisoned one. |
| **The shared-component layer is holding** | `PatternMatch` and `PickTheTier` are both `ConnectBoard`; `CutItUp`, `SurviveTheClear` and `ReadYourWindow` are all `TaskCard`; `SetupFlags` and `Workshop` are both `FlagBoard`, which was renamed out of `Workshop.tsx` to make room for the second caller rather than copied. Each split happened when the second caller arrived, which is the test. |
| **Step 1's figure vocabulary is one system** | Teal frame = context, bar = something in it, dashes = what is not. `ToolsInContext`/`McpServer` are a pair, `McpParts`/`McpOvals` a second pair on shared columns; `TokenSplit`, `TokenAttention`, `PromptInContext` and `ModelTiers` stay outside the frame vocabulary on purpose. |
| **The oval figures escalate rather than repeat** | `PromptInContext` (prompt, no frame) → `ToolsInContext` (first frame, tool across the border) → `McpServer` (same frame, one wire crossing once) → `McpOvals` (three things, still unframed) → `ContextDiagram` (populated window). |
| **The step 2 capstone is real** | Five flags of four shapes, measured by a build rather than by opinion. Still the strongest single asset in the kata. |
| **Dutch is complete** | **353/353** prose keys (22 + 192 + 139), counted against every `data-i18n` key in every unit's HTML with comments stripped, and verified rather than sampled. Sixteen assistant-variant keys and a rebuilt `setup` unit landed in one commit and the Dutch kept up with all of it. |
| **Deliberate design is documented, and the documentation was refactored before it broke** | Root `CLAUDE.md` handed 456 lines to `front/src/steps/CLAUDE.md`, which now loads only when you work under the curriculum. It records *why*, not *what*, and it is honest about the assistant boundary. **N8** and **N9** are the two things it gets wrong. |

---

## 3. Topic assignment

**Legend:** ● solid · ◐ thin · ○ missing · ⟳ duplicated · ⚠ inaccurate

### Context and mechanics (step 1)

| Topic | Where | Status |
|---|---|:--:|
| What a token is; why prose is cheap and ids are dear | `tokens` | ● |
| Next-token prediction and sampling | `tokens`, `NextToken` | ● |
| Attention: every pair, backwards only, quadratic | `tokens`, `TokenAttention` | ● |
| Model is stateless; transcript re-sent | `context`, `session` | ● |
| Model is statistical, not a database | `context`, `tokens` | ● |
| Missing vs wrong context | `context` | ● |
| Entropy in the window | `context` | ● |
| Amnesia / compaction / context fatigue | `context`, `session` | ● |
| The prompt as an authored layer; the word *context* defined | `prompt` | ● |
| Reasoning level and thinking tokens | `prompt`, `model` | ● |
| Meta-prompting and plan mode | `prompt` | ● |
| Bundling work; `/clear` | `prompt`, `session` | ● |
| Session as the only layer with a time axis | `session` | ● |
| Making an instruction survive a `/clear` | `session` / `SurviveTheClear` | ● |
| Prompt caching, and what invalidates it | `harness` | ● |
| What a tool is; the tool loop | `tools` | ● |
| MCP: what it is, wiring one | `tools` | ● |
| What an MCP server offers, and who decides (prompt / resource / tool) | `tools`, `McpParts`, `McpOvals` | ● |
| Tool descriptions cost you by existing | `tools` | ● |
| Tool results are the least trusted layer; prompt injection | `tools` | ● |
| Harness: what it is, who ships it | `harness` | ● |
| Billing model (API key vs subscription vs seat allowance) | `model` | ● |
| Coordinator / sequential / reflection patterns | `harness` | ● |
| Decomposition, and cutting a real under-specified problem | `harness`, `CutItUp` | ● |
| Model tiers as dispositions | `model`, `ModelTiers` | ● |
| Price per token, input vs output vs cache | `model`, `ModelPricing` | ● |
| Choosing a tier for a task | `model` / `PickTheTier` | ● |
| Context observability (`/context`, inspecting the window) | `tools` / `ReadYourWindow` | ● |
| **Which product's files and commands your instructions name** | `welcome`, then 8 blocks across `tools`, `session`, `context`, `model` | ● |

### Engineering habits (step 2)

`setup` was rebuilt by `20847e8`; every other unit is untouched and was re-verified.

| Topic | Where | Status |
|---|---|:--:|
| Iterate small because a version costs an hour | `evolution` | ● |
| Walking skeleton; detail work comes later; the one-hour rule | `evolution` | ● |
| `CLAUDE.md`: what belongs, what it costs | `setup` | ● ⟳ |
| **Instruction files are scoped, and they nest** | `setup`, `ProjectTree` | ● |
| **A personal `~/.claude/CLAUDE.md`, and that it never reaches your team** | `setup` | ● |
| Skills: frontmatter, load-on-match, `references/` | `setup`, `SkillTree` | ● |
| **Being sparing with skills; a description is paid whether or not it fires** | `setup` | ● |
| Hooks: what they are, where they are declared, when to reach for one | `setup`, `HookTree`, `patterns` | ● |
| **Reading the setup of a project nobody walked you through** | `setup` / `SetupFlags` | ● |
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
| **The same habits on a non-Claude assistant** | steps 0–1 only | ⚠ |
| **Recovering a stuck or looping agent** | — | ○ |
| **Reviewing a diff you did not write** | — | ○ |
| **Everyday git hygiene with agents** | — | ○ |
| **Curating inputs (`@`-mentions, spec vs let-it-read)** | `CutItUp` works one real problem | ◐ |
| **Subagents / delegation as a cost lever** | `harness` and `model` name it | ◐ |
| **Permissions depth** | named only | ◐ |

### Cost — the throughline

| Topic | Where | Status |
|---|---|:--:|
| Every token is re-sent every turn | `context`, `session`, `tokens` | ● |
| Reading grows faster than the thing read | `tokens` | ● |
| Prose is cheap, identifiers and JSON are dear | `tokens` | ● |
| Output is priced above input, and why | `tokens`, `model` | ● |
| Price per million, per tier, with a currency | `model` / `ModelPricing` | ● |
| Cache read at a tenth; what invalidates a cache | `harness`, `ModelPricing` | ● |
| How the rates reach you: a key shows the number, a plan or a seat hides it until the limit | `model` | ● |
| Model tiering as a cost lever | `model` | ● |
| `CLAUDE.md` is a bill paid per message | `setup` | ● ⟳ |
| **A skill description rides along on every turn whether or not it fires** | `setup` | ● |
| Tool descriptions ride along every message | `tools` | ● |
| Boundaries reduce reading per turn | `engineering` | ● |
| A correction you send is re-sent forever; a rewind is not | `steering` | ● |
| Two agents are two contexts and two bills | `steering` | ● |
| Coordinator pattern as a cost saving | `harness`, `model` | ● |
| Long runs burn tokens ("four hours is not unusual") | `goals` | ◐ |
| **What one session or one run actually costs, in money** | — | ○ |
| **How to measure what a run cost** | — | ○ |

The last two rows are the whole of what is left here. Every ingredient exists in the tree, in two
adjacent units, and no unit ever multiplies them together.

### Decisions and professional judgement

| Topic | Where | Status |
|---|---|:--:|
| Naming the outcome so a build can answer it | `goals`, `quality` | ● |
| Whether the work so far is worth keeping | `steering` | ● |
| Trusting the build over the agent's word | `quality` | ● |
| Choosing what a task is worth spending on | `model` / `PickTheTier` | ● |
| What belongs to you and what belongs to the repository | `setup`, the personal-file warning | ◐ |
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

Words are counted off the English HTML with tags and comments stripped, **and with the assistant
filter applied**, since roughly a third of a page's variants never render for a given reader. The
Claude Code reading is the default and the one tabulated; the Copilot reading is 88 words longer in
step 1 (`model` 718, `tools` 1072) and identical everywhere else. Figures count `data-figure` slots
outside comments, so `harness` reads 4 and `setup` reads 3, with `PatternMatch` and `SetupFlags`
arriving separately from the registry.

| Unit | Words | Figures | Interactive |
|---|--:|--:|---|
| step0 / welcome | 295 | 3 | 2 code boxes + quiz |
| step0 / backend | 104 | 1 | 1 code box |
| step1 / tokens | 672 | 3 | 3 interactive figures, no quiz, no task |
| step1 / prompt | 635 | 3 | quiz (3q) |
| step1 / tools | 1037 | 7 | `connect-one` + SpotInjection + BudgetWindow + ReadYourWindow |
| step1 / context | 1030 | 3 | quiz (3q) |
| step1 / session | 768 | 2 | SurviveTheClear |
| step1 / harness | 968 | 4 | CutItUp + PatternMatch |
| step1 / model | 665 | 3 | PickTheTier |
| step1 / workshop | 1038 | 0 | FlagBoard (3 flags) |
| step2 / evolution | 790 | 3 | ungraded exercise (15 minutes) |
| step2 / setup | 720 | 3 | **SetupFlags (3 flags)** |
| step2 / engineering | 974 | 1 | **none** |
| step2 / steering | 808 | 0 | **none** |
| step2 / patterns | 607 | 0 | **none** |
| step2 / quality | 579 | 0 | **none** |
| step2 / goals | 681 | 0 | **none** |
| step2 / workshop | 1096 | 0 | Workshop (5 flags) |

Eighteen units. Step 1 is 6,813 words and step 2 is 6,255, so the two steps remain the same size. The
rows that moved since the last pass are `welcome` (+51, the assistant paragraph), `tokens` (+9, a
rewritten lead), `harness` (+2, Copilot joining the list of example harnesses) and `setup` (+111,
three new sections against two cut ones). `setup` also went from one figure to three and from no
check to a graded board, which is the single largest structural change in step 2 since the step was
written. `step2 / quality` at 579 words is now the shortest prose unit in the course, and it has
neither a figure nor a check.

### Cadence defects

**C1 — Step 2 is still a prose wall, now 3,649 words instead of 4,258.** `engineering`, `steering`,
`patterns`, `quality`, `goals`: five units in a row with nothing to do, four of them with no figure
either. `setup` broke the run at position two, which helps the opening of the step and does nothing
for its middle. The student still crosses five unbroken units before a five-flag capstone that is
2–4 hours of real work.

**C2 — Every quiz is still in the first six units of eighteen.** step0/`welcome`, step1/`prompt`,
step1/`context`. After `context` the course never *asks* the student anything again: what it does
instead is hand them boards, at unit 10 (step 1 workshop), unit 12 (`setup`) and unit 18. A board is
a task, not a question, and the difference matters for a guided room where the tutor wants a show of
hands. Step 2 has no `quiz.ts` at all.

**C3 — `tokens` opens the step with nothing to do.** Its three figures are genuinely interactive and
the unit is right to have no quiz (a documented decision). Noted rather than filed as a defect: step
1 opens with a figure-reading unit and the first thing a student is *asked* is two units in. Watch it
if `tokens` grows.

**C4 — Interaction density is still inverted against difficulty, but the gap narrowed for the first
time.** Step 1 carries eight interactive components, three interactive figures and two quizzes; step
2 now carries two graded boards, three new figures and one ungraded exercise. `20847e8` is the first
commit in four to add more to step 2 than to step 1.

### Sequence defects

**S1 — The default mode hides `context`'s entire prose.** `DEFAULT_MODE` is `guided`
(`shared/mode/mode.ts`), and all of `context`'s prose blocks sit inside seven `data-audience="self"`
wrappers. A student who never opens the cogwheel reads that unit as **one diagram and a quiz, with no
prose at all**; `StepContent` renders `null` for filtered-empty content, so nothing signals the
absence. Two of the unit's three figures (`oneshot-compare`, `context-falloff`) carry the attribute
too, so `ContextDiagram` is the only thing left on the page.

`20847e8` made this marginally worse in one specific way. The unit's compaction paragraph is now the
`.claude`/`.copilot` pair `context.amnesia-context-fatigue.3.*`, nested inside the audience wrapper
exactly as the rule requires. It is the one paragraph in the unit that tells a student *which file to
write a surviving instruction into*, and a guided student loses it in both products. What is lost
overall is the stateless-model argument and the entropy section rather than a command, since
`/context` lives in `tools` under `ReadYourWindow`, outside any wrapper. The oval sequence survives
the filter intact, because no `data-figure` slot in `prompt` or `tools` carries an audience
attribute. What is missing in guided mode is the argument, not the pictures.

**S3 — The deck covers step 1 and nothing else.** `c4eb49e` closed the old finding: the deck is data
now, step 1 registers 37 slides through `Step.deck`, and the slides draw the step's own figure
components. What is left is the other seventeen units. Step 0 has the opening question only and step
2 has no `deck.tsx` at all, which is the step whose units are hardest to run at a board because five
of them are unbroken prose. The mechanism is built and proven; only the authoring is missing, so this
is now the cheapest of the delivery gaps rather than the deepest. `welcome` no longer claims slides
are coming, so nothing on the page over-promises.

**S4 — No instructor scaffolding at all.** No `INSTRUCTOR.md`, no per-unit timings, no demo scripts,
no workshop checkpoints, no "if the room is stuck here, do this" ladder. Guided is the default mode
and it now has a deck for one step out of three, which makes the surrounding scaffolding more
conspicuous rather than less.

**S5 — Step 2's order front-loads the heaviest unit, and `setup` grew.** `engineering` (974 words,
DDD + ports and adapters + a four-module Maven layout) is unit 3; `steering` (808 words, immediately
actionable, needs no architecture background) is unit 4. Recommend `evolution → setup → steering →
engineering → …`. `setup` at 720 words with three figures and a board is now a substantial second
unit, which strengthens the case: the step opens well and then asks for architecture before it asks
for anything a student can do on Monday. A judgement call, not a defect, and no ordering fixes
**N2**.

**S6 — Step 1's order is settled, and the chain under it is load-bearing.** `tokens → prompt → tools
→ context → session → harness → model → workshop`. It stays in the audit as the one sequence a future
edit can silently break, because four things depend on the order rather than on any single file:
`prompt` defines the word *context* and `context` must not define it again; `PromptInContext`
deliberately has no frame; `ToolsInContext` is the first teal frame in the step, which is what the
"draws no context frame" notes in `TokenSplit` and `TokenAttention` point at; and `ContextDiagram` is
drawn populated because three figures have already built up to it. Reordering means visiting all
four, plus `workshop`'s recital of the four layers, which is currently correct. The deck adds a fifth
dependent: `steps/step1/deck.tsx` is authored in unit order.

---

## 5. Inaccuracies

Ordered by severity. All verified against the tree at `003bf6c`.

### High

**I15 — The assistant switch promises the whole course and delivers steps 0 and 1.** New this pass,
and it is the cost of an otherwise excellent feature. `welcome.how-to-use-this-document.6` tells the
student: "Set the assistant to the one you actually use. The pages then name its commands and its
files: `copilot mcp add` instead of `claude mcp add`, `.github/copilot-instructions.md` instead of
`CLAUDE.md`." Measured across the tree, **all sixteen assistant-marked elements are in step 1** (8
pairs: `tools` ×4, `model` ×2, `context` ×1, `session` ×1). Step 2 has none, and step 2 is where the
instruction files actually live: `setup` names `CLAUDE.md` five times, one of them the personal
`~/.claude/CLAUDE.md`, plus `.claude/skills/` twice and a `settings.json` hook block, and
`patterns`, `quality`, `goals`,
`engineering` and `workshop` name `CLAUDE.md` nine more times between them. A Copilot student who
set the switch on page one reads a whole step about a file they do not have.

`front/src/steps/CLAUDE.md` states the boundary in writing ("**Steps 0 and 1 are written for two
assistants**"), so this is a known scope line rather than drift. The defect is that the boundary is
recorded in the documentation and not in the promise: nothing a student reads says the switch stops
at the end of step 1. The cheap fix is one clause in `welcome.how-to-use-this-document.6`, in both
languages. The real fix is variants in `setup`, which `copilot-specific.md` already has the sourced
material for (custom-instruction file names and the reload caveat are both in there).

One consequence to decide separately: `SetupFlags` sends the student into `kata/step2/java` to find
three flags in a `.claude` skill, a `CLAUDE.md` and a package `CLAUDE.md`. Those files exist for
every reader, so the exercise works either way, but what it teaches a Copilot student is Claude
Code's layout. That is defensible (the repo is the worked example) and worth one sentence somewhere.

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

**I1 — "This repository has two skills." It has four.** Narrowed to one place. `setup` no longer
counts them: its skills section is built on the invented `add-endpoint` and `SkillTree`, both
documented as deliberate, and `ProjectTree` was cut back to CLAUDE.md files only. What survives is
`patterns.lead.2`, "This repository has two of those already", against `.claude/skills/` holding
**`adding-a-step`, `lesson-writing`, `quiz-writing`, `repo-setup`**. One prose key, two languages.

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

**I8–I10 — `BudgetWindow`'s line counts do not match the repository.** Re-measured against
`kata/step1/java/src/main/java/…/step1/`:

| Figure says | Actual |
|---|--:|
| `TitleController.java` = 34 lines | 24 |
| every file under `services/` = 2140 lines | 1250 |
| "Fifty stage classes" | 51 (52 `*Stage.java` files, one of which is the `CatalogStage` interface) |

The numbers are *data* rather than prose and the grading is on the exact set, so nothing breaks. But
the task is framed against *this* repository ("You are adding a `?limit=` parameter to `GET
/api/titles`"), and a student who checks will find them invented. The argument survives at real
values: 1250 against 24 is still overwhelming. Also, `budget.explanation.tree`'s "longer than the
controller by a factor of eight" is 7.6× on the figure's own numbers (260 against 34) and ~11×
against the real 24-line controller.

One knock-on, which moved rather than closed: the "two right calls come to 37 lines" note left root
`CLAUDE.md` in the restructure and now lives as a comment at `tools.html:187`. Correcting the
controller to 24 makes it 27, so the fix is still two files.

**I12 — Two comments describe code that has changed under them.** Both internal, neither
student-facing, both cheap:

- `evolution.html:38` says the `walking-skeleton` slot is "Filled by the **WalkingSkeleton**
  element"; the registry binds `UnitShot` (`steps/step2/index.tsx`). The `added-details` comment 23
  lines below names `UnitShot` correctly, so two comments about two slots filled by one component
  disagree.
- `tokens.html:68`, above `tokens.one-at-a-time.4`: "it is what the branch button on the figure above
  is for". `NextToken` has exactly one `<Button>` and it advances or restarts; the branch tree is
  drawn without being asked for, which is a documented decision. There is no branch button.

### Verified correct (stated so the next pass does not re-check)

All three graded thresholds still match `FlagRevealIT` (`COVERAGE_FLOOR = 90.0`,
`COMPLEXITY_CEILING = 10`, `MUTATION_FLOOR = 80.0`). "Forty-one stages restore a string" and "eleven
of them comment out the publish" are exact, out of 51 concrete stage classes. Java 25, AssertJ, the
`graded`/`challenge`/`intro` profiles, the absence of a `native` profile, the nine titles, and the
`MemberStatements.forTier` / `Step2Application` names are accurate. Every `cd kata/stepN/java` path in
a unit matches the layout. `NextToken`'s taken-path invariant holds across all three passes;
`tokens.reads-all.3`'s arithmetic is right (7 tokens → 21 pairs, 14 → 91); `TokenSplit`'s prose row
does contain a word that breaks. `ModelPricing`'s four by-eye checks all hold against its own rows
(input at $1/$3/$5, output at exactly five times input in every row, cache read at a tenth in every
row, Fable at $10 as the ceiling), and `harness`'s "roughly a tenth" is checkable against it.

New this pass. **The three `setup` flags grade correctly**: `sha256(SETUP_FLAG_SALT + flag)` was
recomputed from `kata/step2/java/.claude/skills/writing-style/SKILL.md`, `kata/step2/java/CLAUDE.md`
and `…/step2/domain/CLAUDE.md`, and all three digests match `setup-flags.ts`. The three flags appear
nowhere else in the tree, no unit prose names those files and no board hint does either. **`npm run
build` is green** (tsc -b + vite build), and `npm run lint` reports only the two pre-existing
`only-export-components` warnings in generated `ui/` primitives. **Every prose key run in the course
is contiguous and every section slug matches its heading**, checked across all eighteen units with
assistant variants folded into the position they share. **Dutch is complete at 353/353 prose
keys**, including all sixteen assistant variants; the English-only keys in `en.json`
(`spot.*`, `budget.call.*`, `tiers.*.name`) are product and technical names, deliberately untranslated.
`claude mcp add playwright -- npx @playwright/mcp@latest` is correct, and `copilot mcp add` with the
same shape is sourced in `copilot-specific.md`. The `settings.json` hook block in `setup` is
illustrative and documented as such, so the fact that this repo carries only
`.claude/settings.local.json` is no longer a mismatch anyone can catch.

---

## 6. Duplication

### Genuine repetition worth pruning

| Repeated idea | Where | Note |
|---|---|---|
| **Metrics are proxies and get gamed** | `quality.metrics.2`, `workshop.honest.1`, `flag.honest.help` | Three times, near-verbatim; `quality` and `workshop` use almost the same sentence. Keep `quality`'s statement of the principle; let `workshop` name the mutation goal and assume it. |
| **Complexity ceiling of ten** | `engineering`, `goals` ×2, `quality`, `workshop`, flag hint | Six appearances. Fine to repeat as a target; the *argument* for it should be made once. |
| **The new-step file layout** | `patterns.three-places.1`, `quality.write-it-down.2` | Listed twice, near-identically, and `quality` cross-references `patterns` while restating its conclusion. One list, one owner. |
| **`CLAUDE.md` is paid per turn** | `setup.claude-md.2`, `patterns.three-places.2`, `quality.write-it-down.3` | `setup` owns it, and now argues it twice over in one unit (the file, then the skill description). The other two units can reference rather than re-argue. |
| **Git worktrees** | `goals.own-worktree`, `steering.worktree-each`, `workshop.native.2`, `workshop.collect.2`, `flag.native.help` | The two *arguments* are correctly split (`goals`: isolation from your own day; `steering`: one per agent). The **definition** is written twice. `steering` reads first, so it should keep the definition and `goals` should assume it. See **N2**. |
| **"Ask the agent what it has read"** | `session.window-not-memory.4`, `tools.connect-one.5`, `steering.interrupt-or-go-back.5` | Three self-asides asking for the same move. `steering`'s has the best reason to exist (there, the answer proves something). `session` and `tools` are the pair to thin. |
| **"`CLAUDE.md` is read at the start of every session"** | `context.amnesia-context-fatigue.3.*`, `session.window-not-memory.1.*`, `setup.claude-md.1` | Now three, each in two assistant variants, so the sentence exists six times in English and six in Dutch. `context`'s is inside a `self` wrapper and `setup` owns the topic outright, so `session`'s is the one to consider thinning. Any edit here is now a six-place edit, which is an argument for making it sooner. |
| **"None of this is new"** | `evolution.details.1`, `engineering.structure` | The same rhetorical opener twice in one step, word for word. |

### Deliberate overlap — leave alone

`context` and `session` overlap by design, and the reasoning is documented; the paragraphs that
restate `context` are `data-audience="guided"` precisely because guided students never read
`context`'s prose. Do not put it on a pruning list.

`McpParts` and `McpOvals` say the same three words one screen apart, and that is a pair rather than a
repetition: the cards sort the three by who decides, the ovals restate them as the shapes the step
draws things in, on the cards' own columns. They share the `mcp-parts.*.name` keys, which is what
stops the two from drifting. Deduplicating them removes the bridge into `ContextDiagram`.

`ProjectTree`, `SkillTree` and `HookTree` are the same drawing three times, and that is the point:
one `FileTree`, `dim` set, that section's subject in teal. Three sections that each open on the same
picture is how the unit says these are three of one kind of thing. Do not merge them into one tree
with everything highlighted; that is the drawing `ProjectTree` used to be, and it was cut for a
stated reason.

`tokens` touches output pricing and prompt caching and hands both off in one sentence naming the unit
that owns them, which is the same discipline `harness.coordinator.3` follows for decomposition. Three
units sit on this pattern without any of them re-arguing another's material.

One cross-check is load-bearing rather than duplicated: `harness`'s "billed at roughly a tenth" and
`ModelPricing`'s cache-read column say the same thing in two places on purpose, so a student can
verify the claim. If the table is ever refreshed, that sentence has to be refreshed with it.

---

## 7. Missing, against the three course goals

### Goal 1 — comfort with AI-driven engineering

**M2 — Recovering a stuck or looping agent.** The biggest miss. `context` explains entropy as *why* an
agent degrades, and in guided mode that argument is not on the page at all (**S1**). Nothing teaches
the move in the moment: when to `/clear`, when to restate, when to abandon the session and start over
from the code on disk. `session` names `/clear` as a cost lever and as a test of what survives it, not
as a recovery tool. `steering` teaches the correction you make when the agent is going the wrong way,
which is a different situation from the one where it is going nowhere, and its rewind move does not
cover it: rewinding assumes there is a good message to go back to. It has an obvious home
(`steering`) rather than needing a unit of its own.

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
colleague, what to standardise across a team versus leave to individuals. The course now touches the
team exactly twice, and both are footholds rather than coverage: `model`'s billing section asks who
holds the API key in a company and deliberately stops there, and `setup`'s new personal-file warning
says outright that "nothing in here reaches your team. It sits on your machine and not in the
repository, so think twice before a rule the code depends on ends up in it." The second is in the
right step and is the natural place to grow the topic from.

### Goal 2 — awareness of costs

**M6 — The numbers never meet.** `tokens` gives the unit and its ratios, `model` gives dollars per
million per tier, `harness` prices a cache read, `setup` now adds that a skill description is paid on
every turn whether or not it fires. No unit multiplies any of it. There is no worked example
anywhere: no "this session was 40k tokens in and 6k out, here is the bill", no cost for a step 1 flag
hunt, no number a student could take to a manager who asks what this costs per developer per month.

**M8 — Measuring what a run cost.** `goals` says "a run like this burns a lot of tokens, and four
hours is not unusual." The student is never shown how to look. `ReadYourWindow` has them read a real
token count off their own `/context` twice and subtract, so the course does put one observed number
in front of them: what a connected MCP server costs by existing. What is missing is the step from an
observed count to an observed bill. **The assistant work handed this a new answer and the course has
not taken it**: `copilot-specific.md` ranks `/usage`, which puts credits on screen for the session
just run, as its own first candidate, at a cost of "one move on a task card, or one sentence". Claude
Code's own usage readout is the mirror of it. This is the cheapest unclosed gap in the audit.

**M10 — Delegation as a cost lever.** `harness` teaches the coordinator pattern and `model` adds why
the split works. Neither tells a student when to actually reach for a subagent in their own work.

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
Students will be asked this by their security team and the course gives them nothing. Two things now
sit next to the hole without filling it: `model`'s billing section ends on who holds the key, and
`setup`'s personal-file warning is the course's first sentence about a file's blast radius. Neither
is an answer, and the second shows the register the missing material would be written in.

**M14 — Licensing and provenance of generated code.** Not mentioned.

**M15 — Everyday git hygiene.** `steering` prints `git worktree add` twice as ordinary practice and
`goals` closes on merging back in pieces. What is missing is the plainest layer under all of it:
branch per task, small reviewable commits, and never letting an agent commit blind. Three places
assume it without stating it.

---

## 8. What a professional would still miss

Reading the course end to end as a working Java developer, ranked by how soon each arises in real
use:

1. **"It's stuck in a loop."** (M2) — arises in week one, and it is the nearest neighbour of a
   question the course now answers well.
2. **"How do I review 600 lines I didn't write?"** (M12) — arises immediately and permanently, and
   three units tell the student this is where their day goes.
3. **"What did that actually cost?"** (M6, M8) — arises the first time someone asks. The course can
   price a token, has the student read a real count, and still cannot answer this.
4. **"Am I allowed to point this at our codebase?"** (M13) — arises before any of the above, and is
   the one most likely to stop adoption outright.
5. **"I'm on Copilot: does step 2 apply to me?"** (I15) — arises the moment a student who set the
   switch reaches `setup` and reads a step about a file they do not have. New this pass, and the only
   item on this list the course created for itself.
6. **"When should I just write it myself?"** (M11) — the mark of the mature practitioner.
7. **"What is this bad at?"** (M3) — currently learned by being burned.

Item 4 is the one that will be asked by someone other than the student, which makes it
disproportionately important in a corporate setting.

---

## 9. Prioritised recommendations

### Tier 1 — cheap, high return

1. **Scope the assistant promise in `welcome`**, both languages, so it says the pages name your
   product's files where the two differ, and does not imply every page does. Then decide whether
   `setup` gets Copilot variants; `copilot-specific.md` already carries the sourced material. (I15)
2. **Rewrite the `patterns` script argument** so it reflects that `adding-a-step` exists, or create
   `scripts/new-step.sh` so the claim becomes true. Leaving a fictional path in the unit that teaches
   conventions is the worst option. (I2)
3. **Correct `patterns.lead.2`'s "two"** to four, both languages. It is the last survivor of the
   two-skills claim. (I1)
4. **Cut `steering`'s clause claiming the previous unit introduced worktrees.** The next sentence
   already defines one from scratch, so nothing is lost. (N2)
5. **Fix the two stale comments** — `evolution.html:38`'s `WalkingSkeleton` and `tokens.html:68`'s
   branch button. (I12)
6. **Document `McpOvals`** in `front/src/steps/CLAUDE.md`, whose line 178 still says `McpParts`
   "closes that section". It does not. (N8)
7. **Fix the "only exercise outside `workshop`" sentence** in the same file, which `setup`'s new
   board made false. (N9)
8. **Correct `BudgetWindow`'s line counts** to the real values, and the "37 lines" comment at
   `tools.html:187` with them. The argument holds at 1250 against 24. (I8–I10)
9. **Fix step0's mismatched exercise instruction**, both languages. (I6)
10. **Reword the `SessionMakeup` ten-entries line.** (I4)

### Tier 2 — the structural fixes

11. **Break up step 2's remaining prose wall.** `setup` showed exactly how, and the pattern is
    repeatable: the cheapest effective intervention now is a short quiz on `engineering`, `steering`
    and `quality`, three questions each, browser-graded, on machinery that already exists. A figure
    for `steering` would fix the unbroken-text half and is the better candidate of the four:
    interrupt-versus-rewind is two windows side by side, which is what step 1's figure vocabulary
    already draws. (C1, C2, C4)
12. **Decide what a default-mode visitor should see in `context`.** Either default to `self`, or make
    guided mode show a short summary rather than nothing. Silently rendering a prose-less unit is the
    worst of the three options, and the paragraph a guided student now loses is the one naming the
    file an instruction has to be written into. (S1)
13. **Author step 2's deck.** The mechanism is built, proven over 37 slides and drawing the step's
    own components; step 2 has three figures now and five prose units that are hardest to run at a
    board. (S3)
14. **Write `INSTRUCTOR.md`** — per-unit timings, demo scripts, workshop checkpoints, a stuck-ladder.
    (S4)

### Tier 3 — the content gaps, in order of value

15. **A worked cost example, wherever it fits.** Not a unit: `tokens`, `model` and `ReadYourWindow`
    did the heavy lifting, so what is left is the multiplication. Two candidate moves, and the
    research picked the better one: add `/usage` (Copilot) or the equivalent usage readout beside
    `ReadYourWindow`, which puts a bill on screen for the session the student just ran. The
    alternative is multiplying the observed count by `ModelPricing`'s input rate. (M6, M8)
16. **`review`** — reading a diff you did not write. Three units name this as the bottleneck. (M12)
17. **Recovery, as a section inside `steering` rather than a unit.** The stuck or looping agent, and
    `git` hygiene as its safety net. (M2, M15)
18. **`boundaries`** — when not to use an agent, what agents are bad at, and the IP/data-governance
    question. For corporate delivery, M13 alone may justify this unit. It also has somewhere to put
    the task-sizing material that left with `scoping` (N1). (M3, M11, M13)

### Explicitly not recommended

- Do **not** deduplicate the `context`/`session` overlap. It is a documented decision.
- Do **not** merge `McpParts` and `McpOvals`. They are a deliberate pair on shared columns and
  shared keys, and the second is the bridge into `ContextDiagram`.
- Do **not** merge `setup`'s three trees, and do not put the skills back into `ProjectTree`. Three
  sections opening on the same drawing is the argument.
- Do **not** replace `SkillTree`'s invented skills with this repo's real four. They belong to the
  person writing the course, not the person taking it, and a testing skill is ruled out separately
  because `quality` asks the student to write one.
- Do **not** add an LLM-internals unit. `tokens` covers exactly as much of tokenisation, sampling and
  attention as a student directing an agent can act on, and it stops there on purpose.
- Do **not** split MCP into its own unit. `tools` covers it properly, three figures and a definition
  deep.
- Do **not** turn `ModelPricing` into a reference table, do not drop its frontier row, and do **not**
  add a second currency for the Copilot reader. The table is evidence for a ratio; a second set of
  figures turns both into the price list `model.cost.3` tells the student not to learn.
- Do **not** fix **S1** by writing `/context` back into `context`. The command's introduction belongs
  with the task that runs it, which is `ReadYourWindow` in `tools`.

---

## 10. Open tracker

| # | Item | Note |
|---|---|---|
| 2 | `review` — reading a diff you did not write | named in three units, taught in none |
| 6 | A worked cost example | `/usage` is the named, sourced, one-sentence way to close it |
| 10 | `recovery` — the stuck/looping agent | has a home to go into (`steering`) |
| 11 | `git` — branch per task, small commits | worktrees taught in two units, the plain practice under them in none |
| 12 | Curating the agent's inputs | `CutItUp` works one real problem; `@`-mentions and spec-versus-let-it-read still missing |
| 13 | `delegation` — subagents as a cost lever | pattern taught in `harness` and `model`; the habit still missing |
| 15 | Permissions depth | named only; hooks and settings now covered by `setup` |
| 16 | Workshop scaffolding for guided rooms | — |
| 17 | `INSTRUCTOR.md` | — |
| 18 | Step 2 on a second assistant | the switch exists, the step does not use it |
| 19 | Step 2's deck | mechanism proven on step 1's 37 slides |

---

## 11. Standing findings

Findings that are not inaccuracies and not gaps, but decisions worth re-examining once.

**N1 — `scoping` was deleted and three topics went with it.** Task sizing, which folder you open the
agent in, and the fuller `.claude` symlink explanation are taught nowhere. This is recorded as
deliberate, so it is not drift. It is worth re-examining because two of the three had consequences
elsewhere in this document: **M11**'s nearest sentence was `scoping`'s, and §3's "knowing when a task
is ready to hand over" went from solid to missing without anything being wrong with it. The rebuilt
`setup` reclaimed one adjacent piece of it, the scoping of instruction files, which is a different
thing from the scoping of tasks.

**N2 — `steering` claims the unit before it introduced worktrees. It did not.**
`steering.worktree-each.1` reads "the last unit already gave you the tool for it", in both languages.
`steering` is unit 4 and the unit before it is `engineering`, which never mentions a worktree; the
other worktree section is in `goals`, three units *later*. No reordering fixes this. Cut the clause:
the next sentence already defines a worktree from scratch, so nothing is lost and `goals` becomes the
one that refers back.

**N8 — `McpOvals` is in the tree and in no documentation.** `tools` renders seven figures and
`mcp-ovals` is the fourth of them, between `McpParts` and the "list itself is in the window" section.
The restructure carried the problem across intact: `front/src/steps/CLAUDE.md:178` now says
"`McpParts` is the third figure and **closes that section**". It does not; `McpOvals` does. The
component's own docstring is thorough about why it exists and what is load-bearing in it (the shared
columns, the borrowed `ContextDiagram` radii and fills, the shared `mcp-parts.*.name` keys, the
deliberate absence of a frame), so nothing is undocumented at the file level. What is missing is the
one place a reader looks to find out that the figure exists at all, and that file sets out the oval
sequence as three figures with a frame decision recorded for each. `McpOvals` is a fourth step in
that sequence whose frame decision lives only in the component, so the file that exists to say what
is deliberate is the one place that would let someone add a frame without knowing they broke
anything.

**N9 — `front/src/steps/CLAUDE.md` contradicts itself about step 2's exercises.** Line 400 calls
`evolution`'s fifteen-minute task "the step's only exercise outside `workshop`"; line 489 says
`setup`'s board "is the only exercise outside `workshop` **that a machine grades**". The second is
right and the first was true until the same commit added the board. The paragraph above it also
describes step 2's seven prose units as "all of them framing prose with no quiz", which is still
literally true and now reads as though nothing in them is checkable. One sentence, one file.

**N11 — One change went out as two commits, and the first of them did not build.** `20847e8`
committed a `step2/index.tsx` importing four components that were not added until `003bf6c`, and a
`main.tsx` importing an assistant module that arrived with them. `003bf6c` closed it, so `HEAD` is
whole and this is history rather than a defect. It stays here for one pass because of what it says
about the repo's own rules: "leave every step green, each step its own commit" is a rule this
repository states and the course is about to start teaching (**M15**), and the check that would have
caught it is the `npm run build` the frontend already documents as its type check. Worth one line in
a pre-commit hook, which is also the worked example `setup`'s hooks section is short of.
