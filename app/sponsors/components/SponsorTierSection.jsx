"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";

export default function SponsorTierSection({ tier, index }) {
  const ref = useRef(null);
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
      { threshold: 0.1 }
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, []);

  const getSizeClasses = () => {
    switch (tier.tier) {
      case "Diamond":
        return "lg:col-span-2";
      case "Platinum":
        return "lg:col-span-2";
      default:
        return "";
    }
  };

  const getPaddingLevel = () => {
    switch (tier.tier) {
      case "Diamond":
        return "p-6 sm:p-8";
      case "Platinum":
        return "p-5 sm:p-7";
      case "Grand":
        return "p-4 sm:p-6";
      default:
        return "p-4 sm:p-5";
    }
  };

  const getGradientColor = () => {
    switch (tier.tier) {
      case "Diamond":
        return "from-green-500/20 to-green-600/10";
      case "Platinum":
        return "from-green-500/15 to-green-600/8";
      case "Grand":
        return "from-green-500/10 to-green-600/5";
      default:
        return "from-green-500/8 to-green-600/3";
    }
  };

  const getBorderColor = () => {
    switch (tier.tier) {
      case "Diamond":
        return "border-green-500/60";
      case "Platinum":
        return "border-green-500/50";
      case "Grand":
        return "border-green-500/40";
      default:
        return "border-green-500/25";
    }
  };

  return (
    <div
      ref={ref}
      style={{ transitionDelay: reducedMotion ? "0ms" : `${index * 100}ms` }}
      className={`
        transform transition-all duration-700
        ${visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"}
      `}
    >
      {/* Tier Header */}
      <div className={`mb-6 text-center ${index === 0 ? "mb-8" : ""}`}>
        <div className="flex items-center justify-center gap-3 mb-2">
          <span className="text-4xl">{tier.icon}</span>
          <h2 className="text-3xl sm:text-4xl font-bold bg-gradient-to-r from-green-400 to-green-500 bg-clip-text text-transparent">
            {tier.tier}
          </h2>
        </div>
      </div>

      {/* Sponsors Grid */}
      <div
        className={`
          flex flex-wrap justify-center gap-6 sm:gap-8
          ${getSizeClasses()}
        `}
      >
        {tier.sponsors.map((sponsor, i) => (
          <a
            href={sponsor.link || "#"}
            target="_blank"
            rel="noopener noreferrer"
            key={`${tier.tier}-${i}`}
            style={{
              transitionDelay: reducedMotion ? "0ms" : `${index * 100 + i * 40}ms`
            }}
            className={`
              group relative w-40 sm:w-48 flex flex-col items-center
              transform transition-all duration-500
              ${visible 
                ? "opacity-100 scale-100" 
                : "opacity-0 scale-95"
              }
              cursor-pointer
            `}
          >
            {/* Card Container */}
            <div
              className={`
                relative overflow-hidden rounded-lg
                border transition-all duration-500 w-full
                flex flex-col items-center justify-center
                ${getBorderColor()}
                hover:border-green-400/80 hover:shadow-lg hover:shadow-green-500/20
                bg-gradient-to-br ${getGradientColor()}
                backdrop-blur-md
                p-4 sm:p-5
                aspect-square
              `}
            >
              {/* Animated background glow */}
              <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500">
                <div className="absolute -inset-full bg-gradient-to-r from-green-500/20 via-transparent to-green-500/20 animate-pulse" />
              </div>

              {/* Logo Image */}
              <div className="relative z-10 w-full h-full flex items-center justify-center">
                <div className="relative w-full h-full flex items-center justify-center px-2">
                  <img
                    src={sponsor.logo}
                    alt={sponsor.name}
                    className="max-w-full max-h-full object-contain drop-shadow-lg group-hover:scale-110 transition-transform duration-300"
                    onError={(e) => {
                      e.target.style.display = 'none';
                      if (e.target.nextElementSibling) {
                        e.target.nextElementSibling.style.display = 'flex';
                      }
                    }}
                  />
                  {/* Fallback text if image fails */}
                  <div
                    style={{ display: 'none' }}
                    className="absolute inset-0 flex items-center justify-center group-hover:text-green-300 transition-colors duration-300"
                  >
                    <p className="text-xs sm:text-sm font-bold text-center text-white px-2">
                      {sponsor.name}
                    </p>
                  </div>
                </div>
              </div>

              {/* Gradient line at bottom */}
              <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-green-500/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
            </div>

            {/* Company Name Below */}
            <p className="mt-3 text-center text-sm sm:text-base font-semibold text-white group-hover:text-green-300 transition-colors duration-300 px-2 min-h-[2.5rem] flex items-center justify-center">
              {sponsor.name}
            </p>
          </a>
        ))}
      </div>

      {/* Separator line between tiers */}
      {index < 4 && (
        <div className="my-10 sm:my-12 h-px bg-gradient-to-r from-transparent via-green-500/30 to-transparent" />
      )}
    </div>
  );
}
