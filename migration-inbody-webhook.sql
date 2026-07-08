-- InBody WebAPI webhook receiver (worker-v34.js: POST /inbody/webhook).
-- InBody pushes each scan result the moment it's taken -- no pull/poll.
-- We don't have their official field-name docs confirmed yet (account
-- stuck behind a login loop on their Documentation tab), so every raw
-- payload is logged here first, unconditionally, before any parsing is
-- attempted -- nothing is ever lost regardless of what the real schema
-- turns out to be. Applied directly to production via the Cloudflare D1
-- connector; this file documents it for repo history.
CREATE TABLE IF NOT EXISTS inbody_webhook_log (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  received_at TEXT DEFAULT (datetime('now')),
  raw_json TEXT NOT NULL,
  matched_client_id INTEGER,
  matched INTEGER DEFAULT 0,
  parsed_into_scan INTEGER DEFAULT 0,
  scan_id INTEGER,
  note TEXT
);
