"use client";

import { useEffect, useRef, useState } from "react";
import { sponsorTiers } from "./sponsorsData";
import SponsorTierSection from "./components/SponsorTierSection";

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
        {/* Header Section */}
        <div className="container mx-auto px-4 sm:px-6 pt-20 sm:pt-28 pb-16 sm:pb-20">
          <div className="max-w-3xl mx-auto text-center">
            {/* Decorative elements */}
            <div className="mb-8 inline-block relative">
              <div className="absolute inset-0 bg-gradient-to-r from-green-500/30 to-green-600/20 blur-2xl rounded-full" />
              <div className="relative px-6 py-2 rounded-full border border-green-500/50 bg-green-500/10 backdrop-blur-md">
                <span className="text-sm font-semibold text-green-300">FUTURISTIC PARTNERSHIPS</span>
              </div>
            </div>

            <h1 className="text-5xl sm:text-6xl lg:text-7xl font-bold mb-6 bg-gradient-to-r from-green-300 via-green-400 to-green-500 bg-clip-text text-transparent leading-tight">
              Our Partners
            </h1>

            <p className="text-lg sm:text-xl text-gray-300 mb-6 leading-relaxed">
              Incredible organizations powering the TEDxNTUA 2026 experience. Together we're shaping the future of ideas.
            </p>

            <p className="text-sm text-green-300/70">
              Thanks to our partners for their incredible support and commitment to innovation.
            </p>
          </div>
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
