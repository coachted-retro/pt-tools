-- Danielle's request: custom, freeform, searchable tags per client. The
-- system should learn which tags get used most often so they can be
-- suggested instead of retyped every time, rather than needing a fixed
-- predefined tag list maintained by hand.
-- Applied directly to production via the Cloudflare D1 connector; this
-- file documents it for repo history.
ALTER TABLE clients ADD COLUMN tags TEXT;
CREATE TABLE IF NOT EXISTS tag_usage (tag TEXT PRIMARY KEY, use_count INTEGER DEFAULT 0, last_used TEXT);
