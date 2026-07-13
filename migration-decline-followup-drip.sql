-- Supports the automated 42-day drip follow-up for declined prospects.
-- decline_date: when they said no, set by the consultation tool.
-- followup_email_sent_at: set once the drip email actually goes out, so
-- the nightly scan never sends it twice.
ALTER TABLE clients ADD COLUMN decline_date TEXT;
ALTER TABLE clients ADD COLUMN followup_email_sent_at TEXT;
