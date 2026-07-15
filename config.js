// Ironclad / PT Tools -- shared Worker config
// Single source of truth for which Worker this club's frontend talks to.
//
// Default (Fairless Hills, and anything else not recognized below): calls
// the one shared Worker directly by its workers.dev URL, exactly as
// before this file grew club-awareness.
//
// Club pilot subdomains (club01.myretrostrong.com through club11) are
// routed through Cloudflare straight to that same Worker script, which
// -- as of the July 11 2026 multi-club update -- serves both the static
// files AND the API at that same hostname. So for those hosts, API calls
// should go to this page's own origin, not the external workers.dev URL.
// See worker-v34.js's CLUB_SLOT_MAP and STATIC ASSET PROXY sections, and
// provisioning/CLUB_DATABASE_REGISTRY.md, for the other half of this.
const RETRO_WORKER_URL = /^club\d{2}\.myretrostrong\.com$/i.test(location.hostname)
  ? location.origin
  : 'https://broken-cake-e9c2.tedscholl.workers.dev';
