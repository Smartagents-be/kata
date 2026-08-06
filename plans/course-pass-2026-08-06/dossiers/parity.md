# Dossier: EN/NL parity and Dutch quality

Scope: `front/src/steps/step{0,1,2,3}/units/*.html` + `locales/{en,nl}.json`, plus
`front/src/shared/i18n/locales/*.json`. Measured mechanically (key extraction from
`data-i18n=` attributes and from the locale files) and then read line by line in both
languages.

## Headline

**Key-level parity is essentially perfect and should be said out loud.** Every prose
`data-i18n` key in every unit HTML has a Dutch entry. Every `en.json` key has a Dutch
counterpart except seventeen that are deliberately English (documented in
`step1/CLAUDE.md`). There are zero orphan Dutch keys in any step. There are zero
em-dashes, en-dashes or horizontal bars anywhere in either language's student-facing
prose. The shared `ui` namespace is 49/49. Markup shape (block wrappers, inline
`<code>/<strong>/<a>/<svg>` inventories) matches between EN and NL on every single key
but one. That is a better state than most bilingual courseware ever reaches.

**The failure is not coverage, it is drift and term discipline.** The Dutch was written
alongside the English and then the English moved. In three places the Dutch still carries
a concept name the English has renamed, and in a dozen places one English term has three
or four Dutch renderings inside the same step. Two Dutch sentences are outright
mistranslations that a Dutch reader will read as comedy or as a different claim. Those
are the findings worth acting on.

---

## 1. Missing Dutch

### Prose keys in unit HTML with no `nl.json` entry

**None, in any step.** The only `data-i18n` values without a step-local Dutch entry are
`ui:quiz.title` in `step0/units/backend.html`, `step1/units/context.html` and
`step2/units/engineering.html`, which are cross-namespace references into the shared `ui`
bundle (`quiz.title` = "Test yourself" / "Test jezelf"). Correct as written.

Counts: step0 30 prose keys, step1 202, step2 181, step3 53. All covered.

### `en.json` keys with no `nl.json` counterpart

step0: none. step2: none. step3: none.

step1: seventeen, all of them machine output or proper nouns, and all of them
**deliberate** per `front/src/steps/step1/CLAUDE.md` ("Machine output inside an exercise
stays English in every language… `SpotInjection`'s four result bodies and sources and
`BudgetWindow`'s six commands have no `nl` entry, on purpose"; and "Prices and model names
have no `nl` entry, like every other machine-shaped string here"):

```
spot.source.tests      spot.body.tests
spot.source.docs       spot.body.docs
spot.source.ticket     spot.body.ticket
spot.source.grep       spot.body.grep
budget.call.grep       budget.call.controller   budget.call.services
budget.call.reference  budget.call.tree         budget.call.listing
tiers.opus.name        tiers.sonnet.name        tiers.haiku.name
```

No action. Flagging only so a future automated parity check does not "fix" them.

## 2. Orphan Dutch

**None.** No `nl.json` key in any step is unreferenced. Every Dutch key resolves to a
`data-i18n` in the unit HTML, a key present in `en.json`, or a literal in that step's
`.ts`/`.tsx`. The larger `nl.json` line counts (707 vs 533 in step1, etc.) are the unit
prose, which by design has no `en` entry.

## 3. Drift: places where the two languages say materially different things

Ordered by severity. "Better" is judged on truth and on fit with the rest of the course,
not on style; repo policy says the Dutch usually leads, and where that holds I say so.

### 3.1 The Dutch `session` unit still names the layer by its retired name (step 1)

`step1/CLAUDE.md` records that the fourth layer was **renamed from `external` to
`tools`**, and warns: "The layer is named in two other places (`session`'s time-axis
paragraph and the board's `flag.decode.help`), so a further rename has to visit them."
The English visited them. The Dutch did not.

- `session.lead.2` (nl.json:428) — EN: "a tool result arrives the moment something runs".
  NL: "externe inhoud komt binnen op het moment dat iets ze gaat halen" (= *external
  content*).
- `session.lead.3` (nl.json:429) — EN: "was a tool result for exactly one turn".
  NL: "was precies één beurt lang **extern**".

**English is right.** A Dutch student reads a four-layer model in which the fourth layer
is called `tools` in the nav, in `tools.html`, and in the recap, and then meets it called
"extern" in the one paragraph that defines the time axis across all four. Fix in Dutch:
"een tool result komt binnen op het moment dat iets draait" / "was precies één beurt lang
een tool result".

### 3.2 "Compaction" has four different Dutch names inside step 1

The English uses one word, `compaction`, everywhere. The Dutch uses:

| where | Dutch |
|---|---|
| `session.compaction-picks-moment.heading` (nl:439) | **Compressie** kiest het moment |
| `session.compaction-picks-moment.1` (nl:440) | dan **comprimeert** het harness ze |
| `harness.caching.2`, `recap.what-costs-do.4`, `context.amnesia…` (5 hits) | **compaction** (English kept) |
| `deck.session.clear.note` (nl:643) | **Compactie** kiest het moment |

Worst of it: the deck slide and the unit heading are the *same sentence* rendered with two
different nouns, and "compressie" is a different concept in Dutch (data compression), so
the heading names something the paragraph under it never mentions. **Pick one.**
`compaction` (English, as the harness prints it) is the honest choice and is already the
majority; then the heading becomes "Compaction kiest het moment, of jij kiest het" and the
deck note matches.

### 3.3 "gap" translated as "opening" throughout `steering` (step 2)

`steering.stop-at-the-gap.heading` and `.1`–`.4` (nl:293–297), plus
`workshop.flag.statement.help` (nl:~410), render the English "gap" as **"opening"**.
In Dutch "opening" is an aperture or an opportunity; it is not a hole in what was decided.
The section is about `gaps.md`, so the reader meets "de openingen" in prose and `gaps.md`
in the code block and has to bridge it themselves.

**English is right.** Dutch should use *leemte* or *open beslissing*: "Laat hem stoppen bij
een leemte", "je weet niet waar de leemtes zitten", "De leemte opschrijven is
boekhouding". Same word then covers `workshop.flag.statement.help`'s "stillegt bij de
eerste opening".

### 3.4 `model.lead.1` says two different things (step 1)

- EN: "Everything in this step so far fills the window. **Something** has to read it."
- NL (nl:500): "Alles in deze stap ging tot nu toe **over het vullen van** het venster.
  **Iemand** moet het lezen."

Two defects. The Dutch turns a statement about the material into a statement about the
step ("was about filling"), which weakens the hand-off into the model unit. And it says
*iemand*, a person, where the whole unit's argument is that a **machine** reads it and
which machine is a choice. **English is right on both.** Fix Dutch: "Alles in deze stap
vult tot nu toe het venster. Iets moet het lezen."

### 3.5 The Dutch calls step 2's `engineering` unit two different things

`engineering.title` in nl.json is **"Vakmanschap"** (the sidebar label), but
`workflows.naive.1` sends the reader to "de unit over **engineering**" and
`change.you-test-engineer.2` (step3, nl:28) sends them to "de unit over **vakmanschap**".
Two of the three cross-references do not match the label in the sidebar they point at.
Either translate the title or don't; the references must all match it.

### 3.6 "lesson" vs "unit", in both languages, only inside the workshop hints

`step2/en.json` says "the goals **lesson**", "the patterns **lesson**", "the engineering
**lesson**", "the steering **lesson**" — nine occurrences, all inside
`workshop.flag.*.help`. Every other English string in the course says **unit**
(`workshop.lead.1` in the same unit: "the engineering and goals **units**"). The Dutch
mirrors the drift faithfully ("goals-les", "patterns-les", "engineering-les", "les over
bijsturen") and then adds two of its own where the English says unit:

- `workshop.native.1` (nl:421) — EN "the goals **unit** taken to its end" → NL "de
  goals-**les**".
- `workshop.native.2` (nl:422) — EN "the last **unit** described" → NL "de vorige **les**".

Fix the English first (nine strings → "unit"), then the Dutch follows to "unit" and the two
prose slips go with it.

### 3.7 The header is teal in English and green in Dutch

`added-details.alt` (step2 nl:167) — EN "a **dark teal** header"; NL "een
**donkergroene** header". The design system's one colour is teal and the Dutch says so
elsewhere ("tealkleurige pijlen", "Het teal op deze pagina"). This is an alt text, so it is
the one place a screen-reader user gets the colour, and in Dutch they get the wrong one.
**English is right.** → "een donkerteal header".

### 3.8 The loans module has four Dutch names

| key | Dutch |
|---|---|
| `where.description` | de **loans-module** |
| `workshop.lead.2` | een **uitleendomein** voor een bibliotheek |
| `workshop.flag.coverage.hint` | de **uitleenmodule** |
| `deck.workshop.divider.1` | Een **leendomein** |

English says "loans module" / "library loans domain" throughout. Pick one Dutch pair
(*loans-module* / *uitleendomein* reads best, since the folder is literally `loans`) and
use it in all four.

### 3.9 The deck half-translates the workflow names (step 2)

On the same deck the Dutch renders `deck.workflows.naive.title` as **"Naïef:"** but keeps
**"Plan-based:"**, **"Spec-driven:"** and **"Audit-driven:"** in English, while the unit
headings and the `workflow-timeline` figure labels the student just read all say
"Plan-gedreven", "Spec-gedreven", "Audit-gedreven". Either all four translate or none do.

### 3.10 `iteration-paths.few`: a number lost in translation (step 2)

EN "Prototyping the old way took **weeks**" → NL "Traditioneel prototypen kost **veel
tijd**". The number is the whole point of the figure and `evolution.lead.1` NL already
says "Je ontwierp **wekenlang**". **English is right**; the Dutch label should carry the
weeks.

### 3.11 `tiers.*.character`: the Dutch is better and the English should follow

| key | EN | NL |
|---|---|---|
| `tiers.opus.character` | Precision interpreter | Leest je letterlijk |
| `tiers.haiku.character` | Formulaic executor | Voert het voorschrift uit |

The English pair is exactly the abstract-noun labelling the brief's AI-tell list warns
about; the Dutch is a verb phrase that says what the tier *does*. Repo policy is that the
Dutch leads and the English gets rewritten. Do that here: "Takes you literally", "Runs the
recipe" or similar. (`tiers.sonnet.character` is fine in both.)

### 3.12 Smaller drift, listed for completeness

- `evolution.walking-skeleton.2` (nl:213) — EN "a question and answer section" → NL "een
  **QA-sectie**". In Dutch "QA" reads as quality assurance. Say "een vragensectie".
- `evolution.prototype-conversation.2` — EN "what is missing entirely" → NL "wat er
  **mogelijk** mist"; EN "Take the strongest parts of **each one** across" → NL "Neem de
  sterkste punten over". The Dutch hedges where the English commits.
- `model.speed.1` — EN "you will not care" → NL "merk je het nauwelijks" (weaker claim).
- `backend.code-blocks.1` (step0 nl:48) — EN "use them and **drive them through** your AI
  agent" → NL "ze met je AI-agent **instrumenteert**". Different instruction: the English
  says run it via the agent, the Dutch says instrument it. English is right.
- `backend.lead.2` (step0 nl:46) — EN "A module can point you at a job to do in its own
  step's project" → NL "Tijdens de modules **kan er gerefereerd worden naar** een
  opdracht". The Dutch is passive and bureaucratic where the English is a short
  declarative; and "Als je **ze** correct uitvoert" disagrees with the singular "opdracht".
- `deck.tools.parts.title` NL "Lees ze **op** wie beslist" vs unit prose NL "Lees ze **aan**
  wie beslist" — same English sentence, two Dutch prepositions, and neither is idiomatic
  (see 4.4).
- `deck.tokens.split.note` NL "**Namen** en hashes" vs unit prose NL "**Identifiers**,
  hashes en ids".

---

## 4. Dutch quality

The Dutch is genuinely good and mostly *not* translated English: it re-cuts sentences
("Ze zijn langs je heen gelopen", "om de hete brij draaien", "Aandacht raakt op, ruim voor
je tokens") rather than tracking the English word order. Belgian usage ("geraken",
"opkuis", "properder", "namiddag") is consistent and reads as one voice. The English terms
that must stay English (prompt, session, clear, keep, gone, tokens, harness, skill, hook,
worktree, coverage) all do. The praise is real. What follows is what is actually wrong.

### 4.1 "knipbeurten" (step 1, `harness.check-yourself.1`, nl:473) — the one howler

> EN: "Cuts go on the board before anyone opens an agent. Three people, three different
> cuts."
> NL: "De **knipbeurten** gaan op het bord voor iemand een agent opent. Drie mensen, drie
> verschillende **knipbeurten**."

*Knipbeurt* is a haircut appointment. This is a guided-mode teacher instruction, so it is
read out loud at the board in front of a room. Use "opdelingen" or "manieren van
opknippen", or recast: "Drie mensen knippen het op, drie verschillende resultaten, en die
gaan op het bord."

### 4.2 The gender of `harness` is inconsistent, and one slip is inside the harness unit

`step1` uses **"het harness"** 16 times, including the unit title (`harness.title`: "Het
harness"). But `harness.caching.1` (nl:454) says "**De** harness zet een markering in het
request", and all of step 2 says "de harness" (`goals.ultracode.1`, `parallel.orchestrator.1`,
`workflows.audit-driven.1`). Pick one; "het harness" wins on count and on the unit title.

### 4.3 Grammar errors

- `parallel.orchestrator.1` (step2 nl:346) — "sub-agents die hij zelf **briefst**". Wrong
  person; should be *brieft*.
- `impostor.feeling-from-signal.1` (step3 nl:85) — "Code aanvaarden die je niet begrijpt,
  is hoe een codebase **die van iemand anders wordt**." The relative clause has no head.
  Should be "…is hoe een codebase er een van iemand anders wordt."
- `truth.lead.2` (step1 nl:530) — "of **je stuurt hem het zelf uitzoeken** met een tool".
  Missing infinitive marker; Dutch does not license this. "…of je laat hem het zelf
  uitzoeken met een tool."
- `truth.lead.1` — "en **welk** je krijgt hangt af van…" with no noun; "welk antwoord je
  krijgt".
- `welcome.hints.1` (step0 nl:22) — "Als je **vast zit** kan je **hier op** drukken".
  Two spelling errors: *vastzit*, *hierop*.
- `workshop.flag.complexity.help` (step2 nl:395) and `workshop.flag.honest.help` (nl:398)
  — Claude referred to as "**het**": "de check die **het** na elke klasse draait",
  "Blijft **het** tests schrijven". A name takes *hij*/*die*.
- `workflows.pick-per-task.1` and `evolution.lead.3` — "over elk van **hen**" / "uit elk
  van **hen**" for workflows and for versions. *Hen* is for people; use *ze* / *die*.

### 4.4 Calques: English idioms carried over that are not Dutch

- `truth.lead.3` (nl:531) — "Alle drie komen ze **in dezelfde stem**." Direct calque of
  "in the same voice". Dutch: "Alle drie klinken ze even stellig" or "…komen ze op dezelfde
  toon".
- `patterns.skill-iteration.2` (step2 nl:301) — "Daar **komt iteratie binnen**." Calque of
  "that is where iteration comes in". Dutch: "Daar komt iteratie bij kijken."
- `tools.extra-tools.4` / `deck.tools.parts.title` — "Lees ze **aan/op** wie beslist" for
  "Read them by who decides". Neither preposition works; "Sorteer ze op wie beslist" or
  "Onderscheid ze aan de hand van wie beslist".
- `goals.research-frontier-model.2` (step2 nl:374) — "Jij bent **de vertering** in het
  midden." *Vertering* in Dutch is either literal digestion or a bar bill; as a metaphor
  for a person it reads as neither. Recast: "Jij bent wat er in het midden verteerd wordt"
  or drop the metaphor.
- `workshop.goals.2` — "Die ene regel is wat je **toelaat** de agent een doel te geven"
  (calque of "what allows you to"). Dutch: "Door die ene regel kan je de agent een doel
  geven."

### 4.5 A term half-translated

- `workshop.build.2` (step2 nl:418) — "een lening die nog **in haar grace** zit". *Grace*
  alone is neither Dutch nor a term; the same document translates it properly as
  **respijtperiode** in `steering.stop-at-the-gap.1` and `workflows.plan-based.2`. Use
  respijtperiode.

### 4.6 Term inconsistencies inside the Dutch (one English word, several Dutch words)

Besides compaction (3.2), gap (3.3), the loans module (3.8) and the workflow names (3.9):

| English | Dutch renderings found |
|---|---|
| agent(s) | **agents** everywhere, except **agenten** in `steering.worktree-each.3` (step2 nl:292, twice) and `expectations.estimate-still-matters.2` (step3 nl:71) |
| turn | **beurt** everywhere, except **rondes** in `loops-per-hour.*` (step2) and **ronde** in `goals.most-waiting`/`workflows.audit-driven` |
| line (of code) | **regel** everywhere, except **lijn** in `impostor.feeling-from-signal.2` (step3 nl:86, "Je volgde elke lijn") and `quiz.plan-beats-one-shot.question` ("een vage vraag van één lijn") |
| files | **bestanden** everywhere, except **files** in `match.scenario.delegate` and `match.explanation.delegate` (step1) |
| arrangement (key vs subscription) | **regelingen** in step1 `model.api-vs-subscription.1`, **afspraken** in step2 `goals.lead.2` referring back to it |
| house rules | **Spelregels** in `welcome.house-rules.heading`, **Huisregels** in `deck.welcome.rules.title` |

Each of these is one word to normalise, and each currently makes a cross-reference read as
if it points at something the student has not met.

### 4.7 One case where the model's gender wobbles and the deck proves it

`tokens.one-at-a-time.heading` (nl:363) "**Hij** schrijft één token per keer" and
`tokens.reads-all.heading` (nl:370) "**Hij** leest alles, elke beurt opnieuw". The deck
carries the same two sentences as `deck.tokens.next.title` "**Het** schrijft één token per
keer" and `deck.tokens.attention.title` "En **het** leest alles, elke beurt". The deck is
right (*het model*), and the unit headings are worse than merely inconsistent: the section
immediately above them is entirely about *de tokenizer*, which **is** masculine and **is**
called "hij" three sentences earlier, so a Dutch reader lands on "Hij schrijft één token
per keer" with the tokenizer as the nearest antecedent. Change both headings to "Het".

---

## 5. Em-dashes

**Zero.** `grep -rn '[–―—]' front/src/steps --include='*.json' --include='*.html'` returns
nothing, in either language, in prose, quiz text, figure labels or deck text. The only `—`
characters anywhere under `front/src` are in four TypeScript doc comments
(`shared/assistant/assistant.ts:4,6`, `shared/mode/mode.ts:4,6`, `shared/lib/content.ts:29`,
`steps/index.ts:10`), which are not student-facing. Nothing to do.

---

## 6. One markup defect found while checking parity

`step2/units/steering.html:55` — the `<aside data-i18n="steering.interrupt-or-go-back.5">`
holds **bare text**, while its Dutch value wraps the same content in `<p>…</p>`, and every
other `<aside>` in all four steps wraps its English in `<p>` too. So this one card renders
with different block spacing depending on the language. It is the single markup-shape
mismatch in the whole course. Fix the English to `<p>`.
