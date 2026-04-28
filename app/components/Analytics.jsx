"use client";

import { useState, useEffect } from "react";
import Script from "next/script";

const GTM_ID = "GTM-PZXR3FK5";

export default function Analytics() {
  const [consent, setConsent] = useState(null);

  useEffect(() => {
    // Check local storage for existing consent
    const storedConsent = localStorage.getItem("cookie-consent");
    setConsent(storedConsent);
  }, []);

  useEffect(() => {
    if (consent === "accepted") {
      // Initialize dataLayer
      window.dataLayer = window.dataLayer || [];
      window.dataLayer.push({
        "gtm.start": new Date().getTime(),
        event: "gtm.js",
      });

      // Global click tracker
      const handleGlobalClick = (e) => {
        const target = e.target;
        // Track buttons, links, images and elements with 'data-track' attribute
        const trackable = target.closest("button, a, img, [data-track]");
        
        if (trackable) {
          const isImage = trackable.tagName.toLowerCase() === 'img';
          window.dataLayer.push({
            event: "interaction",
            click_type: isImage ? "asset_click" : "ui_click",
            click_element: trackable.tagName.toLowerCase(),
            click_id: trackable.id || "none",
            click_text: isImage ? (trackable.alt || trackable.src.split('/').pop()) : (trackable.innerText?.trim() || trackable.ariaLabel || "none"),
            click_url: trackable.href || trackable.src || "none",
            click_class: trackable.className || "none"
          });
        }
      };

      document.addEventListener("click", handleGlobalClick);
      return () => document.removeEventListener("click", handleGlobalClick);
    }
  }, [consent]);

  const handleAccept = () => {
    localStorage.setItem("cookie-consent", "accepted");
    setConsent("accepted");
  };

  const handleDecline = () => {
    localStorage.setItem("cookie-consent", "declined");
    setConsent("declined");
  };

  if (consent === null) {
    return (
      <div className="fixed bottom-6 left-6 right-6 z-[9999] flex flex-col md:flex-row items-center justify-between gap-4 rounded-2xl border border-emerald-500/30 bg-black/90 p-6 backdrop-blur-2xl md:left-auto md:max-w-xl transition-all duration-500 ease-out animate-bounce-subtle">
        <style dangerouslySetInnerHTML={{ __html: `
          @keyframes bounce-subtle {
            0%, 100% { transform: translateY(0); }
            50% { transform: translateY(-5px); }
          }
          .animate-bounce-subtle {
            animation: bounce-subtle 4s infinite ease-in-out;
          }
        `}} />
        <div className="flex flex-col gap-1">
          <h3 className="text-xs font-black uppercase tracking-[0.2em] text-emerald-400">Security & Analytics</h3>
          <p className="text-[10px] leading-relaxed text-white/70 font-medium">
            Help us refine the "Cycle 0" experience. We use anonymous tracking to understand how our community interacts with the platform.
          </p>
        </div>
        <div className="flex w-full md:w-auto gap-3 shrink-0">
          <button
            onClick={handleDecline}
            className="flex-1 md:flex-none px-5 py-2 text-[10px] font-bold uppercase tracking-wider text-white/30 hover:text-white transition-colors border border-white/5 rounded-full"
          >
            Decline
          </button>
          <button
            onClick={handleAccept}
            className="flex-1 md:flex-none px-7 py-2 text-[10px] font-black uppercase tracking-[0.1em] bg-emerald-500 text-black rounded-full hover:bg-emerald-400 hover:shadow-[0_0_25px_rgba(16,185,129,0.4)] transition-all active:scale-95"
          >
            Accept
          </button>
        </div>
      </div>
    );
  }

  if (consent === "accepted") {
    return (
      <>
        {/* Google Tag Manager - Script */}
        <Script
          id="gtm-script"
          strategy="afterInteractive"
          dangerouslySetInnerHTML={{
            __html: `
              window.dataLayer = window.dataLayer || [];
              (function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':
              new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],
              j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src=
              'https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);
              })(window,document,'script','dataLayer','${GTM_ID}');
            `,
          }}
        />
      </>
    );
  }

  return null;
}
