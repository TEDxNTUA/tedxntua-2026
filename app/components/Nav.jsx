"use client";

import { useEffect, useRef, useState } from "react";
import { usePathname } from "next/navigation";
import { useEventNav } from "./EventNavProvider";
import classes from "./Nav.module.css";
import { withBasePath } from "../lib/basePath";

const ROUTE_TO_INDEX = {
  "/": 0,
  "/event": 1,
  "/sponsors": 2,
  "/team": 3,
};

export default function Nav() {
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

  const handleEventClick = () => {
    if (isEventPage) {
      setIsOpen(false);
      toggleEventNav();
      return;
    }

    window.location.href = withBasePath("/event");
  };

  const handleCenterLogoClick = () => {
    if (!isOpen) {
      setIsOpen(true);
      return;
    }

    window.location.href = withBasePath("/");
  };

  useEffect(() => {
    if (typeof window === "undefined") {
      return;
    }

    const handleHeaderScrollDown = () => {
      setIsOpen(false);
    };

    window.addEventListener("headerScrollDown", handleHeaderScrollDown);
    return () => window.removeEventListener("headerScrollDown", handleHeaderScrollDown);
  }, []);

  useEffect(() => {
    setIsOpen(false);
  }, [pathname]);

  useEffect(() => {
    if (typeof window === "undefined") {
      return;
    }

    lastScrollYRef.current = window.scrollY;
    let frameId;

    const handleScroll = () => {
      if (frameId) {
        cancelAnimationFrame(frameId);
      }

      frameId = requestAnimationFrame(() => {
        const currentY = window.scrollY;
        const isScrollingDown = currentY > lastScrollYRef.current;
        const passedTop = currentY > 40;

        setIsHiddenOnScroll(isScrollingDown && passedTop);
        lastScrollYRef.current = currentY;
      });
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => {
      window.removeEventListener("scroll", handleScroll);
      cancelAnimationFrame(frameId);
    };
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

  // Remove hover/nearby pointer auto-open behavior.
  // The semicircle nav should only open via explicit user interaction.

  return (
    <div
      ref={containerRef}
      style={{
        "--nav-team-icon": `url(${withBasePath("/team.png")})`,
        "--nav-sponsors-icon": `url(${withBasePath("/sponsors.png")})`,
        "--nav-event-icon": `url(${withBasePath("/event.png")})`,
        "--nav-home-icon": `url(${withBasePath("/home.png")})`,
        "--nav-test-image": `url(${withBasePath("/testNav.jpg")})`,
      }}
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
        <a
          href={withBasePath("/team")}
          className={[classes.slice, isTeamPage ? classes.sliceActive : ""].join(" ").trim()}
          aria-label="Team"
        >
        </a>

        <a
          href={withBasePath("/sponsors")}
          className={[classes.slice, isSponsorsPage ? classes.sliceActive : ""].join(" ").trim()}
          aria-label="Sponsors"
        >
        </a>

        <button
          type="button"
          className={[classes.slice, isEventPage ? classes.sliceActive : ""].join(" ").trim()}
          onClick={handleEventClick}
          aria-label="Event"
        >
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
