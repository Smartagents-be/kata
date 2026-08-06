# step2 / `setup` — audit dossier

**Files read:** `front/src/steps/step2/CLAUDE.md`, `units/setup.html` (702 prose words, 6 prose
paragraphs + 1 aside + 2 `<pre>`), `index.tsx`, `locales/en.json` + `nl.json`, `ProjectTree.tsx`,
`SkillTree.tsx`, `HookTree.tsx`, `FileTree.tsx`, `SetupFlags.tsx`, `setup-flags.ts`, `audit.md`
rows 14 / 36 and Table 1 rows 84, 99, 109, 113, 129 (item 24), `.claude/skills/lesson-writing/SKILL.md`.

**Verified against the repository, not assumed:** all three flag hashes. I extracted every
`{...}` token from the three candidate files, hashed `SETUP_FLAG_SALT + token`, and matched:
`skill` → `kata/step2/java/.claude/skills/writing-style/SKILL.md`, `module` →
`kata/step2/java/CLAUDE.md`, `package` →
`kata/step2/java/src/main/java/be/smartagents/kata/java/step2/domain/CLAUDE.md`. One flag per file,
three files, plaintext, in braces. No plaintext was printed and none is reproduced here.

---

## 1. AI tells

Most of this unit is genuinely written. `skills.5` ("Two that sound alike are worse than one: if
either could match, neither reliably does"), `hooks.2` ("A hook just happens") and `claude-md.2`
("The file is a briefing, not documentation") are all house voice: short, declarative, willing to
state a view. Two things are not.

1. **Where:** `setup.lead.1`, and the pattern it starts
   **Problem:** Five of the six prose paragraphs close a sentence on a list of exactly three, and
   they run consecutively:
   - `lead.1` "knowing nothing about your project, your way of working or your conventions"
   - `claude-md.1` "what the project is about, what it is not about, and the ideas behind it"
   - `claude-md.2` "Less entropy, less context fatigue, and a smaller bill on every turn"
   - `your-own-claude-md.1` "the language you want to be answered in, the tools you always reach
     for, the thing you are tired of asking for twice a day"
   - `hooks.1` "before a tool runs, after a file is written, when the session ends"

   One list is fine. Five in six paragraphs is the tricolon rhythm on the brief's list, and a reader
   feels it as metre even if they cannot name it. Three of the five earn their place and must not be
   touched: `hooks.1` is three real hook events, `your-own-claude-md.1` is three concrete things with
   a varied last item, and `claude-md.2` deliberately calls back to two terms step 1 defined
   (`entropy`, `context fatigue` in `step1/context`). The two that are pure abstraction are `lead.1`
   and `claude-md.1`, and `lead.1` is also the worst offender because it is the first sentence on the
   page.
   **Fix:** cut the triple in `lead.1` only. One sentence changes, the rhythm breaks at the top, and
   the callbacks survive. Replacement for the whole of `setup.lead.1`:

   > An agent starts every session knowing nothing about your project. Arrange the repository so it
   > does not have to be told the same things twice. You get better answers, and you pay fewer
   > tokens for them `<svg data-icon="coin"></svg>`.

   This also kills "so the agent can work efficiently in it", where *efficiently* is an adjective
   doing work the next sentence already does. Dutch, same change:

   > Een agent begint elke sessie zonder iets te weten over jouw project. Richt je repository zo in
   > dat je hem niet twee keer hetzelfde hoeft te vertellen. Je krijgt betere antwoorden, en je
   > betaalt er minder tokens voor `<svg data-icon=\"coin\"></svg>`.

2. **Where:** `setup.skills.1`, first sentence
   **Problem:** "A skill can be considered a reusable high quality prompt." *Can be considered* is
   the hedged passive the lesson-writing skill bans outright under "Say it straight" ("Prefer 'the
   agent reads your files' over 'the agent is capable of reading your files'"), and it is the
   flattest sentence in the unit sitting at the top of its section. "high quality" is also an
   unhyphenated compound modifier. The Dutch does not have the problem: "Een skill kan je zien als
   een herbruikbare, goed geschreven prompt" is what a person says out loud, and it says *well
   written* rather than *high quality*.
   **Fix:** rewrite the English off the Dutch (repo policy, and here the Dutch is plainly the truer
   version):

   > A skill is a reusable prompt, written once and written properly. It is a folder under
   > `.claude/skills/` with a `SKILL.md` in it, holding a procedure you want followed the same way
   > every time.

   Dutch unchanged.

---

## 2. Truthfulness

**No factual error found.** This is the strongest axis in the unit and it deserves saying plainly.
What I checked and what came back:

- Three flags, three files, plaintext, braces: **verified by hash** (method above). The prose
  names none of the three files and neither does any of the six `hint`/`help` strings, so the
  prohibition in the root `CLAUDE.md` and in this step's notes is intact in both languages.
- `kata/step2/java` exists and is a standalone Maven project. **Verified.**
- "a Java project you have not opened": nothing before this unit sends the student there.
  `step0/backend` runs `kata/step0/java`, `step1/tools` and `step1/workshop` run `kata/step1/java`,
  and `step2/evolution` names `kata/step1/java` at line 113. **Verified.**
- `setup.flag.skill.help` ("what it must do before writing a line of Javadoc"): the step 2 skill is
  `writing-style`, its description leads on Javadoc and it has a `## Javadoc` section. The symptom
  the help describes is the right symptom. **Verified.**
- `setup.flag.module.help` ("the first thing read when a session starts in that folder"): correct for
  a session opened in `kata/step2/java`. **Verified.**
- The `add-endpoint` frontmatter: `a controller under web/` matches `kata/step2/java/.../step2/web/
  LoanController.java`; `the /api prefix the Vite proxy expects` matches
  `front/vite.config.ts` lines 16-21 (`'/api' → http://localhost:8080`). Both concrete claims in an
  invented example are true of this repository. **Verified.**
- The hooks JSON: `hooks.PostToolUse[].matcher` + nested `hooks[]` with `{"type":"command",
  "command": …}` is the real settings schema, and `Write|Edit` is a valid matcher. The prose's three
  events (before a tool runs, after a file is written, when the session ends) map to `PreToolUse`,
  `PostToolUse`, `SessionEnd`. **Correct.**
- `~/.claude/CLAUDE.md` read in every project on the machine, root `CLAUDE.md` read at session start,
  a nested one joining only when the agent works in that folder, `name` matching the folder and
  being what you type after the slash, a `references/` folder read on demand, a description paid for
  on every turn: all correct for Claude Code as of this writing. `ProjectTree`'s docblock claims all
  three drawn files are real; `CLAUDE.md`, `front/CLAUDE.md` and `kata/step2/java/CLAUDE.md` all
  exist. **Verified.**
- No em-dash or en-dash in the HTML or in any `setup.*` Dutch value. **Verified.**

One item I could not verify from the page, and it is a reference rather than a fact:

1. **Where:** `setup.skills.4`
   **Problem:** "the one above ends by asking for a commit, so it names `commit-message` instead of
   restating the rules for one." The `<pre>` above shows **frontmatter only**. The body of
   `add-endpoint` is not on the page, so "the one above ends by asking for a commit" asserts the
   content of something the reader is looking straight at and cannot see. A reader who checks will
   find nothing to check against. (`commit-message` itself is fine: it is in `SkillTree`, which is
   the rule the step's notes record.)
   **Fix:** make the clause general so it stops pointing at invisible text. Nothing else in the
   paragraph moves:

   > Keep them small. A skill may point at another rather than repeat it: a skill that ends by
   > asking for a commit names `commit-message` instead of restating the rules for one. Detail that
   > will not fit goes in a `references/` folder beside the body, read only when it is wanted.

   Dutch:

   > Hou ze klein. Een skill mag naar een andere wijzen in plaats van ze over te schrijven: een
   > skill die eindigt met een commit vragen noemt `commit-message` in plaats van de regels ervoor
   > te herhalen. Details die er niet in passen gaan in een map `references/` ernaast, en worden pas
   > gelezen wanneer ze nodig zijn.

---

## 3. Progression

The unit builds well internally: root file, personal file, skills, hooks, running from loosest
(a line that asks) to strictest (a script that just happens), with `hooks.2` making that ordering
explicit rather than leaving the reader to notice it. The section order is not a defect. Two seams
are.

1. **Where:** `setup.lead.1`, first sentence
   **Problem:** "An agent starts every session knowing nothing about your project" is step 1's
   claim, argued twice already and by name. `step1/context`'s `amnesia-context-fatigue.3` says
   "write it in `CLAUDE.md`, which is read at the start of every session", and
   `step1/session`'s `window-not-memory.1` says "`CLAUDE.md` is read again at the start of every
   session, which is why a standing instruction goes there". So by the time a reader reaches
   `setup`, they have been told what `CLAUDE.md` is and that it is read at session start, twice, in
   two different units. `setup` opens as if neither had happened, and `claude-md.1` then restates
   "It is read at the start of every session" a third time.

   This is not a duplication that needs cutting: what `setup` genuinely adds is the pair of claims
   step 1 never makes, that the root file **stays in the window for the whole session wherever the
   agent works**, and that a nested one **only joins when the agent goes in there**. That contrast is
   the unit. The defect is that it arrives buried behind a restatement instead of being handed the
   floor, and the lesson-writing rule for exactly this case is "say what it established rather than
   re-establishing it".
   **Fix:** the `lead.1` replacement in finding 1.1 already removes the restatement from the opener.
   Then let `claude-md.1` name where it comes from rather than assert it cold. First two sentences
   become:

   > `<a href="/steps/step1/session">Step 1's unit on sessions</a>` said a standing instruction goes
   > in `CLAUDE.md` because the file is read again at the start of every session. What that unit did
   > not say is that the root file `<span data-marker>1</span>` then stays in the window for all of
   > it, wherever the agent is working.

   Dutch equivalent, with the same path string:

   > `<a href="/steps/step1/session">De unit over sessies in stap 1</a>` zei dat een staande
   > instructie in `CLAUDE.md` hoort, omdat dat bestand bij de start van elke sessie opnieuw
   > gelezen wordt. Wat die unit niet zei: de `CLAUDE.md` in de root `<span data-marker>1</span>`
   > blijft er daarna de hele sessie in staan, waar de agent ook aan het werk is.

   That turns three tellings into one telling plus one addition, and it threads the only
   cross-step seam this unit has.

2. **Where:** `setup.hooks.3`, last prose sentence in the unit — **known gap, audit item 36**
   **Problem:** recorded already: the closing clause pointing at `patterns` was cut, correctly,
   when `patterns` stopped mentioning hooks, and the unit now ends on hooks with the
   `setup` → `patterns` seam unmarked from both sides. I record it here only as prior art, and to
   note that the fix collides with finding 7.2 below: whatever closing sentence lands here has to
   land **after** the split, not instead of it. Audit item 39 asks `patterns` to name `setup` from
   its side, so the two clauses are one change.

Nothing here assumes anything the course has not introduced. `entropy` and `context fatigue` in
`claude-md.2` are both defined in `step1/context`, and reusing them in three words is the right kind
of callback.

---

## 4. Readability

Clean. Headings are names, which is what the lesson-writing skill asks for when the section is about
a named thing ("CLAUDE.md", "Skills", "Hooks", "Your own CLAUDE.md"), and none of them says what its
first sentence says. Sections run one to two paragraphs except Skills, which runs five short ones and
carries five distinct claims (what it is, an example, how the description is matched, keep it small,
be sparing), so the third-paragraph rule is not really breached. No sentence I stumbled on. One
pronoun is loose: `claude-md.1`'s "It only joins the context once the agent goes in there" follows a
sentence whose subject is "each of these files", so *it* has to reach back past `<span
data-marker>3</span>`. It resolves, and the finding 3.1 rewrite tightens the paragraph around it
anyway; I would not change it on its own.

The Skills `<pre>` uses a spaced hyphen as a dash ("the way the existing ones are built - a
controller under `web/`"). Inside a code sample with no `data-i18n` key, this is the sanctioned
workaround for the em-dash ban rather than a violation, and the same shape appears in the repo's own
skill files. Not a finding.

---

## 5. Imagery

**No defect. Three figures, all three earn their place, and I am recommending against a fourth.**

- `ProjectTree` is the only one that numbers its rows and the only one whose prose points back into
  it, which is the `data-marker` convention working as designed. It carries what a sentence cannot:
  the same filename at three depths, which is the whole scoping argument in one glance.
- `HookTree` is the strongest of the three on the "carries what prose does not" bar. The prose says
  "You declare it in `settings.json`" and never says where `settings.json` is; the drawing settles
  it, and paints the declaration, the folder and the script all teal because a reader who takes away
  one half of a two-file mechanism has the wrong picture. That reasoning is in the step's notes and
  it holds.
- `SkillTree` is the weakest. `skills.1` already says "a folder under `.claude/skills/` with a
  `SKILL.md` in it", so most of the drawing is that sentence. What keeps it above the bar is
  `references/` (named three paragraphs later, so the drawing gets there first) and the sibling
  count, which the notes record as three-not-thirty because the section closes by telling the
  student to be sparing. It is defensible and I would leave it alone. Cutting it would also break
  the "one drawing three times" shape the section headings depend on.

The one claim in the unit a reader must take entirely on trust is `skills.5`'s: "thirty skills are a
table of contents the agent reads before every answer." A window figure would measure it. **Do not
draw one.** The step's notes are emphatic that figures must stay out of each other's arguments, and a
window-with-stacked-blocks drawing here would be the fourth site for that vocabulary after
`steering`'s `TwoWindows` and `LoopInWindow` and `goals`'s `ReadEachTime`, and it would put a cost
drawing in the one unit whose notes say the token argument is told twice on purpose and a third site
must not open. The claim is qualitative, the unit is right not to put a number on it, and the coin
icon in `claude-md.2` already carries the weight.

---

## 6. Supporting tasks

The unit closes on a real, machine-graded exercise and it is a good one: three flags, one per place
an agent picks instructions up, in a project the student has not opened, with help texts that
describe a symptom rather than a path. It is the only exercise outside `workshop` a machine grades,
and the mechanism is sound (verified above). No complaints about what is there.

1. **Where:** the `Hooks` section — nothing in the course asks the student to write or run one
   **Problem:** this unit is, by the step's own notes, "the only place in the step that teaches
   hooks", and `patterns` no longer mentions the word at all. So hooks are introduced, argued as the
   strictest of the three mechanisms, given a `settings.json` block and a warning about blast
   radius, and then never done, anywhere in the course, by anybody. That is the clearest
   told-and-never-asked in the unit. It is also the cheapest thing in step 2 to actually do: two
   files, thirty seconds, and it fires on the next edit.
   **Fix:** a `TaskCard` (ungraded, ticked once, `kata.step2.hook`), on the `WhereWouldItGo`
   pattern in `engineering`: no prose between the section and the card, description carries the
   setting. Four moves, against **your own** repository and not the kata's:
   1. Write `.claude/hooks/format-on-write.sh`, two lines: run your formatter on the file the hook
      is handed, and exit 0.
   2. Declare it in `.claude/settings.json` with the `PostToolUse` block from this page.
   3. Ask the agent for any one-line change and watch the script run without asking for it.
   4. Break the script on purpose, make the same change again, and read what the agent does with
      the error it did not cause.

   Move 4 is the one worth having. It is the only place in the course where the student sees the
   failure `hooks.3` describes rather than being told about it, and it takes ten seconds to stage.
   **Cost to weigh:** this puts two instruments under one "Test yourself". `step1/context` already
   ships that shape (a card and a registry quiz sharing the heading via `showsExerciseHeading`), so
   it is not novel, but the board is the graded one and must stay last. If the tutor would rather
   keep the closer single, say so and drop this; it is a real gap, not an urgent one.

---

## 7. Quiz

**This unit does not need one, and I would refuse it if proposed.** The reason is specific rather
than "it already has an exercise": the unit's least intuitive claim, that a `CLAUDE.md` deeper in
the tree is never read while you work at the top, is **already what the board grades**. The
`package` flag is unfindable by a student who has not accepted that claim, and
`setup.flag.package.help` states the symptom in those exact terms ("One of these files is never read
while you work at the top of the project. Go where the rules it carries actually apply."). A
multiple-choice question on scoping would be the same check with the answer visible on screen.

The step's two quizzes both sit on units with nothing to do (`workflows`, `goals`), which is the
right division. Adding a third here would put a question, a card and a graded board under one
heading.

---

## 8. EN/NL parity

**Complete.** Every prose key in the HTML has a Dutch entry (`lead.1-2`, `claude-md.heading`,
`claude-md.1-2`, `your-own-claude-md.heading`, `.1`, `.2`, `skills.heading`, `skills.1-5`,
`hooks.heading`, `hooks.1-3`, `check-yourself.1`), every `setup.*` and `tree.*` key in `en.json` has
a Dutch sibling, and there are no orphaned Dutch keys. The two `<pre>` blocks and the three
`data-figure` markers carry no keys, correctly. The coin icon is escaped correctly in both Dutch
values that carry it.

Two places the Dutch is the better lesson and the English is what should move.

1. **Where:** `setup.skills.1`
   **Problem:** covered as finding 1.2. NL "een herbruikbare, goed geschreven prompt" against EN "a
   reusable high quality prompt", and NL's "kan je zien als" is idiomatic where EN's "can be
   considered" is limp. The Dutch is the version that was thought through.
   **Fix:** finding 1.2's English replacement. Dutch unchanged.

2. **Where:** `setup.hooks.3`, last sentence
   **Problem:** English runs one sentence with two commas and a trailing relative clause: "That
   script runs on every Write and every Edit, and a broken one hands the agent an error it did not
   cause, which it works around instead of writing your code." The Dutch split it two sentences ago:
   "…levert de agent een fout op die hij niet veroorzaakt heeft. Daar werkt hij omheen in plaats van
   jouw code te schrijven." The Dutch is right on both counts. The lesson-writing rule is "if a
   sentence has more than one comma, look for the full stop you skipped", and the rule about the
   last line of a paragraph being the best one in it is broken here: the sharpest thing in the
   section, the agent working around a problem you created instead of doing your work, is stuck in a
   subordinate clause.
   **Fix:** English becomes

   > So reach for one when the thing must happen every time and you would rather not find out that
   > it did not. Then keep it fast and keep it narrow. That script runs on every Write and every
   > Edit, and a broken one hands the agent an error it did not cause. It works around that instead
   > of writing your code.

   Dutch unchanged. Note the ordering against finding 3.2: audit item 36's missing forward pointer
   into `patterns` goes **after** this new final sentence, not in place of it.

---

## Verdict

**Strong.** This is one of the better units in the course and it survives a hostile read. Every
checkable claim in it is true, including the ones that would be easiest to get wrong: the hook
schema, the two concrete details inside an invented skill's frontmatter (`web/` and the Vite `/api`
proxy both match this repository), the claim that the student has not opened `kata/step2/java`, and
the three flags themselves, which I confirmed by hash rather than by trusting the file list. The
figures are one drawing three times and the discipline holds; the board is the second-best exercise
in the step and its help texts describe symptoms rather than paths, which is the exercise surviving
contact with a stuck student. Nothing here needs restructuring and nothing needs a new figure.

What is wrong is small and concentrated in three sentences. The opening sentence restates step 1's
statelessness as a list of three and sets a tricolon rhythm that runs through five of the unit's six
paragraphs. `skills.1` opens its section on the flattest, most hedged sentence on the page, and the
Dutch beside it is visibly better. And the closing sentence buries its own best clause. Everything
else I would leave exactly as it is, including the things that look like oversights and are not:
the invented skills, the unmarked `SkillTree` rows, the three-times-told "read at the start of every
session" (which is the callback, once the opener stops competing with it), and the absence of a
quiz.

**Priority order:**

1. **`setup.lead.1`** — rewrite (finding 1.1). Kills the triple at the top of the page, kills
   "efficiently", and clears the way for the seam fix. One sentence, both languages.
2. **`setup.claude-md.1`** — open by naming `step1/session` rather than restating it (finding 3.1).
   The only cross-step link this unit would have, and it turns a third telling into an addition.
3. **`setup.skills.1`** — rewrite the English off the Dutch (findings 1.2 / 8.1). English only.
4. **`setup.hooks.3`** — split the last sentence so the paragraph ends on its best clause
   (finding 8.2), then land audit item 36's forward pointer into `patterns` after it, as one change
   with audit item 39's clause on the `patterns` side.
5. **`setup.skills.4`** — generalise "the one above ends by asking for a commit" so it stops
   pointing at a body the reader cannot see (finding 2.1). Both languages, one clause.
6. **Optional: a hooks `TaskCard`** (finding 6.1). A real gap in the course, not just in the unit,
   but it costs a second instrument under the closing heading. A decision rather than an edit.
