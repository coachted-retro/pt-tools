-- Staff Portal: recurring availability, tracked time-off requests, master gym events.
-- Run against retro-crm (production). Safe to re-run (IF NOT EXISTS throughout).

CREATE TABLE IF NOT EXISTS staff_availability (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  staff_id INTEGER NOT NULL,
  day_of_week INTEGER NOT NULL, -- 0=Sunday .. 6=Saturday
  start_time TEXT,
  end_time TEXT,
  note TEXT,
  updated_at TEXT
);
CREATE INDEX IF NOT EXISTS idx_avail_staff ON staff_availability(staff_id);

-- Replaces the old notification-only time-off flow with a real tracked record.
CREATE TABLE IF NOT EXISTS time_off_requests (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  staff_id INTEGER NOT NULL,
  start_date TEXT NOT NULL,
  end_date TEXT NOT NULL,
  reason TEXT,
  status TEXT DEFAULT 'pending', -- pending | approved | denied
  requested_at TEXT,
  reviewed_by TEXT,
  reviewed_at TEXT
);
CREATE INDEX IF NOT EXISTS idx_timeoff_staff ON time_off_requests(staff_id);
CREATE INDEX IF NOT EXISTS idx_timeoff_status ON time_off_requests(status);

-- Master gym calendar: holidays + special events. GM/Director-only writes, everyone reads.
CREATE TABLE IF NOT EXISTS gym_events (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  gym_id INTEGER DEFAULT 1,
  title TEXT NOT NULL,
  event_date TEXT NOT NULL,
  end_date TEXT,
  type TEXT DEFAULT 'event', -- holiday | event
  notes TEXT,
  created_by TEXT,
  created_at TEXT
);
CREATE INDEX IF NOT EXISTS idx_events_gym_date ON gym_events(gym_id, event_date);
