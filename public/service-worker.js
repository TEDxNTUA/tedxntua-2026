const CACHE_NAME = "tedxntua-2026-v2";
const ASSETS_TO_CACHE = [
  // Fonts
  "/fonts/Copixel-Display.otf",
  // Logo
  "/LOGO_ASSET.png",
  "/tedxntua_logo.png",
  "/tedxntua_logo-black.png",
];

// Cache strategies
self.addEventListener("install", (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME).then((cache) => {
      return cache.addAll(ASSETS_TO_CACHE);
    })
  );
  self.skipWaiting();
});

self.addEventListener("activate", (event) => {
  event.waitUntil(
    caches.keys().then((cacheNames) => {
      return Promise.all(
        cacheNames.map((cacheName) => {
          if (cacheName !== CACHE_NAME) {
            return caches.delete(cacheName);
          }
        })
      );
    }).then(() => self.clients.claim())
  );
});

self.addEventListener("fetch", (event) => {
  const url = new URL(event.request.url);

  if (url.pathname.includes("/_next/")) {
    event.respondWith(fetch(event.request));
    return;
  }

  // Strategy: Cache First for static assets (Images, Videos, Fonts)
  const isStaticAsset = 
    url.pathname.endsWith(".mp4") || 
    url.pathname.endsWith(".webm") || 
    url.pathname.endsWith(".png") || 
    url.pathname.endsWith(".jpg") || 
    url.pathname.endsWith(".jpeg") || 
    url.pathname.endsWith(".svg") || 
    url.pathname.endsWith(".otf") || 
    url.pathname.endsWith(".ttf");

  if (isStaticAsset) {
    event.respondWith(
      caches.match(event.request).then((cachedResponse) => {
        if (cachedResponse) {
          return cachedResponse;
        }
        return fetch(event.request).then((networkResponse) => {
          if (!networkResponse || networkResponse.status !== 200 || networkResponse.type !== 'basic') {
            return networkResponse;
          }
          const responseToCache = networkResponse.clone();
          caches.open(CACHE_NAME).then((cache) => {
            cache.put(event.request, responseToCache);
          });
          return networkResponse;
        });
      })
    );
    return;
  }

  // Default: Network First for everything else
  event.respondWith(
    fetch(event.request).catch(() => {
      return caches.match(event.request);
    })
  );
});
