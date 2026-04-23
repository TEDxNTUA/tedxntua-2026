"use client";

import { useEffect, useState, useRef } from "react";
import { usePathname } from "next/navigation";
import { withBasePath } from "../lib/basePath";
import localFont from "next/font/local";

const copixelDisplay = localFont({
  src: "../../Copixel-Futuristic-Font/Fonts/Copixel-Display.otf",
  display: "swap",
});

const MIN_LOAD_TIME = 2000;
const SNAPPY_LOAD_TIME = 800;
const CACHE_SESSION_PREFIX = "tedx_assets_loaded_";
const GLOBAL_SESSION_KEY = "tedx_assets_loaded_session";

const wait = (ms) => new Promise((resolve) => window.setTimeout(resolve, ms));

const getCacheKey = (pathname) => `${CACHE_SESSION_PREFIX}${pathname || "/"}`;

const isAssetsAlreadyCached = (pathname) => {
  if (typeof window === "undefined") return { pathCached: false, globalCached: false };
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
  const [prevPathname, setPrevPathname] = useState(pathname);
  const [readyPath, setReadyPath] = useState(null);
  const [progress, setProgress] = useState(0);
  const [isMobile, setIsMobile] = useState(false);
  const [isVisible, setIsVisible] = useState(true);
  const [videoError, setVideoError] = useState(false);
  const [mounted, setMounted] = useState(false);
  const videoRef = useRef(null);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (pathname !== prevPathname) {
    setPrevPathname(pathname);
    setIsVisible(true);
    setProgress(0);
    setVideoError(false);
    if (typeof window !== "undefined") {
      document.body.style.overflow = "hidden";
      document.documentElement.style.overflow = "hidden";
    }
  }

  const isFinished = readyPath === pathname;

  useEffect(() => {
    if (videoRef.current && !isVisible) {
      videoRef.current.playbackRate = 1.0; 
    }
  }, [isVisible]);

  useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth < 720);
    checkMobile();
    window.addEventListener("resize", checkMobile);
    return () => window.removeEventListener("resize", checkMobile);
  }, []);

  useEffect(() => {
    const { pathCached, globalCached } = isAssetsAlreadyCached(pathname);
    const startTime = Date.now();
    document.body.style.overflow = "hidden";
    document.documentElement.style.overflow = "hidden";
    
    let isMounted = true;
    let progressInterval;

    const finalize = (targetMinTime) => {
      if (!isMounted) return;
      const elapsedTime = Date.now() - startTime;
      const remainingTime = Math.max(0, targetMinTime - elapsedTime);
      if (progressInterval) clearInterval(progressInterval);
      
      const startProgress = progress;
      const finishStartTime = Date.now();
      const finishDuration = Math.max(300, remainingTime); 
      
      const finishInterval = setInterval(() => {
        const finishElapsed = Date.now() - finishStartTime;
        const finishRate = Math.min(1, finishElapsed / finishDuration);
        const currentProgress = startProgress + (100 - startProgress) * finishRate;
        setProgress(currentProgress);

        if (finishRate >= 1) {
          clearInterval(finishInterval);
          if (!isMounted) return;
          markAssetsCached(pathname);
          setIsVisible(false);
          window.dispatchEvent(new CustomEvent("assets-ready", { detail: { pathname } }));
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
      const targetMinTime = globalCached ? SNAPPY_LOAD_TIME : MIN_LOAD_TIME;
      const emergencyTimeout = setTimeout(() => finalize(targetMinTime), globalCached ? 5000 : 15000);

      try {
        if (document.readyState === "loading") {
          setProgress(10);
          await new Promise((resolve) => document.addEventListener("DOMContentLoaded", resolve, { once: true }));
        }
        setProgress(20);
        let simulatedProgress = 20;
        progressInterval = setInterval(() => {
          if (simulatedProgress < 85) {
            simulatedProgress += Math.random() * 2;
            setProgress(Math.min(simulatedProgress, 85));
          }
        }, 200);
        await Promise.all([document.fonts?.ready ?? Promise.resolve(), wait(globalCached ? 300 : 800)]);
        clearTimeout(emergencyTimeout);
        finalize(targetMinTime);
      } catch (error) {
        clearTimeout(emergencyTimeout);
        finalize(targetMinTime);
      }
    };

    run();
    return () => { isMounted = false; if (progressInterval) clearInterval(progressInterval); };
  }, [pathname]);

  if (isFinished) return null;

  return (
    <div 
      className={`fixed inset-0 z-[9999] bg-[#050505] flex flex-col items-center justify-center overflow-hidden transition-opacity duration-1000 ease-in-out ${
        isVisible ? "opacity-100 visible pointer-events-auto" : "opacity-0 invisible pointer-events-none"
      }`}
      style={{ backgroundImage: "radial-gradient(circle at center, #0a0a0a 0%, #050505 100%)" }}
    >
      <div className="absolute inset-0 pointer-events-none opacity-40">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,_rgba(34,197,94,0.1)_0%,_transparent_70%)]" />
      </div>

      <div className="relative flex flex-col items-center w-full max-w-lg px-8">
        <div className={`mb-6 flex flex-col items-center animate-pulse ${copixelDisplay.className}`}>
          <h1 className="text-4xl md:text-6xl font-black tracking-[0.25em] uppercase italic flex items-center">
            <span className="bg-clip-text text-transparent bg-gradient-to-b from-white to-gray-400">Cycle</span>
            <span className="ml-4 text-green-500">0</span>
          </h1>
          <div className="h-[2px] w-12 bg-green-500 mt-2 shadow-[0_0_10px_rgba(34,197,94,0.8)]" />
        </div>

        <div className="relative w-full aspect-square flex items-center justify-center overflow-hidden bg-black/20 rounded-full">
          {!videoError && mounted ? (
            <video
              ref={videoRef}
              key={isMobile ? "mobile" : "desktop"}
              autoPlay loop muted playsInline preload="auto"
              className="w-full h-full object-cover scale-[1.3] md:scale-[1.1] transition-opacity duration-700 mix-blend-lighten opacity-50"
            >
              <source src={withBasePath(isMobile ? "/loading_mobile.webm" : "/loading_desktop.webm")} type="video/webm" />
              <source src={withBasePath(isMobile ? "/loading_mobile.mp4" : "/loading_desktop.mp4")} type="video/mp4" />
            </video>
          ) : (
            <div className="w-full h-full bg-gradient-to-br from-green-500/10 to-transparent animate-pulse" />
          )}
          <div className="absolute inset-0 shadow-[inset_0_0_80px_60px_#050505] pointer-events-none" />
        </div>

        <div className="mt-12 flex flex-col items-center w-full max-w-[240px] gap-6">
          <div className="relative w-full h-[1px] bg-white/10 overflow-hidden">
            <div className="absolute left-0 top-0 h-full bg-green-500/80 w-0" style={{ width: `${progress}%` }} />
          </div>
          <div className="flex justify-between w-full text-[10px] uppercase tracking-[0.4em] text-white/30 font-light">
            <span>Preparing Experience</span>
            <span className="tabular-nums text-white/50 font-mono tracking-wider">{Math.round(progress)}%</span>
          </div>
        </div>
      </div>
      <style jsx global>{`body { background-color: #050505 !important; overflow: hidden !important; }`}</style>
    </div>
  );
}
