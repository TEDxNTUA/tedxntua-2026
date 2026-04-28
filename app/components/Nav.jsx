"use client";

import { useEffect, useRef } from "react";
import { usePathname, useRouter } from "next/navigation";
import Link from "next/link";
import { useHeaderNav } from "./EventNavProvider";
import { useScrollDirection } from "../hooks/useScrollDirection";
import { withBasePath } from "../lib/basePath";
import classes from "./Nav.module.css";

/**
 * Radial Navigation - Version 8.0
 * Replaces neural roots with a semisphere image-based menu.
 */

const HomeIcon = () => (
  <svg viewBox="0 0 24 24" className={classes.svgIcon}>
    <path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z" />
    <polyline points="9 22 9 12 15 12 15 22" />
  </svg>
);

const CloseIcon = () => (
  <svg viewBox="0 0 24 24" className={classes.svgIcon}>
    <line x1="18" y1="6" x2="6" y2="18" />
    <line x1="6" y1="6" x2="18" y2="18" />
  </svg>
);

export default function Nav() {
  const pathname = usePathname() ?? "/";
  const router = useRouter();
  const { isOpen, open, close } = useHeaderNav();
  const isHiddenOnScroll = useScrollDirection({ threshold: 40 });
  const containerRef = useRef(null);

  const isHomePage = pathname === "/";

  const handleCoreClick = (e) => {
    e.preventDefault();
    if (!isOpen) {
      open();
    } else {
      close();
    }
  };

  const navigate = (href) => {
    close();
    router.push(href);
  };

  useEffect(() => {
    if (!isOpen) return;
    const handleClickOutside = (e) => {
      if (!containerRef.current?.contains(e.target)) {
        close();
      }
    };
    document.addEventListener("pointerdown", handleClickOutside);
    return () => document.removeEventListener("pointerdown", handleClickOutside);
  }, [close, isOpen]);

  const containerClasses = [
    classes.menuContainer,
    isHiddenOnScroll && classes.menuContainerHidden,
  ].filter(Boolean).join(" ");

  return (
    <nav className={containerClasses} ref={containerRef}>
      
      {/* Radial Semisphere Menu */}
      <div className={`${classes.radialWrapper} ${isOpen ? classes.radialOpen : ""}`}>
        <img 
          src={withBasePath("/site_navigator.png")} 
          alt="Navigation Menu" 
          className={classes.radialImage}
        />
        <svg viewBox="0 0 100 100" className={classes.radialSvg}>
          {/* TEAM - Right Sector (0 to 60 deg approx) */}
          <path 
            d="M 50 50 L 100 50 A 50 50 0 0 1 75 93.3 Z" 
            className={classes.radialPath}
            onClick={() => navigate("/team")}
          />
          {/* EVENT - Center Sector (60 to 120 deg approx) */}
          <path 
            d="M 50 50 L 75 93.3 A 50 50 0 0 1 25 93.3 Z" 
            className={classes.radialPath}
            onClick={() => navigate("/event")}
          />
          {/* SPONSORS - Left Sector (120 to 180 deg approx) */}
          <path 
            d="M 50 50 L 25 93.3 A 50 50 0 0 1 0 50 Z" 
            className={classes.radialPath}
            onClick={() => navigate("/sponsors")}
          />
        </svg>
      </div>

      {/* Central Root Node */}
      <button
        onClick={handleCoreClick}
        className={`
          ${classes.coreButton} 
          ${isOpen ? classes.coreButtonOpen : ""} 
          ${!isHomePage ? classes.coreButtonNotHome : ""}
        `}
        aria-label={isOpen ? "Close menu" : "Open navigation"}
      >
        <span className={classes.coreInner}>
          {isOpen ? <CloseIcon /> : <HomeIcon />}
        </span>
      </button>

    </nav>
  );
}
