"use client";
import type { MouseEvent } from "react";
import { usePathname, useRouter } from "next/navigation";
import { useEventNav } from "./EventNavProvider";
import classes from "./Nav.module.css";

function Nav() {
  const router = useRouter();
  const pathnameRaw = usePathname();
  const pathname = pathnameRaw ?? "/";
  const { toggle: toggleEventNav } = useEventNav();

  const isEventPage = pathname.startsWith("/event");
  const isSponsorsPage = pathname === "/sponsors";
  const isTeamPage = pathname === "/team";
  const isHomePage = pathname === "/";

  const navigate = (route: string): void => {
    try {
      if (route === "/") sessionStorage.setItem("nav-target-index", "0");
      if (route === "/event") sessionStorage.setItem("nav-target-index", "1");
      if (route === "/sponsors") sessionStorage.setItem("nav-target-index", "2");
      if (route === "/team") sessionStorage.setItem("nav-target-index", "3");
    } catch {
      // ignore
    }
    router.push(route);
  };

  const onAnchorClick =
    (handler: () => void) =>
    (event: MouseEvent<HTMLAnchorElement>): void => {
      event.preventDefault();
      handler();
    };

  const handleEventClick = (): void => {
    if (isEventPage) {
      toggleEventNav();
      return;
    }
    navigate("/event");
  };

  return (
    <div className={classes.wrap}>
      <a
        href="/event"
        className={`${classes.a} ${isEventPage ? classes.active : ""}`}
        onClick={onAnchorClick(handleEventClick)}
        aria-label="Event"
      >
        <div />
      </a>

      <a
        href="/sponsors"
        className={`${classes.a} ${isSponsorsPage ? classes.active : ""}`}
        onClick={onAnchorClick(() => navigate("/sponsors"))}
        aria-label="Sponsors"
      >
        <div />
      </a>

      <a
        href="#"
        className={classes.a}
        aria-label="None"
        onClick={(event) => event.preventDefault()}
      >
        <div />
      </a>

      <a
        href="/team"
        className={`${classes.a} ${isTeamPage ? classes.active : ""}`}
        onClick={onAnchorClick(() => navigate("/team"))}
        aria-label="Team"
      >
        <div />
      </a>

      <a
        href="/"
        className={`${classes.a} ${isHomePage ? classes.active : ""}`}
        onClick={onAnchorClick(() => navigate("/"))}
        aria-label="Home"
      >
        <div />
      </a>
    </div>
  );
}

export default Nav;
