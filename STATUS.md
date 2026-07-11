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

### NEW IDEA, July 10 -- not started, needs its own scoping session
- [ ] Meal browsing filters + "chef bot" recommendation chat. Ted's idea,
      two parts:
      1. Filters on the meal/recipe library (both the client-facing
         browsing screen and likely the coach-side meal-plan builder):
         meal type, calorie range, dietary exclusions (auto-apply from
         meal_profiles.excluded_proteins/excluded_vegetables/allergies,
         which already exist from last night's build), macro-forward
         tags (high protein/low carb, computed from existing calorie/
         macro fields, no new tagging needed). Ted confirmed he likes
         this direction, needs: is this for clients, coaches, or both?
      2. A branded AI chat ("chef bot"/mascot personality matching
         Coach's Table branding) clients can ask "what should I make
         tonight" or "I have chicken, what can I make" -- grounded in
         the real recipe library, same pattern as FitChat (built earlier
         this session for exercises). Confirmed buildable and worth
         doing.
      3. STRETCH, lower confidence: photo of the fridge -> AI identifies
         visible items -> suggests recipes. Technically possible (Claude
         vision), but told Ted directly this will NOT be reliably
         accurate -- containers, packaging, and partial visibility make
         fridge photos genuinely hard to read. Fun bonus feature, not a
         dependable primary path. Build the text-based version first;
         treat this as optional/later, not core to launch.
      Not started. Needs its own scoping pass (probably alongside the
      1,319 remaining Coach's Table recipes, since this is most useful
      once the library is bigger) rather than being squeezed in.

### VERIFY LIVE — built and deployed tonight, not yet confirmed working by Ted
- [x] CONFIRMED July 10: worker-v34.js redeploy landed correctly. Verified
      directly against live Cloudflare via the Developer Platform
      connector (not just trusting Ted's word) -- live code matches the
      repo exactly (only diff was a trailing newline). All the timezone
      fixes and the Sanjay/Anthony workouts fix are genuinely live now,
      not just pushed to GitHub.
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
- [x] FULL LOGIN-TO-FEATURE AUDIT COMPLETE July 10: login, class booking,
      nutrition tracking, coach touchpoints, meal plan generation, and
      InBody scan display have all now been traced end to end against
      live data, not just read in isolation. Real bugs found and fixed
      along the way: the staff PIN bug (all 17 accounts), the login
      entry-point confusion, the Sanjay/Anthony workouts table gap, a
      timezone bug in meal plan week-tagging (mondayOf), and three
      meal_profiles fields (excluded_fruits/conditions/notes) that the
      AI meal generator already used but the coach form never exposed.
      Confirmed-safe/working-as-designed with no changes needed: class
      RSVP flow, nutrition ring display, the coach_notes vs
      coach_touchpoints separation, InBody upload/extraction/display.
      Genuinely zero real client usage yet on most features (RSVPs,
      meals logged, real meal plans) -- consistent throughout, explained
      by login being broken until tonight, not further bugs. This does
      NOT mean the audit is over forever -- it means tonight's specific
      pass is done. Re-check with real usage data in a week or two once
      people have actually been using the fixed login.

### NUTRITION TRACKING AUDIT, July 10 -- checked, correctly wired
- loadNutritionDay/renderNutritionDay reviewed end to end, correctly
  reads meal_profiles targets (calories/protein/carbs/fat) and displays
  progress rings against logged meals for the selected date
- meals table: ZERO rows ever. meal_profiles: exactly ONE row and it's
  entirely empty (all macro fields null) -- but that row belongs to a
  demo/test client ("Demo1 John S", id 25), not a real client, so
  nothing to act on. Consistent with the broader pattern tonight: code
  is correct, real usage just hasn't happened yet because login was
  broken until tonight. The real test is the first real client logging
  a meal now that login works

### COACH TOUCHPOINTS AUDIT, July 10 -- confirmed working as designed
Traced a real structural question: ted-eod.html writes notes to
/coach/note (table coach_notes, tagged, feeds Today's Notes Summary and
the EOD/Keelin report) while coach-crm.html's entire agenda note
composer (8 call sites) writes to a different endpoint, /coach/touchpoint
(table coach_touchpoints), which the EOD never reads. Initially looked
like a gap -- notes typed throughout the day from the agenda seemed like
they might disappear. Verified further: coach_touchpoints notes ARE
displayed, in client-profile.html's Touchpoints tab, correctly scoped as
private ongoing relationship notes per client. This matches Ted's
explicit standard from earlier tonight (EOD is ONLY Consultations/
Follow-ups/Check-ins, "that's it") -- the two note systems are correctly
separated by design, not a bug.

### CLASS BOOKING AUDIT, July 10 -- checked, no code bugs found
- RSVP flow (toggleGoing/classes/rsvp) and social-proof display
  (classes/going) both reviewed end to end, logic is correct
- class_rsvps and guest_pass_log both have ZERO rows ever, but the code
  paths are correct -- consistent with "nobody could reliably log in
  until tonight," not a feature bug. Worth re-checking usage in a week
  once login fixes have had time to actually matter
- [x] RESOLVED July 10: Ignite Core had zero group_class_sessions rows,
  only Boot Camp had content. Built and inserted 2 weeks of real content
  (July 14, July 21) directly into the live D1 via the Cloudflare
  connector, verified byte-for-byte intact after insert. Per Ted's
  explicit direction: equipment restricted to kettlebell/dumbbell/plate/
  medicine ball/bosu ball/bodyweight only, every station has a genuine
  scale_up and scale_down so it works for any age or physical capability
  at their own pace. This is date-keyed content that will need refreshing
  again in a couple weeks -- ask Ted whether he wants a longer runway
  generated at once (e.g. 8 weeks) rather than repeating this every
  2 weeks going forward.

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
- [x] BUILT July 10: AI appointment summary composer. Ted gave the full,
      precise spec: for each Consultation/Follow-Up/Check-In, combine the
      appointment's own intake/assessment data with the coach's own notes
      logged that day (from the coach-crm.html agenda, coach_touchpoints
      table) into one short caption, per client, per appointment. Built
      as /coach/compose-appointment-summary in worker-v34.js -- pulls the
      right fields per appointment type (assessment_summary/outcome/
      advisor_notes for consultations and follow-ups; assessment_summary/
      wins/scores for check-ins), pulls today's coach_touchpoints for that
      client, has Claude compose the caption, saves it straight into
      coach_notes with the correct EOD tag (same table/tag Today's Notes
      Summary already reads, so no separate display wiring needed). Added
      a purple "Compose" button to each row in ted-eod.html.
      NOT YET TESTED WITH A REAL APPOINTMENT -- needs Ted to run it
      against an actual consultation/follow-up/check-in once one exists
      today, confirm the composed caption reads right and actually shows
      up correctly in Today's Notes Summary and on submit.
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
- [x] TIMEZONE BUG -- MAJOR SYSTEMIC FIX, TWO PASSES, COMPLETED July 10:
      `new Date().toISOString().slice(0,10)` (and variable-based versions
      of the same thing, e.g. `now.toISOString().slice(0,10)`) returns
      UTC, not Eastern -- breaks every "today" comparison for roughly 4-5
      hours every evening once UTC rolls to the next calendar day while
      it's still today here. Also a related but distinct bug: parsing a
      date-only string as browser-local time (`new Date(val+'T00:00:00')`,
      no Z) then converting back via toISOString can shift by a day
      depending on the parse/convert round-trip.

      PASS 1: searched for the exact literal `new Date().toISOString()
      .slice(0,10)` string. Found and fixed 105 instances across 24 files
      -- entire worker-v34.js (33), entire member-app.html (7 at the
      time), all three coach EOD/agenda tools, and 19 other files
      (client-portal, client-profile, coach-calendar,
      coach-dashboard-v2, coach-log, coach-profile, command-center,
      coverage-board, director-dashboard, fitness-consultation-tool,
      fitness-followup-tool, fitness-monthly-checkin, gym-analytics,
      gym-floor, hr-portal, mea-log, member-onboarding,
      prospect-tracker, staff-setup). A shared todayET() helper (using
      Intl.DateTimeFormat, correct across EDT/EST automatically) was
      added to every file and used to replace the broken pattern.

      PASS 2, same session: realized the literal-string search missed
      every instance that used a variable instead of the inline pattern
      (e.g. `const now = new Date(); ... now.toISOString().slice(0,10)`).
      Broader grep for `.toISOString().slice(0,10)` and `.split('T')[0]`
      regardless of prefix found ~43 more candidates. NOT all of these
      were bugs -- critical distinction learned during this pass:
        - On the CLIENT (browser, physically in Eastern time): a Date
          object is only actually broken if it retains the CURRENT
          moment's time-of-day when converted (e.g. new Date() used
          directly, or Date.now() arithmetic). If the time component is
          explicitly zeroed first (setHours(0,0,0,0)) or the date is
          built via the 3-arg local constructor (new Date(y,m,d)), the
          Eastern-behind-UTC conversion does NOT cross a day boundary,
          so it's already safe. Confirmed and left untouched:
          gym-analytics.html's getPeriodBounds().
        - On the WORKER (Cloudflare, no local timezone at all -- the
          runtime IS UTC): this safety net does NOT apply. Even
          setHours(0,0,0,0)-style zeroing just zeroes to UTC midnight,
          not Eastern midnight, which is still wrong. Found and fixed
          two real bugs in worker-v34.js on this basis (class schedule
          occurrence generator, workout-completion weeks-ago calc).
          Left two alone after confirming they're self-consistent:
          /schedule/create's date range loop (parses date-only strings,
          which the spec defines as UTC regardless of environment) and
          mondayOf() (explicit UTC methods throughout; correctness
          depends on its caller, not a bug in the function itself).
      Fixed genuine bugs found this pass in: client-portal.html (3),
      client-profile.html (2), coach-client-profile.html (2 -- this file
      wasn't touched in Pass 1 at all), coach-crm.html (3 more),
      coach-dashboard-v2.html (2 more), coach-profile.html (1 more),
      director-dashboard.html (3 more), fitness-consultation-tool.html
      (5 more), fitness-followup-tool.html (3 more),
      fitness-monthly-checkin.html (1 more), keelin-dashboard.html (2
      more), member-app.html (5 more), prospect-tracker.html (1 more),
      reports-portal.html (1 -- another file Pass 1 never touched),
      worker-v34.js (2 more).

      Every single file was validated individually (node --check on
      extracted scripts + div-balance check) before committing, in
      dozens of separate commits so any single mistake would be easy to
      isolate and revert. A final repo-wide grep after Pass 2 confirmed
      every remaining match is either a correctly-anchored function's
      final conversion step, or one of the two confirmed-safe worker
      exceptions above -- not a leftover bug.

      IF THIS BUG PATTERN EVER RESURFACES in new code (it was
      reintroduced at least twice already tonight, once in mea-agenda.html
      and once implicitly via copy-pasted patterns -- it is easy to fall
      into out of habit, not just historically present), the fix is:
      add a local todayET() using `new Intl.DateTimeFormat('en-CA',
      { timeZone: 'America/New_York', year:'numeric', month:'2-digit',
      day:'2-digit' }).format(new Date())`, and for any date arithmetic,
      anchor on that string (`new Date(todayET() + 'T00:00:00Z')`) and
      use UTC methods (setUTCDate/getUTCDate/etc) throughout -- never
      plain new Date() for "today," and never mix local and UTC date
      methods on the same Date object.
- [x] RESOLVED July 10: coach-client-profile.html EXERCISE_DB synced to
      the full 292-exercise version. Confirmed the old 137-list was a
      strict subset, clean wholesale replacement, no data lost.
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
- [x] RESOLVED July 10: Full 14-club list recovered from two past sessions
      (not guessed -- retrieved via conversation_search, then confirmed
      directly with Ted): Forest Hills NY, Glendale NY, Jersey City NJ,
      Cedar City UT, Rego Park NY, Fairfield NJ, Tottenville NY, Mt. Olive
      NJ, Whippany NJ, Park Slope NY, Astoria NY, Fair Lawn NJ,
      Stroudsburg PA, Sayreville NJ. Directors known for the first 9 (see
      gyms table); the last 5 (Park Slope, Astoria, Fair Lawn,
      Stroudsburg, Sayreville) confirmed fine to leave blank, clubs will
      fill in themselves.
- [x] DATABASES CREATED AND SEEDED July 10 (7 of 14): Forest Hills,
      Glendale, Jersey City, Cedar City, Rego Park, Fairfield, and
      Tottenville each have a real D1 database (retro-fitness-{slug}
      naming), all 93 tables from the current schema, zero seeded data
      except the single correct gyms row (name/city/state/director).
      Verified directly against live Cloudflare for at least Forest Hills
      and Rego Park (table count + gyms row), not just trusted from the
      insert response.
- [ ] BLOCKED: Cloudflare caps this account at 10 D1 databases total.
      Hit the wall after 7 new clubs (3 pre-existing: retro-crm,
      retro-crm-demo, relentless-db + 7 new = 10). The remaining 7 clubs
      (Mt. Olive, Whippany, Park Slope, Astoria, Fair Lawn, Stroudsburg,
      Sayreville) CANNOT be created until this is resolved. Real options
      given to Ted: (1) upgrade the Cloudflare plan -- likely fastest,
      but a billing decision only he can make, unknown what the new D1
      limit would be, (2) delete retro-crm-demo to free one slot, still
      short of what's needed, (3) architecture pivot to one shared D1
      with gym_id partitioning instead of separate D1s per club --
      there's real precedent for this (Keelin's regional dashboard was
      originally built this way across 16 locations before tonight's
      separate-D1 direction), but it's a genuine redesign, not a small
      change. Ted was still deciding as of end of session. Do NOT create
      more D1 databases until this is resolved, even if asked to "just
      try" -- confirm the account limit was actually raised first.
- [ ] Worker deployment for the 7 already-provisioned clubs' databases
      hasn't happened yet -- Claude cannot deploy Workers directly (no
      tool for it). Ted still needs to do Steps 2-9 of
      provisioning/NEW_CLUB_SETUP.md for each of these 7 clubs by hand
      before they're actually usable, even though their databases are
      ready and waiting.
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
- [x] BUILT July 11: provisioning/CLUB_DATABASE_REGISTRY.md -- the
      human-readable index Ted asked for, mapping numbered slots to
      Cloudflare database UUIDs to (once registered) real club names.
      Important: this is a STATIC file, not a live feed. It solves "how
      do I look at Cloudflare and know which database is which club" via
      documentation. It does NOT make club data show up live in Keelin's
      dashboard -- that's still the exact same aggregation gap above,
      unchanged by this registry. Don't conflate the two: the registry is
      for humans checking Cloudflare; the dashboard gap is a real build.
      No D1 rename API exists, confirmed via tool_search -- the 7 already-
      created club-named databases can't be relabeled to generic slot
      names, so the registry file is the actual source of truth for "slot
      03 is really Jersey City," not the Cloudflare name itself.
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
