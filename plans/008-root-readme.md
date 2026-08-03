# Plan 008: Give the repo a human entry point at the root

> **Executor instructions**: Follow this plan step by step. Run every
> verification command and confirm the expected result before moving to the
> next step. If anything in the "STOP conditions" section occurs, stop and
> report — do not improvise. When done, update the status row for this plan
> in `plans/README.md` — unless a reviewer dispatched you and told you they
> maintain the index.
>
> **Drift check (run first)**: `ls README.md LICENSE* 2>/dev/null`
> Expected: nothing. If a root README already exists, STOP — reconcile, don't
> overwrite.

## Status

- **Priority**: P2
- **Effort**: S
- **Risk**: LOW
- **Depends on**: none (007 first is nicer, so the README never links stale docs)
- **Category**: docs
- **Planned at**: commit `be5a6b2`, 2026-08-02

## Why this matters

This is a training product handed to Java developers in a company setting. The
repo root today holds five markdown files — `CLAUDE.md`, `PRODUCT.md`,
`DESIGN.md`, `audit.md`, `copilot-specific.md` — every one of them agent- or
maintainer-facing, and no `README.md`. A student or tutor landing on a clone or
the Git host's repo page gets a file list with no orientation; the two most
inviting names (`PRODUCT.md`, `DESIGN.md`) are internal specs. The setup story
exists (`CLAUDE.md` "Running it", the `repo-setup` skill, `front/README.md`,
which is genuinely good) — it is just filed where only agents look.

## Current state

- Repo root files: `CLAUDE.md`, `DESIGN.md`, `PRODUCT.md`, `audit.md`,
  `copilot-specific.md`, `session-windows.png`, `skills-lock.json` (untracked),
  plus `front/`, `kata/`, `video/` (untracked). No README, no LICENSE.
- `front/README.md` exists and is accurate (scripts table, ports, "no test
  runner" — verify that last claim still holds if plans 004+ have landed, and
  do not contradict it either way; if 004 landed, `front/README.md`'s test
  claim is that plan's follow-up, not yours).
- The run story, from root `CLAUDE.md` (verified):

  ```bash
  cd kata/step1/java && mvn spring-boot:run   # step 1's backend on :8080
  cd front && npm run dev                     # frontend on :5173  <- open this one
  ```

  One backend at a time holds `:8080`; opening the frontend with the backend
  down is a supported state.
- Toolchain: JDK 25 (poms pin `<java.version>25`), Maven 3.9+ on PATH (no
  wrapper, deliberate), Node 22+ for `front/`.
- Writing rule: **no em-dashes** in student-facing prose (this README is
  student-facing; the `lesson-writing` skill carries the rule).

## Commands you will need

| Purpose | Command | Expected on success |
|---|---|---|
| Link check | `grep -oE '\]\([^)]+\)' README.md` | every relative target exists |
| Em-dash check | `grep -c '—' README.md` | 0 |

## Scope

**In scope**:
- `README.md` at the repo root (create)

**Out of scope** (do NOT touch):
- **LICENSE** — choosing a license is a legal decision only the maintainer can
  make. Do not add one, do not name a recommended license in the README. The
  open decision is recorded in `plans/README.md`.
- `front/README.md`, `CLAUDE.md`, and every other existing doc.
- Any restating of exercise content, profile names, or flag mechanics. Root
  `CLAUDE.md` deliberately leaves step 0's opt-in profile unnamed; the README
  must not name any Maven profile at all.

## Git workflow

- Branch: `advisor/008-root-readme`.
- One commit: `docs: add a root README that orients and delegates`.
- Do NOT push or open a PR unless the operator instructed it.

## Steps

### Step 1: Write `README.md`

Thirty to forty-five lines, orienting and delegating, restating nothing that
lives elsewhere. Structure:

1. **Title + one paragraph**: what the kata is — a hands-on course teaching
   Java developers to work with coding agents; the repository is the lesson,
   built one step at a time. (Source the sentence from `PRODUCT.md`'s purpose
   section; write fresh prose, do not copy internal wording like "walking
   skeleton".)
2. **Prerequisites**: JDK 25, Maven 3.9+ on your PATH, Node 22+.
3. **Run it** (the two-terminal block from Current state, verbatim commands),
   plus one line: the app works with the backend down; a unit tells you when
   it wants one.
4. **Where things are**: a short map — `front/` the course app
   (see `front/README.md`), `kata/stepN/java/` one standalone Maven project
   per step, opened from inside its own directory.
5. **For agents and maintainers**: one line each pointing at `CLAUDE.md`
   (contributor rules), `PRODUCT.md` / `DESIGN.md` (internal specs). Mention
   that agent sessions can run the `repo-setup` skill to doctor a fresh clone.
6. **No license note**: a single line stating the license is not yet chosen and
   rights are reserved until it is (honest, and it flags the decision without
   making it).

Do not mention: Maven profiles, flags, `audit.md`, `video/`, or anything that
names an exercise's mechanics.

**Verify**: `grep -c '—' README.md` → 0; every relative link resolves
(`front/README.md`, `CLAUDE.md` exist); `wc -l README.md` ≤ 60.

### Step 2: Render sanity

View the file as Markdown (any renderer); confirm the code block is fenced and
the map reads as a list.

**Verify**: `head -5 README.md` shows a `#` title and prose, not front matter.

## Test plan

Docs-only; the greps above are the test.

## Done criteria

- [ ] `README.md` exists at the root, ≤ 60 lines, no em-dashes
- [ ] Names no Maven profile, no flag, no exercise mechanic
- [ ] Does not add or recommend a LICENSE
- [ ] All relative links resolve
- [ ] Only `README.md` created; nothing else modified
- [ ] `plans/README.md` status row updated

## STOP conditions

Stop and report back if:

- A root README appears in the tree between planning and execution.
- You cannot describe the run story without naming a profile or an exercise —
  that means you are over-explaining; cut instead.

## Maintenance notes

- The README deliberately holds almost no duplicated facts; the two that can
  rot are the toolchain versions (bump when the poms/front do) and the port
  numbers.
- The license line should be replaced the day the maintainer picks one — the
  open item lives in `plans/README.md`.
