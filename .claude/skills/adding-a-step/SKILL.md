---
name: adding-a-step
description: The six files a new kata step needs and the order to write them (unit HTML, locales, the step registry, quiz.ts, the steps index, and the optional Java package), plus how figures, inline figures and unit ids work. Use whenever you add a step or a unit to front/src/steps/, wire a figure into a unit, or register a new step in the sidebar.
---

# Adding a step

A **step** is a topic; a **unit** is one page inside it, holding prose, a quiz, an exercise, or any
combination. The URL is `/steps/step1/session`; a bare `/steps/step1` forwards to the step's first
unit.

1. `front/src/steps/stepN/units/<unit>.html` — one file per unit, in English, plain HTML, no
   wrapper element needed. Every block of prose carries a `data-i18n` key; see "Languages" in
   `CLAUDE.md`. Do not write the unit's title into the HTML: it comes from the registry.
2. `front/src/steps/stepN/locales/en.json` and `nl.json` — this step's messages, flat keys. The
   English file holds the titles, quiz text and figure labels; the Dutch file holds those plus the
   prose translations, since the prose has no English entry (the HTML is the English).
3. `front/src/steps/stepN/index.tsx` — default-export a `Step` (`id`, `title`, `locales`,
   `units`). Each `Unit` has an `id`, a `title`, and then `html`, `exerciseId` (plus an optional
   `exercisePlaceholder`), or both. Everything the student reads is a **key** into this step's
   namespace, except `html`, which is the imported file itself.
   A unit may also carry a `figure`: a React element rendered under the prose. Drawings live in
   the step folder (`steps/step1/ContextDiagram.tsx`), because their geometry and how they grow
   from unit to unit is the step's business. `shared` only gives the element a place to sit,
   which is why the registry is `.tsx` rather than `.ts`.
   A drawing that only reads correctly *next to* the paragraph explaining it goes in
   `inlineFigures` instead, keyed by name (`steps/step2/ProjectTree.tsx`). The unit's HTML leaves
   an empty `<div data-figure="the-key"></div>` where it belongs, and
   `StepContent` cuts the prose there: one `<article>` per run of HTML, the React element between
   them. Only top-level markers are found. One nested inside a `<div data-audience>` renders as
   the empty div it is, which is the symptom to look for. Portals into the rendered HTML were
   tried first and do not survive: React discards children it put in a container that
   `dangerouslySetInnerHTML` owns.
4. Multiple choice, if the unit has any: `front/src/steps/stepN/quiz.ts` exports the
   `QuizQuestion[]`, and the unit references it as `quiz`. A question is an `id`, the
   `question`, its `choices` (exactly one carrying `correct: true`) and an `explanation`.
   `QuizPanel` answers the whole quiz first and checks it from one button at the bottom. A right
   answer is marked right and says nothing further; only a wrong one prints its `explanation`,
   so keep that to a sentence or two. Everything locks after checking, since the explanations
   give the remaining answers away. The panel shuffles both the questions and each question's
   choices on every load, so never write "the second option" into an explanation: describe the
   choice instead. Use the `quiz-writing` skill in `.claude/skills/quiz-writing/`, which covers
   the data shape and what makes a distractor worth offering; the prose rules from
   `lesson-writing` apply on top of it.
5. Append the step to the array in `front/src/steps/index.ts`. That list drives the sidebar,
   the routes, the previous/next pager and the registration of the step's locale bundles under a
   namespace named after its id; nothing else needs touching.
6. Java side, if the step needs one: `be.smartagents.kata.java.stepN`, holding that step's own
   `@SpringBootApplication` and whatever it exposes. There is no shared backend shell to register
   with any more, and no shared grading endpoint — a step that wants one builds it.

Step ids are `stepN`, unit ids are words (`session`, `workshop`), and together they are the
URL (`/steps/step1/session`). No unit carries an `exerciseId` today (the free-text mechanism is
unused; see the project state notes in `CLAUDE.md`), but the field is still on `Unit`: an exercise
id is named after what it tests, not after the step or unit, so one step could grow several.

The audience rule (`data-audience`), the languages and `data-i18n` key convention, and the kata's
own rule that you implement only the step being asked for all live in `CLAUDE.md` and apply here.
