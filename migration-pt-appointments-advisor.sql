-- Scheduling an appointment used to ask for "Coach" at booking time, but
-- coach assignment actually happens later on the client's own profile
-- (clients.coach) once they commit to PT -- at scheduling time what's
-- actually needed is who's running the first meeting (the advisor).
-- clients.advisor already existed; pt_appointments had no equivalent.
-- Applied directly to production via the Cloudflare D1 connector; this
-- file documents it for repo history.
ALTER TABLE pt_appointments ADD COLUMN advisor TEXT;
