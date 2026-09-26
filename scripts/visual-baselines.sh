#!/usr/bin/env bash
#
# Regenerate the committed pixel baselines.
#
# They must be made inside the Playwright container, because text renders
# differently between machines and the CI job compares against these exact
# images (SPEC-0003 R5). Run this, look at the diff, and commit it — never
# regenerate baselines to make a failing test pass without looking at what moved.
#
#   scripts/visual-baselines.sh            # regenerate
#   scripts/visual-baselines.sh --check    # compare only, change nothing
#
# `--user` matters: without it the container runs as root and leaves
# root-owned files in test-results/ and the snapshots directory, which then
# fail every later local run with EACCES.
set -euo pipefail

cd "$(dirname "$0")/.."

IMAGE="mcr.microsoft.com/playwright:v$(node -p "require('@playwright/test/package.json').version")-noble"
PORT=4321
BASE_PATH=/portfolio
MODE="${1:-}"

echo "Image: $IMAGE"

echo "Building and staging the site the way Playwright's webServer does…"
BASE_PATH="$BASE_PATH" npm run build
rm -rf .pw-site
mkdir -p ".pw-site${BASE_PATH}"
cp -r out/. ".pw-site${BASE_PATH}/"
cp out/404.html .pw-site/404.html

# `setsid` puts the server in its own process group so the trap can kill the
# group, not just the `npx` wrapper. Killing only $! left the real `serve`
# child alive on the port three runs in a row; Playwright then reused it
# (reuseExistingServer off CI) and tested a stale build.
setsid npx serve .pw-site -l "$PORT" --no-clipboard >/dev/null 2>&1 &
SERVER=$!
cleanup() {
  kill -- "-$SERVER" 2>/dev/null || kill "$SERVER" 2>/dev/null || true
  # Belt and braces: anything still bound to the port is ours.
  for pid in $(ss -ltnp 2>/dev/null | grep ":${PORT} " | grep -oE 'pid=[0-9]+' | cut -d= -f2 | sort -u); do
    kill "$pid" 2>/dev/null || true
  done
}
trap cleanup EXIT

for _ in $(seq 1 30); do
  curl -sf -o /dev/null "http://localhost:${PORT}${BASE_PATH}/" && break
  sleep 1
done

ARGS=(npx playwright test --project=visual)
[ "$MODE" = "--check" ] || ARGS+=(--update-snapshots)

docker run --rm --network host \
  --user "$(id -u):$(id -g)" -e HOME=/tmp \
  -v "$PWD":/work -w /work \
  "$IMAGE" "${ARGS[@]}"

if [ "$MODE" = "--check" ]; then
  echo "Compared only; nothing written."
else
  echo
  echo "Baselines rewritten. Look at the diff before committing:"
  echo "  git diff --stat tests/e2e/visual.spec.ts-snapshots/"
fi
