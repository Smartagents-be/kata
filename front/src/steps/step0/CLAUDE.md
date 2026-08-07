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

**The step's one use of the assistant rule itself is `workshop`'s lead**, and it is a
`workshop.lead.1.claude` / `workshop.lead.1.copilot` pair because the line names the instructions
file: `CLAUDE.md` on one machine, `.github/copilot-instructions.md` on the other. `welcome` sets the
setting and never exercises it, which is the right order, and this is the first page after it where
a shared sentence would be untrue for half the room. Both halves are whole sentences rather than a
variant fragment inside one paragraph, because the filter removes elements and does not splice them,
and the `README.md` they both name is the same file either way.

**`welcome`'s lead points at `install.txt`**, the second paragraph on the first page a student reads,
because a student who opens the course in the browser never sees the README that says the same
thing. It says to ask the agent to execute it, what it does, and that the file states its own changes
at the top; it names no step, no board and nothing the script plants, and it must not start, because
the disclosure and the undo command live in `install.txt` and naming what it writes ends step 1's
first row. The lead runs long now: intro, install, prerequisites, then the last page's own check.
Cutting it means merging the prerequisites into the install paragraph, not dropping the pointer.

Step 0's `welcome` is where the student is told to set it, and **the telling is the
`set-your-assistant` task card rather than a paragraph**. `assistant.pick.label` is the whole of it:
open the cogwheel, set the assistant, check the language while you are in there. The paragraph that
used to sit under the card said what the setting buys, that the pages then name the commands that
apply to you, and it is gone, so a student is asked to set the thing and never told why. That is
what the card is carrying now: a task is a thing to do, and the reason turns up on its own the first
time a page names `CLAUDE.md` on one machine and `.github/copilot-instructions.md` on another.

The paragraph above the card **no longer lists what is in the panel, and no longer names a row at
all**: it named four rows while the panel rendered five, so the list went, and the reset row
followed it out. What is left points at the menu and tells the student to open it and look. A panel
that gains a row now costs nothing on the page, and putting either back means keeping it in step
with `SettingsMenu`. **So nothing on any page warns that reset throws progress away**, and the
confirm dialog is the whole of the warning; it is built to carry that weight, and `front/CLAUDE.md`
has the reasoning. Slides and the mode switch were already left to the panel, since the three ways
of reading are taught three paragraphs above and the deck belongs to the tutor.

**The card sits directly under that paragraph.** The prose says to open the menu, and the card is
what opening it is for. It spent a while a paragraph lower, under the sentence that has since gone.

Two things went out of that lower paragraph before the paragraph itself did, and both are still the
decision if anybody rebuilds it. **It stated the scope of the swap, and that was cut rather than
reworded**: it said step 2 is the exception and names Claude Code's files throughout, so on Copilot
read those as the example, and then that what the pages teach does not change because none of it is
about one product. What went with it is the only warning on any page that a Copilot student will
meet `setup` and find a whole unit about a file they do not have. **That gap is carried by
`audit.md` alone**, so the course promises a swap it keeps everywhere but one step and says nothing
about the one. A caveat written back in is the wrong repair: **the repair is giving step 2
variants**, at which point there is nothing to caveat. Until then, do not write a scope line as a
substitute for the work. **And it named no file or command**, having once named `copilot mcp add`
against `claude mcp add` and `.github/copilot-instructions.md` against `CLAUDE.md`: a student who
has not met either file learns nothing from a pair of them here, and a student who has meets them in
the unit that needs them. So the examples belong to `tools` and `session`, where they are the
instruction rather than an illustration of a setting.

## The house rules

`welcome` closes on two sections that arrived from step 1's `workshop`: `How workshops work`, one
paragraph saying what a board is, and `House rules`, four of them. They were that unit's own rules
until it became clear they are the rules of **every** board in the course, so they are stated once
here and pointed at from there. `step1/workshop`'s `lead.2` carries the link.

The first rule is the one the section exists for: **only the agent hunts**. A student who opens the
source themselves gets the flag and none of the lesson, so the board stops measuring anything. It is
written as a flat instruction rather than as advice, because it is the one house rule that can be
broken without noticing you broke it. **The line justifying it is deliberately gone**: it told the
student the flags are not the prize and the prize is finding out what their agent reaches on its
own, which is the lesson the whole course is, and a rule that argues its own case reads weaker than
one that just says the thing. Rule two lost its closing instruction in the same pass, for the same
reason: it now names the failure ("find the flags in this repo" comes back confident and wrong) and
leaves the fix to the student.

Three things about the section are decisions, and each of them is a thing the step 1 version could
say and this one cannot. **It names no command**, so `/clear` and `/context` stay introduced where
they are used (`step1/session` and `ReadYourWindow` in `step1/tools`), and rule three gives the habit
instead: start each flag on a fresh session. **It carries no numbers and does no arithmetic**, so
`model.cost.4` stays the one paragraph in the course that multiplies. And **it counts nothing**,
since it covers boards of one, three and five flags, which is what the step 1 wording
("three flags, three routes in", "five lines come out of the trace") could not do.

**There was a fifth rule, on pricing the hunt afterwards, and it is gone.** It sent the student to
step 1 for the numbers to put on a hunt they had just finished, which is a forward reference on a
page nobody has the numbers on yet, and it closed by naming the next two pages, which the pager
already does. So cost is now signalled in this section by rule three's coin icon and nothing else,
and the step that has the numbers is where the arithmetic stays. Its slide point went with it, and
the section closes on rule four with no pointer at what follows: do not write either back.

**It sits after the legend rather than after `How exercises work`**, which is the one placement worth
defending. Rule three carries the coin icon, and the legend is where a coin is given a meaning, so
the rules read a paragraph after the icon they use rather than a page before it. The four are a list
written as paragraphs, a bold lead-in plus two or three short sentences each; do not grow any of
them into a section, and do not add a fifth without a board that needs it.

**One line on `workshop`'s board argues with rule three, and it is meant to.** `flag.ready.hint`
closes by telling a student who kept row one's session that their harness often offers this run
before they ask, while rule three says start each flag on a fresh one. Both are true: the rule is
what the course asks for, and the line is what a student who did not follow it is looking at. Do not
resolve it by cutting either. It is the only place in step 0 that says the word harness, it is on the
row's one-line hint rather than in its Hint dialog (the dialog is for a student who is stuck, not one
who is ahead), and the whole of it is that sentence. There is no section in the unit behind it: a
`The next move` section was written and taken back out, so do not add one.

