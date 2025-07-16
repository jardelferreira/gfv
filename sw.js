const CACHE_NAME = "pwa-tabela-v2";
const urlsToCache = [
  "https://jardelferreira.github.io/gfv/",
  "https://jardelferreira.github.io/gfv/index.html",
  "https://jardelferreira.github.io/gfv/manifest.json",
  "https://jardelferreira.github.io/gfv/icon-192.png",
  "https://jardelferreira.github.io/gfv/icon-512.png",
  "https://jardelferreira.github.io/gfv/styles.css",
  "https://jardelferreira.github.io/gfv/spinner.png",
  "https://jardelferreira.github.io/gfv/operacoes.js",
  "https://jardelferreira.github.io/gfv/script.js",
];

self.addEventListener("install", event => {
  event.waitUntil(
    caches.open(CACHE_NAME).then(cache => cache.addAll(urlsToCache))
  );
});

self.addEventListener("activate", event => {
  event.waitUntil(
    caches.keys().then(keyList =>
      Promise.all(
        keyList.map(key => {
          if (key !== CACHE_NAME) return caches.delete(key);
        })
      )
    )
  );
});

self.addEventListener("fetch", event => {
  event.respondWith(
    caches.match(event.request).then(resp => resp || fetch(event.request))
  );
});
