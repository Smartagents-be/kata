# CLAUDE.md — step 2's Java

Step 2 of the kata is **agentic engineering**, and this project is the one part of it a machine can
grade. It ships a small library loans domain that is green but un-hardened, plus the profiles that
measure it. The units that teach step 2 live in `front/src/steps/step2/`; this file covers the code
and the builds only.

This is a standalone Maven project. It has its own `pom.xml`, it knows nothing about the other steps,
and every command below is run from this directory (`kata/step2/java`).

## Layout

One `@SpringBootApplication`, scoped to its own package by the default component scan (no
`scanBasePackages`).

```
src/main/java/be/smartagents/kata/java/step2/
  Step2Application.java         the entry point; default scan of ...step2 only
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

One consequence worth knowing: `@SpringBootTest` searches *upwards* from its own package for the
configuration class, and `Step2Application` sits beside the tests rather than above them. A test that
boots the context names it, `@SpringBootTest(classes = Step2Application.class)`, the way
`LoanControllerTest` does.

## Running it

```bash
mvn spring-boot:run                                        # :8080
curl -s localhost:8080/api/loans/statement/STUDENT | jq
```

It answers with a 500 until the student implements `MemberStatements.forTier`, and with its code once
they do. Only one step's application can hold the port at a time, which is fine: you run the one
whose endpoints you want.

## The two profiles

Both are off by default, so a plain `mvn verify` stays green on a clean checkout. Both are meant to
be **red** when you turn them on, and that red is the exercise.

```bash
mvn verify -Pgraded       # the workshop: grades the loan module, prints the flags it has earned
mvn test -Pchallenge      # the challenge: the spec for the statement endpoint
```

`mvn verify -Pgraded` is the student's target. The profile wires JaCoCo (a coverage floor and a
per-method complexity ceiling) and PIT (mutation coverage) over this module, and `FlagRevealIT` prints
a flag for each goal already met, then fails until all three are. **Do not harden the module to make
it pass**: writing those tests and splitting the late-fee method is the exercise. PIT and the reveal
`*IT` run only under this profile.

`mvn test -Pchallenge` is the other half, red for a different reason: the tests are the spec for
`MemberStatements.forTier`, which ships as a stub that throws. They carry `@Tag("challenge")` and the
default build excludes that group through the `surefire.excluded.groups` property, which the
`challenge` profile empties. **Do not implement `forTier` to make them pass**: planning and writing it
is the student's exercise, and the statement endpoint pays out its code once they do. A new exercise
spec of this kind belongs behind the same tag, so a clean checkout stays green.

## The fifth flag: the native image

Not a profile and not the JVM, but a compiled native image, and it is built to resist a one-shot so
the student has to plan it. The seam is `aot/NativeImageFlag`, an `ApplicationRunner` that prints only
when `NativeDetector.inNativeImage()` is true, so `mvn spring-boot:run` and `mvn test` stay silent and
the flag is proof of a native image. Its payload is a classpath resource rather than a Java constant,
so an image built without thinking about resources starts, cannot find it, and prints a miss instead
of the code. That runtime miss is the spec for the fix, and reading it is a plan-worthy step in its
own right.

**Do not add a `native` profile to the `pom.xml`, and do not write the resource hint or a
`RuntimeHintsRegistrar`**: planning the hint is the exercise. The profile needs no adding in any
case, for the reason below. Do not spell out the fix here either; the runtime miss is what the
student is meant to read.

One obstacle this exercise used to have is gone, and it went with the split into per-step projects.
Step 1 and step 2 once shared a module, so `spring-boot-maven-plugin` pinned `<mainClass>` to
`Step1Application` and a naive native build compiled the wrong step. This project holds one main
class, so the build points at step 2 by itself. One plan-worthy step remains, and it is reading the miss. The Boot parent ships its own `native`
profile, so `mvn -Pnative native:compile` compiles this project with no pom change; verified end to
end on GraalVM 25.0.3, under a minute, binary prints the miss. The step 2 `workshop` unit said the
wiring was the student's until that was measured, and was corrected in the same pass.

## The setup flags

Three more, and no build prints any of them. They belong to the `setup` unit rather than the
workshop, and each one sits in a file an agent reads instructions from, because the exercise is
finding out that those files exist in a project nobody walked you through:

- `.claude/skills/writing-style/SKILL.md`, this project's own skill, which is loaded on demand the
  way any skill is.
- this file, the project briefing.
- `src/main/java/be/smartagents/kata/java/step2/domain/CLAUDE.md`, a briefing scoped to one package.

They are **plaintext on purpose**, unlike the veiled workshop flags: reading the file is the whole
task, so there is nothing to hide behind. Do not collect them into a list anywhere, do not put them
in the frontend (which holds salted hashes only, in `setup-flags.ts`), and do not name the three
files in the unit's prose or in a board hint. The unit tells the student to investigate this project
and stops there, which is the exercise.

The flag for this file is `{m0dul3-br13f1ng}`.

## Conventions

The kata-wide ones are in the root `CLAUDE.md`, and the prose ones are in
`.claude/skills/writing-style/`, which loads when you write Javadoc, name a test or word a commit in
here. The two that bite most often: the Boot parent manages every dependency version, so declare new
artifacts **without** a `<version>`; and `javac` rejects APIs newer than the `<java.version>`
property even though the local JDK is GraalVM 25.
