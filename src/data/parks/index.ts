export type Condition = "good" | "fair" | "poor" | "broken";

export interface ParkStation {
  id: string;
  condition: Condition;
  note?: string;
}

export interface Park {
  slug: string;
  name: string;
  city: string;
  citySlug: string;
  locality: string;
  verified: boolean;
  verifiedOn: string | null;
  surface: string;
  shade: string;
  water: string;
  timings: string;
  entry: string;
  accessibility: string;
  stations: ParkStation[];
  notes: string[];
  contributor: string;
  map: { osm?: string; google?: string };
  disclaimer?: string;
}

const modules = import.meta.glob<{ default: Park }>("./**/*.json", { eager: true });

export const PARKS: Park[] = Object.values(modules)
  .map((m) => m.default)
  .sort((a, b) => a.city.localeCompare(b.city) || a.name.localeCompare(b.name));

export const CITIES = Array.from(new Set(PARKS.map((p) => p.citySlug))).sort();

export const parkById = (citySlug: string, slug: string): Park | undefined =>
  PARKS.find((p) => p.citySlug === citySlug && p.slug === slug);

export const parksWithStation = (stationId: string): Park[] =>
  PARKS.filter((p) => p.stations.some((s) => s.id === stationId));

export const CONDITION_LABEL: Record<Condition, string> = {
  good: "Good",
  fair: "Fair",
  poor: "Poor",
  broken: "Broken",
};
