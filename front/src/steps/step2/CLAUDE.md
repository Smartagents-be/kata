# CLAUDE.md — step 2

What is deliberate about each unit of step 2, and why. It loads when you work with files under
`front/src/steps/step2/`. Nearly everything here is a decision with a reason behind it: why a figure
is drawn the way it is, why a paragraph was cut, why two units overlap, and which parts are
exercises that must not be solved. Read it before editing any of this step's files, because a great
deal of what looks like an oversight is load bearing.

The rules that span the whole curriculum are in the parent `front/src/steps/CLAUDE.md`, the design
system and the audience and assistant mechanisms are in `front/CLAUDE.md`, and the repo-wide
prohibitions are in the root `CLAUDE.md`. None of them is repeated here.

`step2` is **agentic engineering**: how you work with an agent, as opposed to what it knows. Nine
units — `evolution`, `setup`, `engineering`, `steering`, `patterns`, `workflows`,
`enablement`, `parallel`, `goals` — none of
them carrying a quiz, and the unit HTML is the source for what each argues. Three of the nine close
on something the student does: `evolution` on an ungraded fifteen-minute task, `setup` on a graded
flag board, `engineering` on an ungraded `TaskCard`. The other six are framing prose. Five carry one
habit each; `evolution` opens the step and carries none, because its job is to put the rest in
order: a version now costs an hour, so the step you hand over gets small and you take many of them.
`workflows` is outside that count too, and deliberately so: it carries four ways of
handing work over rather than one habit, and its argument is the choice between them. `parallel` is
outside it on the same reasoning, three arrangements of agents rather than one habit. `enablement`
is the fourth one outside it, for its own reason: it is about what has to be true around you rather
than about a habit you practise.

**A `quality` unit sat in slot six and was replaced by `parallel`**, and this is the record of what
went with it so nobody restores half of it. It ran three sections: the build rather than the agent
deciding when work is finished (`mvn test` and `npm run build`, both cheap, both on demand), writing
the standard down where the agent meets it before it writes (the `*Test.java` and AssertJ house
style as a skill, the new-step file list as a scaffolding skill, and having the agent draft
`CLAUDE.md` off the repository rather than writing it from memory), and picking metrics that carry
weight (a coverage floor and a complexity ceiling wired into `mvn verify`, the proxy trap that a
hundred percent coverage from tests asserting nothing is green and worthless, and an agent
over-commenting and under-logging). Most of it was a third telling: `engineering`'s `Quality gates`
owns the bar in the build, `patterns` owns turning a repeated correction into a skill, `setup` owns
`CLAUDE.md`, and `goals` owns the check that answers yes or no. **The proxy trap is the one argument
that had no second home**, and it now survives only inside `workshop.flag.honest.help`, which states
it without attributing it to a unit. That is the thing to notice before writing a section about
metrics anywhere in the step. Three references were repointed in the same change rather than left
dangling: `workshop.lead.1` names `engineering` and `goals`, `workshop.lead.2` says "the kind of code
a quality gate exists for" instead of naming the unit, and `step3`'s
`change.sceptics-reading-diff.2` links to `engineering`.
Its prose closes by handing off to `setup` by name, so a reordering there has to visit that
paragraph. Below that prose sits the step's only *ungraded* exercise, under the same `<hr>`
and "Test yourself" heading step 1's `tools` uses: fifteen minutes on the clock, one of three
skeletons, and nothing graded. The constraint is the clock and the answer is the list of details the
student did not get to, so do not add a checker, and keep each example's second sentence naming what
is left out. That sentence is what makes it a skeleton rather than a small feature.
Two things about it are decisions. It uses "vibecode" approvingly for a throwaway prototype while
`engineering` argues flatly against vibe coding, and that is not a contradiction to tidy up: the
first version you intend to delete is the one place the argument does not apply. And its figure,
`IterationPaths`, splits the work between label and drawing on purpose. The labels carry the cause
(weeks against an hour) and the picture carries the effect (three long moves stopping beside the
target against twelve short ones landing in it), which is why neither reads as a caption of the
other. No prose reads the drawing, and that is a decision rather than an omission: the two labels
already say what the halves are, so a paragraph pointing at them would only say it twice. Both
halves live in one SVG so they stay side by side at any width; as two elements they would stack on a
narrow screen and the comparison would turn into a sequence.

**Only the right half branches**, and that asymmetry is the second thing the figure argues: three of
its nodes throw off versions that were built and dropped, dashed on the step 1 reading of a dash,
each **heading for the same target a few degrees off** and **most of them a single step**, while the
surviving path carries on into the ring. They start **early as well as late**, so branching does not
read as something that only happens near the finish. Aiming them at the target is what makes them
versions of the work rather than detours, and the geometry that keeps them from crossing is recorded
in the component. A step you can take again
is a step you can afford to take twice, which the left half at weeks a version cannot, so the left
half must never grow a branch. `evolution.lead.3` is the claim in prose (the same step more than once,
and the best one survives) and it is a **third lead paragraph rather than a line under the figure**,
because nothing below this drawing reads it and that rule still holds. It also states the practice
and not the picture, which is what keeps it from being a caption. Do not confuse it with
`prototype-conversation`: that section is several takes put in front of *people* to get a reaction,
this is several attempts at one step of your own work. And it is not `ScriptRuns` either, which is
variance across runs of one request rather than alternatives you choose between.

Its other two figures are evidence rather than drawings, and they are a pair: this site as the
skeleton it started as (the FizzBuzz warm-up on system fonts, one step in the sidebar) and the same
site with the details in (the header, the palette, the grouped steps, the settings). They replaced
prose that claimed the same thing, first the origin story in `walking-skeleton` (`GET /api/titles`
and a page listing titles) and then the whole of what is now `details`, and that swap is the
decision: the unit argues you get the shape working before you polish it, and two shots of this
repository doing exactly that carry it better than a sentence asserting it. The paragraphs beside
them read the pictures, so a replacement image has to keep what they point at, namely the sidebar
and the question and answer section that were there from the start against the branding, colours,
settings and navigation that were not. Both render through one component, `UnitShot`, which lives in
`shared/components/` rather than in this step: step 1's `usage-readout` became its second caller, and
that is the move `TaskCard` and `FlagBoard` made for the same reason. It takes an `id` used as both
the BEM block and the i18n prefix, plus the `namespace` its two keys live in, since `shared` never
imports a step. A third shot is a file in `front/public/`, a slot in the HTML, and two keys per
language. The images are served flat the way step 1's comparison shots are.

The `details` section is the one place in the step where a habit is stated as a number: a detail
should not cost more than an hour, and the section argues both edges (pulling detail forward is paid
for now, leaving it too long turns into a regression). It closes the argument the `evolution` unit
opens, so keep the pair of edges if you rewrite it. Cutting one leaves a lesson that only says
"later".

`engineering` closes on `WhereWouldItGo`, a `TaskCard` under the same `<hr>` and "Test yourself"
heading, with no prose between the rule and the card: the card's description carries the setting, so
a paragraph there would say it twice. Five moves, and the task exists because `DomainTree` and
`kata/step2/java` genuinely disagree. The project keeps `port/` beside `domain/` rather than inside
it, and its `adapter/` and `web/` packages split by technology with no `incoming/` and `outgoing/`
above them, so the controller and the in-memory repository both land somewhere else in the figure,
while `config/` and `aot/` land nowhere in it at all. **The card names none of that and gives no
count.** Which packages disagree is the exercise, the same way `problem.md` has no answer key, and a
move reading "three of them move" turns the sort into arithmetic. The unclassifiable two are the
judgement the fourth move is after: the figure is a shape rather than a law, and framework wiring
was never a domain concern.

**Nothing is moved, and the fifth move says so twice** (plan mode, then accept nothing). That is not
politeness about the agent. This project is `workshop`'s subject, so a package rename breaks
`mvn verify -Pgraded`, the `challenge` tests and the native-image flag, and a student who accepted
the plan would reach the capstone with a project that no longer builds. The description repeats the
warning in the words a student reads first, which is why both carry it. It is also the first
`TaskCard` outside step 1, ticked once to `kata.step2.where`.

`steering` replaced `scoping` in slot four, and the replacement was deliberate rather than a rename:
task sizing, which folder you open the agent in, and the `.claude` symlink trap were dropped
outright, so nothing in the tree teaches them any more. `DomainTree` drew the symlink until its row
was removed, so the trap is now absent from the course in every form. The unit argues the
thing the step had no home for, namely what you do while the work is running rather than before or
after it, and it owns five moves. Two of them are constrained by units either side of it.

**It opens straight on its first `<h2>` and carries no lead**, on `enablement`'s precedent. The two
lead paragraphs it was written with are cut, keys and all: the first argued that a wrong turn shows
in the agent's first few steps and that stopping it there costs a sentence while letting it run costs
the whole diff, and the second said what you do with the correction is the decision, two moves that
look alike and leave very different windows behind. Both were the section below them stated ahead of
time, which is what `Interrupt, or go back` argues at length. Do not write an introduction back in.

`Mid-flight` opens the unit instead, and it is the **mechanics** of correcting a run rather than the
choice between them: interrupt while it is thinking and there is nothing on disk, queue a sentence
while it works, or stop it and throw the session away. The two sections under it argue the choice, so
this one sorts the moves by where the agent is when you catch it and stops. Three decisions in it.
It **names Escape**, which is the only keystroke in the whole course; `Interrupt, or go back`
deliberately names none for rewinding, because that binding differs per harness, while stopping a
run is Escape in both assistants the course is written for. Its third paragraph is the destructive
move and is deliberately thin, because `When it is going nowhere` owns when to reach for it and
`step1/session` owns `/clear` itself, so it hands off with "there is a section on that below" rather
than naming a position that an insertion would break. And it must not grow the window argument: what
an interrupt *leaves behind* is the section after it, and a paragraph here about the wrong turn being
re-sent every turn is that section a page early.

`When it is going nowhere` is the newest of the five, and **where it sits is the argument**:
directly after `Interrupt, or go back`, because it is that section's counterpart. One is an agent
going the *wrong* way, the other one going nowhere, and the reader has to have met rewinding before
being told the case where it does not apply. So the section **names rewinding and rules it out**
rather than leaving the reader to work out that there is no good message to go back to. Two limits
on it. `/clear` belongs to `step1/session`, which owns choosing the seam and deciding what carries
across, so this points at that unit and must not grow a second description of the command. And it
stops at recovering the run: **when not to use an agent at all is a different topic**, absent from
the course on purpose rather than half-told here, so a paragraph about what agents are bad at does
not belong in this section.

Its worktree section is **not** a second telling of `goals`. `goals` argues one worktree as
isolation from your own day, so a four-hour run does not make your branch unusable. `steering` argues
one worktree *per agent*, so several run at once without colliding, and closes on the cost `goals`
does not raise: two agents are two contexts and two bills, and your reading is the bottleneck rather
than their speed. Keep those two arguments apart. Merged, the step says "use a worktree" twice and
neither time says why.

The `gaps.md` section turns on its third part and nothing else. Never assume and write the gap down
are bookkeeping; **stopping** is the lesson, because an agent that logs an assumption and then builds
on it has told you what it guessed underneath a diff that already depends on the guess. The rule
belongs in `CLAUDE.md` rather than a prompt, and the unit says so, because you cannot name a gap you
do not know about yet. Do not soften the stop into "flag it and continue".

The interrupt-or-go-back section deliberately does not name a keystroke. Rewinding to an earlier
message is described as something "most harnesses let you do", since the binding differs per harness
and a wrong one dates the unit. It carries one of the step's two `data-audience="self"` asides, the
other being `workshop`'s. Two others are gone: `setup`'s, on reading a skill's description with the
body covered, went with the hooks paragraph when that unit was trimmed, and `engineering`'s
file-counting diagnostic went with the prose under its `Domain-driven design` heading.

`setup` carries three drawings and they are one drawing three times: `ProjectTree` under the
CLAUDE.md heading, `SkillTree` under Skills and `HookTree` under Hooks, each `FileTree` with `dim`
set and that section's subject picked out in teal. One section, one heading, one tree, then the
prose. Only `ProjectTree` numbers its rows, because only its section points back into them. The
frontmatter example beside `SkillTree` is **`add-endpoint`, and both it and the three skills in the
drawing are invented**, which is the decision rather than a shortcut. This repository's own four are
`adding-a-step`, `lesson-writing`, `quiz-writing` and `repo-setup`, and every one of them belongs to
the person writing the course rather than the person taking it, so drawing them showed a student the
author's toolbox. A testing skill was the obvious student-owned alternative and is ruled out for a
different reason: `workshop.flag.coverage.help` asks the student to write one themselves, so
spending it here gives away part of the capstone. What is left is a plausible
skill for the work the exercises actually involve, and the rule that survives all of it is that
**the tree and the `<pre>` name the same skill**. `skills.4`'s cross-reference example is drawn from
the same set for the same reason, and `HookTree` follows the rule too: the script it draws is the
one the hooks `<pre>` declares.

The Hooks section exists because the paragraph that used to introduce them was cut from the Skills
section, and `patterns` used the word twice while defining it nowhere. It is deliberately the
shortest of the three: what a hook is, why it is stricter than the other two (a `CLAUDE.md` line
asks and a skill offers, both of which need the agent to read them, while a hook just happens), and
one `settings.json` block. **It is now the only place in the step that teaches hooks**, and its
closing forward pointer to `patterns` was cut when that unit stopped mentioning them at all, so a
paragraph written back into `patterns` about hooks means restoring the pointer with it. `HookTree` paints
`settings.json`, `hooks/` and the script all teal on purpose: a hook is two files and a reader who
takes away one of them has the wrong picture.

`setup` closes on the step's second flag board, and it is the only exercise outside `workshop` that
a machine grades. Three flags, one per place `kata/step2/java` tells an agent how to work: the skill
under that project's own `.claude`, the project briefing, and the briefing scoped to the `domain`
package. **The prose names none of the three files, and no board hint names one either.** That is
the exercise: the unit says a project you have not opened was set up before you got there, go and
find out how, and stops. A sentence listing the files, or a hint reading "look in
`.claude/skills/`", ends it. **Do not collect the three flags anywhere in the tree**, including in
a comment; `setup-flags.ts` holds salted hashes and its own salt, on the reasoning its own file
gives.

They are plaintext in the Java project rather than veiled the way the workshop's flags are, and
that is deliberate rather than an oversight: reading the file *is* the task, so there is nothing
left to hide behind once the student is looking at it. The three help dialogs describe a *symptom*
instead (an agent that answers from nothing, a file never read from the top of the project), so a
stuck student gets a way of looking rather than a filename.

**`FlagBoard` is the mechanics with the data lifted out**, the same move `ConnectBoard` and
`TaskCard` made when a second caller arrived. `Workshop` and `SetupFlags` are the two callers, each
a block, a storage key, a salt, a flag list and a message prefix, and neither renders an element of
its own. Anything about how a board *behaves* goes in `FlagBoard`, so a student who learned the
interaction on one meets the same one on the other. The workshop's ids are unchanged (`flags-*`),
which is what makes the extraction invisible to anything that pointed at them. Two storage keys, so
the boards do not mark each other's rows solved, and both sit under `kata.step2.` where
`shared/lib/reset.ts` can find them.

`patterns` is one short lead paragraph, `Skill iteration`, then `Scripts`, and **the `script-runs`
figure has the last word**: a closing section called "Around the script" was cut, along with the
lead's second paragraph. What went with them is worth knowing before writing any of it back. The
cut section argued that the judgement stays in the skill while the script does the mechanical part,
that a hook calls the same script when it has to run unasked, and that not everything reduces to
one (taste has no exit code, but the em-dash rule's check is still a `grep`). The cut lead paragraph
was this repo's own four skills, `lesson-writing` and `quiz-writing` beside `adding-a-step` and
`repo-setup`, as prose that arrived after the mistake. The first heading read "Give it a home" until
it was renamed, so its keys are `patterns.skill-iteration.*`, and its prose was replaced along with
it: the triage of convention against skill against hook went, and so did the new-step file list the
cut `quality` unit also carried. **The word "hook" now appears nowhere in the unit**, which
is what `setup`'s Hooks section lost its forward pointer to. What the section argues now is the second
pass. A skill feels like magic, the answers still come back slightly off, so you repair the output
and have the agent work out what the skill failed to say. **Its two `<pre>` blocks are one skill
twice and differ by exactly one rule**, the announced count added to the em-dash rule, so the reader
diffs them by eye; rewrite one and the other moves with it, or the section's claim is on the page
with nothing under it showing it. They carry no `data-i18n` key, like every other code sample. The
closing paragraph is the payoff and names two things, corrections that stop coming back and a file
the team shares. **The middle section names
no script of its own, and that is the correction it was rewritten for.** It was called "A script
instead" and argued at length for `scripts/new-step.sh`, a file this repository never wrote, closing
on "a skill only helps the people who have Claude open" in a repo that chose the skill; `audit.md`
carried that as a defect. What it argues now is general: your agent writes the Bash you do not, a
skill that calls the script is what makes the agent aware of it, and what you buy is predictability
plus the tokens the agent stops spending working the steps out again.

`ScriptRuns` is its figure and it is **variance across runs and never the clock or step size**.
`LoopsPerHour` in `enablement` owns how many turns fit in an hour and `IterationPaths` in
`evolution` owns few-long against many-short, so drawing a run here as time spent collapses this
into one of those. The same request three times, drawn twice: three muted cards whose bars differ,
then three teal cards that are one set of widths repeated, which is the equality the section claims
in words. The cards are the same size in both rows for the same reason. **Only the second row is
labelled.** The first is what you already have and a name over it says prose twice, so what each row
produces sits on the right instead, and that pair is the drawing.

`workflows` is four ways of handing work over, and **the order is the argument**: naive, plan-based,
spec-driven, audit-driven, running from cheapest to most deliberate, with a closing section saying
they are not exclusive. That close is the unit rather than a coda, so a rewrite that drops it leaves
four techniques and no reason to pick one. It carries no exercise and no quiz, and the reason is
that the choice is the lesson and there is nothing a card could ask for.

Two of the four are already taught elsewhere, and the unit **points rather than repeats**, the same
rule `harness.coordinator.3` follows in step 1. Plan mode belongs to `step1/prompt`, which defines it
as meta-prompting the provider built for you, so the section here adds only what turns it into a
workflow: doing it by default, and the interview making the engineer decide things they had skipped.
Reflection belongs to `step1/harness`, so the audit section names it and moves on to what is new,
namely that it is aimed at a project instead of at one answer. Neither may grow into a second
definition.

The naive section uses "vibe coding" disapprovingly and links to `engineering`, then defends it in
one paragraph that lists three places. Two are throwaway code, which is the same tension `evolution`
carries: what you intend to delete is where the argument does not apply. The third is the one that
survives everything else in the step, namely that **nudging is not restructuring**, so a padding or
a log line does not earn a workflow. That one is what `Plan/naive` at the end of `WorkflowTimeline`
turns on, so the two move together, and it belongs in that paragraph rather than in a closer of its
own: the section is about where naive belongs, and a second paragraph making the same kind of claim
read as an afterthought. Do not tidy any of it into agreement with `engineering`.

It carries seven figures, and four of them are one set. `FlowDiagram` closes each section with who
talks to what: `you → agent → [project: code]`, then the same with a two-way link to the agent, then
a spec joining the code inside the project, then `audit-driven`'s six-box chain closed into a cycle.
**They are read down the unit rather than one at a time**, so a change to one is a change to all
four, and the colour rule is what makes that work: a two-way link is teal, a one-way link is muted,
a loop's return path is teal, so the teal is always the thing that section adds.

Three things inside it are decisions. **The project is always a frame**, never a box, and what sits
inside it is what changes across the four; that is the argument that a spec is a file in the
repository rather than a document beside it. **`audit-driven`'s spec is faint**, dashed and set back
on the step-1 reading of a dash, because an audit needs no spec: you can point one at a repository
that never had one, which is what makes it the workflow you can bolt onto anything. And the labels
are **bare nouns** (`agent`, `code`, `project`) rather than `the agent`: `audit-driven` runs to six
boxes and five arrows, and the definite articles were what pushed it past the prose column into
wrapping. The row gap is `gap-2` for the same reason.

`audit-driven` is the long one and the only one drawn on two levels. Its row is
`you → agent → audit.md → you → agent → [project]`, and around it runs a cycle in two halves that
meet on the same two columns. Above the row, the project goes back into `audit.md` on a path
labelled `update`, because what a pass produces is a new version of that file. Below it, a `you`
**hangs under `audit.md`**, the project feeds it, and it feeds back up into `audit.md`. Splitting
the cycle across both sides is what keeps either half from having to dodge the other.

Four mechanical notes, and they are all one problem: a box's edges are not the row's edges. The
paths are **measured** rather than inset by constants, since the boxes are words and the project
frame is taller and wider than a plain box. `useLoopInset` reads the target box, the last box and
the branch box under a `ResizeObserver`, and returns `left`/`right` for the two columns, `drop` for
how far the target starts below the row's top, `rise` for how far it ends above the row's bottom,
and the branch's width. Without `drop` and `rise` an arrowhead stops in mid-air, because the row is
as tall as the project frame while the box being pointed at is not. Every arrowhead then keeps a
`STANDOFF` from its box, so the two read as arriving rather than touching. And the arrows are
`aria-hidden` with a per-figure `aria-label`, because direction is the whole content and the labels
alone do not carry it.

`AuditExample` is four rows of a security audit with a switch in its corner
that turns the table into the markdown behind it, and both come off **one set of strings**, so the
two views cannot drift: `toMarkdown` pads the same cells the table renders. That is the whole reason
the switch exists rather than a second `<pre>`, and it is what the paragraph under the figure turns
on, namely that an audit looks like a report and is a file that diffs. Three things in it are
decisions. The subject is **security rather than this course**, because a reader can tell a missing
`aud` check from a half-set header and cannot tell whether a curriculum unit is thin; the repository's
own `audit.md` is named in the prose instead, which is where the evidence belongs, and the caption
says the table is not a run against this repository. **Each status is used once**, so the four rows
teach the legend by standing next to each other and the figure needs no legend line. And the solid
row **carries no remark on purpose**, because the paragraph under it claims a row you can stop
carrying around is worth as much as the rest. The table is sized to fit the prose column: only the
markdown scrolls, since it is padded to align and therefore cannot wrap.

`WorkflowWeights` and `WorkflowTimeline` are the closing section's pair, in that order, and they
answer different questions: the first says how the four differ, the second says they combine. The
weights sit mid-section, under the sentence about not joining a camp; **the timeline closes the
unit**, with one paragraph of intro above it and nothing after it. That is the one place in the step
where a figure has the last word, so its own labels have to carry what it argues: there is no
paragraph below to read it.

`WorkflowTimeline` is one project's path, naive to plan-based to spec-driven to audit-driven and
back to `Plan/naive`. **That last label is the argument**: you drop back to a workflow you already
used, and which one depends on the row, since a one-line header fix does not earn a plan. Nothing
marks it as a return, because the repeated names say it. Three things it carries are load-bearing
and live in the figure's own labels rather than in prose: the audit reflects on **your own spec
work** rather than
on the agent's answer, the closing plan exists because of what the audit turned up, and the return
path under the last three stages writes the changes back into the specs. That last one is the way
spec-driven work fails quietly, so removing the return line removes the warning. It is DOM rather
than SVG on `ModelTiers`'s precedent: the notes wrap themselves in both languages, and the row
becomes a column on a narrow screen with the arrows turned, which an arc drawn in SVG could not do.
The return path is **three borders on one box**, so it is a bracket with two right angles rather
than an arrow, and it reflows with the grid instead of carrying coordinates. A bare arrowhead was
tried first and is the thing to avoid: it lands in the gap between two cards and reads as pointing
at the wrong one. The chevron is `Up` and caps the left riser for the same reason. **Both risers sit
on card centres**, `Spec-driven` and the last `Plan-based`, and the two margins that put them there
are arithmetic rather than nudges: a percentage margin on a grid item resolves against its own grid
area, so half a card is `(100% - 1rem) / 6 - 0.75rem` once the `size-4` arrow and `gap-2` ahead of
each card are taken out. Change the parent's gap or a stage cell's lead-in and both numbers move.

`WorkflowWeights` closes the unit and is the comparison. Four bars of **the same length**, each cut
into what you settle first, what the agent runs, and what you read afterwards, so the drawing says
the work moves rather than shrinks. That equal total is the argument, which is why the bars are one
figure and not four: four separate drawings say nothing, the way `McpParts` and `McpOvals` only work
as a pair. `naive` and `audit-driven` come out close on that axis deliberately, because they are
close, and what separates them is the second thing the figure carries: the artifact. A kept artifact
is a solid pill (`spec.md`, `audit.md`), the plan is a dashed outline on the step-1 reading of a
dash, since it goes when the session does, and `naive` has no tag at all, which has to read as
deliberate rather than as a gap. The proportions are hand-authored, and the only place that is
recorded is the component's own docblock: it carried a caption saying so, on `NextToken`'s
precedent, and the caption was **cut on purpose**. It sits in the closing section rather than under
the lead, because it labels the four by name and a reader who met it earlier would be looking at
four words they had not been given yet.

`enablement` follows `workflows` and owns the one thing the rest of the step leaves out: **how long
it takes to find out**. Every other unit decides what you hand over or what you do while it runs;
this one is about the machinery around you that answers you in seconds instead of in a deploy. Three
sections, no exercise and no quiz, on `workflows`'s reasoning rather than as an omission: there is
nothing a card could ask for that the student's own project would not answer better. Run it locally
front and back, grow the crossbar, and count where the day goes.

**It opens straight on its first `<h2>` and carries no lead, which is deliberate.** The two lead
paragraphs it was drafted with said the work comes back fast and the checking is what takes the
afternoon, which is the unit's premise restated rather than anything a reader could use, and they
were cut for that. Every section under the heading opens cold on its own claim, so nothing is
missing. Do not write an introduction back in.

`run-own-machine` is two paragraphs and neither says what the other does. The first is the aim and
the premise together: frontend, backend and the database in a container, with data in it, so a wrong
column shows up as a wrong column, closing on the agent writing the change in seconds and your check
having to keep up. **It opens on
what running it locally buys rather than on the instruction**, because the heading above it already
says to run it on your own machine and a first line saying so again is the heading twice. **It names
no project either, and that is the decision.** It was three sentences of this repository's own two-terminal
setup (`mvn spring-boot:run`, `npm run dev`, the Vite proxy) plus a seeding argument about the
expired tier and the member with three hundred loans, and a student reading it against their own
stack had to translate every line of it first. What is left of the seeding is one clause, data that
**covers the everyday cases and the edge cases**, and it is the only place in the step the local
data is asked for, and it stays general rather than naming cases of its own.

**A hinge paragraph sat between the two and was cut**, and what it said is the thing not to write
back: the setup buys a short gap between changing something and finding out, code arrives in seconds
so the gap sets your pace rather than the typing, make it as small as you can, and every loop is
another chance to steer. It went when the first paragraph took the agent-speed claim into its
closing sentence, because the two then made one argument twice. The premise is stated once now, at
the end of paragraph one, and that is where it stays. What the cut costs is "make it as small as you
can", the sentence that turned the premise into something a reader does, and "every loop you get
through is another chance to steer", which was the only line in the section pointing at `steering`.
Neither belongs back in the opener as an extra sentence; if either is wanted, it is a paragraph of
its own with something to say beyond restating the close above it.

The second is the
agentic turn on all of it: hand the agent the running app and the browser server `connect-one`
already had it connect, and it opens the page, reads the wrong column and fixes it before the work
comes back to you. That paragraph is why the section belongs in this course rather than in general
engineering advice, so it goes last. It points at
`step1/tools` for the server **as something described there rather than something the student did**,
since a reader who skipped that task should not be told they connected anything, and it names the
unit rather than an MCP package, on the usual rule. It **opened on "the agent uses all of it too"**
until the paragraph above it started naming the agent, and it now gives the setup and the behaviour
one sentence each and stops on the fix. Two closers went in turn, "That is a whole loop that never
reached you" and then the bare fragment "A whole loop that never reached you", so the paragraph ends
on the gem with no line reading the scene back. Do not write a third one: the scene is the payoff.

`LoopsPerHour` closes the section, under the agentic paragraph: one hour drawn twice, two turns
against eleven, each turn cut into change, wait and look. **It was moved here when
`reachable-one-step` was cut**, and the opening paragraph is what holds it here: that is where the
agent writing a change in seconds and your check having to keep up is stated, and this figure is
that claim measured. Its two labels were rewritten in the same pass, from "Deploying to
find out" against "With the shortcuts in" to **"Not running it locally" against "Running it
locally"**, because the first pair named the cut section's example and would have left a figure
labelled for prose that is no longer in the unit. **It is on the clock and never on step size.** `IterationPaths` in `evolution` already owns few-long against
many-short, measured as distance to a target, and the two collapse into one argument the moment
either borrows the other's vocabulary. The bands are the same width because the hour is the same
hour, which is the whole drawing. Two things in it were fixed after they were first drawn and should
not come back. The **wait is drawn as nothing**, an empty part of the turn's box rather than a pale
fill, so the figure costs three tones instead of six and the slow band reads as two mostly empty
rooms. And the **band spans the full viewBox**, so its edges land on the prose column's edges; inset
by a margin it read as a smaller picture sitting inside the text rather than as a measure of the
column it is in.

A third paragraph was cut and should not come back. It said that some of what you build has no
frontend, so ask the agent for a single page that calls the endpoint and prints what comes back. The
section is about running what you already have, and a detour into building a throwaway UI is a
different task; `evolution`'s fifteen-minute skeleton is where building a rough thing to look at
lives.

**A `fitness-tests` section was cut**, and this is the record of it. It said an agent writes the
happy path unasked and leaves out the empty list, the expired tier and the amount that is exactly
zero, that naming those yourself is what holds the shape while the agent rewrites everything
underneath, and it pointed at this step's own `graded` and `challenge` profiles as two fitness tests
that answer in one command. All of that survives elsewhere: `engineering`'s `Quality gates` owns the
written-down bar and `workshop` is where the two profiles are actually run, so what went was the
third telling. Do not restore it as a section; if the edge cases are wanted in this unit, they belong
to a paragraph that argues something `engineering` does not.

It points across two boundaries rather than re-arguing them, and each is easy to collapse.
`steering` owns what you do mid-run, so `where-day-goes`
is a paragraph and a link for that half. Its second paragraph is the hours that go on **thinking**,
and it is where the cut `code-got-cheap` section's surviving instruction lives: work the
implementation details, argue both sides, come out with a design decision you could defend, because
a decision you did not make is one the agent made for you. Keep it about deciding rather than about
structure, or it turns into `engineering` a second time. And `goals` owns "if you cannot name the command that answers yes or no,
you do not have a goal": that is about the instruction you hand over, while this unit is about the
harness on your own machine. Keep the two apart or the step tells a student twice to make things
measurable and never says why the second one is different.

**A section called `reachable-one-step` was cut from the unit**, heading, prose and Dutch keys, and
this is the record of what went with it so nobody restores half of it. It argued the general rule
that whatever you are working on should be one step away, with the twelve-minute deploy as its
example and the bill a new person pays on a fresh clone as its second half, and it closed on one
command for setup, hot reload, a component workbench, and the reminder that **the pipeline still runs
on every push, because the shortcut is for the loop and not for the release**. Anything written back
in here needs that last sentence, or the section reads as advice to skip CI.

Two earlier drafts are buried in it and are worth knowing before writing anything of the kind again.
It was first a section called "Shortcuts past the login" that taught the example and never stated the
rule, which is the shape to avoid; the token-bearing `.http` file and the seeded dev profile went
with that login. **Local data belongs to `run-own-machine` and is a clause there rather than an
argument**, so a section written back in here does not get to make it either. `LoopsPerHour` was this section's figure and stayed in the unit rather than going with it,
moved up under `run-own-machine`, which is where it is documented.

`t-shaped` argues the shape from the agent rather than from the market. Implementation gets faster
with every release, so what is asked of you moves up a level: keep the specialism, know enough of
the contexts around it to judge what comes back, and take the closing pair as the point, namely that
**the agent handles the detail for everyone alike, so knowing the detail is worth less than it was
and knowing what good engineering looks like is not**. It said "the market moved first, which means
the upskilling is on you" before, which put the cause outside the course and outside the agent. Keep
the cause where it is now. The `engineering` pointer hangs off that closing sentence rather than
standing as a paragraph of its own: as a second paragraph it opened on the link and then restated
the breadth claim the section had already made three sentences earlier, which is what made it read
oddly. One section, one paragraph, and the link names the unit rather than teaching it again. **The
section now carries no example**, having dropped the database migration, the frontend state bug and
the build pipeline it used to name, so `SkillShape` under it is the only concrete thing in it. That
is the trade to know about before adding prose here: the figure is carrying the section.

**A `code-got-cheap` section closed the unit and was cut.** It said code used to be the expensive
part and a craftsman built it slowly, that this is over and nobody is buying code from you any more,
and that what sells is knowing what to build and being able to tell whether what came back is right,
so think while the agent types and be the architect rather than the bricklayer. Both halves of it
have homes now: `t-shaped` carries the worth of the knowledge in one sentence, knowing the detail
being worth less than it was and knowing what good engineering looks like not, and
`where-day-goes`'s second paragraph carries the thinking. A section written back in would be one of
those two a second time.

`SkillShape` sits under `t-shaped`, which is now the middle section, so the
figure closes neither the unit nor its own section's argument; `where-day-goes` closes the unit. Nothing after it reads the drawing back,
which is the part that has to survive the move: its own labels carry
what it argues. An I beside a T, and **the stem is the same depth in both**. A T drawn with a
shortened stem argues "get shallower", which is not the claim under it. The crossbar is the only teal
thing in the figure, on the step's rule that teal is what the shape adds. The dashed baseline both
stems land on **carries no label**: it had one reading "the depth you already had, unchanged" and it
was cut, because two stems ending on one line say that already and the key is gone from both bundles.
Only the T's half is captioned now, which is the same rule the crossbar's colour follows: what is
named is what the shape adds.

`parallel` follows `enablement` and took the slot the cut `quality` unit left, though it is not a
rewrite of it: what it owns is **how many agents you have running, and what each arrangement costs
you in control**. Four sections and the order is the argument: `One agent at a time` (the most
control, and the shape for work that is deep rather than wide), `Many agents at once` (output up,
control down, and all of the reading arriving at the end), `The orchestrator` (the same four agents
with the coordination moved into one of them), then `One in front, the rest behind`
(control back in the middle, which is what most days actually look like). Running most-to-least and
then landing in the middle is what makes the last section read as the answer rather than as a fourth
option. It carries no quiz and no exercise, on `workflows`'s reasoning: the choice is the lesson and
there is nothing a card could ask for that the student's own week would not answer better. **It opens
straight on its first `<h2>` and carries no lead**, on `enablement`'s and `steering`'s precedent.

**`The orchestrator` sits directly after `Many agents at once` because it is that section answered**,
not because it is the next thing in a list. Four sessions you opened yourself and four sub-agents one
agent briefs are the same amount of work running; what changes is who holds the wires. So the
section opens on "a better-managed version of that" and stops at where the coordination went. Move
it and that opening sentence stops pointing at anything.

**It is one paragraph, and it ran to two until the second was cut.** What went with it is worth
knowing before writing any of it back: the fan-out never reaching your screen, four runs therefore
arriving as one thing to read, one plan behind all four making them less likely to write over each
other, and what you give up being which sub-agent decided what, so the brief is the thing to ask
for. Two things follow. The warning aside under `Many agents at once` **no longer has an answer
anywhere in the unit**, which is the decision rather than an oversight: the ceiling that section
names is your attention, and a paragraph saying an orchestrator lifts the collision half of it was
arguing with the strongest claim in the unit while leaving the other half standing. And
`agents-at-once.orchestrated.note` ("four runs, one thing to read") is now **the only place that
claim is made**, so the figure carries it alone and a rewrite of that note drops it from the course.

Its name is a knowing exception. **`step1/harness` calls this the coordinator**, and it owns the
whole mechanism: the expensive model on top and cheap sub-agents below, a sub-agent starting on an
empty context with nothing but the base instruction, and decomposing first because every part handed
out is a prompt written into that empty context. None of it may be re-derived here. The heading says
`The orchestrator` because that is the name the pattern travels under, and `orchestrator.1` bridges to
step 1's word **in its own second sentence** rather than leaving the course with two unconnected
terms. If either name changes, the other has to move with it. `model`'s closing section is the second
neighbour: it owns why the expensive tier is the one that writes the brief, and this section no
longer mentions a brief at all, so do not let it grow a sentence about who writes one. And the paragraph carries
the `pattern` icon, since this is one of the course's AI design patterns rather than a habit.

Four boundaries hold the unit up and every one of them is another unit a second time, so each is a
link and a clause rather than a paragraph. **`steering` owns the mid-run window**,
which is what `one-agent-time.1` points at instead of describing interrupting, and **`steering` owns
one worktree per agent**, which is why `many-agents-once.2` names the worktree in half a sentence and
does not argue for it. **`goals` owns the long-running outcome**, so `one-front-rest.2` says the jobs
behind you are goals rather than instructions and hands off. The agents-are-two-bills argument is
`steering`'s too and must not turn up here.

The warning aside closes `Many agents at once` and it is **step 2's second
`data-variant="warning"`**, `setup`'s being the first. It carries the two costs no other unit states:
two agents on the same code writing over each other, and **your attention degrading rather than
running short**. That second one is easy to collapse into `steering`'s "your reading is the
bottleneck rather than their speed", and it is not the same claim. `steering` says reading is slower
than producing; this says the tenth diff of the afternoon gets a worse read than the first did. Keep
them apart, or the step loses the only place it says an agent can hand you more than you can stay
sharp for.

`AgentsAtOnce` is the figure and **closes the unit rather than opening it**, which is
`WorkflowWeights`'s placement decision made again: it names all four arrangements, so under the
first heading it would put three labels in front of a reader who has not been given them. Nothing
below it reads it back, so its row names and its right-hand notes carry the comparison, the way
`ScriptRuns` puts what each row produces on the right instead of into prose. **Teal is the agent you
are actually watching**, and that is the only colour rule in it, which is why row two has no teal at
all: four at once is nobody watched. It borrows `flow.node.you` and `flow.node.agent` from
`FlowDiagram` rather than declaring its own words, so the two figures name the same boxes and a
rewording moves both.

**Rows two and three are the pair the figure exists for**, and two things keep them a pair. They run
**the same number of agents**, so the comparison is about who holds the wires and not about volume,
and the orchestrator's extra box sits at `LEAD_X` in the gap between `you` and the agent column every
row shares, so the drawing says what an orchestrator is: a hop inserted between you and the work.
Its sub-agents are **muted but solid** rather than dashed, which is the one place the colour rule
needs reading carefully: dashed means nobody is watching, and here somebody is, just not you. That is
what makes row four different from row three at a glance. Changing the sub-agent count, or dashing
them, ends both arguments. `AgentsAtOnce`'s own docblock carries the geometry.

A tenth unit, `workshop`, closes the step as its capstone. It is the one part of step 2 a machine
can grade, because it grades the thing `engineering` and `goals` argue for: a goal a build answers
yes or no to. **`workshop.lead.1` names those two units rather than counting back to them**, and that
is a correction rather than a style choice: it read "the last two units" until `enablement` landed
between `workflows` and `goals`, at which point the count pointed at a unit that argues neither the
bar nor the goal. It named `quality` until that unit was cut, and it has also **stopped counting the
habits** for the same reason the positional reference went: "the six habits" was a number an
insertion or a cut could falsify silently, and cutting `quality` did. Positional references to
neighbouring units break silently on an insertion, so
name the unit. It ships a small loans domain in `kata/step2/java` that is green but un-hardened, and
a `graded` Maven profile that measures it against three goals - a coverage floor, a complexity
ceiling and honest (mutation-tested) coverage. `mvn verify -Pgraded` prints a leetspoken flag for
each goal met and fails until all three are. The student hardens the module (that is the exercise,
so do not ship the tests or the refactor), reads the flags, and pastes them into the `workshop`
flag board.

The board carries a **fourth flag of a different shape**. The first three sharpen code that already
runs; this one is functionality that does not exist yet. `MemberStatements.forTier` ships
unimplemented, so `GET /api/loans/statement/{tier}` answers with a 500, and the only description of
what it should do is a set of `@Tag("challenge")` tests. They are excluded from the default build and
run with `mvn test -Pchallenge`, red until the method is written. The unit tells the student to plan
it in plan mode against the failing tests before implementing. Once the tests pass the live endpoint
returns the code, which goes into the board like the others. **Do not implement `forTier`**: that is
the exercise.

The board carries a **fifth flag of yet another shape**: not a profile and not the JVM, but a compiled
native image, and it is built to resist a one-shot so the student has to plan it. The seam is
`step2/aot/NativeImageFlag`, an `ApplicationRunner` that prints only when `NativeDetector.inNativeImage()`
is true, so `mvn spring-boot:run` and `mvn test` stay silent and the flag is proof of a native image.
Its payload is a classpath resource rather than a Java constant, so an image built without thinking
about resources starts, cannot find it, and prints a miss instead of the code. Two things stand
between the student and the flag, wiring an ahead-of-time build and reading that runtime miss as the
spec for the fix, and each is a plan-worthy step the unit tells them to work in plan mode.

There used to be a third, and it is worth knowing why it went. Step 1 and step 2 once shared one
Maven module, so the Boot plugin pinned `<mainClass>` to `Step1Application` and a naive native build
compiled the wrong step; aiming it at step 2 was an obstacle in its own right. Splitting the steps
into their own projects removed it, since `kata/step2/java` holds one main class and the build finds
it. The `workshop` unit was rewritten to stop claiming otherwise. **If the exercise wants a third
obstacle back, it needs a new one rather than that sentence.**

**Do not add a `native` profile to `kata/step2/java/pom.xml`, and do not write the resource hint or a
`RuntimeHintsRegistrar`**: wiring the build and planning the hint are the exercise. Do not spell out
the fix here either; the runtime miss is what the student is meant to read.

