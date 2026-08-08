#!/usr/bin/env bash
#
# Activate the local gates in .githooks/ by pointing git at them.
#
#   scripts/install-hooks.sh            # install
#   scripts/install-hooks.sh --uninstall
#
# Hooks are per-clone: `core.hooksPath` is local config, never committed, so
# every clone opts in explicitly. Nothing here is global.
#
# An existing hook is preserved as <name>.local and still runs first, so a
# personal hook is never silently replaced.
set -euo pipefail

cd "$(git rev-parse --show-toplevel)"

HOOKS_DIR=".githooks"

if [ "${1:-}" = "--uninstall" ]; then
  git config --unset core.hooksPath 2>/dev/null || true
  printf 'Gates deactivated. Existing .git/hooks (if any) apply again.\n'
  exit 0
fi

[ -d "$HOOKS_DIR" ] || { printf 'No %s directory here.\n' "$HOOKS_DIR" >&2; exit 1; }

# Preserve anything already installed in .git/hooks, so a personal hook keeps
# working: the gates chain to <name>.local when present.
preserved=0
for hook in "$HOOKS_DIR"/*; do
  name="$(basename "$hook")"
  case "$name" in GATES_VERSION) continue ;; esac
  existing=".git/hooks/$name"
  if [ -f "$existing" ] && [ ! -f "$HOOKS_DIR/$name.local" ]; then
    cp "$existing" "$HOOKS_DIR/$name.local"
    chmod +x "$HOOKS_DIR/$name.local"
    printf 'Preserved existing %s as %s.local\n' "$name" "$name"
    preserved=$((preserved + 1))
  fi
done

chmod +x "$HOOKS_DIR"/* 2>/dev/null || true
git config core.hooksPath "$HOOKS_DIR"

printf '\nGates active (v%s) from %s/\n' "$(cat "$HOOKS_DIR/GATES_VERSION" 2>/dev/null || echo '?')" "$HOOKS_DIR"
for hook in "$HOOKS_DIR"/*; do
  name="$(basename "$hook")"
  case "$name" in GATES_VERSION|*.local) continue ;; esac
  printf '  %s\n' "$name"
done
[ "$preserved" -gt 0 ] && printf '\n%d existing hook(s) preserved and still run first.\n' "$preserved"
printf '\nBypass once:  git commit --no-verify\n'
printf 'Deactivate:   scripts/install-hooks.sh --uninstall\n'
