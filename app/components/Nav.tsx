"use client";
import { usePathname } from "next/navigation";
import { useState } from "react";

function handleClick(index: number) {
  try {
    sessionStorage.setItem("nav-target-index", String(index));
  } catch {
    // ignore (server-side or private mode)
  }
}

export default function Nav() {
  const pathname = usePathname();
  const [isOpen, setIsOpen] = useState(false);

  const baseClass = "nav-pill";

  const homeClass = pathname === "/" ? `${baseClass} nav-pill--active` : baseClass;
  const sponsorsClass = pathname === "/sponsors" ? `${baseClass} nav-pill--active` : baseClass;
  const teamClass = pathname === "/team" ? `${baseClass} nav-pill--active` : baseClass;

  const handleNavClick = (index: number) => {
    handleClick(index);
    setIsOpen(false);
  };

  return (
    <>
      {/* Mobile hamburger button */}
      <button
        className="md:hidden flex flex-col justify-center items-center w-10 h-10 gap-1.5 z-50"
        onClick={() => setIsOpen(!isOpen)}
        aria-label="Toggle navigation menu"
        aria-expanded={isOpen}
      >
        <span
          className={`block w-6 h-0.5 bg-white transition-all duration-300 ${
            isOpen ? "rotate-45 translate-y-2" : ""
          }`}
        />
        <span
          className={`block w-6 h-0.5 bg-white transition-all duration-300 ${
            isOpen ? "opacity-0" : ""
          }`}
        />
        <span
          className={`block w-6 h-0.5 bg-white transition-all duration-300 ${
            isOpen ? "-rotate-45 -translate-y-2" : ""
          }`}
        />
      </button>

      {/* Desktop navigation */}
      <nav className="hidden md:flex items-center gap-3">
        <a href="/" onClick={() => handleClick(0)} className={homeClass}>
          Home
        </a>
        <a href="/sponsors" onClick={() => handleClick(1)} className={sponsorsClass}>
          Sponsors
        </a>
        <a href="/team" onClick={() => handleClick(2)} className={teamClass}>
          Team
        </a>
      </nav>

      {/* Mobile navigation overlay */}
      <div
        className={`md:hidden fixed inset-0 bg-black/95 z-40 transition-all duration-300 ${
          isOpen ? "opacity-100 visible" : "opacity-0 invisible"
        }`}
        onClick={() => setIsOpen(false)}
      >
        <nav
          className={`flex flex-col items-center justify-center h-full gap-6 transition-all duration-300 ${
            isOpen ? "translate-y-0 opacity-100" : "-translate-y-8 opacity-0"
          }`}
          onClick={(e) => e.stopPropagation()}
        >
          <a
            href="/"
            onClick={() => handleNavClick(0)}
            className={`${homeClass} text-lg`}
          >
            Home
          </a>
          <a
            href="/sponsors"
            onClick={() => handleNavClick(1)}
            className={`${sponsorsClass} text-lg`}
          >
            Sponsors
          </a>
          <a
            href="/team"
            onClick={() => handleNavClick(2)}
            className={`${teamClass} text-lg`}
          >
            Team
          </a>
        </nav>
      </div>
    </>
  );
}
