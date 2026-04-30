"use client";

import { useEffect, useRef } from "react";
import { usePathname } from "next/navigation";
import Link from "next/link";
import Nav from "./Nav";
import { useHeaderNav } from "./EventNavProvider";
import { withBasePath } from "../lib/basePath";

/**
 * Global site header that renders the centered radial navigation, responsive action buttons,
 * and decorative background rings. The header reacts to route changes and shared nav state.
 */

/** Decorative ring diameters, expressed as viewport-width percentages. */
const ARCH_SCALE_FACTOR = {
  ring1: 10, // 10% of screen width
  ring2: 15, // 15% of screen width
  ring3: 12, // 12% of screen width
  ring4: 18, // 18% of screen width
};

/** Large screens switch to the fully expanded boxed action-button treatment. */
const DESKTOP_BREAKPOINT = 1024;
const TICKETS_URL =
  "https://www.eventora.com/el/Events/tedxntua-2026?utm_id=97758_v0_s00_e0_tv0";

/**
 * Renders the site-wide header shell and keeps its layout synchronized with header-nav state.
 * @returns {JSX.Element}
 */
export default function SiteHeader() {
  // Identifies the current URL path to determine if the page should use homepage-specific styling.
  const pathname = usePathname() ?? "/";
  const isHomePage = pathname === "/";
  // Mirror the real nav open state so the action buttons animate in lockstep with the semicircle menu.
  const { isOpen: isHeaderNavOpen } = useHeaderNav();
  
  // Tracks the previous scroll position using a Ref to compare against new scroll values without re-rendering.
  const lastScrollYRef = useRef(0);

  // Configures a theme object containing dynamic RGB color values and opacities based on the current page route.
  const theme = isHomePage 
    ? {
        bg: "202, 221, 221", bgOp: 0.35,
        brd: "195, 199, 214", brdOp: 0.7,
        hvr: "160, 240, 200", hvrOp: 0.15,
        tx: "0, 0, 0", txOp: 0.9,
      }
    : {
        bg: "255, 255, 255", bgOp: 0.05,
        brd: "255, 255, 255", brdOp: 0.3,
        hvr: "160, 240, 200", hvrOp: 0.15,
        tx: "255, 255, 255", txOp: 0.9,
      };

  // Broadcast downward scrolling so the nav can hide itself without this component owning that visibility state.
  useEffect(() => {
    if (typeof window === "undefined") return;

    lastScrollYRef.current = window.scrollY;
    let frameId;

    const handleScroll = () => {
      if (frameId) cancelAnimationFrame(frameId);

      frameId = requestAnimationFrame(() => {
        const currentY = window.scrollY;
        const isScrollingDown = currentY > lastScrollYRef.current;
        const passedTop = currentY > 40;

        if (isScrollingDown && passedTop) {
          window.dispatchEvent(new CustomEvent("headerScrollDown"));
        }
        lastScrollYRef.current = currentY;
      });
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => {
      window.removeEventListener("scroll", handleScroll);
      cancelAnimationFrame(frameId);
    };
  }, []);

  // On small and medium screens the side buttons scale down to make room for the expanded nav.
  const leftActionClasses = isHeaderNavOpen
    ? "scale-90 translate-y-2 opacity-90 lg:scale-100 lg:translate-y-0 lg:opacity-100"
    : "translate-x-0 opacity-100";

  const rightActionClasses = isHeaderNavOpen
    ? "scale-90 translate-y-2 opacity-90 lg:scale-100 lg:translate-y-0 lg:opacity-100"
    : "translate-x-0 opacity-100";

  // Renders the top-level header container with conditional positioning and glassmorphism styling.
  return (
    <header
      className={`site-header z-40 overflow-visible bg-transparent text-white ${
        isHomePage 
          ? "pointer-events-none fixed inset-x-0 top-0 border-b-0" 
          : "sticky top-0 border-b border-white/8 max-h-[120px]"
      }`}
    >
      {/* Positions the central circular navigation component as an absolute overlay at the very top of the header (the "ceiling"). */}
      <div className="pointer-events-auto absolute inset-x-0 top-0 flex justify-center">
        <Nav />
      </div>

      {/* Renders the dynamic background rings using viewport-relative percentages. */}
      <BackgroundDecorations scale={ARCH_SCALE_FACTOR} />

      {/* Provides a responsive container that adjusts vertical padding based on the current page route. */}
      <div className={`container relative mx-auto px-4 py-3 sm:px-6 sm:py-4 ${
        isHomePage ? "min-h-[108px] pt-5 sm:min-h-[120px]" : "min-h-[128px] sm:min-h-[144px]"
      }`}>
        
        {/* Mobile/tablet keep a simple flex row, while desktop switches to a three-column header grid. */}
        <div className="flex items-start justify-between lg:grid lg:grid-cols-[minmax(260px,1fr)_auto_minmax(260px,1fr)] lg:gap-6">
          
          {/* Home action button with logo, replaces the old archive button. */}
          <div className={`flex justify-start transition-all duration-500 ease-[cubic-bezier(0.8, 0.8, 0.5, 0.5)] ${leftActionClasses}`}>
            <ActionButton 
              href="/" 
              theme={theme}
              isInternal={true}
            >
              <div className="flex w-full items-center justify-center py-1 sm:py-2">
                <img 
                  src={withBasePath(isHomePage ? "/tedxntua_logo-black.png" : "/tedxntua_logo.png")} 
                  alt="TEDxNTUA Home" 
                  className="h-6 w-auto object-contain transition-all duration-300 group-hover:scale-105 sm:h-8 lg:h-9"
                  width={180}
                  height={48}
                />
              </div>
            </ActionButton>
          </div>

          {/* Desktop-only spacer preserves room for the centered nav between both action buttons. */}
          <div className="hidden lg:block" />

          {/* Right action button mirrors the left one by sliding to the opposite side when the nav opens. */}
          <div className={`flex items-center justify-end transition-all duration-500 ease-[cubic-bezier(0.8, 0.8, 0.5, 0.5)] ${rightActionClasses}`}>
            <ActionButton 
              href={TICKETS_URL}
              theme={theme}
            >
              <div className="flex w-full flex-col items-center justify-center gap-1 py-1 sm:py-2">
                <img
                  src={withBasePath("/ticket-asset.png")}
                  alt="Ticket"
                  className="h-8 w-auto object-contain transition-all duration-300 group-hover:scale-105 sm:h-10 lg:h-11"
                  width={48}
                  height={48}
                />
                <span
                  className="text-[9px] font-semibold uppercase tracking-widest sm:text-sm sm:tracking-[0.34em]"
                  style={{ color: `rgba(${theme.tx}, ${theme.txOp})` }}
                  suppressHydrationWarning
                >
                  Ticket
                </span>
              </div>
            </ActionButton>
          </div>
        </div>
      </div>
    </header>
  );
}

/**
 * Responsive header action button used for the archive and ticket entry points.
 *
 * @param {{
 *   href: string,
 *   theme: {bg: string, bgOp: number, brd: string, brdOp: number, hvr: string, hvrOp: number},
 *   icon?: string,
 *   alt?: string,
 *   isInternal?: boolean,
 *   children: import("react").ReactNode
 * }} props
 * @returns {JSX.Element}
 */
function ActionButton({ href, theme, icon, alt, isInternal = false, children }) {
  // Theme-derived colors keep the action button visuals consistent with the current page variant.
  const baseBg = `rgba(${theme.bg}, ${theme.bgOp})`;
  const baseBorder = `rgba(${theme.brd}, ${theme.brdOp})`;
  const hoverBg = `rgba(${theme.hvr}, ${theme.hvrOp})`;

  const sharedClasses = "pointer-events-auto group relative flex flex-col items-center justify-center transition-all lg:min-h-[76px] lg:min-w-[260px] lg:flex-row-reverse lg:justify-between lg:rounded-[1.75rem] lg:border lg:border-solid lg:px-5 lg:backdrop-blur-sm [--bg-final:transparent] [--brd-final:transparent] lg:[--bg-final:var(--bg-current,var(--base-bg))] lg:[--brd-final:var(--brd-current,var(--base-brd))]";
  
  const sharedStyle = {
    "--base-bg": baseBg,
    "--base-brd": baseBorder,
    backgroundColor: "var(--bg-final)",
    borderColor: "var(--brd-final)",
  };

  const handleMouseEnter = (e) => { 
    e.currentTarget.style.setProperty("--bg-current", hoverBg);
  };
  
  const handleMouseLeave = (e) => { 
    e.currentTarget.style.setProperty("--bg-current", "var(--base-bg)");
  };

  const content = (
    <>
      {/* Optional icon: if provided, it renders in a circular glass-box. */}
      {icon && (
        <img
          src={withBasePath(icon)}
          alt={alt}
          className="relative h-10 w-auto rounded-full border border-white/12 bg-black/30 p-1.5 transition-transform duration-300 group-hover:scale-110 lg:h-12 xl:h-14"
        />
      )}

      {/* Main button content: centers text or logos. */}
      <div className={`mt-1 flex items-center leading-none lg:mt-0 ${!icon ? 'w-full justify-center' : ''}`}>
        {children}
      </div>

      {/* Decorative geometry is reserved for the larger desktop button variant only. */}
      <div className="pointer-events-none absolute right-4 top-1/2 hidden h-28 w-28 -translate-y-1/2 rounded-full lg:block" />
    </>
  );

  if (isInternal) {
    return (
      <Link
        href={href}
        className={sharedClasses}
        style={sharedStyle}
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
      >
        {content}
      </Link>
    );
  }

  return (
    <a
      href={href}
      className={sharedClasses}
      style={sharedStyle}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      {content}
    </a>
  );
}

/**
 * Renders decorative orbital rings behind the header content.
 *
 * @param {{scale: {ring1: number, ring2: number, ring3: number, ring4: number}}} props
 * @returns {JSX.Element}
 */
function BackgroundDecorations({ scale }) {
  return (
    <>
      {/* Transparent overlay keeps the decoration layer aligned with the header bounds. */}
      <div className="pointer-events-none absolute inset-x-0 top-0 h-full bg-[transparent_100%)]" />
      
      {/* Left and right ring pairs create the orbital framing behind the header content. */}
      <div
        className="pointer-events-none absolute left-[-2rem] top-[-3.5rem] rounded-full border border-white/30" 
        style={{ width: `${scale.ring1}vw`, height: `${scale.ring1}vw` }}
      />
      <div 
        className="pointer-events-none absolute left-[2.5rem] top-[-5rem] rounded-full border border-white/18" 
        style={{ width: `${scale.ring2}vw`, height: `${scale.ring2}vw` }}
      />
      <div 
        className="pointer-events-none absolute right-[-3rem] top-[-4rem] rounded-full border border-white/30" 
        style={{ width: `${scale.ring3}vw`, height: `${scale.ring3}vw` }}
      />
      <div 
        className="pointer-events-none absolute right-[2rem] top-[-5.5rem] rounded-full border border-white/18" 
        style={{ width: `${scale.ring4}vw`, height: `${scale.ring4}vw` }}
      />
    </>
  );
}
