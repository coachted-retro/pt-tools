CREATE TABLE IF NOT EXISTS chef_recipes (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  recipe_date TEXT NOT NULL UNIQUE,
  title TEXT,
  description TEXT,
  prep_time TEXT,
  ingredients_json TEXT,
  instructions_json TEXT,
  shopping_list_json TEXT,
  created_at TEXT
);
