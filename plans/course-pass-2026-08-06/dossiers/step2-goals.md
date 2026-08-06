# step2 / `goals` (Spending tokens)

Measured: 1,383 prose words, 9 `<h2>` sections, 22 paragraphs, 2 `<pre>` blocks, 4 figures, a
3-question quiz. 31 prose keys in the HTML, 31 in `nl.json`, zero drift, zero em-dashes or
en-dashes in either language.

Read first: `front/src/steps/step2/CLAUDE.md` (lines 676-737 are this unit's), `audit.md` rows 21
and 48, `.claude/skills/lesson-writing/SKILL.md`, `front/src/steps/step1/units/model.html` (this
unit points at it twice), `kata/step2/java/src/test/java/.../grading/FlagRevealIT.java` (the
numbers this unit quotes).

The prose here is good. It is concrete, it states views, it ends paragraphs on the sharp sentence,
and the four figures are the most disciplined set in the step. What is wrong with the unit is not
the writing. It is that six checkable claims do not survive checking, one of them is a command that
errors when a student types it, and one of them is the unit's flagship example being the exact
thing the capstone one unit later exists to demolish.

---

## AI tells

The voice here is human and I am not going to manufacture findings against it. `"You are not
handing over one job. You are handing over a fleet."`, `"You are the digestion in the middle"`,
`"four hours later you get a confident report on a wish"` are all the house voice working. Two
things only.

**1. A triple of bare adjectives, which is the brief's named tell.**

- **Where** `goals.whole-job.3`
- **Problem** "For a job that is mechanical, wide and measurable, that is a good trade." Three
  single adjectives in a row, the shape the brief calls out. It also buries `measurable`, which is
  the unit's whole argument, in a list where it reads as one property among three rather than as
  the condition the other two hang off.
- **Fix** EN: `For a job that is mechanical and wide, and that a command can measure, that is a
  good trade.`
  NL: `Voor een klus die mechanisch en breed is, en die een commando kan meten, is dat een goede
  ruil.`

**2. Tricolon density, reported as an observation rather than as a demand.**

- **Where** `goals.goal-oriented.2` ("Name the outcome, name what must not change, name how you
  will check it"), `goals.ultracode.3` ("the same `CLAUDE.md`, the same files, the same working
  out"), `goals.design-tools.1` ("every colour, every component, every state"),
  `goals.read-came-back.1` (three clauses), plus finding 1.
- **Problem** Five anaphoric triples across nine sections is a rhythm rather than a habit.
- **Fix** Four of the five are anchored to something outside the sentence and should stay:
  `goal-oriented.2`'s three clauses map onto the three clauses of the `<pre>` under it,
  `ultracode.3`'s three map onto `ReadEachTime`'s three teal blocks, `design-tools.1`'s three are a
  literal description of a design pass. Cut only finding 1 and the rhythm drops below notice. **No
  other edit.**

---

## Truthfulness

**3. The `git worktree` command in the unit does not work.**

- **Where** `goals.html:108`, the `<pre>` under `Give it its own worktree`
- **Problem** `git worktree add ../kata-complexity goal/complexity` requires `goal/complexity` to
  already exist as a ref. It does not, since the whole point of the paragraph is starting a fresh
  run. Verified on git 2.50.1: `fatal: invalid reference: goal/complexity`, exit 128. Git only
  DWIMs a missing branch name when exactly one remote already carries it. A student who copies this
  line gets an error, and the unit has just told them this is how you keep your branch usable.
- **Fix** `git worktree add -b goal/complexity ../kata-complexity`
- **Ripple** The same defect is in `steering.html:91-92`, which is where the definition lives:
  `git worktree add -b feat/statement ../kata-statement` and
  `git worktree add -b feat/native ../kata-native`. `WorktreeEach.tsx`'s docblock says the branches
  are "the ones the `<pre>` above it creates", which only becomes true after this fix. No locale
  key moves: a `<pre>` carries none.

**4. The unit's flagship goal is the number the capstone exists to debunk.**

- **Where** `goals.whole-job.1`
- **Problem** The model of a well-shaped whole-job goal is `"get this module to a hundred percent
  line coverage and leave mvn test green"`. One unit later, `workshop.honest.1` reads: "a hundred
  percent of the lines can run under tests that assert nothing, and the number will still read
  green", and `workshop.flag.honest.help` calls it "the trap". The graded profile agrees with the
  workshop and not with `goals`: `FlagRevealIT` sets `COVERAGE_FLOOR = 90.0`. So a goal an agent can
  satisfy by writing assertion-free tests is held up here as the example of a goal you can walk away
  from. Note that the unit's two *other* numbers are exactly right: `check-exit.1`'s "ninety percent
  line coverage" is `COVERAGE_FLOOR`, and `whole-job.2` plus the `<pre>` at line 37 both say ten,
  which is `COMPLEXITY_CEILING = 10`. A hundred is the one number in the unit that matches nothing.
- **Fix** Do not argue the trap here. `step2/CLAUDE.md` records that it has three homes and needs no
  fourth, and that constraint is right. Change the number instead, which costs nothing rhetorically
  (ninety percent on a six-year-old untested service is still far too big for one turn) and gains
  three consistencies.
  EN: `It is "get this module to ninety percent line coverage and leave <code>mvn test</code>
  green", and then you walk away from it.`
  NL: `Het is "breng deze module op negentig procent line coverage en laat <code>mvn test</code>
  groen achter", en daarna loop je ervan weg.`

**5. The arithmetic under "Most of it is waiting" does not reach "most".**

- **Where** `goals.most-waiting.1`, and `goal-gate.wait` in both locale files
- **Problem** Forty passes at two minutes is eighty minutes. `whole-job.3` two paragraphs up sets
  the run at four hours. Eighty minutes is a third of it, so "forty passes later the build has had
  most of the afternoon" is false on the unit's own numbers, the heading "Most of it is waiting" is
  false with it, and the closing claim "the clock is being run by your own test suite" has nothing
  under it. `GoalGate`'s label repeats the same two numbers ("two minutes, forty times"), so the
  figure carries the error too. This is the one place in the unit a reader who multiplies catches
  the author out, and it is under the heading that most needs to survive that.
- **Fix** Keep forty, which rhymes with the forty classes in `own-worktree.1`, and raise the build.
  EN: `Look at where those four hours actually go. The agent writes a class in seconds.
  <code>mvn verify</code> then takes four minutes, and the pass after it takes four more, and forty
  passes later the build has had nearly three hours of it. Tokens are burning the whole time, but
  the clock is being run by your own test suite.`
  NL: `Kijk eens waar die vier uur eigenlijk naartoe gaan. De agent schrijft een klasse in seconden.
  <code>mvn verify</code> doet er daarna vier minuten over, en de pass erna nog eens vier, en
  veertig passes later heeft de build er bijna drie uur van gehad. De tokens branden ondertussen
  door, maar de klok wordt gezet door je eigen testsuite.`
  `en.json` `goal-gate.wait`: `four minutes, forty times`.
  `nl.json` `goal-gate.wait`: `vier minuten, veertig keer`.

**6. "A tier above the three" is the sentence step 1 wrote to stop people writing.**

- **Where** `goals.research-frontier-model.1`
- **Problem** It opens "There is a tier above the three." `step1/model`'s `model.cost.2` ends: "It
  is a ceiling rather than a fourth tier." That sentence is deliberate (its HTML comment says the
  row is placed after the figure precisely so the sorting lands), and this unit contradicts it in
  its own opening clause while claiming in the next sentence to be picking up where step 1 left off.
  A reader who did step 1 attentively is now holding two rules.
- **Fix** EN: `Above the three sits the frontier model. <a href="/steps/step1/model">The model
  unit</a> called it a ceiling rather than a fourth tier and stopped there, because what it is good
  at is a question about work rather than about windows. Broad research is the answer.`
  NL: `Boven de drie staat het frontiermodel. <a href="/steps/step1/model">De unit over het
  model</a> noemde het een plafond in plaats van een vierde tier en liet het daarbij, want waar het
  goed in is, is een vraag over werk en niet over vensters. Breed onderzoek is het antwoord.`

**7. `lead.2` attributes to step 1 a claim step 1 does not make to every reader.**

- **Where** `goals.lead.2`
- **Problem** Two things. (a) It says step 1 "set out the two arrangements: a key bills you per
  token, a subscription meters you in a rolling window." `model.api-vs-subscription.1`, the shared
  section, says the subscription half as "the same usage comes off a plan you paid for before you
  started". The rolling window is `model.five-hour-window`, which is
  `data-assistant="claude"` on every element including its two figure markers, and step 1's own
  comment there says a seat "meters premium requests over a calendar month, so there is no rolling
  window to place". So for the Copilot reader this sentence describes a step 1 they were not shown.
  (b) "five hours on most plans" is flatter than step 1's "usually a sliding window of five hours",
  and step 1's comment records the hedge as deliberate: "a flat claim here dates faster than
  anything else in the unit." Step 2 carries no `data-assistant` anywhere and that is a step-wide
  decision (`steps/CLAUDE.md`; `audit.md` row 24 tracks the consequence), so the fix is not to gate
  this. It is to say only what is true for both readers.
- **Fix** EN: `When matters because of how you are billed.
  <a href="/steps/step1/model">Step 1's unit on the model</a> set out the two arrangements: a key
  bills you per token, a subscription comes off a plan you paid for before you started. Where a plan
  meters you in a rolling window, usually about five hours, what you leave unused is not carried
  anywhere. Forty minutes of window is not something you can save for tomorrow, so the thing to do
  with a window is spend it out. The limit that actually binds sits behind it, weekly or monthly
  depending on the plan, and that is the one to keep an eye on.`
  NL: `Dat wanneer hangt samen met hoe er afgerekend wordt. <a href="/steps/step1/model">De unit
  over het model in stap 1</a> zette de twee afspraken naast elkaar: een key rekent per token af,
  een abonnement gaat van een plan af dat je al betaald had. Waar een plan je in een rollend venster
  meet, meestal een uur of vijf, wordt wat je niet opgebruikt nergens naartoe meegenomen. Veertig
  minuten venster spaar je niet op voor morgen, dus wat je met een venster doet, is het opmaken. De
  limiet die echt knelt zit erachter, per week of per maand naargelang het plan, en dat is degene om
  in de gaten te houden.`
  The "weekly or monthly" hedge as it stands is fine and should not change: weekly is step 1's
  Claude ceiling, monthly is the Copilot allowance, and the sentence covers both honestly.

**8. `ultracode` is a claim I cannot verify, and it is written as a literal invocation.**

- **Where** `goals.ultracode.1` and the `<h2>` above it
- **Problem** "Ask for ultracode and the harness stops working the task itself." The word appears
  nowhere else in the repository outside this section and its own figure docblocks, nowhere in
  `copilot-specific.md`, and I have no record of it as a Claude Code capability. `step2/CLAUDE.md`
  records the section as deliberately vague about mechanism ("naming a flag, a menu or a script
  shape dates the unit"), which is a good decision about the *how*, but it does not cover the
  *whether*: "Ask for ultracode" reads as a word the student types, and a student who types it and
  gets an ordinary answer concludes the course is out of date. Everything else in the section (the
  fan-out, the empty contexts, the bill) stands on its own whatever the trigger is called.
- **Fix** Author to confirm the term against the current product. If it is a real trigger word, no
  edit. If it is the author's name for the behaviour rather than a product's, the sentence should
  describe the capability rather than the incantation, for example
  `Some harnesses will fan the work out for you instead of working the task themselves. The harness
  writes a script that spreads agents across the work, runs them, and gathers up what comes back.`
  and the heading becomes `A fleet of agents`. I am flagging rather than deciding, per the brief.

Everything else checks out. `Fable`/`Opus`/`Sonnet` in `ModelRelay` match `ModelPricing`'s four
rows and the descending-price claim in `research-frontier-model.2` is right ($10/$5/$3). The
`(August 2026)` dating line follows `model.lead.3`'s precedent exactly. The Claude Design claim is
corroborated by `front/CLAUDE.md`. `article/` in the `<pre>` is `DomainTree`'s fictional service
from `engineering`, so it is a callback rather than an invention. The `gem` and `coin` icons are
placed by the `step1/harness` convention and used for what step 0's legend defines them as.

---

## Progression

**9. The unit was widened from one argument to four and the lead was not widened with it.**

- **Where** `goals.lead.1`, and the seam at the `Ultracode` heading
- **Problem** `step2/CLAUDE.md` records the rename from `Goal-oriented` to `Spending tokens` as "a
  widening rather than a rename", and the unit now surveys four expensive moves. The lead does not
  say so. It sets up two questions (what you get, when you spend) and then five straight sections
  develop one move, the goal-shaped run, in a continuous line: define it, name the check, size it
  up, count where the hours go, put it in a worktree. `Ultracode` then starts a second subject with
  no signal that a second subject was coming, and `design-tools` a fourth. The closer confirms the
  framing the lead never established: `read-came-back.1` opens "Every move in this unit", which
  lands as a survey summary for a reader who has been reading a single argument. This is the
  sharpest rise in the course landing on the longest unit in it (`audit.md` row 43), and the reader
  is given no map at the top.
- **Fix** One sentence in the lead, no count announced (`lesson-writing`: "Do not announce the
  count"). Replace `lead.1`'s closing sentence.
  EN: `What decides it is what you get for the spend, and when you spend it. The moves below are the
  expensive ones worth making: a goal you walk away from, a fleet of agents, a long turn on the
  frontier model, a design pass.`
  NL: `Wat de doorslag geeft is wat je ervoor terugkrijgt, en wanneer je het uitgeeft. De zetten
  hieronder zijn de dure die het waard zijn: een doel waar je van wegloopt, een vloot agents, een
  lange beurt op het frontiermodel, een designpass.`
  This does not touch the recorded constraint that "the organising idea is the window, and it is
  stated once, in the lead": the window stays `lead.2`'s and is not restated.

**10. `Read what came back` is a heading whose section does not do it.**

- **Where** `goals.read-came-back.heading` / `.1`
- **Problem** The heading is a claim shape (`lesson-writing`: "Headings are claims or plain
  labels"), and the paragraph under it never makes the claim. Sentence 1 states the premise,
  sentence 2 is a three-item recap of the unit, sentence 3 is the one real claim ("Spending the
  tokens is the easy half"), sentence 4 hands off to the workshop. Nothing tells the reader
  anything about reading what came back: not when, not how much, not what to look for. Half the
  paragraph is the summary-that-restates shape the brief lists as a tell, saved only by sentence 3.
- **Fix** Two routes, and the constraints rule out the obvious one. The obvious closer ("the build
  said yes, which is not the same as it being right") is the proxy trap, which `step2/CLAUDE.md`
  forbids opening a fourth site for. The reading-is-the-bottleneck closer is `steering`'s and the
  attention-degrades closer is `parallel`'s warning aside; both are recorded as belonging there.
  So either:
  (a) **Make the heading a label** and let the section be the closer it already is. EN heading
  `What you are left with`, NL `Wat je overhoudt`, keys renamed `goals.left-with.heading` /
  `goals.left-with.1` in the HTML and `nl.json` together. `workshop.lead.1` points at the unit by
  name and not at a key, so the pair with `workshop` survives untouched; nothing else in the tree
  references this key. Prose unchanged.
  (b) **Give it the claim** by replacing the recap sentence with something the unit owns and no
  other unit does, namely that the reading is the part you cannot start until the run finishes:
  `A fleet that ran while you were at lunch, a design system you did not draw, forty classes
  rewritten by a run you left alone. None of it arrives in pieces you can take in as they land, so
  the reading all falls due at once, at the end, on you.`
  (a) is cheaper and safer; (b) is better if it survives a check against `steering`'s
  `worktree-each.3`, which I read as making a different claim (two agents, two contexts, two bills).
  `own-worktree.2` here already argues merging in pieces, so (b) must be phrased against that
  rather than contradicting it. Author's call.

The rest of the sequence is sound and closed at both ends: `workshop.lead.1` names this unit,
`read-came-back.1` names the workshop back, and the four cross-references (`step1/model` twice,
`step2/steering`, `step2/workflows`, `step2/workshop`) all point rather than repeat, which is the
recorded rule. No section re-argues one another unit owns.

---

## Readability

**11. A bare link word that parses as a compound noun.**

- **Where** `goals.own-worktree.1`
- **Problem** "the second checkout <a>steering</a> gives every agent" reads on first pass as
  "checkout steering", a compound, and the reader has to back up. Every other cross-unit link in
  step 2 is a noun phrase: "the workflows unit", "The steering unit", "the engineering unit", "The
  model unit", "The workshop". This is the only bare one, and it lands in the one position where a
  bare one breaks. The Dutch does not have the problem, because the relative pronoun holds the
  clause open: "de tweede checkout die bijsturen elke agent geeft". Per repo policy, the Dutch is
  the truer version and the English is what gets rewritten.
- **Fix** EN: `Ask for the goal to be pursued in a git worktree instead, the second checkout
  <a href="/steps/step2/steering">the steering unit</a> gives every agent.` NL unchanged.

**12. Stacked appositions in the lead's longest sentence.** Minor.

- **Where** `goals.lead.2`
- **Problem** "Under a window, five hours on most plans, what you leave unused is not carried
  anywhere." The apposition splits the subject from its clause and the sentence has to be read
  twice. `lesson-writing`: "If a sentence has more than one comma, look for the full stop you
  skipped."
- **Fix** Absorbed by the rewrite in finding 7, which turns it into "Where a plan meters you in a
  rolling window, usually about five hours, what you leave unused is not carried anywhere." No
  separate edit.

Section shapes are fine. Three sections run to three paragraphs (`goal-oriented`, `whole-job`,
`ultracode`), which `lesson-writing` flags as a smell, and I checked all three: each is genuinely
three distinct moves (what it is / when it pays / what it costs) with no paragraph explaining
another. Leave them.

---

## Imagery

The four figures are the best-argued set in step 2 and I am not proposing a fifth. Each carries
something the sentences do not, and each is fenced off from a neighbouring figure's argument by a
recorded constraint that holds up when you read the components:

- `WindowSpend` shows *how much* of an ordinary window goes unused, which no sentence quantifies,
  and it is read forwards by `ultracode` and `design-tools` closing on the tail of a window. It
  measures money against a ceiling and never cuts a band into turns, so it does not collide with
  `LoopsPerHour`.
- `GoalGate` carries the wait inside the gate box rather than as a stretch of time, which plants
  the number `most-waiting` then spends.
- `ReadEachTime` shows the proportion of reading to work per agent (three blocks to one), which the
  prose never states, and draws what agents *hold* rather than how they are arranged, so it does not
  collide with `AgentsAtOnce`.
- `ModelRelay` shows the shape narrowing then multiplying, and dates three model names the prose
  deliberately does not.

One defect, and it is downstream of the prose.

**13. `GoalGate`'s wait label carries the broken arithmetic.**

- **Where** `en.json` / `nl.json`, `goal-gate.wait`
- **Problem** "two minutes, forty times" is where finding 5's eighty minutes is drawn. A figure
  stating a number the prose then mis-multiplies is worse than the prose alone, because a reader
  who checks the figure has been given the evidence against the sentence.
- **Fix** Move it with finding 5: `four minutes, forty times` / `vier minuten, veertig keer`.

Considered and rejected: a fifth figure comparing what the four moves cost against what each buys,
on `WorkflowWeights`'s precedent. It would be the natural drawing for a survey, but this is already
the longest unit in the course with four figures, `WindowSpend` under the lead already fixes the
timing all four share, and the comparison would need per-move cost numbers the unit deliberately
does not have. Do not add it.

One thing to leave alone despite an apparent mismatch: `WindowSpend` draws ten ordinary columns and
two filled ones while `lead.1` says the expensive run "costs ten ordinary sessions", and the filled
area is about seven ordinary columns rather than ten. The figure's columns are not labelled as
sessions and the ceiling reads as capacity over the whole window, so the drawing does not actually
claim a ratio. Not a finding.

---

## Supporting tasks

**No task, and the reason is sound.** `step2/CLAUDE.md` records the precedent three times
(`workflows`, `enablement`, `parallel`): there is nothing a card could ask for here that would not
be a smaller version of the workshop, and `read-came-back.1` hands to the workshop by name in the
unit's last sentence. The unit already asks the reader something, via the quiz. Adding a card would
put a third instrument on the longest page in the course.

One thing worth recording as a *considered* option rather than a recommendation: the unit's most
portable instruction is `most-waiting.2` (start it in the morning, read it after lunch), and nothing
asks the student to find the candidate job in their own repository. A three-move ungraded `TaskCard`
under a `ui:quiz.title` heading would do it (name a rule you changed in `CLAUDE.md`; name the
command that answers yes or no on it; name the branch it would run on). I am not proposing it: it
would cost the unit its clean hand-off into the workshop, and the workshop is where the student
writes a real goal against a real build. Flagging it only so the decision is on the record.

---

## Quiz

Three questions, one per expensive move with a wrong branch, and the frontier relay is left out for
the recorded reason. The distractors are the good kind: `fleet-bill.gathered` (the fan-out gathered
into one window and re-sent every turn) and `report-on-a-wish.too-long` are both things a reader who
took step 1 seriously might genuinely believe, and `window-tail.save-it` is the belief the whole
lead exists to kill. Explanations are two sentences each, per the file's own rule. One defect.

**14. The correct answer to `report-on-a-wish` is contradicted by its own scenario.**

- **Where** `en.json` / `nl.json`, `quiz.report-on-a-wish.question` and `.no-command`
- **Problem** The scenario hands over "make this code cleaner and keep the tests green". The correct
  choice reads "There was no command that answers yes or no, so the run had nothing to fail
  against." But "keep the tests green" **is** a command that answers yes or no, and the student has
  just read `check-exit.1` saying so. A sharp student who eliminates the correct answer on those
  grounds has reasoned correctly from the text. The distinction the question is actually testing is
  `goal-oriented.2`'s ("name the outcome, name what must not change, name how you will check it"):
  the scenario has an edge but no exit. The answer text does not say that.
- **Fix** EN `quiz.report-on-a-wish.no-command`: `Nothing could say the work was done. Keeping the
  tests green says what must not change, not when to stop, so the run had nothing to finish against
  and stopped when it felt finished.`
  NL: `Niets kon zeggen dat het werk af was. De tests groen houden zegt wat er niet mag veranderen,
  niet wanneer je stopt, dus de run had niets om naartoe te werken en stopte toen hij zich klaar
  voelde.`
  The explanation needs no change: "A goal is a task with an outcome something else can measure, and
  'cleaner' is not one" already lands once the choice is precise.

---

## EN/NL parity

**Clean.** 31 prose keys in the HTML, 31 `goals.*` prose keys in `nl.json`, no key in one and not
the other, no orphans. No em-dash or en-dash in either language, in the unit or in its locale
entries. Icon markup is escaped correctly in `nl.json` (`<svg data-icon=\"gem\"></svg>`). The Dutch
is a rewrite rather than a conversion throughout: `"Wat de doorslag geeft"`, `"zwalkt"`,
`"opkuislijst"`, `"Reken uit wat dat kost voor je ernaar grijpt"` are all things a Dutch-speaking
colleague would say, not English sentence structure in Dutch words.

**15. One place the Dutch is the better version.** Already filed as finding 11: the bare `steering`
link works in Dutch because of the relative pronoun and fails in English. Rewrite the English.

Every fix above that touches prose names its Dutch counterpart. Three of them also touch locale
values rather than prose (`goal-gate.wait` in finding 5/13, `quiz.report-on-a-wish.no-command` in
finding 14), so they go through the locale patch protocol rather than a direct edit.

---

## Verdict

This unit is well written and badly checked. The voice is the real thing, the four figures are the
most carefully fenced set in step 2, the quiz asks about costs rather than definitions, and the
EN/NL parity is perfect. Against that: a copy-pasteable git command that errors, an arithmetic claim
that fails by a factor of three under the heading that most depends on it, a flagship example that
is the exact failure mode the capstone grades against, a contradiction with the step 1 sentence that
was written specifically to prevent it, and a survey structure whose lead still describes the
single-argument unit this used to be. None of those is a style disagreement and none of them needs a
rewrite to fix. They need eight small, named edits. Do those and this is the strongest prose unit in
the step; leave them and it is the unit where an attentive student catches the course out four
separate times.

Priority order:

1. **Finding 4** (`whole-job.1`, a hundred percent to ninety percent). One word, and it stops the
   unit from teaching the thing the workshop exists to unteach.
2. **Finding 3** (`git worktree add -b`). A command that errors, in two units. Fix both.
3. **Finding 5 + 13** (the four-hour arithmetic, prose and `goal-gate.wait` together).
4. **Finding 14** (the quiz's correct answer contradicting its scenario).
5. **Finding 6** ("a tier above the three" against step 1's "not a fourth tier").
6. **Finding 7** (`lead.2`: what step 1 actually said, and the hedge it said it with).
7. **Finding 9** (one sentence in the lead so the survey is set up before `Ultracode` starts it).
8. **Finding 11** (the bare `steering` link).
9. **Finding 10** (the `Read what came back` heading; author picks route (a) or (b)).
10. **Finding 1** (the adjective triple). Optional.
11. **Finding 8** (`ultracode`). Not an edit until the author confirms the term.

Known and not mine: the unit is the longest in the course after the sharpest cadence rise in it
(`audit.md` row 21/43, which records the single-unit shape as a decision), and three of its four
figures have no deck slide (`audit.md` row 48). The Copilot reader's problem in finding 7 is the
visible edge of `audit.md` row 24, which is a step-wide decision rather than this unit's to take.
