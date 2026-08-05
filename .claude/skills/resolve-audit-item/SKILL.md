---
name: resolve-audit-item
description: Take one numbered item out of audit.md, fix what it describes, work out what else the fix touched, and close that one row. Use whenever the user names an audit item, row or topic to resolve, fix, close or handle, asks to work through the audit one item at a time, or says "resolve audit item 23".
---

# Resolving one audit item

`audit.md` at the repo root lists what is left to handle. This skill takes one row off it and closes
it: identify the item, check it is still true, fix it, work out what the fix touched elsewhere, then
close that one row.

Know the boundary against its neighbour before you start. The `audit-update` skill in
`.claude/skills/audit-update/` re-measures the document against a range of commits and its first
rule is that it never fixes a defect. This skill is the other half: it edits the course, and then
closes exactly one row. The two are never run as one job.

## The rule that matters most

**One item, all the way, or nothing.** A half-closed item is worse than an untouched one, because
the row is deleted and the defect is not, and the audit's whole value is that a missing row means a
solved problem.

This cuts both ways. Do not stop at the English half of a fix, and do not widen. A second defect you
notice while you are in the file is a sentence in your report to the user, never a second edit.

## 1. Pin the item down

- **The numbers are positional and they move.** `audit.md` says so itself: adding or removing a row
  renumbers every remark after it. Confirm the **number, the `Where` and the topic together** before
  you touch anything. If a cited number and a cited topic disagree, the topic wins and you ask which
  they meant, because the number is probably from an earlier pass.
- **The head of the remark names the thing.** A row says where once in the `Where` column and points
  at the exact thing once at the start of the remark: a block id (`session.wrote-almost-none.1`), a
  locale key, a figure component (`SessionMakeup`), or a repository path. Open that first.
- **Verify the row is still true before you fix it.** Read the file and quote the actual text back.
  If the tree no longer matches the row's evidence, stop and report it. The item may already be
  closed, or the defect may have moved, and either is a different job from the one you were given.
- **Some rows ask for no edit and cannot be resolved.** An empty Effort cell, `Fix: leave it`,
  `No fix proposed`, `Recorded so nobody looks for it`. These are records rather than work. Say so
  and stop rather than inventing an edit for them.
- **Read the step's own notes before you decide the row is a defect.** What is deliberate about a
  unit lives in `front/src/steps/stepN/CLAUDE.md`, beside the files it describes, with
  `front/src/steps/CLAUDE.md` above it for what spans the steps. Several rows say "documented as
  deliberate" in as many words, and more of them are than say so. A row that turns out to describe a
  decision rather than a defect goes back to the user as a question, because closing it means
  reversing the decision and that is not a fix.

## 2. Interview

This is the course's own pattern, taught in `step1/prompt` and used as a workflow in
`step2/workflows`: the agent interviews you, and its questions are the decisions you skipped.

There are two reasons to run it, and they are not the same reason. Either **the row left a decision
open** and you need the author to take it, or **you cannot tell what the row is asking for** and you
need the row explained. The first is the common one. The second is the dangerous one, because the
tempting move there is a plausible edit rather than a question.

**Do not ask when the row names the exact edit and the tree agrees with it.** Make the edit. A row
that says "change the prose to fourteen and five thousand" has already been decided.

### 2a. The row left the decision open

Ask in four cases:

- **The row offers two fixes.** "Fold what is left into the lead, or give it the one concrete
  comparison it lacks" is a choice the row deliberately left open.
- **The row proposes no fix, or the effort is `●●●`.** That mark means new material or a decision
  the course has not taken. Never write a unit, a quiz or a section off a one-line row.
- **The fix is wording and more than one sentence would do.** Voice is the author's, not yours.
- **The fix has more than one defensible landing place.** A `⟳` row names two sites and keeping the
  wrong one costs more than the duplication did.

Use `AskUserQuestion`, one round where you can manage it, your recommendation first. **Where the
choice is prose, draft the actual sentences in the option previews**, so the user is choosing
between sentences rather than between descriptions of sentences. Then restate the answers in one
line before you edit, so the spec you worked from is on the record.

### 2b. You cannot tell what the row wants

A row is written in the author's shorthand, months after the thing it describes, and some of them no
longer parse on their own. The failure mode is not asking too many questions. It is making the edit
that fits your reading of an ambiguous row, which lands a change nobody asked for and deletes the
row that would have caught it.

**Exhaust the reading before you ask.** Most rows that look unclear are clear one file later, and a
question you could have answered yourself spends the user's attention on nothing:

- The thing at the head of the remark: the block id, the locale key, the figure component, the path.
  Read the actual text, in both languages.
- That step's `front/src/steps/stepN/CLAUDE.md`, and `front/src/steps/CLAUDE.md` above it. A row
  that reads as a non sequitur is often enforcing a rule written down there.
- The row's neighbours. Rows under one `Where` were written in one pass and frequently share a
  premise that only the first of them spells out.
- `git log -1 --format=%h audit.md` against the `**Measured:**` anchor, then the diff since. The row
  may describe a state the tree has already moved past.

**Then name the ambiguity rather than the confusion.** "I do not understand item 23" hands the whole
job back. Quote the row, quote what is actually in the tree, and say exactly where the two part:
which word has two readings, which of two files the `Where` points at, which defect the remark names
when the evidence shows a different one.

**Ask with candidate edits, never with an open question.** The interview's value is that it makes
the decision cheap to take, so every option is a fix the user can say yes to:

- Two or three readings of the row, each carrying the concrete edit it implies, prose drafted in the
  preview where the edit is prose.
- Where useful, **the row is wrong** as an option in its own right: the defect is already fixed, or
  the row describes a deliberate decision, or the row's evidence no longer matches the tree. Section
  1 says a row like that goes back to the user, and this is how it goes back.
- Say what you would pick and why, in one clause. An interview with no recommendation is a survey.

**A second round is allowed here.** One round is the aim, but when the first answer only narrows the
question, ask again rather than filling the rest in yourself. Two rounds and a right edit beat one
round and a guess.

**If it is still not actionable after the interview, stop.** Some rows need a decision the course
has not taken, and the honest outcome is an untouched row plus a report saying what the decision is
and what it would cost. That is a finished run of this skill, not a failed one. What is never
acceptable is a plausible edit made because a question felt like too much friction.

Whichever branch you took, **restate the answers in one line before you edit**, so the spec you
worked from is on the record. An interview is a spec, not a fix: the row closes in section 5, after
the edit and the ripple check, never on the strength of an answer alone.

## 3. Fix it

- **The Effort cell is the budget.** `●○○` is a clause or a sentence in one place and its locale
  sibling. It is not licence to rewrite the section around it.
- **Student-facing prose goes through the `lesson-writing` skill** in
  `.claude/skills/lesson-writing/`, and a quiz through `quiz-writing`. No em-dashes, in any file
  this skill touches, including `audit.md`.
- **Both languages move together.** The English HTML under `front/src/steps/stepN/units/` is the
  English; the Dutch is the same `data-i18n` key in that step's `locales/nl.json`; `en.json` carries
  only figure, quiz and board labels. When the two disagree on content rather than on translation,
  the Dutch is the one that leads and the English is rewritten to match it.
- **Do not renumber a block's `data-i18n` keys as a side effect.** Cutting `<unit>.<section>.2`
  leaves `.3` where it is. A renumber means visiting every later key in `nl.json` and it is almost
  never what the row asked for.
- **The exercise prohibitions hold.** Root `CLAUDE.md` and each `kata/stepN/java/CLAUDE.md` carry
  them: no flag decoded, implemented or revealed, no tracing added to step 1's catalogue pipeline, no
  hardening of step 2's loans module, no `MemberStatements.forTier`, no solution to `problem.md`, and
  the three plaintext setup flags are never gathered or named. A fix may correct a flag's help text
  without printing the flag.
- **`front/CLAUDE.md`'s rules hold.** Never `data-audience` and `data-assistant` on one element; a
  `data-figure` marker is a direct child of the body and is never wrapped; every element carries an
  `id` and a `data-component`; nothing outside `front/src/index.css` holds a colour.
- **If the fix changes a decision, change its record with it.** `front/src/steps/stepN/CLAUDE.md`
  says why a unit is shaped the way it is. Root `CLAUDE.md` puts it plainly: record decisions rather
  than content, and do not summarise what a unit teaches. So update the record when you overturn it,
  and add nothing when you have only reworded a sentence.

## 4. Check what the fix touched

Mandatory, and it runs **before** you open `audit.md`. A fix here is rarely local: most of the `⚠`
rows exist because the repository already disagreed with itself in two places, so changing one side
is how the next one gets written.

```bash
.claude/skills/audit-update/measure.sh   # per-unit word, figure and self-only-block drift
cd front && npm run build                # tsc -b + vite build, this is the type check
cd front && npm run lint
```

Then grep the string you replaced across both languages and across any `CLAUDE.md` that restates it.
`measure.sh` finds numbers; it cannot see that a sentence you rewrote is quoted somewhere else.

| What the fix changed | What to check |
|---|---|
| a paragraph reworded | that unit's Table 2 `Words`; any `⟳` row naming this unit as the other site of the duplicate; the phrase you replaced, in `nl.json` |
| a paragraph or section cut | its `nl.json` key, which must go too; any audit row citing a later key in the same block; the unit's `Words` and its step's Table 1 heading total |
| material moved between units | both Table 1 groups, both Table 2 rows, the `Follows from` column, and the ownership records in that step's `front/src/steps/stepN/CLAUDE.md`, which name which unit owns a definition and forbid a second one. A move between steps means visiting both files |
| a figure added or removed | Table 2 `Fig`; that step's `deck.tsx` if it has one; the deck row in Table 3; the rule that a figure writing to localStorage may not go on a slide |
| a quiz added | Table 2 `Interactive`; the cadence summary's claim that every quiz is in the first six units; the quiz gap rows in Tables 1c and 1d |
| a locale key renamed | `nl.json`, every audit row citing that key, and that step's `front/src/steps/stepN/CLAUDE.md` |
| a fact corrected in Java or in a `CLAUDE.md` | every other file stating the same fact. Fixing one side alone converts one `⚠` row into another |
| the audit's own glyphs or table shape | `front/src/steps/step2/AuditExample.tsx`, which renders the audit's glyph vocabulary to students as curriculum |
| a claim the course makes about itself | `step0/welcome`'s promise about assistant variants, and the record of cut units in that step's `front/src/steps/stepN/CLAUDE.md` |

Two rules close this phase:

- **A ripple you checked and cleared is still worth a clause in the report.** Saying nothing about
  the Dutch reads as never having opened it.
- **If the fix falsified another row or a summary bullet, update it and say what moved.** Your own
  edit put that row in play, so leaving it stale ships an audit that says something untrue. A defect
  you merely noticed is not in play: report it, do not fix it, and do not add a row for it.

## 5. Close the row

- **In Table 1, a resolved row is deleted.** Table 1 lists only what is left to handle, so a closed
  topic leaves no trace. Do not keep it with a note saying it used to be broken. If it was the last
  topic under its `Where`, collapse the group to the empty solid row rather than deleting the place:
  `| \`context, model, mechanisms/truth\` | | ● | | |`. Every unit must still appear in its table, or
  it reads as unchecked.
- **Table 2 rows are never deleted.** There is one per unit, always. Set `Cad`, `Seq` and `Eff` to
  what is now true and empty the remark cell, or rewrite the remark if something is left.
- **Table 3 rows keep their `Gap`** and go `●` with an empty remark and empty effort. The
  `Dutch completeness` row is the model.
- **Renumber the whole sequence.** Removing or emptying a remark shifts every number after it. Re-run
  1..N from Table 1a through Table 3 and confirm no gap and no repeat. This is the step that is
  easiest to skip and most visible when skipped.
- **Change a count only if `measure.sh` says it moved.** Heading totals and the `Words` and `Fig`
  columns are measurements, not estimates.
- **A partly closed row stays.** Rewrite it to describe the current state and re-set its Effort.
  Deleting a half-closed row is the worst outcome this skill has.
- **Do not touch the `**Measured:**` header or the prose under it.** Closing one row is not a
  measured pass, and a bumped anchor claims one that did not happen. Re-anchoring is `audit-update`'s
  job, and the next run of it will pick this commit up.

## 6. Land it

One commit, carrying the fix and the row close together, in the repo's conventional-commit style
(`fix(step1): ...`, `chore: ...`). Name the item in the body, with its topic and not only its number,
so the history still says which row this closed after the numbers have moved.

Then report to the user: what the row claimed, what you changed in which files, what the ripple check
covered and cleared, and anything you noticed but deliberately did not touch.

## What not to do

- **Do not resolve a second item because you were already in the file.** One row per run.
- **Do not edit your way past a row you cannot read.** A plausible fix to a misread row is the one
  mistake here that leaves no trace: the defect stays, the row is gone, and a change nobody asked
  for is in the course. Ask, or leave the row and say why.
- **Do not ask before you have read the file, the step's `CLAUDE.md` and the row's neighbours.**
  Half the questions worth asking answer themselves there, and the other half get sharper.
- **Do not delete a row you only partly closed.**
- **Do not skip the ripple check because the edit was one word.** A change made in English with no
  Dutch sibling is this repo's commonest drift, and it is invisible until a reader switches language.
- **Do not move the anchor or re-measure the document.** That is a different skill.
- **Do not solve or reveal an exercise** while fixing a row that describes one.
- **Do not invent an item.** If the number and the topic the user gave do not match a row, ask.
