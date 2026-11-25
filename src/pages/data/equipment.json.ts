import type { APIRoute } from "astro";
import { EQUIPMENT } from "../../data/equipment";
import { SOURCES } from "../../data/sources";
import { CATEGORIES } from "../../data/types";

export const GET: APIRoute = () => {
  const body = {
    $schema: "https://logicinczo.github.io/open-gym/data/equipment.schema.json",
    version: 1,
    generated: new Date().toISOString().slice(0, 10),
    licence: "CC BY-SA 4.0",
    note: "General information for healthy adults and supervised children. Not medical advice. Times are programming suggestions, not prescriptions.",
    categories: CATEGORIES.map((c) => ({ id: c.id, label: c.label, blurb: c.blurb })),
    sources: Object.values(SOURCES),
    equipment: EQUIPMENT,
  };
  return new Response(JSON.stringify(body, null, 2), {
    headers: {
      "content-type": "application/json; charset=utf-8",
      "cache-control": "public, max-age=3600",
    },
  });
};
