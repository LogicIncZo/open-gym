import type { APIRoute } from "astro";
import { EQUIPMENT } from "../../data/equipment";

const cell = (v: string | number | undefined | null): string => {
  const s = String(v ?? "");
  return /[",\n]/.test(s) ? `"${s.replace(/"/g, '""')}"` : s;
};

const join = (arr: string[]): string => arr.join(" | ");

export const GET: APIRoute = () => {
  const cols = [
    "id",
    "name",
    "aliases",
    "category",
    "prevalence",
    "difficulty",
    "footprint",
    "summary",
    "primary_muscles",
    "secondary_muscles",
    "joints",
    "adult_sets_reps",
    "adult_sets",
    "adult_rest",
    "child_band",
    "child_sets_reps",
    "child_supervision",
    "easier",
    "harder",
    "avoid_if",
    "confidence",
    "sources",
  ];

  const rows = EQUIPMENT.map((e) =>
    [
      e.id,
      e.name,
      join(e.aliases),
      e.category,
      e.prevalence,
      e.difficulty,
      e.footprint,
      e.summary,
      join(e.muscles.primary),
      join(e.muscles.secondary),
      join(e.joints),
      e.minutes.adult.perStation,
      e.minutes.adult.sets,
      e.minutes.adult.rest,
      e.minutes.child.band,
      e.minutes.child.perStation,
      e.minutes.child.supervision,
      e.easier,
      e.harder,
      join(e.overuse.avoidIf),
      e.confidence,
      join(e.sources),
    ]
      .map(cell)
      .join(","),
  );

  const csv = [
    "# Open Gym equipment catalogue — CC BY-SA 4.0",
    "# General information, not medical advice. Times are programming suggestions.",
    cols.join(","),
    ...rows,
  ].join("\n");

  return new Response(csv, {
    headers: {
      "content-type": "text/csv; charset=utf-8",
      "content-disposition": 'attachment; filename="open-gym-equipment.csv"',
      "cache-control": "public, max-age=3600",
    },
  });
};
