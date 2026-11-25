import { cardio } from "./cardio";
import { upper } from "./upper";
import { lower } from "./lower";
import { mobilityCore } from "./mobility-core";
import { playBalanceMulti } from "./play-balance-multi";
import type { Category, Equipment } from "../types";
import { hasArt } from "../art";

const ALL: Equipment[] = [...cardio, ...upper, ...lower, ...mobilityCore, ...playBalanceMulti];

const ORDER: Category[] = [
  "cardio",
  "upper",
  "lower",
  "core",
  "mobility",
  "balance",
  "play",
  "multi",
];

export const EQUIPMENT: Equipment[] = [...ALL].sort((a, b) => {
  const d = ORDER.indexOf(a.category) - ORDER.indexOf(b.category);
  return d !== 0 ? d : a.name.localeCompare(b.name);
});

export const BY_ID: Record<string, Equipment> = Object.fromEntries(
  EQUIPMENT.map((e) => [e.id, e]),
);

export const byId = (id: string): Equipment | undefined => BY_ID[id];

export const inCategory = (c: Category): Equipment[] =>
  EQUIPMENT.filter((e) => e.category === c);

export const allMuscles = (): string[] =>
  Array.from(
    new Set(EQUIPMENT.flatMap((e) => [...e.muscles.primary, ...e.muscles.secondary])),
  ).sort();

/* Fail the build rather than ship a page with a missing illustration. */
const missing = EQUIPMENT.filter((e) => !hasArt(e.id)).map((e) => e.id);
if (missing.length) {
  throw new Error(`Equipment without artwork: ${missing.join(", ")}`);
}

const dupes = ALL.map((e) => e.id).filter((id, i, arr) => arr.indexOf(id) !== i);
if (dupes.length) {
  throw new Error(`Duplicate equipment ids: ${[...new Set(dupes)].join(", ")}`);
}
