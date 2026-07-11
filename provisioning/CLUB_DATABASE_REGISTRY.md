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

*(Slot names above are just Cloudflare labels — since a rename isn't
possible, treat "which club uses slot 03" as decided by the Registered
club column here, not by the name "jersey-city." Any of these 7 can end
up being any real club; the name is a leftover from before this registry
existed, not a commitment.)*

## Not yet created (blocked)

7 more clubs are needed for an 11-club rollout, and the account is
sitting at 9 of Cloudflare's 10-database cap with exactly 1 slot open,
being held per Ted's instruction until Keelin decides which clubs are
actually going out. **Creating any of these requires resolving the
10-database limit first** (plan upgrade, or the shared-database
architecture pivot) — see STATUS.md for the full detail on that
decision, still outstanding as of July 11.

| Slot | Cloudflare DB name | UUID | Registered club | Worker deployed? | Status |
|---|---|---|---|---|---|
| 08 | retro-fitness-club-08 | — | — | No | Not created — blocked on database limit |
| 09 | retro-fitness-club-09 | — | — | No | Not created — blocked on database limit |
| 10 | retro-fitness-club-10 | — | — | No | Not created — blocked on database limit |
| 11 | retro-fitness-club-11 | — | — | No | Not created — blocked on database limit |

(Only showing 4 more here since 7 existing + 4 = 11, matching "get all
eleven clubs deployable." The remaining 3 of the full 14-club candidate
list would need their own slots too, same blocker.)

## Fairless Hills (not part of this registry)

The real, production Fairless Hills database (`retro-crm`) is separate
from this pilot-club system entirely — it's Ted's own live club, already
fully set up with real data, not a blank template. Don't confuse it with
the numbered slots above.
