// public/sw.js  (injectManifest expects this file)
/// <reference lib="webworker" />

// Obligatorio: Workbox inyecta aquí el manifest
self.__WB_MANIFEST = self.__WB_MANIFEST || [];

// IMPORTANTE: usar workbox-precaching para precache + routing
import { precacheAndRoute } from "workbox-precaching";

// Esta línea hace que Workbox precachee TODAS las entradas inyectadas
precacheAndRoute(self.__WB_MANIFEST);

const RUNTIME_CACHE = "runtime-cache-v1";

// ACTIVATE — limpiar caches antiguos si quieres
self.addEventListener("activate", (event) => {
  event.waitUntil(self.clients.claim());
});

// FETCH — Cache First para assets (estáticos) y Network First para todo lo demás
self.addEventListener("fetch", (event) => {
  const req = event.request;

  // Cache First: estilos, scripts, imágenes (nota: las imágenes ya las habrá precacheado arriba)
  if (
    req.destination === "style" ||
    req.destination === "script" ||
    req.destination === "image"
  ) {
    event.respondWith(cacheFirst(req));
    return;
  }

  // Network First para navegación / API
  event.respondWith(networkFirst(req));
});

async function cacheFirst(request) {
  const cached = await caches.match(request);
  if (cached) return cached;

  try {
    const response = await fetch(request);
    const cache = await caches.open(RUNTIME_CACHE);
    cache.put(request, response.clone());
    return response;
  } catch (err) {
    const fallback = await caches.match("/index.html");
    return fallback || Response.error();
  }
}

async function networkFirst(request) {
  try {
    const response = await fetch(request);
    const cache = await caches.open(RUNTIME_CACHE);
    cache.put(request, response.clone());
    return response;
  } catch (err) {
    const cached = await caches.match(request);
    if (cached) return cached;
    return caches.match("/index.html");
  }
}
