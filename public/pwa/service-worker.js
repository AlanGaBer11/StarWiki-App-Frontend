// Nombre de los cachés
const CACHE_NAME = "starwiki-cache-v1";
const RUNTIME_CACHE = "runtime-cache-v1";

// Archivos a precachear
const PRECACHE_ASSETS = [
  "/", // home
  "/index.html",
  "/icon/logo-32x32.png",
  "/icon/logo-192x192.png",
  "/icon/logo-512x512.png",
];

// =============================
// INSTALL — Precache estático
// =============================
self.addEventListener("install", (event) => {
  console.log("[SW] Instalando Service Worker...");

  event.waitUntil(
    caches.open(CACHE_NAME).then((cache) => {
      console.log("[SW] Precaching assets...");
      return cache.addAll(PRECACHE_ASSETS);
    })
  );

  self.skipWaiting();
});

// =============================
// ACTIVATE — Limpiar cachés viejos
// =============================
self.addEventListener("activate", (event) => {
  console.log("[SW] Activando...");

  event.waitUntil(
    caches.keys().then((keys) =>
      Promise.all(
        keys.map((key) => {
          if (key !== CACHE_NAME && key !== RUNTIME_CACHE) {
            console.log("[SW] Borrando caché antiguo:", key);
            return caches.delete(key);
          }
        })
      )
    )
  );

  self.clients.claim();
});

// =============================
// FETCH — Estrategias de cache
// =============================
self.addEventListener("fetch", (event) => {
  const request = event.request;
  const url = new URL(request.url);

  // =============================
  // 1. Cache First para assets (CSS, JS, imágenes)
  // =============================
  if (
    request.destination === "style" ||
    request.destination === "script" ||
    request.destination === "image"
  ) {
    event.respondWith(cacheFirst(request));
    return;
  }

  // =============================
  // 2. Network First para páginas o API
  // =============================
  if (url.origin === location.origin) {
    event.respondWith(networkFirst(request));
    return;
  }

  // default: network first
  event.respondWith(networkFirst(request));
});

// =============================
// Estrategia: Cache First
// =============================
async function cacheFirst(request) {
  const cache = await caches.open(RUNTIME_CACHE);
  const cached = await cache.match(request);

  if (cached) {
    // Devolver desde caché
    return cached;
  }

  // Si no está en caché → pedir a la red
  try {
    const response = await fetch(request);
    cache.put(request, response.clone());
    return response;
  } catch (err) {
    console.warn("[SW] CacheFirst ERROR:", err);
    throw err;
  }
}

// =============================
// Estrategia: Network First
// =============================
async function networkFirst(request) {
  const cache = await caches.open(RUNTIME_CACHE);

  try {
    const response = await fetch(request);
    cache.put(request, response.clone());
    return response;
  } catch (err) {
    console.warn("[SW] NetworkFirst ERROR:", err);

    // Si falla → intentar usar caché
    const cached = await cache.match(request);

    if (cached) {
      return cached;
    }

    // Opcional: fallback offline
    return caches.match("/index.html");
  }
}
