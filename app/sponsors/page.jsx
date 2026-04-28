"use client";

import { useEffect, useRef, useState, useCallback, Fragment } from "react";
import { sponsorTiers } from "./sponsorsData";
import SponsorTierSection from "./components/SponsorTierSection";
import { withBasePath } from "../lib/basePath";
import localFont from "next/font/local";
import SponsorsHeroText from "./components/SponsorsHeroText";

const copixelDisplay = localFont({
  src: "../../Copixel-Futuristic-Font/Fonts/Copixel-Display.otf",
  display: "swap",
});

const TIER_COLORS = {
  "Diamond": { main: "#22d3ee", glow: "rgba(34, 211, 238, 0.8)" },
  "Platinum": { main: "#93c5fd", glow: "rgba(147, 197, 253, 0.8)" },
  "Grand": { main: "#facc15", glow: "rgba(250, 204, 21, 0.8)" },
  "Partners": { main: "#4ade80", glow: "rgba(74, 222, 128, 0.8)" },
  "Supporters": { main: "#a1a1aa", glow: "rgba(161, 161, 170, 0.8)" }
};

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
        headers: { "Accept": "application/json" },
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
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-64 h-64 bg-[#22d3ee]/10 rounded-full blur-[80px] pointer-events-none" />
        
        <div className="relative z-10">
          <div className="flex justify-between items-start mb-6 gap-4">
            <h3 className="text-xl sm:text-2xl font-bold text-white leading-tight uppercase italic">Partner with TEDxNTUA</h3>
            <button 
              onClick={onClose} 
              disabled={status === "sending"}
              className="flex-shrink-0 w-12 h-12 flex items-center justify-center rounded-full bg-white/5 border border-white/10 text-white/50 hover:text-white hover:bg-white/10 transition-all text-2xl"
              aria-label="Close modal"
            >
              &times;
            </button>
          </div>
          
          {status === "success" ? (
            <div className="py-12 text-center space-y-4 animate-in fade-in zoom-in duration-300">
              <div className="w-16 h-16 bg-[#22d3ee]/20 rounded-full flex items-center justify-center mx-auto border border-[#22d3ee]/50">
                <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="#22d3ee" strokeWidth="3">
                  <path d="M20 6L9 17L4 12" />
                </svg>
              </div>
              <h4 className="text-xl font-bold text-white uppercase italic">Message Sent!</h4>
              <p className="text-white/50 text-sm">Our team will contact you shortly.</p>
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
                  className="w-full bg-white/5 border border-white/10 rounded-lg px-4 py-3 text-white focus:outline-none focus:border-[#22d3ee]/50 transition-colors disabled:opacity-50"
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
                    className="w-full bg-white/5 border border-white/10 rounded-lg px-4 py-3 text-white focus:outline-none focus:border-[#22d3ee]/50 transition-colors disabled:opacity-50"
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
                    className="w-full bg-white/5 border border-white/10 rounded-lg px-4 py-3 text-white focus:outline-none focus:border-[#22d3ee]/50 transition-colors disabled:opacity-50"
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
                  className="w-full bg-white/5 border border-white/10 rounded-lg px-4 py-3 text-white focus:outline-none focus:border-[#22d3ee]/50 transition-colors resize-none disabled:opacity-50"
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
                className="w-full bg-white text-black font-black py-4 rounded-lg hover:scale-[1.02] active:scale-[0.98] transition-all duration-300 mt-2 disabled:bg-white/20 disabled:text-white/30 disabled:cursor-not-allowed uppercase italic tracking-wider"
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
  const [dampedProgress, setDampedProgress] = useState(0);
  const [isUnlocked, setIsUnlocked] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [sectionMarkers, setSectionMarkers] = useState([]);
  const [activeSection, setActiveSection] = useState(null);
  const [vh, setVh] = useState(0);
  
  const targetProgressRef = useRef(0);
  const currentProgressRef = useRef(0);
  const videoRef = useRef(null);

  // Slow down the background video
  useEffect(() => {
    if (videoRef.current) {
      videoRef.current.playbackRate = 0.1;
    }
  }, []);

  // Stable VH for mobile
  useEffect(() => {
    const measureStableVh = () => {
      const h = window.innerHeight;
      setVh(h);
      document.documentElement.style.setProperty('--vh', `${h}px`);
    };
    measureStableVh();
    window.addEventListener("resize", measureStableVh);
    return () => window.removeEventListener("resize", measureStableVh);
  }, []);

  // Smooth damping animation loop
  useEffect(() => {
    let frameId;
    const animate = () => {
      const damping = 0.12;
      const diff = targetProgressRef.current - currentProgressRef.current;
      
      if (Math.abs(diff) > 0.0001) {
        currentProgressRef.current += diff * damping;
        // Only update state if there's a meaningful change to reduce render pressure
        setDampedProgress(currentProgressRef.current);
        frameId = requestAnimationFrame(animate);
      } else if (currentProgressRef.current !== targetProgressRef.current) {
        currentProgressRef.current = targetProgressRef.current;
        setDampedProgress(currentProgressRef.current);
        frameId = null;
      } else {
        frameId = null;
      }
    };
    
    frameId = requestAnimationFrame(animate);
    return () => {
      if (frameId) cancelAnimationFrame(frameId);
    };
  }, [progress]);



  // Scroll sync logic
  useEffect(() => {
    if (reducedMotion) {
      targetProgressRef.current = 1;
      setIsUnlocked(true);
      return;
    }

    const handleScroll = () => {
      const scrollY = window.scrollY;
      const viewportHeight = vh || window.innerHeight;
      
      // Hero reveal progress
      // The container is 400vh tall, meaning it stays sticky for 300vh.
      // We want the text to fully reveal by 200vh, and stay visible until it scrolls away.
      const scrollDistance = viewportHeight * 2.0;
      const revealProgress = Math.min(scrollY / scrollDistance, 1);
      targetProgressRef.current = revealProgress;
      setProgress(revealProgress);
      
      // Unlock visuals once hero text is fully materialized (which finishes around 0.85 * 2.0 = 1.7)
      // Setting to 1.8 leaves a small breathing room before the tiers appear
      const unlocked = scrollY > viewportHeight * 1.8;
      if (unlocked !== isUnlocked) setIsUnlocked(unlocked);
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener("scroll", handleScroll);
  }, [reducedMotion, isUnlocked, vh]);

  // Section markers and intersection observer
  useEffect(() => {
    const calculateMarkers = () => {
      const sections = document.querySelectorAll(".sponsor-tier-section");
      const totalHeight = document.documentElement.scrollHeight - window.innerHeight;
      if (totalHeight <= 0) return;
      
      const markers = Array.from(sections).map(section => {
        const rect = section.getBoundingClientRect();
        return {
          percent: Math.min(Math.max((rect.top + window.scrollY) / totalHeight, 0), 1),
          name: section.getAttribute("data-tier")
        };
      });
      setSectionMarkers(markers);
    };

    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) setActiveSection(entry.target.getAttribute("data-tier"));
      });
    }, { rootMargin: "-20% 0px -70% 0px" });

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

  const scrollToSection = (index) => {
    const sections = document.querySelectorAll(".sponsor-tier-section");
    if (sections[index]) {
      const offset = 160;
      window.scrollTo({
        top: sections[index].getBoundingClientRect().top + window.scrollY - offset,
        behavior: "smooth"
      });
    }
  };

  return (
    <section className="relative min-h-screen bg-[#050505] text-white selection:bg-[#22d3ee]/30">
      {/* Navigation Pill */}
      <div className={`fixed bottom-8 left-1/2 -translate-x-1/2 z-50 transition-all duration-1000 ${isUnlocked ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"}`}>
        <div className="flex items-center gap-1 sm:gap-2 rounded-full border border-white/10 bg-black/80 p-1.5 sm:p-2 backdrop-blur-2xl shadow-[0_20px_50px_rgba(0,0,0,0.5)]">
          {sectionMarkers.map((marker, i) => {
            const isCurrent = activeSection === marker.name;
            const tierColor = TIER_COLORS[marker.name] || { main: "#ffffff" };
            return (
              <button 
                key={i}
                onClick={() => scrollToSection(i)}
                className={`group relative flex items-center justify-center px-3 py-2 sm:px-5 sm:py-2.5 rounded-full transition-all duration-500 ${isCurrent ? "bg-white/[0.08]" : "hover:bg-white/[0.04]"}`}
              >
                <div 
                  className={`absolute bottom-0 left-1/2 -translate-x-1/2 h-[2px] rounded-t-full transition-all duration-500 ${isCurrent ? "w-1/2 opacity-100" : "w-0 opacity-0 group-hover:w-1/4 group-hover:opacity-50"}`}
                  style={{ backgroundColor: tierColor.main, boxShadow: isCurrent ? `0 -2px 10px ${tierColor.main}` : "none" }}
                />
                <span className={`relative z-10 text-[9px] sm:text-[10px] font-black tracking-[0.25em] uppercase transition-colors ${isCurrent ? "text-white" : "text-white/40 group-hover:text-white/80"}`}>
                  <span className="hidden sm:inline">{marker.name}</span>
                  <span className="sm:hidden">{marker.name.slice(0, 3)}</span>
                </span>
              </button>
            );
          })}
        </div>
      </div>

      <SponsorModal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} />

      {/* Atmospheric Background */}
      <div className="fixed inset-0 pointer-events-none z-0">
        <div className="absolute inset-0 bg-[#050505]" />
        
        {/* Subtle Background Video */}
        <div 
          className="absolute inset-0 mix-blend-screen pointer-events-none overflow-hidden"
          style={{ 
            opacity: Math.max(0.08, 0.20 - (dampedProgress * 0.12))
          }}
        >
          <video 
            ref={videoRef}
            autoPlay 
            loop 
            muted 
            playsInline 
            className="w-full h-full object-cover scale-110"
          >
            <source src={withBasePath("/animations/Enhancer-Ultra%20HD-cells_desktop.mp4")} type="video/mp4" />
          </video>
        </div>

        {/* Dynamic Grid */}
        <div 
          className="absolute inset-0 opacity-[0.03] transition-transform duration-500 ease-out"
          style={{ 
            backgroundImage: "radial-gradient(#22d3ee 1px, transparent 1px)",
            backgroundSize: "40px 40px",
            transform: `translateY(${dampedProgress * -100}px) rotateX(15deg)`
          }} 
        />
        {/* Glows */}
        <div 
          className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-[120vh] bg-gradient-to-b from-[#22d3ee]/[0.07] via-transparent to-transparent transition-opacity duration-1000" 
          style={{ opacity: 0.2 + Math.min(0.8, dampedProgress * 2) }} 
        />
        <div 
          className="absolute top-0 left-1/2 -translate-x-1/2 w-[1000px] h-[1000px] bg-[#22d3ee]/5 rounded-full filter blur-[180px] transition-all duration-1000" 
          style={{ 
            opacity: 0.4 + dampedProgress * 0.6,
            transform: `translate(-50%, ${dampedProgress * 50}px) scale(${1 + dampedProgress * 0.2})`
          }} 
        />
        {/* Digital Scanlines */}
        <div className="absolute inset-0 pointer-events-none opacity-[0.02] bg-[linear-gradient(rgba(18,16,16,0)_50%,rgba(0,0,0,0.25)_50%),linear-gradient(90deg,rgba(255,0,0,0.06),rgba(0,255,0,0.02),rgba(0,0,255,0.06))] z-10 bg-[length:100%_2px,3px_100%]" />
      </div>

      <div className="relative z-10">
        <div className="relative h-[400vh] w-full">
          <div className="sticky top-0 h-screen w-full flex flex-col items-center justify-center overflow-hidden pointer-events-none">
            <div 
              className="w-full px-6 text-center"
              style={{ 
                opacity: 1,
                transform: 'scale(1)'
              }}
            >
              <SponsorsHeroText 
                text="You help us at every step of the cycle."
                progress={dampedProgress} 
                className={`max-w-5xl mx-auto ${copixelDisplay.className} text-3xl sm:text-6xl md:text-7xl lg:text-8xl leading-[1.1] tracking-tight font-black italic uppercase text-balance`}
              />
            </div>

            {!reducedMotion && (
              <div 
                className="absolute top-1/2 right-4 sm:right-8 md:right-12 lg:right-20 flex flex-col items-center gap-4 transition-all duration-1000 scale-75 sm:scale-100"
                style={{ 
                  opacity: dampedProgress < 0.25 ? 1 : Math.max(0, 1 - (dampedProgress - 0.25) * 4),
                  transform: `translateY(calc(-50% + ${dampedProgress * 40}px))`
                }}
              >
                <span 
                  className="text-[#22d3ee]/60 text-[10px] font-black tracking-[0.6em] uppercase animate-pulse whitespace-nowrap" 
                  style={{ writingMode: 'vertical-rl', transform: 'rotate(180deg)' }}
                >
                  Initialize Cycle
                </span>
                
                <div className="w-px h-32 bg-white/10 relative overflow-hidden mt-2">
                  <div className="absolute inset-0 bg-[#22d3ee]/50 animate-[shimmer-vertical_2s_infinite]" />
                </div>
                
                <div className="flex flex-col items-center gap-0 animate-bounce mt-2">
                  <div className="w-px h-12 bg-gradient-to-b from-[#22d3ee]/50 to-transparent" />
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="text-[#22d3ee]/50 -mt-1">
                    <path d="M7 13l5 5 5-5M7 6l5 5 5-5" />
                  </svg>
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Sponsors Grid */}
        <div 
          className={`relative z-20 container mx-auto px-6 sm:px-8 pb-32 transition-all duration-1000 ${isUnlocked ? "opacity-100 translate-y-0" : "opacity-0 translate-y-20"}`}
        >
          <div className="space-y-32 sm:space-y-48">
            {sponsorTiers.map((tier, index) => (
              <Fragment key={tier.tier}>
                <SponsorTierSection tier={tier} index={index} />
              </Fragment>
            ))}
          </div>

          <div className="mt-40 mb-32 flex flex-col items-center gap-12">
            <div className="h-20 w-px bg-gradient-to-b from-transparent to-white/20" />
            <button 
              onClick={() => setIsModalOpen(true)}
              className="group relative inline-flex items-center gap-4 sm:gap-6 px-10 sm:px-14 py-6 rounded-full bg-white text-black font-black hover:scale-105 transition-all duration-500 shadow-[0_0_40px_rgba(255,255,255,0.1)] active:scale-95"
            >
              <span className="text-xs sm:text-sm uppercase tracking-[0.2em] italic">Become a Sponsor</span>
              <div className="w-10 h-10 rounded-full bg-black flex items-center justify-center group-hover:translate-x-2 transition-transform duration-500 shadow-lg">
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="4">
                  <path d="M5 12h14M12 5l7 7-7 7" />
                </svg>
              </div>
              {/* Outer glow effect */}
              <div className="absolute inset-0 rounded-full bg-white opacity-0 group-hover:opacity-20 blur-xl transition-opacity duration-500 -z-10" />
            </button>
          </div>
        </div>
      </div>

      <style jsx global>{`
        @keyframes shimmer {
          0% { transform: translateX(-100%); }
          100% { transform: translateX(100%); }
        }
        @keyframes shimmer-vertical {
          0% { transform: translateY(-100%); }
          100% { transform: translateY(100%); }
        }
      `}</style>
    </section>
  );
}
