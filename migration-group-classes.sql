CREATE TABLE IF NOT EXISTS group_classes (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  name TEXT NOT NULL,
  day_of_week INTEGER NOT NULL, -- 0=Sun ... 6=Sat
  start_time TEXT NOT NULL, -- 'HH:MM' 24hr
  duration_minutes INTEGER DEFAULT 60,
  room TEXT,
  equipment_pool TEXT, -- JSON array of equipment available for this class
  rest_seconds INTEGER DEFAULT 40,
  focus TEXT, -- short description of what the class is about
  coach TEXT,
  gym_id INTEGER DEFAULT 1,
  active INTEGER DEFAULT 1,
  created_at TEXT
);

CREATE TABLE IF NOT EXISTS group_class_sessions (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  class_id INTEGER NOT NULL,
  session_date TEXT NOT NULL, -- the specific date this week's rotation is for
  stations_json TEXT, -- [{name, cue, scale_up, scale_down, equipment}]
  warmup_json TEXT,
  cooldown_json TEXT,
  created_at TEXT,
  UNIQUE(class_id, session_date)
);

INSERT INTO group_classes (name, day_of_week, start_time, duration_minutes, room, equipment_pool, rest_seconds, focus, coach, gym_id, active, created_at) VALUES
  ('Ignite Core', 2, '17:30', 60, 'PTC / Turf Room', '["dumbbells","kettlebells","bodyweight","bosu balls","medicine balls","TRX cables"]', 40, 'Core engagement and stability work', 'Ted Scholl', 1, 1, datetime('now')),
  ('Boot Camp', 4, '17:30', 60, 'PTC / Turf Room', '["dumbbells","kettlebells","bodyweight","bosu balls","medicine balls","TRX cables","barbells","rowers or bikes","battle ropes","plyo boxes","sleds"]', 40, 'Full-body conditioning and strength circuit', 'Ted Scholl', 1, 1, datetime('now'));
