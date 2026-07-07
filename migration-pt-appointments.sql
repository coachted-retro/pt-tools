CREATE TABLE IF NOT EXISTS pt_appointments (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  appointment_date TEXT NOT NULL,
  appointment_time TEXT,
  appointment_type TEXT NOT NULL, -- 'initial_consultation' | 'follow_up' | 'monthly_checkin'
  prospect_name TEXT,
  prospect_phone TEXT,
  prospect_email TEXT,
  client_id INTEGER, -- nullable: filled in once linked to a real client record
  assigned_coach TEXT,
  status TEXT DEFAULT 'scheduled', -- 'scheduled' | 'showed' | 'no_show' | 'rescheduled' | 'cancelled'
  gym_id INTEGER DEFAULT 1,
  notes TEXT,
  created_at TEXT,
  updated_at TEXT
);

CREATE TABLE IF NOT EXISTS coach_daily_tips (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  tip_date TEXT NOT NULL UNIQUE,
  industry_news TEXT,
  coaching_tip TEXT,
  nutrition_note TEXT,
  created_at TEXT
);
