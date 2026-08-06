# Dossier: the arc of the whole course

Subject: all four steps, 25 units, read as one thing a person works through start to finish.
Read: `BRIEF.md`, the four step `CLAUDE.md` files, `front/src/steps/CLAUDE.md`, `front/CLAUDE.md`,
`PRODUCT.md`, all four `index.tsx`, all 25 unit HTML files, `audit.md` sections 1 to 3.

**Prior art discipline.** `audit.md` is measured and thorough. Where a thing I found is already a
numbered row there, I say so and I do not claim it. Six of the fourteen findings below are new;
the rest are either arc-level framings the audit records unit by unit but never assembles, or
sites the audit's row does not name.

---

## Verdict

The arc is better than most technical courseware and it has one structural hole that nothing in
the repository covers: **the course never tells the student what to install.** Everything else is
tuning. Within each step the argument builds, the leans are disciplined, and the per-step
`CLAUDE.md` files are the best defence against a careless rewrite I have seen in a repo like this.
Between the steps it is thinner: of three step boundaries, one is marked from the side that leaves
(step 1 to step 2, via `recap`). The other two are cold opens.

The shape of the course is a ramp that stops. Density of things-to-do falls monotonically from
unit 5 to unit 25, and the last two pages of the course render **blank** in the default mode.
That is the arc problem the two additions the user has already licensed will mostly fix.

Word counts, for the weight question later: step 0 672 (2 units, 336/unit), step 1 7,683
(10 units, 768/unit), step 2 8,004 (10 units, 800/unit), step 3 2,113 (3 units, 704/unit).
Total 18,472.

---

## 1. Does it build?

Mostly yes, and where it does not the step notes usually say why. Three real forward references.

### 1a. Nothing tells the student what to install. (new)

There is no prerequisites page, no landing route, and no unit that names a tool the student has to
have before page one. `grep -ril "install"` over all 25 unit HTML files returns nothing. Neither
does `jdk`, `node`, `prerequisite`, `download` or `sign up`. `App.tsx` has no route above
`steps/:stepId`, so `step0/welcome` is the front door and it opens on "This kata teaches you to
work with a coding agent".

What the course then asks for, in order:

- `step0/backend` (unit 2): `cd kata/step0/java && mvn verify -Pintro`. Maven and a JDK, unnamed.
- `step1/tools` (unit 5): `claude mcp add playwright -- npx @playwright/mcp@latest`. An installed
  agent CLI, and Node for `npx`. Neither named.
- `step2/workshop` (unit 22): `mvn -Pnative native:compile`. **This needs a GraalVM JDK.** The
  prose names the `native-maven-plugin` and never the JDK. The root `CLAUDE.md` records that the
  author's local JDK is Oracle GraalVM 25.0.3, so the exercise is green for whoever wrote it and
  fails on a stock Temurin for everyone else, with a failure that looks like the student planned
  badly rather than like a missing toolchain. That is the last and hardest flag in the course.

The `repo-setup` skill in `.claude/skills/repo-setup/` does all of this checking, and it is
author-facing: nothing in the curriculum points at it and a student is not told it exists.

`audit.md` does not carry this. There is no row for it in Tables 1a to 1e and "No instructor
scaffolding" (item 49) is about the tutor, not the student.

### 1b. "Harness" is used 14 times before it is defined. (new)

`step1/tools` is unit 5 of the course and unit 3 of its step. It uses `harness` fourteen times, and
they are load-bearing rather than decorative: "your harness runs it, and the output is appended",
"the harness decides which tools exist", "your harness took it and put it in the window", "whether
you ever see them is your harness's call". `step1/session` adds six more. `step1/harness` is unit 8
of the course, and its first sentence is the definition: "The harness is the software you use to
work with a model."

The step's own `CLAUDE.md` records the equivalent decision for the word *context* (used before
`context` arrives, deliberately, definition deleted from `prompt`) and records nothing at all about
*harness*. So this reads as an oversight rather than a decision. The fix is not a reorder: it is one
clause in `tools.lead.1` naming the thing in passing and linking forward, which is the move the step
already makes eleven times elsewhere.

### 1c. Nothing defines "context". (prior art, audit item 3, but the blast radius is bigger)

The audit files this under step 1 and asks for one clause in `context.lead.1`. Read across the
course it is larger than one step's row: the module is *titled* "Context, model, mechanisms",
`recap.what-costs-do.4` links the word *window* to `context` as if that unit had named it, and
`step3/expectations.tool-not-advantage.2` reaches back two steps for "a model answers from an
average, which is what the context unit was about". Three modules lean on a definition that does not
exist. The fix stays one clause, in `context`.

### Things I checked and found sound

`plan mode` (defined `step1/prompt`, used `step2/workflows`, `step2/workshop`), `worktree`
(defined `step2/steering`, used by `goals`, `parallel`, `workshop`), `skill` (defined `step2/setup`,
used after), `hook` (`setup`, then `engineering`), `coordinator`/`orchestrator` (bridged in
`parallel.orchestrator.1`), `compaction`, `sub-agent`, `mutation testing`, `vibe coding`. Every one
is introduced before it carries weight, and the two that are used loosely first (`skills` in a
four-word list in `harness.lead.1`) do not need the reader to know anything.

---

## 2. Duplication

The step files police this hard and it shows. I found no second full telling of anything. Three
observations worth recording.

**Nothing is duplicated; several things are quadruply pointed at.** "Your reading is the
bottleneck" is named in `steering`, `enablement`, `parallel`, `goals` and
`step3/expectations`, and answered once, in `step3/change.you-test-engineer`. That is audit item 22
and it is correctly filed as a hole rather than a duplication: five warnings, one move, and nobody
teaches the skill.

**The one place a lean has become a second telling is a back-reference to work that was never
set.** `step2/workshop.goals.2`: "Before you hand anything over, do the setup the first units asked
for. Put `mvn verify -Pgraded` in your `CLAUDE.md`". No unit asks for that. `setup`'s "Your own
CLAUDE.md" section is about `~/.claude/CLAUDE.md`, the personal one; `engineering.quality-gates.2`
describes wiring a gate into a run and assigns nothing. Then `workshop.goals.3` says "the complexity
ceiling from your `CLAUDE.md`", and the ceiling is in the `graded` profile in
`kata/step2/java/pom.xml`. A student who reads carefully concludes they missed an instruction. See
finding 2.

**The recap shape is proven once and not reused.** `step1/recap` is, as the audit says, the
best-sequenced unit in the course. Step 2 is ten units, five habits and two boards, and closes on a
capstone whose last element is a one-sentence self-only aside. Step 2 has more to reassemble than
step 1 did. I am not proposing a `recap` unit for step 2 as a first move (see section 4), but the
asymmetry is a decision nobody has taken: the step 2 `CLAUDE.md` records no reason for not having
one.

---

## 3. Cadence

The audit's per-unit cadence table is accurate and I have nothing to add unit by unit. What it does
not assemble is the shape of the whole ramp, and the whole ramp is the problem.

Things the student does, by course unit:

```
unit  1  2  3  4  5  6  7  8  9 10 11 12 13 14 15 16 17 18 19 20 21 22 23 24 25
step  0  0  1  1  1  1  1  1  1  1  1  1  2  2  2  2  2  2  2  2  2  2  3  3  3
do    ■  ■  ■  ■  ■  ■  ■  ■  ■  .  ■  .  ■  ■  ■  .  .  ■  .  .  ■  ■  .  .  .
```

Ten of the first twelve units ask for something. Six of the last thirteen do. The last question the
course asks is unit 21. The last thing the student does is unit 22. Then 2,113 words with nothing.

Two consequences the audit records separately and never puts together:

- **In the default mode, the last two pages of the course are blank.** `DEFAULT_MODE` is `guided`
  (`shared/mode/mode.ts:13`), guided drops every run of prose, and `expectations` and `impostor`
  carry no figure, no card and no quiz. `StepContent` renders `null`. A tutor who reaches the end of
  the day gets two empty articles and has to teach off the deck alone. `step1/recap` has the same
  property and the step notes accept it, correctly, because it stands between a board and a step
  boundary. Two consecutive blanks closing the whole course is a different thing. (new as an arc
  claim; the audit notes `change` is "the one unit here a tutor can put on the board" without
  drawing the conclusion.)
- **The wall and the ramp are the same event.** `workflows` (949 words, 7 figures, a quiz) into
  `enablement` (367, 2, nothing) into `parallel` (518, 1, nothing) into `goals` (1,413, 4, a quiz)
  into `workshop` (1,097, a five-flag board) is a genuinely good crescendo. Everything after it is
  descent. The course peaks at unit 22 of 25.

No place in the course has three drawings in a row with no prose between them. I checked
`workflows` (the densest, 7 figures) and every one closes a section it has just argued.

---

## 4. Unit order

Within each step the order is defended in the step notes and I found one move worth arguing and
one worth explicitly not making.

**Do not move `tools` earlier or later.** It is unit 5, the heaviest unit in the course by things to
do (a task card, a one-row flag board, two graded exercises, eight figures, 1,022 words), and it
sits before `context` teaches the window it spends three sections budgeting. That looks wrong and is
not: the step's `CLAUDE.md` argues that the two layers a student writes and reads for themselves
come before the theory, `ToolsInContext` is deliberately the first teal frame, and `ContextDiagram`
is the populated payoff of two earlier drawings. Moving it breaks a three-figure sequence. Audit
item 28 proposes splitting the MCP half from the tool-loop half and notes its own argument has
weakened. I would leave it and pay for it with finding 1b's clause instead.

**Do not reorder step 3.** Team, then stakeholders, then self, closing on the personal one because
there is nothing useful after it. That is right, and the step notes say so.

**The one order argument I would make is a placement, not a move**: step 3's closing exercise goes
at the foot of `impostor`, below an `<hr>` and the shared `Test yourself` heading, so the prose
still ends on `nobody-doing-long.2` (which the audit correctly calls the right note to end on) and
the *course* ends on something the student does. See section 6.

**The step 2 to step 3 boundary is unmarked from both sides** and it is the one boundary in the
course that carries a change of subject rather than a change of topic. `step2/workshop` ends on a
self-only aside about getting unstuck. `step3/change` opens on "Producing code is not the job any
more". Nothing joins them. Step 1's `recap` is the proof that one paragraph fixes this.

---

## 5. Weight

**Step 3 is not underweight per unit. It is short by about one unit of scope.**

Per-unit prose: step 3 704 words, step 1 768, step 2 800. Its two long units (`change` 953,
`expectations` 730) sit inside the course's normal band, and the step notes defend both lengths
section by section. `impostor` at 430 is the right length for what it is. The prose is the best
written in the course; `feeling-from-signal` is the only place the kata argues with the reader
rather than teaching them, and the bare "Maybe." earns its place.

What is missing is coverage, and the audit's own Table 1d names it: **how the change gets started**
(item 18: no unit in any module argues how this way of working is introduced to a team, which is the
question the module title asks) and **what may leave the building** (item 19: IP, data governance,
the question a company asks before lesson one). Those are two soft-skills topics with no home, and
they are soft-skills-shaped rather than step 2-shaped. One more unit, or two sections and a card,
puts step 3 at roughly 2,800 words and closes both rows.

Step 3's share of the course is 11.4% of the words for a module that carries half of what
`PRODUCT.md` promises ("not just what an agent knows, but how you work with one" plus everything
around it). Not fatal, but it is the module a company buying this training will ask about first.

Step 0 at 672 words is right. It is a manual, not a lesson.

---

## 6. The workshop story

Two additions, both licensed. The important thing about them at the arc level: together they retire
audit item 1 rather than requiring its fix. `welcome.how-workshops-work.1` currently says "Most
steps close on a workshop" and the audit correctly says one of four does. If step 0 gains a board
and step 3 gains a closing card, **all four steps close on something the student does**, and that
sentence becomes true instead of being cut. Do not cut it before doing this work.

### 6a. Step 0: a `workshop` unit, third and last, that grades readiness

The honest thing for step 0 to grade is not knowledge. It is **the loop**: run a command, read what
the machine printed, paste it into a box. `backend` already describes that loop and demonstrates it
once with `mvn verify -Pintro`. A board makes it a workshop, and it is the one place in the course
where a readiness check belongs, which is what closes finding 1.

**Shape:** a third unit `step0/workshop`, a `FlagBoard` on the existing `flags.ts` mechanics
(salted hashes, browser-graded, backend-independent), three rows. `kata/step0/java` already has the
`Veil` machinery and the opt-in-profile pattern, so two of the three rows are one profile each.

1. **`{run}` — the flag that exists today.** Move `-Pintro` off `backend`'s inline code box and onto
   the board. It becomes the first row of the first board, and the first application of house rule
   one ("only your agent hunts") on a hunt whose answer is known, so the rule is practised on the
   page that states it rather than two units later against a real puzzle. `backend` keeps the prose
   and the `<pre>`, and ends by sending the student to the board.
2. **`{ready}` — the toolchain row.** A second opt-in profile in `kata/step0/java` that asserts the
   JDK and Maven the rest of the course needs, including the `native-image` capability step 2's
   fifth flag depends on. It prints the flag when the environment is right and **a miss naming what
   is wrong** when it is not. That miss is the best teaching move in the whole course
   (`step2/workshop.native.3` turns on exactly it) taught small, on day one, where it costs a
   student five minutes instead of an afternoon at unit 22. This row is the fix for finding 1 and it
   is worth building even if the other two rows are dropped.
3. **`{pick}` — the red herring row.** `backend.lead.2` warns "From step 1 on, watch out for red
   herrings: a string in braces is not always the one you are after", and nothing in step 0
   demonstrates it. A third profile prints **two** strings in flag shape and the board accepts one.
   That is house rule 4's closing sentence made into work ("when several candidates come back in the
   flag's exact shape, the pick is yours. The agent cannot tell. You can."), and it is step 0's own
   material rather than a preview of another step's.

**What this must not do.** It must not hunt for a plaintext flag in an instruction file: that is
step 2's `setup` board and spending it here ends that exercise. It must not decode or reveal the
intro flag, and the toolchain profile must not print anything that shortcuts `-Pintro`. And the
board must stay browser-graded so step 0 still works with nothing running.

**Cost:** one unit HTML, its Dutch, two new profiles in a project that already has the pattern, a
`flags.ts` for step 0, one `deck.tsx` divider plus one slide (step 0's deck is five slides and can
carry a sixth). The board itself is `FlagBoard` with data, which is what that component was
extracted for.

**Placement note:** `welcome` currently carries the house rules and no board, so the rules are
stated two units before any board is played. Putting a board at the end of step 0 puts them one page
apart, which is where they were before the move out of `step1/workshop`. It also gives audit item 2
(house rule 3 "one flag, one session" against `OneWindow`'s "work all three from a single session") a
cheaper home: the step 0 board can be the place the rule is practised as written, so the exception
belongs on the step 1 card and the clause the audit asks for is one word smaller.

### 6b. Step 3: an ungraded closing card at the foot of `impostor`

The shape is already decided by the step's own notes: "the honest shape is step 2's `TaskCard`,
ticked once and grading nothing, and the thing it asks for has to happen away from the keyboard."
Take that literally.

**A `TaskCard`, block `take-it-back`, ticked once to `kata.step3.take`.** Under an `<hr>` and the
shared `<h2 data-i18n="ui:quiz.title">`, so the step's prose still ends on `nobody-doing-long.2` and
the card is the doing part after the rule, which is the exact shape step 1's four task units use.
Five moves, one line each, one per section of the step it draws on, and it says plainly in its
description that nobody checks it.

1. **Name the queue.** Write down the one thing between your work being done and it being in
   production that is not typing. (`change.process-was-bottleneck`, and `PipelineShift` is the
   drawing it comes from.)
2. **Name the sentence.** Write the line you will say at the next demo about what the rough version
   does not do yet. (`expectations.say-what-missing`.)
3. **Name the line.** Pick one correction you gave an agent more than once this week and write it
   into the repository's own instruction file. (`change.environment-beats-project`, whose gem icon
   already asks the student to count exactly this. The one move that touches a keyboard, and it is
   the smallest.)
4. **Name the practice.** Pick one ritual your team keeps, write the constraint it was built for,
   and say whether that constraint is still there. (`change.way-working-decision`, which asks and
   deliberately does not answer.)
5. **Put one of them in front of one person.** A name and a date. (This is audit item 18, "how the
   change gets started", which currently has no home in any module.)

**Why this is the right closer and not a fake board.** Every move is a conversation or a written
line, so nothing pretends to be gradeable. The card renders from the registry, which means it
survives guided mode, so step 3 goes from one unit that shows something in class to two, and the
course stops ending on two blank pages. It closes audit item 21 (the course has no ending) by ending
on Monday rather than on a paragraph. And it turns the step's five best claims into five things the
student leaves with, which is what `PRODUCT.md` says success looks like.

**What it must not do.** It must not grow a checker, a hash or a text box: the moment one of these
is graded the step is lying about what it is. It must not restate an argument in a move (moves are
one line; the step notes are emphatic that the claim belongs in the unit). And it must not become
six moves; the fifth is the one the step is missing and the other four are the units it has.

---

## Findings

| # | Sev | Where | Defect | Fix |
|---|---|---|---|---|
| 1 | high | whole course; `step0/welcome`, `step0/backend`, `step2/workshop` | No prerequisites anywhere in 25 units. No unit names an agent CLI, a JDK, Maven, Node or a version, and unit 22 asks for `mvn -Pnative native:compile`, which needs a GraalVM JDK that nothing mentions. Not in `audit.md`. | Step 0 gains a toolchain row on its new board (6a) that prints a miss naming what is wrong; `backend` gains two sentences listing what the course assumes. |
| 2 | high | `step2/workshop.goals.2`, `.3` | Back-reference to homework never set: "do the setup the first units asked for. Put `mvn verify -Pgraded` in your `CLAUDE.md`". No unit assigns it. `.3` then calls the complexity ceiling "from your `CLAUDE.md`" when it lives in the `graded` profile. | Make `.2` an instruction rather than a reminder, and name where the ceiling actually is in `.3`. |
| 3 | high | `step2/workshop` → `step3/change`; `step3/impostor` | The course has no ending and its one subject-changing step boundary is unmarked from both sides. Audit items 21, 44, 45 record the pieces; nothing records that three of four boundaries are cold. | One closing paragraph on `step2/workshop` naming step 3, and the closing card of 6b as the course's ending. |
| 4 | high | units 23 to 25, default mode | `DEFAULT_MODE` is `guided`, guided drops all prose, and `expectations` and `impostor` carry no figure, card or quiz, so the last two pages of the course render `null`. | The closing card (6b) fixes `impostor`; a three-question quiz on `expectations` (audit item 20) fixes the other. |
| 5 | medium | `step1/tools` | `harness` used 14 times as a load-bearing noun three units before `step1/harness` defines it, plus 6 more in `session`. The step notes record the same decision for *context* and say nothing about this one, so it reads as an oversight. | One clause in `tools.lead.1` naming it and linking forward. Not a reorder. |
| 6 | medium | `step1/context.lead.1` | Nothing anywhere defines *context* or *context window*, in a module titled after it, and `step1/recap`, `step2` and `step3/expectations` all lean on a definition that does not exist. Audit item 3 files this as one step's row; the reach is three modules. | The clause audit item 3 already specifies, in `context.lead.1`. |
| 7 | medium | `step2/workshop.build.3`, `.native.2` | The capstone instructs every reader to "ask Claude in plan mode" and "have Claude work out", so a Copilot student is told to use a product they do not have, in the hardest exercise in the course. Audit item 24 covers step 2's assistant gap at module level and does not name these two sentences. | Two words: "your agent". Cheapest possible down payment on item 24. |
| 8 | medium | step 3 as a whole | Short by scope, not by density: 704 words/unit against step 1's 768 and step 2's 800, but two soft-skills topics have no home in any module (audit item 18, adoption; item 19, IP and data governance) and both are step 3's shape. | One more unit, or two sections plus the closing card, taking the step to roughly 2,800 words. |
| 9 | medium | `step0/welcome.how-workshops-work.1` | "Most steps close on a workshop." One of four does. Audit item 1 proposes cutting the clause. | Do not cut it yet. The two additions the user has licensed make it true; sequence the work so the sentence is fixed by the additions rather than by a deletion. |
| 10 | medium | `step2/workshop.native.2`, `.goals.2` | Positional cross-unit references survive ("the long-running kind the last unit described", "the first units asked for") in the unit whose own `CLAUDE.md` records that positional references break silently on an insertion and that `lead.1` was rewritten for exactly that. | Name `goals`, the way `lead.1` now names `engineering` and `goals`. |
| 11 | medium | step 2, whole step | Step 1 gets a `recap` and step 2, with ten units, five habits, two boards and more to reassemble, gets none. Its capstone's last element is a one-sentence self-only aside. The step's notes record no decision either way. | Either a `recap` on step 1's proven shape, or accept it explicitly and give `workshop` the closing paragraph finding 3 asks for. Do not leave it unrecorded. |
| 12 | low | `step1/tools` | Heaviest unit in the course (1,022 words, 8 figures, 4 things to do) at unit 5, ahead of the unit that teaches the window it budgets. Audit item 28 proposes a split and notes its own argument has weakened. | Leave the order. It is defended by a three-figure sequence and by the step's stated principle. Pay for it with finding 5 instead. |
| 13 | low | five units name it, one answers it | "Your reading is the bottleneck" is stated in `steering`, `enablement`, `parallel`, `goals` and `step3/expectations` and answered once, in `change.you-test-engineer`. Audit item 22. | Confirmed, not re-diagnosed. The fix belongs to whoever owns `change`. |
| 14 | low | `step0/welcome.house-rules.3` vs `step1/workshop.one-window.1` | "One flag, one session" against "Work all three from a single session". Audit item 2. | The step 0 board (6a) is where rule 3 can be practised as written, which makes the clause the audit asks for smaller. Sequence it after that work. |
