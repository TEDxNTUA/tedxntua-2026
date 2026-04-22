"use client";

import { useEffect, useRef, useState, useCallback, Fragment } from "react";
import { sponsorTiers } from "./sponsorsData";
import SponsorTierSection from "./components/SponsorTierSection";
import { withBasePath } from "../lib/basePath";

const assetPath = (path) => encodeURI(withBasePath(path));

const TIER_COLORS = {
  "Diamond": { main: "#22d3ee", glow: "rgba(34, 211, 238, 0.8)" },    // Cyan
  "Platinum": { main: "#93c5fd", glow: "rgba(147, 197, 253, 0.8)" },  // Light Blue
  "Grand": { main: "#facc15", glow: "rgba(250, 204, 21, 0.8)" },     // Gold
  "Partners": { main: "#4ade80", glow: "rgba(74, 222, 128, 0.8)" },  // Green
  "Supporters": { main: "#a1a1aa", glow: "rgba(161, 161, 170, 0.8)" } // Zinc
};

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
  const [formData, setFormData] = useState({ name: "", company: "", email: "", message: "" });
  const [status, setStatus] = useState("idle"); // idle, sending, success, error

  if (!isOpen) return null;

  const handleSubmit = async (e) => {
    e.preventDefault();
    setStatus("sending");

    // YOU MUST REPLACE 'YOUR_ACCESS_KEY_HERE' WITH YOUR ACTUAL KEY FROM WEB3FORMS.COM
    const accessKey = "a3e2b416-7bf0-4825-8572-ef284e7873e6"; 

    try {
      const response = await fetch("https://api.web3forms.com/submit", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
        },
        body: JSON.stringify({
          access_key: accessKey,
          from_name: "TEDxNTUA Sponsorship",
          subject: `Sponsorship Inquiry: ${formData.company}`,
          replyto: formData.email,
          name: formData.name,
          company: formData.company,
          email: formData.email,
          message: formData.message,
        }),
      });

      const result = await response.json();
      if (result.success) {
        setStatus("success");
        setTimeout(() => {
          onClose();
          setStatus("idle");
          setFormData({ name: "", company: "", email: "", message: "" });
        }, 2500);
      } else {
        setStatus("error");
      }
    } catch (error) {
      console.error("Submission error:", error);
      setStatus("error");
    }
  };

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
      <div 
        className="absolute inset-0 bg-black/80 backdrop-blur-sm transition-opacity"
        onClick={status === "sending" ? null : onClose}
      />
      <div className="relative w-full max-w-lg bg-zinc-900 border border-white/10 rounded-2xl p-8 shadow-2xl overflow-hidden">
        {/* Glow effect */}
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-64 h-64 bg-green-500/10 rounded-full blur-[80px] pointer-events-none" />
        
        <div className="relative z-10">
          <div className="flex justify-between items-center mb-6">
            <h3 className="text-2xl font-bold text-white">Partner with TEDxNTUA</h3>
            <button 
              onClick={onClose} 
              disabled={status === "sending"}
              className="text-white/50 hover:text-white transition-colors text-2xl disabled:opacity-0"
            >
              &times;
            </button>
          </div>
          
          {status === "success" ? (
            <div className="py-12 text-center space-y-4 animate-in fade-in zoom-in duration-300">
              <div className="w-16 h-16 bg-green-500/20 rounded-full flex items-center justify-center mx-auto border border-green-500/50">
                <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="#22c55e" strokeWidth="3">
                  <path d="M20 6L9 17L4 12" />
                </svg>
              </div>
              <h4 className="text-xl font-bold text-white">Message Sent!</h4>
              <p className="text-white/50">Our team will contact you shortly.</p>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="block text-xs uppercase tracking-widest text-white/40 mb-1">Full Name</label>
                <input 
                  required
                  type="text"
                  placeholder="Your Name"
                  className="w-full bg-white/5 border border-white/10 rounded-lg px-4 py-3 text-white focus:outline-none focus:border-green-500/50 transition-colors disabled:opacity-50"
                  value={formData.name}
                  disabled={status === "sending"}
                  onChange={e => setFormData({ ...formData, name: e.target.value })}
                />
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs uppercase tracking-widest text-white/40 mb-1">Company</label>
                  <input 
                    required
                    type="text"
                    placeholder="Organization"
                    className="w-full bg-white/5 border border-white/10 rounded-lg px-4 py-3 text-white focus:outline-none focus:border-green-500/50 transition-colors disabled:opacity-50"
                    value={formData.company}
                    disabled={status === "sending"}
                    onChange={e => setFormData({ ...formData, company: e.target.value })}
                  />
                </div>
                <div>
                  <label className="block text-xs uppercase tracking-widest text-white/40 mb-1">Email Address</label>
                  <input 
                    required
                    type="email"
                    placeholder="email@example.com"
                    className="w-full bg-white/5 border border-white/10 rounded-lg px-4 py-3 text-white focus:outline-none focus:border-green-500/50 transition-colors disabled:opacity-50"
                    value={formData.email}
                    disabled={status === "sending"}
                    onChange={e => setFormData({ ...formData, email: e.target.value })}
                  />
                </div>
              </div>
              <div>
                <label className="block text-xs uppercase tracking-widest text-white/40 mb-1">Message</label>
                <textarea 
                  required
                  rows="4"
                  placeholder="Tell us about your interest in sponsoring..."
                  className="w-full bg-white/5 border border-white/10 rounded-lg px-4 py-3 text-white focus:outline-none focus:border-green-500/50 transition-colors resize-none disabled:opacity-50"
                  value={formData.message}
                  disabled={status === "sending"}
                  onChange={e => setFormData({ ...formData, message: e.target.value })}
                />
              </div>
              
              {status === "error" && (
                <p className="text-red-500 text-xs text-center">Something went wrong. Please try again.</p>
              )}

              <button 
                type="submit"
                disabled={status === "sending"}
                className="w-full bg-white text-black font-bold py-4 rounded-lg hover:scale-[1.02] active:scale-[0.98] transition-all duration-300 mt-2 disabled:bg-white/20 disabled:text-white/30 disabled:cursor-not-allowed"
              >
                {status === "sending" ? "Sending Message..." : "Send Inquiry"}
              </button>
            </form>
          )}
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
      document.body.style.overflow = "unset";
    }

    const handleWheel = (e) => {
      if (isUnlocked) {
        // Only re-lock if we are at the very top and scrolling UP
        if (window.scrollY <= 0 && e.deltaY < 0) {
          setIsUnlocked(false);
          setProgress(0.99);
        }
        return; // Let native scroll happen
      }
      
      // If locked, prevent native scroll and update animation progress
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
      document.body.style.overflow = "unset";
    };
  }, [isUnlocked, updateProgress, reducedMotion]);

  return (
    <section className="relative min-h-screen bg-black text-white selection:bg-green-500/30 overflow-x-hidden">
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
            const tierColor = TIER_COLORS[marker.name] || { main: "#ffffff", glow: "rgba(255,255,255,0.5)" };

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
                <div 
                  className={`
                    w-2.5 h-2.5 rounded-full border-2 transition-all duration-500 cursor-help
                    ${isActive ? "scale-125" : "bg-zinc-900 border-white/20 hover:border-white/50"}
                  `} 
                  style={isActive ? {
                    backgroundColor: tierColor.main,
                    borderColor: tierColor.main,
                    boxShadow: `0 0 12px ${tierColor.glow}`
                  } : {}}
                />
                
                {/* Label */}
                <div 
                  className={`absolute right-full mr-4 top-1/2 -translate-y-1/2 px-2 py-1 rounded bg-black/80 border border-white/10 text-[10px] font-bold whitespace-nowrap transition-opacity pointer-events-none backdrop-blur-sm ${isActive ? "opacity-100" : "opacity-0 group-hover:opacity-100"}`}
                  style={{ color: tierColor.main }}
                >
                  {marker.name}
                </div>
              </div>
            );
          })}
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
          className={`container mx-auto px-4 sm:px-6 transition-all duration-1000 delay-100 ${isUnlocked ? "opacity-100 translate-y-0 pointer-events-auto" : "opacity-0 translate-y-20 pointer-events-none"}`}
        >
          <div className="space-y-20 sm:space-y-32">
            {sponsorTiers.map((tier, index) => (
              <Fragment key={tier.tier}>
                <SponsorTierSection
                  tier={tier}
                  index={index}
                />
              </Fragment>
            ))}
          </div>

          {/* Professional CTA Card - simplified to just the button */}
          <div className="mt-40 mb-32 flex justify-center">
            <button 
              onClick={() => setIsModalOpen(true)}
              className="group relative inline-flex items-center gap-4 px-10 py-4 rounded-full bg-white text-black font-black hover:scale-105 transition-all duration-300 shadow-xl shadow-white/5"
            >
              <span className="text-sm uppercase tracking-wider">Become a Sponsor / Get in contact with us</span>
              <div className="w-8 h-8 rounded-full bg-black flex items-center justify-center group-hover:translate-x-1 transition-transform">
                <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="3">
                  <path d="M5 12h14M12 5l7 7-7 7" />
                </svg>
              </div>
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}
