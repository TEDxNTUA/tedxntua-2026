import { useEffect, useRef, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { useEventNav } from "./EventNavProvider";
import classes from "./Nav.module.css";

function Nav() {
  const navigateRouter = useNavigate();
  const { pathname = "/" } = useLocation();
  const { isOpen: isEventNavOpen, toggle: toggleEventNav } = useEventNav();
  const [isOpen, setIsOpen] = useState(false);
  const [isHiddenOnScroll, setIsHiddenOnScroll] = useState(false);
  const menuRef = useRef(null);
  const centerLogoRef = useRef(null);
  const lastScrollYRef = useRef(0);

  const isEventPage = pathname.startsWith("/event");
  const isSponsorsPage = pathname === "/sponsors";
  const isTeamPage = pathname === "/team" || pathname.startsWith("/team/");

  const navigate = (route) => {
    setIsOpen(false);
    try {
      if (route === "/event") sessionStorage.setItem("nav-target-index", "1");
      if (route === "/sponsors") sessionStorage.setItem("nav-target-index", "2");
      if (route === "/team") sessionStorage.setItem("nav-target-index", "3");
    } catch {
      // ignore
    }
    navigateRouter(route);
  };

  const onAnchorClick =
    (handler) =>
      (event) => {
        event.preventDefault();
        handler();
      };

  const handleEventClick = () => {
    if (isEventPage) {
      toggleEventNav();
      return;
    }
    navigate("/event");
  };

  const handleCenterLogoClick = () => {
    if (!isOpen) {
      setIsOpen(true);
      return;
    }

    setIsOpen(false);
    navigate("/");
  };

  useEffect(() => {
    if (typeof window === "undefined") return;

    lastScrollYRef.current = window.scrollY;

    const handleScroll = () => {
      const currentY = window.scrollY;
      const isScrollingDown = currentY > lastScrollYRef.current;
      const passedTop = currentY > 40;

      if (isScrollingDown && passedTop) {
        setIsHiddenOnScroll(true);
      } else {
        setIsHiddenOnScroll(false);
      }

      lastScrollYRef.current = currentY;
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    if (!isOpen || typeof document === "undefined") return;

    const handlePointerDown = (event) => {
      const target = event.target;

      if (menuRef.current?.contains(target) || centerLogoRef.current?.contains(target)) {
        return;
      }

      setIsOpen(false);
    };

    document.addEventListener("pointerdown", handlePointerDown);
    return () => document.removeEventListener("pointerdown", handlePointerDown);
  }, [isOpen]);

  useEffect(() => {
    if (isEventPage && isEventNavOpen) {
      setIsOpen(false);
    }
  }, [isEventNavOpen, isEventPage]);

  return (
    <div
      className={[
        classes.menuContainer,
        isEventNavOpen ? classes.menuContainerRaised : "",
        isHiddenOnScroll ? classes.menuContainerHidden : "",
      ].join(" ").trim()}
    >
      <div ref={menuRef} className={`${classes.wrap} ${isOpen ? classes.active : ""}`}>
        <a
          href="/team"
          className={`${classes.slice} ${isTeamPage ? classes.active : ""}`}
          onClick={onAnchorClick(() => navigate("/team"))}
          aria-label="EventTeam">

          <div />
        </a>
        <a
          href="/sponsors"
          className={`${classes.slice} ${isSponsorsPage ? classes.active : ""}`}
          onClick={onAnchorClick(() => navigate("/sponsors"))}
          aria-label="Sponsors">

          <div />
        </a>
        <a
          href="/event"
          className={`${classes.slice} ${isEventPage ? classes.active : ""}`}
          onClick={onAnchorClick(handleEventClick)}
          aria-label="EventTeam">

          <div />
        </a>
      </div>

      <div
        ref={centerLogoRef}
        className={classes.centerLogo}
        onClick={handleCenterLogoClick}
        aria-label="Home"
      >
        
        <div />
      </div>
    </div>
  );
}

export default Nav;
