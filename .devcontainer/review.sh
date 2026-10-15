#!/usr/bin/env bash
# Lists what the dev container could have left in the repo that git does not show you, and fails if
# it finds any. Run it on your laptop before you build or start an agent there. It also runs by itself:
# devcontainer.json calls it before every `up` (initializeCommand), and stop.sh calls it after
# stopping. It lives in .devcontainer/, which is read-only inside the container, so the agent cannot
# change the check.
#
# What it looks for: git-ignored files outside the folders the kata expects to be ignored (a
# planted .class in src/main/resources, an out/ folder of sources, a node_modules that shadows a real
# package, a .gitignore that hides itself), and git repositories nested inside this one. New files
# that git does show are left to your diff.
set -euo pipefail

ROOT="$(cd "$(dirname "${BASH_SOURCE[0]}")/.." && pwd)"
cd "$ROOT"

# Ignored on purpose, and either out of the container's reach or never run on your laptop.
expected() {
  case "$1" in
    exercises/step[0-9]/java/target/) return 0 ;;     # a container-only volume in there
    front/node_modules/) return 0 ;;                  # a container-only volume in there
    front/dist/) return 0 ;;                          # build output, served, never executed here
    .idea/*) return 0 ;;                              # read-only in the container
    .claude/settings.local.json) return 0 ;;          # read-only in the container
    .DS_Store | */.DS_Store) return 0 ;;              # macOS folder metadata
    .playwright-mcp/ | .shots/ | review/) return 0 ;; # maintainer scratch, never built or run
    .impeccable/hook.cache.json | .impeccable/config.local.json | .impeccable/live/sessions/) return 0 ;;
    *) return 1 ;;
  esac
}

found=()
while IFS= read -r path; do
  expected "$path" || found+=("ignored: $path")
done < <(git ls-files --others --ignored --exclude-standard --directory)

while IFS= read -r path; do
  found+=("nested git repository: ${path#./}")
done < <(find . \( -path ./.git -o -name node_modules -o -name target \) -prune -o -name .git -print)

if [ ${#found[@]} -eq 0 ]; then
  echo "review: nothing hidden from git"
  exit 0
fi

echo "review: the repo holds files git does not show you. Check each one before you build or start"
echo "an agent on your laptop, and delete what you did not put there yourself:"
printf '  %s\n' "${found[@]}"
exit 1
