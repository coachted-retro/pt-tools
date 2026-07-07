CREATE TABLE IF NOT EXISTS marketing_media (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  client_id INTEGER, -- set for 1:1 session media, null for class/general media
  class_id INTEGER, -- set for group class media, null for 1:1 session media
  media_type TEXT NOT NULL, -- 'photo' | 'video'
  r2_key TEXT NOT NULL,
  captured_at TEXT,
  captured_by TEXT, -- coach name
  notes TEXT,
  gym_id INTEGER DEFAULT 1
);
CREATE INDEX IF NOT EXISTS idx_marketing_media_client ON marketing_media(client_id);
CREATE INDEX IF NOT EXISTS idx_marketing_media_class ON marketing_media(class_id);
