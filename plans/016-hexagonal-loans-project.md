# Plan 016: Lay out `exercises/step2/java` the way `Hexagonal architecture` draws it

> **Executor instructions**: Java restructuring in step 2, plus the curriculum and notes that name
> the packages. Read `front/src/steps/step2/CLAUDE.md` (the `engineering`, `WhereWouldItGo` and
> `workshop` parts) and `exercises/step2/java/CLAUDE.md` in full before touching a file. This is a
> **pure move**: package declarations, imports and file locations change, nothing else. Use
> `git mv` so history follows the files. Work the phases in order; on any STOP condition, stop and
> report.
>
> **Drift check (run first)**: `git status --short && git log --oneline -5`. The October 2026
> `engineering` changes (IBAN example, `SliceSkills`, inward `HexagonPorts`, ports in
> `application/`, the reformatted `WhereWouldItGo` card) may still be uncommitted. That is
> expected; they are the figure this plan matches the project to.

## Status

- **Priority**: P1 (course owner's request, 2026-10-11)
- **Effort**: M
- **Risk**: MED. Four graded things read the package layout (the `graded` profile, the `challenge`
  tests, the native-image flag, the `setup` board), and one exercise exists because the layout
  disagrees with the figure.
- **Depends on**: none
- **Planned at**: commit `a5e8f3f` plus the uncommitted `engineering` work, 2026-10-11

## Why

`engineering`'s `DomainTree` and `HexagonPorts` now draw `domain/` (functional core, no
dependencies), `application/` (use cases plus the ports they own) and `adapter/incoming/` and
`adapter/outgoing/`. The project a student opens next to them is layered by technology:

| Now | Figure |
|---|---|
| `domain/` Loan, MediaType, MemberTier, LateFeePolicy, `CLAUDE.md` | `domain/` (same) |
| `port/LoanRepository` | `application/LoanRepository` |
| `application/` LateFeeReport, MemberStatements | `application/` (same) |
| `web/` LoanController, StatementCode, StatementResponse | `adapter/incoming/web/` |
| `adapter/InMemoryLoanRepository` | `adapter/outgoing/persistence/` |
| `config/`, `aot/`, `Step2Application` | no place in the figure (`host/` is the nearest) |

The owner wants the code to teach what the page draws.

## Decisions for the owner (answer before Phase 1)

1. **What happens to the `WhereWouldItGo` card.** It exists *because* the project disagrees with the
   figure (its own docblock and `step2/CLAUDE.md` say so). After the move only `config/`, `aot/` and
   `Step2Application` disagree. Options:
   - **A (recommended): rewrite it as "walk the hexagon".** Same slot, same storage key. Moves:
     list the packages (`ls` stays), predict each from its name, trace 1 use case from the
     controller through the use case and the port to the adapter, check the arrows (nothing in
     `domain/` imports from `application/` or `adapter/`; the adapter implements the port), and
     name what the figure has no place for (`config/`, `aot/`). The plan-mode move goes, since
     there is nothing left to restructure.
   - B: retire the card and its deck slide (`deck-step2-engineering-sort`).
   - C: keep a deliberate gap (move everything except `port/`), so the card still has one real
     disagreement to find.
2. **A capability package (`loans/`) on top?** The figure is 1 module per capability. Recommended:
   **no**. The project has 1 capability, `step2/CLAUDE.md` already argues slicing it shows nothing,
   and it would rename every package, including the one holding a `setup` flag's file.
3. **Adapter folder names.** Recommended: `adapter/incoming/web/` and
   `adapter/outgoing/persistence/`, the figure's own words without the technology leaf it adds
   (`rest`, `postgres`), since the adapter here is in-memory.
4. **`config/` and `aot/` stay where they are.** Recommended: yes. They are framework wiring, and
   the card's "what has no place in the figure" move needs them.

**Answered 2026-10-11**: decisions 2, 3 and 4 as recommended (no `loans/` package,
`adapter/incoming/web/` and `adapter/outgoing/persistence/`, `config/` and `aot/` stay), and
decision 1 as **B: retire the card** (the owner found it not useful once the project matches).

## Constraints (binding)

- **Do not harden the loans module.** No new tests, no refactor, no change to any method body. The
  `graded` profile's red numbers are the workshop's brief.
- **Do not implement `MemberStatements.forTier`, do not add a `native` profile or a resource hint.**
- **Do not name `MemberTier.PARTNER`** in any file a student's agent loads.
- **Never quote, move into another file, or aggregate a `setup` flag.** Two of the three sit in
  files this plan edits around (`exercises/step2/java/CLAUDE.md`, `domain/CLAUDE.md`). Edit the
  package table in the first without touching its flag line; leave `domain/CLAUDE.md` where it is
  (the `domain` package does not move, so the board's "the same file one level down" stays true).
- **The `setup` prose and board hints name none of the three files.** Do not start now.
- `exercises/step2/java/CLAUDE.md` is loaded by a student's agent: describe the layout, never an
  exercise's answer.

## Phase 0: Baseline (before any move)

From `exercises/step2/java`, capture into a scratch file:

1. `mvn -q verify` (must be green).
2. `mvn verify -Pgraded` (must be red): the 3 locked rows, today `39.0% >= 90.0%`,
   `worst method 21 <= 10`, `42.4% >= 80.0%`.
3. `mvn test -Pchallenge` (must be red): the failing test names.
4. `mvn -Pnative native:compile`, start the binary with `SERVER_PORT=8081`: it starts and prints the
   miss, not a flag.
5. `mvn spring-boot:run` and `curl -s localhost:8082/api/loans/statement/STUDENT`: same response as
   before (a 500 while `forTier` is a stub).

## Phase 1: Move the Java (pure move)

1. `git mv` per the table above; update `package` lines and imports. `domain/` keeps its files and
   its `CLAUDE.md`.
2. Tests mirror production: `web/LoanControllerTest` → `adapter/incoming/web/`.
3. `pom.xml`: the JaCoCo exclude `step2/web/**` becomes `step2/adapter/incoming/**`. The PIT targets
   (`domain.*`) and the `MemberStatements*` exclude do not change. `FlagRevealIT`'s `MODULE` prefix
   (`be/smartagents/kata/java/step2`) still covers every subpackage.
4. Check that nothing outside `adapter/` imports an adapter class, and that `domain/` imports
   nothing from `application/`, `adapter/` or `config/`.

## Phase 2: Re-run the baseline

All 5 checks from Phase 0 must give **the same result**, and the graded numbers must be identical to
the decimal. **STOP** if any number moves: a moved file was counted or excluded differently.

## Phase 3: Curriculum

1. Retire `WhereWouldItGo`: delete `WhereWouldItGo.tsx`, its registration in `index.tsx`, the
   `where.*` keys in both bundles, and the `<hr>`, the `ui:quiz.title` heading and the card slot at
   the foot of `units/engineering.html`, so the unit closes on `HexagonPorts`. The orphaned
   `kata.step2.where` storage key needs nothing: `shared/lib/reset.ts` clears the `kata.step2.`
   prefix.
2. Deck: delete `deck-step2-engineering-sort` and `deck.engineering.sort.*`, and drop
   `WhereWouldItGo` from the "Kept off on purpose" list in `deck.tsx`'s docblock.
3. Grep the step 2 units and locales for `web/`, `port/` and `adapter/` naming the project (not the
   figure) and update them. Today none are known outside the card.

## Phase 4: Notes

- `exercises/step2/java/CLAUDE.md`: the package table (student-facing, layout only).
- `front/src/steps/step2/CLAUDE.md`: reverse "`exercises/step2/java` deliberately stays layered by
  technology … Do not restructure the project to match the figure", rewrite the `WhereWouldItGo`
  paragraphs, and fix the workshop note that "the challenge lives in `application/` and `web/`" (now
  `application/` and `adapter/incoming/`; the two jobs still touch disjoint files).
- `front/src/steps/step2/CLAUDE.md`: the counts at the top ("Eight of the nine close on something
  the student does", the list of units closing on a `TaskCard`) lose `engineering`, and the
  `WhereWouldItGo` paragraphs become a short record of why it was cut. Check `front/CLAUDE.md` and
  `front/src/steps/CLAUDE.md` for the card's name too (`#where-would-it-go`).
- Leave `plans/` history and `review/` dry runs alone; they record the old layout on purpose.

## Phase 5: Verify

```bash
for s in step0 step1 step2 step3; do (cd exercises/$s/java && mvn -q verify) || echo "$s FAILED"; done
cd exercises/step2/java && mvn verify -Pgraded    # red, same 3 numbers
cd exercises/step2/java && mvn test -Pchallenge   # red, same tests
cd front && npm run build && npm run lint
grep -n '—\|–' front/src/steps/step2/locales/*.json
```

Then open `/steps/step2/engineering` and `/steps/step2/workshop` in both languages.

## STOP conditions

- A graded number, a challenge failure or the native miss changes between Phase 0 and Phase 2.
- A move needs a change inside a method body.
- Any edit would put a flag's text, or a `setup` flag file's path, somewhere new.

## Delivery

One commit for the Java move plus notes, one for the curriculum, both left for the owner's review.
