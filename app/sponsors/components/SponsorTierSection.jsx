"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import localFont from "next/font/local";
import ScrollRevealText from "../../components/ScrollRevealText";

const copixelDisplay = localFont({
  src: "../../../Copixel-Futuristic-Font/Fonts/Copixel-Display.otf",
  display: "swap",
});

export default function SponsorTierSection({ tier, index }) {
  const ref = useRef(null);
  const [visible, setVisible] = useState(false);
  const [reducedMotion, setReducedMotion] = useState(false);
  const [headerProgress, setHeaderProgress] = useState(0);

  useEffect(() => {
    const mq = window.matchMedia && window.matchMedia("(prefers-reduced-motion: reduce)");
    if (mq) setReducedMotion(mq.matches);
  }, []);

  useEffect(() => {
    const handleScroll = () => {
      if (!ref.current) return;
      const rect = ref.current.getBoundingClientRect();
      const vh = window.innerHeight;
      
      // Individual reveal for each tier header as it enters view
      const start = vh * 0.95;
      const end = vh * 0.75;
      const current = rect.top;
      
      const p = Math.min(Math.max((start - current) / (start - end), 0), 1);
      setHeaderProgress(p);
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener("scroll", handleScroll);
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
        return "from-gray-100/95 to-gray-50/90";
      case "Platinum":
        return "from-gray-100/90 to-gray-50/85";
      case "Grand":
        return "from-gray-50/85 to-gray-100/80";
      default:
        return "from-gray-50/80 to-gray-100/75";
    }
  };

  const getBorderColor = () => {
    switch (tier.tier) {
      case "Diamond":
        return "border-gray-400/70";
      case "Platinum":
        return "border-gray-400/60";
      case "Grand":
        return "border-gray-300/50";
      default:
        return "border-gray-300/40";
    }
  };

  const getTierColor = () => {
    switch (tier.tier) {
      case "Diamond":
        return "from-cyan-400 to-cyan-500";
      case "Platinum":
        return "from-blue-300 to-blue-400";
      case "Grand":
        return "from-yellow-400 to-yellow-500";
      case "Partners":
        return "from-green-400 to-green-500";
      case "Supporters":
        return "from-zinc-400 to-zinc-500";
      default:
        return "from-green-400 to-green-500";
    }
  };

  const getTierColorHex = () => {
    switch (tier.tier) {
      case "Diamond": return "#22d3ee";
      case "Platinum": return "#93c5fd";
      case "Grand": return "#facc15";
      case "Partners": return "#4ade80";
      case "Supporters": return "#a1a1aa";
      default: return "#22c55e";
    }
  };

  return (
    <div
      ref={ref}
      data-tier={tier.tier}
      style={{ transitionDelay: reducedMotion ? "0ms" : `${index * 100}ms` }}
      className={`
        sponsor-tier-section transform transition-all duration-700
        ${visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"}
      `}
    >
      {/* Tier Header */}
      <div className={`mb-10 text-center ${index === 0 ? "mb-12" : ""}`}>
        <div className="flex flex-col items-center justify-center gap-2">
          <span 
            className="text-[10px] font-black uppercase tracking-[0.4em] mb-1"
            style={{ color: getTierColorHex() }}
          >
            Tier Excellence
          </span>
          <ScrollRevealText
            text={tier.tier}
            progress={headerProgress}
            reducedMotion={reducedMotion}
            className={`text-4xl sm:text-5xl font-black tracking-tighter uppercase italic ${copixelDisplay.className} bg-gradient-to-r ${getTierColor()} bg-clip-text text-transparent`}
            colorMode="inherit"
            stagger={0}
          />
          <div 
            className="h-1 w-12 rounded-full mt-4 transition-all duration-1000"
            style={{ 
              backgroundColor: getTierColorHex(),
              width: headerProgress > 0.5 ? "48px" : "0px",
              opacity: headerProgress > 0.5 ? 1 : 0
            }}
          />
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
        <div 
          className="my-16 sm:my-20 h-px w-full max-w-lg mx-auto"
          style={{ 
            background: `linear-gradient(to right, transparent, ${getTierColorHex()}44, transparent)` 
          }}
        />
      )}
    </div>
  );
}
