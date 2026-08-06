# Dossier: step2 / `workflows`

Read: `BRIEF.md`, `front/src/steps/step2/CLAUDE.md`, `units/workflows.html`, `index.tsx`,
`locales/en.json` + `nl.json`, `FlowDiagram.tsx`, `AuditExample.tsx`, `WorkflowWeights.tsx`,
`WorkflowTimeline.tsx`, `quiz.ts`, `audit.md` (items 7, 15, 40, 48), `lesson-writing/SKILL.md`.
Cross-checked against `step1/prompt.html`, `step1/harness.html`, `step2/engineering.html` and
`kata/step2/java`.

**Headline.** This is the best-built unit in step 2: 949 words, seven figures, three situational
quiz questions, full Dutch parity, no em-dashes, every cross-reference verified. It has one real
hole and it is in the load-bearing sentence: `lead.2` promises that reading falls as you move down
the list, and `WorkflowWeights`, the unit's own closing measurement, draws `audit-driven` reading
exactly as much as `naive`. The unit's ordering argument and the unit's comparison figure disagree,
and the reader meets the promise first.

---

## 1. AI tells

The prose is human and mostly very good. Cold opens ("Almost everybody starts here.", "One step up
costs one keystroke.", "Build however you like, then ask for the audit."), fragments used on
purpose, concrete nouns from the actual step-2 domain (grace period, tier, empty list, all real in
`kata/step2/java`). Three genuine tells, and one of them is a cadence rather than a sentence.

1. **Where:** whole unit, most visibly `workflows.plan-based.2` and `workflows.pick-per-task.3`
   **Problem:** the rhythm of threes. Seven lists of three in 949 words, roughly one per paragraph:
   `naive.1` ("Ask for the feature, skim what comes back, run it"), `naive.2` (three places, and
   inside its third item another three: "a padding, a log line, a column that should have been
   nullable"), `plan-based.2` (three interview questions), `audit-driven.1` (three audit
   questions), `audit-driven.2` (four columns), `audit-driven.4` ("Worst row first, fix it, run the
   audit again"), `pick-per-task.3` (three questions to ask of the task). Individually every one is
   fine; the brief's complaint is exactly this, "one list is fine; a rhythm of them is a machine".
   Three of them are protected by `CLAUDE.md` or by a quiz distractor: `naive.2`'s three places is
   recorded as deliberate, `audit-driven.1`'s three map onto `quiz.audit-as-essay.scope`, and
   `audit-driven.2`'s four are the figure's four columns. Two are free.
   **Fix:** break the two that are free. `plan-based.2` drops to two questions, which is what
   `quiz.plan-mode-interview.explanation` already quotes back ("which tier gets a grace period and
   what happens when the list comes back empty"):
   > The plan is not the part worth having. The agent interviews you `<pattern icon>` and its
   > questions are the ones you skipped: which tier gets a grace period, what happens when the list
   > comes back empty. You answer them before a line exists, which is what you would have done
   > designing it yourself. The workflow puts you back in the design.

   and `pick-per-task.3` drops to two:
   > So read the task before you pick. How long does this code live, and how much of the diff will
   > you have to read yourself. Then take the cheapest workflow that answers those. Deciding
   > between them is the engineering.

2. **Where:** `workflows.pick-per-task.3`, last sentence
   **Problem:** "No method is perfect, and deciding between them is the engineering." The first
   clause is a truism that hedges the claim standing next to it. The skill's own checklist asks
   "which sentence only says the previous one again" and this is the softer version: a filler
   half-sentence propping up the sharp one.
   **Fix:** cut it. "Deciding between them is the engineering." (folded into the rewrite above).

3. **Where:** `workflows.pick-per-task.4`, first sentence
   **Problem:** "A project evolution timeline might look like this." This announces the drawing
   instead of earning it, which is the shape `lesson-writing` explicitly bans ("Never 'as you can
   see in the diagram below'"), and it hedges with "might". It also collides by accident with the
   step's first unit, whose rendered title is **Project evolution**, so a reader can read the
   sentence as a pointer back to a unit it is not pointing at. `WorkflowTimeline`'s five notes
   already say it is one project over its life, so nothing is lost by cutting.
   **Fix:** delete the sentence; the paragraph opens cold on the claim and the figure follows it.
   > Every move up the list is paid for by the one before it, and the way back down is per row
   > rather than per project. What that last pass changes goes into the specs, or they quietly stop
   > describing the thing you shipped.

   Dutch: drop "Een tijdlijn van hoe een project evolueert ziet er ongeveer zo uit." and start
   `workflows.pick-per-task.4` at "Elke stap omhoog in het lijstje...".

**Not flagged, deliberately.** "It still has a place, and the place is real." reads as emphatic
doubling rather than machine restatement, and the house voice does that. "Using it once is a trick.
Using it by default is a workflow" is parallelism a person wrote. Neither is a defect.

---

## 2. Truthfulness

Verified and correct: `audit.md` exists at the repo root and is what the course is rewritten from;
its columns are Topic / Where / Status / Remark, which is exactly what `audit-driven.2` promises;
`MemberTier`, the grace-period loan and the empty-list case are all real in
`kata/step2/java/src/main/java/.../config/LoanDataConfig.java` and `MemberStatements`; all three
cross-links resolve (`/steps/step2/engineering`, `/steps/step1/prompt`, `/steps/step1/harness`) and
each names a claim that unit actually makes. `WorkflowWeights`' four rows all sum to 500, so the
equal-bar argument holds arithmetically.

1. **Where:** `workflows.lead.2` (and `nl.json` line 307)
   **Problem:** "The further down you go, the more you settle before any code exists **and the less
   you have to re-read when it arrives**." The second half is false for the fourth workflow, by the
   unit's own drawing. `WorkflowWeights.tsx` rows: naive `after: 250`, plan-based `165`,
   spec-driven `78`, audit-driven `250`. Audit-driven is the bottom of the list and ties naive for
   the most reading, and `step2/CLAUDE.md` records that as deliberate ("`naive` and `audit-driven`
   come out close on that axis deliberately, because they are close"). The unit then contradicts
   its own lead out loud in `pick-per-task.2`: "Nothing on that drawing gets shorter. The work moves
   to the front or to the back." So the reader is given a monotone promise in paragraph two and the
   correction 900 words later, with the figure siding with the correction. This is the sentence the
   whole ordering rests on.
   **Fix:**
   > What follows runs from cheapest to most deliberate. The further down you go, the more you
   > settle before any code exists, and the more of the run is already decided by the time it
   > starts. That trade is the decision you are actually making.

   Dutch:
   > Wat hierna komt loopt van goedkoop naar bewust. Hoe verder je gaat, hoe meer je uitklaart
   > voordat er code bestaat, en hoe meer er al beslist is tegen dat de run begint. Die afweging is
   > de beslissing die je eigenlijk maakt.

2. **Where:** `workflows.audit-driven.4`, last sentence
   **Problem:** "And the whole document stays short enough to read in one sitting, which is the
   difference between a report and a plan." Two paragraphs earlier the unit points at this
   repository's own `audit.md` as the example. That file is **8,225 words** of tables and numbered
   remarks. A student who follows the pointer finds the claim falsified by the exemplar. The clause
   is also the weakest sentence in the section: it introduces a report/plan distinction in its last
   four words and never uses it again, which is the "gesture at significance instead of ending"
   shape, and it buries the paragraph's best line ("one thing you can stop carrying around") in the
   middle.
   **Fix:** cut the sentence and end on the sharp line.
   > Then work the table. Worst row first, fix it, run the audit again. The solid row with nothing
   > beside it counts as much as the rest, because that is one thing you can stop carrying around.

   Dutch: drop "En het hele document blijft kort genoeg om in één keer te lezen, en dat is het
   verschil tussen een rapport en een plan."

3. **Where:** `en.json` `workflow-weights.description`, `nl.json` line 66
   **Problem:** "Naive is almost all reading; spec-driven is mostly deciding." Naive's read segment
   is 250 of 500, half the bar, with 230 of it the agent running. "Almost all reading" is not what
   the drawing shows. This string is the `<title>` of the SVG, so it is the entire figure for a
   screen-reader user: they are told a proportion the sighted reader does not see.
   **Fix (en):** "Four bars of the same length, one per workflow, each cut into what you decide
   first, what the agent runs, and what you read afterwards. Naive decides almost nothing up front
   and leaves a long read; spec-driven is the reverse."
   **Fix (nl):** "...Naïef beslist vooraf bijna niets en laat veel te lezen over; spec-gedreven is
   net omgekeerd."

4. **Where:** `en.json` `flow-naive.description`, `nl.json` line 48
   **Problem:** "Nothing comes back either way." / "In geen van beide richtingen komt er iets
   terug." The section this figure closes says the opposite in as many words: "skim what comes
   back... paste the error and ask for a fix". Naive is a loop with the agent; what it lacks is a
   round trip *before* code exists. Again this is the whole figure for a non-sighted reader, and it
   contradicts the paragraph six lines above it.
   **Fix (en):** "You ask, the agent writes the code inside the project. Nothing is settled between
   you before it does."
   **Fix (nl):** "Jij vraagt, de agent schrijft de code in het project. Er wordt niets uitgeklaard
   voordat dat gebeurt."

5. **Where:** `workflows.plan-based.1`, "One step up costs one keystroke."
   **Problem:** cannot be verified as written. Plan mode in Claude Code is entered by cycling with
   Shift+Tab, which is two keys and usually two presses from the default mode; Copilot CLI differs
   again, and step 2 is the one step not written for two assistants. `step2/CLAUDE.md` records that
   `steering` "names Escape, which is the only keystroke in the whole course" precisely because
   bindings date a unit. This sentence does not name a binding, so it does not date, but it does
   assert a count a student will test.
   **Fix (optional, low priority):** "One step up costs a mode switch." Everything after it is
   unchanged and the punch survives. Flagging rather than insisting: the figure of speech is
   defensible.

6. **Where:** repo-internal comments, not student-facing. Three stale claims that would mislead the
   next maintainer:
   - `FlowDiagram.tsx:17-18` — "`audit-driven` runs to five boxes and four arrows". The registry
     gives it six nodes and five links, and `step2/CLAUDE.md` says "six-box chain". Fix the
     docblock to six and five.
   - `WorkflowWeights.tsx:15` — "the caption admits it here the same way". There is no
     `<figcaption>` in the component, and `step2/CLAUDE.md` records that the caption "was **cut on
     purpose**". Rewrite the sentence to say the proportions are hand-authored and the caption was
     cut.
   - `WorkflowTimeline.tsx:84` and `step2/CLAUDE.md` both put the right-hand riser on "the last
     `Plan-based`". The last card renders `workflow-timeline.plan-fixes.name` = **"Plan/naive"**.
     Name the card by what it says.

---

## 3. Progression

The spine is sound and the ordering genuinely is the argument. Two of the four workflows are owned
by step 1 and the unit points instead of re-teaching, exactly as `CLAUDE.md` requires: plan mode
gets one clause plus what turns it into a workflow, reflection gets one clause plus what is new
about aiming it at a project. That discipline is not applied to the third borrowed idea.

1. **Where:** `workflows.naive.1`
   **Problem:** it re-states `engineering`'s definition of vibe coding in the same words before
   linking to it. `engineering.lead.2`: "Vibe coding is asking for a feature, skimming what comes
   back, and running it. When it breaks you paste the error and say 'fix this'."
   `workflows.naive.1`: "Ask for the feature, skim what comes back, run it. When it breaks, paste
   the error and ask for a fix." Two sentences, near verbatim, three units later. The unit's own
   rule for plan mode and reflection is point-do-not-repeat; naive gets the definition twice and
   the pointer as an afterthought.
   **Fix:** name it first, then say only what this unit adds.
   > Almost everybody starts here. It is the vibe coding the <a href="/steps/step2/engineering">engineering
   > unit</a> argued against: ask, skim, run, and paste the error when it breaks. Nothing is written
   > down, because nothing was decided.

   Dutch:
   > Bijna iedereen begint hier. Het is de vibe coding waar <a ...>de unit over engineering</a> tegen
   > waarschuwde: vragen, scannen, draaien, en de foutmelding erin plakken als het stukgaat. Er staat
   > niets opgeschreven, want er is niets beslist.

2. **Where:** `workflows.naive.3`
   **Problem:** "ask it to write the specs the code implies" uses the unit's term for a spec two
   sections before `Spec-driven` defines it (a markdown file per feature, in the repository, with
   scope and acceptance criteria). A reader who does not already have that meaning reads "specs" as
   "documentation" and misses that the recovery move is retrofitting workflow three.
   **Fix:** low cost, one clause: "ask it to write the specs the code implies, one per feature,
   and read them for what it got wrong." Dutch: "laat hem de specs schrijven die de code impliceert,
   één per feature, en lees ze na op wat hij fout heeft."

3. **Where:** `workflows.plan-based.2` and `workflows.spec-driven.3`
   **Problem:** adjacent sections land the same punchline. "its questions are the ones you skipped"
   and "a draft that guessed wrong shows you exactly what you never decided" are one claim in two
   costumes, and the second lands weaker for arriving second.
   **Fix:** this is an observation rather than a demand, because the mechanisms genuinely differ (a
   question against a wrong guess) and both closers are good. If one moves, it is `spec-driven.3`'s,
   which can end on the cheaper claim instead: "Reviewing a draft is faster than facing an empty
   file." Low priority.

4. **Where:** both seams (opening and closing)
   **Problem:** already recorded as **audit item 40**: `patterns` names no unit at all and this one
   closes on `WorkflowTimeline` with no line into `enablement`. Prior art, not my discovery, and the
   audit's own fix (one closing clause into `enablement`, placed before the figure so the drawing
   still closes the unit) is the right one. Noting it here only so the two seam edits are not made
   twice.

**Does the reader arrive knowing what the unit set out to teach?** Yes, with the `lead.2` fix. The
closing section does the job `CLAUDE.md` says it must: four techniques plus a reason to pick one.

---

## 4. Readability

1. **Where:** `workflows.naive.2`, last sentence
   **Problem:** "This is deliberately not structuring or restructuring." Vague referent ("this" is
   three examples ago), abstract where the rest of the paragraph is concrete, and a weak place to
   end after three sharp fragments. Worse: `step2/CLAUDE.md` says this sentence carries the claim
   "**nudging is not restructuring**", the one that "survives everything else in the step" and that
   `Plan/naive` at the end of `WorkflowTimeline` turns on. The prose states it obliquely and
   `quiz.small-change-no-spec.nudge` states it better than the unit does.
   **Fix:** keep it in this paragraph, per `CLAUDE.md`, and say it.
   > It still has a place, and the place is real. A site for the baker on the corner. A trial
   > version built to find out whether the idea holds up at all. A one-line change in an otherwise
   > careful project: a padding, a log line, a column that should have been nullable. None of those
   > decides anything. Nudging is not restructuring.

   Dutch: "...Geen daarvan beslist iets. Een duwtje geven is niet herstructureren."

2. **Where:** `workflows.spec-driven.3`, first sentence
   **Problem:** "You do not write these cold either." The "either" has no antecedent in this unit
   (nothing above it said you do not write something cold), and "cold" is doing work the reader has
   to guess at. The Dutch is clearer here, "Je schrijft ze ook niet van nul", which is "from
   scratch".
   **Fix:** "You do not write them from scratch." The following sentence already carries the empty
   file.

3. **Where:** `workflows.audit-driven.1`
   **Problem:** "The agent reads the files under scrutiny" is passive register drift into
   documentation voice, in a unit that is otherwise second-person and concrete. It also hides the
   decision the sentence depends on: somebody chose those files.
   **Fix:** "The agent reads the files you point it at and writes `audit.md`: is this complete, is
   it secure, does it follow the style the repository already uses." Dutch: "De agent leest de
   bestanden die jij aanwijst en schrijft `audit.md`: ..."

4. **Where:** `workflows.spec-driven.1`, last sentence
   **Problem:** "The out-of-scope **half** earns its place fastest" arrives after a list of four
   things a spec holds. A reader who counted stumbles on "half".
   **Fix:** "The out-of-scope part earns its place fastest, because that is where an agent invents
   things." Dutch: "Het stuk dat buiten scope valt verdient zichzelf het snelst terug."

5. **Where:** the `Pick per task` section as a whole
   **Problem:** four paragraphs and two figures under one heading, in a unit whose other sections
   run two or three. The heading names the first argument (choose per task); the last paragraph and
   `WorkflowTimeline` argue the second (a project climbs the list over its life and drops back per
   row). Both are recorded as deliberate in `CLAUDE.md`, so this is a note rather than a demand.
   **Fix (optional):** a second `<h2>` before `pick-per-task.4` would give the timeline its own
   name and cost only a key rename (`workflows.pick-per-task.4` → `workflows.<new-slug>.1`). I would
   not do it: the section coheres, and the rename touches both bundles for a small gain.

---

## 5. Imagery

Seven figures, the densest unit in step 2 and second in the course to `step1/tools` (audit item 40).
**No eighth figure is needed and I am not proposing one.** Every drawing here carries something the
sentences do not: `AuditExample`'s switch is the unit's only interactive element and is the entire
proof of "an audit looks like a report and is a file that diffs"; `WorkflowWeights` is the only place
the equal-total claim exists; `WorkflowTimeline` carries three arguments in its own labels that
appear nowhere in prose. Two problems, both in the `FlowDiagram` set.

1. **Where:** `flow-naive` / `flow-plan` (`index.tsx:128-141`), and their `.description` keys
   **Problem:** the only difference the drawings show between naive and plan-based is that the
   you↔agent link turns from a muted one-way arrow into a teal two-way one. But naive **is** a
   two-way exchange with the agent, and the paragraph directly above `flow-naive` says so: you skim
   what comes back and paste the error in. So the figure's teal, which `CLAUDE.md` defines as "what
   that section adds", marks something naive already had. What plan-based actually adds is a round
   trip **before any code exists**, and the drawing has no way of saying "before".
   **Fix, cheap and sufficient:** keep the arrows and fix the two labels so the teal is read as
   timing rather than as existence. `flow-naive.description` as in Truthfulness §4, and
   `flow-plan.description`: "You and the agent settle the task between you first, and only then does
   the agent write the code inside the project." Dutch: "Jij en de agent klaren de taak eerst samen
   uit, en pas daarna schrijft de agent de code in het project."
   **Fix, better but more work:** give `FlowDiagram` an optional order marker so `flow-plan`'s
   two-way link can be labelled `1` and its write `2`. Only worth it if somebody is in the component
   anyway; the label fix removes the false claim on its own.

2. **Where:** `flow-naive`
   **Problem:** on its own it fails the repo's own bar. `you → agent → [project: code]` is
   `naive.1` redrawn, and no line of prose reads it. `CLAUDE.md` defends it as the baseline the
   other three are measured against, and that defence holds: a set of four read down the unit needs
   a zero row. Recording the tension, not proposing a cut. **Do not cut it** without cutting all
   four.

3. **Where:** nothing missing
   **Problem/Fix:** the one claim in the unit a reader had to take on trust was `lead.2`'s trade,
   and `WorkflowWeights` already measures it. Once `lead.2` stops overstating, prose and figure
   agree and the gap closes with a sentence rather than a drawing.

---

## 6. Supporting tasks

The unit asks the reader to do nothing but answer three questions. `step2/CLAUDE.md` records that as
deliberate: "there is nothing a card could ask the student to *do* here that would not be a smaller
version of the workshop."

1. **Where:** end of unit, after the quiz
   **Problem:** the recorded reason has weakened since it was written. The `workshop` grades a
   coverage floor, a complexity ceiling, a mutation score, a missing method and a native image. It
   never asks for an audit, and audit-driven is the one workflow of the four that a student can run
   against a repository they did not write in fifteen minutes. The unit teaches a format rule
   (four columns, a status glyph, a fix per row), shows the artifact, and then asks the student
   only to recognise it in a multiple-choice question. This is the axis the brief calls "told
   something and never asked to do it".
   **Fix (proposal, against a recorded decision, so it needs the owner's call):** a `TaskCard`
   under the quiz, ungraded, block `audit-a-project`, four moves, ticked to `kata.step2.audit`:
   - Point your agent at `kata/step2/java` and ask for `audit.md`: is it complete, is it tested, is
     it consistent with itself. Ask for the four columns before it starts.
   - Read the status column first. Cross out every row you would not act on this week.
   - Pick the worst row and write the one command that would tell you it is fixed.
   - Change nothing in the project. The workshop needs it exactly as it is.

   The fourth move is not politeness: `WhereWouldItGo` already carries the same warning for the same
   reason, and an audit that only writes a file is safe where a refactor is not. If the owner keeps
   the no-exercise decision, the reason recorded in `CLAUDE.md` should be updated to the real one
   (the capstone is 2 to 4 hours and this unit is 900 words in front of it), because the current
   wording is no longer accurate.

---

## 7. Quiz

Three questions, and they are good. Situations rather than definitions, exactly as `CLAUDE.md`
requires, one per workflow with something to get wrong, and spec-driven deliberately unasked.

**No changes proposed.** The distractors are things a reader would genuinely believe, and each is
disqualified by something in the stem rather than by being silly:
- `small-change-no-spec.consistency` ("a workflow you apply only when you feel like it stops being
  a workflow") is the strongest pull in the set and is the exact misconception `naive.2` exists to
  break.
- `plan-mode-interview.thinking` ("the model reasons for longer") is plausible and half true, and
  it is the misconception `step1/prompt.plan-mode.2` already corrects ("precision was the missing
  ingredient all along, not model size"). Verified against that file. `review` ("reading a plan is
  faster than reading a diff") is a true statement about the world, disqualified by the stem's "you
  approve most of the plans with barely an edit". That is careful question design.
- `audit-as-essay.scope` is disqualified by "a week later you cannot remember which parts you dealt
  with", which three separate essays would not fix either.

One incidental use: `quiz.plan-mode-interview.explanation` quotes only two of `plan-based.2`'s three
interview questions, which is the evidence that the third is droppable (see AI tells §1).

Dutch quiz text is complete and says the same thing. `quiz.small-change-no-spec.nudge` in Dutch
("Dit is geen structureren of herstructureren") tracks the current English prose, so if
`naive.2` is rewritten to say "nudging is not restructuring", this option's Dutch moves with it.

---

## 8. EN/NL parity

**Parity is complete.** All 23 `data-i18n` keys in `workflows.html` have Dutch entries; every
`en.json` key under `workflows.*`, `flow.*`, `flow-*`, `workflow-timeline.*`, `workflow-weights.*`,
`audit.*` and the three quiz prefixes has a Dutch counterpart. No em-dashes in either language.
The Dutch is a rewrite rather than a gloss, which is the house standard.

1. **Where:** `workflows.plan-based.2`, last sentence
   **Problem:** the Dutch is truer and the English is the odd one out. NL: "De workflow **zet** jou
   terug in het ontwerp" (present). EN: "The workflow **put** you back in the design" (past), inside
   a paragraph that is otherwise present tense. `quiz.plan-mode-interview.explanation` in English
   also uses the present ("the workflow puts you back in the design"), so the unit prose disagrees
   with its own quiz.
   **Fix:** rewrite the English: "The workflow puts you back in the design."

2. **Where:** `nl.json` `workflows.pick-per-task.2`
   **Problem:** "en wat mee schuift is of er iets op schijf achterblijft". `meeschuiven` is a
   separable verb; in this relative clause the verb is final and is written as one word.
   **Fix:** "en wat meeschuift is of er iets op schijf achterblijft".

3. **Where:** `nl.json` `workflows.pick-per-task.1`
   **Problem:** "En een audit is over elk van **hen** de moeite waard." `hen` is the personal
   pronoun for people; the antecedent is four workflows.
   **Fix:** "En een audit is over elk daarvan de moeite waard."

4. **Where:** `nl.json` `workflows.spec-driven.3`
   **Problem:** not a defect, a signal. "Je schrijft ze ook niet van nul" is clearer than the
   English "You do not write these cold either", which is the drift the repo's policy says to
   resolve in the Dutch's favour.
   **Fix:** already carried in Readability §2; the English follows the Dutch here.

Every fix above that touches prose needs its Dutch sibling in the same change: `lead.2`,
`naive.1`, `naive.2`, `spec-driven.1`, `spec-driven.3`, `audit-driven.1`, `audit-driven.4`,
`plan-based.2`, `pick-per-task.3`, `pick-per-task.4`, plus the two figure descriptions in both
bundles.

---

## Verdict

**needs-work, and close to excellent.** This unit would already sit beside good technical
courseware: the ordering is an argument rather than a taxonomy, it points at step 1 instead of
re-teaching it, `AuditExample` shows a format that most writing about audits only describes, and
the quiz asks a student to choose rather than to recall. What keeps it off the top shelf is that
its central promise and its central measurement disagree. `lead.2` tells the reader that moving
down the list buys less re-reading; `WorkflowWeights` draws audit-driven re-reading as much as
naive, deliberately, and `pick-per-task.2` says so in words 900 words later. A reader who takes the
lead at face value learns the wrong trade and has it corrected at the end without ever being told
they were misled. Beside that sits one claim the repository itself falsifies (an audit "short
enough to read in one sitting", pointing at an 8,225-word `audit.md`), two figure descriptions that
say the opposite of the paragraph above them, and a naive section that redefines vibe coding
instead of pointing at the unit that owns it. Everything else is polish.

**Priority order:**

1. `lead.2`: drop the monotone re-reading claim (Truthfulness §1). EN + NL.
2. `audit-driven.4`: cut the "one sitting" sentence, end on the row you stop carrying
   (Truthfulness §2). EN + NL.
3. `flow-naive.description` and `flow-plan.description`: stop claiming naive has no way back; make
   the teal read as timing (Truthfulness §4, Imagery §1). EN + NL.
4. `workflow-weights.description`: "almost all reading" is half the bar (Truthfulness §3). EN + NL.
5. `naive.1`: point at `engineering` instead of redefining vibe coding (Progression §1). EN + NL.
6. `naive.2`: say "nudging is not restructuring" in the prose, not only in the quiz
   (Readability §1). EN + NL.
7. `pick-per-task.4`: cut the sentence that announces the timeline (AI tells §3). EN + NL.
8. `pick-per-task.3` and `plan-based.2`: break two of the seven threes; cut "No method is perfect"
   (AI tells §1, §2). EN + NL.
9. `plan-based.2`: "puts", not "put" (EN/NL §1). Two Dutch grammar fixes (EN/NL §2, §3).
10. `spec-driven.1` "half" → "part"; `spec-driven.3` "cold" → "from scratch"; `audit-driven.1`
    "under scrutiny" → "you point it at"; `naive.3` "one per feature" (Readability §2-4,
    Progression §2). EN + NL.
11. Three stale docblocks in `FlowDiagram.tsx`, `WorkflowWeights.tsx`, `WorkflowTimeline.tsx`, and
    the `Plan-based` / `Plan/naive` mismatch in `step2/CLAUDE.md` (Truthfulness §6).
12. Owner's call: the audit `TaskCard` (Tasks §1), and the `enablement` seam already booked as
    audit item 40.
