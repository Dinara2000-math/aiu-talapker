const CACHE_NAME = 'aiu-talapker-v1';
const ASSETS = [
  './',
  './index.html',
  './about.html',
  './programs.html',
  './campus.html',
  './admission.html',
  './style.css',
  './script.js',
  './chatbot.css',
  './chatbot.js',
  './manifest.json'
];

self.addEventListener('install', (e) => {
  e.waitUntil(
    caches.open(CACHE_NAME).then((cache) => cache.addAll(ASSETS)).then(() => self.skipWaiting())
  );
});

self.addEventListener('activate', (e) => {
  e.waitUntil(
    caches.keys().then((keys) => {
      return Promise.all(
        keys.filter((key) => key !== CACHE_NAME).map((key) => caches.delete(key))
      );
    }).then(() => self.clients.claim())
  );
});

self.addEventListener('fetch', (e) => {
  if (e.request.method !== 'GET') return;
  e.respondWith(
    caches.match(e.request).then((cached) => {
      return cached || fetch(e.request).then((resp) => {
        return resp;
      });
    }).catch(() => caches.match('./index.html'))
  );
});
