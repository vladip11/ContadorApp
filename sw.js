const CACHE_NAME = "v1_cache_contador_app_vue"
const urlsToCache = [
    "./",
    "./img/favi_icon.png",
    "./img/64_icon.png",
    "./img/128_icon.png",
    "./img/256_icon.png",
    "./img/512_icon.png",
    "./img/1024_icon.png",
    "./js/main.js",
    "https://unpkg.com/vue@3",
    "./js/mount_app.js",
    "./css/style.css",
    "https://necolas.github.io/normalize.css/8.0.1/normalize.css"
];

self.addEventListener("install", (e) => {
    e.waitUntil(
      caches.open(CACHE_NAME).then((cache) =>
        cache
          .addAll(urlsToCache)
          .then(() => self.skipWaiting())
          .catch((err) => console.log(err))
      )
    );
  });
  
  self.addEventListener("activate", (e) => {
    const cacheWhitelist = [CACHE_NAME];
  
    e.waitUntil(
      caches
        .keys()
        .then((cacheNames) => {
          return Promise.all(
            cacheNames.map((cacheName) => {
              if (cacheWhitelist.indexOf(cacheName) === -1) {
                return caches.delete(cacheName);
              }
            })
          );
        })
        .then(() => self.clients.claim())
    );
  });
  
  self.addEventListener("fetch", (e) => {
    e.respondWith(
      caches.match(e.request).then((res) => {
        if (res) {
          return res;
        }
  
        return fetch(e.request);
      })
    );
  });
  