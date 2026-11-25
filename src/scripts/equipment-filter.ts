function initFilter() {
  const bar = document.querySelector<HTMLElement>("[data-filterbar]");
  if (!bar || bar.dataset.ready) return;
  bar.dataset.ready = "1";

  const input = bar.querySelector<HTMLInputElement>("[data-filter-search]");
  const chips = Array.from(bar.querySelectorAll<HTMLButtonElement>("[data-filter-cat]"));
  const countEl = document.querySelector<HTMLElement>("[data-result-count]");
  const cards = Array.from(document.querySelectorAll<HTMLElement>("[data-station]"));
  const empty = document.querySelector<HTMLElement>("[data-empty]");

  let active = "all";
  const params = new URLSearchParams(window.location.search);
  const fromUrl = params.get("cat");
  if (fromUrl && chips.some((c) => c.dataset.filterCat === fromUrl)) active = fromUrl;

  const apply = () => {
    const q = (input?.value ?? "").trim().toLowerCase();
    let shown = 0;
    for (const card of cards) {
      const cat = card.dataset.cat ?? "";
      const hay = `${card.dataset.name ?? ""} ${card.dataset.aliases ?? ""} ${card.dataset.muscles ?? ""}`;
      const okCat = active === "all" || cat === active;
      const okQ = q === "" || hay.includes(q);
      const show = okCat && okQ;
      card.hidden = !show;
      if (show) shown += 1;
    }
    if (countEl) countEl.textContent = String(shown);
    if (empty) empty.hidden = shown !== 0;
    for (const c of chips) c.setAttribute("aria-pressed", String(c.dataset.filterCat === active));
  };

  for (const c of chips) {
    c.addEventListener("click", () => {
      active = c.dataset.filterCat ?? "all";
      const url = new URL(window.location.href);
      if (active === "all") url.searchParams.delete("cat");
      else url.searchParams.set("cat", active);
      history.replaceState(null, "", url);
      apply();
    });
  }

  input?.addEventListener("input", apply);
  apply();
}

if (typeof window !== "undefined") {
  if (document.readyState === "loading") document.addEventListener("DOMContentLoaded", initFilter);
  else initFilter();
  document.addEventListener("astro:page-load", initFilter);
}
