# Dossier: step 2's presentation deck

Subject: `front/src/steps/step2/deck.tsx` + the `deck.*` keys in
`front/src/steps/step2/locales/{en,nl}.json`.
Measured against the deck rules in `front/CLAUDE.md` ("## The presentation deck"),
`front/src/steps/step2/CLAUDE.md`, the ten unit HTML files, and `audit.md` (rows 48 and 49).

**Verdict: needs work.** Not because anything on it is badly made. The mechanics are clean, the
placement decisions are recorded with their pixel arithmetic, the slide text is genuinely well
written and carries no AI tell I can find. The defect is coverage. Step 2 is 42 slides across ten
units, and **eleven of the step's arguments reach the room through neither a slide nor a page
figure**. Because guided mode is the default and drops every run of prose from the unit page, those
eleven are not "thin on the board" — in a classroom they are not on any screen in the room at all.

---

## 0. What is already right, so it does not get broken

Stated plainly because several of my proposals sit next to these and must not disturb them.

- **Correctness is clean.** All 42 ids are unique across the 109-slide deck; every one is
  `deck-step2-…`, so step 1's legacy bare names are respected; every spec carries `ns: 'step2'`;
  every key referenced by `deck.tsx` resolves in **both** `en.json` and `nl.json` (81 `deck.*` keys
  each, zero missing, zero orphaned); no `deck.*` value in either language contains an em-dash, an
  unbalanced tag, or a tag other than `<hi>`/`<mute>`; no slide carries `note` and `points` together;
  all ten unit dividers carry points, so the deck-wide divider rule holds.
- **The localStorage rule is honoured and the docblock says why.** `SetupFlags`, `Workshop` and
  `WhereWouldItGo` are off the board with a recorded reason, and each of the three exercises gets a
  statement that names what the student *does* and never what they find. `deck.setup.flags.note`
  ("Three flags in plain text. Find out how it instructs an agent.") does exactly what
  `step2/CLAUDE.md` demands: it gives the shape and the size of the hunt and names no file.
  `deck.workshop.flags.*` names five flags by shape and gives away no answer.
- **The slide text is house voice.** Short declaratives, concrete nouns, a willingness to state a
  view: "Nothing gets shorter. The work moves.", "You run out of attention before you run out of
  tokens", "A correction stays in the window. A rewind never happened." I hunted the tell list and
  found no tricolon rhythm, no "not just X but Y", no announcing opener, no empty intensifier, no
  closing gesture at significance. The Dutch is at the same level and puts its emphasis where Dutch
  word order wants it rather than tracking the English span. Leave this alone.
- **`workflows` is what the whole deck should look like.** Divider plus four flow diagrams read down
  in the unit's own order, plus the closing pair in the unit's own order, plus a note on the audit
  slide that carries the one rule the drawing cannot ("Ask for a table, or you get an essay"). Seven
  slides that between them cover every section of the unit. This is the standard the other nine
  units are being measured against below, and it is the deck's own standard, not one I imported.

---

## 1. Coverage: the eleven arguments that reach the room through nothing

Method, so this is checkable rather than an impression. For every `<h2>` in the ten unit HTML files
I asked two questions: does a figure sit in that section (which survives guided mode), and does any
slide or divider point carry its claim. Sections that answer no to both:

| Unit | Section | What is lost |
|---|---|---|
| `evolution` | `A prototype starts a conversation` | Three takes built in the time one argument costs, put in front of people. `step2/CLAUDE.md` is explicit that this is **not** `IterationPaths`'s argument, so the figure slide does not cover it. |
| `setup` | `Your own CLAUDE.md` | `~/.claude/CLAUDE.md`, read in every project on this machine, plus the step's **first `data-variant="warning"`**: nothing in it reaches your team. A whole section and a hazard callout. |
| `engineering` | the lead | "That works for about an hour." The vibe-coding-against-agentic-engineering line the step's spine rests on, and the one `workflows.naive.1` links back to. |
| `steering` | `Make it stop at the gap` | `gaps.md`, and the third part that is the lesson: **stopping**, not logging. `step2/CLAUDE.md`: "Do not soften the stop into 'flag it and continue'." No figure, no slide, no divider point. |
| `enablement` | `Where the day goes` | "A decision you did not make is one the agent made for you", which `step2/CLAUDE.md` records as the surviving instruction from the cut `code-got-cheap` section. Its only home in the course, and it is not on the board. |
| `parallel` | `The orchestrator` | Where the coordination goes: into the agent rather than into your head. `AgentsAtOnce` draws row three, but nothing on the board says what row three *is*. |
| `goals` | `When the goal is the whole job` | The four-hour run you walk away from, and wiring the check into the build first. |
| `goals` | `Most of it is waiting` | The clock being run by your own test suite; start it before lunch. |
| `goals` | `Give it its own worktree` | Isolation from your own day, and merging in pieces so a run that dies in hour three has not taken hours one and two with it. |
| `goals` | `Design tools` | Deliberately the shortest section; a divider point would do. |
| `goals` | `Read what came back` | The unit's closing handoff into `workshop`. |

Two more sections are carried by a page figure but say nothing on the board: `steering`'s
`A worktree each` and `goals`'s `The check is the exit` and `Research on the frontier model`. Those
are the drawings `audit.md` row 48 already asks for (see §3).

**The distribution behind it.** Content slides after the divider, against unit length in words:

| Unit | Words | Content slides |
|---|---:|---:|
| `goals` | 1419 | 4 |
| `workshop` | 1104 | 2 |
| `steering` | 1102 | 2 |
| `workflows` | 951 | 7 |
| `evolution` | 834 | 4 |
| `setup` | 777 | 4 |
| `engineering` | 555 | 3 |
| `parallel` | 518 | 2 |
| `patterns` | 432 | 2 |
| `enablement` | 369 | 2 |

The deck tracks **how many drawings a unit happens to own**, not what the unit argues. `workflows`
has seven figures and gets seven slides; `steering` has five sections and gets two; `goals` is the
longest unit in the step by 300 words and gets four. That is not a judgement call gone one way, it
is the absence of a judgement: nothing decided that `gaps.md` was worth less board time than the
fourth of four flow diagrams.

---

## 2. Two findings that are defects rather than gaps

### 2.1 `deck.steering.divider.2` states a rule the unit refuses to state, and the deck contradicts it two slides later

> `"deck.steering.divider.2": "Rewinding beats correcting"` / `"Terugspoelen verslaat corrigeren"`

`steering.interrupt-or-go-back.4` is a two-way rule and says so: *"Choose by asking what the work so
far is worth. If it is good and you are adding something it did not know, send a new message. If it
is wrong because your request was wrong, go back and fix the request."* The deck's own note on the
figure slide agrees with the unit — `deck.steering.rewind.note`: "Choose by what the work so far is
worth." The divider point does not. A room reading the board gets a ranking the course does not
teach, and then gets it corrected two slides later without being told it was corrected.

**Fix (EN/NL):**
`deck.steering.divider.2` → `"A correction adds to the pile. <hi>A rewind takes it out.</hi>"` /
`"Een correctie stapelt op. <hi>Een rewind haalt het eruit.</hi>"`
That is `interrupt-or-go-back.4`'s last two sentences, it is the mechanic rather than a preference,
and it sets up the figure slide instead of arguing with it.

### 2.2 The docblock's reason for keeping `WorktreeEach` off the board is factually false

> *"`WorktreeEach` has no slide to sit on: neither the divider nor either steering slide raises
> worktrees, and one worktree per agent reaches the board through `parallel`."*

The second half is not true. `worktree` appears in **no** `deck.*` key in either language, and
`AgentsAtOnce` does not draw or label one. One worktree per agent does not reach the board at all.
`audit.md` row 48 currently reads this as "the step's deck now records a reason for leaving the
other two off rather than an oversight" — the reason is recorded, and it is wrong, which is worse
than an oversight because it stops anybody looking again.

The first half is also circular: the divider does not raise worktrees *because the divider was
written that way*. `steering`'s worktree section carries the argument `goals` deliberately does not
(two contexts, two bills, your reading as the bottleneck), and `step2/CLAUDE.md` insists those two
arguments stay apart, which means each needs its own home. The board gives it none.

**Fix:** the slide in §4 (`deck-step2-steering-worktree`), and rewrite that paragraph of the
docblock. `LoopInWindow`'s reason in the same paragraph is sound and should stay: its claim is the
slide's title and the three recovery points are what the drawing does not carry.

---

## 3. Prior art: what `audit.md` already knows

Row 48 records `GoalGate`, `ReadEachTime` and `ModelRelay` as three fresh `goals` figures with no
slide, and asks for "three slides under `deck-step2-goals`". That is a known gap, not a discovery
here, and §4 supplies the specs rather than re-arguing it. One thing row 48 does not see: the deck
already **states in words what `ReadEachTime` draws**. `deck.goals.fleet.title` is "Five agents read
the project five times", which is the drawing's whole argument, sitting on a `statement` slide while
the drawing goes unused. The deck rule says figures are the one thing reused from the units so the
room and the screens see one drawing; here the room gets a paraphrase of a drawing the students have.
That slide should be converted rather than joined by a fourth.

Row 48's other half (`SessionWindows` and `usage-readout` cannot go on a board because the deck has
no assistant filter) does not touch step 2: `front/src/steps/CLAUDE.md` records that step 2 is the
one step not written for two assistants, so nothing here is assistant-specific.

---

## 4. Proposed slides

Ordered by where they land. Every new key needs its `nl.json` sibling; Dutch drafts are given.
Scales are fitted against the step's existing evidence: 640×228 rides 1.7 (`WindowSpend`), 640×220
and 640×250 and 640×268 ride 1.5, 640×306 rides 1.3 **with a note**, 640×518 rides 1.02.

### 4.1 `evolution` — add a fourth divider point

The divider spends two of its three points on one sentence of `lead.2` and the third on a claim the
very next-but-one slide repeats (see §5). Nothing on it carries `prototype-conversation` or
`lead.3`'s "take the same step twice". Dividers may run to five points.

```
points: [ …existing three…, 'deck.evolution.divider.4' ]
```
- EN `deck.evolution.divider.4`: `Three takes in front of people, <mute>not one argument about them</mute>`
- NL: `Drie versies voor mensen neerzetten, <mute>in plaats van er één keer over discussiëren</mute>`

### 4.2 `setup` — a slide for `Your own CLAUDE.md`, after `deck-step2-setup-project`

```tsx
{
  id: 'deck-step2-setup-your-own',
  kind: 'statement',
  ns: 'step2',
  eyebrow: 'setup.title',
  title: 'deck.setup.your-own.title',
  note: 'deck.setup.your-own.note',
},
```
- EN title: `One more, and it is <hi>not in the repository</hi>`
- NL title: `Er is er nog één, en die staat <hi>niet in de repository</hi>`
- EN note: `It holds how you work rather than what the project is. Nothing in it reaches your team.`
- NL note: `Die houdt bij hoe jij werkt, niet wat het project is. Niets erin bereikt je team.`

A statement rather than a figure: `ProjectTree` draws the repository, and this file is the one that
is not in it, so putting it on the tree slide would contradict the drawing.

### 4.3 `setup` — repoint divider point 2 onto the cost argument

`deck.setup.divider.2` ("Skills match on their description") is `deck.setup.skills.note` two slides
early, and the description-matching claim belongs under the drawing where the note already puts it.
Meanwhile `setup.skills.5` — you pay for a description on every turn whether or not it fires — is
one of the two sites `step2/CLAUDE.md` says the cost argument is deliberately told at, and it is not
on the board.

- EN `deck.setup.divider.2`: `You pay for every description, <mute>fired or not</mute>`
- NL: `Je betaalt voor elke description, <mute>of hij nu afgaat of niet</mute>`

### 4.4 `engineering` — a slide for the lead, first under the divider

```tsx
{
  id: 'deck-step2-engineering-vibe',
  kind: 'statement',
  ns: 'step2',
  eyebrow: 'engineering.title',
  title: 'deck.engineering.vibe.title',
  note: 'deck.engineering.vibe.note',
},
```
- EN title: `Vibe coding works <hi>for about an hour</hi>`
- NL title: `Vibe coding werkt <hi>ongeveer een uur</hi>`
- EN note: `Then the fixes break each other and you are steering a system nobody has read.`
- NL note: `Daarna breken de fixes elkaar en stuur je een systeem dat niemand gelezen heeft.`

This is the claim the step is built on and the one `workflows.naive.1` sends the reader back to. It
also gives a tutor the line to open the unit with, which is exactly the "only works out loud"
category the deck exists for. `evolution`'s deliberate exception (a version you intend to delete is
where the line does not hold) belongs in the tutor's mouth, not on the slide.

### 4.5 `steering` — three slides, in unit order after `deck-step2-steering-nowhere`

Mid-flight first (lower priority than the other two, but it is the only keystroke in the course and
its three moves are a list a room can hold):

```tsx
{
  id: 'deck-step2-steering-midflight',
  kind: 'statement',
  ns: 'step2',
  eyebrow: 'steering.title',
  title: 'deck.steering.midflight.title',
  points: ['deck.steering.midflight.1', 'deck.steering.midflight.2', 'deck.steering.midflight.3'],
},
```
- EN title: `Escape stops it <hi>where it stands</hi>` / NL: `Escape stopt het <hi>waar het staat</hi>`
- EN 1: `Still thinking: <mute>nothing on disk</mute>` / NL: `Nog aan het denken: <mute>niets op schijf</mute>`
- EN 2: `Already writing: <mute>now you pick what to revert</mute>` / NL: `Al aan het schrijven: <mute>nu kies je wat terug moet</mute>`
- EN 3: `Something small: <hi>type it while it works</hi>` / NL: `Iets kleins: <hi>typ het terwijl het werkt</hi>`

This slide goes **before** `deck-step2-steering-rewind`, matching the unit. The third heaviest move
(stop and throw the session away) stays off it deliberately: `deck-step2-steering-nowhere` owns it.

Then the worktree, which fixes §2.2:

```tsx
{
  id: 'deck-step2-steering-worktree',
  kind: 'figure',
  ns: 'step2',
  eyebrow: 'steering.title',
  title: 'deck.steering.worktree.title',
  note: 'deck.steering.worktree.note',
  figure: <WorktreeEach />,
  // 640x262 with a note; TwoWindows is 640x306 at 1.3, so this has room. Check the note clears
  // the two folder labels before committing to it.
  scale: 1.4,
},
```
- EN title: `A worktree each: <hi>neither can reach the other's files</hi>`
- NL title: `Elk een worktree: <hi>geen van beide komt bij de bestanden van de ander</hi>`
- EN note: `Two agents are two contexts and two bills, and two diffs you did not write.`
- NL note: `Twee agents zijn twee contexten en twee rekeningen, en twee diffs die je niet zelf schreef.`

The note is the cost paragraph, which `step2/CLAUDE.md` records as the thing the drawing deliberately
does not carry — so the note earns its place under this figure the way the audit slide's does. It
must stay `steering`'s bill-and-attention argument and must not borrow `goals`'s isolation one.

Then `gaps.md`, the strongest omission in the step:

```tsx
{
  id: 'deck-step2-steering-gaps',
  kind: 'statement',
  ns: 'step2',
  eyebrow: 'steering.title',
  title: 'deck.steering.gaps.title',
  points: ['deck.steering.gaps.1', 'deck.steering.gaps.2', 'deck.steering.gaps.3'],
},
```
- EN title: `An agent will not tell you <hi>it guessed</hi>`
- NL title: `Een agent zegt je niet dat hij <hi>gegokt heeft</hi>`
- EN 1: `Never assume` / NL 1: `Ga nergens vanuit`
- EN 2: `Write the gap down` / NL 2: `Schrijf het gat op`
- EN 3: `<hi>Stop.</hi> <mute>The first two are bookkeeping</mute>` / NL 3: `<hi>Stop.</hi> <mute>De eerste twee zijn boekhouding</mute>`

The three points are the three parts of the `CLAUDE.md` block, in order, with the third marked as
the one that matters — which is the section's own structure and the thing `step2/CLAUDE.md` forbids
softening. Points rather than a note precisely because the rule is three parts.

### 4.6 `patterns` — retitle the third-time slide onto the section it stands in front of

`deck.patterns.third-time.title` ("The third time you type it, it is knowledge with no home") is
`deck.patterns.divider.1` ("The third time you type it, write it down") one slide later, and it
leaves `Skill iteration` — the section the slide actually precedes, and the one whose two `<pre>`
blocks differ by exactly one rule — with nothing said about it. Rename the slide (its id names the
claim, and the claim changes) and give it the section's argument:

```tsx
{
  id: 'deck-step2-patterns-iteration',   // was deck-step2-patterns-third-time
  kind: 'statement',
  ns: 'step2',
  eyebrow: 'patterns.title',
  title: 'deck.patterns.iteration.title',
  note: 'deck.patterns.iteration.note',
},
```
- EN title: `The first skill feels like magic. <hi>The second pass is the work.</hi>`
- NL title: `De eerste skill voelt als magie. <hi>De tweede ronde is het werk.</hi>`
- EN note: `Repair the output, then ask the agent what the skill failed to say.`
- NL note: `Herstel de output en vraag de agent dan wat de skill niet gezegd heeft.`

The lead's "third time you type it" claim keeps its home in `deck.patterns.divider.1`, which is the
right size for a one-sentence lead. Retire `deck.patterns.third-time.title` from both bundles.

### 4.7 `enablement` — a slide for `Where the day goes`, last in the unit

```tsx
{
  id: 'deck-step2-enablement-day',
  kind: 'statement',
  ns: 'step2',
  eyebrow: 'enablement.title',
  title: 'deck.enablement.day.title',
  note: 'deck.enablement.day.note',
},
```
- EN title: `A decision you did not make is <hi>one the agent made for you</hi>`
- NL title: `Een beslissing die jij niet nam, is er <hi>een die de agent voor je nam</hi>`
- EN note: `You are not typing the code. Most of the week is driving it and reading what came back.`
- NL note: `Je typt de code niet meer. Het grootste deel van de week is sturen en lezen wat terugkwam.`

Keep it about **deciding**. `step2/CLAUDE.md` warns that this section turns into `engineering` a
second time if it drifts toward structure, and the note above is the "where the hours go" half
rather than a second bar-in-the-build claim.

### 4.8 `parallel` — a fourth divider point for the orchestrator

Four sections, two content slides, and the one section whose placement `step2/CLAUDE.md` calls
load-bearing ("it is `Many agents at once` answered") has no words on the board.

- EN `deck.parallel.divider.4`: `An orchestrator moves the coordination <hi>into the agent</hi>`
- NL: `Een orchestrator verplaatst de coördinatie <hi>naar de agent</hi>`

A point rather than a slide: the section is one paragraph, `AgentsAtOnce` already draws rows three
and four, and `step1/harness` owns the mechanism, so a slide would risk re-deriving it.

### 4.9 `goals` — the three drawings `audit.md` row 48 asks for, and one conversion

Insert `deck-step2-goals-gate` after `deck-step2-goals-shape` (unit order: goal shape, then the
check is the exit):

```tsx
{
  id: 'deck-step2-goals-gate',
  kind: 'figure',
  ns: 'step2',
  eyebrow: 'goals.title',
  title: 'deck.goals.gate.title',
  // 640x204, the shortest drawing in the step: WindowSpend at 640x228 rides 1.7.
  figure: <GoalGate />,
  scale: 1.7,
},
```
- EN title: `The only way out is <hi>the check saying yes</hi>`
- NL title: `De enige uitgang is <hi>de check die ja zegt</hi>`

The title must not become a third statement of "name the command": `deck.goals.divider.2` and
`deck.goals.shape.3` already carry that. What the drawing adds is that the command is the *only*
exit and that the waiting lives inside the gate, so the title says exit.

Convert `deck-step2-goals-fleet` from a statement to a figure, keeping both its strings:

```tsx
{
  id: 'deck-step2-goals-fleet',
  kind: 'figure',                       // was 'statement'
  ns: 'step2',
  eyebrow: 'goals.title',
  title: 'deck.goals.fleet.title',      // unchanged: it is what the drawing argues
  note: 'deck.goals.fleet.note',        // unchanged
  figure: <ReadEachTime />,
  // 640x288 with a note; SkillShape at 640x268 rides 1.5, TwoWindows at 640x306 rides 1.3 with a note.
  scale: 1.4,
},
```
Costs no extra slide and stops the board paraphrasing a drawing the students already have.

Then the relay, after it (unit order: ultracode, then frontier model):

```tsx
{
  id: 'deck-step2-goals-relay',
  kind: 'figure',
  ns: 'step2',
  eyebrow: 'goals.title',
  title: 'deck.goals.relay.title',
  // 640x246, no note; LoopsPerHour at 640x250 rides 1.5.
  figure: <ModelRelay />,
  scale: 1.5,
},
```
- EN title: `Three tiers, and <hi>you are the digestion</hi> between them`
- NL title: `Drie lagen, en <hi>jij bent de vertering</hi> ertussen`

That is `research-frontier-model.2`'s own closing claim, and it names what the figure's two teal
arrows are labelled with rather than what the tiers are like — which keeps it off `ModelTiers`'s
ground in `step1/model`, as `step2/CLAUDE.md` requires. The figure tags its columns `Fable`, `Opus`
and `Sonnet`; a tutor should say the date out loud, and the slide should not carry it (the `<small>`
line belongs to the unit page).

### 4.10 `goals` — a fourth divider point, or accept the loss

Four sections stay off the board even after the three figures land: `When the goal is the whole job`,
`Most of it is waiting`, `Give it its own worktree`, `Design tools`. Three of the four are the same
argument at different sizes (a long run you walk away from, and where it should live), so one point
covers them honestly:

- EN `deck.goals.divider.4`: `Four hours you walk away from, <mute>in a worktree of its own</mute>`
- NL: `Vier uur waar je van wegloopt, <mute>in een eigen worktree</mute>`

`Design tools` I would leave off: `step2/CLAUDE.md` says it is deliberately the shortest section and
what it adds is the timing, which `deck.goals.divider.3` already carries.

### 4.11 `workshop` — the payoff slide, and a closer that is not the third telling

The step's board currently ends on `deck.workshop.goal.title` ("Hand over a goal, not a keystroke"),
which is the third slide in eight to state one claim: `deck.goals.divider.1` ("Name the outcome, not
the keystrokes") and `deck.goals.shape.1` ("Name the outcome") got there first. Meanwhile the
workshop's own best idea — mutation testing as the answer to the proxy trap — is nowhere on the
board, and it is the payoff to `deck.engineering.gates.title`, which is on it.

Add, after `deck-step2-workshop-flags`:

```tsx
{
  id: 'deck-step2-workshop-honest',
  kind: 'statement',
  ns: 'step2',
  eyebrow: 'workshop.title',
  title: 'deck.workshop.honest.title',
  note: 'deck.workshop.honest.note',
},
```
- EN title: `A hundred percent of the lines, <mute>under tests that assert nothing</mute>`
- NL title: `Honderd procent van de regels, <mute>onder tests die niets asserten</mute>`
- EN note: `So the third goal is not coverage. It is whether the coverage is honest.`
- NL note: `Het derde doel is dus geen dekking. Het is of de dekking eerlijk is.`

This reveals nothing: `workshop.honest.1` and `.2` say it in plain prose on the page. It is the
plant-and-payoff pair `step2/CLAUDE.md` deliberately keeps apart (`engineering.quality-gates.1`
carries the trap with no example, `workshop.honest.1` carries the example) landing correctly on the
board for the first time.

And retitle the closer onto the claim the workshop actually adds:
- EN `deck.workshop.goal.title` → `<hi>The build</hi> decides, not the agent's word for it`
- NL → `<hi>De build</hi> beslist, niet het woord van de agent`

That is `workshop.goals.2`'s own sentence, it ends the step on the thing the step can grade, and it
stops the board saying "outcome, not keystrokes" for a third time.

---

## 5. Density: the divider points that duplicate the slide behind them

The dividers arrived in a later pass than the slides, and four of them landed on a claim the
following slide already carries. Each one is a wasted line on the deck's most valuable real estate,
because a divider is the only slide that gets to say what a unit is about.

| Divider point | Duplicates | Fix |
|---|---|---|
| `setup.divider.2` "Skills match on their description" | `setup.skills.note` "The description is what the match is made against" | §4.3 |
| `patterns.divider.1` "The third time you type it, write it down" | `patterns.third-time.title` "The third time you type it, it is knowledge with no home" | §4.6 (retitle the slide, keep the point) |
| `goals.divider.1` "Name the outcome, not the keystrokes" | `goals.shape.1` "Name the outcome" **and** `workshop.goal.title` | §4.11 |
| `evolution.divider.3` "Shape first, details later" | `evolution.skeleton.title` "The shape first, none of the details" | Weakest of the four. If it is worth touching, the slide is the one to change, since it sits over a screenshot and should name what is in it: EN `A sidebar, a question, <mute>and nothing else yet</mute>` / NL `Een zijbalk, een vraag, <mute>en verder nog niets</mute>`. |

One slide says nothing beyond a claim already made: `deck-step2-workshop-goal`, handled in §4.11.
Nothing else on the board is filler — the exercise statements (`evolution-fifteen`, `setup-flags`,
`engineering-sort`) all carry an instruction a room cannot read off a page it does not have in
guided mode, and they are correctly shaped.

---

## 6. Sequence

The deck runs in registry order and each unit's slides run in that unit's own order, which is what a
tutor needs. Two wobbles, both minor, both worth a decision rather than a rewrite:

1. **`goals` puts its window figure third.** `WindowSpend` sits under the unit's *lead* because the
   tail of a window is what two later sections lean on, and `step2/CLAUDE.md` calls it the one figure
   in the step read forwards. On the board it lands after `true` and `shape`, while
   `deck.goals.divider.3` has already stated the conclusion ("The expensive moves belong at the tail
   of a window") three slides earlier. A tutor therefore explains windows at the divider, drops the
   thread, and comes back to it. Moving `deck-step2-goals-window` to immediately after the divider
   restores the unit's own reading order and costs nothing.
2. **`steering` currently opens on its second section.** The divider's first point is Escape and the
   first slide is the rewind figure, so mid-flight exists on the board as four words with no landing.
   §4.5's first slide fixes it.

After the proposals the deck is 42 → 51 slides (nine added, one converted, two retitled, three
divider points added or repointed, one reworded). Step 1 carries 48 slides for ten units of
comparable length, so this is proportion rather than inflation.

---

## 7. Figures: the ledger

| Figure | On a slide | Correct? |
|---|---|---|
| `IterationPaths`, `ProjectTree`, `SkillTree`, `HookTree`, `DomainTree`, `TwoWindows`, `ScriptRuns`, `FlowDiagram` ×4, `WorkflowWeights`, `WorkflowTimeline`, `LoopsPerHour`, `SkillShape`, `AgentsAtOnce`, `WindowSpend`, `UnitShot` ×2 | yes | yes |
| `SetupFlags`, `Workshop`, `WhereWouldItGo` | no | **yes** — they write to localStorage and would tick the tutor's machine. Recorded in the docblock. |
| `AuditExample` | no | yes — it only earns its markdown toggle beside the paragraph that reads it. Recorded. |
| `LoopInWindow` | no | yes — its claim is the slide's title and the three recovery points are what the drawing does not carry. Recorded. |
| `WorktreeEach` | no | **no** — the recorded reason is false (§2.2). §4.5. |
| `GoalGate`, `ReadEachTime`, `ModelRelay` | no | **no**, and with no reason recorded at all. `audit.md` row 48. §4.9. |

The `FlowDiagram` instances repeat the registry's props exactly, so the board and the page draw one
set. I diffed all four against `index.tsx`: identical, including `faint: ['spec']` and `loopTo={2}`.

---

## 8. If only three things get done

1. **§4.5 — `steering`'s three slides.** The unit is 1,102 words and reaches the room through two
   slides, and `gaps.md` reaches it through nothing. Fix §2.2's false docblock reason in the same
   pass.
2. **§4.9 — the three `goals` drawings, with `fleet` converted rather than duplicated.** Already on
   the audit as row 48, and the paraphrase-of-a-drawing problem is worse than the missing drawing.
3. **§2.1 — `deck.steering.divider.2`.** One string, and it currently teaches the wrong rule.
