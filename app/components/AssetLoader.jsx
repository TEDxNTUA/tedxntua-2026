"use client";

import { useEffect, useState } from "react";

const READY_STATE_HAVE_CURRENT_DATA = 2;
const MAX_LOADER_WAIT_MS = 2200;
const VIEWPORT_MULTIPLIER = 1.2;

const waitForImage = (img) =>
  new Promise((resolve) => {
    if (img.complete) {
      resolve();
      return;
    }

    const done = () => resolve();
    img.addEventListener("load", done, { once: true });
    img.addEventListener("error", done, { once: true });
  });

const waitForVideo = (video) =>
  new Promise((resolve) => {
    if (video.readyState >= READY_STATE_HAVE_CURRENT_DATA) {
      resolve();
      return;
    }

    const done = () => resolve();
    video.addEventListener("loadeddata", done, { once: true });
    video.addEventListener("error", done, { once: true });
  });

const isNearViewport = (el) => {
  const rect = el.getBoundingClientRect();
  const viewportHeight = window.innerHeight || 0;

  return rect.top <= viewportHeight * VIEWPORT_MULTIPLIER && rect.bottom >= 0;
};

const waitForCriticalAssets = async () => {
  const pageRoot = document.querySelector(".site-main") ?? document.body;

  const images = Array.from(pageRoot.querySelectorAll("img")).filter((img) => {
    const isLazy = img.loading === "lazy";
    return !isLazy && isNearViewport(img);
  });

  const videos = Array.from(pageRoot.querySelectorAll("video")).filter((video) => {
    const shouldPreload = video.preload !== "none";
    return shouldPreload && isNearViewport(video);
  });

  const imagePromises = images.map(waitForImage);
  const videoPromises = videos.map(waitForVideo);
  const fontPromise = document.fonts?.ready ?? Promise.resolve();
  const timeoutPromise = new Promise((resolve) => {
    window.setTimeout(resolve, MAX_LOADER_WAIT_MS);
  });

  await Promise.race([
    Promise.all([...imagePromises, ...videoPromises, fontPromise]),
    timeoutPromise,
  ]);
};

export default function AssetLoader() {
  const [isReady, setIsReady] = useState(false);

  useEffect(() => {
    document.body.style.overflow = "hidden";
    let isMounted = true;

    const finalize = () => {
      if (!isMounted) return;
      setIsReady(true);
    };

    const run = async () => {
      if (document.readyState === "loading") {
        await new Promise((resolve) => {
          document.addEventListener("DOMContentLoaded", resolve, { once: true });
        });
      }

      await waitForCriticalAssets();
      requestAnimationFrame(finalize);
    };

    run();
    return () => {
      document.body.style.overflow = "";
      isMounted = false;
    };
  }, []);

  useEffect(() => {
    if (isReady) {
      document.body.style.overflow = "";
    }
  }, [isReady]);

  if (isReady) {
    return null;
  }

  return (
    <div
      className="fixed inset-0 z-[9999] flex items-center justify-center bg-black text-white"
      aria-live="polite"
      aria-busy="true"
    >
      <div className="flex flex-col items-center gap-4">
        <div className="relative h-16 w-16" aria-hidden="true">
          <div
            className="absolute inset-0 animate-spin rounded-full"
            style={{
              background:
                "conic-gradient(from 120deg, rgba(255,255,255,0.1), rgba(255,255,255,0.9), rgba(34,197,94,0.9), rgba(255,255,255,0.1))",
              filter: "drop-shadow(0 0 10px rgba(34,197,94,0.45))",
            }}
          />
          <div className="absolute inset-[3px] rounded-full bg-black/90 border border-white/10" />
          <div className="absolute left-1/2 top-1/2 h-2.5 w-2.5 -translate-x-1/2 -translate-y-1/2 rounded-full bg-white shadow-[0_0_12px_rgba(255,255,255,0.9)] animate-pulse" />
        </div>
        <span className="text-xs uppercase tracking-[0.32em] text-white/80">
          Loading
        </span>
      </div>
    </div>
  );
}
