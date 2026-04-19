"use client";

import { useEffect, useState } from "react";
import Lenis from "../lib/lenis.mjs";

const LENIS_OPTIONS = {
  duration: 1.15,
  smoothWheel: true,
  smoothTouch: false,
  wheelMultiplier: 0.95,
};

const prefersReducedMotion = () =>
  window.matchMedia("(prefers-reduced-motion: reduce)").matches;

export default function ClientScrollProvider({ children }) {
  const [isReady, setIsReady] = useState(false);

  useEffect(() => {
    // Wait for assets to be ready before initializing smooth scroll
    const handleAssetsReady = () => {
      setIsReady(true);
    };

    if (sessionStorage.getItem("tedx_assets_loaded_session") === "true") {
      setIsReady(true);
    } else {
      window.addEventListener("assets-ready", handleAssetsReady);
    }

    return () => {
      window.removeEventListener("assets-ready", handleAssetsReady);
    };
  }, []);

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
