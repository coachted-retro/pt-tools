-- Daily "Members By Join Date" ABC report import needs a reliable unique
-- key to dedupe against on repeat imports -- Agreement # is ABC's own
-- canonical identifier, far more reliable than name/phone matching alone.
-- Applied directly to production via the Cloudflare D1 connector; this
-- file documents it for repo history.
ALTER TABLE clients ADD COLUMN agreement_number TEXT;
ALTER TABLE clients ADD COLUMN barcode TEXT;
