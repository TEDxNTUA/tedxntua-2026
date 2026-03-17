import React, { useEffect, useRef, useState } from "react";

const MEMBER_PHOTO_WIDTH = 80;
const MEMBER_PHOTO_HEIGHT = 100;

export default function TeamTimeline({ teams }) {
  const containerRef = useRef(null);
  const [scrollProgress, setScrollProgress] = useState(0);
  const [minHeight, setMinHeight] = useState(undefined);

  useEffect(() => {
    const handleScroll = () => {
      const el = containerRef.current;
      if (!el) return;
      const rect = el.getBoundingClientRect();
      const windowH = window.innerHeight;
      const elHeight = rect.height;

      const docTop = rect.top + window.pageYOffset;
      const scrollY = window.pageYOffset || window.scrollY || 0;
      let headerHeight = 0;
      try {
        const headerEl = document.querySelector("header, nav, .navbar, .topbar, .site-header");
        if (headerEl) {
          const cs = getComputedStyle(headerEl);
          if (cs.position === "fixed" || cs.position === "sticky") {
            headerHeight = headerEl.offsetHeight || 0;
          }
        }
      } catch (e) {
        headerHeight = 0;
      }

      const effectiveWindowH = Math.max(0, windowH - headerHeight);
      const progress = Math.max(
        0,
        Math.min(1, (scrollY + effectiveWindowH - docTop) / Math.max(elHeight, 1))
      );
      setScrollProgress(progress);
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    const el = containerRef.current;
    if (!el) return;

    const measure = () => {
      const scrollH = el.scrollHeight || el.offsetHeight || 0;
      const target = Math.max(scrollH, typeof window !== "undefined" ? window.innerHeight : 800);
      setMinHeight(`${target}px`);
    };

    requestAnimationFrame(measure);

    window.addEventListener("resize", measure, { passive: true });
    const ro = new ResizeObserver(measure);
    ro.observe(el);

    return () => {
      window.removeEventListener("resize", measure);
      ro.disconnect();
    };
  }, [teams.length]);

  return (
    <div ref={containerRef} className="relative" style={minHeight ? { minHeight } : undefined}>
      <div className="absolute left-1/2 top-0 bottom-0 w-1 -translate-x-1/2 bg-gray-200 rounded-full">
        <div
          className="absolute top-0 left-0 w-full bg-gradient-to-b from-red-600 to-red-500 rounded-full transition-all duration-100"
          style={{ height: `${scrollProgress * 100}%` }}
        />
          <div
            className="absolute left-1/2 -translate-x-1/2 -translate-y-1/2 w-5 h-5 bg-red-600 border-4 border-black rounded-full shadow-lg transition-all duration-100 z-10"
            style={{ top: `${scrollProgress * 100}%` }}
          />
      </div>

      <div className="flex flex-col gap-32 py-16">
        {teams.map((team, i) => (
          <TeamRow key={team.slug} team={team} index={i} />
        ))}
      </div>
    </div>
  );
}

function TeamRow({ team, index }) {
  const ref = useRef(null);
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
      className="grid grid-cols-1 gap-5 min-h-[200px] md:grid-cols-[1fr_60px_1fr] md:items-center md:gap-4"
    >
      <div
        className={`order-1 text-left transition-all duration-700 md:pr-6 md:text-right ${
          visible
            ? "opacity-100 translate-x-0"
            : "opacity-0 -translate-x-12"
        }`}
        style={{ transitionDelay: `${index * 50}ms` }}
      >
        <h3 className="text-2xl font-bold text-black mb-2 sm:text-3xl">{team.title}</h3>
        {team.description && (
          <p className="text-gray-600 text-sm">{team.description}</p>
        )}
      </div>

      <div className="order-2 hidden md:flex justify-center">
        <div
          className={`w-4 h-4 rounded-full border-4 border-red-600 bg-white transition-all duration-500 ${
            visible ? "scale-100" : "scale-0"
          }`}
          style={{ transitionDelay: `${index * 50 + 100}ms` }}
        />
      </div>

      <div
        className={`order-3 flex flex-wrap gap-3 transition-all duration-700 md:pl-6 md:gap-4 ${
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
