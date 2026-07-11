// Retro Strong / PT Tools -- shared Worker config
// Single source of truth for the Cloudflare Worker URL this club's frontend talks to.
// To point an entire club deployment at its own Worker, change ONLY this one line --
// nothing else in the codebase should ever hardcode the Worker URL again.
const RETRO_WORKER_URL = 'https://broken-cake-e9c2.tedscholl.workers.dev';
