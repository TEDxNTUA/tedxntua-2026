"use client";

import { useEffect } from "react";
import { withBasePath } from "../lib/basePath";

export default function ServiceWorkerRegistration() {
  useEffect(() => {
    if (!("serviceWorker" in navigator)) {
      return;
    }

    const registerServiceWorker = async () => {
      try {
        if (process.env.NODE_ENV !== "production") {
          const registrations = await navigator.serviceWorker.getRegistrations();
          await Promise.all(registrations.map((registration) => registration.unregister()));
          return;
        }

        const registration = await navigator.serviceWorker.register(withBasePath("/service-worker.js"));
        console.log("Service Worker registered with scope:", registration.scope);
      } catch (error) {
        console.error("Service Worker registration failed:", error);
      }
    };

    registerServiceWorker();
  }, []);

  return null;
}
