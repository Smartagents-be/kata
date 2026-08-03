# Plan 003: Add CI that runs the five builds the repo already documents

> **Executor instructions**: Follow this plan step by step. Run every
> verification command and confirm the expected result before moving to the
> next step. If anything in the "STOP conditions" section occurs, stop and
> report — do not improvise. When done, update the status row for this plan
> in `plans/README.md` — unless a reviewer dispatched you and told you they
> maintain the index.
>
> **Drift check (run first)**: `git diff --stat be5a6b2..HEAD -- kata/*/java/pom.xml front/package.json`
> If the poms' `<java.version>` or the front scripts changed, adjust the
> workflow to match before proceeding.

## Status

- **Priority**: P1
- **Effort**: S
- **Risk**: LOW (workflow only; MED that the first run needs a version nudge)
- **Depends on**: none (002 makes the optional audit gate possible)
- **Category**: dx / tests
- **Planned at**: commit `be5a6b2`, 2026-08-02

## Why this matters

Root `CLAUDE.md` states the invariant "`mvn test` must pass in every
`kata/stepN/java`" and documents the whole-repo check as a hand-run shell loop
plus `npm run build` and `npm run lint` in `front/`. Nothing runs any of it
automatically — there is no `.github/`, no other CI config, no pre-commit hooks.
A pom edit or a locale rename can land on `main` and be discovered by the next
student. This plan is also the prerequisite for the test plans (004–006): checks
that CI never runs will not stay green.

## Current state

- No `.github/` directory exists.
- Four standalone Maven projects: `kata/step0/java` … `kata/step3/java`. Each
  declares `spring-boot-starter-parent` 4.1.0 and `<java.version>25</java.version>`.
  There is deliberately **no aggregator and no Maven wrapper** (recorded
  decisions in root `CLAUDE.md` — do not add either).
- **Critical repo rule**: three Maven profiles are *meant to fail* and must
  never run in CI — step 2's `graded` and `challenge` profiles, and step 0's
  opt-in intro profile (deliberately unnamed in docs). Running the plain,
  default lifecycle (`mvn verify` with no `-P` flags) is always safe and
  green in all four projects.
- Frontend: `front/package.json` scripts — `build` (`tsc -b && vite build`),
  `lint` (`oxlint`). No test script yet (plan 004 adds one; see Maintenance).
- Vite 8 / TS 6 need a recent Node; use Node 22 (LTS).

## Commands you will need

| Purpose | Command | Expected on success |
|---|---|---|
| Validate YAML locally | `node -e "console.log('workflow written')"` then rely on CI | file parses on push |
| Backend check (local spot run, optional) | `cd kata/step3/java && mvn -q verify` | exit 0 (step 3 is the fastest project) |
| Frontend check (local) | `cd front && npm ci && npm run build && npm run lint` | exit 0 |

## Scope

**In scope** (the only files you should create/modify):
- `.github/workflows/verify.yml` (create)

**Out of scope** (do NOT touch):
- Any `pom.xml` — no wrapper, no enforcer, no root aggregator.
- `front/package.json` — no script changes here.
- Any profile activation: the workflow must not contain the strings
  `-Pgraded`, `-Pchallenge`, or any other `-P` flag.

## Git workflow

- Branch: `advisor/003-ci-verify-workflow`.
- One commit: `chore: add CI running the default build of all five projects`.
- Do NOT push or open a PR unless the operator instructed it (CI proof will
  come from the first push the operator makes).

## Steps

### Step 1: Write the workflow

Create `.github/workflows/verify.yml`:

```yaml
name: verify

on:
  push:
    branches: [main]
  pull_request:

jobs:
  backend:
    runs-on: ubuntu-latest
    strategy:
      fail-fast: false
      matrix:
        step: [step0, step1, step2, step3]
    steps:
      - uses: actions/checkout@v4
      - uses: actions/setup-java@v4
        with:
          distribution: temurin
          java-version: '25'
          cache: maven
      # Default lifecycle only. The graded/challenge/intro profiles are
      # exercises that are MEANT to be red; never activate a -P flag here.
      - run: mvn -q verify
        working-directory: kata/${{ matrix.step }}/java

  frontend:
    runs-on: ubuntu-latest
    defaults:
      run:
        working-directory: front
    steps:
      - uses: actions/checkout@v4
      - uses: actions/setup-node@v4
        with:
          node-version: '22'
          cache: npm
          cache-dependency-path: front/package-lock.json
      - run: npm ci
      - run: npm run build
      - run: npm run lint
```

**Verify**: `grep -c 'mvn -q verify' .github/workflows/verify.yml` → 1, and
`grep -c '\-P' .github/workflows/verify.yml` → 0 (no profile flags; the string
`-P` must not appear in any `run:` line).

### Step 2: Local sanity pass of what CI will run

```bash
(cd kata/step3/java && mvn -q verify) && (cd front && npm run build && npm run lint)
```

**Verify**: exit 0. (Step 3's project is the empty scaffold and builds in
seconds; the other three are checked by CI itself on first push. If you have
time budget, run all four.)

## Test plan

The workflow is the test infrastructure; its own verification is the first
green run after the operator pushes. Local Step 2 approximates it.

## Done criteria

- [ ] `.github/workflows/verify.yml` exists, parses (first push shows both jobs)
- [ ] No `-P` flag anywhere in the workflow
- [ ] Backend job matrixes over exactly the four existing step dirs
- [ ] Local sanity pass (Step 2) exits 0
- [ ] `plans/README.md` status row updated

## STOP conditions

Stop and report back if:

- Temurin 25 is unavailable on the runner image at execution time — report;
  do not silently lower `java-version` (the poms pin `<java.version>25`, and
  `javac` must be ≥ that).
- Any project's default `mvn -q verify` fails locally — that is a real
  regression on `main`, not a CI problem; report it instead of "fixing" the
  workflow around it.
- You feel the need to touch a `pom.xml` to make CI pass.

## Maintenance notes

- After plan 002 lands, add `- run: npm audit --omit=dev --audit-level=high`
  to the frontend job (it fails today, so do not add it before 002).
- After plan 004 lands, add `- run: npm test` after the build line; after plan
  005, `- run: npm run check:content`.
- A future `kata/step4/java` must be added to the matrix by hand — the matrix
  is a literal list on purpose (an auto-glob would silently skip a typo'd dir).
- The `graded`/`challenge` prohibition is the one thing a reviewer must check
  on any future edit to this file.
