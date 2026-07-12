// The Daily Woo service worker — network-first so friends always get updates,
// cache fallback so the morning memo works on the subway.

const CACHE = "dailywoo-v5";
const ASSETS = ["./", "index.html", "styles.css", "content.js", "cards.js", "app.js", "manifest.webmanifest", "icons/icon-180.png", "icons/icon-512.png"];

self.addEventListener("install", (e) => {
  e.waitUntil(caches.open(CACHE).then((c) => c.addAll(ASSETS)).then(() => self.skipWaiting()));
});

self.addEventListener("activate", (e) => {
  e.waitUntil(
    caches.keys()
      .then((keys) => Promise.all(keys.filter((k) => k !== CACHE).map((k) => caches.delete(k))))
      .then(() => self.clients.claim())
  );
});

self.addEventListener("fetch", (e) => {
  if (e.request.method !== "GET") return;
  // cache: "no-store" skips the browser's HTTP cache — GitHub Pages sends
  // max-age=600, which otherwise lets "network-first" re-serve stale files.
  e.respondWith(
    fetch(e.request, { cache: "no-store" })
      .then((res) => {
        const copy = res.clone();
        caches.open(CACHE).then((c) => c.put(e.request, copy));
        return res;
      })
      .catch(() => caches.match(e.request, { ignoreSearch: true }))
  );
});
