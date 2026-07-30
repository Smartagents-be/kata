---
name: audit-update
description: Bring audit.md up to date with the commits made since it was last measured. Re-measures the word and figure counts, works out which rows the changes actually touch, and edits only those. Use whenever the user asks to update, refresh or re-run the audit, after landing a change that adds, deletes or rewrites a unit, figure, quiz or locale file, or whenever the anchor commit recorded in audit.md's header is behind the current HEAD.
---

# Updating the audit

`audit.md` at the repo root is a measured document, not a running commentary. Its first line records
the commit it was measured against, and every number in it was taken off the files at that commit.
Updating it means moving that anchor forward and changing **only** what the intervening commits
actually moved.

## The rule that matters most

**A row nothing touched is a row you do not edit.** Not the verdict, not the remarks, not the
wording. If the range did not touch the files a row is about, leave it exactly as it stands, even
when you can see a better sentence in it. Rewriting untouched rows is the failure mode of this
skill: it destroys the one property the document has, which is that a reader can trust an unchanged
row to mean "checked, still true".

This cuts both ways. Do not refresh a whole table because one row in it moved, and do not leave a
row stale because its section looked settled.

## 1. Measure

```bash
.claude/skills/audit-update/measure.sh --range
```

It prints the anchor audit.md records, the commits since it, the files they touched, and a per-unit
diff of recorded versus measured words, figures and self-only prose blocks. Everything it prints is
measured off the working tree; nothing is carried forward from the file.

The word count reproduces the "Basis of the word counts" paragraph in audit.md exactly (HTML
comments stripped first, then tags, then entities, then whitespace-separated tokens containing a
letter). It was verified against every unit then in the course at `377c67d` and matched every
recorded number, so treat a `WORDS MOVED` flag as real drift rather than method noise. The same
holds for figures, which are counted after comments are stripped, because at least one unit has a
commented-out `data-figure` marker that a naive grep counts.

One known source of surprise: the commit that carries an audit pass can itself touch course files,
so a recorded number may have been measured before an edit in that same commit. The drift is real
and the tree is right; the header note is where you explain it, not the row.

Read the commit messages and the diff yourself as well. The script finds numbers; it cannot see
that a rewritten paragraph fixed a defect a row describes.

## 2. Work out which rows are in play

Map each changed path to the sections it can possibly affect, then check only those. Table 1 is
split per step (1a, 1b, 1c and so on); "Table 1" below always means the changed step's own.

| Changed path | Can affect |
|---|---|
| `steps/stepN/units/*.html` | that unit's Table 1 topic rows, its Table 2 row (words, figs, cadence, sequence), and any `⟳` row naming it as one of the duplicate sites |
| a **new** `units/*.html` + registry entry | a new Table 2 row, the step's Table 1 heading count and word total, the numbering of every row after it, the `Follows from` of the next unit, and both summary sections |
| a **deleted** unit | the reverse of the above; the script flags rows with no unit behind them |
| `steps/stepN/index.tsx` | Table 2 row order and `Follows from`, plus any row about a docblock in it |
| `steps/stepN/*.tsx` (figures) | Table 2 `Fig`, the `Interactive` column, and rows about figure ordering or stale docblocks |
| `steps/stepN/quiz.ts` | the `Interactive` column, the quiz rows, and the cadence summary's "every quiz is in the first six units" claim |
| `steps/stepN/locales/*.json` | rows whose fix names a locale key, the Dutch completeness row, and locale file hygiene |
| `kata/stepN/java/**` | Table 1 rows about the service, flags, profiles or a Javadoc; several `⚠` rows are about Java text disagreeing with prose |
| `front/src/steps/CLAUDE.md`, `kata/*/CLAUDE.md` | rows that cite one of those files as the thing a student reads or as the repo disagreeing with itself |
| `shared/deck/deck.tsx` | the delivery-gap row about deck coverage |

A change to a file listed by a row's **fix** is the strongest signal: if the fix said "change the
prose to fourteen and five thousand" and the prose now says fourteen, the row is resolved.

## 3. Apply

For each row in play, decide between four outcomes and nothing else:

- **Resolved.** The change did what the fix asked. Update the status symbol and **clear the remarks
  cell**. An empty remarks cell is the document's way of saying "checked, nothing outstanding", so
  clearing it is the point rather than tidying. Do not leave a note saying it used to be broken.
- **Moved.** Still a defect, but different now. Rewrite the remarks to describe the current state,
  and say what the change did if that matters to the reader. Where a rewrite makes a defect worse,
  say so plainly; `patterns` in the current file is the model for that ("the rewrite tightened the
  prose and sharpened the defect").
- **Numbers only.** Words or figures moved but the judgement did not. Change the numbers, leave the
  prose.
- **New.** The change introduced a defect or a gap. Add a row, with the same shape as its
  neighbours: a concrete claim, the evidence, then `Fix:` and the smallest edit that closes it.

Never mark a row `⚠` on the strength of the commit message. Open the file and confirm the
disagreement is really there, quoting the actual text, because that is what every existing `⚠` row
does and a reader will check one.

### When a unit is added or removed

This is the case with the most bookkeeping, and the easiest to do half of:

1. Add or remove the Table 2 row, **in registry order** (which is course order, and Table 2 is
   numbered in it).
2. Renumber the `#` column for every row after it.
3. Fix the `Follows from` cell of the unit that now follows something else.
4. Update the step's Table 1 heading: unit count and word total, comma-grouped (`6,514`).
5. Add the unit's topics to the step's Table 1 as rows, and check whether it fills a `○` gap row
   somewhere. A new unit is the usual way a `○` becomes `●`.
6. Re-read both summary sections. They make counting claims ("of nineteen units", "every quiz is in
   the first six units", which units form the wall) that a new unit can falsify silently.
7. Verify the bookkeeping mechanically before you go near the header, because half-done is how this
   has actually shipped: a pass has landed with the new unit's Table 1 rows and re-measured heading
   in place while Table 2 held no row for it, the next unit still named the old predecessor, and
   both summaries kept the old unit count and word total. So check: Table 2 holds exactly one row
   per registry unit; the `Follows from` column read top to bottom reproduces the registry order
   unbroken; and every number in both summaries re-derives from the tables as they now stand. Grep
   the summaries for digits if that helps you not skim. Note that measure.sh flags a row with no
   unit behind it, but not a unit with no row, so the row count is on you.

## 4. Move the anchor

The header is the last thing to change, and only if you actually re-measured:

```
**Measured:** <date>, against `<short sha>` ("<commit subject>"), which is the whole working tree
apart from this file.
```

Then reconcile the prose under it. That space holds at most a note or two about whatever bears on
how this pass's numbers should be read: an anchor gap, drift caused by the audit's own carrying
commit, measuring across uncommitted work. **It is not a changelog and must not become one.** Delete
whatever no longer applies, and only write a replacement when something about this range genuinely
affects how a reader should read the numbers. The same one-pass lifetime applies to any transient
note a previous pass left under a table heading, such as one explaining a re-based word total:
delete it on the next pass unless it still changes how the numbers read.

If the range turns out to hold nothing that bears on the audit, say so to the user and change
nothing at all, including the header. A bumped date on an unmeasured document is worse than a stale
one, because it claims a pass that did not happen.

## Conventions of the file

- **Legend:** `●` solid · `◐` thin · `○` missing · `⟳` duplicated · `⚠` inaccurate. Combinations are
  used and meaningful (`● ⚠` is a section that is present and says something untrue; `● ⟳` is
  present and argued twice).
- `—` in a `Where` column means the topic has no home in the course. That is the **only** place an
  em-dash appears in this file, and the house ban on them in prose holds here too.
- Remarks are written to be acted on: a claim, the evidence that makes it a defect, then `Fix:` and
  the smallest edit that closes it. Keep the register of the existing rows, which is direct and
  unhedged, and keep them short. Bold is for the fact that makes the row worth reading.
- Word counts are the **unfiltered** file, both audiences. Say so if that ever changes.
- Cite specific evidence the way existing rows do: a unit and block id (`session.wrote-almost-none.1`),
  a locale key, a file and a line count, a real method name.

## What not to do

- **Do not fix the defects.** This skill updates the audit. Editing a unit to close a row is a
  separate request, and doing both at once means the audit describes work the reader cannot see.
- **Do not solve or reveal an exercise** in the course of citing one. The flag prohibitions in
  `CLAUDE.md` and in each `kata/stepN/java/CLAUDE.md` apply to audit.md exactly as they do anywhere
  else: a row may say a flag's help text is wrong without printing the flag.
- **Do not add rows for things you did not check.** A row is a measurement.