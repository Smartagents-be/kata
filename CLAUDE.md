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

- **Backend** (repo root) — a Spring Boot service exposing `/api`. It grades submitted
  answers; it does not serve the curriculum.
- **Frontend** (`front/`) — React + Vite + shadcn/ui. It owns the curriculum content and
  renders it for one of two audiences.

Only `step1` exists so far, and it is a placeholder: a FizzBuzz warm-up that proves the loop
end to end. Replace its contents once the real first step is written.

## Layout: shared vs. per-step

Both halves are split the same way — a `shared` part holding the application shell, and one
folder per step holding only that step's material.

```
src/main/java/be/smartagents/kata/java/
  KataApplication.java          entry point; stays at the root so component scanning
                                reaches both shared and every step
  shared/exercise/              ExerciseChecker, ExerciseCheckers, CheckResult
  shared/web/                   HealthController, ExerciseController
  step1/                        FizzBuzz, FizzBuzzChecker

front/src/
  main.tsx, App.tsx, index.css  entry point and routing
  shared/components/            AppShell, StepNav, ModeToggle, ExercisePanel, … and ui/
  shared/lib/                   api.ts, content.ts, utils.ts
  shared/mode/                  the guided/self-learning toggle
  shared/routes/, shared/step.ts
  steps/index.ts                the ordered registry
  steps/step1/                  content.html + index.ts
```

**Dependencies point one way: steps may import from `shared`, never the reverse.** That is
why `ExerciseControllerTest` grades against a stub checker defined in the test rather than
importing `FizzBuzzChecker` — a shared test that reaches into a step would invert the
relationship. `ExerciseCheckers` finds checkers by collecting every `ExerciseChecker` bean,
so `shared` never needs to name a step.

`KataApplication` is the one thing that stays at the package root rather than moving into
`shared`. `@SpringBootApplication` scans downward from its own package, so putting it inside
`shared` would hide every step's beans.

## Running it

Two servers, two terminals. Vite proxies `/api` to the backend, so the browser stays on one
origin and Spring needs no CORS configuration.

```bash
mvn spring-boot:run     # backend on :8080
cd front && npm run dev # frontend on :5173  ← open this one
```

Opening `:5173` with the backend down is a supported state: the header badge reads
"Backend offline" and submitting an answer reports the same. That is the fastest way to
tell a proxy problem from a UI problem.

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
mvn test -Dtest='FizzBuzzTest' -DfailIfNoSpecifiedTests=false
mvn test -Dtest='FizzBuzzTest#mapsNumberToFizzBuzz' -DfailIfNoSpecifiedTests=false
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
- Table-driven cases use `@ParameterizedTest` + `@CsvSource` with a `name` template, as in
  `FizzBuzzTest`.
- Frontend imports go through the `@` alias (`@/shared/lib/api`), configured in both
  `tsconfig.app.json` and `vite.config.ts`. `components.json` points shadcn at
  `@/shared/components/ui`, so `npx shadcn@latest add …` keeps generating into `shared`.

## Adding a step

1. `front/src/steps/stepN/content.html` — plain HTML, no wrapper element needed.
2. `front/src/steps/stepN/index.ts` — default-export a `Step` (`id`, `title`, `html`, and
   `exerciseId` if it asks for an answer).
3. Append it to the array in `front/src/steps/index.ts`. That list drives both the sidebar
   and the routes; nothing else needs touching.
4. Java side, if the step is graded: `be.smartagents.kata.java.stepN`, with an
   `ExerciseChecker` `@Component`. It registers itself by being a bean — no wiring, no
   edits to `shared`.

Step ids are `stepN` and become the URL (`/steps/step1`). Exercise ids are named after what
they test (`fizzbuzz`), not after the step, so one step can grow several exercises.

### The audience rule

Any element in step HTML may carry `data-audience`:

```html
<aside data-audience="self">Hint: check divisibility by 15 before 3 and 5.</aside>
<p data-audience="guided">Your teacher will walk through this on the board.</p>
```

`"self"` shows only in self-learning mode, `"guided"` only in class, and **no attribute
means always visible** — that is the common case, so reach for the attribute only when
material genuinely belongs to one audience.

`renderForMode` in `front/src/shared/lib/content.ts` *removes* non-matching elements from the
parsed document rather than hiding them. Keep it that way: text that is merely
`display: none` is one devtools panel away during a lesson. That function also renders
with `dangerouslySetInnerHTML`, which is safe only because the HTML is first-party and
committed here — sanitise first if content ever arrives from an API, a user, or an LLM.

Mode lives in `front/src/shared/mode/`, defaults to guided, and persists under the
`kata.mode` localStorage key.
