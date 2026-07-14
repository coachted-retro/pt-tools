-- Emergency contact info on the client record itself, so an incident
-- report can pull it automatically instead of someone having to go dig
-- for it in the middle of an actual emergency.
ALTER TABLE clients ADD COLUMN emergency_contact_name TEXT;
ALTER TABLE clients ADD COLUMN emergency_contact_phone TEXT;
ALTER TABLE clients ADD COLUMN emergency_contact_relationship TEXT;

-- Incident reports. Deliberately its own table, not folded into the
-- lightweight maintenance_log, since this needs to hold up for an
-- insurance claim and stay restricted to management, not general staff
-- notes. involved_client_id links back to a real client/member record
-- when the incident involves one, so their name and emergency contact
-- populate automatically instead of being retyped.
CREATE TABLE IF NOT EXISTS incident_reports (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  gym_id INTEGER DEFAULT 1,
  incident_date TEXT NOT NULL,
  incident_time TEXT,
  incident_type TEXT NOT NULL, -- 'medical_emergency' | 'injury' | 'facility' | 'other'
  involved_client_id INTEGER REFERENCES clients(id),
  involved_name TEXT, -- free text fallback if not tied to a client record (e.g. a guest)
  description TEXT NOT NULL,
  who_was_called TEXT, -- 'police' | 'ambulance' | 'both' | 'none'
  outcome TEXT,
  witnesses TEXT,
  reported_by TEXT NOT NULL,
  status TEXT DEFAULT 'open', -- 'open' | 'closed' | 'insurance_filed'
  created_at TEXT DEFAULT (datetime('now')),
  updated_at TEXT
);

-- Vendor directory, one place instead of scattered contacts.
CREATE TABLE IF NOT EXISTS vendors (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  gym_id INTEGER DEFAULT 1,
  name TEXT NOT NULL,
  category TEXT, -- e.g. 'equipment repair', 'cleaning', 'HVAC', 'general contractor'
  contact_name TEXT,
  phone TEXT,
  email TEXT,
  notes TEXT,
  created_at TEXT DEFAULT (datetime('now'))
);

-- Real equipment repair tracking, replacing paper log sheets. Optional
-- vendor_id ties a repair to who actually did the work.
CREATE TABLE IF NOT EXISTS equipment_repairs (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  gym_id INTEGER DEFAULT 1,
  equipment_name TEXT NOT NULL,
  issue_description TEXT,
  reported_date TEXT NOT NULL,
  vendor_id INTEGER REFERENCES vendors(id),
  cost REAL,
  status TEXT DEFAULT 'open', -- 'open' | 'scheduled' | 'completed'
  completed_date TEXT,
  notes TEXT,
  entered_by TEXT,
  created_at TEXT DEFAULT (datetime('now'))
);

-- Editable general inventory (protein/shake mixes, supplies, anything
-- Sarah and others have been tracking loose in EOD text fields).
-- Distinct from shake_counts, which stays as the daily open/close count;
-- this is the actual stock list with a running quantity.
CREATE TABLE IF NOT EXISTS inventory_items (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  gym_id INTEGER DEFAULT 1,
  item_name TEXT NOT NULL,
  category TEXT, -- e.g. 'protein/shakes', 'supplements', 'cleaning', 'office'
  quantity_on_hand INTEGER DEFAULT 0,
  reorder_threshold INTEGER,
  notes TEXT,
  updated_by TEXT,
  updated_at TEXT DEFAULT (datetime('now'))
);
