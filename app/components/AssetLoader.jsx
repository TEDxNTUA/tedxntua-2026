"use client";

import { useEffect, useState, useRef } from "react";
import { usePathname } from "next/navigation";
import { withBasePath } from "../lib/basePath";
import localFont from "next/font/local";

const copixelDisplay = localFont({
  src: "../../Copixel-Futuristic-Font/Fonts/Copixel-Display.otf",
  display: "swap",
});

const MIN_LOAD_TIME = 1500; // Snappier initial load
const CACHE_SESSION_PREFIX = "tedx_assets_loaded_";
const GLOBAL_SESSION_KEY = "tedx_assets_loaded_session";

const wait = (ms) =>
  new Promise((resolve) => {
    window.setTimeout(resolve, ms);
  });

const getCacheKey = (pathname) => `${CACHE_SESSION_PREFIX}${pathname || "/"}`;
const isAssetsAlreadyCached = (pathname) => {
  if (typeof window === "undefined") return false;
  try { 
    const pathCached = sessionStorage.getItem(getCacheKey(pathname)) === "true";
    const globalCached = sessionStorage.getItem(GLOBAL_SESSION_KEY) === "true";
    return { pathCached, globalCached };
  } catch { 
    return { pathCached: false, globalCached: false };
  }
};

const markAssetsCached = (pathname) => {
  if (typeof window === "undefined") return;
  try { 
    sessionStorage.setItem(getCacheKey(pathname), "true");
    sessionStorage.setItem(GLOBAL_SESSION_KEY, "true");
  } catch {}
};

export default function AssetLoader() {
  const pathname = usePathname() ?? "/";
  const [readyPath, setReadyPath] = useState(null);
  const [progress, setProgress] = useState(0);
  const [isMobile, setIsMobile] = useState(false);
  const [isVisible, setIsVisible] = useState(true);
  const [isPathCached, setIsPathCached] = useState(false);
  const videoRef = useRef(null);

  const isReady = readyPath === pathname || isPathCached;

  useEffect(() => {
    if (videoRef.current) {
      videoRef.current.playbackRate = 1.0; // Smoother natural playback during fade out
    }
  }, [isVisible]);

  useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth < 768);
    checkMobile();
    window.addEventListener("resize", checkMobile);
    return () => window.removeEventListener("resize", checkMobile);
  }, []);

  useEffect(() => {
    // Check for cached state on mount/pathname change
    const { pathCached, globalCached } = isAssetsAlreadyCached(pathname);
    setIsPathCached(pathCached);

    if (pathCached) {
      setReadyPath(pathname);
      document.body.style.overflow = "";
      document.documentElement.style.overflow = "";
      window.dispatchEvent(new CustomEvent("assets-ready", { detail: { pathname } }));
      return undefined;
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
      // targetMinTime: 500ms if globally cached, else 1500ms
      const targetMinTime = globalCached ? 500 : MIN_LOAD_TIME;
      const remainingTime = Math.max(0, targetMinTime - elapsedTime);

      // Smoothly animate the progress to 100% over the remaining time
      if (progressInterval) clearInterval(progressInterval);
      
      const startProgress = progress;
      const finishStartTime = Date.now();
      
      const finishInterval = setInterval(() => {
        const finishElapsed = Date.now() - finishStartTime;
        const finishDuration = Math.max(300, remainingTime); 
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
          }, 800);
        }
      }, 16);
    };

    const run = async () => {
      // Emergency timeout to ensure loader always disappears
      const emergencyTimeout = setTimeout(() => {
        console.warn("AssetLoader: Emergency timeout reached");
        finalize();
      }, 5000);

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

        // Do not wait for page videos here. The home scrubber video is large and
        // should load progressively after the page becomes interactive.
        await Promise.race([
          document.fonts?.ready ?? Promise.resolve(),
          wait(1200),
        ]);
        
        clearTimeout(emergencyTimeout);
        finalize();
      } catch (error) {
        clearTimeout(emergencyTimeout);
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
      className={`fixed inset-0 z-[9999] bg-[#050505] flex flex-col items-center justify-center overflow-hidden transition-opacity duration-1000 ease-in-out ${
        isVisible ? "opacity-100 visible pointer-events-auto" : "opacity-0 invisible pointer-events-none"
      }`}
      style={{
        background: "radial-gradient(circle at center, #0a0a0a 0%, #050505 100%)"
      }}
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

        <div className="relative w-full aspect-square flex items-center justify-center overflow-hidden bg-black/20 rounded-full">
          <video
            ref={videoRef}
            key={isMobile ? "mobile" : "desktop"}
            autoPlay
            loop
            muted
            playsInline
            onError={() => {
              console.error("AssetLoader video failed to load");
              // Video failure shouldn't block the progress bar which is outside this div
            }}
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
