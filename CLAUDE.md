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
- **Frontend** (`front/`) — React + Vite + shadcn/ui, on the teal design system described under
  Conventions. It owns the curriculum content and renders it for one of two audiences.

`step1` is **context** — the layers an agent's context is assembled from (prompt, session,
harness, external) and the fact that they share one finite window. It runs to six units. `evaluation`
closes the step with a flag board (like step 2's workshop): three flags the step 1 backend hides from
its `GET /api/titles` response, one per way context is assembled. The student reads the source for the
first (a literal in a branch that never runs), traces the running pipeline for the second (the hidden
tenth entry it computes and drops), and turns the log level up for the third (a line printed only at
DEBUG). The board grades in the browser against salted hashes, so it needs no backend. `intro` and
`prompt` each carry a three-question multiple-choice quiz, graded in the browser. `prompt` is the one
unit that goes past naming its layer: after saying what the layer is, it covers how to write a better
instruction (reasoning levels, meta-prompting, plan mode, and clearing, bundling and being exact).

The `evaluation` unit used to be a free-text exercise asking the student to place six items in the
right layer, graded by a `context-layers` checker on the Java service. That checker was never
restored after `shared` was removed, so the exercise was dead. It is retired: the flag board replaces
it and the six-item exercise is gone. **Do not implement the flags for the student.** The three flags
are the exercise; ship the puzzle, not the decode, the trace instrumentation or the DEBUG readout.

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
and control, and running it in a git worktree so you keep your own branch).

A seventh unit, `workshop`, closes the step as its capstone. It is the one part of step 2 a machine
can grade, because it grades the thing `quality` and `goals` argue for: a goal a build answers yes
or no to. It ships a small loans domain under `step2` (see below) that is green but un-hardened, and
a `graded` Maven profile that measures it against three goals - a coverage floor, a complexity
ceiling and honest (mutation-tested) coverage. `mvn verify -Pgraded` prints a leetspoken flag for
each goal met and fails until all three are. The student hardens the module (that is the exercise,
so do not ship the tests or the refactor), reads the flags, and pastes them into the `workshop`
flag board, which grades them in the browser against a salted hash and so works with the backend
down.

The board carries a **fourth flag of a different shape**. The first three sharpen code that already
runs; this one is functionality that does not exist yet. `MemberStatements.forTier` ships
unimplemented, so `GET /api/loans/statement/{tier}` answers with a 500, and the only description of
what it should do is a set of `@Tag("challenge")` tests. They are excluded from the default build and
run with `mvn test -Pchallenge`, red until the method is written. The unit tells the student to plan
it in plan mode against the failing tests before implementing. Once the tests pass the live endpoint
returns the code, which goes into the board like the others. **Do not implement `forTier`**: that is
the exercise.

The board carries a **fifth flag of yet another shape**: not a profile and not the JVM, but a compiled
native image, and it is built to resist a one-shot so the student has to plan it. The seam is
`step2/aot/NativeImageFlag`, an `ApplicationRunner` that prints only when `NativeDetector.inNativeImage()`
is true, so `mvn spring-boot:run` and `mvn test` stay silent and the flag is proof of a native image.
Three things stand between the student and it, each a plan-worthy step:

- **The build makes a jar, and step 1's jar at that.** Wiring an ahead-of-time build is the exercise
  and, like the graded profile, is not in the `pom.xml`. The student declares the GraalVM
  `native-maven-plugin` (the Boot parent manages its version and binds `process-aot` under its own
  `native` profile) and points it at *step 2's* app.
- **The right main class.** `NativeImageFlag` lives under step 2, and the Boot plugin's `<mainClass>` is
  pinned to step 1, so a native image has to be compiled for `Step2Application` (both the
  `spring-boot-maven-plugin` and `native-maven-plugin` need its main class); a native image of step 1
  never loads the runner.
- **A resource the image drops.** The catch that stops a one-shot: the flag's shifted payload is not a
  Java constant, it is a classpath resource, `src/main/resources/flags/native-image.veil`. A native
  image keeps only the resources it is told to, so a plain compile builds an image that starts, cannot
  find the resource, and prints a miss (`[ ] ... flag resource is not inside it`) instead of the code.
  Reaching the flag needs a `RuntimeHintsRegistrar` wired with `@ImportRuntimeHints` that registers the
  resource pattern.

**Do not add a `native` profile to the `pom.xml`, and do not write the resource hint or a
`RuntimeHintsRegistrar`**: wiring the build, targeting step 2, and planning the hint are the exercise.
The unit tells the student to plan all of it in plan mode, using the runtime miss as the spec for the
fix. The other six units are still framing prose with no quiz.

A **step** is a topic; a **unit** is one page inside it, holding prose, a quiz, an exercise, or any
combination. The URL is `/steps/step1/session`; a bare `/steps/step1` forwards to the step's first
unit.

Two kinds of grading, on purpose. A multiple-choice question is graded by `QuizPanel` in the
browser, because the answer is one of the options already on screen and a round trip would add
nothing. A flag board (`FlagBoard` in step 1, `Workshop` in step 2) is graded the same way, against a
salted SHA-256 hash: the work already happened against the backend, and the board only confirms the
student read what it produced. Both read as backend-independent: they still work with the service
down.

**No unit posts a free-text answer to the service any more.** `shared` once held `/api/health` and
`/api/exercises/{id}/check`, and both are gone; step 1's `evaluation` was the only free-text exercise
and it is now the browser-graded flag board, so no `exerciseId` is left in the tree. `ExercisePanel`
and `checkAnswer` in `shared/lib/api.ts` are still present but unused; retiring them is a later
decision, not an oversight. The header used to carry a `BackendStatus` badge polling `/api/health`;
with that endpoint gone it could only ever read "offline", so it is gone too, along with `fetchHealth`
and the `backend.*` messages.

## Layout

The frontend still splits into a `shared` shell plus one folder per step. The backend now has a web
tier in both steps, and **each step has its own `@SpringBootApplication`** scoped to its own package
by the default component scan (no `scanBasePackages`): `Step1Application` boots step 1 and only step
1, `Step2Application` boots step 2 and only step 2. Running one never drags in the other. A step adds
its Java by writing its own app plus whatever it exposes.

Because two `@SpringBootApplication` classes now live in the tree, the Boot plugin can no longer find
a single main class on its own, so `spring-boot-maven-plugin` pins `<mainClass>` to `Step1Application`
in the `pom.xml`. That is what "running the app" means by default: `mvn spring-boot:run` starts step 1.
Step 2 is run explicitly with
`mvn spring-boot:run -Dspring-boot.run.main-class=be.smartagents.kata.java.step2.Step2Application`.
The two steps no longer share a port at runtime; you run the one whose endpoints you want.

One consequence worth knowing: `@SpringBootTest` searches *upwards* from its own package for the
configuration class, and step 2's `Step2Application` sits beside its tests rather than above them. A
step 2 test that boots the context names it, `@SpringBootTest(classes = Step2Application.class)`, the
way `LoanControllerTest` does; naming it also keeps the boot to that step's slice.

```
src/main/java/be/smartagents/kata/java/step1/
  Step1Application.java         step 1's entry point; default scan of ...step1 only
  TitleController.java          GET /api/titles
  services/                     CatalogStage, AuxiliaryStage, CatalogRun, Catalog, Scramble
                                and the fifty stage classes they walk
src/main/java/be/smartagents/kata/java/step2/
  Step2Application.java         step 2's entry point; default scan of ...step2 only
  domain/                       Loan, MediaType, MemberTier, LateFeePolicy (the branchy method)
  port/                         LoanRepository, the port the use case reads through
  adapter/                      InMemoryLoanRepository
  application/                  LateFeeReport, and MemberStatements (forTier is the challenge stub)
  web/                          LoanController (GET /api/loans/statement/{tier}), StatementResponse,
                                StatementCode (the fourth flag, kept shifted)
  aot/                          NativeImageFlag: the fifth flag, printed only inside a native image
                                (reads its payload from flags/native-image.veil, a dropped resource)
  config/                       LoanDataConfig: the seeded overdue shelf the endpoint reports on
src/test/java/be/smartagents/kata/java/step2/
  domain/                       LateFeePolicyTest: the one thin shipped test (keeps default green)
  application/                  MemberStatementsTest: @Tag("challenge") spec for the missing method
  web/                          LoanControllerTest: @Tag("challenge") spec for the endpoint
  grading/                      FlagRevealIT, Flag, Veil: the graded-profile reveal, run by failsafe

front/src/
  main.tsx, App.tsx, index.css  entry point and routing
  shared/components/            AppShell, StepNav, UnitPager, SettingsMenu, ExercisePanel,
                                QuizPanel, CatalogPanel, … and ui/ (Popover among them)
  shared/i18n/                  i18n.ts (the instance), locales/, useLocale, useStepText
  shared/lib/                   api.ts, content.ts, hash.ts (sha256Hex for the flag board), utils.ts
  shared/mode/                  the guided/self-learning toggle
  shared/progress/              which units are done; a Set in localStorage, drawn as sidebar checks
  shared/routes/                StepPage (forwards), UnitPage (renders a unit), CatalogPage
  shared/step.ts                Step, Unit, QuizQuestion and QuizChoice
  steps/index.ts                the ordered registry, the reading order, locale registration
  steps/step1/index.tsx         the step's units and title keys; evaluation carries the flag board
  steps/step1/BundleCompare.tsx three follow-ups against one bundled ask, clicked through side by
                                side. The left frame arrives `P1`, `A1`, `P2`, `R1 + A2`, `P3`,
                                `R2 + A3`: a prompt goes alone, then the stack it dragged along
                                shows up as a copy, so the frame fills with duplicates and scrolls.
                                A measured arrow runs from each copy up a left gutter and back in
                                above its prompt, where the copy really sat in the request.
                                Inline figure in `prompt`
  steps/step1/FlagBoard.tsx     the `evaluation` flag board, graded in the browser (figure slot)
  steps/step1/flags.ts          the three context flags as salted hashes, never plaintext
  steps/step1/locales/          en.json and nl.json: this step's titles, quiz and prose
  steps/step1/quiz.ts           the step's multiple-choice questions, as message keys
  steps/step1/units/            <unit>.html, one file per unit, English, with data-i18n keys
  steps/step2/index.tsx         agentic engineering; the units, the two trees and the flag board
  steps/step2/FileTree.tsx      draws a folder layout; both trees below are data for it
  steps/step2/ProjectTree.tsx   the .claude/ layout, drawn inside the prose of `setup`
  steps/step2/DomainTree.tsx    a DDD, ports-and-adapters layout, inside `engineering`
  steps/step2/Workshop.tsx      the `workshop` flag board, graded in the browser (figure slot)
  steps/step2/flags.ts          the three flags as salted hashes, never plaintext
  steps/step2/locales/          same pair; six units of prose plus the workshop
  steps/step2/units/            same shape as step 1's; workshop.html is the capstone
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
mistaking it for catalogue prose once you have it. This is the **trace flag**, the second of the three
flags step 1's `evaluation` board grades: the student instruments the running pipeline to read it.
**This is a deliberate exercise, and the point is that it does not fall out of a search.** Four things
protect it:

- **Nothing is stored in plaintext.** All 41 non-publisher stages restore a string through
  `Scramble.unveil`, and they all look alike doing it. Only the nine publishers hold a literal, and
  those are the visible output anyway.
- **Almost everything published is thrown away.** `CatalogRun` drops any line containing `(draft)`,
  and 40 of the 41 restored strings carry it. So publishing is not the tell either: the auxiliaries
  publish for real and vanish.
- **The commented-out publish is not unique.** Eleven stages have one, and uncommenting all eleven
  is not a shortcut: five lines appear and all five are flags in the same shape. Six of the decoys
  carry the marker and vanish; four do not, on purpose, and those four are flags too. Which of the
  five is the real one is a judgement about what it says, not something the structure gives away. The
  board settles that judgement by hashing exactly one, `ManuscriptTallyStage`'s
  `{pr0mpt1ng_w1th_tr4c3r5}` (`@Order(21)`): its text rewards tracing, and the other four stay decoys
  the board rejects.
- **Stored lengths sit in one band.** The five flags are 22 to 25 characters, and every one of
  those lengths is shared with a marked string. Sorting the 41 ciphertexts by length must not
  separate them, so any new stored string has to land inside the band rather than at either end.
- **The always-run set is padded to twenty on purpose.** Nine publishers plus those eleven. If the
  runner always ran exactly the ten title-bearing stages, nine would publish visibly and the tenth
  would be the answer by elimination.

Words a naive search reaches for — key, secret, hidden, vault, cipher, token, draft — appear in
class names across all three groups, so grepping any of them proves nothing.

The other two flags the `evaluation` board grades hide by a different mechanism each, so the three
tasks stay distinct. The **decode flag** (`{r34d_th3_d34d_c0d3}`) is a `Scramble.unveil` call in a
branch of `VaultDoorStage` that can never run (`tally` is folded modulo 9973 and then compared
`>= 9973`), so a trace never surfaces it and only reading the source plus reproducing `unveil` reaches
it. That branch carries **no comment, on purpose**: it used to say "this never runs", which ended the
exercise in one grep, and the whole `services` package has no other line comment besides the eleven
commented publishes. Do not explain the dead branch in a comment. The **DEBUG flag** (`{d3bug_l3v3l_r3v34ls}`) is emitted by `AtlasBindingStage` at `log.debug`,
decoded by a small inline shift rather than `Scramble.unveil` so it stays out of the unveil stream a
trace would catch; it prints only when `logging.level.be.smartagents.kata.java.step1=DEBUG` is set. The
three map onto the layers step 1 teaches: read the source (external), trace the run (session), turn the
log level up (harness). **Do not decode, implement or reveal any of the three for the student.**

The frontend has a page for calling all this: `/catalog`, linked under the steps in the sidebar.
`CatalogPage` renders `CatalogPanel`, which fetches `/api/titles` on a button press and lists what
came back, numbered, in arrival order. It is deliberately dumb: no caching, no massaging, no
filtering, so what is on screen is what the service returned. It is not a unit and belongs to no step,
but step 1's `evaluation` unit now points the student at it to work the three flags.

**Do not add tracing here.** No hook, no callback, no candidate-logging method. Instrumenting this
pipeline, running it and reading the trace is the student's work (it is the trace flag); shipping a
seam does the exercise for them. A `Tracer` that logged every restored string at INFO was committed
once and has been removed for exactly this reason: with it in place, a plain run printed the trace
flag for free. Do not reintroduce it. The `log.debug("I was here…")` breadcrumbs are inert and must
stay that way, with one deliberate exception: `AtlasBindingStage`'s `log.debug` carries the DEBUG
flag, on purpose, and is the whole of that flag's exercise.

The tests assert the nine known titles as a *subsequence* and size `>= 9`, never `== 9`, so a
student who enables the tenth line does not land in a red build.

## Running it

Two servers, two terminals. Vite proxies `/api` to the backend, so the browser stays on one
origin and Spring needs no CORS configuration.

```bash
mvn spring-boot:run     # backend on :8080
cd front && npm run dev # frontend on :5173  ← open this one
```

Opening `:5173` with the backend down is a supported state: the quizzes and the two hash-checked
boards work as they always do, and submitting a free-text answer says it could not reach the
service. There is no longer a header badge to check first, so a proxy problem shows up where the
call is made rather than in the chrome.

The catalogue is easiest to look at straight from the service:

```bash
curl -s localhost:8080/api/titles | jq
mvn spring-boot:run -Dspring-boot.run.arguments=--logging.level.be.smartagents.kata.java.step1=DEBUG
```

The second one turns on the stage chatter, which is off by default.

Step 2 runs as its own application, so start it explicitly (default `spring-boot:run` is step 1); it
answers per member tier on the same port:

```bash
mvn spring-boot:run -Dspring-boot.run.main-class=be.smartagents.kata.java.step2.Step2Application
curl -s localhost:8080/api/loans/statement/STUDENT | jq
```

It returns a 500 until the student implements `MemberStatements.forTier`, which is the challenge, and
its code once they do.

## Build and test

Maven, single module, no wrapper — use the `mvn` on `PATH` (3.9.16 locally).

```bash
mvn test                  # compile + run all tests
mvn -q test               # same, quiet; prints only failures
mvn verify                # full build through packaging
mvn clean test            # after changing the compiler release or plugin versions
mvn verify -Pgraded       # the step 2 workshop: grades the loan module, prints its flags
mvn test -Pchallenge      # the step 2 challenge: the spec for the statement endpoint
```

`mvn verify -Pgraded` is the student's target, and it is meant to be red on a fresh checkout: the
`graded` profile wires JaCoCo (a coverage floor and a per-method complexity ceiling) and PIT
(mutation coverage) over the `step2` module, and `FlagRevealIT` prints a flag for each goal already
met, then fails until all three are. It is opt-in on purpose, so the default `mvn verify` (and every
step of this kata) stays green. Do not harden the module to make it pass: that is the exercise. PIT
and the reveal `*IT` run only under this profile.

`mvn test -Pchallenge` is the other half, and it is red on a fresh checkout for a different reason:
the tests are the spec for `MemberStatements.forTier`, which ships as a stub that throws. They carry
`@Tag("challenge")` and the default build excludes that group through the
`surefire.excluded.groups` property, which the `challenge` profile empties. **Do not implement
`forTier` to make them pass**: planning and writing it is the student's exercise, and the statement
endpoint pays out its code once they do. A new exercise spec of this kind belongs behind the same
tag, so a clean checkout stays green.

The fifth flag (native image) has no profile in this `pom.xml` on purpose, and unlike the earlier
flags it is built to resist a one-shot (see the step 2 workshop notes above). Wiring the GraalVM
`native-maven-plugin` and the ahead-of-time step is the exercise; the image must be compiled for step 2
(main class `Step2Application`), since `NativeImageFlag` lives there and the default `<mainClass>` is
step 1; and even then a plain compile only prints a miss, because the flag's payload is the classpath
resource `flags/native-image.veil` and a native image keeps only the resources it is told to. The
student reads that runtime miss, plans a `RuntimeHintsRegistrar` (`@ImportRuntimeHints`) that registers
the resource, and rebuilds. `NativeImageFlag` gates on `NativeDetector.inNativeImage()`, so it is inert
under `mvn test` and `mvn spring-boot:run`. Verified end to end with GraalVM 25: a plain native build
of `Step2Application` prints the miss, and the same build with the resource hint prints the flag. **Do
not add a `native` profile to the `pom.xml`, and do not write the resource hint.**

Run a subset via Surefire's `-Dtest` filter. Add `-DfailIfNoSpecifiedTests=false` so a
typo'd or non-matching pattern is not a build failure:

```bash
mvn test -Dtest='CatalogTest' -DfailIfNoSpecifiedTests=false
mvn test -Dtest='CatalogTest#publishesEveryKnownTitleInStageOrder' -DfailIfNoSpecifiedTests=false
mvn test -Dtest='*Test#shouldHandle*' -DfailIfNoSpecifiedTests=false
```

No static analysis runs on the default Java build; plain `mvn verify` adds nothing beyond packaging.
The `graded` profile is the exception: it runs JaCoCo and PIT over the `step2` module (see the step 2
notes above), but only when you ask for it with `-Pgraded`.

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

### The design system

The look comes from a design system authored outside this repo (a Claude Design project, file
`Educational Design System v3.dc.html`) and lives here as tokens in `front/src/index.css`. Nothing
else holds a colour: components name tokens, so a change to the palette is a change to one file.

- **One teal does the heavy lifting.** `--primary` is `oklch(0.567 0.1 184.994)`, and it marks the
  primary action, the active step, the active unit, the current language and the focus ring.
  Neutrals carry a faint teal undertone (hue 190 to 200, chroma under 0.015), so surfaces read warm
  rather than clinical grey. `--success` means passed and `--destructive` means failed; nothing else
  borrows them. `--success` tints a panel and `--success-foreground` is the darker ink that stays
  readable on that tint, which is why there are two. The one exception to the light UI is the
  header: `--header` is a deep teal (`oklch(0.28 0.055 185)`), the single dark surface, with
  `--header-foreground` white ink and a translucent-white cogwheel control sitting on it. It is a
  band, not a bar: the 60px top bar stays pinned while a run of the same teal sits below it, and the
  whole app rides in one white rounded card that pulls up to overlap that band and then slides under
  the bar as the page scrolls. A finished unit's self-learning note is a teal left-rule callout
  (`aside[data-audience="self"]`); a guided one stays a muted panel.
- **Two typefaces, and the switch between them is the signal.** Figtree for everything a
  student reads, JetBrains Mono for anything the machine produced: code, counts, flags, catalogue
  titles, step numbers. Both are variable fonts from `@fontsource-variable`, imported in
  `index.css`; nothing loads from a CDN.
- **The interface stays nearly flat.** Separation is a 1px border, not a shadow. `--shadow-*` has
  three real steps (hairline, raised, overlay) drawn from one teal-black at four opacities, and
  depth is reserved for things that genuinely float: the settings sheet, dialogs.
- **Two utilities carry the repeated shapes.** `eyebrow` is the small mono uppercase label above a
  heading, colour left to the caller (teal for a section, muted for a sub-label). `field` is a
  typed answer box: mono, hairline border, and the same 3px teal focus ring on every field, so a
  keyboard user has one signal to follow. Reach for these instead of copying the class list.
- **Typography's own grey ramp is overridden**, not used: `.prose` in `index.css` points
  `--tw-prose-*` at the tokens, which is why `StepContent` renders `prose` without `prose-neutral`.

Dark mode is defined for coherence, since `dark:` variants are scattered through the generated
`ui/` primitives, but nothing in the UI switches to it.

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
`data-state`: a `FlagRow` is always `#flags-item-N` with `data-state="solved" | "locked"`, and
`CatalogPanel` is always `#catalog` with the fetch's phase on it, so a test can find the thing
before knowing what it will say.

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
URL (`/steps/step1/session`). No unit carries an `exerciseId` today (the free-text mechanism is
unused; see above), but the field is still on `Unit`: an exercise id is named after what it tests,
not after the step or unit, so one step could grow several.

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

Both settings live behind the cogwheel in the header, which opens `SettingsMenu` as a popover
dropping from it (it used to be a `SettingsSheet` sliding in from the left).

Progress is tracked in the browser only, through `shared/progress/`: a unit is marked done when the
student advances past it with the pager's Next, or aces its quiz. The sidebar then swaps that unit's
number for a teal check. It is a convenience, not a grade, and it persists under the `kata.completed`
localStorage key, degrading to "nothing done" if storage is unavailable.

When writing or translating lesson text, use the `lesson-writing` skill in
`.claude/skills/lesson-writing/`. Its main rule: no em-dashes anywhere in student-facing prose.
