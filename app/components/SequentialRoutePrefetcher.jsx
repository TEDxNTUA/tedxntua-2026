"use client";

import { useEffect } from "react";
import { usePathname, useRouter } from "next/navigation";

const ROUTES_TO_WARM = [
  "/event/program",
  "/event/speakers",
  "/event/performances",
  "/event/professionalWorkshops",
  "/event/experienceWorkshops",
  "/event/sideHappenings",
  "/sponsors",
  "/team",
];

const PREFETCH_DELAY_MS = 1200;

function shouldSkipRouteWarmup() {
  if (typeof window === "undefined") return true;

  const connection = navigator.connection || navigator.mozConnection || navigator.webkitConnection;
  const isConstrainedNetwork =
    connection?.saveData ||
    connection?.effectiveType === "slow-2g" ||
    connection?.effectiveType === "2g";

  return window.matchMedia("(max-width: 768px)").matches || isConstrainedNetwork;
}

export default function SequentialRoutePrefetcher() {
  const pathname = usePathname() ?? "/";
  const router = useRouter();

  useEffect(() => {
    if (process.env.NODE_ENV !== "production" || shouldSkipRouteWarmup()) {
      return;
    }

    let cancelled = false;
    let timeoutId;
    const routes = ROUTES_TO_WARM.filter((route) => route !== pathname);

    const warmNext = (index) => {
      if (cancelled || index >= routes.length) return;

      router.prefetch(routes[index]);
      timeoutId = window.setTimeout(() => warmNext(index + 1), PREFETCH_DELAY_MS);
    };

    const start = () => {
      timeoutId = window.setTimeout(() => warmNext(0), PREFETCH_DELAY_MS);
    };

    if ("requestIdleCallback" in window) {
      const idleId = window.requestIdleCallback(start, { timeout: 3000 });
      return () => {
        cancelled = true;
        window.cancelIdleCallback(idleId);
        window.clearTimeout(timeoutId);
      };
    }

    start();

    return () => {
      cancelled = true;
      window.clearTimeout(timeoutId);
    };
  }, [pathname, router]);

  return null;
}
