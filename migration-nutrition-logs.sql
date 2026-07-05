-- Run this once in the Cloudflare D1 console against retro-crm.
-- Adds daily accumulated macro totals per client, fed automatically by
-- /nutrition/photo and /nutrition/estimate (worker-v32.js). This is the
-- real data source behind the "average macro progress" graph on each
-- client's card in coach-crm.html.

CREATE TABLE IF NOT EXISTS nutrition_logs (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  client_id INTEGER NOT NULL,
  log_date TEXT NOT NULL,
  calories REAL DEFAULT 0,
  protein_g REAL DEFAULT 0,
  carbs_g REAL DEFAULT 0,
  fat_g REAL DEFAULT 0,
  created_at TEXT,
  UNIQUE(client_id, log_date)
);

CREATE INDEX IF NOT EXISTS idx_nutrition_logs_client_date ON nutrition_logs(client_id, log_date);
