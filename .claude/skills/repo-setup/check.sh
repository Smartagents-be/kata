#!/usr/bin/env bash
# Check (and minimally set up) a working copy of the kata. See SKILL.md for what each check means.
set -uo pipefail

RUN_TESTS=0
REINSTALL=0
for arg in "$@"; do
  case "$arg" in
    --tests) RUN_TESTS=1 ;;
    --reinstall) REINSTALL=1 ;;
    -h|--help) sed -n '2,3p' "$0"; echo "usage: check.sh [--tests] [--reinstall]"; exit 0 ;;
    *) echo "unknown argument: $arg" >&2; exit 2 ;;
  esac
done

ROOT="$(cd "$(dirname "${BASH_SOURCE[0]}")/../../.." && pwd)"
cd "$ROOT" || exit 2

FAILED=0
WARNED=0

ok()   { printf '  ok    %s\n' "$*"; }
warn() { printf '  warn  %s\n' "$*"; WARNED=$((WARNED + 1)); }
bad()  { printf '  FAIL  %s\n' "$*"; FAILED=$((FAILED + 1)); }
head_() { printf '\n%s\n' "$*"; }

# at_least 22.12 24.16.0  ->  true when the second version is >= the first
at_least() {
  [ "$(printf '%s\n%s\n' "$1" "$2" | sort -V | head -1)" = "$1" ]
}

echo "kata-agentic-java setup check"
echo "root: $ROOT"

# ---------------------------------------------------------------- frontend
head_ "Frontend"

if command -v node >/dev/null 2>&1; then
  NODE_V="$(node -v)"; NODE_V="${NODE_V#v}"
  # Vite 8 wants 20.19+, 22.12+ or 24+.
  if at_least 22.12.0 "$NODE_V" || { at_least 20.19.0 "$NODE_V" && ! at_least 21.0.0 "$NODE_V"; }; then
    ok "node $NODE_V"
  else
    bad "node $NODE_V is too old for Vite 8 (needs 22.12+, or 20.19+ on the 20 line)"
  fi
else
  bad "node not found on PATH"
fi

if command -v npm >/dev/null 2>&1; then
  ok "npm $(npm -v)"
else
  bad "npm not found on PATH (a Node install without npm is broken)"
fi

if [ "$REINSTALL" = 1 ]; then
  echo "  ..    removing front/node_modules and reinstalling"
  rm -rf front/node_modules
fi

if [ -d front/node_modules ]; then
  ok "front/node_modules present"
elif command -v npm >/dev/null 2>&1; then
  echo "  ..    front/node_modules missing, running npm install"
  if (cd front && npm install); then
    ok "npm install completed"
  else
    bad "npm install failed in front/"
  fi
else
  bad "front/node_modules missing and npm is unavailable to install it"
fi

# ---------------------------------------------------------------- java
head_ "Java toolchain"

if command -v mvn >/dev/null 2>&1; then
  MVN_OUT="$(mvn -v 2>&1)"
  MVN_V="$(printf '%s' "$MVN_OUT" | sed -n 's/^Apache Maven \([0-9][0-9.]*\).*/\1/p' | head -1)"
  if [ -n "$MVN_V" ] && at_least 3.9.0 "$MVN_V"; then
    ok "maven $MVN_V"
  else
    bad "maven ${MVN_V:-unknown} is older than 3.9 (there is no wrapper in this repo)"
  fi

  # The JDK Maven compiles with, which is not necessarily the `java` first on PATH.
  MVN_JDK="$(printf '%s' "$MVN_OUT" | sed -n 's/^Java version: \([0-9][0-9.]*\).*/\1/p' | head -1)"
  if [ -n "$MVN_JDK" ] && at_least 25 "$MVN_JDK"; then
    ok "maven runs on JDK $MVN_JDK (poms need 25)"
  else
    bad "maven runs on JDK ${MVN_JDK:-unknown}; every pom sets <java.version>25</java.version> - point JAVA_HOME at a 25+ JDK"
  fi
else
  bad "mvn not found on PATH"
  MVN_JDK=""
fi

if command -v java >/dev/null 2>&1; then
  JAVA_V="$(java -version 2>&1 | sed -n 's/^[a-zA-Z()]* version "\([0-9][0-9.]*\)".*/\1/p' | head -1)"
  if [ -n "$MVN_JDK" ] && [ -n "$JAVA_V" ] && [ "$JAVA_V" != "$MVN_JDK" ]; then
    warn "java on PATH is $JAVA_V but maven runs on $MVN_JDK (JAVA_HOME=${JAVA_HOME:-unset}); maven's is the one that compiles"
  else
    ok "java ${JAVA_V:-unknown} on PATH"
  fi
else
  warn "java not found on PATH (only matters for running things outside maven)"
fi

if command -v native-image >/dev/null 2>&1; then
  ok "native-image present (step 2's native flag can be built)"
else
  warn "native-image not found - only needed for step 2's native-image flag, which is the student's exercise"
fi

# ---------------------------------------------------------------- projects
head_ "Step projects"

STEPS="step0 step1 step2 step3"
for s in $STEPS; do
  if [ -f "kata/$s/java/pom.xml" ]; then
    ok "kata/$s/java"
  else
    bad "kata/$s/java/pom.xml missing"
  fi
done
[ -f pom.xml ] && warn "a pom.xml appeared at the repo root; this repo has no aggregator on purpose"

if [ "$RUN_TESTS" = 1 ] && command -v mvn >/dev/null 2>&1; then
  head_ "Builds (mvn -q test, default profiles only)"
  for s in $STEPS; do
    [ -f "kata/$s/java/pom.xml" ] || continue
    if (cd "kata/$s/java" && mvn -q test) >/dev/null 2>&1; then
      ok "$s green"
    else
      bad "$s failed - rerun with output: (cd kata/$s/java && mvn test)"
    fi
  done
  if [ -d front/node_modules ]; then
    if (cd front && npm run build) >/dev/null 2>&1; then
      ok "front builds (tsc -b + vite build)"
    else
      bad "front build failed - rerun with output: (cd front && npm run build)"
    fi
  fi
fi

# ---------------------------------------------------------------- ports
head_ "Ports"

port_holder() { lsof -nP -iTCP:"$1" -sTCP:LISTEN -F c 2>/dev/null | sed -n 's/^c//p' | sort -u | paste -sd, -; }

if command -v lsof >/dev/null 2>&1; then
  for p in 8080 5173; do
    holder="$(port_holder "$p")"
    if [ -n "$holder" ]; then
      warn "port $p is held by $holder (probably your own server from earlier)"
    else
      ok "port $p free"
    fi
  done
else
  warn "lsof unavailable, skipped the port checks"
fi

# ---------------------------------------------------------------- verdict
head_ "Result"
if [ "$FAILED" -gt 0 ]; then
  echo "  $FAILED check(s) failed, $WARNED warning(s). See SKILL.md for what each one means."
  exit 1
fi
echo "  all required checks passed, $WARNED warning(s)."
if [ "$RUN_TESTS" = 0 ]; then
  echo "  (builds not run; add --tests to compile all four steps and the frontend)"
fi
cat <<'EOF'

  Two servers, two terminals:
    cd kata/step1/java && mvn spring-boot:run   # backend on :8080
    cd front && npm run dev                     # frontend on :5173  <- open this one
EOF
