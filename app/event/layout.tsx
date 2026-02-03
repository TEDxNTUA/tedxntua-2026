import type { ReactNode } from "react";
import EventNav from "./components/EventNav";

export default function EventLayout({ children }: { children: ReactNode }) {
  return (
    <div>
      {/* Desktop: horizontal nav under main header */}
      <div className="bg-white border-b sticky top-[72px] z-40 hidden md:block">
        <div className="container mx-auto px-4 py-3">
          <EventNav variant="horizontal" />
        </div>
      </div>

      {/* Mobile: show compact horizontal nav under the header */}
      <div className="md:hidden bg-white border-b">
        <div className="container mx-auto px-4 py-2">
          <EventNav variant="horizontal" />
        </div>
      </div>

      <div className="container mx-auto px-4 py-6">
        <div>{children}</div>
      </div>
    </div>
  );
}
