#!/bin/sh
# Revive the preview after hibernate. Idempotent.
if curl -sf -o /dev/null --max-time 1 http://127.0.0.1:8080/; then
  exit 0
fi
cd /workspace
npm run dev
