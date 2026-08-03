# Plan 013: Scope the Copilot repair for step 2 (investigation, not authoring)

> **Executor instructions**: This is a DESIGN/SPIKE plan. You investigate and
> write ONE report file; you modify no source, no unit HTML, no locale file.
> Follow it step by step; on any STOP condition, stop and report. When done,
> update the status row for this plan in `plans/README.md` — unless a reviewer
> dispatched you and told you they maintain the index.
>
> **TWO RECORDED DECISIONS THAT BIND THIS PLAN** (both verified in the tree):
> 1. `front/src/steps/step0/CLAUDE.md` on the welcome unit's assistant promise:
>    "A caveat written back into it is the wrong repair: **the repair is giving
>    step 2 variants**, at which point there is nothing to caveat. Until then,
>    do not restore a scope line as a substitute for the work." Softening the
>    promise is therefore PROHIBITED, not an option this spike may recommend
>    executing without the maintainer explicitly reopening that decision.
> 2. `kata/step2/java/CLAUDE.md`: the three setup flags live in files an agent
>    reads (`.claude` skill, two CLAUDE.mds), are plaintext on purpose, and the
>    unit must not name those files. Never quote a flag or name the three files
>    in anything student-facing; the report may discuss the *mechanism*.
>
> **Drift check (run first)**: `git diff --stat be5a6b2..HEAD -- front/src/steps/step2 front/src/steps/step0/CLAUDE.md copilot-specific.md`
> Material changes to step 2's units mean re-inventorying rather than reusing
> the numbers below.

## Status

- **Priority**: P2
- **Effort**: M (the spike; the authoring it scopes is L and not this plan)
- **Risk**: LOW (read-only plus one report file)
- **Depends on**: none
- **Category**: direction / design
- **Planned at**: commit `be5a6b2`, 2026-08-02

## Why this matters

The maintainer's own audit (audit.md item 44) records: step 2 is now the only
module with no `data-assistant` anywhere in it — 7,052 words across 10 units —
while step 0's `welcome` promises every reader the course "will modify the
content of this course to include the relevant commands so you can easily
follow along" (`front/src/steps/step0/units/welcome.html:37-38`). A Copilot
student gets that adaptation in steps 0, 1 and 3, then hits the largest module
written entirely for Claude Code. The recorded repair is step 2 variants; what
nobody has yet written down is what that repair actually consists of, block by
block, and where it is impossible (the `SetupFlags` exercise is built on
Claude-specific files). This spike produces that scoping so the maintainer can
decide with real numbers.

## Current state

- Step 2 units: `front/src/steps/step2/units/*.html` (10 files). Zero
  `data-assistant` attributes in the step
  (verify: `grep -rln 'data-assistant' front/src/steps/step2/` → nothing).
- The working mechanism, for reference while classifying:
  `front/CLAUDE.md` "The assistant rule" (variant pairs both carry the
  attribute and suffixed keys `…N.claude` / `…N.copilot`; never on the same
  element as `data-audience`; a `data-figure` marker is never wrapped —
  attribute goes on the marker itself).
- The knowledge base for the Copilot side: `copilot-specific.md` at the repo
  root (self-dating, sourced; read it fully). The cross-step scope statement is
  in `front/src/steps/CLAUDE.md`: the Copilot side assumes **Copilot CLI**.
- Step 1's worked examples of every variant kind:
  `front/src/steps/step1/CLAUDE.md`, section "The assistant variants" — ten
  blocks, classified there as filename/command swaps, one product-fact swap,
  and one Claude-only-whole section (the five-hour window, with the reasoning
  for having no Copilot sibling at all). These are the categories your
  inventory reuses.
- The hard case: step 2's `setup` unit and its `SetupFlags` board send the
  student to discover instruction files in `kata/step2/java`. The three files
  are Claude-shaped (`.claude` skill, CLAUDE.mds). Copilot's equivalent
  instruction surfaces exist (`copilot-specific.md` documents them) but the
  *planted* files do not. This is the block where "variant" may mean real Java-
  project work (planting Copilot-readable equivalents) or an honest
  Claude-only marking — the report must cost both.

## Commands you will need

| Purpose | Command | Expected on success |
|---|---|---|
| Inventory | `grep -c 'data-i18n' front/src/steps/step2/units/<unit>.html` | per-unit block counts |
| Confirm zero variants | `grep -rln 'data-assistant' front/src/steps/step2/` | no output |
| Nothing modified | `git status --porcelain` | only the report file |

## Scope

**In scope** (create only):
- `plans/reports/013-copilot-step2-scope.md` (create `plans/reports/` if absent)

**Out of scope** (do NOT touch):
- Every file under `front/src/` and `kata/` — zero source edits
- `front/src/steps/step0/units/welcome.html` — the promise stays exactly as it
  is (recorded decision above)
- `audit.md`, `copilot-specific.md` — read-only inputs

## Git workflow

- Branch: `advisor/013-copilot-step2-scope`.
- One commit: `docs: scope the step 2 assistant-variant repair`.
- Do NOT push or open a PR unless the operator instructed it.

## Steps

### Step 1: Inventory every block that would vary

Read each of the 10 unit HTML files in `front/src/steps/step2/units/` end to
end, plus the step registry (`front/src/steps/step2/index.tsx`) for figures and
boards. For every block a Copilot CLI reader would find untrue, record:
unit, `data-i18n` key, current claim, and its category using step 1's taxonomy:

- **A: mechanical swap** (filename, command, config path — e.g. `CLAUDE.md` →
  `.github/copilot-instructions.md`, `claude` CLI invocations, skill/hook
  references), with the Copilot-side fact and its source line in
  `copilot-specific.md`
- **B: product-fact rewrite** (a paragraph whose claim is structured
  differently on Copilot, needing fresh prose)
- **C: no Copilot equivalent** (candidate for a Claude-only block with no
  sibling, on the five-hour-window precedent — record why)
- **D: exercise-structural** (the `setup`/`SetupFlags` case and anything else
  where the *exercise*, not the prose, is product-specific)

**Verify**: the report's inventory table row-count is within ±3 of a recount of
your own grep of candidate terms
(`grep -rn 'CLAUDE.md\|claude\|skill\|hook\|/context\|/clear' front/src/steps/step2/units/` —
a recall check, not the method).

### Step 2: Cost the D-category honestly

For `setup`: sketch both repairs with coarse effort each —
(i) plant Copilot-readable instruction files in `kata/step2/java` carrying the
same three flags (list which surfaces `copilot-specific.md` says Copilot CLI
actually reads, and what the planting must NOT do: name the files in the unit,
collect flags anywhere, break the "finding the files is the exercise" design);
(ii) mark the unit/board Claude-only on the five-hour-window precedent, and
what that does to the welcome promise (it keeps step 2 from ever satisfying it,
which collides with recorded decision 1 — say so plainly).

**Verify**: both options carry an effort estimate, a list of files touched, and
a named risk.

### Step 3: Write the report

`plans/reports/013-copilot-step2-scope.md`:

1. **Numbers first**: blocks by category (A/B/C/D) per unit; total authoring
   estimate for A+B (each A block ≈ minutes + NL sibling; each B ≈ a paragraph
   ×2 languages), C and D listed singly.
2. The inventory table itself.
3. The `setup` decision memo from Step 2.
4. **Sequencing recommendation**: which two or three units cover the most
   student-visible surface first (the units the audit row names as failing
   hardest are the starting candidates — check item 44's own list).
5. **Open questions for the maintainer** — including, explicitly: whether
   recorded decision 1 stands (full parity is the goal) or is being reopened
   (Claude-only marking becomes admissible); this report recommends, the
   maintainer decides.
6. Every Copilot-side fact cited to `copilot-specific.md` by line, with its
   dated-facts caveat carried over.

**Verify**: `git status --porcelain` shows exactly the one new file (plus
`plans/README.md` when you update the row).

## Test plan

Not applicable (no code). The report's quality gate is Step 1's recall check
and Step 3's structure.

## Done criteria

- [ ] Report exists with the six sections, inventory ≥ covers all 10 units
- [ ] Zero source files modified (`git status --porcelain` clean apart from the
      report and the index row)
- [ ] No flag value, and none of the three planted-file paths, appear in any
      student-facing phrasing the report proposes
- [ ] The welcome promise is untouched and the report nowhere recommends
      caveating it without naming decision 1 as the thing being reopened
- [ ] `plans/README.md` status row updated

## STOP conditions

Stop and report back if:

- Step 2 already contains `data-assistant` blocks (the repair has started;
  inventory what remains instead of duplicating).
- `copilot-specific.md` lacks the facts a category-A swap needs (a gap in the
  knowledge base is a finding for the report, not something to research from
  the open web and state as fact — Copilot's surfaces have changed under this
  course before).

## Maintenance notes

- The follow-up authoring plan(s) should be cut per-unit from this report's
  sequencing section, executed under the `lesson-writing` skill, with the NL
  siblings in the same commit as each EN block (the variant-pair key scheme
  fails safe but only when both suffixed keys exist).
- When the authoring lands, step 0's CLAUDE.md paragraph about the gap being
  "carried by audit.md alone" should be revisited by the maintainer — that is
  audit territory, not this plan's.
