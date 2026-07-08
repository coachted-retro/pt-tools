-- Member linking on the two tables that feed the People tab
ALTER TABLE leads ADD COLUMN is_member INTEGER DEFAULT 0;
ALTER TABLE leads ADD COLUMN member_client_id INTEGER;
ALTER TABLE prospect_log ADD COLUMN is_member INTEGER DEFAULT 0;
ALTER TABLE prospect_log ADD COLUMN member_client_id INTEGER;

-- Touchpoints table already exists and is live for the Businesses tab
-- (lead_id, contact_date, channel, direction, summary). Extending it so
-- People-tab touchpoints can share it safely: source_table disambiguates
-- leads-table rows from prospect_log rows (both use separate id spaces),
-- and outcome/advisor were being captured in the UI but silently dropped
-- before reaching D1 — now persisted for real.
ALTER TABLE touchpoints ADD COLUMN source_table TEXT DEFAULT 'leads';
ALTER TABLE touchpoints ADD COLUMN outcome TEXT;
ALTER TABLE touchpoints ADD COLUMN advisor TEXT;
