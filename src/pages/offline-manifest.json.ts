import type { APIRoute } from "astro";
import { EQUIPMENT } from "../data/equipment";
import { PARKS } from "../data/parks";
import { u } from "../lib/url";

const routes = [
  "/",
  "/equipment/",
  "/parks/",
  "/build/",
  "/park/",
  "/safety/",
  "/about/",
  ...EQUIPMENT.map((e) => `/equipment/${e.id}/`),
  ...PARKS.map((p) => `/parks/${p.citySlug}/${p.slug}/`),
];

export const GET: APIRoute = () =>
  new Response(JSON.stringify(routes.map(u)), {
    headers: {
      "content-type": "application/json; charset=utf-8",
      "cache-control": "public, max-age=3600",
    },
  });
