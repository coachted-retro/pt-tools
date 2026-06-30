const OUTSCRAPER_BASE = "https://api.outscraper.com/maps/search-v3";

// --- Gym location: Retro Fitness of Fairless Hills, 516 Lincoln Hwy, 19030 ---
const GYM_LAT = 40.1762, GYM_LON = -74.8530, RADIUS_MI = 10;

// --- What to harvest. Edit freely. ---
const HARVEST_QUERIES = [
  { query: "chiropractor near Fairless Hills PA",            lead_type: "referral_partner", category: "chiropractor" },
  { query: "physical therapy near Fairless Hills PA",         lead_type: "referral_partner", category: "physical_therapy" },
  { query: "med spa near Fairless Hills PA",                  lead_type: "referral_partner", category: "med_spa" },
  { query: "nutritionist dietitian near Fairless Hills PA",   lead_type: "referral_partner", category: "nutritionist" },
  { query: "fire department near Fairless Hills PA",          lead_type: "corporate", category: "fire_department" },
  { query: "police department near Fairless Hills PA",        lead_type: "corporate", category: "police" },
  { query: "ambulance EMS near Fairless Hills PA",            lead_type: "corporate", category: "ems" },
  { query: "corporate office near Fairless Hills PA",         lead_type: "corporate", category: "employer" },
  { query: "manufacturing company near Fairless Hills PA",    lead_type: "corporate", category: "employer" },
  { query: "warehouse distribution near Fairless Hills PA",   lead_type: "corporate", category: "employer" }
];

const ALLOWED_TABLES = new Set([
  'clients','consultations','followups','checkins','programs','training_sessions',
  'lead_sources','leads','touchpoints','outreach_log',
  'progress_photos','measurements',
  'meal_profiles','meal_plans',
  'inbody_scans','workouts',
  'client_auth','challenges','challenge_entries','daily_logs','self_workouts',
  'daily_content','client_wins','gym_events'
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

      if (url.pathname === '/harvest/run') {
        if (!env.DB) return bad('D1 binding "DB" not found.', cors);
        if (!env.OUTSCRAPER_KEY) return bad('OUTSCRAPER_KEY variable not set.', cors);
        const opt = await request.json().catch(() => ({}));
        return await runHarvest(opt, env, cors);
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
        const ch = await env.DB.prepare('SELECT * FROM challenges WHERE active=1 ORDER BY generated_at DESC LIMIT 1').first();
        if (!ch) return ok({ challenge: null }, cors);
        const entries = await env.DB.prepare(
          'SELECT ce.client_id, SUM(ce.points) as total, c.first_name, c.last_name FROM challenge_entries ce JOIN clients c ON c.id=ce.client_id WHERE ce.challenge_id=? GROUP BY ce.client_id ORDER BY total DESC LIMIT 20'
        ).bind(ch.id).all();
        return ok({ challenge: ch, leaderboard: entries.results||[] }, cors);
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
        const res = await env.DB.prepare(
          'SELECT w.*, c.first_name, c.last_name FROM client_wins w LEFT JOIN clients c ON c.id=w.client_id WHERE w.visible=1 ORDER BY w.created_at DESC LIMIT ?'
        ).bind(limit).all();
        // attach each member's current tier so The Circle can show a badge next to their name
        const wins = res.results || [];
        for (const w of wins) {
          if (w.client_id) w.tier = await getMemberTier(env, w.client_id);
        }
        const activeCount = await env.DB.prepare(
          "SELECT COUNT(DISTINCT client_id) n FROM (SELECT client_id FROM self_workouts WHERE workout_date>=date('now','-30 day') UNION SELECT client_id FROM checkins WHERE checkin_date>=date('now','-30 day') UNION SELECT client_id FROM training_sessions WHERE session_date>=date('now','-30 day'))"
        ).first();
        return ok({ wins, active_members_30d: activeCount?.n || 0 }, cors);
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

      // ── CLIENT PORTAL DATA ───────────────────────────────────────
      if (url.pathname === '/portal/me' && request.method === 'GET') {
        if (!env.DB) return bad('No DB', cors);
        const client_id = url.searchParams.get('client_id');
        if (!client_id) return bad('client_id required', cors);
        const [client, checkins, mealPlan, scans, sessions, selfWorkouts, tier] = await Promise.all([
          env.DB.prepare('SELECT id,first_name,last_name,email,phone,status,advisor,coach,goal_primary,training_start_date,package FROM clients WHERE id=?').bind(client_id).first(),
          env.DB.prepare('SELECT * FROM checkins WHERE client_id=? ORDER BY checkin_date DESC LIMIT 12').bind(client_id).all(),
          env.DB.prepare('SELECT * FROM meal_plans WHERE client_id=? ORDER BY week_of DESC LIMIT 1').bind(client_id).first(),
          env.DB.prepare('SELECT * FROM inbody_scans WHERE client_id=? ORDER BY scan_date DESC LIMIT 12').bind(client_id).all(),
          env.DB.prepare('SELECT * FROM training_sessions WHERE client_id=? ORDER BY session_date DESC LIMIT 20').bind(client_id).all(),
          env.DB.prepare('SELECT * FROM self_workouts WHERE client_id=? ORDER BY workout_date DESC LIMIT 20').bind(client_id).all(),
          getMemberTier(env, client_id)
        ]);
        return ok({ client, checkins: checkins.results||[], mealPlan, scans: scans.results||[], sessions: sessions.results||[], selfWorkouts: selfWorkouts.results||[], tier }, cors);
      }

      if (url.pathname === '/portal/log-workout' && request.method === 'POST') {
        if (!env.DB) return bad('No DB', cors);
        const body = await request.json();
        if (!body.client_id) return bad('client_id required', cors);
        const ins = await env.DB.prepare('INSERT INTO self_workouts (client_id,workout_date,title,exercises_json,duration_min,notes) VALUES (?,?,?,?,?,?)')
          .bind(body.client_id, body.workout_date||new Date().toISOString().slice(0,10), body.title||'Self-guided workout', JSON.stringify(body.exercises||[]), body.duration_min||null, body.notes||'').run();
        return ok({ logged: true, id: ins.meta?.last_row_id }, cors);
      }

      if (url.pathname === '/portal/log-day' && request.method === 'POST') {
        if (!env.DB) return bad('No DB', cors);
        const body = await request.json();
        if (!body.client_id) return bad('client_id required', cors);
        await env.DB.prepare('INSERT OR REPLACE INTO daily_logs (client_id,log_date,energy,nutrition_score,hydration,sleep_hours,wins,notes) VALUES (?,?,?,?,?,?,?,?)')
          .bind(body.client_id, body.log_date||new Date().toISOString().slice(0,10), body.energy||null, body.nutrition||null, body.hydration||null, body.sleep||null, body.wins||'', body.notes||'').run();
        return ok({ logged: true }, cors);
      }

      if (url.pathname === '/sheets-write' || url.pathname === '/sheets-read') {
        const body = await request.text();
        const r = await fetch(APPS_SCRIPT, { method:'POST', headers:{'Content-Type':'text/plain'}, body, redirect:'follow' });
        return new Response((await r.text()) || '{"ok":true}', { status:200, headers:cors });
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
  }
};

// ---------------- HARVESTER ----------------
async function runHarvest(opt, env, cors) {
  const limit = Math.min(parseInt(opt.limit, 10) || 20, 100);
  const onlyCategory = opt.category || null;
  const queries = HARVEST_QUERIES.filter(q => !onlyCategory || q.category === onlyCategory);
  const sourceId = await getOrCreateSource(env, 'Google Maps Harvest', 'corporate');
  let found = 0, inserted = 0, dupes = 0, tooFar = 0, noGeo = 0;
  const perQuery = [];
  for (const q of queries) {
    const places = await outscraperSearch(q.query, limit, env.OUTSCRAPER_KEY);
    let qIns = 0;
    for (const p of places) {
      found++;
      const lat = num(p.latitude), lon = num(p.longitude);
      if (lat == null || lon == null) { noGeo++; continue; }
      const dist = haversineMi(GYM_LAT, GYM_LON, lat, lon);
      if (dist > RADIUS_MI) { tooFar++; continue; }
      const name = (p.name || '').trim();
      const phone = (p.phone || '').trim();
      if (!name) continue;
      if (await leadExists(env, name, phone)) { dupes++; continue; }
      await env.DB.prepare(
        `INSERT INTO leads (lead_type,business_name,email,phone,address,city,state,zip,category,distance_mi,source_id,status)
         VALUES (?,?,?,?,?,?,?,?,?,?,?, 'new')`
      ).bind(
        q.lead_type, name, (p.email_1 || p.email || ''), phone,
        p.full_address || '', p.city || '', p.us_state || p.state || '', p.postal_code || '',
        q.category, Math.round(dist * 10) / 10, sourceId
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

// ---------------- Meal-plan generator ----------------
async function generateMealPlans(env, opt){
  opt = opt || {};
  let sql = `SELECT mp.*, c.first_name, c.last_name, c.email, c.age, c.gender, c.goal_primary
             FROM meal_profiles mp JOIN clients c ON c.id = mp.client_id
             WHERE mp.package IN ('complete','complete_plus')`;
  const binds = [];
  if (opt.clientId){ sql += ' AND mp.client_id = ?'; binds.push(opt.clientId); }
  const rows = (await env.DB.prepare(sql).bind(...binds).all()).results || [];
  const week = new Date().toISOString().slice(0,10);
  const results = []; const errors = [];
  for (const r of rows){
    try{
      const inbody = await latestInbody(env, r.client_id);
      const html = await buildMealPlan(env, r, inbody);
      await env.DB.prepare(`INSERT INTO meal_plans (client_id,week_of,plan_html,generated_at) VALUES (?,?,?,?)`)
        .bind(r.client_id, week, html, new Date().toISOString()).run();
      const name = ((r.first_name||'')+' '+(r.last_name||'')).trim() || 'Client';
      results.push({ client_id: r.client_id, name, email: r.email||'', week, html });
    } catch(e){ errors.push(r.client_id+': '+e.message); }
  }
  return { clients: rows.length, generated: results.length, results, errors };
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
  const sys = `You are a nutrition planning assistant for Retro Fitness personal training. Build a practical 7-day meal plan for one client from their body composition and goal. Compute sensible daily calories and macros and state them up top. Strictly avoid every excluded food and allergen listed. If a medical condition is listed, do NOT design around it; instead add a clear note advising the client to consult their physician or a registered dietitian, and keep the plan general and conservative. Output clean simple HTML only (headings, paragraphs, lists; no html or body wrapper): a short macro summary, a 7-day plan with breakfast, lunch, dinner and one snack per day with approximate portions, a few simple recipes, and a consolidated shopping list grouped by aisle. Add one short 1st Phorm supplement suggestion using this link: ${FPLINK}. End with exactly one italic line stating this is general nutrition guidance and not medical nutrition therapy. Include no workout, training, sets, reps or exercise content. Plain accessible language, no emojis, no em dashes.`;
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
  return (data.content||[]).filter(b=>b.type==='text').map(b=>b.text).join('\n');
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
