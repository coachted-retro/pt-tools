CREATE TABLE IF NOT EXISTS feed_posts (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  category TEXT NOT NULL,
  title TEXT NOT NULL,
  body TEXT,
  image_url TEXT,
  featured_client_id INTEGER,
  featured_staff_id INTEGER,
  event_date TEXT,
  pinned INTEGER DEFAULT 0,
  created_by TEXT,
  created_at TEXT
);
CREATE INDEX IF NOT EXISTS idx_feed_posts_created ON feed_posts(created_at);

ALTER TABLE clients ADD COLUMN birthday TEXT;
ALTER TABLE staff_roster ADD COLUMN birthday TEXT;
