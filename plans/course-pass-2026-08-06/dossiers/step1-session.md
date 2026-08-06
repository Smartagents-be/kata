# step1 / session — audit dossier

Files read: `front/src/steps/step1/CLAUDE.md` (whole), `units/session.html`, `index.tsx`,
`SessionMakeup.tsx`, `SurviveTheClear.tsx`, `locales/en.json` + `nl.json` (session/survive/deck keys),
`shared/lib/content.ts`, `units/context.html`, `units/harness.html`, `units/tokens.html`,
`units/recap.html`, `ReadYourWindow.tsx`, `deck.tsx`, `audit.md` (rows 7 and 30),
`.claude/skills/lesson-writing/SKILL.md`, and `kata/step1/java` for the class names the figure cites.

Prior art, not my discovery: **audit.md item 30** already records that this unit opens on a subjectless
fragment with no bridge, and that it carries no pointer to `harness`. Finding P2 below closes half of
that row as a side effect; I am not claiming the row.

---

## 1. AI tells

**None.** I looked hard and found nothing worth quoting. The prose is short declaratives with
deliberate fragments ("A file it opened, a test run it executed, a stack trace you pasted."),
uneven paragraph lengths, no tricolon rhythm, no announcing openers, no "crucial"/"powerful"/
"leverage", and every section closes on its sharpest line ("That is the whole lever." / "Only one
lets you say what stays." / "The evidence left the room."-shaped endings). `wrote-almost-none.3` in
particular is exactly the move the `lesson-writing` skill calls "negate the wrong model, then state
the right one". This is human writing and I would defend it in a review.

One sentence I stumbled on is filed under Readability rather than here, because the defect is
word order, not machine cadence.

---

## 2. Truthfulness

### 1. `session.wrote-almost-none.1` says the agent reads four files; the figure two paragraphs below shows two

- **Where** `session.wrote-almost-none.1` (`units/session.html:29-33`), against
  `SessionMakeup.tsx:32-41`
- **Problem** The paragraph is not generic: it borrows the figure's own numbers ("Your sentence is
  fourteen tokens" is `block.1`'s `tokens: 14` verbatim). So a reader takes it as a description of
  the drawing below, then counts two file-read blocks in it (`reads Catalog.java`,
  `reads CatalogRun.java`), not four. It also says the agent "pastes the failure back" where
  `block.7` says `runs mvn test, pastes the output`, and "The answer to it is five thousand" is
  really the whole session total (4,913), which includes the student's second question and the
  answer to *that*. This repo holds a high bar on exactly this: `BudgetWindow`'s line counts were
  measured off `kata/step1/java` "because the task is framed against this repository and a student
  who checks will check them". The same student checks here and finds the figure and the prose
  disagreeing. `SessionMakeup.tsx`'s own doc comment is on the prose's side ("two questions, four
  files read, one test run"), so the data was reduced at some point and neither the comment nor the
  paragraph followed.
- **Fix** Make the prose match the data, which is the artifact on screen. Replace with:

  > Count what is in there and your own words barely register. You type a sentence, and the agent
  > opens two files, runs the test suite and pastes the output back. Your sentence is fourteen
  > tokens. Everything around it is five thousand.

  Dutch (`session.wrote-almost-none.1`):

  > Tel eens na wat er in zit en je eigen woorden vallen weg. Jij typt één zin, en de agent opent
  > twee bestanden, draait de testsuite en plakt de output terug. Jouw zin is veertien tokens. Alles
  > eromheen is er vijfduizend.

  And fix `SessionMakeup.tsx`'s doc comment to "two questions, two files read, one test run" in the
  same change.

### Verified clean

- `Catalog` (`sessions-where-money.2`) exists at
  `kata/step1/java/src/main/java/be/smartagents/kata/java/step1/services/Catalog.java`, as do
  `Catalog.java` and `CatalogRun.java` named in the figure. Honest.
- `session-makeup.share` arithmetic: typed 14 + 9 = 23, total 4,913, 0.5%. The deck's
  `deck.session.divider.2` "You typed half a percent of it" agrees.
- `session-makeup.block.1` "Why does /api/titles return nine titles?" matches the nine-title
  catalogue.
- `CLAUDE.md` / `.github/copilot-instructions.md` in `window-not-memory.1.*` are the right two
  filenames, both siblings carry `data-assistant` and a key ending in the same word, and neither
  carries `data-audience`. Correct against the assistant rule.
- No em-dashes or en-dashes in the HTML or in any `session.*` / `survive.*` Dutch entry.

---

## 3. Progression

### P1. Two of this unit's paragraphs render for nobody, and one of them is the section's topic sentence

- **Where** `session.lead.4` (`units/session.html:21-25`) and `session.sessions-where-money.1`
  (`units/session.html:54-58`), both `data-audience="guided"`
- **Problem** This is the same bug the step's own `CLAUDE.md` records as the reason
  `workshop.the-board.1` was **deleted**: "It was a `data-audience="guided"` paragraph, and guided
  mode drops every run of prose whatever its attribute says, so it rendered for nobody." Verified in
  `shared/lib/content.ts`: in self mode the audience pass at line 128 removes them; in guided mode
  the cut at line 185 drops every top-level non-figure node, kept headings excepted. So both
  paragraphs are dead in all four reader combinations.

  The reasoning written down for keeping them ("in class that unit is walked through at the board,
  so `session` is where a guided student first meets the re-send and the bridge has to be there") is
  therefore false, and so is the HTML comment at lines 19-20. Three things follow, and they are the
  actual damage:

  1. The section **"Sessions are where the money goes" never makes that claim to any reader.** With
     `.1` invisible the section opens on `.2` "A long session cuts both ways", which has no first
     way to cut against, and then argues only that a session is cheap to extend and expensive to
     rebuild. The heading promises a claim the visible prose does not make. That is a heading/section
     mismatch, and the `lesson-writing` skill's check 8 catches it from the other direction.
  2. `recap.what-costs-do.5` credits this unit with the claim: "You typed almost none of the
     **session**, and all of it goes out again on every turn." The second half is argued nowhere on
     the page it links to.
  3. `lead.3` ends on "The session is where everything settles" and the next thing a reader sees is
     the `wrote-almost-none` heading. The re-send bridge is simply absent.

- **Fix** Two edits, and they go in opposite directions.

  **Delete `session.lead.4` outright**, EN and NL. It restates `context.model-stateless.1` ("What
  feels like a conversation is the entire transcript being sent again, from the top, every single
  time") almost word for word, and the self-learner has just read it. Same call, same reasoning as
  `workshop.the-board.1`.

  **Un-tag `session.sessions-where-money.1`** and rewrite it as the house's pointer-plus-new-half
  move (the shape `harness.coordinator.3`, `model`'s reasoning-level opener and `truth.lead.2` all
  use), so it is the section's topic sentence without being a second telling of `context`:

  > The <a href="/steps/step1/context">context</a> unit priced this already: the whole session goes
  > back every turn, so its size is your price per message. Read three large files early and you keep
  > paying for them on every question you ask afterwards, whether or not they still matter.

  Dutch:

  > De unit over <a href="/steps/step1/context">context</a> heeft dit al doorgerekend: de hele sessie
  > gaat elke beurt opnieuw mee, dus haar omvang is je prijs per bericht. Lees vroeg drie grote
  > bestanden in en je blijft ervoor betalen bij elke vraag die daarna nog komt, of ze nu nog ter
  > zake doen of niet.

  Then delete the HTML comment at lines 19-20 and rewrite the `session` paragraph of
  `front/src/steps/step1/CLAUDE.md` that records the guided-bridge reasoning, since it is the thing
  that will put these paragraphs back.

### P2. The prefix cache is taught here, a unit before the unit that owns it, with no pointer

- **Where** `session.sessions-where-money.2` (`units/session.html:60-65`)
- **Problem** "Harnesses cache the front of the pile, so what has not changed since the last turn is
  billed at a fraction." That is `harness.caching.1`'s mechanism, stated flat, in the unit *before*
  `harness`. The step's own convention is explicit about this case: `tokens.reads-all.4` makes the
  same claim and closes "The `harness` unit prices it", and the step `CLAUDE.md` writes the rule as
  "the prefix cache goes to `harness` ... in one paragraph naming the unit that owns it". `session`
  is the one telling that does not name it, so the reader meets the mechanism twice before its owner
  arrives and is pointed at it once. It is also, per audit item 30, the unit with no pointer to
  `harness` at all.
- **Fix** One sentence, in the shape `tokens` already uses:

  > A long session cuts both ways. Once <code>Catalog</code> is in the window, a second and a third
  > question about it cost almost nothing extra. Harnesses cache the front of the pile, so what has
  > not changed since the last turn is billed at a fraction. The <code>harness</code> unit prices
  > that. Adding to a session is cheap. Rebuilding one is not.

  Dutch: insert "De unit over het <code>harness</code> rekent dat door." at the same position.

### P3. The figure plants the workshop's second flag and nothing records the seam

- **Where** `session-makeup.block.1` and `block.6` in `SessionMakeup.tsx:33,38`
- **Problem** The figure's two student turns are "Why does /api/titles return nine titles?" and "And
  what happens to the tenth?" That is precisely the trace the `workshop` board's second flag asks
  for (the hidden tenth entry the pipeline computes and drops), asked five units early by a figure
  whose stated argument is share. It is a good plant, not a defect in itself, but it is an undeclared
  cross-unit dependency in a repo whose norm is that such seams get written down ("rewording either
  side means visiting the other"). If the backend's count ever moves, or the flag's mechanism does,
  nothing points a maintainer at this figure.
- **Fix** No prose change. Add one sentence to the `session` paragraph of
  `front/src/steps/step1/CLAUDE.md`: the figure's two questions are the workshop's second flag asked
  early, so a change to the catalogue's count or to the tenth entry visits `SessionMakeup`'s block
  labels in both languages.

### Not a defect, checked and cleared

`wrote-almost-none.3` claims the session is "the only layer you can do anything about afterwards". I
tested that against `ReadYourWindow`'s fourth move, which removes an MCP server. That move says
"Remove the server you connected in the tools unit, **start over**, and check the first number
moved", so changing the tools layer costs you the session, which is the claim rather than a
contradiction of it. Leave it alone.

---

## 4. Readability

### R1. `sessions-where-money.3` trails its connector; the Dutch puts it where it belongs

- **Where** `session.sessions-where-money.3` (`units/session.html:67-71`)
- **Problem** "Ask everything you want to know about a piece of code while it is in front of you,
  then." The connector arrives after twenty words, so the reader parses the clause as an instruction,
  hits "then", and has to re-read to find what it follows from. The Dutch does not have this problem:
  `session.sessions-where-money.3` opens "Vraag **dus** alles wat je wil weten...", connector in
  second position where Dutch puts it. This is the repo's documented pattern of Dutch structure
  surviving into the English, and per repo policy the Dutch is the truer version here.
- **Fix**

  > So ask everything you want to know about a piece of code while it is in front of you. But not
  > forever: the same session that makes your second question cheap makes your fiftieth expensive and
  > vague.

---

## 5. Imagery

### I1. `SessionMakeup` passes the bar

It measures a share that prose can only assert, prints the arithmetic (23 of 4,913, 0.5%), reads
against the widest block so the two teal slivers are still a shape, and carries a legend that is the
only thing saying which bars are the student's. It says nothing about growth or re-sending, which is
`BundleCompare`'s job in `prompt`. Keep it exactly as it is, apart from the data/prose mismatch in
Truthfulness 1.

### I2. The one genuine gap: nothing draws where the seam falls

- **Where** `session.compaction-picks-moment.1` and `.2` (`units/session.html:73-85`), currently the
  only undrawn section in the unit and a `statement` slide on the deck (`deck-session-clear`)
- **Problem** The section's whole argument is a claim about **position**, and it is asserted twice
  with nothing to check it against. `.1` closes "it fires exactly when the work got long and
  complicated, so it lands in the middle of the hardest thing you did all day"; `.2` answers "You
  choose the seam". A reader has to take both on trust. Where a cut falls relative to the work is
  geometry, and no other figure in the step draws it: `ContextFalloff` in `context` draws the oldest
  turns spilling off the top of a full frame (amnesia, not a summary), `BundleCompare` draws growth
  and re-sending, `SessionMakeup` draws share, `SessionWindows` in `model` draws billing clocks.
- **Fix** One figure, `WhereTheSeamFalls`, between `.1` and `.2`. Two rows of equal length, one
  session each, in the step's existing vocabulary (teal frame is a context, a bar is something in it,
  dashes are what is not).
  - **Row 1, compaction.** The frame fills left to right with turn bars, grouped into three shaded
    task spans labelled with real work from this repo: `read the pipeline`, `chase the null`,
    `write the test`. A vertical rule marks where the frame filled, and it lands **inside** the
    middle span. Everything left of it is replaced by a single dashed bar one turn wide, labelled
    `summary`.
  - **Row 2, a clear.** Same three spans at the same widths, same total. The vertical rule sits on
    the boundary **between** spans two and three, and what crosses it is one solid teal bar labelled
    `one sentence about where you are` plus a muted `code on disk` chip, which is what
    `window-not-memory.2` names as what survives.
  - **What the reader takes** Both rows lose about the same amount. Only the cut point differs, and
    the cut point is what decides whether a task survives whole. That is the pair of claims the two
    paragraphs make, measured against each other.
  - **Constraint to respect** Borrow `ContextFalloff`'s frame geometry rather than inventing one, and
    do not draw a coin, a price or a re-send anywhere in it: cost is `harness.caching`'s and
    `BundleCompare`'s. If it lands, `deck-session-clear` should turn from `statement` into `figure`,
    which is how the step handles a claim once a drawing exists for it.

  I would rate this the second-most-valuable change in the unit, behind P1, and I would not add any
  other figure here.

---

## 6. Supporting tasks

`SurviveTheClear` is the right task, the right shape, and correctly scoped. Four moves, one tick to
`kata.step1.survive`, worked in the student's own project, the third move (the clear) is what makes
it an exercise rather than a note, and it names no example instruction so the line has to be one they
were actually tired of repeating. Only the second move splits by assistant, which is the only move
naming a file. Nothing to add and nothing to change.

One adjacent defect, filed here because it is about the marker system that flags a doable move:

### T1. The step's cost-saver marker skips the one unit whose heading names money

- **Where** `units/session.html` (zero `data-icon="coin"` markers) against
  `session.sessions-where-money.3` and `recap.what-costs-do.5`
- **Problem** `session` is the only unit in step 1 with a section titled "Sessions are where the
  money goes" and the only layer unit carrying no coin at all: `prompt` has 4, `model` 4, `harness` 3,
  `tools` 2, `tokens` 2, `context` 1, `session` 0. Step 0's legend defines the coin as "A
  cost-saving measure: the same result for fewer tokens", and
  `sessions-where-money.3` ("Ask everything you want to know about a piece of code while it is in
  front of you") is exactly that, of the same shape as `context.model-stateless.2`'s coined "clear
  the session often enough". The consequence propagates: `recap.what-costs-do.5` is the only bullet
  in the recap list with no icon at all, and the step `CLAUDE.md` explains that away as "that unit
  marks none" rather than as a decision anyone made.
- **Fix** One marker, at the position the convention asks for (icon where the full stop would go,
  next sentence straight after):

  > So ask everything you want to know about a piece of code while it is in front of you
  > <svg data-icon="coin"></svg> But not forever: the same session that makes your second question
  > cheap makes your fiftieth expensive and vague.

  Then add the same coin to `recap.what-costs-do.5`'s move half, in both languages, since the recap
  lifts icons rather than choosing them. Note that this is a change the step `CLAUDE.md` currently
  forbids ("Do not invent one to even the list up") and the constraint should be revisited: the
  justification here is not evening the list up, it is that the unit's one actionable cost-saver is
  unmarked while eight comparable ones across the step are marked.

---

## 7. Quiz

**This unit does not need one, and should not get one.** Two reasons, both from constraints already
in the tree rather than from taste.

`contextQuiz` sits one unit earlier and its `forgets-this-morning` question already grades the exact
misconception this unit's `compaction` and `window-not-memory` sections turn on, namely that the
agent has a memory of its own. A question here would be the same misconception graded twice, five
minutes apart. And the step `CLAUDE.md` records that `context` "is **the one unit in the step**
carrying a task and a registry quiz", with `showsExerciseHeading` in `content.ts` written for that
single case; making `session` a second one is a real structural change for a question that duplicates
an existing one.

If a quiz were ever wanted here, the only question I think earns its place is about compaction being
lossy rather than free, with distractors people genuinely believe: "the harness keeps the full
transcript and only sends a summary to save money" (billing confusion, true-sounding), "the summary
is written by the same model at the same tier so nothing is lost" (the fidelity misconception), "the
oldest turns are deleted and the newest kept intact" (this is `ContextFalloff`, a different
mechanism). But I would not add it: the cost outweighs it.

---

## 8. EN/NL parity

Key coverage is **complete**. Every `data-i18n` key in `session.html` has a Dutch entry
(lead.1-4, wrote-almost-none.heading/1/2/3, sessions-where-money.heading/1/2/3,
compaction-picks-moment.heading/1/2, window-not-memory.heading/1.claude/1.copilot/2/3/4), and
`nl.json` carries no orphan `session.*` key pointing at a deleted block. `en.json` correctly carries
no prose entries, only `session.title`, `session-makeup.*`, `session-windows.*` and `survive.*`, all
of which have Dutch. `survive.*` is fully translated including both assistant halves.

Three drift findings, and in all three the English is the version to keep.

### N1. The Dutch still calls a tool result "extern", the vocabulary the `tools` rename retired

- **Where** `session.lead.2` and `session.lead.3` in `locales/nl.json`
- **Problem** EN `lead.2` says "a tool result arrives the moment something runs"; NL says "externe
  inhoud komt binnen op het moment dat iets ze gaat halen". EN `lead.3` says the documentation page
  "was a tool result for exactly one turn"; NL says it "was precies één beurt lang extern". That is
  the old unit name (`external`, "material from outside") which the step `CLAUDE.md` records as
  renamed to `tools` precisely because "naming the mechanism beats naming the origin". A Dutch reader
  is handed a fourth layer name that appears nowhere else in their curriculum. Worse, `lead.3` is
  now slightly false in Dutch: a page pulled off the web does not stop being *external* after one
  turn, it stops being a *tool result*, which is the whole point of the paragraph.
- **Fix**

  `session.lead.2`: "...het harness laadt in elke request hetzelfde mee, een toolresultaat komt
  binnen op het moment dat er iets draait."

  `session.lead.3`: "Die documentatiepagina die de agent van het web haalde, was precies één beurt
  lang een toolresultaat. Daarna is ze een alinea in het transcript, die bij elk bericht dat je
  stuurt weer meegaat. In de sessie bezinkt alles."

### N2. `session.lead.4`'s Dutch opens on the wrong connector

- **Where** `session.lead.4` in `locales/nl.json`
- **Problem** EN: "Nothing on the other side is keeping any of this for you", where "the other side"
  is the provider's end of the wire. NL: "Aan de andere kant houdt niemand dit voor je bij", where
  "aan de andere kant" reads first and overwhelmingly as the discourse marker "on the other hand".
  It sets up a contrast with `lead.3` that does not exist, so the Dutch reader looks for an argument
  that was never made.
- **Fix** Moot if P1 lands, since the recommendation there is to delete this paragraph in both
  languages. If it is kept instead, open on "Aan de overkant houdt niemand dit voor je bij."

### N3. Dutch has two words for compaction, one on the page and one on the projector

- **Where** `session.compaction-picks-moment.heading` ("Compressie") against `deck.session.clear.note`
  ("Compactie") and `context.amnesia-context-fatigue.3.*` ("comprimeren")
- **Problem** In a guided session the room sees "Compactie kiest het moment" on the board and
  "Compressie kiest het moment, of jij kiest het" on their own screens, for the same mechanism, in the
  same minute. The English is one word throughout. *Compressie* is also the weaker of the two: it is
  the everyday Dutch word for data compression, which is lossless, and the section's argument is that
  detail is thrown away.
- **Fix** Standardise on the noun *compactie* and keep *comprimeren* as the verb. One edit:
  `session.compaction-picks-moment.heading` becomes "Compactie kiest het moment, of jij kiest het".
  `session.compaction-picks-moment.1` ("dan comprimeert het harness ze") and
  `context.amnesia-context-fatigue.3.*` ("Bij het comprimeren") already agree with that and need no
  change. Note this renames no key: the slug is derived from the English heading, which does not
  move.

---

## Verdict

This is a good unit with excellent prose sitting on top of a real structural fault. The writing
itself needs almost nothing: it is human, it is short, it varies its rhythm, and three of its five
sections close on a line worth remembering. But two of its paragraphs render for **no reader in any
mode**, one of them is the topic sentence of the section named after the unit's most important claim,
and the step's own `CLAUDE.md` still records the reasoning for keeping them as if it were true. The
result is a section headed "Sessions are where the money goes" that never says the session is where
the money goes, and a `recap` bullet crediting this page with a claim it does not make. That is not a
polish item, it is a hole in the argument, and it is invisible to anyone who reads the HTML without
running the audience filter. Beyond that: one number that contradicts its own figure two paragraphs
later, one mechanism taught a unit ahead of its owner with no pointer, the step's cost-saver marker
skipping the money unit, three Dutch entries carrying vocabulary a rename retired, and exactly one
place where a drawing would settle a claim the prose can only assert. Not yet best-in-the-world; two
days from it.

Priority order:

1. **P1** — delete `session.lead.4`, un-tag and rewrite `sessions-where-money.1` as a pointer, fix
   the HTML comment and the step `CLAUDE.md` paragraph that will otherwise reinstate the bug. Both
   languages.
2. **Truthfulness 1** — "four files" becomes "two files", "the failure" becomes "the output", "the
   answer to it" becomes "everything around it". Fix `SessionMakeup.tsx`'s doc comment in the same
   change. Both languages.
3. **N1** — retire "extern" from the two Dutch lead entries.
4. **P2** — one sentence pointing `sessions-where-money.2` at `harness`. Closes half of audit item 30.
   Both languages.
5. **I2** — `WhereTheSeamFalls` under the compaction heading, and turn `deck-session-clear` from a
   statement into a figure slide.
6. **T1** — one coin on `sessions-where-money.3` and on `recap.what-costs-do.5`, after agreeing to
   revisit the "do not invent one" line in the step `CLAUDE.md`.
7. **R1** — move the trailing "then" to the front of the sentence.
8. **N3** — "Compressie" becomes "Compactie" in the Dutch heading.
9. **P3** — record the `SessionMakeup` / `workshop` flag-two seam in the step `CLAUDE.md`.
