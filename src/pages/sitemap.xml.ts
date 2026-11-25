import type { APIRoute } from "astro";
import { EQUIPMENT } from "../data/equipment";
import { PARKS } from "../data/parks";

const SITE = "https://logicinczo.github.io";
const BASE = "/open-gym";

export const GET: APIRoute = () => {
  const today = new Date().toISOString().slice(0, 10);
  const urls = [
    { loc: `${BASE}/`, priority: "1.0" },
    { loc: `${BASE}/equipment/`, priority: "0.9" },
    ...EQUIPMENT.map((e) => ({ loc: `${BASE}/equipment/${e.id}/`, priority: "0.8" })),
    { loc: `${BASE}/parks/`, priority: "0.7" },
    ...PARKS.map((p) => ({ loc: `${BASE}/parks/${p.citySlug}/${p.slug}/`, priority: "0.6" })),
    { loc: `${BASE}/build/`, priority: "0.8" },
    { loc: `${BASE}/safety/`, priority: "0.7" },
    { loc: `${BASE}/about/`, priority: "0.5" },
  ];

  const body = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${urls
  .map(
    (u) => `  <url>
    <loc>${SITE}${u.loc}</loc>
    <lastmod>${today}</lastmod>
    <priority>${u.priority}</priority>
  </url>`,
  )
  .join("\n")}
</urlset>`;

  return new Response(body, {
    headers: {
      "content-type": "application/xml; charset=utf-8",
      "cache-control": "public, max-age=3600",
    },
  });
};
