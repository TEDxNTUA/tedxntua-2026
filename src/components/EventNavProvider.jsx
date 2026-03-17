import React, { createContext, useContext, useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
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
  const { pathname = "/" } = useLocation();
  const isEventPage = pathname.startsWith("/event");
  const [isOpen, setIsOpen] = useState(false);
  const effectiveIsOpen = isEventPage && isOpen;

  const toggle = () => setIsOpen((prev) => !prev);
  const close = () => setIsOpen(false);

  useEffect(() => {
    setIsOpen(false);
  }, [pathname]);

  return React.createElement(
    EventNavContext.Provider,
    { value: { isOpen, toggle, close } },
    React.createElement(React.Fragment, null,
      children,
      React.createElement(EventNavToggle, { isOpen: effectiveIsOpen, onToggle: toggle, visible: isEventPage }),
      React.createElement(EventSidebar, { isOpen: effectiveIsOpen, onClose: close })
    )
  );
}
