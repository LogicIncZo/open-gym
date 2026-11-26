#!/usr/bin/env python3
"""Moderate anonymous park reports and merge accepted ones into the static registry.

Reports arrive as JSON in intake/reports/<YYYY-MM>/<id>.json from the intake
service. Nothing on the site changes until a person runs this. Accepting a
report does three things:

  1. flips the report's state (pending -> accepted / rejected)
  2. merges its stations, amenities and photo reference into the park record
     under src/data/parks/<city>/<slug>.json, creating the record from the
     city inventory if the park has never had one
  3. sets the park's verification level from the report's claimLevel

Merge rules, deliberately conservative:
  * stations are unioned; a later report may change a condition, never add a
    second copy of the same station
  * amenities are only set when the report states them
  * `unknown` condition never overwrites a known one
  * every accepted report appends one observation line (rounded date, no id,
    no coordinates) so the page can show "reported 3 times"

Usage:
    python3 scripts/moderate.py list [--city hyderabad]
    python3 scripts/moderate.py accept <id> [<id> ...]
    python3 scripts/moderate.py reject <id> --why "duplicate"
    python3 scripts/moderate.py accept --all --level self-declared
    python3 scripts/moderate.py stats
"""

from __future__ import annotations

import argparse
import json
import re
import sys
from datetime import date, datetime
from pathlib import Path

ROOT = Path(__file__).resolve().parent.parent
REPORTS = ROOT / "intake" / "reports"
PARKS = ROOT / "src" / "data" / "parks"
INVENTORY = ROOT / "src" / "data" / "city-index"

RANK = {"unknown": 0, "broken": 1, "poor": 2, "fair": 3, "good": 4}
LEVEL_RANK = {
    "osm-import": 0,
    "linking": 1,
    "contributor": 2,
    "self-declared": 3,
    "field-verified": 4,
    "pair-observed": 5,
}


def slugify(text: str) -> str:
    s = re.sub(r"[^a-z0-9]+", "-", (text or "").lower()).strip("-")
    return s or "park"


def iter_reports():
    if not REPORTS.exists():
        return
    for month in sorted(p for p in REPORTS.iterdir() if p.is_dir()):
        for f in sorted(month.glob("*.json")):
            try:
                yield f, json.loads(f.read_text())
            except json.JSONDecodeError:
                print(f"  ! skip torn file {f.name}", file=sys.stderr)


def save_report(path: Path, report: dict) -> None:
    report["state"] = report.get("state", "pending")
    path.write_text(json.dumps(report, indent=2, ensure_ascii=False) + "\n")


def park_path(city_slug: str, slug: str) -> Path:
    return PARKS / city_slug / f"{slug}.json"


def inventory_entry(city_slug: str, slug: str) -> dict | None:
    f = INVENTORY / f"{city_slug}.json"
    if not f.exists():
        return None
    data = json.loads(f.read_text())
    for p in data.get("parks", []):
        if p.get("slug") == slug:
            return p
    return None


def new_park_record(report: dict, inv: dict | None) -> dict:
    """Build a park record for a park that only exists in the city inventory."""
    name = report.get("parkName") or (inv or {}).get("name") or report.get("parkSlug", "park")
    return {
        "slug": report["parkSlug"],
        "name": name,
        "city": report.get("cityName") or (inv or {}).get("city") or report["citySlug"].title(),
        "citySlug": report["citySlug"],
        "locality": (inv or {}).get("locality") or "",
        "kind": (inv or {}).get("kind") or "public",
        "centre": {
            "lat": round(float(report.get("park", {}).get("lat") or report["fix"]["lat"]), 6),
            "lon": round(float(report.get("park", {}).get("lon") or report["fix"]["lon"]), 6),
        },
        "surface": "",
        "shade": "",
        "water": "",
        "timings": "",
        "entry": "free",
        "accessibility": "",
        "stations": [],
        "amenities": {},
        "verification": {
            "level": "contributor",
            "lastVerified": None,
            "observers": 0,
            "reports": 0,
        },
        "observations": [],
        "notes": [],
        "contributor": "open-gym contributors",
        "osm": (inv or {}).get("osm"),
    }


def merge(report: dict, record: dict) -> list[str]:
    """Apply one report to a park record. Returns a list of human changes."""
    changes: list[str] = []
    by_id = {s["id"]: s for s in record.get("stations", [])}

    for st in report.get("stations", []):
        sid = st.get("id")
        cond = st.get("condition", "unknown")
        if not sid:
            continue
        have = by_id.get(sid)
        if have is None:
            by_id[sid] = {
                "id": sid,
                "condition": cond,
                "note": st.get("note", ""),
            }
            changes.append(f"+ station {sid} ({cond})")
            continue
        if RANK.get(cond, 0) > RANK.get(have.get("condition"), 0) or (
            cond != "unknown" and have.get("condition") == "unknown"
        ):
            changes.append(f"~ {sid}: {have.get('condition')} -> {cond}")
            have["condition"] = cond
        if st.get("note") and not have.get("note"):
            have["note"] = st["note"]

    if by_id:
        order = ["air-walker", "cross-trainer", "manual-treadmill", "moon-walker"]
        record["stations"] = sorted(
            by_id.values(),
            key=lambda s: (order.index(s["id"]) if s["id"] in order else 99, s["id"]),
        )

    amenities = record.setdefault("amenities", {})
    for k, v in (report.get("amenities") or {}).items():
        if isinstance(v, bool) and amenities.get(k) != v:
            amenities[k] = v
            changes.append(f"amenity {k}={str(v).lower()}")

    v = record.setdefault(
        "verification", {"level": "osm-import", "lastVerified": None, "observers": 0, "reports": 0}
    )
    claim = report.get("claimLevel", "self-declared")
    if LEVEL_RANK.get(claim, 0) > LEVEL_RANK.get(v.get("level"), 0):
        changes.append(f"level {v.get('level')} -> {claim}")
        v["level"] = claim
    if claim == "field-verified":
        v["lastVerified"] = report.get("receivedAt", "")[:10]
        v["observers"] = int(v.get("observers") or 0) + 1
    v["reports"] = int(v.get("reports") or 0) + 1

    obs = record.setdefault("observations", [])
    obs.append(
        {
            "on": report.get("observedOn") or report.get("receivedAt", "")[:10],
            "level": claim,
            "stations": len(report.get("stations", [])),
        }
    )
    record["observations"] = obs[-12:]

    if report.get("hasPhoto") and report.get("photoRef"):
        photos = record.setdefault("photos", [])
        if len(photos) < 6:
            photos.append({"ref": report["photoRef"], "level": claim, "on": obs[-1]["on"]})

    if report.get("notes") and len(record.get("notes", [])) < 8:
        record.setdefault("notes", []).append(report["notes"].strip()[:280])

    return changes


def write_park(record: dict) -> Path:
    p = park_path(record["citySlug"], record["slug"])
    p.parent.mkdir(parents=True, exist_ok=True)
    p.write_text(json.dumps(record, indent=2, ensure_ascii=False) + "\n")
    return p


def cmd_list(args) -> int:
    rows = [r for _, r in iter_reports() if r.get("state") == "pending"]
    if args.city:
        rows = [r for r in rows if r.get("citySlug") == args.city]
    if not rows:
        print("No pending reports.")
        return 0
    for r in rows:
        print(
            f"  {r['id'][:8]}  {r.get('citySlug')}/{r.get('parkSlug')}"
            f"  {r.get('claimLevel'):<14}  stations={len(r.get('stations', []))}"
            f"  photo={'y' if r.get('hasPhoto') else 'n'}  {r.get('receivedAt', '')[:16]}"
        )
        if r.get("notes"):
            print(f"            note: {r['notes'][:110]}")
    print(f"\n{len(rows)} pending.")
    return 0


def _accept_one(path: Path, report: dict) -> None:
    city, slug = report["citySlug"], report["parkSlug"]
    p = park_path(city, slug)
    if p.exists():
        record = json.loads(p.read_text())
    else:
        record = new_park_record(report, inventory_entry(city, slug))
    changes = merge(report, record)
    out = write_park(record)
    report["state"] = "accepted"
    report["acceptedOn"] = date.today().isoformat()
    save_report(path, report)
    print(f"  accepted {report['id'][:8]} -> {out.relative_to(ROOT)}")
    for c in changes:
        print(f"      {c}")
    if not changes:
        print("      (no field changed — duplicate report)")


def _match(rid: str, targets: set[str]) -> bool:
    return any(rid == t or rid.startswith(t) for t in targets)


def cmd_accept(args) -> int:
    targets = set(args.ids)
    done = 0
    for path, report in iter_reports():
        if report.get("state") != "pending":
            continue
        if args.all or _match(report["id"], targets):
            if args.level and report.get("claimLevel") != args.level:
                continue
            _accept_one(path, report)
            done += 1
    if not done:
        print("Nothing accepted.")
    return 0 if done else 1


def cmd_reject(args) -> int:
    done = 0
    for path, report in iter_reports():
        if report.get("state") == "pending" and _match(report["id"], set(args.ids)):
            report["state"] = "rejected"
            report["rejectedOn"] = date.today().isoformat()
            report["rejectReason"] = args.why or ""
            save_report(path, report)
            print(f"  rejected {report['id'][:8]} — {args.why or 'no reason given'}")
            done += 1
    return 0 if done else 1


def cmd_stats(args) -> int:
    state = {}
    per_city = {}
    for _, r in iter_reports():
        state[r.get("state", "pending")] = state.get(r.get("state", "pending"), 0) + 1
        if r.get("state") == "accepted":
            per_city[r.get("citySlug")] = per_city.get(r.get("citySlug"), 0) + 1
    print("reports by state:", json.dumps(state, sort_keys=True))
    print("accepted by city:", json.dumps(per_city, sort_keys=True))
    pages = sorted(PARKS.glob("*/*.json"))
    print(f"park pages in registry: {len([p for p in pages if not p.name.startswith('_')])}")
    return 0


def main() -> int:
    ap = argparse.ArgumentParser(description=__doc__, formatter_class=argparse.RawDescriptionHelpFormatter)
    sub = ap.add_subparsers(dest="cmd", required=True)

    p = sub.add_parser("list")
    p.add_argument("--city")
    p.set_defaults(fn=cmd_list)

    p = sub.add_parser("accept")
    p.add_argument("ids", nargs="*")
    p.add_argument("--all", action="store_true")
    p.add_argument("--level", help="only accept reports at this claimLevel")
    p.set_defaults(fn=cmd_accept)

    p = sub.add_parser("reject")
    p.add_argument("ids", nargs="+")
    p.add_argument("--why")
    p.set_defaults(fn=cmd_reject)

    p = sub.add_parser("stats")
    p.set_defaults(fn=cmd_stats)

    args = ap.parse_args()
    return args.fn(args)


if __name__ == "__main__":
    raise SystemExit(main())
