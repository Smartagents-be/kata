# Work order: step 3 (soft skills)

Units in registry order: `change`, `expectations`, `impostor`.

Everything an implementer needs is below. Do not go back to the dossiers: where a dossier proposed
something that is not here, it was rejected on purpose and the reason is in that unit's **Do not**.

## Ranking

| rank | unit | effort | why |
|---|---|---|---|
| 1 | `impostor` | heavy | Last page of a 25-unit course that does not know it is. Renders blank in guided mode. One claim wrong for half the readership. Carries the step's whole closing exercise. |
| 2 | `expectations` | heavy | Renders blank in guided mode. Needs a new `quiz.ts`. Nine sentence-level snags and two Dutch defects. |
| 3 | `change` | moderate | Prose is excellent and stays. Four factual corrections, one caption, two slides. No rewriting. |

## Protocol reminders

- **Never open `locales/en.json` or `locales/nl.json` with Edit or Write.** Write a patch at
  `<SCRATCH>/patches/step3/<unit>.json` in the shape the BRIEF gives. Every `en` key needs an `nl` key.
- **You own** `units/<unit>.html` and any NEW `.tsx` you create.
- **You do not own** `index.tsx`, `quiz.ts`, `deck.tsx`. Write what you want done into
  `<SCRATCH>/manifests/step3/<unit>.json`. The deck and registry items below are manifest items;
  they are written out in full so the integrator has to invent nothing.
- No em-dashes. Anywhere. Either language.
- `front/src/steps/step3/CLAUDE.md` needs four recorded decisions changed. See **Step-level items**
  at the foot of this order. Do that work; a silently broken recorded decision is worse than the
  defect it fixes.

---

# 1. `change`

**Effort: moderate.**

The prose here is among the best in the course and none of it is being rewritten for style. Every
edit below is a factual correction, a grammar slip, or a caption that disclaims its own drawing.

## Do

### 1. Rewrite `pipeline-shift.caption`. Highest value in the unit.

The caption currently says "The proportions are illustrative rather than measured." Everything the
drawing proves is a proportion, and the step's `CLAUDE.md` defends this figure as "a measurement
rather than an illustration". The caption argues against the figure in the figure's own voice.

Patch `<SCRATCH>/patches/step3/change.json`:

```
"en": { "pipeline-shift.caption": "The times are illustrative. The scale is not: both rows are drawn against one clock, and the strip under the second is three lanes of output at what one lane cost to read." }
"nl": { "pipeline-shift.caption": "De tijden zijn illustratief. De schaal niet: beide rijen staan op dezelfde klok, en de strook onder de tweede is drie sporen output tegen wat één spoor kostte om na te lezen." }
```

This is exactly the shape `step1`'s `next-token.caption` already ships ("The scores are illustrative.
... The shape is what holds: ..."), so it is house practice, not a new move. It is still provenance:
it says which part of the drawing is invented and which part is not.

### 2. `change.you-test-engineer.2`: fix the ceiling, the attribution and the gloss in one edit.

Three defects in one paragraph. A ceiling does not go *under* anything (and the Dutch repeats the
slip, so neither language rescues the other). `step2/engineering` names only a floor: verified,
`engineering.quality-gates.2` says "a number under the floor comes back as a failure", and the
complexity ceiling lives in `step2/goals` ("Hand over a ceiling: no method above a cyclomatic
complexity of ten"), which this section may not link to because `change` takes one lean per section
and no unit twice. And "which is the point" is the next sentence stated in advance, which blunts the
close.

Replace lines 21-27 of `units/change.html` with:

```html
<p data-i18n="change.you-test-engineer.2">
  So write those down before the implementation exists. The quality gates in
  <a href="/steps/step2/engineering">the engineering unit</a> put a floor under whatever the run
  produced, and the scenarios you add on top are the ones nobody reaches from the happy path.
  Thinking of them is slow. That is the part of the day worth being slow at.
</p>
```

Dutch, same key:

> Schrijf die dus op voor de implementatie bestaat. De quality gates in <a href="/steps/step2/engineering">de unit over vakmanschap</a> leggen een vloer onder wat de run oplevert, en de scenario's die jij erbovenop zet, haalt niemand uit het happy path. Daar ga je traag over doen. Dat is het deel van de dag waar traag goed is.

The ceiling is dropped rather than reattributed. That costs the pairing and buys accuracy, and it
requires the one-line `CLAUDE.md` edit listed at the foot of this order.

### 3. `change.way-working-decision.2`: the PowerPoint item claims more than the repo supports.

Two overstatements in the one list item a student can actually check. The slides are `SlideSpec`
entries in `deck.tsx` rendered by a vendored web component, not "HTML in the repository"; and
`front/CLAUDE.md` is explicit that the deck is "deliberately not a second rendering of the
curriculum" and that **the figures are the one exception**, so only the drawings cannot drift.

Replace the `<li>` at lines 74-79 with:

```html
  <li data-i18n="change.way-working-decision.2">
    <strong>There is no PowerPoint in this course.</strong> The slides live in the repository and
    their drawings are the same figure components the units render, so the picture on the projector
    cannot drift from the one on your screen. Nobody decided PowerPoint was bad. The constraint that
    made it the obvious choice went away.
  </li>
```

Dutch:

> `<strong>Er zit geen PowerPoint in deze cursus.</strong> De slides staan in de repository en hun figuren zijn dezelfde componenten als in de units, zodat het beeld op de beamer niet kan verschillen van dat op jouw scherm. Niemand vond PowerPoint slecht. De reden waarom het de logische keuze was, is weg.`

### 4. `change.business-moves-closer.2`: ground the invented number.

"why a loan renews at fourteen days and not thirty" reads as one more rule from the step 2 loans
domain the student just worked, and it is not one. `Loan` has `daysOverdue`, `renewed`, `lost`,
`media` and `tier`; there is no loan period anywhere in `kata/step2/java`. A student who goes looking
for fourteen finds nothing, in a course whose voice is "name a real file, command or moment".

Verified replacement: `LateFeePolicy` gives `STAFF` a grace of 7 and `STANDARD` a grace of 0.
`step2/workflows` already puts "which tier gets a grace period" in the student's ear.

In line 40, replace `You end up knowing why a loan renews at fourteen days and not thirty.` with:

> You end up knowing why staff get seven days of grace and an ordinary member gets none.

Dutch, in `change.business-moves-closer.2`, replace `Je gaat weten waarom een ontlening na veertien
dagen verlengt en niet na dertig.` with:

> Je gaat weten waarom personeel zeven dagen respijt krijgt en een gewoon lid geen enkele.

(`respijt` is right: `step2`'s Dutch already uses `respijtperiode` in `steering.stop-at-the-gap.1`.)

### 5. Two Dutch words.

- `change.lead.1`: English says the agent "does not get bored on the thirtieth call site"; Dutch says
  `wordt niet moe` (does not get *tired*). `way-working-decision.3` uses tiredness for the human
  ("iemand moe op vrijdag"), so the Dutch now runs one word for the agent that is not tired and the
  person who is. Change to: `Een agent schrijft ze sneller dan jij en verveelt zich niet bij de
  dertigste plek waar ze wordt aangeroepen.` (rest of the key unchanged).
- `change.you-test-engineer.1`: `Een teruggave met een datum vóór de ontlening` →
  `Een inlevering met een datum vóór de ontlening`. `teruggave` in Dutch reads as a refund. This pairs
  with the same fix in `expectations` below, so the two units use one Dutch word for a returned book.

### 6. Manifest: `deck.tsx`. Two new slides and one markup fix.

Write these into `<SCRATCH>/manifests/step3/change.json`. `change` has five sections on the board and
`environment-beats-project` is absent from the deck entirely, including from the divider points.

**A. `deck-step3-change-environment`**, insert after `deck-step3-change-gates` (currently index 5),
which is unit order.

```tsx
{
  id: 'deck-step3-change-environment',
  kind: 'statement',
  ns: 'step3',
  eyebrow: 'change.title',
  title: 'deck.change.environment.title',
  note: 'deck.change.environment.note',
},
```

| key | en | nl |
|---|---|---|
| `deck.change.environment.title` | `The deliverable is <hi>the environment</hi>, <mute>not this quarter</mute>` | `De deliverable is <hi>de omgeving</hi>, <mute>niet dit kwartaal</mute>` |
| `deck.change.environment.note` | `Count the times this week you told an agent something you had told it before. Each one is a line missing from a file.` | `Tel deze week hoe vaak je een agent iets vertelde dat je al eens verteld had. Elke keer is een regel die in een bestand ontbreekt.` |

**The note must not name a file.** `SlideSpec` has no assistant mechanism and no deck string in any
of the four steps names `CLAUDE.md` or `.github/copilot-instructions.md`. A slide that named one
would be wrong for half the room with nothing filtering it.

**B. `deck-step3-change-business`**, insert after `deck-step3-change-test-engineer` (currently index
2), which is unit order.

```tsx
{
  id: 'deck-step3-change-business',
  kind: 'statement',
  ns: 'step3',
  eyebrow: 'change.title',
  title: 'deck.change.business.title',
  note: 'deck.change.business.note',
},
```

| key | en | nl |
|---|---|---|
| `deck.change.business.title` | `Knowing the domain is <hi>not scope creep</hi>` | `Het domein kennen is <hi>geen scope creep</hi>` |
| `deck.change.business.note` | `A version by Thursday only helps if somebody who knows what it was for looks at it on Thursday.` | `Een versie op donderdag helpt alleen als iemand die weet waarvoor het diende er donderdag naar kijkt.` |

`deck.change.divider.2` already carries the "weekly, not at the demo" half, so this slide takes the
other half and must not repeat it.

**G. `deck.change.divider.1` mutes its own claim.** `"Producing code is <mute>not the job</mute>"`
sets back the whole payload, so the ink weight lands on "Producing code is", which is not a claim.
The house pattern across steps 1 and 2 is positive clause plain, negative clause muted. Drop the
markup:

| key | en | nl |
|---|---|---|
| `deck.change.divider.1` | `Producing code is not the job` | `Code produceren is niet de job` |

## Do not

- **Do not add a sentence naming the dashed strip's claim in `change.process-was-bottleneck.2`.** One
  critic proposed appending "What grows instead is underneath the second row: three lanes of writing
  make three times as much to read". The step's `CLAUDE.md` deliberately leaves that claim to the
  drawing, and the critic's own note says doing this **and** the caption fix is one sentence too
  many. Item 1 above is the version to take.
- **Do not add a second figure.** `way-working-decision` is three questions about practices, and a
  drawing of them is a picture of a list. The step's bar is "a measurement rather than an
  illustration" and nothing here is a measurement.
- **Do not add a `TaskCard` to this unit.** Two critics wanted one here. The BRIEF licenses step 3
  exactly **one** structured closing exercise, and it lands at the foot of `impostor` where it draws
  on all three units. The moves those critics proposed (count the repeats, name the practice, take
  the question to a retro) are moves 3, 4 and 5 of that card. Three cards in a three-unit step turns
  a closing exercise into an errand list.
- **Do not add a quiz to this unit.** One critic drafted two questions "if a second is ever wanted".
  The step gets one quiz, on `expectations`, which is where `audit.md` puts it. `change` already
  renders a figure in guided mode, so it has no rendering hole to fill.
- **Do not add a foreshadowing or bridging opener.** `change` opening cold out of `step2/workshop` is
  a real gap (audit row 45), and the fix is a closing paragraph on **`step2/workshop`'s** side. An
  opener here would be the announcing opener the BRIEF bans.
- **Do not touch the Dutch cross-reference "de unit over vakmanschap"** in
  `change.you-test-engineer.2`. `engineering.title` in step 2's `nl.json` is "Vakmanschap", so this
  reference is the one that matches its sidebar label. The mismatched one is `workflows.naive.1` in
  step 2, and it is step 2's to fix.
- **Do not cut the last two sentences of `change.code-got-cheap.2`** ("The gates stay where they are.
  What relaxes is taste."). Without them the section reads as permission to stop caring, which is the
  opposite of what `you-test-engineer` asks four paragraphs earlier. Recorded decision.
- **Do not "fix" the two lists of three** in `change.lead.2` and `environment-beats-project.1`. They
  are concrete nouns, not adjectives, and the BRIEF allows one list.
- **Do not touch `pipeline-shift.description`.** It already describes the strip correctly.

---

# 2. `expectations`

**Effort: heavy.**

The prose is good and is not being rewritten. What this unit needs is the quiz that fixes its blank
guided-mode page, plus nine sentence-level snags where a reader has to work harder than the argument
does.

## Do

### 1. Add the step's one quiz. New file `front/src/steps/step3/quiz.ts`.

This is the item that changes what the unit *is*. It is browser-graded by `QuizPanel`, so it works
with the service down. `audit.md` row 20 names this unit by name. It also fixes half of the course
ending on two blank pages in the default mode: guided drops every run of prose, and a registry quiz
survives the cut.

**This revises a recorded decision** ("Nothing in the step is graded or quizzed"). See Step-level
items: the `CLAUDE.md` edit is part of this work, not optional.

Manifest entry for `index.tsx`: add `quiz: expectationsQuiz` to the `expectations` unit and
`import { expectationsQuiz } from './quiz'` at the top. No `<h2 data-i18n="ui:quiz.title">` goes in
the HTML: this unit has no task card, so `QuizPanel` owns the heading (same as step 2's `workflows`).

New file, on step 2's `quiz.ts` shape (`QuizQuestion[]`, `choices` with exactly one `correct: true`,
`explanation` a message key):

```ts
import type { QuizQuestion } from '@/shared/step'

export const expectationsQuiz: QuizQuestion[] = [
  {
    id: 'three-weeks-after-thursday',
    question: 'quiz.three-weeks-after-thursday.question',
    choices: [
      { id: 'cases', label: 'quiz.three-weeks-after-thursday.cases', correct: true },
      { id: 'vague', label: 'quiz.three-weeks-after-thursday.vague' },
      { id: 'poor', label: 'quiz.three-weeks-after-thursday.poor' },
      { id: 'queue', label: 'quiz.three-weeks-after-thursday.queue' },
    ],
    explanation: 'quiz.three-weeks-after-thursday.explanation',
  },
  {
    id: 'their-prototype',
    question: 'quiz.their-prototype.question',
    choices: [
      { id: 'say', label: 'quiz.their-prototype.say', correct: true },
      { id: 'theirs', label: 'quiz.their-prototype.theirs' },
      { id: 'ticket', label: 'quiz.their-prototype.ticket' },
      { id: 'build', label: 'quiz.their-prototype.build' },
    ],
    explanation: 'quiz.their-prototype.explanation',
  },
  {
    id: 'one-afternoon-quarter',
    question: 'quiz.one-afternoon-quarter.question',
    choices: [
      { id: 'checkpoint', label: 'quiz.one-afternoon-quarter.checkpoint', correct: true },
      { id: 'fourtimes', label: 'quiz.one-afternoon-quarter.fourtimes' },
      { id: 'old', label: 'quiz.one-afternoon-quarter.old' },
      { id: 'average', label: 'quiz.one-afternoon-quarter.average' },
    ],
    explanation: 'quiz.one-afternoon-quarter.explanation',
  },
]
```

Write a docstring on it saying what step 2's does: array order is not display order because
`QuizPanel` shuffles on every mount, so each question stands alone; these are situations rather than
definitions; each wrong choice is a position a reader who half-understood the unit genuinely holds.

**Keys, both languages** (all in the `step3` namespace, all going in the patch file):

| key | en | nl |
|---|---|---|
| `quiz.three-weeks-after-thursday.question` | You demo a working feature on Thursday and the room agrees it is done. Three weeks later you are still on it. What ate the three weeks? | Je toont donderdag een werkende feature en iedereen vindt ze klaar. Drie weken later ben je er nog mee bezig. Waar zijn die drie weken naartoe? |
| `quiz.three-weeks-after-thursday.cases` | The cases nobody had in mind when the request was written, some of which did not exist until the thing was half built. | De gevallen die niemand in gedachten had toen de vraag geschreven werd, en waarvan sommige pas bestonden toen het ding half af was. |
| `quiz.three-weeks-after-thursday.vague` | The request was too vague. A sharper one would have produced those cases in the first run. | De vraag was te vaag. Een scherpere had die gevallen in de eerste run al opgeleverd. |
| `quiz.three-weeks-after-thursday.poor` | The agent's implementation was poor, so most of it had to be written again by hand. | De implementatie van de agent was slecht, dus het meeste moest met de hand opnieuw. |
| `quiz.three-weeks-after-thursday.queue` | The queue: review, an environment nobody had provisioned, and the release window. | De wachtrij: review, een omgeving die niemand had klaargezet, en het release window. |
| `quiz.three-weeks-after-thursday.explanation` | An agent implements the request it was given, along the path you described. A sharper first draft does not produce the detail nobody knew about yet, so the burden moved rather than lifted. | Een agent implementeert de vraag die hij kreeg, langs het pad dat jij beschreef. Een scherpere eerste versie levert het detail dat niemand nog kende niet op, dus de last is verschoven en niet verdwenen. |
| `quiz.their-prototype.question` | A manager built a working prototype over lunch and shows it in your meeting. It has no validation and one hard-coded member. What do you do? | Een manager zette over de middag een werkend prototype in elkaar en toont het in jullie overleg. Er zit geen validatie in en één hard-coded member. Wat doe je? |
| `quiz.their-prototype.say` | Say what it does not do yet, out loud, in that meeting. | Zeg wat het nog niet doet, hardop, in dat overleg. |
| `quiz.their-prototype.theirs` | Say nothing. It is their prototype, so the caveats are theirs to give. | Zeg niets. Het is hun prototype, dus de kanttekeningen zijn aan hen. |
| `quiz.their-prototype.ticket` | Write the gaps into a ticket, where the people who decide will read them. | Schrijf de gaten in een ticket, waar de mensen die beslissen ze lezen. |
| `quiz.their-prototype.build` | Build the real version first, then show what a finished one looks like. | Bouw eerst de echte versie, en toon dan hoe een afgewerkte eruitziet. |
| `quiz.their-prototype.explanation` | The sentence gets said either way. Left out now, it is said later by somebody asking why the feature they signed off on falls over on an empty list. | Die zin wordt hoe dan ook gezegd. Laat je ze nu weg, dan zegt iemand ze later, met de vraag waarom de feature die net goedgekeurd werd omvalt op een lege lijst. |
| `quiz.one-afternoon-quarter.question` | Work that would have taken a week came back in an afternoon. Your manager asks what the team can commit to for the quarter. What do you give them? | Werk waar vroeger een week over ging, kwam in één namiddag terug. Je manager vraagt waar het team zich voor het kwartaal op vastlegt. Wat geef je? |
| `quiz.one-afternoon-quarter.checkpoint` | The next checkpoint and what will be true by then, because the afternoon is one sample. | Het volgende checkpoint en wat er dan waar zal zijn, want die namiddag is één meting. |
| `quiz.one-afternoon-quarter.fourtimes` | Four times the old output, since the afternoon is what the new rate looks like. | Vier keer de oude output, want die namiddag laat zien wat het nieuwe tempo is. |
| `quiz.one-afternoon-quarter.old` | The old estimate, since one fast run says nothing about a quarter. | De oude schatting, want één snelle run zegt niets over een kwartaal. |
| `quiz.one-afternoon-quarter.average` | The average of the last three runs, which is as close to a rate as you can get. | Het gemiddelde van de laatste drie runs, dichter bij een tempo kom je niet. |
| `quiz.one-afternoon-quarter.explanation` | Hand the same request over twice and it does not come back the same twice. Your old estimate and your manager's read on quality are both readings of a job that changed shape, so the honest promise is the next checkpoint. | Geef dezelfde vraag twee keer door en er komt geen twee keer hetzelfde terug. Jouw oude schatting en de kwaliteitsinschatting van je manager zijn allebei metingen van een job die van vorm veranderd is, dus de eerlijke belofte is het volgende checkpoint. |

### 2. `expectations.detail-nobody-specified.1`: "sentence" is doing two jobs, and "returns" is ambiguous.

One heading earlier, in `say-what-missing`, "sentence" is **the sentence you say at the demo**, twice.
Here it is **the sentence you gave the agent**, twice. A reader coming straight out of the demo
section has to re-point the word mid-paragraph, and the Dutch collides identically on `zin`. The fix
moves the agent-side one onto the course's own noun: `step2/steering` already says "your request left
out the one thing that mattered".

Separately, "Ask for returns" is the unit's one feature example and `kata/step2/java` has no returns
feature. In English it reads as returned books or as refunds; the Dutch commits to `teruggaves`,
which a Belgian reader hears first as a tax refund. One word fixes it.

Replace lines 48-53 of `units/expectations.html` with:

```html
<p data-i18n="expectations.detail-nobody-specified.1">
  An agent implements the request it was given, and the request was shallow. Ask for book returns and
  returns come back handled, tested, along the path you described. The time then goes on the cases
  nobody had in mind when that request was written, and nobody includes you. Some of them do not
  exist until the thing is half built.
</p>
```

Dutch, same key:

> Een agent implementeert de vraag die hij kreeg, en die vraag was oppervlakkig. Vraag om het inleveren van boeken en dat komt terug, afgehandeld, getest, langs het pad dat jij beschreven hebt. De tijd gaat daarna op aan de gevallen die niemand in gedachten had toen die vraag geschreven werd, en niemand is inclusief jij. Sommige bestaan pas als het ding half af is.

This is the one place the English wins a disagreement with the Dutch, because the Dutch noun is the
one that drifted off the domain. Say so in the commit message.

### 3. `expectations.detail-nobody-specified.2`: drop one of two consecutive "rather than"s.

The construction fires five times in 730 words, the highest density in the course, and three of the
five sit at paragraph-closing position. Two of them are consecutive sentences here. Change the second
only; it costs one word and keeps the two closers that earn it.

In line 59-60, replace `finding it takes room in the week rather than a date at the end of it.` with:

> finding it takes room in the week, not a date at the end of it.

Dutch, in `expectations.detail-nobody-specified.2`, replace `en vinden vraagt ruimte in de week in
plaats van een datum aan het eind ervan.` with:

> en vinden vraagt ruimte in de week, geen datum aan het eind ervan.

### 4. `expectations.tool-not-advantage.1`: bridge the lead, and break the three-clause sentence.

Two things in one paragraph. The lead closes on a demo, which sets up `say-what-missing`, and the
next thing the reader meets is the market with nothing joining the two. And
"`Change management` already showed the factor not arriving, and this is the other half of it, the
half that holds even where the gain is real" has two commas and "half" twice.

Do not reorder the sections: the outward-to-inward funnel is right and `tool-not-advantage` is the
widest belief. Bridge it in the section's own first line, which also brings it closer to what the
step's `CLAUDE.md` says the section is for.

Replace lines 16-22 with:

```html
<p data-i18n="expectations.tool-not-advantage.1">
  Above that meeting there is a second belief, and it is management's: the tool bought the team an
  advantage. Your competitor is on the same models, in the same week, reading the same article about
  them. Whatever the tooling hands you, it hands them.
  <a href="/steps/step3/change">Change management</a> already showed the factor not arriving. This is
  the other half, and it holds even where the gain is real. A gain everybody gets is the new floor
  rather than a lead.
</p>
```

Dutch:

> Boven dat overleg zit nog een overtuiging, en die is van het management: de tool heeft het team een voorsprong opgeleverd. Je concurrent zit op dezelfde modellen, in dezelfde week, en leest hetzelfde artikel erover. Wat de tooling jou geeft, geeft ze hen ook. <a href="/steps/step3/change">Change management</a> liet al zien dat die factor er niet komt. Dit is de andere helft, en die geldt ook waar de winst er wel is. Winst die iedereen krijgt, is de nieuwe bodem en geen voorsprong.

### 5. `expectations.tool-not-advantage.2`: the existential opener and the wrong claim about `context`.

"There is a ceiling on the free part as well" announces rather than claims, and "the free part" is a
term the unit never used. And "which is what the context unit was about" is not true:
`step1/context` is about the four layers landing in one window, and the average is one of its four
sections. `step1/CLAUDE.md` says `context` *owns* the average, not that it *is about* it. One word.

Replace lines 24-29 with:

```html
<p data-i18n="expectations.tool-not-advantage.2">
  What the tool hands you for free has a ceiling too. A model answers from an average, which is what
  <a href="/steps/step1/context">the context unit</a> established, so an ordinary instruction gets
  ordinary work back. What is left to be better at is what you know about this domain, this codebase
  and the people using it. None of that arrived with the tool.
</p>
```

Dutch:

> Wat de tool je gratis geeft, heeft ook een plafond. Een model antwoordt vanuit een gemiddelde, wat <a href="/steps/step1/context">de context-unit</a> vastlegde, dus op een doorsnee instructie komt doorsnee werk terug. Wat overblijft om beter in te zijn, is wat jij weet over dit domein, deze codebase en de mensen die ermee werken. Dat kwam niet mee met de tool.

### 6. `expectations.estimate-still-matters.2`: take the Dutch's shape into the English.

EN: "So when you say a date, say it including the part where you check the work". NL: "Noem dus een
datum waarin het nakijken zit" ("name a date that has the checking in it"). The Dutch is one clause
and lands; the English is a nine-word verb phrase hung off a repeated "say". English only:

In lines 75-76, replace `So when you say a date, say it including the part where you check the work,
or "done" is going to mean two different things in one room.` with:

> So when you give a date, give one with the checking inside it, or "done" is going to mean two different things in one room.

Also in the Dutch of the same key: `twee agenten naast elkaar` → `twee agents naast elkaar`. The
course says **agents** everywhere except two slips, and this is one of them.

### 7. `expectations.one-good-run.2`: name the thing before qualifying it, and fix the day.

"The correction you would once have applied to it is gone as well" opens on a referent the reader
does not have yet; it resolves one sentence later. The step's `CLAUDE.md` records why (the sixth
candidate section was merged into this paragraph, so it now argues before it advises), and that
knowing cost lands entirely on the first eleven words. Pay it off without restoring the section.

Separately: Thursday is the step's established day for "the skeleton exists"
(`change.business-moves-closer.1`, `change.way-working-decision.4`, and this unit's own
`detail-nobody-specified.2`). The closing example spends a new day, Friday, on the same object two
sections after the old one.

Replace lines 88-94 with:

```html
<p data-i18n="expectations.one-good-run.2">
  You used to correct a number like that by instinct, and that correction is gone too. You estimated
  from years of having done the work, and your manager read the quality off knowing who was on the
  team; both are readings of a job that changed shape underneath them. Everybody is re-calibrating at
  once, so the honest promise is the next checkpoint rather than the finish. A skeleton on Thursday, a
  green build on Monday. A date that assumed every run lands has nowhere to go the first time one does
  not.
</p>
```

Dutch:

> Vroeger corrigeerde je zo'n getal op gevoel, en die correctie is nu ook weg. Jij schatte vanuit jaren hetzelfde werk doen, en je manager las de kwaliteit af aan wie er in het team zat; allebei zijn dat metingen van een job die intussen van vorm veranderd is. Iedereen is tegelijk aan het herijken, dus de eerlijke belofte is het volgende checkpoint in plaats van het einde. Een skelet op donderdag, een groene build op maandag. Een datum die ervan uitging dat elke run landt, heeft nergens meer naartoe zodra er één niet landt.

The checkpoint instruction stays the last thing in the unit. Do not move it back to the top of the
paragraph.

### 8. Two Dutch defects in `one-good-run.heading`, one line.

`"Één goede run is geen snelheid"` is wrong twice. Dutch drops the accent from a capitalised first
letter, so it is `Eén`: this is the only `Één` in the whole frontend against eighteen correct `Eén`s,
including one two keys above it in the same file. And `snelheid` is plain speed, while the deck slide
for the same claim says `velocity`, which is the planning term the English heading uses and the one a
Dutch-speaking team says out loud. A student reading the page and then seeing the slide meets two
names for one claim.

> `"expectations.one-good-run.heading": "Eén goede run is geen velocity"`

The section slug derives from the **English** heading, which does not change, so no keys move.

### 9. Manifest: `deck.tsx`. Two new slides, one repoint, two markup fixes.

Write into `<SCRATCH>/manifests/step3/expectations.json`. The unit went from three sections to five in
one revision and the deck still has three statements; `detail-nobody-specified` is absent from the
deck entirely, including from the divider points, and it is the section the step's `CLAUDE.md` calls
"the only one of the three the manager has to hear".

**C. `deck-step3-expectations-burden`**, insert after `deck-step3-expectations-missing`.

```tsx
{
  id: 'deck-step3-expectations-burden',
  kind: 'statement',
  ns: 'step3',
  eyebrow: 'expectations.title',
  title: 'deck.expectations.burden.title',
  note: 'deck.expectations.burden.note',
},
```

| key | en | nl |
|---|---|---|
| `deck.expectations.burden.title` | `The burden moved. <hi>It did not lift.</hi>` | `De last is verschoven. <hi>Hij is niet verdwenen.</hi>` |
| `deck.expectations.burden.note` | `Finished Thursday, then three more weeks on the cases nobody could have written down.` | `Donderdag klaar, en dan nog drie weken aan de gevallen die niemand had kunnen opschrijven.` |

**This slide must name no concrete edge case.** The step's `CLAUDE.md` says
`detail-nobody-specified` "deliberately names none and stays on returns alone", because `change` and
`impostor` each already enumerate three and a third enumeration turns the step into one paragraph told
three times. No empty list, no expired tier, no zero amount on this slide.

**D. `deck-step3-expectations-estimate`**, insert after C, before `deck-step3-expectations-velocity`.

```tsx
{
  id: 'deck-step3-expectations-estimate',
  kind: 'statement',
  ns: 'step3',
  eyebrow: 'expectations.title',
  title: 'deck.expectations.estimate.title',
  note: 'deck.expectations.estimate.note',
},
```

| key | en | nl |
|---|---|---|
| `deck.expectations.estimate.title` | `Say the date <hi>including the checking</hi>` | `Noem de datum <hi>inclusief het nakijken</hi>` |
| `deck.expectations.estimate.note` | `They got faster. Your reading did not. Otherwise "done" means two things in one room.` | `Zij werden sneller. Jouw leestempo niet. Anders betekent "klaar" twee dingen in dezelfde vergadering.` |

**Paired edit, only together with D.** `deck.expectations.divider.2` and `.3` are currently the two
halves of one sentence from `estimate-still-matters.2`, so two of three scarce divider lines argue one
section while `detail-nobody-specified` gets none. Once D exists, point 3 is free:

| key | en | nl |
|---|---|---|
| `deck.expectations.divider.3` | `The burden <mute>moved rather than lifted</mute>` | `De last <mute>is verschoven, niet verdwenen</mute>` |

Making that swap **without** adding D moves the hole rather than filling it.

**H. `deck.expectations.floor.title` mutes its entire payload.**
`"A gain your competitor also gets is <mute>a floor, not a lead</mute>"` sets back everything the
slide says, so the emphasis lands on the setup.

| key | en | nl |
|---|---|---|
| `deck.expectations.floor.title` | `A gain your competitor also gets is <hi>a floor</hi>, <mute>not a lead</mute>` | `Winst die je concurrent ook krijgt is <hi>een vloer</hi>, <mute>geen voorsprong</mute>` |

**J. `deck.expectations.missing.title` is verbose in Dutch only** (EN 35 characters, NL 54), so it
wraps to three lines in the heading box where the English takes two. Dutch only:

| key | nl |
|---|---|
| `deck.expectations.missing.title` | `Zeg wat er ontbreekt <hi>als je het toont</hi>` |

## Do not

- **Do not add a figure.** Every candidate is already drawn elsewhere: run-to-run spread is
  `ScriptRuns` in `step2/patterns` and the sentence links straight to it; reading capacity against
  agent output is `PipelineShift` one unit earlier, and the step's `CLAUDE.md` explicitly places it in
  `change` rather than here; where the day goes is `LoopsPerHour` and `WorkflowWeights`. The only
  undrawn claim is "the honest promise is the next checkpoint rather than the finish", and drawing it
  means inventing numbers about uncertainty, which is the one kind of figure this course has never
  shipped.
- **Do not put `ScriptRuns` on the `velocity` slide.** The room saw that drawing about forty slides
  earlier in the same deck, and it would set a step-imports-step precedent the frontend does not
  otherwise have.
- **Do not add a `TaskCard` here.** One critic proposed `say-it-missing` with five moves. The step's
  one card lands at the foot of `impostor` and its move 2 is this unit's ask. See `change`'s Do not.
- **Do not reorder the sections** to put `say-what-missing` first. The outward-to-inward funnel is the
  step's recorded shape. Item 4 bridges it instead.
- **Do not "fix" the four triples** ("same models, same week, same article"; "No validation, one
  hard-coded member, nothing stored between refreshes"; "this domain, this codebase and the people
  using it"; "handled, tested, along the path you described"). They are triples of concrete nouns,
  which is the house voice, not the tricolon of adjectives the BRIEF bans.
- **Do not turn `estimate-still-matters.1`'s "neither did the deploy" into a link to `change`.** It is
  one clause with no argument on it and it correctly points at `enablement`. A second intra-step link
  breaks the step's recorded rule that `tool-not-advantage` carries the only one.
- **Do not let `detail-nobody-specified` name concrete edge cases** anywhere, prose or slide.
  Recorded decision, and it is what keeps `change` and `impostor`'s lists from becoming a third
  telling.
- **Do not split "nobody is calibrated any more" back out** into its own sixth section. It was merged
  into `one-good-run.2` on purpose, and splitting it makes the unit longer than `change` while saying
  the same thing twice.

---

# 3. `impostor`

**Effort: heavy.**

The prose is the best-per-word in the step and almost none of it changes. What is wrong is
**positional**: this is the last page of a twenty-five-unit course, it does not say so, it asks the
reader for nothing, and in the default mode it renders as a title and a pager with an empty body.

## Do

### 1. The step's closing exercise. New file `front/src/steps/step3/WhatYouTakeBack.tsx`.

This is the BRIEF's decision 1 ("a structured closing exercise that is explicitly not graded rather
than a fake board") and the step's `CLAUDE.md` has the slot waiting for it ("the honest shape is step
2's `TaskCard`, ticked once and grading nothing, and the thing it asks for has to happen away from the
keyboard"). It also fixes the blank guided page, because `UnitPage` renders `unit.figure` **outside**
`StepContent`, so it survives the prose cut.

Copy `front/src/steps/step2/WhereWouldItGo.tsx` exactly for shape:

```tsx
import { TaskCard } from '@/shared/components/TaskCard'

const MOVES = ['queue', 'sentence', 'line', 'practice', 'person'] as const

export function WhatYouTakeBack() {
  return (
    <TaskCard
      block="take-it-back"
      namespace="step3"
      prefix="take"
      storageKey="kata.step3.take"
      moves={MOVES}
      className="my-8"
    />
  )
}
```

Docstring: say that it is the course's closing exercise, that nothing about it is graded and nothing
is submitted, that four of the five moves happen away from a keyboard, that the five draw one each on
`change.process-was-bottleneck`, `expectations.say-what-missing`, `change.environment-beats-project`,
`change.way-working-decision` and adoption, and that it must never grow a checker, a hash, a text box
or a sixth move.

`storageKey` sits under the `kata.step<N>.` prefix, so `shared/lib/reset.ts` clears it by key shape.

**Registry, into the manifest** (`index.tsx` is integrator-owned):

```tsx
{
  id: 'impostor',
  title: 'impostor.title',
  html: impostor,
  // The course's closing exercise, and the one thing in step 3 the student does. Ungraded: the tick
  // is a bookmark. Registered as `figure` rather than an inline one so it survives the guided cut,
  // which is also what stops the last page of the course rendering empty in class.
  figure: <WhatYouTakeBack />,
},
```

plus `import { WhatYouTakeBack } from './WhatYouTakeBack'`.

**HTML**: append to `units/impostor.html`, after the new closing paragraph from item 2, exactly the
shape `step2/units/engineering.html` ends on:

```html
<!-- The course's closing exercise. The card is the WhatYouTakeBack element registered in
     steps/step3/index.tsx. Nothing here is graded, and its description says so. -->
<hr />

<h2 data-i18n="ui:quiz.title">Test yourself</h2>
```

**Keys, both languages:**

| key | en | nl |
|---|---|---|
| `take.title` | Take one of these back to your team | Neem er één mee naar je team |
| `take.description` | Nothing here is graded and nothing is checked. Four of the five happen away from your keyboard, so the tick is a bookmark. | Hier wordt niets beoordeeld en niets nagekeken. Vier van de vijf gebeuren weg van je toetsenbord, dus het vinkje is een bladwijzer. |
| `take.todo` | Mark this task done | Vink deze opdracht af |
| `take.done` | Done | Gedaan |
| `take.queue.label` | Write down the one thing between your work being finished and it being in production that is not typing. | Schrijf op wat er tussen jouw werk en productie zit dat geen typen is. |
| `take.sentence.label` | Write the line you will say at the next demo about what the rough version does not do yet. | Schrijf de zin op die je bij de volgende demo zegt over wat de ruwe versie nog niet doet. |
| `take.line.label` | Pick one correction you gave an agent more than once this week and write it into the repository's own instruction file. | Kies één correctie die je deze week meer dan eens aan een agent gaf, en schrijf ze in het instructiebestand van de repository. |
| `take.practice.label` | Pick one ritual your team keeps, write down the constraint it was built for, and say whether that constraint is still there. | Kies één gewoonte die je team aanhoudt, schrijf op voor welke beperking ze bedacht is, en zeg of die beperking er nog is. |
| `take.person.label` | Put one of the four in front of one person on your team. A name and a date. | Leg één van de vier voor aan één iemand in je team. Een naam en een datum. |

`take.line.label` says "the repository's own instruction file" and **must not name `CLAUDE.md` or
`.github/copilot-instructions.md`**. Task-card moves are locale strings with no assistant mechanism,
so a filename there is wrong for half the room with nothing filtering it. (Step 1's `SurviveTheClear`
solves that by typing its moves per assistant; do not build that here for one word.)

### 2. End the course. New paragraph `impostor.nobody-doing-long.3`.

This is the last block of the last unit of the last step and its last sentence closes the *section*.
Nothing says the course is over. `audit.md` row 21. The constraint the audit does not carry is that
the addition must not soften the close: the step's `CLAUDE.md` says the answer this step offers is a
repository, not encouragement, so the ending has to continue **from** the repository.

The assistant pair occupies position 2, so `.3` is the next location. Assistant-neutral, no variant.
Insert after the `.2.copilot` paragraph and before the `<hr />` from item 1:

```html
<p data-i18n="impostor.nobody-doing-long.3">
  That is the last unit. Step 1 told you that between two messages an LLM keeps nothing, and you are
  finishing with the files that carry what it would otherwise forget. Everything after this happens in
  a repository nobody set up for you.
</p>
```

Dutch:

> Dit is de laatste unit. Stap 1 zei je dat een LLM tussen twee berichten niets bijhoudt, en je eindigt met de bestanden die dragen wat het anders vergeet. Alles na dit gebeurt in een repository die niemand voor jou heeft klaargezet.

Both checks behind it hold: `context.model-stateless.1` is "Between two messages an LLM keeps
nothing", so the callback quotes the course rather than paraphrasing it, and `context` is unit 4 of
step 1, so "Step 1 told you" is true where "step 1 opened with" would not be. No third metaphor, no
encouragement.

### 3. `impostor.nobody-doing-long.1`: cut the age, keep the change.

"The tools this course is about are a couple of years old" is the only dating claim in a step written
not to date, and the step's own `CLAUDE.md` argues against exactly that shape when it defends
`way-working-decision` stopping at the question. Worse, this paragraph carries no `data-assistant`, so
a Copilot reader gets it too, and GitHub Copilot shipped in 2021. To that reader it is wrong by three
years. The "changed twice" half is the author's claim about their own course and is the half worth
keeping.

Replace lines 43-47 with:

```html
<p data-i18n="impostor.nobody-doing-long.1">
  These tools changed twice while this course was being written. Whoever sounds certain about them
  read something last week, the same as you. There is no decade of practice here to be behind on.
</p>
```

Dutch:

> Deze tools veranderden twee keer terwijl deze cursus geschreven werd. Wie er zeker over klinkt, las vorige week iets, net als jij. Er is hier geen decennium ervaring om op achter te lopen.

Note: the facts pass cleared this sentence as "loose rather than wrong" without noticing the Copilot
half. The Copilot argument is what carries it, and the fix costs nothing: same three sentences, same
close, nothing that expires.

### 4. `impostor.you-still-engineer.2`: "the expired tier" is a concrete that is not concrete.

`MemberTier` is `STUDENT | STANDARD | SENIOR | STAFF` with no expiry and no date anywhere near it
(verified in `kata/step2/java/.../domain/MemberTier.java`). The reader arrives here two units after
`change.you-test-engineer`, whose three cases really are loans-domain cases, so this triad reads as the
same domain and it is not. The other two items are universal and survive the check.

Replace lines 20-24 with:

```html
<p data-i18n="impostor.you-still-engineer.2">
  It is not. The empty list, the amount that is exactly zero, the field somebody left null: an agent
  writes the happy path and leaves those out, and the person who names them is the reason the module
  holds up. Nobody watches that work happen.
</p>
```

Dutch:

> Dat is het niet. De lege lijst, het bedrag dat exact nul is, het veld dat iemand null liet: een agent schrijft het happy path en laat die eruit, en wie ze benoemt is de reden dat de module overeind blijft. Niemand ziet dat werk gebeuren.

Still three cases, still different from `change`'s three. Both halves of that split are recorded and
both must survive.

### 5. `impostor.you-still-engineer.1`: the slipped pronoun.

"Implementation is the part that moved, and enablement argues where it moved to." The nearest
antecedent for "it" is *implementation*, so the sentence promises `enablement` says where the
implementation went. It does not: `enablement.t-shaped` argues that what the job asks of **you** moves
up a level. The Dutch slipped identically. This is the unit's only link and it is a claim about
another unit.

Replace lines 14-18 with:

```html
<p data-i18n="impostor.you-still-engineer.1">
  Implementation is the part that moved off your desk, and
  <a href="/steps/step2/enablement">enablement</a> argues what the job moves up to instead. What is
  left for you is judgement, and judgement shows up nowhere at five o'clock. An afternoon of deciding
  looks like an afternoon of nothing.
</p>
```

Dutch:

> Implementatie is het stuk dat van jouw bureau verdween, en <a href="/steps/step2/enablement">enablement</a> zegt naar welk niveau de job dan opschuift. Wat overblijft is oordelen, en oordelen is om vijf uur nergens te zien. Een namiddag beslissen lijkt op een namiddag niets doen.

### 6. `impostor.feeling-from-signal.1`: break the list into sentences.

Four of the unit's five listing paragraphs list three, in the same comma-comma-and shape, in 430
words. Two of the four are protected (the edge-case triad is fixed at three by the step's `CLAUDE.md`,
and `lead.2`'s three are the three steps of the loop the course teaches), so the fix lands on the one
that is also the unit's only overlong sentence: three commas and a colon in one line.

Replace lines 28-33 with:

```html
<p data-i18n="impostor.feeling-from-signal.1">
  One version of this is not a feeling at all. If you cannot follow the diff, that is a gap rather
  than impostor syndrome, and a gap has a fix. Hand over smaller steps. Make the agent walk you
  through the part you lost, or write the awkward class yourself. Accepting code you do not understand
  is how a codebase turns into somebody else's.
</p>
```

Dutch, which also fixes a headless relative clause the parity pass found in the existing text
("is hoe een codebase die van iemand anders wordt" has no head):

> Eén versie hiervan is helemaal geen gevoel. Als je de diff niet kan volgen, is dat een gat en geen impostorsyndroom, en een gat heeft een oplossing. Geef kleinere stappen door. Laat de agent je door het stuk lopen dat je kwijt bent, of schrijf de lastige klasse zelf. Code aanvaarden die je niet begrijpt, is hoe een codebase er een van iemand anders wordt.

Do not merge the two paragraphs of this section and do not let it comfort anybody out of the first
one. Recorded decision, and the bare "Maybe." in `.2` stays exactly where it is.

### 7. Three Dutch words.

- `impostor.nobody-doing-long.2.claude` **and** `.2.copilot`: `Wat wel opbouwt, is wat je opgeschreven
  hebt.` → `Wat wél optelt, is wat je opgeschreven hebt.` `Opbouwen` is transitive in Dutch and reads
  wrong intransitively, and the Dutch deck already has the right verb for the same English
  (`deck.impostor.divider.3`: "Wat optelt is wat je opschreef"), so page and projector currently
  disagree. Rest of both variants unchanged.
- `impostor.feeling-from-signal.heading`: `"Haal het gevoel en het signaal uiteen"` →
  `"Onderscheid het gevoel van het signaal"`, which is what the Dutch slide for the same section
  already says. The section slug derives from the **English** heading, so no keys move.
- `impostor.feeling-from-signal.2`: `Je volgde elke lijn` → `Je volgde elke regel`. `lijn` is the
  geometric one; the course says `regel` everywhere else.

### 8. Manifest: `deck.tsx`. One slide, and it is the deck's ending.

Write into `<SCRATCH>/manifests/step3/impostor.json`. The deck for the whole course currently ends on
`deck-step3-impostor-signal`, "A diff you cannot follow is a gap with a fix", which is the unit's
*middle* section and a diagnostic in the middle of an argument. `nobody-doing-long` has no slide, and
`deck.impostor.divider.3` already promises it ("What adds up is what you wrote down") and never
delivers.

**E. `deck-step3-impostor-written`**, append after `deck-step3-impostor-signal`. Last slide of step 3
and therefore of the deck.

```tsx
{
  id: 'deck-step3-impostor-written',
  kind: 'statement',
  ns: 'step3',
  eyebrow: 'impostor.title',
  title: 'deck.impostor.written.title',
  note: 'deck.impostor.written.note',
},
```

| key | en | nl |
|---|---|---|
| `deck.impostor.written.title` | `Nobody has been doing this <hi>long</hi>` | `Niemand doet dit <hi>al lang</hi>` |
| `deck.impostor.written.note` | `The tools changed twice while this course was written. What adds up is what you wrote down.` | `De tools veranderden twee keer terwijl deze cursus geschreven werd. Wat optelt is wat je opschreef.` |

The note lands on the same claim as `deck.impostor.divider.3`, which is the intended shape: the
divider states the unit's claims and the slides after it are the proof. **No filename on the slide**,
for the same reason as `take.line.label`. The note also tracks item 3's rewrite, so the board and the
page say the same thing about the tools changing.

## Do not

- **Do not add a figure.** Both candidates fail the step's bar. "Judgement is invisible at five
  o'clock" as artefacts-against-decisions measures nothing and its numbers would be invented, and it
  is a picture of a sentence that already lands harder than any drawing of it. "Gap against feeling"
  is a flowchart of one paragraph's structure, which is the exact shape the bar exists to reject.
- **Do not add a quiz.** The unit's three claims have no distractor a reader might genuinely believe
  and be wrong about; every wrong answer would be a strawman. The step's one quiz is on
  `expectations`, which is where `audit.md` puts it, and a one-question quiz on the last page of the
  course is a worse ending than a closing exercise.
- **Do not add a second link** to `you-still-engineer.2` pointing at `step2/engineering`. One critic
  proposed it and ranked it last themselves. The paragraph's claim is about worth rather than about
  engineering, and the step's recorded singleton is that `expectations.tool-not-advantage` carries the
  only intra-step link; a link out to step 2 here risks growing the lean into a second telling, which
  is the failure mode the step's `CLAUDE.md` names.
- **Do not merge the two paragraphs of `feeling-from-signal`**, do not soften the first one into
  reassurance, and do not touch the bare `Maybe.` It is the only place in the course that argues with
  the reader.
- **Do not add a warm closing sentence after `nobody-doing-long.2`.** Item 2's paragraph continues
  from the repository on purpose. Encouragement here is the one thing the recorded decision forbids.
- **Do not give the card a sixth move, a checker, a hash or a text box.** The moment one of these is
  graded, the step is lying about what it is.
- **Do not build a `deck-closing` slide** in `shared/deck/slides.tsx`. One critic proposed answering
  the deck's opening question in a new `ui`-namespaced slide after the steps. It is cross-step, it
  needs `front/CLAUDE.md`'s "deck chrome and the cross-step opening slide" sentence amended in the
  same commit, and the critic offered it for the tutor to refuse. Out of scope for this pass; raise it
  with the user separately.

---

# Step-level items

These belong to whoever lands the step, not to a single unit.

### `front/src/steps/step3/CLAUDE.md`: four recorded decisions change

1. **"Nothing in the step is graded or quizzed, and that is the decision rather than an unfinished
   state."** No longer true and must be rewritten, not deleted. Record: the step now carries one
   browser-graded quiz on `expectations` and one ungraded `TaskCard` at the foot of `impostor`; that
   the "conversation rather than a command" reasoning holds for an *exercise* and not for a
   multiple-choice question a room answers by show of hands; that the quiz landed on `expectations`
   because it is the unit with the most checkable claims and because both it and `impostor` rendered
   empty in guided mode; and that the card is the shape the file itself pre-authorised and must never
   grade anything.
2. **"`change` now renders a heading and a drawing in class where the step used to render nothing at
   all, so it is the one unit here a tutor can put on the board."** All three units now render
   something in guided mode. Rewrite the clause.
3. **"`you-test-engineer` at `engineering` for the floor and the ceiling"** → for the floor.
   `step2/engineering` names only a floor; the ceiling is `step2/goals`', and `change` may not take a
   second lean in one section.
4. **The step's one drawing / the bar for a second one** stays exactly as written. Both new units'
   work is a quiz and a card, not a figure, and the "no third metaphor" rule is untouched by
   everything above. Say nothing new there.

Also update `front/src/steps/step3/index.tsx`'s docstring, which currently says "No quiz and no
exercise anywhere in it". Put that in the manifest.

### Rejected at step level

- **A fourth unit for adoption or for IP and data governance.** The arc pass argues step 3 is short by
  about one unit of scope and names two homeless soft-skills topics. Both are real and both are new
  curriculum, not a quality pass. The closing card's move 5 is a partial down payment on the adoption
  half. Raise the rest with the user as its own decision; do not smuggle a unit in here.
- **A closing paragraph on `step2/workshop` naming step 3.** Real gap, correct fix, wrong step. It
  belongs to whoever owns step 2.

### Verification

```
cd front && npm run build     # tsc -b + vite build
cd front && npm run lint
```

After the merge agent runs `python3 <SCRATCH>/merge_locales.py step3`, check the parity report:
every key added to `en` must have the same key in `nl`. Then read all four passes of each unit, two
modes by two assistants, since both filters run before the translation pass and the console only
audits the page you are looking at.
