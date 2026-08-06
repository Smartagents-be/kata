# Work order: step 0

Triaged from `step0-welcome.md`, `step0-backend.md`, `deck-step0.md`, and the step 0 rows of
`course-arc.md`, `facts.md` and `parity.md`, weighed against `front/src/steps/step0/CLAUDE.md`.

Registry order after this pass: **`welcome`, `backend`, `workshop`** (the third is new).

---

## Step-level decisions taken here (read these before opening a unit)

These settle things three dossiers each raised in their own words. Do not re-litigate them per unit.

### D1. Step 0 is exempt from the guided prose cut

`DEFAULT_MODE` is `guided` and `prepareUnit` drops every run of prose in it. That is right for a
lesson a tutor delivers and wrong for step 0, which is **operating instructions for the app**: today
a first-time reader sees three headings, two answer boxes and a legend, and the first box tells them
to "type the code from the paragraph above" when there is no paragraph above. `backend` is worse: the
`<pre>` holding `mvn verify -Pintro` is dropped and the flag box's hint points at it.

**The fix, and it is a shared-machinery change, so it belongs to the step 0 integrator and to nobody
else:**

1. `front/src/shared/step.ts` — add an optional field to the `Unit` type:
   `/** Units whose prose is operating instructions rather than material a tutor delivers keep it in guided mode. Step 0 only. */ prose?: 'always'`
2. `front/src/shared/lib/content.ts` — `prepareUnit` takes the flag through and the guided cut
   becomes `if (mode === 'guided' && unitProse !== 'always' && !keptHeadings.has(node))`. Nothing
   else in that function changes; the audience and assistant filters still run.
3. `front/src/steps/step0/index.tsx` — `prose: 'always'` on all three step 0 units.
4. Record it in `front/src/steps/step0/CLAUDE.md`, in one paragraph, as: step 0 is a manual, guided
   mode's argument ("in class the teacher does the telling") does not apply to instructions for
   using the app itself, and this is the only step that carries the flag.

Everything downstream of this decision is already folded into the unit sections below. In
particular: **`welcome.hints.2` is no longer dead prose and stays on the page**, and the deck does
not have to smuggle the page's own instructions onto a slide.

**Rejected alternatives, with reasons:**
- Flipping `DEFAULT_MODE` to `self`. Contradicts the reasoning in `mode.ts` (the classroom is the
  case where accidentally revealing notes costs something) and changes 24 other units to fix 3.
- Leaving it and papering over the dangling hints by rewording them. The command and the code would
  still be on nobody's screen in the default mode.
- Putting `mvn verify -Pintro` on a slide (deck dossier's "Version A / Version B" question). With
  D1 the page carries it, so the constraint in `deck.tsx` ("the unit that sets it is the only place
  a student should meet it") stands untouched and needs no revisiting. **Do not ship Version B.**

### D2. Step 0 gets a third unit, `workshop`, and `backend` gives up its flag box

The user has decided step 0 gains a workshop. The honest thing for step 0 to grade is **the loop**:
run a command, read what the machine printed, paste it into a box. That is exactly what `backend`'s
box already does once, so the box moves onto a board and gains two siblings. Details in the
`workshop` section.

### D3. Prerequisites are stated once, in `welcome.lead.2`, and checked once, on the board

Both unit dossiers and `course-arc` finding 1 asked for a prerequisites paragraph, in three
different places. It goes in **`welcome`** (the front door, and house rule 1 on that same page
already assumes an agent), and the `{ready}` row of the new board is what verifies it. `backend`
does **not** repeat it, and the toolchain `TaskCard` the `backend` dossier proposed is **rejected**
as a duplicate of that board row.

### D4. Locale patch protocol

`en.json` and `nl.json` are shared by all three units. Never open them with Edit or Write. Each unit
writes `<SCRATCH>/patches/step0/<unit>.json`. `index.tsx`, `quiz.ts`, `deck.tsx`, `code.ts`,
`CLAUDE.md` (step and Java) and the root `CLAUDE.md` are integrator-owned: write what you want done
into `<SCRATCH>/manifests/step0/<unit>.json`.

---

## Unit 1: `welcome` ("How this kata works")

**Effort: heavy**

The house rules section is the best prose in step 0 and possibly in the course. Everything below is
in the top two thirds of the page, plus one clause on rule 3 and one new quiz question.

### Do

1. **`welcome.lead.1` — cut the last sentence.** "The kata is self-paced or guided" is said better
   three lines down by "There are three ways to read these pages". Replacement, both languages:
   - EN (`units/welcome.html`): `This kata teaches you to work with a coding agent, one small step at
     a time. It starts simple and each step leans on the one before it.`
   - NL (`welcome.lead.1`): `Deze kata leert je werken met een coding agent, stap voor stap. Ze
     begint eenvoudig en elke stap bouwt op de vorige.`

2. **`welcome.lead.2` — replace the announcing opener with the prerequisites.** The current
   paragraph ("This part of the module explains how the kata works…") announces instead of claiming,
   which `lesson-writing` bans outright, and says nothing the unit title has not. The prerequisites
   are the claim that earns that slot (D3).
   - EN: `Three things have to be on your machine before any of this works: this repository cloned,
     a JDK 25 or newer with Maven on your path, and a coding agent you can run in a terminal. The
     last page of this step checks all three for you.`
   - NL: `Drie dingen moeten op je machine staan voor dit werkt: deze repository gekloond, een JDK 25
     of nieuwer met Maven op je pad, en een coding agent die je in een terminal kan draaien. De
     laatste pagina van deze stap controleert ze alle drie voor je.`
   - JDK 25 is checkable: all four `pom.xml` files pin `<java.version>25</java.version>`.

3. **`welcome.how-to-use-this-document.5` — restore the reset clause.** `step0/CLAUDE.md` records
   this sentence as a decision ("One row is still named, by what it costs rather than by its label…
   the closing sentence of that paragraph is the only place in the course it appears") and the
   sentence is not in any file. Restore it rather than delete the claim from the notes. Keep the
   `<svg data-icon="cog">` exactly where it is, and **do not list the panel's rows** (the notes
   forbid it; the panel renders five and a list has to be kept in step).
   - EN: `A few options sit behind the menu <svg data-icon="cog"></svg> in the top right to configure
     this course. One of them throws your progress away: it forgets every flag you captured and every
     page marked done.`
   - NL: `Achter het menu <svg data-icon="cog"></svg> rechtsboven zitten een paar opties om deze
     cursus in te stellen. Eén ervan gooit je voortgang weg: elke flag die je gevangen hebt en elke
     pagina die als afgerond staat.`

4. **`welcome.how-to-use-this-document.6` — rewrite both sides.** English is in software-manual
   register ("modify the content of this course", "relevant", "easily"); the Dutch has the same
   problem in its first half. Must stay **two sentences and name no file and no command**
   (`step0/CLAUDE.md`).
   - EN: `Set the assistant to the one you actually use. The pages then name the commands that apply
     to you, instead of the other product's.`
   - NL: `Zet de assistent op degene die je echt gebruikt. De pagina's noemen dan de commando's die
     voor jou gelden, in plaats van die van het andere product.`

5. **New `TaskCard` under that paragraph.** This is the only thing the unit asks the student to go
   and do, and it is the setting that changes 26 blocks of step 1 prose. Today the page tells and
   never asks.
   - Marker in `welcome.html`, directly after `how-to-use-this-document.6`, a **direct child of the
     body, unwrapped**: `<div data-figure="set-your-assistant"></div>`
   - New file `front/src/steps/step0/SetYourAssistant.tsx`, modelled on `step1/CutItUp.tsx`:
     `<TaskCard block="set-your-assistant" namespace="step0" prefix="assistant"
     storageKey="kata.step0.assistant" moves={['pick']} className="my-8" />`. It renders no elements
     of its own; every id in the DOM reads `set-your-assistant-*` and every `data-component` reads
     `TaskCard`.
   - Registry (manifest): `inlineFigures: { 'set-your-assistant': <SetYourAssistant /> }`.
   - Locale keys, both languages:
     - `assistant.title` EN `Set your assistant` / NL `Zet je assistent`
     - `assistant.todo` EN `Mark this task done` / NL `Markeer deze taak als afgerond`
     - `assistant.done` EN `Done` / NL `Klaar`
     - `assistant.pick.label` EN `Open the cogwheel, top right. Set the assistant to the one you use,
       and check the language while you are in there.` / NL `Open het tandwiel rechtsboven. Zet de
       assistent op degene die jij gebruikt, en kijk meteen de taal na.`
   - No `assistant.description`: the paragraph above says where the work happens.
   - **One move only.** The mode switch and the deck are deliberately left to the panel
     (`step0/CLAUDE.md`).

6. **`welcome.how-exercises-work.1` — settle the vocabulary and drop the passive.** A braced string
   does not *mark* a flag, it **is** the flag, which is what the board actually hashes and what every
   later step assumes. "These are to be hunted down" is passive and its referent is loose; the Dutch
   is already active and is the model.
   - EN: `During the exercises you will meet strings like <code>{f1r5t-5t3p5}</code>. A string in
     braces is a flag. You hunt them down and type them back into a box in your browser.`
   - NL: `Tijdens de oefeningen kom je strings tegen zoals <code>{f1r5t-5t3p5}</code>. Een string
     tussen accolades is een flag. Die spoor je op en typ je in je browser in een veld terug.`

7. **Follow that through the two answer panels and the quiz text.** Step 0 currently names one
   mechanism three ways (`The page code`, `The hidden code`, `The intro flag`) on the one page whose
   job is to fix the word. Change the **visible noun only**; the `CodeCheck` component name and the
   `code.ts` ids stay as they are, they are not on screen. Locale patch, both languages:
   - `code.panel.label` EN `The page flag` / NL `De flag van de pagina`
   - `code.panel.hint` EN `Type the flag from the paragraph above, braces and all.` / NL `Typ de flag
     uit de alinea hierboven, mét accolades.`
   - `code.panel.help` EN `Look at the string in braces in the paragraph just above this box.` / NL
     `Kijk naar de string tussen accolades in de alinea net boven dit veld.`
   - `code.panel.wrong` EN `Not quite. Copy the flag from the paragraph above, braces and all.` / NL
     `Net niet. Kopieer de flag uit de alinea hierboven, mét accolades.`
   - `hint.panel.title` EN `Try it: find the hidden flag` / NL `Probeer het: vind de verborgen flag`
   - `hint.panel.label` EN `The hidden flag` / NL `De verborgen flag`
   - `hint.panel.help` EN `Here is the flag for this box: {34513r-t1m3}.` / NL `Hier is de flag voor
     dit veld: {34513r-t1m3}.`
   - `hint.panel.wrong` EN `Not quite. Press Hint to see the flag, then copy it in, braces and all.`
     / NL `Net niet. Druk op Hint om de flag te zien, en kopieer hem dan in, mét accolades.`
   - `quiz.what-the-code-is.question` EN `You are reading a page and hit a string in braces, like
     {f1r5t-5t3p5}. What is it doing there?` / NL `Je leest een pagina en stuit op een string tussen
     accolades, zoals {f1r5t-5t3p5}. Wat doet die daar?`
   - `quiz.what-the-code-is.explanation` EN `A string in braces is a flag, which means it is the
     answer itself. You clear the page by typing it back into the box, and it grades in your
     browser.` / NL `Een string tussen accolades is een flag, en dus het antwoord zelf. Je lost de
     pagina op door hem terug te typen in het veld, en het nakijken gebeurt in je browser.`
   - `code.panel.title`, `.done`, `hint.panel.hint`, `.done` and the four quiz choices are unchanged.

8. **`welcome.how-workshops-work.1` — "Most steps close on a workshop" is false and stays false
   after this pass.** Measured off the registries: step 0 will close on `workshop`, step 1 closes on
   `recap`, step 2 closes on `workshop`, step 3 closes on `impostor`. `course-arc` asked for the
   sentence to be made true by the additions rather than cut; it does not become true, so the
   counting clause moves to the end where it can be a fact instead of a claim.
   - EN: `A workshop is a board of flags: some are hidden in the code for you to hunt down, others
     are printed by a build once you have the project where the step wants it. What you find you type
     into the board, and it checks your answer in the browser. Steps 0, 1 and 2 each have one.`
   - NL: `Een workshop is een bord met flags: sommige zitten verstopt in de code en moet je opsporen,
     andere print een build zodra je het project hebt waar de stap het hebben wil. Wat je vindt typ
     je in het bord, en dat controleert je antwoord in de browser. Stap 0, stap 1 en stap 2 hebben er
     elk een.`

9. **`welcome.house-rules.3` — one clause, so the rule stops contradicting step 1's capstone.**
   `step1/workshop.one-window.1` says "Work all three from a single session" and links the student
   back to these very rules. Add the exception and nothing else. Do not touch the rest of the rule
   and do not restore the justifying line the notes deliberately cut.
   - EN: `<strong>One flag, one session.</strong> A hunt leaves a trail of dead ends behind it, and
     the next flag has to read past all of them. Start each one on a fresh session unless the step
     says otherwise <svg data-icon="coin"></svg>.`
   - NL: `<strong>Eén flag, één sessie.</strong> Een jacht laat een spoor van doodlopende paden
     achter, en de volgende flag moet daar allemaal doorheen lezen. Begin elke flag op een verse
     sessie, tenzij de stap iets anders zegt <svg data-icon="coin"></svg>.`

10. **`welcome.house-rules.5` — one closing sentence pointing at what comes next.** The unit ends by
    pointing a whole step ahead and never says step 0 has more pages. Append to the existing rule 5
    text (do not make it a sixth rule and do not give it its own section):
    - EN: `… Step 1 gives you the numbers to put on that. The next page is where the code those flags
      hide in lives, and the page after it is this step's board.`
    - NL: `… Stap 1 geeft je de cijfers om erop te zetten. De volgende pagina gaat over de code waar
      die flags in zitten, en de pagina daarna is het bord van deze stap.`

11. **Dutch-only fixes** (parity dossier):
    - `welcome.hints.1` — two spelling errors: `vast zit` → `vastzit`, `hier op` → `hierop`. Full
      replacement: `Elk antwoordveld heeft een Hint-knop. Als je vastzit kan je hierop drukken om
      hulp te krijgen.`
    - `welcome.house-rules.heading` — `Spelregels` → `Huisregels`, which is what
      `deck.welcome.rules.title` already says. One English term, one Dutch word.

12. **Second quiz question** (manifest for `quiz.ts`; the locale strings go in your patch). The five
    house rules are the highest-value content on the page and nothing checks any of them; rule 4 is
    the one a student breaks within ten minutes of starting step 1. Keep the existing question
    exactly as it is: it is the lightest in the kata on purpose.
    - Id `agent-says-it-found-it`, after `what-the-code-is`.
    - `quiz.agent-says-it-found-it.question` EN `You ask your agent for a flag. It comes back with a
      string in the right shape and says it is confident. It never ran anything. What have you got?`
      / NL `Je vraagt je agent om een flag. Hij komt terug met een string in de juiste vorm en zegt
      dat hij zeker is. Hij heeft niets gedraaid. Wat heb je?`
    - Choice `a-guess` (**correct**) EN `A guess. Have it run the thing and print the output, then
      read the flag off that.` / NL `Een gok. Laat hem het ding draaien en de uitvoer printen, en lees
      de flag daarvan af.`
    - Choice `it-read-the-file` EN `A flag. It read the file, so the string came out of the code
      rather than out of the model.` / NL `Een flag. Hij heeft het bestand gelezen, dus de string komt
      uit de code en niet uit het model.`
    - Choice `right-shape` EN `A flag, as long as the shape is right. The shape is what the board
      checks your answer against.` / NL `Een flag, zolang de vorm klopt. Op de vorm kijkt het bord je
      antwoord na.`
    - Choice `only-builds` EN `Nothing usable. Only a build can print a flag, so a flag found by
      reading is never the right one.` / NL `Niets bruikbaars. Alleen een build kan een flag printen,
      dus een flag die je leest is nooit de juiste.`
    - `quiz.agent-says-it-found-it.explanation` EN `Worked out in prose, a flag is a plausible string
      with two letters wrong, said just as surely. The board hashes one exact string, so the cheap
      check is to make the agent run the thing and read the answer out of the output.` / NL `Uitgedacht
      in proza is een flag een geloofwaardige string met twee letters ernaast, even zeker gebracht.
      Het bord hasht één exacte string, dus de goedkoopste controle is de agent het ding laten draaien
      en het antwoord uit de uitvoer lezen.`
    - The last distractor is deliberately half-true and is the one a careful reader of `backend` might
      pick. Keep it.

13. **Registry (manifest):** `prose: 'always'` on this unit (D1), the new `set-your-assistant` inline
    figure, and the quiz still `understoodQuiz`.

### Do not

- **Do not restore a scope line about step 2 not having assistant variants.** `step0/CLAUDE.md` is
  explicit: the repair is giving step 2 variants, and a caveat here is not a substitute for the work.
  The welcome dossier raised this only so the pass would not "fix" it in the wrong place.
- **Do not delete `welcome.hints.2` or move it to a slide.** The dossier proposed this because
  `data-audience="guided"` prose renders for nobody; D1 fixes that and the paragraph now reaches a
  guided room, which is who it was written for.
- **Do not add a figure to this unit beyond the task card.** Three were proposed and all three are
  rejected: a "board anatomy" drawing (a live `CodeCheck` with all five parts sits inches away on
  the same page), a "three routes to a flag" drawing (`how-workshops-work.1` makes that claim in one
  sentence), and a "cost of a hunt" drawing showing three flags in one window against three fresh
  ones. The last is **forbidden**: `step0/CLAUDE.md` records that the house rules section "carries no
  numbers and does no arithmetic", `model.cost.4` stays the one paragraph in the course that
  multiplies, and step 1's `OneWindow` and `BudgetWindow` already own that picture.
- **Do not rename the `legend` prose keys or reword the heading "Icons you'll see" to "Legend".**
  The key/heading mismatch is invisible to a student, renaming would split the prose keys from the
  `welcome.legend.gem.*` figure labels that are correctly named after the figure, and "Legend" is a
  worse heading for a reader. Taste, not a defect.
- **Do not grow the house rules into six, or turn any of them into a section**, and do not put the
  cut justifying lines back into rules 1 and 2. Recorded decisions.
- **Do not name a file or a command in `how-to-use-this-document.6`.** `CLAUDE.md` records that
  `copilot mcp add` / `claude mcp add` and the two instruction filenames were removed on purpose, and
  belong to `tools` and `session`.
- **Do not list the settings panel's rows** in prose or on a slide.

---

## Unit 2: `backend` ("The backend")

**Effort: moderate**

172 words, the thinnest unit in the course, no AI tells at all, and three factual defects. The prose
that is there is human and unshowy: the repair is corrective and additive, not a rewrite of the
voice. **Do not let a stylistic pass loose on this unit.**

Note for the implementer: this unit has **no section in `front/src/steps/step0/CLAUDE.md`**, which
is why none of the below was caught. Writing that section is part of the job (item 8).

### Do

1. **`backend.lead.1` — three defects in one paragraph, so replace it whole.** "Every step has its
   own under `kata/`" over-promises (`kata/step3/java` is an empty scaffold and step 3 is soft skills
   with no Java); "also" has no antecedent, since `welcome` never mentioned a frontend or any code;
   and "only one of them runs at a time" is true but never names the failure the student will
   actually meet.
   - EN: `There is Java behind this kata, and it is not one project. Three steps have their own under
     <code>kata/</code>: <code>kata/step0/java</code>, <code>kata/step1/java</code> and
     <code>kata/step2/java</code>, each with its own <code>pom.xml</code> and its own Maven build.
     Open the folder for the step you are on and run Maven from in there. Two of them boot a service
     on port 8080, so only one runs at a time. Start the second while the first is still up and the
     boot fails on the port rather than on anything you did.`
   - NL: `Achter deze kata zit Java, en dat is niet één project. Drie stappen hebben er een eigen
     onder <code>kata/</code>: <code>kata/step0/java</code>, <code>kata/step1/java</code> en
     <code>kata/step2/java</code>, elk met een eigen <code>pom.xml</code> en een eigen Maven-build.
     Open de map van de stap waar je mee bezig bent en draai Maven van daaruit. Twee ervan starten
     een service op poort 8080, dus er draait er maar één tegelijk. Start de tweede terwijl de eerste
     nog loopt en het opstarten valt over de poort, niet over iets wat jij deed.`

2. **`backend.lead.2` — de-hedge both sides, and note the direction is unusual.** English: modal
   hedge ("can"), agentless ("becomes available"), no concrete noun. Dutch is worse: passive twice
   ("kan er gerefereerd worden", "zal er beschikbaar zijn"), officialese, and "ze" disagreeing with a
   singular "opdracht". **This is the one place in step 0 where the English leads and the Dutch is
   the weaker version**, so do not apply the house rule mechanically here. The vagueness about *how*
   a flag arrives is load-bearing (step 0 prints, step 1 hides in a running service, step 2 prints
   from a graded profile), so keep the range and lose the hedge. The red-herring clause is rescoped
   because **step 0 now has one of its own** on the new board.
   - EN: `That code is what the exercises work against. A unit points you at a job in its own step's
     project, and doing the job is what puts the flag within reach: sometimes the build prints it,
     sometimes you have to go and find it. Watch out for red herrings from the last page of this step
     on: a string in braces is not always the one you are after.`
   - NL: `Die code is waar de oefeningen op werken. Een unit wijst je een opdracht aan in het project
     van die stap, en die opdracht doen is wat de flag binnen bereik brengt: soms print de build hem,
     soms moet je hem zelf gaan zoeken. Let vanaf de laatste pagina van deze stap op red herrings:
     een string tussen accolades is niet altijd degene die je zoekt.`

3. **`backend.code-blocks.1` — the unit states a mechanism that does not exist. Highest-priority
   item in this unit.** "It matters that you use them and drive them through your AI agent, or the
   flag will not show up" is false: `kata/step0/java/pom.xml`'s `intro` profile wires failsafe to
   `IntroRevealIT`, which unveils and prints the flag with no check on who invoked Maven, and there
   could not be one. A student who pastes the block into their own terminal gets the flag in fifteen
   seconds and has caught the course lying on page two, at the moment it is establishing the house
   rules. The Dutch repeats the error and adds one of its own: *instrumenteren* means adding
   instrumentation, which is specifically what step 1 asks the student to do to the catalogue
   pipeline. It also uses "AI agent" where `welcome` says "coding agent" and the house rules say
   "your agent".
   - EN: `Some pages hand you a code block, like the one below. Give it to your agent to run rather
     than pasting it into a terminal yourself. Nothing in the build checks which of you ran it. House
     rule one is the reason, and this is the cheapest place in the course to start keeping it.`
   - NL: `Sommige pagina's geven je een codeblok, zoals dat hieronder. Laat je agent het draaien in
     plaats van het zelf in een terminal te plakken. De build controleert niet wie van jullie het
     gedraaid heeft. Huisregel één is de reden, en dit is de goedkoopste plek in de cursus om er aan
     te beginnen.`
   - This names house rule 1 instead of restating it, which is the shape `step0/CLAUDE.md` licenses
     (the rules are stated once in `welcome` and pointed at from elsewhere).

4. **Keep the `<pre>` block exactly where it is.** It is the example the section is about, and under
   D1 it now survives guided mode. The new board's first row points back at it rather than repeating
   the command, so the command appears once in the course.

5. **New figure `IntroLoop`, at a new marker after the `<pre>` and before the `<hr>`.** This unit has
   no drawing (the audit's "1 fig" is the answer box), and the claim it would settle is asserted
   across four sentences in two units and drawn nowhere: **who does which part of the loop, and that
   the flag never crosses a network.** The second half is the reason every board in this course works
   offline and the course states it on no page.
   - Marker: `<div data-figure="intro-loop"></div>`, a direct child of the body, unwrapped.
   - New file `front/src/steps/step0/IntroLoop.tsx`, an SVG figure in the house style: ids under the
     `intro-loop` block, `data-component="IntroLoop"` on every element, colour from tokens only,
     labels read through `useStepText('step0')`, `max-w-xl`, `my-8` on the `<figure>`.
   - Four nodes left to right with arrows between them, and a band under them naming the actor:

     | # | node | mono line under it | band |
     |---|---|---|---|
     | 1 | your agent | `cd kata/step0/java` / `mvn verify -Pintro` | the machine |
     | 2 | the build | `[x] intro complete   {……}` (braces empty, muted) | the machine |
     | 3 | you | read the string in braces | you |
     | 4 | the box on the board | checked in your browser | you |

     Nodes 1 and 3 are the two that act, so they take `text-primary`; 2 and 4 are muted. One note off
     node 4.
   - Locale keys, both languages (`loop.*`):
     - `loop.title` EN `Who does which half` / NL `Wie doet welke helft`
     - `loop.agent.label` EN `your agent` / NL `je agent`
     - `loop.build.label` EN `the build` / NL `de build`
     - `loop.you.label` EN `you` / NL `jij`
     - `loop.box.label` EN `the box on the board` / NL `het veld op het bord`
     - `loop.you.body` EN `read the string in braces` / NL `lees de string tussen accolades`
     - `loop.box.body` EN `checked in your browser` / NL `nagekeken in je browser`
     - `loop.band.machine` EN `the machine` / NL `de machine`
     - `loop.band.you` EN `you` / NL `jij`
     - `loop.note` EN `No network. This works with every service down.` / NL `Geen netwerk. Dit werkt
       ook met alle services uit.`
   - **Prohibition check, and it is on you to keep it:** node 2's braces are **empty**. The figure
     prints no flag and no fragment of one. Naming the `intro` profile is allowed here because the
     root `CLAUDE.md` reserves it for the unit that sets it, and this is that unit.

6. **Remove the answer box from this unit.** The `-Pintro` flag moves onto the new board (D2). Delete
   from `backend.html`: the trailing `<hr>`, the `<h2 data-i18n="ui:quiz.title">Test yourself</h2>`
   and the `<div data-figure="code-check"></div>`. In the manifest: drop this unit's `inlineFigures`
   entry for `code-check`, and ask the integrator to delete `finishCode` from `code.ts` (its hash
   moves verbatim into `flags.ts`, see the `workshop` unit). Retire `flag.panel.*` from both locale
   files with `removeEn` / `removeNl`; the workshop's row keys replace them.

7. **`backend.code-blocks.2` — repoint it.** It currently sends the reader to step 1, which is now
   two pages early. The tokens link moves to the end of the `workshop` unit.
   - EN: `The next page puts three of those runs on a board, and this block is the first of them.`
   - NL: `De volgende pagina zet drie van die runs op een bord, en dit blok is de eerste ervan.`

8. **Write the `backend` section of `front/src/steps/step0/CLAUDE.md`** (manifest). What belongs in
   it, in the house voice of that file: why the unit names three projects rather than generalising;
   why the port failure is named as a symptom (it is the one place in the course it can be); that
   `code-blocks.1` names house rule 1 rather than restating it, and that the false "or the flag will
   not show up" was removed because no build checks who ran it; that the flag box moved to
   `workshop` and the `<pre>` stayed; and what `IntroLoop` may never draw.

9. **Registry (manifest):** `prose: 'always'` (D1), `inlineFigures: { 'intro-loop': <IntroLoop /> }`,
   no quiz.

### Do not

- **Do not add a toolchain `TaskCard` to this unit.** Proposed with four ticks (repo present,
  `java -version`, `mvn -v`, a green silent `mvn -q verify`). It is a duplicate of the `{ready}` row
  on the new board, which does the same check in a place that can actually verify it and hands out a
  flag for it. One readiness check per step.
- **Do not add the prerequisites paragraph here.** It is in `welcome.lead.2` (D3). Two statements of
  the same requirement one page apart is worse than one.
- **Do not add a quiz to this unit.** The unit teaches procedure, not a claim a reader can hold a
  wrong model of; its box already asks for more than any multiple-choice question in the course; and
  a second light question one click after `welcome`'s would make the intro read as a test rather than
  a warm-up. The one mistakeable fact (the shared port) is now named in the prose, item 1.
- **Do not "improve the rhythm" of the surviving sentences.** There are no AI tells in this unit.
  "There is also a Java backend, and it is not one project" is the house move and only loses "also"
  because there is nothing for it to be beside.
- **Do not put `IntroLoop` on a slide with the braces filled in.** See the deck section: the figure
  goes on the board exactly as the page renders it, empty braces and all.

---

## Unit 3: `workshop` (new, third and last)

**Effort: heavy**

The user has decided step 0 gains a workshop. This is the unit, plus a `flags.ts`, a board component,
two new Maven profiles and a deck divider. It closes `course-arc` finding 1 (nothing in 25 units
tells the student what to install) at the only place in the course where a readiness check can be
graded honestly.

### Do

1. **`front/src/steps/step0/units/workshop.html`** (you own this file outright).

   ```html
   <p data-i18n="workshop.lead.1">…</p>
   <p data-i18n="workshop.lead.2">…</p>
   <div data-figure="flags"></div>
   <h2 data-i18n="workshop.two-candidates.heading">Two candidates</h2>
   <p data-i18n="workshop.two-candidates.1">…</p>
   <p data-i18n="workshop.two-candidates.2">…</p>
   ```

   - `workshop.lead.1` EN: `Three runs, three flags, one board. Everything on it comes out of
     <code>kata/step0/java</code>, and every flag is checked here in your browser, so the board works
     with nothing else running.` / NL: `Drie runs, drie flags, één bord. Alles erop komt uit
     <code>kata/step0/java</code>, en elke flag wordt hier in je browser nagekeken, dus het bord werkt
     zonder dat er iets anders draait.`
   - `workshop.lead.2` EN: `House rule one applies from here on. Hand the run to your agent and read
     the flag off what it prints back.` / NL: `Vanaf hier geldt huisregel één. Geef de run aan je
     agent en lees de flag af uit wat die terugprint.`
   - `workshop.two-candidates.heading` EN `Two candidates` / NL `Twee kandidaten`
   - `workshop.two-candidates.1` EN: `The last row's build prints two strings in flag shape. Only one
     line is ticked. An agent that summarises the run for you will hand back both, or the wrong one,
     and it will sound equally sure either way. Read the output.` / NL: `De build van de laatste rij
     print twee strings in de vorm van een flag. Maar één regel is aangevinkt. Een agent die de run
     voor je samenvat geeft er allebei terug, of de verkeerde, en klinkt in beide gevallen even zeker.
     Lees de uitvoer.`
   - `workshop.two-candidates.2` EN: `Step 1 opens on <a href="/steps/step1/tokens">tokens</a>, which
     is what everything you send an agent is counted in.` / NL: `Stap 1 opent met
     <a href="/steps/step1/tokens">tokens</a>, de eenheid waarin alles wat je naar een agent stuurt
     geteld wordt.`
   - Keep it at this length. The row hints carry the instructions; the prose does not repeat them.

2. **`front/src/steps/step0/flags.ts`.** Same shape as `step1/flags.ts` and `step2/flags.ts`: a
   `FlagSpec` interface (`id`, `labelKey`, `hintKey`, `helpKey`, `hash`) and an exported array.
   **Salted hashes only, never plaintext**, and the salt is `CODE_SALT` from `code.ts`
   (`kata-step0-intro-v1`) so the existing hash carries over unchanged.
   - Row 1 `run`: `hash` is **copied verbatim** from `finishCode.hash` in `code.ts`:
     `d3b3a9d22b836da4bb31a39db357802c94fd148f2ec875a9f3ac2bc00a2ff454`. You do not need to know, and
     must not work out, what that flag says.
   - Rows 2 and 3 (`ready`, `pick`): you author these two flags yourself when you write the Java, so
     hash them with the same salt (`sha256Hex(CODE_SALT + flag)`, lowercase hex, `shared/lib/hash`).
     Keep them in the same `{le3t-sp0ken}` register as the rest of the course.
   - The file's docblock says where each flag comes from and repeats that the plaintext is not here.

3. **`front/src/steps/step0/FlagBoard.tsx`.** Model it on `step1/FlagBoard.tsx`, not step 2's: step
   1's reads its own `flags.ts` directly and carries the "n of 3 collected" counter, which is what a
   three-row board wants. It reads the `step0` namespace. **This is deliberate duplication**: the
   root `CLAUDE.md` records that a step owns its grading code and there is no shared module to factor
   it into. Do not generalise step 2's `FlagBoard` with an `ns` prop, and do not move either into
   `shared/`.
   - `storageKey` must be `kata.step0.flags` so `shared/lib/reset.ts` clears it by key shape.
   - Block `flags`, so ids read `flags-*` and `data-component` reads `FlagBoard`.
   - A row is always `#flags-item-N` with `data-state="solved" | "locked"`.
4. **Locale keys for the board**, both languages, mirroring step 1's block:
   - `flags.panel.title` EN `Flag board` / NL `Flagbord`
   - `flags.panel.description` EN `Three runs against kata/step0/java. Checked here in the browser.` /
     NL `Drie runs tegen kata/step0/java. Hier in de browser nagekeken.`
   - `flags.panel.progress` EN `{{solved}} of {{total}} collected` / NL `{{solved}} van {{total}}
     verzameld`
   - `flags.panel.solved` / `.check` / `.hint` / `.placeholder` / `.wrong`: copy step 1's wording,
     with `.wrong` EN `Not that one. Read the flag straight from the build output.` / NL `Niet die.
     Lees de flag rechtstreeks uit de build-uitvoer.`
   - Row 1: `flag.run.label` EN `The intro flag` / NL `De intro-flag`; `flag.run.hint` EN `Run this
     step's build with the intro profile.` / NL `Draai de build van deze stap met het intro-profiel.`;
     `flag.run.help` EN `Open the project in kata/step0/java and ask your agent to run the block from
     the previous page. There is nothing to solve here: the build prints the flag on the line that
     says the intro is complete. Paste it here, braces and all.` / NL `Open het project in
     kata/step0/java en vraag je agent om het blok van de vorige pagina te draaien. Er valt hier niets
     op te lossen: de build drukt de flag af op de regel die zegt dat de intro klaar is. Plak hem
     hier, mét accolades.`
   - Row 2: `flag.ready.label` EN `Ready to hunt` / NL `Klaar om te jagen`; `flag.ready.hint` EN `One
     profile checks what the rest of the course needs and prints the flag when it is all there.` / NL
     `Eén profiel controleert wat de rest van de cursus nodig heeft en print de flag als alles er is.`;
     `flag.ready.help` EN `Have your agent run mvn verify -Pready in kata/step0/java. It prints one
     line per thing the course assumes, and the flag on the last line when they all pass. When one
     does not, it names it, and that is the thing to fix before step 1 rather than at unit 22.` / NL
     `Laat je agent mvn verify -Pready draaien in kata/step0/java. Het print één regel per ding dat de
     cursus veronderstelt, en de flag op de laatste regel als ze allemaal kloppen. Klopt er een niet,
     dan noemt het welke, en dat is wat je vóór stap 1 in orde brengt in plaats van bij unit 22.`
   - Row 3: `flag.pick.label` EN `The right one` / NL `De juiste`; `flag.pick.hint` EN `The build
     prints two. Only one line is ticked.` / NL `De build print er twee. Maar één regel is aangevinkt.`;
     `flag.pick.help` EN `Have your agent run mvn verify -Ppick in kata/step0/java. Two strings come
     back in the flag's exact shape and one of the two lines is ticked. Ask for the output rather than
     a summary of it: an agent reading its own summary cannot tell you which, and will pick one
     anyway.` / NL `Laat je agent mvn verify -Ppick draaien in kata/step0/java. Er komen twee strings
     terug in precies de vorm van een flag, en één van de twee regels is aangevinkt. Vraag de uitvoer
     op in plaats van een samenvatting: een agent die zijn eigen samenvatting leest kan je niet zeggen
     welke het is, en kiest er toch een.`
   - `workshop.title` EN `Workshop` / NL `Workshop`, matching steps 1 and 2.

5. **`kata/step0/java` — two new opt-in profiles.** Both off by default, so plain `mvn verify` stays
   green and silent, which is the existing decision in that pom. Both store their flag through the
   existing `Veil` (shifted, never plaintext in the source), the way `IntroRevealIT` does.
   - **`ready` → `ReadyRevealIT`.** Prints one line per check, in the same `[x] name value` shape
     `IntroRevealIT` uses:
     1. `jdk 25 or newer` — `Runtime.version().feature() >= 25`.
     2. `repository complete` — `../../step1/java/pom.xml` and `../../step2/java/pom.xml` exist, so a
        partial download or a downloaded zip of one folder is caught here rather than at unit 5.
     3. `native-image available` — a **warning row, never a gate**: report it unticked with a line
        saying step 2's last flag needs a GraalVM JDK. Blocking day-one readiness on GraalVM would
        make the board ungettable for a student on a stock Temurin, which is the opposite of the
        point.
        Print the flag only when 1 and 2 pass. When either fails, fail the build with a message that
        **names which check failed and what to do**, and print no flag. That miss is the teaching
        move: it is `step2/workshop.native.3` taught small, on day one, where it costs five minutes
        instead of an afternoon.
   - **`pick` → `PickRevealIT`.** Prints two strings in flag shape, one line ticked `[x]` and one
     `[ ]`, and asserts both are brace-wrapped. The board accepts the ticked one. The decoy is a
     second veiled string, not a mutation of the real one.
   - Update `kata/step0/java/CLAUDE.md`: the two new profiles, what each prints, and the prohibition
     widened from one flag to three (**do not decode, reconstruct or reveal any of them, and do not
     explain the scheme that hides them**). Ask the integrator to widen the same line in the root
     `CLAUDE.md` (`## Layout`, the step 0 bullet) and in `## Build and test`.

6. **Registry (manifest):** third unit, id `workshop`, `title: 'workshop.title'`,
   `prose: 'always'` (D1), `inlineFigures: { flags: <FlagBoard /> }`, no quiz. Update the step 0
   docblock in `index.tsx`, which currently says "Two units".

7. **`front/src/steps/step0/CLAUDE.md`** (manifest): a section for this unit. What has to be recorded:
   why step 0's board grades the loop and the toolchain rather than knowledge; why the `-Pintro` flag
   moved off `backend`; that row 3 is where house rule 4's closing sentence ("the pick is yours") is
   practised, and that this is why `backend.lead.2` now scopes red herrings from this page rather
   than from step 1; that the board is browser-graded so step 0 works with nothing running; and that
   the `ready` profile warns about `native-image` rather than gating on it.

### Do not

- **Do not make the board hunt for a plaintext flag in an instruction file.** That is step 2's
  `setup` board and spending it here ends that exercise.
- **Do not print anything from the `ready` or `pick` profiles that shortcuts `-Pintro`**, and do not
  decode the intro flag to build them.
- **Do not make the board talk to a service.** Every board in this course grades in the browser
  against a salted hash, and step 0 in particular has no service at all.
- **Do not put plaintext in `flags.ts`.**
- **Do not gate the `ready` profile on GraalVM.**
- **Do not give this unit a quiz.** Three flags is the test.
- **Do not repeat the `cd` / `mvn verify -Pintro` block on this page.** It is on `backend`, one click
  back, and row 1's hint points at it.

---

## The deck (`deck.tsx` + `deck.*` keys) — integrator

**Effort: moderate**

Step 0 runs 2.5 slides per unit against a course norm of 4.2 to 4.8, and it is the only step with no
drawing on the board. The list below is 12 slides across 3 units, which is 4.0. Slide text is clean
throughout and has no AI tells: **do not rewrite the existing strings except where named.**

1. `deck-step0-title` — unchanged.
2. `deck-step0-welcome` (divider) — `eyebrow: 'deck.title'`, not `'step.title'`. The card
   deliberately says "Introduction" rather than the sidebar's "Start here" because "a room is not
   choosing", and that argument applies to the eyebrow word for word; steps 1, 2 and 3 have no such
   split. Same edit on `deck-step0-backend` and on the new workshop divider. Also rewrite
   `deck.welcome.divider.1` to carry all three ways of reading: EN `Read it alone, in class, or later
   as <mute>reference</mute>` / NL `Lees het alleen, in de les, of later als <mute>naslag</mute>`.
   Points 2, 3 and 4 stay.
3. `deck-step0-welcome-settings` (statement, **new**). The one action every person in the room must
   take before step 1, currently one bullet on a divider that is on screen for ten seconds.
   - `deck.welcome.settings.title` EN `Set your assistant <hi>now</hi>, before anything else` / NL
     `Zet nu je assistent, <hi>voor je begint</hi>`
   - `deck.welcome.settings.note` EN `Same cogwheel: reset throws your captured flags and finished
     pages away.` / NL `Zelfde tandwiel: reset gooit je gevangen flags en afgewerkte pagina's weg.`
   - One action and one cost. **Do not list the panel's rows on this slide**: that recreates exactly
     the maintenance problem the prose rejected.
4. `deck-step0-welcome-flag` (statement, **new**).
   - `deck.welcome.flag.title` EN `A flag looks like this: <hi>{f1r5t-5t3p5}</hi>` / NL `Een flag ziet
     er zo uit: <hi>{f1r5t-5t3p5}</hi>`
   - `deck.welcome.flag.note` EN `Braces and all, into the box on the page. Your browser checks it.` /
     NL `Mét accolades, in het veld op de pagina. Je browser controleert het.`
   - Reveals nothing: this string is plaintext in the unit HTML and in the quiz in both languages. It
     is not the intro flag.
5. `deck-step0-welcome-legend` (figure, **new**): `figure: <Legend />`, `scale: 1.9` to correct by
   eye. The deck's stated reason for leaving it off ("`Legend` only means something beside the icons
   it explains") inverts the rule it is invoked under: the point of `SlideFigure` is that the room
   looks up at the projector and down at the same drawing. `Legend` reads three locale strings and
   writes no storage, so the `TaskCard`/`FlagBoard` exclusion does not apply. It must sit **before**
   the rules slide, because rule 3 carries the coin icon and the legend is where a coin is given a
   meaning, which is the placement `step0/CLAUDE.md` defends on the page.
   - `deck.welcome.legend.title` EN `Three marks worth stopping for` / NL `Drie tekens om bij stil te
     staan`
6. `deck-step0-welcome-boards` (statement, **new**). The two-provenance split is the load-bearing
   claim of `How workshops work` and the deck compresses it to "your browser grades it".
   - `deck.welcome.boards.title` EN `Some flags are <hi>hidden</hi>. Some are <hi>printed by a
     build</hi>.` / NL `Sommige flags zitten <hi>verstopt</hi>. Andere worden <hi>door een build
     geprint</hi>.`
   - `deck.welcome.boards.note` EN `Both go into the board. It grades in your browser, with the
     service down.` / NL `Allebei gaan ze in het bord. Dat kijkt na in je browser, ook met de service
     uit.`
7. `deck-step0-welcome-rules` (statement, existing) — two strings only, so board and page say the
   rules the same way:
   - `deck.welcome.rules.3` EN `One flag, one session` / NL `Eén flag, één sessie`
   - `deck.welcome.rules.5` EN `Price the hunt when it is over` / NL `Reken de jacht af als ze voorbij
     is`
8. `deck-step0-backend` (divider) — `eyebrow: 'deck.title'`. Points unchanged; all three check out
   against the repo and are good lines.
9. `deck-step0-backend-loop` (figure, **new**): `figure: <IntroLoop />`, scale fitted by eye. This
   replaces the statement slide the deck dossier proposed for the same job, because the figure says
   it better and reuses the page's drawing exactly as the deck rule intends.
   - `deck.backend.loop.title` EN `Your agent runs the build. <hi>The build prints the flag.</hi>` /
     NL `Je agent draait de build. <hi>De build print de flag.</hi>`
10. `deck-step0-backend-herrings` (statement, existing) — add a note. The slide is unqualified while
    both braced strings in this step's own pages *are* the answer, so a room that takes it literally
    distrusts the two codes it is about to type in. The note also has to account for the new board's
    third row.
    - `deck.backend.herrings.note` EN `The two codes printed on these pages are the answer. The
      board's last row is where it stops being that simple.` / NL `De twee codes op deze pagina's zijn
      wél het antwoord. Bij de laatste rij van het bord houdt dat op.`
11. `deck-step0-workshop` (divider, **new**), `eyebrow: 'deck.title'`, `title: 'workshop.title'`:
    - `deck.workshop.divider.1` EN `Three runs, three flags` / NL `Drie runs, drie flags`
    - `deck.workshop.divider.2` EN `Hand the run to <hi>your agent</hi>` / NL `Geef de run aan <hi>je
      agent</hi>`
    - `deck.workshop.divider.3` EN `Read the output, not the summary` / NL `Lees de uitvoer, niet de
      samenvatting`
12. `deck-step0-workshop-pick` (statement, **new**):
    - `deck.workshop.pick.title` EN `Two candidates. <hi>One line is ticked.</hi>` / NL `Twee
      kandidaten. <hi>Eén regel is aangevinkt.</hi>`
    - `deck.workshop.pick.note` EN `The agent cannot tell you which. It will still sound sure.` / NL
      `De agent kan je niet zeggen welke. Hij klinkt er wel even zeker bij.`

Also update the `deck.tsx` docblock: it currently opens "No figures" and gives a reason for excluding
`Legend` that no longer holds. Keep the sentence about `CodeCheck` and the boards writing to
localStorage, which is correct and is the rule the next slide has to be measured against.

### Do not

- **Do not put `CodeCheck`, the new `FlagBoard` or the `set-your-assistant` `TaskCard` on any
  slide.** All three write to localStorage and would tick the tutor's machine. That rule is right and
  the existing deck applied it correctly.
- **Do not put `mvn verify -Pintro` or either printed code on a slide.** With D1 the page carries the
  block in every mode, so the constraint needs no revisiting.
- **Do not promote a unit `divider` to the dark `title` card.** Four dark cards across the whole deck
  is what makes them read as module boundaries.
- **Do not give a slide both `note` and `points`.**

---

## Verification after this pass

```
cd front && npm run build          # tsc -b + vite build. This is the type check.
cd front && npm run lint
cd kata/step0/java && mvn -q verify        # must stay green and silent by default
cd kata/step0/java && mvn verify -Pintro   # prints the intro flag
cd kata/step0/java && mvn verify -Pready   # prints the readiness rows and the flag
cd kata/step0/java && mvn verify -Ppick    # prints two candidates, one ticked
python3 <SCRATCH>/merge_locales.py step0   # parity report must be clean
```

Then read the page in all four renderings: guided and self, Claude and Copilot. Under D1 the prose is
now present in both modes, which is the thing to eyeball first. Do not run prettier.
