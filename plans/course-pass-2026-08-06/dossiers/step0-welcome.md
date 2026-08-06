# Dossier: step0 / `welcome` ("How this kata works")

Files read: `front/src/steps/step0/CLAUDE.md`, `units/welcome.html`, `units/backend.html`,
`index.tsx`, `quiz.ts`, `deck.tsx`, `CodeCheck.tsx`, `Legend.tsx`, `code.ts`,
`locales/en.json`, `locales/nl.json`, `shared/lib/content.ts`, `shared/mode/mode.ts`,
`shared/lib/reset.ts`, `shared/components/AppShell.tsx`, `audit.md`,
`.claude/skills/lesson-writing/SKILL.md`, `.claude/skills/quiz-writing/SKILL.md`.

**Prohibition respected:** nothing below decodes, names or hints at the build-printed intro flag.
`{f1r5t-5t3p5}` is quoted only because the unit's own HTML and `en.json` print it in plain text as
the warm-up code.

**What is good here, said plainly.** The five house rules are the best-written prose in step 0 and
some of the best in the course: flat imperatives, a concrete failure per rule, and rule 4 ends on
"The agent cannot tell. You can." I verified that claim against `kata/step1/java/CLAUDE.md` and it
is exactly true (five same-shape candidates, and which one is real "is a judgement about what it
says, not something the structure gives away"). The decisions recorded in `step0/CLAUDE.md` about
cutting the justifying lines were right, and I am not proposing to put any of them back. Everything
below is a defect, not a preference.

---

## 1. AI tells

Two, and both are in the top third of the page. The house rules section is clean.

**1. `welcome.lead.2` is an announcing opener, which the house style bans outright.**

- **Where** `welcome.lead.2` (welcome.html:6-8), `nl.json` same key
- **Problem** "This part of the module explains how the kata works, with examples to work through
  alongside it." This is the shape `lesson-writing` forbids twice over: "Open with the idea itself.
  No preamble about what the page will cover", and check question 1, "Does the first sentence make a
  claim, or announce one?" It announces. It also tells the reader nothing the unit title
  ("How this kata works") has not already told them, so the paragraph is pure throat-clearing on the
  first page of the course.
- **Fix** Replace with a claim that earns its place, naming what is actually on the page:
  EN: `Nothing on this page is only reading. Two boxes on it want an answer before you move on.`
  NL: `Op deze pagina valt niet alleen te lezen. Twee velden willen een antwoord voor je verder gaat.`

**2. `welcome.how-to-use-this-document.6` is written in software-manual register, and the Dutch is
already better.**

- **Where** `welcome.how-to-use-this-document.6` (welcome.html:36-39)
- **Problem** "This will modify the content of this course to include the relevant commands so you
  can easily follow along." "Modify the content of this course" is machine register, "relevant" is
  doing no work, and "easily" is an empty intensifier. The Dutch says the same thing tighter and
  more concretely: "de commando's die voor jou gelden" (the commands that apply to you). Repo policy
  is that where the two disagree the Dutch is the truer one, so the English is what gets rewritten.
  The `step0/CLAUDE.md` constraint (two sentences, names no file and no command) is preserved by the
  replacement below.
- **Fix** EN: `Set the assistant to the one you actually use. The pages then name the commands that
  apply to you, instead of the other product's.` (Dutch unchanged.)

No tricolon rhythm, no "it's not just X", no summary paragraph, no closing gesture at significance.
The rest of the prose is human.

---

## 2. Truthfulness

**3. "Most steps close on a workshop" is false, and by more than the audit's count.** *(Known:
audit item 1.)*

- **Where** `welcome.how-workshops-work.1` (welcome.html:74-78)
- **Problem** Measured off the registries: step 0 ends on `backend`, step 1 ends on `recap` with
  `workshop` ninth of ten, step 2 ends on `workshop`, step 3 ends on `impostor`. One of four steps
  closes on a workshop, and only two of four have one at all. The counting clause is also doing no
  work: the sentence exists to define a board.
- **Fix** As audit item 1 proposes: cut the clause and open on the definition. EN: `A workshop is a
  board of flags: some are hidden in the code for you to hunt down, others are printed by a build
  once you have the project where the step wants it.` NL likewise drops "De meeste stappen eindigen
  op een workshop."

**4. House rule 3 is contradicted by the step 1 capstone three units later.** *(Known: audit item 2.)*

- **Where** `welcome.house-rules.3` against `step1/units/workshop.html`'s `workshop.one-window.1`
- **Problem** "One flag, one session... Start each one on a fresh session" against "Work all three
  from a single session. Nothing here needs a clear between the flags." `step1/workshop`'s `lead.2`
  links the student to these very rules. Nothing on either page reconciles them, in either language.
- **Fix** Audit item 2's proposal is the cheap and correct one: a clause on rule 3 admitting the
  exception a step may ask for, rather than qualifying the capstone.

**5. The assistant promise is one the course does not keep in step 2.** *(Known: audit item 24.)*

- **Where** `welcome.how-to-use-this-document.6`
- **Problem** Step 2 carries zero `data-assistant` blocks across ten units and 8,004 words, and
  sends every reader into a `.claude` skill and two `CLAUDE.md` files. The page promises a swap that
  a whole module does not honour. `step0/CLAUDE.md` records this deliberately: the scope caveat was
  cut and "the repair is giving step 2 variants", and "do not restore a scope line as a substitute
  for the work".
- **Fix** None in this unit. Do not write a caveat back in. Flagged here only so the pass does not
  "fix" it in the wrong place.

**6. `step0/CLAUDE.md` records a sentence the page does not carry, and the warning it describes
exists nowhere in the course.**

- **Where** `front/src/steps/step0/CLAUDE.md` against `welcome.how-to-use-this-document.5`
- **Problem** The step's own reasoning file states: "**One row is still named, by what it costs
  rather than by its label**: reset clears the captured flags and the finished pages... and the
  closing sentence of that paragraph is the only place in the course it appears." That closing
  sentence is not there. `how-to-use-this-document.5` ends at "...to configure this course", in both
  languages, and `git log -S reset -- .../welcome.html .../nl.json` returns nothing, so it was never
  committed. `grep -i reset` across all unit HTML and all step locales confirms no prose anywhere in
  the course mentions the reset row. The hazard itself is covered (the confirm dialog's
  `settings.reset.body` in `shared/i18n/locales` is explicit and has no undo), so this is a
  documentation defect rather than a student-facing trap, but one of the two has to move.
- **Fix** Either restore the clause the notes describe, EN: `One of them throws your progress away:
  it forgets every flag you captured and every page marked done.` (NL: `Eén ervan gooit je voortgang
  weg: elke flag die je gevangen hebt en elke pagina die als afgerond staat.`), or delete that
  sentence from `step0/CLAUDE.md`. Restoring is the better half, because the argument in the notes
  still holds and it costs one clause.

**Checked and correct**, so nobody re-litigates them: the cogwheel is genuinely top right
(`AppShell` header, `justify-between`, settings last); "Every answer box carries a Hint button" is
true of all three answer surfaces (step 0 `CodeCheck`, step 1 `FlagRow`, step 2 `FlagBoard` all
render a hint dialog); "Step 1 gives you the numbers" is true (`model.cost.1`-`.4` price a token and
multiply); the workshop definition matches both boards (step 1's are hidden in the code, step 2's
are printed by `mvn verify -Pgraded`); no em-dashes anywhere in step 0.

---

## 3. Progression

**7. The entry page of the course renders none of its prose in the app's default mode, and its
first exercise is unsolvable there.** This is the most serious thing wrong with this unit.

- **Where** `welcome.html` as a whole, against `shared/lib/content.ts` `prepareUnit` and
  `shared/mode/mode.ts` `DEFAULT_MODE`
- **Problem** `DEFAULT_MODE` is `guided`, and guided mode "drops every run of prose", keeping only
  `data-figure` markers and the nearest heading above each. So a student who opens the course for
  the first time sees, in order: the heading "How exercises work" and an answer box; the heading
  "Hints" and a second box; the heading "Icons you'll see" and the legend; then the quiz. No lead,
  no three ways to read, no instruction to set the assistant, no workshop definition, no house
  rules. The first box's own text then instructs `code.panel.hint`: "Type the code from the
  paragraph above, braces and all", and `code.panel.help`: "Look at the code in braces in the
  paragraph just above this box." There is no paragraph above. In the classroom case it is no better
  from the tutor's side: `deck.tsx` deliberately keeps both printed codes off the board, so the code
  is on neither the page nor the projector. The only place `{f1r5t-5t3p5}` survives the guided cut is
  inside the quiz question further down the page, by accident, and nothing connects the two.
  The unit that exists to orient a new reader is the one unit that orients nobody by default.
- **Fix** This is a decision, not a rewrite, and it should be taken before any prose is touched.
  Cheapest honest repair: exempt `welcome` from the guided prose cut, since the whole page is
  operating instructions for the app rather than material a tutor delivers. That is a per-unit flag
  in the registry (`prose: 'always'`) read by `prepareUnit`, plus one line in `step0/CLAUDE.md`
  recording why this unit alone carries it. Second-cheapest: flip `DEFAULT_MODE` to `self`, which
  contradicts the reasoning in `mode.ts` ("the classroom is the case where accidentally revealing
  notes actually costs something") and should not be done casually. Worth noting either way:
  `mode.ts`'s own doc comment is now stale, describing self as "The same page, plus every note" and
  guided as "Exercises only; explanatory notes are withheld", which stopped being true when the
  whole-prose cut landed.

**8. Step 0 never states what the student needs before starting, and there is no README to carry
it.**

- **Where** `welcome.html` lead, and `backend.html` lead
- **Problem** The house rules on this page assume a coding agent the student can run against a
  checkout ("Only your agent hunts. Do not go reading the code yourself"). `backend.lead.1` then
  names `kata/step0/java`, `pom.xml` and Maven as if the repository is already on the machine. The
  student is never told to clone anything, never told a JDK and Maven are required, and never told
  they need an agent installed and authenticated before rule 1 means anything. There is no `README.md`
  at the repo root (`ls *.md` returns CLAUDE, DESIGN, PRODUCT, audit, copilot-specific only), and
  `audit.md` has no row on prerequisites, so this is not a known gap. For the self-paced audience the
  course names in its own first sentence, this is the first thing missing.
- **Fix** Two sentences, in the `welcome` lead, before the three ways to read. EN: `You need three
  things on your machine: this repository cloned, a JDK and Maven, and a coding agent you can run in
  a terminal. The pages assume all three from step 1 on.` NL: `Je hebt drie dingen nodig op je
  machine: deze repository gekloond, een JDK met Maven, en een coding agent die je in een terminal
  kan draaien. Vanaf stap 1 gaan de pagina's ervan uit dat je ze alle drie hebt.` (Placing it in
  `welcome` rather than `backend` is deliberate: rule 1 on this same page already depends on it.)

**9. `welcome.lead.1` ends on a sentence the next section says better.**

- **Where** `welcome.lead.1`, last sentence, against `welcome.how-to-use-this-document.1`-`.4`
- **Problem** "The kata is self-paced or guided." Three lines later the reader gets "There are three
  ways to read these pages", and two of the three are that sentence again with more in them. Check
  question 7: "Which sentence only says the previous one again? Cut that one."
- **Fix** Cut it from `lead.1` in both languages. EN then ends on "It starts simple and each step
  leans on the one before it", which is the sharper line and the right one to close on.

**10. Nothing on the page points at `backend`, the next thing the student clicks.** *(Known: audit
item 25.)*

- **Where** `welcome.house-rules.5`, the unit's closing paragraph
- **Problem** The unit closes by pointing two units and a whole step ahead ("Step 1 gives you the
  numbers"), and never mentions that step 0 has a second page or what is on it. Audit item 25 has
  asked for one closing sentence across two passes and it is still absent.
- **Fix** One sentence after rule 5. EN: `The next page is where the code those flags hide in
  lives.` NL: `De volgende pagina gaat over de code waar die flags in zitten.`

---

## 4. Readability

Covered in the numbered items above where it overlaps another axis. Two items of its own, both
counted under later headings so the numbering stays one sequence:

- The definitional paragraph uses two nouns for one thing and never says they are the same: see
  item 13.
- `welcome.how-exercises-work.1`'s last sentence is passive with an unclear referent: see item 14.

One thing I considered and am **not** filing: the heading "How to use this document" covers both the
three ways to read and the settings menu. Two topics, one heading, but the heading is broad enough
to hold both and splitting it would rename every key in the section for no reader benefit. Not a
defect.

---

## 5. Imagery

**No new figure earns its place here, and no existing one fails the bar.** Stated as a finding
because the temptation on an intro page is to draw something decorative.

- `Legend` passes cleanly: three symbols whose meaning a reader cannot infer from the prose, defined
  once, used inline for the rest of the course. It carries what the sentences cannot.
- The two `CodeCheck` slots are exercises rendered at figure markers, not drawings, and should not
  be judged as figures.
- **Rejected: a "board anatomy" drawing** (label, hint, field, Check, Solved badge) under
  `How workshops work`. A live `CodeCheck` box with all five parts sits a few inches up the same
  page. Drawing it would be a picture of something the reader can already point at.
- **Rejected: a "three routes to a flag" drawing** (printed in prose / hidden in code / printed by a
  build). That is exactly the claim `welcome.how-workshops-work.1` already makes in one sentence.
- **Rejected, and worth recording why:** house rule 3 ("A hunt leaves a trail of dead ends behind
  it") is the one claim on the page a drawing could measure, by showing three flags worked in one
  window against three fresh ones and what each costs. `step0/CLAUDE.md` forbids it in terms: the
  section "carries no numbers and does no arithmetic", so `model.cost.4` stays the one paragraph in
  the course that multiplies. Step 1's `OneWindow` and `BudgetWindow` already own that picture. Do
  not draw it here.

---

## 6. Supporting tasks

**11. The one instruction on the page is never confirmed, and the rest of the course silently
depends on it.**

- **Where** `welcome.how-to-use-this-document.6`
- **Problem** "Set the assistant to be the one you actually use" is the only thing this unit asks
  the student to go and do, and it is the single setting that changes 26 blocks of step 1 prose. A
  reader who skims past it is served the wrong product's filenames for the rest of the course with
  nothing ever telling them so. The page tells and never asks.
- **Fix** A `TaskCard` (ungraded, student-ticked), block `set-your-assistant`, rendered at a new
  `<div data-figure="set-your-assistant">` marker directly under that paragraph, with one move:
  EN: `Open the cogwheel, top right. Set the assistant to the one you use, and check the language
  while you are in there.` NL: `Open het tandwiel rechtsboven. Zet de assistent op degene die jij
  gebruikt, en kijk meteen de taal na.` Two reasons this shape and not a sentence: a card comes from
  the registry, so it is one of the few things that survives the guided cut and would give a
  default-mode reader an instruction they currently do not get (item 7); and a tick is the cheapest
  honest evidence the setting was actually touched. Deliberately one move, not two: `step0/CLAUDE.md`
  leaves the mode switch to the panel, and the mode problem is item 7's to fix, not this card's.

Nothing else is missing. Two answer boxes and a quiz on a 497-word intro is the right density, and
`audit.md` already accepts that these boxes sit in the prose rather than under the shared
`ui:quiz.title` heading.

---

## 7. Quiz

The existing question stays. It is deliberately the lightest in the kata (recorded in `quiz.ts`), the
four choices are the same register and length, and none is filler. Keep it exactly as it is.

**12. The five house rules are the highest-value content on the page and nothing checks any of
them.**

- **Where** `quiz.ts`, `understoodQuiz`
- **Problem** The unit gained `How workshops work` and five house rules from step 1's `workshop`,
  roughly doubling it, and the quiz still asks only about braces. Rule 4 is the one a student will
  break within ten minutes of starting step 1, and "the agent said it found the flag and sounded
  sure" is a misconception people genuinely hold, which is exactly the quiz-writing skill's test for
  a question worth asking.
- **Fix** One second question. Id `agent-says-it-found-it`.
  - **Question**: `You ask your agent for a flag. It comes back with a string in the right shape and
    says it is confident. It never ran anything. What have you got?`
  - **Correct** (`a-guess`): `A guess. Have it run the thing and print the output, then read the
    flag off that.`
  - **Distractor** (`it-read-the-file`): `A flag. It read the file, so the string came out of the
    code rather than out of the model.`
  - **Distractor** (`right-shape`): `A flag, as long as the shape is right. The shape is what the
    board checks your answer against.`
  - **Distractor** (`only-builds`): `Nothing usable. Only a build can print a flag, so a flag found
    by reading is never the right one.`
  - **Explanation**: `Worked out in prose, a flag is a plausible string with two letters wrong, said
    just as surely. The board hashes one exact string, so the cheap check is to make the agent run
    the thing and read the answer out of the output.`
  - Dutch rewrite required in the same change, per the standing rule.
  - Note the last distractor is deliberately half-true and is the one a careful reader of `backend`
    might pick, which is what makes it worth having.

---

## 8. EN/NL parity

**Parity is complete and clean.** Every one of the 19 `data-i18n` keys in `welcome.html` has an entry
in `nl.json`; `en.json` correctly carries no `welcome.*` prose (the HTML is the English) and does
carry the figure labels, panel wording, quiz text and deck text, each with a Dutch sibling. No
em-dashes in either language. No key in `nl.json` is orphaned.

Two places the Dutch is the better version, so the English is what changes:

**13. `welcome.how-to-use-this-document.6`** — same sentence as item 2. The Dutch "de commando's die
voor jou gelden" is concrete where the English "the relevant commands" is not, and Dutch has no
equivalent of "modify the content of this course". Rewrite the English to the Dutch, per item 2.

**14. `welcome.how-exercises-work.1` is passive in English and active in Dutch, and the English
referent is loose.**

- **Where** `welcome.how-exercises-work.1` (welcome.html:43-47)
- **Problem** "Your goal is to capture the flags. These are to be hunted down and typed back into a
  box in your browser." "These are to be hunted down" is passive and stiff, which `lesson-writing`
  bans ("Second person, active voice"), and "These" could point at the flags or at the codes named
  in the first sentence. Dutch has it right: "Die moet je opsporen en in je browser in een veld
  terugtypen." There is a second problem in the same paragraph, item 15.
- **Fix** EN: `You hunt them down and type them back into a box in your browser.` (Dutch unchanged.)

---

## 9. Restructure and convention

**15. The paragraph that defines the course's central vocabulary uses two nouns for one thing, and
gets the relation between them slightly wrong.**

- **Where** `welcome.how-exercises-work.1`, and the panel titles in both locale files
- **Problem** "You'll find codes written like `{f1r5t-5t3p5}`... A string wrapped in `{}` marks a
  flag. Your goal is to capture the flags." A braced string does not *mark* a flag, it *is* the
  flag, which is what the rest of the course assumes and what the board actually hashes. On top of
  that, step 0 names the same mechanism three ways within one step: `code.panel.title` "The page
  code", `hint.panel.title` "The hidden code", `flag.panel.title` "The intro flag". Every step after
  this one says "flag" and only "flag". This is the one page in the course whose job is to set the
  word, and it sets two.
- **Fix** Pick "flag" and use it throughout the paragraph. EN: `During the exercises you will meet
  strings like {f1r5t-5t3p5}. A string in braces is a flag. You hunt them down and type them back
  into a box in your browser.` NL: `Tijdens de oefeningen kom je strings tegen zoals
  {f1r5t-5t3p5}. Een string tussen accolades is een flag. Die spoor je op en typ je in je browser in
  een veld terug.` Then rename the two "code" panel titles to match ("De pagina-flag" / "The page
  flag", "De verborgen flag" / "The hidden flag"). The `CodeCheck` component name and the `code.ts`
  ids can stay as they are: those are not on screen.

**16. `welcome.hints.2` renders for nobody, in either mode, in either language.**

- **Where** `welcome.html:59-62`, `data-audience="guided"`
- **Problem** The per-element audience filter removes it in self mode. The guided cut then drops
  every run of prose, `data-audience="guided"` blocks included, which `content.ts` states in terms.
  So the paragraph is dead: it is impossible to reach a rendering of this page that shows it. Four
  other blocks in the tree are in the same position (`step1/harness`, two in `step1/session`,
  `step1/prompt`), so this is systemic and worth a decision, but the one in this unit is mine to
  report. Its content is good and should not simply be lost: "ask your tutor before you reach for the
  Hint" is exactly the thing a room needs.
- **Fix** Delete the paragraph from `welcome.html` and `nl.json`, and put the line where a tutor
  actually sees it: a `note` on `deck-step0-welcome` in `deck.tsx`. If the project would rather keep
  guided-only prose as a shape, that needs a `content.ts` decision (guided keeps figures, adopted
  headings, *and* `data-audience="guided"` blocks), and it should be taken once for all five.

**17. The legend section's keys do not derive from its heading.**

- **Where** `welcome.legend.heading` / `welcome.legend.1` under `<h2>Icons you'll see</h2>`
- **Problem** The convention is that a key is a location, slugified from the `<h2>` above the block.
  Every other section in this unit obeys it (`how-to-use-this-document`, `how-exercises-work`,
  `hints`, `how-workshops-work`, `house-rules`). This one says `legend`, which is the figure
  component's name, not the heading's. Grepping the slug of the heading finds nothing.
- **Fix** Low priority, and there is a real cost either way. Renaming the prose keys to
  `welcome.icons-youll-see.*` would split them from `welcome.legend.gem.title` and friends in
  `en.json`, which are figure labels and correctly named after the figure. The cheaper repair is to
  reword the heading to `Legend`, one word, sentence case, which is a plain label in the house style
  and makes the keys honest. Do this only if the section is being touched anyway.

---

## Verdict

**needs-work**, and not because of the writing. The prose is genuinely good, the house rules are
excellent, and the decisions recorded in `step0/CLAUDE.md` are sound ones I would defend. The
problem is that this unit is the front door of the course and the front door does not open in the
default configuration: `DEFAULT_MODE` is `guided`, guided drops every run of prose, so a new reader
gets three headings, two answer boxes and a legend, with the first box instructing them to copy a
code from a paragraph that is not on the page and is not on the tutor's slides either. Everything
else on this list is small beside that. Under it sit two structural gaps that are genuinely new
(the course never says what to install or where the repository comes from; `step0/CLAUDE.md`
describes a reset warning that no file has ever carried), three known audit rows that have now
survived two passes, and a vocabulary wobble on the one page whose job is to fix the vocabulary.

Priority order:

1. **Item 7** — decide what `welcome` does in guided mode. Nothing else on this page is worth
   editing until a default-mode reader can see the page. (Decision + small `content.ts`/registry
   change.)
2. **Item 3** — "Most steps close on a workshop" is a false sentence on the front page. One clause,
   both languages. (audit item 1)
3. **Item 8** — prerequisites. Two sentences in the lead, both languages.
4. **Item 4** — reconcile house rule 3 with step 1's capstone. One clause. (audit item 2)
5. **Item 6** — restore the reset clause, or delete the claim from `step0/CLAUDE.md`.
6. **Item 15** — settle on "flag", rewrite the definitional paragraph and the two panel titles.
7. **Item 11** — the assistant `TaskCard`. Doubles as the one instruction a guided-mode reader gets.
8. **Item 10** — one closing sentence pointing at `backend`. (audit item 25)
9. **Items 1, 2, 14** — the three sentence-level rewrites, English only, Dutch already correct.
10. **Item 12** — the second quiz question.
11. **Item 9** — cut the redundant last sentence of `lead.1`.
12. **Item 16** — delete the dead guided paragraph, move its line to the deck.
13. **Item 17** — the legend keys, only if the section is opened for another reason.
