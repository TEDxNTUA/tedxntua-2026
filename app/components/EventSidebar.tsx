"use client";
import { useEffect, useState, useRef } from "react";
import { usePathname, useRouter } from "next/navigation";

// Event navigation tabs
const eventTabs = [
  { label: "Program", path: "/event/program", hash: "#program" },
  { label: "Speakers", path: "/event/speakers", hash: "#speakers" },
  { label: "Performances", path: "/event/performances", hash: "#performances" },
  { label: "Professional Workshops", path: "/event/professionalWorkshops", hash: "#professional-workshops" },
  { label: "Experience Workshops", path: "/event/experienceWorkshops", hash: "#experience-workshops" },
  { label: "Side Happenings", path: "/event/sideHappenings", hash: "#side-happenings" },
];

interface EventSidebarProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function EventSidebar({ isOpen, onClose }: EventSidebarProps): JSX.Element {
  const router = useRouter();
  const pathname = usePathname();
  const [activeEventKey, setActiveEventKey] = useState<string>("/event/program#program");
  const pendingHashRef = useRef<string | null>(null);

  // Update active event key based on pathname and hash
  useEffect(() => {
    const update = () => {
      const p = window.location.pathname || "/event/program";
      const h = window.location.hash || (p === "/event/program" ? "#program" : "#speakers");
      setActiveEventKey(`${p}${h}`);
    };

    if (pendingHashRef.current && typeof window !== "undefined") {
      const el = document.querySelector(pendingHashRef.current) as HTMLElement | null;
      if (el) {
        history.replaceState(null, "", `${window.location.pathname}${pendingHashRef.current}`);
        setTimeout(() => el.scrollIntoView({ behavior: "smooth", block: "start" }), 60);
      }
      pendingHashRef.current = null;
    }

    update();
    window.addEventListener("hashchange", update);
    window.addEventListener("popstate", update);
    return () => {
      window.removeEventListener("hashchange", update);
      window.removeEventListener("popstate", update);
    };
  }, [pathname]);

  // Handle event navigation clicks
  const handleEventClick = async (path: string, hash: string) => {
    const target = `${path}${hash}`;

    if (typeof window === "undefined") {
      router.push(target);
      setActiveEventKey(target);
      return;
    }

    if (window.location.pathname === path) {
      history.replaceState(null, "", target);
      const el = document.querySelector(hash) as HTMLElement | null;
      if (el) {
        el.scrollIntoView({ behavior: "smooth", block: "start" });
      } else {
        window.location.hash = hash;
        setTimeout(() => {
          const fallback = document.querySelector(hash) as HTMLElement | null;
          if (fallback) fallback.scrollIntoView({ behavior: "smooth", block: "start" });
        }, 80);
      }
      setActiveEventKey(target);
      return;
    }

    pendingHashRef.current = hash;
    await router.push(path);
    setActiveEventKey(target);
  };

  return (
    <>
      {/* Overlay backdrop */}
      <div
        className={`fixed inset-0 bg-black/50 z-40 transition-opacity duration-300 ${
          isOpen ? "opacity-100 visible" : "opacity-0 invisible"
        }`}
        onClick={onClose}
        aria-hidden={!isOpen}
      />

      {/* Sidebar */}
      <aside
        className={`fixed top-0 right-0 h-full w-56 bg-black text-white z-50 transform transition-transform duration-300 ease-in-out ${
          isOpen ? "translate-x-0" : "translate-x-full"
        }`}
        aria-hidden={!isOpen}
      >
        <div className="flex flex-col h-full">
          {/* Header */}
          <div className="flex items-center p-4 border-b border-white/10">
            <h2 className="text-sm font-semibold">Event Navigation</h2>
          </div>

          {/* Navigation items */}
          <nav className="flex-1 overflow-y-auto p-3">
            <div className="event-nav-vertical space-y-2">
              {eventTabs.map((t) => {
                const key = `${t.path}${t.hash}`;
                const isActive = key === activeEventKey;
                const isProgram = t.path === "/event/program";
                const base = isActive ? "nav-pill nav-pill--active" : "nav-pill";
                const special = isProgram ? "nav-pill--program" : "";
                const className = `${base} ${special}`.trim();

                return (
                  <button
                    key={key}
                    type="button"
                    onClick={() => {
                      handleEventClick(t.path, t.hash);
                      onClose();
                    }}
                    className={className}
                    aria-current={isActive ? "true" : undefined}
                  >
                    {t.label}
                  </button>
                );
              })}
            </div>
          </nav>
        </div>
      </aside>
    </>
  );
}

