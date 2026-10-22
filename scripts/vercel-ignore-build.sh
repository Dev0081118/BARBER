#!/usr/bin/env bash
# ==============================================================================
# Vercel Ignored Build Step Script for BarberShop Multi-Client Master Template
#
# Configured in Vercel Project Settings -> Git -> Ignored Build Step:
#   bash scripts/vercel-ignore-build.sh
#
# Exit codes per Vercel convention:
#   exit 1 -> PROCEED with build (changes detected)
#   exit 0 -> SKIP build (no relevant changes detected)
# ==============================================================================

CLIENT_SLUG="${VITE_BARBER_SLUG:-}"

echo "========================================================"
echo "💈 BarberShop Master Template — Deployment Filter Check"
echo "Target Client Slug: ${CLIENT_SLUG:-[NOT SET]}"
echo "Previous Commit:    ${VERCEL_GIT_PREVIOUS_SHA:-[INITIAL]}"
echo "Current Commit:     ${VERCEL_GIT_COMMIT_SHA:-[HEAD]}"
echo "========================================================"

# If client slug is not set, allow build to proceed so Vite can emit a clear error
if [ -z "$CLIENT_SLUG" ]; then
  echo "⚠️ VITE_BARBER_SLUG is not set. Proceeding with build to report configuration error..."
  exit 1
fi

# If this is the initial deployment or previous commit is unknown, proceed with build
if [ -z "$VERCEL_GIT_PREVIOUS_SHA" ] || [ "$VERCEL_GIT_PREVIOUS_SHA" = "$VERCEL_GIT_COMMIT_SHA" ]; then
  echo "🚀 Initial or forced deployment detected. Proceeding with build for '${CLIENT_SLUG}'..."
  exit 1
fi

# Check modified files between previous deployed commit and current commit
CHANGED_FILES=$(git diff --name-only "$VERCEL_GIT_PREVIOUS_SHA" "$VERCEL_GIT_COMMIT_SHA" 2>/dev/null || true)

if [ -z "$CHANGED_FILES" ]; then
  echo "🚀 Git diff unavailable or empty. Proceeding with build to be safe..."
  exit 1
fi

# 1. Check for shared application code changes
SHARED_PATTERNS="^(src/themes/|src/components/|src/schemas/|src/utils/|src/config/|src/data/clients/index\.js|src/App\.jsx|src/main\.jsx|src/index\.css|index\.html|package\.json|package-lock\.json|vite\.config\.js|vercel\.json)"

if echo "$CHANGED_FILES" | grep -Eq "$SHARED_PATTERNS"; then
  echo "✅ Shared template or core architecture changes detected."
  echo "   Proceeding with build for '${CLIENT_SLUG}'..."
  exit 1
fi

# 2. Check for changes specific to this client's configuration or assets
CLIENT_PATTERNS="^(src/data/clients/${CLIENT_SLUG}\.json|public/clients/${CLIENT_SLUG}/)"

if echo "$CHANGED_FILES" | grep -Eq "$CLIENT_PATTERNS"; then
  echo "✅ Client-specific changes detected for '${CLIENT_SLUG}'."
  echo "   Proceeding with build..."
  exit 1
fi

# 3. If neither shared code nor this client's data changed, skip build
echo "🛑 No changes affecting client '${CLIENT_SLUG}'."
echo "   Changes were restricted to other clients or documentation."
echo "   Skipping build to conserve Vercel build minutes."
exit 0
