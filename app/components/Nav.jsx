"use client";

import { useEffect, useRef, useState } from "react";
import { usePathname, useRouter } from "next/navigation";
import { useEventNav } from "./EventNavProvider";
import classes from "./Nav.module.css";

const ROUTE_TO_INDEX = {
  "/": 0,
  "/event": 1,
  "/sponsors": 2,
  "/team": 3,
};

export default function Nav() {
  const router = useRouter();
  const pathname = usePathname() ?? "/";
  const { isOpen: isEventNavOpen, toggle: toggleEventNav } = useEventNav();
  const [isOpen, setIsOpen] = useState(false);
  const [isHiddenOnScroll, setIsHiddenOnScroll] = useState(false);
  const containerRef = useRef(null);
  const menuRef = useRef(null);
  const centerLogoRef = useRef(null);
  const lastScrollYRef = useRef(0);

  const isEventPage = pathname.startsWith("/event");
  const isSponsorsPage = pathname === "/sponsors";
  const isTeamPage = pathname === "/team" || pathname.startsWith("/team/");

  const navigate = (route) => {
    setIsOpen(false);
    try {
      const targetIndex = ROUTE_TO_INDEX[route];
      if (targetIndex !== undefined) {
        sessionStorage.setItem("nav-target-index", String(targetIndex));
      }
    } catch {
      // ignore
    }

    router.push(route);
  };

  const handleEventClick = () => {
    if (isEventPage) {
      setIsOpen(false);
      toggleEventNav();
      return;
    }

    navigate("/event");
  };

  const handleCenterLogoClick = () => {
    if (!isOpen) {
      setIsOpen(true);
      return;
    }

    navigate("/");
  };

  useEffect(() => {
    setIsOpen(false);
  }, [pathname]);

  useEffect(() => {
    if (typeof window === "undefined") {
      return;
    }

    lastScrollYRef.current = window.scrollY;

    const handleScroll = () => {
      const currentY = window.scrollY;
      const isScrollingDown = currentY > lastScrollYRef.current;
      const passedTop = currentY > 40;

      setIsHiddenOnScroll(isScrollingDown && passedTop);
      lastScrollYRef.current = currentY;
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    if (!isOpen || typeof document === "undefined") {
      return;
    }

    const handlePointerDown = (event) => {
      const target = event.target;

      if (
        menuRef.current?.contains(target) ||
        centerLogoRef.current?.contains(target)
      ) {
        return;
      }

      setIsOpen(false);
    };

    document.addEventListener("pointerdown", handlePointerDown);
    return () => document.removeEventListener("pointerdown", handlePointerDown);
  }, [isOpen]);

  useEffect(() => {
    if (isEventNavOpen) {
      setIsOpen(false);
    }
  }, [isEventNavOpen]);

  useEffect(() => {
    if (typeof window === "undefined") {
      return;
    }

    const mediaQuery = window.matchMedia("(hover: hover) and (pointer: fine)");
    if (!mediaQuery.matches) {
      return;
    }

    const ACTIVATION_DISTANCE = 140;

    const handlePointerMove = (event) => {
      if (isEventNavOpen || isHiddenOnScroll || !containerRef.current) {
        return;
      }

      const rect = containerRef.current.getBoundingClientRect();
      const centerX = rect.left + rect.width / 2;
      const centerY = rect.top + Math.max(rect.width * 0.12, 36);
      const distance = Math.hypot(event.clientX - centerX, event.clientY - centerY);

      setIsOpen(distance <= ACTIVATION_DISTANCE);
    };

    const handlePointerLeaveWindow = () => {
      setIsOpen(false);
    };

    window.addEventListener("pointermove", handlePointerMove, { passive: true });
    window.addEventListener("blur", handlePointerLeaveWindow);

    return () => {
      window.removeEventListener("pointermove", handlePointerMove);
      window.removeEventListener("blur", handlePointerLeaveWindow);
    };
  }, [isEventNavOpen, isHiddenOnScroll]);

  return (
    <div
      ref={containerRef}
      className={[
        classes.menuContainer,
        isEventNavOpen ? classes.menuContainerRaised : "",
        isHiddenOnScroll ? classes.menuContainerHidden : "",
      ].join(" ").trim()}
    >
      <div
        ref={menuRef}
        className={[classes.wrap, isOpen ? classes.menuOpen : ""].join(" ").trim()}
      >
        <button
          type="button"
          className={[classes.slice, isTeamPage ? classes.sliceActive : ""].join(" ").trim()}
          onClick={() => navigate("/team")}
          aria-label="Team"
        >
          <span className={classes.sliceInner} />
        </button>

        <button
          type="button"
          className={[classes.slice, isSponsorsPage ? classes.sliceActive : ""].join(" ").trim()}
          onClick={() => navigate("/sponsors")}
          aria-label="Sponsors"
        >
          <span className={classes.sliceInner} />
        </button>

        <button
          type="button"
          className={[classes.slice, isEventPage ? classes.sliceActive : ""].join(" ").trim()}
          onClick={handleEventClick}
          aria-label="Event"
        >
          <span className={classes.sliceInner} />
        </button>
      </div>

      <button
        ref={centerLogoRef}
        type="button"
        className={classes.centerLogo}
        onClick={handleCenterLogoClick}
        aria-label={isOpen ? "Go home" : "Open navigation"}
        aria-expanded={isOpen}
      >
        <span className={classes.centerLogoInner} />
      </button>
    </div>
  );
}
