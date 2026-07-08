-- Club OS Bookings (coach-crm.html) Mark Done / Reschedule / No Show never
-- captured notes or a real reschedule date -- just flipped status with no
-- context, unlike the nicer Consultations/Check-Ins/Follow-Ups modals that
-- already had this. Bringing it up to the same standard.
-- Applied directly against production via the Cloudflare D1 connector on
-- 2026-07-08; this file documents it for repo history.
ALTER TABLE clubos_appointments ADD COLUMN notes TEXT;
ALTER TABLE clubos_appointments ADD COLUMN reschedule_date TEXT;
ALTER TABLE clubos_appointments ADD COLUMN reschedule_time TEXT;
ALTER TABLE clubos_appointments ADD COLUMN reschedule_tbd INTEGER DEFAULT 0;
