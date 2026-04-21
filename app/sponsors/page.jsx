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

// Professional Modal for Sponsor Contact
function SponsorModal({ isOpen, onClose }) {
  const [formData, setFormData] = useState({ name: "", company: "", message: "" });

  if (!isOpen) return null;

  const handleSubmit = (e) => {
    e.preventDefault();
    const recipients = "tedxntua.developers@gmail.com,tedxntua.fundraising@gmail.com,tedxntua@gmail.com";
    const subject = encodeURIComponent(`Sponsorship Inquiry: ${formData.company}`);
    const body = encodeURIComponent(`Name: ${formData.name}\nCompany: ${formData.company}\n\nMessage:\n${formData.message}`);
    window.location.href = `mailto:${recipients}?subject=${subject}&body=${body}`;
    onClose();
  };

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
      <div 
        className="absolute inset-0 bg-black/80 backdrop-blur-sm transition-opacity"
        onClick={onClose}
      />
      <div className="relative w-full max-w-lg bg-zinc-900 border border-white/10 rounded-2xl p-8 shadow-2xl overflow-hidden">
        {/* Glow effect */}
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-64 h-64 bg-green-500/10 rounded-full blur-[80px] pointer-events-none" />
        
        <div className="relative z-10">
          <div className="flex justify-between items-center mb-6">
            <h3 className="text-2xl font-bold text-white">Partner with TEDxNTUA</h3>
            <button onClick={onClose} className="text-white/50 hover:text-white transition-colors text-2xl">&times;</button>
          </div>
          
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block text-xs uppercase tracking-widest text-white/40 mb-1">Full Name</label>
              <input 
                required
                type="text"
                className="w-full bg-white/5 border border-white/10 rounded-lg px-4 py-3 text-white focus:outline-none focus:border-green-500/50 transition-colors"
                value={formData.name}
                onChange={e => setFormData({ ...formData, name: e.target.value })}
              />
            </div>
            <div>
              <label className="block text-xs uppercase tracking-widest text-white/40 mb-1">Company / Organization</label>
              <input 
                required
                type="text"
                className="w-full bg-white/5 border border-white/10 rounded-lg px-4 py-3 text-white focus:outline-none focus:border-green-500/50 transition-colors"
                value={formData.company}
                onChange={e => setFormData({ ...formData, company: e.target.value })}
              />
            </div>
            <div>
              <label className="block text-xs uppercase tracking-widest text-white/40 mb-1">Message</label>
              <textarea 
                required
                rows="4"
                className="w-full bg-white/5 border border-white/10 rounded-lg px-4 py-3 text-white focus:outline-none focus:border-green-500/50 transition-colors resize-none"
                value={formData.message}
                onChange={e => setFormData({ ...formData, message: e.target.value })}
              />
            </div>
            <button 
              type="submit"
              className="w-full bg-white text-black font-bold py-4 rounded-lg hover:scale-[1.02] active:scale-[0.98] transition-all duration-300 mt-2"
            >
              Send Inquiry
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}

export default function SponsorsPage() {
  const [reducedMotion, setReducedMotion] = useState(false);
  const [progress, setProgress] = useState(0);
  const [isUnlocked, setIsUnlocked] = useState(false);
  const [windowScrollProgress, setWindowScrollProgress] = useState(0);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [sectionMarkers, setSectionMarkers] = useState([]);
  const touchStartY = useRef(null);

  useEffect(() => {
    if (!isUnlocked) return;
    
    const calculateMarkers = () => {
      const sections = document.querySelectorAll(".sponsor-tier-section");
      const totalHeight = document.body.scrollHeight - window.innerHeight;
      if (totalHeight <= 0) return;
      
      const markers = Array.from(sections).map(section => {
        const rect = section.getBoundingClientRect();
        const absoluteTop = rect.top + window.scrollY;
        return {
          percent: absoluteTop / totalHeight,
          name: section.getAttribute("data-tier")
        };
      });
      setSectionMarkers(markers);
    };

    // Small delay to ensure layout is settled
    const timer = setTimeout(calculateMarkers, 500);
    window.addEventListener("resize", calculateMarkers);
    return () => {
      clearTimeout(timer);
      window.removeEventListener("resize", calculateMarkers);
    };
  }, [isUnlocked]);

  useEffect(() => {
    const handleScroll = () => {
      if (!isUnlocked) return;
      const totalHeight = document.body.scrollHeight - window.innerHeight;
      if (totalHeight <= 0) return;
      setWindowScrollProgress(window.scrollY / totalHeight);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, [isUnlocked]);

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
      const scrollbarWidth = window.innerWidth - document.documentElement.clientWidth;
      document.body.style.paddingRight = `${scrollbarWidth}px`;
      document.body.style.overflow = "hidden";
      window.scrollTo(0, 0);
    } else {
      document.body.style.paddingRight = "";
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
      document.body.style.paddingRight = "";
      document.body.style.overflow = "auto";
    };
  }, [isUnlocked, updateProgress, reducedMotion]);

  return (
    <section className="min-h-screen bg-black text-white selection:bg-green-500/30 overflow-x-hidden">
      {/* Enhanced Scroll Progress Bar (Vertical Right) */}
      <div className={`fixed right-6 top-1/2 -translate-y-1/2 flex flex-col items-center gap-4 z-50 transition-all duration-700 ${isUnlocked ? "opacity-100 translate-x-0" : "opacity-0 translate-x-10"}`}>
        <div className="relative w-[3px] h-64 bg-white/5 rounded-full overflow-visible">
          {/* Background Track Glow */}
          <div className="absolute inset-0 bg-green-500/5 blur-[2px] rounded-full" />
          
          {/* Fill */}
          <div 
            className="absolute top-0 w-full bg-gradient-to-b from-green-400 via-green-500 to-emerald-600 rounded-full transition-all duration-300 ease-out shadow-[0_0_15px_rgba(34,197,94,0.4)]"
            style={{ height: `${windowScrollProgress * 100}%` }}
          />

          {/* Section Markers (Bullets) */}
          {sectionMarkers.map((marker, i) => {
            const isActive = windowScrollProgress >= marker.percent - 0.01;
            return (
              <div 
                key={i}
                className="absolute left-1/2 -translate-x-1/2 group cursor-pointer"
                style={{ top: `${marker.percent * 100}%` }}
                onClick={() => {
                  const sections = document.querySelectorAll(".sponsor-tier-section");
                  sections[i]?.scrollIntoView({ behavior: "smooth" });
                }}
              >
                {/* Bullet */}
                <div className={`
                  w-2 h-2 rounded-full border-2 transition-all duration-500 cursor-help
                  ${isActive 
                    ? "bg-green-500 border-green-400 scale-125 shadow-[0_0_10px_rgba(34,197,94,0.8)]" 
                    : "bg-zinc-900 border-white/20 hover:border-white/50"
                  }
                `} />
                
                {/* Label */}
                <div className="absolute right-full mr-4 top-1/2 -translate-y-1/2 px-2 py-1 rounded bg-black/80 border border-white/10 text-[10px] font-bold text-white whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none backdrop-blur-sm">
                  {marker.name}
                </div>
              </div>
            );
          })}
        </div>
        
        <div className="whitespace-nowrap text-[9px] font-black text-white/20 tracking-[0.3em] uppercase vertical-text mt-2">
          Navigation
        </div>
      </div>

      {/* Sponsor Modal */}
      <SponsorModal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} />

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
        <div className={`flex flex-col items-center justify-center transition-all duration-1000 ease-in-out ${isUnlocked ? "min-h-[60vh] pt-24" : "min-h-[100vh]"}`}>
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

          {/* Professional CTA Card */}
          <div className="mt-40 mb-32 flex justify-center">
            <div className="relative group w-full max-w-2xl">
              {/* Subtle background glow */}
              <div className="absolute -inset-1 bg-gradient-to-r from-green-500/20 to-emerald-500/20 rounded-2xl blur opacity-25 group-hover:opacity-50 transition duration-1000 group-hover:duration-200" />
              
              <div className="relative flex flex-col items-center p-12 bg-zinc-900/50 backdrop-blur-xl border border-white/10 rounded-2xl text-center">
                <span className="inline-block px-4 py-1.5 mb-6 rounded-full bg-green-500/10 text-green-400 text-[10px] font-black uppercase tracking-[0.3em] border border-green-500/20">
                  Opportunities
                </span>
                <h2 className="text-3xl sm:text-4xl font-bold mb-4 tracking-tight">
                  Fuel the Future of <span className="text-red-600">TEDx</span>NTUA
                </h2>
                <p className="max-w-md text-white/50 text-sm leading-relaxed mb-10">
                  Join our community of visionaries and help us amplify ideas that matter. 
                  Let's create something extraordinary together.
                </p>
                
                <button 
                  onClick={() => setIsModalOpen(true)}
                  className="group relative inline-flex items-center gap-4 px-10 py-4 rounded-full bg-white text-black font-black hover:scale-105 transition-all duration-300 shadow-xl shadow-white/5"
                >
                  <span className="text-sm uppercase tracking-wider">Become a Sponsor</span>
                  <div className="w-8 h-8 rounded-full bg-black flex items-center justify-center group-hover:translate-x-1 transition-transform">
                    <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="3">
                      <path d="M5 12h14M12 5l7 7-7 7" />
                    </svg>
                  </div>
                </button>
                
                <div className="mt-12 flex items-center gap-8 opacity-30 grayscale transition-all duration-500 group-hover:opacity-60 group-hover:grayscale-0">
                  <span className="text-[10px] font-bold tracking-widest uppercase">Trusted by</span>
                  <div className="flex gap-4">
                    <div className="w-2 h-2 rounded-full bg-white" />
                    <div className="w-2 h-2 rounded-full bg-white/50" />
                    <div className="w-2 h-2 rounded-full bg-white/20" />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
