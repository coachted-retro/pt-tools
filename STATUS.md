# PT TOOLS — STATUS (Last updated: July 9, 2026, end of session)

## READ THIS FIRST, BEFORE TOUCHING ANYTHING
If you are a new Claude session picking this up: do not build, fix, or change
anything based on assumption or a chat handoff summary alone. Read this file
in full, and read the actual code for whatever you're about to touch, before
making any change. Ted has been burned repeatedly by sessions that acted on
partial understanding. If you are not sure what a section below means, say so
and ask, rather than guessing and building on top of a wrong guess.

## WHERE THINGS ACTUALLY STAND RIGHT NOW

### Deployed and confirmed working (as of tonight):
- EXERCISE_DB: 292 exercises (gym-floor.html, member-app.html, kept in sync).
  coach-client-profile.html still has an OLDER 137-exercise copy — this drift
  predates tonight and was not caused by tonight's additions. Not yet fixed.
- ROUTINE_LIBRARY: 11 new bundles added tonight (Kettlebell Foundations, TRX
  Full Body, Landmine Strength Circuit, Sandbag Conditioning, Medicine Ball
  Power, SuperBand Total Body, Stability Ball Core, Pilates Mat Fundamentals,
  Yoga Mobility Flow, Foam Roller Recovery, Kettlebell Complex Conditioning).
- Coach's Table recipe collection: 23 recipes so far, tagged 'coaches_table',
  in worker-v34.js MEAL_LIBRARY. NOT Ted's personal "Chef Ted Meals" brand —
  separate, Retro-branded. 1,319 more recipes identified and queued (see
  coaches_table_progress.md in outputs from tonight's chat — NOT yet
  re-saved anywhere in-repo, so if that file is gone, the list of remaining
  recipe names is gone too and would need to be rebuilt or re-pasted).
- GUEST_MODE bug FIXED: gated tabs (training/nutrition/progress/profile) no
  longer get destructively overwritten by the login prompt. Confirmed
  working live by Ted.
- Temp password flow FIXED: must_change now routes to the existing
  self-service reset-by-email-code flow instead of silently logging clients
  in on "BodyShoppe2024". NOT YET CONFIRMED LIVE by Ted — was pushed and
  deployed but no explicit test report back.
- ted-eod.html trimmed to exactly 3 sections (Consultations, 6-Week
  Follow-Ups [new], Monthly Check-Ins) plus the notes summary. All other
  sections (Sessions, Jeopardy, Sales, Leads, Frozen, Renewals, Wins,
  Reflections, Notes/Flags) removed. dani-eod.html and sarah-eod.html have
  NOT been touched — Ted has not asked for the same cleanup on those yet.
- coach-crm.html agenda: "Submit End of Day" quick bar added for Ted and
  Danielle (coach-select-based). Not applicable to Sarah (different page).
- mea-agenda.html: brand new page for Sarah (Tours/Intakes from Club OS +
  Priority Calls from leads table + note logging via the real touchpoints
  table). Priority Calls ranking is a SIMPLER algorithm than the real one in
  prospect-tracker.html's call list — deliberately not a full replica, to
  avoid duplicated/drifting logic. Not yet confirmed live/tested by Sarah.
- Stranded-on-home-page bug FIXED: staff-back-banner added to
  member-app.html, shows "Back to Coach App / My Agenda" whenever a
  staff_session exists in localStorage, regardless of GUEST_MODE state.
- MAJOR BUG FIXED: /portal/me in worker-v34.js never queried or returned
  scheduled_sessions, so NO client ever saw a coach-assigned recurring
  program (built via coach-crm.html's weekly scheduler) show up in their
  Training tab. This affected every client, not just the two Ted noticed
  (Sanjay, Anthony Mango). Fixed and deployed. NOT YET CONFIRMED LIVE by Ted
  for Sanjay/Anthony specifically — should be checked first thing.
- meal-plans.html: added manual protein_g/carbs_g/fat_g override fields
  (previously only calories existed as a manual field, even though the
  client-facing nutrition tab has ALWAYS been fully built to display and
  track against protein/carb/fat targets — this was a real gap, not new
  functionality). Also added prefillProfile() so selecting a client loads
  their existing saved profile instead of blank fields (previously,
  resaving with any blank field would have silently nulled out existing
  data — this was a live risk, now fixed).
- meal-plans.html: added "Suggest from InBody + Intake" button. Uses
  Katch-McArdle BMR from the client's ACTUAL latest InBody scan (lean_mass,
  weight) + intake goal text + days_per_week for an activity multiplier.
  Fills the form fields for coach review; does NOT auto-save. This is the
  "AI auto-build" feature Ted said was always intended but never built.

### Known, confirmed, NOT fixable from here:
- InBody API: the webhook InBody sends is a NOTIFICATION ONLY — it carries
  no body-composition numbers at all. Getting real numbers requires a
  separate "Get InBody Data" API call that has never been wired up because
  Retro is still blocked on InBody's own documentation/support access. This
  is external, not a code bug. Manual PDF upload is the only reliable path
  until that access comes through. Do not "fix" this without new
  information from InBody's side — there is nothing more to fix in our code
  without their API docs.

### Explicitly flagged as messy / not yet mapped:
Ted's own words tonight: "awkward, clunky, pieces everywhere and in the
wrong places, missing pieces, pieces not connecting properly." The
nutrition/macro/InBody pipeline in particular has been built in disconnected
pieces across multiple sessions (meal-plans.html, member-app.html,
fitness-consultation-tool.html, worker-v34.js /portal/me, inbody_scans,
meal_profiles) without anyone mapping how it all actually connects
end-to-end. THIS MAPPING HAS NOT BEEN DONE YET. It is the planned first task
for the next session. Do not add more features to this pipeline before that
mapping happens — that is exactly the pattern that created tonight's mess.

## NEXT SESSION SHOULD START WITH
0. MISSING FEATURE, CONFIRMED NEVER BUILT (Ted flagged this July 9, ~9:33pm,
   and is frustrated this keeps getting dropped): AI note composition for
   appointment outcomes. Standard was supposed to apply to ALL THREE:
   Initial Consultations, 6-Week Follow-Ups, Monthly Check-Ins. The intended
   flow: Ted (or another coach) writes a BRIEF note about the appointment
   somewhere on the client's profile/the appointment record. AI should pull
   that brief note + the appointment's structured outcome data (for
   check-ins: session/diet/energy/sleep/stress scores; for consultations/
   follow-ups: the outcome field + assessment_summary/program details) and
   COMPOSE an enhanced, polished caption/note automatically. That composed
   caption is what should show in the EOD's auto-pulled rows (currently
   just shows raw scores + an empty manual "Add a note..." box, screenshot
   confirms this — ted-eod.html Monthly Check-Ins section, July 9 session)
   and is what should end up in Today's Notes Summary / what goes to
   Keelin. CONFIRMED via full codebase search: no such feature exists
   anywhere. Not broken — never built, despite Ted saying it was meant to
   be standard. Worker already has 17+ working Anthropic API call patterns
   to model this on (search 'aiResp = await fetch' in worker-v34.js for
   examples — /recipes/generate, /coach/draft-reply, /coach/draft-outreach
   are probably the closest existing patterns to follow for style/format).
   This should be scoped and built as a real, connected feature — not
   another isolated add-on — as part of the pipeline mapping work below.

0a. PLAN: Condense the monthly check-in intake (fitness-monthly-checkin.html).
   Confirmed count: 80 fields today. Ted's complaint: members get antsy
   waiting to work out. Grounded plan, not yet built:
   - Split into "core" (always asked, ~15-20 fields: session count/quality,
     one overall diet-adherence scale, energy, motivation, sleep, stress,
     current challenge, wins, weight/InBody pull) vs "deep dive" (the
     meal-by-meal breakdown, segmental %, individual strength/endurance/
     flexibility/confidence/challenging-movement text fields) that only
     shows if the coach taps "add detail" or if something in the core
     section flags a concern (e.g. diet adherence scored low -> auto-expand
     nutrition detail).
   - InBody segmental % fields (now-seg-la/ra/trunk/ll/rl) should pull
     automatically from the client's latest inbody_scans row instead of
     being manually typed during the conversation -- this alone removes a
     real chunk of live-with-the-member time.
   - Many of the six meal-description textareas could likely collapse to
     one "any changes to typical eating since last check-in?" with the
     detailed breakdown only needed at initial consultation, not monthly.
   - Needs Ted's sign-off on which fields are truly "core" before building
     -- this is a judgment call about what he actually needs to see live
     vs what he can review from Coach's notes/history instead. TED WILL
     PROVIDE MORE REFINED ANSWERS ON THIS WHEN HE CAN LOG IN -- do not
     finalize the field list without checking for that input first.

0b. SPEC: Appointment/session email reminders with reply-confirmation.
   Ted's request (verbatim intent): email 24 hours before a scheduled
   appointment/session, asking for a "confirmed" reply, auto-marks the
   appointment as confirmed in the system when that reply comes in. Ted
   provided draft copy: "I want to confirm your meeting with (coach name)
   at (date and time) for your upcoming (event type). Kindly respond with
   confirmed below as our schedules are very busy and consistently
   changing and we want to make sure the time we set aside for you is
   available." Said the email wording can be adjusted for best response
   rate. ALSO: if a scheduled event has no email on file, do not silently
   skip it -- surface a notification/reminder to staff so they can add one
   and send that reminder manually.
   OPEN QUESTIONS, must resolve before building (do not guess):
   - SCOPE CONFIRMED BY TED (July 9, late session): reminders apply to
     Initial Consultations, Sessions, and Appointments (6-week follow-ups
     and monthly check-ins fall under "appointments" here) -- NOT Club
     tours/intakes. So this points at pt_appointments and/or
     scheduled_sessions, not clubos_appointments. Still need to confirm
     exactly which table(s) hold "sessions" vs "appointments" as Ted means
     them -- likely scheduled_sessions for recurring training sessions and
     pt_appointments for consultations/follow-ups/check-ins, but verify
     field-by-field before building rather than assuming.
   - Does the Resend account on this project support INBOUND email
     (receiving + parsing a reply), or only outbound send (confirmed
     working today for other notifications)? This is a different Resend
     product/setup. Check the Resend dashboard before assuming reply-
     detection is buildable as described. If inbound isn't set up, the
     fallback is a reply-to address with a webhook, or a "tap to confirm"
     link in the email instead of a literal reply -- functionally similar
     result, different (and maybe easier) build.
   - Needs a Cloudflare Worker Cron Trigger (scheduled execution, not
     request-triggered) to check daily for appointments ~24h out and fire
     the emails -- confirm this project's Cloudflare plan/setup supports
     Cron Triggers before scoping the build.

1. Read this file in full.
2. Map the full nutrition/macro/InBody pipeline end to end: every file that
   touches calories, macros, meal_profiles, or inbody_scans; what each one
   actually does; what's connected to what; what's dead code; what's
   half-built. Present that map to Ted BEFORE changing anything in it.
3. Confirm live with Ted: (a) scheduled workouts now showing for Sanjay and
   Anthony Mango, (b) temp password flow working for a real client login,
   (c) Sarah's mea-agenda.html tested and working for her actual day.
4. dani-eod.html and sarah-eod.html have not been cleaned up to match
   ted-eod.html — ask if/when Ted wants that.
5. coach-client-profile.html's EXERCISE_DB is still out of sync (137 vs 292
   in the other two files) — a pre-existing issue, not caused by tonight,
   still unresolved.
6. TIMEZONE BUG PATTERN — audit other files for the same issue found and
   fixed tonight in ted-eod.html: `new Date().toISOString().slice(0,10)`
   returns UTC, not Eastern, and breaks "today" comparisons every evening
   after 8pm Eastern (UTC rolls to next day while it's still today here).
   Also check for worker endpoints that fall back to their own
   `new Date().toISOString()` when a date param isn't passed (found and
   fixed one case: /coach/notes-today) — there may be others. Grep both
   client html files and worker-v34.js for this exact pattern.

## STANDING RULES (Ted has stated these explicitly, more than once)
- Paste full code directly in chat responses. Never a download link, never
  "go check GitHub," for anything of reasonable size. This file/instruction
  itself is an exception by necessity (repo status file), but actual code
  changes go in the chat as code blocks.
- Validate every change: node --check on extracted script blocks, div-count
  balance check, before ever committing.
- Commit as Ted Scholl / tscholl@termac.com. No em dashes in code or commit
  messages.
- Single-use GitHub tokens: use immediately, strip from git remote config
  right after push, tell Ted to revoke it — never assume it can be reused.
- Do not guess at scope for anything nontrivial. Ask one focused question
  if proceeding could go in a genuinely wrong direction — Ted would rather
  answer a quick question than spend hours undoing a wrong guess.
