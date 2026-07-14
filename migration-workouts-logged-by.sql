-- Attributes a coach-led, gym-floor-logged workout to the actual coach
-- who ran the session, so it's never ambiguous whether a session was
-- run in person by a coach or logged by the client on their own.
ALTER TABLE workouts ADD COLUMN logged_by TEXT;
