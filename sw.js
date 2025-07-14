const CACHE_NAME = "pwa-tabela-v2";
const urlsToCache = [
  "./",
  "./index.html",
  "./manifest.json",
  "./icon-192.png",
  "./icon-512.png",
  "./styles.css",
  "https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.0.0/js/all.min.js",
  "https://code.jquery.com/jquery-3.7.0.min.js",
  "https://cdn.jsdelivr.net/npm/select2@4.1.0-rc.0/dist/js/select2.min.js",
  "./operacoes.js",
  "./script.js",
  "https://cdn.tailwindcss.com",
  "https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.0.0/css/all.min.css",
  "https://cdnjs.cloudflare.com/ajax/libs/select2/4.0.13/css/select2.min.css",
  "https://fonts.googleapis.com/css2?family=Inter:wght@400;600&display=swap",
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
