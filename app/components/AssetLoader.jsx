"use client";

import { useEffect, useState } from "react";
import { usePathname } from "next/navigation";
import { withBasePath } from "../lib/basePath";

const READY_STATE_HAVE_CURRENT_DATA = 2;
const MAX_LOADER_WAIT_MS = 20000;
const CACHE_SESSION_PREFIX = "tedx_assets_loaded_";

const waitForImage = (img) =>
  new Promise((resolve) => {
    if (img.complete && img.naturalHeight !== 0) {
      resolve();
      return;
    }
    let timeoutId;
    const done = () => {
      clearTimeout(timeoutId);
      img.removeEventListener("load", done);
      img.removeEventListener("error", done);
      resolve();
    };
    timeoutId = setTimeout(done, 3000);
    img.addEventListener("load", done, { once: true });
    img.addEventListener("error", done, { once: true });
  });

const waitForVideo = (video) =>
  new Promise((resolve) => {
    if (video.readyState >= READY_STATE_HAVE_CURRENT_DATA) {
      resolve();
      return;
    }
    let timeoutId;
    const done = () => {
      clearTimeout(timeoutId);
      video.removeEventListener("loadeddata", done);
      video.removeEventListener("error", done);
      resolve();
    };
    timeoutId = setTimeout(done, 3000);
    video.addEventListener("loadeddata", done, { once: true });
    video.addEventListener("error", done, { once: true });
  });

const waitForStylesheets = async () => {
  const styleSheets = Array.from(document.styleSheets);
  for (const sheet of styleSheets) {
    if (sheet.href && !sheet.cssRules) {
      await new Promise((resolve) => {
        const checkInterval = setInterval(() => {
          try {
            if (sheet.cssRules) {
              clearInterval(checkInterval);
              resolve();
            }
          } catch {}
        }, 100);
        setTimeout(() => {
          clearInterval(checkInterval);
          resolve();
        }, 2000);
      });
    }
  }
};

const waitForCriticalAssets = async () => {
  const pageRoot = document.querySelector(".site-main") ?? document.body;
  const images = Array.from(pageRoot.querySelectorAll("img"));
  const videos = Array.from(pageRoot.querySelectorAll("video")).filter((video) => video.preload !== "none");
  const imagePromises = images.map(waitForImage);
  const videoPromises = videos.map(waitForVideo);
  const fontPromise = document.fonts?.ready ?? Promise.resolve();
  const stylesheetPromise = waitForStylesheets();
  const timeoutPromise = new Promise((resolve) => window.setTimeout(resolve, MAX_LOADER_WAIT_MS));
  await Promise.race([
    Promise.all([...imagePromises, ...videoPromises, fontPromise, stylesheetPromise]),
    timeoutPromise,
  ]);
};

const getCacheKey = (pathname) => `${CACHE_SESSION_PREFIX}${pathname || "/"}`;
const isAssetsAlreadyCached = (pathname) => {
  if (typeof window === "undefined") return false;
  try { return sessionStorage.getItem(getCacheKey(pathname)) === "true"; } catch { return false; }
};
const markAssetsCached = (pathname) => {
  if (typeof window === "undefined") return;
  try { sessionStorage.setItem(getCacheKey(pathname), "true"); } catch {}
};

export default function AssetLoader() {
  const pathname = usePathname() ?? "/";
  const [readyPath, setReadyPath] = useState(null);
  const [progress, setProgress] = useState(0);
  const [isMobile, setIsMobile] = useState(false);

  const isPathCached = isAssetsAlreadyCached(pathname);
  const isReady = readyPath === pathname || isPathCached;

  useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth < 768);
    checkMobile();
    window.addEventListener("resize", checkMobile);
    return () => window.removeEventListener("resize", checkMobile);
  }, []);

  useEffect(() => {
    if (isAssetsAlreadyCached(pathname)) {
      setReadyPath(pathname);
      window.dispatchEvent(new CustomEvent("assets-ready", { detail: { pathname } }));
      return;
    }

    setProgress(0);
    document.body.style.overflow = "hidden";
    document.documentElement.style.overflow = "hidden";
    let isMounted = true;
    let progressInterval;

    const finalize = () => {
      if (!isMounted) return;
      if (progressInterval) clearInterval(progressInterval);
      setProgress(100);
      markAssetsCached(pathname);
      document.body.style.overflow = "";
      document.documentElement.style.overflow = "";
      window.dispatchEvent(new CustomEvent("assets-ready", { detail: { pathname } }));
      setTimeout(() => { if (isMounted) setReadyPath(pathname); }, 500);
    };

    const run = async () => {
      try {
        if (document.readyState === "loading") {
          setProgress(10);
          await new Promise((resolve) => document.addEventListener("DOMContentLoaded", resolve, { once: true }));
          setProgress(20);
        }
        let simulatedProgress = 20;
        progressInterval = setInterval(() => {
          if (simulatedProgress < 95) {
            simulatedProgress += Math.random() * 8;
            setProgress(Math.min(simulatedProgress, 95));
          }
        }, 400);
        await waitForCriticalAssets();
        finalize();
      } catch (error) {
        finalize();
      }
    };

    run();
    return () => {
      document.body.style.overflow = "";
      document.documentElement.style.overflow = "";
      if (progressInterval) clearInterval(progressInterval);
      isMounted = false;
    };
  }, [pathname]);

  if (isReady) return null;

  return (
    <div className="fixed inset-0 z-[9999] bg-[#050505] flex flex-col items-center justify-center overflow-hidden">
      {/* Ambient Background Glow */}
      <div className="absolute inset-0 pointer-events-none opacity-40">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,_rgba(34,197,94,0.1)_0%,_transparent_70%)]" />
      </div>

      <div className="relative flex flex-col items-center w-full max-w-lg px-8">
        {/* Zoomed Central Animation Container */}
        <div className="relative w-full aspect-square flex items-center justify-center overflow-hidden">
          {/* Main Video */}
          <video
            key={isMobile ? "mobile" : "desktop"}
            autoPlay
            loop
            muted
            playsInline
            className="w-full h-full object-cover scale-[1.3] md:scale-[1.1] transition-opacity duration-700"
          >
            <source src={withBasePath(isMobile ? "/loading_mobile.webm" : "/loading_desktop.webm")} type="video/webm" />
            <source src={withBasePath(isMobile ? "/loading_mobile.mp4" : "/loading_desktop.mp4")} type="video/mp4" />
          </video>
          
          {/* Subtle Vignette to blend edges */}
          <div className="absolute inset-0 shadow-[inset_0_0_80px_60px_#050505] pointer-events-none" />
        </div>

        {/* Minimalist Progress Indicator */}
        <div className="mt-12 flex flex-col items-center w-full max-w-[240px] gap-6">
          <div className="relative w-full h-[1px] bg-white/10 overflow-hidden">
            <div 
              className="absolute left-0 top-0 h-full bg-green-500/80 shadow-[0_0_8px_rgba(34,197,94,0.5)] transition-all duration-700 ease-out"
              style={{ width: `${progress}%` }}
            />
          </div>
          
          <div className="flex justify-between w-full">
            <span className="text-[10px] uppercase tracking-[0.4em] text-white/30 font-light">
              Preparing Experience
            </span>
            <span className="text-[10px] tabular-nums text-white/50 font-mono tracking-wider">
              {Math.round(progress)}%
            </span>
          </div>
        </div>
      </div>

      <style jsx global>{`
        body {
          background-color: #050505 !important;
          overflow: hidden !important;
        }
      `}</style>
    </div>
  );
}
