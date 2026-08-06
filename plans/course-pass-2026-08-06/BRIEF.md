# Shared brief: the course quality pass

Repo root: `/Users/bassarrechia/code/kata-agentic-java`. All paths below are relative to it.

## What the user asked for

Revise, review, update and upgrade the course so that it (a) does not read as AI-generated,
(b) is truthful, (c) is easy to read, (d) guides the reader in a progressive manner,
(e) is factual and well organised, (f) carries imagery where imagery earns its place,
(g) carries supporting tasks where applicable, (h) closes every module with a workshop the
reader can test their skills at, and (i) has accompanying slides rich in content.

Three decisions the user has already made, and they are not open for reinterpretation:

1. **Workshops: only where it can be honestly graded.** Strengthen step 1's and step 2's
   workshops. Add one to step 0. Give step 3 a structured closing exercise that is explicitly
   not graded rather than a fake board.
2. **Dutch stays in lockstep.** Every English prose change gets its Dutch counterpart written in
   the same pass. No drift is acceptable.
3. **Rewrite and restructure is licensed** — reordering units, splitting or merging them, and
   sentence-level rewriting are all on the table where the sequence genuinely does not build.

## The single most important warning

**This course is already good, and its prose is deliberate down to the sentence.** Each step's
`front/src/steps/stepN/CLAUDE.md` records why paragraphs are shaped the way they are, why two
units overlap, why a section stops where it stops, and which sentences must not be cut. A great
deal of what looks like an oversight is load bearing.

So: **licence to rewrite is not an obligation to rewrite.** The failure mode that would ruin this
pass is flattening a distinctive human voice into competent generic course prose. A change must be
justified by a defect you can name — an inaccuracy, a genuine AI tell, a broken progression, a
sentence a reader stumbles on — not by "I could phrase this differently".

**Before touching any file under a step, read that step's `CLAUDE.md`.** Treat every constraint
recorded there as an invariant. If your change would violate one, either don't make it, or state
plainly in your report that the constraint should be revisited and why.

## Documents to read (agents: read the ones relevant to your task)

- `CLAUDE.md` (root) — repo rules, layout, the prohibitions that protect student exercises
- `front/CLAUDE.md` — design system, `id`/`data-component` convention, the audience rule, the
  assistant rule, i18n, and the deck rules
- `front/src/steps/CLAUDE.md` — what spans the steps
- `front/src/steps/stepN/CLAUDE.md` — the per-unit reasoning for that step. Mandatory.
- `.claude/skills/lesson-writing/SKILL.md` — how lesson prose must read
- `.claude/skills/quiz-writing/SKILL.md` — quiz data shape and what makes a question worth asking
- `audit.md` — the standing critique, measured against a commit. Table 1 lists only what is left
  to handle. Use it as prior art: an item already recorded there is a known gap, not a discovery.
- `copilot-specific.md` — the reference behind every Copilot claim. Read before writing one.

## Hard prohibitions (breaking one of these ruins a student exercise)

- **step 0** — do not decode or reveal the intro flag.
- **step 1** — do not decode, implement or reveal any of the three flags. Do not add tracing to
  the catalogue pipeline. Do not solve `kata/step1/java/problem.md`: no cut of it, no `solve.md`,
  no `plan-solve.md`, no shelves package. A fourth flag lives in `kata/step1/front/` under the
  same prohibition.
- **step 2** — do not harden the loans module, do not implement `MemberStatements.forTier`, do
  not add a `native` profile or write the resource hint. The project carries three plaintext
  setup flags (one in its `.claude` skill, one in its `CLAUDE.md`, one in the `domain` package's
  `CLAUDE.md`): do not gather them anywhere and do not name those three files in the `setup`
  unit's prose or in a board hint.
- `front/src/shared/deck/deck-stage.js` is vendored verbatim and must not be edited.
- A step's `flags.ts` holds salted hashes only, never plaintext.

## Writing rules that are absolute

- **No em-dashes anywhere in student-facing prose.** None. Not in English, not in Dutch, not in
  slide text, not in quiz text. Use a comma, a colon, or two sentences.
- No colour outside `front/src/index.css`. Components name tokens.
- Every rendered element carries an `id` (BEM, kebab-case) and a `data-component` attribute.
- Grading messages and the words a student types as an answer stay English in every language.
- Prose keys read `<unit>.<section>.<n>`, where the section is slugified from the `<h2>` above
  the block and `lead` means before the first `<h2>`. The heading itself is `<unit>.<section>.heading`.
  **A key is a location, not a summary**: moving a paragraph into another section means renaming
  its key.
- The English HTML *is* the English. There is no `en` entry for unit prose. `en.json` carries
  figure labels, task cards, quiz text, deck text and unit titles.
- `nl.json` carries a Dutch entry for every prose key in the HTML, plus Dutch for everything in
  `en.json`.
- Assistant variants: both siblings carry `data-assistant` and a `data-i18n` key whose last
  segment is `claude` or `copilot`. There is no "bare means Claude".
- Never put `data-audience` and `data-assistant` on the same element.
- A `data-figure` marker is always a direct child of the body and is never wrapped.

## What counts as an AI tell (the critic's list)

Reject prose that shows any of these, and be harsh about it:

- Tricolons everywhere: "it is faster, cheaper and more reliable". One list is fine; a rhythm of
  them is a machine.
- "It's not just X, it's Y" and its family: "more than just", "isn't merely".
- Openers that announce: "In this section, we will explore", "Let's dive into", "Now that we
  understand".
- Empty intensifiers: "crucial", "essential", "powerful", "seamless", "robust", "leverage",
  "utilize", "delve".
- Summary paragraphs that restate what was just said without adding a claim.
- Symmetry that no human writes: every section the same length, every paragraph three sentences.
- Hedging stacked on hedging: "it can often be somewhat useful to consider".
- Bulleted lists where prose would carry the argument better, especially lists of three where
  each item is one adjective.
- A closing sentence that gestures at significance instead of ending: "and that changes
  everything".
- Analogies that are decorative rather than load bearing.
- Perfectly balanced "on the one hand / on the other" where the writer clearly has a view.

The house voice, by contrast, is: short declaratives, a willingness to state a view, concrete
nouns (a filename, a number, a command), the occasional sentence fragment for emphasis, and
paragraphs of uneven length because the argument is uneven.

## Truthfulness

Every factual claim must be checkable. In particular:

- Claims about Claude Code features, pricing, model names, context window sizes, and Copilot
  features are the ones most likely to be stale or wrong. Check `copilot-specific.md` for the
  Copilot side. Flag anything you cannot verify rather than smoothing over it.
- Claims about what is in this repository (a filename, a profile, a command, a count) must match
  the repository. Check them by reading the files.
- A number in the prose ("nine titles", "three flags", "four workflows") must match reality.

## Where the work lands

- Unit prose: `front/src/steps/stepN/units/<unit>.html` (English)
- Dutch prose + all Dutch labels: `front/src/steps/stepN/locales/nl.json`
- English labels, quiz text, deck text: `front/src/steps/stepN/locales/en.json`
- Figures: `front/src/steps/stepN/<Component>.tsx`, wired at a `<div data-figure="…">` marker
- Quizzes: `front/src/steps/stepN/quiz.ts`, attached in `index.tsx`
- Registry (units, order, titles, figures, tasks, quizzes): `front/src/steps/stepN/index.tsx`
- Slides: `front/src/steps/stepN/deck.tsx` + `deck.*` keys in both locale files

## The locale patch protocol (implementation agents: this is not optional)

Twenty-five unit agents work in parallel, and a step's `en.json` and `nl.json` are shared by every
unit in that step. Two agents editing one file at once loses work silently. So:

**Never open `en.json` or `nl.json` with Edit or Write.** Read them freely. To change them, write
a patch file at

    <SCRATCH>/patches/<step>/<unit>.json

with this shape, using the flat dotted keys the locale files actually use:

```json
{
  "en":       { "some.figure.label": "Total spend" },
  "nl":       { "tokens.lead.1": "De Dutch text.", "some.figure.label": "Totale uitgave" },
  "removeEn": ["dead.key"],
  "removeNl": ["dead.key"],
  "afterNl":  { "tokens.lead.3": "tokens.lead.2" }
}
```

- `en` / `nl` add a key if it is new, replace it if it exists.
- `removeEn` / `removeNl` delete a key. Deleting is how you retire a paragraph you cut.
- `afterEn` / `afterNl` are optional. By default a new key lands directly after the existing key
  it shares the longest dotted prefix with, which is almost always right. Use the override only
  when it is not.
- **Every key you add to `en` needs the same key in `nl`.** The merger prints a parity report and
  a missing Dutch entry is a defect, not a warning.
- These files are hand-maintained: one key per line, blank lines grouping related keys. The
  merger preserves that. Do not reformat them by any other means, and never run prettier.

A per-step merge agent runs `python3 <SCRATCH>/merge_locales.py <step>` afterwards. It refuses to
write if two units claimed the same key, so keep to your own unit's keys.

**Files you own outright** (edit these directly, no patch needed): your unit's
`units/<unit>.html`, and any NEW figure component `.tsx` you create. Files you must NOT edit
because a later integrator owns them: `index.tsx`, `quiz.ts`, `deck.tsx`. Write what you want
done to those into your manifest at `<SCRATCH>/manifests/<step>/<unit>.json`.

## Verification commands

```
cd front && npm run build     # tsc -b + vite build. This is the type check.
cd front && npm run lint      # oxlint
cd kata/stepN/java && mvn -q verify
```

`npm run build` must pass at the end of every phase. Never run prettier: style here is
hand-maintained and prettier rewrites the file.
