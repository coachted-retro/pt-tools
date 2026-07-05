CREATE TABLE IF NOT EXISTS staff_auth (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  staff_id INTEGER NOT NULL,
  email TEXT UNIQUE NOT NULL,
  pin_hash TEXT NOT NULL,
  must_change_pin INTEGER DEFAULT 1,
  active INTEGER DEFAULT 1,
  last_login TEXT,
  reset_code_hash TEXT,
  reset_expires TEXT
);
CREATE INDEX IF NOT EXISTS idx_staff_auth_staff_id ON staff_auth(staff_id);
