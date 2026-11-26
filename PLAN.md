# Open Gym Portal — Plan

Status: v0.1 built and deployed · 2026-11-25 (this plan is the original brief; README.md is the current handover)
Working name: **Open Gym** · live at https://logicinczo.github.io/open-gym/ (GitHub Pages base `/open-gym`)

Shipped in v0.1: all 32 illustrated stations, equipment pages, catalog filters, park builder with stateless share tokens / QR / print, one demonstration park registry entry, offline service worker, JSON/CSV/DuckDB exports, GH Pages deploy workflow and a park-submission issue form. Deferred: Tamil/Hindi UI, physiotherapist review, verified community park inventory, custom domain.

A public, open-data guide to outdoor/park gym equipment in India: what each station is, how to use it safely, how long adults and children should spend on it, what overuse does, and a builder that turns "the equipment in my park" into a shareable park page and WhatsApp-ready circuit.

---

## 1. What it is

Three things in one static site:

1. **Equipment encyclopedia** — one page per station type (~32 at launch), with illustrations, numbered usage steps, muscles worked, benefits, time guidance, overuse harms, contraindications, inspection checklist.
2. **Park pages** — a page per park listing the equipment actually installed there, a suggested circuit, local safety notes, condition flags, map, and share/print/QR affordances.
3. **Park builder** — pick the stations you see, get a shareable park page and a one-page printable circuit. No account, no backend needed for the share link.

Editorial stance: park signboards in India routinely claim things the equipment cannot do ("reduces belly fat", "cures diabetes", "improves memory"). Every equipment page carries a **"What the signboard says vs what the evidence supports"** block. That is the differentiator — a consumer-protection guide, not a manufacturer catalogue.

Audience: resident welfare associations, park walkers, seniors, parents, municipal park staff, physiotherapists, and community groups who want to use or request open gym equipment.

---

## 2. Site map

| Route | Page | Purpose |
|---|---|---|
| `/` | Home | What open gym is, safety in 60 seconds, browse equipment, build a park, find a park |
| `/equipment` | Catalog | Filter by category, muscle, age-suitability, space, difficulty; search |
| `/equipment/[slug]` | Equipment page | Full entry (template in §4) |
| `/parks` | Park registry | Community-submitted parks, by city |
| `/parks/[city]/[slug]` | Park page | Inventory, circuit, safety, map, share/QR/print |
| `/build` | Builder | Select stations → park page → share link |
| `/park?p=<token>` | Share-token park page | Stateless page decoded client-side |
| `/safety` | Safety & inspection | General rules, EN 16630 checklist, report broken equipment, disclaimer |
| `/about` | About & method | Sources, evidence tiers, licensing, review process, contribute |

---

## 3. Equipment database

### 3.1 Record fields

```
id, name{en, ta, hi}, aliases[]
category            cardio | upper | lower | core | mobility | balance | multi
prevalence          common | occasional | rare
footprint_m         approximate space needed
muscles{primary[], secondary[]}
joints_loaded[]
difficulty          1–5
summary             one line, plain language
description         2–3 paragraphs: what it is, who it suits
how_to_use[]        numbered steps, one action per step
setup               seat/handle/foot position adjustments
common_mistakes[]
easier / harder     regressions and progressions (bodyweight only)
benefits[]          {claim, evidence_tier, note}
minutes             adult{per_station, sets, rest}, child{age_band, per_station, supervision}
overuse             {acute[], chronic[], warning_signs[], avoid_if[]}
safety              {before[], during[], stop_if[]}
maintenance_flags[] loose bolts, cracked weld, missing cap, hot metal, standing water
signboard_claims[]  {claim, verdict: supported|partly|unsupported}
images              {hero, usage, muscles, alt{en, ta}}
sources[]           tiered: guideline / standard / manual / review
reviewed_by, last_reviewed, confidence
```

Evidence tiers used on every benefit claim:
- **T1** guideline-backed (WHO, ACSM, NHS, Cochrane)
- **T2** plausible / mechanistic, limited direct evidence
- **T3** park lore, unsupported — shown only to be corrected

Time numbers are **programming suggestions**, not prescriptions; that is stated on every page.

### 3.2 Sample record (abridged)

```json
{
  "id": "air-walker",
  "name": { "en": "Air Walker", "ta": "ஏர் வாக்கர்", "hi": "एयर वॉकर" },
  "aliases": ["leg swing glider", "hip glider"],
  "category": "cardio",
  "prevalence": "common",
  "muscles": { "primary": ["hip flexors", "glutes"], "secondary": ["hamstrings", "calves"] },
  "difficulty": 1,
  "summary": "Standing leg-swing glider; light cardio and hip mobility, not a strength machine.",
  "how_to_use": [
    "Step on the foot plates one at a time, holding both handles.",
    "Stand tall, ribs over hips; do not lean back into the swing.",
    "Swing legs alternately from the hip at a comfortable stride.",
    "Keep the swing smooth; stop before the hip feels pinched.",
    "Step off after the set, holding a handle until both feet are down."
  ],
  "minutes": {
    "adult": { "per_station": "3–5 min continuous, or 2 × 2 min", "sets": 1, "rest": "60 s" },
    "child": { "age_band": "12+ supervised only", "per_station": "2–3 min", "supervision": "required" }
  },
  "overuse": {
    "acute": ["hip-flexor strain from over-striding", "low-back extension strain from leaning back"],
    "chronic": ["hip flexor tendinopathy with daily long sessions"],
    "warning_signs": ["pinching at the front of the hip", "low-back ache that persists after the set"],
    "avoid_if": ["recent hip replacement without clearance", "acute low-back pain"]
  },
  "signboard_claims": [
    { "claim": "reduces belly fat", "verdict": "unsupported" },
    { "claim": "improves hip mobility", "verdict": "supported" }
  ]
}
```

### 3.3 Catalog v1 (32 stations)

Minutes are per station for a healthy adult; child guidance assumes supervision and is deliberately conservative because EN 16630-type outdoor fitness equipment is designed for adults/youth, not playground use.

| # | Station | Category | Adult | Child | Main overuse risk |
|---|---|---|---|---|---|
| 1 | Air Walker | cardio | 3–5 min | 12+ only, 2–3 min | Hip-flexor / low-back strain |
| 2 | Moon Walker | cardio | 3–5 min | 12+ only, 2–3 min | Same as air walker; ankle rolling |
| 3 | Cross Trainer | cardio | 4–6 min | 12+ only, 2–3 min | Knee/ankle overload, Achilles |
| 4 | Rider / Horse Rider | cardio | 3–5 min | 12+ only, 2–3 min | Groin/adductor strain |
| 5 | Stepper (Sky Stepper) | cardio | 3–5 min | 12+ only, 2–3 min | Patellofemoral knee pain, Achilles |
| 6 | Outdoor Exercise Bike | cardio | 5–8 min | 12+ only, 3 min | Knee pain from low seat; neck/wrist |
| 7 | Pendulum / Leg Swing | mobility | 1–2 min/side | 12+ only, 1 min | Hip impingement past comfortable range |
| 8 | Twister | mobility | 1–2 min | 12+ only, 1 min | Lumbar rotation strain, sciatica |
| 9 | Waist Bend | mobility | 1 min/side | 12+ only, 30–60 s | Side strain, lumbar shear |
| 10 | Ski Walker | cardio | 3–4 min | 12+ only, 2 min | Shoulder and low-back strain |
| 11 | Manual Treadmill Rollers | cardio | 3–5 min | 12+ only, not advised | Falls, ankle roll |
| 12 | Seated Chest Press | upper | 2–3 × 8–12 | 12+ only, 1–2 × 5–8 | Shoulder impingement, elbow lockout |
| 13 | Shoulder Press | upper | 2–3 × 8–12 | 12+ only, 1–2 × 5–8 | Impingement, neck strain |
| 14 | Lat Pulldown | upper | 2–3 × 8–12 | 12+ only, 1–2 × 5–8 | Shoulder strain, low-back rounding |
| 15 | Seated Row | upper | 2–3 × 8–12 | 12+ only, 1–2 × 5–8 | Low-back rounding, biceps tendon |
| 16 | Outdoor Rowing Machine | upper | 2–4 min | 12+ only, 2 min | Low-back strain from wrong sequence |
| 17 | Arm Paddle / Arm Wheel | upper | 2–3 min | 12+ only, 1–2 min | Rotator-cuff overuse |
| 18 | Chin-up / Pull-up Bar | upper | 2–3 × 3–8 | 12+ only, 1–2 × 1–3 | Elbow tendinopathy, blisters |
| 19 | Parallel Bars / Dips | upper | 2–3 × 5–10 | 12+ only, 1–2 × 2–5 | Anterior shoulder stress |
| 20 | Push-up Bars | upper | 2–3 × 8–12 | 12+ only, 1–2 × 5–8 | Wrist strain |
| 21 | Leg Press | lower | 2–3 × 8–12 | 12+ only, 1–2 × 5–8 | Knee pain, low-back rounding |
| 22 | Leg Extension | lower | 2–3 × 10–12 | 12+ only, 1–2 × 6–8 | Patellofemoral pain |
| 23 | Hip Adductor / Abductor | lower | 2 × 10–12 | 12+ only, 1 × 6–8 | Groin strain |
| 24 | Calf Raise Platform | lower | 2–3 × 12–15 | 12+ only, 1–2 × 8–10 | Achilles overload |
| 25 | Sit-up Board | core | 2 × 8–12 | 12+ only, 1 × 5–8 | Low-back flexion strain, neck |
| 26 | Back Extension Bench | core | 2 × 8–12 | 12+ only, 1 × 5–8 | Lumbar hyperextension, dizziness |
| 27 | Stretch Station | mobility | 1–2 min/position | 12+ only, 1 min | Overstretching, hypermobility |
| 28 | Shoulder Wheel | mobility | 1–2 min/arm | 12+ only, 1 min | Impingement in painful arc |
| 29 | Balance Beam | balance | 1–2 min | 6+ supervised, 1–2 min | Falls, ankle sprain |
| 30 | Monkey Bars | upper/play | 1–2 min | 8+ supervised, 1 min | Blisters, shoulder strain, falls |
| 31 | Climbing Net / Wall | play | 2–3 min | 6+ supervised, 2 min | Falls, finger entrapment |
| 32 | Multi-Gym Combo | multi | 8–12 min total | 12+ only, 5 min | Setup errors, pin/bolt failure |

Rare-but-real stations (leg curl, hip twister combo, outdoor pec deck, ab coaster) go in a "variants" section per category rather than getting thin pages.

---

## 4. Equipment page template

1. **Hero** — illustration of the station + one-line summary + quick facts (category, difficulty, adult minutes, child suitability).
2. **At a glance** — muscles worked (body map), joints loaded, space needed, prevalence in Indian parks.
3. **How to use** — numbered steps, each with a small diagram; setup adjustments first; "step off safely" last.
4. **Common mistakes** — 4–6, with the correction.
5. **Benefits** — tiered claims; T3 claims shown crossed out with the correction.
6. **How long** — adult table (sets/reps/rest), child table (age band + supervision), weekly context (WHO: 150–300 min moderate + 2 strength days for adults; 60 min/day active for 5–17s).
7. **Overuse and harms** — acute, chronic, warning signs, who should avoid; "same station more than ~10 min or more than 3×/week" as the overuse heuristic.
8. **Safety checks before use** — 6-point inspection (bolts, welds, caps, surface, heat, water).
9. **Signboard claims vs evidence** — the editorial block.
10. **Easier / harder** — bodyweight-only progressions, no added weights on park equipment.
11. **Found in these parks** — backlinks from the registry.
12. **Sources, reviewer, last-reviewed date, confidence.**

---

## 5. Park pages and builder

### 5.1 Builder flow

1. Search/tick the stations present (chips grouped by category).
2. Optional: park name, city, surface, shade, timings, accessibility, condition per station.
3. Pick a goal: **general fitness · senior-friendly · beginner · kids-along · short 15-min**.
4. Builder orders stations into a circuit: warm-up → alternate upper/lower/cardio → core → cool-down, with rest and total time.
5. Output: park page + share link + QR + print sheet + "copy WhatsApp message".

### 5.2 Share token (no backend)

```
https://open-gym.cashlessconsumer.in/park?p=<base64url>
payload: {"v":1,"n":"Natesan Park","c":"Chennai","e":["air-walker","twister","leg-press"],"m":{"air-walker":4},"g":"general"}
```

- Encoded client-side, decoded client-side. Selection works even with no name.
- WhatsApp is the primary share target (India), then copy-link and QR.
- Registry parks are pre-rendered static pages with real OG tags. Token links get a Netlify function that rewrites OG meta (park name, station count, circuit image) so WhatsApp previews aren't generic — otherwise they would be, and that kills sharing.
- "Save" = localStorage + JSON export/import. No accounts, no PII.

### 5.3 Park page contents

- Name, locality, city, map link (OSM + Google), surface, shade, water, timings, entry, wheelchair notes.
- Inventory cards with condition badge (good / fair / poor / broken) and last-verified date.
- Generated circuit with per-station minutes and total time.
- Safety notes **specific to the equipment present** (e.g., twister contraindications if a twister is listed).
- Share row, QR, print (A4 one-pager), report-a-problem link.
- Contributor credit (optional) and license line.

### 5.4 Registry

`parks/<city>/<slug>.json` in the repo, rendered at build. Submission via a GitHub Issue form ("Add my park": name, city, map link, equipment checklist, photos, condition). Maintainer merges → page builds. Static, moderated, spam-resistant, no database.

---

## 6. Minutes and age guidance model

| Category | Adult per station | Child (supervised) |
|---|---|---|
| Cardio | 3–6 min continuous, or 2 × 2 min | 12+ only, 2–3 min |
| Strength | 2–3 sets × 8–12, 2–4 min total | 12+ only, 1–2 sets × 5–8, bodyweight |
| Mobility | 1–2 min per side | 12+ only, 1 min |
| Balance | 1–2 min | 6+ supervised, 1–2 min |
| Full circuit | 6–8 stations, 25–35 min incl. warm-up | 12–20 min, play-based, constant supervision |

Why the child column is restrictive: EN 16630:2015 — the standard most Indian outdoor-gym suppliers cite — is written for adult/youth fitness equipment, not playground equipment. It does not size stations for children or cover fall-height/entrapment the way EN 1176 does. Under-5s should not use these stations; 5–11s only on low-risk stations (balance beam, low stepper) with an adult within arm's reach.

Weekly frame, stated once per page: WHO 2020 guidelines — adults 150–300 min moderate activity/week plus 2 strength sessions; children 5–17, 60 min/day average. Park circuits count toward those totals; they do not replace medical advice.

Overuse heuristic: >10 min on one station in a session, or the same station on consecutive days, is where repetitive-strain complaints appear. Strength stations need 48 hours before repeating.

---

## 7. Overuse and harms model

Each page separates:
- **Acute** — what goes wrong in one long session (strain, blister, dizziness, fall).
- **Chronic** — what repeated daily use produces (tendinopathy, patellofemoral pain, lumbar strain).
- **Warning signs** — the specific sensation that means stop (pinch at front of hip, tingling in the arm, low-back ache after the set).
- **Avoid if** — contraindications (pregnancy and the twister; recent joint replacement; uncontrolled hypertension and inverted/overhead work; acute disc pain and loaded rotation).

Site-wide harms page also covers environment: hot metal surfaces in Chennai afternoons, wet plates after rain, rust and exposed bolts, loose caps, standing water breeding mosquitoes, and unsupervised children.

---

## 8. Images

- **Illustration-first**, not manufacturer photos: copyright-safe and visually consistent. Flat/isometric style, warm park palette (terracotta, leaf green, sand), gender-neutral figure, no brand logos, Indian park setting.
- Per station: **hero** (equipment alone), **usage** (figure + numbered arrows), **muscle map** (one shared body silhouette SVG with highlights — generated per station, cheap and consistent).
- 32 × 3 ≈ 96 illustrations + ~10 shared assets. Generate in batches with the image-gen skill; review each for correct body position — a wrong usage drawing is worse than none.
- Optional CC-BY photos from Wikimedia Commons where coverage exists, with attribution.
- Your park photos: upload slot per park page (compressed, credited, consent noted for anyone identifiable).
- Alt text in EN + TA for every image; diagram labels localised.
- Export AVIF/WebP, lazy-load, width/height set to avoid layout shift.

---

## 9. Tech stack

- **Astro 7 + Tailwind 4**, content collections over JSON, one React island for the builder. Static output.
- **Netlify** (same pattern as cc-site): build + one function for share-token OG meta. Custom domain `open-gym.cashlessconsumer.in`; fallback `cashlessconsumer.github.io/open-gym`.
- Pagefind for search; `qrcode` client-side; `vite-plugin-pwa` for offline use at the park (images cached, equipment pages available with no signal).
- Data also published as **JSON + CSV + DuckDB** under `/data` for reuse; CC BY-SA 4.0 content, MIT code.
- Repo: `CashlessConsumer/open-gym`, source `Projects/open-gym/`.
- Why not zo.space: 32+ SEO pages, static OG per park, offline PWA, and an open repo for community contributions fit a static site better. A zo.space mirror can come later.

---

## 10. Safety, evidence, licensing

- Medical disclaimer on every page: general information, not medical advice; consult a doctor for cardiac, orthopaedic, pregnancy, or balance conditions.
- Stop rules: chest pain, dizziness, sharp joint pain, numbness/tingling, breathlessness out of proportion.
- Sources tiered and cited per page: WHO 2020 physical activity guidelines, ACSM, NHS, EN 16630:2015, manufacturer manuals, physiotherapy reviews.
- One physiotherapist review pass before v1 goes public (paid, named reviewer on `/about`). Until then the site is marked "draft, unreviewed".
- No personal data collection; park contributor names optional.
- Broken-equipment reports go to a GitHub issue with park, station, photo, date — no personal contact required.

---

## 11. Phases

| Phase | Scope | Estimate |
|---|---|---|
| P0 | Scaffold, schema, design system, 8 core stations, builder prototype | 2 days |
| P1 | All 32 stations, ~96 illustrations, equipment pages, search/filters | 4–5 days |
| P2 | Park builder, share tokens, OG function, QR, print sheet, PWA | 2–3 days |
| P3 | Registry + issue form, seed your park, field test on phone at the park | 2 days |
| P4 | Tamil/Hindi UI, physio review, more stations, analytics | ongoing |

P1 and P2 can overlap if the illustrations are batched.

---

## 12. Decisions taken (2026-11-25)

1. **Park** — Natesan Park, Chennai seeded as an explicitly labelled demonstration entry. Real verified inventory is still needed.
2. **Languages** — English first; Tamil/Hindi are a later phase.
3. **Look** — flat field-guide SVG schematics authored in `src/data/art.ts`; no supplier photos.
4. **Hosting** — GitHub Pages subpath on `LogicIncZo/open-gym`; no Netlify custom domain yet.
5. **Children** — kept the conservative 12+ line for fitness stations; play/climbing stations are a separate category with their own supervision notes.

---

# Part II — The Parks Map

*Added 2026-11-26, after reviewing `maps.reclaimchennai.city/tgsrtc` (TGSRTC bus map, `reclaimchennai/mtc-bus-map`) as the reference implementation. Phase M below is additive to v0.1; P0–P4 above are shipped or shipped-in-part.*

## 13. What the reference actually does, and what transfers

| Mechanic in `mtc-bus-map` | How it works there | Transfers to parks? |
|---|---|---|
| Static app, no build step | MapLibre GL over GeoJSON in `web/data/`; layer geometry is prebuilt by `pipeline/` scripts | **Yes, directly.** Same stack, same shape: `parks.geojson` + `equipment.geojson`. |
| Collector decoupling | Visitors never call MTC or Chalo; one server collector polls politely and everyone reads *our* copy | **Partly.** Parks aren't a rate-limited API. The equivalent is a *seed harvest* per city (OSM + municipal lists) run weekly, never on request. |
| Delta sync (`delta/<t>.json`) | First load = 1 MB; after that only changed rows, keyed on the feed's own timestamp; 404 = nothing new | **Yes, but simpler.** Parks change weekly, not every 10 s. A single `parks.delta.json` keyed on `updated_at` cursor is enough — no service needed until the layer is large. |
| Rider reports, fixed answers only | `/api/report` with a handful of buttons — full / on time / ramp worked. No free text, IPs never stored | **Yes, and this is the core.** "Broken slide", "no water", "lights out", "gym area locked", "station missing" as tap-only answers. |
| Edit → admin approve → overlay | `editor.js` posts to `edits/`; `approved.json` is laid over the network at load; `busmapMyEdits` holds your pending edits in the browser | **Yes.** Contributor submits a corrected inventory; it lands in a queue; approved edits overlay the base data for everyone. |
| Live 3D movers, ETAs, dwell model | Bespoke WebGL bus models, travel model, nowcast | **No.** Nothing about parks is live. Do not build it. |
| Dashboard rebuilt hourly from archive | `/db`: speeds, bunching, crowding | **Adapted.** The parks dashboard is not a tracker — it is a *coverage and state-of-repair* board per zone. |

The lesson is the architecture, not the feature list: **static app + git-stored data + a thin contribution queue + a build pipeline that regenerates layers.** That survives with no server and no accounts.

## 14. The reframe: parks don't move, so freshness is the product

A bus map's value decays in seconds. A park record's value decays in *months* — a swing is welded, a gate is locked, the gym area is paved over, the park is renamed after a politician. The thing a resident actually needs to know is not "where is the park" (Google has that) but:

1. **Does this park have the thing I came for?** — gym stations, a walking track of known length, a toilet that is open, drinking water, lights that work after 6 pm.
2. **Is it working right now-ish?** — as of the last verified date, what is broken.
3. **Who fixes it?** — the maintaining body (GCC zone / GHMC circle / HMDA / RWA / private) and the complaint channel.

So the portal is a **state-of-repair register**, and the headline field on every park is `lastVerified`. A park with no verification in 12 months is visibly stale, not silently wrong. That is the honest design, and it is also what makes the map worth maintaining: staleness is a prompt to act, not a bug.

## 15. Park record v2

Extends the current `src/data/parks/<city>/<slug>.json` (backward compatible — v1 records still build).

```jsonc
{
  "slug": "natesan-park",
  "name": "Natesan Park",
  "nameLocal": "நடேசன் பூங்கா",          // optional, script-preserved
  "city": "Chennai", "citySlug": "chennai",
  "zone": "Teynampet",                    // GCC zone / GHMC circle
  "kind": "park",                         // park | garden | playground | lakefront | median | community
  "geometry": {                           // polygon preferred, point+radius acceptable
    "type": "Polygon", "coordinates": [[[...]]],
    "source": "osm", "osmId": "way/123456789", "precision": "polygon" | "approximate"
  },
  "areaSqm": 12400,

  "hours": { "open": "05:00", "close": "21:00", "seasonal": null },
  "entry": { "type": "free" },            // free | ticketed | members-only | unclear
  "surface": "paved walkway; sand under equipment",

  "amenities": {                          // tri-state, never a bare boolean
    "toilets":      "yes",                // yes | no | seasonal | unclear
    "drinkingWater":"yes",
    "lighting":     "yes",
    "seating":      "yes",
    "shade":        "partial",
    "boundaryWall": "yes",
    "security":     "no",
    "parking":      "street",
    "accessibleRoute": "yes",
    "playEquipment":"yes",
    "walkingTrack": { "present": true, "lengthM": 420, "surface": "paved", "measuredBy": "gps-trace" }
  },

  "gym": {
    "present": true,
    "area": "north-east corner, sand",
    "instructor": "none",
    "stations": [ { "id": "air-walker", "condition": "good" } ]   // ids join to /data/equipment.json
  },

  "maintainer": {
    "body": "Greater Chennai Corporation",
    "unit": "Zone 9 — Teynampet",
    "channel": "GCC 1913",                // complaint route, verified or "not checked"
    "channelVerified": false
  },

  "verification": {
    "level": "contributor",               // demo | unverified | contributor | field-verified | steward
    "lastVerified": "2026-11-24",
    "verifiedBy": "contributor handle",   // optional, self-chosen, not an account
    "method": "walked the site",
    "photoCount": 3
  },

  "reports": 2,                           // open reports, aggregated at build
  "updatedAt": "2026-11-24T10:12:00+05:30",   // delta cursor
  "notes": ["..."],
  "contributor": "...",
  "disclaimer": "..."
}
```

`condition` on a station and `amenities` tri-state use the same vocabulary everywhere so a report can flip one field mechanically. `updatedAt` is the only thing the client needs to sync.

## 16. The OSM bridge — the reason this can outlive the site

Two facts found while planning, both checked against live data on 2026-11-26:

- India already has **471 `leisure=fitness_station` nodes** mapped in OSM, plus parks, playgrounds and `fitness_station=*` equipment tagged inside them.
- open-gym's 32 stations map to an **existing OSM tag value for 28 of 32** (taginfo, 500 most-used values):

| open-gym id | OSM `fitness_station=` | | open-gym id | OSM `fitness_station=` |
|---|---|---|---|---|
| pull-up-bar | `horizontal_bar` (4 802) | | leg-extension | `leg_extension` (23) |
| monkey-bars | `horizontal_ladder` (1 902) | | shoulder-press | `shoulder_press` (26) |
| parallel-bars | `parallel_bars` (1 829) | | seated-row | `seated_row` (2) |
| balance-beam | `balance_beam` (1 004) | | pendulum | `pendulum` (2) |
| sit-up-board | `sit-up` (1 503) | | treadmill-rollers | `treadmill` (9) |
| push-up-bars | `push-up` (720) | | twister | `ab_twist` (196) |
| cross-trainer | `elliptical_trainer` (553) | | moon-walker | `air_walker` (527) |
| air-walker | `air_walker` (527) | | arm-wheel, shoulder-wheel | `steering_wheel` (162) |
| exercise-bike | `exercise_bike` (487) | | back-extension | `hyperextension` (412) |
| rowing-machine | `rower` (326) | | lat-pulldown | `pull_down` (130) |
| chest-press | `chest_press` (209) | | leg-press | `leg_press` (175) |
| rider | `rider` (48) | | stepper | `stepper` (110) |
| ski-walker | `ski_swing` (112) | | stretch-station | `stretch_bars` (158) |
| climbing-net | `climbing_frame` | | | |
| **no match** | calf-raise · hip-adductor · multi-gym · waist-bend | | | |

Consequences:

1. **Seed, don't start empty.** A city's park layer begins as an OSM extract (`leisure=park` polygons + `leisure=fitness_station` + `leisure=playground` inside them), then gets enriched. Day one the map is already useful and already attributed.
2. **Contributions round-trip.** Every approved park edit can emit an `.osm` changeset fragment or a JOSM-ready file. The site becomes an on-ramp to OSM instead of a competing silo — so the data survives this project.
3. **Four missing values** (`calf_raise`, `hip_adductor`, `multi_gym`, `waist_bend`) are a proposal to the OSM tagging list, not a blocker; until accepted, map them to the nearest documented value and keep the open-gym id as the site-side truth.

`src/data/osm-crosswalk.json` will hold this table so both the site and the export script read one source.

## 17. Screens

| Route | What it is |
|---|---|
| `/map` | The map. MapLibre over `parks.geojson`. Filters: gym present, toilets, water, lights, walking track ≥ N m, last verified within X months, condition = any broken. Locate-me. Offline once cached. |
| `/parks/[city]/[slug]` | **Exists.** Gains a real map thumb, amenity table, freshness banner, maintainer + complaint channel, and "report a problem" / "correct this park" actions. |
| `/contribute` | The no-account capture flow: pin or draw the park → tick amenities → tick stations present → condition per station → photo → submit. Submits a GitHub issue (v1) or POSTs to the queue (v2). |
| `/reports` | Open reports across the area, newest first, filterable by station/amenity. Public — a broken swing that stays broken for months is the point of publishing it. |
| `/coverage` | Dashboard: parks mapped per zone, % verified in last 6/12 months, most common broken facility, top unmaintained. Rebuilt at build time, not hourly. |
| `/data/parks.json`, `.geojson`, `.csv` | The open export. Same contract as `/data/equipment.json`. |

`/build` and `/park?p=` (the stateless token builder) stay as-is and gain a "save this as a park record" button that pre-fills the contribute form — that is the shortest path from a resident's own park to a published pin.

## 18. Contribution and moderation

Two tracks, deliberately different friction:

**Track A — report (10 seconds, phone at the park).** Fixed answers only: which park, which facility/station, what's wrong (`broken`, `missing`, `locked`, `no water`, `no lights`, `unsafe`, `other`), photo optional. No free text, no name, no email. One open report per facility per 7 days per device (localStorage token, not an IP). This is the `report_api.py` pattern.

**Track B — add or correct a park (minutes, at a desk or on a walk).** The full record via `/contribute` or a GitHub issue form. Reviewed before merge. `verified: true` only after a human confirms, and only the reviewer sets `verification.level`.

Moderation is a git queue, not a database: a `queue/` directory of pending JSON, a `scripts/review.py merge|reject` CLI, and an issue label. At real volume, swap in the reclaimchennai pattern — a small service writing `approved.json` + deltas — but do not build it before there is volume.

**Anti-vandalism:** edits overlay only after approval; every record carries `verification.level` and `lastVerified`; the map defaults to showing level ≥ `contributor`; a mass-delete or edit streak from one submission batch is flagged in review. Never silently overwrite — keep prior versions in git, which is free history.

**No PII.** No accounts, no email, no IP storage, contributor handle self-chosen and optional. Photos get EXIF stripped on ingest (GPS kept as the park's, not the person's) and faces flagged for the reviewer.

## 19. Sync and offline

- Build emits `parks.geojson` (geometry + filter fields), `parks.index.json` (cards), `parks.delta.json` (records changed since a timestamp, capped at the last 90 days; older asks get a full refetch).
- Client keeps `updated_at` cursor in IndexedDB. On open: full fetch if no cursor, else one delta request. 404 = nothing new.
- Service worker caches the layer + the 32 equipment pages + the park pages you have opened, so the map, the amenity checklists and the usage guides all work standing in the park with no signal. This is the strongest single argument for building it on open-gym rather than as a separate site.
- Photos lazy-load from a resized derivative; never block map interaction.

## 20. Seeding

Per city, `scripts/seed-city.sh <city>`:

1. OSM extract via Overpass (`leisure=park|garden|playground` in the admin boundary, plus `leisure=fitness_station` and `fitness_station=*` inside) → `data/seed/<city>.geojson`.
2. Municipal open data where it exists (GCC park lists, GHMC/HMDA park lists, ward-level) → `data/seed/<city>-municipal.json`, matched to OSM by name + proximity, unmatched kept as `precision: approximate`.
3. Merge to park records with `verification.level = "unverified"` and `lastVerified = null`. **Never** invent amenities for a seeded park — absence is `unclear`, not `no`.
4. Hand-verify a first tranche (20–30 parks in one walkable zone) to `field-verified`, which is what makes the map credible.

Seed order: the city the user can actually walk first. Chennai has the existing demonstration record; Hyderabad is where the reference (TGSRTC) came from. Both are worth doing; pick one to field-verify.

## 21. Verification levels

| Level | Meaning | Shown by default |
|---|---|---|
| `demo` | Shipped example, illustrative | flagged |
| `unverified` | Seed from OSM/municipal data, nobody has walked it | grey pin |
| `contributor` | A person submitted a full record; reviewed, not visited by the reviewer | normal pin |
| `field-verified` | Reviewer or steward visited on `lastVerified` | solid pin + date |
| `steward` | Maintainer, RWA, or park staff maintains the record | solid + badge |

A park reverts to staleness (`staleSince`) after 12 months without verification. Stale is displayed, never hidden.

## 22. Phases

| Phase | Scope | Estimate |
|---|---|---|
| M0 | `osm-crosswalk.json`; park schema v2 + migration; seed script for one city; `parks.geojson` in the build — **shipped 2026-11-26** | 1.5 days |
| M1 | `/map` with filters, locate-me, park sheet, offline layer — **shipped 2026-11-26** | 2 days |
| M2 | `/contribute` capture flow + endpoint intake + `scripts/moderate.py` — **shipped 2026-11-26** | 2–3 days |
| M3 | Field-verify one zone (20–30 parks), `/coverage`, `/reports`, OSM changeset export | 2 days |
| M4 | Delta sync, second city, Tamil/Hindi labels, steward accounts-by-claim (optional) | ongoing |

M0–M1 gives a shareable map. M2 is what makes it crowdsourced. M3 is what makes it trustworthy.

## 23. Decisions taken (2026-11-26)

1. **Seed city** — Hyderabad first, expanded city by city. Seeded: 323 named parks and playgrounds from OpenStreetMap across 17.15–17.60 N, 78.20–78.65 E.
2. **Layers** — separate, not one undifferentiated dot layer: parks (documented / OSM open gym / plain), playgrounds as their own layer, and recorded stations. Amenity chips (toilets, drinking water) are filters over the park layer, not layers of their own.
3. **Scope of "public park"** — only publicly accessible parks, including paid-entry ones. Paid entry is recorded as a `kind` of public park so a ticketed botanical garden is not excluded; wholly private/commercial sites are out.
4. **Verification** — anonymous. No account, no email. A GPS fix within 150 m of the park pin files the report as `field-verified` on its own; anything else is `self-declared`. The radius is applied server-side, never in the browser.
5. **Photos** — optional, accepted with explicit consent, re-encoded through a canvas and then stripped again server-side by segment (`services/intake/strip-meta.ts`) so a direct POST cannot carry camera GPS either.

## 24. Open decisions

1. **Which Hyderabad zone gets walked first** — the survey queue is published per city; the first 20–30 recorded parks should come from one contiguous zone so the coverage page has something to show.
2. **Second city** — Chennai carries the demonstration record and the GCC parks register; Bengaluru has the Commons photo set. Either is a one-command seed once someone will walk it.
3. **Publish-to-OSM on approval** — auto-generate the changeset fragment for the reviewer to upload, or leave OSM entirely to the contributor. Recommendation: generate it, human uploads. Never auto-upload to OSM.
4. **Scope of `kind`** — parks only, or also playgrounds, lakefronts and median green. Recommendation: include them; residents do not distinguish, and a lakefront walk is the same use case.

## 24. Decisions taken (2026-11-26) — the answer to §23

1. **Seed city: Hyderabad.** Expanded slowly from there. Chennai keeps its existing demonstration record; no other city is seeded until Hyderabad is walked.
2. **Separate layer, not a separate site.** The map lives at `/map` inside open-gym, so the 32 station pages, the safety page and the offline cache are one thing. A park dot links into the station page for whatever is recorded there.
3. **Public parks only, paid entry included.** `kind` = `public` | `paid` | `complex`; `leisure=playground` is folded into a `play` layer rather than a park of its own. The city page and map both show paid parks as paid, and a paid park with no recorded equipment still reads as *unrecorded*, never as *empty*.
4. **Anonymous verification from a GPS fix.** No account, no name, no IP stored. If the browser fix lands within 150 m of the park pin the report is filed `field-verified`; outside it, `self-declared`. Two independent observations of the same park make it `pair-observed`.
5. **Photos are optional and stripped.** The page draws the image to a canvas before upload, which drops every EXIF block (including GPS and device model); the server stores the re-encoded JPEG with no filename and no IP.

### What that turned into

| Piece | Where |
|---|---|
| City inventory from OSM (canvas) | `scripts/seed_city.py` → `src/data/city-index/<city>.json` |
| Map with layers and filters | `src/pages/map.astro` + `src/pages/data/parks.geojson.ts` |
| Anonymous capture flow | `src/pages/contribute.astro` |
| Intake + validation + storage | `services/intake/server.ts`, deployed as the zo.space route `/api/gym-report` (+ `/stats`) |
| Accept a report into a park record | `scripts/moderate.py accept <id>` |
| City landing + survey queue | `src/pages/parks/[city]/index.astro` |

Implemented ladder (this supersedes the table in §21, which was written before the schema existed):

| Level | How it is reached | Shown as |
|---|---|---|
| `osm-import` | OpenStreetMap only; nobody has walked it | grey |
| `linking` | OSM station tags matched to the 32-station vocabulary | amber |
| `contributor` | Submitted, fix did not land in the park | amber |
| `field-verified` | Anonymous GPS fix within 150 m | solid |
| `pair-observed` | Two independent fixes agree | solid + badge |

### First measured coverage, Hyderabad, 2026-11-26

- 5,490 park-ish OSM elements in the greater-Hyderabad bbox, 323 named parks after tiling and de-duplication.
- **Four** exercise stations mapped in the whole metro; two carry no `fitness_station` tag, so they cannot be matched to the vocabulary. One park (Gachibowli) is tagged `leisure=fitness_station` without station detail.
- Zero parks have a station-level record. The map therefore ships with a truthful scoreboard: 323 parks, 0 with equipment listed.

That number is the argument for the project. The OSM park canvas is good; the equipment record does not exist, because recording it takes a person standing in the park. §20 item 4 (hand-verify one walkable zone) is the next step and stays human work.


---

## 24. Decisions taken (2026-11-26)

Settled with the project owner, and built:

1. **City order — Hyderabad first.** It is where the reference map (TGSRTC crowdsourcing) came from, and the OSM baseline is instructive: 323 named parks, 2 areas tagged `sport=fitness` with no station detail, 0 station-level records. Chennai keeps its demonstration record and gets seeded when the Hyderabad tranche is walked. Expansion after that is one `seed_city.py` run plus a walk.
2. **Separate layer.** The map carries three layers — parks, play equipment, recorded stations — toggled independently, with amenity filters (toilets, drinking water) on top. Playgrounds are not gyms and are not presented as gyms anywhere.
3. **Only public parks, paid entry allowed.** `kind` distinguishes `public`, `paid` and `playground`; `access` records free/paid/members. Private residential-society and commercial gyms are out of scope.
4. **Anonymous verification with a GPS fix.** A fix inside 150 m of the park pin is itself the verification — no account needed, and it lifts the record to `field-verified`. Outside that radius the report is still accepted but filed as `self-declared` so nothing is silently overstated. Two independent verifications escalate to `pair-observed`.
5. **Photo submission.** Optional, consent-gated, re-encoded to strip EXIF (including GPS), stored without a reporter name, and never required for a valid report.

Rejected on the way: a GitHub-issue-only intake (requires an account, which kills the walk-up contributor), and auto-publishing accepted reports (nothing enters the registry without a human accepting it).

Open: whether accepted `field-verified` reports should publish an OSM changeset fragment automatically (recommendation stands: generate, human uploads), and when to open the second city.

## 25. Current state

| Area | State |
|---|---|
| Station catalogue | 32 stations, illustrated, photographed where licensed, 25 mapped to OSM tags, 4 proposed |
| Park registry | 1 page (Chennai demonstration record); Hyderabad records arrive via moderation |
| Park canvas | Hyderabad 323 parks · 1 OSM-tagged open gym, equipment unknown |
| Map | Built: 3 layers, 6 filters, city chips, deep link into the capture form |
| Capture | Built: GPS-gated, 32-station checklist, amenities, photo, anonymous |
| Intake | Live at `cashlessconsumer.zo.space/api/gym-report`, CORS-restricted, EXIF stripped |
| Moderation | `scripts/moderate.py` list / accept / reject |
| Tests | typecheck 0 errors, 47 pages build, offline PWA intact |

---

# Part III — What was built (2026-11-26)

The plan above is the design. This section records what actually shipped and where it departed from the plan.

## Decisions taken

1. **City order — Hyderabad first.** Against the plan's open question (#23.1). Hyderabad is where the reference map came from and where the user can walk. Chennai keeps its demonstration record.
2. **Play equipment is a separate layer, not a park kind.** `leisure=playground` is drawn on its own filter so a parent looking for a swing is not reading a fitness circuit. Park records keep `kind: public | paid`.
3. **Public parks only, paid-entry included.** No commercial gyms, no gated society lawns. `fee=yes` parks are kept and badged.
4. **Anonymous verification by GPS fix.** Because the case for excluding commercial gyms is "parks are public", the same logic allows an on-site fix to stand as a verification without an account. 150 m radius; stored rounded; nothing else about the reporter kept.
5. **Photos accepted.** Re-encoded server-side so EXIF (GPS, serials) is stripped before storage.
6. **Intake is a small external endpoint, not a GitHub issue.** The plan's recommendation (#23.2) was GitHub for full records, endpoint for tap-only reports. In practice both paths converge on the same form, and requiring a GitHub account for a walker is a hard stop. One endpoint, one queue, moderation is the gate.
7. **Park inventory ≠ park registry.** 1,283 park-ish OSM elements in greater Hyderabad collapsed to 323 named parks by slug dedupe; pages are only minted where equipment has actually been recorded.

## What the seed found

Greater Hyderabad, bbox 17.15,78.20 → 17.60,78.65:

| | |
|---|---|
| Named parks, playgrounds, gardens | 323 |
| `leisure=fitness_station` elements | 4 |
| With a `fitness_station=*` value (i.e. mappable to a station) | 0 |
| Open gyms tagged as an area, no station detail | 1 (Gachibowli Park) |
| Park records with equipment listed | 0 |

This is the argument for the project stated as a number: the largest open-data source on earth holds almost nothing about the gyms people actually use. The map is not a scrape of existing knowledge; the knowledge does not exist yet.

## Deferred, with reasons

- **Polygons.** The seed fetches `out center tags`, so parks are points. Real outlines need an `out geom` pass and a heavier build; points carry the survey use case.
- **Delta sync / IndexedDB cursor** (§19). The full GeoJSON is 346 features and compresses small; the delta machinery is not worth it until a second city is dense.
- **Publish-to-OSM changeset export** (#23.3). Deferred, not dropped — and when it lands it must stay human-uploaded.
- **Municipal park lists.** GHMC publishes no machine-readable list worth matching against; the OSM set is the honest starting canvas.
