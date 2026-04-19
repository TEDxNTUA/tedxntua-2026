"use client";

import { useEffect, useState } from "react";
import { usePathname } from "next/navigation";

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

export default function ContentVisibilityWrapper({ children }) {
  const pathname = usePathname() ?? "/";
  const [readyPath, setReadyPath] = useState(null);

  const isReady = readyPath === pathname || isPathCached(pathname);

  useEffect(() => {
    // Check if assets are already cached for current route
    if (isPathCached(pathname)) {
      setReadyPath(pathname);
      return;
    }

    // Listen for assets-ready event
    const handleAssetsReady = (event) => {
      const loadedPath = event?.detail?.pathname;
      if (!loadedPath || loadedPath === pathname) {
        setReadyPath(pathname);
      }
    };

    window.addEventListener("assets-ready", handleAssetsReady);
    return () => {
      window.removeEventListener("assets-ready", handleAssetsReady);
    };
  }, [pathname]);

  return (
    <div
      style={{
        visibility: isReady ? "visible" : "hidden",
        opacity: isReady ? 1 : 0,
        transition: "opacity 0.3s ease-out",
        position: isReady ? "static" : "static",
      }}
    >
      {children}
    </div>
  );
}
