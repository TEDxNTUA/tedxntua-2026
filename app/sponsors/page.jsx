"use client";

import { useEffect, useRef, useState, useCallback, Fragment } from "react";
import { sponsorTiers } from "./sponsorsData";
import SponsorTierSection from "./components/SponsorTierSection";
import { withBasePath } from "../lib/basePath";
import localFont from "next/font/local";

const copixelDisplay = localFont({
  src: "../../Copixel-Futuristic-Font/Fonts/Copixel-Display.otf",
  display: "swap",
});

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
  const text = "You help us at every step of the cycle.";
  const totalLength = text.length;
  const halfPoint = Math.floor(totalLength / 2);

  const visibleCharCount = reducedMotion ? text.length : Math.floor(progress * text.length * 1.15);

  return (
    <div className={`max-w-4xl mx-auto text-center px-4 select-none ${copixelDisplay.className}`}>
      <p className="text-3xl sm:text-5xl md:text-6xl text-white leading-tight tracking-[0.1em] font-black italic uppercase">
        {(() => {
          let cursor = 0;
          const parts = text.split(/(\s+)/);
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
                    className="inline-block"
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
                
                // Half white, half red logic
                const isRed = index >= halfPoint;
                const baseColorClass = isRed ? "text-red-600" : "text-white";
                const glowClass = isRed 
                  ? "drop-shadow-[0_0_25px_rgba(220,38,38,0.6)]" 
                  : "drop-shadow-[0_0_20px_rgba(255,255,255,0.4)]";

                return (
                  <span
                    key={`char-${index}`}
                    className={`inline-block transition-all duration-700 ease-[cubic-bezier(0.23,1,0.32,1)] ${baseColorClass} ${glowClass}`}
                    style={{ 
                      opacity: isVisible ? 1 : 0,
                      filter: `blur(${isVisible ? 0 : 15}px)`,
                      transform: `
                        translateY(${isVisible ? 0 : 30}px) 
                        scale(${isVisible ? 1 : 0.7}) 
                        rotateX(${isVisible ? 0 : 80}deg)
                        rotateY(${isVisible ? 0 : 20}deg)
                      `,
                      transitionDelay: `${(index % 20) * 15}ms`
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
        })()}
      </p>
      
      {!reducedMotion && (
        <div 
          className="mt-16 flex flex-col items-center gap-4 transition-opacity duration-1000"
          style={{ opacity: progress < 0.1 ? 1 : Math.max(0, 1 - progress * 4) }}
        >
          <span className="text-green-500/50 text-[11px] font-black tracking-[0.5em] uppercase">Initialize Sequence</span>
          <div className="w-px h-16 bg-gradient-to-b from-green-500/50 via-green-500/20 to-transparent animate-bounce" />
        </div>
      )}
    </div>
  );
}


// Professional Modal for Sponsor Contact
function SponsorModal({ isOpen, onClose }) {
  const [formData, setFormData] = useState({ name: "", company: "", email: "", message: "" });
  const [status, setStatus] = useState("idle"); // idle, sending, success, error

  const [errorMessage, setErrorMessage] = useState("");

  if (!isOpen) return null;

  const handleSubmit = async (e) => {
    e.preventDefault();
    setStatus("sending");
    setErrorMessage("");

    const submissionData = new FormData();
    submissionData.append("access_key", "a3e2b416-7bf0-4825-8572-ef284e7873e6");
    submissionData.append("name", formData.name);
    submissionData.append("company", formData.company);
    submissionData.append("email", formData.email);
    submissionData.append("message", formData.message);
    submissionData.append("from_name", "TEDxNTUA Sponsorship");
    submissionData.append("subject", `Sponsorship Inquiry from ${formData.company || formData.name}`);

    try {
      const response = await fetch("https://api.web3forms.com/submit", {
        method: "POST",
        headers: {
          "Accept": "application/json"
        },
        body: submissionData
      });

      const result = await response.json();
      if (response.ok && result.success) {
        setStatus("success");
        setTimeout(() => {
          onClose();
          setStatus("idle");
          setFormData({ name: "", company: "", email: "", message: "" });
        }, 2500);
      } else {
        setErrorMessage(result.message || "Submission failed");
        setStatus("error");
      }
    } catch (error) {
      setErrorMessage("Network error. Please try again.");
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
          <div className="flex justify-between items-start mb-6 gap-4">
            <h3 className="text-xl sm:text-2xl font-bold text-white leading-tight">Partner with TEDxNTUA</h3>
            <button 
              onClick={onClose} 
              disabled={status === "sending"}
              className="flex-shrink-0 w-12 h-12 flex items-center justify-center rounded-full bg-white/5 border border-white/10 text-white/50 hover:text-white hover:bg-white/10 transition-all text-2xl disabled:opacity-0"
              aria-label="Close modal"
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
                  name="name"
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
                    name="company"
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
                    name="email"
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
                  name="message"
                  placeholder="Tell us about your interest in sponsoring..."
                  className="w-full bg-white/5 border border-white/10 rounded-lg px-4 py-3 text-white focus:outline-none focus:border-green-500/50 transition-colors resize-none disabled:opacity-50"
                  value={formData.message}
                  disabled={status === "sending"}
                  onChange={e => setFormData({ ...formData, message: e.target.value })}
                />
              </div>
              
              {status === "error" && (
                <p className="text-red-500 text-xs text-center">{errorMessage}</p>
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
  const [activeSection, setActiveSection] = useState(null);

  // Sync scroll to animation progress
  useEffect(() => {
    if (reducedMotion) {
      setProgress(1);
      setIsUnlocked(true);
      return;
    }

    const handleScroll = () => {
      const vh = window.innerHeight;
      const scrollY = window.scrollY;
      
      // dedicated scroll distance for animation - text fully reveals at 1.0vh
      const scrollDistance = vh * 1.0;
      const revealProgress = Math.min(scrollY / scrollDistance, 1);
      setProgress(revealProgress);
      
      // Determine if we've scrolled enough to "unlock" the sponsors visuals
      // Threshold increased to match the dwell time
      const unlocked = scrollY > vh * 0.6;
      if (unlocked !== isUnlocked) {
        setIsUnlocked(unlocked);
      }

      // Sidebar progress tracking
      const totalHeight = document.documentElement.scrollHeight - vh;
      if (totalHeight > 0) {
        setWindowScrollProgress(scrollY / totalHeight);
      }
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    handleScroll(); // Initial check
    return () => window.removeEventListener("scroll", handleScroll);
  }, [reducedMotion, isUnlocked]);

  // Markers and Observer
  useEffect(() => {
    const calculateMarkers = () => {
      const sections = document.querySelectorAll(".sponsor-tier-section");
      const totalHeight = document.documentElement.scrollHeight - window.innerHeight;
      if (totalHeight <= 0) return;
      
      const markers = Array.from(sections).map(section => {
        const rect = section.getBoundingClientRect();
        const absoluteTop = rect.top + window.scrollY;
        return {
          percent: Math.min(Math.max(absoluteTop / totalHeight, 0), 1),
          name: section.getAttribute("data-tier")
        };
      });
      setSectionMarkers(markers);
    };

    const observerOptions = {
      root: null,
      rootMargin: "-20% 0px -70% 0px",
      threshold: 0
    };

    const observerCallback = (entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          setActiveSection(entry.target.getAttribute("data-tier"));
        }
      });
    };

    const observer = new IntersectionObserver(observerCallback, observerOptions);
    const sections = document.querySelectorAll(".sponsor-tier-section");
    sections.forEach(section => observer.observe(section));

    const timer = setTimeout(calculateMarkers, 1000);
    window.addEventListener("resize", calculateMarkers);
    
    return () => {
      clearTimeout(timer);
      window.removeEventListener("resize", calculateMarkers);
      observer.disconnect();
    };
  }, []);

  useEffect(() => {
    const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
    setReducedMotion(mq?.matches || false);
  }, []);

  const scrollToSection = (index) => {
    const sections = document.querySelectorAll(".sponsor-tier-section");
    if (sections[index]) {
      const offset = 160;
      const elementPosition = sections[index].getBoundingClientRect().top + window.scrollY;
      window.scrollTo({
        top: elementPosition - offset,
        behavior: "smooth"
      });
    }
  };

  return (
    <section className="relative min-h-screen bg-black text-white selection:bg-green-500/30">
      {/* Professional Sponsors Navigation Pill */}
      <div className={`fixed bottom-8 left-1/2 -translate-x-1/2 z-50 transition-all duration-700 ${isUnlocked ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"}`}>
        <div className="flex items-center gap-1 sm:gap-2 rounded-full border border-white/10 bg-black/80 p-1.5 sm:p-2 backdrop-blur-2xl shadow-[0_20px_50px_rgba(0,0,0,0.5)]">
          {sectionMarkers.map((marker, i) => {
            const isCurrent = activeSection === marker.name;
            const tierColor = TIER_COLORS[marker.name] || { main: "#ffffff", glow: "rgba(255,255,255,0.5)" };
            const label = marker.name;

            return (
              <button 
                key={i}
                onClick={() => scrollToSection(i)}
                className={`
                  group relative flex items-center justify-center px-3 py-2 sm:px-5 sm:py-2.5 rounded-full transition-all duration-500 overflow-hidden
                  ${isCurrent ? "bg-white/[0.08]" : "hover:bg-white-[0.04]"}
                `}
              >
                {/* Active/Hover Indicator Line */}
                <div 
                  className={`absolute bottom-0 left-1/2 -translate-x-1/2 h-[2px] rounded-t-full transition-all duration-500 ease-out ${isCurrent ? "w-1/2 opacity-100" : "w-0 opacity-0 group-hover:w-1/4 group-hover:opacity-50"}`}
                  style={{ backgroundColor: tierColor.main, boxShadow: isCurrent ? `0 -2px 10px ${tierColor.glow}` : "none" }}
                />
                
                <span 
                  className={`
                    relative z-10 text-[9px] sm:text-[10px] font-bold tracking-[0.25em] uppercase transition-colors duration-500
                    ${isCurrent ? "text-white" : "text-white/40 group-hover:text-white/80"}
                  `}
                >
                  <span className="hidden sm:inline">{label}</span>
                  <span className="sm:hidden">{label.slice(0, 3)}</span>
                </span>
              </button>
            );
          })}
        </div>
      </div>

      <SponsorModal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} />

      {/* Dynamic background */}
      <div className="fixed inset-0 pointer-events-none z-0">
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[800px] bg-green-500/5 rounded-full filter blur-[160px] transition-opacity duration-1000" style={{ opacity: 0.3 + progress * 0.7 }} />
        <div className="absolute inset-0 opacity-[0.02] bg-[radial-gradient(#22c55e_1px,transparent_1px)] bg-[length:40px_40px]" />
      </div>

      <div className="relative z-10">
        {/* REVEAL PHASE - Sticky text that eventually scrolls away */}
        <div className="relative h-[220vh] w-full">
          <div className="sticky top-0 h-screen w-full flex flex-col items-center justify-center overflow-hidden pointer-events-none">
            <div className="w-full px-4">
              <ScrollRevealText progress={progress} reducedMotion={reducedMotion} />
            </div>
          </div>
        </div>

        {/* Sponsors Grid - Starts once the text is fully revealed and stays a bit */}
        <div 
          className={`relative z-20 container mx-auto px-4 sm:px-6 pb-32 transition-all duration-1000 ${isUnlocked ? "opacity-100 translate-y-0" : "opacity-0 translate-y-20"}`}
        >
          <div className="space-y-20 sm:space-y-32">
            {sponsorTiers.map((tier, index) => (
              <Fragment key={tier.tier}>
                <SponsorTierSection tier={tier} index={index} />
              </Fragment>
            ))}
          </div>

          <div className="mt-24 sm:mt-40 mb-32 flex justify-center">
            <button 
              onClick={() => setIsModalOpen(true)}
              className="group relative inline-flex items-center gap-3 sm:gap-4 px-6 sm:px-10 py-4 rounded-full bg-white text-black font-black hover:scale-105 transition-all duration-300 shadow-xl shadow-white/5"
            >
              <span className="text-[11px] sm:text-sm uppercase tracking-wider">Become a Sponsor / Get in contact with us</span>
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
