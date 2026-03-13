import { useEffect, useRef, useState } from "react";
import { useLocation } from "react-router-dom";

// Define the canonical order of routes for directional transitions
const ROUTE_ORDER = ["/", "/sponsors", "/team", "/event/program", "/event/more"];

export default function PageTransition({ children, pathname }) {
  const location = useLocation();
  const resolvedPathname = pathname ?? location.pathname ?? "/";

  const prevRef = useRef(null);
  const [direction, setDirection] = useState("from-left");

  useEffect(() => {
    const prev = prevRef.current;
    if (prev == null) {
      prevRef.current = resolvedPathname;
      return;
    }

    let resolved = false;
    try {
      const stored = sessionStorage.getItem("nav-target-index");
      if (stored != null) {
        const targetIndex = Number(stored);
        const prevIndex = ROUTE_ORDER.indexOf(prev);
        if (!Number.isNaN(targetIndex) && prevIndex !== -1) {
          if (targetIndex > prevIndex) setDirection("from-left");
          else if (targetIndex < prevIndex) setDirection("from-right");
          else setDirection("from-left");
          resolved = true;
        }
        sessionStorage.removeItem("nav-target-index");
      }
    } catch {
      // ignore
    }

    if (!resolved) {
      const prevIndex = ROUTE_ORDER.indexOf(prev);
      const nextIndex = ROUTE_ORDER.indexOf(resolvedPathname);
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

    prevRef.current = resolvedPathname;
  }, [resolvedPathname]);

  const animClass = direction === "from-right" ? "animate-slide-in-from-right" : "animate-slide-in-from-left";

  return (
    <div key={resolvedPathname} className="page-transition-container">
      <div className={`page-content ${animClass}`}>{children}</div>
    </div>
  );
}
