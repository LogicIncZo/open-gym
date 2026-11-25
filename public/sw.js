/* Open Gym offline cache. Install prefetches every page from offline-manifest.json,
   so the whole field guide is available at the park with no signal. */

const CACHE = "open-gym-v1";
const BASE = "/open-gym";

self.addEventListener("install", (event) => {
  event.waitUntil(
    (async () => {
      const cache = await caches.open(CACHE);
      await cache.addAll([`${BASE}/`, `${BASE}/offline-manifest.json`]);
      try {
        const res = await fetch(`${BASE}/offline-manifest.json`, { cache: "no-store" });
        if (res.ok) {
          const paths = await res.json();
          await Promise.allSettled(
            paths.map((p) => cache.add(new Request(p, { cache: "reload" }))),
          );
        }
      } catch {
        /* Online install is optional — runtime caching still works. */
      }
      await self.skipWaiting();
    })(),
  );
});

self.addEventListener("activate", (event) => {
  event.waitUntil(
    (async () => {
      const keys = await caches.keys();
      await Promise.all(
        keys
          .filter((k) => k.startsWith("open-gym-") && k !== CACHE)
          .map((k) => caches.delete(k)),
      );
      await self.clients.claim();
    })(),
  );
});

self.addEventListener("fetch", (event) => {
  const req = event.request;
  if (req.method !== "GET") return;
  const url = new URL(req.url);
  if (url.origin !== self.location.origin) return;

  if (req.mode === "navigate") {
    event.respondWith(
      (async () => {
        const cache = await caches.open(CACHE);
        const clean = `${url.origin}${url.pathname}`;
        try {
          const fresh = await fetch(req);
          cache.put(clean, fresh.clone());
          return fresh;
        } catch {
          return (
            (await cache.match(clean)) ||
            (await cache.match(req)) ||
            (await cache.match(`${BASE}/`)) ||
            Response.error()
          );
        }
      })(),
    );
    return;
  }

  event.respondWith(
    (async () => {
      const cache = await caches.open(CACHE);
      const hit = await cache.match(req);
      if (hit) {
        event.waitUntil(
          fetch(req)
            .then((res) => {
              if (res.ok) cache.put(req, res.clone());
            })
            .catch(() => {}),
        );
        return hit;
      }
      const res = await fetch(req);
      if (res.ok) cache.put(req, res.clone());
      return res;
    })(),
  );
});
