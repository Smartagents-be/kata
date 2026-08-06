# Dossier: step2 / `engineering`

Files read: `front/src/steps/step2/CLAUDE.md`, `units/engineering.html` (555 words, matches
audit.md row 15), `index.tsx`, `locales/en.json`, `locales/nl.json`, `DomainTree.tsx`,
`WhereWouldItGo.tsx`, `FileTree.tsx`, `deck.tsx`, `units/setup.html`, `step1/units/tokens.html`,
`kata/step2/java/src`, `audit.md`, `.claude/skills/lesson-writing/SKILL.md`.

**Prior art (not my discoveries).** `audit.md` item **37** already records that the unit opens cold
and closes on the card with no line into `steering`, and that the bare `<h2>Test yourself</h2>` over
the card is deliberate and documented. Item **24** records that step 2 carries no `data-assistant`
anywhere, which covers the hook and `CLAUDE.md` sentences here. I do not re-report either as a
discovery; item 37 recurs below only because I can make its fix sharper.

**Verified clean.** `/steps/step2/evolution`, `/steps/step2/setup` and `/steps/step1/tokens` all
resolve. `step1/tokens` genuinely establishes the claim `domain-driven-design.2` leans on
("Plain English it has seen endlessly"), so the pointer is honest. No em-dashes in the HTML or in
`nl.json`. Every prose key in the HTML has a Dutch entry, and no orphan entries. `WhereWouldItGo`'s
premise checks out against the real project: `kata/step2/java` has seven packages under `step2`
(`adapter`, `aot`, `application`, `config`, `domain`, `port`, `web`), and `port/` beside `domain/`,
`web/` with no `incoming/` above it, and `config/`+`aot/` having nowhere to land are all exactly the
disagreements the card is built on. The card names none of them and gives no count, as documented.

---

## 1. AI tells

The prose here is mostly genuinely written. "The loop feels productive right up to the moment you
cannot answer a simple question about your own repository" and "lands in the statistical middle of
every cleanup ever written" are both sentences no model produces on its own, and the unit's rhythm
(short declarative, then a long one, then a five-word landing) is the house voice working. Two
things spoil it.

### 1. Five three-item lists in eight paragraphs

**Where** `engineering.lead.2`, `lead.3`, `domain-driven-design.1`, `use-correct-language.1`,
`quality-gates.1`

**Problem** Every one of them is defensible on its own. The density is not: five of the unit's eight
prose paragraphs land a tricolon, and four of the five sit in consecutive paragraphs.

- lead.2 "asking for a feature, skimming what comes back, and running it"
- lead.3 "A problem arrives from the business, you break it down…, and you pour…"
- ddd.1 "the domain in the middle, the machinery behind adapters, and the direction of a call as a folder you can point at"
- ucl.1 "Design pattern names, layer names and the vocabulary of your domain"
- qg.1 "Line coverage, mutation coverage and a Sonar reliability score"

The BRIEF's list names this exactly: "One list is fine; a rhythm of them is a machine." The one to
break is `quality-gates.1`'s, because it is the weakest of the five (two coverage measures plus a
vendor rating bolted on to reach three) and because breaking it also fixes the naming error in
§2.1 and gives the section a rhythm break it currently has none of.

**Fix** (EN, `engineering.quality-gates.1`, first sentence)

> Line coverage and mutation coverage still tell you whether software is fit to ship. So does a
> Sonar reliability rating.

(NL, same key)

> Line coverage en mutation coverage zeggen nog altijd of software klaar is om te leveren. Een
> Sonar reliability rating ook.

### 2. Announcing the register instead of using it

**Where** `engineering.lead.1`, sentence 2

**Problem** "…and it is worth being blunt about which side you are on." The sentence announces that
bluntness is coming and then is not blunt. It is one family member away from "it is worth noting
that", which the lesson-writing skill bans outright, and the fix is the house's own move: state it
flat.

The step's `CLAUDE.md` protects the *next* sentence (naming `evolution` as the one place the line
does not hold) and says not to cut it. The replacement keeps it.

**Fix** (EN, `engineering.lead.1`)

> Good agentic projects start with good software engineering. That is the whole line between vibe
> coding and agentic engineering, and you are on one side of it or the other.
> <a href="/steps/step2/evolution">Project evolution</a> put you on the other side for an hour, on a
> version built to be thrown away, and that is the one place the line does not hold.

(NL)

> Goede agentic projecten beginnen bij goede software engineering. Dat is meteen het verschil tussen
> vibe coding en agentic engineering, en je staat aan de ene kant of aan de andere.
> <a href="/steps/step2/evolution">Projectevolutie</a> zette je er een uur lang aan de andere kant
> van, op een versie die je toch weggooit, en dat is de enige plek waar die lijn niet geldt.

---

## 2. Truthfulness

### 1. "a Sonar reliability score" is not what the metric is called

**Where** `engineering.quality-gates.1`

**Problem** SonarQube's metric is a **Reliability Rating**, an A-to-E grade, not a score. In a unit
whose whole argument is "name the thing you want", the one vendor noun on the page is the wrong
noun. (Flagging with the usual caveat that Sonar's metric vocabulary has moved more than once; the
word to avoid either way is "score", which the product does not use for this.)

**Fix** Folded into §1.1 above: "So does a Sonar reliability rating."

### 2. `mvn verify` runs no analysis in this repository

**Where** `engineering.quality-gates.2`

**Problem** "A hook fires when the agent says it is finished, `mvn verify` runs the analysis…" The
root `CLAUDE.md` states flatly: "No static analysis runs on the default Java build; plain
`mvn verify` adds nothing beyond packaging. Step 2's `graded` profile is the only exception." So the
one concrete command in the section, in a course whose rule is "Name a real file, command, or moment
from this repo", is the command that in this repo does not do what the sentence says. A student who
tries it in `kata/step2/java` gets packaging and nothing else.

I do **not** recommend naming `-Pgraded` here: `workshop` owns that profile and the step's
`CLAUDE.md` places this section four units ahead of it on purpose. Rate this **accept-or-reword,
low**. If reworded, the honest version keeps the command and owns its genericness:

**Fix** (optional, EN) "…`mvn verify` runs whatever analysis your build has wired in, and a number
under the floor…" / (NL) "…`mvn verify` draait wat je build aan analyse heeft ingebouwd, en een
cijfer onder de drempel…"

### 3. The hook event is one `setup` never listed

**Where** `engineering.quality-gates.2` against `setup.hooks.1`

**Problem** `setup.hooks.1` enumerates three moments a hook can fire against: "before a tool runs,
after a file is written, when the session ends". "When the agent says it is finished" is a fourth
(Claude Code's `Stop`, distinct from `SessionEnd`), introduced here with no signal that it is new.
Minor on its own; it matters because of §3.2 below, where the reader needs to *see* that this is a
different moment in order to reconcile the two units.

**Fix** Either fold the moment into `setup.hooks.1`'s list ("…when the agent says it is finished,
when the session ends") or let §3.2's rewrite do the work here. §3.2's rewrite is enough on its own.

---

## 3. Progression

### 1. `Quality gates` opens on a promise it does not keep, and claims a unit it does not own

**Where** `engineering.quality-gates.1`, sentence 1

**Problem** "Skills and hooks turned up in project setup as things a project holds. **This is where
you put them to work.**" Skills are never put to work in this section, or anywhere in this unit.
Both paragraphs are about metrics and a hook. Worse, the step's own `CLAUDE.md` assigns skills
elsewhere in as many words: "`patterns` owns turning a repeated correction into a skill." So the
sentence promises something the section does not deliver *and* claims ownership of an argument two
units downstream.

It is also the wrong shape for a section opener. The lesson-writing skill's first voice rule is
"Open cold on the claim"; this opens on housekeeping. The section's actual claim is the sentence
after it.

**Fix** (EN, `engineering.quality-gates.1`, replacing sentences 1 and 2 and folding in §1.1)

> Line coverage and mutation coverage still tell you whether software is fit to ship. So does a
> Sonar reliability rating. They also hand an agent an invariant, something fixed to hold itself to
> while it works <svg data-icon="gem"></svg> Each of them is a proxy, though, and an agent will
> satisfy a proxy rather than the thing behind it. The gate worth wiring in is the one that is
> expensive to fake.

(NL)

> Line coverage en mutation coverage zeggen nog altijd of software klaar is om te leveren. Een Sonar
> reliability rating ook. Ze geven een agent ook een invariant, iets vast om zich aan te houden
> terwijl hij werkt <svg data-icon=\"gem\"></svg> Elk van die drie is wel een proxy, en een agent
> voldoet aan de proxy in plaats van aan wat erachter zit. De gate die het waard is om in te bouwen,
> is degene die duur is om te faken.

The pointer back to `setup` is not lost: `quality-gates.2` already names `CLAUDE.md` and the hook,
which is the same handshake without the false promise. If a link back to `setup` is wanted, it
belongs on the hook in paragraph 2, not over the metrics in paragraph 1.

### 2. It tells the reader to fire `mvn verify` from a hook, one unit after `setup` said keep hooks fast

**Where** `engineering.quality-gates.2` against `setup.hooks.3`

**Problem** `setup.hooks.3` closes with "Then keep it fast and keep it narrow. That script runs on
every Write and every Edit, and a broken one hands the agent an error it did not cause". The very
next unit's Quality gates section wires a full `mvn verify` into a hook. `mvn verify` is the
slowest thing in the kata. The two units are one page apart and the course never reconciles them.

The reconciliation is real and cheap: `setup`'s warning is about a `PostToolUse` hook, which fires
per edit; this is a `Stop` hook, which fires once. But nothing on either page says so, and the
reader is left holding two instructions that contradict on their face. The step's `CLAUDE.md`
records that `setup`'s Hooks section is "the only place in the step that teaches hooks", so the fix
must not become a second hooks lesson: one clause naming the moment is enough, and it doubles as the
fix for §2.3.

**Fix** (EN, `engineering.quality-gates.2`)

> Wire that into the run rather than into your memory. A hook fires once the agent says it is
> finished, which is the one moment a hook can afford to be slow. <code>mvn verify</code> runs the
> analysis, and a number under the floor comes back as a failure it has to answer for. The same rule
> written into <code>CLAUDE.md</code> is a request. This one runs whether the agent remembers it or
> not.

(NL)

> Steek dat in de run in plaats van in je geheugen. Een hook vuurt zodra de agent zegt dat hij klaar
> is, en dat is het enige moment waarop een hook traag mag zijn. <code>mvn verify</code> draait de
> analyse, en een cijfer onder de drempel komt terug als een falen waar hij mee verder moet.
> Diezelfde regel in <code>CLAUDE.md</code> is een vraag. Deze draait, of de agent er nu aan denkt of
> niet.

### 3. The frame the lead opens is never closed (sharpening audit item 37)

**Where** end of `engineering.quality-gates.2` / the `<hr>` seam

**Problem** Audit item 37 asks for "one closing sentence" into `steering`. That is right, and it
undersells what is missing. `lead.1` opens the unit on a frame ("you are on one side of it or the
other") and the unit never returns to it: the last prose sentence is about a hook, and then the card
arrives. So the unit has *two* open ends, not one, and one closing sentence can shut both if it is
written to do so. A sentence that only says "next up, steering" would close the seam and leave the
frame hanging.

**Fix** (EN, new key `engineering.quality-gates.3`, before the `<hr>`)

> None of that is about the agent being careful. It is the side of the line you are standing on,
> written down where the work happens. What is left is the half you cannot write down in advance,
> which is what you do while a run is in flight.

(NL, `engineering.quality-gates.3`)

> Niets daarvan gaat over een agent die oplet. Het is de kant van de lijn waar jij staat,
> opgeschreven op de plek waar het werk gebeurt. Wat overblijft is het stuk dat je niet vooraf kunt
> opschrijven, en dat is wat je doet terwijl een run bezig is.

Note this pushes prose between the rule and the card, which the HTML comment and the step
`CLAUDE.md` both protect ("no prose between the rule and the card: the card's description carries
the setting, so a paragraph there would say it twice"). The protected gap is *between the `<hr>` and
the card*, not before the `<hr>`. Placing this above the `<hr>` respects the constraint; placing it
below breaks it. If the author disagrees, the alternative is a trailing clause on
`quality-gates.2` rather than a new paragraph.

---

## 4. Readability

### 1. "Use the correct language" reads as a question about programming languages

**Where** `engineering.use-correct-language.heading` (and the section's four key names)

**Problem** In a Java kata, immediately after a section about folder layout, "Use the correct
language" is a genuine garden path: a reader has to get four sentences in, to "Design pattern names,
layer names and the vocabulary of your domain", before the heading resolves. The Dutch has the same
ambiguity ("taal"), so this is not an English-only slip.

The evidence that the heading is not describing its section is in this repo: the deck's own summary
of it, `deck.engineering.divider.2`, reads "Pattern names and domain words are compression". The
slide knows what the section is about; the heading does not. The lesson-writing skill's test applies
directly: "read the heading and the first sentence together" — "Use the correct language" / "Name
the thing you want" do not obviously say the same thing, which is the tell that the heading is not
naming what the section is about.

**Fix** Rename the heading to **The right words** (EN) / **De juiste woorden** (NL). That is a plain
label naming the thing, which the skill prefers, and it keeps the section's imperative energy in its
first sentence where it already lives. Slug rule applies: this renames three keys in the HTML and
three in `nl.json`, `engineering.use-correct-language.heading` / `.1` becoming
`engineering.right-words.heading` / `.1`. Grep the old slug afterwards; nothing else points at it
(the deck uses `deck.engineering.*` keys, so the deck is unaffected).

I looked at whether the imperative form itself was the problem and it is not: `Run it on your own
machine`, `Give it its own worktree` and `Make it stop at the gap` are all imperative headings in
this step, so the form is house style. The defect is the ambiguity of "language", not the mood.

### 2. Nothing else stumbles

`domain-driven-design.1` is the densest paragraph in the unit (five sentences, two icons mid-stream)
and it holds, because the two halves are one argument and its payoff. "Both give you the logical
shape" points back at one named thing and one unnamed one, but the `<h2>` above supplies the name,
so it resolves. `port` never appears in the prose while the figure and the exercise both depend on
it, but the figure's own note ("a port, written by the domain") carries the definition, which is the
step's documented rule that a note beside a row is where an explanation goes.

---

## 5. Imagery

### 1. `DomainTree` is a fictional project and nothing on the page says so, while the card below asks the student to sort a real one against it

**Where** `front/src/steps/step2/DomainTree.tsx`, rendered at `data-figure="domain-tree"`

**Problem** The component's docblock ends "Nothing here exists in this repo. It is an example." That
is a code comment; a student never sees it. On the page the tree renders with no caption at all,
`FileTree` has no caption support, and the very next thing under the prose is a `TaskCard` that says
"Work out where its packages would sit **in the shape above**". A reader who takes the tree for a
real project in this repository will go looking for `be/smartagents/article` and not find it, and
that confusion lands on the one exercise the unit has.

This is not a taste call. The repo has a settled convention for exactly this and applies it
elsewhere: `audit.caption` reads "An example security audit, not a run against this repository", and
the step `CLAUDE.md` records that caption as a decision. The user's own memory note is "Captions name
the source only." `DomainTree` is the one fictional figure sitting directly above an exercise that
compares it to a real project, and it is the one missing the caption.

**Fix** Add an optional caption to `FileTree` (one `<figcaption>`, same shape `AuditExample` uses)
and give `DomainTree` a key:

- `en.json` `domain-tree.caption` = `An example project, not one in this repository.`
- `nl.json` `domain-tree.caption` = `Een voorbeeldproject, geen project uit deze repository.`

`ProjectTree`, `SkillTree` and `HookTree` in `setup` are fictional too and do **not** need this: none
of them sits under an exercise asking the student to find the real version. Do not caption all four
"for consistency"; the caption is there to stop one specific confusion.

### 2. `DomainTree` otherwise clears the bar, and no second figure belongs here

A tree is exactly the thing prose cannot carry: the depth of `adapter/incoming/web/rest`, the notes
"the JPA annotations stop here" and "implements ArticleRepository", and `author/` sitting empty to
say the shape repeats are all things the paragraph could only assert. It earns its place.

I considered and reject two candidates, and both fail the repo's stated bar (a figure must carry
what the sentences do not):

- A decay curve under `lead.2` (output rising while "code you could explain" falls, crossing at
  "about an hour"). This is a picture of a claim the paragraph already makes, which the BRIEF says is
  the thing to cut. It would also invent a measurement.
- A spread drawing under the vocabulary section ("Clean this up a bit" fanning to five plausible
  moves against one). Closer, because the five moves are content the prose does not carry, but
  `ScriptRuns` in `patterns` already owns variance drawn as spread, and the step `CLAUDE.md` is
  explicit that no figure may borrow another's argument. Not worth the collision.

One factual snag the figure creates for the prose, low priority: `domain-driven-design.1` says
"Nothing above `adapter/` names Postgres or S3", and the figure draws
`src/main/resources/application.properties` (noted "points Liquibase at the changelog below"), which
is where a Postgres JDBC URL lives and which is not under `adapter/`. Tightening the claim to "No
class outside `adapter/` names Postgres or S3" would cost nothing and close it.

---

## 6. Supporting tasks

**The card is right and the unit needs nothing else.** `WhereWouldItGo` is one of the better-designed
exercises in the kata: it works because the figure and `kata/step2/java` genuinely disagree, it names
none of the disagreements and gives no count (verified: the card's five moves contain no arithmetic),
and the fifth move carries the "accept nothing" warning twice because a package rename would break
`mvn verify -Pgraded`, the `challenge` tests and the native-image flag before the student reaches the
capstone. That warning is load-bearing and correct.

Two things I considered adding and reject:

- **A second card or instruction for the `Quality gates` section.** The reader is told to wire a
  build into a hook and never asked to write one, which is a genuine axis-6 gap. But the fix is
  blocked in both directions: a hooks `<pre>` here would make `engineering` a second site teaching
  hooks, which the step `CLAUDE.md` forbids ("It is now the only place in the step that teaches
  hooks"), and an instruction to add a `Stop` hook running `mvn verify` to this repo's own
  `.claude/settings.json` would fire on every stop across the whole kata. §3.2's clause is the right
  size of answer.
- **Anything asking the student to run the vocabulary experiment.** The one shape that would not
  modify the workshop's subject is a plan-mode comparison, and move 5 of the existing card already
  spends plan mode on this same project. A second plan-mode task one screen away dilutes both.

---

## 7. Quiz

**The unit does not need one, and I would not block on adding it.** It carries a card, and the step
already carries two quizzes (`workflows`, `goals`). `audit.md` asks for quizzes in `steering` and
`patterns`, not here, and both of those units have nothing else for the student to do. This one does.

If one is wanted anyway, exactly one question is worth asking, and it is not the proxy trap. The
proxy trap has three homes already (`workshop.honest.1`, `engineering.quality-gates.1`,
`workshop.flag.honest.help`) and the workshop's honest flag is built to teach it by doing; a question
here pre-empts the capstone's own discovery. The question that does not collide with anything is the
one `quality-gates.2` exists to correct, and its best distractor is something `setup` has just
taught the reader to believe:

> **You want every change checked against a coverage floor before you look at it. Where does the
> rule go?**
>
> - In `CLAUDE.md`, so the agent reads it at the start of every session. *(the strong distractor:
>   `setup` has just told them `CLAUDE.md` is read every session, and the reader has to work out that
>   read is not the same as run)*
> - Restated in the prompt each time you hand work over. *(believable, and the thing people actually
>   do)*
> - **In a hook that runs the build when the agent says it is finished.** *(correct)*
> - In a comment at the top of the test class. *(weak but plausible for a Java reader)*

Answer line: a `CLAUDE.md` rule asks and a hook happens, which is the whole distinction the section
turns on.

---

## 8. EN/NL parity

Full parity on prose keys: all eleven `engineering.*` blocks in the HTML have `nl.json` entries, and
no entry is orphaned. The Dutch is real Dutch rather than translated English ("Maak dit wat properder"
for "Clean this up a bit" is better than a literal rendering). Three divergences.

### 1. `engineering.title`: EN "Engineering", NL "Vakmanschap"

**Where** `locales/en.json` / `locales/nl.json`, `engineering.title`

**Problem** The Dutch says *craftsmanship*; the English says *Engineering*, inside a step whose own
title is *Agentic engineering*. So the English sidebar reads "Agentic engineering › Engineering" and
tells the reader nothing about the unit, while the Dutch reads "Agentic engineering › Vakmanschap"
and tells them what it is about. Under the repo's own rule the Dutch is the version that was thought
through and the English is what gets rewritten. It is also the Dutch that matches `lead.3`
("Software engineering has always been a craft" / "altijd een ambacht geweest").

**Fix** `en.json` `engineering.title` = `Craft`. The unit **id** stays `engineering`, so no URL, no
prose key, no deck eyebrow and no `audit.md` row identifier moves; this is one string.

### 2. The Dutch bundle contradicts itself on "expensive to fake"

**Where** `nl.json` `engineering.quality-gates.1` against `nl.json` `deck.engineering.gates.note`

**Problem** The unit's Dutch says "degene die je **moeilijk** kunt faken" (hard to fake); the slide's
Dutch says "de check die **duur** is om te faken" (expensive to fake). The English says "expensive"
in both places. The course runs on two metaphors and one of them is money, so "duur" is the load-
bearing word and the unit prose is the one that dropped it. This is a page and a projector saying two
different things to the same Dutch room.

**Fix** `nl.json` `engineering.quality-gates.1`, last sentence: "De gate die het waard is om in te
bouwen, is degene die **duur is om te faken**." (Already folded into §3.1's replacement text above.)

### 3. `deck.engineering.divider.3`: EN "run", NL "build"

**Where** `en.json` / `nl.json`, `deck.engineering.divider.3`

**Problem** EN "Gates go in the run, not in your memory"; NL "Gates horen in de **build**, niet in je
geheugen". The unit prose says "the run" / "de run" in both languages. Minor, but it is the same
word doing the same job three times and the slide is the one that drifts.

**Fix** `nl.json` `deck.engineering.divider.3` = `Gates horen in de run, <mute>niet in je
geheugen</mute>`.

One place the Dutch is simply better and the English could be pulled toward it, offered rather than
filed as a defect: `deck.engineering.gates.title` NL reads "een agent **maakt hem groen**" (makes it
green) where EN reads "an agent will satisfy it". The Dutch is the more concrete verb and it is the
thing that actually happens.

---

## Verdict

**needs-work**, and it is close to strong. The prose is genuinely human, the card is one of the best
exercises in the kata, and `DomainTree` earns its place. What holds it back is that its last section
is the weakest thing in the unit: `Quality gates` opens on a promise it does not keep (skills are
never put to work here, and `patterns` owns that argument), then tells the reader to fire `mvn
verify` from a hook one page after `setup` told them to keep hooks fast, and never reconciles the
two. Around that sit a figure that a student can mistake for a real project at exactly the moment
the exercise asks them to compare it to one, a heading whose noun points at the wrong thing, and a
Dutch bundle that says two different things about the same gate. None of it is a rewrite. All of it
is four keys and a caption.

Priority order:

1. **`quality-gates.1` sentence 1** — cut the unkept "skills" promise, open on the claim, fold in the
   tricolon break and the Sonar naming fix. One paragraph, EN and NL. (§3.1, §1.1, §2.1)
2. **`quality-gates.2`** — one clause naming the moment, which reconciles the fast/slow contradiction
   with `setup.hooks.3` and quietly introduces the fourth hook event. (§3.2, §2.3)
3. **`DomainTree` caption** — a `<figcaption>` on `FileTree` and two locale keys, so the fictional
   tree cannot be read as this repository right above the card that compares a real one to it. (§5.1)
4. **Heading rename** — `Use the correct language` → `The right words` / `De juiste woorden`, with
   the slug rename across the HTML and `nl.json`. (§4.1)
5. **`engineering.title`** — EN `Craft`, matching the Dutch and stopping the sidebar from reading
   "Agentic engineering › Engineering". One string. (§8.1)
6. **Closing paragraph before the `<hr>`** — closes the vibe-coding frame `lead.1` opens *and* hands
   into `steering`, which is audit item 37 done properly rather than a bare pointer. (§3.3)
7. **`lead.1` sentence 2** — replace the announced bluntness with the blunt sentence. (§1.2)
8. **Two one-word fixes** — `nl.json` `deck.engineering.divider.3` "build" → "run", and tightening
   "Nothing above `adapter/`" to "No class outside `adapter/`". (§8.3, §5.2)
