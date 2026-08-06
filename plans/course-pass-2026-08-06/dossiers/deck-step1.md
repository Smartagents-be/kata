# Dossier: step 1's presentation deck

Subject: `front/src/steps/step1/deck.tsx` plus the `deck.*` keys in
`front/src/steps/step1/locales/{en,nl}.json`.
Read first: `front/CLAUDE.md` §"The presentation deck", `front/src/steps/step1/CLAUDE.md`,
all ten unit HTML files, `shared/deck/slide-spec.ts`, `shared/deck/SlideTemplate.tsx`,
`shared/deck/slides.tsx`, and `audit.md` items 48 and 4.

**Verdict: needs-work.** The machinery is excellent and the voice is the house voice. What is
wrong is coverage and, in a handful of places, density. 48 slides across ten units, and seven
load-bearing sections of the curriculum have no slide at all: `prompt`'s reasoning level and
meta-prompting, `tools`'s "the list itself is in the window", `context`'s "why this bites hardest
in code", `session`'s "the window is not your memory", `truth`'s `Proof`, and three of `model`'s
seven sections (`Speed`, `API vs subscription`, and the `cost.4` multiplication). Two blocks are
so thin they read as placeholders: `session` gets three slides for a four-section unit, `workshop`
gets two for the step's capstone. And five divider points are restated verbatim or near-verbatim
by the slide that immediately follows them, which is the divider rule working against itself.

## What is right, and must not be "improved"

Stated up front because several of these look like gaps until you read the reasoning.

- **Figure reuse is the deck's best idea and it is executed properly.** 26 of the step's 37
  figure components are on slides, rendered as the unit renders them. The interactive ones stay
  interactive, which is what makes `NextToken` and `BundleCompare` worth putting on a board at all.
- **The seven localStorage absences are correct and correctly explained.** `CutItUp`,
  `SurviveTheClear`, `ConnectOne`, `ReadYourWindow`, `OneWindow`, `FlagBoard`, `ShutterFlag`.
  Verified: all seven write progress; a slide would tick the tutor's machine.
- **`McpOvals`'s absence is correct and explained** (it restates `McpParts` and only earns that
  next to the paragraph saying why).
- **`deck-truth-sounds-same` leading its block** is right, and the reason in the code comment is
  the right reason.
- **`deck.tokens.pick.title` being a flat label** is right. The answer is the exercise.
- **`deck-model` carrying no version numbers** matches the unit's own rule.
- **`AnswerProvenance` magnified less than `TrainedOrGrounded`** is right and the comment
  explaining `SlideFigure`'s clip is the sort of note this repo is good at.
- **Locale hygiene is clean.** All 84 `deck.*` keys used by `deck.tsx` exist in `en.json` and
  `nl.json`; no orphans in either direction; no key in `ui` that should be in `step1`; no
  em-dashes in any deck string in either language. Nothing to fix here.
- **Slide ids are unique deck-wide.** Checked across all four `deck.tsx` files: no collisions.
  Step 1 correctly keeps the legacy bare `deck-<unit>` names and correctly prefixes only its
  module card (`deck-step1-title`).
- **Numbers check out.** 7 choose 2 = 21 and 14 choose 2 = 91 (`deck.tokens.attention.note`);
  `SessionMakeup` totals 4,913 tokens of which the student typed 23, so "half a percent"
  (`deck.session.divider.2`) is honest; `BudgetWindow` genuinely has two right calls
  (`deck.tools.budget.title`); `PatternMatch` and `PickTheTier` questions match their boards.

---

## Findings

### F1 — `SpotInjection` is absent from the deck and the file does not say why (record defect)

`deck.tsx`'s header states: *"Seven are deliberately absent"*, then enumerates the five TaskCards
and two boards, then explains `McpOvals` separately. That accounts for eight. **Three more figures
are absent and none of them is named**: `SpotInjection`, `SessionWindows`, and `usage-readout`.

For `SessionWindows` and `usage-readout` there is a reason and it is a good one, but it is written
down in `audit.md` (item 48) rather than in the file that omits them: *"the deck has no assistant
filter, so a tutor teaching Copilot would get figures that contradict the room."* Verified:
`SlideSpec` has no assistant field and `slides.tsx` does no filtering. Step 2's deck was
specifically credited by that same audit item for **recording** its equivalent absences
(`LoopInWindow`, `WorktreeEach`). Step 1's does not, so a future editor reads the enumeration,
counts eight, and cannot tell whether the other three were judged or forgotten.

For `SpotInjection` there is no reason anywhere. It is not prior art: audit item 48 lists the
drawings with no slide across the whole course and does not name it. It is the same shape as
`deck-tools-budget`, which is on the deck: same unit, same "Test yourself" run, graded in the
browser, shuffled once per mount, and **no localStorage write** (checked). The `tools` block
already carries a statement about prompt injection with no drawing under it; the drawing exists.

Fix: F1a add the slide (below), and F1b amend the header comment so it accounts for every absence.
If the slide turns out not to fit (it is four stacked result cards, the tallest DOM figure in the
step), then the honest outcome is F1b alone, with the reason written beside `McpOvals`'s.

### F2 — Five divider points are said again, verbatim, by the slide right after them

The deck-wide rule is that a divider states the unit's claims and *the slides after it are the
proof*. In five places the next slide is not proof, it is the same sentence:

| Divider point | Slide that repeats it | Distance |
|---|---|---|
| `deck.session.divider.2` "You typed half a percent of it" | `deck.session.makeup.title` "You typed half a percent of it" | 1 slide |
| `deck.recap.divider.2` "All of it shared one window" | `deck.recap.one-window.title` "It was all one window" | 1 slide |
| `deck.tools.divider.1` "The tool runs outside, the result lands inside" | `deck.tools.in-context.title` + `.note` | 1 slide |
| `deck.recap.divider.3` "Next: how you hand over the work" | `deck.recap.next.title` "…how you hand it work" | 3 slides |
| `deck.tools.divider.3` "The least trustworthy thing in the window" | `deck.tools.injection.title` | 4 slides |

This is drift rather than authorship: the `points` requirement arrived after the slide titles, at
the tutor's asking, so the collisions were not written on purpose. The worst is `recap`, where a
four-slide block carries three claims and says every one of them twice.

Fix: retitle the repeating slide, not the divider point (the divider is where the claim belongs).
See P10, P17 and P18.

### F3 — `deck-harness-cache` is wedged between the four patterns and the exercise on them

Unit order in `harness.html` is: lead, "Which harness you run", **Caching**, "How a harness splits
the work" (decomposition, coordinator, sequential, reflection), `CutItUp`, `PatternMatch`.

Deck order is: divider, decomposition, coordinator, sequential, reflection, **cache**, patterns.

So caching has been moved from *before* the four patterns to *between the fourth pattern and the
exercise that tests all four*. Nothing in `deck.tsx` records a reason, and `audit.md` line 239
states the practice as "`deck.tsx` is authored in unit order". A tutor running the four pattern
figures then has to break stride for a slide about prefix caching before asking the room "Which
pattern fits?". Fix: P11.

### F4 — Two harness slides are bare labels with nothing under them

`deck-harness-coordinator` reads "The coordinator" and `deck-harness-sequential` reads "The
sequential workflow". No claim, no note. Compare their neighbours: `deck-harness-decomposition`
carries "What you ask for is always thinner than what you want" and `deck-harness-reflection`
carries a note. The house standard here is that a heading is *the one thing the slide says*, and a
pattern's name is not a thing the slide says: it is a caption the room can read off the drawing
faster than the tutor can say it.

Both units have a claim available and neither is currently on the board:

- coordinator: a sub-agent starts blank and refetches whatever it was not told, which is where the
  pattern gets expensive. This is `deck.harness.divider.3`, promised and never proved.
- sequential: reach for it when the steps depend on each other, and it costs you the whole window.

Fix: P12 and P13 (notes, not new slides).

### F5 — `model` is the worst-covered unit in the step

Seven sections and five figures; four slides. Three whole sections have nothing on the board:

- **`model.cost.4`**, the one paragraph in the entire course that multiplies: the `/context` count
  from the `context` unit against the table's rate. This is the single best out-loud moment in the
  step. A tutor can do it live with the room's own number. It is not on the deck. (P14)
- **`API vs subscription`**, four paragraphs. Its claim, "the tokens are the same either way, what
  differs is whether you can see them", is exactly a statement slide, and unlike the five-hour
  window it is true for both assistants. (P16)
- **`Speed`**, two paragraphs, including "a fast wrong answer costs you the run it broke plus the
  second run to fix it". (P15)

Plus `model.let-it-pick.2` (providers fine-tune the small tiers on the big one's output), which is
the *reason* the coordinator saving works and is a fact rooms enjoy. (P19, lower priority.)

The five-hour window section is F1's problem, not this one: the reason for its absence is sound,
it is just unrecorded.

### F6 — `prompt`'s divider promises reasoning level and the block never delivers it

`deck.prompt.divider.2` reads "Reasoning level absorbs imprecision, at a price". Nothing in the
`prompt` block proves it. The only reasoning-level slide in the deck is `deck-model-reasoning`,
four units later, and that one exists to keep the two dials apart ("Reasoning level is **not** the
tier"), which per `step1/CLAUDE.md` is the whole reason that section exists. A boundary slide is
not an introduction. (P2)

Meta-prompting is a second hole in the same block: a named technique with its own `<h2>`, its own
claim ("spend an expensive model on this, writing a prompt is a few hundred tokens next to
executing one"), and no slide. It is also what makes `deck-prompt-plan` land, since plan mode *is*
meta-prompting the provider already built. (P3)

### F7 — `deck-prompt-plan` sits out of order and closes a block it does not close in the unit

In the unit, plan mode comes before "What you steer after that" (bundle, be exact). On the deck
the plan payoff is last, after bundle and exact. The divider's own points run layer → reasoning →
moves, so the block contradicts its own divider's ordering as well as the unit's. Fix: P4.

Same shape, smaller, in `context`: `deck-context-falloff` (amnesia) runs before
`deck-context-entropy`, and the unit has entropy first. Low priority; note it, do not necessarily
move it, since the entropy statement reads well as the block's closer.

### F8 — `truth`'s `Proof` section has no slide

Four sections in `truth`: `The cutoff`, `Grounding`, `Proof`, `Hallucinations`. The block has a
statement (which covers the lead and the cutoff), then the two figures (grounding and
hallucinations). `Proof` is the third, it is `deck.truth.divider.3` ("Ask for the check, not the
conclusion"), it is one of the eight `recap` bullets, and there is no slide.

`step1/CLAUDE.md` says `Proof` is "deliberately left undrawn" because "running a command is
something the student does rather than something to look at". That reasoning is about a **figure**.
A statement slide is precisely the vehicle for a claim with no shape, and the deck already uses it
that way for caching, entropy and the reasoning boundary. (P20)

### F9 — `session` is the thinnest block relative to its unit, and `workshop` is thinner still

`session` is a four-section, 821-word unit and gets three slides, one of which is the divider and
one of which repeats a divider point (F2). Its closing claim, `session.window-not-memory.3`
("Careful session management is most of what separates people who get good work out of an agent
from people who fight it. Not a bigger model, not a longer prompt"), is the best line in the unit
and is a line that only lands out loud. Nothing on the board carries it, and nothing carries
"anything that has to survive a clear belongs somewhere other than the transcript" either. (P9)

`workshop` is the step's capstone and gets a divider plus one statement. The TaskCard rule
correctly keeps `OneWindow` and `FlagBoard` off, but `OneWindow`'s fourth move, *which flag could
you have handed over whole*, is a debrief question. A question to the room is the purest form of
"what only works out loud", and the deck does not have one anywhere after the opening slide. (P21)

### F10 — `context` loses its sharpest claim and its best story

Two sections with nothing on the board:

- **"Why this bites hardest in code"**: there is far more bad code on the internet than good, and
  frequency is the only signal the model has. This is the claim that explains everything else in
  the step and it is not on a slide.
- **The bug hunt** in `bad-context-bad.4`: kill the bug, the whole hunt stays in the window, the
  model reads the dead code as live and puts the bug back. It is the step's best narrative and it
  is what `deck.context.divider.2` ("Wrong context is worse than missing context") promises. The
  entropy statement's note covers "lost in the middle", which is a different claim.

(P7, P8)

### F11 — `tools`'s divider point 2 is unproved, and the course's only tool-count number is off the board

`deck.tools.divider.2` reads "A tool costs you **by existing**". The `tools` block goes
in-context → mcp → parts → injection → budget, and none of those is that claim. `BudgetWindow` is
about which calls to make, not about descriptions riding along uncalled.

`tools.list-itself-window.4` is, per `step1/CLAUDE.md`, "the only number the course puts on a tool
count": four or five in one context, past that give the job its own specialised agent. That is a
rule of thumb a room writes down, and it is on no slide. (P5)

### F12 — `tokens`'s one prose argument is not on the board until the recap

`tokens` is four figures and one exercise, all five on the deck, plus a divider. The one thing the
unit argues in prose rather than drawing is `not-words.3`: the vocabulary came from the training
pile, so what breaks into fragments is what the model read least of, so ask in the language it has
read most of. `step1/CLAUDE.md` is explicit that this belongs in prose and not in `TokenSplit`,
and that it is deliberately kept out of the figure.

It is recap bullet 1 and it appears in `deck.recap.moves.note`. So on the board a room meets the
step's first piece of actionable advice for the first time at the very end, with the argument for
it eight units behind them. (P1)

### F13 — one small rule stretch worth noting, not necessarily fixing

`deck-context-entropy`'s note ("Nothing was deleted. The deciding line is still in there…") is not
a qualifier on its title ("Disorder rises every turn unless someone spends energy"). It is a
second, separate claim: lost in the middle. `note` is documented as being for "claims that lose
their meaning without a qualifier". Two options: split into two slides, or leave it, since both
halves are `context.entropy` and the tutor is going to say both anyway. My read: leave it. Named
here so nobody "discovers" it later.

### Observation, not a finding

All ten dividers carry exactly three points. The rule allows three to five and `deck.tsx` says
"two or three". Ten out of ten at three is the kind of symmetry the brief calls out as a tell,
and some units genuinely have two claims (`workshop`) or four (`tools`). I am **not** proposing
evening this out in either direction: forcing variety is worse than the symmetry. But if a unit's
points are ever rewritten, do not preserve the three out of tidiness.

---

## Proposed slides

Placement is given relative to the existing array. Scales are starting values, to be corrected by
eye, as the file's own header says. Every new key needs both `en` and `nl`.

### tokens

**P1** — insert after `deck-tokens-split`.

```
id:      'deck-tokens-language'
kind:    'statement'
ns:      'step1'
eyebrow: 'tokens.title'
title:   'deck.tokens.language.title'
note:    'deck.tokens.language.note'
```
- en title: `Ask in <hi>the language it has read most of</hi>`
- en note: `The vocabulary came out of the training pile. What breaks into fragments is what the model read least of, and the answers are shakier for it.`
- nl title: `Vraag het in <hi>de taal die het model het meest gelezen heeft</hi>`
- nl note: `Het vocabulaire komt uit de trainingsstapel. Wat in fragmenten uiteenvalt, is wat het model het minst gelezen heeft, en de antwoorden zijn daar wankeler om.`

Closes F12. Do **not** be tempted to put a Dutch row into `TokenSplit` instead; `step1/CLAUDE.md`
forbids it explicitly and gives the reason.

### prompt

**P2** — insert after `deck-prompt-in-context`.

```
id:      'deck-prompt-reasoning'
kind:    'statement'
eyebrow: 'prompt.title'
title:   'deck.prompt.reasoning.title'
note:    'deck.prompt.reasoning.note'
```
- en title: `Turn it up and the model <hi>reflects</hi> instead of answering`
- en note: `That absorbs some of what you left out. The thinking tokens stay in the window and stay on the bill.`
- nl title: `Zet je het hoger, dan <hi>reflecteert</hi> het model in plaats van te antwoorden`
- nl note: `Dat vangt op wat je niet gezegd hebt. De denk-tokens blijven in het venster staan en blijven op de rekening staan.`

Closes F6's first half. Keep it about what the level *is* and what it costs; the *distinction*
from the tier stays `deck-model-reasoning`'s job, four units on. Do not let the two collide.

**P3** — insert after P2.

```
id:      'deck-prompt-meta'
kind:    'statement'
eyebrow: 'prompt.title'
title:   'deck.prompt.meta.title'
note:    'deck.prompt.meta.note'
```
- en title: `Let <hi>the expensive model</hi> write the prompt`
- en note: `A few hundred tokens next to executing one. Running the task is where the money goes.`
- nl title: `Laat <hi>het dure model</hi> de prompt schrijven`
- nl note: `Een paar honderd tokens, naast het uitvoeren ervan. Het geld gaat naar het draaien van de taak.`

**P4** — move `deck-prompt-plan` to sit directly after P3, ahead of `deck-prompt-bundle`. No key
changes. Closes F7 and gives the plan payoff the setup it needs: meta-prompting, then plan mode as
the version the provider already built, then the moves.

### tools

**P5** — insert after `deck-tools-parts`, before `deck-tools-injection`.

```
id:      'deck-tools-list'
kind:    'statement'
eyebrow: 'tools.title'
title:   'deck.tools.list.title'
note:    'deck.tools.list.note'
```
- en title: `The list itself is <hi>in the window</hi>`
- en note: `Every description rides along on every message, called or not. Four or five tools is the most one context holds well.`
- nl title: `De lijst zelf staat <hi>in het venster</hi>`
- nl note: `Elke beschrijving reist mee met elk bericht, aangeroepen of niet. Vier of vijf tools is het meeste dat één context goed houdt.`

Closes F11. Keep it to the tool list: `harness` owns what a sub-agent costs, so no coordinator or
refetch sentence may follow the number in here.

**P6** — insert after `deck-tools-injection`.

```
id:          'deck-tools-spot'
kind:        'figure'
eyebrow:     'tools.title'
title:       'deck.tools.spot.title'
figure:      <SpotInjection />
scale:       0.95
figureWidth: 1450
```
- en title: `Pick the odd one out`
- nl title: `Kies de vreemde eend`

Closes F1a. **The title must not name what makes it odd.** `step1/CLAUDE.md` is explicit: naming
the instruction aimed at the agent turns four results into a search for one sentence. Reusing the
exercise's own `spot.title` wording is the safe move and matches the `deck.tokens.pick.title`
precedent. It is the tallest DOM figure in the step (four stacked cards of mono text plus a
button), so fit it by eye; if it will not read from the back of the room, drop the slide and do
F1b alone.

**F1b** (no slide) — rewrite the "Seven are deliberately absent" paragraph in `deck.tsx`'s header
so it accounts for all absences: the seven localStorage writers, `McpOvals`, and then
`SessionWindows` and `usage-readout` with the reason `audit.md` item 48 already gives (the deck
has no assistant filter, so a Claude-only figure would contradict a Copilot room). This is the
single cheapest and highest-value change in this dossier.

### context

**P7** — insert after `deck-context-oneshot`.

```
id:      'deck-context-bad-code'
kind:    'statement'
eyebrow: 'context.title'
title:   'deck.context.bad-code.title'
note:    'deck.context.bad-code.note'
```
- en title: `There is <hi>far more bad code</hi> on the internet than good`
- en note: `Good and bad are not labels in the training data. Frequency is the only signal, so a vague question returns the statistical middle of everything ever written.`
- nl title: `Er staat <hi>veel meer slechte code</hi> op het internet dan goede`
- nl note: `Goed en slecht zijn geen labels in de trainingsdata. Frequentie is het enige signaal, dus een vage vraag levert het statistische midden van alles wat er ooit geschreven is.`

**P8** — insert after `deck-context-diagram`.

```
id:      'deck-context-stale'
kind:    'statement'
eyebrow: 'context.title'
title:   'deck.context.stale.title'
note:    'deck.context.stale.note'
```
- en title: `Nothing in the window says <mute>stale</mute>`
- en note: `Kill the bug and the whole hunt stays in there. Ask for the next thing and the model reads the dead code as live.`
- nl title: `Niets in het venster zegt <mute>verouderd</mute>`
- nl note: `Los de bug op en de hele jacht blijft erin staan. Vraag het volgende en het model leest die dode code als levend.`

P7 and P8 close F10. If only one lands, take P7: it is the claim the rest of the step rests on.

### session

**P9** — insert after `deck-session-clear`.

```
id:      'deck-session-memory'
kind:    'statement'
eyebrow: 'session.title'
title:   'deck.session.memory.title'
note:    'deck.session.memory.note'
```
- en title: `The window is <hi>not your memory</hi>`
- en note: `Knowing what is in it right now, and being willing to throw it away, is most of what separates people who get work out of an agent from people who fight it.`
- nl title: `Het venster is <hi>niet je geheugen</hi>`
- nl note: `Weten wat er nu in staat, en bereid zijn het weg te gooien, is het grootste verschil tussen mensen die werk uit een agent krijgen en mensen die ertegen vechten.`

**P10** — retitle `deck-session-makeup` so it stops repeating `deck.session.divider.2`. Same key,
new value:
- en: `Two bars in that stack are <hi>yours</hi>`
- nl: `Twee balken in die stapel zijn <hi>van jou</hi>`

The "half a percent" line stays on the divider, where the claim belongs. Closes F2's worst
one-slide-apart case and F9's first half.

### harness

**P11** — move `deck-harness-cache` to sit directly after the `deck-harness` divider, ahead of
`deck-harness-decomposition`. No key changes. Closes F3 and restores unit order; the four pattern
figures then run uninterrupted into `deck-harness-patterns`.

**P12** — add a `note` to `deck-harness-coordinator`:
```
note: 'deck.harness.coordinator.note'
```
- en: `A sub-agent starts blank. One base instruction is all it gets, and whatever it was not told it fetches again.`
- nl: `Een sub-agent begint blanco. Eén basisinstructie is alles wat hij krijgt, en wat hij niet verteld kreeg, haalt hij opnieuw op.`

**P13** — add a `note` to `deck-harness-sequential`:
```
note: 'deck.harness.sequential.note'
```
- en: `For steps that depend on each other. One session carries the whole run, so a long workflow is a full window by the end.`
- nl: `Voor stappen die van elkaar afhangen. Eén sessie draagt de hele run, dus een lange workflow is aan het eind een vol venster.`

P12 and P13 close F4 without adding slides.

### model

**P14** — insert after `deck-model-pricing`.

```
id:      'deck-model-money'
kind:    'statement'
eyebrow: 'model.title'
title:   'deck.model.money.title'
note:    'deck.model.money.note'
```
- en title: `Your own window, <hi>in money</hi>`
- en note: `The count /context printed you, against the rate above. That is one turn, before it has written a word.`
- nl title: `Je eigen venster, <hi>in geld</hi>`
- nl note: `Het getal dat /context je gaf, tegen het tarief hierboven. Dat is één beurt, voordat het model één woord geschreven heeft.`

The best slide in this dossier. It is the one place the course multiplies, and on a board the
tutor can do it with the room's own number. Carry no currency in the slide text: `ModelPricing`
one slide up is the only number in the course with one, and `model.cost.4` deliberately has none
either.

**P15** — insert after P14.

```
id:      'deck-model-speed'
kind:    'statement'
eyebrow: 'model.title'
title:   'deck.model.speed.title'
note:    'deck.model.speed.note'
```
- en title: `Where <hi>quick</hi> stops being cheap`
- en note: `The small tier answers four to five times faster. A fast wrong answer costs you the run it broke and the run that fixed it, and you paid for both.`
- nl title: `Waar <hi>snel</hi> ophoudt goedkoop te zijn`
- nl note: `De kleine tier antwoordt vier tot vijf keer sneller. Een snel fout antwoord kost je de run die het brak en de run die het herstelde, en je betaalde voor allebei.`

**P16** — insert after P15.

```
id:      'deck-model-billing'
kind:    'statement'
eyebrow: 'model.title'
title:   'deck.model.billing.title'
note:    'deck.model.billing.note'
```
- en title: `The tokens are the same. <hi>Whether you can see them</hi> is not.`
- en note: `A key shows you the number growing while you work. A plan hides it until the limit, and then the cost arrives as waiting.`
- nl title: `De tokens zijn dezelfde. <hi>Of je ze kunt zien</hi> niet.`
- nl note: `Een key laat het getal groeien terwijl je werkt. Een abonnement verbergt het tot de limiet, en dan komt de kost aan als wachten.`

No prices, no plan names, no currency: that is the section's own rule and it holds harder on a
slide than on the page.

**P19** (lower priority) — insert after `deck-model-reasoning`.

```
id:      'deck-model-relay'
kind:    'statement'
eyebrow: 'model.title'
title:   'deck.model.relay.title'
note:    'deck.model.relay.note'
```
- en title: `The small tiers were trained on <hi>the big one's output</hi>`
- en note: `Which is why an expensive model writing the brief is writing for something trained on its own answers.`
- nl title: `De kleine tiers zijn getraind op <hi>de output van de grote</hi>`
- nl note: `Daarom schrijft een duur model dat de opdracht opstelt, voor iets dat op zijn eigen antwoorden getraind is.`

P14 through P16 close F5. Even with all four, `model` sits at eight slides for a seven-section,
five-figure unit, which is proportionate against `harness`'s seven and `tools`'s seven.

### truth

**P20** — insert after `deck-truth-provenance`.

```
id:      'deck-truth-proof'
kind:    'statement'
eyebrow: 'truth.title'
title:   'deck.truth.proof.title'
note:    'deck.truth.proof.note'
```
- en title: `Ask for <hi>the check</hi>, not the conclusion`
- en note: `Not "does this handle an empty list", but a test that goes red on an empty list. Only one of those can fail in front of you.`
- nl title: `Vraag om <hi>de check</hi>, niet om de conclusie`
- nl note: `Niet "gaat dit om met een lege lijst", maar een test die rood wordt op een lege lijst. Maar één van die twee kan voor je ogen falen.`

Closes F8. Placing it after the two figures keeps the block's documented shape (claim, then the
two measurements) and lets `Proof` land as the answer the room has been waiting for since the
opening statement. It also hands straight into the `workshop` divider.

### workshop

**P21** — insert after `deck-workshop-flags`.

```
id:      'deck-workshop-debrief'
kind:    'statement'
eyebrow: 'workshop.title'
title:   'deck.workshop.debrief.title'
```
- en title: `Which flag could you have <hi>handed over whole</hi>?`
- nl title: `Welke flag had je <hi>in zijn geheel kunnen doorgeven</hi>?`

No note: it is a question to the room, and the second line is exactly what the opening slide had
removed. Closes F9's second half. It is `OneWindow`'s fourth move, so it stays a look-back and the
tutor puts it up after the hunt rather than before it.

### recap

**P17** — retitle `deck-recap-one-window` so it stops repeating `deck.recap.divider.2` one slide
later. Same key, new value:
- en: `Eight units, and every one of them <hi>filled the same window</hi>`
- nl: `Acht units, en elke ervan <hi>vulde hetzelfde venster</hi>`

If that still reads as an echo, the cleaner fix is to **delete the slide**: the divider already
carries the claim and the block is four slides for three claims.

**P18** — retitle `deck.recap.divider.3` so it stops pre-announcing `deck-recap-next` three slides
early. Same key, new value:
- en: `What you learned here <hi>still holds</hi> in step 2`
- nl: `Wat je hier leerde, <hi>geldt daar nog steeds</hi>`

Leaves `deck-recap-next` as the only slide naming step 2, which is what a handoff wants.

---

## Effect on the deck

48 slides now. With everything above: +15 slides (P1, P2, P3, P5, P6, P7, P8, P9, P14, P15, P16,
P19, P20, P21, and F1b costs none), minus 0 or 1 (P17's delete option), plus two notes and two
retitles and two moves. That lands step 1 around 63 slides for ten units, roughly 6 per unit,
against step 2's 42 for ten. Step 1 is the longer step by figure count, so that is defensible, but
if the whole set is too much for one board, the ranking is:

1. **F1b** — the header comment. Costs nothing, prevents the next editor from re-deriving three
   decisions.
2. **P14** — the money slide. The step's best out-loud moment, currently missing.
3. **P11 + P12 + P13** — the harness block. Two moved lines and two notes, and the block goes from
   four figures with two captions to a run a tutor can talk through.
4. **P20** — `Proof`. A section of the curriculum with nothing on the board.
5. **P10 + P17 + P18** — the F2 repeats. Three string edits.
6. **P5, P7, P9, P16** — the four remaining unproved divider points and orphan sections.
7. Everything else.

## Checked and deliberately left alone

- Every `<hi>`/`<mute>` tag in both languages. Both files use only those two, both place them
  where their own word order wants them, and the Dutch is not a gloss of the English in several
  places (`deck.model.tiers.title` "drie karakters" against "three dispositions" is right).
- The dark card rule: exactly one `title` slide in step 1's deck, correct surface, no eyebrow.
- `figureWidth`/`scale` pairs. The three that carry comments (`deck-tokens-next`,
  `deck-truth-grounded`, `deck-truth-provenance`) explain themselves properly; the rest are
  plausible and are a by-eye judgement I cannot make from source.
- `deck.tokens.pick.title` as a flat label, `deck-truth-sounds-same` leading its block,
  `deck-harness-decomposition` having lost its note when the figure arrived. All three are
  documented decisions with the right reasons.
- The absence of a `Where this goes` slide separate from `deck-recap-next`. One is enough.
