# CLAUDE.md — step 0

What is deliberate about the intro step, and why. It loads when you work with files under
`front/src/steps/step0/`. The rules that span the whole curriculum are in the parent
`front/src/steps/CLAUDE.md`, the design system and the audience and assistant mechanisms are in
`front/CLAUDE.md`, and the repo-wide prohibitions are in the root `CLAUDE.md`. None of them is
repeated here.

The one thing this step owns for the whole course is where the student is told to pick their
assistant, which is why the `data-assistant` rule's own page belongs to `welcome`.

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

