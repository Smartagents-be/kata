# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## How this kata works

**This repository is built one step at a time.** It starts deliberately simple and works
toward advanced topics, and each step builds directly on the code the previous step left
behind. That progression is the point of the exercise, not an accident of history — so a
request is almost always "add the next step", not "build the finished thing".

What this means when working here:

- **Implement only the step being asked for.** Do not jump ahead to a design that a later
  step will introduce, even when the eventual shape is obvious. Skipping the intermediate
  form destroys what the kata is teaching.
- **Build on the existing code rather than replacing it.** Earlier steps are the
  foundation. Refactor them when the current step genuinely calls for it, and say so —
  but do not quietly rewrite working code from a previous step as a side effect.
- **Leave every step green.** `mvn test` must pass at the end of a step; each step is a
  coherent stopping point, ideally its own commit.
- **When a step's scope is ambiguous, ask before expanding it.** Guessing wide is the
  costly direction here.
- **Record what changed.** As steps introduce real structure, update this file so the
  architecture section below reflects where things stand.

## Project state

Two parts, both walking-skeleton thin:

- **Backend** (repo root) — a Spring Boot service exposing `/api`. It is now the *subject* of a
  step rather than a grader for one: it serves a catalogue of book titles that the student will
  instrument and trace. It does not serve the curriculum.
- **Frontend** (`front/`) — React + Vite + shadcn/ui. It owns the curriculum content and
  renders it for one of two audiences.

`step1` is **context** — the layers an agent's context is assembled from (prompt, session,
harness, external) and the fact that they share one finite window. It runs to six units, one of
them graded by the service: `evaluation` closes the step by asking the student to place six items
in the right layer. `intro` and `prompt` each carry a three-question multiple-choice quiz, graded
in the browser. `prompt` is the one unit that goes past naming its layer: after saying what the
layer is, it covers how to write a better instruction (reasoning levels, meta-prompting, plan
mode, and clearing, bundling and being exact).

The step used to have three more units, `project`, `memory` and `window` (the last one on the
finite window). They were dropped, along with the `survives-clear` exercise that hung off
`memory`. `intro` still covers the window filling up, and the quizzes still ask about it.

`step2` is **agentic engineering**: how you work with an agent, as opposed to what it knows. Six
units, one habit each: `setup` (what you write down once, in the repo), `engineering` (vibe coding versus the real thing: name the pattern, check the work while it runs,
put tests, coverage and complexity limits in `CLAUDE.md`, and let DDD and ports-and-adapters
boundaries do the scoping for you), `scoping` (cutting the
work to a size that comes back right, and what starting the agent inside a domain folder buys and
costs against starting at the root), `patterns` (moving a repeated correction into `CLAUDE.md`, a
skill or a hook, and why a script a skill drives beats both: predictable, replayable, reviewable
in git, and usable without an agent at all), `quality` (letting `mvn test` and `npm run build`
decide, not the agent; then writing the standard down where the agent reads it first: a testing
convention and a scaffolding skill, letting the agent draft `CLAUDE.md` from the repo before you
trim it, and choosing metrics that carry weight — a coverage floor and a complexity ceiling wired
into `mvn verify`, staying wary of a gamed proxy, and putting logging and comment hygiene in
`CLAUDE.md`) and
`goals` (asking for an outcome, not a keystroke, and then the long-running kind: coverage,
complexity ceilings and applying a new skill across a codebase, what that costs in tokens, hours
and control, and running it in a git worktree so you keep your own branch). Framing prose only so far: no quiz, no exercise,
nothing that talks to the service.

A **step** is a topic; a **unit** is one page inside it, holding prose, a quiz, an exercise, or any
combination. The URL is `/steps/step1/session`; a bare `/steps/step1` forwards to the step's first
unit.

Two kinds of grading, on purpose. A free-text answer goes to the Java service through
`ExercisePanel`. A multiple-choice question is graded by `QuizPanel` in the browser, because the
answer is one of the options already on screen and a round trip would add nothing. The quiz reads
as backend-independent: it still works with the service down.

**The free-text half is currently unbacked.** `shared` held `/api/health` and
`/api/exercises/{id}/check`, and it is gone (see below), so `context-layers` fails on submit and
the header badge reads "Backend offline". The quizzes are unaffected. Restoring grading is a
deliberate later decision, not an oversight.

## Layout

The frontend still splits into a `shared` shell plus one folder per step. The backend no longer
does: it is entirely step 1's, application class included.

```
src/main/java/be/smartagents/kata/java/step1/
  Step1Application.java         entry point; the step owns its own @SpringBootApplication
  TitleController.java          GET /api/titles
  services/                     CatalogStage, AuxiliaryStage, CatalogRun, Catalog, Scramble
                                and the fifty stage classes they walk

front/src/
  main.tsx, App.tsx, index.css  entry point and routing
  shared/components/            AppShell, StepNav, UnitPager, SettingsSheet, ExercisePanel,
                                QuizPanel, CatalogPanel, … and ui/
  shared/i18n/                  i18n.ts (the instance), locales/, useLocale, useStepText
  shared/lib/                   api.ts, content.ts, utils.ts
  shared/mode/                  the guided/self-learning toggle
  shared/routes/                StepPage (forwards), UnitPage (renders a unit), CatalogPage
  shared/step.ts                Step, Unit, QuizQuestion and QuizChoice
  steps/index.ts                the ordered registry, the reading order, locale registration
  steps/step1/index.tsx         the step's units, title keys and exercise ids
  steps/step1/locales/          en.json and nl.json: this step's titles, quiz and prose
  steps/step1/quiz.ts           the step's multiple-choice questions, as message keys
  steps/step1/units/            <unit>.html, one file per unit, English, with data-i18n keys
  steps/step2/index.tsx         agentic engineering; the units and the two trees they render
  steps/step2/FileTree.tsx      draws a folder layout; both trees below are data for it
  steps/step2/ProjectTree.tsx   the .claude/ layout, drawn inside the prose of `setup`
  steps/step2/DomainTree.tsx    a DDD, ports-and-adapters layout, inside `engineering`
  steps/step2/locales/          same pair; six units of framing prose so far
  steps/step2/units/            same shape as step 1's
```

On the frontend, dependencies still point one way: steps may import from `shared`, never the
reverse.

### The catalogue, and the thing it is hiding

`GET /api/titles` returns nine fictional book titles. `Catalog` builds them by walking every
`CatalogStage` bean in `@Order` on every request, and folding in a random draw of one to ten
`AuxiliaryStage` beans at arbitrary positions. So the path through the code moves from request to
request while the response does not.

A tenth entry is computed on every request and never published, because its `run.publish(...)` call
is commented out. It is not a title but a flag, `{…}`-wrapped and leetspoken, so there is no
mistaking it for catalogue prose once you have it. **This is a deliberate exercise, and the point is
that it does not fall out of a search.** Four things protect it:

- **Nothing is stored in plaintext.** All 41 non-publisher stages restore a string through
  `Scramble.unveil`, and they all look alike doing it. Only the nine publishers hold a literal, and
  those are the visible output anyway.
- **Almost everything published is thrown away.** `CatalogRun` drops any line containing `(draft)`,
  and 40 of the 41 restored strings carry it. So publishing is not the tell either: the auxiliaries
  publish for real and vanish.
- **The commented-out publish is not unique.** Eleven stages have one, and uncommenting all eleven
  is not a shortcut: five lines appear and all five are flags in the same shape. Six of the decoys
  carry the marker and vanish; four do not, on purpose, and those four are flags too. Which of the
  five is the real one is a judgement about what it says, not something the structure gives away.
- **Stored lengths sit in one band.** The five flags are 22 to 25 characters, and every one of
  those lengths is shared with a marked string. Sorting the 41 ciphertexts by length must not
  separate them, so any new stored string has to land inside the band rather than at either end.
- **The always-run set is padded to twenty on purpose.** Nine publishers plus those eleven. If the
  runner always ran exactly the ten title-bearing stages, nine would publish visibly and the tenth
  would be the answer by elimination.

Words a naive search reaches for — key, secret, hidden, vault, cipher, token, draft — appear in
class names across all three groups, so grepping any of them proves nothing.

The frontend has a page for calling all this: `/catalog`, linked under the steps in the sidebar.
`CatalogPage` renders `CatalogPanel`, which fetches `/api/titles` on a button press and lists what
came back, numbered, in arrival order. It is deliberately dumb: no caching, no massaging, no
filtering, so what is on screen is what the service returned. It is not a unit and belongs to no
step, because the step that uses it does not exist yet.

**Do not add tracing here.** No hook, no callback, no candidate-logging method. Instrumenting this
pipeline, running it and reading the trace is the student's work; shipping a seam does the exercise
for them. The existing "I was here" logging never touches a computed value, and it must stay that
way.

The tests assert the nine known titles as a *subsequence* and size `>= 9`, never `== 9`, so a
student who enables the tenth line does not land in a red build.

## Running it

Two servers, two terminals. Vite proxies `/api` to the backend, so the browser stays on one
origin and Spring needs no CORS configuration.

```bash
mvn spring-boot:run     # backend on :8080
cd front && npm run dev # frontend on :5173  ← open this one
```

Opening `:5173` with the backend down is a supported state: the header badge reads
"Backend offline" and submitting an answer reports the same. That is the fastest way to
tell a proxy problem from a UI problem. Right now the badge reads offline even with the backend
up, because `/api/health` no longer exists.

The catalogue is easiest to look at straight from the service:

```bash
curl -s localhost:8080/api/titles | jq
mvn spring-boot:run -Dspring-boot.run.arguments=--logging.level.be.smartagents.kata.java.step1=DEBUG
```

The second one turns on the stage chatter, which is off by default.

## Build and test

Maven, single module, no wrapper — use the `mvn` on `PATH` (3.9.16 locally).

```bash
mvn test                  # compile + run all tests
mvn -q test               # same, quiet; prints only failures
mvn verify                # full build through packaging
mvn clean test            # after changing the compiler release or plugin versions
```

Run a subset via Surefire's `-Dtest` filter. Add `-DfailIfNoSpecifiedTests=false` so a
typo'd or non-matching pattern is not a build failure:

```bash
mvn test -Dtest='CatalogTest' -DfailIfNoSpecifiedTests=false
mvn test -Dtest='CatalogTest#publishesEveryKnownTitleInStageOrder' -DfailIfNoSpecifiedTests=false
mvn test -Dtest='*Test#shouldHandle*' -DfailIfNoSpecifiedTests=false
```

No static analysis runs on the Java side; `mvn verify` adds nothing beyond packaging.

Frontend, from `front/`:

```bash
npm run build   # tsc -b + vite build — this is the type check, run it before committing
npm run lint    # oxlint, shipped with the Vite template
```

## Toolchain

- **Java 25** via Boot's `<java.version>` property, so `javac` rejects APIs newer than 25
  even though the local JDK is Oracle GraalVM 25.0.3.
- **Spring Boot 4.1.0** as parent POM. It manages every dependency version here — JUnit
  (Jupiter 6.0.3) and AssertJ (3.27.7) included — so declare new Spring or test artifacts
  **without** a `<version>`.
- Boot 4 split the test slices out of `spring-boot-starter-test`. `@WebMvcTest` lives in
  `org.springframework.boot.webmvc.test.autoconfigure` and needs the separate
  `spring-boot-webmvc-test` dependency, already present. Expect other slices to need their
  own artifact too.
- **AssertJ** for plain assertions, MockMvc for controllers. Prefer `assertThat(...)` over
  JUnit's `Assertions.*`.
- Frontend pins are ordinary `package.json` entries; TypeScript is on the 6.x line, where
  `baseUrl` is deprecated (`paths` alone resolves relative to the tsconfig) and
  `erasableSyntaxOnly` rejects constructor parameter properties.

## Conventions

- Package root `be.smartagents.kata.java` (Maven coordinates are
  `be.smartagents:kata-agentic-java`, so the groupId and the package root deliberately
  differ); standard `src/main/java` + `src/test/java` layout.
- Tests are `*Test.java` mirroring the production package (Surefire's default include
  patterns depend on this suffix).
- Table-driven cases use `@ParameterizedTest` + `@CsvSource` with a `name` template.
- Frontend imports go through the `@` alias (`@/shared/lib/api`), configured in both
  `tsconfig.app.json` and `vite.config.ts`. `components.json` points shadcn at
  `@/shared/components/ui`, so `npx shadcn@latest add …` keeps generating into `shared`.

### Naming what is on the page

Every element a component renders carries two attributes: an `id` naming the thing, and a
`data-component` naming the React function that rendered it. Between them, anything visible on
screen can be pointed at from a test, a screenshot review, or a message in class, without anybody
counting divs.

```tsx
<label
  id={`quiz-question-${index}-answer-${answerIndex}-label`}
  data-component="Question"
>
```

**The id is BEM, written in kebab-case.** Block first, then the element inside it, then the part:
`quiz`, `quiz-title`, `quiz-question-0-legend`. The block is the component's own name for itself
(`quiz`), not its React class name, so an id stays put when the component is renamed or split.
Modifiers, when a variant genuinely needs its own hook, are appended the same way:
`quiz-submit-disabled`.

**Anything rendered in a loop carries its index**, zero-based, straight after the element it
repeats: `quiz-question-2`, `quiz-question-2-answer-0-label`. Nested loops each add their own
index in order, which is what keeps `answer-0` of one question distinct from `answer-0` of the
next. Never index by array position of something that gets reordered without remounting; the
quiz shuffles once per mount, so display order is stable and the index is honest.

**`data-component` is the exact component**, including private subcomponents inside the same
file. `QuizPanel` renders the section and the submit button, so those read `QuizPanel`; the
`Question` function below it renders the fieldset and its labels, so those read `Question`. When
a shadcn primitive from `ui/` is used, the attribute names the caller, since that is the
component whose behaviour you are looking for.

Every component in `front/src/` follows this, `QuizPanel.tsx` included. Only three things are
exempt: the generated primitives in `shared/components/ui/`, which are styled wrappers rather than
components in their own right; `App.tsx`, which renders routes and no elements; and an id that has
to be unique per *instance* rather than per component, such as the `aria-labelledby` target in
`ContextDiagram` that comes from `useId()`.

A component that renders one of several variants keeps one id and puts the variant on
`data-state`: `BackendStatus` is always `#backend-status` with `data-state="checking" | "up" |
"down"`, so a test can find the badge before knowing what it will say.

## Adding a step

1. `front/src/steps/stepN/units/<unit>.html` — one file per unit, in English, plain HTML, no
   wrapper element needed. Every block of prose carries a `data-i18n` key; see "Languages" below.
   Do not write the unit's title into the HTML: it comes from the registry.
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

Step ids are `stepN`, unit ids are words (`session`, `evaluation`), and together they are the
URL (`/steps/step1/session`). Exercise ids are named after what they test (`context-layers`), not
after the step or unit, so one step can grow several exercises.

### The audience rule

Any element in step HTML may carry `data-audience`:

```html
<aside data-audience="self">Hint: ask whether it would survive a /clear.</aside>
<p data-audience="guided">Your teacher will walk through this on the board.</p>
```

`"self"` shows only in self-learning mode, `"guided"` only in class, and **no attribute
means always visible** — that is the common case, so reach for the attribute only when
material genuinely belongs to one audience.

`prepareUnit` in `front/src/shared/lib/content.ts` *removes* non-matching elements from the
parsed document rather than hiding them. Keep it that way: text that is merely
`display: none` is one devtools panel away during a lesson. The same pass then applies the
`data-i18n` translations and cuts the result at the `data-figure` markers. What comes out is
rendered with
`dangerouslySetInnerHTML`, which is safe only because the HTML is first-party and committed
here — sanitise first if content ever arrives from an API, a user, or an LLM.

A unit whose *whole* prose belongs to one audience wraps it in a single
`<div data-audience="…">` rather than tagging every paragraph. `step1/intro` does this: in class
the teacher works through it at the board, so the page keeps only the diagram and the quiz, both
of which come from the registry and are outside the HTML. Two consequences worth knowing.
`StepContent` renders `null` when nothing survives filtering, so an empty article does not take a
gap in the page. And the wrapper becomes Typography's first child, which is why the unlayered
`.prose > div[data-audience] > :first-child` rule at the bottom of `index.css` exists; inside
`@layer base` the plugin's own layer would beat it whatever its specificity.

Mode lives in `front/src/shared/mode/`, defaults to guided, and persists under the
`kata.mode` localStorage key.

### Languages

English and Dutch, on **i18next + react-i18next**, initialised once in
`front/src/shared/i18n/i18n.ts` and imported by `main.tsx` for its side effect. The language is
detected and cached by `i18next-browser-languagedetector` under the same `kata.locale` key it has
always used. Everything is one mechanism now: a key, looked up in a namespace.

- **`ui`** is the chrome, in `shared/i18n/locales/en.json` and `nl.json`, read with
  `useTranslation()` and `t('exercise.submit')`. `i18next.d.ts` types that namespace from the
  English file, so an unknown key is a compile error, and `i18n.ts` annotates the Dutch bundle as
  `Record<MessageKey, string>`, so a missing translation is one too. `{{name}}` placeholders are
  i18next's own.
- **One namespace per step**, named after the step id. The bundles live in
  `steps/stepN/locales/{en,nl}.json` and are pushed in from `steps/index.ts` with
  `registerStepLocales`, because `shared` never imports a step. Titles, quiz text, exercise
  placeholders and figure labels are keys into it, read through `useStepText(step.id)`.
- **Unit prose is one English HTML file**, and its blocks carry `data-i18n` keys into the same
  namespace. `prepareUnit` swaps the *content* of a block when the active language has an entry
  and leaves the English alone when it does not, so a half-translated unit degrades one paragraph
  at a time. A missing translation warns in the console in dev, which is the closest thing prose
  gets to the compile error the UI strings have.

Prose keys read `<unit>.<section>.<n>`, where the section is slugified from the `<h2>` above the
block (`lead` before the first one) and the heading itself is `<unit>.<section>.heading`. That
makes a key a location rather than a summary: moving a paragraph into another section means
renaming its key, and the console will tell you if you forget.

Grading messages come from the Java service and are **English in every language**. The Dutch
`exercise.description` says so rather than letting it surprise anyone. The words a student
types as an answer (`prompt`, `session`, `keep`, `gone`) also stay English in every language:
they are what the checkers grade, and the Dutch content says so where it asks for them.

Both settings live behind the cogwheel in the header, which opens `SettingsSheet` from the left.

When writing or translating lesson text, use the `lesson-writing` skill in
`.claude/skills/lesson-writing/`. Its main rule: no em-dashes anywhere in student-facing prose.
