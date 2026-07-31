# CLAUDE.md — step 3

What is deliberate about each unit of step 3, and why. It loads when you work with files under
`front/src/steps/step3/`. Nearly everything here is a decision with a reason behind it, and this
step's decisions are mostly about what it deliberately does not have. Read it before editing any of
this step's files.

The rules that span the whole curriculum are in the parent `front/src/steps/CLAUDE.md`, the design
system and the audience and assistant mechanisms are in `front/CLAUDE.md`, and the repo-wide
prohibitions are in the root `CLAUDE.md`. None of them is repeated here.

`step3` is **soft skills**: the part of working this way that is not about the agent. Three units,
`change`, `expectations` and `impostor`, and **the order runs from the team inwards**: the habits a
team has to pick up, then what the people around you now believe about your speed, then what the
change does to you. `impostor` closes the step because it is the personal one and there is nothing
useful after it. Unit ids are single words on the tree's own convention (`session`, `goals`,
`steering`) while the titles are the two-word terms a reader would search for, so the URL is
`/steps/step3/expectations` and the sidebar says "Expectation management".

**Nothing in the step is graded, drawn or quizzed, and that is the decision rather than an unfinished
state.** Every unit here is a conversation with a colleague, a stakeholder or yourself, so there is no
command a checker could run and no shape a figure would carry that the sentences do not. It is also
the first step with no Java at all: `kata/step3/java` stays the empty scaffold, on the reasoning in the
root `CLAUDE.md`. If an exercise is ever wanted here, the honest shape is step 2's `TaskCard`, ticked
once and grading nothing, and the thing it asks for has to happen away from the keyboard.

**Every section leans on a step 2 unit and none of them may re-argue it**, which is the same rule
`harness.coordinator.3` follows in step 1 and the constraint most easily lost in a rewrite here. The
soft skill is the new part; the engineering claim underneath it is already argued and gets a link and
one clause. `change.start-work-hurts` points at `goals` for the wide, mechanical, measurable
handover, `change.sceptics-reading-diff` at `engineering` for the floor and the ceiling,
`change.conventions-live-repository` at `setup` for a convention being a file. `expectations.lead` is
`evolution`'s skeleton with the details left out, `expectations.estimate-still-matters` borrows
`enablement`'s count of where the day goes and `steering`'s line about the agents getting faster while
your reading does not, and `expectations.one-good-run` is `ScriptRuns`'s spread named in prose.
`impostor.you-still-engineer` hands the level-moved-up argument to `enablement` and keeps only what
that unit does not say, namely that judgement produces nothing visible at five o'clock. Grow any of
those into a second telling and the step turns into step 2 with feelings.

`impostor.feeling-from-signal` is the load-bearing section and it is easy to soften into
reassurance. It separates a real comprehension gap from the feeling, and it says the gap out loud
first: if you cannot follow the diff, that is not impostor syndrome, and accepting code you do not
understand is how a codebase becomes somebody else's. The second paragraph is the feeling, and it is
the only place in the course that argues with the reader rather than teaching them, which is what the
bare "Maybe." is doing. **Do not merge the two paragraphs and do not let the section comfort anybody
out of the first one.** `nobody-doing-long` closes on written-down work rather than on the feeling for
the same reason: the answer the step offers is a repository, not encouragement.

Three smaller things. **Both of the step's `CLAUDE.md` mentions carry a `data-assistant` pair**,
`impostor.nobody-doing-long.2` and `change.conventions-live-repository.1`, and they did not until
step 0's `welcome` stopped saying where the swap ends. The page makes no exception for any step now,
so a mention written into this step without a pair is a Copilot reader being handed a filename they
do not have, with nothing anywhere admitting it. What stays shared is as deliberate: `audit.md` is a
file the team writes rather than either product's, and *skill* is a word both assistants use, so
neither varies.
It carries exactly **one inline icon**, the `gem`
on looking at who has edited the convention files, because that diagnostic is the only thing in the
step a reader would otherwise walk past. And it adds **no third metaphor**: the step is about people,
so it reaches for neither the window nor the money, and a section that starts talking about
"momentum" or "buy-in" is the one to cut.
