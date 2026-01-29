"use client";

import React, { useEffect, useRef, useState } from "react";
import { Team } from "../teamsData";
import TeamCard from "./TeamCard";

type Props = {
  team: Team;
  index?: number;
};

export default function TeamReveal({ team, index = 0 }: Props) {
  const ref = useRef<HTMLDivElement | null>(null);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const obs = new IntersectionObserver(
      ([entry]) => {
        // mount while element is visible and unmount when it leaves
        setMounted(!!entry.isIntersecting);
      },
      { rootMargin: "0px 0px", threshold: 0.15 }
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, []);

  return (
    <div ref={ref} className="min-h-[96px]">
      {mounted ? <TeamCard team={team} index={index} /> : <div className="h-24" />}
    </div>
  );
}
