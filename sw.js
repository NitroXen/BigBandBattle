// Asignar nombre y version de la caché

const CACHE_NAME = "v1_cache_nitroxen_pwa";

// Ficheros a cachear en la aplicación
const urlsToCache = [
  "./",
  "./styles/style.css",
  "./favicons/favicon_16x16.png",
  "./favicons/favicon_32x32.png",
  "./favicons/android-chrome-192x192.png",
  "./favicons/android-chrome-512x512.png",
  "./favicons/apple-touch-icon.png",
  "./favicons/favicon.ico",
];

// Evento install
self.addEventListener("install", (e) => {
  e.waitUntil(
    caches
      .open(CACHE_NAME)
      .then((cache) => cache.addAll(urlsToCache))
      .then(() => self.skipWaiting())
      .catch((err) => {
        console.log("No se ha registrado el caché", err);
      })
  );
});

// Evento activate
self.addEventListener("activate", (e) => {
  const cacheWhitelist = [CACHE_NAME];

  e.waitUntil(
    caches
      .keys()
      .then((cacheNames) => {
        return Promise.all(
          cacheNames.map((cacheName) => {
            if (cacheWhitelist.indexOf(cacheName) === -1) {
              // Borrar elementos que no necesito
              return caches.delete(cacheName);
            }
          })
        );
      })
      .then(() => self.clients.claim())
  );
});

// Evento fetch
self.addEventListener("fetch", (e) => {
  e.respondWith(
    caches.match(e.request).then((res) => {
      if (res) {
        // Devuelvo datos desde caché
        return res;
      }
      return fetch(e.request);
    })
  );
});
