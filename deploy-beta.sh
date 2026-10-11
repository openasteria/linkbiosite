#!/usr/bin/env bash
# Deploys the beta branch to opendam.online (GitHub Pages, main branch)
# Usage: ./deploy-beta.sh <TOKEN>
set -e
TOKEN="${1:?Usage: ./deploy-beta.sh <TOKEN>}"
git push "https://x-access-token:${TOKEN}@github.com/openasteria/linkbiosite.git" beta:main --force
echo "OK - site will update at http://opendam.online within 1-2 minutes"
