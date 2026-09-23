// Self-destructing service worker. strivis.app once served an app build that
// registered a service worker at /sw.js; browsers that visited back then keep
// serving its cached index.html, whose asset files no longer exist, which
// leaves a white screen. Browsers re-check /sw.js on navigation, pick up this
// file, and it deletes every cache, unregisters itself and reloads open tabs
// so they get the real site. The website itself registers no service worker.
self.addEventListener("install", () => self.skipWaiting());

self.addEventListener("activate", (event) => {
  event.waitUntil(
    (async () => {
      const keys = await caches.keys();
      await Promise.all(keys.map((key) => caches.delete(key)));
      await self.registration.unregister();
      const clients = await self.clients.matchAll({ type: "window" });
      for (const client of clients) client.navigate(client.url);
    })()
  );
});
