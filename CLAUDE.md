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
- **Leave every step green.** `mvn test` must pass in every `kata/stepN/java` at the end of a step;
  each step is a coherent stopping point, ideally its own commit.
- **When a step's scope is ambiguous, ask before expanding it.** Guessing wide is the
  costly direction here.
- **Record decisions, not content.** When a step introduces a real constraint — a prohibition, a
  gotcha, a deliberate piece of obfuscation, a reason something is shaped the way it is — write it
  here. Do not summarise what a unit teaches: the unit HTML is the readable source for that, and a
  summary here only rots. This file is the part of the repo the code cannot explain about itself.

## Project state

Two parts, both walking-skeleton thin:

- **Backend** (`kata/stepN/java/`) — one standalone Spring Boot project per step, each exposing its
  own `/api`. It is now the *subject* of a step rather than a grader for one: step 1 serves a
  catalogue of book titles the student instruments and traces, step 2 a loans domain they harden. It
  does not serve the curriculum.
- **Frontend** (`front/`) — React + Vite + shadcn/ui, on the teal design system described under
  Conventions. It owns the curriculum content and renders it for one of two audiences.

`step1` is **context, model, mechanisms**: the layers an agent's context is assembled from and the
machinery around the window they share. `step2` is **agentic engineering**: how you work with an
agent, as opposed to what it knows. `step3` is **soft skills**: what happens around the work rather
than in it, and it is the one step with no Java behind it and nothing for a machine to grade. What is
deliberate about each of their units, and why, is in
**`front/src/steps/CLAUDE.md`**, which loads when you work under that directory. Read it before
touching any unit HTML, figure, locale file or step registry: a great deal of what looks like an
oversight in there is load bearing, and that file is the only place the reasoning is written down.
The prohibitions that protect the student exercises are repeated under `## Layout` below, so they
hold whether or not that file is loaded.

A **step** is a topic; a **unit** is one page inside it, holding prose, a quiz, an exercise, or any
combination. The URL is `/steps/step1/session`; a bare `/steps/step1` forwards to the step's first
unit.

Two kinds of grading, on purpose. A multiple-choice question is graded by `QuizPanel` in the
browser, because the answer is one of the options already on screen and a round trip would add
nothing. A flag board (`FlagBoard` in step 1, `Workshop` in step 2) is graded the same way, against a
salted SHA-256 hash: the work already happened against the backend, and the board only confirms the
student read what it produced. Both read as backend-independent: they still work with the service
down.

**No unit posts a free-text answer to the service any more**, and no `exerciseId` is left in the
tree. `ExercisePanel` and `checkAnswer` in `shared/lib/api.ts` are still present but unused;
retiring them is a later decision, not an oversight, so leave them alone in either direction.

## Layout

The repository has two roots, and they are not the same shape. The frontend is one app that splits
into a `shared` shell plus one folder per step. The backend is not one app at all: **each step owns a
standalone Maven project under `kata/stepN/java/`**, with its own `pom.xml`, its own profiles and its
own `CLAUDE.md`.

```
kata/
  step0/java/    test sources only: the intro's one exercise, behind an opt-in profile
  step1/java/    the catalogue service and the three flags hidden in it
  step2/java/    the loans domain, the graded and challenge profiles, the native-image flag
  step3/java/    an empty scaffold, buildable, kept as the template a Java step is copied from
front/           the curriculum
```

**The number on that scaffold no longer names a step.** `front/src/steps/step3` is soft skills, which
is worked in the student's own head and their own team rather than against a project, so it has no
Java and the folder it would have owned stays the empty template. A step that does need Java is the
next number along, and copying this one means renaming the artifactId and the package with it.

**There is no pom at the repo root, and no aggregator.** That is the decision, not an omission: a
step is a folder a student opens on its own, and a project that has to be built from a parent is not
that. So each project declares the Boot parent directly, and steps are free to drift apart in
dependencies without negotiating. The cost is duplication across four poms, and it is accepted.
Every Maven command in this repo is run from inside `kata/stepN/java`, never from the root.

Two rules survive the split and are worth keeping in one place:

- **Each step has its own `@SpringBootApplication`**, scoped to its own package by the default
  component scan (no `scanBasePackages`). Running one never drags in another. Because a project now
  holds exactly one main class, `spring-boot-maven-plugin` needs no `<mainClass>` pin; the one step 1
  used to carry existed only because the two steps shared a module. Do not add it back.
- **A step never reaches into another step's code.** There is no shared classpath to reach across
  any more, and the duplication that rule causes is deliberate: step 0 has `Veil`, step 1 has
  `Scramble`, step 2 has its own `Veil`, and a step owning its grading code is the point. Do not
  factor them into a shared module.

Each step's own `CLAUDE.md` carries the rest, and it is the readable source for that step's Java:
what is in the package, how it is run, and **which parts of it are exercises that must not be
implemented**. Those prohibitions are the load-bearing part, so in short, and in full at
`kata/stepN/java/CLAUDE.md`:

- **step 0** — do not decode or reveal the intro flag.
- **step 1** — do not decode, implement or reveal any of the three flags, **do not add tracing**
  to the catalogue pipeline (instrumenting it is the student's work), and **do not solve
  `problem.md`**: no cut of it, no `solve.md`, no `plan-solve.md`, no shelves package.
- **step 2** — do not harden the loans module, do not implement `MemberStatements.forTier`, and do
  not add a `native` profile or write the resource hint. The project also carries **three plaintext
  setup flags**, one in its own `.claude` skill, one in its `CLAUDE.md` and one in the `domain`
  package's: do not gather them anywhere, and do not name those three files in the `setup` unit's
  prose or in a board hint. Finding out that a project holds files like that is the exercise.

`copilot-specific.md` at the root is the reference behind the course's GitHub Copilot variants: the
commands and files those blocks name, what is deliberately left out, and which numbers are dated. It
is authoring material rather than curriculum, and nothing renders from it.

`audit.md` at the root is the standing critique of the course: completeness per topic, cadence and
sequence per unit, and the delivery gaps. It is a **measured** document rather than a running one.
Its first line names the commit it was measured against, and every number in it was taken off the
files at that commit, so a row that nobody edited means "checked, still true". Table 1 reads by
`where` and lists only what is left to handle, so a place with no topics under it is a place with no
work in it. Use the `audit-update` skill in `.claude/skills/audit-update/` to
move it forward: it re-measures the counts, works out which rows the intervening commits actually
touch, and leaves the rest alone. Updating the audit and fixing what it lists are two different
jobs, and doing them in one commit makes the audit describe work the reader cannot see.

The frontend layout is `front/src/`: a `shared/` shell (components, deck, i18n, lib, mode, progress,
routes) plus one `steps/stepN/` folder per step, holding that step's registry, figures, flags,
locales, quiz and unit HTML. Read the folder rather than a list here. Two things about it are not
visible from the tree: dependencies point one way, so steps may import from `shared` and never the
reverse; and a step's `flags.ts` holds salted hashes only, never plaintext.

The presentation deck (`front/src/shared/deck/`, reached from the cogwheel at `/present`) is
documented in `front/CLAUDE.md`. One rule belongs here because it survives a careless edit from
anywhere: `shared/deck/deck-stage.js` is **vendored verbatim** from the smartagents-website repo so
it can be re-synced, and must not be edited.

### The catalogue

`GET /api/titles` returns nine fictional book titles, and hides three flags the step 1 `workshop`
board grades. How each of the three is hidden, why it does not fall out of a `grep`, and the several
prohibitions that keep it that way are all in `kata/step1/java/CLAUDE.md`, which is where they can be
maintained beside the code they describe. Read it before touching anything under `kata/step1/java/`.

The frontend has a page for calling all this: `/catalog`, linked under the steps in the sidebar.
`CatalogPage` renders `CatalogPanel`, which fetches `/api/titles` on a button press and lists what
came back, numbered, in arrival order. It is deliberately dumb: no caching, no massaging, no
filtering, so what is on screen is what the service returned. It is not a unit and belongs to no step,
but step 1's `workshop` unit now points the student at it to work the three flags.

## Running it

Two servers, two terminals. Vite proxies `/api` to the backend, so the browser stays on one
origin and Spring needs no CORS configuration.

```bash
cd kata/step1/java && mvn spring-boot:run   # step 1's backend on :8080
cd front && npm run dev                     # frontend on :5173  ← open this one
```

There is no such thing as "the backend" any more: there is the step whose service you are running.
Each step's project boots on `:8080`, so **only one at a time holds the port**, and the frontend's
proxy reaches whichever that is. That is fine, because a student works one step at a time and the
`/catalog` page belongs to step 1. Step 2 is the same command from `kata/step2/java`.

```bash
cd kata/step2/java && mvn spring-boot:run
curl -s localhost:8080/api/loans/statement/STUDENT | jq
```

Opening `:5173` with the backend down is a supported state: the quizzes and the two hash-checked
boards work as they always do, and submitting a free-text answer says it could not reach the
service. There is no longer a header badge to check first, so a proxy problem shows up where the
call is made rather than in the chrome.

Each step's `CLAUDE.md` carries the rest of its commands, including the DEBUG run that turns step 1's
stage chatter on.

## Build and test

Maven, no wrapper — use the `mvn` on `PATH` (3.9.16 locally). Four projects, none of them aggregated,
so **every command runs from inside `kata/stepN/java`**. There is nothing to build at the repo root.

Before any of that, on a fresh clone or when a failure smells environmental, use the `repo-setup`
skill in `.claude/skills/repo-setup/`: it checks the toolchain (including the JDK Maven actually
compiles with, which is not always the `java` on `PATH`) and installs `front/node_modules`. It
deliberately never runs the profiles that are meant to be red, so a green doctor and a red `graded`
are both correct.

`mvn test` must pass in every step, and on a clean checkout it does in all four. The invocations that
carry the kata's meaning are step 2's, and they are documented where they live
(`kata/step2/java/CLAUDE.md`). What matters from here:

```bash
cd kata/step2/java && mvn verify -Pgraded    # the workshop: red until the student hardens the module
cd kata/step2/java && mvn test -Pchallenge   # the challenge: red until they write forTier
```

Both are **meant to be red**, and making them green is the student's exercise rather than a build to
fix. Step 0 has one of its own and it is **deliberately not written down here**: naming the profile
is naming the exercise, and the unit that sets it is the only place a student should meet it. Every
one of these is opt-in, so the default `mvn verify` stays green in all four projects, and the whole
of the kata's "leave every step green" rule still holds.

To check the lot after a change that crosses projects:

```bash
for s in step0 step1 step2 step3; do (cd kata/$s/java && mvn -q verify) || echo "$s FAILED"; done
```

Run a subset via Surefire's `-Dtest` filter, adding `-DfailIfNoSpecifiedTests=false` so a typo'd
pattern is not a build failure.

No static analysis runs on the default Java build; plain `mvn verify` adds nothing beyond packaging.
Step 2's `graded` profile is the only exception, and only when you ask for it.

Frontend, from `front/`:

```bash
npm run build   # tsc -b + vite build — this is the type check, run it before committing
npm run lint    # oxlint, shipped with the Vite template
```

## Toolchain

- Each step's `pom.xml` has its own versions, and they are deliberately allowed to differ; a step
  upgrading Boot is not an event the other three have to attend. Two things a pom does not say:
  `javac` rejects APIs newer than the `<java.version>` property even though the local JDK is Oracle
  GraalVM 25.0.3, and the Boot parent manages every dependency version, so declare new Spring or test
  artifacts **without** a `<version>`.
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

- Package root `be.smartagents.kata.java`, and a step's own code sits under `...java.stepN`. Maven
  coordinates are `be.smartagents:kata-agentic-java-stepN`, so the groupId and the package root
  deliberately differ. Standard `src/main/java` + `src/test/java` layout inside each project, which
  means a package path is now `kata/stepN/java/src/main/java/be/smartagents/kata/java/stepN/`.
- Tests are `*Test.java` mirroring the production package (Surefire's default include
  patterns depend on this suffix).
- Table-driven cases use `@ParameterizedTest` + `@CsvSource` with a `name` template.
- Frontend imports go through the `@` alias. `components.json` points shadcn at
  `@/shared/components/ui`, so `npx shadcn@latest add …` keeps generating into `shared`.

The design system (tokens, the one teal, the two typefaces, the shell's breakpoints) and the
`id`/`data-component` naming convention every rendered element follows are in `front/CLAUDE.md`,
which loads when you work under `front/`. Read it before touching anything visual: nothing outside
`front/src/index.css` is allowed to hold a colour, and every element carries both attributes.

## Adding a step

Use the `adding-a-step` skill in `.claude/skills/adding-a-step/`: it carries the six files a new
step needs, in order, plus how figures and inline figures are wired and how unit ids become URLs.

Step ids are `stepN`, unit ids are words (`session`, `workshop`), and together they are the
URL (`/steps/step1/session`).

A step that needs Java gets a seventh file, its own project at `kata/stepN/java/`, and the shortest
honest way to start one is to copy `kata/step3/java`, which is a buildable empty scaffold kept for
exactly that. Give it its own `pom.xml` (Boot parent, no aggregator, artifactId
`kata-agentic-java-stepN`) and its own `CLAUDE.md`. Do not add a pom at the repo root to tie them
together: the steps are independent on purpose, and the reasoning is under `## Layout`.

The audience rule (`data-audience`), how mode filtering works, and the whole language and i18n
mechanism live in `front/CLAUDE.md`, which loads when you work under `front/`. Two rules from there
are worth carrying everywhere: **no em-dashes anywhere in student-facing prose** (the
`lesson-writing` skill in `.claude/skills/lesson-writing/` has the rest), and grading messages plus
the words a student types as an answer stay English in every language.
