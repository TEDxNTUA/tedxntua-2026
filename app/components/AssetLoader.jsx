"use client";

import { useEffect, useState } from "react";
import { usePathname } from "next/navigation";
import { withBasePath } from "../lib/basePath";
import localFont from "next/font/local";

const copixelDisplay = localFont({
  src: "../../Copixel-Futuristic-Font/Fonts/Copixel-Display.otf",
  display: "swap",
});

const READY_STATE_HAVE_CURRENT_DATA = 2;
const MAX_LOADER_WAIT_MS = 20000;
const MIN_LOAD_TIME = 5000; 
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
  const [isVisible, setIsVisible] = useState(true);
  const [isPathCached, setIsPathCached] = useState(false);

  const isReady = readyPath === pathname || isPathCached;

  useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth < 768);
    checkMobile();
    window.addEventListener("resize", checkMobile);
    return () => window.removeEventListener("resize", checkMobile);
  }, []);

  useEffect(() => {
    // Check for cached state on mount/pathname change
    const cached = isAssetsAlreadyCached(pathname);
    if (cached) {
      setIsPathCached(true);
      setReadyPath(pathname);
      window.dispatchEvent(new CustomEvent("assets-ready", { detail: { pathname } }));
      return;
    } else {
      setIsPathCached(false);
    }

    const startTime = Date.now();
    setProgress(0);
    setIsVisible(true);
    document.body.style.overflow = "hidden";
    document.documentElement.style.overflow = "hidden";
    let isMounted = true;
    let progressInterval;

    const finalize = () => {
      if (!isMounted) return;
      
      const elapsedTime = Date.now() - startTime;
      const remainingTime = Math.max(0, MIN_LOAD_TIME - elapsedTime);

      // Smoothly animate the progress to 100% over the remaining time
      if (progressInterval) clearInterval(progressInterval);
      
      const startProgress = progress;
      const finishStartTime = Date.now();
      
      const finishInterval = setInterval(() => {
        const finishElapsed = Date.now() - finishStartTime;
        const finishDuration = Math.max(500, remainingTime); // At least 500ms for the final push
        const finishRate = Math.min(1, finishElapsed / finishDuration);
        
        const currentProgress = startProgress + (100 - startProgress) * finishRate;
        setProgress(currentProgress);

        if (finishRate >= 1) {
          clearInterval(finishInterval);
          if (!isMounted) return;
          
          markAssetsCached(pathname);
          // Start the fade out
          setIsVisible(false);
          
          // Dispatch ready event to start page content fade-in early
          window.dispatchEvent(new CustomEvent("assets-ready", { detail: { pathname } }));
          
          // Wait for fade out to complete before removing from DOM
          setTimeout(() => {
            if (isMounted) {
              setReadyPath(pathname);
              document.body.style.overflow = "";
              document.documentElement.style.overflow = "";
            }
          }, 1000);
        }
      }, 16);
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
          if (simulatedProgress < 85) {
            simulatedProgress += Math.random() * 3;
            setProgress(Math.min(simulatedProgress, 85));
          }
        }, 300);

        // Scan the entire document to ensure header and footer assets are included in the wait.
        const root = document.body;
        const images = Array.from(root.querySelectorAll("img"));
        const videos = Array.from(root.querySelectorAll("video")).filter((video) => video.preload !== "none");
        const imagePromises = images.map(waitForImage);
        const videoPromises = videos.map(waitForVideo);
        const fontPromise = document.fonts?.ready ?? Promise.resolve();
        const stylesheetPromise = waitForStylesheets();
        const timeoutPromise = new Promise((resolve) => window.setTimeout(resolve, MAX_LOADER_WAIT_MS));
        
        await Promise.race([
          Promise.all([...imagePromises, ...videoPromises, fontPromise, stylesheetPromise]),
          timeoutPromise,
        ]);
        
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
    <div 
      className={`fixed inset-0 z-[9999] bg-[#050505] flex flex-col items-center justify-center overflow-hidden transition-all duration-1000 ease-in-out ${
        isVisible ? "opacity-100 visibility-visible" : "opacity-0 invisible pointer-events-none"
      }`}
    >
      <div className="absolute inset-0 pointer-events-none opacity-40">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,_rgba(34,197,94,0.1)_0%,_transparent_70%)]" />
      </div>

      <div className="relative flex flex-col items-center w-full max-w-lg px-8">
        {/* Branding Header with Custom Font */}
        <div className={`mb-6 flex flex-col items-center animate-pulse ${copixelDisplay.className}`}>
          <h1 className="text-4xl md:text-6xl font-black tracking-[0.25em] uppercase italic flex items-center">
            <span className="bg-clip-text text-transparent bg-gradient-to-b from-white to-gray-400 drop-shadow-[0_0_10px_rgba(255,255,255,0.3)]">
              Cycle
            </span>
            <span className="ml-4 text-green-500 drop-shadow-[0_0_30px_rgba(34,197,94,0.8)]">
              0
            </span>
          </h1>
          <div className="h-[2px] w-12 bg-green-500 mt-2 shadow-[0_0_10px_rgba(34,197,94,0.8)]" />
        </div>

        <div className="relative w-full aspect-square flex items-center justify-center overflow-hidden">
          <video
            key={isMobile ? "mobile" : "desktop"}
            autoPlay
            loop
            muted
            playsInline
            className="w-full h-full object-cover scale-[1.3] md:scale-[1.1] transition-opacity duration-700 mix-blend-lighten opacity-50"
          >
            <source src={withBasePath(isMobile ? "/loading_mobile.webm" : "/loading_desktop.webm")} type="video/webm" />
            <source src={withBasePath(isMobile ? "/loading_mobile.mp4" : "/loading_desktop.mp4")} type="video/mp4" />
          </video>
          <div className="absolute inset-0 shadow-[inset_0_0_80px_60px_#050505] pointer-events-none" />
        </div>

        <div className="mt-12 flex flex-col items-center w-full max-w-[240px] gap-6">
          <div className="relative w-full h-[1px] bg-white/10 overflow-hidden">
            <div 
              className="absolute left-0 top-0 h-full bg-green-500/80 shadow-[0_0_8px_rgba(34,197,94,0.5)] transition-none"
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
