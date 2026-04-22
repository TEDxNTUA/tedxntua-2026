"use client";

import { useEffect, useRef } from "react";
import { usePathname } from "next/navigation";
import Link from "next/link";
import { useHeaderNav } from "./EventNavProvider";
import { useScrollDirection } from "../hooks/useScrollDirection";
import classes from "./Nav.module.css";

/**
 * Fancy Neural Roots Navigation - Version 7.0
 * Features glow-layered branches and junction nodes.
 * ABSOLUTELY NO movement on hover.
 */

const TeamIcon = () => (
  <svg viewBox="0 0 24 24" className={classes.svgIcon}>
    <circle cx="12" cy="7" r="4" />
    <path d="M17 21v-2a4 4 0 0 0-4-4H11a4 4 0 0 0-4 4v2" />
    <circle cx="6" cy="11" r="2" />
    <circle cx="18" cy="11" r="2" />
  </svg>
);

const EventIcon = () => (
  <svg viewBox="0 0 24 24" className={classes.svgIcon}>
    <path d="M12 2v4M12 18v4M4.93 4.93l2.83 2.83M16.24 16.24l2.83 2.83M2 12h4M18 12h4M4.93 19.07l2.83-2.83M16.24 7.76l2.83-2.83" />
    <circle cx="12" cy="12" r="4" />
  </svg>
);

const SponsorsIcon = () => (
  <svg viewBox="0 0 24 24" className={classes.svgIcon}>
    <path d="M12 3l8.66 5v10L12 21l-8.66-5V8z" />
    <path d="M12 8l4.33 2.5v5L12 18l-4.33-2.5v-5z" />
    <path d="M12 3v5M20.66 18l-4.33-2.5M3.34 18l4.33-2.5" />
  </svg>
);

const HomeIcon = () => (
  <svg viewBox="0 0 24 24" className={classes.svgIcon}>
    <path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z" />
    <polyline points="9 22 9 12 15 12 15 22" />
  </svg>
);

export default function Nav() {
  const pathname = usePathname() ?? "/";
  const { isOpen, open, close } = useHeaderNav();
  const isHiddenOnScroll = useScrollDirection({ threshold: 40 });
  const containerRef = useRef(null);

  const isHomePage = pathname === "/";
  const isEventPage = pathname.startsWith("/event");
  const isSponsorsPage = pathname.startsWith("/sponsors");
  const isTeamPage = pathname.startsWith("/team");

  const handleCoreClick = (e) => {
    if (!isOpen) {
      e.preventDefault();
      open();
    } else {
      if (isHomePage) {
        e.preventDefault();
        close();
      }
    }
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
      
      {/* Root SVG Lines - Fancy Glow Edition */}
      <svg className={classes.rootLines} viewBox="0 0 240 180">
        {/* Team Branch */}
        <path d="M 120 0 C 100 25, 60 50, 15 80" className={`${classes.rootPathGlow} ${isOpen ? classes.rootPathOpen : ""}`} />
        <path d="M 120 0 C 100 25, 60 50, 15 80" className={`${classes.rootPath} ${isOpen ? classes.rootPathOpen : ""}`} />
        <circle cx="15" cy="80" r="3" className={classes.rootJunction} />
        
        {/* Event Branch */}
        <path d="M 120 0 L 120 140" className={`${classes.rootPathGlow} ${isOpen ? classes.rootPathOpen : ""}`} style={{ transitionDelay: '80ms' }} />
        <path d="M 120 0 L 120 140" className={`${classes.rootPath} ${isOpen ? classes.rootPathOpen : ""}`} style={{ transitionDelay: '80ms' }} />
        <circle cx="120" cy="140" r="3" className={classes.rootJunction} style={{ transitionDelay: '750ms' }} />

        {/* Sponsors Branch */}
        <path d="M 120 0 C 140 25, 180 50, 225 80" className={`${classes.rootPathGlow} ${isOpen ? classes.rootPathOpen : ""}`} style={{ transitionDelay: '160ms' }} />
        <path d="M 120 0 C 140 25, 180 50, 225 80" className={`${classes.rootPath} ${isOpen ? classes.rootPathOpen : ""}`} style={{ transitionDelay: '160ms' }} />
        <circle cx="225" cy="80" r="3" className={classes.rootJunction} style={{ transitionDelay: '800ms' }} />

        {/* Central Junction */}
        <circle cx="120" cy="0" r="4" className={classes.rootJunction} style={{ transitionDelay: '0ms' }} />
      </svg>

      {/* Central Root Node */}
      <Link
        href="/"
        onClick={handleCoreClick}
        className={`
          ${classes.coreButton} 
          ${isOpen ? classes.coreButtonOpen : ""} 
          ${!isHomePage ? classes.coreButtonNotHome : ""}
        `}
        aria-label={isOpen ? (isHomePage ? "Close menu" : "Go home") : "Open navigation"}
      >
        <span className={classes.coreInner}>
          <HomeIcon />
        </span>
      </Link>

      {/* Orbital Graph Nodes */}
      <Link
        href="/team"
        onClick={() => close()}
        className={`
          ${classes.orbitalNode} 
          ${classes.nodeTeam} 
          ${isOpen ? classes.nodeOpen : ""} 
          ${isTeamPage ? classes.nodeActive : ""}
        `}
      >
        <span className={classes.nodeIcon}><TeamIcon /></span>
        <span className={classes.nodeLabel}>Team</span>
      </Link>

      <Link
        href="/event"
        onClick={() => close()}
        className={`
          ${classes.orbitalNode} 
          ${classes.nodeEvent} 
          ${isOpen ? classes.nodeOpen : ""} 
          ${isEventPage ? classes.nodeActive : ""}
        `}
      >
        <span className={classes.nodeIcon}><EventIcon /></span>
        <span className={classes.nodeLabel}>Event</span>
      </Link>

      <Link
        href="/sponsors"
        onClick={() => close()}
        className={`
          ${classes.orbitalNode} 
          ${classes.nodeSponsors} 
          ${isOpen ? classes.nodeOpen : ""} 
          ${isSponsorsPage ? classes.nodeActive : ""}
        `}
      >
        <span className={classes.nodeIcon}><SponsorsIcon /></span>
        <span className={classes.nodeLabel}>Sponsors</span>
      </Link>
    </nav>
  );
}
