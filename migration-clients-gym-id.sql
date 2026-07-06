-- The clients table has never had a gym_id column despite schema-regional.sql
-- having written this ALTER statement long ago — it was apparently never run.
-- DEFAULT 1 means every existing real client (all Fairless Hills today)
-- is automatically correctly tagged without a follow-up UPDATE.
ALTER TABLE clients ADD COLUMN gym_id INTEGER DEFAULT 1;
ALTER TABLE leads ADD COLUMN gym_id INTEGER DEFAULT 1;
