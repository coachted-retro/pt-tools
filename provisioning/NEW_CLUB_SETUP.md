# Setting up a new club — step by step

This turns Fairless Hills' proven codebase into a working, blank-slate
system for a new club. Every club gets its own D1 database and its own
Worker, running the exact same code. Budget about 20-30 minutes per club
once you've done the first one.

---

## Before you start

Decide the club's short internal name — no spaces, all lowercase, e.g.
`fair-lawn`, `west-chester`. You'll use this consistently in every step
below so nothing gets mismatched.

---

## Step 1: Create the D1 database

In the Cloudflare dashboard: Workers & Pages → D1 → Create database.

Name it: `retro-fitness-{club-name}` (e.g. `retro-fitness-fair-lawn`).

Once created, open it, go to the Console tab, and paste in the full
contents of `schema.sql` (in this same folder). Before running it, edit
the last line — the `INSERT INTO gyms` statement — with this club's real
name, city, state, and director name. Run it.

Confirm it worked: run `SELECT * FROM gyms;` in the console — you should
see one row with this club's real info, not "REPLACE WITH CLUB NAME."

## Step 2: Create the Worker

Workers & Pages → Create → Worker. Name it something like
`retro-{club-name}` (e.g. `retro-fair-lawn`).

Paste in the full contents of `worker-v34.js` (the SAME file Fairless
Hills uses — don't create a club-specific fork of the code, that's how
bugs get fixed in one place and not another). Deploy it.

## Step 3: Bind the new D1 database to this new Worker

In the new Worker's Settings → Bindings → Add a D1 database binding.
Variable name must be exactly `DB` (capital letters, matching what the
code expects). Select the database you created in Step 1. Save.

## Step 4: Add the same secrets/variables as Fairless Hills

In Settings → Variables, add these (copy the values from the Fairless
Hills worker, broken-cake-e9c2, Settings → Variables):

- `ANTHROPIC_KEY`
- `JWT_SECRET`
- `ADMIN_KEY`
- `RESEND_KEY` (if email features are wanted for this club)
- `MAIL_FROM` (if using email)
- Any others you see listed on the Fairless Hills worker's Variables tab
  that aren't obviously Fairless-Hills-specific

## Step 5: Set up R2 storage for this club (photos, videos, uploads)

R2 → Create bucket → name it `{club-name}-photos`. Bind it to the new
Worker the same way as the D1 database (Settings → Bindings → R2 bucket,
variable name `PHOTOS`).

## Step 6: Point the frontend files at the new Worker

46 files reference the Fairless Hills worker URL
(`broken-cake-e9c2.tedscholl.workers.dev`). Most declare it as a
constant near the top of the `<script>` section — but the constant name
varies (`WORKER`, `BIZ_WORKER`, `CAL_BASE`, `FFU_WORKER` all exist), and
two files (`fitness-consultation-tool.html`,
`fitness-monthly-checkin.html`) have it hardcoded inline with no clean
constant at all, confirmed by checking directly rather than assuming.

Don't search for the constant names — search for the literal string
`broken-cake-e9c2` across every file, and replace every hit with the new
club's worker URL. That's the only search guaranteed not to miss one:

```
grep -l "broken-cake-e9c2" *.html
```
run that first to see the full list (46 files as of tonight), then
replace the domain in every one of them.

This is the single most error-prone manual step — a missed file means
that one page silently talks to Fairless Hills' database instead of this
club's. Worth a careful pass, then a spot check of a few different
pages afterward to confirm they're hitting the new Worker (check the
Network tab in browser dev tools, or just confirm the club's own name
shows up correctly per Step 8).

## Step 7: Add the staff roster and PIN access

Use `staff-setup.html` (or `portal-admin.html`) against the new site to
add this club's real staff, matching the same process already used for
Fairless Hills. Nobody can log in until this is done — the whole system
requires a real staff_auth row per person.

## Step 8: Confirm the club's own name shows correctly

Check `member-app.html`'s header, `coach-crm.html`, and any other page
that displays the gym name — confirm it's pulling this club's real name
from the `gyms` table (Step 1), not showing "Fairless Hills" anywhere.

## Step 9: Smoke test before handing it off

At minimum, before calling a club "ready":
- [ ] A staff member can actually log in
- [ ] A test client can log in (create one via portal-admin.html first)
- [ ] The client app loads without errors and shows this club's name
- [ ] A coach can open coach-crm.html and see an empty (not Fairless
      Hills') client list
- [ ] Submitting a test EOD works and doesn't error

That's the real bar for "ready for a pilot" — not "every feature has
been used," but "the basic path works and nothing crashes."

---

## What's genuinely still open after this (not blocking, but real)

- Keelin's master dashboard (`keelin-dashboard.html`) currently only
  knows how to query ONE Worker/D1. Aggregating across 11+ separate
  clubs needs real work — not done yet. Until then, Keelin checks each
  club's dashboard individually.
- No self-service way yet for a club director to do Steps 1-8 without
  you walking through it with them the first time.
- Anything genuinely new tonight (Coach's Table, Ask the Chef, PT Leads
  tracker) has had almost no real usage anywhere, including Fairless
  Hills. Treat these as fine to include, but don't be surprised if they
  need a fix or two once real people touch them for the first time —
  that's expected of a pilot, not a sign something's broken.
