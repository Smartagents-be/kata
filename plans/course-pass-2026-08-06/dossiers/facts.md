# Fact-check dossier

**Scope:** every checkable claim in `front/src/steps/*/units/*.html`, the figure components' data,
`front/src/steps/*/locales/en.json` (+ the Dutch siblings of anything flagged), `copilot-specific.md`,
and the repository facts those claims point at.
**Measured against:** working tree at `e14376c`, 6 August 2026.
**Verification tooling used:** `git 2.50.1` (worktree behaviour), `tiktoken` `o200k_base` (all four
`TokenSplit` rows), local `~/.m2` (Boot 4.1.0 parent + dependencies POMs), `mvn -v`, `node -v`,
`front/package.json`, the `claude-api` skill's cached model/pricing tables, and web search for the
Claude Code / Claude Design / usage-limit / model-speed claims.

Verdict up front: **the repository-fact half of this course is unusually well maintained.** Line
counts, file paths, endpoint shapes, test names, tokeniser output, arithmetic and model pricing all
check out to a level I rarely see. The defects below are concentrated in three places: shell commands
that were written but never run, one speed figure that is roughly double reality, and one exercise
whose difficulty the prose overstates.

---

## What I verified as CORRECT (so nobody re-checks it)

Listing this because a fact-check that only reports failures is useless for the next pass.

**Tokenisation.** All four `TokenSplit` samples reproduce **exactly** under `o200k_base`:
`The catalogue endpoint returns nine unscrambled titles.` → 9 tokens with the ` unscr`/`ambled`
split; the Java line → 12; `be.smartagents.kata.java.step1.CatalogController` → 11; the UUID → 22.
`WordsIntoTokens` follows the same real split. The caption's provenance claim ("Split with
o200k_base, a public tokeniser") is true.

**Arithmetic.** `tokens.reads-all.3` "Seven tokens make twenty-one pairs… ninety-one, not forty-two"
(C(7,2)=21, C(14,2)=91) ✓. `TokenAttention`'s six weight rows each sum to exactly 100 ✓, and
`WEIGHTS[4]` makes ` build` the heaviest thing ` it` looks back at, which is what
`tokens.reads-all.2` claims ✓. `NextToken`: 5 prompt tokens + 3 passes means the third pass reads 7
to produce 1 ✓; the favourite path 0.34 × 0.89 × 0.62 = 0.188, so "under a fifth" ✓.
`SessionMakeup`: 23 typed of 4,913 total = 0.5%, so "half a percent" and "your sentence is fourteen
tokens" ✓. `BudgetWindow`: tree 260 ÷ controller 24 ≈ "ten times longer" ✓; grep 3 ÷ listing 190 ≈
"one sixtieth" ✓; `read TitleController.java` is listed at 24 lines and the real file **is** 24 lines.

**Pricing.** `ModelPricing`'s four rows match Anthropic's current rates: Haiku 4.5 $1/$5, Sonnet 5
$3/$15, Opus 5 $5/$25, Fable 5 $10/$50. Cache columns are internally exact (write-5m = 1.25×,
write-1h = 2×, read = 0.1× of input, every row). The prose ratios hold: small = 1, middle = 3, top =
5; output = 5× input in every tier; cache read at "roughly a tenth" (`harness.caching.1`); the
bottom row is a frontier tier "priced past the top tier" ✓. `ModelRelay`'s Fable → Opus → Sonnet
relay matches the current family, and it is dated `(August 2026)`.

**Repository facts.** `GET /api/titles` returns nine titles (`CatalogTest.PUBLISHED`, 9 entries) ✓.
`kata/step1/java/problem.md`, `kata/step1/front/index.html`, `kata/step2/java/.claude/skills/…` all
exist ✓. Step 2's default build really does run exactly one test (`LateFeePolicyTest`, one `@Test`);
`LoanControllerTest` and `MemberStatementsTest` are both `@Tag("challenge")` and excluded by the
`surefire.excluded.groups` property ✓, so "it passes its one shipped test" is literally right.
`mvn verify -Pgraded`, `mvn test -Pchallenge`, `mvn verify -Pintro` are all real profiles ✓. The
graded gate's constants match the prose exactly: `COVERAGE_FLOOR = 90.0`, `COMPLEXITY_CEILING = 10`,
`MUTATION_FLOOR = 80.0` ✓. `curl localhost:8080/api/loans/statement/STUDENT` hits a real
`@GetMapping("/statement/{tier}")` with `STUDENT` a real `MemberTier` ✓. `./target/kata-agentic-java-step2`
matches the artifactId, which is `native-maven-plugin`'s default image name ✓. `NativeImageFlag`
really does print a miss when the resource is dropped, in the words the unit describes ✓.
"Fifty stage classes" under `services/` — 52 `*Stage.java`, two of which are the interfaces ✓.

**Counts and cross-references.** Every one of the 20 distinct `/steps/...` links in the prose
resolves to a registered unit id ✓. Every `data-figure` marker in every unit has a registration in
its step's `index.tsx` ✓ (no empty divs). Step 1 has 8 units ahead of `workshop`, which is what
`workshop.one-window.1` and `deck.recap.one-window.note` claim, and `recap` carries exactly 8 unit
bullets plus the Claude-only ninth ✓. The recap bullet order matches the registry order ✓.
`front/src/steps/CLAUDE.md`'s "eleven blocks vary" in step 1 is right: 9 paired `data-assistant`
blocks in the HTML plus `survive.write.*` and `window.open.*` in the locales ✓. Step 3's "two
filename pairs" ✓. Deck's "Four patterns for splitting the work" matches `harness`'s four ✓.

**Toolchain (root `CLAUDE.md`).** Maven 3.9.16 ✓, JDK Oracle GraalVM 25.0.3 ✓, TypeScript `~6.0.2`
(the 6.x line) ✓, `oxlint` ✓, Boot parent 4.1.0 in all four poms ✓, `spring-boot-webmvc-test`
declared separately for the `@WebMvcTest` slice ✓ (and `spot.body.docs` states that same Boot 4 fact
correctly, including "declare it without a version: the parent manages it").

**Vendor claims.** Claude subscription limits: a rolling ~5-hour window opened by your first message
plus a weekly ceiling, with `/usage` printing both — all three parts of `model.five-hour-window.1/2`
and the `usage-readout` figure hold as of Aug 2026. **Ultracode is real** (`/effort ultracode`, or
the word in a prompt; Claude writes its own orchestration script and fans agents out) — the unit's
description is accurate. **Claude Design is real** (Anthropic Labs, builds a design system from your
codebase, iterative canvas) — accurate. `claude mcp add … -- npx @playwright/mcp@latest`,
`copilot mcp add`, `~/.copilot/mcp-config.json`, `.playwright-mcp/` output dir, `.claude/skills/<name>/SKILL.md`,
`references/`, `~/.claude/CLAUDE.md`, `settings.json` `PostToolUse` with a `Write|Edit` matcher,
prompt-cache 5-minute default with a paid longer TTL, MCP prompts under a slash in Claude Code — all
correct. The Copilot blocks in the rendered prose (credits by token, no roll-over, autocomplete not
charged, built-in GitHub MCP server, `/context`'s field list) match `copilot-specific.md`, which was
itself read from GitHub's docs 28–30 July 2026 and is not yet stale.

---

## Findings

### 1. HIGH · `git worktree add` is written in a form that fails — three times, in two units

**Quotes.**
`step2/units/goals.html:108`, under `goals.own-worktree.1`:

    git worktree add ../kata-complexity goal/complexity

`step2/units/steering.html:91-92`, under `steering.worktree-each.1`:

    git worktree add ../kata-statement feat/statement
    git worktree add ../kata-native feat/native

**Keys.** The `<pre>` blocks carry no `data-i18n` (machine output), so there is no Dutch sibling to
fix; the surrounding prose keys are `goals.own-worktree.1` and `steering.worktree-each.1`, and
`worktree-each.description` in both locale files names the same two branches.

**Why it is wrong.** `git worktree add <path> <commit-ish>` requires `<commit-ish>` to already
resolve. None of `goal/complexity`, `feat/statement`, `feat/native` exists, and nothing on either
page creates them. Verified:

    $ git worktree add ../kata-complexity goal/complexity
    fatal: invalid reference: goal/complexity
    exit 128                                    # git 2.50.1

The DWIM that creates a branch only fires when the commit-ish is **omitted** (branch named after the
path) or when the name matches exactly one remote-tracking branch. Neither applies here.

**Correct statement.** `git worktree add -b goal/complexity ../kata-complexity`, and likewise
`git worktree add -b feat/statement ../kata-statement`. (Keeping the current argument order and
adding `-b` before the path is the minimal edit.)

**Confidence.** Certain — reproduced locally.

**Why HIGH.** Worktrees are taught twice and both teachings hand the student a command to copy. This
is the only place in the course where a printed command does not run, and it fails on the first
keystroke of the move the `goals` unit calls the way to keep your branch yours.

---

### 2. MEDIUM · "four to five times faster" overstates the small tier by roughly 2×

**Quotes.** `model.speed.1`: "The small tier answers roughly **four to five times faster** than the
middle one". `tiers.haiku.body`: "Close to the top tier on a task that is already well specified, at
**four to five times Sonnet's speed**."

**Keys.** `model.speed.1` and `tiers.haiku.body`, in both `step1/locales/en.json` (the tier body) /
`step1/units/model.html` (the prose) and `step1/locales/nl.json:314` + `:521` ("vier tot vijf keer").

**Why it is wrong.** Measured output speed puts Haiku at roughly **2.2×** Sonnet (89.9 vs 40.1
tok/s non-reasoning; 97.3 vs 42.0 reasoning, Artificial Analysis), with the most generous published
comparisons reaching **~3×** ("up to 3× faster", and 80–120 tok/s for Haiku 4.5 against 40–60 for
Sonnet 4.6). Anthropic's own launch framing for Haiku 4.5 was "more than twice as fast". Nothing
supports 4–5×.

**Correct statement.** "roughly two to three times faster" / "at two to three times Sonnet's speed".

**Confidence.** High that 4–5× is wrong; the exact multiple moves with model version and load, which
is an argument for the looser "two to three" rather than a precise figure.

**Why MEDIUM and not low.** It is the only hard performance number in the step, the argument it feeds
("inside a loop that runs a hundred times, it is the difference between a job you watch and a job you
leave running") survives at 2–3×, and a reader who checks it finds the course out by a factor of two
on a number it stated confidently. Type: WRONG, not stale.

---

### 3. MEDIUM · The native-image exercise claims wiring the student does not have to do

**Quotes.** `workshop.native.1`: "The build makes a jar today and only a jar. Turning step 2 into a
native image is the exercise, and, like the graded profile, **none of that wiring is in the
`pom.xml` for you**." `workshop.native.2`: "have Claude work out what a native build of step 2
needs: **the GraalVM `native-maven-plugin`, the ahead-of-time step**, and what inside a native image
might not survive the move." Same claim in `workshop.flag.native.help` and, as authoring guidance, in
`kata/step2/java/CLAUDE.md` ("the `native` Maven profile is not in the `pom.xml`… Two plan-worthy
steps remain, wiring the build and reading the miss") and `NativeImageFlag`'s Javadoc.

**Keys.** `workshop.native.1`, `workshop.native.2`, `workshop.flag.native.help` (EN + NL).

**Why it is misleading.** Step 2's parent is `spring-boot-starter-parent:4.1.0`, and that POM ships
its own `native` profile (lines 283–335). Under `-Pnative` it adds the `process-aot` execution to
`spring-boot-maven-plugin` — which step 2 **does** declare in `build/plugins` — and supplies
`native-maven-plugin`'s configuration, with the version managed by `spring-boot-dependencies`
(`native-build-tools-plugin.version`). So both halves the unit tells the student to work out are
inherited, and `mvn -Pnative native:compile` — the exact command the unit prints two paragraphs
later — is Spring Boot's own documented invocation for exactly this setup. The genuine exercise is
the second half only: reading the runtime miss and planning the resource hint.

**Correct statement.** Say what is actually missing: the Boot parent already carries the AOT step and
the plugin, so the plan worth having is about *what a native image drops*, not about assembling the
build. The sentence "none of that wiring is in the pom.xml for you" is literally true of step 2's own
`pom.xml` and false in effect.

**Confidence.** High on the parent-POM facts (read from `~/.m2`). Medium on the end-to-end claim: the
`native` prefix resolves through `pluginManagement` in Maven 3, which I did not execute here because
a native compile takes minutes and I am read-only. **Verify with one run before editing the prose.**
Note the repo's own `CLAUDE.md` says the flow was "Verified end to end with GraalVM 25" — which, if
it was verified with the printed command, is itself evidence the wiring is inherited.

---

### 4. MEDIUM · `ModelPricing`'s caption claims a provenance the Sonnet row does not have

**Quote.** `pricing.caption`: "**As listed in July 2026.**"

**Key.** `pricing.caption` (EN + NL).

**Why it is wrong.** The component deliberately lists Sonnet 5 at its standing $3 / $15 rather than
the introductory $2 / $10 that runs until 1 September 2026 — documented in `ModelPricing.tsx`'s own
header comment, and the right call, because the "one, three and five" ratio the prose teaches is the
one it settles at. But the caption asserts these *are* the listed July-2026 prices, and for one of
four rows they are not. A student who opens the pricing page today sees $2 / $10 and reads the table
as either wrong or as a 1 : 2 : 5 ratio.

**Correct statement.** "Standing list prices, July 2026." (or "list prices, July 2026, at Sonnet's
standing rate"). The numbers stay; only the provenance clause moves.

**Confidence.** High. The intro rate and its 2026-08-31 end date are current.

---

### 5. MEDIUM · Copilot billing is stale in the authoring notes, three times

**Quotes.** `front/src/steps/step1/units/model.html:114` and `recap.html:17` (HTML comments) and
`front/src/steps/step1/CLAUDE.md:463`: "**A seat meters premium requests over a calendar month**, so
there is no rolling window to place…"

**Keys.** None — all three are non-rendered comments/notes.

**Why it is wrong.** `copilot-specific.md` records, in bold, that this changed on **1 June 2026**:
Copilot moved to usage-based billing, and "premium requests and per-model multipliers are **legacy**
— they now apply only to Pro and Pro+ subscribers on an existing *annual* plan". A seat is metered in
**AI credits consumed by tokens**, against a monthly allotment.

**Correct statement.** "A seat draws on a monthly credit allotment rather than a rolling window, so
there is nothing to place." The **conclusion survives** — a monthly allotment still has no rolling
window to open early, so the Claude-only five-hour section and the Claude-only recap bullet are still
correctly reasoned. Only the stated fact is dated.

**Confidence.** Certain, against the repo's own reference document.

**Type.** STALE. Not student-facing, which is why it is medium and not high — but it is the reasoning
a future editor inherits for a structural decision, and it contradicts the one file the course
designates as the Copilot source of truth.

---

### 6. MEDIUM · The graded profile's JaCoCo version floats

**Where.** `kata/step2/java/pom.xml`, `graded` profile: `org.jacoco:jacoco-maven-plugin` is declared
in `build/plugins` with **no `<version>`**, unlike its neighbour `pitest-maven`, which pins
`${pitest.version}`.

**Why it matters.** `jacoco-maven-plugin` is **not** in `spring-boot-dependencies:4.1.0`'s managed
plugin list (I read all ~25 entries; JaCoCo is absent), and it is not in
`spring-boot-starter-parent`'s either. Maven 3 therefore resolves the latest release and warns. The
local repository already holds **0.8.12, 0.8.13 and 0.8.15** side by side, plus a
`resolver-status.properties` — the signature of a version that has drifted three times while the
course was being written. `mvn verify -Pgraded` is the command the whole of step 2's workshop hangs
on, and its coverage and complexity readings are being taken by whatever JaCoCo ships next.

**Fix.** Add `<jacoco.version>` beside `<pitest.version>` in the profile's `<properties>` and pin it.

**Confidence.** High on the facts; the failure mode is future breakage rather than present
incorrectness, which is why it is medium.

---

### 7. LOW · "four or five characters go into one token" is contradicted by the figure below it

**Quote.** `tokens.lead.3`: "For ordinary English, **four or five characters** go into one token, so
a page of prose runs to a few hundred."

**Key.** `tokens.lead.3` (EN + NL).

**Why it is wrong.** Twelve lines later, `TokenSplit`'s own prose sample prints
`token-split.count` = "55 characters · 9 tokens · **6.1** characters per token". The 4–5 figure is
the common rule of thumb (and roughly right for older tokenisers), but `o200k_base` is more
efficient, and the unit hands the reader a counter-example on the same screen. Note the second half
of the sentence stays true either way: a page at ~6 chars/token is still "a few hundred".

**Correct statement.** "five or six characters", or "four to six" — anything that contains the
figure's own number.

**Confidence.** High (computed).

---

### 8. LOW · `SpotInjection`'s test result names a real test and invents numbers it cannot produce

**Quote.** `spot.body.tests`:

    Tests run: 12, Failures: 1
    TitleControllerTest.returnsThePublishedTitlesInOrder:33
      expected: 9 but was: 8

**Key.** `spot.body.tests` (EN + NL).

**Why it is wrong.** `TitleControllerTest.returnsThePublishedTitlesInOrder` is real, and line 33 of
that file is real — it is `.andExpect(jsonPath("$.length()").value(2))`. The test runs against two
stub titles and can never expect 9. The nine titles belong to `CatalogTest`. The other three cards on
this figure are scrupulous about matching the repo (the `grep` card even cites real filenames and
plausible line numbers), so this one reads as an oversight rather than a licence.

**Correct statement.** Either point the failure at `CatalogTest` (where 9 is the real expectation) or
drop the `:33` line reference so the card stops naming a specific assertion.

**Confidence.** High.

---

### 9. LOW · The coverage exclusion list is stated short

**Quotes.** `workshop.goals.3`: "ninety percent line coverage, **with the web and config layers left
out**". `workshop.flag.coverage.hint`: "Ninety percent line coverage on the loans module, **web and
config layers excluded**."

**Keys.** `workshop.goals.3`, `workshop.flag.coverage.hint` (EN + NL).

**Why it is incomplete.** The JaCoCo report in the `graded` profile excludes four things, not two:
`web/**`, `config/**`, **`aot/**`** and **`application/MemberStatements*`**. The POM comment explains
why (challenge classes and the native-image runner cannot be covered by the tests this profile runs),
and the reasoning is sound — the prose just stops after two of the four. A student aiming at 90% who
counts `MemberStatements` and `NativeImageFlag` into the denominator is measuring the wrong thing.

**Correct statement.** "…with the web, config and AOT layers and the unimplemented statement class
left out" — or, more durably, "with the layers the profile excludes; the build tells you the
number".

**Confidence.** High.

---

## Prior art (already in `audit.md` — recorded here so it is not double-counted)

- **`audit.md` item 1** — `welcome.how-workshops-work.1` "Most steps close on a workshop": one of
  four does. Already logged as `⚠`, effort `●○○`.
- **`audit.md` item 2** — `welcome.house-rules.3` ("One flag, one session") against
  `workshop.one-window.1` ("Work all three from a single session"). Already logged as `⚠`.

Both are genuine factual/consistency defects; neither is a discovery of this pass.

## Checked and cleared, with a note

- **`connect.shoot.label` / `shutter.flag.help`** name `.playwright-mcp/` as where the screenshot
  lands. That is the Playwright MCP server's default output directory, relative to the working
  directory — correct, and it will read as wrong to anyone who has set `--output-dir`. Left alone.
- **`harness.reflection.1`**'s GAN analogy ("one network produces something and another one tries to
  tear it down") is a loose but defensible description of adversarial training. Not a factual error.
- **`context.model-statistic.3`** ("one reference image from Dribbble") and
  **`goals.design-tools.1`** ("The teal on this page… came out of one of those sessions") are the
  author's own provenance claims about their own work. Unverifiable from here, not contradicted by
  anything. Left alone.
- **`impostor.nobody-doing-long.1`** "The tools this course is about are a couple of years old":
  Claude Code entered research preview February 2025, so ~18 months as of today. "A couple of years"
  is loose rather than wrong. Left alone.
- **`tools.list-itself-window.4`** "Four or five tools is the most one context holds well" is a
  judgement, not a measurement, and is framed as one. Left alone.
- **No context-window sizes are stated anywhere in the course.** That is a whole class of staleness
  the course has avoided, apparently on purpose. Worth protecting.
