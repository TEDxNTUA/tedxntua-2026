"use client";

import { createContext, useContext, useState, useEffect } from "react";

const AssetReadyContext = createContext(false);

export function AssetReadyProvider({ children }) {
  const [isReady, setIsReady] = useState(false);

  useEffect(() => {
    // Listen for custom event from AssetLoader
    const handleAssetsReady = () => {
      setIsReady(true);
    };

    window.addEventListener("assets-ready", handleAssetsReady);
    
    // Also check if assets were already loaded (from session cache)
    if (sessionStorage.getItem("tedx_assets_loaded_session") === "true") {
      setIsReady(true);
    }

    return () => {
      window.removeEventListener("assets-ready", handleAssetsReady);
    };
  }, []);

  return (
    <AssetReadyContext.Provider value={isReady}>
      {children}
    </AssetReadyContext.Provider>
  );
}

export function useAssetReady() {
  return useContext(AssetReadyContext);
}
