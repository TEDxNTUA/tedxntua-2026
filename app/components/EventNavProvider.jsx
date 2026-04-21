"use client";

import { createContext, useCallback, useContext, useEffect, useMemo, useState } from "react";
import { usePathname } from "next/navigation";
import EventSidebar from "./EventSidebar";

/**
 * Shared provider for the site header navigation and the event-page sidebar navigation.
 * It centralizes route-aware nav state so header controls and page-level overlays stay synchronized.
 */

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

  // Keeps the semicircle header nav in sync across the header and the nav component.
  const [isHeaderNavOpen, setIsHeaderNavOpen] = useState(false);

  // Reset all navigation overlays on route changes so each page starts from a clean state.
  useEffect(() => {
    setIsHeaderNavOpen(false);
  }, [pathname]);

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

  // Event nav context now just handles visibility for the dock
  const eventNavValue = useMemo(
    () => ({ isOpen: false, toggle: () => {}, close: () => {} }),
    []
  );

  // Both providers wrap the layout so header and event navigation can react anywhere in the tree.
  return (
    <EventNavContext.Provider value={eventNavValue}>
      <HeaderNavContext.Provider value={headerNavValue}>
        {children}

        {/* Sliding sidebar navigation that is only meaningful on event routes. */}
        <EventSidebar visible={isEventPage} />
      </HeaderNavContext.Provider>
    </EventNavContext.Provider>
  );
}
