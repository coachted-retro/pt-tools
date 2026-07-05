CREATE TABLE IF NOT EXISTS punch_list_items (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  gym_id INTEGER DEFAULT 1,
  category TEXT NOT NULL,
  description TEXT NOT NULL,
  area TEXT,
  urgency TEXT DEFAULT 'normal',
  status TEXT DEFAULT 'open',
  reported_by TEXT,
  reported_at TEXT,
  resolved_by TEXT,
  resolved_at TEXT,
  notes TEXT
);
CREATE INDEX IF NOT EXISTS idx_punch_status ON punch_list_items(status);
CREATE INDEX IF NOT EXISTS idx_punch_category ON punch_list_items(category);
