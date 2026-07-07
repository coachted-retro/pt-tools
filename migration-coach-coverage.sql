CREATE TABLE IF NOT EXISTS coach_coverage (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  covering_coach TEXT NOT NULL,
  covered_coach TEXT NOT NULL,
  start_date TEXT NOT NULL,
  end_date TEXT NOT NULL,
  created_by TEXT,
  created_at TEXT
);
CREATE INDEX IF NOT EXISTS idx_coverage_covering ON coach_coverage(covering_coach, start_date, end_date);
