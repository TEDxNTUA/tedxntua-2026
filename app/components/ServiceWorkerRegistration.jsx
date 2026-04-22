"use client";

import { useEffect } from "react";
import { withBasePath } from "../lib/basePath";

export default function ServiceWorkerRegistration() {
  useEffect(() => {
    if ("serviceWorker" in navigator && window.location.protocol === "https:" || window.location.hostname === "localhost") {
      const swUrl = withBasePath("/service-worker.js");
      
      navigator.serviceWorker
        .register(swUrl)
        .then((registration) => {
          console.log("Service Worker registered with scope:", registration.scope);
        })
        .catch((error) => {
          console.error("Service Worker registration failed:", error);
        });
    }
  }, []);

  return null;
}
