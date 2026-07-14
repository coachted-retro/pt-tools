-- Links a staff_roster row to their own clients row, so a coach who is
-- also a PT client (trains themselves) can jump straight into their own
-- Training tab from the Coach app with one tap, using their existing
-- staff session -- no separate client login required.
-- NULL by default: most staff won't have a linked client record until
-- Ted (or whoever manages staff_roster) sets one up for them explicitly.
ALTER TABLE staff_roster ADD COLUMN linked_client_id INTEGER;
