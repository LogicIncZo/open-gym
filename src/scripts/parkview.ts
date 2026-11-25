import { buildCircuit, type Goal } from "../lib/circuit";
import { decodePark } from "../lib/token";
import type { Category, Equipment } from "../data/types";

interface MiniStation {
  id: string;
  name: string;
  category: Category;
  difficulty: number;
}

const BASE = (window as unknown as { __BASE__?: string }).__BASE__ ?? "";

function readData(): MiniStation[] {
  const el = document.getElementById("og-park-data");
  if (!el?.textContent) return [];
  try {
    return JSON.parse(el.textContent) as MiniStation[];
  } catch {
    return [];
  }
}

const PHASE_LABEL = { "Warm-up": "Warm-up", Main: "Main", "Cool-down": "Cool-down" } as const;

function paintEmpty(msg: string) {
  const empty = document.querySelector<HTMLElement>("[data-park-empty]");
  const body = document.querySelector<HTMLElement>("[data-park-body]");
  if (empty) {
    empty.hidden = false;
    const p = empty.querySelector<HTMLElement>("[data-park-empty-msg]");
    if (p) p.textContent = msg;
  }
  if (body) body.hidden = true;
}

function initParkView() {
  const root = document.querySelector<HTMLElement>("[data-parkview]");
  if (!root || root.dataset.ready) return;
  root.dataset.ready = "1";

  const token = new URLSearchParams(window.location.search).get("p");
  if (!token) {
    paintEmpty("This page needs a park link. Build one and the inventory travels in the URL.");
    return;
  }
  const payload = decodePark(token);
  if (!payload || payload.e.length === 0) {
    paintEmpty("That park link could not be read. It may have been truncated when copied — open it from the original message, or build a new one.");
    return;
  }

  const data = readData();
  const byId = new Map(data.map((d) => [d.id, d]));
  const items = payload.e.map((id) => byId.get(id)).filter((x): x is MiniStation => Boolean(x));
  if (items.length === 0) {
    paintEmpty("None of the stations in this link are recognised. The guide may have been updated since the link was made.");
    return;
  }

  const name = payload.n?.trim() || "Unnamed park";
  const where = [payload.l, payload.c].filter(Boolean).join(", ");

  const titleEl = document.querySelector<HTMLElement>("[data-park-title]");
  if (titleEl) titleEl.textContent = name;
  document.title = `${name} · Open Gym`;

  const subEl = document.querySelector<HTMLElement>("[data-park-sub]");
  if (subEl) subEl.textContent = `${items.length} stations${where ? ` · ${where}` : ""} · built from a shared link`;

  const metaEl = document.querySelector<HTMLElement>("[data-park-meta]");
  if (metaEl) {
    metaEl.textContent = `${items.length} station${items.length === 1 ? "" : "s"}${where ? ` in ${where}` : ""}`;
  }

  const list = document.querySelector<HTMLElement>("[data-park-list]");
  if (list) {
    list.innerHTML = "";
    for (const item of items) {
      const li = document.createElement("li");
      const a = document.createElement("a");
      a.href = `${BASE}/equipment/${item.id}/`;
      a.textContent = item.name;
      const level = document.createElement("span");
      level.className = "cond cond--good";
      level.textContent = `Level ${item.difficulty}`;
      li.append(a, level);
      list.appendChild(li);
    }
  }

  const fake = items.map((i) => ({ ...i, minutes: {} }) as unknown as Equipment);
  const goal = (payload.g as Goal) || "general";
  const circuit = buildCircuit(items.map((i) => i.id), fake, goal);

  const circuitEl = document.querySelector<HTMLElement>("[data-park-circuit]");
  if (circuitEl) {
    circuitEl.innerHTML = "";
    const ol = document.createElement("ol");
    ol.className = "steps";
    for (const s of circuit.steps) {
      const li = document.createElement("li");
      li.innerHTML = `<span><span class="badge badge--quiet">${s.phase}</span> <strong>${s.name}</strong> — ${s.minutes} min<br><span class="tiny muted">${s.note}</span></span>`;
      ol.appendChild(li);
    }
    circuitEl.appendChild(ol);

    const total = document.createElement("p");
    total.className = "small";
    total.style.margin = "10px 0 0";
    total.innerHTML = `<strong>~${circuit.totalMinutes} min</strong> total · ${circuit.restSeconds}s rest between stations`;
    circuitEl.appendChild(total);

    if (circuit.skipped.length) {
      const det = document.createElement("details");
      det.className = "small muted";
      det.style.marginTop = "8px";
      det.innerHTML = `<summary>${circuit.skipped.length} station(s) left out of this circuit</summary><ul>${circuit.skipped
        .map((s) => `<li><strong>${s.name}</strong> — ${s.reason}</li>`)
        .join("")}</ul>`;
      circuitEl.appendChild(det);
    }
  }

  const goalEl = document.querySelector<HTMLElement>("[data-park-goal-label]");
  if (goalEl) goalEl.textContent = goal;

  const dateEl = document.querySelector<HTMLElement>("[data-park-date]");
  if (dateEl) {
    dateEl.textContent = new Date().toLocaleDateString("en-IN", {
      day: "numeric",
      month: "short",
      year: "numeric",
    });
  }

  const share = document.querySelector<HTMLElement>("[data-share]");
  if (share) {
    share.dataset.shareUrl = window.location.href;
    share.dataset.shareText = `${name}${where ? ` (${where})` : ""} — park gym stations and a circuit, via Open Gym.`;
  }

  const rebuild = document.querySelector<HTMLAnchorElement>("[data-rebuild]");
  if (rebuild) rebuild.href = `${BASE}/build/?p=${token}`;

  const body = document.querySelector<HTMLElement>("[data-park-body]");
  if (body) body.hidden = false;
  const empty = document.querySelector<HTMLElement>("[data-park-empty]");
  if (empty) empty.hidden = true;
}

if (typeof window !== "undefined") {
  if (document.readyState === "loading") document.addEventListener("DOMContentLoaded", initParkView);
  else initParkView();
  document.addEventListener("astro:page-load", initParkView);
}

export { PHASE_LABEL };
