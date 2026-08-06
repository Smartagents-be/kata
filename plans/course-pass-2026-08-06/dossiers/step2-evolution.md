# Dossier: step2 / `evolution` ("Project evolution")

Read against `front/src/steps/step2/CLAUDE.md`, `front/CLAUDE.md`, `.claude/skills/lesson-writing/SKILL.md`,
`audit.md` (rows 13 in Table 2 and the `agentic engineering/project evolution` row in Table 1c, both
marked clean with no remark), and the files themselves: `units/evolution.html`, `index.tsx`,
`IterationPaths.tsx`, `deck.tsx`, `locales/{en,nl}.json`, `front/public/{walking-skeleton,added-details}.png`.

Verified true before anything else: nine titles at `/api/titles` (`kata/step1/java/CLAUDE.md`, and the
tests assert nine as a subsequence), `kata/step1/java` is the right path for that service, `curl` is
real, the `<hr>` + `ui:quiz.title` shape matches `step1/tools`, `details.5` really does hand off to
`setup` (which is what an agent reads before your first message), no em-dashes in either language, and
all 24 prose keys have Dutch entries. The prose is the strongest opener of any step in the course.

---

## 1. AI tells

The prose here is human and mostly very good. `lead.1` lands its list on "an expensive refactor";
`details.1` runs a set of fragments ("KISS. The detail work comes after. Branding.") that no model
writes; "Not a plan for it." is exactly the house move. I found one genuine tell, and I am not
inventing a second.

**1. `evolution.prototype-conversation.2` is the previous paragraph restated, then an empty imperative,
then the one new claim.**

- **Where** `evolution.prototype-conversation.2`
- **Problem** Current text: *"Put several options in front of people and you find out fast what works,
  what has to change, and what is missing entirely. Act on that. Take the strongest parts of each one
  across."* Sentence one is `prototype-conversation.1`'s *"put them side by side, and watch which one
  people start talking about"* said again in the abstract, and it swaps a concrete scene for a tricolon
  of nouns. "Act on that." is an instruction with no content. Only the last sentence adds anything.
  This is the skill's own question 7 ("Which sentence only says the previous one again? Cut that one")
  and the brief's "summary paragraphs that restate what was just said". Nothing in the step's
  `CLAUDE.md` protects this paragraph.
- **Fix** Replace the whole block with:
  > Take the strongest parts of each one across. What you keep is usually a graft of two of them rather
  > than one of the three.

  Dutch (`evolution.prototype-conversation.2`):
  > Neem de sterkste stukken van elk ervan mee. Wat je overhoudt is meestal een kruising van twee, niet
  > één van de drie.

  This also brings the section back to the house shape (a heading and two paragraphs, the second one
  short) and gives it a closing line worth remembering.

---

## 2. Truthfulness

**2. `added-details.png` no longer shows the course it claims to show, and it is the unit's evidence.**

- **Where** `front/public/added-details.png`, used at `index.tsx:68` and again on the deck
  (`deck.tsx`, `deck-step2-evolution-details`, `figureWidth: 1050`); the claims are in
  `added-details.alt`, `added-details.caption` and `evolution.details.2`.
- **Problem** The step's `CLAUDE.md` is explicit that the two shots "are evidence rather than
  drawings" and that they "replaced prose that claimed the same thing". The evidence is stale. The
  screenshot was added in `b99da34` (26 July 2026, 47 commits back) and shows, legibly:
  - sidebar step titles `CONTEXT` and `WERKEN MET EEN AGENT`; the current Dutch titles are
    `Context, model, mechanismen` and `Agentic engineering`;
  - `6 PAGINA'S` and `8 PAGINA'S`; step 1 has **10** units and step 2 has **10**
    (`step1/index.tsx`, `step2/index.tsx`);
  - **no fourth step at all**; `step3` ("Soft skills", 3 units) is missing;
  - body text reading *"Slides zijn nog niet gebouwd. Die komen binnenkort."* while `shared/deck/` and
    four per-step decks exist, one of which is projecting this very screenshot.

  `added-details.alt` opens *"The course as it looks now"*, which is the false part in as many words,
  and `evolution.details.2` opens *"That is the same course with the details in"*. A student sitting
  with the real sidebar beside the image sees a different course; a room sees it at 1050px on a wall.
  The four things the caption points at (header, colours, grouped steps, cogwheel) do all still hold,
  so the argument survives, but a figure whose whole authority is "this is a photograph of this
  repository" cannot be a photograph of a repository that no longer exists.
- **Fix** Re-shoot `added-details.png` from the current tree, with the sidebar showing all four steps
  and the real unit counts, and take it in **English** so it matches its sibling (see finding 11).
  Then `added-details.alt` becomes true as written; if the shot cannot be retaken now, the interim fix
  is to drop "as it looks now" from both alts and date the caption instead, which is the weaker answer.

**3. `iteration-paths.description` describes branch geometry the figure does not have.**

- **Where** `iteration-paths.description` in both locale files; data in `IterationPaths.tsx:35-40`.
- **Problem** The alt text (the only thing a screen-reader user gets) says the dropped versions are
  *"each heading for the target and stopping a few degrees off it"*, and the component's docblock and
  the step `CLAUDE.md` both state the same invariant. Measured off the coordinates, with the target at
  `(250,70)`: the two spurs leaving node `(205,117)` are **30 degrees** (`205,117 259,101`) and about
  **50 degrees** (`205,117 232,127 256,120`) off the bearing to the target, and the second one *opens by
  heading down and away from the target* before turning. In SVG that is a detour, which is the exact
  reading the docblock says must be avoided ("Aiming them at the target is what makes them versions of
  the work rather than detours"). The two spurs earlier on the path are ~19 degrees off, which is
  already a stretch for "a few". Also: "stopping a few degrees off it" is imprecise English on its own
  terms, since degrees describe a bearing and not where something stopped.
- **Fix** Two halves. Alt text, English:
  > Two routes from the same start to the same target. On the left, three long steps that stop beside
  > it. On the right, twelve short ones that land in it, and four dropped versions branching off along
  > the way, each aimed at the target and none of them arriving.

  Dutch:
  > Twee routes van hetzelfde vertrekpunt naar hetzelfde doel. Links drie lange stappen die ernaast
  > stoppen. Rechts twaalf korte die binnenkomen, en onderweg vier versies die eraf takken, elk richting
  > het doel en geen ervan komt aan.

  Geometry: replace `ABANDONED[3]` (`'205,117 232,127 256,120'`) with something that does not open
  downward, e.g. `'205,117 229,110 253,106'`, then re-check by eye against the three constraints the
  docblock lists (below the main path, no x-overlap except from a shared node, outside the ring's
  20px radius). Note the real tension for whoever does it: spurs must live *below* a path that is
  itself aimed at the target, so "a few degrees" is not achievable near the end of the path. The
  honest wording is "aimed the same way", which is what the fix above says.

**4. "vibecode" is spelled three different ways across step 2.**

- **Where** `iteration-paths.many` (EN and NL)
- **Problem** This label writes **`vibecode`** as one word. `engineering.lead.2` writes "Vibe coding",
  `goals` writes "vibe-coded", and the deck's opening slide writes "vibe coding". Three spellings of
  one term inside one step, and this is the first of them a reader meets.
- **Fix** `"iteration-paths.many": "With AI you vibe-code it in an hour"` and
  `"iteration-paths.many": "Met AI vibe-code je het in een uurtje"`, which matches `goals`'s
  "vibe-coded" and leaves the noun "vibe coding" alone. **Do not touch the approving use itself**: the
  step's `CLAUDE.md` records it as deliberate and `engineering.lead.1` answers it by name.

**5. The step's own `CLAUDE.md` says this unit carries a task card. It does not.**

- **Where** `front/src/steps/step2/CLAUDE.md`, the paragraph on the quiz heading: *"`evolution`, `setup`
  and `engineering` carry the heading because they carry cards."*
- **Problem** `evolution`'s registry entry (`index.tsx:57-70`) has three `inlineFigures` and **no
  `figure`**. Its `ui:quiz.title` heading sits over plain prose. `setup` carries `SetupFlags` and
  `engineering` carries `WhereWouldItGo`, so the sentence is right about two of three. Not
  student-facing, but it is the file the next author trusts, and it currently tells them a card is
  there.
- **Fix** Either correct the sentence, or make it true by adopting finding 9, which is the better
  answer.

---

## 3. Progression

The unit builds. Cost of a version (lead) → several versions of one step → several takes for other
people → the skeleton → the details and the hour → handoff to `setup`. Nothing is assumed that step 1
did not establish, and nothing here re-argues a claim another unit owns. Two things in the middle of
it are misplaced rather than missing.

**6. The unit's most agent-specific claim is the tail of a paragraph about this website's history.**

- **Where** `evolution.walking-skeleton.3`
- **Problem** The paragraph carries two arguments: *"That is how it grew, too. A lot of the content went
  in first, and those things arrived after."* (this repo's history, reading the screenshot above it) and
  *"Ask an agent for a whole system and you get a plausible one. Ask it for the next change to a running
  one and you can check the answer."* (why small steps are compulsory **with an agent**, as opposed to
  merely wise without one). The second is the sharpest claim in the unit and the only sentence that
  makes the lesson agentic rather than generic agile, and `details.1` explicitly concedes the generic
  half ("None of this is new. Traditional software engineering works the same way."). The step's
  `CLAUDE.md` gives this unit the job of putting the rest of step 2 in order; the checking argument is
  the hinge of that job, and it is currently a coda.
- **Fix** Split it, no rewriting. `evolution.walking-skeleton.3` keeps:
  > That is how it grew, too. A lot of the content went in first, and those things arrived after.

  and a new `evolution.walking-skeleton.4` closes the section:
  > Ask an agent for a whole system and you get a plausible one. Ask it for the next change to a running
  > one and you can check the answer.

  Dutch: `.3` keeps *"Zo is dit ook geëvolueerd. Eerst werd er veel content ingevuld, en pas daarna kwamen
  die zaken erbij."*, and `.4` takes *"Vraag een agent een heel systeem en je krijgt een aannemelijk
  systeem. Vraag hem de volgende wijziging aan iets dat draait en je kunt het antwoord nakijken."*
  Optional, if the author wants the claim to land harder, a five-word closer on `.4`: "Plausible is the
  expensive word there." I would take the split alone first; it is free and reversible.

**7. The unit states "an hour" twice for two different sizes of work and never says it is the same hour.**

- **Where** `evolution.lead.2` and `iteration-paths.many` against `evolution.details.4`
- **Problem** The lead prices a whole **version** at an hour, and the figure label repeats it. Four
  paragraphs later a **detail** is capped at an hour. On first reading that is a collision: a detail may
  cost as much as an entire version. It is not a collision, it is the unit's tightest idea (an hour is
  the size of one step, so anything reaching an hour was a step and not a detail), and the prose never
  joins them. The deck puts the same two numbers four slides apart, `deck.evolution.divider.1` ("A
  version costs an hour now") and `deck.evolution.details.note` ("A detail costs an hour at most, or it
  was the next step"), so a room meets it too.
- **Fix** One clause in `evolution.details.4`, which keeps the number the step `CLAUDE.md` protects:
  > As a rule of thumb, a detail should not cost you more than an hour. That is the hour a version costs,
  > so anything longer was not a detail, it was the next step. You get a feel for where that line sits
  > the more you work this way.

  Dutch:
  > Als vuistregel mag een detail je niet meer dan een uur kosten. Dat is het uur dat een versie kost,
  > dus alles wat langer duurt was geen detail maar de volgende stap. Naarmate je meer op deze manier
  > werkt, krijg je vanzelf gevoel voor waar die lijn ligt.

---

## 4. Readability

**8. "the right characteristics" is the one abstraction in a list of concretes, and it is ambiguous.**

- **Where** `evolution.walking-skeleton.1`
- **Problem** *"What the first version does have to get right is the shape: the right characteristics, a
  label of its own, a place in the application structure, and a result that actually comes back."* Three
  of the four items name something a reader can check. "The right characteristics" could mean the
  entity's attributes, its behaviour, or its non-functional properties, and the Dutch ("de juiste
  karakteristieken") is no clearer, so this is not a translation artefact. The skill's question 5 is
  exactly this: an adjective doing work a concrete should be doing.
- **Fix** Cut it. The remaining three already say what a walking skeleton is (it is named, it sits
  somewhere in the structure, and it returns something, which is the "walking" part):
  > Start building with a very rough version. Keep the details out, because every one of them costs
  > extra <coin> <gem> What the first version does have to get right is the shape: a label of its own, a
  > place in the application structure, and a result that actually comes back.

  Dutch: *"…is de vorm: een eigen label, een plek in de applicatiestructuur, en een resultaat dat er echt
  uit komt."*

Two smaller things I looked at and am **not** filing, so the next reader does not re-litigate them.
`Adding details` runs five paragraphs against the skill's "one or two", but each one does a different
job (opener, reading the shot, the two edges, the number, the seam into `setup`) and the step's
`CLAUDE.md` requires both edges be kept, so the length is earned. "KISS" is undefined jargon, and for a
room of Java engineers that is fine. `details.2`'s "Work out the bare minimum that makes something run
and matter to the project" is the third telling of "shape first" in the unit; it is the weakest sentence
on the page, but cutting it costs the paragraph its instruction, so I would leave it unless the section
is being reworked anyway. And `vibecode` is used two units before `engineering` defines "vibe coding":
worth knowing, but the approving use is documented as deliberate and `engineering.lead.1` points back
here by name, so the sequence is intentional rather than broken.

---

## 5. Imagery

The three figures are correctly chosen. `IterationPaths` passes the repo's bar cleanly: the labels carry
the cause (weeks against an hour) and the drawing carries the effect (three long moves stopping beside
the target against twelve short ones landing in it), so neither reads as a caption of the other, and no
paragraph walks it. The two `UnitShot`s are evidence rather than decoration, which is the strongest
justification a figure can have in this repo. **I am not proposing a new figure**, and I want to be
explicit about the one I considered and rejected: `details.3` argues a cost curve with two edges (pull a
detail forward and you pay now, leave it too long and you pay for a regression), which invites a U-shaped
cost-against-timing drawing. That would be a picture of a claim the paragraph already makes, with
hand-authored proportions asserting a minimum nobody measured. It fails the bar recorded in this repo and
should not be drawn.

**9.** (geometry of the dropped branches) is filed above as finding 3, because its load-bearing half is a
false sentence in the alt text.

**10. The before/after pair is shot in two different languages.**

- **Where** `front/public/walking-skeleton.png` (English UI) against `front/public/added-details.png`
  (Dutch UI); one `src` each, shown to readers of both languages.
- **Problem** The pair's entire job is "the same site, two states", and the two shots differ in a way
  that has nothing to do with the argument. Whichever language a student reads in, one of the two shots
  is in the other one. The older shot is a historical artefact and cannot be retaken; the newer one can.
- **Fix** Take the replacement in finding 2 in English, so the pair differs only in what the unit says it
  differs in.

---

## 6. Supporting tasks

The reader is asked to do something, and it is the right thing: fifteen minutes on a clock, one of three
skeletons, and the answer is the list of details they did not reach. The three "second sentences" naming
what is left out are the best-designed part of the unit. One defect, and it is structural rather than
editorial.

**11. In guided mode, which is the default, the exercise does not exist anywhere.**

- **Where** `units/evolution.html:89-137` (everything under the `<hr>`), against
  `prepareUnit` in `shared/lib/content.ts` and `deck.tsx`'s `deck-step2-evolution-fifteen`.
- **Problem** Guided mode drops every run of prose and keeps only figures plus the nearest heading above
  each. The whole exercise here is prose: the clock, the three skeletons, the one-change-at-a-time
  procedure and the closing instruction. No figure follows the `Test yourself` heading, so the heading
  goes too. A class therefore sees three drawings and nothing to do. The deck does not cover the gap
  either: `deck-step2-evolution-fifteen` is a `statement` with a title and a note ("The answer is the
  list of details you did not reach") and **names none of the three skeletons**, so in a room the three
  options exist on no surface at all. `engineering`'s `WhereWouldItGo` survives guided mode precisely
  because it comes from the registry. This is not in `audit.md`.
- **Fix** A `TaskCard`, which is ungraded and is therefore not the "checker" the step's `CLAUDE.md`
  rules out, under the same `<hr>` and `ui:quiz.title` heading `engineering` already uses. Concretely, a
  `FifteenMinutes.tsx` beside `WhereWouldItGo.tsx`:

  ```
  block="fifteen-minutes"  namespace="step2"  prefix="fifteen"  storageKey="kata.step2.fifteen"
  moves: clock  — Put fifteen minutes on a clock.
         pick   — Pick one of the three above: a search box, a link shortener, or an export button.
         shape  — Ask for the shape only, and leave out everything in that option's second sentence.
         loop   — Run it, pick the single next thing, ask for that alone.
         write  — When the clock goes, write down the three details you did not reach.
  ```

  wired as `figure: <FifteenMinutes />` on the `evolution` entry in `index.tsx`. The prose stays exactly
  as it is: a self-learner gets both, a class gets the card. It also makes finding 5's sentence in the
  step's `CLAUDE.md` true. The cheaper half-fix, if a second card in the step is unwanted, is to give
  `deck-step2-evolution-fifteen` `points` naming the three skeletons, but the deck rule is `note` or
  `points` and not both, so that costs the note or needs a second slide.

---

## 7. Quiz

**No quiz, and it should not have one.** The unit already closes on the doing, and it is the only unit
in the first half of step 2 that does. A three-question quiz behind a fifteen-minute build would be a
downgrade: it would ask the reader to recognise in prose the thing they just did with their hands.
`audit.md` item 15 names `steering`, `patterns` and `parallel` as step 2's quiz candidates and
deliberately does not name this unit, which is right.

For the record, the one question I would write if the course ever wanted an early step-2 quiz is "which of
these is detail work" with a filter on a list, a colour palette, an extra attribute on the model that
three screens have to read, and a second endpoint as options, because the third and fourth are genuinely
arguable and the hour rule is the thing that settles them. I would still not add it here.

---

## 8. EN/NL parity

All 24 prose keys have Dutch entries, plus the four figure keys and the unit title. No em-dashes in
either language. The Dutch is a rewrite rather than a translation throughout, as required. Three real
drifts, and on one of them the English is the truer version.

**12. The Dutch figure label drops the number the figure exists to contrast.**

- **Where** `iteration-paths.few`
- **Problem** EN: *"Prototyping the old way took weeks"*. NL: *"Traditioneel prototypen kost veel tijd"*.
  The step's `CLAUDE.md` says the labels carry the cause, "weeks against an hour". The Dutch replaces
  "weken" with "veel tijd" and switches to the present tense, so a Dutch reader gets a vague half of the
  contrast against a very concrete "in een uurtje" on the other side. **This is the place the repo's
  usual rule does not apply: the English is the thought-through one.**
- **Fix** `"iteration-paths.few": "Traditioneel prototypen kostte weken"`.

**13. The Dutch collapses a distinction the step's `CLAUDE.md` requires be kept apart.**

- **Where** `evolution.prototype-conversation.1` against `evolution.lead.3`
- **Problem** The step's notes are explicit: `lead.3` (several attempts at one step of *your own* work,
  best survives) must not be confused with `prototype-conversation` (several takes put in front of
  *people* for a reaction). The English keeps them apart lexically: "versions" in `lead.3`, "takes" in
  `prototype-conversation.1`. The Dutch uses **"versies" in both**, so a Dutch reader gets the same word
  for the two things the notes say must not be confused, roughly a hundred words apart.
- **Fix** `"evolution.prototype-conversation.1"`: *"Bouw drie **varianten** van hetzelfde scherm in de tijd
  die één discussie erover kost, leg ze naast elkaar en kijk waar mensen over beginnen."* ("uitwerkingen"
  works too; anything but "versies".)

**14. Two smaller Dutch drifts, both in the same neighbourhood.**

- **Where** `evolution.prototype-conversation.2`, `evolution.fifteen-minutes.3`
- **Problem** `prototype-conversation.2` adds a hedge the English does not have ("wat er **mogelijk**
  mist" for "what is missing entirely") and drops "of each one" from the last sentence ("Neem de sterkste
  punten over"), so the Dutch does not say the strong parts come from *different* takes, which is the
  whole move. `fifteen-minutes.3` opens *"Draaiend krijgen kost je een minuut of vijf"*, which is missing
  its subject; a Dutch colleague says "Het draaiend krijgen kost je…".
- **Fix** `prototype-conversation.2` is rewritten wholesale by finding 1, which resolves both halves of
  the first item. For the second: *"Het draaiend krijgen kost je een minuut of vijf."*

---

## Verdict

This is a good unit and it is not yet an excellent one. The prose is genuinely written rather than
generated: `details.1`'s run of fragments, the four skeleton exclusions, "Not a plan for it.", and a lead
that prices the old way in weeks and the new way in an hour without once announcing what it is about to
argue. `audit.md` marks the unit clean in both tables and the argument does hold together. What keeps it
below the bar is one thing that would embarrass the course in a room and three that quietly weaken it.
The embarrassing one is `added-details.png`: the unit's own claim is that this repository did exactly what
the lesson describes, and the photograph offered as proof shows a course with the wrong step names, the
wrong page counts, a missing fourth step, and a sentence on screen saying the slides it is being projected
from do not exist yet. Behind that: the sharpest sentence in the unit is buried as the tail of a paragraph
about website history, the exercise is invisible to the audience the app defaults to, and the Dutch loses
both the number that makes the figure's contrast work and the word that keeps two arguments apart.

Priority order:

1. **Re-shoot `added-details.png`** from the current tree, in English (findings 2 and 10). It is on the
   page and on the projector, and every other fix here is smaller than this one.
2. **Give the fifteen-minute exercise a `TaskCard`** so it survives guided mode (finding 11). This is the
   only structural change I am proposing, and it closes finding 5 as a side effect.
3. **Split `walking-skeleton.3`** so the "plausible system against a change you can check" claim stands on
   its own (finding 6).
4. **Rewrite `prototype-conversation.2`** down to its one real claim (finding 1), and fix the two Dutch
   drifts around it (findings 13 and 14).
5. **Join the two hours** with one clause in `details.4` (finding 7), and **fix the Dutch "weken" label**
   (finding 12).
6. **Correct `iteration-paths.description` in both languages** and, if anyone is in the component anyway,
   the fourth spur's opening direction (finding 3).
7. **Cut "the right characteristics"** (finding 8) and **hyphenate "vibe-code"** (finding 4). Both are one
   token each.
