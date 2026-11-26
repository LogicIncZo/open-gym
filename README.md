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
| `src/pages/` | Routes: `/map`, `/contribute`, `/parks/<city>/`, `/park` (token page), `/data/*` exports, `/og/[id].svg` |
| `scripts/seed_city.py` | OSM seed for a city: tiles Overpass, writes the city index + any park with mapped stations |
| `scripts/moderate.py` | Review queue: accept a report into the registry, reject it, or list pending |
| `services/intake/server.ts` | Optional self-hosted intake endpoint (same contract as the Zo route) |
| `services/intake/strip-meta.ts` | Segment-level EXIF/XMP/IPTC removal for JPEG, PNG and WebP |
| `public/sw.js` | Offline service worker — prefetches every page on install |

## Adding a station

Add a typed `Equipment` record to the right file in `src/data/equipment/`, then add a matching SVG key in `src/data/art.ts`. The build fails loudly if a station has no artwork or if ids are duplicated. Keep every number sourced and mark benefit claims with tier 1 (guideline), 2 (plausible) or 3 (park lore, shown to be corrected).

## Photos and video demos

Seventeen stations have a real photograph from Wikimedia Commons; the rest keep the schematic. Photos are representative examples, not pictures of one park's hardware — the schematic stays the authoritative diagram of how a station works, and each card is labelled PHOTO or DIAGRAM. A photo may only be added with an identified station, a named artist and a licence URL in `src/data/photos.ts`, plus the resized local copy in `public/photos/`. Never caption a generic outdoor-gym photo as a specific station. All attributions are rendered on `/credits`.

`/videos` and every station page list external demonstrations. Each carries the publisher's stated credential (accredited exercise scientist, clinician, certified trainer, manufacturer) or an explicit "no stated credential" — inclusion is not an endorsement. Re-check links and credentials when reviewing content.

## The parks map

`https://logicinczo.github.io/open-gym/map` draws the park canvas from OpenStreetMap in separate layers: parks, playgrounds (the play layer), open gyms tagged in OSM but never surveyed, and parks with a recorded station list. Filters combine city and what a walker actually cares about — equipment recorded, open gym in OSM, toilets, drinking water, play equipment. Choosing the play layer clears the gym layer on purpose: a swing is not a fitness circuit.

The park inventory is deliberately wider than the page registry. Hyderabad, the first seeded city, has **323 named parks mapped, 1 tagged in OSM as an open gym with no station detail, and 0 with a station-level listing.** That zero is the honest baseline, and the reason the intake form exists. `/parks/hyderabad/` states those numbers and publishes the **survey queue** — every park nobody has walked yet, each linking straight into the capture form — so a community can divide the list up instead of re-walking the same park.

## Recording a park without an account

`/contribute` is a four-step form: fix your location, pick the park, tick what is there, add a photo. No account, no login, no email field.

Verification is decided by the server, not the browser, so it cannot be set by editing the request:

| Fix | Filed as | What the park page says |
|---|---|---|
| Within 150 m of the park pin | `field-verified` | GPS-verified on site once |
| Further away | `self-declared` | Contributed, position not confirmed |
| No fix at all | `self-declared` | Contributed, position not confirmed |
| Same park verified twice, independently | `pair-observed` | Two independent checks agree |

The fix is compared with the park pin at submit time and stored rounded to about 10 m. No IP address, user agent, cookie or device id is written to the record. Photos are optional; a report without one is fully valid.

Photo metadata is removed twice. The browser re-encodes through a canvas, which drops EXIF; the server then strips the remaining segments (JPEG APP1/APP2/APP13/COM, PNG eXIf/tEXt/iTXt/zTXt/tIME, WebP EXIF/XMP) without decoding the pixels. A photo whose metadata cannot be removed is refused rather than stored, so a camera's GPS, timestamp and serial number cannot reach the intake directory even if the page is bypassed.

## Intake and moderation

Reports go to `POST /api/gym-report`, CORS-restricted to the published origin, and are written to `intake/reports/<YYYY-MM>/<uuid>.json` on the maintainer's machine. That directory is gitignored apart from a placeholder: contributor data never enters the public repository. `GET /api/gym-report/stats` and `/recent` return counters and accepted reports only.

Nothing reaches the public site automatically.

```bash
python3 scripts/moderate.py list              # the queue, with claim level, distance and note
python3 scripts/moderate.py accept <id>       # writes/merges src/data/parks/<city>/<slug>.json
python3 scripts/moderate.py reject <id> --why "duplicate of an existing record"
python3 scripts/moderate.py stats
```

Accepting a `field-verified` report creates or upgrades the park record to that level; a `self-declared` one is merged but stays below the verification threshold. Re-run the build after accepting.

The endpoint is deliberately small so it can be re-hosted: `services/intake/server.ts` is a standalone Bun server with the same contract, the same radius rule and the same metadata stripping. Point the `INTAKE` constant in `src/pages/contribute.astro` at your own instance to run a fork without the Zo dependency.

## Seeding a city

```bash
python3 scripts/seed_city.py --city Hyderabad --bbox 17.15,78.20,17.60,78.65 --tiles 4
```

Overpass is flaky under load, so slices are cached in `.cache/osm/<city>/` and a failed slice is retried on the next pass instead of aborting the run. The script writes `src/data/city-index/<city>.json` (the map canvas), a park record only where stations were actually mapped, and `src/data/osm-reports/<city>-unassigned-stations.json` for elements it could not attach — usually `sport=fitness` areas with no `fitness_station` tag, which carry a gym's presence but not its contents. Those become *open gym, not yet surveyed*, never guessed into a station list. Duplicate names are collapsed by slug, because the same park drawn as two OSM ways is one park.

Cities start with Hyderabad. Add another by running the same command with a new name and bbox.

## Adding a park by hand

Copy `src/data/parks/chennai/natesan-park.json`, change the slug, city and inventory, and set the verification block only to what someone has actually checked. The Chennai example is a **demonstration entry** — keep it labelled as such.

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

Live at https://logicinczo.github.io/open-gym/ — 32 stations, 17 with a licensed photo, the parks map seeded for Hyderabad, and an anonymous intake queue with no records accepted yet. Content CC BY-SA 4.0, code MIT. The station guidance is a draft and has not been reviewed by a physiotherapist; the park inventory is OSM-derived and has not been field-walked.
