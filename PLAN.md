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
