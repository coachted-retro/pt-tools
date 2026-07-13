-- Supports automated day-before appointment reminder emails.
-- reminder_sent_at: set once the reminder actually goes out, so the
-- nightly scan never sends it twice for the same appointment.
ALTER TABLE pt_appointments ADD COLUMN reminder_sent_at TEXT;
