#!/usr/bin/env bash
# shadcn-motion installer
# Installs the shadcn-motion skill and command into ~/.claude/

set -euo pipefail

SCRIPT_DIR="$( cd "$( dirname "${BASH_SOURCE[0]}" )" && pwd )"
CLAUDE_DIR="${CLAUDE_HOME:-$HOME/.claude}"
SKILLS_DIR="$CLAUDE_DIR/skills"
COMMANDS_DIR="$CLAUDE_DIR/commands"

DRY_RUN=0
for arg in "$@"; do
  case "$arg" in
    --dry-run) DRY_RUN=1 ;;
    --help|-h)
      cat <<EOF
shadcn-motion installer

Usage: ./install.sh [--dry-run]

Installs to:
  $SKILLS_DIR/shadcn-motion/
  $COMMANDS_DIR/shadcn-motion.md

Options:
  --dry-run  Show what would be done without doing it
  --help     Show this help

Environment:
  CLAUDE_HOME  Override the Claude config directory (default: \$HOME/.claude)
EOF
      exit 0
      ;;
  esac
done

bold() { printf '\033[1m%s\033[0m\n' "$*"; }
green() { printf '\033[32m%s\033[0m\n' "$*"; }
red() { printf '\033[31m%s\033[0m\n' "$*"; }
yellow() { printf '\033[33m%s\033[0m\n' "$*"; }

bold "shadcn-motion · installer"
echo

# 1. Validate Claude Code directory
if [ ! -d "$CLAUDE_DIR" ]; then
  yellow "  $CLAUDE_DIR does not exist."
  if [ "$DRY_RUN" -eq 0 ]; then
    echo "  Creating it now…"
    mkdir -p "$CLAUDE_DIR"
  else
    echo "  Would create it."
  fi
fi

# 2. Validate plugin contents
if [ ! -d "$SCRIPT_DIR/skills/shadcn-motion" ]; then
  red "Error: skills/shadcn-motion not found in plugin directory."
  exit 1
fi
if [ ! -f "$SCRIPT_DIR/skills/shadcn-motion/SKILL.md" ]; then
  red "Error: skills/shadcn-motion/SKILL.md not found."
  exit 1
fi
if [ ! -f "$SCRIPT_DIR/commands/shadcn-motion.md" ]; then
  red "Error: commands/shadcn-motion.md not found."
  exit 1
fi

# 3. Install skill
echo "Installing skill → $SKILLS_DIR/shadcn-motion/"
if [ -d "$SKILLS_DIR/shadcn-motion" ]; then
  yellow "  Skill already exists at $SKILLS_DIR/shadcn-motion/"
  echo "  Will overwrite. (Run ./uninstall.sh first if you want a clean install.)"
fi

if [ "$DRY_RUN" -eq 0 ]; then
  mkdir -p "$SKILLS_DIR"
  rm -rf "$SKILLS_DIR/shadcn-motion"
  cp -R "$SCRIPT_DIR/skills/shadcn-motion" "$SKILLS_DIR/"
  green "  ✓ Skill installed"
else
  echo "  Would copy skills/shadcn-motion/ → $SKILLS_DIR/shadcn-motion/"
fi

# 4. Install command
echo "Installing command → $COMMANDS_DIR/shadcn-motion.md"
if [ "$DRY_RUN" -eq 0 ]; then
  mkdir -p "$COMMANDS_DIR"
  cp "$SCRIPT_DIR/commands/shadcn-motion.md" "$COMMANDS_DIR/shadcn-motion.md"
  green "  ✓ Command installed"
else
  echo "  Would copy commands/shadcn-motion.md → $COMMANDS_DIR/shadcn-motion.md"
fi

# 5. Done
echo
if [ "$DRY_RUN" -eq 0 ]; then
  green "✓ shadcn-motion installed successfully."
  echo
  echo "Try it out:"
  echo "  → Open Claude Code and say 'make a WOW hero page'"
  echo "  → Or run the canonical example:"
  echo "    open $SKILLS_DIR/shadcn-motion/examples/hero-reveal-singlefile.html"
  echo
  echo "Uninstall any time with: ./uninstall.sh"
else
  yellow "Dry run complete. Re-run without --dry-run to install."
fi
