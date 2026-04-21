"use client";

import { useEffect, useRef, useState } from "react";
import { sponsorTiers } from "./sponsorsData";
import SponsorTierSection from "./components/SponsorTierSection";

// Scroll reveal component for the thank you text - letter by letter reveal
function ScrollRevealText() {
  const containerRef = useRef(null);
  const [scrollProgress, setScrollProgress] = useState(0);
  const text = "Thank you to all our amazing sponsors and partners for making TEDxNTUA 2026 possible.";

  useEffect(() => {
    const handleScroll = () => {
      if (!containerRef.current) return;

      const element = containerRef.current;
      const rect = element.getBoundingClientRect();
      const windowHeight = window.innerHeight;

      // Reveal starts as soon as element enters viewport from bottom
      let progress = 0;
      
      // When element reaches viewport, start revealing
      if (rect.top < windowHeight) {
        // Calculate reveal: starts at bottom of viewport, completes at top
        progress = (windowHeight - rect.top) / windowHeight;
      }

      setScrollProgress(Math.min(Math.max(progress, 0), 1));
    };

    window.addEventListener("scroll", handleScroll);
    // Call once to check initial position
    handleScroll();

    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Calculate how many characters should be visible
  const visibleCharCount = Math.floor(scrollProgress * text.length);

  return (
    <div
      ref={containerRef}
      className="max-w-2xl mx-auto text-center min-h-[100px]"
      style={{
        transform: `translateY(${(1 - scrollProgress) * 20}px)`,
      }}
    >
      <p className="text-lg sm:text-xl text-gray-200 leading-relaxed">
        {text.split("").map((char, index) => (
          <span
            key={index}
            style={{
              opacity: index < visibleCharCount ? 1 : 0,
            }}
          >
            {char}
          </span>
        ))}
      </p>
    </div>
  );
}

export default function SponsorsPage() {
  const containerRef = useRef(null);
  const [reducedMotion, setReducedMotion] = useState(false);

  useEffect(() => {
    const mq = window.matchMedia && window.matchMedia("(prefers-reduced-motion: reduce)");
    if (mq) setReducedMotion(mq.matches);
  }, []);

  return (
    <section className="min-h-screen bg-black text-white overflow-hidden">
      {/* Animated background gradients */}
      <div className="fixed inset-0 pointer-events-none">
        <div className="absolute top-0 left-1/4 w-96 h-96 bg-green-500/10 rounded-full filter blur-3xl animate-pulse" />
        <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-green-500/8 rounded-full filter blur-3xl animate-pulse" style={{ animationDelay: "1s" }} />
        <div className="absolute top-1/2 right-0 w-80 h-80 bg-green-500/5 rounded-full filter blur-3xl" />
        
        {/* Grid overlay */}
        <div className="absolute inset-0 opacity-5 bg-[linear-gradient(0deg,transparent_24%,rgba(34,197,94,0.05)_25%,rgba(34,197,94,0.05)_26%,transparent_27%,transparent_74%,rgba(34,197,94,0.05)_75%,rgba(34,197,94,0.05)_76%,transparent_77%,transparent)] bg-[length:50px_50px]" />
      </div>

      {/* Content */}
      <div className="relative z-10">
        {/* Scroll Reveal Thank You Section */}
        <div className="container mx-auto px-4 sm:px-6 pt-24 sm:pt-32 pb-20 sm:pb-32">
          <ScrollRevealText />
        </div>

        {/* Sponsors Grid */}
        <div
          ref={containerRef}
          className="container mx-auto px-4 sm:px-6 pb-20 sm:pb-28"
        >
          <div className="space-y-10 sm:space-y-14">
            {sponsorTiers.map((tier, index) => (
              <SponsorTierSection
                key={tier.tier}
                tier={tier}
                index={index}
              />
            ))}
          </div>

          {/* Bottom decoration and call to action */}
          <div className="mt-16 sm:mt-20 text-center pt-12 border-t border-green-500/20">
            <div className="inline-block mb-4">
              <div className="inline-flex items-center gap-2 px-4 py-2 rounded-lg border border-green-500/40 bg-green-500/5">
                <span className="text-2xl">✨</span>
                <span className="text-sm font-semibold text-green-300">Interested in partnering with us?</span>
              </div>
            </div>
            <p className="text-gray-400 text-sm max-w-md mx-auto">
              Contact us to learn about partnership opportunities and how to support TEDxNTUA 2026.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
