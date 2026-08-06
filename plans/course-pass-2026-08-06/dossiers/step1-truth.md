# step1 / `truth` — audit dossier

**Files read:** `front/src/steps/step1/units/truth.html` (662 words, 11 prose blocks, 2 inline
figures), `front/src/steps/step1/CLAUDE.md` (the `truth` block, lines 638-720), `index.tsx`,
`locales/en.json` + `nl.json`, `TrainedOrGrounded.tsx`, `AnswerProvenance.tsx`, `deck.tsx` (4 slides),
`quiz.ts`, `audit.md` (row 33), `.claude/skills/lesson-writing/SKILL.md`,
`.claude/skills/quiz-writing/SKILL.md`, plus `kata/step1/java/pom.xml`,
`.../step1/services/Catalog.java` and `.../step1/TitleController.java` for the checkable claims.

Short version: this is one of the better-built units in the course. The two figures genuinely take
different cuts of one argument, every example is checkable against this repository, the Dutch is
complete and faithful, and the prose has a voice. Three things are wrong with it: a list-of-three
rhythm that runs in six of eleven paragraphs, one factual claim that a student who does what the
unit asks will catch out, and the fact that a unit whose whole argument is "go and check" never once
asks the reader to check anything.

---

## 1. AI tells

The prose is mostly human and good. Openings are varied (`The same` / `Everything else` / `So which`
/ `Training stopped` / `The answer` / `Put the thing` / `Only the window` / `Grounded is` / `Ask for`
/ `With nothing` / `Two of those`), sentence lengths are uneven, and the closers land
("This is the half of the model that ages while you are not looking.", "All three arrive in the same
voice."). No em-dashes, no announcing openers, no hype adjectives, no summary paragraph. Two real
findings, and one of them is quantified rather than a matter of taste.

### 1. The tricolon rhythm: six three-item lists in eleven paragraphs

**Where** `truth.lead.1`, `truth.lead.3`, `truth.cutoff.1`, `truth.grounding.1`, `truth.proof.1`,
`truth.hallucinations.2`

**Problem** The brief's first named tell is "Tricolons everywhere... One list is fine; a rhythm of
them is a machine." This unit runs one in six of its eleven paragraphs, and all six are the same
syntactic move: a comma-or-colon list of three noun phrases offered as evidence.

- `lead.1` — "Not your repository, not your conventions, not the version you are actually on."
- `lead.3` — "The one it went and discovered, the one you handed it, or the one it already had."
- `cutoff.1` — "A framework released last spring, the API your team deprecated in March, the library
  that threw out its whole configuration format: none of that is in there."
- `grounding.1` — "The <code>pom.xml</code> on disk, the release notes fetched off the web, the
  output of a command that ran a second ago:"
- `proof.1` — "<code>mvn test</code>, a <code>curl</code> at the endpoint, one line of
  <code>jshell</code>."
- `hallucinations.2` — "No wobble in the tone, no hedge, no shorter sentence,"

Three of these are load bearing and must stay: `lead.3` is the unit's spine (the three sources),
`grounding.1` is disk/web/command which is the `tools` vocabulary, `proof.1` is three real commands
and is the most concrete thing on the page. `lead.1`'s fragment is the best sentence in the unit.
The two to cut are the two doing the least work, and cutting them breaks the rhythm without
flattening anything.

**Fix** (a) `cutoff.1`, drop the middle item, which is also the item that does not belong in this
section (see Progression finding 2):

> Training stopped on a date. Whatever was published after it is not something the model knows less
> well, it is something the model has never seen. A framework released last spring, a library that
> threw out its whole configuration format between one minor version and the next: none of that is
> in there.

(b) `hallucinations.2`, cut the third item, which is a synonym of the first two and is exactly the
brief's "lists of three where each item is one adjective":

> Two of those were read and one was not, and the answer says the same thing about all three. That
> is what makes it expensive. No wobble in the tone, no hedge, because the model sounds the same
> whether it read your file or filled the gap. Stop reading the tone and start asking where the
> answer came from. <a href="/steps/step1/workshop">The workshop</a> is that question three times
> over.

Dutch counterparts, same cuts:

- `truth.cutoff.1` → "De training stopte op een datum. Wat daarna verscheen, kent het model niet
  minder goed, het heeft het nooit gezien. Een framework van vorig voorjaar, een library die haar
  hele configuratieformaat overboord gooide tussen twee minor versies: niets daarvan zit erin."
- `truth.hallucinations.2` → "...Geen aarzeling in de toon, geen slag om de arm, want het model
  klinkt hetzelfde of het nu jouw bestand las of het gat opvulde. ..."

### 2. Section symmetry: 2 / 2 / 2 / 2

**Where** the whole file

**Problem** After a three-paragraph lead, every one of the four sections is exactly two paragraphs.
The brief names this ("every section the same length"), and here it is not a coincidence of the
argument: `Proof` is thinner than the other three and is padded up to two by `proof.2`, while
`Hallucinations` carries a six-sentence paragraph plus a figure and would take three.

**Fix** Do not pad. The right correction is the one in Supporting tasks below: `Proof` is the
section that is short *because* the thing it asks for is a thing to do rather than a thing to read.
Give it the task card and the symmetry breaks by itself. If no card is added, this is a note rather
than a defect worth an edit.

---

## 2. Truthfulness

Verified true, by reading the files: `4.1.0` in `TrainedOrGrounded` matches
`kata/step1/java/pom.xml` line 10 (`spring-boot-starter-parent` 4.1.0); `Catalog.titles()` exists
and returns the list `/catalog` shows; `GET /api/titles` is `TitleController`; `Catalog` has no
`findAllByAuthorOrdered` and no author filtering of any kind; the `context` quiz's
`invented-userservice` question exists, sits four units earlier, and never uses the word
hallucination, so `hallucinations.1`'s callback is honest; all three in-page links
(`/steps/step1/tools`, `/steps/step1/context`, `/steps/step1/workshop`) resolve to registered unit
ids. That is a good record.

### 1. "spelled the way the rest of that class spells things" is false against `Catalog.java`

**Where** `truth.hallucinations.1`

**Problem**

> Ask which method on `Catalog` filters titles by author and you get `findAllByAuthorOrdered`,
> spelled the way the rest of that class spells things, on a class that has no such method.

`Catalog.java` has exactly two methods: `titles()` (public) and `walk()` (private). Nothing in that
class is spelled `findAllBy…Ordered`. That name is Spring Data repository idiom, which is a
*deliberately good* choice for an invented symbol (it is what the training average would produce),
but it makes the sentence about it untrue. This matters more here than it would anywhere else in the
course: the unit is about checking where an answer came from, the step's own `CLAUDE.md` records
that the claims are true of `kata/step1/java` "so both sources can be opened and checked", and the
figure directly below invites exactly that check. A student who opens `Catalog.java` finds the
figure honest and the paragraph wrong.

**Fix** Keep the symbol (its Spring shape is the point) and correct the clause. English:

> Ask which method on <code>Catalog</code> filters titles by author and you get
> <code>findAllByAuthorOrdered</code>, spelled exactly the way a Spring method is spelled, on a
> class that has no such method.

Dutch:

> Vraag welke methode op <code>Catalog</code> titels op auteur filtert en je krijgt
> <code>findAllByAuthorOrdered</code>, geschreven precies zoals een Spring-methode geschreven
> wordt, op een klasse die zo'n methode niet heeft.

Note the phrasing deliberately avoids "the average of every Spring project", because
`front/src/steps/step1/CLAUDE.md` reserves the average argument for `context` and forbids this unit
from re-running it.

### 2. "the version before yours" is narrower than the figure under it

**Where** `truth.cutoff.2`, against `TrainedOrGrounded.tsx` lines 30-33

**Problem** `cutoff.2` says the trained answer "describes the version before yours". The figure
answers `3.5.0` against `4.1.0`, which is the previous *line*, not the previous version (that would
be 4.0.x). The figure's choice is the better one, since a model trained before 4.0 shipped is
exactly the case the section is about; the prose is what is off. Low severity, but the two sit four
paragraphs apart on a page whose subject is precision about where a number came from.

**Fix** `truth.cutoff.2`: "It describes the version line before yours, in the same level tone as
everything else..." Dutch: "Het beschrijft de versielijn vóór de jouwe, in dezelfde vlakke toon als
al de rest...". (The step's `CLAUDE.md` also describes `3.5.0` as "the previous release", so that
line is worth correcting to "the previous line" in the same pass.)

Nothing else in the unit carries a price, a model name, a context size or a Copilot claim, so there
is no stale-vendor-fact exposure here at all. That is a strength worth stating.

---

## 3. Progression

The unit builds. Cutoff (what the model has), grounding (what you put in), proof (what you run),
hallucinations (what survives all three) is the right order, and `Hallucinations` last rather than
first is correct: the term is worth having only once the reader knows what would have caught it. The
callback to `contextQuiz` is a genuine payoff rather than a duplicate. Two findings.

### 1. The lead frames three *sources*; two of the four sections are not sources, and nothing marks the turn

**Where** `truth.lead.3` → `truth.proof.1`

**Problem** The lead sets up a clean three-way question: "So which of the three is the truth? The one
it went and discovered, the one you handed it, or the one it already had." A reader holding that
frame reaches `Proof` and it no longer fits: proved is not a fourth source, it is a different axis
(how the claim was checked), and `Hallucinations` is a failure mode rather than a source at all. The
page never says so. `proof.1` opens "Grounded is still not proved", which bridges from the section
above but not from the lead's frame.

**Fix** One clause, in `truth.proof.1`, turning the section into the answer to the lead's question
rather than a fourth item beside it:

> Grounded is still not proved, and that is the answer to the question up top: the source is not the
> same thing as the check. The agent read a file and told you what it says, and you are taking its
> word for the reading. Anything that can be run should be run: <code>mvn test</code>, a
> <code>curl</code> at the endpoint, one line of <code>jshell</code>. An answer with a command
> behind it is a different kind of answer.

Dutch: "Grounded is nog altijd niet bewezen, en dat is het antwoord op de vraag van hierboven: de
bron is niet hetzelfde als de controle. De agent las een bestand en vertelde je wat erin staat, ..."

### 2. `cutoff.1`'s middle example belongs to the half the lead owns, not to this section

**Where** `truth.cutoff.1`

**Problem** "the API your team deprecated in March" is not an example of a training cutoff. Your
team's API was never in the training data whatever the date, which is the *other* half, the one the
step's `CLAUDE.md` records as belonging to `lead.1` ("It says the model was never trained on your
company at all, which is the half a cutoff date does not cover"). Putting it in the cutoff list
re-mixes the two halves the lead just separated, one screen later. The other two items in the list
are correct: both are public things published after a date.

**Fix** Same edit as AI-tell finding 1(a): drop that item. It fixes the argument and the rhythm in
one cut.

### 3. (prior art, not a discovery) The unit still opens cold

`audit.md` row 33 records that `model` closes on `PickTheTier` without pointing here, so `truth`
arrives with no line in, while it now hands out cleanly to `workshop`. That row is a known gap and I
have nothing to add to it beyond confirming it is still true of the tree.

---

## 4. Readability

No paragraph carries two arguments except `hallucinations.1`, and that one is deliberate and
recorded (example, term, callback, in that order, with the callback pinned to the close so the
`contextQuiz` seam has two marked ends). Headings are plain labels and describe their sections.
`grounded` is defined in place, at `grounding.1`, before it is used bare at `proof.1`. One finding.

### 1. "nothing was invented on purpose" is ambiguous; the Dutch is not

**Where** `truth.hallucinations.1`

**Problem** "Nothing was looked up and nothing was invented on purpose." In English "on purpose" can
attach to *nothing was invented* (correct: the invention was not deliberate) or to the whole
negation (wrong: nothing was invented, and that was deliberate). It is the one sentence on the page a
reader has to re-read. The Dutch has no such problem: "Er werd niets opgezocht en er werd niets
bewust verzonnen" places *bewust* unambiguously on the verb. Repo policy is that where the two
disagree the Dutch is the truer version and the English gets rewritten, so this is an English fix.

**Fix** "Nothing was looked up, and nothing was deliberately made up." (Dutch unchanged.)

---

## 5. Imagery

**Both existing figures clear the bar, and I am not proposing a third.** Stating that plainly is
the finding, because this is one of the few units in the course where the drawings carry something
the sentences provably cannot.

- `TrainedOrGrounded` shows two answer chips drawn at identical size, fill and position under two
  different windows. That identity is the argument, and no sentence can *show* two answers looking
  the same; it can only assert it. `grounding.2` then reads the figure ("Only the window changed"),
  which is the right relationship. It also carries a checkable number (`4.1.0` matching
  `pom.xml`), so the drawing is itself grounded.
- `AnswerProvenance` shows three claims in a uniform left column with one dashed hole in the source
  column. Same test: the point is the *absence of any visual difference* between the read claims and
  the invented one, which prose can assert and only a drawing can demonstrate. It is also the
  counterfactual view, the second column a student is never handed, which the prose cannot hand them
  either.

**The two undrawn sections should stay undrawn.** `The cutoff` is a date, and a timeline of a
training cutoff against a release date would draw the sentence rather than measure anything.
`Proof` is a thing to do, and the honest way to carry it is a command the reader runs, not a picture
of one. The step's own `CLAUDE.md` reaches the same conclusion, and I agree with it on the evidence
rather than by deference: neither section makes a claim the reader has to take on trust that a
drawing could settle.

The one thing on this page a reader does take on trust is `hallucinations.2`'s "No wobble in the
tone", and that is not drawable either. It is answerable, though, by a quiz question. See below.

---

## 6. Supporting tasks

### 1. The unit says "anything that can be run should be run" and never asks the reader to run anything

**Where** `truth.proof.1`, `truth.proof.2`

**Problem** This is the clearest told-but-never-asked in step 1. The section's whole claim is that a
grounded answer is still someone else's reading and that the fix is to run a command. The reader is
handed three commands (`mvn test`, a `curl`, `jshell`), the step's own service is two terminals
away, the running example is a version number sitting in a file they can open, and the unit closes
without the reader having produced a single answer of their own. Every other claim in this unit is
verifiable against `kata/step1/java`; none of them is verified.

**This revisits a recorded constraint, and I think the constraint should be narrowed.**
`front/src/steps/step1/CLAUDE.md` says: "It carries no quiz and no exercise: `model` closes on
`PickTheTier` and `workshop` is a whole board, so a card here would sit between two exercises with
nothing new to ask for." The premise is right and the conclusion overshoots. `PickTheTier` is a
matching board about tiers and `FlagBoard` is a hash-checked hunt; neither asks the student to
produce the same answer three ways and compare the three. That is new, it is this unit's own
argument, and it is the missing rung between "you are told about proof" and "the workshop grades
whether you can find where an answer came from".

**Fix** A `TaskCard` (`shared/components/TaskCard.tsx`, one tick, `kata.step1.provenance`, under the
step's `<hr>` + `<h2 data-i18n="ui:quiz.title">` shape, with the `<h3>` exception `tools` and
`context` get). Four moves, each one line, no command named in the moves (the `<pre>` above carries
`cd kata/step1/java` if a command is wanted at all):

1. In a fresh session with nothing read, ask which version of Spring Boot this project builds on.
   Write the answer down.
2. Ask again, telling it to read `pom.xml` first. Write that answer down too.
3. Ask for a command that proves it rather than for the version, then run the command yourself.
4. Say which of the three answers you would put in a pull request description, and why.

Move 3 is `proof.2` applied ("ask for the check rather than the conclusion") and is the move nothing
else in the course asks for. Move 4 is the debrief and is what stops the card being an errand.
Deliberately not pinned to a specific Maven incantation: the point is that the *agent* produces the
command, and pinning one would answer move 3 on the page.

**Cost check:** this adds one card to a unit that currently has none, in a step that already carries
five. It does not compete with `PickTheTier` (a different question) or with `OneWindow` (a different
measurement). If the constraint is kept instead, then the quiz below is not optional, because the
unit would otherwise ask the reader for nothing at all.

---

## 7. Quiz

**The unit needs one, and this is the clearest quiz gap in step 1.** `audit.md` row 33 already
proposes exactly this ("Fix: a three-question quiz. The material sorts into questions more cleanly
than anything else in the step"), so this is prior art, not my discovery. What I can add is the
questions, the distractors, and one argument the audit row does not make: in guided mode this unit
filters down to two figures and nothing else, since it has no `data-audience` wrapper, no task and
no board. A registry quiz is the only thing that would survive into the classroom page. Wiring cost
is small: `truthQuiz` in `quiz.ts`, `quiz: truthQuiz` in `index.tsx`, keys in both locale bundles,
and **no HTML change**, because `prompt` already establishes that a unit with a registry quiz and no
task writes no heading of its own.

Deliberately avoids the `invented-userservice` question in `contextQuiz`, which owns the
missing-context case and which `hallucinations.1` now calls back to. These three ask about the
*provenance signal*, the *cutoff* and the *grounded/proved boundary*, none of which that question
touches.

### `no-signal-in-the-answer` (the one that matters)

> The agent gives you four sentences about your service and every one of them sounds equally sure.
> Which part of the answer tells you which sentences were read off disk?

- **correct** — Nothing in the answer does. The only way to know is to look at what was in the
  window when it answered.
- The sentences that name a filename were read; an invented claim has nothing concrete in it. *(the
  exact belief `AnswerProvenance` exists to kill)*
- The hedged sentences are the invented ones; a model hedges when it is filling a gap.
- The sentences that quote code exactly were read; a model cannot reproduce code it never saw.

Explanation: an answer carries no marker for where its parts came from. Two of the three claims in
the figure were read and one was not, and they are written the same way.

### `config-format-changed` (the cutoff)

> A library threw out its configuration format last spring. You ask the agent to write the config
> and it confidently writes the old format, with no warning.

- **correct** — The change is on the far side of the training cutoff, so the model has never seen
  the new format. It answered with what it did see.
- The model knows the new format but writes the one most projects still use.
- It read the library's docs and picked the version that matched your other dependencies.
- The old format appears more often in its training data, so it scores higher. *(believable and
  half-true, but this specific case is a date, not a frequency; keep the explanation off the
  average, which `context` owns)*

Explanation: after the cutoff there is nothing to be more or less sure about. The answer is not a
worse version of the right one, it is the last one the model saw.

### `read-it-and-said-so` (the grounded/proved boundary)

> You asked whether the empty-list case is covered. The agent read the test file and told you it is.
> It is not.

- **correct** — You asked for a conclusion. Reading a file and reporting what it says is still the
  agent's reading, and nothing ran.
- The file was too long, so the relevant test fell outside what the model could attend to.
- The test file was written after the model's cutoff, so it could not interpret it.
- Nothing from your project was in the window, so it answered from training. *(directly falsified by
  "the agent read the test file", which is why it is worth offering)*

Explanation: grounded is not proved. Ask for the check rather than the conclusion, and a test that
goes red is a claim that can fail in front of you.

---

## 8. EN/NL parity

**Complete and, unusually, faithful.** All eleven prose keys plus `truth.title` and both figure
heading sets (`trained-or-grounded.*`, `answer-provenance.*`) have Dutch entries; there are no
Dutch-only orphans and no missing keys. No em-dash or en-dash in either language. Machine-shaped
strings (`3.5.0`, `4.1.0`, `pom.xml`, `Catalog.java`, `TitleController.java`,
`findAllByAuthorOrdered`, `mvn test`, `curl`, `jshell`) correctly carry no `nl` entry, and
`grounded`/`grounding` is correctly left untranslated as the term of art. The deck's four
`deck.truth.*` keys are all present in both.

### 1. The Dutch is the better version at `hallucinations.1`

Covered under Readability finding 1: "niets bewust verzonnen" is unambiguous where "nothing was
invented on purpose" is not. Rewrite the English, leave the Dutch.

### 2. One trivial drift, no action needed

`truth.cutoff.2` NL renders "the harder thing to spot" as "het lastigste om te zien" (a superlative
where the English has a comparative). It is a one-word overstatement that changes nothing, and
levelling it would be exactly the "I would have phrased this differently" edit this pass is supposed
to refuse. Left alone.

Note for whoever lands the edits: every fix above that touches prose touches `nl.json` in the same
pass, and the Dutch replacements are written out in full at findings 1.1, 2.1, 2.2 and 3.1.

---

## Verdict

This is a strong unit that is one edit short of excellent and two short of complete. Its structure
is right, its two figures are among the few in the course that measure something prose cannot, every
example is anchored in this repository, and the Dutch is in genuine lockstep rather than
nominally so. What holds it back is not writing quality but the gap between what it argues and what
it makes the reader do: a page whose thesis is "stop reading the tone and go find out where the
answer came from" ends without the reader having found out where a single answer came from. Add to
that one claim (`spelled the way the rest of that class spells things`) that the very check the unit
asks for would falsify, and a six-in-eleven list-of-three rhythm that is the one place the prose
sounds generated rather than written, and you have three things to fix rather than a rewrite. Do not
touch anything else: the lead's rhetorical question, the term arriving late, the callback to
`contextQuiz`, the uniform left column and the identical answer chips are all load bearing and all
recorded as such.

Priority order:

1. **Fix `hallucinations.1`'s "spelled the way the rest of that class spells things"** (Truthfulness
   1). A factual error in the one unit about checking facts, in a sentence the figure below invites
   the student to test. One clause, both languages.
2. **Add the three-question quiz** (Quiz; `audit.md` row 33). Highest value per unit of work: no HTML
   change, closes a known audit row, and it is the only thing that survives into guided mode on this
   page.
3. **Break the tricolon rhythm at `cutoff.1` and `hallucinations.2`** (AI tells 1). The `cutoff.1`
   cut also fixes Progression 2, since the item being cut is the one that belongs to the lead's
   never-trained half rather than to the cutoff.
4. **Add the `Proof` task card** (Supporting tasks 1). Revisits a recorded constraint, so it needs a
   decision rather than an edit; if the constraint holds, item 2 becomes mandatory rather than
   recommended.
5. **One clause into `proof.1`** answering the lead's three-way question (Progression 1).
6. **`cutoff.2`: "the version line before yours"** (Truthfulness 2), and the same correction in the
   step's `CLAUDE.md` note about `3.5.0`.
7. **`hallucinations.1`: "nothing was deliberately made up"** (Readability 1). English only; the
   Dutch already says it correctly.
