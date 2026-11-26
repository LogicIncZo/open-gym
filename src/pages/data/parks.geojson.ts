import type { APIRoute } from "astro";
import { inventoryWithLinks, PARKS, cityLabel, type LinkedPark } from "../../data/parks";
import { EQUIPMENT } from "../../data/equipment";

/** Static GeoJSON feed for the map. One feature per park we know about, plus
 *  one per recorded station so the gym layer can be drawn and filtered. */
export const GET: APIRoute = () => {
  const pages = new Map(PARKS.map((p) => [`${p.citySlug}/${p.slug}`, p]));
  const rows: LinkedPark[] = inventoryWithLinks();

  const parkFeatures = rows.map((p) => {
    const page = pages.get(`${p.citySlug}/${p.slug}`);
    return {
      type: "Feature" as const,
      geometry: { type: "Point" as const, coordinates: [p.lon, p.lat] },
      properties: {
        layer: p.kind === "playground" ? "play" : "park",
        slug: p.slug,
        city: p.citySlug,
        cityName: cityLabel(p.citySlug),
        name: p.name,
        kind: p.kind,
        href: p.href ?? null,
        stations: p.stationCount,
        openGym: Boolean(p.openGym),
        toilets: Boolean(p.amenities.toilets),
        water: Boolean(p.amenities.drinkingWater),
        level: page?.verification.level ?? (p.openGym ? "osm-import" : "osm-import"),
        lastVerified: page?.verification.lastVerified ?? null,
      },
    };
  });

  const stationFeatures = PARKS.flatMap((p) =>
    p.stations.map((s, i) => ({
      type: "Feature" as const,
      geometry: { type: "Point" as const, coordinates: [p.centre.lon, p.centre.lat] },
      properties: {
        layer: "station",
        id: s.id,
        name: EQUIPMENT.find((e) => e.id === s.id)?.name ?? s.id,
        condition: s.condition,
        park: p.name,
        city: p.citySlug,
        href: `/parks/${p.citySlug}/${p.slug}`,
        n: i,
      },
    })),
  );

  return new Response(
    JSON.stringify({ type: "FeatureCollection", features: [...parkFeatures, ...stationFeatures] }),
    { headers: { "content-type": "application/geo+json; charset=utf-8" } },
  );
};
