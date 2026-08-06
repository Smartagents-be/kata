# Dossier: step 0 / `backend` ("The backend")

Files read: `front/src/steps/step0/CLAUDE.md`, `units/backend.html`, `index.tsx`, `locales/nl.json`,
`locales/en.json`, `code.ts`, `CodeCheck.tsx`, `deck.tsx`, `quiz.ts`,
`kata/step0/java/{pom.xml,CLAUDE.md,src/test/.../IntroRevealIT.java}`,
`front/src/shared/lib/content.ts`, `front/src/shared/mode/mode.ts`, `audit.md`,
`.claude/skills/lesson-writing/SKILL.md`.

Scale: 5 prose keys, ~172 words, one `data-figure` slot (an answer box, not a drawing), no quiz.
Thinnest unit in the course, and it is unit 2 of 25.

**Note before anything else: `front/src/steps/step0/CLAUDE.md` does not mention this unit.** Every
paragraph of it is about `welcome`, the assistant setting and the house rules. So unlike every other
unit I could have been handed, `backend` has no recorded reasoning to weigh a finding against. That
absence is itself a defect under this repo's own rules, and it means the decisions below have to be
judged on the files rather than on the notes.

---

## 1. AI tells

**None.** I looked hard and found nothing to report. There are no tricolons, no "it's not just X",
no announcing opener, no "crucial"/"seamless"/"leverage", no summary paragraph, no closing sentence
that gestures at significance, no decorative analogy. "There is also a Java backend, and it is not
one project" is the house move (negate the wrong model, then state the right one) and it is good.
"Do it right and a flag becomes available" is limp, but limp is not machine-written; it is under
Readability below.

Do not let a later pass "improve" the rhythm of this unit. Its problems are factual and structural,
not stylistic.

---

## 2. Truthfulness

### 1. The unit states a mechanism that does not exist

**Where** `backend.code-blocks.1` (`backend.html:17-20`) and its Dutch sibling
`nl.json:48`.

**Problem** "It matters that you use them and drive them through your AI agent, or the flag will not
show up."

That is false. `kata/step0/java/pom.xml`'s `intro` profile wires failsafe to `IntroRevealIT`, and
`IntroRevealIT.printsTheIntroFlag()` unveils the string and prints it. There is no check of any kind
on who invoked Maven, and there could not be. A student who pastes `mvn verify -Pintro` into their
own terminal gets the flag in about fifteen seconds and has now caught the course lying on page two,
at exactly the moment it is trying to establish the house rules. The Dutch repeats the error
("anders zal de flag niet tonen").

What the sentence is reaching for is `welcome.house-rules.1` ("Only your agent hunts"), which is a
rule, not a mechanism, and which is honest about being one.

**Fix** (English):

> Some pages hand you a code block, like the one below. Give it to your agent to run rather than
> pasting it into a terminal yourself. Nothing in the build checks which of you ran it. House rule
> one is the reason, and this is the cheapest place in the course to start keeping it.

(Dutch):

> Sommige pagina's geven je een codeblok, zoals dat hieronder. Laat je agent het draaien in plaats
> van het zelf in een terminal te plakken. De build controleert niet wie van jullie het gedraaid
> heeft. Huisregel één is de reden, en dit is de goedkoopste plek in de cursus om er aan te beginnen.

### 2. The prerequisites are never stated, anywhere in the course

**Where** `backend.lead.1` (`backend.html:1-7`), and by omission the whole of `front/src/steps/`.

**Problem** This is the first page that asks the student to run anything, and it asks them to
`cd kata/step0/java`. Nothing on this page or any other tells them to get the repository onto their
machine, and `grep -rniI "clone\|jdk\|maven" front/src/steps/*/units/*.html` returns three
incidental mentions across 25 units and no instruction. All four poms pin
`<java.version>25</java.version>`, so a student on a JDK 21 (still the common corporate default)
fails at the first compile with a message that says nothing about this course. "Open the folder for
the step you are on" assumes a folder the reader has never been told to obtain.

This is the single cheapest large win in the unit: it is the natural home for the setup line and the
course has nowhere else to put it.

**Fix** A new paragraph after `lead.1`, renumbering the current `lead.2` to `lead.3`:

> Get this repository onto your machine first, with a JDK 25 or newer and Maven on your path. All
> four projects pin Java 25 in their `pom.xml`, so an older JDK stops at the first compile.

(Dutch):

> Zet deze repository eerst op je machine, met een JDK 25 of nieuwer en Maven op je pad. Alle vier
> de projecten pinnen Java 25 in hun `pom.xml`, dus een oudere JDK strandt op de eerste compile.

### 3. "Every step has its own under `kata/`" over-promises

**Where** `backend.lead.1`, `backend.html:2-3`.

**Problem** There are four `kata/stepN/java` folders, but `kata/step3/java` is documented in the
root `CLAUDE.md` as "an empty scaffold, buildable, kept as the template a Java step is copied from",
and step 3 in the curriculum is soft skills with no Java behind it at all. So the reader is told
every step has a project and then told "open the folder for the step you are on", which for the last
module of the course is wrong. Three steps have one.

**Fix** Name them instead of generalising. In the replacement `lead.1` below.

### 4. "only one of them runs at a time" is true but the symptom is not named

**Where** `backend.lead.1`, `backend.html:5-6`.

**Problem** Verified: neither `application.properties` sets `server.port`, so step 1 and step 2 both
take the Boot default 8080. The claim is correct. What is missing is the thing that makes it useful:
the student who leaves step 1's service up and then starts step 2's meets a boot failure that reads
as their fault. Naming the failure is the house move ("Tell the failure as a scenario") and this is
the one place in the course it can be named.

**Fix** Whole replacement `lead.1`:

> There is Java behind this kata, and it is not one project. Three steps have their own under
> `kata/`: `kata/step0/java`, `kata/step1/java` and `kata/step2/java`, each with its own `pom.xml`
> and its own Maven build. Open the folder for the step you are on and run Maven from in there. Two
> of them boot a service on port 8080, so only one runs at a time. Start the second while the first
> is still up and the boot fails on the port rather than on anything you did.

(Dutch):

> Achter deze kata zit Java, en dat is niet één project. Drie stappen hebben er een eigen onder
> `kata/`: `kata/step0/java`, `kata/step1/java` en `kata/step2/java`, elk met een eigen `pom.xml` en
> een eigen Maven-build. Open de map van de stap waar je mee bezig bent en draai Maven van daaruit.
> Twee ervan starten een service op poort 8080, dus er draait er maar één tegelijk. Start de tweede
> terwijl de eerste nog loopt en het opstarten valt over de poort, niet over iets wat jij deed.

If somebody is willing to run it and confirm the exact string, Boot's own message ("Port 8080 was
already in use") is better than my paraphrase. I did not run a build, because this pass is read-only
and a Maven run writes `target/`.

### Verified and correct

- `mvn verify -Pintro` matches the `intro` profile id in `kata/step0/java/pom.xml`. ✓
- `cd kata/step0/java` is right relative to the repo root. ✓
- The red-herring warning is real: `kata/step1/java/CLAUDE.md` documents six decoys in the same
  shape as the flags, and step 2's sources carry `{tier}` path templates that a naive grep hits. ✓
- `/steps/step1/tokens` is a live route and `tokens` is step 1's first unit. ✓
- `flag.panel.done`'s "exactly what step 2's workshop asks for" is true: step 2's flags come out of
  `mvn verify -Pgraded`. ✓
- No em-dashes or en-dashes in either file. ✓

---

## 3. Progression

### 5. In guided mode, which is the default, the exercise loses the command it depends on

**Where** `backend.html:22-23` (the `<pre>` block) against `shared/lib/content.ts:prepareUnit` and
`shared/mode/mode.ts:DEFAULT_MODE`.

**Problem** `DEFAULT_MODE` is `guided`. `prepareUnit` in guided mode drops every top-level node that
is not a figure marker or an adopted heading. The `<pre><code>cd kata/step0/java / mvn verify
-Pintro</code></pre>` is a top-level node and it is not a figure, so it goes. What a default-mode
student actually sees on this page is: the heading "Test yourself", and a card whose own hint text
reads **"Run the block above through your agent."** There is no block above. Press Hint and the
dialog says "ask it to run the block above" (`flag.panel.help`, both locales). Two dangling
references, on the second page of the course, in the shipped default.

And the tutor has no rescue: `deck.tsx`'s docblock deliberately keeps the profile off the board
("naming its Maven profile or either printed code is naming the answer"). So in a guided room the
command is on nobody's screen. The intent behind that deck decision is sound; the consequence was
not traced.

This is my strongest finding and it is not in `audit.md`. Item 26 records only "Still the thinnest
unit in the course".

**Fix** Two options, and the first is better because it also fixes finding 8:

1. Put the command inside a figure (see finding 7). Figures are the one thing guided mode keeps, so
   the command survives the cut for every reader in both modes.
2. Failing that, move the command into `flag.panel.help` in both locales and reword
   `flag.panel.hint` from "Run the block above through your agent" to "Run this step's build through
   your agent."

Whichever is chosen, `code.panel.hint` and `code.panel.help` on `welcome` have the identical bug
("the paragraph above", "the paragraph just above this box") and should be fixed in the same pass.
Out of scope for this dossier, same root cause.

### 6. The unit re-argues a rule `welcome` already owns, and gets it wrong doing so

**Where** `backend.code-blocks.1` against `welcome.house-rules.1` and `welcome.house-rules.4`.

**Problem** `welcome` closes on five house rules, two of which are exactly this claim: "Only your
agent hunts. Do not go reading the code yourself" and "Make it run the check. Have the agent run the
thing and print the answer instead." One click later `backend` states the same thing in weaker words
and attaches a false consequence to it (finding 1). Step 0's own `CLAUDE.md` is emphatic that the
house rules are stated once and pointed at from elsewhere, and that `step1/workshop`'s `lead.2`
carries the link. `backend` sits between those two units and does neither.

**Fix** The replacement text in finding 1 names the rule ("House rule one is the reason") instead of
restating it. That is the shape the step's notes already licence.

---

## 4. Readability

### 7. Two sentences are hedged into meaninglessness

**Where** `backend.lead.2`, `backend.html:10-11`.

**Problem** "A module can point you at a job to do in its own step's project. Do it right and a flag
becomes available." Modal hedge ("can"), agentless ("becomes available"), and no concrete noun in
either sentence. The lesson-writing skill bans both by name: "Hedge with frequency, not with modals"
and "Second person, active voice".

In fairness, the vagueness is partly load-bearing: the mechanism genuinely differs between steps
(step 0 prints, step 1 hides in a running service, step 2 prints from a graded profile), so a
sentence that commits to "the build prints it" would be wrong. The fix has to keep the range while
losing the hedge.

**Fix**

> That code is what the exercises work against. A unit points you at a job in its own step's
> project, and doing the job is what puts the flag within reach: sometimes the build prints it,
> sometimes you have to go and find it. From step 1 on, watch out for red herrings: a string in
> braces is not always the one you are after.

(Dutch):

> Die code is waar de oefeningen op werken. Een unit wijst je een opdracht aan in het project van
> die stap, en die opdracht doen is wat de flag binnen bereik brengt: soms print de build hem, soms
> moet je hem zelf gaan zoeken. Let vanaf stap 1 op red herrings: een string tussen accolades is
> niet altijd degene die je zoekt.

### 8. "also" has no antecedent, and the unit's own title contradicts its first clause

**Where** `backend.html:1-2`.

**Problem** "There is **also** a Java backend" is the first sentence of the unit, and `welcome`
never mentioned a frontend, a backend, or any code at all. There is nothing for "also" to be beside.
Meanwhile the sidebar title is "The backend" (`backend.title`), and the root `CLAUDE.md` is explicit
that "There is no such thing as 'the backend' any more: there is the step whose service you are
running." The sentence is correcting a framing the unit's own title installs.

Minor, and the second clause does the repair, but the replacement in finding 4 drops "also" and
starts on the claim.

### 9. Two names for the same thing inside one step

**Where** `backend.html:19` ("your AI agent") against `welcome.html:2` ("a coding agent").

**Problem** The lesson-writing skill allows "AI agent" in step 0 "where the term is introduced", but
step 0 introduces it as "coding agent" in `welcome` and then calls it "AI agent" here. Pick one.
Dutch has the same split (`coding agent` / `AI-agent`).

**Fix** The replacement in finding 1 uses "your agent", which is what the house rules two paragraphs
earlier already use ("Only your agent hunts").

---

## 5. Imagery

### 10. One figure earns its place, and it is also the fix for finding 5

**Where** a new `<div data-figure="intro-loop"></div>` between the `<pre>` block and the `<hr>`.

**Problem being solved** The unit's only `data-figure` slot holds `CodeCheck`, an answer box.
`audit.md` Table 2 counts it as "1 fig", which flatters the unit: there is no drawing on this page.
More importantly, guided mode keeps figures and nothing else, so a drawing is the only channel
through which a default-mode student can be told anything at all here.

The claim a drawing settles that the prose cannot: **who does which part of the loop, and that the
flag never crosses a network.** Right now that is asserted across four sentences in two units
(`welcome.house-rules.1`, `.4`, `backend.code-blocks.1`, and `CodeCheck`'s own docblock, which the
student never reads) and drawn nowhere.

**What it draws** Four nodes left to right, arrows between them, a band under them naming the actor:

| # | node | mono line under it | band |
|---|---|---|---|
| 1 | your agent | `cd kata/step0/java` / `mvn verify -Pintro` | the machine |
| 2 | the build | `[x] intro complete   {……}` (braces empty, greyed) | the machine |
| 3 | you | "read the string in braces" | you |
| 4 | the box on this page | "checked in your browser" | you |

One note off node 4: "no network, so this works with every service down." Teal on nodes 1 and 3
(the two that act), muted on 2 and 4, which is the design system's subject colour doing its usual
job.

**What the reader takes from it** The command, in the one mode where the prose is gone. Which half
of the loop is theirs. And that the grading is local, which the course states nowhere on a page and
which is the reason every board here works offline.

**Prohibition check** It prints no flag: node 2's braces are empty. Naming the profile is allowed
here because the root `CLAUDE.md` reserves it for "the unit that sets it", and this is that unit.

**Ripple** `deck.tsx`'s docblock currently reads "No figures", and its reasoning ("naming its Maven
profile or either printed code is naming the answer") is exactly why this figure must stay off the
board too. That comment needs one line amending, not deleting.

No existing figure in this unit fails the bar, because there is no existing figure.

---

## 6. Supporting tasks

### 11. A TaskCard for the toolchain, before the flag box

**Where** after the new prerequisites paragraph (finding 2), before the `Code blocks` heading.

**Problem** Finding 2 fixes the prose, but a prose sentence about JDK versions is exactly the kind
of thing a reader skims and then spends twenty minutes debugging. This is the one place in the
course where doing genuinely beats reading, because every item is a failure the student will
otherwise hit *inside* the flag box, where nothing can diagnose it for them.

**Shape** `TaskCard`, block `run-the-build`, ungraded, four ticks:

1. This repository is on your machine.
2. `java -version` says 25 or newer.
3. `mvn -v` runs.
4. `cd kata/step0/java && mvn -q verify` finishes green and prints nothing.

Item 4 is the load-bearing one: it is the same project and the same tool the exercise uses, minus
the profile, so a green silent run proves the whole chain before the flag is at stake. The pom's own
comment confirms it stays green and silent by default; I did not run it, being read-only.

The unit already has one thing to do, so this is a second. That is defensible for a unit that is 172
words and the thinnest in the course, and it is the kind of second thing (a checklist, not a puzzle)
that costs a fast reader ten seconds.

---

## 7. Quiz

**The unit does not need one, and should not get one.** Three reasons, in order of weight:

1. It already has the harder test. The code box requires the student to get a JDK, Maven, the repo
   and an agent working together and read a real build's output. No multiple-choice question in this
   course asks for more.
2. The unit teaches procedure, not a claim a reader can hold a wrong model of. The only genuinely
   mistakeable fact is the shared port, and the honest fix for that is naming the failure in the
   prose (finding 4), which costs one clause and works for the reader who never takes the quiz.
3. `welcome` carries step 0's one question already, one click earlier, and the step's notes describe
   it as "the lightest question in the kata on purpose". A second light question immediately after it
   would make the intro read as a test rather than a warm-up.

For the record, I did consider and reject: "You are running step 2's service and want to run step
1's. What happens?" The distractors are believable, but the answer is in the paragraph three inches
above and the question would be measuring reading speed.

---

## 8. EN/NL parity

Every prose key in `backend.html` has a Dutch entry: `backend.lead.1`, `backend.lead.2`,
`backend.code-blocks.heading`, `backend.code-blocks.1`, `backend.code-blocks.2`. Plus the whole
`flag.panel.*` block and `backend.title`. Structural parity is clean, and `audit.md`'s "Dutch
completeness ●" holds for this unit.

Two content problems.

### 12. `instrumenteert` is the wrong verb, and it collides with step 1's exercise

**Where** `nl.json:48`, `backend.code-blocks.1`.

**Problem** English: "drive them through your AI agent". Dutch: "ze met je AI-agent instrumenteert".
*Instrumenteren* means adding instrumentation, which in this repo is specifically what step 1 asks
the student to do to the catalogue pipeline. A Dutch reader is told, on page two, to instrument a
code block. It is not a translation of "drive through", it is a different verb that already means
something else here.

**Fix** The Dutch replacement in finding 1 uses "Laat je agent het draaien", which is what a Dutch
colleague would actually say.

### 13. The Dutch `lead.2` is worse than the English, which is the reverse of the usual

**Where** `nl.json:46`, `backend.lead.2`.

**Problem** "Tijdens de modules kan er gerefereerd worden naar een opdracht die je moet doen in het
project van die stap. Als je ze correct uitvoert zal er een flag beschikbaar zijn."

That is agentless passive twice over ("kan er gerefereerd worden", "zal er beschikbaar zijn"),
"gerefereerd worden naar" is officialese, and "ze" refers back to a singular "opdracht". The English
is limp (finding 7); the Dutch is limp *and* bureaucratic.

Repo policy is that where the two disagree the Dutch is usually the truer version and the English is
what gets rewritten. **This is the exception, and it is worth saying out loud so the next pass does
not apply the rule mechanically here.** Both sides need writing; the English is the better starting
point. Replacements for both are in finding 7.

---

## Verdict

**needs-work.** This is the weakest unit I would expect to find in this course, and its weakness is
not stylistic. In 172 words it manages one sentence that is factually false about its own build, one
that over-promises the repo layout, an unstated toolchain requirement that will strand a real
fraction of readers, and a default rendering mode in which the exercise's own hint points at a
command that has been stripped from the page. It also has no entry in its step's `CLAUDE.md`, which
is why none of that was caught: this is the one unit in the course with no recorded reasoning to
check a change against. The prose that is there is human and unshowy and contains no AI tells at
all, so the repair is additive rather than a rewrite. The good news is that the fixes are cheap and
they compound: one figure closes the guided-mode hole, gives the unit its first drawing, and moves
it off the bottom of the audit's cadence table.

Priority order:

1. **Fix the false claim** in `backend.code-blocks.1`, both languages (finding 1). One paragraph.
   Nothing else on this list matters if the course is caught lying about how grading works.
2. **Close the guided-mode hole** (finding 5). Either the figure or the `flag.panel.hint`/`help`
   reword. The default mode currently ships a broken page.
3. **Add the prerequisites paragraph** (finding 2) and, with it, the toolchain TaskCard (finding 11).
   This is the course's only home for "get the repo, get a JDK 25".
4. **Rewrite `lead.1`** for the step-3 over-promise and the port symptom (findings 3 and 4).
5. **Rewrite `lead.2` in both languages** (findings 7 and 13), noting that here the English leads.
6. **Draw `IntroLoop`** (finding 10), if it was not already done as the answer to item 2, and amend
   `deck.tsx`'s "No figures" note to say why it stays off the board.
7. **Write the `backend` section of `front/src/steps/step0/CLAUDE.md`.** Everything above happened
   because it is not there.

Ripple to check after any of this lands: `audit.md` item 26 and Table 2 row 2 (word count, figure
count), `deck.tsx`'s docblock, the `backend.lead.2` → `lead.3` key renumbering in both locale files,
and `welcome`'s identical `code.panel.hint`/`help` dangling references.
