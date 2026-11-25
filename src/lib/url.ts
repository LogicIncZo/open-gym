const raw = import.meta.env.BASE_URL ?? "/";
export const BASE = raw.replace(/\/+$/, "");

/** Prefix a site path with the deploy base (GitHub Pages project path). */
export function u(path = "/"): string {
  if (path === "/" || path === "") return `${BASE}/`;
  return `${BASE}/${path.replace(/^\/+/, "")}`;
}
