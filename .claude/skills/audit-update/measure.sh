#!/usr/bin/env bash
# Re-measure the facts audit.md records, and diff them against what audit.md says.
#
# Everything printed here is measured off the working tree. Nothing is carried forward from the
# file, which is the whole point: audit.md's numbers are only trustworthy if they can be
# reproduced. The word count reproduces the "Basis of the word counts" paragraph exactly
# (verified against all 20 units at 377c67d), so a MISMATCH is real drift, not method noise.
#
# Usage: .claude/skills/audit-update/measure.sh [--range]
#        --range   also print the commits and changed files since audit.md's recorded anchor

set -uo pipefail

root=$(git -C "$(dirname "$0")" rev-parse --show-toplevel)
cd "$root" || exit 1
audit=audit.md
steps=front/src/steps

[ -f "$audit" ] || { echo "no $audit at repo root"; exit 1; }

# --- the anchor audit.md was last measured against -------------------------------------------
anchor=$(grep -m1 '^\*\*Measured:\*\*' "$audit" | grep -o '`[0-9a-f]\{7,40\}`' | head -1 | tr -d '`')
measured_date=$(grep -m1 '^\*\*Measured:\*\*' "$audit" | sed 's/^\*\*Measured:\*\* //; s/,.*//')

echo "=============================================================="
echo " AUDIT ANCHOR"
echo "=============================================================="
if [ -z "$anchor" ]; then
  echo "  could not parse a commit out of the **Measured:** line. Read it by hand."
else
  echo "  audit.md says:  $anchor   (measured $measured_date)"
  echo "  HEAD is:        $(git rev-parse --short HEAD)  $(git log -1 --format=%s)"
  if git merge-base --is-ancestor "$anchor" HEAD 2>/dev/null; then
    n=$(git rev-list --count "$anchor"..HEAD)
    echo "  unmeasured commits: $n"
  else
    echo "  !! $anchor is not an ancestor of HEAD (rebased or amended). Range is unreliable."
  fi
fi
dirty=$(git status --porcelain | wc -l | tr -d ' ')
[ "$dirty" != "0" ] && echo "  note: $dirty uncommitted path(s); measurements below include them."

# --- word / figure counts, per unit ----------------------------------------------------------
# Strip HTML comments first, then tags, then entities; count whitespace-separated tokens holding
# a letter. Comments must go first or a commented-out marker is counted (context.html has one).
measure_unit() {
  perl -0777 -ne '
    s/<!--.*?-->//gs;
    $body = $_;
    $fig  = () = $body =~ /data-figure/g;
    $self = () = $body =~ /data-audience="self"/g;
    $body =~ s/<[^>]*>/ /gs;
    $body =~ s/&[a-zA-Z]+;/ /g;
    $body =~ s/&#\d+;/ /g;
    @w = grep { /[a-zA-Z]/ } split /\s+/, $body;
    print scalar(@w), " ", $fig, " ", $self, "\n";
  ' "$1"
}

# what audit.md records for a unit: "| 7 | step1 / `session` | 821 | 2 |" -> words, figs
recorded() { # $1=step $2=unit
  grep -m1 "| $1 / \`$2\` |" "$audit" \
    | awk -F'|' '{gsub(/ /,"",$4); gsub(/ /,"",$5); print $4, $5}'
}

echo
echo "=============================================================="
echo " PER-UNIT MEASUREMENTS vs audit.md Table 2"
echo "=============================================================="
printf "  %-22s %-18s %-18s %s\n" "unit" "words (rec/meas)" "figs (rec/meas)" "self-only blocks"

drift=0
for idx in "$steps"/step*/index.tsx; do
  step=$(basename "$(dirname "$idx")")
  total=0; count=0
  # units in registry order, which is course order and Table 2's row order
  for unit in $(perl -0777 -ne 'while(/^\s{6}id: '\''([a-z0-9-]+)'\''/gm){print "$1\n"}' "$idx"); do
    f="$steps/$step/units/$unit.html"
    [ -f "$f" ] || { printf "  %-22s NO HTML FILE (registry lists it)\n" "$step/$unit"; continue; }
    read -r w fig self <<<"$(measure_unit "$f")"
    read -r rw rfig <<<"$(recorded "$step" "$unit")"
    total=$((total + w)); count=$((count + 1))
    flag=""
    if [ -z "${rw:-}" ]; then
      flag="  <-- NOT IN audit.md Table 2 (new unit)"; drift=$((drift+1))
      rw="-"; rfig="-"
    else
      # audit writes things like "1+card" in the Fig column; compare only the leading integer
      rfign=$(printf '%s' "$rfig" | grep -o '^[0-9]*'); rfign=${rfign:-x}
      [ "$rw" != "$w" ] && { flag="  <-- WORDS MOVED"; drift=$((drift+1)); }
      [ "$rfign" != "$fig" ] && { flag="$flag  <-- FIGS MOVED"; drift=$((drift+1)); }
    fi
    printf "  %-22s %-18s %-18s %-3s%s\n" "$step/$unit" "$rw / $w" "$rfig / $fig" "$self" "$flag"
  done
  echo "  $(printf '%-22s' "  ^ $step total:") $count units, $total words"
  # what the Table 1 heading for this step claims
  hdr=$(grep -m1 "^### Table 1.*$(echo $step | sed 's/step/Step /')," "$audit")
  [ -n "$hdr" ] && echo "  $(printf '%-22s' '  ^ audit heading:') $(echo "$hdr" | grep -o '([0-9]* units, [0-9,]* words)')"
  echo
done

# a unit in Table 2 that no longer exists in any registry
echo "  --- rows in Table 2 with no unit behind them ---"
grep -o '| step[0-9] / `[a-z0-9-]*` |' "$audit" | tr -d '|`' | while read -r step _ unit; do
  [ -f "$steps/$step/units/$unit.html" ] || echo "  $step/$unit  <-- DELETED, row is stale"
done

# --- quizzes ---------------------------------------------------------------------------------
echo
echo "=============================================================="
echo " QUIZZES"
echo "=============================================================="
for idx in "$steps"/step*/index.tsx; do
  step=$(basename "$(dirname "$idx")")
  q="$steps/$step/quiz.ts"
  if [ -f "$q" ]; then
    echo "  $step: quiz.ts present, $(grep -c '^\s*question:' "$q") questions, wired to: $(grep -o 'quiz: [A-Za-z]*' "$idx" | sed 's/quiz: //' | paste -sd, -)"
  else
    echo "  $step: NO quiz.ts"
  fi
done

# --- the range ------------------------------------------------------------------------------
if [ "${1:-}" = "--range" ] && [ -n "$anchor" ]; then
  echo
  echo "=============================================================="
  echo " COMMITS SINCE $anchor"
  echo "=============================================================="
  git log --oneline --no-decorate "$anchor"..HEAD 2>/dev/null | sed 's/^/  /'
  echo
  echo "  --- files changed in that range (audit-relevant paths first) ---"
  git diff --stat "$anchor"..HEAD 2>/dev/null | sed 's/^/  /'
fi

echo
if [ "$drift" = "0" ]; then
  echo "  No numeric drift found in Table 2. Rows may still need prose changes."
else
  echo "  $drift numeric drift(s) flagged above."
fi
