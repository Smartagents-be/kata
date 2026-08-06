# Dossier: step3 / change

Read first: `front/src/steps/step3/CLAUDE.md`, `.claude/skills/lesson-writing/SKILL.md`, `audit.md`
rows 16, 17, 18, 19, 20, 22 and 45. Everything below is measured against those.

Known gaps already recorded in `audit.md`, not claimed as discoveries here: the unit opens cold
because step 2's `workshop` does not hand into it (row 45); nothing anywhere in step 3 is graded or
quizzed (row 20); no unit in the course says how this way of working gets *started* in a team
(row 18); nothing anywhere asks what may leave the building (row 19).

## 1. AI tells

The prose is human and it is among the best writing in the course. Short declaratives, willing to
state a view, fragments used on purpose ("A book returned twice. A return dated before the loan."),
paragraphs of uneven length. `process-was-bottleneck.1` in particular is four sentences that a
machine does not write: "Ten times the output, or five, or whatever the article said."

Two things that *look* like tells and are not, recorded so a later pass does not "fix" them:

- Five of six sections are exactly two paragraphs. That is `lesson-writing`'s own rule ("A section is
  a heading and one or two paragraphs"), not machine symmetry, and the paragraphs inside them run
  three to five sentences with no rhythm.
- `change.lead.2` and `environment-beats-project.1` each carry a list of three. The brief allows one
  list; both are concrete nouns rather than three adjectives, and neither is a rhythm.

One real finding.

1. **Where** `change.you-test-engineer.2`
   **Problem** "Thinking of them is slow, which is the point. It is the part of the day worth being
   slow at." The clause "which is the point" is the sentence after it, in advance. It is the gloss
   the skill's question 7 asks you to cut, and it blunts the close, which is the good line.
   **Fix** Replace those two sentences with: `Thinking of them is slow. That is the part of the day
   worth being slow at.`
   Dutch, same cut: `Daar traag over doen. Dat is het deel van de dag waar traag goed is.` (or keep
   the existing second sentence and simply drop `net de bedoeling` clause: `Daar ga je traag over
   doen. Dat is het deel van de dag waar traag goed is.`)

## 2. Truthfulness

Verified and correct: the six outbound links all resolve to real step 2 units (`engineering`,
`evolution`, `enablement`, `patterns`, `workflows`, `setup`), one per section and no unit twice, as
the step's `CLAUDE.md` claims. Both halves of the assistant pair carry `data-assistant` and a key
ending in the same word. The `gem` icon is placed where the full stop would go, which is the
convention `step1/harness.html` sets. The `data-figure` marker is a top-level child, unwrapped. No
em-dashes in the HTML or in either locale file.

1. **Where** `change.way-working-decision.2` ("There is no PowerPoint in this course")
   **Problem** Two small overstatements in one sentence. (a) "The slides are HTML in the repository"
   is not what a student finds: the slides are `SlideSpec` entries in
   `front/src/steps/stepN/deck.tsx`, rendered by a vendored web component. (b) "so what is on the
   projector cannot drift from what is on your screen" is true only of the drawings.
   `front/CLAUDE.md` is explicit that the deck is "deliberately not a second rendering of the
   curriculum" and that **the figures are the one exception**; the slide text is authored separately
   and can drift freely from the unit. As written, the item claims the strongest possible version of
   a true-but-narrower fact, in the one list item that is about this repository and therefore the one
   a student can check.
   **Fix** `<strong>There is no PowerPoint in this course.</strong> The slides live in the repository
   and their drawings are the same figure components the units render, so the picture on the
   projector cannot drift from the one on your screen. Nobody decided PowerPoint was bad. The
   constraint that made it the obvious choice went away.`
   Dutch: `<strong>Er zit geen PowerPoint in deze cursus.</strong> De slides staan in de repository
   en hun figuren zijn dezelfde componenten als in de units, zodat het beeld op de beamer niet kan
   verschillen van dat op jouw scherm. Niemand vond PowerPoint slecht. De reden waarom het de
   logische keuze was, is weg.`

2. **Where** `change.you-test-engineer.2` ("put a floor and a ceiling under whatever the run
   produced")
   **Problem** Two defects in one clause. Grammatically a ceiling does not go *under* anything, and
   the reader stumbles on it; the Dutch repeats the slip word for word ("leggen een vloer en een
   plafond onder"), so it is a slip rather than an idiom. And the attribution is half right:
   `step2/engineering` names a floor ("a number under the floor comes back as a failure") and never
   names a ceiling. The complexity ceiling is `step2/goals`' ("Hand over a ceiling: no method above a
   cyclomatic complexity of ten") and `step2/workshop`'s flag. The pairing is the right idea, the
   unit named is only half its source.
   **Fix** `So write those down before the implementation exists. The quality gates in
   <a href="/steps/step2/engineering">the engineering unit</a> hold whatever the run produced between
   a floor and a ceiling, and the scenarios you add on top are the ones nobody reaches from the happy
   path. Thinking of them is slow. That is the part of the day worth being slow at.`
   Dutch: `Schrijf die dus op voor de implementatie bestaat. De quality gates in <a
   href="/steps/step2/engineering">de unit over vakmanschap</a> houden wat de run oplevert tussen een
   vloer en een plafond, en de scenario's die jij erbovenop zet, haalt niemand uit het happy path.
   Daar ga je traag over doen. Dat is het deel van de dag waar traag goed is.`

3. **Where** `change.business-moves-closer.2` ("why a loan renews at fourteen days and not thirty")
   **Problem** Low severity, but worth a decision rather than a shrug. Every other concrete noun in
   this unit's neighbourhood is the step 2 loans domain the student just worked
   (`you-test-engineer.1`'s three cases are in its vocabulary), so this reads as one more rule from
   it. It is not: `Loan` has `daysOverdue`, `renewed`, `lost`, `media` and `tier`, and there is no
   loan period anywhere in `kata/step2/java`. A student who goes looking for fourteen finds nothing.
   The number is invented in a course whose voice is "name a real file, command or moment".
   **Fix** Ground it in a rule that is in the code the student read, and which `step2/steering` and
   `step2/workflows` already put in the student's ear ("which tier gets a grace period"):
   `You end up knowing why staff get seven days of grace and an ordinary member gets none.`
   Dutch: `Je gaat weten waarom personeel zeven dagen respijt krijgt en een gewoon lid geen enkele.`
   If the author prefers the invented rule for being outside the kata on purpose, say so in the
   step's `CLAUDE.md`, because the next reader will flag it again.

## 3. Progression

The unit builds. `lead.1` is your half, `lead.2` names the three other people, and the six sections
walk out from you to the team to the environment without re-arguing a single step 2 claim: every
lean is a link plus one clause, exactly as the step's `CLAUDE.md` requires. I checked each of the six
against its target unit and none of them re-derives anything. `code-got-cheap` closes on the gates
staying, which is what stops the section reading as permission to stop caring. That pair of sentences
is load bearing and must survive any edit.

One thing I considered and am *not* raising as a defect: `lead.2` promises three other people, and
sections 4 to 6 are about the team, the codebase and the environment rather than those three. Adding
a foreshadowing line would be the announcing opener the brief bans, and the CLAUDE.md defends the six
sections as six audiences. Leave it.

1. **Where** `change.process-was-bottleneck.2`, and the figure above it
   **Problem** `PipelineShift` makes two arguments and the prose reads only one. The first, that
   taking the typing out barely moves the calendar, is picked up in the paragraph's opening sentence
   and that is well done. The second, the dashed strip showing that three parallel lanes need three
   times the verifying and get nowhere near it, is stated in no sentence anywhere in the course: not
   in this section, not in `you-test-engineer` two sections above (which owns "reading every line
   stops scaling" and is the claim the strip measures), and not on the slide, whose title is
   `The process was <hi>the bottleneck</hi>`, the first argument again. The step's CLAUDE.md is right
   that no sentence can *make* that claim without the reader taking it on trust, which is why the
   figure exists. But `lesson-writing` also asks that the line after a figure says where to look and
   what it proves, and here nothing does. In guided mode this is the whole page: a heading and a
   drawing, with the tutor holding an argument the course never wrote down.
   **Fix** One clause, pointing rather than re-arguing, appended to the sentence that already reads
   the drawing: `Take the typing out and the calendar barely moves. What grows instead is underneath
   the second row: three lanes of writing make three times as much to read, and the mark on the strip
   is where the reading stopped.` Then the existing sentences follow unchanged.
   Dutch: `Haal het typen eruit en de kalender beweegt nauwelijks. Wat wel groeit, staat onder de
   tweede rij: drie sporen schrijven leveren drie keer zoveel om te lezen op, en het streepje op de
   strook is waar het lezen ophield.`
   Note the tension to weigh before applying: the step's CLAUDE.md deliberately leaves the gap to the
   drawing. The proposal keeps that (it names where to look, it does not argue the case) but it is a
   judgement call the author should make. The alternative, and cheaper, fix is item 4 below, which
   puts the same information in the caption where it costs no prose at all. Doing both is one
   sentence too many.

## 4. Readability

Nothing else stumbles. Sentences are short, openings vary across all eight paragraphs and three list
items, every heading is a claim and none of them says what its first sentence says. "Which puts
business in the loop weekly" opening a sentence with a relative pronoun is the house voice, not an
error. The one stumble in the unit is the "ceiling under" clause, filed at 2.2 because it is also an
attribution defect.

## 5. Imagery

`PipelineShift` clears the bar the step sets. It is a measurement, not a picture of a sentence: both
rows are on one scale, the second row's short end is read against a dashed guide at the first row's
end, and the strip under the second row carries the one claim the prose cannot make. The internal
proportions do what the component's own doc says they must (`write` collapses, `verify` becomes the
widest solid block, `wait` and `ship` both grow, the strip runs past the block above it). I checked
the arithmetic: `needed` 63 against a drawn `check` of 30, from a traditional `check` of 21, so the
strip is exactly three lanes at one lane's cost and the gap is honest. The whole drawing fits the
640 viewBox with the strip ending at x=609.

The step needs no second figure. `way-working-decision` is three questions about practices, and a
drawing of "PowerPoint, review, sprint" would be a picture of a list.

1. **Where** `pipeline-shift.caption` ("The proportions are illustrative rather than measured.")
   **Problem** The caption disclaims the figure's argument. Everything the drawing proves is a
   proportion: the second row ending short of the guide, the strip being longer than the block above
   it, `verify` being the widest solid block. A reader who takes the caption at face value has been
   told, in the figure's own voice, that none of that is to be trusted. The step's CLAUDE.md defends
   this figure precisely as "a measurement rather than an illustration", and the caption says the
   opposite. There is already a worked precedent in the repo for an honestly illustrative figure:
   `step1`'s `next-token.caption` says the scores are illustrative and then names what does hold
   ("The shape is what holds: one clear favourite, a few plausible runners-up, and a tail too long to
   draw"). This caption stops halfway through that shape. It also violates nothing to fix, since a
   caption naming provenance is the house rule.
   **Fix** `The times are illustrative. The scale is not: both rows are drawn against one clock, and
   the strip under the second is three lanes of output at what one lane cost to read.`
   Dutch: `De tijden zijn illustratief. De schaal niet: beide rijen staan op dezelfde klok, en de
   strook onder de tweede is drie sporen output tegen wat één spoor kostte om na te lezen.`

## 6. Supporting tasks

The unit asks the reader to do exactly one thing, in `environment-beats-project.2`: "Count the times
this week you told an agent something you had told it before." That is the best instruction in the
step and it is prose, so nothing holds the reader to it. The step's CLAUDE.md pre-authorises the
shape: "If an exercise is ever wanted here, the honest shape is step 2's `TaskCard`, ticked once and
grading nothing, and the thing it asks for has to happen away from the keyboard." `audit.md` row 20
records the hole and row 18 records the adjacent one, that no unit in the course says how the change
gets started with a team.

1. **Where** end of `change`, under a `<h2 data-i18n="ui:quiz.title">` (the shared heading), a
   `TaskCard` registered in `index.tsx` with its own block, e.g. `#take-one-question`
   **Problem** Six sections tell the reader their job and their team have changed, and the reader is
   asked to do nothing about either. It is the unit in step 3 most able to carry a card, because
   `way-working-decision` already produces three questions and `environment-beats-project` already
   produces a count.
   **Fix** Three ungraded moves, all away from the keyboard, worded so none of them needs a checker:
   1. "Count the times this week you told an agent something you had already told it. Write the
      number down."
   2. "Name one practice on your team that was shaped by a constraint that is now gone. Not
      PowerPoint, the review or the sprint. Your own."
   3. "Take that one question to the next retro, and say what you think the answer is."
   Coordination note: the brief promises step 3 *one* structured closing exercise, explicitly
   ungraded, and `impostor` is the closing unit. If that lands in `impostor`, this card should still
   exist, because they ask for different things (this one is about the team, the closing one is about
   the reader). If only one card is wanted in the step, put it here: this is the unit whose material
   converts into moves.

## 7. Quiz

The step's `CLAUDE.md` says nothing here is quizzed and that this is a decision, on the grounds that
every unit is a conversation rather than a command. **That reasoning holds for an exercise and not
for a quiz**, and `audit.md` row 20 says so in as many words. Guided is the default mode, guided
drops every run of prose, and a show-of-hands question is exactly what a room does with a
conversation. I am flagging the constraint as one worth revisiting rather than quietly breaking it.

The audit's pick for the step's one quiz is `expectations`. If a second is ever wanted, `change` has
two questions with distractors a reader would genuinely believe, both from `process-was-bottleneck`
and `code-got-cheap`, which are the two sections most likely to be misread:

1. "Management worked out a ten times multiple and it did not arrive. Why not?"
   - *The queues around the typing did not move: review, environments, the release window.* (correct)
   - "The tools do not yet write code well enough to be trusted with real work." (the belief the
     section is written against)
   - "The team has not learned to prompt well enough yet." (the flattering version of the same)
   - "The multiple does arrive, but only on greenfield projects." (plausible and wrong for the right
     reason)
2. "Code got cheap. What relaxes?"
   - *Taste. A naming convention you would once have blocked a merge over.* (correct)
   - "The quality gates, because an agent already runs the tests." (the exact misreading
     `code-got-cheap.2`'s last two sentences exist to prevent)
   - "The domain model, since a module can be regenerated from a sharper description."
   - "Nothing relaxes. The section is about speed, not quality."

Question 2 is the one worth having: it makes the reader commit out loud to the distinction the
section's protected closing sentences draw, and the wrong answer is one a room will offer.

## 8. EN/NL parity

Complete. Every one of the twelve prose keys in `change.html` has a Dutch entry, including both
halves of the assistant pair, and no orphaned `change.*` key is left in `nl.json`. `en.json` carries
only `change.title`, which is correct: the English HTML is the English. The four deck keys and the
three divider points are present in both. The Dutch is a rewrite rather than a conversion, and in
places it is better: "Die komt er niet, en niet omdat de tool tegenvalt" is tighter than "It does not
arrive, and the reason is not that the tool underdelivered."

1. **Where** `change.lead.1`
   **Problem** English "it does not get bored on the thirtieth call site"; Dutch "wordt niet moe bij
   de dertigste plek waar ze wordt aangeroepen" (does not get *tired*). Small, but it costs
   something: `way-working-decision.3` uses tiredness for the human ("what a tired person typed on a
   Friday", "iemand moe op vrijdag"), so the Dutch now uses one word for both the agent that is not
   tired and the person who is. The English keeps them apart, and here the English is the truer one.
   **Fix** Dutch: `Een agent schrijft ze sneller dan jij en verveelt zich niet bij de dertigste plek
   waar ze wordt aangeroepen.`

2. Note for whoever applies section 2: fixes 2.1, 2.2 and 2.3 all change the Dutch as well, and the
   Dutch is written above with each of them. The "vloer en plafond onder" slip exists in both
   languages, so neither rescues the other.

## Verdict

**Strong.** This is one of the three or four best units in the course and it would sit comfortably
beside good technical courseware. The argument builds from your desk outwards, every borrowed claim
is a link and a clause rather than a second telling, the list is the right shape in the one place a
list belongs, and `code-got-cheap` closes on the sentence that keeps the whole unit from being read
as permission to stop caring. There is no AI tell in it worth the name. What is wrong is small and
almost all of it clusters on the drawing: the unit's best asset carries a caption telling the reader
not to trust it, and the drawing's second argument, the one the figure exists to make, is never
named in prose, on a slide, or anywhere a tutor could read it off the page. Beside that, one list
item claims more about this repository than is true, one clause misplaces a ceiling and puts it under
something, and the reader is asked to do nothing at all across 953 words.

Priority order:

1. Rewrite `pipeline-shift.caption` so it stops disclaiming the figure's own argument (5.1). One
   line, in both languages, and it is the highest ratio of value to risk in the unit.
2. Name the strip's claim where the reader can find it, either in `process-was-bottleneck.2` (3.1)
   or by taking the caption fix as sufficient. Do one, not both.
3. Fix the PowerPoint item's two overstatements (2.1). It is the one checkable claim about this
   repo in the unit and it is currently stronger than the repo supports.
4. Fix "a floor and a ceiling under", which also cleans up the "which is the point" gloss (2.2 and
   1.1 are one edit).
5. Decide the fourteen-days number: ground it in the grace periods that are in the code, or record
   in the step's `CLAUDE.md` that it is deliberately outside the kata (2.3).
6. Add the `TaskCard` (6.1), coordinating with whatever closing exercise step 3 gets in `impostor`.
7. Dutch "verveelt zich niet" for "wordt niet moe" (8.1).
8. If step 3 gets a second quiz after `expectations`, it is this unit's, and question 2 is the one
   worth asking (7).
