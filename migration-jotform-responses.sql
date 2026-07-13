-- Stores every Jotform check-in submission in full, tied back to the
-- client via the hidden Client ID field on the form. raw_json keeps the
-- complete answer set regardless of how Jotform's internal field names
-- are slugged, so nothing gets lost even if the form's questions change
-- later.
CREATE TABLE IF NOT EXISTS jotform_responses (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  client_id INTEGER,
  form_id TEXT,
  submission_id TEXT,
  raw_json TEXT,
  received_at TEXT
);
CREATE INDEX IF NOT EXISTS idx_jotform_responses_client ON jotform_responses(client_id);
