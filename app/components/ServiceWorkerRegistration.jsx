"use client";

import { useEffect } from "react";

export default function ServiceWorkerRegistration() {
  useEffect(() => {
    const removeStaleServiceWorkers = async () => {
      if ("caches" in window) {
        const cacheNames = await caches.keys();
        await Promise.all(
          cacheNames
            .filter((cacheName) => cacheName.startsWith("tedxntua"))
            .map((cacheName) => caches.delete(cacheName)),
        );
      }

      if (!("serviceWorker" in navigator)) {
        return;
      }

      const registrations = await navigator.serviceWorker.getRegistrations();
      await Promise.all(registrations.map((registration) => registration.unregister()));
    };

    removeStaleServiceWorkers().catch((error) => {
      console.error("Service Worker cleanup failed:", error);
    });
  }, []);

  return null;
}
