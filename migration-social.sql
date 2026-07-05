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
