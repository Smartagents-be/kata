# step2/workshop — audit dossier

Read first: `front/src/steps/step2/CLAUDE.md` (the `workshop` section at its foot, plus the
`goals`, `engineering` and `setup` sections it cross-references), `kata/step2/java/CLAUDE.md`,
`kata/step2/java/pom.xml`, `FlagRevealIT.java`, `flags.ts`, `Workshop.tsx`, both locale bundles,
`audit.md` rows 24 and 44, `.claude/skills/lesson-writing/SKILL.md`.

Prohibitions respected: nothing below decodes or reveals a flag, names the three setup-flag files,
proposes hardening the loans module, implementing `MemberStatements.forTier`, adding a `native`
profile or writing the resource hint.

Prior art, not my discoveries: **audit item 44** (the unit's close is a one-sentence self-only
aside, no wrap-up of the step, and no mention of step 3's `change`) and **audit item 24** (step 2
carries no `data-assistant` anywhere, so `workshop.build.3` and every flag help text say "Claude"
to a Copilot reader). Both are already tracked. I add nothing to them.

---

## 1. AI tells

**None.** I looked hard and found nothing to report, and I am not going to manufacture one.

The prose here is the house voice working properly. `honest.1` opens cold on the claim ("The third
goal is the interesting one"), `honest.2` defines mutation testing by what it does rather than by
naming it first ("It changes the code in small ways, a plus for a minus, a boundary nudged by one,
and runs your tests again"), `native.3` ends on the sharpest sentence it has ("That miss is your
real spec"), and `lead.3` is a two-sentence paragraph next to a five-sentence one, which is the
uneven-paragraph rule holding. No em-dashes in either language. No tricolon rhythm, no "not just X
but Y", no summary paragraph, no closer gesturing at significance.

Two things I checked and rejected as findings, recorded so nobody re-opens them:

- The ordinals ("the three goals", "The fourth flag", "The fifth") read like the skill's
  *Do not announce the count* ban. They are not: the board below has exactly five rows and the
  ordinals are the only handle the prose has on them. The count is a label, not arithmetic before a
  list. (See finding 3.3 for the one thing that *is* wrong about that handle.)
- `build.1` and `native.1` both open by contrasting with the flags before them. That is the
  escalation the unit is built on, not symmetry for its own sake, and `native.1`'s "and of a
  different kind again" says so out loud.

## 2. Truthfulness

Verified against the repo and correct, for the record: `kata/step2/java` is a loans domain with
`port/` and `adapter/`; `LateFeePolicy.assess` scores roughly 22 on cyclomatic complexity, so "far
too branchy to read" is not an exaggeration; the default build runs exactly one shipped test
(`LateFeePolicyTest`, the other two classes carry `@Tag("challenge")`), so "it passes its one
shipped test" is exact; `COVERAGE_FLOOR = 90.0`, `COMPLEXITY_CEILING = 10`, `MUTATION_FLOOR = 80.0`
in `FlagRevealIT` all match the prose; `GET /api/loans/statement/{tier}` does answer 500 because
`forTier` throws; `packaging` is `jar`; `spring-boot-starter-parent` 4.1.0 contributes only
*pluginManagement* under its own `native` profile, so `mvn -Pnative native:compile` genuinely does
not work until the student declares the plugin, and the default image name is the artifactId, so
`./target/kata-agentic-java-step2` is right.

Four things are not right.

**2.1 — the board's own two strings are false about two of its five flags**

- **Where** `workshop.panel.description` and `workshop.panel.wrong` in `locales/en.json` (lines 33
  and 39) and `nl.json` (383 and 389). Rendered by `FlagBoard` under every visit to this page.
- **Problem** The description reads "Paste each flag your graded run printed." and the wrong-answer
  message reads "Not that one. Read the flag straight from the build output." Only three of the five
  flags come from the graded run. `flags.ts` says so in its own docblock: "they come from three
  different places", the fourth from the running service and the fifth from a native image's startup
  log, "so nothing on the JVM prints it at all". A student who has just curled the statement endpoint
  and pasted a typo is told to go and read the build output, which will never contain that code.
- **Fix** en `workshop.panel.description`: `Paste each flag as your build, your endpoint or your
  native image hands it over. Checked here in the browser.`
  en `workshop.panel.wrong`: `Not that one. Read the flag straight from the output it came in.`
  nl `workshop.panel.description`: `Plak elke flag zodra je build, je endpoint of je native image
  hem teruggeeft. Hier in de browser gecontroleerd.`
  nl `workshop.panel.wrong`: `Niet die. Lees de flag rechtstreeks uit de uitvoer waarin hij
  verscheen.`

**2.2 — "the complexity ceiling from your CLAUDE.md" points at a file that does not carry it**

- **Where** `workshop.goals.3` (workshop.html:42-43), and `workshop.goals.3` in nl.json:412.
- **Problem** Nothing puts a complexity ceiling in anybody's `CLAUDE.md`. `workshop.goals.2`, two
  paragraphs above, asks the student to write one line into `CLAUDE.md` and that line is
  `mvn verify -Pgraded`. `setup` never mentions complexity. The repo's own `CLAUDE.md` files do not
  carry a ceiling either. The ceiling of ten is a constant in `FlagRevealIT` and is enforced by the
  `graded` profile whatever the student's `CLAUDE.md` says. The unit that actually owns the ceiling
  is `goals`: `goals.whole-job.2` reads "Hand over a ceiling: no method above a cyclomatic complexity
  of ten." So the sentence sends the reader to the wrong place for a number it then states correctly.
- **Fix** en, replacing the clause only: `The second is the complexity ceiling <a
  href="/steps/step2/goals">goals</a> told you to hand over: no method may score above ten on
  cyclomatic complexity, so the late-fee method has to come apart into pieces small enough to hold
  in your head.`
  nl: `Het tweede is het complexiteitsplafond dat de <a href="/steps/step2/goals">goals-les</a> je
  liet doorgeven: geen methode mag boven een cyclomatische complexiteit van tien uitkomen, dus de
  boetemethode moet uiteenvallen in stukken die klein genoeg zijn om in je hoofd te houden.`

**2.3 — the coverage exclusion list is short by two**

- **Where** `workshop.goals.3` ("with the web and config layers left out"), and the same claim in
  `workshop.flag.coverage.hint` (en.json:41, nl.json:391).
- **Problem** The JaCoCo report in the `graded` profile excludes four things, not two:
  `step2/web/**`, `step2/config/**`, `step2/aot/**` and `application/MemberStatements*`. The pom
  explains why (the challenge stub and the native-image runner cannot be covered by a JVM test), and
  the reason is good. But the student is told which code the floor measures, and the two missing
  exclusions are exactly the two classes the fourth and fifth flags ask them to work on. A student
  chasing the last percent could reasonably write tests for `MemberStatements` and see the number
  refuse to move.
- **Fix** en: `The first goal is a coverage floor: the module has to reach ninety percent line
  coverage, with the web and config layers left out, and the code the last two flags ask you to
  write left out with them, which means writing the tests it never had.`
  nl: `Het eerste doel is een coverage-ondergrens: de module moet negentig procent line coverage
  halen, op de web- en configlagen na, en op de code na die de laatste twee flags je laten
  schrijven, en dat betekent de tests schrijven die er nooit waren.`

**2.4 — mutation testing is scoped to the domain and the unit does not say so**

- **Where** `workshop.honest.2` first sentence ("The build checks that by mutation testing.").
- **Problem** PIT is configured with `targetClasses` and `targetTests` both set to
  `be.smartagents.kata.java.step2.domain.*`. Only the domain is mutated, and only tests living in
  the domain package are run against those mutants. The coverage floor in the paragraph above is
  module-wide, so two adjacent goals measure two different scopes and the page presents them as one.
  A student who parks their fee tests in `application` (the repo convention is to mirror the
  production package, so most will not, but nothing on this page says so) gets a mutation score that
  does not move.
- **Fix** en, first sentence only: `The build checks that by mutation testing the domain.`
  nl: `De build controleert dat met mutation testing op het domein.`

## 3. Progression

The escalation is genuinely well built and is the best thing about the unit: three goals against
code that runs, then code that does not exist, then a build that does not exist, each one asking for
a longer plan than the last. `lead.1` names `engineering` and `goals` rather than counting back to
them, which is the correction `step2/CLAUDE.md` records. Three things break it locally.

**3.1 — `native.2` still counts backwards, which is the defect the step's notes ban**

- **Where** `workshop.native.2` ("the long-running kind the last unit described"); nl.json:422 ("dat
  de vorige les beschreef").
- **Problem** `step2/CLAUDE.md` records this as a correction already made once: `workshop.lead.1`
  "read 'the last two units' until `enablement` landed between `workflows` and `goals`, at which
  point the count pointed at a unit that argues neither the bar nor the goal", and concludes
  "Positional references to neighbouring units break silently on an insertion, so name the unit."
  The same reference survives four paragraphs further down, in both languages, and it is pointing at
  `goals` by position only. Insert one unit before the capstone and it silently points at the wrong
  page. This is not a style preference: it is the step's own recorded rule, unapplied here.
- **Fix** en: `Do not one-shot it. A native build is the long-running kind <a
  href="/steps/step2/goals">the goals unit</a> described, minutes each, which makes it the wrong
  place to guess and retry.`
  nl: `One-shot het niet. Een native build is het langlopende soort dat <a
  href="/steps/step2/goals">de goals-les</a> beschreef, minuten per stuk, wat het de verkeerde plek
  maakt om te gokken en opnieuw te proberen.`

**3.2 — "the setup the first units asked for" is the same defect in weaker form**

- **Where** `workshop.goals.2` (workshop.html:32); nl.json:411 ("de setup die de eerste units
  vroegen").
- **Problem** "The first units" is a position, not a name, and it is also inaccurate about what those
  units asked for. `setup` teaches `CLAUDE.md`, skills and hooks; it never instructs the student to
  create one for this repository. The one concrete instruction is the sentence right after it, which
  the workshop issues itself. So the clause promises a callback that has no target.
- **Fix** en: `Before you hand anything over, do the setup <a href="/steps/step2/setup">the setup
  unit</a> asked for. Put <code>mvn verify -Pgraded</code> in your <code>CLAUDE.md</code> as the
  command that validates this work.`
  nl: `Voor je iets doorgeeft, doe de setup die <a href="/steps/step2/setup">de setup-les</a> vroeg.
  Zet <code>mvn verify -Pgraded</code> in je <code>CLAUDE.md</code> als het commando dat dit werk
  valideert.`

**3.3 — the capstone is the only unit in step 2 that names sibling units without linking to them**

- **Where** `workshop.lead.1` (`<code>engineering</code>` and `<code>goals</code>`) and
  `workshop.collect.2` (`<code>goals</code> unit`). Verified: `enablement`, `engineering`,
  `workflows`, `parallel` and `goals` between them carry eleven `<a href="/steps/step2/…">` links in
  the house form `the engineering unit`, `the workflows unit`, `steering`. `workshop.html` carries
  zero.
- **Problem** Two costs, and they compound. First, `<code>` in this course means a filename, a command
  or an identifier, so `<code>engineering</code>` reads as a file rather than a page. Second, this is
  the page where a student is most likely to want to go back: they are two hours into hardening a
  module and want the paragraph about the quality gate again, and the capstone is a dead end in both
  directions (it does not link forward to step 3 either, which is audit item 44). Every other unit in
  the step lets them click.
- **Fix** Swap the four `<code>` wrappers for the step's own link form, leaving the words alone.
  en `lead.1`: `…the thing the <a href="/steps/step2/engineering">engineering</a> and <a
  href="/steps/step2/goals">goals</a> units argued you should always be able to name: a goal a build
  can answer yes or no to.`
  en `collect.2`: `…the honest move is the one the <a href="/steps/step2/goals">goals</a> unit
  named: …`
  nl the same substitution in `workshop.lead.1` and `workshop.collect.2`.

## 4. Readability

Two items, both small. The prose is otherwise clean and reads at pace.

**4.1 — `lead.2` carries a logistics aside in the middle of a description of the code**

- **Where** `workshop.lead.2`, sentence three: "Every command on this page runs from that folder,
  because each step of this kata is its own Maven project."
- **Problem** The paragraph is doing one job (here is the module, here is what is wrong with it) and
  that sentence is doing a different one (here is where to stand). It sits between "a late-fee rule
  at the middle of it" and "It compiles and it passes its one shipped test", so the reader is taken
  out of the description and put back into it. The information itself is right and worth keeping; it
  is in the wrong paragraph, and the `<pre>` two paragraphs later already opens with
  `cd kata/step2/java`.
- **Fix** Cut it from `lead.2` and open `goals.1` with it, where the `cd` is:
  en `goals.1`: `Every command on this page runs from <code>kata/step2/java</code>, because each step
  of this kata is its own Maven project. The goals live behind a Maven profile there, off by default
  so the normal build stays green. Turn it on and it measures the module against all three at once.`
  nl `goals.1`: `Elk commando op deze pagina draai je vanuit <code>kata/step2/java</code>, want elke
  stap van deze kata is zijn eigen Maven-project. De doelen zitten daar achter een Maven-profiel,
  standaard uit zodat de gewone build groen blijft. Zet je het aan, dan meet het de module in één
  keer tegen alle drie.`
  and drop the sentence from `lead.2` / nl `workshop.lead.2`.

**4.2 — "The flags are English text either way" attaches to the wrong thing**

- **Where** `workshop.collect.1`, third sentence.
- **Problem** The sentence before it is about the backend being down, so "either way" reads as "up or
  down", which is not what it means. What it means is the repo-wide policy from `front/CLAUDE.md`:
  the words a student types as an answer stay English in every language. The Dutch is already the
  better version here ("De flags zijn sowieso Engelse tekst"), which is the usual direction, but it
  is still not saying *in every language*.
- **Fix** en: `The flags are English whichever language you are reading in, like every answer this
  course asks you to type.`
  nl: `De flags zijn Engels in welke taal je dit ook leest, zoals elk antwoord dat deze cursus je
  laat typen.`

Checked and left alone: `mvn -Pnative native:compile` is a `<pre>` for a command that does not work
until the student wires the plugin, while the page's other four `<pre>` blocks run as printed. I
considered flagging the inconsistency and decided against it. `native.1` says the wiring is not in
the pom two sentences earlier, `native.2` says "plan it first" immediately above, and the block is
plainly the thing the plan is aimed at. Labelling it would soften an exercise the step's notes want
sharp.

## 5. Imagery

The unit carries **zero figures**, and it is the only capstone in the course that does. `audit.md`
row 34 says of step 1's workshop that "`OneWindow` above the board is what makes it a step 1 capstone
rather than a flag hunt, since the flags on their own ask nothing about the window". By that standard
this page is a flag hunt. That is the observation; here is the one figure I would actually argue for,
and the reason it is only one.

**5.1 — propose `HonestCoverage` under `workshop.honest.2`**

- **What it draws** Two rows, one module, two test suites. Row one, "tests that only execute": a line
  coverage bar drawn to 100% in muted ink, and beside it a mutation bar drawn to 12%, also muted. Row
  two, "tests that assert": a line coverage bar drawn to **exactly the same width**, still muted, and
  a mutation bar to 86% in teal. Two axes labelled once at the foot, `line coverage` and `mutations
  caught`, with the 80% floor as a hairline on the second.
- **What the reader takes** That the two numbers are not two readings of the same thing. The claim in
  `honest.1` is "a hundred percent of the lines can run under tests that assert nothing, and the
  number will still read green", and prose can only assert that. The drawing measures it: the bar that
  does not move is the one an agent optimises, and the bar the third flag hangs on is the other one.
  The identical coverage widths are the argument, which is the same device `ScriptRuns` uses (one set
  of widths repeated is the equality the section claims) and `WorkflowWeights` uses (bars of the same
  length, so the drawing says the work moves rather than shrinks). Teal is what the section adds,
  which is the step's colour rule.
- **The tension, stated honestly** `step2/CLAUDE.md` records that the proxy trap "has three homes,
  `workshop.honest.1`, `engineering.quality-gates.1` and `workshop.flag.honest.help`, so it needs no
  fourth. That is the thing to notice before writing a section about metrics anywhere in the step."
  My reading is that the constraint bans a fourth *telling* in prose, and that drawing the claim
  inside the section that already owns it is that section drawn rather than a new site. But it is the
  maintainer's call, and if the call is no, then the finding reduces to: the capstone has no drawing
  and that is deliberate, which should be written into the notes so the next reviewer stops here too.

**5.2 — figures I considered and rejected**, so nobody proposes them later. A map of the five flags
to the three places they come from is a table of what four paragraphs already say, and it would fail
the repo's own bar. A drawing of the five in ascending difficulty is the section headings redrawn. A
picture of the native build dropping its resource would spell out the fix the step's prohibitions
keep unspoken.

## 6. Supporting tasks

The shape is right and needs no change. The whole page is one instruction set ending in a
hash-checked board with five rows, three of which are graded by a build the student runs themselves,
and the two ungraded moves it asks for (plan mode before the statement, plan mode before the native
build) are the two places a card would be worse than a sentence. No `TaskCard` and no `ConnectBoard`
belongs here.

**6.1 — the reader is never told how big the job is before they start it**

- **Where** `workshop.lead.3`, the last line before the first command.
- **Problem** `audit.md` row 44 puts this page at "2 to 4 hours of real work". Nothing on the page
  says so, or says that the five flags are not one sitting. The course sizes its work elsewhere and
  does it well: `evolution` closes on a fifteen-minute clock, and the clock is the constraint that
  makes that exercise mean something. Here a student can open the native section at the end of an
  evening, spend the minutes on a compile, and find out that the flag needed a second build. The
  three-flag hardening pass and the two build-a-thing flags are also different jobs with different
  ends, and the page never groups them.
- **Fix** One sentence added to `workshop.lead.3`:
  en: `Hand it to your agent as three outcomes, not a list of edits. Then let the build decide. Set
  aside an afternoon for it: the first three flags come out of one hardening pass, and the fourth and
  the fifth are separate jobs with their own builds.`
  nl: `Geef het aan je agent als drie uitkomsten, niet als een lijst wijzigingen. Laat daarna de
  build beslissen. Maak er een namiddag voor vrij: de eerste drie flags komen uit één harding, en de
  vierde en de vijfde zijn aparte klussen met hun eigen builds.`

## 7. Quiz

**No quiz, and it should stay that way.** The unit's assessment is five hash-checked flags, three of
which are produced by a build that cannot be bluffed and one by mutation testing chosen precisely
because it resists gaming. A multiple-choice question here would grade whether the student read the
page, in front of a board that grades whether they did the work, and the weaker instrument would be
the last thing on the screen. `step2/CLAUDE.md` puts the step's two quizzes on `workflows` and
`goals` for a stated reason (a question can ask which workflow or which expensive move a situation
wants) and neither reason applies to a capstone with no choice in it. Nothing to change.

## 8. EN/NL parity

**Parity is complete.** Every prose key in `workshop.html` has a Dutch entry: `lead.1-3`,
`goals.heading` and `goals.1-3`, `honest.heading` and `honest.1-2`, `build.heading` and
`build.1-3`, `native.heading` and `native.1-4`, `collect.heading`, `collect.1`, `collect.2` (with
its `<p>` wrapper preserved, correctly, since the key sits on the `<aside>`). All eleven en.json
board keys have Dutch counterparts. Translation quality is high: `honest.2`'s "een grens één
opgeschoven" for "a boundary nudged by one" is better than a literal would have been, and
`collect.1`'s "sowieso" is truer than the English "either way" (see 4.2, where the fix rewrites the
English).

Every fix above has its Dutch written beside it. Two Dutch-only items:

**8.1 — `workshop.flag.statement.help`: "bij de eerste opening" is the wrong word**

- **Where** nl.json:401, translating "why you stop it at the first gap rather than let it guess".
- **Problem** "Opening" in Dutch is an aperture or a vacancy, not a gap in a specification. The
  referent is `steering`'s `gaps.md` section, where the lesson is stopping at a gap in what the
  agent was told. The English is right and the Dutch reader gets a sentence that does not parse
  against anything they read in `steering`.
- **Fix** nl: `De les over bijsturen legt uit waarom je het stillegt bij het eerste gat in de spec in
  plaats van het te laten gokken, en de engineering-les waarom het domein de boeteberekening al voor
  je doet.`

**8.2 — `workshop.native.2` (nl) carries the same positional reference as the English**

Covered by fix 3.1; noted here so the Dutch is not left behind when the English is fixed, which is
the failure mode the lockstep rule exists for.

---

## Verdict

This is the strongest page in the course and the writing is not what is wrong with it. The escalation
across five flags is genuinely well designed, the third goal is the only assessment in the whole kata
that an agent cannot satisfy by satisfying a proxy, and the prose carries no AI tells at all, which
is rare. What it does carry is four factual defects, and two of them are on screen the entire time a
student is working: the board's own description and its wrong-answer message both tell the reader the
flags come from the graded build, when two of the five come from an HTTP response and a native
image's startup log. Under that sit a `CLAUDE.md` reference with no `CLAUDE.md` behind it, an
exclusion list short by the exact two classes the last two flags are about, and a "the last unit"
back-reference the step's own notes record as banned after it broke once already. It has no drawing,
which is defensible but undocumented, and it is the only unit in step 2 that will not let a reader
click back to the argument it is testing. None of that is structural. All of it is an afternoon.

Priority order:

1. **2.1** — fix `workshop.panel.description` and `workshop.panel.wrong` in both bundles. Two false
   sentences rendered on every visit, contradicted by `flags.ts`'s own docblock.
2. **2.2** — cut "from your `CLAUDE.md`" out of `workshop.goals.3` and point it at `goals`.
3. **3.1** — replace "the last unit described" in `workshop.native.2` with the unit's name, EN and NL.
4. **3.3** — turn the four `<code>` unit names into the step's own link form.
5. **2.3 / 2.4** — complete the coverage exclusion list and say that mutation testing is scoped to
   the domain.
6. **3.2** — name `setup` instead of "the first units".
7. **6.1** — one sentence in `lead.3` sizing the job.
8. **4.2 / 8.1** — the "either way" rewrite, and "het eerste gat in de spec" in the Dutch help.
9. **4.1** — move the Maven-project sentence out of `lead.2` and into `goals.1`.
10. **5.1** — decide on the `HonestCoverage` figure, and if the answer is no, record that in
    `step2/CLAUDE.md` so the next reviewer does not re-derive it.

Out of scope here and already tracked: audit item 44 (no close into step 3) and audit item 24 (no
Copilot variant anywhere in step 2, which this page needs in `build.3` and in all five flag help
texts).
