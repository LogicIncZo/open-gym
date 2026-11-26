# Open Gym

An open, illustrated field guide to India's outdoor park gym equipment. 32 stations with usage steps, muscles worked, benefits graded by evidence tier, adult/child time guidance, overuse harms, safety checks and a "what the signboard claims vs what the evidence supports" block. Build a page for your park from the stations actually installed there, get a circuit, and share it by link, WhatsApp or QR.

Live: <https://logicinczo.github.io/open-gym/> · Repo: <https://github.com/LogicIncZo/open-gym>

No accounts, no tracking, no personal data. Site is a static Astro build; sharing works without a backend because the park selection is a base64url token in the URL.

## Build locally

Requires **Node ≥ 22.23.4** (Astro 7 refuses older Node) and Bun.

```bash
bun install
bun run check     # type check
bun run build     # static output in dist/
bun run preview   # serves at http://localhost:4321/open-gym/
```

On this workspace the system Node is older; use `PATH=/opt/node22/bin:$PATH bun run build`.

To regenerate the DuckDB export: `pip install duckdb && python3 scripts/build-data.py` (reads `dist/data/equipment.json`, writes `dist/data/equipment.duckdb`). The deploy workflow does this automatically.

## Structure

| Path | What lives there |
|---|---|
| `src/data/equipment/*.ts` | The catalogue — one typed record per station, grouped by category |
| `src/data/art.ts` | 32 hand-authored SVG schematics (240×160, shared field-guide style) |
| `src/data/photos.ts` | Representative Commons photos mapped to station ids, with artist + licence |
| `src/data/videos.ts` | Hand-curated external demos with stated-presenter credentials |
| `public/photos/` | Resized, locally hosted copies of the licensed station photos |
| `src/data/city-index/<city>.json` | Park canvas from OpenStreetMap — every named park, whether or not equipment is recorded |
| `src/data/osm-reports/` | OSM elements the crosswalk could not map to one of the 32 stations |
| `src/data/parks/<city>/<slug>.json` | Park records that have a page (equipment listed) |
| `src/data/types.ts` | `Equipment`, `Category`, benefit/verdict types |
| `src/lib/circuit.ts` | Circuit builder (warm-up → alternating upper/lower → core → cool-down) |
| `src/lib/token.ts` | base64url encode/decode of the share payload |
| `src/pages/` | Routes, including `/park` (token page), `/data/*` exports, `/og/[id].svg` |
| `scripts/seed_city.py` | OSM seed for a city: tiles Overpass, writes the city index + any park with mapped stations |
| `scripts/moderate.py` | Review queue: accept a report into the registry, reject it, or list pending |
| `services/intake/server.ts` | Optional self-hosted intake endpoint (same contract as the Zo route) |
| `public/sw.js` | Offline service worker — prefetches every page on install |

## Adding a station

Add a typed `Equipment` record to the right file in `src/data/equipment/`, then add a matching SVG key in `src/data/art.ts`. The build fails loudly if a station has no artwork or if ids are duplicated. Keep every number sourced and mark benefit claims with tier 1 (guideline), 2 (plausible) or 3 (park lore, shown to be corrected).

## Photos and video demos

Seventeen stations have a real photograph from Wikimedia Commons; the rest keep the schematic. Photos are representative examples, not pictures of one park's hardware — the schematic stays the authoritative diagram of how a station works, and each card is labelled PHOTO or DIAGRAM. A photo may only be added with an identified station, a named artist and a licence URL in `src/data/photos.ts`, plus the resized local copy in `public/photos/`. Never caption a generic outdoor-gym photo as a specific station. All attributions are rendered on `/credits`.

`/videos` and every station page list external demonstrations. Each carries the publisher's stated credential (accredited exercise scientist, clinician, certified trainer, manufacturer) or an explicit "no stated credential" — inclusion is not an endorsement. Re-check links and credentials when reviewing content.

## The parks map

`/map` draws the park canvas over an OpenStreetMap basemap, with layers you can switch on and off and filters that combine city with what a walker actually cares about: equipment recorded, an open gym tagged in OSM but never surveyed, toilets, drinking water, play equipment. A park with no equipment record is drawn as an invitation, not a gap — its popup carries a link straight into the recording flow, park pre-filled.

The park inventory is deliberately wider than the page registry. A city page (`/parks/<city>/`) states both numbers and publishes the **survey queue** — parks nobody has walked yet — so a community can divide the list up.

Hyderabad is the first seeded city: 323 named parks mapped, 1 tagged in OSM as an open gym with no station detail, 0 with an equipment listing. That zero is the honest starting point, and the reason the intake form exists. Cities are added one at a time: `python3 scripts/seed_city.py --city <Name> --bbox <s,w,n,e> --tiles 4`.

Seeding is resumable. Overpass is flaky under load, so tiles are cached in `.cache/osm/<city>/` and a failed slice is retried on the next pass instead of aborting the run. The script writes `src/data/city-index/<city>.json` (the map canvas), a park page only where stations exist, and `src/data/osm-reports/<city>-unassigned-stations.json` for elements it could not attach — usually `sport=fitness` areas with no `fitness_station` tag, which carry a gym's presence but not its contents. Those are recorded as *open gym, not yet surveyed*, never guessed into a station list.

## Recording a park without an account

`/contribute` is a four-step form: fix your location, pick the park you are standing in, tick what is there, add a photo. No sign-up, no login, no email field.

The location fix decides the claim level, and the decision is made on the server, not in the browser:

| Your fix | Filed as | What the park page says |
|---|---|---|
| Within 150 m of the park pin | `field-verified` | GPS-verified on site |
| Further away, or no location | `self-declared` | Contributed, position not confirmed |
| Same park verified twice, independently | `pair-observed` | Two independent checks agree |

The fix is used once, for that comparison, then stored as a coordinate rounded to about 10 m. No IP address, user agent, cookie or device identifier is written to the record. A photo is optional and a report without one is fully valid; when there is a photo, the browser re-encodes it through a canvas (which drops EXIF) and the server strips metadata again by removing the EXIF/XMP/IPTC segments, so a request posted directly — bypassing the page — still cannot carry camera GPS, timestamps or a device serial into storage. A file whose metadata cannot be removed is refused rather than stored.

## Intake and moderation

Reports go to `POST /api/gym-report`, CORS-restricted to the published origin, and are written to `intake/reports/<YYYY-MM>/<uuid>.json` — gitignored apart from a placeholder, so contributor data never enters the public repository. `GET /api/gym-report/stats` returns counters and accepted reports only.

Nothing reaches the public site automatically:

```bash
python3 scripts/moderate.py list                                  # queue: claim level, distance, stations, note
python3 scripts/moderate.py accept <id>                           # writes/merges src/data/parks/<city>/<slug>.json
python3 scripts/moderate.py reject <id> --why "duplicate of ..."  # records the reason
python3 scripts/moderate.py stats
```

Accepting a `field-verified` report creates or upgrades the record to that level; a `self-declared` one is merged but stays below the verification threshold. Re-run the build after accepting.

The endpoint is deliberately tiny so it can be re-hosted: `services/intake/server.ts` is a standalone Bun server with the same request/response contract, radius rule and metadata stripping. Point the `INTAKE` constant in `src/pages/contribute.astro` at your own instance to run a fork without the Zo dependency.

## Offline

The service worker caches the full site on first install using `/offline-manifest.json`, generated from the equipment, city and park data at build time — including `/map`, the park GeoJSON and every city page. Once loaded, the station pages, the park layers and the city survey lists all work with no signal at the park; only submitting a report needs a connection. Bump `CACHE` in `public/sw.js` when shipping a new version.

## Editorial rules

- The site is a consumer guide, not a supplier catalogue. Park-board claims get a verdict, not a repeat.
- Time numbers are programming suggestions, not prescriptions; every page carries the medical disclaimer.
- Under-5s should not use outdoor fitness stations; 5–11s only low-risk stations with an adult within arm's reach. EN 16630:2015 is written for adult/youth equipment, not playgrounds.
- English first. Tamil and Hindi strings are a later phase; the data model keeps names in all three languages where available.

## Known limitation

Share-token links render the park name in the page after load, but WhatsApp and other scrapers read only the static HTML, so their preview card shows the generic "Park circuit shared on Open Gym" title rather than the park name. Per-link OG rewriting needs an edge function; it was deliberately not added because the deploy target is static GitHub Pages. Registry park pages have real per-park OG tags.

## Status

v0.1 — draft, unreviewed by a physiotherapist. Content CC BY-SA 4.0, code MIT.
