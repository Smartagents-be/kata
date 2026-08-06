# Dossier: step1 / `prompt` ("Your prompt")

Read: `BRIEF.md`, `front/src/steps/step1/CLAUDE.md` (all 917 lines), `units/prompt.html`,
`index.tsx`, `quiz.ts`, `locales/{en,nl}.json`, `PromptInContext.tsx`, `BundleCompare.tsx`,
`ExactAsk.tsx`, `deck.tsx`, `audit.md` (Tables 1b and 2), `.claude/skills/lesson-writing/SKILL.md`,
`copilot-specific.md`, `kata/step1/java/`.

**Known gaps I am not claiming as discoveries.** Audit item **27** (row 4 of Table 2): the unit
"opens with no reference to `tokens`" and "ends on a bare figure with no closing sentence", fix a
closing line into `tools`. Audit item **3**: no unit defines the word *context* any more, and
`prompt.instruction.3` is one of the two places the course then uses it as an ordinary word.
Both are recorded and documented as deliberate or already scheduled.

**One structural observation before the axes.** `front/src/steps/step1/CLAUDE.md` gives a
documented section to `tokens`, `tools`, `context`, `session`, `harness`, `model`, `truth`,
`workshop` and `recap`. It gives **none to `prompt`**. What exists is ordering constraints (lines
28-46, 88) and the note in `PromptInContext.tsx`. So this unit is the least protected page in the
step: nothing records why its sections are shaped the way they are, and nothing would stop the next
editor from re-adding the context definition into a section that no longer flags it. Several
findings below are cheap precisely because no invariant covers them, which is a warning as much as
an opportunity.

Also worth recording: `index.tsx:60` still says "That makes `prompt` the unit that defines the word
context", and `CLAUDE.md:88` still says "The word *context* is likewise not used before `prompt`
defines it". Both contradict `CLAUDE.md:31-35` and the HTML comment at the top of `prompt.html`.
Two stale internal docs, no student impact, but they will mislead the next editor into putting the
definition back.

---

## 1. AI tells

The prose here is **genuinely human and mostly good**. Short declaratives, a willingness to state a
view ("Most people have that the other way round"), fragments used on purpose, uneven paragraphs. No
tricolon rhythm, no "it's not just X", no announcing openers, no summary paragraph, no closing
gesture at significance. No em-dashes (grepped, clean). I am not going to manufacture tells. Three
sentences do violate the house's own rules and are worth the edit.

1. **Where:** `prompt.instruction.1`
   **Problem:** Gloss. "It cascades, each step building on the one before" says *cascade* and then
   explains *cascade*, which is the exact move `lesson-writing`'s "Cut the gloss" names. "sets a lot
   more in motion" is also the vague-grand register the house voice avoids: it names no thing.
   **Fix:** replace the first two sentences with
   > A prompt is an instruction, and it cascades. So make sure your prompt actually says what you
   > want the model to do. Any inaccuracy in it only compounds from there.

   NL: `"Een prompt is een instructie, en ze werkt als een cascade. Zorg er dus voor dat je prompt
   echt zegt wat je het model wil laten doen. Elke onnauwkeurigheid erin stapelt zich alleen maar
   op."`

2. **Where:** `prompt.instruction.4`
   **Problem:** "Worth knowing that the thinking is not only about your question" opens on a filler
   frame. `lesson-writing` bans exactly this family ("Cut 'it is worth noting that'") and asks for a
   cold open on the claim. The Dutch does not have it: "Nog dit: dat nadenken gaat niet alleen over
   jouw vraag." The Dutch is the better sentence. (See axis 8.)
   **Fix (EN):**
   > That thinking is not only about your question. It also covers the agent's own moves, which file
   > to open next and what to hand itself as input for the step after that.

3. **Where:** `bundle-compare.hint` (figcaption under `BundleCompare`)
   **Problem:** "This compounds: the more messages you send, the bigger the context gets." This is a
   caption explaining the drawing, which breaks the rule the repo states for `truth`'s two figures
   ("a caption states provenance and the prose does the explaining") and which the user's own memory
   records. Worse, it repeats the sentence eight lines above it in `what-steer-after.2` ("it
   compounds"). The figure already prints `requests: 3 · messages on the wire: 12`, which is the
   claim measured; the caption is the claim asserted a third time.
   **Fix:** delete the `<figcaption>` and the `bundle-compare.hint` key from both bundles. If a
   caption is wanted, it should carry provenance, not the moral: the tally is what argues.

---

## 2. Truthfulness

1. **Where:** `prompt.what-steer-after.3` (and `nl.json:426`)
   **Problem:** **`ExerciseController` does not exist in this repository.** Grepped the whole tree:
   the only two hits are this paragraph and its Dutch twin. The controllers that exist are
   `kata/step1/java/.../TitleController.java` and `kata/step2/java/.../web/LoanController.java`. The
   class is a residue of the retired free-text exercise backend (root `CLAUDE.md`: "no `exerciseId`
   is left in the tree"). This is the course's showcase example of concreteness, in the unit that
   teaches *be exact*, naming a class a student cannot open. It is also the worked example inside
   `.claude/skills/lesson-writing/SKILL.md` (twice: "Concrete before abstract" and "Define by
   contrast, with something real"), so the skill teaches the rule with an artefact that violates it.
   **Fix (EN):**
   > Be exact about what changes. "Fix the login" and "make <code>TitleController</code> return a 404
   > when the catalogue comes back empty" go to the same model. One is specific and lets the model
   > focus. The other makes the model guess.

   NL: `"Wees exact over wat er moet veranderen. \"Fix de login\" en \"laat <code>TitleController</code>
   een 404 teruggeven als de catalogus leeg terugkomt\" gaan naar hetzelfde model. De ene is specifiek
   en laat het model focussen. De andere laat het model gokken."`
   **Ripple:** update both worked examples in `lesson-writing/SKILL.md` in the same change, or the
   next author copies the dead class straight back in.
   (The `makes the model guess` half of this fix is finding 3.4; take both or neither.)

2. **Where:** `prompt.instruction.2`
   **Problem:** "That working over is the **reasoning level**, and it runs from low up to max." I
   cannot verify this scale, and neither, apparently, has anyone else: `copilot-specific.md` is
   otherwise meticulous (it dates every claim and names what is unverified) and it contains **no
   section on reasoning levels at all**, while explicitly verifying plan mode for both products. The
   block carries no `data-assistant`, so a Copilot CLI reader is told a scale their harness may not
   expose. Second half of the same problem: the unit tells the student to "weigh when you need more
   reasoning, and when you need less" and **never says where the dial is**, in either product. Every
   other actionable claim in this step names its command (`/clear`, `/context`, `claude mcp add`,
   plan mode).
   **Fix:** two things. (a) Verify the scale against both products and record the date in
   `copilot-specific.md` the way every other product claim there is recorded; if the wording is
   Claude-specific, either soften it ("low to max in Claude Code") or split it on `data-assistant`.
   (b) Add the mechanism to `instruction.3`, one clause, e.g. "You set it per prompt rather than per
   project", or name the control. A dial the reader is told to weigh and never told to find is the
   one place this unit tells without showing.

3. Everything else checks out. Plan mode's behaviour ("blocked from editing until you approve") is
   verified for both products in `copilot-specific.md`. `/clear` is correctly left ungated
   (`CLAUDE.md:903`). `BundleCompare`'s arithmetic is honest: at step 6 the drip column really is 3
   requests and 12 messages against 1 and 3, `P1` really does appear three times, and the nesting
   `R2 ⊃ R1 ⊃ P1` is the duplication drawn rather than asserted. `ExactAsk`'s `mb-8` really is 32px,
   so the drawn band measures what the source says.

---

## 3. Progression

1. **Where:** `prompt.what-steer-after.2` against `context.entropy.*`
   **Problem:** **The term *entropy* is named-last twice, two units apart, and neither page points at
   the other.** Here: "That rising disorder is entropy, and it compounds." In `context`:
   `<h2 id="entropy">Entropy</h2>` plus "That is entropy: disorder in the window rises with every
   turn unless somebody spends energy pushing it back down", an in-page anchor from
   `context.bad-context-bad.4`, a deck slide, and a `contextQuiz` question. `context` plainly owns
   the word. This is the one duplication in step 1 that the step's `CLAUDE.md` does not record as
   deliberate, and it breaks the rule the same file enforces everywhere else ("`harness.coordinator.3`
   points back at that section rather than growing into a second definition").
   **Fix:** take the naming out of `prompt` and leave the mechanism, which is all this paragraph
   needs:
   > Bundle what you want within one part of the application. Every follow-up is another turn, and
   > every turn adds noise the next turn has to read past. It compounds. Three separate questions
   > leave the window messier than one question covering all three.

   NL: `"... Elke vervolgvraag is een extra beurt, en elke beurt voegt ruis toe waar de volgende beurt
   doorheen moet lezen. Het stapelt op. Drie losse vragen laten het venster rommeliger achter dan één
   vraag die de drie samen dekt."` Leave `context` untouched: it is the better telling and it has the
   anchor, the heading and the quiz behind it.

2. **Where:** `prompt.meta-prompting.2`, `prompt.plan-mode.2`
   **Problem:** The unit spends `model`'s vocabulary five units early and never names the owner:
   "Spend an **expensive model** on this", "the **top tier** is cheap here", "precision was the
   missing ingredient all along, not **model size**". `model` (unit 7) is where tiers are taught, and
   it points *back* here by name and link. The pointer runs one way only. The step already has the
   right habit in the unit immediately before this one: `tokens` carries two forward pointers, "each
   in one paragraph naming the unit that owns it" (`CLAUDE.md:208-211`).
   **Fix:** one clause on `meta-prompting.2`, matching `tokens`' shape:
   > Spend an expensive model on this. Writing a prompt is a few hundred tokens next to executing
   > one, so the top tier is cheap here. Which tiers there are, and what they cost, is
   > <a href="/steps/step1/model">the unit on the model</a>. Running the task is where the money goes.

3. **Where:** `prompt.lead.1`
   **Problem:** "Of everything a model is handed it is usually the smallest." Smallest of *what*?
   The reader is at unit 2 of ten and the other things a model is handed are not named here, not
   named in `tokens`, and not drawn: `PromptInContext` deliberately shows one oval with nothing
   beside it, and the figure that actually measures share by volume is `SessionMakeup`, five units
   later. So the unit's first claim is a comparison the reader cannot check for five pages. This is
   adjacent to audit item 27 but is not the same complaint (that one is about the seam with
   `tokens`).
   **Fix:** cheapest honest repair is a forward pointer in the same clause, e.g. "...it is usually
   the smallest, and <a href="/steps/step1/session">the session</a> is what dwarfs it." Or accept it
   and let finding 5.3 carry the weight. Do **not** fix it by drawing the other layers into
   `PromptInContext`: that is a documented prohibition (`PromptInContext.tsx:7-14`).

4. **Where:** `prompt.what-steer-after.3` last sentence
   **Problem:** **The unit contradicts itself on one verb.** `instruction.2` teaches that making the
   model think is the *good* move: "Turn it up and the model reflects on your question rather than
   answering it straight... what comes back is closer to what you actually meant." The unit's closing
   sentence then makes it the failure: "The other makes the model think." A reader who took the first
   paragraph seriously reads the last one as an argument for vagueness. The Dutch has it identically
   ("De andere doet het model nadenken"), so this is not drift, it is the same fault in both.
   **Fix:** `The other makes the model guess.` / `De andere laat het model gokken.` That is also the
   truer claim: with two fields both labelled Name, a vague ask leaves the model picking one.

---

## 4. Readability

1. **Where:** `prompt.instruction.heading` ("Instruction")
   **Problem:** **The heading does not describe the section.** One of the four paragraphs is about a
   prompt being an instruction; the other three are the reasoning level, its cost, and what it covers.
   `lesson-writing` is explicit ("When the section is about a named thing, the heading is the name")
   and equally explicit that a four-paragraph section is a smell ("A section is a heading and one or
   two paragraphs. Three is already a sign"). The consequence is concrete rather than aesthetic:
   `model.reasoning-level.1` opens **"You met the reasoning level in
   <a href='/steps/step1/prompt'>the prompt unit</a>"**, and a student who follows that link lands on
   a page with no heading of that name and has to scan a section called "Instruction" to find it.
   The step's own CLAUDE.md calls this boundary load bearing ("`prompt` owns the reasoning level and
   `model` owns the tier, and the section titled 'Reasoning level' exists only to keep them apart"),
   and the owner is the page that does not say the words in a heading.
   **Fix:** split. `Instruction` keeps `instruction.1` alone. New `<h2 data-i18n="prompt.reasoning-level.heading">Reasoning level</h2>`
   takes the other three, renaming `prompt.instruction.2/3/4` → `prompt.reasoning-level.1/2/3` in
   `prompt.html` and `nl.json` (keys are locations; the slug rule is mechanical here, no small words
   to drop). NL heading: `"Reasoning level"` (the term stays English, as it already does inside the
   Dutch paragraph). Ripples to visit in the same change: the HTML comment above `instruction.2`
   which names `model.reasoning-level.1`; `audit.md` item 3, which quotes `prompt.instruction.3` by
   key; and nothing else (grepped: no other file references these keys).

2. **Where:** `prompt.what-steer-after.heading` ("What you steer after that")
   **Problem:** Anaphoric and vague. "That" points at plan mode, which is not what the section is
   about. What is actually under it is three unrelated instructions (clear on a subject change,
   bundle related asks, be exact) and two figures. `lesson-writing`: "Headings are claims or plain
   labels", "Never 'Understanding X', never a gerund, never a question." This is the leftovers-bin
   heading of the unit, and it is the only one in step 1 in that shape.
   **Fix (cheapest, keeps the section whole):** rename to a plain label naming the thing, e.g.
   `Steering the ask` / NL `Sturen op de vraag`. **Better (my recommendation):** split it in two,
   which also puts each figure under the sentence that earns it:
   - `<h2>Bundling</h2>` taking `what-steer-after.1` and `.2` plus `BundleCompare` (the `/clear`
     paragraph is the same argument seen from the other end: both are about not letting one window
     carry two jobs).
   - `<h2>Be exact</h2>` taking `what-steer-after.3` plus `ExactAsk`.

     This costs the same key rename as finding 4.1 and it makes the deck's own division
     (`deck-prompt-bundle`, `deck-prompt-exact` are already two slides) match the page.

3. **Where:** `prompt.instruction.2`
   **Problem:** Minor, but a real stumble. "Models work the question over before they answer. A
   prompt is seldom enough on its own to carry everything you meant by it. That working over is the
   reasoning level..." The demonstrative "That working over" reaches back across an intervening
   sentence with its own subject. Read aloud, the reader hunts for the antecedent.
   **Fix:** swap the first two sentences:
   > A prompt is seldom enough on its own to carry everything you meant by it. Models work the
   > question over before they answer, and that working over is the <strong>reasoning level</strong>.
   > It runs from low up to max. Turn it up and the model reflects...

---

## 5. Imagery

1. **Where:** `deck.prompt.in-context.title` ("The part you wrote is the smallest part"), over
   `PromptInContext` on slide `deck-prompt-in-context`
   **Problem:** The slide title states a comparison and the drawing under it contains **one shape**.
   On the page the paragraph above supplies the comparison; on the projector the prose is gone by
   design, so a room sees one oval headed "the smallest part" with nothing to be smaller than. This
   is the deck asking the figure to carry a claim the figure was deliberately stripped of (the frame
   was removed on purpose and must not come back).
   **Fix:** retitle the slide to what the drawing actually shows and let the tutor say the rest:
   `deck.prompt.in-context.title` → `"One shape: the message you type"` /
   NL `"Eén vorm: het bericht dat jij typt"`. The "smallest part" claim belongs on the divider,
   where `deck.prompt.divider.1` already carries it.

2. **Where:** `PromptInContext` on the unit page
   **Problem:** Judged against this repo's own bar ("a figure must carry something the sentences do
   not"), it is the weakest drawing in step 1: an ellipse labelled `prompt` under a paragraph that
   says a prompt is what you type. Its value is entirely downstream (it establishes the geometry
   that `ToolsInContext`, `ContextDiagram` and `McpOvals` reuse), which is real but is a service to
   later units rather than to this reader.
   **Fix:** **none, and deliberately none.** Every repair that would make it measure something on
   this page is a documented prohibition: no frame (`PromptInContext.tsx:7-14`,
   `CLAUDE.md:40-46`), no other layers ("naming them is `context`'s job"), no share-by-volume (that
   is `SessionMakeup`). I am recording it as the unit's weakest figure and recommending it be left
   alone. If the constraint is ever revisited, the honest version is a to-scale sliver, and it
   belongs in `context`, not here.

3. **Where:** the gap between `Instruction`/`Meta-prompting`/`Plan mode` and the figures
   **Problem:** A claim the reader has to take on trust that a drawing could settle:
   `instruction.3`, "The higher the reasoning, the more tokens the model spends thinking. Those
   tokens stay in the context and add to the cost. So weigh when you need more reasoning, and when
   you need less." Nothing measures that trade. The reader is asked to weigh two quantities and shown
   neither. The unit's shape makes it worse: a bare oval, then **nine undrawn paragraphs**, then two
   figures back to back at the foot. The deck has the same hole and papers it with a `statement`
   slide (`deck-prompt-plan`) because there is nothing to show.
   **Proposed figure — `ReasoningCost`.** Four rows, one per level (`low`, `medium`, `high`, `max`),
   each row a single horizontal bar built from two segments in the step's existing vocabulary: a
   **dashed teal** segment for thinking tokens (dashes are already "what is not in your answer") and
   a **solid** segment for the answer. The answer segment is **identical in every row**; only the
   dashed one grows, roughly 1x, 3x, 8x, 20x. To the right of each bar, the turn's token count in
   mono. What the reader takes: the thing you pay more for is not a better answer, it is more
   thinking in front of the same answer, and it stays in the window afterwards. That is exactly the
   claim `instruction.3` asserts and exactly the misconception the `reasoning-level` quiz question
   tests (its three distractors are "bigger model", "read more of your repo", "bigger window", all of
   which a drawing that shows *only the thinking segment moving* rules out at a glance).
   **Constraints it must respect:** no teal context frame (the first frame in the step is
   `ToolsInContext`, `CLAUDE.md:41-43`); numbers hand-authored, so it carries a caption admitting it,
   the way `NextToken` does; no currency (`ModelPricing` in `model` is the only place in the course a
   number has one). It goes under `instruction.3` in the new `Reasoning level` section from finding
   4.1, and it gives `deck-prompt-plan`'s neighbour slot a real drawing.

4. **Where:** `exact-ask.exact.prompt` — "fix the position for the label on #member-name"
   **Problem:** Two faults in the one string that a figure about exactness cannot afford. (a) It is
   not idiomatic English: "the position **for** the label" is Dutch word order showing through
   (`lesson-writing` has a whole section on this leak, and it is the leak that matters most because
   every reader gets the English). (b) It is **not exact**. The figure goes to the trouble of drawing
   the fault as a measured 32px band, and the "Exact" prompt then says "fix the position", which
   names neither the fault nor what fixed looks like. The exemplar of precision is the least precise
   string on the card.
   **Fix:** `remove the 32px margin under the label for #member-name` /
   NL `haal de marge van 32px onder het label voor #member-name weg`. If the intent is to name the
   fault and leave the fix to the agent (a defensible reading), then
   `the label for #member-name sits 32px above its input` / `het label voor #member-name staat 32px
   boven zijn invoerveld` does that and is still grammatical. Either way the current string goes.

5. `BundleCompare` and `ExactAsk` otherwise **clear the bar comfortably** and should not be touched.
   `BundleCompare` measures what no sentence can (12 messages against 3, `P1` on screen three times,
   the nesting *is* the duplication); `ExactAsk` shows the thing prose cannot, that two fields with
   the same visible label make "fix the form" genuinely unanswerable. These are two of the best
   figures in the course.

---

## 6. Supporting tasks

1. **Where:** `prompt.plan-mode.4` (the `data-audience="self"` aside)
   **Problem:** **The unit asks the student to do nothing.** It teaches three moves a reader can only
   learn by doing them (run a task through plan mode, bundle three asks into one, name the exact
   target), and closes on a figure. Step 1 carries five `TaskCard`s (`CutItUp`, `ReadYourWindow`,
   `ConnectOne`, `SurviveTheClear`, `OneWindow`) and none is here. The comparison that settles it is
   `session`: it carries a self-only aside **and** a card under "Test yourself"; `prompt` carries the
   aside alone. And the aside is already a task card in prose form: "Take a task you were about to
   type as one line, run it through plan mode instead, and read the plan before you approve it." That
   is moves, written as reading, which is the exact complaint the repo recorded when `ConnectOne`
   replaced two paragraphs ("a student skims a paragraph they would have worked through as a list",
   `CLAUDE.md:571-576`).
   **Fix:** a `TaskCard`, `block="plan-it-twice"`, keyed to `kata.step1.plan`, one tick for the card
   (never one per move, per the standing rule), under the step's exercise shape (`<hr>`, then
   `<h2 data-i18n="ui:quiz.title">Test yourself</h2>`, then the marker, then the registry quiz
   underneath). The machinery for a unit carrying both a task and a registry quiz already exists and
   is exercised by `context`: `showsExerciseHeading` in `shared/lib/content.ts` suppresses
   `QuizPanel`'s duplicate heading. Four moves, each one line:
   1. Take a task in your own project you were about to type as one line.
   2. Ask for it straight, on the cheap tier, and keep the answer.
   3. Ask for the same thing again through plan mode, read the plan, and fix one thing in it before
      you approve.
   4. Say which of the two you would ship, and which decision the interview made you take.

   Move 4 is the exercise, the way `SurviveTheClear`'s clear is: it turns "a cheaper model driven
   through a plan routinely beats a one-shot on the expensive one" from a claim the student is told
   into one they have watched. Nothing is graded; the tick is a bookmark, and `prompt.plan-mode.4`
   is deleted rather than kept beside it (a card plus an aside saying the same thing is the aside
   coming back one sentence at a time). `plan-mode.5`, the guided line, stays.
   **Ripple:** `CLAUDE.md:355` says "the two 'try it once yourself' asides in `prompt` and
   `session`", and `CLAUDE.md:307-311` says "All five tasks are `shared/components/TaskCard.tsx`".
   Both sentences move to "one aside" and "all six tasks" in the same change. `reset.ts` needs no
   edit: `kata.step1.` is cleared by key shape.

---

## 7. Quiz

**The unit has a quiz and it is one of the two best in the course.** Three questions, each handing
the student a *result* and asking for the cause, which is the right shape when the misconception is
always a wrong cause. The distractors are things a reader genuinely believes: "the expensive model
was throttled", "the model only really reads the most recent message", "short messages get less
effort", "the harness moved you to a larger model". Not one is a throwaway. The explanations are two
sentences. `plan-beats-one-shot` and `reasoning-level` together do real work protecting the
`prompt`/`model` boundary the step's CLAUDE.md says the "Reasoning level" section exists for. Leave
all three alone.

Two small things.

1. **Where:** `quiz.ts:84-87` (the `promptQuiz` doc comment)
   **Problem:** "one per section of `units/prompt.html`" is not true: there are four `<h2>` sections
   and the three questions come from `Plan mode`, `Instruction` and `What you steer after that`.
   `Meta-prompting` is unasked. Not a defect in the quiz (step 2 records the same deliberate
   omission for spec-driven), but the comment misdescribes it, and it will misdescribe it harder
   after the section split in finding 4.1.
   **Fix:** "one per section that has something a reader gets wrong; meta-prompting is unasked
   because plan mode is meta-prompting with the provider's own machinery around it."

2. **Observation, not a demand.** The unit's last argument (be exact) and its best figure
   (`ExactAsk`) are the one thing the quiz never touches. Three is the course's standard and I would
   not push it to four for symmetry. If the task in finding 6.1 lands, exactness is still unexercised
   anywhere on the page. Worth a decision rather than a default.

---

## 8. EN/NL parity

**Parity is complete.** All 20 `data-i18n` keys in `prompt.html` have a Dutch entry; no orphan
`prompt.*` entries in `nl.json`; every figure and quiz key has both halves; no em-dashes in either.
The Dutch is a rewrite rather than a conversion, and it reads like Dutch. This is well maintained.

Three places the two differ, and in two of them the Dutch is the better version.

1. **Where:** `prompt.lead.1` — **Dutch is better.**
   **Problem:** EN "All user input is a prompt." NL "Alle input die jij geeft is een prompt."
   The Dutch is in the second person; the English is product-speak ("user input") in a course whose
   rule is "The work is theirs and the agent is an it. The student is 'you'." It is the first
   sentence of the unit, and the unit is titled "Your prompt".
   **Fix (EN, per the Dutch-leads policy):**
   > Everything you send the agent is a prompt. Of everything a model is handed it is usually the
   > smallest. It is also the most valuable, because it is the one part carrying your intent.

   "send" rather than "type" keeps `lead.2`'s point that the interview answers count too.

2. **Where:** `prompt.instruction.4` — **Dutch is better.** Same finding as 1.2 above: NL "Nog dit:"
   is the cold open, EN "Worth knowing that" is the filler. Rewrite the English.

3. **Where:** `prompt.meta-prompting.2` — **English is better, minor NL drift.**
   **Problem:** EN "Spend an expensive model on this." is the one-clause imperative
   `lesson-writing` asks for (it is literally the skill's worked example of the rule). NL "Gebruik
   daar gerust een duur model voor" adds "gerust", which softens a command into permission.
   **Fix (NL):** `"Zet daar een duur model op."`

4. Cosmetic: `nl.json`'s `prompt.plan-mode.4` value is `"<p> Probeer het ... </p>"` with a space
   inside each tag. Harmless, inconsistent with the rest of the bundle.

---

## Verdict

**needs-work.** The writing here is human, level and often very good, the quiz is one of the two best
in the course, and `BundleCompare` and `ExactAsk` are figures that measure and show rather than
decorate. But this is also the least-documented unit in step 1 (its CLAUDE.md has no section for it),
and it shows in four ways that a page beside the world's best courseware would not have: it names a
Java class that **does not exist in this repository**, in the paragraph that teaches being exact; its
main heading says "Instruction" over a section that is three-quarters reasoning level, which is the
page `model` links into by name; it defines *entropy* two units before `context` defines it again
with an anchor, a heading and a quiz question behind it; and it closes by telling the reader that
making the model think is the failure mode, forty lines after telling them it is the fix. It is also
the only unit in step 1 that teaches three doable moves and asks the student to do none of them.
None of these is a rewrite. All of them are a sentence, a heading or a key rename, except the task
and the one figure I am proposing.

Priority order:

1. **`ExerciseController` → a class that exists** (`what-steer-after.3`, EN + NL), and fix the same
   example in `lesson-writing/SKILL.md`. Factual error in the exactness paragraph. (2.1)
2. **"The other makes the model think" → "makes the model guess"** (EN + NL). The unit currently
   argues against itself. (3.4)
3. **Split `Instruction` into `Instruction` + `Reasoning level`**, renaming `prompt.instruction.2/3/4`
   → `prompt.reasoning-level.1/2/3` in both bundles; visit the HTML comment and `audit.md` item 3.
   (4.1)
4. **Stop naming *entropy* in `prompt`**; leave the mechanism, let `context` own the word. (3.1)
5. **Add the plan-mode `TaskCard`** and delete the aside it replaces; update the two counts in the
   step's CLAUDE.md. (6.1)
6. **Fix `exact-ask.exact.prompt`** (ungrammatical and imprecise) and **retitle the
   `deck-prompt-in-context` slide** (claims a comparison the drawing does not contain). (5.4, 5.1)
7. **Rewrite `lead.1` and `instruction.4` to the Dutch**; tighten `instruction.1`'s gloss; delete
   `bundle-compare.hint`. (8.1, 8.2, 1.1, 1.3)
8. **Verify the low-to-max reasoning scale** against both products, record it in
   `copilot-specific.md`, and add the one clause saying where the dial is. (2.2)
9. **Draw `ReasoningCost`** under the new section, or accept nine undrawn paragraphs in the middle of
   the unit as the price. (5.3)
10. Rename or split `What you steer after that`; fix the two stale internal docs
    (`index.tsx:60`, `CLAUDE.md:88`). (4.2)

Leave alone: `PromptInContext`'s missing frame, the three quiz questions, `BundleCompare`'s and
`ExactAsk`'s geometry, the `/clear` block staying assistant-neutral, and the decision not to define
*context* on this page.
