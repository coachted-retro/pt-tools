CREATE TABLE IF NOT EXISTS meals (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  client_id INTEGER NOT NULL,
  meal_date TEXT NOT NULL,
  meal_time TEXT,
  meal_type TEXT,
  photo_key TEXT,
  calories INTEGER,
  protein_g INTEGER,
  carbs_g INTEGER,
  fat_g INTEGER,
  items_json TEXT,
  source TEXT,
  logged_at TEXT
);
CREATE INDEX IF NOT EXISTS idx_meals_client_date ON meals(client_id, meal_date);

CREATE TABLE IF NOT EXISTS recipes (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  client_id INTEGER,
  title TEXT NOT NULL,
  meal_type TEXT,
  prep_min INTEGER,
  calories INTEGER,
  protein_g INTEGER,
  carbs_g INTEGER,
  fat_g INTEGER,
  ingredients_json TEXT,
  steps_json TEXT,
  tags TEXT,
  created_at TEXT
);
CREATE INDEX IF NOT EXISTS idx_recipes_client ON recipes(client_id);

ALTER TABLE meal_profiles ADD COLUMN calories INTEGER;
ALTER TABLE meal_profiles ADD COLUMN protein_g INTEGER;
ALTER TABLE meal_profiles ADD COLUMN carbs_g INTEGER;
ALTER TABLE meal_profiles ADD COLUMN fat_g INTEGER;
