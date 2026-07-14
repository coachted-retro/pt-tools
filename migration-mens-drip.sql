-- Supports the bi-weekly educational drip campaign to male gym members
-- who are not yet personal training clients. Tracks cadence and which
-- piece of the rotating content sequence each member is on.
ALTER TABLE clients ADD COLUMN mens_drip_last_sent_at TEXT;
ALTER TABLE clients ADD COLUMN mens_drip_sequence INTEGER DEFAULT 0;

-- Real unsubscribe support -- required for bulk/promotional email under
-- CAN-SPAM, distinct from one-to-one transactional messages tied to an
-- actual appointment or check-in. Checked before every send in this
-- campaign; a client can also be opted out manually if they call in.
ALTER TABLE clients ADD COLUMN email_opt_out INTEGER DEFAULT 0;
