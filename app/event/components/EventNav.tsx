'use client'

import { useEffect, useState } from "react";
import { usePathname, useRouter } from "next/navigation";

const tabs = [
  { label: "Program", path: "/event/program", hash: "#program" },
  { label: "Speakers", path: "/event/more", hash: "#speakers" },
  { label: "Performances", path: "/event/more", hash: "#performances" },
  { label: "Professional Workshops", path: "/event/more", hash: "#professional-workshops" },
  { label: "Experience Workshops", path: "/event/more", hash: "#experience-workshops" },
  { label: "Side Happenings", path: "/event/more", hash: "#side-happenings" },
];

export default function EventNav(): JSX.Element {
  const router = useRouter();
  const pathname = usePathname();
  const [activeKey, setActiveKey] = useState<string>("/event/program#program");

  useEffect(() => {
    const update = () => {
      const p = window.location.pathname || "/event/program";
      const h = window.location.hash || (p === "/event/program" ? "#program" : "#speakers");
      setActiveKey(`${p}${h}`);
    };

    update();
    window.addEventListener("hashchange", update);
    window.addEventListener("popstate", update);
    return () => {
      window.removeEventListener("hashchange", update);
      window.removeEventListener("popstate", update);
    };
  }, [pathname]);

  const handleClick = (path: string, hash: string) => {
    const target = `${path}${hash}`;
    // navigate to the target page + hash
    router.push(target);

    // if already on the same page, smooth scroll to the element
    if (typeof window !== "undefined" && window.location.pathname === path) {
      const el = document.querySelector(hash) as HTMLElement | null;
      if (el) setTimeout(() => el.scrollIntoView({ behavior: "smooth", block: "start" }), 70);
    }

    setActiveKey(target);
  };

  return (
    <nav className="event-nav-vertical" aria-label="Event navigation">
      {tabs.map((t) => {
        const key = `${t.path}${t.hash}`;
        const isActive = key === activeKey;
        const className = isActive ? "nav-pill nav-pill--active" : "nav-pill";
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
