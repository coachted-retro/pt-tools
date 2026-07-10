# PT TOOLS — STATUS (Last updated: July 9-10, 2026, end of session)

## READ THIS FIRST, BEFORE TOUCHING ANYTHING
If you are a new Claude session picking this up: do not build, fix, or change
anything based on assumption or a chat handoff summary alone. Read this file
in full, and read the actual code for whatever you're about to touch, before
making any change. Ted has been burned repeatedly by sessions that acted on
partial understanding. If you are not sure what a section below means, say so
and ask, rather than guessing and building on top of a wrong guess.

---

## MASTER OPEN ITEMS LIST

### VERIFY LIVE — built and deployed tonight, not yet confirmed working by Ted
- [ ] Scheduled workouts now showing for Sanjay and Anthony Mango in the
      Training tab (was: /portal/me never returned scheduled_sessions at all)
- [ ] Temp password flow: a real client logging in on a coach-granted temp
      password gets routed into the self-service reset flow correctly
- [ ] Sarah's mea-agenda.html — tested against her actual day (Tours/Intakes
      from Club OS + Priority Calls from leads table + note logging)
- [ ] Staff-back-banner shows correctly after using the "Gym Home" link from
      coach-crm.html / mea-agenda.html
- [ ] Today's Notes Summary on ted-eod.html populates correctly across
      multiple days (the /coach/notes-today date-param fix)
- [ ] Keelin's dashboard shows today's submissions correctly when checked in
      the evening (the eodDateStr timezone fix)

- [ ] Login is now the default landing screen for member-app.html instead
      of the public guest home (fixed July 9-10, late session) — verify
      this actually resolves the confusion for real coaches/PT clients
      clicking their invitation link

### JULY 10 LIVE AUDIT — findings verified directly against production D1
via the Cloudflare Developer Platform connector, not just code reading:
- [x] FIXED: front door simplified from confusing 3-way chooser (Gym
      Member / PT Client / Staff) to clean 2-way (Client / Staff) --
      confirmed via code that Member and PT Client were literally the
      same login form, zero functionality lost removing the redundant one
- [x] FIXED, HIGH IMPACT: staff must_change_pin was never checked on
      login. Verified against live data: ALL 17 staff accounts (Ted,
      Danielle, Sarah, every coach and MEA) were sitting on unset temp
      PINs, silently logged straight in every time with no prompt to set
      their own. This is very likely a real contributor to "coaches can't
      log in" -- a temp PIN nobody consciously set is easy to forget.
      Fixed with the same pattern as the client-side fix from last night.
- [x] VERIFIED WORKING: the client must_change_password fix from last
      night is confirmed live and functioning -- Anthony Mango's
      last_login timestamp in client_auth is consistent with the reset
      flow now routing him correctly instead of logging him straight in
- [x] DECIDED, do not revisit: Ted explicitly chose NOT to mass-reset the
      17 existing staff PINs to the last-4-of-phone standard, even though
      the standard itself is now fixed going forward (staff-setup.html).
      Reason: some staff may have already been through the self-service
      reset flow and set their own working PIN -- force-resetting everyone
      would break those people's already-working logins. The PIN
      inconsistency for existing accounts stays as-is. The fix only
      applies to NEW provisioning and future resets from here forward.
- [ ] ACTION NEEDED FROM TED, not a code bug: Sanjay (Bodduluri, client id
      12) has ZERO rows in client_auth -- no login account was ever
      provisioned for him at all. He cannot log in no matter what else is
      fixed until Ted grants him access via portal-admin.html. His
      workouts fix from earlier will work correctly once he has an actual
      account to log into.
- [ ] STILL TO AUDIT: this was one focused pass on the login flow
      specifically, driven by Ted's exact complaint (coaches/members
      unable to log in, landing on wrong pages). Broader audit of other
      user flows (nutrition tracking, class booking, coach touchpoints,
      etc.) has not been done yet -- do not assume the rest of the app is
      clean just because login is now solid

### NEEDS TED'S INPUT before building — do not guess at these
- [ ] Monthly check-in intake condensing: which fields are truly "core"
      (always asked) vs "deep dive" (expand on tap / only if flagged)?
      Ted said he'll give refined answers once he can log in properly.
      Current count: 80 fields. Draft plan below.
- [ ] Appointment reminder system: confirmed scope is Initial Consultations,
      Sessions, and Appointments (not Club tours) — still need to confirm
      exactly which table(s) hold "sessions" vs "appointments" as Ted means
      them (likely scheduled_sessions + pt_appointments, verify field by
      field, don't assume)
- [ ] Does the project's Resend account support INBOUND email (receive +
      parse a reply), or only outbound send? Different product/setup than
      what's already working. Check the Resend dashboard directly — this
      determines whether the "reply CONFIRMED" flow works as literally
      described, or needs a "tap to confirm" link instead (same result,
      different build)
- [ ] Does this Cloudflare project support Worker Cron Triggers (scheduled,
      not request-triggered)? Needed to check daily for appointments ~24h
      out and fire reminder emails automatically
- [ ] dani-eod.html and sarah-eod.html — same section-trimming cleanup as
      ted-eod.html? Not yet requested by Ted, ask before doing it
- [ ] Keelin notification on EOD submit: right now submitting an EOD only
      writes to the database — nothing emails or notifies Keelin at all.
      Resend is already wired up and working for other notifications in
      this app. Proposed fix (not yet built, not yet confirmed wanted):
      fire an email to Keelin the moment /eod/submit succeeds. Confirm with
      Ted whether he wants this, and whether every submission or a daily
      digest

### NEEDS BUILDING — scoped, waiting on the above inputs or on time
- [ ] AI note composition for appointment outcomes (Consultations, 6-Week
      Follow-Ups, Monthly Check-Ins). Confirmed via full codebase search:
      does not exist anywhere, despite being described as an intended
      standard. Spec: coach writes a brief note about the appointment: AI
      pulls that note + the appointment's structured outcome data (scores
      for check-ins; outcome/assessment_summary for consultations/
      follow-ups) and composes an enhanced caption. That composed caption
      is what should show in the EOD auto-pulled rows and in Today's Notes
      Summary / what goes to Keelin. Model the API call on existing working
      patterns in worker-v34.js (search 'aiResp = await fetch' — closest
      are /recipes/generate, /coach/draft-reply, /coach/draft-outreach)
- [ ] Nutrition/macro/InBody pipeline mapping. Ted's words tonight: "awkward,
      clunky, pieces everywhere and in the wrong places, missing pieces,
      pieces not connecting properly." Built in disconnected pieces across
      sessions (meal-plans.html, member-app.html,
      fitness-consultation-tool.html, worker-v34.js /portal/me,
      inbody_scans, meal_profiles) without anyone mapping how it actually
      connects end to end. THIS MAPPING HAS NOT BEEN DONE. Present the map
      to Ted BEFORE changing anything further in this pipeline — that
      pattern (build without mapping) is what created tonight's mess
- [ ] Appointment reminder + reply-confirmation email system (full spec
      below, once the open questions above are answered)
- [ ] Monthly check-in intake condensing (once Ted gives refined field
      guidance)
- [ ] TIMEZONE BUG AUDIT: `new Date().toISOString().slice(0,10)` returns
      UTC, not Eastern — breaks every "today" comparison after 8pm Eastern,
      when UTC has already rolled to the next calendar day. Found and fixed
      tonight in: ted-eod.html (TODAY constant, used by 3 sections),
      /coach/notes-today (worker date-param fallback), keelin-dashboard.html
      (eodDateStr), /eod/feed (worker date-param fallback). NOT YET AUDITED:
      every other html file and every other worker endpoint. Grep both for
      this exact pattern before assuming anywhere else is safe
- [ ] coach-client-profile.html EXERCISE_DB sync: still 137 exercises vs 292
      in gym-floor.html/member-app.html. Pre-existing drift, not caused by
      tonight, still unresolved
- [ ] Exercise catalog "Needs Manual Sort" bucket: ~120 exercises from the
      original Trainerize source list that the body-part classifier
      couldn't confidently categorize (things like "Groiner," "Goose Step").
      Real moves, just need a human pass to sort — not yet done
- [ ] Coach's Table recipes: 23 built and live, 1,319 more identified.
      Full remaining list now saved at docs/coaches_table_progress.md in
      this repo (moved there tonight specifically so it can't be lost to a
      chat session ending — previously only existed as a chat-attached
      file). No rush per Ted, working through in batches

### KNOWN, CONFIRMED, NOT FIXABLE FROM HERE
- InBody API: the webhook InBody sends is a NOTIFICATION ONLY — carries no
  body-composition numbers. Getting real numbers needs a separate "Get
  InBody Data" API call that's never been wired up because Retro is still
  blocked on InBody's own documentation/support access. External blocker,
  not a code bug. Manual PDF upload is the only reliable path until that
  access comes through. Do not attempt to "fix" this without new
  information from InBody's side.

---

## MAJOR INITIATIVE: MULTI-CLUB DEPLOYMENT (confirmed direction, not started)

PRIORITY ORDER, Ted's explicit direction (July 10): Fairless Hills must be
fully audited and running cleanly FIRST, before any multi-club rollout
work begins. Do not start template extraction, D1 provisioning, or any
other multi-club build work until the Fairless Hills audit (see the live
Cloudflare/D1 audit started July 9-10, using the Cloudflare Developer
Platform connector -- continue that first) is actually complete and Ted has
confirmed the system is solid. He does not want "a nightmare, every club
calling with issues" from rolling out something unpolished.

Ted confirmed the architecture directly (July 9-10, late session) — do not
re-litigate this decision, it is settled:
- Keelin gets a MASTER dashboard that sees across all 11 clubs.
- Each club runs an IDENTICAL platform to Fairless Hills — same roles
  (Director of Fitness, Coaches, Franchise Owner, MEAs), same features,
  same code.
- Each club gets its OWN D1 database — full data isolation, separate
  Worker + D1 per club, not a shared multi-tenant database with gym_id
  filtering. This was the open question from earlier tonight; it is now
  answered. Do not build gym_id-based row-level isolation into a shared DB
  — that is NOT the direction.
- Rollout flow: Ted sends Keelin the master (her dashboard, aggregating all
  clubs), then hands off the identical platform to each individual club.
  Each club gets its own login; that club's own staff then self-provision
  logins for their own employees and PT clients — Ted/Keelin are not
  expected to manually create every account at every club.

IMPORTANT CONSTRAINT: Claude does not have direct Cloudflare API access
from this sandbox (checked the network egress allowlist — Cloudflare's API
domains are not in it, and this held true even when Ted supplied a token
for a different, unrelated domain earlier tonight). Claude can prepare
everything needed (clean template codebase with Fairless-Hills-specific
data stripped, D1 schema export as reusable SQL, wrangler.toml templates,
exact step-by-step commands) but Ted has to be the one executing the
Cloudflare-side provisioning (creating each club's D1, deploying each
club's Worker) — same pattern as pasting worker code into Quick Edit.
Do not assume this can be automated end-to-end without Ted's hands-on
execution at the Cloudflare-account level.

NOT YET STARTED, needs real scoping work before building:
- [ ] Template extraction: what in the current gym-floor.html/member-app.html/
      worker-v34.js/coach-crm.html/etc. is Fairless-Hills-specific data that
      needs stripping for a clean club template (client records, staff
      names, gym-specific IDs) vs what's genuinely shared code that every
      club should get identically (EXERCISE_DB, ROUTINE_LIBRARY,
      MEAL_LIBRARY, the app logic itself)?
- [ ] D1 naming convention (Ted, July 10): each club's D1 database should be
      named after the club itself (e.g. "retro-fitness-fair-lawn"), not a
      generic name, so it's identifiable when browsing Cloudflare directly
- [ ] Club branding: each club's build needs to actually display that
      club's real name (e.g. "Retro Fitness Fair Lawn") throughout the app,
      not "Fairless Hills" or a generic placeholder
- [ ] VERIFIED July 10: the "add your own social media" feature Ted
      remembered building is real and already works. command-center.html
      has working edit fields (Facebook/Instagram/TikTok, ids soc-fb/
      soc-ig/soc-tt) that save into each gym's own row in the gyms table,
      and member-app.html already reads gym.facebook_url/instagram_url/
      tiktok_url dynamically per gym — confirmed via full codebase search,
      there is NO hardcoded Instagram link anywhere. The fields are simply
      empty right now for every club including Fairless Hills, which is
      why nothing currently shows. No code change needed here, just data
      entry once a club is live -- UNLESS the shared-vs-separate-DB
      question below changes how this needs to work
- [x] RESOLVED July 10: the gyms table finding above turned out to be a
      real data integrity problem, not just a reference question. Bristol,
      Doylestown, Hamilton, and Cherry Hill were confirmed FICTIONAL --
      leftover from an old Keelin sales-demo build, never cleaned up
      correctly despite a past session writing cleanup SQL for exactly
      this. They were sitting in the LIVE Fairless Hills database marked
      is_demo=0 (i.e. treated as real), which is why this kept resurfacing
      for Ted. Verified no real sales/board-note data was attached, got
      Ted's explicit go-ahead, and deleted them plus their fake pt_reps (10
      rows) and gym_quotas (8 rows) directly via the Cloudflare D1 query
      tool. Confirmed via live query after deletion: gyms table now
      contains only Fairless Hills (real, id=1) and 5 real pilot locations
      that match Ted's actual pilot roster from a past session -- Rego
      Park (Ruveena), Fairfield (Shawn), Tottenville (Sarah), Mt. Olive
      (Sarah & Bianca), Whippany (Dij'uan). Clean now, no fake data mixed
      with real.
- [ ] STILL OPEN: Ted's pilot roster from a past session also listed
      Forest Hills, Glendale, Jersey City, and Cedar City -- four real
      locations never actually added to the gyms table. Ted said (July 10)
      the full target is 14 stores total, 11 as Keelin pilots going out
      NEXT WEEK, with his own Fairless Hills locked down first. Do NOT
      guess the remaining club list from old chat history again -- that
      guessing is exactly what produced the fake-data problem above. Get
      the definitive 14-store list directly from Ted (he mentioned a
      whiteboard photo) before creating any more gym records or starting
      template/provisioning work.
- [ ] BUILD DIRECTION CONFIRMED (Ted, July 10): all 14 stores get built as
      genuine blank slates from an identical template -- no demo or seeded
      data of any kind, each club adds its own information after receiving
      it. This applies whether the final architecture ends up being
      separate D1s per club or something else -- either way, zero seeded
      content beyond the empty schema structure itself.
- [ ] D1 schema export: a clean, reusable CREATE TABLE script for a brand
      new club's database, matching the CURRENT real schema (not a stale
      guess) — needs to be generated from the actual live Fairless Hills
      D1 schema, not reconstructed from memory
- [ ] Per-club provisioning steps: exact, numbered, copy-pasteable
      instructions for Ted to create a new club's D1 + Worker in
      Cloudflare, using the template
- [ ] Keelin's master dashboard: keelin-dashboard.html currently queries
      ONE Worker/D1 (Fairless Hills only). A true master view across 11
      separate per-club Workers/D1s is a different architecture than what
      exists today — needs real design work (does her dashboard make 11
      separate API calls, one to each club's Worker? does each club's
      Worker need a way to report summary data back to a central place?)
- [ ] Self-service staff/PT-client account creation per club: confirm the
      existing portal-admin.html "Grant Access" flow is enough for a new
      club's own staff to provision their own people, or whether it needs
      changes to work cleanly for a brand-new club with no data yet
- [ ] Sequencing: this is a big enough initiative that it should get its
      own dedicated planning session, not be squeezed in alongside other
      work. Confirm with Ted before starting whether this comes before or
      after the nutrition/macro pipeline mapping and the other open items
      above.

---

## DRAFT PLANS (grounded in actual current state, not yet built)

### Monthly check-in intake condensing
Confirmed field count: 80, across fitness-monthly-checkin.html. Ted's
complaint: members get antsy waiting to work out during the live interview.
- Split into "core" (always asked, roughly 15-20 fields: session
  count/quality, one overall diet-adherence scale, energy, motivation,
  sleep, stress, current challenge, wins, weight/InBody pull) vs "deep dive"
  (meal-by-meal breakdown, segmental %, individual strength/endurance/
  flexibility/confidence/challenging-movement text fields) that only shows
  if the coach taps "add detail" or something in core flags a concern (e.g.
  low diet-adherence score auto-expands nutrition detail)
- InBody segmental % fields (now-seg-la/ra/trunk/ll/rl) should pull
  automatically from the client's latest inbody_scans row instead of being
  typed live during the conversation — real time savings on its own
- The six meal-description textareas could likely collapse to one "any
  changes to typical eating since last check-in?" — full breakdown only
  needed at initial consultation, not every month
- BLOCKED on Ted's refined field guidance — do not finalize without it

### Appointment/session email reminders with reply-confirmation
Ted's request, verbatim intent: email 24 hours before a scheduled
appointment/session, asking for a "confirmed" reply, auto-marks the
appointment as confirmed when that reply comes in. Scope confirmed:
Initial Consultations, Sessions, and Appointments — NOT Club tours/intakes.
Draft copy Ted provided (can be adjusted for best response rate):
"I want to confirm your meeting with (coach name) at (date and time) for
your upcoming (event type). Kindly respond with confirmed below as our
schedules are very busy and consistently changing and we want to make sure
the time we set aside for you is available."
If a scheduled event has no email on file: do not silently skip it —
surface a notification/reminder to staff so they can add one and send that
reminder manually.
BLOCKED on: which table(s) exactly, Resend inbound capability, Cron Trigger
availability (see Needs Ted's Input above). Do not build until answered.

---

## STANDING RULES (Ted has stated these explicitly, more than once)
- Paste full code directly in chat responses. Never a download link, never
  "go check GitHub," for anything of reasonable size. This file itself is
  an exception by necessity (repo status file), but actual code changes go
  in the chat as code blocks.
- Validate every change: node --check on extracted script blocks, div-count
  balance check, before ever committing.
- Commit as Ted Scholl / tscholl@termac.com. No em dashes in code or commit
  messages.
- Single-use GitHub tokens: use immediately, strip from git remote config
  right after push, tell Ted to revoke it — never assume it can be reused.
- Do not guess at scope for anything nontrivial. Ask one focused question
  if proceeding could go in a genuinely wrong direction — Ted would rather
  answer a quick question than spend hours undoing a wrong guess.
