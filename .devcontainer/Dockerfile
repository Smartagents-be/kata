# Everything the kata needs to develop in, and the agents with it: GraalVM JDK 25 and Maven for the
# step projects (GraalVM because step 2 builds a native image), Node for the frontend, and Claude
# Code and Copilot CLI, so a student on either can work in here. The agent runs in here, next to the app it starts, so you and it work with the same
# machinery. Modelled on Anthropic's example dev container (github.com/anthropics/claude-code,
# .devcontainer), without its firewall (init-firewall.sh there). Without a firewall, never run the
# agent here with --dangerously-skip-permissions (Claude Code) or --allow-all / --yolo (Copilot CLI).
FROM node:22-bookworm

# Pinned so class day runs what was rehearsed. Bump on purpose, not by accident.
ARG CLAUDE_CODE_VERSION=2.1.300
ARG COPILOT_VERSION=1.0.98

# build-essential and zlib1g-dev are what native-image links against.
RUN apt-get update && apt-get install -y --no-install-recommends \
    git less procps lsof curl jq nano build-essential zlib1g-dev \
  && apt-get clean && rm -rf /var/lib/apt/lists/*

# The JDK and Maven come from their official images rather than from apt, which has neither JDK 25
# nor a Maven new enough on bookworm.
COPY --from=ghcr.io/graalvm/native-image-community:25 /usr/lib64/graalvm/graalvm-community-java25 /opt/java/graalvm
COPY --from=maven:3.9-eclipse-temurin-25 /usr/share/maven /usr/share/maven
ENV JAVA_HOME=/opt/java/graalvm
ENV MAVEN_HOME=/usr/share/maven
ENV PATH=$JAVA_HOME/bin:$MAVEN_HOME/bin:$PATH

# Every directory a volume mounts onto exists here, owned by node, so Docker creates each new
# volume with that owner. That includes front/node_modules, which is why the container needs no sudo
# at all: a sudo rule to chown it was root in all but name, since /workspace is node's to symlink.
ENV DEVCONTAINER=true
RUN mkdir -p /workspace/front/node_modules /home/node/.claude /home/node/.copilot /home/node/.m2 \
    /workspace/exercises/step0/java/target /workspace/exercises/step1/java/target \
    /workspace/exercises/step2/java/target /workspace/exercises/step3/java/target \
    /workspace/front/dist /workspace/.playwright-mcp /workspace/.shots /workspace/review \
    /usr/local/share/npm-global \
  && chown -R node:node /workspace /home/node/.claude /home/node/.copilot /home/node/.m2 \
    /usr/local/share/npm-global

USER node
ENV NPM_CONFIG_PREFIX=/usr/local/share/npm-global
ENV PATH=$PATH:/usr/local/share/npm-global/bin
RUN npm install -g @anthropic-ai/claude-code@${CLAUDE_CODE_VERSION} @github/copilot@${COPILOT_VERSION}

WORKDIR /workspace
