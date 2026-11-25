import type { APIRoute } from "astro";
import { ART } from "../../data/art";
import { EQUIPMENT } from "../../data/equipment";
import { categoryMeta } from "../../data/types";

const esc = (s: string): string =>
  s.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/"/g, "&quot;");

export function getStaticPaths() {
  return [
    { params: { id: "home" } },
    ...EQUIPMENT.map((e) => ({ params: { id: e.id } })),
  ];
}

export const GET: APIRoute = ({ params }) => {
  const id = params.id ?? "home";
  const item = EQUIPMENT.find((e) => e.id === id);
  const art = ART[id === "home" ? "multi-gym" : id] ?? "";

  const title = item ? item.name : "Open Gym";
  const kicker = item ? categoryMeta(item.category).label : "An open field guide to India's park gyms";
  const sub = item ? item.summary : "What each station does, how long to use it, who should avoid it, and which park-board claims are false.";

  /* Wrap the 240×160 illustration text-free into a 1200×630 card. */
  const svg = `<svg xmlns="http://www.w3.org/2000/svg" width="1200" height="630" viewBox="0 0 1200 630">
  <rect width="1200" height="630" fill="#f6efe0"/>
  <rect x="28" y="28" width="1144" height="574" rx="28" fill="#fffdf6" stroke="#221f19" stroke-width="6"/>
  <g transform="translate(700 150) scale(2.05)">
    <line x1="26" y1="134" x2="214" y2="134" stroke="#C8B593" stroke-width="4" stroke-linecap="round"/>
    ${art}
  </g>
  <text x="72" y="120" font-family="ui-sans-serif, system-ui, Helvetica, Arial, sans-serif" font-size="26" font-weight="700" letter-spacing="4" fill="#b04a28">${esc(kicker.toUpperCase())}</text>
  <text x="72" y="248" font-family="Georgia, 'Times New Roman', serif" font-size="${title.length > 22 ? 74 : 96}" font-weight="600" fill="#221f19">${esc(title)}</text>
  <foreignObject x="72" y="300" width="620" height="240">
    <div xmlns="http://www.w3.org/1999/xhtml" style="font-family:ui-sans-serif,system-ui,Helvetica,Arial,sans-serif;font-size:30px;line-height:1.42;color:#585147">
      ${esc(sub)}
    </div>
  </foreignObject>
  <rect x="72" y="518" width="1056" height="4" fill="#d9cdb4"/>
  <text x="72" y="570" font-family="ui-sans-serif, system-ui, Helvetica, Arial, sans-serif" font-size="24" fill="#857c6f">logicinczo.github.io/open-gym</text>
  <text x="1030" y="570" font-family="ui-sans-serif, system-ui, Helvetica, Arial, sans-serif" font-size="24" font-weight="700" fill="#221f19" text-anchor="end">OPEN GYM</text>
</svg>`;

  return new Response(svg, {
    headers: {
      "content-type": "image/svg+xml; charset=utf-8",
      "cache-control": "public, max-age=86400",
    },
  });
};
