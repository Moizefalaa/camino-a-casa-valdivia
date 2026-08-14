/* Service Worker · Modo Valdivia
   Estrategia:
   - Precache del casco de la app al instalar.
   - Tiles: cache-first (inmutables).
   - Resto del mismo origen: network-first (frescura en línea) con respaldo
     en caché (funciona offline tras la primera visita).
   - Peticiones cruzadas (OSRM, tiles online de OSM): se dejan pasar. */
const VERSION = "mv-v1";
const CACHE = "modo-valdivia-" + VERSION;

const PRECACHE = [
  "./",
  "./index.html",
  "./manifest.webmanifest",
  "./css/estilo.css",
  "./js/despachador.js",
  "./js/mapa.js",
  "./js/explorar.js",
  "./js/mision.js",
  "./js/datos-seguros.js",
  "./js/panel-docente.js",
  "./js/main.js",
  "./js/datos/hitos.js",
  "./js/datos/micros.js",
  "./js/datos/evacuacion.js",
  "./js/datos/misiones.js",
  "./js/datos/emergencias.js",
  "./js/datos/galeria.js",
  "./vendor/leaflet/leaflet.js",
  "./vendor/leaflet/leaflet.css",
  "./vendor/leaflet/images/marker-icon.png",
  "./vendor/leaflet/images/marker-icon-2x.png",
  "./vendor/leaflet/images/marker-shadow.png",
  "./vendor/leaflet/images/layers.png",
  "./vendor/leaflet/images/layers-2x.png",
  "./iconos/icono.svg",
  "./iconos/icono-192.png",
  "./iconos/icono-512.png"
];

self.addEventListener("install", (e) => {
  e.waitUntil(
    caches.open(CACHE).then((c) => c.addAll(PRECACHE)).then(() => self.skipWaiting())
  );
});

self.addEventListener("activate", (e) => {
  e.waitUntil(
    caches.keys()
      .then((claves) => Promise.all(claves.filter((k) => k !== CACHE).map((k) => caches.delete(k))))
      .then(() => self.clients.claim())
  );
});

self.addEventListener("fetch", (e) => {
  const req = e.request;
  if (req.method !== "GET") return;
  const url = new URL(req.url);
  if (url.origin !== location.origin) return;

  if (url.pathname.includes("/tiles/")) {
    e.respondWith(cacheFirst(req));
  } else {
    e.respondWith(networkFirst(req));
  }
});

async function cacheFirst(req) {
  const enCache = await caches.match(req);
  if (enCache) return enCache;
  try {
    const r = await fetch(req);
    if (r.ok) {
      const c = await caches.open(CACHE);
      c.put(req, r.clone());
    }
    return r;
  } catch (err) {
    return new Response("", { status: 504 });
  }
}

async function networkFirst(req) {
  try {
    const r = await fetch(req);
    if (r.ok) {
      const c = await caches.open(CACHE);
      c.put(req, r.clone());
    }
    return r;
  } catch (err) {
    const enCache = await caches.match(req);
    if (enCache) return enCache;
    return new Response("Sin conexión y sin copia en caché", { status: 504 });
  }
}
