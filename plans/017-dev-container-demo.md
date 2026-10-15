# Plan 017: A dev container for the kata, demoed at the foot of `Prove your work`

> **Executor instructions**: one new folder at the repo root (`.devcontainer/`), one task card
> swapped in step 2's `enablement` unit (titled `Prove your work`, URL `/steps/step2/proof`), and
> the notes that name them. Read `front/src/steps/step2/CLAUDE.md` (the `enablement` and `proof`
> parts), `front/CLAUDE.md` (naming, audience, assistant rules) and the `lesson-writing` skill
> before touching a file. Work the phases in order. **Phase 1 must be proven working on Docker
> before Phase 2 starts**; on any STOP condition, stop and report.
>
> **Drift check (run first)**: `git status --short && git log --oneline -5`. The DHH statement
> slide (`deck-step2-enablement-dead`) and the new opening of `where-day-goes.1` may still be
> uncommitted. That is expected; leave them alone and commit them separately or with this, as the
> owner prefers.

## Status

- **Priority**: P1 (course owner's request, 2026-10-15)
- **Effort**: M
- **Risk**: LOW-MED. Nothing graded reads the new files, but a bind-mounted `front/node_modules`
  can break the host's frontend if Phase 1 gets the volume wrong.
- **Depends on**: none
- **Planned at**: commit `b4a0b16` plus the uncommitted DHH slide, 2026-10-15; reviewed against
  the Claude Code dev container docs the same day

## Why

`enablement.run-own-machine.3` now says: "Put all of it in a development container, and you and the
agent work with the same machinery." Nothing in the repo shows one. The unit's closing card,
`CountTheDay`, asks the student to time their own day-to-day work, which cannot be done in class,
and the owner does not want students working on their own code. The owner wants instead a **demo
of a Docker container that holds everything needed to develop the kata, with the agent running
inside it**. The demo is done with **Claude Code** only.

## Decisions already made (do not reopen)

- The agent runs **inside** the container, next to the JDK, Maven, Node and the running app. The IDE
  only connects to it.
- Claude Code only for the demo. No Copilot variant of the card, no `data-assistant` pair. The card
  renders for Copilot students too, so its description says in 1 sentence that the container is the
  same whichever agent runs in it.
- The files follow Anthropic's reference dev container (`github.com/anthropics/claude-code`,
  `.devcontainer/`), which the docs present as "a working example rather than a maintained base
  image". Cite it as an example, not as a base. The docs' primary install route is the Dev Container
  Feature; this plan installs from the Dockerfile instead because that is the route the docs give
  for pinning a version.
- **Leave the firewall out.** The docs allow it: the firewall script and `NET_ADMIN`/`NET_RAW` "are
  not required for Claude Code itself". Its allowlist would also have to include Maven Central and
  npm for this repo. Say in a comment that it is left out and where it lives.
- **Never run the agent with `--dangerously-skip-permissions` or in bypass mode in this container**,
  in the demo or on the card. The docs pair that flag with egress restrictions, and this container
  has none.
- **What not to claim.** Anthropic's warning, in its own terms: with `--dangerously-skip-permissions`
  a dev container does not stop a malicious project from exfiltrating anything reachable inside it,
  including the Claude Code credentials in `~/.claude`; use dev containers only with trusted
  repositories, and monitor what the agent does. On top of that, VS Code's Dev Containers extension
  forwards the host's git credentials and SSH agent into the container by default. So nothing in the
  card, the notes or the Dockerfile comment calls the container isolated, sealed or safe. The claim
  is "the same machinery", nothing more.
- No host secrets are mounted (`~/.ssh`, cloud credential files), per the docs.
- The card is a demo the tutor does on the projector. Students may repeat it if they have Docker.
- `CountTheDay` goes. Its `fit` move (compare with the 10 in `LoopsPerHour`) goes with it.

## Phase 1: `.devcontainer/` at the repo root

### Files

`.devcontainer/Dockerfile` (draft, verified only as far as noted below):

```dockerfile
# Everything the kata needs to develop in, and the agent with it: GraalVM JDK 25 and Maven for the
# step projects (GraalVM because step 2 builds a native image), Node for the frontend, and Claude
# Code. The agent runs in here, next to the app it starts, so you and it work with the same
# machinery. Modelled on Anthropic's example dev container (github.com/anthropics/claude-code,
# .devcontainer), without its firewall (init-firewall.sh there). Without a firewall, never run the
# agent here with --dangerously-skip-permissions.
FROM node:22-bookworm

# Pinned so the demo on class day is the one that was rehearsed. Bump on purpose, not by accident.
ARG CLAUDE_CODE_VERSION=X.Y.Z

# build-essential and zlib1g-dev are what native-image links against.
RUN apt-get update && apt-get install -y --no-install-recommends \
    git less procps sudo curl jq nano build-essential zlib1g-dev \
  && apt-get clean && rm -rf /var/lib/apt/lists/*

# The JDK and Maven come from their official images rather than from apt, which has neither JDK 25
# nor a Maven new enough on bookworm.
COPY --from=ghcr.io/graalvm/native-image-community:25 <GRAALVM_HOME> /opt/java/graalvm
COPY --from=maven:3.9-eclipse-temurin-25 /usr/share/maven /usr/share/maven
ENV JAVA_HOME=/opt/java/graalvm
ENV MAVEN_HOME=/usr/share/maven
ENV PATH=$JAVA_HOME/bin:$MAVEN_HOME/bin:$PATH

ENV DEVCONTAINER=true
RUN mkdir -p /workspace /home/node/.claude /home/node/.m2 /usr/local/share/npm-global \
  && chown -R node:node /workspace /home/node/.claude /home/node/.m2 /usr/local/share/npm-global \
  && printf '%s\n' 'node ALL=(root) NOPASSWD: /usr/bin/chown node\:node /workspace/front/node_modules' \
       > /etc/sudoers.d/node-node-modules \
  && chmod 0440 /etc/sudoers.d/node-node-modules

USER node
ENV NPM_CONFIG_PREFIX=/usr/local/share/npm-global
ENV PATH=$PATH:/usr/local/share/npm-global/bin
RUN npm install -g @anthropic-ai/claude-code@${CLAUDE_CODE_VERSION}

WORKDIR /workspace
```

Two placeholders to resolve while building:

- `X.Y.Z`: the current release at execution time (`npm view @anthropic-ai/claude-code version`).
  Set the same value in `devcontainer.json`'s build args.
- `<GRAALVM_HOME>`: read it off the image
  (`docker run --rm ghcr.io/graalvm/native-image-community:25 sh -c 'echo $JAVA_HOME'`). If that
  image tag does not exist or does not carry JDK 25, find the GraalVM Community JDK 25 image that
  does, and record which one in the report.

`.devcontainer/devcontainer.json`:

```jsonc
{
  "name": "kata",
  "build": {
    "dockerfile": "Dockerfile",
    "args": { "CLAUDE_CODE_VERSION": "X.Y.Z" }
  },
  "remoteUser": "node",
  "workspaceMount": "source=${localWorkspaceFolder},target=/workspace,type=bind",
  "workspaceFolder": "/workspace",
  "mounts": [
    // The agent's login and settings survive a rebuild.
    "source=kata-claude-config-${devcontainerId},target=/home/node/.claude,type=volume",
    // Maven's downloads survive a rebuild too, so the first `mvn verify` is the only slow one.
    "source=kata-m2-${devcontainerId},target=/home/node/.m2,type=volume",
    // The container's node_modules hold Linux binaries; a volume keeps them off the host's copy.
    "source=kata-node-modules-${devcontainerId},target=/workspace/front/node_modules,type=volume"
  ],
  "containerEnv": {
    "CLAUDE_CONFIG_DIR": "/home/node/.claude",
    // The version that was rehearsed is the version that runs in class.
    "DISABLE_AUTOUPDATER": "1"
  },
  // 5173 the frontend, 8080 step 1's service, 8082 step 2's.
  "forwardPorts": [5173, 8080, 8082],
  "postCreateCommand": "sudo /usr/bin/chown node:node /workspace/front/node_modules && npm ci --prefix front"
}
```

Things to settle while building, not decided yet:

- The sudoers line only exists so `postCreateCommand` can take ownership of the fresh
  `node_modules` volume (Docker creates it root-owned). It is limited to that one exact command on
  purpose: an unrestricted `chown` is root in all but name. Confirm `sudo chown root /etc/passwd`
  is refused inside the container. If a way without sudo works, use it and drop sudo and the
  `sudo` package entirely.
- Vite inside a container may need `--host` for the forwarded port to reach it. Check
  `front/vite.config.ts` before changing anything; if a change is needed, prefer a CLI flag in the
  demo command over editing the config.
- Native image builds want several GB of memory. If the build is killed, check Docker Desktop's
  memory limit before anything else, and record the minimum that worked.

### Verify (all must pass before Phase 2)

Docker 29 is installed on the owner's machine; the `devcontainer` CLI is not. Either install it in
the scratchpad (`npm i @devcontainers/cli`) or use plain `docker build` / `docker run` with the same
mounts.

1. The image builds from a clean cache. Record how long it took; that number goes in the step 2
   notes as the reason the tutor builds before class.
2. Inside the container: `java -version` says GraalVM 25, `mvn -v` says 3.9 and runs on that JDK,
   `native-image --version` prints a version, `node -v` is 22.12 or newer, `claude --version`
   prints the pinned version.
3. `for s in step0 step1 step2 step3; do (cd exercises/$s/java && mvn -q verify) || echo "$s FAILED"; done`
   is green inside the container.
4. `cd exercises/step2/java && mvn -Pnative native:compile` succeeds inside the container (the route
   `exercises/step2/java/CLAUDE.md` documents; do not add a profile or a hint, and do not run the
   binary or print what it prints).
5. `cd exercises/step2/java && mvn spring-boot:run` in the container, then
   `curl -s localhost:8082/api/loans/statement/STUDENT` from the host returns JSON (port forwarding
   works). Same for step 1 on 8080 and the frontend on 5173 with the step 1 service running.
6. **The host's frontend still works afterwards**: on the host, `cd front && npm run build` passes.
   If it fails with a native-binary error, the `node_modules` volume did not keep the container's
   install off the host. STOP and fix before going on.
7. `.claude/skills/repo-setup/check.sh` passes inside the container.
8. The narrowed sudo holds: `sudo chown root /etc/passwd` is refused.

Logging the agent in cannot be automated (it needs the owner's account). Leave `claude` itself
unrun and say so in the report.

**STOP** if JDK 25 or Maven 3.9 on JDK 25 cannot be had from those images. **If check 4 fails** and
a fix is not small, fall back to `eclipse-temurin:25-jdk` (`COPY --from=eclipse-temurin:25-jdk
/opt/java/openjdk /opt/java/openjdk`, drop `build-essential zlib1g-dev`) and narrow every claim
instead: the Dockerfile comment, the card and the notes then say the container holds everything
except step 2's native image. Report which way it went.

## Phase 2: swap the card

The unit is `front/src/steps/step2/units/enablement.html`; its card sits under the `<hr>` and the
`ui:quiz.title` heading at the bottom and is registered as `figure: <CountTheDay />` in
`front/src/steps/step2/index.tsx`.

1. New `front/src/steps/step2/SameMachinery.tsx`, a `TaskCard` on `CountTheDay`'s shape:
   `block="same-machinery"`, `namespace="step2"`, `prefix="machinery"`,
   `storageKey="kata.step2.machinery"` (the reset clears it by its `kata.step2.` prefix). Its doc
   comment says it is a tutor demo with Claude Code only and why (the owner's choice; no Copilot
   variant), that it replaced `CountTheDay`, and that the tutor builds the container and logs in
   before class.
2. Moves, 4, each 1 clause plus a copyable command where there is one. Wording below is a draft;
   apply the `lesson-writing` rules and keep numbers as digits:
   - `open`: Open the kata in its dev container: in VS Code with the Dev Containers extension,
     **Dev Containers: Reopen in Container**. Name VS Code only. Add the IntelliJ route (open
     `.devcontainer/devcontainer.json`, gutter action) **only if** it was rehearsed end to end
     against the JetBrains docs linked below; do not claim which IntelliJ editions support it.
   - `agent`: In the container's terminal, run `claude`. Students repeating it log in once; the
     login survives a rebuild. (The tutor is already logged in: the login shows an account on the
     projector and the browser callback sometimes needs the "paste code" fallback.)
   - `run`: Ask it: "Start step 2's service and show me the statement for STUDENT." It runs
     `mvn spring-boot:run` and `curl` in the same container.
   - `same`: In a second terminal, run `mvn verify` in `exercises/step2/java` yourself: the same JDK,
     the same Maven, the same output the agent saw.
3. Title and description: title "Develop in a dev container" / "Ontwikkel in een dev container".
   The description says it is a demo the tutor does, that students can repeat it with Docker, that
   nothing is graded, and in 1 sentence that the container is the same whichever agent runs in it.
   No word in it says isolated, sealed or safe (see Decisions). Do not say "development container"
   and "dev container" interchangeably in one string; the prose uses "development container", the
   card may use "dev container" as the tool's name.
4. Register it in `index.tsx` in place of `CountTheDay`, and update the comment above `figure:`.
   Update the HTML comment above the `<hr>` in `enablement.html` (it names `CountTheDay`).
5. Delete `CountTheDay.tsx` and every `count.*` key in `locales/en.json` and `locales/nl.json`
   (`count.title`, `count.description`, `count.todo`, `count.done`, `count.time.label`,
   `count.fit.label`, `count.tally.label`, `count.cut.label`). Add `machinery.*` in both.
   **Do not touch** `look-at-afternoon.count.*` or `Debrief`'s `count` move: they are other cards.
   `Debrief.tsx:16` and `GateWalk.tsx:7` mention `CountTheDay` or `enablement`'s counting in
   comments; reword the comment, not the card.
6. Dutch is Flemish (see root `CLAUDE.md`): no "klus", no "briefing", "de agent" with "hij".
   Proofread every new `nl.json` string before reporting.

## Phase 3: notes

- `front/src/steps/step2/CLAUDE.md`: every `CountTheDay` mention (lines near 281, 981, 1310 at plan
  time) becomes `SameMachinery`, and the `enablement` part records:
  - the demo is Claude Code only at the owner's asking;
  - the firewall is left out on purpose, so bypass mode is never used in it;
  - the card claims "the same machinery" and never isolation, and why (Anthropic's warning; VS Code
    forwards git credentials and the SSH agent);
  - the tutor builds the container and logs in before class, with the build time measured in
    Phase 1, and the Claude Code version is pinned with auto-update off so class day matches the
    rehearsal;
  - why the card replaced `CountTheDay` (cannot be done in class; no work on students' own code).
- Root `CLAUDE.md`, `## Layout`: add `.devcontainer/` to the tree with 1 line (the kata's dev
  container: GraalVM JDK 25, Maven, Node, a pinned Claude Code; used by step 2's `Prove your work`
  demo). If Phase 1 fell back to Temurin, say Temurin and that it cannot build step 2's native image.
- `.claude/skills/repo-setup/`: do not add a container check. Mention the container in its README
  or SKILL.md only if there is a natural place; otherwise leave it.
- `audit.md`: do not edit. That is the `audit-update` skill's job.

## Rehearsal (owner, after the executor is done)

Not something the executor can do, but it is what makes the card a demo rather than a hope:

- Build the container and log in on the machine and network used in class, the day before.
- Run the 4 moves once. In `run`, check the agent starts `mvn spring-boot:run` in the background
  rather than blocking on it; if it blocks, add "in the background" to the prompt on the card.
- Have a fallback ready if the venue's network fails: the container already built, the Maven and
  `node_modules` volumes already filled.

## Done when

- Every Phase 1 check passed, with the output in the report, including the build time and which
  JDK image was used.
- `cd front && npm run build && npm run lint` pass on the host.
- `for s in step0 step1 step2 step3; do (cd exercises/$s/java && mvn -q verify) || echo "$s FAILED"; done`
  is green on the host.
- `grep -rn "CountTheDay\|\"count\.\(title\|description\|todo\|done\|time\|fit\|tally\|cut\)" front/src`
  returns nothing.
- `grep -n '—\|–' front/src/steps/step2/locales/*.json front/src/steps/step2/units/enablement.html`
  returns nothing.
- `grep -rni "isolat\|sandbox\|geïsoleerd\|veilig" front/src/steps/step2/locales/*.json | grep -i machinery`
  returns nothing.
- `grep -rn "dangerously-skip-permissions" .devcontainer front/src` finds only the Dockerfile's
  warning comment.
- Report the IntelliJ route as verified or not, separately.

## Sources

- Claude Code docs, Development containers: https://code.claude.com/docs/en/devcontainer
  (the warning, the firewall being optional, `CLAUDE_CONFIG_DIR`, pinning with
  `DISABLE_AUTOUPDATER`, the reference being an example rather than a base image)
- Example files: https://github.com/anthropics/claude-code/tree/main/.devcontainer
- IntelliJ IDEA 2026.2, Dev Containers: https://www.jetbrains.com/help/idea/getting-started-with-dev-containers.html
  and https://www.jetbrains.com/help/idea/start-dev-container-inside-ide.html
