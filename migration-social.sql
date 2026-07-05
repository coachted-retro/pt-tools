CREATE TABLE IF NOT EXISTS win_reactions (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  win_id INTEGER NOT NULL,
  client_id INTEGER NOT NULL,
  emoji TEXT NOT NULL,
  created_at TEXT,
  UNIQUE(win_id, client_id, emoji)
);
CREATE INDEX IF NOT EXISTS idx_win_reactions_win ON win_reactions(win_id);

CREATE TABLE IF NOT EXISTS presence_checkins (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  client_id INTEGER NOT NULL,
  gym_id INTEGER DEFAULT 1,
  checked_in_at TEXT NOT NULL
);
CREATE INDEX IF NOT EXISTS idx_presence_time ON presence_checkins(checked_in_at);

CREATE TABLE IF NOT EXISTS member_groups (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  name TEXT NOT NULL,
  type TEXT DEFAULT 'team',
  created_at TEXT
);

CREATE TABLE IF NOT EXISTS group_members (
  group_id INTEGER NOT NULL,
  client_id INTEGER NOT NULL,
  joined_at TEXT,
  PRIMARY KEY (group_id, client_id)
);
CREATE INDEX IF NOT EXISTS idx_group_members_client ON group_members(client_id);

CREATE TABLE IF NOT EXISTS buddy_optins (
  client_id INTEGER PRIMARY KEY,
  goal_type TEXT NOT NULL,
  preferred_time TEXT,
  active INTEGER DEFAULT 1,
  created_at TEXT
);

CREATE TABLE IF NOT EXISTS class_rsvps (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  client_id INTEGER NOT NULL,
  class_name TEXT NOT NULL,
  class_date TEXT NOT NULL,
  class_time TEXT,
  status TEXT DEFAULT 'going',
  created_at TEXT,
  UNIQUE(client_id, class_name, class_date)
);
CREATE INDEX IF NOT EXISTS idx_class_rsvps_date ON class_rsvps(class_date);
CREATE INDEX IF NOT EXISTS idx_class_rsvps_client ON class_rsvps(client_id);


