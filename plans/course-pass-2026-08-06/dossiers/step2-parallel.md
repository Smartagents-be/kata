# step2 / parallel — audit dossier

Unit: `front/src/steps/step2/units/parallel.html` (12 prose keys, 518 words, one figure,
no task, no quiz). Read against `front/src/steps/step2/CLAUDE.md`, `front/CLAUDE.md`,
`.claude/skills/lesson-writing/SKILL.md`, `.claude/skills/quiz-writing/SKILL.md`, `audit.md`
(rows 15, 42, 22, 50), `AgentsAtOnce.tsx`, `steering.html`, `enablement.html`, `goals.html`,
`step1/units/harness.html`, `kata/step2/java`, and both locale bundles.

Verified clean before anything else: no em-dashes in the HTML or in its Dutch; 12 of 12 prose
keys have a Dutch entry and nothing is orphaned; the `data-figure` marker is a direct child of
the body and unwrapped; the `pattern` icon sits where the full stop would go, per
`step1/harness.html`'s convention; the warning aside is one of the three `front/CLAUDE.md`
counts, and that file already names this one.

---

## 1. AI tells

**None.** This is human prose and it is among the better-written units in the step. It opens cold
on a claim, the paragraph lengths are uneven, the closers are the sharpest lines in their
paragraphs ("Nothing else is running, so nothing else is asking for you.", "Attention is what you
run out of, well before the tokens."), and there is not a "crucial", a "leverage", a "not just X
but Y", or a summary paragraph anywhere in it. The four headings are plain labels in sentence
case, and `The orchestrator` is the name rather than a slogan, which is the rule
`lesson-writing` states.

One observation I am explicitly **not** filing as a finding, so nobody acts on it as one: the unit
runs four three-part lists in seven blocks ("You see the file..., you answer..., and the diff...";
"A late-fee rule..., a query..., a domain model..."; "all at once, in four places, on work you did
not watch"; "settle the names, argue the model, write the spec"). That is denser than `steering`,
which manages two in twelve blocks. But every one of them is a list of concrete things rather than
a list of adjectives, which is the version of the tricolon the brief bans. Flattening them would
cost the unit its rhythm and buy nothing.

---

## 2. Truthfulness

Everything checkable checks out except one overclaim and one drift.

**1. `parallel.one-agent-time.1` — "The steering unit is all about that window."**
- **Where** `front/src/steps/step2/units/parallel.html:7`
- **Problem** `steering` has five sections. Three are the window (`Mid-flight`,
  `Interrupt, or go back`, `When it is going nowhere`); two are not (`A worktree each`,
  `Make it stop at the gap`). "All about" is a claim the linked page does not support, and it is
  the unit's own next section that relies on one of the two that are not, when it sends the reader
  to `steering` for worktrees. `enablement.where-day-goes.1` already says the accurate version of
  this sentence: "The steering unit covers what you do while a run is in flight."
- **Fix** `<a href="/steps/step2/steering">The steering unit</a> is what you do inside that
  window.` Dutch: `<a href="/steps/step2/steering">De unit over bijsturen</a> gaat over wat je in
  dat venster doet.`

**2. Three sites, two different claims about how much of the day this is.**
- **Where** `parallel.one-front-rest.1` (EN and NL), `deck.parallel.divider.3` (EN and NL),
  and `front/src/steps/step2/CLAUDE.md`
- **Problem** The English prose says "it is the most of the day most people get" (a fraction of
  one day). The Dutch says "het grootste deel van de dag dat de meeste mensen krijgen" (same
  claim). The deck says "Most days: one in front, the rest behind" / "De meeste dagen" (a fraction
  of your days, a different claim). `step2/CLAUDE.md` describes the section as "which is what most
  days actually look like", siding with the deck. A tutor reading off the slide and a student
  reading the page are being told two different things, and the file that records the decision
  agrees with the slide.
- **Fix** Pick the day-shape claim, which is the stronger one and the one the deck and the notes
  already carry, and make the prose say it. English: `Middling control, and it is what most days
  actually look like.` Dutch: `Controle ergens in het midden, en zo ziet een doorsnee dag er
  gewoon uit.` (This also disposes of the readability stumble in §4.1.)

Verified correct, listed so nobody re-checks them:

- "Step 1's unit on the harness called this the coordinator and worked out what it costs" —
  `harness.coordinator.1` names the coordinator and prices the tiers, `.2` prices the empty
  sub-agent context. Both halves true.
- "Give each agent its own git worktree, which `steering` argues for" — `steering.worktree-each`
  argues exactly that, and defines the term, which is why this unit is right not to.
- "the unit on goals is where that shape is argued" — `goals.goal-oriented.1` defines a goal as a
  task with an outcome something else can measure. True, and it is a forward link, which
  `audit.md` row 42 already records as the one seam this unit does thread.
- "A late-fee rule that rounds the wrong way" is not a generic invention: `LateFeePolicy.assess`
  in `kata/step2/java` does `fee + (fee / 5)`, `fee / 2` and `fee - (fee / 4)` on longs, so it
  truncates in three places, and `steering.interrupt-or-go-back.1` has already put that class name
  in front of the reader. The example is grounded even though it does not say so.
- `agents-at-once.description` matches what the component actually draws, wire for wire.

---

## 3. Progression

**1. The warning aside opens by repeating the paragraph directly above it, and the recorded
reason for keeping that sentence is not true against the tree.**
- **Where** `parallel.many-agents-once.3`, first sentence, against `parallel.many-agents-once.2`,
  last clause
- **Problem** `.2` ends "or they edit the same files and you find out at merge time". The aside
  under it opens "Two agents on the same code write over each other, and the more of them you run
  the likelier that gets." That is the same hazard, one block later, in a louder box, and the
  paragraph that raised it has already given the fix (a worktree each). So the unit's only
  hazard callout opens on a problem the reader was just told how to avoid, which spends the
  amber. `step2/CLAUDE.md` defends it on the grounds that the aside "carries the two costs no
  other unit states", and that is wrong on this half twice over: `many-agents-once.2` states it
  immediately above, and `steering.worktree-each.2` states it in full ("neither can reach the
  other's files. No half-finished edit from one shows up in the other's `mvn test`"). The half
  that genuinely has no other home is the attention one, and it is sentences two to four.
- **Fix** Cut the first sentence. The aside then opens cold on its own claim, and "The other
  ceiling is you" reads straight off `.2`'s merge-time ending, so nothing else moves:

  > The other ceiling is you. Four streams of output in an afternoon is more than anyone reads
  > carefully, and the tenth diff gets less of you than the first did. Attention is what you run
  > out of, well before the tokens.

  Dutch: `Het andere plafond ben jij. Vier stromen output op één namiddag is meer dan iemand
  aandachtig leest, en de tiende diff krijgt minder van je dan de eerste kreeg. Aandacht raakt op,
  ruim voor je tokens.` If the scaling claim is worth keeping, it belongs on `.2`'s own sentence
  ("...and you find out at merge time, and the more of them you run the likelier that gets"),
  not in the callout.
- **Constraint this touches** `step2/CLAUDE.md`'s paragraph beginning "The warning aside closes
  `Many agents at once`" says the aside carries **two** costs no other unit states. That line has
  to be revisited with this edit: it should say the aside carries the one cost no other unit
  states, your attention degrading rather than running short, and that the collision cost is
  `steering`'s and is already in the paragraph above.

**2. A positional reference inside the unit, which is the failure mode this step's own notes
warn about.**
- **Where** `parallel.one-front-rest.1`, "the way the first section describes"
- **Problem** `step2/CLAUDE.md` records why `workshop.lead.1` stopped saying "the last two units":
  "Positional references to neighbouring units break silently on an insertion, so name the unit."
  The same hazard applies one level down. Insert a section above `One agent at a time` and this
  sentence points at the wrong arrangement with nothing failing. Naming the heading instead is not
  the fix here, because a heading in prose has to be translated in two places and drift on a
  reword.
- **Fix** Say the behaviour rather than the address, which also kills the odd transitive "lands"
  in §4.2: `The one in front you work with the way you would if it were the only one, answering
  it and reading the diff it hands back.` Dutch: `Met die ene vooraan werk je zoals je zou werken
  als hij de enige was: je antwoordt hem en je leest de diff die hij teruggeeft.`

**3. Known, not mine.** `enablement` still does not hand into this unit, so the seam before it is
bare from one side. `audit.md` row 42 records this and puts the fix in `enablement`, not here.
Nothing to do in this file.

Otherwise the unit builds correctly. Nothing is assumed that has not been introduced: the worktree
is defined in `steering` (unit 4) and named here in half a sentence, the sub-agent and the
coordinator are `step1/harness`'s and are pointed at rather than re-derived, and "goal" is
described before it is named, in the order `lesson-writing` asks for. A reader arrives at the end
able to say what each of the four arrangements costs them, which is what the unit set out to teach.

---

## 4. Readability

**1. "Middling control, and it is the most of the day most people get."**
- **Where** `parallel.one-front-rest.1`, last sentence
- **Problem** Two "most"s in seven words, and "the most of the day" is not idiomatic English.
  The Dutch is clearer than the English here, which under repo policy means the English is what
  gets rewritten. The deck's own line is clearer than both.
- **Fix** As in §2.2: `Middling control, and it is what most days actually look like.`

**2. "answering it and checking what it lands."**
- **Where** `parallel.one-front-rest.1`
- **Problem** `land` is transitive here with an inanimate subject and an interrogative object, and
  it is the only place in the whole curriculum that uses it that way: `step1/session`,
  `step1/tools` and `step3/impostor` all use "it lands" intransitively, and this unit's own figure
  note says "one diff, read as it lands". So the same verb carries two senses eight lines apart.
- **Fix** Folded into §3.2's replacement sentence: "reading the diff it hands back".

Nothing else. The sentences are short, the openings vary ("One agent", "Reach for it", "Open four
sessions", "So it pays", "There is", "Keep one agent", "Scaffolding a new domain"), and no
paragraph carries two arguments. Every heading describes its section.

---

## 5. Imagery

`AgentsAtOnce` earns its place. What it carries that the prose cannot is the geometry: rows two
and three run the same four agents and differ only by one box inserted between `you` and the
column, which is the definition of an orchestrator drawn rather than asserted. It also carries
`agents-at-once.orchestrated.note`, "four runs, one thing to read", which `step2/CLAUDE.md`
correctly identifies as the only place in the course that claim survives. Placement is right and
documented: it names all four arrangements, so it closes.

One defect in it.

**1. The figure's stroke grammar has three states and two meanings, and rows two and four are the
same thing drawn two different ways.**
- **Where** `front/src/steps/step2/AgentsAtOnce.tsx:74-82` (row `many`, four agents at
  `state: 'idle'`) against `:99-104` (row `mixed`, three agents at `state: 'background'`)
- **Problem** The component's own docblock states the rule: a dash is "the step 1 reading of a
  dash: what is running without anyone", and solid-but-muted means "somebody is watching them even
  though it is not you". Row four's three background agents are dashed on that rule. Row two's
  four agents are drawn solid, and the prose above them says in as many words that nobody is
  watching them: "Nobody reads four runs as they happen, so you stop steering and start
  receiving." So the reader learns the dash on row four, looks back at row two, and finds four
  unwatched agents drawn as watched ones. The one thing the figure most wants to say, that four at
  once is nobody watched, is the one thing its own ink does not say. Row three then has to carry
  "muted but solid means the orchestrator is watching" against a row two that means nothing of
  the kind.
- **Fix** Set row `many`'s four agents to `state: 'background'`. The grammar then closes cleanly:
  teal is you, solid is somebody, dashed is nobody. Rows two and three stay a pair and get
  *sharper*, because the difference between them becomes the thing the section argues (who holds
  the wires) rather than one extra box. Row two stays distinguishable from row four, which has a
  teal agent and it does not. Nothing in `step2/CLAUDE.md` forbids this: its "do not dash them"
  instruction is about row three's sub-agents, where dashing would be false, and that row is
  untouched. Update the two docblocks and `agents-at-once.description` in both bundles with it:
  "Then four agents on four thin dashed ones, none of them teal."

**No second figure.** I considered one for the aside's strongest claim, that the tenth diff of the
afternoon gets a worse read than the first. It would have to be an invented curve with no
measurement behind it, which is worse than the sentence, and `LoopsPerHour` already owns the hour
as a band. The claim is prose's to make and it makes it well.

---

## 6. Supporting tasks

The unit asks the student to do nothing. `step2/CLAUDE.md` justifies that on `workflows`'s
reasoning ("nothing a card could ask for that the student's own week would not answer better"),
and for three of the four sections that is right: you cannot rehearse four agents at once in a
lesson.

There is one thing it misses, and it is worth weighing rather than adopting on sight. Two units
back, `steering` prints this:

```
git worktree add ../kata-statement feat/statement
git worktree add ../kata-native feat/native
```

Those two branch names are the capstone's challenge flag and its native-image flag. The step has
already split its own final exercise into exactly the front/behind shape this unit closes on, and
never says so. A `TaskCard` here would ask the student to sort the workshop's five flags into what
they would keep in front of them and what they would hand to an agent behind, before they start
it, which is planning rather than solving and gives nothing away.

**Shape** `TaskCard`, ungraded, ticked once, `block="split-the-workshop"`, storage key
`kata.step2.split`, under the usual `<hr>` and `<h2 data-i18n="ui:quiz.title">`, above the figure
so `AgentsAtOnce` still closes the unit.
**Moves** (four, no count in the prose): open `kata/step2/java` and read what the workshop asks
for; decide which one goal you want to watch land yourself; decide which of the others could run
behind you on its own branch; say what would have to come back for you to believe a background
run without re-reading it.

**The honest argument against**, which I think is close to even: `engineering` already closes on
`WhereWouldItGo`, a sorting card, and a second sorting card two units later is a repeated shape
rather than a second kind of work. And it front-runs the capstone's planning by a unit. If only
one thing is added to this unit, it should be the quiz below, not this.

---

## 7. Quiz

**The unit has no quiz, and it should have one.** This is not my discovery: `step2/CLAUDE.md` says
so in as many words ("the absence here is an open row rather than a reason"), and `audit.md` item
15 tracks it. The reason it is now an open row is that `workflows` reversed the argument the
absence rested on: a card cannot ask for work that does not exist, but a question can ask which
arrangement a situation wants, and that is the whole unit. Three questions, one per arrangement
that has a wrong branch. `One in front, the rest behind` gets none on purpose, because it is the
answer the other three are measured against and it turns up inside them, which is the same
reasoning that leaves spec-driven out of `workflowsQuiz` and the model relay out of `spendingQuiz`.

To be added by the integrator to `quiz.ts` as `parallelQuiz`, attached in `index.tsx` under the
`parallel` unit, with `en`/`nl` entries for every key.

**Q1 `deep-not-wide`**
> You have the afternoon and one thing on your mind: what the entities in a new feature are, and
> which of them owns the late-fee rule. You have not settled any of it yet.

- `one-agent` **(correct)** — One agent and one conversation, and you read every step of it.
- `four-drafts` — Four agents, each drafting a different model, and you keep the best one.
- `front-and-behind` — One agent in front on the model, three behind writing the tests for it.
- `orchestrated` — One agent that decomposes the design and briefs sub-agents on the pieces.

Explanation: "The decision is the work here, and you make it in a conversation you read every step
of. Nothing behind you can start on a model that is not settled yet."

**Q2 `green-and-unread`**
> Four agents have run all afternoon on four modules, each in its own worktree. All four builds are
> green. You have four diffs open and you have read two of them properly.

- `reading-at-the-end` **(correct)** — The steering you skipped at the start arrived at the end as
  reading, and the fourth diff gets less of you than the first did.
- `builds-are-the-check` — Nothing has gone wrong: the builds are the check, and all four passed.
- `window-too-small` — The agents ran out of context, so the later work is worse than the early
  work.
- `shared-branch` — They should have shared one branch, so the changes merged as they were written.

Explanation: "Four at once trades steering for receiving. A green build says the checks passed, not
that the code is the code you wanted, and attention runs out well before the tokens do."

**Q3 `who-holds-the-wires`**
> Instead of opening five sessions yourself, you brief one agent and it hands five pieces to
> sub-agents.

- `coordination-moves` **(correct)** — The coordination moves into the agent, and five runs come
  back to you as one thing to read.
- `inherits-context` — The sub-agents carry on from your session, so each needs less briefing than
  a fresh one would.
- `answer-each` — You get more control per piece, because you can answer each sub-agent while it
  works.
- `runs-in-turn` — The pieces run one after another rather than at once, so none of them can
  collide.

Explanation: "A sub-agent starts on an empty context and its brief is all it gets. What the
arrangement changes is where the coordination sits, in the agent rather than in your head."

Q3's distractors are each a belief a reader who half-read `step1/harness` would hold, and none of
them is accidentally true: `inherits-context` is the exact opposite of `harness.coordinator.2`,
and the fan-out is a fan-out. I deliberately did not write a distractor claiming an orchestrator
prevents two agents colliding, because `step2/CLAUDE.md` records that claim as cut-but-believed,
and a distractor the repo half-endorses is a bad distractor.

---

## 8. EN/NL parity

Parity itself is clean: 12 keys in the HTML, 12 Dutch entries, none orphaned, no em-dashes, and
the figure's eight label keys plus its description are present in both. The Dutch reads like Dutch
rather than like translated English. Three defects and one place the Dutch is better.

**1. `parallel.orchestrator.1` — "sub-agents die hij zelf briefst".**
- **Problem** Not a Dutch verb form. `briefen` conjugates `ik brief / jij brieft / hij brieft`;
  `briefst` is not a form of it in any person. Plain grammatical error, on the page.
- **Fix** `...aan sub-agents die hij zelf brieft`.

**2. `parallel.one-front-rest.2` — "bevechten het model".**
- **Problem** English is "argue the model", meaning thrash it out between you. `iets bevechten`
  in Dutch means to fight *against* it, so the sentence currently says you and the agent fight the
  model. Wrong verb.
- **Fix** `Jij en de agent vooraan leggen de namen vast, vechten het model uit, schrijven de spec.`
  (`uitvechten` is the thrash-it-out sense the English has.)

**3. `parallel.one-front-rest.2` — "brengt een andere de documentatie bij".**
- **Problem** English is "another is bringing the docs up to date". `iets bijbrengen` means to
  teach or impart something to somebody, and it wants a dative object it does not have here. As
  written the Dutch says an agent is *teaching* the documentation.
- **Fix** `...en werkt een andere de documentatie bij.`

**4. Where the Dutch is better, so the English is what changes.**
- **Where** `parallel.one-agent-time.1`
- **Problem** English: "you answer a wrong turn while it is still a sentence." Dutch: "terwijl die
  nog één zin kost", *while it still costs one sentence*. The Dutch names the unit of cost and the
  English elides it into a metaphor that has to be reconstructed. Cost is the thing this unit
  measures everything in, so the Dutch is carrying the argument and the English is carrying the
  shape of it.
- **Fix** English: `you answer a wrong turn while it still costs one sentence to answer`. Leave the
  Dutch alone.

**5. Minor, worth doing in the same pass.** `agents-at-once.mixed.note` is "one now, three when
they report" in English and "één nu, drie als ze klaar zijn" (*when they are done*) in Dutch, while
the paragraph above uses "rapporteren" in both languages. Make the note say `drie als ze
rapporteren` so the figure and the prose use one word. `agents-at-once.one.note` has the same shape
of drift ("read as it lands" against "meteen gelezen"), and is small enough to leave.

**6. Known, not mine.** `audit.md` item 50: `nl.json` runs `enablement` into `parallel` with no
blank-line separator. Cosmetic, tracked, and it is a locale-hygiene row rather than this unit's.

---

## Verdict

This is a good unit and it is close to being a very good one. The argument is genuinely
progressive, the order carries the point (most control, least control, that section answered,
then the middle where most people live), it points at four neighbouring units instead of
re-teaching any of them, and the prose has no AI in it. What holds it back is not the writing but
three specific things: its one hazard callout opens by repeating the paragraph above it, its
figure draws four unwatched agents as though somebody were watching them, and it is one of the two
units in step 2 whose own notes admit it should be asking the student a question and is not. None
of those is a rewrite. Two are a sentence each and one is a single enum value in a TSX file.

The Dutch has three outright errors in it, one of them a non-existent verb form, which is worth
noticing given how carefully the rest of this bundle is written: it suggests the Dutch for this
unit did not get the second read the English did.

Priority order:

1. **`AgentsAtOnce`: dash row two's four agents** (`state: 'background'`), and update both
   docblocks and `agents-at-once.description` in `en.json` and `nl.json`. The figure currently
   contradicts the prose it closes.
2. **Cut the first sentence of `parallel.many-agents-once.3`** in both languages, and correct the
   "two costs no other unit states" line in `step2/CLAUDE.md` to one.
3. **Fix the three Dutch errors**: `briefst` → `brieft`, `bevechten het model` → `vechten het
   model uit`, `brengt ... bij` → `werkt ... bij`.
4. **Add `parallelQuiz`**, three questions as specified, attached under `parallel` in `index.tsx`.
   Closes the open row `step2/CLAUDE.md` and `audit.md` item 15 both name.
5. **Rewrite `one-front-rest.1`'s two stumbles** in one edit: the positional "first section"
   reference, "checking what it lands", and "the most of the day most people get". Decide the
   most-days claim against the deck while you are there.
6. **Soften "all about that window"** in `one-agent-time.1` to what `steering` actually is.
7. **Rewrite the English of `one-agent-time.1`'s "still a sentence"** to match the Dutch's "still
   costs one sentence".
8. Optional, and argued both ways above: a `split-the-workshop` `TaskCard`. Do the quiz first, and
   only reach for this if the step wants a second thing to do before the capstone.
