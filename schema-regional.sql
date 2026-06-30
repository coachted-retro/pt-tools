-- Run this against retro-crm-demo first. This is the real Body Shoppe
-- regional schema, gym names and goals are real, this is not throwaway
-- demo dressing. Once Keelin signs off, this same schema gets applied
-- to retro-crm (the live database) and the data carries forward.

CREATE TABLE IF NOT EXISTS gyms (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  name TEXT NOT NULL,
  region TEXT,
  address TEXT,
  lat REAL,
  lon REAL,
  manager_name TEXT,
  active INTEGER DEFAULT 1,
  created_at TEXT
);

CREATE TABLE IF NOT EXISTS pt_reps (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  gym_id INTEGER NOT NULL,
  first_name TEXT,
  last_name TEXT,
  email TEXT,
  active INTEGER DEFAULT 1,
  created_at TEXT
);
CREATE INDEX IF NOT EXISTS idx_pt_reps_gym ON pt_reps(gym_id);

-- Every closed PT sale/enrollment. This is the real revenue ledger
-- the regional dashboard and quota tracking are built on top of.
CREATE TABLE IF NOT EXISTS pt_sales (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  gym_id INTEGER NOT NULL,
  rep_id INTEGER,
  client_id INTEGER,
  sale_date TEXT NOT NULL,
  package TEXT,
  amount REAL NOT NULL,
  source TEXT,
  notes TEXT
);
CREATE INDEX IF NOT EXISTS idx_pt_sales_gym_date ON pt_sales(gym_id, sale_date);
CREATE INDEX IF NOT EXISTS idx_pt_sales_rep ON pt_sales(rep_id);

-- Monthly dollar goal per gym, set by Keelin. month format is YYYY-MM.
CREATE TABLE IF NOT EXISTS gym_quotas (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  gym_id INTEGER NOT NULL,
  month TEXT NOT NULL,
  goal_amount REAL NOT NULL,
  set_by TEXT,
  updated_at TEXT
);
CREATE UNIQUE INDEX IF NOT EXISTS idx_gym_quotas_unique ON gym_quotas(gym_id, month);

-- Add gym linkage to clients, leads, and self_workouts so everything
-- in the system can roll up to a gym. Nullable so nothing existing breaks.
ALTER TABLE clients ADD COLUMN gym_id INTEGER;
ALTER TABLE leads ADD COLUMN gym_id INTEGER;
