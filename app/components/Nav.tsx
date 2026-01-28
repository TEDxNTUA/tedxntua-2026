"use client";
import { useState } from "react";
import { usePathname, useRouter } from "next/navigation";

const ROUTES = ["/", "/sponsors", "/team"];

export default function Nav(): JSX.Element {
  const router = useRouter();
  const pathnameRaw = usePathname();
  const pathname = pathnameRaw ?? "/";
  const [isOpen, setIsOpen] = useState<boolean>(false);

  const baseClass = "nav-pill";

  const homeClass = pathname === "/" ? `${baseClass} nav-pill--active` : baseClass;
  const sponsorsClass = pathname === "/sponsors" ? `${baseClass} nav-pill--active` : baseClass;
  const teamClass = pathname === "/team" ? `${baseClass} nav-pill--active` : baseClass;

  const navigate = (index: number): void => {
    try {
      sessionStorage.setItem("nav-target-index", String(index));
    } catch {
      // ignore
    }
    router.push(ROUTES[index]);
  };

  const handleNavClick = (index: number): void => {
    setIsOpen(false);
    navigate(index);
  };

  return (
    <>
      {/* Mobile hamburger button */}
      <button
        className="md:hidden flex flex-col justify-center items-center w-10 h-10 gap-1.5 z-50"
        onClick={() => setIsOpen((s) => !s)}
        aria-label="Toggle navigation menu"
        aria-expanded={isOpen}
        type="button"
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
        <button type="button" onClick={() => navigate(0)} className={homeClass}>
          Home
        </button>
        <button type="button" onClick={() => navigate(1)} className={sponsorsClass}>
          Sponsors
        </button>
        <button type="button" onClick={() => navigate(2)} className={teamClass}>
          The Team
        </button>
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
          <button type="button" onClick={() => handleNavClick(0)} className={`${homeClass} text-lg`}>
            Home
          </button>
          <button
            type="button"
            onClick={() => handleNavClick(1)}
            className={`${sponsorsClass} text-lg`}
          >
            Sponsors
          </button>
          <button type="button" onClick={() => handleNavClick(2)} className={`${teamClass} text-lg`}>
            The Team
          </button>
        </nav>
      </div>
    </>
  );
}
