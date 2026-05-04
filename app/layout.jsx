// Import global CSS styles
import "./globals.css";

import SiteHeader from "./components/SiteHeader";
import EventNavProvider from "./components/EventNavProvider";
import { TEDSocialButton } from "./components/TedxNTUAsocials";
import FooterContactPanel from "./components/FooterContactPanel";
import { withBasePath } from "./lib/basePath";
import AssetLoader from "./components/AssetLoader";
import ContentVisibilityWrapper from "./components/ContentVisibilityWrapper";
import ServiceWorkerRegistration from "./components/ServiceWorkerRegistration";
import Analytics from "./components/Analytics";
import Link from "next/link";
import Script from "next/script";

const GTM_ID = "GTM-PZXR3FK5";
const shouldCleanDevServiceWorker = process.env.NODE_ENV !== "production";

// Page metadata for SEO and browser tab display
export const metadata = {
  metadataBase: new URL("https://2026.tedxntua.com"),
  applicationName: "TEDxNTUA 2026",
  title: {
    default: "TEDxNTUA 2026",
    template: "%s | TEDxNTUA 2026",
  },
  description: "TEDxNTUA 2026: Cycle 0 — Exploring the origins of innovation and the power of ideas that redefine our future.",
  openGraph: {
    title: "TEDxNTUA 2026",
    description: "TEDxNTUA 2026: Cycle 0 — Exploring the origins of innovation and the power of ideas that redefine our future.",
    url: "https://2026.tedxntua.com",
    siteName: "TEDxNTUA 2026",
    images: [
      {
        url: "/LOGO_ASSET.png",
        width: 1200,
        height: 630,
        alt: "TEDxNTUA 2026",
      },
    ],
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "TEDxNTUA 2026",
    description: "TEDxNTUA 2026: Cycle 0 — Exploring the origins of innovation and the power of ideas that redefine our future.",
    images: ["/LOGO_ASSET.png"],
  },
  icons: {
    icon: [
      { url: "/favicons/favicon-32x32.png", sizes: "32x32", type: "image/png" },
      { url: "/favicons/favicon-16x16.png", sizes: "16x16", type: "image/png" },
    ],
    shortcut: "/favicons/favicon-32x32.png",
    apple: "/favicons/favicon-32x32.png",
  },
  manifest: "/favicons/manifest.json", // Optional: If we want to be very thorough
  robots: {
    index: true,
    follow: true,
  }
};

export const viewport = {
  themeColor: "#DC2626",
  width: "device-width",
  initialScale: 1,
};

// Define the layout component
export default function RootLayout({ children }) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        {shouldCleanDevServiceWorker && (
          <Script
            id="dev-service-worker-cleanup"
            strategy="beforeInteractive"
            dangerouslySetInnerHTML={{
              __html: `
                (function () {
                  var isLocalhost = location.hostname === "localhost" || location.hostname === "127.0.0.1";
                  var cleanupKey = "tedxntua-dev-service-worker-cleaned-v3";

                  if (!isLocalhost || sessionStorage.getItem(cleanupKey)) {
                    return;
                  }

                  if (!("serviceWorker" in navigator) && !("caches" in window)) {
                    return;
                  }

                  sessionStorage.setItem(cleanupKey, "true");

                  Promise.all([
                    "serviceWorker" in navigator
                      ? navigator.serviceWorker.getRegistrations().then(function (registrations) {
                          return Promise.all(registrations.map(function (registration) {
                            return registration.unregister();
                          }));
                        })
                      : Promise.resolve(),
                    "caches" in window
                      ? caches.keys().then(function (cacheNames) {
                          return Promise.all(cacheNames.map(function (cacheName) {
                            return caches.delete(cacheName);
                          }));
                        })
                      : Promise.resolve()
                  ]).finally(function () {
                    location.replace(location.href);
                  });
                })();
              `,
            }}
          />
        )}
        <link rel="preload" href={withBasePath("/fonts/Copixel-Display.otf")} as="font" type="font/otf" crossOrigin="anonymous" />
        <link rel="preload" href={withBasePath("/gradient_backgrounds/mainPage_gradient.png")} as="image" />
        <script dangerouslySetInnerHTML={{ __html: `
          if (/Android/i.test(navigator.userAgent)) {
            document.documentElement.classList.add('is-android');
          }
        `}} />
        {/* JSON-LD for Site Name to ensure search engines show the correct brand name */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "WebSite",
              "name": "TEDxNTUA 2026",
              "alternateName": ["TEDxNTUA", "TEDx NTUA"],
              "url": "https://2026.tedxntua.com"
            }),
          }}
        />
      </head>
      <body className="site-shell bg-[#050505] text-gray-900">
        {/* Google Tag Manager (noscript) */}
        <noscript>
          <iframe 
            src={`https://www.googletagmanager.com/ns.html?id=${GTM_ID}`}
            height="0" 
            width="0" 
            style={{ display: 'none', visibility: 'hidden' }}
          ></iframe>
        </noscript>
        
        <Analytics />
        <ServiceWorkerRegistration />
        <AssetLoader />
        <ContentVisibilityWrapper>
          <EventNavProvider>
            <SiteHeader />

            <main className="site-main">
              {children}
            </main>






            <footer className="site-footer relative border-t border-white/10 bg-black text-white overflow-hidden">
              {/* Decorative Background Elements */}
              <div className="pointer-events-none absolute -left-20 -top-10 w-96 rounded-full bg-red-600/5 blur-[120px]" />
              <div className="pointer-events-none absolute -right-20 bottom-0 h-16 w-96 rounded-full bg-emerald-600/5 blur-[120px]" />

              <div className="footer-content relative mx-auto w-full max-w-7xl px-6 py-6 lg:px-12">
                <div className="grid gap-10 lg:grid-cols-12 items-center">
                  
                  {/* Branding & Mission Block */}
                  <div className="lg:col-span-5 flex flex-col gap-6">
                    <div className="flex items-center gap-4">
                      <div className="flex items-baseline">
                        <span className="text-3xl font-black tracking-tighter text-red-600">TEDx</span>
                        <span className="text-3xl font-black tracking-tighter text-white ml-0.5">NTUA</span>
                      </div>
                      <div className="h-6 w-px bg-white/20" />
                        <img 
                          src={withBasePath("/LOGO_ASSET.png")} 
                          alt="TEDxNTUA Logo" 
                          className="h-12 w-auto" 
                          width={180}
                          height={48}
                          fetchpriority="low"
                          loading="lazy"
                          sizes="(max-width: 768px) 140px, 180px"
                        />
                    </div>
                    
                    <p className="max-w-md text-[11px] leading-relaxed text-white/60 font-medium italic">
                      TEDxNTUA 2026: Cycle 0 — Exploring the origins of innovation and the power of ideas that redefine our future. Operated under license from TED.
                    </p>
                    <p className="max-w-md text-[14px] leading-relaxed text-white/60 font-medium italic">
                      "Ideas change everything" 
                    </p>

                    <div className="flex flex-wrap gap-3">
                      {['youtube', 'instagram', 'linkedIn', 'tiktok', 'facebook'].map((social) => (
                        <div key={social} className="relative transition-all duration-300 hover:-translate-y-1 active:scale-95">
                          <TEDSocialButton name={social} size='36px' color='color' colorHover='yellow' />
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Quick Links Column */}
                  <div className="lg:col-span-2 flex flex-col gap-5">
                    <h4 className="text-[10px] font-black uppercase tracking-[0.3em] text-red-600">Explore</h4>
                    <nav className="flex flex-col gap-2.5 text-[10px] font-bold tracking-wider text-white/40" aria-label="Footer navigation">
                      <Link href="/event/constructionPage" className="hover:text-emerald-400 transition-colors uppercase">Program</Link>
                      <Link href="/event/speakers" className="hover:text-emerald-400 transition-colors uppercase">Speakers</Link>
                      <Link href="/event/performances" className="hover:text-emerald-400 transition-colors uppercase">Performances</Link>
                      <Link href="/sponsors" className="hover:text-emerald-400 transition-colors uppercase">Sponsors</Link>
                      <Link href="/team" className="hover:text-emerald-400 transition-colors uppercase">Our Team</Link>
                    </nav>
                  </div>

                  {/* Contact Hub - Span 5 */}
                  <div className="lg:col-span-5">
                    <div className="relative overflow-hidden rounded-3xl border border-white/10 bg-white/[0.02] p-6 backdrop-blur-3xl shadow-2xl group">
                      <div className="absolute inset-0 bg-gradient-to-br from-white/[0.03] to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-700" />
                      <FooterContactPanel />
                    </div>
                  </div>

                </div>

                {/* Bottom Bar */}
                <div className="mt-10 pt-6 border-t border-white/5 flex flex-col lg:flex-row justify-between items-center gap-4">
                  <div className="flex items-center gap-4 text-[9px] font-black uppercase tracking-[0.4em] text-white/20">
                    <span>Innovate • Create • Inspire</span>
                  </div>

                  <div className="flex flex-col items-center lg:items-end text-center lg:text-right gap-0.5">
                    <div className="text-[9px] font-bold text-white/50 tracking-wider uppercase">
                      © 2026 TEDxNTUA — Operated under license from TED
                    </div>
                  </div>
                </div>
              </div>
            </footer>
          </EventNavProvider>
        </ContentVisibilityWrapper>
      </body>
    </html>
  );
}
