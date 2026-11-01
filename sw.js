// Service worker: deixa o app abrir sem internet e receber atualizações quando houver conexão.
const V = "pg-v1";
const CORE = ["./", "index.html", "jspdf.umd.min.js", "manifest.webmanifest", "icon-192.png", "icon-512.png"];

self.addEventListener("install", e => {
  e.waitUntil(caches.open(V).then(c => c.addAll(CORE)).then(() => self.skipWaiting()));
});

self.addEventListener("activate", e => {
  e.waitUntil(
    caches.keys()
      .then(keys => Promise.all(keys.filter(k => k !== V).map(k => caches.delete(k))))
      .then(() => self.clients.claim())
  );
});

self.addEventListener("fetch", e => {
  const r = e.request;
  if (r.method !== "GET") return;
  const u = new URL(r.url);
  const mesmoSite = u.origin === location.origin;
  const fonte = /(^|\.)fonts\.(googleapis|gstatic)\.com$/.test(u.hostname);
  if (!mesmoSite && !fonte) return; // vídeos do YouTube vão direto pela rede
  e.respondWith(
    fetch(r)
      .then(res => { if (res.ok) { const cp = res.clone(); caches.open(V).then(c => c.put(r, cp)); } return res; })
      .catch(() => caches.match(r).then(m => m || (r.mode === "navigate" ? caches.match("index.html") : Response.error())))
  );
});
