# Club Database Registry

This is the master index Ted asked for: which physical Cloudflare D1
database maps to which real club. The registry is the source of truth —
Cloudflare's own database names are just labels and can't be renamed
after creation (no rename API), so don't rely on the Cloudflare name
alone to know what's what. Check this file.

**How registration actually happens:** a slot's database starts
genuinely blank (see `schema.sql` — no club info pre-filled). The first
time someone opens that club's Command Center, they get walked through
the Club Setup wizard, which is the moment a real club name gets
attached to that slot. Update the "Registered club" column here once
that's happened — the `gyms` table inside that specific database is the
real, live source of truth for the club's name; this file is the human
index for looking across all of them at once.

**Naming convention going forward:** any new database created from here
on should be named `retro-fitness-club-{next number}`, not a guessed
club name — since which of the 14 candidate clubs actually end up
deployed isn't decided yet (that's Keelin's call). The 7 below were
created before this convention was adopted and still carry club-specific
Cloudflare names; they were never actually claimed by that club (see
Status column) since their `gyms` tables were deliberately cleared back
to blank on July 11 once this registry approach was decided.

| Slot | Cloudflare DB name | UUID | Registered club | Worker deployed? | Status |
|---|---|---|---|---|---|
| 01 | retro-fitness-forest-hills | 5e84df74-7f0f-4fcd-ac3b-58424f7f99ee | — not yet — | No | Blank, ready to be claimed by any club |
| 02 | retro-fitness-glendale | 575c1c1e-a638-41db-baae-43cc3e0ecfcb | — not yet — | No | Blank, ready to be claimed by any club |
| 03 | retro-fitness-jersey-city | 5a31c0f3-04b0-45eb-aec1-42d29cfb0415 | — not yet — | No | Blank, ready to be claimed by any club |
| 04 | retro-fitness-cedar-city | 27db9825-0be1-4f77-9782-7b1ad1fe745c | — not yet — | No | Blank, ready to be claimed by any club |
| 05 | retro-fitness-rego-park | 738c18af-6c79-49e6-8ade-f3e76fefdfc4 | — not yet — | No | Blank, ready to be claimed by any club |
| 06 | retro-fitness-fairfield | 84308712-2c6d-4e8e-b20e-6b6edabbb20e | — not yet — | No | Blank, ready to be claimed by any club |
| 07 | retro-fitness-tottenville | fce60e14-47f5-464d-be7c-93913255c8b0 | — not yet — | No | Blank, ready to be claimed by any club |
| 08 | retro-fitness-club-08 | 94a6bf25-46e5-464d-bc1a-174af8705bb1 | — not yet — | No | Blank, ready to be claimed by any club |
| 09 | retro-fitness-club-09 | dc7deb6d-e127-49a5-9a65-72b3565d2e71 | — not yet — | No | Blank, ready to be claimed by any club |
| 10 | retro-fitness-club-10 | 782b7313-ac0b-4558-be07-5f2a033c492a | — not yet — | No | Blank, ready to be claimed by any club |
| 11 | retro-fitness-club-11 | fa689353-5a1a-4bde-9684-d516d64da0a0 | — not yet — | No | Blank, ready to be claimed by any club |

*(Slot names above are just Cloudflare labels — since a rename isn't
possible, treat "which club uses slot 03" as decided by the Registered
club column here, not by the name "jersey-city." Any of these 11 can end
up being any real club; the name is either a leftover from before this
registry existed (slots 01-07) or a generic number (slots 08-11), not a
commitment either way.)*

## All 11 slots for the pilot are now provisioned

As of July 11, all 11 databases needed for the pilot rollout exist and
are seeded (93 real tables each, genuinely blank `gyms` table). This
became possible after Ted upgraded the Cloudflare plan, which raised the
10-database account cap. Each one still needs its own Worker deployed
(Steps 2-6 of NEW_CLUB_SETUP.md) before a real club can actually use it
— database existing is necessary but not sufficient.

## Beyond 11 (3 more of the 14-club candidate list)

If more than 11 of the 14 candidate clubs end up going out, or if any of
these 11 turn out not to be used, 3 more slots would be needed for the
full 14. Given the plan upgrade already raised the limit once, check the
current count against whatever the new limit actually is before assuming
this is blocked again — it may not be.


## Fairless Hills (not part of this registry)

The real, production Fairless Hills database (`retro-crm`) is separate
from this pilot-club system entirely — it's Ted's own live club, already
fully set up with real data, not a blank template. Don't confuse it with
the numbered slots above.
