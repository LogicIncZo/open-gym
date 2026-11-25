import type { Category, Equipment } from "../data/types";

export type Goal = "general" | "senior" | "beginner" | "kids" | "short";

export const GOALS: { id: Goal; label: string; blurb: string }[] = [
  {
    id: "general",
    label: "General fitness",
    blurb: "A balanced circuit that alternates upper, lower and cardio.",
  },
  {
    id: "senior",
    label: "Senior-friendly",
    blurb: "Low stations, mobility and balance first, nothing above difficulty 2.",
  },
  {
    id: "beginner",
    label: "First month",
    blurb: "One set per station, nothing above difficulty 3, longer rests.",
  },
  {
    id: "kids",
    label: "Kids along",
    blurb: "Only stations a supervised child can use, plus adult work nearby.",
  },
  {
    id: "short",
    label: "15 minutes",
    blurb: "Four stations, no more. For a park visit on the way to work.",
  },
];

export interface CircuitStep {
  stationId: string;
  name: string;
  phase: "Warm-up" | "Main" | "Cool-down";
  minutes: number;
  note: string;
}

export interface Circuit {
  steps: CircuitStep[];
  totalMinutes: number;
  restSeconds: number;
  skipped: { name: string; reason: string }[];
}

const STATION_MINUTES: Record<Category, number> = {
  cardio: 4,
  upper: 4,
  lower: 4,
  core: 3,
  mobility: 2,
  balance: 2,
  play: 3,
  multi: 6,
};

const MAX_DIFFICULTY: Record<Goal, number> = {
  general: 5,
  senior: 2,
  beginner: 3,
  kids: 3,
  short: 5,
};

const MAX_STATIONS: Record<Goal, number> = {
  general: 7,
  senior: 5,
  beginner: 6,
  kids: 5,
  short: 4,
};

const REST_SECONDS: Record<Goal, number> = {
  general: 45,
  senior: 60,
  beginner: 60,
  kids: 30,
  short: 30,
};

const KID_SAFE: Category[] = ["balance", "play", "mobility", "cardio"];

function stationNote(e: Equipment, goal: Goal): string {
  if (goal === "senior") {
    return e.category === "balance"
      ? "Hold a rail. Slow is the whole point."
      : "Work inside a range that feels free. Stop at the first pinch.";
  }
  if (goal === "kids") {
    return e.category === "play"
      ? "One child at a time, adult within arm's reach."
      : "Child uses a short range; adult supervises and does not count reps.";
  }
  if (goal === "beginner") {
    return "One set, stop two reps short of hard.";
  }
  if (goal === "short") {
    return "Keep moving — this is a squeeze-it-in circuit.";
  }
  if (e.category === "cardio") return "Steady pace you can hold for the whole block.";
  if (e.category === "balance") return "Slow, deliberate steps. Look ahead, not down.";
  if (e.category === "mobility") return "Move only through a range that feels free.";
  if (e.category === "play") return "One pass, still body. No swinging or racing.";
  if (e.category === "core") return "Two sets of slow, controlled reps.";
  return "Two sets, slow return on every rep.";
}

export function buildCircuit(stationIds: string[], equipment: Equipment[], goal: Goal = "general"): Circuit {
  const picked = stationIds
    .map((id) => equipment.find((e) => e.id === id))
    .filter((e): e is Equipment => Boolean(e));

  const skipped: { name: string; reason: string }[] = [];
  const maxDiff = MAX_DIFFICULTY[goal];

  let usable = picked.filter((e) => {
    if (e.category === "play" && goal === "senior") {
      skipped.push({ name: e.name, reason: "Play equipment is not appropriate for this circuit." });
      return false;
    }
    if (goal === "kids" && !KID_SAFE.includes(e.category)) {
      skipped.push({ name: e.name, reason: "Not suitable for a supervised child." });
      return false;
    }
    if (e.difficulty > maxDiff) {
      skipped.push({ name: e.name, reason: `Difficulty ${e.difficulty} is above this circuit's ceiling of ${maxDiff}.` });
      return false;
    }
    if (e.category === "multi" && goal === "short") {
      skipped.push({ name: e.name, reason: "A combo frame takes longer than a 15-minute circuit allows." });
      return false;
    }
    return true;
  });

  if (!usable.length) {
    return { steps: [], totalMinutes: 0, restSeconds: REST_SECONDS[goal], skipped };
  }

  /* Warm-up: the first cardio or mobility station. */
  const warmPool = usable.filter((e) => e.category === "cardio" || e.category === "mobility");
  const warm = warmPool.slice(0, 1);
  const rest = usable.filter((e) => !warm.includes(e));

  /* Reserve one mobility/balance station for the cool-down. */
  const cool = rest.find((e) => e.category === "mobility" || e.category === "balance");
  const mainPool = rest.filter((e) => e !== cool);

  /* Alternate upper and lower work, then core, then anything else. */
  const take = (cats: Category[]) =>
    mainPool.find((e) => cats.includes(e.category) && !ordered.includes(e));
  const ordered: Equipment[] = [];
  let upperTurn = true;
  while (ordered.length < mainPool.length) {
    const primary: Category[] = upperTurn ? ["upper"] : ["lower", "multi"];
    const secondary: Category[] = upperTurn ? ["lower", "multi"] : ["upper"];
    const next = take(primary) ?? take(secondary);
    if (!next) break;
    ordered.push(next);
    upperTurn = !upperTurn;
  }
  for (const e of mainPool) {
    if (!ordered.includes(e) && (e.category === "core" || e.category === "upper" || e.category === "lower" || e.category === "multi")) {
      ordered.push(e);
    }
  }
  for (const e of mainPool) if (!ordered.includes(e)) ordered.push(e);

  const cap = Math.max(MAX_STATIONS[goal] - warm.length - (cool ? 1 : 0), 0);
  const main = ordered.slice(0, cap);

  for (const e of ordered.slice(cap)) {
    skipped.push({
      name: e.name,
      reason: `Circuit is capped at ${MAX_STATIONS[goal]} stations for this goal.`,
    });
  }

  const steps: CircuitStep[] = [
    ...warm.map((e) => ({
      stationId: e.id,
      name: e.name,
      phase: "Warm-up" as const,
      minutes: e.category === "cardio" ? 3 : 2,
      note: "Easy pace. This is to raise temperature, not to train.",
    })),
    ...main.map((e) => ({
      stationId: e.id,
      name: e.name,
      phase: "Main" as const,
      minutes: STATION_MINUTES[e.category],
      note: stationNote(e, goal),
    })),
  ];

  if (cool) {
    steps.push({
      stationId: cool.id,
      name: cool.name,
      phase: "Cool-down",
      minutes: 2,
      note: "Slow, held positions. Breathe out into the stretch.",
    });
  }

  const totalMinutes = steps.reduce((t, s) => t + s.minutes, 0);
  return { steps, totalMinutes, restSeconds: REST_SECONDS[goal], skipped };
}

export function circuitText(circuit: Circuit, parkName?: string): string {
  const head = parkName ? `Open Gym circuit — ${parkName}` : "Open Gym circuit";
  const lines = [head, ""];
  let n = 1;
  for (const s of circuit.steps) {
    lines.push(`${n}. ${s.name} — ${s.minutes} min (${s.phase})`);
    n += 1;
  }
  lines.push("", `Total: ~${circuit.totalMinutes} min, ${circuit.restSeconds}s rest between stations.`);
  lines.push("General guidance, not medical advice. Stop on chest pain, dizziness or sharp joint pain.");
  return lines.join("\n");
}
