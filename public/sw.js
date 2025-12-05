// Obligatorio para que Workbox inserte los assets
self.__WB_MANIFEST;

// Nombre de los caches para runtime
const RUNTIME_CACHE = "runtime-cache-v1";

// INSTALL — Workbox maneja el precache
self.addEventListener("install", () => {
  console.log("[SW] Instalando (injectManifest)...");
  self.skipWaiting();
});

// ACTIVATE — limpiar caches viejos
self.addEventListener("activate", (event) => {
  console.log("[SW] Activando…");

  event.waitUntil(
    caches.keys().then((keys) =>
      Promise.all(
        keys.map((key) => {
          if (key !== RUNTIME_CACHE) {
            console.log("[SW] Borrando cache viejo:", key);
            return caches.delete(key);
          }
        })
      )
    )
  );

  self.clients.claim();
});

// FETCH — estrategias
self.addEventListener("fetch", (event) => {
  const req = event.request;

  if (
    req.destination === "style" ||
    req.destination === "script" ||
    req.destination === "image"
  ) {
    event.respondWith(cacheFirst(req));
    return;
  }

  event.respondWith(networkFirst(req));
});

// Cache First
async function cacheFirst(request) {
  const cached = await caches.match(request);
  if (cached) return cached;

  try {
    const res = await fetch(request);
    const cache = await caches.open(RUNTIME_CACHE);
    cache.put(request, res.clone());
    return res;
  } catch (err) {
    console.warn("[SW] CacheFirst ERROR:", err);
    throw err;
  }
}

// Network First
async function networkFirst(request) {
  try {
    const res = await fetch(request);
    const cache = await caches.open(RUNTIME_CACHE);
    cache.put(request, res.clone());
    return res;
  } catch (err) {
    console.warn("[SW] NetworkFirst ERROR:", err);

    const cached = await caches.match(request);
    if (cached) return cached;

    return caches.match("/index.html");
  }
}
