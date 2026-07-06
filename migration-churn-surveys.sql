CREATE TABLE IF NOT EXISTS churn_surveys (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  client_id INTEGER NOT NULL,
  cancel_reason TEXT,
  liked_most TEXT,
  reason_detail TEXT,
  would_return TEXT,
  submitted_at TEXT,
  sent_at TEXT
);
CREATE INDEX IF NOT EXISTS idx_churn_client ON churn_surveys(client_id);
