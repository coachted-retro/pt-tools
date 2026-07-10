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
