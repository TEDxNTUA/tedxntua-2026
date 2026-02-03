'use client'

import { useEffect, useState, useRef } from "react";
import { usePathname, useRouter } from "next/navigation";

type Variant = "vertical" | "horizontal";

const tabs = [
  { label: "Program", path: "/event/program", hash: "#program" },
  { label: "Speakers", path: "/event/more", hash: "#speakers" },
  { label: "Performances", path: "/event/more", hash: "#performances" },
  { label: "Professional Workshops", path: "/event/more", hash: "#professional-workshops" },
  { label: "Experience Workshops", path: "/event/more", hash: "#experience-workshops" },
  { label: "Side Happenings", path: "/event/more", hash: "#side-happenings" },
];

export default function EventNav({ variant = "vertical" }: { variant?: Variant }): JSX.Element {
  const router = useRouter();
  const pathname = usePathname();
  const [activeKey, setActiveKey] = useState<string>("/event/program#program");

  const pendingHashRef = useRef<string | null>(null);

  useEffect(() => {
    const update = () => {
      const p = window.location.pathname || "/event/program";
      const h = window.location.hash || (p === "/event/program" ? "#program" : "#speakers");
      setActiveKey(`${p}${h}`);
    };

    // if we have a pending hash and we've navigated to the target path, scroll to it
    if (pendingHashRef.current && typeof window !== "undefined") {
      const el = document.querySelector(pendingHashRef.current) as HTMLElement | null;
      if (el) {
        // replace URL to include hash without jumping
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

  const handleClick = async (path: string, hash: string) => {
    const target = `${path}${hash}`;

    // If running in non-browser environment, just navigate.
    if (typeof window === "undefined") {
      router.push(target);
      setActiveKey(target);
      return;
    }

    // If already on the same page, avoid changing the URL first (prevents jump),
    // update the URL and do a smooth programmatic scroll to the element.
    if (window.location.pathname === path) {
      // update the URL to reflect the selected section without triggering a jump
      history.replaceState(null, "", target);

      const el = document.querySelector(hash) as HTMLElement | null;
      if (el) {
        el.scrollIntoView({ behavior: "smooth", block: "start" });
      } else {
        // fallback: set hash (may jump) but give a short delay then try to smooth scroll
        window.location.hash = hash;
        setTimeout(() => {
          const fallback = document.querySelector(hash) as HTMLElement | null;
          if (fallback) fallback.scrollIntoView({ behavior: "smooth", block: "start" });
        }, 80);
      }

      setActiveKey(target);
      return;
    }

    // Navigating from another page: set pending hash so the effect that runs when pathname changes
    // can perform a reliable smooth scroll after the new page mounts.
    pendingHashRef.current = hash;
    await router.push(path);

    // update the active key immediately so UI reflects the click
    setActiveKey(target);
  };

  const navClass = variant === "vertical" ? "event-nav-vertical" : "event-nav-horizontal";

  return (
    <nav className={navClass} aria-label="Event navigation">
      {tabs.map((t) => {
        const key = `${t.path}${t.hash}`;
        const isActive = key === activeKey;
        const isProgram = t.path === "/event/program";
        const base = isActive ? "nav-pill nav-pill--active" : "nav-pill";
        const special = isProgram ? "nav-pill--program" : "";
        const className = `${base} ${special}`.trim();

        return (
          <button
            key={key}
            type="button"
            onClick={() => handleClick(t.path, t.hash)}
            className={className}
            aria-current={isActive ? "true" : undefined}
          >
            {t.label}
          </button>
        );
      })}
    </nav>
  );
}
