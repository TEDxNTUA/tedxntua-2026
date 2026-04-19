"use client";

import { useEffect, useState } from "react";
import { usePathname } from "next/navigation";
import Lenis from "../lib/lenis.mjs";

const LENIS_OPTIONS = {
  duration: 1.15,
  smoothWheel: true,
  smoothTouch: false,
  wheelMultiplier: 0.95,
};

const CACHE_SESSION_PREFIX = "tedx_assets_loaded_";

const getCacheKey = (pathname) => `${CACHE_SESSION_PREFIX}${pathname || "/"}`;

const isPathCached = (pathname) => {
  if (typeof window === "undefined") return false;
  try {
    return sessionStorage.getItem(getCacheKey(pathname)) === "true";
  } catch {
    return false;
  }
};

const prefersReducedMotion = () =>
  window.matchMedia("(prefers-reduced-motion: reduce)").matches;

export default function ClientScrollProvider({ children }) {
  const pathname = usePathname() ?? "/";
  const [readyPath, setReadyPath] = useState(null);

  const isReady = readyPath === pathname || isPathCached(pathname);

  useEffect(() => {
    // Wait for assets to be ready before initializing smooth scroll
    const handleAssetsReady = (event) => {
      const loadedPath = event?.detail?.pathname;
      if (!loadedPath || loadedPath === pathname) {
        setReadyPath(pathname);
      }
    };

    if (isPathCached(pathname)) {
      setReadyPath(pathname);
    } else {
      window.addEventListener("assets-ready", handleAssetsReady);
    }

    return () => {
      window.removeEventListener("assets-ready", handleAssetsReady);
    };
  }, [pathname]);

  useEffect(() => {
    if (!isReady || prefersReducedMotion()) {
      return undefined;
    }

    const lenis = new Lenis(LENIS_OPTIONS);
    let frameId = 0;

    const raf = (time) => {
      lenis.raf(time);
      frameId = window.requestAnimationFrame(raf);
    };

    frameId = window.requestAnimationFrame(raf);

    return () => {
      if (frameId) {
        window.cancelAnimationFrame(frameId);
      }
      lenis.destroy();
    };
  }, [isReady]);

  return children;
}
