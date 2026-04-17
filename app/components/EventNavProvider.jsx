"use client";

import { createContext, useCallback, useContext, useEffect, useMemo, useState } from "react";
import { usePathname } from "next/navigation";
import EventSidebar from "./EventSidebar";
import EventNavToggle from "./EventNavToggle";

/**
 * Shared provider for the site header navigation and the event-page sidebar navigation.
 * It centralizes route-aware nav state so header controls and page-level overlays stay synchronized.
 */

/** Session storage key used to ensure the event-nav peek animation runs only once per session. */
const EVENT_NAV_PEEK_KEY = "event-nav-peeked";
/** Delay before the event-nav peek animation opens. */
const EVENT_NAV_PEEK_OPEN_DELAY_MS = 700;
/** Delay before the event-nav peek animation closes and becomes marked as seen. */
const EVENT_NAV_PEEK_CLOSE_DELAY_MS = 1700;

// Separate contexts keep the event sidebar nav and the header semicircle nav independent.
const EventNavContext = createContext(null);
const HeaderNavContext = createContext(null);

/**
 * Returns the shared event-sidebar navigation API.
 *
 * @returns {{isOpen: boolean, toggle: () => void, close: () => void}}
 */
export function useEventNav() {
  const context = useContext(EventNavContext);
  if (!context) {
    throw new Error("useEventNav must be used within EventNavProvider");
  }

  return context;
}

/**
 * Returns the shared header radial-navigation API.
 *
 * @returns {{isOpen: boolean, open: () => void, close: () => void, toggle: () => void}}
 */
export function useHeaderNav() {
  const context = useContext(HeaderNavContext);
  if (!context) {
    throw new Error("useHeaderNav must be used within EventNavProvider");
  }

  return context;
}

/**
 * Provides route-aware state for both the event sidebar navigation and the header radial navigation.
 *
 * @param {{children: import("react").ReactNode}} props
 * @returns {JSX.Element}
 */
export default function EventNavProvider({ children }) {
  // Route-derived flags decide when the event-specific navigation is even allowed to render.
  const pathname = usePathname() ?? "/";
  const isEventPage = pathname.startsWith("/event");

  // Event-page sidebar state and its first-visit peek animation state.
  const [isEventNavOpen, setIsEventNavOpen] = useState(false);
  const [isPeeking, setIsPeeking] = useState(false);

  // Keeps the semicircle header nav in sync across the header and the nav component.
  const [isHeaderNavOpen, setIsHeaderNavOpen] = useState(false);

  // The event sidebar can only be considered open while the user is on an event route.
  const isEventNavVisible = isEventPage;
  const effectiveEventNavOpen = isEventNavVisible && isEventNavOpen;
  const isEventNavPeeking = isEventNavVisible && !effectiveEventNavOpen && isPeeking;

  // Reset all navigation overlays on route changes so each page starts from a clean state.
  useEffect(() => {
    setIsEventNavOpen(false);
    setIsPeeking(false);
    setIsHeaderNavOpen(false);
  }, [pathname]);

  // Show a one-time "peek" of the event navigation to hint that the sidebar exists.
  useEffect(() => {
    if (!isEventNavVisible || typeof window === "undefined") return;
    if (window.sessionStorage.getItem(EVENT_NAV_PEEK_KEY)) return;

    const openTimer = window.setTimeout(() => {
      setIsPeeking(true);
    }, EVENT_NAV_PEEK_OPEN_DELAY_MS);

    const closeTimer = window.setTimeout(() => {
      setIsPeeking(false);
      window.sessionStorage.setItem(EVENT_NAV_PEEK_KEY, "true");
    }, EVENT_NAV_PEEK_CLOSE_DELAY_MS);

    return () => {
      window.clearTimeout(openTimer);
      window.clearTimeout(closeTimer);
    };
  }, [isEventNavVisible]);

  // Stable event-nav actions are shared with the toggle button and the sidebar itself.
  const toggleEventNav = useCallback(() => setIsEventNavOpen((prev) => !prev), []);
  const closeEventNav = useCallback(() => {
    setIsEventNavOpen(false);
    setIsPeeking(false);
  }, []);

  // Stable header-nav actions are shared with the center trigger and the header action buttons.
  const openHeaderNav = useCallback(() => setIsHeaderNavOpen(true), []);
  const closeHeaderNav = useCallback(() => setIsHeaderNavOpen(false), []);
  const toggleHeaderNav = useCallback(() => setIsHeaderNavOpen((prev) => !prev), []);

  // Memoized context values prevent unrelated rerenders in consumers.
  const headerNavValue = useMemo(
    () => ({
      isOpen: isHeaderNavOpen,
      open: openHeaderNav,
      close: closeHeaderNav,
      toggle: toggleHeaderNav,
    }),
    [closeHeaderNav, isHeaderNavOpen, openHeaderNav, toggleHeaderNav]
  );

  const eventNavValue = useMemo(
    () => ({ isOpen: effectiveEventNavOpen, toggle: toggleEventNav, close: closeEventNav }),
    [closeEventNav, effectiveEventNavOpen, toggleEventNav]
  );

  // Both providers wrap the layout so header and event navigation can react anywhere in the tree.
  return (
    <EventNavContext.Provider value={eventNavValue}>
      <HeaderNavContext.Provider value={headerNavValue}>
        {children}

        {/* Floating button that toggles the event-page sidebar navigation. */}
        <EventNavToggle
          isOpen={effectiveEventNavOpen}
          isPeeking={isEventNavPeeking}
          onToggle={toggleEventNav}
          visible={isEventNavVisible}
        />

        {/* Sliding sidebar navigation that is only meaningful on event routes. */}
        <EventSidebar
          isOpen={effectiveEventNavOpen}
          isPeeking={isEventNavPeeking}
          onClose={closeEventNav}
        />
      </HeaderNavContext.Provider>
    </EventNavContext.Provider>
  );
}
