"use client";

import { useEffect, useRef, useState } from "react";
import { usePathname } from "next/navigation";

const ROUTE_ORDER = ["/", "/event", "/sponsors", "/team"];

function normalizePathname(pathname) {
  if (pathname.startsWith("/team")) {
    return "/team";
  }

  if (pathname.startsWith("/event")) {
    return "/event";
  }

  return pathname;
}

export default function PageTransition({ children }) {
  const pathname = normalizePathname(usePathname() ?? "/");
  const prevRef = useRef(null);
  const [direction, setDirection] = useState("from-left");

  useEffect(() => {
    const prev = prevRef.current;
    if (prev == null) {
      prevRef.current = pathname;
      return;
    }

    let resolved = false;
    try {
      const stored = sessionStorage.getItem("nav-target-index");
      if (stored != null) {
        const targetIndex = Number(stored);
        const prevIndex = ROUTE_ORDER.indexOf(prev);

        if (!Number.isNaN(targetIndex) && prevIndex !== -1) {
          if (targetIndex > prevIndex) {
            setDirection("from-left");
          } else if (targetIndex < prevIndex) {
            setDirection("from-right");
          } else {
            setDirection("from-left");
          }
          resolved = true;
        }

        sessionStorage.removeItem("nav-target-index");
      }
    } catch {
      // ignore
    }

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

  const animClass =
    direction === "from-right"
      ? "animate-slide-in-from-right"
      : "animate-slide-in-from-left";

  if (pathname === "/") {
    return children;
  }

  return (
    <div key={pathname} className="page-transition-container">
      <div className={`page-content ${animClass}`}>{children}</div>
    </div>
  );
}
