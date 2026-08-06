# Dossier: step 3's presentation deck

Subject: `front/src/steps/step3/deck.tsx` and the `deck.*` keys in
`front/src/steps/step3/locales/{en,nl}.json`.
Read first: `front/CLAUDE.md` § "The presentation deck", `front/src/steps/step3/CLAUDE.md`, the three
unit HTML files, `shared/deck/slide-spec.ts`, `shared/deck/SlideTemplate.tsx`, `shared/deck/slides.tsx`,
and steps 1 and 2's decks for house practice.

**Verdict: needs-work.** The prose on these slides is the best thing about them and I would change
almost none of it. The mechanics are clean on every rule I could check. What is wrong is coverage and
the ending: five of step 3's fourteen sections never reach the board, two of them are the sections
the step's own `CLAUDE.md` names as load bearing, and the deck's last frame across all 109 slides is
a diagnostic about reading diffs.

---

## 0. What is already right (so the findings below are not read as a general complaint)

Measured, not asserted:

- **All three dividers carry points.** The deck-wide rule is satisfied; step 3 is not the step that
  breaks it.
- **One dark card**, `deck-step3-title`, `kind: 'title'`, no eyebrow. Four across the deck, as the
  tutor asked for. No divider has been promoted.
- **The one figure is on the board.** `PipelineShift` at `scale: 1.5`, `kind: 'figure'` so it takes
  `top` and hands 80px to the drawing. Step 3 has no `TaskCard` and no `FlagBoard`, so the
  localStorage rule has nothing to bite on here.
- **Ids**: 108 slide ids across the four decks, zero duplicates. Every step 3 id is `deck-step3-`
  prefixed.
- **Namespace**: `ns: 'step3'` on all 13 slides. Nothing leaks into `ui`.
- **Locale parity**: 26 `deck.*` keys in `en.json`, the same 26 in `nl.json`, zero orphans, zero keys
  referenced by `deck.tsx` that do not exist.
- **Zero em-dashes** in either locale file.
- **Zero AI tells** in the 26 strings. `"Taste relaxes. The gates do not."`, `"That sentence gets
  said either way. Later, and from a worse position."`, `"It lands when the agent is good"` are
  written for a room, and the two-sentence shape of the first is the house voice doing its job. Do
  not let a rewrite pass flatten these.
- **Interleaving a lone figure slide between statements is house practice**, not a defect: step 1 and
  step 2 both do it. I checked before writing it up.

---

## 1. Coverage — the substantive failure

Step 3 is 14 `<h2>` sections plus three leads. The deck gives them 9 content slides (statements +
figure) and 3 dividers. **Five sections have no slide.** Two of those five have no divider point
either, which means they are absent from the deck entirely.

| Unit | Section | Slide | Divider point | Absent? |
|---|---|---|---|---|
| change | you-test-engineer | `change-test-engineer` | — | no |
| change | business-moves-closer | **none** | divider.2 | partial |
| change | process-was-bottleneck | `change-pipelines` | divider.3 | no |
| change | way-working-decision | `change-rethink` | — | no |
| change | code-got-cheap | `change-gates` | — | no |
| change | environment-beats-project | **none** | **none** | **YES** |
| expectations | tool-not-advantage | `expectations-floor` (first half only) | — | half |
| expectations | say-what-missing | `expectations-missing` | — | no |
| expectations | detail-nobody-specified | **none** | **none** | **YES** |
| expectations | estimate-still-matters | **none** | divider.2 + divider.3 | partial |
| expectations | one-good-run | `expectations-velocity` | — | no |
| impostor | you-still-engineer | `impostor-engineer` | — | no |
| impostor | feeling-from-signal | `impostor-signal` | — | no |
| impostor | nobody-doing-long | **none** | divider.3 | partial |

Three things make this worse than the table looks.

**(a) In guided mode the deck is the only delivery surface for two of the three units.**
`front/CLAUDE.md`: guided mode "drops every run of prose, whatever its audience attribute says", a
page keeps "only its figures, its quiz and its board", and `StepContent` renders `null` when nothing
survives. `expectations` and `impostor` have no figure, no quiz and no task in `index.tsx`. So in a
classroom those two units are **blank pages**, and their eight sections exist only on the projector.
Three of those eight have no slide. Step 3's own `CLAUDE.md` notices half of this ("`change` now
renders a heading and a drawing in class where the step used to render nothing at all, so it is the
one unit here a tutor can put on the board") without drawing the consequence for the other two.

**(b) The two fully-absent sections are the two the step's own `CLAUDE.md` singles out.**
On `detail-nobody-specified`: *"That last one is the only one of the three the manager has to hear,
and it is the reason the burden moved rather than lifted."* The board is precisely where a
manager-facing argument gets made, and it is not there. On `environment-beats-project`: it is one of
the six audiences the file says `change` exists to address ("what is worth more than the project"),
it carries the step's only inline icon and its only concrete Monday-morning instruction, and it is
one of the step's two `data-assistant` pairs. Neither appears anywhere in the deck.

**(c) Nothing in the repo claims these omissions were chosen.** Step 2's `deck.tsx` docstring
carries a full paragraph of exclusions and their reasons ("Kept off on purpose: `SetupFlags`,
`Workshop` and `WhereWouldItGo` … `LoopInWindow` argues what its slide's title already says …").
Step 3's docstring records none. The house habit here is to write down what was left off; it was not
written down, so these read as a deck that stopped being updated. That reading is supported by
`expectations`: step 3's `CLAUDE.md` says the unit "went from three to five in one revision", and the
deck still has exactly three `expectations` statements.

**Density**: step 3 is not thin per word (6.2 slides/1000 words against step 1's 4.3 and step 2's
4.9). It is thin per *argument*: 9 content slides for 14 sections, 0.64, against step 1's 0.82. The
fix is not "more slides"; it is the five named below.

---

## 2. Sequence

Within each unit the deck runs in unit order, and the run of units is registry order. A tutor can
talk through it. One defect, and it is at the end.

**The deck has no ending.** `DECK = [...OPENING, ...steps.flatMap(step => step.deck)]` and step 3 is
last, so the final frame of a 109-slide day is `deck-step3-impostor-signal`: *"Tell the feeling from
the signal / A diff you cannot follow is a gap with a fix."* That is a diagnostic in the middle of an
argument. Step 1's deck ends on a deliberate handoff (`deck.recap.next.title`, *"Step 2: not what it
knows, but how you hand it work"*); step 2 ends on a thesis (*"Hand over a goal, not a keystroke"*).
Step 3 ends because it ran out of slides. `impostor.nobody-doing-long` is the section written to
close the step ("`nobody-doing-long` closes on written-down work rather than on the feeling … the
answer the step offers is a repository, not encouragement") and it is exactly the slide that is
missing. See proposal **E**.

Secondary, and a decision rather than a proven defect: the deck **opens with a question and never
returns to it**. `deck-opening` asks where the line runs between vibe coding and agentic engineering,
in `ui`, before the course starts. 108 slides later nobody answers it out loud. See proposal **F**,
which is out of my subject's file and is offered for the tutor to accept or refuse.

---

## 3. Figures

The step has exactly one figure and it is on a slide, correctly configured. There is nothing kept off
and nothing that should be.

**I considered and rejected two additions**, and record them so nobody proposes them again:

- **Step 2's `ScriptRuns` on `deck-step3-expectations-velocity`.** Tempting: step 3's `CLAUDE.md`
  says `expectations.one-good-run` is "`ScriptRuns`'s spread named in prose", and a claim the room
  takes on trust that a drawing could settle is normally a finding. Rejected: `ScriptRuns` is already
  on `deck-step2-patterns-runs`, so the room saw the drawing about forty slides earlier in the same
  deck; showing it twice buys a claim they already have and sets a step-imports-step precedent the
  frontend does not otherwise have. The prose slide is the right call.
- **A second step 3 drawing.** The step's `CLAUDE.md` sets the bar at "a measurement rather than an
  illustration" and says a picture of a claim the paragraph already makes is the thing to cut. None
  of the five missing sections is a measurement. Statements, not drawings.

---

## 4. Text quality

No AI tells, no em-dashes, no tricolon rhythm. Two mechanical defects in the emphasis markup and one
Dutch one.

**G. `deck.change.divider.1` mutes its own claim.** `"Producing code is <mute>not the job</mute>"`.
The house pattern across steps 1 and 2 is invariably *positive clause plain, negative clause muted*:
`"Name the outcome, <mute>not the keystrokes</mute>"`, `"The tier is a disposition, <mute>not a
version</mute>"`, `"Aim from where the work is, <mute>not where the plan said</mute>"`. Here the
sentence is only the negative, and all of it is set back, so the ink weight on the board lands on
"Producing code is", which is not a claim. Minimal fix: drop the markup.

- EN `"Producing code is not the job"` NL `"Code produceren is niet de job"`
- Or, matching `gates`' two-sentence shape: EN `"Producing code is not the job. <hi>Deciding and
  checking is.</hi>"` NL `"Code produceren is niet de job. <hi>Beslissen en nakijken wel.</hi>"`

**H. `deck.expectations.floor.title` mutes its entire payload.** `"A gain your competitor also gets
is <mute>a floor, not a lead</mute>"`. Everything the slide says is set back and the emphasis lands
on the setup. Fix:

- EN `"A gain your competitor also gets is <hi>a floor</hi>, <mute>not a lead</mute>"`
- NL `"Winst die je concurrent ook krijgt is <hi>een vloer</hi>, <mute>geen voorsprong</mute>"`

**J. `deck.expectations.missing.title` is verbose in Dutch only.** EN 35 characters, NL 54: `"Zeg wat
er ontbreekt <hi>op het moment dat je het laat zien</hi>"`. It fits the 26ch/84px box in three lines
rather than two, so this is legibility rather than breakage, but slide text is compressed by
definition and this line is not.

- NL `"Zeg wat er ontbreekt <hi>als je het toont</hi>"`

---

## 5. Proposed slides

Insert positions are given against the current array. Every one of these is written as something that
only works out loud, not as a précis of its section: the deck rule is unchanged and none of these is
a second rendering of prose.

### A. `deck-step3-change-environment` — HIGH

Closes `change`, after `deck-step3-change-gates` (index 5), matching unit order.

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

**Constraint honoured:** the note is the gem diagnostic, which is a thing the tutor asks the room to
do, and it deliberately **does not name a file**. `SlideSpec` has no assistant mechanism and no deck
string in any of the four steps names `CLAUDE.md` or `.github/copilot-instructions.md` (verified by
grep). A slide that named one would be wrong for half the room with nothing filtering it.

### B. `deck-step3-change-business` — MEDIUM

After `deck-step3-change-test-engineer` (index 2), matching unit order.

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

Rationale: this is the section's out-loud half, the one a room pushes back on. `divider.2` already
carries the "weekly, not at the demo" half, so the slide deliberately takes the other one and does
not repeat it. Medium rather than high because the section is at least represented on the divider.

### C. `deck-step3-expectations-burden` — HIGH

After `deck-step3-expectations-missing` (index 9 as the array stands), matching unit order.

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

**Constraint honoured:** step 3's `CLAUDE.md` says `detail-nobody-specified` "deliberately names none
and stays on returns alone", because `change` and `impostor` each already enumerate three concrete
cases and a third enumeration "turns the step into one paragraph told three times". So this slide
names **no** empty list, expired tier or zero amount. If a later edit adds them, it breaks the
constraint.

### D. `deck-step3-expectations-estimate` — MEDIUM-HIGH

After C, matching unit order.

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

The Dutch deliberately reuses the unit's own wording (`expectations.estimate-still-matters.2`:
*"Noem dus een datum waarin het nakijken zit, of \"klaar\" betekent twee verschillende dingen in
dezelfde vergadering"*), so the board and the page say it the same way.

**Paired edit — `deck.expectations.divider.3`.** As it stands, divider points 2 and 3 are the two
halves of one sentence from `estimate-still-matters.2`, so two of three scarce divider lines argue
one section while `detail-nobody-specified` gets none. Once D exists, point 3's content is on a slide
of its own and the line is free. Repoint it at the unit's hardest claim:

| key | en | nl |
|---|---|---|
| `deck.expectations.divider.3` | `The burden <mute>moved rather than lifted</mute>` | `De last <mute>is verschoven, niet verdwenen</mute>` |

Do this only together with D. Making the swap without adding D moves the hole rather than filling it.

### E. `deck-step3-impostor-written` — HIGH (this is the deck's ending)

Last slide of step 3, and therefore of the deck.

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
divider states the unit's claims and the slides after it are the proof. Again, **no filename** on the
slide; the unit paragraph behind it is a `data-assistant` pair and the deck cannot filter one.

### F. `deck-closing` — OPTIONAL, and outside this file

Not step 3's to decide, but step 3 is where it would land, so it is recorded here. The deck opens on
a question in `ui` and never returns to it. The symmetric fix is a `CLOSING` const in
`shared/deck/slides.tsx` beside `OPENING`, appended after the steps:

```tsx
const CLOSING: SlideSpec[] = [
  { id: 'deck-closing', kind: 'statement', eyebrow: 'deck.slide.closing.eyebrow',
    title: 'deck.slide.closing.answer' },
]
const DECK = [...OPENING, ...steps.flatMap((s) => s.deck ?? []), ...CLOSING]
```

| key | en | nl |
|---|---|---|
| `deck.slide.closing.eyebrow` | `The opening question` | `De openingsvraag` |
| `deck.slide.closing.answer` | `<hi>Agentic engineering</hi> is the goal, the check, and the reading` | `<hi>Agentic engineering</hi> is het doel, de check en het nalezen` |

Two warnings if this is taken: `ui` keys are typed `Record<MessageKey, string>`, so the English and
Dutch must land in the same commit or `tsc -b` fails; and it puts a fifth non-step slide in `ui`,
which the deck rules currently describe as "the deck chrome and the cross-step opening slide". That
sentence in `front/CLAUDE.md` would need amending in the same change. Refuse this one cleanly if the
tutor would rather close by talking.

---

## 6. Net effect

13 slides → 18 (19 with F). Content slides 9 → 13, i.e. 0.93 per section, between step 1's 0.82 and
one-per-section; every section still has at least a divider point behind it; five of the additions
are statements, so the step keeps its one drawing and its argued-out-loud character. Divider count,
dark-card count, figure handling and id scheme are all unchanged.

New locale keys: 10 English + 10 Dutch (A–E), plus 3 English + 3 Dutch edits (G, H, J and the
`divider.3` repoint). All in the `step3` namespace. `deck.tsx` is integrator-owned, so this dossier
is the manifest for it.
