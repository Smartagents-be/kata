# CLAUDE.md — step 1's Java

Step 1 of the kata is **context**, and this project is its subject rather than its grader. It serves
a catalogue of book titles that the student instruments, traces and reads. It does not serve the
curriculum; that is `front/`, and the units that teach step 1 live in `front/src/steps/step1/`.

This is a standalone Maven project. It has its own `pom.xml`, it knows nothing about the other steps,
and every command below is run from this directory (`kata/step1/java`).

## Layout

One `@SpringBootApplication`, scoped to its own package by the default component scan (no
`scanBasePackages`), so nothing from another step can be dragged onto the context.

```
src/main/java/be/smartagents/kata/java/step1/
  Step1Application.java         the entry point; default scan of ...step1 only
  TitleController.java          GET /api/titles
  services/                     CatalogStage, AuxiliaryStage, CatalogRun, Catalog, Scramble
                                and the fifty stage classes they walk
src/test/java/be/smartagents/kata/java/step1/
  TitleControllerTest.java      the endpoint over two stub stages
  services/                     CatalogRunTest, CatalogTest
```

Because this project holds exactly one main class, `spring-boot-maven-plugin` needs no `<mainClass>`
pin. It used to carry one, back when step 1 and step 2 shared a single module and the plugin could
not choose between them. Do not add it back.

## The catalogue

`GET /api/titles` returns nine fictional book titles. `Catalog` builds them by walking every
`CatalogStage` bean in `@Order` on every request, and folding in a random draw of one to ten
`AuxiliaryStage` beans at arbitrary positions. So the path through the code moves from request to
request while the response does not. `CatalogRun` collects what the stages publish and filters it
before the controller sees the result.

`problem.md` sits beside this file and is not part of the build. It is a short brief for an exercise
in the curriculum, and nothing in `src/` reads it.

## Running it

```bash
mvn spring-boot:run                          # :8080
curl -s localhost:8080/api/titles | jq
mvn spring-boot:run -Dspring-boot.run.arguments=--logging.level.be.smartagents.kata.java.step1=DEBUG
```

The last one turns on the stage chatter, which is off by default.

**The service has to stay up while you are asking questions about it.** `spring-boot:run` holds the
terminal, so start it in one and work from another, or start it in the background and leave it there.
Every `curl` at `/api/titles` and every reading off the frontend's `/catalog` page goes to that
running process.

The frontend proxies `/api` to `localhost:8080`, so `front`'s `/catalog` page calls this service when
it is the one running. Only one step's application can hold that port at a time, which is fine: you
run the one whose endpoints you want.

## Build and test

`mvn test` and `mvn verify` are the whole story here. There are no profiles in this project and no
static analysis on the build; the graded ones belong to step 2. This step must be left green.

The tests are deliberately tolerant: they assert the nine known titles as a *subsequence* and the
size as `>= 9` rather than `== 9`, so experimenting in the pipeline does not turn the build red. Do
not tighten them.

## Maintaining this project

The `services` package is deliberately obfuscated, and it is an exercise. How it is built, what
protects it and what must not be changed are written up with the board that grades it, in
`front/src/steps/step1/CLAUDE.md`. Read that file before editing anything under `services/`.

**Those notes are kept there rather than here on purpose**, and the reason is worth having in
writing. This file loads for whoever opens this directory, and the `workshop` unit tells the student
to open exactly this directory and start their agent in it. So the reader of this file is usually a
student's agent rather than a maintainer, and everything in it lands in that agent's context before
the student has typed anything. Design notes here handed the answers over unasked. Prohibitions here
forbade the very work the unit asks for, so the agent refused, or hedged, on the student's own
exercise. Neither of those sentences had a correct reader in this file.

The repository does not try to hide those notes from an agent, and could not: anything with
filesystem access can read `front/`. Not hiding them is a different thing from handing them over. A
student who sends their agent rummaging through the curriculum app is spending their own exercise,
the same way reading `flags.ts` would be, and that is theirs to decide rather than a hole to plug.
