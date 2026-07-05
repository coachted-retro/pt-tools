-- Run this once in the Cloudflare D1 console against retro-crm.
-- Adds structured, checkable shopping lists (instead of prose baked
-- into plan_html) and a persistent pantry inventory so the shopping
-- list can skip items the client already has at home.

ALTER TABLE meal_plans ADD COLUMN shopping_items_json TEXT;
ALTER TABLE meal_plans ADD COLUMN shopping_checked_json TEXT;
ALTER TABLE meal_plans ADD COLUMN plan_json TEXT;

CREATE TABLE IF NOT EXISTS pantry_items (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  client_id INTEGER NOT NULL,
  item_name TEXT NOT NULL,
  have_it INTEGER DEFAULT 1,
  updated_at TEXT
);

CREATE INDEX IF NOT EXISTS idx_pantry_client ON pantry_items(client_id);

-- Photos per meal library item (and per generated recipe), so the meal
-- plan, recipe bank, and consultation demo can all show a real photo
-- instead of a generic food icon. Keyed by the exact item/recipe name.
CREATE TABLE IF NOT EXISTS meal_photos (
  item_name TEXT PRIMARY KEY,
  photo_url TEXT,
  updated_at TEXT
);

