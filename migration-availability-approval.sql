-- Adds manager-approval workflow to staff_availability.
-- Run against retro-crm. Safe to re-run if columns already exist (D1 will
-- just error on the ALTER if so — in that case this has already been applied).

ALTER TABLE staff_availability ADD COLUMN status TEXT DEFAULT 'pending';
ALTER TABLE staff_availability ADD COLUMN reviewed_by TEXT;
ALTER TABLE staff_availability ADD COLUMN reviewed_at TEXT;
