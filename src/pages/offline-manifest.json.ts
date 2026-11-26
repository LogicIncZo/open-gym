import type { APIRoute } from "astro";
import { EQUIPMENT } from "../data/equipment";
import { PARKS, CITIES } from "../data/parks";
import { PHOTO_IDS, PHOTOS } from "../data/photos";
import { u } from "../lib/url";

const routes = [
  "/",
  "/equipment/",
  "/parks/",
  "/build/",
  "/park/",
  "/map/",
  "/contribute/",
  "/data/parks.geojson",
  "/safety/",
  "/about/",
  "/videos/",
  "/credits/",
  ...EQUIPMENT.map((e) => `/equipment/${e.id}/`),
  ...CITIES.map((c) => `/parks/${c}/`),
  ...PARKS.map((p) => `/parks/${p.citySlug}/${p.slug}/`),
  ...PHOTO_IDS.map((id) => `/photos/${PHOTOS[id].file}`),
];

export const GET: APIRoute = () =>
  new Response(JSON.stringify(routes.map(u)), {
    headers: {
      "content-type": "application/json; charset=utf-8",
      "cache-control": "public, max-age=3600",
    },
  });
