# step3 / impostor — audit dossier

**Unit:** `front/src/steps/step3/units/impostor.html` (430 words counting both halves of the one
assistant pair, so a single reader sees roughly 375). Three sections, one link, no figure, no quiz,
no task. It is unit 25 of 25 and the last page of the course.

**Read first:** `front/src/steps/step3/CLAUDE.md`. Almost everything I was tempted to change on a
first read is recorded there as deliberate, and I have dropped those. In particular I am not
touching: the bare `Maybe.`, the two-paragraph split in `feeling-from-signal`, the three-section
length, the absence of a figure, and the fact that the closing section ends on written-down work
rather than on reassurance. All four are load bearing and all four are the best things in the unit.

**Prior art:** `audit.md` rows **21** (no ending for the course), **20** (nothing the student does
in step 3), **47** (this unit's own row) and the Cadence summary already record parts of what
follows. Those are known gaps, not discoveries; I mark them where they apply and say what the fix
is, because the fix lands here.

---

## 1. AI tells

The prose is genuinely human and genuinely good. `An afternoon of deciding looks like an afternoon
of nothing.` is the best sentence in step 3. Every paragraph ends on its sharpest line, the openings
vary, there is no announcing, no "it is not just X", no summary paragraph, no em-dash anywhere in
either language. I found one aggregate defect and nothing else.

### 1.1 Four lists of exactly three, in 430 words

**Where** `impostor.lead.2`, `impostor.you-still-engineer.2`, `impostor.feeling-from-signal.1`,
`impostor.nobody-doing-long.2.claude` / `.copilot`

**Problem** Every paragraph in the unit that lists, lists three, and always in the same
comma-comma-and shape:

- lead.2: "you named the goal, you set the check that said yes, and you read what came back"
- you-still-engineer.2: "The empty list, the expired tier, the amount that is exactly zero"
- feeling-from-signal.1: "hand over smaller steps, ask the agent to walk you through the part you
  lost, or write the awkward class yourself"
- nobody-doing-long.2: "A `CLAUDE.md` that got sharper, a skill that stopped needing the same
  correction, an `audit.md` you can diff against last month"

One tricolon is fine; four in five paragraphs is the rhythm the brief names as a machine. Two of the
four are protected: the step's `CLAUDE.md` fixes the edge-case triad at three ("`change` and
`impostor` each name three concrete cases"), and lead.2's three are the three steps of the loop the
whole course teaches. So the fix is surgical, and it lands on the one that is also the unit's only
readability problem: `feeling-from-signal.1`'s second sentence carries three commas and a colon,
which is exactly what `lesson-writing` says to look for ("If a sentence has more than one comma,
look for the full stop you skipped").

**Fix** Keep all three moves, break the list into sentences. `impostor.feeling-from-signal.1`:

> One version of this is not a feeling at all. If you cannot follow the diff, that is a gap rather
> than impostor syndrome, and a gap has a fix. Hand over smaller steps. Make the agent walk you
> through the part you lost, or write the awkward class yourself. Accepting code you do not
> understand is how a codebase turns into somebody else's.

Dutch:

> Eén versie hiervan is helemaal geen gevoel. Als je de diff niet kan volgen, is dat een gat en geen
> impostorsyndroom, en een gat heeft een oplossing. Geef kleinere stappen door. Laat de agent je door
> het stuk lopen dat je kwijt bent, of schrijf de lastige klasse zelf. Code aanvaarden die je niet
> begrijpt, is hoe een codebase die van iemand anders wordt.

That also buys the short sentence the section is missing, and it costs nothing.

---

## 2. Truthfulness

### 2.1 "a couple of years old" is the only dating claim in a step written not to date

**Where** `impostor.nobody-doing-long.1`

**Problem** "The tools this course is about are a couple of years old, and they changed twice while
it was being written." Two things. First, the age is a moving number nobody will come back and
update, and the step's own `CLAUDE.md` argues precisely against that shape: `way-working-decision`
stops at the question rather than naming a replacement "because a section that named a replacement
would be the one thing in the step that dates". This sentence is the thing that dates. Second, this
paragraph carries no `data-assistant` attribute, so a Copilot reader gets it too, and GitHub Copilot
shipped in 2021. To that reader the claim is simply wrong by three years. The "changed twice" half
is the author's own claim about their own course, it is corroborated on at least one count by
`copilot-specific.md` ("Copilot's billing changed under this course once already"), and it is the
half worth keeping.

**Fix** Cut the age, keep the change. `impostor.nobody-doing-long.1`:

> These tools changed twice while this course was being written. Whoever sounds certain about them
> read something last week, the same as you. There is no decade of practice here to be behind on.

Dutch:

> Deze tools veranderden twee keer terwijl deze cursus geschreven werd. Wie er zeker over klinkt, las
> vorige week iets, net als jij. Er is hier geen decennium ervaring om op achter te lopen.

Same three sentences, same close, nothing that expires.

### 2.2 "the expired tier" names a case the domain the reader just hardened does not have

**Where** `impostor.you-still-engineer.2`

**Problem** "The empty list, the expired tier, the amount that is exactly zero". The reader arrives
here two units after `change.you-test-engineer`, whose three cases are all loans-domain cases ("A
book returned twice. A return dated before the loan. A member deleted while their statement was
being rendered"), and one step after spending 2 to 4 hours inside `kata/step2/java`. So the triad
reads as the same domain. It is not: `MemberTier` is `STUDENT | STANDARD | SENIOR | STAFF`
(`kata/step2/java/src/main/java/be/smartagents/kata/java/step2/domain/`), there is no expiry on it
and no date anywhere near it. A student who goes to look finds nothing. The other two items are
universal and survive the check; this one pretends to be concrete and is not. (The phrase is a
survival of the cut `enablement.fitness-tests` section, recorded verbatim in
`front/src/steps/step2/CLAUDE.md`, so it was authored generically rather than against `MemberTier`.)

**Fix** Replace the middle item with one that is true everywhere and echoes neither `change`'s list
nor the domain. `impostor.you-still-engineer.2`:

> It is not. The empty list, the amount that is exactly zero, the field somebody left null: an agent
> writes the happy path and leaves those out, and the person who names them is the reason the module
> holds up. Nobody watches that work happen.

Dutch:

> Dat is het niet. De lege lijst, het bedrag dat exact nul is, het veld dat iemand null liet: een
> agent schrijft het happy path en laat die eruit, en wie ze benoemt is de reden dat de module
> overeind blijft. Niemand ziet dat werk gebeuren.

### 2.3 The one link says something about `enablement` that `enablement` does not say

**Where** `impostor.you-still-engineer.1`

**Problem** "Implementation is the part that moved, and enablement argues where it moved to." The
nearest antecedent for "it" is *implementation*, so the sentence promises that `enablement` says
where implementation went. It does not. `enablement.t-shaped` argues that "what it asks of *you*
moves up a level" — the reader moved, not the implementation. The step's `CLAUDE.md` confirms the
intent ("`impostor.you-still-engineer` hands the level-moved-up argument to `enablement`"), so this
is a slipped pronoun rather than a wrong link, and the Dutch has slipped identically ("en enablement
zegt waarnaartoe"). It is small, but this is the unit's only link and it is a claim about another
unit, which is the class of claim the house rules say must be exact.

**Fix** `impostor.you-still-engineer.1`:

> Implementation is the part that moved off your desk, and <a href="/steps/step2/enablement">
> enablement</a> argues what the job moves up to instead. What is left for you is judgement, and
> judgement shows up nowhere at five o'clock. An afternoon of deciding looks like an afternoon of
> nothing.

Dutch:

> Implementatie is het stuk dat van jouw bureau verdween, en <a href="/steps/step2/enablement">
> enablement</a> zegt naar welk niveau de job dan opschuift. Wat overblijft is oordelen, en oordelen
> is om vijf uur nergens te zien. Een namiddag beslissen lijkt op een namiddag niets doen.

### Verified and correct (no change)

- `audit.md` exists at the repo root and is introduced to the student in `step2/workflows`
  (`workflows.html:87`), so naming it here is not a term arriving cold.
- `CLAUDE.md` / `.github/copilot-instructions.md` pair is present and correctly shaped: both siblings
  carry `data-assistant`, both keys end in the assistant word, both have Dutch. This matches the
  step `CLAUDE.md`'s record that this is one of the step's two pairs, and matches the rule that
  `audit.md` and *skill* stay shared.
- The edge-case triad does **not** collide with `change`'s three cases, which the step `CLAUDE.md`
  explicitly guards. Verified different in both content and register.
- No em-dash or en-dash anywhere in this unit's English or Dutch.

---

## 3. Progression

### 3.1 The course ends without ending (audit row 21)

**Where** `impostor.nobody-doing-long.2.*`, the last block of the last unit of the last step

**Problem** This is the final page of a four-step, twenty-five-unit course and the last sentence
closes the *section*. Nothing says the course is over, nothing names what the reader now has, and
nothing points at the only place the work continues, which is their own repository. Step 1's `recap`
already does this job at a step boundary and is the shape to copy. This is `audit.md` row 21, and
its proposed fix ("two sentences at the end of `impostor`") is right; the constraint the audit does
not carry is that the addition must not soften the close. The step `CLAUDE.md` is explicit:
"`nobody-doing-long` closes on written-down work rather than on the feeling ... the answer the step
offers is a repository, not encouragement." So the ending has to *continue from* the repository, not
add a warm sentence after it.

**Fix** A new paragraph after the assistant pair, keyed `impostor.nobody-doing-long.3` (the pair
occupies position 2, so `.3` is the next location). Assistant-neutral, so no second variant:

> That is the last unit. Step 1 told you that between two messages an LLM keeps nothing, and you are
> finishing with the files that carry what it would otherwise forget. Everything after this happens
> in a repository nobody set up for you.

Dutch:

> Dit is de laatste unit. Stap 1 zei je dat een LLM tussen twee berichten niets bijhoudt, en je
> eindigt met de bestanden die dragen wat het anders vergeet. Alles na dit gebeurt in een repository
> die niemand voor jou heeft klaargezet.

Two things checked before proposing it. `context.model-stateless.1` is "Between two messages an LLM
keeps nothing", so the callback quotes the course rather than paraphrasing it; and `context` is unit
4 of step 1, so the sentence says "Step 1 told you" rather than "step 1 opened with", which would
have been false. It adds no third metaphor and no encouragement.

### 3.2 A lean with no link

**Where** `impostor.you-still-engineer.2`

**Problem** The step's own rule is that a section leaning on an engineering claim already argued
elsewhere gets "a link and one clause". This paragraph takes the clause ("an agent writes the happy
path and leaves those out") and no link. Its home is `step2/engineering`'s quality gates, and the
same claim's other appearance in this step, `change.you-test-engineer.2`, is properly linked. So the
unit is one link short of the pattern it otherwise follows, and it is the unit `audit.md` row 47
already flags as having only one.

**Fix, with a caveat you should weigh before taking it.** The obvious target is
`change.you-test-engineer`, one step-3 unit away, and that would break something recorded: the step
`CLAUDE.md` says `expectations.tool-not-advantage` carries "the step's only intra-step link". Adding
a second one costs that. The cheaper move is to point at step 2 like every other lean in the step:

> ... an agent writes the happy path and leaves those out, and the person who names them is the
> reason <a href="/steps/step2/engineering">the gates</a> have something to hold. Nobody watches that
> work happen.

I rank this last of everything in the dossier. If you would rather leave it at one link because the
paragraph's own claim is about worth rather than about engineering, that is a defensible reading and
the unit loses nothing.

### What builds correctly (no change)

The three sections run reassert → diagnose → normalise, and that arc is right: you cannot tell
someone the feeling is common until you have separated it from the case where it is not a feeling.
`feeling-from-signal` before `nobody-doing-long` is the correct order and the bare `Maybe.` is the
best line in step 3. The lead's antecedent-free "It lands" works because `UnitPage` renders
`<h1 id="unit-title">Impostor syndrome</h1>` directly above it. Nothing here re-argues a claim
another unit owns beyond the one clause the rules allow.

---

## 4. Readability

Nothing beyond 1.1, which is the only sentence in the unit that runs past its own punctuation. Every
heading describes its section, every heading is a claim or a plain label in sentence case, no jargon
arrives undefined (`diff`, `skill`, `session`, `run` are all established by step 2), and the
paragraph lengths are uneven in the way the house voice asks for. This axis is clean.

---

## 5. Imagery

**No figure belongs in this unit, and I want that on the record rather than left as a silence.**

The step `CLAUDE.md` sets the bar: a figure must be a measurement, "a picture of a claim the
paragraph already makes is the thing to cut", and `PipelineShift` earns its exception by measuring
verifying-needed against verifying-got. I tested the two candidates this unit offers and both fail:

- *Judgement is invisible at five o'clock* — a day drawn as artefacts-produced against
  decisions-made. This measures nothing; the numbers would be invented, and it is a picture of
  `you-still-engineer.1`'s closing sentence, which already lands harder than any drawing of it.
- *Gap against feeling* — a two-branch split of "cannot follow the diff" versus "followed every
  line". This is a flowchart of one paragraph's structure. It is the exact shape the bar exists to
  reject.

So: correctly undrawn, and **the existing zero is right**. What follows from that is section 6: the
guided-mode consequence of having no figure has to be solved with a task, not by lowering this bar.

---

## 6. Supporting tasks

### 6.1 The last page of the course renders blank in the default mode

**Where** `front/src/steps/step3/index.tsx`, the `impostor` unit entry

**Problem** Mode defaults to **guided** (`front/CLAUDE.md`, `shared/mode/`), and guided mode drops
every run of prose, keeping only figures, quizzes and boards, which come from the registry. This
unit has none of those. `StepContent` renders `null` when nothing survives, so in class the final
page of a twenty-five-unit course is a step eyebrow, a title and a pager. `expectations` immediately
before it is the same, so the course closes on two consecutive blank pages in the mode a room
actually uses. `audit.md` implies this in the Cadence summary (`change` is "the one unit here that
renders something in guided mode") but does not name it as a rendering defect, which is what it is.

**Problem, second half** The user's own decision, recorded in the brief, is that step 3 gets "a
structured closing exercise that is explicitly not graded rather than a fake board". `impostor` is
the closing unit. The step `CLAUDE.md` has already specified the shape and the constraint: "the
honest shape is step 2's `TaskCard`, ticked once and grading nothing, and the thing it asks for has
to happen away from the keyboard." So this is not me overriding a recorded decision; it is the one
place in the step where the recorded decision has a slot waiting for it.

**Fix** A `TaskCard` wrapper, `front/src/steps/step3/WhatYouTakeBack.tsx`, wired through the registry
as `figure:` (not `inlineFigures:`) on the `impostor` unit. `UnitPage` renders `unit.figure` outside
`StepContent`, so it survives the guided cut and fixes both halves at once. It is the same shape as
`WhereWouldItGo` in step 2. Four moves, one per unit of the step plus one that leaves the room, none
of them at a keyboard:

| move slug | what it asks |
| --- | --- |
| `constraint` | Name one practice on your team that a constraint you no longer have put there. |
| `promise` | Take the next date you have promised somebody, and write down the checking that has to fit inside it. |
| `judgement` | Write down one decision you made this week that produced no code, and what it would have cost the project not to be made. |
| `say` | Take one of the three to somebody on your team this week. Out loud, not in a document. |

`block: 'what-you-take-back'`, `namespace: 'step3'`, `prefix: 'take'`,
`storageKey: 'kata.step3.take'` (inside the `kata.step<N>.` prefix, so `shared/lib/reset.ts` clears
it by key shape). Ungraded, one tick, and it needs the shared
`<h2 data-i18n="ui:quiz.title">Test yourself</h2>` written into the HTML above it, the way
`step2/engineering` does. Card title and per-move Dutch go in the patch; the card takes **no**
`description` key, on `WhereWouldItGo`'s rule that the prose above already sets the scene.

One thing to hold: the third move is the only one that touches `impostor`'s own argument, and it is
deliberately the one that asks for the invisible work to be written down, which is the section's
claim turned into something the reader does. Do not let the card grow a fifth move about feelings.

---

## 7. Quiz

**This unit should not have one, and I am not proposing one.** Its three claims are that judgement is
invisible, that a comprehension gap is not the same as a feeling, and that nobody has a decade of
this. A question about any of them has no distractor a reader might genuinely believe and be wrong
about; the wrong answers would all be strawmen ("push through and accept the diff"), which is the
failure mode `quiz-writing` exists to prevent. `audit.md` row 20 reaches the same conclusion from the
other direction and places step 3's one quiz on `expectations`, "the unit with the most checkable
claims in it". I agree: `expectations` has dates, promises and run-to-run spread in it, and this unit
has none of that.

The nearest thing to an askable question here is the gap/feeling diagnostic, and it is worth noting
as the fallback if the TaskCard in §6 is rejected: *You have read a diff twice and still cannot say
why one of the changes was needed. What is that?* with distractors "impostor syndrome, everyone feels
it" / "a sign the agent chose badly" / "a comprehension gap, and the fix is smaller steps" / "normal;
you did not write it, so you will never read it as fast". Two of those are things people genuinely
believe. But a one-question quiz on the last page of the course is a worse ending than a closing
exercise, so take §6 first.

---

## 8. EN/NL parity

**Parity is complete.** All twelve prose keys in the HTML have Dutch entries, plus `impostor.title`
in both bundles, plus all five deck keys in both. No missing entry, no orphan. The Dutch is a rewrite
rather than a tracked translation, which is what the rules ask for, and in one place it is better
than the English: `Het komt binnen` for "It lands" is the idiom a Dutch speaker would actually reach
for. Three defects, all small, all in the Dutch.

### 8.1 The Dutch and the Dutch deck disagree about "adds up"

**Where** `impostor.nobody-doing-long.2.claude` / `.copilot` (nl) against `deck.impostor.divider.3`

**Problem** The unit says "Wat wel opbouwt, is wat je opgeschreven hebt." `Opbouwen` is transitive in
Dutch; intransitively it wants `zich opbouwen` or `aangroeien`, so the clause reads slightly wrong.
The deck already has the right verb for the same English ("Wat optelt is wat je opschreef"), so a
tutor projecting the Dutch deck says one word and the Dutch page says another.

**Fix** Both halves of the pair: `Wat wél optelt, is wat je opgeschreven hebt.` (Rest of the sentence
unchanged in both variants.)

### 8.2 The Dutch deck and the Dutch page name the same section differently

**Where** `impostor.feeling-from-signal.heading` (nl) against `deck.impostor.signal.title` (nl)

**Problem** English is identical in both ("Tell the feeling from the signal"). Dutch is not: the page
says "Haal het gevoel en het signaal uiteen", the slide says "Onderscheid het gevoel van het
signaal". Both are good Dutch; having two is the defect, and a projector plus a laptop is exactly the
situation `front/CLAUDE.md` says the figure-sharing rule exists to avoid.

**Fix** Take the deck's, which is tighter, and move it onto the page:
`"impostor.feeling-from-signal.heading": "Onderscheid het gevoel van het signaal"`. Note this is a
heading, so the section slug is derived from the **English** heading and no keys move.

### 8.3 `elke lijn`

**Where** `impostor.feeling-from-signal.2` (nl)

**Problem** "Je volgde elke lijn" for "You followed every line". The Dutch for a line of text or code
is `regel`; `lijn` is the geometric one. It is heard in Flemish IT speech, so this is the weakest
finding in the dossier, but the course elsewhere uses precise Dutch and this is the last unit.

**Fix** `Je volgde elke regel, je weet waarom het werkt, ...`

---

## 9. Off-unit: the deck ends mid-unit

**Where** `front/src/steps/step3/deck.tsx` (integrator-owned; recorded here for the manifest)

**Problem** The step-3 deck runs 13 slides and its last is `deck-step3-impostor-signal`, "A diff you
cannot follow is a gap with a fix." That is the unit's *middle* section. `nobody-doing-long` has no
slide, so the deck for the whole course ends on a diagnostic rather than on the argument the step
`CLAUDE.md` calls the answer the step offers ("a repository, not encouragement"). What makes it
visible is that `deck.impostor.divider.3` already promises it: "What adds up is **what you wrote
down**" is stated on the divider and then never delivered.

**Fix** One `statement` slide after `deck-step3-impostor-signal`, id `deck-step3-impostor-written`,
eyebrow `impostor.title`, title `deck.impostor.written.title`, note `deck.impostor.written.note`.
Suggested text:

- EN title: `What adds up is <hi>what you wrote down</hi>`
- EN note: `Nobody has been doing this long. The repository is the only thing that has.`
- NL title: `Wat optelt is <hi>wat je opschreef</hi>`
- NL note: `Niemand doet dit al lang. De repository wel.`

If §3.1's closing paragraph lands, this slide is also the course's last slide and should carry it,
which is a second reason to add it rather than leave the deck stopping a section early.

---

## Verdict

The writing in this unit is the best-per-word in step 3 and among the best in the course: four of
its five paragraphs end on a line worth remembering, the `Maybe.` is a move no generated draft makes,
and the gap-versus-feeling distinction is a genuinely useful thing to have said to an engineer. On
prose alone I would leave it almost untouched. What is wrong with it is structural and it is
entirely about its **position**: this is the last page of a twenty-five-unit course, and it does not
know that. It does not say the course has ended, it asks the reader for nothing, and in the default
mode it renders as a title and a pager with the page body empty. Two of those three are already
written down in `audit.md` and one of them has an explicit user decision behind it. The unit is
strong; the ending is missing. Everything else below the top three is a sentence or a word.

Priority order:

1. **§6.1 — the closing `TaskCard`.** Fixes the blank guided page, discharges the user's recorded
   decision about step 3, and gives the course something to end on that the reader does. New file
   plus a registry line plus one `<h2>` in the HTML.
2. **§3.1 — two sentences ending the course** (`impostor.nobody-doing-long.3`, EN + NL). Audit row
   21. Must continue from the repository, not comfort anybody.
3. **§2.1 — cut "a couple of years old"** from `nobody-doing-long.1`. The one sentence in the unit
   that is wrong for half the readership and expires for the other half.
4. **§9 — one deck slide** so the course's deck stops a section short of its own argument.
5. **§1.1 — break `feeling-from-signal.1` into sentences.** Fixes the tricolon rhythm and the unit's
   only overlong sentence in one edit.
6. **§2.2 — "the expired tier" → "the field somebody left null."** A concrete that is not concrete.
7. **§2.3 — the `enablement` pronoun**, EN and NL together.
8. **§8.1, §8.2, §8.3 — three Dutch words.**
9. **§3.2 — the missing link.** Optional, and weigh it against the recorded intra-step-link
   singleton before taking it.
