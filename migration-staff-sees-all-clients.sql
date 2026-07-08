-- Ted, Danielle, and Roman manage/oversee everyone's clients (monthly
-- check-ins, coverage, etc.) and need to see the full roster, not just
-- their own assigned clients -- but that can't be a role-based rule since
-- Roman is role='PT Coach', same as any future coach who should NOT get
-- that visibility. Needs a per-person flag instead.
-- Applied directly to production via the Cloudflare D1 connector (set to 1
-- for Franchise Owner/Director of Fitness/General Manager/Men's Training
-- Lead roles, plus Roman Benedetti by name); this file documents it for
-- repo history.
ALTER TABLE staff_roster ADD COLUMN sees_all_clients INTEGER DEFAULT 0;
