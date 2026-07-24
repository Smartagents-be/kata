# Course audit — agentic-engineering kata

**Question asked:** does the material currently in the frontend fill **6 hours** of course, in
both delivery modes (guided classroom and self-learning), and what topics or information are
missing? The three throughlines the author is aiming for are **cost consideration**,
**concepts**, and **hidden gems**.

> **Two icons run through this document.** Wherever a heading or a line touches one of the
> author's two signature throughlines, it is marked:
> - 🪙 **coin — cost consideration.** A point about what something *costs*: tokens re-sent per
>   turn, the CLAUDE.md bill, a long run's token/hours price. Follow the coins to see where the
>   money is (and where the kata talks about it but never puts a number on it).
> - 💎 **gem — hidden gem.** A non-obvious, high-leverage insight — usually one of the kata's
>   `data-audience="self"` asides, or an advanced move worth surfacing. Follow the gems to find
>   the sharp, memorable bits a first read might miss.
>
> Concepts (the third throughline) is the connective tissue of the whole document, so it carries
> no icon. A heading may carry both when a topic is a gem *and* a coin.

**Short answer:** the *conceptual foundation* (step 1) and the *engineering-habits* layer
(step 2) are strong and unusually well written. But the material as it stands fills roughly
**2h15–3h** of guided delivery, not 6h, and the gap is concentrated in four places: (1) the
mechanics under the concepts (tokens, caching, the tool loop, model choice) are asserted but
never taught first-hand, (2) there is no hands-on lab spine for step 1 — it is read-and-quiz
only, (3) cost is discussed qualitatively but never *measured*, and (4) whole workflow topics a
working Java dev meets on day one (reviewing agent output, git hygiene, debugging a stuck agent,
MCP, subagents) are absent. This document maps what ships, quantifies the gap, and proposes the
units and a 6h agenda to close it.

---

## 1. Coverage map

Legend: ● strong · ◐ present but thin · ○ absent. Columns are the author's three throughlines.

### step0 — "Start here"

| Unit | Teaches | 🪙 Cost | Concepts | 💎 Gems |
|------|---------|:----:|:--------:|:-----------:|
| `welcome` | How the kata works; the "three ways to use it" (read alone / reference / guided at the board); the `{}` answer convention; the Hint button | ○ | ○ | ○ |
| `backend` | The Maven backend is a separate half; offline grading; `mvn verify -Pintro` prints a code | ○ | ○ | ○ |

Onboarding only, by design. Correct scope.

### step1 — "Context" (the conceptual spine)

| Unit | Teaches | 🪙 Cost | Concepts | 💎 Gems |
|------|---------|:----:|:--------:|:-----------:|
| `intro` | Stateless + statistical model; missing vs wrong context; "why this bites hardest in code"; entropy; amnesia / context-fatigue; "more context is not free" | ● | ● | ◐ (the "would this change what the agent does?" aside) |
| `prompt` | The prompt as the layer you write on purpose; reasoning level; meta-prompting; plan mode; `/clear`, bundling, being exact | ◐ (reasoning-level & meta-prompt cost) | ● | ◐ (run-a-task-through-plan-mode aside) |
| `session` | Whole transcript re-sent every turn; "sessions are where the money goes"; fixed-does-not-mean-gone; session management as the core skill | ● | ● | ◐ (watch-your-own-session aside) |
| `harness` | System prompt, tool definitions, skills — the layer you did not write | ○ | ◐ (two sentences only) | ○ |
| `external` | Fetched material is the least-trusted layer | ○ | ◐ (one paragraph) | ○ |
| `evaluation` | Label six items by their context layer (free-text, server-graded) | ○ | ● (synthesis test) | ◐ (the confusion-point notes) |

Concepts and cost are genuinely strong here. `harness` and `external` are stubs — two sentences
and one paragraph. The whole step is **read + quiz + one typed answer**, and even that one typed
answer is currently non-functional: the `/exercises/{id}/check` endpoint was removed, so
submitting `evaluation` errors out (CLAUDE.md confirms the free-text half is unbacked). So the
conceptual half has *no working hands-on element* at all today — which sharpens, rather than
softens, the "step 1 has no lab" finding below.

### step2 — "Agentic engineering" (the habits)

| Unit | Teaches | 🪙 Cost | Concepts | 💎 Gems |
|------|---------|:----:|:--------:|:-----------:|
| `setup` | CLAUDE.md (always-on, re-sent every turn); skills (frontmatter, load-on-match, `references/`); hooks introduced | ● (CLAUDE.md "bill you pay per message") | ● | ● (cover-the-body skill test) |
| `engineering` | Vibe vs engineering; language-as-compression; checks while it runs; DDD + ports-and-adapters; the four-module domain shape | ● (boundaries "five files instead of fifty") | ● | ● (count-files-opened diagnostic) |
| `scoping` | Task size; which folder you open the agent in; the `.claude` symlink trap; root vs in-domain | ◐ (per-turn reading cost) | ● | ● (ask-what-it-read symlink check) |
| `patterns` | The third-time rule; CLAUDE.md vs skill vs hook vs **script**; why a script beats prose | ◐ | ● | ◐ |
| `quality` | The build decides, not the agent; write the standard down; coverage / complexity / mutation; the gamed-proxy warning | ◐ | ● | ◐ |
| `goals` | Outcome not keystroke; long-running runs; token/hours cost; git worktree | ● (the token/hours quote) | ● | ● (goal + worktree + read-the-diff) |
| `workshop` | Capstone flag board; 5 flags (coverage floor, complexity ceiling, honest/mutation coverage, statement endpoint via plan mode, native image via plan mode + resource hints + worktree) | ◐ | ● | ● (the whole thing) |

This step is the strongest asset in the kata: it has a real, gradable, hands-on capstone. Cost
appears repeatedly but always qualitatively — never a number the student computes.

### Throughline verdict

- **Concepts** — well covered for *context and the model as a statistical, stateless,
  finite-window predictor*, and for *engineering habits*. **Not** covered for the mechanics the
  concepts sit on: tokens, the tool-use loop, model families, prompt caching, MCP, subagents.
- 🪙 **Cost** — a genuine and repeated theme (per-turn re-send, CLAUDE.md bill, boundaries cut
  reading, long-run token/hours). But it is entirely *qualitative*. The student never sees a
  price, a token count, or a cache-hit line. This is the single biggest "information missing"
  inside a topic the author already owns.
- 💎 **Hidden gems** — the `data-audience="self"` asides are excellent and are the kata's signature
  move. Step 1 and step 2 each carry four such asides, so the imbalance is in *what* they cover,
  not the count: step 1's are diagnostics for the concepts, step 2's are power-user habits.
  Several power-features (git worktrees as an everyday habit, background tasks, custom slash
  commands, MCP, subagents, `/context` and friends) never appear at all.

---

## 2. Time budget — how much course is actually here?

Estimated *guided* delivery time (teacher reads/works a unit at the board, runs the quiz or
exercise, takes questions). Self-paced time is lower on talk, higher on lab.

| Block | Guided | Self-paced |
|-------|:------:|:----------:|
| step0 (welcome, backend) | 10 min | 15 min |
| step1 (6 units + 2 quizzes + 1 graded) | 55–70 min | 45–60 min |
| step2 (6 prose units) | 55–70 min | 45–60 min |
| step2 workshop (5 flags, hands-on) | 30–45 min shown / **2–4h if actually done** | 2–4h if actually done |
| **Total, prose + quizzes** (step0+1+2 rows) | **~2h00–2h30** | **~1h45–2h15** |
| **Total, if the workshop is truly worked** | **up to ~5–6h** | **up to ~6h** |

**One planning figure to hold on to:** guided prose + quizzes ≈ **2h15**. A realistic 6h guided day
= foundations + both concept steps + the workflow units + **one** worked workshop flag. The full
workshop (all five flags) is a **separate half-day session**, not the tail of the first day.

**The pivot point:** the kata already *can* fill 6h — but only if the workshop is run as a real,
supervised hardening lab (coverage, complexity, mutation, the challenge endpoint, the native
image). As pure prose-and-quiz it is a ~2.5h course. So the 6h question is really two questions:

1. Is there a **lab spine** so the 6h is spent *doing*, not reading? Today only step 2 has one.
2. Are the **foundational mechanics and workflow topics** present so a Java dev is not asked to
   harden a module for a native image before anyone has shown them the tool loop, model choice,
   how to review agent output, or how to read a token bill?

The gap analysis below closes both.

---

## 3. Gap analysis

Each gap is tagged **[G]** guided / **[S]** self-learning / **[B]** both, and by throughline.

### 3a. Concepts / foundations — the mechanics under the ideas

- **Tokens & tokenization [B, concepts+cost 🪙].** The whole cost argument rests on "every token is
  re-sent," yet the student never sees what a token *is*, how text becomes tokens, or how to
  count them. This is the missing floor under both the concepts and the cost throughline.
- **The tool-use / agentic loop [B, concepts].** step1 `harness` names tools in two sentences.
  The student never sees the actual loop: model emits a tool call → harness runs it → result is
  appended → model continues. This is *the* mechanic that makes an "agent" an agent, and it is
  the missing link between step1's "context" and step2's "how you work."
- **Model families & selection [B, concepts+cost 🪙].** `prompt` says "a cheaper model driven
  through a plan beats a one-shot on the expensive one" but never introduces the model lineup
  (Opus / Sonnet / Haiku), what each is for, or how to choose. A dev doing real work picks a
  model daily.
- **Prompt caching [B, cost 🪙].** The cost story is materially incomplete without it: caching is
  precisely what makes "the whole session re-sent every turn" affordable, and it changes the
  advice ("read everything while the file is loaded"). Currently absent.
- **Context observability [B, concepts].** The student is told the window fills with entropy but
  is never shown how to *look* at it (what is in context now, how full it is). Naming the actual
  affordances (`/context`, `/clear`, compaction) turns an abstract warning into a habit.

### 3b. 🪙 Cost — make it measurable, not just cautionary

- **A pricing/economics unit [B, cost 🪙].** Per-token math, input vs output pricing, cache reads
  vs writes, and a worked example ("this session cost roughly X; here is why turn 40 cost 8× turn
  1"). The kata talks about cost more than most courses and *shows* it less. Closing this turns
  the strongest qualitative theme into the most memorable quantitative one.
- **Measuring spend in practice [B, cost 🪙].** How to actually see what a run cost. Pairs naturally
  with the `goals` long-run unit ("four hours is not unusual") — right now that number is
  asserted, never observed.

### 3c. Workflow — what a working dev hits on day one

- **Steering a running agent [B, concepts+gems 💎] — the biggest single miss.** `prompt` teaches how
  to write a good *initial* instruction (plan mode, being exact), but nothing teaches the everyday
  verb of *directing*: course-correcting a running agent, interrupting, "no, do it this way,"
  giving feedback on a partial result, when to steer vs. when to restart. PRODUCT.md defines
  success as "a developer who can direct an agent well" — and this, the central act of directing,
  is absent. It outranks tokens, caching, MCP, subagents and permissions on relevance. `recovery`
  (below) covers the failure case; this is the ordinary case.
- **Curating the agent's inputs [B, concepts].** `scoping` covers task size and which folder to
  open in, but not what you put *in front of* the agent: which files to point at, `@`-mentions,
  when to hand it a spec vs. let it read. The input side of the same skill.
- **Reviewing & verifying agent output [B, concepts+gems 💎].** step2 `quality` says "the build
  decides," but reviewing a *diff you did not write* is its own skill (reading for intent, not
  just green tests). Currently only gestured at ("still you reading the diff").
- **Debugging a stuck / looping agent [B, gems 💎].** step1 explains entropy as *why* an agent
  degrades; nothing teaches the recovery move in the moment (when to `/clear`, when to restate,
  when to abandon the session). This is the practical payoff of the entropy concept.
- **Git hygiene with agents [B, workflow].** Worktrees appear in `goals`/`workshop` as an
  advanced move, but the everyday practice — branch per task, small reviewable commits, not
  letting an agent commit blind — is missing. Natural home: promote it to a first-class habit.
- **MCP in depth [B, concepts].** step1 `external` names "an MCP server's response" in one clause
  and moves on. For a team course this deserves its own treatment: what MCP is, wiring a server,
  and the trust posture (it is the least-trusted layer for a reason).
- **Subagents / parallel work [S mostly, gems 💎].** Delegating to subagents and running work in
  parallel is a major power-feature and a cost lever; entirely absent.
- **Permissions & settings.json depth [B, workflow].** Named in `scoping`/`patterns` as where
  the rules live, but never taught directly (allow/deny, hooks wiring, the safety posture).

### 3d. Delivery-mode gaps

- **step1 has no lab [B].** It is read + quiz + one typed answer. Guided delivery can lean on a
  live demo, but self-learning learners have nothing to *do* for the entire conceptual half. A
  short hands-on for step 1 (see proposals) is the highest-leverage single addition for the
  self-learning track.
- **The workshop is under-scaffolded for guided rooms [G].** As a capstone it is excellent solo,
  but a teacher running it for a room needs checkpoints, expected timings, and a "if you are
  stuck here, do this" ladder. Today it is one long page.
- **No instructor guide / timing anywhere [G].** For a 6h guided course, the absence of per-unit
  timings, demo scripts, and discussion prompts is itself a gap.

### 3e. Minor accuracy / doc-drift (found in passing)

- `PRODUCT.md` still describes a "two-step curriculum" (step1 + step2) and omits the shipped
  step0. Update it.
- `flags.ts`'s docstring still says "the three flags the workshop hands out," but **five** flags
  ship in the array below it. Update the comment. (Note: "six habits" in the registry and the
  workshop's "three goals" heading are *not* drift — six prose units and a three-goal graded
  profile are both correct; the fourth and fifth flags are added on top.)

---

## 4. Proposed units and steps to reach 6h

Sized to close the gaps above while respecting the kata's rules: one topic per unit, each a green
stopping point, and **withhold the student's work** (ship the spec and scaffold, not the answer).
No full lesson prose here — titles and outlines only.

### New **step "Foundations"** — a *2-unit bridge*, not a mini theory course

Rationale: step1 opens on "context" without grounding the loop/model mechanics every later claim
leans on. But keep it tight — this is a bridge for people learning to *direct* an agent, not an
LLM-internals course. Only two units clearly earn a working Java dev's time here:

1. `loop` — the tool-use loop drawn end to end (call → run → append → continue). Ties step1's
   "context" to step2's "how you work." Figure-driven, like `ContextDiagram`. **[B, concepts]**
2. `models` — the model families and how to choose; the plan-cheap-model-beats-one-shot claim
   made concrete with a small side-by-side. **[B, concepts+cost 🪙]**

Tokens/tokenization and prompt caching do **not** each get a unit — they fold into a *single cost
unit* (below) as worked sections. A live in-browser tokenizer is off-scope for "direct an agent";
use a static worked example (a real snippet with its token count and per-turn cost) instead.

### New **🪙 cost unit** — make the strongest qualitative theme quantitative (one unit)

3. `economics` — one unit that turns the kata's repeated cost talk into numbers: a token is the
   billing atom (static worked example), input vs output pricing, what prompt caching does to the
   curve and how it changes the "load-everything-once" advice, and how to see what a run actually
   cost. Closes both §3b gaps and the caching/token pieces of §3a. **[B, cost 🪙]**

### New unit(s) inside step1 (give the concepts a lab)

4. step1 `observing` — a hands-on: open a real session, ask the agent what it has read, watch the
   window fill, `/clear`, watch it reset. Turns entropy/amnesia from prose into a felt thing. The
   self-learning track's missing lab. **[B, concepts+gems 💎]**
5. Expand `harness` and `external` from stubs into full units. Target ~step1-unit length each:
   `harness` = system prompt + tool definitions + skills + hooks framed as *one layer you did not
   write* (with the `/context` and observability affordances); `external` = MCP (what it is, wiring
   a server) + the trust posture that makes it the least-trusted layer. **[B, concepts]**

### New **step "Working with an agent"** — the day-one workflow (slots between step2 and the workshop, or extends step2)

6. `steering` — **the core "direct an agent" unit, and the audit's headline addition.**
   Course-correcting a running agent: interrupting, "no, do it this way," feedback on a partial
   result, and the steer-vs-restart decision. This is the everyday verb PRODUCT.md names as
   success and nothing currently teaches. **[B, concepts+gems 💎]**
7. `review` — reading a diff you did not write; intent vs green build; the security-review reflex
   on agent code. **[B, concepts+gems 💎]**
8. `recovery` — debugging a stuck/looping agent; the in-the-moment `/clear`/restate/abandon
   decision. The practical payoff of step1's entropy. **[B, gems 💎]**
9. `git` — branch per task, small reviewable commits, worktrees as everyday not exotic;
   fold the settings.json/permissions safety posture in here as an aside. **[B]**
10. `delegation` — subagents and parallel work as a scoping + cost lever. Nice-to-have. **[S, gems 💎]**
11. `mcp` deep dive — nice-to-have; audience-narrow (many teams won't wire servers in a 6h intro).

### Instructor scaffolding (guided track)

12. An `INSTRUCTOR.md` (not a unit): per-unit timings, demo scripts, discussion prompts,
    workshop checkpoints and the "stuck here → do this" ladder. Closes 3d. **[G]**

Each proposed unit closes a named gap; none ships the student's answer.

---

## 5. Hour-by-hour 6h agenda

Two tracks. Guided assumes a tutor at the board + a room doing short labs; self-learning assumes a
learner alone with the site and a terminal. Times include the two 10-min breaks.

**Honest framing first.** A 6h *guided* day realistically delivers **foundations + both concept
steps + one worked workshop flag** — not the full workshop. The capstone is 2–4h of real work
(the challenge endpoint and native image are each a plan-mode exercise of their own), so it wants a
**separate session**, not the last 80 minutes of a full day. The agenda below is paced for that
truth rather than pretending the workshop compresses.

| Time | Guided (classroom) | Self-learning |
|------|--------------------|------------|
| 0:00–0:20 | step0 welcome + backend; get everyone's env running (expect stragglers) | step0; get env running |
| 0:20–1:05 | **Foundations**: `loop` (demo live) + `models` + the `economics` cost unit (cost math on the board) | Foundations `loop` + `models` + `economics` |
| 1:05–1:15 | Break | Break |
| 1:15–2:05 | **step1**: intro + prompt + session (concepts core); run both quizzes as a room | step1 intro/prompt/session + quizzes |
| 2:05–2:45 | **step1**: harness + external (expanded) + `observing` lab; evaluation as **discussion/demo only** (its grading endpoint is removed — do not have the room submit until it is restored) | step1 remainder + `observing` lab; evaluation read-through |
| 2:45–3:35 | **step2**: setup + engineering + scoping (habits core) | step2 setup/engineering/scoping |
| 3:35–3:45 | Break | Break |
| 3:45–4:25 | **step2**: patterns + quality + goals | step2 patterns/quality/goals |
| 4:25–5:05 | **Working with an agent**: `steering` + `review` + `recovery` (live: interrupt a running agent, correct it, recover a stuck one) | steering + review + recovery + git |
| 5:05–6:00 | **Workshop, one flag worked end to end** (coverage floor as a supervised hardening lab); complexity, honest-coverage, challenge endpoint and native image set as a **separate follow-up session** | Workshop: work the first flag; rest at own pace |

Both columns land at ~6h. The realism caveats the second GAN pass raised are built in: the room
loses time to env setup, the evaluation exercise is broken so it is demo-only, and the workshop is
scoped to **one** flag in-class with the rest a named follow-up rather than an 80-minute miracle. If
even the first flag runs long, the native image is the last thing to attempt — it is explicitly the
stretch/plan-mode goal. Treating the full workshop as its own half-day is the honest way to use the
kata's strongest asset.

---

## 6. Priority verdict — what to build first for 6h

The ranking below reflects the second GAN pass's central correction: rank *directing-the-agent*
skills above LLM-internals, since that is the kata's stated scope.

**Must-have (without these, 6h is padding, not teaching):**
1. 💎 **`steering`** — course-correcting a running agent. The central verb of "direct an agent" and
   currently taught nowhere. Highest relevance for this audience.
2. 💎 **`review`** — reading a diff you did not write. Arguably the core competency; promoted out of
   "high-value" because verifying agent output beats tokenization on relevance every time.
3. 💎 The step1 **`observing` lab** — gives the conceptual half something to *do*, which the
   self-learning track badly needs (its only typed exercise is currently broken).
4. The **Foundations bridge** (`loop` + `models`) plus **expanding `harness`/`external`** — the
   on-scope connective mechanics. Note this is *two* bridge units, not a four-unit theory step.

**High-value (turn a good course into a complete one):**
5. 🪙 The **`economics` cost unit** — one unit that makes the strongest qualitative theme
   quantitative (token/pricing/caching/measuring folded together). Not four separate mechanics.
6. **`recovery` + `git`** — the rest of the day-one workflow.
7. **INSTRUCTOR.md** — the guided track cannot reliably hit 6h without timings and demo scripts.

**Nice-to-have (depth, not blockers):** `delegation`/subagents, `mcp` deep dive, permissions
(fold the last into `git` as an aside rather than a unit).

**Explicitly de-scoped:** a live in-browser tokenizer, and any standalone prompt-caching or
LLM-internals unit — off-target for an audience learning to direct an agent; keep only the
worked cost example inside `economics`.

**Free wins:** fix the two doc-drift items in §3e (PRODUCT.md's "two steps"; `flags.ts`'s "three
flags" docstring) while touching these files.

---

*This is the generator draft. It is hardened by two adversarial ("GAN") review passes — one for
completeness/correctness against the actual kata, one for relevance — recorded in §7 below.*

## 7. Adversarial review log

### Pass 1 — completeness & correctness (discriminator vs the codebase)

An adversarial reviewer re-verified every coverage claim against the source. The audit's core
judgments survived: harness/external are stubs, cost is entirely qualitative, step 1 has no
working lab, five flags ship, MCP appears in a single clause. Seven defects were found and **all
are now fixed above**:

- **D1** — the "hidden gems concentrated in step 2, step 1 has only three" claim was wrong: step 1
  and step 2 each carry four self-learning asides. Corrected to "imbalance is in *what*, not count."
- **D2** — `evaluation` was labeled a working graded exercise; the check endpoint was removed, so
  it errors on submit. Now stated (and it strengthens the "no step 1 lab" point).
- **D3** — the §3e doc-drift item was two-thirds wrong: "six habits" and "three goals" are correct,
  not drift. The only real drift is `flags.ts`'s "three flags" docstring. Rewritten.
- **D4** — the prose+quiz subtotal (2h15–2h55) overshot its own rows; corrected to 2h00–2h30.
- **D5** — "self-paced" renamed to the product's own term, "self-learning," throughout.
- **D6** — `welcome` reframed to its own "three ways to use it," not "two modes."
- **D7** — the `tokens` lab now carries a build-cost / scope-stretch note and a cheaper first cut.

### Pass 2 — relevance (discriminator on the audit's usefulness)

A second adversarial reviewer judged whether the audit's content is worth a working Java dev's
course time, given the kata's "direct a coding agent" scope. Its central finding: **the generator
draft tilted toward LLM-internals and generic completeness and under-weighted directing the
agent.** The draft has been restructured to fix that:

- **Foundations shrunk from a 4-unit step to a 2-unit bridge** (`loop`, `models`); tokens and
  caching folded into a single `economics` cost unit; the interactive tokenizer explicitly
  de-scoped (§4, §6).
- **The missing headline topic added:** `steering` — course-correcting a running agent — is now
  the #1 must-have. The reviewer named it "the central verb of 'direct an agent'" and absent from
  both kata and draft. A secondary miss, curating the agent's inputs, was added to §3c.
- **`review` promoted to must-have** (was high-value); verifying agent output outranks
  tokenization for this audience (§6).
- **§5 agenda made honest:** it now states a 6h guided day realistically covers foundations + both
  concept steps + workflow + **one** worked flag, with the full workshop a separate session; the
  broken `evaluation` exercise is marked demo-only (it was scheduled as live grading); env-setup
  slippage is budgeted.
- **§2 now commits to one planning figure** (≈2h15 prose+quiz) instead of a 2:1 range.
- **`harness`/`external` expansion given a target size and content spine** (§4), its one vague
  actionable item before.

Both passes are folded in. Remaining judgement calls left to the author: whether MCP and
permissions each deserve a unit (audit says no, fold them), and whether the `economics` unit
should show live pricing or a static worked example (audit recommends static, for scope).
