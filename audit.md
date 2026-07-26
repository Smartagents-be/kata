# Course audit — agentic-engineering kata

**Date:** 26 July 2026. Verified against the working tree at `b99da34`.

**Question asked:** what is missing, what is inaccurate, what is duplicated, how does the course
sequence and pace, and what would a professional student still miss? The course goal this audit
measures against is the author's own: make working professionals **comfortable with AI-driven
engineering**, **aware of costs**, and **strong enough to make the right decisions**.

This replaces the previous `audit.md` (25 July), which answered a different question ("does this
fill six hours?"). That document's open tracker is carried forward in §10 rather than discarded.

---

## 1. Verdict

The course is **well written, well designed, and structurally lopsided.**

What is here is unusually good. The prose has a real voice, the exercises withhold the answer
instead of demonstrating it, everything grades offline, and step 1's teaching of *context* is
genuinely the best part of the material. Dutch is 100% complete. None of that is common.

Three things hold it back, in order of impact:

1. **The cost goal is asserted, never demonstrated.** There is not a single number anywhere in the
   16 units. No token count, no price, no percentage, no duration, no model name. A student finishes
   the course believing cost matters and unable to estimate, measure or reduce it. This is the
   largest gap against a stated goal.
2. **Cadence collapses in step 2.** Seven consecutive units, ~4,600 words, with zero quizzes, zero
   exercises and zero checks, ending abruptly in the hardest lab in the kata. Every quiz in the
   entire course sits in the first three units.
3. **The everyday verb is missing.** The course teaches how to *start* an agent well (prompt,
   scoping, goals) and how to *judge the result* (quality, the build). It never teaches what happens
   in between: steering a running agent, correcting it mid-flight, recovering when it is stuck, and
   reading a diff you did not write. For "comfort", that is the gap that matters most.

Everything else in this document is smaller than these three.

---

## 2. Key strengths

| Strength | Evidence |
|---|---|
| **Exercises withhold the answer** | Every flag ships the puzzle, not the decode. `forTier` ships as a stub, the native-image hint is deliberately unwritten, the dead branch carries no explaining comment. Enforced consistently across 8 flags. |
| **Everything grades offline** | Salted SHA-256 in the browser for all quizzes and both flag boards. The course works with the backend down, which is the right call for a classroom. |
| **`BudgetWindow` is a genuinely smart exercise** | Grades the **exact set**, not the total, so filling the window and then adding the two right calls fails. It defeats the obvious cheat by construction. |
| **`SpotInjection` teaches a real threat** | Four tool results, two designed to be mistaken for the poisoned one. Prompt injection via MCP is the single most practically important security point for this audience, and it is taught properly. |
| **Step 1's figure vocabulary is one system** | Teal frame = context, bar = something in it, dashes = what is not. `ToolsInContext` and `McpServer` are deliberately a pair. Diagrams argue rather than decorate. |
| **The step 2 capstone is real** | Five flags of four different shapes (graded profile, running service, native image), measured by a build rather than by opinion. This is the strongest single asset in the kata. |
| **Dutch is complete** | 273/273 prose keys across all three steps. Verified, not sampled. |
| **Prose voice** | Consistent, spoken, no filler, no em-dashes. The `lesson-writing` skill is visibly working. |
| **Deliberate design is documented** | `CLAUDE.md` records *why* things are shaped as they are, not what they say. Rare and valuable. |

---

## 3. Topic assignment

Every topic the course touches or should touch, classified.

**Legend:** ● solid · ◐ thin · ○ missing · ⟳ duplicated · ⚠ inaccurate

### Context and mechanics (step 1)

| Topic | Where | Status |
|---|---|:--:|
| Model is stateless; transcript re-sent | `intro`, `session` | ● |
| Model is statistical, not a database | `intro` | ● |
| Missing vs wrong context | `intro` | ● |
| Entropy in the window | `intro` | ● ⟳ |
| Amnesia / compaction / context fatigue | `intro`, `session` | ● |
| The prompt as an authored layer | `prompt` | ● |
| Reasoning level and thinking tokens | `prompt` | ● |
| Meta-prompting and plan mode | `prompt` | ● |
| Bundling work; `/clear` | `prompt`, `session` | ● |
| Session as the only layer with a time axis | `session` | ● |
| You authored almost none of it by volume | `session` | ● |
| Prompt caching | `session`, one clause | ◐ |
| What a tool is; the tool loop | `tools` | ● |
| MCP: what it is, wiring one | `tools` | ● |
| Tool descriptions cost you by existing | `tools` | ● |
| Tool results are the least trusted layer | `tools` | ● |
| Prompt injection | `tools` | ● |
| Harness: what it is, who ships it | `harness` | ● |
| Billing model (API key vs subscription) | `harness`, one sentence | ◐ |
| Coordinator / sequential / reflection patterns | `harness` | ● ⚠ |
| Decomposition | `harness`, named only | ◐ |
| **Tokens: what one is, how to count** | — | ○ |
| **Model families and choosing between them** | — | ○ |
| **Context observability (`/context`, inspecting the window)** | — | ○ |

### Engineering habits (step 2)

| Topic | Where | Status |
|---|---|:--:|
| Iterate small because a version costs an hour | `evolution` | ● |
| Walking skeleton; detail work comes later | `evolution` | ● |
| The one-hour detail rule | `evolution` | ● |
| `CLAUDE.md`: what belongs, what it costs | `setup` | ● ⟳ |
| Skills: frontmatter, load-on-match, `references/` | `setup` | ● ⚠ |
| Hooks | `setup`, `patterns` | ◐ |
| Vibe coding vs agentic engineering | `engineering` | ● |
| Domain language as compression | `engineering` | ● |
| Checks as part of the work | `engineering`, `quality` | ● ⟳ |
| DDD + ports and adapters | `engineering` | ● |
| Boundaries cut token cost | `engineering` | ● |
| Task sizing | `scoping` | ● |
| Which folder you open the agent in | `scoping` | ● |
| The `.claude` symlink trap | `scoping`, `engineering` | ● ⟳ |
| The third-time rule | `patterns` | ● |
| `CLAUDE.md` vs skill vs hook vs script | `patterns` | ● ⚠ |
| The build decides, not the agent | `quality` | ● |
| Coverage, complexity, mutation | `quality`, `workshop` | ● ⟳ |
| Metrics are proxies and get gamed | `quality`, `workshop` | ● ⟳ |
| Over-commenting / under-logging | `quality` | ● |
| Goal vs instruction | `goals` | ● |
| Long autonomous runs and their price | `goals` | ● |
| Git worktrees | `goals`, `workshop` | ● ⟳ |
| **Steering a running agent** | — | ○ |
| **Recovering a stuck or looping agent** | — | ○ |
| **Reviewing a diff you did not write** | — | ○ |
| **Everyday git hygiene with agents** | — | ○ |
| **Curating inputs (`@`-mentions, spec vs let-it-read)** | — | ○ |
| **Subagents / delegation as a cost lever** | `harness` names it | ◐ |
| **Permissions and settings depth** | named only | ◐ |

### Cost — the throughline

| Topic | Where | Status |
|---|---|:--:|
| Every token is re-sent every turn | `intro`, `session` | ● |
| Long sessions cost more per message | `intro`, `session` | ● |
| `CLAUDE.md` is a bill paid per message | `setup` | ● ⟳ |
| Tool descriptions ride along every message | `tools` | ● |
| Boundaries reduce reading per turn | `engineering`, `scoping` | ● |
| Coordinator pattern as a cost saving | `harness` | ● |
| Long runs burn tokens ("four hours is not unusual") | `goals` | ◐ |
| **Any actual number** | — | ○ |
| **Input vs output vs cache pricing** | — | ○ |
| **How to measure what a run cost** | — | ○ |
| **Model tiering as the primary cost lever** | — | ○ |
| **Caching turned into an actionable habit** | — | ○ |

### Decisions and professional judgement

| Topic | Where | Status |
|---|---|:--:|
| Naming the outcome so a build can answer it | `goals`, `quality` | ● |
| Knowing when a task is ready to hand over | `scoping` | ● |
| Trusting the build over the agent's word | `quality` | ● |
| **When *not* to use an agent at all** | — | ○ |
| **What agents are reliably bad at** | — | ○ |
| **IP, data governance, what may leave the building** | — | ○ |
| **Licensing of generated code** | — | ○ |
| **Trust calibration: when to verify, when to accept** | — | ○ |
| **Team norms: review, disclosure, onboarding colleagues** | — | ○ |

---

## 4. Cadence and sequence

### Measured

| Unit | Words | Figures | Interactive |
|---|--:|--:|---|
| step0 / welcome | 381 | 3 | 2 code boxes + quiz |
| step0 / backend | 155 | 1 | 1 code box |
| step1 / intro | 1141 | 4 | quiz (3q) |
| step1 / prompt | 695 | 3 | quiz (3q) |
| step1 / session | 818 | 1 | **none** |
| step1 / tools | 995 | 4 | task + SpotInjection + BudgetWindow |
| step1 / harness | 629 | 3 | PatternMatch |
| step1 / workshop | 1028 | 0 | FlagBoard (3 flags) |
| step2 / evolution | 532 | 3 | **none** |
| step2 / setup | 604 | 1 | **none** |
| step2 / engineering | 969 | 1 | **none** |
| step2 / scoping | 620 | 0 | **none** |
| step2 / patterns | 601 | 0 | **none** |
| step2 / quality | 572 | 0 | **none** |
| step2 / goals | 679 | 0 | **none** |
| step2 / workshop | 1091 | 0 | Workshop (5 flags) |

### Cadence defects

**C1 — Step 2 is a 4,577-word prose wall.** Seven units in a row with nothing to do. Four of them
(`scoping`, `patterns`, `quality`, `goals`) have no figure either, so they are unbroken text. Then
the student hits a five-flag capstone that is 2–4 hours of real work. That is the worst pacing
transition in the course: the flattest run leads directly into the steepest climb.

**C2 — All quizzes are in the first three units.** step0/`welcome`, step1/`intro`, step1/`prompt`.
After unit 4 of 16, the course never asks the student a question again until a flag board. Retrieval
practice stops exactly where the material gets harder.

**C3 — `step1/session` is the step 1 dip.** 818 words, one figure, nothing to do — and it sits
between two of the most interactive units in the course (`prompt` with a quiz, `tools` with three
exercises). It is also the unit carrying the most important single idea in step 1 ("careful session
management is most of what separates people who get good work out of an agent from people who fight
it") and it has no exercise attached to that claim.

**C4 — Interaction density is inverted against difficulty.** Step 1 (conceptual, easier) carries 4
interactive components and 2 quizzes. Step 2 (habits, harder, more consequential) carries 1. The
scaffolding is thickest where the material is thinnest.

### Sequence defects

**S1 — The default mode hides the foundational unit.** `DEFAULT_MODE` is `guided`
(`shared/mode/mode.ts`), but `step1/intro`'s entire prose sits inside four `data-audience="self"`
wrappers. A student who lands on the site and never opens the cogwheel reads the course's
foundational unit as **two diagrams and a quiz, with no prose at all**. `StepContent` renders `null`
for filtered-empty content, so nothing signals that anything is missing.

This is defensible in a classroom where the tutor delivers `intro` at the board. It is not
defensible as the default for anyone arriving alone, which is one of the three reading modes
`welcome` explicitly promises.

**S2 — Audience tagging has produced dangling cross-references.** This is the sharpest structural
problem, because it breaks in *both* directions:

- `tools` says "exactly like the three large files from the session unit." That sentence
  (`session.sessions-where-money.1`) is `data-audience="guided"`. **A self-learner never read it.**
- `prompt`, `tools` and `session` each refer back to "the entropy from the opening unit." `intro`'s
  prose is `self`-only. **A guided student never read it** — three dead callbacks to a unit they
  saw only as diagrams.

Every cross-unit reference needs to be checked against the audience of its target. Right now at
least four land on nothing for one audience or the other.

**S3 — The tutor has one slide.** `shared/deck/slides.tsx` sets `TOTAL = 1` — the opening question,
"Where lies the line between vibe coding and agentic engineering?" Guided is the *default* mode, and
there is no presenter material for the remaining 15 units. (step0/`welcome` says "Slides are not
built yet. They are coming soon," so the content is honest about this; the gap is real, not drift.)

**S4 — No instructor scaffolding at all.** No `INSTRUCTOR.md`, no per-unit timings, no demo scripts,
no workshop checkpoints, no "if the room is stuck here, do this" ladder. For a course whose default
mode is guided, this is the biggest delivery gap after the slides.

**S5 — Step 2's order front-loads the heaviest unit.** `engineering` (969 words, DDD + ports and
adapters + a four-module Maven layout) is unit 3, ahead of `scoping` (620 words). `scoping` is more
fundamental, more immediately actionable, and needs no architecture background. Consider
`evolution → setup → scoping → engineering → patterns → quality → goals`. This is a judgement call,
not a defect, but the current order asks for the most background earliest.

**S6 — Step 1's order is sound.** `intro → prompt → session → tools → harness → workshop` builds
correctly, and the `tools`-before-`harness` swap is right: a student needs to know what a tool is
before hearing that the harness decides which exist. No change recommended.

---

## 5. Inaccuracies

Ordered by severity. All verified against the tree.

### High

**I1 — "This kata has two skills." It has three.**
Stated in `setup.lead.3` ("the `CLAUDE.md` and the two skills today"), `setup.skills.1` ("This kata
has two: `lesson-writing` … and `quiz-writing`"), `patterns.lead.2` ("This repository has two of
those already"), and drawn as two in the `ProjectTree` figure. `.claude/skills/` actually contains
**`adding-a-step`, `lesson-writing`, `quiz-writing`**. Root `CLAUDE.md` explicitly points students
at `adding-a-step`. Four places to fix, plus the figure.

**I2 — The `patterns` argument is stale, and its worked example does not exist.**
`patterns.three-places.4` proposes: "Ask Claude to write the script, once: `scripts/new-step.sh
step3` creates the folder, both locale files, the unit stub and the registry line." There is **no
`scripts/` directory** in this repository. Worse, the repo already solved this exact problem the
*other* way — with the `adding-a-step` skill — so the unit argues for a script while the codebase
demonstrates a skill, and the student can check.

The path is written in code voice and reads as real. `quality.write-it-down.2` repeats the same
argument and cross-references `patterns`, so the staleness is in two units.

This one matters more than its size: `patterns` is the unit teaching students to notice when a
convention needs a home, and its own example is out of date with the repository it points at.

### Medium

**I3 — "The idea comes from GANs" is wrong as lineage.**
`harness.reflection.1`, on the reflection pattern. Reflection and self-critique in agent systems
trace to Reflexion, Self-Refine and constitutional/self-critique methods. A GAN is a *loose analogy*
(one thing produces, another attacks), not an ancestor: GANs are a joint training objective for two
networks, and nothing in agent reflection is trained. This is the one genuine subject-matter error
in the course, and it is in front of an audience likely to know it. Recommend rephrasing to "the
shape is the same as a GAN's" rather than claiming descent.

**I4 — The `SessionMakeup` figure says `/api/titles` returns ten entries.**
Its first block is "Why does `/api/titles` return ten entries?" and its sixth "And where does the
tenth one go?" But `tools.connect-one.4` says "Same nine titles either way" and `workshop.lead.2`
says "Nine book titles come back." The endpoint returns **nine**; ten is the internal count before
the tenth is dropped.

If this is foreshadowing the trace flag, it is too subtle and lands three units early — a student
reads it as a plain factual claim about the endpoint and it contradicts two later units. Recommend
rewording to "why does the pipeline compute ten and return nine?"

**I5 — step0 `backend.lead.2` opens with a broken sentence.**
English reads: "When a step does, the answer box still grades in your browser…". The Dutch is
correct: "Als een stap dat vraagt" ("when a step asks for it"). The English lost its object. Per the
standing convention that Dutch leads when the two disagree, rewrite the English from the Dutch.

**I6 — step0 `backend`'s exercise instruction does not match its exercise.**
Under "Test yourself" the prose says "Open the project from its directory, go to step 1, and complete
the tasks it gives you," then renders a code box. But that box's code (`finishCode` in
`step0/code.ts`) is earned by running `mvn verify -Pintro`, which is shown further up the page only
as an "indicative" example. The student is told to go to step 1 and simultaneously asked for a code
step 1 does not produce. Wrong in **both** languages, so this is a content gap rather than
translation drift.

### Low

**I7 — `settings.json` vs `settings.local.json`.** `setup.skills.7`, `scoping.where-you-start.4` and
the `ProjectTree` figure all name `settings.json`; the repo has only `.claude/settings.local.json`.
`setup.lead.3` does hedge ("read the drawing as the shape rather than an inventory"), so this may be
deliberate. Worth one sentence either way, since `settings.local.json` is the file a student will
actually find and it is gitignored for a reason worth mentioning.

**I8–I10 — `BudgetWindow`'s line counts do not match the repository.**

| Figure says | Actual |
|---|--:|
| `TitleController.java` = 34 lines | 24 |
| every file under `services/` = 2140 lines | 1250 |
| "Fifty stage classes" | 52 |

The exercise's design intent is that these are *data* rather than prose, and the grading is on the
exact set, so nothing breaks. But the task is explicitly framed against *this* repository ("You are
adding a `?limit=` parameter to `GET /api/titles`"), and a student who checks will find the numbers
invented. The argument survives at real values: 1250 lines against 24 is still overwhelming. Fixing
them costs nothing and removes the one thing a sceptical professional would poke at.

Also: the derived claim "longer than the controller by a factor of eight" is 7.6× on the figure's own
numbers and ~11× against the real 24-line controller.

**I11 — Root `CLAUDE.md` never mentions `step0`.** It documents step1 and step2 in detail and is
silent on the step that ships first and is the student's entry point. `PRODUCT.md` was fixed and
correctly says three steps; `CLAUDE.md` was not.

**I12 — Stale HTML comment.** `evolution.html:38` says the slot is "Filled by the **WalkingSkeleton**
element"; the registry registers `UnitShot`.

**I13 — i18n key drift in `prompt`.** Keys run `plan-mode.1, .3, .4, .5` — `.2` is missing, so a
paragraph was deleted without renumbering. Separately, the section slug `reasonable-question-not` no
longer matches its heading ("A prompt is the basis of the instruction"), which breaks the repo's own
rule that a key is a location rather than a summary.

**I14 — `front/README.md` is still the stock Vite template.**

### Verified correct (stated so the next audit does not re-check)

All three graded thresholds match `FlagRevealIT` exactly (90% coverage, complexity 10, 80%
mutation). "Forty-one stages restore a string" and "eleven of them comment out the publish" are both
exact. The `claude mcp add playwright -- npx @playwright/mcp@latest` syntax is correct. Java 25,
AssertJ, the `graded`/`challenge`/`intro` profiles, the absence of a `native` profile, the pinned
step 1 main class, the nine titles, and the `MemberStatements.forTier` / `Step2Application` names are
all accurate.

---

## 6. Duplication

### Genuine repetition worth pruning

| Repeated idea | Where | Note |
|---|---|---|
| **Metrics are proxies and get gamed** | `quality.metrics.2`, `workshop.honest.1`, `flag.honest.help` | Stated three times, near-verbatim. `quality` and `workshop` use almost the same sentence ("a hundred percent coverage from tests that assert nothing"). Keep `quality`'s statement of the principle; let `workshop` assume it and just name the mutation goal. |
| **Complexity ceiling of ten** | `engineering`, `goals` ×2, `quality`, `workshop`, flag hint | Six appearances. The number is fine to repeat as a target; the *argument* for it should be made once. |
| **The new-step file layout** | `patterns.three-places.1`, `quality.write-it-down.2` | Listed twice, near-identically, and `quality` cross-references `patterns` while restating its conclusion ("identical instead of similar" vs "identical rather than similar"). One list, one owner. |
| **`CLAUDE.md` is paid per turn** | `setup.claude-md.2`, `patterns.three-places.2`, `quality.write-it-down.3` | `setup` owns it. The other two can reference rather than re-argue. |
| **The `.claude` symlink** | `engineering.structure.5`, `scoping.where-you-start.4` + its aside | Explained twice. `scoping` is the better home (it is a scoping consequence); `engineering` can name it in passing. |
| **Git worktrees** | `goals.own-worktree`, `workshop.native.2`, `workshop.collect.2`, `flag.native.help` | Four places. `goals` owns the argument; the workshop mentions should be pointers. |
| **"Ask the agent what it has read"** | `session.window-not-memory.4`, `tools.connect-one.5` | The same self-aside twice. Differentiate or drop one. |
| **"`CLAUDE.md` is read at the start of every session"** | `intro.amnesia.3`, `session.window-not-memory.1` | Near-identical sentences. |
| **"None of this is new"** | `evolution.details.1`, `engineering.structure.10` | The same rhetorical opener twice in one step. |
| **Entropy** | `intro.entropy`, then back-referenced in `prompt`, `tools`, `session` | The explanation is fine once; the three back-references are the problem, and see **S2** — for guided students they point at prose that was filtered out. |

### Deliberate overlap — leave alone

`intro` and `session` overlap by design, and `CLAUDE.md` documents the reasoning: `session` does not
re-argue the re-send or the cost per message, and the paragraphs that *do* restate `intro` are
`data-audience="guided"` precisely because guided students never read `intro`'s prose. That is a
considered decision, not duplication. It should not appear on a pruning list — but note it is also
the mechanism that produced the broken cross-references in **S2**, so the decision is sound and its
execution needs an audit pass.

---

## 7. Missing, against the three course goals

### Goal 1 — comfort with AI-driven engineering

**M1 — Steering a running agent.** *The single biggest miss.* The course teaches how to write a good
opening instruction (`prompt`, `scoping`, `goals`) and how to judge the finished result (`quality`).
It never teaches the middle: interrupting, saying "no, do it that way", giving feedback on a partial
result, and the steer-versus-restart decision. `engineering` gets closest ("Stopping it there costs a
sentence") but states it as a principle and moves on. For a professional whose day is spent in that
middle, this is the gap that most affects comfort.

**M2 — Recovering a stuck or looping agent.** `intro` explains entropy as *why* an agent degrades.
Nothing teaches the move in the moment: when to `/clear`, when to restate, when to abandon the
session and start over from the code on disk. `session` names `/clear` as a cost lever, not as a
recovery tool.

**M3 — What agents are reliably bad at.** The course is honest about cost and about trust in tool
results, but never draws the capability boundary: novel algorithms, cross-cutting refactors without
clear seams, performance work, anything where the feedback loop is slow or absent. A student with no
map of the failure modes calibrates by getting burned.

**M4 — Trust calibration.** Related but distinct: a rule of thumb for what to verify and what to
accept. Right now the implicit answer is "verify everything via the build", which is correct and
incomplete — `quality` itself admits "automation stops short of taste."

**M5 — The team dimension.** These are professionals in company training. Nothing covers how a team
adopts this: review norms for agent-written code, whether to disclose it in a PR, how to onboard a
colleague, what to standardise across a team versus leave to individuals.

### Goal 2 — awareness of costs

**M6 — Any number at all.** Verified across all 16 units: no token count, no price, no percentage,
no duration, no model name. The word "token" appears 12 times, never with a figure. The cost
throughline is repeated, well-argued and entirely qualitative. A student leaves convinced cost
matters and unable to estimate it, measure it, or explain it to a manager who asks what this costs
per developer per month.

This is the highest-leverage fix available, because the *argument* is already made everywhere. It
needs one unit that puts numbers on the claims the other units already make.

**M7 — Input vs output vs cache pricing.** `session` says "harnesses cache the front of the pile, so
what has not changed since the last turn is billed at a fraction" — one clause, never developed. Yet
this is the mechanic that makes the entire re-send story affordable, and it has a direct behavioural
consequence: put stable material early, do not invalidate the prefix, batch reads. The course states
the fact and never extracts the habit.

**M8 — Measuring what a run cost.** `goals` says "a run like this burns a lot of tokens, and four
hours is not unusual." The student is never shown how to look. A number they observed themselves
would do more for cost awareness than every qualitative warning in the course combined.

**M9 — Model selection.** Never mentioned. No model family is named anywhere. `prompt` makes the
claim that "a cheaper model driven through a plan routinely beats a one-shot on the expensive one" —
which is a *model-selection* claim — without ever introducing the lineup or how to choose. Choosing
a model is a daily decision and the largest single cost lever a developer controls.

**M10 — Delegation as a cost lever.** `harness` teaches the coordinator pattern and correctly notes
where the saving sits, but nothing tells a student when to actually reach for a subagent in their own
work.

### Goal 3 — strength to make the right decisions

**M11 — When *not* to use an agent.** The biggest missing decision aid. Every unit assumes the agent
is the right tool and optimises how to use it. A course that made professionals *stronger* decision
makers would name the cases where writing it yourself is faster, where the review cost exceeds the
generation saving, and where the task is too ill-defined to hand over. `scoping` gets nearest ("when
you cannot say those three things, the task is not ready to hand over yet") but frames it as "not
yet", never as "not at all".

**M12 — Reviewing a diff you did not write.** `quality` says "that is still you reading the diff" and
stops. Reading code for intent when you did not form the intent is a distinct skill from reviewing a
colleague's PR, and it is now the primary quality gate in an agentic workflow. Named repeatedly,
taught nowhere.

**M13 — IP, data governance and what may leave the building.** For professionals in *company*
training this is a live question and it is absent. `tools` covers prompt injection well — the inbound
threat — but nothing covers the outbound side: which repositories may be opened with an agent, what
happens to proprietary code in a request, secrets in context, and who at their company decides.
Students will be asked this by their security team and the course gives them nothing.

**M14 — Licensing and provenance of generated code.** Not mentioned.

**M15 — Everyday git hygiene.** Worktrees appear as an advanced move for four-hour runs. The ordinary
practice — branch per task, small reviewable commits, never letting an agent commit blind — is
missing, and it is the practical safety net behind every other recommendation in step 2.

---

## 8. What a professional would still miss

Reading the course end to end as a working Java developer, these are the questions it leaves
unanswered — ranked by how soon they arise in real use:

1. **"It's going the wrong way — what do I do right now?"** (M1) — arises in hour one.
2. **"What did that cost, and is it sustainable?"** (M6, M8) — arises the first time someone asks.
3. **"It's stuck in a loop."** (M2) — arises in week one.
4. **"How do I review 600 lines I didn't write?"** (M12) — arises immediately and permanently.
5. **"Which model should I be using?"** (M9) — a daily decision, never addressed.
6. **"Am I allowed to point this at our codebase?"** (M13) — arises before any of the above, and is
   the one most likely to stop adoption outright.
7. **"When should I just write it myself?"** (M11) — the mark of the mature practitioner.
8. **"What is this bad at?"** (M3) — currently learned by being burned.

Items 1–4 are the practical core of "being comfortable". Item 6 is the one that will be asked by
someone other than the student, which makes it disproportionately important in a corporate setting.

---

## 9. Prioritised recommendations

### Tier 1 — fix now, cheap, high return

1. **Correct the "two skills" claim** in four places plus the `ProjectTree` figure. (I1)
2. **Rewrite the `patterns` script argument** so it reflects that `adding-a-step` exists, or create
   `scripts/new-step.sh` so the claim becomes true. Either resolves it; leaving a fictional path in
   the unit that teaches conventions is the worst option. (I2)
3. **Audit every cross-unit reference against its target's audience.** At least four callbacks land
   on filtered-out prose. (S2)
4. **Fix step0's broken English sentence and its mismatched exercise instruction.** (I5, I6)
5. **Correct `BudgetWindow`'s line counts** to the real values — the argument holds at 1250 vs 24.
   (I8–I10)
6. **Reword the GAN attribution** to an analogy. (I3)
7. **Reword the `SessionMakeup` ten-entries line.** (I4)
8. **Add `step0` to the root `CLAUDE.md`.** (I11)

### Tier 2 — the structural fixes

9. **Break up step 2's prose wall.** The cheapest effective intervention is a short quiz on
   `engineering`, `scoping` and `quality` — three questions each, browser-graded, using machinery
   that already exists. That alone fixes C1 and C2. A figure for `scoping` and `goals` would fix the
   unbroken-text half. (C1, C2, C4)
10. **Give `session` something to do.** It carries step 1's most important claim and asks nothing.
    (C3)
11. **Decide what a default-mode visitor should see in `intro`.** Either default to `self`, or make
    guided mode show a short summary rather than nothing. Silently rendering an empty foundational
    unit is the worst of the three options. (S1)
12. **Write `INSTRUCTOR.md`** — per-unit timings, demo scripts, workshop checkpoints, a stuck-ladder.
    Guided is the default mode and has the least support. (S4)

### Tier 3 — the content gaps, in order of value

13. **`steering`** — course-correcting a running agent. (M1) *The single highest-value unit to add.*
14. **`economics`** — one unit that turns the existing cost argument into numbers: what a token is,
    input vs output vs cache, a worked example of a real session, and how to look at what a run cost.
    Fold in model selection (M9) as the primary lever. (M6–M9)
15. **`review`** — reading a diff you did not write. (M12)
16. **`recovery`** — the stuck agent, and `git` hygiene as its safety net. (M2, M15)
17. **`boundaries`** — when not to use an agent, what agents are bad at, and the IP/data-governance
    question. (M3, M11, M13) *For corporate delivery, M13 alone may justify this unit.*
18. Presenter slides for the guided track. (S3)

### Explicitly not recommended

- Do **not** deduplicate the `intro`/`session` overlap. It is a documented decision.
- Do **not** add an LLM-internals unit. Tokenizer mechanics, attention, training — off-target for an
  audience learning to direct an agent. The `economics` unit needs a worked example, not a theory
  section.
- Do **not** split MCP into its own unit. `tools` now covers it properly.

---

## 10. Tracker carried forward

From the 25 July audit, re-verified against the tree today.

| # | Item | Status |
|---|---|:--:|
| 1 | `steering` — course-correcting a running agent | ○ open |
| 2 | `review` — reading a diff you did not write | ○ open |
| 3 | A step 1 lab | ✅ closed (`workshop` flag board) |
| 4 | Foundations bridge: the tool loop, model families | ◐ loop now argued in `tools`; models still ○ |
| 5 | Expand `harness` / `external` from stubs | ✅ closed — `harness` 52→629 words + `PatternMatch`; `external`→`tools` now 995 words |
| 6 | `economics` — cost made quantitative | ○ open |
| 7 | Context observability (`/context`, `/clear`, compaction) | ◐ compaction taught; inspecting the window still ○ |
| 8 | The tool-use loop taught end to end | ✅ closed (`tools`) |
| 9 | Model families and selection | ○ open |
| 10 | `recovery` — the stuck/looping agent | ○ open |
| 11 | `git` — branch per task, small commits | ○ open |
| 12 | Curating the agent's inputs | ○ open |
| 13 | `delegation` — subagents as a cost lever | ◐ pattern taught in `harness`; the habit still ○ |
| 14 | `mcp` deep dive | ✅ closed (`tools` + `McpServer` + `connect-one`) |
| 15 | Permissions / settings depth | ○ open |
| 16 | Workshop scaffolding for guided rooms | ○ open |
| 17 | `INSTRUCTOR.md` | ○ open |
| 18 | `evaluation` was unbacked free text | ✅ closed |
| 19 | Doc drift: `PRODUCT.md` | ✅ closed |
| 20 | Doc drift: `step2/flags.ts` docstring | ✅ closed |

**Closed since the last audit:** items 3, 5, 8, 14, 18, 19, 20 — substantial progress, concentrated
in step 1, which is now the strongest part of the course.

**New in this audit:** the cadence collapse in step 2 (C1–C4), the audience-filtering cross-reference
breakage (S2), the default-mode empty `intro` (S1), the "two skills" and `scripts/new-step.sh`
inaccuracies (I1, I2), and the decision-making gaps M11 and M13.

**Unchanged headline:** `steering` and `review` remain the two most valuable absent units, and
`economics` remains the largest gap against a goal the course explicitly claims.
