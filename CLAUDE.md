# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## How this kata works

**This repository is built one step at a time.** It starts deliberately simple and works
toward advanced topics, and each step builds directly on the code the previous step left
behind. That progression is the point of the exercise, not an accident of history — so a
request is almost always "add the next step", not "build the finished thing".

What this means when working here:

- **Implement only the step being asked for.** Do not jump ahead to a design that a later
  step will introduce, even when the eventual shape is obvious. Skipping the intermediate
  form destroys what the kata is teaching.
- **Build on the existing code rather than replacing it.** Earlier steps are the
  foundation. Refactor them when the current step genuinely calls for it, and say so —
  but do not quietly rewrite working code from a previous step as a side effect.
- **Leave every step green.** `mvn test` must pass in every `kata/stepN/java` at the end of a step;
  each step is a coherent stopping point, ideally its own commit.
- **When a step's scope is ambiguous, ask before expanding it.** Guessing wide is the
  costly direction here.
- **Record decisions, not content.** When a step introduces a real constraint — a prohibition, a
  gotcha, a deliberate piece of obfuscation, a reason something is shaped the way it is — write it
  here. Do not summarise what a unit teaches: the unit HTML is the readable source for that, and a
  summary here only rots. This file is the part of the repo the code cannot explain about itself.

## Project state

Two parts, both walking-skeleton thin:

- **Backend** (`kata/stepN/java/`) — one standalone Spring Boot project per step, each exposing its
  own `/api`. It is now the *subject* of a step rather than a grader for one: step 1 serves a
  catalogue of book titles the student instruments and traces, step 2 a loans domain they harden. It
  does not serve the curriculum.
- **Frontend** (`front/`) — React + Vite + shadcn/ui, on the teal design system described under
  Conventions. It owns the curriculum content and renders it for one of two audiences.

`step1` is **context**: the layers an agent's context is assembled from (prompt, session, harness,
tools) and the fact that they share one finite window. It is *titled* "Context, model, mechanisms"
(NL "Context, model, mechanismen"), and the longer title is the decision: the step outgrew the
one-word name once `model` and the machinery around the window joined it, so the sidebar says what
is in there rather than naming one of the three. The topic is still context, which is why the
sentence above still opens that way. `FLAG_SALT` in `flags.ts` still reads `kata-step1-context-v1`
and must not follow the title: it is a hash input, so renaming it invalidates every flag on the
board. Eight units — `tokens`, `prompt`, `tools`, `context`, `session`,
`harness`, `model`, `workshop` — and the unit HTML is the source for what each one teaches. The
fourth was called `intro` until it was renamed, id and all, so its URL is `/steps/step1/context` and
its prose keys read `context.<section>.<n>`. Old links to `/steps/step1/intro` are dead and there is
no redirect, which is the decision: the app has no route aliases anywhere and one unit is not the
place to start. A student mid-run loses that one unit's tick out of `kata.completed`, since progress
is keyed by `step/unit`.
That order is the registry's, and `workshop`'s opening list recites it, so moving a unit means
visiting that sentence in the HTML and in `nl.json`. **The two layers a student writes and reads for
themselves come before the theory**, which is why `prompt` and `tools` sit ahead of `context` rather
than after it. Two things follow from that and are load-bearing: `prompt` is where the word
*context* is defined (one paragraph, and `context` must not grow a second definition), and the three
oval figures now run as a sequence rather than an empty frame followed by fillings of it.
`PromptInContext` draws the prompt and nothing around it, `ToolsInContext` draws the frame with a
tool across its border, and `ContextDiagram` in `context` is the populated window at the end,
holding `prompt`, `resources` and `tools`. **`ContextDiagram` was drawn empty when `context` opened
the step and is not any more**, so nothing may describe it as the empty one. **`PromptInContext`
lost its frame on purpose and must not get it back**: a student meets that figure before they have
met the window, so a frame there spent the vocabulary a unit early and left `ContextDiagram` re-showing
a picture they had already seen. The first teal frame in the step is now `ToolsInContext` in `tools`,
which is what the "draws no context frame" comments in `TokenSplit` and `TokenAttention` point at. Its
oval instead carries `ContextDiagram`'s prompt region geometry and fills, so the two read as one
shape seen twice; the component name still says `InContext` and no longer describes the drawing. Neither is to scale, and the share-by-volume figure is still `SessionMakeup` in `session`.
One term is knowingly loose: `ContextDiagram`'s `resources` is the broad word for what the agent
read, while `tools` defines `resource` narrowly as content an MCP server hands over uncalled.
**Two of the eight are deliberately not in that
list**: four layers fill the window, `tokens` is the unit it is counted in and `model` is the reader
on the other end of it, so `workshop` names four and not six, and each of the two opens by saying so.
Promoting either to a layer means visiting `workshop`, `context` and every "four layers" sentence in
the step, which is a larger change than it looks.
Three editorial constraints the HTML does not state on its own: every layer unit goes past merely
naming its layer, and none of the four is allowed to read as a stub (they sat within about a hundred
words of each other until `tools` grew the MCP material, and that floor is the part that matters); the sub-agent starting blank is the point the three sub-agent `harness` patterns turn on; and
the pattern diagrams share one vocabulary (a teal frame is a context, a bar is something in it,
dashes are what is not) that any new diagram should join. `context` and `prompt` each carry a
three-question quiz. `harness` closes on `PatternMatch`, a drag-to-connect exercise whose three
situations against four patterns leave decomposition on the board with nothing pointing at it. It is
the shared `ConnectBoard`, which `model`'s `PickTheTier` is too; the reasoning for that is under
`model` below.

`tokens` opens the step, ahead of `context`, and gives the step's unit of measurement a page before
anything is measured in it. It is prose and three figures, with **no quiz and no "Check yourself"
section**: the figures are the doing, and every quiz in the course already sits in the opening units.
Nothing in it carries a currency; `ModelPricing` is still the only place in the course where a number
has one. Its prose has been cut hard and deliberately: it opens cold, closes on the caching pointer
with no summary or handoff, and the figures are left to be read rather than narrated. Sentences that
told the student to click something, or that recapped what the figure had just shown, were taken out
one at a time. Do not write that layer back in.

Four things about it are decisions. **Neither `TokenSplit` nor `TokenAttention` draws the teal
context frame**, and that is what protects `tools`: `ToolsInContext` is the first frame a student
meets, so every unit above it stays out of that vocabulary rather than spending it early, the way
`ModelTiers` does and the way `PromptInContext` does since it gave its own frame up. The word *context* is likewise not used before `prompt` defines it, which is
one page later. **`NextToken` and `TokenAttention` are a pair on one sentence** (`the
build failed because it timed out`): the first shows it being written a token at a time, the second
takes the finished sentence apart, and the prose in between says so. Changing the sentence in one of
them breaks the pair. **`TokenSplit`'s prose row has to contain a word that breaks**, which is why it
is the sentence it is: `unscrambled` comes apart at `unscr` and `ambled`, at a point that is neither
a syllable nor a stem. No prose says so any more, so the figure has to carry it alone and a tidier
sentence quietly ends the exercise. There is deliberately no second sentence in another language: an
English row against a Dutch one made the figure an argument about languages instead of about tokens.
And **the three
figures are not equally trustworthy, which their captions no longer say.** `TokenSplit`'s splits are
real output from `o200k_base`, stored as data with no `nl` entry. `NextToken`'s scores are
hand-authored and its caption admits it. `TokenAttention`'s weights are hand-authored too and its
caption was removed, so the only warning left is the comment in the component: if that figure ever
grows a caption again, that is what belongs in it.

`NextToken` draws a second view under the scores, a tree of what each candidate would have led to,
and it exists to hold up one claim the prose makes and the scores alone cannot: **the top-scored
token is not always the one taken.** It sat behind a Show button first and does not any more, which
is the decision: a fan of roads not taken is the argument, and an argument you have to click to see
is one most readers never meet. Without it the figure teaches that a model is a lookup table with
extra steps. One invariant keeps the drawing honest, and it is easy to break by editing one list and
not the other: the first `then` entry of each pass's first candidate is the token the *next* pass
actually takes, which is what lets the tree draw one unbroken taken path.

The unit carries two forward pointers and must not grow a third telling of either. Output being
priced above input goes to `model`, and the prefix cache goes to `harness`, each in one paragraph
naming the unit that owns it. That is the same rule `harness.coordinator.3` follows for
decomposition. `TokenAttention`'s arcs running backwards only is what the caching pointer turns on,
so it is load-bearing rather than a simplification: appending leaves every earlier weighing intact.

Decomposition is the first of the four pattern sections, ahead of the coordinator, and it is the
only one with no figure. It argues the gap rather than the mechanism: a request arrives thinner than
the thing it asks for, the same way a requirement always has, and cutting it into parts that each
need a prompt is what forces the unstated decisions out where you can answer them. `harness.coordinator.3`
used to introduce decomposition and now points back at that section instead, so do not let it grow
back into a second definition.

Decomposition is answered by the task above that board rather than by a fourth situation, and that
is the decision. `CutItUp` is that task, and it is one card and nothing else: no prose between the
rule and the figure, because six paragraphs said this once and the card replaced all of them. The
problem is `kata/step1/java/problem.md`, a deliberately under-specified library request, and the
five numbered moves are cut it up yourself, cut it up with the agent (which writes its own
`solve.md`), compare the two, plan it in plan mode into `plan-solve.md`, build it. Each move is one
line, so anything a second line would have explained belongs in the prose above the card rather than
back inside it. The three filenames are the shape of the exercise: the student's write-up and the
agent's `solve.md` exist separately so the comparison has two things to compare, and merging them
into one file ends the exercise.

One tick for the whole card rather than one per move. The five are a single sitting, and five boxes
invite ticking them off separately, which turns a run at a problem into an errand list. Nothing is
graded, so the tick is a bookmark: it is written to `kata.step1.cut`, under the prefix
`shared/lib/reset.ts` clears, because a tick that vanished on the next navigation would read as
broken progress. And **`problem.md` has no answer key anywhere in the tree**: its gaps are unlisted
on purpose, since a file that names them does the analysis for the student. Do not add a worked cut,
a `solve.md`, a `plan-solve.md`, or an implementation.

`context` and `session` overlap by design, and how the overlap is handled is the decision. `context`
already argues the re-send, the cost per message and the dead bug hunt, so `session` does not
re-argue them: it owns what `context` cannot, namely that this is the only layer with a time axis (the
other three are one turn's worth, and they *settle* here, so a fetched page is a tool result for one
turn and session content forever), that the student authored almost none of it by volume, and that it is
therefore the only layer they can prune after the fact. The paragraphs that do restate `context` are
`data-audience="guided"` rather than deleted, because `context`'s whole prose is self-only: in class
that unit is walked through at the board, so `session` is where a guided student first meets the
re-send and the bridge has to be there. Do not un-tag them and do not let the unit grow back into a second
`context`. Its figure, `SessionMakeup`, argues the *share* (two teal slivers against the files and test
output around them) and deliberately says nothing about growth or re-sending, which is
`BundleCompare`'s job in `prompt`.

It closes on `SurviveTheClear`, under the same `<hr>` and "Check yourself" heading the other units
use, with no prose between the rule and the card. Four moves: find a thing you would have to say
again next time, write it into `CLAUDE.md` as one standing instruction, clear the session, ask for
the work again without repeating yourself. The third move is the exercise. Writing the line down
proves nothing, and a card that stopped there would be a note rather than a task, so do not drop the
clear. It is worked **in the student's own project** rather than in this repo, and the card names no
example instruction on purpose: the line has to be one they were tired of repeating, and only they
know which one that is. Ticked once, to `kata.step1.survive`, on the same reasoning `CutItUp` is
ticked once.

All three tasks are `shared/components/TaskCard.tsx`, which is the tick-card mechanics with the data
lifted out, the same move `ConnectBoard` made when a second drag board arrived. Keep additions there
rather than in a caller, and keep **one tick per card and never one per move**: five or six boxes
turn a run at a problem into an errand list. Every move stays one line, so whatever a second line
would have explained belongs in the prose above the card.

`tools` is the second of the four layer units, and it used to be `external` ("material from outside").
It once ran after `harness`, then after `session`, and now runs before `context`. The rename is
the decision: naming the mechanism (the model asks, your system runs it, the output is appended)
beats naming the origin, because the origin was never the thing a student can act on. What survived
the rename is the part that still holds for a tool result, namely that nothing in the window says
who wrote it and that a result is usually the bulkiest thing in there. The layer is named in three
other places (`session`'s time-axis paragraph, `workshop`'s opening list and its read-the-source
close), so a further rename has to visit them. Its figure, `ToolsInContext`, argues one thing only:
the tool straddles the frame, so the half that runs is outside the window and only the result crosses
back in. `McpServer` is the second figure and is deliberately *not* independent: it is the same
frame, the same prompt bar and the same fills, so read on its own it says nothing. What it adds is
the wire, and the wire is its whole argument: one line leaves the named box outside, crosses the
border exactly once, and fans out into four description bars that then sit in the window like
anything else. It drew four straddling tools once instead, which said only "there are four now" and
left a large empty box beside them with nothing pointing into it. The crossing is the load-bearing
part: dashed while the line is outside, solid once it is in, so the border keeps meaning what it
means in every other diagram here. Redrawing either figure on its own geometry breaks the pair.
`McpParts` is the third figure and closes that section: three cards naming what a server offers, and
**nothing drawn between them**, which is the decision. None of the three has crossed into a context
yet, so it carries no frame and no arrows, and the cards take `McpServer`'s dashed
outside-the-window stroke while each glyph is borrowed from the step's own vocabulary (the solid
prompt bar, the faint stack a tool result comes back as, the rounded tool outline). Wiring them
together ends the argument. It is also where the word *resource* is defined, and the definition is by
**who decides** rather than by where the content came from: you pick a prompt, your harness attaches
a resource, the model asks for a tool. That is the sorting the figure exists for, so a card gaining a
second line about cost or trust belongs in the prose instead. The unit's order is
the argument too, so keep it: what a tool is, where extra ones come from (MCP, and the three things
one offers), what holding many of them costs, why the results are the least trustworthy layer, what
they cost by volume.

`model` sits after `harness`: prose, one figure, and one exercise under the same `<hr>` and "Check
yourself" heading `tools` and `harness` use. **It carries no version numbers anywhere, and that is
the decision.** Tiers
outlive releases, so the unit teaches Opus, Sonnet and Haiku as dispositions; a card naming this
quarter's release is wrong by the next one. **The lead no longer says that out loud**: the paragraph
naming the three tiers and telling the student the names change and the shape does not was cut, so
the figure now opens the unit and the only thing dating it is the small `(July 2026)` line moved
under it. What survives of the claim is `model.cost.3`, which says the ratios outlast the prices, and
that is now the only place it is made. Price and speed follow from that: they are ratios (roughly one, three and five per token,
output about five times input, the small tier four to five times faster) rather than figures, and
the prose says the ratios outlast the numbers. Do not put a price list or a version back in.
Two boundaries with units either side of it hold the unit up. `prompt` owns the **reasoning level**
and `model` owns the **tier**, and the section titled "Reasoning level" exists only to keep them
apart, because a `promptQuiz` distractor is precisely that confusion. A section called "Which one
you run" once argued how to match a tier to a task, and it went: the prose now states what the
tiers cost, how fast they are and how they differ from the reasoning level, and **choosing between
them is left to `PickTheTier` at the foot of the unit** rather than argued first and then
exercised. What went with it is worth knowing before writing any of it back. It carried the
sentence deferring to `prompt` on precision beating model size, and the one pricing a mid-task
switch (the cache does not travel, so the window is billed again on the tier you moved to).
Its closing section points back at `harness`'s coordinator instead of
redefining it, the same rule `harness.coordinator.3` follows. It adds two things and no more: that
the tier choice is one of the things that pattern automates, and **why the expensive model is good
at writing the brief, namely that providers fine-tune the smaller tiers on output from the larger
ones**, so it is writing for something trained on its own answers. The paragraph that used to sit
there re-argued `harness`'s sub-agent refetch cost and was cut for that reason; do not put it back.
`ModelTiers` is the figure and argues one thing only: three tiers, three dispositions, three kinds
of task. Cost and speed stay in the prose because each needs a qualifying sentence that will not fit
on a chip, and it is not an SVG, so it joins the step's diagram vocabulary by staying out of it
rather than borrowing a frame that would mean nothing here. The three tier names have no `nl` entry
on purpose, the way flags and machine output do.

`ModelPricing` is the second figure and is the **one place in the whole course where a number carries
a currency**, which is why it exists: the cost goal was argued everywhere and demonstrated nowhere.
It is also the one thing in the unit that names versions, and that is a knowing exception rather than
drift. `ModelTiers` beside it stays version-free on the reasoning its own component comment gives
(tier names outlive releases), so the table is placed to be read as *evidence for a claim* and never
as a reference: it sits under the paragraph stating the one-three-five ratio, and the two paragraphs
after it sort the rows and then say the ratios outlive the numbers. Keep that order. Moved anywhere
else it becomes a price list, which is exactly what the paragraph under it tells the student not to
learn.

**The table has four rows, the step teaches three tiers, and both stay.** Dropping the frontier row
was considered and rejected: the numbers are what a student would actually be billed, so the row is
named rather than hidden. `model.cost.2` is that naming, and three things about it are the decision.
It sits **after** the figure, because the row is the surprise and a warning ahead of the table spends
it early. It sorts and stops: what the frontier tier is good at is not taught here, since this step
is about the window rather than about the family. And it calls the row a ceiling rather than a fourth
tier, which is what keeps `ModelTiers` at three cards, `model.cost.1` at one-three-five, `model.speed.1`
at "the slowest of the three" and `PickTheTier` at three targets. Promoting it to a tier means
visiting all four.
Four claims the prose already makes can be checked against it by eye, and a row edited without them
in mind breaks the unit: the small tier as one unit against three and five, output at five times
input in every row, and a cache read at a tenth of input, which is the figure `harness`'s caching
section gives. Prices and model names have no `nl` entry, like every other machine-shaped string
here; only the unit label, the column heads and the caption translate. The unit (`$ per million
tokens`) sits **above** the table rather than only in the caption, and outside the scrolling box, so
a reader who scans straight to the numbers knows what they count and the label does not slide away
when the table is dragged sideways on a phone. It is said once: the caption underneath carries the
month and nothing else. Sonnet is listed at its **standing** rate rather than the introductory one
running until 1 September 2026, because the intro price breaks the ratio the prose teaches. The
caption does not mention that, and the omission is the decision: the figure argues the shape of the
pricing, and a footnote about one row's temporary rate is exactly the price-list reading the
paragraph beneath it warns against. What the caption does carry is the month the prices were read,
which is the thing that makes the table's staleness visible; a rewrite that drops it leaves the
figure ageing silently.

The section closes on the ratios and does not reach back across the step. A third paragraph once
did, arguing that you pay the tier's rate on the whole window every turn and that the tier is
therefore a multiplier on the four layer units. It went, and the removal is the decision: the four
layers already argue the re-send, `harness`'s caching section already prices it, and the tier is a
choice about the reader rather than about what fills the window. Do not write it back.

"API vs subscription" is the section under `Cost`, and it is the billing model: an API key billed per token
against a subscription drawn off a plan. It was one sentence in `harness` and was **moved here whole
rather than copied**, so `harness`'s "Which harness you run" must not grow a billing line back. Where
it sits is the decision. Directly under `ModelPricing` it reads as how the rates above reach you,
which is also why it carries **no prices, no plan names and no currency of its own**: the one table
in the course with a currency is a few inches up the page, and a second set of numbers here turns
both into the price list `model.cost.3` tells the student not to learn. What it argues is the thing
the table cannot: the tokens are the same either way, but a key shows you the number while a plan
hides it until you hit the limit, and then the cost arrives as waiting. It closes on who holds the
key in a company, which is **the only place in step 1 the team question appears**. That paragraph
stops at what the arrangement makes visible to the student and is not a section on procurement.

`PickTheTier` closes the unit, and it is `PatternMatch` with other data rather than a board that
merely resembles it: both are `shared/components/ConnectBoard.tsx`, and a caller is a list of
situations, a list of choices and a key prefix. That is the decision, and it was made after the two
copies drifted, with an arrowhead you could re-aim on one board and not on the other. **Anything
about how the board behaves goes in `ConnectBoard`**, so a student who learned the interaction in
`harness` meets the same one in `model`. What a caller may still choose is small and each choice has
a reason: whether the right-hand column shuffles, whether its labels are mono, and the block the ids
are built from. Five situations against three tiers here, so more than one lands on the same tier and
nothing falls out by elimination. Three decisions in it are worth keeping. **The tier column does not
shuffle**, which is the one place it departs from `PatternMatch`: an ordered scale scrambled reads as
noise, and only the situations shuffle. **The tier names are mono**, because they are names the
machine answers to. And **`redact` cannot be got wrong**: every tier will strip those log
lines and only the amount that gets past the strip changes, so it comes back **amber** (the design
system's caution colour, neither `--success` nor `--destructive`) with an explanation that prints
whatever you picked, and it closes by pointing at step 2, because repeating work is that step's
problem rather than this one's. Marking it right or wrong would teach that a lookup table exists
here. That amber verdict is `ConnectBoard`'s `answer: 'any'`, so any board can have a row with no
wrong answer; `PatternMatch` has none.

Three things inside `ConnectBoard` are load-bearing and easy to break. An arrowhead can be
**re-aimed by dragging it**, and the grip that does it is invisible on purpose: a dot on the arrow
point reads as a third kind of marker on a board that already has handles and targets, so it is a
bare hit area and the cursor is what advertises it. The grips layer needs its `z-10` or the target
button covers it. And the grip must **stay mounted while it is dragged**, since it holds the pointer
capture and unmounting it swallows the `pointerup` that ends the drag. While a situation is held,
every other line dims, because five lines onto three targets is otherwise hard to read.

Everything the student *does* sits below an `<hr>` at the foot of the unit, under one `<h2>` reading
"Check yourself", which is the same wording `QuizPanel` puts over a quiz (`quiz.title`). That is the
shape: prose first, then one rule, then the doing, in the order `connect-one`, `SpotInjection`,
`BudgetWindow`, `ReadYourWindow`. Do not scatter the exercises back up into the sections they belong
to. The two `<h3>`s in there are the exception the rest of the step does not get: `connect-one` and
`read-your-window` are hands-on tasks that need a sentence of setting, and everything between them
carries none. `harness` follows the same shape now, with the `CutItUp` card
under the rule and `PatternMatch` arriving after it from the registry, and so does `model`, whose
`PickTheTier` board is the only thing under its rule. `workshop` is the one left that still closes
on a bare exercise with no rule over it.

`tools` carries two of the step's three hands-on tasks and its two graded exercises, and between them they
hold advice the prose used to state and no longer does. `connect-one` is the first task: add an MCP server
to your own agent, then fetch the catalogue twice, once with `curl` and once by driving `/catalog`
through the server. It names Claude Code's `claude mcp add <name> -- <command>` (verified against the
CLI) and `npx @playwright/mcp@latest`, which is a server this repo already runs, so a copied line
works. **The prose asks which result you would want back on every turn and does not answer it**: the
comparison is the exercise, so do not add the sentence saying which route is bulkier. `SpotInjection`
is four tool results with one instruction aimed at the agent, and two of the clean three exist to be
mistaken for it (one gives orders to a human reader, one contains the word token twice), so a rewrite
that makes them look harmless removes the exercise. Its card asks for **the odd one out and does not
say what makes it odd**: naming the instruction aimed at the agent turns four results into a search
for one sentence, and the unit's warning aside is where a student who needs the term finds it. Do not
put the giveaway back in the title or the description. `BudgetWindow` is six calls against one small
change and grades the **exact set**, not the total, or filling the window and then adding the two
right calls would pass; its line counts are data rather than prose and its two right calls come to 37
lines. Both mark a wrong pick in `--destructive` and the answer the student missed in teal, because
red here would read as the result having failed rather than the answer. Both shuffle once per mount
through `shared/lib/shuffle.ts`, which `PatternMatch` also uses now.

`ReadYourWindow` closes the unit and is the second task, ticked once to `kata.step1.window` like the
other two. It is where **`/context` is introduced and where it is used**, and that pairing is the
decision. The command lived in two sentences of `context`, whose prose is entirely
`data-audience="self"`, so a guided student never met the only tool the course gives them for
inspecting a window; and the sentences described the command without ever asking anyone to run it.
Both halves are fixed by putting it here instead, so **do not write the introduction back into
`context`** (a comment there says so) and do not let this one grow into a second description of the
command. What earns the task its place in this unit rather than in `context` is the pairing either
side of it: `BudgetWindow` above totals an invented window, this totals the student's own, and the
first and last moves are one reading taken with the MCP server `connect-one` connected and one with
it gone. That difference is the number, and it is the only place the course puts a figure on
"a tool costs you by existing". Dropping either move leaves a count with nothing to compare it to.
It is also the one task card with **no description line**, and the key is absent rather than empty:
the two paragraphs above it already say where the work happens and that the number on screen is the
point, so a description repeated them one element later. `TaskCard` looks the key up instead of
assuming it, which is what any card may now leave out.

Machine output inside an exercise stays English in every language: `SpotInjection`'s four result
bodies and sources and `BudgetWindow`'s six commands have no `nl` entry, on purpose, the same way
flags and grading messages do. Everything framing them is translated.

`workshop` closes the step with a flag board: three flags the step 1 backend hides from its
`GET /api/titles` response, one per way context is assembled. The student reads the source for the
first (a literal in a branch that never runs), traces the running pipeline for the second (the hidden
tenth entry it computes and drops), and turns the log level up for the third (a line printed only at
DEBUG). **Do not implement the flags for the student.** The three flags
are the exercise; ship the puzzle, not the decode, the trace instrumentation or the DEBUG readout.

`step2` is **agentic engineering**: how you work with an agent, as opposed to what it knows. Seven
units — `evolution`, `setup`, `engineering`, `steering`, `patterns`, `quality`, `goals` — all of
them framing prose with no quiz, and the unit HTML is the source for what each argues. Six carry one
habit each; `evolution` opens the step and carries none, because its job is to put the other six in
order: a version now costs an hour, so the step you hand over gets small and you take many of them.
Its prose closes by handing off to `setup` by name, so a reordering there has to visit that
paragraph. Below that prose sits the step's only exercise outside `workshop`, under the same `<hr>`
and "Check yourself" heading step 1's `tools` uses: fifteen minutes on the clock, one of three
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

Its other two figures are evidence rather than drawings, and they are a pair: this site as the
skeleton it started as (the FizzBuzz warm-up on system fonts, one step in the sidebar) and the same
site with the details in (the header, the palette, the grouped steps, the settings). They replaced
prose that claimed the same thing, first the origin story in `walking-skeleton` (`GET /api/titles`
and a page listing titles) and then the whole of what is now `details`, and that swap is the
decision: the unit argues you get the shape working before you polish it, and two shots of this
repository doing exactly that carry it better than a sentence asserting it. The paragraphs beside
them read the pictures, so a replacement image has to keep what they point at, namely the sidebar
and the question and answer section that were there from the start against the branding, colours,
settings and navigation that were not. Both render through one component, `UnitShot`, which takes an
`id` used as both the BEM block and the i18n prefix; a third shot is a file in `front/public/`, a
slot in the HTML, and two keys per language. The images are served flat the way step 1's comparison
shots are.

The `details` section is the one place in the step where a habit is stated as a number: a detail
should not cost more than an hour, and the section argues both edges (pulling detail forward is paid
for now, leaving it too long turns into a regression). It closes the argument the `evolution` unit
opens, so keep the pair of edges if you rewrite it. Cutting one leaves a lesson that only says
"later".

`steering` replaced `scoping` in slot four, and the replacement was deliberate rather than a rename:
task sizing, which folder you open the agent in, and the `.claude` symlink trap were dropped
outright, so nothing in the tree teaches them any more. `engineering` still draws the symlink in
`DomainTree` and names it once, and that mention is now terminal on purpose. The unit argues the
thing the step had no home for, namely what you do while the work is running rather than before or
after it, and it owns three moves. Two of them are constrained by units either side of it.

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
and a wrong one dates the unit. It carries the step's only `data-audience="self"` aside outside
`setup`, `engineering` and `workshop`, which is what keeps the self-learning count level after
`scoping`'s aside went with it.

An eighth unit, `workshop`, closes the step as its capstone. It is the one part of step 2 a machine
can grade, because it grades the thing `quality` and `goals` argue for: a goal a build answers yes
or no to. It ships a small loans domain in `kata/step2/java` that is green but un-hardened, and
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

A **step** is a topic; a **unit** is one page inside it, holding prose, a quiz, an exercise, or any
combination. The URL is `/steps/step1/session`; a bare `/steps/step1` forwards to the step's first
unit.

Two kinds of grading, on purpose. A multiple-choice question is graded by `QuizPanel` in the
browser, because the answer is one of the options already on screen and a round trip would add
nothing. A flag board (`FlagBoard` in step 1, `Workshop` in step 2) is graded the same way, against a
salted SHA-256 hash: the work already happened against the backend, and the board only confirms the
student read what it produced. Both read as backend-independent: they still work with the service
down.

**No unit posts a free-text answer to the service any more**, and no `exerciseId` is left in the
tree. `ExercisePanel` and `checkAnswer` in `shared/lib/api.ts` are still present but unused;
retiring them is a later decision, not an oversight, so leave them alone in either direction.

## Layout

The repository has two roots, and they are not the same shape. The frontend is one app that splits
into a `shared` shell plus one folder per step. The backend is not one app at all: **each step owns a
standalone Maven project under `kata/stepN/java/`**, with its own `pom.xml`, its own profiles and its
own `CLAUDE.md`.

```
kata/
  step0/java/    test sources only: the intro's one exercise, behind an opt-in profile
  step1/java/    the catalogue service and the three flags hidden in it
  step2/java/    the loans domain, the graded and challenge profiles, the native-image flag
  step3/java/    an empty scaffold, buildable, waiting for the step's topic
front/           the curriculum
```

**There is no pom at the repo root, and no aggregator.** That is the decision, not an omission: a
step is a folder a student opens on its own, and a project that has to be built from a parent is not
that. So each project declares the Boot parent directly, and steps are free to drift apart in
dependencies without negotiating. The cost is duplication across four poms, and it is accepted.
Every Maven command in this repo is run from inside `kata/stepN/java`, never from the root.

Two rules survive the split and are worth keeping in one place:

- **Each step has its own `@SpringBootApplication`**, scoped to its own package by the default
  component scan (no `scanBasePackages`). Running one never drags in another. Because a project now
  holds exactly one main class, `spring-boot-maven-plugin` needs no `<mainClass>` pin; the one step 1
  used to carry existed only because the two steps shared a module. Do not add it back.
- **A step never reaches into another step's code.** There is no shared classpath to reach across
  any more, and the duplication that rule causes is deliberate: step 0 has `Veil`, step 1 has
  `Scramble`, step 2 has its own `Veil`, and a step owning its grading code is the point. Do not
  factor them into a shared module.

Each step's own `CLAUDE.md` carries the rest, and it is the readable source for that step's Java:
what is in the package, how it is run, and **which parts of it are exercises that must not be
implemented**. Those prohibitions are the load-bearing part, so in short, and in full at
`kata/stepN/java/CLAUDE.md`:

- **step 0** — do not decode or reveal the intro flag.
- **step 1** — do not decode, implement or reveal any of the three flags, **do not add tracing**
  to the catalogue pipeline (instrumenting it is the student's work), and **do not solve
  `problem.md`**: no cut of it, no `solve.md`, no `plan-solve.md`, no shelves package.
- **step 2** — do not harden the loans module, do not implement `MemberStatements.forTier`, and do
  not add a `native` profile or write the resource hint.

The frontend layout is `front/src/`: a `shared/` shell (components, deck, i18n, lib, mode, progress,
routes) plus one `steps/stepN/` folder per step, holding that step's registry, figures, flags,
locales, quiz and unit HTML. Read the folder rather than a list here. Two things about it are not
visible from the tree: dependencies point one way, so steps may import from `shared` and never the
reverse; and a step's `flags.ts` holds salted hashes only, never plaintext.

The presentation deck (`front/src/shared/deck/`, reached from the cogwheel at `/present`) is
documented in `front/CLAUDE.md`. One rule belongs here because it survives a careless edit from
anywhere: `shared/deck/deck-stage.js` is **vendored verbatim** from the smartagents-website repo so
it can be re-synced, and must not be edited.

### The catalogue

`GET /api/titles` returns nine fictional book titles, and hides three flags the step 1 `workshop`
board grades. How each of the three is hidden, why it does not fall out of a `grep`, and the several
prohibitions that keep it that way are all in `kata/step1/java/CLAUDE.md`, which is where they can be
maintained beside the code they describe. Read it before touching anything under `kata/step1/java/`.

The frontend has a page for calling all this: `/catalog`, linked under the steps in the sidebar.
`CatalogPage` renders `CatalogPanel`, which fetches `/api/titles` on a button press and lists what
came back, numbered, in arrival order. It is deliberately dumb: no caching, no massaging, no
filtering, so what is on screen is what the service returned. It is not a unit and belongs to no step,
but step 1's `workshop` unit now points the student at it to work the three flags.

## Running it

Two servers, two terminals. Vite proxies `/api` to the backend, so the browser stays on one
origin and Spring needs no CORS configuration.

```bash
cd kata/step1/java && mvn spring-boot:run   # step 1's backend on :8080
cd front && npm run dev                     # frontend on :5173  ← open this one
```

There is no such thing as "the backend" any more: there is the step whose service you are running.
Each step's project boots on `:8080`, so **only one at a time holds the port**, and the frontend's
proxy reaches whichever that is. That is fine, because a student works one step at a time and the
`/catalog` page belongs to step 1. Step 2 is the same command from `kata/step2/java`.

```bash
cd kata/step2/java && mvn spring-boot:run
curl -s localhost:8080/api/loans/statement/STUDENT | jq
```

Opening `:5173` with the backend down is a supported state: the quizzes and the two hash-checked
boards work as they always do, and submitting a free-text answer says it could not reach the
service. There is no longer a header badge to check first, so a proxy problem shows up where the
call is made rather than in the chrome.

Each step's `CLAUDE.md` carries the rest of its commands, including the DEBUG run that turns step 1's
stage chatter on.

## Build and test

Maven, no wrapper — use the `mvn` on `PATH` (3.9.16 locally). Four projects, none of them aggregated,
so **every command runs from inside `kata/stepN/java`**. There is nothing to build at the repo root.

Before any of that, on a fresh clone or when a failure smells environmental, use the `repo-setup`
skill in `.claude/skills/repo-setup/`: it checks the toolchain (including the JDK Maven actually
compiles with, which is not always the `java` on `PATH`) and installs `front/node_modules`. It
deliberately never runs the profiles that are meant to be red, so a green doctor and a red `graded`
are both correct.

`mvn test` must pass in every step, and on a clean checkout it does in all four. The invocations that
carry the kata's meaning are step 2's, and they are documented where they live
(`kata/step2/java/CLAUDE.md`). What matters from here:

```bash
cd kata/step2/java && mvn verify -Pgraded    # the workshop: red until the student hardens the module
cd kata/step2/java && mvn test -Pchallenge   # the challenge: red until they write forTier
```

Both are **meant to be red**, and making them green is the student's exercise rather than a build to
fix. Step 0 has one of its own and it is **deliberately not written down here**: naming the profile
is naming the exercise, and the unit that sets it is the only place a student should meet it. Every
one of these is opt-in, so the default `mvn verify` stays green in all four projects, and the whole
of the kata's "leave every step green" rule still holds.

To check the lot after a change that crosses projects:

```bash
for s in step0 step1 step2 step3; do (cd kata/$s/java && mvn -q verify) || echo "$s FAILED"; done
```

Run a subset via Surefire's `-Dtest` filter, adding `-DfailIfNoSpecifiedTests=false` so a typo'd
pattern is not a build failure.

No static analysis runs on the default Java build; plain `mvn verify` adds nothing beyond packaging.
Step 2's `graded` profile is the only exception, and only when you ask for it.

Frontend, from `front/`:

```bash
npm run build   # tsc -b + vite build — this is the type check, run it before committing
npm run lint    # oxlint, shipped with the Vite template
```

## Toolchain

- Each step's `pom.xml` has its own versions, and they are deliberately allowed to differ; a step
  upgrading Boot is not an event the other three have to attend. Two things a pom does not say:
  `javac` rejects APIs newer than the `<java.version>` property even though the local JDK is Oracle
  GraalVM 25.0.3, and the Boot parent manages every dependency version, so declare new Spring or test
  artifacts **without** a `<version>`.
- Boot 4 split the test slices out of `spring-boot-starter-test`. `@WebMvcTest` lives in
  `org.springframework.boot.webmvc.test.autoconfigure` and needs the separate
  `spring-boot-webmvc-test` dependency, already present. Expect other slices to need their
  own artifact too.
- **AssertJ** for plain assertions, MockMvc for controllers. Prefer `assertThat(...)` over
  JUnit's `Assertions.*`.
- Frontend pins are ordinary `package.json` entries; TypeScript is on the 6.x line, where
  `baseUrl` is deprecated (`paths` alone resolves relative to the tsconfig) and
  `erasableSyntaxOnly` rejects constructor parameter properties.

## Conventions

- Package root `be.smartagents.kata.java`, and a step's own code sits under `...java.stepN`. Maven
  coordinates are `be.smartagents:kata-agentic-java-stepN`, so the groupId and the package root
  deliberately differ. Standard `src/main/java` + `src/test/java` layout inside each project, which
  means a package path is now `kata/stepN/java/src/main/java/be/smartagents/kata/java/stepN/`.
- Tests are `*Test.java` mirroring the production package (Surefire's default include
  patterns depend on this suffix).
- Table-driven cases use `@ParameterizedTest` + `@CsvSource` with a `name` template.
- Frontend imports go through the `@` alias. `components.json` points shadcn at
  `@/shared/components/ui`, so `npx shadcn@latest add …` keeps generating into `shared`.

The design system (tokens, the one teal, the two typefaces, the shell's breakpoints) and the
`id`/`data-component` naming convention every rendered element follows are in `front/CLAUDE.md`,
which loads when you work under `front/`. Read it before touching anything visual: nothing outside
`front/src/index.css` is allowed to hold a colour, and every element carries both attributes.

## Adding a step

Use the `adding-a-step` skill in `.claude/skills/adding-a-step/`: it carries the six files a new
step needs, in order, plus how figures and inline figures are wired and how unit ids become URLs.

Step ids are `stepN`, unit ids are words (`session`, `workshop`), and together they are the
URL (`/steps/step1/session`).

A step that needs Java gets a seventh file, its own project at `kata/stepN/java/`, and the shortest
honest way to start one is to copy `kata/step3/java`, which is a buildable empty scaffold kept for
exactly that. Give it its own `pom.xml` (Boot parent, no aggregator, artifactId
`kata-agentic-java-stepN`) and its own `CLAUDE.md`. Do not add a pom at the repo root to tie them
together: the steps are independent on purpose, and the reasoning is under `## Layout`.

The audience rule (`data-audience`), how mode filtering works, and the whole language and i18n
mechanism live in `front/CLAUDE.md`, which loads when you work under `front/`. Two rules from there
are worth carrying everywhere: **no em-dashes anywhere in student-facing prose** (the
`lesson-writing` skill in `.claude/skills/lesson-writing/` has the rest), and grading messages plus
the words a student types as an answer stay English in every language.
