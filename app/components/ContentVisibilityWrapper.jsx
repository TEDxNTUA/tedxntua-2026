"use client";

import { useEffect, useState } from "react";

export default function ContentVisibilityWrapper({ children }) {
  const [isReady, setIsReady] = useState(false);

  useEffect(() => {
    // Check if assets are already cached in session
    if (sessionStorage.getItem("tedx_assets_loaded_session") === "true") {
      setIsReady(true);
      return;
    }

    // Listen for assets-ready event
    const handleAssetsReady = () => {
      setIsReady(true);
    };

    window.addEventListener("assets-ready", handleAssetsReady);
    return () => {
      window.removeEventListener("assets-ready", handleAssetsReady);
    };
  }, []);

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
