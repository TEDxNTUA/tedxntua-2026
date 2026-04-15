"use client";

// Imports necessary React hooks, navigation components, and path utilities for the header.
import { useEffect, useRef } from "react";
import { usePathname } from "next/navigation";
import Nav from "./Nav";
import { withBasePath } from "../lib/basePath";

/**
 * Configuration Constants
 * ARCH_SCALE_FACTOR: Defines the diameter of the decorative rings as a percentage of viewport width.
 */
const ARCH_SCALE_FACTOR = {
  ring1: 10, // 10% of screen width
  ring2: 15, // 15% of screen width
  ring3: 12, // 12% of screen width
  ring4: 18, // 18% of screen width
};

// Defines the main SiteHeader component which manages the global layout and navigation state.
export default function SiteHeader() {
  // Identifies the current URL path to determine if the page should use homepage-specific styling.
  const pathname = usePathname() ?? "/";
  const isHomePage = pathname === "/";
  
  // Tracks the previous scroll position using a Ref to compare against new scroll values without re-rendering.
  const lastScrollYRef = useRef(0);

  // Configures a theme object containing dynamic RGB color values and opacities based on the current page route.
  const theme = isHomePage 
    ? {
        bg: "202 221 221", bgOp: 0.35,
        brd: "195 199 214", brdOp: 0.7,
        hvr: "160 240 200", hvrOp: 0.15,
        tx: "0 0 0", txOp: 0.9,
      }
    : {
        bg: "255 255 255", bgOp: 0.05,
        brd: "255 255 255", brdOp: 0.3,
        hvr: "160 240 200", hvrOp: 0.15,
        tx: "255 255 255", txOp: 0.9,
      };

  // Synchronizes a scroll listener that dispatches a custom event to hide the Nav menu when scrolling downwards.
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

  // Renders the top-level header container with conditional positioning and glassmorphism styling.
  return (
    <header
      className={`z-40 overflow-visible bg-transparent text-white ${
        isHomePage 
          ? "pointer-events-none fixed inset-x-0 top-0 border-b-0" 
          : "sticky top-0 border-b border-white/8 max-h-[120px]"
      }`}
    >
      {/* Renders the dynamic background rings using viewport-relative percentages. */}
      <BackgroundDecorations scale={ARCH_SCALE_FACTOR} />

      {/* Provides a responsive container that adjusts vertical padding based on the current page route. */}
      <div className={`container relative mx-auto px-4 py-3 sm:px-6 sm:py-4 ${
        isHomePage ? "min-h-[108px] pt-5 sm:min-h-[120px]" : "min-h-[128px] sm:min-h-[144px]"
      }`}>
        
        {/* Establishes a layout that remains flexible on mobile and switches to a 3-column grid on desktop. */}
        <div className="flex items-start justify-between lg:grid lg:grid-cols-[minmax(260px,1fr)_auto_minmax(260px,1fr)] lg:gap-6">
          
          {/* Renders the left-side section containing the TEDxNTUA branding and archive link. */}
          <div className="flex justify-start">
            <ActionButton 
              href="https://www.tedxntua.com/" 
              theme={theme}
              icon="/archive.png"
              alt="Archive"
            >
              {/* Removed 'hidden' and 'mr-3', added 'text-center' */}
              <span className="flex flex-row mr-3 items-center whitespace-nowrap text-[11px] font-bold sm:text-lg">
                <span className="text-red-600">TEDx</span>
                <span style={{ color: `rgb(${theme.tx} / ${theme.txOp})` }}>NTUA</span>
              </span>
            </ActionButton>
          </div>

          {/* Acts as a layout spacer to ensure the center remains clear for the absolute-positioned Nav. */}
          <div className="hidden lg:block" />

          {/* Renders the right-side section containing the ticket information and link. */}
          <div className="flex items-center justify-end">
            <ActionButton 
              href="#" 
              theme={theme}
              icon="/ticket.png"
              alt="Ticket"
            >
              {/* Removed 'hidden', adjusted tracking for mobile readability */}
              <span className="text-[9px] font-semibold uppercase tracking-widest sm:text-sm sm:tracking-[0.34em]"
              style={{ color: `rgb(${theme.tx} / ${theme.txOp})` }}> 

                Tickets
              </span>
            </ActionButton>
          </div>
        </div>

        {/* Positions the central circular navigation component as an absolute overlay at the top of the container. */}
        <div className="pointer-events-auto absolute inset-x-0 top-0 flex justify-center">
          <Nav />
        </div>
      </div>
    </header>
  );
}

// A helper component that constructs the buttons, removing the background box and text content entirely on small screens.
// 1. Update the ActionButton component
function ActionButton({ href, theme, icon, alt, children }) {
  const baseBg = `rgb(${theme.bg} / ${theme.bgOp})`;
  const baseBorder = `rgb(${theme.brd} / ${theme.brdOp})`;
  const hoverBg = `rgb(${theme.hvr} / ${theme.hvrOp})`;

  return (
    <a
      href={href}
      aria-disabled="true"
      className="pointer-events-auto group relative flex flex-col items-center justify-center transition-all sm:min-h-[76px] sm:min-w-[260px] sm:flex-row-reverse sm:justify-between sm:rounded-[1.75rem] sm:border sm:border-solid sm:px-5 sm:backdrop-blur-sm"
      style={{
        "--base-bg": baseBg,
        "--base-brd": baseBorder,
      }}
      // ... same hover logic as before ...
      onMouseEnter={(e) => { if (window.innerWidth >= 640) e.currentTarget.style.backgroundColor = hoverBg; }}
      onMouseLeave={(e) => { if (window.innerWidth >= 640) e.currentTarget.style.backgroundColor = baseBg; }}
      ref={(el) => {
        if (el && window.innerWidth >= 640) {
          el.style.backgroundColor = baseBg;
          el.style.borderColor = baseBorder;
        }
      }}
    >
      {/* Primary button icon - now on top on mobile */}
      <img
        src={withBasePath(icon)}
        alt={alt}
        className="relative h-10 w-auto rounded-full border border-white/12 bg-black/30 p-1.5 transition-transform duration-300 group-hover:scale-110 sm:h-12 md:h-14"
      />

      {/* The Span Container - relocated underneath on mobile via flex-col */}
      <div className="mt-1 flex items-center leading-none sm:mt-0">
        {children}
      </div>

      {/* Decorative circles - keep hidden on mobile */}
      <div className="pointer-events-none absolute right-4 top-1/2 hidden h-28 w-28 -translate-y-1/2 rounded-full sm:block" />
    </a>
  );
}

// A helper component that renders aesthetic arches with sizing relative to the viewport width percentage.
function BackgroundDecorations({ scale }) {
  return (
    <>
      <div className="pointer-events-none absolute inset-x-0 top-0 h-full bg-[transparent_100%)]" />
      
      {/* Dynamic arches that scale with the screen width based on the ARCH_SCALE_FACTOR constant. */}
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