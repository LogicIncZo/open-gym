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
| `src/data/parks/<city>/<slug>.json` | Park inventory records |
| `src/data/types.ts` | `Equipment`, `Category`, benefit/verdict types |
| `src/lib/circuit.ts` | Circuit builder (warm-up → alternating upper/lower → core → cool-down) |
| `src/lib/token.ts` | base64url encode/decode of the share payload |
| `src/pages/` | Routes, including `/park` (token page), `/data/*` exports, `/og/[id].svg` |
| `scripts/build-data.py` | DuckDB export |
| `public/sw.js` | Offline service worker — prefetches every page on install |

## Adding a station

Add a typed `Equipment` record to the right file in `src/data/equipment/`, then add a matching SVG key in `src/data/art.ts`. The build fails loudly if a station has no artwork or if ids are duplicated. Keep every number sourced and mark benefit claims with tier 1 (guideline), 2 (plausible) or 3 (park lore, shown to be corrected).

## Photos and video demos

Seventeen stations have a real photograph from Wikimedia Commons; the rest keep the schematic. Photos are representative examples, not pictures of one park's hardware — the schematic stays the authoritative diagram of how a station works, and each card is labelled PHOTO or DIAGRAM. A photo may only be added with an identified station, a named artist and a licence URL in `src/data/photos.ts`, plus the resized local copy in `public/photos/`. Never caption a generic outdoor-gym photo as a specific station. All attributions are rendered on `/credits`.

`/videos` and every station page list external demonstrations. Each carries the publisher's stated credential (accredited exercise scientist, clinician, certified trainer, manufacturer) or an explicit "no stated credential" — inclusion is not an endorsement. Re-check links and credentials when reviewing content.

## Adding a park

Copy `src/data/parks/chennai/natesan-park.json`, change the slug/city/inventory, and set `verified` only when someone has checked the site in person. The example park is a **demonstration entry** — keep it labelled as such. Community submissions are intended to arrive via a GitHub issue and be merged after review.

## Offline

The service worker caches the full site on first install using `/offline-manifest.json`, generated from the equipment and park data at build time. Once loaded, all station and park pages work with no signal at the park. Bump `CACHE` in `public/sw.js` when shipping a new version.

## Editorial rules

- The site is a consumer guide, not a supplier catalogue. Park-board claims get a verdict, not a repeat.
- Time numbers are programming suggestions, not prescriptions; every page carries the medical disclaimer.
- Under-5s should not use outdoor fitness stations; 5–11s only low-risk stations with an adult within arm's reach. EN 16630:2015 is written for adult/youth equipment, not playgrounds.
- English first. Tamil and Hindi strings are a later phase; the data model keeps names in all three languages where available.

## Known limitation

Share-token links render the park name in the page after load, but WhatsApp and other scrapers read only the static HTML, so their preview card shows the generic "Park circuit shared on Open Gym" title rather than the park name. Per-link OG rewriting needs an edge function; it was deliberately not added because the deploy target is static GitHub Pages. Registry park pages have real per-park OG tags.

## Status

v0.1 — draft, unreviewed by a physiotherapist. Content CC BY-SA 4.0, code MIT.
