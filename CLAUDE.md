# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project state

A Java coding-kata repository, freshly scaffolded. The only code present is
`be.smartagents.kata.java.FizzBuzz` and its test — a placeholder so the build has something to
compile. It carries no meaning for the project and should be deleted once a real exercise
lands. There is no architecture to preserve yet; update this file when one appears.

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
