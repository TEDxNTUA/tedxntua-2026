// Import global CSS styles
import "./globals.css";

import SiteHeader from "./components/SiteHeader";
import EventNavProvider from "./components/EventNavProvider";
import { TEDSocialButton } from "./components/TedxNTUAsocials";
import FooterContactPanel from "./components/FooterContactPanel";
import CycleZeroMark from "./components/CycleZeroMark";
import Nav from "./components/Nav";
import { withBasePath } from "./lib/basePath";
import AssetLoader from "./components/AssetLoader";
import ContentVisibilityWrapper from "./components/ContentVisibilityWrapper";


// Page metadata for SEO and browser tab display
export const metadata = {
  title: "TEDxNTUA 2026",
  description: "TEDxNTUA 2026 - Ideas Worth Spreading"
};

// Minimum viewport width in pixels at which the archive/ticket buttons expand.
const HEADER_BUTTON_EXPAND_MIN_WIDTH = 200;



// Define the layout component
export default function RootLayout({ children }) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body
        className="site-shell bg-blue-100 text-gray-900"
      >
        <AssetLoader />
        <ContentVisibilityWrapper>
          <EventNavProvider>
            <SiteHeader />

            <main className="site-main">
              {children}
            </main>


            <footer className="site-footer border-t border-white/20 bg-black text-white">
              <div className="footer-content mx-auto w-full max-w-7xl px-4 py-8 sm:px-6 sm:py-10 lg:px-8 xl:px-10">
                <div className="grid gap-8 sm:gap-10 md:grid-cols-2 lg:grid-cols-3 lg:gap-8 place-items-center text-center">


                <section className="relative flex flex-col items-center gap-5 border-white/15 lg:pr-8">
                  <div className="pointer-events-none absolute right-0 top-3 hidden h-44 w-px bg-white/15 lg:block" />
                  <div className="flex flex-wrap items-center gap-x-2 gap-y-2 leading-none sm:gap-x-3">
                    <span className="shrink-0">
                      <span className="text-xl font-bold text-red-600 sm:text-2xl md:text-3xl">TEDx</span>
                      <span className="text-xl font-bold text-white sm:text-2xl md:text-3xl">NTUA</span>
                    </span>
                    <CycleZeroMark className="h-6 w-auto sm:h-8 md:h-10" />
                  </div>
                  <div className="max-w-xl text-[10px] leading-relaxed text-white/50 sm:text-xs">
                    This independent TEDx event is operated under license from TED
                    and the auspices of ICCS.
                  </div>
                  <div className="pt-2 text-[10px] uppercase tracking-[0.18em] text-white/55 sm:text-xs sm:tracking-[0.22em]">
                    ALL RIGHTS RESERVED © 2026
                  </div>
                </section>


                <section className="relative border-b border-white/15 pb-6 sm:pb-8 md:border-b-0 md:pb-0 md:pr-6 lg:pr-8">
                  <div className="pointer-events-none absolute right-0 top-3 hidden h-44 w-px bg-white/15 md:block" />
                  <FooterContactPanel />
                </section>


                <section className="relative flex flex-col items-center gap-4 sm:gap-5 lg:pl-2">
                  <div className="text-base font-medium tracking-wide text-white/90 sm:text-lg">
                    Stay tuned:
                  </div>
                  <section className="relative flex flex-col gap-4 sm:gap-5 bg-auto">
                    <div className="flex flex-wrap gap-2 sm:gap-3">
                      <div className="transition-transform duration-300 hover:-translate-y-2">
                        <TEDSocialButton name='youtube' size='40px' color='color' colorHover='yellow' />
                      </div>
                      <div className="transition-transform duration-300 hover:-translate-y-2">
                        <TEDSocialButton name='instagram' size='40px' color='color' colorHover='yellow' />
                      </div>
                      <div className="transition-transform duration-300 hover:-translate-y-2">
                        <TEDSocialButton name='linkedIn' size='40px' color='color' colorHover='yellow' />
                      </div>
                      <div className="transition-transform duration-300 hover:-translate-y-2">
                        <TEDSocialButton name='tiktok' size='40px' color='color' colorHover='yellow' />
                      </div>
                      <div className="transition-transform duration-300 hover:-translate-y-2">
                        <TEDSocialButton name='facebook' size='40px' color='color' colorHover='yellow' />
                      </div>
                    </div>
                    <div className="footer-social-loop w-full max-w-sm pl-0 sm:pl-1">
                      <svg
                        viewBox="0 -14 320 164"
                        aria-hidden="true"
                        className="h-auto w-full overflow-visible"
                        suppressHydrationWarning
                      >
                        <ellipse
                          cx="159"
                          cy="46"
                          rx="72"
                          ry="22"
                          fill="none"
                          stroke="rgba(255,255,255,0.18)"
                          strokeWidth="1.1"
                          strokeDasharray="5 8"
                          suppressHydrationWarning
                        />
                        <ellipse
                          cx="159"
                          cy="46"
                          rx="72"
                          ry="22"
                          fill="none"
                          stroke="rgba(34,197,94,0.22)"
                          strokeWidth="1.2"
                          strokeDasharray="14 124"
                          strokeLinecap="round"
                          suppressHydrationWarning
                        />
                        <g suppressHydrationWarning>
                          <circle cx="0" cy="0" r="4" fill="rgba(34,197,94,0.72)" suppressHydrationWarning>
                            <animateMotion
                              dur="6.8s"
                              repeatCount="indefinite"
                              path="M 159 46 m -72,-22 a 72 22 0 1 1 144 0 a 72 22 0 1 1 -144 0"
                            />
                          </circle>
                          <circle cx="0" cy="0" r="7.5" fill="none" stroke="rgba(255,255,255,0.45)" strokeWidth="1" suppressHydrationWarning>
                            <animateMotion
                              dur="6.8s"
                              repeatCount="indefinite"
                              path="M 159 46 m -72,-22 a 72 22 0 1 1 144 0 a 72 22 0 1 1 -144 0"
                            />
                          </circle>
                        </g>
                        <g suppressHydrationWarning>
                          <circle cx="0" cy="0" r="4" fill="rgba(255,255,255,0.92)" suppressHydrationWarning>
                            <animateMotion
                              dur="8.4s"
                              repeatCount="indefinite"
                              begin="-3.4s"
                              path="M 159 46 m -72,-22 a 72 22 0 1 1 144 0 a 72 22 0 1 1 -144 0"
                            />
                          </circle>
                          <circle cx="0" cy="0" r="7.5" fill="none" stroke="rgba(34,197,94,0.5)" strokeWidth="1" suppressHydrationWarning>
                            <animateMotion
                              dur="8.4s"
                              repeatCount="indefinite"
                              begin="-3.4s"
                              path="M 159 46 m -72,-22 a 72 22 0 1 1 144 0 a 72 22 0 1 1 -144 0"
                            />
                          </circle>
                        </g>
                      </svg>
                    </div>
                  </section>
                </section>

                
              </div>
            </div>
          </footer>
          </EventNavProvider>
        </ContentVisibilityWrapper>
      </body>
    </html>
  );
}
