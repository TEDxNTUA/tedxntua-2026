"use client";

import { useEffect, useState } from "react";

const READY_STATE_HAVE_CURRENT_DATA = 2;
const MAX_LOADER_WAIT_MS = 5000;
const VIEWPORT_MULTIPLIER = 1.2;
const CACHE_SESSION_KEY = "tedx_assets_loaded_session";

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

const isAssetsAlreadyCached = () => {
  if (typeof window === "undefined") return false;
  try {
    return sessionStorage.getItem(CACHE_SESSION_KEY) === "true";
  } catch {
    return false;
  }
};

const markAssetsCached = () => {
  if (typeof window === "undefined") return;
  try {
    sessionStorage.setItem(CACHE_SESSION_KEY, "true");
  } catch {
    // Session storage unavailable
  }
};

export default function AssetLoader() {
  const [isReady, setIsReady] = useState(false);
  const [skipLoader, setSkipLoader] = useState(false);

  useEffect(() => {
    // Check if assets are already cached in this session
    if (isAssetsAlreadyCached()) {
      setSkipLoader(true);
      return;
    }

    document.body.style.overflow = "hidden";
    let isMounted = true;

    const finalize = () => {
      if (!isMounted) return;
      markAssetsCached();
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

  if (isReady || skipLoader) {
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
        
        .loader-spinner {
          animation: spin-gradient 3s linear infinite;
        }
        
        .loader-center {
          animation: pulse-glow 2s ease-in-out infinite;
        }
      `}</style>
      
      <div className="flex flex-col items-center gap-6">
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
        <div className="flex flex-col items-center gap-2">
          <span className="text-xs uppercase tracking-[0.24em] text-green-300 font-semibold">
            Loading
          </span>
          <p className="text-xs text-gray-400/80">
            Preparing your experience...
          </p>
        </div>
      </div>
    </div>
  );
}
