CREATE TABLE IF NOT EXISTS followups (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  client_id INTEGER,
  followup_date TEXT,
  next_followup_date TEXT,
  advisor TEXT,
  outcome TEXT, -- 'enrolled' | 'long_followup' | 'another_followup' | 'not_ready'
  program_freq TEXT,
  program_length TEXT,
  goals TEXT,
  assessment_summary TEXT,
  full_intake_json TEXT,
  created_at TEXT
);
CREATE INDEX IF NOT EXISTS idx_followups_client ON followups(client_id);
