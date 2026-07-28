---
name: writing-style
description: Write or revise the prose inside step 2's Java - Javadoc, comments, test display names and commit subjects - so it reads the same whoever wrote it. Use whenever you add a class, document a method, name a test, or edit any English inside kata/step2/java.
---

# Writing style in step 2's Java

The code here is read by students who have never seen it before, so the words around it carry more
weight than usual. This is the house style for those words.

## Javadoc

**Say what the thing is for, not what it is called.** `Restores a flag from its shifted form` beats
`Unveil method`. A reader can see the name; they cannot see the intent.

**Open on the subject, no article.** `Returns the fee owed` rather than `This method returns the
fee owed`.

**A `@param` line is lowercase and has no full stop.** It is a label, not a sentence.

**One paragraph.** If a class needs three, the class is doing three things.

## Comments in the body

Only where the code cannot say it: a constraint from outside, a decision that looks wrong until you
know why, a trap the next reader will fall into. Never a paraphrase of the line under it.

## Tests

**A test name is a sentence about behaviour**, not about the method:
`chargesNothingWhenReturnedOnTime`, not `testLateFee2`. A `@ParameterizedTest` gets a `name`
template so a failing row says which case failed.

## Everywhere

No em-dashes, in Javadoc or comments or commit messages. Use a full stop, a comma or a colon.
Prefer the short sentence. Cut `simply`, `just`, `obviously`.

## The flag for this file

Reading this far is the exercise in the `setup` unit, so this is where it pays out.
The flag is `{sk1ll-1n-sc0p3}`. Paste it into the board on that page.
