"use client";
import { createContext, useContext, useState, useEffect, ReactNode } from "react";
import { usePathname } from "next/navigation";
import EventSidebar from "./EventSidebar";
import EventNavToggle from "./EventNavToggle";

interface EventNavContextType {
  isOpen: boolean;
  toggle: () => void;
  close: () => void;
}

const EventNavContext = createContext<EventNavContextType | undefined>(undefined);

export function useEventNav() {
  const context = useContext(EventNavContext);
  if (!context) {
    throw new Error("useEventNav must be used within EventNavProvider");
  }
  return context;
}

export default function EventNavProvider({ children }: { children: ReactNode }) {
  const pathname = usePathname();
  const isEventPage = pathname?.startsWith("/event") ?? false;
  const [isOpen, setIsOpen] = useState<boolean>(false);

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

  return (
    <EventNavContext.Provider value={{ isOpen, toggle, close }}>
      {children}
      <EventNavToggle isOpen={isOpen} onToggle={toggle} visible={isEventPage} />
      <EventSidebar isOpen={isOpen} onClose={close} />
    </EventNavContext.Provider>
  );
}

