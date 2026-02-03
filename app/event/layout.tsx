import type { ReactNode } from "react";
import EventNav from "./components/EventNav";

export default function EventLayout({ children }: { children: ReactNode }) {
  return (
    <div className="container mx-auto px-4 py-6">
      <div className="flex gap-8">
        <aside className="w-64 hidden md:block sticky top-[72px] self-start">
          <div className="pt-4">
            <EventNav />
          </div>
        </aside>

        <div className="flex-1">
          {children}
        </div>
      </div>

      {/* Mobile: show a compact horizontal nav under the header */}
      <div className="md:hidden mt-4">
        <EventNav />
      </div>
    </div>
  );
}
