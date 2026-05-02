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
