# Course quality pass, 6 August 2026: where it stopped

The run was cut off partway by an account **monthly spend limit**, not by a failure in the work.
51 of 57 implementation agents died on the same error within seconds of each other. This file
records exactly what landed, what did not, and how to pick it up.

## What is in this folder

| Path | What it is |
|---|---|
| `dossiers/` | 25 per-unit critiques, 4 per-deck critiques, plus `course-arc.md`, `facts.md`, `parity.md`. Each is a harsh independent read of one thing, with quoted defects and replacement text. |
| `work-order-step{0..3}.md` | The executable triage. Four critics' findings per unit, deduplicated, with a **Do** list carrying verbatim replacement prose and a **Do not** list protecting recorded decisions. ~5,300 lines. This is the plan. |
| `BRIEF.md` | The shared brief every agent read: mandate, prohibitions, writing rules, AI-tell list, locale patch protocol. |
| `merge_locales.py` | Line-aware patcher for `en.json` / `nl.json`. Preserves the hand-maintained one-key-per-line formatting and blank-line grouping that a `json.dump` round trip destroys. |
| `patches/`, `manifests/` | What the partial implementation run produced. The patches have been applied; the manifests have **not** been executed. |

## The three decisions taken before any work started

1. **Workshops: only where it can be honestly graded.** Step 0 gains one, step 1 and step 2 get
   theirs strengthened, step 3 gets a structured closing exercise that is explicitly not graded
   rather than a fake board.
2. **Dutch stays in lockstep.** No drift is acceptable.
3. **Rewrite and restructure is licensed**, but licence is not obligation: the prose here is
   deliberate down to the sentence and the failure mode to avoid is flattening it into competent
   generic courseware.

## What actually landed in the repository

**Applied and verified:**
- Locale patches for step 0, step 1 and step 2 (`merge_locales.py`). Missing Dutch prose keys went
  from 27 to 14. `npm run build` and `npm run lint` both pass, and all four Java projects are green
  on `mvn verify`.
- **The failing `git worktree add` is fixed** in both places it is taught, `step2/goals` and
  `step2/steering`. The form is now `git worktree add -b <branch> <path>`, reproduced working
  against git 2.50.1. The `<pre>` blocks carry no `data-i18n`, so there was no Dutch to move.
- **The speed claim is corrected to "two to three times"** in all four strings. The English prose
  in `model.html` had already been changed by the partial run, which left the figure label and both
  Dutch strings still saying "four to five": exactly the EN/NL drift this pass exists to prevent.
  Fixed in `step1/locales/en.json` (`tiers.haiku.body`), `step1/locales/nl.json`
  (`tiers.haiku.body`, `model.speed.1`) and in `step1/CLAUDE.md`, which recorded the old ratio.
- 17 English keys in step 1 have no Dutch and that is **pre-existing and correct**: they are figure
  labels that are proper nouns or code (`tiers.haiku.name`, `spot.source.grep`).
- No em-dashes in any student-facing prose. The 8 the sweep finds are in `CLAUDE.md` headings and
  one source comment.

**Landed but NOT reviewed by any critic:**

Several unit HTML files were rewritten between 08:39 and 08:44 by agents that hit the spend limit
before their critic could run. The write reached disk; the judgement never happened. Treat this
prose as a first draft, not as passed work:

    step0/welcome  step0/backend  step0/workshop
    step1/tokens   step1/prompt   step1/tools    step1/context  step1/session
    step1/harness  step1/model    step1/truth    step1/workshop step1/recap
    step2/evolution step2/setup   step2/engineering step2/steering step2/patterns

**A caution worth stating plainly.** Some of those files already carried uncommitted edits when
this pass began. Those edits were overwritten by agent output and, being uncommitted, are not
recoverable from git. JetBrains local history (`.idea` is present) is the only likely recovery
path if any of that prior work mattered.

## What did NOT happen

- **No critic loop ran.** Not one unit was judged. The whole point of the design (write, judge,
  rewrite until a harsh critic passes) never executed.
- **No integration.** Manifests are unexecuted, so: registries unwired, quizzes not attached,
  step 0's new `workshop` unit not registered, per-step `CLAUDE.md` files not updated.
- **Step 0's decision D1 was not made.** The shared-machinery change in `front/src/shared/step.ts`
  and `front/src/shared/lib/content.ts` that lets step 0 keep its prose in guided mode. Without it
  step 0 still renders as headings and answer boxes with the paragraphs they refer to deleted.
- **No deck work.** All four decks are untouched.
- **14 prose keys still have no Dutch**, in `step0/workshop` and `step1/prompt`, because those
  units' write agents died before writing their patch.

## The highest-value findings, if you do nothing else

Items 1 and 2 are **already fixed** (see above). The rest are open.

1. ~~`git worktree add <path> <branch>` fails, taught twice.~~ Fixed.
2. ~~"four to five times faster" is out by roughly 2x.~~ Fixed.
3. **Guided mode is the default and drops every run of prose**, which leaves step 0's front page
   and step 3's closing unit nearly blank. Three critics found this independently.
4. **The course never tells anyone what to install.** No prerequisites anywhere.
5. **The last thing a student does is unit 22 of 25.** The course ends on three pages that ask
   for nothing.

## How to resume

The plan is complete and independent of the agent run that died. Re-run implementation against
these work orders. The workflow script is at
`~/.claude/projects/-Users-bassarrechia-code-kata-agentic-java/9ea704f5-e83c-414e-8acc-50cfcc2ca504/workflows/scripts/course-implement-wf_1d6c416a-805.js`
and its three phases are Units (write/judge loop), Integrate (patches, registries, CLAUDE.md), Build.

Point its `SCRATCH` constant at this folder rather than the deleted job scratchpad, since the
patches and manifests it reads now live here.

Cheapest useful order if budget is tight:
1. The five findings above, by hand. They are small and they are the untrue things.
2. Integration, so the work already on disk is actually wired up and reachable.
3. The critic loop over the 16 unreviewed units.
4. Decks last: they depend on the prose settling.
