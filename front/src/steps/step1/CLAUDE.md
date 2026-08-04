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
board. Ten units — `tokens`, `prompt`, `tools`, `context`, `session`,
`harness`, `model`, `truth`, `workshop`, `recap` — and the unit HTML is the source for what each one teaches. The
fourth was called `intro` until it was renamed, id and all, so its URL is `/steps/step1/context` and
its prose keys read `context.<section>.<n>`. Old links to `/steps/step1/intro` are dead and there is
no redirect, which is the decision: the app has no route aliases anywhere and one unit is not the
place to start. A student mid-run loses that one unit's tick out of `kata.completed`, since progress
is keyed by `step/unit`.
That order is the registry's, and nothing recites it any more: `workshop`'s opening list went with
its capstone rewrite, so moving a unit is a registry change and nothing else. **The two layers a student writes and reads for
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
**Three of them are deliberately not in that
list**: four layers fill the window, `tokens` is the unit it is counted in, `model` is the reader
on the other end of it and `truth` is where that reader's answers come from. `tokens` and `model`
each open by saying so; `truth` does not, because it arrives after
`model` has already put the reader outside the four. **`workshop` does not name a layer anywhere**,
which is newer than it looks: the board's three `flag.*.help` keys each opened on one until the
mapping was found to be a pun, and they open on the answer's provenance now. Promoting any of the
three units to a layer means visiting `context` and every "four layers" sentence in the step, which
is a larger change than it looks.
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
anything is measured in it. It is prose, four figures and one exercise. **It still carries no quiz**,
and that half of the old decision holds: every quiz in the course already sits in the opening units,
and `contextQuiz` and `promptQuiz` are two pages away on either side. What it does carry is
`PickTheNext` under the usual "Test yourself" heading, and the reasoning for it is under that
component below. **Its prose is self-only**, the same wrapper shape `context` uses: in class the
teacher talks it through at the board, so a guided student gets the four figures and the exercise and
nothing else. The figure markers stay top-level and carry no attribute, which is what keeps them on
both audiences' pages, and the wrapper closes before each one and reopens after it. `WordsIntoTokens`
is the only marker in the step with no heading above it, so it is also the one figure a guided page
opens on untitled.
Nothing in it carries a currency; `ModelPricing` is still the only place in the course where a number
has one. Its prose has been cut hard and deliberately: it opens cold, closes on the caching pointer
with no summary or handoff, and the figures are left to be read rather than narrated. Sentences that
told the student to click something, or that recapped what the figure had just shown, were taken out
one at a time. Do not write that layer back in.

Four things about it are decisions. **Nothing in the unit draws the teal context frame**, not one of
the four figures and not the exercise, and that is what protects `tools`: `ToolsInContext` is the first frame a student
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
**The unit does make that argument, in `not-words.3`, and it is prose on purpose.** That paragraph
draws the line from the tokeniser to the training pile, since a vocabulary built from what the model
read makes rare-in-the-split and rare-in-training the same thing, and it closes on asking in the
language the model has read most of. It states the link **in one clause and stops**, because
`context` owns what a model being an average means and this unit must not argue it four pages early.
So the claim belongs there rather than in `TokenSplit`: a Dutch row added now would look like the
figure catching up with the prose, and it would cost the figure the same way it did the first time.
And **the figures are not equally trustworthy, which their captions no longer say.** `TokenSplit`'s
splits are real output from `o200k_base`, stored as data with no `nl` entry, and `WordsIntoTokens`
carries the same sentence and the same splits. `NextToken`'s scores are
hand-authored and its caption admits it. `TokenAttention`'s weights are hand-authored too and its
caption was removed, so the only warning left is the comment in the component: if that figure ever
grows a caption again, that is what belongs in it. **Holding a token now prints its weights under the
boxes as shares, and every row adds to 100.** That is the row of a real attention head, which is a
softmax over what came before, so the figure is honest about the thing that has a shape (a token
spreads a fixed weighing backwards and cannot lean hard on everything) while the twenty-one numbers
making up those rows stay picked so one sentence reads the way a reader expects. They are whole
percent rather than a fraction so a row edited to 99 is a bug rather than a rounding. The one thing
the hundred leaves out is the token weighing itself, which a real row includes: this figure is about
what a token looks *back* at, and the wording in every locale key says share of that.

`WordsIntoTokens` is the lead figure, and it follows **one word the whole way in and one token back
out**: `unscrambled`, the two tokens it breaks into, the first of those as a column of numbers, the
model as a field of numbers, the numbers that come back, and the token they stand for. Six stages,
and the prose above says none of it. It is one word rather than the sentence because a sentence drawn
this way is eight columns of the same move, and the move is the figure.

**Nothing in it is captioned, and the stages did carry a caption each before they were cut.** Six
lines of prose under six boxes is a paragraph laid out sideways, and it turned a drawing that reads
in one second into one to be worked through. What names the stages instead is the step's own
vocabulary (given text in the muted fill, a token in teal, numbers in mono) plus the eyebrow, which
**names the process rather than stating a claim about the drawing**: it read `text at both ends,
numbers in between` and now reads `tokenization process`, because a label that argues the picture is
one more thing to read before the picture. The panel's screen-reader description
still walks the whole chain, since none of that vocabulary reaches a reader who cannot see it, so a
stage added later has to be added there too.

Four more things in it are decisions. **Every number is invented, and the kind of number is why that is
fine**: a vector and a weight are not claims a student can check, a token id is, and there is no
tokeniser in this repository to produce real ids with. Reach for ids and the figure acquires the one
thing in it that can be caught out. **It follows one token**, with `ambled` dimmed rather than
deleted, which is now the only thing carrying that, because `reads-all` argues four paragraphs
later that everything in front of a token goes in with it; this is one token's path, not a claim
about what the model is handed. **It is a column that becomes a row**, rather than a row that wraps,
since a wrapped six-stage chain puts stage four under stage one. And **it carries no caption**,
unlike `TokenSplit`, which states the provenance of the same word and the same splits further down
the same page: two identical captions read as a copy rather than as a source. That shared data makes
the two a pair the way `NextToken` and `TokenAttention` are, so the "word that breaks" rule above now
protects both of them.

`PickTheNext` closes the unit and is its one exercise: three roads out of `the pull request was`, and
the answer is all three. It asks what the branch tree under `NextToken` only shows, which is that the
top-scored token is not a rule, so a student who read that figure as a lookup table finds out here
rather than four units later. Four things in it are decisions. **The sentence is not the pair's**
(`the build failed because it timed out`), because a question answered by the figure above it is not
a question. **The fan is drawn flat until it is checked** and then lights whole: marking a road
before the answer is in gives it away, and marking one after says the model has a right answer here.
**The scores are shown, and they are what make the question worth asking**: a fan of three roads with
no weights on it can be answered by shrugging, while `merged` at 46% against `approved` at 23% makes
picking the favourite the reasonable thing to do and still not the answer. That is the misreading the
exercise exists to catch. They are hand-authored like `NextToken`'s, and the admission stays in that
figure's caption two drawings up the same page rather than being repeated in a caption here. **They
add to 100, unlike `NextToken`'s**, and what separates the two is the caption: that figure draws five
of a distribution whose tail is too long to draw and says so underneath, while three numbers on a
card with nothing under them are three numbers a student adds up, and a missing seventeen points
reads as an error rather than as a tail. It also keeps the right answer exactly true, since the roads
on screen are then all the roads there are. They stay muted when the fan lights, since the answer is
the three words rather than the numbers beside them. And
the catch-all choice is **pinned last rather than shuffled**, unlike `SpotInjection`'s four results:
a catch-all that turns up second reads as a bug. It is graded in the browser like everything else
here and writes no progress key, because one question is not a sitting.

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

Decomposition is the first of the four pattern sections, ahead of the coordinator. It argues the gap
rather than the mechanism: a request arrives thinner than the thing it asks for, the same way a
requirement always has, and cutting it into parts that each need a prompt is what forces the unstated
decisions out where you can answer them. `harness.coordinator.3`
used to introduce decomposition and now points back at that section instead, so do not let it grow
back into a second definition.

`UnderSpecified` is its figure, and three things in it are decisions. **It carries no context
frame**, which is the one place it departs from the other three pattern diagrams: nothing has been
handed to anybody yet, so this is the task being cut up rather than the windows it ends up in, and a
frame here would draw the coordinator one section early. What it does share is the vocabulary, a bar
is something you have and dashes are what you do not, so the dashed space under the ask on the left
comes back as three solid prompt bars and three open questions on the right. **The three questions
are `harness.decomposition.1`'s own three** (empty query, title only, nothing found), which is what
keeps the drawing and the paragraph on one example; rewording the example means moving the figure
with it, in both languages. And **the parts are stacked rather than laid out side by side**, so a
question stays one left-aligned line: three columns would need the questions wrapped by hand, and
the Dutch is longer than the English every time. On the deck it replaced a statement slide, and the
note went with it, since the note said what the right-hand column now draws.

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

All five tasks are `shared/components/TaskCard.tsx`, which is the tick-card mechanics with the data
lifted out, the same move `ConnectBoard` made when a second drag board arrived. Keep additions there
rather than in a caller, and keep **one tick per card and never one per move**: five or six boxes
turn a run at a problem into an errand list. Every move stays one line, so whatever a second line
would have explained belongs in the prose above the card.

`tools` is the second of the four layer units, and it used to be `external` ("material from outside").
It once ran after `harness`, then after `session`, and now runs before `context`. The rename is
the decision: naming the mechanism (the model asks, your system runs it, the output is appended)
beats naming the origin, because the origin was never the thing a student can act on. What survived
the rename is the part that still holds for a tool result, namely that nothing in the window says
who wrote it and that a result is usually the bulkiest thing in there. The layer is named in two
other places (`session`'s time-axis paragraph and the board's `flag.decode.help`, which opens on
it), so a further rename has to visit them. Its figure, `ToolsInContext`, argues one thing only:
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
`list-itself-window.4` is the section's closing aside and **the only number the course puts on a
tool count**: four or five in one context, and past that the job gets its own specialised agent. It
carries no `data-audience`, because a rule of thumb is as useful to a student in class as to one
alone, unlike the two "try it once yourself" asides in `prompt` and `session`. Two things keep it
from being a duplicate of something else. It is the only place the unit escalates past "turn off
what this task does not need", which is what earns it a shape of its own rather than a fourth
paragraph in a section that already runs three. And it stops at the tool list: **`harness` owns
what a sub-agent costs** (an empty context, and refetching whatever it was not told), so a sentence
about the coordinator, the fresh session or the refetch does not belong here. That is the same rule
that took the sub-agent paragraph out of `model`.

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
ones**, so it is writing for something trained on its own answers. It closes by **naming the saving
in this unit's own ratio** (the gap priced above, five against one) rather than in `harness`'s words:
it carried "top rate for deciding, a fraction of it for doing" near-verbatim from
`harness.coordinator.1`, and a back-pointer that repeats the sentence it points at is the pointer
failing. Do not let that phrasing come back. The paragraph that used to sit
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
as a reference: it sits under the paragraph stating the one-three-five ratio, and the paragraphs
after it sort the rows, say the ratios outlive the numbers, and close on `cost.4` putting the
student's own count against them. Keep that order. Moved anywhere else it becomes a price list,
which is exactly what the paragraph under it tells the student not to learn.

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

The section closes on `model.cost.4`, the one place in the course that multiplies: the count
`/context` printed in `tools` against the table's rate is one turn in money. It reaches back across
the step on purpose, because the two halves of the multiplication live a unit apart, and it carries
no currency of its own, so `ModelPricing` stays the only number with one. Step 0's last house rule
tells the student a hunt was not free and says step 1 hands them the numbers, which is a forward
pointer with no command and no arithmetic in it, so this stays the only paragraph that multiplies. A different paragraph once
closed the section and went: it argued that you pay the tier's rate on the whole window every turn
and that the tier is therefore a multiplier on the four layer units. That removal stands, because
the four layers already argue the re-send, `harness`'s caching section already prices it, and the
tier is a choice about the reader rather than about what fills the window. `cost.4` measures and
argues none of that, so do not let it grow back into the argument.

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
shape: prose first, then one rule, then the doing, in the order `connect-one`, `ShutterFlag`,
`SpotInjection`, `BudgetWindow`, `ReadYourWindow`. Do not scatter the exercises back up into the sections they belong
to. The two `<h3>`s in there are the exception the rest of the step does not get: `connect-one` and
`read-your-window` are hands-on tasks that need a sentence of setting, and everything between them
carries none. `harness` follows the same shape now, with the `CutItUp` card
under the rule and `PatternMatch` arriving after it from the registry, and so does `model`, whose
`PickTheTier` board is the only thing under its rule. `workshop` was the last one outside the family
and is in it now, with `OneWindow` and the board under the same `<hr>` and heading, and nothing after
them. `recap` is outside all of this and always will be: it asks for nothing, so it has no rule, no
`<hr>` and no "Test yourself".

`tools` carries two of the step's five hands-on tasks and its three graded exercises, and between them they
hold advice the prose used to state and no longer does. `ConnectOne` is the first task and is a
`TaskCard` like the other three, on seven moves: add an MCP server to your own agent, fetch the
catalogue twice, once with `curl` and once by driving `/catalog` through the server, drive the
browser once more at a page with no service behind it and screenshot what it finds, then compare and
choose. It was two paragraphs of prose before that, and the change is the decision: a unit whose
closing section is a card, a card and a card had one instruction in the middle written as reading,
and a student skims a paragraph they would have worked through as a list. What stayed in the prose is
the pair of `<pre>` blocks, because a command is machine output rather than a move, and the sentence
above them naming Claude Code's `claude mcp add <name> -- <command>` (verified against the CLI) and
`npx @playwright/mcp@latest`, which is a server this repo already runs, so a copied line works. **The
moves name no command for that reason**, which also keeps the card readable in class, where the
`<pre>` is cut with the rest of the prose. **The last move asks which result you would want back on
every turn and nothing answers it**: the comparison is the exercise, so do not add the sentence
saying which route is bulkier, in the card, the description or the prose. Ticked once to
`kata.step1.connect`.

**The third route is `kata/step1/front/index.html`, and the two moves that work it sit in the middle
of the card rather than at the end**, so `choose` stays the closer. It is one standalone page with no
build, no dependencies and no service behind it, which is what keeps a third server off a student who
is already running two: the agent opens the file off disk through the same MCP server. What it hides
is **step 1's fourth flag**, and the way it hides it is the exercise. The string is XORed and base64'd
in the source and assembled in the browser when a button is pressed, so reading the file, grepping it
or asking the agent what it says all come back empty. `shutterFlag` in `flags.ts` holds the salted
hash and nothing else, and `kata/step1/front/CLAUDE.md` carries the prohibitions beside the page:
**do not decode it, do not reveal it, and do not let the plaintext reach any file in this repo.**
Two decisions in the page itself are load-bearing and are written up there rather than here: it
addresses the agent nowhere, because the same unit teaches prompt injection two sections later, and
the flag stays readable under `prefers-reduced-motion`, because a screenshot with the animation off
has to work too.

`ShutterFlag` grades it, and it sits directly under the card whose moves earn it. It is **one row and
no progress counter**: `FlagBoard`'s "n of three collected" is a collection, and one row printing
"0 of 1" is arithmetic nobody asked for, which is the whole reason it is a caller rather than
`FlagBoard` with a shorter array. The row itself is `FlagRow`, lifted out of `FlagBoard.tsx` into its
own module when this second caller arrived, the same move `TaskCard` and `ConnectBoard` made, with
the localStorage helpers going a step further into `solved.ts` so `FlagRow.tsx` stays a file that
exports only a component and Fast Refresh keeps working on it. It
takes the BEM `block` as a prop, so the workshop's rows are still `#flags-item-N` and nothing that
pointed at them moved, and it takes `wrongKey`, because "go back to the pipeline and read what it was
hiding" is the wrong sentence on a board about a browser. **Anything about how a row behaves goes in
`FlagRow`.** The flag stays **out of the `flags` array** on purpose: that array is what `workshop`
closes the step with, one row per place an answer about the backend can come from, and a browser is
none of the three. It shares `FLAG_SALT`, which the file already says is not a secret. Nothing checks
the screenshot, and that is deliberate: the PNG in `.playwright-mcp/` is proof for the student rather
than for the app, and a grader that reached into their working copy would be the one thing on this
page that needs a backend. `SpotInjection`
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
before the word had been given. `truth.hallucinations.1` closes by naming that quiz as the place the
student already diagnosed the case, so the early ask is a paid-off callback rather than a silent
duplicate, and rewording either side means visiting the other, in both languages. **`tools` owns how evidence gets into the window**, so
`truth.lead.2` and `truth.grounding.2` each link to it in half a sentence rather than describing a
fetch; `tools` also owns
"a tool result is the least trustworthy layer", which is why grounding here stops at *reading rather
than remembering* and does not grow a paragraph about the source being stale. And **step 0's `welcome.house-rules.4`, with
`flag.decode.help` behind the workshop board's Hint, is this unit's proof section applied**: both
tell the student to make the agent run the decode rather than reason about it, in the words of that
exercise. The general rule belongs
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

`workshop` is the step's capstone, a flag board: three flags the step 1 backend hides from its
`GET /api/titles` response, **one per place an answer about that service can come from**. The student
reads the source for the first (a literal in a branch that never runs), traces the running pipeline
for the second (the hidden tenth entry it computes and drops), and turns the log level up for the
third (a line printed only at DEBUG). **Do not implement the flags for the student.** The three flags
are the exercise; ship the puzzle, not the decode, the trace instrumentation or the DEBUG readout.

**The three rows were labelled tools, session and harness once, and that mapping is gone.** Each of
the three `flag.*.help` keys opened by naming a layer, and in all three cases the noun meant
something other than the unit that owns it: `tools` is tool calls rather than code on disk, a Spring
request is not the student's session, and this project's log config is not the harness. So the board
wore the step's vocabulary while exercising none of it. What actually separates the three is
provenance, which is `truth`, the unit directly above this one, so each help key now opens on where
the answer lives: one can only be read, one exists only while the service runs, one is a default
setting away. `flag.decode.help` lost its closing "no trace will show it" and `flag.debug.help` its
closing "at the default log level it never prints" in the same change, because both had become the
new opening sentence said twice. Do not write a layer name back into any of the three, and do not
let a help key close on what its first sentence already said. The two ends of the seam are marked
now: `truth.hallucinations.2` closes on the workshop and `workshop.lead.1` links back, so rewording
either means visiting the other, in both languages.

**`OneWindow` is what makes this a capstone rather than a puzzle**, and it is the answer to the
complaint that the board grades nothing the step taught. Three flags can be collected without ever
looking at a window, counting a token or asking what a turn cost, which left a step about the window
ending on a page that never mentions one. The card frames the whole hunt as **one session with a
`/context` reading at either end**: read the number, work all three flags without clearing, read it
again, then say which flag you could hand over whole. It is `TaskCard` like the step's other four,
ticked once to `kata.step1.hunt`, and it grades nothing. The first and third moves are a pair on
`ReadYourWindow`'s reasoning, so dropping either leaves a number with nothing to compare it to, and
the fourth move is the debrief that used to sit over the board as prose: it belongs after the work,
because which flag you could hand over whole is something you find out by handing it over. It also
means this page is where the student watches the window fill with the bulkiest thing in the course,
a trace and a console dump, which is `tools`'s claim about volume met in their own session.

**The board is an inline figure rather than the registry's trailing `figure`**, which it was until a
closing section arrived under it. That section is gone again and the board is the last thing on the
page, so the two slots would now render identically; it stays inline because the card and the board
are one shape and both being markers is what says so. The board deliberately carries **no heading**:
in guided mode a heading is adopted by the *next* top-level marker, so one written for the board
would be pulled up over the task card instead.

The unit follows the step's exercise shape at last, which is audit item 46 closed: an `<hr>`, the
shared `<h2 data-i18n="ui:quiz.title">`, and one `<h3>` under it. That is the same exception `tools`
gets and for the same reason, that a hands-on task needs a sentence of setting. **The step no longer
ends here.** `Looking back`, two sentences saying step 1 was over and naming step 2, sat under the
board until `recap` arrived, and it went whole: a page that closes on the hunt closes better than one
that steps away from it to summarise, and the forward pointer belongs on the page that looks back.

**`workshop.the-board.1` was deleted rather than moved.** It was a `data-audience="guided"`
paragraph, and guided mode drops every run of prose whatever its attribute says, so it rendered for
nobody: not for a self-learner, who is not its audience, and not in class, where the prose is cut
wholesale. It also recited all three techniques, which is the thing the board's own hint lines
already do. Anything a teacher needs to say out loud here belongs in the deck.

The unit is a capstone and deliberately the leanest page in the step. It once walked each flag
through its own section, and the board now carries all of that itself: a row's hint line and its
Hint dialog (the `flag.*` keys) hold the per-flag technique, so the prose must not grow a second
telling of any of it. **A hint line is two halves, what the flag is and what to do about it**, and
all three carry both: instrument the run and read it back, raise the log level and hit the endpoint,
find it in the source and run the decode rather than reason it out. `flag.decode.hint` ended on
"point your agent at it" until it was rewritten, which named no work at all, and the half it gained
is the trap the help dialog spends three sentences on: an agent doing character arithmetic in prose
sounds exactly as sure when it is wrong. **The five house rules moved to step 0's `welcome`**, where they are the rules
of every board in the course rather than of this one, so `lead.2` links to them in half a sentence
and the unit keeps only the game (two lead paragraphs, the command that starts the agent, the rule
over the task card and the two sentences that close the step). Do not
write a rule back onto this page: a rule that is true here and nowhere else is the sign the rule is
wrong rather than misplaced. What went with the move is worth knowing. The old `house-rules.5` was
the course's second pointer at `model.cost.4`, so that paragraph is now reached from nowhere but its
own unit, and the intro's version names no command and does no arithmetic, which is what keeps
`cost.4` the one place the course multiplies. The old `house-rules.4` carried the five same-shape
lines the trace prints, a measured fact of the backend; **`flag.trace.help` is now the only place
that number appears**, so a change under `kata/step1/java` visits that key alone, in both languages.
The `Stuck?` aside carried two deep hints and went because the Hint dialog is where a
stuck student is meant to look: its second hint was already `flag.trace.help` almost verbatim, and
its first is now folded into `flag.decode.help` as the shape of the impossible condition (a value
folded into a small range, compared against a bound it can never cross), in both languages. So a
board hint is the only place a technique is written down, which is what the paragraph above says.
The debrief went with it: it opened on the board grading in the browser, which
`flags.panel.description` says for itself one element lower, and closed by asking which flag the
student could hand over whole and which needed their judgement. **That question is back, as
`OneWindow`'s fourth move rather than as prose**, which is where it wanted to be: it is a look-back,
so it sits after the work instead of ahead of it. Nothing else from the debrief came with it.

Two more cuts hold the lead to its own job. **`lead.1` stops at what the flags look like**: it closed
on three sentences, one per flag, saying that one sits in unreachable source, one exists only while
the pipeline runs and one prints only at DEBUG, and those are the board's three `flag.*.hint` lines
said again a screen earlier. And **the `<pre>` starts the agent and nothing else.** It ran
`mvn spring-boot:run` and a `curl` at the endpoint, which is the student doing by hand the two things
the first house rule hands over, so a page that opens on the rules of the hunt was demonstrating the
one move the rules forbid. What is left is `cd kata/step1/java` and the launcher, so the working
folder is still named and everything after it is asked for rather than typed; `lead.2` closes on that
in a clause. It is the step's only assistant-varied block outside `tools`, `session`, `context` and
`model`, and it varies for the ordinary reason: the launcher is a command.

`recap` closes the step, and it is **the one unit allowed to say what another unit already said**.
Everything else in the course points at the page that owns a claim rather than restating it. This one
is **a single list and nothing else**: one bullet per unit ahead of `workshop`, in the order the
student met them, and **every bullet is a cost and the move that answers it**, on one line. The bold
half states what it costs you and carries the link back to the unit that argued it; the half after it
is what to do about it. What keeps the page from being a second course is that line. **A claim
needing a third sentence belongs in the unit it came from**, and nothing here re-argues anything,
which cuts both ways: rewriting a unit's argument means visiting its bullet, in both languages.

**It ran as two lists first, the costs and then the advice, and that is the shape to keep it out
of.** The halves did not line up. Eight units do not have one money-saver each, so the reader was
left pairing a bullet in one list against a bullet in the other by eye, and the two most useful
things on the page sat a screen apart. Merging them is what fixed it, and splitting them again puts
it back.

**Every icon is lifted rather than chosen.** The move half carries the marker the unit itself put on
that advice (the language to ask in, bundling, clearing at your own seam, turning tools off, keeping
a cache warm, the expensive model writing the brief, the five-hour window, asking for the check), so
`welcome`'s legend still means what it says. An icon here that is not on the paragraph it came from
is drift, in one direction or the other, and **the session bullet carries none because that unit
marks none**. Do not invent one to even the list up.

Four more decisions. **`workshop` is not in the list**, because a capstone is not a claim and the
student has just worked it. **The five-hour bullet is last, Claude-only, and has no Copilot
sibling**, the same shape and the same reasoning as `model`'s section, so its key carries no
`.claude` suffix: there is no pair for a missing translation to fall back to. It sits after the eight
rather than inside them because it is an extra rather than a unit's line, which is also what keeps
the one-bullet-per-unit rule readable when a Copilot reader is shown eight. **There is no figure,
card or quiz**, which leaves
the page **empty in guided mode**, since prose is dropped wholesale there. That is a supported state
rather than an oversight (`StepContent` renders `null` and the article takes no gap): in class the
recap happens out loud off the deck, where the step's last block is a divider and three statements,
the window, the one move all eight bullets are, and step 2. The empty page and that block are one
decision, so a room that loses the block loses the recap altogether. And **`Where this goes` is the step's only forward pointer and
the only place the course says a step has ended**, which came over from `workshop`'s deleted
`Looking back`; the sentence naming step 2 is that paragraph's, near enough, and it is the one thing
from it worth keeping.

## The assistant variants

Eleven blocks in step 1 vary and nearly all of them are the same kind of thing, a filename or a
command: the `<pre>` under `workshop.lead.2` (`claude` against `copilot`, each after the same `cd`),
`tools.extra-tools.3`, the `<pre>` under `tools.connect-one.1` and `tools.connect-one.2`
(`claude mcp add` against `copilot mcp add`, which lands in `~/.copilot/mcp-config.json`),
`tools.read-your-window.1`, `tools.list-itself-window.2`, `session.window-not-memory.1`,
`context.amnesia-context-fatigue.3`
(nested inside the audience wrapper, never both attributes on one element),
`model.api-vs-subscription.2` and `.3`, plus `survive.write.*.label` on the task card.
`harness.lead.1` names Copilot for **every** reader instead of splitting, because that sentence is a
list of example harnesses and a list is where a second product belongs. **Both languages carry the
list, and the Dutch had dropped Copilot out of it**, which is what an ungated block looks like when
it drifts: nothing filters it, nothing warns, and the second product is simply missing for one
language. So a rewording of either half visits `nl.json`. `harness.which-one-you-run.2`
is the second ungated naming and it is there on the same reasoning: it is a **comparison**, so both
halves have to reach both readers, and gating it would hand each of them one side of a sentence about
a difference. It is also the only ungated block that names `Copilot CLI` in full, which the paragraph
below asks of a variant block and which holds here too, since the built-in server is the CLI's.

Two things in the step are not a filename or a command, so do not read that sentence as saying
everything that varies is a word. `model`'s window section is the larger one and it is **not one of
the eleven at all**: it is Claude-only whole, with no Copilot half to pair with, and the reasoning is
under `model`. `tools.list-itself-window.2` is the smaller, it is one of the eleven, and it is a
**product fact**. Copilot CLI holds the GitHub MCP server with no configuration,
so that reader is already paying for MCP tool descriptions when the section claims a tool costs you
by existing, and the Claude half's "connect five MCP servers" would have them counting from zero.
`list-itself-window.1` above it was made assistant-neutral in the same change ("every tool" rather
than "every tool you connect") so the two paragraphs do not contradict each other, and
`ReadYourWindow` needs no variant either way: its first and last moves compare a reading with and
without the server the student added themselves. **That product fact is now spent twice, and what
keeps the two from being one duplicate is the argument each makes of it.** `tools` owns the cost
(the coin, "you pay for them whether or not the agent touches one") and is gated to the reader it is
true of; `harness.which-one-you-run.2` owns the difference, namely that two harnesses do not start
you in the same place, and reaches everybody because a comparison has two halves. So a coin or a
"you pay" line must not follow the fact into `harness`, which is also what keeps that section clear
of the billing line `model` took off it, and `tools` must not grow the comparison.

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
