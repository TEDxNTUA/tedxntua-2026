"use client";

import { useEffect, useRef } from "react";
import { usePathname } from "next/navigation";
import Link from "next/link";
import { useEventNav, useHeaderNav } from "./EventNavProvider";
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
  const { isOpen: isEventNavOpen, toggle: toggleEventNav } = useEventNav();

  // Read the main header nav state from context so the header can react to the exact same source of truth.
  const { isOpen, open, close } = useHeaderNav();
  
  // Refs let us detect outside clicks without relying on brittle DOM queries.
  const isHiddenOnScroll = useScrollDirection({ threshold: 40 });
  const menuRef = useRef(null);
  const centerLogoRef = useRef(null);

  // Route checks control which slice looks active and whether the event slice toggles the sidebar.
  const isEventPage = pathname.startsWith("/event");
  const isSponsorsPage = pathname === "/sponsors";
  const isTeamPage = pathname.startsWith("/team");

  /**
   * Opens the event sidebar instead of navigating when the user is already on an event route.
   *
   * @param {import("react").MouseEvent<HTMLAnchorElement>} e
   */
  const handleEventClick = (e) => {
    if (isEventPage) {
      e.preventDefault();
      close();
      toggleEventNav();
    }
  };

  /**
   * Opens the radial menu on first click and collapses it on subsequent clicks.
   *
   * @param {import("react").MouseEvent<HTMLAnchorElement>} e
   */
  const handleCenterClick = (e) => {
    if (!isOpen) {
      e.preventDefault();
      open();
    } else {
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
    isEventNavOpen && classes.menuContainerRaised,
    isHiddenOnScroll && classes.menuContainerHidden,
  ].filter(Boolean).join(" ");

  // CSS variables allow the module stylesheet to consume image assets without hardcoding paths there.
  return (
    <nav
      className={containerClasses}
      style={{
        "--nav-home-icon": `url(${withBasePath("/home.png")})`,
        "--nav-test-image": `url(${withBasePath("/testNav.jpg")})`, // The one background you want
      }}
    >
      {/* The circular wrapper holds the three radial slices and scales open from the top. */}
      <div 
        ref={menuRef} 
        className={`${classes.wrap} ${isOpen ? classes.menuOpen : ""}`}
      >
        {/* Team slice links directly and only changes visual state when the route is active. */}
        <Link
          href="/team"
          className={`${classes.slice} ${isTeamPage ? classes.sliceActive : ""}`}
          aria-label="Team"
        >
        </Link>

        {/* Sponsors slice links directly and mirrors the active route styling. */}
        <Link
          href="/sponsors"
          className={`${classes.slice} ${isSponsorsPage ? classes.sliceActive : ""}`}
          aria-label="Sponsors"
        >
        </Link>

        {/* Event slice either navigates to /event or toggles the event sidebar if already there. */}
        <Link
          href="/event"
          onClick={handleEventClick}
          className={`${classes.slice} ${isEventPage ? classes.sliceActive : ""}`}
          aria-label="Event"
        >
        </Link>
      </div>

      {/* The center badge is both the home link and the open/close trigger for the radial menu. */}
      <Link
        href="/"
        ref={centerLogoRef}
        onClick={handleCenterClick}
        className={classes.centerLogo}
        aria-label={isOpen ? "Go home" : "Open navigation"}
        aria-expanded={isOpen}
      >
        {/* Inner span renders the branded home icon via CSS background imagery. */}
        <span className={classes.centerLogoInner} />
      </Link>
    </nav>
  );
}
