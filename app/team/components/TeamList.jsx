"use client";

import { useEffect, useRef, useState } from "react";

import MemberPhoto from "./MemberPhoto";

// ========== MEMBER PHOTO SIZE (edit these to change dimensions) ==========
const MEMBER_PHOTO_WIDTH = 240; // px
const MEMBER_PHOTO_HEIGHT = 300; // px
// =========================================================================





export default function TeamList({ teams }) {
  return (
    <div className="relative overflow-hidden">
      <div className="pointer-events-none absolute inset-0 opacity-60">
        <div className="absolute left-1/2 top-0 h-full w-px -translate-x-1/2 bg-gradient-to-b from-cyan-400/0 via-cyan-400/50 to-cyan-400/0" />
        <div className="absolute inset-x-0 top-24 h-px bg-gradient-to-r from-transparent via-cyan-400/35 to-transparent" />
      </div>
      <div className="flex flex-col gap-14 py-4 sm:gap-20 sm:py-8">
        {teams.map((team, i) =>
        <TeamRow key={team.slug} team={team} index={i} />
        )}
      </div>
    </div>);

}






function TeamRow({ team, index }) {
  const ref = useRef(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const obs = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setVisible(true);
          obs.unobserve(el);
        }
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
      className="mx-auto w-full max-w-6xl px-4 py-1 sm:px-8 sm:py-2">
      <div
        className={`mb-6 text-center transition-all duration-700 sm:mb-8 ${
        visible ?
        "opacity-100 translate-x-0" :
        "opacity-0 -translate-x-12"}`
        }
        style={{ transitionDelay: `${index * 50}ms` }}>

        <div className="mx-auto mb-3 h-px w-44 bg-gradient-to-r from-transparent via-cyan-300/70 to-transparent" />
        <h3 className="mb-2 text-2xl font-bold uppercase tracking-[0.22em] text-cyan-200 drop-shadow-[0_0_10px_rgba(34,211,238,0.45)] sm:text-3xl">{team.title}</h3>
        {team.description &&
        <p className="mx-auto max-w-2xl text-sm text-gray-300 sm:text-base">{team.description}</p>
        }
        <div className="mx-auto mt-3 h-px w-44 bg-gradient-to-r from-transparent via-cyan-300/40 to-transparent" />
      </div>

      <div
        className={`transition-all duration-700 ${
        visible ?
        "opacity-100 translate-x-0" :
        "opacity-0 translate-x-12"}`
        }
        style={{ transitionDelay: `${index * 50 + 100}ms` }}>
        <div className="mx-auto flex w-full flex-wrap items-start justify-center gap-6 sm:gap-8">
          {members.map((m, mi) =>
          <div
            key={m.id}
            className={`flex flex-col items-center transition-all duration-500 ${
            visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6"}`
            }
            style={{ transitionDelay: `${index * 50 + 180 + mi * 60}ms` }}>

              <MemberPhoto
            member={m}
            containerClassName="rounded-lg border border-cyan-300/70 bg-slate-950 shadow-[0_0_18px_rgba(34,211,238,0.35)]"
            containerStyle={{ width: MEMBER_PHOTO_WIDTH, height: MEMBER_PHOTO_HEIGHT }} />

              <span
            className="mt-2 max-w-full text-center text-xs font-medium text-cyan-50 sm:text-sm"
            style={{ maxWidth: MEMBER_PHOTO_WIDTH }}>

                {m.name}
              </span>
            </div>
          )}
        </div>
      </div>
    </div>);

}
