# Work order: step 1 ("Context, model, mechanisms")

Ten units, registry order: `tokens`, `prompt`, `tools`, `context`, `session`, `harness`, `model`,
`truth`, `workshop`, `recap`.

This order is executable without going back to the dossiers. Every replacement sentence below is
verbatim. Where a Dutch value is given it is verbatim too. Where one is not given, write it in the
same pass anyway: **no English change ships without its Dutch counterpart.**

## Rules that apply to every unit here (do not restate them per unit)

- **Locale patch protocol.** Never open `locales/en.json` or `locales/nl.json` with Edit or Write.
  Write `<SCRATCH>/patches/step1/<unit>.json` with `en` / `nl` / `removeEn` / `removeNl` / `afterNl`.
  A key you add to `en` needs the same key in `nl`.
- **Files you own outright:** your `units/<unit>.html`, and any NEW figure component `.tsx` you
  create. Files an integrator owns: `index.tsx`, `quiz.ts`, `deck.tsx`. Everything you want done to
  those goes in `<SCRATCH>/manifests/step1/<unit>.json`.
- **No em-dashes** anywhere: English, Dutch, slide text, quiz text, figure labels.
- **A key is a location.** A renamed `<h2>` renames every key under it, in the HTML and in `nl.json`.
  A cut paragraph is a `removeNl` entry, not an orphan.
- **A `data-figure` marker is a direct child of the body and is never wrapped.** Never put
  `data-audience` and `data-assistant` on the same element.
- **`data-audience="guided"` on a run of prose renders for nobody.** Guided mode drops every
  top-level non-figure node whatever the attribute says. Three units below carry that bug. Do not
  introduce a fourth: if a line is for the teacher, it goes on the deck.
- **Prohibitions (breaking one ruins an exercise):** do not decode, implement or reveal any of the
  three workshop flags or the fourth in `kata/step1/front/`; do not add tracing to the catalogue
  pipeline; do not solve `kata/step1/java/problem.md` (no cut of it, no `solve.md`, no
  `plan-solve.md`, no shelves package). `flags.ts` holds salted hashes only.
- **Nothing outside `front/src/index.css` holds a colour. Every rendered element carries an `id`
  (BEM, kebab-case) and a `data-component`.**
- **Verify at the end:** `cd front && npm run build` (this is the type check) and `npm run lint`.
  Never run prettier.

---

# 1. `tokens`

**Effort: moderate**

Ten one-clause fixes, one key renumber, one figure addition, one deck slide. The unit's prose is
excellent and the figure work is the best in the course; nothing here touches the voice.

### Do

1. **`tokens.reads-all.1` contradicts `tokens.reads-all.4` four sentences later.** `.1` closes "no
   shortcut for the parts that did not change"; `.4` then says the front of the pile is cached. Make
   `.1` a claim about lookup and let `.4` own what survives. Replace the whole paragraph.
   EN: `Inside every one of those passes, the model does not look anything up. Each token is weighed
   against every token in front of it, and every one of those weighings is worked out rather than
   fetched. There is no index, and nothing to search.`
   NL: `In elk van die beurten zoekt het model niets op. Elk token wordt afgewogen tegen elk token
   dat ervoor staat, en elke afweging wordt uitgerekend in plaats van opgehaald. Er is geen index, en
   niets om te doorzoeken.`

2. **`tokens.reads-all.2` opens by asserting something the redesigned `NextToken` invites the reader
   not to do.** A reader who takes `was` instead of `timed` never watched this sentence being
   written. Name the favourite chain instead. Replace the first sentence only; the rest of the
   paragraph stands.
   EN: `Take the favourite three times above and this is the sentence you get, with the full stop
   left off.`
   NL: `Neem hierboven drie keer de favoriet en dit is de zin die je krijgt, zonder de punt.`

3. **`tokens.lead.3`'s ratio disagrees with `TokenSplit` twelve lines below it** (the figure prints
   6.1 characters per token). Widen the band so the figure is the evidence rather than the
   counterexample.
   EN: `For ordinary English, four to six characters go into one token, so a page of prose runs to a
   few hundred.`
   NL: `Voor gewoon Engels gaan er vier à zes tekens in één token, dus een bladzijde proza komt op een
   paar honderd uit.`

4. **Two consecutive sections take a bare "It" and the two "It"s are different things** (the
   tokeniser, then the model). Name the subject once, in both languages, and fix the Dutch pronoun,
   which is also wrong on its own terms (`het model` is neuter) and disagrees with the deck.
   - EN `tokens.one-at-a-time.1`, first sentence: `Given everything it has been handed so far, the
     model scores the tokens that could come next, and one of them is taken.`
   - NL `tokens.one-at-a-time.1`, first sentence: `Op basis van alles wat het tot dan toe gekregen
     heeft, geeft het model de tokens die zouden kunnen volgen een score, en één daarvan wordt
     genomen.`
   - NL `tokens.one-at-a-time.heading`: `Het schrijft één token per keer`
   - NL `tokens.reads-all.heading`: `Het leest alles, elke beurt opnieuw`
   Those two headings now match `deck.tokens.next.title` and `deck.tokens.attention.title`, which
   already say `Het`.

5. **The two forward pointers are the only cross-unit references in the step that are not links, and
   they are set in mono.** JetBrains Mono means "what the machine produced"; a unit name is not that.
   - EN `tokens.one-at-a-time.5`, last sentence: `The <a href="/steps/step1/model">model unit</a>
     puts numbers on that gap.`
   - EN `tokens.reads-all.4`, last sentence: `The <a href="/steps/step1/harness">harness unit</a>
     prices it.`
   - NL `one-at-a-time.5`: `De <a href="/steps/step1/model">unit over het model</a> zet daar cijfers
     op.`
   - NL `reads-all.4`: `De <a href="/steps/step1/harness">unit over het harness</a> rekent het door.`

6. **`words-into-tokens.label` names two of the figure's six stages.** "tokenization process" covers
   stages one and two; stages three to six are the forward pass and are the payoff. Keep it a name
   rather than a claim (the recorded reason the old eyebrow was cut).
   EN: `one word through the model` · NL: `één woord door het model`
   Leave `words-into-tokens.description` (the screen-reader walk) alone; it is already accurate.

7. **Nothing on the page says the counts come from a tokeniser neither product uses.** `o200k_base`
   is OpenAI's. The component comment says so and never reaches a student; the caption cannot carry
   it, because a caption names the source and the prose does the explaining. Append to
   `tokens.not-words.1`:
   EN: `Every provider ships its own vocabulary, so the boundaries differ in detail. The shape does
   not.`
   NL: `Elke aanbieder heeft zijn eigen woordenlijst, dus de grenzen verschillen in detail. De vorm
   niet.`

8. **Cut `tokens.one-at-a-time.2` entirely.** Both its sentences are already on screen inside
   `NextToken` (`next-token.pass` and `next-token.done` say them). This is exactly the recap layer
   the step notes record as having been removed from this unit one sentence at a time; this one
   survived, and it stands between the figure and the section's payoff line.
   Renumber in `units/tokens.html` and in `nl.json`: `.3 → .2`, `.4 → .3`, `.5 → .4`. `removeNl` the
   now-dead trailing key. **Two ripples in the same change:** `NextToken.tsx:15` and
   `PickTheNext.tsx:16` both cite `tokens.one-at-a-time.4` by key in their doc comments and now mean
   `.3`.

9. **Two stale HTML comments at the top of `units/tokens.html`.**
   - Lines 1-5 say "the page keeps only the three figures". There are five markers.
     Replace with "…so the page keeps only the four figures and the exercise".
   - Lines 14-16 describe a figure that was replaced ("It draws the paragraph above it and nothing
     else: the sentence, then the chunks"). Replace with: "The lead figure, and the one figure in the
     unit with no heading above it, so a guided room opens on the drawing rather than on a title. It
     follows one word all the way in and one token back out, and the paragraph above it says none of
     that."

10. **`tokens.lead.2`: the Dutch names the subject and the English does not**, and the Dutch uses an
    acronym the course has not introduced. Both halves get fixed.
    EN, replacing the last sentence: `So this unit is not about what goes into an agent, but about
    what you measure it in.`
    NL, replacing the opening sentence: `Een token is de eenheid waarmee een taalmodel werkt.`
    (leave the rest of the Dutch value as it stands).

11. **`tokens.not-words.3`'s English closing clause is looser than the Dutch** ("for it" can be read
    as "because of it" or "about it").
    EN: `Your class names and a language with little text online it has not, and it answers worse on
    both.` Dutch unchanged.

12. **`TokenSplit`: add a persistent four-row rate strip.** The section's claim is comparative
    (prose cheapest, ids dearest, the gap is "several times") and the figure shows one measurement at
    a time, so the reader has to click, remember and subtract. This is also what makes item 3's
    reconciliation visible instead of asserted.
    - Placement: immediately under the sample chips, above the panel. Always shows all four rows,
      unaffected by the selection except for emphasis.
    - Rows in the picker's own order: prose, Java, class name, id.
    - Each row: sample name on the left in the reading face; a horizontal bar whose length is
      **tokens per 100 characters** (prose 16, Java 22, class name 23, id 61); the number at the
      right end in mono.
    - Selected sample's bar in solid `--primary`, the other three in the muted fill the step gives to
      given text. One scale, 0 to the widest row, no ticks, no gridlines.
    - Two new keys in both bundles: `token-split.rate.label`, `token-split.rate.unit`. The per-sample
      names already exist.
    - Do not touch the chips, the source line, the count line or the caption.

13. **Deck (manifest entry).** Insert a new slide after `deck-tokens-split`:
    ```
    id: 'deck-tokens-language'  kind: 'statement'  ns: 'step1'
    eyebrow: 'tokens.title'  title: 'deck.tokens.language.title'  note: 'deck.tokens.language.note'
    ```
    - EN title: `Ask in <hi>the language it has read most of</hi>`
    - EN note: `The vocabulary came out of the training pile. What breaks into fragments is what the
      model read least of, and the answers are shakier for it.`
    - NL title: `Vraag het in <hi>de taal die het model het meest gelezen heeft</hi>`
    - NL note: `Het vocabulaire komt uit de trainingsstapel. Wat in fragmenten uiteenvalt, is wat het
      model het minst gelezen heeft, en de antwoorden zijn daar wankeler om.`
    This is the unit's one prose argument and the step's first actionable move, and on the board a
    room currently meets it for the first time in `recap`.

### Do not

- **Do not put a Dutch row into `TokenSplit`.** An English row against a Dutch one makes the figure
  an argument about languages instead of about tokens. The claim lives in `not-words.3` prose, and
  the step notes say so explicitly. Item 12's strip is a rate readout, not a second sample.
- **Do not draw a teal context frame anywhere in this unit**, in any figure or in the exercise. The
  first frame in the step is `ToolsInContext` in `tools`, and spending the vocabulary here costs that
  figure its job.
- **Do not change the paired sentence** `the build failed because it timed out` in `NextToken` or
  `TokenAttention`, and do not reorder any candidate list: the favourite chain is pinned to
  `timed → out → .` and that invariant is what holds the pair together.
- **Do not add a quiz.** `promptQuiz` is the next page and `contextQuiz` three pages on;
  `PickTheNext` already asks this unit's one misbelievable question, with the scores on screen.
- **Do not add a `TaskCard`.** The unit already asks the reader to do four things, the student has no
  tokeniser to run, and the step notes record that instructions to click were removed here one at a
  time.
- **Do not drop the coin from `reads-all.3`.** It was proposed on the grounds that the coin marks a
  maxim rather than a move; that is taste, the sentence is a good closer, and the recap does not lift
  this one.
- **Do not add a caption to `TokenAttention`**, and do not add one to `WordsIntoTokens`: two
  identical provenance captions read as a copy rather than as a source.

---

# 2. `prompt`

**Effort: heavy** — one of the two units in the worst shape.

This is the least-protected page in the step: `step1/CLAUDE.md` gives it no section of its own, only
ordering constraints. It names a Java class that does not exist, in the paragraph teaching exactness;
its main heading says "Instruction" over a section that is three-quarters reasoning level, and that
is the page `model` links into by name; it names *entropy* two units before `context` defines it with
an anchor, a heading and a quiz question; it closes by calling "makes the model think" the failure
mode forty lines after calling it the fix; and it teaches three doable moves and asks the student to
do none of them.

### Do

1. **`prompt.what-steer-after.3` names `ExerciseController`, which does not exist in this
   repository.** It is a residue of the retired free-text exercise backend. This is the showcase
   example of concreteness, in the unit that teaches *be exact*. Also fixes item 2 in the same
   sentence. Replace the paragraph.
   EN: `Be exact about what changes. "Fix the login" and "make <code>TitleController</code> return a
   404 when the catalogue comes back empty" go to the same model. One is specific and lets the model
   focus. The other makes the model guess.`
   NL: `Wees exact over wat er moet veranderen. "Fix de login" en "laat <code>TitleController</code>
   een 404 teruggeven als de catalogus leeg terugkomt" gaan naar hetzelfde model. De ene is specifiek
   en laat het model focussen. De andere laat het model gokken.`
   **Ripple, same change:** `.claude/skills/lesson-writing/SKILL.md` uses `ExerciseController` as its
   worked example twice ("Concrete before abstract", "Define by contrast, with something real").
   Update both, or the next author copies the dead class back in.

2. **The unit argues against itself on one verb.** `instruction.2` teaches that making the model
   think is the good move; the closing sentence makes it the failure. Both languages have the same
   fault, so this is not drift. Folded into item 1: `The other makes the model guess.` /
   `De andere laat het model gokken.`

3. **Split `Instruction` into two sections.** One of its four paragraphs is about a prompt being an
   instruction; the other three are the reasoning level, its cost and what it covers.
   `model.reasoning-level.1` opens **"You met the reasoning level in the prompt unit"** and links
   here, and a student who follows that link lands on a page with no heading of that name.
   - `Instruction` keeps `prompt.instruction.1` alone.
   - New `<h2 data-i18n="prompt.reasoning-level.heading">Reasoning level</h2>` takes the other three.
   - Rename `prompt.instruction.2/3/4` → `prompt.reasoning-level.1/2/3` in `prompt.html` and in
     `nl.json`. NL heading: `Reasoning level` (the term already stays English inside the Dutch
     paragraph).
   - Visit the HTML comment above the old `instruction.2` (it names `model.reasoning-level.1`) and
     `audit.md` item 3, which quotes `prompt.instruction.3` by key.

4. **Split `What you steer after that` into `Bundling` and `Be exact`.** The heading is anaphoric
   ("that" points at plan mode, which is not the subject) and it is the leftovers bin of the unit.
   Splitting also puts each figure under the sentence that earns it and makes the page match the two
   slides the deck already has.
   - `<h2 data-i18n="prompt.bundling.heading">Bundling</h2>` takes `what-steer-after.1` and `.2`
     (renamed `prompt.bundling.1` and `.2`) plus the `bundle-compare` marker. The `/clear` paragraph
     belongs here: both halves are about not letting one window carry two jobs.
   - `<h2 data-i18n="prompt.be-exact.heading">Be exact</h2>` takes `what-steer-after.3` (renamed
     `prompt.be-exact.1`) plus the `exact-ask` marker.
   - NL headings: `Bundelen` / `Wees exact`.

5. **Stop naming *entropy* here.** `context` owns the word: it has `<h2 id="entropy">`, an in-page
   anchor from `bad-context-bad.4`, a deck slide and a `contextQuiz` question. Keep the mechanism,
   drop the naming. Replace `prompt.bundling.2` (was `what-steer-after.2`) after the icon pair:
   EN: `Bundle what you want within one part of the application <svg data-icon="gem"></svg>
   <svg data-icon="coin"></svg> Every follow-up is another turn, and every turn adds noise the next
   turn has to read past. It compounds. Three separate questions leave the window messier than one
   question covering all three.`
   NL: `… Elke vervolgvraag is een extra beurt, en elke beurt voegt ruis toe waar de volgende beurt
   doorheen moet lezen. Het stapelt op. Drie losse vragen laten het venster rommeliger achter dan één
   vraag die de drie samen dekt.`
   Leave `context` untouched.

6. **`prompt.instruction.1` glosses its own metaphor** ("It cascades, each step building on the one
   before") and opens on the vague-grand register ("sets a lot more in motion"). Replace the first
   two sentences.
   EN: `A prompt is an instruction, and it cascades. So make sure your prompt actually says what you
   want the model to do. Any inaccuracy in it only compounds from there.`
   NL: `Een prompt is een instructie, en ze werkt als een cascade. Zorg er dus voor dat je prompt
   echt zegt wat je het model wil laten doen. Elke onnauwkeurigheid erin stapelt zich alleen maar
   op.`

7. **`prompt.reasoning-level.3` (was `instruction.4`) opens on a filler frame** that the
   `lesson-writing` skill bans by name. The Dutch already cold-opens ("Nog dit:"), so the Dutch
   leads.
   EN: `That thinking is not only about your question. It also covers the agent's own moves, which
   file to open next and what to hand itself as input for the step after that.` Dutch unchanged.

8. **`prompt.reasoning-level.1` (was `instruction.2`): the demonstrative reaches back across an
   intervening sentence.** Swap the first two sentences.
   EN opening: `A prompt is seldom enough on its own to carry everything you meant by it. Models work
   the question over before they answer, and that working over is the <strong>reasoning
   level</strong>. It runs from low up to max. Turn it up and the model reflects on your question
   rather than answering it straight …` (rest unchanged). Dutch follows the same reordering.

9. **Verify the reasoning-level scale, then say where the dial is.** The claim "it runs from low up
   to max" carries no `data-assistant` and `copilot-specific.md` has no section on reasoning levels
   at all, while it verifies plan mode for both. The unit also tells the student to "weigh when you
   need more reasoning, and when you need less" and never says where the control is, which is the one
   place the unit tells without showing.
   - Check both products and record the finding, with its date, in `copilot-specific.md`, the way
     every other product claim there is recorded.
   - If the scale is Claude Code's only, either scope the clause ("low to max in Claude Code") or
     split the sentence on `data-assistant`. **If you cannot verify it, drop the named endpoints**
     and write `and it has more than one setting` rather than inventing a range.
   - Add the mechanism to `prompt.reasoning-level.2`, one clause: `You set it per prompt rather than
     per project.` / `Je zet hem per prompt, niet per project.`

10. **`prompt.lead.1`: the Dutch is in the second person and the English is product-speak** ("All
    user input"), in a unit titled "Your prompt", in a course whose rule is that the student is "you".
    EN: `Everything you send the agent is a prompt. Of everything a model is handed it is usually the
    smallest, and <a href="/steps/step1/session">the session</a> is what dwarfs it. It is also the
    most valuable, because it is the one part carrying your intent.`
    The forward pointer is deliberate: the lead's first claim is a comparison the reader cannot check
    for five pages otherwise. "send" rather than "type" keeps `lead.2`'s point that interview answers
    count too. Dutch unchanged apart from matching the new pointer.

11. **Point `prompt.meta-prompting.2` at the unit that owns tiers.** The unit spends `model`'s
    vocabulary five units early ("expensive model", "top tier", "model size") and `model` points back
    here by name; the pointer runs one way only. Add one sentence, in the shape `tokens` uses.
    EN: `Spend an expensive model on this. Writing a prompt is a few hundred tokens next to executing
    one, so the top tier is cheap here <svg data-icon="gem"></svg> <svg data-icon="coin"></svg> Which
    tiers there are, and what they cost, is <a href="/steps/step1/model">the unit on the model</a>.
    Running the task is where the money goes.`
    NL: replace `Gebruik daar gerust een duur model voor` with `Zet daar een duur model op.` ("gerust"
    softens a command into permission), and add the same pointer sentence.

12. **Delete the `bundle-compare.hint` figcaption and the key from both bundles.** "This compounds:
    the more messages you send, the bigger the context gets" is a caption explaining the drawing,
    which breaks the house rule (a caption states provenance, the prose does the explaining), and it
    repeats `bundling.2` eight lines above it. The figure already prints
    `requests: 3 · messages on the wire: 12`, which is the claim measured.

13. **`exact-ask.exact.prompt` is ungrammatical and imprecise**, on the card about exactness. "fix
    the position for the label on #member-name" is Dutch word order showing through, and it names
    neither the fault nor what fixed looks like while the figure goes to the trouble of drawing the
    fault as a measured 32px band.
    EN: `remove the 32px margin under the label for #member-name`
    NL: `haal de marge van 32px onder het label voor #member-name weg`

14. **Add a `TaskCard`, `block="plan-it-twice"`, keyed to `kata.step1.plan`.** The unit teaches three
    moves a reader can only learn by doing them and asks for none. The self-only aside is already a
    task card written as reading, which is the exact complaint the repo recorded when `ConnectOne`
    replaced two paragraphs.
    - Shape: `<hr />`, then `<h2 data-i18n="ui:quiz.title">Test yourself</h2>`, then the marker, then
      the registry quiz underneath. `showsExerciseHeading` in `shared/lib/content.ts` already
      suppresses `QuizPanel`'s duplicate heading; `context` is the existing proof this composes.
    - One tick for the card, never one per move. Every move is one line.
      1. `Take a task in your own project you were about to type as one line.`
      2. `Ask for it straight, on the cheap tier, and keep the answer.`
      3. `Ask for the same thing again through plan mode, read the plan, and fix one thing in it
         before you approve.`
      4. `Say which of the two you would ship, and which decision the interview made you take.`
    - Move 4 is the exercise, the way `SurviveTheClear`'s clear is: it turns "a cheaper model driven
      through a plan routinely beats a one-shot on the expensive one" from a claim the student is
      told into one they have watched.
    - **Delete `prompt.plan-mode.4`** (the self-only aside) in both bundles. A card plus an aside
      saying the same thing is the aside coming back one sentence at a time. `plan-mode.5` (guided)
      stays as it is.
    - **Ripple:** `step1/CLAUDE.md` says "the two 'try it once yourself' asides in `prompt` and
      `session`" and "All five tasks are `shared/components/TaskCard.tsx`". Both become "one aside"
      and "all six tasks". `reset.ts` needs no edit: `kata.step1.` is cleared by key shape.

15. **Draw `ReasoningCost`**, under `prompt.reasoning-level.2` in the new section. `instruction.3`
    asks the reader to weigh two quantities and shows them neither, and the unit's shape makes it
    worse: a bare oval, then nine undrawn paragraphs, then two figures back to back at the foot.
    - Four rows, one per level, using whatever scale item 9 verified. Each row is one horizontal bar
      of two segments: a **dashed teal** segment for thinking tokens (dashes already mean "what is
      not in your answer") and a **solid** segment for the answer.
    - The answer segment is **identical in every row**; only the dashed one grows, roughly 1x, 3x,
      8x, 20x. The turn's token count in mono at the right of each bar.
    - What the reader takes: the thing you pay more for is not a better answer, it is more thinking in
      front of the same answer, and it stays in the window afterwards. That is exactly the
      misconception the `reasoning-level` quiz question tests.
    - **Constraints:** no teal context frame. Numbers are hand-authored, so it carries a caption
      admitting it, the way `NextToken`'s does. No currency: `ModelPricing` in `model` is the only
      place in the course a number has one.
    - Gate this on item 9. If the scale cannot be verified, do not ship the figure.

16. **`quiz.ts` doc comment (manifest).** `promptQuiz`'s comment says "one per section of
    `units/prompt.html`", which was never true and is less true after the splits. Replace with: "one
    per section that has something a reader gets wrong; meta-prompting is unasked because plan mode is
    meta-prompting with the provider's own machinery around it."

17. **Two stale internal docs (manifest / note).** `index.tsx:60` says "That makes `prompt` the unit
    that defines the word context" and `step1/CLAUDE.md:88` says "The word *context* is likewise not
    used before `prompt` defines it". Both contradict the same file's lines 31-35 and the HTML comment
    at the top of `prompt.html`, and both will mislead the next editor into putting the definition
    back.

18. **Dutch hygiene.** `nl.json`'s `prompt.plan-mode.4` value is `"<p> Probeer het … </p>"` with a
    space inside each tag; if the key survives at all it should match the rest of the bundle. (It does
    not survive item 14, so this is a note.) In `quiz.plan-beats-one-shot.question`, NL renders "line"
    as **lijn**; every other Dutch string in the course uses **regel**.

19. **Deck (manifest).** Three entries.
    - **Retitle `deck.prompt.in-context.title`.** It reads "The part you wrote is the smallest part"
      over a drawing containing one shape. On the page the paragraph supplies the comparison; on the
      projector the prose is gone by design, so a room sees one oval headed "the smallest part" with
      nothing to be smaller than. EN: `One shape: the message you type` · NL: `Eén vorm: het bericht
      dat jij typt`. The "smallest part" claim stays on `deck.prompt.divider.1`.
    - **New slide `deck-prompt-reasoning`**, `kind: 'statement'`, after `deck-prompt-in-context`.
      `deck.prompt.divider.2` promises reasoning level and the block never delivers it; the only
      reasoning slide in the deck is four units later and exists to keep the two dials apart.
      EN title: `Turn it up and the model <hi>reflects</hi> instead of answering`
      EN note: `That absorbs some of what you left out. The thinking tokens stay in the window and
      stay on the bill.`
      NL title: `Zet je het hoger, dan <hi>reflecteert</hi> het model in plaats van te antwoorden`
      NL note: `Dat vangt op wat je niet gezegd hebt. De denk-tokens blijven in het venster staan en
      blijven op de rekening staan.`
    - **New slide `deck-prompt-meta`**, `kind: 'statement'`, after the one above.
      EN title: `Let <hi>the expensive model</hi> write the prompt`
      EN note: `A few hundred tokens next to executing one. Running the task is where the money
      goes.`
      NL title: `Laat <hi>het dure model</hi> de prompt schrijven`
      NL note: `Een paar honderd tokens, naast het uitvoeren ervan. Het geld gaat naar het draaien
      van de taak.`
    - **Move `deck-prompt-plan`** to sit directly after `deck-prompt-meta`, ahead of
      `deck-prompt-bundle`. No key changes. In the unit, plan mode comes before the steering moves;
      on the deck the plan payoff is currently last, so the block contradicts both the unit and its
      own divider's ordering.

### Do not

- **Do not write a definition of *context* back into this unit.** It was cut on purpose: a definition
  of the window is the wrong thing to open a page about the prompt with. If one is ever wanted again,
  `context` is the unit that owns it.
- **Do not give `PromptInContext` a frame, other layers, or a to-scale sliver.** It is the weakest
  drawing in the step and every repair is a documented prohibition: a student meets it before they
  have met the window, so a frame spends the vocabulary a unit early and leaves `ContextDiagram`
  re-showing a picture they had already seen. Leave it exactly as it is.
- **Do not touch the three quiz questions.** They are among the best in the course; each hands the
  student a result and asks for the cause, and `plan-beats-one-shot` and `reasoning-level` together
  protect the `prompt`/`model` boundary.
- **Do not add a fourth quiz question on exactness.** Three is the course's standard and the task
  card in item 14 is the better instrument.
- **Do not gate `/clear` on `data-assistant`.** It is the same command in both products; the shared
  half is the more useful half.
- **Do not redraw `BundleCompare` or `ExactAsk`.** They measure what no sentence can and they are two
  of the best figures in the course.

---

# 3. `tools`

**Effort: heavy**

The best-instrumented page in the course: eight figures, four things to do, every repository number
measured. What stops it being excellent is three claims that do not survive contact with the reader's
own machine, two headings that argue with their own first sentences, and a load-bearing noun used
nine times three units before it is defined.

### Do

1. **`tools.list-itself-window.4`'s tool ceiling is disproved by the harness the reader is running.**
   Claude Code ships on the order of fourteen built-in tools and works; Copilot CLI ships its own set
   plus the whole GitHub MCP server, which `list-itself-window.2.copilot` says out loud two blocks
   above. So the page tells a Copilot reader they are past the ceiling in the section where it states
   the ceiling. A student who runs `/context` one unit later sees the list. Keep the escalation; scope
   the count to what the student controls.
   EN: `Four or five <em>added</em> servers' worth of tools is about the most one context holds well,
   on top of whatever your harness already starts you with. Past that the agent spends its attention
   picking between them, and a longer list is rarely the answer. Give that job its own specialised
   agent, with the tools it needs and nothing else.`
   NL: `Vier of vijf aangesloten servers is ongeveer het meeste dat één context goed draagt, bovenop
   wat je harness je sowieso al meegeeft. Daarboven gaat de aandacht van de agent naar het kiezen
   tussen die tools, en een langere lijst is zelden het antwoord. Geef dat werk zijn eigen
   gespecialiseerde agent, met de tools die het nodig heeft en verder niets.`
   **Ripple:** `step1/CLAUDE.md` calls this "the only number the course puts on a tool count"; that
   sentence moves with the edit, and the deck slide in item 11 must carry the rescoped number.
   *(Recorded dissent: the cross-course fact-check judged the figure a judgement framed as one and
   left it alone. Take the rescope anyway: it costs one clause and removes the contradiction with the
   Copilot paragraph in the same section.)*

2. **`tools.stay-critical.3` teaches a mechanism that is not there.** Tool results arrive in their own
   content blocks with their own role, the harness knows which is which, and providers train an
   instruction hierarchy. The marking exists; what it does not do is hold, which is the far more
   useful claim and the one `SpotInjection` underneath actually grades.
   EN: `None of that shows once it is in the window. Your prompt, the agent's own notes and a
   paragraph off a page it opened thirty seconds ago all arrive marked, and the marking does not hold:
   the model was trained to trust you over a tool result, not built to. It reads the stranger's line
   and builds on it anyway.`
   NL: `Daar zie je niets meer van zodra het in het venster zit. Jouw prompt, de notities van de agent
   zelf en een alinea van een pagina die hij dertig seconden geleden opende komen allemaal gemarkeerd
   binnen, en die markering houdt niet: het model is getraind om jou meer te vertrouwen dan een tool
   result, niet gebouwd om dat te doen. Het leest de regel van de vreemde en bouwt er toch op verder.`

3. **`connect.browser.label` gives a bare `/catalog` with no host, and the course never says where the
   frontend runs.** The sibling move one line up gives `localhost:8080/api/titles`. Grepping both step
   locale bundles and every unit HTML for `5173`, `npm run dev` or `/catalog` returns exactly this one
   label. The one route in the task that exercises the MCP server against the catalogue is the one
   route whose target the curriculum never states.
   EN: `Ask it for the same nine titles again through the server: open
   <code>localhost:5173/catalog</code> in the browser it drives, press the button, read them off the
   page.`
   NL: `Vraag dezelfde negen titels opnieuw via de server: open <code>localhost:5173/catalog</code> in
   de browser die hij bestuurt, druk op de knop, lees ze van de pagina.`

4. **Anchor *harness* at first use.** The word is load-bearing here (nine uses in this unit, six more
   in `session`) and is defined in `harness.lead.1`, unit 6 of 10. Nothing in step 0 or in `tokens` or
   `prompt` defines it in prose; the only earlier appearance is "The `harness` unit prices it", which
   names a page rather than a thing. Nothing in the step notes records a decision about it, unlike
   *context*, so this is an oversight. Point rather than teach twice. Replace `tools.lead.2`:
   EN: `This is where an agent's abilities come from. <code>grep</code> to search your codebase, an
   edit tool to change a file, <code>curl</code> to call an API, an MCP server for whatever your
   harness does not ship on its own. The <a href="/steps/step1/harness">harness</a> decides which
   tools exist. What they hand back is this layer.`
   NL: link text `de unit over het harness`, path unchanged.
   This edit also carries item 5.

5. **`sed` is named twice as the agent's way of changing a file, and no agent in this course does
   that.** Both products edit through a dedicated edit tool. The reader is one unit from running
   `/context` and finding `Edit` and `Write` and no `sed`. In `lead.2` (item 4's text) `sed` is
   already gone. In `tools.list-itself-window.3`: `An agent holding <code>grep</code>, an edit tool
   and a test runner is choosing between three.` Dutch follows. `grep` and `curl` stay: agents
   genuinely run those through a shell.

6. **Expand MCP once, at first use, and break the tricolon run in the same sentence.** `grep -rin
   "model context protocol"` over the whole repository returns nothing; a section of four paragraphs
   and three figures is built on a bare acronym. This also breaks the run of three consecutive
   paragraphs each landing on a three-item list (`lead.3`, `extra-tools.1`, `extra-tools.2`).
   Replace `tools.extra-tools.1` (becomes `tools.mcp-servers.1` after item 8):
   EN: `An MCP server can be anything. Model Context Protocol is the standard your harness speaks to
   reach one, and what is on the other end is up to whoever wrote it: a server for your issue tracker,
   one for your database, one that drives a browser. Somebody else wrote it. You connected it, and now
   the model can call it. Your harness runs the call and appends what came back, exactly as it does
   for <code>grep</code>.`
   Dutch moves with it.

7. **Rewrite `tools.extra-tools.2` (becomes `tools.mcp-servers.2`)** to drop the third tricolon and
   the doubled `your database`, which illustrates an MCP *server* one paragraph and a *resource* the
   next, at the exact moment the section's job is to hold those two apart.
   EN: `Tools are not all a server offers. It can also hand over material it collected on its own: a
   page out of a wiki, or last quarter's design document. Nobody called anything to get it. Your
   harness took it and put it in the window, and the model reads it there next to your prompt. Content
   that arrives that way has a name of its own. A resource.`
   Dutch moves with it.

8. **Rename the section heading `Extra tools` → `MCP servers`.** The heading and the section disagree
   in the section's own words: its second paragraph opens "Tools are not all a server offers", and
   roughly half of it is about the two things a server offers that are explicitly not tools.
   - Key renames in `units/tools.html` and `nl.json`: `tools.extra-tools.heading` → `tools.mcp-servers.heading`;
     `.1`, `.2`, `.3.claude`, `.3.copilot`, `.4` all follow.
   - NL heading: `MCP-servers`.
   - **Ripple:** `step1/CLAUDE.md`'s assistant-variants list names `tools.extra-tools.3`. Grep the old
     slug afterwards.

9. **Rename the closing heading `It costs the same as everything else` → `You pay for it on every turn
   after`.** The heading argues pricing and the paragraph under it argues volume ("A tool result is
   usually the bulkiest thing in the window"), and the reader has to reconcile them unaided. The Dutch
   heading already reads closer to the truth ("Het kost evenveel als al de rest" is naturally read as
   "as much as all the rest put together"), which is independent corroboration: take the English to
   the Dutch claim.
   - Key renames: `tools.costs-same-everything.heading` and `.1` → `tools.pay-every-turn-after.*`.
   - NL heading: `Je betaalt ervoor bij elke beurt daarna`.

10. **Break the sentence said twice across the first figure.** `lead.3` closes "Only what it returns
    comes back in, and it comes back as plain text next to your prompt"; `lead.4` then says "It gets
    the result and nothing else". That also buries the truncation line in the middle of the paragraph
    instead of at the end. The rewrite folds in the truncation hedge as well, since a silently
    truncating harness is not what either of this course's products does. Replace `tools.lead.4`:
    EN: `That dashed half is the part the model never sees. A file the harness decided to cut short
    and a file that is genuinely short are the same file from in there, unless something in the result
    says otherwise.`
    NL: `Die gestreepte helft is het stuk dat het model nooit ziet. Een bestand dat het harness kort
    besloot te houden en een bestand dat echt kort is, zijn daarbinnen hetzelfde bestand, tenzij er
    iets in het resultaat staat dat het tegenspreekt.`

11. **Give `McpOvals` its one clause** rather than moving it. Its whole payoff is `ContextDiagram`'s
    radii and fills, and nothing on this page says what size or fill means, so on this page it reads
    as three labelled ovals restating the sentence above them. Add the missing reading to
    `tools.mcp-servers.4`:
    EN closing clause: `Three different hands, and all three end up in the same window, taking up very
    different amounts of it.`
    NL: `Drie verschillende handen, en alle drie belanden ze in hetzelfde venster, waar ze heel
    verschillend veel plaats innemen.`

12. **Deck (manifest).** Three entries.
    - **`F1b`, the cheapest and highest-value deck change in the whole pass.** `deck.tsx`'s header
      says "Seven are deliberately absent", enumerates five `TaskCard`s and two boards, then explains
      `McpOvals` separately, which accounts for eight. **Three more figures are absent and none is
      named:** `SpotInjection`, `SessionWindows` and `usage-readout`. Rewrite the paragraph so it
      accounts for every absence: the seven localStorage writers, `McpOvals`, and then
      `SessionWindows` and `usage-readout` with their reason (the deck has no assistant filter, so a
      Claude-only figure would contradict a Copilot room). Step 2's deck records its equivalent
      absences; step 1's does not, so a future editor counts eight and cannot tell what was judged.
    - **New slide `deck-tools-list`**, `kind: 'statement'`, after `deck-tools-parts` and before
      `deck-tools-injection`. `deck.tools.divider.2` reads "A tool costs you by existing" and nothing
      in the block proves it, and the course's only tool-count number is on no slide.
      EN title: `The list itself is <hi>in the window</hi>`
      EN note: `Every description rides along on every message, called or not. Four or five added
      servers' worth is the most one context holds well.`
      NL title: `De lijst zelf staat <hi>in het venster</hi>`
      NL note: `Elke beschrijving reist mee met elk bericht, aangeroepen of niet. Vier of vijf
      aangesloten servers is het meeste dat één context goed houdt.`
      Keep it to the tool list. `harness` owns what a sub-agent costs, so no coordinator or refetch
      sentence may follow the number here.
    - **New slide `deck-tools-spot`**, `kind: 'figure'`, after `deck-tools-injection`, rendering
      `<SpotInjection />` at roughly `scale: 0.95`, `figureWidth: 1450`. It is the same shape as
      `deck-tools-budget`, which is already on the deck: same unit, same "Test yourself" run, graded
      in the browser, no localStorage write.
      EN title: `Pick the odd one out` · NL title: `Kies de vreemde eend`
      **The title must not name what makes it odd.** It is the tallest DOM figure in the step, so fit
      it by eye; if it will not read from the back of the room, drop this slide and ship `F1b` alone.

### Do not

- **Do not move `McpOvals` into `context`.** It was proposed, and it breaks two recorded decisions at
  once: the columns (110, 320, 530) tie it to `McpParts` so the eye tracks straight down, and the
  pairing (cards sort by who decides, ovals say the three are one kind of thing) is the reason both
  drawings exist. Item 11 is the fix.
- **Do not add a frame to `McpOvals` or `McpParts`.** The three have not crossed into a context yet,
  and a frame here tells the window a third time before `context` tells it properly.
- **Do not add a quiz.** The who-decides sorting is genuinely taught, drawn twice and never checked,
  and a one-question registry quiz was proposed for it. Reject: four graded or ticked things already
  sit under this unit's one "Test yourself", `promptQuiz` is one page back and `contextQuiz` one page
  forward, and a fifth thing to do makes the busiest page in the course busier. **Record the gap in
  `step1/CLAUDE.md`** instead, because right now it is not written down as a decision.
- **Do not answer the last move of `ConnectOne`.** The comparison is the exercise, so do not add the
  sentence saying which route is bulkier, in the card, in its description or in the prose.
- **Do not name a command in a `ConnectOne` move.** Commands live in the `<pre>` above the card; the
  moves stay readable in class, where the `<pre>` is cut with the rest of the prose.
- **Do not make `SpotInjection`'s three clean results look harmless.** Two of them exist to be
  mistaken for the poisoned one, and its card asks for the odd one out without saying what makes it
  odd.
- **Do not split this unit or move it in the registry.** It is the heaviest unit in the course and it
  sits before `context` on purpose: `ToolsInContext` is deliberately the first teal frame and
  `ContextDiagram` is the populated payoff of two earlier drawings. Item 4's clause is what the split
  was for.
- **Do not break the three load-bearing tricolons**: `mcp-servers.4` (there are literally three MCP
  primitives and it is the figure's whole argument), `stay-critical.1` and `stay-critical.3` (the
  point is that three unlike things arrive looking alike).

---

# 4. `context`

**Effort: heavy** — the second of the two units in the worst shape.

This is the best-written unit in the course by voice, and the `lesson-writing` skill names it as the
house reference. Nothing below asks for a rhythm change. What is wrong is factual: five of its
sentences contradict something the student read earlier in this same step, and in most cases the
earlier unit is the one that is right. One of them, *lost in the middle*, would embarrass the course
in front of a reader who knows the paper, and the same wording is on the projector.

### Do

1. **`context.entropy.3` misdescribes *lost in the middle* and conflates it with entropy.** Entropy
   here is accumulation; lost in the middle is a **positional** effect (Liu et al., TACL 2023) that
   happens in a clean window with no leftovers in it at all, and the fixes for the two are different.
   The gloss the paragraph gives ("it weighed that line as less important than the bulk around it")
   also strips out the one thing that makes the name make sense, so a reader finishes unable to say
   why the phenomenon is called *middle*. Keep the section and the term; state the position.
   EN: `This has a name of its own: lost in the middle. Nothing was deleted. The line that decides the
   answer is still sitting in the window, and where it sits is what went wrong. A model uses what is
   near the top of the window and what is near the bottom. Put the deciding line halfway up a long
   context and it reads straight past it.`
   NL: `Dit heeft een eigen naam: lost in the middle. Er is niets weggegooid. De regel waar het
   antwoord op draait staat nog in het venster, en waar ze staat is precies het probleem. Een model
   gebruikt wat vooraan in het venster staat en wat achteraan staat. Zet de beslissende regel
   halverwege een lange context en het leest er zo overheen.`
   **Ripple:** `deck.context.entropy.note` carries the same wording in both bundles. New note (EN):
   `Nothing was deleted. The deciding line is still in there, halfway up a window the model reads from
   both ends.` Dutch to match.

2. **`context.model-statistic.1` hands back the misreading `PickTheNext` exists to catch.** "It
   predicts the most likely continuation of the text it was given" contradicts
   `tokens.one-at-a-time.4` ("The favourite is not always what comes out… the model samples from it")
   three units earlier, in the unit that is teaching the student what a model is.
   EN: `It is also a statistical model rather than a reasoning database. It weighs what could come
   next in the text it was given, using patterns from its training data. It holds no opinion about
   your codebase. What it holds is an average.`
   NL, middle sentence: `Het weegt af wat er op de tekst die het gekregen heeft zou kunnen volgen, op
   basis van patronen uit zijn trainingsdata.`
   ("What it holds is an average" is quoted in the `lesson-writing` skill as a model closer. It
   stays.)

3. **`context.more-context-not.1` asserts an absolute that `tokens.reads-all.4` already qualified.**
   "Every token in the window is paid for, on every turn" is wrong by a factor of ten on the largest
   part of a long window, and `ModelPricing` prices a cache read at a tenth of input. Do not explain
   caching here (the step notes forbid a third telling); just stop asserting the absolute.
   EN: `Every token in the window is sent again, on every turn, because the whole context goes back to
   the model with each message. A long session does not cost slightly more. It costs more per message,
   for the rest of the session.`
   NL opening: `Elke token in het venster gaat opnieuw mee, en dat bij elke beurt, want de volledige
   context gaat met elk bericht opnieuw naar het model.`

4. **`context.amnesia-context-fatigue.1`'s "or drops out completely" is untrue of both harnesses this
   course targets.** `session.compaction-picks-moment.1`, the very next unit, says the harness
   compacts, and compaction is automatic in both products. Demote the drop-out to what it is.
   EN: `Because the window is finite, something eventually has to give. Older material is summarised,
   and the summary is what stays. The constraint you gave at the start is now one line in it, or it did
   not make the cut at all.`
   NL: `Omdat het venster eindig is, moet er vroeg of laat iets wijken. Ouder materiaal wordt
   samengevat, en die samenvatting is wat blijft. De randvoorwaarde die je in het begin meegaf is nu
   één regel daarin, of ze heeft de samenvatting niet gehaald.`

5. **Redraw `ContextFalloff` so it carries the true half.** Do this with item 4, as one change of
   mind: the figure currently draws the oldest turns tilting and spilling off the top of a fixed
   frame, which is the untrue branch, while the paragraph directly under it is entirely about
   surviving compaction.
   - Keep the frame, keep the six turn bars, keep the newest arriving solid at the bottom.
   - Replace the two tilted ghosts outside the top with: the two oldest bars collapsing into **one
     short bar that stays inside the frame at the top**, drawn in the step's faint fill, with the
     detail leaving it as the existing tilted ghosts, now visibly coming out of that one bar rather
     than out of the window.
   - Two labels instead of one: `falloff.summarised` on the short bar (`summarised` / `samengevat`)
     and `falloff.dropped` on the ghosts (`the detail goes` / `het detail gaat weg`).
   - `deck.context.falloff.title` ("The model did not get tired. The evidence left the room.") still
     lands and needs no change.

6. **`context.why-bites-hardest.2` over-claims about training.** "'Good' and 'bad' are not labels in
   the training data. Frequency is the only signal." is true of the pretraining pile and false of the
   model the student is talking to; post-training is exactly that labelling, and `model` teaches
   distillation four units later. A reader can falsify it in thirty seconds. Scope it to the pile.
   EN: `It cannot tell the two apart from the pile alone. "Good" and "bad" are not labels in what it
   read. Later training teaches it manners and taste in general, not what your team settled on in
   2019, so frequency is what is left. A vague question returns the statistical middle of everything
   ever written about the topic. That middle is mediocre code that happens to compile.`
   NL: `Uit de stapel alleen kan het de twee niet uit elkaar houden. "Goed" en "slecht" zijn geen
   labels in wat het gelezen heeft. De training die erna komt leert het manieren en algemene smaak
   aan, niet wat jullie team in 2019 afgesproken heeft, dus blijft frequentie over. Een vage vraag
   geeft je het statistische midden van alles wat ooit over het onderwerp geschreven is. Dat midden is
   middelmatige code die toevallig compileert.`

7. **Define the word the unit is named after.** Known as `audit.md` item 3, and the reach is three
   modules: `recap.what-costs-do.4` links *window* here as if this unit had named it, and
   `step3/expectations.tool-not-advantage.2` reaches back two steps for "what the context unit was
   about". One clause, in the sentence that already describes it. Replace `context.lead.1`:
   EN: `Your prompt, the resources the agent read and the tools it can call come from different places
   and land in the same block of text. That block is the context, and it is all the model ever sees.
   Once anything is in there, nothing marks where it came from, and the model weighs all of it the
   same.`
   NL, added clause: `Dat blok is de context, en het is alles wat het model ooit te zien krijgt.`

8. **Cut the duplicated cost argument out of `context.model-stateless.2`.** The same claim is made
   sixty lines later under `more-context-not`, whose whole job is to own it, and this unit is the
   heaviest in the course. The cut goes here, not there, because the named section is where a reader
   looks for the price. **The `coin` icon must survive**: `recap.what-costs-do.4` lifts that exact
   marker off this paragraph, and an icon in the recap that is not on the paragraph it came from is
   drift.
   EN: `Sending that whole transcript again has consequences beyond the bill. Clear the session
   <svg data-icon="coin"></svg> often enough, especially when you switch to something unrelated. A
   fresh session keeps the model focused, even when it has to re-read a file to solve the problem in
   front of it.`
   NL: `Dat volledige transcript opnieuw meesturen heeft meer gevolgen dan alleen de rekening. Clear
   de sessie <svg data-icon=\"coin\"></svg> vaak genoeg, zeker wanneer je overschakelt naar iets dat
   er niets mee te maken heeft. Een verse sessie houdt het model scherp, ook al moet het een bestand
   opnieuw lezen om het probleem voor zich op te lossen.`

9. **Earn the "hardest in code" heading with one clause rather than renaming keys.** Neither paragraph
   under it makes a comparative; what they argue is equally true of recipes and legal advice. The
   thing genuinely special to code is that bad code compiles, and the section gestures at it without
   saying it. `context.why-bites-hardest.1`, closing clause:
   EN: `There is far more bad code on the internet than good code. Abandoned tutorials, answers from
   2011, snippets that never ran in production, homework. A model trained on all of it has seen the
   thing you should not do thousands of times, and unlike a bad paragraph, a bad function compiles.`
   NL: `…heeft duizenden keren gezien wat je net niet moet doen, en anders dan een slechte alinea
   compileert een slechte functie gewoon.`

10. **`context.model-statistic.3` closes on the *not only X, it Y* family** and leaves the paragraph's
    sharpest line stuck in the middle. Replace the last two sentences:
    EN: `The one on the left is the prompt on its own. The one on the right got the same prompt with
    one reference image from Dribbble pinned to it. That single piece of context steered it somewhere
    less generic straight away. It is not finished, but it is closer, and the distance left to cover is
    shorter. The left one is correct too. Nobody would ship it.`
    NL: `Die links is de prompt op zichzelf. Die rechts kreeg dezelfde prompt met één referentiebeeld
    van Dribbble erbij. Dat ene stuk context stuurde ze meteen ergens minder generieks heen. Ze is niet
    af, maar ze staat dichterbij, en de weg die nog te gaan is, is korter. Die links klopt ook. Niemand
    zou ze zo online zetten.`

11. **Retitle the task card so the section and the card agree.** The `<h3>` says "Read your own
    window"; the card six inches under it is titled "Count what the tools cost", which came over from
    `tools` and now describes only two of the four moves. Keep the `<h3>`; change `window.title`.
    EN: `Count what fills it` · NL: `Tel wat erin zit`

12. **Add a fourth `contextQuiz` question (manifest to `quiz.ts` + locale keys).** All three existing
    questions have the same answer shape: something is absent from the window, or there is too much in
    it. Nothing tests `bad-context-bad.3`, the unit's least intuitive and most expensive claim, that
    wrong context is worse than missing context because nothing in the window says "stale". This
    breaks the house count of three, which is the honest cost; the alternative was swapping out
    `forgets-this-morning`, which should not happen, because amnesia and entropy are opposite failure
    modes and both deserve a question.
    - **id** `pasted-old-file`
    - **question** `You paste a config file into the session so the agent has something to work from.
      It is two releases old and you have forgotten that. The agent builds on it confidently and the
      result is wrong. What went wrong?`
    - **correct** `reads-as-true` — `Nothing in the window marks anything as stale. The old file sits
      there reading exactly like a current one, so the model builds on it without a second thought.`
    - **distractor** `should-have-checked` — `The agent should have opened the file on disk to check
      the version before using what you pasted.`
    - **distractor** `too-old` — `The file predates the model's training cutoff, so the format is
      unfamiliar to it.`
    - **distractor** `window-too-small` — `The config did not fit in the window alongside everything
      else, so only part of it was read.`
    - **explanation** `A model has no way to date what it is handed. Wrong context is more dangerous
      than missing context for exactly that reason: missing context is a gap the harness can go and
      fill, and wrong context is an answer built on top of.`
    - Dutch for all six strings in the same pass.

13. **Two hygiene items.**
    - NL `context.more-context-not.2`: `Het doel is context die klein genoeg is en goed genoeg.` The
      English parallel ("small enough and good enough") is the claim; the Dutch "van goede kwaliteit"
      turns the second half into an unbounded quality demand. This is the one place in the unit where
      the English leads.
    - `en.json` carries exactly two typographic apostrophes, `quiz.quality-degrades.entropy`
      ("the session’s leftovers") and `quiz.plan-beats-one-shot.cache`; `nl.json` has zero, and every
      other possessive in both bundles is a straight quote. Straighten both.

14. **Note for the integrator (manifest).** `index.tsx:60` says "That makes `prompt` the unit that
    defines the word context." It has not since the definition was cut.

15. **Deck (manifest).** Two new statement slides. `context` loses its sharpest claim and its best
    story to the board.
    - **`deck-context-bad-code`**, after `deck-context-oneshot`. This is the claim the rest of the step
      rests on and it is on no slide. Take this one if only one lands.
      EN title: `There is <hi>far more bad code</hi> on the internet than good`
      EN note: `Good and bad are not labels in the training data. Frequency is the only signal, so a
      vague question returns the statistical middle of everything ever written.`
      NL title: `Er staat <hi>veel meer slechte code</hi> op het internet dan goede`
      NL note: `Goed en slecht zijn geen labels in de trainingsdata. Frequentie is het enige signaal,
      dus een vage vraag levert het statistische midden van alles wat er ooit geschreven is.`
    - **`deck-context-stale`**, after `deck-context-diagram`. `deck.context.divider.2` promises "Wrong
      context is worse than missing context" and nothing proves it; the bug hunt is the step's best
      narrative.
      EN title: `Nothing in the window says <mute>stale</mute>`
      EN note: `Kill the bug and the whole hunt stays in there. Ask for the next thing and the model
      reads the dead code as live.`
      NL title: `Niets in het venster zegt <mute>verouderd</mute>`
      NL note: `Los de bug op en de hele jacht blijft erin staan. Vraag het volgende en het model
      leest die dode code als levend.`

### Do not

- **Do not add a lost-in-the-middle position curve.** It was proposed as a small U-shaped chart with a
  Liu et al. caption, and it is the most valuable new drawing anyone identified in this unit. Reject
  it anyway: this is already the heaviest unit in the course at 1,167 words with four markers, the
  step's diagram vocabulary is frames, bars and dashes and this introduces a plotted curve with axes,
  and item 5 already fixes a figure rather than adding one. Item 1's prose now states the position
  plainly. Revisit only if the unit is ever split.
- **Do not cut or redraw `ContextDiagram`.** It draws the claim `lead.1` makes, which normally fails
  this repo's bar, and it stays: it is the third of a documented three-figure sequence
  (`PromptInContext` with no frame, `ToolsInContext` with the first frame, this one populated), and
  cutting it breaks `McpOvals`'s column-alignment argument too. Nothing may describe it as "the empty
  one": it was drawn empty when `context` opened the step and is not any more.
- **Do not add a second task card.** The only candidate is entropy, and the shape would be "work until
  the agent contradicts itself, then clear", which is `session`'s `SurviveTheClear` in all but name.
  `quiz.quality-degrades` already tests the symptom.
- **Do not touch `ReadYourWindow`'s four moves, and do not give it a description line.** The absent
  key is the decision: with the prose about `/context` deliberately gone, the moves are what say where
  the work happens, and a description would be the cut paragraphs coming back one sentence at a time.
  The second and last moves are one reading with the MCP server connected and one with it gone; drop
  either and a count has nothing to compare it to.
- **Do not move `invented-userservice` out of `contextQuiz`.** It is `truth`'s scenario asked four
  units early, it never names the term, and `truth.hallucinations.1` closes by naming it as a paid-off
  callback.
- **Do not explain caching in this unit.** Item 3 removes an absolute; it does not add a mechanism.
  `harness` owns the cache.
- **Do not un-wrap the whole-unit `data-audience="self"` div**, and do not put `data-audience` and
  `data-assistant` on the same element: the assistant variants nest inside the wrapper.

---

# 5. `session`

**Effort: moderate**

Excellent prose sitting on a real structural fault: two of its paragraphs render for no reader in any
mode, and one of them is the topic sentence of the section named after the unit's most important
claim. The result is a section headed "Sessions are where the money goes" that never says the session
is where the money goes, and a `recap` bullet crediting this page with a claim it does not make.

### Do

1. **Fix the two dead `data-audience="guided"` paragraphs.** Verified against `prepareUnit` in
   `shared/lib/content.ts`: in self mode the audience pass removes them; in guided mode the cut drops
   every top-level non-figure node, the `guided` blocks included. This is the same bug the step notes
   record as the reason `workshop.the-board.1` was deleted. Two edits, in opposite directions.
   - **Delete `session.lead.4` outright**, EN and NL (`removeNl`). It restates
     `context.model-stateless.1` almost word for word and the self-learner has just read it.
   - **Un-tag `session.sessions-where-money.1`** (drop `data-audience="guided"`) and rewrite it as the
     house pointer-plus-new-half move, so it is the section's topic sentence without being a second
     telling of `context`:
     EN: `The <a href="/steps/step1/context">context</a> unit priced this already: the whole session
     goes back every turn, so its size is your price per message. Read three large files early and you
     keep paying for them on every question you ask afterwards, whether or not they still matter.`
     NL: `De unit over <a href="/steps/step1/context">context</a> heeft dit al doorgerekend: de hele
     sessie gaat elke beurt opnieuw mee, dus haar omvang is je prijs per bericht. Lees vroeg drie grote
     bestanden in en je blijft ervoor betalen bij elke vraag die daarna nog komt, of ze nu nog ter zake
     doen of niet.`
   - **Delete the HTML comment at lines 19-20**, and rewrite the `session` paragraph of
     `step1/CLAUDE.md` that records the guided-bridge reasoning. That paragraph is what will otherwise
     put these blocks back.

2. **`session.wrote-almost-none.1` says the agent reads four files; the figure two paragraphs below
   shows two.** The paragraph is not generic: it borrows the figure's own numbers ("fourteen tokens"
   is `block.1`'s `tokens: 14` verbatim), so a reader takes it as a description of the drawing and
   then counts. It also says the agent "pastes the failure back" where `block.7` says "runs mvn test,
   pastes the output", and "The answer to it is five thousand" is really the whole session total
   (4,913), including the second question.
   EN: `Count what is in there and your own words barely register. You type a sentence, and the agent
   opens two files, runs the test suite and pastes the output back. Your sentence is fourteen tokens.
   Everything around it is five thousand.`
   NL: `Tel eens na wat er in zit en je eigen woorden vallen weg. Jij typt één zin, en de agent opent
   twee bestanden, draait de testsuite en plakt de output terug. Jouw zin is veertien tokens. Alles
   eromheen is er vijfduizend.`
   **Same change:** `SessionMakeup.tsx`'s doc comment says "two questions, four files read, one test
   run". Make it "two files read".

3. **Point the prefix cache at the unit that owns it.** `sessions-where-money.2` states
   `harness.caching.1`'s mechanism flat, in the unit before `harness`, and it is the one telling that
   does not name the owner (`tokens.reads-all.4` closes "The harness unit prices it"). This is also
   the unit's only pointer to `harness` at all. Insert one sentence:
   EN, after "…billed at a fraction.": `The <a href="/steps/step1/harness">harness unit</a> prices
   that.`
   NL: `De unit over het <a href="/steps/step1/harness">harness</a> rekent dat door.`

4. **Draw `WhereTheSeamFalls`, between `compaction-picks-moment.1` and `.2`.** The section's whole
   argument is a claim about **position** and it is asserted twice with nothing to check it against;
   where a cut falls relative to the work is geometry, and no other figure in the step draws it. This
   is the unit's one genuine imagery gap.
   - Two rows of equal length, one session each, in the step's existing vocabulary (a teal frame is a
     context, a bar is something in it, dashes are what is not).
   - **Row 1, compaction.** The frame fills left to right with turn bars, grouped into three shaded
     task spans labelled with real work from this repo: `read the pipeline`, `chase the null`, `write
     the test`. A vertical rule marks where the frame filled, and it lands **inside** the middle span.
     Everything left of it is replaced by a single dashed bar one turn wide, labelled `summary`.
   - **Row 2, a clear.** Same three spans at the same widths, same total. The vertical rule sits on the
     boundary **between** spans two and three, and what crosses it is one solid teal bar labelled `one
     sentence about where you are` plus a muted `code on disk` chip, which is what
     `window-not-memory.2` names as what survives.
   - What the reader takes: both rows lose about the same amount, only the cut point differs, and the
     cut point is what decides whether a task survives whole.
   - **Constraints:** borrow `ContextFalloff`'s frame geometry rather than inventing one, and draw no
     coin, price or re-send anywhere in it. Cost belongs to `harness.caching` and `BundleCompare`.
   - **Manifest:** turn `deck-session-clear` from a `statement` into a `figure` slide rendering it.

5. **Move the trailing connector in `session.sessions-where-money.3`.** "Ask everything you want to
   know about a piece of code while it is in front of you, then." puts the connector after twenty
   words, so the reader parses it as an instruction, hits "then" and re-reads. The Dutch already opens
   "Vraag **dus** alles…". Combined with item 6:
   EN: `So ask everything you want to know about a piece of code while it is in front of you
   <svg data-icon="coin"></svg> But not forever: the same session that makes your second question
   cheap makes your fiftieth expensive and vague.`

6. **Put the step's cost-saver marker on the unit's one cost-saving move** (folded into item 5).
   `session` is the only unit in step 1 with a section titled "Sessions are where the money goes" and
   the only layer unit carrying no coin at all (`prompt` 4, `model` 4, `harness` 3, `tools` 2, `tokens`
   2, `context` 1, `session` 0). Then add the same coin to `recap.what-costs-do.5`'s move half, in both
   languages, since the recap lifts icons rather than choosing them.
   **This revisits a recorded constraint.** `step1/CLAUDE.md` says "the session bullet carries none
   because that unit marks none. Do not invent one to even the list up." The justification here is not
   evening the list up: it is that the unit marks its one actionable cost-saver and the recap then
   lifts it, which is the rule working as written. **Update that sentence in `step1/CLAUDE.md` in the
   same change**, or the next pass reverts it.

7. **Retire "extern" from the two Dutch lead entries.** The fourth layer was renamed from `external`
   to `tools`; the English visited every site and the Dutch did not, so a Dutch reader meets a fourth
   layer name that appears nowhere else in their curriculum. `lead.3` is also now slightly false in
   Dutch: a page pulled off the web does not stop being *external* after one turn, it stops being a
   *tool result*.
   NL `session.lead.2`: `…het harness laadt in elke request hetzelfde mee, een toolresultaat komt
   binnen op het moment dat er iets draait.`
   NL `session.lead.3`: `Die documentatiepagina die de agent van het web haalde, was precies één beurt
   lang een toolresultaat. Daarna is ze een alinea in het transcript, die bij elk bericht dat je stuurt
   weer meegaat. In de sessie bezinkt alles.`

8. **Standardise the Dutch word for compaction on the English `compaction`.** The English uses one
   word everywhere; the Dutch uses four (`Compressie` in the heading, `comprimeert` as the verb,
   `compaction` in five other places, `Compactie` on the deck). Worst of it: the deck slide and the
   unit heading are the same sentence with two different nouns, so in class the room reads one on the
   board and the other on their screens; and *compressie* is the Dutch word for lossless data
   compression, while the section's argument is that detail is thrown away.
   NL `session.compaction-picks-moment.heading`: `Compaction kiest het moment, of jij kiest het`
   NL `deck.session.clear.note`: change `Compactie` to `Compaction`.
   Leave the verb `comprimeren` alone; it already agrees. This renames no key: the slug comes from the
   English heading, which does not move.

9. **Record the `SessionMakeup` / `workshop` seam in `step1/CLAUDE.md`.** The figure's two student
   turns are "Why does /api/titles return nine titles?" and "And what happens to the tenth?", which is
   exactly the trace the workshop board's second flag asks for, planted five units early by a figure
   whose stated argument is share. Good plant, undeclared dependency: add one sentence saying that a
   change to the catalogue's count or to the tenth entry visits `SessionMakeup`'s block labels in both
   languages.

10. **Deck (manifest).** Two entries besides item 4's slide-kind change.
    - **New slide `deck-session-memory`**, `kind: 'statement'`, after `deck-session-clear`.
      `session.window-not-memory.3` is the best line in the unit, it is a line that only lands out
      loud, and nothing on the board carries it.
      EN title: `The window is <hi>not your memory</hi>`
      EN note: `Knowing what is in it right now, and being willing to throw it away, is most of what
      separates people who get work out of an agent from people who fight it.`
      NL title: `Het venster is <hi>niet je geheugen</hi>`
      NL note: `Weten wat er nu in staat, en bereid zijn het weg te gooien, is het grootste verschil
      tussen mensen die werk uit een agent krijgen en mensen die ertegen vechten.`
    - **Retitle `deck.session.makeup.title`.** It repeats `deck.session.divider.2` ("You typed half a
      percent of it") one slide later. The claim stays on the divider.
      EN: `Two bars in that stack are <hi>yours</hi>` · NL: `Twee balken in die stapel zijn <hi>van
      jou</hi>`

### Do not

- **Do not let this unit grow back into a second `context`.** It owns what `context` cannot: that this
  is the only layer with a time axis, that the student authored almost none of it by volume, and that
  it is therefore the only one they can prune after the fact. Item 1 replaces a restatement with a
  pointer for exactly this reason.
- **Do not tag any prose `data-audience="guided"`.** It renders for nobody. Anything a teacher needs
  to say out loud goes on the deck.
- **Do not add a quiz.** `contextQuiz` is one unit earlier and its `forgets-this-morning` question
  already grades the exact misconception this unit's compaction and memory sections turn on. Making
  `session` a second unit carrying both a task and a registry quiz is a real structural change for a
  duplicate question.
- **Do not change `SurviveTheClear`.** Four moves, one tick, worked in the student's own project, the
  third move (the clear) is what makes it an exercise, and it names no example instruction on purpose:
  the line has to be one they were tired of repeating. Only the second move splits by assistant,
  because it is the only move naming a file.
- **Do not make `SessionMakeup` say anything about growth or re-sending.** That is `BundleCompare`'s
  job in `prompt`. It argues share and only share.
- **Do not soften `wrote-almost-none.3`'s "the only layer you can do anything about afterwards".** It
  was checked against `ReadYourWindow`'s fourth move, which removes an MCP server by starting over, so
  changing the tools layer costs you the session. That is the claim, not a contradiction of it.

---

# 6. `harness`

**Effort: moderate**

One of the two reference units for house voice, and the pass on it should be surgical. Four real
defects: one element that renders for nobody, one price claim that leaves two columns of the course's
only price table unexplained, one figure that transcribes its paragraph, and one board item answerable
by phrase-matching.

### Do

1. **Delete the dead `harness.check-yourself.1` aside** (`harness.html:159-161`,
   `<aside data-audience="guided">`) from the HTML and `removeNl` the key. It renders for nobody in
   either mode in either language, for the same reason `workshop.the-board.1` was deleted. The key
   slug is also stale on its own terms: the `<h2>` above it is the shared `ui:quiz.title`, "Test
   yourself", not "Check yourself".
   The line itself is good and belongs on the deck. Add it as a `note` in the harness block (manifest;
   the deck author picks the slide, `deck-harness-decomposition` is the natural home):
   EN: `Cuts go on the board before anyone opens an agent. Three people, three different cuts.`
   NL: `Drie mensen knippen het op, drie verschillende resultaten, en die gaan op het bord.`
   **Do not** use the current Dutch value's word `knipbeurten` in the deck note or anywhere else: a
   *knipbeurt* is a haircut appointment, and this line is read out loud in front of a room.

2. **Add the cache-write premium to `harness.caching.1`.** The section teaches caching as pure saving,
   and `ModelPricing` one unit later shows `Cache write, 5 min` and `Cache write, 1 hr` at 1.25x and 2x
   input in every row, which nothing in the course accounts for. A student who reads the table finds
   that establishing a cache costs *more* than not caching, after a section that said caching only
   saves. This is the unit that owns caching. Append two sentences:
   EN: `Writing that mark is not free. The first turn costs a quarter more than plain input, so a cache
   pays for itself on the second turn and not before.`
   NL: `Die markering zetten is niet gratis. Die eerste beurt kost een kwart meer dan gewone input, dus
   een cache verdient zichzelf pas terug vanaf de tweede beurt.`
   Both numbers are checkable by eye against `ModelPricing` (input $1, write-5m $1.25 on the small
   tier).

3. **Put a number on the hour rate in `harness.caching.3`.** "you can pay for longer" is the only
   reference in the course to the `Cache write, 1 hr` column and leaves the reader with no idea of the
   size of it. It is double the input rate, and the number is sitting in a table the student sees on
   the next page.
   EN: `An entry goes stale after about five minutes by default, and double the input rate holds it for
   an hour.`
   NL: `Een entry verschaalt standaard na een minuut of vijf, en voor het dubbele van het inputtarief
   houd je hem een uur vast.` (Keep `verschaalt`. It is a good verb and the right register.)

4. **Close the gap between the cost and the instruction in `harness.caching.3`.** A reader just told
   that keeping a cache alive is worth real money reads "Start a fresh session instead" as the opposite
   advice, and nothing on the page closes it.
   EN, replacing the closing sentences: `… so picking up where you left off costs you the whole thing
   again. You are paying to rebuild the window either way. Rebuild the one you need.`
   NL: `… dus verdergaan waar je gebleven was kost je het hele ding opnieuw. Je betaalt sowieso om het
   venster opnieuw op te bouwen. Bouw dan het venster op dat je nodig hebt.`

5. **Soften the cache-breakpoint mechanism by one word.** "The harness puts a mark in the request"
   accurately describes an explicit cache breakpoint; several providers cache prefixes automatically
   with no mark from the client, so for a Copilot CLI reader on a non-Anthropic model it describes
   machinery that is not there. The block correctly carries no `data-assistant`, because everything
   else in the paragraph is true either way.
   EN: `The harness marks the request, and on the next turn everything up to that mark is recognised
   and billed at roughly a tenth.` Dutch follows, and see item 9.

6. **Pay the promise where the reader meets it.** `harness.splitting-work.1` says each pattern "decides
   where your context ends up"; the section directly underneath is the one section of the four that
   never mentions context, and the honouring arrives one section later. One clause on
   `harness.decomposition.2`'s second sentence, which already has the hook:
   EN: `Each part gets its own prompt, and a prompt has to say what that part does, because nothing
   else will be in the window with it.`
   NL: `Elk stuk krijgt zijn eigen prompt, en een prompt moet zeggen wat dat stuk doet, want er zit
   verder niets bij in het venster.`
   Do **not** soften the promise sentence instead: it is what makes four pattern descriptions belong in
   a step about the window.

7. **Move `harness.which-one-you-run.1` up to become `harness.lead.3`.** The heading promises a
   comparison and `.1` is the lead's claim restated one notch harder; only `.2` is the heading's
   subject. No prose is rewritten. Key rename in the HTML and in `nl.json` (a key is a location). The
   section drops to one paragraph and the lead grows to three; both are fine.

8. **Rewrite two `PatternMatch` items (manifest to the board data + locale patch).**
   - `match.scenario.critic` is answerable by word-matching: it reads "You have been shaping the same
     design all afternoon and you want to know what is wrong with it" while `harness.reflection.2`
     one screen up reads "An agent reviewing its own transcript has spent the last hour arguing for
     this design". It is also the only item whose surface features point at no other pattern.
     EN scenario: `The refactor is finished and you want a second agent on it before you merge. It
     should come back with objections, not with more code.`
     NL: `De refactor is klaar en je wil er een tweede agent op zetten voor je merget. Die moet
     terugkomen met bezwaren, niet met meer code.`
     EN explanation: `A second agent is the coordinator's move too. What makes this one different is
     what you ask it for: objections rather than code, from something that was not in the room while
     you decided. That is reflection.`
     NL: `Een tweede agent inzetten is ook de zet van de coördinator. Wat dit anders maakt is wat je
     hem vraagt: bezwaren in plaats van code, van iets dat er niet bij was toen jij besliste. Dat is
     reflectie.`
   - `match.scenario.delegate` reads "You want to run a migration across a range of files", which is
     not English anyone writes and is vague where the item needs to be concrete: the information that
     makes the answer the coordinator ("a lot of files at once, and most of the work is routine") is
     only in the explanation. The Dutch is equally vague, so the Dutch does not lead here. It also
     fixes the one place in step 1 where the Dutch says `files` instead of `bestanden`.
     EN: `The same API migration has to land in forty files, and each one needs a small judgement
     call.`
     NL: `Dezelfde API-migratie moet in veertig bestanden landen, en elk bestand vraagt een kleine
     afweging.`

9. **Fix two Dutch gender slips in one sentence.** NL `harness.caching.1` reads "**De** harness zet een
   markering in **het** request". Everywhere else in this unit the Dutch says *het harness* (including
   `harness.title` and the heading "Welk harness je draait", which only agrees with *het*) and *de
   request*.
   NL: `Het harness markeert de request, en bij de volgende beurt wordt alles tot aan die markering
   herkend en aan ongeveer een tiende aangerekend.` (matches item 5).

10. **Upgrade `SequentialSteps` so the session band measures the cost.** It is the one figure in the
    unit that draws only what the paragraph above it already says: three step cards, three green
    checks, a pause glyph on a dashed seam, a session band behind all three, which is a one-to-one
    transcription of `sequential.1` and `.2`.
    - Draw the session band as a fill that grows left to right, from a thin bar of content under step 1
      to a band that is nearly full under step 3, with the free space above it shrinking.
    - Keep the three step cards, the three checks and the pause exactly as they are.
    - Add one label on the right edge in the step's muted style, `sequential-steps.filling`: `no room
      left for step four` / `geen plaats meer voor stap vier`.
    - The pause glyph then gains a second job: stopping here costs you the fill when you come back,
      which is `caching.3` met in a picture.
    - **Do not** add a fourth step card, and **do not** colour the fill anything but the existing
      primary tints: a red or amber fill would read as failure, which `AnswerProvenance` and
      `PickTheTier` both already avoid on the record.

11. **Cut the GAN sentence from `harness.reflection.1`.** "The shape is the same as a GAN's, where one
    network produces something and another one tries to tear it down" adds no claim: the sentence
    before it already states the shape in full, and it explains the familiar by the less familiar for
    a Java audience. It is the brief's "analogy that is decorative rather than load bearing". The
    paragraph ends: "The sub-agent is told to attack the result rather than help with it: find what is
    wrong, say so, report back." Dutch loses its final sentence the same way. Lowest priority item in
    this unit; if the author defends it out loud, leave it.

12. **`step1/CLAUDE.md` says "Check yourself" where the page says "Test yourself"**, twice, in the
    `model` and `tools` paragraphs. Fix both.

13. **Close `audit.md` item 31 as wontfix**, with the reasoning: opening cold is what the writing skill
    asks for and it names `harness.lead.1` as the example of it, and the pointer to `model` runs one
    way on purpose (`model` points back at this unit's coordinator "rather than redefining it"), so
    adding the reverse pointer creates the mutual cross-reference the step spent effort avoiding.

14. **Deck (manifest).** Three entries.
    - **Move `deck-harness-cache`** to sit directly after the `deck-harness` divider, ahead of
      `deck-harness-decomposition`. No key changes. It is currently wedged between the fourth pattern
      figure and the exercise that tests all four, so a tutor running the pattern figures has to break
      stride for prefix caching before asking the room "Which pattern fits?". This restores unit order,
      which is the file's own stated practice.
    - **Add a `note` to `deck-harness-coordinator`**, which is currently a bare label with nothing under
      it. `deck.harness.divider.3` promises this and it is never proved.
      EN: `A sub-agent starts blank. One base instruction is all it gets, and whatever it was not told
      it fetches again.`
      NL: `Een sub-agent begint blanco. Eén basisinstructie is alles wat hij krijgt, en wat hij niet
      verteld kreeg, haalt hij opnieuw op.`
    - **Add a `note` to `deck-harness-sequential`**, same problem.
      EN: `For steps that depend on each other. One session carries the whole run, so a long workflow is
      a full window by the end.`
      NL: `Voor stappen die van elkaar afhangen. Eén sessie draagt de hele run, dus een lange workflow
      is aan het eind een vol venster.`

### Do not

- **Do not add a caching `TaskCard`.** It was proposed as three moves reading the per-turn cost with
  and without a second MCP server, and it is a good idea that cannot be shipped honestly here: which
  command prints a per-turn cost is a product fact that differs by assistant and was not verified, and
  the unit already carries a card and a board under one "Test yourself". A task whose measurement one
  reader cannot take is worse than no task. **Record the section as told-only in `step1/CLAUDE.md`.**
- **Do not move the `Caching` section.** It reads at first pass like a third subject wedged between
  the harness-as-layer material and the patterns, and it is not: `tokens.reads-all.4` explicitly defers
  to it, and the prefix argument only makes sense once `lead.2` has established that the harness loads
  material at the top of every request.
- **Do not draw the caching section.** A prefix-match diagram would draw the sentence "read from the
  first byte" and nothing more. The deck's `statement` slide is the right shape.
- **Do not merge `harness.decomposition.3`'s two opening sentences.** It was proposed on the grounds
  that the second restates the first; the paragraph is good as it stands and the proposer said so.
  Taste, not a defect.
- **Do not add a registry quiz.** `PatternMatch` is the better instrument here: pattern recognition is
  a matching task. Decomposition sitting on the board with nothing pointing at it is deliberate, and it
  is answered by `CutItUp` above the board, so the fourth target is not free by elimination.
- **Do not soften `harness.splitting-work.1`.** See item 6.
- **Do not add `<mainClass>` or a Copilot billing line anywhere in "Which harness you run".** The
  billing sentence was moved whole to `model.api-vs-subscription` and must not grow back here.

---

# 7. `model`

**Effort: heavy**

The most human prose in the step and the best-shaped board in it. What holds it back is that the
numbers are not all as solid as the unit's own standard: a caption that asserts a listing it is not, a
speed ratio repeated in four strings that is roughly double reality, and a training claim used as a
mechanism that no provider documents. Plus the one instruction in the step that nobody ever collects.

### Do

1. **Rewrite `pricing.caption`.** It reads "As listed in July 2026", and the Sonnet row is deliberately
   listed at its **standing** rate ($3/$15) rather than the introductory $2/$10 running until
   1 September 2026. That decision is right, because the intro price breaks the one-three-five ratio
   the prose teaches. The caption is what is wrong: "as listed" is a claim about what the provider
   published, and a student who goes and looks finds the figure wrong on the row the ratio depends on.
   Keep the month; it is the ageing signal and it is load-bearing.
   EN: `Standing rates, read in July 2026.` · NL: `Standaardtarieven, gelezen in juli 2026.`

2. **"Four to five times faster" overstates the small tier by roughly 2x.** Measured output speed puts
   the small tier at about 2.2x the middle one, with the most generous published comparisons reaching
   ~3x, and the provider's own launch framing was "more than twice as fast". Nothing supports 4-5x, and
   it is the only hard performance number in the step. The argument it feeds ("the difference between a
   job you watch and a job you leave running") survives intact at 2-3x. **Four strings carry the
   number:**
   - EN `model.speed.1`: `The small tier answers roughly two to three times faster than the middle
     one.`
   - NL `model.speed.1`: `Het kleine model antwoordt ongeveer twee tot drie keer sneller dan het
     middenmodel.`
   - EN `tiers.haiku.body`: `…at two to three times Sonnet's speed.`
   - NL `tiers.haiku.body`: `…aan twee tot drie keer de snelheid van Sonnet.`
   Also fix NL `model.speed.1`'s "merk je het nauwelijks" for EN "you will not care", which is a weaker
   claim than the English makes.
   **This gates item 8.** Do not draw a figure whose bar lengths are this ratio until it is settled.

3. **Fix `model.cost.4`: it names a division and then instructs a multiplication.** "Money on your own
   window takes one division… Multiply, and that is what sending the window up once costs." This is the
   single sentence in the unit a reader stops on, and the Dutch shares the fault ("is één deling").
   EN: `Money on your own window is one sum.` · NL: `Geld op je eigen venster is één som.`
   Leave the rest of the paragraph untouched.

4. **Add the `PriceOneTurn` `TaskCard`.** `cost.4` is an instruction delivered as prose with nothing
   asking for the result, and it is the only consumer of a number the student produced two units
   earlier: `ReadYourWindow` makes them run `/context` and read a count, and nothing in the course ever
   uses it again. Step 0's last house rule points forward at this paragraph as the place step 1 "hands
   them the numbers", and `workshop`'s `OneWindow` collects two more readings that nothing prices. So
   the course sets up a measurement, points forward at it twice, and leaves the reader to do the sum in
   their head or not at all.
   - Placement: under the existing `<hr />` and `ui:quiz.title` heading, **above** `PickTheTier`.
   - `block="price-one-turn"`, one tick to `kata.step1.price`, no description line (the way
     `ReadYourWindow` carries none). Nothing grades it; the number is for the student.
   - Three moves, one line each:
     1. `Read your window again with /context, in the project you are working in.`
     2. `Take the rate for the tier you actually run, from the table above.`
     3. `Divide your count by a million, multiply by the rate, and write the number down.`
   - No assistant variant: `/context` is the same command in both, which the step already relies on.
   - **Ripple:** `step1/CLAUDE.md` records `PickTheTier` as "the only thing under its rule" and counts
     the step's task cards; both sentences change. `showsExerciseHeading` already composes this, as
     `context` proves.

5. **Rewrite `model.api-vs-subscription.3.copilot`'s second sentence.** Both variants open on "The
   tokens are the same either way. What differs is whether you can see them." The Claude half earns
   that; the Copilot half then describes a subscription that is also metered by token against an
   allowance, which is a seat where you *can* see them, so the reader is handed a third arrangement
   that breaks the binary. The billing prose itself is correct against `copilot-specific.md` and stays.
   EN `.3.copilot` opening: `The tokens are the same either way. What differs is how the bill reaches
   you.`
   NL: `De tokens zijn in beide gevallen dezelfde. Wat verschilt, is hoe de rekening bij je aankomt.`
   Leave `.3.claude` exactly as it is.

6. **Hedge the fine-tuning claim in `model.let-it-pick.2`.** "Providers fine-tune the smaller tiers on
   output from the larger ones" is stated flat as the mechanism, in a paragraph that opens "There is a
   reason that split works as well as it does", and it is a claim about proprietary training pipelines
   that no provider documents. Distillation is widely reported as industry practice; the flat statement
   is not checkable.
   EN: `Smaller tiers are commonly trained on output from larger ones, so an expensive model writing
   the brief is writing for something shaped by its own answers.`
   NL: `De kleinere tiers worden doorgaans getraind op output van de grotere, dus een duur model dat de
   opdracht schrijft, schrijft voor iets dat door zijn eigen antwoorden gevormd is.`

7. **Replace the modal in `model.five-hour-window.1`.** `lesson-writing/SKILL.md` is categorical:
   "Hedge with frequency, not with modals." This is the only such modal in the file, and the Dutch
   already does it correctly ("mogelijk"), so the Dutch leads. Keep the hedge itself, which is right
   and recorded: this is one vendor's arrangement rather than how models are billed.
   EN: `Some providers give you a session limit, and it is usually a sliding window of five hours.`
   Leave the Dutch alone. **Reword the sentence in `step1/CLAUDE.md`** that quotes "a provider *might*
   give you a session limit", or the modal comes back.

8. **Draw `SpeedAtScale`, under `model.speed.1`.** `lead.2` gives cost and speed equal billing and the
   unit gives cost a table and speed nothing. `speed.1`'s claim is a **threshold** claim, not a ratio
   claim, and a threshold is exactly the kind of thing a drawing settles.
   - Three rows: one call, ten calls, one hundred calls. Each row carries two bars, the small tier and
     the top tier, measured in wall-clock minutes on the same x axis.
   - One vertical guide line, labelled the way `SessionWindows` labels its day, at the point where you
     stop watching and go and do something else (a couple of minutes).
   - The reading is the crossing: at one call both bars sit left of the line, so the room sees why "you
     will not care"; at a hundred, one bar is still left of it and the other is far right.
   - Joins the step's vocabulary (a bar is something you have, a guide line is what you measure
     against). **No context frame.** Numbers are hand-authored, so it carries a caption saying so, the
     way `NextToken`'s does.
   - **Gated on item 2.** The bar lengths are that ratio.

9. **Give `(July 2026)` a subject.** `model.lead.3` renders a bare parenthesised date under a figure
   that deliberately contains nothing dateable, so the reader meets a date with no idea what it
   qualifies. Add no claim: `cost.3` stays the only place the outlast argument is made.
   EN: `<small>The family as it stood in July 2026.</small>`
   NL: `<small>De familie zoals ze er in juli 2026 uitzag.</small>`

10. **Hand the third difference to the cards in `model.lead.2`.** It names three differences (cost,
    speed, "how well they hold a long task together") and the unit gives an `<h2>` to the first two and
    never returns to the third in prose. The visible stumble is `cost.2`, which uses "cannot hold
    together" as though the reader already owns it, three paragraphs before anything gives it to them.
    One clause, not a section.
    EN: `A provider ships a family rather than a model. They differ in what they cost per token and how
    fast they answer, and in the one the cards below are about: how well each holds a long task
    together.`
    NL: `Een provider levert een familie, geen model. Ze verschillen in wat ze per token kosten en hoe
    snel ze antwoorden, en in datgene waar de kaarten hieronder over gaan: hoe goed ze een lange taak
    bij elkaar houden.`

11. **Put `gem` + `coin` on `model.let-it-pick.1`.** `recap.what-costs-do.7`'s move half carries a gem
    that has no source: `let-it-pick.1` and `.2` carry no icon at all, and the step's rule is that every
    recap icon is lifted rather than chosen. Add the pair at the position the convention asks for (icon
    where the full stop would go), in both languages:
    EN, last sentence: `The saving is the gap you priced above, five against one
    <svg data-icon="gem"></svg> <svg data-icon="coin"></svg>`
    NL gains the same two escaped markers at the same position.

12. **Three Dutch fixes.**
    - `model.api-vs-subscription.1`: `eronaartoe` is not a word. → `voor precies wat ernaartoe ging en
      wat er terugkwam.`
    - `model.api-vs-subscription.3.copilot`: "input, output en **de gecachete**" drops the noun the
      adjective needs. → `input, output en de gecachete tokens, elk aan het tarief van het model dat je
      koos.`
    - `model.lead.1` says two different things from the English: NL "Alles in deze stap ging tot nu toe
      **over het vullen van** het venster. **Iemand** moet het lezen." turns a statement about the
      material into a statement about the step, and says *iemand*, a person, where the unit's whole
      argument is that a machine reads it and which machine is a choice. → `Alles in deze stap vult tot
      nu toe het venster. Iets moet het lezen.`

13. **Rewrite `tiers.opus.character` and `tiers.haiku.character` in English, off the Dutch.** The
    English pair ("Precision interpreter", "Formulaic executor") is exactly the abstract-noun labelling
    the brief's AI-tell list warns about; the Dutch is a verb phrase saying what the tier does ("Leest
    je letterlijk", "Voert het voorschrift uit"). EN: `Takes you literally` and `Runs the recipe`.
    `tiers.sonnet.character` is fine in both.

14. **Correct four drifted statements about this unit in `step1/CLAUDE.md`.** The first one causes a
    bad edit if followed.
    - It says the worked day in `SessionWindows` is "08:00, the break at 13:00, home at 18:00".
      `SessionWindows.tsx` sets `LEAVE = 17` and its own comment says "home at five"; 18:00 is nowhere
      (`DAY_END = 20` is only the axis). Anyone who "moves the worked day" by that sentence
      desynchronises both rows from the guide lines.
    - It says `model` carries "prose, one figure, and one exercise". There are four figures.
    - It calls the heading "Check yourself"; the HTML writes `ui:quiz.title`, "Test yourself".
    - It refers to `model-statistic.4`, which is `context.model-statistic.4` and lives in
      `context.html`.

15. **Deck (manifest).** Three new statement slides. `model` is the worst-covered unit in the step:
    seven sections and five figures against four slides.
    - **`deck-model-money`**, after `deck-model-pricing`. The best missing slide in the deck: it is the
      one place the course multiplies, and on a board the tutor can do it with the room's own number.
      **Carry no currency in the slide text.**
      EN title: `Your own window, <hi>in money</hi>`
      EN note: `The count /context printed you, against the rate above. That is one turn, before it has
      written a word.`
      NL title: `Je eigen venster, <hi>in geld</hi>`
      NL note: `Het getal dat /context je gaf, tegen het tarief hierboven. Dat is één beurt, voordat het
      model één woord geschreven heeft.`
    - **`deck-model-speed`**, after it. **The note must carry item 2's corrected number.**
      EN title: `Where <hi>quick</hi> stops being cheap`
      EN note: `The small tier answers two to three times faster. A fast wrong answer costs you the run
      it broke and the run that fixed it, and you paid for both.`
      NL title: `Waar <hi>snel</hi> ophoudt goedkoop te zijn`
      NL note: `De kleine tier antwoordt twee tot drie keer sneller. Een snel fout antwoord kost je de
      run die het brak en de run die het herstelde, en je betaalde voor allebei.`
    - **`deck-model-billing`**, after it. Its claim is true for both assistants, unlike the five-hour
      window. **No prices, no plan names, no currency.**
      EN title: `The tokens are the same. <hi>Whether you can see them</hi> is not.`
      EN note: `A key shows you the number growing while you work. A plan hides it until the limit, and
      then the cost arrives as waiting.`
      NL title: `De tokens zijn dezelfde. <hi>Of je ze kunt zien</hi> niet.`
      NL note: `Een key laat het getal groeien terwijl je werkt. Een abonnement verbergt het tot de
      limiet, en dan komt de kost aan als wachten.`

### Do not

- **Do not add a `deck-model-relay` slide.** It was proposed as "The small tiers were trained on the
  big one's output". Item 6 hedges that claim precisely because it cannot be sourced, and a slide
  stating it flat reintroduces it on a projector where nobody can hedge it.
- **Do not add version numbers or a price list anywhere except `ModelPricing`.** Tiers outlive
  releases and the unit teaches them as dispositions. `ModelPricing` is the knowing exception and it is
  placed to be read as evidence for a claim, under the paragraph stating the one-three-five ratio. Do
  not move it.
- **Do not reorder the three tiers anywhere without reordering all three.** `ModelTiers`, the table and
  `PickTheTier`'s column all run cheapest first, and the prose reads in that direction (`cost.1` counts
  up to three and five; `speed.1` opens on the small tier). Reversing them means rewriting both
  paragraphs first.
- **Do not promote the frontier row to a fourth tier.** `cost.2` calls it a ceiling on purpose, which
  is what keeps `ModelTiers` at three cards, `cost.1` at one-three-five, `speed.1` at "the slowest of
  the three" and `PickTheTier` at three targets.
- **Do not add a Claude-gated five-hour `TaskCard`.** It was proposed and it is the weaker of the two
  card ideas: the whole card and its marker would need `data-assistant="claude"`, widening the 968-vs-770
  word split that is already the worst assistant gap in the course, and it puts a Claude-only card under
  a shared heading.
- **Do not add a quiz.** `PickTheTier` already grades the tier claims across five situations with a
  written explanation per row; the two confusions a quiz would test are handled by a `promptQuiz`
  distractor and by the `Reasoning level` section that exists to keep them apart.
- **Do not split the five-hour section back into two headings**, and do not give it a Copilot sibling.
  There is no rolling window to place for a seat, and the absence is the decision. Its keys carry no
  `.claude` suffix for that reason.
- **Do not touch `PickTheTier`'s `redact` row.** It cannot be got wrong, comes back amber, and closes by
  pointing at step 2. Marking it right or wrong would teach that a lookup table exists here.
- **Do not add a "the cache columns are the tenth the harness unit promised you" clause to `cost.1`.**
  It was proposed as optional; `harness` items 2 and 3 already connect the two from the side that owns
  caching, and a second pointer crowds the paragraph the table is evidence for.

---

# 8. `truth`

**Effort: moderate**

Structurally right, both figures measure something prose cannot, and every example is anchored in this
repository. What holds it back is one claim that the very check the unit asks for would falsify, a
six-in-eleven list-of-three rhythm, and the fact that in guided mode this page currently filters down
to two figures and nothing else.

### Do

1. **Fix `truth.hallucinations.1`'s "spelled the way the rest of that class spells things".**
   `Catalog.java` has exactly two methods, `titles()` and `walk()`; nothing in it is spelled
   `findAllBy…Ordered`. The symbol is a good choice (it is Spring Data idiom, which is what the
   training average would produce) and it stays; the clause about it is false, in the one unit about
   checking facts, in a sentence the figure below invites the student to test.
   EN: `Ask which method on <code>Catalog</code> filters titles by author and you get
   <code>findAllByAuthorOrdered</code>, spelled exactly the way a Spring method is spelled, on a class
   that has no such method.`
   NL: `Vraag welke methode op <code>Catalog</code> titels op auteur filtert en je krijgt
   <code>findAllByAuthorOrdered</code>, geschreven precies zoals een Spring-methode geschreven wordt,
   op een klasse die zo'n methode niet heeft.`
   The phrasing deliberately avoids "the average of every Spring project": `context` owns the average
   argument and this unit must not re-run it.

2. **Add `truthQuiz` (manifest to `quiz.ts` and `index.tsx`, plus locale keys).** Prior art:
   `audit.md` row 33 already asks for it. The argument the row does not make: this unit has no
   `data-audience` wrapper, no task and no board, so **in guided mode it filters down to two figures
   and nothing else**, and a registry quiz is the only thing that would survive into the classroom
   page. Wiring cost is small and there is **no HTML change** (`prompt` already establishes that a unit
   with a registry quiz and no task writes no heading of its own). Three questions, deliberately
   avoiding `contextQuiz`'s `invented-userservice`, which owns the missing-context case.
   - **`no-signal-in-the-answer`** — `The agent gives you four sentences about your service and every
     one of them sounds equally sure. Which part of the answer tells you which sentences were read off
     disk?`
     - **correct** `Nothing in the answer does. The only way to know is to look at what was in the
       window when it answered.`
     - `The sentences that name a filename were read; an invented claim has nothing concrete in it.`
     - `The hedged sentences are the invented ones; a model hedges when it is filling a gap.`
     - `The sentences that quote code exactly were read; a model cannot reproduce code it never saw.`
     - **explanation** `An answer carries no marker for where its parts came from. Two of the three
       claims in the figure were read and one was not, and they are written the same way.`
   - **`config-format-changed`** — `A library threw out its configuration format last spring. You ask
     the agent to write the config and it confidently writes the old format, with no warning.`
     - **correct** `The change is on the far side of the training cutoff, so the model has never seen
       the new format. It answered with what it did see.`
     - `The model knows the new format but writes the one most projects still use.`
     - `It read the library's docs and picked the version that matched your other dependencies.`
     - `The old format appears more often in its training data, so it scores higher.`
     - **explanation** `After the cutoff there is nothing to be more or less sure about. The answer is
       not a worse version of the right one, it is the last one the model saw.` (Keep the explanation
       off the average; `context` owns it.)
   - **`read-it-and-said-so`** — `You asked whether the empty-list case is covered. The agent read the
     test file and told you it is. It is not.`
     - **correct** `You asked for a conclusion. Reading a file and reporting what it says is still the
       agent's reading, and nothing ran.`
     - `The file was too long, so the relevant test fell outside what the model could attend to.`
     - `The test file was written after the model's cutoff, so it could not interpret it.`
     - `Nothing from your project was in the window, so it answered from training.`
     - **explanation** `Grounded is not proved. Ask for the check rather than the conclusion, and a
       test that goes red is a claim that can fail in front of you.`
   - Dutch for every string in the same pass.

3. **Break the tricolon rhythm in two places.** Six of eleven paragraphs run a list of three, all of
   them the same syntactic move. Three of the six are load-bearing and stay (`lead.3` is the unit's
   spine, `grounding.1` is the disk/web/command vocabulary, `proof.1` is three real commands).
   - **`truth.cutoff.1`**: drop the middle item, which is also the item that does not belong in this
     section. "the API your team deprecated in March" is not an example of a training cutoff at all:
     your team's API was never in the training data whatever the date, which is the half `lead.1` owns.
     EN: `Training stopped on a date. Whatever was published after it is not something the model knows
     less well, it is something the model has never seen. A framework released last spring, a library
     that threw out its whole configuration format between one minor version and the next: none of that
     is in there.`
     NL: `De training stopte op een datum. Wat daarna verscheen, kent het model niet minder goed, het
     heeft het nooit gezien. Een framework van vorig voorjaar, een library die haar hele
     configuratieformaat overboord gooide tussen twee minor versies: niets daarvan zit erin.`
   - **`truth.hallucinations.2`**: cut the third item, which is a synonym of the first two.
     EN: `Two of those were read and one was not, and the answer says the same thing about all three.
     That is what makes it expensive. No wobble in the tone, no hedge, because the model sounds the same
     whether it read your file or filled the gap. Stop reading the tone and start asking where the
     answer came from. <a href="/steps/step1/workshop">The workshop</a> is that question three times
     over.`
     NL: `…Geen aarzeling in de toon, geen slag om de arm, want het model klinkt hetzelfde of het nu
     jouw bestand las of het gat opvulde. …`

4. **Answer the lead's three-way question in `truth.proof.1`.** The lead sets up a clean question about
   three *sources*, and the reader reaches `Proof` and it no longer fits: proved is not a fourth source,
   it is a different axis. The page never says so. One clause turns the section into the answer rather
   than a fourth item beside it.
   EN: `Grounded is still not proved, and that is the answer to the question up top: the source is not
   the same thing as the check. The agent read a file and told you what it says, and you are taking its
   word for the reading. Anything that can be run should be run: <code>mvn test</code>, a
   <code>curl</code> at the endpoint, one line of <code>jshell</code>. An answer with a command behind
   it is a different kind of answer.`
   NL: `Grounded is nog altijd niet bewezen, en dat is het antwoord op de vraag van hierboven: de bron
   is niet hetzelfde als de controle. De agent las een bestand en vertelde je wat erin staat, …`

5. **`truth.cutoff.2`: "the version before yours" is narrower than the figure under it.**
   `TrainedOrGrounded` answers `3.5.0` against `4.1.0`, which is the previous *line*, not the previous
   version, and the figure's choice is the better one: a model trained before 4.0 shipped is exactly the
   case the section is about.
   EN: `It describes the version line before yours, in the same level tone as everything else…`
   NL: `Het beschrijft de versielijn vóór de jouwe, in dezelfde vlakke toon als al de rest…`
   **Same pass:** `step1/CLAUDE.md` describes `3.5.0` as "the previous release"; make it "the previous
   line".

6. **`truth.hallucinations.1`: "nothing was invented on purpose" is ambiguous in English.** "on purpose"
   can attach to *nothing was invented* (correct) or to the whole negation (wrong). The Dutch places
   *bewust* unambiguously on the verb, so the Dutch leads.
   EN: `Nothing was looked up, and nothing was deliberately made up.` Dutch unchanged.

7. **Three Dutch corrections.**
   - `truth.lead.2`: "of **je stuurt hem het zelf uitzoeken** met een tool" is missing an infinitive
     marker; Dutch does not license this. → `…of je laat hem het zelf uitzoeken met een tool.`
   - `truth.lead.1`: "en **welk** je krijgt hangt af van…" has no noun. → `en welk antwoord je krijgt
     hangt af van…`
   - `truth.lead.3`: "Alle drie komen ze **in dezelfde stem**" is a direct calque of "in the same
     voice". → `Alle drie klinken ze even stellig.`

8. **Deck (manifest).** One new slide, `deck-truth-proof`, `kind: 'statement'`, after
   `deck-truth-provenance`. `Proof` is one of four sections, it is `deck.truth.divider.3`, it is one of
   the eight `recap` bullets, and it has no slide. The recorded reason it is left undrawn is about a
   **figure** ("running a command is something the student does rather than something to look at"); a
   statement slide is precisely the vehicle for a claim with no shape, and the deck already uses it that
   way for caching, entropy and the reasoning boundary. Placing it after the two figures keeps the
   block's documented shape and hands straight into the `workshop` divider.
   EN title: `Ask for <hi>the check</hi>, not the conclusion`
   EN note: `Not "does this handle an empty list", but a test that goes red on an empty list. Only one of
   those can fail in front of you.`
   NL title: `Vraag om <hi>de check</hi>, niet om de conclusie`
   NL note: `Niet "gaat dit om met een lege lijst", maar een test die rood wordt op een lege lijst. Maar
   één van die twee kan voor je ogen falen.`

### Do not

- **Do not add a `Proof` task card.** It was proposed as four moves asking the student to produce the
  same answer three ways, and it is a good exercise that this unit should not carry. The recorded
  constraint stands: `model` closes on `PickTheTier`, `workshop` is a whole board, and `model` is now
  also gaining `PriceOneTurn`, so a card here makes three consecutive pages each carrying something to
  do, running into the capstone. Item 2's quiz closes the gap that actually mattered (nothing asked, and
  an empty guided page).
- **Do not add a third figure, and do not draw `The cutoff` or `Proof`.** A date has no shape, and
  running a command is something the student does. Both existing figures clear the bar and neither may
  borrow the other's shape: `TrainedOrGrounded` is two whole answers a window apart, `AnswerProvenance`
  is one answer whose parts did not all come from the same place. Collapse either into the other and the
  unit makes its point twice.
- **Do not put a tick, a cross, a colour or a heavier weight on either `TrainedOrGrounded` chip.** They
  are identical in size, fill and position on purpose: what differs is the window above them, which is
  the part an answer never tells you about.
- **Do not turn `AnswerProvenance`'s invented row `--destructive` or amber.** Nothing failed, and a red
  row would say the agent was caught. The step's dashed stroke is the right mark.
- **Do not pad the sections to even them out.** Four sections at exactly two paragraphs each is a real
  symmetry, and the honest correction was the task card, which is rejected above. Padding is worse than
  the symmetry.
- **Do not re-argue that a model is a statistic, that frequency beats quality, or that there is more bad
  code online than good.** `context` owns the average. This unit owns the *date*.
- **Do not level `truth.cutoff.2`'s Dutch superlative** ("het lastigste" against the English
  comparative). One word, changes nothing, and levelling it is exactly the "I would have phrased this
  differently" edit this pass refuses.

---

# 9. `workshop`

**Effort: light** — one of the two best-shaped units in the step. Lean on purpose, and the leanness
works.

204 words, no AI tell on the page, `OneWindow` is the decision that turns a flag hunt into a step 1
capstone, and the board's hint keys carry real teaching without giving anything away. One sentence in
`lead.1` is wrong, and it is wrong in a way that works directly against the thesis in the same
paragraph.

### Do

1. **Rewrite `workshop.lead.1`.** Two faults in one paragraph.
   - It states a mechanism true of **one** flag out of three: "three of the lines it throws away are
     flags". Checked against `kata/step1/java`: the trace flag is a computed line that is dropped; the
     decode flag sits in a branch whose condition cannot be true, so it is never computed at all; the
     DEBUG flag is not a catalogue line and is suppressed by a log level, not thrown away. The count is
     wrong in the other direction too, and the sentence immediately after it is the unit's whole thesis:
     "One service, three answers, and where each one came from is the only thing separating them." If all
     three were thrown-away lines they would have the same provenance and there would be nothing
     separating them. The paragraph argues against itself in eleven words, and it primes the wrong
     technique: a student who reads it goes looking for dropped lines, which is one third of the work.
   - It calls the sidebar page `<code>Catalog</code>`. The sidebar renders "Catalogue" / "Catalogus", so
     a student scanning for that word does not find it in either language. Worse, mono means "what the
     machine produced" and `services/Catalog.java` **is** a machine name in this step, one the `truth`
     unit already made them open, so the sentence reads as pointing at a Java class on a page whose whole
     job is telling three sources apart.
   EN:
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
   NL: `De backend houdt iets voor je achter. <code>GET /api/titles</code> geeft negen boektitels terug,
   en de Catalogus-pagina in de zijbalk toont ze. De pipeline erachter doet bij elke aanvraag een pak
   meer dan die negen regels laten uitschijnen, en niet alles daarvan in het volle zicht. Drie van de
   dingen die hij je niet vertelt zijn flags: leetspeak, tussen <code>{accolades}</code>. Eén service,
   drie antwoorden, en <a href="/steps/step1/truth">waar elk antwoord vandaan komt</a> is het enige dat
   ze uit elkaar houdt.`

2. **Close the pricing promise, as a pointer and not as arithmetic.** Step 0's last house rule says
   "Price the hunt when it is over… Step 1 gives you the numbers to put on that", and this page is where
   the hunt is over: `OneWindow` puts two `/context` readings in the student's hand at exactly that
   moment and nothing points at the rate. `model.cost.4` is, by the step's own record, now reached from
   nowhere but its own unit. Rewrite `hunt.count.label`:
   EN: `Run /context again when the third flag lands, put the two numbers side by side, and take the gap
   to the rates in the model unit.`
   NL: `Draai /context opnieuw zodra de derde flag binnen is, leg de twee getallen naast elkaar, en neem
   het verschil mee naar de tarieven in de unit over het model.`
   `model`'s new `PriceOneTurn` card is the other end of this; if it lands, this pointer reaches a card
   rather than only a table.

3. **One anchor in `workshop.one-window.1`.** It is the only unlinked claim on the page and it is the one
   the student is asked to trust: "the hunt fills a window in front of you, with source files, a trace and
   a console dump going in one after another. You have spent eight units on what that costs" names none of
   them. "A tool result is usually the bulkiest thing in there" is `tools`'s claim.
   EN: `… with source files, a <a href="/steps/step1/tools">trace and a console dump</a> going in one
   after another.`
   NL: `… met bronbestanden, een <a href="/steps/step1/tools">trace en een consoledump</a> die er de een
   na de ander in gaan.`

4. **`flags.panel.wrong` (NL): "ze" → "hij".** "Ga terug naar de pipeline en lees wat **ze** verborg" uses
   a different pronoun for the pipeline than `workshop.lead.1` two keys away ("wat **hij** weggooit"), and
   "ze" reads as plural at first glance, which on a board about three flags is the wrong first glance.
   NL: `Niet die. Ga terug naar de pipeline en lees wat hij verborg.`

5. **Deck (manifest).** Two entries.
   - **`deck.workshop.divider.1`** reads "Three flags hidden in `<hi>`the catalogue pipeline`</hi>`",
     which is true of at most two of the three and carries item 1's misframing onto the board. →
     `Three flags hidden in <hi>one service</hi>`, Dutch sibling with it.
   - **New slide `deck-workshop-debrief`**, `kind: 'statement'`, after `deck-workshop-flags`. `workshop`
     is the step's capstone and gets a divider plus one statement. `OneWindow`'s fourth move is a debrief
     question, and a question to the room is the purest form of "what only works out loud"; the deck has
     none after the opening slide. **No note**: it is a question.
     EN title: `Which flag could you have <hi>handed over whole</hi>?`
     NL title: `Welke flag had je <hi>in zijn geheel kunnen doorgeven</hi>?`
     It is a look-back, so the tutor puts it up after the hunt rather than before it.

6. **Two notes to escalate rather than fix here.**
   - **The house-rule contradiction** (`audit.md` item 2): `welcome.house-rules.3` is "One flag, one
     session… Start each one on a fresh session", and `one-window.1` and `hunt.work.label` say to work all
     three from a single session without clearing. The audit's call is right (the card is correct for a
     capstone, so rule 3 is the half to qualify) and the fix belongs in step 0. **What is new and must go
     into that row:** the collision is also on the deck, two lines apart on one slide.
     `deck.workshop.divider.*` states house rule 1 verbatim ("Only your agent hunts") and contradicts rule
     3 in the same three bullets, so whatever clause qualifies rule 3 has to be true of that slide too.
   - **`kata/step1/java/CLAUDE.md` gives two counts that disagree**: "40 of the 41 restored strings carry
     `(draft)`" against "five lines appear and all five are flags" with "six of the decoys carry the
     marker and vanish; four do not". Five unmarked strings means 36 of 41, not 40. `flag.trace.help`'s
     "five" agrees with the second account, so the number the student sees is probably right and the "40"
     is the stale sentence. **Re-measure by counting `(draft)` markers among the `unveil` call sites. Do
     not decode anything to settle it.**

### Do not

- **Do not add a figure.** Both `data-figure` markers here are interactive, and the two drawings a
  reviewer would reach for both fail the bar: a before/after window drawing would pre-empt the exact
  measurement `OneWindow` asks the student to take, and a three-way provenance drawing would be the third
  telling of the per-flag technique after the row hints and the Hint dialogs, handing over the sorting the
  board exists to make the student do.
- **Do not add a quiz.** The page already grades three answers and carries an ungraded reflection; the
  material a quiz would cover is `truth`'s, one page up; and the distractors would have to be the three
  techniques, which are written out on the board six inches below.
- **Do not add a fifth move to `OneWindow`**, and do not add a "write down which technique found which
  flag" card: that is move 4 in different words and it gives away the sorting the board grades.
- **Do not write a per-flag technique into the prose**, and do not let a `flag.*.help` key close on what
  its first sentence already said. A board hint is the only place a technique is written down.
- **Do not write a layer name back into any of the three `flag.*.help` keys.** The tools/session/harness
  mapping was a pun and it is gone; each key now opens on where the answer lives.
- **Do not write a house rule back onto this page**, do not give the board a heading (in guided mode a
  heading is adopted by the *next* top-level marker, so it would be pulled up over the task card), and do
  not add a closing section: that is `recap`'s.
- **Do not implement, decode or reveal any flag.** Ship the puzzle, not the decode, the trace
  instrumentation or the DEBUG readout.

---

# 10. `recap`

**Effort: light** — the best-made page in the course. Two small local defects and nothing else.

Every one of the eleven factual claims here checks out against the repository or against current
pricing, the eight anchor words each link to the unit that genuinely owns the claim they sit on, and the
Dutch is a full structural match down to the tag sets.

### Do

1. **`recap.what-costs-do.5` is the one line where the move does not answer the cost.** The page's stated
   shape is "every bullet is a cost and the move that answers it", and all nine were tested against it;
   bullet 5 is the only outlier. Its cost is "everything in there goes out again" and its move is "put more
   in there", so the move *exploits* the cost rather than answering it. The connective tissue exists in
   `session.sessions-where-money.2` and is the half that got compressed away. One clause, keeping the
   existing move.
   EN, replacing the sentence after the bold half: `Since what it read early is what you keep paying for,
   ask everything you want about a piece of code while it is still in front of you.`
   NL: `Wat het vroeg gelezen heeft, is waar je blijft voor betalen, dus vraag alles wat je wilt weten over
   een stuk code zolang het nog voor je ligt.`
   This also drops "because adding to a session is cheap and rebuilding one is not", which is a second
   sentence's worth of argument riding on a comma; it is intact in `session.sessions-where-money.2`, which
   the bullet links to.
   **Do not** swap in session's headline lever ("you can throw the session away"): bullet 4 already carries
   clearing, and two clearing bullets one line apart would be worse than the current state.

2. **Add the coin this bullet is about to have a source for** (paired with `session` item 6). Once
   `session.sessions-where-money.3` carries a `coin`, the move half of `recap.what-costs-do.5` takes the
   same marker, in both languages. The recap lifts icons; it never chooses them. This is the only bullet on
   the page with no icon at all, and until now that was recorded as "that unit marks none" rather than as a
   decision anyone made.

3. **Bullet 7's gem has no source.** `recap.what-costs-do.7`'s move is "Let the expensive model write the
   brief and a cheap one run it", which is `model.let-it-pick.1`, and `let-it-pick.1` and `.2` carry no icon
   at all. The nearest gem+coin pair is `prompt.meta-prompting.2`, which is different advice and whose
   marker is already spent on bullet 2. The fix is in `model` (item 11 of that unit's list): put `gem` +
   `coin` on `model.let-it-pick.1` so the trail back exists. Coordinate; do not strip the gem from the
   recap instead, which would demote the best cost move in the step to "just a saving".

4. **Deck (manifest).** Two retitles. The `recap` block is four slides for three claims and says every one
   of them twice.
   - **`deck.recap.one-window.title`** ("It was all one window") repeats `deck.recap.divider.2` ("All of it
     shared one window") one slide later.
     EN: `Eight units, and every one of them <hi>filled the same window</hi>`
     NL: `Acht units, en elke ervan <hi>vulde hetzelfde venster</hi>`
     If that still reads as an echo, the cleaner fix is to delete the slide: the divider already carries
     the claim.
   - **`deck.recap.divider.3`** ("Next: how you hand over the work") pre-announces `deck-recap-next` three
     slides early. Leave `deck-recap-next` as the only slide naming step 2, which is what a handoff wants.
     EN: `What you learned here <hi>still holds</hi> in step 2`
     NL: `Wat je hier leerde, <hi>geldt daar nog steeds</hi>`

### Do not

- **Do not add a figure.** The strongest candidate anyone could construct (two fields taking `OneWindow`'s
  two `/context` numbers and printing the delta against `ModelPricing`'s rate) fails on three counts: it
  makes the recap the second place in the course that multiplies, it makes the recap ask for something when
  its charter says it never will, and it puts a fifth thing to do immediately after a capstone.
- **Do not add a task card.** The step's task cards all sit in units that argue something first; the recap
  argues nothing new, so a card here is an errand with no lesson behind it, arriving after a two-to-four-hour
  flag hunt.
- **Do not add a quiz.** It would be the third graded thing in three consecutive pages, `QuizPanel` writes
  progress and can mark the unit done on an ace (a recap that can be "passed" changes what the page is), and
  in guided mode it would come from the registry and therefore *survive* the prose cut, turning the
  deliberately empty class page into a page that is one quiz and nothing else.
- **Do not split the merged list back into costs-then-advice.** It ran that way first and the halves did not
  line up: eight units do not have one money-saver each, so the reader was left pairing bullets by eye and
  the two most useful things on the page sat a screen apart.
- **Do not "fix" the empty guided page.** It is a supported state and it is one decision with the deck's
  recap block (a divider carrying three points, then `one-window`, `moves`, `next`), which is where the
  recap happens in class.
- **Do not put `workshop` in the list.** A capstone is not a claim and the student has just worked it.
- **Do not add a `.claude` suffix to the five-hour bullet's key.** There is no Copilot sibling for a missing
  translation to fall back to, which is the whole reason the suffix exists.
- **Do not level `verloopt` against `harness.caching.3`'s `verschaalt`.** Both are correct Dutch and a recap
  is the right place for the plainer word.

---

# Cross-unit coordination

Three items span two units and will be written twice or lost if nobody watches them.

| Item | Owners | Note |
|---|---|---|
| The `coin` on session's cost-saver | `session` 6 → `recap` 2 | The unit marks it first; the recap lifts it. `step1/CLAUDE.md`'s "Do not invent one to even the list up" sentence is updated in the same change. |
| The `gem` + `coin` on `let-it-pick.1` | `model` 11 → `recap` 3 | The recap's bullet 7 already carries the pair; `model` is where the source goes. |
| Pricing the hunt | `model` 4 (`PriceOneTurn`) → `workshop` 2 (`hunt.count.label`) | `workshop` points; `model` collects. Neither adds arithmetic to `workshop`: `model.cost.4` stays the one place the course multiplies. |
| The tool-count number | `tools` 1 → `tools` deck slide → `step1/CLAUDE.md` | The rescoped wording has to be identical in the prose, the slide note and the notes file. |
| `deck.tsx`'s "Seven are deliberately absent" | `tools` 12 | Cheapest high-value change in the pass; do it even if every proposed slide is dropped. |

# Ranking

Worst shape first: **`prompt`**, **`context`**, **`model`**, **`tools`**, **`session`**, **`tokens`**,
**`truth`**, **`harness`**, **`workshop`**, **`recap`**.
