"use client";
import React, { createContext, useContext, useState, useEffect } from "react";
import { usePathname } from "next/navigation";
import EventSidebar from "./EventSidebar";
import EventNavToggle from "./EventNavToggle";







// Use null as the default; `useEventNav` will throw outside provider
const EventNavContext = createContext(null);

export function useEventNav() {
  const context = useContext(EventNavContext);
  if (!context) {
    throw new Error("useEventNav must be used within EventNavProvider");
  }
  return context;
}

export default function EventNavProvider({ children }) {
  const pathname = usePathname();
  const isEventPage = pathname?.startsWith("/event") ?? false;
  const [isOpen, setIsOpen] = useState(false);

  // Auto-open sidebar when navigating to event pages
  useEffect(() => {
    if (isEventPage) {
      setIsOpen(true);
    } else {
      setIsOpen(false);
    }
  }, [isEventPage]);

  const toggle = () => setIsOpen((prev) => !prev);
  const close = () => setIsOpen(false);

  return React.createElement(
    EventNavContext.Provider,
    { value: { isOpen, toggle, close } },
    React.createElement(React.Fragment, null,
    children,
    React.createElement(EventNavToggle, { isOpen, onToggle: toggle, visible: isEventPage }),
    React.createElement(EventSidebar, { isOpen, onClose: close })
    )
  );
}
