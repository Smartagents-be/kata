# Course audit — agentic-engineering kata

**Date:** 26 July 2026. Verified against the working tree at `b99da34`.

**Re-verified:** 27 July 2026, against `3c0042d` plus the uncommitted `harness` decomposition change.
Every claim below was checked against the tree again rather than carried forward. Three commits
landed in between (`cfbf9aa`, `c79035e`, `3c0042d`) and they moved more than the diff suggests: the
Java tree was split into four standalone projects under `kata/stepN/java`, `scoping` was replaced by
`steering`, `evolution` gained an exercise and two screenshots, `harness` gained `CutItUp` and a
decomposition section. Status changes are marked inline. The five new findings are **N1–N5** in §11.

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

1. **The cost goal is asserted, almost never demonstrated.** The whole cost throughline runs on one
   section's worth of figures: `harness`'s caching section (added 27 July) prices a cache read at
   roughly a tenth and puts five minutes on the expiry. Nothing else in the 16 units carries a
   number. No token count, no bill, no run duration, no model name. A student finishes the course
   believing cost matters and unable to estimate, measure or reduce it. This is the largest gap
   against a stated goal.
2. **Cadence collapses in step 2.** *Narrowed 27 July.* `evolution` now closes on a fifteen-minute
   exercise, so the run of nothing-to-do starts one unit later: six consecutive units, ~4,250 words,
   with zero quizzes and zero checks, ending abruptly in the hardest lab in the kata. Every quiz in
   the entire course still sits in the first four units of sixteen.
3. **The everyday verb is half there now.** *Narrowed 27 July.* `steering` closed the biggest half of
   this: interrupting, correcting mid-flight, and the choice between adding a message and rewinding
   to the one that sent it wrong. What is still missing is the other half, recovering when it is
   stuck or looping (**M2**) and reading a diff you did not write (**M12**). Both are still named
   repeatedly and taught nowhere.

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
| **Dutch is complete** | **296/296** prose keys across all three steps (27 July: 21 + 141 + 134). Verified, not sampled. Two units were rewritten and one replaced since the last count and the Dutch kept up with all of it. |
| **A step is a folder you can open on its own** | Added 27 July. Four standalone Maven projects under `kata/stepN/java`, no root pom, no aggregator, each with its own `CLAUDE.md` naming the exercises that must stay unimplemented. A student opening step 2 never builds step 1. |
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
| Entropy in the window | `intro` | ● |
| Amnesia / compaction / context fatigue | `intro`, `session` | ● |
| The prompt as an authored layer | `prompt` | ● |
| Reasoning level and thinking tokens | `prompt` | ● |
| Meta-prompting and plan mode | `prompt` | ● |
| Bundling work; `/clear` | `prompt`, `session` | ● |
| Session as the only layer with a time axis | `session` | ● |
| You authored almost none of it by volume | `session` | ● |
| Prompt caching | `harness`, a section; `session`, one clause | ● |
| What a tool is; the tool loop | `tools` | ● |
| MCP: what it is, wiring one | `tools` | ● |
| Tool descriptions cost you by existing | `tools` | ● |
| Tool results are the least trusted layer | `tools` | ● |
| Prompt injection | `tools` | ● |
| Harness: what it is, who ships it | `harness` | ● |
| Billing model (API key vs subscription) | `harness`, one sentence | ◐ |
| Coordinator / sequential / reflection patterns | `harness` | ● ⚠ |
| Decomposition | `harness`, its own section (27 July) | ● |
| Cutting a real under-specified problem up | `harness` / `CutItUp`, against `kata/step1/java/problem.md` | ● |
| **Tokens: what one is, how to count** | — | ○ |
| **Model families and choosing between them** | — | ○ |
| Context observability (`/context`, inspecting the window) | `intro`, one paragraph | ◐ |

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
| **Task sizing** | — (was `scoping`, deleted 27 July) | ○ |
| **Which folder you open the agent in** | — (was `scoping`, deleted 27 July) | ○ |
| The `.claude` symlink trap | `engineering`, one clause | ◐ |
| Interrupt versus rewind, and what each leaves behind | `steering` | ● |
| A worktree per agent, and the reading bottleneck | `steering` | ● |
| Making the agent stop at a gap instead of guessing | `steering` | ● |
| The third-time rule | `patterns` | ● |
| `CLAUDE.md` vs skill vs hook vs script | `patterns` | ● ⚠ |
| The build decides, not the agent | `quality` | ● |
| Coverage, complexity, mutation | `quality`, `workshop` | ● ⟳ |
| Metrics are proxies and get gamed | `quality`, `workshop` | ● ⟳ |
| Over-commenting / under-logging | `quality` | ● |
| Goal vs instruction | `goals` | ● |
| Long autonomous runs and their price | `goals` | ● |
| Git worktrees | `goals`, `steering`, `workshop` | ● |
| Steering a running agent | `steering` (27 July) | ● |
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
| Boundaries reduce reading per turn | `engineering` | ● |
| A correction you send is re-sent forever; a rewind is not | `steering` | ● |
| Two agents are two contexts and two bills | `steering` | ● |
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
| **Knowing when a task is ready to hand over** | — (was `scoping`, deleted 27 July) | ○ |
| Whether the work so far is worth keeping | `steering` | ● |
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

Re-measured 27 July. **The method changed**, so these numbers are not comparable row by row with the
26 July table they replace: words are counted off the English HTML with tags and comments stripped,
which runs consistently below whatever the first pass counted (it put `tools` at 995 where the same
file measures 802 this way). Nothing about the shape changes. Figures count `data-figure` slots,
which is why `harness` reads 4: three pattern diagrams plus the `CutItUp` card, with `PatternMatch`
arriving separately from the registry.

| Unit | Words | Figures | Interactive |
|---|--:|--:|---|
| step0 / welcome | 244 | 3 | 2 code boxes + quiz |
| step0 / backend | 104 | 1 | 1 code box |
| step1 / intro | 1052 | 4 | quiz (3q) |
| step1 / prompt | 599 | 3 | quiz (3q) |
| step1 / session | 766 | 1 | **none** |
| step1 / tools | 812 | 4 | task + SpotInjection + BudgetWindow |
| step1 / harness | 999 | 4 | CutItUp + PatternMatch |
| step1 / workshop | 1036 | 0 | FlagBoard (3 flags) |
| step2 / evolution | 790 | 3 | ungraded exercise (15 minutes) |
| step2 / setup | 609 | 1 | **none** |
| step2 / engineering | 974 | 1 | **none** |
| step2 / steering | 808 | 0 | **none** |
| step2 / patterns | 607 | 0 | **none** |
| step2 / quality | 579 | 0 | **none** |
| step2 / goals | 681 | 0 | **none** |
| step2 / workshop | 1096 | 0 | Workshop (5 flags) |

`harness` is now the longest unit in step 1 bar the workshop, up from the shortest. It absorbed the
caching section, `CutItUp` and the decomposition section in three sittings, and it is the one unit
where a further addition should be weighed against splitting it.

### Cadence defects

**C1 — Step 2 is a 4,250-word prose wall.** *Narrowed 27 July.* `evolution` now ends on a
fifteen-minute exercise, so the wall starts at `setup` rather than at the top of the step: six units
in a row with nothing to do. Four of them (`steering`, `patterns`, `quality`, `goals`) have no figure
either, so they are unbroken text, and `steering` at 808 words is the longest of the four. Then the
student hits a five-flag capstone that is 2–4 hours of real work. That is still the worst pacing
transition in the course: the flattest run leads directly into the steepest climb.

**C2 — All quizzes are in the first three units.** step0/`welcome`, step1/`intro`, step1/`prompt`.
After unit 4 of 16, the course never asks the student a question again until a flag board. Retrieval
practice stops exactly where the material gets harder.

**C3 — `step1/session` is the step 1 dip.** 818 words, one figure, nothing to do — and it sits
between two of the most interactive units in the course (`prompt` with a quiz, `tools` with three
exercises). It is also the unit carrying the most important single idea in step 1 ("careful session
management is most of what separates people who get good work out of an agent from people who fight
it") and it has no exercise attached to that claim.

**C4 — Interaction density is inverted against difficulty.** Step 1 (conceptual, easier) carries 5
interactive components and 2 quizzes. Step 2 (habits, harder, more consequential) carries 1, plus one
ungraded exercise. The scaffolding is thickest where the material is thinnest. Re-checked 27 July:
`CutItUp` widened the gap rather than closing it, because it landed in step 1.

### Sequence defects

**S1 — The default mode hides the foundational unit.** *Re-verified 27 July, unchanged.*
`DEFAULT_MODE` is still `guided` (`shared/mode/mode.ts`), and `step1/intro`'s entire prose still sits
inside `data-audience="self"` wrappers (four block wrappers plus three tagged elements, including
both remaining figures). A student who lands on the site and never opens the cogwheel reads the
course's
foundational unit as **two diagrams and a quiz, with no prose at all**. `StepContent` renders `null`
for filtered-empty content, so nothing signals that anything is missing.

This is defensible in a classroom where the tutor delivers `intro` at the board. It is not
defensible as the default for anyone arriving alone, which is one of the three reading modes
`welcome` explicitly promises.

**S2 — Audience tagging had produced dangling cross-references. Closed 27 July.** Both halves are
gone from the tree:

- `tools`'s "exactly like the three large files from the session unit", which pointed at
  `session.sessions-where-money.1` (still `data-audience="guided"`, so a self-learner never read it).
  The sentence no longer exists; `tools` makes the point in its own words.
- The three callbacks to "the entropy from the opening unit" in `prompt`, `tools` and `session`,
  aimed at `self`-only prose. All three now carry the mechanism themselves and point nowhere. §6
  records the reasoning.

A fresh sweep for cross-unit references (`last unit`, `previous unit`, `opening unit`, `next unit`)
returns four hits and three are sound. The fourth is a new defect of a different kind, **N2**: not an
audience mismatch but a direction mismatch, a back-reference to a unit that comes later. The standing
rule holds: every cross-unit reference needs checking against both the audience *and* the position of
its target.

**S3 — The tutor has one slide.** `shared/deck/slides.tsx` sets `TOTAL = 1` — the opening question,
"Where lies the line between vibe coding and agentic engineering?" Guided is the *default* mode, and
there is no presenter material for the remaining 15 units. (step0/`welcome` says "Slides are not
built yet. They are coming soon," so the content is honest about this; the gap is real, not drift.)

**S4 — No instructor scaffolding at all.** No `INSTRUCTOR.md`, no per-unit timings, no demo scripts,
no workshop checkpoints, no "if the room is stuck here, do this" ladder. For a course whose default
mode is guided, this is the biggest delivery gap after the slides.

**S5 — Step 2's order still front-loads the heaviest unit.** *Restated 27 July; the unit it argued
about is gone.* The order is now
`evolution → setup → engineering → steering → patterns → quality → goals → workshop`. `engineering`
(974 words, DDD + ports and adapters + a four-module Maven layout) is still unit 3, and the unit
behind it is now `steering` (808 words), which is more immediately actionable and needs no
architecture background. The original recommendation transfers intact: put the actionable unit
before the architectural one, `evolution → setup → steering → engineering → …`. What `steering`
teaches is a day-one skill; ports and adapters is not. Note this does **not** fix **N2**, which no
ordering fixes: worktrees live in `goals`, three units *after* `steering` either way. Still a
judgement call, not a defect.

**S6 — Step 1's order is sound.** `intro → prompt → session → tools → harness → workshop` builds
correctly, and the `tools`-before-`harness` swap is right: a student needs to know what a tool is
before hearing that the harness decides which exist. No change recommended.

---

## 5. Inaccuracies

Ordered by severity. All re-verified against the tree on 27 July; each carries its current status.

### High

**I1 — "This kata has two skills." It has three. Still open.**
Stated in `setup.lead.3` ("the `CLAUDE.md` and the two skills today"), `setup.skills.1` ("This kata
has two: `lesson-writing` … and `quiz-writing`"), `patterns.lead.2` ("This repository has two of
those already"), and drawn as two in the `ProjectTree` figure, whose own docstring asserts "CLAUDE.md
and the two skills are real". `.claude/skills/` still contains **`adding-a-step`, `lesson-writing`,
`quiz-writing`**. Root `CLAUDE.md` explicitly points students at `adding-a-step`, and its
"Adding a step" section now opens by telling you to use it. Three prose places to fix, plus the
figure and its docstring.

**I2 — The `patterns` argument is stale, and its worked example does not exist. Still open.**
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

**I3 — "The idea comes from GANs" is wrong as lineage. Still open, in both languages.**
`harness.reflection.1`, on the reflection pattern. Reflection and self-critique in agent systems
trace to Reflexion, Self-Refine and constitutional/self-critique methods. A GAN is a *loose analogy*
(one thing produces, another attacks), not an ancestor: GANs are a joint training objective for two
networks, and nothing in agent reflection is trained. This is the one genuine subject-matter error
in the course, and it is in front of an audience likely to know it. Recommend rephrasing to "the
shape is the same as a GAN's" rather than claiming descent.

**I4 — The `SessionMakeup` figure says `/api/titles` returns ten entries. Still open.**
Its first block is "Why does `/api/titles` return ten entries?" and its sixth "And where does the
tenth one go?" But `tools.connect-one.4` says "Same nine titles either way" and `workshop.lead.2`
says "Nine book titles come back." The endpoint returns **nine**; ten is the internal count before
the tenth is dropped.

If this is foreshadowing the trace flag, it is too subtle and lands three units early — a student
reads it as a plain factual claim about the endpoint and it contradicts two later units. Recommend
rewording to "why does the pipeline compute ten and return nine?"

**I5 — step0 `backend.lead.2` opened with a broken sentence. Closed 27 July.**
It now reads "A module can point you at a job to do in the codebase. Do it right and a flag becomes
available. Watch out, there are red herrings too," which is the Dutch rewritten rather than patched,
as the standing convention asks.

**I6 — step0 `backend`'s exercise instruction does not match its exercise. Narrowed, still open.**
Half of this closed itself: the code block above the rule is no longer framed as indicative, it now
reads `cd kata/step0/java` / `mvn verify -Pintro` and the prose around it says plainly that running
it is what makes the flag appear. What did not change is the instruction under "Test yourself":
"Open the project from its directory, go to step 1, and complete the tasks it gives you," above a box
whose code (`finishCode` in `step0/code.ts`) comes from that step 0 profile. The student is still
pointed at step 1 for a code step 1 does not produce. Wrong in **both** languages.

### Low

**I7 — `settings.json` vs `settings.local.json`. Still open, one instance fewer.**
`setup.skills.7` and `setup.hooks.*` name `settings.json` twice, and the `ProjectTree` figure draws
it; the third instance (`scoping.where-you-start.4`) went with the unit. The repo still has only
`.claude/settings.local.json`. `setup.lead.3` does hedge ("read the drawing as the shape rather than
an inventory"), so this may be deliberate. Worth one sentence either way, since `settings.local.json`
is the file a student will actually find and it is gitignored for a reason worth mentioning.

**I8–I10 — `BudgetWindow`'s line counts do not match the repository. Still open, all three.**
Re-measured 27 July against the moved tree (`kata/step1/java/src/main/java/…/step1/`), and the gaps
are unchanged: the split renamed the paths without touching a line of the Java.

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

One knock-on for whoever fixes this. Root `CLAUDE.md` records that the exercise's two right calls
"come to 37 lines", which is 3 + 34 off the current data. Correcting the controller to 24 makes it
27, so the fix is two files, not one.

**I11 — Root `CLAUDE.md` never mentions `step0`. Closed 27 July.** The rewrite for the four-project
split gave step 0 a line in the layout tree, a share of the "a step never reaches into another step's
code" rule, and the first of the per-step prohibitions ("do not decode or reveal the intro flag").

**I12 — Stale HTML comment. Still open, and now half right.** `evolution.html:38` still says the
`walking-skeleton` slot is "Filled by the **WalkingSkeleton** element"; the registry binds `UnitShot`
to it. The `added-details` comment eight lines further down, written when the second shot was added,
names `UnitShot` correctly. Two comments about two slots filled by the same component, disagreeing.

**I13 — i18n key drift in `prompt`. Still open, both halves.** Keys still run
`plan-mode.1, .3, .4, .5` with `.2` missing, so a paragraph was deleted without renumbering. The
section slug `reasonable-question-not` still does not match its heading ("A prompt is the basis of
the instruction"), which breaks the repo's own rule that a key is a location rather than a summary.

**I14 — `front/README.md` is still the stock Vite template.** Unchanged.

### Verified correct (stated so the next audit does not re-check)

Re-checked 27 July, after the split moved every Java file. All three graded thresholds still match
`FlagRevealIT` exactly (90% coverage, complexity 10, 80% mutation). "Forty-one stages restore a
string" and "eleven of them comment out the publish" are both still exact (41 stages call
`Scramble.unveil`, 11 of those comment out `run.publish`, out of 52 stage classes). The
`claude mcp add playwright -- npx @playwright/mcp@latest` syntax is correct. Java 25, AssertJ, the
`graded`/`challenge`/`intro` profiles, the absence of a `native` profile, the nine titles, and the
`MemberStatements.forTier` / `Step2Application` names are all accurate. Every `cd kata/stepN/java`
path printed in a unit matches the new layout, and there is no root `pom.xml` for one to point at by
mistake.

**One line of this block is now wrong and is retracted:** "the pinned step 1 main class". The
`<mainClass>` pin existed only because both steps shared a module; the split removed it, and both the
step 1 `pom.xml` and root `CLAUDE.md` now say it must not come back. Nothing in the curriculum ever
mentioned it, so this was an audit-only fact and no unit needs touching.

---

## 6. Duplication

### Genuine repetition worth pruning

| Repeated idea | Where | Note |
|---|---|---|
| **Metrics are proxies and get gamed** | `quality.metrics.2`, `workshop.honest.1`, `flag.honest.help` | Stated three times, near-verbatim. `quality` and `workshop` use almost the same sentence ("a hundred percent coverage from tests that assert nothing"). Keep `quality`'s statement of the principle; let `workshop` assume it and just name the mutation goal. |
| **Complexity ceiling of ten** | `engineering`, `goals` ×2, `quality`, `workshop`, flag hint | Six appearances. The number is fine to repeat as a target; the *argument* for it should be made once. |
| **The new-step file layout** | `patterns.three-places.1`, `quality.write-it-down.2` | Listed twice, near-identically, and `quality` cross-references `patterns` while restating its conclusion ("identical instead of similar" vs "identical rather than similar"). One list, one owner. |
| **`CLAUDE.md` is paid per turn** | `setup.claude-md.2`, `patterns.three-places.2`, `quality.write-it-down.3` | `setup` owns it. The other two can reference rather than re-argue. |
| ~~**The `.claude` symlink**~~ | ~~`engineering.structure.5`, `scoping.where-you-start.4`~~ | **Resolved 27 July by deletion**, not by editing: `scoping` went and took the fuller explanation with it. What is left is the one clause in `engineering.structure` that this row called the weaker of the two. See **N1** — this row closing is a symptom, not a win. |
| **Git worktrees** | `goals.own-worktree`, `steering.worktree-each`, `workshop.native.2`, `workshop.collect.2`, `flag.native.help` | Five places now. The `steering` section is **not** duplication (root `CLAUDE.md` records the split: `goals` argues isolation from your own day, `steering` argues one per agent) but it does mean the *definition* of a worktree is now written twice, in the two units that own the two arguments. `steering` reads first, so it should keep the definition and `goals` should assume it. That is also **N2**. |
| **"Ask the agent what it has read"** | `session.window-not-memory.4`, `tools.connect-one.5`, `steering.interrupt-or-go-back.5` | Now **three** self-asides asking for the same move. `steering`'s has the best reason to exist (it is the only one where the answer proves something, namely that a rewound turn left nothing behind). `session` and `tools` are the pair to thin. |
| **"`CLAUDE.md` is read at the start of every session"** | `intro.amnesia.3`, `session.window-not-memory.1` | Near-identical sentences. |
| **"None of this is new"** | `evolution.details.1`, `engineering.structure` (line 127) | The same rhetorical opener twice in one step. Re-verified 27 July, both still there, word for word. |

**Resolved 27 July — entropy.** This table carried an eleventh row: the explanation in
`intro.entropy`, back-referenced from `prompt`, `tools` and `session` as "the entropy from the
opening unit". The ⟳ was the wrong mark. The three sentences never repeated each other (each applied
the idea to its own layer) and the explanation was fine where it was; the pointers were the defect,
because they aimed at `self`-only prose. All three now carry the mechanism in their own words and
point nowhere: `prompt.what-steer-after.2` lets the term land on the sentence that defines it,
`session.window-not-memory.2` names what an afternoon leaves behind, and
`tools.list-itself-window.3` says the window is noisy before you have asked for anything. The row is
gone rather than reworded, and nothing here needs pruning.

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

**M1 — Steering a running agent. Closed 27 July.** This was the audit's single biggest miss and it is
answered by a unit of its own, `steering`, in slot four of step 2. It covers what the item asked for
and one thing it did not think to ask for. Interrupting early is the lead ("that is the cheapest
moment there will ever be"). The steer-versus-restart decision is the whole of
`interrupt-or-go-back`, and it is argued on the axis this course is best at rather than on taste:
a correction sent as a new message leaves the wrong turn in the window and re-sends it forever, while
rewinding to the message that caused it means the wrong turn never happened. The decision rule is
one sentence ("If it is good and you are adding something it did not know, send a new message. If it
is wrong because your request was wrong, go back and fix the request").

What it adds beyond the item: `stop-at-the-gap`, a standing `CLAUDE.md` rule that makes the agent
halt on an undecided question instead of picking the likeliest answer. That is a real move and no
other unit had it.

Two notes for the next audit. The unit does **not** cover recovery (**M2**), so do not read this
closure as covering both. And it was written by replacing `scoping` rather than by adding an eighth
unit, which is what **N1** is about.

**M2 — Recovering a stuck or looping agent. Still open, and now the biggest miss.** *Re-checked
27 July against `steering`, which is the unit it would most naturally live in and does not.* `intro`
explains entropy as *why* an agent degrades. Nothing teaches the move in the moment: when to
`/clear`, when to restate, when to abandon the session and start over from the code on disk.
`session` names `/clear` as a cost lever, not as a recovery tool. `steering` teaches the correction
you make when the agent is going the wrong way, which is a different situation from the one where it
is going nowhere, and its rewind move does not cover it: rewinding assumes there is a good message to
go back to. With **M1** closed this is the highest-value remaining gap under goal 1, and it now has an
obvious home rather than needing a unit of its own.

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

**M6 — Almost any number at all.** Narrowed 27 July. As first written this said the 16 units carried
no figure of any kind. One section now does: `harness`'s `caching` prices a cache read at
roughly a tenth and gives the entry about five minutes. That is the whole of it. Everything else is
unchanged: no token count, no bill, no run duration, no model name, and the word "token" still
appears a dozen times without a figure beside it. A student leaves convinced cost matters and unable
to estimate it, measure it, or explain it to a manager who asks what this costs per developer per
month.

**Input vs output pricing** was M7's until that item closed, and it lands here: the caching section
prices the window as one thing and says nothing about the split between what you send and what comes
back. Note the two figures already in the tree set the register for whatever comes next, so a unit
that arrives with a pricing table would not match them.

This is still the highest-leverage fix available, because the *argument* is already made everywhere.
It needs one unit that puts numbers on the claims the other units already make.

**M7 — Cache pricing. Closed 27 July.** This read: `session` states the mechanic in one clause
("harnesses cache the front of the pile, so what has not changed since the last turn is billed at a
fraction") and never develops it, so the course has the fact without the habit. `harness` now carries
a three-paragraph section, `caching`, between the billing paragraph and the splitting-work
heading. It argues the prefix match rather than the fact, which is what makes the habit derivable:
what gets matched, the three things that invalidate it (an MCP server connected mid-session, a model
switch, compaction rewriting the pile), and the five-minute expiry, closing on the one instruction
the section gives, which is to start a fresh session after a break rather than resume a lapsed one. Two notes for the next audit. The section carries the first numbers in the course (a tenth
of the price, five minutes), which is a deliberate precedent against **M6** and not an oversight. And
input-vs-output pricing, which the old heading also claimed, is still absent: the section prices the
window, not the split between what you send and what comes back. That belongs with **M6** now rather
than here.

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
generation saving, and where the task is too ill-defined to hand over. **Widened 27 July:** the
sentence this item called "nearest" was `scoping`'s ("when you cannot say those three things, the
task is not ready to hand over yet"), and `scoping` is gone. Nothing in the tree now frames the
question even as "not yet". `steering` comes closest from a different angle, since its worktree
section says to run only as many agents as you can actually review, which is a limit on *how much*
rather than on *whether*.

**M12 — Reviewing a diff you did not write. Still open, and now named a third time.** `quality` says
"that is still you reading the diff" and stops. `goals` says you read a module of diff while the next
one is written. `steering` (27 July) puts it sharpest of the three and still does not teach it: "The
agents got faster. Your reading did not. Run as many as you can actually review." Three units now
identify the student's reading as the bottleneck in the whole workflow, and none of them says how to
do it. Reading code for intent when you did not form the intent is a distinct skill from reviewing a
colleague's PR, and it is the primary quality gate in an agentic workflow. Named repeatedly, taught
nowhere, and the repetition is itself the argument for the unit.

**M13 — IP, data governance and what may leave the building.** For professionals in *company*
training this is a live question and it is absent. `tools` covers prompt injection well — the inbound
threat — but nothing covers the outbound side: which repositories may be opened with an agent, what
happens to proprietary code in a request, secrets in context, and who at their company decides.
Students will be asked this by their security team and the course gives them nothing.

**M14 — Licensing and provenance of generated code.** Not mentioned.

**M15 — Everyday git hygiene. Narrowed 27 July, still open.** Worktrees are no longer only an
advanced move for four-hour runs: `steering` prints `git worktree add` twice as ordinary practice for
running two agents at once, and `goals` closes on merging back in pieces rather than at the end.
What is still missing is the plainest layer under all of it: branch per task, small reviewable
commits, and never letting an agent commit blind. It remains the practical safety net behind every
other recommendation in step 2, and the course now assumes it in three places without stating it.

---

## 8. What a professional would still miss

Reading the course end to end as a working Java developer, these are the questions it leaves
unanswered — ranked by how soon they arise in real use:

Re-ranked 27 July. The question that used to head this list is answered now, so everything moved up
one.

1. ~~**"It's going the wrong way — what do I do right now?"** (M1)~~ — **answered** by `steering`,
   including the part most courses skip, that correcting forward and rewinding leave different
   windows behind.
2. **"What did that cost, and is it sustainable?"** (M6, M8) — arises the first time someone asks.
   Now the top of the list.
3. **"It's stuck in a loop."** (M2) — arises in week one. Nearest neighbour of a question the course
   now answers well, which makes the omission more conspicuous, not less.
4. **"How do I review 600 lines I didn't write?"** (M12) — arises immediately and permanently, and
   three units now tell the student this is where their day goes.
5. **"Which model should I be using?"** (M9) — a daily decision, never addressed.
6. **"Am I allowed to point this at our codebase?"** (M13) — arises before any of the above, and is
   the one most likely to stop adoption outright.
7. **"When should I just write it myself?"** (M11) — the mark of the mature practitioner, and the
   course lost its nearest sentence when `scoping` went.
8. **"What is this bad at?"** (M3) — currently learned by being burned.

Items 2–4 are now the practical core of "being comfortable". Item 6 is the one that will be asked by
someone other than the student, which makes it disproportionately important in a corporate setting.

---

## 9. Prioritised recommendations

### Tier 1 — fix now, cheap, high return

Statuses as of 27 July. Three of the eight are done, and one line was added.

1. **Correct the "two skills" claim** in three prose places plus the `ProjectTree` figure and its
   docstring. (I1) — *open*
2. **Rewrite the `patterns` script argument** so it reflects that `adding-a-step` exists, or create
   `scripts/new-step.sh` so the claim becomes true. Either resolves it; leaving a fictional path in
   the unit that teaches conventions is the worst option. (I2) — *open*
3. ~~**Audit every cross-unit reference against its target's audience.**~~ (S2) — **done.** Replaced
   by: **cut `steering`'s claim that the previous unit introduced worktrees** (N2), which is the same
   class of defect on the other axis.
4. ~~Fix step0's broken English sentence~~ (I5) — **done**; **its mismatched exercise instruction**
   (I6) is still open and is now the only half left.
5. **Correct `BudgetWindow`'s line counts** to the real values, and the "37 lines" in root
   `CLAUDE.md` with them. The argument holds at 1250 vs 24. (I8–I10) — *open*
6. **Reword the GAN attribution** to an analogy, in `harness.html` and `nl.json` both. (I3) — *open*
7. **Reword the `SessionMakeup` ten-entries line.** (I4) — *open*
8. ~~**Add `step0` to the root `CLAUDE.md`.**~~ (I11) — **done**, by the four-project rewrite.
9. **Decide what happens to task sizing and folder choice**, which left the tree with `scoping`.
   (N1) — *open, and new.*

### Tier 2 — the structural fixes

10. **Break up step 2's prose wall.** The cheapest effective intervention is a short quiz on
    `engineering`, `steering` and `quality` — three questions each, browser-graded, using machinery
    that already exists. That alone fixes C1 and C2. A figure for `steering` and `goals` would fix
    the unbroken-text half, and `steering` is the better candidate of the two: interrupt-versus-rewind
    is two windows side by side, which is exactly what step 1's figure vocabulary already draws.
    (C1, C2, C4)
11. **Give `session` something to do.** It carries step 1's most important claim and asks nothing.
    (C3)
12. **Decide what a default-mode visitor should see in `intro`.** Either default to `self`, or make
    guided mode show a short summary rather than nothing. Silently rendering an empty foundational
    unit is the worst of the three options. (S1)
13. **Write `INSTRUCTOR.md`** — per-unit timings, demo scripts, workshop checkpoints, a stuck-ladder.
    Guided is the default mode and has the least support. (S4)

### Tier 3 — the content gaps, in order of value

14. ~~**`steering`** — course-correcting a running agent. (M1)~~ **Done 27 July**, and it was the
    right one to take first.
15. **`economics`** — one unit that turns the existing cost argument into numbers: what a token is,
    input vs output vs cache, a worked example of a real session, and how to look at what a run cost.
    Fold in model selection (M9) as the primary lever. (M6–M9) *Now the highest-value unit to add,
    and the only one still measured against a goal the course states out loud.*
16. **`review`** — reading a diff you did not write. (M12) Three units now name this as the
    bottleneck, which is one more argument for it than the last audit had.
17. **Recovery, as a section inside `steering` rather than a unit.** The stuck or looping agent, and
    `git` hygiene as its safety net. (M2, M15) *Changed 27 July:* the last audit wanted a `recovery`
    unit because there was nothing to attach it to. There is now, and step 2 does not need a ninth
    unit as much as it needs the six wall units broken up.
18. **`boundaries`** — when not to use an agent, what agents are bad at, and the IP/data-governance
    question. (M3, M11, M13) *For corporate delivery, M13 alone may justify this unit.* It also has
    somewhere to put the task-sizing material that left with `scoping` (N1).
19. Presenter slides for the guided track. (S3)

### Explicitly not recommended

- Do **not** deduplicate the `intro`/`session` overlap. It is a documented decision.
- Do **not** add an LLM-internals unit. Tokenizer mechanics, attention, training — off-target for an
  audience learning to direct an agent. The `economics` unit needs a worked example, not a theory
  section.
- Do **not** split MCP into its own unit. `tools` now covers it properly.

---

## 10. Tracker carried forward

From the 25 July audit, re-verified against the tree on 27 July.

| # | Item | Status |
|---|---|:--:|
| 1 | `steering` — course-correcting a running agent | ✅ **closed 27 July** — its own unit, step 2 slot 4 |
| 2 | `review` — reading a diff you did not write | ○ open, now named in three units |
| 3 | A step 1 lab | ✅ closed (`workshop` flag board) |
| 4 | Foundations bridge: the tool loop, model families | ◐ loop now argued in `tools`; models still ○ |
| 5 | Expand `harness` / `external` from stubs | ✅ closed — `harness` was the shortest unit in step 1 and is now the longest bar the workshop; `external`→`tools` |
| 6 | `economics` — cost made quantitative | ○ open — **the headline item now** |
| 7 | Context observability (`/context`, `/clear`, compaction) | ◐ compaction ● (`session` section, `intro`, `harness`), `/clear` ● (`prompt`, `session`), `/context` **◐ and weaker than it looks** — see below |
| 8 | The tool-use loop taught end to end | ✅ closed (`tools`) |
| 9 | Model families and selection | ○ open |
| 10 | `recovery` — the stuck/looping agent | ○ open — now has a home to go into (`steering`) rather than needing a unit |
| 11 | `git` — branch per task, small commits | ○ open — worktrees are taught in two units, the plain practice under them in none |
| 12 | Curating the agent's inputs | ◐ `CutItUp` (27 July) works one real under-specified problem end to end; `@`-mentions and spec-versus-let-it-read still ○ |
| 13 | `delegation` — subagents as a cost lever | ◐ pattern taught in `harness`; the habit still ○ |
| 14 | `mcp` deep dive | ✅ closed (`tools` + `McpServer` + `connect-one`) |
| 15 | Permissions / settings depth | ○ open |
| 16 | Workshop scaffolding for guided rooms | ○ open |
| 17 | `INSTRUCTOR.md` | ○ open |
| 18 | `evaluation` was unbacked free text | ✅ closed |
| 19 | Doc drift: `PRODUCT.md` | ✅ closed |
| 20 | Doc drift: `step2/flags.ts` docstring | ✅ closed |

**Closed since the 25 July audit:** items 3, 5, 8, 14, 18, 19, 20, and now **1**.

**Closed on 27 July alone:** tracker item 1, S2, I5, I11, and the decomposition row in §3. Four
inaccuracies and one structural defect in a day, against two new findings.

**New headline:** `economics` is now alone at the top. `steering` shipped, `review` is second, and
the cost goal is the only one of the author's three still asserted rather than demonstrated.

---

## 11. New findings, 27 July

Five things the re-verification turned up that the 26 July pass could not have seen. **N4** is the
only one found by rendering the site rather than by reading it, which is worth noting as a method:
the audience filtering means the tree and the page disagree about what the course contains, so an
audit done entirely in the editor will keep missing this class of defect.

**N1 — `scoping` was deleted and three topics went with it.** Replacing it with `steering` was the
right call on content (see M1), but it was a replacement rather than an addition, and task sizing,
which folder you open the agent in, and the fuller `.claude` symlink explanation are now taught
nowhere. Root `CLAUDE.md` records this as deliberate ("dropped outright, so nothing in the tree
teaches them any more"), so this is not drift. It is a decision worth re-examining once, because two
of the three had consequences elsewhere in this document: **M11**'s nearest sentence was
`scoping`'s, and §3's "knowing when a task is ready to hand over" went from ● to ○ without anything
being wrong with it. The symlink survives as one clause in `engineering`, which the duplication table
had already judged the weaker of the two tellings.

**N2 — `steering` claims the unit before it introduced worktrees. It did not.** `steering.worktree-each.1`
reads "the last unit already gave you the tool for it", in both languages. `steering` is unit 4 and
the unit before it is `engineering`, which never mentions a worktree; the other worktree section is
in `goals`, unit 7, three units *later*. No reordering fixes this, since `goals` is after `steering`
in every proposed order. The fix is to cut the clause: the next sentence already defines a worktree
from scratch ("a second checkout of the same repository, on its own branch, in its own folder"), so
nothing is lost, and `goals` becomes the one that refers back. Same class of defect as **S2** on a
different axis: S2 was references pointing at prose the reader's audience never saw, this is a
reference pointing at prose they have not reached yet.

**N3 — the four-project split invalidated one line of §5's verified-correct block**, "the pinned
step 1 main class". It is retracted in place. Worth noting as a pattern rather than as an error: a
"verified correct" list ages, and the split changed a repository fact that no unit had ever claimed.
Everything else in that block survived the move intact, including the two exact stage counts.

**N4 — `/context` is invisible in the default mode, measured in the browser.** Tracker item 7 is
carried as ◐ because `/context` is "named but with nothing to do against it". Rendering
`/steps/step1/intro` at both modes shows the gap is bigger than that. The command lives in two
sentences of `intro.lead.2`, inside the unit's `data-audience="self"` wrapper, and it is named
nowhere else in the tree. In `self` the unit renders 7,830 characters of text and contains
`/context`; in `guided`, which is `DEFAULT_MODE`, it renders 1,927 characters (heading, diagram,
quiz) and the string does not appear at all. So the course's only tool for inspecting the window is
absent for every student who does not open the cogwheel.

The content half is thin too: the sentence says what the command prints and stops. No sample output,
no reading of one, no threshold, and no moment anywhere in the course where a student is told to run
it. Meanwhile `session` argues about pruning, `tools` about what tool descriptions cost by existing,
`harness` about what invalidates a cache, and `BudgetWindow` has the student total line counts in an
invented window three units after the real one was mentioned. Closing this needs a place to *use* the
command, not a longer sentence about it, and `BudgetWindow`'s unit is the obvious host: count the
fictional window, then run `/context` against your own. It also makes **S1** concrete, which until now
was an argument about a unit rather than about a specific thing a student loses.

**N5 — `harness` is now the longest unit in step 1 apart from the workshop.** It went from the
shortest (the last audit's item 5 was "expand it from a stub") to 999 words in three additions:
caching, `CutItUp`, and the decomposition section. Nothing is wrong with any of them and the unit
still reads as one argument. It is flagged because the next addition is the one that should be
weighed against splitting the unit, and because a "expand this stub" tracker item that closed two
audits ago can quietly become its opposite.
