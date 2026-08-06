# CLAUDE.md — step 3

What is deliberate about each unit of step 3, and why. It loads when you work with files under
`front/src/steps/step3/`. Nearly everything here is a decision with a reason behind it, and this
step's decisions are mostly about what it deliberately does not have. Read it before editing any of
this step's files.

The rules that span the whole curriculum are in the parent `front/src/steps/CLAUDE.md`, the design
system and the audience and assistant mechanisms are in `front/CLAUDE.md`, and the repo-wide
prohibitions are in the root `CLAUDE.md`. None of them is repeated here.

`step3` is **soft skills**: the part of working this way that is not about the agent. Three units,
`change`, `expectations` and `impostor`, and **the order runs from the team inwards**: what the job
turns into and who else has to move with it, then what the people around you now believe about your
speed, then what the change does to you. `impostor` closes the step because it is the personal one
and there is nothing useful after it. Unit ids are single words on the tree's own convention (`session`, `goals`,
`steering`) while the titles are the two-word terms a reader would search for, so the URL is
`/steps/step3/expectations` and the sidebar says "Expectation management".

**Nothing in the step is graded or quizzed, and that is the decision rather than an unfinished
state.** Every unit here is a conversation with a colleague, a stakeholder or yourself, so there is no
command a checker could run. It is also
the first step with no Java at all: `kata/step3/java` stays the empty scaffold, on the reasoning in the
root `CLAUDE.md`. If an exercise is ever wanted here, the honest shape is step 2's `TaskCard`, ticked
once and grading nothing, and the thing it asks for has to happen away from the keyboard.

**The step has exactly one drawing, `PipelineShift` in `change`, and the bar for a second one is
where it has always been.** The rule that held for a long time was that no figure carries anything
the sentences do not, and it is still the right test: a picture of a claim the paragraph already
makes is the thing to cut. This one passes because it is a measurement rather than an illustration.
Two pipelines drawn on one scale, and the second one carries a strip under it comparing the
verifying three parallel lanes need against the verifying they get. That gap is the one claim in the
step no sentence can make without a reader taking it on trust, and it is the reason the figure is
here rather than in `expectations`, which is about a date rather than about what got read. Its own
file carries the proportions that have to keep holding, and they are load bearing in both
directions: make the second row look like a win and the drawing argues the opposite of the section
above it. Note what it does to guided mode: `change` now renders a heading and a drawing in class
where the step used to render nothing at all, so it is the one unit here a tutor can put on the
board.

**Every section leans on a unit that already argued its engineering claim and none of them may
re-argue it**, which is the same rule `harness.coordinator.3` follows in step 1 and the constraint
most easily lost in a rewrite here. The soft skill is the new part; the claim underneath it gets a
link and one clause. Almost every lean points at step 2. `change` takes six of them, one per section
and no unit twice: `you-test-engineer` at `engineering` for the floor and the ceiling,
`business-moves-closer` at `evolution` for a prototype starting a conversation,
`process-was-bottleneck` at `enablement` for one person carrying more of the stack,
`way-working-decision` at `patterns` for something done by hand turning into a script, `code-got-cheap`
at `workflows` for spec-driven work keeping the description, `environment-beats-project` at `setup`
for the environment being files. `expectations.lead` is `evolution`'s skeleton with the details left
out, `expectations.detail-nobody-specified` borrows `engineering`'s naming-the-thing-you-want,
`expectations.estimate-still-matters` borrows `enablement`'s count of where the day goes and
`steering`'s line about the agents getting faster while your reading does not, and
`expectations.one-good-run` is `ScriptRuns`'s spread named in prose.
`impostor.you-still-engineer` hands the level-moved-up argument to `enablement` and keeps only what
that unit does not say, namely that judgement produces nothing visible at five o'clock. Grow any of
those into a second telling and the step turns into step 2 with feelings.

**`expectations.tool-not-advantage` is the one section that leans outside step 2, twice**, and both
are deliberate. The ceiling on what an agent hands back for free is `step1/context`'s average, which
is the only place in step 3 that reaches back to step 1, because it is the only claim here that is
about the model rather than about people. And the multiple that never arrives is `change`'s, one unit
earlier in this same step, so the section links sideways rather than saying it again: this is the
step's only intra-step link and it exists because the reader met that argument twenty minutes ago.
What the section adds on top of both is the part neither of them makes, that a gain everybody's
competitor also gets is a floor rather than a lead. Let it start explaining the factor and it is
`process-was-bottleneck` a second time.

`enablement` and `engineering` are the two step 2 units more than one section here leans on, and
**both splits are load bearing**. `change.process-was-bottleneck` is about the organisation: the
review queue, the environment nobody has provisioned, the release window, and the manager who worked
out a multiple that was never going to arrive. `expectations.estimate-still-matters` is about one
promise you make about one date. Let the first one start talking about estimates and the second one
has nothing left to say.

The `engineering` split is the same shape and easier to lose, because **three sections in this step
name a case an agent left out** and they are three different arguments.
`change.you-test-engineer` is the case you can write down before the implementation exists, and its
point is that thinking of it is slow and worth being slow at. `impostor.you-still-engineer` is what
naming one is worth, against a feeling that it is worth nothing.
`expectations.detail-nobody-specified` is the case **nobody could have written down**, yourself
included, because it does not exist until the thing is half built. That last one is the only one of
the three the manager has to hear, and it is the reason the burden moved rather than lifted. Keep the
lists apart: `change` and `impostor` each name three concrete cases, so
`detail-nobody-specified` deliberately names none and stays on returns alone. A third enumeration of
empty lists and expired tiers turns the step into one paragraph told three times.

`change` and `expectations` are the long units of the step, six sections and five of them against
`impostor`'s three, and in both cases that is the argument rather than a draft nobody trimmed. `change`
carries the whole claim that the job moved off
production: what your day becomes (`you-test-engineer`), who else has to move with you
(`business-moves-closer`, `process-was-bottleneck`), what the team is still doing out of habit
(`way-working-decision`), what stops being worth paying for
(`code-got-cheap`), and what is worth more than the project (`environment-beats-project`). Every one
of those is somebody different, so merging two of them merges two audiences. If it has to lose
weight, cut paragraphs, not sections.

**`way-working-decision` sits directly after `process-was-bottleneck` because it is that section's
next move, and the split between them is load bearing.** `process-was-bottleneck` says the queues did
not get faster and closes on the rest surviving because it is the part everybody already knows how to
do; this one asks whether it should survive at all. So it stays off speed entirely: a sentence here
about a review taking three days is the section above a second time. What it owns instead is the
artefact and the ritual.

**It is the step's only list, and the list is why the section works.** A lead, three `<li>`s on
`recap`'s shape (a `<strong>` claim, then what to do about it), then a closing paragraph: the three
are independent, none of them explains another, and as prose they read as one argument made three
times. The examples are chosen to be checkable rather than rhetorical. The deck is this repository
(`shared/deck/`, HTML built from the units' own figure components), so the section names a thing the
student is looking at instead of inventing a strawman, and the review and the sprint are the two
practices a team would defend hardest. **It asks and does not answer.** Nobody knows what replaces a
sprint, and a section that named a replacement would be the one thing in the step that dates, which
is why the sprint item stops at the question being allowed rather than at an alternative. The review
item is the one to watch in a rewrite: it asks what a human is catching, never whether a human should
read at all, and its closing sentence says so in as many words, because `you-test-engineer` two
sections above and `code-got-cheap` directly below both say the check stays. Let it drift into "so
drop the review" and the unit argues against itself twice on one page.

That section is also why `change` has a fourth slide (`deck-step3-change-rethink`), between the
pipelines figure and the gates. It is the one argument in the step a room will push back on, so it is
the one most worth having on the board, and it is **the step's only `statement` carrying `points`**:
three examples a tutor takes one at a time is the case that shape exists for, and a `note` there
would compress them back into the single claim the unit spent a list avoiding.

`expectations` earns its five the same way, and it went from three to five in one revision: what
management believes the tool bought them (`tool-not-advantage`), what to say at the demo
(`say-what-missing`), why the work after the demo is real (`detail-nobody-specified`), what goes into
the number you give them (`estimate-still-matters`), and how much that number is worth now
(`one-good-run`). **It stopped at five on purpose.** The sixth candidate was a section of its own for
nobody being calibrated any more, and it went into `one-good-run.2` instead, where the run-to-run
spread it corrects for is already on the page: your estimate came from years of repetition, your
manager read quality off knowing the team, and both readings are of a job that changed shape. Split
it back out and the unit is longer than `change` while saying the same thing in two places. The
casualty of that merge was the old opening of `one-good-run.2`, so note that the section now argues
before it advises, and the checkpoint instruction is the last thing in the unit rather than the first
thing in its closing paragraph.

`change.code-got-cheap` is the section that reads as a licence to stop caring, and it is written
against that on purpose. Quality drifts where drift is survivable, taste relaxes, and the last two
sentences say the gates stay where step 2's `engineering` put them. **Do not cut that pair of
closing sentences**, because without them the section tells a student that tests are optional now,
which is the opposite of what `you-test-engineer` asks of them four paragraphs earlier.

`impostor.feeling-from-signal` is the load-bearing section and it is easy to soften into
reassurance. It separates a real comprehension gap from the feeling, and it says the gap out loud
first: if you cannot follow the diff, that is not impostor syndrome, and accepting code you do not
understand is how a codebase becomes somebody else's. The second paragraph is the feeling, and it is
the only place in the course that argues with the reader rather than teaching them, which is what the
bare "Maybe." is doing. **Do not merge the two paragraphs and do not let the section comfort anybody
out of the first one.** `nobody-doing-long` closes on written-down work rather than on the feeling for
the same reason: the answer the step offers is a repository, not encouragement.

Three smaller things. **Both of the step's `CLAUDE.md` mentions carry a `data-assistant` pair**,
`impostor.nobody-doing-long.2` and `change.environment-beats-project.1`, and they did not until
step 0's `welcome` stopped saying where the swap ends. The page makes no exception for any step now,
so a mention written into this step without a pair is a Copilot reader being handed a filename they
do not have, with nothing anywhere admitting it. What stays shared is as deliberate: `audit.md` is a
file the team writes rather than either product's, and *skill* is a word both assistants use, so
neither varies.
It carries exactly **one inline icon**, the `gem`
on counting the times you told an agent something you had already told it, because that diagnostic is
the only thing in the step a reader would otherwise walk past. And it adds **no third metaphor**: the
step is about people, so it reaches for neither the window nor the money, and a section that starts
talking about "momentum" or "buy-in" is the one to cut. `code-got-cheap` is not the exception it
looks like: cheap and expensive there are the literal price of an afternoon's work, not step 1's
money metaphor for usage, and the section stays clear of budgets, spend and returns for exactly that
reason. `expectations.tool-not-advantage` sits closest to that line, since buying an edge and the
quarter are money words too. They are literal there as well, a subscription somebody actually paid
for, which is why the section says nothing about what a run costs. Usage as money belongs to step 1,
and reaching for it here is the third metaphor arriving through the back door.
