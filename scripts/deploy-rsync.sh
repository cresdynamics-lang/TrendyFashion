#!/usr/bin/env bash
# Deploy code only — never touch product uploads (restored from backup if wiped).
set -euo pipefail
HOST="${DEPLOY_HOST:-root@13.140.33.232}"
SITE="${DEPLOY_SITE:-/var/www/sites/trendyfashionzone.co.ke}"
ROOT="$(cd "$(dirname "$0")/.." && pwd)"

rsync -az \
  --exclude node_modules \
  --exclude .next \
  --exclude .git \
  --exclude .env.local \
  --exclude public/uploads \
  --exclude 'public/uploads/**' \
  "$ROOT/" "$HOST:$SITE/"

ssh "$HOST" "cd '$SITE' && npm install && npm run build && pm2 restart trendyfashionzone"
echo "Deployed. Uploads left untouched."
