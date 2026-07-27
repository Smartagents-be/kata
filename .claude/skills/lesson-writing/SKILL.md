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
| Introducing a list or explanation | A colon. |
| Dropping in a side remark | Parentheses, or cut the remark. |

The same goes for the en-dash used as punctuation. Hyphens inside words (`self-learning`,
`walking-skeleton`) are fine.

**Short sentences beat long ones.** If a sentence has more than one comma, look for the full stop
you skipped. Aim for a mix: a couple of short sentences, then a longer one, then short again.

**Say it straight.** Prefer "the agent reads your files" over "the agent is capable of reading
your files". Cut "simply", "just", "of course", "obviously", "it is worth noting that". If a
sentence still works with a word removed, remove it.

**Second person, active voice.** "You clear the session and it is gone", not "the session is
cleared and the content is lost".

**Concrete before abstract.** Name a real file, command, or moment from this repo before stating
the general rule. `CLAUDE.md`, `mvn test`, `/clear`, `ExerciseChecker` all mean more to a student
than "configuration" or "the tooling".

**No hype.** Skip "powerful", "seamless", "unlock", "leverage", "game-changing". If something
matters, explain why it matters and let the reader conclude it is important.

**Vary the openings.** Three paragraphs in a row starting with "The" or "This" reads like a
machine. Read the first three words of each paragraph in a section and check they differ.

## Voice

The rules above keep the text clean. This section is what makes it sound like the units already in
the tree. `step1/context.html` and `step1/harness.html` are the reference: when in doubt, read a
section of one out loud and match its rhythm.

**Open cold on the claim.** "An agent has no memory of its own." "The harness is the software you
use to work with a model." No announcing what the paragraph is about.

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
- **Define by contrast.** Two examples side by side beat an adjective: "Fix the login" against
  "make `ExerciseController` return a 400 when the answer is blank".
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

**Instructions are one clause, imperative**, with the reason in the next sentence rather than
padding the instruction: "Clear the context when you change subject." "Spend an expensive model on
this."

**Around a figure**, the prose earns it first, and the line after it says where to look and what it
proves: "The one on the left is the prompt on its own." Never "as you can see in the diagram
below".

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

## Repo conventions to respect

- `data-audience="self"` for notes that would spoil a guided session, `data-audience="guided"` for
  lines aimed at the teacher, and no attribute for everything else. Most content carries no
  attribute. See `front/src/shared/lib/content.ts`.
- Content is plain HTML with no wrapper element. Headings start at `<h2>`.
- If the step is graded, the numbered list the checker grades must match the checker's item order.
  Say so in an HTML comment naming the Java class.

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

A key with no entry keeps the English that is already on the page and warns in the browser
console, so a half-translated unit is visible rather than silent. Blocks that are the same in
every language, such as a `<pre>` code sample or a `<div data-figure>` slot, carry no key at all.

Answers stay English in every language, because the Java checkers grade them. When a translated
exercise asks for `keep` or `gone`, say plainly that those words are typed in English.

## Before you finish

Read the text out loud. If you run out of breath, the sentence is too long. If it sounds like a
brochure, cut the adjectives.

Then five questions, in order:

1. Does the first sentence make a claim, or announce one?
2. Is the last sentence of each paragraph the best one in it?
3. Is there a fragment or a very short sentence in every section, so the rhythm breaks somewhere?
4. Did you name a term before you showed the thing?
5. Is any adjective doing work a concrete example should be doing?

Then grep for the thing you always miss:

```bash
grep -n '—\|–' front/src/steps/*/units/*.html front/src/steps/*/locales/*.json
```

That must return nothing.
