# Plan 001: Untrack the local settings file and unstage the accidental video renders

> **Executor instructions**: Follow this plan step by step. Run every
> verification command and confirm the expected result before moving to the
> next step. If anything in the "STOP conditions" section occurs, stop and
> report — do not improvise. When done, update the status row for this plan
> in `plans/README.md` — unless a reviewer dispatched you and told you they
> maintain the index.
>
> **This plan must run in the real checkout, not a git worktree.** It edits
> the repository's index (staged files) and tracking state, which a worktree
> does not share.
>
> **Drift check (run first)**: `git status --porcelain | grep '^A ' | wc -l`
> Expected: `12` (the twelve staged files under `video/out copy2/`). Also run
> `git ls-files .claude/settings.local.json` — expected: it prints the path
> (the file is tracked). If either differs, the user has already acted on
> part of this plan; treat it as a STOP condition and report what you found.

## Status

- **Priority**: P1
- **Effort**: S
- **Risk**: LOW
- **Depends on**: none
- **Category**: dx / security
- **Planned at**: commit `be5a6b2`, 2026-08-02

## Why this matters

Two things are about to be committed that should not be. Twelve files totalling
~19 MB of rendered Remotion output (two mp4s, ten pngs) are **staged** under
`video/out copy2/` — a Finder-duplicate directory whose space-suffixed name slips
past the `out/` ignore rule. Once committed, that media is in git history
permanently and every clone pays for it; while it is only staged, removal is one
command. Separately, `.claude/settings.local.json` is **tracked**, and it carries
two agent hooks (`PostToolUse`, `Stop`) that shell out to `node` against an
absolute path under one developer's home directory. On any other machine they
no-op behind a `[ ! -f … ]` guard, but a per-machine settings file does not belong
in the repo, and it publishes a local username and home layout.

## Current state

- `git status` shows 12 files staged with `A` under `video/out copy2/`, including
  `kata-agentic-java.mp4` (13 MB) and `promo.mp4` (5.7 MB).
- Root `.gitignore:2` reads `out/`. The directory `video/out/` is covered; the
  duplicate `video/out copy2/` is not, which is how the `git add` caught it.
- `.claude/settings.local.json` (30 lines, tracked) contains two hooks of this
  shape:

  ```json
  "command": "[ ! -f \"/Users/<user>/.claude/skills/impeccable/scripts/hook.mjs\" ] || node \"/Users/<user>/.claude/skills/impeccable/scripts/hook.mjs\""
  ```

- Root `.gitignore` has no entry for `.claude/settings.local.json`.
- The rest of `.claude/` (six first-party skills) is tracked on purpose — do not
  touch it.

## Commands you will need

| Purpose | Command | Expected on success |
|---|---|---|
| Staged list | `git status --porcelain \| grep '^A '` | 12 rows before, 0 after |
| Tracking check | `git ls-files .claude/settings.local.json` | path before, empty after |
| Ignore check | `git check-ignore -v "video/out copy2/promo.mp4"` | prints the matching rule |

## Scope

**In scope** (the only things you should modify):
- The git index (unstage `video/out copy2/`, untrack `.claude/settings.local.json`)
- `.gitignore` (root): two added lines

**Out of scope** (do NOT touch, even though they look related):
- The `video/out copy2/` directory contents on disk — do **not** delete files;
  they may be the only copy of a render the author wants. Unstage only.
- `.claude/settings.local.json` on disk — `git rm --cached` only; the file must
  keep working on the author's machine.
- Everything else untracked (`video/` sources, `.agents/`, `skills-lock.json`,
  `.claude/skills/improve`) — those are a separate, undecided item (see
  `plans/README.md`, findings considered and rejected/deferred).
- `video/.gitignore` — untracked; whether video/ is committed at all is not
  decided yet.

## Git workflow

- Work directly on the current branch's index; this plan is preparation for the
  user's next commit, so do **not** commit or push anything yourself.

## Steps

### Step 1: Unstage the video renders

```bash
git restore --staged "video/out copy2"
```

**Verify**: `git status --porcelain | grep -c '^A '` → `0`, and
`ls "video/out copy2" | wc -l` → `12` (files still on disk).

### Step 2: Untrack the local settings file

```bash
git rm --cached .claude/settings.local.json
```

**Verify**: `git ls-files .claude/settings.local.json` → empty output, and
`test -f .claude/settings.local.json && echo present` → `present`.

### Step 3: Add the two ignore rules

Append to the root `.gitignore`, next to the existing `out/` line:

```
video/out*/
.claude/settings.local.json
```

**Verify**:
- `git check-ignore -v "video/out copy2/promo.mp4"` → prints the `video/out*/` rule
- `git check-ignore -v .claude/settings.local.json` → prints the new rule
- `git status --porcelain | grep 'out copy2'` → no output (no longer listed as untracked either)

## Test plan

No code changes; the verification commands above are the whole test. Nothing to
build.

## Done criteria

- [ ] `git status --porcelain | grep -c '^A '` → 0
- [ ] `git ls-files .claude/settings.local.json` → empty
- [ ] Both `git check-ignore` commands print a rule
- [ ] `git diff .gitignore` shows exactly two added lines, nothing removed
- [ ] No file on disk was deleted (`ls "video/out copy2" | wc -l` → 12)
- [ ] `plans/README.md` status row updated

## STOP conditions

Stop and report back (do not improvise) if:

- The drift check finds a staged count other than 12, or the settings file
  already untracked — the user acted in the meantime; report and let them decide.
- `git rm --cached` errors (e.g. the file has staged modifications).
- You find yourself about to delete anything from disk. Nothing in this plan
  deletes files.

## Maintenance notes

- The `video/out*/` rule assumes render output stays under names starting `out`.
  If the Remotion config's output dir is ever renamed, revisit the rule.
- The impeccable hook lives on in the author's untracked local file. If the team
  ever wants that hook shared, the right shape is a repo-relative script plus an
  entry in `.claude/settings.json` (the shared file), reviewable in a diff.
- Deferred, deliberately: the decision on whether `video/` sources, `.agents/`,
  and `skills-lock.json` get committed or ignored (maintainer's call; recorded
  in the plans index).
