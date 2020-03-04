#!/bin/bash
set -eu
set -o pipefail

GITHUB_WORKSPACE=${GITHUB_WORKSPACE:-$(pwd)}

if [ -z "${GITHUB_REPOSITORY:-}" ]; then
  echo "GITHUB_REPOSITORY is not set";
  exit 1;
fi
if [ -z "${GITHUB_TOKEN:-}" ]; then
  echo "GITHUB_TOKEN is not set";
  exit 1;
fi

# Go to project root
cd $(git -C ${GITHUB_WORKSPACE} rev-parse --show-toplevel)

# Install and build
npm ci
npm run build

# Push our build to gh-pages
cd build
git init
git config user.name "github-actions"
git config user.email "github-actions@users.noreply.github.com"
git checkout -b gh-pages
git add --all
git commit -m "Publishing to gh-pages `date`"
git push -f https://x-access-token:${GITHUB_TOKEN}@github.com/${GITHUB_REPOSITORY}.git gh-pages
