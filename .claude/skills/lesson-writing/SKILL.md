---
name: lesson-writing
description: Write or revise kata lesson text (front/src/steps/*/units/*.html) so it reads like a person explaining something out loud. Use whenever you add a step or unit, rewrite lesson content, translate a lesson, or edit any student-facing prose in this repo. Bans em-dashes.
---

# Writing lesson text

The student is reading this alone or following along in class. Either way the text has to sound
like a colleague explaining something at a whiteboard, not like documentation.

## Rules

**No em-dashes. Ever.** Not in English, not in Dutch, not in headings, not in asides. This is the
single most common tell that text was generated rather than written. When you feel one coming,
pick one of these instead:

| Instead of an em-dash | Use |
| --- | --- |
| Joining two full thoughts | A full stop. Two short sentences almost always read better. |
| Tacking on an afterthought | A comma, or move it into the next sentence. |
| Introducing a list or explanation | A colon, but read "Do not announce the count" first. |
| Dropping in a side remark | Parentheses, or cut the remark. |

The same goes for the en-dash used as punctuation. Hyphens inside words (`self-learning`,
`walking-skeleton`) are fine.

**Short sentences beat long ones.** If a sentence has more than one comma, look for the full stop
you skipped. Aim for a mix: a couple of short sentences, then a longer one, then short again.

**Say it straight.** Prefer "the agent reads your files" over "the agent is capable of reading
your files". Cut "simply", "just", "of course", "obviously", "it is worth noting that". If a
sentence still works with a word removed, remove it.

**Cut the gloss.** The sentence after a claim is usually the claim again in other words, and it is
the first thing an author cuts when they read your draft. "…are compression: one word carries a
structure the model already knows in detail" ends at `compression`. "Call a thing what the business
calls it" does not need "that is what domain-driven design asks of you" in front of it. Watch the
colon especially: it earns its place when what follows is the thing itself, and not when what
follows is the same sentence explained.

**Second person, active voice.** "You clear the session and it is gone", not "the session is
cleared and the content is lost".

**Concrete before abstract.** Name a real file, command, or moment from this repo before stating
the general rule. `CLAUDE.md`, `mvn test`, `/clear`, `ExerciseChecker` all mean more to a student
than "configuration" or "the tooling".

**No hype, but do say what is at stake.** Skip "powerful", "seamless", "unlock", "leverage",
"game-changing". What is banned is the adjective standing in for the argument, not the claim itself:
"that is what separates an app built in half a day from one you can put in production" and "the
biggest lever you have with an agent" are both fine, because each names the thing being weighed.
Hedging a real claim into "this can be quite helpful" is the same failure from the other side.

**Vary the openings.** Three paragraphs in a row starting with "The" or "This" reads like a
machine. Read the first three words of each paragraph in a section and check they differ.

**Watch the Dutch showing through the English.** This course is written by Dutch speakers, and the
words that survive the crossing are the ones that exist in both languages meaning different things.
*Qualitative* is the one that keeps coming back: in English it means "to do with qualities rather
than numbers", so an answer is never "more qualitative", it is better. The rest of the list is
*actual* for current, *eventual* for possible, *control* for check, *sympathetic* for nice, *brave*
for well behaved, *learn* for teach. English is the page every reader gets, whatever their language
setting, so this is the leak that matters most.

## Voice

The rules above keep the text clean. This section is what makes it sound like the units already in
the tree. `step1/context.html` and `step1/harness.html` are the reference: when in doubt, read a
section of one out loud and match its rhythm.

**Open cold on the claim.** "An agent has no memory of its own." "The harness is the software you
use to work with a model." No announcing what the paragraph is about.

**Do not announce the count.** "That pays twice:", "Two things matter here", "There are three
reasons". The tally tells the reader nothing they cannot see for themselves one comma later, and it
is the part that sounds like a slide rather than a person. Say the things and let there be two of
them: "You get better answers, and you pay fewer tokens for them." A colon is fine when what
follows it is the thing itself. It is not fine when what precedes it is arithmetic.

**End on the sharpest sentence.** The last line of a paragraph is the one worth remembering, and it
is usually short: "What it holds is an average." "That middle is mediocre code that happens to
compile." "The evidence left the room." Write the paragraph, then check the best line is not stuck
in the middle. If it is, move it to the end.

**Break the rhythm.** Two explanatory sentences, then a fragment or a five-word sentence that lands
it. Fragments are allowed here and used on purpose: "The message you just typed." "Failed attempts.
A command that errored."

Five moves that recur across the existing units. Reach for these before inventing a new shape:

- **Negate the wrong model, then state the right one.** "The model did not get tired and it did not
  get dumber. The evidence left the room."
- **Name the term last.** Describe the thing in plain words and let the label arrive as a closing
  tag: "That pile-up in the context is entropy." Never define first and explain after.
- **Define by contrast, with something real.** Two examples side by side beat an adjective: "Fix
  the login" against "make `ExerciseController` return a 400 when the answer is blank". Both halves
  have to be things a reader would actually type or actually meet. An invented bad artifact
  (a folder called `svc-impl-2`, a class called `ThingManager`) is a strawman, it dates the
  paragraph, and it is the sentence that gets cut in review.
- **Tell the failure as a scenario**, present tense, second person: "Chase a bug through a long
  session and finally kill it: the fix lands in your code, but the whole hunt stays in the window."
  Not "stale context can cause regressions".
- **Flag the counterintuitive bit out loud.** "Here is the part people do not expect."

**Two metaphors, and no third.** Context is a space (the window, the room, things sitting there,
the pile-up) and usage is money (paid for on every turn, the top rate, where the money goes). Both
are already load-bearing across the step. Adding a third one to a single unit makes the step read
like several authors.

**Hedge with frequency, not with modals.** "usually", "mostly", "probably", "routinely" are honest
about how often something happens. "may", "could potentially", "one might" do not appear anywhere
in these units and should not start now.

**Mostly uncontracted.** "do not", "cannot", "it is". Step 0 is warmer because it is talking the
student through the site, so a "you'll" fits there. Step 1 is explanatory and stays level.

**Dry, never jokey.** Understatement carries it: "homework" at the end of a list of bad training
data, "mediocre code that happens to compile". No exclamation marks.

**Headings are claims or plain labels**, sentence case and short: "A model is stateless", "More
context is not free", "Bad context, bad answers", "Why this bites hardest in code". Never
"Understanding X", never a gerund, never a question. They may run on from one another the way
speech does: "A model is stateless" is followed by "And it is a statistic".

**When the section is about a named thing, the heading is the name.** A claim heading over a
section that teaches a practice reads as a slogan for it, and the paragraph underneath then makes
the same claim a second time in longer words. "Domain-driven design" beats "Structure is the biggest
lever", "Quality gates" beats "Make the checks part of the work". Keep the claim shape for a section
that argues something the reader would otherwise get wrong, which is what "More context is not free"
is doing. Test it by reading the heading and the first sentence together: if they say the same
thing, the heading should have been the name.

**Instructions are one clause, imperative**, with the reason in the next sentence rather than
padding the instruction: "Clear the context when you change subject." "Spend an expensive model on
this."

**Around a figure**, the prose earns it first, and the line after it says where to look and what it
proves: "The one on the left is the prompt on its own." Never "as you can see in the diagram
below". A heading, the figure, then one paragraph saying what it buys is the other accepted shape,
and it is the right one when the heading already names the thing being drawn.

**Never walk a figure row by row.** A drawing that needs a paragraph per branch is doing no work,
and the paragraphs are what a reviewer deletes: `engineering` lost nine of them in one sitting and
lost nothing else. Say what the shape gets you, and let the labels and notes inside the figure carry
the rest. If a row needs explaining, the note beside it in the figure data is where the explanation
goes.

**The work is theirs and the agent is an it.** "your codebase", "your files", "your machine". The
student is "you". A teacher only appears inside `data-audience="guided"`.

## Shape of a unit

A unit is one page covering one idea, so it stays short: two or three paragraphs, sometimes an
exercise under them.

1. Open with the idea itself. No preamble about what the page will cover.
2. Ground it in this codebase where you can.
3. If the unit is graded, put the exercise last under an `<h2>`, and close with what to submit.

The unit's title comes from the step registry, so never start the file with a heading repeating
it. Headings inside a unit start at `<h2>`.

Keep paragraphs to three or four sentences. A wall of text loses a room.

**A section is a heading and one or two paragraphs.** Three is already a sign that two of them
overlap, or that the second one is explaining the first. This is the rule most often broken by
writing that was never reviewed out loud: the `engineering` unit ran to fifteen paragraphs before
somebody read it and it came back at six, and every instruction in that review was a cut. Draft
long if that is how you think, then cut before you commit, because the cut is coming either way.

Two things follow from cutting a paragraph, and both are easy to miss. A paragraph that closed the
unit is load bearing, so decide where the closer goes before you delete the section around it. And
`front/src/steps/CLAUDE.md` counts things (asides, figures, which unit owns which argument), so grep
it for the unit you just cut and fix what you invalidated in the same change.

## Repo conventions to respect

- `data-audience="self"` for notes that would spoil a guided session, `data-audience="guided"` for
  lines aimed at the teacher, and no attribute for everything else. Most content carries no
  attribute. See `front/src/shared/lib/content.ts`.
- Content is plain HTML with no wrapper element. Headings start at `<h2>`.
- If the step is graded, the numbered list the checker grades must match the checker's item order.
  Say so in an HTML comment naming the Java class.
- **The inline icons are markers, not markup you write out.** Drop
  `<svg data-icon="coin"></svg>` for a way to spend fewer tokens, `gem` for something useful in
  day-to-day work that is easy to miss, `pattern` for an AI design pattern, and step 0's legend
  (`welcome.legend.*`) is the definition of each. `prepareUnit` fills them in from
  `shared/lib/icons.ts`. Step 0's legend is where the student learns what each one means, so use
  them for that and nothing else. Placement is a convention worth copying from `step1/harness.html`:
  the icon stands where the full stop would go and the next sentence starts straight after it, and
  it takes a trailing period only when it ends the paragraph. In `nl.json` the quotes are escaped,
  `<svg data-icon=\"coin\"></svg>`.
- **`data-assistant="claude"` or `"copilot"`** where a student on the other product would be told
  something untrue, typically a filename, a command or a menu. Never on the same element as
  `data-audience`, and both siblings carry the attribute plus a key ending in the same word. The
  full rule is in `front/CLAUDE.md`.
- **Point at another unit rather than teaching it twice.** A plain anchor on its path does it,
  `<a href="/steps/step1/tokens">step 1's unit on tokens</a>`, and Typography paints it teal from
  `--tw-prose-links`. Three things about it: the link text names the unit and therefore translates
  with the rest of the sentence (`de unit over tokens in stap 1`), the path is the same string in
  both languages, and it is an ordinary `<a>` inside injected HTML rather than a router `Link`, so
  following it reloads the page. Reach for one when a claim you need has already been argued
  somewhere, and say what it established rather than re-establishing it.
- **British spelling**: `specialised`, `summarised`, `sanitise`.
- **The course says "an agent" and "the agent".** "AI agent" is step 0 only, where the term is
  introduced.

## Translations

Every language file is a rewrite, not a word-for-word conversion. Dutch that follows English
sentence structure reads as translated. Write what a Dutch-speaking colleague would actually say,
keep the same headings and the same numbered items, and keep technical terms in English when
that is what people say out loud (`prompt`, `commit`, `context window`).

The English is the HTML file. Every block of prose in it carries a key:

```html
<p data-i18n="setup.claude-md.2">It is also what makes it expensive…</p>
```

The Dutch for that key lives in the step's bundle, `steps/stepN/locales/nl.json`, as the block's
inner HTML on one line:

```json
"setup.claude-md.2": "Het maakt het ook duur. Die tokens gaan bij elke beurt…"
```

Keys read `<unit>.<section>.<n>`: the section is the `<h2>` above the block, slugified, or `lead`
before the first one, and a heading of its own is `<unit>.<section>.heading`. Add a paragraph and
it needs a key and an entry; move one into another section and its key has to be renamed.

The slug is the heading with its small words dropped, usually three of them:
`Make the checks part of the work` is `make-checks-part`, `Domain-driven design` is
`domain-driven-design`. **So rewording a heading renames every key in its section**, in the HTML and
in `nl.json`, in one change. It is mechanical and easy to skip, and skipping it leaves keys whose
name says a section that no longer exists. Grep the old slug afterwards: nothing may still point at
it, and nothing in either bundle may be left with no block asking for it.

A key with no entry keeps the English that is already on the page and warns in the browser
console, so a half-translated unit is visible rather than silent. Blocks that are the same in
every language, such as a `<pre>` code sample or a `<div data-figure>` slot, carry no key at all.

Answers stay English in every language, because the Java checkers grade them. When a translated
exercise asks for `keep` or `gone`, say plainly that those words are typed in English.

**A paragraph edit is not finished until `nl.json` moves with it, in the same change.** Reword the
English and leave the Dutch, and the two languages are now two different lessons, with nothing on
screen saying so. When they have already drifted, the Dutch is usually the one that was thought
through, so rewrite the English to match rather than the other way round.

## Before you finish

Read the text out loud. If you run out of breath, the sentence is too long. If it sounds like a
brochure, cut the adjectives.

Then ten questions, in order:

1. Does the first sentence make a claim, or announce one?
2. Is the last sentence of each paragraph the best one in it?
3. Is there a fragment or a very short sentence in every section, so the rhythm breaks somewhere?
4. Did you name a term before you showed the thing?
5. Is any adjective doing work a concrete example should be doing?
6. Does any sentence count the items before listing them?
7. Which sentence only says the previous one again? Cut that one.
8. Does any heading say what its first sentence says?
9. Does any section run past two paragraphs, and would you defend the third out loud?
10. Did the Dutch change with it?

Then grep for the two things you always miss:

```bash
grep -n '—\|–' front/src/steps/*/units/*.html front/src/steps/*/locales/*.json
grep -o 'data-i18n="[^"]*"' front/src/steps/stepN/units/*.html | sort   # against nl.json's keys
```

The first must return nothing. The second must line up with the bundle in both directions: every
block has an entry, and no entry is left pointing at a block you deleted.
