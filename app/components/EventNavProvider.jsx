"use client";

import { createContext, useContext, useEffect, useState } from "react";
import { usePathname } from "next/navigation";
import EventSidebar from "./EventSidebar";
import EventNavToggle from "./EventNavToggle";

const EventNavContext = createContext(null);

export function useEventNav() {
  const context = useContext(EventNavContext);
  if (!context) {
    throw new Error("useEventNav must be used within EventNavProvider");
  }

  return context;
}

export default function EventNavProvider({ children }) {
  const pathname = usePathname() ?? "/";
  const isEventPage = pathname.startsWith("/event");
  const [isOpen, setIsOpen] = useState(false);
  const [isPeeking, setIsPeeking] = useState(false);
  const effectiveIsOpen = isEventPage && isOpen;

  useEffect(() => {
    setIsOpen(false);
  }, [pathname]);

  useEffect(() => {
    if (!isEventPage || typeof window === "undefined") return;

    const peekKey = "event-nav-peeked";
    if (window.sessionStorage.getItem(peekKey)) return;

    const openTimer = window.setTimeout(() => {
      setIsPeeking(true);
    }, 700);

    const closeTimer = window.setTimeout(() => {
      setIsPeeking(false);
      window.sessionStorage.setItem(peekKey, "true");
    }, 1700);

    return () => {
      window.clearTimeout(openTimer);
      window.clearTimeout(closeTimer);
    };
  }, [isEventPage]);

  const toggle = () => setIsOpen((prev) => !prev);
  const close = () => {
    setIsOpen(false);
    setIsPeeking(false);
  };

  return (
    <EventNavContext.Provider value={{ isOpen: effectiveIsOpen, toggle, close }}>
      {children}
      <EventNavToggle
        isOpen={effectiveIsOpen}
        isPeeking={isEventPage && !effectiveIsOpen && isPeeking}
        onToggle={toggle}
        visible={isEventPage}
      />
      <EventSidebar
        isOpen={effectiveIsOpen}
        isPeeking={isEventPage && !effectiveIsOpen && isPeeking}
        onClose={close}
      />
    </EventNavContext.Provider>
  );
}
