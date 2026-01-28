"use client";

import React, { useEffect, useRef, useState } from "react";
import { Team } from "../teamsData";

// ========== MEMBER PHOTO SIZE (edit these to change dimensions) ==========
const MEMBER_PHOTO_WIDTH = 80;  // px
const MEMBER_PHOTO_HEIGHT = 100; // px
// =========================================================================

type Props = {
  teams: Team[];
};

export default function TeamTimeline({ teams }: Props) {
  const containerRef = useRef<HTMLDivElement | null>(null);
  const [scrollProgress, setScrollProgress] = useState(0);
  const [minHeight, setMinHeight] = useState<string | undefined>(undefined);

  useEffect(() => {
    const handleScroll = () => {
      const el = containerRef.current;
      if (!el) return;
      const rect = el.getBoundingClientRect();
      const windowH = window.innerHeight;
      const elTop = rect.top;
      const elHeight = rect.height;

      // Calculate how far we've scrolled through the container
      const start = windowH * 0.5;
      const scrolled = start - elTop;
      const total = elHeight;
      const progress = Math.max(0, Math.min(1, scrolled / total));
      setScrollProgress(progress);
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Ensure the timeline container is tall enough so the vertical bar reaches bottom
  useEffect(() => {
    const rowEstimate = 260; // estimated px per team row (includes gaps)
    const padding = 320; // extra padding in px
    const target = Math.max(teams.length * rowEstimate + padding, typeof window !== 'undefined' ? window.innerHeight : 800);
    setMinHeight(`${target}px`);
  }, [teams.length]);

  return (
    <div ref={containerRef} className="relative" style={minHeight ? { minHeight } : undefined}>
      {/* Vertical progress bar (background always full height) */}
      <div className="absolute left-1/2 top-0 bottom-0 w-1 -translate-x-1/2 bg-gray-200 rounded-full">
        {/* Progress fill (moves with scroll) */}
        <div
          className="absolute top-0 left-0 w-full bg-gradient-to-b from-red-600 to-red-500 rounded-full transition-all duration-100"
          style={{ height: `${scrollProgress * 100}%` }}
        />
        {/* Moving ball (moves with scroll) */}
        <div
          className="absolute left-1/2 -translate-x-1/2 w-5 h-5 bg-red-600 border-4 border-black rounded-full shadow-lg transition-all duration-100 z-10"
          style={{ top: `calc(${scrollProgress * 100}% - 10px)` }}
        />
      </div>

      {/* Teams */}
      <div className="flex flex-col gap-32 py-16">
        {teams.map((team, i) => (
          <TeamRow key={team.slug} team={team} index={i} />
        ))}
      </div>
    </div>
  );
}

type TeamRowProps = {
  team: Team;
  index: number;
};

function TeamRow({ team, index }: TeamRowProps) {
  const ref = useRef<HTMLDivElement | null>(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const obs = new IntersectionObserver(
      ([entry]) => {
        setVisible(entry.isIntersecting);
      },
      { threshold: 0.2 }
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, []);

  const members = team.members || [];

  return (
    <div
      ref={ref}
      className="grid grid-cols-[1fr_60px_1fr] items-center gap-4 min-h-[200px]"
    >
      {/* Left: Name + Description */}
      <div
        className={`text-right pr-6 transition-all duration-700 ${
          visible
            ? "opacity-100 translate-x-0"
            : "opacity-0 -translate-x-12"
        }`}
        style={{ transitionDelay: `${index * 50}ms` }}
      >
        <h3 className="text-3xl font-bold text-black mb-2">{team.title}</h3>
        {team.description && (
          <p className="text-gray-600 text-sm">{team.description}</p>
        )}
      </div>

      {/* Center: Connector dot on bar */}
      <div className="flex justify-center">
        <div
          className={`w-4 h-4 rounded-full border-4 border-red-600 bg-white transition-all duration-500 ${
            visible ? "scale-100" : "scale-0"
          }`}
          style={{ transitionDelay: `${index * 50 + 100}ms` }}
        />
      </div>

      {/* Right: Member photos */}
      <div
        className={`flex flex-wrap gap-4 pl-6 transition-all duration-700 ${
          visible
            ? "opacity-100 translate-x-0"
            : "opacity-0 translate-x-12"
        }`}
        style={{ transitionDelay: `${index * 50 + 150}ms` }}
      >
        {members.map((m, mi) => (
          <div
            key={m.id}
            className={`flex flex-col items-center transition-all duration-500 ${
              visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6"
            }`}
            style={{ transitionDelay: `${index * 50 + 200 + mi * 80}ms` }}
          >
            <div
              className="rounded-md overflow-hidden border-2 border-red-600 bg-gray-100 shadow-md"
              style={{ width: MEMBER_PHOTO_WIDTH, height: MEMBER_PHOTO_HEIGHT }}
            >
              {m.photo ? (
                <img
                  src={m.photo}
                  alt={m.name}
                  className="w-full h-full object-cover"
                />
              ) : (
                <div className="w-full h-full flex items-center justify-center text-gray-400 text-xs">
                  No
                </div>
              )}
            </div>
            <span
              className="mt-1 text-xs font-medium text-black text-center truncate"
              style={{ maxWidth: MEMBER_PHOTO_WIDTH }}
            >
              {m.name}
            </span>
            {m.role && (
              <span
                className="text-[10px] text-gray-500 text-center truncate"
                style={{ maxWidth: MEMBER_PHOTO_WIDTH }}
              >
                {m.role}
              </span>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}
