import type { Goal } from "./circuit";

export interface ParkPayload {
  v: 1;
  n?: string;
  c?: string;
  l?: string;
  e: string[];
  g?: Goal;
  m?: Record<string, number>;
}

const toBase64Url = (bytes: Uint8Array): string => {
  let bin = "";
  for (const b of bytes) bin += String.fromCharCode(b);
  return btoa(bin).replace(/\+/g, "-").replace(/\//g, "_").replace(/=+$/, "");
};

const fromBase64Url = (s: string): Uint8Array => {
  const b64 = s.replace(/-/g, "+").replace(/_/g, "/");
  const padded = b64 + "=".repeat((4 - (b64.length % 4)) % 4);
  const bin = atob(padded);
  const out = new Uint8Array(bin.length);
  for (let i = 0; i < bin.length; i += 1) out[i] = bin.charCodeAt(i);
  return out;
};

export function encodePark(payload: ParkPayload): string {
  const json = JSON.stringify(payload);
  return toBase64Url(new TextEncoder().encode(json));
}

export function decodePark(token: string): ParkPayload | null {
  try {
    const json = new TextDecoder().decode(fromBase64Url(token));
    const parsed = JSON.parse(json) as ParkPayload;
    if (!parsed || parsed.v !== 1 || !Array.isArray(parsed.e)) return null;
    return { ...parsed, e: parsed.e.filter((x) => typeof x === "string").slice(0, 40) };
  } catch {
    return null;
  }
}
