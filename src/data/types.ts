export type Category =
  | "cardio"
  | "upper"
  | "lower"
  | "core"
  | "mobility"
  | "balance"
  | "play"
  | "multi";

export type Prevalence = "common" | "occasional" | "rare";
export type Verdict = "supported" | "partly" | "unsupported";
export type Tier = 1 | 2 | 3;

export interface Benefit {
  claim: string;
  tier: Tier;
  note: string;
}

export interface Equipment {
  id: string;
  name: string;
  aliases: string[];
  category: Category;
  prevalence: Prevalence;
  footprint: string;
  difficulty: 1 | 2 | 3 | 4 | 5;
  summary: string;
  description: string;
  muscles: { primary: string[]; secondary: string[] };
  joints: string[];
  howTo: string[];
  setup: string[];
  mistakes: { wrong: string; fix: string }[];
  benefits: Benefit[];
  easier: string;
  harder: string;
  minutes: {
    adult: { perStation: string; sets: string; rest: string };
    child: { band: string; perStation: string; supervision: string };
  };
  overuse: {
    acute: string[];
    chronic: string[];
    warning: string[];
    avoidIf: string[];
  };
  safety: { before: string[]; during: string[]; stopIf: string[] };
  maintenance: string[];
  signboard: { claim: string; verdict: Verdict; note: string }[];
  sources: string[];
  confidence: "high" | "moderate" | "low";
}

export interface CategoryMeta {
  id: Category;
  label: string;
  blurb: string;
  tint: string;
  ink: string;
}

export const CATEGORIES: CategoryMeta[] = [
  {
    id: "cardio",
    label: "Cardio",
    blurb: "Continuous-motion stations that raise heart rate. Light load, high repetition.",
    tint: "var(--terra-soft)",
    ink: "var(--terra)",
  },
  {
    id: "upper",
    label: "Upper body",
    blurb: "Push, pull and hang stations for arms, shoulders and back.",
    tint: "var(--sky-soft)",
    ink: "var(--sky)",
  },
  {
    id: "lower",
    label: "Lower body",
    blurb: "Seated or standing leg stations. Almost all are bodyweight-resisted.",
    tint: "var(--leaf-soft)",
    ink: "var(--leaf)",
  },
  {
    id: "core",
    label: "Core",
    blurb: "Trunk flexion and extension benches. Useful, and the easiest to overdo.",
    tint: "var(--amber-soft)",
    ink: "var(--amber)",
  },
  {
    id: "mobility",
    label: "Mobility",
    blurb: "Rotation, swing and stretch stations. Range of motion, not effort.",
    tint: "var(--plum-soft)",
    ink: "var(--plum)",
  },
  {
    id: "balance",
    label: "Balance",
    blurb: "Low beams and stepping surfaces for ankle and stability work.",
    tint: "var(--paper-3)",
    ink: "var(--ink-2)",
  },
  {
    id: "play",
    label: "Play / climbing",
    blurb: "Bars, nets and frames. The highest fall risk in any park gym.",
    tint: "var(--amber-soft)",
    ink: "#8a5a12",
  },
  {
    id: "multi",
    label: "Combination",
    blurb: "Multi-station rigs that bundle several movements into one frame.",
    tint: "var(--paper-3)",
    ink: "var(--ink-2)",
  },
];

export const categoryMeta = (id: Category): CategoryMeta =>
  CATEGORIES.find((c) => c.id === id) ?? CATEGORIES[0];
