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
- **Record decisions, not content.** When a step introduces a real constraint — a prohibition, a
  gotcha, a deliberate piece of obfuscation, a reason something is shaped the way it is — write it
  here. Do not summarise what a unit teaches: the unit HTML is the readable source for that, and a
  summary here only rots. This file is the part of the repo the code cannot explain about itself.

## Project state

Two parts, both walking-skeleton thin:

- **Backend** (repo root) — a Spring Boot service exposing `/api`. It is now the *subject* of a
  step rather than a grader for one: it serves a catalogue of book titles that the student will
  instrument and trace. It does not serve the curriculum.
- **Frontend** (`front/`) — React + Vite + shadcn/ui, on the teal design system described under
  Conventions. It owns the curriculum content and renders it for one of two audiences.

`step1` is **context**: the layers an agent's context is assembled from (prompt, session, harness,
tools) and the fact that they share one finite window. Six units — `intro`, `prompt`, `session`,
`harness`, `tools`, `evaluation` — and the unit HTML is the source for what each one teaches.
Three editorial constraints the HTML does not state on its own: every layer unit goes past merely
naming its layer, and none of the four is allowed to read as a stub (they sat within about a hundred
words of each other until `tools` grew the MCP material, and that floor is the part that matters); the sub-agent starting blank is the point all three `harness` patterns turn on; and
the pattern diagrams share one vocabulary (a teal frame is a context, a bar is something in it,
dashes are what is not) that any new diagram should join. `intro` and `prompt` each carry a
three-question quiz. `harness` closes on `PatternMatch`, a drag-to-connect exercise whose three
situations against four patterns leave decomposition on the board with nothing pointing at it.

`intro` and `session` overlap by design, and how the overlap is handled is the decision. `intro`
already argues the re-send, the cost per message and the dead bug hunt, so `session` does not
re-argue them: it owns what `intro` cannot, namely that this is the only layer with a time axis (the
other three are one turn's worth, and they *settle* here, so a fetched page is a tool result for one
turn and session content forever), that the student authored almost none of it by volume, and that it is
therefore the only layer they can prune after the fact. The paragraphs that do restate `intro` are
`data-audience="guided"` rather than deleted, because `intro`'s whole prose is self-only: in class
that unit is walked through at the board, so `session` is the first prose a guided student reads and
the bridge has to be there. Do not un-tag them and do not let the unit grow back into a second
`intro`. Its figure, `SessionMakeup`, argues the *share* (two teal slivers against the files and test
output around them) and deliberately says nothing about growth or re-sending, which is
`BundleCompare`'s job in `prompt`.

`tools` is the fourth layer, and it used to be `external` ("material from outside"). The rename is
the decision: naming the mechanism (the model asks, your system runs it, the output is appended)
beats naming the origin, because the origin was never the thing a student can act on. What survived
the rename is the part that still holds for a tool result, namely that nothing in the window says
who wrote it and that a result is usually the bulkiest thing in there. The layer is named in three
other places (`session`'s time-axis paragraph, `evaluation`'s opening list and its read-the-source
close), so a further rename has to visit them. Its figure, `ToolsInContext`, argues one thing only:
the tool straddles the frame, so the half that runs is outside the window and only the result crosses
back in. `McpServer` is the second figure and is deliberately *not* independent: it is the same
frame, the same prompt bar and the same fills, so read on its own it says nothing. What it adds is
the wire, and the wire is its whole argument: one line leaves the named box outside, crosses the
border exactly once, and fans out into four description bars that then sit in the window like
anything else. It drew four straddling tools once instead, which said only "there are four now" and
left a large empty box beside them with nothing pointing into it. The crossing is the load-bearing
part: dashed while the line is outside, solid once it is in, so the border keeps meaning what it
means in every other diagram here. Redrawing either figure on its own geometry breaks the pair. The unit's order is
the argument too, so keep it: what a tool is, where extra ones come from (MCP), what holding many of
them costs, why the results are the least trustworthy layer, what they cost by volume.

`evaluation` closes the step with a flag board: three flags the step 1 backend hides from its
`GET /api/titles` response, one per way context is assembled. The student reads the source for the
first (a literal in a branch that never runs), traces the running pipeline for the second (the hidden
tenth entry it computes and drops), and turns the log level up for the third (a line printed only at
DEBUG). **Do not implement the flags for the student.** The three flags
are the exercise; ship the puzzle, not the decode, the trace instrumentation or the DEBUG readout.

`step2` is **agentic engineering**: how you work with an agent, as opposed to what it knows. Six
units, one habit each — `setup`, `engineering`, `scoping`, `patterns`, `quality`, `goals` — all of
them framing prose with no quiz, and the unit HTML is the source for what each argues.

A seventh unit, `workshop`, closes the step as its capstone. It is the one part of step 2 a machine
can grade, because it grades the thing `quality` and `goals` argue for: a goal a build answers yes
or no to. It ships a small loans domain under `step2` (see below) that is green but un-hardened, and
a `graded` Maven profile that measures it against three goals - a coverage floor, a complexity
ceiling and honest (mutation-tested) coverage. `mvn verify -Pgraded` prints a leetspoken flag for
each goal met and fails until all three are. The student hardens the module (that is the exercise,
so do not ship the tests or the refactor), reads the flags, and pastes them into the `workshop`
flag board.

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
Its payload is a classpath resource rather than a Java constant, so an image built without thinking
about resources starts, cannot find it, and prints a miss instead of the code. Three things stand
between the student and the flag — wiring an ahead-of-time build, aiming it at step 2 rather than the
pinned step 1 main class, and reading that runtime miss as the spec for the fix — and each is a
plan-worthy step the unit tells them to work in plan mode.

**Do not add a `native` profile to the `pom.xml`, and do not write the resource hint or a
`RuntimeHintsRegistrar`**: wiring the build, targeting step 2, and planning the hint are the exercise.
Do not spell out the fix here either; the runtime miss is what the student is meant to read.

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
```

The frontend layout is `front/src/`: a `shared/` shell (components, i18n, lib, mode, progress,
routes) plus one `steps/stepN/` folder per step, holding that step's registry, figures, flags,
locales, quiz and unit HTML. Read the folder rather than a list here. Two things about it are not
visible from the tree: dependencies point one way, so steps may import from `shared` and never the
reverse; and a step's `flags.ts` holds salted hashes only, never plaintext.

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
three map onto the layers step 1 teaches: read the source (tools), trace the run (session), turn the
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

The standard Maven invocations apply. The two that are not standard, and that carry the kata's
meaning:

```bash
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

The fifth flag (native image) has no profile in this `pom.xml` on purpose, and it is inert under
`mvn test` and `mvn spring-boot:run` because it gates on `NativeDetector.inNativeImage()`. Wiring the
ahead-of-time build is the exercise; the step 2 workshop notes above carry the detail, including the
two prohibitions: **do not add a `native` profile to the `pom.xml`, and do not write the resource
hint.** Verified end to end with GraalVM 25.

Run a subset via Surefire's `-Dtest` filter, adding `-DfailIfNoSpecifiedTests=false` so a typo'd
pattern is not a build failure.

No static analysis runs on the default Java build; plain `mvn verify` adds nothing beyond packaging.
The `graded` profile is the exception: it runs JaCoCo and PIT over the `step2` module (see the step 2
notes above), but only when you ask for it with `-Pgraded`.

Frontend, from `front/`:

```bash
npm run build   # tsc -b + vite build — this is the type check, run it before committing
npm run lint    # oxlint, shipped with the Vite template
```

## Toolchain

- The `pom.xml` has the versions. Two things it does not say: `javac` rejects APIs newer than
  the `<java.version>` property even though the local JDK is Oracle GraalVM 25.0.3, and the Boot
  parent manages every dependency version here, so declare new Spring or test artifacts
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
- Frontend imports go through the `@` alias. `components.json` points shadcn at
  `@/shared/components/ui`, so `npx shadcn@latest add …` keeps generating into `shared`.

### The design system

The look comes from a design system authored outside this repo (a Claude Design project, file
`Educational Design System v3.dc.html`) and lives here as tokens in `front/src/index.css`. Nothing
else holds a colour: components name tokens, so a change to the palette is a change to one file.

- **One teal does the heavy lifting.** `--primary` marks the primary action, the active step, the
  active unit, the current language and the focus ring. Neutrals carry a faint teal undertone, so
  surfaces read warm rather than clinical grey. `--success` means passed and `--destructive` means
  failed; nothing else borrows them. `--success` tints a panel and `--success-foreground` is the
  darker ink that stays readable on that tint, which is why there are two. The one exception to the
  light UI is the header: `--header` is the single dark surface, with `--header-foreground` white
  ink. It is a band, not a bar, and the app rides in one white card that overlaps it. A finished
  unit's self-learning note is a teal left-rule callout (`aside[data-audience="self"]`); every other
  aside is a muted panel, whether it is a teacher note or carries no audience at all, so an aside
  meant for everybody needs no attribute and still reads as an aside. One aside is louder than that:
  `aside[data-variant="warning"]` is the hazard shape, an amber panel with a triangle in the gutter,
  and `tools`'s prompt-injection note is the only one so far. Amber is the caution colour and it was
  already the coin's, so a warning panel and a cost tip share a hue on purpose; `--success` and
  `--destructive` stay reserved for passed and failed. The triangle is drawn by `index.css` from the
  `--warning-triangle` mask rather than written into the prose, because it is the callout's shape
  rather than part of the sentence, and a translation that dropped it would drop the warning.
- **Every route change starts at the top.** The window keeps its scroll position across a
  navigation, so `AppShell` sends it back to 0 whenever the pathname changes; without it the pager
  at the foot of a long unit drops you into the middle of the next one. A location carrying a hash
  is exempt, or the browser's anchor jump would be undone the moment it landed (`intro` links to
  `#entropy`).
- **The two-column shell is an `lg` thing, and below that the sidebar is not a sidebar.** The card's
  `248px` nav column, its wide gap and its wide padding all start at `lg`; under it the card is one
  column, the nav stacks above the article, and it collapses behind a chevron because the whole
  curriculum otherwise pushes the unit off the screen. Following a link closes it again. Two things
  there are load-bearing: the nav's `sticky`, `max-h` and `overflow-y` are `lg:`-prefixed, or
  stacked it would pin itself over what you navigated to; and the column is `grid-cols-1` by
  default rather than a fixed track, or `#app-main` collapses to zero width and every unit
  disappears. Long inline `<code>` breaks anywhere and a `<pre>` scrolls in its own box (both in
  `index.css`), since a fully qualified property name has nothing to wrap at.
- **Two typefaces, and the switch between them is the signal.** Figtree for everything a
  student reads, JetBrains Mono for anything the machine produced: code, counts, flags, catalogue
  titles, step numbers. Both are variable fonts imported in `index.css`; nothing loads from a CDN.
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

Use the `adding-a-step` skill in `.claude/skills/adding-a-step/`: it carries the six files a new
step needs, in order, plus how figures and inline figures are wired and how unit ids become URLs.

Step ids are `stepN`, unit ids are words (`session`, `evaluation`), and together they are the
URL (`/steps/step1/session`).

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

English and Dutch, on i18next; `shared/i18n/i18n.ts` has the wiring. Everything is one mechanism: a
key, looked up in a namespace — `ui` for the chrome, one namespace per step for everything else,
pushed in from `steps/index.ts` because `shared` never imports a step.

Three things about it are decisions rather than mechanics. **Unit prose is one English HTML file**,
and its blocks carry `data-i18n` keys into the step's namespace, so a half-translated unit degrades
one paragraph at a time rather than falling back wholesale. A missing UI key is a compile error; a
missing prose translation only warns in the dev console, which is the closest prose gets to the same
safety. And the English HTML is the English: there is no `en` entry for prose.

Prose keys read `<unit>.<section>.<n>`, where the section is slugified from the `<h2>` above the
block (`lead` before the first one) and the heading itself is `<unit>.<section>.heading`. That
makes a key a location rather than a summary: moving a paragraph into another section means
renaming its key, and the console will tell you if you forget.

Grading messages come from the Java service and are **English in every language**. The Dutch
`exercise.description` says so rather than letting it surprise anyone. The words a student
types as an answer (`prompt`, `session`, `keep`, `gone`) also stay English in every language:
they are what the checkers grade, and the Dutch content says so where it asks for them.

Both settings live behind the cogwheel in the header. Progress is browser-only
(`shared/progress/`): a unit is marked done when the student pages past it or aces its quiz. It is a
convenience, not a grade, and it degrades to "nothing done" if localStorage is unavailable.

When writing or translating lesson text, use the `lesson-writing` skill in
`.claude/skills/lesson-writing/`. Its main rule: no em-dashes anywhere in student-facing prose.
