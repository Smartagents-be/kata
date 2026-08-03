# CLAUDE.md — step 0

What is deliberate about the intro step, and why. It loads when you work with files under
`front/src/steps/step0/`. The rules that span the whole curriculum are in the parent
`front/src/steps/CLAUDE.md`, the design system and the audience and assistant mechanisms are in
`front/CLAUDE.md`, and the repo-wide prohibitions are in the root `CLAUDE.md`. None of them is
repeated here.

The one thing this step owns for the whole course is where the student is told to pick their
assistant, which is why the `data-assistant` rule's own page belongs to `welcome`. It owns a second
thing now, the house rules every board in the course is played under, and they are written up at the
foot of this file.

Step 0's `welcome` is where the student is told to set it, in the paragraph after the one pointing
at the cogwheel; that is the only place the setting is explained. The paragraph above it **no longer
lists what is in the panel**, and that is the decision: it named four rows while the panel rendered
five, so the list went and the student is told to open it and look instead. A panel that gains a row
now costs nothing on the page, and putting the list back means keeping it in step with
`SettingsMenu`. **One row is still named, by what it costs rather than by its label**: reset clears
the captured flags and the finished pages, so a student who meets it unwarned loses work, and the
closing sentence of that paragraph is the only place in the course it appears. Slides and the mode
switch are deliberately left to the panel, since the three ways of reading are taught three
paragraphs above and the deck belongs to the tutor. **The lower paragraph no longer states the
scope of the swap, and its last two sentences are cut rather than reworded.** They said step 2 is
the exception and names Claude Code's files throughout, so on Copilot read those as the example, and
then that what the pages teach does not change because none of it is about one product. What went
with them is the only warning on any page that a Copilot student will meet `setup` and find a whole
unit about a file they do not have. **That gap is now carried by `audit.md` alone**, so the page
promises a swap it keeps everywhere but one step and says nothing about the one. A caveat written
back into it is the wrong repair: **the repair is giving step 2 variants**, at which point there is
nothing to caveat. Until then, do not restore a scope line as a substitute for the work.

**The paragraph is two sentences and names no file or command**, which went in the same pass: it
said the pages name yours, `copilot mcp add` instead of `claude mcp add` and
`.github/copilot-instructions.md` instead of `CLAUDE.md`. What it says now is what the setting does
rather than what it looks like, and the reasoning is that a student who has not met either file
learns nothing from a pair of them here, while a student who has meets them in the unit that needs
them. So the examples belong to `tools` and `session`, where they are the instruction rather than an
illustration of a setting.

## The house rules

`welcome` closes on two sections that arrived from step 1's `workshop`: `How workshops work`, one
paragraph saying what a board is, and `House rules`, five of them. They were that unit's own rules
until it became clear they are the rules of **every** board in the course, so they are stated once
here and pointed at from there. `step1/workshop`'s `lead.2` carries the link.

The first rule is the one the section exists for: **only the agent hunts**. A student who opens the
source themselves gets the flag and none of the lesson, so the board stops measuring anything. It is
written as an instruction and then the reason, rather than as advice, because it is the one house
rule that can be broken without noticing you broke it.

Three things about the section are decisions, and each of them is a thing the step 1 version could
say and this one cannot. **It names no command**, so `/clear` and `/context` stay introduced where
they are used (`step1/session` and `ReadYourWindow` in `step1/tools`), and rules three and five give
the habit instead: start each flag on a fresh session, and look at what the hunt cost. **It carries
no numbers and does no arithmetic**, so `model.cost.4` stays the one paragraph in the course that
multiplies; rule five says step 1 hands you the numbers and stops there. And **it counts nothing**,
since it covers boards with three flags, five flags and one, which is what the step 1 wording
("three flags, three routes in", "five lines come out of the trace") could not do.

**It sits after the legend rather than after `How exercises work`**, which is the one placement worth
defending. Rule three carries the coin icon, and the legend is where a coin is given a meaning, so
the rules read a paragraph after the icon they use rather than a page before it. The five are a list
written as paragraphs, a bold lead-in plus two or three short sentences each; do not grow any of
them into a section, and do not add a sixth without a board that needs it.

