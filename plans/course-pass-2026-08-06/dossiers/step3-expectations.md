# Dossier: step3 / `expectations` ("Expectation management")

Read: `front/src/steps/step3/CLAUDE.md`, `units/expectations.html` (94 lines, 5 sections,
10 prose blocks), `index.tsx`, `deck.tsx`, both locale bundles, `audit.md` Table 1d and item 46,
`lesson-writing/SKILL.md`, `quiz-writing/SKILL.md`. Every cross-link target verified by reading the
unit it points at.

Short version: the prose is good and human. It does not need rewriting. What it needs is the thing
the repo's own audit already names (item 20), plus six sentence-level snags and two Dutch defects.

---

## 1. AI tells

The prose passes. No announcing openers, no empty intensifiers, no summary paragraph, no closing
gesture at significance, no decorative analogy. Paragraph openings are varied (twelve blocks, twelve
different first words). Sentence lengths are uneven on purpose. The four triples in the unit
("same models, same week, same article"; "No validation, one hard-coded member, nothing stored
between refreshes"; "this domain, this codebase and the people using it"; "handled, tested, along
the path you described") are all triples of **concrete nouns**, which is the house voice
(`change.you-test-engineer.1` does the same thing with three test cases), not the tricolon-of-
adjectives the brief bans. Do not "fix" them.

One genuine finding.

**1. The X-rather-than-Y construction is the unit's only rhetorical move, and it fires twice in one
paragraph.**

- **Where** `expectations.detail-nobody-specified.2`
- **Problem** "So the burden moved rather than lifted. It sits with the people who can find that
  detail, and finding it takes room in the week rather than a date at the end of it." Two
  consecutive sentences on the same construction. It is a rhythm rather than a phrase, and it is
  the house's own version of "it's not just X, it's Y". Unit-wide the count is five in 730 words,
  the highest density in the course: `change` has two in 1,028, `goals` three in 1,689, `workflows`
  three in 1,175. Three of the five sit at paragraph-closing position (`floor rather than a lead`,
  `a date at the end of it`, `the next checkpoint rather than the finish`), so the closers of three
  separate sections land on one formula.
- **Fix** Change the second of the pair only. It costs one word and keeps the two closers that earn
  it:

  > So the burden moved rather than lifted. It sits with the people who can find that detail, and
  > finding it takes room in the week, not a date at the end of it.

  NL, same key: "...en vinden vraagt ruimte in de week, geen datum aan het eind ervan."
  (drops the second `in plaats van`.)

---

## 2. Truthfulness

Verified against the repository:

- Seven outbound links, all resolve to real unit ids: `/steps/step2/evolution`, `/steps/step3/change`,
  `/steps/step1/context`, `/steps/step2/engineering`, `/steps/step2/enablement`,
  `/steps/step2/steering`, `/steps/step2/patterns`.
- Every claim attributed to a linked unit is actually made there. `steering.worktree-each.3` really
  does say "The agents got faster. Your reading did not." `enablement`'s section really is
  `where-day-goes`. `evolution.walking-skeleton` really is the skeleton-with-details-left-out.
  `engineering` really does say "Name the thing you want." `ScriptRuns` in `patterns` really does
  draw run-to-run variance and the section really does put a script around it.
- `change` really does show the multiple not arriving (`change.process-was-bottleneck.1`).
- No model name, no price, no context size, no command, no filename, no count. The unit's factual
  surface is almost entirely cross-references, and they hold.

One overstatement.

**2. "the context unit" is not about the average.**

- **Where** `expectations.tool-not-advantage.2`
- **Problem** "A model answers from an average, which is what the context unit was about". Step 1's
  `context` is about the four layers landing in one window; the average is one of its four sections
  (`context.model-statistic`). `step1/CLAUDE.md` is precise about this ("`context` owns the
  average"), which is *owns*, not *is about*. A reader who follows the link lands on
  `context.lead.1`, which is about prompt, resources and tools sharing one block of text, and has to
  scroll to find the sentence being cited.
- **Fix** One word:

  > A model answers from an average, which is what <a href="/steps/step1/context">the context
  > unit</a> established, so an ordinary instruction gets ordinary work back.

  NL: "...waar <a …>de context-unit</a> mee begon" reads oddly; use "...wat
  <a …>de context-unit</a> vastlegde, dus op een doorsnee instructie komt doorsnee werk terug."

---

## 3. Progression

The unit builds. Five sections funnelling from the widest expectation to the most personal (market →
the meeting → the work after it → your promise → your own calibration), which mirrors the step's own
recorded "team inwards" order. Nothing is re-argued: every section leans on a unit that already
settled its engineering claim and takes one clause and a link, exactly as `step3/CLAUDE.md` requires.
The `enablement` / `change` split holds (this unit stays on one promise about one date; the queues
and the release window stay in `change`). The `engineering` three-way split holds:
`detail-nobody-specified` names **no** concrete cases, correctly leaving the enumerations to `change`
and `impostor`.

Checked and clean, so nobody "fixes" it later: `estimate-still-matters.1`'s "neither did the deploy"
looks like it is reaching into `change.process-was-bottleneck`'s territory. It is one clause with no
argument on it and it points at `enablement` instead, which is the right target for where-the-day-
goes. A second intra-step link would break the step's recorded rule that `tool-not-advantage` carries
the only one. Leave it.

One real seam.

**3. The lead hands into section two, not section one.**

- **Where** `expectations.lead.1` / `.2` into `expectations.tool-not-advantage.heading`
- **Problem** The lead is a room: colleagues, a manager who built a prototype over lunch, "what
  everybody took away is that everything now takes an afternoon", closing on "the distance between
  it and something you would put in front of a customer is where the promises go wrong". That
  paragraph sets up the demo, which is `say-what-missing`. The next thing the reader meets is "Your
  competitor is on the same models" — a different audience (the market), a different expectation
  (advantage rather than speed), and nothing bridging the two. `audit.md` item 46 records that the
  unit "opens cold, closes cold" about its neighbours; this is an internal one it does not record.
- **Fix** Do not reorder: the outward-to-inward funnel is worth keeping and `tool-not-advantage`
  is the widest belief, so it belongs first. Bridge it in the section's own first line instead,
  which also brings the section closer to what `step3/CLAUDE.md` says it is for ("what management
  believes the tool bought them"):

  > Above that meeting there is a second belief, and it is management's: the tool bought the team an
  > advantage. Your competitor is on the same models, in the same week, reading the same article
  > about them. Whatever the tooling hands you, it hands them.

  NL: "Boven dat overleg zit nog een overtuiging, en die is van het management: de tool heeft het
  team een voorsprong opgeleverd. Je concurrent zit op dezelfde modellen, in dezelfde week, en leest
  hetzelfde artikel erover. Wat de tooling jou geeft, geeft ze hen ook."

---

## 4. Readability

Four snags a reader stumbles on, one ambiguity, one drifting detail. All small, all with a verbatim
fix. None of them is "I would have phrased this differently": each names a word doing two jobs, a
referent the reader has to hunt for, or a clause that has to be re-read.

**4. "sentence" carries two different referents in adjacent sections.**

- **Where** `expectations.say-what-missing.1` and `expectations.detail-nobody-specified.1`
- **Problem** The word appears six times in 94 lines. In `say-what-missing` it is **the sentence you
  say at the demo** ("One sentence, and it buys the only thing you needed from that meeting"; "it is
  the same sentence and it is still yours to say"). One heading later it is **the sentence you gave
  the agent** ("An agent implements the sentence it was given, and the sentence was shallow"; "when
  that sentence was written"). A reader coming straight out of the demo section has to re-point the
  word mid-paragraph. Same collision in Dutch (`zin`).
- **Fix** Move the agent-side one onto the course's own noun for what you hand an agent. `steering`
  already uses it twice ("your request left out the one thing that mattered", "if it is wrong
  because your request was wrong"), so this is house vocabulary rather than a new word:

  > An agent implements the request it was given, and the request was shallow. Ask for book returns
  > and returns come back handled, tested, along the path you described. The time then goes on the
  > cases nobody had in mind when that request was written, and nobody includes you. Some of them do
  > not exist until the thing is half built.

  NL: "Een agent implementeert de vraag die hij kreeg, en die vraag was oppervlakkig. Vraag om het
  inleveren van boeken en dat komt terug, afgehandeld, getest, langs het pad dat jij beschreven
  hebt. De tijd gaat daarna op aan de gevallen die niemand in gedachten had toen die vraag
  geschreven werd, en niemand is inclusief jij. Sommige bestaan pas als het ding half af is."

**5. "Ask for returns" is the unit's one feature example and it is ambiguous.** (folded into the fix
above, but it stands on its own)

- **Where** `expectations.detail-nobody-specified.1`
- **Problem** `kata/step2/java` is a loans domain: `Loan`, `MemberTier`, `LateFeePolicy`,
  `MemberStatements`. There is no returns feature in it. In English "returns" reads as either
  returned books (which is what `change.you-test-engineer.1`'s "A book returned twice" means) or
  refunds. The Dutch commits to the second reading, `teruggaves`, which a Belgian reader will hear
  first as a tax refund. The unit's other example, "one hard-coded member", is squarely the step 2
  domain, so the page has one concrete example and one that could be from anywhere.
- **Fix** One word in English, and the Dutch follows: "Ask for **book** returns". Repo policy is
  that Dutch wins a disagreement; this is the exception, and it is worth stating in the commit, since
  the Dutch noun is the one that drifted off the domain.

**6. A three-clause sentence with a repeated noun.**

- **Where** `expectations.tool-not-advantage.1`
- **Problem** "<a>Change management</a> already showed the factor not arriving, and this is the other
  half of it, the half that holds even where the gain is real." Two commas, "half" twice, and the
  reader has to hold "the factor" while parsing "the other half of it". The skill's own rule: if a
  sentence has more than one comma, look for the full stop you skipped.
- **Fix**

  > <a href="/steps/step3/change">Change management</a> already showed the factor not arriving. This
  > is the other half, and it holds even where the gain is real.

  NL: "<a …>Change management</a> liet al zien dat die factor er niet komt. Dit is de andere helft,
  en die geldt ook waar de winst er wel is."

**7. An existential opener on an unnamed referent.**

- **Where** `expectations.tool-not-advantage.2`
- **Problem** "There is a ceiling on the free part as well." Two things at once: an opener that
  announces rather than claims (the skill's "say it straight"), and "the free part", a term the unit
  never used. The reader has to reach back to "Whatever the tooling hands you, it hands them" and
  infer that *free* means *without your own knowledge in it*.
- **Fix**

  > What the tool hands you for free has a ceiling too. A model answers from an average, which is
  > what <a href="/steps/step1/context">the context unit</a> established, so an ordinary instruction
  > gets ordinary work back.

  NL: "Wat de tool je gratis geeft, heeft ook een plafond. Een model antwoordt vanuit een gemiddelde,
  wat <a …>de context-unit</a> vastlegde, dus op een doorsnee instructie komt doorsnee werk terug."

**8. The unit's closing section opens on a forward reference.**

- **Where** `expectations.one-good-run.2`
- **Problem** "The correction you would once have applied to it is gone as well." On first pass the
  reader does not know what correction, or what "it" is. It resolves one sentence later, and
  `step3/CLAUDE.md` records why: the old opening of this paragraph was the casualty of merging the
  sixth candidate section into it, so "the section now argues before it advises". That is a knowing
  cost, but the cost lands entirely on the first eleven words, and it can be paid off without
  restoring the section.
- **Fix** Name the thing before qualifying it, which is the house's "name the term last" move
  inverted where it needs to be:

  > You used to correct a number like that by instinct, and that correction is gone too. You
  > estimated from years of having done the work, and your manager read the quality off knowing who
  > was on the team; both are readings of a job that changed shape underneath them.

  NL: "Vroeger corrigeerde je zo'n getal op gevoel, en die correctie is nu ook weg. Jij schatte
  vanuit jaren hetzelfde werk doen, en je manager las de kwaliteit af aan wie er in het team zat;
  allebei zijn dat metingen van een job die intussen van vorm veranderd is."

**9. The step's day drifts in the one sentence that would have been a callback.** (minor)

- **Where** `expectations.one-good-run.2`
- **Problem** Thursday is the step's established day for "the skeleton exists":
  `change.business-moves-closer.1` ("a working version by Thursday"), `change.way-working-decision.4`
  ("The skeleton now exists on Thursday"), and this unit's own `detail-nobody-specified.2` ("work
  which finished on Thursday"). The closing example then says "A skeleton on Friday, a green build on
  Monday", which spends a new day on the same object two sections after the old one.
- **Fix** "A skeleton on Thursday, a green build on Monday." The pair still reads as two checkpoints
  and it now picks up the exact day the unit used two sections earlier. NL: "Een skelet op donderdag,
  een groene build op maandag."

---

## 5. Imagery

**No figure. The unit does not need one, and every candidate I can construct fails the repo's bar.**
Stating that here so a later pass does not add one on general grounds.

`step3/CLAUDE.md` fixes the bar: "a picture of a claim the paragraph already makes is the thing to
cut", and the step's one drawing earns its exception by being a measurement. Against that:

- **Run-to-run spread** (`one-good-run.1`) is already drawn, by `ScriptRuns` in `step2/patterns`,
  and the sentence links straight to it. Drawing it again is the same figure in two steps.
- **Reading capacity against agent output** (`estimate-still-matters.2`) is already drawn, by
  `PipelineShift` one unit earlier: its second row *is* the verifying three lanes need against the
  verifying they get. `step3/CLAUDE.md` explicitly places that figure in `change` rather than here.
- **Where the day goes** is `LoopsPerHour` in `enablement` and `WorkflowWeights` in `workflows`.
- The only claim in the unit that nothing draws is "the honest promise is the next checkpoint rather
  than the finish", and a drawing of it (one distant date with a wide fan against a chain of near
  checkpoints with narrow ones) would be **invented numbers about uncertainty**, which is the one
  kind of figure this course has never shipped. `ModelPricing` is real, `TokenSplit` is real output,
  `ScriptRuns`'s proportions are hand-authored but they measure something a student has seen with
  their own eyes. A spread-over-horizon chart is a claim dressed as a measurement. Do not draw it.

The existing figure situation is correct as it stands. `PipelineShift` passes the bar; this unit
correctly has none.

---

## 6. Supporting tasks

**The reader is told five things and asked to do none of them.** 730 words, no card, no board, no
command. `audit.md` Table 1d item 20 records this at step level ("The step has a drawing and a deck
now and still nothing the student does") and proposes a quiz; it does not propose a card.

`step3/CLAUDE.md` states the invariant: "Nothing in the step is graded or quizzed, and that is the
decision rather than an unfinished state", and then names the escape hatch itself: "If an exercise is
ever wanted here, the honest shape is step 2's `TaskCard`, ticked once and grading nothing, and the
thing it asks for has to happen away from the keyboard." The user's brief (decision 1) licenses
exactly that for step 3. So this is a constraint the brief already revisited, not one I am proposing
to break.

**10. One `TaskCard`, ungraded, on the two moves this unit actually teaches.**

- **Where** foot of `units/expectations.html`, under the shared `<hr>` and
  `<h2 data-i18n="ui:quiz.title">Test yourself</h2>`
- **Shape** `shared/components/TaskCard.tsx` with `block="say-it-missing"`, storage key
  `kata.step3.promise` (under the `kata.step3.` prefix `shared/lib/reset.ts` clears by key shape),
  one tick for the card and never one per move.
- **Moves** (one line each, per the repo rule that anything needing a second line belongs in the
  prose above):
  1. Pick the next thing you will put in front of somebody: a prototype, a branch, a demo.
  2. Write the one sentence naming what it does not do yet.
  3. Write the checkpoint you would promise instead of the finish, and the date it falls on.
  4. Say both out loud in that meeting.
  5. Afterwards, write down what the room asked next.
- **Description** "Nothing here is graded and nothing is checked. It happens in a meeting rather
  than at your keyboard, so the tick is a bookmark."
- **Why this unit** The two things it teaches are both single sentences said to a named person on a
  named day, which is the only kind of soft-skill instruction a card can hold without pretending to
  grade it. `impostor` has nothing comparable: its material is a feeling and a repository.
- **Coordination** If the step is to get exactly one card and the brief's "structured closing
  exercise" is meant to close the step in `impostor`, this card should still be the one that
  survives, because move 5 is the only thing in the step with an outcome the student can look at
  afterwards. That is an integrator's call, not mine, and it goes in the manifest.

---

## 7. Quiz

**The unit should carry one, and it is the only unit in step 3 that should.** `audit.md` item 20
already names it and names this unit ("Fix: one three-question quiz, on `expectations`, which is the
unit with the most checkable claims in it"), and the reasoning there is right: guided mode is the
default, these are the units most likely to be read in a room, and every question below is a
show-of-hands question. It is browser-graded by `QuizPanel`, so it works with the service down,
which is the course's standing rule for anything graded outside a Java step. Step 3 currently has no
`quiz.ts` at all, so this is a new file plus a `quiz:` line in `index.tsx` and keys in both bundles.

**11. Three questions.** Situations rather than definitions, four choices each, one right, and each
wrong choice is a position a reader who half-understood the unit genuinely holds.

**`three-weeks-after-thursday`** (owns `detail-nobody-specified`)

> You demo a working feature on Thursday and the room agrees it is done. Three weeks later you are
> still on it. What ate the three weeks?

- The cases nobody had in mind when the request was written, some of which did not exist until the
  thing was half built. **correct**
- The request was too vague. A sharper one would have produced those cases in the first run.
- The agent's implementation was poor, so most of it had to be written again by hand.
- The queue: review, an environment nobody had provisioned, and the release window.

Explanation: "An agent implements the request it was given, along the path you described. A sharper
first draft does not produce the detail nobody knew about yet, so the burden moved rather than
lifted."

The second choice is the one the unit exists to correct, and `detail-nobody-specified.2` says so in
as many words. The fourth is `change`'s argument, offered here because misfiling this as a process
problem is the commonest way to get the unit wrong.

**`their-prototype`** (owns `say-what-missing`)

> A manager built a working prototype over lunch and shows it in your meeting. It has no validation
> and one hard-coded member. What do you do?

- Say what it does not do yet, out loud, in that meeting. **correct**
- Say nothing. It is their prototype, so the caveats are theirs to give.
- Write the gaps into a ticket, where the people who decide will read them.
- Build the real version first, then show what a finished one looks like.

Explanation: "The sentence gets said either way. Left out now, it is said later by somebody asking
why the feature they signed off on falls over on an empty list."

The second choice is the misconception `say-what-missing.1`'s last sentence was written against.

**`one-afternoon-quarter`** (owns `one-good-run`)

> Work that would have taken a week came back in an afternoon. Your manager asks what the team can
> commit to for the quarter. What do you give them?

- The next checkpoint and what will be true by then, because the afternoon is one sample. **correct**
- Four times the old output, since the afternoon is what the new rate looks like.
- The old estimate, since one fast run says nothing about a quarter.
- The average of the last three runs, which is as close to a rate as you can get.

Explanation: "Hand the same request over twice and it does not come back the same twice. Your old
estimate and your manager's read on quality are both readings of a job that changed shape, so the
honest promise is the next checkpoint."

The third choice is the good distractor: it sounds like the cautious answer and is wrong for the
reason `one-good-run.2` gives, that the old estimate is stale too.

---

## 8. EN / NL parity

Every prose key in the HTML has a Dutch entry; no orphan Dutch keys; no em-dash or en-dash in either
file (checked with the skill's own grep). The Dutch is a rewrite rather than a translation and reads
as Dutch throughout: "Wat iedereen eruit meenam", "moet jij ze nog altijd zeggen", "heeft nergens
meer naartoe zodra er één niet landt" are all better than a word-for-word crossing would give. In
one place it is plainly better than the English (see 14).

Two defects.

**12. The one wrong capitalisation of `één` in the entire frontend.**

- **Where** `nl.json:73`, `expectations.one-good-run.heading`
- **Problem** "Één goede run is geen snelheid". The accent is dropped from a capitalised first
  letter in Dutch: it is `Eén`. This is the only `Één` in `front/src`; there are eighteen correct
  `Eén`s, including `expectations.say-what-missing.1` two keys above it in the same file and
  `deck.expectations.velocity.title` thirty lines below it in the same file.
- **Fix** `"expectations.one-good-run.heading": "Eén goede run is geen velocity"` (see 13 for the
  second half of that line).

**13. The unit's Dutch heading and the deck's Dutch slide say different things about the same
claim.**

- **Where** `nl.json:73` against `nl.json:103`
- **Problem** The heading says `geen snelheid`, the slide says `geen <hi>velocity</hi>`. `Velocity`
  is the planning term the English heading uses and the one a Dutch-speaking team actually says out
  loud; `snelheid` is plain speed and loses the connection to what the section is about, which is a
  rate you plan with. A student who reads the unit and then sees the slide meets two names for one
  claim, in a step whose deck is the tutor's script for exactly these units.
- **Fix** Take the deck's word into the heading. The section's key slug is derived from the English
  heading, which does not change, so nothing renames.

**14. Noted, not a defect: the Dutch is better in `estimate-still-matters.2` and the English should
move to it.**

- **Where** `expectations.estimate-still-matters.2`
- **Problem** EN: "So when you say a date, say it including the part where you check the work". NL:
  "Noem dus een datum waarin het nakijken zit" ("name a date that has the checking in it"). The
  Dutch is one clause and lands; the English is a nine-word verb phrase hung off a repeated "say".
  Repo policy is that the Dutch is usually the version that was thought through, and this is a clean
  example of it.
- **Fix** English only:

  > So when you give a date, give one with the checking inside it, or "done" is going to mean two
  > different things in one room.

---

## Deck (out of scope for the unit file, into the manifest)

**15. The unit's load-bearing claim is the one not on the board.** The step's deck gives
`expectations` a divider plus three statements: `floor` (`tool-not-advantage`), `missing`
(`say-what-missing`), `velocity` (`one-good-run`). `estimate-still-matters` is carried by
`divider.2`. `detail-nobody-specified` has nothing, and `step3/CLAUDE.md` calls it "the only one of
the three the manager has to hear, and it is the reason the burden moved rather than lifted". The
same file justifies `change`'s fourth slide on precisely this ground, that the argument a room will
push back on is the one most worth having on the board. This is that argument for this unit.

Proposed, between `missing` and `velocity`, matching the existing shape:

```tsx
{
  id: 'deck-step3-expectations-tail',
  kind: 'statement',
  ns: 'step3',
  eyebrow: 'expectations.title',
  title: 'deck.expectations.tail.title',
  note: 'deck.expectations.tail.note',
},
```

- `deck.expectations.tail.title` EN "Finished Thursday, <hi>and then three more weeks</hi>"
  NL "Donderdag klaar, <hi>en dan nog drie weken</hi>"
- `deck.expectations.tail.note` EN "The detail nobody could have written down is the work after the
  demo." NL "Het detail dat niemand had kunnen opschrijven, is het werk na de demo."

---

## Verdict

**needs-work, and the writing is not the reason.** Sentence for sentence this is among the better
prose in the course: it opens on a room rather than on a topic, every section leans on a unit that
already settled its engineering claim instead of re-arguing it, it links to seven different units
and every one of those claims checks out against the file it points at, and it closes on a promise a
reader can actually make on Monday. There is nothing here I would call AI-generated. What is wrong is
that a reader finishes 730 words of the most checkable material in step 3 having been asked nothing,
looked at nothing and written nothing, which is a hole the repository's own audit has already
opened a row for; and that six sentences make the reader work harder than the argument does, chiefly
the word "sentence" doing two jobs in adjacent sections and the closing section opening on a
referent it has not given yet. The Dutch is strong and in one place better than the English, with two
small defects, one of which is the only misaccented `Één` in the whole frontend.

Priority order:

1. **Add the three-question quiz** (finding 11). Audit-backed, browser-graded, cheapest thing on this
   list that changes what the unit *is*. New `quiz.ts`, one line in `index.tsx`, keys in both bundles.
2. **Fix the "sentence" collision** (finding 4), which carries the "book returns" fix (5) with it.
3. **The doubled "rather than"** (finding 1) and the three other prose snags (6, 7, 8).
4. **The two Dutch defects** (12, 13) and the English rewrite the Dutch earns (14).
5. **Bridge the lead into `tool-not-advantage`** (finding 3).
6. **The `TaskCard`** (finding 10), coordinated with whatever the step's closing exercise turns out
   to be.
7. **The fourth slide** (finding 15) and the "context unit was about" fix (2), both one edit each.

Two things to leave alone, because they look like defects and are not: the four concrete triples
(house voice, not tricolons), and `estimate-still-matters.1`'s "neither did the deploy" (one clause
leaning on `change`, correctly not a second intra-step link).
