#!/usr/bin/env bash
# shadcn-motion uninstaller

set -euo pipefail

CLAUDE_DIR="${CLAUDE_HOME:-$HOME/.claude}"
SKILLS_DIR="$CLAUDE_DIR/skills"
COMMANDS_DIR="$CLAUDE_DIR/commands"

DRY_RUN=0
for arg in "$@"; do
  case "$arg" in
    --dry-run) DRY_RUN=1 ;;
    --help|-h)
      echo "Usage: ./uninstall.sh [--dry-run]"
      exit 0
      ;;
  esac
done

bold() { printf '\033[1m%s\033[0m\n' "$*"; }
green() { printf '\033[32m%s\033[0m\n' "$*"; }
yellow() { printf '\033[33m%s\033[0m\n' "$*"; }

bold "shadcn-motion · uninstaller"
echo

removed_any=0

# Remove skill
if [ -d "$SKILLS_DIR/shadcn-motion" ]; then
  if [ "$DRY_RUN" -eq 0 ]; then
    rm -rf "$SKILLS_DIR/shadcn-motion"
    green "  ✓ Removed $SKILLS_DIR/shadcn-motion/"
  else
    echo "  Would remove $SKILLS_DIR/shadcn-motion/"
  fi
  removed_any=1
else
  yellow "  Skill not found at $SKILLS_DIR/shadcn-motion/ (already uninstalled?)"
fi

# Remove command
if [ -f "$COMMANDS_DIR/shadcn-motion.md" ]; then
  if [ "$DRY_RUN" -eq 0 ]; then
    rm -f "$COMMANDS_DIR/shadcn-motion.md"
    green "  ✓ Removed $COMMANDS_DIR/shadcn-motion.md"
  else
    echo "  Would remove $COMMANDS_DIR/shadcn-motion.md"
  fi
  removed_any=1
else
  yellow "  Command not found at $COMMANDS_DIR/shadcn-motion.md (already uninstalled?)"
fi

echo
if [ "$DRY_RUN" -eq 0 ]; then
  if [ "$removed_any" -eq 1 ]; then
    green "✓ shadcn-motion uninstalled."
  else
    yellow "Nothing to remove."
  fi
fi
