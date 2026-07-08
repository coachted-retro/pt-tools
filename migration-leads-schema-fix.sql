-- The People-tab manual "+ Add" form has always inserted first_name,
-- last_name, notes, and advisor into the leads table, but the leads
-- table never had those columns (it had contact_name instead, and no
-- notes/advisor equivalent at all). Every manual add since this tool
-- was built silently failed to persist to D1 as a result -- confirmed
-- zero non-business rows existed in the live table. Applied directly
-- against production via the Cloudflare D1 connector on 2026-07-07;
-- this file documents it for repo history.
ALTER TABLE leads ADD COLUMN first_name TEXT;
ALTER TABLE leads ADD COLUMN last_name TEXT;
ALTER TABLE leads ADD COLUMN notes TEXT;
ALTER TABLE leads ADD COLUMN advisor TEXT;
