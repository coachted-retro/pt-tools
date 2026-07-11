# Setting up a new club — step by step

## ARCHITECTURE CHANGED July 11, 2026 — read this before anything below

Every pilot club used to need its own separate Worker deployment (create
Worker, paste code, bind D1, add secrets, one full copy of the app per
club). As of tonight that's gone: **all clubs now share the single real
Worker (`broken-cake-e9c2`) that Fairless Hills already runs.** That one
Worker looks at which subdomain a request came in on (`club01.
myretrostrong.com` through `club11`) and automatically uses that club's
own D1 database instead of Fairless Hills' — see `CLUB_SLOT_MAP` near the
top of `worker-v34.js`. It also now serves the actual app pages for those
subdomains by proxying them from the real GitHub Pages site, since
GitHub Pages itself only recognizes `myretrostrong.com` and has no idea
`club01.myretrostrong.com` exists.

This means bringing a new club online is now genuinely small:

1. Its D1 database already exists (all 11 pilot slots were created and
   seeded on July 11 — see `CLUB_DATABASE_REGISTRY.md`). Nothing to do
   here per-club.
2. Add that database as a new binding on the existing `broken-cake-e9c2`
   Worker, named exactly `DB_SLOT_01` (or whichever slot number). One
   click in Settings → Bindings, not a whole new Worker.
3. In Cloudflare DNS for `myretrostrong.com`, confirm the wildcard `*`
   record exists (proxied, orange cloud on) — this is a ONE-TIME setup
   step, not per-club, and only needs doing once ever.
4. In the Worker's Triggers → Routes, confirm `*.myretrostrong.com/*` is
   routed to `broken-cake-e9c2` — also one-time, not per-club.
5. That's it. `club01.myretrostrong.com` (etc) now works — real pages,
   real API, real data, isolated per club, automatically.

No new secrets/API keys to copy per club (there's only ever one Worker
now, so its existing `ANTHROPIC_KEY` / `JWT_SECRET` / `ADMIN_KEY` are
already shared correctly). No `config.js` edit per club — it already
detects `club0X.myretrostrong.com` hostnames automatically and calls the
right place.

## ONE REAL GAP THIS INTRODUCES — not solved yet, don't assume it's fine

Photo/video uploads (progress photos, InBody scan images, etc.) go
through the `PHOTOS` R2 bucket binding, and that binding is still
singular — every club sharing this one Worker would currently write
into Fairless Hills' own R2 bucket, mixed together with real Fairless
Hills client photos. This was NOT addressed by tonight's D1/routing
work and needs its own real fix (most likely: the same `env[slotName]`
pattern used for D1, applied to a `PHOTOS_SLOT_0X` R2 binding per club)
before any pilot club actually uses photo upload features for real.
Flag this to Ted before any club goes live with real client photos.

---

## Steps that are now OBSOLETE, kept here only for history

The old process (separate D1 + separate Worker + separate secrets +
separate R2 + manual `config.js` edit, ~20-30 minutes per club) is fully
replaced by the 5 steps above. Do not follow a per-club "create a new
Worker" process anymore — it would create a second, disconnected code
path that the July 11 fix (Steps 6+ below, historical) was written
specifically to eliminate.

Still worth a quick spot check after changing it: open a couple of
different pages and confirm they're hitting the new Worker (Network tab
in browser dev tools), or just confirm the club's own name shows up
correctly per Step 8.

## Step 7: One person from the club logs in and runs Club Setup

This replaces what used to be several manual steps. The very first time
anyone opens `command-center.html` on the new site, it detects there's no
club info on file yet and automatically sends them to `club-setup.html`
instead. That wizard walks them through, in order:

1. **Club info** — name, city, state, director, social links. Saved to
   the `gyms` table.
2. **Trainers & staff** — add everyone who needs to log in. Saved to
   `staff_roster`. (Note: this creates the roster row, not full login
   access with a PIN — that's still granted the normal way afterward,
   see the note below.)
3. **Clients** — either add PT clients one at a time, or upload a CSV for
   a bulk import if they're bringing over an existing roster of dozens
   or hundreds of clients. The wizard shows the exact column headers
   expected (`first_name,last_name,phone,email,coach,package,training_start_date`)
   before they upload anything.

This is genuinely self-service — you shouldn't need to walk someone
through it live, though it's worth being available the first time in
case something's unclear.

**Still needs you or them separately:** actual login access (PIN for
staff, password for clients) isn't part of this wizard — that's granted
the normal way through `staff-setup.html` / `portal-admin.html` after
the roster exists. The wizard gets their *data* in; login access is a
distinct, deliberate step so nobody gets access by accident.

## Step 8: Confirm the club's own name shows correctly

Check `member-app.html`'s header, `coach-crm.html`, and any other page
that displays the gym name — confirm it's showing the real name they
entered in Club Setup, not "Fairless Hills" or blank.

## Step 9: Smoke test before handing it off

At minimum, before calling a club "ready":
- [ ] Club Setup wizard completed without errors
- [ ] A staff member can actually log in (after granting PIN access)
- [ ] A test client can log in (after granting portal access)
- [ ] The client app loads without errors and shows this club's real name
- [ ] A coach can open coach-crm.html and see their real (not Fairless
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
- Anything genuinely new tonight (Coach's Table, Ask the Chef, PT Leads
  tracker) has had almost no real usage anywhere, including Fairless

  Hills. Treat these as fine to include, but don't be surprised if they
  need a fix or two once real people touch them for the first time —
  that's expected of a pilot, not a sign something's broken.
