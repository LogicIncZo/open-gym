/**
 * Open Gym intake.
 *
 * Collects anonymous park reports (equipment list, condition, amenities, one
 * photo) and files them for review. It never stores an IP address, a user
 * agent, or a cookie. The only location it keeps is the fix the reporter
 * chose to share, and it keeps that as a claim to be checked, not a proof.
 */

import { mkdir, writeFile, readdir, readFile } from "node:fs/promises";
import { existsSync } from "node:fs";
import { join } from "node:path";
import { randomUUID, createHash } from "node:crypto";
import { stripImageMeta } from "./strip-meta";

const ROOT = import.meta.dir;
const DATA = join(ROOT, "data");
const REPORTS = join(DATA, "reports");
const PHOTOS = join(DATA, "photos");

const PORT = Number(process.env.PORT ?? 8413);
const MAX_PHOTO_BYTES = 2_500_000;
const MAX_REPORTS_PER_HOUR_PER_FIX = 6;
const FIELD_RADIUS_M = 150;
const SITE_ORIGINS = new Set([
  "https://logicinczo.github.io",
  "http://localhost:4321",
  "http://localhost:3000",
]);

const STATIONS = new Set(
  (
    "air-walker arm-wheel back-extension balance-beam calf-raise chest-press climbing-net " +
    "cross-trainer exercise-bike hip-adductor lat-pulldown leg-extension leg-press monkey-bars " +
    "moon-walker multi-gym parallel-bars pendulum pull-up-bar push-up-bars rider rowing-machine " +
    "seated-row shoulder-press shoulder-wheel sit-up-board ski-walker stepper stretch-station " +
    "treadmill-rollers twister waist-bend"
  ).split(" "),
);

const AMENITIES = new Set([
  "toilets",
  "drinkingWater",
  "lights",
  "shade",
  "benches",
  "parking",
  "fencing",
]);

const CONDITIONS = new Set(["good", "fair", "poor", "broken", "unknown"]);

/** Coarse rate limit: keyed on a rounded fix, in memory only, never logged. */
const recent = new Map<string, number[]>();

const metres = (aLat: number, aLon: number, bLat: number, bLon: number): number => {
  const R = 6_371_000;
  const dLat = ((bLat - aLat) * Math.PI) / 180;
  const dLon = ((bLon - aLon) * Math.PI) / 180;
  const s =
    Math.sin(dLat / 2) ** 2 +
    Math.cos((aLat * Math.PI) / 180) * Math.cos((bLat * Math.PI) / 180) * Math.sin(dLon / 2) ** 2;
  return 2 * R * Math.asin(Math.sqrt(s));
};

const cors = (origin: string | null): Record<string, string> => {
  const allow = origin && SITE_ORIGINS.has(origin) ? origin : "https://logicinczo.github.io";
  return {
    "access-control-allow-origin": allow,
    "access-control-allow-methods": "GET,POST,OPTIONS",
    "access-control-allow-headers": "content-type",
    "access-control-max-age": "86400",
    vary: "origin",
  };
};

const json = (body: unknown, status = 200, origin: string | null = null): Response =>
  new Response(JSON.stringify(body, null, 2), {
    status,
    headers: { "content-type": "application/json; charset=utf-8", ...cors(origin) },
  });

type Problem = { field: string; message: string };

const validate = (raw: any): { report?: Record<string, unknown>; photo?: Buffer; problems: Problem[] } => {
  const problems: Problem[] = [];
  const need = (cond: boolean, field: string, message: string) => {
    if (!cond) problems.push({ field, message });
  };

  const citySlug = String(raw?.citySlug ?? "").trim();
  const parkSlug = String(raw?.parkSlug ?? "").trim();
  const parkName = String(raw?.parkName ?? "").trim().slice(0, 120);
  const lat = Number(raw?.fix?.lat);
  const lon = Number(raw?.fix?.lon);
  const parkLat = Number(raw?.park?.lat);
  const parkLon = Number(raw?.park?.lon);
  const accuracy = raw?.fix?.accuracy == null ? null : Number(raw.fix.accuracy);

  need(/^[a-z0-9-]{2,40}$/.test(citySlug), "citySlug", "unknown city");
  need(/^[a-z0-9-]{2,80}$/.test(parkSlug), "parkSlug", "unknown park");
  need(parkName.length >= 2, "parkName", "park name is empty");
  // A fix is optional. Without one the report is still valid, it is simply not
  // a field verification — so a walker whose browser blocks location can post.
  const gaveFix = raw?.fix != null;
  need(!gaveFix || (Number.isFinite(lat) && lat > 6 && lat < 38), "fix.lat", "latitude out of range");
  need(!gaveFix || (Number.isFinite(lon) && lon > 68 && lon < 98), "fix.lon", "longitude out of range");
  need(Number.isFinite(parkLat) && Number.isFinite(parkLon), "park", "park coordinates missing");

  const stations = Array.isArray(raw?.stations) ? raw.stations : [];
  const cleanStations = stations
    .map((s: any) => ({
      id: String(s?.id ?? ""),
      condition: String(s?.condition ?? "unknown"),
      note: s?.note ? String(s.note).slice(0, 160) : null,
    }))
    .filter((s: any) => STATIONS.has(s.id) && CONDITIONS.has(s.condition));

  need(stations.length === 0 || cleanStations.length > 0, "stations", "no recognisable station ids");
  need(cleanStations.length <= 60, "stations", "too many stations");

  const amenities: Record<string, boolean> = {};
  for (const [k, v] of Object.entries(raw?.amenities ?? {})) {
    if (AMENITIES.has(k) && typeof v === "boolean") amenities[k] = v;
  }

  const distance =
    gaveFix && Number.isFinite(lat) && Number.isFinite(lon) && Number.isFinite(parkLat) && Number.isFinite(parkLon)
      ? Math.round(metres(parkLat, parkLon, lat, lon))
      : null;

  let photo: Buffer | undefined;
  if (raw?.photo?.data) {
    const dataUrl = String(raw.photo.data);
    const m = /^data:image\/(jpeg|png|webp);base64,([A-Za-z0-9+/=]+)$/.exec(dataUrl);
    if (!m) problems.push({ field: "photo", message: "photo must be a JPEG, PNG or WebP data URL" });
    else {
      photo = Buffer.from(m[2], "base64");
      if (photo.byteLength > MAX_PHOTO_BYTES)
        problems.push({ field: "photo", message: "photo is larger than 2.5 MB after resizing" });
      const magic = photo.subarray(0, 4).toString("hex");
      const ok =
        magic.startsWith("ffd8ff") || magic === "89504e47" || photo.subarray(0, 4).toString() === "RIFF";
      if (!ok) problems.push({ field: "photo", message: "photo data is not a recognised image" });
    }
  }

  if (problems.length) return { problems };

  // Defence in depth: the browser re-encodes through a canvas, but a direct
  // POST could carry camera EXIF. Strip it here so no stored photo can be
  // used to recover a contributor's location or device.
  if (photo) {
    const clean = stripImageMeta(photo);
    if (clean.byteLength === 0) {
      return {
        problems: [
          { field: "photo", message: "photo metadata could not be removed — re-save it as a JPEG and try again" },
        ],
      };
    }
    photo = clean;
  }

  const report = {
    id: randomUUID(),
    receivedAt: new Date().toISOString(),
    citySlug,
    parkSlug,
    parkName,
    park: { lat: parkLat, lon: parkLon },
    fix: { lat, lon, accuracy },
    distanceM: distance,
    inField: distance !== null && distance <= FIELD_RADIUS_M,
    claimLevel: distance !== null && distance <= FIELD_RADIUS_M ? "field-verified" : "self-declared",
    stations: cleanStations,
    amenities,
    notes: raw?.notes ? String(raw.notes).slice(0, 600) : null,
    usage: raw?.usage ? String(raw.usage).slice(0, 40) : null,
    hasPhoto: Boolean(photo),
    photoHash: photo ? createHash("sha256").update(photo).digest("hex").slice(0, 16) : null,
    state: "pending" as const,
  };

  return { report, photo, problems };
};

await mkdir(REPORTS, { recursive: true });
await mkdir(PHOTOS, { recursive: true });

const server = Bun.serve({
  port: PORT,
  hostname: "0.0.0.0",
  maxRequestBodySize: 8 * 1024 * 1024,

  async fetch(req) {
    const origin = req.headers.get("origin");
    const url = new URL(req.url);

    if (req.method === "OPTIONS") return new Response(null, { status: 204, headers: cors(origin) });

    if (url.pathname === "/health") {
      return json({ ok: true, service: "open-gym-intake", accepts: ["/report"], maxPhotoBytes: MAX_PHOTO_BYTES }, 200, origin);
    }

    if (url.pathname === "/stats") {
      const months = (await readdir(REPORTS).catch(() => [])).sort();
      let total = 0;
      for (const m of months) total += (await readdir(join(REPORTS, m)).catch(() => [])).length;
      return json({ reports: total, months, fieldRadiusM: FIELD_RADIUS_M }, 200, origin);
    }

    if (url.pathname === "/report" && req.method === "POST") {
      let raw: any;
      try {
        raw = await req.json();
      } catch {
        return json({ error: "body must be JSON" }, 400, origin);
      }

      const { report, photo, problems } = validate(raw);
      if (!report) return json({ error: "invalid report", problems }, 422, origin);

      const fixKey = `${report.fix.lat.toFixed(3)},${report.fix.lon.toFixed(3)}`;
      const now = Date.now();
      const bucket = (recent.get(fixKey) ?? []).filter((t) => now - t < 3_600_000);
      if (bucket.length >= MAX_REPORTS_PER_HOUR_PER_FIX) {
        return json({ error: "too many reports from this location in the last hour" }, 429, origin);
      }
      bucket.push(now);
      recent.set(fixKey, bucket);
      if (recent.size > 5_000) recent.clear();

      const month = report.receivedAt.slice(0, 7);
      const dir = join(REPORTS, month);
      await mkdir(dir, { recursive: true });
      if (photo) await writeFile(join(PHOTOS, `${report.id}.jpg`), photo);
      await writeFile(join(dir, `${report.id}.json`), JSON.stringify(report, null, 2) + "\n");

      return json(
        {
          id: report.id,
          claimLevel: report.claimLevel,
          distanceM: report.distanceM,
          thanks:
            report.claimLevel === "field-verified"
              ? "Fixed inside the park. This is filed as a field verification from an anonymous visitor."
              : `Your fix is ${report.distanceM} m from the park pin, so this is filed as a contribution that needs a second check.`,
        },
        201,
        origin,
      );
    }

    if (url.pathname === "/recent") {
      const months = (await readdir(REPORTS).catch(() => [])).sort().reverse().slice(0, 2);
      const out: unknown[] = [];
      for (const m of months) {
        const files = (await readdir(join(REPORTS, m)).catch(() => [])).sort().reverse();
        for (const f of files.slice(0, 40)) {
          const r = JSON.parse(await readFile(join(REPORTS, m, f), "utf8"));
          if (r.state === "accepted")
            out.push({ id: r.id, parkSlug: r.parkSlug, citySlug: r.citySlug, at: r.receivedAt, stations: r.stations.length });
        }
      }
      return json({ accepted: out.slice(0, 30) }, 200, origin);
    }

    return json({ error: "not found", routes: ["/health", "/stats", "/report", "/recent"] }, 404, origin);
  },
});

console.log(`open-gym intake listening on :${server.port}  data=${existsSync(DATA) ? DATA : "(new)"}`);
