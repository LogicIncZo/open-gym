import { buildCircuit, circuitText, GOALS, type Goal } from "../lib/circuit";
import { encodePark, decodePark, type ParkPayload } from "../lib/token";
import type { Category, Equipment } from "../data/types";

interface MiniStation {
  id: string;
  name: string;
  category: Category;
  difficulty: number;
  minutes: string;
}

const BASE = (window as unknown as { __BASE__?: string }).__BASE__ ?? "";

function loadData(): MiniStation[] {
  const el = document.getElementById("og-data");
  if (!el?.textContent) return [];
  try {
    return JSON.parse(el.textContent) as MiniStation[];
  } catch {
    return [];
  }
}

function toast(msg: string) {
  const el = document.createElement("div");
  el.textContent = msg;
  el.className = "og-toast";
  document.body.appendChild(el);
  requestAnimationFrame(() => el.classList.add("is-on"));
  setTimeout(() => {
    el.classList.remove("is-on");
    setTimeout(() => el.remove(), 250);
  }, 1900);
}

async function copy(text: string) {
  try {
    await navigator.clipboard.writeText(text);
    toast("Link copied");
  } catch {
    const ta = document.createElement("textarea");
    ta.value = text;
    ta.setAttribute("readonly", "");
    ta.style.position = "fixed";
    ta.style.opacity = "0";
    document.body.appendChild(ta);
    ta.select();
    document.execCommand("copy");
    ta.remove();
    toast("Link copied");
  }
}

function initBuilder() {
  const root = document.querySelector<HTMLElement>("[data-builder]");
  if (!root || root.dataset.ready) return;
  root.dataset.ready = "1";

  const data = loadData();
  const byId = new Map(data.map((d) => [d.id, d]));
  const boxes = Array.from(root.querySelectorAll<HTMLInputElement>("input[data-station-id]"));
  const nameInput = root.querySelector<HTMLInputElement>("[data-park-name]");
  const cityInput = root.querySelector<HTMLInputElement>("[data-park-city]");
  const areaInput = root.querySelector<HTMLInputElement>("[data-park-locality]");
  const goalSelect = root.querySelector<HTMLSelectElement>("[data-park-goal]");
  const countEl = root.querySelector<HTMLElement>("[data-count]");
  const totalEl = root.querySelector<HTMLElement>("[data-total]");
  const countM = root.querySelector<HTMLElement>("[data-count-m]");
  const totalM = root.querySelector<HTMLElement>("[data-total-m]");
  const openBtnM = root.querySelector<HTMLAnchorElement>("[data-open-m]");
  const preview = root.querySelector<HTMLElement>("[data-preview]");
  const openBtn = root.querySelector<HTMLAnchorElement>("[data-open]");
  const copyBtn = root.querySelector<HTMLButtonElement>("[data-copy]");
  const clearBtn = root.querySelector<HTMLButtonElement>("[data-clear]");
  const previewList = root.querySelector<HTMLElement>("[data-preview-list]");

  const selected = new Set<string>();

  /* Prefill from an existing park link, so "rebuild" works. */
  const initial = new URLSearchParams(window.location.search).get("p");
  if (initial) {
    const parsed = decodePark(initial);
    if (parsed) {
      parsed.e.forEach((id) => selected.add(id));
      if (parsed.n && nameInput) nameInput.value = parsed.n;
      if (parsed.c && cityInput) cityInput.value = parsed.c;
      if (parsed.l && areaInput) areaInput.value = parsed.l;
      if (parsed.g && goalSelect) goalSelect.value = parsed.g;
    }
  }

  const syncBoxes = () => {
    for (const b of boxes) b.checked = selected.has(b.dataset.stationId ?? "");
  };

  const payload = (): ParkPayload => ({
    v: 1,
    n: nameInput?.value.trim() || undefined,
    c: cityInput?.value.trim() || undefined,
    l: areaInput?.value.trim() || undefined,
    e: Array.from(selected),
    g: (goalSelect?.value as Goal) || "general",
  });

  const shareUrl = () => {
    const token = encodePark(payload());
    return `${window.location.origin}${BASE}/park/?p=${token}`;
  };

  const render = () => {
    const goal = (goalSelect?.value as Goal) || "general";
    const items = Array.from(selected)
      .map((id) => byId.get(id))
      .filter((x): x is MiniStation => Boolean(x));

    const fake = items.map(
      (i) =>
        ({
          ...i,
          minutes: {},
        }) as unknown as Equipment,
    );
    const circuit = buildCircuit(Array.from(selected), fake, goal);

    if (countEl) countEl.textContent = String(selected.size);
    if (totalEl) totalEl.textContent = `~${circuit.totalMinutes} min`;
    if (countM) countM.textContent = String(selected.size);
    if (totalM) totalM.textContent = `~${circuit.totalMinutes} min`;

    if (previewList) {
      previewList.innerHTML = "";
      if (circuit.steps.length === 0) {
        const p = document.createElement("p");
        p.className = "small muted";
        p.style.margin = "0";
        p.textContent = "Tick a few stations and a circuit appears here.";
        previewList.appendChild(p);
      } else {
        const ol = document.createElement("ol");
        ol.className = "steps";
        for (const s of circuit.steps) {
          const li = document.createElement("li");
          const label = document.createElement("span");
          label.innerHTML = `<strong>${s.name}</strong> — ${s.minutes} min <span class="tiny muted">(${s.phase})</span>`;
          li.appendChild(label);
          ol.appendChild(li);
        }
        previewList.appendChild(ol);
        const note = document.createElement("p");
        note.className = "tiny muted";
        note.style.margin = "8px 0 0";
        note.textContent = `${circuit.restSeconds}s rest between stations. ${circuit.skipped.length} station(s) left out for this goal.`;
        previewList.appendChild(note);
      }
    }

    const url = selected.size ? shareUrl() : "";
    for (const btn of [openBtn, openBtnM]) {
      if (!btn) continue;
      btn.href = url || "#";
      btn.setAttribute("aria-disabled", String(!url));
      btn.style.pointerEvents = url ? "auto" : "none";
      btn.style.opacity = url ? "1" : "0.5";
    }
    if (copyBtn) copyBtn.disabled = !url;
    if (preview) preview.textContent = url ? circuitText(circuit, nameInput?.value.trim() || undefined) : "";
  };

  for (const b of boxes) {
    b.addEventListener("change", () => {
      const id = b.dataset.stationId ?? "";
      if (b.checked) selected.add(id);
      else selected.delete(id);
      render();
    });
  }
  syncBoxes();

  goalSelect?.addEventListener("change", render);
  [nameInput, cityInput, areaInput].forEach((el) => el?.addEventListener("input", render));

  copyBtn?.addEventListener("click", () => {
    if (!selected.size) return;
    copy(shareUrl());
  });

  clearBtn?.addEventListener("click", () => {
    selected.clear();
    syncBoxes();
    render();
    toast("Cleared");
  });

  openBtn?.addEventListener("click", (ev) => {
    if (!selected.size) {
      ev.preventDefault();
      toast("Pick at least one station");
    }
  });

  /* Goal change can drop stations; explain rather than silently reordering. */
  if (preview) preview.hidden = true;

  render();
}

if (typeof window !== "undefined") {
  if (document.readyState === "loading") document.addEventListener("DOMContentLoaded", initBuilder);
  else initBuilder();
  document.addEventListener("astro:page-load", initBuilder);
}

export { loadData, GOALS };
