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
  const effectiveIsOpen = isEventPage && isOpen;

  useEffect(() => {
    setIsOpen(false);
  }, [pathname]);

  const toggle = () => setIsOpen((prev) => !prev);
  const close = () => setIsOpen(false);

  return (
    <EventNavContext.Provider value={{ isOpen: effectiveIsOpen, toggle, close }}>
      {children}
      <EventNavToggle
        isOpen={effectiveIsOpen}
        onToggle={toggle}
        visible={isEventPage}
      />
      <EventSidebar isOpen={effectiveIsOpen} onClose={close} />
    </EventNavContext.Provider>
  );
}
