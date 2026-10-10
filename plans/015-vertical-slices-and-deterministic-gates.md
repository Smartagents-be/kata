# Plan 015: Vertical slices in `engineering`, deterministic checks in `gates`

> **Executor instructions**: Curriculum writing in step 2. Load the `lesson-writing` skill before
> writing any prose and follow it (no em-dashes, digits for numbers, short sections, Dutch as a
> rewrite rather than a translation). Read `front/src/steps/step2/CLAUDE.md` in full before
> touching a file: several constraints below come from it. Work the phases in order and leave the
> build green after each. On any STOP condition, stop and report.
>
> **Drift check (run first)**: `git status --short && git diff --stat afee5e8..HEAD -- front/src/steps/step2 front/src/steps/step3 front/src/steps/step1/units/prompt.html`
> The step 2 unit-title rename (Increments, Setup, Domain language, …) may still be uncommitted in
> the working tree. That is expected. Anything else changed under `units/engineering.html`,
> `units/gates.html`, `units/evolution.html`, `DomainTree.tsx`, `SameGate.tsx`, `GateReach.tsx`,
> `GateWalk.tsx` or `WhereWouldItGo.tsx`: re-read it before editing.

## Status

- **Priority**: P1 (course owner's request, 2026-10-10)
- **Effort**: M
- **Risk**: MED. Two recorded constraints are close to the edit (honest coverage, the `WhereWouldItGo` disagreement), see "Constraints".
- **Depends on**: none
- **Planned at**: commit `afee5e8` plus the uncommitted title rename, 2026-10-10

## Why

The course owner wants step 2 to argue **short feedback loops** as the thread through structure and
gates:

1. Build in **vertical slices**: 1 use case through every layer, so each slice gives feedback on the
   whole integration, instead of all of data access, then all of business logic, then presentation.
   Drawn as 3 horizontal bands (data access, business logic, presentation) with self-contained
   vertical slices over them.
2. Structure the repository the same way: **1 module per capability**, modelled on
   `~/Code/implementation-challenges` (`order-placement/`, `order-confirmation/`, each with its own
   frontend, built and tested on its own, assembled by `hosts/backend-app`). The inside of a module
   stays hexagonal (variant A, chosen by the owner).
3. Make the **deterministic checks** the reason the loop can be short, and list them: the test mix
   (unit, integration, contract, architecture), coverage and mutation, static analysis, cyclomatic
   complexity, vulnerability scanning, secret scanning.

Today none of this is in the course. `engineering` lays the repo out by entity (`article/`,
`author/`) with layers inside, which is not slicing. `gates` names Sonar, a coverage floor and a
mutation score in 1 sentence. Integration, contract and architecture tests, vulnerability and
secret scanning, and the word "deterministic" appear nowhere. Cyclomatic complexity appears only as
a board row in `workshop` (`workshop.flag.complexity.hint`).

## Decisions already taken (do not reopen)

- **`exercises/step2/java` is not restructured.** It stays layered by technology (`web/`,
  `application/`, `domain/`, `port/`, `adapter/`, `config/`, `aot/`). The `graded` profile's
  JaCoCo excludes and PIT `targetClasses` name those packages (`pom.xml:120-148`), a setup flag sits
  in the `domain` package's `CLAUDE.md`, `where.description` promises the student nothing moves, and
  the project has effectively 1 capability. The gap between it and the figure is what
  `WhereWouldItGo` is built on, and it gets wider here, which is good.
- **Everything about slices goes in `engineering`.** `evolution` only gets a link.
- **The test mix goes in `gates`**, as its own section next to `Quality gates`.
- **Hexagonal stays** inside each module (variant A). `HexagonPorts` is untouched.
- **Example domain stays articles**, so `Headline` keeps matching `WordsToFiles`.
- **ArchUnit is in** (guards the slice boundaries).

## Constraints (from `step2/CLAUDE.md`, binding)

1. **Honest coverage stays hidden.** The capstone's third flag exists so the student discovers that
   coverage can be met by tests that assert nothing. `gates` may name mutation testing and point at
   the tool, and **must not** say or imply that coverage can be faked, nor contrast "a line ran"
   with "a test failed". `SameGate` may **never rank** coverage against mutation (no teal on one
   row, no order that reads as a ranking). Same for the new list and `GateReach`.
   (CLAUDE.md lines ~56-70 and ~235-241.)
2. **`gates.quality-gates.1` keeps carrying the proxy claim** with no example.
3. **`WhereWouldItGo` names no package and gives no count.** A new move may ask a question, never
   answer it.
4. **`GateReach` carries no numbers** on its gates: orders of magnitude only.
5. **Icons**: `Domain-driven design` holds the gem, `Hexagonal architecture` the coin, and neither
   may take the other's. The new `Vertical slices` section takes **no icon**.
6. **No Copilot/Claude split** is needed: nothing here names an assistant-specific file or command.
7. Do not edit `audit.md` (separate job) or anything under `review/`.

## Fact base (checked 2026-10-10)

| Claim | Source |
|---|---|
| Pact: consumer test runs against a mock provider and writes a pact file; provider verification replays it against the real provider; `can-i-deploy` checks compatibility | docs.pact.io/getting_started/how_pact_works, docs.pact.io/pact_broker/can_i_deploy |
| PIT mutates bytecode, reports killed and survived mutants, `pitest-maven`, `withHistory` for incremental runs. **`scmMutationCoverage` was removed in 1.18.0: do not mention it** | pitest.org/quickstart/maven, github.com/hcoles/pitest/releases/tag/1.18.0 |
| ArchUnit: `slices().matching(...).should().notDependOnEachOther()` as a plain JUnit test | archunit.org/userguide |
| Testcontainers runs a real Postgres in Docker; Spring Boot wires it with `@ServiceConnection` | docs.spring.io/spring-boot/reference/testing/testcontainers.html |
| McCabe's limit of 10 (NIST SP 500-235); Sonar S1541 cyclomatic default 10; S3776 cognitive default 15 | mccabe.com/pdf/mccabe-nist235r.pdf, sonar-java `MethodComplexityCheck.java` |
| OWASP Dependency-Check (NVD, Maven plugin), Trivy, Dependabot | jeremylong.github.io/DependencyCheck, github.com/aquasecurity/trivy, docs.github.com Dependabot |
| gitleaks as pre-commit hook; GitHub push protection | github.com/gitleaks/gitleaks, docs.github.com push protection |
| SpotBugs (FindBugs successor), PMD; "SonarQube Server" is the current product name | spotbugs.github.io, pmd.github.io, docs.sonarsource.com |
| `mvn -pl <module>` builds only that module (`-am` adds what it needs) | maven.apache.org/ref/current/maven-embedder/cli.html |
| Sonar answers in CI; SpotBugs/PMD can run inside `mvn verify` (from `review/units/step2-gates.md`) | docs.sonarsource.com |

Do not state that Sonar's default "Sonar way" profile enforces S1541: unverified.

---

## Phase 1: `engineering`, the `Vertical slices` section

### 1.1 New figure `VerticalSlices` (`front/src/steps/step2/VerticalSlices.tsx`)

An SVG in the style of `GateReach` (tokens only, `id` + `data-component` on every element, `<title>`
from a `description` key, `useTranslation('step2')`).

- **3 horizontal bands**, full width, grey (`fill-foreground/[0.06]`, `[0.10]`, `[0.14]` or one
  shade; no teal). Label at the left of each, top to bottom: `presentation`, `business logic`,
  `data access`.
- **3 vertical slices** over the bands, teal (`fill-primary/…`, the step's rule that teal is what
  the shape adds), with clear gaps between them so each reads as self-contained. Each spans all 3
  bands. Use-case label above each: `Publish an article`, `Rewrite a headline`,
  `Archive an article`.
- **Grouping**: a thin bracket over the first 2 slices labelled `article-publishing`, over the 3rd
  `article-archiving`. These are the module names `DomainTree` will show, so the figure and the
  tree read as a pair.
- **State**: slices 1 and 2 solid with a check mark and the label `runs end to end` under them; slice
  3 hatched (in progress) with no check. No layer-by-layer counter-panel (the prose carries the
  contrast).
- **Note** under the frame, muted: `every slice is a full loop: build it, run it, check it`.
- Width: must not scroll at 360px; keep labels short and put the bracket labels in mono.

Docblock: what it argues (feedback per slice, not at the end), why the bands are grey and the
slices teal, why there is no "wrong" panel, why the module brackets match `DomainTree`.

Keys (`en.json`, `nl.json`, alphabetical neighbourhood of other figure keys):

| Key | EN | NL |
|---|---|---|
| `vertical-slices.description` | 3 grey horizontal bands, presentation, business logic and data access. Over them 3 teal vertical slices, each 1 use case running through all 3 bands: Publish an article and Rewrite a headline under article-publishing, Archive an article under article-archiving. The first 2 carry a check mark and "runs end to end"; the third is hatched, still being built. | (rewrite) |
| `vertical-slices.layer.presentation` | presentation | presentatie |
| `vertical-slices.layer.logic` | business logic | business logic |
| `vertical-slices.layer.data` | data access | data access |
| `vertical-slices.case.publish` | Publish an article | Artikel publiceren |
| `vertical-slices.case.rewrite` | Rewrite a headline | Kop herschrijven |
| `vertical-slices.case.archive` | Archive an article | Artikel archiveren |
| `vertical-slices.done` | runs end to end | draait van begin tot eind |
| `vertical-slices.note` | every slice is a full loop: build it, run it, check it | elke slice is een volledige lus: bouwen, draaien, nakijken |

Module names (`article-publishing`, `article-archiving`) are literals, like every path.

### 1.2 Prose (`units/engineering.html`), new section between `Domain-driven design` and `Hexagonal architecture`

```html
<h2 data-i18n="engineering.vertical-slices.heading">Vertical slices</h2>

<p data-i18n="engineering.vertical-slices.1">…</p>

<div data-figure="vertical-slices"></div>

<p data-i18n="engineering.vertical-slices.2">…</p>
```

EN draft (finalise with the skill's checklist):

- `.1`: "A layered application invites you to build it a layer at a time: all of the data access,
  then all of the business logic, then the screens. Nothing runs end to end until the last layer
  is in, and that is the first time you learn whether the layers fit. Cut it the other way. A
  vertical slice is 1 use case with everything it needs, from the screen down to the table."
- `.2`: "Give the slices that belong together 1 module per capability, named after what the
  business does. `article-publishing/` holds the form, the endpoint, the rules and the table for
  publishing, and builds and tests on its own: `mvn -pl article-publishing verify` answers about
  the part you changed, and only that part. That is the short loop from
  <a href=\"/steps/step2/gates\">the unit on quality gates</a>, and every slice is 1 turn of
  <a href=\"/steps/step2/enablement\">the feedback loop</a>."

NL heading: `Vertical slices`. NL paragraphs written as a rewrite, then proofread for idiom.

### 1.3 `Hexagonal architecture` moves 1 level in

- `engineering.hexagonal-architecture.1`: open with "Inside each module, the domain sits in the
  middle, …". Keep the second sentence (no class outside `adapter/` names Postgres or S3) **word for
  word**: CLAUDE.md records it as the section's whole dependency argument.
- `DomainTree` stays in this section after `.1`, `HexagonPorts` still closes it. Order and keys
  unchanged otherwise.
- `.2` stays; check its paths (`application/`, `adapter/outgoing/`, S3) still exist in the new tree.

### 1.4 Redraw `DomainTree` (variant A)

Replace `TREE` so the top level is capability modules and the inside of a module is the current
hexagonal layout. Target shape (rows must not exceed today's ~30, the deck slide is already at
`scale: 0.9` for height):

```
.                                        domain-tree.root.note        "1 repository, 1 module per capability"
├── pom.xml                              domain-tree.root-pom.note    "lists the modules, builds none itself"
├── article-publishing                   domain-tree.module.note      "1 capability, everything it needs"
│   ├── pom.xml                          domain-tree.module-pom.note  "builds and tests on its own"
│   ├── frontend/publish-form.ts         domain-tree.frontend.note    "the screen, inside the slice"
│   ├── src/main/java/be/smartagents/publishing
│   │   ├── domain                       domain-tree.domain.note
│   │   │   ├── Article.java             domain-tree.article-java.note
│   │   │   ├── Headline.java            domain-tree.headline.note
│   │   │   ├── ArticleRepository.java   domain-tree.repository-port.note
│   │   │   └── Archive.java             domain-tree.archive-port.note
│   │   ├── application                  domain-tree.application.note
│   │   │   ├── PublishArticle.java
│   │   │   └── RewriteHeadline.java
│   │   └── adapter                      domain-tree.adapter.note
│   │       ├── incoming                 domain-tree.incoming.note
│   │       │   └── web/rest/ArticleController.java      domain-tree.controller.note
│   │       └── outgoing                 domain-tree.outgoing.note
│   │           ├── persistence/postgres/JpaArticleRepository.java  domain-tree.jpa-repository.note
│   │           └── archive/s3/S3Archive.java            domain-tree.s3-archive.note
│   ├── src/main/resources/db/changelog/publishing.xml   domain-tree.changelog.note "its own tables"
│   └── src/test/java/be/smartagents/publishing           domain-tree.test.note
│       ├── domain/ArticleTest.java
│       └── application/PublishArticleTest.java
├── article-archiving                    domain-tree.next-module.note "the next capability, same shape"
└── host                                 domain-tree.host.note        "the 1 app that assembles the modules"
    └── ArticleApplication.java          domain-tree.application-class.note
```

- Keys removed: `domain-tree.article.note`, `domain-tree.author.note`, `domain-tree.jpa-row.note`
  (`ArticleRow` row dropped for height), `domain-tree.properties.note` (properties row dropped). Keys
  added: `module`, `module-pom`, `frontend`, `next-module`, `host`. Update `root`, `root-pom`,
  `changelog` texts. Remove dropped keys from both bundles; no orphans.
- Keep `incoming/` and `outgoing/` as their own rows: `WhereWouldItGo`'s disagreement depends on
  them.
- Caption unchanged ("An example project, not one in this repository.").
- Rewrite the docblock: the previous version rejected a "four-module platform skeleton" as
  scaffolding. Record that this reverses it at the owner's asking, and why this is not that
  skeleton: 1 module per capability, no BOM, no autoconfigure/starter/context modules, a host that
  only assembles. Name `implementation-challenges` as the model only as "a production repository
  the owner points at", not by path.

### 1.5 Registry and deck

- `index.tsx`: add `'vertical-slices': <VerticalSlices />` to `engineering`'s `inlineFigures`;
  update its comment (4 slots now; slices are how it is cut, hexagon and tree where it sits).
- `deck.tsx`: new figure slide `deck-step2-engineering-slices` after `deck-step2-engineering-vibe`,
  `eyebrow: 'engineering.title'`, `title: 'deck.engineering.slices.title'`, `figure:
  <VerticalSlices />`, scale to fit (start at 1.3, check the footer).
- Keys: `deck.engineering.slices.title` = "1 use case, <hi>every layer</hi>" / "1 use case, <hi>alle
  lagen</hi>".
- `deck.engineering.divider.1` ("Structural leverage…"): leave.

### 1.6 `WhereWouldItGo`

- Add move `trace` between `compare` and `sort` (`MOVES = ['list', 'guess', 'compare', 'trace',
  'sort', 'plan']`).
- `where.trace.label` EN: "Follow 1 use case: pick 1 thing the service does and list every package
  its code passes through. In the model above, that use case would sit inside 1 module." NL as a
  rewrite.
- It names no package, no endpoint and gives no count (constraint 3). Do not mention the statement
  endpoint or any tier.
- Docblock: add 1 paragraph on the new move and that the gap is now also slices against layers.

### 1.7 `evolution` link

- Append to `evolution.walking-skeleton.1` (after "a result that actually comes back."): "It is
  your first <a href=\"/steps/step2/engineering\">vertical slice</a>." NL: "Het is je eerste
  <a href=\"/steps/step2/engineering\">vertical slice</a>." Keep the 2 icons where they are.

---

## Phase 2: `gates`

Target section order:

1. lead (unchanged), `SdlcStages`
2. `Quality gates`: `.1` (unchanged), `SameGate` (updated), `.2` hook (unchanged)
3. **`Deterministic checks`** (new)
4. **`Legacy code`** (moved from `quality-gates.3` and `.4`)
5. `Blast radius` (unchanged)
6. **`Short feedback loops`** (renamed from `Fast enough to answer`), `GateReach` (updated)
7. `<hr>`, task card

### 2.1 New section `Deterministic checks`

```html
<h2 data-i18n="gates.deterministic-checks.heading">Deterministic checks</h2>
<p data-i18n="gates.deterministic-checks.1">…</p>
<ul>
  <li data-i18n="gates.deterministic-checks.2">…</li> … through .10
</ul>
<p data-i18n="gates.deterministic-checks.11">…</p>
```

EN drafts:

- `.1`: "A gate worth handing the volume to gives the same answer on the same code, every run, and
  the agent can run it without you. That is what makes it a loop rather than a queue. Review, by
  you or by a second model, is for the decisions."
- List (bold name, then what it catches; 1 sentence each, no ranking, no "honest" contrast):
  - `.2` **Unit tests** check the rules inside 1 slice, in seconds.
  - `.3` **Integration tests** run an adapter against the real thing: a Postgres in Testcontainers,
    not a mock.
  - `.4` **Contract tests** keep 2 slices or services in agreement without starting both. Pact
    records what the consumer expects, and the provider replays it against itself.
  - `.5` **Architecture tests** fail the build when 1 slice reaches into another one's internals.
    ArchUnit writes that rule as an ordinary test.
  - `.6` **Coverage and mutation score** are 2 numbers about the tests themselves, from JaCoCo and
    PIT. *(Exactly this neutral. Constraint 1.)*
  - `.7` **Static analysis** finds known bug patterns and code smells: SpotBugs, PMD, Sonar.
  - `.8` **Cyclomatic complexity** caps the paths through 1 method. McCabe's 10 keeps a method small
    enough to read and to test.
  - `.9` **Vulnerability scans** check every dependency against known CVEs: OWASP
    Dependency-Check, Trivy, Dependabot. An agent adds a dependency in 1 line, so the check has to
    be as cheap. *(Optionally link step 1's `truth` unit for "check a package exists".)*
  - `.10` **Secret scanning** stops a key before it reaches a commit, with gitleaks as a pre-commit
    hook or push protection on GitHub.
- `.11`: "Sonar answers in CI, after the agent has moved on. Run the same kind of rules inside
  `mvn verify` with SpotBugs or PMD and it hears them while it still knows what it changed. The
  workshop at the end of this step grades 3 of these on the loans module." *(Names no numbers and
  no flag; the board's hints already show the 3 rows.)*

NL heading: `Deterministische checks`. Keep tool names and "unit tests", "mutation score" etc. as
Dutch developers say them.

### 2.2 `Legacy code` section (move and sharpen)

The owner wants this order unmistakable (2026-10-10): **on old code, get the gates in order
first.** Those gates and the coverage are then what checks every new change for regression. They
are the source of truth until behaviour has to change. When a test fails after a change, you verify
with the **product owner** whether that is the behaviour they want.

- New `<h2 data-i18n="gates.legacy-code.heading">Legacy code</h2>` (NL `Legacy code`) after
  `Deterministic checks`.
- `gates.quality-gates.3` → `gates.legacy-code.1`, `.4` → `.2`, in HTML and both bundles, and
  rewritten (the "Mix kinds of tests…" sentence goes, the list now carries it):
  - `.1` EN: "Old code with no documentation and no tests needs a different order. Before the agent
    changes anything, put the gates in place: the checks above, and regression tests until every
    line is covered. Those tests record what the code does today, odd parts included. From then on
    the gates and the coverage check every change for regression. They are the source of truth."
  - `.2` EN: "They stay the truth until behaviour has to change. When a test fails after that, the
    test does not decide and neither does the agent. Ask the product owner whether the new
    behaviour is what they want. If it is, update the test. If it is not, the code goes back."
  - NL rewritten to match, "product owner" kept as is.
- No wording about coverage being fakeable (constraint 1): "until every line is covered" is a
  target, not a contrast.
- Deck `deck-step2-gates-old-code` follows the new order:
  - title "Old code: <hi>gates first</hi>, then changes" / "Oude code: <hi>eerst de gates</hi>, dan wijzigingen"
  - `.1` "No docs, no tests? Put <hi>the gates and regression tests</hi> in place first"
  - `.2` "From then on they are <hi>the source of truth</hi>"
  - `.3` "A test fails? Ask <hi>the product owner</hi> if that is the behaviour they want"
  - NL rewritten.
- `step2/CLAUDE.md` (~line 235): the brownfield paragraph records this order and the switch from
  "stakeholders confirm first" to "a failing test goes to the product owner".

### 2.3 `SameGate`: the box holds 4 groups, unranked

- `CHECKS = ['tests', 'test-quality', 'code', 'supply'] as const`; keys
  `same-gate.tests` "tests", `same-gate.test-quality` "coverage, mutation",
  `same-gate.code` "static analysis, complexity", `same-gate.supply` "vulnerabilities, secrets".
  NL: "tests", "coverage, mutatie", "statische analyse, complexiteit", "kwetsbaarheden, secrets".
- Remove `same-gate.static`, `.coverage`, `.mutation`. Update `same-gate.description`.
- Re-space 4 rows in the box (raise `GATE_H` if needed); all rows same colour (constraint 1).
- Docblock: "names the four groups and ranks none"; keep the honest-coverage paragraph.
- Fix the docblock's stale "after `engineering.quality-gates.1`" → `gates.quality-gates.1`.

### 2.4 `Fast enough to answer` → `Short feedback loops`

- Heading EN `Short feedback loops`, NL `Korte feedbackloops`.
- Rename keys `gates.fast-enough.heading|1|2|3|4` → `gates.short-feedback-loops.*` in HTML and both
  bundles. Text unchanged.
- Update every code comment that says `fast-enough`: `GateReach.tsx:21`, `GateWalk.tsx:15`,
  `index.tsx:133`, and the CLAUDE.md lines listed in Phase 4. `grep -rn 'fast-enough' front/src`
  must return nothing afterwards.

### 2.5 `GateReach`: what runs at each gate

- Keep the band, regions, gate names, times and note. Add per gate a stacked list of checks **below
  the time**, 11px, muted, 1 per line:
  - `loop`: unit tests · consumer pacts
  - `done`: integration · mutation · static rules · secrets
  - `merge`: Sonar · CVE scan · provider pacts · your review
  - `release`: (none; its time already says "a person")
- Rename `gate-reach.gate.loop.name` from "unit tests" to "your loop" / "je lus" (the list now
  carries "unit tests"); `merge.name` from "CI, your review" to "CI". Others unchanged.
- Keys: `gate-reach.check.unit`, `.consumer-pacts`, `.integration`, `.mutation`, `.static-rules`,
  `.secrets`, `.sonar`, `.cve`, `.provider-pacts`, `.review`. Data as
  `CHECKS: Record<Gate, readonly string[]>`.
- Grow `viewBox` height (≈ 200 → 260) and move the note down. Check at 360px width that "provider
  pacts" and "static rules" do not collide (loop→done gap is 96 units; shorten labels before
  shrinking the font). Update `gate-reach.description`.
- Still no numbers on gates (constraint 4). Mutation sits at `done` and coverage is not drawn, so
  nothing ranks the two.

### 2.6 `GateWalk`

- `MOVES = ['list', 'mix', 'reach', 'time', 'goal']`.
- `gate-walk.mix.label` EN: "Check the mix: for each kind of check in this unit, note whether your
  pipeline has it, and whether the agent can run it itself inside its own loop." NL as a rewrite.
- Docblock: the moves now follow 4 sections (quality, deterministic checks, blast radius, speed).

### 2.7 Deck (`gates` block)

- New statement slide `deck-step2-gates-checks` after `deck-step2-gates-proxy`:
  - `deck.gates.checks.title`: "Same code, <hi>same answer</hi>" / "Zelfde code, <hi>zelfde antwoord</hi>"
  - points `deck.gates.checks.1-4`:
    - "<hi>Tests:</hi> unit, integration, contract, architecture"
    - "<hi>On the tests:</hi> coverage and mutation score"
    - "<hi>On the code:</hi> static analysis and complexity"
    - "<hi>On what you ship:</hi> vulnerabilities and secrets"
  - NL rewritten.
- `deck-step2-gates-reach` picks up the new `GateReach`; recheck its `scale: 1.5` against the
  taller viewBox.

---

## Phase 3: Dutch

Every new or changed EN block gets its NL entry in the same change. Rewrite, do not translate.
Proofread every changed `nl.json` string for idiom before reporting done (owner's standing request).
Terms kept in English in NL: vertical slice, use case, unit tests, mutation score, coverage,
pre-commit hook, tool names.

## Phase 4: Notes (`front/src/steps/step2/CLAUDE.md` and code comments)

Record decisions, not content:

- `engineering`: now 4 sections; `Vertical slices` added at the owner's asking (October 2026), takes
  no icon (constraint 5) and why; `VerticalSlices` and `DomainTree` are a pair (module brackets ↔
  module folders); the multi-module reversal in `DomainTree`; `exercises/step2/java` deliberately
  stays layered and why (the 4 reasons under "Decisions"); `WhereWouldItGo`'s new `trace` move.
  Update the "`engineering` runs three sections" paragraph (~line 136) and the "Hexagonal carries two
  drawings" paragraph (still true, DomainTree stays there).
- `gates`: new section order; `Deterministic checks` and its constraint-1 wording for `.6`; `Legacy
  code` moved from `quality-gates.3/.4` with the dropped "mix kinds" sentence (update ~line 235-241,
  which says `.3` closes on mixing kinds); key rename `fast-enough` → `short-feedback-loops` (update
  lines ~174-175, 220-229); `SameGate` 4 groups unranked (update ~line 67); `GateReach` per-gate
  checks; the `scmMutationCoverage` removal as a reason not to name an "only changed code" PIT goal.
- Units count line near the top ("each carry a drawing") if the figure count is stated.
- `index.tsx` comments for `engineering` and `gates`.
- `copilot-specific.md`: nothing (no assistant-specific claim).

## Phase 5: Verify

From `front/`:

```bash
npm run build && npm run lint
grep -rn '—\|–' src/steps/*/units/*.html src/steps/*/locales/*.json          # must be empty
grep -rn 'fast-enough\|quality-gates\.[34]\|domain-tree\.\(article\|author\|jpa-row\|properties\)\.note\|same-gate\.\(static\|coverage\|mutation\)"' src   # must be empty
```

Key alignment, both directions, for step 2: every `data-i18n` in `units/*.html` has an `nl.json`
entry, and no `nl.json` key under `engineering.`, `gates.`, `evolution.` is left without a block.
Every figure/deck key used in `.tsx` exists in both bundles.

Playwright (dev server, `kata.mode=self`), EN and NL:

- `/steps/step2/engineering`: `VerticalSlices` renders, no overlap at 360px and 1280px; `DomainTree`
  shows the new tree; card shows 6 moves.
- `/steps/step2/gates`: section order as above; `SameGate` 4 rows; `GateReach` lists fit at 360px.
- `/steps/step2/evolution`: the new link resolves.
- `/present`: the 2 new slides fit above the footer; `deck-step2-engineering-domain` and
  `deck-step2-gates-reach` still fit.
- Console: no missing-key warnings.

Java: nothing changes under `exercises/`, so no Maven run is needed. Confirm with
`git status -- exercises` (must be clean).

## STOP conditions

- Any wording for the coverage/mutation item or `SameGate` that would order or contrast the two:
  stop and ask the owner.
- `DomainTree` cannot stay at or under its current height on the deck slide without dropping
  `incoming/` or `outgoing/`: stop and report the options.
- `GateReach` lists do not fit at 360px even with shortened labels: stop and propose a separate
  figure instead of shrinking the font below 11px.

## Delivery

The owner's instruction (2026-10-10): push the title rename and this plan to `main` first, then
implement, have a separate agent review the result, apply **every** finding (major, minor, nit),
and **leave the implementation uncommitted** in the working tree for the owner to review.
