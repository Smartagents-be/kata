---
name: repo-setup
description: Check and set up a working copy of this kata - Node and npm versions, front/node_modules, the JDK Maven actually runs on, Maven itself, the four independent step projects, and the two ports the app wants. Use on a fresh clone, when a build or dev server fails in a way that smells environmental, or whenever the user asks to set up, bootstrap, verify or doctor the repo.
---

# Setting up this repo

Run `.claude/skills/repo-setup/check.sh` from the repo root. It checks everything and installs
`front/node_modules` when that is all that is missing. Nothing else is installed for the user:
a JDK or a Maven is a machine-wide decision, so the script reports and this file tells you what
to say.

```bash
.claude/skills/repo-setup/check.sh            # check, and npm install if node_modules is missing
.claude/skills/repo-setup/check.sh --tests    # also run mvn -q test in all four step projects
.claude/skills/repo-setup/check.sh --reinstall # force a clean npm install
```

`--tests` takes minutes on a cold Maven repository, because each of the four projects resolves its
own dependencies. Run it on a fresh clone or after a toolchain change; skip it otherwise.

The script exits 0 when everything required passed, 1 when something required failed. Warnings
(the optional checks) never fail the run.

## What must hold, and what to do when it does not

- **Node 22.12+ (or 20.19+)** - Vite 8 refuses older. Say `nvm install --lts` or Homebrew, do not
  install one yourself.
- **npm** - ships with Node. Missing npm means a broken Node install, not a missing package.
- **`front/node_modules`** - the script runs `npm install` in `front/` if it is absent. There is no
  lockfile-freshness check beyond npm's own, so if the build fails on a missing module after a
  branch switch, `--reinstall`.
- **Maven 3.9+ on `PATH`** - there is no wrapper in this repo, on purpose. `brew install maven`.
- **The JDK Maven runs on is 25+** - this is the check that catches real problems, and it is not the
  same as `java -version`. All four poms set `<java.version>25</java.version>`, and Maven compiles
  with whatever `JAVA_HOME` points at, which can differ from the `java` first on `PATH`. When they
  disagree, the fix is `JAVA_HOME`, not a reinstall.
- **Four step projects present and buildable** - `kata/step0..step3/java`, each with its own
  `pom.xml`. There is no pom at the repo root and no aggregator; that is deliberate, so a missing
  root pom is never the diagnosis.

Optional, warn only:

- **GraalVM `native-image`** - needed for exactly one thing, step 2's native-image flag, and that
  flag is the student's exercise. Absent is fine for everything else.
- **Ports 8080 and 5173 free** - 8080 is whichever step's backend is running (only one at a time can
  hold it) and 5173 is Vite. A busy port is usually the user's own server from an earlier session,
  so report what is holding it rather than killing it.

## After a green run

Two servers, two terminals:

```bash
cd kata/step1/java && mvn spring-boot:run   # step 1's backend on :8080
cd front && npm run dev                     # frontend on :5173  <- open this one
```

The frontend with the backend down is a supported state, so a red backend check does not block
someone who only wants to read the curriculum.

## Where this skill stops

It verifies the environment, not the content. It never runs the opt-in profiles that are **meant to
be red** (step 2's `graded` and `challenge`, step 0's own), and a rewrite must not add them: a
student who ran the doctor and saw those fail would think their machine was broken. Plain
`mvn test` in every project is the line, and on a clean checkout it passes in all four.
