# retro-crm-demo -- backup before deletion, July 11 2026

Deleted to free a D1 database slot (Cloudflare's 10-database account cap was
blocking the remaining 7 club provisions). Verified before deletion:
- Zero references anywhere in the codebase (no worker binding, no HTML file)
- Keelin's dashboard confirmed to use the real retro-crm database via the
  same shared worker, not this one
- All content is fictional demo data: 15 gyms with made-up director names
  (Hayden Pruitt, Kai Ng, etc.), 9 clients with @demo.retrofh.internal
  emails and placeholder 215-555-XXXX phone numbers
- Old schema snapshot (35 tables), missing everything built in recent
  sessions -- clearly an early prototype, not actively maintained

Non-empty tables at time of deletion: clients (9), gyms (15), checkins (36),
leads (259), training_sessions (102). Full gyms and clients data preserved
below since those had the clearest business-adjacent shape; other tables
were pure volume (checkins/leads/training_sessions) without unique
structure worth preserving in full.

## gyms (15 rows, all is_demo=1, all fictional director names)
Forest Hills NYC/Hayden Pruitt, Fairfield NJ/Kai Ng, Park Slope NYC/Emerson
Marsh, Rego Park NYC/Reese Ng, Astoria NYC/Harper Cole, Cedar City UT/Elliot
Ng, Glendale NYC/Alex Sano, Fair Lawn NJ/Avery Kerr, Stroudsburg PA/Dakota
Hale, Whippany NJ/Alex Ortiz, Mt Olive NJ/Elliot Frost, Fairless Hills
PA/Peyton Rivera, Sayreville NJ/Emerson Reid, Jersey City NJ/Riley Diaz,
Tottenville NYC/Rowan Quinn

## clients (9 rows, all fictional, @demo.retrofh.internal emails)
Marcus Webb, Priya Shah, Dante Russo, Olivia Bennett, Jamal Carter, Sanjay
Bodduluri (fictional, unrelated to the real Sanjay Bodduluri client),
Renee Castellano, Tyler Okafor, Bianca Moreau
