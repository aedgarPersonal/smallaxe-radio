// Riddim WSM service worker. Responsibilities:
//  1. Qualify the site as an installable PWA (requires a fetch handler).
//  2. Handle incoming Web Push messages and display a notification.
//  3. Focus or open the site when a notification is clicked.
//
// Kept tiny on purpose — no offline caching of audio or pages, because
// a radio stream can't be meaningfully "cached" and stale HTML for a
// live schedule would be worse than a network error.

const SW_VERSION = "riddim-wsm-v1";

self.addEventListener("install", (event) => {
  // Activate this version immediately on first install.
  event.waitUntil(self.skipWaiting());
});

self.addEventListener("activate", (event) => {
  // Take control of open pages as soon as we activate.
  event.waitUntil(self.clients.claim());
});

// No-op fetch handler. Its mere presence makes the app installable on Chrome.
self.addEventListener("fetch", () => {
  // Pass-through — browser handles the request normally.
});

self.addEventListener("push", (event) => {
  let payload = {
    title: "Riddim WSM",
    body: "Tap to open the station.",
    url: "/",
  };
  try {
    if (event.data) {
      const parsed = event.data.json();
      payload = { ...payload, ...parsed };
    }
  } catch (_e) {
    if (event.data) payload.body = event.data.text();
  }

  const options = {
    body: payload.body,
    icon: "/icon-192.png",
    badge: "/icon-192.png",
    tag: payload.tag || "riddim-wsm",
    renotify: true,
    data: { url: payload.url || "/" },
    vibrate: [80, 40, 80],
  };

  event.waitUntil(self.registration.showNotification(payload.title, options));
});

self.addEventListener("notificationclick", (event) => {
  event.notification.close();
  const url = (event.notification.data && event.notification.data.url) || "/";
  event.waitUntil(
    self.clients
      .matchAll({ type: "window", includeUncontrolled: true })
      .then((clients) => {
        for (const c of clients) {
          if ("focus" in c) {
            c.navigate(url);
            return c.focus();
          }
        }
        if (self.clients.openWindow) return self.clients.openWindow(url);
      }),
  );
});
