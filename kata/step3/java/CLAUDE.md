# CLAUDE.md — step 3's Java

**This is a scaffold, and it is empty on purpose.** Step 3's topic is not decided, so nothing here
presumes one. The project builds and `mvn verify` passes with zero tests, which is what keeps the
kata's "leave every step green" rule true from the moment the folder exists.

What is here:

```
pom.xml                                                 Boot parent, Java 25, the test starter only
src/main/java/be/smartagents/kata/java/step3/.gitkeep   the package, waiting
src/test/java/be/smartagents/kata/java/step3/.gitkeep   the mirror of it
```

Two deliberate omissions in the `pom.xml`, both of which are the first things to revisit when the
step gets a topic:

- **No `spring-boot-starter-web`.** A web tier is an assumption about what step 3 teaches. Add it,
  and the `spring-boot-webmvc-test` slice alongside it, if and when the step needs one.
- **No `spring-boot-maven-plugin`.** There is no `@SpringBootApplication` to point it at, and
  declaring it would make `mvn package` fail on a scaffold that is meant to stay green. Add it
  together with `Step3Application`.

When the step does get built, follow the kata's rules rather than copying step 2 wholesale: one
`@SpringBootApplication` scoped to `...step3` by the default component scan, exercise specs behind a
profile so a clean checkout stays green, and no flag written in plaintext. The `adding-a-step` skill
in `.claude/skills/adding-a-step/` carries the frontend half, which is the larger half.

Delete the `.gitkeep` files once there is real source beside them.
