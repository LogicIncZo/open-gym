#!/usr/bin/env python3
"""Seed a city's park records from OpenStreetMap.

Tiles the city bounding box into a grid, fetches parks / fitness stations /
toilets / drinking water per tile from Overpass, caches every tile on disk,
then joins stations and amenities to the park that contains them (or the
nearest park within 120 m) and writes one JSON record per park under
src/data/parks/<city-slug>/.

Every record is written with verification.level = "osm-import" and station
condition "unknown". Nothing here is a field observation: the seeder harvests
what mappers recorded and nothing more. A contributor confirming a park on the
ground replaces the level.

Usage:
    python3 scripts/seed_city.py --city Hyderabad --bbox 17.15,78.20,17.60,78.65
    python3 scripts/seed_city.py --city Hyderabad --dry-run
    python3 scripts/seed_city.py --city Hyderabad --tiles 3 --refresh

Overpass mirrors reject an identical query twice in quick succession
(duplicate_query), so failures are retried with jitter and every tile is cached.
"""

from __future__ import annotations

import argparse
import hashlib
import datetime
import json
import math
import random
import re
import sys
import time
import unicodedata
import urllib.parse
import urllib.request
from pathlib import Path

ROOT = Path(__file__).resolve().parent.parent
OUT_DIR = ROOT / "src" / "data" / "parks"
CACHE_DIR = ROOT / ".cache" / "osm"

ENDPOINTS = [
    "https://maps.mail.ru/osm/tools/overpass/api/interpreter",
    "https://overpass.osm.ch/api/interpreter",
    "https://overpass.kumi.systems/api/interpreter",
    "https://overpass.monicz.dev/api/interpreter",
]
# overpass.osm.ch serves a Swiss-only extract and answers Indian queries with
# HTTP 200 + zero elements, which the retry loop cannot distinguish from a
# genuinely empty result. Never put a region-limited mirror in this list.

UA = "open-gym-seed/0.2 (+https://github.com/LogicIncZo/open-gym)"

# OSM fitness_station values -> our equipment ids. Unmapped values are kept in
# station.osmTag so a later mapping pass does not lose the row.
OSM_TO_STATION = {
    "horizontal_bar": "pull-up-bar",
    "pull_up_bar": "pull-up-bar",
    "pullup_bar": "pull-up-bar",
    "chin_up_bar": "pull-up-bar",
    "push_up": "push-up-bars",
    "push_up_bar": "push-up-bars",
    "dip_bench": "parallel-bars",
    "parallel_bars": "parallel-bars",
    "dip_bar": "parallel-bars",
    "uneven_bars": "parallel-bars",
    "air_walker": "air-walker",
    "airwalker": "air-walker",
    "cross_trainer": "cross-trainer",
    "elliptical": "cross-trainer",
    "ski_walker": "ski-walker",
    "skier": "ski-walker",
    "leg_press": "leg-press",
    "chest_press": "chest-press",
    "shoulder_press": "shoulder-press",
    "lat_pulldown": "lat-pulldown",
    "lat_pull_down": "lat-pulldown",
    "seated_row": "seated-row",
    "rowing_machine": "rowing-machine",
    "rider": "rider",
    "leg_extension": "leg-extension",
    "back_extension": "back-extension",
    "sit_up": "sit-up-board",
    "sit_up_bench": "sit-up-board",
    "ab_bench": "sit-up-board",
    "twister": "twister",
    "waist": "waist-bend",
    "hip_adductor": "hip-adductor",
    "stepper": "stepper",
    "stair_climber": "stepper",
    "balance_beam": "balance-beam",
    "monkey_bars": "monkey-bars",
    "climbing_frame": "climbing-net",
    "climbing_net": "climbing-net",
    "climbing_wall": "climbing-net",
    "calf_raise": "calf-raise",
    "shoulder_wheel": "shoulder-wheel",
    "arm_wheel": "arm-wheel",
    "moon_walker": "moon-walker",
    "treadmill": "treadmill-rollers",
    "exercise_bike": "exercise-bike",
    "static_bike": "exercise-bike",
    "multi_gym": "multi-gym",
    "multi-gym": "multi-gym",
    "pendulum": "pendulum",
    "stretch": "stretch-station",
    "stretching_station": "stretch-station",
}

PARK_TYPES = ("park", "playground", "garden")


def slugify(s: str, fallback: str = "park") -> str:
    s = unicodedata.normalize("NFKD", s or "")
    s = "".join(c for c in s if not unicodedata.combining(c))
    s = re.sub(r"[^a-zA-Z0-9]+", "-", s).strip("-").lower()
    s = re.sub(r"-{2,}", "-", s)
    return s or fallback


def metres(a_lat: float, a_lon: float, b_lat: float, b_lon: float) -> float:
    dy = (a_lat - b_lat) * 111_320
    dx = (a_lon - b_lon) * 111_320 * math.cos(math.radians((a_lat + b_lat) / 2))
    return math.hypot(dx, dy)


def point_in_ring(ring: list[list[float]], lon: float, lat: float) -> bool:
    inside = False
    n = len(ring)
    if n < 3:
        return False
    j = n - 1
    for i in range(n):
        xi, yi = ring[i][0], ring[i][1]
        xj, yj = ring[j][0], ring[j][1]
        if (yi > lat) != (yj > lat):
            x_int = (xj - xi) * (lat - yi) / ((yj - yi) or 1e-12) + xi
            if lon < x_int:
                inside = not inside
        j = i
    return inside


def centre(el: dict) -> tuple[float, float] | None:
    if "lat" in el and "lon" in el:
        return el["lat"], el["lon"]
    if "center" in el:
        return el["center"]["lat"], el["center"]["lon"]
    geom = el.get("geometry") or []
    lats = [p["lat"] for p in geom if "lat" in p]
    lons = [p["lon"] for p in geom if "lon" in p]
    if lats and lons:
        return sum(lats) / len(lats), sum(lons) / len(lons)
    b = el.get("bounds")
    if b:
        return (b["minlat"] + b["maxlat"]) / 2, (b["minlon"] + b["maxlon"]) / 2
    return None


def ring_of(el: dict) -> list[list[float]] | None:
    geom = el.get("geometry") or []
    ring = [[round(p["lon"], 6), round(p["lat"], 6)] for p in geom if "lon" in p and "lat" in p]
    return ring if len(ring) >= 4 else None


def poly_area_ha(ring: list[list[float]]) -> float:
    if len(ring) < 4:
        return 0.0
    lat0 = ring[0][1]
    kx = 111_320 * math.cos(math.radians(lat0))
    ky = 111_320
    s = 0.0
    for i in range(len(ring) - 1):
        x1, y1 = ring[i][0] * kx, ring[i][1] * ky
        x2, y2 = ring[i + 1][0] * kx, ring[i + 1][1] * ky
        s += x1 * y2 - x2 * y1
    return abs(s) / 2 / 10_000


def overpass(query: str) -> dict:
    last = None
    for attempt in range(len(ENDPOINTS) * 2):
        endpoint = ENDPOINTS[attempt % len(ENDPOINTS)]
        try:
            url = endpoint + "?" + urllib.parse.urlencode({"data": query})
            req = urllib.request.Request(url, headers={"User-Agent": UA})
            with urllib.request.urlopen(req, timeout=150) as resp:
                body = resp.read().decode()
            if body.lstrip().startswith("{"):
                return json.loads(body)
            m = re.search(r"runtime error: ([^<]+)", body)
            raise RuntimeError(m.group(1).strip() if m else "non-JSON response")
        except Exception as exc:  # noqa: BLE001
            last = f"{endpoint}: {exc}"
            print(f"  ! {last}", file=sys.stderr)
            time.sleep(2 + random.random() * 4)
    raise RuntimeError(last or "overpass failed")


PARK_TYPES_Q = "|".join(PARK_TYPES)


def tile_queries(bbox: str) -> dict[str, str]:
    """Three small queries per tile instead of one union.

    A single union over a 0.15-degree tile asks one Overpass worker to resolve
    seven scans at once and reliably times out (504). Split, each query is a
    couple of seconds and a failure only costs that one slice.
    """
    head = "[out:json][timeout:90];("
    return {
        "parks": (
            f"{head}way[leisure~\"^({PARK_TYPES_Q})$\"][access!=\"private\"]({bbox});"
            f"relation[leisure~\"^({PARK_TYPES_Q})$\"][access!=\"private\"]({bbox});"
            f"way[leisure=playground]({bbox}););out center tags;"
        ),
        "gym": (
            f"{head}node[leisure=fitness_station]({bbox});"
            f"way[leisure=fitness_station]({bbox}););out center tags;"
        ),
        "amen": (
            f"{head}node[amenity~\"^(toilets|drinking_water)$\"]({bbox});"
            f"way[amenity=toilets]({bbox}););out center tags;"
        ),
    }


def fetch_tile(city_slug: str, bbox: str, refresh: bool) -> list[dict]:
    elements: list[dict] = []
    for slice_name, query in tile_queries(bbox).items():
        key = hashlib.sha1(f"{city_slug}|{bbox}|{slice_name}".encode()).hexdigest()[:16]
        cache = CACHE_DIR / city_slug / f"{key}.json"
        if cache.exists() and not refresh:
            elements.extend(json.loads(cache.read_text())["elements"])
            continue
        try:
            data = overpass(query)
        except RuntimeError as exc:
            # Partial coverage beats no coverage: one failed slice must not
            # throw away the tiles that already answered.
            print(f"  ! slice {slice_name} at {bbox} failed: {exc}", file=sys.stderr)
            continue
        cache.parent.mkdir(parents=True, exist_ok=True)
        cache.write_text(
            json.dumps({"bbox": bbox, "slice": slice_name, "fetched": time.time(), "elements": data["elements"]})
        )
        elements.extend(data["elements"])
        time.sleep(1.0)
    return elements


def park_key(name: str) -> str:
    return " ".join(name.lower().replace("&", "and").split())


def dedupe(records: list[dict]) -> tuple[list[dict], int]:
    """OSM often carries a node and a way for the same park. Collapse pairs
    sharing a name within 250 m, keeping whichever record knows more."""
    kept: list[dict] = []
    dropped = 0
    for rec in records:
        twin = None
        for k in kept:
            if park_key(k["name"]) == park_key(rec["name"]) and metres(
                k["centre"]["lat"], k["centre"]["lon"], rec["centre"]["lat"], rec["centre"]["lon"]
            ) < 250:
                twin = k
                break
        if twin is None:
            kept.append(rec)
            continue
        dropped += 1
        if len(rec["stations"]) > len(twin["stations"]):
            for f in ("centre", "stations", "amenities", "osm", "slug"):
                twin[f] = rec[f]
        if rec.get("openGym") and not twin.get("openGym"):
            twin["openGym"] = True
    return kept, dropped


def grid(bbox: tuple[float, float, float, float], n: int) -> list[str]:
    minlat, minlon, maxlat, maxlon = bbox
    dlat = (maxlat - minlat) / n
    dlon = (maxlon - minlon) / n
    out = []
    for i in range(n):
        for j in range(n):
            out.append(
                f"{minlat + i * dlat:.5f},{minlon + j * dlon:.5f},"
                f"{minlat + (i + 1) * dlat:.5f},{minlon + (j + 1) * dlon:.5f}"
            )
    return out


def main() -> None:
    ap = argparse.ArgumentParser()
    ap.add_argument("--city", required=True)
    ap.add_argument("--city-slug", default=None)
    ap.add_argument("--bbox", default="17.15,78.20,17.60,78.65", help="minlat,minlon,maxlat,maxlon")
    ap.add_argument("--tiles", type=int, default=3, help="grid is tiles x tiles")
    ap.add_argument("--dry-run", action="store_true")
    ap.add_argument("--refresh", action="store_true", help="ignore the tile cache")
    ap.add_argument("--limit", type=int, default=0, help="write at most N records (0 = all)")
    args = ap.parse_args()

    city_slug = args.city_slug or slugify(args.city)
    today = time.strftime("%Y-%m-%d")
    bbox = tuple(float(x) for x in args.bbox.split(","))  # type: ignore[assignment]

    print(f"→ {args.city}: {args.tiles}x{args.tiles} tiles")
    elements: list[dict] = []
    for i, tb in enumerate(grid(bbox, args.tiles), 1):
        els = fetch_tile(city_slug, tb, args.refresh)
        print(f"  tile {i}/{args.tiles ** 2} {tb}  {len(els)} elements")
        elements.extend(els)

    parks: dict[str, dict] = {}
    stations: list[dict] = []
    amenities: list[dict] = []

    for el in elements:
        tags = el.get("tags") or {}
        leisure = tags.get("leisure")

        if leisure in PARK_TYPES:
            c = centre(el)
            if not c:
                continue
            name = tags.get("name")
            key = f"{el['type']}/{el['id']}"
            ring = ring_of(el)
            parks[key] = {
                "osmType": el["type"],
                "osmId": el["id"],
                "name": name,
                "tags": tags,
                "lat": c[0],
                "lon": c[1],
                "ring": ring,
                "areaHa": poly_area_ha(ring) if ring else 0.0,
                "stations": [],
                "amenities": [],
            }
            continue

        if leisure == "fitness_station":
            c = centre(el)
            if c:
                stations.append({"el": el, "tags": tags, "lat": c[0], "lon": c[1]})

        amen = tags.get("amenity")
        if amen in ("toilets", "drinking_water"):
            c = centre(el)
            if c:
                amenities.append({"amenity": amen, "lat": c[0], "lon": c[1], "tags": tags})

    print(f"\n  {len(parks)} park outlines · {len(stations)} fitness stations · {len(amenities)} amenities")

    # Assign each station to a containing park, else the nearest park within 120 m.
    assigned = 0
    unassigned = []
    for st in stations:
        host = None
        for p in parks.values():
            if p["ring"] and point_in_ring(p["ring"], st["lon"], st["lat"]):
                host = p
                break
        if host is None:
            best, best_d = None, 1e9
            for p in parks.values():
                d = metres(st["lat"], st["lon"], p["lat"], p["lon"])
                if d < best_d:
                    best, best_d = p, d
            if best is not None and best_d <= 120:
                host = best
        if host is None:
            unassigned.append(st)
            continue
        osm_value = st["tags"].get("fitness_station") or st["tags"].get("sport") or ""
        sid = OSM_TO_STATION.get(osm_value)
        if not sid:
            # An "open air gym" mapped as one node carries no machine-level
            # detail. Record that equipment exists without guessing what.
            host["openGym"] = True
            host.setdefault("openGymNote", "Open gym mapped in OSM; machines not identified")
            continue
        host["stations"].append(
            {
                "id": sid,
                "condition": "unknown",
                "observedOn": None,
                "observedBy": "osm-import",
                "note": None,
                "osmTag": osm_value or None,
                "osmId": st["el"]["id"],
            }
        )
        assigned += 1

    for am in amenities:
        for p in parks.values():
            if p["ring"] and point_in_ring(p["ring"], am["lon"], am["lat"]):
                p["amenities"].append(am["amenity"])
                break

    # Two outputs. Every named park goes to the city inventory that the map
    # draws; only parks that actually carry equipment earn a detail page, so
    # the page count tracks real information rather than OSM outline count.
    chosen = []
    for p in parks.values():
        name = (p["name"] or "").strip()
        if not name or len(name) < 3:
            continue
        chosen.append(p)

    chosen.sort(key=lambda p: (-len(p["stations"]), -p["areaHa"], p["name"]))
    if args.limit:
        chosen = chosen[: args.limit]

    seen: dict[str, int] = {}
    out_records = []
    for p in chosen:
        base = slugify(p["name"])
        seen[base] = seen.get(base, 0) + 1
        slug = base if seen[base] == 1 else f"{base}-{seen[base]}"

        seen_station: dict[str, int] = {}
        stations_out = []
        for s in p["stations"]:
            seen_station[s["id"]] = seen_station.get(s["id"], 0) + 1
            row = dict(s)
            if seen_station[s["id"]] > 1:
                row["index"] = seen_station[s["id"]]
            stations_out.append(row)
        stations_out.sort(key=lambda s: s["id"])

        rec = {
            "slug": slug,
            "name": p["name"],
            "city": args.city,
            "citySlug": city_slug,
            "locality": (p["tags"].get("addr:suburb") or p["tags"].get("addr:city") or "").strip(),
            "kind": ("playground" if p["tags"].get("leisure") == "playground" else "paid" if p["tags"].get("fee") == "yes" else "public"),
            "centre": {"lat": round(p["lat"], 6), "lon": round(p["lon"], 6)},
            "polygon": p["ring"],
            "areaHa": round(p["areaHa"], 2) if p["areaHa"] else None,
            "osm": {"type": p["osmType"], "id": p["osmId"]},
            "verification": {
                "level": "osm-import",
                "lastVerified": None,
                "observers": 0,
                "disputes": 0,
            },
            "amenities": {
                "toilets": "toilets" in p["amenities"],
                "drinkingWater": "drinking_water" in p["amenities"],
            },
            "openGym": bool(p.get("openGym")),
            "stations": stations_out,
            "notes": [
                "Imported from OpenStreetMap tags, not from a site visit."
                + (" Station positions were mapped by OSM contributors." if stations_out else "")
            ],
            "contributor": "OpenStreetMap contributors (ODbL)",
            "disclaimer": "Condition unverified. Branding and exact model vary by installation.",
        }
        out_records.append(rec)

    print(f"\n  {len(out_records)} records · {assigned} stations assigned · {len(unassigned)} unassigned")
    with_gym = sum(1 for r in out_records if r["stations"])
    open_gym = sum(1 for r in out_records if r.get("openGym"))
    print(f"  {with_gym} with mapped machines, {open_gym} with an open gym but no machine detail, {len(out_records) - with_gym - open_gym} with nothing recorded")

    if args.dry_run:
        for r in out_records[:12]:
            print(f"   · {r['name']:<42} {len(r['stations']):>2} stations  {r['areaHa'] or 0:>5.2f} ha  {r['slug']}")
        print("(dry run — nothing written)")
        return

    dest = OUT_DIR / city_slug
    dest.mkdir(parents=True, exist_ok=True)
    for old in dest.glob("*.json"):
        old.unlink()
    out_records, dupes = dedupe(out_records)
    if dupes:
        print(f"  merged {dupes} duplicate park record(s) (same name within 250 m)")
    paginated = [r for r in out_records if r["stations"]]
    for r in paginated:
        (dest / f"{r['slug']}.json").write_text(json.dumps(r, indent=2, ensure_ascii=False) + "\n")
    print(f"  {len(paginated)} pages written, {len(out_records) - len(paginated)} inventory-only")

    inv = {
        "city": args.city,
        "citySlug": city_slug,
        "fetched": datetime.date.today().isoformat(),
        "source": "OpenStreetMap contributors (ODbL)",
        "parks": [
            {
                "slug": r["slug"],
                "name": r["name"],
                "lat": r["centre"]["lat"],
                "lon": r["centre"]["lon"],
                "kind": r["kind"],
                "osm": r["osm"],
                "amenities": r["amenities"],
                "stationCount": len(r["stations"]),
                "openGym": bool(r.get("openGym")),
                "page": bool(r["stations"]),
            }
            for r in out_records
        ],
    }
    inv_dir = ROOT / "src" / "data" / "city-index"
    inv_dir.mkdir(parents=True, exist_ok=True)
    (inv_dir / f"{city_slug}.json").write_text(json.dumps(inv, ensure_ascii=False, separators=(",", ":")) + "\n")
    print(f"  inventory: {len(inv['parks'])} parks -> src/data/city-index/{city_slug}.json")

    osmdir = ROOT / "src" / "data" / "osm-reports"
    osmdir.mkdir(parents=True, exist_ok=True)
    if unassigned:
        (osmdir / f"{city_slug}-unassigned-stations.json").write_text(
            json.dumps(
                [
                    {
                        "osmId": s["el"]["id"],
                        "osmTag": s["tags"].get("fitness_station"),
                        "lat": round(s["lat"], 6),
                        "lon": round(s["lon"], 6),
                    }
                    for s in unassigned
                ],
                indent=2,
            )
            + "\n"
        )
    print(f"\n  wrote {len(paginated)} park records to {dest.relative_to(ROOT)}")


if __name__ == "__main__":
    main()
