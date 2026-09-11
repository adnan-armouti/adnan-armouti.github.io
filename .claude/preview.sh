#!/usr/bin/env bash
# Serve the website statically so it can be viewed over an SSH tunnel.
# Idempotent: starts the server only if the port is not already serving.
set -uo pipefail

ROOT="$(cd "$(dirname "${BASH_SOURCE[0]}")/.." && pwd)"
PORT="${WEBSITE_PREVIEW_PORT:-8787}"
LOG="$ROOT/.claude/preview.log"
PIDFILE="$ROOT/.claude/preview.pid"
URL="http://localhost:$PORT/"

running() { curl -s -o /dev/null -m 2 "http://127.0.0.1:$PORT/" 2>/dev/null; }

STATUS="already running"
if ! running; then
  nohup python3 "$ROOT/.claude/preview_server.py" "$PORT" "$ROOT" >"$LOG" 2>&1 &
  echo $! > "$PIDFILE"
  for _ in 1 2 3 4 5 6 7 8 9 10; do running && break; sleep 0.3; done
  STATUS="started"
fi

if running; then
  MSG="🔗 Preview ($STATUS): $URL   —   if not auto-forwarded, run on your laptop: ssh -N -L $PORT:localhost:$PORT $(whoami)@$(hostname -I 2>/dev/null | awk '{print $1}')"
else
  MSG="⚠️  Preview server failed to start on port $PORT — see .claude/preview.log"
fi

python3 - "$MSG" <<'PY'
import json, sys
print(json.dumps({"systemMessage": sys.argv[1]}))
PY
