"use client";

import { useEffect, useRef } from "react";
import { usePathname } from "next/navigation";
import Link from "next/link";
import { useHeaderNav } from "./EventNavProvider";
import { useScrollDirection } from "../hooks/useScrollDirection";
import { withBasePath } from "../lib/basePath";
import classes from "./Nav.module.css";

/**
 * Header radial navigation with three slices and a central home/menu trigger.
 * The open state is shared through context so the header can animate around it.
 *
 * @returns {JSX.Element}
 */
export default function Nav() {
  // Route flags are used for active styling and to coordinate with the event-specific navigation.
  const pathname = usePathname() ?? "/";

  // Read the main header nav state from context so the header can react to the exact same source of truth.
  const { isOpen, open, close } = useHeaderNav();
  
  // Refs let us detect outside clicks without relying on brittle DOM queries.
  const isHiddenOnScroll = useScrollDirection({ threshold: 40 });
  const menuRef = useRef(null);
  const centerLogoRef = useRef(null);

  // Route checks control which slice looks active and whether the event slice toggles the sidebar.
  const isHomePage = pathname === "/";
  const isEventPage = pathname.startsWith("/event");
  const isSponsorsPage = pathname === "/sponsors";
  const isTeamPage = pathname.startsWith("/team");

  /**
   * Standard navigation for the event slice. 
   * The event dock is handled independently within the event routes.
   */
  const handleEventClick = () => {
    close();
  };

  /**
   * Opens the radial menu on first click and collapses it on subsequent clicks.
   * On subpages, clicking while open navigates home.
   *
   * @param {import("react").MouseEvent<HTMLAnchorElement>} e
   */
  const handleCenterClick = (e) => {
    if (!isOpen) {
      e.preventDefault();
      open();
    } else {
      // If we are on a subpage and the menu is open, let the Link navigate home.
      // Otherwise, just close the menu.
      if (isHomePage) {
        e.preventDefault();
      }
      close();
    }
  };

  // When the radial menu is open, outside clicks collapse it through the shared provider state.
  useEffect(() => {
    if (!isOpen) return;
    const handleClickOutside = (e) => {
      if (!menuRef.current?.contains(e.target) && !centerLogoRef.current?.contains(e.target)) {
        close();
      }
    };
    document.addEventListener("pointerdown", handleClickOutside);
    return () => document.removeEventListener("pointerdown", handleClickOutside);
  }, [close, isOpen]);

  // Compose CSS-module states so scroll behavior and event-page behavior can layer cleanly.
  const containerClasses = [
    classes.menuContainer,
    isHiddenOnScroll && classes.menuContainerHidden,
  ].filter(Boolean).join(" ");

  // CSS variables allow the module stylesheet to consume image assets without hardcoding paths there.
  return (
    <nav
      className={containerClasses}
      style={{
        "--nav-team-icon": `url(${withBasePath("/team.png")})`,
        "--nav-sponsors-icon": `url(${withBasePath("/sponsors.png")})`,
        "--nav-event-icon": `url(${withBasePath("/event.png")})`,
        "--nav-home-icon": `url(${withBasePath("/home.png")})`,
        "--nav-test-image": `url(${withBasePath("/testNav.jpg")})`, // The one background you want
      }}
    >
      {/* Preload images so AssetLoader waits for these critical navbar assets */}
      <div className="hidden" aria-hidden="true">
        <img src={withBasePath("/team.png")} alt="" />
        <img src={withBasePath("/sponsors.png")} alt="" />
        <img src={withBasePath("/event.png")} alt="" />
        <img src={withBasePath("/testNav.jpg")} alt="" />
      </div>

      {/* The circular wrapper holds the three radial slices and scales open from the top. */}
      <div 
        ref={menuRef} 
        className={`${classes.wrap} ${isOpen ? classes.menuOpen : ""}`}
      >
        {/* Team slice */}
        <Link
          href="/team"
          className={`${classes.slice} ${isTeamPage ? classes.sliceActive : ""}`}
          aria-label="Team"
        >
          <span className={classes.sliceInner}>
            <img src={withBasePath("/team.png")} alt="" className="w-full h-full object-contain" />
          </span>
          <span className={classes.sliceLabel}>TEAM</span>
        </Link>

        {/* Event slice - now in the middle position (210deg) */}
        <Link
          href="/event"
          onClick={handleEventClick}
          className={`${classes.slice} ${isEventPage ? classes.sliceActive : ""}`}
          aria-label="Event"
        >
          <span className={classes.sliceInner}>
            <img src={withBasePath("/event.png")} alt="" className="w-full h-full object-contain" />
          </span>
          <span className={classes.sliceLabel}>EVENT</span>
        </Link>

        {/* Sponsors slice */}
        <Link
          href="/sponsors"
          className={`${classes.slice} ${isSponsorsPage ? classes.sliceActive : ""}`}
          aria-label="Sponsors"
        >
          <span className={classes.sliceInner}>
            <img src={withBasePath("/sponsors.png")} alt="" className="w-full h-full object-contain" />
          </span>
          <span className={classes.sliceLabel}>SPONSORS</span>
        </Link>
      </div>

      {/* The center badge is both the home link and the open/close trigger for the radial menu. */}
      <Link
        href="/"
        ref={centerLogoRef}
        onClick={handleCenterClick}
        className={`${classes.centerLogo} ${!isHomePage ? classes.centerLogoNotHome : ""}`}
        aria-label={isOpen ? (isHomePage ? "Close menu" : "Go home") : "Open navigation"}
        aria-expanded={isOpen}
        data-current-page={isTeamPage ? "TEAM" : isEventPage ? "EVENT" : isSponsorsPage ? "SPONSORS" : ""}
      >
        {/* Inner span renders the branded home icon via CSS background imagery. */}
        <span className={classes.centerLogoInner}>
          <img src={withBasePath("/home.png")} alt="" className="w-full h-full object-contain" />
        </span>
      </Link>
    </nav>
  );
}
