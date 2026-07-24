# Product

<!-- impeccable:product-schema 1 -->

## Platform

web

## Users

Primary users are working Java developers: experienced software engineers
learning to work effectively with coding agents such as Claude Code. The
intended setting is team or company training led by SmartAgents.

The product serves two audiences at once, switched by a mode toggle:

- **Guided** — a classroom worked through by a teacher at the board. Some
  material is spoken rather than read on the page.
- **Self-learning** — a developer working alone, who needs the hints and
  framing the guided audience gets from the instructor instead.

Content is bilingual: English and Dutch. The words a student types as graded
answers, and all grading feedback, stay English in every language, because
they are what the checkers match against.

## Product Purpose

A hands-on kata that teaches agentic engineering to Java developers: not just
what an agent knows (context), but how you work with one (engineering habits,
scoping, patterns, quality gates, and outcome-shaped goals).

The repository is the lesson. It is built one step at a time, deliberately
simple at the start and advancing toward harder topics, and each step builds
directly on the code the previous step left behind. Learning happens by doing
the exercises the steps set, not only by reading them.

Success is a developer who can direct an agent well: write good instructions,
scope work to a size that comes back right, move repeated corrections into
durable form (CLAUDE.md, skills, hooks, scripts), and let the build — tests,
coverage, complexity, mutation — decide quality instead of the agent's say-so.

## Positioning

The teaching method *is* the position: the codebase itself is the curriculum,
and every step is a coherent, green stopping point that the next step extends.
Several exercises are built so the answer does not fall out of a naive search
(a leetspoken flag hidden in a deliberately obfuscated catalogue pipeline; a
graded Maven profile that only pays out its flags once real hardening is done;
a challenge endpoint specified only by failing, tagged tests). The student's
own work — instrumenting, hardening, planning against a red spec — is the point,
so the kata withholds the piece each step asks the learner to add.

Two-track by design: the same page teaches a teacher-led classroom and a
solo learner, and the same content is graded two ways — free-text answers by
the Java service, multiple-choice in the browser (no round trip, works with the
backend down).

## Operating Context

- Runs as two servers in two terminals: a Spring Boot backend (`:8080`,
  serving `/api`) and a React + Vite frontend (`:5173`, the one to open). Vite
  proxies `/api` to the backend, so there is one origin and no CORS.
- Opening the frontend with the backend down is a supported state: quizzes and
  the two hash-checked flag boards still work; a free-text submission reports it
  could not reach the service, at the answer box.
- The exercises live in real build tooling the student runs: `mvn test`,
  `mvn verify -Pgraded` (the step 2 workshop — meant to be red on a fresh
  checkout until the module is hardened), `mvn test -Pchallenge` (the statement
  endpoint spec — red until the student writes the method), and
  `npm run build` (the frontend type check).
- Structure: a step is a topic; a unit is one page inside it (prose, a quiz,
  an exercise, or a combination). URLs are `/steps/<step>/<unit>`.

## Capabilities and Constraints

- **One step at a time is a hard rule.** Implement only the step being asked
  for; do not jump ahead to a design a later step introduces. Build on existing
  code rather than quietly rewriting a previous step. Every step must leave
  `mvn test` green.
- **Do not do the student's part.** Where a step sets an exercise (tracing the
  hidden catalogue flag, hardening the loans module for the graded flags,
  implementing `MemberStatements.forTier`), ship the framing and the spec, never
  the solution.
- Backend: a single `@SpringBootApplication` (`Step1Application`) scans the
  whole `be.smartagents.kata.java` tree, so a step adds an endpoint by writing a
  controller. `@SpringBootTest` in step 2 must name the config class explicitly.
- Frontend: a `shared` shell plus one folder per step; steps may import from
  `shared`, never the reverse. Content is HTML-per-unit with `data-i18n` keys,
  i18next namespaces per step, and a guided/self `data-audience` attribute that
  removes (not hides) non-matching material.
- Two current steps: **step1** (context — the layers an agent's context is
  assembled from) and **step2** (agentic engineering — how you work with an
  agent). Free-text grading is currently unbacked (the shared check endpoint was
  removed); restoring it is a deliberate later decision.
- Terminology to keep exact: *step* (topic), *unit* (page), *guided* /
  *self-learning* (audiences), *flag* (a leetspoken, `{…}`-wrapped exercise
  answer).

## Brand Commitments

- **SmartAgents** is a real organization; this kata represents it and future
  work should respect its identity.
- The visual identity is already committed and lives as tokens in
  `front/src/index.css`. It must be preserved as-is unless the user directs a
  change:
  - One teal primary (`oklch(0.567 0.1 184.994)`) marks every primary/active
    signal; neutrals carry a faint teal undertone; `--success` and
    `--destructive` mean only passed and failed.
  - Two typefaces carry a meaning: Space Grotesk for what a student *reads*,
    JetBrains Mono for anything the *machine produced* (code, counts, flags,
    catalogue titles, step numbers). Both are self-hosted variable fonts; nothing
    loads from a CDN.
  - The interface is nearly flat: separation is a 1px border, not a shadow;
    depth is reserved for things that genuinely float.
  - The look derives from an external "Educational Design System v2" (a Claude
    Design project); the CSS tokens are its home in this repo.
- Every rendered element carries an `id` (BEM, kebab-case, indexed in loops) and
  a `data-component` (the exact React function), so anything on screen can be
  named from a test or a review. This convention is binding for new UI.
- Student-facing prose bans em-dashes (enforced by the `lesson-writing` skill).

## Evidence on Hand

- Working two-step curriculum with real graded exercises (see step1 `evaluation`
  and step2 `workshop`/challenge).
- Screenshots in the repo root: `catalog.png`, `step2-engineering.png`.
- Repo-local skills encode the house style: `lesson-writing`, `quiz-writing`.
- No testimonials, customers, benchmarks, pricing, or deployment claims exist;
  future work must not fabricate them.

## Product Principles

1. **The codebase is the curriculum.** Teach by building the repo one coherent,
   green step at a time; never skip the intermediate form a step is meant to
   teach.
2. **Withhold the student's work.** The exercise is the learner's to complete;
   ship the spec and the scaffolding, not the answer.
3. **Let the build decide.** Quality is judged by tests, coverage, complexity,
   and mutation — written down where the agent reads them — not by the agent's
   assertion.
4. **Two tracks, one page.** Guided and self-learning, English and Dutch, are
   first-class; material and grading degrade gracefully (backend down, a
   half-translated unit) rather than breaking.
5. **Name everything on screen.** Every element is addressable (`id` +
   `data-component`) so lessons, tests, and reviews can point at it precisely.

## Accessibility & Inclusion

Bilingual (English/Dutch) with graceful per-paragraph degradation for partial
translations. A single consistent focus signal (a 3px teal ring on every typed
field) is a stated design intent. No further product-specific standard has been
established.
