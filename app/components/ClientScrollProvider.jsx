"use client";

import { useEffect } from "react";
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
  useEffect(() => {
    if (prefersReducedMotion()) {
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
  }, []);

  return children;
}
