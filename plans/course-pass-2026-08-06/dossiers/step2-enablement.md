# step2 / enablement — audit dossier

Read first: `front/src/steps/step2/CLAUDE.md` (the unit's recorded reasoning), the unit HTML, the
registry, both locale bundles, `LoopsPerHour.tsx`, `SkillShape.tsx`, `deck.tsx`, `audit.md` rows 8,
19, 20, 22 and 50.

Measured: 369 words of prose (audit says 367), 3 sections, 4 paragraphs, 2 figures, 8 prose keys, 0
exercises, 0 quiz questions, 0 em-dashes, 8/8 Dutch entries present.

Prior art in `audit.md`, cited so it is not counted as discovery: **row 8** (the section names no
project, command or example case on purpose), **row 19** (thinnest unit in the course outside step 0;
opens cold; no closing seam), **row 20** (`enablement` does not hand into `parallel`; the fix belongs
to this unit), **row 22** (four step-2 units name the student's reading as the bottleneck and none
teaches it; this unit states it hardest), **row 50** (the stray blank line in `nl.json` splitting
`enablement.t-shaped.1` from the heading under it, and no separator before `parallel`).

---

## 1. AI tells

**None.** I went looking and found nothing worth reporting, which is worth saying plainly rather than
manufacturing a finding.

The prose is human and good. `run-own-machine.1` opens on a claim and follows it with a bare noun
fragment ("Frontend, backend, the database in a container"), which is the house move. Every paragraph
ends on its sharpest sentence: "your check on it has to keep up", "fixes it in the same pass", "A
decision you did not make is one the agent made for you." Paragraph lengths are uneven (4, 3, 7, 3
sentences), so nothing reads as symmetry. There is no tricolon rhythm, no "it's not just X", no
announcing opener, no empty intensifier, no summary paragraph, no closing gesture at significance.
The one three-item list ("follow what the agent produced, answer it, and judge whether it holds") is
a single list in 369 words, which the brief explicitly allows.

Two things I checked and cleared rather than flagged:

- "Knowing what good software engineering looks like is not" carries the negation elliptically across
  a full stop. It asks the reader to reconstruct "is not worth less than it was". It lands, and
  `CLAUDE.md` records the closing pair as load bearing. Leave it.
- The `gem` icon is placed correctly (where the full stop would go, with a trailing period because it
  ends the paragraph), in both languages.

## 2. Truthfulness

1. **Where** `enablement.where-day-goes.1` and `.2`
   **Problem** The section's whole premise is arithmetic ("count where the hours actually go") and the
   arithmetic does not close. Sentence 2 says **most** of the hours go on driving end to end *and*
   reading. Sentence 4 says the reading half alone is **most of your week**. Paragraph 2 then adds
   thinking as "the other part". Three claims, two of them "most", covering a day that has one
   hundred percent in it. A reader who is being told to count notices this.
   **Fix** Drop the first "most" and let the last one stand. Replace sentence 2 with:
   > They go on driving the system end to end and reading whether it did what you wanted.

   NL (`enablement.where-day-goes.1`): "Ze gaan op aan het systeem end to end aansturen en lezen of
   het deed wat je wilde." (rest of the key unchanged)

2. **Where** `enablement.t-shaped.1`, sentence 1
   **Problem** "it gets better at it with every release" is an absolute claim about a trend, stated
   without a frequency hedge in a course whose own writing rule is "hedge with frequency, not with
   modals". Model releases do not monotonically improve at implementation, and this is the one
   sentence in the unit that will read as dated first. Low severity, and the `CLAUDE.md` records the
   intent ("Implementation gets faster with every release"), so this is a wording repair rather than
   a change of claim.
   **Fix** > An agent implements faster than you do, and it has been getting better at it with every
   > release.

   NL: "Een agent implementeert sneller dan jij, en wordt daar bij elke release beter in." reads as
   the same absolute; "en is daar bij elke release beter in geworden" carries the frequency.

Everything else checks out against the repository. `/steps/step1/tools` exists and its `connect-one`
section is genuinely the browser server (`claude mcp add playwright -- npx @playwright/mcp@latest`),
and the unit points at it as *described there* rather than as something the student did, which is
what `CLAUDE.md` requires. `/steps/step2/engineering` exists and `engineering.lead.1` does argue what
this unit says it argues ("Good agentic projects start with good software engineering"). `/steps/step2/steering`
exists and its five sections are indeed what you do while a run is in flight. `LoopsPerHour`'s two
counts (2 and 11) match the component's `SLOW`/`FAST` arrays, and no number in the prose contradicts
the drawing. No other unit in the course claims the local-run setup or the T shape, so nothing is
told twice.

## 3. Progression

1. **Where** the unit as a whole; `enablement.title` in both bundles
   **Problem** The three sections do not build on each other and nothing on the page says what they
   share. Section 1 is your machine, section 2 is your skill profile, section 3 is your calendar. The
   only thing binding them is the unit title, **"Enablement"**, a word that appears nowhere in the
   prose in either language, that the course never defines, and that is the one abstract corporate
   noun in a step whose other titles are "Project evolution", "Steering", "Workflows", "Spending
   tokens". `CLAUDE.md` names the spine ("what has to be true around you") but the student never gets
   it. This is the unit's biggest defect and it is not the missing lead: the two drafted leads were
   `run-own-machine`'s premise restated, and cutting them was right.
   **Fix** Retitle the unit so the title *is* the spine, and leave the recorded "no lead" constraint
   untouched. The step has its own precedent for this exact move: `Goal-oriented` became `Spending
   tokens` while "the unit id, the URL and the namespace prefix all stay `goals`".
   - `en.json` `enablement.title`: `"What it asks of you"`
   - `nl.json` `enablement.title`: `"Wat het van jou vraagt"`

   It reads back onto all three sections: the agent writes in seconds so **your check has to keep
   up**; "What it asks of you moves up a level" is already sentence 2 of `t-shaped`; and
   `where-day-goes` is what it asks of your week. Id, URL, namespace, deck eyebrow key and every
   inbound reference stay exactly as they are.

2. **Where** `enablement.where-day-goes.1` last sentence and `.2` first sentence
   **Problem** "This is the other half" then, one paragraph later, "The other part is thinking." Two
   consecutive paragraphs use the same framing device for two different cuts of the day. The reader
   has just been handed a two-way split (in-flight against after-it-comes-back) and is immediately
   handed a different two-way split (driving-and-reading against thinking), with the same word doing
   both jobs. Both languages carry it.
   **Fix** Open paragraph 2 on the hours instead, which also fixes the arithmetic in finding 2.1:
   > The hours that are left go on thinking. Go through the implementation details, argue both sides
   > of them, and come out with a design decision you could defend. A decision you did not make is
   > one the agent made for you.

   NL (`enablement.where-day-goes.2`): "De uren die overblijven gaan op aan denkwerk. Loop de
   implementatiedetails door, weeg de voors en tegens tegen elkaar af, en kom eruit met een
   ontwerpbeslissing die je kan verdedigen. Een beslissing die jij niet neemt, heeft de agent voor je
   genomen."

   This keeps what `CLAUDE.md` protects (the paragraph stays about deciding, and the `code-got-cheap`
   instruction survives intact).

3. **Where** end of `enablement.where-day-goes.2`
   **Problem** No seam out of the unit. `workflows` → `enablement` → `parallel` is three units of
   bare joins. **Known: `audit.md` rows 19 and 20**, and row 20 explicitly assigns the fix here. Note
   that row 19's wording is now stale (it says the seam is into `goals`; `parallel` has since landed
   between them), so whoever closes it should re-measure. Not my discovery, listed for completeness.

## 4. Readability

1. **Where** `enablement.run-own-machine.1`, sentence 3
   **Problem** "Then you look at what your users look at" repeats the verb across the same clause and
   the reader stumbles on it. The Dutch does not do this: "Dan kijk je naar wat je gebruikers
   **zien**." See finding 8.1 below; the fix belongs to the English.

2. **Where** `enablement.t-shaped.1`
   **Problem** Considered and rejected. Seven sentences (~130 words) in one paragraph is over the
   repo's own "three or four sentences" rule, and a split after "judge whether it holds" reads
   better. But `CLAUDE.md` records that the example sits mid-paragraph *because* the opening claim and
   the closing pair are both load bearing, and a split puts the migration at a paragraph edge. The
   constraint is stronger than the gain. **Leave it.** Recorded here so the next reviewer does not
   re-open it.

3. **Where** `enablement.t-shaped.1`, "follow what the agent produced, answer it, and judge whether it
   holds"
   **Problem** Considered and rejected. "answer it" takes a diff as its object, which is slightly off
   in English, but the Dutch does exactly the same thing ("erop te antwoorden") and the sense
   (respond to it rather than nod at it) is recoverable. Below the bar for a change.

## 5. Imagery

Both figures earn their slot in principle. `LoopsPerHour` measures something the prose never states
(the prose says "your check has to keep up"; the drawing says two turns against eleven in the same
hour, with the wait drawn as absence), and it stays off `IterationPaths`'s ground exactly as recorded.
Two problems, one real and one a judgement call.

1. **Where** `loops-per-hour.wait` in `en.json:123` / `nl.json:81`
   **Problem** The legend label is a leftover from a framing that is no longer in the unit. When the
   bands read "Deploying to find out" against "With the shortcuts in", **"you wait to get there"** had
   a *there*: the deployed environment. The bands were rewritten to "Not running it locally" against
   "Running it locally" (documented in the component's docblock as the thing to watch for) and the
   legend was not. As it stands the middle segment of every turn, the segment the whole figure turns
   on, is labelled with a destination the drawing no longer has.
   **Fix** `en.json` `loops-per-hour.wait`: `"you wait for it"` / `nl.json`: `"je wacht erop"`.
   In the same patch, `loops-per-hour.turns` should read `"{{turns}} turns"` rather than
   `"{{turns}} goes"`: the English calls the same thing a *turn* in `loops-per-hour.description` and a
   *go* in the count, while the Dutch says "rondes" in both. One word for one thing, and the Dutch is
   already right.

2. **Where** `SkillShape`, under `enablement.t-shaped.1`
   **Problem** It is the weakest figure in the step against this repo's own bar. Of the three things
   it draws, two are already in the paragraph above it: keep the depth ("Keep the specialism you
   have") and add breadth (its only text label, "enough of the rest to judge it", is a near-paraphrase
   of "know enough of the contexts around it to ... judge whether it holds"). The one thing it adds
   that the prose does not is the I with the dashed absent crossbar, the shape you had before.
   **Fix** **Keep it, do not redraw it.** The misreading it prevents is real and is prevented nowhere
   else: a T with a shortened stem argues "get shallower", the component's docblock names that as the
   failure, and no sentence in the unit says the stem does not move. A drawing is the only place that
   claim can be made without a sentence that reads as a disclaimer. Flagged so the next reviewer knows
   it was weighed, not missed.

3. **No third figure.** `where-day-goes` asserts a split of your week with no measurement, which looks
   like a figure-shaped hole, and it is not one. Any honest drawing of it is a band cut into parts, and
   `LoopsPerHour` owns the band and the clock in this very unit (that ownership is why `WindowSpend`
   in `goals` is columns). A second band eight hundred pixels below the first would collide with the
   step's clearest colour and shape rule. The thing missing from that section is not a drawing, it is
   the counting the section literally asks for. See axis 6.

## 6. Supporting tasks

1. **Where** `enablement.where-day-goes.1`, sentence 1
   **Problem** The strongest instruction in the unit is **"count where the hours actually go"**, and
   the reader is never asked to count anything. This is the brief's named defect exactly: told
   something and never asked to do it. The unit has 369 words, two drawings and nothing to do, in a
   step where `evolution` closes on a fifteen-minute exercise and `engineering` closes on a card.
   `CLAUDE.md` defends the absence on the grounds that "there is nothing a card could ask for that the
   student's own project would not answer better". That reasoning is the argument *for* a card, not
   against it: a `TaskCard` grades nothing, so pointing it at the student's own project is precisely
   what it is for, and `WhereWouldItGo` already proves the shape works in this step. **I recommend
   revisiting that constraint.**
   **Fix** A `TaskCard` under an `<hr>` and the shared `<h2 data-i18n="ui:quiz.title">Test yourself</h2>`,
   after the last paragraph, so the prose still closes on "A decision you did not make is one the
   agent made for you". New component `CountTheDay.tsx`, four moves, registered as the unit's `figure`.

   ```tsx
   const MOVES = ['time', 'fit', 'tally', 'cut'] as const
   <TaskCard block="count-the-day" namespace="step2" prefix="count"
             storageKey="kata.step2.count" moves={MOVES} className="my-8" />
   ```

   Locale keys (`en`, with Dutch alongside in the same patch):
   - `count.title`: "Count your own hour"
   - `count.description`: "This one runs against whatever you are actually working on, not against the
     kata. Nothing is graded and nothing is submitted; the tick is a bookmark."
   - `count.todo`: "Mark this task done" / `count.done`: "Done"
   - `count.time.label`: "Time one loop on your own project: from asking for a change to seeing it in
     the running app."
   - `count.fit.label`: "Work out how many of those fit in an hour, and put your number beside the
     eleven in the drawing above."
   - `count.tally.label`: "Take one working day and split the hours four ways: deciding, driving,
     reading, and typing code yourself."
   - `count.cut.label`: "Name the single slowest thing in that loop, and say what it would cost to
     remove it."

   The card names no project and no command, so audit row 8's decision survives intact. It also pays
   the unit's other debt: move `fit` sends the reader back into `LoopsPerHour` with a number of their
   own, which is what turns that figure from a picture into a measurement.

2. Not proposed: a plain instruction to run `kata/step2/java` locally. `run-own-machine` names no
   project on purpose (row 8, and `CLAUDE.md` records the three sentences of two-terminal setup that
   were cut). Do not put them back.

## 7. Quiz

The unit has none, and `CLAUDE.md`'s reason is "a condition has no wrong answer to offer a question
the way a choice between four workflows does". That reason is weaker than it looks, and the course's
own artefacts say so: the `SkillShape` docblock names a specific wrong belief it is drawn to prevent
("A T drawn with a shortened stem argues 'get shallower'"). A misreading the authors think is live
enough to constrain a drawing is live enough to be a distractor. One question, not more.

**Proposed, `enablementQuiz` in `quiz.ts` (integrator's file, so it goes in the manifest):**

- **id** `t-shape-depth`
- **question** "Your specialism is the Java side, and the agent keeps handing you diffs that touch the
  database and the frontend as well. What does being T-shaped ask of you?"
- **choices**
  - `breadth` (correct): "Keep the Java depth you have, and learn enough of the other two to tell
    whether what came back holds."
  - `shallower`: "Spread yourself evenly across all three. The agent handles the depth now."
  - `deeper`: "Go deeper on Java, since that is the part you are still faster at than the agent."
  - `handoff`: "Route the database and frontend parts to the people who own them, and review only the
    Java."
- **explanation** "The stem does not get shorter. The agent handles the detail for everyone alike, so
  what is scarce is your judgement about the parts either side of your own."

`shallower` is the figure's own named misreading, `deeper` is the comfortable answer, and `handoff` is
how most teams work today, which is what makes it a distractor a reader might genuinely believe.

If the step owner would rather not reopen the recorded decision, the honest alternative is to leave
the unit quiz-free and take the `TaskCard` in axis 6 instead, which is the higher-value of the two.

## 8. EN/NL parity

All eight prose keys, all thirteen figure-label keys and all five deck keys have Dutch entries. No
em-dashes in either language. The Dutch is a rewrite rather than a gloss and reads like Dutch. Two
places where the Dutch is the truer version.

1. **Where** `enablement.run-own-machine.1` (EN, line 6 of the HTML) against `nl.json:330`
   **Problem** EN: "Then you look at what your users look at". NL: "Dan kijk je naar wat je gebruikers
   **zien**." The Dutch draws the distinction the sentence is making (you look at what they see); the
   English collapses it into a repeated verb and reads as a slip. Repo policy: rewrite the English.
   **Fix** > Then you look at what your users see, and a wrong column shows up as a wrong column
   > instead of a field name in a response body.

   Dutch unchanged.

2. **Where** `loops-per-hour.turns` in `en.json:121` against `nl.json:79`
   **Problem** English says "turns" in the figure description and "goes" in the count; Dutch says
   "rondes" in both. One vocabulary in the Dutch, two in the English. Fix given in finding 5.1.

3. Known, not mine: `audit.md` row 50 records the stray blank line in `nl.json` between
   `enablement.t-shaped.1` and `enablement.where-day-goes.heading` (line 334), and the missing
   separator where `enablement`'s block runs into `parallel`'s. Cosmetic, still open.

## 9. Cross-surface gap (restructure)

1. **Where** `deck.tsx` slides `deck-step2-enablement*` and the guided-mode rendering of the unit
   **Problem** `where-day-goes` does not exist on either class-facing surface. Guided mode drops all
   prose and keeps figures plus the heading above each, so in class the page is `Run it on your own
   machine` + `LoopsPerHour`, `T-shaped` + `SkillShape`, and nothing else: the third section vanishes
   entirely because it has no figure. The deck then repeats the omission. The divider's three points
   are `divider.1` and `divider.2` (both from section 1) and `divider.3` (section 2); the deck rule is
   that a divider "states the unit's two or three claims", and here two of three points come from one
   section. So the claim `audit.md` row 22 calls the hardest statement of the reading problem in the
   whole course ("it is most of your week") is invisible to every student in a taught session.
   **Fix** Cheapest repair, one key, no new slide. Replace `deck.enablement.divider.2` (the agent
   checking its own work is already carried by the `LoopsPerHour` slide that follows) with the third
   section's claim:
   - `en.json` `deck.enablement.divider.2`: `"Most of the week goes on <hi>reading what came back</hi>"`
   - `nl.json` `deck.enablement.divider.2`: `"Het grootste deel van de week gaat op aan <hi>lezen wat er terugkwam</hi>"`

   One point per section, and the divider then states the unit rather than its first heading. If the
   step owner would rather keep the browser-check point, the alternative is a fourth point, which the
   three-to-five range allows.

---

## Verdict

**Needs work, but the sentences are not where the work is.** Line by line this is some of the cleanest
prose in the course: zero AI tells, no em-dashes, uneven paragraphs, every one of them ending on its
best line, and a Dutch translation that was thought about rather than converted. What is wrong is
structural. Three sections that do not build on one another are held together by a title,
"Enablement", that is the one abstract corporate noun in the step and appears in neither language's
prose, so the unit reads as a bag rather than an argument. Its single strongest instruction, "count
where the hours actually go", is followed by nothing to count, in a 369-word unit with no exercise
and no quiz, sitting immediately after the densest unit in the step. The arithmetic in that same
section does not close (two different things are "most" of the same week) and the word "other" does
two different jobs in consecutive paragraphs. One figure legend still names a destination from a
framing that was cut. And the section carrying the course's hardest claim about reading is invisible
in class, on the page and on the slides alike. None of that needs a rewrite: the fixes are one title,
four sentences, three locale values and one card.

**Priority order**

1. Retitle to "What it asks of you" / "Wat het van jou vraagt", ids and URLs untouched (finding 3.1).
   This is the fix that turns three sections into one unit and it costs two locale values.
2. Add the `CountTheDay` `TaskCard` (finding 6.1). Revisits a recorded decision; the reason is stated
   there and I think the decision is wrong.
3. Repair `where-day-goes`: drop the first "most" (2.1) and reopen paragraph 2 on the hours (3.2).
   Two sentences, both languages.
4. Fix `loops-per-hour.wait` and `loops-per-hour.turns` (5.1). Three locale values, no component
   change.
5. Rewrite "what your users look at" to "what your users see" (8.1). One sentence, English only.
6. Repoint `deck.enablement.divider.2` at the third section (9.1). Two locale values.
7. Hedge "gets better at it with every release" (2.2). Low, and cosmetic against the rest.
8. Optional, and only if the step owner wants the quiz decision reopened: the single `t-shape-depth`
   question (axis 7).

Not to be touched, all checked against `CLAUDE.md` and deliberately left alone: the missing lead, the
absence of any named project or command in `run-own-machine`, the seven-sentence `t-shaped`
paragraph, `SkillShape` itself, and the placement of `LoopsPerHour` under `run-own-machine`.
