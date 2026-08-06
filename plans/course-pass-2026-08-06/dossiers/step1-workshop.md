# step1 / `workshop` — audit dossier

**Files read:** `front/src/steps/step1/units/workshop.html` (204 prose words, 4 prose blocks, 2
assistant-varied `<pre>` blocks, 2 inline figure markers), `front/src/steps/step1/CLAUDE.md` (the
`workshop` block, lines 722-815, plus the assistant-variants section at 855-917), `index.tsx`,
`locales/en.json` + `nl.json` (all `workshop.*`, `hunt.*`, `flag.*`, `flags.panel.*` keys),
`OneWindow.tsx`, `FlagBoard.tsx`, `FlagRow.tsx`, `flags.ts`, `deck.tsx` (the two workshop slides),
`audit.md` (rows 2, 34, and the seam notes at 208-231), `.claude/skills/lesson-writing/SKILL.md`,
`front/CLAUDE.md`, `front/src/steps/CLAUDE.md`, `copilot-specific.md`.

**Verified against the repository:** `kata/step1/java/CLAUDE.md`, `TitleController.java`,
`services/Scramble.java`, `services/CatalogRun.java`, the 52 `*Stage.java` files (50 concrete),
the 42 files referencing `unveil`, the 11 commented-out `run.publish` calls,
`front/src/shared/i18n/locales/{en,nl}.json` (the sidebar labels),
`front/src/steps/step0/units/welcome.html` (the five house rules).

Short version: the prose here is the best-written 204 words in step 1. It has a voice, it wastes
nothing, `OneWindow` is a genuinely good capstone move, and there is not one AI tell on the page.
Two sentences in `lead.1` are wrong, though, and one of them is wrong in a way that works directly
against the thesis the very next clause states. Beyond that the unit inherits a known contradiction
(audit item 2) and drops a promise the intro made about this exact moment.

---

## 1. AI tells

**None.** This is the rare unit where the honest answer is "the prose is good, move on".

Checked and clear: no em-dashes anywhere in the HTML or in the Dutch; no announcing opener (`lead.1`
opens on the claim, "The backend has been holding out on you"); no hype adjective; no summary
paragraph; no "it's not just X, it's Y"; no gesture-at-significance closer. Paragraph openings vary
(`The backend` / `Getting all three` / `Work all three`). Sentence lengths are uneven inside every
paragraph, and every one of the four ends on its sharpest line, which is the house rule from
`lesson-writing`:

- "One service, three answers, and where each one came from is the only thing separating them."
- "running the service and calling the endpoint are its job, not yours."
- "Read the number at both ends and watch it happen to you."

The board's hint keys hold the same bar. `flag.trace.help` closes "Your agent cannot pick; you can."
`flag.decode.help` closes "An agent doing character arithmetic in prose sounds just as sure when it
is wrong." Both are exactly the "end on the sharpest sentence" move, and both are load-bearing rather
than decorative.

The one thing that could be read as a tell is `lead.2`'s three-clause middle ("Each row names its
flag's way in, the Hint behind it says where to aim, and your agent does the legwork"). It is not
one: the three clauses have three different subjects and each names a distinct mechanic on the page
below. It is a description of an interface, not a rhythm. Leave it.

---

## 2. Truthfulness

### 1. `lead.1` states a mechanism that is true of one flag out of three, and a count that is wrong

**Where** `workshop.lead.1` (`units/workshop.html:28-30`) and `nl.json` `workshop.lead.1`

**Problem** The sentence reads:

> The pipeline behind them computes more than nine lines on every request, and three of the lines it
> throws away are flags: leetspeak, wrapped in `{curly braces}`.

Checked against `kata/step1/java`:

- **Trace flag** (`ManuscriptTallyStage`, `@Order(21)`): computed on every request, `run.publish(...)`
  commented out. This one *is* a line the pipeline throws away. ✓
- **Decode flag** (`VaultDoorStage`): sits in a branch whose condition cannot be true (`tally` folded
  modulo 9973, then compared `>= 9973`). It is **never computed at all**, so it is not a line
  anything throws away. ✗
- **DEBUG flag** (`AtlasBindingStage`): a `log.debug` line decoded by an inline shift. It is not a
  catalogue line, and it is not thrown away, it is **suppressed by a log level** and prints when
  DEBUG is on. ✗

The count is wrong too, in the other direction. The pipeline restores 41 strings through
`Scramble.unveil` (42 files reference it, 41 stages plus `Scramble` itself), and per
`kata/step1/java/CLAUDE.md` five of those come out flag-shaped, of which the board grades exactly
one. So the number of thrown-away lines that are flags is five, not three, and the number of the
board's three that are thrown-away lines is one.

This is not pedantry, because the sentence immediately after it is the unit's whole thesis: "One
service, three answers, and where each one came from is the only thing separating them." If all three
were lines the pipeline throws away, they would have the *same* provenance and there would be nothing
separating them. The paragraph argues against itself in eleven words. The board's own help keys say
so out loud: `flag.decode.help` opens "This answer can only be read, never run", and
`flag.debug.help` opens "This answer is not hidden in the code at all."

It also primes the wrong technique. A student who reads `lead.1` goes looking for dropped lines,
which is one third of the work, and the step's CLAUDE.md records that the three per-flag sentences
were deliberately cut from this paragraph precisely so `lead.1` "stops at what the flags look like".
This clause is a where-claim that survived that cut, and it is the wrong where.

**Fix** (EN, `workshop.html`):

```html
<p data-i18n="workshop.lead.1">
  The backend has been holding out on you. <code>GET /api/titles</code> returns nine book titles,
  and the Catalogue page in the sidebar shows them. The pipeline behind them does a great deal more
  on every request than those nine lines let on, and not all of it in the open. Three of the things
  it is not telling you are flags: leetspeak, wrapped in <code>{curly braces}</code>. One service,
  three answers, and <a href="/steps/step1/truth">where each one came from</a> is the only thing
  separating them.
</p>
```

**Fix** (NL, `nl.json`):

```json
"workshop.lead.1": "De backend houdt iets voor je achter. <code>GET /api/titles</code> geeft negen boektitels terug, en de Catalogus-pagina in de zijbalk toont ze. De pipeline erachter doet bij elke aanvraag een pak meer dan die negen regels laten uitschijnen, en niet alles daarvan in het volle zicht. Drie van de dingen die hij je niet vertelt zijn flags: leetspeak, tussen <code>{accolades}</code>. Eén service, drie antwoorden, en <a href=\"/steps/step1/truth\">waar elk antwoord vandaan komt</a> is het enige dat ze uit elkaar houdt."
```

Both keep the shape, the length and the closer, drop the false mechanism, and do not recite the three
techniques the CLAUDE.md forbids putting back.

**Ripple:** the deck carries a softer version of the same misframing.
`deck.workshop.divider.1` reads "Three flags hidden in `<hi>`the catalogue pipeline`</hi>`", which is
true of at most two of the three. "Three flags hidden in `<hi>`one service`</hi>`" costs nothing and
matches the corrected lead. Dutch sibling with it.

### 2. The unit names a sidebar page that is not what the sidebar says

**Where** `workshop.lead.1` (`units/workshop.html:28`), `nl.json` `workshop.lead.1`

**Problem** The prose says "the `<code>Catalog</code>` page in the sidebar". The sidebar renders
`catalog.nav`, which is **"Catalogue"** in `shared/i18n/locales/en.json:44` and **"Catalogus"** in
`nl.json:44`. `AppShell.tsx:231` is the only place that label is drawn. So a student scanning the
sidebar for the word the unit gave them does not find it, in either language, and this is the first
time step 1 sends them there by name.

Worse, it is set in `<code>`. Mono in this design system means "anything the machine produced"
(`front/CLAUDE.md`), and `Catalog` **is** a machine name in this step: `services/Catalog.java` is the
class that builds the nine titles and the one the `truth` unit's `AnswerProvenance` figure already
made the student open. So the sentence reads as pointing at a Java class rather than a nav item, on
a page whose entire job is telling three sources apart.

**Fix** Both languages, and drop the `<code>`: "and the Catalogue page in the sidebar shows them" /
"en de Catalogus-pagina in de zijbalk toont ze". (Already folded into the finding 1 replacement text
above.)

### 3. Everything else on the page checks out

Recorded so the next pass does not re-verify it:

- "nine book titles" ✓ (`kata/step1/java/CLAUDE.md`, `TitleControllerTest`).
- "three flags" ✓ (`flags.ts` has exactly three specs; the fourth, `shutterFlag`, is correctly
  excluded and graded in `tools`).
- "You have spent eight units on what that costs" ✓ (`tokens`, `prompt`, `tools`, `context`,
  `session`, `harness`, `model`, `truth` = 8 units ahead of `workshop` in the registry, and `recap`
  carries exactly eight cost bullets for them).
- `cd kata/step1/java` ✓; `claude` / `copilot` as launchers ✓ and consistent with `tools.html`'s
  pair and with `copilot-specific.md`'s "the course's Copilot side assumes Copilot CLI".
- `flag.trace.help`: "Put one log line in `Scramble.unveil`, the place every restored string passes
  through" ✓ (41 stage files reference `unveil`, 42 including `Scramble` itself). "Logging
  `CatalogRun.publish` misses it, because the stage holding the flag never publishes" ✓ (the call is
  one of 11 commented-out publishes).
- `flag.debug.help`: `logging.level.be.smartagents.kata.java.step1=DEBUG` ✓ matches the property in
  `kata/step1/java/CLAUDE.md`'s run command exactly.
- `flag.decode.help`: "a branch in the services package whose condition cannot be true: a value folded
  into a small range, then compared against a bound it can never cross" ✓ and correctly stops short
  of naming the class.
- The board grades against salted SHA-256 in the browser and needs no backend ✓ (`FlagRow.tsx:61`).

### 4. One number I could not verify, and a doc inconsistency behind it

**Where** `flag.trace.help` ("Five leetspoken lines come out of the trace"), via
`kata/step1/java/CLAUDE.md`

**Problem** Step 1's front CLAUDE.md records that `flag.trace.help` "is now the only place that number
appears", so it is the board's one measured claim about the backend. I cannot check it directly
without decoding the stored strings, which is prohibited. What I can check is that the Java project's
own CLAUDE.md gives two counts that do not agree: it says "40 of the 41 restored strings carry
`(draft)`" (leaving one unmarked), and four paragraphs later that of the eleven commented publishes
"five lines appear and all five are flags", with "six of the decoys carry the marker and vanish; four
do not". Five unmarked strings means 36 of 41 carry the marker, not 40. The help key's "five" agrees
with the second account, so the number a student sees is probably right and the "40" is the stale
sentence, but somebody with permission to decode should settle it before the next audit anchors on it.

**Fix** Not student prose, so no replacement text. Re-measure and correct one sentence in
`kata/step1/java/CLAUDE.md`.

---

## 3. Progression

### 1. The page sends the student to a rule set, then tells them to break rule 3 — AUDIT ITEM 2, not my discovery

**Where** `workshop.lead.2` → `/steps/step0/welcome`, against `workshop.one-window.1` and
`hunt.work.label`

`welcome.house-rules.3` is "**One flag, one session.** ... Start each one on a fresh session."
Three blocks later, `one-window.1` says "Work all three from a single session. Nothing here needs a
clear between the flags", and `hunt.work.label` says "without clearing it". Nothing on either page
reconciles them. This is **audit.md Table 1a item 2**, already recorded, with the right call already
made there (the card is correct for a capstone, so rule 3 is the half to qualify).

**What is new, and worth adding to that row:** the collision is also on the deck, and there it is two
lines apart on one slide. `deck.workshop.divider.*` reads "Three flags hidden in the catalogue
pipeline" / "One session, measured at both ends" / "**Only your agent hunts**". The third point is
house rule 1 quoted verbatim, so the slide is asserting the rule set and contradicting a member of it
in the same three bullets. Whatever clause lands on `welcome.house-rules.3` has to be true of that
slide too, or the tutor says the contradiction out loud.

### 2. The intro promises the hunt will be priced when it is over, and this is where it is over

**Where** `welcome.house-rules.5` → `hunt.*` moves. **Not in audit.md.**

**Problem** Step 0's last house rule is: "**Price the hunt when it is over.** A flag is a few
characters long. Getting to it was not, and you paid for every turn on the way. **Step 1 gives you the
numbers to put on that.**" That promise is aimed at a specific moment, and the moment is this page:
the workshop is the hunt, and `OneWindow` puts the student's two `/context` readings in their hand at
exactly the point the rule says to price it.

The card then stops one move short. `hunt.count.label` gets the two numbers side by side and
`hunt.judge.label` asks which flag they could hand over whole. Nothing points at the rate. And the
paragraph that would close the loop, `model.cost.4`, is by the step's own record now "reached from
nowhere but its own unit" (step 1 CLAUDE.md, line 790), because the pointer at it went to step 0 with
the house rules. So the course sets up a payoff in the intro, builds the machinery two units early,
and then walks past the one page where the student is holding both halves.

This is a real progression defect rather than a missing feature: an unpaid promise is worse than no
promise, and the student who took rule 5 seriously arrives here with nothing to do about it.

**Constraint this brushes, stated plainly:** step 1's CLAUDE.md records that `model.cost.4` is "the
one place the course multiplies", and that step 0's version of the rule "names no command and does no
arithmetic" on purpose. A fifth move that multiplies would violate that. The fix below is a
**pointer, not a second multiplication**, which is the same move `harness.coordinator.3` and
`model`'s closing section already make.

**Fix** (cheapest, one key per language, no arithmetic on this page). `hunt.count.label`:

- EN: `Run /context again when the third flag lands, put the two numbers side by side, and take the gap to the rates in the model unit.`
- NL: `Draai /context opnieuw zodra de derde flag binnen is, leg de twee getallen naast elkaar, en neem het verschil mee naar de tarieven in de unit over het model.`

If the maintainer would rather keep the card at four moves of one line each (which is a documented
rule), the alternative is a clause on `hunt.description`, which is already the card's one place for
a claim: "The flags are the work. The number on screen while you do it is what this step has been
about, and `model` has the rate to put on it."

### 3. The unit's one unlinked claim is the one it is asking the student to trust

**Where** `workshop.one-window.1`

**Problem** Minor, but it is the only link the page does not make. `lead.1` links to `truth`,
`lead.2` links to step 0's house rules, and `recap` behind this page links to all eight units. Then
the paragraph that carries the whole capstone framing says "the hunt fills a window in front of you,
with source files, a trace and a console dump going in one after another. You have spent eight units
on what that costs" and names none of them. "A tool result is usually the bulkiest thing in there" is
`tools`'s claim, and `session`'s `SessionMakeup` is the figure that measured it. A student who does
not remember which page argued that has nowhere to go from here except backwards through the sidebar.

**Fix** One anchor, no new words: `... with source files, a <a href="/steps/step1/tools">trace and a
console dump</a> going in one after another.` NL: `... met bronbestanden, een <a
href="/steps/step1/tools">trace en een consoledump</a> die er de een na de ander in gaan.`

### Otherwise the sequence is right

`truth.hallucinations.2` hands into this page and `lead.1` links back, which is a properly marked
seam and one of the few in the course. The unit assumes nothing it has not been given: `/context`
comes from `context`'s `ReadYourWindow`, the agent-does-the-legwork rule from step 0, the flag shape
(`{f1r5t-5t3p5}`) from step 0's quiz, the red herrings from step 0's `backend.lead.2`, and the
"make it run the check rather than reason about it" move from house rule 4, which `flag.decode.help`
then applies almost word for word. Nothing here re-argues a unit that owns a claim.

---

## 4. Readability

Nothing to report beyond the fixes above. Four blocks, none over five sentences, one clause of
setting per mechanic on the page. `lead.1` is the only paragraph doing two jobs (what the flags look
like, and the thesis), and the finding-1 rewrite is what tightens it.

The board's help dialogs are the longest prose in the unit (`flag.decode.help` runs six sentences),
and they should stay that way: they are the only place a technique is written down, they are behind a
button a stuck student presses on purpose, and each one is a sequence of instructions rather than an
argument. The three read at the same length and the same shape, which is right for three rows of one
board.

One thing that is *not* a readability problem despite looking like one: `<h3>One window</h3>` and its
paragraph sit under the "Test yourself" `<hr>`, so the capstone's framing arrives after the
separator. That is the step's documented exercise shape (a hands-on task gets the one `<h3>` the rest
of the step does not), and `tools` does the same. Leave it.

---

## 5. Imagery

**The unit has no drawing, and it should not have one.** That is not an oversight to fix, and I want
that on the record because "capstone with no figure" is the kind of gap a careless pass fills.

Both `data-figure` markers are interactive rather than drawn: `one-window` is a `TaskCard` and
`flag-board` is the graded board. Both earn their place. `OneWindow` is the single best decision on
this page: without it the step spends nine units on a window and then ends on a puzzle that never
mentions one, and the first-and-third move pair is what turns "you paid for this" into a number the
student produced themselves.

The two figures a reviewer would reach for both fail the repo's bar:

- **A before/after window drawing** (two teal frames, the second stuffed with source files, a trace
  and a console dump) would draw exactly the thing `OneWindow` asks the student to go and measure. A
  figure that pre-empts an exercise is worse than no figure: the student reads the answer and skips
  the reading.
- **A three-way provenance drawing** (readable on disk / alive only while it runs / one setting away)
  would be the third telling of the per-flag technique, after the row hint lines and the Hint
  dialogs. Step 1's CLAUDE.md forbids exactly that ("the prose must not grow a second telling of any
  of it"), and it would hand over the sorting the board exists to make the student do.

So: nothing to add, nothing to cut. The one imagery-adjacent fix is the deck line in finding 2.1's
ripple.

---

## 6. Supporting tasks

The reader is asked to do a great deal here, in the right shapes: a plain instruction to run a
command against the step's Java project (the `<pre>` pair), a `TaskCard` (`OneWindow`, ticked once to
`kata.step1.hunt`), and a hash-checked flag board (three rows). That is the correct set for a
capstone, and the ordering is right: frame the session, then work it, then grade it.

The four moves hold up individually. Move 1 and 3 are a pair and neither can be dropped. Move 4 ("Say
which flag you could hand over whole, and which one needed your own judgement") is the debrief moved
out of prose and into the student's hands, and it is the only thing on the page that pays off house
rule 4 and `flag.trace.help`'s "Your agent cannot pick; you can". Keep all four.

**The one gap is finding 3.2**: nothing asks the student to put a rate on the two numbers the card
made them collect, on the page the intro promised would do it. Fix proposed there, as a pointer
rather than a fifth move, so the card stays at four one-line moves.

No other task belongs here. In particular, do not add a "write down which technique found which flag"
card: that is move 4 in different words, and it would give away the sorting the board grades.

---

## 7. Quiz

**No quiz, and the unit is right not to have one.** Saying so plainly rather than leaving the axis
blank.

Three reasons, in order of weight. The page already grades three answers against salted hashes and
carries an ungraded reflection on top of them, so a multiple-choice question would be the fourth
thing asked on one page and the only one whose answer is on screen already. The material a quiz would
cover is `truth`'s (where an answer came from), and `truth` is the unit directly above; asking it
here grades the previous page. And the distractors would have to be the three techniques, which are
written out in full on the board six inches below the question, so no distractor could be one a reader
might genuinely believe.

`audit.md` row 33 asks for a three-question quiz in `truth`, which is the right place for it. If that
lands, this unit needs one even less.

---

## 8. EN/NL parity

**Structurally complete.** All four prose keys in `workshop.html` (`workshop.lead.1`,
`workshop.lead.2`, `workshop.one-window.heading`, `workshop.one-window.1`) have `nl.json` entries.
All ten `hunt.*` keys, all nine `flags.panel.*` keys and all nine `flag.*` keys have both halves. The
two `<pre>` blocks carry `data-assistant` and no `data-i18n`, which matches how `tools.html:174-177`
does the same thing and is correct: a command is not translated. The flags themselves and the
`{...}` placeholder stay untranslated, per policy.

**Semantically faithful**, and in places the Dutch is the livelier of the two ("gepeuterd hebt" for
"pried out" is better than the English it renders; "zie het jezelf overkomen" lands the closer as
hard as "watch it happen to you"). This is a rare unit where I would not say the Dutch is truer: the
two are level, including in being wrong together.

Both languages carry both inaccuracies from section 2. `nl.json` `workshop.lead.1` says "drie van de
regels die hij weggooit zijn flags" (finding 2.1) and "de `<code>`Catalog`</code>`-pagina in de
zijbalk" (finding 2.2), so both fixes are two-file changes. Replacement Dutch is given above.

### One small Dutch inconsistency worth a line

**Where** `nl.json` `flags.panel.wrong`

**Problem** "Ga terug naar de pipeline en lees wat **ze** verborg." Two keys away, `workshop.lead.1`
calls the same pipeline "hij" ("meer dan negen regels, en drie van de regels die **hij** weggooit").
"Ze" also reads as plural at first glance, which on a board about three flags is the wrong first
glance.

**Fix** `"flags.panel.wrong": "Niet die. Ga terug naar de pipeline en lees wat hij verborg."`

### A note, not a finding

`flags.panel.wrong` sends every wrong answer "back to the pipeline", and only one of the three flags
is in the pipeline in the sense the board's own help keys use. The message is shared across three
rows, `FlagRow` already takes a `wrongKey` prop for exactly this reason (`ShutterFlag` overrides it),
and per-row wrong messages would be three more keys in two languages for a sentence a student sees
only after mistyping. Not worth it. But if finding 2.1 lands and somebody wants the page consistent
end to end, "Niet die. Ga terug naar de service en lees wat ze voor je achterhield." / "Not that one.
Go back to the service and read what it was keeping from you." is neutral across all three rows and
costs one key.

---

## Verdict

This is a strong capstone and one of the two or three best-written pages in the course. It is lean on
purpose, the leanness works, `OneWindow` is the decision that turns a flag hunt into a step 1
capstone, the board's hint keys carry real teaching without giving anything away, the Dutch is
complete and idiomatic, and there is not a single AI tell on the page. Against that: `lead.1`
contains a factual claim that is true of one of its three subjects and false of the other two, and it
sits in the same sentence as the thesis it contradicts, which is the sort of thing a careful student
catches and a careless one is misled by. The unit also inherits a contradiction with step 0's house
rules that the audit already knows about, and it silently drops the one promise the intro made about
this exact moment. All three are cheap. None of them is a reason to touch the voice.

Priority-ordered:

1. **Rewrite `lead.1`'s middle sentence** in both languages (finding 2.1). Replacement text given.
   This is the only thing on the page that is wrong rather than incomplete.
2. **Fix `Catalog` → Catalogue / Catalogus and drop the `<code>`** (finding 2.2), in both languages.
   Folded into the same edit.
3. **Close the pricing promise** (finding 3.2), as a pointer in `hunt.count.label` or
   `hunt.description`, in both languages. Do not add arithmetic: `model.cost.4` stays the one place
   the course multiplies.
4. **Add the deck note to audit item 2** (finding 3.1): `deck.workshop.divider.*` states house rule 1
   and contradicts house rule 3 on one slide, so whatever clause qualifies rule 3 has to be true of
   the slide too.
5. **Fix `deck.workshop.divider.1`** ("the catalogue pipeline" → "one service"), both languages.
6. **One anchor in `one-window.1`** pointing "a trace and a console dump" at `tools` (finding 3.3).
7. **`flags.panel.wrong`: "ze" → "hij"** (section 8).
8. **Re-measure and fix the 40-vs-36 sentence in `kata/step1/java/CLAUDE.md`** (finding 2.4). Not
   student-facing, but `flag.trace.help`'s "five" is the board's only measured number and it derives
   from that paragraph.

Not to change, and worth writing down so a later pass does not: no figure, no quiz, no fifth move on
the card, no per-flag technique in the prose, no heading on the board, no closing section (that is
`recap`'s), and no house rule written back onto this page.
