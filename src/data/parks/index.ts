export type Condition = "good" | "fair" | "poor" | "broken" | "unknown";

/** How much a record can be trusted. Order matters: it is the trust ladder. */
export type VerificationLevel =
  | "osm-import"
  | "self-declared"
  | "field-verified"
  | "pair-observed";

export type ParkKind = "public" | "paid" | "complex" | "playground";

export interface Geo {
  lat: number;
  lon: number;
}

export interface Amenities {
  toilets?: boolean;
  drinkingWater?: boolean;
  lights?: boolean;
  shade?: boolean;
  benches?: boolean;
  parking?: boolean;
  fencing?: boolean;
}

export interface Verification {
  level: VerificationLevel;
  lastVerified: string | null;
  observers: number;
  disputes: number;
}

export interface OsmRef {
  type: "node" | "way" | "relation";
  id: number;
}

export interface ParkStation {
  id: string;
  condition: Condition;
  note?: string | null;
  count?: number;
  osmTag?: string | null;
  observedOn?: string | null;
  observedBy?: string | null;
}

/** Raw shape on disk. Every field past the identity block is optional so the
 *  OSM importer can write sparse records and humans can write rich ones. */
export interface ParkRecord {
  slug: string;
  name: string;
  city: string;
  citySlug: string;
  locality?: string;
  kind?: ParkKind;
  centre?: Geo;
  polygon?: [number, number][];
  areaHa?: number | null;
  osm?: OsmRef | null;
  verification?: Verification;
  amenities?: Amenities;
  stations?: ParkStation[];
  notes?: string[];
  contributor?: string;
  disclaimer?: string;
  surface?: string;
  shade?: string;
  water?: string;
  timings?: string;
  entry?: string;
  accessibility?: string;
  verified?: boolean;
  verifiedOn?: string | null;
  map?: { osm?: string; google?: string };
}

/** Normalised record. Everything a page needs is present. */
export interface Park extends ParkRecord {
  kind: ParkKind;
  centre: Geo;
  amenities: Amenities;
  verification: Verification;
  stations: ParkStation[];
  notes: string[];
  locality: string;
  surface: string;
  shade: string;
  water: string;
  timings: string;
  entry: string;
  accessibility: string;
  verified: boolean;
  verifiedOn: string | null;
  contributor: string;
  map: { osm?: string; google?: string };
}

export const CONDITION_LABEL: Record<Condition, string> = {
  good: "Good",
  fair: "Fair",
  poor: "Poor",
  broken: "Broken",
  unknown: "Not recorded",
};

export const VERIFY_LABEL: Record<VerificationLevel, string> = {
  "osm-import": "OpenStreetMap only",
  "self-declared": "Contributed, not checked",
  "field-verified": "GPS-verified on site",
  "pair-observed": "Two independent checks",
};

export const VERIFY_NOTE: Record<VerificationLevel, string> = {
  "osm-import": "Someone tagged this park in OpenStreetMap. Nobody has walked it for this record.",
  "self-declared":
    "A contributor submitted this. Their position could not be confirmed against the park.",
  "field-verified":
    "A contributor was inside or next to the park when they submitted, and their GPS fixed within 150 m of the pin. One anonymous visit is enough for this level.",
  "pair-observed":
    "Two separate submissions, from different devices, agree on the equipment list. Disagreements drop a record back a level instead of being averaged.",
};

const VERIFY_RANK: Record<VerificationLevel, number> = {
  "osm-import": 0,
  "self-declared": 1,
  "field-verified": 2,
  "pair-observed": 3,
};

export const verifyRank = (level: VerificationLevel): number => VERIFY_RANK[level] ?? 0;

export const isVerified = (level: VerificationLevel): boolean => verifyRank(level) >= 2;

const modules = import.meta.glob<{ default: ParkRecord }>("./**/*.json", { eager: true });

const normalise = (raw: ParkRecord): Park => {
  const level = raw.verification?.level ?? (raw.verified ? "field-verified" : "osm-import");
  const centre =
    raw.centre ??
    (raw.map?.google?.match(/query=([-\d.]+),([-\d.]+)/)
      ? {
          lat: Number(RegExp.$1),
          lon: Number(RegExp.$2),
        }
      : { lat: 0, lon: 0 });

  return {
    ...raw,
    locality: raw.locality ?? "",
    kind: raw.kind ?? (raw.entry?.toLowerCase().includes("free") ? "public" : "public"),
    centre,
    amenities: raw.amenities ?? {},
    verification: {
      level,
      lastVerified: raw.verification?.lastVerified ?? raw.verifiedOn ?? null,
      observers: raw.verification?.observers ?? 0,
      disputes: raw.verification?.disputes ?? 0,
    },
    stations: (raw.stations ?? []).map((s) => ({ ...s, condition: s.condition ?? "unknown" })),
    notes: raw.notes ?? [],
    surface: raw.surface ?? "",
    shade: raw.shade ?? "",
    water: raw.water ?? "",
    timings: raw.timings ?? "",
    entry: raw.entry ?? (raw.kind === "paid" ? "Paid" : "Free"),
    accessibility: raw.accessibility ?? "",
    verified: isVerified(level),
    verifiedOn: raw.verification?.lastVerified ?? raw.verifiedOn ?? null,
    contributor: raw.contributor ?? "Unattributed",
    map: raw.map ?? {},
  };
};

export const PARKS: Park[] = Object.values(modules)
  .map((m) => normalise(m.default))
  .sort((a, b) => (a.city ?? "").localeCompare(b.city ?? "") || (a.name ?? "").localeCompare(b.name ?? ""));

const CITY_NAMES: Record<string, string> = {
  hyderabad: "Hyderabad",
  chennai: "Chennai",
};

export const cityLabel = (slug: string): string =>
  CITY_NAMES[slug] ?? PARKS.find((p) => p.citySlug === slug)?.city ?? slug;

export const parkById = (citySlug: string, slug: string): Park | undefined =>
  PARKS.find((p) => p.citySlug === citySlug && p.slug === slug);

export const parkPath = (p: Park): string => `/parks/${p.citySlug}/${p.slug}`;

export const parksWithStation = (stationId: string): Park[] =>
  PARKS.filter((p) => p.stations.some((s) => s.id === stationId));

/* ---------- city inventory: the map canvas, wider than the page registry ---------- */

export interface InventoryPark {
  slug: string;
  name: string;
  lat: number;
  lon: number;
  kind: ParkKind;
  osm?: OsmRef | null;
  amenities: Amenities;
  stationCount: number;
  openGym?: boolean;
  page: boolean;
}

export interface CityInventory {
  city: string;
  citySlug: string;
  fetched: string;
  source: string;
  parks: InventoryPark[];
}

const invModules = import.meta.glob<{ default: CityInventory }>("../city-index/*.json", {
  eager: true,
});

export const CITY_INVENTORY: Record<string, CityInventory> = Object.fromEntries(
  Object.values(invModules).map((m) => [m.default.citySlug, m.default]),
);

export const CITIES = Array.from(
  new Set([...PARKS.map((p) => p.citySlug), ...Object.keys(CITY_INVENTORY)]),
).sort();

export interface LinkedPark extends InventoryPark {
  citySlug: string;
  href?: string;
}

/** Every park we know to exist, with a link where a page exists. */
export const inventoryWithLinks = (): LinkedPark[] =>
  Object.entries(CITY_INVENTORY)
    .flatMap(([citySlug, inv]) =>
      inv.parks.filter((p) => p && p.name).map((p) => ({
        ...p,
        citySlug,
        href: p.page ? `/parks/${citySlug}/${p.slug}` : undefined,
      })),
    )
    .sort((a, b) => a.citySlug.localeCompare(b.citySlug) || (a.name ?? "").localeCompare(b.name ?? ""));

export const cityInventory = (citySlug: string): LinkedPark[] =>
  inventoryWithLinks().filter((p) => p.citySlug === citySlug);

export interface CityStats {
  total: number;
  documented: number;
  openGymUnrecorded: number;
  withToilets: number;
  withWater: number;
  paid: number;
}

export const cityStats = (citySlug: string): CityStats => {
  const rows = cityInventory(citySlug);
  return {
    total: rows.length,
    documented: rows.filter((r) => r.stationCount > 0).length,
    openGymUnrecorded: rows.filter((r) => r.openGym && r.stationCount === 0).length,
    withToilets: rows.filter((r) => r.amenities.toilets).length,
    withWater: rows.filter((r) => r.amenities.drinkingWater).length,
    paid: rows.filter((r) => r.kind === "paid").length,
  };
};

/** Parks worth a visit by someone doing a first equipment survey. */
export const surveyQueue = (citySlug: string, limit = 40): LinkedPark[] =>
  cityInventory(citySlug)
    .filter((p) => p.stationCount === 0 && p.kind !== "playground")
    .sort((a, b) => Number(b.openGym ?? 0) - Number(a.openGym ?? 0) || (a.name ?? "").localeCompare(b.name ?? ""))
    .slice(0, limit);
