#!/usr/bin/env bash
#
# Post-merge notices — specs/018-message-and-merge-gates.
#
# Pulling main can bring a new migration, a changed lockfile, or changed hooks.
# Nothing said so, and the next local run happened against a stale database or
# stale dependencies. package-lock drift has already cost a CI build here.
#
# This NEVER blocks. A post-merge hook cannot fail a merge — the merge already
# happened — so pretending otherwise would be a lie. Its only power is to tell
# you something, which means it must stay silent when there is nothing to say:
# noise after every merge trains people to ignore it.
set -uo pipefail

cd "${HYGIENE_REPO:-$(git rev-parse --show-toplevel)}" || exit 0

# The hook passes the merge range; tests pass an explicit list.
if [ -n "${MERGE_CHANGED:-}" ]; then
  CHANGED="$MERGE_CHANGED"
else
  CHANGED="$(git diff-tree -r --name-only --no-commit-id ORIG_HEAD HEAD 2>/dev/null || true)"
fi
[ -z "$CHANGED" ] && exit 0

say() { printf '  %s\n' "$1"; }
HEADER=0
header() {
  [ "$HEADER" -eq 1 ] && return
  printf '\nthat merge changed things underneath you:\n'
  HEADER=1
}

if grep -qE '(^|/)migrations/.*\.sql$' <<< "$CHANGED"; then
  header
  say "new migrations — apply them before running against your local database:"
  say "    gcloud run jobs execute resumefit-maintenance --args=migrate --region us-central1"
  say "    (or psql -f against your test database)"
fi

if grep -qE '(package-lock\.json|package\.json)$' <<< "$CHANGED"; then
  header
  say "client dependencies changed — npm ci"
fi

if grep -qE '(requirements\.txt|pyproject\.toml|poetry\.lock)$' <<< "$CHANGED"; then
  header
  say "python dependencies changed — pip install -r server/requirements.txt"
fi

if grep -qE '^\.githooks/|^scripts/(check-|preflight|install-hooks)' <<< "$CHANGED"; then
  header
  say "the gates changed — re-run scripts/install-hooks.sh"
fi

# The constitution itself lives outside this repo (see CLAUDE.md); what the
# repo carries is the list of rule IDs it cites. This watched
# .specify/memory/constitution.md, a spec-kit path that has never existed
# here, so it could never fire (CON-VER-005).
if grep -qE '^docs/constitution-ids\.txt$' <<< "$CHANGED"; then
  header
  say "the constitution's rule list changed — skim it before your next PR"
fi

exit 0
