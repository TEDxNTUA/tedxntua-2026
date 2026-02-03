'use client'

import { useEffect } from "react";

export default function AnchorScrollHandler(): null {
  useEffect(() => {
    const scrollToHash = () => {
      const hash = window.location.hash;
      if (!hash) return;
      const el = document.querySelector(hash) as HTMLElement | null;
      if (el) {
        // Delay slightly to allow layout/sticky header to settle
        setTimeout(() => el.scrollIntoView({ behavior: "smooth", block: "start" }), 60);
      }
    };

    // Scroll on first mount
    scrollToHash();

    // Also listen for history navigation/popstate
    window.addEventListener("hashchange", scrollToHash);
    window.addEventListener("popstate", scrollToHash);
    return () => {
      window.removeEventListener("hashchange", scrollToHash);
      window.removeEventListener("popstate", scrollToHash);
    };
  }, []);

  return null;
}
