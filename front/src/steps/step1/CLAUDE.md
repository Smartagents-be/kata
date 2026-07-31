# CLAUDE.md — step 1

What is deliberate about each unit of step 1, and why. It loads when you work with files under
`front/src/steps/step1/`. Nearly everything here is a decision with a reason behind it: why a figure
is drawn the way it is, why a paragraph was cut, why two units overlap, and which parts are
exercises that must not be solved. Read it before editing any of this step's files, because a great
deal of what looks like an oversight is load bearing.

The rules that span the whole curriculum are in the parent `front/src/steps/CLAUDE.md`, the design
system and the audience and assistant mechanisms are in `front/CLAUDE.md`, and the repo-wide
prohibitions are in the root `CLAUDE.md`. None of them is repeated here.

`step1` is **context**: the layers an agent's context is assembled from (prompt, session, harness,
tools) and the fact that they share one finite window. It is *titled* "Context, model, mechanisms"
(NL "Context, model, mechanismen"), and the longer title is the decision: the step outgrew the
one-word name once `model` and the machinery around the window joined it, so the sidebar says what
is in there rather than naming one of the three. The topic is still context, which is why the
sentence above still opens that way. `FLAG_SALT` in `flags.ts` still reads `kata-step1-context-v1`
and must not follow the title: it is a hash input, so renaming it invalidates every flag on the
board. Nine units — `tokens`, `prompt`, `tools`, `context`, `session`,
`harness`, `model`, `truth`, `workshop` — and the unit HTML is the source for what each one teaches. The
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
**Three of the nine are deliberately not in that
list**: four layers fill the window, `tokens` is the unit it is counted in, `model` is the reader
on the other end of it and `truth` is where that reader's answers come from, so `workshop` names four
and not seven. `tokens` and `model` each open by saying so; `truth` does not, because it arrives after
`model` has already put the reader outside the four.
Promoting any of them to a layer means visiting `workshop`, `context` and every "four layers"
sentence in the step, which is a larger change than it looks.
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
anything is measured in it. It is prose and three figures, with **no quiz and no "Test yourself"
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

It closes on `SurviveTheClear`, under the same `<hr>` and "Test yourself" heading the other units
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
`McpParts` is the third figure: three cards naming what a server offers, and
**nothing drawn between them**, which is the decision. None of the three has crossed into a context
yet, so it carries no frame and no arrows, and the cards take `McpServer`'s dashed
outside-the-window stroke while each glyph is borrowed from the step's own vocabulary (the solid
prompt bar, the faint stack a tool result comes back as, the rounded tool outline). Wiring them
together ends the argument. It is also where the word *resource* is defined, and the definition is by
**who decides** rather than by where the content came from: you pick a prompt, your harness attaches
a resource, the model asks for a tool. That is the sorting the figure exists for, so a card gaining a
second line about cost or trust belongs in the prose instead. `McpOvals` is the fourth figure and
the one that closes that section, and it is a pair with `McpParts` rather than a repetition of it:
the cards sort the three by who decides, the ovals say the same three are one kind of thing, on the
cards' own columns (110, 320, 530) so the eye tracks straight down. Its radii and fills are
`ContextDiagram`'s per thing, which is what makes it the bridge into that figure: a student meets
these objects again inside the window rather than meeting a new set of shapes. Both alignments are
easy to lose, so moving one figure's columns means moving the other's. The labels are shared
`mcp-parts.*.name` keys, so a rewording moves both or neither. And **it carries no frame on
purpose**, the same decision `PromptInContext` makes: the three have not crossed into a context yet,
so a frame here would be the window told a third time before `context` tells it properly. Do not add
one. The unit's order is
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
apart, because a `promptQuiz` distractor is precisely that confusion. So it **opens by pointing at
`prompt` rather than by defining the level again**: it names what that unit established, in half a
sentence and a link, and spends the rest of the paragraph on the tier and on the claim the section
is for. It read as a second explanation until then, which is what the pointer fixes, so a first
sentence that grows back into "the reasoning level decides how long a model thinks" undoes it.
A section called "Which one
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

**Three things on this page sort the same three tiers, and all three now run cheapest first**:
`ModelTiers`, this table and `PickTheTier`'s column. The cards ran most-expensive-first until they
were flipped to match, which had the unit sorting one scale in two directions twelve lines apart
while each component's comment defended its own. The direction is the table's because the prose reads
in it: `model.cost.1` calls the small one a unit and counts up to three and five, and `model.speed.1`
opens on the small tier and closes on the top being slowest. So reordering any one of the three means
reordering all three, and reversing them means rewriting both of those paragraphs first.

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

**`The five-hour window` is the step's only Claude-only section**, and the gating is on every element
of it, both `data-figure` markers included. That is what the marker rule in `front/CLAUDE.md` is for:
a wrapped marker is not cut into a segment, so the figure would silently vanish for everybody. There
is no Copilot sibling anywhere in it, and the absence is the decision rather than an unwritten half.
A seat meters premium requests over a calendar month, so there is no rolling window to place and
none of it would be true for that reader, and the alternative was a paragraph telling them at length
about a product they do not have. Because there is no sibling, the keys carry no `.claude` suffix:
the suffix exists so a missing Dutch half of a *pair* falls back to the right language, and a block
with no pair cannot do that.

It is **one section over four paragraphs and two figures**, which is longer than the rule the rest of
the course keeps to, and it was written as two headings before they were merged. Placing the window
is not a second subject: it is what the first two paragraphs are for, and a heading between them made
the mechanic read as background to a tip. So `five-hour-window.3` and `.4` sit under the same heading
as `.1` and `.2`, and a rewrite that splits them again has to answer why the first half is worth
knowing on its own.

Three things in there are easy to break. The section **hedges on purpose**: a provider *might* give
you a session limit and it is *usually* five hours, because this is one vendor's arrangement rather
than how models are billed, and a flat claim here dates faster than anything else in the unit. The
word *session* is that arrangement's word and not this step's, so `.1` says so in a clause and links
to `session`; drop it and the unit has two meanings for one word one page apart. And the five minutes
in `harness`'s caching section are a different clock entirely, so neither may be rewritten in terms
of the other.

`usage-readout` is the shot of what the harness prints, and it is `UnitShot` from `shared`, which
moved out of step 2 when this became its second caller. Its caption names the tool and the month and
says nothing about what is in the picture, because `five-hour-window.2` already says what the
readout carries. The image is **uncropped**, promo line and all: it is machine output, and tidying
one is the same move as inventing one. What makes it age visibly is the month in the caption, the
same job `ModelPricing`'s caption does.

`SessionWindows` is the second figure and argues one thing: the two rows carry the *same* two
five-hour windows, so the only thing that changed is the hour the first one opened. Both rows are
measured against the break and the hour you go home, which is what the two guide lines are for, and
they are drawn last so a bar cannot hide the alignment that is the whole reading. The dashed tail on
the top row is the step-1 reading of a dash, namely window nobody is there to spend. The `hi` beside
each opening dot is hard-coded rather than translated, like the model names in `ModelPricing`: it is
a word the student types. Move the worked day (08:00, the break at 13:00, home at 18:00) and every
number in both rows moves with it.

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
"Test yourself". **That heading is the one place in the course where unit prose carries a shared key
rather than its own**, and the exception is deliberate: every one of the eight writes
`data-i18n="ui:quiz.title"`, which is the same string `QuizPanel` puts over a quiz, so the wording
above a task and the wording above a quiz cannot drift apart. The `ui:` prefix works because
`nsSeparator` is left at its default while only `keySeparator` is disabled, so i18next reads the
namespace off the key and `useStepText`'s pinned `ns` gives way to it. Two things follow. A unit's
"Test yourself" section has **no `<unit>.<section>.heading` key** in either bundle, which is the one
break in "a key is a location", and changing the wording is one edit in `shared/i18n/locales`
rather than eight. Reach for a `ui:` key nowhere else: prose belongs to its step. That is the
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
right calls would pass; its line counts are data rather than prose and its two right calls come to 27
lines. Those counts are **measured off `kata/step1/java`** rather than invented, because the task is
framed against this repository and a student who checks will check them: the controller is 24 lines,
everything under `services/` is 1250, and there are 50 concrete stage classes (52 `*Stage.java`
files, two of which are the `CatalogStage` and `AuxiliaryStage` interfaces). Two message keys carry
numbers derived from them (`budget.explanation.services` says fifty, `budget.explanation.tree`
says ten times the controller), so a re-measure has to visit both, in both languages, plus the
comment above the figure in `tools.html`. Both mark a wrong pick in `--destructive` and the answer the student missed in teal, because
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

`truth` sits between `model` and `workshop` and owns **where an answer came from**. Four sections,
in the order they have to be read: `The cutoff` (training stopped on a date), `Grounding` (put the
evidence in the window), `Proof` (run the thing) and `Hallucinations` (the failure that survives all
three). It carries no quiz and no exercise: `model` closes on `PickTheTier` and `workshop` is a whole
board, so a card here would sit between two exercises with nothing new to ask for.

**The lead poses the question and does not answer it**, which is what the four sections are for. It
names three sources for one answer, discovered, instructed and trained, and closes on which of them
is the truth. The question is rhetorical on purpose: the unit's answer is that you cannot tell from
the answer, so a lead that picked a winner would spend `Hallucinations` five paragraphs early.
Three things in it are load bearing. It states the cutoff **in a clause** and leaves the argument to
`The cutoff`, so that section keeps its opening. It says the model was never trained on your company
at all, which is the half a cutoff date does not cover and which nothing else in the step says. And
`lead.2` carries the unit's **second link to `tools`**, half a sentence like `grounding.2`'s: this
one is where discovery is first named, that one is how the file gets in. Two anchors on one page is
the decision, since a reader landing mid-unit meets whichever comes first.

Two figures, `TrainedOrGrounded` under `Grounding` and `AnswerProvenance` under `Hallucinations`,
and **they take different cuts of one argument rather than drawing it twice**. The first is two
*whole* answers a window apart; the second is one answer whose parts did not all come from the same
place. Collapse either into the other's shape and the unit makes its point twice.
`The cutoff` and `Proof` are deliberately left undrawn: a date has no shape, and running a command is
something the student does rather than something to look at.

**`TrainedOrGrounded`'s two answer chips are identical in size, fill and position**, and that is the
figure. What differs is the window above them, which is the part an answer never tells you about, so
a tick, a cross, a colour or a heavier weight on either chip is the drawing contradicting the prose.
Their strings differ (`3.5.0` against `4.1.0`) because the trained answer is not a wrong-*looking*
answer, it is the previous release stated as levelly as the current one. **`4.1.0` is what
`kata/step1/java/pom.xml` actually declares**, so a student who checks finds the figure honest; a
Boot upgrade in that project means moving the number here. Nothing else in it is new: the teal frame,
the solid prompt bar and the faint stack are the step's own vocabulary, which is what lets it be read
without a legend.

**`AnswerProvenance`'s left column is uniform on purpose** and the second column is where everything
varies, because the second column is the one a student is never handed. The three claims are true of
`kata/step1/java` apart from the middle one, which is a method `Catalog` does not have, so both
sources can be opened and checked. The invented row is **the step's dashed stroke rather than
`--destructive`**: nothing failed, and a red row would say the agent was caught. Amber is wrong for
the same reason, since it belongs to a cost tip and a hazard aside. It is DOM rather than SVG on
`ModelTiers`'s precedent, since there is no geometry in it. Its symbols and filenames are
machine-shaped, so they are data in the component with no key and no `nl` entry, the way
`ModelPricing`'s numbers are.

Both figures are read by the paragraph under them and neither carries a caption, on the rule that a
caption states provenance and the prose does the explaining. `truth.grounding.2` opens on "Only the
window changed" and `truth.hallucinations.2` on two of the three having been read, so **rewriting
either figure means visiting that opening sentence**, in both languages.

Both are on the deck, and the block leads with **the statement slide rather than a figure**, on
`harness`'s precedent: the two drawings are one claim measured, so the room needs the claim before
either means anything, and `The cutoff` has nothing to arrive on. `AnswerProvenance` is laid out at
1100 and magnified less than the drawing above it, because `SlideFigure` clips rather than shrinks:
`width * scale` past the frame takes the left edge off the symbols, which is where the claims are.

Three boundaries hold it up, and each of them is a unit away. **`context` owns the average**, so
this unit must never re-argue that a model is a statistic, that frequency beats quality, or that
there is more bad code on the internet than good. What `context` never says is that training has a
*date*, and the cutoff is that gap filled. `contextQuiz`'s `invented-userservice` question is the
one place the two genuinely meet: it is this unit's scenario asked four units early, and it never
names the term. Leave it where it is. A quiz sitting on the page that owns the word would be graded
before the word had been given. **`tools` owns how evidence gets into the window**, so
`truth.lead.2` and `truth.grounding.2` each link to it in half a sentence rather than describing a
fetch; `tools` also owns
"a tool result is the least trustworthy layer", which is why grounding here stops at *reading rather
than remembering* and does not grow a paragraph about the source being stale. And **`workshop`'s
`read-the-source.3` is this unit's proof section applied**: it tells the student to make the agent
run the decode rather than reason about it, in the words of that exercise. The general rule belongs
here and the applied one belongs there, so do not let either grow into the other. Step 2's `goals`
is the third neighbour worth knowing about: it owns "if you cannot name the command that answers yes
or no, you do not have a goal", which is about the instruction you hand over. `Proof` is about
checking an answer you already have. Keep them apart.

Two smaller decisions. **`Hallucinations` comes last rather than first**, because the term is only
worth having once the reader knows what grounding and proof would have caught, and the section
names it in its closing clause on the step's name-the-term-last rule. And **every example in it is
this repository**: the version number out of `kata/step1/java`'s `pom.xml` across the first three
sections, then a method that does not exist on `Catalog` in the fourth. The version is deliberately
one question asked three ways (guessed, grounded, proved), which is what lets those sections read as
one argument instead of three topics; `Catalog` is picked because the student has already called it
from `/catalog`, so the invented method is measured against a class they have met.

`workshop` closes the step with a flag board: three flags the step 1 backend hides from its
`GET /api/titles` response, one per way context is assembled. The student reads the source for the
first (a literal in a branch that never runs), traces the running pipeline for the second (the hidden
tenth entry it computes and drops), and turns the log level up for the third (a line printed only at
DEBUG). **Do not implement the flags for the student.** The three flags
are the exercise; ship the puzzle, not the decode, the trace instrumentation or the DEBUG readout.

## The assistant variants

Ten blocks in step 1 vary and nearly all of them are the same kind of thing, a filename or a command:
`tools.where-extra-tools.3`, the `<pre>` under `tools.connect-one.1` and `tools.connect-one.2`
(`claude mcp add` against `copilot mcp add`, which lands in `~/.copilot/mcp-config.json`),
`tools.read-your-window.1`, `tools.list-itself-window.2`, `session.window-not-memory.1`,
`context.amnesia-context-fatigue.3`
(nested inside the audience wrapper, never both attributes on one element),
`model.api-vs-subscription.2` and `.3`, plus `survive.write.*.label` on the task card.
`harness.lead.1` names Copilot for **every** reader instead of splitting, because that sentence is a
list of example harnesses and a list is where a second product belongs.

Two of the ten are not a filename or a command, so do not read that sentence as saying everything
that varies is a word. `model`'s pair of window sections is the larger one: Claude-only whole, with
no Copilot half at all, and the reasoning is under `model`. `tools.list-itself-window.2` is the
smaller and it is a **product fact**. Copilot CLI holds the GitHub MCP server with no configuration,
so that reader is already paying for MCP tool descriptions when the section claims a tool costs you
by existing, and the Claude half's "connect five MCP servers" would have them counting from zero.
`list-itself-window.1` above it was made assistant-neutral in the same change ("every tool" rather
than "every tool you connect") so the two paragraphs do not contradict each other, and
`ReadYourWindow` needs no variant either way: its first and last moves compare a reading with and
without the server the student added themselves.

**Where a variant block names the product, `tools` says `Copilot CLI` rather than `Copilot`**,
because the CLI is the surface the course assumes and a command, a config path or a `/context`
readout is untrue of the editor. Two places stay on the bare name and both are right to:
`model.api-vs-subscription` is about a seat rather than about a client, and `harness.lead.1` says
"Copilot in your terminal", which names the surface in words.

**What is deliberately shared is the more useful half of this, so do not "fix" it later.**
`/clear` and `/context` are the same command in both, so `prompt.what-steer-after.1`,
`session.compaction-picks-moment.2` and the whole of `ReadYourWindow` carry no variant: the task
runs verbatim either way, and Copilot CLI's readout (system prompt, custom instructions, system
tools, MCP tools, messages, free space, buffer) is this step's four layers under other names, which
is why the Copilot paragraph lists them. Plan mode exists in both, so `prompt`'s plan-mode section
and `CutItUp` are untouched. Compaction is automatic in both, from about 80% in Copilot CLI, so
`session`'s compaction argument holds as written. And `ModelTiers`, `ModelPricing` and
`PickTheTier` stay exactly as they are: the tiers are taught as dispositions, Copilot's own picker
offers Claude models among others, and the table is evidence for the one-three-five ratio rather
than a price list. What a Copilot reader needs instead is in `model.api-vs-subscription.3`, and it
**names no numbers and carries no currency**, for the same reason the rest of that section does not:
the one table in the course with a currency is a few inches up the page, and a second set of figures
turns both into the price list `model.cost.3` tells the student not to learn.
