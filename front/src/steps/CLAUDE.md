# CLAUDE.md — the curriculum

Guidance for `front/src/steps/`, which holds the course content itself: each step's registry,
figures, flags, locales, quiz and unit HTML. It loads when you work with files under this directory.

**What is deliberate about each unit lives in that step's own `CLAUDE.md`**, beside the files it
describes: `step0/CLAUDE.md`, `step1/CLAUDE.md`, `step2/CLAUDE.md`, `step3/CLAUDE.md`. Each of them
loads when you work with files under its step, so touching a unit brings its reasons with it and
nothing else. Nearly everything in those files is a decision with a reason behind it: why a figure is
drawn the way it is, why a paragraph was cut, why two units overlap, and which parts are exercises
that must not be solved. Read the one for the step you are editing, because a great deal of what
looks like an oversight is load bearing. This file carries only what spans the steps.

The repo-wide rules are in the root `CLAUDE.md`, including the per-step prohibitions that protect the
student exercises. The design system, the `id`/`data-component` convention, the audience rule and the
i18n mechanism are in `front/CLAUDE.md`. Neither is repeated here.

## What the four steps are

`step0` is the intro: the `welcome` unit and the one exercise behind it. `step1` is **context, model,
mechanisms**: the layers an agent's context is assembled from and the machinery around the window
they share. `step2` is **agentic engineering**: how you work with an agent, as opposed to what it
knows. `step3` is **soft skills**: the part of working this way that is not about the agent, and the
one step with no Java behind it and nothing for a machine to grade. Unit lists, order, titles and the
reasoning behind all three are in each step's own file.

## Assistant variants across the steps

**Step 2 is the one step not written for two assistants**, and every other step is, on the
`data-assistant` rule in `front/CLAUDE.md`. Steps 0 and 1 carry almost all of it; `step3`'s share is
two filename pairs and is documented under that step. The Copilot side assumes **Copilot CLI**, the
terminal one, because every exercise in step 1 already runs commands in a terminal against a Maven
backend.
The product detail behind those blocks, what the course leaves out on purpose, and which facts are
dated are in **`copilot-specific.md` at the repo root**. Read it before writing a Copilot claim:
Copilot's billing changed under this course once already.

Where the student is told to set it is step 0's, which also varies one block of its own, and which
eleven blocks vary is step 1's; both are
written up in those steps' files.
