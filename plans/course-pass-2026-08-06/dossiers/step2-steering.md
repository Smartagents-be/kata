# Dossier: step2 / `steering`

**Files read:** `front/src/steps/step2/CLAUDE.md`, `units/steering.html` (1,098 words, 5 sections,
22 prose keys), `index.tsx`, `locales/nl.json` + `en.json`, `TwoWindows.tsx`, `LoopInWindow.tsx`,
`WorktreeEach.tsx`, `deck.tsx` (3 slides), `audit.md` (rows 15, 22, 23, 38, 48 and the two summary
sections), `.claude/skills/lesson-writing/SKILL.md`, `copilot-specific.md`,
`kata/step2/java/src/main/java/.../domain/LateFeePolicy.java`.

**Known already, not claimed as discoveries:** audit item 38 (nothing the student does, fix = a
quiz), item 15 (two quizzes in ten units), item 22 (five units name reading as the bottleneck and
none teaches it), item 23 (when *not* to use an agent is documented as deliberately absent from this
unit), item 48 (`LoopInWindow` and `WorktreeEach` off the deck on purpose). Where a finding below
overlaps one of those I say so.

---

## 1. AI tells

The prose here is genuinely written, not generated, and it is among the best in step 2. "You find
out at review, if you find out." "It says it sees the problem now. It said that last time." "The
agents got faster. Your reading did not." Those are house voice, and none of the list in the brief
fires across the unit: no "not just X but Y", no announced opener, no summary paragraph, no
significance-gesturing close, and `grep '—\|–'` returns nothing in either language. The triple in
`mid-flight.1` and the one in `going-nowhere.2` are concrete clauses, not adjective-lists, and four
of them across 1,098 words is not a rhythm. One real tell:

1. **Where:** `steering.stop-at-the-gap.3` (`units/steering.html:132`)
   **Problem:** "Three parts, and the third is the one that matters." This is the count
   announcement `lesson-writing` bans by name ("Two things matter here", "There are three reasons"),
   and here it is worse than usual because the ordinal does not survive contact with the `<pre>`
   above it. The block's order is *stop*, *write it into `gaps.md`*, *ask me*. A reader who counts
   into the block lands on "ask me" and then reads a sentence telling them the third part is
   stopping. The step's own notes say the section "turns on its third part and nothing else", which
   is the intent; the sentence delivering it points at the wrong part.
   **Fix:** drop the count and name the part. Replacement, English:
   > Stopping is the part that matters. Writing the gap down is bookkeeping. An agent that logs its
   > assumptions in a file and then implements them anyway has told you what it guessed, at the
   > bottom of a diff, after the work is built on top of it.

   Dutch, same key:
   > Stoppen is wat telt. De opening opschrijven is boekhouding. Een agent die zijn aannames in een
   > bestand noteert en ze daarna toch implementeert, heeft je verteld wat hij gokte, onderaan een
   > diff, nadat het werk erbovenop gebouwd is.

   This keeps the recorded constraint intact ("do not soften the stop into flag it and continue")
   and loses only the arithmetic.

---

## 2. Truthfulness

1. **Where:** `units/steering.html:91-92` (the `<pre>` under `A worktree each`)
   **Problem:** the two commands do not work. Verified on git 2.50.1:

   ```
   $ git worktree add ../wt-statement feat/statement
   fatal: invalid reference: feat/statement
   ```

   `git worktree add <path> <branch>` checks out an **existing** branch. `feat/statement` and
   `feat/native` are branches the student is starting, so both lines error out. This is the one
   place in the unit a reader copies text into a terminal, and it fails on the first line.
   **Fix:**
   ```
   git worktree add -b feat/statement ../kata-statement
   git worktree add -b feat/native ../kata-native
   ```
   `WorktreeEach` names the same two folders and branches as literals, so the figure needs no
   change and the `SkillTree` rule (drawing and `<pre>` name the same thing) still holds.
   **Ripple, outside this unit:** `units/goals.html:108` carries the identical shape
   (`git worktree add ../kata-complexity goal/complexity`) and has the same defect. Fix both in one
   change or the course teaches a broken command in two places.

2. **Where:** `steering.interrupt-or-go-back.2`
   **Problem:** "You paid for the mistake once when it happened. Now you pay for it again, every
   message." Step 1 already priced this: `harness.caching.1` says the re-sent prefix is "recognised
   and billed at roughly a tenth", and `session.sessions-where-money.2` says adding to a session is
   cheap for exactly that reason. A student who read step 1 will notice that the wrong file sits in
   a stable prefix, which is the cached part, so the bill is the weakest of the two costs this
   paragraph could name. The strong one, the room it takes in every remaining turn, is stated in the
   first sentence and then dropped in favour of money. The coin icon promises a tokens argument that
   step 1 has already discounted.
   **Fix:** keep the coin, keep the first half, and let the paragraph land on the window rather than
   on the bill:
   > It also keeps everything. The file it should not have opened is still sitting in the window, in
   > full. Your correction sits underneath it. From here on the agent carries the wrong turn and the
   > fix together, and re-sends both on every turn for the rest of the session
   > <svg data-icon="coin"></svg> The cache makes that cheap. It does not make it small: every turn
   > you have left is read against a file you did not want opened.

   Dutch (`steering.interrupt-or-go-back.2`), last two sentences:
   > De cache maakt dat goedkoop. Ze maakt het niet kleiner: elke beurt die je nog hebt, wordt
   > gelezen tegen een bestand dat je niet open wilde hebben.

   This is also what the step's own notes ask for: `mid-flight` "must not grow the window argument"
   because "what an interrupt leaves behind is the section after it". This is that section, and it
   currently makes the window point in one clause and the money point in three.

3. **Where:** `steering.mid-flight.1`, "Escape stops it where it stands"
   **Problem:** the only keystroke in the course, and step 2 carries no `data-assistant` variants,
   so the sentence is shown to a Copilot CLI student too. `step2/CLAUDE.md` justifies it on the
   grounds that "stopping a run is Escape in both assistants the course is written for", but
   `copilot-specific.md` does not carry that fact: its "What is verified" list covers billing, the
   instructions file, `/context`, compaction, MCP, plan mode and the slash-command list, and says
   outright that "step 2 has not been adapted". I cannot verify the Copilot half from this
   repository, and it is exactly the class of claim the brief says to flag rather than smooth over.
   **Fix:** verify it against the Copilot CLI reference and add one line to `copilot-specific.md`'s
   verified list (cheapest, keeps the sentence). If it turns out to be Ctrl+C there, the sentence
   becomes the step's first assistant pair rather than a rewrite.

Checked and correct: `LateFeePolicy` is a real class in `kata/step2/java` (`domain/LateFeePolicy.java`),
and it is exactly the "one pass that decides the daily rate, the grace period, a renewal surcharge,
a tier discount and a per-media cap" the workshop hardens, so quoting it in
`interrupt-or-go-back.1` is grounded rather than invented. The `stop-at-the-gap.1` examples land
too: the fee is computed in cents with no currency named anywhere, and `MemberTier.STANDARD` gets
`grace = 0` by falling through an else. `/steps/step1/session` is a real route. No em-dashes, EN or
NL. Every `data-i18n` key resolves.

---

## 3. Progression

1. **Where:** `steering.stop-at-the-gap.2` and the `<pre>` after it
   **Problem:** the section tells the student to "make the rule standing, and put it where it
   arrives before your first message", then prints a markdown `## Gaps` section, and never names
   `CLAUDE.md` or points at `setup`, which is two units earlier and owns that file. The step's own
   notes claim otherwise: "The rule belongs in `CLAUDE.md` rather than a prompt, and the unit says
   so." It does not say so. The reader is left to infer the destination from the shape of a code
   block. This is also the seam where the unit changes register without marking it: four sections
   are things you do with a run in flight, and this fifth one is a file you edit once, before any
   run. `lesson-writing` is explicit on both counts ("Concrete before abstract. Name a real file",
   "Point at another unit rather than teaching it twice").
   **Fix:** one sentence, no new argument, no second description of what `CLAUDE.md` is:
   > That is not a prompting mistake you can fix per request, because you do not know where the gaps
   > are. If you did, they would not be gaps. So make the rule standing, in the
   > <a href="/steps/step2/setup">CLAUDE.md the setup lesson gave you</a>, where it arrives before
   > your first message.

   Dutch:
   > Zo'n fout los je niet per vraag op, want je weet niet waar de gaten zitten. Wist je dat wel, dan
   > waren het er geen. Maak de regel dus staand, in de
   > <a href="/steps/step2/setup">CLAUDE.md die de setup-unit je gaf</a>, waar hij binnenkomt voor
   > jouw eerste bericht.

2. **Where:** `steering.interrupt-or-go-back.heading`
   **Problem:** the heading names a move the section never makes. Its two moves are "type the
   correction as a new message" and "go back and edit the message", and neither is an interrupt.
   Interrupting is `Mid-flight`'s, one screen up, and that section owns the word (Escape, what is on
   disk, what the stop costs). So the reader meets "Interrupt" twice meaning two different things,
   and the section's actual contrast, adding to the pile against taking the wrong turn out of it, is
   in the last paragraph rather than in the heading.
   **Fix:** `Correct, or go back`. It is a plain label, it matches `interrupt-or-go-back.4`'s own
   words, and it leaves `Mid-flight` sole owner of interrupting. **Cost, stated because it is not
   free:** the slug changes, so five keys rename in the HTML and five in `nl.json`
   (`correct-or-go-back.1..5`), and the `TwoWindows` placement note in `step2/CLAUDE.md` names the
   section by title. The deck keys (`deck.steering.rewind.*`) are unaffected. If that is judged too
   much churn for the gain, say so in the notes rather than leaving the collision undocumented.

3. **Where:** `steering.mid-flight.3` against `steering.going-nowhere.2`
   **Problem:** "You lose everything the run worked out" is stated absolutely, and two sections
   later the same move is taught as "Carry across the one thing the round produced". The forward
   pointer ("There is a section on that below") tells the reader a section is coming but not that it
   will qualify the loss. Low severity, and leaving it is defensible: the pointer does most of the
   work and the paragraph is documented as deliberately thin.
   **Fix, if wanted:** "You lose everything the run worked out except what you carry out by hand,
   which is why you reach for it last" is one clause and no new argument. I would not spend more
   than that on it.

What works: the unit opens cold on `Mid-flight` with no lead, which reads well and is documented;
`Mid-flight` genuinely sorts the three moves by where the agent is when you catch it; `When it is
going nowhere` sits directly after the rewinding section and rules rewinding out by name, which is
the sequencing the notes claim for it and it does land. A reader finishes knowing five moves and
when each applies.

---

## 4. Readability

Two paragraphs break the house rule ("keep paragraphs to three or four sentences") and both are in
the same section, which is why that section reads heaviest.

1. **Where:** `steering.going-nowhere.1` (7 sentences, 100 words)
   **Problem:** it carries two things: the scene (right file, same failure, the fix that undoes the
   last one) and the mechanism (the failed attempts are now the strongest pattern in the window).
   The mechanism is the section's entire claim and it arrives in the sixth sentence, inside a
   comma-chained one.
   **Fix:** split after the scene, so the mechanism gets its own paragraph and its own closer.
   > Another kind of run does not go the wrong way. The agent is in the right file, the test fails
   > the way it failed before, and the fix it just wrote undoes the one before it. It says it sees
   > the problem now. It said that last time.
   >
   > Nothing here is wrong enough to correct, so you sit through four more rounds. Every failed
   > attempt is still in the window. On that file they are the strongest pattern the model has to go
   > on, so it writes another one. The loop is in the window.

   Dutch splits at the same place (`going-nowhere.1` and a new `going-nowhere.2`, renumbering the
   existing `.2` to `.3` in the HTML and both bundles).

2. **Where:** `steering.going-nowhere.2`, second sentence chain
   **Problem:** "Carry across the one thing the round produced, usually the error and the approach
   that does not work, and start the next session with that, the seam <a>step 1's unit on the
   session</a> tells you to pick yourself." Four clauses, an appositive, and a link landing on a
   dangling apposition. Read out loud it runs out of breath, which is the skill's own test.
   **Fix:**
   > Carry across the one thing the round produced, usually the error and the approach that does not
   > work. That is the seam <a href="/steps/step1/session">step 1's unit on the session</a> tells you
   > to pick yourself.

   Dutch:
   > Neem het ene ding mee dat de ronde wel opleverde, meestal de foutmelding en de aanpak die niet
   > werkt. Dat is de naad die <a href="/steps/step1/session">de unit over de sessie in stap 1</a> je
   > zelf laat kiezen.

One observation rather than a finding: the five sections weigh 201, 257, 202, 183 and 255 words.
That is flat, and with no lead the unit reads as five equally weighted moves with no hierarchy.
Finding 3.1 is the cheapest thing that gives it a shape, because it marks the one section that is
not about a run in flight.

---

## 5. Imagery

The three drawings are strong and I would not touch two of them. `TwoWindows` and `LoopInWindow`
carry what prose cannot: what is *left in the window* after each move, and five copies of one turn
against four different ones. Both pass the bar comfortably, and the "dropped turns are not drawn"
decision is right, an emptiness is the argument.

1. **Where:** `WorktreeEach.tsx`, under `A worktree each`
   **Problem:** the borderline one. Its three claims are the two folders (the `<pre>` above names
   them), the shared history (`worktree-each.1` says it in words) and the absence of a line between
   the frames (`worktree-each.2` says "neither can reach the other's files" and the figure's own
   note repeats that sentence almost verbatim). By the repo's own bar, "a picture of a claim the
   paragraph already makes is the thing to cut", it is the weakest figure in the unit. It is not a
   cut: it is the only spatial thing in the section and the reader does get the shape faster from it.
   **Fix, to make it earn its place rather than illustrate:** draw what is *not* shared, which is
   the half neither prose nor drawing currently carries. Same two frames, same one history box, but
   put an "uncommitted, dirty" chip inside each frame, on the same row, teal on one and muted on the
   other. What the reader takes from it is the thing that actually bites: two agents share every
   commit that already exists and share nothing that is in flight, which is why `mvn test` in one
   folder is honest while a shared checkout is not. That is a claim the paragraph makes only by
   negation.

2. **Where:** `steering.worktree-each.1`, "Steering three is not three times the work, because most
   of the waiting overlaps"
   **Problem:** a measured claim the reader takes entirely on trust, and it is the sentence the whole
   section rests on. A drawing would settle it: three lanes over one hour, each cut into change /
   wait / read, offset so the waits overlap and your own read blocks stack into one continuous band.
   **Recommendation: do not draw it.** `LoopsPerHour` in `enablement` owns the hour cut into
   change/wait/look and `AgentsAtOnce` in `parallel` owns how many agents you have running; this
   figure would borrow both vocabularies and collapse into one of them, which the step's notes rule
   out by name for exactly this reason. Recorded here so the next pass does not rediscover it and
   draw it. No new figure earns its place in this unit.

---

## 6. Supporting tasks

1. **Where:** the unit as a whole (audit item 38 records the absence; what follows is the proposal
   it does not carry)
   **Problem:** 1,098 words, the second longest unit in the course, and the reader is asked to do
   nothing. Every move in it is physical: a keystroke, a queued sentence, a rewind, a `git` command,
   a file. This is the unit in step 2 where doing beats reading by the widest margin, and the only
   thing on the page that asks for anything is a `data-audience="self"` aside that half the readers
   never see.
   **Fix:** a `TaskCard` under an `<h2 data-i18n="ui:quiz.title">Test yourself</h2>`, ungraded,
   ticked to `kata.step2.steer`, block `steer-a-run`, on the precedent `WhereWouldItGo` set in
   `engineering`. Five moves, all against `kata/step2/java`, none of them touching a prohibited
   exercise (nothing here hardens the module, implements `forTier` or builds a native image):
   1. Ask for something under-specified in `kata/step2/java` and press Escape while it is still
      thinking. Run `git status`. Nothing should have moved.
   2. Ask again, and this time type the clarification while it works. Note which turn it lands on.
   3. Send a deliberately vague request, let it start, then go back and edit the request rather than
      correcting it. Ask afterwards what it has read: the file from the first attempt is not in the
      answer. *(This is `interrupt-or-go-back.5` today. Folding the aside into the card is a change
      to a documented decision, one of the step's two self asides, so it needs a line in
      `step2/CLAUDE.md` saying the aside became a move. The alternative is keeping both, and then
      the card says it twice.)*
   4. Put the `## Gaps` rule in `kata/step2/java/CLAUDE.md`, then ask for the late fee to be
      returned in euros. `LateFeePolicy` works in cents and names no currency anywhere. Check it
      stops and writes the question down instead of picking one.
   5. `git worktree add -b feat/scratch ../kata-scratch`, run a second agent in it, then
      `git worktree remove ../kata-scratch`. Two folders, one history.

   Move 4 is the one worth having: it is the only place in the course where the student sees an
   agent decline to guess, and the gap is real in the shipped code.

---

## 7. Quiz

1. **Where:** the unit has none (audit items 15 and 38 both ask for three questions here)
   **Problem:** the unit is a set of choices between moves that look alike, which is the exact shape
   `workflows`'s quiz was reinstated for ("a question can ask which workflow a situation wants"). The
   reasoning that reversed the decision there applies here with more force: the wrong answers are
   things practitioners genuinely do.
   **Fix:** three questions in `quiz.ts` beside `workflowsQuiz` and `spendingQuiz`, as
   `steeringQuiz`, attached in `index.tsx`. Situations, not definitions, one per section that has
   something to get wrong. `A worktree each` gets none: its argument is a cost, not a choice, the
   same reasoning that leaves spec-driven out of the `workflows` quiz.

   **Q1 (`wrong-turn-nothing-written`).** Your request was ambiguous and the agent has opened the
   wrong file. It has not written anything yet. What do you do?
   - *Go back to your request, rewrite it, and let it start again.* **Correct.** The work so far is
     worth nothing and the wrong turn leaves with the message.
   - *Send a correction naming the right file.* Believable, and it is what most people do. It works,
     and the wrong file stays in the window for the rest of the session.
   - *Escape, then clear the session and start over.* The heaviest move, spent on the cheapest
     problem.
   - *Queue the correction so it picks it up on the next turn.* It keeps building on the wrong file
     while your sentence waits.

   **Q2 (`fifth-fix-same-shape`).** Four fixes in, the test fails the way it failed the first time,
   and the fix it just wrote undoes the one before it. What now?
   - *Stop, clear, and start again carrying the error and the approach that failed.* **Correct.**
   - *Go back to the message that started the run and rewrite it.* The plausible one, because
     rewinding was the answer in the section before. The message was fine, so you rewind into the
     same run.
   - *Tell it the last four attempts did not work and to try something else.* That adds a fifth
     failure to the four already shaping its next answer.
   - *Paste the failing test output in and let it keep going.* More context on top of the loop, in
     the window the loop lives in.

   **Q3 (`logged-and-carried-on`).** Your standing rule tells the agent to write undecided things
   into `gaps.md`. It comes back with a diff and three entries in `gaps.md`. What went wrong?
   - *It should have stopped and asked. The diff is built on the guesses.* **Correct.**
   - *Nothing. It followed the rule and you have the list.* The one a reader genuinely believes,
     which is why the question exists.
   - *The rule belongs in the prompt rather than in `CLAUDE.md`.* You cannot name a gap you do not
     know about yet.
   - *Three entries is too many to review in one pass.* The count is the good part.

   Explanations two sentences each, per the house shape in `quiz.ts`. Adding a registry quiz to a
   unit that also gains the task card of finding 6.1 is the `showsExerciseHeading` case: the HTML
   carries the `ui:quiz.title` heading over the card and `QuizPanel` arrives under it.

---

## 8. EN/NL parity

Parity is complete on substance: 22 prose keys in the HTML, 22 Dutch entries, no orphans in either
direction, no em-dashes, and the Dutch is written rather than translated (it uses "dagtaak",
"ontspoort", "vervuild venster", none of which is an English shape). Two things to fix, one of them
the good kind.

1. **Where:** `steering.interrupt-or-go-back.5` (the self aside), HTML against `nl.json`
   **Problem:** the English aside holds bare text; the Dutch entry wraps its body in `<p>`. Seven of
   the repo's nine asides wrap in both languages (`prompt.plan-mode.4`, `session.window-not-memory.4`,
   `tools.list-itself-window.4`, `setup.your-own-claude-md.2`, `workshop.collect.2`, and the rest),
   so the two languages render this one aside with different margins.
   **Fix:** wrap the English body in `<p>`, matching `prompt.plan-mode.4`, which is the same
   self-aside shape. One edit, HTML only.

2. **Where:** `steering.stop-at-the-gap.2`, English against Dutch
   **Problem:** the Dutch is the better sentence and the English is the one to rewrite, which is the
   repo's own rule. NL: "Dat los je niet per vraag op, want je weet niet waar de openingen zitten."
   EN: "That is not a prompting mistake you can fix per request, because you do not know where the
   gaps are." The English routes the claim through a noun phrase ("a prompting mistake you can fix
   per request") that the Dutch does not need.
   **Fix:** "You cannot fix that per request, because you do not know where the gaps are." Folds
   into the rewrite proposed in finding 3.1, which touches the same key.

Not a finding, an author's call: the Dutch renders "gap" as "opening" throughout this section
("waar de openingen zitten", "Laat hem stoppen bij een opening"). "Gat" reads more naturally to me
for a hole in what was decided, but this is a native speaker's judgement and the file is
`gaps.md` in both languages either way. Flagging it only so the author can confirm it is intended.

---

## Extra: one deck contradiction

**Where:** `deck.steering.divider.2` in `locales/en.json` / `nl.json`
**Problem:** the divider's second point is "Rewinding beats correcting" / "Terugspoelen verslaat
corrigeren". The unit refuses exactly that claim: `interrupt-or-go-back.4` says to choose by what
the work so far is worth, and to send a new message when the work is good. The very next steering
slide's own note says "Choose by what the work so far is worth", so the deck contradicts itself two
slides apart, and the room gets the unconditional version first.
**Fix:** "Correcting adds. Rewinding removes." / "Corrigeren voegt toe. Terugspoelen haalt weg."

---

## Verdict

This is one of the better-written units in the course and the pass should mostly leave the prose
alone. It has a real argument, the five moves genuinely sort by where the agent is when you catch
it, the three figures each carry something the sentences do not, and the Dutch is a rewrite rather
than a translation. What keeps it off the top shelf is not the writing. It is that the one command
the student is asked to type does not run, that 1,098 words go by without the reader being asked to
do or answer anything in a unit whose every move is physical, and that the section carrying the
unit's most useful habit never names the file the habit goes in. The count-announcing sentence in
`stop-at-the-gap.3` is the only place the prose slips, and it slips into a sentence whose ordinal is
also wrong against the block above it.

Priority order:

1. Fix the two `git worktree add` lines (`-b`), and the identical line in `goals.html`. It is a
   broken command in the reader's hands.
2. Rewrite `stop-at-the-gap.3` to drop the count and name the part, EN and NL.
3. Add the three-question quiz (already an audit row, and the machinery exists).
4. Name `CLAUDE.md` and link `setup` in `stop-at-the-gap.2`, which also marks the unit's one change
   of register.
5. Land `interrupt-or-go-back.2` on the window rather than the bill, so it stops contradicting step
   1's caching lesson.
6. Add the `TaskCard`, folding the self aside into move 3 and recording that in `step2/CLAUDE.md`.
7. Split `going-nowhere.1`, unchain the sentence in `going-nowhere.2`, wrap the English aside in
   `<p>`, and fix `deck.steering.divider.2`.
8. Optional and argued both ways: rename the `Interrupt, or go back` heading; give `WorktreeEach`
   the uncommitted-work chip; verify Escape for Copilot CLI and record it in `copilot-specific.md`.

**Counts note for the summary:** the `restructure` count below is the two paragraph-level rewrites
under Readability. No unit-level restructure is needed here: the five sections are in the right
order and every proposal to move one of them collides with a decision the step's `CLAUDE.md` argues
for at length.
