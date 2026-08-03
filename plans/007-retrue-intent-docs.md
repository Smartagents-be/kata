# Plan 007: Re-true the intent docs the code has drifted away from

> **Executor instructions**: Follow this plan step by step. Run every
> verification command and confirm the expected result before moving to the
> next step. If anything in the "STOP conditions" section occurs, stop and
> report — do not improvise. When done, update the status row for this plan
> in `plans/README.md` — unless a reviewer dispatched you and told you they
> maintain the index.
>
> **TWO STANDING RULES FOR THIS PLAN**:
> 1. `kata/step2/java/CLAUDE.md` and
>    `kata/step2/java/src/main/java/be/smartagents/kata/java/step2/domain/CLAUDE.md`
>    contain plaintext exercise flags (`{…}`-wrapped strings). Finding them is
>    a student exercise. Edit ONLY the lines this plan names; never quote,
>    move, list, or reference a flag value in any file, commit message, or
>    report.
> 2. Do NOT edit `audit.md`. Two of these fixes are its items 27 and 28, but
>    this repo separates fixing from re-measuring ("Updating the audit and
>    fixing what it lists are two different jobs" — root `CLAUDE.md`). The
>    maintainer closes the rows with the `audit-update` skill afterwards.
>
> **Drift check (run first)**: `git diff --stat be5a6b2..HEAD -- DESIGN.md PRODUCT.md .impeccable/design.json kata/step2/java`
> On any change, compare each "Current state" excerpt against the live file;
> on a mismatch for a given edit, skip that edit and note it.

## Status

- **Priority**: P2
- **Effort**: S
- **Risk**: LOW
- **Depends on**: none
- **Category**: docs
- **Planned at**: commit `be5a6b2`, 2026-08-02

## Why this matters

These are agent-facing specs that actively instruct wrong actions. DESIGN.md
tells any design-minded agent the reading typeface is Space Grotesk and adds
"never override it" — the app ships Figtree, so a well-behaved agent would
"correct" the real font. PRODUCT.md documents a `<mainClass>` pin the poms
deliberately removed (and forbid re-adding), lists screenshots that moved or no
longer exist, and counts three steps where four ship. Worst, the step 2 domain
briefing — one of the files the setup exercise sends students to read
*closely* — states a money convention (`BigDecimal`) that the entire module
contradicts (`long` cents), inviting an agent to break the graded exercise.

## Current state

Every claim below verified at the planned-at commit.

1. **DESIGN.md** — frontmatter `typography.display/.title/.body` (lines 21, 27,
   33) all say `"Space Grotesk Variable, system-ui, -apple-system, sans-serif"`;
   prose repeats "Space Grotesk" at lines 143, 189, and through the Typography
   section (including the characterization sentence "a warm, slightly geometric
   humanist sans" and the Machine-Mono Rule / Do's-and-Don'ts mentions).
   Reality: `front/src/index.css:5` imports `@fontsource-variable/figtree`,
   `--font-sans: 'Figtree Variable', …`; `front/CLAUDE.md` and `PRODUCT.md:120`
   both already say Figtree. Everything else in DESIGN.md (colors, radii,
   shadows, component specs) matches the live tokens — typography is the only
   drift.
2. **`.impeccable/design.json`** — 10 occurrences of `Space Grotesk Variable`
   inside component CSS strings (grep count 10). This file is committed and
   machine-read by the impeccable skill's previews.
3. **PRODUCT.md:88-93** — says `spring-boot-maven-plugin` pins `<mainClass>` to
   `Step1Application` and step 2 is run by naming `Step2Application`. Reality:
   no `mainClass` element exists in any of the four poms; the pin was removed
   when the steps split into standalone projects and `kata/step1/java/pom.xml`'s
   plugin comment plus root `CLAUDE.md` forbid re-adding it. The **next**
   sentence (a `@SpringBootTest` in step 2 must name
   `classes = Step2Application.class`) is still TRUE — verify against
   `LoanControllerTest` and keep it.
4. **PRODUCT.md:98-104 and :135** — "Three current steps" / "Working three-step
   curriculum". Reality: `front/src/steps/index.ts:12` registers
   `[step0, step1, step2, step3]`; step 3 is "soft skills", fully written
   (three units, EN+NL), with no quiz, no figures, no Java — root `CLAUDE.md`
   and `front/src/steps/step3/index.tsx` carry the characterization to reuse.
5. **PRODUCT.md:136-141** ("Evidence on Hand") — names `catalog.png` and
   `step2-engineering.png` at the repo root (deleted; zero references anywhere)
   and `oneshot-prompt.png` / `prompted-with-dribbble.png` at the root used by
   a step 1 unit called `intro` (both images now live in `front/public/`, and
   the unit is `context` — step 1 has no `intro`). `front/public/` actually
   holds: `added-details.png`, `oneshot-prompt.png`, `prompted-with-dribbble.png`,
   `session-usage.png`, `walking-skeleton.png`, `favicon.svg`. The repo root
   holds one orphan screenshot, `session-windows.png` (referenced by nothing —
   leave the file alone; just don't claim it as evidence).
6. **Domain briefing** —
   `kata/step2/java/src/main/java/be/smartagents/kata/java/step2/domain/CLAUDE.md:13`:
   "Money is `BigDecimal` and never `double`. …". Reality: `BigDecimal` appears
   nowhere in step 2's Java; `LateFeePolicy.assess(Loan)` returns `long`
   (cents), as do `LateFeeReport`, `MemberStatements`, `StatementResponse`.
   This is audit item 27, whose prescribed fix is: state the actual invariant —
   money is a whole number of cents in a `long`, never a floating type.
7. **`Step2Application.java` Javadoc** — audit item 28: the class Javadoc still
   says the Boot plugin's `mainClass` is pinned to step 1, that plain
   `mvn spring-boot:run` starts step 1, and that step 2 needs
   `-Dspring-boot.run.main-class=…`. All false since the split into standalone
   projects: plain `mvn spring-boot:run` from `kata/step2/java` starts step 2.
   Read the actual Javadoc first; rewrite just the false paragraph.

Repo writing conventions that apply: prose in `kata/step2/java` follows the
`writing-style` skill at `kata/step2/java/.claude/skills/writing-style/`
(read it before wording the Javadoc/briefing edits); root-level docs avoid
em-dashes in student-facing text.

## Commands you will need

| Purpose | Command | Expected on success |
|---|---|---|
| Font-drift gone | `grep -rn 'Space Grotesk' DESIGN.md .impeccable/design.json` | no output |
| Pin claim gone | `grep -n 'mainClass' PRODUCT.md` | no output |
| Dead files gone | `grep -nE 'catalog\.png\|step2-engineering\.png' PRODUCT.md` | no output |
| Money rule fixed | `grep -n 'BigDecimal' kata/step2/java/src/main/java/be/smartagents/kata/java/step2/domain/CLAUDE.md` | no output |
| Step 2 compiles | `cd kata/step2/java && mvn -q verify` | exit 0 |
| Frontend untouched | `git status --porcelain front/` | empty |

## Scope

**In scope** (the only files you should modify):
- `DESIGN.md`
- `.impeccable/design.json`
- `PRODUCT.md`
- `kata/step2/java/src/main/java/be/smartagents/kata/java/step2/domain/CLAUDE.md` (line 13's bullet only)
- `kata/step2/java/src/main/java/be/smartagents/kata/java/step2/Step2Application.java` (Javadoc only)

**Out of scope** (do NOT touch):
- `audit.md` (see the standing rule above)
- Any flag line in either step 2 CLAUDE.md; the rest of the domain briefing's
  bullets (the `LateFeePolicy` do-not-refactor rule is load-bearing exercise
  protection)
- Any pom, any Java behavior, `front/` entirely, `session-windows.png`
- DESIGN.md's non-typography sections (verified still true)

## Git workflow

- Branch: `advisor/007-retrue-intent-docs`.
- Two commits so the Java-adjacent edits are reviewable apart:
  1. `docs: retrue DESIGN.md, design.json and PRODUCT.md against the tree`
  2. `docs(step2): state the money rule the code follows, fix the run Javadoc`
- Do NOT push or open a PR unless the operator instructed it.

## Steps

### Step 1: DESIGN.md typography

Replace the three frontmatter `fontFamily` values with
`"Figtree Variable, system-ui, -apple-system, sans-serif"`. Update every prose
mention of Space Grotesk to Figtree, rewriting (not just substituting) the one
sentence that characterizes the typeface so it describes Figtree honestly (a
warm humanist sans; drop "slightly geometric" if you judge it untrue of
Figtree — the sentence must read as written for the actual face). Add one line
under the Typography heading: `front/src/index.css` is the token source of
truth and this document follows it.

**Verify**: `grep -c 'Figtree' DESIGN.md` ≥ 8 and `grep -c 'Space Grotesk' DESIGN.md` → 0.

### Step 2: `.impeccable/design.json`

Replace all 10 `Space Grotesk Variable` occurrences with `Figtree Variable`
(the fallback stacks in those strings stay as they are). It is JSON — validate.

**Verify**: `node -e "JSON.parse(require('fs').readFileSync('.impeccable/design.json','utf8')); console.log('valid')"` → `valid`,
and `grep -c 'Space Grotesk' .impeccable/design.json` → 0.

### Step 3: PRODUCT.md

- Rewrite the backend bullet (lines 88-93): each step is a standalone project
  holding exactly one `@SpringBootApplication`, so the Boot plugin needs no
  `<mainClass>` pin and `mvn spring-boot:run` from a step's directory starts
  that step. Keep the still-true `@SpringBootTest` sentence.
- Update both step counts to four and add a step 3 clause (soft skills; worked
  in the student's own head and team; no quiz, no figures, no Java, nothing
  machine-graded — phrasing available in root `CLAUDE.md` and
  `front/src/steps/step3/index.tsx`).
- Rewrite the Evidence bullet from reality: name the five real screenshots in
  `front/public/` and the serving convention (files in `front/public/` are
  served at `/<name>`), note the pair `oneshot-prompt.png` /
  `prompted-with-dribbble.png` is used by step 1's `context` unit. Drop the
  two dead filenames.
- Keep the `<!-- impeccable:product-schema 1 -->` comment intact.

**Verify**: the three grep commands from the table (`mainClass`, dead
filenames) return nothing; `grep -c 'four' PRODUCT.md` ≥ 1 in the steps bullet.

### Step 4: The domain briefing's money bullet

In the domain `CLAUDE.md`, replace the `BigDecimal` bullet with the invariant
the code keeps (audit item 27's prescribed fix): money is a whole number of
cents held in a `long`, never a floating-point type; a rounding change shows up
as a wrong fee three layers away. Match the file's voice; change nothing else
in the file.

**Verify**: the `BigDecimal` grep returns nothing;
`git diff --numstat` for that file shows a one-bullet-sized change (~2-4 lines).

### Step 5: `Step2Application.java` Javadoc

Read the class. Rewrite only the paragraph making the false pin/run claims to
say: this project holds one main class, the Boot plugin needs no pin, and plain
`mvn spring-boot:run` from `kata/step2/java` starts it. Word it per the
`writing-style` skill.

**Verify**: `cd kata/step2/java && mvn -q verify` → exit 0, and
`grep -n 'main-class\|mainClass' src/main/java/be/smartagents/kata/java/step2/Step2Application.java` → no output.

## Test plan

Docs-only plus one Javadoc; the verification greps and step 2's default build
are the tests. No new tests.

## Done criteria

- [ ] All six verification greps return the expected nothing/counts
- [ ] `.impeccable/design.json` parses as JSON
- [ ] `cd kata/step2/java && mvn -q verify` exits 0
- [ ] `git status --porcelain` shows only the five in-scope files
- [ ] No flag value appears in any diff hunk or commit message
- [ ] `audit.md` untouched
- [ ] `plans/README.md` status row updated

## STOP conditions

Stop and report back if:

- The `@SpringBootTest` claim turns out false when you verify it against
  `LoanControllerTest` (then the whole PRODUCT.md bullet needs the maintainer).
- Any in-scope excerpt no longer matches (drift check).
- You find yourself editing any line of either step 2 CLAUDE.md other than the
  money bullet.

## Maintenance notes

- After this lands, the maintainer runs the `audit-update` skill; items 27 and
  28 should close on re-measure.
- DESIGN.md now declares `front/src/index.css` authoritative — future palette
  or type changes go tokens-first, doc-second.
- PRODUCT.md's screenshot list will rot again; it now names the directory
  convention so the next re-truing is one `ls`.
