// Minimal service worker — its only real job is to exist and be
// registered, which is one of the requirements browsers check before
// offering "Install app". Deliberately does NOT cache pages
// aggressively (network-first, no offline app shell) since this site's
// content (practice questions, progress, prices) changes and must
// never show a stale cached version to a logged-in user.
self.addEventListener("install", () => {
  self.skipWaiting();
});

self.addEventListener("activate", (event) => {
  event.waitUntil(self.clients.claim());
});

self.addEventListener("fetch", (event) => {
  event.respondWith(fetch(event.request).catch(() => caches.match(event.request)));
});
