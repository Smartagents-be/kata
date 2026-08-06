# Dossier: step 0's presentation deck

Subject: `front/src/steps/step0/deck.tsx` + the `deck.*` keys in `front/src/steps/step0/locales/{en,nl}.json`.
Measured against: `front/CLAUDE.md` "## The presentation deck", `front/src/steps/step0/CLAUDE.md`,
`front/src/steps/step0/units/{welcome,backend}.html`, and the three sibling decks.

Verdict: **needs work.** What is there is correct, in the house voice, and rule-compliant. There is
just not enough of it, and the shortfall is not cosmetic: it is the reason a guided class cannot do
either of step 0's exercises.

## The numbers

| step | slides | units | slides/unit | figure slides |
|---|---|---|---|---|
| step0 | 5 | 2 | **2.5** | **0** |
| step1 | 48 | 10 | 4.8 | 26 |
| step2 | 42 | 10 | 4.2 | 19 |
| step3 | 13 | 3 | 4.3 | 1 |

Step 0 is half the density of the course norm and the only step with no drawing on the board. Step 3
is the step defined by having no Java, no quiz, no exercise and one figure, and it still runs 4.3
slides per unit. Step 0 opens the day.

`welcome` has seven sections (`lead`, `how-to-use-this-document`, `how-exercises-work`, `hints`,
`legend`, `how-workshops-work`, `house-rules`). It gets one divider and one statement. Five of those
seven sections reach the board only as a clause inside a divider point, or not at all.

## Finding 1 — the deck does not cover the two things a class can only get from the deck

This is the finding that matters, and it is a mechanism defect rather than a taste one.

Guided is the **default** mode, and `prepareUnit` drops every run of prose in it (`content.ts` lines
177-190; `front/CLAUDE.md` says so in as many words, and `audit.md` item 49 restates it). So in a
room, `welcome.html` renders exactly: the `How exercises work` heading + the answer box, the `Hints`
heading + the hint box, `Icons you'll see` + `Legend`, and the registry quiz. `backend.html` renders
the `Test yourself` heading + the flag box. Everything else is on the tutor, and the deck is what the
tutor has.

Two consequences the deck currently does not catch:

- **`{f1r5t-5t3p5}` is nowhere.** The first box's hint reads "Type the code from the paragraph
  above", and its help dialog reads "Look at the code in braces in the paragraph just above this
  box" (`en.json`, `code.panel.hint` / `code.panel.help`). In guided mode there is no paragraph
  above. The code is not on the slide either. A room cannot clear the first exercise in the course
  without the tutor reciting a string from memory, and the Hint button, which the very next section
  teaches them to press, points at a paragraph that was deleted before the page rendered.
- **`cd kata/step0/java` / `mvn verify -Pintro` is nowhere.** The flag box's hint is "Run the block
  above through your agent" and its help says "ask it to run the block above". The `<pre>` holding
  that block is prose and is dropped. So step 0's one real exercise, the one that teaches the
  build-prints-a-flag mechanism step 2's workshop depends on, is undoable in class from anything the
  student or the tutor is looking at.

The deck's own comment says the exercise "stays off the board on purpose: naming its Maven profile or
either printed code is naming the answer". Two things about that. First, it is not accurate: the
profile is not the answer, the flag the build prints is, and the profile name is already in plaintext
in the student's own unit HTML. Second, the constraint it inherits (root `CLAUDE.md`: "the unit that
sets it is the only place a student should meet it") is self-defeating under the default mode,
because in guided mode the unit is not a place the student meets it either. **I am naming this as a
constraint to revisit rather than quietly proposing a slide that breaks it.** Two honest repairs, and
they are not exclusive:

1. Cheapest and fully inside the constraint's spirit: the deck names the *deed*, never the finding,
   which is the precedent step 2 already set (`deck.setup.flags.note`: "Three flags in plain text.
   Find out how it instructs an agent."). Slide S8 below.
2. The proper repair is in the unit, not the deck: pull the code block into a figure so it survives
   the guided cut, the way every other class-visible thing in this course does. That is the unit
   agent's edit, but the deck audit is where the defect shows.

## Finding 2 — zero figures, and the one projectable figure is excluded on a weak reason

The deck rule is explicit that figures are the one thing reused from the page, and equally explicit
about why some are held back: `TaskCard` and `FlagBoard` write to localStorage and would tick the
tutor's machine. `CodeCheck` writes `kata.step0.<id>.v2` on every solve, so keeping it off is
**correct** and the deck comment is right about it.

`Legend` is not that. It reads three locale strings and renders a `<ul>`. It touches no storage. The
deck's stated reason for leaving it off, "`Legend` only means something beside the icons it
explains", inverts the rule it is invoked under: the whole point of `SlideFigure` is that the room
looks up at the projector and down at the same drawing on their own screen, and `Legend` is one of
the few figures in this course that is *already* rendered on the class-mode page, so the board and
the screen would be showing the same thing at the same moment.

It also costs something concrete. `step0/CLAUDE.md` defends the house rules' placement precisely on
this: "Rule three carries the coin icon, and the legend is where a coin is given a meaning, so the
rules read a paragraph after the icon they use." On the board the legend does not exist, so rule
three's coin has never been given a meaning when the rules slide arrives, and the placement argument
the step wrote down does not survive the projection.

## Finding 3 — the module names itself two ways, three slides apart

`deck-step0-title` sets `title: 'deck.title'` = "Introduction", with a comment defending that choice
over the sidebar's "Start here" because "a room is not choosing". Both dividers underneath then set
`eyebrow: 'step.title'` = **"Start here"**. So the card says Introduction and every slide after it is
eyebrowed with the string the card deliberately rejected, for a reason that applies to the eyebrow
word for word. Steps 1, 2 and 3 have no such split: their card and their eyebrows are the same key.

Fix: `eyebrow: 'deck.title'` on both dividers, and on every statement below them that eyebrows the
module rather than the unit (none currently do; the statements correctly eyebrow their unit).

## Finding 4 — a divider whose claims get no proof, and a statement proving a claim no divider made

Deck doctrine, from `front/CLAUDE.md` and repeated in step 1's deck comment: "the divider states the
unit's two or three claims and the slides after it are the proof."

`deck-step0-backend` claims three things: each step is its own Maven project, only one service holds
:8080, code blocks run through your agent and not your clipboard. Not one of them gets a slide. The
single slide under it, `deck-step0-backend-herrings`, raises a fourth claim the divider never made.
`welcome` is the same shape one degree softer: four claims, and the one slide under them is a fifth
thing.

That is a room being told four things and shown none of them, twice. It is also what makes the deck
feel thin: the dividers are doing all the work and the deck has nowhere to slow down.

## Finding 5 — the room is told to set its assistant and never asked to do it

`deck.welcome.divider.2` is "Set your assistant behind the cogwheel". It is one bullet in a list of
four, on a divider that is on screen for ten seconds. This is the one action every single person in
the room must take before step 1, it is step 0's whole reason for owning the `data-assistant` rule
(`step0/CLAUDE.md`, first paragraph), and getting it wrong means a Copilot student reads Claude Code
filenames for the rest of the day. There is no slide the tutor can stop on while the room actually
does it.

**Caution for whoever writes this slide.** `step0/CLAUDE.md` records that the prose deliberately
stopped listing the panel's rows, because it listed four while `SettingsMenu` renders five (language,
assistant, mode, presentation, reset) and a list has to be kept in step. Do not put that list on a
slide: it recreates the exact maintenance problem the step rejected. The slide is one action plus one
cost, and the cost is the one row the prose still names by what it does: reset clears the captured
flags and the finished pages.

## Finding 6 — two named rules are worded one way on the page and another on the board

| unit | slide |
|---|---|
| "One flag, one session." | "One flag per session" |
| "Price the hunt when it is over." | "Price the hunt afterwards" |

Rules 1, 2 and 4 match their unit lead-ins. These two do not, and they are rules a student is meant
to carry in their head for the rest of the course. Dutch drifts the same way (`Eén flag, één sessie`
against `Eén flag per sessie`). One string each. Note the direction of travel `audit.md` item 25
already records: the deck's one-line versions have been pulling sentences *out* of the prose, so this
is worth closing before it closes itself the wrong way.

## Finding 7 — the herrings slide drops the scope that makes it true

Unit: "**From step 1 on**, watch out for red herrings: a string in braces is not always the one you
are after." Slide: "Not every braced string is <hi>the flag</hi>", unqualified, as the closing slide
of the module whose own two pages contain two braced strings that *are* the answers
(`{f1r5t-5t3p5}`, `{34513r-t1m3}`). A room that takes the slide literally distrusts the two codes it
is about to type in. One `note` fixes it.

## Text quality

Clean. Fifteen deck strings, no em-dashes in either language, no tricolons, no "not just X", no
announcing openers, no empty intensifiers. `deck.welcome.divider.4` ("Your agent hunts it, your
browser grades it") and `deck.backend.divider.3` ("Code blocks run through your agent, not your
clipboard") are the two best lines in the deck and are exactly what a slide is for: a claim that only
lands out loud. Markup is `<hi>`/`<mute>` only, correctly placed on the term that carries the line.
No findings here.

## Correctness

- **Slide ids:** all 109 ids across the four decks plus `deck-opening` are unique. Step 0's five are
  step-prefixed (`deck-step0-…`) as required, with step 1 keeping the legacy bare names. Clean.
- **Namespace:** every step 0 slide passes `ns: 'step0'`; no deck string sits in `ui`. Clean.
- **Dutch:** all fifteen `deck.*` keys present in `nl.json`, no orphans in either direction, and they
  sit in the same block order as `en.json`. Clean.
- **Kinds and ground:** one `title` (the only dark card), two `divider`s, two `statement`s. Both
  dividers carry `points`. `deck-step0-welcome-rules` is a `statement` carrying five points, which
  `front/CLAUDE.md` blesses by name ("the house rules"). No slide carries both `note` and `points`.
  Clean.
- **Factual:** "Each step is its own Maven project" (four projects, no aggregator) and "Only one
  service holds :8080" both check out against the root `CLAUDE.md` and the poms. The wording "only
  one *service*" correctly survives the fact that `step0/java` and `step3/java` run none.

## Proposed slides

Ten slides for two units puts step 0 at 5.0 per unit, in line with the course. Order below is the
unit's own section order, which is also the order `step0/CLAUDE.md` defends (legend before rules).
Existing slides marked as such; only the changed fields are listed for those.

### S1 `deck-step0-title` — unchanged

### S2 `deck-step0-welcome` (divider) — two edits

- `eyebrow: 'deck.title'` (Finding 3).
- `deck.welcome.divider.1` rewritten to carry all three ways of reading, not two:
  - en: `Read it alone, in class, or later as <mute>reference</mute>`
  - nl: `Lees het alleen, in de les, of later als <mute>naslag</mute>`

Points 2, 3 and 4 stay as they are.

### S3 `deck-step0-welcome-settings` (statement, new)

```
{ id: 'deck-step0-welcome-settings', kind: 'statement', ns: 'step0',
  eyebrow: 'welcome.title', title: 'deck.welcome.settings.title',
  note: 'deck.welcome.settings.note' }
```

- `deck.welcome.settings.title` en: `Set your assistant <hi>now</hi>, before anything else`
  nl: `Zet nu je assistent, <hi>voor je begint</hi>`
- `deck.welcome.settings.note` en: `Same cogwheel: reset throws your captured flags and finished pages away.`
  nl: `Zelfde tandwiel: reset gooit je gevangen flags en afgewerkte pagina's weg.`

One action, one cost. No list of panel rows (see the caution under Finding 5).

### S4 `deck-step0-welcome-flag` (statement, new)

```
{ id: 'deck-step0-welcome-flag', kind: 'statement', ns: 'step0',
  eyebrow: 'welcome.title', title: 'deck.welcome.flag.title',
  note: 'deck.welcome.flag.note' }
```

- `deck.welcome.flag.title` en: `A flag looks like this: <hi>{f1r5t-5t3p5}</hi>`
  nl: `Een flag ziet er zo uit: <hi>{f1r5t-5t3p5}</hi>`
- `deck.welcome.flag.note` en: `Braces and all, into the box on the page. Your browser checks it.`
  nl: `Mét accolades, in het veld op de pagina. Je browser controleert het.`

Reveals nothing: this code is plaintext in the unit HTML and in the quiz question in both languages.
It is not the intro flag and the prohibition is untouched. It repairs the first half of Finding 1.
Note the heading renders in Figtree rather than mono, since slide headings have no mono variant;
`deck.backend.divider.2` already sets that precedent with `:8080` and it reads fine.

### S5 `deck-step0-welcome-hint` (statement, new)

```
{ id: 'deck-step0-welcome-hint', kind: 'statement', ns: 'step0',
  eyebrow: 'welcome.title', title: 'deck.welcome.hint.title',
  note: 'deck.welcome.hint.note' }
```

- `deck.welcome.hint.title` en: `Every box carries a <hi>Hint</hi>`
  nl: `Elk veld heeft een <hi>Hint</hi>`
- `deck.welcome.hint.note` en: `In class, ask before you press it. Your tutor can see where the room is stuck.`
  nl: `In de klas: vraag het eerst. Je tutor ziet waar de groep vastzit.`

This is `welcome.hints.2`, the one paragraph in the unit written *for* the class, which guided mode
deletes before anyone reads it (`data-audience="guided"` prose is prose nobody sees). The deck is the
only place it can survive.

### S6 `deck-step0-welcome-legend` (figure, new)

```
{ id: 'deck-step0-welcome-legend', kind: 'figure', ns: 'step0',
  eyebrow: 'welcome.title', title: 'deck.welcome.legend.title',
  figure: <Legend />, scale: 1.9 }
```

- `deck.welcome.legend.title` en: `Three marks worth stopping for`
  nl: `Drie tekens om bij stil te staan`

`Legend` is three list rows in rem-sized DOM, so it is on the small side of the figures here; 1.9 is
a starting value to correct by eye, in the same way step 1's scales were. It writes nothing to
storage. It must sit **before** S8 (the house rules), because rule three's coin needs its meaning
first, which is the placement `step0/CLAUDE.md` defends on the page.

### S7 `deck-step0-welcome-boards` (statement, new)

```
{ id: 'deck-step0-welcome-boards', kind: 'statement', ns: 'step0',
  eyebrow: 'welcome.title', title: 'deck.welcome.boards.title',
  note: 'deck.welcome.boards.note' }
```

- `deck.welcome.boards.title` en: `Some flags are <hi>hidden</hi>. Some are <hi>printed by a build</hi>.`
  nl: `Sommige flags zitten <hi>verstopt</hi>. Andere worden <hi>door een build geprint</hi>.`
- `deck.welcome.boards.note` en: `Both go into the board. It grades in your browser, with the service down.`
  nl: `Allebei gaan ze in het bord. Dat kijkt na in je browser, ook met de service uit.`

That two-provenance split is the load-bearing claim of `How workshops work`, it is what step 1's
board and step 2's workshop are each built on, and right now the deck compresses it to
"your browser grades it".

**Ambitious variant, if a figure agent is working `welcome` anyway.** `audit.md` item 25 records that
`welcome` no longer closes on a figure. One drawing would settle a claim the reader currently takes on
trust and would give this deck a second figure: a flag's two routes (hidden in source / printed by a
build) meeting at one answer box, with the hash check drawn on the browser side of the line. If that
figure lands in the unit, this slide becomes `kind: 'figure'` with the same title and no note.

### S8 `deck-step0-welcome-rules` (statement) — existing, two string edits

- `deck.welcome.rules.3` en: `One flag, one session` / nl: `Eén flag, één sessie`
- `deck.welcome.rules.5` en: `Price the hunt when it is over` / nl: `Reken de jacht af als ze voorbij is`

Board and page then say the rules the same way (Finding 6).

### S9 `deck-step0-backend` (divider) — one edit

- `eyebrow: 'deck.title'` (Finding 3). Points unchanged: all three are good lines.

### S10 `deck-step0-backend-run` (statement, new) — the constraint call

```
{ id: 'deck-step0-backend-run', kind: 'statement', ns: 'step0',
  eyebrow: 'backend.title', title: 'deck.backend.run.title',
  note: 'deck.backend.run.note' }
```

Version A, inside the existing constraint (names the deed, never the finding, on step 2's precedent):

- `deck.backend.run.title` en: `Your agent runs the build. <hi>The build prints the flag.</hi>`
  nl: `Je agent draait de build. <hi>De build print de flag.</hi>`
- `deck.backend.run.note` en: `Open the project under kata/step0/java and hand it the block on the page. Nothing to solve.`
  nl: `Open het project onder kata/step0/java en geef het blok van de pagina door. Er valt niets op te lossen.`

Version B, if the constraint is revisited: the same slide with the two-line block as the note,
`cd kata/step0/java` / `mvn verify -Pintro`. This is the only thing that makes step 0's exercise
doable in a room today, since guided mode deletes the block from the page. **Do not ship Version B
without the decision being taken deliberately and written into `step0/CLAUDE.md`,** and prefer
repairing the unit (put the block behind a figure marker so it survives the guided cut) if that edit
is on the table, because then Version A is enough and the constraint stands untouched.

Either way the flag itself never appears on the board.

### S11 `deck-step0-backend-herrings` (statement) — existing, one addition

- add `note: 'deck.backend.herrings.note'`
  en: `From step 1 on. In this step, both codes in braces are the answer.`
  nl: `Vanaf stap 1. In deze stap zijn beide codes tussen accolades het antwoord.`

## What I checked and found nothing wrong with

- The exclusion of `CodeCheck` from every slide. It writes `kata.step0.<id>.v2` to localStorage on
  every solve; the deck rule is a rule and not a list, and this deck applied it correctly.
- `deck-step0-welcome-rules` carrying five points on a `statement`. Explicitly blessed.
- Every English deck string, for AI tells. Clean.
- Id uniqueness across all 110 slides, namespace placement, and Dutch parity. Clean.
- The three factual claims on `deck-step0-backend`. All three check out against the repo.
