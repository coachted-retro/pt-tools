-- Fixes real schema drift found July 11 2026: worker-v34.js's Monthly
-- Challenge and Coach's Edge/Word of the Day/Inside Retro features were
-- writing/reading columns that never actually existed on these two
-- tables, causing "D1_ERROR: table X has no column named Y" every time
-- either was generated. A migration for daily_content existed already
-- (migration-circle-tables.sql) but used CREATE TABLE IF NOT EXISTS
-- against a table that already existed with an older, thinner schema --
-- so it silently did nothing. challenges never had a migration at all.
--
-- Applied live July 11 2026 to Fairless Hills' retro-crm AND all 11
-- pilot club D1s via the Cloudflare connector directly. This file exists
-- so the fix is documented and reproducible, and so any club database
-- created before this date (if ever restored from an old backup, or
-- provisioned from a stale schema.sql) can be brought current.
--
-- Safe to re-run: ALTER TABLE ADD COLUMN fails loudly (not silently) if
-- the column already exists, so don't blindly re-run this against a
-- database already on the current schema -- check first.

ALTER TABLE challenges ADD COLUMN tagline TEXT;
ALTER TABLE challenges ADD COLUMN rules TEXT;
ALTER TABLE challenges ADD COLUMN points_system TEXT;
ALTER TABLE challenges ADD COLUMN badge_label TEXT;
ALTER TABLE challenges ADD COLUMN generated_at TEXT;

ALTER TABLE daily_content ADD COLUMN health_tip TEXT;
ALTER TABLE daily_content ADD COLUMN quote TEXT;
ALTER TABLE daily_content ADD COLUMN quote_author TEXT;
ALTER TABLE daily_content ADD COLUMN news_headline TEXT;
ALTER TABLE daily_content ADD COLUMN news_blurb TEXT;
ALTER TABLE daily_content ADD COLUMN generated_at TEXT;
