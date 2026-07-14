-- Retro Strong / PT Tools -- clean D1 schema export
-- Generated from the live Fairless Hills database (retro-crm) on July 10, 2026
-- Run this against a BRAND NEW, empty D1 database to stand up a new club.
-- Excludes _cf_KV (Cloudflare-internal, auto-created, do not create manually).
-- No data included -- every new club starts genuinely blank, per Ted's direction.

CREATE TABLE action_items (id INTEGER PRIMARY KEY AUTOINCREMENT, gym_id INTEGER, created_by TEXT, title TEXT, priority TEXT, status TEXT DEFAULT 'open', visible_to TEXT, source_log_id INTEGER, created_at TEXT DEFAULT (datetime('now')));
CREATE TABLE appointment_status (   id INTEGER PRIMARY KEY AUTOINCREMENT,   appt_date TEXT,   client_name TEXT,   appt_type TEXT,   status TEXT,   notes TEXT,   updated_at TEXT , reschedule_date TEXT, reschedule_time TEXT, reschedule_tbd INTEGER);
CREATE TABLE board_notes (id INTEGER PRIMARY KEY AUTOINCREMENT, gym_id INTEGER NOT NULL, month TEXT NOT NULL, note TEXT, emoji TEXT, author TEXT DEFAULT 'Keelin', updated_at TEXT DEFAULT (datetime('now')), UNIQUE(gym_id, month));
CREATE TABLE buddy_optins (
  client_id INTEGER PRIMARY KEY,
  goal_type TEXT NOT NULL,
  preferred_time TEXT,
  active INTEGER DEFAULT 1,
  created_at TEXT
);
CREATE TABLE candidates (id INTEGER PRIMARY KEY AUTOINCREMENT, name TEXT NOT NULL, phone TEXT, email TEXT, role_applied TEXT NOT NULL, availability TEXT, source TEXT, referred_by TEXT, resume_text TEXT, cover_note TEXT, status TEXT DEFAULT 'New', ai_score INTEGER, ai_summary TEXT, ai_strengths TEXT, ai_concerns TEXT, interview_notes TEXT, reviewed_by TEXT, hired_staff_id INTEGER, applied_at TEXT, updated_at TEXT);
CREATE TABLE cardio_logs (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  client_id INTEGER NOT NULL,
  cardio_type TEXT NOT NULL,
  duration_minutes INTEGER,
  distance TEXT,
  notes TEXT,
  logged_at TEXT DEFAULT (datetime('now'))
);
CREATE TABLE challenge_entries (id INTEGER PRIMARY KEY AUTOINCREMENT, client_id INTEGER, challenge_id INTEGER, entry_date TEXT, activity TEXT, points INTEGER DEFAULT 0, notes TEXT, created_at TEXT DEFAULT (datetime('now')));
CREATE TABLE challenges (id INTEGER PRIMARY KEY AUTOINCREMENT, month TEXT, title TEXT, description TEXT, active INTEGER DEFAULT 1, created_at TEXT DEFAULT (datetime('now')), tagline TEXT, rules TEXT, points_system TEXT, badge_label TEXT, generated_at TEXT);
CREATE TABLE checkins (   id                 INTEGER PRIMARY KEY AUTOINCREMENT,   client_id          INTEGER NOT NULL REFERENCES clients(id),   checkin_date       TEXT,   next_checkin       TEXT,   advisor            TEXT,   session_score      INTEGER, diet_score   INTEGER,   energy_score       INTEGER, sleep_score  INTEGER, stress_score INTEGER,   prev_weight        REAL, now_weight   REAL,   prev_lean          REAL, now_lean     REAL,   prev_body_fat_pct  REAL, now_body_fat_pct REAL,   prev_fat_mass      REAL, now_fat_mass REAL,   prev_bmi           REAL, now_bmi      REAL,   training_freq      TEXT,   wins               TEXT,   assessment_summary TEXT,   advisor_notes      TEXT,   created_at         TEXT DEFAULT (datetime('now')) , now_seg_la REAL, now_seg_ra REAL, now_seg_trunk REAL, now_seg_ll REAL, now_seg_rl REAL, full_intake_json TEXT);
CREATE TABLE chef_recipes (   id INTEGER PRIMARY KEY AUTOINCREMENT,   recipe_date TEXT NOT NULL UNIQUE,   title TEXT,   description TEXT,   prep_time TEXT,   ingredients_json TEXT,   instructions_json TEXT,   shopping_list_json TEXT,   created_at TEXT );
CREATE TABLE churn_surveys (   id INTEGER PRIMARY KEY AUTOINCREMENT,   client_id INTEGER NOT NULL,   cancel_reason TEXT,   liked_most TEXT,   reason_detail TEXT,   would_return TEXT,   submitted_at TEXT,   sent_at TEXT );
CREATE TABLE class_routines (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  class_name TEXT NOT NULL UNIQUE,
  exercises_json TEXT NOT NULL,
  work_seconds INTEGER DEFAULT 40,
  rest_seconds INTEGER DEFAULT 20,
  rounds INTEGER DEFAULT 1,
  notes TEXT,
  updated_by TEXT,
  updated_at TEXT
);
CREATE TABLE class_rsvps (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  client_id INTEGER NOT NULL,
  class_name TEXT NOT NULL,
  class_date TEXT NOT NULL,
  class_time TEXT,
  status TEXT DEFAULT 'going',
  created_at TEXT,
  UNIQUE(client_id, class_name, class_date)
);
CREATE TABLE client_auth (id INTEGER PRIMARY KEY AUTOINCREMENT, client_id INTEGER UNIQUE, email TEXT UNIQUE, password_hash TEXT, must_change_password INTEGER DEFAULT 1, active INTEGER DEFAULT 1, last_login TEXT, reset_code_hash TEXT, reset_expires TEXT);
CREATE TABLE client_wins (id INTEGER PRIMARY KEY AUTOINCREMENT, client_id INTEGER, headline TEXT, detail TEXT, win_type TEXT, source TEXT, visible INTEGER DEFAULT 1, created_at TEXT DEFAULT (datetime('now')));
CREATE TABLE clients (   id                 INTEGER PRIMARY KEY AUTOINCREMENT,   first_name         TEXT,   last_name          TEXT,   email              TEXT,   phone              TEXT,   gender             TEXT,   age                INTEGER,   status             TEXT DEFAULT 'prospect',   advisor            TEXT,   goal_primary       TEXT,   source_id          INTEGER REFERENCES lead_sources(id),   trainerize_client_id TEXT,   notes              TEXT,   created_at         TEXT DEFAULT (datetime('now')),   updated_at         TEXT DEFAULT (datetime('now')) , training_start_date TEXT, coach TEXT, package TEXT, sessions_total INTEGER DEFAULT 0, sessions_used INTEGER DEFAULT 0, sessions_remaining INTEGER DEFAULT 0, package_start_date TEXT, package_end_date TEXT, billing_type TEXT DEFAULT 'monthly_eft', my_why TEXT, monthly_intention TEXT, sessions_per_week INTEGER DEFAULT 2, coach_recommendation TEXT, coach_recommendation_date TEXT, coach_recommendation_by TEXT, membership_tier TEXT, membership_price REAL, onboarding_json TEXT, gym_id INTEGER DEFAULT 1, birthday TEXT, agreement_number TEXT, barcode TEXT, tags TEXT, decline_date TEXT, followup_email_sent_at TEXT);
CREATE TABLE clubos_appointments (   id INTEGER PRIMARY KEY AUTOINCREMENT,   uid TEXT UNIQUE NOT NULL,   summary TEXT,   start_datetime TEXT NOT NULL,   end_datetime TEXT,   description TEXT,   location TEXT,   synced_at TEXT , status TEXT DEFAULT 'scheduled', notes TEXT, reschedule_date TEXT, reschedule_time TEXT, reschedule_tbd INTEGER DEFAULT 0);
CREATE TABLE coach_coverage (   id INTEGER PRIMARY KEY AUTOINCREMENT,   covering_coach TEXT NOT NULL,   covered_coach TEXT NOT NULL,   start_date TEXT NOT NULL,   end_date TEXT NOT NULL,   created_by TEXT,   created_at TEXT );
CREATE TABLE coach_daily_tips (   id INTEGER PRIMARY KEY AUTOINCREMENT,   tip_date TEXT NOT NULL UNIQUE,   industry_news TEXT,   coaching_tip TEXT,   nutrition_note TEXT,   created_at TEXT );
CREATE TABLE coach_notes (   id INTEGER PRIMARY KEY AUTOINCREMENT,   client_id INTEGER NOT NULL,   coach_name TEXT,   tag TEXT DEFAULT 'General',   body TEXT NOT NULL,   created_at TEXT DEFAULT (datetime('now')) );
CREATE TABLE coach_profiles (   staff_id INTEGER PRIMARY KEY,   photo_url TEXT,   tagline TEXT,   bio TEXT,   specialties TEXT,   certifications TEXT,   public_email TEXT,   public_phone TEXT,   instagram_url TEXT,   facebook_url TEXT,   tiktok_url TEXT,   youtube_url TEXT,   booking_url TEXT,   updated_at TEXT );
CREATE TABLE coach_touchpoints (   id INTEGER PRIMARY KEY AUTOINCREMENT,   coach_name TEXT NOT NULL,   client_id INTEGER NOT NULL,   type TEXT NOT NULL DEFAULT 'note',   body TEXT NOT NULL,   created_at TEXT DEFAULT (datetime('now')) );
CREATE TABLE consultations (   id                 INTEGER PRIMARY KEY AUTOINCREMENT,   client_id          INTEGER NOT NULL REFERENCES clients(id),   consult_date       TEXT,   advisor            TEXT,   weight             REAL,   lean_mass          REAL,   body_fat_pct       REAL,   fat_mass           REAL,   bmi                REAL,   goals              TEXT,   medical_notes      TEXT,   diet_habits        TEXT,   assessment_summary TEXT,   advisor_notes      TEXT,   outcome            TEXT,   created_at         TEXT DEFAULT (datetime('now')) );
CREATE TABLE daily_content (id INTEGER PRIMARY KEY AUTOINCREMENT, content_date TEXT, content TEXT, created_at TEXT DEFAULT (datetime('now')), health_tip TEXT, quote TEXT, quote_author TEXT, news_headline TEXT, news_blurb TEXT, generated_at TEXT);
CREATE TABLE daily_intake_logs (id INTEGER PRIMARY KEY AUTOINCREMENT, client_id INTEGER NOT NULL, coach_name TEXT, mood TEXT, diet_quality TEXT, physical_state TEXT, energy_level TEXT, notes TEXT, created_at TEXT DEFAULT (datetime('now')));
CREATE TABLE daily_logs (   id INTEGER PRIMARY KEY AUTOINCREMENT,   client_id INTEGER NOT NULL,   log_date TEXT NOT NULL,   energy INTEGER,   nutrition_score INTEGER,   hydration INTEGER,   sleep_hours REAL,   steps INTEGER,   wins TEXT,   notes TEXT );
CREATE TABLE email_log (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  to_email TEXT NOT NULL,
  subject TEXT,
  context TEXT,
  client_id INTEGER,
  sent INTEGER NOT NULL,
  error TEXT,
  resend_id TEXT,
  sent_at TEXT
);
CREATE TABLE eod_flag_dismissals (   id INTEGER PRIMARY KEY AUTOINCREMENT,   flag_type TEXT NOT NULL,   client_id INTEGER NOT NULL,   dismissed_by TEXT,   dismissed_at TEXT );
CREATE TABLE eod_reports (id INTEGER PRIMARY KEY AUTOINCREMENT, report_date TEXT, content TEXT, created_at TEXT DEFAULT (datetime('now')));
CREATE TABLE eod_submissions (   id INTEGER PRIMARY KEY AUTOINCREMENT,   gym_id INTEGER NOT NULL DEFAULT 1,   author_name TEXT,   author_role TEXT,   log_date TEXT NOT NULL,   notable_wins TEXT,   areas_improvement TEXT,   game_plan TEXT,   additional_notes TEXT,   priority_flags_json TEXT,   status TEXT DEFAULT 'submitted',   submitted_at TEXT,   ww_json TEXT,   sales_json TEXT,   reflect_positive TEXT,   reflect_improve TEXT,   ask_keelin TEXT , client_notes_json TEXT);
CREATE TABLE exercise_favorites (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  client_id INTEGER NOT NULL,
  exercise_name TEXT NOT NULL,
  created_at TEXT DEFAULT (datetime('now')),
  UNIQUE(client_id, exercise_name)
);
CREATE TABLE exercise_videos (   id INTEGER PRIMARY KEY AUTOINCREMENT,   client_id INTEGER NOT NULL,   session_id INTEGER,   exercise_name TEXT,   r2_key TEXT NOT NULL,   recorded_at TEXT DEFAULT (datetime('now')),   note TEXT );
CREATE TABLE feed_posts (
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
CREATE TABLE followups (   id                 INTEGER PRIMARY KEY AUTOINCREMENT,   client_id          INTEGER NOT NULL REFERENCES clients(id),   followup_date      TEXT,   advisor            TEXT,   prev_weight        REAL, now_weight   REAL,   prev_lean          REAL, now_lean     REAL,   prev_body_fat_pct  REAL, now_body_fat_pct REAL,   prev_fat_mass      REAL, now_fat_mass REAL,   prev_bmi           REAL, now_bmi      REAL,   training_progress  TEXT,   obstacles          TEXT,   mindset            TEXT,   assessment_summary TEXT,   advisor_notes      TEXT,   outcome            TEXT,   created_at         TEXT DEFAULT (datetime('now')) , next_followup_date TEXT, program_freq TEXT, program_length TEXT, goals TEXT, full_intake_json TEXT);
CREATE TABLE group_class_sessions (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  class_id INTEGER NOT NULL,
  session_date TEXT NOT NULL,
  stations_json TEXT,
  warmup_json TEXT,
  cooldown_json TEXT,
  created_at TEXT,
  UNIQUE(class_id, session_date)
);
CREATE TABLE group_classes (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  name TEXT NOT NULL,
  day_of_week INTEGER NOT NULL,
  start_time TEXT NOT NULL,
  duration_minutes INTEGER DEFAULT 60,
  room TEXT,
  equipment_pool TEXT,
  rest_seconds INTEGER DEFAULT 40,
  focus TEXT,
  coach TEXT,
  gym_id INTEGER DEFAULT 1,
  active INTEGER DEFAULT 1,
  created_at TEXT
, exercises_json TEXT, rounds INTEGER DEFAULT 1, work_seconds INTEGER DEFAULT 40);
CREATE TABLE group_members (
  group_id INTEGER NOT NULL,
  client_id INTEGER NOT NULL,
  joined_at TEXT,
  PRIMARY KEY (group_id, client_id)
);
CREATE TABLE guest_pass_log (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  class_name TEXT,
  class_date TEXT,
  source TEXT,
  clicked_at TEXT
);
CREATE TABLE guest_shares (id INTEGER PRIMARY KEY AUTOINCREMENT, client_id INTEGER, channel TEXT, shared_at TEXT);
CREATE TABLE gym_calendar_events (   id INTEGER PRIMARY KEY AUTOINCREMENT,   gym_id INTEGER DEFAULT 1,   title TEXT NOT NULL,   event_date TEXT NOT NULL,   end_date TEXT,   type TEXT DEFAULT 'event',   notes TEXT,   created_by TEXT,   created_at TEXT );
CREATE TABLE gym_events (id INTEGER PRIMARY KEY AUTOINCREMENT, title TEXT, blurb TEXT, event_date TEXT, image_url TEXT, visible INTEGER DEFAULT 1, created_at TEXT DEFAULT (datetime('now')));
CREATE TABLE gym_quotas (id INTEGER PRIMARY KEY AUTOINCREMENT, gym_id INTEGER NOT NULL, month TEXT NOT NULL, tcv_goal REAL NOT NULL, UNIQUE(gym_id, month));
CREATE TABLE gyms (id INTEGER PRIMARY KEY AUTOINCREMENT, name TEXT NOT NULL, city TEXT, state TEXT, director TEXT, active INTEGER DEFAULT 1, created_at TEXT DEFAULT (datetime('now')), is_demo INTEGER DEFAULT 0, facebook_url TEXT, instagram_url TEXT, tiktok_url TEXT);
CREATE TABLE help_requests (   id INTEGER PRIMARY KEY AUTOINCREMENT,   gym_id INTEGER NOT NULL,   eod_id INTEGER,   author_name TEXT,   request_text TEXT NOT NULL,   status TEXT DEFAULT 'open',   resolution_note TEXT,   created_at TEXT DEFAULT (datetime('now')),   resolved_at TEXT );
CREATE TABLE hr_documents (id INTEGER PRIMARY KEY AUTOINCREMENT, employee_id INTEGER NOT NULL, doc_type TEXT NOT NULL, completed INTEGER DEFAULT 0, completed_date TEXT, notes TEXT, entered_by TEXT, created_at TEXT DEFAULT (datetime('now')));
CREATE TABLE hr_onboarding (id INTEGER PRIMARY KEY AUTOINCREMENT, employee_id INTEGER NOT NULL, task TEXT NOT NULL, completed INTEGER DEFAULT 0, completed_date TEXT, role TEXT, entered_by TEXT, created_at TEXT DEFAULT (datetime('now')));
CREATE TABLE hr_performance (id INTEGER PRIMARY KEY AUTOINCREMENT, employee_id INTEGER NOT NULL, entry_date TEXT NOT NULL, entry_type TEXT DEFAULT 'note', notes TEXT, entered_by TEXT, visible_to TEXT DEFAULT 'dani', created_at TEXT DEFAULT (datetime('now')));
CREATE TABLE huddle_messages (id INTEGER PRIMARY KEY AUTOINCREMENT, channel TEXT NOT NULL, gym_id INTEGER, author TEXT NOT NULL, body TEXT NOT NULL, thread_ref TEXT, created_at TEXT DEFAULT (datetime('now')));
CREATE TABLE inbody_scans (   id INTEGER PRIMARY KEY AUTOINCREMENT,   client_id INTEGER NOT NULL REFERENCES clients(id),   scan_date TEXT,   file_url TEXT,   weight REAL,   lean_mass REAL,   body_fat_pct REAL,   fat_mass REAL,   bmi REAL,   skeletal_muscle REAL,   notes TEXT,   source TEXT,   created_at TEXT DEFAULT (datetime('now')) , segmental_json TEXT);
CREATE TABLE inbody_webhook_log (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  received_at TEXT DEFAULT (datetime('now')),
  raw_json TEXT NOT NULL,
  matched_client_id INTEGER,
  matched INTEGER DEFAULT 0,
  parsed_into_scan INTEGER DEFAULT 0,
  scan_id INTEGER,
  note TEXT
);
CREATE TABLE kpi_snapshots (   id INTEGER PRIMARY KEY AUTOINCREMENT,   gym_id INTEGER NOT NULL DEFAULT 1,   snapshot_date TEXT NOT NULL,   new_members INTEGER,   cancels INTEGER,   pt_revenue REAL,   dpc REAL,   waiver_pct REAL,   closing_pct REAL,   active_members INTEGER,   membership_goal INTEGER,   entered_by TEXT,   created_at TEXT DEFAULT (datetime('now')) );
CREATE TABLE lead_sources (   id          INTEGER PRIMARY KEY AUTOINCREMENT,   name        TEXT NOT NULL,   type        TEXT NOT NULL,   created_at  TEXT DEFAULT (datetime('now')) );
CREATE TABLE leads (   id                  INTEGER PRIMARY KEY AUTOINCREMENT,   lead_type           TEXT NOT NULL,   business_name       TEXT,   contact_name        TEXT,   email               TEXT,   phone               TEXT,   address             TEXT,   city                TEXT,   state               TEXT,   zip                 TEXT,   category            TEXT,   distance_mi         REAL,   source_id           INTEGER REFERENCES lead_sources(id),   status              TEXT DEFAULT 'new',   interest_level      INTEGER,   est_annual_value    REAL,   ai_score            REAL,   ai_notes            TEXT,   next_action         TEXT,   next_action_date    TEXT,   assigned_to         TEXT,   converted_client_id INTEGER REFERENCES clients(id),   created_at          TEXT DEFAULT (datetime('now')),   updated_at          TEXT DEFAULT (datetime('now')) , gym_id INTEGER DEFAULT 1, is_member INTEGER DEFAULT 0, member_client_id INTEGER, first_name TEXT, last_name TEXT, notes TEXT, advisor TEXT);
CREATE TABLE maintenance_log (id INTEGER PRIMARY KEY AUTOINCREMENT, gym_id INTEGER, reported_date TEXT, item TEXT, status TEXT, notes TEXT, entered_by TEXT, created_at TEXT DEFAULT (datetime('now')));
CREATE TABLE marketing_media (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  client_id INTEGER,
  class_id INTEGER,
  media_type TEXT NOT NULL,
  r2_key TEXT NOT NULL,
  captured_at TEXT,
  captured_by TEXT,
  notes TEXT,
  gym_id INTEGER DEFAULT 1
);
CREATE TABLE meal_photos (   item_name TEXT PRIMARY KEY,   photo_url TEXT,   updated_at TEXT );
CREATE TABLE meal_plans (   id INTEGER PRIMARY KEY AUTOINCREMENT,   client_id INTEGER NOT NULL REFERENCES clients(id),   week_of TEXT,   macros_summary TEXT,   plan_html TEXT,   shopping_list TEXT,   generated_at TEXT,   emailed INTEGER DEFAULT 0,   created_at TEXT DEFAULT (datetime('now')) , shopping_items_json TEXT, shopping_checked_json TEXT, plan_json TEXT, ack_signature TEXT, ack_at TEXT);
CREATE TABLE meal_profiles (   id INTEGER PRIMARY KEY AUTOINCREMENT,   client_id INTEGER NOT NULL REFERENCES clients(id),   package TEXT,   goal_type TEXT,   calories INTEGER,   protein_g INTEGER,   carbs_g INTEGER,   fat_g INTEGER,   excluded_proteins TEXT,   excluded_vegetables TEXT,   excluded_fruits TEXT,   allergies TEXT,   conditions TEXT,   notes TEXT,   created_at TEXT DEFAULT (datetime('now')),   updated_at TEXT DEFAULT (datetime('now')) );
CREATE TABLE meals (   id INTEGER PRIMARY KEY AUTOINCREMENT,   client_id INTEGER NOT NULL,   meal_date TEXT NOT NULL,   meal_time TEXT,   meal_type TEXT,   photo_key TEXT,   calories INTEGER,   protein_g INTEGER,   carbs_g INTEGER,   fat_g INTEGER,   items_json TEXT,   source TEXT,   logged_at TEXT );
CREATE TABLE member_groups (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  name TEXT NOT NULL,
  type TEXT DEFAULT 'team',
  created_at TEXT
);
CREATE TABLE members (id INTEGER PRIMARY KEY AUTOINCREMENT, gym_id INTEGER NOT NULL DEFAULT 1, abc_agreement TEXT UNIQUE, barcode TEXT, first_name TEXT, last_name TEXT, phone TEXT, email TEXT, membership_type TEXT, member_status TEXT, join_date TEXT, welcome_workout_outcome TEXT, sales_person TEXT, is_pt_client INTEGER DEFAULT 0, client_id INTEGER, source TEXT DEFAULT 'abc_import', created_at TEXT DEFAULT (datetime('now')), updated_at TEXT);
CREATE TABLE notifications (id INTEGER PRIMARY KEY AUTOINCREMENT, recipient TEXT NOT NULL, type TEXT NOT NULL, payload_json TEXT, read INTEGER DEFAULT 0, created_at TEXT DEFAULT (datetime('now')));
CREATE TABLE outreach_log (   id            INTEGER PRIMARY KEY AUTOINCREMENT,   lead_id       INTEGER REFERENCES leads(id),   client_id     INTEGER REFERENCES clients(id),   sent_at       TEXT,   channel       TEXT,   direction     TEXT,   subject       TEXT,   body          TEXT,   status        TEXT,   ai_generated  INTEGER DEFAULT 0,   created_at    TEXT DEFAULT (datetime('now')) );
CREATE TABLE pantry_items (   id INTEGER PRIMARY KEY AUTOINCREMENT,   client_id INTEGER NOT NULL,   item_name TEXT NOT NULL,   have_it INTEGER DEFAULT 1,   updated_at TEXT );
CREATE TABLE partner_taps (id INTEGER PRIMARY KEY AUTOINCREMENT, partner_id INTEGER, client_id INTEGER, tapped_at TEXT);
CREATE TABLE partners (id INTEGER PRIMARY KEY AUTOINCREMENT, name TEXT NOT NULL, blurb TEXT, offer TEXT, promo_code TEXT, link_url TEXT, logo_url TEXT, active INTEGER DEFAULT 1, sort_order INTEGER DEFAULT 0, created_at TEXT DEFAULT (datetime('now')));
CREATE TABLE portal_messages (   id INTEGER PRIMARY KEY AUTOINCREMENT,   client_id INTEGER NOT NULL,   coach_name TEXT,   sender TEXT NOT NULL,   body TEXT NOT NULL,   created_at TEXT DEFAULT (datetime('now')),   read INTEGER DEFAULT 0 , meal_id INTEGER);
CREATE TABLE presence_checkins (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  client_id INTEGER NOT NULL,
  gym_id INTEGER DEFAULT 1,
  checked_in_at TEXT NOT NULL
);
CREATE TABLE programs (   id                    INTEGER PRIMARY KEY AUTOINCREMENT,   client_id             INTEGER NOT NULL REFERENCES clients(id),   program_name          TEXT,   start_date            TEXT,   end_date              TEXT,   status                TEXT,   trainerize_program_id TEXT,   created_at            TEXT DEFAULT (datetime('now')),   updated_at            TEXT DEFAULT (datetime('now')) );
CREATE TABLE progress_photos (   id INTEGER PRIMARY KEY AUTOINCREMENT,   client_id INTEGER NOT NULL,   captured_at TEXT,   pose TEXT DEFAULT 'other',   r2_key TEXT NOT NULL,   source TEXT DEFAULT 'adhoc',   created_at TEXT DEFAULT (datetime('now')) );
CREATE TABLE client_recaps (   id INTEGER PRIMARY KEY AUTOINCREMENT,   client_id INTEGER NOT NULL,   report_type TEXT NOT NULL,   pdf_key TEXT,   summary TEXT,   advisor TEXT,   emailed_to TEXT,   created_at TEXT DEFAULT (datetime('now')) );
CREATE TABLE prospect_log (   id INTEGER PRIMARY KEY AUTOINCREMENT,   gym_id INTEGER NOT NULL DEFAULT 1,   name TEXT,   email TEXT,   phone TEXT,   touchpoint_count INTEGER DEFAULT 0,   last_contact_date TEXT,   source TEXT DEFAULT 'clubos_followup_audit',   status TEXT DEFAULT 'not_yet_contacted',   campaign_tag TEXT,   created_at TEXT DEFAULT (datetime('now')),   updated_at TEXT , is_member INTEGER DEFAULT 0, member_client_id INTEGER);
CREATE TABLE pt_appointments (   id INTEGER PRIMARY KEY AUTOINCREMENT,   appointment_date TEXT NOT NULL,   appointment_time TEXT,   appointment_type TEXT NOT NULL,   prospect_name TEXT,   prospect_phone TEXT,   prospect_email TEXT,   client_id INTEGER,   assigned_coach TEXT,   status TEXT DEFAULT 'scheduled',   gym_id INTEGER DEFAULT 1,   notes TEXT,   created_at TEXT,   updated_at TEXT , reschedule_date TEXT, reschedule_time TEXT, reschedule_tbd INTEGER, advisor TEXT, reminder_sent_at TEXT);
CREATE TABLE pt_leads (
  id INTEGER PRIMARY KEY,
  coach_name TEXT NOT NULL,
  name TEXT NOT NULL,
  phone TEXT,
  source TEXT,
  note TEXT,
  status TEXT DEFAULT 'new',
  created_at TEXT DEFAULT (datetime('now')),
  updated_at TEXT DEFAULT (datetime('now'))
);
CREATE TABLE pt_reps (id INTEGER PRIMARY KEY AUTOINCREMENT, gym_id INTEGER NOT NULL, name TEXT NOT NULL, role TEXT DEFAULT 'coach', active INTEGER DEFAULT 1, created_at TEXT DEFAULT (datetime('now')));
CREATE TABLE pt_sales (id INTEGER PRIMARY KEY AUTOINCREMENT, gym_id INTEGER NOT NULL, member_id INTEGER, client_name TEXT, package_name TEXT, sessions INTEGER, amount REAL NOT NULL, sold_by TEXT, sale_date TEXT NOT NULL, created_at TEXT DEFAULT (datetime('now')), sale_type TEXT DEFAULT 'new', checklist_json TEXT);
CREATE TABLE punch_list_items (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  gym_id INTEGER DEFAULT 1,
  category TEXT NOT NULL,
  description TEXT NOT NULL,
  area TEXT,
  urgency TEXT DEFAULT 'normal',
  status TEXT DEFAULT 'open',
  reported_by TEXT,
  reported_at TEXT,
  resolved_by TEXT,
  resolved_at TEXT,
  notes TEXT
);
CREATE TABLE recipes (   id INTEGER PRIMARY KEY AUTOINCREMENT,   client_id INTEGER,   title TEXT NOT NULL,   meal_type TEXT,   prep_min INTEGER,   calories INTEGER,   protein_g INTEGER,   carbs_g INTEGER,   fat_g INTEGER,   ingredients_json TEXT,   steps_json TEXT,   tags TEXT,   created_at TEXT , supplement_note TEXT);
CREATE TABLE saved_programs (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  name TEXT NOT NULL,
  coach TEXT,
  day_routines_json TEXT NOT NULL,
  created_at TEXT
);
CREATE TABLE schedule_changes (id INTEGER PRIMARY KEY AUTOINCREMENT, gym_id INTEGER, log_date TEXT, change_date TEXT, original_employee TEXT, coverage_employee TEXT, shift_time TEXT, reason TEXT, entered_by TEXT, created_at TEXT DEFAULT (datetime('now')));
CREATE TABLE scheduled_sessions (   id INTEGER PRIMARY KEY AUTOINCREMENT,   client_id INTEGER NOT NULL,   scheduled_date TEXT NOT NULL,   program_name TEXT NOT NULL,   focus_notes TEXT,   status TEXT DEFAULT 'scheduled',   created_by TEXT,   created_at TEXT DEFAULT (datetime('now')) , assigned_coach TEXT, exercises_json TEXT, overload_mode TEXT DEFAULT 'progressive', rotation_weeks INTEGER DEFAULT 0, duration_min INTEGER, source TEXT DEFAULT 'coach');
CREATE TABLE self_workouts (id INTEGER PRIMARY KEY AUTOINCREMENT, client_id INTEGER NOT NULL, workout_date TEXT, title TEXT, exercises_json TEXT, duration_min INTEGER, notes TEXT, created_at TEXT DEFAULT (datetime('now')));
CREATE TABLE shake_counts (id INTEGER PRIMARY KEY AUTOINCREMENT, gym_id INTEGER, count_date TEXT, opening_count INTEGER, closing_count INTEGER, daily_total INTEGER, entered_by TEXT, created_at TEXT DEFAULT (datetime('now')));
CREATE TABLE staff_auth (   id INTEGER PRIMARY KEY AUTOINCREMENT,   staff_id INTEGER NOT NULL,   email TEXT UNIQUE NOT NULL,   pin_hash TEXT NOT NULL,   must_change_pin INTEGER DEFAULT 1,   active INTEGER DEFAULT 1,   last_login TEXT,   reset_code_hash TEXT,   reset_expires TEXT );
CREATE TABLE staff_availability (   id INTEGER PRIMARY KEY AUTOINCREMENT,   staff_id INTEGER NOT NULL,   type TEXT NOT NULL,   day_of_week INTEGER,   specific_date TEXT,   start_time TEXT,   end_time TEXT,   available INTEGER DEFAULT 1,   created_at TEXT,   updated_at TEXT , status TEXT DEFAULT 'pending', reviewed_by TEXT, reviewed_at TEXT);
CREATE TABLE staff_performance (id INTEGER PRIMARY KEY AUTOINCREMENT, gym_id INTEGER, week_of TEXT, employee_name TEXT, role TEXT, closing_pct REAL, booking_pct REAL, show_pct REAL, performance_status TEXT, entered_by TEXT, created_at TEXT DEFAULT (datetime('now')));
CREATE TABLE staff_roster (   id INTEGER PRIMARY KEY AUTOINCREMENT,   gym_id INTEGER DEFAULT 1,   name TEXT NOT NULL,   role TEXT NOT NULL,   eod_required INTEGER DEFAULT 0,   eod_template TEXT,   active INTEGER DEFAULT 1,   email TEXT,   phone TEXT,   hire_date TEXT,   notes TEXT,   created_at TEXT DEFAULT (datetime('now')) , can_grant_app_access INTEGER DEFAULT 0, sees_all_clients INTEGER DEFAULT 0);
CREATE TABLE staff_shifts (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  staff_id INTEGER NOT NULL,
  staff_name TEXT NOT NULL,
  role TEXT NOT NULL,
  gym_id INTEGER DEFAULT 1,
  shift_date TEXT NOT NULL,
  start_time TEXT NOT NULL,
  end_time TEXT NOT NULL,
  status TEXT DEFAULT 'scheduled',
  covered_by_staff_id INTEGER,
  covered_by_name TEXT,
  coverage_note TEXT,
  created_by TEXT,
  created_at TEXT,
  updated_at TEXT
);
CREATE TABLE tag_usage (tag TEXT PRIMARY KEY, use_count INTEGER DEFAULT 0, last_used TEXT);
CREATE TABLE time_off_requests (   id INTEGER PRIMARY KEY AUTOINCREMENT,   staff_id INTEGER NOT NULL,   start_date TEXT NOT NULL,   end_date TEXT NOT NULL,   reason TEXT,   status TEXT DEFAULT 'pending',   requested_at TEXT,   reviewed_by TEXT,   reviewed_at TEXT );
CREATE TABLE touchpoints (   id               INTEGER PRIMARY KEY AUTOINCREMENT,   lead_id          INTEGER REFERENCES leads(id),   client_id        INTEGER REFERENCES clients(id),   contact_date     TEXT,   channel          TEXT,   direction        TEXT,   summary          TEXT,   next_action      TEXT,   next_action_date TEXT,   created_at       TEXT DEFAULT (datetime('now')) , source_table TEXT DEFAULT 'leads', outcome TEXT, advisor TEXT);
CREATE TABLE training_sessions (   id                    INTEGER PRIMARY KEY AUTOINCREMENT,   client_id             INTEGER NOT NULL REFERENCES clients(id),   program_id            INTEGER REFERENCES programs(id),   session_date          TEXT,   workout_name          TEXT,   completed             INTEGER DEFAULT 0,   duration_min          INTEGER,   trainerize_workout_id TEXT,   source                TEXT,   created_at            TEXT DEFAULT (datetime('now')) , entry_type TEXT, coach TEXT, client_name TEXT, focus_areas TEXT, session_score INTEGER, energy_score INTEGER, homework TEXT, next_goal TEXT, notes TEXT, method TEXT, follow_up INTEGER, follow_up_detail TEXT);
CREATE TABLE win_reactions (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  win_id INTEGER NOT NULL,
  client_id INTEGER NOT NULL,
  emoji TEXT NOT NULL,
  created_at TEXT,
  UNIQUE(win_id, client_id, emoji)
);
CREATE TABLE workouts (   id INTEGER PRIMARY KEY AUTOINCREMENT,   client_id INTEGER NOT NULL REFERENCES clients(id),   workout_date TEXT,   title TEXT,   file_url TEXT,   exercises_json TEXT,   total_volume REAL,   notes TEXT,   source TEXT,   created_at TEXT DEFAULT (datetime('now')) );

CREATE TABLE scheduled_meals (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  client_id INTEGER NOT NULL,
  scheduled_date TEXT NOT NULL,
  meal_type TEXT,
  title TEXT NOT NULL,
  calories INTEGER,
  protein_g INTEGER,
  carbs_g INTEGER,
  fat_g INTEGER,
  source_recipe_id INTEGER,
  source TEXT DEFAULT 'coachs_table',
  status TEXT DEFAULT 'scheduled',
  created_at TEXT DEFAULT (datetime('now'))
);
-- Seed row for THIS club -- edit the values below before running, or run
-- as-is and update via portal-admin.html/command-center.html afterward.
-- Deliberately NO seed row here. Leaving gyms genuinely empty is what
-- triggers the Club Setup wizard (club-setup.html) on first login --
-- the new club fills in their own name, city, director, and everything
-- else themselves, rather than a hardcoded placeholder that has to be
-- found and edited manually. See NEW_CLUB_SETUP.md Step 9.

-- Added July 13 2026: stores every Jotform check-in submission for this
-- club, tied back to a client via the hidden Client ID field on the
-- form. See /jotform/webhook in worker-v34.js.
CREATE TABLE IF NOT EXISTS jotform_responses (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  client_id INTEGER,
  form_id TEXT,
  submission_id TEXT,
  raw_json TEXT,
  received_at TEXT
);
CREATE INDEX IF NOT EXISTS idx_jotform_responses_client ON jotform_responses(client_id);
