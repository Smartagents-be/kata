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

Freshly scaffolded — step one has not landed yet. The only code present is
`be.smartagents.kata.java.FizzBuzz` and its test, a placeholder so the build has something
to compile; it carries no meaning and should be deleted once the first real step arrives.
There is no architecture to preserve yet.

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

There is no linter or formatter configured. `mvn verify` runs no static analysis.

## Toolchain

- **Java 25** via `maven.compiler.release`, so `javac` rejects APIs newer than 25 even
  though the local JDK is Oracle GraalVM 25.0.3. Bumping the language level means editing
  that one property.
- **JUnit 5** (Jupiter) pinned through `junit-bom` — declare new JUnit artifacts
  *without* a `<version>` so the BOM governs them.
- **AssertJ** for assertions. Prefer `assertThat(...)` over JUnit's `Assertions.*`; the
  existing test sets that precedent.

All versions live in `<properties>` in `pom.xml`; change them there, not inline.

## Conventions

- Package root `be.smartagents.kata.java` (Maven coordinates are
  `be.smartagents:kata-agentic-java`, so the groupId and the package root deliberately
  differ); standard `src/main/java` + `src/test/java` layout.
- Tests are `*Test.java` mirroring the production package (Surefire's default include
  patterns depend on this suffix).
- Table-driven cases use `@ParameterizedTest` + `@CsvSource` with a `name` template, as in
  `FizzBuzzTest`.
