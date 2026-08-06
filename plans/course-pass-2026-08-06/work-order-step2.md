# Work order: step 2 (agentic engineering)

Triaged from ten unit dossiers, `deck-step2.md`, and the step 2 rows of `course-arc.md`,
`facts.md` and `parity.md`, against `front/src/steps/step2/CLAUDE.md`.

Everything below is **decided**. Do not go back to the dossiers. Where a critic's proposal was
rejected it is listed under **Do not**, with the reason, so a well-meaning implementer does not
re-derive it.

## How to work

- Unit prose lives in `front/src/steps/step2/units/<unit>.html`. **You own your unit's HTML.**
- **Never open `locales/en.json` or `locales/nl.json` with Edit or Write.** Write a patch at
  `<SCRATCH>/patches/step2/<unit>.json` in the shape the BRIEF gives (`en`, `nl`, `removeEn`,
  `removeNl`, `afterEn`, `afterNl`). Every key added to `en` needs the same key in `nl`.
- `index.tsx`, `quiz.ts` and `deck.tsx` belong to an integrator. Write what you want done into
  `<SCRATCH>/manifests/step2/<unit>.json`.
- A **new** figure component `.tsx` is yours. An **existing** figure component owned by exactly one
  unit (`ScriptRuns.tsx`, `AgentsAtOnce.tsx`, `IterationPaths.tsx`) is yours too. `FileTree.tsx` is
  shared by four figures in this step, so the `engineering` agent owns the one change to it.
- No em-dashes, in either language, anywhere. Every rendered element carries `id` +
  `data-component`. `data-figure` markers stay direct children of the body.
- Key names are locations: moving a paragraph into another section renames its key.
- `cd front && npm run build` must pass at the end.

## Summary and ranking

Ranked by how much work each unit needs, heaviest first:

| Rank | Unit | Effort | One line |
|---|---|---|---|
| 1 | `steering` | heavy | Ships a command that errors, 1,098 words with nothing to do and no quiz, and its best habit never names the file it goes in. |
| 2 | `patterns` | heavy | 310 words that state a procedure and ask for nothing; needs a quiz, a card, and its only figure needs to start measuring something. |
| 3 | `goals` | heavy | Well written, badly checked: a flagship number the capstone exists to debunk, a broken command, arithmetic off by 3x, a contradiction with step 1. |
| 4 | `workshop` | heavy | Four factual defects, two of them on screen the whole time a student works; no way to click back to the argument it tests. |
| 5 | `evolution` | heavy | Its evidence photograph shows a course that no longer exists, and its exercise is invisible in guided mode, which is the default. |
| 6 | `engineering` | moderate | The last section opens on a promise it does not keep and contradicts `setup` on hooks one page later. |
| 7 | `enablement` | moderate | Three sections held together by an abstract title, an instruction to count with nothing to count. |
| 8 | `parallel` | moderate | Excellent prose; its figure draws four unwatched agents as watched, and its own notes admit it should carry a quiz. |
| 9 | `workflows` | light-moderate | Best-built unit in the step. All of it is sentence-level, no new instruments. |
| 10 | `setup` | light | No factual error found anywhere in it. Three sentences are wrong. |

**Worst shape: `steering` and `patterns`.** Both are told-and-never-asked units where the fix is
net-new content (a quiz and a card each) rather than repair; `steering` additionally hands the
reader a `git` command that fails on the first line, in the second-longest unit in the course.

**Already excellent, leave nearly alone: `setup` and `workflows`.** `setup` survived a hostile
fact-check with nothing wrong: the hook JSON schema, the two concrete details inside an invented
skill's frontmatter, and all three flag hashes check out. `workflows` is the standard the rest of
the step is measured against: the ordering is an argument, it points at step 1 instead of
re-teaching it, and its quiz asks students to choose rather than recall. Neither needs a new
figure, a new instrument, or a restructure. Touch only the named sentences.

**Most factually wrong (a different axis from "worst shape"): `goals` and `workshop`.** An
attentive student catches the course out four separate times in `goals`.

---

# 1. `evolution` — Project evolution

**Effort: heavy**

## Do

1. **Re-shoot `front/public/added-details.png` from the current tree, in English.** This is the
   unit's evidence and it is stale. The committed shot shows sidebar titles `CONTEXT` and
   `WERKEN MET EEN AGENT` (current Dutch titles are `Context, model, mechanismen` and
   `Agentic engineering`), `6 PAGINA'S` / `8 PAGINA'S` (both steps now have 10 units), **no fourth
   step at all** (`step3` is missing), and body text reading "Slides zijn nog niet gebouwd. Die
   komen binnenkort." while four per-step decks exist. Take the new shot with the sidebar showing
   all four steps, the real unit counts, and the UI language set to **English**, so it matches its
   sibling `walking-skeleton.png` (currently English) instead of differing in a way the unit never
   claims. Keep the four things the caption points at visible: header, palette, grouped steps,
   settings cogwheel. The file path, the `UnitShot` wiring and the deck slide
   (`deck-step2-evolution-details`, `figureWidth: 1050`) all stay as they are.
   If the shot genuinely cannot be retaken, the fallback is to drop "as it looks now" from
   `added-details.alt` in both languages and date the caption instead. That is the weaker answer.

2. **Add a `TaskCard` for the fifteen-minute exercise so it survives guided mode.** Guided mode is
   the default and drops every run of prose, keeping only figures plus the nearest heading above
   each. The entire exercise here is prose, so a class currently sees three drawings and nothing to
   do. Create `front/src/steps/step2/FifteenMinutes.tsx` on the `WhereWouldItGo` pattern:

   ```
   block="fifteen-minutes"  namespace="step2"  prefix="fifteen"
   storageKey="kata.step2.fifteen"  className="my-8"
   moves: ['clock', 'pick', 'shape', 'loop', 'write']
   ```

   Locale keys (`en`, with Dutch in the same patch):
   - `fifteen.title`: `Fifteen minutes on a skeleton`
   - `fifteen.description`: `Nothing is graded and nothing is submitted. The clock is the
     constraint, and the list of details you did not reach is the answer.`
   - `fifteen.todo`: `Mark this task done` / `fifteen.done`: `Done`
   - `fifteen.clock.label`: `Put fifteen minutes on a clock.`
   - `fifteen.pick.label`: `Pick one of the three above: a search box, a link shortener, or an
     export button.`
   - `fifteen.shape.label`: `Ask for the shape only, and leave out everything in that option's
     second sentence.`
   - `fifteen.loop.label`: `Run it, pick the single next thing, ask for that alone.`
   - `fifteen.write.label`: `When the clock goes, write down the three details you did not reach.`

   Dutch: `fifteen.title` `Vijftien minuten op een skelet`; `fifteen.description` `Er wordt niets
   beoordeeld en niets verstuurd. De klok is de beperking, en de lijst details die je niet gehaald
   hebt is het antwoord.`; `fifteen.todo` `Markeer deze taak als klaar`; `fifteen.done` `Klaar`;
   `fifteen.clock.label` `Zet vijftien minuten op een klok.`; `fifteen.pick.label` `Kies er een van
   de drie hierboven: een zoekvak, een link shortener of een exportknop.`; `fifteen.shape.label`
   `Vraag alleen de vorm, en laat alles weg wat in de tweede zin van die optie staat.`;
   `fifteen.loop.label` `Draai het, kies het ene volgende ding, vraag alleen dat.`;
   `fifteen.write.label` `Als de klok afgaat, schrijf de drie details op die je niet gehaald hebt.`

   **The prose stays exactly as it is.** A self-learner gets both; a class gets the card. Manifest:
   `figure: <FifteenMinutes />` on the `evolution` entry in `index.tsx`. This also makes the
   sentence in `step2/CLAUDE.md` ("`evolution`, `setup` and `engineering` carry the heading because
   they carry cards") true, which it currently is not.

3. **Split `evolution.walking-skeleton.3`.** The sharpest claim in the unit is currently the tail of
   a paragraph about this website's history. `.3` keeps:

   > That is how it grew, too. A lot of the content went in first, and those things arrived after.

   New `evolution.walking-skeleton.4` closes the section:

   > Ask an agent for a whole system and you get a plausible one. Ask it for the next change to a
   > running one and you can check the answer.

   Dutch: `.3` keeps `Zo is dit ook geëvolueerd. Eerst werd er veel content ingevuld, en pas daarna
   kwamen die zaken erbij.`; new `.4` takes `Vraag een agent een heel systeem en je krijgt een
   aannemelijk systeem. Vraag hem de volgende wijziging aan iets dat draait en je kunt het antwoord
   nakijken.`

4. **Rewrite `evolution.prototype-conversation.2` down to its one real claim.** The current text
   restates `.1` in the abstract, then issues an empty imperative. Replace the whole block with:

   > Take the strongest parts of each one across. What you keep is usually a graft of two of them
   > rather than one of the three.

   Dutch: `Neem de sterkste stukken van elk ervan mee. Wat je overhoudt is meestal een kruising van
   twee, niet één van de drie.`

5. **Join the two hours in `evolution.details.4`.** The lead prices a whole version at an hour and
   this paragraph caps a detail at an hour; the unit never says it is the same hour. Replace:

   > As a rule of thumb, a detail should not cost you more than an hour. That is the hour a version
   > costs, so anything longer was not a detail, it was the next step. You get a feel for where that
   > line sits the more you work this way.

   Dutch: `Als vuistregel mag een detail je niet meer dan een uur kosten. Dat is het uur dat een
   versie kost, dus alles wat langer duurt was geen detail maar de volgende stap. Naarmate je meer
   op deze manier werkt, krijg je vanzelf gevoel voor waar die lijn ligt.`

6. **Cut "the right characteristics" from `evolution.walking-skeleton.1`.** It is the one
   abstraction in a list of concretes and the Dutch is no clearer. The sentence becomes:

   > What the first version does have to get right is the shape: a label of its own, a place in the
   > application structure, and a result that actually comes back.

   Dutch: `…is de vorm: een eigen label, een plek in de applicatiestructuur, en een resultaat dat er
   echt uit komt.`

7. **Rewrite `iteration-paths.description` (the SVG `<title>`, the only thing a screen-reader user
   gets).** The current text claims the dropped versions stop "a few degrees off" the target; the
   two spurs off node `(205,117)` are 30 and about 50 degrees off, and one opens by heading *away*
   from the target. Replace, EN:

   > Two routes from the same start to the same target. On the left, three long steps that stop
   > beside it. On the right, twelve short ones that land in it, and four dropped versions branching
   > off along the way, each aimed at the target and none of them arriving.

   NL:

   > Twee routes van hetzelfde vertrekpunt naar hetzelfde doel. Links drie lange stappen die ernaast
   > stoppen. Rechts twaalf korte die binnenkomen, en onderweg vier versies die eraf takken, elk
   > richting het doel en geen ervan komt aan.

8. **`iteration-paths.many`: one spelling of the verb.** The step writes the term three ways
   (`vibecode`, `Vibe coding`, `vibe-coded`). Set `en` `iteration-paths.many` to
   `With AI you vibe-code it in an hour` and `nl` to `Met AI vibe-code je het in een uurtje`. Leaves
   the noun "vibe coding" alone. **Do not touch the approving use itself**: `step2/CLAUDE.md`
   records it as deliberate and `engineering.lead.1` answers it by name.

9. **`iteration-paths.few` (Dutch): put the number back.** EN says "Prototyping the old way took
   weeks"; NL says "kost veel tijd", which loses the contrast the figure exists for and switches
   tense. This is a place the English is the thought-through one. Set `nl`
   `iteration-paths.few` to `Traditioneel prototypen kostte weken`.

10. **Two more Dutch keys.**
    - `evolution.prototype-conversation.1`: the Dutch uses "versies" here and in `lead.3`, which is
      the one pair `step2/CLAUDE.md` says must not be confused (several takes put in front of
      *people* against several attempts at one step of your own work). Rewrite to
      `Bouw drie varianten van hetzelfde scherm in de tijd die één discussie erover kost, leg ze
      naast elkaar en kijk waar mensen over beginnen.`
    - `evolution.fifteen-minutes.3`: opens `Draaiend krijgen kost je een minuut of vijf`, missing its
      subject. → `Het draaiend krijgen kost je een minuut of vijf.`

11. **Manifest (deck):** add a fourth divider point so `A prototype starts a conversation` reaches
    the room. `deck.evolution.divider.4` EN
    `Three takes in front of people, <mute>not one argument about them</mute>` / NL
    `Drie versies voor mensen neerzetten, <mute>in plaats van er één keer over discussiëren</mute>`.

## Do not

- **Do not add a checker to the fifteen-minute exercise.** `step2/CLAUDE.md`: the clock is the
  constraint and the answer is the list the student did not reach. The `TaskCard` in item 2 grades
  nothing, which is why it is allowed.
- **Do not change any example's second sentence.** Those sentences are what make each option a
  skeleton rather than a small feature, and they are recorded as load bearing.
- **Do not draw a cost-against-timing curve under `details.3`.** It would be a picture of a claim
  the paragraph already makes, with hand-authored proportions asserting a minimum nobody measured.
- **Do not cut `details.2`'s "Work out the bare minimum…" sentence.** It is the weakest line on the
  page but cutting it costs the paragraph its instruction.
- **Do not change the `IterationPaths` geometry** unless someone is already inside the component for
  another reason. The alt-text rewrite in item 7 makes the description honest without touching
  coordinates, and the spurs must stay below a path that is itself aimed at the target, so "a few
  degrees" is not achievable near the end of the run.
- **Do not grow the left half of `IterationPaths` a branch.** A step you can take again is a step
  you can afford to take twice, which the left half at weeks a version cannot.

---

# 2. `setup` — Project setup

**Effort: light**

## Do

1. **Rewrite `setup.lead.1`.** It opens the page on a triple of abstractions and sets a tricolon
   rhythm that runs through five of the unit's six paragraphs, and it restates step 1's
   statelessness claim. Replacement, EN:

   > An agent starts every session knowing nothing about your project. Arrange the repository so it
   > does not have to be told the same things twice. You get better answers, and you pay fewer
   > tokens for them <svg data-icon="coin"></svg>

   NL:

   > Een agent begint elke sessie zonder iets te weten over jouw project. Richt je repository zo in
   > dat je hem niet twee keer hetzelfde hoeft te vertellen. Je krijgt betere antwoorden, en je
   > betaalt er minder tokens voor <svg data-icon="coin"></svg>

2. **Open `setup.claude-md.1` by naming `step1/session` rather than restating it.** Step 1 says
   `CLAUDE.md` is read at session start twice, by name; this unit currently says it a third time
   before getting to what it actually adds. Replace the first two sentences with:

   > <a href="/steps/step1/session">Step 1's unit on sessions</a> said a standing instruction goes
   > in <code>CLAUDE.md</code> because the file is read again at the start of every session. What
   > that unit did not say is that the root file <span data-marker>1</span> then stays in the window
   > for all of it, wherever the agent is working.

   NL:

   > <a href="/steps/step1/session">De unit over sessies in stap 1</a> zei dat een staande instructie
   > in <code>CLAUDE.md</code> hoort, omdat dat bestand bij de start van elke sessie opnieuw gelezen
   > wordt. Wat die unit niet zei: de <code>CLAUDE.md</code> in de root <span data-marker>1</span>
   > blijft er daarna de hele sessie in staan, waar de agent ook aan het werk is.

   The rest of the paragraph is unchanged.

3. **Rewrite `setup.skills.1` off the Dutch.** EN currently reads "A skill can be considered a
   reusable high quality prompt", which is the hedged passive `lesson-writing` bans and an
   unhyphenated compound modifier; the Dutch ("een herbruikbare, goed geschreven prompt") is the
   version that was thought through. EN becomes:

   > A skill is a reusable prompt, written once and written properly. It is a folder under
   > <code>.claude/skills/</code> with a <code>SKILL.md</code> in it, holding a procedure you want
   > followed the same way every time.

   **Dutch unchanged.**

4. **Generalise `setup.skills.4`'s cross-reference example.** It currently says "the one above ends
   by asking for a commit", asserting the content of a `<pre>` that shows frontmatter only, so the
   reader is pointed at text they cannot see. EN:

   > Keep them small. A skill may point at another rather than repeat it: a skill that ends by
   > asking for a commit names <code>commit-message</code> instead of restating the rules for one.
   > Detail that will not fit goes in a <code>references/</code> folder beside the body, read only
   > when it is wanted.

   NL:

   > Hou ze klein. Een skill mag naar een andere wijzen in plaats van ze over te schrijven: een skill
   > die eindigt met een commit vragen noemt <code>commit-message</code> in plaats van de regels
   > ervoor te herhalen. Details die er niet in passen gaan in een map <code>references/</code>
   > ernaast, en worden pas gelezen wanneer ze nodig zijn.

5. **Split the last sentence of `setup.hooks.3` so the paragraph ends on its best clause**, and land
   the forward pointer into `patterns` after it (audit item 36; pairs with `patterns` item 4 below,
   which names `setup` from the other side). EN, the closing run of the paragraph:

   > So reach for one when the thing must happen every time and you would rather not find out that
   > it did not. Then keep it fast and keep it narrow. That script runs on every Write and every
   > Edit, and a broken one hands the agent an error it did not cause. It works around that instead
   > of writing your code. When the thing that keeps coming back is a correction rather than a
   > command, <a href="/steps/step2/patterns">the patterns unit</a> is where it goes.

   NL: keep the existing Dutch for the first sentences (the Dutch already splits correctly) and add
   the same closing clause: `Als wat blijft terugkomen een correctie is in plaats van een commando,
   dan hoort het thuis in <a href="/steps/step2/patterns">de unit over terugkerende patronen</a>.`

   The pointer goes **after** the new final sentence, not instead of it.

## Do not

- **Do not add a hooks `TaskCard`.** Hooks being taught and never done is a real gap, but this unit
  closes on the only machine-graded exercise outside `workshop`, and that board must be the last
  thing on the page. A second instrument under the same heading dilutes it, and the only realistic
  hook exercise (a `Stop` hook running `mvn verify`) would fire across the whole kata repository.
- **Do not add a quiz.** The unit's least intuitive claim, that a `CLAUDE.md` deeper in the tree is
  never read while you work at the top, is already what the `package` flag grades and what
  `setup.flag.package.help` states as a symptom. A question would be the same check with the answer
  visible on screen.
- **Do not add a fourth figure**, and specifically not a window-with-stacked-blocks drawing under
  `skills.5`. That vocabulary belongs to `steering`'s `TwoWindows`/`LoopInWindow` and `goals`'s
  `ReadEachTime`, and `step2/CLAUDE.md` records that the token-cost argument has exactly two sites
  in this unit and must not open a third.
- **Do not touch the three surviving tricolons** in `claude-md.2` (a deliberate callback to
  `entropy` and `context fatigue` from `step1/context`), `your-own-claude-md.1` and `hooks.1` (three
  real hook events).
- **Do not name any of the three flag files** in the prose or in a board hint, and do not collect
  the flags anywhere, including in a comment.
- **Do not "fix" the spaced hyphen inside the Skills `<pre>`.** Code samples carry no `data-i18n`
  key and this is the sanctioned workaround for the em-dash ban.

---

# 3. `engineering` — Craft

**Effort: moderate**

## Do

1. **`en.json` `engineering.title` becomes `Craft`.** The Dutch already says "Vakmanschap" and
   matches `lead.3` ("Software engineering has always been a craft"); the English makes the sidebar
   read "Agentic engineering › Engineering". One string. **The unit id stays `engineering`**, so no
   URL, prose key, deck eyebrow or `audit.md` row identifier moves.
   Ripple, and it must land in the same pass: `nl.json` `workflows.naive.1` sends the reader to "de
   unit over engineering" and `step3` `change.you-test-engineer.2` sends them to "de unit over
   vakmanschap". Make both Dutch references say **vakmanschap**, matching the Dutch sidebar label.

2. **Rewrite `engineering.quality-gates.1`.** It currently opens on a promise it does not keep
   ("Skills and hooks turned up in project setup as things a project holds. This is where you put
   them to work") when skills are never put to work here and `patterns` owns that argument; it lands
   a weak tricolon; and it calls SonarQube's Reliability Rating a "score". EN:

   > Line coverage and mutation coverage still tell you whether software is fit to ship. So does a
   > Sonar reliability rating. They also hand an agent an invariant, something fixed to hold itself
   > to while it works <svg data-icon="gem"></svg> Each of them is a proxy, though, and an agent will
   > satisfy a proxy rather than the thing behind it. The gate worth wiring in is the one that is
   > expensive to fake.

   NL (note this also fixes the Dutch bundle contradicting itself: the unit said "moeilijk te faken"
   while `deck.engineering.gates.note` says "duur"):

   > Line coverage en mutation coverage zeggen nog altijd of software klaar is om te leveren. Een
   > Sonar reliability rating ook. Ze geven een agent ook een invariant, iets vast om zich aan te
   > houden terwijl hij werkt <svg data-icon="gem"></svg> Elk van die drie is wel een proxy, en een
   > agent voldoet aan de proxy in plaats van aan wat erachter zit. De gate die het waard is om in te
   > bouwen, is degene die duur is om te faken.

3. **Rewrite `engineering.quality-gates.2`.** Two problems in one paragraph: it tells the reader to
   fire `mvn verify` from a hook one unit after `setup.hooks.3` said keep hooks fast, and the root
   `CLAUDE.md` states that plain `mvn verify` runs no analysis in this repository. One clause naming
   the moment fixes the contradiction and quietly introduces the fourth hook event. EN:

   > Wire that into the run rather than into your memory. A hook fires once the agent says it is
   > finished, which is the one moment a hook can afford to be slow. <code>mvn verify</code> runs
   > whatever analysis your build has wired in, and a number under the floor comes back as a failure
   > it has to answer for. The same rule written into <code>CLAUDE.md</code> is a request. This one
   > runs whether the agent remembers it or not.

   NL:

   > Steek dat in de run in plaats van in je geheugen. Een hook vuurt zodra de agent zegt dat hij
   > klaar is, en dat is het enige moment waarop een hook traag mag zijn. <code>mvn verify</code>
   > draait wat je build aan analyse heeft ingebouwd, en een cijfer onder de drempel komt terug als
   > een falen waar hij mee verder moet. Diezelfde regel in <code>CLAUDE.md</code> is een vraag. Deze
   > draait, of de agent er nu aan denkt of niet.

4. **Add `engineering.quality-gates.3`, a new closing paragraph immediately above the `<hr>`.** It
   closes the vibe-coding frame `lead.1` opens (currently never returned to) and hands into
   `steering`, which is audit item 37 done properly. EN:

   > None of that is about the agent being careful. It is the side of the line you are standing on,
   > written down where the work happens. What is left is the half you cannot write down in advance,
   > which is what you do while a run is in flight.

   NL:

   > Niets daarvan gaat over een agent die oplet. Het is de kant van de lijn waar jij staat,
   > opgeschreven op de plek waar het werk gebeurt. Wat overblijft is het stuk dat je niet vooraf
   > kunt opschrijven, en dat is wat je doet terwijl een run bezig is.

   **Above the `<hr>`, never below it.** The protected gap is between the `<hr>` and the card.

5. **Rewrite `engineering.lead.1`'s second sentence.** It announces bluntness and is then not blunt.
   The whole key becomes, EN:

   > Good agentic projects start with good software engineering. That is the whole line between vibe
   > coding and agentic engineering, and you are on one side of it or the other.
   > <a href="/steps/step2/evolution">Project evolution</a> put you on the other side for an hour, on
   > a version built to be thrown away, and that is the one place the line does not hold.

   NL:

   > Goede agentic projecten beginnen bij goede software engineering. Dat is meteen het verschil
   > tussen vibe coding en agentic engineering, en je staat aan de ene kant of aan de andere.
   > <a href="/steps/step2/evolution">Projectevolutie</a> zette je er een uur lang aan de andere kant
   > van, op een versie die je toch weggooit, en dat is de enige plek waar die lijn niet geldt.

   Keep the third sentence naming `evolution`. `step2/CLAUDE.md` protects it.

6. **Rename the heading `Use the correct language` to `The right words`.** In a Java kata,
   immediately after a section about folder layout, "language" is a genuine garden path in both
   languages; the deck's own summary of the section (`deck.engineering.divider.2`, "Pattern names and
   domain words are compression") already knows what it is about. NL heading: `De juiste woorden`.
   Slug rule applies: rename `engineering.use-correct-language.heading` / `.1` (and any further
   numbered keys in that section) to `engineering.right-words.*` in the HTML **and** in `nl.json` via
   `removeNl` + `nl` in your patch. Grep the old slug afterwards; nothing else points at it.

7. **Give `DomainTree` a caption.** It is a fictional project, nothing on the page says so, and the
   `TaskCard` directly under it asks the student to sort a real one "in the shape above". The repo
   already has the convention: `audit.caption` reads "An example security audit, not a run against
   this repository." Add optional caption support to `FileTree.tsx` (one `<figcaption>`, the same
   shape `AuditExample` uses) and give `DomainTree` a key:
   - `en` `domain-tree.caption`: `An example project, not one in this repository.`
   - `nl` `domain-tree.caption`: `Een voorbeeldproject, geen project uit deze repository.`

   Do **not** caption `ProjectTree`, `SkillTree` or `HookTree` "for consistency"; none of them sits
   under an exercise comparing it to a real project.

8. **Tighten one clause in `engineering.domain-driven-design.1`.** "Nothing above `adapter/` names
   Postgres or S3" is falsified by the figure itself, which draws
   `src/main/resources/application.properties`. Change to "No class outside `adapter/` names Postgres
   or S3" (NL: `Geen klasse buiten <code>adapter/</code> noemt Postgres of S3`).

9. **`nl.json` `deck.engineering.divider.3`**: EN says "run", NL says "build", and the unit prose
   says "run" in both. → `Gates horen in de run, <mute>niet in je geheugen</mute>`.

10. **Manifest (deck):** add a `statement` slide first under the `engineering` divider, for the lead
    claim the step's spine rests on and which reaches the room through nothing today.
    ```
    id: 'deck-step2-engineering-vibe', kind: 'statement', ns: 'step2',
    eyebrow: 'engineering.title',
    title: 'deck.engineering.vibe.title', note: 'deck.engineering.vibe.note'
    ```
    EN title `Vibe coding works <hi>for about an hour</hi>` / NL `Vibe coding werkt <hi>ongeveer een
    uur</hi>`. EN note `Then the fixes break each other and you are steering a system nobody has
    read.` / NL `Daarna breken de fixes elkaar en stuur je een systeem dat niemand gelezen heeft.`

## Do not

- **Do not put prose between the `<hr>` and the `TaskCard`.** The card's description carries the
  setting; a paragraph there says it twice.
- **Do not name `-Pgraded` in `Quality gates`.** `workshop` owns that profile and this section sits
  four units ahead of it on purpose. Item 3's "whatever analysis your build has wired in" is the
  honest wording.
- **Do not teach hooks here.** `setup` is the only place in the step that teaches them; item 3's one
  clause is the whole budget. No `<pre>`, no second `settings.json` block.
- **Do not add a second card**, and specifically not one asking the student to add a `Stop` hook to
  this repository's `.claude/settings.json`: it would fire on every stop across the whole kata.
- **Do not add a quiz.** The unit carries a card and the step's two quizzes sit on the units with
  nothing to do. The one question worth asking (where a coverage-floor rule goes) risks pre-empting
  the capstone's own discovery of the proxy trap, which already has three homes.
- **Do not add a decay curve under `lead.2` or a spread drawing under the vocabulary section.** The
  first is the paragraph in pictures with an invented measurement; the second borrows `ScriptRuns`'s
  argument, which `step2/CLAUDE.md` forbids.
- **Do not change the `WhereWouldItGo` card.** It names no disagreement and gives no count on
  purpose, and its fifth move carries the "accept nothing" warning twice because a package rename
  would break `mvn verify -Pgraded`, the `challenge` tests and the native-image flag.

---

# 4. `steering` — Steering

**Effort: heavy**

## Do

1. **Fix the `git worktree add` commands.** Verified failing on git 2.50.1:
   `fatal: invalid reference: feat/statement`, exit 128. `git worktree add <path> <branch>` checks
   out an *existing* branch, and these are branches the student is starting. The `<pre>` under
   `A worktree each` becomes:

   ```
   git worktree add -b feat/statement ../kata-statement
   git worktree add -b feat/native ../kata-native
   ```

   `WorktreeEach` names the same two folders and branches as literals, so the figure needs no change
   and the `SkillTree` rule (drawing and `<pre>` name the same thing) still holds. `<pre>` blocks
   carry no `data-i18n` key, so there is no Dutch sibling. **The identical defect is in `goals`; see
   that unit's item 2. Both must land.**

2. **Rewrite `steering.stop-at-the-gap.3` to drop the count and name the part.** "Three parts, and
   the third is the one that matters" is the count announcement `lesson-writing` bans, and the
   ordinal is wrong against the `<pre>` above it, whose order is *stop*, *write it into `gaps.md`*,
   *ask me*. EN:

   > Stopping is the part that matters. Writing the gap down is bookkeeping. An agent that logs its
   > assumptions in a file and then implements them anyway has told you what it guessed, at the
   > bottom of a diff, after the work is built on top of it.

   NL:

   > Stoppen is wat telt. De leemte opschrijven is boekhouding. Een agent die zijn aannames in een
   > bestand noteert en ze daarna toch implementeert, heeft je verteld wat hij gokte, onderaan een
   > diff, nadat het werk erbovenop gebouwd is.

3. **Rewrite `steering.stop-at-the-gap.2` so it names the file and links `setup`.** The section tells
   the student to make the rule standing and never names `CLAUDE.md`, which `step2/CLAUDE.md` claims
   it does; this is also the seam where the unit changes register from in-flight moves to a file you
   edit once. The English also routes the claim through a noun phrase the Dutch does not need. EN:

   > You cannot fix that per request, because you do not know where the gaps are. If you did, they
   > would not be gaps. So make the rule standing, in the
   > <a href="/steps/step2/setup">CLAUDE.md the setup lesson gave you</a>, where it arrives before
   > your first message.

   NL:

   > Zo'n fout los je niet per vraag op, want je weet niet waar de leemtes zitten. Wist je dat wel,
   > dan waren het er geen. Maak de regel dus staand, in de
   > <a href="/steps/step2/setup">CLAUDE.md die de setup-unit je gaf</a>, waar hij binnenkomt voor
   > jouw eerste bericht.

4. **Land `interrupt-or-go-back.2` on the window rather than on the bill.** Step 1 already priced
   this: `harness.caching.1` says a re-sent prefix is billed at roughly a tenth, so the money is the
   weaker of the two costs, and `step2/CLAUDE.md` gives this section the window argument. Replace the
   whole key, EN:

   > It also keeps everything. The file it should not have opened is still sitting in the window, in
   > full. Your correction sits underneath it. From here on the agent carries the wrong turn and the
   > fix together, and re-sends both on every turn for the rest of the session
   > <svg data-icon="coin"></svg> The cache makes that cheap. It does not make it small: every turn
   > you have left is read against a file you did not want opened.

   NL: keep the existing opening and end on `De cache maakt dat goedkoop. Ze maakt het niet kleiner:
   elke beurt die je nog hebt, wordt gelezen tegen een bestand dat je niet open wilde hebben.`

5. **Split `steering.going-nowhere.1`.** Seven sentences, 100 words, and the section's entire
   mechanism arrives in the sixth, inside a comma chain. `.1` becomes:

   > Another kind of run does not go the wrong way. The agent is in the right file, the test fails
   > the way it failed before, and the fix it just wrote undoes the one before it. It says it sees
   > the problem now. It said that last time.

   New `.2`:

   > Nothing here is wrong enough to correct, so you sit through four more rounds. Every failed
   > attempt is still in the window. On that file they are the strongest pattern the model has to go
   > on, so it writes another one. The loop is in the window.

   Renumber the existing `.2` to `.3` in the HTML and both bundles.

6. **Unchain the second sentence of what is now `going-nowhere.3`.** EN:

   > Carry across the one thing the round produced, usually the error and the approach that does not
   > work. That is the seam <a href="/steps/step1/session">step 1's unit on the session</a> tells you
   > to pick yourself.

   NL:

   > Neem het ene ding mee dat de ronde wel opleverde, meestal de foutmelding en de aanpak die niet
   > werkt. Dat is de naad die <a href="/steps/step1/session">de unit over de sessie in stap 1</a> je
   > zelf laat kiezen.

7. **Wrap the English body of the `data-audience="self"` aside in `<p>`.** `steering.html:55` holds
   bare text while its Dutch value wraps in `<p>`, so the one aside renders with different block
   spacing per language. It is the single markup-shape mismatch in the whole course. HTML only.

8. **Add a `TaskCard` under an `<hr>` and `<h2 data-i18n="ui:quiz.title">Test yourself</h2>`.** 1,098
   words, the second-longest unit in the course, and every move in it is physical. New component
   `front/src/steps/step2/SteerARun.tsx`:

   ```
   block="steer-a-run"  namespace="step2"  prefix="steer"
   storageKey="kata.step2.steer"  className="my-8"
   moves: ['escape', 'queue', 'gap', 'worktree']
   ```

   Locale keys (`en`; Dutch in the same patch):
   - `steer.title`: `Steer a run`
   - `steer.description`: `Four moves against <code>kata/step2/java</code>. Nothing is graded and
     nothing is submitted; the tick is a bookmark.`
   - `steer.todo`: `Mark this task done` / `steer.done`: `Done`
   - `steer.escape.label`: `Ask for something under-specified and press Escape while it is still
     thinking. Run <code>git status</code>. Nothing should have moved.`
   - `steer.queue.label`: `Ask again, and this time type the clarification while it works. Note
     which turn it lands on.`
   - `steer.gap.label`: `Put the <code>## Gaps</code> rule in
     <code>kata/step2/java/CLAUDE.md</code>, then ask for the late fee to be returned in euros.
     <code>LateFeePolicy</code> works in cents and names no currency. Check that it stops and writes
     the question down instead of picking one.`
   - `steer.worktree.label`: `Run <code>git worktree add -b feat/scratch ../kata-scratch</code>,
     start a second agent in it, then <code>git worktree remove ../kata-scratch</code>. Two folders,
     one history.`

   Dutch: `steer.title` `Stuur een run bij`; `steer.description` `Vier zetten tegen
   <code>kata/step2/java</code>. Er wordt niets beoordeeld en niets verstuurd; het vinkje is een
   bladwijzer.`; `steer.todo` `Markeer deze taak als klaar`; `steer.done` `Klaar`;
   `steer.escape.label` `Vraag iets dat te vaag is en druk op Escape terwijl hij nog aan het denken
   is. Draai <code>git status</code>. Er zou niets verplaatst mogen zijn.`; `steer.queue.label`
   `Vraag het opnieuw, en typ deze keer de verduidelijking terwijl hij werkt. Let op bij welke beurt
   ze binnenkomt.`; `steer.gap.label` `Zet de <code>## Gaps</code>-regel in
   <code>kata/step2/java/CLAUDE.md</code> en vraag daarna om de boete in euro's terug te geven.
   <code>LateFeePolicy</code> rekent in centen en noemt nergens een munt. Kijk of hij stopt en de
   vraag opschrijft in plaats van er een te kiezen.`; `steer.worktree.label` `Draai <code>git
   worktree add -b feat/scratch ../kata-scratch</code>, start er een tweede agent in, en daarna
   <code>git worktree remove ../kata-scratch</code>. Twee mappen, één historiek.`

   The `gap` move is the one worth having: it is the only place in the course where a student sees an
   agent decline to guess, and the gap is real in the shipped code (`LateFeePolicy` computes in cents
   and names no currency anywhere).

   Manifest: `figure: <SteerARun />` on the `steering` entry in `index.tsx`.

9. **Add `steeringQuiz`, three questions, to the manifest for `quiz.ts` and `index.tsx`.** Because
   the unit now also carries a card, the HTML writes the `<h2 data-i18n="ui:quiz.title">` above the
   card and `showsExerciseHeading` gives `QuizPanel` `heading={false}`. Situations, not definitions,
   one per section that has something to get wrong. `A worktree each` gets none: its argument is a
   cost, not a choice.

   **Q1 `wrong-turn-nothing-written`** — "Your request was ambiguous and the agent has opened the
   wrong file. It has not written anything yet. What do you do?"
   - `rewind` **(correct)**: "Go back to your request, rewrite it, and let it start again."
   - `correct-it`: "Send a correction naming the right file."
   - `clear`: "Escape, then clear the session and start over."
   - `queue`: "Queue the correction so it picks it up on the next turn."
   Explanation: "The work so far is worth nothing, and a rewind takes the wrong turn out of the
   window instead of leaving it there. A correction works too, and the wrong file stays in the window
   for the rest of the session."

   **Q2 `fifth-fix-same-shape`** — "Four fixes in, the test fails the way it failed the first time,
   and the fix it just wrote undoes the one before it. What now?"
   - `clear-and-carry` **(correct)**: "Stop, clear, and start again carrying the error and the
     approach that failed."
   - `rewind`: "Go back to the message that started the run and rewrite it."
   - `tell-it`: "Tell it the last four attempts did not work and to try something else."
   - `paste-output`: "Paste the failing test output in and let it keep going."
   Explanation: "The message was fine, so rewinding puts you back into the same run. The four failed
   attempts are the strongest pattern in the window, and only a clear removes them."

   **Q3 `logged-and-carried-on`** — "Your standing rule tells the agent to write undecided things
   into `gaps.md`. It comes back with a diff and three entries in `gaps.md`. What went wrong?"
   - `should-have-stopped` **(correct)**: "It should have stopped and asked. The diff is built on the
     guesses."
   - `nothing-wrong`: "Nothing. It followed the rule and you have the list."
   - `wrong-place`: "The rule belongs in the prompt rather than in `CLAUDE.md`."
   - `too-many`: "Three entries is too many to review in one pass."
   Explanation: "Logging a gap and then building on it tells you what it guessed underneath a diff
   that already depends on the guess. Stopping is the part of the rule that matters."

   Dutch for every question, choice and explanation in the same patch.

10. **Manifest (deck): three slides plus one string fix.**
    - Fix `deck.steering.divider.2`. It reads "Rewinding beats correcting", a ranking the unit
      explicitly refuses (`interrupt-or-go-back.4` is a two-way rule) and which the deck's own next
      note contradicts. EN `A correction adds to the pile. <hi>A rewind takes it out.</hi>` / NL
      `Een correctie stapelt op. <hi>Een rewind haalt het eruit.</hi>`
    - New `deck-step2-steering-midflight`, a `statement` with points, placed **before**
      `deck-step2-steering-rewind` so the deck stops opening on the unit's second section.
      EN title `Escape stops it <hi>where it stands</hi>` / NL `Escape stopt het <hi>waar het
      staat</hi>`; points EN `Still thinking: <mute>nothing on disk</mute>` /
      `Already writing: <mute>now you pick what to revert</mute>` /
      `Something small: <hi>type it while it works</hi>`; NL `Nog aan het denken: <mute>niets op
      schijf</mute>` / `Al aan het schrijven: <mute>nu kies je wat terug moet</mute>` / `Iets kleins:
      <hi>typ het terwijl het werkt</hi>`.
    - New `deck-step2-steering-worktree`, a `figure` slide carrying `<WorktreeEach />` at
      `scale: 1.4` (640x262 with a note; `TwoWindows` at 640x306 rides 1.3). EN title `A worktree
      each: <hi>neither can reach the other's files</hi>` / NL `Elk een worktree: <hi>geen van beide
      komt bij de bestanden van de ander</hi>`; EN note `Two agents are two contexts and two bills,
      and two diffs you did not write.` / NL `Twee agents zijn twee contexten en twee rekeningen, en
      twee diffs die je niet zelf schreef.` Check the note clears the two folder labels before
      committing to the scale.
      This also corrects a **false statement in `deck.tsx`'s docblock**: it says one worktree per
      agent "reaches the board through `parallel`". The word `worktree` appears in no `deck.*` key in
      either language and `AgentsAtOnce` does not draw one. Rewrite that paragraph. `LoopInWindow`'s
      recorded reason for staying off the board is sound and stays.
    - New `deck-step2-steering-gaps`, a `statement` with points, after `deck-step2-steering-nowhere`.
      EN title `An agent will not tell you <hi>it guessed</hi>` / NL `Een agent zegt je niet dat hij
      <hi>gegokt heeft</hi>`; points EN `Never assume` / `Write the gap down` / `<hi>Stop.</hi>
      <mute>The first two are bookkeeping</mute>`; NL `Ga nergens vanuit` / `Schrijf de leemte op` /
      `<hi>Stop.</hi> <mute>De eerste twee zijn boekhouding</mute>`.

11. **Dutch terminology: "gap" is currently rendered "opening" throughout this section**
    (`stop-at-the-gap.heading` and `.1`–`.4`, and `workshop.flag.statement.help`). In Dutch
    "opening" is an aperture or a vacancy, not a hole in what was decided. Use **leemte** everywhere:
    "Laat hem stoppen bij een leemte", "je weet niet waar de leemtes zitten", "De leemte opschrijven
    is boekhouding". The `workshop` agent handles its own key; see that unit.
    Also in this unit's Dutch: `steering.worktree-each.3` says **agenten** twice where the whole
    course says **agents**. Normalise to `agents`.

12. **Flag only, no edit:** `mid-flight.1` names Escape, the only keystroke in the course, and step 2
    carries no `data-assistant`, so a Copilot CLI reader is shown it too. `step2/CLAUDE.md` justifies
    it on the grounds that stopping is Escape in both assistants, but `copilot-specific.md` does not
    carry that fact and says outright that "step 2 has not been adapted". Verify it against the
    Copilot CLI reference and add one line to `copilot-specific.md`'s verified list. Do **not**
    introduce the step's first `data-assistant` pair without the owner: that is a step-wide decision.

## Do not

- **Do not rename the `Interrupt, or go back` heading.** "Correct, or go back" is arguably more
  accurate (neither of the section's two moves is an interrupt), but the rename costs five key
  renames per language, and `step2/CLAUDE.md` names the section by title in three places. Not worth
  the churn.
- **Do not fold the `data-audience="self"` aside into the task card.** It is one of the step's two
  self asides and is recorded as such; that is why the card in item 8 has four moves and not five.
  The aside owns the rewind experiment.
- **Do not give `WorktreeEach` an "uncommitted work" chip.** It would introduce a claim the prose
  never makes, and the figure's documented job is the folder line.
- **Do not draw the three-lanes-over-an-hour figure** for `worktree-each.1`'s overlapping-waits
  claim. `LoopsPerHour` owns the hour cut into change/wait/look and `AgentsAtOnce` owns how many
  agents are running; that drawing would collapse into one of them.
- **Do not grow `Mid-flight` a window argument.** What an interrupt *leaves behind* is the section
  after it.
- **Do not add a second description of `/clear`.** `step1/session` owns it.
- **Do not add a paragraph about what agents are bad at.** When not to use an agent at all is absent
  from the course on purpose.
- **Do not write a lead paragraph.** The unit opens on its first `<h2>` deliberately, and the two
  leads it was drafted with were cut for restating the section below them.

---

# 5. `patterns` — Solving repeating patterns

**Effort: heavy**

## Do

1. **Rewrite `patterns.skill-iteration.2`.** Three problems in one key: "That is where iteration
   comes in" announces the heading two lines above it and adds nothing (Dutch has the same as a
   calque, "Daar komt iteratie binnen"); the paragraph runs six sentences; and the section's central
   demonstration is a diff between two eleven-line `<pre>` blocks that nothing asks the reader to
   make. Replace the whole key, EN:

   > The answers do get better. They also come back slightly off, and you find yourself repairing the
   > same kind of sentence every time. Fix the output, by hand or with the agent, then hand it both
   > versions and ask what the skill failed to say. Paste them into the prompt, or point it at the
   > <code>git diff</code>. Write the answer back into the skill <svg data-icon="pattern"></svg> Do
   > that a few rounds and it starts sounding like you. Here is that writing skill one pass later,
   > one rule longer.

   NL:

   > De antwoorden worden er echt beter van. Ze komen er ook net naast uit, en je zit elke keer
   > hetzelfde soort zin recht te trekken. Verbeter de output, met de hand of met je agent, geef hem
   > daarna allebei de versies en vraag wat de skill niet gezegd heeft. Plak ze in je prompt, of wijs
   > hem de <code>git diff</code> aan. Schrijf dat antwoord terug in de skill
   > <svg data-icon="pattern"></svg> Doe dat een paar rondes en ze begint als jou te klinken. Hier
   > staat diezelfde schrijfskill een pass later, één regel langer.

   "one rule longer" is what turns the second block from a repeat into a diff. It names the size of
   the difference without naming the rule, so the diff stays the reader's to make.

2. **Rewrite `patterns.scripts.1`'s closing sentence.** "Think of things like…" is filler and the
   section's opening paragraph currently ends on its weakest line. Move the examples inside the
   criterion they illustrate. EN, the whole key:

   > You may not write much Bash or Python. Your agent does. So when a repetition has an expected end
   > result, scaffolding a domain or cleaning a database before a demo, a script is usually worth
   > writing <svg data-icon="gem"></svg> Then add a skill that calls it, or the agent will never know
   > it is there.

   NL:

   > Veel Bash of Python schrijf je zelf misschien niet. Je agent wel. Dus zodra een herhaling een
   > verwacht eindresultaat heeft, een domein scaffolden of een database opkuisen voor een demo, is
   > een script meestal de moeite <svg data-icon="gem"></svg> Voeg er dan een skill aan toe die het
   > aanroept, anders weet je agent nooit dat het bestaat.

   Keep "scaffolding a domain": it is the one thing the cut `quality` unit's scaffolding idea
   survives in.

3. **Drop the `<svg data-icon="coin">` from `patterns.skill-iteration.3`.** Step 0's legend defines
   the coin as "A cost-saving measure: the same result for fewer tokens", and the sentence it sits on
   ("The corrections stop coming back") makes a quality claim, not a cost claim. The other coin in
   the unit, on `scripts.2`, sits on a sentence that literally says "it spends neither tokens nor
   time", which is what the icon is for. Both languages.

4. **Add a clause naming `setup` to `patterns.skill-iteration.1`, above the first `<pre>`.** This
   unit names no other unit at all, and the frontmatter block below is the second time a student
   meets a `description:` field with nobody explaining why it is there. End `.1` with:

   > …and the correction you were tired of typing, in the file shape
   > <a href="/steps/step2/setup">the setup unit</a> drew.

   NL: `…en de correctie die je beu was te typen, in de bestandsvorm die
   <a href="/steps/step2/setup">de setup-unit</a> tekende.`

   **Placement matters more than wording: it must sit above the first `<pre>`.** This is audit item
   39; item 5 in `setup` above is the same seam from the other side, and the two are one change.

5. **Label `ScriptRuns`'s bars so the figure measures something.** Today each card holds three bars
   whose widths are hand-picked constants with no axis, no unit and no label, so a reader cannot say
   what varies between the three prose runs: three grey bars of arbitrary length against three teal
   bars of arbitrary length is a texture. Name the three bars as the parts of the job, labelled once
   on the leftmost card of each row: for a database reset, `dropped`, `seeded`, `checked`. Then the
   top row reads "the same three steps came out a different size every time" and the bottom row reads
   "identical". Component change in `ScriptRuns.tsx` plus three keys per language
   (`script-runs.dropped`, `script-runs.seeded`, `script-runs.checked` — NL `gedropt`, `geseed`,
   `gecheckt`).
   **Constraints that survive:** the cards stay the same size in both rows; the row-level labelling
   rule is unchanged (only the second row carries a row name, and what each row *produces* stays on
   the right rather than in prose); do not touch the clock or step-size vocabulary that `LoopsPerHour`
   and `IterationPaths` own.

6. **Add a `TaskCard`** under the usual `<hr>` and `<h2 data-i18n="ui:quiz.title">`, with no prose
   between the rule and the card. New component
   `front/src/steps/step2/SameEveryRun.tsx`:

   ```
   block="same-every-run"  namespace="step2"  prefix="script"
   storageKey="kata.step2.script"  className="my-8"
   moves: ['name', 'ask', 'twice', 'skill', 'find']
   ```

   - `script.title`: `Write it once`
   - `script.description`: `Something you have typed at an agent more than twice this week. If
     nothing comes to mind, use the start-and-check for this step's own project.`
   - `script.todo`: `Mark this task done` / `script.done`: `Done`
   - `script.name.label`: `Name the repetition. <code>mvn spring-boot:run</code> in
     <code>kata/step2/java</code>, then <code>curl -s localhost:8080/api/loans/statement/STUDENT |
     jq</code> to see it answer, is one you have already typed.`
   - `script.ask.label`: `Ask the agent for the script. It picks the language, not you.`
   - `script.twice.label`: `Run it twice and compare the two outputs. Anything that differs is
     interpretation still left in the script.`
   - `script.skill.label`: `Write a skill beside it whose description says when to call it, in one
     line.`
   - `script.find.label`: `Open a new session and ask for the job in your own words. If the agent
     finds the script, the description is doing its work.`

   Dutch alongside. The `twice` move is `ScriptRuns`'s claim made testable; the `find` move is the
   only place in the course where a skill's `description` is tested rather than described. It asks
   for no tests (so it does not spend `workshop.flag.coverage.help`'s testing skill) and touches no
   package (so it cannot break `mvn verify -Pgraded`).

   Manifest: `figure: <SameEveryRun />` on the `patterns` entry in `index.tsx`.

7. **Add `patternsQuiz`, three questions**, to the manifest for `quiz.ts` and `index.tsx`. Because
   the unit also gains the card, the HTML writes the `ui:quiz.title` heading over the card and
   `showsExerciseHeading` gives `QuizPanel` `heading={false}`.

   **`third-correction`** — "You have told the agent three times this week to stop putting a summary
   paragraph at the end of every file it touches. It fixes it each time, and the next file comes back
   with one. What has actually gone wrong?"
   - `no-home` **(correct)**: "The correction only lives in messages you retype, so nothing carries
     it to the next session."
   - `context-full`: "The window filled up, so the instruction was pushed out partway through."
   - `wrong-model`: "The tier is too small to hold an instruction that specific."
   - `prompt-wording`: "The instruction is worded loosely, so it has to be phrased more precisely."
   Explanation: "A correction you repeat is knowledge with no home yet. Written into a skill it is a
   file in the repository, so the next session starts with it."

   **`skill-still-off`** — "Your commit-message skill works. The messages still come back wrong in the
   same small way, and you have just repaired one by hand. What do you do with the repair?"
   - `both-versions` **(correct)**: "Give the agent its version and yours, and ask what the skill
     failed to say."
   - `longer-prompt`: "Put the missing rule in your next prompt, where the agent is sure to read it."
   - `stricter-description`: "Tighten the skill's description so it fires more often."
   - `rewrite-skill`: "Rewrite the skill from scratch, since a rule producing the same mistake is the
     wrong rule."
   Explanation: "The repair is the rule the skill is missing, and the agent can name it from the two
   versions. Writing that answer back is the pass that makes the skill sound like you."

   **`script-or-skill`** — "Before every demo you clean the database, seed three members and start the
   service, and you explain the steps to the agent each time. It gets there, and each run leaves the
   data slightly different. What is worth writing?"
   - `script-and-skill` **(correct)**: "A script that does the steps, and a skill that calls it so the
     agent knows it exists."
   - `longer-skill`: "A skill with the steps written out, since the agent can run the commands."
   - `claude-md`: "A line in `CLAUDE.md` naming the steps, so it is read on every turn."
   - `plan-mode`: "A plan, so the agent works the steps out once and follows its own plan each run."
   Explanation: "An expected end result with no interpretation in between is a script. The skill
   beside it is only what makes the agent aware the script is there."

   **No `hook` distractor anywhere in this quiz.** `step2/CLAUDE.md` records that the word "hook"
   appears nowhere in this unit and that `setup` lost its forward pointer because of it; a distractor
   would put the word back.

   Dutch for every string.

8. **Three Dutch fixes.**
   - `patterns.scripts.2`: the Dutch drops the reason clause ("dus kost het hem geen tokens en geen
     tijd meer") and the reason is the argument. → `…dus kost het hem geen tokens en geen tijd meer
     aan iets waar jij het antwoord al van kent <svg data-icon="coin"></svg>`
   - `patterns.title`: EN promises an answer ("Solving repeating patterns"), NL names only the
     phenomenon. → `Terugkerende patronen oplossen`.
   - `patterns.lead.1`: says "kennis zonder vaste plek" while `deck.patterns.third-time.title` says
     "kennis zonder thuis", so page and projector word the same line two ways. → `Het is kennis
     zonder thuis.`

9. **Manifest (deck): retitle the third-time slide onto the section it stands in front of.**
   `deck.patterns.third-time.title` duplicates `deck.patterns.divider.1` one slide later, leaving
   `Skill iteration` with nothing said about it.
   ```
   id: 'deck-step2-patterns-iteration'   // was deck-step2-patterns-third-time
   title: 'deck.patterns.iteration.title', note: 'deck.patterns.iteration.note'
   ```
   EN title `The first skill feels like magic. <hi>The second pass is the work.</hi>` / NL `De eerste
   skill voelt als magie. <hi>De tweede ronde is het werk.</hi>`; EN note `Repair the output, then ask
   the agent what the skill failed to say.` / NL `Herstel de output en vraag de agent dan wat de skill
   niet gezegd heeft.` Retire `deck.patterns.third-time.title` from both bundles (`removeEn` /
   `removeNl`). `deck.patterns.divider.1` keeps the lead's claim.

## Do not

- **Do not draw the crossover figure** (retyping a correction every turn against writing it once into
  a skill, cumulative cost on the y axis). `step2/CLAUDE.md` records that the cost-of-a-line argument
  has exactly two sites, `setup.claude-md.2` and `setup.skills.5`, and closes with "Do not open a
  third site." That figure is the third site, drawn.
- **Do not cut or replace `ScriptRuns`.** It is on a deck slide and the teal row carries sameness at a
  glance. Item 5 is the fix.
- **Do not rewrite the two `<pre>` blocks separately.** They are one skill twice and differ by exactly
  one rule. Change one and the other moves with it.
- **Do not restore the cut "Around the script" section** or the cut lead paragraph listing this repo's
  four skills, and do not name `scripts/new-step.sh` or any other script this repository never wrote:
  `audit.md` carried that as a defect and the section was rewritten to be general.
- **Do not mention hooks anywhere in this unit.** If a paragraph about hooks is ever written back in,
  `setup`'s forward pointer has to be restored with it.
- **Do not "fix" the modal in "You may not write much Bash or Python."** The `lesson-writing` rule
  banning modals is stale; `may` appears eight times across steps 1 and 2.

---

# 6. `workflows` — Workflows

**Effort: light-moderate.** All sentence-level. No new instruments, no new figures, no restructure.

## Do

1. **`workflows.lead.2`: drop the monotone re-reading claim.** It promises "the less you have to
   re-read when it arrives", which the unit's own closing measurement contradicts:
   `WorkflowWeights` gives naive `after: 250` and audit-driven `after: 250`, deliberately, and
   `pick-per-task.2` says so in words 900 words later. EN:

   > What follows runs from cheapest to most deliberate. The further down you go, the more you settle
   > before any code exists, and the more of the run is already decided by the time it starts. That
   > trade is the decision you are actually making.

   NL:

   > Wat hierna komt loopt van goedkoop naar bewust. Hoe verder je gaat, hoe meer je uitklaart voordat
   > er code bestaat, en hoe meer er al beslist is tegen dat de run begint. Die afweging is de
   > beslissing die je eigenlijk maakt.

2. **`workflows.audit-driven.4`: cut the "one sitting" sentence.** The unit points at this
   repository's own `audit.md` two paragraphs earlier, and that file is 8,225 words, so a student who
   follows the pointer finds the claim falsified by the exemplar. It also introduces a report/plan
   distinction in its last four words and buries the paragraph's best line. EN:

   > Then work the table. Worst row first, fix it, run the audit again. The solid row with nothing
   > beside it counts as much as the rest, because that is one thing you can stop carrying around.

   NL: drop `En het hele document blijft kort genoeg om in één keer te lezen, en dat is het verschil
   tussen een rapport en een plan.`

3. **Two figure descriptions that contradict the paragraph above them.** These are SVG `<title>`
   strings, so they are the entire figure for a screen-reader user.
   - `flow-naive.description` currently says "Nothing comes back either way", while the section
     directly above it says "skim what comes back… paste the error and ask for a fix". EN: `You ask,
     the agent writes the code inside the project. Nothing is settled between you before it does.` /
     NL: `Jij vraagt, de agent schrijft de code in het project. Er wordt niets uitgeklaard voordat dat
     gebeurt.`
   - `flow-plan.description` has to make the teal read as *timing*, since a two-way exchange is
     something naive already has. EN: `You and the agent settle the task between you first, and only
     then does the agent write the code inside the project.` / NL: `Jij en de agent klaren de taak
     eerst samen uit, en pas daarna schrijft de agent de code in het project.`

4. **`workflow-weights.description`: "Naive is almost all reading" is not what the drawing shows**
   (naive's read segment is 250 of 500, and 230 of the rest is the agent running). EN: `Four bars of
   the same length, one per workflow, each cut into what you decide first, what the agent runs, and
   what you read afterwards. Naive decides almost nothing up front and leaves a long read;
   spec-driven is the reverse.` / NL: `…Naïef beslist vooraf bijna niets en laat veel te lezen over;
   spec-gedreven is net omgekeerd.`

5. **`workflows.naive.1`: point at `engineering` instead of redefining vibe coding.** The unit's own
   rule for plan mode and reflection is point-do-not-repeat; naive currently gets `engineering`'s
   definition near verbatim, three units later, with the link as an afterthought. EN:

   > Almost everybody starts here. It is the vibe coding the
   > <a href="/steps/step2/engineering">engineering unit</a> argued against: ask, skim, run, and paste
   > the error when it breaks. Nothing is written down, because nothing was decided.

   NL:

   > Bijna iedereen begint hier. Het is de vibe coding waar
   > <a href="/steps/step2/engineering">de unit over vakmanschap</a> tegen waarschuwde: vragen,
   > scannen, draaien, en de foutmelding erin plakken als het stukgaat. Er staat niets opgeschreven,
   > want er is niets beslist.

   (The Dutch link text says **vakmanschap**, matching the Dutch sidebar label; see `engineering`
   item 1.)

6. **`workflows.naive.2`: say "nudging is not restructuring" in the prose.** `step2/CLAUDE.md` records
   that claim as the one that "survives everything else in the step" and as what `Plan/naive` at the
   end of `WorkflowTimeline` turns on, and the prose currently states it obliquely ("This is
   deliberately not structuring or restructuring") with a vague referent. Keep it in this paragraph.
   EN, closing the key:

   > It still has a place, and the place is real. A site for the baker on the corner. A trial version
   > built to find out whether the idea holds up at all. A one-line change in an otherwise careful
   > project: a padding, a log line, a column that should have been nullable. None of those decides
   > anything. Nudging is not restructuring.

   NL: `…Geen daarvan beslist iets. Een duwtje geven is niet herstructureren.`
   Ripple: `quiz.small-change-no-spec.nudge`'s Dutch currently tracks the old prose ("Dit is geen
   structureren of herstructureren"); move it with this.

7. **`workflows.pick-per-task.4`: cut the sentence that announces the drawing.** "A project evolution
   timeline might look like this" announces the figure (banned by `lesson-writing`), hedges with
   "might", and collides by accident with the step's first unit, whose rendered title is
   **Project evolution**. Delete it; the paragraph opens cold on the claim:

   > Every move up the list is paid for by the one before it, and the way back down is per row rather
   > than per project. What that last pass changes goes into the specs, or they quietly stop
   > describing the thing you shipped.

   NL: drop `Een tijdlijn van hoe een project evolueert ziet er ongeveer zo uit.` and start the key at
   `Elke stap omhoog in het lijstje…`.

8. **Break two of the unit's seven tricolons, and cut one truism.**
   - `plan-based.2` drops to two interview questions, which is what
     `quiz.plan-mode-interview.explanation` already quotes back, and fixes the tense drift in item 11:
     > The plan is not the part worth having. The agent interviews you
     > <svg data-icon="pattern"></svg> and its questions are the ones you skipped: which tier gets a
     > grace period, what happens when the list comes back empty. You answer them before a line
     > exists, which is what you would have done designing it yourself. The workflow puts you back in
     > the design.
   - `pick-per-task.3` drops to two questions and loses "No method is perfect", which is a truism
     hedging the sharp claim beside it:
     > So read the task before you pick. How long does this code live, and how much of the diff will
     > you have to read yourself. Then take the cheapest workflow that answers those. Deciding between
     > them is the engineering.

   Dutch counterparts for both.

9. **Four wording repairs.**
   - `spec-driven.1`, last sentence: "The out-of-scope **half**" arrives after a list of four things a
     spec holds. → "The out-of-scope part earns its place fastest, because that is where an agent
     invents things." NL: `Het stuk dat buiten scope valt verdient zichzelf het snelst terug.`
   - `spec-driven.3`, first sentence: "You do not write these cold either" has no antecedent for
     "either" and the Dutch is already clearer ("van nul"). → "You do not write them from scratch."
     NL unchanged.
   - `audit-driven.1`: "The agent reads the files under scrutiny" is documentation voice and hides who
     chose the files. → "The agent reads the files you point it at and writes `audit.md`: is this
     complete, is it secure, does it follow the style the repository already uses." NL: `De agent
     leest de bestanden die jij aanwijst en schrijft <code>audit.md</code>: …`
   - `naive.3`: "ask it to write the specs the code implies" uses the unit's term for a spec two
     sections before `Spec-driven` defines it. → "…the specs the code implies, one per feature, and
     read them for what it got wrong." NL: `…de specs die de code impliceert, één per feature, en lees
     ze na op wat hij fout heeft.`

10. **`plan-based.1`: "One step up costs one keystroke" asserts a count a student will test.** Plan
    mode is entered by cycling with Shift+Tab, usually two presses, and Copilot CLI differs again. →
    "One step up costs a mode switch." Everything after it is unchanged. NL: `Eén stap omhoog kost je
    een moduswissel.`

11. **Add the closing clause into `enablement`** (audit item 40), placed **before**
    `WorkflowTimeline` so the drawing still closes the unit. One clause on the end of
    `pick-per-task.3`: EN `…Deciding between them is the engineering, and how fast you find out
    whether the answer holds is <a href="/steps/step2/enablement">the next unit's</a>.` / NL `…Kiezen
    tussen die vier is het engineeringwerk, en hoe snel je te weten komt of het antwoord klopt is voor
    <a href="/steps/step2/enablement">de volgende unit</a>.`

12. **Three Dutch fixes and one English tense fix.**
    - `workflows.plan-based.2`: EN says "The workflow **put** you back in the design" (past) inside a
      present-tense paragraph, and disagrees with its own quiz explanation. → "puts". Folded into item
      8; the Dutch is already right.
    - `nl` `workflows.pick-per-task.2`: `meeschuiven` is separable and the verb is clause-final here.
      → `en wat meeschuift is of er iets op schijf achterblijft`.
    - `nl` `workflows.pick-per-task.1`: `hen` is the personal pronoun for people; the antecedent is
      four workflows. → `En een audit is over elk daarvan de moeite waard.`
    - `nl` deck: `deck.workflows.naive.title` renders "Naïef:" while `plan-based`, `spec-driven` and
      `audit-driven` stay English on the same deck, against unit headings and
      `workflow-timeline` labels that all say "Plan-gedreven", "Spec-gedreven", "Audit-gedreven".
      Translate all four.

13. **Three stale docblocks** (repo hygiene, not student-facing):
    - `FlowDiagram.tsx:17-18` says `audit-driven` "runs to five boxes and four arrows"; the registry
      gives six nodes and five links. → six and five.
    - `WorkflowWeights.tsx:15` says "the caption admits it here the same way"; there is no
      `<figcaption>` and `step2/CLAUDE.md` records that the caption was cut on purpose. Rewrite the
      sentence.
    - `WorkflowTimeline.tsx:84` and `step2/CLAUDE.md` both put the right-hand riser on "the last
      `Plan-based`"; the last card renders `workflow-timeline.plan-fixes.name` = **"Plan/naive"**.
      Name the card by what it says, in both files.

## Do not

- **Do not add a `TaskCard`**, including the "audit `kata/step2/java`" one. `step2/CLAUDE.md` records
  that there is nothing a card could ask for here that would not be a smaller version of the
  workshop, and the unit already carries a quiz, seven figures and 949 words. If the decision is ever
  revisited, update the recorded reason first.
- **Do not touch the quiz.** The three questions are situations rather than definitions, each
  distractor is disqualified by something in the stem, and spec-driven is deliberately unasked. The
  only change is the Dutch of `small-change-no-spec.nudge` following item 6.
- **Do not cut `flow-naive`.** It is `naive.1` redrawn and no prose reads it, but a set of four read
  down the unit needs a zero row. Cut it only by cutting all four.
- **Do not add an eighth figure.** Once `lead.2` stops overstating, prose and `WorkflowWeights` agree
  and the one gap closes with a sentence.
- **Do not add a second `<h2>` before `pick-per-task.4`.** The section coheres, and the rename touches
  both bundles for a small gain.
- **Do not break the other five tricolons.** `naive.2`'s three places is recorded as deliberate,
  `audit-driven.1`'s three map onto a quiz distractor, and `audit-driven.2`'s four are the figure's
  four columns.
- **Do not give `FlowDiagram` order markers** just to label plan-based's arrows `1` and `2`. Item 3's
  label fix removes the false claim on its own.
- **Do not touch the `FlowDiagram` set's colour rule.** A two-way link is teal, a one-way link is
  muted, a loop's return path is teal, and a change to one of the four is a change to all four.

---

# 7. `enablement` — What it asks of you

**Effort: moderate**

## Do

1. **Retitle the unit.** "Enablement" is the one abstract corporate noun in a step whose other titles
   are "Project evolution", "Steering", "Workflows", "Spending tokens"; it appears in neither
   language's prose, the course never defines it, and it is the only thing binding three sections
   that do not build on one another. The step has its own precedent: `Goal-oriented` became `Spending
   tokens` while the id, URL and namespace prefix stayed `goals`.
   - `en.json` `enablement.title`: `What it asks of you`
   - `nl.json` `enablement.title`: `Wat het van jou vraagt`

   **The unit id, the URL, the namespace prefix, the deck eyebrow key and every inbound reference stay
   exactly as they are.** The new title reads back onto all three sections: your check has to keep up,
   "What is asked of you moves up a level" is already sentence 2 of `t-shaped`, and `where-day-goes`
   is what it asks of your week.

2. **Repair the arithmetic in `enablement.where-day-goes.1`.** The section's premise is "count where
   the hours actually go" and three claims cover more than one hundred percent of a week, two of them
   "most". Drop the first "most" and let the last one stand. Sentence 2 becomes:

   > They go on driving the system end to end and reading whether it did what you wanted.

   NL: `Ze gaan op aan het systeem end to end aansturen en lezen of het deed wat je wilde.` The rest
   of the key is unchanged.

3. **Reopen `enablement.where-day-goes.2` on the hours.** "This is the other half" and "The other part
   is thinking" are the same framing device doing two different jobs in consecutive paragraphs. EN:

   > The hours that are left go on thinking. Go through the implementation details, argue both sides
   > of them, and come out with a design decision you could defend. A decision you did not make is one
   > the agent made for you.

   NL: `De uren die overblijven gaan op aan denkwerk. Loop de implementatiedetails door, weeg de voors
   en tegens tegen elkaar af, en kom eruit met een ontwerpbeslissing die je kan verdedigen. Een
   beslissing die jij niet neemt, heeft de agent voor je genomen.`

   Keep it about **deciding**. If it drifts toward structure it becomes `engineering` a second time.

4. **Add the closing seam into `parallel`** (audit rows 19/20 assign the fix here; row 19's wording is
   stale because `parallel` has since landed between this unit and `goals`). One clause on the end of
   `where-day-goes.2`, after the closing sentence, so the paragraph still ends on its best line:
   append a short sentence rather than folding into it. EN: `How many of those runs you have going at
   once is <a href="/steps/step2/parallel">the next unit's</a> question.` / NL: `Hoeveel van die runs
   je tegelijk laat lopen, is de vraag van <a href="/steps/step2/parallel">de volgende unit</a>.`

5. **Add a `TaskCard`** under an `<hr>` and `<h2 data-i18n="ui:quiz.title">Test yourself</h2>`, after
   the last paragraph, so the prose still closes on "A decision you did not make is one the agent made
   for you". The unit's strongest instruction is "count where the hours actually go" and the reader is
   never asked to count anything. New component `front/src/steps/step2/CountTheDay.tsx`:

   ```
   block="count-the-day"  namespace="step2"  prefix="count"
   storageKey="kata.step2.count"  className="my-8"
   moves: ['time', 'fit', 'tally', 'cut']
   ```

   - `count.title`: `Count your own hour`
   - `count.description`: `This one runs against whatever you are actually working on, not against the
     kata. Nothing is graded and nothing is submitted; the tick is a bookmark.`
   - `count.todo`: `Mark this task done` / `count.done`: `Done`
   - `count.time.label`: `Time one loop on your own project: from asking for a change to seeing it in
     the running app.`
   - `count.fit.label`: `Work out how many of those fit in an hour, and put your number beside the
     eleven in the drawing above.`
   - `count.tally.label`: `Take one working day and split the hours four ways: deciding, driving,
     reading, and typing code yourself.`
   - `count.cut.label`: `Name the single slowest thing in that loop, and say what it would cost to
     remove it.`

   Dutch alongside. **The card names no project and no command**, which is what keeps `run-own-machine`'s
   recorded "names no project" decision intact. The `fit` move sends the reader back into
   `LoopsPerHour` with a number of their own, which turns that figure from a picture into a
   measurement.

   Manifest: `figure: <CountTheDay />` on the `enablement` entry in `index.tsx`.

6. **Two `LoopsPerHour` legend keys.**
   - `loops-per-hour.wait` is a leftover from a framing that is no longer in the unit: when the bands
     read "Deploying to find out" against "With the shortcuts in", "you wait to get there" had a
     *there*. The bands now read "Not running it locally" against "Running it locally". → EN `you wait
     for it` / NL `je wacht erop`.
   - `loops-per-hour.turns` says "{{turns}} goes" while `loops-per-hour.description` says *turn* and
     the Dutch says "rondes" in both. → EN `{{turns}} turns`.

7. **`enablement.run-own-machine.1`, sentence 3: rewrite off the Dutch.** EN repeats the verb ("Then
   you look at what your users look at") where NL draws the distinction ("wat je gebruikers **zien**").

   > Then you look at what your users see, and a wrong column shows up as a wrong column instead of a
   > field name in a response body.

   Dutch unchanged.

8. **`enablement.t-shaped.1`, sentence 1: hedge with frequency, not with a modal.** "it gets better at
   it with every release" is an absolute claim about a trend and is the sentence that will read as
   dated first. → "An agent implements faster than you do, and it has been getting better at it with
   every release." NL: `Een agent implementeert sneller dan jij, en is daar bij elke release beter in
   geworden.`

9. **Manifest (deck): two changes.**
   - Repoint `deck.enablement.divider.2` at the third section. Today two of three points come from
     section 1, and `where-day-goes` reaches the room through nothing at all: guided mode drops it
     (it has no figure) and the deck omits it. EN `Most of the week goes on <hi>reading what came
     back</hi>` / NL `Het grootste deel van de week gaat op aan <hi>lezen wat er terugkwam</hi>`.
   - New `deck-step2-enablement-day`, a `statement`, last in the unit's run. EN title `A decision you
     did not make is <hi>one the agent made for you</hi>` / NL `Een beslissing die jij niet nam, is er
     <hi>een die de agent voor je nam</hi>`; EN note `You are not typing the code. Most of the week is
     driving it and reading what came back.` / NL `Je typt de code niet meer. Het grootste deel van de
     week is sturen en lezen wat terugkwam.` Keep it about deciding.

10. **Locale hygiene (audit row 50):** `nl.json` carries a stray blank line between
    `enablement.t-shaped.1` and `enablement.where-day-goes.heading`, and no separator where
    `enablement`'s block runs into `parallel`'s. Note it in your patch for the merge agent; do not
    hand-edit the file.

## Do not

- **Do not write a lead paragraph.** The two it was drafted with restated `run-own-machine`'s premise
  and were cut for that. Every section opens cold on its own claim.
- **Do not name a project, a command or an example case in `run-own-machine`.** The three sentences of
  two-terminal setup (`mvn spring-boot:run`, `npm run dev`, the Vite proxy) and the seeding argument
  were cut on purpose, and a student reading against their own stack had to translate every line.
- **Do not restore the cut hinge paragraph** between the two `run-own-machine` paragraphs, and do not
  bolt "make it as small as you can" or "every loop is another chance to steer" onto the opener as an
  extra sentence.
- **Do not restore `reachable-one-step` or `fitness-tests` or `code-got-cheap`.** All three are
  recorded as cut with their arguments rehoused.
- **Do not split the seven-sentence `t-shaped` paragraph.** The example sits mid-paragraph precisely
  because the opening claim and the closing pair are both load bearing.
- **Do not touch `SkillShape`.** It is the weakest figure on the page by the repo's own bar and it
  stays: a T with a shortened stem argues "get shallower", and no sentence in the unit says the stem
  does not move.
- **Do not add a third figure** for `where-day-goes`. Any honest drawing of it is a band cut into
  parts, and `LoopsPerHour` owns the band and the clock in this very unit.
- **Do not add the one-question `t-shape-depth` quiz.** The card in item 5 is the higher-value
  instrument and a single-question quiz is a weak one.
- **Do not add a second example to `t-shaped`.** One case (the migration that drops a column two other
  services still read) is the budget; a second turns the paragraph into a list and the closing pair
  stops landing.

---

# 8. `parallel` — Parallel workflows

**Effort: moderate**

## Do

1. **`AgentsAtOnce.tsx`: set row `many`'s four agents to `state: 'background'`.** The component's own
   docblock states the grammar (a dash is what is running without anyone; solid-but-muted means
   somebody is watching, just not you), and row two currently draws four agents solid while the prose
   directly above says "Nobody reads four runs as they happen, so you stop steering and start
   receiving". So the one thing the figure most wants to say is the one thing its ink does not.
   With the change: teal is you, solid is somebody, dashed is nobody, rows two and three stay a pair
   and get sharper, and row two is still distinguishable from row four (which has a teal agent).
   Update both docblocks and `agents-at-once.description` in both bundles: "Then four agents on four
   thin dashed ones, none of them teal." / NL equivalent.
   **Row three's sub-agents stay muted-but-solid.** The "do not dash them" instruction in
   `step2/CLAUDE.md` is about row three, where dashing would be false.

2. **Cut the first sentence of `parallel.many-agents-once.3`** (the warning aside). It opens on the
   hazard the paragraph directly above it has already raised and already answered ("or they edit the
   same files and you find out at merge time"), and `steering.worktree-each.2` states it in full, so
   the step's only amber callout spends itself on a solved problem. The aside becomes, EN:

   > The other ceiling is you. Four streams of output in an afternoon is more than anyone reads
   > carefully, and the tenth diff gets less of you than the first did. Attention is what you run out
   > of, well before the tokens.

   NL:

   > Het andere plafond ben jij. Vier stromen output op één namiddag is meer dan iemand aandachtig
   > leest, en de tiende diff krijgt minder van je dan de eerste kreeg. Aandacht raakt op, ruim voor
   > je tokens.

   **Also update `step2/CLAUDE.md`** in the same change: the paragraph beginning "The warning aside
   closes `Many agents at once`" says the aside carries **two** costs no other unit states. It should
   say it carries the one cost no other unit states, your attention degrading rather than running
   short, and that the collision cost is `steering`'s and is already in the paragraph above.

3. **Rewrite `parallel.one-front-rest.1` in one edit.** Three defects in one key.
   - "the way the first section describes" is a positional reference, which is the failure mode
     `step2/CLAUDE.md` records for `workshop.lead.1`; insert a section above `One agent at a time` and
     it points at the wrong arrangement with nothing failing.
   - "checking what it lands" uses `land` transitively, the only place in the curriculum that does;
     `step1/session`, `step1/tools`, `step3/impostor` and this unit's own figure note all use it
     intransitively.
   - "it is the most of the day most people get" has two "most"s in seven words, is not idiomatic, and
     makes a different claim from `deck.parallel.divider.3` ("Most days: one in front, the rest
     behind") and from `step2/CLAUDE.md`, both of which make a claim about your *days*.

   EN: `The one in front you work with the way you would if it were the only one, answering it and
   reading the diff it hands back.` … `Middling control, and it is what most days actually look like.`
   NL: `Met die ene vooraan werk je zoals je zou werken als hij de enige was: je antwoordt hem en je
   leest de diff die hij teruggeeft.` … `Controle ergens in het midden, en zo ziet een doorsnee dag er
   gewoon uit.`

4. **`parallel.one-agent-time.1`: soften "The steering unit is all about that window."** `steering`
   has five sections and two of them are not the window, and this unit's next section sends the reader
   to one of those two for worktrees. EN: `<a href="/steps/step2/steering">The steering unit</a> is
   what you do inside that window.` / NL: `<a href="/steps/step2/steering">De unit over bijsturen</a>
   gaat over wat je in dat venster doet.`

5. **`parallel.one-agent-time.1`: rewrite the English off the Dutch.** EN "you answer a wrong turn
   while it is still a sentence" elides the unit of cost that the Dutch names ("terwijl die nog één
   zin kost"), and cost is what this unit measures everything in. → `you answer a wrong turn while it
   still costs one sentence to answer`. Dutch unchanged.

6. **Add `parallelQuiz`, three questions**, to the manifest for `quiz.ts` and `index.tsx`.
   `step2/CLAUDE.md` says in as many words that the absence here is an open row rather than a reason,
   and `audit.md` item 15 tracks it. `One in front, the rest behind` gets none: it is the answer the
   other three are measured against. No task card, so the HTML carries no `ui:quiz.title` heading and
   `QuizPanel` writes its own, the way `workflows` and `goals` do.

   **Q1 `deep-not-wide`** — "You have the afternoon and one thing on your mind: what the entities in a
   new feature are, and which of them owns the late-fee rule. You have not settled any of it yet."
   - `one-agent` **(correct)**: "One agent and one conversation, and you read every step of it."
   - `four-drafts`: "Four agents, each drafting a different model, and you keep the best one."
   - `front-and-behind`: "One agent in front on the model, three behind writing the tests for it."
   - `orchestrated`: "One agent that decomposes the design and briefs sub-agents on the pieces."
   Explanation: "The decision is the work here, and you make it in a conversation you read every step
   of. Nothing behind you can start on a model that is not settled yet."

   **Q2 `green-and-unread`** — "Four agents have run all afternoon on four modules, each in its own
   worktree. All four builds are green. You have four diffs open and you have read two of them
   properly."
   - `reading-at-the-end` **(correct)**: "The steering you skipped at the start arrived at the end as
     reading, and the fourth diff gets less of you than the first did."
   - `builds-are-the-check`: "Nothing has gone wrong: the builds are the check, and all four passed."
   - `window-too-small`: "The agents ran out of context, so the later work is worse than the early
     work."
   - `shared-branch`: "They should have shared one branch, so the changes merged as they were
     written."
   Explanation: "Four at once trades steering for receiving. A green build says the checks passed, not
   that the code is the code you wanted, and attention runs out well before the tokens do."

   **Q3 `who-holds-the-wires`** — "Instead of opening five sessions yourself, you brief one agent and
   it hands five pieces to sub-agents."
   - `coordination-moves` **(correct)**: "The coordination moves into the agent, and five runs come
     back to you as one thing to read."
   - `inherits-context`: "The sub-agents carry on from your session, so each needs less briefing than
     a fresh one would."
   - `answer-each`: "You get more control per piece, because you can answer each sub-agent while it
     works."
   - `runs-in-turn`: "The pieces run one after another rather than at once, so none of them can
     collide."
   Explanation: "A sub-agent starts on an empty context and its brief is all it gets. What the
   arrangement changes is where the coordination sits, in the agent rather than in your head."

   **No distractor claiming an orchestrator prevents two agents colliding.** `step2/CLAUDE.md` records
   that claim as cut-but-believed, and a distractor the repo half-endorses is a bad distractor.

   Dutch for every string.

7. **Three Dutch grammar errors and one term drift.**
   - `parallel.orchestrator.1`: "sub-agents die hij zelf **briefst**" is not a form of `briefen` in
     any person. → `…aan sub-agents die hij zelf brieft`.
   - `parallel.one-front-rest.2`: "bevechten het model" says you fight *against* the model. → `Jij en
     de agent vooraan leggen de namen vast, vechten het model uit, schrijven de spec.`
   - `parallel.one-front-rest.2`: "brengt een andere de documentatie bij" says an agent is *teaching*
     the documentation. → `…en werkt een andere de documentatie bij.`
   - `agents-at-once.mixed.note`: NL says "één nu, drie als ze klaar zijn" while the paragraph above
     uses "rapporteren" in both languages. → `drie als ze rapporteren`.

8. **Manifest (deck): a fourth divider point for the orchestrator.** Four sections, two content
   slides, and the one section whose placement `step2/CLAUDE.md` calls load bearing has no words on
   the board. `deck.parallel.divider.4` EN `An orchestrator moves the coordination <hi>into the
   agent</hi>` / NL `Een orchestrator verplaatst de coördinatie <hi>naar de agent</hi>`. A point
   rather than a slide, because the section is one paragraph and `step1/harness` owns the mechanism.

## Do not

- **Do not add a `split-the-workshop` `TaskCard`.** `engineering` already closes on a sorting card two
  units earlier, so a second sorting card is a repeated shape rather than a second kind of work, and
  it front-runs the capstone's planning by a unit.
- **Do not add a second figure** for the "tenth diff gets a worse read" claim. It would be an invented
  curve with no measurement behind it, and `LoopsPerHour` already owns the hour as a band.
- **Do not flatten the unit's four three-part lists.** Every one of them is a list of concrete things
  rather than adjectives, which is not the tricolon the brief bans.
- **Do not write a lead paragraph.** The unit opens on its first `<h2>` on `enablement`'s and
  `steering`'s precedent.
- **Do not move `The orchestrator`.** It sits directly after `Many agents at once` because it is that
  section answered, and its opening sentence ("a better-managed version of that") stops pointing at
  anything if it moves.
- **Do not let `The orchestrator` grow a sentence about who writes the brief.** `step1/model`'s closing
  section owns that, and `step1/harness` owns the whole coordinator mechanism.
- **Do not restore the aside's collision half, or the cut second paragraph of `orchestrator.1`.** The
  ceiling that section names is your attention; a paragraph saying an orchestrator lifts the collision
  half argues with the strongest claim in the unit while leaving the other half standing.
- **Do not move `AgentsAtOnce` up.** It names all four arrangements, so under the first heading it
  would put three labels in front of a reader who has not been given them.
- **Do not change the sub-agent count in row three.**

---

# 9. `goals` — Spending tokens

**Effort: heavy**

## Do

1. **`goals.whole-job.1`: change "a hundred percent" to "ninety percent".** The unit's model of a
   well-shaped whole-job goal is currently a goal an agent satisfies by writing assertion-free tests,
   which is the exact thing the capstone one unit later exists to demolish (`workshop.honest.1`: "a
   hundred percent of the lines can run under tests that assert nothing"), and the graded profile
   agrees with the workshop (`COVERAGE_FLOOR = 90.0`). The unit's other two numbers are already
   right: `check-exit.1`'s ninety percent and `whole-job.2`'s ten. EN:

   > It is "get this module to ninety percent line coverage and leave <code>mvn test</code> green",
   > and then you walk away from it.

   NL: `Het is "breng deze module op negentig procent line coverage en laat <code>mvn test</code>
   groen achter", en daarna loop je ervan weg.`

   **Do not argue the trap here.** It has three homes and needs no fourth.

2. **Fix the `git worktree` command in the `<pre>` under `Give it its own worktree`.**
   `git worktree add ../kata-complexity goal/complexity` requires `goal/complexity` to already
   resolve; it does not, and git only DWIMs a missing branch when the commit-ish is omitted or matches
   exactly one remote. Verified: `fatal: invalid reference: goal/complexity`, exit 128, git 2.50.1. →

   ```
   git worktree add -b goal/complexity ../kata-complexity
   ```

   No locale key moves; a `<pre>` carries none. **`steering` carries the same defect twice; both must
   land in one pass or the course teaches a broken command in two places.**

3. **Fix the arithmetic under `Most of it is waiting`.** Forty passes at two minutes is eighty
   minutes, and `whole-job.3` two paragraphs up sets the run at four hours, so the heading is false on
   the unit's own numbers and the closing claim has nothing under it. Keep forty (it rhymes with the
   forty classes in `own-worktree.1`) and raise the build. `goals.most-waiting.1` EN:

   > Look at where those four hours actually go. The agent writes a class in seconds.
   > <code>mvn verify</code> then takes four minutes, and the pass after it takes four more, and forty
   > passes later the build has had nearly three hours of it. Tokens are burning the whole time, but
   > the clock is being run by your own test suite.

   NL:

   > Kijk eens waar die vier uur eigenlijk naartoe gaan. De agent schrijft een klasse in seconden.
   > <code>mvn verify</code> doet er daarna vier minuten over, en de pass erna nog eens vier, en
   > veertig passes later heeft de build er bijna drie uur van gehad. De tokens branden ondertussen
   > door, maar de klok wordt gezet door je eigen testsuite.

   **And move the figure label with it**, or a reader who checks the drawing has been given the
   evidence against the sentence: `en` `goal-gate.wait` = `four minutes, forty times`; `nl` =
   `vier minuten, veertig keer`.

4. **Fix the quiz answer that contradicts its own scenario.** `quiz.report-on-a-wish` hands over "make
   this code cleaner and keep the tests green", and the correct choice reads "There was no command
   that answers yes or no". But "keep the tests green" *is* such a command, and the student has just
   read `check-exit.1` saying so, so a sharp reader eliminates the correct answer on good grounds.
   The distinction actually being tested is `goal-oriented.2`'s: the scenario has an edge but no exit.
   `en` `quiz.report-on-a-wish.no-command`:

   > Nothing could say the work was done. Keeping the tests green says what must not change, not when
   > to stop, so the run had nothing to finish against and stopped when it felt finished.

   `nl`:

   > Niets kon zeggen dat het werk af was. De tests groen houden zegt wat er niet mag veranderen, niet
   > wanneer je stopt, dus de run had niets om naartoe te werken en stopte toen hij zich klaar voelde.

   The explanation needs no change.

5. **`goals.research-frontier-model.1`: stop contradicting step 1.** It opens "There is a tier above
   the three", and `step1/model`'s `model.cost.2` deliberately ends "It is a ceiling rather than a
   fourth tier", with an HTML comment recording the placement. EN:

   > Above the three sits the frontier model. <a href="/steps/step1/model">The model unit</a> called it
   > a ceiling rather than a fourth tier and stopped there, because what it is good at is a question
   > about work rather than about windows. Broad research is the answer.

   NL:

   > Boven de drie staat het frontiermodel. <a href="/steps/step1/model">De unit over het model</a>
   > noemde het een plafond in plaats van een vierde tier en liet het daarbij, want waar het goed in
   > is, is een vraag over werk en niet over vensters. Breed onderzoek is het antwoord.

6. **Rewrite `goals.lead.2` so it is true for both readers and carries step 1's hedge.** Two problems:
   it attributes the rolling window to step 1's shared section, but `model.five-hour-window` is
   `data-assistant="claude"` on every element (a Copilot seat meters premium requests over a calendar
   month, so there is no rolling window to place), and step 2 carries no `data-assistant` anywhere;
   and "five hours on most plans" is flatter than step 1's deliberately hedged "usually a sliding
   window of five hours". EN:

   > When matters because of how you are billed.
   > <a href="/steps/step1/model">Step 1's unit on the model</a> set out the two arrangements: a key
   > bills you per token, a subscription comes off a plan you paid for before you started. Where a
   > plan meters you in a rolling window, usually about five hours, what you leave unused is not
   > carried anywhere. Forty minutes of window is not something you can save for tomorrow, so the
   > thing to do with a window is spend it out. The limit that actually binds sits behind it, weekly
   > or monthly depending on the plan, and that is the one to keep an eye on.

   NL:

   > Dat wanneer hangt samen met hoe er afgerekend wordt. <a href="/steps/step1/model">De unit over
   > het model in stap 1</a> zette de twee afspraken naast elkaar: een key rekent per token af, een
   > abonnement gaat van een plan af dat je al betaald had. Waar een plan je in een rollend venster
   > meet, meestal een uur of vijf, wordt wat je niet opgebruikt nergens naartoe meegenomen. Veertig
   > minuten venster spaar je niet op voor morgen, dus wat je met een venster doet, is het opmaken. De
   > limiet die echt knelt zit erachter, per week of per maand naargelang het plan, en dat is degene
   > om in de gaten te houden.

   The "weekly or monthly" hedge stays: weekly is step 1's Claude ceiling, monthly is the Copilot
   allowance, and the sentence covers both honestly. This also absorbs the stacked-apposition stumble
   in the old sentence.

7. **Add one sentence to `goals.lead.1` so the survey is set up before `Ultracode` starts it.** The
   unit was widened from one argument to four and the lead was not widened with it: five sections
   develop the goal-shaped run in a continuous line, then `Ultracode` starts a second subject with no
   signal, and `read-came-back.1` opens "Every move in this unit", which lands as a summary of a
   survey the reader was never given. Replace `lead.1`'s closing sentence. EN:

   > What decides it is what you get for the spend, and when you spend it. The moves below are the
   > expensive ones worth making: a goal you walk away from, a fleet of agents, a long turn on the
   > frontier model, a design pass.

   NL:

   > Wat de doorslag geeft is wat je ervoor terugkrijgt, en wanneer je het uitgeeft. De zetten
   > hieronder zijn de dure die het waard zijn: een doel waar je van wegloopt, een vloot agents, een
   > lange beurt op het frontiermodel, een designpass.

   No count is announced, and the window stays `lead.2`'s and is not restated.

8. **Rename the `Read what came back` heading to a plain label.** It is a claim-shaped heading whose
   paragraph never makes the claim: sentence 1 is a premise, sentence 2 recaps, sentence 3 is the one
   real claim, sentence 4 hands off. EN heading `What you are left with`, NL `Wat je overhoudt`. Slug
   rule: rename `goals.read-came-back.heading` / `.1` to `goals.left-with.heading` / `.1` in the HTML
   and in `nl.json`. **Prose unchanged.** `workshop.lead.1` points at the unit by name and not at a
   key, so the pair with `workshop` survives untouched; nothing else in the tree references this key.
   Note for whoever updates `step2/CLAUDE.md`: the sentence recording that `goals` closes by naming
   `workshop` now points at `goals.left-with.1`.

9. **`goals.own-worktree.1`: fix the bare link word.** "the second checkout <a>steering</a> gives
   every agent" parses on first pass as the compound "checkout steering"; every other cross-unit link
   in step 2 is a noun phrase, and the Dutch does not have the problem because the relative pronoun
   holds the clause open. EN:

   > Ask for the goal to be pursued in a git worktree instead, the second checkout
   > <a href="/steps/step2/steering">the steering unit</a> gives every agent.

   Dutch unchanged.

10. **`goals.whole-job.3`: break the adjective triple.** "For a job that is mechanical, wide and
    measurable" is the brief's named tell and it buries `measurable`, which is the unit's whole
    argument, as one property among three. EN: `For a job that is mechanical and wide, and that a
    command can measure, that is a good trade.` / NL: `Voor een klus die mechanisch en breed is, en
    die een commando kan meten, is dat een goede ruil.`

11. **Two Dutch repairs.**
    - `goals.research-frontier-model.2`: "Jij bent **de vertering** in het midden." In Dutch
      *vertering* is either literal digestion or a bar bill; as a metaphor for a person it reads as
      neither. Recast: `Jij bent wat er in het midden verteerd wordt` or drop the metaphor.
    - `goals.lead.2` uses **afspraken** to refer back to step 1's **regelingen**
      (`model.api-vs-subscription.1`). Use `regelingen` so the back-reference reads as one thing.

12. **Manifest (deck): four changes.**
    - Move `deck-step2-goals-window` to immediately after the divider, restoring the unit's own
      reading order. `WindowSpend` sits under the unit's lead and is the one figure in the step read
      forwards; on the board it currently lands third, after `deck.goals.divider.3` has already stated
      its conclusion.
    - New `deck-step2-goals-gate`, a `figure` slide with `<GoalGate />` at `scale: 1.7` (640x204, the
      shortest drawing in the step; `WindowSpend` at 640x228 rides 1.7), after
      `deck-step2-goals-shape`. EN title `The only way out is <hi>the check saying yes</hi>` / NL `De
      enige uitgang is <hi>de check die ja zegt</hi>`. The title must not become a third statement of
      "name the command": `deck.goals.divider.2` and `deck.goals.shape.3` already carry that.
    - **Convert** `deck-step2-goals-fleet` from `statement` to `figure` carrying `<ReadEachTime />` at
      `scale: 1.4` (640x288 with a note). Keep both its strings unchanged: `deck.goals.fleet.title`
      ("Five agents read the project five times") is already the drawing's whole argument, so the
      board is currently paraphrasing a drawing the students have. Costs no extra slide.
    - New `deck-step2-goals-relay`, a `figure` slide with `<ModelRelay />` at `scale: 1.5` (640x246,
      no note; `LoopsPerHour` at 640x250 rides 1.5), after the fleet slide. EN title `Three tiers, and
      <hi>you are the digestion</hi> between them` / NL `Drie lagen, en <hi>jij bent de vertering</hi>
      ertussen`. That names what the figure's two teal arrows are labelled with rather than what the
      tiers are like, which keeps it off `ModelTiers`'s ground. **The slide does not carry the date**;
      the `<small>` line belongs to the unit page and the tutor says it out loud.
    - Add `deck.goals.divider.4` so the four sections still off the board are covered honestly: EN
      `Four hours you walk away from, <mute>in a worktree of its own</mute>` / NL `Vier uur waar je van
      wegloopt, <mute>in een eigen worktree</mute>`. `Design tools` stays off; it is deliberately the
      shortest section and what it adds is the timing, which `deck.goals.divider.3` already carries.

13. **Flag, do not edit: `Ultracode`.** `goals.ultracode.1` reads "Ask for ultracode and the harness
    stops working the task itself", which is written as a literal invocation. The word appears nowhere
    else in the repository outside this section and its figure docblocks, and nowhere in
    `copilot-specific.md`. A student who types it and gets an ordinary answer concludes the course is
    out of date. **Confirm the term against the current product before touching anything.** If it is a
    real trigger word, no edit. If it is the author's name for the behaviour, the sentence describes
    the capability instead and the heading becomes `A fleet of agents`:

    > Some harnesses will fan the work out for you instead of working the task themselves. The harness
    > writes a script that spreads agents across the work, runs them, and gathers up what comes back.

    Everything else in the section (the fan-out, the empty contexts, the bill) stands whatever the
    trigger is called.

## Do not

- **Do not add a fifth figure**, including a "what the four moves cost against what each buys"
  comparison on `WorkflowWeights`'s precedent. This is already the longest unit in the course with
  four figures, `WindowSpend` under the lead already fixes the timing all four share, and the
  comparison would need per-move cost numbers the unit deliberately does not have.
- **Do not add a `TaskCard`.** It would cost the unit its clean hand-off into `workshop`, which is
  where the student writes a real goal against a real build.
- **Do not take route (b) on the `Read what came back` heading** (replacing the recap sentence with a
  new claim). The obvious closers are all owned elsewhere: the proxy trap has three homes, reading as
  the bottleneck is `steering`'s, attention degrading is `parallel`'s aside, and merging in pieces is
  already `own-worktree.2`'s. The label rename in item 8 is the safe answer.
- **Do not break the other four tricolons.** `goal-oriented.2`'s three clauses map onto the three
  clauses of the `<pre>` under it, `ultracode.3`'s three map onto `ReadEachTime`'s three teal blocks,
  `design-tools.1`'s three are a literal description of a design pass, and `left-with.1`'s three
  clauses are the unit recapped.
- **Do not "fix" `WindowSpend`'s ten columns against `lead.1`'s "ten ordinary sessions".** The columns
  are not labelled as sessions and the ceiling reads as capacity over the whole window, so the drawing
  claims no ratio.
- **Do not add a question about the model relay to the quiz.** It has no wrong branch, on the same
  reasoning that leaves spec-driven out of the `workflows` quiz.
- **Do not name a flag, a menu or a script shape in `Ultracode`.** It is described at the level of
  what it does to your bill on purpose.
- **Do not lengthen `Design tools`.** It is the shortest of the four and what it adds is the timing.
- **Do not let `step1/model` grow a section about what the frontier tier is good at.** That is this
  section, and the two are a pair.

---

# 10. `workshop` — Workshop

**Effort: heavy**

## Do

1. **Fix the board's own two strings.** `workshop.panel.description` and `workshop.panel.wrong` are
   rendered on every visit to the page and are false about two of the five flags: only three come from
   the graded run, the fourth from the running service and the fifth from a native image's startup
   log, which nothing on the JVM prints at all. A student who curls the statement endpoint and pastes
   a typo is told to go and read a build output that will never contain that code.
   - `en` `workshop.panel.description`: `Paste each flag as your build, your endpoint or your native
     image hands it over. Checked here in the browser.`
   - `en` `workshop.panel.wrong`: `Not that one. Read the flag straight from the output it came in.`
   - `nl` `workshop.panel.description`: `Plak elke flag zodra je build, je endpoint of je native image
     hem teruggeeft. Hier in de browser gecontroleerd.`
   - `nl` `workshop.panel.wrong`: `Niet die. Lees de flag rechtstreeks uit de uitvoer waarin hij
     verscheen.`

2. **`workshop.goals.3`: the complexity ceiling is not in anybody's `CLAUDE.md`.** It is a constant in
   `FlagRevealIT` enforced by the `graded` profile, and the unit that actually hands it over is
   `goals` (`goals.whole-job.2`: "Hand over a ceiling: no method above a cyclomatic complexity of
   ten"). EN, replacing the clause:

   > The second is the complexity ceiling <a href="/steps/step2/goals">goals</a> told you to hand
   > over: no method may score above ten on cyclomatic complexity, so the late-fee method has to come
   > apart into pieces small enough to hold in your head.

   NL: `Het tweede is het complexiteitsplafond dat de <a href="/steps/step2/goals">goals-unit</a> je
   liet doorgeven: geen methode mag boven een cyclomatische complexiteit van tien uitkomen, dus de
   boetemethode moet uiteenvallen in stukken die klein genoeg zijn om in je hoofd te houden.`

3. **`workshop.goals.3` and `workshop.flag.coverage.hint`: the coverage exclusion list is short by
   two.** The JaCoCo report in the `graded` profile excludes four things, not two: `step2/web/**`,
   `step2/config/**`, `step2/aot/**` and `application/MemberStatements*`. The two missing exclusions
   are exactly the two classes the fourth and fifth flags ask the student to work on, so a student
   chasing the last percent writes tests for `MemberStatements` and sees the number refuse to move.
   EN:

   > The first goal is a coverage floor: the module has to reach ninety percent line coverage, with
   > the web and config layers left out, and the code the last two flags ask you to write left out
   > with them, which means writing the tests it never had.

   NL: `Het eerste doel is een coverage-ondergrens: de module moet negentig procent line coverage
   halen, op de web- en configlagen na, en op de code na die de laatste twee flags je laten schrijven,
   en dat betekent de tests schrijven die er nooit waren.` Carry the same correction into
   `workshop.flag.coverage.hint` in both languages.

4. **`workshop.honest.2`, first sentence: say that mutation testing is scoped to the domain.** PIT is
   configured with `targetClasses` and `targetTests` both set to
   `be.smartagents.kata.java.step2.domain.*`, while the coverage floor in the paragraph above is
   module-wide, and the page presents the two goals as one. EN: `The build checks that by mutation
   testing the domain.` / NL: `De build controleert dat met mutation testing op het domein.`

5. **`workshop.native.2`: name the unit instead of counting back to it.** "the long-running kind the
   last unit described" is the exact defect `step2/CLAUDE.md` records as already corrected once in
   `workshop.lead.1`, and it survives here in both languages. EN:

   > Do not one-shot it. A native build is the long-running kind
   > <a href="/steps/step2/goals">the goals unit</a> described, minutes each, which makes it the wrong
   > place to guess and retry.

   NL: `One-shot het niet. Een native build is het langlopende soort dat
   <a href="/steps/step2/goals">de goals-unit</a> beschreef, minuten per stuk, wat het de verkeerde
   plek maakt om te gokken en opnieuw te proberen.`

6. **`workshop.goals.2`: name `setup` and make it an instruction rather than a reminder.** "the setup
   the first units asked for" is a position, not a name, and it is also a back-reference to homework
   no unit sets: `setup` teaches `CLAUDE.md`, skills and hooks and never tells the student to create
   one for this repository. EN:

   > Before you hand anything over, do the setup <a href="/steps/step2/setup">the setup unit</a> asked
   > for. Put <code>mvn verify -Pgraded</code> in your <code>CLAUDE.md</code> as the command that
   > validates this work.

   NL: `Voor je iets doorgeeft, doe de setup die <a href="/steps/step2/setup">de setup-unit</a> vroeg.
   Zet <code>mvn verify -Pgraded</code> in je <code>CLAUDE.md</code> als het commando dat dit werk
   valideert.`
   Ripple: the Dutch of this key currently reads "Die ene regel is wat je **toelaat** de agent een doel
   te geven", a calque of "what allows you to". → `Door die ene regel kan je de agent een doel geven.`

7. **Turn the four `<code>`-wrapped unit names into links.** This is the only unit in step 2 that
   names sibling units without linking to them (`enablement`, `engineering`, `workflows`, `parallel`
   and `goals` carry eleven such links between them; `workshop.html` carries zero), and it is the page
   a student most wants to click back from, two hours into hardening a module. `<code>` in this course
   means a filename, a command or an identifier, so `<code>engineering</code>` reads as a file.
   - `lead.1`: `…the thing the <a href="/steps/step2/engineering">engineering</a> and
     <a href="/steps/step2/goals">goals</a> units argued you should always be able to name: a goal a
     build can answer yes or no to.`
   - `collect.2`: `…the honest move is the one the <a href="/steps/step2/goals">goals</a> unit
     named: …`
   Same substitution in the Dutch of both keys. The words themselves do not change.

8. **Move the Maven-project sentence out of `lead.2` and into `goals.1`.** `lead.2` is describing the
   module and what is wrong with it, and "Every command on this page runs from that folder, because
   each step of this kata is its own Maven project" interrupts it with logistics, between "a late-fee
   rule at the middle of it" and "It compiles and it passes its one shipped test". The `<pre>` two
   paragraphs later already opens with `cd kata/step2/java`. Cut it from `lead.2` and open `goals.1`
   with it. EN `goals.1`:

   > Every command on this page runs from <code>kata/step2/java</code>, because each step of this kata
   > is its own Maven project. The goals live behind a Maven profile there, off by default so the
   > normal build stays green. Turn it on and it measures the module against all three at once.

   NL `goals.1`: `Elk commando op deze pagina draai je vanuit <code>kata/step2/java</code>, want elke
   stap van deze kata is zijn eigen Maven-project. De doelen zitten daar achter een Maven-profiel,
   standaard uit zodat de gewone build groen blijft. Zet je het aan, dan meet het de module in één
   keer tegen alle drie.`

9. **`workshop.collect.1`, third sentence: "The flags are English text either way" attaches to the
   wrong thing.** The sentence before it is about the backend being down, so "either way" reads as "up
   or down"; what it means is the repo-wide policy that the words a student types as an answer stay
   English in every language. EN: `The flags are English whichever language you are reading in, like
   every answer this course asks you to type.` / NL: `De flags zijn Engels in welke taal je dit ook
   leest, zoals elk antwoord dat deze cursus je laat typen.`

10. **Size the job in `workshop.lead.3`.** The page is 2 to 4 hours of real work and nothing on it says
    so, or says that the five flags are not one sitting; a student can open the native section at the
    end of an evening and find out the flag needed a second build. The course sizes work well
    elsewhere (`evolution`'s fifteen-minute clock). Append to EN:

    > Hand it to your agent as three outcomes, not a list of edits. Then let the build decide. Set
    > aside an afternoon for it: the first three flags come out of one hardening pass, and the fourth
    > and the fifth are separate jobs with their own builds.

    NL: `Geef het aan je agent als drie uitkomsten, niet als een lijst wijzigingen. Laat daarna de
    build beslissen. Maak er een namiddag voor vrij: de eerste drie flags komen uit één harding, en de
    vierde en de vijfde zijn aparte klussen met hun eigen builds.`

11. **Name the JDK the native build needs.** Nothing anywhere in 25 units states a prerequisite, and
    unit 22 asks for `mvn -Pnative native:compile`, which requires a GraalVM JDK. One clause on
    `workshop.native.1` (EN: `…and a native build needs a GraalVM JDK on your PATH.` / NL: `…en voor
    een native build heb je een GraalVM-JDK op je PATH nodig.`). This is a prerequisite, not a step of
    the exercise, so it gives nothing away.

12. **Add a closing paragraph naming step 3** (audit item 44). The capstone currently ends on a
    one-sentence self-only aside, with no wrap-up of the step and a whole step after it that it does
    not mention; this is the one boundary in the course that carries a change of subject rather than a
    change of topic. One paragraph, after `collect` and before the aside, EN:

    > That is the step. What is left is not about the agent at all: what changes around the work when
    > this is how the work gets done. <a href="/steps/step3/change">Step 3</a> is that.

    NL: `Dat is de stap. Wat overblijft gaat niet meer over de agent zelf: het gaat over wat er rond
    het werk verandert wanneer het werk zo tot stand komt. <a href="/steps/step3/change">Stap 3</a>
    gaat daarover.`

13. **Nine strings say "lesson" where the whole course says "unit."** All nine are inside
    `workshop.flag.*.help` ("the goals lesson", "the patterns lesson", "the engineering lesson", "the
    steering lesson"), while `workshop.lead.1` in the same unit says "the engineering and goals
    units". Fix the English to **unit** in all nine, then follow in the Dutch (which currently mirrors
    the drift with "-les" and adds two more of its own, in `workshop.native.1` and `.2`).

14. **Two words: "Claude" becomes "your agent."** `workshop.build.3` and `workshop.native.2` instruct
    every reader to "ask Claude in plan mode" and "have Claude work out", so a Copilot student is told
    to use a product they do not have, in the hardest exercise in the course. This is the cheapest
    down payment on audit item 24 and it introduces no `data-assistant`. Both languages. It also
    disposes of the Dutch calling Claude "het" in `workshop.flag.complexity.help` and
    `workshop.flag.honest.help` ("de check die **het** na elke klasse draait", "Blijft **het** tests
    schrijven"); rewrite those two to use the agent as the subject.

15. **Four more Dutch repairs.**
    - `workshop.flag.statement.help`: "bij de eerste opening" is the wrong word; *opening* in Dutch is
      an aperture or a vacancy. The referent is `steering`'s `gaps.md` section. → `De unit over
      bijsturen legt uit waarom je het stillegt bij de eerste leemte in de spec in plaats van het te
      laten gokken, en de unit over vakmanschap waarom het domein de boeteberekening al voor je doet.`
      (Uses **leemte**, matching the `steering` normalisation.)
    - `workshop.build.2`: "een lening die nog **in haar grace** zit". *Grace* alone is neither Dutch
      nor a term, and the same document translates it properly as **respijtperiode** elsewhere. Use
      respijtperiode.
    - The loans module has four Dutch names across the step (`where.description` "de loans-module",
      `workshop.lead.2` "een uitleendomein", `workshop.flag.coverage.hint` "de uitleenmodule",
      `deck.workshop.divider.1` "Een leendomein") against one English pair. Normalise on
      **loans-module** / **uitleendomein**, since the folder is literally `loans`.

16. **Manifest (deck): one new slide and one retitle.**
    - New `deck-step2-workshop-honest`, a `statement`, after `deck-step2-workshop-flags`. The
      workshop's best idea, mutation testing as the answer to the proxy trap, is nowhere on the board,
      and it is the payoff to `deck.engineering.gates.title`, which is. EN title `A hundred percent of
      the lines, <mute>under tests that assert nothing</mute>` / NL `Honderd procent van de regels,
      <mute>onder tests die niets asserten</mute>`; EN note `So the third goal is not coverage. It is
      whether the coverage is honest.` / NL `Het derde doel is dus geen dekking. Het is of de dekking
      eerlijk is.` This reveals nothing: `workshop.honest.1` and `.2` say it in plain prose on the
      page.
    - Retitle the closer. `deck.workshop.goal.title` ("Hand over a goal, not a keystroke") is the
      third slide in eight to state one claim, after `deck.goals.divider.1` and `deck.goals.shape.1`.
      → EN `<hi>The build</hi> decides, not the agent's word for it` / NL `<hi>De build</hi> beslist,
      niet het woord van de agent`. That is `workshop.goals.2`'s own sentence and it ends the step on
      the thing the step can grade.

17. **Flag, and verify before editing: the native-image wiring claim.** `workshop.native.1` says "none
    of that wiring is in the `pom.xml` for you" and `native.2` tells the student to work out "the
    GraalVM `native-maven-plugin`, the ahead-of-time step". But `spring-boot-starter-parent:4.1.0`
    ships its own `native` profile (lines 283-335) which adds the `process-aot` execution to
    `spring-boot-maven-plugin` (which step 2 declares) and supplies `native-maven-plugin`'s
    configuration, with the version managed by `spring-boot-dependencies`. So both halves the unit
    tells the student to work out may be inherited, and `mvn -Pnative native:compile` is Boot's own
    documented invocation for exactly this setup.
    **Do not edit the prose on this alone.** Run one native build in `kata/step2/java` first
    (`mvn -Pnative native:compile`, minutes, GraalVM JDK required) and see what actually happens. If
    the wiring is inherited, the honest correction is to say what is genuinely missing (what a native
    image drops) rather than to describe assembling the build. **The root `CLAUDE.md` prohibition
    stands either way: do not add a `native` profile to `kata/step2/java/pom.xml`, do not write the
    resource hint or a `RuntimeHintsRegistrar`, and do not spell out the fix in the prose.**

18. **Repo hygiene, adjacent and worth doing with this unit:** `kata/step2/java/pom.xml`'s `graded`
    profile declares `org.jacoco:jacoco-maven-plugin` with **no `<version>`**, unlike its neighbour
    `pitest-maven`. JaCoCo is in neither `spring-boot-dependencies:4.1.0`'s nor
    `spring-boot-starter-parent`'s managed plugin list, so Maven resolves the latest release and warns;
    the local `~/.m2` already holds 0.8.12, 0.8.13 and 0.8.15 side by side. Add `<jacoco.version>`
    beside `<pitest.version>` in the profile's `<properties>` and pin it. `mvn verify -Pgraded` is the
    command this whole unit hangs on.

## Do not

- **Do not add the `HonestCoverage` figure**, or any other drawing to this page. The capstone carries
  zero figures deliberately: the honest flag exists so the student *discovers* that assertion-free
  tests hold a coverage bar green, and a drawing measuring 100% line against 12% mutation above the
  board hands them the discovery before they run anything. **Record that decision in
  `step2/CLAUDE.md`** so the next reviewer does not re-derive it.
- **Do not add a quiz.** The unit's assessment is five hash-checked flags, three produced by a build
  that cannot be bluffed and one by mutation testing chosen precisely because it resists gaming. A
  multiple-choice question would grade whether the student read the page, in front of a board that
  grades whether they did the work.
- **Do not add a `TaskCard` or a `ConnectBoard`.** The whole page is one instruction set ending in the
  board, and the two ungraded moves it asks for (plan mode before the statement, plan mode before the
  native build) are the two places a card would be worse than a sentence.
- **Do not label the `mvn -Pnative native:compile` `<pre>` as "does not work yet".** `native.1` says
  the wiring is not there two sentences earlier and `native.2` says "plan it first" immediately above;
  labelling it would soften an exercise the step's notes want sharp.
- **Do not harden the loans module, do not implement `MemberStatements.forTier`, do not add a `native`
  profile, and do not write the resource hint.** Those are the exercise.
- **Do not name the three `setup` flag files** anywhere on this page or in a board hint.
- **Do not add a third native-build obstacle** in place of the one that went when the steps were split
  into their own projects. If the exercise wants one, it needs a new obstacle rather than a sentence.

---

# Cross-unit notes for the integrator

1. **Instrument count after this pass.** `evolution`, `steering`, `patterns`, `enablement`,
   `engineering` carry a `TaskCard`; `setup` and `workshop` carry a `FlagBoard`; `steering`,
   `patterns`, `parallel`, `workflows`, `goals` carry a quiz. Four units gain a card and three gain a
   quiz. `steering` and `patterns` gain both, so their HTML writes the `<h2 data-i18n="ui:quiz.title">`
   above the card and `showsExerciseHeading` gives `QuizPanel` `heading={false}` (the `step1/context`
   shape). `parallel` gains only a quiz, so its HTML writes no heading.
2. **New storage keys** all sit under `kata.step2.` so `shared/lib/reset.ts` finds them:
   `kata.step2.fifteen`, `kata.step2.steer`, `kata.step2.script`, `kata.step2.count`.
3. **New `TaskCard`s stay off the deck.** They write to localStorage and would tick the tutor's
   machine, which is the recorded rule that keeps `SetupFlags`, `Workshop` and `WhereWouldItGo` off.
4. **`step2/CLAUDE.md` needs four edits in this pass**, each named in its unit above: the "two costs"
   line in the `parallel` aside paragraph (`parallel` item 2); the `Plan-based` / `Plan/naive` name in
   the `WorkflowTimeline` paragraph (`workflows` item 13); the recorded absence of a figure on
   `workshop` (`workshop` Do not); and the `goals.read-came-back.1` → `goals.left-with.1` address in
   the `workshop` pair paragraph (`goals` item 8). The sentence claiming `evolution` carries a card
   becomes true by itself once `evolution` item 2 lands.
5. **Deck arithmetic.** The proposals take step 2 from 42 to 51 slides (nine added, one converted, two
   retitled, three divider points added or repointed, one reworded). Step 1 carries 48 slides for ten
   units of comparable length, so this is proportion rather than inflation. All ids stay
   `deck-step2-…`, unique across the whole deck.
6. **Two `git worktree` fixes are one change**, in `steering` and `goals`. Do not land one without the
   other.
7. **The `engineering.title` rename ripples into two Dutch strings outside step 2**
   (`workflows.naive.1` here, `step3` `change.you-test-engineer.2` there). Coordinate with the step 3
   pass.
