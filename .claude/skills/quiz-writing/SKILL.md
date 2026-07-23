---
name: quiz-writing
description: Write or revise the multiple-choice quizzes in this kata (front/src/steps/*/quiz.ts, rendered by QuizPanel). Use whenever you add a quiz to a unit, add or reword a question, write the distractors, or translate quiz text. Covers the data shape and what makes a question worth asking.
---

# Writing a quiz

A quiz question checks whether the student can recognise the idea in the wild. It is not a memory
test on the wording of the page above it. Assume they read the unit ten minutes ago and now have to
diagnose something that happened to them at work.

Everything in `lesson-writing` applies to every sentence here: no em-dashes, short sentences,
second person, no hype. This file only adds what is specific to questions.

## Where it lives

```
front/src/steps/stepN/quiz.ts     the questions, both languages
front/src/steps/stepN/index.tsx   the unit references them as `quiz: introQuiz`
front/src/shared/step.ts          QuizQuestion and QuizChoice
front/src/steps/stepN/locales/    the text the keys point at
front/src/shared/components/QuizPanel.tsx   how it renders
```

A `QuizQuestion` is an `id`, the `question`, its `choices` and an `explanation`. A `QuizChoice` is
an `id`, a `label` and, on exactly one choice per question, `correct: true`. Every piece of text is
a **message key** into the step's i18next namespace, and the text itself lives in
`steps/stepN/locales/en.json` and `nl.json`. Keys read `quiz.<question-id>.question`,
`quiz.<question-id>.<choice-id>` and `quiz.<question-id>.explanation`, so a question's entries sit
together in the bundle. English is required; Dutch is optional and written as a rewrite rather
than a translation, and a missing Dutch entry simply shows the English.

Ids are kebab-case and describe the content, not the position: `forgets-this-morning`, not
`question-1`. Choice ids are the same idea (`window`, `cached`, `naming`), which is what makes the
shuffling harmless.

## How it renders, and what that means for the writing

`QuizPanel` shuffles the questions and each question's choices on every load, checks the whole quiz
from one button at the bottom, and then locks. So:

- **Never refer to a position.** No "the second option", no "the first two answers". Describe the
  choice in words if you have to point at it.
- **Never refer to another question.** Question 3 may be shown first.
- **A right answer prints nothing.** It turns green and that is the whole reward, so do not write
  praise into the explanation.
- **The explanation is only read by someone who got it wrong.** One or two sentences. Say what
  actually happened, not what they should have clicked.

## The question

Write a situation, not a definition. "You ask the agent something you told it at 08:00 and it does
not remember" beats "which of these describes the context window". The student should recognise the
morning before they start reading the options.

Keep it to two or three sentences, and put the symptom in it. The symptom is what they will have to
match in real life.

## The choices

Four of them. One right, three that a student who half-understood the unit would genuinely pick.

A good distractor is a real misconception people hold:

- The model learned during the session and changed its mind.
- The model looks your history up in a database.
- The provider quietly swapped in a smaller model.
- The model gets tired or drifts the longer it runs.

A bad distractor is one nobody would choose. If an option is obviously absurd, or noticeably
shorter than the others, or the only one hedged with "maybe", it is filler and the question is
really a three-way. Keep all four roughly the same length and the same register.

Do not put "all of the above" or "none of the above" in a quiz that shuffles.

## The explanation

Two sentences at most, in body colour behind a rule. Explain the mechanism, in the same words the
unit used, and stop. It has to survive being read out of order, so it cannot lean on "as we saw
above".

Good: "A model keeps nothing between two messages, so every turn re-sends the whole transcript into
a finite window. Once the morning no longer fits, it is compacted into a summary or pushed out."

Too long: anything that also lists the fix, names the other distractors, and closes with advice.
Those belong in the unit prose, where the student reads them before answering.

## Before you finish

- One `correct: true` per question, and only one.
- Every `en` present; `nl` either complete or absent, never half.
- No positional wording anywhere in the file.
- `npm run build` from `front/`, which is the type check.
- `grep -n '—\|–' front/src/steps/*/quiz.ts` returns nothing.
