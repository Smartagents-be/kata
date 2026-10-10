# Course review: what to change before the October class

Reviewed 7 Oct 2026 on commit `06e6271` and kept current since (fixed items are removed), for senior developers on brownfield code, mostly on GitHub Copilot in IntelliJ, in 1 day in class, EN and NL.

This is the one review file. It holds:
- the original review, including what was in `FEEDBACK.md` (the open content gaps from `audit.md`, cited as "audit N", and the course owner's own notes);
- the 4 validation passes of 7 Oct (`plans/reports/review-*.md`: exercise mechanics, external facts, content, and a summary), folded into the bullets below.

Exact replacement texts (EN and NL), sources and dry-run evidence are in `review/` (local only, excluded from git: it describes exercise internals, so never commit it). Dry-run results in there are evidence of that run, not a guarantee for every student, model or laptop. `FEEDBACK N` tags in code comments and step `CLAUDE.md` files point at `FEEDBACK.md` as it was at `06e6271`, which is in git history. The older review of PR #1 (`plans/reviews/2026-10-05-*`) is complete and not repeated here.

**Labels.** **Must** = fix before the class, for the route we actually teach (not every possible route). No label = fix if time allows. *Design* = a teaching or scheduling choice, not a defect. *Unverified* = needs a rehearsal on the client's setup before it goes into the course. Fixed items are removed; git history has them.

## 1. Decide first

- **Must: one tested IntelliJ route.** README and most Copilot text still assume Copilot CLI in a terminal; `model` and `PriceOneTurn` now name IntelliJ, so "no page names IntelliJ" is stale. Recommended: the IntelliJ chat with the agent picker on **Copilot** (plugin 1.18: the CLI harness inside the IDE), plus Copilot CLI in IntelliJ's terminal for `/context` and `/usage`. Rewrite the Copilot blocks IDE-first, no third variant. Plugin 1.18 behaviour is *unverified* until the rehearsal. Background: `review/copilot-intellij.md`.
- **Step 2 for Copilot.** Copilot already reads `CLAUDE.md`, `.claude/rules`, `.claude/skills` and `.claude/settings.json` hooks, but reading a file does not mean identical behaviour in every IDE agent. Add short Copilot notes (a mapping table beats duplicated prose) where it breaks: stopping a run, the sandbox card, nested `CLAUDE.md` in IntelliJ.
- **1 day does not hold the course** (*Design*). About 915 min of material against 405 teaching minutes; 915 is an author estimate, not a measured class. Pick a classroom subset and keep the rest as self-study. `review/run-sheet.md` is one proposal (27 units, 9 hands-on tasks, the step 2 capstone as a background goal of about 90 min).
- **Must: IntelliJ project layout.** Today the pages assume the repo root and the step reference assumes the step folder (`step1/locales/en.json:240`). Pick one: open the step folder (`exercises/stepN/java`) and make code blocks folder-relative, or open the root and link each pom.
- **JDK floor** (*Design*). Steps 0 to 2 built and passed on JDK 21 in a dry run. Lowering to 21 means changing all 4 poms, the setup check, README and `.idea` together, then rerunning the profiles. Keep GraalVM 25 only for the native flag. Java 17 is a separate decision.
- **Must: auto-loaded files must be student-safe** (see section 3). A student branch without the maintainer notes, `audit.md`, this file, `plans/`, `video/` and the maintainer skills is one way; the minimum is that nothing an agent loads on its own leaks or forbids the exercises.

## 2. Before the day, with the client

- **Must:** ask the client's Copilot admin 2 weeks ahead:
  - "MCP servers in Copilot" switched on (off by default on Business and Enterprise; verified)
  - the Copilot CLI policy switched on
  - which models are enabled: 1 top, 1 middle, 1 small, plus Auto
  - the AI-credit pool and user budgets. Business adds 1,900 and Enterprise 3,900 credits per seat per month to a shared pool (verified); a user budget is a hard stop. Our estimate of 1,000 to 2,600 credits per person for the day (up to 6,000) is unmeasured: measure it in the rehearsal.
  - proxy or mirror access to Maven Central, npm, GitHub and GraalVM
  - permission to install a JDK and Node (per-user installs or managed preinstallation also work; local admin rights are not the only route)

  The default policy for new features applies from 22 Oct (verified), but only to unconfigured GA features: explicit enterprise policies still need checking.
- **Must:** send a pre-course email with a deadline 3 days ahead: HTTPS clone (not a zip: step 2 uses worktrees), run the setup check, the warm-up builds (`mvn -q verify` in steps 0 to 2, `mvn -Pgraded,challenge dependency:go-offline` in step 2), and `npm ci` plus `npm run dev` once. First-run downloads were about 200 MB per laptop in a dry run, plus GraalVM. `go-offline` does not prove every plugin and native dependency is cached.
- **Must:** rehearse once on a client-like Windows laptop with IntelliJ 2026.x, plugin 1.18 or later and a Business seat. In an IntelliJ Copilot session, check `/context`, `/usage`, `/clear` and `/compact`, whether `~/.copilot/copilot-instructions.md` and `CLAUDE.md` are read, adding an MCP server, the step 2 guard hook (note: Copilot only loads repo hooks in a trusted folder), and the Stop button the steering unit now names for IntelliJ.
- **Must:** a tested Windows setup. The setup check is bash-only (GNU version sort, `lsof`) and there is no `.gitattributes`. Git Bash plus `*.sh eol=lf` may be enough; a Node port is optional. Give PowerShell forms for `&&`, `SERVER_PORT=...`, `curl` and quoted `-D` arguments only if PowerShell is the chosen shell.
- Port 8080 is often taken on corporate laptops. At minimum tell students which service should be running; an env-configurable Vite proxy and a "free the port" card are optional (a proxy change alone does not update every hard-coded curl or card).
- **Must** for a root-open IntelliJ route: fix `.idea/` (`misc.xml` names a root pom that does not exist, imports only step 0 and pins an SDK called `graalvm-25`), or untrack it. Add an IntelliJ section to the README: link the poms, pick the JDK, run profiles from the Maven tool window.
- IntelliJ's test runner ignores Maven profiles: "Run all tests" shows step 2's challenge red and runs step 0's reveal tests. Explain the Maven tool window and run configs first; `@EnabledIfSystemProperty` gating is optional and only works if Maven sets the property, otherwise it silently skips the exercises.
- npm: a fresh `npm audit` reports 4 critical, 24 high and 8 moderate (36), not the 1 and 16 first noted. These include propagated severities, and the React Router finding concerns RSC, which this app does not use. Optional: drop the `shadcn` CLI while keeping its stylesheet import (`front/src/index.css:3`), update deliberately and rebuild. A blanket `npm audit fix` is not a plan.
- Close-out on the day: a trainer checklist to run the `install.txt` undo for the planted line, remove the capstone worktrees and stop the services. Nothing reminds anyone today.

## 3. Exercise integrity: agents get the answers (Must)

All confirmed in the source. Keep the deliberate stubs and red profiles intact: removing spoilers is not implementing the answers.

- The root `CLAUDE.md` loads into every student's agent session (Claude Code reads parent folders; Copilot CLI and IntelliJ read the repo root). It names the step 1 scorer, the seams, step 2's setup flag locations, the planted tier gap and row 1's script. In a dry run a cheapest-tier agent read them and scored 6 of 6 on the prompt task. Fix: a short student-safe root `CLAUDE.md`, maintainer notes in a file nothing loads automatically.
- `exercises/step1/java/CLAUDE.md:81` tells the agent to read the flag notes before editing `services/`, which gives away board rows 2, 4 and 5.
- Step 2's project and package instruction files, plus `LateFeePolicyTest`'s Javadoc, forbid the exact work the capstone hands the agent ("do not harden", "do not implement forTier", "do not write the resource hint"). Step 1 already fixed this after agents refused. Move the prohibitions to `front/src/steps/step2/CLAUDE.md`.
- `exercises/step1/front/CLAUDE.md` says "do not decode" with no carve-out for students, so agents may refuse the browser task. Separate maintaining the exercise from doing it; never put the decoded flag in source.
- The maintainer skills in the root `.claude/skills` show up in student sessions. The `EntryController` Javadoc line "so leave it empty" contradicts the student exception in its project `CLAUDE.md`.

## 4. Broken exercises (Must)

- **IntelliJ commands** (*unverified*): `/context` and `/usage` look absent from the Local agent and undocumented in a Copilot session, so ReadYourWindow and OneWindow need Copilot CLI in the IntelliJ terminal. The MCP add line is CLI syntax: give the IntelliJ route (`mcp.json` or Agent Customizations). Rehearse PriceOneTurn's IntelliJ credit moves on plugin 1.18.
- **Step 1 board row 1** fails in IntelliJ's Local agent, which reads a different personal file (`machine-context.mjs` targets only Claude Code and Copilot CLI). Test the chosen Copilot session; add a JetBrains target only if that session does not read the current one (keep backup and idempotent removal).
- **Step 2 capstone:** worktrees start from the last commit, so both jobs miss the pre-flight edits. Checkpoint the intended files first (not "commit everything").
- **Steering card:** from `exercises/step2/java`, `../kata-scratch` lands inside the repo, and removal leaves the branch, so a rerun fails. State the working folder and the cleanup; use `--force` and `branch -D` only on disposable work after reviewing it.
- **Plan-mode cards:**
  - `plan-solve.md`: plan mode cannot write arbitrary project files in Claude Code. Use the harness's plan output and save it after leaving plan mode (harness-dependent; do not claim every tool forbids it).
  - Engineering card: it already says not to approve, and the slide says accept nothing. Optional: say how to decline in each tool.
  - `plan.undo` restores 1 file and asks to delete extra files. A broad `git restore exercises/step1/java` would discard earlier workshop work and still miss untracked files: use a known checkpoint instead.
- **Step 0:** on JDK 17 or 21 a student who skipped `install.txt` gets a raw compiler error from row 1 (`pom.xml:23` compiles for 25).
- **Patterns card:** the fallback endpoint throws, so "run it twice" returns 2 different error bodies (timestamps). Pick a stable job or say what to compare. The card claims the step 2 service already ran, and `jq` is never checked.
- **Evolution card:** say where to build the scratch app, and route the search box through the existing Vite proxy (same origin). Adding backend CORS is unnecessary.

## 5. Wrong or outdated facts (Must)

- **truth:** `TheCutoff` puts Boot 4.0 and 4.1 past the cutoff, but 4.1 shipped 10 June 2026 and current flagship cutoffs are June 2026. A later real release repeats the problem: use a named hypothetical model and a fictional version timeline.
- **prompt:** a Claude Code Haiku session normally plans on Sonnet, so the "cheapest model" contrast does not hold. Show the model per phase, or use the same model for both runs.
- **`copilot-specific.md`:** about 9 points are out of date:
  - Esc: a second Esc interrupts the turn, it does not remove a queued prompt
  - the CLI effort scale: `--effort` documents low, medium, high, xhigh, max (choices are model-specific)
  - the file list: Copilot CLI reads `CLAUDE.md`, Claude rules and skills, and settings hooks
  - JetBrains: missing (an audience change, not an error)
  - Business 1,900 and Enterprise 3,900 credits per seat, pooled
  - built-in servers: only `github-mcp-server` today; do not assume a browser server
  - read dates: update only after rechecking each section

## 6. Class delivery in guided mode

Guided mode drops every run of prose (`front/src/shared/lib/content.ts:185`).

- **Must:** commands and rules that live only in prose vanish in class. Put each on its card or a slide:
  - the MCP add lines (tools)
  - the `## Gaps` rule (steering)
  - rewind and compact (session; the figure and a slide already name `/clear`)
  - the plan-mode how-to (prompt)
  - the step 1 workshop launch command (settle the folder first)
  - the install step and prerequisites (welcome)
  - the step 2 capstone goal sentence
- recap, expectations and impostor are nearly empty in guided mode (*Design*: the deck carries them).
- No slide for ReasoningCost, SpeedAtScale, WordsToFiles, HexagonPorts, the builder-critic prompt, the personal instructions file, permissions, blast radius, or invented packages (*Design*: add one only where the class needs the actionable instruction).

## 7. Writing

- The 5 Oct accuracy pass (PR #1, `f5a83cd`) fixed real overstatements, but some paragraphs swapped them for jargon and stacked hedges. context is already rewritten; harness, model, recap and goals were partly rewritten on 7 Oct. Target the confusing sentences only; keep accurate qualifications, and do not bring back the old overstatements.
- steering lost its cost paragraph, but its slide keeps the point; fix the page reference in `expectations.html:73` (and the other pointers) or restore the paragraph.
- Numbers written as words: about 40 lines across EN, NL, README and install.txt (*Design*, house style; list in `review/text-sweep.md`).
- Dutch, check and choose:
  - "Welke token", "de volgende token", "elke token": dictionaries allow de and het; pick one and apply it consistently, do not mark de-forms as errors on assertion
  - "niet slecht" in `truth.cutoff.1` does not flip the meaning, but a clearer sentence helps
  - "gedateerd" can read as "outdated": prefer an explicit date
- Dutch consistency (*Design*): "context window" 7 times instead of "het venster", "reasoning level" instead of "redeneerniveau", "critic" and "criticus" mixed, "de provider" vs "de leverancier", "rij" vs "regel" in the audit table. "factureert" vs "aangerekend" and "venster" for the allowance window are acceptable as they are.
- Full EN and NL replacement texts are per unit in `review/units/`; check their facts before adopting them, and re-proofread every changed Dutch string before shipping.

## 8. Gaps for seniors on brownfield code (add)

Characterisation tests (`gates.legacy-code.1`/`.2`) and a review checklist (`enablement.where-day-goes`) are in. Still a strong candidate: old-version grounding (section 10, truth). The rest is optional; adding everything breaks the 1-day limit.

- **Onboarding an agent to an existing repo:** `/init` in both tools (Copilot's writes `.github/copilot-instructions.md`), IntelliJ's "Generate Agent Instructions" (writes `AGENTS.md`), and what a legacy repo's instructions need (build and test commands, module map, glossary, no-go zones). On `AGENTS.md`, agreed wording: "Keep shared project instructions in AGENTS.md. Configure each tool to load it (for Claude, import it from CLAUDE.md) and verify that the instructions reach the session." Claude skips `AGENTS.md` by default when a `CLAUDE.md` exists. Also: how an agent explores an unknown codebase before it changes anything, and how to split a big migration into steps you can each review and revert ([common workflows](https://code.claude.com/docs/en/common-workflows)). Review generated instructions; they are not authoritative.
- **Legacy safety net:**
  - gate new code (Sonar's "new code" gate), while existing critical security defects may still deserve a gate
  - an ArchUnit freeze rule (optional)
  - the brownfield walking skeleton: a thin slice through the existing layers; a feature toggle is one release option
- **Code that is neither DDD nor hexagonal:** a glossary and package map in the instructions file, and telling the agent which of 2 generations of a pattern is current. Do not imply a legacy repo must adopt DDD first.
- **What leaves the machine:**
  - code and tool output added to the model's context go to the configured service (not every file a local build reads)
  - content exclusion: agreed wording "Content exclusion support differs between Copilot clients and modes. Check the support for the one your team uses, and verify its configured policy before relying on it." The CLI docs say Business and Enterprise CLI respect exclusions; the IDE Chat agent mode does not. Rehearse the chosen surface.
  - a local MCP server is third-party code running with your rights (remote ones run elsewhere); pin the version for a class, which does not replace review
  - keep credential values out of committed configs (env references are fine; a committed secret must be rotated)
  - the client's actual data policy for its configured service (training vs retention), and which code or data never goes into a context (audit 13)
- **Copilot cloud agent and Copilot code review** (optional): issue to PR on a `copilot/` branch, human approval, required checks you configure yourself. Keep the two apart; fit them into gates, parallel and goals only if time allows.
- **Review, what is still missing:** an AI reviewer gets a fresh context plus the acceptance criteria, and the test-first loop (the agent writes the tests, you read them and watch them fail, then the implementation follows). The 4 review questions and the changed-tests warning are in `enablement`.
- **Long-running goals per tool:** `/goal` in Claude Code, `/autopilot` in Copilot CLI, the Autopilot agent mode in IntelliJ, the cloud agent. The goals unit names none.
- **Team ownership:** which agent files are shared and reviewed (instructions, rules, skills, hooks, a project MCP config) and which stay personal. Each tool has its own syntax.
- **Resuming a session:** `/resume` and `--continue`, and IntelliJ's sessions view.
- **Cost governance on Copilot:** pooled credits, user budgets (hard stops), the Auto model; a long builder-critic run can consume substantial credits (measure; duration alone does not predict it). On Claude: `opusplan`, and an exported `ANTHROPIC_API_KEY` taking precedence over the subscription.
- **When the whole app can't run locally** (other teams' services, SSO, partner APIs): teach a feasible unit, component or contract-test boundary and say what stays unverified.
- **Determinism for CI and compliance:** temperature 0 is not fully deterministic, and newer Claude models reject non-default temperature, so do not present it as a setting.
- **Trainer notes for productivity claims:** DORA 2025 on small batches. METR: the 2025 study found experienced contributors took 19% longer; the 2026 follow-up suggests shorter completion times but is inconclusive (intervals include slowdown, selection effects). Encourage teams to measure their own work.

## 9. Cut or move to self-study (1-day class)

All *Design*, depending on the run sheet; nothing here needs deleting from the kata. Durations are estimates.

- tokens: the attention internals (query, key, value, the network). Trim the KV-cache repeats, but keep the distinction between the inference cache and prompt caching.
- tools: skip McpOvals in class (the deck already does). Run ConnectOne and ShutterFlag as a trainer demo.
- prompt: the trainer runs PlanItTwice's one-shot baseline live, and pairs do the plan half on the same model.
- harness: CutItUp (60 to 120 min).
- model: the 5-hour window (Claude-only). PriceOneTurn now has a Copilot route, so keep a short version if cost is a goal.
- Step 2 cards to self-study or homework: FifteenMinutes, WhereWouldItGo's plan move, SteerARun, SameEveryRun, CountTheDay, GateWalk, the builder-critic run. CheckPermissions becomes a trainer demo.
- goals: ultracode, Claude Design and the frontier relay (Claude-specific).
- Capstone: keep pre-flight, rows 1 to 3 and the statement job. The native row and the debrief audit become demo or homework.
- Quizzes: 1 question per unit by show of hands (31 questions would take about 35 min).
- Repetition: the standing-instruction exercise (session and setup: run it once, refer back), compaction cost in session, and `context.why-bites-hardest.2`.

## 10. Per unit: other fixes

**Step 0**
- welcome: guided mode hides install, prerequisites and house rules (a narrow guided-mode exception for welcome is one option). Mention a day's AI credits in the prerequisites.
- backend: say which folder IntelliJ users open.

**Step 1**
- tokens:
  - "Most of the window costs next to nothing": state the real share (cache reads are about 15% of the bill in the figure); the arithmetic is right.
  - SamplingKnobs: identical top-k and top-p rows are correct arithmetic, but choose a distribution where the 2 filters visibly differ (agreed; keep it consistent with the shared network example).
  - Explain why output costs more, carefully: price is provider policy, not a hardware law.
- prompt:
  - The reasoning-level quiz assumes a reasoning-token report that neither tool shows; reframe around what is observable.
  - The plan-mode quiz key claims a cause its own explanation says the comparison cannot prove.
  - Name the client's available models in the exercise (`opusplan` optional).
  - The 4 practical tips have no slide.
  - The `check-entry` command fails for IntelliJ users who opened the step folder.
- tools:
  - McpServer shows every description loaded: label it as the eager case (below the tool-search threshold or with search off).
  - Add short MCP trust, version pinning and team-sharing advice.
  - IntelliJ's Local agent tool names (*unverified*): align with the chosen harness only.
  - The injection warning before SpotInjection stays (*Design*: concept before practice).
- context:
  - "Only the root `CLAUDE.md` survives compaction" is too broad: verify the reload rules before teaching it.
  - `context.html:150` promises reads outside the start folder need permission; read-only shell commands can read outside it. The start folder scopes discovery, not all reads.
  - 2 quiz stems give the answer away (*Design*).
  - "You choose most of it" has no slide.
- session:
  - Shared instruction files affect colleagues (teach once, in setup).
  - Check the Dutch matches the rewritten compaction paragraphs, and that "both forms of compaction spend tokens" survives guided mode (a step 1 `CLAUDE.md` constraint). `/compact` with a focus is documented for Copilot CLI; verify it in the IDE.
- harness:
  - Built-in sub-agents: some skip instruction files (Claude's Explore and Plan; Copilot's explore, task and code-review), others get them. Check the worker the exercise uses.
  - Add an IntelliJ how-to for sub-agents and a critic (one route).
- model:
  - `model.let-it-pick.1` now names Copilot Auto ("10% off", verified) and `opusplan` for every reader: split it by assistant, point back to `harness`'s coordinator, and fix the stale comment above it.
  - PriceOneTurn's Claude branch doesn't say which cache-write rate to use.
  - SpeedAtScale's comment describes a threshold claim the prose no longer makes; align them.
  - About 10 "measure on your own workload" disclaimers: consolidate, keep the substance.
- truth:
  - Brownfield runs the other way: an old version in the pom, an answer for a newer one. `mvn dependency:tree` shows resolved versions beyond the direct pom declarations.
  - Ask for the file and line behind each claim.
  - "Copilot Auto changes the cutoff per prompt" (*unverified*): check routing before claiming it.
- workshop:
  - Give an IntelliJ launch route.
  - OneWindow's card already disclaims cost; align the prose (`workshop.html:86`).
  - Say who starts the service: the README starts it by hand, the page says the agent does.
  - `flag.system.help`: its source counts are stale; recount or drop them.

**Step 2**
- evolution:
  - Add the brownfield skeleton paragraph (optional).
  - "A version costs an hour" is a rule of thumb; frame it as an example increment.
  - The figure labels the recommended loop "vibe coding" while engineering uses the term pejoratively.
- setup:
  - Add a minimal Copilot route: a mapping table, `/init`, `AGENTS.md` (see section 8) and team ownership.
  - The example hook path is relative; anchor it to the project folder (check each tool's variable).
  - The personal file and permissions have no slide.
  - Name over-commenting and missing logging as the example in `claude-md.2` (audit 7). Text in `review/units/step2-setup.md`.
- engineering:
  - Give the agent the target structure (pasting the tree is one way).
  - The deck dividers keep the "compression" claim cut from the page.
- gates:
  - Blast radius needs 1 concrete example.
- steering:
  - IntelliJ worktrees and queue/steer options (*unverified*): add the chosen route, or keep portable git.
  - The rewind is never practised in class (a trainer demo is enough).
  - 2 weak quiz options (clear vs rewind can coincide; the instruction-file distractor contradicts itself).
- workflows:
  - "The further down, the more you settle first" contradicts the audit's build-first.
  - Spec Kit could be named (optional).
  - The exercise's `audit.md` shares a name with the repo's own; fine as prose, but keep the files apart if students run a real audit.
- enablement: CountTheDay misses waiting on builds as its own category.
- parallel: add 1 Copilot route for sub-agents and critics (IntelliJ custom agent plus "Enable Subagent", or the CLI's `/fleet`).
- goals:
  - 2 quiz stems contain their key (*Design*).
  - The "(August 2026)" stamp: keep it as the example's date or mark a verified date.
- workshop:
  - "1 of the 3 does not move" didn't happen in the dry run (mutation score 42% to 95% on the first pass): soften it, keep the exercise, do not raise the gate to force a failure.
  - "Built to resist a one-shot" doesn't hold: `NativeImageFlag`'s Javadoc names the fix. Remove the guaranteed-failure claim and the answer detail.
  - Add PowerShell forms if the native run stays on Windows.

**Step 3**
- change: add a trainer note separating illustrations from evidence for the productivity claims. Add a short rollout example: who starts, with which task, and what must be in the repo before the second person joins (audit 12).
- expectations: "Steering makes the same point" (see section 7).
- impostor (optional): end on a concrete Monday list (instructions file, 1 skill, 1 gate, 1 measured goal); the take-back card already asks for a next step.

## 11. After the class

Content the course does not have yet. None of it is needed on the day, and its absence does not make the kata broken.

- **Measure a change, not a session:** compare 2 runs on the same model and effort, before and after a change, counting turns and elapsed time as well as tokens or credits, and quality. 2 runs are a practical comparison, not a controlled experiment. Sources: [Claude Code costs](https://code.claude.com/docs/en/costs), [GitHub, monitor AI usage](https://docs.github.com/en/copilot/how-tos/manage-and-track-spending/monitor-ai-usage).
- **Task size:** how big a task can be for 1 run, and when to split it first. Partly there (context: small enough to finish before compaction; parallel: split work with checks), but no method (audit 9).
- **Debugging with an agent:** the word appears (DEBUG hints in the workshop), the loop does not. Teach it: reproduce, pin the bug in a failing test, hand over the failing line and stack trace rather than the whole log, have the agent state hypotheses and test them, and prefer a fix backed by evidence. Bring the browser in: the Playwright server `ConnectOne` connects can reproduce a frontend bug, read the console and network requests, and screenshot before and after; Claude Code also has `claude --chrome`. Sources: [common workflows](https://code.claude.com/docs/en/common-workflows), [Playwright MCP](https://github.com/microsoft/playwright-mcp), [Claude Code with Chrome](https://code.claude.com/docs/en/chrome).
- **Git hygiene:** small commits per step, a commit as a fallback point before you let an agent experiment, and never letting the agent commit or push unreviewed. gates already covers a branch and worktree per agent (audit 8).
- **When not to use an agent:** tasks where an agent is slower or riskier than typing it yourself. It was left out of steering on purpose; step 3 can carry it (audit 15).
- **Claude Code specifics the Copilot-first rewrite leaves out** (checked against the docs on 7 Oct):
  - Commands vs skills: custom commands are merged into skills. `.claude/commands/<name>.md` still works, but `.claude/skills/<name>/SKILL.md` is the current form and can hold supporting files. `disable-model-invocation: true` makes a skill manual-only (and takes its description out of the window; text in `review/units/step2-setup.md`), `user-invocable: false` makes it Claude-only, and a skill wins over a command with the same name. [Skills](https://code.claude.com/docs/en/skills).
  - Custom subagents: shared in `.claude/agents/<name>.md`, personal in `~/.claude/agents/<name>.md`. The frontmatter needs `name` and `description` and can set `model`, `tools`, `disallowedTools` and `skills`; the body is the system prompt. A fresh agent does not get the main conversation (a fork does), so goal, context and expected result are passed explicitly. Tools are inherited when omitted, so least privilege is something you configure. [Subagents](https://code.claude.com/docs/en/sub-agents).
  - Guardrail layers on `.env`: `permissions.deny` with `Read(./.env)` blocks the built-in read tools and recognised Bash commands, but not every script that opens the file; a `PreToolUse` hook can inspect calls but is not an OS-level boundary (add sandbox `denyRead` for that). Hooks live shared in `.claude/settings.json`, personal in `~/.claude/settings.json` and local in `.claude/settings.local.json`. [Hooks](https://code.claude.com/docs/en/hooks-guide), [permissions](https://code.claude.com/docs/en/permissions).
  - Where settings load from: shared settings come from the primary working folder, local settings from the repo root in newer versions, and `/cd` updates the source; `CLAUDE.md`, skills and agents are found upward. This matters when students start inside a step folder. [Settings](https://code.claude.com/docs/en/settings).
  - MCP config: shared servers in `.mcp.json` at the repo root (committed), personal ones in `~/.claude.json`, secrets read from the environment as `${GITHUB_TOKEN}`, and clear tool descriptions that do not overlap. The team-sharing sentence is in `review/units/step1-tools.md`. [MCP](https://code.claude.com/docs/en/mcp).
  - Headless and CI: `claude -p` with structured output and the allowed tools set up front, and GitHub Actions answering an `@claude` mention. Nobody steers, so permissions, gates, isolation, restricted credentials and branch protection are the brakes. [Headless](https://code.claude.com/docs/en/headless), [GitHub Actions](https://code.claude.com/docs/en/github-actions).

Background for several of these: the *Token-efficient AI development* deck and the Claude Certified Architect exam guide.

## 12. Rejected or qualified

What the validation passes turned down, so it does not come back.

| Claim or proposal | Outcome |
| --- | --- |
| Current Claude is about 2.5 characters per token | Rejected; no universal ratio (`tokens.lead.3` now says so). |
| "Start on the middle tier" is outdated | Rejected; a default is not a cost recommendation. |
| `AGENTS.md` is read by all tools | Qualified; needs an import or configuration and a check (section 8). |
| Copilot content exclusion does not apply in the CLI | Rejected for the CLI; true for the IDE Chat agent mode (section 8). |
| METR 2026 found a speedup | Qualified; inconclusive (section 8). |
| Everything the agent reads goes to the provider | Qualified; what enters the model's context does (section 8). |
| The sandbox sentence overclaims | Qualified; it is correct for sandboxed commands, and its limits are now stated. |
| Identical top-k/top-p rows are a bug | Rejected as a bug; changed to a teaching improvement (section 10). |
| "niet slecht" flips the meaning | Rejected; clarity only (section 7). |
| "de token" is wrong | Unproven; pick one article consistently (section 7). |
| Gate all exercise tests with annotations | Optional; risks silently skipping exercises (section 2). |
| Restore all of `exercises/step1/java` to undo the plan task | Rejected; discards earlier work (section 4). |
| Force-remove worktrees as routine cleanup | Qualified; only for disposable work (section 4). |
| The engineering card lacks "do not approve" | Rejected; it already says so (section 4). |
| Run `npm audit fix` | Rejected as a plan; review and update deliberately (section 2). |
| Add backend CORS for the evolution card | Rejected; use the Vite proxy (section 4). |
| Remove every maintainer file | Qualified; auto-loaded files must be safe, the rest is a delivery choice (section 1). |
| Only the root `CLAUDE.md` survives compaction | Unproven; verify first (section 10). |
| Hook timeouts are 600 s (Claude Code) and 30 s (Copilot) | Defaults only, they vary by hook type and are configurable; moot for the fast guard hook. |
| The API wire fields and other stop reasons | Closed; left out of `tools` on purpose. |
| Missing blank line in `step2/locales/nl.json` (audit 45) | Closed; cosmetic, no effect. |
| The workflows `audit.md` clash is a bug | Rejected; the unit names the repo's audit on purpose (section 10). |
