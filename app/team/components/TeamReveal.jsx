"use client";

import { useEffect, useRef, useState } from "react";

import TeamCard from "./TeamCard";






export default function TeamReveal({ team, index = 0 }) {
  const ref = useRef(null);
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
    </div>);

}
