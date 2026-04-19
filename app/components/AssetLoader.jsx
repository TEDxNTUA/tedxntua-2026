"use client";

import { useEffect, useState } from "react";
import { usePathname } from "next/navigation";

const READY_STATE_HAVE_CURRENT_DATA = 2;
const MAX_LOADER_WAIT_MS = 20000; // Increased to 20 seconds for comprehensive asset loading
const CACHE_SESSION_PREFIX = "tedx_assets_loaded_";

// Comprehensive image waiting with network timeout handling
const waitForImage = (img) =>
  new Promise((resolve) => {
    if (img.complete && img.naturalHeight !== 0) {
      resolve();
      return;
    }

    if (img.complete && img.naturalHeight === 0) {
      // Image failed to load
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

    // 3 second per-image timeout
    timeoutId = setTimeout(done, 3000);
    img.addEventListener("load", done, { once: true });
    img.addEventListener("error", done, { once: true });
  });

// Comprehensive video waiting with network timeout handling
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

    // 3 second per-video timeout
    timeoutId = setTimeout(done, 3000);
    video.addEventListener("loadeddata", done, { once: true });
    video.addEventListener("error", done, { once: true });
  });

// Wait for all stylesheets to be loaded
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
          } catch {
            // Continue checking even if there's a CORS error
          }
        }, 100);
        
        // Timeout after 2 seconds
        setTimeout(() => {
          clearInterval(checkInterval);
          resolve();
        }, 2000);
      });
    }
  }
};

// Comprehensive critical assets waiting
const waitForCriticalAssets = async () => {
  const pageRoot = document.querySelector(".site-main") ?? document.body;

  // Get ALL images in the document (not just viewport)
  const images = Array.from(pageRoot.querySelectorAll("img"));

  // Get ALL videos that should be preloaded
  const videos = Array.from(pageRoot.querySelectorAll("video")).filter((video) => {
    const shouldPreload = video.preload !== "none";
    return shouldPreload;
  });

  // Also check for background images in elements
  const elementsWithBg = Array.from(pageRoot.querySelectorAll("[style*='background-image']"));

  const imagePromises = images.map(waitForImage);
  const videoPromises = videos.map(waitForVideo);
  const fontPromise = document.fonts?.ready ?? Promise.resolve();
  const stylesheetPromise = waitForStylesheets();

  const timeoutPromise = new Promise((resolve) => {
    window.setTimeout(resolve, MAX_LOADER_WAIT_MS);
  });

  // Wait for all assets to load or timeout
  await Promise.race([
    Promise.all([...imagePromises, ...videoPromises, fontPromise, stylesheetPromise]),
    timeoutPromise,
  ]);
};

const getCacheKey = (pathname) => `${CACHE_SESSION_PREFIX}${pathname || "/"}`;

const isAssetsAlreadyCached = (pathname) => {
  if (typeof window === "undefined") return false;
  try {
    return sessionStorage.getItem(getCacheKey(pathname)) === "true";
  } catch {
    return false;
  }
};

const markAssetsCached = (pathname) => {
  if (typeof window === "undefined") return;
  try {
    sessionStorage.setItem(getCacheKey(pathname), "true");
  } catch {
    // Session storage unavailable
  }
};

export default function AssetLoader() {
  const pathname = usePathname() ?? "/";
  const [readyPath, setReadyPath] = useState(null);
  const [progress, setProgress] = useState(0);

  const isPathCached = isAssetsAlreadyCached(pathname);
  const isReady = readyPath === pathname || isPathCached;

  useEffect(() => {
    // If this route is already cached, skip loader for this path only.
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
      
      // Dispatch event to notify providers that assets are ready
      window.dispatchEvent(new CustomEvent("assets-ready", { detail: { pathname } }));
      
      // Small delay to show completion
      setTimeout(() => {
        if (isMounted) {
          setReadyPath(pathname);
        }
      }, 300);
    };

    const run = async () => {
      try {
        if (document.readyState === "loading") {
          setProgress(10);
          await new Promise((resolve) => {
            document.addEventListener("DOMContentLoaded", resolve, { once: true });
          });
          setProgress(20);
        }

        // Simulate progress while waiting for assets
        let simulatedProgress = 20;
        progressInterval = setInterval(() => {
          if (simulatedProgress < 95) {
            simulatedProgress += Math.random() * 15;
            setProgress(Math.min(simulatedProgress, 95));
          }
        }, 300);

        await waitForCriticalAssets();
        finalize();
      } catch (error) {
        console.error("Asset loading error:", error);
        finalize(); // Finalize anyway to prevent infinite loading
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

  if (isReady) {
    return null;
  }

  return (
    <div
      className="fixed inset-0 z-[9999] flex items-center justify-center bg-black text-white"
      aria-live="polite"
      aria-busy="true"
    >
      <style>{`
        @keyframes spin-gradient {
          from { transform: rotate(0deg); }
          to { transform: rotate(360deg); }
        }
        
        @keyframes pulse-glow {
          0%, 100% { 
            box-shadow: 0 0 20px rgba(34, 197, 94, 0.6), 
                        0 0 40px rgba(34, 197, 94, 0.3);
            opacity: 1;
          }
          50% { 
            box-shadow: 0 0 30px rgba(34, 197, 94, 0.8), 
                        0 0 60px rgba(34, 197, 94, 0.4);
            opacity: 0.8;
          }
        }
        
        @keyframes progress-fill {
          from { width: 0%; }
          to { width: ${progress}%; }
        }
        
        .loader-spinner {
          animation: spin-gradient 3s linear infinite;
        }
        
        .loader-center {
          animation: pulse-glow 2s ease-in-out infinite;
        }
        
        .progress-bar-fill {
          width: ${progress}%;
          transition: width 0.3s ease-out;
        }
      `}</style>
      
      <div className="flex flex-col items-center gap-8">
        {/* Enhanced Spinner */}
        <div className="relative h-20 w-20" aria-hidden="true">
          {/* Outer rotating ring */}
          <div className="loader-spinner absolute inset-0 rounded-full border-2 border-transparent border-t-green-400 border-r-green-500 border-b-green-400/30" />
          
          {/* Middle ring */}
          <div className="absolute inset-2 rounded-full border border-green-500/30 opacity-60" />
          
          {/* Inner pulsing core */}
          <div className="loader-center absolute inset-3 rounded-full bg-gradient-to-br from-green-500/40 to-green-600/20 backdrop-blur-sm border border-green-400/50" />
          
          {/* Center dot */}
          <div className="absolute left-1/2 top-1/2 h-3 w-3 -translate-x-1/2 -translate-y-1/2 rounded-full bg-white shadow-[0_0_16px_rgba(34,197,94,0.8)]" />
        </div>
        
        {/* Loading text */}
        <div className="flex flex-col items-center gap-4">
          <div className="flex flex-col items-center gap-2">
            <span className="text-xs uppercase tracking-[0.24em] text-green-300 font-semibold">
              Loading
            </span>
            <p className="text-xs text-gray-400/80">
              Preparing your experience...
            </p>
          </div>
          
          {/* Progress bar */}
          <div className="w-48 h-1 bg-gray-800 rounded-full overflow-hidden">
            <div 
              className="progress-bar-fill h-full bg-gradient-to-r from-green-400 to-green-500 rounded-full"
            />
          </div>
          
          {/* Progress percentage */}
          <div className="text-xs text-gray-500">
            {Math.round(progress)}%
          </div>
        </div>
      </div>
    </div>
  );
}
