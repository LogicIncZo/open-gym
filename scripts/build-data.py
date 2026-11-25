#!/usr/bin/env python3
"""Build the DuckDB distribution of the equipment catalogue.

Reads dist/data/equipment.json (emitted by the Astro build) and writes
dist/data/equipment.duckdb with four flat, query-friendly tables:
equipment, benefits, signboard_claims, parks.

Requires: pip install duckdb
Run after `bun run build`; the deploy workflow does both.
"""

import json
import sys
from pathlib import Path

try:
    import duckdb
except ImportError:
    sys.exit("duckdb is required: pip install duckdb")

ROOT = Path(__file__).resolve().parent.parent
DIST = ROOT / "dist" / "data"
SOURCE = DIST / "equipment.json"
TARGET = DIST / "equipment.duckdb"
PARKS = ROOT / "src" / "data" / "parks"

if not SOURCE.exists():
    sys.exit(f"Missing {SOURCE} — run `bun run build` first.")

payload = json.loads(SOURCE.read_text(encoding="utf-8"))
equipment = payload["equipment"]

park_files = sorted(PARKS.rglob("*.json"))
parks = []
for path in park_files:
    p = json.loads(path.read_text(encoding="utf-8"))
    parks.append(
        {
            "slug": p.get("slug"),
            "name": p.get("name"),
            "city": p.get("city"),
            "verified": bool(p.get("verified")),
            "verified_on": p.get("verifiedOn"),
            "station_count": len(p.get("stations", [])),
        }
    )

if TARGET.exists():
    TARGET.unlink()
con = duckdb.connect(str(TARGET))

con.execute(
    """
    CREATE TABLE equipment (
        id VARCHAR PRIMARY KEY, name VARCHAR, category VARCHAR, prevalence VARCHAR,
        footprint VARCHAR, difficulty INTEGER, summary VARCHAR,
        muscles_primary VARCHAR, muscles_secondary VARCHAR, joints VARCHAR,
        adult_minutes VARCHAR, adult_sets VARCHAR, adult_rest VARCHAR,
        child_band VARCHAR, child_minutes VARCHAR, child_supervision VARCHAR,
        confidence VARCHAR
    )
    """
)
con.executemany(
    "INSERT INTO equipment VALUES (" + ",".join(["?"] * 17) + ")",
    [
        (
            e["id"], e["name"], e["category"], e["prevalence"], e["footprint"],
            e["difficulty"], e["summary"],
            ", ".join(e["muscles"]["primary"]), ", ".join(e["muscles"]["secondary"]),
            ", ".join(e["joints"]),
            e["minutes"]["adult"]["perStation"], e["minutes"]["adult"]["sets"],
            e["minutes"]["adult"]["rest"],
            e["minutes"]["child"]["band"], e["minutes"]["child"]["perStation"],
            e["minutes"]["child"]["supervision"], e["confidence"],
        )
        for e in equipment
    ],
)

con.execute("CREATE TABLE benefits (equipment_id VARCHAR, claim VARCHAR, tier INTEGER, note VARCHAR)")
con.executemany(
    "INSERT INTO benefits VALUES (?,?,?,?)",
    [(e["id"], b["claim"], b["tier"], b["note"]) for e in equipment for b in e["benefits"]],
)

con.execute("CREATE TABLE signboard_claims (equipment_id VARCHAR, claim VARCHAR, verdict VARCHAR, note VARCHAR)")
con.executemany(
    "INSERT INTO signboard_claims VALUES (?,?,?,?)",
    [(e["id"], c["claim"], c["verdict"], c.get("note", "")) for e in equipment for c in e["signboard"]],
)

con.execute(
    "CREATE TABLE parks (slug VARCHAR, name VARCHAR, city VARCHAR, verified BOOLEAN, verified_on VARCHAR, station_count INTEGER)"
)
con.executemany("INSERT INTO parks VALUES (?,?,?,?,?,?)", [
    (p["slug"], p["name"], p["city"], p["verified"], p["verified_on"], p["station_count"])
    for p in parks
])

con.close()
print(f"Wrote {TARGET} — {len(equipment)} stations, {len(parks)} parks")
