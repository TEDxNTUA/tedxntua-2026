"use client";

import { useEffect, useRef } from "react";
import { usePathname } from "next/navigation";
import Nav from "./Nav";
import { withBasePath } from "../lib/basePath";

export default function SiteHeader() {
  const pathname = usePathname() ?? "/";
  const isHomePage = pathname === "/";
  const lastScrollYRef = useRef(0);


  const ticketButtonColors = 
    isHomePage? {
    background: "202 221 221",
    backgroundOpacity: 0.35,
    border: "195 199 214",
    borderOpacity: 0.7,
    hoverBackground: "160 240 200",
    hoverBackgroundOpacity: 0.15,
  } : {
    background: "255 255 255",
    backgroundOpacity: 0.05,
    border: "255 255 255",
    borderOpacity: 0.3,
    hoverBackground: "160 240 200",
    hoverBackgroundOpacity: 0.15,
  };

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

        // Close nav menu when scrolling down past threshold
        if (isScrollingDown && passedTop) {
          // Emit custom event that nav components can listen to
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

  return (
    <header
      className={[
        "z-40 overflow-visible bg-transparent text-white",
        isHomePage
          ? "pointer-events-none fixed inset-x-0 top-0 border-b-0"
          : "sticky top-0 border-b border-white/8 max-h-[120px]",
      ].join(" ")}
    >
      <div className="pointer-events-none absolute inset-x-0 top-0 h-full bg-[transparent_100%)]" />
      <div className="pointer-events-none absolute left-[-2rem] top-[-3.5rem] h-40 w-40 rounded-full border border-white/30" />
      <div className="pointer-events-none absolute left-[2.5rem] top-[-5rem] h-56 w-56 rounded-full border border-white/18" />
      <div className="pointer-events-none absolute right-[-3rem] top-[-4rem] h-48 w-48 rounded-full border border-white/30" />
      <div className="pointer-events-none absolute right-[2rem] top-[-5.5rem] h-64 w-64 rounded-full border border-white/18" />

      <div
        className={[
          "container relative mx-auto px-4 py-3 sm:px-6 sm:py-4",
          isHomePage ? "min-h-[108px] pt-5 sm:min-h-[120px]" : "min-h-[128px] sm:min-h-[144px]",
        ].join(" ")}
      >
        <div className="grid items-start gap-4 lg:grid-cols-[minmax(260px,1fr)_auto_minmax(260px,1fr)] lg:gap-6">
          <div className="flex justify-start">
            <a
              href="https://www.tedxntua.com/"
              aria-disabled="true"
              className="pointer-events-auto group relative inline-flex min-h-[76px] items-center justify-between gap-2 rounded-[1.75rem] border px-3 py-3 backdrop-blur-sm transition-colors sm:min-w-[260px] sm:gap-5 sm:px-5"
              style={{
                backgroundColor: `rgb(${ticketButtonColors.background} / ${ticketButtonColors.backgroundOpacity})`,
                borderColor: `rgb(${ticketButtonColors.border} / ${ticketButtonColors.borderOpacity})`,
              }}
              onMouseEnter={(event) => {
                event.currentTarget.style.backgroundColor = `rgb(${ticketButtonColors.hoverBackground} / ${ticketButtonColors.hoverBackgroundOpacity})`;
              }}
              onMouseLeave={(event) => {
                event.currentTarget.style.backgroundColor = `rgb(${ticketButtonColors.background} / ${ticketButtonColors.backgroundOpacity})`;
              }}
            >
              <div className="pointer-events-none absolute right-4 top-1/2 h-24 w-24 -translate-y-1/2 rounded-full  sm:h-28 sm:w-28" />
              <div className="pointer-events-none absolute right-9 top-1/2 h-14 w-14 -translate-y-1/2 rounded-full  sm:h-16 sm:w-16" />
              <div className="relative flex flex-wrap items-end gap-x-2 gap-y-2 leading-none sm:gap-x-3">
                <span className="hidden shrink-0 sm:inline">
                  <span className="text-1xl font-bold text-red-600 sm:text-2xl">TEDx</span>
                  <span className="text-1xl font-bold text-white sm:text-2xl">NTUA</span>
                </span>
              </div>
              <img
                src={withBasePath("/archive.png")}
                alt="Archive"
                className="relative h-10 w-auto rounded-full border border-white/12 bg-black/30 p-1.5 transition-transform duration-300 group-hover:scale-105 sm:h-12 md:h-14"
              />
            </a>
          </div>

          <div className="hidden lg:block" />

          <div className="flex items-center justify-end">
            <a
              href="#"
              aria-disabled="true"
              className="pointer-events-auto group relative inline-flex min-h-[76px] items-center justify-between gap-2 rounded-[1.75rem] border px-3 py-3 backdrop-blur-sm transition-colors sm:min-w-[260px] sm:gap-5 sm:px-5"
              style={{
                backgroundColor: `rgb(${ticketButtonColors.background} / ${ticketButtonColors.backgroundOpacity})`,
                borderColor: `rgb(${ticketButtonColors.border} / ${ticketButtonColors.borderOpacity})`,
              }}
              onMouseEnter={(event) => {
                event.currentTarget.style.backgroundColor = `rgb(${ticketButtonColors.hoverBackground} / ${ticketButtonColors.hoverBackgroundOpacity})`;
              }}
              onMouseLeave={(event) => {
                event.currentTarget.style.backgroundColor = `rgb(${ticketButtonColors.background} / ${ticketButtonColors.backgroundOpacity})`;
              }}
            >
              <div className="pointer-events-none absolute right-4 top-1/2 h-24 w-24 -translate-y-1/2 rounded-full border border-white/8 sm:h-28 sm:w-28" />
              <div className="pointer-events-none absolute right-9 top-1/2 h-14 w-14 -translate-y-1/2 rounded-full border border-white/10 sm:h-16 sm:w-16" />
              <span className="relative hidden text-xs font-semibold uppercase tracking-[0.34em] text-white/72 sm:inline sm:text-sm">
                Tickets
              </span>
              <img
                src={withBasePath("/ticket.png")}
                alt="Ticket"
                className="relative h-10 w-auto rounded-full border border-white/12 bg-black/30 p-1.5 transition-transform duration-300 group-hover:scale-105 sm:h-12 md:h-14"
              />
            </a>
          </div>
        </div>

        <div className="pointer-events-auto absolute inset-x-0 top-0 flex justify-center">
          <Nav />
        </div>
      </div>
    </header>
  );
}
