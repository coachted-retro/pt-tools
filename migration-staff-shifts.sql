CREATE TABLE IF NOT EXISTS staff_shifts (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  staff_id INTEGER NOT NULL,
  staff_name TEXT NOT NULL,
  role TEXT NOT NULL,
  gym_id INTEGER DEFAULT 1,
  shift_date TEXT NOT NULL,
  start_time TEXT NOT NULL,
  end_time TEXT NOT NULL,
  status TEXT DEFAULT 'scheduled',
  covered_by_staff_id INTEGER,
  covered_by_name TEXT,
  coverage_note TEXT,
  created_by TEXT,
  created_at TEXT,
  updated_at TEXT
);
CREATE INDEX IF NOT EXISTS idx_staff_shifts_date ON staff_shifts(shift_date);
CREATE INDEX IF NOT EXISTS idx_staff_shifts_staff ON staff_shifts(staff_id);
CREATE INDEX IF NOT EXISTS idx_staff_shifts_status ON staff_shifts(status);
