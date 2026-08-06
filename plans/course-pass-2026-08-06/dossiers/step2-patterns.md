# step2 / `patterns` — "Solving repeating patterns"

**Read:** BRIEF.md · `front/src/steps/step2/CLAUDE.md` · `units/patterns.html` · `index.tsx` ·
`locales/nl.json` + `en.json` (`patterns.*`, `script-runs.*`, `deck.patterns.*`) · `ScriptRuns.tsx` ·
`audit.md` rows 11, 15, 36, 39 and both summaries · `.claude/skills/lesson-writing/SKILL.md` ·
`.claude/skills/quiz-writing/SKILL.md` · `copilot-specific.md` (skills section).

**Shape as measured:** 310 prose words in 6 paragraphs across 2 headings, plus two `<pre>` blocks
(audit's 423 counts the code). One figure, `ScriptRuns`, closing the unit. No quiz, no task, no
board. Three deck slides (`divider`, one `statement`, one `figure`).

Known and already recorded in `audit.md`, so not claimed here as discoveries: no quiz (row 39 and
the cadence summary), nothing the student does (row 39), both seams bare and no unit named anywhere
in it (rows 36 and 39, and the sequence summary). Everything below is either new or is a specific
piece of prose those rows do not name.

One thing worth saying up front because it is a positive: this is the step 2 unit that survives the
"step 2 is not written for two assistants" decision best. It names no path, no product and no
command, and `copilot-specific.md` confirms Copilot CLI has skills too, so a Copilot reader is told
nothing untrue here. That is luck rather than design, but it holds.

## 1. AI tells

The prose is genuinely human and mostly good. Short declaratives, a fragment ("Your agent does."),
uneven paragraphs, no tricolon rhythm, no "it's not just X", no summary paragraph, no closer
gesturing at significance. Two sentences fail.

1. **Where:** `patterns.skill-iteration.2`, third sentence ("That is where iteration comes in.");
   Dutch `nl.json:301` ("Daar komt iteratie binnen.")
   **Problem:** A hinge sentence that announces the paragraph's subject and adds no claim. The `<h2>`
   two lines above it already reads **Skill iteration**, so the sentence says the heading again in
   longer words. This is the "openers that announce" family from the brief's list, and it is what
   `lesson-writing` check 7 ("which sentence only says the previous one again? Cut that one") and
   check 8 exist to catch. It is also the only place in the unit where a sentence carries no
   information.
   **Fix:** Cut it outright. The paragraph reads better without it, because "you find yourself
   repairing the same kind of sentence every time" runs straight into "Fix the output". Replacement
   for the whole key (this also carries finding 6, so it is one edit):

   > The answers do get better. They also come back slightly off, and you find yourself repairing the
   > same kind of sentence every time. Fix the output, by hand or with the agent, then hand it both
   > versions and ask what the skill failed to say. Paste them into the prompt, or point it at the
   > `git diff`. Write the answer back into the skill `<svg data-icon="pattern"></svg>` Do that a few
   > rounds and it starts sounding like you. Here is that writing skill one pass later, one rule
   > longer.

   Dutch:

   > De antwoorden worden er echt beter van. Ze komen er ook net naast uit, en je zit elke keer
   > hetzelfde soort zin recht te trekken. Verbeter de output, met de hand of met je agent, geef hem
   > daarna allebei de versies en vraag wat de skill niet gezegd heeft. Plak ze in je prompt, of wijs
   > hem de `git diff` aan. Schrijf dat antwoord terug in de skill `<svg data-icon=\"pattern\"></svg>`
   > Doe dat een paar rondes en ze begint als jou te klinken. Hier staat diezelfde schrijfskill een
   > pass later, één regel langer.

2. **Where:** `patterns.scripts.1`, last sentence ("Think of things like scaffolding a domain,
   printing a one-pager, cleaning a database before a demo."); Dutch `nl.json:304`.
   **Problem:** Two defects in one line. "Think of things like" is filler of the kind
   `lesson-writing` bans under "Say it straight", and the sentence is a list of three where one item
   ("printing a one-pager": a one-pager of what?) is not concrete enough to picture. The section's
   opening paragraph therefore ends on its weakest line, against the house rule "end on the sharpest
   sentence". The examples themselves are worth keeping: `audit.md` item 11 records that the cut
   `quality` unit's scaffolding idea survives *here* and nowhere else, so "scaffolding a domain" is
   load bearing.
   **Fix:** Move the examples inside the criterion they illustrate and end on the consequence:

   > You may not write much Bash or Python. Your agent does. So when a repetition has an expected end
   > result, scaffolding a domain or cleaning a database before a demo, a script is usually worth
   > writing `<svg data-icon="gem"></svg>` Then add a skill that calls it, or the agent will never
   > know it is there.

   Dutch:

   > Veel Bash of Python schrijf je zelf misschien niet. Je agent wel. Dus zodra een herhaling een
   > verwacht eindresultaat heeft, een domein scaffolden of een database opkuisen voor een demo, is
   > een script meestal de moeite `<svg data-icon=\"gem\"></svg>` Voeg er dan een skill aan toe die
   > het aanroept, anders weet je agent nooit dat het bestaat.

   This also repairs "makes your agent aware of its existence", which is a five-word way of saying
   "knows it is there", and it keeps the criterion (expected end result) as the sentence's subject
   rather than trailing behind who writes Bash.

**Not a finding, checked and rejected:** "You may not write much Bash or Python" uses a modal, which
`lesson-writing` says does not appear in these units. It does: `may` appears eight times across
step 1 and step 2 units, including `steering.html:76`. The rule in the skill file is stale, the
sentence is fine, and changing it would be my taste rather than a defect.

## 2. Truthfulness

Every checkable claim in the unit holds. The two `<pre>` blocks are honest: they reproduce the real
frontmatter shape (`name`, `description`, `---`) and both rules quoted are genuinely in
`.claude/skills/lesson-writing/SKILL.md` ("No em-dashes. Ever." at line 13, "Do not announce the
count." at line 74). They differ by exactly one rule, as the step's `CLAUDE.md` requires. No
em-dashes or en-dashes anywhere in the unit or its Dutch. All eight `data-i18n` keys resolve.

3. **Where:** `patterns.skill-iteration.3`, the `<svg data-icon="coin">` after "The corrections stop
   coming back"; Dutch the same.
   **Problem:** Step 0's legend defines the coin as "A cost-saving measure: the same result for fewer
   tokens" (`step0/locales/en.json:21`), and the sentence carrying it makes no cost claim at all. It
   claims a quality outcome. The other coin in the unit, on `scripts.2`, sits on a sentence that
   literally says "it spends neither tokens nor time", which is what the icon is for. So the unit
   uses the same marker twice, once earned and once decorative, which teaches a student the legend
   is loose. There is a real cost claim underneath the sentence (you stop paying for the repair
   turn), but it is unstated.
   **Fix:** Two options, and the first is cheaper and safer. Either drop the icon from that sentence
   (the step's own `CLAUDE.md` records this paragraph as "the payoff and names two things", so a
   third clause about tokens is not wanted), or earn it: "The corrections stop coming back, and so
   does the turn you spent fixing them `<svg data-icon="coin"></svg>`". Recommend dropping it.

## 3. Progression

The unit builds inside each section. What it does not do is make the reader do the one comparison
the whole first section rests on.

4. **Where:** `patterns.skill-iteration.2` → the second `<pre>` → `patterns.skill-iteration.3`.
   **Problem:** The section's central demonstration is a diff. The step's `CLAUDE.md` says so
   explicitly: "Its two `<pre>` blocks are one skill twice and differ by exactly one rule, so the
   reader diffs them by eye." Nothing on the page asks them to. The only pointer is the trailing
   clause "which is what the writing skill looks like one pass later", which tells the reader the
   block below is a later version and not that anything in particular has been added. The two blocks
   are eleven lines each and identical for the first ten. A reader scrolling a page of code will
   read the second as a repeat and take nothing from it, at which point the section's claim (a skill
   gets better by having the agent name what it failed to say) is asserted with nothing under it.
   The added rule is "Do not announce the count", which is exactly the rule a reader would not think
   to look for.
   **Fix:** Two words, already folded into finding 1: end `skill-iteration.2` on "Here is that
   writing skill one pass later, one rule longer." That names the size of the difference without
   naming the rule, so the diff stays the reader's to make. Dutch: "één regel langer."

5. **Where:** the unit as a whole, and its `setup` seam (`audit.md` rows 36 and 39).
   **Problem:** Confirmed as recorded, with one detail those rows do not carry. The unit teaches
   skill *iteration* and never says where a skill file lives or what its `description` is for, both
   of which `setup` owns two units earlier. That is the right division of labour, but it means the
   `<pre>` block's `description:` line is the second time a student meets that field and the first
   time nobody explains why it is there, in a unit that names no other unit at all. The clause the
   audit already asks for (naming `setup`) is what closes this, and it should hang off
   `skill-iteration.1` rather than the lead, because that is the sentence the frontmatter sits under.
   **Fix:** As already proposed in row 39, one clause. For instance `skill-iteration.1` ending
   "…and the correction you were tired of typing, in the file shape
   [the setup unit](/steps/step2/setup) drew." Placement matters more than wording: it has to be
   above the first `<pre>`, or the reader has already met the frontmatter unexplained.

## 4. Readability

No sentence in this unit is hard to parse and no heading misdescribes its section. Both headings are
plain labels, which is the shape `lesson-writing` asks for when the section is about a named thing.

6. **Where:** `patterns.skill-iteration.2`.
   **Problem:** Six sentences in one paragraph, against the house rule of three or four, and it
   carries two moves: the diagnosis (the answers come back off) and the procedure (repair, hand back
   both versions, paste or diff, write the answer in). It is the densest paragraph in the unit by
   some distance and sits between two code blocks, which is where a reader is least willing to work.
   **Fix:** Cutting "That is where iteration comes in." takes it to five and is probably enough,
   given the sentences are short and the procedure is genuinely one move. If it is still long after
   that, the split is after "…repairing the same kind of sentence every time.", which would need a
   new key and a renumber, so only do it if the first cut does not settle it.

## 5. Imagery

7. **Where:** `ScriptRuns.tsx`, at `data-figure="script-runs"`, the unit's only figure.
   **Problem:** It fails the repo's own bar. The step's `CLAUDE.md` says the drawing shows "the
   equality the section claims in words", and `ScriptRuns.tsx`'s own docblock says it "is what the
   `Scripts` section of `patterns` claims in words: same input, same output, no interpretation in
   between". That is the definition of the figure the brief says to cut: a picture of a claim the
   paragraph already makes. Worse, it measures nothing. Each card holds three bars whose widths are
   hand-picked constants (`PROSE` at lines 34-38) with no axis, no unit and no label, so a reader
   cannot say what varies between the three prose runs. Three grey bars of arbitrary length against
   three teal bars of arbitrary length is a texture, not evidence. Compare the step's other
   drawings, which all measure something a reader can name: `LoopsPerHour` measures an hour,
   `WorkflowWeights` cuts four equal bars into settle/run/read, `WindowSpend` measures money against
   a ceiling. This one is the odd figure out in a step where every other one earns its place.
   **Fix:** Do not cut it, and do not replace it. The teal row does carry something prose cannot,
   namely sameness seen at a glance, and it is also on a deck slide (`deck-step2-patterns-runs`).
   Make the muted row mean something by naming what the bars are. Three per card, labelled once on
   the leftmost card of each row, as the parts of the job the request asks for: for a database reset,
   `dropped`, `seeded`, `checked`. Then the top row reads "the same three steps came out a different
   size every time" and the bottom row reads "identical", which is a measurement rather than a
   texture, and the figure stops being the sentence above it in pictures. That is a change inside
   `ScriptRuns.tsx` plus three keys per language; it keeps the card sizes equal (the docblock's rule),
   keeps the row labelling as it is, and does not touch the clock or step-size vocabulary that
   `LoopsPerHour` and `IterationPaths` own.

8. **Ruled out on purpose, recorded so nobody proposes it.** The obvious second figure here is the
   crossover: retyping a correction on every turn against writing it once into a skill, cumulative
   cost on the y axis. It would measure the lead's claim ("the third time you type the same
   instruction") and it is the only quantity this unit implies. It must not be drawn. Step 2's
   `CLAUDE.md` records that the cost-of-a-line argument has exactly two sites, `setup.claude-md.2`
   and `setup.skills.5`, and closes with "Do not open a third site." A figure whose whole content is
   what a skill costs per turn is that third site, drawn.

## 6. Supporting tasks

The unit asks the reader for nothing, which `audit.md` row 39 records, and unlike `workflows`,
`enablement` and `parallel` it has no recorded reason for that. Those three are excused because a
card would be a smaller version of the workshop or would be answered better by the student's own
week. Neither excuse applies here: this unit teaches a two-step procedure (write a script, put a
skill in front of it) that takes ten minutes against a project the student already has open.

9. **Shape:** a `TaskCard`, ungraded, on the shape `evolution` and `engineering` already use
   (`<hr>`, `<h2 data-i18n="ui:quiz.title">`, then the card, with no prose between the rule and the
   card because the card's description carries the setting). Block `same-every-run`, ticked to
   `kata.step2.script`.
   **Description:** "Something you have typed at an agent more than twice this week. If nothing comes
   to mind, use the start-and-check for this step's own project."
   **Moves:**
   1. Name the repetition. `mvn spring-boot:run` in `kata/step2/java`, then
      `curl -s localhost:8080/api/loans/statement/STUDENT | jq` to see it answer, is one you have
      already typed.
   2. Ask the agent for the script. It picks the language, not you.
   3. Run it twice and compare the two outputs. Anything that differs is interpretation still left
      in the script.
   4. Write a skill beside it whose description says when to call it, in one line.
   5. Open a new session and ask for the job in your own words. If the agent finds the script, the
      description is doing its work.
   **Why this shape:** move 3 is `ScriptRuns`'s claim made testable, which is the one thing on this
   page a student can currently only agree with. Move 5 is the only place in the course where a
   skill's `description` is tested rather than described. It stays clear of the capstone: it asks
   for no tests, so it does not spend `workshop.flag.coverage.help`'s testing skill, and it touches
   no package, so it cannot break `mvn verify -Pgraded`.

## 7. Quiz

The unit should have one, and `audit.md` asks for three questions here. It is a good candidate for a
reason the audit does not state: unlike `steering`, which is mostly judgement, this unit contains a
sortable decision (a correction goes in a skill, a job with an expected end result goes in a script)
and one procedure with a wrong branch (what you do with the output you just repaired). Both have
distractors a student would genuinely pick.

10. Three questions, situations rather than definitions, in `spendingQuiz`/`workflowsQuiz` style,
    English text given here and Dutch to be written as a rewrite. Ids kebab-case and content-named.

    **`third-correction`** — "You have told the agent three times this week to stop putting a
    summary paragraph at the end of every file it touches. It fixes it each time, and the next file
    comes back with one. What has actually gone wrong?"
    - `no-home` **(correct)**: "The correction only lives in messages you retype, so nothing carries
      it to the next session."
    - `context-full`: "The window filled up, so the instruction was pushed out partway through."
    - `wrong-model`: "The tier is too small to hold an instruction that specific."
    - `prompt-wording`: "The instruction is worded loosely, so it has to be phrased more precisely."
    Explanation: "A correction you repeat is knowledge with no home yet. Written into a skill it is a
    file in the repository, so the next session starts with it."
    (`context-full` is the strong distractor: step 1 taught entropy and compaction, and this is
    exactly the symptom a student would map onto it.)

    **`skill-still-off`** — "Your commit-message skill works. The messages still come back wrong in
    the same small way, and you have just repaired one by hand. What do you do with the repair?"
    - `both-versions` **(correct)**: "Give the agent its version and yours, and ask what the skill
      failed to say."
    - `longer-prompt`: "Put the missing rule in your next prompt, where the agent is sure to read it."
    - `stricter-description`: "Tighten the skill's description so it fires more often."
    - `rewrite-skill`: "Rewrite the skill from scratch, since a rule producing the same mistake is
      the wrong rule."
    Explanation: "The repair is the rule the skill is missing, and the agent can name it from the two
    versions. Writing that answer back is the pass that makes the skill sound like you."

    **`script-or-skill`** — "Before every demo you clean the database, seed three members and start
    the service, and you explain the steps to the agent each time. It gets there, and each run leaves
    the data slightly different. What is worth writing?"
    - `script-and-skill` **(correct)**: "A script that does the steps, and a skill that calls it so
      the agent knows it exists."
    - `longer-skill`: "A skill with the steps written out, since the agent can run the commands."
    - `claude-md`: "A line in `CLAUDE.md` naming the steps, so it is read on every turn."
    - `plan-mode`: "A plan, so the agent works the steps out once and follows its own plan each run."
    Explanation: "An expected end result with no interpretation in between is a script. The skill
    beside it is only what makes the agent aware the script is there."
    (Deliberately no `hook` distractor: step 2's `CLAUDE.md` records that the word "hook" appears
    nowhere in this unit and that `setup` lost its forward pointer because of it. A distractor would
    put the word back and re-open that seam.)

    **Registry note:** if the task card in finding 9 also lands, the unit writes its own
    `<h2 data-i18n="ui:quiz.title">` above the card and `showsExerciseHeading` gives `QuizPanel`
    `heading={false}`, the way `step1/context` does. If only the quiz lands, the HTML gets no
    heading and `QuizPanel` writes its own, the way `workflows` and `goals` do.

## 8. EN/NL parity

All eight prose keys have a Dutch entry, and so do all four `script-runs.*` labels and all five
`deck.patterns.*` keys. The Dutch reads as Dutch rather than as translated English, which is the
standard this repo sets. Three drifts.

11. **Where:** `nl.json:305`, `patterns.scripts.2`.
    **Problem:** The English closes "so it spends neither tokens nor time on something you already
    know the answer to". The Dutch closes "dus kost het hem geen tokens en geen tijd meer" and drops
    the reason clause entirely. The dropped half is the argument: the saving is not that scripts are
    cheap, it is that you are paying an agent to re-derive something already settled. This is the one
    place in the unit where the **English is the truer version**, so it is the Dutch that moves.
    **Fix:** "…dus kost het hem geen tokens en geen tijd meer aan iets waar jij het antwoord al van
    kent `<svg data-icon=\"coin\"></svg>`."

12. **Where:** `en.json:8` `patterns.title` ("Solving repeating patterns") against `nl.json:7`
    ("Terugkerende patronen").
    **Problem:** The English title promises an answer and the Dutch names only the phenomenon. The
    title is what the sidebar, the pager and the deck's `divider` eyebrow all render, so the two
    audiences read a different promise on four surfaces.
    **Fix:** "Terugkerende patronen oplossen".

13. **Where:** `nl.json:298` (`patterns.lead.1`, "kennis zonder vaste plek") against `nl.json:493`
    (`deck.patterns.third-time.title`, "kennis zonder thuis").
    **Problem:** The slide is the unit's own sentence put on the projector, and Dutch renders the
    same phrase two ways, so a room reading the page and looking at the board sees two wordings of
    one line. English is consistent ("no home" in both).
    **Fix:** Pick one and use it twice. "kennis zonder thuis" is the closer match to the English and
    is the one on the slide, so change `patterns.lead.1` to "Het is kennis zonder thuis." Worth
    noting for the record: the "home" metaphor no longer lands on a heading, because the first `<h2>`
    read "Give it a home" before it was renamed to "Skill iteration" (step 2's `CLAUDE.md` records
    the rename). The payoff still arrives in `skill-iteration.3` ("a file in the repository rather
    than a habit in your head"), so this is a wording alignment and not a structural hole.

## Verdict

**needs-work**, and the writing itself is not the problem. Six paragraphs of real house voice, two
honest code blocks that carry the section's argument, no hype, no tricolon rhythm, no em-dash, and a
lead sentence ("A correction you repeat is not a prompt problem") that is one of the sharpest in
step 2. What is wrong is that the unit never converts any of it into work. It is 310 prose words
that state a two-step procedure and then close on a drawing which redraws the sentence above it, so a
reader can finish this page having done nothing but agree, and neither the page nor a tutor has any
way of knowing whether they can now tell a skill job from a script job. That is a bigger gap here
than in the other undrawn-and-untasked units, because unlike `steering` or `parallel` this unit
teaches something small, mechanical and immediately doable, and it is sitting two clicks from a Maven
project the student already has running. Everything else on the list is cheap: one dead sentence,
one filler closer, two words that turn the code blocks into a diff the reader actually makes, and a
figure that needs labels rather than replacement.

Priority order:

1. **Add the three-question quiz** (finding 10). Highest value per edit in the unit, already asked
   for by `audit.md` row 39 and the cadence summary, and the machinery exists.
2. **Add the `TaskCard`** (finding 9). It is the only thing that makes `ScriptRuns`'s claim testable,
   and it is the unit's answer to "nothing to do".
3. **Cut "That is where iteration comes in." and land the one-rule pointer** (findings 1, 4, 6). One
   key in each language, and it repairs an AI tell, a long paragraph and an unmade diff at once.
4. **Rewrite `scripts.1`'s closer** (finding 2). One key in each language.
5. **Label `ScriptRuns`'s bars** (finding 7). A component change plus three keys per language, and it
   is what stops the unit's only figure from being decoration.
6. **The clause naming `setup`** (finding 5), above the first `<pre>`.
7. **The three Dutch drifts** (findings 11, 12, 13) and **the stray coin** (finding 3). Minutes each.
