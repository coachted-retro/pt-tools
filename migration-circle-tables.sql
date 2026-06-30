CREATE TABLE IF NOT EXISTS daily_content (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  content_date TEXT NOT NULL,
  health_tip TEXT,
  quote TEXT,
  quote_author TEXT,
  news_headline TEXT,
  news_blurb TEXT,
  generated_at TEXT
);
CREATE UNIQUE INDEX IF NOT EXISTS idx_daily_content_date ON daily_content(content_date);

CREATE TABLE IF NOT EXISTS client_wins (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  client_id INTEGER,
  headline TEXT NOT NULL,
  detail TEXT,
  win_type TEXT,
  source TEXT,
  visible INTEGER DEFAULT 1,
  created_at TEXT
);
CREATE INDEX IF NOT EXISTS idx_client_wins_created ON client_wins(created_at);

CREATE TABLE IF NOT EXISTS gym_events (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  title TEXT NOT NULL,
  blurb TEXT,
  event_date TEXT,
  image_url TEXT,
  visible INTEGER DEFAULT 1,
  created_at TEXT
);
CREATE INDEX IF NOT EXISTS idx_gym_events_date ON gym_events(event_date);
