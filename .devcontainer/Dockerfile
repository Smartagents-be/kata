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
    git less procps lsof sudo curl jq nano build-essential zlib1g-dev \
  && apt-get clean && rm -rf /var/lib/apt/lists/*

# The JDK and Maven come from their official images rather than from apt, which has neither JDK 25
# nor a Maven new enough on bookworm.
COPY --from=ghcr.io/graalvm/native-image-community:25 /usr/lib64/graalvm/graalvm-community-java25 /opt/java/graalvm
COPY --from=maven:3.9-eclipse-temurin-25 /usr/share/maven /usr/share/maven
ENV JAVA_HOME=/opt/java/graalvm
ENV MAVEN_HOME=/usr/share/maven
ENV PATH=$JAVA_HOME/bin:$MAVEN_HOME/bin:$PATH

# The node_modules volume is created root-owned, so postCreateCommand needs sudo for exactly one
# chown. The rule allows that command with those arguments and nothing else: an unrestricted chown
# would be root in all but name.
ENV DEVCONTAINER=true
RUN mkdir -p /workspace /home/node/.claude /home/node/.copilot /home/node/.m2 /usr/local/share/npm-global \
  && chown -R node:node /workspace /home/node/.claude /home/node/.copilot /home/node/.m2 /usr/local/share/npm-global \
  && printf '%s\n' 'node ALL=(root) NOPASSWD: /usr/bin/chown node\:node /workspace/front/node_modules' \
       > /etc/sudoers.d/node-node-modules \
  && chmod 0440 /etc/sudoers.d/node-node-modules

USER node
ENV NPM_CONFIG_PREFIX=/usr/local/share/npm-global
ENV PATH=$PATH:/usr/local/share/npm-global/bin
RUN npm install -g @anthropic-ai/claude-code@${CLAUDE_CODE_VERSION} @github/copilot@${COPILOT_VERSION}

WORKDIR /workspace
