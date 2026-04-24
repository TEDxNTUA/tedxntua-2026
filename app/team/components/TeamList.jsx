"use client";

import { useEffect, useRef, useState } from "react";

import MemberPhoto from "./MemberPhoto";


export default function TeamList({ teams }) {
  return (
    <div className="relative overflow-hidden">
      <div className="pointer-events-none absolute inset-0 opacity-60">
        <div className="absolute left-1/2 top-0 h-full w-px -translate-x-1/2 bg-gradient-to-b from-rose-400/0 via-rose-400/50 to-rose-400/0" />
        <div className="absolute inset-x-0 top-24 h-px bg-gradient-to-r from-transparent via-rose-400/35 to-transparent" />
      </div>
      <div className="flex flex-col gap-14 py-4 sm:gap-20 sm:py-8 lg:gap-48 lg:py-16 pb-48 sm:pb-64 lg:pb-80">
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
      id={`team-${team.slug}`}
      ref={ref}
      className="mx-auto w-full max-w-6xl px-4 py-1 sm:px-8 sm:py-2 lg:pb-48 scroll-mt-32">
      <div
        className={`mb-6 text-center transition-all duration-700 sm:mb-8 ${
        visible ?
        "opacity-100 translate-x-0" :
        "opacity-0 -translate-x-12"}`
        }
        style={{ transitionDelay: `${index * 50}ms` }}>

        <div className="mx-auto mb-3 h-px w-44 bg-gradient-to-r from-transparent via-rose-300/70 to-transparent" />
        <h3 className="mb-2 text-2xl font-bold uppercase tracking-[0.22em] text-rose-200 drop-shadow-[0_0_10px_rgba(244,63,94,0.45)] sm:text-3xl">{team.title}</h3>
        {/* {
        // team.description &&
        <p className="mx-auto max-w-2xl text-sm text-gray-300 sm:text-base">{team.description}</p>
        } */}
        <div className="mx-auto mt-3 h-px w-44 bg-gradient-to-r from-transparent via-rose-300/40 to-transparent" />
      </div>

      <div
        className={`transition-all duration-700 ${
        visible ?
        "opacity-100 translate-x-0" :
        "opacity-0 translate-x-12"}`
        }
        style={{ transitionDelay: `${index * 50 + 100}ms` }}>
        <div className="mx-auto flex w-full flex-wrap items-start justify-center gap-x-8 gap-y-20 sm:gap-8 lg:gap-12">
          {members.map((m, mi) =>
          <div
            key={m.id}
            className={`flex flex-col items-center transition-all duration-500 w-36 sm:w-60 ${
            visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6"}`
            }
            style={{ transitionDelay: `${index * 50 + 180 + mi * 60}ms` }}>

              <MemberPhoto
            member={m}
            containerClassName="rounded-lg border border-rose-300/70 bg-slate-950 shadow-[0_0_18px_rgba(244,63,94,0.35)] w-full h-48 sm:h-80"
            containerStyle={{}} />

              <div
            className="mt-3 w-full text-center text-[11px] sm:text-sm font-bold uppercase tracking-tight sm:tracking-widest text-rose-50/90 leading-tight px-1"
            style={{}}>
                {m.name.split(' ').map((part, pi, arr) => (
                  <span key={pi} className="block sm:inline">
                    {part}{pi < arr.length - 1 ? <span className="hidden sm:inline">&nbsp;</span> : ""}
                  </span>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>);

}
