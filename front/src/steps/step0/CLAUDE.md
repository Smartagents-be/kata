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

**The step no longer uses the assistant rule itself.** `workshop`'s lead was a
`workshop.lead.1.claude` / `workshop.lead.1.copilot` pair, sending Copilot readers to
`.github/copilot-instructions.md`, a file no workshop in this repository has. It is one shared
`workshop.lead.1` now, naming the `CLAUDE.md` the step projects ship and saying Copilot reads it too.
`welcome` still sets the setting; the first page that exercises it is in step 1.

**`welcome`'s lead points at `install.txt`**, the second paragraph on the first page a student reads,
because a student who opens the course in the browser never sees the README that says the same
thing. It says to ask the agent to execute it and what it does, and nothing more: it no longer points
at the disclosure at the top of the file, by the author's choice, so that disclosure is reached by
opening `install.txt` and not from here. It names no step, no board and nothing the script plants,
and it must not start, because the disclosure and the undo command live in `install.txt` and naming
what it writes ends step 1's first row. The lead is intro, install, prerequisites; the paragraph that
announced the last page's check is gone, and so is that check: `install.txt`'s setup check does it.
Cutting further means merging the prerequisites into the install paragraph, not dropping the pointer.

Step 0's `welcome` is where the student is told to set it, and **the telling is the
`set-your-assistant` task card rather than a paragraph**. `assistant.pick.label` is the whole of it:
open the cogwheel, set the assistant, check the language while you are in there. The paragraph that
used to sit under the card said what the setting buys, that the pages then name the commands that
apply to you, and it is gone, so a student is asked to set the thing and never told why. That is
what the card is carrying now: a task is a thing to do, and the reason turns up on its own the first
time a page names `CLAUDE.md` on one machine and `AGENTS.md` on another.

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
paragraph saying what a board is, and `House rules`, three of them. They were that unit's own rules
until it became clear they are the rules of **every** board in the course, so they are stated once
here and pointed at from there. `step1/workshop`'s `lead.2` carries the link.

The first rule is the one the section exists for: **only the agent hunts**. A student who opens the
source themselves gets the flag and none of the lesson, so the board stops measuring anything. It is
written as a flat instruction rather than as advice, because it is the one house rule that can be
broken without noticing you broke it. **The line justifying it is deliberately gone**: it told the
student the flags are not the prize and the prize is finding out what their agent reaches on its
own, which is the lesson the whole course is, and a rule that argues its own case reads weaker than
one that just says the thing.

**There was a rule on splitting the work, and it is gone.** It sat second and said "find the flags in
this repo" comes back confident and wrong. Rewritten as "1 prompt per flag" it was common sense for
the senior developers this is taught to, and "1 flag, 1 session" already makes a student take the
flags 1 at a time. Do not write it back.

**The last rule claims only what holds.** It once said the agent delivers a wrong flag "just as
confidently" and "cannot tell the difference" between candidates. Current models do hedge, and an
agent reading the raw output can see which line `pick` ticks, so both went. What is left is the part
that is true: a flag worked out in the agent's head is often off by a few characters, so have it run
the code and show the output rather than a summary, and pick when several candidates come back. The
same claim sits in the explanation of step 0's second quiz question, so change both together.

Three things about the section are decisions, and each of them is a thing the step 1 version could
say and this one cannot. **It names no command**, so `/clear` and `/context` stay introduced where
they are used (`step1/session` and `ReadYourWindow` in `step1/tools`), and rule two gives the habit
instead: start each flag on a fresh session. **It carries no numbers and does no arithmetic**, so
`model.cost.4` stays the one paragraph in the course that multiplies. And **it counts nothing**,
since it covers boards of two, three and five flags, which is what the step 1 wording
("three flags, three routes in", "five lines come out of the trace") could not do.

**There was a fifth rule, on pricing the hunt afterwards, and it is gone.** It sent the student to
step 1 for the numbers to put on a hunt they had just finished, which is a forward reference on a
page nobody has the numbers on yet, and it closed by naming the next two pages, which the pager
already does. So cost is now signalled in this section by rule two's coin icon and nothing else,
and the step that has the numbers is where the arithmetic stays. Its slide point went with it, and
the section closes on rule three with no pointer at what follows: do not write either back.

**It sits after the legend rather than after `How exercises work`**, which is the one placement worth
defending. Rule two carries the coin icon, and the legend is where a coin is given a meaning, so
the rules read a paragraph after the icon they use rather than a page before it. The three are a list
written as paragraphs, a bold lead-in plus two or three short sentences each; do not grow any of
them into a section, and do not add a fourth without a board that needs it.

**There was a readiness row between the two, and it is gone.** `mvn verify -Pready` checked the JDK,
the other steps' projects and `native-image`. The first run already fails on an old JDK, since the
pom compiles for 25, and `install.txt` runs the setup check that covers the rest, so the row proved
nothing a student had not already passed. Its hint was also the one place step 0 said "harness". Do
not put it back.

