# CLAUDE.md — the empty Java scaffold

**This is a scaffold, and it is empty on purpose.** It is also no longer step 3's, and that is worth
knowing before you put anything in it: `front/src/steps/step3` is soft skills, which is worked in the
student's own team rather than against a project, so that step has no Java. What is left here is the
template a *new* Java step is copied from, still named `step3` because renaming a Maven project, a
package and four mentions of it in `CLAUDE.md` buys nothing until somebody copies it. The project
builds and `mvn verify` passes with zero tests, which is what keeps the kata's "leave every step
green" rule true from the moment the folder exists.

What is here:

```
pom.xml                                                 Boot parent, Java 25, the test starter only
src/main/java/be/smartagents/kata/java/step3/.gitkeep   the package, waiting
src/test/java/be/smartagents/kata/java/step3/.gitkeep   the mirror of it
```

Two deliberate omissions in the `pom.xml`, both of which are the first things to revisit when a step
does need Java:

- **No `spring-boot-starter-web`.** A web tier is an assumption about what that step teaches. Add it,
  and the `spring-boot-webmvc-test` slice alongside it, if and when the step needs one.
- **No `spring-boot-maven-plugin`.** There is no `@SpringBootApplication` to point it at, and
  declaring it would make `mvn package` fail on a scaffold that is meant to stay green. Add it
  together with the step's own application class.

When one does get built, follow the kata's rules rather than copying step 2 wholesale: one
`@SpringBootApplication` scoped to the step's own package by the default component scan, exercise
specs behind a profile so a clean checkout stays green, and no flag written in plaintext. The
`adding-a-step` skill in `.claude/skills/adding-a-step/` carries the frontend half, which is the
larger half.

Delete the `.gitkeep` files once there is real source beside them.
