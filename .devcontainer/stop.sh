#!/usr/bin/env bash
# Stops the kata's dev container, then runs review.sh, so every session ends on the check. The
# devcontainer CLI has no stop command, so this stops the container the CLI labelled with this
# folder (devcontainer.local_folder).
set -euo pipefail

ROOT="$(cd "$(dirname "${BASH_SOURCE[0]}")/.." && pwd)"

# The label holds the path the CLI was given, which may or may not have its symlinks resolved.
ids="$(
  for folder in "$ROOT" "$(cd "$ROOT" && pwd -P)"; do
    docker ps -q --filter "label=devcontainer.local_folder=$folder"
  done | sort -u
)"
if [ -n "$ids" ]; then
  # shellcheck disable=SC2086 # one id per line, split on purpose
  docker stop $ids >/dev/null
  echo "stopped the dev container"
else
  echo "no dev container running for $ROOT"
fi

exec "$ROOT/.devcontainer/review.sh"
