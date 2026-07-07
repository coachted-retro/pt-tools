const OUTSCRAPER_BASE = "https://api.outscraper.com/maps/search-v3";
const FPLINK = "https://1stphorm.com/?a_aid=coachted";

// --- Approved meal library. All health-conscious whole-food options —
// lean proteins, vegetables, whole grains, healthy fats. The AI meal
// plan generator builds each day primarily FROM this list (scaling
// portions to hit that client's targets) rather than freely inventing
// meals, so what a client sees stays consistent, grocery-shoppable,
// and reviewed by Ted rather than open-ended AI improvisation. ---
const MEAL_LIBRARY = {
  breakfast: [
    { name: 'Egg white veggie scramble + whole grain toast', calories: 380, protein_g: 32, carbs_g: 34, fat_g: 12, tags: ['high-protein'] },
    { name: 'Greek yogurt, berries, granola, honey', calories: 340, protein_g: 24, carbs_g: 45, fat_g: 8, tags: ['vegetarian','quick'] },
    { name: 'Overnight oats with protein powder and banana', calories: 420, protein_g: 30, carbs_g: 55, fat_g: 9, tags: ['vegetarian','meal-prep'] },
    { name: 'Two whole eggs, turkey bacon, avocado, fruit', calories: 450, protein_g: 28, carbs_g: 22, fat_g: 26, tags: ['low-carb'] },
    { name: 'Protein smoothie (whey, spinach, frozen fruit, almond milk)', calories: 320, protein_g: 30, carbs_g: 38, fat_g: 6, tags: ['quick'] },
    { name: 'Cottage cheese, pineapple, walnuts', calories: 300, protein_g: 26, carbs_g: 24, fat_g: 12, tags: ['vegetarian','quick'] },
    { name: 'Veggie egg muffins (meal-prepped) + fruit', calories: 350, protein_g: 27, carbs_g: 20, fat_g: 18, tags: ['meal-prep'] },
    { name: 'Oatmeal with peanut butter and sliced banana', calories: 440, protein_g: 18, carbs_g: 58, fat_g: 16, tags: ['vegetarian'] },
    { name: 'Turkey sausage, sweet potato hash, eggs', calories: 460, protein_g: 30, carbs_g: 34, fat_g: 20, tags: [] },
    { name: 'Breakfast burrito (eggs, black beans, salsa, whole wheat wrap)', calories: 410, protein_g: 26, carbs_g: 42, fat_g: 14, tags: ['vegetarian-option'] },
    { name: 'Protein pancakes with Greek yogurt topping', calories: 400, protein_g: 32, carbs_g: 40, fat_g: 10, tags: ['vegetarian'] },
    { name: 'Smoked salmon, whole grain toast, avocado', calories: 420, protein_g: 26, carbs_g: 28, fat_g: 20, tags: [] }
  ],
  lunch: [
    { name: 'Grilled chicken bowl — rice, black beans, veggies, salsa', calories: 560, protein_g: 42, carbs_g: 58, fat_g: 14, tags: ['meal-prep'] },
    { name: 'Turkey and avocado wrap, side salad', calories: 480, protein_g: 32, carbs_g: 36, fat_g: 20, tags: ['quick'] },
    { name: 'Big salad — grilled chicken, chickpeas, mixed greens, olive oil vinaigrette', calories: 460, protein_g: 36, carbs_g: 28, fat_g: 20, tags: ['low-carb'] },
    { name: 'Tuna salad (Greek yogurt based) over greens with crackers', calories: 420, protein_g: 34, carbs_g: 30, fat_g: 14, tags: ['quick'] },
    { name: 'Turkey chili with beans, side of cornbread', calories: 520, protein_g: 38, carbs_g: 50, fat_g: 14, tags: ['meal-prep'] },
    { name: 'Grilled shrimp, quinoa, roasted vegetables', calories: 480, protein_g: 34, carbs_g: 44, fat_g: 14, tags: [] },
    { name: 'Chicken burrito bowl with cauliflower rice', calories: 440, protein_g: 40, carbs_g: 30, fat_g: 16, tags: ['low-carb'] },
    { name: 'Lentil soup with whole grain bread', calories: 440, protein_g: 22, carbs_g: 62, fat_g: 10, tags: ['vegetarian'] },
    { name: 'Steak and sweet potato bowl with greens', calories: 560, protein_g: 42, carbs_g: 44, fat_g: 20, tags: [] },
    { name: 'Chickpea and vegetable curry over brown rice', calories: 500, protein_g: 20, carbs_g: 70, fat_g: 14, tags: ['vegetarian'] },
    { name: 'Turkey burger (no bun), roasted sweet potato, side salad', calories: 470, protein_g: 38, carbs_g: 32, fat_g: 18, tags: ['low-carb'] },
    { name: 'Egg salad (Greek yogurt based) over greens with fruit', calories: 400, protein_g: 26, carbs_g: 26, fat_g: 20, tags: ['vegetarian','quick'] }
  ],
  dinner: [
    { name: 'Baked salmon, roasted broccoli, brown rice', calories: 560, protein_g: 40, carbs_g: 42, fat_g: 22, tags: [] },
    { name: 'Lean beef stir-fry with mixed vegetables over rice', calories: 580, protein_g: 40, carbs_g: 52, fat_g: 18, tags: [] },
    { name: 'Grilled chicken breast, roasted potatoes, green beans', calories: 540, protein_g: 44, carbs_g: 44, fat_g: 16, tags: [] },
    { name: 'Turkey meatballs, whole wheat pasta, marinara, side salad', calories: 560, protein_g: 36, carbs_g: 58, fat_g: 16, tags: [] },
    { name: 'Baked cod, quinoa, roasted asparagus', calories: 460, protein_g: 36, carbs_g: 36, fat_g: 14, tags: ['low-carb'] },
    { name: 'Sheet pan chicken fajitas (peppers, onions, whole wheat tortilla)', calories: 520, protein_g: 38, carbs_g: 46, fat_g: 16, tags: [] },
    { name: 'Grilled pork tenderloin, roasted Brussels sprouts, sweet potato', calories: 540, protein_g: 38, carbs_g: 40, fat_g: 18, tags: [] },
    { name: 'Shrimp and vegetable stir-fry over cauliflower rice', calories: 420, protein_g: 34, carbs_g: 26, fat_g: 16, tags: ['low-carb'] },
    { name: 'Tofu and vegetable stir-fry over brown rice', calories: 480, protein_g: 24, carbs_g: 60, fat_g: 14, tags: ['vegetarian'] },
    { name: 'Turkey chili over baked potato', calories: 520, protein_g: 36, carbs_g: 52, fat_g: 14, tags: ['meal-prep'] },
    { name: 'Grilled chicken Caesar salad (light dressing, whole wheat croutons)', calories: 460, protein_g: 40, carbs_g: 24, fat_g: 20, tags: ['low-carb'] },
    { name: 'Black bean and vegetable enchiladas (corn tortilla)', calories: 500, protein_g: 22, carbs_g: 62, fat_g: 16, tags: ['vegetarian'] }
  ],
  snack: [
    { name: '1st Phorm protein shake', calories: 150, protein_g: 25, carbs_g: 5, fat_g: 2, tags: ['quick'], supplement: true },
    { name: 'Greek yogurt with berries', calories: 160, protein_g: 15, carbs_g: 18, fat_g: 2, tags: ['vegetarian','quick'] },
    { name: 'Apple with almond butter', calories: 200, protein_g: 5, carbs_g: 26, fat_g: 10, tags: ['vegetarian','quick'] },
    { name: 'Cottage cheese with pineapple', calories: 150, protein_g: 16, carbs_g: 14, fat_g: 2, tags: ['vegetarian'] },
    { name: 'Hard-boiled eggs (2) with a piece of fruit', calories: 180, protein_g: 14, carbs_g: 12, fat_g: 10, tags: ['quick'] },
    { name: 'Handful of almonds + string cheese', calories: 220, protein_g: 12, carbs_g: 8, fat_g: 16, tags: ['low-carb'] },
    { name: 'Protein bar (1st Phorm)', calories: 200, protein_g: 20, carbs_g: 18, fat_g: 7, tags: ['quick'], supplement: true },
    { name: 'Baby carrots and hummus', calories: 150, protein_g: 5, carbs_g: 18, fat_g: 7, tags: ['vegetarian'] },
    { name: 'Rice cakes with peanut butter', calories: 190, protein_g: 6, carbs_g: 24, fat_g: 9, tags: ['vegetarian'] },
    { name: 'Edamame (steamed, salted)', calories: 140, protein_g: 12, carbs_g: 12, fat_g: 5, tags: ['vegetarian'] }
  ]
};

// --- Gym location: Retro Fitness of Fairless Hills, 516 Lincoln Hwy, 19030 ---
const GYM_LAT = 40.1762, GYM_LON = -74.8530, RADIUS_MI = 10;

// --- What to harvest. Edit freely. "near {LOC}" gets filled with the
// target gym's city/state at query time, defaulting to Fairless Hills
// PA when no gym is specified. ---
const HARVEST_QUERIES = [
  { queryTpl: "chiropractor near {LOC}",            lead_type: "referral_partner", category: "chiropractor" },
  { queryTpl: "physical therapy near {LOC}",         lead_type: "referral_partner", category: "physical_therapy" },
  { queryTpl: "med spa near {LOC}",                  lead_type: "referral_partner", category: "med_spa" },
  { queryTpl: "nutritionist dietitian near {LOC}",   lead_type: "referral_partner", category: "nutritionist" },
  { queryTpl: "fire department near {LOC}",          lead_type: "corporate", category: "fire_department" },
  { queryTpl: "police department near {LOC}",        lead_type: "corporate", category: "police" },
  { queryTpl: "ambulance EMS near {LOC}",            lead_type: "corporate", category: "ems" },
  { queryTpl: "corporate office near {LOC}",         lead_type: "corporate", category: "employer" },
  { queryTpl: "manufacturing company near {LOC}",    lead_type: "corporate", category: "employer" },
  { queryTpl: "warehouse distribution near {LOC}",   lead_type: "corporate", category: "employer" }
];

const ALLOWED_TABLES = new Set([
  'partners','partner_taps','guest_shares','members','board_notes','notifications','huddle_messages','help_requests','coach_touchpoints','portal_messages','exercise_videos','scheduled_sessions','coach_notes','daily_intake_logs',
  'clients','consultations','followups','checkins','programs','training_sessions',
  'lead_sources','leads','touchpoints','outreach_log',
  'progress_photos','measurements','eod_reports','appointment_status',
  'meal_profiles','meal_plans','meals','recipes','pantry_items','meal_photos',
  'inbody_scans','workouts',
  'client_auth','challenges','challenge_entries','daily_logs','self_workouts','staff_auth','staff_shifts','punch_list_items','win_reactions','presence_checkins','member_groups','group_members','buddy_optins','feed_posts','class_rsvps','coach_profiles',
  'daily_content','client_wins','gym_events','gym_calendar_events',
  'gyms','pt_reps','pt_sales','gym_quotas',
  'eod_submissions','kpi_snapshots','shake_counts','prospect_log','guest_pass_log',
  'b2b_log','social_media_log','member_joins_log','schedule_changes',
  'maintenance_log','staff_performance','action_items','shift_logs',
  'staff_roster','hr_documents','hr_onboarding','hr_performance','candidates',
  'staff_availability','time_off_requests','gym_events','churn_surveys','chef_recipes','pt_appointments','coach_daily_tips','saved_programs','coach_coverage'
]);
const IDENT = /^[a-z_][a-z0-9_]*$/i;
const ORDER = /^[a-z_][a-z0-9_]*( (asc|desc))?$/i;

const ok  = (data, cors) => new Response(JSON.stringify({ ok: true, ...data }), { status: 200, headers: cors });
const bad = (msg, cors)  => new Response(JSON.stringify({ ok: false, error: msg }), { status: 200, headers: cors });

async function sha256(str) {
  const buf = await crypto.subtle.digest('SHA-256', new TextEncoder().encode(str));
  return Array.from(new Uint8Array(buf)).map(b=>b.toString(16).padStart(2,'0')).join('');
}
async function makeToken(clientId, email, secret) {
  const payload = btoa(JSON.stringify({ clientId, email, exp: Date.now() + 86400000 * 30 }));
  const sig = (await sha256(payload + secret)).slice(0,16);
  return payload + '.' + sig;
}
async function verifyToken(token, secret) {
  if (!token) return null;
  const [payload, sig] = token.split('.');
  if (!payload || !sig) return null;
  const expected = (await sha256(payload + secret)).slice(0,16);
  if (sig !== expected) return null;
  try { const d = JSON.parse(atob(payload)); if (d.exp < Date.now()) return null; return d; } catch(e) { return null; }
}

export default {
  async fetch(request, env) {
    const cors = {
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Methods': 'POST,GET,OPTIONS',
      'Access-Control-Allow-Headers': '*',
      'Content-Type': 'application/json'
    };
    if (request.method === 'OPTIONS') return new Response(null, { headers: cors });
    const url = new URL(request.url);

    // DEMO MODE ROUTING. Pass ?demo=1 on any request, or header
    // X-Demo-Mode: 1, to point every env.DB call at the isolated demo
    // database instead of the live one. Nothing downstream needs to
    // know which database it is, every existing handler keeps using
    // env.DB exactly as before.
    const isDemo = url.searchParams.get('demo') === '1' || request.headers.get('X-Demo-Mode') === '1';
    if (isDemo) {
      if (!env.DB_DEMO) return bad('Demo database binding DB_DEMO not found. Add it in Worker Settings Bindings before using demo mode.', cors);
      env = { ...env, DB: env.DB_DEMO };
    }

    try {
      if (url.pathname === '/health') return ok({ db: !!env.DB, demo: isDemo }, cors);

      if (url.pathname === '/db') {
        if (!env.DB) return bad('D1 binding "DB" not found.', cors);
        return await handleDb(await request.json(), env, cors);
      }

      // ── CANDIDATE PIPELINE (Phase 6) ────────────────────────────
      if (url.pathname === '/candidate/apply' && request.method === 'POST') {
        if (!env.DB) return bad('D1 binding "DB" not found.', cors);
        const b = await request.json().catch(() => ({}));
        const name = (b.name || '').trim();
        const roleApplied = (b.role_applied || '').trim();
        if (!name || !roleApplied) return bad('Name and role are required', cors);
        if (!b.phone && !b.email) return bad('Phone or email is required', cors);
        const now = new Date().toISOString();

        const insertRes = await env.DB.prepare(
          `INSERT INTO candidates (name, phone, email, role_applied, availability, source, referred_by, resume_text, cover_note, status, applied_at, updated_at)
           VALUES (?,?,?,?,?,?,?,?,?,?,?,?)`
        ).bind(
          name,
          b.phone || null,
          b.email || null,
          roleApplied,
          b.availability || null,
          b.source || 'Apply Page',
          b.referred_by || null,
          b.resume_text || null,
          b.cover_note || null,
          'New',
          now, now
        ).run();
        const candidateId = insertRes.meta?.last_row_id;

        // AI screening pass, best-effort. Application still succeeds if this fails.
        if (env.ANTHROPIC_KEY && (b.resume_text || b.cover_note)) {
          try {
            const sys = `You are screening a job application for a Retro Fitness gym. Role applied for: ${roleApplied}. Read the candidate's background/resume text and any cover note. Respond ONLY with JSON, no other text, in this exact shape: {"score": <integer 1-10>, "summary": "<2-3 sentence overview>", "strengths": ["...", "..."], "concerns": ["...", "..."]}. Score reflects fit for the role based only on what's written, not assumptions. If information is thin, say so in the summary and score conservatively.`;
            const user = `Candidate name: ${name}\nRole applied for: ${roleApplied}\nAvailability: ${b.availability || 'not stated'}\n\nBackground/resume:\n${b.resume_text || '(none provided)'}\n\nCover note:\n${b.cover_note || '(none provided)'}`;
            const aiResp = await fetch('https://api.anthropic.com/v1/messages', {
              method: 'POST',
              headers: { 'Content-Type': 'application/json', 'x-api-key': env.ANTHROPIC_KEY, 'anthropic-version': '2023-06-01' },
              body: JSON.stringify({ model: 'claude-sonnet-4-6', max_tokens: 700, system: sys, messages: [{ role: 'user', content: user }] })
            });
            const aiData = await aiResp.json();
            const raw = (aiData.content && aiData.content[0] && aiData.content[0].text) || '';
            const cleaned = raw.replace(/```json|```/g, '').trim();
            const parsed = JSON.parse(cleaned);
            await env.DB.prepare(
              `UPDATE candidates SET ai_score=?, ai_summary=?, ai_strengths=?, ai_concerns=?, updated_at=? WHERE id=?`
            ).bind(
              parsed.score || null,
              parsed.summary || null,
              JSON.stringify(parsed.strengths || []),
              JSON.stringify(parsed.concerns || []),
              new Date().toISOString(),
              candidateId
            ).run();
          } catch (e) { /* screening is best-effort, application already saved */ }
        }

        return ok({ id: candidateId, submitted: true }, cors);
      }

      if (url.pathname === '/harvest/run') {
        if (!env.DB) return bad('D1 binding "DB" not found.', cors);
        if (!env.OUTSCRAPER_KEY) return bad('OUTSCRAPER_KEY variable not set.', cors);
        const opt = await request.json().catch(() => ({}));
        return await runHarvest(opt, env, cors);
      }

      // ── REGIONAL: GYMS / REPS / SALES / QUOTAS ──────────────────────
      if (url.pathname === '/region/summary' && request.method === 'GET') {
        if (!env.DB) return bad('No DB', cors);
        const month = url.searchParams.get('month') || new Date().toISOString().slice(0,7);
        const includeDemo = url.searchParams.get('demo') === '1';
        return ok(await getRegionSummary(env, month, includeDemo), cors);
      }

      if (url.pathname === '/region/gym' && request.method === 'GET') {
        if (!env.DB) return bad('No DB', cors);
        const gymId = url.searchParams.get('gym_id');
        if (!gymId) return bad('gym_id required', cors);
        const month = url.searchParams.get('month') || new Date().toISOString().slice(0,7);
        return ok(await getGymDetail(env, gymId, month), cors);
      }

      if (url.pathname === '/region/forecast' && request.method === 'GET') {
        if (!env.DB) return bad('No DB', cors);
        const gymId = url.searchParams.get('gym_id'); // omit for region-wide forecast
        return ok(await getForecast(env, gymId), cors);
      }

      if (url.pathname === '/quota/set' && request.method === 'POST') {
        if (!env.DB) return bad('No DB', cors);
        const body = await request.json();
        if (!body.gym_id || !body.month || body.goal_amount == null) return bad('gym_id, month, goal_amount required', cors);
        const existing = await env.DB.prepare('SELECT id FROM gym_quotas WHERE gym_id=? AND month=?').bind(body.gym_id, body.month).first();
        if (existing) {
          await env.DB.prepare('UPDATE gym_quotas SET goal_amount=?, set_by=?, updated_at=? WHERE id=?')
            .bind(body.goal_amount, body.set_by||'Keelin', new Date().toISOString(), existing.id).run();
        } else {
          await env.DB.prepare('INSERT INTO gym_quotas (gym_id,month,goal_amount,set_by,updated_at) VALUES (?,?,?,?,?)')
            .bind(body.gym_id, body.month, body.goal_amount, body.set_by||'Keelin', new Date().toISOString()).run();
        }
        return ok({ set: true }, cors);
      }

      if (url.pathname === '/calendar' && request.method === 'GET') {
        if (!env.GCAL_ICS) return bad('GCAL_ICS variable not set.', cors);
        const ical = await (await fetch(env.GCAL_ICS)).text();
        const events = parseUpcoming(ical, 25);
        return ok({ events }, cors);
      }

      if (url.pathname === '/mealplan/generate' && request.method === 'POST') {
        if (!env.DB) return bad('D1 binding "DB" not found.', cors);
        const o = await request.json().catch(() => ({}));
        return ok(await generateMealPlans(env, { clientId: o.client }), cors);
      }

      if (url.pathname === '/mealplan/library' && request.method === 'GET') {
        let photoMap = {};
        if (env.DB) {
          try {
            const rows = await env.DB.prepare('SELECT item_name, photo_url FROM meal_photos').all();
            (rows.results||[]).forEach(r => { if (r.photo_url) photoMap[r.item_name] = r.photo_url; });
          } catch(e) {}
        }
        const withPhotos = {};
        for (const cat of Object.keys(MEAL_LIBRARY)) {
          withPhotos[cat] = MEAL_LIBRARY[cat].map(m => ({ ...m, photo_url: photoMap[m.name] || null }));
        }
        return ok({ library: withPhotos }, cors);
      }

      if (url.pathname === '/mealplan/set-photo' && request.method === 'POST') {
        if (!env.DB) return bad('No DB', cors);
        const authHeader = request.headers.get('X-Admin-Key') || '';
        if (authHeader !== (env.ADMIN_KEY || 'retro-admin-2024')) return bad('Unauthorized', cors);
        const b = await request.json();
        if (!b.item_name) return bad('item_name required', cors);
        await env.DB.prepare('INSERT INTO meal_photos (item_name,photo_url,updated_at) VALUES (?,?,?) ON CONFLICT(item_name) DO UPDATE SET photo_url=excluded.photo_url, updated_at=excluded.updated_at')
          .bind(b.item_name, b.photo_url || null, new Date().toISOString()).run();
        return ok({ saved: true }, cors);
      }

      if (url.pathname === '/photo/upload' && request.method === 'POST') {
        if (!env.PHOTOS) return bad('R2 binding "PHOTOS" not found.', cors);
        if (!env.DB) return bad('D1 binding "DB" not found.', cors);
        const p = url.searchParams;
        const client = p.get('client'), pose = p.get('pose') || 'other';
        const source = p.get('source') || 'adhoc';
        const capturedAt = p.get('captured_at') || new Date().toISOString();
        if (!client) return bad('client id required', cors);
        const ts = Date.now();
        const key = `clients/${client}/${ts}_${pose}.jpg`;
        const bytes = await request.arrayBuffer();
        await env.PHOTOS.put(key, bytes, { httpMetadata: { contentType: 'image/jpeg' } });
        const res = await env.DB.prepare(
          `INSERT INTO progress_photos (client_id,captured_at,pose,r2_key,source) VALUES (?,?,?,?,?)`
        ).bind(client, capturedAt, pose, key, source).run();
        return ok({ key, id: res.meta?.last_row_id }, cors);
      }

      if (url.pathname === '/photo/get' && request.method === 'GET') {
        if (!env.PHOTOS) return bad('R2 binding "PHOTOS" not found.', cors);
        const key = url.searchParams.get('key');
        if (!key) return bad('key required', cors);
        const obj = await env.PHOTOS.get(key);
        if (!obj) return new Response('Not found', { status: 404, headers: cors });
        return new Response(obj.body, { status: 200, headers: {
          'Content-Type': 'image/jpeg', 'Cache-Control': 'private, max-age=3600', 'Access-Control-Allow-Origin': '*'
        }});
      }

      if (url.pathname === '/file/upload' && request.method === 'POST') {
        if (!env.PHOTOS) return bad('R2 binding "PHOTOS" not found.', cors);
        const p = url.searchParams;
        const client = p.get('client');
        const kind = (p.get('kind') || 'file').replace(/[^a-z0-9_]/gi, '');
        const ext  = (p.get('ext')  || 'bin').replace(/[^a-z0-9]/gi, '').toLowerCase();
        const ct   = p.get('ct') || 'application/octet-stream';
        if (!client) return bad('client id required', cors);
        const key = `clients/${client}/${kind}/${Date.now()}.${ext}`;
        const bytes = await request.arrayBuffer();
        await env.PHOTOS.put(key, bytes, { httpMetadata: { contentType: ct } });
        return ok({ key }, cors);
      }

      if (url.pathname === '/file/get' && request.method === 'GET') {
        if (!env.PHOTOS) return bad('R2 binding "PHOTOS" not found.', cors);
        const key = url.searchParams.get('key');
        if (!key) return bad('key required', cors);
        const obj = await env.PHOTOS.get(key);
        if (!obj) return new Response('Not found', { status: 404, headers: cors });
        const ct = (obj.httpMetadata && obj.httpMetadata.contentType) || 'application/octet-stream';
        return new Response(obj.body, { status: 200, headers: {
          'Content-Type': ct, 'Cache-Control': 'private, max-age=3600', 'Access-Control-Allow-Origin': '*'
        }});
      }

      // ── NUTRITION CAPTURE ────────────────────────────────────────
      if (url.pathname === '/nutrition/photo' && request.method === 'POST') {
        if (!env.PHOTOS) return bad('R2 binding "PHOTOS" not found.', cors);
        if (!env.ANTHROPIC_KEY) return bad('ANTHROPIC_KEY not set.', cors);
        const p = url.searchParams;
        const client = p.get('client');
        const mealType = p.get('meal_type') || 'meal';
        if (!client) return bad('client id required', cors);
        const bytes = await request.arrayBuffer();
        const ct = request.headers.get('Content-Type') || 'image/jpeg';
        const key = `clients/${client}/meals/${Date.now()}.jpg`;
        await env.PHOTOS.put(key, bytes, { httpMetadata: { contentType: ct } });
        let b64 = '';
        {
          const chunk = 8192; const arr = new Uint8Array(bytes);
          let s = '';
          for (let i=0;i<arr.length;i+=chunk) s += String.fromCharCode.apply(null, arr.subarray(i, i+chunk));
          b64 = btoa(s);
        }
        const media_type = ct.indexOf('png')>-1 ? 'image/png' : 'image/jpeg';
        const sys = 'You identify foods in a plate photo for a fitness client nutrition log. Return ONLY valid JSON, no markdown, no prose, with this exact shape: {"items":[{"name":"food name","portion":"estimated portion e.g. 6 oz or 1 cup","calories":number,"protein_g":number,"carbs_g":number,"fat_g":number}],"total":{"calories":number,"protein_g":number,"carbs_g":number,"fat_g":number}}. Use realistic restaurant or home cooking portion estimates from the visual. If nothing edible is identifiable, return items as an empty array and total as all zeros.';
        const aiResp = await fetch('https://api.anthropic.com/v1/messages', {
          method: 'POST',
          headers: { 'Content-Type':'application/json','x-api-key':env.ANTHROPIC_KEY,'anthropic-version':'2023-06-01' },
          body: JSON.stringify({
            model:'claude-sonnet-4-6', max_tokens:800, system: sys,
            messages:[{role:'user', content:[
              { type:'image', source:{ type:'base64', media_type, data:b64 } },
              { type:'text', text:('This is a ' + mealType + ' photo. Identify the foods and estimate macros.') }
            ]}]
          })
        });
        const aiData = await aiResp.json();
        const text = (aiData.content||[]).filter(b=>b.type==='text').map(b=>b.text||'').join('').trim();
        let parsed;
        try { parsed = JSON.parse(text.replace(/```json|```/g,'').trim()); }
        catch(e) { return ok({ photo_key:key, items:[], total:{calories:0,protein_g:0,carbs_g:0,fat_g:0}, parse_error:true }, cors); }
        return ok({ photo_key:key, items:parsed.items||[], total:parsed.total||{calories:0,protein_g:0,carbs_g:0,fat_g:0} }, cors);
      }

      if (url.pathname === '/nutrition/estimate' && request.method === 'POST') {
        if (!env.ANTHROPIC_KEY) return bad('ANTHROPIC_KEY not set.', cors);
        const body = await request.json();
        const description = (body.description || '').trim();
        const portion = (body.portion || '').trim();
        if (!description) return bad('description required', cors);        const sys = 'You estimate nutrition macros for a fitness client food log from a plain text description. Return ONLY valid JSON, no markdown, no prose, with this exact shape: {"items":[{"name":"food name","portion":"portion used","calories":number,"protein_g":number,"carbs_g":number,"fat_g":number}],"total":{"calories":number,"protein_g":number,"carbs_g":number,"fat_g":number}}. Use standard nutrition database values for common foods and reasonable estimates for homemade dishes.';
        const user = 'Food: ' + description + (portion ? ('. Portion: ' + portion) : '');
        const aiResp = await fetch('https://api.anthropic.com/v1/messages', {
          method: 'POST',
          headers: { 'Content-Type':'application/json','x-api-key':env.ANTHROPIC_KEY,'anthropic-version':'2023-06-01' },
          body: JSON.stringify({ model:'claude-sonnet-4-6', max_tokens:500, system: sys, messages:[{role:'user',content:user}] })
        });
        const aiData = await aiResp.json();
        const text = (aiData.content||[]).filter(b=>b.type==='text').map(b=>b.text||'').join('').trim();
        let parsed;
        try { parsed = JSON.parse(text.replace(/```json|```/g,'').trim()); }
        catch(e) { return ok({ items:[], total:{calories:0,protein_g:0,carbs_g:0,fat_g:0}, parse_error:true }, cors); }
        return ok({ items:parsed.items||[], total:parsed.total||{calories:0,protein_g:0,carbs_g:0,fat_g:0} }, cors);
      }

      if (url.pathname === '/recipes/generate' && request.method === 'POST') {
        if (!env.DB) return bad('No DB', cors);
        if (!env.ANTHROPIC_KEY) return bad('ANTHROPIC_KEY not set.', cors);
        const body = await request.json();
        const clientId = body.client_id;
        if (!clientId) return bad('client_id required', cors);
        const client = await env.DB.prepare('SELECT * FROM clients WHERE id=?').bind(clientId).first();
        if (!client) return bad('Client not found', cors);
        const pkg = (client.package || '').toLowerCase();
        if (pkg !== 'complete' && pkg !== 'complete_plus') return bad('Recipe bank requires Complete or Complete+ package', cors);
        const mp = await env.DB.prepare('SELECT * FROM meal_profiles WHERE client_id=? LIMIT 1').bind(clientId).first() || {};
        const count = Math.min(Math.max(parseInt(body.count,10) || 6, 1), 10);
        const macroLine = (mp.calories || mp.protein_g)
          ? `Daily targets: ${mp.calories||'?'} kcal, protein ${mp.protein_g||'?'}g, carbs ${mp.carbs_g||'?'}g, fat ${mp.fat_g||'?'}g. Size portions to fit sensibly within one meal of that budget.`
          : 'No fixed macro targets on file; write balanced, protein-forward recipes.';
        const sys = `You are Coach Ted, a Retro Fitness personal trainer and former professional chef, writing recipes for one of your PT clients. Write in your own voice: practical, encouraging, a little insider, zero wasted words, like a chef who also coaches. Return ONLY valid JSON, no markdown, no prose, with this exact shape: {"recipes":[{"title":"string","meal_type":"breakfast|lunch|dinner|snack","prep_min":number,"calories":number,"protein_g":number,"carbs_g":number,"fat_g":number,"ingredients":["string",...],"steps":["string",...],"tags":["string",...],"supplement_note":"string or empty"}]}. Generate exactly ${count} recipes spread across meal types. Strictly avoid every excluded food and allergen listed below. If a medical condition is listed, do not design around it clinically; just keep the recipe general and note nothing medical. For snack or shake recipes only, set supplement_note to one short sentence suggesting a 1st Phorm protein powder or supplement with this link: ${FPLINK}; for all other recipes leave supplement_note as an empty string. No emojis, no em dashes, plain punctuation only.`;
        const user = `Client goal: ${mp.goal_type || client.goal_primary || 'general fitness'}.
${macroLine}
Excluded proteins: ${mp.excluded_proteins||'none'}. Excluded vegetables: ${mp.excluded_vegetables||'none'}. Excluded fruits: ${mp.excluded_fruits||'none'}.
Allergies: ${mp.allergies||'none'}. Medical conditions: ${mp.conditions||'none'}.`;
        const aiResp = await fetch('https://api.anthropic.com/v1/messages', {
          method: 'POST',
          headers: { 'Content-Type':'application/json','x-api-key':env.ANTHROPIC_KEY,'anthropic-version':'2023-06-01' },
          body: JSON.stringify({ model:'claude-sonnet-4-6', max_tokens:3000, system: sys, messages:[{role:'user',content:user}] })
        });
        const aiData = await aiResp.json();
        const text = (aiData.content||[]).filter(b=>b.type==='text').map(b=>b.text||'').join('').trim();
        let parsed;
        try { parsed = JSON.parse(text.replace(/```json|```/g,'').trim()); }
        catch(e) { return bad('Could not generate recipes, try again', cors); }
        const recipes = parsed.recipes || [];
        const nowIso = new Date().toISOString();
        const saved = [];
        for (const r of recipes) {
          const row = {
            client_id: clientId, title: r.title || 'Untitled recipe', meal_type: r.meal_type || 'snack',
            prep_min: r.prep_min || null, calories: r.calories || null, protein_g: r.protein_g || null,
            carbs_g: r.carbs_g || null, fat_g: r.fat_g || null,
            ingredients_json: JSON.stringify(r.ingredients || []), steps_json: JSON.stringify(r.steps || []),
            tags: (r.tags||[]).join('|'), supplement_note: r.supplement_note || '',
            created_at: nowIso
          };
          const cols = Object.keys(row);
          const res = await env.DB.prepare(`INSERT INTO recipes (${cols.join(',')}) VALUES (${cols.map(()=>'?').join(',')})`)
            .bind(...cols.map(c=>row[c])).run();
          saved.push({ ...row, id: res.meta?.last_row_id });
        }
        return ok({ recipes: saved }, cors);
      }

      // ── CLIENT AUTH ──────────────────────────────────────────────
      if (url.pathname === '/auth/login' && request.method === 'POST') {
        if (!env.DB) return bad('No DB', cors);
        const { email, password } = await request.json();
        if (!email || !password) return bad('email and password required', cors);
        const row = await env.DB.prepare('SELECT * FROM client_auth WHERE email=? AND active=1').bind(email.toLowerCase().trim()).first();
        if (!row) return ok({ ok: false, error: 'Invalid email or password' }, cors);
        const hash = await sha256(password);
        if (hash !== row.password_hash) return ok({ ok: false, error: 'Invalid email or password' }, cors);
        await env.DB.prepare('UPDATE client_auth SET last_login=? WHERE id=?').bind(new Date().toISOString(), row.id).run();
        const token = await makeToken(row.client_id, email, env.JWT_SECRET || 'bs-secret-2024');
        return ok({ token, client_id: row.client_id, must_change: row.must_change_password }, cors);
      }

      if (url.pathname === '/auth/change-password' && request.method === 'POST') {
        if (!env.DB) return bad('No DB', cors);
        const { email, old_password, new_password } = await request.json();
        if (!email || !old_password || !new_password) return bad('missing fields', cors);
        const row = await env.DB.prepare('SELECT * FROM client_auth WHERE email=? AND active=1').bind(email.toLowerCase().trim()).first();
        if (!row) return bad('Not found', cors);
        if (await sha256(old_password) !== row.password_hash) return bad('Current password incorrect', cors);
        const hash = await sha256(new_password);
        await env.DB.prepare('UPDATE client_auth SET password_hash=?, must_change_password=0 WHERE id=?').bind(hash, row.id).run();
        return ok({ changed: true }, cors);
      }

      if (url.pathname === '/auth/provision' && request.method === 'POST') {
        if (!env.DB) return bad('No DB', cors);
        const authHeader = request.headers.get('X-Admin-Key') || '';
        if (authHeader !== (env.ADMIN_KEY || 'retro-admin-2024')) return bad('Unauthorized', cors);
        const { client_id, email, password } = await request.json();
        if (!client_id || !email || !password) return bad('client_id, email, password required', cors);
        const hash = await sha256(password);
        await env.DB.prepare('INSERT OR REPLACE INTO client_auth (client_id,email,password_hash,must_change_password,active) VALUES (?,?,?,1,1)')
          .bind(client_id, email.toLowerCase().trim(), hash).run();
        return ok({ provisioned: true }, cors);
      }

      if (url.pathname === '/auth/revoke' && request.method === 'POST') {
        if (!env.DB) return bad('No DB', cors);
        const authHeader = request.headers.get('X-Admin-Key') || '';
        if (authHeader !== (env.ADMIN_KEY || 'retro-admin-2024')) return bad('Unauthorized', cors);
        const { email } = await request.json();
        await env.DB.prepare('UPDATE client_auth SET active=0 WHERE email=?').bind(email.toLowerCase().trim()).run();
        return ok({ revoked: true }, cors);
      }

      // ── STAFF AUTH (separate login tier — coaches, MEAs, floor techs, management) ──
      if (url.pathname === '/staff/login' && request.method === 'POST') {
        if (!env.DB) return bad('No DB', cors);
        const { email, pin } = await request.json();
        if (!email || !pin) return bad('email and pin required', cors);
        const row = await env.DB.prepare('SELECT * FROM staff_auth WHERE email=? AND active=1').bind(email.toLowerCase().trim()).first();
        if (!row) return ok({ ok: false, error: 'Invalid email or PIN' }, cors);
        const hash = await sha256(pin);
        if (hash !== row.pin_hash) return ok({ ok: false, error: 'Invalid email or PIN' }, cors);
        const staff = await env.DB.prepare('SELECT * FROM staff_roster WHERE id=? AND active=1').bind(row.staff_id).first();
        if (!staff) return ok({ ok: false, error: 'Staff record not found or inactive' }, cors);
        await env.DB.prepare('UPDATE staff_auth SET last_login=? WHERE id=?').bind(new Date().toISOString(), row.id).run();
        const token = await makeToken(row.staff_id, email, env.JWT_SECRET || 'bs-secret-2024');
        return ok({ token, staff_id: row.staff_id, name: staff.name, role: staff.role, must_change: row.must_change_pin }, cors);
      }

      if (url.pathname === '/staff/change-pin' && request.method === 'POST') {
        if (!env.DB) return bad('No DB', cors);
        const { email, old_pin, new_pin } = await request.json();
        if (!email || !old_pin || !new_pin) return bad('missing fields', cors);
        if (!/^\d{4,6}$/.test(new_pin)) return bad('PIN must be 4-6 digits', cors);
        const row = await env.DB.prepare('SELECT * FROM staff_auth WHERE email=? AND active=1').bind(email.toLowerCase().trim()).first();
        if (!row) return bad('Not found', cors);
        if (await sha256(old_pin) !== row.pin_hash) return bad('Current PIN incorrect', cors);
        const hash = await sha256(new_pin);
        await env.DB.prepare('UPDATE staff_auth SET pin_hash=?, must_change_pin=0 WHERE id=?').bind(hash, row.id).run();
        return ok({ changed: true }, cors);
      }

      if (url.pathname === '/staff/provision' && request.method === 'POST') {
        if (!env.DB) return bad('No DB', cors);
        const authHeader = request.headers.get('X-Admin-Key') || '';
        if (authHeader !== (env.ADMIN_KEY || 'retro-admin-2024')) return bad('Unauthorized', cors);
        const { staff_id, email, pin } = await request.json();
        if (!staff_id || !email || !pin) return bad('staff_id, email, pin required', cors);
        if (!/^\d{4,6}$/.test(pin)) return bad('PIN must be 4-6 digits', cors);
        const hash = await sha256(pin);
        await env.DB.prepare('INSERT OR REPLACE INTO staff_auth (staff_id,email,pin_hash,must_change_pin,active) VALUES (?,?,?,1,1)')
          .bind(staff_id, email.toLowerCase().trim(), hash).run();
        return ok({ provisioned: true }, cors);
      }

      if (url.pathname === '/staff/revoke' && request.method === 'POST') {
        if (!env.DB) return bad('No DB', cors);
        const authHeader = request.headers.get('X-Admin-Key') || '';
        if (authHeader !== (env.ADMIN_KEY || 'retro-admin-2024')) return bad('Unauthorized', cors);
        const { email } = await request.json();
        await env.DB.prepare('UPDATE staff_auth SET active=0 WHERE email=?').bind(email.toLowerCase().trim()).run();
        return ok({ revoked: true }, cors);
      }

      if (url.pathname === '/staff/reset-request' && request.method === 'POST') {
        if (!env.DB) return bad('No DB', cors);
        const { email } = await request.json();
        if (!email) return bad('email required', cors);
        const em = email.toLowerCase().trim();
        const row = await env.DB.prepare('SELECT * FROM staff_auth WHERE email=?').bind(em).first();
        if (row) {
          const code = String(Math.floor(100000 + Math.random() * 900000));
          const expires = new Date(Date.now() + 15 * 60 * 1000).toISOString();
          await env.DB.prepare('UPDATE staff_auth SET reset_code_hash=?, reset_expires=?, active=1 WHERE id=?')
            .bind(await sha256(code), expires, row.id).run();
          if (!env.RESEND_KEY) {
            return ok({ sent: false, mail_configured: false, reason: 'RESEND_KEY is not set on this Worker — no email provider configured, so no email was sent.' }, cors);
          }
          try {
            const mailResp = await fetch('https://api.resend.com/emails', {
              method: 'POST',
              headers: { 'Authorization': 'Bearer ' + env.RESEND_KEY, 'Content-Type': 'application/json' },
              body: JSON.stringify({
                from: env.MAIL_FROM || 'onboarding@resend.dev',
                to: [em],
                subject: 'Retro Strong: Your staff PIN reset code',
                html: '<div style="font-family:Arial,sans-serif;max-width:420px;margin:0 auto"><h2 style="color:#E0192B">RETRO STRONG</h2><p>Use this code to reset your staff PIN. It expires in 15 minutes.</p><div style="font-size:32px;font-weight:bold;letter-spacing:6px;background:#F5F6F8;padding:16px;text-align:center;border-radius:10px">' + code + '</div><p style="color:#888;font-size:12px">If you did not request this, you can ignore this email.</p></div>'
              })
            });
            const mailData = await mailResp.json().catch(() => ({}));
            if (!mailResp.ok) return ok({ sent: false, mail_configured: true, reason: 'Resend rejected the send: ' + (mailData.message || mailResp.status) }, cors);
          } catch (e) {
            return ok({ sent: false, mail_configured: true, reason: 'Network error reaching Resend: ' + e.message }, cors);
          }
        }
        return ok({ sent: true }, cors);
      }

      // ── CHURN SURVEY (sent when a client is marked cancelled) ─────
      if (url.pathname === '/churn-survey/send' && request.method === 'POST') {
        if (!env.DB) return bad('No DB', cors);
        const b = await request.json();
        if (!b.client_id) return bad('client_id required', cors);
        const client = await env.DB.prepare('SELECT first_name, last_name, email FROM clients WHERE id=?').bind(b.client_id).first();
        if (!client || !client.email) return ok({ sent: false, reason: 'No email on file for this client' }, cors);
        const now = new Date().toISOString();
        const ins = await env.DB.prepare('INSERT INTO churn_surveys (client_id,cancel_reason,sent_at) VALUES (?,?,?)').bind(b.client_id, b.reason || null, now).run();
        const surveyId = ins.meta ? ins.meta.last_row_id : null;
        if (!env.RESEND_KEY) {
          return ok({ sent: false, mail_configured: false, reason: 'RESEND_KEY is not set on this Worker — no email provider configured, so no email was sent.' }, cors);
        }
        const surveyUrl = (env.SURVEY_BASE_URL || 'https://myretrostrong.com/churn-survey.html') + '?survey=' + surveyId;
        try {
          const mailResp = await fetch('https://api.resend.com/emails', {
            method: 'POST',
            headers: { 'Authorization': 'Bearer ' + env.RESEND_KEY, 'Content-Type': 'application/json' },
            body: JSON.stringify({
              from: env.MAIL_FROM || 'onboarding@resend.dev',
              to: [client.email],
              subject: 'We\'re sorry to see you go — quick question?',
              html: '<div style="font-family:Arial,sans-serif;max-width:480px;margin:0 auto"><h2 style="color:#E0192B">RETRO FITNESS</h2><p>Hi ' + (client.first_name||'there') + ', we\'re sorry to see your membership end. Your feedback genuinely helps us do better — could you take 60 seconds to tell us what happened?</p><p style="text-align:center;margin:24px 0"><a href="' + surveyUrl + '" style="background:#E0192B;color:#fff;padding:12px 24px;border-radius:8px;text-decoration:none;font-weight:bold">Share Feedback</a></p><p style="color:#888;font-size:12px">Thank you for having been part of our gym.</p></div>'
            })
          });
          const mailData = await mailResp.json().catch(() => ({}));
          if (!mailResp.ok) return ok({ sent: false, mail_configured: true, reason: 'Resend rejected the send: ' + (mailData.message || mailResp.status) }, cors);
        } catch (e) {
          return ok({ sent: false, mail_configured: true, reason: 'Network error reaching Resend: ' + e.message }, cors);
        }
        return ok({ sent: true, survey_id: surveyId }, cors);
      }

      if (url.pathname === '/churn-survey/submit' && request.method === 'POST') {
        if (!env.DB) return bad('No DB', cors);
        const b = await request.json();
        if (!b.survey_id) return bad('survey_id required', cors);
        await env.DB.prepare('UPDATE churn_surveys SET liked_most=?, reason_detail=?, would_return=?, submitted_at=? WHERE id=?')
          .bind(b.liked_most || null, b.reason_detail || null, b.would_return || null, new Date().toISOString(), b.survey_id).run();
        return ok({ submitted: true }, cors);
      }

      if (url.pathname === '/staff/reset-confirm' && request.method === 'POST') {
        if (!env.DB) return bad('No DB', cors);
        const { email, code, new_pin } = await request.json();
        if (!email || !code || !new_pin) return bad('email, code, new_pin required', cors);
        if (!/^\d{4,6}$/.test(new_pin)) return ok({ ok: false, error: 'PIN must be 4-6 digits.' }, cors);
        const em = email.toLowerCase().trim();
        const row = await env.DB.prepare('SELECT * FROM staff_auth WHERE email=?').bind(em).first();
        if (!row || !row.reset_code_hash) return ok({ ok: false, error: 'Invalid or expired code.' }, cors);
        if (!row.reset_expires || new Date(row.reset_expires) < new Date()) return ok({ ok: false, error: 'Code expired. Request a new one.' }, cors);
        if (await sha256(String(code).trim()) !== row.reset_code_hash) return ok({ ok: false, error: 'Invalid or expired code.' }, cors);
        const hash = await sha256(new_pin);
        await env.DB.prepare('UPDATE staff_auth SET pin_hash=?, must_change_pin=0, active=1, reset_code_hash=NULL, reset_expires=NULL WHERE id=?')
          .bind(hash, row.id).run();
        return ok({ ok: true, reset: true }, cors);
      }

      // ── STAFF SHIFTS + COVERAGE ────────────────────────────────────
      if (url.pathname === '/shifts/create' && request.method === 'POST') {
        if (!env.DB) return bad('No DB', cors);
        const b = await request.json();
        if (!b.staff_id || !b.staff_name || !b.role || !b.shift_date || !b.start_time || !b.end_time) return bad('staff_id, staff_name, role, shift_date, start_time, end_time required', cors);
        const now = new Date().toISOString();
        const ins = await env.DB.prepare(
          `INSERT INTO staff_shifts (staff_id,staff_name,role,gym_id,shift_date,start_time,end_time,status,created_by,created_at,updated_at)
           VALUES (?,?,?,?,?,?,?,'scheduled',?,?,?)`
        ).bind(b.staff_id, b.staff_name, b.role, b.gym_id||1, b.shift_date, b.start_time, b.end_time, b.created_by||'', now, now).run();
        return ok({ id: ins.meta?.last_row_id }, cors);
      }

      if (url.pathname === '/shifts/update' && request.method === 'POST') {
        if (!env.DB) return bad('No DB', cors);
        const b = await request.json();
        if (!b.id) return bad('id required', cors);
        const fields = [], binds = [];
        for (const k of ['shift_date','start_time','end_time','role']) {
          if (b[k] != null) { fields.push(k+'=?'); binds.push(b[k]); }
        }
        if (!fields.length) return bad('nothing to update', cors);
        fields.push('updated_at=?'); binds.push(new Date().toISOString());
        binds.push(b.id);
        await env.DB.prepare(`UPDATE staff_shifts SET ${fields.join(', ')} WHERE id=?`).bind(...binds).run();
        return ok({ updated: true }, cors);
      }

      if (url.pathname === '/shifts/delete' && request.method === 'POST') {
        if (!env.DB) return bad('No DB', cors);
        const b = await request.json();
        if (!b.id) return bad('id required', cors);
        await env.DB.prepare('DELETE FROM staff_shifts WHERE id=?').bind(b.id).run();
        return ok({ deleted: true }, cors);
      }

      if (url.pathname === '/shifts/mine' && request.method === 'GET') {
        if (!env.DB) return bad('No DB', cors);
        const staffId = url.searchParams.get('staff_id');
        if (!staffId) return bad('staff_id required', cors);
        const today = new Date().toISOString().slice(0,10);
        const rows = await env.DB.prepare(
          "SELECT * FROM staff_shifts WHERE staff_id=? AND shift_date>=? AND status!='cancelled' ORDER BY shift_date ASC, start_time ASC LIMIT 30"
        ).bind(staffId, today).all();
        return ok({ shifts: rows.results || [] }, cors);
      }

      if (url.pathname === '/shifts/open' && request.method === 'GET') {
        if (!env.DB) return bad('No DB', cors);
        const role = url.searchParams.get('role');
        const today = new Date().toISOString().slice(0,10);
        let q = "SELECT * FROM staff_shifts WHERE status='needs_coverage' AND shift_date>=?";
        const binds = [today];
        if (role) { q += ' AND role=?'; binds.push(role); }
        q += ' ORDER BY shift_date ASC, start_time ASC LIMIT 50';
        const rows = await env.DB.prepare(q).bind(...binds).all();
        return ok({ shifts: rows.results || [] }, cors);
      }

      if (url.pathname === '/shifts/day' && request.method === 'GET') {
        if (!env.DB) return bad('No DB', cors);
        const date = url.searchParams.get('date');
        if (!date) return bad('date required', cors);
        const [shiftRows, sessionRows] = await Promise.all([
          env.DB.prepare("SELECT * FROM staff_shifts WHERE shift_date=? AND status!='cancelled' ORDER BY start_time ASC").bind(date).all(),
          env.DB.prepare(
            `SELECT s.id, s.client_id, s.scheduled_date, s.program_name, c.first_name, c.last_name, COALESCE(NULLIF(s.assigned_coach,''), c.coach) AS coach
             FROM scheduled_sessions s JOIN clients c ON s.client_id = c.id
             WHERE s.scheduled_date=? AND s.status='scheduled' ORDER BY coach ASC`
          ).bind(date).all()
        ]);
        return ok({ shifts: shiftRows.results || [], pt_sessions: sessionRows.results || [] }, cors);
      }

      if (url.pathname === '/shifts/month' && request.method === 'GET') {
        if (!env.DB) return bad('No DB', cors);
        const month = url.searchParams.get('month');
        if (!month) return bad('month (YYYY-MM) required', cors);
        const [shiftRows, sessionRows] = await Promise.all([
          env.DB.prepare("SELECT shift_date d, COUNT(*) n FROM staff_shifts WHERE substr(shift_date,1,7)=? AND status!='cancelled' GROUP BY d").bind(month).all(),
          env.DB.prepare("SELECT scheduled_date d, COUNT(*) n FROM scheduled_sessions WHERE substr(scheduled_date,1,7)=? AND status='scheduled' GROUP BY d").bind(month).all()
        ]);
        return ok({ shift_days: shiftRows.results || [], session_days: sessionRows.results || [] }, cors);
      }

      if (url.pathname === '/shifts/request-coverage' && request.method === 'POST') {
        if (!env.DB) return bad('No DB', cors);
        const b = await request.json();
        if (!b.id) return bad('id required', cors);
        await env.DB.prepare("UPDATE staff_shifts SET status='needs_coverage', coverage_note=?, updated_at=? WHERE id=?")
          .bind(b.note || null, new Date().toISOString(), b.id).run();
        return ok({ requested: true }, cors);
      }

      if (url.pathname === '/shifts/cancel-request' && request.method === 'POST') {
        if (!env.DB) return bad('No DB', cors);
        const b = await request.json();
        if (!b.id) return bad('id required', cors);
        await env.DB.prepare("UPDATE staff_shifts SET status='scheduled', coverage_note=NULL, updated_at=? WHERE id=? AND status='needs_coverage'")
          .bind(new Date().toISOString(), b.id).run();
        return ok({ cancelled: true }, cors);
      }

      if (url.pathname === '/shifts/claim-coverage' && request.method === 'POST') {
        if (!env.DB) return bad('No DB', cors);
        const b = await request.json();
        if (!b.id || !b.covering_staff_id || !b.covering_name) return bad('id, covering_staff_id, covering_name required', cors);
        const shift = await env.DB.prepare("SELECT * FROM staff_shifts WHERE id=? AND status='needs_coverage'").bind(b.id).first();
        if (!shift) return bad('Shift not found or already covered', cors);
        await env.DB.prepare("UPDATE staff_shifts SET status='covered', covered_by_staff_id=?, covered_by_name=?, updated_at=? WHERE id=?")
          .bind(b.covering_staff_id, b.covering_name, new Date().toISOString(), b.id).run();
        const whenText = shift.shift_date === new Date().toISOString().slice(0,10) ? 'today' : ('on ' + new Date(shift.shift_date+'T00:00:00').toLocaleDateString('en-US',{month:'long',day:'numeric'}));
        await env.DB.prepare('INSERT INTO notifications (recipient,type,payload_json) VALUES (?,?,?)')
          .bind('management', 'shift_covered', JSON.stringify({
            shift_id: b.id, original_staff: shift.staff_name, covering_staff: b.covering_name,
            role: shift.role, date: shift.shift_date, start_time: shift.start_time, end_time: shift.end_time,
            message: b.covering_name + ' is covering ' + shift.staff_name + "'s " + shift.role + ' shift ' + whenText + ' (' + shift.start_time + '-' + shift.end_time + ').'
          })).run();
        return ok({ covered: true }, cors);
      }

      // ── FLOOR TECH PUNCH LIST (cleaning + maintenance) ──────────────
      if (url.pathname === '/punch-list/list' && request.method === 'GET') {
        if (!env.DB) return bad('No DB', cors);
        const category = url.searchParams.get('category'); // 'cleaning' | 'maintenance' | omit for both
        const status = url.searchParams.get('status') || 'open';
        let q = "SELECT * FROM punch_list_items WHERE status=?";
        const binds = [status];
        if (category) { q += ' AND category=?'; binds.push(category); }
        q += " ORDER BY CASE urgency WHEN 'urgent' THEN 0 ELSE 1 END, reported_at DESC LIMIT 200";
        const rows = await env.DB.prepare(q).bind(...binds).all();
        return ok({ items: rows.results || [] }, cors);
      }

      if (url.pathname === '/punch-list/create' && request.method === 'POST') {
        if (!env.DB) return bad('No DB', cors);
        const b = await request.json();
        if (!b.category || !b.description) return bad('category and description required', cors);
        const now = new Date().toISOString();
        const ins = await env.DB.prepare(
          `INSERT INTO punch_list_items (gym_id,category,description,area,urgency,status,reported_by,reported_at)
           VALUES (?,?,?,?,?,'open',?,?)`
        ).bind(b.gym_id||1, b.category, b.description, b.area||'', b.urgency==='urgent'?'urgent':'normal', b.reported_by||'', now).run();
        return ok({ id: ins.meta?.last_row_id }, cors);
      }

      if (url.pathname === '/punch-list/resolve' && request.method === 'POST') {
        if (!env.DB) return bad('No DB', cors);
        const b = await request.json();
        if (!b.id) return bad('id required', cors);
        await env.DB.prepare("UPDATE punch_list_items SET status='done', resolved_by=?, resolved_at=? WHERE id=?")
          .bind(b.resolved_by||'', new Date().toISOString(), b.id).run();
        return ok({ resolved: true }, cors);
      }

      if (url.pathname === '/punch-list/reopen' && request.method === 'POST') {
        if (!env.DB) return bad('No DB', cors);
        const b = await request.json();
        if (!b.id) return bad('id required', cors);
        await env.DB.prepare("UPDATE punch_list_items SET status='open', resolved_by=NULL, resolved_at=NULL WHERE id=?").bind(b.id).run();
        return ok({ reopened: true }, cors);
      }

      if (url.pathname === '/punch-list/update' && request.method === 'POST') {
        if (!env.DB) return bad('No DB', cors);
        const b = await request.json();
        if (!b.id) return bad('id required', cors);
        const fields = [], binds = [];
        if (b.urgency != null) { fields.push('urgency=?'); binds.push(b.urgency==='urgent'?'urgent':'normal'); }
        if (b.notes != null) { fields.push('notes=?'); binds.push(b.notes); }
        if (!fields.length) return bad('nothing to update', cors);
        binds.push(b.id);
        await env.DB.prepare(`UPDATE punch_list_items SET ${fields.join(', ')} WHERE id=?`).bind(...binds).run();
        return ok({ updated: true }, cors);
      }


      // ── PASSWORD RESET / FIRST-TIME SETUP ────────────────────────
      if (url.pathname === '/auth/reset-request' && request.method === 'POST') {
        if (!env.DB) return bad('No DB', cors);
        const { email } = await request.json();
        if (!email) return bad('email required', cors);
        const em = email.toLowerCase().trim();
        let row = await env.DB.prepare('SELECT * FROM client_auth WHERE email=?').bind(em).first();
        if (!row) {
          const client = await env.DB.prepare('SELECT id FROM clients WHERE lower(email)=?').bind(em).first();
          if (client) {
            await env.DB.prepare('INSERT OR REPLACE INTO client_auth (client_id,email,password_hash,must_change_password,active) VALUES (?,?,?,1,1)')
              .bind(client.id, em, 'unset').run();
            row = await env.DB.prepare('SELECT * FROM client_auth WHERE email=?').bind(em).first();
          }
        }
        if (row) {
          const code = String(Math.floor(100000 + Math.random() * 900000));
          const expires = new Date(Date.now() + 15 * 60 * 1000).toISOString();
          await env.DB.prepare('UPDATE client_auth SET reset_code_hash=?, reset_expires=?, active=1 WHERE id=?')
            .bind(await sha256(code), expires, row.id).run();
          if (!env.RESEND_KEY) {
            return ok({ sent: false, mail_configured: false, reason: 'RESEND_KEY is not set on this Worker — no email provider configured, so no email was sent.' }, cors);
          }
          try {
            const mailResp = await fetch('https://api.resend.com/emails', {
              method: 'POST',
              headers: { 'Authorization': 'Bearer ' + env.RESEND_KEY, 'Content-Type': 'application/json' },
              body: JSON.stringify({
                from: env.MAIL_FROM || 'onboarding@resend.dev',
                to: [em],
                subject: 'Retro Fitness Member App: Your verification code',
                html: '<div style="font-family:Arial,sans-serif;max-width:420px;margin:0 auto"><h2 style="color:#E0192B">RETRO FITNESS</h2><p>Use this code to set your Member App password. It expires in 15 minutes.</p><div style="font-size:32px;font-weight:bold;letter-spacing:6px;background:#F5F6F8;padding:16px;text-align:center;border-radius:10px">' + code + '</div><p style="color:#888;font-size:12px">If you did not request this, you can ignore this email.</p></div>'
              })
            });
            const mailData = await mailResp.json().catch(() => ({}));
            if (!mailResp.ok) {
              return ok({ sent: false, mail_configured: true, reason: 'Resend rejected the send: ' + (mailData.message || mailResp.status) }, cors);
            }
          } catch (e) {
            return ok({ sent: false, mail_configured: true, reason: 'Network error reaching Resend: ' + e.message }, cors);
          }
        }
        return ok({ sent: true }, cors);
      }

      if (url.pathname === '/auth/reset-confirm' && request.method === 'POST') {
        if (!env.DB) return bad('No DB', cors);
        const { email, code, new_password } = await request.json();
        if (!email || !code || !new_password) return bad('email, code, new_password required', cors);
        if (new_password.length < 6) return ok({ ok: false, error: 'Password must be at least 6 characters.' }, cors);
        const em = email.toLowerCase().trim();
        const row = await env.DB.prepare('SELECT * FROM client_auth WHERE email=?').bind(em).first();
        if (!row || !row.reset_code_hash) return ok({ ok: false, error: 'Invalid or expired code.' }, cors);
        if (!row.reset_expires || new Date(row.reset_expires) < new Date()) return ok({ ok: false, error: 'Code expired. Request a new one.' }, cors);
        if (await sha256(String(code).trim()) !== row.reset_code_hash) return ok({ ok: false, error: 'Invalid or expired code.' }, cors);
        const hash = await sha256(new_password);
        await env.DB.prepare('UPDATE client_auth SET password_hash=?, must_change_password=0, active=1, reset_code_hash=NULL, reset_expires=NULL WHERE id=?')
          .bind(hash, row.id).run();
        return ok({ ok: true, reset: true }, cors);
      }

      // ── CHALLENGE GENERATION ──────────────────────────────────────
      if (url.pathname === '/challenge/generate' && request.method === 'POST') {
        if (!env.DB || !env.ANTHROPIC_KEY) return bad('Missing bindings', cors);
        const now = new Date();
        const month = `${now.getFullYear()}-${String(now.getMonth()+1).padStart(2,'0')}`;
        const monthName = now.toLocaleString('en-US',{month:'long',year:'numeric'});
        const prompt = `Generate a fun, motivating monthly fitness challenge for personal training clients at a gym. Month: ${monthName}. The challenge should work for clients at varying fitness levels, mix gym and lifestyle habits, and be easy to track. Return ONLY valid JSON (no markdown) with this shape: {"title":"short challenge name","tagline":"one punchy sentence","description":"2-3 sentences explaining the challenge and why it matters","rules":"plain text rules, 3-5 bullet points as a single string separated by | characters","points_system":"how points are earned, plain text","badge_label":"short achievement badge name e.g. June Warrior"}`;
        const aiResp = await fetch('https://api.anthropic.com/v1/messages', {
          method: 'POST',
          headers: { 'Content-Type':'application/json','x-api-key':env.ANTHROPIC_KEY,'anthropic-version':'2023-06-01' },
          body: JSON.stringify({ model:'claude-sonnet-4-5', max_tokens:800, messages:[{role:'user',content:prompt}] })
        });
        const aiData = await aiResp.json();
        const text = (aiData.content||[]).map(b=>b.text||'').join('').trim();
        let ch; try { ch = JSON.parse(text.replace(/```json|```/g,'').trim()); } catch(e) { return bad('AI parse error: '+text.slice(0,200), cors); }
        await env.DB.prepare('UPDATE challenges SET active=0 WHERE month!=?').bind(month).run();
        const existing = await env.DB.prepare('SELECT id FROM challenges WHERE month=?').bind(month).first();
        let challengeId;
        if (existing) {
          await env.DB.prepare('UPDATE challenges SET title=?,tagline=?,description=?,rules=?,points_system=?,badge_label=?,active=1 WHERE id=?')
            .bind(ch.title,ch.tagline,ch.description,ch.rules,ch.points_system,ch.badge_label,existing.id).run();
          challengeId = existing.id;
        } else {
          const ins = await env.DB.prepare('INSERT INTO challenges (month,title,tagline,description,rules,points_system,badge_label,active) VALUES (?,?,?,?,?,?,?,1)')
            .bind(month,ch.title,ch.tagline,ch.description,ch.rules,ch.points_system,ch.badge_label).run();
          challengeId = ins.meta?.last_row_id;
        }
        return ok({ challenge: ch, id: challengeId, month }, cors);
      }

      if (url.pathname === '/challenge/current' && request.method === 'GET') {
        if (!env.DB) return bad('No DB', cors);
        const clientId = url.searchParams.get('client_id');
        const ch = await env.DB.prepare('SELECT * FROM challenges WHERE active=1 ORDER BY generated_at DESC LIMIT 1').first();
        if (!ch) return ok({ challenge: null }, cors);
        const entries = await env.DB.prepare(
          'SELECT ce.client_id, SUM(ce.points) as total, c.first_name, c.last_name FROM challenge_entries ce JOIN clients c ON c.id=ce.client_id WHERE ce.challenge_id=? GROUP BY ce.client_id ORDER BY total DESC LIMIT 20'
        ).bind(ch.id).all();
        const teamRows = await env.DB.prepare(
          `SELECT g.id, g.name, COALESCE(SUM(ce.points),0) total, COUNT(DISTINCT gm.client_id) member_count
           FROM member_groups g
           LEFT JOIN group_members gm ON gm.group_id = g.id
           LEFT JOIN challenge_entries ce ON ce.client_id = gm.client_id AND ce.challenge_id = ?
           WHERE g.type='team' GROUP BY g.id ORDER BY total DESC LIMIT 20`
        ).bind(ch.id).all();
        let myTeam = null;
        if (clientId) {
          myTeam = await env.DB.prepare(
            `SELECT g.id, g.name FROM member_groups g JOIN group_members gm ON gm.group_id=g.id WHERE gm.client_id=? AND g.type='team' LIMIT 1`
          ).bind(clientId).first();
        }
        return ok({ challenge: ch, leaderboard: entries.results||[], team_leaderboard: teamRows.results||[], my_team: myTeam||null }, cors);
      }

      // ── TEAMS (small opt-in groups for team challenges) ─────────────
      if (url.pathname === '/groups/list' && request.method === 'GET') {
        if (!env.DB) return bad('No DB', cors);
        const type = url.searchParams.get('type') || 'team';
        const rows = await env.DB.prepare(
          `SELECT g.id, g.name, COUNT(gm.client_id) member_count FROM member_groups g
           LEFT JOIN group_members gm ON gm.group_id=g.id WHERE g.type=? GROUP BY g.id ORDER BY g.name ASC`
        ).bind(type).all();
        return ok({ groups: rows.results || [] }, cors);
      }

      if (url.pathname === '/groups/create' && request.method === 'POST') {
        if (!env.DB) return bad('No DB', cors);
        const b = await request.json();
        if (!b.name) return bad('name required', cors);
        const ins = await env.DB.prepare('INSERT INTO member_groups (name,type,created_at) VALUES (?,?,?)')
          .bind(b.name, b.type||'team', new Date().toISOString()).run();
        if (b.client_id) {
          await env.DB.prepare('INSERT OR IGNORE INTO group_members (group_id,client_id,joined_at) VALUES (?,?,?)')
            .bind(ins.meta?.last_row_id, b.client_id, new Date().toISOString()).run();
        }
        return ok({ id: ins.meta?.last_row_id }, cors);
      }

      if (url.pathname === '/groups/join' && request.method === 'POST') {
        if (!env.DB) return bad('No DB', cors);
        const b = await request.json();
        if (!b.group_id || !b.client_id) return bad('group_id, client_id required', cors);
        const grp = await env.DB.prepare("SELECT type FROM member_groups WHERE id=?").bind(b.group_id).first();
        if (grp && grp.type === 'team') {
          await env.DB.prepare(`DELETE FROM group_members WHERE client_id=? AND group_id IN (SELECT id FROM member_groups WHERE type='team')`).bind(b.client_id).run();
        }
        await env.DB.prepare('INSERT OR IGNORE INTO group_members (group_id,client_id,joined_at) VALUES (?,?,?)')
          .bind(b.group_id, b.client_id, new Date().toISOString()).run();
        return ok({ joined: true }, cors);
      }

      if (url.pathname === '/groups/leave' && request.method === 'POST') {
        if (!env.DB) return bad('No DB', cors);
        const b = await request.json();
        if (!b.group_id || !b.client_id) return bad('group_id, client_id required', cors);
        await env.DB.prepare('DELETE FROM group_members WHERE group_id=? AND client_id=?').bind(b.group_id, b.client_id).run();
        return ok({ left: true }, cors);
      }

      // ── BUDDY MATCHING (opt-in, matched by goal) ────────────────────
      if (url.pathname === '/buddy/optin' && request.method === 'POST') {
        if (!env.DB) return bad('No DB', cors);
        const b = await request.json();
        if (!b.client_id || !b.goal_type) return bad('client_id, goal_type required', cors);
        await env.DB.prepare('INSERT INTO buddy_optins (client_id,goal_type,preferred_time,active,created_at) VALUES (?,?,?,1,?) ON CONFLICT(client_id) DO UPDATE SET goal_type=excluded.goal_type, preferred_time=excluded.preferred_time, active=1')
          .bind(b.client_id, b.goal_type, b.preferred_time||'', new Date().toISOString()).run();
        return ok({ opted_in: true }, cors);
      }

      if (url.pathname === '/buddy/optout' && request.method === 'POST') {
        if (!env.DB) return bad('No DB', cors);
        const b = await request.json();
        if (!b.client_id) return bad('client_id required', cors);
        await env.DB.prepare('UPDATE buddy_optins SET active=0 WHERE client_id=?').bind(b.client_id).run();
        return ok({ opted_out: true }, cors);
      }

      if (url.pathname === '/buddy/matches' && request.method === 'GET') {
        if (!env.DB) return bad('No DB', cors);
        const clientId = url.searchParams.get('client_id');
        if (!clientId) return bad('client_id required', cors);
        const me = await env.DB.prepare('SELECT * FROM buddy_optins WHERE client_id=? AND active=1').bind(clientId).first();
        if (!me) return ok({ opted_in: false, matches: [] }, cors);
        const rows = await env.DB.prepare(
          `SELECT b.client_id, b.goal_type, b.preferred_time, c.first_name, c.last_name FROM buddy_optins b
           JOIN clients c ON c.id = b.client_id
           WHERE b.active=1 AND b.client_id != ? AND b.goal_type = ? LIMIT 10`
        ).bind(clientId, me.goal_type).all();
        return ok({ opted_in: true, my_goal: me.goal_type, matches: rows.results || [] }, cors);
      }

      if (url.pathname === '/challenge/log' && request.method === 'POST') {
        if (!env.DB) return bad('No DB', cors);
        const body = await request.json();
        if (!body.client_id || !body.challenge_id) return bad('client_id and challenge_id required', cors);
        await env.DB.prepare('INSERT INTO challenge_entries (client_id,challenge_id,entry_date,activity,points,notes) VALUES (?,?,?,?,?,?)')
          .bind(body.client_id, body.challenge_id, body.entry_date||new Date().toISOString().slice(0,10), body.activity||'', body.points||1, body.notes||'').run();
        const total = await env.DB.prepare('SELECT SUM(points) as t FROM challenge_entries WHERE client_id=? AND challenge_id=?').bind(body.client_id, body.challenge_id).first();
        return ok({ logged: true, total: total?.t||0 }, cors);
      }

      // ── COACH'S EDGE / WORD OF THE DAY / INSIDE RETRO (daily content) ──
      if (url.pathname === '/daily/content' && request.method === 'GET') {
        if (!env.DB) return bad('No DB', cors);
        const today = new Date().toISOString().slice(0,10);
        let row = await env.DB.prepare('SELECT * FROM daily_content WHERE content_date=?').bind(today).first();
        if (!row) {
          if (!env.ANTHROPIC_KEY) return bad('ANTHROPIC_KEY not set, cannot generate daily content', cors);
          row = await generateDailyContent(env, today);
        }
        return ok({ content: row }, cors);
      }

      if (url.pathname === '/daily/generate' && request.method === 'POST') {
        if (!env.DB || !env.ANTHROPIC_KEY) return bad('Missing bindings', cors);
        const authHeader = request.headers.get('X-Admin-Key') || '';
        if (authHeader !== (env.ADMIN_KEY || 'retro-admin-2024')) return bad('Unauthorized', cors);
        const today = new Date().toISOString().slice(0,10);
        const row = await generateDailyContent(env, today, true);
        return ok({ content: row }, cors);
      }

      // ── THE CIRCLE (member recognition feed) ──────────────────────
      if (url.pathname === '/wins/feed' && request.method === 'GET') {
        if (!env.DB) return bad('No DB', cors);
        const limit = Math.min(parseInt(url.searchParams.get('limit')||'15',10), 50);
        const viewerId = url.searchParams.get('client_id');
        const res = await env.DB.prepare(
          'SELECT w.*, c.first_name, c.last_name FROM client_wins w LEFT JOIN clients c ON c.id=w.client_id WHERE w.visible=1 ORDER BY w.created_at DESC LIMIT ?'
        ).bind(limit).all();
        // attach each member's current tier so The Circle can show a badge next to their name
        const wins = res.results || [];
        for (const w of wins) {
          if (w.client_id) w.tier = await getMemberTier(env, w.client_id);
          const reactionRows = await env.DB.prepare('SELECT emoji, COUNT(*) n FROM win_reactions WHERE win_id=? GROUP BY emoji').bind(w.id).all();
          w.reactions = {};
          (reactionRows.results||[]).forEach(r => { w.reactions[r.emoji] = r.n; });
          if (viewerId) {
            const mine = await env.DB.prepare('SELECT emoji FROM win_reactions WHERE win_id=? AND client_id=?').bind(w.id, viewerId).all();
            w.my_reactions = (mine.results||[]).map(r => r.emoji);
          } else {
            w.my_reactions = [];
          }
        }
        const activeCount = await env.DB.prepare(
          "SELECT COUNT(DISTINCT client_id) n FROM (SELECT client_id FROM self_workouts WHERE workout_date>=date('now','-30 day') UNION SELECT client_id FROM checkins WHERE checkin_date>=date('now','-30 day') UNION SELECT client_id FROM training_sessions WHERE session_date>=date('now','-30 day'))"
        ).first();
        return ok({ wins, active_members_30d: activeCount?.n || 0 }, cors);
      }

      if (url.pathname === '/wins/react' && request.method === 'POST') {
        if (!env.DB) return bad('No DB', cors);
        const b = await request.json();
        if (!b.win_id || !b.client_id || !b.emoji) return bad('win_id, client_id, emoji required', cors);
        const existing = await env.DB.prepare('SELECT id FROM win_reactions WHERE win_id=? AND client_id=? AND emoji=?').bind(b.win_id, b.client_id, b.emoji).first();
        if (existing) {
          await env.DB.prepare('DELETE FROM win_reactions WHERE id=?').bind(existing.id).run();
          return ok({ reacted: false }, cors);
        } else {
          await env.DB.prepare('INSERT INTO win_reactions (win_id,client_id,emoji,created_at) VALUES (?,?,?,?)')
            .bind(b.win_id, b.client_id, b.emoji, new Date().toISOString()).run();
          return ok({ reacted: true }, cors);
        }
      }

      // ── WHO'S HERE NOW (opt-in live presence) ─────────────────────
      if (url.pathname === '/presence/checkin' && request.method === 'POST') {
        if (!env.DB) return bad('No DB', cors);
        const b = await request.json();
        if (!b.client_id) return bad('client_id required', cors);
        await env.DB.prepare('INSERT INTO presence_checkins (client_id,gym_id,checked_in_at) VALUES (?,?,?)')
          .bind(b.client_id, b.gym_id||1, new Date().toISOString()).run();
        return ok({ checked_in: true }, cors);
      }

      if (url.pathname === '/presence/now' && request.method === 'GET') {
        if (!env.DB) return bad('No DB', cors);
        const rows = await env.DB.prepare(
          `SELECT p.client_id, MAX(p.checked_in_at) last_checkin, c.first_name, c.last_name
           FROM presence_checkins p JOIN clients c ON c.id = p.client_id
           WHERE p.checked_in_at >= datetime('now','-3 hours')
           GROUP BY p.client_id ORDER BY last_checkin DESC LIMIT 30`
        ).all();
        return ok({ here_now: rows.results || [] }, cors);
      }

      // ── STAFF AVAILABILITY (recurring weekly, requires manager approval) ──
      if (url.pathname === '/availability/set' && request.method === 'POST') {
        if (!env.DB) return bad('No DB', cors);
        const b = await request.json();
        if (!b.staff_id || !Array.isArray(b.slots)) return bad('staff_id and slots[] required', cors);
        await env.DB.prepare('DELETE FROM staff_availability WHERE staff_id=?').bind(b.staff_id).run();
        const now = new Date().toISOString();
        for (const s of b.slots) {
          await env.DB.prepare('INSERT INTO staff_availability (staff_id,day_of_week,start_time,end_time,note,status,updated_at) VALUES (?,?,?,?,?,?,?)')
            .bind(b.staff_id, s.day_of_week, s.start_time || null, s.end_time || null, s.note || null, 'pending', now).run();
        }
        if (b.slots.length) {
          const staffRow = await env.DB.prepare('SELECT name FROM staff_roster WHERE id=?').bind(b.staff_id).first();
          await env.DB.prepare('INSERT INTO notifications (recipient,type,payload_json,created_at) VALUES (?,?,?,?)')
            .bind('management', 'availability_submitted', JSON.stringify({
              staff_id: b.staff_id, name: staffRow ? staffRow.name : 'Someone',
              message: (staffRow ? staffRow.name : 'Someone') + ' submitted new availability for review'
            }), now).run();
        }
        return ok({ saved: true }, cors);
      }

      if (url.pathname === '/availability/get' && request.method === 'GET') {
        if (!env.DB) return bad('No DB', cors);
        const staffId = url.searchParams.get('staff_id');
        if (!staffId) return bad('staff_id required', cors);
        const rows = await env.DB.prepare('SELECT * FROM staff_availability WHERE staff_id=? ORDER BY day_of_week ASC').bind(staffId).all();
        return ok({ availability: rows.results || [] }, cors);
      }

      if (url.pathname === '/availability/pending' && request.method === 'GET') {
        if (!env.DB) return bad('No DB', cors);
        const rows = await env.DB.prepare(
          `SELECT a.*, s.name staff_name FROM staff_availability a
           JOIN staff_roster s ON s.id = a.staff_id
           WHERE a.status='pending' ORDER BY a.staff_id, a.day_of_week ASC LIMIT 200`
        ).all();
        return ok({ availability: rows.results || [] }, cors);
      }

      if (url.pathname === '/availability/review' && request.method === 'POST') {
        if (!env.DB) return bad('No DB', cors);
        const b = await request.json();
        if (!b.staff_id || !b.status) return bad('staff_id and status required', cors);
        const now = new Date().toISOString();
        await env.DB.prepare("UPDATE staff_availability SET status=?, reviewed_by=?, reviewed_at=? WHERE staff_id=? AND status='pending'")
          .bind(b.status, b.reviewed_by || null, now, b.staff_id).run();
        return ok({ reviewed: true }, cors);
      }

      // ── TIME OFF REQUESTS (tracked, with approve/deny status) ─────
      if (url.pathname === '/timeoff/request' && request.method === 'POST') {
        if (!env.DB) return bad('No DB', cors);
        const b = await request.json();
        if (!b.staff_id || !b.start_date || !b.end_date) return bad('staff_id, start_date, end_date required', cors);
        const now = new Date().toISOString();
        const ins = await env.DB.prepare(
          'INSERT INTO time_off_requests (staff_id,start_date,end_date,reason,status,requested_at) VALUES (?,?,?,?,?,?)'
        ).bind(b.staff_id, b.start_date, b.end_date, b.reason || null, 'pending', now).run();
        const emp = await env.DB.prepare('SELECT name FROM staff_roster WHERE id=?').bind(b.staff_id).first();
        const empName = emp ? emp.name : 'Someone';
        await env.DB.prepare('INSERT INTO notifications (recipient,type,payload_json,created_at) VALUES (?,?,?,?)')
          .bind('management', 'time_off_request', JSON.stringify({
            staff_id: b.staff_id, name: empName, start: b.start_date, end: b.end_date, reason: b.reason || '',
            message: empName + ' requested time off ' + b.start_date + ' to ' + b.end_date + (b.reason ? (': ' + b.reason) : '')
          }), now).run();
        return ok({ requested: true, id: ins.meta ? ins.meta.last_row_id : null }, cors);
      }

      if (url.pathname === '/timeoff/mine' && request.method === 'GET') {
        if (!env.DB) return bad('No DB', cors);
        const staffId = url.searchParams.get('staff_id');
        if (!staffId) return bad('staff_id required', cors);
        const rows = await env.DB.prepare('SELECT * FROM time_off_requests WHERE staff_id=? ORDER BY start_date DESC LIMIT 50').bind(staffId).all();
        return ok({ requests: rows.results || [] }, cors);
      }

      if (url.pathname === '/timeoff/pending' && request.method === 'GET') {
        if (!env.DB) return bad('No DB', cors);
        const rows = await env.DB.prepare(
          `SELECT t.*, s.name staff_name FROM time_off_requests t
           JOIN staff_roster s ON s.id = t.staff_id
           WHERE t.status='pending' ORDER BY t.requested_at ASC LIMIT 100`
        ).all();
        return ok({ requests: rows.results || [] }, cors);
      }

      if (url.pathname === '/timeoff/review' && request.method === 'POST') {
        if (!env.DB) return bad('No DB', cors);
        const b = await request.json();
        if (!b.id || !b.status) return bad('id and status required', cors);
        const now = new Date().toISOString();
        await env.DB.prepare('UPDATE time_off_requests SET status=?, reviewed_by=?, reviewed_at=? WHERE id=?')
          .bind(b.status, b.reviewed_by || null, now, b.id).run();
        const reqRow = await env.DB.prepare('SELECT staff_id, start_date, end_date FROM time_off_requests WHERE id=?').bind(b.id).first();
        if (reqRow) {
          await env.DB.prepare('INSERT INTO notifications (recipient,type,payload_json,created_at) VALUES (?,?,?,?)')
            .bind('staff:' + reqRow.staff_id, 'time_off_reviewed', JSON.stringify({
              status: b.status, start: reqRow.start_date, end: reqRow.end_date,
              message: 'Your time off request for ' + reqRow.start_date + ' to ' + reqRow.end_date + ' was ' + b.status + '.'
            }), now).run();
        }
        return ok({ reviewed: true }, cors);
      }

      // ── MASTER GYM EVENTS (holidays & special events, GM/Director write) ──
      if (url.pathname === '/events/add' && request.method === 'POST') {
        if (!env.DB) return bad('No DB', cors);
        const b = await request.json();
        if (!b.title || !b.event_date) return bad('title and event_date required', cors);
        await env.DB.prepare('INSERT INTO gym_calendar_events (gym_id,title,event_date,end_date,type,notes,created_by,created_at) VALUES (?,?,?,?,?,?,?,?)')
          .bind(b.gym_id || 1, b.title, b.event_date, b.end_date || null, b.type || 'event', b.notes || null, b.created_by || null, new Date().toISOString()).run();
        return ok({ added: true }, cors);
      }

      if (url.pathname === '/events/upcoming' && request.method === 'GET') {
        if (!env.DB) return bad('No DB', cors);
        const gymId = url.searchParams.get('gym_id') || 1;
        const days = parseInt(url.searchParams.get('days') || '60', 10);
        const rows = await env.DB.prepare(
          `SELECT * FROM gym_calendar_events WHERE gym_id=? AND event_date >= date('now') AND event_date <= date('now','+${days} day')
           ORDER BY event_date ASC LIMIT 50`
        ).bind(gymId).all();
        return ok({ events: rows.results || [] }, cors);
      }

      // ── PERSONAL CALENDAR SYNC (ICS feed: shifts + appointments + gym events) ──
      if (url.pathname === '/calendar/ics' && request.method === 'GET') {
        if (!env.DB) return bad('No DB', cors);
        const staffId = url.searchParams.get('staff_id');
        if (!staffId) return bad('staff_id required', cors);
        const staffRow = await env.DB.prepare('SELECT name FROM staff_roster WHERE id=?').bind(staffId).first();
        const coachName = staffRow ? staffRow.name : '';
        const shifts = await env.DB.prepare(
          "SELECT * FROM staff_shifts WHERE staff_id=? AND shift_date >= date('now','-7 day') AND status!='cancelled' ORDER BY shift_date ASC LIMIT 100"
        ).bind(staffId).all();
        const appts = coachName ? await env.DB.prepare(
          `SELECT s.id, s.scheduled_date, s.program_name, s.focus_notes, c.first_name, c.last_name
           FROM scheduled_sessions s JOIN clients c ON s.client_id = c.id
           WHERE COALESCE(NULLIF(s.assigned_coach,''), c.coach) = ? AND s.status = 'scheduled'
           AND s.scheduled_date >= date('now','-7 day') ORDER BY s.scheduled_date ASC LIMIT 100`
        ).bind(coachName).all() : { results: [] };
        const events = await env.DB.prepare(
          "SELECT * FROM gym_calendar_events WHERE event_date >= date('now','-7 day') ORDER BY event_date ASC LIMIT 100"
        ).all();
        const icsDate = (d, t) => (d || '').replace(/-/g, '') + 'T' + ((t || '09:00').replace(':', '') + '00');
        const esc = s => String(s || '').replace(/[\\;,]/g, c => '\\' + c).replace(/\n/g, '\\n');
        let lines = ['BEGIN:VCALENDAR', 'VERSION:2.0', 'PRODID:-//Retro Strong//Staff Calendar//EN', 'CALSCALE:GREGORIAN'];
        for (const s of (shifts.results || [])) {
          lines.push('BEGIN:VEVENT');
          lines.push('UID:shift-' + s.id + '@retrostrong');
          lines.push('DTSTART:' + icsDate(s.shift_date, s.start_time));
          lines.push('DTEND:' + icsDate(s.shift_date, s.end_time || s.start_time));
          lines.push('SUMMARY:' + esc('Shift — ' + (s.role || 'Work')));
          lines.push('END:VEVENT');
        }
        for (const a of (appts.results || [])) {
          lines.push('BEGIN:VEVENT');
          lines.push('UID:appt-' + a.id + '@retrostrong');
          lines.push('DTSTART:' + icsDate(a.scheduled_date, '09:00'));
          lines.push('DTEND:' + icsDate(a.scheduled_date, '10:00'));
          lines.push('SUMMARY:' + esc('Session — ' + a.first_name + ' ' + a.last_name + (a.program_name ? ' (' + a.program_name + ')' : '')));
          if (a.focus_notes) lines.push('DESCRIPTION:' + esc(a.focus_notes));
          lines.push('END:VEVENT');
        }
        for (const e of (events.results || [])) {
          lines.push('BEGIN:VEVENT');
          lines.push('UID:event-' + e.id + '@retrostrong');
          lines.push('DTSTART;VALUE=DATE:' + (e.event_date || '').replace(/-/g, ''));
          lines.push('DTEND;VALUE=DATE:' + (e.end_date || e.event_date || '').replace(/-/g, ''));
          lines.push('SUMMARY:' + esc((e.type === 'holiday' ? 'Holiday: ' : '') + e.title));
          if (e.notes) lines.push('DESCRIPTION:' + esc(e.notes));
          lines.push('END:VEVENT');
        }
        lines.push('END:VCALENDAR');
        return new Response(lines.join('\r\n'), { status: 200, headers: { ...cors, 'Content-Type': 'text/calendar; charset=utf-8' } });
      }

      // ── REFERRAL LEADERBOARD (built on the existing guest_shares log) ──
      if (url.pathname === '/referral/leaderboard' && request.method === 'GET') {
        if (!env.DB) return bad('No DB', cors);
        const rows = await env.DB.prepare(
          `SELECT g.client_id, COUNT(*) n, c.first_name, c.last_name
           FROM guest_shares g JOIN clients c ON c.id = g.client_id
           WHERE g.client_id IS NOT NULL AND substr(g.shared_at,1,7) = strftime('%Y-%m','now')
           GROUP BY g.client_id ORDER BY n DESC LIMIT 20`
        ).all();
        return ok({ leaderboard: rows.results || [] }, cors);
      }

      if (url.pathname === '/wins/post' && request.method === 'POST') {
        if (!env.DB) return bad('No DB', cors);
        const authHeader = request.headers.get('X-Admin-Key') || '';
        if (authHeader !== (env.ADMIN_KEY || 'retro-admin-2024')) return bad('Unauthorized', cors);
        const body = await request.json();
        if (!body.headline) return bad('headline required', cors);
        const ins = await env.DB.prepare(
          'INSERT INTO client_wins (client_id,headline,detail,win_type,source,visible,created_at) VALUES (?,?,?,?,?,1,?)'
        ).bind(body.client_id||null, body.headline, body.detail||'', body.win_type||'manual', 'coach', new Date().toISOString()).run();
        return ok({ id: ins.meta?.last_row_id }, cors);
      }

      if (url.pathname === '/wins/hide' && request.method === 'POST') {
        if (!env.DB) return bad('No DB', cors);
        const authHeader = request.headers.get('X-Admin-Key') || '';
        if (authHeader !== (env.ADMIN_KEY || 'retro-admin-2024')) return bad('Unauthorized', cors);
        const { id } = await request.json();
        if (!id) return bad('id required', cors);
        await env.DB.prepare('UPDATE client_wins SET visible=0 WHERE id=?').bind(id).run();
        return ok({ hidden: true }, cors);
      }

      if (url.pathname === '/wins/detect' && request.method === 'POST') {
        if (!env.DB) return bad('No DB', cors);
        const authHeader = request.headers.get('X-Admin-Key') || '';
        if (authHeader !== (env.ADMIN_KEY || 'retro-admin-2024')) return bad('Unauthorized', cors);
        return ok(await detectAutoWins(env), cors);
      }

      // ── MEMBER TIER (Bronze / Silver / Gold, earned not paid) ─────
      if (url.pathname === '/tier/me' && request.method === 'GET') {
        if (!env.DB) return bad('No DB', cors);
        const client_id = url.searchParams.get('client_id');
        if (!client_id) return bad('client_id required', cors);
        const tier = await getMemberTier(env, client_id);
        return ok({ tier }, cors);
      }

      // ── HAPPENING AT RETRO (gym events / announcements) ────────────
      if (url.pathname === '/events/list' && request.method === 'GET') {
        if (!env.DB) return bad('No DB', cors);
        const today = new Date().toISOString().slice(0,10);
        const res = await env.DB.prepare(
          'SELECT * FROM gym_events WHERE visible=1 AND (event_date IS NULL OR event_date>=?) ORDER BY event_date ASC LIMIT 10'
        ).bind(today).all();
        return ok({ events: res.results||[] }, cors);
      }

      if (url.pathname === '/events/post' && request.method === 'POST') {
        if (!env.DB) return bad('No DB', cors);
        const authHeader = request.headers.get('X-Admin-Key') || '';
        if (authHeader !== (env.ADMIN_KEY || 'retro-admin-2024')) return bad('Unauthorized', cors);
        const body = await request.json();
        if (!body.title) return bad('title required', cors);
        const ins = await env.DB.prepare(
          'INSERT INTO gym_events (title,blurb,event_date,image_url,visible,created_at) VALUES (?,?,?,?,1,?)'
        ).bind(body.title, body.blurb||'', body.event_date||null, body.image_url||'', new Date().toISOString()).run();
        return ok({ id: ins.meta?.last_row_id }, cors);
      }

      if (url.pathname === '/events/hide' && request.method === 'POST') {
        if (!env.DB) return bad('No DB', cors);
        const authHeader = request.headers.get('X-Admin-Key') || '';
        if (authHeader !== (env.ADMIN_KEY || 'retro-admin-2024')) return bad('Unauthorized', cors);
        const { id } = await request.json();
        if (!id) return bad('id required', cors);
        await env.DB.prepare('UPDATE gym_events SET visible=0 WHERE id=?').bind(id).run();
        return ok({ hidden: true }, cors);
      }

      // ── COMMUNITY & INDUSTRY NEWS FEED ─────────────────────────────
      // Manual posts (industry news, personal life events, recognition,
      // special events) plus auto-detected birthdays/work-anniversaries
      // computed live from clients/staff_roster — nothing to maintain
      // once those dates are on file.
      if (url.pathname === '/feed/list' && request.method === 'GET') {
        if (!env.DB) return bad('No DB', cors);
        const limit = Math.min(parseInt(url.searchParams.get('limit')||'30',10), 100);
        const postsRes = await env.DB.prepare(
          'SELECT * FROM feed_posts ORDER BY pinned DESC, created_at DESC LIMIT ?'
        ).bind(limit).all();
        return ok({ posts: postsRes.results || [] }, cors);
      }

      if (url.pathname === '/feed/create' && request.method === 'POST') {
        if (!env.DB) return bad('No DB', cors);
        const authHeader = request.headers.get('X-Admin-Key') || '';
        if (authHeader !== (env.ADMIN_KEY || 'retro-admin-2024')) return bad('Unauthorized', cors);
        const b = await request.json();
        if (!b.category || !b.title) return bad('category and title required', cors);
        const ins = await env.DB.prepare(
          `INSERT INTO feed_posts (category,title,body,image_url,featured_client_id,featured_staff_id,event_date,pinned,created_by,created_at)
           VALUES (?,?,?,?,?,?,?,?,?,?)`
        ).bind(b.category, b.title, b.body||'', b.image_url||null, b.featured_client_id||null, b.featured_staff_id||null, b.event_date||null, b.pinned?1:0, b.created_by||'', new Date().toISOString()).run();
        return ok({ id: ins.meta?.last_row_id }, cors);
      }

      if (url.pathname === '/feed/delete' && request.method === 'POST') {
        if (!env.DB) return bad('No DB', cors);
        const authHeader = request.headers.get('X-Admin-Key') || '';
        if (authHeader !== (env.ADMIN_KEY || 'retro-admin-2024')) return bad('Unauthorized', cors);
        const { id } = await request.json();
        if (!id) return bad('id required', cors);
        await env.DB.prepare('DELETE FROM feed_posts WHERE id=?').bind(id).run();
        return ok({ deleted: true }, cors);
      }

      if (url.pathname === '/feed/run-auto-scan' && request.method === 'POST') {
        if (!env.DB) return bad('No DB', cors);
        const authHeader = request.headers.get('X-Admin-Key') || '';
        if (authHeader !== (env.ADMIN_KEY || 'retro-admin-2024')) return bad('Unauthorized', cors);
        const result = await populateDailyFeedItems(env, new Date().toISOString().slice(0,10));
        return ok(result, cors);
      }

      // ── CLASS RSVPS (real, synced, date-specific — replaces the old ──
      // localStorage-only "I'm Going" that never left the device) ──────
      if (url.pathname === '/classes/rsvp' && request.method === 'POST') {
        if (!env.DB) return bad('No DB', cors);
        const b = await request.json();
        if (!b.client_id || !b.class_name || !b.class_date) return bad('client_id, class_name, class_date required', cors);
        const existing = await env.DB.prepare('SELECT id FROM class_rsvps WHERE client_id=? AND class_name=? AND class_date=?')
          .bind(b.client_id, b.class_name, b.class_date).first();
        if (existing) {
          await env.DB.prepare('DELETE FROM class_rsvps WHERE id=?').bind(existing.id).run();
          return ok({ going: false }, cors);
        } else {
          await env.DB.prepare('INSERT INTO class_rsvps (client_id,class_name,class_date,class_time,status,created_at) VALUES (?,?,?,?,?,?)')
            .bind(b.client_id, b.class_name, b.class_date, b.class_time||'', 'going', new Date().toISOString()).run();
          return ok({ going: true }, cors);
        }
      }

      if (url.pathname === '/classes/going' && request.method === 'GET') {
        if (!env.DB) return bad('No DB', cors);
        const className = url.searchParams.get('class_name');
        const classDate = url.searchParams.get('class_date');
        const clientId = url.searchParams.get('client_id');
        if (!className || !classDate) return bad('class_name, class_date required', cors);
        const rows = await env.DB.prepare(
          `SELECT r.client_id, c.first_name FROM class_rsvps r JOIN clients c ON c.id=r.client_id
           WHERE r.class_name=? AND r.class_date=?`
        ).bind(className, classDate).all();
        const going = rows.results || [];
        const myGoing = clientId ? going.some(g => String(g.client_id) === String(clientId)) : false;
        return ok({ count: going.length, names: going.slice(0,5).map(g=>g.first_name), my_going: myGoing }, cors);
      }

      // ── GUEST PASS TRACKING (which class actually drives a walk-in) ──
      if (url.pathname === '/guest-pass/click' && request.method === 'POST') {
        if (!env.DB) return bad('No DB', cors);
        const b = await request.json();
        await env.DB.prepare('INSERT INTO guest_pass_log (class_name,class_date,source,clicked_at) VALUES (?,?,?,?)')
          .bind(b.class_name||null, b.class_date||null, b.source||'class_promo', new Date().toISOString()).run();
        if (b.name && (b.phone || b.email)) {
          await env.DB.prepare('INSERT INTO prospect_log (name,email,phone,source,status,campaign_tag,created_at) VALUES (?,?,?,?,?,?,?)')
            .bind(b.name, b.email||'', b.phone||'', 'Class Guest Pass', 'new', b.class_name||'', new Date().toISOString()).run();
        }
        return ok({ logged: true }, cors);
      }

      if (url.pathname === '/guest-pass/stats' && request.method === 'GET') {
        if (!env.DB) return bad('No DB', cors);
        const rows = await env.DB.prepare(
          `SELECT class_name, COUNT(*) n FROM guest_pass_log WHERE class_name IS NOT NULL AND clicked_at >= datetime('now','-30 day') GROUP BY class_name ORDER BY n DESC LIMIT 20`
        ).all();
        return ok({ by_class: rows.results || [] }, cors);
      }

      // ── MEET YOUR COACHES (public bios + self-service editing) ──────
      const COACH_ROLES = ['PT Coach', "Men's Training Lead"];
      if (url.pathname === '/coaches/public-list' && request.method === 'GET') {
        if (!env.DB) return bad('No DB', cors);
        const today = new Date().toISOString().slice(0,10);
        const rows = await env.DB.prepare(
          `SELECT s.id, s.name, s.role, s.hire_date, p.photo_url, p.tagline, p.specialties,
            (SELECT COUNT(*) FROM scheduled_sessions ss LEFT JOIN clients c2 ON c2.id = ss.client_id
             WHERE COALESCE(NULLIF(ss.assigned_coach,''), c2.coach) = s.name AND ss.scheduled_date <= ?) AS sessions_coached
           FROM staff_roster s LEFT JOIN coach_profiles p ON p.staff_id = s.id
           WHERE s.active=1 AND s.role IN (?,?) ORDER BY s.name ASC`
        ).bind(today, COACH_ROLES[0], COACH_ROLES[1]).all();
        return ok({ coaches: rows.results || [] }, cors);
      }

      if (url.pathname === '/coaches/profile' && request.method === 'GET') {
        if (!env.DB) return bad('No DB', cors);
        const staffId = url.searchParams.get('staff_id');
        if (!staffId) return bad('staff_id required', cors);
        const staff = await env.DB.prepare('SELECT id, name, role, hire_date FROM staff_roster WHERE id=?').bind(staffId).first();
        if (!staff) return bad('Coach not found', cors);
        const today = new Date().toISOString().slice(0,10);
        const sessionCount = await env.DB.prepare(
          `SELECT COUNT(*) n FROM scheduled_sessions ss LEFT JOIN clients c2 ON c2.id = ss.client_id
           WHERE COALESCE(NULLIF(ss.assigned_coach,''), c2.coach) = ? AND ss.scheduled_date <= ?`
        ).bind(staff.name, today).first();
        staff.sessions_coached = sessionCount?.n || 0;
        const profile = await env.DB.prepare('SELECT * FROM coach_profiles WHERE staff_id=?').bind(staffId).first();
        return ok({ staff, profile: profile || null }, cors);
      }

      if (url.pathname === '/coaches/profile/update' && request.method === 'POST') {
        if (!env.DB) return bad('No DB', cors);
        const b = await request.json();
        if (!b.staff_id) return bad('staff_id required', cors);
        const values = {
          photo_url: b.photo_url || null, tagline: b.tagline || null, bio: b.bio || null,
          specialties: b.specialties || null, certifications: b.certifications || null,
          public_email: b.public_email || null, public_phone: b.public_phone || null,
          updated_at: new Date().toISOString()
        };
        await env.DB.prepare(
          `INSERT INTO coach_profiles (staff_id,photo_url,tagline,bio,specialties,certifications,public_email,public_phone,updated_at)
           VALUES (?,?,?,?,?,?,?,?,?)
           ON CONFLICT(staff_id) DO UPDATE SET photo_url=excluded.photo_url, tagline=excluded.tagline, bio=excluded.bio,
             specialties=excluded.specialties, certifications=excluded.certifications, public_email=excluded.public_email,
             public_phone=excluded.public_phone, updated_at=excluded.updated_at`
        ).bind(b.staff_id, values.photo_url, values.tagline, values.bio, values.specialties, values.certifications, values.public_email, values.public_phone, values.updated_at).run();
        return ok({ saved: true }, cors);
      }

      if (url.pathname === '/feed/generate-news-draft' && request.method === 'POST') {
        if (!env.ANTHROPIC_KEY) return bad('ANTHROPIC_KEY not set.', cors);
        const authHeader = request.headers.get('X-Admin-Key') || '';
        if (authHeader !== (env.ADMIN_KEY || 'retro-admin-2024')) return bad('Unauthorized', cors);
        const prompt = `Write a short fitness-industry news item for a gym's internal community feed — the kind of thing a gym owner would want their staff and members to know about: a trend in strength training, nutrition science, gym equipment, or the fitness business generally. Return ONLY valid JSON, no markdown: {"title":"short headline, 8-12 words","body":"2-3 sentences, confident and informative, written for people who already train seriously"}. No emojis, no em dashes.`;
        const aiResp = await fetch('https://api.anthropic.com/v1/messages', {
          method: 'POST',
          headers: { 'Content-Type':'application/json','x-api-key':env.ANTHROPIC_KEY,'anthropic-version':'2023-06-01' },
          body: JSON.stringify({ model:'claude-sonnet-4-6', max_tokens:400, messages:[{role:'user',content:prompt}] })
        });
        const aiData = await aiResp.json();
        const text = (aiData.content||[]).filter(b=>b.type==='text').map(b=>b.text||'').join('').trim();
        let parsed;
        try { parsed = JSON.parse(text.replace(/```json|```/g,'').trim()); }
        catch(e) { return bad('Could not generate a draft, try again', cors); }
        return ok({ title: parsed.title||'', body: parsed.body||'' }, cors);
      }

      // ── CLIENT PORTAL DATA ───────────────────────────────────────
      if (url.pathname === '/portal/me' && request.method === 'GET') {
        if (!env.DB) return bad('No DB', cors);
        const client_id = url.searchParams.get('client_id');
        if (!client_id) return bad('client_id required', cors);
        const [client, checkins, mealPlan, scans, sessions, selfWorkouts, tier, mealProfile, dailyLogs] = await Promise.all([
          env.DB.prepare('SELECT id,first_name,last_name,email,phone,status,advisor,coach,goal_primary,training_start_date,package,coach_recommendation,coach_recommendation_date,coach_recommendation_by FROM clients WHERE id=?').bind(client_id).first(),
          env.DB.prepare('SELECT * FROM checkins WHERE client_id=? ORDER BY checkin_date DESC LIMIT 12').bind(client_id).all(),
          env.DB.prepare('SELECT * FROM meal_plans WHERE client_id=? ORDER BY week_of DESC, id DESC LIMIT 1').bind(client_id).first(),
          env.DB.prepare('SELECT * FROM inbody_scans WHERE client_id=? ORDER BY scan_date DESC LIMIT 12').bind(client_id).all(),
          env.DB.prepare('SELECT * FROM training_sessions WHERE client_id=? ORDER BY session_date DESC LIMIT 20').bind(client_id).all(),
          env.DB.prepare('SELECT * FROM self_workouts WHERE client_id=? ORDER BY workout_date DESC LIMIT 20').bind(client_id).all(),
          getMemberTier(env, client_id),
          env.DB.prepare('SELECT * FROM meal_profiles WHERE client_id=? LIMIT 1').bind(client_id).first(),
          env.DB.prepare('SELECT * FROM daily_logs WHERE client_id=? ORDER BY log_date DESC LIMIT 45').bind(client_id).all()
        ]);
        return ok({ client, checkins: checkins.results||[], mealPlan, scans: scans.results||[], sessions: sessions.results||[], selfWorkouts: selfWorkouts.results||[], tier, mealProfile: mealProfile||null, dailyLogs: dailyLogs.results||[] }, cors);
      }

      if (url.pathname === '/portal/log-workout' && request.method === 'POST') {
        if (!env.DB) return bad('No DB', cors);
        const body = await request.json();
        if (!body.client_id) return bad('client_id required', cors);
        const ins = await env.DB.prepare('INSERT INTO self_workouts (client_id,workout_date,title,exercises_json,duration_min,notes) VALUES (?,?,?,?,?,?)')
          .bind(body.client_id, body.workout_date||new Date().toISOString().slice(0,10), body.title||'Self-guided workout', JSON.stringify(body.exercises||[]), body.duration_min||null, body.notes||'').run();
        const workoutId = ins.meta?.last_row_id;
        // Notify the client's coach + post to a coach-client reaction thread
        const client = await env.DB.prepare('SELECT first_name,last_name,coach FROM clients WHERE id=?').bind(body.client_id).first();
        if (client && client.coach) {
          await env.DB.prepare('INSERT INTO notifications (recipient,type,payload_json) VALUES (?,?,?)')
            .bind(client.coach, 'self_workout', JSON.stringify({
              client_id: body.client_id, client_name: ((client.first_name||'')+' '+(client.last_name||'')).trim(),
              workout_id: workoutId, title: body.title||'Self-guided workout',
              exercise_count: (body.exercises||[]).length, date: body.workout_date||new Date().toISOString().slice(0,10)
            })).run();
        }
        return ok({ logged: true, id: workoutId }, cors);
      }

      // ── COACH REACTIONS ON CLIENT WORKOUTS ────────────────────────
      if (url.pathname === '/coach/notifications' && request.method === 'GET') {
        if (!env.DB) return bad('No DB', cors);
        const coach = url.searchParams.get('coach');
        if (!coach) return bad('coach required', cors);
        const rows = await env.DB.prepare('SELECT * FROM notifications WHERE recipient=? ORDER BY id DESC LIMIT 30').bind(coach).all();
        const unread = await env.DB.prepare('SELECT COUNT(*) n FROM notifications WHERE recipient=? AND read=0').bind(coach).first();
        return ok({ notifications: rows.results||[], unread: unread?.n||0 }, cors);
      }

      if (url.pathname === '/coach/notifications/read' && request.method === 'POST') {
        if (!env.DB) return bad('No DB', cors);
        const b = await request.json();
        if (b.id) await env.DB.prepare('UPDATE notifications SET read=1 WHERE id=?').bind(b.id).run();
        else await env.DB.prepare('UPDATE notifications SET read=1 WHERE recipient=?').bind(b.coach).run();
        return ok({ done: true }, cors);
      }

      if (url.pathname === '/coach/react-workout' && request.method === 'POST') {
        if (!env.DB) return bad('No DB', cors);
        const b = await request.json();
        if (!b.client_id || !b.coach_name || !b.body) return bad('client_id, coach_name, body required', cors);
        await env.DB.prepare('INSERT INTO portal_messages (client_id,coach_name,sender,body) VALUES (?,?,?,?)')
          .bind(b.client_id, b.coach_name, 'coach', b.body).run();
        return ok({ sent: true }, cors);
      }








      // ── AI EXERCISE VIDEO FORM REVIEW ──────────────────────────────
      if (url.pathname === '/exercise-video/review' && request.method === 'POST') {
        if (!env.ANTHROPIC_KEY) return bad('ANTHROPIC_KEY not set.', cors);
        const body = await request.json();
        const frames = body.frames || [];
        if (!frames.length) return bad('frames required', cors);
        const sys = 'You are a certified personal trainer reviewing a few still frames captured from a client\'s exercise set video, in chronological order through the rep. Give brief, encouraging, specific coaching feedback on form and safety — like a trainer glancing over and offering a tip, not a clinical report. Return ONLY valid JSON, no markdown, no prose, with this exact shape: {"observation":"one or two sentences on what you see","cue":"one specific, actionable form cue to try next set","flag":"safety concern if something looks genuinely risky, otherwise empty string"}. Be specific to what is visible (knee position, back angle, bar path, range of motion, control). If the frames are unclear or the movement can\'t be assessed, say so honestly in observation and leave cue and flag empty.';
        const content = frames.slice(0,4).map(f => ({ type:'image', source:{ type:'base64', media_type:'image/jpeg', data:f } }));
        content.push({ type:'text', text: 'These frames are from a set of: ' + (body.exercise_name||'an exercise') + '. Review the form shown.' });
        const aiResp = await fetch('https://api.anthropic.com/v1/messages', {
          method: 'POST',
          headers: { 'Content-Type':'application/json','x-api-key':env.ANTHROPIC_KEY,'anthropic-version':'2023-06-01' },
          body: JSON.stringify({ model:'claude-sonnet-4-6', max_tokens:400, system: sys, messages:[{role:'user', content}] })
        });
        const aiData = await aiResp.json();
        const text = (aiData.content||[]).filter(b=>b.type==='text').map(b=>b.text||'').join('').trim();
        let parsed;
        try { parsed = JSON.parse(text.replace(/```json|```/g,'').trim()); }
        catch(e) { return ok({ observation:'Could not read the video clearly enough to review.', cue:'', flag:'' }, cors); }
        return ok(parsed, cors);
      }

      if (url.pathname === '/exercise-video/upload' && request.method === 'POST') {
        if (!env.PHOTOS) return bad('R2 binding "PHOTOS" not found.', cors);
        if (!env.DB) return bad('D1 binding "DB" not found.', cors);
        const p = url.searchParams;
        const clientId = p.get('client'), exerciseName = p.get('exercise') || 'Exercise', sessionId = p.get('session') || null;
        const aiFeedback = p.get('feedback') || '';
        if (!clientId) return bad('client id required', cors);
        const ts = Date.now();
        const key = `clients/${clientId}/videos/${ts}_${exerciseName.replace(/[^a-z0-9]+/gi,'-')}.mp4`;
        const bytes = await request.arrayBuffer();
        await env.PHOTOS.put(key, bytes, { httpMetadata: { contentType: 'video/mp4' } });
        const res = await env.DB.prepare(
          `INSERT INTO exercise_videos (client_id,session_id,exercise_name,r2_key,note) VALUES (?,?,?,?,?)`
        ).bind(clientId, sessionId, exerciseName, key, aiFeedback).run();
        return ok({ key, id: res.meta?.last_row_id }, cors);
      }

      if (url.pathname === '/exercise-video/list' && request.method === 'GET') {
        if (!env.DB) return bad('No DB', cors);
        const clientId = url.searchParams.get('client_id');
        const exerciseName = url.searchParams.get('exercise');
        if (!clientId) return bad('client_id required', cors);
        let q = 'SELECT * FROM exercise_videos WHERE client_id=?';
        const binds = [clientId];
        if (exerciseName) { q += ' AND exercise_name=?'; binds.push(exerciseName); }
        q += ' ORDER BY recorded_at DESC LIMIT 20';
        const rows = await env.DB.prepare(q).bind(...binds).all();
        return ok({ videos: rows.results||[] }, cors);
      }

      if (url.pathname === '/exercise-video/get' && request.method === 'GET') {
        if (!env.PHOTOS) return bad('R2 binding "PHOTOS" not found.', cors);
        const key = url.searchParams.get('key');
        if (!key) return bad('key required', cors);
        const obj = await env.PHOTOS.get(key);
        if (!obj) return bad('Not found', cors);
        return new Response(obj.body, { headers: { ...cors, 'Content-Type': 'video/mp4' } });
      }

      // ── AI WORKOUT DOCUMENT EXTRACTION ────────────────────────────
      if (url.pathname === '/workout-doc/extract' && request.method === 'POST') {
        if (!env.ANTHROPIC_KEY) return bad('ANTHROPIC_KEY not set.', cors);
        const body = await request.json();
        const kind = body.kind; // 'image' | 'pdf' | 'text'
        if (!kind || !body.data) return bad('kind and data required', cors);
        const sys = 'You extract a structured workout program from a document a personal trainer uploaded (could be a photo of a written program, a PDF program sheet, or plain text pasted from a spreadsheet). Return ONLY valid JSON, no markdown, no prose, with this exact shape: {"title":"short session or program title","exercises":[{"name":"Exercise Name","prescription":"e.g. 3x10 @ 135lb or 4x8, 60s rest"}]}. Use standard exercise naming (e.g. "Barbell Bench Press" not "bench"). If sets/reps/weight are not specified for an exercise, set prescription to an empty string. If nothing resembling a workout is identifiable, return exercises as an empty array.';
        let content;
        if (kind === 'text') {
          content = [{ type:'text', text: 'Extract the workout program from this text:\n\n' + String(body.data).slice(0, 12000) }];
        } else if (kind === 'pdf') {
          content = [
            { type:'document', source: { type:'base64', media_type:'application/pdf', data: body.data } },
            { type:'text', text:'Extract the workout program from this document.' }
          ];
        } else {
          const media_type = body.media_type || 'image/jpeg';
          content = [
            { type:'image', source: { type:'base64', media_type, data: body.data } },
            { type:'text', text:'Extract the workout program from this image.' }
          ];
        }
        const aiResp = await fetch('https://api.anthropic.com/v1/messages', {
          method: 'POST',
          headers: { 'Content-Type':'application/json','x-api-key':env.ANTHROPIC_KEY,'anthropic-version':'2023-06-01' },
          body: JSON.stringify({ model:'claude-sonnet-4-6', max_tokens:1200, system: sys, messages:[{role:'user', content}] })
        });
        const aiData = await aiResp.json();
        const text = (aiData.content||[]).filter(b=>b.type==='text').map(b=>b.text||'').join('').trim();
        let parsed;
        try { parsed = JSON.parse(text.replace(/```json|```/g,'').trim()); }
        catch(e) { return ok({ title:'', exercises:[], parse_error:true }, cors); }
        return ok({ title: parsed.title||'', exercises: parsed.exercises||[] }, cors);
      }




      if (url.pathname === '/coach/today-schedule' && request.method === 'GET') {
        if (!env.DB) return bad('No DB', cors);
        const coach = url.searchParams.get('coach');
        if (!coach) return bad('coach required', cors);
        const targetDate = url.searchParams.get('date') || new Date().toISOString().slice(0,10);
        const rows = await env.DB.prepare(
          `SELECT s.id, s.client_id, s.program_name, s.focus_notes, c.first_name, c.last_name
           FROM scheduled_sessions s JOIN clients c ON s.client_id = c.id
           WHERE COALESCE(NULLIF(s.assigned_coach,''), c.coach) = ? AND s.scheduled_date = ? AND s.status = 'scheduled'
           ORDER BY c.last_name ASC`
        ).bind(coach, targetDate).all();
        return ok({ today: rows.results || [], date: targetDate }, cors);
      }

      // ── CLIENTS IN JEOPARDY (no session scheduled in 7+ days) ─────
      // ── ENGAGEMENT: BIRTHDAYS & MEMBERSHIP ANNIVERSARIES ──────────
      // NOTE: simple MM-DD string comparison; does not handle the Dec->Jan
      // year-boundary wraparound (a Jan 2 birthday won't show on Dec 30).
      // Fine for now — worth revisiting if that edge case matters later.
      if (url.pathname === '/engagement/celebrations' && request.method === 'GET') {
        if (!env.DB) return bad('No DB', cors);
        const days = Math.min(parseInt(url.searchParams.get('days') || '7', 10) || 7, 30);
        const birthdays = await env.DB.prepare(
          `SELECT id, first_name, last_name, birthday FROM clients
           WHERE birthday IS NOT NULL AND status IN ('active_member','active_pt')
           AND strftime('%m-%d', birthday) BETWEEN strftime('%m-%d','now') AND strftime('%m-%d', date('now','+${days} day'))
           ORDER BY strftime('%m-%d', birthday) ASC LIMIT 50`
        ).all().catch(() => ({ results: [] }));
        const anniversaries = await env.DB.prepare(
          `SELECT id, first_name, last_name, training_start_date FROM clients
           WHERE training_start_date IS NOT NULL AND status IN ('active_member','active_pt')
           AND strftime('%m-%d', training_start_date) BETWEEN strftime('%m-%d','now') AND strftime('%m-%d', date('now','+${days} day'))
           ORDER BY strftime('%m-%d', training_start_date) ASC LIMIT 50`
        ).all().catch(() => ({ results: [] }));
        return ok({ birthdays: birthdays.results || [], anniversaries: anniversaries.results || [] }, cors);
      }

      // ── RETRO CHEF: daily rotating whole-foods recipe ─────────────
      if (url.pathname === '/chef/daily-recipe' && request.method === 'GET') {
        if (!env.DB) return bad('No DB', cors);
        const today = new Date().toISOString().slice(0,10);
        const existing = await env.DB.prepare('SELECT * FROM chef_recipes WHERE recipe_date=?').bind(today).first();
        if (existing) return ok({ recipe: existing }, cors);
        if (!env.ANTHROPIC_KEY) return bad('ANTHROPIC_KEY not set.', cors);
        const sys = 'You are Chef Ted, a former professional chef who now coaches fitness. Generate ONE simple, healthy recipe built entirely from whole foods (fresh produce, whole grains, lean proteins, minimal packaged/processed ingredients — no relying on prepared or pre-packaged shortcuts). Easy enough for a beginner cook. Return ONLY valid JSON, no markdown, with this exact shape: {"title":"","description":"one sentence, 15-25 words","prep_time":"e.g. 25 min","ingredients":["item with quantity", "..."],"instructions":["step 1", "step 2", "..."],"shopping_list":["item", "..."]}. The shopping_list should be the same items as ingredients but written as a simple grocery list (no quantities needed beyond what a shopper needs to know, e.g. \'chicken breast\' not \'2 diced chicken breasts\'). No commentary outside the JSON.';
        const aiResp = await fetch('https://api.anthropic.com/v1/messages', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json', 'x-api-key': env.ANTHROPIC_KEY, 'anthropic-version': '2023-06-01' },
          body: JSON.stringify({ model: 'claude-sonnet-4-6', max_tokens: 1000, system: sys, messages: [{ role: 'user', content: 'Give me today\'s whole-foods recipe.' }] })
        });
        const aiData = await aiResp.json();
        const text = (aiData.content && aiData.content[0] && aiData.content[0].text) || '{}';
        let parsed;
        try { parsed = JSON.parse(text.replace(/```json|```/g,'').trim()); }
        catch(e) { return bad('AI response could not be parsed as JSON', cors); }
        await env.DB.prepare('INSERT INTO chef_recipes (recipe_date,title,description,prep_time,ingredients_json,instructions_json,shopping_list_json,created_at) VALUES (?,?,?,?,?,?,?,?)')
          .bind(today, parsed.title||'', parsed.description||'', parsed.prep_time||'', JSON.stringify(parsed.ingredients||[]), JSON.stringify(parsed.instructions||[]), JSON.stringify(parsed.shopping_list||[]), new Date().toISOString()).run();
        const saved = await env.DB.prepare('SELECT * FROM chef_recipes WHERE recipe_date=?').bind(today).first();
        return ok({ recipe: saved }, cors);
      }

      // ── PT APPOINTMENTS: bookable for existing clients OR brand-new prospects ──
      if (url.pathname === '/appointments/create' && request.method === 'POST') {
        if (!env.DB) return bad('No DB', cors);
        const b = await request.json();
        if (!b.appointment_date || !b.appointment_type) return bad('appointment_date and appointment_type required', cors);
        if (!b.client_id && !b.prospect_name) return bad('client_id or prospect_name required', cors);
        const now = new Date().toISOString();
        const res = await env.DB.prepare(
          `INSERT INTO pt_appointments (appointment_date, appointment_time, appointment_type, prospect_name, prospect_phone, prospect_email, client_id, assigned_coach, status, gym_id, notes, created_at, updated_at)
           VALUES (?,?,?,?,?,?,?,?,'scheduled',?,?,?,?)`
        ).bind(b.appointment_date, b.appointment_time||null, b.appointment_type, b.prospect_name||null, b.prospect_phone||null, b.prospect_email||null,
               b.client_id||null, b.assigned_coach||null, b.gym_id||1, b.notes||null, now, now).run();
        return ok({ id: res.meta.last_row_id }, cors);
      }

      if (url.pathname === '/appointments/day' && request.method === 'GET') {
        if (!env.DB) return bad('No DB', cors);
        const date = url.searchParams.get('date') || new Date().toISOString().slice(0,10);
        const coach = url.searchParams.get('coach');
        let query = `SELECT a.*, c.first_name as client_first_name, c.last_name as client_last_name
                     FROM pt_appointments a LEFT JOIN clients c ON a.client_id = c.id
                     WHERE a.appointment_date = ?`;
        const binds = [date];
        if (coach) { query += ' AND a.assigned_coach = ?'; binds.push(coach); }
        query += ` ORDER BY a.appointment_time ASC`;
        const rows = await env.DB.prepare(query).bind(...binds).all();
        return ok({ appointments: rows.results || [] }, cors);
      }

      if (url.pathname === '/appointments/status' && request.method === 'POST') {
        if (!env.DB) return bad('No DB', cors);
        const b = await request.json();
        if (!b.id || !b.status) return bad('id and status required', cors);
        await env.DB.prepare(`UPDATE pt_appointments SET status=?, updated_at=? WHERE id=?`)
          .bind(b.status, new Date().toISOString(), b.id).run();
        return ok({ ok: true }, cors);
      }

      // ── COACH-SCOPED STATS AT A GLANCE ────────────────────────────
      if (url.pathname === '/coach/stats' && request.method === 'GET') {
        if (!env.DB) return bad('No DB', cors);
        const coach = url.searchParams.get('coach');
        if (!coach) return bad('coach required', cors);
        const weekAgo = "date('now','-7 day')";

        const revenueRow = await env.DB.prepare(
          `SELECT COALESCE(SUM(amount),0) as total FROM pt_sales WHERE sold_by = ? AND sale_date >= ${weekAgo}`
        ).bind(coach).first().catch(() => ({ total: 0 }));

        const activeCount = await env.DB.prepare(
          `SELECT COUNT(*) as n FROM clients WHERE coach = ? AND status IN ('active_pt','active','active_member')`
        ).bind(coach).first().catch(() => ({ n: 0 }));
        const cancelledCount = await env.DB.prepare(
          `SELECT COUNT(*) as n FROM clients WHERE coach = ? AND status = 'cancelled'`
        ).bind(coach).first().catch(() => ({ n: 0 }));
        const totalEver = (activeCount?.n||0) + (cancelledCount?.n||0);
        const retentionPct = totalEver > 0 ? Math.round((activeCount.n / totalEver) * 100) : null;

        const avgSessionsRow = await env.DB.prepare(
          `SELECT AVG(sessions_per_week) as avg FROM clients WHERE coach = ? AND status IN ('active_pt','active','active_member') AND sessions_per_week IS NOT NULL`
        ).bind(coach).first().catch(() => ({ avg: null }));

        const renewalsRow = await env.DB.prepare(
          `SELECT COUNT(*) as n FROM clients WHERE coach = ? AND status IN ('active_pt','active','active_member') AND sessions_remaining <= 2`
        ).bind(coach).first().catch(() => ({ n: 0 }));

        const consultRows = await env.DB.prepare(
          `SELECT outcome FROM consultations WHERE advisor = ? AND consult_date >= date('now','-30 day')`
        ).bind(coach).all().catch(() => ({ results: [] }));
        const consults = consultRows.results || [];
        const accepted = consults.filter(c => c.outcome === 'accepted').length;
        const declined = consults.filter(c => c.outcome === 'declined').length;
        const closeRate = (accepted + declined) > 0 ? Math.round((accepted/(accepted+declined))*100) : null;

        return ok({
          revenue_this_week: revenueRow?.total || 0,
          active_clients: activeCount?.n || 0,
          retention_pct: retentionPct,
          avg_sessions_per_week: avgSessionsRow?.avg ? Math.round(avgSessionsRow.avg*10)/10 : null,
          renewals_due: renewalsRow?.n || 0,
          close_rate_30d: closeRate,
          consultations_30d: accepted + declined
        }, cors);
      }

      // ── COACH DAILY TIP: rotating AI content, cached once per day ──
      if (url.pathname === '/coach/daily-tip' && request.method === 'GET') {
        if (!env.DB) return bad('No DB', cors);
        const today = new Date().toISOString().slice(0,10);
        const existing = await env.DB.prepare('SELECT * FROM coach_daily_tips WHERE tip_date=?').bind(today).first();
        if (existing) return ok({ tip: existing }, cors);
        if (!env.ANTHROPIC_KEY) return bad('ANTHROPIC_KEY not set.', cors);
        const sys = 'You are writing a short daily briefing for a personal trainer at a commercial gym. Return ONLY valid JSON, no markdown, with this exact shape: {"industry_news":"one real, current, general fitness-industry trend or note, 20-30 words","coaching_tip":"one practical PT coaching tip, 20-30 words","nutrition_note":"one nutrition science note relevant to general fitness clients, 20-30 words"}. Keep it grounded, no hype, no fake statistics. No commentary outside the JSON.';
        const aiResp = await fetch('https://api.anthropic.com/v1/messages', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json', 'x-api-key': env.ANTHROPIC_KEY, 'anthropic-version': '2023-06-01' },
          body: JSON.stringify({ model: 'claude-sonnet-4-6', max_tokens: 500, system: sys, messages: [{ role: 'user', content: 'Give me today\'s trainer briefing.' }] })
        });
        const aiData = await aiResp.json();
        const text = (aiData.content && aiData.content[0] && aiData.content[0].text) || '{}';
        let parsed;
        try { parsed = JSON.parse(text.replace(/```json|```/g,'').trim()); }
        catch(e) { return bad('AI response could not be parsed as JSON', cors); }
        await env.DB.prepare('INSERT INTO coach_daily_tips (tip_date,industry_news,coaching_tip,nutrition_note,created_at) VALUES (?,?,?,?,?)')
          .bind(today, parsed.industry_news||'', parsed.coaching_tip||'', parsed.nutrition_note||'', new Date().toISOString()).run();
        const saved = await env.DB.prepare('SELECT * FROM coach_daily_tips WHERE tip_date=?').bind(today).first();
        return ok({ tip: saved }, cors);
      }

      // ── COACH CLIENT COVERAGE: temporary visibility grant, doesn't touch session data ──
      if (url.pathname === '/coverage/create' && request.method === 'POST') {
        if (!env.DB) return bad('No DB', cors);
        const b = await request.json();
        if (!b.covering_coach || !b.covered_coach || !b.start_date || !b.end_date) return bad('covering_coach, covered_coach, start_date, end_date required', cors);
        await env.DB.prepare('INSERT INTO coach_coverage (covering_coach,covered_coach,start_date,end_date,created_by,created_at) VALUES (?,?,?,?,?,?)')
          .bind(b.covering_coach, b.covered_coach, b.start_date, b.end_date, b.created_by||null, new Date().toISOString()).run();
        return ok({ created: true }, cors);
      }

      if (url.pathname === '/coverage/list' && request.method === 'GET') {
        if (!env.DB) return bad('No DB', cors);
        const rows = await env.DB.prepare(
          `SELECT * FROM coach_coverage WHERE end_date >= date('now','-1 day') ORDER BY start_date ASC LIMIT 200`
        ).all();
        return ok({ coverage: rows.results || [] }, cors);
      }

      if (url.pathname === '/coverage/active' && request.method === 'GET') {
        if (!env.DB) return bad('No DB', cors);
        const coach = url.searchParams.get('coach');
        if (!coach) return bad('coach required', cors);
        const rows = await env.DB.prepare(
          `SELECT * FROM coach_coverage WHERE covering_coach = ? AND date('now') BETWEEN start_date AND end_date`
        ).bind(coach).all();
        return ok({ covering: (rows.results||[]).map(r => r.covered_coach) }, cors);
      }

      if (url.pathname === '/coverage/delete' && request.method === 'POST') {
        if (!env.DB) return bad('No DB', cors);
        const b = await request.json();
        if (!b.id) return bad('id required', cors);
        await env.DB.prepare('DELETE FROM coach_coverage WHERE id=?').bind(b.id).run();
        return ok({ deleted: true }, cors);
      }

      if (url.pathname === '/jeopardy/clients' && request.method === 'GET') {
        if (!env.DB) return bad('No DB', cors);
        const coach = url.searchParams.get('coach');
        const threshold = "date('now','-7 day')";
        let query = `
          SELECT c.id, c.first_name, c.last_name, c.coach, c.advisor,
            (SELECT MAX(s.scheduled_date) FROM scheduled_sessions s WHERE s.client_id = c.id) as last_scheduled
          FROM clients c
          WHERE c.status = 'active_pt'
        `;
        const binds = [];
        if (coach) { query += ' AND COALESCE(NULLIF(c.coach,\'\'), c.advisor) = ?'; binds.push(coach); }
        query += ` HAVING last_scheduled IS NULL OR last_scheduled < ${threshold} ORDER BY (last_scheduled IS NOT NULL), last_scheduled ASC`;
        const rows = await env.DB.prepare(query).bind(...binds).all();
        return ok({ jeopardy: rows.results || [] }, cors);
      }


      if (url.pathname === '/schedule/bulk-reassign' && request.method === 'POST') {
        if (!env.DB) return bad('No DB', cors);
        const b = await request.json();
        if (!b.date || !b.from_coach || !b.to_coach) return bad('date, from_coach, to_coach required', cors);
        const rows = await env.DB.prepare(
          `SELECT s.id, s.client_id FROM scheduled_sessions s JOIN clients c ON s.client_id = c.id
           WHERE s.scheduled_date = ? AND s.status = 'scheduled' AND COALESCE(NULLIF(s.assigned_coach,''), c.coach) = ?`
        ).bind(b.date, b.from_coach).all();
        const affected = rows.results || [];
        const whenText = b.date === new Date().toISOString().slice(0,10) ? 'today' : ('on ' + new Date(b.date+'T00:00:00').toLocaleDateString('en-US',{month:'long',day:'numeric'}));
        for (const row of affected) {
          await env.DB.prepare('UPDATE scheduled_sessions SET assigned_coach=? WHERE id=?').bind(b.to_coach, row.id).run();
          await env.DB.prepare("INSERT INTO portal_messages (client_id,coach_name,sender,body) VALUES (?,?,?,?)")
            .bind(row.client_id, b.to_coach, 'coach', `Heads up — ${b.to_coach} will be running your session ${whenText} while ${b.from_coach} is out. See you then!`).run();
        }
        return ok({ reassigned_count: affected.length }, cors);
      }


      // ── CLUB OS CALENDAR SYNC (real booked appointments) ────────────
      if (url.pathname === '/schedule/sync-clubos' && request.method === 'POST') {
        if (!env.DB) return bad('No DB', cors);
        const ICAL_URL = 'https://retro.club-os.com/CalendarSync/2ef40c0fb21d7e38fe42d69866b302a3d411120f';
        let text;
        try {
          const feedResp = await fetch(ICAL_URL);
          if (!feedResp.ok) return bad('Could not reach Club OS calendar feed (status ' + feedResp.status + ')', cors);
          text = await feedResp.text();
        } catch (e) {
          return bad('Fetch to Club OS failed: ' + e.message, cors);
        }

        // Unfold lines per iCal spec: a line starting with a space/tab continues the previous line.
        const rawLines = text.split(/\r\n|\n|\r/);
        const lines = [];
        for (const line of rawLines) {
          if ((line.startsWith(' ') || line.startsWith('\t')) && lines.length) lines[lines.length-1] += line.slice(1);
          else lines.push(line);
        }

        function parseICalDate(v) {
          // Handles YYYYMMDD or YYYYMMDDTHHMMSS[Z]
          const m = v.match(/^(\d{4})(\d{2})(\d{2})(?:T(\d{2})(\d{2})(\d{2}))?/);
          if (!m) return null;
          const [, y, mo, d, h, mi] = m;
          if (h != null) return `${y}-${mo}-${d}T${h}:${mi}:00`;
          return `${y}-${mo}-${d}`;
        }

        const events = [];
        let cur = null;
        for (const line of lines) {
          if (line.startsWith('BEGIN:VEVENT')) { cur = {}; continue; }
          if (line.startsWith('END:VEVENT')) { if (cur) events.push(cur); cur = null; continue; }
          if (!cur) continue;
          const idx = line.indexOf(':');
          if (idx === -1) continue;
          let key = line.slice(0, idx);
          const val = line.slice(idx+1);
          key = key.split(';')[0]; // strip params like DTSTART;TZID=...
          if (key === 'SUMMARY') cur.summary = val.replace(/\\,/g,',').replace(/\\n/gi,' ');
          else if (key === 'UID') cur.uid = val;
          else if (key === 'DTSTART') cur.start = parseICalDate(val);
          else if (key === 'DTEND') cur.end = parseICalDate(val);
          else if (key === 'DESCRIPTION') cur.description = val.replace(/\\,/g,',').replace(/\\n/gi,' ');
          else if (key === 'LOCATION') cur.location = val;
        }

        let upserted = 0;
        for (const ev of events) {
          if (!ev.uid || !ev.start) continue;
          await env.DB.prepare(
            `INSERT INTO clubos_appointments (uid, summary, start_datetime, end_datetime, description, location, synced_at)
             VALUES (?,?,?,?,?,?,datetime('now'))
             ON CONFLICT(uid) DO UPDATE SET summary=excluded.summary, start_datetime=excluded.start_datetime,
               end_datetime=excluded.end_datetime, description=excluded.description, location=excluded.location, synced_at=datetime('now')`
          ).bind(ev.uid, ev.summary||'', ev.start, ev.end||null, ev.description||null, ev.location||null).run();
          upserted++;
        }
        return ok({ synced: upserted, total_events_found: events.length }, cors);
      }

      if (url.pathname === '/schedule/clubos-day' && request.method === 'GET') {
        if (!env.DB) return bad('No DB', cors);
        const date = url.searchParams.get('date');
        if (!date) return bad('date required', cors);
        const rows = await env.DB.prepare(
          "SELECT * FROM clubos_appointments WHERE substr(start_datetime,1,10)=? ORDER BY start_datetime ASC"
        ).bind(date).all();
        return ok({ appointments: rows.results || [] }, cors);
      }

      if (url.pathname === '/schedule/clubos-month' && request.method === 'GET') {
        if (!env.DB) return bad('No DB', cors);
        const month = url.searchParams.get('month');
        if (!month) return bad('month (YYYY-MM) required', cors);
        const rows = await env.DB.prepare(
          "SELECT substr(start_datetime,1,10) d, COUNT(*) n FROM clubos_appointments WHERE substr(start_datetime,1,7)=? GROUP BY d"
        ).bind(month).all();
        return ok({ days: rows.results || [] }, cors);
      }

      // ── PROGRAM SCHEDULING ─────────────────────────────────────────
      if (url.pathname === '/schedule/create' && request.method === 'POST') {
        if (!env.DB) return bad('No DB', cors);
        const b = await request.json();
        if (!b.client_id || !b.start_date || !b.end_date || !Array.isArray(b.weekdays) || !b.weekdays.length)
          return bad('client_id, start_date, end_date, weekdays[] required', cors);
        // day_routines (optional): { "1": {program_name, exercises}, "3": {...}, "5": {...} }
        // lets each weekday carry its own routine. Falls back to one flat
        // program_name/exercises applied to every date if day_routines isn't sent.
        const dayRoutines = (b.day_routines && typeof b.day_routines === 'object') ? b.day_routines : null;
        if (!dayRoutines && !b.program_name) return bad('program_name required when day_routines is not provided', cors);
        const start = new Date(b.start_date + 'T00:00:00');
        const end = new Date(b.end_date + 'T00:00:00');
        if (end < start) return bad('end_date must be after start_date', cors);
        let assignedCoach = b.assigned_coach || '';
        if (!assignedCoach) {
          const client = await env.DB.prepare('SELECT coach FROM clients WHERE id=?').bind(b.client_id).first();
          assignedCoach = client?.coach || '';
        }
        const fallbackExercisesJson = Array.isArray(b.exercises) ? JSON.stringify(b.exercises) : null;
        const created = [];
        for (let d = new Date(start); d <= end; d.setDate(d.getDate()+1)) {
          const dow = d.getDay();
          if (b.weekdays.includes(dow)) {
            const dateStr = d.toISOString().slice(0,10);
            const dayRoutine = dayRoutines ? dayRoutines[String(dow)] : null;
            const programName = dayRoutine?.program_name || b.program_name || 'Training Session';
            const exercisesJson = dayRoutine?.exercises ? JSON.stringify(dayRoutine.exercises) : fallbackExercisesJson;
            const ins = await env.DB.prepare(
              'INSERT INTO scheduled_sessions (client_id,scheduled_date,program_name,focus_notes,status,created_by,assigned_coach,exercises_json) VALUES (?,?,?,?,?,?,?,?)'
            ).bind(b.client_id, dateStr, programName, b.focus_notes||'', 'scheduled', b.coach_name||'', assignedCoach, exercisesJson).run();
            created.push({ date: dateStr, id: ins.meta?.last_row_id, program_name: programName });
          }
        }
        return ok({ created_count: created.length, sessions: created }, cors);
      }

      if (url.pathname === '/schedule/update' && request.method === 'POST') {
        if (!env.DB) return bad('No DB', cors);
        const b = await request.json();
        if (!b.id) return bad('id required', cors);
        const before = await env.DB.prepare('SELECT client_id, scheduled_date, assigned_coach FROM scheduled_sessions WHERE id=?').bind(b.id).first();
        const fields = [];
        const binds = [];
        if (b.scheduled_date) { fields.push('scheduled_date=?'); binds.push(b.scheduled_date); }
        if (b.program_name != null) { fields.push('program_name=?'); binds.push(b.program_name); }
        if (b.focus_notes != null) { fields.push('focus_notes=?'); binds.push(b.focus_notes); }
        if (b.assigned_coach != null) { fields.push('assigned_coach=?'); binds.push(b.assigned_coach); }
        if (b.exercises != null) { fields.push('exercises_json=?'); binds.push(JSON.stringify(b.exercises)); }
        if (!fields.length) return bad('nothing to update', cors);
        binds.push(b.id);
        await env.DB.prepare(`UPDATE scheduled_sessions SET ${fields.join(', ')} WHERE id=?`).bind(...binds).run();
        if (before && b.assigned_coach != null && b.assigned_coach !== before.assigned_coach) {
          const dateStr = b.scheduled_date || before.scheduled_date;
          const whenText = dateStr === new Date().toISOString().slice(0,10) ? 'today' : ('on ' + new Date(dateStr+'T00:00:00').toLocaleDateString('en-US',{month:'long',day:'numeric'}));
          await env.DB.prepare("INSERT INTO portal_messages (client_id,coach_name,sender,body) VALUES (?,?,?,?)")
            .bind(before.client_id, b.assigned_coach, 'coach', `Heads up — ${b.assigned_coach} will be running your session ${whenText} instead of your regular trainer. See you then!`).run();
        }
        return ok({ updated: true }, cors);
      }

      if (url.pathname === '/schedule/day' && request.method === 'GET') {
        if (!env.DB) return bad('No DB', cors);
        const date = url.searchParams.get('date');
        const coach = url.searchParams.get('coach');
        if (!date) return bad('date required', cors);
        let q = `SELECT s.*, c.first_name, c.last_name, c.coach AS default_coach
                 FROM scheduled_sessions s JOIN clients c ON s.client_id = c.id
                 WHERE s.scheduled_date = ? AND s.status = 'scheduled'`;
        const binds = [date];
        if (coach) { q += ' AND COALESCE(NULLIF(s.assigned_coach,\'\'), c.coach) = ?'; binds.push(coach); }
        q += ' ORDER BY c.last_name ASC';
        const rows = await env.DB.prepare(q).bind(...binds).all();
        return ok({ sessions: rows.results || [] }, cors);
      }

      if (url.pathname === '/schedule/month' && request.method === 'GET') {
        if (!env.DB) return bad('No DB', cors);
        const month = url.searchParams.get('month');
        const coach = url.searchParams.get('coach');
        if (!month) return bad('month (YYYY-MM) required', cors);
        let q = `SELECT s.scheduled_date, COUNT(*) n FROM scheduled_sessions s JOIN clients c ON s.client_id = c.id
                 WHERE substr(s.scheduled_date,1,7) = ? AND s.status = 'scheduled'`;
        const binds = [month];
        if (coach) { q += ' AND COALESCE(NULLIF(s.assigned_coach,\'\'), c.coach) = ?'; binds.push(coach); }
        q += ' GROUP BY s.scheduled_date';
        const rows = await env.DB.prepare(q).bind(...binds).all();
        return ok({ days: rows.results || [] }, cors);
      }

      if (url.pathname === '/schedule/list' && request.method === 'GET') {
        if (!env.DB) return bad('No DB', cors);
        const clientId = url.searchParams.get('client_id');
        if (!clientId) return bad('client_id required', cors);
        const today = new Date().toISOString().slice(0,10);
        const rows = await env.DB.prepare(
          'SELECT * FROM scheduled_sessions WHERE client_id=? AND scheduled_date >= ? ORDER BY scheduled_date ASC LIMIT 30'
        ).bind(clientId, today).all();
        return ok({ upcoming: rows.results||[] }, cors);
      }

      if (url.pathname === '/schedule/today' && request.method === 'GET') {
        if (!env.DB) return bad('No DB', cors);
        const clientId = url.searchParams.get('client_id');
        if (!clientId) return bad('client_id required', cors);
        const today = new Date().toISOString().slice(0,10);
        const row = await env.DB.prepare(
          "SELECT * FROM scheduled_sessions WHERE client_id=? AND scheduled_date=? AND status='scheduled' LIMIT 1"
        ).bind(clientId, today).first();
        return ok({ today: row || null }, cors);
      }

      if (url.pathname === '/schedule/cancel' && request.method === 'POST') {
        if (!env.DB) return bad('No DB', cors);
        const b = await request.json();
        if (!b.id) return bad('id required', cors);
        await env.DB.prepare("UPDATE scheduled_sessions SET status='cancelled' WHERE id=?").bind(b.id).run();
        return ok({ cancelled: true }, cors);
      }


      if (url.pathname === '/coach/note' && request.method === 'POST') {
        if (!env.DB) return bad('No DB', cors);
        const b = await request.json();
        if (!b.client_id || !b.coach_name || !b.body) return bad('client_id, coach_name, body required', cors);
        const tag = b.tag || 'General';
        const ins = await env.DB.prepare('INSERT INTO coach_notes (client_id,coach_name,tag,body) VALUES (?,?,?,?)')
          .bind(b.client_id, b.coach_name, tag, b.body).run();
        return ok({ saved: true, id: ins.meta?.last_row_id }, cors);
      }




      // ── AI-DRAFTED CHAT REPLY (Smart Response) ──────────────────────
      if (url.pathname === '/coach/draft-reply' && request.method === 'POST') {
        if (!env.ANTHROPIC_KEY) return bad('ANTHROPIC_KEY not set.', cors);
        const b = await request.json();
        if (!b.client_message) return bad('client_message required', cors);
        const sys = 'You are helping a personal trainer quickly draft a reply to their client\'s message. Write ONE short, warm, coach-voiced reply (2-4 sentences) that directly addresses what the client said — acknowledge it, give one concrete piece of guidance if relevant (e.g. a form adjustment, encouragement, a scheduling answer), and keep it casual and human, not corporate. Return ONLY the reply text, no quotes, no preamble, no signature.';
        const context = b.recent_context ? ('Recent context on this client: ' + b.recent_context + '\n\n') : '';
        const content = [{ type:'text', text: context + 'Client just messaged: "' + b.client_message + '"\n\nDraft the coach\'s reply.' }];
        const aiResp = await fetch('https://api.anthropic.com/v1/messages', {
          method: 'POST',
          headers: { 'Content-Type':'application/json','x-api-key':env.ANTHROPIC_KEY,'anthropic-version':'2023-06-01' },
          body: JSON.stringify({ model:'claude-sonnet-4-6', max_tokens:300, system: sys, messages:[{role:'user', content}] })
        });
        const aiData = await aiResp.json();
        const text = (aiData.content||[]).filter(x=>x.type==='text').map(x=>x.text||'').join('').trim();
        return ok({ draft: text }, cors);
      }

      // ── UNIFIED COACH INBOX (aggregated 1:1 threads, never merged) ──
      if (url.pathname === '/coach/inbox' && request.method === 'GET') {
        if (!env.DB) return bad('No DB', cors);
        const coach = url.searchParams.get('coach');
        if (!coach) return bad('coach required', cors);
        const clients = await env.DB.prepare('SELECT id, first_name, last_name FROM clients WHERE coach=?').bind(coach).all();
        const rows = [];
        for (const c of (clients.results || [])) {
          const last = await env.DB.prepare('SELECT sender, body, created_at FROM portal_messages WHERE client_id=? ORDER BY created_at DESC LIMIT 1').bind(c.id).first();
          if (!last) continue;
          const unread = await env.DB.prepare("SELECT COUNT(*) n FROM portal_messages WHERE client_id=? AND sender='client' AND read=0").bind(c.id).first();
          rows.push({
            client_id: c.id, name: ((c.first_name||'')+' '+(c.last_name||'')).trim(),
            last_sender: last.sender, last_body: last.body, last_at: last.created_at,
            unread_count: unread?.n || 0
          });
        }
        rows.sort((a,b) => new Date(b.last_at) - new Date(a.last_at));
        return ok({ threads: rows }, cors);
      }


      // ── COACH DAILY DASHBOARD (4-zone real-data summary) ────────────
      if (url.pathname === '/coach/dashboard-summary' && request.method === 'GET') {
        if (!env.DB) return bad('No DB', cors);
        const coach = url.searchParams.get('coach');
        if (!coach) return bad('coach required', cors);
        const today = new Date().toISOString().slice(0,10);
        const monthStr = today.slice(0,7);

        const clients = await env.DB.prepare(
          `SELECT c.id, c.first_name, c.last_name, c.sessions_remaining, c.package_end_date,
                  (SELECT MAX(created_at) FROM coach_touchpoints t WHERE t.client_id=c.id) AS last_touch,
                  (SELECT MAX(created_at) FROM portal_messages m WHERE m.client_id=c.id) AS last_msg
           FROM clients c WHERE c.coach=?`
        ).bind(coach).all();
        const rows = clients.results || [];

        const atRisk = [];
        for (const c of rows) {
          const name = ((c.first_name||'')+' '+(c.last_name||'')).trim();
          const reasons = [];
          if (c.sessions_remaining != null && c.sessions_remaining <= 2) reasons.push(c.sessions_remaining + ' session' + (c.sessions_remaining===1?'':'s') + ' left');
          if (c.package_end_date && c.package_end_date >= today) {
            const days = Math.round((new Date(c.package_end_date) - new Date(today)) / 86400000);
            if (days <= 7) reasons.push('package ends in ' + days + ' day' + (days===1?'':'s'));
          }
          const lastActivity = [c.last_touch, c.last_msg].filter(Boolean).sort().pop();
          const daysSince = lastActivity ? Math.round((Date.now() - new Date(lastActivity+'Z')) / 86400000) : null;
          if (daysSince === null || daysSince >= 14) reasons.push(daysSince===null ? 'never contacted' : daysSince + ' days since last contact');
          if (reasons.length) atRisk.push({ client_id: c.id, name, reasons });
        }

        const revenue = await env.DB.prepare(
          "SELECT COALESCE(SUM(amount),0) total, COUNT(*) n FROM pt_sales WHERE sold_by=? AND substr(sale_date,1,7)=?"
        ).bind(coach, monthStr).first();

        const avgSessions = rows.length ? Math.round(rows.reduce((s,c)=>s+(c.sessions_remaining||0),0) / rows.length * 10)/10 : 0;
        const renewalsDue = atRisk.filter(a => a.reasons.some(r => r.includes('left') || r.includes('ends in'))).length;

        // Morning briefing — AI phrasing of the real numbers, no invented stats
        let briefing = `You have ${rows.length} active client${rows.length===1?'':'s'}, ${atRisk.length} need attention, and ${renewalsDue} renewal${renewalsDue===1?'':'s'} coming up.`;
        if (env.ANTHROPIC_KEY) {
          try {
            const sys = 'Write ONE short, warm, direct sentence (max 2 sentences) summarizing a personal trainer\'s day for their dashboard. Use ONLY the numbers given — never invent statistics not provided. Sound like a sharp business partner, not corporate.';
            const facts = `Active clients: ${rows.length}. Clients needing attention today: ${atRisk.length}. Renewals due within 7 days: ${renewalsDue}. PT revenue this month so far: $${revenue?.total||0}.`;
            const aiResp = await fetch('https://api.anthropic.com/v1/messages', {
              method: 'POST',
              headers: { 'Content-Type':'application/json','x-api-key':env.ANTHROPIC_KEY,'anthropic-version':'2023-06-01' },
              body: JSON.stringify({ model:'claude-sonnet-4-6', max_tokens:120, system: sys, messages:[{role:'user', content:[{type:'text',text:facts}]}] })
            });
            const aiData = await aiResp.json();
            const text = (aiData.content||[]).filter(x=>x.type==='text').map(x=>x.text||'').join('').trim();
            if (text) briefing = text;
          } catch(e) {}
        }

        return ok({
          briefing,
          active_clients: rows.length,
          at_risk: atRisk.sort((a,b)=>b.reasons.length-a.reasons.length).slice(0,10),
          renewals_due: renewalsDue,
          avg_sessions_remaining: avgSessions,
          revenue_this_month: revenue?.total || 0,
          sales_this_month: revenue?.n || 0
        }, cors);
      }

      if (url.pathname === '/coach/draft-outreach' && request.method === 'POST') {
        if (!env.ANTHROPIC_KEY) return bad('ANTHROPIC_KEY not set.', cors);
        const b = await request.json();
        if (!b.client_name || !b.reasons) return bad('client_name, reasons required', cors);
        const sys = 'You are a personal trainer drafting a short, warm, proactive outreach message to a client who needs a check-in. 2-3 sentences, casual and human, not corporate. Address one of the real reasons given (renewal coming up, or haven\'t heard from them). Return ONLY the message text.';
        const content = [{ type:'text', text: `Client: ${b.client_name}. Reason to reach out: ${b.reasons}. Draft the message.` }];
        const aiResp = await fetch('https://api.anthropic.com/v1/messages', {
          method: 'POST',
          headers: { 'Content-Type':'application/json','x-api-key':env.ANTHROPIC_KEY,'anthropic-version':'2023-06-01' },
          body: JSON.stringify({ model:'claude-sonnet-4-6', max_tokens:250, system: sys, messages:[{role:'user', content}] })
        });
        const aiData = await aiResp.json();
        const text = (aiData.content||[]).filter(x=>x.type==='text').map(x=>x.text||'').join('').trim();
        return ok({ draft: text }, cors);
      }


      if (url.pathname === '/clients/bulk-reassign' && request.method === 'POST') {
        if (!env.DB) return bad('No DB', cors);
        const b = await request.json();
        if (!Array.isArray(b.client_ids) || !b.client_ids.length || !b.new_coach) return bad('client_ids[] and new_coach required', cors);
        let updated = 0;
        for (const id of b.client_ids) {
          await env.DB.prepare('UPDATE clients SET coach=? WHERE id=?').bind(b.new_coach, id).run();
          updated++;
        }
        return ok({ updated }, cors);
      }

      // ── COACHES HUB ────────────────────────────────────────────────
      if (url.pathname === '/coaches/roster' && request.method === 'GET') {
        if (!env.DB) return bad('No DB', cors);
        const reps = await env.DB.prepare('SELECT name, role FROM pt_reps WHERE gym_id=1 AND active=1 ORDER BY name ASC').all();
        const rows = [];
        for (const rep of (reps.results || [])) {
          const count = await env.DB.prepare('SELECT COUNT(*) n FROM clients WHERE coach=?').bind(rep.name).first();
          rows.push({ name: rep.name, role: rep.role, client_count: count?.n || 0 });
        }
        return ok({ coaches: rows }, cors);
      }


      // ── DAILY INTAKE (structured check-in, not just a note) ─────────
      if (url.pathname === '/coach/intake' && request.method === 'POST') {
        if (!env.DB) return bad('No DB', cors);
        const b = await request.json();
        if (!b.client_id || !b.coach_name) return bad('client_id, coach_name required', cors);
        const ins = await env.DB.prepare(
          `INSERT INTO daily_intake_logs (client_id,coach_name,mood,diet_quality,physical_state,energy_level,notes)
           VALUES (?,?,?,?,?,?,?)`
        ).bind(b.client_id, b.coach_name, b.mood||null, b.diet_quality||null, b.physical_state||null, b.energy_level||null, b.notes||'').run();
        return ok({ saved: true, id: ins.meta?.last_row_id }, cors);
      }

      // ── COACH RECOMMENDATION (client-visible guidance) ────────────
      if (url.pathname === '/coach/set-recommendation' && request.method === 'POST') {
        if (!env.DB) return bad('No DB', cors);
        const b = await request.json();
        if (!b.client_id || !b.text) return bad('client_id, text required', cors);
        await env.DB.prepare("UPDATE clients SET coach_recommendation=?, coach_recommendation_date=datetime('now'), coach_recommendation_by=? WHERE id=?")
          .bind(b.text, b.coach_name||'', b.client_id).run();
        return ok({ saved: true }, cors);
      }

      // ── COACH CRM PORTAL ──────────────────────────────────────────
      if (url.pathname === '/coach/clients' && request.method === 'GET') {
        if (!env.DB) return bad('No DB', cors);
        const coach = url.searchParams.get('coach');
        if (!coach) return bad('coach required', cors);
        const rows = await env.DB.prepare(
          `SELECT c.id, c.first_name, c.last_name, c.phone, c.email, c.status, c.goal_primary,
                  c.sessions_remaining, c.sessions_total, c.package_end_date,
                  (SELECT COUNT(*) FROM coach_touchpoints t WHERE t.client_id=c.id) AS touchpoint_count,
                  (SELECT MAX(created_at) FROM coach_touchpoints t WHERE t.client_id=c.id) AS last_touchpoint,
                  (SELECT COUNT(*) FROM portal_messages m WHERE m.client_id=c.id AND m.sender='client' AND m.read=0) AS unread_messages
           FROM clients c WHERE c.coach = ? ORDER BY c.last_name ASC`
        ).bind(coach).all();
        const clients = rows.results || [];

        const now = new Date();
        const since30 = new Date(now - 30*86400000).toISOString().slice(0,10);
        const since56 = new Date(now - 56*86400000).toISOString().slice(0,10);
        const since14 = new Date(now - 14*86400000).toISOString().slice(0,10);

        for (const c of clients) {
          // --- Workout completion: logged activity vs what's actually scheduled, last 30 days ---
          const scheduled = await env.DB.prepare(
            "SELECT COUNT(*) n FROM scheduled_sessions WHERE client_id=? AND scheduled_date>=? AND status='scheduled'"
          ).bind(c.id, since30).first();
          const loggedRows = await env.DB.prepare(
            `SELECT workout_date d FROM self_workouts WHERE client_id=? AND workout_date>=?
             UNION ALL SELECT session_date d FROM training_sessions WHERE client_id=? AND session_date>=?`
          ).bind(c.id, since56, c.id, since56).all();
          const loggedDates = (loggedRows.results || []).map(r => r.d);
          const logged30 = loggedDates.filter(d => d >= since30).length;
          c.workout_scheduled_30d = scheduled?.n || 0;
          c.workout_logged_30d = logged30;
          c.workout_completion_pct = c.workout_scheduled_30d > 0 ? Math.min(100, Math.round(100 * logged30 / c.workout_scheduled_30d)) : null;
          const weekCounts = new Array(8).fill(0);
          for (const d of loggedDates) {
            const diffDays = Math.floor((now - new Date(d + 'T00:00:00')) / 86400000);
            const weekIdx = 7 - Math.floor(diffDays / 7);
            if (weekIdx >= 0 && weekIdx < 8) weekCounts[weekIdx]++;
          }
          c.workout_weekly_series = weekCounts;

          // --- Macro adherence: daily logged meals (real 'meals' table from client-portal.html) vs meal_profiles target, last 14 days ---
          const mp = await env.DB.prepare('SELECT calories,protein_g,carbs_g,fat_g FROM meal_profiles WHERE client_id=? LIMIT 1').bind(c.id).first();
          const mealRows = await env.DB.prepare(
            'SELECT meal_date, calories, protein_g, carbs_g, fat_g FROM meals WHERE client_id=? AND meal_date>=? ORDER BY meal_date ASC'
          ).bind(c.id, since14).all();
          const dayTotals = {};
          for (const mr of (mealRows.results || [])) {
            const d = mr.meal_date;
            if (!dayTotals[d]) dayTotals[d] = { calories: 0, protein_g: 0, carbs_g: 0, fat_g: 0 };
            dayTotals[d].calories += Number(mr.calories) || 0;
            dayTotals[d].protein_g += Number(mr.protein_g) || 0;
            dayTotals[d].carbs_g += Number(mr.carbs_g) || 0;
            dayTotals[d].fat_g += Number(mr.fat_g) || 0;
          }
          const macroSeries = [];
          let sumPct = 0, cnt = 0;
          const pctFor = (actual, target) => target ? Math.max(0, 100 - Math.abs(actual - target) / target * 100) : null;
          for (const d of Object.keys(dayTotals).sort()) {
            if (!mp || !mp.calories) break;
            const t = dayTotals[d];
            const parts = [pctFor(t.calories, mp.calories), pctFor(t.protein_g, mp.protein_g), pctFor(t.carbs_g, mp.carbs_g), pctFor(t.fat_g, mp.fat_g)].filter(v => v != null);
            if (!parts.length) continue;
            const dayPct = Math.round(parts.reduce((a, b) => a + b, 0) / parts.length);
            macroSeries.push({ date: d, pct: dayPct });
            sumPct += dayPct; cnt++;
          }
          c.macro_avg_pct = cnt ? Math.round(sumPct / cnt) : null;
          c.macro_days_logged = cnt;
          c.macro_has_target = !!(mp && mp.calories);
          c.macro_series = macroSeries;
        }

        return ok({ clients }, cors);
      }

      if (url.pathname === '/coach/client-detail' && request.method === 'GET') {
        if (!env.DB) return bad('No DB', cors);
        const clientId = url.searchParams.get('client_id');
        if (!clientId) return bad('client_id required', cors);
        try {
          const [client, scans, sessions, selfWorkouts, photos, touchpoints, messages, notes, intake] = await Promise.all([
            env.DB.prepare('SELECT * FROM clients WHERE id=?').bind(clientId).first(),
            env.DB.prepare('SELECT * FROM inbody_scans WHERE client_id=? ORDER BY scan_date DESC LIMIT 24').bind(clientId).all(),
            env.DB.prepare('SELECT * FROM workouts WHERE client_id=? ORDER BY workout_date DESC LIMIT 30').bind(clientId).all(),
            env.DB.prepare('SELECT * FROM self_workouts WHERE client_id=? ORDER BY workout_date DESC LIMIT 30').bind(clientId).all(),
            env.DB.prepare('SELECT * FROM progress_photos WHERE client_id=? ORDER BY captured_at DESC LIMIT 60').bind(clientId).all(),
            env.DB.prepare('SELECT * FROM coach_touchpoints WHERE client_id=? ORDER BY created_at DESC LIMIT 50').bind(clientId).all(),
            env.DB.prepare('SELECT * FROM portal_messages WHERE client_id=? ORDER BY created_at ASC LIMIT 100').bind(clientId).all(),
            env.DB.prepare('SELECT * FROM coach_notes WHERE client_id=? ORDER BY created_at DESC LIMIT 100').bind(clientId).all().catch(() => ({results:[]})),
            env.DB.prepare('SELECT * FROM daily_intake_logs WHERE client_id=? ORDER BY created_at DESC LIMIT 100').bind(clientId).all().catch(() => ({results:[]}))
          ]);
          if (!client) return bad('No client found with id ' + clientId, cors);
          return ok({ client, scans: scans.results||[], sessions: sessions.results||[], selfWorkouts: selfWorkouts.results||[],
            photos: photos.results||[], touchpoints: touchpoints.results||[], messages: messages.results||[], notes: (notes&&notes.results)||[],
            intake: (intake&&intake.results)||[] }, cors);
        } catch (e) {
          return bad('client-detail query failed: ' + e.message, cors);
        }
      }

      if (url.pathname === '/coach/touchpoint' && request.method === 'POST') {
        if (!env.DB) return bad('No DB', cors);
        const b = await request.json();
        if (!b.client_id || !b.coach_name || !b.body) return bad('client_id, coach_name, body required', cors);
        const type = ['text','call','email','note'].includes(b.type) ? b.type : 'note';
        const ins = await env.DB.prepare('INSERT INTO coach_touchpoints (coach_name,client_id,type,body) VALUES (?,?,?,?)')
          .bind(b.coach_name, b.client_id, type, b.body).run();
        return ok({ logged: true, id: ins.meta?.last_row_id }, cors);
      }

      // ── PORTAL-TO-PORTAL CHAT ──────────────────────────────────────
      if (url.pathname === '/portal/messages' && request.method === 'GET') {
        if (!env.DB) return bad('No DB', cors);
        const clientId = url.searchParams.get('client_id');
        if (!clientId) return bad('client_id required', cors);
        const rows = await env.DB.prepare('SELECT * FROM portal_messages WHERE client_id=? ORDER BY created_at ASC LIMIT 200').bind(clientId).all();
        return ok({ messages: rows.results || [] }, cors);
      }

      if (url.pathname === '/portal/messages/send' && request.method === 'POST') {
        if (!env.DB) return bad('No DB', cors);
        const b = await request.json();
        if (!b.client_id || !b.sender || !b.body) return bad('client_id, sender, body required', cors);
        const sender = ['coach','client'].includes(b.sender) ? b.sender : 'client';
        const ins = await env.DB.prepare('INSERT INTO portal_messages (client_id,coach_name,sender,body) VALUES (?,?,?,?)')
          .bind(b.client_id, b.coach_name||null, sender, b.body).run();
        return ok({ sent: true, id: ins.meta?.last_row_id }, cors);
      }

      if (url.pathname === '/portal/messages/read' && request.method === 'POST') {
        if (!env.DB) return bad('No DB', cors);
        const b = await request.json();
        if (!b.client_id) return bad('client_id required', cors);
        await env.DB.prepare("UPDATE portal_messages SET read=1 WHERE client_id=? AND sender=?")
          .bind(b.client_id, b.mark_sender||'client').run();
        return ok({ done: true }, cors);
      }

      // ── KEELIN HELP REQUEST QUEUE ─────────────────────────────────
      if (url.pathname === '/help-requests' && request.method === 'GET') {
        if (!env.DB) return bad('No DB', cors);
        const status = url.searchParams.get('status') || 'open';
        const rows = await env.DB.prepare(
          status === 'all'
            ? 'SELECT h.*, g.name AS gym_name FROM help_requests h LEFT JOIN gyms g ON h.gym_id=g.id ORDER BY h.created_at DESC LIMIT 50'
            : 'SELECT h.*, g.name AS gym_name FROM help_requests h LEFT JOIN gyms g ON h.gym_id=g.id WHERE h.status=? ORDER BY h.created_at DESC LIMIT 50'
        ).bind(...(status === 'all' ? [] : [status])).all();
        return ok({ requests: rows.results || [] }, cors);
      }

      if (url.pathname === '/help-requests/resolve' && request.method === 'POST') {
        if (!env.DB) return bad('No DB', cors);
        const b = await request.json();
        if (!b.id) return bad('id required', cors);
        await env.DB.prepare("UPDATE help_requests SET status='resolved', resolved_at=datetime('now'), resolution_note=? WHERE id=?")
          .bind(b.note || null, b.id).run();
        return ok({ resolved: true }, cors);
      }


      if (url.pathname === '/reports/coach-service' && request.method === 'GET') {
        if (!env.DB) return bad('No DB', cors);
        const coach = url.searchParams.get('coach');
        const month = url.searchParams.get('month') || new Date().toISOString().slice(0,7);
        if (!coach) return bad('coach required', cors);
        const clients = (await env.DB.prepare('SELECT id,first_name,last_name FROM clients WHERE coach=?').bind(coach).all()).results || [];
        const rows = [];
        for (const c of clients) {
          const tp = await env.DB.prepare("SELECT COUNT(*) n, MAX(created_at) last FROM coach_touchpoints WHERE client_id=? AND substr(created_at,1,7)=?").bind(c.id, month).first();
          const msgs = await env.DB.prepare("SELECT COUNT(*) n FROM portal_messages WHERE client_id=? AND sender='coach' AND substr(created_at,1,7)=?").bind(c.id, month).first();
          rows.push({ client_id: c.id, name: ((c.first_name||'')+' '+(c.last_name||'')).trim(),
            touchpoints: tp?.n||0, last_touchpoint: tp?.last||null, coach_messages: msgs?.n||0,
            needs_attention: (tp?.n||0) === 0 && (msgs?.n||0) === 0 });
        }
        rows.sort((a,b) => (a.needs_attention===b.needs_attention) ? 0 : (a.needs_attention ? -1 : 1));
        const totalTouchpoints = rows.reduce((s,r)=>s+r.touchpoints,0);
        const flagged = rows.filter(r=>r.needs_attention).length;
        return ok({ coach, month, clients: rows, total_clients: rows.length, total_touchpoints: totalTouchpoints,
          avg_per_client: rows.length ? Math.round((totalTouchpoints/rows.length)*10)/10 : 0, flagged_count: flagged }, cors);
      }

      // ── KEELIN REPORT ENGINE ─────────────────────────────────────
      if (url.pathname === '/reports/funnel' && request.method === 'GET') {
        if (!env.DB) return bad('No DB', cors);
        const from = url.searchParams.get('from') || '2026-01-01';
        const to = url.searchParams.get('to') || new Date().toISOString().slice(0,10);
        const gymId = url.searchParams.get('gym_id');
        let q = "SELECT welcome_workout_outcome o, COUNT(*) n FROM members WHERE join_date >= ? AND join_date <= ?";
        const binds = [from, to];
        if (gymId) { q += " AND gym_id = ?"; binds.push(gymId); }
        q += " GROUP BY welcome_workout_outcome";
        const rows = (await env.DB.prepare(q).bind(...binds).all()).results || [];
        const c = {}; let total = 0;
        for (const r of rows) { c[r.o || 'blank'] = r.n; total += r.n; }
        const booked = (c['Appointment Set']||0) + (c['Attended']||0) + (c['Purchased PT']||0);
        const showed = (c['Attended']||0) + (c['Purchased PT']||0);
        const closed = c['Purchased PT']||0;
        return ok({ from, to, gym_id: gymId||null, total_joins: total, outcomes: c,
          booked, showed, closed,
          booked_pct: total ? Math.round(booked/total*100) : 0,
          show_pct: booked ? Math.round(showed/booked*100) : 0,
          close_pct: showed ? Math.round(closed/showed*100) : 0,
          open_loops: c['Appointment Set']||0, declined: c['Declined']||0, minors: c['Minor']||0, online: c['Online Join']||0 }, cors);
      }

      if (url.pathname === '/reports/aggregate' && request.method === 'POST') {
        if (!env.DB) return bad('No DB', cors);
        const b = await request.json();
        const SOURCES = {
          members: { table: 'members', date: 'join_date', dims: {
            club: 'gym_id', outcome: "COALESCE(NULLIF(welcome_workout_outcome,''),'(none)')",
            membership_type: "COALESCE(NULLIF(membership_type,''),'(none)')",
            month: "substr(join_date,1,7)", week: "strftime('%Y-W%W', join_date)" },
            measures: { count: 'COUNT(*)' } },
          pt_sales: { table: 'pt_sales', date: 'sale_date', dims: {
            club: 'gym_id', coach: "COALESCE(NULLIF(sold_by,''),'(none)')",
            package: "COALESCE(NULLIF(package_name,''),'(none)')",
            sale_type: "COALESCE(NULLIF(sale_type,''),'new')",
            month: "substr(sale_date,1,7)", week: "strftime('%Y-W%W', sale_date)" },
            measures: { count: 'COUNT(*)', total: 'COALESCE(SUM(amount),0)', average: 'ROUND(AVG(amount),2)' } },
          guest_shares: { table: 'guest_shares', date: "substr(shared_at,1,10)", dims: {
            month: "substr(shared_at,1,7)", channel: "COALESCE(channel,'(none)')" },
            measures: { count: 'COUNT(*)' } },
          coach_touchpoints: { table: 'coach_touchpoints', date: "substr(created_at,1,10)", dims: {
            coach: "COALESCE(NULLIF(coach_name,''),'(none)')",
            client: "client_id",
            type: "COALESCE(NULLIF(type,''),'note')",
            month: "substr(created_at,1,7)" },
            measures: { count: 'COUNT(*)' } }
        };
        const src = SOURCES[b.source];
        if (!src) return bad('invalid source', cors);
        const dim = src.dims[b.group_by];
        if (!dim) return bad('invalid group_by for source', cors);
        const meas = src.measures[b.measure || 'count'];
        if (!meas) return bad('invalid measure for source', cors);
        const from = b.from || '2026-01-01';
        const to = b.to || new Date().toISOString().slice(0,10);
        let q = `SELECT ${dim} AS dimension, ${meas} AS value FROM ${src.table} WHERE ${src.date} >= ? AND ${src.date} <= ?`;
        const binds = [from, to];
        if (b.gym_id && b.source !== 'guest_shares' && b.source !== 'coach_touchpoints') { q += ' AND gym_id = ?'; binds.push(b.gym_id); }
        q += ` GROUP BY dimension ORDER BY value DESC LIMIT 200`;
        const rows = (await env.DB.prepare(q).bind(...binds).all()).results || [];
        return ok({ source: b.source, group_by: b.group_by, measure: b.measure||'count', from, to, rows }, cors);
      }

      if (url.pathname === '/reports/email' && request.method === 'POST') {
        if (!env.DB) return bad('No DB', cors);
        if (!env.RESEND_KEY) return bad('RESEND_KEY not configured', cors);
        const b = await request.json();
        if (!b.to || !b.subject || !b.html) return bad('to, subject, html required', cors);
        const r = await fetch('https://api.resend.com/emails', {
          method: 'POST',
          headers: { 'Authorization': 'Bearer ' + env.RESEND_KEY, 'Content-Type': 'application/json' },
          body: JSON.stringify({ from: env.MAIL_FROM || 'onboarding@resend.dev', to: [b.to], subject: b.subject, html: b.html })
        });
        const d = await r.json();
        return ok({ sent: r.ok, id: d.id || null, error: r.ok ? null : (d.message || 'send failed') }, cors);
      }

      // ── BODY SHOPPE BOARD + CELEBRATION LOOP ─────────────────────
      if (url.pathname === '/sales/record' && request.method === 'POST') {
        if (!env.DB) return bad('No DB', cors);
        const b = await request.json();
        if (!b.gym_id || !b.amount || !b.sold_by) return bad('gym_id, amount, sold_by required', cors);
        const saleDate = b.sale_date || new Date().toISOString().slice(0,10);
        const saleType = ['new','renewal','upgrade'].includes(b.sale_type) ? b.sale_type : 'new';
        const ins = await env.DB.prepare('INSERT INTO pt_sales (gym_id,member_id,client_name,package_name,sessions,amount,sold_by,sale_date,sale_type) VALUES (?,?,?,?,?,?,?,?,?)')
          .bind(b.gym_id, b.member_id||null, b.client_name||'', b.package_name||'', b.sessions||null, b.amount, b.sold_by, saleDate, saleType).run();
        const saleId = ins.meta.last_row_id;
        const gym = await env.DB.prepare('SELECT name FROM gyms WHERE id=?').bind(b.gym_id).first();
        const gymName = gym?.name?.replace('Retro Fitness ','') || 'Gym ' + b.gym_id;
        const amt = Number(b.amount).toLocaleString('en-US', {minimumFractionDigits: 0});
        const typeTag = saleType === 'renewal' ? ' (renewal)' : saleType === 'upgrade' ? ' (upgrade)' : '';
        const winBody = '\uD83C\uDF89 ' + gymName + ' closed a ' + (b.package_name || 'PT package') + typeTag + ', $' + amt + ', ' + b.sold_by;
        await env.DB.prepare('INSERT INTO huddle_messages (channel,gym_id,author,body,thread_ref) VALUES (?,?,?,?,?)')
          .bind('wins', b.gym_id, 'system', winBody, 'sale:' + saleId).run();
        await env.DB.prepare('INSERT INTO notifications (recipient,type,payload_json) VALUES (?,?,?)')
          .bind('keelin', 'pt_sale', JSON.stringify({sale_id: saleId, gym: gymName, gym_id: b.gym_id, amount: b.amount, seller: b.sold_by, package: b.package_name||'', client: b.client_name||'', date: saleDate})).run();
        return ok({ sale_id: saleId, thread_ref: 'sale:' + saleId, posted: true }, cors);
      }

      if (url.pathname === '/board/set-goal' && request.method === 'POST') {
        if (!env.DB) return bad('No DB', cors);
        const b = await request.json();
        if (!b.gym_id || !b.month || b.tcv_goal == null) return bad('gym_id, month, tcv_goal required', cors);
        await env.DB.prepare('INSERT INTO gym_quotas (gym_id,month,tcv_goal) VALUES (?,?,?) ON CONFLICT(gym_id,month) DO UPDATE SET tcv_goal=excluded.tcv_goal')
          .bind(b.gym_id, b.month, b.tcv_goal).run();
        return ok({ saved: true }, cors);
      }

      if (url.pathname === '/board/set-note' && request.method === 'POST') {
        if (!env.DB) return bad('No DB', cors);
        const b = await request.json();
        if (!b.gym_id || !b.month) return bad('gym_id, month required', cors);
        await env.DB.prepare("INSERT INTO board_notes (gym_id,month,note,emoji,author,updated_at) VALUES (?,?,?,?,?,datetime('now')) ON CONFLICT(gym_id,month) DO UPDATE SET note=excluded.note, emoji=excluded.emoji, author=excluded.author, updated_at=datetime('now')")
          .bind(b.gym_id, b.month, b.note||'', b.emoji||'', b.author||'Keelin').run();
        return ok({ saved: true }, cors);
      }

      if (url.pathname === '/notifications' && request.method === 'GET') {
        if (!env.DB) return bad('No DB', cors);
        const rec = url.searchParams.get('recipient') || 'keelin';
        const rows = await env.DB.prepare('SELECT * FROM notifications WHERE recipient=? ORDER BY id DESC LIMIT 25').bind(rec).all();
        const unread = await env.DB.prepare('SELECT COUNT(*) n FROM notifications WHERE recipient=? AND read=0').bind(rec).first();
        return ok({ notifications: rows.results||[], unread: unread?.n||0 }, cors);
      }

      if (url.pathname === '/notifications/read' && request.method === 'POST') {
        if (!env.DB) return bad('No DB', cors);
        const b = await request.json();
        if (b.id) await env.DB.prepare('UPDATE notifications SET read=1 WHERE id=?').bind(b.id).run();
        else await env.DB.prepare('UPDATE notifications SET read=1 WHERE recipient=?').bind(b.recipient||'keelin').run();
        return ok({ done: true }, cors);
      }

      if (url.pathname === '/huddle/feed' && request.method === 'GET') {
        if (!env.DB) return bad('No DB', cors);
        const channel = url.searchParams.get('channel') || 'wins';
        const thread = url.searchParams.get('thread_ref');
        const includeDemo = url.searchParams.get('demo') === '1';
        const limit = Math.min(parseInt(url.searchParams.get('limit') || '40', 10) || 40, 500);
        let rows;
        if (thread) rows = await env.DB.prepare('SELECT * FROM huddle_messages WHERE thread_ref=? ORDER BY id ASC').bind(thread).all();
        else if (includeDemo) rows = await env.DB.prepare(`SELECT * FROM huddle_messages WHERE channel=? ORDER BY id DESC LIMIT ${limit}`).bind(channel).all();
        else rows = await env.DB.prepare(`SELECT h.* FROM huddle_messages h LEFT JOIN gyms g ON h.gym_id=g.id WHERE h.channel=? AND (h.gym_id IS NULL OR COALESCE(g.is_demo,0)=0) ORDER BY h.id DESC LIMIT ${limit}`).bind(channel).all();
        return ok({ messages: rows.results||[] }, cors);
      }

      if (url.pathname === '/huddle/post' && request.method === 'POST') {
        if (!env.DB) return bad('No DB', cors);
        const b = await request.json();
        if (!b.author || !b.body) return bad('author, body required', cors);
        await env.DB.prepare('INSERT INTO huddle_messages (channel,gym_id,author,body,thread_ref) VALUES (?,?,?,?,?)')
          .bind(b.channel||'wins', b.gym_id||null, b.author, b.body, b.thread_ref||'').run();
        // Parse @mentions and notify the mentioned staff member.
        const mentionMatches = (b.body.match(/@([A-Za-z]+(?:\s[A-Za-z]+)?)/g) || []).map(m => m.slice(1).trim());
        if (mentionMatches.length) {
          const roster = await env.DB.prepare('SELECT id, name FROM staff_roster WHERE active=1').all();
          const staffList = roster.results || [];
          const now = new Date().toISOString();
          for (const mention of mentionMatches) {
            const matched = staffList.find(s => s.name.toLowerCase() === mention.toLowerCase() || s.name.toLowerCase().startsWith(mention.toLowerCase() + ' ') || s.name.toLowerCase().split(' ')[0] === mention.toLowerCase());
            if (matched) {
              await env.DB.prepare('INSERT INTO notifications (recipient,type,payload_json,created_at) VALUES (?,?,?,?)')
                .bind('staff:' + matched.id, 'mention', JSON.stringify({ author: b.author, body: b.body, message: b.author + ' mentioned you: ' + b.body }), now).run();
            }
          }
        }
        return ok({ posted: true }, cors);
      }

      // ── CLUB PARTNERS + GUEST REFERRAL ───────────────────────────
      if (url.pathname === '/portal/partners' && request.method === 'GET') {
        if (!env.DB) return bad('No DB', cors);
        const res = await env.DB.prepare('SELECT id,name,blurb,offer,promo_code,link_url,logo_url FROM partners WHERE active=1 ORDER BY sort_order,id').all();
        return ok({ partners: res.results || [] }, cors);
      }

      if (url.pathname === '/portal/partner-tap' && request.method === 'POST') {
        if (!env.DB) return bad('No DB', cors);
        const body = await request.json();
        if (!body.partner_id) return bad('partner_id required', cors);
        await env.DB.prepare('INSERT INTO partner_taps (partner_id,client_id,tapped_at) VALUES (?,?,?)')
          .bind(body.partner_id, body.client_id||null, new Date().toISOString()).run();
        return ok({ logged: true }, cors);
      }

      if (url.pathname === '/portal/guest-share' && request.method === 'POST') {
        if (!env.DB) return bad('No DB', cors);
        const body = await request.json();
        await env.DB.prepare('INSERT INTO guest_shares (client_id,channel,shared_at) VALUES (?,?,?)')
          .bind(body.client_id||null, body.channel||'share_sheet', new Date().toISOString()).run();
        return ok({ logged: true }, cors);
      }

      if (url.pathname === '/portal/log-day' && request.method === 'POST') {
        if (!env.DB) return bad('No DB', cors);
        const body = await request.json();
        if (!body.client_id) return bad('client_id required', cors);
        const logDate = body.log_date || new Date().toISOString().slice(0,10);
        const existing = await env.DB.prepare('SELECT * FROM daily_logs WHERE client_id=? AND log_date=?').bind(body.client_id, logDate).first();
        const merged = {
          energy: body.energy !== undefined ? body.energy : (existing ? existing.energy : null),
          nutrition_score: body.nutrition !== undefined ? body.nutrition : (existing ? existing.nutrition_score : null),
          hydration: body.hydration !== undefined ? body.hydration : (existing ? existing.hydration : null),
          sleep_hours: body.sleep !== undefined ? body.sleep : (existing ? existing.sleep_hours : null),
          steps: body.steps !== undefined ? body.steps : (existing ? existing.steps : null),
          wins: body.wins !== undefined ? body.wins : (existing ? existing.wins : ''),
          notes: body.notes !== undefined ? body.notes : (existing ? existing.notes : '')
        };
        await env.DB.prepare('INSERT OR REPLACE INTO daily_logs (client_id,log_date,energy,nutrition_score,hydration,sleep_hours,steps,wins,notes) VALUES (?,?,?,?,?,?,?,?,?)')
          .bind(body.client_id, logDate, merged.energy||null, merged.nutrition_score||null, merged.hydration||null, merged.sleep_hours||null, merged.steps||null, merged.wins||'', merged.notes||'').run();
        return ok({ logged: true }, cors);
      }

      if (url.pathname === '/sheets-write' || url.pathname === '/sheets-read') {
        const body = await request.text();
        const r = await fetch(APPS_SCRIPT, { method:'POST', headers:{'Content-Type':'text/plain'}, body, redirect:'follow' });
        return new Response((await r.text()) || '{"ok":true}', { status:200, headers:cors });
      }

      if (url.pathname === '/eod/generate' && request.method === 'POST') {
        if (!env.DB) return bad('D1 binding "DB" not found.', cors);
        if (!env.ANTHROPIC_KEY) return bad('ANTHROPIC_KEY not set.', cors);
        const body = await request.json().catch(() => ({}));
        const dateStr = body.date || new Date().toISOString().slice(0,10);
        const result = await generateEODReport(env, dateStr);
        return ok(result, cors);
      }

      if (url.pathname === '/eod/list' && request.method === 'GET') {
        if (!env.DB) return bad('No DB', cors);
        const limit = Math.min(parseInt(url.searchParams.get('limit')||'30',10), 90);
        const res = await env.DB.prepare('SELECT * FROM eod_reports ORDER BY report_date DESC LIMIT ?').bind(limit).all();
        return ok({ reports: res.results||[] }, cors);
      }

      // ── EOD SUBMIT (Sarah, Ted, coaches, Dani) ──────────────────
      if (url.pathname === '/eod/submit' && request.method === 'POST') {
        if (!env.DB) return bad('No DB', cors);
        const body = await request.json().catch(() => ({}));
        const logDate = body.date || new Date().toISOString().slice(0,10);
        const authorName = body.authorName || 'Unknown';
        const authorRole = body.author_role || 'staff';
        const gymId = body.gym_id || 1;

        // Insert main submission record
        const subRes = await env.DB.prepare(
          `INSERT INTO eod_submissions (gym_id,author_name,author_role,log_date,notable_wins,areas_improvement,game_plan,additional_notes,priority_flags_json,status,submitted_at,ww_json,sales_json,reflect_positive,reflect_improve,ask_keelin)
           VALUES (?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?)`
        ).bind(
          gymId, authorName, authorRole, logDate,
          body.notable_wins||null, body.reflect_improve||body.areas_improvement||null,
          body.game_plan||null, body.sarahNotes||body.additional_notes||null,
          body.notes ? JSON.stringify(body.notes) : null,
          'submitted', new Date().toISOString(),
          body.ww ? JSON.stringify(body.ww) : null,
          body.sales ? JSON.stringify(body.sales) : null,
          body.reflect_positive||null, body.reflect_improve||null, body.ask_keelin||null
        ).run();
        const subId = subRes.meta?.last_row_id;

        // Sale type counts feed straight into pt_sales-style reporting via kpi_snapshots already below;
        // Ask Keelin -> help request queue
        if (body.ask_keelin && body.ask_keelin.trim()) {
          await env.DB.prepare(
            `INSERT INTO help_requests (gym_id,eod_id,author_name,request_text,status,created_at) VALUES (?,?,?,?,?,?)`
          ).bind(gymId, subId, authorName, body.ask_keelin.trim(), 'open', new Date().toISOString()).run();
        }

        // KPI snapshot
        if (body.kpi && Object.values(body.kpi).some(v => v)) {
          const k = body.kpi;
          await env.DB.prepare(
            `INSERT INTO kpi_snapshots (gym_id,snapshot_date,new_members,cancels,pt_revenue,dpc,waiver_pct,closing_pct,active_members,membership_goal,entered_by,created_at)
             VALUES (?,?,?,?,?,?,?,?,?,?,?,?)`
          ).bind(
            gymId, logDate,
            parseInt(k.new_members)||null, parseInt(k.cancels)||null,
            k.pt_revenue||null, k.dpc||null,
            parseFloat(k.waiver_pct)||null, parseFloat(k.closing_pct)||null,
            parseInt(k.active_members)||null, parseInt(k.membership_goal)||null,
            authorName, new Date().toISOString()
          ).run();
        }

        // Shake count
        if (body.shake && body.shake.open) {
          await env.DB.prepare(
            `INSERT INTO shake_counts (gym_id,count_date,opening_count,closing_count,daily_total,entered_by,created_at) VALUES (?,?,?,?,?,?,?)`
          ).bind(
            gymId, logDate,
            parseInt(body.shake.open)||null, parseInt(body.shake.close)||null,
            parseInt(body.shake.total)||null, authorName, new Date().toISOString()
          ).run();
        }

        // Priority flags as action items
        if (body.notes && Array.isArray(body.notes)) {
          for (const n of body.notes) {
            if (!n.text) continue;
            await env.DB.prepare(
              `INSERT INTO action_items (gym_id,created_by,title,priority,status,visible_to,source_log_id,created_at)
               VALUES (?,?,?,?,?,?,?,?)`
            ).bind(
              gymId, authorName, n.text, n.priority || 'fyi',
              'open', n.priority === 'escalate' ? 'keelin' : 'dani',
              subId, new Date().toISOString()
            ).run();
          }
        }

        // Staff performance rows
        if (body.mea_rows && Array.isArray(body.mea_rows)) {
          const weekOf = logDate.slice(0,10);
          for (const row of body.mea_rows) {
            if (!row[0]) continue;
            await env.DB.prepare(
              `INSERT INTO staff_performance (gym_id,week_of,employee_name,role,closing_pct,booking_pct,show_pct,performance_status,entered_by,created_at)
               VALUES (?,?,?,?,?,?,?,?,?,?)`
            ).bind(
              gymId, weekOf, row[0], 'MEA',
              parseFloat(row[1])||null, parseFloat(row[3])||null, parseFloat(row[5])||null,
              row[6]||null, authorName, new Date().toISOString()
            ).run();
          }
        }

        // Maintenance items
        if (body.maint_rows && Array.isArray(body.maint_rows)) {
          for (const row of body.maint_rows) {
            if (!row[0]) continue;
            await env.DB.prepare(
              `INSERT INTO maintenance_log (gym_id,reported_date,item,status,notes,entered_by,created_at)
               VALUES (?,?,?,?,?,?,?)`
            ).bind(gymId, row[1]||logDate, row[0], row[2]||'OPEN', row[3]||null, authorName, new Date().toISOString())
            .run();
          }
        }

        // Schedule changes
        if (body.sched_rows && Array.isArray(body.sched_rows)) {
          for (const row of body.sched_rows) {
            if (!row[1] && !row[2]) continue;
            await env.DB.prepare(
              `INSERT INTO schedule_changes (gym_id,log_date,change_date,original_employee,coverage_employee,shift_time,reason,entered_by,created_at)
               VALUES (?,?,?,?,?,?,?,?,?)`
            ).bind(gymId, logDate, row[0]||null, row[1]||null, row[2]||null, row[3]||null, row[4]||null, authorName, new Date().toISOString())
            .run();
          }
        }

        return ok({ ok: true, id: subId, date: logDate, author: authorName }, cors);
      }

      // ── EOD FEED (Dani / Keelin dashboard) ─────────────────────
      if (url.pathname === '/eod/feed' && request.method === 'GET') {
        if (!env.DB) return bad('No DB', cors);
        const feedDate = url.searchParams.get('date') || new Date().toISOString().slice(0,10);
        const gymId = url.searchParams.get('gym_id') || null;
        let sql = `SELECT * FROM eod_submissions WHERE log_date=? ORDER BY submitted_at DESC`;
        const binds = [feedDate];
        if (gymId) { sql = `SELECT * FROM eod_submissions WHERE log_date=? AND gym_id=? ORDER BY submitted_at DESC`; binds.push(gymId); }
        const subs = await env.DB.prepare(sql).bind(...binds).all();
        const flags = await env.DB.prepare(
          `SELECT * FROM action_items WHERE created_at >= ? ORDER BY priority DESC, created_at DESC LIMIT 50`
        ).bind(feedDate + 'T00:00:00').all();
        return ok({ submissions: subs.results||[], action_items: flags.results||[] }, cors);
      }

      if (request.method !== 'POST') return ok({}, cors);
      const payload = JSON.parse(await request.text());
      const r = await fetch('https://api.anthropic.com/v1/messages', {
        method:'POST',
        headers:{'Content-Type':'application/json','x-api-key':env.ANTHROPIC_KEY||'','anthropic-version':'2023-06-01'},
        body: JSON.stringify(payload)
      });
      return new Response(await r.text(), { status:r.status, headers:cors });

    } catch (e) {
      return bad(e.message, cors);
    }
  },

  // ── CRON TRIGGERS ──────────────────────────────────────────────
  // Wire these up in the Cloudflare dashboard under Worker Settings ->
  // Triggers -> Cron Triggers. Add BOTH of the following as separate
  // triggers (Cloudflare supports multiple per Worker):
  //   1. "0 1 * * *"  -> nightly at 1am UTC (9pm ET) -> EOD report
  //   2. "0 11 * * 1" -> Monday at 11am UTC (7am ET) -> weekly meal plans
  //      for every Complete/Complete+ client, ready before the day starts.
  //      Adjust the hour for daylight saving as needed.
  async scheduled(event, env, ctx) {
    if (event.cron === '0 11 * * 1') {
      ctx.waitUntil(generateMealPlans(env, { skipExisting: true, activeOnly: true }));
      return;
    }
    const today = new Date().toISOString().slice(0,10);
    ctx.waitUntil(generateEODReport(env, today));
    ctx.waitUntil(populateDailyFeedItems(env, today));
    ctx.waitUntil(detectAutoWins(env));
  }
};

// ---------------- End of Day Report generator ----------------
// Pulls the day's consultations, follow-ups, and monthly check-ins.
// If the day is empty, no report is written, exactly as requested,
// no blank clutter in the log. If there is real activity, AI writes
// a plain-language recap and it is saved once, keyed by report_date.
// ---------------- Daily feed auto-population ----------------
// Runs nightly via cron (piggybacking the existing EOD trigger) so
// birthdays, staff work anniversaries, and client gym anniversaries
// post themselves to the Community & Industry News feed with zero
// ongoing admin effort. Also callable on demand via /feed/run-auto-scan
// for testing or to catch up after adding new birthday/hire/start dates.
async function populateDailyFeedItems(env, dateStr) {
  const mmdd = dateStr.slice(5,10);
  const year = parseInt(dateStr.slice(0,4), 10);
  let created = 0;

  async function alreadyPosted(category, refId, dateStr) {
    const row = await env.DB.prepare(
      "SELECT id FROM feed_posts WHERE category=? AND created_by='system' AND title LIKE ? AND substr(created_at,1,10)=?"
    ).bind(category, '%#'+refId+'%', dateStr).first();
    return !!row;
  }

  // Client birthdays
  const clientBdays = await env.DB.prepare(
    "SELECT id, first_name, last_name FROM clients WHERE birthday IS NOT NULL AND substr(birthday,6,5)=?"
  ).bind(mmdd).all();
  for (const c of (clientBdays.results||[])) {
    if (await alreadyPosted('birthday', c.id, dateStr)) continue;
    const name = ((c.first_name||'')+' '+(c.last_name||'')).trim();
    await env.DB.prepare('INSERT INTO feed_posts (category,title,body,pinned,created_by,created_at) VALUES (?,?,?,1,?,?)')
      .bind('birthday', name+"'s Birthday #"+c.id, 'Wish them a happy birthday next time you see them!', 'system', new Date().toISOString()).run();
    created++;
  }

  // Staff birthdays
  const staffBdays = await env.DB.prepare(
    "SELECT id, name FROM staff_roster WHERE birthday IS NOT NULL AND substr(birthday,6,5)=? AND active=1"
  ).bind(mmdd).all();
  for (const s of (staffBdays.results||[])) {
    if (await alreadyPosted('birthday', 's'+s.id, dateStr)) continue;
    await env.DB.prepare('INSERT INTO feed_posts (category,title,body,pinned,created_by,created_at) VALUES (?,?,?,1,?,?)')
      .bind('birthday', s.name+"'s Birthday #s"+s.id, 'Wish them a happy birthday today!', 'system', new Date().toISOString()).run();
    created++;
  }

  // Staff work anniversaries (from hire_date)
  const staffAnniv = await env.DB.prepare(
    "SELECT id, name, hire_date FROM staff_roster WHERE hire_date IS NOT NULL AND substr(hire_date,6,5)=? AND active=1"
  ).bind(mmdd).all();
  for (const s of (staffAnniv.results||[])) {
    const years = year - parseInt(String(s.hire_date).slice(0,4),10);
    if (years <= 0) continue;
    if (await alreadyPosted('anniversary', 'sa'+s.id, dateStr)) continue;
    await env.DB.prepare('INSERT INTO feed_posts (category,title,body,pinned,created_by,created_at) VALUES (?,?,?,1,?,?)')
      .bind('anniversary', s.name+"'s Work Anniversary #sa"+s.id, 'Celebrating '+years+' year'+(years===1?'':'s')+' with Retro Fitness today!', 'system', new Date().toISOString()).run();
    created++;
  }

  // Client gym membership anniversaries (from training_start_date)
  const clientAnniv = await env.DB.prepare(
    "SELECT id, first_name, last_name, training_start_date FROM clients WHERE training_start_date IS NOT NULL AND substr(training_start_date,6,5)=?"
  ).bind(mmdd).all();
  for (const c of (clientAnniv.results||[])) {
    const years = year - parseInt(String(c.training_start_date).slice(0,4),10);
    if (years <= 0) continue;
    if (await alreadyPosted('anniversary', 'ca'+c.id, dateStr)) continue;
    const name = ((c.first_name||'')+' '+(c.last_name||'')).trim();
    await env.DB.prepare('INSERT INTO feed_posts (category,title,body,pinned,created_by,created_at) VALUES (?,?,?,1,?,?)')
      .bind('anniversary', name+"'s Member Anniversary #ca"+c.id, 'Celebrating '+years+' year'+(years===1?'':'s')+' training with us today!', 'system', new Date().toISOString()).run();
    created++;
  }

  return { created };
}

async function generateEODReport(env, dateStr) {
  const [consults, checkins, followups, clients] = await Promise.all([
    env.DB.prepare('SELECT * FROM consultations WHERE consult_date=?').bind(dateStr).all(),
    env.DB.prepare('SELECT * FROM checkins WHERE checkin_date=?').bind(dateStr).all(),
    env.DB.prepare('SELECT * FROM followups WHERE followup_date=?').bind(dateStr).all(),
    env.DB.prepare('SELECT id,first_name,last_name FROM clients').all()
  ]);

  const consultRows = consults.results || [];
  const checkinRows = checkins.results || [];
  const followupRows = followups.results || [];
  const total = consultRows.length + checkinRows.length + followupRows.length;

  if (total === 0) {
    return { generated: false, reason: 'No activity for this date, no report needed.', date: dateStr };
  }

  const clientMap = {};
  (clients.results || []).forEach(c => clientMap[c.id] = ((c.first_name||'')+' '+(c.last_name||'')).trim() || 'Unknown');

  const dateLabel = new Date(dateStr + 'T12:00:00').toLocaleDateString('en-US', { weekday:'long', month:'long', day:'numeric', year:'numeric' });

  function detectOutcome(c) {
    const notes = (c.notes || '').toLowerCase();
    const source = c.source || '';
    if (notes.includes('no show') || notes.includes('no-show')) return 'no-show';
    if (notes.includes('cancel')) return 'cancelled';
    if (notes.includes('declined') || source.includes('decline')) return 'declined PT';
    if (notes.includes('package') || notes.includes('enrolled') || notes.includes('accepted')) return 'enrolled';
    return 'consultation completed';
  }

  const items = [];
  consultRows.forEach(c => items.push({
    type: 'consultation',
    name: clientMap[c.client_id] || 'Unknown',
    outcome: detectOutcome(c),
    notes: c.notes || ''
  }));
  followupRows.forEach(f => items.push({
    type: 'followup',
    name: clientMap[f.client_id] || 'Unknown',
    outcome: 'follow-up appointment',
    notes: (f.reason || '') + ' ' + (f.notes || '')
  }));
  checkinRows.forEach(ck => items.push({
    type: 'checkin',
    name: clientMap[ck.client_id] || 'Unknown',
    outcome: 'monthly review',
    notes: 'Weight: ' + (ck.now_weight||'—') + ' lb, BF: ' + (ck.now_body_fat_pct||'—') + '%. ' + (ck.coach_notes||'')
  }));

  const prompt = `You are writing a brief end-of-day PT summary from Coach Ted Scholl at Retro Fitness of Fairless Hills for the corporate fitness director, Keelin. The tone should be professional but not stiff, this is a gym, not a boardroom. Write like you're giving a smart, confident verbal update at the end of the day. Use plain language, proper punctuation, complete sentences. No bullet points, no markdown, no asterisks, no emojis. Paragraph breaks between sections.

Date: ${dateLabel}
Location: Retro Fitness of Fairless Hills, 516 Lincoln Hwy, Fairless Hills, PA
Advisor: Coach Ted Scholl

Day's activity:

${items.map(it => `TYPE: ${it.type.toUpperCase()}\nCLIENT: ${it.name}\nOUTCOME: ${it.outcome}\nNOTES: ${it.notes}`).join('\n\n')}

RULES:
- Lead with wins. If anyone signed up, mention it first, make it feel like a win.
- For no-shows or cancellations, always state clearly that a reschedule reminder has been added in the scheduling system at the front desk.
- For declines, mention the reason if known. Be matter-of-fact, not defeated.
- For follow-ups, say whether they converted, are still deciding, or were rescheduled.
- For monthly reviews, give a one-sentence progress highlight.
- Close with one sentence on overall momentum.
- 250-400 words total.
- Sign off: Coach Ted Scholl, Retro Fitness of Fairless Hills

Structure as natural paragraphs (not headers): overview, new enrollments (if any), follow-ups (if any), monthly reviews (if any), declines (if any), no-shows/cancellations (if any), closing thought.`;

  const aiResp = await fetch('https://api.anthropic.com/v1/messages', {
    method: 'POST',
    headers: { 'Content-Type':'application/json','x-api-key':env.ANTHROPIC_KEY,'anthropic-version':'2023-06-01' },
    body: JSON.stringify({ model:'claude-sonnet-4-6', max_tokens:1000, messages:[{role:'user',content:prompt}] })
  });
  const aiData = await aiResp.json();
  const content = (aiData.content||[]).filter(b=>b.type==='text').map(b=>b.text||'').join('').trim();
  if (!content) return { generated: false, reason: 'AI returned no content.', date: dateStr };

  const existing = await env.DB.prepare('SELECT id FROM eod_reports WHERE report_date=?').bind(dateStr).first();
  if (existing) {
    await env.DB.prepare('UPDATE eod_reports SET content=?, generated_at=? WHERE id=?')
      .bind(content, new Date().toISOString(), existing.id).run();
    return { generated: true, updated: true, date: dateStr, id: existing.id, content };
  } else {
    const ins = await env.DB.prepare('INSERT INTO eod_reports (report_date,content,generated_at) VALUES (?,?,?)')
      .bind(dateStr, content, new Date().toISOString()).run();
    return { generated: true, updated: false, date: dateStr, id: ins.meta?.last_row_id, content };
  }
}

// ---------------- HARVESTER ----------------
async function runHarvest(opt, env, cors) {
  const limit = Math.min(parseInt(opt.limit, 10) || 20, 100);
  const onlyCategory = opt.category || null;
  const queries = HARVEST_QUERIES.filter(q => !onlyCategory || q.category === onlyCategory);

  // Gym-aware: if a gym_id is provided, harvest around that gym's real
  // location and build search queries using its actual address. Falls
  // back to Fairless Hills PA if no gym_id is given.
  let lat = GYM_LAT, lon = GYM_LON, gymId = opt.gym_id || null, locationLabel = 'Fairless Hills PA';
  if (gymId) {
    const gym = await env.DB.prepare('SELECT name, address, lat, lon FROM gyms WHERE id=?').bind(gymId).first();
    if (gym) {
      if (gym.lat != null && gym.lon != null) { lat = gym.lat; lon = gym.lon; }
      locationLabel = gym.address || gym.name || locationLabel;
    }
  }

  const sourceId = await getOrCreateSource(env, 'Google Maps Harvest', 'corporate');
  let found = 0, inserted = 0, dupes = 0, tooFar = 0, noGeo = 0;
  const perQuery = [];
  for (const q of queries) {
    const queryText = q.queryTpl.replace('{LOC}', locationLabel);
    const places = await outscraperSearch(queryText, limit, env.OUTSCRAPER_KEY);
    let qIns = 0;
    for (const p of places) {
      found++;
      const plat = num(p.latitude), plon = num(p.longitude);
      if (plat == null || plon == null) { noGeo++; continue; }
      const dist = haversineMi(lat, lon, plat, plon);
      if (dist > RADIUS_MI) { tooFar++; continue; }
      const name = (p.name || '').trim();
      const phone = (p.phone || '').trim();
      if (!name) continue;
      if (await leadExists(env, name, phone)) { dupes++; continue; }
      await env.DB.prepare(
        `INSERT INTO leads (lead_type,business_name,email,phone,address,city,state,zip,category,distance_mi,source_id,status,gym_id)
         VALUES (?,?,?,?,?,?,?,?,?,?,?, 'new', ?)`
      ).bind(
        q.lead_type, name, (p.email_1 || p.email || ''), phone,
        p.full_address || '', p.city || '', p.us_state || p.state || '', p.postal_code || '',
        q.category, Math.round(dist * 10) / 10, sourceId, gymId
      ).run();
      inserted++; qIns++;
    }
    perQuery.push({ query: q.query, returned: places.length, inserted: qIns });
  }
  return ok({ summary: { queries: queries.length, found, inserted, skipped_dupe: dupes, skipped_far: tooFar, skipped_nogeo: noGeo }, perQuery }, cors);
}

async function outscraperSearch(query, limit, key) {
  const u = `${OUTSCRAPER_BASE}?query=${encodeURIComponent(query)}&limit=${limit}&async=false`;
  const r = await fetch(u, { headers: { 'X-API-KEY': key } });
  const j = await r.json().catch(() => ({}));
  let d = j.data || j.results || [];
  if (Array.isArray(d) && Array.isArray(d[0])) d = d[0];
  return Array.isArray(d) ? d : [];
}

async function leadExists(env, name, phone) {
  if (phone) {
    const r = await env.DB.prepare(`SELECT id FROM leads WHERE phone=? LIMIT 1`).bind(phone).first();
    if (r) return true;
  }
  const r2 = await env.DB.prepare(`SELECT id FROM leads WHERE business_name=? LIMIT 1`).bind(name).first();
  return !!r2;
}

async function getOrCreateSource(env, name, type) {
  const ex = await env.DB.prepare(`SELECT id FROM lead_sources WHERE name=? LIMIT 1`).bind(name).first();
  if (ex) return ex.id;
  const r = await env.DB.prepare(`INSERT INTO lead_sources (name,type) VALUES (?,?)`).bind(name, type).run();
  return r.meta?.last_row_id;
}

function num(v){ const n = parseFloat(v); return Number.isFinite(n) ? n : null; }
function haversineMi(la1, lo1, la2, lo2){
  const R = 3958.8, dLa = (la2-la1)*Math.PI/180, dLo = (lo2-lo1)*Math.PI/180;
  const a = Math.sin(dLa/2)**2 + Math.cos(la1*Math.PI/180)*Math.cos(la2*Math.PI/180)*Math.sin(dLo/2)**2;
  return R * 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1-a));
}

// ---------------- Regional dashboard (Keelin, Regional Director) ----------------

// All gyms, this month's goal vs actual, percent to goal. This is the
// live version of the whiteboard, every gym, ranked, with a real
// quota number behind it instead of dry-erase marker.
async function getRegionSummary(env, month, includeDemo){
  const gyms = await env.DB.prepare(includeDemo ? 'SELECT * FROM gyms WHERE active=1 ORDER BY name ASC' : 'SELECT * FROM gyms WHERE active=1 AND COALESCE(is_demo,0)=0 ORDER BY name ASC').all();
  const rows = [];
  let totalGoal = 0, totalActual = 0;
  for (const gym of (gyms.results||[])) {
    const quota = await env.DB.prepare('SELECT tcv_goal FROM gym_quotas WHERE gym_id=? AND month=?').bind(gym.id, month).first();
    const sales = await env.DB.prepare("SELECT COALESCE(SUM(amount),0) total, COUNT(*) n FROM pt_sales WHERE gym_id=? AND substr(sale_date,1,7)=?").bind(gym.id, month).first();
    const note = await env.DB.prepare('SELECT note, emoji, updated_at FROM board_notes WHERE gym_id=? AND month=?').bind(gym.id, month).first();
    const goal = (quota && quota.tcv_goal) || 0;
    const actual = (sales && sales.total) || 0;
    const pct = goal > 0 ? Math.round((actual/goal)*100) : null;
    totalGoal += goal; totalActual += actual;
    rows.push({ gym_id: gym.id, name: gym.name, city: gym.city, director: gym.director, goal, actual, pct,
      sale_count: sales?.n || 0, note: note?.note || '', emoji: note?.emoji || '', note_updated: note?.updated_at || null,
      safe_zone: pct != null && pct >= 90 });
  }
  rows.sort((a,b) => (b.pct||0) - (a.pct||0));
  return { month, gyms: rows, region_goal: totalGoal, region_actual: totalActual,
    region_pct: totalGoal>0 ? Math.round((totalActual/totalGoal)*100) : null };
}

async function getGymDetail(env, gymId, month){
  const gym = await env.DB.prepare('SELECT * FROM gyms WHERE id=?').bind(gymId).first();
  const reps = await env.DB.prepare('SELECT * FROM pt_reps WHERE gym_id=? AND active=1 ORDER BY name ASC').bind(gymId).all();
  const repRows = [];
  for (const rep of (reps.results||[])) {
    const sales = await env.DB.prepare("SELECT COALESCE(SUM(amount),0) total, COUNT(*) n FROM pt_sales WHERE gym_id=? AND sold_by=? AND substr(sale_date,1,7)=?").bind(gymId, rep.name, month).first();
    repRows.push({ rep_id: rep.id, name: rep.name, role: rep.role, total: sales?.total||0, sale_count: sales?.n||0 });
  }
  repRows.sort((a,b) => b.total - a.total);
  const quota = await env.DB.prepare('SELECT tcv_goal FROM gym_quotas WHERE gym_id=? AND month=?').bind(gymId, month).first();
  const monthSales = await env.DB.prepare("SELECT COALESCE(SUM(amount),0) total, COUNT(*) n FROM pt_sales WHERE gym_id=? AND substr(sale_date,1,7)=?").bind(gymId, month).first();
  const recent = await env.DB.prepare('SELECT * FROM pt_sales WHERE gym_id=? ORDER BY sale_date DESC, id DESC LIMIT 10').bind(gymId).all();
  const trend = [];
  const now = new Date();
  for (let i = 5; i >= 0; i--) {
    const d = new Date(now.getFullYear(), now.getMonth()-i, 1);
    const m = d.getFullYear()+'-'+String(d.getMonth()+1).padStart(2,'0');
    const s = await env.DB.prepare("SELECT COALESCE(SUM(amount),0) total FROM pt_sales WHERE gym_id=? AND substr(sale_date,1,7)=?").bind(gymId, m).first();
    const q = await env.DB.prepare('SELECT tcv_goal FROM gym_quotas WHERE gym_id=? AND month=?').bind(gymId, m).first();
    trend.push({ month: m, total: s?.total||0, goal: q?.tcv_goal||0 });
  }
  // Welcome Workout funnel for this club, this month
  const monthStart = month + '-01';
  const monthEnd = month + '-31';
  const funnelRows = (await env.DB.prepare(
    "SELECT welcome_workout_outcome o, COUNT(*) n FROM members WHERE gym_id=? AND join_date >= ? AND join_date <= ? GROUP BY welcome_workout_outcome"
  ).bind(gymId, monthStart, monthEnd).all()).results || [];
  const fc = {}; let fTotal = 0;
  for (const r of funnelRows) { fc[r.o || 'blank'] = r.n; fTotal += r.n; }
  const fBooked = (fc['Appointment Set']||0) + (fc['Attended']||0) + (fc['Purchased PT']||0);
  const fShowed = (fc['Attended']||0) + (fc['Purchased PT']||0);
  const fClosed = fc['Purchased PT']||0;
  const funnel = {
    total_joins: fTotal, outcomes: fc,
    booked_pct: fTotal ? Math.round(fBooked/fTotal*100) : 0,
    show_pct: fBooked ? Math.round(fShowed/fBooked*100) : 0,
    close_pct: fShowed ? Math.round(fClosed/fShowed*100) : 0,
    open_loops: fc['Appointment Set']||0
  };

  // Sale type split this month
  const typeRows = (await env.DB.prepare(
    "SELECT COALESCE(sale_type,'new') t, COUNT(*) n, COALESCE(SUM(amount),0) total FROM pt_sales WHERE gym_id=? AND substr(sale_date,1,7)=? GROUP BY t"
  ).bind(gymId, month).all()).results || [];
  const saleTypes = {}; for (const r of typeRows) saleTypes[r.t] = { count: r.n, total: r.total };

  // Recent EOD log for this club
  const eodLog = (await env.DB.prepare(
    'SELECT id, author_name, author_role, log_date, submitted_at, ask_keelin FROM eod_submissions WHERE gym_id=? ORDER BY submitted_at DESC LIMIT 15'
  ).bind(gymId).all()).results || [];

  // Open help requests for this club
  const openHelp = (await env.DB.prepare(
    "SELECT COUNT(*) n FROM help_requests WHERE gym_id=? AND status='open'"
  ).bind(gymId).first());

  const note = await env.DB.prepare('SELECT note, emoji FROM board_notes WHERE gym_id=? AND month=?').bind(gymId, month).first();

  return { gym, month, goal: quota?.tcv_goal||0, actual: monthSales?.total||0, sale_count: monthSales?.n||0,
    reps: repRows, recent_sales: recent.results||[], trend, funnel, sale_types: saleTypes,
    eod_log: eodLog, open_help_count: openHelp?.n||0, note: note?.note||'', emoji: note?.emoji||'' };
}

async function getForecast(env, gymId){
  const monthsBack = 6;
  const history = [];
  const now = new Date();
  for (let i = monthsBack-1; i >= 0; i--) {
    const d = new Date(now.getFullYear(), now.getMonth()-i, 1);
    const m = d.getFullYear()+'-'+String(d.getMonth()+1).padStart(2,'0');
    let total;
    if (gymId) {
      const s = await env.DB.prepare("SELECT COALESCE(SUM(amount),0) total FROM pt_sales WHERE gym_id=? AND substr(sale_date,1,7)=?").bind(gymId, m).first();
      total = s?.total||0;
    } else {
      const s = await env.DB.prepare("SELECT COALESCE(SUM(amount),0) total FROM pt_sales WHERE substr(sale_date,1,7)=?").bind(m).first();
      total = s?.total||0;
    }
    history.push({ month: m, actual: total });
  }

  // Simple linear trend over months with actual data, project 3 months forward
  const withData = history.filter(h => h.actual > 0);
  let slope = 0, intercept = 0, hasTrend = false;
  if (withData.length >= 2) {
    const n = withData.length;
    const xs = withData.map((_,i)=>i);
    const ys = withData.map(h=>h.actual);
    const xMean = xs.reduce((a,b)=>a+b,0)/n, yMean = ys.reduce((a,b)=>a+b,0)/n;
    let num=0, den=0;
    for (let i=0;i<n;i++){ num += (xs[i]-xMean)*(ys[i]-yMean); den += (xs[i]-xMean)**2; }
    slope = den !== 0 ? num/den : 0;
    intercept = yMean - slope*xMean;
    hasTrend = true;
  }

  const projection = [];
  for (let i = 1; i <= 3; i++) {
    const d = new Date(now.getFullYear(), now.getMonth()+i, 1);
    const m = d.getFullYear()+'-'+String(d.getMonth()+1).padStart(2,'0');
    const projected = hasTrend ? Math.max(0, Math.round(intercept + slope*(withData.length-1+i))) : null;
    projection.push({ month: m, projected });
  }

  return { history, projection, confidence: withData.length >= 4 ? 'moderate' : withData.length >= 2 ? 'low' : 'insufficient_data', months_of_data: withData.length };
}

// ---------------- Meal-plan generator ----------------
function mondayOf(d){
  const dt = new Date(d);
  const day = dt.getUTCDay(); // 0=Sun..6=Sat
  const diff = day === 0 ? -6 : 1 - day; // shift back to Monday
  dt.setUTCDate(dt.getUTCDate() + diff);
  return dt.toISOString().slice(0,10);
}
async function generateMealPlans(env, opt){
  opt = opt || {};
  let sql = `SELECT mp.*, c.first_name, c.last_name, c.email, c.age, c.gender, c.goal_primary, c.status
             FROM meal_profiles mp JOIN clients c ON c.id = mp.client_id
             WHERE mp.package IN ('complete','complete_plus')`;
  if (opt.activeOnly) { sql += ` AND c.status IN ('active','active_pt')`; }
  const binds = [];
  if (opt.clientId){ sql += ' AND mp.client_id = ?'; binds.push(opt.clientId); }
  const rows = (await env.DB.prepare(sql).bind(...binds).all()).results || [];
  const week = mondayOf(new Date());
  const results = []; const errors = []; let skipped = 0;
  for (const r of rows){
    try{
      if (opt.skipExisting) {
        const existing = await env.DB.prepare('SELECT id FROM meal_plans WHERE client_id=? AND week_of=?').bind(r.client_id, week).first();
        if (existing) { skipped++; continue; }
      }
      const inbody = await latestInbody(env, r.client_id);
      const built = await buildMealPlan(env, r, inbody);
      await env.DB.prepare(`INSERT INTO meal_plans (client_id,week_of,plan_json,shopping_items_json,shopping_checked_json,generated_at) VALUES (?,?,?,?,?,?)`)
        .bind(r.client_id, week, JSON.stringify(built.plan_json), JSON.stringify(built.shopping_items||[]), JSON.stringify({}), new Date().toISOString()).run();
      const name = ((r.first_name||'')+' '+(r.last_name||'')).trim() || 'Client';
      results.push({ client_id: r.client_id, name, email: r.email||'', week, plan: built.plan_json });
    } catch(e){ errors.push(r.client_id+': '+e.message); }
  }
  return { clients: rows.length, generated: results.length, skipped, results, errors };
}

async function latestInbody(env, clientId){
  const ci = await env.DB.prepare(`SELECT now_weight w, now_lean ln, now_body_fat_pct bf FROM checkins WHERE client_id=? ORDER BY checkin_date DESC LIMIT 1`).bind(clientId).first();
  if (ci && (ci.w || ci.ln)) return ci;
  const co = await env.DB.prepare(`SELECT weight w, lean_mass ln, body_fat_pct bf FROM consultations WHERE client_id=? ORDER BY consult_date DESC LIMIT 1`).bind(clientId).first();
  return co || {};
}

async function buildMealPlan(env, r, inbody){
  const name = ((r.first_name||'')+' '+(r.last_name||'')).trim() || 'Client';
  const goal = r.goal_type || r.goal_primary || 'maintain';
  const macroLine = (r.calories || r.protein_g)
    ? `Coach-set targets: ${r.calories||'?'} kcal, protein ${r.protein_g||'?'}g, carbs ${r.carbs_g||'?'}g, fat ${r.fat_g||'?'}g. Use these.`
    : 'No coach-set targets; compute sensible ones from the stats and goal.';
  const libraryText = ['breakfast','lunch','dinner','snack'].map(cat =>
    cat.toUpperCase() + ' OPTIONS:\n' + MEAL_LIBRARY[cat].map(m =>
      `- ${m.name} (${m.calories} kcal, ${m.protein_g}g protein, ${m.carbs_g}g carbs, ${m.fat_g}g fat)`).join('\n')
  ).join('\n\n');
  const sys = `You are a nutrition planning assistant for Retro Fitness personal training. Build a practical 7-day meal plan for one client from their body composition and goal.

APPROVED MEAL LIBRARY — every meal slot in the plan must reference one of these items by its EXACT name, character-for-character, so the app can look up its macros and let the client swap it later. Never invent a meal name that isn't in this list. A portion_mult field (default 1, e.g. 1.5 for a larger portion) lets you scale a library item's macros up or down to fit the day's targets instead of inventing a new food:

${libraryText}

Strictly avoid every excluded food and allergen listed. If a medical condition is listed, do NOT design around it; instead add a clear note advising the client to consult their physician or a registered dietitian, and keep the plan general and conservative.

Return ONLY valid JSON, no markdown, no prose outside the JSON, with this exact shape:
{"summary_html":"<1-2 short sentences of plain HTML stating the computed daily calorie and macro targets for this client, no headings needed>","days":[{"label":"Monday","meals":{"breakfast":{"item":"<exact library item name>","portion_mult":1},"lunch":{"item":"...","portion_mult":1},"dinner":{"item":"...","portion_mult":1},"snack":{"item":"...","portion_mult":1}}}, ... 7 days total, Monday through Sunday],"supplement_note":"one short sentence suggesting a 1st Phorm product using this link: ${FPLINK}","disclaimer_html":"<one italic paragraph stating this plan is a general nutrition recommendation only, not medical or dietetic advice, and the client should consult their physician or a registered dietitian before starting it or making any significant change to their diet>","shopping_items":[{"item":"chicken breast","qty":"2 lb","aisle":"meat & seafood"}]}

Vary the selections across the week for variety rather than repeating the same items every day. The shopping_items array is the FULL consolidated grocery list for the week reflecting the actual meals chosen, one entry per distinct ingredient with a realistic total quantity, grouped by aisle (meat & seafood, produce, dairy & eggs, grains & bakery, pantry, frozen, other). Do NOT include any 1st Phorm branded product (protein shake, protein bar) in shopping_items — those are ordered directly through the app's link, not bought at a grocery store; skip them from the list entirely even on days they're the chosen meal. No workout, training, sets, reps or exercise content anywhere. Plain accessible language, no emojis, no em dashes anywhere.`;
  const user = `Client: ${name}, age ${r.age||'n/a'}, ${r.gender||'n/a'}. Goal: ${goal}.
InBody: weight ${inbody.w||'n/a'}, lean mass ${inbody.ln||'n/a'}, body fat percent ${inbody.bf||'n/a'}.
${macroLine}
Excluded proteins: ${r.excluded_proteins||'none'}. Excluded vegetables: ${r.excluded_vegetables||'none'}. Excluded fruits: ${r.excluded_fruits||'none'}.
Allergies: ${r.allergies||'none'}. Medical conditions: ${r.conditions||'none'}. Notes: ${r.notes||'none'}.`;
  const resp = await fetch('https://api.anthropic.com/v1/messages', {
    method:'POST',
    headers:{ 'Content-Type':'application/json', 'x-api-key': env.ANTHROPIC_KEY||'', 'anthropic-version':'2023-06-01' },
    body: JSON.stringify({ model:'claude-sonnet-4-6', max_tokens:4000, system: sys, messages:[{ role:'user', content: user }] })
  });
  const data = await resp.json();
  if (data.error) throw new Error(data.error.message || 'AI error');
  const text = (data.content||[]).filter(b=>b.type==='text').map(b=>b.text).join('\n');
  try {
    const parsed = JSON.parse(text.replace(/```json|```/g,'').trim());
    const plan = {
      summary_html: parsed.summary_html || '',
      days: parsed.days || [],
      supplement_note: parsed.supplement_note || '',
      disclaimer_html: parsed.disclaimer_html || ''
    };
    return { plan_json: plan, shopping_items: parsed.shopping_items || [] };
  } catch(e) {
    // Fallback: if the model didn't return clean JSON, at least preserve
    // something readable rather than losing the response entirely.
    return { plan_json: { summary_html:'', days:[], supplement_note:'', disclaimer_html:'', raw_fallback_text: text }, shopping_items: [] };
  }
}

// ---------------- Coach's Edge / Word of the Day / Inside Retro ----------------
// Tone target: an insider speaking to people who already train seriously,
// not beginner-friendly generic wellness content. Written like a coach
// sharing something with people who are already in the room.
async function generateDailyContent(env, dateStr, forceRegenerate){
  const prompt = `You write daily content for the member portal of an elite, members-only personal training program inside a gym. The members are serious, consistent, and already committed, this is not beginner content and should never sound like generic wellness journalism. Write the way a coach talks to people who are already in the room, a little insider, confident, respectful of their effort.

Return ONLY valid JSON, no markdown, with this exact shape:
{"health_tip":"one sharp, specific, slightly insider training or nutrition tip, 1-2 sentences, framed like something a coach would tell someone who already trains seriously, not 101-level advice","quote":"a short, powerful quote about discipline, consistency, or earned results, no more than 20 words","quote_author":"who said it, or Unknown if generic","news_headline":"a short headline about a real fitness, training, or nutrition science topic, 8-12 words, framed as insight for people who train seriously","news_blurb":"2-3 sentences explaining that topic in confident, knowledgeable language, written for people already inside the world of training, not a general audience"}

No emojis, no markdown, no em dashes, plain punctuation only. Keep it positive and free of specific medical claims.`;
  const aiResp = await fetch('https://api.anthropic.com/v1/messages', {
    method: 'POST',
    headers: { 'Content-Type':'application/json','x-api-key':env.ANTHROPIC_KEY,'anthropic-version':'2023-06-01' },
    body: JSON.stringify({ model:'claude-sonnet-4-6', max_tokens:500, messages:[{role:'user',content:prompt}] })
  });
  const aiData = await aiResp.json();
  const text = (aiData.content||[]).filter(b=>b.type==='text').map(b=>b.text||'').join('').trim();
  let parsed;
  try { parsed = JSON.parse(text.replace(/```json|```/g,'').trim()); }
  catch(e) {
    parsed = {
      health_tip: 'Protein within thirty minutes of training is not optional if you are serious about the work you just put in.',
      quote: 'The work you do when no one is watching is the work that separates you.',
      quote_author: 'Unknown',
      news_headline: 'Recovery quality now tracked as closely as training volume',
      news_blurb: 'Coaches working with serious athletes increasingly treat sleep and recovery metrics as core training data, not an afterthought. The members who track both consistently see the work pay off faster.'
    };
  }
  const existing = await env.DB.prepare('SELECT id FROM daily_content WHERE content_date=?').bind(dateStr).first();
  if (existing) {
    await env.DB.prepare('UPDATE daily_content SET health_tip=?,quote=?,quote_author=?,news_headline=?,news_blurb=?,generated_at=? WHERE id=?')
      .bind(parsed.health_tip, parsed.quote, parsed.quote_author||'Unknown', parsed.news_headline, parsed.news_blurb, new Date().toISOString(), existing.id).run();
    return { id: existing.id, content_date: dateStr, ...parsed };
  } else {
    const ins = await env.DB.prepare('INSERT INTO daily_content (content_date,health_tip,quote,quote_author,news_headline,news_blurb,generated_at) VALUES (?,?,?,?,?,?,?)')
      .bind(dateStr, parsed.health_tip, parsed.quote, parsed.quote_author||'Unknown', parsed.news_headline, parsed.news_blurb, new Date().toISOString()).run();
    return { id: ins.meta?.last_row_id, content_date: dateStr, ...parsed };
  }
}

// ---------------- The Circle: auto-detected member wins ----------------
async function detectAutoWins(env){
  let created = 0;
  const recent = await env.DB.prepare(
    `SELECT c.id, c.client_id, c.checkin_date, c.now_weight, c.prev_weight, c.now_body_fat_pct, c.prev_body_fat_pct, cl.first_name, cl.last_name
     FROM checkins c JOIN clients cl ON cl.id=c.client_id
     WHERE c.checkin_date >= date('now','-14 day')`
  ).all();
  for (const r of (recent.results||[])) {
    const wDelta = (r.prev_weight!=null && r.now_weight!=null) ? (Number(r.prev_weight)-Number(r.now_weight)) : null;
    const bDelta = (r.prev_body_fat_pct!=null && r.now_body_fat_pct!=null) ? (Number(r.prev_body_fat_pct)-Number(r.now_body_fat_pct)) : null;
    const name = (r.first_name||'A member').trim();
    let headline = null, detail = null, winType = null;
    if (wDelta!=null && wDelta>=5) { headline = name+' is down '+wDelta.toFixed(1)+' lb'; detail='Logged at the '+r.checkin_date+' check-in. Real work, real results.'; winType='weight_milestone'; }
    else if (bDelta!=null && bDelta>=2) { headline = name+' dropped '+bDelta.toFixed(1)+'% body fat'; detail='Logged at the '+r.checkin_date+' check-in. That is earned, not given.'; winType='bodyfat_milestone'; }
    if (headline) {
      const dupe = await env.DB.prepare("SELECT id FROM client_wins WHERE client_id=? AND win_type=? AND detail LIKE ?").bind(r.client_id, winType, '%'+r.checkin_date+'%').first();
      if (!dupe) {
        await env.DB.prepare('INSERT INTO client_wins (client_id,headline,detail,win_type,source,visible,created_at) VALUES (?,?,?,?,?,1,?)')
          .bind(r.client_id, headline, detail, winType, 'auto', new Date().toISOString()).run();
        created++;
      }
    }
  }
  const streaks = await env.DB.prepare(
    `SELECT client_id, COUNT(*) n FROM self_workouts WHERE workout_date >= date('now','-14 day') GROUP BY client_id HAVING n>=4`
  ).all();
  for (const s of (streaks.results||[])) {
    const cl = await env.DB.prepare('SELECT first_name FROM clients WHERE id=?').bind(s.client_id).first();
    const name = (cl && cl.first_name) || 'A member';
    const headline = name+' put in '+s.n+' sessions over the last two weeks';
    const dupe = await env.DB.prepare("SELECT id FROM client_wins WHERE client_id=? AND win_type='streak' AND created_at >= date('now','-7 day')").bind(s.client_id).first();
    if (!dupe) {
      await env.DB.prepare('INSERT INTO client_wins (client_id,headline,detail,win_type,source,visible,created_at) VALUES (?,?,?,?,?,1,?)')
        .bind(s.client_id, headline, 'This is what showing up looks like.', 'streak', 'auto', new Date().toISOString()).run();
      created++;
    }
  }

  // Gym check-in consistency — recognizes people showing up to work out on
  // their own, not just PT sessions, using the opt-in presence check-ins.
  const checkinStreaks = await env.DB.prepare(
    `SELECT client_id, COUNT(*) n FROM presence_checkins WHERE checked_in_at >= datetime('now','-14 day') GROUP BY client_id HAVING n>=6`
  ).all();
  for (const s of (checkinStreaks.results||[])) {
    const cl = await env.DB.prepare('SELECT first_name FROM clients WHERE id=?').bind(s.client_id).first();
    const name = (cl && cl.first_name) || 'A member';
    const headline = name+' checked in '+s.n+' times over the last two weeks';
    const dupe = await env.DB.prepare("SELECT id FROM client_wins WHERE client_id=? AND win_type='checkin_streak' AND created_at >= date('now','-7 day')").bind(s.client_id).first();
    if (!dupe) {
      await env.DB.prepare('INSERT INTO client_wins (client_id,headline,detail,win_type,source,visible,created_at) VALUES (?,?,?,?,?,1,?)')
        .bind(s.client_id, headline, 'Consistency is the whole game.', 'checkin_streak', 'auto', new Date().toISOString()).run();
      created++;
    }
  }

  // PT session count milestones — round numbers of completed training
  // sessions (10, 25, 50, 100, 150, 200...).
  const milestones = [10, 25, 50, 100, 150, 200, 250, 300];
  const sessionCounts = await env.DB.prepare(
    `SELECT client_id, COUNT(*) n FROM training_sessions GROUP BY client_id HAVING n>=10`
  ).all();
  for (const s of (sessionCounts.results||[])) {
    const hit = milestones.filter(m => m <= s.n).pop();
    if (!hit) continue;
    const dupe = await env.DB.prepare("SELECT id FROM client_wins WHERE client_id=? AND win_type='session_milestone' AND detail LIKE ?").bind(s.client_id, '%'+hit+' sessions%').first();
    if (dupe) continue;
    const cl = await env.DB.prepare('SELECT first_name FROM clients WHERE id=?').bind(s.client_id).first();
    const name = (cl && cl.first_name) || 'A member';
    const headline = name+' just hit '+hit+' training sessions';
    await env.DB.prepare('INSERT INTO client_wins (client_id,headline,detail,win_type,source,visible,created_at) VALUES (?,?,?,?,?,1,?)')
      .bind(s.client_id, headline, hit+' sessions in the books. That is real commitment.', 'session_milestone', 'auto', new Date().toISOString()).run();
    created++;
  }

  // Class attendance consistency — now buildable since class_rsvps is real,
  // synced data instead of the old localStorage-only "I'm Going" toggle.
  const classStreaks = await env.DB.prepare(
    `SELECT client_id, COUNT(*) n FROM class_rsvps WHERE class_date >= date('now','-14 day') AND class_date <= date('now') GROUP BY client_id HAVING n>=4`
  ).all();
  for (const s of (classStreaks.results||[])) {
    const cl = await env.DB.prepare('SELECT first_name FROM clients WHERE id=?').bind(s.client_id).first();
    const name = (cl && cl.first_name) || 'A member';
    const headline = name+' hit '+s.n+' classes over the last two weeks';
    const dupe = await env.DB.prepare("SELECT id FROM client_wins WHERE client_id=? AND win_type='class_streak' AND created_at >= date('now','-7 day')").bind(s.client_id).first();
    if (!dupe) {
      await env.DB.prepare('INSERT INTO client_wins (client_id,headline,detail,win_type,source,visible,created_at) VALUES (?,?,?,?,?,1,?)')
        .bind(s.client_id, headline, 'Showing up to class after class. That\'s discipline.', 'class_streak', 'auto', new Date().toISOString()).run();
      created++;
    }
  }

  return { created };
}

// ---------------- Member tier: earned through consistency, not paid ----------------
// Bronze: under 4 logged activities (self_workouts + checkins + training_sessions) in trailing 30 days
// Silver: 4-7 logged activities in trailing 30 days
// Gold: 8+ logged activities in trailing 30 days, OR a 3+ consecutive week activity streak
async function getMemberTier(env, clientId){
  const count = await env.DB.prepare(
    `SELECT
      (SELECT COUNT(*) FROM self_workouts WHERE client_id=? AND workout_date>=date('now','-30 day')) +
      (SELECT COUNT(*) FROM checkins WHERE client_id=? AND checkin_date>=date('now','-30 day')) +
      (SELECT COUNT(*) FROM training_sessions WHERE client_id=? AND session_date>=date('now','-30 day')) AS n`
  ).bind(clientId, clientId, clientId).first();
  const n = (count && count.n) || 0;

  // Check for a 3+ consecutive week streak using self_workouts as the activity signal
  const weeks = await env.DB.prepare(
    `SELECT strftime('%Y-%W', workout_date) wk FROM self_workouts WHERE client_id=? AND workout_date>=date('now','-42 day') GROUP BY wk ORDER BY wk DESC`
  ).bind(clientId).all();
  const weekKeys = (weeks.results||[]).map(w=>w.wk);
  let consecutiveStreak = weekKeys.length >= 3;

  let level = 'bronze', label = 'Bronze Member';
  if (n >= 8 || consecutiveStreak) { level = 'gold'; label = 'Gold Member'; }
  else if (n >= 4) { level = 'silver'; label = 'Silver Member'; }
  return { level, label, activity_count_30d: n, streak_weeks: consecutiveStreak ? weekKeys.length : 0 };
}

// ---------------- Google Calendar iCal parser ----------------
function parseUpcoming(ics, limit){
  const text = ics.replace(/\r\n[ \t]/g, '').replace(/\n[ \t]/g, '');
  const lines = text.split(/\r\n|\n/);
  const events = []; let cur = null;
  for (const ln of lines) {
    if (ln === 'BEGIN:VEVENT') { cur = {}; continue; }
    if (ln === 'END:VEVENT') { if (cur && cur.startRaw) events.push(cur); cur = null; continue; }
    if (!cur) continue;
    const i = ln.indexOf(':'); if (i < 0) continue;
    const keyPart = ln.slice(0, i); const val = ln.slice(i + 1);
    const key = keyPart.split(';')[0];
    if (key === 'DTSTART') cur.startRaw = val.trim();
    else if (key === 'SUMMARY') cur.summary = unescapeICS(val);
    else if (key === 'LOCATION') cur.location = unescapeICS(val);
    else if (key === 'DESCRIPTION') cur.description = unescapeICS(val);
  }
  const todayKey = new Date().toISOString().slice(0,10).replace(/-/g,'');
  return events
    .map(e => ({ ...e, dateKey: (e.startRaw.match(/\d{8}/)||[''])[0] }))
    .filter(e => e.dateKey && e.dateKey >= todayKey)
    .sort((a,b) => a.startRaw.localeCompare(b.startRaw))
    .slice(0, limit)
    .map(e => ({ summary: e.summary || '(no title)', name: extractName(e.summary || ''),
                 start: fmtStart(e.startRaw), startRaw: e.startRaw, location: e.location || '' }));
}
function unescapeICS(v){ return v.replace(/\\n/gi,' ').replace(/\\,/g,',').replace(/\\;/g,';').replace(/\\\\/g,'\\').trim(); }
function extractName(summary){
  const m = summary.match(/(?:[-–:]|with)\s+([A-Z][a-zA-Z'.-]+(?:\s+[A-Z][a-zA-Z'.-]+){0,2})\s*$/);
  return m ? m[1].trim() : '';
}
function fmtStart(raw){
  const m = raw.match(/^(\d{4})(\d{2})(\d{2})(?:T(\d{2})(\d{2}))?/);
  if (!m) return raw;
  const [_, y, mo, d, hh, mm] = m;
  const date = `${y}-${mo}-${d}`;
  return hh ? `${date}T${hh}:${mm}` : date;
}

// ---------------- D1 generic endpoint ----------------
async function handleDb(q, env, cors) {
  const op = (q.op || '').toLowerCase();
  const table = q.table;
  if (!ALLOWED_TABLES.has(table)) return bad('Table not allowed: ' + table, cors);
  const cols = q.values ? Object.keys(q.values) : [];
  const whereCols = q.where ? Object.keys(q.where) : [];
  for (const c of [...cols, ...whereCols]) if (!IDENT.test(c)) return bad('Bad column name: ' + c, cors);

  if (op === 'insert') {
    if (!cols.length) return bad('insert needs values', cors);
    const sql = `INSERT INTO ${table} (${cols.join(',')}) VALUES (${cols.map(()=>'?').join(',')})`;
    const res = await env.DB.prepare(sql).bind(...cols.map(c => q.values[c] ?? null)).run();
    return ok({ id: res.meta?.last_row_id, meta: res.meta }, cors);
  }
  if (op === 'select') {
    let sel = '*';
    if (Array.isArray(q.columns) && q.columns.length) {
      if (!q.columns.every(c => c === '*' || IDENT.test(c))) return bad('Bad column in select', cors);
      sel = q.columns.join(',');
    }
    let sql = `SELECT ${sel} FROM ${table}`; const binds = [];
    if (whereCols.length) { sql += ' WHERE ' + whereCols.map(c=>`${c}=?`).join(' AND '); whereCols.forEach(c=>binds.push(q.where[c] ?? null)); }
    if (q.orderBy) { if (!ORDER.test(q.orderBy)) return bad('Bad orderBy', cors); sql += ' ORDER BY ' + q.orderBy; }
    if (q.limit) { const n = parseInt(q.limit,10); if (Number.isFinite(n)) sql += ' LIMIT ' + n; }
    const res = await env.DB.prepare(sql).bind(...binds).all();
    return ok({ results: res.results || [] }, cors);
  }
  if (op === 'update') {
    if (!cols.length) return bad('update needs values', cors);
    if (!whereCols.length) return bad('update needs where', cors);
    const sql = `UPDATE ${table} SET ${cols.map(c=>`${c}=?`).join(',')} WHERE ${whereCols.map(c=>`${c}=?`).join(' AND ')}`;
    const res = await env.DB.prepare(sql).bind(...cols.map(c=>q.values[c] ?? null), ...whereCols.map(c=>q.where[c] ?? null)).run();
    return ok({ meta: res.meta }, cors);
  }
  if (op === 'delete') {
    if (!whereCols.length) return bad('delete needs where', cors);
    const sql = `DELETE FROM ${table} WHERE ${whereCols.map(c=>`${c}=?`).join(' AND ')}`;
    const res = await env.DB.prepare(sql).bind(...whereCols.map(c=>q.where[c] ?? null)).run();
    return ok({ meta: res.meta }, cors);
  }
  return bad('Unknown op: ' + op, cors);
}
