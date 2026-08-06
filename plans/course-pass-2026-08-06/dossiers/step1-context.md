# Dossier: step1 / `context`

Files read: `front/src/steps/step1/CLAUDE.md` (all 917 lines), `units/context.html`, `index.tsx`,
`locales/en.json` + `nl.json` (all `context.*`, `diagram.*`, `falloff.*`, `oneshot-compare.*`,
`window.*`, `quiz.*` keys), `ContextDiagram.tsx`, `ContextFalloff.tsx`, `OneShotCompare.tsx`,
`ReadYourWindow.tsx`, `quiz.ts`, `deck.tsx` + `deck.context.*` keys, `audit.md` (items 3, 29, and the
step-1 rows), `.claude/skills/lesson-writing/SKILL.md`. Cross-checked against `units/tokens.html`,
`units/prompt.html`, `units/tools.html`, `units/session.html`, `units/recap.html`, `PatternMatch.tsx`.

**Read this first.** The `lesson-writing` skill names this file as the house-voice reference
("`step1/context.html` and `step1/harness.html` are the reference: when in doubt, read a section of
one out loud and match its rhythm") and quotes five of its sentences as models. Four of my findings
are factual and none of them ask for a rhythm change. Nothing below proposes flattening the voice,
and where a constraint in the step's `CLAUDE.md` protects something I would otherwise have queried,
I say so and leave it alone.

---

## 1. AI tells

The prose is genuinely human and genuinely good. Sentence lengths are uneven, the fragments are
deliberate ("Failed attempts. A command that errored."), the tricolons are concrete rather than
decorative ("the tutorial answer, the `UserServiceImpl`, the try-catch that swallows the
exception"), and there is not one announcing opener, not one empty intensifier, and not one summary
paragraph in the whole unit. Section lengths run 1 / 2 / 4 / 2 / 2 / 3 / 3 paragraphs, which is the
uneven shape the brief asks for. I found exactly one tell and it is at the boundary.

**1.** **Where** `context.model-statistic.3` (last two sentences), `units/context.html:61-66`; NL
`context.model-statistic.3`.

**Problem** "Relevant context does not only make an answer more correct. It raises the quality." is
the *not just X, it's Y* family the brief names, split across a full stop so it reads less like the
construction than it is. Two things go with it. It is the one place in the unit that generalises out
of the figure into an abstraction, and it leaves the paragraph's sharpest line stuck in the middle
("the distance left to cover is shorter"), which is checklist question 2 in `lesson-writing`. The
claim underneath it is worth keeping: correctness and quality are different axes and the figure
shows it. What is wrong is the shape it is stated in.

**Fix** Replace the last two sentences of the paragraph with a concrete closer that makes the same
distinction:

> The one on the left is the prompt on its own. The one on the right got the same prompt with one
> reference image from Dribbble pinned to it. That single piece of context steered it somewhere less
> generic straight away. It is not finished, but it is closer, and the distance left to cover is
> shorter. The left one is correct too. Nobody would ship it.

NL:

> Die links is de prompt op zichzelf. Die rechts kreeg dezelfde prompt met één referentiebeeld van
> Dribbble erbij. Dat ene stuk context stuurde ze meteen ergens minder generieks heen. Ze is niet af,
> maar ze staat dichterbij, en de weg die nog te gaan is, is korter. Die links klopt ook. Niemand zou
> ze zo online zetten.

---

## 2. Truthfulness

Five findings. Four of them are claims that contradict something the student read **earlier in this
same step**, which is worse than a claim that is merely stale: the reader has to decide which unit
was lying.

**1.** **Where** `context.entropy.3`, `units/context.html:151-155`; NL `context.entropy.3`; ripple
into `deck.context.entropy.note` in both locale files.

**Problem** Two errors in one paragraph. First, *lost in the middle* is not "a name of its own" for
what the two paragraphs above describe. Entropy here is accumulation: the window fills with the
session's leftovers. Lost in the middle (Liu et al., "Lost in the Middle: How Language Models Use
Long Contexts", TACL 2023) is a **positional** effect measured on clean, purpose-built windows: a
model uses evidence near the start and near the end of the context reliably and misses the same
evidence when it sits in the middle. It happens in a window with no leftovers in it at all. Calling
it another name for entropy conflates two different failures, and the fix for each is different
(clear the session vs. put the deciding line at the end).

Second, the gloss the paragraph gives, "it weighed that line as less important than the bulk around
it", strips out the one thing that makes the name make sense. A reader finishes the paragraph unable
to say why the phenomenon is called *middle*. The same wording is on the projector in
`deck.context.entropy.note`, so this is two files in two languages plus the deck.

**Fix** Keep the section and keep the term. State the position:

> This has a name of its own: lost in the middle. Nothing was deleted. The line that decides the
> answer is still sitting in the window, and where it sits is what went wrong. A model uses what is
> near the top of the window and what is near the bottom. Put the deciding line halfway up a long
> context and it reads straight past it.

NL:

> Dit heeft een eigen naam: lost in the middle. Er is niets weggegooid. De regel waar het antwoord op
> draait staat nog in het venster, en waar ze staat is precies het probleem. Een model gebruikt wat
> vooraan in het venster staat en wat achteraan staat. Zet de beslissende regel halverwege een lange
> context en het leest er zo overheen.

`deck.context.entropy.note` moves with it: "Nothing was deleted. The deciding line is still in
there, halfway up a window the model reads from both ends."

**2.** **Where** `context.model-statistic.1`, `units/context.html:42-46`; NL same key.

**Problem** "It predicts the most likely continuation of the text it was given." Three units earlier
`tokens.one-at-a-time.4` says, verbatim: "The favourite is not always what comes out. Those scores
are a distribution and the model samples from it, so the same question can give you a different
answer twice in a row." `PickTheNext` at the foot of that unit exists for no other reason than to
catch a student who read the scores as a lookup table (the step's `CLAUDE.md` says so at length:
"a student who read that figure as a lookup table finds out here rather than four units later"). This
sentence hands the misreading back to them, in the unit that is teaching them what a model is.

**Fix** One word:

> It is also a statistical model rather than a reasoning database. It weighs what could come next in
> the text it was given, using patterns from its training data. It holds no opinion about your
> codebase. What it holds is an average.

NL: "Het weegt af wat er op de tekst die het gekregen heeft zou kunnen volgen, op basis van patronen
uit zijn trainingsdata."

("What it holds is an average" is quoted in the `lesson-writing` skill as a model closer. It stays.)

**3.** **Where** `context.why-bites-hardest.2`, `units/context.html:116-120`; NL same key.

**Problem** "'Good' and 'bad' are not labels in the training data. Frequency is the only signal."
This is true of the pretraining pile and false of the model the student is actually talking to.
Post-training is exactly the labelling of good against bad: preference data, RLHF, and the
distillation the course itself teaches four units later, where `model` argues that "providers
fine-tune the smaller tiers on output from the larger ones". A student who has read that section
and then reads "frequency is the only signal" has been told two incompatible things about the same
machine. It also over-claims in a way a reader can falsify in thirty seconds: ask any current model
to rate two snippets and it ranks them.

**Fix** Scope it to the pile, which is the claim the section actually needs:

> It cannot tell the two apart from the pile alone. "Good" and "bad" are not labels in what it read.
> Later training teaches it manners and taste in general, not what your team settled on in 2019, so
> frequency is what is left. A vague question returns the statistical middle of everything ever
> written about the topic. That middle is mediocre code that happens to compile.

NL:

> Uit de stapel alleen kan het de twee niet uit elkaar houden. "Goed" en "slecht" zijn geen labels in
> wat het gelezen heeft. De training die erna komt leert het manieren en algemene smaak aan, niet wat
> jullie team in 2019 afgesproken heeft, dus blijft frequentie over. Een vage vraag geeft je het
> statistische midden van alles wat ooit over het onderwerp geschreven is. Dat midden is middelmatige
> code die toevallig compileert.

**4.** **Where** `context.more-context-not.1`, `units/context.html:124-128`; NL same key.

**Problem** "Every token in the window is paid for, on every turn." `tokens.reads-all.4`, unit one of
this step, already told the student the opposite in the part that matters: "Adding to the end leaves
every earlier weighing exactly as it was, so the front of the pile can be kept and charged at a
fraction next turn. That is what a cache is here." `model`'s `ModelPricing` then prices a cache read
at a tenth of input. So the absolute is wrong by a factor of ten on the largest part of a long
window, and it is wrong in the direction that makes the unit's advice look overstated.

The step's `CLAUDE.md` is explicit that `harness` owns the cache and that `tokens` must not grow a
third telling, so the fix must not explain caching here. It only has to stop asserting the absolute.

**Fix** Two words changed, no new material:

> Every token in the window is sent again, on every turn, because the whole context goes back to the
> model with each message. A long session does not cost slightly more. It costs more per message, for
> the rest of the session.

NL: "Elke token in het venster gaat opnieuw mee, en dat bij elke beurt, want de volledige context
gaat met elk bericht opnieuw naar het model."

**5.** **Where** `context.amnesia-context-fatigue.1`, `units/context.html:159-163`; NL same key.

**Problem** "Older material is compacted into a summary or drops out completely." The second half is
untrue of both harnesses this course is written for. `session.compaction-picks-moment.1`, the very
next unit, says "When the pile stops fitting, the harness compacts it", and the step's `CLAUDE.md`
records "Compaction is automatic in both, from about 80% in Copilot CLI". Nothing silently drops the
oldest turns in Claude Code or Copilot CLI. The "or drops out completely" branch is the raw-API
behaviour a student will never meet, and it is the branch the figure under this section draws (see
Imagery 1), so the unit spends its one drawing on its least true half.

**Fix** Demote the drop-out to what it is:

> Because the window is finite, something eventually has to give. Older material is summarised, and
> the summary is what stays. The constraint you gave at the start is now one line in it, or it did
> not make the cut at all.

NL:

> Omdat het venster eindig is, moet er vroeg of laat iets wijken. Ouder materiaal wordt samengevat, en
> die samenvatting is wat blijft. De randvoorwaarde die je in het begin meegaf is nu één regel daarin,
> of ze heeft de samenvatting niet gehaald.

**Verified and correct** (checked, no finding): the `#entropy` anchor resolves to the `<h2
id="entropy">` in this file; `/oneshot-prompt.png` and `/prompted-with-dribbble.png` both exist in
`front/public/`; the `pattern` icon on `bad-context-bad.2` is legitimate, since `prompt.lead.2`
already marks the interview with the same icon two units earlier; the `coin` icon on
`model-stateless.2` is the one `recap.what-costs-do.4` lifts, so it must survive any edit to that
paragraph; every `data-i18n` key in the file has an `nl.json` entry and no `en.json` prose entry,
which is the documented shape; no em-dashes anywhere in the unit or its Dutch.

**Out of scope but worth naming**: the docblock in `front/src/steps/step1/index.tsx:60` says "That
makes `prompt` the unit that defines the word context." It does not, and has not since the
definition was cut. Both `context.html`'s own comment and the step `CLAUDE.md` say so. Code comment,
not student prose, so it is a one-line cleanup rather than a finding against the unit.

---

## 3. Progression

**1.** **Where** `context.lead.1`, `units/context.html:7-11`. **Known: `audit.md` item 3.**

**Problem** The unit is titled "Context", it is the unit the step's own notes name as the one that
would own a definition, and it never defines the word. `prompt.lead.1` carried the definition and was
correctly rewritten to open on the prompt. The lead here describes the thing ("come from different
places and land in the same block of text") without naming it as the thing being described, so the
student who wants to know what the word means finishes the step never having been told. I am not
discovering this; the audit records it and prices it at a clause. I am confirming it is still open
and that the audit's proposed fix is the right one.

**Fix** One clause, in the sentence that already describes it:

> Your prompt, the resources the agent read and the tools it can call come from different places and
> land in the same block of text. That block is the context, and it is all the model ever sees. Once
> anything is in there, nothing marks where it came from, and the model weighs all of it the same.

NL: "Dat blok is de context, en het is alles wat het model ooit te zien krijgt."

**2.** **Where** `context.model-stateless.2` (`units/context.html:32-38`) against
`context.more-context-not.1` (`:124-128`).

**Problem** The same argument, made twice, sixty lines apart, in a unit that is already the heaviest
in the course. `model-stateless.2`: "Sending that whole transcript again is not free. The longer you
talk to an LLM, the bigger the tasks and the more of them stack up, the more every turn costs."
`more-context-not.1`: "Every token in the window is paid for, on every turn... A long session does
not cost slightly more. It costs more per message, for the rest of the session." Identical claim,
identical mechanism, and the second one sits under a heading whose whole job is to own it. The step's
`CLAUDE.md` sanctions `context` owning the re-send argument against `session`; it says nothing about
the unit making it twice against itself, and `lesson-writing`'s checklist question 7 is precisely
this.

The cut has to go in `model-stateless.2`, not the other way, because the named section is where a
reader looks for the price. What must survive in `model-stateless.2` is the clearing instruction and
its `coin` icon: `recap.what-costs-do.4` lifts that exact marker off this paragraph, and the step's
notes say an icon in the recap that is not on the paragraph it came from is drift.

**Fix**

> Sending that whole transcript again has consequences beyond the bill. Clear the session
> `<svg data-icon="coin"></svg>` often enough, especially when you switch to something unrelated. A
> fresh session keeps the model focused, even when it has to re-read a file to solve the problem in
> front of it.

NL:

> Dat volledige transcript opnieuw meesturen heeft meer gevolgen dan alleen de rekening. Clear de
> sessie `<svg data-icon=\"coin\"></svg>` vaak genoeg, zeker wanneer je overschakelt naar iets dat er
> niets mee te maken heeft. Een verse sessie houdt het model scherp, ook al moet het een bestand
> opnieuw lezen om het probleem voor zich op te lossen.

**3.** **Where** `context.why-bites-hardest.heading` and its two paragraphs,
`units/context.html:108-120`.

**Problem** The heading promises a comparative, "hardest **in code**", and neither paragraph makes
one. What they argue is that the internet holds more bad code than good, which is equally true of
recipes, legal advice and blog posts. The thing that is genuinely special to code, and that the
section's last sentence gestures at without ever saying, is that bad code is indistinguishable from
good code at a glance because it compiles and runs. Read the heading and the first sentence together
(checklist question 8) and the heading is asking a question the section answers only by accident.

Retitling would rename `why-bites-hardest.1` and `.2` in the HTML and in `nl.json`, which is the
expensive fix. The cheap one earns the heading instead, and it is one clause on the paragraph that
already ends in the right place.

**Fix** `why-bites-hardest.1`, closing clause:

> There is far more bad code on the internet than good code. Abandoned tutorials, answers from 2011,
> snippets that never ran in production, homework. A model trained on all of it has seen the thing
> you should not do thousands of times, and unlike a bad paragraph, a bad function compiles.

NL: "...heeft duizenden keren gezien wat je net niet moet doen, en anders dan een slechte alinea
compileert een slechte functie gewoon."

---

## 4. Readability

Nothing to report, and this is not a courtesy. I read every paragraph aloud. No sentence carries two
arguments, no heading misdescribes its section (with the one exception filed under Progression 3), no
term is used before the reader has met it (`harness` first appears in `tools.html:3`, a unit earlier;
`compaction` is described here and named in `session`, which is the step's name-the-term-last rule
working as intended), and the one place the reader has to jump, the `#entropy` anchor in
`bad-context-bad.4`, is a forward link to a heading that exists and is scroll-margin-corrected.

The four-paragraph run in `bad-context-bad` and the three in `entropy` break the
`lesson-writing` rule that a section is a heading and one or two paragraphs. I am not filing it. Each
of those paragraphs makes a distinct claim (missing / recoverable / wrong / accidental), the fourth
is the scenario the skill itself quotes as a model, and `audit.md` item 29 records the unit's length
as measured and accepted.

---

## 5. Imagery

Four figures: `ContextDiagram`, `OneShotCompare`, `ContextFalloff`, `ReadYourWindow` (a task card,
not a drawing). Two of them (`OneShotCompare`, `ContextFalloff`) carry `data-audience="self"` on the
marker, so in class the page renders the diagram and the card only.

**Not a finding, stated so nobody proposes it:** `ContextDiagram` does draw the claim
`context.lead.1` makes, which normally fails this repo's own bar. It stays. It is the third of a
three-figure sequence (`PromptInContext` with no frame, `ToolsInContext` with the first frame, this
one populated), and the step's `CLAUDE.md` documents that sequence and the geometry sharing that
makes it work at length. Cutting it would break `McpOvals`'s column alignment argument as well. Leave
it alone.

**1.** **Where** `ContextFalloff.tsx`, rendered at `units/context.html:176`; also on the projector as
`deck-context-falloff`.

**Problem** The figure draws the oldest turns tilting and spilling off the top of a fixed frame. That
is the half of `amnesia-context-fatigue.1` that is untrue of both harnesses this course targets (see
Truthfulness 5), and it omits the half that is true and that the section's advice acts on:
compaction. The paragraph directly under the figure, `amnesia-context-fatigue.3`, is entirely about
surviving compaction ("When the window is compacted, detail is the first thing to go... write it in
`CLAUDE.md`"), and the drawing above it never shows a compaction happening. So the figure both
illustrates a claim the prose already states (which is the thing this repo cuts) and illustrates the
wrong one.

**Fix** Make it carry what the prose cannot show, which is that the summary **stays inside the frame
while the detail leaves**. Keep the frame, keep the six turn bars, keep the newest arriving solid at
the bottom. Replace the two tilted ghosts outside the top with: the two oldest bars collapsing into
**one short bar that stays inside the frame at the top**, drawn in the step's faint fill, with the
detail leaving it as the existing tilted ghosts (now visibly coming out of that one bar rather than
out of the window). Two labels instead of one: `falloff.summarised` on the short bar ("summarised" /
"samengevat") and `falloff.dropped` on the ghosts ("the detail goes" / "het detail gaat weg"). The
reader takes away the thing the sentence cannot draw: the constraint is still in the window and it is
now one line long, which is exactly why `CLAUDE.md` is the answer. `deck.context.falloff.title` ("The
model did not get tired. The evidence left the room.") still lands.

**2.** **Where** new figure under `context.entropy.3`, `units/context.html:151`.

**Problem** Once Truthfulness 1 is fixed, the unit states a claim the reader has no way to believe
and no way to check: that a model reliably uses evidence at the top and bottom of a long window and
misses the same evidence in the middle. It is the only claim in the unit that is counterintuitive
(the reader's mental model is that the window is a bag, not a shape), and it is the one that changes
what they do (put the deciding line last). Nothing draws it, and prose cannot: the shape of the curve
is the argument.

**Proposal** One small chart, the step's teal, in the vocabulary already established.

- **x axis**: position of the one relevant line in the window, from "first turn" through "middle" to
  "last turn". Five or seven tick positions, no numbers.
- **y axis**: how often the model uses that line to answer. Labelled as a share, gridline at 100.
- **One curve**, high at both ends and sagging in the middle: the U from Liu et al. Nothing else on
  the plot except a marker at the sag reading "the line that decides the answer".
- **Caption**: names the source and nothing else, per this repo's caption rule and `ModelPricing`'s
  precedent for third-party numbers: "Liu et al., *Lost in the Middle*, 2023." If the exact numbers
  are not going to be transcribed faithfully, the honest alternative is `NextToken`'s move: draw the
  shape, and let the caption say the shape is the finding and the values are drawn rather than
  measured.

**What the reader takes from it**: where you put a thing in the window changes whether it is used,
which no other figure in the step says and which turns "clear more often" into a second, different
move (say the important thing last).

**Priced honestly**: this unit is already the heaviest in the course at 1,167 words and four markers.
A fifth is a real cost, and it is a new chart shape in a step whose diagram vocabulary is frames,
bars and dashes. If only one of the two imagery findings is taken, take number 1: it fixes an
existing figure rather than adding one.

---

## 6. Supporting tasks

The unit does ask the reader to do something, and it is the right thing: `ReadYourWindow`, a
`TaskCard` on four moves, running `/context` against the student's own window with the `tools` MCP
server in and then out. It is the only place in the course the command is used rather than described,
and the step's `CLAUDE.md` documents that the prose describing it was deliberately removed so the
card is the whole instruction. That is a good decision and I am not touching it.

**1.** **Where** `context.read-your-window.heading` (`units/context.html:206`) against `window.title`
in both locale files.

**Problem** Two names for one task, six inches apart. The `<h3>` says "Read your own window"; the
card immediately under it is titled "Count what the tools cost" / "Tel wat de tools kosten". The card
title came over from `tools`, where the tool cost was the whole framing. In `context` it now describes
only moves two and four; move three ("Ask for a change that makes the agent open a few files, then run
`/context` again") is about the window growing and has nothing to do with tools. A reader glancing at
the page sees the section promise one thing and the card promise another.

**Fix** Keep the `<h3>` (it is the section, its key is a location, and the Dutch is already written).
Change `window.title` so the two read as one thing:

- EN `window.title`: `Count what fills it`
- NL `window.title`: `Tel wat erin zit`

**No second task, and here is why.** The unit's other candidate is entropy, and the shape would be
"work until the agent contradicts itself, then clear". That is `session`'s `SurviveTheClear` in all
but name, `session` owns clearing at a seam you pick, and the entropy claim is already tested by
`quiz.quality-degrades`, which asks the student to diagnose the exact symptom. Adding a card here
would grow the heaviest unit in the course to buy a duplicate. Do not.

---

## 7. Quiz

The unit has a three-question quiz and it should. The distractors are the strongest in step 1: "the
model degrades the longer it runs, the way a machine drifts as it heats up" and "the provider quietly
moved you to a smaller model once the session got expensive" are both things working engineers say
out loud, and "the model looks your history up in a database per session" is the mental model most
non-specialists actually hold. Each question hands over a symptom and asks for the cause, which is the
right shape for a unit about invisible state. `invented-userservice` is `truth`'s scenario asked four
units early and the step's `CLAUDE.md` is explicit that it stays here; I agree, and I am not moving it.

**1.** **Where** `contextQuiz` in `front/src/steps/step1/quiz.ts`.

**Problem** All three questions have the same answer shape: something is **absent** from the window
(pushed out, never read) or there is **too much** in it. Nothing tests the unit's least intuitive and
most expensive claim, `bad-context-bad.3`: that wrong context is worse than missing context, because
nothing in the window says "stale" and everything in the window reads as true. That is the claim a
reader is most likely to nod along to and then get wrong at work, which is the `quiz-writing` bar.

**Fix** A fourth question. It breaks the house count of three, which is the honest cost; the
alternative is swapping it in for `forgets-this-morning`, which I would not do, because amnesia and
entropy are the two opposite failure modes and both deserve a question.

- **id** `pasted-old-file`
- **question** "You paste a config file into the session so the agent has something to work from.
  It is two releases old and you have forgotten that. The agent builds on it confidently and the
  result is wrong. What went wrong?"
- **correct** `reads-as-true` — "Nothing in the window marks anything as stale. The old file sits
  there reading exactly like a current one, so the model builds on it without a second thought."
- **distractor** `should-have-checked` — "The agent should have opened the file on disk to check the
  version before using what you pasted." (Believable, and wrong for the right reason: it did have
  something to work from, so it had no reason to go looking.)
- **distractor** `too-old` — "The file predates the model's training cutoff, so the format is
  unfamiliar to it." (Confuses this unit with `truth`, which is a confusion worth catching.)
- **distractor** `window-too-small` — "The config did not fit in the window alongside everything
  else, so only part of it was read."
- **explanation** "A model has no way to date what it is handed. Wrong context is more dangerous than
  missing context for exactly that reason: missing context is a gap the harness can go and fill, and
  wrong context is an answer built on top of."

Dutch for all five strings in the same pass, per the standing rule.

---

## 8. EN/NL parity

Parity is **complete**. All 31 prose keys in `context.html` have an `nl.json` entry, including the
`.claude` / `.copilot` pair and the `read-your-window.heading`; no key has a stray `en.json` prose
entry; the assistant variants nest correctly inside the `data-audience` wrapper rather than carrying
both attributes; the figure markers are top-level; no em-dashes in either language. The Dutch is a
rewrite rather than a conversion throughout ("Stel: je jaagt een hele sessie op een bug" for "Chase a
bug through a long session" is a Dutch speaker's sentence, not a translated one), and every finding
above needs its Dutch counterpart, which I have supplied.

**1.** **Where** `context.more-context-not.2`, both languages.

**Problem** The one place the two say different things, and here the **English is the better one**,
which is the reverse of the usual direction. EN: "It is context that is small enough and good
enough." The parallel "small enough / good enough" is the claim: sufficiency on both axes, nothing
more. NL: "Het doel is context die klein genoeg is en van goede kwaliteit" ("of good quality"), which
turns the second half into an unbounded quality demand and loses the parallel.

**Fix** NL: "Het doel is context die klein genoeg is en goed genoeg."

**2.** **Where** `quiz.quality-degrades.entropy` in `en.json:415`.

**Problem** Typographic apostrophe in "the session’s leftovers". There are exactly two in
`en.json` (this one and `quiz.plan-beats-one-shot.cache`) and zero in `nl.json`; every other
possessive and contraction in both bundles is a straight quote. It renders in the same typeface
either way, so this is hygiene rather than a defect, but it is the kind of thing that gets diffed
noisily later.

**Fix** `session's`.

---

## Verdict

This is the best-written unit in the course by voice, and the `lesson-writing` skill is right to name
it as the reference: I found one AI tell in 1,167 words, and it is a borderline one. What it is not
is the most accurate unit in the course. Four of its sentences contradict something the student read
earlier in this same step, and in three of the four the earlier unit is the one that is right: the
model "predicts the most likely continuation" after `tokens` spent a figure and a graded exercise
establishing that it does not; "every token is paid for on every turn" after `tokens` explained the
prefix cache; "drops out completely" against `session`'s compaction one page later. The fifth,
`lost in the middle`, is the one that would embarrass the course in front of a reader who knows the
paper: the unit names a real, well-known result and then describes something else, and the same
wording is on the projector. All five are clause-sized fixes and none of them costs the voice
anything. Below that, the unit argues its cost point twice, never defines the word it is named after
(known, `audit.md` item 3), and spends its one bespoke drawing on the half of its own sentence that
is untrue. Fix the facts and this unit is genuinely world class; leave them and it is a beautifully
written page that a careful student can catch out five times.

Priority order:

1. **Truthfulness 1** — `lost in the middle` misdescribed and conflated with entropy. Three files
   (HTML, `nl.json`, deck note in both bundles). Highest embarrassment cost, and it unlocks
   Imagery 2.
2. **Truthfulness 2** — "the most likely continuation" undoes `PickTheNext`. One word.
3. **Truthfulness 4** — "every token is paid for, on every turn" against `tokens.reads-all.4`. Two
   words, and no new material about caching, which the step's notes forbid here.
4. **Truthfulness 5 + Imagery 1** — "drops out completely", and the figure that draws that half.
   Do them together: the prose fix and the figure fix are one change of mind.
5. **Truthfulness 3** — "frequency is the only signal". One clause, scoped to the pretraining pile.
6. **Progression 2** — cut the duplicated cost argument out of `model-stateless.2`, keeping the
   `coin` icon `recap` lifts from it.
7. **Progression 1** — define the word, one clause in `context.lead.1`. Known audit item 3.
8. **Progression 3** — earn the "hardest in code" heading with one clause rather than renaming keys.
9. **AI tell 1** — the *not only / it* close on `model-statistic.3`.
10. **Tasks 1** — retitle the card so the heading and the card agree.
11. **Quiz 1** — the fourth question on wrong context. Real gap, but it breaks the count of three, so
    it is a decision rather than an edit.
12. **NL 1, NL 2** — "goed genoeg", and the stray typographic apostrophe.
13. **Imagery 2** — the lost-in-the-middle position curve. Take it only if the unit can afford a
    fifth marker; it is the most valuable new drawing in the unit and the most expensive line here.

Not to be touched, and stated so the next pass does not: `ContextDiagram` (third of a documented
three-figure sequence), `ReadYourWindow`'s four moves and its missing description line (both
documented decisions), the whole-unit `data-audience="self"` wrapper, the `invented-userservice`
question's placement, and the unit's length.
