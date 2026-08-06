# step1 / `model` — audit dossier

Unit: `front/src/steps/step1/units/model.html` (1,132 words of HTML; ~968 for a Claude Code
reader, ~770 for a Copilot one). Four figures (`ModelTiers`, `ModelPricing`, `usage-readout`,
`SessionWindows`), one exercise (`PickTheTier`), no quiz.

Read first: `front/src/steps/step1/CLAUDE.md` (the `model` block, lines ~363–530),
`.claude/skills/lesson-writing/SKILL.md`, `copilot-specific.md`, `audit.md` rows 4, 32, 48.

Known gaps already recorded in `audit.md`, **not** claimed as discoveries here: the Claude-only
five-hour section and its 968-vs-770 word split (rows 4 and 32), and the two Claude-only figures
being unusable on the deck (row 48).

---

## 1. AI tells

**None.** This is the most human prose in the step and I am not going to manufacture a finding
against it. `five-hour-window.3` ends "You did not spend those five hours. They went past you."
`speed.2` opens "Here is where quick stops being cheap." `cost.3` closes "Learn the shape rather
than the price list." Short declaratives, a stated view, concrete nouns, uneven paragraph lengths.
No em-dashes anywhere in the file or in the Dutch. No announcing openers, no summary paragraphs,
no closing gesture at significance.

Two things I checked and deliberately did **not** flag:

- `cost.1` "further apart than most people expect" reads at first like an empty appeal to the
  reader, but the table immediately under it is the evidence, so the sentence is a setup, not a
  filler.
- `api-vs-subscription.1` "Two arrangements, and the harness is where you pick one" trips the
  lesson-writing rule "do not announce the count" on a literal reading. It survives: the count
  *is* the content here (there are exactly two billing models and the paragraph names both), and
  the fragment opener is the shape the step uses elsewhere.

---

## 2. Truthfulness

Verified correct, by reading the files and checking the pricing against the current model catalogue:
the 1-3-5 input ratio (Haiku $1, Sonnet $3, Opus $5), output at exactly 5x input in all four rows,
cache read at exactly a tenth of input in all four rows, cache write at 1.25x (5 min) and 2x (1 hr),
the frontier row priced at 2x the top tier, the Copilot billing paragraph against `copilot-specific.md`
(credits consumed by tokens, forfeited monthly, completions free), `/context` and `/usage` as real
commands, and `SessionWindows`'s numbers against the prose (drifted row opens at 09:30, prose says
"half past nine ... shuts at half past two"; the aligned row opens five hours before the 13:00 break).
That is a good hit rate. The problems below are specific.

### 1. The pricing caption asserts something that is not true of one row

- **Where** `pricing.caption` (en.json / nl.json), rendered under `ModelPricing`
- **Problem** The caption reads "As listed in July 2026." The Sonnet row is listed at its
  **standing** rate ($3 / $15), which is a deliberate decision recorded in `ModelPricing.tsx` and in
  the step's `CLAUDE.md`: the introductory $2 / $10 rate, which runs until 1 September 2026, breaks
  the one-three-five ratio the prose teaches. That decision is right. The caption's wording is not:
  "as listed" is a claim about what the provider published, and in July 2026 the published Sonnet
  rate was the introductory one. A student who does what `cost.3` implicitly invites (go and look)
  finds the figure wrong on the row the ratio depends on. The recorded reasoning defends omitting a
  footnote about the intro rate; it does not defend a caption that asserts the table is a listing.
- **Fix** Keep the month (it is the ageing signal, and that is load-bearing). Drop the assertion.
  EN: `Standard rates, read in July 2026.`
  NL: `Standaardtarieven, gelezen in juli 2026.`

### 2. "Four to five times faster" is not verifiable and reads as overstated

- **Where** `model.speed.1` (html), `model.speed.1` (nl.json), `tiers.haiku.body` (en.json),
  `tiers.haiku.body` (nl.json) — four strings carry the same number
- **Problem** "The small tier answers roughly four to five times faster than the middle one." I
  cannot source this. Published throughput comparisons for the small tier against the middle one
  land materially below that, and nothing in this repo measures it. It is the only magnitude in the
  unit with no figure, no table and no citation behind it, and it is doing real work: `speed.1`'s
  whole payoff ("the difference between a job you watch and a job you leave running") rests on it,
  and `PickTheTier`'s `queues` explanation leans on it again. Every other number on this page can be
  checked against something.
- **Fix** Either re-measure and state the measured figure with the month attached, the way
  `ModelPricing` does, or hedge to a shape that survives a re-measurement. Minimum edit:
  `The small tier answers several times faster than the middle one, and the top tier is the slowest
  of the three.` NL: `Het kleine model antwoordt enkele keren sneller dan het middenmodel, en het
  topmodel is de traagste van de drie.` The same edit visits `tiers.haiku.body` in both languages
  ("at four to five times Sonnet's speed" / "aan vier tot vijf keer de snelheid van Sonnet").

### 3. The reason the coordinator split works is an unverifiable claim about training

- **Where** `model.let-it-pick.2`
- **Problem** "Providers fine-tune the smaller tiers on output from the larger ones, so an expensive
  model writing the brief is writing for something trained on its own answers." This is stated flat,
  as the mechanism, and it is a claim about proprietary training pipelines that no provider
  documents. Distillation from larger to smaller models is widely reported as an industry practice;
  "providers fine-tune the smaller tiers on output from the larger ones" as a statement of fact
  about the family this unit teaches is not something the reader or the author can check. The
  paragraph opens "There is a reason that split works as well as it does", so the claim is carrying
  the argument, not decorating it.
- **Fix** Either hedge to reported practice or cut the paragraph. `let-it-pick.1` already states the
  saving and stands alone without it. If it stays:
  `Smaller tiers are commonly trained on output from larger ones, so an expensive model writing the
  brief is writing for something shaped by its own answers.` NL: `De kleinere tiers worden
  doorgaans getraind op output van de grotere, dus een duur model dat de opdracht schrijft, schrijft
  voor iets dat door zijn eigen antwoorden gevormd is.`
  If it cannot be sourced at all, cutting it costs the unit nothing: the section's job is the
  back-pointer to `harness` plus the ratio, and `let-it-pick.1` does both.

### 4. The Copilot half of `api-vs-subscription.3` contradicts its own opening

- **Where** `model.api-vs-subscription.3.copilot`
- **Problem** Both variants open on the same two sentences: "The tokens are the same either way.
  What differs is whether you can see them." The Claude half then earns that: key means a number on
  an invoice you can go and look at, plan means you wait for a reset. The Copilot half then
  describes a subscription that is **also** metered by token, at each model's published rate, drawn
  against an allowance — which is a seat where you *can* see them. The paragraph sets up a
  see-or-not-see binary and then hands the Copilot reader a third arrangement that breaks it. This
  is not a Copilot fact error (the billing prose matches `copilot-specific.md` exactly, including
  credits-by-token, monthly forfeit and free completions); it is the shared framing surviving into a
  variant it no longer fits.
- **Fix** Rewrite only the Copilot variant's second sentence, which is free to differ because the
  two siblings are separate keys:
  `The tokens are the same either way. What differs is how the bill reaches you.` NL: `De tokens
  zijn in beide gevallen dezelfde. Wat verschilt, is hoe de rekening bij je aankomt.`
  Leave `.3.claude` exactly as it is.

### 5. The step's own `CLAUDE.md` has drifted about this unit (maintenance, not student-facing)

- **Where** `front/src/steps/step1/CLAUDE.md`, the `model` block
- **Problem** Four statements about this unit are wrong, and one of them would cause a bad edit:
  it says the worked day in `SessionWindows` is "08:00, the break at 13:00, home at 18:00", but
  `SessionWindows.tsx` sets `LEAVE = 17` and its own comment says "home at five" (18:00 is nowhere;
  `DAY_END = 20` is only the axis). It also says `model` carries "prose, one figure, and one
  exercise" (there are four figures), calls the heading "Check yourself" (the HTML writes
  `ui:quiz.title`, "Test yourself"), and refers to `model-statistic.4`, which is
  `context.model-statistic.4` and lives in `context.html`.
- **Fix** Correct the four statements. The `LEAVE` one first: anyone who "moves the worked day"
  by following that sentence moves the wrong number and desynchronises both rows from the guide
  lines.

---

## 3. Progression

The spine is sound and I want to say so before the two findings. `lead.1` opens cold on the claim
the whole step has been building to ("Everything in this step so far fills the window. Something has
to read it."), the money block runs cost → billing model → quota timing without a seam, `reasoning-level`
opens by pointing at `prompt` rather than re-explaining, `let-it-pick` points back at `harness`'s
coordinator rather than redefining it, and `PickTheTier` closes on the choice the prose deliberately
stopped short of making. Nothing is re-argued.

**Considered and rejected:** moving the Claude-only five-hour section out from between "API vs
subscription" and "Speed". It looks like a digression on a first read, but it is a money topic
(not wasting a quota you already paid for) and it sits inside the money block. Moving it would be
taste, not a fix.

### 1. "Cannot hold together" arrives as if it had been established

- **Where** `model.cost.2`, against `model.lead.2`
- **Problem** `lead.2` names three differences: cost per token, speed of answer, and "how well they
  hold a long task together". The unit then gives an `<h2>` to the first and an `<h2>` to the second.
  The third is never returned to in prose. It is delivered, but only inside `ModelTiers`'s card
  bodies and inside `PickTheTier`'s `flaky` explanation, both of which a reader can skim past. The
  visible stumble is `cost.2`, which says the frontier model is "kept for work the top tier cannot
  hold together" and uses the phrase as though the reader already owns it, three paragraphs before
  anything in the prose has given it to them.
- **Fix** Do not add a section (a section called "Which one you run" was already cut and should stay
  cut). One clause is enough. In `lead.2`, hand the third difference to the cards explicitly:
  `A provider ships a family rather than a model. They differ in what they cost per token and how
  fast they answer, and in the one the cards below are about: how well each holds a long task
  together.` NL: `Een provider levert een familie, geen model. Ze verschillen in wat ze per token
  kosten en hoe snel ze antwoorden, en in datgene waar de kaarten hieronder over gaan: hoe goed ze
  een lange taak bij elkaar houden.`

### 2. The table silently pays off `harness` and nothing marks it (low priority, optional)

- **Where** `ModelPricing`'s cache columns, against `harness.caching.1` and `.3`
- **Problem** `harness` tells the reader a cached prefix is "billed at roughly a tenth" and that
  "you can pay for longer". Both numbers are sitting right there in this table (0.1x read; 1.25x and
  2x write) and no sentence in `model` says so, so the payoff only lands for a reader who thinks to
  check by eye. That is inconsistent handling of the same move inside one unit: `cost.4` marks its
  cross-unit payoff to `context` explicitly and at length.
- **Fix** Optional, and decline it if it would crowd `cost.1`. If taken, one clause at the end of
  `cost.1`: `The cache columns are the tenth the harness unit promised you, priced.` NL: `De
  cachekolommen zijn het tiende dat de unit over het harness je beloofde, uitgeprijsd.`

---

## 4. Readability

### 1. The one paragraph that does arithmetic names the wrong operation

- **Where** `model.cost.4` (and `model.cost.4` in nl.json, which shares the fault)
- **Problem** "Money on your own window takes **one division**. `/context` printed your count back
  in the context unit, and the table above prices a million of those. **Multiply**, and that is what
  sending the window up once costs." The paragraph opens by naming a division and closes by
  instructing a multiplication. The step's `CLAUDE.md` calls this "the one place in the course that
  multiplies", so the intent is clear, and the reader is left reconciling two operations in three
  sentences. This is the single sentence in the unit a reader stops on.
- **Fix** EN: `Money on your own window is one sum.` (leave the rest of the paragraph untouched).
  NL: `Geld op je eigen venster is één som.` (the Dutch currently reads "is één deling", same fault,
  same fix).

### 2. `(July 2026)` has no subject

- **Where** `model.lead.3`, rendered as `<small>(July 2026)</small>` under `ModelTiers`
- **Problem** A bare parenthesised date under a figure that deliberately contains nothing dateable.
  The cards carry tier names and dispositions, no version numbers, by decision. So the reader meets
  a date with no idea what it qualifies. It is the residue of the cut paragraph that used to say the
  names change and the shape does not, and it now has to carry that job without the sentence that
  did it. Compare `pricing.caption` one screen down, which dates a thing the reader can see is
  dateable.
- **Fix** Give it a subject. Add no claim, so `cost.3` stays the only place the outlast argument is
  made. EN: `<small>The family as it stood in July 2026.</small>` NL: `<small>De familie zoals ze er
  in juli 2026 uitzag.</small>`

### 3. The one modal in the unit breaks the writing rule the repo enforces everywhere else

- **Where** `model.five-hour-window.1`
- **Problem** "Your provider **might** give you a session limit". `lesson-writing/SKILL.md` is
  categorical: "Hedge with frequency, not with modals. 'may', 'could potentially', 'one might' do
  not appear anywhere in these units and should not start now." This is the only such modal in the
  file. The step's `CLAUDE.md` defends the *hedge* ("this is one vendor's arrangement rather than
  how models are billed"), which is right and should be kept, but it quotes the modal as though the
  modal were the hedge. The two rules are in conflict and the writing skill should win, because the
  hedge survives the fix intact. See finding 8.2 below: the Dutch already does it correctly.
- **Fix** EN: `Some providers give you a session limit, and it is usually a sliding window of five
  hours.` Leave the Dutch alone. If this lands, the sentence in the step's `CLAUDE.md` that quotes
  "a provider *might* give you a session limit" has to be reworded with it.

---

## 5. Imagery

**The four existing figures all clear the bar and none should be cut.** `ModelTiers` carries the
dispositions and the three example tasks per tier, none of which the prose states. `ModelPricing`
is the evidence for a ratio the prose asserts and is the only currency in the course, which is
exactly the "argued everywhere, demonstrated nowhere" gap it was built to close. `usage-readout` is
machine output, uncropped, doing what a description cannot. `SessionWindows` measures the one thing
the four paragraphs above it cannot say in words: that both rows are the *same* two five-hour
windows and only the opening hour moved, with the break and the going-home line as the fixed
reference. Redrawing any of them would cost more than it bought.

### 1. Cost is demonstrated. Speed is asserted. (the one gap)

- **Where** `model.speed.1`, the `Speed` section
- **Problem** `lead.2` gives cost and speed equal billing, and the unit then gives cost a table and
  speed nothing. `speed.1`'s claim is a *threshold* claim, not a ratio claim: "On one question that
  is a few seconds and you will not care. Inside a loop that runs a hundred times, it is the
  difference between a job you watch and a job you leave running." That threshold is precisely the
  kind of thing a drawing settles and a sentence cannot, and the argument the repo already accepted
  for building `ModelPricing` applies to it word for word.
- **Fix** A small figure, `SpeedAtScale`, under `speed.1`. What it draws: three rows, one call, ten
  calls, one hundred calls. Each row carries two bars, the small tier and the top tier, measured in
  wall-clock minutes on the same x axis. One vertical guide line labelled the way `SessionWindows`
  labels its day, at the point where you stop watching and go and do something else (a couple of
  minutes). The reading is the crossing: at one call both bars sit left of the line and the reader
  can see why "you will not care"; at a hundred, one bar is still left of it and the other is far
  right. That is `speed.1`'s sentence, measured. It joins the step's vocabulary the way
  `SessionWindows` does (a bar is something you have, a guide line is what you measure against) and
  needs no context frame. **Its numbers would be hand-authored**, so it takes a caption saying so,
  the way `NextToken`'s does, and it must not be drawn until finding 2.1 above is settled, since the
  bar lengths are that ratio.

---

## 6. Supporting tasks

`PickTheTier` is good and should not be touched: five real situations against three tiers so nothing
falls out by elimination, one trap (`plan` looks like top-tier work until you notice the plan already
did the thinking), one row that cannot be got wrong and comes back amber, and explanations that
reach back to `prompt` and forward to step 2. It is the best-shaped board in the step. Full Dutch.

### 1. The unit instructs arithmetic and nobody ever collects it

- **Where** `model.cost.4`, against `context`'s `ReadYourWindow`
- **Problem** "Multiply, and that is what sending the window up once costs, before the model has
  written a word." That is an instruction, delivered as prose, in the middle of a paragraph, with
  nothing asking for the result. It is also the only consumer of a number the student produced two
  units earlier: `ReadYourWindow` makes them run `/context` and read a count, and nothing in the
  course ever uses it again. Step 0's last house rule points forward at this paragraph as the place
  step 1 "hands them the numbers". So the course sets up a measurement, points forward at it twice,
  and then leaves the reader to do the sum in their head or not at all. This is the clearest
  told-but-never-asked in the unit.
- **Fix** A `TaskCard`, `PriceOneTurn`, under the existing `<hr />` and `ui:quiz.title` heading,
  above `PickTheTier`. Three moves, one line each, one tick to `kata.step1.price`:
  1. `Read your window again with /context, in the project you are working in.` (no assistant
     variant needed; `/context` is the same command in both, which the step already relies on)
  2. `Take the rate for the tier you actually run, from the table above.`
  3. `Divide your count by a million, multiply by the rate, and write the number down.`
  No description line, the way `ReadYourWindow` carries none. Nothing grades it; the number is for
  the student. Note the cost honestly: this makes `model` the second unit in the step with a task
  and something else under one "Test yourself" heading, and the step's `CLAUDE.md` currently records
  `PickTheTier` as "the only thing under its rule". That sentence would have to change. The shared
  heading mechanism (`showsExerciseHeading`) already handles the composition, since `context` does
  exactly this with a task plus a registry quiz.

### 2. The most actionable advice in the unit is never worked (secondary, and it costs something)

- **Where** `model.five-hour-window.4`
- **Problem** "Work out when you take your break and subtract five hours. Say hello at that hour."
  That is a concrete, do-it-today move with a figure drawn specifically to make it legible, and the
  reader is only told it. `SessionWindows` shows what the aligned day looks like; nothing asks the
  student to place their own.
- **Fix** Only take this if finding 6.1 is taken first, and be clear it is the weaker of the two. A
  Claude-gated `TaskCard`, three moves: run `/usage` and note where the current window sits; work
  out your own break hour and subtract five; open tomorrow's window at that hour and check `/usage`
  again. **The cost:** the whole card and its marker would need `data-assistant="claude"`, which
  widens the 968-vs-770 split `audit.md` row 32 already flags as the worst assistant gap in the
  course, and it would put a Claude-only card under a shared heading. If that trade is not wanted,
  the cheaper version is to leave the prose alone and let `PriceOneTurn` be the unit's only card.

---

## 7. Quiz

**This unit does not need one, and adding a three-question quiz would make it worse.** Three
reasons, in order of weight. `PickTheTier` already grades the tier claims across five situations
with a written explanation per row, so a quiz would be the second graded thing under one "Test
yourself". The two confusions a quiz would most want to test are already handled: tier against
reasoning level is the subject of a `promptQuiz` distractor and of the whole `Reasoning level`
section, which exists only to keep them apart, and key against subscription is a section rather
than a testable fact. And every quiz in the course sits in the opening units by decision;
`contextQuiz` and `promptQuiz` are the two nearest and both are behind the reader by the time they
arrive here.

The one claim nothing checks is `cost.2`'s: that the fourth row of the table is a ceiling and not a
fourth tier. That is a misreading a reader would genuinely have (four rows, three cards, and the
row is the cheapest thing on the page to mis-learn), and it is exactly why `cost.2` was written.
If a question is ever wanted here, that is the only one worth asking, and it should be one question
attached to `PickTheTier`'s heading rather than a three-question `modelQuiz`. My recommendation is
still to leave it alone: `cost.2` names the trap in three sentences and does it well.

---

## 8. EN / NL parity

**Complete.** Every one of the 22 prose keys in `model.html` has a Dutch entry, including both
assistant variants of `.2` and `.3` and all four Claude-only `five-hour-window` keys. Every figure
label, caption, tier body, scenario and explanation has one too. `tiers.*.name` (Opus, Sonnet,
Haiku) and `ModelPricing`'s model names and prices deliberately have none, which is the same rule
flags and machine output follow and is documented. No em-dashes in either language. This is the best
parity in the step and it should be said.

Two things to fix, and one of them is the Dutch being right.

### 1. A Dutch typo and a Dutch ellipsis

- **Where** `model.api-vs-subscription.1` and `model.api-vs-subscription.3.copilot` (nl.json)
- **Problem** `.1` reads "voor precies wat **eronaartoe** ging en wat er terugkwam". `eronaartoe` is
  not a word; the form is `ernaartoe` (or `erheen`). Separately, `.3.copilot` reads "input, output
  en **de gecachete**", where the English is "input, output and the cached ones" and the Dutch drops
  the noun the adjective needs.
- **Fix** `.1`: `voor precies wat ernaartoe ging en wat er terugkwam.`
  `.3.copilot`: `input, output en de gecachete tokens, elk aan het tarief van het model dat je koos.`

### 2. The Dutch already obeys the modal rule the English breaks (Dutch leads)

- **Where** `model.five-hour-window.1`, both languages
- **Problem** The English hedges with a modal, "Your provider **might** give you a session limit",
  which `lesson-writing/SKILL.md` bans outright. The Dutch hedges with a frequency adverb, "Je
  provider geeft je **mogelijk** een sessielimiet", which is the shape the skill asks for. Where the
  two disagree the repo rewrites the English, and here the Dutch is straightforwardly the better
  sentence.
- **Fix** As in 4.3: rewrite the English to `Some providers give you a session limit, and it is
  usually a sliding window of five hours.` Change nothing in the Dutch.

---

## Verdict

This is a strong unit carrying three specific defects and one missing drawing, not a weak unit. The
argument builds cleanly from "something has to read the window" to a graded choice of reader, it
refuses to re-explain what `prompt` and `harness` own, it is the only place in the course that puts
a currency on a claim, and the exercise closing it is the best-shaped board in the step. The prose
is genuinely human and I found nothing to flag as an AI tell. What holds it back is that the numbers
are not all as solid as the unit's own standard: a caption that asserts a listing it is not, a
speed ratio repeated in four strings that nothing supports, and a training claim used as a mechanism
that no provider documents. Add to that one sentence that names a division and then instructs a
multiplication, an orphan date under a figure with nothing dateable in it, and the fact that the
paragraph telling the reader to work out what a turn costs is the one instruction in the step nobody
ever collects. Fix those and it is the best unit in step 1.

Priority order:

1. **Rewrite `pricing.caption`** so it stops asserting a listing that is false for the Sonnet row
   (both languages). Truthfulness, cheapest fix on the page. (2.1)
2. **Re-measure or hedge "four to five times faster"**, in all four strings, and do it before
   drawing anything that depends on the ratio. (2.2)
3. **Fix `cost.4`'s "one division"** to "one sum", both languages. One word, removes the only
   sentence a reader stops on. (4.1)
4. **Add the `PriceOneTurn` task card**, which converts `cost.4` from an instruction nobody collects
   into the payoff for the count `ReadYourWindow` produced two units earlier. (6.1)
5. **Rewrite `api-vs-subscription.3.copilot`'s second sentence** so the Copilot reader is not handed
   a binary their own arrangement breaks. (2.4)
6. **Hedge or cut the fine-tuning claim** in `let-it-pick.2`. (2.3)
7. **Draw `SpeedAtScale`**, once the ratio is settled: the threshold in `speed.1` is the one claim
   in the unit a reader takes on trust that a drawing would settle. (5.1)
8. **Give `(July 2026)` a subject**, and **replace the `might` in `five-hour-window.1`** with the
   frequency hedge the Dutch already uses. (4.2, 4.3 / 8.2)
9. **Hand the third difference to the cards** in `lead.2`, so `cost.2`'s "cannot hold together"
   stops arriving cold. (3.1)
10. **Fix the two Dutch strings** (`eronaartoe`, `de gecachete`). (8.1)
11. **Correct the four drifted statements** about this unit in `front/src/steps/step1/CLAUDE.md`,
    the `LEAVE = 17` one first. (2.5)
12. Optional, decline freely: mark the cache-column payoff to `harness` (3.2); the Claude-gated
    five-hour task card (6.2).
