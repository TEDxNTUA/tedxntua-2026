"use client";

import React, { useEffect, useRef, useState } from "react";
import { Team } from "../teamsData";
import SmoothImage from "./SmoothImage";
import collectiveImages from "../collectiveImages";
import MemberPhoto from "./MemberPhoto";

type Props = {
  team: Team;
  index?: number;
};

export default function TeamCard({ team, index = 0 }: Props) {
  const ref = useRef<HTMLDivElement | null>(null);
  const [visible, setVisible] = useState(false);
  const [reducedMotion, setReducedMotion] = useState(false);

  useEffect(() => {
    const mq = window.matchMedia && window.matchMedia("(prefers-reduced-motion: reduce)");
    if (mq) setReducedMotion(mq.matches);
  }, []);

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
      { threshold: 0.12 }
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, []);

  const images = team.heroImages && team.heroImages.length > 0 ? team.heroImages : collectiveImages;
  const members = team.members || [];

  return (
    <div
      ref={ref}
      style={{ transitionDelay: `${index * 80}ms` }}
      className={`border rounded-lg p-4 shadow-sm flex flex-col sm:flex-row gap-4 items-center transform transition-opacity transition-transform duration-700 ${
        visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6"
      }`}
    >
      <div className="w-full sm:w-40 h-28 rounded overflow-hidden flex-shrink-0 bg-gray-50">
        <div className="flex w-full h-full">
          {images.slice(0, 3).map((src, i) => (
            <SmoothImage
              key={src + i}
              src={src}
              alt={`${team.title} ${i + 1}`}
              loading="eager"
              className={`object-cover h-full ${i === 0 ? "flex-1" : "w-1/3"} transition-transform transition-opacity duration-600 ${
                visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-3"
              }`}
              style={{
                objectPosition: "50% 12%",
                transitionDelay: reducedMotion ? "0ms" : `${index * 80 + i * 60}ms`
              }}
            />
          ))}
        </div>
      </div>

      <div className="flex-1">
        <h3 className="text-xl font-semibold">{team.title}</h3>
        {team.description && <p className="text-sm text-gray-600">{team.description}</p>}
      </div>

      <div className="self-stretch flex items-center">
        <div className="ml-auto w-full sm:w-auto">
          <div className="flex flex-col gap-3">
            {members.map((m, i) => (
              <div
                key={m.id}
                className={`flex items-center gap-3 rounded p-1 transition-opacity transition-transform duration-600 ${
                  visible ? "opacity-100 translate-x-0" : "opacity-0 -translate-x-4"
                }`}
                style={{ transitionDelay: reducedMotion ? "0ms" : `${index * 80 + i * 60}ms` }}
              >
                <MemberPhoto
                  member={m}
                  containerClassName="w-[72px] h-[72px] sm:w-20 sm:h-20 rounded-full bg-gray-100 flex-shrink-0"
                />
                <div className="text-left">
                  <div className="font-medium text-base">{m.name}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
