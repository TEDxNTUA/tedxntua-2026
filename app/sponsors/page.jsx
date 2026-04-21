"use client";

import { useEffect, useRef, useState, useCallback } from "react";
import { sponsorTiers } from "./sponsorsData";
import SponsorTierSection from "./components/SponsorTierSection";

// Refined Scroll reveal component for the thank you text
function ScrollRevealText({ progress, reducedMotion }) {
  const text = "With heartfelt gratitude to the sponsors who lift this stage, ignite bold ideas, and make TEDxNTUA 2026 possible.";
  const tedMark = "TEDxNTUA";
  const tedStart = text.indexOf(tedMark);
  const tedEnd = tedStart === -1 ? -1 : tedStart + tedMark.length;

  const visibleCharCount = reducedMotion ? text.length : Math.floor(progress * text.length * 1.15);

  return (
    <div className="max-w-4xl mx-auto text-center px-4 select-none">
      <p className="text-2xl sm:text-4xl md:text-5xl text-white leading-tight tracking-tight font-bold italic">
        {(() => {
          let cursor = 0;
          const renderChars = (segment, specialType = null) => {
            const parts = segment.split(/(\s+)/);
            const result = [];
            
            parts.forEach((part, partIdx) => {
              if (/\s+/.test(part)) {
                // Handle whitespace
                part.split("").forEach((char) => {
                  const index = cursor;
                  cursor += 1;
                  const isVisible = index < visibleCharCount;
                  result.push(
                    <span 
                      key={`space-${index}`} 
                      className="inline-block transition-opacity duration-500"
                      style={{ opacity: isVisible ? 1 : 0 }}
                    >
                      {"\u00A0"}
                    </span>
                  );
                });
              } else {
                // Handle words
                const wordStartIndex = cursor;
                const charElements = part.split("").map((char) => {
                  const index = cursor;
                  cursor += 1;
                  const isVisible = index < visibleCharCount;
                  
                  let specialClass = "";
                  if (specialType === "red") {
                    specialClass = "text-[#e62b1e] drop-shadow-[0_0_25px_rgba(230,43,30,0.5)] not-italic font-black";
                  } else if (specialType === "white") {
                    specialClass = "text-white drop-shadow-[0_0_20px_rgba(255,255,255,0.4)] not-italic font-black";
                  }

                  return (
                    <span
                      key={`char-${index}`}
                      className={`inline-block transition-all duration-700 ease-out ${specialClass}`}
                      style={{ 
                        opacity: isVisible ? 1 : 0,
                        filter: `blur(${isVisible ? 0 : 12}px)`,
                        transform: `translateY(${isVisible ? 0 : 20}px) scale(${isVisible ? 1 : 0.85})`,
                        transitionDelay: `${(index % 15) * 10}ms`
                      }}
                    >
                      {char}
                    </span>
                  );
                });

                result.push(
                  <span key={`word-${wordStartIndex}`} className="inline-block whitespace-nowrap">
                    {charElements}
                  </span>
                );
              }
            });
            return result;
          };

          if (tedStart === -1 || tedEnd === -1) return renderChars(text);

          const before = text.slice(0, tedStart);
          const branding = text.slice(tedStart, tedEnd); // "TEDxNTUA"
          const after = text.slice(tedEnd);

          const tedxPart = branding.slice(0, 4); // "TEDx"
          const ntuaPart = branding.slice(4); // "NTUA"

          return [
            ...renderChars(before),
            <span key="tedx-brand" className="inline-block whitespace-nowrap">
              {renderChars(tedxPart, "red")}
              {renderChars(ntuaPart, "white")}
            </span>,
            ...renderChars(after),
          ];
        })()}
      </p>
      
      {!reducedMotion && (
        <div 
          className="mt-12 flex flex-col items-center gap-3 transition-opacity duration-1000"
          style={{ opacity: progress < 0.1 ? 1 : Math.max(0, 1 - progress * 4) }}
        >
          <span className="text-green-500/40 text-[10px] font-black tracking-[0.4em] uppercase">Engage Scroll</span>
          <div className="w-px h-12 bg-gradient-to-b from-green-500/40 to-transparent animate-bounce" />
        </div>
      )}
    </div>
  );
}

export default function SponsorsPage() {
  const [reducedMotion, setReducedMotion] = useState(false);
  const [progress, setProgress] = useState(0);
  const [isUnlocked, setIsUnlocked] = useState(false);
  const touchStartY = useRef(null);

  useEffect(() => {
    const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
    setReducedMotion(mq?.matches || false);
  }, []);

  const updateProgress = useCallback((delta) => {
    if (isUnlocked) return;
    setProgress(prev => {
      const next = Math.min(Math.max(prev + delta * 0.0012, 0), 1);
      if (next >= 1) setIsUnlocked(true);
      return next;
    });
  }, [isUnlocked]);

  // Handle locking and unlocking
  useEffect(() => {
    if (reducedMotion) {
      setIsUnlocked(true);
      setProgress(1);
      return;
    }

    if (!isUnlocked) {
      document.body.style.overflow = "hidden";
      window.scrollTo(0, 0);
    } else {
      document.body.style.overflow = "auto";
    }

    const handleWheel = (e) => {
      if (isUnlocked) {
        if (window.scrollY <= 0 && e.deltaY < 0) {
          setIsUnlocked(false);
          setProgress(0.99);
        }
        return;
      }
      e.preventDefault();
      updateProgress(e.deltaY);
    };

    const handleTouchStart = (e) => {
      touchStartY.current = e.touches[0].clientY;
    };

    const handleTouchMove = (e) => {
      if (isUnlocked) return;
      if (touchStartY.current === null) return;
      
      const currentY = e.touches[0].clientY;
      const delta = touchStartY.current - currentY;
      e.preventDefault();
      updateProgress(delta * 2);
      touchStartY.current = currentY;
    };

    const handleKeyDown = (e) => {
      if (isUnlocked) return;
      const keys = ["ArrowDown", "ArrowUp", "Space", "PageDown", "PageUp"];
      if (keys.includes(e.code)) {
        e.preventDefault();
        const delta = (e.code === "ArrowUp" || e.code === "PageUp") ? -100 : 100;
        updateProgress(delta);
      }
    };

    window.addEventListener("wheel", handleWheel, { passive: false });
    window.addEventListener("touchstart", handleTouchStart);
    window.addEventListener("touchmove", handleTouchMove, { passive: false });
    window.addEventListener("keydown", handleKeyDown);

    return () => {
      window.removeEventListener("wheel", handleWheel);
      window.removeEventListener("touchstart", handleTouchStart);
      window.removeEventListener("touchmove", handleTouchMove);
      window.removeEventListener("keydown", handleKeyDown);
      document.body.style.overflow = "auto";
    };
  }, [isUnlocked, updateProgress, reducedMotion]);

  return (
    <section className="min-h-screen bg-black text-white selection:bg-green-500/30 overflow-x-hidden">
      {/* Dynamic background */}
      <div className="fixed inset-0 pointer-events-none z-0">
        <div 
          className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[800px] bg-green-500/5 rounded-full filter blur-[160px] transition-opacity duration-1000"
          style={{ opacity: 0.3 + progress * 0.7 }}
        />
        <div className="absolute inset-0 opacity-[0.02] bg-[radial-gradient(#22c55e_1px,transparent_1px)] bg-[length:40px_40px]" />
      </div>

      <div className="relative z-10">
        {/* Reveal Section - Higher and more compact */}
        <div className={`flex flex-col items-center justify-center transition-all duration-1000 ${isUnlocked ? "min-h-[60vh] pt-24" : "h-screen"}`}>
          <ScrollRevealText progress={progress} reducedMotion={reducedMotion} />
        </div>

        {/* Sponsors Grid - Closer to reveal text */}
        <div 
          className={`container mx-auto px-4 sm:px-6 transition-all duration-1000 delay-100 ${isUnlocked ? "opacity-100 translate-y-0" : "opacity-0 translate-y-20 pointer-events-none"}`}
        >
          <div className="space-y-20 sm:space-y-32">
            {sponsorTiers.map((tier, index) => (
              <SponsorTierSection
                key={tier.tier}
                tier={tier}
                index={index}
              />
            ))}
          </div>

          {/* Minimal CTA */}
          <div className="mt-32 mb-20 text-center pt-16 border-t border-green-500/10">
            <button className="group relative inline-flex items-center gap-3 px-8 py-3 rounded-full bg-white text-black font-bold hover:scale-105 transition-transform duration-300">
              <span className="text-sm uppercase tracking-tighter">Become a Sponsor</span>
              <span className="text-xl group-hover:rotate-12 transition-transform">🤝</span>
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}
