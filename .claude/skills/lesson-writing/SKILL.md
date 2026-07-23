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

Then grep for the thing you always miss:

```bash
grep -n '—\|–' front/src/steps/*/units/*.html front/src/steps/*/locales/*.json
```

That must return nothing.
