"use client";

import { useEffect, useRef, useState } from "react";
import { usePathname } from "next/navigation";
import Link from "next/link";
import { useEventNav } from "./EventNavProvider";
import { useScrollDirection } from "../hooks/useScrollDirection";
import { withBasePath } from "../lib/basePath";
import classes from "./Nav.module.css";

export default function Nav() {
  const pathname = usePathname() ?? "/";
  const { isOpen: isEventNavOpen, toggle: toggleEventNav } = useEventNav();
  const [isOpen, setIsOpen] = useState(false);
  
  const isHiddenOnScroll = useScrollDirection({ threshold: 40 });
  const menuRef = useRef(null);
  const centerLogoRef = useRef(null);

  const isEventPage = pathname.startsWith("/event");
  const isSponsorsPage = pathname === "/sponsors";
  const isTeamPage = pathname.startsWith("/team");

  const handleEventClick = (e) => {
    if (isEventPage) {
      e.preventDefault();
      setIsOpen(false);
      toggleEventNav();
    }
  };

  const handleCenterClick = (e) => {
    if (!isOpen) {
      e.preventDefault();
      setIsOpen(true);
    } else {
      setIsOpen(false);
    }
  };

  useEffect(() => {
    setIsOpen(false);
  }, [pathname, isEventNavOpen]);

  useEffect(() => {
    if (!isOpen) return;
    const handleClickOutside = (e) => {
      if (!menuRef.current?.contains(e.target) && !centerLogoRef.current?.contains(e.target)) {
        setIsOpen(false);
      }
    };
    document.addEventListener("pointerdown", handleClickOutside);
    return () => document.removeEventListener("pointerdown", handleClickOutside);
  }, [isOpen]);

  const containerClasses = [
    classes.menuContainer,
    isEventNavOpen && classes.menuContainerRaised,
    isHiddenOnScroll && classes.menuContainerHidden,
  ].filter(Boolean).join(" ");

  return (
    <nav
      className={containerClasses}
      style={{
        "--nav-home-icon": `url(${withBasePath("/home.png")})`,
        "--nav-test-image": `url(${withBasePath("/testNav.jpg")})`, // The one background you want
      }}
    >
      <div 
        ref={menuRef} 
        className={`${classes.wrap} ${isOpen ? classes.menuOpen : ""}`}
      >
        <Link
          href="/team"
          className={`${classes.slice} ${isTeamPage ? classes.sliceActive : ""}`}
          aria-label="Team"
        >
        </Link>

        <Link
          href="/sponsors"
          className={`${classes.slice} ${isSponsorsPage ? classes.sliceActive : ""}`}
          aria-label="Sponsors"
        >
        </Link>

        <Link
          href="/event"
          onClick={handleEventClick}
          className={`${classes.slice} ${isEventPage ? classes.sliceActive : ""}`}
          aria-label="Event"
        >
        </Link>
      </div>

      <Link
        href="/"
        ref={centerLogoRef}
        onClick={handleCenterClick}
        className={classes.centerLogo}
        aria-label={isOpen ? "Go home" : "Open navigation"}
        aria-expanded={isOpen}
      >
        <span className={classes.centerLogoInner} />
      </Link>
    </nav>
  );
}