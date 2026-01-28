"use client";
import { ReactNode, useEffect, useRef, useState } from "react";
import { usePathname } from "next/navigation";

// Define the canonical order of routes for directional transitions
const ROUTE_ORDER = ["/", "/sponsors", "/team"];

export default function PageTransition({ children }: { children: ReactNode }) {
  const pathname = usePathname();
  const prevRef = useRef<string | null>(null);
  const [direction, setDirection] = useState<"from-right" | "from-left">("from-right");

  useEffect(() => {
    const prev = prevRef.current;
    if (prev == null) {
      // initial render
      prevRef.current = pathname;
      return;
    }
    // prefer an explicit clicked target index (set by Nav) when available
    let resolved = false;
    try {
      const stored = sessionStorage.getItem("nav-target-index");
      if (stored != null) {
        const targetIndex = Number(stored);
        const prevIndex = ROUTE_ORDER.indexOf(prev);
        if (!Number.isNaN(targetIndex) && prevIndex !== -1) {
          // clicking something to the right → page slides left-to-right (from-left)
          // clicking something to the left → page slides right-to-left (from-right)
          if (targetIndex > prevIndex) setDirection("from-left");
          else if (targetIndex < prevIndex) setDirection("from-right");
          else setDirection("from-left");
          resolved = true;
        }
        sessionStorage.removeItem("nav-target-index");
      }
    } catch {}

    if (!resolved) {
      const prevIndex = ROUTE_ORDER.indexOf(prev);
      const nextIndex = ROUTE_ORDER.indexOf(pathname);
      if (prevIndex === -1 || nextIndex === -1) {
        setDirection("from-left");
      } else if (nextIndex > prevIndex) {
        setDirection("from-left");
      } else if (nextIndex < prevIndex) {
        setDirection("from-right");
      } else {
        setDirection("from-left");
      }
    }

    prevRef.current = pathname;
  }, [pathname]);

  const animClass = direction === "from-right" ? "animate-slide-in-from-right" : "animate-slide-in-from-left";

  return (
    // key on pathname so the inner content remounts and runs the enter animation
    <div key={pathname} className="page-transition-container">
      <div className={`page-content ${animClass}`}>{children}</div>
    </div>
  );
}
