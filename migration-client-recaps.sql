CREATE TABLE IF NOT EXISTS client_recaps (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  client_id INTEGER NOT NULL,
  report_type TEXT NOT NULL,
  pdf_key TEXT,
  summary TEXT,
  advisor TEXT,
  emailed_to TEXT,
  created_at TEXT DEFAULT (datetime('now'))
);
CREATE INDEX IF NOT EXISTS idx_recaps_client ON client_recaps(client_id);
