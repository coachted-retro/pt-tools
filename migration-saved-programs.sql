CREATE TABLE IF NOT EXISTS saved_programs (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  name TEXT NOT NULL,
  coach TEXT,
  day_routines_json TEXT NOT NULL,
  created_at TEXT
);
